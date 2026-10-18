/// <mls fileReference="_102047_/l1/inicio/layer_2_application/workflows/liberacaoAcessoPessoa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { OccurrenceKey, OccurrenceSnapshot, WorkflowTable } from '/_102034_/l1/workflow/contracts.js';
import type { WorkflowEngine } from '/_102034_/l1/workflow/engine.js';
import { engines, workflowTables } from '/_102047_/l1/inicio/layer_1_external/adapters/workflow/engine.js';

const PROCESS_ID = 'liberacaoAcessoPessoa';
const MODULE_ID = 'inicio';
const ENTITY = 'PessoaOrganizacao';
const ROLE_TAG = 'inicio.PessoaOrganizacao';
const EMPRESA_TYPE = 'inicio.Empresa';

const STEP_AVISO = 'pessoaVeAvisoLiberacao';
const STEP_RESPONSAVEL = 'responsavelLiberaAcesso';
const STEP_AGUARDA = 'aguardarLigacaoPlataforma';
const STEP_COMPLETA = 'pessoaCompletaAcesso';

// Countries where the privacy consent is required (Brazil and the European Union).
const CONSENT_COUNTRIES: ReadonlySet<string> = new Set([
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

export interface LiberacaoAcessoState {
  pessoaId: string;
  step: string;
  actorNow: string | null;
  done: boolean;
  occurrence: OccurrenceSnapshot;
}

export interface AbrirPedidoLiberacaoAcessoInput {
  pessoaId: string;
  /** The platform told that the account e-mail could not be linked: another record has the same contact e-mail. */
  conflitoEmailContato: boolean;
}
export interface AbrirPedidoLiberacaoAcessoOutput extends LiberacaoAcessoState {
  created: boolean;
  responsavelId: string | null;
}

export interface ResolverResponsavelLiberacaoInput {
  empresaId?: string;
}
export interface ResolverResponsavelLiberacaoOutput {
  empresaId: string;
  responsavelId: string;
}

export interface RegistrarLiberacaoConcluidaInput {
  pessoaId: string;
  /** The platform told that the login of the person is now linked to a record. */
  loginLigado: boolean;
}
export type RegistrarLiberacaoConcluidaOutput = LiberacaoAcessoState;

export interface ConcluirLiberacaoAcessoInput {
  pessoaId: string;
}
export type ConcluirLiberacaoAcessoOutput = LiberacaoAcessoState;

function getEngine(): WorkflowEngine {
  const engine: WorkflowEngine | undefined = engines[PROCESS_ID];
  if (!engine) {
    throw new AppError('WORKFLOW_ENGINE_NOT_FOUND', 'Workflow engine of process ' + PROCESS_ID + ' is not configured', 500);
  }
  return engine;
}

function getTable(): WorkflowTable {
  const table: WorkflowTable | undefined = workflowTables[PROCESS_ID];
  if (!table) {
    throw new AppError('WORKFLOW_TABLE_NOT_FOUND', 'Workflow table of process ' + PROCESS_ID + ' is not configured', 500);
  }
  return table;
}

function keyOf(ctx: RequestContext, pessoaId: string): OccurrenceKey {
  const project = ctx.sessionContext.project.projectId;
  if (project == null || project === '') {
    throw new AppError('PROJECT_REQUIRED', 'The request has no project in its session context', 400);
  }
  return { project, module: MODULE_ID, processId: PROCESS_ID, entity: ENTITY, recordId: pessoaId };
}

function requirePessoaId(pessoaId: string): void {
  if (typeof pessoaId !== 'string' || pessoaId.trim() === '') {
    throw new AppError('PESSOA_ID_REQUIRED', 'pessoaId is required', 400, { ruleId: 'repetirNaoDuplicaPessoa' });
  }
}

function stateOf(pessoaId: string, occurrence: OccurrenceSnapshot): LiberacaoAcessoState {
  return { pessoaId, step: occurrence.step, actorNow: occurrence.actorNow, done: occurrence.done, occurrence };
}

async function loadPessoa(ctx: RequestContext, pessoaId: string) {
  const pessoa = await ctx.mdm.entity.get({ mdmId: pessoaId });
  if (!pessoa) {
    throw new AppError('PESSOA_NOT_FOUND', 'Person ' + pessoaId + ' was not found', 404);
  }
  return pessoa;
}

async function requirePessoaDaOrganizacao(ctx: RequestContext, pessoaId: string) {
  const pessoa = await loadPessoa(ctx, pessoaId);
  const tags = pessoa.details.tags;
  if (!Array.isArray(tags) || !tags.includes(ROLE_TAG)) {
    throw new AppError('PESSOA_NOT_IN_ORGANIZATION', 'The person is not a member of the organization', 403, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }
  return pessoa;
}

function firstResponsavel(refs: unknown): string | null {
  if (refs == null || typeof refs !== 'object') return null;
  const value: unknown = Reflect.get(refs, 'responsavel');
  if (typeof value === 'string' && value !== '') return value;
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === 'string' && item !== '') return item;
    }
  }
  return null;
}

export async function resolverResponsavelLiberacao(
  input: ResolverResponsavelLiberacaoInput,
  ctx: RequestContext,
): Promise<ResolverResponsavelLiberacaoOutput> {
  let empresaId = input.empresaId;
  if (empresaId == null || empresaId === '') {
    const list = await ctx.mdm.collection.listByType({ type: EMPRESA_TYPE, page: 1, pageSize: 1 });
    const first = list.items[0];
    if (!first) {
      throw new AppError('EMPRESA_NOT_FOUND', 'No company of the app was found on the platform', 404, {
        ruleId: 'somenteResponsavelEditaEmpresa',
      });
    }
    empresaId = first.mdmId;
  }
  const empresa = await ctx.mdm.entity.get({ mdmId: empresaId });
  if (!empresa) {
    throw new AppError('EMPRESA_NOT_FOUND', 'Company ' + empresaId + ' was not found', 404);
  }
  // Only who the platform recognizes as responsible counts; being the first to enter does not.
  const refs: unknown = Reflect.get(empresa.details, 'relationshipRefs');
  const responsavelId = firstResponsavel(refs);
  if (responsavelId == null) {
    throw new AppError('RESPONSAVEL_NOT_FOUND', 'The platform recognizes no responsible for the company', 404, {
      ruleId: 'somenteResponsavelEditaEmpresa',
    });
  }
  return { empresaId, responsavelId };
}

export async function abrirPedidoLiberacaoAcesso(
  input: AbrirPedidoLiberacaoAcessoInput,
  ctx: RequestContext,
): Promise<AbrirPedidoLiberacaoAcessoOutput> {
  requirePessoaId(input.pessoaId);
  const engine = getEngine();
  const table = getTable();
  const key = keyOf(ctx, input.pessoaId);

  const existing = await engine.find(ctx, key);
  if (existing && existing.step !== STEP_AVISO) {
    return { ...stateOf(input.pessoaId, existing), created: false, responsavelId: null };
  }

  await requirePessoaDaOrganizacao(ctx, input.pessoaId);
  if (input.conflitoEmailContato !== true) {
    throw new AppError('EMAIL_CONFLICT_NOT_REPORTED', 'The platform did not report a contact e-mail conflict', 409, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  const opened = await engine.open(ctx, table, key, STEP_AVISO, input.pessoaId);
  if (opened.occurrence.step !== STEP_AVISO) {
    return { ...stateOf(input.pessoaId, opened.occurrence), created: false, responsavelId: null };
  }

  const { responsavelId } = await resolverResponsavelLiberacao({}, ctx);
  const advanced = await engine.advance(ctx, table, key, {
    from: STEP_AVISO,
    to: STEP_RESPONSAVEL,
    actorNow: responsavelId,
  });
  return {
    ...stateOf(input.pessoaId, advanced.occurrence),
    created: opened.outcome === 'created',
    responsavelId,
  };
}

export async function registrarLiberacaoConcluida(
  input: RegistrarLiberacaoConcluidaInput,
  ctx: RequestContext,
): Promise<RegistrarLiberacaoConcluidaOutput> {
  requirePessoaId(input.pessoaId);
  const engine = getEngine();
  const table = getTable();
  const key = keyOf(ctx, input.pessoaId);

  const current = await engine.find(ctx, key);
  if (!current) {
    throw new AppError('OCCURRENCE_NOT_FOUND', 'No access release occurrence for person ' + input.pessoaId, 404);
  }
  // Already advanced: nothing to do, same state.
  if (current.done || current.step === STEP_COMPLETA) {
    return stateOf(input.pessoaId, current);
  }
  if (current.step !== STEP_AGUARDA && current.step !== STEP_RESPONSAVEL) {
    throw new AppError('OCCURRENCE_NOT_WAITING', 'The occurrence is not waiting for the platform release', 409, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  await requirePessoaDaOrganizacao(ctx, input.pessoaId);
  if (input.loginLigado !== true) {
    throw new AppError('LOGIN_NOT_LINKED', 'The login of the person is not linked to a record yet', 409, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  let snapshot: OccurrenceSnapshot = current;
  if (snapshot.step === STEP_RESPONSAVEL) {
    // The platform release started by the responsible has ended: the occurrence passes through the wait step.
    const toWait = await engine.advance(ctx, table, key, {
      from: STEP_RESPONSAVEL,
      to: STEP_AGUARDA,
      actorNow: null,
    });
    if (toWait.outcome === 'conflict') {
      return stateOf(input.pessoaId, toWait.occurrence);
    }
    snapshot = toWait.occurrence;
  }
  if (snapshot.step !== STEP_AGUARDA) {
    return stateOf(input.pessoaId, snapshot);
  }
  const advanced = await engine.advance(ctx, table, key, {
    from: STEP_AGUARDA,
    to: STEP_COMPLETA,
    actorNow: input.pessoaId,
  });
  return stateOf(input.pessoaId, advanced.occurrence);
}

export async function concluirLiberacaoAcesso(
  input: ConcluirLiberacaoAcessoInput,
  ctx: RequestContext,
): Promise<ConcluirLiberacaoAcessoOutput> {
  requirePessoaId(input.pessoaId);
  const engine = getEngine();
  const table = getTable();
  const key = keyOf(ctx, input.pessoaId);

  const current = await engine.find(ctx, key);
  if (!current) {
    throw new AppError('OCCURRENCE_NOT_FOUND', 'No access release occurrence for person ' + input.pessoaId, 404);
  }
  if (current.done) {
    return stateOf(input.pessoaId, current);
  }
  if (current.step !== STEP_COMPLETA) {
    throw new AppError('OCCURRENCE_NOT_COMPLETING', 'The person is not completing the access in this occurrence', 409, {
      ruleId: 'acessoCompletoDadosMinimos',
    });
  }

  const pessoa = await requirePessoaDaOrganizacao(ctx, input.pessoaId);
  const name = pessoa.details.name;
  const countryCode = pessoa.details.countryCode;
  const hasName = typeof name === 'string' && name.trim() !== '';
  const hasCountry = typeof countryCode === 'string' && countryCode.trim() !== '';
  if (!hasName || !hasCountry) {
    throw new AppError('MINIMUM_DATA_INCOMPLETE', 'The name and country of the person are required', 400, {
      ruleId: 'acessoCompletoDadosMinimos',
    });
  }
  if (CONSENT_COUNTRIES.has(countryCode) && pessoa.details.privacyConsent == null) {
    throw new AppError('PRIVACY_CONSENT_REQUIRED', 'A valid privacy consent is required for the country of the person', 400, {
      ruleId: 'acessoCompletoDadosMinimos',
    });
  }

  const advanced = await engine.advance(ctx, table, key, {
    from: STEP_COMPLETA,
    to: 'end',
    actorNow: null,
  });
  return stateOf(input.pessoaId, advanced.occurrence);
}
