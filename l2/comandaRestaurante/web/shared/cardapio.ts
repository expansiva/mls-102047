/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/cardapio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { CardapioContracts, ItemCardapioResumo, ItemCardapioEdicao } from '/_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.js';
export type { CardapioContracts, ItemCardapioResumo, ItemCardapioEdicao } from '/_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type CadastrarItemCardapioDraft = { name: string | null; details: { precoVigente: string | null } };
export type AtualizarItemCardapioDraft = { id: string | null; version: number | null; name: string | null; details: { precoVigente: string | null } };
type Input<R extends keyof CardapioContracts> = CardapioContracts[R]['input'];
type Output<R extends keyof CardapioContracts> = CardapioContracts[R]['output'];
type StateMember = 'pagina' | 'item' | 'selectedItemCardapio' | 'cadastrarItemCardapioDraft' | 'atualizarItemCardapioDraft' | 'pageStatus' | 'carregarItensCardapioStatus' | 'carregarItensCardapioError' | 'carregarMaisItensCardapioStatus' | 'carregarMaisItensCardapioError' | 'obterItemCardapioStatus' | 'obterItemCardapioError' | 'cadastrarItemCardapioStatus' | 'cadastrarItemCardapioError' | 'atualizarItemCardapioStatus' | 'atualizarItemCardapioError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.cardapio.pagina': 'pagina',
'ui.comandaRestaurante.cardapio.item': 'item',
'ui.comandaRestaurante.cardapio.selectedItemCardapio': 'selectedItemCardapio',
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
const emptyCadastrar = (): CadastrarItemCardapioDraft => ({ name: null, details: { precoVigente: null } });
const emptyAtualizar = (): AtualizarItemCardapioDraft => ({ id: null, version: null, name: null, details: { precoVigente: null } });
export class ComandaRestauranteCardapioShared extends StateLitElement {
/** state pagina — Dados de um item exibidos no catálogo do cardápio; source carregarItensCardapio.pagina; organism listaItensCardapio */
@property({ attribute: false }) pagina: Output<'comandaRestaurante.cardapio.carregarItensCardapio'>['pagina'] | null = null;
/** state item — Dados persistidos do item selecionado para preenchimento e manutenção do formulário; source obterItemCardapio.item; organism formularioItemCardapio */
@property({ attribute: false }) item: ItemCardapioEdicao | null = null;
/** state selectedItemCardapio — Dados persistidos do item selecionado para preenchimento e manutenção do formulário; source entry.params.itemCardapioId; organism formularioItemCardapio; persisted */
@property({ attribute: false }) selectedItemCardapio: string | null = null;
/** state cadastrarItemCardapioDraft — The values entered for creating a menu item; source cadastrarItemCardapio.input; organism formularioItemCardapio */
@property({ attribute: false }) cadastrarItemCardapioDraft: CadastrarItemCardapioDraft = emptyCadastrar();
/** state atualizarItemCardapioDraft — The values entered for updating a menu item; source atualizarItemCardapio.input; organism formularioItemCardapio */
@property({ attribute: false }) atualizarItemCardapioDraft: AtualizarItemCardapioDraft = emptyAtualizar();
/** state pageStatus — The visible loading state of the page; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarItensCardapioStatus — The status of the first catalog page request; source carregarItensCardapio.status */
@property({ attribute: false }) carregarItensCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarItensCardapioError — The error of the first catalog page request; source carregarItensCardapio.error */
@property({ attribute: false }) carregarItensCardapioError: ErrorState = null;
/** state carregarMaisItensCardapioStatus — The status of the next catalog page request; source carregarMaisItensCardapio.status */
@property({ attribute: false }) carregarMaisItensCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMaisItensCardapioError — The error of the next catalog page request; source carregarMaisItensCardapio.error */
@property({ attribute: false }) carregarMaisItensCardapioError: ErrorState = null;
/** state obterItemCardapioStatus — The status of the selected item request; source obterItemCardapio.status */
@property({ attribute: false }) obterItemCardapioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state obterItemCardapioError — The error of the selected item request; source obterItemCardapio.error */
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
private requestedPage: number | null = null;
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.cardapio.${member}`, value);
if (member === 'selectedItemCardapio') {
try {
if (value === null) {
localStorage.removeItem('comandaRestaurante.cardapio.itemCardapioId');
} else {
localStorage.setItem('comandaRestaurante.cardapio.itemCardapioId', String(value));
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
private resetVisit(): void {
this.publish('selectedItemCardapio', null);
this.publish('cadastrarItemCardapioDraft', emptyCadastrar());
this.publish('atualizarItemCardapioDraft', emptyAtualizar());
this.publish('pageStatus', 'idle');
this.publish('carregarItensCardapioStatus', 'idle');
this.publish('carregarItensCardapioError', null);
this.publish('carregarMaisItensCardapioStatus', 'idle');
this.publish('carregarMaisItensCardapioError', null);
this.publish('obterItemCardapioStatus', 'idle');
this.publish('obterItemCardapioError', null);
this.publish('cadastrarItemCardapioStatus', 'idle');
this.publish('cadastrarItemCardapioError', null);
this.publish('atualizarItemCardapioStatus', 'idle');
this.publish('atualizarItemCardapioError', null);
this.publish('scenary', '');
}
public connectedCallback(): void {
super.connectedCallback();
const dataKeys = ['ui.comandaRestaurante.cardapio.pagina', 'ui.comandaRestaurante.cardapio.item'];
for (const key of dataKeys) {
const value = getState(key);
if (value !== undefined) {
this.assignState(key, value);
}
}
this.resetVisit();
subscribe(STATE_KEYS, this);
const params = new URLSearchParams(window.location.search);
const rawPage = params.get('page') ?? this.readStored('page');
const page = rawPage === null ? null : Number(rawPage);
this.requestedPage = page !== null && Number.isFinite(page) ? page : null;
const rawItem = params.get('itemCardapioId') ?? this.readStored('itemCardapioId');
this.selectItemCardapio(rawItem);
void this.carregarItensCardapio();
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
private readStored(name: string): string | null {
try {
return localStorage.getItem(`comandaRestaurante.cardapio.${name}`);
} catch {
return null;
}
}
private unexpected(error: unknown): ErrorState {
const name = error instanceof Error ? error.name : 'Error';
return { code: 'client.unexpected', message: '', details: { name } };
}
private required(keys: string[]): ErrorState {
return { code: 'client.requiredMissing', message: '', details: { stateKeys: keys } };
}
/** function setScenario — Sets the visible scene of the page; redraws scenary by replacement; its argument is the scene identifier. */
public setScenario(value: string): void {
this.publish('scenary', value);
}
/** draft — Replaces the create-item form draft; redraws cadastrarItemCardapioDraft by replacement; its argument contains the name and current price. */
public setCadastrarItemCardapioDraft(value: CadastrarItemCardapioDraft): void {
this.publish('cadastrarItemCardapioDraft', value);
}
/** draft — Replaces the update-item form draft; redraws atualizarItemCardapioDraft by replacement; its argument contains the item identity, version, name and current price. */
public setAtualizarItemCardapioDraft(value: AtualizarItemCardapioDraft): void {
this.publish('atualizarItemCardapioDraft', value);
}
/** select — Selects the menu item by id or clears the selection; redraws selectedItemCardapio by replacement and loads item for formularioItemCardapio; its argument is the ItemCardapio id. */
public selectItemCardapio(id: string | null): void {
this.publish('selectedItemCardapio', id);
if (id !== null && id !== '') {
void this.obterItemCardapio(id);
}
}
/** Returns the selected item record for formularioItemCardapio. */
public get formularioItemCardapio(): ItemCardapioEdicao | null {
return this.item;
}
/** function carregarItensCardapio — Loads the first catalog page for the cashier; redraws pagina by replacement; no arguments. */
public async carregarItensCardapio(): Promise<void> {
if (this.carregarItensCardapioStatus === 'loading') {
return;
}
this.publish('pageStatus', 'loading');
this.publish('carregarItensCardapioStatus', 'loading');
this.publish('carregarItensCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.carregarItensCardapio'> = { page: this.pageNumber(), pageSize: 20 };
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
} catch (error) {
this.publish('carregarItensCardapioStatus', 'error');
this.publish('carregarItensCardapioError', this.unexpected(error));
this.publish('pageStatus', 'error');
}
}
/** function carregarMaisItensCardapio — Loads the next catalog page; redraws pagina.items by append and pagina paging metadata; no arguments. */
public async carregarMaisItensCardapio(): Promise<void> {
if (this.carregarMaisItensCardapioStatus === 'loading' || !this.pagina || !this.pagina.hasMore) {
return;
}
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
} catch (error) {
this.publish('carregarMaisItensCardapioStatus', 'error');
this.publish('carregarMaisItensCardapioError', this.unexpected(error));
}
}
/** function obterItemCardapio — Obtains the selected item for the maintenance form; redraws item by replacement; its argument is the selected ItemCardapio id. */
public async obterItemCardapio(id: string): Promise<void> {
if (this.obterItemCardapioStatus === 'loading') {
return;
}
this.publish('obterItemCardapioStatus', 'loading');
this.publish('obterItemCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.obterItemCardapio'> = { id };
try {
const response = await execBff<Output<'comandaRestaurante.cardapio.obterItemCardapio'>>('comandaRestaurante.cardapio.obterItemCardapio', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('obterItemCardapioStatus', 'error');
this.publish('obterItemCardapioError', response.error);
return;
}
this.publish('item', response.data.item);
this.publish('obterItemCardapioStatus', 'success');
} catch (error) {
this.publish('obterItemCardapioStatus', 'error');
this.publish('obterItemCardapioError', this.unexpected(error));
}
}
private pageNumber(): number {
return this.pageValue() ?? 1;
}
private pageValue(): number | null {
return this.requestedPage;
}
/** function cadastrarItemCardapio — Creates a menu item for operational use; redraws item by replacement and reloads pagina by replacement; no arguments because values come from cadastrarItemCardapioDraft. */
public async cadastrarItemCardapio(): Promise<void> {
const draft = this.cadastrarItemCardapioDraft;
if (!draft.name || !draft.details.precoVigente) {
const error = this.required(['cadastrarItemCardapioDraft.name', 'cadastrarItemCardapioDraft.details.precoVigente']);
this.publish('cadastrarItemCardapioError', error);
this.publish('cadastrarItemCardapioStatus', 'error');
return;
}
this.publish('cadastrarItemCardapioStatus', 'loading');
this.publish('cadastrarItemCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.cadastrarItemCardapio'> = { name: draft.name, details: { details: { precoVigente: draft.details.precoVigente } } };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.cardapio.cadastrarItemCardapio'>>('comandaRestaurante.cardapio.cadastrarItemCardapio', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('cadastrarItemCardapioStatus', 'error');
this.publish('cadastrarItemCardapioError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
return;
}
if (!result.ok || !result.data) {
this.publish('cadastrarItemCardapioStatus', 'error');
this.publish('cadastrarItemCardapioError', result.error);
return;
}
this.publish('item', result.data.item);
this.publish('cadastrarItemCardapioStatus', 'success');
this.publish('cadastrarItemCardapioDraft', emptyCadastrar());
await this.carregarItensCardapio();
}
/** function atualizarItemCardapio — Updates the selected menu item with optimistic concurrency; redraws item by replacement and reloads pagina by replacement; no arguments because values come from atualizarItemCardapioDraft. */
public async atualizarItemCardapio(): Promise<void> {
const draft = this.atualizarItemCardapioDraft;
if (!draft.id || draft.version === null || !draft.name || !draft.details.precoVigente) {
const error = this.required(['atualizarItemCardapioDraft.id', 'atualizarItemCardapioDraft.version', 'atualizarItemCardapioDraft.name', 'atualizarItemCardapioDraft.details.precoVigente']);
this.publish('atualizarItemCardapioError', error);
this.publish('atualizarItemCardapioStatus', 'error');
return;
}
this.publish('atualizarItemCardapioStatus', 'loading');
this.publish('atualizarItemCardapioError', null);
const input: Input<'comandaRestaurante.cardapio.atualizarItemCardapio'> = { id: draft.id, version: draft.version, name: draft.name, details: { details: { precoVigente: draft.details.precoVigente } } };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.cardapio.atualizarItemCardapio'>>('comandaRestaurante.cardapio.atualizarItemCardapio', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('atualizarItemCardapioStatus', 'error');
this.publish('atualizarItemCardapioError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
return;
}
if (!result.ok || !result.data) {
this.publish('atualizarItemCardapioStatus', 'error');
this.publish('atualizarItemCardapioError', result.error);
return;
}
this.publish('item', result.data.item);
this.publish('atualizarItemCardapioStatus', 'success');
this.publish('atualizarItemCardapioDraft', emptyAtualizar());
await this.carregarItensCardapio();
}
}
