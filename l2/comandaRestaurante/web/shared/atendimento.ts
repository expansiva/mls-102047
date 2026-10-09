/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/atendimento.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { AtendimentoContracts, ContextoAtendimento, ComandaAtendimento } from '/_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.js';
export type { AtendimentoContracts, ContextoAtendimento, ComandaAtendimento, MesaDisponivel, MesaReferencia, ComandaResumo, ItemCardapioResumo, ItemCardapioDaComanda, ItemComandaAtendimento } from '/_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.js';
type Input<R extends keyof AtendimentoContracts> = AtendimentoContracts[R]['input'];
type Output<R extends keyof AtendimentoContracts> = AtendimentoContracts[R]['output'];
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type LancarItemDraft = { comandaId: string | null; itemCardapioId: string | null; details: { quantidade: number | null; observacao: string | null } };
type StateMember = 'contextoAtendimento' | 'comanda' | 'selectedComanda' | 'page' | 'mesaTermo' | 'comandaNumero' | 'itemTermo' | 'lancarItemDraft' | 'pageStatus' | 'carregarAtendimentoStatus' | 'carregarAtendimentoError' | 'atualizarLocalizacaoAtendimentoStatus' | 'atualizarLocalizacaoAtendimentoError' | 'obterComandaAtendimentoStatus' | 'obterComandaAtendimentoError' | 'abrirComandaStatus' | 'abrirComandaError' | 'lancarItemStatus' | 'lancarItemError' | 'cancelarItemStatus' | 'cancelarItemError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.atendimento.contextoAtendimento': 'contextoAtendimento',
'ui.comandaRestaurante.atendimento.comanda': 'comanda',
'ui.comandaRestaurante.atendimento.selectedComanda': 'selectedComanda',
'ui.comandaRestaurante.atendimento.page': 'page',
'ui.comandaRestaurante.atendimento.mesaTermo': 'mesaTermo',
'ui.comandaRestaurante.atendimento.comandaNumero': 'comandaNumero',
'ui.comandaRestaurante.atendimento.itemTermo': 'itemTermo',
'ui.comandaRestaurante.atendimento.lancarItemDraft': 'lancarItemDraft',
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
const PAGE_SIZE = 20;
export class ComandaRestauranteAtendimentoShared extends StateLitElement {
/** state contextoAtendimento — independent collections used to locate the table, open tab and menu item; source carregarAtendimento.contextoAtendimento; organism lookupAtendimento */
@property({ attribute: false }) contextoAtendimento: ContextoAtendimento | null = null;
/** state comanda — the selected tab with its table, all lines and calculated subtotal; source obterComandaAtendimento.comanda; organism detalheComanda */
@property({ attribute: false }) comanda: ComandaAtendimento | null = null;
/** state selectedComanda — the selected tab identifier; source entry.params.comandaId; organism detalheComanda; persisted */
@property({ attribute: false }) selectedComanda: string | null = null;
/** state page — the current lookup page; source entry.params.page; organism lookupAtendimento; persisted */
@property({ attribute: false }) page: number | null = null;
/** state mesaTermo — the table-code lookup term; source entry.params.mesaTermo; organism lookupAtendimento; persisted */
@property({ attribute: false }) mesaTermo: string | null = null;
/** state comandaNumero — the open-tab number lookup value; source entry.params.comandaNumero; organism lookupAtendimento; persisted */
@property({ attribute: false }) comandaNumero: number | null = null;
/** state itemTermo — the menu-item name lookup term; source entry.params.itemTermo; organism lookupAtendimento; persisted */
@property({ attribute: false }) itemTermo: string | null = null;
/** state lancarItemDraft — the menu-item launch form draft; source lancarItem.input; organism formularioLancamento */
@property({ attribute: false }) lancarItemDraft: LancarItemDraft = this.emptyDraft();
/** state pageStatus — the overall initial-load status; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarAtendimentoStatus — the initial lookup request status; source carregarAtendimentoStatus */
@property({ attribute: false }) carregarAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarAtendimentoError — the initial lookup request error; source carregarAtendimentoError */
@property({ attribute: false }) carregarAtendimentoError: ErrorState = null;
/** state atualizarLocalizacaoAtendimentoStatus — the filtered lookup request status; source atualizarLocalizacaoAtendimentoStatus */
@property({ attribute: false }) atualizarLocalizacaoAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state atualizarLocalizacaoAtendimentoError — the filtered lookup request error; source atualizarLocalizacaoAtendimentoError */
@property({ attribute: false }) atualizarLocalizacaoAtendimentoError: ErrorState = null;
/** state obterComandaAtendimentoStatus — the selected-tab request status; source obterComandaAtendimentoStatus */
@property({ attribute: false }) obterComandaAtendimentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state obterComandaAtendimentoError — the selected-tab request error; source obterComandaAtendimentoError */
@property({ attribute: false }) obterComandaAtendimentoError: ErrorState = null;
/** state abrirComandaStatus — the open-tab command status; source abrirComandaStatus */
@property({ attribute: false }) abrirComandaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state abrirComandaError — the open-tab command error; source abrirComandaError */
@property({ attribute: false }) abrirComandaError: ErrorState = null;
/** state lancarItemStatus — the launch-item command status; source lancarItemStatus */
@property({ attribute: false }) lancarItemStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state lancarItemError — the launch-item command error; source lancarItemError */
@property({ attribute: false }) lancarItemError: ErrorState = null;
/** state cancelarItemStatus — the cancel-item command status; source cancelarItemStatus */
@property({ attribute: false }) cancelarItemStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state cancelarItemError — the cancel-item request error; source cancelarItemError */
@property({ attribute: false }) cancelarItemError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
public connectedCallback(): void {
super.connectedCallback();
for (const key of ['ui.comandaRestaurante.atendimento.contextoAtendimento', 'ui.comandaRestaurante.atendimento.comanda']) {
const value = getState(key);
if (value !== undefined) this.assignState(key, value);
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
if (value === undefined) return;
this.assignState(key, value);
this.requestUpdate();
}
/** function carregarAtendimento — loads the initial lookup context for available tables, open tabs and menu items; redraws contextoAtendimento by replacement; takes no arguments */
public async carregarAtendimento(): Promise<void> {
if (this.carregarAtendimentoStatus === 'loading') return;
const input: Input<'comandaRestaurante.atendimento.carregarAtendimento'> = { page: this.page ?? 1, pageSize: PAGE_SIZE };
await this.query('carregarAtendimento', 'comandaRestaurante.atendimento.carregarAtendimento', input);
}
/** function atualizarLocalizacaoAtendimento — refreshes the independently filtered and paged lookup context; redraws contextoAtendimento by replacement; takes the table term, tab number, item term, page and page size */
public async atualizarLocalizacaoAtendimento(mesaTermo: string | null, comandaNumero: number | null, itemTermo: string | null, page = 1, pageSize = PAGE_SIZE): Promise<void> {
this.publish('mesaTermo', mesaTermo);
this.publish('comandaNumero', comandaNumero);
this.publish('itemTermo', itemTermo);
this.publish('page', page);
const input: Input<'comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento'> = { page, pageSize, ...(mesaTermo !== null && mesaTermo !== '' ? { mesaTermo } : {}), ...(comandaNumero !== null ? { comandaNumero } : {}), ...(itemTermo !== null && itemTermo !== '' ? { itemTermo } : {}) };
await this.query('atualizarLocalizacaoAtendimento', 'comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento', input);
}
/** function obterComandaAtendimento — loads the selected tab with its table, lines and subtotal; redraws comanda by replacement; takes the selected tab identifier */
public async obterComandaAtendimento(comandaId: string): Promise<void> {
this.publish('selectedComanda', comandaId);
const input: Input<'comandaRestaurante.atendimento.obterComandaAtendimento'> = { comandaId };
await this.query('obterComandaAtendimento', 'comandaRestaurante.atendimento.obterComandaAtendimento', input);
}
/** select — selects or clears a tab identifier and loads its complete record when an identifier is supplied */
public selectComanda(value: string | null): void {
this.publish('selectedComanda', value);
if (value === null) {
this.publish('comanda', null);
return;
}
void this.obterComandaAtendimento(value);
}
/** function abrirComanda — opens a tab for the selected available table; redraws comanda by upsert and declares contextoAtendimento for update; takes the table identifier */
public async abrirComanda(mesaId: string | null): Promise<void> {
if (mesaId === null || mesaId === '') {
this.publish('abrirComandaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['mesaId'] } });
this.publish('abrirComandaStatus', 'error');
return;
}
const input: Input<'comandaRestaurante.atendimento.abrirComanda'> = { mesaId };
await this.command('abrirComanda', 'comandaRestaurante.atendimento.abrirComanda', input, (output) => {
this.publish('comanda', output.comanda);
this.publish('selectedComanda', output.comanda.id);
});
}
/** function lancarItem — adds the drafted menu item to the open tab; redraws comanda by upsert; takes no arguments because the form draft supplies the command input */
public async lancarItem(): Promise<void> {
    const draft = this.lancarItemDraft;
    const cmmId = draft.comandaId ?? this.selectedComanda;
if (cmmId === null || cmmId === '' || draft.itemCardapioId === null || draft.itemCardapioId === '' || draft.details.quantidade === null) {
this.publish('lancarItemError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['lancarItemDraft.comandaId', 'lancarItemDraft.itemCardapioId', 'lancarItemDraft.details.quantidade'] } });
this.publish('lancarItemStatus', 'error');
return;
}
const input: Input<'comandaRestaurante.atendimento.lancarItem'> = { comandaId: cmmId, itemCardapioId: draft.itemCardapioId, details: { quantidade: draft.details.quantidade, ...(draft.details.observacao !== null && draft.details.observacao !== '' ? { observacao: draft.details.observacao } : {}) } };
await this.command('lancarItem', 'comandaRestaurante.atendimento.lancarItem', input, (output) => {
this.publish('comanda', output.comanda);
});
}
/** function cancelarItem — cancels the selected launched line; redraws comanda by upsert; takes the line identifier and concurrency version */
public async cancelarItem(id: string | null, version: number | null): Promise<void> {
if (id === null || id === '' || version === null) {
this.publish('cancelarItemError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['id', 'version'] } });
this.publish('cancelarItemStatus', 'error');
return;
}
const input: Input<'comandaRestaurante.atendimento.cancelarItem'> = { id, version };
await this.command('cancelarItem', 'comandaRestaurante.atendimento.cancelarItem', input, (output) => {
this.publish('comanda', output.comanda);
});
}
/** draft — updates the menu-item launch form draft */
public setLancarItemDraft(value: LancarItemDraft): void {
this.publish('lancarItemDraft', value);
}
/** state scenary — publishes the visible page scene */
public setScenario(value: string): void {
this.publish('scenary', value);
}
private emptyDraft(): LancarItemDraft {
return { comandaId: null, itemCardapioId: null, details: { quantidade: null, observacao: null } };
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('carregarAtendimentoStatus', 'idle');
this.publish('carregarAtendimentoError', null);
this.publish('atualizarLocalizacaoAtendimentoStatus', 'idle');
this.publish('atualizarLocalizacaoAtendimentoError', null);
this.publish('obterComandaAtendimentoStatus', 'idle');
this.publish('obterComandaAtendimentoError', null);
this.publish('abrirComandaStatus', 'idle');
this.publish('abrirComandaError', null);
this.publish('lancarItemStatus', 'idle');
this.publish('lancarItemError', null);
this.publish('cancelarItemStatus', 'idle');
this.publish('cancelarItemError', null);
this.publish('lancarItemDraft', this.emptyDraft());
this.publish('scenary', '');
}
private applyEntryParams(): void {
const params = new URLSearchParams(window.location.search);
const page = this.readParam(params, 'page', 'number');
const mesaTermo = this.readParam(params, 'mesaTermo', 'string');
const comandaNumero = this.readParam(params, 'comandaNumero', 'number');
const itemTermo = this.readParam(params, 'itemTermo', 'string');
const comandaId = this.readParam(params, 'comandaId', 'string');
const itemCardapioId = this.readParam(params, 'itemCardapioId', 'string') as string | null;
this.publish('page', page as number | null);
this.publish('mesaTermo', mesaTermo as string | null);
this.publish('comandaNumero', comandaNumero as number | null);
this.publish('itemTermo', itemTermo as string | null);
this.publish('selectedComanda', comandaId as string | null);
if (itemCardapioId !== null) this.publish('lancarItemDraft', { ...this.lancarItemDraft, itemCardapioId });
}
private readParam(params: URLSearchParams, name: string, type: 'number' | 'string'): number | string | null {
let raw = params.get(name);
if (raw === null) {
try { raw = localStorage.getItem(`comandaRestaurante.atendimento.${name}`); } catch { raw = null; }
}
if (raw === null || raw === '') return null;
if (type === 'number') {
const value = Number(raw);
return Number.isFinite(value) ? value : null;
}
return raw;
}
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.atendimento.${member}`, value);
if (member === 'page' || member === 'mesaTermo' || member === 'comandaNumero' || member === 'itemTermo' || member === 'selectedComanda') {
try {
const storageKey = `comandaRestaurante.atendimento.${member === 'selectedComanda' ? 'comandaId' : member}`;
if (value === null || value === '') localStorage.removeItem(storageKey);
else localStorage.setItem(storageKey, String(value));
} catch { }
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) (this as unknown as Record<string, unknown>)[member] = value;
}
private async initialLoad(): Promise<void> {
this.publish('pageStatus', 'loading');
await this.carregarAtendimento();
if (this.carregarAtendimentoStatus === 'error') {
this.publish('pageStatus', 'error');
return;
}
const context = this.contextoAtendimento;
const empty = context !== null && context.mesasDisponiveis.items.length === 0 && context.comandasAbertas.items.length === 0 && context.itensCardapio.items.length === 0;
this.publish('pageStatus', empty ? 'empty' : 'success');
if (this.selectedComanda !== null) await this.obterComandaAtendimento(this.selectedComanda);
}
private async query<K extends keyof AtendimentoContracts>(member: 'carregarAtendimento' | 'atualizarLocalizacaoAtendimento' | 'obterComandaAtendimento', route: K, input: Input<K>): Promise<void> {
const status = `${member}Status` as StateMember;
const error = `${member}Error` as StateMember;
if ((this as unknown as Record<string, unknown>)[status] === 'loading') return;
this.publish(status, 'loading' as this[typeof status]);
this.publish(error, null as this[typeof error]);
try {
const response = await execBff<Output<K>>(route, input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish(error, response.error as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
return;
}
if (member === 'obterComandaAtendimento') this.publish('comanda', (response.data as Output<'comandaRestaurante.atendimento.obterComandaAtendimento'>).comanda);
else this.publish('contextoAtendimento', (response.data as Output<'comandaRestaurante.atendimento.carregarAtendimento'>).contextoAtendimento);
this.publish(status, 'success' as this[typeof status]);
} catch (reason) {
const name = reason instanceof Error ? reason.name : 'Error';
this.publish(error, { code: 'client.unexpected', message: '', details: { name } } as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
}
}
private async command<K extends keyof AtendimentoContracts>(member: 'abrirComanda' | 'lancarItem' | 'cancelarItem', route: K, input: Input<K>, apply: (output: Output<K>) => void): Promise<void> {
const status = `${member}Status` as StateMember;
const error = `${member}Error` as StateMember;
this.publish(status, 'loading' as this[typeof status]);
this.publish(error, null as this[typeof error]);
try {
const result = await runBlockingUiAction((signal) => execBff<Output<K>>(route, input, { mode: 'blocking', signal }));
if (result === undefined) {
this.publish(error, { code: 'client.unexpected', message: '', details: { name: 'aborted' } } as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
return;
}
if (!result.ok || !result.data) {
this.publish(error, result.error as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
return;
}
apply(result.data);
this.publish(status, 'success' as this[typeof status]);
this.publish('lancarItemDraft', this.emptyDraft());
} catch (reason) {
const name = reason instanceof Error ? reason.name : 'Error';
this.publish(error, { code: 'client.unexpected', message: '', details: { name } } as this[typeof error]);
this.publish(status, 'error' as this[typeof status]);
}
}
}
