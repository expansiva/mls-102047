/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_aprovadas.ts" enhancement="_blank"/>

import type { Despesas_aprovadasContracts } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.js';
import type { GetDespesaOutput } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.js';
import { listDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import type { ListDespesaInput } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import { registrarPagamento } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.js';

type Status = 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
type Detalhe = Despesas_aprovadasContracts['reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada']['output']['despesa'];

function toStatus(value: string): Status {
  if (value === 'draft' || value === 'awaitingApproval' || value === 'rejected' || value === 'approved' || value === 'paid') {
    return value;
  }
  throw new AppError('INVALID_STATE', 'unsupported expense status: ' + value, 500);
}

function toDetalhe(d: GetDespesaOutput): Detalhe {
  const inner: Detalhe['details']['details'] = {
    dataDespesa: d.details.dataDespesa,
    categoria: d.details.categoria,
    valor: d.details.valor,
    descricao: d.details.descricao,
  };
  if (d.details.dataPagamento != null) inner.dataPagamento = d.details.dataPagamento;
  return {
    id: d.id,
    version: d.version,
    colaboradorId: d.colaboradorId,
    status: toStatus(d.status),
    details: { details: inner },
  };
}

function refuseNotApproved(status: string): void {
  if (status !== 'approved') {
    throw new AppError('FORBIDDEN', 'O financeiro somente pode consultar despesas aprovadas.', 403, { ruleId: 'financeApprovedExpenseAccess' });
  }
}

export const requests: { [K in keyof Despesas_aprovadasContracts]: (input: Despesas_aprovadasContracts[K]['input'], ctx: RequestContext) => Promise<Despesas_aprovadasContracts[K]['output']> } = {
  "reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas": async function (input, ctx) {
    const page = input.page != null && Number(input.page) >= 1 ? Math.floor(Number(input.page)) : 1;
    const rawSize = input.pageSize != null && Number(input.pageSize) >= 1 ? Math.floor(Number(input.pageSize)) : 20;
    const pageSize = Math.min(rawSize, 200);

    // financeApprovedExpenseAccess: only status = 'approved' is listed.
    const base: ListDespesaInput = { status: 'approved', page: 1, pageSize: 200 };
    if (input.colaboradorId != null && input.colaboradorId !== '') base.colaboradorId = input.colaboradorId;
    if (input.details != null && input.details.categoria != null && input.details.categoria !== '') {
      base.details = { categoria: input.details.categoria };
    }

    // Load every approved record (exact filters), so the order by expense date is global.
    const all: Array<{ id: string; colaboradorId: string; status: string; dataDespesa: string; categoria: string; valor: string }> = [];
    let current = 1;
    for (;;) {
      const res = await listDespesa({ ...base, page: current, pageSize: 200 }, ctx);
      for (const d of res.items) {
        if (d.status !== 'approved') continue;
        all.push({
          id: d.id,
          colaboradorId: String(d.colaboradorId),
          status: d.status,
          dataDespesa: String(d.details.dataDespesa),
          categoria: String(d.details.categoria),
          valor: String(d.details.valor),
        });
      }
      if (!res.hasMore) break;
      current += 1;
    }

    all.sort((a, b) => (a.dataDespesa < b.dataDespesa ? -1 : a.dataDespesa > b.dataDespesa ? 1 : 0));

    const start = (page - 1) * pageSize;
    const slice = all.slice(start, start + pageSize);
    const items = slice.map((d) => ({
      id: d.id,
      colaboradorId: d.colaboradorId,
      status: toStatus(d.status),
      details: {
        details: {
          dataDespesa: d.dataDespesa,
          categoria: d.categoria,
          valor: d.valor,
        },
      },
    }));

    return {
      despesas: {
        items,
        page,
        pageSize,
        hasMore: start + pageSize < all.length,
      },
    };
  },

  "reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada": async function (input, ctx) {
    const despesa = await getDespesa({ id: String(input.id) }, ctx);
    if (despesa == null) {
      throw new AppError('NOT_FOUND', 'Despesa não encontrada.', 404);
    }
    // financeApprovedExpenseAccess: refuse when the expense is not approved.
    refuseNotApproved(despesa.status);
    return { despesa: toDetalhe(despesa) };
  },

  "reembolsoDespesas.despesas_aprovadas.registrarPagamento": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      // paymentDateRequired
      const dataPagamento = input.details != null ? input.details.dataPagamento : undefined;
      if (dataPagamento == null || String(dataPagamento).trim() === '') {
        throw new AppError('VALIDATION_ERROR', 'A data de pagamento é obrigatória.', 400, { ruleId: 'paymentDateRequired' });
      }

      const atual = await getDespesa({ id: String(input.id) }, bound);
      if (atual == null) {
        throw new AppError('NOT_FOUND', 'Despesa não encontrada.', 404);
      }
      // financeApprovedExpenseAccess: refuse when the expense is not approved.
      refuseNotApproved(atual.status);

      if (Number(atual.version) !== Number(input.version)) {
        throw new AppError('CONFLICT', 'A versão informada não corresponde à versão atual da despesa.', 409);
      }

      const pago = await registrarPagamento(
        {
          id: String(input.id),
          version: Number(input.version),
          details: { dataPagamento: String(dataPagamento) },
        },
        bound,
      );
      return { despesa: toDetalhe(pago) };
    });
  },
};
