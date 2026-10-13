/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/minhas_despesas.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Minhas_despesasContracts, DespesaLoad, DespesaRegistrarDespesa } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';
import { listDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import { createDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/createDespesa.js';
import { updateDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.js';
import { enviarParaAprovacao } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/enviarParaAprovacao.js';
import { reenviarParaAprovacao } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/reenviarParaAprovacao.js';

type LoadInput = Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.load']['input'];
type LoadOutput = Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.load']['output'];

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

interface ExpenseDetails {
  dataDespesa: string;
  categoria: string;
  valor: string;
  descricao: string;
}

function toStatus(status: string): DespesaLoad['status'] {
  switch (status) {
    case 'draft':
    case 'awaitingApproval':
    case 'rejected':
    case 'approved':
    case 'paid':
      return status;
    default:
      throw new AppError('INVALID_DATA', 'unknown despesa status: ' + status, 500);
  }
}

function toLoad(record: DespesaRecord): DespesaLoad {
  return {
    id: record.id,
    version: record.version,
    status: toStatus(record.status),
    details: {
      dataDespesa: record.details.dataDespesa,
      categoria: record.details.categoria,
      valor: record.details.valor,
      descricao: record.details.descricao,
      reenvioRealizado: record.details.reenvioRealizado,
    },
  };
}

function toRegistered(record: DespesaRecord): DespesaRegistrarDespesa {
  return {
    id: record.id,
    version: record.version,
    details: {
      dataDespesa: record.details.dataDespesa,
      categoria: record.details.categoria,
      valor: record.details.valor,
      descricao: record.details.descricao,
    },
  };
}

function resolvePage(input: LoadInput): { page: number; pageSize: number } {
  const rawPage = input.page == null ? 1 : Math.floor(Number(input.page));
  const rawSize = input.pageSize == null ? 20 : Math.floor(Number(input.pageSize));
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(rawSize, 200) : 20;
  return { page, pageSize };
}

// expenseOwnerOnly: the identity of the session (when resolved) must be the collaborator of the request.
function assertSessionOwner(colaboradorId: string, ctx: RequestContext): void {
  const person = ctx.sessionContext.person;
  if (person && person.mdmId !== colaboradorId) {
    throw new AppError('FORBIDDEN', 'colaborador só pode acessar despesas que ele mesmo registrou', 403, { ruleId: 'expenseOwnerOnly' });
  }
}

function blank(value: unknown): boolean {
  return value == null || (typeof value === 'string' && value.trim() === '');
}

// validExpenseData: date, category, value and description are required.
function assertValidExpenseData(details: ExpenseDetails): void {
  const missing: string[] = [];
  if (blank(details.dataDespesa)) missing.push('dataDespesa');
  if (blank(details.categoria)) missing.push('categoria');
  if (blank(details.valor)) missing.push('valor');
  if (blank(details.descricao)) missing.push('descricao');
  if (missing.length > 0) {
    throw new AppError('VALIDATION_ERROR', 'despesa deve conter data, categoria, valor e descrição: faltam ' + missing.join(', '), 422, { ruleId: 'validExpenseData' });
  }
}

async function readOwnedDespesa(id: string, colaboradorId: string, ctx: RequestContext): Promise<DespesaRecord> {
  assertSessionOwner(colaboradorId, ctx);
  const found = await listDespesa({ id, page: 1, pageSize: 1 }, ctx);
  const record: DespesaRecord | undefined = found.items.find((item) => item.id === id);
  if (!record) throw new AppError('NOT_FOUND', 'Despesa não encontrada: ' + id, 404);
  // expenseOwnerOnly
  if (String(record.colaboradorId) !== colaboradorId) {
    throw new AppError('FORBIDDEN', 'colaborador só pode corrigir ou reenviar despesas que ele mesmo registrou', 403, { ruleId: 'expenseOwnerOnly' });
  }
  return record;
}

function assertSingleResubmission(record: DespesaRecord): void {
  // singleResubmission: a rejected despesa is corrected and resubmitted only once.
  if (record.details.reenvioRealizado) {
    throw new AppError('CONFLICT', 'despesa rejeitada já foi corrigida e reenviada uma vez', 409, { ruleId: 'singleResubmission' });
  }
  if (record.status !== 'rejected') {
    throw new AppError('INVALID_STATE', 'somente despesa rejeitada pode ser corrigida e reenviada', 409);
  }
}

async function loadMinhasDespesas(input: LoadInput, ctx: RequestContext): Promise<LoadOutput> {
  const person = ctx.sessionContext.person;
  const colaboradorId = input.colaboradorId != null && input.colaboradorId !== '' ? input.colaboradorId : person?.mdmId;
  if (colaboradorId == null) {
    throw new AppError('FORBIDDEN', 'colaborador não identificado para listar as próprias despesas', 403, { ruleId: 'expenseOwnerOnly' });
  }
  assertSessionOwner(colaboradorId, ctx);
  const { page, pageSize } = resolvePage(input);
  const result = await listDespesa({ colaboradorId, page, pageSize }, ctx);
  return {
    minhasDespesas: result.items.map((item: DespesaRecord) => toLoad(item)),
    pageListaMinhasDespesas: page,
    pageSizeListaMinhasDespesas: pageSize,
    hasMoreListaMinhasDespesas: result.hasMore,
  };
}

export const requests: { [K in keyof Minhas_despesasContracts]: (input: Minhas_despesasContracts[K]['input'], ctx: RequestContext) => Promise<Minhas_despesasContracts[K]['output']> } = {
  "reembolsoDespesas.minhas_despesas.load": async function (input, ctx) {
    return loadMinhasDespesas(input, ctx);
  },

  "reembolsoDespesas.minhas_despesas.loadMinhasDespesas": async function (input, ctx) {
    return loadMinhasDespesas(input, ctx);
  },

  "reembolsoDespesas.minhas_despesas.registrarDespesa": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      assertSessionOwner(input.colaboradorId, bound);
      assertValidExpenseData(input.details);
      const created = await createDespesa({
        colaboradorId: input.colaboradorId,
        details: {
          dataDespesa: input.details.dataDespesa,
          categoria: input.details.categoria,
          valor: input.details.valor,
          descricao: input.details.descricao,
        },
      }, bound);
      return { despesa: toRegistered(created) };
    });
  },

  "reembolsoDespesas.minhas_despesas.corrigirDespesa": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await readOwnedDespesa(input.id, input.colaboradorId, bound);
      assertValidExpenseData(input.details);
      assertSingleResubmission(current);
      const updated = await updateDespesa({
        id: input.id,
        version: Number(input.version),
        colaboradorId: current.colaboradorId,
        status: current.status,
        details: {
          dataDespesa: input.details.dataDespesa,
          categoria: input.details.categoria,
          valor: input.details.valor,
          descricao: input.details.descricao,
          reenvioRealizado: current.details.reenvioRealizado,
          ...(current.details.motivoRejeicao != null ? { motivoRejeicao: current.details.motivoRejeicao } : {}),
          ...(current.details.dataPagamento != null ? { dataPagamento: current.details.dataPagamento } : {}),
        },
      }, bound);
      return { despesa: toRegistered(updated) };
    });
  },

  "reembolsoDespesas.minhas_despesas.enviarParaAprovacao": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await readOwnedDespesa(input.id, input.colaboradorId, bound);
      assertValidExpenseData(input.details);
      assertValidExpenseData(current.details);
      const sent = await enviarParaAprovacao({ id: input.id, version: Number(input.version) }, bound);
      return { despesa: toRegistered(sent) };
    });
  },

  "reembolsoDespesas.minhas_despesas.reenviarParaAprovacao": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await readOwnedDespesa(input.id, input.colaboradorId, bound);
      assertValidExpenseData(input.details);
      assertValidExpenseData(current.details);
      assertSingleResubmission(current);
      const resent = await reenviarParaAprovacao({ id: input.id, version: Number(input.version) }, bound);
      return { despesa: toRegistered(resent) };
    });
  },
};
