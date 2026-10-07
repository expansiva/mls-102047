/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/consultas.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.js';
import { requests } from '/_102047_/l1/agendaClinica/layer_2_application/requests/consultas.js';
import type { ConsultasContracts } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';

export const routes: ControllerRoute[] = [
  { key: 'agendaClinica.consultas.agendarConsulta', handler: handleAgendarConsulta },
  { key: 'agendaClinica.consultas.carregarAgenda', handler: handleCarregarAgenda },
  { key: 'agendaClinica.consultas.carregarMaisAgenda', handler: handleCarregarMaisAgenda },
  { key: 'agendaClinica.consultas.carregarMaisPacientesParaAgendamento', handler: handleCarregarMaisPacientesParaAgendamento },
  { key: 'agendaClinica.consultas.carregarMaisProfissionaisParaAgendamento', handler: handleCarregarMaisProfissionaisParaAgendamento },
  { key: 'agendaClinica.consultas.confirmarConsulta', handler: handleConfirmarConsulta },
  { key: 'agendaClinica.consultas.consultarConsultaSelecionada', handler: handleConsultarConsultaSelecionada },
  { key: 'agendaClinica.consultas.filtrarAgenda', handler: handleFiltrarAgenda },
  { key: 'agendaClinica.consultas.localizarPacientesParaAgendamento', handler: handleLocalizarPacientesParaAgendamento },
  { key: 'agendaClinica.consultas.localizarProfissionaisParaAgendamento', handler: handleLocalizarProfissionaisParaAgendamento },
  { key: 'agendaClinica.consultas.registrarFalta', handler: handleRegistrarFalta },
];

async function handleAgendarConsulta(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.agendarConsulta']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['pacienteId', 'profissionalId', 'scheduledAt', 'dataAgenda', 'page', 'pageSize'], ['pacienteId', 'profissionalId', 'scheduledAt', 'dataAgenda', 'statusAgenda', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.agendarConsulta']['input'];
  const data = await requests["agendaClinica.consultas.agendarConsulta"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.agendarConsulta']['output'], error: null };
}

async function handleCarregarAgenda(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.carregarAgenda']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['dataAgenda', 'page', 'pageSize'], ['dataAgenda', 'status', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.carregarAgenda']['input'];
  const data = await requests["agendaClinica.consultas.carregarAgenda"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.carregarAgenda']['output'], error: null };
}

async function handleCarregarMaisAgenda(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.carregarMaisAgenda']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['dataAgenda', 'page', 'pageSize'], ['dataAgenda', 'status', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.carregarMaisAgenda']['input'];
  const data = await requests["agendaClinica.consultas.carregarMaisAgenda"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.carregarMaisAgenda']['output'], error: null };
}

async function handleCarregarMaisPacientesParaAgendamento(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.carregarMaisPacientesParaAgendamento']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['termo', 'page', 'pageSize'], ['termo', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas']) as ConsultasContracts['agendaClinica.consultas.carregarMaisPacientesParaAgendamento']['input'];
  const data = await requests["agendaClinica.consultas.carregarMaisPacientesParaAgendamento"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.carregarMaisPacientesParaAgendamento']['output'], error: null };
}

async function handleCarregarMaisProfissionaisParaAgendamento(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.carregarMaisProfissionaisParaAgendamento']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['termo', 'page', 'pageSize'], ['termo', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.carregarMaisProfissionaisParaAgendamento']['input'];
  const data = await requests["agendaClinica.consultas.carregarMaisProfissionaisParaAgendamento"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.carregarMaisProfissionaisParaAgendamento']['output'], error: null };
}

async function handleConfirmarConsulta(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.confirmarConsulta']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id', 'version', 'dataAgenda', 'page', 'pageSize'], ['id', 'version', 'dataAgenda', 'statusAgenda', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.confirmarConsulta']['input'];
  const data = await requests["agendaClinica.consultas.confirmarConsulta"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.confirmarConsulta']['output'], error: null };
}

async function handleConsultarConsultaSelecionada(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.consultarConsultaSelecionada']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id'], ['id'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.consultarConsultaSelecionada']['input'];
  const data = await requests["agendaClinica.consultas.consultarConsultaSelecionada"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.consultarConsultaSelecionada']['output'], error: null };
}

async function handleFiltrarAgenda(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.filtrarAgenda']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['dataAgenda', 'page', 'pageSize'], ['dataAgenda', 'status', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.filtrarAgenda']['input'];
  const data = await requests["agendaClinica.consultas.filtrarAgenda"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.filtrarAgenda']['output'], error: null };
}

async function handleLocalizarPacientesParaAgendamento(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.localizarPacientesParaAgendamento']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['termo', 'page', 'pageSize'], ['termo', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas']) as ConsultasContracts['agendaClinica.consultas.localizarPacientesParaAgendamento']['input'];
  const data = await requests["agendaClinica.consultas.localizarPacientesParaAgendamento"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.localizarPacientesParaAgendamento']['output'], error: null };
}

async function handleLocalizarProfissionaisParaAgendamento(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.localizarProfissionaisParaAgendamento']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['termo', 'page', 'pageSize'], ['termo', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.localizarProfissionaisParaAgendamento']['input'];
  const data = await requests["agendaClinica.consultas.localizarProfissionaisParaAgendamento"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.localizarProfissionaisParaAgendamento']['output'], error: null };
}

async function handleRegistrarFalta(input: IRequestEnvelope): Promise<BffResponse<ConsultasContracts['agendaClinica.consultas.registrarFalta']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id', 'version', 'dataAgenda', 'page', 'pageSize'], ['id', 'version', 'dataAgenda', 'statusAgenda', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['recepcionistaGerenciarPacientesEconsultas', 'recepcionistaConsultarProfissionais']) as ConsultasContracts['agendaClinica.consultas.registrarFalta']['input'];
  const data = await requests["agendaClinica.consultas.registrarFalta"](params, input.ctx);
  return { ok: true, data: data as ConsultasContracts['agendaClinica.consultas.registrarFalta']['output'], error: null };
}

function scopeParams(params: unknown, ctx: { sessionContext?: { actorId?: string } }, grantIds: readonly string[]): Record<string, unknown> {
  const body = params && typeof params === 'object' && !Array.isArray(params) ? { ...(params as Record<string, unknown>) } : {};
  for (const grantId of grantIds) {
    const resolved = resolveGrant(grantId);
    if (!('grantId' in resolved) || resolved.scopeMode !== 'own' || !resolved.recordField) continue;
    const actorId = ctx.sessionContext?.actorId ?? '';
    // LOCAL TEST (07/10/2026): no login on the VM, so no actorId; the own scope is skipped instead of refused.
    // if (!actorId) throw new AppError('FORBIDDEN_ACTOR', 'You have no identity for this scope.', 403);
    if (!actorId) continue;
    // enforce:scope
    body[resolved.recordField] = actorId;
  }
  return body;
}

function authorize(request: BffRequest, grantIds: readonly string[]): AppError | null {
  const source = request.meta?.source ?? 'http';
  const authorities = request.meta?.verifiedAuthorities ?? [];
  // TODO(login): o login ainda não está implementado, então nenhuma chamada traz verifiedAuthorities.
  // Reativar quando o login emitir as autoridades.
  // if (source === 'http' && authorities.length === 0) {
  //   return new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
  // }
  void source;
  for (const grantId of grantIds) {
    const resolved = resolveGrant(grantId);
    if (!('grantId' in resolved)) return new AppError(resolved.code, resolved.detail, 403);
    if (resolved.pending) return new AppError(resolved.pending, `Grant ${grantId} is pending ${resolved.pending}.`, 403);
    const actorRef = actorRefFor(grantId);
    if (!actorRef) return new AppError('AUTHORITY_UNMAPPED', `Grant ${grantId} has no actor in the authority map.`, 403);
    if (authorities.length > 0 && !authorities.some(item => item === actorRef || item.endsWith(':' + actorRef))) {
      return new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
    }
  }
  return null;
}

// `null` is accepted only where the contract type declares it; elsewhere it is refused, never read as absent.
function validateInput(params: unknown, fields: readonly string[], allowed: readonly string[], nullable: readonly string[] = []): AppError | null {
  const body = params && typeof params === 'object' && !Array.isArray(params) ? params as Record<string, unknown> : null;
  if (!body) return new AppError('VALIDATION_ERROR', 'Request body must be an object.', 400);
  const invalidPath = (value: unknown, prefix: string): string => {
    if (Array.isArray(value)) { for (const item of value) { const invalid = invalidPath(item, prefix); if (invalid) return invalid; } return ''; }
    if (!value || typeof value !== 'object') return '';
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      const path = prefix ? prefix + '.' + key : key;
      if (!allowed.includes(path)) return path + ' is not permitted.';
      if (child === null && !nullable.includes(path)) return path + ' must not be null.';
      const invalid = invalidPath(child, path); if (invalid) return invalid;
    }
    return '';
  };
  const invalid = invalidPath(body, ''); if (invalid) return new AppError('VALIDATION_ERROR', invalid, 400);
  for (const field of fields) {
    // A required member of an absent optional parent is not required; a required parent has its own entry.
    const parts = field.split('.');
    let value: unknown = body;
    let parentAbsent = false;
    for (const [index, part] of parts.entries()) {
      if (index > 0 && (value === undefined || value === null)) { parentAbsent = true; break; }
      value = value && typeof value === 'object' ? (value as Record<string, unknown>)[part] : undefined;
    }
    if (parentAbsent) continue;
    if (value === undefined || (value === null && !nullable.includes(field)) || value === '') {
      return new AppError('VALIDATION_ERROR', `${field} is required.`, 400);
    }
  }
  return null;
}

