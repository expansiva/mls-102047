/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { PacientesContracts, PatientDetail, PatientListItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
export type { PacientesContracts, PatientDetail, PatientListItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type PatientFormDraft = {
details: {
identification: {
name: string | null;
docType: PatientFormDraftDocType | null;
docId: string | null;
};
};
};
type PatientFormDraftDocType = 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other';
type Input<R extends keyof PacientesContracts> = PacientesContracts[R]['input'];
type Output<R extends keyof PacientesContracts> = PacientesContracts[R]['output'];
type PatientsPage = Output<'agendaClinica.pacientes.loadPatients'>['patients'];
const emptyPatientFormDraft = (): PatientFormDraft => ({ details: { identification: { name: null, docType: null, docId: null } } });
type StateMember = 'patients' | 'patient' | 'selectedPaciente' | 'page' | 'nameSearch' | 'patientId' | 'patientForm' | 'pageStatus' | 'loadPatientsStatus' | 'loadPatientsError' | 'searchPatientsStatus' | 'searchPatientsError' | 'loadPatientDetailStatus' | 'loadPatientDetailError' | 'savePatientStatus' | 'savePatientError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.agendaClinica.pacientes.patients': 'patients',
'ui.agendaClinica.pacientes.patient': 'patient',
'ui.agendaClinica.pacientes.selectedPaciente': 'selectedPaciente',
'ui.agendaClinica.pacientes.page': 'page',
'ui.agendaClinica.pacientes.nameSearch': 'nameSearch',
'ui.agendaClinica.pacientes.patientId': 'patientId',
'ui.agendaClinica.pacientes.patientForm': 'patientForm',
'ui.agendaClinica.pacientes.pageStatus': 'pageStatus',
'ui.agendaClinica.pacientes.loadPatientsStatus': 'loadPatientsStatus',
'ui.agendaClinica.pacientes.loadPatientsError': 'loadPatientsError',
'ui.agendaClinica.pacientes.searchPatientsStatus': 'searchPatientsStatus',
'ui.agendaClinica.pacientes.searchPatientsError': 'searchPatientsError',
'ui.agendaClinica.pacientes.loadPatientDetailStatus': 'loadPatientDetailStatus',
'ui.agendaClinica.pacientes.loadPatientDetailError': 'loadPatientDetailError',
'ui.agendaClinica.pacientes.savePatientStatus': 'savePatientStatus',
'ui.agendaClinica.pacientes.savePatientError': 'savePatientError',
'ui.agendaClinica.pacientes.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
export class AgendaClinicaPacientesShared extends StateLitElement {
/** state patients — Paciente em formato compacto para a lista de localização.; source loadPatients.patients; organism patientList */
@property({ attribute: false }) patients: PatientsPage | null = null;
/** state patient — Paciente selecionado, pronto para conferência e continuidade no agendamento.; source loadPatientDetail.patient; organism patientDetail */
@property({ attribute: false }) patient: PatientDetail | null = null;
/** state selectedPaciente — Paciente selecionado, pronto para conferência e continuidade no agendamento.; source entry.params.pacienteId; organism patientDetail; organism patientList; persisted */
@property({ attribute: false }) selectedPaciente: string | null = null;
/** state page — the requested patient-list page filter; source entry.params.page; organism patientList; persisted */
@property({ attribute: false }) page: number | null = null;
/** state nameSearch — the patient-name search filter; source entry.params.nameSearch; organism patientList; persisted */
@property({ attribute: false }) nameSearch: string | null = null;
/** state patientId — the patient-detail identifier filter; source entry.params.patientId; organism patientDetail; persisted */
@property({ attribute: false }) patientId: string | null = null;
/** state patientForm — the editable patient registration draft; source savePatient.input; organism patientForm */
@property({ attribute: false }) patientForm: PatientFormDraft = emptyPatientFormDraft();
/** state pageStatus — the initial page-load status; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state loadPatientsStatus — the status of the initial patient-list query; source loadPatients.status */
@property({ attribute: false }) loadPatientsStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state loadPatientsError — the error from the initial patient-list query; source loadPatients.error */
@property({ attribute: false }) loadPatientsError: ErrorState = null;
/** state searchPatientsStatus — the status of the patient-name search query; source searchPatients.status */
@property({ attribute: false }) searchPatientsStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state searchPatientsError — the error from the patient-name search query; source searchPatients.error */
@property({ attribute: false }) searchPatientsError: ErrorState = null;
/** state loadPatientDetailStatus — the status of the selected-patient query; source loadPatientDetail.status */
@property({ attribute: false }) loadPatientDetailStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state loadPatientDetailError — the error from the selected-patient query; source loadPatientDetail.error */
@property({ attribute: false }) loadPatientDetailError: ErrorState = null;
/** state savePatientStatus — the status of patient creation or association; source savePatient.status */
@property({ attribute: false }) savePatientStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state savePatientError — the error from patient creation or association; source savePatient.error */
@property({ attribute: false }) savePatientError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
public connectedCallback(): void {
super.connectedCallback();
this.hydrateData();
this.resetVisit();
subscribe(STATE_KEYS, this);
this.applyEntryParams();
void this.loadPatients();
}
public disconnectedCallback(): void {
unsubscribe(STATE_KEYS, this);
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (!STATE_MEMBER_BY_KEY[key]) {
super.handleIcaStateChange(key, value);
return;
}
if (value === undefined) {
return;
}
this.assignState(key, value);
this.requestUpdate();
}
/** function loadPatients — Inicializa a área de localização de pacientes sem trazer cadastros antes de a recepcionista informar um nome.; redraws patients by replacement and updates pageStatus */
public async loadPatients(): Promise<void> {
if (this.loadPatientsStatus === 'loading') {
return;
}
this.publish('loadPatientsStatus', 'loading');
this.publish('loadPatientsError', null);
this.publish('pageStatus', 'loading');
const input: Input<'agendaClinica.pacientes.loadPatients'> = { page: this.page ?? 1, pageSize: 20 };
try {
const response = await execBff<Output<'agendaClinica.pacientes.loadPatients'>>('agendaClinica.pacientes.loadPatients', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('loadPatientsError', response.error);
this.publish('loadPatientsStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
this.publish('patients', response.data.patients);
this.publish('loadPatientsStatus', 'success');
this.publish('pageStatus', response.data.patients.items.length === 0 ? 'empty' : 'success');
} catch (error: unknown) {
const name = error instanceof Error ? error.name : 'Error';
const failure: ErrorState = { code: 'client.unexpected', message: '', details: { name } };
this.publish('loadPatientsError', failure);
this.publish('loadPatientsStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** function searchPatients — Localiza pacientes pelo nome para a recepcionista escolher quem seguirá para o agendamento.; redraws patients by appending the returned page; nameSearch is the name filter and page is the requested page */
public async searchPatients(nameSearch: string, page = 1): Promise<void> {
this.publish('nameSearch', nameSearch);
this.publish('page', page);
if (this.searchPatientsStatus === 'loading') {
return;
}
this.publish('searchPatientsStatus', 'loading');
this.publish('searchPatientsError', null);
const input: Input<'agendaClinica.pacientes.searchPatients'> = { nameSearch, page, pageSize: 20 };
try {
const response = await execBff<Output<'agendaClinica.pacientes.searchPatients'>>('agendaClinica.pacientes.searchPatients', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('searchPatientsError', response.error);
this.publish('searchPatientsStatus', 'error');
return;
}
const current = this.patients;
const items = current ? [...current.items, ...response.data.patients.items] : [...response.data.patients.items];
this.publish('patients', { ...response.data.patients, items });
this.publish('searchPatientsStatus', 'success');
} catch (error: unknown) {
const name = error instanceof Error ? error.name : 'Error';
this.publish('searchPatientsError', { code: 'client.unexpected', message: '', details: { name } });
this.publish('searchPatientsStatus', 'error');
}
}
/** function loadPatientDetail — Carrega a ficha do paciente que a recepcionista selecionou para confirmar sua identificação antes de ir ao agendamento.; redraws patient by replacement; patientId is the selected patient identifier */
public async loadPatientDetail(patientId: string): Promise<void> {
this.publish('patientId', patientId);
if (this.loadPatientDetailStatus === 'loading') {
return;
}
this.publish('loadPatientDetailStatus', 'loading');
this.publish('loadPatientDetailError', null);
const input: Input<'agendaClinica.pacientes.loadPatientDetail'> = { patientId };
try {
const response = await execBff<Output<'agendaClinica.pacientes.loadPatientDetail'>>('agendaClinica.pacientes.loadPatientDetail', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('loadPatientDetailError', response.error);
this.publish('loadPatientDetailStatus', 'error');
return;
}
this.publish('patient', response.data.patient);
this.publish('loadPatientDetailStatus', 'success');
} catch (error: unknown) {
const name = error instanceof Error ? error.name : 'Error';
this.publish('loadPatientDetailError', { code: 'client.unexpected', message: '', details: { name } });
this.publish('loadPatientDetailStatus', 'error');
}
}
/** function savePatient — Cadastra ou associa o novo paciente informado pela recepcionista e o deixa imediatamente disponível para conferência e agendamento.; redraws patient by replacement and patients by upsert */
public async savePatient(): Promise<void> {
const draft = this.patientForm;
const name = draft.details.identification.name;
if (!name) {
this.publish('savePatientError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['patientForm.details.identification.name'] } });
this.publish('savePatientStatus', 'error');
return;
}
if (this.savePatientStatus === 'loading') {
return;
}
this.publish('savePatientStatus', 'loading');
this.publish('savePatientError', null);
const input: Input<'agendaClinica.pacientes.savePatient'> = {
details: { identification: { name, ...(draft.details.identification.docType !== null ? { docType: draft.details.identification.docType } : {}), ...(draft.details.identification.docId !== null && draft.details.identification.docId !== '' ? { docId: draft.details.identification.docId } : {}) } }
};
const result = await runBlockingUiAction(signal => execBff<Output<'agendaClinica.pacientes.savePatient'>>('agendaClinica.pacientes.savePatient', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('savePatientError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('savePatientStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('savePatientError', result.error);
this.publish('savePatientStatus', 'error');
return;
}
const data = result.data;
this.publish('patient', data.patient);
const current = this.patients;
if (current) {
const items = current.items.some(item => item.id === data.patientListItem.id) ? current.items.map(item => item.id === data.patientListItem.id ? data.patientListItem : item) : [...current.items, data.patientListItem];
this.publish('patients', { ...current, items });
}
this.publish('patientForm', emptyPatientFormDraft());
this.publish('savePatientStatus', 'success');
}
/** function goToAppointment — Apresenta nome, documento e situação do paciente selecionado para confirmar a identificação antes de agendar.; carries pacienteId as the selected patient identifier */
public goToAppointment(): void {
const value = this.selectedPaciente;
if (value === null || value === '') {
this.publish('loadPatientDetailError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['selectedPaciente'] } });
return;
}
auraNavigate(`/agendaClinica/consultas?pacienteId=${encodeURIComponent(value)}`, { basePath: '/agendaClinica' });
}
/** draft — Updates the patient registration draft used by savePatient. */
public setPatientForm(value: PatientFormDraft): void {
this.publish('patientForm', value);
}
/** select — Selects a patient identifier and loads its complete detail. */
public setSelectedPaciente(value: string | null): void {
this.publish('selectedPaciente', value);
if (value !== null && value !== '') {
void this.loadPatientDetail(value);
}
}
/** Sets the visible page scene. */
public setScenario(value: string): void {
this.publish('scenary', value);
}
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.agendaClinica.pacientes.${member}`, value);
if (member === 'page' || member === 'nameSearch' || member === 'patientId' || member === 'selectedPaciente') {
try {
const storageKey = `agendaClinica.pacientes.${member === 'selectedPaciente' ? 'pacienteId' : member}`;
if (value === null || value === '') {
localStorage.removeItem(storageKey);
} else {
localStorage.setItem(storageKey, String(value));
}
} catch {
}
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) {
(this as unknown as Record<string, unknown>)[member] = value;
}
}
private hydrateData(): void {
for (const key of ['ui.agendaClinica.pacientes.patients', 'ui.agendaClinica.pacientes.patient']) {
const value = getState(key);
if (value !== undefined) {
this.assignState(key, value);
}
}
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('loadPatientsStatus', 'idle');
this.publish('loadPatientsError', null);
this.publish('searchPatientsStatus', 'idle');
this.publish('searchPatientsError', null);
this.publish('loadPatientDetailStatus', 'idle');
this.publish('loadPatientDetailError', null);
this.publish('savePatientStatus', 'idle');
this.publish('savePatientError', null);
this.publish('patientForm', emptyPatientFormDraft());
this.publish('scenary', '');
}
private applyEntryParams(): void {
const params = new URLSearchParams(window.location.search);
const read = (name: string): string | null => {
const urlValue = params.get(name);
if (urlValue !== null) {
return urlValue;
}
try {
return localStorage.getItem(`agendaClinica.pacientes.${name}`);
} catch {
return null;
}
};
const pageRaw = read('page');
const pageValue = pageRaw === null || pageRaw === '' ? null : Number(pageRaw);
this.publish('page', pageValue !== null && Number.isFinite(pageValue) ? pageValue : null);
this.publish('nameSearch', read('nameSearch'));
this.publish('patientId', read('patientId'));
const pacienteId = read('pacienteId');
this.publish('selectedPaciente', pacienteId);
const docId = read('docId');
if (docId !== null) {
this.publish('patientForm', { ...this.patientForm, details: { ...this.patientForm.details, identification: { ...this.patientForm.details.identification, docId } } });
}
if (pacienteId !== null && pacienteId !== '') {
void this.loadPatientDetail(pacienteId);
} else if (this.patientId !== null && this.patientId !== '') {
void this.loadPatientDetail(this.patientId);
}
}
}
