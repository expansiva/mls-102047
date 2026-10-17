/// <mls fileReference="_102047_/l2/inicio/web/shared/inicio_responsavel.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { Inicio_responsavelContracts, SituacaoEmpresa, IndicadoresAcessoPessoas, PessoaAguardandoLiberacao } from '/_102047_/l2/inicio/web/contracts/inicio_responsavel.defs.js';
export type { Inicio_responsavelContracts, SituacaoEmpresa, IndicadoresAcessoPessoas, PessoaAguardandoLiberacao } from '/_102047_/l2/inicio/web/contracts/inicio_responsavel.defs.js';
type Input<R extends keyof Inicio_responsavelContracts> = Inicio_responsavelContracts[R]['input'];
type Output<R extends keyof Inicio_responsavelContracts> = Inicio_responsavelContracts[R]['output'];
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type PessoasPage = Output<'inicio.inicio_responsavel.qryPessoasAguardandoLiberacao'>['pessoas'];
type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
type StateMember =
| 'empresa'
| 'indicadores'
| 'pessoas'
| 'pessoaOrganizacaoId'
| 'pageStatus'
| 'qryPainelResponsavelStatus'
| 'qryPainelResponsavelError'
| 'qryPessoasAguardandoLiberacaoStatus'
| 'qryPessoasAguardandoLiberacaoError'
| 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.inicio.inicio_responsavel.empresa': 'empresa',
'ui.inicio.inicio_responsavel.indicadores': 'indicadores',
'ui.inicio.inicio_responsavel.pessoas': 'pessoas',
'ui.inicio.inicio_responsavel.pessoaOrganizacaoId': 'pessoaOrganizacaoId',
'ui.inicio.inicio_responsavel.pageStatus': 'pageStatus',
'ui.inicio.inicio_responsavel.qryPainelResponsavelStatus': 'qryPainelResponsavelStatus',
'ui.inicio.inicio_responsavel.qryPainelResponsavelError': 'qryPainelResponsavelError',
'ui.inicio.inicio_responsavel.qryPessoasAguardandoLiberacaoStatus': 'qryPessoasAguardandoLiberacaoStatus',
'ui.inicio.inicio_responsavel.qryPessoasAguardandoLiberacaoError': 'qryPessoasAguardandoLiberacaoError',
'ui.inicio.inicio_responsavel.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const PESSOAS_PAGE_SIZE = 20;
const STORAGE_PESSOA_ORGANIZACAO_ID = 'inicio.inicio_responsavel.pessoaOrganizacaoId';
export class InicioInicio_responsavelShared extends StateLitElement {
/** state empresa — situation of the company that owns the app: name, whether it is prepared and which required data is missing; source qryPainelResponsavel.empresa; organism situacaoEmpresa */
@property({ attribute: false }) empresa: SituacaoEmpresa | null = null;
/** state indicadores — counts of the access situation of the organization people (complete access, missing data, pending consent); source qryPainelResponsavel.indicadores; organism indicadoresAcessoPessoas */
@property({ attribute: false }) indicadores: IndicadoresAcessoPessoas | null = null;
/** state pessoas — page { items, page, pageSize, hasMore } of the organization people whose access awaits release, with name, status, contacts and missing minimum data; source qryPessoasAguardandoLiberacao.pessoas; organism pessoasAguardandoLiberacao */
@property({ attribute: false }) pessoas: PessoasPage | null = null;
/** state pessoaOrganizacaoId — id of the selected person of the organization (entry param, selects the row of pessoas with that id); source entry.params.pessoaOrganizacaoId; organism indicadoresAcessoPessoas; persisted */
@property({ attribute: false }) pessoaOrganizacaoId: string | null = null;
/** state pageStatus — overall status of the page load: loading while the initial requests run, error if one failed, empty when the loaded list is empty, success otherwise; source page */
@property({ attribute: false }) pageStatus: PageStatus = 'idle';
/** state qryPainelResponsavelStatus — status of the request qryPainelResponsavel; source request */
@property({ attribute: false }) qryPainelResponsavelStatus: RequestStatus = 'idle';
/** state qryPainelResponsavelError — error of the request qryPainelResponsavel, null when none; source request */
@property({ attribute: false }) qryPainelResponsavelError: ErrorState = null;
/** state qryPessoasAguardandoLiberacaoStatus — status of the request qryPessoasAguardandoLiberacao; source request */
@property({ attribute: false }) qryPessoasAguardandoLiberacaoStatus: RequestStatus = 'idle';
/** state qryPessoasAguardandoLiberacaoError — error of the request qryPessoasAguardandoLiberacao (also client.selectionInvalid), null when none; source request */
@property({ attribute: false }) qryPessoasAguardandoLiberacaoError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private subscribed = false;
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.inicio.inicio_responsavel.${member}`, value);
if (member === 'pessoaOrganizacaoId') {
try {
if (value === null || value === undefined) {
localStorage.removeItem(STORAGE_PESSOA_ORGANIZACAO_ID);
} else {
localStorage.setItem(STORAGE_PESSOA_ORGANIZACAO_ID, String(value));
}
} catch {
// storage unavailable: the state still lives in memory
}
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) (this as unknown as Record<string, unknown>)[member] = value;
}
public connectedCallback(): void {
super.connectedCallback();
this.hydrateData();
this.resetVisit();
if (!this.subscribed) {
subscribe([...STATE_KEYS], this);
this.subscribed = true;
}
this.applyEntryParams();
void this.loadInitial();
}
public disconnectedCallback(): void {
unsubscribe([...STATE_KEYS], this);
this.subscribed = false;
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (!(key in STATE_MEMBER_BY_KEY)) {
super.handleIcaStateChange(key, value);
return;
}
if (value === undefined) return;
this.assignState(key, value);
this.requestUpdate();
}
private hydrateData(): void {
const empresa = getState('ui.inicio.inicio_responsavel.empresa');
if (empresa !== undefined) this.assignState('ui.inicio.inicio_responsavel.empresa', empresa);
const indicadores = getState('ui.inicio.inicio_responsavel.indicadores');
if (indicadores !== undefined) this.assignState('ui.inicio.inicio_responsavel.indicadores', indicadores);
const pessoas = getState('ui.inicio.inicio_responsavel.pessoas');
if (pessoas !== undefined) this.assignState('ui.inicio.inicio_responsavel.pessoas', pessoas);
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('qryPainelResponsavelStatus', 'idle');
this.publish('qryPainelResponsavelError', null);
this.publish('qryPessoasAguardandoLiberacaoStatus', 'idle');
this.publish('qryPessoasAguardandoLiberacaoError', null);
this.publish('scenary', '');
}
private readUrlParam(name: string): string | null {
try {
const search = typeof location !== 'undefined' && location ? location.search : '';
return new URLSearchParams(search).get(name);
} catch {
return null;
}
}
private applyEntryParams(): void {
let raw: string | null = this.readUrlParam('pessoaOrganizacaoId');
if (raw === null || raw === '') {
raw = null;
try {
raw = localStorage.getItem(STORAGE_PESSOA_ORGANIZACAO_ID);
} catch {
raw = null;
}
}
this.publish('pessoaOrganizacaoId', raw !== null && raw !== '' ? raw : null);
}
private async loadInitial(): Promise<void> {
this.publish('pageStatus', 'loading');
await Promise.all([this.qryPainelResponsavel(), this.qryPessoasAguardandoLiberacao(1, false)]);
this.refreshPageStatus();
this.checkSelection();
}
private refreshPageStatus(): void {
const a = this.qryPainelResponsavelStatus;
const b = this.qryPessoasAguardandoLiberacaoStatus;
if (a === 'loading' || b === 'loading') {
this.publish('pageStatus', 'loading');
return;
}
if (a === 'error' || b === 'error') {
this.publish('pageStatus', 'error');
return;
}
if (a === 'idle' && b === 'idle') {
this.publish('pageStatus', 'idle');
return;
}
const items = this.pessoas ? this.pessoas.items : [];
this.publish('pageStatus', items.length === 0 ? 'empty' : 'success');
}
private unexpectedError(error: unknown): ErrorState {
const name = error instanceof Error ? error.name : 'unknown';
return { code: 'client.unexpected', message: '', details: { name } };
}
private findPessoa(id: string | null): PessoaAguardandoLiberacao | null {
if (id === null || !this.pessoas) return null;
const found = this.pessoas.items.find((row) => row.id === id);
return found ?? null;
}
/** The selected person: the row of the loaded list pessoas whose id is pessoaOrganizacaoId; null when nothing is selected or the row is not loaded. Selection of the organism indicadoresAcessoPessoas. */
public get indicadoresAcessoPessoas(): PessoaAguardandoLiberacao | null {
return this.findPessoa(this.pessoaOrganizacaoId);
}
private checkSelection(): void {
const id = this.pessoaOrganizacaoId;
if (id === null) return;
if (this.qryPessoasAguardandoLiberacaoStatus !== 'success') return;
if (this.findPessoa(id) !== null) return;
this.publish('qryPessoasAguardandoLiberacaoError', { code: 'client.selectionInvalid', message: '', details: { pessoaOrganizacaoId: id } });
this.publish('qryPessoasAguardandoLiberacaoStatus', 'error');
this.refreshPageStatus();
}
/** select — selects a person of the organization by id (or clears the selection with null); the selected record is the row of pessoas with that id (getter indicadoresAcessoPessoas). An id that no loaded row resolves publishes client.selectionInvalid in qryPessoasAguardandoLiberacaoError. Persisted as the entry param pessoaOrganizacaoId. */
public selecionarPessoaOrganizacao(id: string | null): void {
this.publish('pessoaOrganizacaoId', id !== null && id !== '' ? id : null);
const current = this.qryPessoasAguardandoLiberacaoError;
if (current && current.code === 'client.selectionInvalid') {
this.publish('qryPessoasAguardandoLiberacaoError', null);
this.publish('qryPessoasAguardandoLiberacaoStatus', 'success');
}
if (this.qryPessoasAguardandoLiberacaoStatus === 'success') this.checkSelection();
this.refreshPageStatus();
}
/** request qryPainelResponsavel — loads the preparation situation of the company and the access counts of the organization people (no input, the session gives the company); redraws empresa and indicadores (replace). Also the method to reload the panel. */
public async qryPainelResponsavel(): Promise<void> {
if (this.qryPainelResponsavelStatus === 'loading') return;
this.publish('qryPainelResponsavelStatus', 'loading');
this.publish('qryPainelResponsavelError', null);
this.refreshPageStatus();
try {
const input: Input<'inicio.inicio_responsavel.qryPainelResponsavel'> = {};
const response = await execBff<Output<'inicio.inicio_responsavel.qryPainelResponsavel'>>('inicio.inicio_responsavel.qryPainelResponsavel', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('qryPainelResponsavelError', response.error ?? this.unexpectedError(null));
this.publish('qryPainelResponsavelStatus', 'error');
this.refreshPageStatus();
return;
}
this.publish('empresa', response.data.empresa);
this.publish('indicadores', response.data.indicadores);
this.publish('qryPainelResponsavelStatus', 'success');
} catch (error) {
this.publish('qryPainelResponsavelError', this.unexpectedError(error));
this.publish('qryPainelResponsavelStatus', 'error');
}
this.refreshPageStatus();
}
/** request qryPessoasAguardandoLiberacao — lists, page by page, the organization people whose access awaits release, ordered by name; redraws pessoas (replace, or append the next page to items when append is true). Arguments: page — page number to load (default 1; the first page also serves as reload); append — true for a "load more" that adds the page to the current items (does nothing unless pessoas.hasMore). */
public async qryPessoasAguardandoLiberacao(page: number = 1, append: boolean = false): Promise<void> {
if (this.qryPessoasAguardandoLiberacaoStatus === 'loading') return;
if (append && !(this.pessoas && this.pessoas.hasMore)) return;
this.publish('qryPessoasAguardandoLiberacaoStatus', 'loading');
this.publish('qryPessoasAguardandoLiberacaoError', null);
this.refreshPageStatus();
try {
const input: Input<'inicio.inicio_responsavel.qryPessoasAguardandoLiberacao'> = {
page,
pageSize: this.pessoas ? this.pessoas.pageSize : PESSOAS_PAGE_SIZE,
};
const response = await execBff<Output<'inicio.inicio_responsavel.qryPessoasAguardandoLiberacao'>>('inicio.inicio_responsavel.qryPessoasAguardandoLiberacao', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('qryPessoasAguardandoLiberacaoError', response.error ?? this.unexpectedError(null));
this.publish('qryPessoasAguardandoLiberacaoStatus', 'error');
this.refreshPageStatus();
return;
}
const loaded = response.data.pessoas;
if (append) {
const previous = this.pessoas ? this.pessoas.items : [];
this.publish('pessoas', { items: [...previous, ...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore });
} else {
this.publish('pessoas', loaded);
}
this.publish('qryPessoasAguardandoLiberacaoStatus', 'success');
} catch (error) {
this.publish('qryPessoasAguardandoLiberacaoError', this.unexpectedError(error));
this.publish('qryPessoasAguardandoLiberacaoStatus', 'error');
}
this.refreshPageStatus();
}
/** setScenario — publishes the visible scene of the page (not persisted, never in the URL). */
public setScenario(value: string): void {
this.publish('scenary', value);
}
private goTo(target: string, params: Array<[string, string | null]>): void {
const parts: string[] = [];
for (const [name, value] of params) {
if (value !== null && value !== '') parts.push(`${name}=${encodeURIComponent(value)}`);
}
const query = parts.length > 0 ? `?${parts.join('&')}` : '';
auraNavigate(`/inicio/${target}${query}`, { basePath: '/inicio' });
}
/** navigate — opens the company page (/inicio/empresa) to complete the missing company data, carrying the company id as empresaId; refuses with client.preconditionMissing in qryPainelResponsavelError when the company is not loaded. */
public irPrepararEmpresa(): void {
const empresaId = this.empresa ? this.empresa.id : null;
if (empresaId === null || empresaId === '') {
this.publish('qryPainelResponsavelError', { code: 'client.preconditionMissing', message: '', details: { params: ['empresaId'] } });
return;
}
this.goTo('empresa', [['empresaId', empresaId]]);
}
/** navigate — opens the organization people page (/inicio/pessoas_organizacao), carrying the company id as empresaId and the selected person, when there is one, as pessoaOrganizacaoId. */
public verPessoasOrganizacao(): void {
const empresaId = this.empresa ? this.empresa.id : null;
this.goTo('pessoas_organizacao', [
['empresaId', empresaId],
['pessoaOrganizacaoId', this.pessoaOrganizacaoId],
]);
}
/** navigate — opens the organization people page (/inicio/pessoas_organizacao) on the person to release. Argument: pessoaId — id of the person row the user opens (carried as pessoaOrganizacaoId, with the company id as empresaId); refuses with client.preconditionMissing in qryPessoasAguardandoLiberacaoError when null. */
public abrirPessoaParaLiberar(pessoaId: string | null): void {
if (pessoaId === null || pessoaId === '') {
this.publish('qryPessoasAguardandoLiberacaoError', { code: 'client.preconditionMissing', message: '', details: { params: ['pessoaOrganizacaoId'] } });
return;
}
const empresaId = this.empresa ? this.empresa.id : null;
this.goTo('pessoas_organizacao', [
['empresaId', empresaId],
['pessoaOrganizacaoId', pessoaId],
]);
}
}
