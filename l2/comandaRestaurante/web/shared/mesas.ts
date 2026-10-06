/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/mesas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { MesasContracts, MesaResumo } from '/_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.js';
export type { MesasContracts, MesaResumo } from '/_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type CreateMesaDraft = { code: string | null };
export type UpdateMesaDraft = { id: string | null; version: number | null; code: string | null };
type Input<R extends keyof MesasContracts> = MesasContracts[R]['input'];
type Output<R extends keyof MesasContracts> = MesasContracts[R]['output'];

type StateMember = 'mesas' | 'selectedMesa' | 'createMesaDraft' | 'updateMesaDraft' | 'pageStatus' | 'carregarMesasStatus' | 'carregarMesasError' | 'criarMesaStatus' | 'criarMesaError' | 'atualizarMesaStatus' | 'atualizarMesaError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.comandaRestaurante.mesas.mesas': 'mesas',
'ui.comandaRestaurante.mesas.selectedMesa': 'selectedMesa',
'ui.comandaRestaurante.mesas.createMesaDraft': 'createMesaDraft',
'ui.comandaRestaurante.mesas.updateMesaDraft': 'updateMesaDraft',
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
/** state mesas — complete mesa records loaded for the house list; source carregarMesas.mesas; organism mesasList */
@property({ attribute: false }) mesas: MesaResumo[] = [];
/** state selectedMesa — the complete selected mesa record; source entry.params.mesaId; organism mesaForm; persisted */
@property({ attribute: false }) selectedMesa: MesaResumo | null = null;
/** state createMesaDraft — the values being edited for mesa creation; source criarMesa.input; organism mesaForm */
@property({ attribute: false }) createMesaDraft: CreateMesaDraft = this.emptyCreateMesaDraft();
/** state updateMesaDraft — the values being edited for mesa update; source atualizarMesa.input; organism mesaForm */
@property({ attribute: false }) updateMesaDraft: UpdateMesaDraft = this.emptyUpdateMesaDraft();
/** state pageStatus — the overall loading state of the page; source pageStatus */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarMesasStatus — the status of the house mesa query; source carregarMesas.status */
@property({ attribute: false }) carregarMesasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMesasError — the error returned by the house mesa query; source carregarMesas.error */
@property({ attribute: false }) carregarMesasError: ErrorState = null;
/** state criarMesaStatus — the status of the mesa creation command; source criarMesa.status */
@property({ attribute: false }) criarMesaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state criarMesaError — the error returned by the mesa creation command; source criarMesa.error */
@property({ attribute: false }) criarMesaError: ErrorState = null;
/** state atualizarMesaStatus — the status of the mesa update command; source atualizarMesa.status */
@property({ attribute: false }) atualizarMesaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state atualizarMesaError — the error returned by the mesa update command; source atualizarMesa.error */
@property({ attribute: false }) atualizarMesaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private pendingMesaId: string | null = null;

private emptyCreateMesaDraft(): CreateMesaDraft {
return { code: null };
}
private emptyUpdateMesaDraft(): UpdateMesaDraft {
return { id: null, version: null, code: null };
}
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.comandaRestaurante.mesas.${member}`, value);
if (member === 'selectedMesa') {
try {
const selected = value as MesaResumo | null;
if (selected) localStorage.setItem('comandaRestaurante.mesas.mesaId', selected.id);
else localStorage.removeItem('comandaRestaurante.mesas.mesaId');
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
private async loadQuery(): Promise<void> {
if (this.carregarMesasStatus === 'loading') return;
this.publish('pageStatus', 'loading');
this.publish('carregarMesasStatus', 'loading');
this.publish('carregarMesasError', null);
try {
const response = await execBff<Output<'comandaRestaurante.mesas.carregarMesas'>>('comandaRestaurante.mesas.carregarMesas', {} as Input<'comandaRestaurante.mesas.carregarMesas'>, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarMesasStatus', 'error');
this.publish('carregarMesasError', response.error);
this.publish('pageStatus', 'error');
return;
}
this.publish('mesas', [...response.data.mesas]);
this.publish('carregarMesasStatus', 'success');
this.publish('pageStatus', response.data.mesas.length === 0 ? 'empty' : 'success');
if (this.pendingMesaId !== null) {
const id = this.pendingMesaId;
this.pendingMesaId = null;
this.selectMesa(id);
}
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'Error';
this.publish('carregarMesasStatus', 'error');
this.publish('carregarMesasError', this.error('client.unexpected', { name }));
this.publish('pageStatus', 'error');
}
}
private async runCreate(input: Input<'comandaRestaurante.mesas.criarMesa'>): Promise<void> {
if (this.criarMesaStatus === 'loading') return;
this.publish('criarMesaStatus', 'loading');
this.publish('criarMesaError', null);
try {
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.mesas.criarMesa'>>('comandaRestaurante.mesas.criarMesa', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('criarMesaStatus', 'error');
this.publish('criarMesaError', this.error('client.unexpected', { name: 'aborted' }));
return;
}
if (!result.ok || !result.data) {
this.publish('criarMesaStatus', 'error');
this.publish('criarMesaError', result.error);
return;
}
const mesa = result.data.mesa;
this.publish('mesas', [...this.mesas.filter(row => row.id !== mesa.id), mesa]);
this.publish('createMesaDraft', this.emptyCreateMesaDraft());
this.publish('criarMesaStatus', 'success');
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'Error';
this.publish('criarMesaStatus', 'error');
this.publish('criarMesaError', this.error('client.unexpected', { name }));
}
}
private async runUpdate(input: Input<'comandaRestaurante.mesas.atualizarMesa'>): Promise<void> {
if (this.atualizarMesaStatus === 'loading') return;
this.publish('atualizarMesaStatus', 'loading');
this.publish('atualizarMesaError', null);
try {
const result = await runBlockingUiAction(signal => execBff<Output<'comandaRestaurante.mesas.atualizarMesa'>>('comandaRestaurante.mesas.atualizarMesa', input, { mode: 'blocking', signal }));
if (!result) {
this.publish('atualizarMesaStatus', 'error');
this.publish('atualizarMesaError', this.error('client.unexpected', { name: 'aborted' }));
return;
}
if (!result.ok || !result.data) {
this.publish('atualizarMesaStatus', 'error');
this.publish('atualizarMesaError', result.error);
return;
}
const mesa = result.data.mesa;
this.publish('mesas', [...this.mesas.filter(row => row.id !== mesa.id), mesa]);
this.publish('updateMesaDraft', this.emptyUpdateMesaDraft());
this.publish('atualizarMesaStatus', 'success');
} catch (caught) {
const name = caught instanceof Error ? caught.name : 'Error';
this.publish('atualizarMesaStatus', 'error');
this.publish('atualizarMesaError', this.error('client.unexpected', { name }));
}
}
/** function carregarMesas — loads the house mesas for the cashier; redraws mesas by replacing the loaded list; takes no arguments */
public carregarMesas(): Promise<void> {
return this.loadQuery();
}
/** function criarMesa — creates a mesa and redraws mesas by upserting the returned record; takes the creation draft code */
public criarMesa(): Promise<void> {
const code = this.createMesaDraft.code;
if (code === null || code === '') {
this.publish('criarMesaStatus', 'error');
this.publish('criarMesaError', this.error('client.requiredMissing', { stateKeys: ['createMesaDraft.code'] }));
return Promise.resolve();
}
return this.runCreate({ code });
}
/** function atualizarMesa — updates the selected mesa and redraws mesas by upserting the returned record; takes the update draft */
public atualizarMesa(): Promise<void> {
const draft = this.updateMesaDraft;
const selected = this.selectedMesa;
const id = draft.id ?? selected?.id ?? null;
const version = draft.version ?? selected?.version ?? null;
if (id === null || version === null || draft.code === null || draft.code === '') {
this.publish('atualizarMesaStatus', 'error');
this.publish('atualizarMesaError', this.error('client.requiredMissing', { stateKeys: ['updateMesaDraft.id', 'updateMesaDraft.version', 'updateMesaDraft.code'] }));
return Promise.resolve();
}
return this.runUpdate({ id, version, code: draft.code });
}
/** draft — updates the mesa creation form draft used by criarMesa */
public setCreateMesaDraft(value: CreateMesaDraft): void {
this.publish('createMesaDraft', { ...value });
}
/** draft — updates the mesa update form draft used by atualizarMesa */
public setUpdateMesaDraft(value: UpdateMesaDraft): void {
this.publish('updateMesaDraft', { ...value });
}
/** select — selects a mesa by id, or clears the selection when id is null */
public selectMesa(id: string | null): void {
if (id === null) {
this.publish('selectedMesa', null);
return;
}
const mesa = this.mesas.find(row => row.id === id) ?? null;
if (!mesa) {
this.publish('carregarMesasError', this.error('client.selectionInvalid', { id }));
this.publish('carregarMesasStatus', 'error');
return;
}
this.publish('selectedMesa', mesa);
}
/** setScenario — publishes the visible page scene */
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
const params = new URLSearchParams(window.location.search);
let raw = params.get('mesaId');
if (raw === null) {
try {
raw = localStorage.getItem('comandaRestaurante.mesas.mesaId');
} catch {
raw = null;
}
}
this.pendingMesaId = raw;
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
if (value === undefined) return;
this.assignState(key, value);
this.requestUpdate();
}
}
