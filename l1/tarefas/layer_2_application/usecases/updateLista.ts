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
  const scope = ctx.sessionContext.actorScope ?? ctx.sessionContext.actorSession.scope ?? [];
  return scope.some((authority) => authority === 'gestor' || authority.endsWith(':gestor'));
}

export async function updateLista(input: UpdateListaInput, ctx: RequestContext): Promise<UpdateListaOutput> {
  if (!isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the manager can change lists.', 403, { ruleId: 'listaMantidaPorGestor' });
  }

  const repository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

  const id = String(input.id ?? '');
  if (!id) {
    throw new AppError('INVALID_INPUT', 'The list id is required.', 400);
  }
  const nome = typeof input.nome === 'string' ? input.nome.trim() : '';
  if (!nome) {
    throw new AppError('INVALID_INPUT', 'The list name is required.', 400);
  }
  if (nome.length > 120) {
    throw new AppError('INVALID_INPUT', 'The list name must have at most 120 characters.', 400);
  }
  if (typeof input.ativa !== 'boolean') {
    throw new AppError('INVALID_INPUT', 'The field ativa must be true or false.', 400);
  }
  const tipo = input.details?.tipo;
  if (tipo !== 'project' && tipo !== 'area') {
    throw new AppError('INVALID_INPUT', 'The list type must be project or area.', 400);
  }
  const descricao = input.details?.descricao;
  if (descricao !== undefined && descricao !== null && typeof descricao !== 'string') {
    throw new AppError('INVALID_INPUT', 'The description must be a text.', 400);
  }
  if (typeof descricao === 'string' && descricao.length > 2000) {
    throw new AppError('INVALID_INPUT', 'The description must have at most 2000 characters.', 400);
  }

  const current = await repository.get(id);
  if (!current) {
    throw new AppError('NOT_FOUND', 'List not found.', 404);
  }
  if (Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'The list was changed by someone else; reload and try again.', 409);
  }

  const sameName = await repository.list({ nome });
  if (sameName.some((other) => other.id !== current.id && other.nome === nome)) {
    throw new AppError('DUPLICATE_NAME', 'There is already a list with this name.', 409, { ruleId: 'listaNomeUnico' });
  }

  const details: Lista['details'] = { tipo };
  if (typeof descricao === 'string') {
    details.descricao = descricao;
  }

  const next: Lista = {
    id: current.id,
    version: current.version,
    nome,
    ativa: input.ativa,
    details,
  };

  const saved = await repository.update(next);

  const outDetails: UpdateListaOutput['details'] = { tipo: saved.details.tipo };
  if (saved.details.descricao !== undefined) {
    outDetails.descricao = saved.details.descricao;
  }
  return {
    id: saved.id,
    version: saved.version,
    nome: saved.nome,
    ativa: saved.ativa,
    details: outDetails,
  };
}
