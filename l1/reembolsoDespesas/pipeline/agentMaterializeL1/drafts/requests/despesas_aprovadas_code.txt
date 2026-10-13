/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_aprovadas.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import { registrarPagamento } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.js';
import type { Despesas_aprovadasContracts } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

type LoadInput = Despesas_aprovadasContracts['reembolsoDespesas.despesas_aprovadas.load']['input'];
type LoadOutput = Despesas_aprovadasContracts['reembolsoDespesas.despesas_aprovadas.load']['output'];

function toStatus(value: string): 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid' {
  switch (value) {
    case 'draft':
    case 'awaitingApproval':
    case 'rejected':
    case 'approved':
    case 'paid':
      return value;
    default:
      throw new AppError('INVALID_STATUS', 'unsupported expense status: ' + String(value), 500);
  }
}

async function loadApproved(input: LoadInput, ctx: RequestContext): Promise<LoadOutput> {
  const page = input.page != null && input.page >= 1 ? Math.floor(input.page) : 1;
  const requestedSize = input.pageSize != null && input.pageSize >= 1 ? Math.floor(input.pageSize) : 20;
  const pageSize = Math.min(requestedSize, 200);

  // financeApprovedExpenseAccess: the finance actor only consults expenses in the approved status.
  const filter: Parameters<typeof listDespesa>[0] = { status: 'approved', page, pageSize };
  if (input.colaboradorId != null && input.colaboradorId !== '') filter.colaboradorId = input.colaboradorId;

  const result = await listDespesa(filter, ctx);

  const despesasAprovadas = result.items.map((item) => ({
    id: String(item.id),
    version: Number(item.version),
    colaboradorId: String(item.colaboradorId),
    status: toStatus(String(item.status)),
    details: {
      dataDespesa: String(item.details.dataDespesa),
      categoria: String(item.details.categoria),
      valor: String(item.details.valor),
      // an approved expense has no payment date yet; the contract type requires a string
      dataPagamento: item.details.dataPagamento == null ? '' : String(item.details.dataPagamento),
    },
  }));

  return {
    despesasAprovadas,
    pageApprovedExpensesList: page,
    pageSizeApprovedExpensesList: pageSize,
    hasMoreApprovedExpensesList: result.hasMore,
  };
}

export const requests: { [K in keyof Despesas_aprovadasContracts]: (input: Despesas_aprovadasContracts[K]['input'], ctx: RequestContext) => Promise<Despesas_aprovadasContracts[K]['output']> } = {
  "reembolsoDespesas.despesas_aprovadas.load": async function (input, ctx) {
    return loadApproved(input, ctx);
  },
  "reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadas": async function (input, ctx) {
    return loadApproved(input, ctx);
  },
  "reembolsoDespesas.despesas_aprovadas.registerPayment": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      const dataPagamento = input.details.dataPagamento;
      if (dataPagamento == null || String(dataPagamento).trim() === '') {
        throw new AppError('PAYMENT_DATE_REQUIRED', 'A data de pagamento é obrigatória para registrar o pagamento.', 400, { ruleId: 'paymentDateRequired' });
      }

      const found = await listDespesa({ id: input.id, page: 1, pageSize: 1 }, bound);
      const current = found.items.find((item) => String(item.id) === input.id);
      if (!current) {
        throw new AppError('NOT_FOUND', 'Despesa não encontrada: ' + input.id, 404);
      }
      if (String(current.status) !== 'approved') {
        throw new AppError('EXPENSE_NOT_APPROVED', 'O financeiro somente pode consultar e pagar despesas aprovadas.', 409, { ruleId: 'financeApprovedExpenseAccess' });
      }

      const updated = await registrarPagamento(
        { id: input.id, version: Number(input.version), details: { dataPagamento: String(dataPagamento) } },
        bound,
      );

      return {
        despesa: {
          id: String(updated.id),
          version: Number(updated.version),
          details: {
            dataPagamento: updated.details.dataPagamento == null ? String(dataPagamento) : String(updated.details.dataPagamento),
          },
        },
      };
    });
  },
};
