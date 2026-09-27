/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { createPacienteRoute, listPacienteRoute } from '../contracts/pacientes.defs.js';
import type {
CreatePacienteInput,
CreatePacienteOutput,
ListPacienteInput,
ListPacienteOutput,
} from '../contracts/pacientes.defs.js';
interface ErrorState {
code: string;
message: string;
details?: unknown;
}
type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type Scenary = 'base' | 'createPaciente';
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
type DocType = 'CPF' | 'NationalId' | 'Passport' | 'Other';
const subscribedStateKeys = [
'ui.pacientes.pageStatus',
'ui.pacientes.scenary',
'ui.pacientes.createPaciente.input.details.identification.name',
'ui.pacientes.createPaciente.input.details.identification.docType',
'ui.pacientes.createPaciente.input.details.identification.docId',
'ui.pacientes.createPaciente.input.details.identification.countryCode',
'ui.pacientes.createPaciente.status',
'ui.pacientes.createPaciente.error',
'ui.pacientes.createPaciente.result',
'ui.pacientes.listPaciente.input.id',
'ui.pacientes.listPaciente.input.details.identification.subtype',
'ui.pacientes.listPaciente.input.details.identification.name',
'ui.pacientes.listPaciente.input.details.identification.docType',
'ui.pacientes.listPaciente.input.details.identification.docId',
'ui.pacientes.listPaciente.input.details.identification.countryCode',
'ui.pacientes.listPaciente.input.page',
'ui.pacientes.listPaciente.status',
'ui.pacientes.listPaciente.error',
'ui.pacientes.listPaciente.result',
] as const;
const stateMembers: Readonly<Record<string, string>> = {
'ui.pacientes.pageStatus': 'pageStatus',
'ui.pacientes.scenary': 'scenary',
'ui.pacientes.createPaciente.input.details.identification.name': 'stateCreatePacienteDetailsIdentificationName',
'ui.pacientes.createPaciente.input.details.identification.docType': 'stateCreatePacienteDetailsIdentificationDocType',
'ui.pacientes.createPaciente.input.details.identification.docId': 'stateCreatePacienteDetailsIdentificationDocId',
'ui.pacientes.createPaciente.input.details.identification.countryCode': 'stateCreatePacienteDetailsIdentificationCountryCode',
'ui.pacientes.createPaciente.status': 'stateCreatePacienteStatus',
'ui.pacientes.createPaciente.error': 'stateCreatePacienteError',
'ui.pacientes.createPaciente.result': 'stateCreatePacienteResult',
'ui.pacientes.listPaciente.input.id': 'stateListPacienteId',
'ui.pacientes.listPaciente.input.details.identification.subtype': 'stateListPacienteDetailsIdentificationSubtype',
'ui.pacientes.listPaciente.input.details.identification.name': 'stateListPacienteDetailsIdentificationName',
'ui.pacientes.listPaciente.input.details.identification.docType': 'stateListPacienteDetailsIdentificationDocType',
'ui.pacientes.listPaciente.input.details.identification.docId': 'stateListPacienteDetailsIdentificationDocId',
'ui.pacientes.listPaciente.input.details.identification.countryCode': 'stateListPacienteDetailsIdentificationCountryCode',
'ui.pacientes.listPaciente.input.page': 'stateListPacientePage',
'ui.pacientes.listPaciente.status': 'stateListPacienteStatus',
'ui.pacientes.listPaciente.error': 'stateListPacienteError',
'ui.pacientes.listPaciente.result': 'stateListPacienteResult',
};
const actionMetadata = {
createPaciente: {
actorRef: 'recepcionista',
grantRefs: ['recepcionistaGestaoAgenda'],
authorities: ['recepcionista'],
ruleRefs: ['rule-foreign-namespace-refused', 'rule-document-shape-validated', 'rule-identity-never-in-namespace', 'rule-person-privacy-consent-required-br-eu'],
sourceHashes: ['l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd', 'l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b', 'l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c25d611ace61ecffdafe'],
},
listPaciente: {
actorRef: 'recepcionista',
grantRefs: ['recepcionistaGestaoAgenda'],
authorities: ['recepcionista'],
ruleRefs: [],
sourceHashes: ['l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd', 'l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b', 'l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c25d611ace61ecffdafe'],
},
} as const;
export class PacientesShared extends StateLitElement {
public pageStatus: PageStatus = 'idle';
public scenary: Scenary = 'base';
public stateCreatePacienteDetailsIdentificationName: string | null = null;
public stateCreatePacienteDetailsIdentificationDocType: DocType | null = null;
public stateCreatePacienteDetailsIdentificationDocId: string | null = null;
public stateCreatePacienteDetailsIdentificationCountryCode: string | null = null;
public stateCreatePacienteStatus: ActionStatus = 'idle';
public stateCreatePacienteError: ErrorState | null = null;
public stateCreatePacienteResult: CreatePacienteOutput | null = null;
public stateListPacienteId: string | null = null;
public stateListPacienteDetailsIdentificationSubtype: 'Person' | null = null;
public stateListPacienteDetailsIdentificationName: string | null = null;
public stateListPacienteDetailsIdentificationDocType: DocType | null = null;
public stateListPacienteDetailsIdentificationDocId: string | null = null;
public stateListPacienteDetailsIdentificationCountryCode: string | null = null;
public stateListPacientePage: number | null = null;
public stateListPacienteStatus: ActionStatus = 'idle';
public stateListPacienteError: ErrorState | null = null;
public stateListPacienteResult: ListPacienteOutput = [];
public connectedCallback(): void {
super.connectedCallback();
for (const key of subscribedStateKeys) {
subscribe(key, this);
const value: unknown = getState(key);
this.applyStateValue(key, value);
}
void this.runListPaciente();
}
public disconnectedCallback(): void {
unsubscribe([...subscribedStateKeys], this);
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (value === undefined) return;
this.applyStateValue(key, value);
this.requestUpdate();
}
private applyStateValue(key: string, value: unknown): void {
const memberName = stateMembers[key];
if (!memberName || value === undefined) return;
(this as unknown as Record<string, unknown>)[memberName] = value;
}
private feedback(error: unknown, fallback: string): ErrorState {
if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
const candidate = error as { code?: unknown; message: string; details?: unknown };
return {
code: typeof candidate.code === 'string' ? candidate.code : 'REQUEST_ERROR',
message: candidate.message,
details: candidate.details,
};
}
return { code: 'REQUEST_ERROR', message: fallback };
}
private setFeedback(key: string, feedback: ErrorState | null): void {
setState(key, feedback);
this.applyStateValue(key, feedback);
}
public setScenario(value: Scenary): void {
if (value !== 'base' && value !== 'createPaciente') return;
this.scenary = value;
setState('ui.pacientes.scenary', value);
}
public setCreatePacienteDetailsIdentificationName(value: string | null): void {
this.stateCreatePacienteDetailsIdentificationName = value;
setState('ui.pacientes.createPaciente.input.details.identification.name', value);
}
public setCreatePacienteDetailsIdentificationDocType(value: DocType | null): void {
this.stateCreatePacienteDetailsIdentificationDocType = value;
setState('ui.pacientes.createPaciente.input.details.identification.docType', value);
}
public setCreatePacienteDetailsIdentificationDocId(value: string | null): void {
this.stateCreatePacienteDetailsIdentificationDocId = value;
setState('ui.pacientes.createPaciente.input.details.identification.docId', value);
}
public setCreatePacienteDetailsIdentificationCountryCode(value: string | null): void {
this.stateCreatePacienteDetailsIdentificationCountryCode = value;
setState('ui.pacientes.createPaciente.input.details.identification.countryCode', value);
}
public setListPacienteId(value: string | null): void { this.stateListPacienteId = value; setState('ui.pacientes.listPaciente.input.id', value); }
public setListPacienteDetailsIdentificationSubtype(value: 'Person' | null): void { this.stateListPacienteDetailsIdentificationSubtype = value; setState('ui.pacientes.listPaciente.input.details.identification.subtype', value); }
public setListPacienteDetailsIdentificationName(value: string | null): void { this.stateListPacienteDetailsIdentificationName = value; setState('ui.pacientes.listPaciente.input.details.identification.name', value); }
public setListPacienteDetailsIdentificationDocType(value: DocType | null): void { this.stateListPacienteDetailsIdentificationDocType = value; setState('ui.pacientes.listPaciente.input.details.identification.docType', value); }
public setListPacienteDetailsIdentificationDocId(value: string | null): void { this.stateListPacienteDetailsIdentificationDocId = value; setState('ui.pacientes.listPaciente.input.details.identification.docId', value); }
public setListPacienteDetailsIdentificationCountryCode(value: string | null): void { this.stateListPacienteDetailsIdentificationCountryCode = value; setState('ui.pacientes.listPaciente.input.details.identification.countryCode', value); }
public async runCreatePaciente(): Promise<void> {
if (this.stateCreatePacienteStatus === 'loading') return;
const name = this.stateCreatePacienteDetailsIdentificationName;
const countryCode = this.stateCreatePacienteDetailsIdentificationCountryCode;
if (!name || name.trim() === '' || !countryCode || countryCode.trim() === '') {
const error = this.feedback(null, 'Informe o nome e o país do paciente.');
this.stateCreatePacienteStatus = 'error';
this.setFeedback('ui.pacientes.createPaciente.error', error);
setState('ui.pacientes.createPaciente.status', 'error');
return;
}
const params: CreatePacienteInput = { details: { identification: { name, countryCode } } };
if (this.stateCreatePacienteDetailsIdentificationDocType !== null) params.details.identification.docType = this.stateCreatePacienteDetailsIdentificationDocType;
if (this.stateCreatePacienteDetailsIdentificationDocId !== null && this.stateCreatePacienteDetailsIdentificationDocId !== '') params.details.identification.docId = this.stateCreatePacienteDetailsIdentificationDocId;
this.stateCreatePacienteStatus = 'loading';
this.stateCreatePacienteError = null;
setState('ui.pacientes.createPaciente.status', 'loading');
setState('ui.pacientes.createPaciente.error', null);
try {
const response = await runBlockingUiAction((signal: AbortSignal) => execBff<CreatePacienteOutput>(createPacienteRoute, params, { mode: 'blocking', signal } as BffClientOptions), { mode: 'blocking' });
if (response?.ok && response.data !== null) {
this.stateCreatePacienteResult = response.data;
this.stateCreatePacienteStatus = 'success';
setState('ui.pacientes.createPaciente.result', response.data);
setState('ui.pacientes.createPaciente.status', 'success');
await this.runListPaciente();
} else {
const responseError = response?.error;
const error = responseError && typeof responseError === 'object' && 'message' in responseError && typeof responseError.message === 'string'
? this.feedback(responseError, responseError.message)
: this.feedback(responseError, 'Não foi possível cadastrar o paciente.');
this.stateCreatePacienteStatus = 'error';
this.setFeedback('ui.pacientes.createPaciente.error', error);
setState('ui.pacientes.createPaciente.status', 'error');
}
} catch (error: unknown) {
const feedback = this.feedback(error, 'Não foi possível cadastrar o paciente.');
this.stateCreatePacienteStatus = 'error';
this.setFeedback('ui.pacientes.createPaciente.error', feedback);
setState('ui.pacientes.createPaciente.status', 'error');
}
}
public async runListPaciente(): Promise<void> {
const params: ListPacienteInput = {};
if (this.stateListPacienteId !== null && this.stateListPacienteId !== '') params.id = this.stateListPacienteId;
const identification: NonNullable<NonNullable<ListPacienteInput['details']>['identification']> = {};
let hasIdentification = false;
if (this.stateListPacienteDetailsIdentificationSubtype !== null) { identification.subtype = this.stateListPacienteDetailsIdentificationSubtype; hasIdentification = true; }
if (this.stateListPacienteDetailsIdentificationName !== null && this.stateListPacienteDetailsIdentificationName !== '') { identification.name = this.stateListPacienteDetailsIdentificationName; hasIdentification = true; }
if (this.stateListPacienteDetailsIdentificationDocType !== null) { identification.docType = this.stateListPacienteDetailsIdentificationDocType; hasIdentification = true; }
if (this.stateListPacienteDetailsIdentificationDocId !== null && this.stateListPacienteDetailsIdentificationDocId !== '') { identification.docId = this.stateListPacienteDetailsIdentificationDocId; hasIdentification = true; }
if (this.stateListPacienteDetailsIdentificationCountryCode !== null && this.stateListPacienteDetailsIdentificationCountryCode !== '') { identification.countryCode = this.stateListPacienteDetailsIdentificationCountryCode; hasIdentification = true; }
if (hasIdentification) params.details = { identification };
if (this.stateListPacientePage !== null) params.page = this.stateListPacientePage;
this.pageStatus = 'loading';
this.stateListPacienteStatus = 'loading';
this.stateListPacienteError = null;
setState('ui.pacientes.pageStatus', 'loading');
setState('ui.pacientes.listPaciente.status', 'loading');
setState('ui.pacientes.listPaciente.error', null);
try {
const response = await execBff<ListPacienteOutput>(listPacienteRoute, params, { mode: 'silent' });
if (response.ok && response.data !== null) {
this.stateListPacienteResult = response.data;
this.pageStatus = response.data.length === 0 ? 'empty' : 'success';
this.stateListPacienteStatus = 'success';
setState('ui.pacientes.listPaciente.result', response.data);
setState('ui.pacientes.pageStatus', this.pageStatus);
setState('ui.pacientes.listPaciente.status', 'success');
} else {
const error = this.feedback(response.error, 'Não foi possível localizar os pacientes.');
this.pageStatus = 'error';
this.stateListPacienteStatus = 'error';
this.setFeedback('ui.pacientes.listPaciente.error', error);
setState('ui.pacientes.pageStatus', 'error');
setState('ui.pacientes.listPaciente.status', 'error');
}
} catch (error: unknown) {
const feedback = this.feedback(error, 'Não foi possível localizar os pacientes.');
this.pageStatus = 'error';
this.stateListPacienteStatus = 'error';
this.setFeedback('ui.pacientes.listPaciente.error', feedback);
setState('ui.pacientes.pageStatus', 'error');
setState('ui.pacientes.listPaciente.status', 'error');
}
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
