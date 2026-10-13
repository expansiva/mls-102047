/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_da_equipe.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Despesas_da_equipeContracts, DespesaLoad, ColaboradorLoad } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.js';
import { listDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import { listColaborador } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listColaborador.js';
import { aprovarDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/aprovarDespesa.js';
import { rejeitarDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/rejeitarDespesa.js';

type DespesaRecord = Awaited<ReturnType<typeof listDespesa>>['items'][number];
type LoadInput = Despesas_da_equipeContracts['reembolsoDespesas.despesas_da_equipe.load']['input'];
type DecisionInput = Despesas_da_equipeContracts['reembolsoDespesas.despesas_da_equipe.approveExpense']['input'];

function toDespesaLoad(d: DespesaRecord): DespesaLoad {
  return {
    id: String(d.id),
    version: Number(d.version),
    colaboradorId: String(d.colaboradorId),
    status: d.status as DespesaLoad['status'],
    details: {
      dataDespesa: d.details.dataDespesa,
      categoria: d.details.categoria,
      valor: d.details.valor,
      reenvioRealizado: d.details.reenvioRealizado,
      motivoRejeicao: d.details.motivoRejeicao ?? '',
    },
  };
}

// Pending team expenses: only the ones awaiting the manager's decision, optionally of one collaborator.
async function listPendingTeamExpenses(input: LoadInput, ctx: RequestContext): Promise<{ items: DespesaLoad[]; page: number; pageSize: number; hasMore: boolean }> {
  const page = input.page != null && input.page >= 1 ? Math.floor(input.page) : 1;
  const pageSize = input.pageSize != null && input.pageSize >= 1 ? Math.min(Math.floor(input.pageSize), 200) : 20;
  const filter: Parameters<typeof listDespesa>[0] = { status: 'awaitingApproval', page, pageSize };
  if (input.colaboradorId != null && input.colaboradorId !== '') filter.colaboradorId = input.colaboradorId;
  const result = await listDespesa(filter, ctx);
  return { items: result.items.map(toDespesaLoad), page, pageSize, hasMore: result.hasMore };
}

// The despesa must exist and belong to the collaborator the manager is acting on.
async function assertTeamExpense(input: DecisionInput, ctx: RequestContext): Promise<void> {
  const found = await listDespesa({ id: String(input.id), page: 1, pageSize: 1 }, ctx);
  const despesa = found.items.find((item) => String(item.id) === String(input.id));
  if (despesa == null) throw new AppError('NOT_FOUND', 'Despesa ' + String(input.id) + ' não encontrada', 404);
  if (String(despesa.colaboradorId) !== String(input.colaboradorId)) {
    throw new AppError('FORBIDDEN', 'A despesa não pertence ao colaborador informado da equipe do gestor', 403, { ruleId: 'managerTeamExpenseAccess' });
  }
}

export const requests: { [K in keyof Despesas_da_equipeContracts]: (input: Despesas_da_equipeContracts[K]['input'], ctx: RequestContext) => Promise<Despesas_da_equipeContracts[K]['output']> } = {
  "reembolsoDespesas.despesas_da_equipe.load": async function (input, ctx) {
    const pending = await listPendingTeamExpenses(input, ctx);
    const ids: string[] = [];
    for (const d of pending.items) if (!ids.includes(d.colaboradorId)) ids.push(d.colaboradorId);
    const colaborador: ColaboradorLoad[] = [];
    for (const id of ids) {
      const found = await listColaborador({ id, page: 1, pageSize: 1 }, ctx);
      const c = found.items.find((item) => String(item.id) === id);
      if (c == null) continue;
      colaborador.push({ id: String(c.id), details: { identification: String(c.details?.identification?.name ?? '') } });
    }
    return {
      despesasDaEquipe: pending.items,
      colaborador,
      pagePendingTeamExpenses: pending.page,
      pageSizePendingTeamExpenses: pending.pageSize,
      hasMorePendingTeamExpenses: pending.hasMore,
    };
  },
  "reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipe": async function (input, ctx) {
    const pending = await listPendingTeamExpenses(input, ctx);
    return {
      despesasDaEquipe: pending.items,
      pagePendingTeamExpenses: pending.page,
      pageSizePendingTeamExpenses: pending.pageSize,
      hasMorePendingTeamExpenses: pending.hasMore,
    };
  },
  "reembolsoDespesas.despesas_da_equipe.approveExpense": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      await assertTeamExpense(input, bound);
      const result = await aprovarDespesa({ id: String(input.id), version: Number(input.version) }, bound);
      return {
        despesa: {
          id: String(result.id),
          version: Number(result.version),
          details: { motivoRejeicao: result.details.motivoRejeicao ?? '' },
        },
      };
    });
  },
  "reembolsoDespesas.despesas_da_equipe.rejectExpense": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const motivo = input.details.motivoRejeicao;
      if (motivo == null || String(motivo).trim() === '') {
        throw new AppError('REJECTION_REASON_REQUIRED', 'A rejeição exige o motivo registrado pelo gestor', 400, { ruleId: 'rejectionReasonRequired' });
      }
      await assertTeamExpense(input, bound);
      const result = await rejeitarDespesa({ id: String(input.id), version: Number(input.version), details: { motivoRejeicao: String(motivo) } }, bound);
      return {
        despesa: {
          id: String(result.id),
          version: Number(result.version),
          details: { motivoRejeicao: result.details.motivoRejeicao ?? '' },
        },
      };
    });
  },
};
