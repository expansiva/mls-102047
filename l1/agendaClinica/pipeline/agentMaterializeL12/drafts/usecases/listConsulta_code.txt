/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/listConsulta.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';
import type { ConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';

export interface ListConsultaInput extends Record<string, unknown> {
  id?: string;
  pacienteId?: string;
  profissionalId?: string;
  scheduledAt?: string;
  status?: string;
  page: number;
  pageSize: number;
}

export interface ListConsultaOutput extends Record<string, unknown> {
  items: Consulta[];
  hasMore: boolean;
}

export async function listConsulta(
  input: ListConsultaInput,
  ctx: RequestContext,
): Promise<ListConsultaOutput> {
  const repository = resolveRepository<ConsultaRepository>(ctx, 'ConsultaRepository');
  const filter: Record<string, unknown> = {};

  if (input.id !== undefined && input.id !== null && String(input.id) !== '') {
    filter.id = String(input.id);
  }
  if (
    input.pacienteId !== undefined &&
    input.pacienteId !== null &&
    String(input.pacienteId) !== ''
  ) {
    filter.pacienteId = String(input.pacienteId);
  }
  if (
    input.profissionalId !== undefined &&
    input.profissionalId !== null &&
    String(input.profissionalId) !== ''
  ) {
    filter.profissionalId = String(input.profissionalId);
  }
  if (
    input.scheduledAt !== undefined &&
    input.scheduledAt !== null &&
    String(input.scheduledAt) !== ''
  ) {
    filter.scheduledAt = String(input.scheduledAt);
  }
  if (input.status !== undefined && input.status !== null && String(input.status) !== '') {
    filter.status = String(input.status);
  }

  const records = await repository.list(filter);
  const requestedPage = Number(input.page);
  const requestedPageSize = Number(input.pageSize);
  const page = Number.isFinite(requestedPage) && requestedPage >= 1
    ? Math.trunc(requestedPage)
    : 1;
  const pageSize = Number.isFinite(requestedPageSize) && requestedPageSize >= 1
    ? Math.min(200, Math.trunc(requestedPageSize))
    : 20;
  const start = (page - 1) * pageSize;
  const items = records.slice(start, start + pageSize);

  return {
    items,
    hasMore: start + pageSize < records.length,
  };
}
