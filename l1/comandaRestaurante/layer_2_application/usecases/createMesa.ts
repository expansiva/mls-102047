/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createMesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { MesaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.js';
import type { Mesa } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.js';

export interface CreateMesaInput extends Record<string, unknown> {
code: string;
details: Record<string, unknown>;
}

export interface CreateMesaOutput extends Record<string, unknown> {
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

export async function createMesa(input: CreateMesaInput, ctx: RequestContext): Promise<CreateMesaOutput> {
const code = String(input.code);
const rawDetails: unknown = input.details;
if (!isRecord(rawDetails)) {
throw new AppError('INVALID_VALUE', 'Mesa details must be an object.', 400, { ruleId: 'uniqueKey' });
}

const mesaRepository = resolveRepository<MesaRepository>(ctx, 'MesaRepository');
const taken = await mesaRepository.list({ code });
if (taken.length > 0) {
throw new AppError('CONFLICT', 'A mesa with this code already exists.', 409, { ruleId: 'uniqueKey' });
}

const mesa: Mesa = {
id: ctx.idGenerator.newId(),
version: 1,
code,
details: {
...rawDetails,
disponivel: true,
},
};
const saved = await mesaRepository.create(mesa);

return {
id: saved.id,
version: saved.version,
code: saved.code,
details: {
...saved.details,
disponivel: true,
},
};
}
