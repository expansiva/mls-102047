/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import {
createPacienteRoute,
listPacienteRoute,
type CreatePacienteInput,
type CreatePacienteOutput,
type ListPacienteInput,
type ListPacienteOutput,
} from '../contracts/pacientes.defs.js';
type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
type Scenario = 'base' | 'createPaciente';
type DocumentType = 'CPF' | 'NationalId' | 'Passport' | 'Other';
type ErrorEnvelope = { code: string; message: string; details?: unknown };
export class PacientesShared extends StateLitElement {
public pageStatus: PageStatus = 'idle';
public scenary: Scenario = 'base';
public stateCreatePacienteDetailsIdentificationName: string | null = null;
public stateCreatePacienteDetailsIdentificationDocType: DocumentType | null = null;
public stateCreatePacienteDetailsIdentificationDocId: string | null = null;
public stateCreatePacienteDetailsIdentificationCountryCode: string | null = null;
public stateCreatePacienteStatus: ActionStatus = 'idle';
public stateCreatePacienteError: ErrorEnvelope | null = null;
public stateCreatePacienteResult: CreatePacienteOutput | null = null;
public stateListPacienteId: string | null = null;
public stateListPacienteDetailsIdentificationSubtype: 'Person' | null = null;
public stateListPacienteDetailsIdentificationName: string | null = null;
public stateListPacienteDetailsIdentificationDocType: DocumentType | null = null;
public stateListPacienteDetailsIdentificationDocId: string | null = null;
public stateListPacienteDetailsIdentificationCountryCode: string | null = null;
public stateListPacientePage: number | null = null;
public stateListPacienteStatus: ActionStatus = 'idle';
public stateListPacienteError: ErrorEnvelope | null = null;
public stateListPacienteResult: ListPacienteOutput = [];
private readonly subscribedStateKeys: string[] = [
'ui.pacientes.pageStatus','ui.pacientes.scenary','ui.pacientes.createPaciente.input.details.identification.name','ui.pacientes.createPaciente.input.details.identification.docType','ui.pacientes.createPaciente.input.details.identification.docId','ui.pacientes.createPaciente.input.details.identification.countryCode','ui.pacientes.createPaciente.status','ui.pacientes.createPaciente.error','ui.pacientes.createPaciente.result','ui.pacientes.listPaciente.input.id','ui.pacientes.listPaciente.input.details.identification.subtype','ui.pacientes.listPaciente.input.details.identification.name','ui.pacientes.listPaciente.input.details.identification.docType','ui.pacientes.listPaciente.input.details.identification.docId','ui.pacientes.listPaciente.input.details.identification.countryCode','ui.pacientes.listPaciente.input.page','ui.pacientes.listPaciente.status','ui.pacientes.listPaciente.error','ui.pacientes.listPaciente.result',
];
private readonly stateMembers: Record<string, string> = {
'ui.pacientes.pageStatus':'pageStatus','ui.pacientes.scenary':'scenary','ui.pacientes.createPaciente.input.details.identification.name':'stateCreatePacienteDetailsIdentificationName','ui.pacientes.createPaciente.input.details.identification.docType':'stateCreatePacienteDetailsIdentificationDocType','ui.pacientes.createPaciente.input.details.identification.docId':'stateCreatePacienteDetailsIdentificationDocId','ui.pacientes.createPaciente.input.details.identification.countryCode':'stateCreatePacienteDetailsIdentificationCountryCode','ui.pacientes.createPaciente.status':'stateCreatePacienteStatus','ui.pacientes.createPaciente.error':'stateCreatePacienteError','ui.pacientes.createPaciente.result':'stateCreatePacienteResult','ui.pacientes.listPaciente.input.id':'stateListPacienteId','ui.pacientes.listPaciente.input.details.identification.subtype':'stateListPacienteDetailsIdentificationSubtype','ui.pacientes.listPaciente.input.details.identification.name':'stateListPacienteDetailsIdentificationName','ui.pacientes.listPaciente.input.details.identification.docType':'stateListPacienteDetailsIdentificationDocType','ui.pacientes.listPaciente.input.details.identification.docId':'stateListPacienteDetailsIdentificationDocId','ui.pacientes.listPaciente.input.details.identification.countryCode':'stateListPacienteDetailsIdentificationCountryCode','ui.pacientes.listPaciente.input.page':'stateListPacientePage','ui.pacientes.listPaciente.status':'stateListPacienteStatus','ui.pacientes.listPaciente.error':'stateListPacienteError','ui.pacientes.listPaciente.result':'stateListPacienteResult',
};
public connectedCallback(): void { super.connectedCallback(); for (const key of this.subscribedStateKeys) { const member = this.stateMembers[key]; const current = getState(key); if (current !== undefined) (this as unknown as Record<string, unknown>)[member] = current; this.stateKeys.set(`${member};${key}`, true); subscribe([`${member};${key}`], this); } void this.runListPaciente(); }
public disconnectedCallback(): void { for (const key of this.subscribedStateKeys) { const member = this.stateMembers[key]; unsubscribe([`${member};${key}`], this); } super.disconnectedCallback(); }
public handleIcaStateChange(key: string, value: unknown): void { const member = this.stateMembers[key]; if (!member) return; (this as unknown as Record<string, unknown>)[member] = value; this.requestUpdate(member); }
private publish<T>(key: string, member: string, value: T): void { (this as unknown as Record<string, unknown>)[member] = value; setState(key, value); }
private error(code: string, message: string, details?: unknown): ErrorEnvelope { return { code, message, ...(details === undefined ? {} : { details }) }; }
public setScenario(value: Scenario): void { if (value !== 'base' && value !== 'createPaciente') { this.publish('ui.pacientes.listPaciente.error', 'stateListPacienteError', this.error('INVALID_SCENARIO', 'The requested scenario is not available.')); return; } this.publish('ui.pacientes.scenary', 'scenary', value); }
public setCreatePacienteDetailsIdentificationName(value: string | null): void { this.publish('ui.pacientes.createPaciente.input.details.identification.name', 'stateCreatePacienteDetailsIdentificationName', value); }
public setCreatePacienteDetailsIdentificationDocType(value: DocumentType | null): void { this.publish('ui.pacientes.createPaciente.input.details.identification.docType', 'stateCreatePacienteDetailsIdentificationDocType', value); }
public setCreatePacienteDetailsIdentificationDocId(value: string | null): void { this.publish('ui.pacientes.createPaciente.input.details.identification.docId', 'stateCreatePacienteDetailsIdentificationDocId', value); }
public setCreatePacienteDetailsIdentificationCountryCode(value: string | null): void { this.publish('ui.pacientes.createPaciente.input.details.identification.countryCode', 'stateCreatePacienteDetailsIdentificationCountryCode', value); }
public setListPacienteId(value: string | null): void { this.publish('ui.pacientes.listPaciente.input.id', 'stateListPacienteId', value); }
public setListPacienteDetailsIdentificationSubtype(value: 'Person' | null): void { this.publish('ui.pacientes.listPaciente.input.details.identification.subtype', 'stateListPacienteDetailsIdentificationSubtype', value); }
public setListPacienteDetailsIdentificationName(value: string | null): void { this.publish('ui.pacientes.listPaciente.input.details.identification.name', 'stateListPacienteDetailsIdentificationName', value); }
public setListPacienteDetailsIdentificationDocType(value: DocumentType | null): void { this.publish('ui.pacientes.listPaciente.input.details.identification.docType', 'stateListPacienteDetailsIdentificationDocType', value); }
public setListPacienteDetailsIdentificationDocId(value: string | null): void { this.publish('ui.pacientes.listPaciente.input.details.identification.docId', 'stateListPacienteDetailsIdentificationDocId', value); }
public setListPacienteDetailsIdentificationCountryCode(value: string | null): void { this.publish('ui.pacientes.listPaciente.input.details.identification.countryCode', 'stateListPacienteDetailsIdentificationCountryCode', value); }
private optionalString(value: string | null): string | undefined { return value !== null && value.trim() !== '' ? value : undefined; }
public async runCreatePaciente(): Promise<void> {
if (this.stateCreatePacienteStatus === 'loading') return;
const name = this.optionalString(this.stateCreatePacienteDetailsIdentificationName);
const countryCode = this.optionalString(this.stateCreatePacienteDetailsIdentificationCountryCode);
if (!name || !countryCode) { const failure = this.error('REQUIRED_INPUT', 'Name and country code are required to create the patient.'); this.publish('ui.pacientes.createPaciente.error', 'stateCreatePacienteError', failure); this.publish('ui.pacientes.createPaciente.status', 'stateCreatePacienteStatus', 'error'); return; }
const identification: CreatePacienteInput['details']['identification'] = { name, countryCode };
const docType = this.stateCreatePacienteDetailsIdentificationDocType;
const docId = this.optionalString(this.stateCreatePacienteDetailsIdentificationDocId);
if (docType !== null) identification.docType = docType;
if (docId !== undefined) identification.docId = docId;
const input: CreatePacienteInput = { details: { identification } };
this.publish('ui.pacientes.createPaciente.status', 'stateCreatePacienteStatus', 'loading');
this.publish('ui.pacientes.createPaciente.error', 'stateCreatePacienteError', null);
try {
const response = await runBlockingUiAction((signal: AbortSignal) => { const options: BffClientOptions = { mode: 'blocking', signal }; return execBff<CreatePacienteOutput>(createPacienteRoute, input, options); });
if (!response || !response.ok || response.data === null) {
const failure = response?.error ? this.error(response.error.code, response.error.message, response.error.details) : this.error('BAD_RESPONSE', 'The patient could not be created.');
this.publish('ui.pacientes.createPaciente.error', 'stateCreatePacienteError', failure);
this.publish('ui.pacientes.createPaciente.status', 'stateCreatePacienteStatus', 'error'); return;
}
this.publish('ui.pacientes.createPaciente.result', 'stateCreatePacienteResult', response.data);
this.publish('ui.pacientes.createPaciente.status', 'stateCreatePacienteStatus', 'success');
await this.runListPaciente();
} catch (caught: unknown) { const failure = caught instanceof Error ? this.error('RUNTIME_ERROR', caught.message) : this.error('RUNTIME_ERROR', String(caught)); this.publish('ui.pacientes.createPaciente.error', 'stateCreatePacienteError', failure); this.publish('ui.pacientes.createPaciente.status', 'stateCreatePacienteStatus', 'error'); }
}
public async runListPaciente(): Promise<void> {
this.publish('ui.pacientes.pageStatus', 'pageStatus', 'loading'); this.publish('ui.pacientes.listPaciente.status', 'stateListPacienteStatus', 'loading'); this.publish('ui.pacientes.listPaciente.error', 'stateListPacienteError', null);
const input: ListPacienteInput = {}; const identification: NonNullable<NonNullable<ListPacienteInput['details']>['identification']> = {}; let hasIdentification = false;
const id = this.optionalString(this.stateListPacienteId); const subtype = this.stateListPacienteDetailsIdentificationSubtype; const name = this.optionalString(this.stateListPacienteDetailsIdentificationName); const docType = this.stateListPacienteDetailsIdentificationDocType; const docId = this.optionalString(this.stateListPacienteDetailsIdentificationDocId); const countryCode = this.optionalString(this.stateListPacienteDetailsIdentificationCountryCode);
if (id !== undefined) input.id = id; if (subtype !== null) { identification.subtype = subtype; hasIdentification = true; } if (name !== undefined) { identification.name = name; hasIdentification = true; } if (docType !== null) { identification.docType = docType; hasIdentification = true; } if (docId !== undefined) { identification.docId = docId; hasIdentification = true; } if (countryCode !== undefined) { identification.countryCode = countryCode; hasIdentification = true; } if (hasIdentification) input.details = { identification }; if (this.stateListPacientePage !== null) input.page = this.stateListPacientePage;
try { const response = await execBff<ListPacienteOutput>(listPacienteRoute, input, { mode: 'silent' }); if (!response.ok || response.data === null) { const failure = response.error ?? this.error('BAD_RESPONSE', 'Patients could not be loaded.'); this.publish('ui.pacientes.listPaciente.error', 'stateListPacienteError', failure); this.publish('ui.pacientes.listPaciente.status', 'stateListPacienteStatus', 'error'); this.publish('ui.pacientes.pageStatus', 'pageStatus', 'error'); return; } this.publish('ui.pacientes.listPaciente.result', 'stateListPacienteResult', response.data); this.publish('ui.pacientes.listPaciente.status', 'stateListPacienteStatus', 'success'); this.publish('ui.pacientes.pageStatus', 'pageStatus', response.data.length === 0 ? 'empty' : 'success'); } catch (caught: unknown) { const failure = caught instanceof Error ? this.error('RUNTIME_ERROR', caught.message) : this.error('RUNTIME_ERROR', String(caught)); this.publish('ui.pacientes.listPaciente.error', 'stateListPacienteError', failure); this.publish('ui.pacientes.listPaciente.status', 'stateListPacienteStatus', 'error'); this.publish('ui.pacientes.pageStatus', 'pageStatus', 'error'); }
}
public enterBaseScenario(): void { this.setScenario('base'); }
public enterCreatePacienteScenario(): void { this.setScenario('createPaciente'); }

  /** setter for state ui.pacientes.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'createPaciente'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    this.scenary = next as typeof this.scenary;
    setState('ui.pacientes.scenary', next);
    this.syncScenaryQuery(next);
    this.requestUpdate();
  }

  /** handler for action set.uiScenary — bind UI events here */
  handleUiScenaryChange(event: Event): void {
    const custom = event as CustomEvent<{ value?: unknown }>;
    const fromDetail: string = custom.detail && typeof custom.detail.value === 'string' ? custom.detail.value : '';
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = fromDetail || (target && 'value' in target ? String(target.value) : '');
    this.setUiScenary(value);
  }

  private applyUrlScenary(): void {
    const params = new URLSearchParams(window.location.search);
    const requested: string = params.get('scenary') || 'base';
    this.setUiScenary(requested);
  }

  private syncScenaryQuery(value: string): void {
    const url = new URL(window.location.href);
    if (value === 'base') url.searchParams.delete('scenary');
    else url.searchParams.set('scenary', value);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

}