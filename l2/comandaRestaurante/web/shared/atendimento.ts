/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/atendimento.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { AtendimentoContracts, ContextoAtendimento, ComandaAtendimento } from '/_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.js';
export type { AtendimentoContracts, ContextoAtendimento, ComandaAtendimento } from '/_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.js';
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type LancarItemDraft = { itemCardapioId: string | null; details: { quantidade: number | null; observacao: string | null } };
type Input<R extends keyof AtendimentoContracts> = AtendimentoContracts[R]['input'];
type Output<R extends keyof AtendimentoContracts> = AtendimentoContracts[R]['output'];
type StateMember = 'contextoAtendimento' | 'comanda' | 'selectedComanda' | 'page' | 'mesaTermo' | 'comandaNumero' | 'itemTermo' | 'formularioLancamento' | 'pageStatus' | 'carregarAtendimentoStatus' | 'carregarAtendimentoError' | 'atualizarLocalizacaoAtendimentoStatus' | 'atualizarLocalizacaoAtendimentoError' | 'obterComandaAtendimentoStatus' | 'obterComandaAtendimentoError' | 'abrirComandaStatus' | 'abrirComandaError' | 'lancarItemStatus' | 'lancarItemError' | 'cancelarItemStatus' | 'cancelarItemError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.atendimento.contextoAtendimento': 'contextoAtendimento',
'ui.comandaRestaurante.atendimento.comanda': 'comanda',
'ui.comandaRestaurante.atendimento.selectedComanda': 'selectedComanda',
'ui.comandaRestaurante.atendimento.page': 'page',
'ui.comandaRestaurante.atendimento.mesaTermo': 'mesaTermo',
'ui.comandaRestaurante.atendimento.comandaNumero': 'comandaNumero',
'ui.comandaRestaurante.atendimento.itemTermo': 'itemTermo',
'ui.comandaRestaurante.atendimento.formularioLancamento': 'formularioLancamento',
'ui.comandaRestaurante.atendimento.pageStatus': 'pageStatus',
'ui.comandaRestaurante.atendimento.carregarAtendimentoStatus': 'carregarAtendimentoStatus',
'ui.comandaRestaurante.atendimento.carregarAtendimentoError': 'carregarAtendimentoError',
'ui.comandaRestaurante.atendimento.atualizarLocalizacaoAtendimentoStatus': 'atualizarLocalizacaoAtendimentoStatus',
'ui.comandaRestaurante.atendimento.atualizarLocalizacaoAtendimentoError': 'atualizarLocalizacaoAtendimentoError',
'ui.comandaRestaurante.atendimento.obterComandaAtendimentoStatus': 'obterComandaAtendimentoStatus',
'ui.comandaRestaurante.atendimento.obterComandaAtendimentoError': 'obterComandaAtendimentoError',
'ui.comandaRestaurante.atendimento.abrirComandaStatus': 'abrirComandaStatus',
'ui.comandaRestaurante.atendimento.abrirComandaError': 'abrirComandaError',
'ui.comandaRestaurante.atendimento.lancarItemStatus': 'lancarItemStatus',
'ui.comandaRestaurante.atendimento.lancarItemError': 'lancarItemError',
'ui.comandaRestaurante.atendimento.cancelarItemStatus': 'cancelarItemStatus',
'ui.comandaRestaurante.atendimento.cancelarItemError': 'cancelarItemError',
'ui.comandaRestaurante.atendimento.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
export class ComandaRestauranteAtendimentoShared extends StateLitElement {
/** state contextoAtendimento — independent collections for locating the mesa, open comanda, and menu item; source carregarAtendimento.contextoAtendimento; organism lookupAtendimento */
@property({ attribute: false }) contextoAtendimento: ContextoAtendimento | null = null;
/** state comanda — the selected comanda with its mesa, lines, and calculated subtotal; source obterComandaAtendimento.comanda; organism detalheComanda */
@property({ attribute: false }) comanda: ComandaAtendimento | null = null;
/** state selectedComanda — the selected comanda identifier; source entry.params.comandaId; organism detalheComanda; persisted */
@property({ attribute: false }) selectedComanda: string | null = null;
/** state page — the current lookup page; source entry.params.page; organism lookupAtendimento; persisted */
@property({ attribute: false }) page: number | null = null;
/** state mesaTermo — the mesa code filter; source entry.params.mesaTermo; organism lookupAtendimento; persisted */
@property({ attribute: false }) mesaTermo: string | null = null;
/** state comandaNumero — the open comanda number filter; source entry.params.comandaNumero; organism lookupAtendimento; persisted */
@property({ attribute: false }) comandaNumero: number | null = null;
/** state itemTermo — the menu item name filter; source entry.params.itemTermo; organism lookupAtendimento; persisted */
@property({ attribute: false }) itemTermo: string | null = null;
/** state formularioLancamento — the menu item launch draft; source lancarItem.input; organism formularioLancamento */
@property({ attribute: false }) formularioLancamento: LancarItemDraft = this.emptyLancarItemDraft();
/** state pageStatus — the overall load status of the page; source page lifecycle */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarAtendimentoStatus — the initial lookup request status; source carregarAtendimento.status */
@property({ attribute: false }) carregarAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarAtendimentoError — the initial lookup request error; source carregarAtendimento.error */
@property({ attribute: false }) carregarAtendimentoError: ErrorState = null;
/** state atualizarLocalizacaoAtendimentoStatus — the filtered lookup request status; source atualizarLocalizacaoAtendimento.status */
@property({ attribute: false }) atualizarLocalizacaoAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state atualizarLocalizacaoAtendimentoError — the filtered lookup request error; source atualizarLocalizacaoAtendimento.error */
@property({ attribute: false }) atualizarLocalizacaoAtendimentoError: ErrorState = null;
/** state obterComandaAtendimentoStatus — the selected comanda request status; source obterComandaAtendimento.status */
@property({ attribute: false }) obterComandaAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state obterComandaAtendimentoError — the selected comanda request error; source obterComandaAtendimento.error */
@property({ attribute: false }) obterComandaAtendimentoError: ErrorState = null;
/** state abrirComandaStatus — the open comanda command status; source abrirComanda.status */
@property({ attribute: false }) abrirComandaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state abrirComandaError — the open comanda command error; source abrirComanda.error */
@property({ attribute: false }) abrirComandaError: ErrorState = null;
/** state lancarItemStatus — the item launch command status; source lancarItem.status */
@property({ attribute: false }) lancarItemStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state lancarItemError — the item launch command error; source lancarItem.error */
@property({ attribute: false }) lancarItemError: ErrorState = null;
/** state cancelarItemStatus — the item cancellation command status; source cancelarItem.status */
@property({ attribute: false }) cancelarItemStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state cancelarItemError — the item cancellation request error; source cancelarItem.error */
@property({ attribute: false }) cancelarItemError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private emptyLancarItemDraft(): LancarItemDraft {
return { itemCardapioId: null, details: { quantidade: null, observacao: null } };
}
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.atendimento.${member}`, value);
if (member === 'page' || member === 'mesaTermo' || member === 'comandaNumero' || member === 'itemTermo' || member === 'selectedComanda') {
const persist = member !== 'selectedComanda';
if (persist) {
try {
if (value === null || value === '') {
localStorage.removeItem(`comandaRestaurante.atendimento.${member}`);
} else {
localStorage.setItem(`comandaRestaurante.atendimento.${member}`, String(value));
}
} catch {
}
}
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) {
(this as unknown as Record<string, unknown>)[member] = value;
}
}
private errorFrom(value: unknown): ErrorState {
if (value && typeof value === 'object' && 'code' in value && 'message' in value) {
return value as ErrorState;
}
return { code: 'client.unexpected', message: '', details: value };
}
private requiredError(stateKeys: string[]): ErrorState {
return { code: 'client.requiredMissing', message: '', details: { stateKeys } };
}
private async loadInitial(): Promise<void> {
if (this.carregarAtendimentoStatus === 'loading') return;
this.publish('pageStatus', 'loading');
this.publish('carregarAtendimentoStatus', 'loading');
this.publish('carregarAtendimentoError', null);
const input: Input<'comandaRestaurante.atendimento.carregarAtendimento'> = { page: this.page ?? 1, pageSize: 20 };
try {
const response = await execBff<Output<'comandaRestaurante.atendimento.carregarAtendimento'>>('comandaRestaurante.atendimento.carregarAtendimento', input, { mode: 'silent' });
if (!response.ok || !response.data) {
const error = this.errorFrom(response.error);
this.publish('carregarAtendimentoError', error);
this.publish('carregarAtendimentoStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
this.publish('contextoAtendimento', response.data.contextoAtendimento);
this.publish('carregarAtendimentoStatus', 'success');
const empty = response.data.contextoAtendimento.mesasDisponiveis.items.length === 0 && response.data.contextoAtendimento.comandasAbertas.items.length === 0 && response.data.contextoAtendimento.itensCardapio.items.length === 0;
this.publish('pageStatus', empty ? 'empty' : 'success');
} catch (error) {
this.publish('carregarAtendimentoError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'UnknownError' } });
this.publish('carregarAtendimentoStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** function carregarAtendimento — loads the initial independent lookup collections; redraws contextoAtendimento by replacement; no arguments */
public carregarAtendimento(): void {
void this.loadInitial();
}
/** function atualizarLocalizacaoAtendimento — updates the independently filtered lookup collections; redraws contextoAtendimento by replacement; arguments are the mesa code, comanda number, item name, and page */
public async atualizarLocalizacaoAtendimento(mesaTermo: string | null = this.mesaTermo, comandaNumero: number | null = this.comandaNumero, itemTermo: string | null = this.itemTermo, page: number = 1): Promise<void> {
this.publish('mesaTermo', mesaTermo);
this.publish('comandaNumero', comandaNumero);
this.publish('itemTermo', itemTermo);
this.publish('page', page);
if (this.atualizarLocalizacaoAtendimentoStatus === 'loading') return;
this.publish('pageStatus', 'loading');
this.publish('atualizarLocalizacaoAtendimentoStatus', 'loading');
this.publish('atualizarLocalizacaoAtendimentoError', null);
const input: Input<'comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento'> = { page, pageSize: 20, ...(mesaTermo !== null && mesaTermo !== '' ? { mesaTermo } : {}), ...(comandaNumero !== null ? { comandaNumero } : {}), ...(itemTermo !== null && itemTermo !== '' ? { itemTermo } : {}) };
try {
const response = await execBff<Output<'comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento'>>('comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('atualizarLocalizacaoAtendimentoError', this.errorFrom(response.error));
this.publish('atualizarLocalizacaoAtendimentoStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
this.publish('contextoAtendimento', response.data.contextoAtendimento);
this.publish('atualizarLocalizacaoAtendimentoStatus', 'success');
const empty = response.data.contextoAtendimento.mesasDisponiveis.items.length === 0 && response.data.contextoAtendimento.comandasAbertas.items.length === 0 && response.data.contextoAtendimento.itensCardapio.items.length === 0;
this.publish('pageStatus', empty ? 'empty' : 'success');
} catch (error) {
this.publish('atualizarLocalizacaoAtendimentoError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'UnknownError' } });
this.publish('atualizarLocalizacaoAtendimentoStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** function obterComandaAtendimento — loads the selected comanda with its mesa, lines, and subtotal; redraws comanda by replacement; argument is the comanda identifier */
public async obterComandaAtendimento(comandaId: string = this.selectedComanda ?? ''): Promise<void> {
if (comandaId === '') return;
if (this.obterComandaAtendimentoStatus === 'loading') return;
this.publish('selectedComanda', comandaId);
this.publish('obterComandaAtendimentoStatus', 'loading');
this.publish('obterComandaAtendimentoError', null);
const input: Input<'comandaRestaurante.atendimento.obterComandaAtendimento'> = { comandaId };
try {
const response = await execBff<Output<'comandaRestaurante.atendimento.obterComandaAtendimento'>>('comandaRestaurante.atendimento.obterComandaAtendimento', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('obterComandaAtendimentoError', this.errorFrom(response.error));
this.publish('obterComandaAtendimentoStatus', 'error');
return;
}
this.publish('comanda', response.data.comanda);
this.publish('obterComandaAtendimentoStatus', 'success');
} catch (error) {
this.publish('obterComandaAtendimentoError', { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'UnknownError' } });
this.publish('obterComandaAtendimentoStatus', 'error');
}
}
/** function abrirComanda — opens a comanda for the selected available mesa; redraws comanda by upsert and declares contextoAtendimento updated; argument is the mesa identifier */
public async abrirComanda(mesaId: string | null): Promise<void> {
if (mesaId === null || mesaId === '') {
this.publish('abrirComandaError', this.requiredError(['mesaId']));
this.publish('abrirComandaStatus', 'error');
return;
}
if (this.abrirComandaStatus === 'loading') return;
this.publish('abrirComandaStatus', 'loading');
this.publish('abrirComandaError', null);
const input: Input<'comandaRestaurante.atendimento.abrirComanda'> = { mesaId };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.atendimento.abrirComanda'>>('comandaRestaurante.atendimento.abrirComanda', input, { mode: 'blocking', signal }));
if (result === undefined) {
this.publish('abrirComandaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('abrirComandaStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('abrirComandaError', this.errorFrom(result.error));
this.publish('abrirComandaStatus', 'error');
return;
}
this.publish('comanda', result.data.comanda);
this.publish('abrirComandaStatus', 'success');
}
/** function lancarItem — adds the drafted menu item to the open comanda; redraws comanda by upsert; arguments are supplied only by the launch form */
public async lancarItem(): Promise<void> {
const draft = this.formularioLancamento;
const comandaId = this.selectedComanda ?? this.comanda?.id ?? null;
if (comandaId === null || draft.itemCardapioId === null || draft.itemCardapioId === '' || draft.details.quantidade === null) {
this.publish('lancarItemError', this.requiredError(['selectedComanda', 'formularioLancamento.itemCardapioId', 'formularioLancamento.details.quantidade']));
this.publish('lancarItemStatus', 'error');
return;
}
if (this.lancarItemStatus === 'loading') return;
this.publish('lancarItemStatus', 'loading');
this.publish('lancarItemError', null);
const input: Input<'comandaRestaurante.atendimento.lancarItem'> = { comandaId, itemCardapioId: draft.itemCardapioId, details: { quantidade: draft.details.quantidade, ...(draft.details.observacao !== null && draft.details.observacao !== '' ? { observacao: draft.details.observacao } : {}) } };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.atendimento.lancarItem'>>('comandaRestaurante.atendimento.lancarItem', input, { mode: 'blocking', signal }));
if (result === undefined) {
this.publish('lancarItemError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('lancarItemStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('lancarItemError', this.errorFrom(result.error));
this.publish('lancarItemStatus', 'error');
return;
}
this.publish('comanda', result.data.comanda);
this.publish('formularioLancamento', this.emptyLancarItemDraft());
this.publish('lancarItemStatus', 'success');
}
/** function cancelarItem — cancels the selected launched line; redraws comanda by upsert; arguments are the line identifier and its concurrency version */
public async cancelarItem(id: string | null, version: number | null): Promise<void> {
if (id === null || id === '' || version === null) {
this.publish('cancelarItemError', this.requiredError(['id', 'version']));
this.publish('cancelarItemStatus', 'error');
return;
}
if (this.cancelarItemStatus === 'loading') return;
this.publish('cancelarItemStatus', 'loading');
this.publish('cancelarItemError', null);
const input: Input<'comandaRestaurante.atendimento.cancelarItem'> = { id, version };
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.atendimento.cancelarItem'>>('comandaRestaurante.atendimento.cancelarItem', input, { mode: 'blocking', signal }));
if (result === undefined) {
this.publish('cancelarItemError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('cancelarItemStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('cancelarItemError', this.errorFrom(result.error));
this.publish('cancelarItemStatus', 'error');
return;
}
this.publish('comanda', result.data.comanda);
this.publish('cancelarItemStatus', 'success');
}
/** draft — sets the launch form draft used by lancarItem */
public setFormularioLancamento(value: LancarItemDraft): void {
this.publish('formularioLancamento', value);
}
/** select — selects a comanda identifier, clears the detail when null, and loads the selected comanda when present */
public selectComanda(value: string | null): void {
this.publish('selectedComanda', value);
if (value === null) {
this.publish('comanda', null);
return;
}
void this.obterComandaAtendimento(value);
}
/** sets the visible page scene */
public setScenario(value: string): void {
this.publish('scenary', value);
}
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) {
const value = getState(key);
if (value !== undefined) this.assignState(key, value);
}
subscribe(STATE_KEYS, this);
this.applyEntryParams();
void this.loadInitial();
if (this.selectedComanda !== null) void this.obterComandaAtendimento(this.selectedComanda);
}
private applyEntryParams(): void {
const params = new URLSearchParams(window.location.search);
const read = (name: string): string | null => {
const urlValue = params.get(name);
if (urlValue !== null) return urlValue;
try {
return localStorage.getItem(`comandaRestaurante.atendimento.${name}`);
} catch {
return null;
}
};
const pageRaw = read('page');
const page = pageRaw === null ? null : Number(pageRaw);
this.publish('page', page !== null && Number.isFinite(page) ? page : null);
this.publish('mesaTermo', read('mesaTermo'));
const numberRaw = read('comandaNumero');
const numberValue = numberRaw === null ? null : Number(numberRaw);
this.publish('comandaNumero', numberValue !== null && Number.isFinite(numberValue) ? numberValue : null);
this.publish('itemTermo', read('itemTermo'));
this.publish('selectedComanda', read('comandaId'));
const itemCardapioId = read('itemCardapioId');
if (itemCardapioId !== null) this.publish('formularioLancamento', { ...this.formularioLancamento, itemCardapioId });
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
}
