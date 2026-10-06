/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/cardapio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { CardapioContracts, DetalhesItemCardapio, ItemCardapioResumo, ItemCardapioEdicao } from '/_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.js';
export type { CardapioContracts, DetalhesItemCardapio, ItemCardapioResumo, ItemCardapioEdicao } from '/_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type CadastrarItemCardapioDraft = { name: string | null; details: { precoVigente: string | null } };
export type AtualizarItemCardapioDraft = { id: string | null; version: number | null; name: string | null; details: { precoVigente: string | null } };
type Input<R extends keyof CardapioContracts> = CardapioContracts[R]['input'];
type Output<R extends keyof CardapioContracts> = CardapioContracts[R]['output'];
type StateMember = 'pagina' | 'item' | 'selectedItemCardapio' | 'page' | 'cadastrarItemCardapioDraft' | 'atualizarItemCardapioDraft' | 'pageStatus' | 'carregarItensCardapioStatus' | 'carregarItensCardapioError' | 'carregarMaisItensCardapioStatus' | 'carregarMaisItensCardapioError' | 'obterItemCardapioStatus' | 'obterItemCardapioError' | 'cadastrarItemCardapioStatus' | 'cadastrarItemCardapioError' | 'atualizarItemCardapioStatus' | 'atualizarItemCardapioError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.cardapio.pagina': 'pagina',
'ui.comandaRestaurante.cardapio.item': 'item',
'ui.comandaRestaurante.cardapio.selectedItemCardapio': 'selectedItemCardapio',
'ui.comandaRestaurante.cardapio.page': 'page',
'ui.comandaRestaurante.cardapio.cadastrarItemCardapioDraft': 'cadastrarItemCardapioDraft',
'ui.comandaRestaurante.cardapio.atualizarItemCardapioDraft': 'atualizarItemCardapioDraft',
'ui.comandaRestaurante.cardapio.pageStatus': 'pageStatus',
'ui.comandaRestaurante.cardapio.carregarItensCardapioStatus': 'carregarItensCardapioStatus',
'ui.comandaRestaurante.cardapio.carregarItensCardapioError': 'carregarItensCardapioError',
'ui.comandaRestaurante.cardapio.carregarMaisItensCardapioStatus': 'carregarMaisItensCardapioStatus',
'ui.comandaRestaurante.cardapio.carregarMaisItensCardapioError': 'carregarMaisItensCardapioError',
'ui.comandaRestaurante.cardapio.obterItemCardapioStatus': 'obterItemCardapioStatus',
'ui.comandaRestaurante.cardapio.obterItemCardapioError': 'obterItemCardapioError',
'ui.comandaRestaurante.cardapio.cadastrarItemCardapioStatus': 'cadastrarItemCardapioStatus',
'ui.comandaRestaurante.cardapio.cadastrarItemCardapioError': 'cadastrarItemCardapioError',
'ui.comandaRestaurante.cardapio.atualizarItemCardapioStatus': 'atualizarItemCardapioStatus',
'ui.comandaRestaurante.cardapio.atualizarItemCardapioError': 'atualizarItemCardapioError',
'ui.comandaRestaurante.cardapio.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const EMPTY_CADASTRO = (): CadastrarItemCardapioDraft => ({ name: null, details: { precoVigente: null } });
const EMPTY_ATUALIZACAO = (): AtualizarItemCardapioDraft => ({ id: null, version: null, name: null, details: { precoVigente: null } });
export class ComandaRestauranteCardapioShared extends StateLitElement {
/** state pagina — Dados de um item exibidos no catálogo do cardápio; source carregarItensCardapio.pagina; organism listaItensCardapio */
@property({ attribute: false }) pagina: Output<'comandaRestaurante.cardapio.carregarItensCardapio'>['pagina'] | null = null;
/** state item — Dados persistidos do item selecionado para preenchimento e manutenção do formulário; source obterItemCardapio.item; organism formularioItemCardapio */
@property({ attribute: false }) item: ItemCardapioEdicao | null = null;
/** state selectedItemCardapio — Dados persistidos do item selecionado para preenchimento e manutenção do formulário; source entry.params.itemCardapioId; organism formularioItemCardapio; persisted */
@property({ attribute: false }) selectedItemCardapio: string | null = null;
/** state page — The requested catalog page; source entry.params.page; organism listaItensCardapio; persisted */
@property({ attribute: false }) page: number | null = null;
/** state cadastrarItemCardapioDraft — The draft submitted to create a catalog item; source cadastrarItemCardapio.input; organism formularioItemCardapio */
@property({ attribute: false }) cadastrarItemCardapioDraft: CadastrarItemCardapioDraft = EMPTY_CADASTRO();
/** state atualizarItemCardapioDraft — The draft submitted to update a catalog item; source atualizarItemCardapio.input; organism formularioItemCardapio */
@property({ attribute: false }) atualizarItemCardapioDraft: AtualizarItemCardapioDraft = EMPTY_ATUALIZACAO();
/** state pageStatus — The overall loading state of the page; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarItensCardapioStatus — The status of the initial catalog query; source carregarItensCardapio.status */
@property({ attribute: false }) carregarItensCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarItensCardapioError — The error of the initial catalog query; source carregarItensCardapio.error */
@property({ attribute: false }) carregarItensCardapioError: ErrorState = null;
/** state carregarMaisItensCardapioStatus — The status of the next catalog page query; source carregarMaisItensCardapio.status */
@property({ attribute: false }) carregarMaisItensCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMaisItensCardapioError — The error of the next catalog page query; source carregarMaisItensCardapio.error */
@property({ attribute: false }) carregarMaisItensCardapioError: ErrorState = null;
/** state obterItemCardapioStatus — The status of the selected item query; source obterItemCardapio.status */
@property({ attribute: false }) obterItemCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state obterItemCardapioError — The error of the selected item query; source obterItemCardapio.error */
@property({ attribute: false }) obterItemCardapioError: ErrorState = null;
/** state cadastrarItemCardapioStatus — The status of the create command; source cadastrarItemCardapio.status */
@property({ attribute: false }) cadastrarItemCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state cadastrarItemCardapioError — The error of the create command; source cadastrarItemCardapio.error */
@property({ attribute: false }) cadastrarItemCardapioError: ErrorState = null;
/** state atualizarItemCardapioStatus — The status of the update command; source atualizarItemCardapio.status */
@property({ attribute: false }) atualizarItemCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state atualizarItemCardapioError — The error of the update command; source atualizarItemCardapio.error */
@property({ attribute: false }) atualizarItemCardapioError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.cardapio.${member}`, value);
if (member === 'page' || member === 'selectedItemCardapio') {
try {
if (value === null) {
localStorage.removeItem(`comandaRestaurante.cardapio.${member}`);
} else {
localStorage.setItem(`comandaRestaurante.cardapio.${member}`, String(value));
}
} catch {
}
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) (this as unknown as Record<string, unknown>)[member] = value;
}
private error(code: string, details?: unknown): ErrorState {
return { code, message: '', ...(details === undefined ? {} : { details }) };
}
private async queryInitial(): Promise<void> {
if (this.carregarItensCardapioStatus === 'loading') return;
this.publish('pageStatus', 'loading');
this.publish('carregarItensCardapioStatus', 'loading');
this.publish('carregarItensCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.carregarItensCardapio'> = { page: this.page !== null && this.page > 0 ? this.page : 1, pageSize: 20 };
try {
const response = await execBff<Output<'comandaRestaurante.cardapio.carregarItensCardapio'>>('comandaRestaurante.cardapio.carregarItensCardapio', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarItensCardapioStatus', 'error');
this.publish('carregarItensCardapioError', response.error);
this.publish('pageStatus', 'error');
return;
}
this.publish('pagina', response.data.pagina);
this.publish('carregarItensCardapioStatus', 'success');
this.publish('pageStatus', response.data.pagina.items.length === 0 ? 'empty' : 'success');
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'Error';
const failure = this.error('client.unexpected', { name });
this.publish('carregarItensCardapioStatus', 'error');
this.publish('carregarItensCardapioError', failure);
this.publish('pageStatus', 'error');
}
}
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) {
const value = getState(key);
if (value !== undefined) this.assignState(key, value);
}
subscribe(STATE_KEYS, this);
this.applyEntryParams();
void this.carregarItensCardapio();
if (this.selectedItemCardapio !== null) void this.obterItemCardapio(this.selectedItemCardapio);
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
if (value === undefined) return;
this.assignState(key, value);
this.requestUpdate();
}
private applyEntryParams(): void {
const params = new URLSearchParams(window.location.search);
for (const name of ['page', 'itemCardapioId'] as const) {
let raw = params.get(name);
if (raw === null) {
try {
raw = localStorage.getItem(`comandaRestaurante.cardapio.${name}`);
} catch {
raw = null;
}
}
if (name === 'page') {
const parsed = raw === null ? null : Number(raw);
this.publish('page', parsed !== null && Number.isFinite(parsed) ? parsed : null);
} else {
this.publish('selectedItemCardapio', raw);
}
}
}
/** function carregarItensCardapio — Loads the first catalog page when the page opens; redraws pagina by replacement; no arguments */
public async carregarItensCardapio(): Promise<void> {
await this.queryInitial();
}
/** function carregarMaisItensCardapio — Loads the next catalog page; redraws pagina by appending its items and retaining pagination; no arguments */
public async carregarMaisItensCardapio(): Promise<void> {
if (!this.pagina || !this.pagina.hasMore || this.carregarMaisItensCardapioStatus === 'loading') return;
this.publish('carregarMaisItensCardapioStatus', 'loading');
this.publish('carregarMaisItensCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.carregarMaisItensCardapio'> = { page: this.pagina.page + 1, pageSize: this.pagina.pageSize };
try {
const response = await execBff<Output<'comandaRestaurante.cardapio.carregarMaisItensCardapio'>>('comandaRestaurante.cardapio.carregarMaisItensCardapio', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarMaisItensCardapioStatus', 'error');
this.publish('carregarMaisItensCardapioError', response.error);
return;
}
const next = response.data.pagina;
this.publish('pagina', { ...next, items: [...this.pagina.items, ...next.items] });
this.publish('carregarMaisItensCardapioStatus', 'success');
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'Error';
this.publish('carregarMaisItensCardapioStatus', 'error');
this.publish('carregarMaisItensCardapioError', this.error('client.unexpected', { name }));
}
}
/** function obterItemCardapio — Obtains the selected item for the maintenance form; redraws item by replacement; id is the selected item identifier */
public async obterItemCardapio(id: string): Promise<void> {
if (this.obterItemCardapioStatus === 'loading') return;
this.publish('selectedItemCardapio', id);
this.publish('obterItemCardapioStatus', 'loading');
this.publish('obterItemCardapioError', null);
try {
const response = await execBff<Output<'comandaRestaurante.cardapio.obterItemCardapio'>>('comandaRestaurante.cardapio.obterItemCardapio', { id } satisfies Input<'comandaRestaurante.cardapio.obterItemCardapio'>, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('obterItemCardapioStatus', 'error');
this.publish('obterItemCardapioError', response.error ?? this.error('client.selectionInvalid'));
return;
}
this.publish('item', response.data.item);
this.publish('obterItemCardapioStatus', 'success');
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'Error';
this.publish('obterItemCardapioStatus', 'error');
this.publish('obterItemCardapioError', this.error('client.unexpected', { name }));
}
}
/** select — Selects an item id or clears the current selection, then obtains its persisted record */
public selectItemCardapio(id: string | null): void {
this.publish('selectedItemCardapio', id);
if (id === null) {
this.publish('item', null);
return;
}
void this.obterItemCardapio(id);
}
/** draft — Replaces the create-item form draft */
public setCadastrarItemCardapioDraft(value: CadastrarItemCardapioDraft): void {
this.publish('cadastrarItemCardapioDraft', value);
}
/** draft — Replaces the update-item form draft */
public setAtualizarItemCardapioDraft(value: AtualizarItemCardapioDraft): void {
this.publish('atualizarItemCardapioDraft', value);
}
/** function cadastrarItemCardapio — Creates a catalog item; redraws item by replacement and reloads pagina */
public async cadastrarItemCardapio(): Promise<void> {
const draft = this.cadastrarItemCardapioDraft;
if (draft.name === null || draft.name === '' || draft.details.precoVigente === null || draft.details.precoVigente === '') {
this.publish('cadastrarItemCardapioError', this.error('client.requiredMissing', { stateKeys: ['cadastrarItemCardapioDraft.name', 'cadastrarItemCardapioDraft.details.precoVigente'] }));
this.publish('cadastrarItemCardapioStatus', 'error');
return;
}
this.publish('cadastrarItemCardapioStatus', 'loading');
this.publish('cadastrarItemCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.cadastrarItemCardapio'> = { name: draft.name, details: { details: { precoVigente: draft.details.precoVigente } } };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.cardapio.cadastrarItemCardapio'>>('comandaRestaurante.cardapio.cadastrarItemCardapio', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('cadastrarItemCardapioStatus', 'error');
this.publish('cadastrarItemCardapioError', this.error('client.unexpected', { name: 'aborted' }));
return;
}
if (!result.ok || !result.data) {
this.publish('cadastrarItemCardapioStatus', 'error');
this.publish('cadastrarItemCardapioError', result.error);
return;
}
this.publish('item', result.data.item);
this.publish('cadastrarItemCardapioDraft', EMPTY_CADASTRO());
this.publish('cadastrarItemCardapioStatus', 'success');
await this.carregarItensCardapio();
}
/** function atualizarItemCardapio — Updates the selected catalog item with optimistic form context; redraws item by replacement and reloads pagina */
public async atualizarItemCardapio(): Promise<void> {
const draft = this.atualizarItemCardapioDraft;
if (draft.id === null || draft.version === null || draft.name === null || draft.name === '' || draft.details.precoVigente === null || draft.details.precoVigente === '') {
this.publish('atualizarItemCardapioError', this.error('client.requiredMissing', { stateKeys: ['atualizarItemCardapioDraft.id', 'atualizarItemCardapioDraft.version', 'atualizarItemCardapioDraft.name', 'atualizarItemCardapioDraft.details.precoVigente'] }));
this.publish('atualizarItemCardapioStatus', 'error');
return;
}
this.publish('atualizarItemCardapioStatus', 'loading');
this.publish('atualizarItemCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.atualizarItemCardapio'> = { id: draft.id, version: draft.version, name: draft.name, details: { details: { precoVigente: draft.details.precoVigente } } };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.cardapio.atualizarItemCardapio'>>('comandaRestaurante.cardapio.atualizarItemCardapio', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('atualizarItemCardapioStatus', 'error');
this.publish('atualizarItemCardapioError', this.error('client.unexpected', { name: 'aborted' }));
return;
}
if (!result.ok || !result.data) {
this.publish('atualizarItemCardapioStatus', 'error');
this.publish('atualizarItemCardapioError', result.error);
return;
}
this.publish('item', result.data.item);
this.publish('atualizarItemCardapioDraft', EMPTY_ATUALIZACAO());
this.publish('atualizarItemCardapioStatus', 'success');
await this.carregarItensCardapio();
}
/** Sets the visible page scene */
public setScenario(value: string): void {
this.publish('scenary', value);
}
}
