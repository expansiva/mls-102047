/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/inicio.ts" enhancement="_blank"/>

import type { InicioContracts } from '/_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listDespesa } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.js';
import { getColaborador } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getColaborador.js';
import type { GetColaboradorOutput } from '/_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getColaborador.js';

type QryInicioOutput = InicioContracts['reembolsoDespesas.inicio.qryInicio']['output'];
type ColaboradorStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
type ColaboradorDocType = 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other';

const STATUS_VALUES: ColaboradorStatus[] = ['Active', 'Inactive', 'Merged', 'Blocked'];
const DOC_TYPE_VALUES: ColaboradorDocType[] = ['SSN', 'EIN', 'Passport', 'DriversLicense', 'NationalId', 'CPF', 'CNPJ', 'VAT', 'Other'];
const FETCH_PAGE_SIZE = 200;

function toColaboradorStatus(value: string): ColaboradorStatus {
  const found = STATUS_VALUES.find((s) => s === value);
  if (found === undefined) {
    throw new AppError('INVALID_COLABORADOR_STATUS', `unsupported collaborator status: ${value}`, 500);
  }
  return found;
}

function toDocType(value: string): ColaboradorDocType {
  const found = DOC_TYPE_VALUES.find((d) => d === value);
  if (found === undefined) {
    throw new AppError('INVALID_COLABORADOR_DOCTYPE', `unsupported document type: ${value}`, 500);
  }
  return found;
}

/** True when the ReportsTo reference of the collaborator points to the manager. */
function refsPointTo(value: unknown, managerId: string): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return value === managerId;
  if (Array.isArray(value)) return value.some((v) => refsPointTo(v, managerId));
  if (typeof value === 'object') {
    return Object.values(value as { [key: string]: unknown }).some((v) => refsPointTo(v, managerId));
  }
  return false;
}

function normalizePage(value: number | undefined, fallback: number, max: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), max);
}

export const requests: { [K in keyof InicioContracts]: (input: InicioContracts[K]['input'], ctx: RequestContext) => Promise<InicioContracts[K]['output']> } = {
  "reembolsoDespesas.inicio.qryInicio": async function (input, ctx) {
    const page = normalizePage(input.page, 1, Number.MAX_SAFE_INTEGER);
    const pageSize = normalizePage(input.pageSize, 20, 200);

    // Logged manager.
    const managerId = ctx.sessionContext.person?.mdmId;
    if (managerId == null || managerId === '') {
      throw new AppError('FORBIDDEN', 'manager not identified in the session', 403, { ruleId: 'managerTeamExpenseAccess' });
    }

    // All expenses awaiting approval (status filter), read page by page.
    const pending = [];
    let fetchPage = 1;
    let more = true;
    while (more) {
      const res = await listDespesa({ status: 'awaitingApproval', page: fetchPage, pageSize: FETCH_PAGE_SIZE }, ctx);
      for (const item of res.items) pending.push(item);
      more = res.hasMore === true && res.items.length > 0;
      fetchPage += 1;
    }

    // managerTeamExpenseAccess: only expenses of collaborators that ReportsTo the logged manager.
    const colaboradores = new Map<string, GetColaboradorOutput>();
    const teamMember = new Map<string, boolean>();
    for (const despesa of pending) {
      const colabId = String(despesa.colaboradorId);
      if (teamMember.has(colabId)) continue;
      const colab = await getColaborador({ id: colabId }, ctx);
      colaboradores.set(colabId, colab);
      const refs = colab.details.base.relationshipRefs as { [key: string]: unknown };
      // The MDM keeps a ReportsTo link as `reportManagers` on the collaborator.
      teamMember.set(colabId, refsPointTo(refs['reportManagers'], managerId));
    }
    const team = pending.filter((d) => teamMember.get(String(d.colaboradorId)) === true);

    // Oldest expense date first.
    team.sort((a, b) => {
      const da = String(a.details.dataDespesa);
      const db = String(b.details.dataDespesa);
      if (da < db) return -1;
      if (da > db) return 1;
      return String(a.id) < String(b.id) ? -1 : String(a.id) > String(b.id) ? 1 : 0;
    });

    // totalPendentes: count with the same filters (status and team scope), independent of the page.
    const totalPendentes = team.length;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const slice = team.slice(start, end);

    const items: QryInicioOutput['despesasPendentes']['items'] = slice.map((d) => {
      const colabId = String(d.colaboradorId);
      const colab = colaboradores.get(colabId);
      if (colab === undefined) {
        throw new AppError('NOT_FOUND', `collaborator ${colabId} not found`, 404);
      }
      const ident = colab.details.identification;
      const identification: QryInicioOutput['despesasPendentes']['items'][number]['colaborador']['details']['identification']['details']['identification'] = {
        subtype: 'Person',
        name: ident.name,
        status: toColaboradorStatus(ident.status),
        countryCode: ident.countryCode,
        tags: Array.isArray(ident.tags) ? ident.tags.join(',') : '',
      };
      if (ident.docType != null) identification.docType = toDocType(ident.docType);
      if (ident.docId != null) identification.docId = ident.docId;
      return {
        id: String(d.id),
        colaboradorId: colabId,
        status: 'awaitingApproval' as const,
        details: {
          details: {
            dataDespesa: String(d.details.dataDespesa),
            categoria: String(d.details.categoria),
            valor: String(d.details.valor),
            reenvioRealizado: d.details.reenvioRealizado === true,
          },
        },
        colaborador: {
          id: colab.id,
          details: {
            identification: {
              details: { identification },
            },
          },
        },
      };
    });

    return {
      totalPendentes,
      despesasPendentes: {
        items,
        page,
        pageSize,
        hasMore: end < team.length,
      },
    };
  },
};
