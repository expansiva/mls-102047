/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { AgendaClinicaPacientesBase } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: AgendaClinicaPacientesBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_pageStatus = Assert<Assignable<typeof page.pageStatus, "idle" | "loading" | "empty" | "success" | "error">>;
type _State_scenary = Assert<Assignable<typeof page.scenary, "base" | "createPaciente">>;
type _State_name = Assert<Assignable<typeof page.name, unknown>>;
type _State_docType = Assert<Assignable<typeof page.docType, "CPF" | "NationalId" | "Passport" | "Other" | null>>;
type _State_docId = Assert<Assignable<typeof page.docId, unknown>>;
type _State_countryCode = Assert<Assignable<typeof page.countryCode, unknown>>;
type _State_createPacienteStatus = Assert<Assignable<typeof page.createPacienteStatus, "idle" | "loading" | "success" | "error">>;
type _State_createPacienteError = Assert<Assignable<typeof page.createPacienteError, unknown>>;
type _State_createPacienteResult = Assert<Assignable<typeof page.createPacienteResult, unknown>>;
type _State_id = Assert<Assignable<typeof page.id, unknown>>;
type _State_subtype = Assert<Assignable<typeof page.subtype, "Person" | null>>;
type _State_name = Assert<Assignable<typeof page.name, unknown>>;
type _State_docType = Assert<Assignable<typeof page.docType, "CPF" | "NationalId" | "Passport" | "Other" | null>>;
type _State_docId = Assert<Assignable<typeof page.docId, unknown>>;
type _State_countryCode = Assert<Assignable<typeof page.countryCode, unknown>>;
type _State_page = Assert<Assignable<typeof page.page, unknown>>;
type _State_listPacienteStatus = Assert<Assignable<typeof page.listPacienteStatus, "idle" | "loading" | "success" | "error">>;
type _State_listPacienteError = Assert<Assignable<typeof page.listPacienteError, unknown>>;
type _State_listPacienteResult = Assert<Assignable<typeof page.listPacienteResult, unknown[]>>;
type _Action_setScenario = Assert<Assignable<typeof page.setScenario, (...args: any[]) => unknown>>;
type _Action_setCreatePacienteDetailsIdentificationName = Assert<Assignable<typeof page.setCreatePacienteDetailsIdentificationName, (...args: any[]) => unknown>>;
type _Action_setCreatePacienteDetailsIdentificationDocType = Assert<Assignable<typeof page.setCreatePacienteDetailsIdentificationDocType, (...args: any[]) => unknown>>;
type _Action_setCreatePacienteDetailsIdentificationDocId = Assert<Assignable<typeof page.setCreatePacienteDetailsIdentificationDocId, (...args: any[]) => unknown>>;
type _Action_setCreatePacienteDetailsIdentificationCountryCode = Assert<Assignable<typeof page.setCreatePacienteDetailsIdentificationCountryCode, (...args: any[]) => unknown>>;
type _Action_runCreatePaciente = Assert<Assignable<typeof page.runCreatePaciente, (...args: any[]) => unknown>>;
type _Action_setListPacienteId = Assert<Assignable<typeof page.setListPacienteId, (...args: any[]) => unknown>>;
type _Action_setListPacienteDetailsIdentificationSubtype = Assert<Assignable<typeof page.setListPacienteDetailsIdentificationSubtype, (...args: any[]) => unknown>>;
type _Action_setListPacienteDetailsIdentificationName = Assert<Assignable<typeof page.setListPacienteDetailsIdentificationName, (...args: any[]) => unknown>>;
type _Action_setListPacienteDetailsIdentificationDocType = Assert<Assignable<typeof page.setListPacienteDetailsIdentificationDocType, (...args: any[]) => unknown>>;
type _Action_setListPacienteDetailsIdentificationDocId = Assert<Assignable<typeof page.setListPacienteDetailsIdentificationDocId, (...args: any[]) => unknown>>;
type _Action_setListPacienteDetailsIdentificationCountryCode = Assert<Assignable<typeof page.setListPacienteDetailsIdentificationCountryCode, (...args: any[]) => unknown>>;
type _Action_runListPaciente = Assert<Assignable<typeof page.runListPaciente, (...args: any[]) => unknown>>;

export {};