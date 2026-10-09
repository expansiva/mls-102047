/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/agenda_diaria.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Agenda_diariaContracts, ConsultaDoDia, ConsultaSelecionada } from '/_102047_/l2/agendaClinica/web/contracts/agenda_diaria.defs.js';
export type { Agenda_diariaContracts, ConsultaDoDia, ConsultaSelecionada } from '/_102047_/l2/agendaClinica/web/contracts/agenda_diaria.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RegisterAttendanceDraft = {
id: string | null;
version: number | null;
details: {
attendanceNote: string | null;
} | null;
};
type Input<R extends keyof Agenda_diariaContracts> = Agenda_diariaContracts[R]['input'];
type Output<R extends keyof Agenda_diariaContracts> = Agenda_diariaContracts[R]['output'];
type StateMember = 'carregarAgendaDiariaConsultas' | 'carregarMaisConsultasDoDiaConsultas' | 'registrarAtendimentoConsulta' | 'carregarConsultaSelecionadaConsulta' | 'selectedConsulta' | 'page' | 'pageStatus' | 'carregarAgendaDiariaStatus' | 'carregarAgendaDiariaError' | 'carregarMaisConsultasDoDiaStatus' | 'carregarMaisConsultasDoDiaError' | 'carregarConsultaSelecionadaStatus' | 'carregarConsultaSelecionadaError' | 'registrarAtendimentoStatus' | 'registrarAtendimentoError' | 'registerAttendanceDraft' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.agendaClinica.agenda_diaria.carregarAgendaDiariaConsultas': 'carregarAgendaDiariaConsultas',
'ui.agendaClinica.agenda_diaria.carregarMaisConsultasDoDiaConsultas': 'carregarMaisConsultasDoDiaConsultas',
'ui.agendaClinica.agenda_diaria.registrarAtendimentoConsulta': 'registrarAtendimentoConsulta',
'ui.agendaClinica.agenda_diaria.carregarConsultaSelecionadaConsulta': 'carregarConsultaSelecionadaConsulta',
'ui.agendaClinica.agenda_diaria.selectedConsulta': 'selectedConsulta',
'ui.agendaClinica.agenda_diaria.page': 'page',
'ui.agendaClinica.agenda_diaria.pageStatus': 'pageStatus',
'ui.agendaClinica.agenda_diaria.carregarAgendaDiariaStatus': 'carregarAgendaDiariaStatus',
'ui.agendaClinica.agenda_diaria.carregarAgendaDiariaError': 'carregarAgendaDiariaError',
'ui.agendaClinica.agenda_diaria.carregarMaisConsultasDoDiaStatus': 'carregarMaisConsultasDoDiaStatus',
'ui.agendaClinica.agenda_diaria.carregarMaisConsultasDoDiaError': 'carregarMaisConsultasDoDiaError',
'ui.agendaClinica.agenda_diaria.carregarConsultaSelecionadaStatus': 'carregarConsultaSelecionadaStatus',
'ui.agendaClinica.agenda_diaria.carregarConsultaSelecionadaError': 'carregarConsultaSelecionadaError',
'ui.agendaClinica.agenda_diaria.registrarAtendimentoStatus': 'registrarAtendimentoStatus',
'ui.agendaClinica.agenda_diaria.registrarAtendimentoError': 'registrarAtendimentoError',
'ui.agendaClinica.agenda_diaria.registerAttendanceDraft': 'registerAttendanceDraft',
'ui.agendaClinica.agenda_diaria.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const emptyRegisterAttendanceDraft = (): RegisterAttendanceDraft => ({ id: null, version: null, details: { attendanceNote: null } });
export class AgendaClinicaAgenda_diariaShared extends StateLitElement {
/** state carregarAgendaDiariaConsultas — Linha resumida da agenda diária do profissional.; source carregarAgendaDiaria.consultas; organism dayConsultations */
@property({ attribute: false }) carregarAgendaDiariaConsultas: Output<'agendaClinica.agenda_diaria.carregarAgendaDiaria'>['consultas'] | null = null;
/** state carregarMaisConsultasDoDiaConsultas — Linha resumida da agenda diária do profissional.; source carregarMaisConsultasDoDia.consultas; organism dayConsultations */
@property({ attribute: false }) carregarMaisConsultasDoDiaConsultas: Output<'agendaClinica.agenda_diaria.carregarMaisConsultasDoDia'>['consultas'] | null = null;
/** state registrarAtendimentoConsulta — Consulta aberta pelo profissional, com paciente, profissional e anotação para conferência e registro.; source registrarAtendimento.consulta; organism attendanceActions */
@property({ attribute: false }) registrarAtendimentoConsulta: ConsultaSelecionada | null = null;
/** state carregarConsultaSelecionadaConsulta — Consulta aberta pelo profissional, com paciente, profissional e anotação para conferência e registro.; source carregarConsultaSelecionada.consulta; organism consultationSummary */
@property({ attribute: false }) carregarConsultaSelecionadaConsulta: ConsultaSelecionada | null = null;
/** state selectedConsulta — Consulta aberta pelo profissional, com paciente, profissional e anotação para conferência e registro.; source entry.params.consultaId; organism consultationSummary; persisted */
@property({ attribute: false }) selectedConsulta: string | null = null;
/** state page — the requested agenda page filter; source entry.params.page; organism dayConsultations; persisted */
@property({ attribute: false }) page: number | null = null;
/** state pageStatus — the overall loading state of the page; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarAgendaDiariaStatus — the status of the initial agenda query; source carregarAgendaDiariaStatus */
@property({ attribute: false }) carregarAgendaDiariaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarAgendaDiariaError — the error of the initial agenda query; source carregarAgendaDiariaError */
@property({ attribute: false }) carregarAgendaDiariaError: ErrorState = null;
/** state carregarMaisConsultasDoDiaStatus — the status of the next-page agenda query; source carregarMaisConsultasDoDiaStatus */
@property({ attribute: false }) carregarMaisConsultasDoDiaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMaisConsultasDoDiaError — the error of the next-page agenda query; source carregarMaisConsultasDoDiaError */
@property({ attribute: false }) carregarMaisConsultasDoDiaError: ErrorState = null;
/** state carregarConsultaSelecionadaStatus — the status of the selected consultation query; source carregarConsultaSelecionadaStatus */
@property({ attribute: false }) carregarConsultaSelecionadaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarConsultaSelecionadaError — the error of the selected consultation query; source carregarConsultaSelecionadaError */
@property({ attribute: false }) carregarConsultaSelecionadaError: ErrorState = null;
/** state registrarAtendimentoStatus — the status of the attendance command; source registrarAtendimentoStatus */
@property({ attribute: false }) registrarAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state registrarAtendimentoError — the error of the attendance command; source registrarAtendimentoError */
@property({ attribute: false }) registrarAtendimentoError: ErrorState = null;
/** state registerAttendanceDraft — the attendance command draft; source registrarAtendimento.input; organism attendanceForm */
@property({ attribute: false }) registerAttendanceDraft: RegisterAttendanceDraft = emptyRegisterAttendanceDraft();
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.agendaClinica.agenda_diaria.${member}`, value);
if (member === 'page' || member === 'selectedConsulta') {
try {
const key = member === 'page' ? 'agendaClinica.agenda_diaria.page' : 'agendaClinica.agenda_diaria.consultaId';
if (value === null || value === '') {
localStorage.removeItem(key);
} else {
localStorage.setItem(key, String(value));
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
private errorState(error: { code?: string; message?: string; details?: unknown } | null, name: string): ErrorState {
if (error) {
return { code: error.code ?? 'client.unexpected', message: error.message ?? '', details: error.details };
}
return { code: 'client.unexpected', message: '', details: { name } };
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('scenary', '');
this.publish('registerAttendanceDraft', emptyRegisterAttendanceDraft());
this.publish('carregarAgendaDiariaStatus', 'idle');
this.publish('carregarAgendaDiariaError', null);
this.publish('carregarMaisConsultasDoDiaStatus', 'idle');
this.publish('carregarMaisConsultasDoDiaError', null);
this.publish('carregarConsultaSelecionadaStatus', 'idle');
this.publish('carregarConsultaSelecionadaError', null);
this.publish('registrarAtendimentoStatus', 'idle');
this.publish('registrarAtendimentoError', null);
}
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) {
const member = STATE_MEMBER_BY_KEY[key];
if (member !== 'pageStatus' && member !== 'scenary' && !member.endsWith('Status') && !member.endsWith('Error') && member !== 'registerAttendanceDraft') {
const value = getState(key);
if (value !== undefined) {
this.assignState(key, value);
}
}
}
this.resetVisit();
subscribe(STATE_KEYS, this);
this.applyEntryParams();
void this.initialLoad();
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
private applyEntryParams(): void {
const params = new URLSearchParams(window.location.search);
const pageRaw = params.get('page') ?? this.storageValue('agendaClinica.agenda_diaria.page');
const pageValue = pageRaw === null ? null : Number(pageRaw);
this.publish('page', pageValue !== null && Number.isFinite(pageValue) ? pageValue : null);
const consultaId = params.get('consultaId') ?? this.storageValue('agendaClinica.agenda_diaria.consultaId');
this.publish('selectedConsulta', consultaId);
if (consultaId !== null) {
void this.carregarConsultaSelecionada(consultaId);
}
}
private storageValue(key: string): string | null {
try {
return localStorage.getItem(key);
} catch {
return null;
}
}
private async initialLoad(): Promise<void> {
this.publish('pageStatus', 'loading');
await this.carregarAgendaDiaria();
if (this.carregarAgendaDiariaStatus === 'error') {
this.publish('pageStatus', 'error');
return;
}
const list = this.carregarAgendaDiariaConsultas;
this.publish('pageStatus', list && list.items.length === 0 ? 'empty' : 'success');
}
/** function carregarAgendaDiaria — Loads the first page of today's authenticated professional agenda; redraws carregarAgendaDiariaConsultas by replacement. No arguments. */
public async carregarAgendaDiaria(): Promise<void> {
if (this.carregarAgendaDiariaStatus === 'loading') {
return;
}
this.publish('carregarAgendaDiariaStatus', 'loading');
this.publish('carregarAgendaDiariaError', null);
const input: Input<'agendaClinica.agenda_diaria.carregarAgendaDiaria'> = { page: this.page ?? 1, pageSize: 20 };
try {
const response = await execBff<Output<'agendaClinica.agenda_diaria.carregarAgendaDiaria'>>('agendaClinica.agenda_diaria.carregarAgendaDiaria', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarAgendaDiariaError', this.errorState(response.error, 'carregarAgendaDiaria'));
this.publish('carregarAgendaDiariaStatus', 'error');
return;
}
this.publish('carregarAgendaDiariaConsultas', response.data.consultas);
this.publish('carregarAgendaDiariaStatus', 'success');
} catch (error) {
this.publish('carregarAgendaDiariaError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'carregarAgendaDiaria' } });
this.publish('carregarAgendaDiariaStatus', 'error');
}
}
/** function carregarMaisConsultasDoDia — Fetches the next page of today's agenda; redraws carregarMaisConsultasDoDiaConsultas by replacement and carregarAgendaDiariaConsultas.items by append. No arguments. */
public async carregarMaisConsultasDoDia(): Promise<void> {
if (this.carregarMaisConsultasDoDiaStatus === 'loading') {
return;
}
const current = this.carregarAgendaDiariaConsultas;
if (!current || !current.hasMore) {
return;
}
this.publish('carregarMaisConsultasDoDiaStatus', 'loading');
this.publish('carregarMaisConsultasDoDiaError', null);
const input: Input<'agendaClinica.agenda_diaria.carregarMaisConsultasDoDia'> = { page: current.page + 1, pageSize: current.pageSize };
try {
const response = await execBff<Output<'agendaClinica.agenda_diaria.carregarMaisConsultasDoDia'>>('agendaClinica.agenda_diaria.carregarMaisConsultasDoDia', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarMaisConsultasDoDiaError', this.errorState(response.error, 'carregarMaisConsultasDoDia'));
this.publish('carregarMaisConsultasDoDiaStatus', 'error');
return;
}
this.publish('carregarMaisConsultasDoDiaConsultas', response.data.consultas);
this.publish('carregarAgendaDiariaConsultas', { ...response.data.consultas, items: [...current.items, ...response.data.consultas.items] });
this.publish('carregarMaisConsultasDoDiaStatus', 'success');
} catch (error) {
this.publish('carregarMaisConsultasDoDiaError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'carregarMaisConsultasDoDia' } });
this.publish('carregarMaisConsultasDoDiaStatus', 'error');
}
}
/** function carregarConsultaSelecionada — Opens the selected agenda consultation; redraws carregarConsultaSelecionadaConsulta by replacement. consultaId is the selected consultation identifier. */
public async carregarConsultaSelecionada(consultaId: string): Promise<void> {
if (this.carregarConsultaSelecionadaStatus === 'loading') {
return;
}
this.publish('carregarConsultaSelecionadaStatus', 'loading');
this.publish('carregarConsultaSelecionadaError', null);
const input: Input<'agendaClinica.agenda_diaria.carregarConsultaSelecionada'> = { consultaId };
try {
const response = await execBff<Output<'agendaClinica.agenda_diaria.carregarConsultaSelecionada'>>('agendaClinica.agenda_diaria.carregarConsultaSelecionada', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarConsultaSelecionadaError', this.errorState(response.error, 'carregarConsultaSelecionada'));
this.publish('carregarConsultaSelecionadaStatus', 'error');
return;
}
this.publish('carregarConsultaSelecionadaConsulta', response.data.consulta);
this.publish('carregarConsultaSelecionadaStatus', 'success');
} catch (error) {
this.publish('carregarConsultaSelecionadaError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'carregarConsultaSelecionada' } });
this.publish('carregarConsultaSelecionadaStatus', 'error');
}
}
/** function registrarAtendimento — Registers the completed attendance; redraws registrarAtendimentoConsulta and carregarConsultaSelecionadaConsulta by upsert, and carregarAgendaDiariaConsultas.items by upsert. */
public async registrarAtendimento(): Promise<void> {
const draft = this.registerAttendanceDraft;
const selected = this.carregarConsultaSelecionadaConsulta ?? this.registrarAtendimentoConsulta;
const note = draft.details?.attendanceNote;
if (!selected || selected.id === '' || selected.version === undefined || note === null || note === undefined || note === '') {
this.publish('registrarAtendimentoError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['registerAttendanceDraft', 'carregarConsultaSelecionadaConsulta'] } });
this.publish('registrarAtendimentoStatus', 'error');
return;
}
this.publish('registrarAtendimentoStatus', 'loading');
this.publish('registrarAtendimentoError', null);
const input: Input<'agendaClinica.agenda_diaria.registrarAtendimento'> = { id: selected.id, version: selected.version, details: { details: { attendanceNote: note } } };
try {
const result = await runBlockingUiAction(signal => execBff<Output<'agendaClinica.agenda_diaria.registrarAtendimento'>>('agendaClinica.agenda_diaria.registrarAtendimento', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('registrarAtendimentoError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('registrarAtendimentoStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('registrarAtendimentoError', this.errorState(result.error, 'registrarAtendimento'));
this.publish('registrarAtendimentoStatus', 'error');
return;
}
const consultation = result.data.consulta;
this.publish('registrarAtendimentoConsulta', consultation);
this.publish('carregarConsultaSelecionadaConsulta', consultation);
const list = this.carregarAgendaDiariaConsultas;
if (list) {
this.publish('carregarAgendaDiariaConsultas', { ...list, items: list.items.map(item => item.id === consultation.id ? { ...item, status: consultation.status } : item) });
}
this.publish('registerAttendanceDraft', emptyRegisterAttendanceDraft());
this.publish('registrarAtendimentoStatus', 'success');
} catch (error) {
this.publish('registrarAtendimentoError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'registrarAtendimento' } });
this.publish('registrarAtendimentoStatus', 'error');
}
}
/** draft — Sets the attendance form command draft. value contains the attendance note and command context. */
public setRegisterAttendance(value: RegisterAttendanceDraft): void {
this.publish('registerAttendanceDraft', value);
}
/** select — Selects a consultation id, clears it when null, and loads the selected consultation when an id is supplied. */
public selectConsultaId(value: string | null): void {
this.publish('selectedConsulta', value);
if (value === null) {
this.publish('carregarConsultaSelecionadaConsulta', null);
return;
}
void this.carregarConsultaSelecionada(value);
}
/** Sets the visible page scene. */
public setScenario(value: string): void {
this.publish('scenary', value);
}
/** Returns the selected consultation record for the consultation summary. */
public get consultationSummary(): ConsultaSelecionada | null {
return this.carregarConsultaSelecionadaConsulta ?? this.registrarAtendimentoConsulta;
}
/** Returns the consultation row selected in the loaded agenda list. */
public get dayConsultationsSelection(): ConsultaDoDia | null {
const rows = this.carregarAgendaDiariaConsultas?.items ?? [];
return rows.find(row => row.id === this.selectedConsulta) ?? null;
}
}
