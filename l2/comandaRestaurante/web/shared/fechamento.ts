/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/fechamento.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { FechamentoContracts, ComandaAbertaResumo, ComandaParaFechamento } from '/_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.js';
export type { FechamentoContracts, ComandaAbertaResumo, ComandaParaFechamento } from '/_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type FecharComandaPagaDraft = { discountAmount: string | null; paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' | null };
type Input<R extends keyof FechamentoContracts> = FechamentoContracts[R]['input'];
type Output<R extends keyof FechamentoContracts> = FechamentoContracts[R]['output'];
type OpenComandasPage = Output<'comandaRestaurante.fechamento.carregarFechamento'>['openComandas'];
type StateMember = 'openComandas' | 'comanda' | 'selectedComanda' | 'fecharComandaPagaInput' | 'pageStatus' | 'carregarFechamentoStatus' | 'carregarFechamentoError' | 'buscarComandasAbertasStatus' | 'buscarComandasAbertasError' | 'carregarMaisComandasAbertasStatus' | 'carregarMaisComandasAbertasError' | 'obterComandaParaFechamentoStatus' | 'obterComandaParaFechamentoError' | 'fecharComandaPagaStatus' | 'fecharComandaPagaError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.fechamento.openComandas': 'openComandas',
'ui.comandaRestaurante.fechamento.comanda': 'comanda',
'ui.comandaRestaurante.fechamento.selectedComanda': 'selectedComanda',
'ui.comandaRestaurante.fechamento.fecharComandaPagaInput': 'fecharComandaPagaInput',
'ui.comandaRestaurante.fechamento.pageStatus': 'pageStatus',
'ui.comandaRestaurante.fechamento.carregarFechamentoStatus': 'carregarFechamentoStatus',
'ui.comandaRestaurante.fechamento.carregarFechamentoError': 'carregarFechamentoError',
'ui.comandaRestaurante.fechamento.buscarComandasAbertasStatus': 'buscarComandasAbertasStatus',
'ui.comandaRestaurante.fechamento.buscarComandasAbertasError': 'buscarComandasAbertasError',
'ui.comandaRestaurante.fechamento.carregarMaisComandasAbertasStatus': 'carregarMaisComandasAbertasStatus',
'ui.comandaRestaurante.fechamento.carregarMaisComandasAbertasError': 'carregarMaisComandasAbertasError',
'ui.comandaRestaurante.fechamento.obterComandaParaFechamentoStatus': 'obterComandaParaFechamentoStatus',
'ui.comandaRestaurante.fechamento.obterComandaParaFechamentoError': 'obterComandaParaFechamentoError',
'ui.comandaRestaurante.fechamento.fecharComandaPagaStatus': 'fecharComandaPagaStatus',
'ui.comandaRestaurante.fechamento.fecharComandaPagaError': 'fecharComandaPagaError',
'ui.comandaRestaurante.fechamento.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const PAGE_SIZE = 20;
export class ComandaRestauranteFechamentoShared extends StateLitElement {
/** state openComandas — summary of open comandas available for locating and selecting the charge; source carregarFechamento.openComandas; organism openComandaList */
@property({ attribute: false }) openComandas: OpenComandasPage | null = null;
/** state comanda — selected comanda with valid lines, calculated totals, payment data and table availability; source obterComandaParaFechamento.comanda; organism comandaReview */
@property({ attribute: false }) comanda: ComandaParaFechamento | null = null;
/** state selectedComanda — the selected comanda identifier from the page context; source entry.params.comandaId; organism comandaReview; persisted */
@property({ attribute: false }) selectedComanda: string | null = null;
/** state fecharComandaPagaInput — the local payment draft containing the optional discount and required payment method; source fecharComandaPaga.input; organism paymentForm */
@property({ attribute: false }) fecharComandaPagaInput: FecharComandaPagaDraft = this.emptyFecharComandaPagaDraft();
/** state pageStatus — overall initial-load status of the page; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarFechamentoStatus — status of the initial fechamento query; source carregarFechamentoStatus */
@property({ attribute: false }) carregarFechamentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarFechamentoError — error from the initial fechamento query; source carregarFechamentoError */
@property({ attribute: false }) carregarFechamentoError: ErrorState = null;
/** state buscarComandasAbertasStatus — status of the open-comanda search query; source buscarComandasAbertasStatus */
@property({ attribute: false }) buscarComandasAbertasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state buscarComandasAbertasError — error from the open-comanda search query; source buscarComandasAbertasError */
@property({ attribute: false }) buscarComandasAbertasError: ErrorState = null;
/** state carregarMaisComandasAbertasStatus — status of the additional-page query; source carregarMaisComandasAbertasStatus */
@property({ attribute: false }) carregarMaisComandasAbertasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMaisComandasAbertasError — error from the additional-page query; source carregarMaisComandasAbertasError */
@property({ attribute: false }) carregarMaisComandasAbertasError: ErrorState = null;
/** state obterComandaParaFechamentoStatus — status of the selected-comanda query; source obterComandaParaFechamentoStatus */
@property({ attribute: false }) obterComandaParaFechamentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state obterComandaParaFechamentoError — error from the selected-comanda query; source obterComandaParaFechamentoError */
@property({ attribute: false }) obterComandaParaFechamentoError: ErrorState = null;
/** state fecharComandaPagaStatus — status of the close command; source fecharComandaPagaStatus */
@property({ attribute: false }) fecharComandaPagaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state fecharComandaPagaError — error from the close command; source fecharComandaPagaError */
@property({ attribute: false }) fecharComandaPagaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private numberFilter: number | null = null;
private mesaCodeFilter: string | null = null;
private detailFilterId: string | null = null;
private visitSubscribed = false;
private emptyFecharComandaPagaDraft(): FecharComandaPagaDraft {
return { discountAmount: null, paymentMethod: null };
}
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.fechamento.${member}`, value);
if (member === 'selectedComanda') {
try {
if (value === null || value === '') {
localStorage.removeItem('comandaRestaurante.fechamento.comandaId');
} else {
localStorage.setItem('comandaRestaurante.fechamento.comandaId', String(value));
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
private errorFromThrown(error: unknown): ErrorState {
const name = error instanceof Error ? error.name : 'Error';
return { code: 'client.unexpected', message: '', details: { name } };
}
private errorFromResponse(error: ErrorState): ErrorState {
return error ?? { code: 'client.unexpected', message: '', details: { name: 'BffError' } };
}
private readParam(name: string, persist: boolean): string | null {
const urlValue = new URLSearchParams(window.location.search).get(name);
if (urlValue !== null) {
return urlValue;
}
if (!persist) {
return null;
}
try {
return localStorage.getItem(`comandaRestaurante.fechamento.${name}`);
} catch {
return null;
}
}
private applyEntryParams(): void {
const comandaId = this.readParam('comandaId', true);
const numberValue = this.readParam('number', true);
const mesaCode = this.readParam('mesaCode', true);
const pageValue = this.readParam('page', true);
const id = this.readParam('id', true);
this.numberFilter = numberValue === null || numberValue === '' ? null : Number(numberValue);
if (this.numberFilter !== null && !Number.isFinite(this.numberFilter)) {
this.numberFilter = null;
}
this.mesaCodeFilter = mesaCode === null || mesaCode === '' ? null : mesaCode;
this.detailFilterId = id === null || id === '' ? null : id;
const page = pageValue === null || pageValue === '' ? 1 : Number(pageValue);
const pageNumber = Number.isFinite(page) && page > 0 ? page : 1;
this.publish('selectedComanda', comandaId === '' ? null : comandaId);
this.pageNumber = pageNumber;
}
private pageNumber = 1;
private setQueryStatus(request: 'carregarFechamento' | 'buscarComandasAbertas' | 'carregarMaisComandasAbertas' | 'obterComandaParaFechamento', status: 'idle' | 'loading' | 'success' | 'error'): void {
if (request === 'carregarFechamento') {
this.publish('carregarFechamentoStatus', status);
} else if (request === 'buscarComandasAbertas') {
this.publish('buscarComandasAbertasStatus', status);
} else if (request === 'carregarMaisComandasAbertas') {
this.publish('carregarMaisComandasAbertasStatus', status);
} else {
this.publish('obterComandaParaFechamentoStatus', status);
}
}
private setQueryError(request: 'carregarFechamento' | 'buscarComandasAbertas' | 'carregarMaisComandasAbertas' | 'obterComandaParaFechamento', error: ErrorState): void {
if (request === 'carregarFechamento') {
this.publish('carregarFechamentoError', error);
} else if (request === 'buscarComandasAbertas') {
this.publish('buscarComandasAbertasError', error);
} else if (request === 'carregarMaisComandasAbertas') {
this.publish('carregarMaisComandasAbertasError', error);
} else {
this.publish('obterComandaParaFechamentoError', error);
}
}
private async query<R extends keyof FechamentoContracts>(request: R, input: Input<R>): Promise<Output<R> | null> {
const response = await execBff<Output<R>>(request, input, { mode: 'silent' });
if (!response.ok || !response.data) {
return null;
}
return response.data;
}
/** function carregarFechamento — loads open comandas and the contextual selected charge; redraws openComandas by replacement and comanda with the returned selected record; no arguments */
public async carregarFechamento(): Promise<void> {
if (this.carregarFechamentoStatus === 'loading') {
return;
}
this.publish('pageStatus', 'loading');
this.publish('carregarFechamentoStatus', 'loading');
this.publish('carregarFechamentoError', null);
const input: Input<'comandaRestaurante.fechamento.carregarFechamento'> = { page: this.pageNumber, pageSize: PAGE_SIZE, ...(this.selectedComanda !== null && this.selectedComanda !== '' ? { comandaId: this.selectedComanda } : {}), ...(this.numberFilter !== null ? { number: this.numberFilter } : {}), ...(this.mesaCodeFilter !== null && this.mesaCodeFilter !== '' ? { mesaCode: this.mesaCodeFilter } : {}) };
try {
const output = await this.query('comandaRestaurante.fechamento.carregarFechamento', input);
if (!output) {
this.publish('carregarFechamentoStatus', 'error');
this.publish('carregarFechamentoError', { code: 'client.unexpected', message: '', details: { name: 'BffError' } });
this.publish('pageStatus', 'error');
return;
}
this.publish('openComandas', output.openComandas);
this.publish('comanda', output.selectedComanda ?? null);
this.publish('carregarFechamentoStatus', 'success');
this.publish('pageStatus', output.openComandas.items.length === 0 ? 'empty' : 'success');
} catch (error) {
this.publish('carregarFechamentoStatus', 'error');
this.publish('carregarFechamentoError', this.errorFromThrown(error));
this.publish('pageStatus', 'error');
}
}
/** function buscarComandasAbertas — replaces the location list with open comandas matching number and table filters; redraws openComandas by replacement; arguments are number and mesaCode filter values */
public async buscarComandasAbertas(number: number | null = this.numberFilter, mesaCode: string | null = this.mesaCodeFilter): Promise<void> {
this.numberFilter = number;
this.mesaCodeFilter = mesaCode;
this.pageNumber = 1;
if (this.buscarComandasAbertasStatus === 'loading') {
return;
}
this.publish('buscarComandasAbertasStatus', 'loading');
this.publish('buscarComandasAbertasError', null);
const input: Input<'comandaRestaurante.fechamento.buscarComandasAbertas'> = { page: 1, pageSize: PAGE_SIZE, ...(number !== null ? { number } : {}), ...(mesaCode !== null && mesaCode !== '' ? { mesaCode } : {}) };
try {
const output = await this.query('comandaRestaurante.fechamento.buscarComandasAbertas', input);
if (!output) {
this.publish('buscarComandasAbertasStatus', 'error');
this.publish('buscarComandasAbertasError', { code: 'client.unexpected', message: '', details: { name: 'BffError' } });
return;
}
this.publish('openComandas', output.openComandas);
this.publish('buscarComandasAbertasStatus', 'success');
} catch (error) {
this.publish('buscarComandasAbertasStatus', 'error');
this.publish('buscarComandasAbertasError', this.errorFromThrown(error));
}
}
/** function carregarMaisComandasAbertas — loads the next open-comanda window without reloading existing summaries; redraws openComandas.items by append; no arguments */
public async carregarMaisComandasAbertas(): Promise<void> {
if (this.carregarMaisComandasAbertasStatus === 'loading' || !this.openComandas || !this.openComandas.hasMore) {
return;
}
this.publish('carregarMaisComandasAbertasStatus', 'loading');
this.publish('carregarMaisComandasAbertasError', null);
const nextPage = this.openComandas.page + 1;
const input: Input<'comandaRestaurante.fechamento.carregarMaisComandasAbertas'> = { page: nextPage, pageSize: this.openComandas.pageSize, ...(this.numberFilter !== null ? { number: this.numberFilter } : {}), ...(this.mesaCodeFilter !== null && this.mesaCodeFilter !== '' ? { mesaCode: this.mesaCodeFilter } : {}) };
try {
const output = await this.query('comandaRestaurante.fechamento.carregarMaisComandasAbertas', input);
if (!output) {
this.publish('carregarMaisComandasAbertasStatus', 'error');
this.publish('carregarMaisComandasAbertasError', { code: 'client.unexpected', message: '', details: { name: 'BffError' } });
return;
}
this.publish('openComandas', { ...output.openComandas, items: [...this.openComandas.items, ...output.openComandas.items] });
this.publish('carregarMaisComandasAbertasStatus', 'success');
} catch (error) {
this.publish('carregarMaisComandasAbertasStatus', 'error');
this.publish('carregarMaisComandasAbertasError', this.errorFromThrown(error));
}
}
/** function obterComandaParaFechamento — obtains the selected open comanda composed for review and payment; redraws comanda by replacement; argument id is the selected comanda identifier */
public async obterComandaParaFechamento(id: string): Promise<void> {
if (id === '') {
return;
}
if (this.obterComandaParaFechamentoStatus === 'loading') {
return;
}
this.publish('selectedComanda', id);
this.publish('obterComandaParaFechamentoStatus', 'loading');
this.publish('obterComandaParaFechamentoError', null);
try {
const output = await this.query('comandaRestaurante.fechamento.obterComandaParaFechamento', { id });
if (!output) {
this.publish('obterComandaParaFechamentoStatus', 'error');
this.publish('obterComandaParaFechamentoError', { code: 'client.unexpected', message: '', details: { name: 'BffError' } });
return;
}
this.publish('comanda', output.comanda);
this.publish('obterComandaParaFechamentoStatus', 'success');
} catch (error) {
this.publish('obterComandaParaFechamentoStatus', 'error');
this.publish('obterComandaParaFechamentoError', this.errorFromThrown(error));
}
}
/** draft — updates the payment draft used by the close command */
public setFecharComandaPaga(value: FecharComandaPagaDraft): void {
this.publish('fecharComandaPagaInput', value);
}
/** select — selects a comanda identifier and loads its composed review record; argument id is the selected row identifier, or null to clear selection */
public async selectComandaReview(id: string | null): Promise<void> {
if (id === null) {
this.publish('selectedComanda', null);
this.publish('comanda', null);
return;
}
await this.obterComandaParaFechamento(id);
}
/** function fecharComandaPaga — records payment, closes the comanda and confirms table release; redraws comanda by upsert and removes the closed row from openComandas; no arguments, using the payment draft and selected record */
public async fecharComandaPaga(): Promise<void> {
if (this.fecharComandaPagaStatus === 'loading') {
return;
}
if (!this.comanda || this.fecharComandaPagaInput.paymentMethod === null) {
this.publish('fecharComandaPagaStatus', 'error');
this.publish('fecharComandaPagaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['comanda', 'fecharComandaPagaInput.paymentMethod'] } });
return;
}
const input: Input<'comandaRestaurante.fechamento.fecharComandaPaga'> = { id: this.comanda.id, version: this.comanda.version, details: { paymentMethod: this.fecharComandaPagaInput.paymentMethod, ...(this.fecharComandaPagaInput.discountAmount !== null && this.fecharComandaPagaInput.discountAmount !== '' ? { discountAmount: this.fecharComandaPagaInput.discountAmount } : {}) } };
this.publish('fecharComandaPagaStatus', 'loading');
this.publish('fecharComandaPagaError', null);
try {
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.fechamento.fecharComandaPaga'>>('comandaRestaurante.fechamento.fecharComandaPaga', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('fecharComandaPagaStatus', 'error');
this.publish('fecharComandaPagaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
return;
}
if (!result.ok || !result.data) {
this.publish('fecharComandaPagaStatus', 'error');
this.publish('fecharComandaPagaError', this.errorFromResponse(result.error));
return;
}
const data = result.data;
this.publish('comanda', data.comanda);
if (this.openComandas) {
this.publish('openComandas', { ...this.openComandas, items: this.openComandas.items.filter(item => item.id !== data.comanda.id) });
}
this.publish('fecharComandaPagaInput', this.emptyFecharComandaPagaDraft());
this.publish('fecharComandaPagaStatus', 'success');
} catch (error) {
this.publish('fecharComandaPagaStatus', 'error');
this.publish('fecharComandaPagaError', this.errorFromThrown(error));
}
}
public connectedCallback(): void {
super.connectedCallback();
const openComandas = getState('ui.comandaRestaurante.fechamento.openComandas');
const comanda = getState('ui.comandaRestaurante.fechamento.comanda');
if (openComandas !== undefined) {
this.assignState('ui.comandaRestaurante.fechamento.openComandas', openComandas);
}
if (comanda !== undefined) {
this.assignState('ui.comandaRestaurante.fechamento.comanda', comanda);
}
this.publish('pageStatus', 'idle');
this.publish('carregarFechamentoStatus', 'idle');
this.publish('carregarFechamentoError', null);
this.publish('buscarComandasAbertasStatus', 'idle');
this.publish('buscarComandasAbertasError', null);
this.publish('carregarMaisComandasAbertasStatus', 'idle');
this.publish('carregarMaisComandasAbertasError', null);
this.publish('obterComandaParaFechamentoStatus', 'idle');
this.publish('obterComandaParaFechamentoError', null);
this.publish('fecharComandaPagaStatus', 'idle');
this.publish('fecharComandaPagaError', null);
this.publish('fecharComandaPagaInput', this.emptyFecharComandaPagaDraft());
this.publish('scenary', '');
if (!this.visitSubscribed) {
subscribe(STATE_KEYS, this);
this.visitSubscribed = true;
}
this.applyEntryParams();
void this.carregarFechamento();
}
public disconnectedCallback(): void {
if (this.visitSubscribed) {
unsubscribe(STATE_KEYS, this);
this.visitSubscribed = false;
}
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
/** Sets the visible scene identifier for the page. */
public setScenario(value: string): void {
this.publish('scenary', value);
}
}
