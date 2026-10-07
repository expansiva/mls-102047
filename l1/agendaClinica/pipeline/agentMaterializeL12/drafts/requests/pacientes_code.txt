/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/pacientes.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { PacientesContracts } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
import { createPaciente, type CreatePacienteOutput } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/createPaciente.js';
import { getPaciente, type GetPacienteOutput } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/getPaciente.js';
import { listPaciente, type ListPacienteOutput } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/listPaciente.js';

const pageSizeOf = (pageSize: number): number => Math.min(200, Math.max(1, pageSize));
const pageOf = (page: number): number => Math.max(1, page);

function statusOf(value: string): 'Active' | 'Inactive' | 'Merged' | 'Blocked' {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_DATA', `Paciente returned an unsupported status: ${value}`, 500);
}

function docTypeOf(value: string): 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other' {
  if (value === 'SSN' || value === 'EIN' || value === 'Passport' || value === 'DriversLicense' || value === 'NationalId' || value === 'CPF' || value === 'CNPJ' || value === 'VAT' || value === 'Other') return value;
  throw new AppError('INVALID_DATA', `Paciente returned an unsupported document type: ${value}`, 500);
}

type PatientRecord = ListPacienteOutput['items'][number] | CreatePacienteOutput;

function listItem(record: PatientRecord): PacientesContracts['agendaClinica.pacientes.searchPatients']['output']['patients']['items'][number] {
  const identification = record.details.identification;
  const item: PacientesContracts['agendaClinica.pacientes.searchPatients']['output']['patients']['items'][number] = {
    id: record.id,
    details: {
      identification: {
        details: {
          identification: {
            name: identification.name,
            status: statusOf(identification.status),
          },
        },
      },
    },
  };
  if (identification.docId != null) item.details.identification.details.identification.docId = identification.docId;
  return item;
}

function detail(record: GetPacienteOutput | CreatePacienteOutput): PacientesContracts['agendaClinica.pacientes.loadPatientDetail']['output']['patient'] {
  const identification = record.details.identification;
  const result: PacientesContracts['agendaClinica.pacientes.loadPatientDetail']['output']['patient'] = {
    id: record.id,
    details: {
      identification: {
        details: {
          identification: {
            subtype: 'Person',
            name: identification.name,
            status: statusOf(identification.status),
          },
        },
      },
      base: { details: { base: JSON.stringify(record.details.base) } },
    },
  };
  if (identification.docType != null) result.details.identification.details.identification.docType = docTypeOf(identification.docType);
  if (identification.docId != null) result.details.identification.details.identification.docId = identification.docId;
  return result;
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
}

export const requests: { [K in keyof PacientesContracts]: (input: PacientesContracts[K]['input'], ctx: RequestContext) => Promise<PacientesContracts[K]['output']> } = {
  'agendaClinica.pacientes.loadPatients': async function (input, _ctx) {
    const page = pageOf(input.page);
    const pageSize = pageSizeOf(input.pageSize);
    return { patients: { items: [], page, pageSize, hasMore: false } };
  },

  'agendaClinica.pacientes.searchPatients': async function (input, ctx) {
    const all: ListPacienteOutput['items'] = [];
    let sourcePage = 1;
    let hasMore = true;
    while (hasMore) {
      const listed = await listPaciente({ page: sourcePage, pageSize: 200 }, ctx);
      all.push(...listed.items);
      hasMore = listed.hasMore;
      sourcePage += 1;
    }
    const term = normalize(input.nameSearch);
    const matching = all.filter((record) => normalize(record.details.identification.name).includes(term));
    const page = pageOf(input.page);
    const pageSize = pageSizeOf(input.pageSize);
    const start = (page - 1) * pageSize;
    return {
      patients: {
        items: matching.slice(start, start + pageSize).map(listItem),
        page,
        pageSize,
        hasMore: start + pageSize < matching.length,
      },
    };
  },

  'agendaClinica.pacientes.loadPatientDetail': async function (input, ctx) {
    const record = await getPaciente({ id: input.patientId }, ctx);
    if (record == null) throw new AppError('NOT_FOUND', `Paciente ${input.patientId} não encontrado`, 404);
    return { patient: detail(record) };
  },

  'agendaClinica.pacientes.savePatient': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const identification = input.details.identification;
      const createInput: { details: { identification: { name: string; docType?: string; docId?: string } } } = {
        details: { identification: { name: identification.name } },
      };
      if (identification.docType != null) createInput.details.identification.docType = identification.docType;
      if (identification.docId != null) createInput.details.identification.docId = identification.docId;
      const record = await createPaciente(createInput, bound);
      return { patient: detail(record), patientListItem: listItem(record) };
    });
  },
};
