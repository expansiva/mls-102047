/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/profissionais.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ProfissionaisContracts } from '/_102047_/l2/agendaClinica/web/contracts/profissionais.defs.js';
import { createProfissional } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/createProfissional.js';
import { getProfissional } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/getProfissional.js';
import { listProfissional } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.js';
import { updateProfissional } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/updateProfissional.js';

type Profissional = Awaited<ReturnType<typeof listProfissional>>['items'][number];
type DirectoryItem = ProfissionaisContracts['agendaClinica.profissionais.loadAvailableProfessionals']['output']['professionals']['items'][number];
type ProfessionalRecord = ProfissionaisContracts['agendaClinica.profissionais.getProfessional']['output']['professional'];
type Status = DirectoryItem['details']['identification']['details']['identification']['status'];
type ProfessionalType = DirectoryItem['details']['agendaClinica']['details']['agendaClinica']['professionalType'];
type DocumentType = ProfessionalRecord['details']['identification']['details']['identification']['docType'];

function status(value: string): Status {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_DATA', `Profissional retornou situação inválida: ${value}`, 500);
}

function professionalType(value: string): ProfessionalType {
  if (value === 'medical' || value === 'therapist') return value;
  throw new AppError('INVALID_DATA', `Profissional retornou tipo de atuação inválido: ${value}`, 500);
}

function documentType(value: string): Exclude<DocumentType, undefined> {
  if (value === 'CPF' || value === 'Passport' || value === 'NationalId' || value === 'Other') return value;
  throw new AppError('INVALID_DATA', `Profissional retornou tipo de documento inválido: ${value}`, 500);
}

function directoryItem(record: Profissional): DirectoryItem {
  return {
    id: record.id,
    details: {
      identification: {
        details: {
          identification: {
            name: record.details.identification.name,
            status: status(record.details.identification.status),
          },
        },
      },
      agendaClinica: {
        details: {
          agendaClinica: {
            professionalType: professionalType(record.details.agendaClinica.professionalType),
          },
        },
      },
    },
  };
}

function professionalRecord(
  record: Awaited<ReturnType<typeof getProfissional>> |
    Awaited<ReturnType<typeof createProfissional>> |
    Awaited<ReturnType<typeof updateProfissional>>,
): ProfessionalRecord {
  const identification = record.details.identification;
  const outputIdentification: ProfessionalRecord['details']['identification']['details']['identification'] = {
    name: identification.name,
    status: status(identification.status),
    countryCode: identification.countryCode,
  };
  if (identification.docType != null) outputIdentification.docType = documentType(identification.docType);
  if (identification.docId != null) outputIdentification.docId = identification.docId;
  return {
    id: record.id,
    version: record.version,
    details: {
      identification: { details: { identification: outputIdentification } },
      agendaClinica: {
        details: {
          agendaClinica: {
            professionalType: professionalType(record.details.agendaClinica.professionalType),
          },
        },
      },
    },
  };
}

function pageSize(value: number): number {
  return Math.min(value, 200);
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
}

async function loadAvailable(input: { page: number; pageSize: number }, ctx: RequestContext) {
  const size = pageSize(input.pageSize);
  const result = await listProfissional(
    { details: { identification: { status: 'Active' } }, page: input.page, pageSize: size },
    ctx,
  );
  return {
    professionals: {
      items: result.items.map(directoryItem),
      page: input.page,
      pageSize: size,
      hasMore: result.hasMore,
    },
  };
}

async function searchAvailable(input: { search: string; page: number; pageSize: number }, ctx: RequestContext) {
  const all: Profissional[] = [];
  let sourcePage = 1;
  let hasMore = true;
  const sourcePageSize = 200;
  while (hasMore) {
    const result = await listProfissional(
      { details: { identification: { status: 'Active' } }, page: sourcePage, pageSize: sourcePageSize },
      ctx,
    );
    all.push(...result.items);
    hasMore = result.hasMore;
    sourcePage += 1;
  }
  const term = normalize(input.search);
  const matching = all
    .filter((record) => normalize(record.details.identification.name).includes(term))
    .sort(
      (left, right) =>
        left.details.identification.name.localeCompare(right.details.identification.name) ||
        left.id.localeCompare(right.id),
    );
  const size = pageSize(input.pageSize);
  const start = (input.page - 1) * size;
  const items = matching.slice(start, start + size);
  return {
    professionals: {
      items: items.map(directoryItem),
      page: input.page,
      pageSize: size,
      hasMore: start + size < matching.length,
    },
  };
}

export const requests: { [K in keyof ProfissionaisContracts]: (input: ProfissionaisContracts[K]['input'], ctx: RequestContext) => Promise<ProfissionaisContracts[K]['output']> } = {
  'agendaClinica.profissionais.loadAvailableProfessionals': async function (input, ctx) {
    return loadAvailable(input, ctx);
  },
  'agendaClinica.profissionais.loadMoreAvailableProfessionals': async function (input, ctx) {
    return loadAvailable(input, ctx);
  },
  'agendaClinica.profissionais.searchAvailableProfessionals': async function (input, ctx) {
    return searchAvailable(input, ctx);
  },
  'agendaClinica.profissionais.loadMoreProfessionalSearch': async function (input, ctx) {
    return searchAvailable(input, ctx);
  },
  'agendaClinica.profissionais.getProfessional': async function (input, ctx) {
    const record = await getProfissional({ id: input.id }, ctx);
    return { professional: professionalRecord(record) };
  },
  'agendaClinica.profissionais.createProfessional': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const identification = input.details.identification;
      const record = await createProfissional(
        {
          details: {
            identification: {
              name: identification.name,
              countryCode: identification.countryCode,
              ...(identification.docType != null ? { docType: identification.docType } : {}),
              ...(identification.docId != null ? { docId: identification.docId } : {}),
            },
            agendaClinica: { professionalType: input.details.agendaClinica.professionalType },
          },
        },
        bound,
      );
      return { professional: professionalRecord(record) };
    });
  },
  'agendaClinica.profissionais.updateProfessional': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const identification = input.details.identification;
      const record = await updateProfissional(
        {
          id: input.id,
          version: input.version,
          details: {
            identification: {
              name: identification.name,
              countryCode: identification.countryCode,
              ...(identification.docType != null ? { docType: identification.docType } : {}),
              ...(identification.docId != null ? { docId: identification.docId } : {}),
            },
            agendaClinica: { professionalType: input.details.agendaClinica.professionalType },
          },
        },
        bound,
      );
      return { professional: professionalRecord(record) };
    });
  },
};
