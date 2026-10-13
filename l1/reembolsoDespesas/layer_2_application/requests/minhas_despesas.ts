/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/minhas_despesas.ts" enhancement="_blank"/>

import type { Minhas_despesasContracts, DespesaResumo, DespesaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/createDespesa.js';
import { enviarParaAprovacao } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/enviarParaAprovacao.js';
import { getDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.js';
import { listDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import type { ListDespesaInput } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import { reenviarParaAprovacao } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/reenviarParaAprovacao.js';
import { updateDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.js';
import type { UpdateDespesaInput } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.js';

type Status = DespesaResumo['status'];

interface DespesaRecord {
  id: string;
  version: number;
  colaboradorId: string;
  status: string;
  details: {
    dataDespesa: string;
    categoria: string;
    valor: string;
    descricao: string;
    motivoRejeicao?: string | null;
    reenvioRealizado: boolean;
    dataPagamento?: string | null;
  };
}

interface ExpenseData {
  dataDespesa: string;
  categoria: string;
  valor: string;
  descricao: string;
}

function toStatus(value: string): Status {
  switch (value) {
    case 'draft':
    case 'awaitingApproval':
    case 'rejected':
    case 'approved':
    case 'paid':
      return value;
    default:
      throw new AppError('INVALID_STATE', 'Situação de despesa desconhecida: ' + String(value), 500);
  }
}

function sessionColaboradorId(ctx: RequestContext): string {
  const person = ctx.sessionContext.person;
  if (person == null || !person.mdmId) {
    throw new AppError('UNAUTHENTICATED', 'Colaborador logado não identificado na sessão.', 401);
  }
  return person.mdmId;
}

function assertOwner(record: DespesaRecord, colaboradorId: string): void {
  if (String(record.colaboradorId) !== colaboradorId) {
    throw new AppError('FORBIDDEN', 'A despesa não pertence ao colaborador logado.', 403, { ruleId: 'expenseOwnerOnly' });
  }
}

function assertValidExpenseData(data: ExpenseData): void {
  const missing: string[] = [];
  if (data.dataDespesa == null || String(data.dataDespesa).trim() === '') missing.push('dataDespesa');
  if (data.categoria == null || String(data.categoria).trim() === '') missing.push('categoria');
  if (data.valor == null || String(data.valor).trim() === '') missing.push('valor');
  if (data.descricao == null || String(data.descricao).trim() === '') missing.push('descricao');
  if (missing.length > 0) {
    throw new AppError('VALIDATION_ERROR', 'Dados obrigatórios da despesa ausentes: ' + missing.join(', ') + '.', 400, { ruleId: 'validExpenseData' });
  }
}

function assertVersion(record: DespesaRecord, version: number): void {
  if (Number(version) !== record.version) {
    throw new AppError('CONFLICT', 'A versão da despesa divergiu da versão lida.', 409);
  }
}

function toResumo(record: DespesaRecord): DespesaResumo {
  return {
    id: record.id,
    status: toStatus(record.status),
    details: {
      details: {
        dataDespesa: record.details.dataDespesa,
        categoria: record.details.categoria,
        valor: record.details.valor,
      },
    },
  };
}

function toDetalhe(record: DespesaRecord): DespesaDetalhe {
  const inner: DespesaDetalhe['details']['details'] = {
    dataDespesa: record.details.dataDespesa,
    categoria: record.details.categoria,
    valor: record.details.valor,
    descricao: record.details.descricao,
    reenvioRealizado: record.details.reenvioRealizado,
  };
  if (record.details.motivoRejeicao != null) inner.motivoRejeicao = record.details.motivoRejeicao;
  if (record.details.dataPagamento != null) inner.dataPagamento = record.details.dataPagamento;
  return {
    id: record.id,
    version: record.version,
    status: toStatus(record.status),
    details: { details: inner },
  };
}

async function loadOwned(id: string, ctx: RequestContext): Promise<DespesaRecord> {
  const colaboradorId = sessionColaboradorId(ctx);
  const record: DespesaRecord | null = await getDespesa({ id }, ctx);
  if (record == null) {
    throw new AppError('NOT_FOUND', 'Despesa não encontrada.', 404);
  }
  // expenseOwnerOnly
  assertOwner(record, colaboradorId);
  return record;
}

export const requests: { [K in keyof Minhas_despesasContracts]: (input: Minhas_despesasContracts[K]['input'], ctx: RequestContext) => Promise<Minhas_despesasContracts[K]['output']> } = {
  'reembolsoDespesas.minhas_despesas.listarMinhasDespesas': async function (input, ctx) {
    const page = input.page > 0 ? Math.floor(input.page) : 1;
    const requestedSize = input.pageSize > 0 ? Math.floor(input.pageSize) : 20;
    const pageSize = Math.min(requestedSize, 200);

    // expenseOwnerOnly: only the logged collaborator's expenses are listed
    const colaboradorId = sessionColaboradorId(ctx);

    const all: DespesaRecord[] = [];
    let cursor = 1;
    for (;;) {
      const filter: ListDespesaInput = { colaboradorId, page: cursor, pageSize: 200 };
      if (input.status !== undefined) filter.status = input.status;
      const res = await listDespesa(filter, ctx);
      for (const d of res.items) all.push(d);
      if (!res.hasMore) break;
      cursor += 1;
    }

    // most recent expense date first
    all.sort((a, b) => {
      const da = String(a.details.dataDespesa);
      const db = String(b.details.dataDespesa);
      if (da < db) return 1;
      if (da > db) return -1;
      return 0;
    });

    const start = (page - 1) * pageSize;
    const slice = all.slice(start, start + pageSize);
    return {
      despesas: {
        items: slice.map(toResumo),
        page,
        pageSize,
        hasMore: start + pageSize < all.length,
      },
    };
  },

  'reembolsoDespesas.minhas_despesas.obterDespesa': async function (input, ctx) {
    const record = await loadOwned(String(input.id), ctx);
    return { despesa: toDetalhe(record) };
  },

  'reembolsoDespesas.minhas_despesas.registrarDespesa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const colaboradorId = sessionColaboradorId(bound);
      if (String(input.colaboradorId) !== colaboradorId) {
        throw new AppError('FORBIDDEN', 'A despesa só pode ser registrada para o colaborador logado.', 403, { ruleId: 'expenseOwnerOnly' });
      }
      const data: ExpenseData = {
        dataDespesa: input.details.dataDespesa,
        categoria: input.details.categoria,
        valor: input.details.valor,
        descricao: input.details.descricao,
      };
      // validExpenseData
      assertValidExpenseData(data);
      const created = await createDespesa({
        colaboradorId,
        details: {
          dataDespesa: data.dataDespesa,
          categoria: data.categoria,
          valor: data.valor,
          descricao: data.descricao,
        },
      }, bound);
      return { despesa: toDetalhe(created), item: toResumo(created) };
    });
  },

  'reembolsoDespesas.minhas_despesas.salvarCorrecao': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await loadOwned(String(input.id), bound);
      if (current.status !== 'rejected') {
        throw new AppError('INVALID_STATE', 'Somente despesas rejeitadas podem ser corrigidas.', 409);
      }
      // singleResubmission
      if (current.details.reenvioRealizado) {
        throw new AppError('INVALID_STATE', 'A despesa já foi corrigida e reenviada uma vez.', 409, { ruleId: 'singleResubmission' });
      }
      assertVersion(current, input.version);
      const data: ExpenseData = {
        dataDespesa: input.details.dataDespesa,
        categoria: input.details.categoria,
        valor: input.details.valor,
        descricao: input.details.descricao,
      };
      // validExpenseData
      assertValidExpenseData(data);

      const updateInput: UpdateDespesaInput = {
        id: current.id,
        version: current.version,
        colaboradorId: current.colaboradorId,
        status: current.status,
        details: {
          dataDespesa: data.dataDespesa,
          categoria: data.categoria,
          valor: data.valor,
          descricao: data.descricao,
          reenvioRealizado: current.details.reenvioRealizado,
        },
      };
      if (current.details.motivoRejeicao != null) updateInput.details.motivoRejeicao = current.details.motivoRejeicao;
      if (current.details.dataPagamento != null) updateInput.details.dataPagamento = current.details.dataPagamento;

      const updated = await updateDespesa(updateInput, bound);
      return { despesa: toDetalhe(updated), item: toResumo(updated) };
    });
  },

  'reembolsoDespesas.minhas_despesas.enviarParaAprovacao': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await loadOwned(String(input.id), bound);
      if (current.status !== 'draft') {
        throw new AppError('INVALID_STATE', 'Somente despesas em rascunho podem ser enviadas para aprovação.', 409);
      }
      assertVersion(current, input.version);
      // validExpenseData
      assertValidExpenseData(current.details);
      const sent = await enviarParaAprovacao({ id: current.id, version: current.version }, bound);
      return { despesa: toDetalhe(sent), item: toResumo(sent) };
    });
  },

  'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await loadOwned(String(input.id), bound);
      if (current.status !== 'rejected') {
        throw new AppError('INVALID_STATE', 'Somente despesas rejeitadas podem ser reenviadas.', 409);
      }
      // singleResubmission
      if (current.details.reenvioRealizado) {
        throw new AppError('INVALID_STATE', 'A despesa já foi reenviada uma vez.', 409, { ruleId: 'singleResubmission' });
      }
      assertVersion(current, input.version);
      // validExpenseData
      assertValidExpenseData(current.details);
      const resent = await reenviarParaAprovacao({ id: current.id, version: current.version }, bound);
      return { despesa: toDetalhe(resent), item: toResumo(resent) };
    });
  },
};
