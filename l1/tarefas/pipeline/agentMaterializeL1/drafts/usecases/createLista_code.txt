/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/createLista.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { Lista } from '/_102047_/l1/tarefas/layer_3_domain/entities/lista.js';

export interface CreateListaInput extends Record<string, unknown> {
nome: string;
ativa: boolean;
details: {
tipo: string;
descricao?: string;
};
}

export interface CreateListaOutput extends Record<string, unknown> {
id: string;
version: number;
nome: string;
ativa: boolean;
details: {
tipo: string;
descricao?: string;
quantidadeTarefasAbertas?: number;
};
}

function isGestor(ctx: RequestContext): boolean {
const scopes: string[] = [];
const fromSession = ctx.sessionContext?.actorScope;
if (Array.isArray(fromSession)) scopes.push(...fromSession);
const fromActor = ctx.sessionContext?.actorSession?.scope;
if (Array.isArray(fromActor)) scopes.push(...fromActor);
const actorId = ctx.sessionContext?.actorId ?? ctx.sessionContext?.actorSession?.actorId;
if (typeof actorId === 'string') scopes.push(actorId);
return scopes.some((s) => s === 'gestor' || s.endsWith(':gestor'));
}

export async function createLista(input: CreateListaInput, ctx: RequestContext): Promise<CreateListaOutput> {
if (!isGestor(ctx)) {
throw new AppError('FORBIDDEN', 'Only the gestor can register lists.', 403, { ruleId: 'listaMantidaPorGestor' });
}

const nome = typeof input.nome === 'string' ? input.nome.trim() : '';
if (nome === '') {
throw new AppError('INVALID_NOME', 'The list name is required.', 400);
}
if (nome.length > 120) {
throw new AppError('INVALID_NOME', 'The list name must have at most 120 characters.', 400);
}
if (typeof input.ativa !== 'boolean') {
throw new AppError('INVALID_ATIVA', 'The field ativa must be a boolean.', 400);
}
const ativa: boolean = input.ativa;

const tipoRaw = input.details?.tipo;
if (tipoRaw !== 'project' && tipoRaw !== 'area') {
throw new AppError('INVALID_TIPO', 'The list type must be project or area.', 400);
}
const tipo: 'project' | 'area' = tipoRaw;

const descricaoRaw = input.details?.descricao;
let descricao: string | undefined;
if (descricaoRaw !== undefined && descricaoRaw !== null) {
if (typeof descricaoRaw !== 'string') {
throw new AppError('INVALID_DESCRICAO', 'The description must be text.', 400);
}
if (descricaoRaw.length > 2000) {
throw new AppError('INVALID_DESCRICAO', 'The description must have at most 2000 characters.', 400);
}
descricao = descricaoRaw;
}

const repository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

const existing = await repository.list({});
const duplicated = existing.some((l) => String(l.nome).trim().toLowerCase() === nome.toLowerCase());
if (duplicated) {
throw new AppError('LISTA_NOME_DUPLICADO', 'There is already a list with this name.', 409, { ruleId: 'listaNomeUnico' });
}

const details: Lista['details'] = { tipo };
if (descricao !== undefined) details.descricao = descricao;

const record: Lista = {
id: ctx.idGenerator.newId(),
version: 1,
nome,
ativa,
details,
};

const created = await repository.create(record);

const outDetails: CreateListaOutput['details'] = { tipo: created.details.tipo };
if (created.details.descricao !== undefined) outDetails.descricao = created.details.descricao;

return {
id: created.id,
version: created.version,
nome: created.nome,
ativa: created.ativa,
details: outDetails,
};
}
