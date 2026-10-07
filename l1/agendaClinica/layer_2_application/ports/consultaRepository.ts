/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { Consulta } from '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';

export type ConsultaFilter = Record<string, unknown>;

export interface ConsultaRepository {
  create(consulta: Consulta): Promise<Consulta>;
  list(consultaFilter: ConsultaFilter): Promise<Consulta[]>;
  get(id: string): Promise<Consulta>;
  transition(consulta: Consulta, transitionId: string): Promise<Consulta>;
}

let rows = createMemoryTableRepository<Consulta>([]);
function table() { return rows; }
export function resetMemory(seed: Consulta[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<Consulta>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingConsultaRepository: ConsultaRepository = {
  async create(record: Consulta): Promise<Consulta> { await table().insert({ record }); return record; },
  async list(filter: ConsultaFilter): Promise<Consulta[]> { return table().findMany({ where: filter as Partial<Consulta> }); },
  async get(id: string): Promise<Consulta> { throw new AppError('REPOSITORY_NOT_IMPLEMENTED', 'get is not implemented.', 501); },
  async transition(consulta: Consulta, transitionId: string): Promise<Consulta> { void transitionId; const where = { id: consulta.id } as Partial<Consulta>; await table().update({ where, patch: consulta }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
