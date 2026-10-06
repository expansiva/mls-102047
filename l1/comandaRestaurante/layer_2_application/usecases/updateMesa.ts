/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateMesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Mesa } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.js';
import type { MesaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.js';

export interface UpdateMesaInput extends Record<string, unknown> {
  code: string;
  details: Record<string, unknown>;
  id: string;
  version: number;
}

export interface UpdateMesaOutput extends Record<string, unknown> {
  id: string;
  version: number;
  code: string;
  details: {
    disponivel?: boolean;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function updateMesa(input: UpdateMesaInput, ctx: RequestContext): Promise<UpdateMesaOutput> {
  const id = String(input.id);
  const code = String(input.code);
  const version = Number(input.version);

  if (!id || !code || !Number.isInteger(version)) {
    throw new AppError('INVALID_INPUT', 'Mesa id, code, and version are required.', 400, { ruleId: 'updateMesaInput' });
  }
  if (!isRecord(input.details)) {
    throw new AppError('INVALID_INPUT', 'Mesa details must be an object.', 400, { ruleId: 'updateMesaInput' });
  }

  const repository = resolveRepository<MesaRepository>(ctx, 'MesaRepository');
  const current = await repository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'Mesa was not found.', 404);
  }
  if (current.version !== version) {
    throw new AppError('VERSION_CONFLICT', 'Mesa was modified by another request.', 409, { ruleId: 'version' });
  }

  const duplicate = (await repository.list({ code })).some((mesa) => mesa.id !== id);
  if (duplicate) {
    throw new AppError('CONFLICT', 'Another mesa already uses this code.', 409, { ruleId: 'uniqueKeys' });
  }

  // details.disponivel is derived from open comandas and is never written from input.
  const next: Mesa = {
    id: current.id,
    version: current.version,
    code,
    details: {}
  };
  const saved = await repository.update(next);

  return {
    id: String(saved.id),
    version: Number(saved.version),
    code: String(saved.code),
    details: {}
  };
}
