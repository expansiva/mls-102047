/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/mesas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { MesaResumo, MesasContracts } from '/_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.js';
export type { MesaResumo, MesasContracts } from '/_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type MesaFormDraft = { code: string | null };
type Input<R extends keyof MesasContracts> = MesasContracts[R]['input'];
type Output<R extends keyof MesasContracts> = MesasContracts[R]['output'];
type StateMember = 'mesas' | 'selectedMesa' | 'mesaFormDraft' | 'pageStatus' | 'carregarMesasStatus' | 'carregarMesasError' | 'criarMesaStatus' | 'criarMesaError' | 'atualizarMesaStatus' | 'atualizarMesaError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.mesas.mesas': 'mesas',
'ui.comandaRestaurante.mesas.selectedMesa': 'selectedMesa',
'ui.comandaRestaurante.mesas.mesaFormDraft': 'mesaFormDraft',
'ui.comandaRestaurante.mesas.pageStatus': 'pageStatus',
'ui.comandaRestaurante.mesas.carregarMesasStatus': 'carregarMesasStatus',
'ui.comandaRestaurante.mesas.carregarMesasError': 'carregarMesasError',
'ui.comandaRestaurante.mesas.criarMesaStatus': 'criarMesaStatus',
'ui.comandaRestaurante.mesas.criarMesaError': 'criarMesaError',
'ui.comandaRestaurante.mesas.atualizarMesaStatus': 'atualizarMesaStatus',
'ui.comandaRestaurante.mesas.atualizarMesaError': 'atualizarMesaError',
'ui.comandaRestaurante.mesas.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class ComandaRestauranteMesasShared extends StateLitElement {
/** state mesas — complete mesa records for the house list and maintenance redraws; source carregarMesas.mesas; organism mesasList */
@property({ attribute: false }) mesas: MesaResumo[] = [];
/** state selectedMesa — the selected complete mesa record for the form; source entry.params.mesaId; organism mesaForm; persisted */
@property({ attribute: false }) selectedMesa: MesaResumo | null = null;
/** draft — the mesa code being edited by the create or update form */
@property({ attribute: false }) mesaFormDraft: MesaFormDraft = this.emptyMesaFormDraft();
/** state pageStatus — the overall initial-load status of the page; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarMesasStatus — the status of the mesa list query; source carregarMesasStatus */
@property({ attribute: false }) carregarMesasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMesasError — the error of the mesa list query; source carregarMesasError */
@property({ attribute: false }) carregarMesasError: ErrorState = null;
/** state criarMesaStatus — the status of mesa creation; source criarMesaStatus */
@property({ attribute: false }) criarMesaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state criarMesaError — the error of mesa creation; source criarMesaError */
@property({ attribute: false }) criarMesaError: ErrorState = null;
/** state atualizarMesaStatus — the status of mesa update; source atualizarMesaStatus */
@property({ attribute: false }) atualizarMesaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state atualizarMesaError — the error of mesa update; source atualizarMesaError */
@property({ attribute: false }) atualizarMesaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private entryMesaId: string | null = null;
private emptyMesaFormDraft(): MesaFormDraft {
return { code: null };
}
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.mesas.${member}`, value);
if (member === 'selectedMesa') {
try {
if (this.entryMesaId === null) {
localStorage.removeItem('comandaRestaurante.mesas.mesaId');
} else {
localStorage.setItem('comandaRestaurante.mesas.mesaId', this.entryMesaId);
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
this.publish('pageStatus', 'idle');
this.publish('carregarMesasStatus', 'idle');
this.publish('carregarMesasError', null);
this.publish('criarMesaStatus', 'idle');
this.publish('criarMesaError', null);
this.publish('atualizarMesaStatus', 'idle');
this.publish('atualizarMesaError', null);
this.publish('mesaFormDraft', this.emptyMesaFormDraft());
this.publish('scenary', '');
this.publish('selectedMesa', null);
}
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) {
const member = STATE_MEMBER_BY_KEY[key];
if (member === 'mesas') {
const value = getState(key);
if (value !== undefined) {
this.assignState(key, value);
}
}
}
this.resetVisit();
subscribe(STATE_KEYS, this);
const raw = new URLSearchParams(window.location.search).get('mesaId');
let stored: string | null = null;
if (raw === null) {
try {
stored = localStorage.getItem('comandaRestaurante.mesas.mesaId');
} catch {
stored = null;
}
}
this.entryMesaId = raw ?? stored;
void this.carregarMesas();
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
/** function setScenario — publishes the visible page scene; redraws scenary by replacement; value is the scene identifier */
public setScenario(value: string): void {
this.publish('scenary', value);
}
/** draft — sets the mesa code draft used by create and update submissions; redraws mesaFormDraft by replacement; value contains the editable code */
public setMesaForm(value: MesaFormDraft): void {
this.publish('mesaFormDraft', { code: value.code });
}
/** select — selects a mesa by id or clears the selection; redraws selectedMesa by replacement; id is the mesa identifier */
public selectMesa(id: string | null): void {
this.entryMesaId = id;
if (id === null) {
this.publish('selectedMesa', null);
return;
}
const mesa = this.mesas.find((row) => row.id === id);
if (mesa) {
this.publish('selectedMesa', mesa);
return;
}
this.publish('carregarMesasError', { code: 'client.selectionInvalid', message: '', details: { id } });
}
/** function carregarMesas — loads the house mesas for cashier consultation and maintenance selection; redraws mesas by replacement; takes no arguments */
public async carregarMesas(): Promise<void> {
if (this.carregarMesasStatus === 'loading') {
return;
}
this.publish('pageStatus', 'loading');
this.publish('carregarMesasStatus', 'loading');
this.publish('carregarMesasError', null);
try {
const input: Input<'comandaRestaurante.mesas.carregarMesas'> = {};
const response = await execBff<Output<'comandaRestaurante.mesas.carregarMesas'>>('comandaRestaurante.mesas.carregarMesas', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarMesasError', response.error as ErrorState);
this.publish('carregarMesasStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
this.publish('mesas', [...response.data.mesas]);
this.publish('carregarMesasStatus', 'success');
if (this.entryMesaId !== null) {
this.selectMesa(this.entryMesaId);
}
this.publish('pageStatus', response.data.mesas.length === 0 ? 'empty' : 'success');
} catch (error) {
const name = error instanceof Error ? error.name : 'Error';
this.publish('carregarMesasError', { code: 'client.unexpected', message: '', details: { name } });
this.publish('carregarMesasStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** function criarMesa — creates a mesa and returns its complete current state; redraws mesas by upsert; takes no arguments and reads the mesaForm draft */
public async criarMesa(): Promise<void> {
const code = this.mesaFormDraft.code;
if (code === null || code === '') {
this.publish('criarMesaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['mesaFormDraft.code'] } });
this.publish('criarMesaStatus', 'error');
return;
}
if (this.criarMesaStatus === 'loading') {
return;
}
this.publish('criarMesaStatus', 'loading');
this.publish('criarMesaError', null);
try {
const input: Input<'comandaRestaurante.mesas.criarMesa'> = { code };
const result = await runBlockingUiAction((signal) => execBff<Output<'comandaRestaurante.mesas.criarMesa'>>('comandaRestaurante.mesas.criarMesa', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('criarMesaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('criarMesaStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('criarMesaError', result.error as ErrorState);
this.publish('criarMesaStatus', 'error');
return;
}
const mesa = result.data.mesa;
this.publish('mesas', [...this.mesas.filter((row) => row.id !== mesa.id), mesa]);
this.publish('criarMesaStatus', 'success');
this.publish('mesaFormDraft', this.emptyMesaFormDraft());
} catch (error) {
const name = error instanceof Error ? error.name : 'Error';
this.publish('criarMesaError', { code: 'client.unexpected', message: '', details: { name } });
this.publish('criarMesaStatus', 'error');
}
}
/** function atualizarMesa — updates the selected mesa code and returns its complete current state; redraws mesas by upsert; takes no arguments and reads the selected mesa and mesaForm draft */
public async atualizarMesa(): Promise<void> {
const mesa = this.selectedMesa;
const code = this.mesaFormDraft.code;
if (!mesa) {
this.publish('atualizarMesaError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['selectedMesa'] } });
this.publish('atualizarMesaStatus', 'error');
return;
}
if (code === null || code === '') {
this.publish('atualizarMesaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['mesaFormDraft.code'] } });
this.publish('atualizarMesaStatus', 'error');
return;
}
if (this.atualizarMesaStatus === 'loading') {
return;
}
this.publish('atualizarMesaStatus', 'loading');
this.publish('atualizarMesaError', null);
try {
const input: Input<'comandaRestaurante.mesas.atualizarMesa'> = { id: mesa.id, version: mesa.version, code };
const result = await runBlockingUiAction((signal) => execBff<Output<'comandaRestaurante.mesas.atualizarMesa'>>('comandaRestaurante.mesas.atualizarMesa', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('atualizarMesaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
this.publish('atualizarMesaStatus', 'error');
return;
}
if (!result.ok || !result.data) {
this.publish('atualizarMesaError', result.error as ErrorState);
this.publish('atualizarMesaStatus', 'error');
return;
}
const updated = result.data.mesa;
this.publish('mesas', [...this.mesas.filter((row) => row.id !== updated.id), updated]);
this.publish('selectedMesa', updated);
this.publish('atualizarMesaStatus', 'success');
this.publish('mesaFormDraft', this.emptyMesaFormDraft());
} catch (error) {
const name = error instanceof Error ? error.name : 'Error';
this.publish('atualizarMesaError', { code: 'client.unexpected', message: '', details: { name } });
this.publish('atualizarMesaStatus', 'error');
}
}
}
