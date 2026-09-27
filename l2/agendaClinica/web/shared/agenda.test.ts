/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/agenda.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { AgendaClinicaAgendaBase } from '/_102047_/l2/agendaClinica/web/shared/agenda.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: AgendaClinicaAgendaBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_pageStatus = Assert<Assignable<typeof page.pageStatus, "idle" | "loading" | "empty" | "success" | "error">>;
type _State_scenary = Assert<Assignable<typeof page.scenary, "base" | "registrarAtendimento">>;
type _State_id = Assert<Assignable<typeof page.id, unknown>>;
type _State_attendanceNote = Assert<Assignable<typeof page.attendanceNote, unknown>>;
type _State_registrarAtendimentoStatus = Assert<Assignable<typeof page.registrarAtendimentoStatus, "idle" | "loading" | "success" | "error">>;
type _State_registrarAtendimentoError = Assert<Assignable<typeof page.registrarAtendimentoError, unknown>>;
type _State_registrarAtendimentoResult = Assert<Assignable<typeof page.registrarAtendimentoResult, unknown>>;
type _State_id = Assert<Assignable<typeof page.id, unknown>>;
type _State_pacienteId = Assert<Assignable<typeof page.pacienteId, unknown>>;
type _State_profissionalId = Assert<Assignable<typeof page.profissionalId, unknown>>;
type _State_scheduledAt = Assert<Assignable<typeof page.scheduledAt, unknown>>;
type _State_status = Assert<Assignable<typeof page.status, "scheduled" | "noShow" | "attended" | null>>;
type _State_page = Assert<Assignable<typeof page.page, unknown>>;
type _State_listConsultaStatus = Assert<Assignable<typeof page.listConsultaStatus, "idle" | "loading" | "success" | "error">>;
type _State_listConsultaError = Assert<Assignable<typeof page.listConsultaError, unknown>>;
type _State_listConsultaResult = Assert<Assignable<typeof page.listConsultaResult, unknown[]>>;
type _Action_setScenario = Assert<Assignable<typeof page.setScenario, (...args: any[]) => unknown>>;
type _Action_selectRegistrarAtendimentoId = Assert<Assignable<typeof page.selectRegistrarAtendimentoId, (...args: any[]) => unknown>>;
type _Action_setRegistrarAtendimentoDetailsAttendanceNote = Assert<Assignable<typeof page.setRegistrarAtendimentoDetailsAttendanceNote, (...args: any[]) => unknown>>;
type _Action_runRegistrarAtendimento = Assert<Assignable<typeof page.runRegistrarAtendimento, (...args: any[]) => unknown>>;
type _Action_setListConsultaId = Assert<Assignable<typeof page.setListConsultaId, (...args: any[]) => unknown>>;
type _Action_setListConsultaPacienteId = Assert<Assignable<typeof page.setListConsultaPacienteId, (...args: any[]) => unknown>>;
type _Action_setListConsultaProfissionalId = Assert<Assignable<typeof page.setListConsultaProfissionalId, (...args: any[]) => unknown>>;
type _Action_setListConsultaScheduledAt = Assert<Assignable<typeof page.setListConsultaScheduledAt, (...args: any[]) => unknown>>;
type _Action_setListConsultaStatus = Assert<Assignable<typeof page.setListConsultaStatus, (...args: any[]) => unknown>>;
type _Action_runListConsulta = Assert<Assignable<typeof page.runListConsulta, (...args: any[]) => unknown>>;

export {};