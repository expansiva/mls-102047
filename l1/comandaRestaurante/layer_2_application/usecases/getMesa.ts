/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getMesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { MesaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.js';
import type { Mesa } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.js';

export interface GetMesaInput extends Record<string, unknown> {
  id: string;
}

export interface GetMesaOutput extends Record<string, unknown> {
  id: string;
  version: number;
  code: string;
  details: {
    disponivel?: boolean;
  };
}

export async function getMesa(input: GetMesaInput, ctx: RequestContext): Promise<GetMesaOutput> {
  const mesaRepository = resolveRepository<MesaRepository>(ctx, 'MesaRepository');
  const id = String(input.id);
  let found: Mesa;
  try {
    found = await mesaRepository.get(id);
  } catch (error) {
    throw new AppError('NOT_FOUND', 'Mesa was not found.', 404, { cause: error });
  }
  if (!found) {
    throw new AppError('NOT_FOUND', 'Mesa was not found.', 404);
  }
  return {
    id: found.id,
    version: found.version,
    code: found.code,
    details: {
      disponivel: found.details.disponivel,
    },
  };
}
