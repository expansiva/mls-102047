/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/membros_equipe.ts" enhancement="_blank"/>
import type { Membros_equipeContracts, MembroEquipeResumo } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/createMembroEquipe.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import type { ListMembroEquipeOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import { updateMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateMembroEquipe.js';

type Status = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

interface MembroFonte {
  id: string;
  version: number;
  details: {
    identification: {
      name: string;
      status: string;
      countryCode: string;
      tags: unknown;
    };
    base: {
      contacts: unknown;
    };
  };
}

type MembroListado = ListMembroEquipeOutput['items'][number];

function toStatus(value: string): Status {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_STATUS', 'Situação do cadastro desconhecida: ' + String(value), 500);
}

function contactToText(contact: unknown): string {
  if (typeof contact === 'string') return contact;
  if (contact !== null && typeof contact === 'object') {
    const c = contact as { [key: string]: unknown };
    const kind = typeof c['kind'] === 'string' ? c['kind'] : typeof c['type'] === 'string' ? c['type'] : '';
    const value = typeof c['value'] === 'string' ? c['value'] : typeof c['address'] === 'string' ? c['address'] : '';
    if (value) return kind ? kind + ': ' + value : value;
    return JSON.stringify(contact);
  }
  return String(contact);
}

function contactsSummary(contacts: unknown): string {
  if (contacts == null) return '';
  if (Array.isArray(contacts)) return contacts.map(contactToText).join(', ');
  return contactToText(contacts);
}

function tagsText(tags: unknown): string {
  if (tags == null) return '';
  if (Array.isArray(tags)) return tags.map((t) => String(t)).join(',');
  return String(tags);
}

// Builds the page shape field by field; the privacy consent (denied to the manager) is never copied.
function toResumo(m: MembroFonte): MembroEquipeResumo {
  return {
    id: m.id,
    version: m.version,
    details: {
      identification: {
        details: {
          identification: {
            name: m.details.identification.name,
            status: toStatus(m.details.identification.status),
            countryCode: m.details.identification.countryCode,
            tags: tagsText(m.details.identification.tags),
          },
        },
      },
      base: {
        details: {
          base: {
            contacts: contactsSummary(m.details.base.contacts),
          },
        },
      },
    },
  };
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export const requests: { [K in keyof Membros_equipeContracts]: (input: Membros_equipeContracts[K]['input'], ctx: RequestContext) => Promise<Membros_equipeContracts[K]['output']> } = {
  "tarefas.membros_equipe.listarMembrosEquipe": async function (input, ctx) {
    const page = input.page >= 1 ? Math.floor(input.page) : 1;
    const requestedSize = input.pageSize >= 1 ? Math.floor(input.pageSize) : 20;
    const pageSize = Math.min(requestedSize, 200);
    const term = input.busca != null && input.busca.trim() !== '' ? normalizeText(input.busca.trim()) : '';

    // The usecase lists the members of the tarefas.MembroEquipe role; the name search is a
    // case/accent-insensitive "contains", so every record is read and filtered here.
    const all: MembroListado[] = [];
    let current = 1;
    let more = true;
    while (more) {
      const res = await listMembroEquipe({ page: current, pageSize: 200 }, ctx);
      for (const item of res.items) all.push(item);
      more = res.hasMore;
      current += 1;
    }

    const kept = all.filter((m) => term === '' || normalizeText(String(m.details.identification.name)).includes(term));
    kept.sort((a, b) => String(a.details.identification.name).localeCompare(String(b.details.identification.name), 'pt'));

    const start = (page - 1) * pageSize;
    const slice = kept.slice(start, start + pageSize);
    return {
      membros: {
        items: slice.map((m) => toResumo(m)),
        page,
        pageSize,
        hasMore: start + pageSize < kept.length,
      },
    };
  },

  "tarefas.membros_equipe.obterMembroEquipe": async function (input, ctx) {
    const membro = await getMembroEquipe({ id: String(input.id) }, ctx);
    return { membro: toResumo(membro) };
  },

  "tarefas.membros_equipe.cadastrarPessoa": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const created = await createMembroEquipe({
        details: {
          identification: {
            name: input.details.identification.name,
            countryCode: input.details.identification.countryCode,
          },
          base: {},
        },
      }, bound);
      return { membro: toResumo(created) };
    });
  },

  "tarefas.membros_equipe.salvarAlteracoesPessoa": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const updated = await updateMembroEquipe({
        id: String(input.id),
        version: Number(input.version),
        details: {
          identification: {
            name: input.details.identification.name,
            countryCode: input.details.identification.countryCode,
          },
          base: {},
        },
      }, bound);
      return { membro: toResumo(updated) };
    });
  },
};
