/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/profissionais.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { ProfissionaisContracts, ProfessionalDirectoryItem, ProfessionalRecord } from '/_102047_/l2/agendaClinica/web/contracts/profissionais.defs.js';
export type { ProfissionaisContracts, ProfessionalDirectoryItem, ProfessionalRecord } from '/_102047_/l2/agendaClinica/web/contracts/profissionais.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type CreateProfessionalDraft = { details: { identification: { name: string | null; docType: 'CPF' | 'Passport' | 'NationalId' | 'Other' | null; docId: string | null; countryCode: string | null }; agendaClinica: { professionalType: 'medical' | 'therapist' | null } } };
export type UpdateProfessionalDraft = { id: string | null; version: number | null; details: { identification: { name: string | null; docType: 'CPF' | 'Passport' | 'NationalId' | 'Other' | null; docId: string | null; countryCode: string | null }; agendaClinica: { professionalType: 'medical' | 'therapist' | null } } };
type Input<R extends keyof ProfissionaisContracts> = ProfissionaisContracts[R]['input'];
type Output<R extends keyof ProfissionaisContracts> = ProfissionaisContracts[R]['output'];
type StateMember = 'professionals' | 'professional' | 'selectedProfissional' | 'pageStatus' | 'loadAvailableProfessionalsStatus' | 'loadAvailableProfessionalsError' | 'loadMoreAvailableProfessionalsStatus' | 'loadMoreAvailableProfessionalsError' | 'searchAvailableProfessionalsStatus' | 'searchAvailableProfessionalsError' | 'loadMoreProfessionalSearchStatus' | 'loadMoreProfessionalSearchError' | 'getProfessionalStatus' | 'getProfessionalError' | 'createProfessionalStatus' | 'createProfessionalError' | 'updateProfessionalStatus' | 'updateProfessionalError' | 'createProfessionalDraft' | 'updateProfessionalDraft' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.agendaClinica.profissionais.professionals': 'professionals',
'ui.agendaClinica.profissionais.professional': 'professional',
'ui.agendaClinica.profissionais.selectedProfissional': 'selectedProfissional',
'ui.agendaClinica.profissionais.pageStatus': 'pageStatus',
'ui.agendaClinica.profissionais.loadAvailableProfessionalsStatus': 'loadAvailableProfessionalsStatus',
'ui.agendaClinica.profissionais.loadAvailableProfessionalsError': 'loadAvailableProfessionalsError',
'ui.agendaClinica.profissionais.loadMoreAvailableProfessionalsStatus': 'loadMoreAvailableProfessionalsStatus',
'ui.agendaClinica.profissionais.loadMoreAvailableProfessionalsError': 'loadMoreAvailableProfessionalsError',
'ui.agendaClinica.profissionais.searchAvailableProfessionalsStatus': 'searchAvailableProfessionalsStatus',
'ui.agendaClinica.profissionais.searchAvailableProfessionalsError': 'searchAvailableProfessionalsError',
'ui.agendaClinica.profissionais.loadMoreProfessionalSearchStatus': 'loadMoreProfessionalSearchStatus',
'ui.agendaClinica.profissionais.loadMoreProfessionalSearchError': 'loadMoreProfessionalSearchError',
'ui.agendaClinica.profissionais.getProfessionalStatus': 'getProfessionalStatus',
'ui.agendaClinica.profissionais.getProfessionalError': 'getProfessionalError',
'ui.agendaClinica.profissionais.createProfessionalStatus': 'createProfessionalStatus',
'ui.agendaClinica.profissionais.createProfessionalError': 'createProfessionalError',
'ui.agendaClinica.profissionais.updateProfessionalStatus': 'updateProfessionalStatus',
'ui.agendaClinica.profissionais.updateProfessionalError': 'updateProfessionalError',
'ui.agendaClinica.profissionais.createProfessionalDraft': 'createProfessionalDraft',
'ui.agendaClinica.profissionais.updateProfessionalDraft': 'updateProfessionalDraft',
'ui.agendaClinica.profissionais.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const emptyCreateDraft = (): CreateProfessionalDraft => ({ details: { identification: { name: null, docType: null, docId: null, countryCode: null }, agendaClinica: { professionalType: null } } });
const emptyUpdateDraft = (): UpdateProfessionalDraft => ({ id: null, version: null, details: { identification: { name: null, docType: null, docId: null, countryCode: null }, agendaClinica: { professionalType: null } } });
export class AgendaClinicaProfissionaisShared extends StateLitElement {
/** state professionals — paginated directory of available professionals; source loadAvailableProfessionals.professionals; organism professionalList */
@property({ attribute: false }) professionals: Output<'agendaClinica.profissionais.loadAvailableProfessionals'>['professionals'] = { items: [], page: 1, pageSize: 20, hasMore: false };
/** state professional — complete selected or saved professional record; source getProfessional.professional; organisms professionalDetail, professionalForm */
@property({ attribute: false }) professional: ProfessionalRecord | null = null;
/** state selectedProfissional — selected professional identifier; source entry.params.profissionalId; organisms professionalDetail, professionalList; persisted */
@property({ attribute: false }) selectedProfissional: string | null = null;
/** state pageStatus — status of the first page scene; source page lifecycle */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state loadAvailableProfessionalsStatus — request status for the initial directory page; source loadAvailableProfessionals.status */
@property({ attribute: false }) loadAvailableProfessionalsStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state loadAvailableProfessionalsError — error from the initial directory page request; source loadAvailableProfessionals.error */
@property({ attribute: false }) loadAvailableProfessionalsError: ErrorState = null;
/** state loadMoreAvailableProfessionalsStatus — request status for the next directory page request; source loadMoreAvailableProfessionals.status */
@property({ attribute: false }) loadMoreAvailableProfessionalsStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state loadMoreAvailableProfessionalsError — error from the next directory page request; source loadMoreAvailableProfessionals.error */
@property({ attribute: false }) loadMoreAvailableProfessionalsError: ErrorState = null;
/** state searchAvailableProfessionalsStatus — request status for the first name search page; source searchAvailableProfessionals.status */
@property({ attribute: false }) searchAvailableProfessionalsStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state searchAvailableProfessionalsError — error from the first name search request; source searchAvailableProfessionals.error */
@property({ attribute: false }) searchAvailableProfessionalsError: ErrorState = null;
/** state loadMoreProfessionalSearchStatus — request status for the next search page; source loadMoreProfessionalSearch.status */
@property({ attribute: false }) loadMoreProfessionalSearchStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state loadMoreProfessionalSearchError — error from the next search page request; source loadMoreProfessionalSearch.error */
@property({ attribute: false }) loadMoreProfessionalSearchError: ErrorState = null;
/** state getProfessionalStatus — request status for the selected professional; source getProfessional.status */
@property({ attribute: false }) getProfessionalStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state getProfessionalError — error from the selected professional request; source getProfessional.error */
@property({ attribute: false }) getProfessionalError: ErrorState = null;
/** state createProfessionalStatus — request status for creating a professional; source createProfessional.status */
@property({ attribute: false }) createProfessionalStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state createProfessionalError — error from creating a professional; source createProfessional.error */
@property({ attribute: false }) createProfessionalError: ErrorState = null;
/** state updateProfessionalStatus — request status for updating a professional; source updateProfessional.status */
@property({ attribute: false }) updateProfessionalStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state updateProfessionalError — error from updating a professional; source updateProfessional.error */
@property({ attribute: false }) updateProfessionalError: ErrorState = null;
/** state createProfessionalDraft — form draft for creating a professional; source createProfessional.input; organism professionalForm */
@property({ attribute: false }) createProfessionalDraft: CreateProfessionalDraft = emptyCreateDraft();
/** state updateProfessionalDraft — form draft for updating a professional; source updateProfessional.input; organism professionalForm */
@property({ attribute: false }) updateProfessionalDraft: UpdateProfessionalDraft = emptyUpdateDraft();
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private currentPage = 1;
private currentSearch = '';
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.agendaClinica.profissionais.${member}`, value);
if (member === 'selectedProfissional') {
try { if (value === null) { localStorage.removeItem('agendaClinica.profissionais.profissionalId'); } else { localStorage.setItem('agendaClinica.profissionais.profissionalId', String(value)); } } catch { }
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) (this as unknown as Record<string, unknown>)[member] = value;
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('scenary', '');
this.publish('loadAvailableProfessionalsStatus', 'idle');
this.publish('loadAvailableProfessionalsError', null);
this.publish('loadMoreAvailableProfessionalsStatus', 'idle');
this.publish('loadMoreAvailableProfessionalsError', null);
this.publish('searchAvailableProfessionalsStatus', 'idle');
this.publish('searchAvailableProfessionalsError', null);
this.publish('loadMoreProfessionalSearchStatus', 'idle');
this.publish('loadMoreProfessionalSearchError', null);
this.publish('getProfessionalStatus', 'idle');
this.publish('getProfessionalError', null);
this.publish('createProfessionalStatus', 'idle');
this.publish('createProfessionalError', null);
this.publish('updateProfessionalStatus', 'idle');
this.publish('updateProfessionalError', null);
this.publish('createProfessionalDraft', emptyCreateDraft());
this.publish('updateProfessionalDraft', emptyUpdateDraft());
}
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) { const member = STATE_MEMBER_BY_KEY[key]; if (member === 'professionals' || member === 'professional' || member === 'selectedProfissional') { const value = getState(key); if (value !== undefined) this.assignState(key, value); } }
this.resetVisit();
subscribe(STATE_KEYS, this);
const params = new URLSearchParams(window.location.search);
const read = (name: string): string | null => { const urlValue = params.get(name); if (urlValue !== null) return urlValue; try { return localStorage.getItem(`agendaClinica.profissionais.${name}`); } catch { return null; } };
const pageRaw = read('page');
if (pageRaw !== null) { const page = Number(pageRaw); if (Number.isFinite(page)) this.currentPage = page; }
const search = read('search');
if (search !== null) this.currentSearch = search;
const entryId = read('id');
const profissionalId = read('profissionalId');
const selectedId = profissionalId ?? entryId;
if (selectedId !== null) void this.setSelectedProfissional(selectedId);
const docId = read('docId');
if (docId !== null) { const create = this.createProfessionalDraft; const update = this.updateProfessionalDraft; this.publish('createProfessionalDraft', { ...create, details: { ...create.details, identification: { ...create.details.identification, docId } } }); this.publish('updateProfessionalDraft', { ...update, details: { ...update.details, identification: { ...update.details.identification, docId } } }); }
if (this.currentSearch !== '') void this.searchAvailableProfessionals(this.currentSearch); else void this.loadAvailableProfessionals();
}
public disconnectedCallback(): void {
unsubscribe(STATE_KEYS, this);
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (!STATE_MEMBER_BY_KEY[key]) { super.handleIcaStateChange(key, value); return; }
if (value === undefined) return;
this.assignState(key, value);
this.requestUpdate();
}
/** function setScenario — changes the visible scene; redraws scenary by replacement; value is the scene identifier */
public setScenario(value: string): void { this.publish('scenary', value); }
/** function setCreateProfessional — fills the create professional form draft; redraws createProfessionalDraft by replacement; value is the editable command input */
public setCreateProfessional(value: CreateProfessionalDraft): void { this.publish('createProfessionalDraft', value); }
/** function setUpdateProfessional — fills the update professional form draft; redraws updateProfessionalDraft by replacement; value is the editable command input */
public setUpdateProfessional(value: UpdateProfessionalDraft): void { this.publish('updateProfessionalDraft', value); }
/** select — selects a professional identifier and loads its complete record; redraws selectedProfissional and professional by replacement; id is the professional identifier or null to clear */
public async setSelectedProfissional(id: string | null): Promise<void> { this.publish('selectedProfissional', id); if (id !== null) await this.getProfessional(id); }
private errorOf(error: unknown): ErrorState { const name = error instanceof Error ? error.name : ''; return { code: 'client.unexpected', message: '', details: { name } }; }
private async query<R extends keyof ProfissionaisContracts>(request: R, input: Input<R>): Promise<Output<R> | null> {
try { const response = await execBff<Output<R>>(request, input, { mode: 'silent' }); if (!response.ok || !response.data) return null; return response.data; } catch { return null; }
}
private directoryItem(record: ProfessionalRecord): ProfessionalDirectoryItem { return { id: record.id, details: { identification: { details: { identification: { name: record.details.identification.details.identification.name, status: record.details.identification.details.identification.status } } }, agendaClinica: { details: { agendaClinica: { professionalType: record.details.agendaClinica.details.agendaClinica.professionalType } } } } }; }
/** function loadAvailableProfessionals — loads the first available directory page; redraws professionals by replacement; no arguments */
public async loadAvailableProfessionals(): Promise<void> {
if (this.loadAvailableProfessionalsStatus === 'loading') return; this.publish('pageStatus', 'loading'); this.publish('loadAvailableProfessionalsStatus', 'loading'); this.publish('loadAvailableProfessionalsError', null); const output = await this.query('agendaClinica.profissionais.loadAvailableProfessionals', { page: this.currentPage, pageSize: 20 }); if (!output) { this.publish('loadAvailableProfessionalsStatus', 'error'); this.publish('pageStatus', 'error'); return; } this.publish('professionals', output.professionals); this.publish('loadAvailableProfessionalsStatus', 'success'); this.publish('pageStatus', output.professionals.items.length === 0 ? 'empty' : 'success');
}
/** function loadMoreAvailableProfessionals — obtains the next directory page; redraws professionals.items by appending; no arguments */
public async loadMoreAvailableProfessionals(): Promise<void> { if (this.loadMoreAvailableProfessionalsStatus === 'loading' || !this.professionals.hasMore) return; this.publish('loadMoreAvailableProfessionalsStatus', 'loading'); this.publish('loadMoreAvailableProfessionalsError', null); const output = await this.query('agendaClinica.profissionais.loadMoreAvailableProfessionals', { page: this.professionals.page + 1, pageSize: this.professionals.pageSize }); if (!output) { this.publish('loadMoreAvailableProfessionalsStatus', 'error'); return; } this.publish('professionals', { ...output.professionals, items: [...this.professionals.items, ...output.professionals.items] }); this.publish('loadMoreAvailableProfessionalsStatus', 'success'); }
/** function searchAvailableProfessionals — searches available professionals by name; redraws professionals by replacement; search is the entered name */
public async searchAvailableProfessionals(search: string): Promise<void> { this.currentSearch = search; this.currentPage = 1; this.publish('searchAvailableProfessionalsStatus', 'loading'); this.publish('searchAvailableProfessionalsError', null); const output = await this.query('agendaClinica.profissionais.searchAvailableProfessionals', { search, page: 1, pageSize: 20 }); if (!output) { this.publish('searchAvailableProfessionalsStatus', 'error'); return; } this.publish('professionals', output.professionals); this.publish('searchAvailableProfessionalsStatus', 'success'); }
/** function loadMoreProfessionalSearch — loads the next name-search page; redraws professionals.items by appending; no arguments */
public async loadMoreProfessionalSearch(): Promise<void> { if (this.loadMoreProfessionalSearchStatus === 'loading' || !this.professionals.hasMore) return; this.publish('loadMoreProfessionalSearchStatus', 'loading'); this.publish('loadMoreProfessionalSearchError', null); const output = await this.query('agendaClinica.profissionais.loadMoreProfessionalSearch', { search: this.currentSearch, page: this.professionals.page + 1, pageSize: this.professionals.pageSize }); if (!output) { this.publish('loadMoreProfessionalSearchStatus', 'error'); return; } this.publish('professionals', { ...output.professionals, items: [...this.professionals.items, ...output.professionals.items] }); this.publish('loadMoreProfessionalSearchStatus', 'success'); }
/** function getProfessional — loads the complete selected professional record; redraws professional by replacement; id is the selected professional identifier */
public async getProfessional(id: string): Promise<void> { if (this.getProfessionalStatus === 'loading') return; this.publish('getProfessionalStatus', 'loading'); this.publish('getProfessionalError', null); const output = await this.query('agendaClinica.profissionais.getProfessional', { id }); if (!output) { this.publish('getProfessionalStatus', 'error'); return; } this.publish('professional', output.professional); this.publish('getProfessionalStatus', 'success'); }
private async command<R extends 'agendaClinica.profissionais.createProfessional' | 'agendaClinica.profissionais.updateProfessional'>(request: R, input: Input<R>): Promise<Output<R> | null> { const result = await runBlockingUiAction(signal => execBff<Output<R>>(request, input, { mode: 'blocking', signal })); if (result === undefined) return null; if (!result.ok || !result.data) return null; return result.data; }
/** function createProfessional — creates or attaches a professional master record; redraws professional by replacement and professionals.items by upsert; no arguments, using the create form draft */
public async createProfessional(): Promise<void> { const draft = this.createProfessionalDraft; const keys: string[] = []; if (!draft.details.identification.name) keys.push('createProfessionalDraft.details.identification.name'); if (!draft.details.identification.countryCode) keys.push('createProfessionalDraft.details.identification.countryCode'); if (!draft.details.agendaClinica.professionalType) keys.push('createProfessionalDraft.details.agendaClinica.professionalType'); if (keys.length > 0) { this.publish('createProfessionalError', { code: 'client.requiredMissing', message: '', details: { stateKeys: keys } }); this.publish('createProfessionalStatus', 'error'); return; } const name = draft.details.identification.name; const countryCode = draft.details.identification.countryCode; const professionalType = draft.details.agendaClinica.professionalType; if (name === null || countryCode === null || professionalType === null) return; this.publish('createProfessionalStatus', 'loading'); const identification = draft.details.identification; const input: Input<'agendaClinica.profissionais.createProfessional'> = { details: { identification: { name, countryCode, ...(identification.docType !== null ? { docType: identification.docType } : {}), ...(identification.docId !== null && identification.docId !== '' ? { docId: identification.docId } : {}) }, agendaClinica: { professionalType } } }; const output = await this.command('agendaClinica.profissionais.createProfessional', input); if (!output) { this.publish('createProfessionalStatus', 'error'); return; } this.publish('professional', output.professional); this.publish('professionals', { ...this.professionals, items: this.professionals.items.some(item => item.id === output.professional.id) ? this.professionals.items.map(item => item.id === output.professional.id ? this.directoryItem(output.professional) : item) : [...this.professionals.items, this.directoryItem(output.professional)] }); this.publish('createProfessionalDraft', emptyCreateDraft()); this.publish('createProfessionalStatus', 'success'); }
/** function updateProfessional — updates the selected professional with optimistic versioning; redraws professional by replacement and professionals.items by upsert; no arguments, using the update form draft */
public async updateProfessional(): Promise<void> { const draft = this.updateProfessionalDraft; const keys: string[] = []; if (!draft.id) keys.push('updateProfessionalDraft.id'); if (draft.version === null) keys.push('updateProfessionalDraft.version'); if (!draft.details.identification.name) keys.push('updateProfessionalDraft.details.identification.name'); if (!draft.details.identification.countryCode) keys.push('updateProfessionalDraft.details.identification.countryCode'); if (!draft.details.agendaClinica.professionalType) keys.push('updateProfessionalDraft.details.agendaClinica.professionalType'); if (keys.length > 0) { this.publish('updateProfessionalError', { code: 'client.requiredMissing', message: '', details: { stateKeys: keys } }); this.publish('updateProfessionalStatus', 'error'); return; } const id = draft.id; const version = draft.version; const name = draft.details.identification.name; const countryCode = draft.details.identification.countryCode; const professionalType = draft.details.agendaClinica.professionalType; if (id === null || version === null || name === null || countryCode === null || professionalType === null) return; this.publish('updateProfessionalStatus', 'loading'); const identification = draft.details.identification; const input: Input<'agendaClinica.profissionais.updateProfessional'> = { id, version, details: { identification: { name, countryCode, ...(identification.docType !== null ? { docType: identification.docType } : {}), ...(identification.docId !== null && identification.docId !== '' ? { docId: identification.docId } : {}) }, agendaClinica: { professionalType } } }; const output = await this.command('agendaClinica.profissionais.updateProfessional', input); if (!output) { this.publish('updateProfessionalStatus', 'error'); return; } this.publish('professional', output.professional); this.publish('professionals', { ...this.professionals, items: this.professionals.items.some(item => item.id === output.professional.id) ? this.professionals.items.map(item => item.id === output.professional.id ? this.directoryItem(output.professional) : item) : [...this.professionals.items, this.directoryItem(output.professional)] }); this.publish('updateProfessionalDraft', emptyUpdateDraft()); this.publish('updateProfessionalStatus', 'success'); }
}
