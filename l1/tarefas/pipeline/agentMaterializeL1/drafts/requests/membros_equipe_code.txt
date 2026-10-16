/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/membros_equipe.ts" enhancement="_blank"/>
import type { Membros_equipeContracts, MembroEquipeResumo, MembroEquipeIdentificacao } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import type { GetMembroEquipeOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { createMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/createMembroEquipe.js';
import { updateMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateMembroEquipe.js';

type MembroStatus = MembroEquipeIdentificacao['details']['identification']['status'];

const ROLE_TAG = 'tarefas.MembroEquipe';
const STATUS_VALUES: readonly string[] = ['Active', 'Inactive', 'Merged', 'Blocked'];

function toStatus(value: string): MembroStatus {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_MEMBER_STATUS', 'unsupported member status: ' + String(value) + ' (expected one of ' + STATUS_VALUES.join(', ') + ')', 500);
}

function contactText(contact: Record<string, unknown>): string {
  const candidates = [contact['value'], contact['address'], contact['email'], contact['phone']];
  for (const c of candidates) {
    if (typeof c === 'string' && c !== '') {
      const kind = contact['type'] ?? contact['kind'];
      return typeof kind === 'string' && kind !== '' ? kind + ': ' + c : c;
    }
  }
  return JSON.stringify(contact);
}

// Derived fields (status, tags, contacts) are read from the master record, never calculated or written here.
function toResumo(m: GetMembroEquipeOutput): MembroEquipeResumo {
  const ident = m.details.identification;
  const tags = ident.tags == null ? [] : ident.tags;
  const contacts = m.details.base == null || m.details.base.contacts == null ? [] : m.details.base.contacts;
  return {
    id: String(m.id),
    version: Number(m.version),
    details: {
      identification: {
        details: {
          identification: {
            name: ident.name,
            status: toStatus(ident.status),
            countryCode: ident.countryCode,
            tags: tags.join(', '),
          },
        },
      },
      base: {
        details: {
          base: {
            contacts: contacts.map(contactText).join('; '),
          },
        },
      },
    },
  };
}

function normalizeText(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export const requests: { [K in keyof Membros_equipeContracts]: (input: Membros_equipeContracts[K]['input'], ctx: RequestContext) => Promise<Membros_equipeContracts[K]['output']> } = {
  'tarefas.membros_equipe.listarMembrosEquipe': async function (input, ctx) {
    const page = input.page != null && input.page >= 1 ? Math.floor(input.page) : 1;
    const requestedSize = input.pageSize != null && input.pageSize >= 1 ? Math.floor(input.pageSize) : 20;
    const pageSize = Math.min(requestedSize, 200);

    // List every member (no filter: name search is a contains search, not an exact match), then filter here.
    const all: GetMembroEquipeOutput[] = [];
    let cursor = 1;
    for (;;) {
      const res = await listMembroEquipe({ page: cursor, pageSize: 200 }, ctx);
      for (const item of res.items) all.push(item);
      if (!res.hasMore || res.items.length === 0) break;
      cursor += 1;
    }

    const term = input.busca == null ? '' : normalizeText(input.busca.trim());
    const kept = all.filter((m) => {
      const tags = m.details.identification.tags == null ? [] : m.details.identification.tags;
      if (!tags.includes(ROLE_TAG)) return false;
      if (term === '') return true;
      return normalizeText(m.details.identification.name).includes(term);
    });
    kept.sort((a, b) => a.details.identification.name.localeCompare(b.details.identification.name, 'pt-BR', { sensitivity: 'base' }));

    const start = (page - 1) * pageSize;
    const slice = kept.slice(start, start + pageSize);
    return {
      membros: {
        items: slice.map(toResumo),
        page,
        pageSize,
        hasMore: start + pageSize < kept.length,
      },
    };
  },

  'tarefas.membros_equipe.obterMembroEquipe': async function (input, ctx) {
    const membro = await getMembroEquipe({ id: String(input.id) }, ctx);
    if (membro == null) {
      throw new AppError('NOT_FOUND', 'membro da equipe não encontrado: ' + String(input.id), 404);
    }
    return { membro: toResumo(membro) };
  },

  'tarefas.membros_equipe.cadastrarPessoa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const created = await createMembroEquipe(
        {
          details: {
            identification: {
              name: input.details.identification.name,
              countryCode: input.details.identification.countryCode,
            },
            base: {},
          },
        },
        bound,
      );
      return { membro: toResumo(created) };
    });
  },

  'tarefas.membros_equipe.salvarAlteracoesPessoa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const updated = await updateMembroEquipe(
        {
          id: String(input.id),
          version: Number(input.version),
          details: {
            identification: {
              name: input.details.identification.name,
              countryCode: input.details.identification.countryCode,
            },
            base: {},
          },
        },
        bound,
      );
      return { membro: toResumo(updated) };
    });
  },
};
