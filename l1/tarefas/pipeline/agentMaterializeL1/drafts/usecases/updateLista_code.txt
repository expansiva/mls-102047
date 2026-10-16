/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateLista.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { Lista } from '/_102047_/l1/tarefas/layer_3_domain/entities/lista.js';

export interface UpdateListaInput extends Record<string, unknown> {
  nome: string;
  ativa: boolean;
  details: {
    tipo: string;
    descricao?: string;
  };
  id: string;
  version: number;
}

export interface UpdateListaOutput extends Record<string, unknown> {
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
  const scope: string[] = ctx.sessionContext.actorScope ?? ctx.sessionContext.actorSession?.scope ?? [];
  if (scope.includes('tarefas:gestor') || scope.includes('gestor')) return true;
  const actorId = ctx.sessionContext.actorId ?? ctx.sessionContext.actorSession?.actorId;
  return actorId === 'gestor';
}

export async function updateLista(input: UpdateListaInput, ctx: RequestContext): Promise<UpdateListaOutput> {
  if (!isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the manager can change lists.', 403, { ruleId: 'listaMantidaPorGestor' });
  }

  const repository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

  const id = String(input.id ?? '').trim();
  if (!id) {
    throw new AppError('VALIDATION_ERROR', 'The list id is required.', 400);
  }
  const version = Number(input.version);
  if (!Number.isInteger(version)) {
    throw new AppError('VALIDATION_ERROR', 'The list version is required.', 400);
  }
  const nome = typeof input.nome === 'string' ? input.nome.trim() : '';
  if (!nome) {
    throw new AppError('VALIDATION_ERROR', 'The list name is required.', 400);
  }
  if (nome.length > 120) {
    throw new AppError('VALIDATION_ERROR', 'The list name must have at most 120 characters.', 400);
  }
  if (typeof input.ativa !== 'boolean') {
    throw new AppError('VALIDATION_ERROR', 'The field ativa must be true or false.', 400);
  }
  const tipoRaw = input.details?.tipo;
  if (tipoRaw !== 'project' && tipoRaw !== 'area') {
    throw new AppError('VALIDATION_ERROR', 'The list type must be project or area.', 400);
  }
  const tipo: 'project' | 'area' = tipoRaw;
  const descricaoRaw = input.details?.descricao;
  let descricao: string | undefined;
  if (descricaoRaw !== undefined && descricaoRaw !== null) {
    if (typeof descricaoRaw !== 'string') {
      throw new AppError('VALIDATION_ERROR', 'The list description must be text.', 400);
    }
    if (descricaoRaw.length > 2000) {
      throw new AppError('VALIDATION_ERROR', 'The list description must have at most 2000 characters.', 400);
    }
    descricao = descricaoRaw;
  }

  const current = await repository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'List not found.', 404);
  }
  if (current.version !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'The list was changed by someone else; reload and try again.', 409);
  }

  const sameName = await repository.list({ nome });
  if (sameName.some((other) => other.id !== current.id && other.nome === nome)) {
    throw new AppError('CONFLICT', 'There is already a list with this name.', 409, { ruleId: 'listaNomeUnico' });
  }

  const details: Lista['details'] = { tipo };
  if (descricao !== undefined) details.descricao = descricao;

  const next: Lista = {
    id: current.id,
    version: current.version,
    nome,
    ativa: input.ativa,
    details,
  };

  const saved = await repository.update(next);

  const outDetails: UpdateListaOutput['details'] = { tipo: saved.details.tipo };
  if (saved.details.descricao !== undefined) outDetails.descricao = saved.details.descricao;

  return {
    id: saved.id,
    version: saved.version,
    nome: saved.nome,
    ativa: saved.ativa,
    details: outDetails,
  };
}
