/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/getComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.js';
export interface GetComandaInput extends Record<string, unknown> {
id: string;
}
export interface GetComandaOutput extends Record<string, unknown> {
id: string;
version: number;
number: number;
mesaId: string;
status: string;
details: {
discountAmount?: string;
paymentMethod?: string;
subtotal?: string;
totalComanda?: string;
};
}
export async function getComanda(input: GetComandaInput, ctx: RequestContext): Promise<GetComandaOutput> {
const id = String(input.id);
const comandaRepository = resolveRepository<ComandaRepository>(ctx, 'ComandaRepository');
const found = await comandaRepository.get(id);
if (!found) {
throw new AppError('NOT_FOUND', 'Comanda was not found.', 404);
}
return { id: found.id, version: found.version, number: found.number, mesaId: found.mesaId, status: found.status, details: { ...found.details } };
}
