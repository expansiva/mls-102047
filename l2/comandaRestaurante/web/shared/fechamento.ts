/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/fechamento.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { FechamentoContracts, ComandaAbertaResumo, ComandaParaFechamento } from '/_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.js';
export type { FechamentoContracts, MesaResumo, ComandaAbertaResumo, ComandaResumoDetails, ItemCardapioNaComanda, ItemComandaDetailsParaFechamento, ItemComandaParaFechamento, ComandaDetailsParaFechamento, MesaNoFechamento, ComandaParaFechamento } from '/_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;

export type FecharComandaPagaDraft = {
id: string | null;
version: number | null;
details: {
discountAmount: string | null;
paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' | null;
};
};
type Input<R extends keyof FechamentoContracts> = FechamentoContracts[R]['input'];
type Output<R extends keyof FechamentoContracts> = FechamentoContracts[R]['output'];
type StateMember = 'openComandas' | 'comanda' | 'selectedComanda' | 'number' | 'mesaCode' | 'page' | 'fecharComandaPagaDraft' | 'pageStatus' | 'carregarFechamentoStatus' | 'carregarFechamentoError' | 'buscarComandasAbertasStatus' | 'buscarComandasAbertasError' | 'carregarMaisComandasAbertasStatus' | 'carregarMaisComandasAbertasError' | 'obterComandaParaFechamentoStatus' | 'obterComandaParaFechamentoError' | 'fecharComandaPagaStatus' | 'fecharComandaPagaError' | 'scenary';
type StatusMember = 'pageStatus' | 'carregarFechamentoStatus' | 'buscarComandasAbertasStatus' | 'carregarMaisComandasAbertasStatus' | 'obterComandaParaFechamentoStatus' | 'fecharComandaPagaStatus';
type ErrorMember = 'carregarFechamentoError' | 'buscarComandasAbertasError' | 'carregarMaisComandasAbertasError' | 'obterComandaParaFechamentoError' | 'fecharComandaPagaError';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.fechamento.openComandas': 'openComandas',
'ui.comandaRestaurante.fechamento.comanda': 'comanda',
'ui.comandaRestaurante.fechamento.selectedComanda': 'selectedComanda',
'ui.comandaRestaurante.fechamento.number': 'number',
'ui.comandaRestaurante.fechamento.mesaCode': 'mesaCode',
'ui.comandaRestaurante.fechamento.page': 'page',
'ui.comandaRestaurante.fechamento.fecharComandaPagaDraft': 'fecharComandaPagaDraft',
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
function emptyFecharComandaPagaDraft(): FecharComandaPagaDraft {
return { id: null, version: null, details: { discountAmount: null, paymentMethod: null } };
}
export class ComandaRestauranteFechamentoShared extends StateLitElement {
/** state openComandas — summary of open commands available for locating and selecting a closing; source carregarFechamento.openComandas; organism openComandaList */
@property({ attribute: false }) openComandas: Output<'comandaRestaurante.fechamento.carregarFechamento'>['openComandas'] = { items: [], page: 1, pageSize: PAGE_SIZE, hasMore: false };
/** state comanda — selected command with valid lines, calculated totals, payment data, and table availability; source obterComandaParaFechamento.comanda; organism comandaReview */
@property({ attribute: false }) comanda: ComandaParaFechamento | null = null;
/** state selectedComanda — selected command identifier from the entry context; source entry.params.comandaId; organism comandaReview; persisted */
@property({ attribute: false }) selectedComanda: string | null = null;
/** state number — command number filter; source entry.params.number; organism openComandaList; persisted */
@property({ attribute: false }) number: number | null = null;
/** state mesaCode — table code filter; source entry.params.mesaCode; organism openComandaList; persisted */
@property({ attribute: false }) mesaCode: string | null = null;
/** state page — current command-list page filter; source entry.params.page; organism openComandaList; persisted */
@property({ attribute: false }) page: number | null = null;
/** state fecharComandaPagaDraft — local payment and discount command draft; source fecharComandaPaga.input; organism paymentForm */
@property({ attribute: false }) fecharComandaPagaDraft: FecharComandaPagaDraft = emptyFecharComandaPagaDraft();
/** state pageStatus — overall page loading state; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarFechamentoStatus — status of the initial closing query; source carregarFechamento.status */
@property({ attribute: false }) carregarFechamentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarFechamentoError — error from the initial closing query; source carregarFechamento.error */
@property({ attribute: false }) carregarFechamentoError: ErrorState = null;
/** state buscarComandasAbertasStatus — status of the filtered open-command query; source buscarComandasAbertas.status */
@property({ attribute: false }) buscarComandasAbertasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state buscarComandasAbertasError — error from the filtered open-command query; source buscarComandasAbertas.error */
@property({ attribute: false }) buscarComandasAbertasError: ErrorState = null;
/** state carregarMaisComandasAbertasStatus — status of the next open-command page query; source carregarMaisComandasAbertas.status */
@property({ attribute: false }) carregarMaisComandasAbertasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMaisComandasAbertasError — error from the next open-command page query; source carregarMaisComandasAbertas.error */
@property({ attribute: false }) carregarMaisComandasAbertasError: ErrorState = null;
/** state obterComandaParaFechamentoStatus — status of the selected-command query; source obterComandaParaFechamento.status */
@property({ attribute: false }) obterComandaParaFechamentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state obterComandaParaFechamentoError — error from the selected-command query; source obterComandaParaFechamento.error */
@property({ attribute: false }) obterComandaParaFechamentoError: ErrorState = null;
/** state fecharComandaPagaStatus — status of the close-command action; source fecharComandaPaga.status */
@property({ attribute: false }) fecharComandaPagaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state fecharComandaPagaError — error from the close-command action; source fecharComandaPaga.error */
@property({ attribute: false }) fecharComandaPagaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.fechamento.${member}`, value);
if (member === 'selectedComanda' || member === 'number' || member === 'mesaCode' || member === 'page') {
try {
const stored = value === null ? null : String(value);
if (stored === null) {
localStorage.removeItem(`comandaRestaurante.fechamento.${member === 'selectedComanda' ? 'comandaId' : member}`);
} else {
localStorage.setItem(`comandaRestaurante.fechamento.${member === 'selectedComanda' ? 'comandaId' : member}`, stored);
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
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) {
const value = getState(key);
if (value !== undefined) {
this.assignState(key, value);
}
}
subscribe(STATE_KEYS, this);
this.applyEntryParams();
void this.carregarFechamento();
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
const comandaId = this.readParam(params, 'comandaId', 'string');
const id = this.readParam(params, 'id', 'string');
const number = this.readParam(params, 'number', 'number');
const mesaCode = this.readParam(params, 'mesaCode', 'string');
const page = this.readParam(params, 'page', 'number');
this.publish('selectedComanda', (comandaId ?? id) as string | null);
this.publish('number', number as number | null);
this.publish('mesaCode', mesaCode as string | null);
this.publish('page', page as number | null);
}
private readParam(params: URLSearchParams, name: string, type: 'string' | 'number'): string | number | null {
let raw = params.get(name);
if (raw === null) {
try {
raw = localStorage.getItem(`comandaRestaurante.fechamento.${name}`);
} catch {
raw = null;
}
}
if (raw === null || raw === '') {
return null;
}
if (type === 'number') {
const parsed = Number(raw);
return Number.isFinite(parsed) ? parsed : null;
}
return raw;
}
private error(code: string, details?: unknown): ErrorState {
return { code, message: '', details };
}
private async runQuery<R extends keyof FechamentoContracts>(request: R, input: Input<R>, status: StatusMember, error: ErrorMember): Promise<Output<R> | null> {
if (this[status] === 'loading') {
return null;
}
this.publish(status, 'loading' as this[typeof status]);
this.publish(error, null as this[typeof error]);
try {
const response = await execBff<Output<R>>(String(request), input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish(error, response.error as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
return null;
}
this.publish(status, 'success' as this[typeof status]);
return response.data;
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'UnknownError';
this.publish(error, this.error('client.unexpected', { name }) as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
return null;
}
}
/** function carregarFechamento — loads open commands and an optional contextual closing; redraws openComandas by replacement and comanda by replacement; takes no arguments */
public async carregarFechamento(): Promise<void> {
this.publish('pageStatus', 'loading');
const input: Input<'comandaRestaurante.fechamento.carregarFechamento'> = {
page: this.page ?? 1,
pageSize: PAGE_SIZE,
...(this.selectedComanda !== null && this.selectedComanda !== '' ? { comandaId: this.selectedComanda } : {}),
...(this.number !== null ? { number: this.number } : {}),
...(this.mesaCode !== null && this.mesaCode !== '' ? { mesaCode: this.mesaCode } : {})
};
const output = await this.runQuery('comandaRestaurante.fechamento.carregarFechamento', input, 'carregarFechamentoStatus', 'carregarFechamentoError');
if (!output) {
this.publish('pageStatus', 'error');
return;
}
this.publish('openComandas', { ...output.openComandas, items: [...output.openComandas.items] });
if (output.selectedComanda) {
this.publish('comanda', output.selectedComanda);
}
this.publish('pageStatus', output.openComandas.items.length === 0 ? 'empty' : 'success');
}
/** function buscarComandasAbertas — replaces the locating list with commands matching the number or table filters; redraws openComandas by replacement; takes number and mesaCode filter values */
public async buscarComandasAbertas(number: number | null = this.number, mesaCode: string | null = this.mesaCode): Promise<void> {
this.publish('number', number);
this.publish('mesaCode', mesaCode);
this.publish('page', 1);
const input: Input<'comandaRestaurante.fechamento.buscarComandasAbertas'> = { page: 1, pageSize: PAGE_SIZE, ...(number !== null ? { number } : {}), ...(mesaCode !== null && mesaCode !== '' ? { mesaCode } : {}) };
const output = await this.runQuery('comandaRestaurante.fechamento.buscarComandasAbertas', input, 'buscarComandasAbertasStatus', 'buscarComandasAbertasError');
if (!output) {
return;
}
this.publish('openComandas', { ...output.openComandas, items: [...output.openComandas.items] });
}
/** function carregarMaisComandasAbertas — loads the next locating window without reloading displayed summaries; redraws openComandas.items by append; takes no arguments */
public async carregarMaisComandasAbertas(): Promise<void> {
if (!this.openComandas.hasMore) {
return;
}
const input: Input<'comandaRestaurante.fechamento.carregarMaisComandasAbertas'> = { page: this.openComandas.page + 1, pageSize: this.openComandas.pageSize, ...(this.number !== null ? { number: this.number } : {}), ...(this.mesaCode !== null && this.mesaCode !== '' ? { mesaCode: this.mesaCode } : {}) };
const output = await this.runQuery('comandaRestaurante.fechamento.carregarMaisComandasAbertas', input, 'carregarMaisComandasAbertasStatus', 'carregarMaisComandasAbertasError');
if (!output) {
return;
}
this.publish('openComandas', { ...output.openComandas, items: [...this.openComandas.items, ...output.openComandas.items] });
}
/** function obterComandaParaFechamento — obtains the selected command composed for review, payment, and closing; redraws comanda by replacement; takes no arguments */
public async obterComandaParaFechamento(): Promise<void> {
if (this.selectedComanda === null || this.selectedComanda === '') {
this.publish('obterComandaParaFechamentoError', this.error('client.selectionInvalid'));
this.publish('obterComandaParaFechamentoStatus', 'error');
return;
}
const input: Input<'comandaRestaurante.fechamento.obterComandaParaFechamento'> = { id: this.selectedComanda };
const output = await this.runQuery('comandaRestaurante.fechamento.obterComandaParaFechamento', input, 'obterComandaParaFechamentoStatus', 'obterComandaParaFechamentoError');
if (!output) {
return;
}
this.publish('comanda', output.comanda);
this.publish('fecharComandaPagaDraft', { id: output.comanda.id, version: output.comanda.version, details: { discountAmount: output.comanda.details.details.discountAmount ?? null, paymentMethod: output.comanda.details.details.paymentMethod ?? null } });
}
/** select — selects a command identifier, clears it with null, and loads its composed record for review; redraws selectedComanda and comanda by replacement; takes the command id or null */
public selectComandaReview(id: string | null): void {
this.publish('selectedComanda', id);
if (id === null || id === '') {
this.publish('comanda', null);
return;
}
void this.obterComandaParaFechamento();
}
/** draft — sets the payment and discount draft used by the close command; redraws fecharComandaPagaDraft by replacement; takes the editable payment draft */
public setFecharComandaPaga(value: FecharComandaPagaDraft): void {
this.publish('fecharComandaPagaDraft', { ...value, details: { ...value.details } });
}
/** function fecharComandaPaga — records payment, closes the command, and confirms table release; redraws comanda by upsert; takes no arguments and submits the payment form draft */
public async fecharComandaPaga(): Promise<void> {
const draft = this.fecharComandaPagaDraft;
const missing: string[] = [];
if (draft.id === null || draft.id === '') {
missing.push('fecharComandaPagaDraft.id');
}
if (draft.version === null) {
missing.push('fecharComandaPagaDraft.version');
}
if (draft.details.paymentMethod === null) {
missing.push('fecharComandaPagaDraft.details.paymentMethod');
}
if (missing.length > 0) {
this.publish('fecharComandaPagaError', this.error('client.requiredMissing', { stateKeys: missing }));
this.publish('fecharComandaPagaStatus', 'error');
return;
}
const input: Input<'comandaRestaurante.fechamento.fecharComandaPaga'> = { id: draft.id as string, version: draft.version as number, details: { paymentMethod: draft.details.paymentMethod as 'cash' | 'debitCard' | 'creditCard' | 'pix', ...(draft.details.discountAmount !== null && draft.details.discountAmount !== '' ? { discountAmount: draft.details.discountAmount } : {}) } };
this.publish('fecharComandaPagaStatus', 'loading');
this.publish('fecharComandaPagaError', null);
try {
const response = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.fechamento.fecharComandaPaga'>>('comandaRestaurante.fechamento.fecharComandaPaga', input, { mode: 'blocking', signal }));
if (response === undefined) {
this.publish('fecharComandaPagaError', this.error('client.unexpected', { name: 'aborted' }));
this.publish('fecharComandaPagaStatus', 'error');
return;
}
if (!response.ok || !response.data) {
this.publish('fecharComandaPagaError', response.error as ErrorState);
this.publish('fecharComandaPagaStatus', 'error');
return;
}
this.publish('comanda', response.data.comanda);
this.publish('fecharComandaPagaDraft', emptyFecharComandaPagaDraft());
this.publish('fecharComandaPagaStatus', 'success');
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'UnknownError';
this.publish('fecharComandaPagaError', this.error('client.unexpected', { name }));
this.publish('fecharComandaPagaStatus', 'error');
}
}
/** Sets the visible page scene; redraws scenary by replacement; takes the scene identifier */
public setScenario(value: string): void {
this.publish('scenary', value);
}
}
