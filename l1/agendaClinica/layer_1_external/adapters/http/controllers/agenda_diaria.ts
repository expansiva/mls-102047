/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/agenda_diaria.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.js';
import { requests } from '/_102047_/l1/agendaClinica/layer_2_application/requests/agenda_diaria.js';
import type { Agenda_diariaContracts } from '/_102047_/l2/agendaClinica/web/contracts/agenda_diaria.defs.js';

export const routes: ControllerRoute[] = [
  { key: 'agendaClinica.agenda_diaria.carregarAgendaDiaria', handler: handleCarregarAgendaDiaria },
  { key: 'agendaClinica.agenda_diaria.carregarConsultaSelecionada', handler: handleCarregarConsultaSelecionada },
  { key: 'agendaClinica.agenda_diaria.carregarMaisConsultasDoDia', handler: handleCarregarMaisConsultasDoDia },
  { key: 'agendaClinica.agenda_diaria.registrarAtendimento', handler: handleRegistrarAtendimento },
];

async function handleCarregarAgendaDiaria(input: IRequestEnvelope): Promise<BffResponse<Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarAgendaDiaria']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['page', 'pageSize'], ['page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']) as Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarAgendaDiaria']['input'];
  const data = await requests["agendaClinica.agenda_diaria.carregarAgendaDiaria"](params, input.ctx);
  return { ok: true, data: data as Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarAgendaDiaria']['output'], error: null };
}

async function handleCarregarConsultaSelecionada(input: IRequestEnvelope): Promise<BffResponse<Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarConsultaSelecionada']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['consultaId'], ['consultaId'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']) as Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarConsultaSelecionada']['input'];
  const data = await requests["agendaClinica.agenda_diaria.carregarConsultaSelecionada"](params, input.ctx);
  return { ok: true, data: data as Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarConsultaSelecionada']['output'], error: null };
}

async function handleCarregarMaisConsultasDoDia(input: IRequestEnvelope): Promise<BffResponse<Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarMaisConsultasDoDia']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['page', 'pageSize'], ['page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']) as Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarMaisConsultasDoDia']['input'];
  const data = await requests["agendaClinica.agenda_diaria.carregarMaisConsultasDoDia"](params, input.ctx);
  return { ok: true, data: data as Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarMaisConsultasDoDia']['output'], error: null };
}

async function handleRegistrarAtendimento(input: IRequestEnvelope): Promise<BffResponse<Agenda_diariaContracts['agendaClinica.agenda_diaria.registrarAtendimento']['output']>> {
  // LOCAL TEST (07/10/2026): authority check ignored — the VM has no login, verifiedAuthorities is empty.
  // const denied = authorize(input.request, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']);
  // if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id', 'version', 'details', 'details.details', 'details.details.attendanceNote'], ['id', 'version', 'details', 'details.details', 'details.details.attendanceNote'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['profissionalConsultarEregistrarPropriaAgenda', 'profissionalIdentificarPacientesDaPropriaAgenda']) as Agenda_diariaContracts['agendaClinica.agenda_diaria.registrarAtendimento']['input'];
  const data = await requests["agendaClinica.agenda_diaria.registrarAtendimento"](params, input.ctx);
  return { ok: true, data: data as Agenda_diariaContracts['agendaClinica.agenda_diaria.registrarAtendimento']['output'], error: null };
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

