/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/membros_equipe.ts" enhancement="_blank"/>
import type { Membros_equipeContracts, PessoaEquipe } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/createMembroEquipe.js';
import { listMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import { updateMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateMembroEquipe.js';

const ROLE_TAG = 'tarefas.MembroEquipe';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 200;

interface MembroLido {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      countryCode: string;
      tags: string[];
    };
    base: {
      contacts: Record<string, unknown>[];
    };
  };
}

type Status = PessoaEquipe['details']['identification']['status'];

function toStatus(value: string): Status {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_STATE', 'unsupported member status: ' + value, 500);
}

function summarizeContact(contact: Record<string, unknown>): string {
  const type = contact['type'] ?? contact['kind'];
  const value = contact['value'] ?? contact['address'];
  if (typeof value === 'string') {
    return typeof type === 'string' ? type + ': ' + value : value;
  }
  return JSON.stringify(contact);
}

function toPessoa(m: MembroLido): PessoaEquipe {
  if (m.details.identification.subtype !== 'Person') {
    throw new AppError('INVALID_STATE', 'unsupported member subtype: ' + m.details.identification.subtype, 500);
  }
  return {
    id: m.id,
    version: m.version,
    details: {
      identification: {
        subtype: 'Person',
        name: m.details.identification.name,
        status: toStatus(m.details.identification.status),
        countryCode: m.details.identification.countryCode,
        tags: m.details.identification.tags.join(', '),
      },
      base: {
        contacts: m.details.base.contacts.map(summarizeContact).join('; '),
      },
    },
  };
}

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export const requests: { [K in keyof Membros_equipeContracts]: (input: Membros_equipeContracts[K]['input'], ctx: RequestContext) => Promise<Membros_equipeContracts[K]['output']> } = {
  "tarefas.membros_equipe.qryPessoasEquipe": async function (input, ctx) {
    const page = input.page >= 1 ? Math.floor(input.page) : DEFAULT_PAGE;
    const requestedSize = input.pageSize >= 1 ? Math.floor(input.pageSize) : DEFAULT_PAGE_SIZE;
    const pageSize = Math.min(requestedSize, MAX_PAGE_SIZE);

    // list every member of the organization, page by page, then filter and paginate here
    const all: MembroLido[] = [];
    let current = 1;
    let more = true;
    while (more) {
      const res = await listMembroEquipe({ page: current, pageSize: MAX_PAGE_SIZE }, ctx);
      for (const item of res.items) all.push(item);
      more = res.hasMore;
      current += 1;
    }

    const term = input.busca != null ? normalize(input.busca.trim()) : '';
    const kept = all
      .filter((m) => m.details.identification.tags.includes(ROLE_TAG))
      .filter((m) => term === '' || normalize(m.details.identification.name).includes(term))
      .sort((a, b) => a.details.identification.name.localeCompare(b.details.identification.name, undefined, { sensitivity: 'base' }));

    const start = (page - 1) * pageSize;
    const slice = kept.slice(start, start + pageSize);
    return {
      pessoas: {
        items: slice.map(toPessoa),
        page,
        pageSize,
        hasMore: start + pageSize < kept.length,
      },
    };
  },

  "tarefas.membros_equipe.cmdCadastrarPessoa": async function (input, ctx) {
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
      return { pessoa: toPessoa(created) };
    });
  },

  "tarefas.membros_equipe.cmdSalvarAlteracoes": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const updated = await updateMembroEquipe({
        id: input.id,
        version: Number(input.version),
        details: {
          identification: {
            name: input.details.identification.name,
            countryCode: input.details.identification.countryCode,
          },
          base: {},
        },
      }, bound);
      return { pessoa: toPessoa(updated) };
    });
  },
};
