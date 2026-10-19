/// <mls fileReference="_102047_/l1/inicio/layer_2_application/workflows/liberacaoAcessoPessoa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { OccurrenceKey, OccurrenceSnapshot } from '/_102034_/l1/workflow/index.js';
import { readAccessRequestState } from '/_102034_/l1/mdm/registration.js';
import { engines, workflowTables } from '/_102047_/l1/inicio/layer_1_external/adapters/workflow/engine.js';

const PROJECT_ID = '102047';
const MODULE_ID = 'inicio';
const PROCESS_ID = 'liberacaoAcessoPessoa';
const ENTITY_ID = 'PessoaOrganizacao';

const STEP_AVISO = 'pessoaVeAvisoLiberacao';
const STEP_LIBERA = 'responsavelLiberaAcesso';
const STEP_AGUARDA = 'aguardarLigacaoPlataforma';
const STEP_COMPLETA = 'pessoaCompletaAcesso';
const STEP_END = 'end';

const CONSENT_COUNTRIES: ReadonlySet<string> = new Set([
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

export interface OccurrenceState {
  requestId: string;
  step: string;
  actorNow: string | null;
  done: boolean;
}

export interface AbrirPedidoLiberacaoAcessoInput {
  requestId: string;
}
export type AbrirPedidoLiberacaoAcessoOutput = OccurrenceState;

export interface ResolverResponsavelLiberacaoInput {
  requestId?: string;
}
export interface ResolverResponsavelLiberacaoOutput {
  responsavelId: string;
}

export interface RegistrarLiberacaoConcluidaInput {
  requestId: string;
}
export type RegistrarLiberacaoConcluidaOutput = OccurrenceState;

export interface ConcluirLiberacaoAcessoInput {
  requestId: string;
}
export type ConcluirLiberacaoAcessoOutput = OccurrenceState;

function engine() {
  return engines.liberacaoAcessoPessoa;
}

function table() {
  return workflowTables.liberacaoAcessoPessoa;
}

function requireRequestId(requestId: string, ruleId: string): void {
  if (typeof requestId !== 'string' || requestId.trim() === '') {
    throw new AppError('REQUEST_ID_REQUIRED', 'requestId is required', 400, { ruleId });
  }
}

function keyOf(requestId: string): OccurrenceKey {
  return {
    project: PROJECT_ID,
    module: MODULE_ID,
    processId: PROCESS_ID,
    entity: ENTITY_ID,
    recordId: requestId,
  };
}

function toState(requestId: string, snapshot: OccurrenceSnapshot): OccurrenceState {
  return {
    requestId,
    step: snapshot.step,
    actorNow: snapshot.actorNow,
    done: snapshot.done,
  };
}

async function requireOccurrence(ctx: RequestContext, requestId: string): Promise<OccurrenceSnapshot> {
  const found = await engine().find(ctx, keyOf(requestId));
  if (found === null) {
    throw new AppError('OCCURRENCE_NOT_FOUND', 'No liberacaoAcessoPessoa occurrence for this request', 404, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }
  return found;
}

async function advanceStep(
  ctx: RequestContext,
  requestId: string,
  from: string,
  to: string,
  actorNow: string | null,
): Promise<OccurrenceSnapshot> {
  // 'conflict' means another call already advanced: the returned occurrence is the current state.
  const result = await engine().advance(ctx, table(), keyOf(requestId), { from, to, actorNow });
  return result.occurrence;
}

export async function resolverResponsavelLiberacao(
  input: ResolverResponsavelLiberacaoInput,
  ctx: RequestContext,
): Promise<ResolverResponsavelLiberacaoOutput> {
  void input;
  const list = await ctx.mdm.collection.listByType({ type: 'inicio.Empresa', page: 1, pageSize: 1 });
  const item = list.items[0];
  if (item === undefined) {
    throw new AppError('EMPRESA_NOT_FOUND', 'No company registered on the platform', 404, {
      ruleId: 'somenteResponsavelEditaEmpresa',
    });
  }
  const empresa = await ctx.mdm.entity.get({ mdmId: item.mdmId });
  const details: Record<string, unknown> = { ...empresa.details };
  const refs = details.relationshipRefs;
  let responsavelId: string | null = null;
  if (typeof refs === 'object' && refs !== null && !Array.isArray(refs)) {
    const refsRecord: Record<string, unknown> = { ...refs };
    const value = refsRecord.responsavel;
    if (typeof value === 'string' && value !== '') {
      responsavelId = value;
    } else if (Array.isArray(value) && typeof value[0] === 'string' && value[0] !== '') {
      responsavelId = value[0];
    }
  }
  if (responsavelId === null) {
    throw new AppError('RESPONSAVEL_NOT_FOUND', 'The platform does not recognize a responsible for the company', 404, {
      ruleId: 'somenteResponsavelEditaEmpresa',
    });
  }
  return { responsavelId };
}

export async function abrirPedidoLiberacaoAcesso(
  input: AbrirPedidoLiberacaoAcessoInput,
  ctx: RequestContext,
): Promise<AbrirPedidoLiberacaoAcessoOutput> {
  requireRequestId(input.requestId, 'ligacaoLoginPelaPlataforma');
  const requestId = input.requestId;

  const existing = await engine().find(ctx, keyOf(requestId));
  if (existing === null) {
    const state = await readAccessRequestState(ctx, { requestId });
    if (state.status !== 'pending') {
      throw new AppError(
        'ACCESS_REQUEST_NOT_PENDING',
        'The platform did not indicate a pending contact e-mail conflict for this request',
        409,
        { ruleId: 'ligacaoLoginPelaPlataforma' },
      );
    }
  }

  const personNow = ctx.sessionContext.person?.mdmId ?? null;
  const opened = await engine().open(ctx, table(), keyOf(requestId), STEP_AVISO, personNow);
  if (opened.occurrence.step !== STEP_AVISO) {
    return toState(requestId, opened.occurrence);
  }

  const { responsavelId } = await resolverResponsavelLiberacao({ requestId }, ctx);
  const advanced = await advanceStep(ctx, requestId, STEP_AVISO, STEP_LIBERA, responsavelId);
  return toState(requestId, advanced);
}

export async function registrarLiberacaoConcluida(
  input: RegistrarLiberacaoConcluidaInput,
  ctx: RequestContext,
): Promise<RegistrarLiberacaoConcluidaOutput> {
  requireRequestId(input.requestId, 'ligacaoLoginPelaPlataforma');
  const requestId = input.requestId;

  const current = await requireOccurrence(ctx, requestId);
  if (current.done || current.step === STEP_COMPLETA) {
    return toState(requestId, current);
  }
  if (current.step !== STEP_LIBERA && current.step !== STEP_AGUARDA) {
    throw new AppError(
      'OCCURRENCE_NOT_WAITING',
      'The occurrence is not waiting for the platform release',
      409,
      { ruleId: 'ligacaoLoginPelaPlataforma' },
    );
  }

  const state = await readAccessRequestState(ctx, { requestId });
  if (state.status !== 'resolved') {
    throw new AppError(
      'LOGIN_NOT_LINKED',
      'The login is not yet linked to a registration by the platform',
      409,
      { ruleId: 'ligacaoLoginPelaPlataforma' },
    );
  }
  const pessoaId = state.person.mdmId;

  let snapshot = current;
  if (snapshot.step === STEP_LIBERA) {
    snapshot = await advanceStep(ctx, requestId, STEP_LIBERA, STEP_AGUARDA, null);
  }
  if (snapshot.step === STEP_AGUARDA) {
    snapshot = await advanceStep(ctx, requestId, STEP_AGUARDA, STEP_COMPLETA, pessoaId);
  }
  return toState(requestId, snapshot);
}

export async function concluirLiberacaoAcesso(
  input: ConcluirLiberacaoAcessoInput,
  ctx: RequestContext,
): Promise<ConcluirLiberacaoAcessoOutput> {
  requireRequestId(input.requestId, 'acessoCompletoDadosMinimos');
  const requestId = input.requestId;

  const current = await requireOccurrence(ctx, requestId);
  if (current.done) {
    return toState(requestId, current);
  }
  if (current.step !== STEP_COMPLETA) {
    throw new AppError(
      'OCCURRENCE_NOT_COMPLETING',
      'The person is not at the step of completing the access',
      409,
      { ruleId: 'acessoCompletoDadosMinimos' },
    );
  }

  const state = await readAccessRequestState(ctx, { requestId });
  if (state.status !== 'resolved') {
    throw new AppError(
      'LOGIN_NOT_LINKED',
      'The login is not yet linked to a registration by the platform',
      409,
      { ruleId: 'ligacaoLoginPelaPlataforma' },
    );
  }

  const pessoa = await ctx.mdm.entity.get({ mdmId: state.person.mdmId });
  const name = pessoa.details.name;
  const countryCode = pessoa.details.countryCode;
  const missing: string[] = [];
  if (name == null || name.trim() === '') {
    missing.push('name');
  }
  if (countryCode == null || countryCode.trim() === '') {
    missing.push('countryCode');
  } else if (CONSENT_COUNTRIES.has(countryCode) && pessoa.details.privacyConsent == null) {
    missing.push('privacyConsent');
  }
  if (missing.length > 0) {
    throw new AppError(
      'MINIMUM_DATA_INCOMPLETE',
      `Minimum data is incomplete: ${missing.join(', ')}`,
      409,
      { ruleId: 'acessoCompletoDadosMinimos' },
    );
  }

  const closed = await advanceStep(ctx, requestId, STEP_COMPLETA, STEP_END, null);
  return toState(requestId, closed);
}
