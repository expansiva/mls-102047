/// <mls fileReference="_102047_/l1/inicio/layer_2_application/workflows/liberacaoAcessoPessoa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { taskOccurrence } from '/_102047_/l1/inicio/layer_1_external/adapters/workflow/taskOccurrence.js';
import type { OccurrenceRef, TaskOccurrence } from '/_102047_/l1/inicio/layer_1_external/adapters/workflow/taskOccurrence.js';

const PROJECT = 102047;
const MODULE = 'inicio';
const ENTITY = 'PessoaOrganizacao';
const PROCESS_ID = 'liberacaoAcessoPessoa';
const WORKFLOW_VERSION = '1';
const PESSOA_ROLE_TAG = 'inicio.PessoaOrganizacao';
const EMPRESA_ROLE_TAG = 'inicio.Empresa';

const STEP_PESSOA_VE_AVISO = 'pessoaVeAvisoLiberacao';
const STEP_RESPONSAVEL_LIBERA = 'responsavelLiberaAcesso';
const STEP_AGUARDAR_LIGACAO = 'aguardarLigacaoPlataforma';
const STEP_PESSOA_COMPLETA = 'pessoaCompletaAcesso';
const STEP_CONCLUIDA = 'concluida';

const ACTOR_PLATAFORMA = 'plataforma';
const ACTOR_NENHUM = 'nenhum';

/** Countries that require a privacy consent (Brazil and the European Union), rule acessoCompletoDadosMinimos. */
const CONSENT_COUNTRIES: readonly string[] = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

type OccurrenceKey = Omit<OccurrenceRef, 'workflowVersion'>;

function occurrenceKey(recordId: string): OccurrenceKey {
  return { project: PROJECT, module: MODULE, entity: ENTITY, recordId, processId: PROCESS_ID };
}

function resolvePessoaId(pessoaId: string | undefined, ctx: RequestContext): string {
  const id = pessoaId ?? ctx.sessionContext.person?.mdmId;
  if (id == null || id.trim() === '') {
    throw new AppError('PESSOA_ID_REQUIRED', 'The person of the occurrence was not informed and the session has none.', 400, {
      ruleId: 'repetirNaoDuplicaPessoa',
    });
  }
  return id;
}

async function findOccurrenceOrFail(ctx: RequestContext, pessoaId: string): Promise<TaskOccurrence> {
  const occurrence = await taskOccurrence.find(ctx, occurrenceKey(pessoaId));
  if (occurrence == null) {
    throw new AppError('OCCURRENCE_NOT_FOUND', 'No access release occurrence was opened for this person.', 404, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }
  return occurrence;
}

// ---------------------------------------------------------------------------------------------
// resolverResponsavelLiberacao
// ---------------------------------------------------------------------------------------------

export interface ResolverResponsavelLiberacaoInput {
  /** The company whose responsible is wanted; when absent, the company of the app is used. */
  empresaId?: string;
}

export interface ResolverResponsavelLiberacaoOutput {
  empresaId: string;
  responsavelId: string;
}

/** Read only: asks the platform who it recognizes as responsible for the company (being first to enter does not count). */
export async function resolverResponsavelLiberacao(
  input: ResolverResponsavelLiberacaoInput,
  ctx: RequestContext,
): Promise<ResolverResponsavelLiberacaoOutput> {
  let empresaId = input.empresaId;
  if (empresaId == null) {
    const list = await ctx.mdm.collection.listByType({ type: EMPRESA_ROLE_TAG, page: 1, pageSize: 1 });
    const first = list.items[0];
    if (first == null) {
      throw new AppError('EMPRESA_NOT_FOUND', 'The company of the app was not found on the platform.', 404, {
        ruleId: 'somenteResponsavelEditaEmpresa',
      });
    }
    empresaId = first.mdmId;
  }
  const empresa = await ctx.mdm.entity.get({ mdmId: empresaId });
  const related = (empresa.related as (key: string) => string[]).call(empresa, 'responsavel');
  const responsavelId = related[0];
  if (responsavelId == null) {
    throw new AppError('RESPONSAVEL_NOT_RECOGNIZED', 'The platform recognizes no responsible for the company.', 409, {
      ruleId: 'somenteResponsavelEditaEmpresa',
    });
  }
  return { empresaId: empresa.mdmId, responsavelId };
}

// ---------------------------------------------------------------------------------------------
// abrirPedidoLiberacaoAcesso
// ---------------------------------------------------------------------------------------------

export interface AbrirPedidoLiberacaoAcessoInput {
  /** The authenticated person; when absent, the person of the session. */
  pessoaId?: string;
  /** Whether the platform told that the e-mail could not be linked because of another record with the same contact e-mail. */
  conflitoEmailContato: boolean;
}

export interface AbrirPedidoLiberacaoAcessoOutput {
  pessoaId: string;
  step: string;
  actorNow: string;
  occurrence: TaskOccurrence;
}

/**
 * Opens (or returns) the occurrence of the person and hands it to the responsible.
 * The Task keeps only the reference and the progress; the notification of the responsible
 * follows from the Task now being theirs (actorNow), which the cm reads.
 */
export async function abrirPedidoLiberacaoAcesso(
  input: AbrirPedidoLiberacaoAcessoInput,
  ctx: RequestContext,
): Promise<AbrirPedidoLiberacaoAcessoOutput> {
  const pessoaId = resolvePessoaId(input.pessoaId, ctx);

  if (input.conflitoEmailContato !== true) {
    throw new AppError('EMAIL_CONFLICT_NOT_INDICATED', 'The platform did not indicate a contact e-mail conflict.', 400, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  const pessoa = await ctx.mdm.entity.get({ mdmId: pessoaId });
  const tags = pessoa.details.tags;
  if (!Array.isArray(tags) || !tags.includes(PESSOA_ROLE_TAG)) {
    throw new AppError('NOT_ORGANIZATION_MEMBER', 'The person is not a member of the organization.', 403, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  let occurrence = await taskOccurrence.find(ctx, occurrenceKey(pessoaId));

  if (occurrence == null) {
    const requestId = ctx.requestMeta?.requestId;
    if (requestId == null || requestId.trim() === '') {
      throw new AppError('REQUEST_ID_REQUIRED', 'The request id is required to open the occurrence.', 400, {
        ruleId: 'repetirNaoDuplicaPessoa',
      });
    }
    const ref: OccurrenceRef = { ...occurrenceKey(pessoaId), workflowVersion: WORKFLOW_VERSION };
    occurrence = await taskOccurrence.open(ctx, ref, STEP_PESSOA_VE_AVISO, pessoaId, requestId);
  }

  if (occurrence.step === STEP_PESSOA_VE_AVISO) {
    const { responsavelId } = await resolverResponsavelLiberacao({}, ctx);
    occurrence = await taskOccurrence.advance(ctx, occurrenceKey(pessoaId), STEP_RESPONSAVEL_LIBERA, responsavelId);
  }

  return { pessoaId, step: occurrence.step, actorNow: occurrence.actorNow, occurrence };
}

// ---------------------------------------------------------------------------------------------
// registrarLiberacaoConcluida
// ---------------------------------------------------------------------------------------------

export interface RegistrarLiberacaoConcluidaInput {
  /** The person of the occurrence; when absent, the person of the session. */
  pessoaId?: string;
}

export interface RegistrarLiberacaoConcluidaOutput {
  pessoaId: string;
  step: string;
  actorNow: string;
}

/**
 * Registers that the platform release finished and hands the occurrence back to the person.
 * When the occurrence is still with the responsible, the release they made is what puts it to wait
 * for the platform, so that step is registered first and no step is skipped.
 */
export async function registrarLiberacaoConcluida(
  input: RegistrarLiberacaoConcluidaInput,
  ctx: RequestContext,
): Promise<RegistrarLiberacaoConcluidaOutput> {
  const pessoaId = resolvePessoaId(input.pessoaId, ctx);
  let occurrence = await findOccurrenceOrFail(ctx, pessoaId);

  if (occurrence.step === STEP_PESSOA_COMPLETA || occurrence.step === STEP_CONCLUIDA) {
    return { pessoaId, step: occurrence.step, actorNow: occurrence.actorNow };
  }

  if (occurrence.step !== STEP_AGUARDAR_LIGACAO && occurrence.step !== STEP_RESPONSAVEL_LIBERA) {
    throw new AppError('OCCURRENCE_NOT_WAITING', `The occurrence is in step ${occurrence.step}, not waiting for the platform.`, 409, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  if (ctx.sessionContext.person == null) {
    throw new AppError('LOGIN_NOT_LINKED', 'The login of the person is not linked to a record yet.', 409, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  if (occurrence.step === STEP_RESPONSAVEL_LIBERA) {
    occurrence = await taskOccurrence.advance(ctx, occurrenceKey(pessoaId), STEP_AGUARDAR_LIGACAO, ACTOR_PLATAFORMA);
  }
  occurrence = await taskOccurrence.advance(ctx, occurrenceKey(pessoaId), STEP_PESSOA_COMPLETA, pessoaId);

  return { pessoaId, step: occurrence.step, actorNow: occurrence.actorNow };
}

// ---------------------------------------------------------------------------------------------
// concluirLiberacaoAcesso
// ---------------------------------------------------------------------------------------------

export interface ConcluirLiberacaoAcessoInput {
  /** The person of the occurrence; when absent, the person of the session. */
  pessoaId?: string;
}

export interface ConcluirLiberacaoAcessoOutput {
  pessoaId: string;
  step: string;
  actorNow: string;
  occurrence: TaskOccurrence;
}

/** Closes the occurrence when the minimum data of the person are complete; repeated, returns the closed one. */
export async function concluirLiberacaoAcesso(
  input: ConcluirLiberacaoAcessoInput,
  ctx: RequestContext,
): Promise<ConcluirLiberacaoAcessoOutput> {
  const pessoaId = resolvePessoaId(input.pessoaId, ctx);
  let occurrence = await findOccurrenceOrFail(ctx, pessoaId);

  if (occurrence.step === STEP_CONCLUIDA) {
    return { pessoaId, step: occurrence.step, actorNow: occurrence.actorNow, occurrence };
  }
  if (occurrence.step !== STEP_PESSOA_COMPLETA) {
    throw new AppError('OCCURRENCE_NOT_COMPLETING', `The occurrence is in step ${occurrence.step}, not in the person's completion.`, 409, {
      ruleId: 'ligacaoLoginPelaPlataforma',
    });
  }

  const pessoa = await ctx.mdm.entity.get({ mdmId: pessoaId });
  const name = pessoa.details.name;
  const countryCode = pessoa.details.countryCode;
  const missing: string[] = [];
  if (typeof name !== 'string' || name.trim() === '') {
    missing.push('name');
  }
  if (typeof countryCode !== 'string' || countryCode.trim() === '') {
    missing.push('countryCode');
  } else if (CONSENT_COUNTRIES.includes(countryCode) && pessoa.details.privacyConsent == null) {
    missing.push('privacyConsent');
  }
  if (missing.length > 0) {
    throw new AppError('MINIMUM_DATA_INCOMPLETE', `The minimum data are incomplete: ${missing.join(', ')}.`, 400, {
      ruleId: 'acessoCompletoDadosMinimos',
    });
  }

  occurrence = await taskOccurrence.advance(ctx, occurrenceKey(pessoaId), STEP_CONCLUIDA, ACTOR_NENHUM);
  return { pessoaId, step: occurrence.step, actorNow: occurrence.actorNow, occurrence };
}
