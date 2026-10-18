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
  const scope = ctx.sessionContext?.actorScope ?? ctx.sessionContext?.actorSession?.scope ?? [];
  return scope.some((entry) => entry === 'gestor' || entry.endsWith(':gestor'));
}

export async function createLista(input: CreateListaInput, ctx: RequestContext): Promise<CreateListaOutput> {
  // listaMantidaPorGestor: only the gestor registers lists.
  if (!isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the gestor can create lists.', 403, { ruleId: 'listaMantidaPorGestor' });
  }

  const nome = typeof input.nome === 'string' ? input.nome.trim() : '';
  if (nome.length === 0) {
    throw new AppError('INVALID_INPUT', 'nome is required.', 400);
  }
  if (nome.length > 120) {
    throw new AppError('INVALID_INPUT', 'nome must have at most 120 characters.', 400);
  }
  if (typeof input.ativa !== 'boolean') {
    throw new AppError('INVALID_INPUT', 'ativa is required and must be a boolean.', 400);
  }
  const tipoRaw = input.details?.tipo;
  if (tipoRaw !== 'project' && tipoRaw !== 'area') {
    throw new AppError('INVALID_INPUT', 'details.tipo must be "project" or "area".', 400);
  }
  const tipo: 'project' | 'area' = tipoRaw;
  const descricaoRaw = input.details?.descricao;
  if (descricaoRaw !== undefined && typeof descricaoRaw !== 'string') {
    throw new AppError('INVALID_INPUT', 'details.descricao must be a text.', 400);
  }
  if (typeof descricaoRaw === 'string' && descricaoRaw.length > 2000) {
    throw new AppError('INVALID_INPUT', 'details.descricao must have at most 2000 characters.', 400);
  }

  const repository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');

  // listaNomeUnico: no two lists with the same name.
  const sameName = await repository.list({ nome });
  const normalized = nome.toLocaleLowerCase();
  const duplicate = sameName.some((l) => String(l.nome).trim().toLocaleLowerCase() === normalized);
  if (duplicate) {
    throw new AppError('LISTA_NOME_DUPLICADO', 'A list with this name already exists.', 409, { ruleId: 'listaNomeUnico' });
  }

  const details: Lista['details'] = { tipo };
  if (typeof descricaoRaw === 'string') {
    details.descricao = descricaoRaw;
  }

  const lista: Lista = {
    id: ctx.idGenerator.newId(),
    version: 1,
    nome,
    ativa: input.ativa,
    details,
  };

  const created = await repository.create(lista);

  // quantidadeTarefasAbertas is derived: a list that was just created has no tasks.
  const outDetails: CreateListaOutput['details'] = {
    tipo: created.details.tipo,
    quantidadeTarefasAbertas: 0,
  };
  if (created.details.descricao !== undefined) {
    outDetails.descricao = created.details.descricao;
  }

  return {
    id: created.id,
    version: created.version,
    nome: created.nome,
    ativa: created.ativa,
    details: outDetails,
  };
}
