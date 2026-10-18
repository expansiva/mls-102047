/// <mls fileReference="_102047_/l2/tarefas/web/shared/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Tarefas_equipeContracts, TarefaDetalhe, ListaResumo, MembroResumo, TarefaEquipeItem } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';
export type { Tarefas_equipeContracts, MembroIdentificacao, MembroDetalhes, MembroResumo, ListaResumo, TarefaItemDetalhes, TarefaEquipeItem, ItemChecklistDetalhes, ItemChecklistLinha, TarefaDetalheDetalhes, TarefaDetalhe } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';
type Input<R extends keyof Tarefas_equipeContracts> = Tarefas_equipeContracts[R]['input'];
type Output<R extends keyof Tarefas_equipeContracts> = Tarefas_equipeContracts[R]['output'];
/** Error published by a request: a code (translated by the page), a message and optional details. */
export type ErrorState = { code: string; message: string; details?: unknown } | null;
/** Lifecycle of one request. */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
/** Page of tasks: items plus paging indicators. */
export type TarefasPage = Output<'tarefas.tarefas_equipe.listarTarefasEquipe'>['tarefas'];
/** Priority values accepted by the priority filter. */
export type Prioridade = TarefaEquipeItem['prioridade'];
/** Task status values accepted by the status filter. */
export type TarefaStatus = TarefaEquipeItem['status'];
/** Draft of the reassign command: the member chosen as the new owner. */
export type ReatribuirTarefaDraft = {
responsavelId: string | null;
};
/** Changes to the board filters; a member left undefined is kept, null clears it. */
export type TarefasEquipeFiltros = {
listaId?: string | null;
responsavelId?: string | null;
prioridade?: Prioridade | null;
status?: TarefaStatus | null;
prazoDe?: string | null;
prazoAte?: string | null;
venceHoje?: boolean | null;
atrasada?: boolean | null;
};
export function emptyReatribuirTarefaDraft(): ReatribuirTarefaDraft {
return { responsavelId: null };
}
const PRIORIDADES: Prioridade[] = ['low', 'medium', 'high'];
const STATUSES: TarefaStatus[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const PAGE_SIZE = 20;
type StateMember =
| 'tarefas'
| 'listas'
| 'membros'
| 'tarefa'
| 'selectedTarefa'
| 'listaId'
| 'responsavelId'
| 'prioridade'
| 'status'
| 'prazoDe'
| 'prazoAte'
| 'venceHoje'
| 'atrasada'
| 'reatribuirTarefaDraft'
| 'pageStatus'
| 'carregarOpcoesEquipeStatus'
| 'carregarOpcoesEquipeError'
| 'listarTarefasEquipeStatus'
| 'listarTarefasEquipeError'
| 'obterTarefaStatus'
| 'obterTarefaError'
| 'reatribuirTarefaStatus'
| 'reatribuirTarefaError'
| 'cancelarTarefaStatus'
| 'cancelarTarefaError'
| 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.tarefas.tarefas_equipe.tarefas': 'tarefas',
'ui.tarefas.tarefas_equipe.listas': 'listas',
'ui.tarefas.tarefas_equipe.membros': 'membros',
'ui.tarefas.tarefas_equipe.tarefa': 'tarefa',
'ui.tarefas.tarefas_equipe.selectedTarefa': 'selectedTarefa',
'ui.tarefas.tarefas_equipe.listaId': 'listaId',
'ui.tarefas.tarefas_equipe.responsavelId': 'responsavelId',
'ui.tarefas.tarefas_equipe.prioridade': 'prioridade',
'ui.tarefas.tarefas_equipe.status': 'status',
'ui.tarefas.tarefas_equipe.prazoDe': 'prazoDe',
'ui.tarefas.tarefas_equipe.prazoAte': 'prazoAte',
'ui.tarefas.tarefas_equipe.venceHoje': 'venceHoje',
'ui.tarefas.tarefas_equipe.atrasada': 'atrasada',
'ui.tarefas.tarefas_equipe.reatribuirTarefaDraft': 'reatribuirTarefaDraft',
'ui.tarefas.tarefas_equipe.pageStatus': 'pageStatus',
'ui.tarefas.tarefas_equipe.carregarOpcoesEquipeStatus': 'carregarOpcoesEquipeStatus',
'ui.tarefas.tarefas_equipe.carregarOpcoesEquipeError': 'carregarOpcoesEquipeError',
'ui.tarefas.tarefas_equipe.listarTarefasEquipeStatus': 'listarTarefasEquipeStatus',
'ui.tarefas.tarefas_equipe.listarTarefasEquipeError': 'listarTarefasEquipeError',
'ui.tarefas.tarefas_equipe.obterTarefaStatus': 'obterTarefaStatus',
'ui.tarefas.tarefas_equipe.obterTarefaError': 'obterTarefaError',
'ui.tarefas.tarefas_equipe.reatribuirTarefaStatus': 'reatribuirTarefaStatus',
'ui.tarefas.tarefas_equipe.reatribuirTarefaError': 'reatribuirTarefaError',
'ui.tarefas.tarefas_equipe.cancelarTarefaStatus': 'cancelarTarefaStatus',
'ui.tarefas.tarefas_equipe.cancelarTarefaError': 'cancelarTarefaError',
'ui.tarefas.tarefas_equipe.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const DATA_KEYS = [
'ui.tarefas.tarefas_equipe.tarefas',
'ui.tarefas.tarefas_equipe.listas',
'ui.tarefas.tarefas_equipe.membros',
'ui.tarefas.tarefas_equipe.tarefa',
];
// state member -> entry param name, for the members persisted in localStorage
const PERSIST_PARAM: Partial<Record<StateMember, string>> = {
listaId: 'listaId',
responsavelId: 'responsavelId',
prioridade: 'prioridade',
status: 'status',
prazoDe: 'prazoDe',
prazoAte: 'prazoAte',
venceHoje: 'venceHoje',
atrasada: 'atrasada',
selectedTarefa: 'tarefaId',
};
export class TarefasTarefas_equipeShared extends StateLitElement {
/** state tarefas — the page of team tasks (items with list, owner, due date, status, due signals and checklist progress, plus page, pageSize, hasMore); source listarTarefasEquipe.tarefas; organism tarefasEquipe */
@property({ attribute: false }) tarefas: TarefasPage | null = null;
/** state listas — the lists (projects or areas) used by the list filter; source carregarOpcoesEquipe.listas; organism tarefasEquipe */
@property({ attribute: false }) listas: ListaResumo[] = [];
/** state membros — the team members with their registry status (only Active ones may become owner); source carregarOpcoesEquipe.membros; organisms acoesGestor, tarefasEquipe */
@property({ attribute: false }) membros: MembroResumo[] = [];
/** state tarefa — the selected task in full (creator, owner, history milestones, checklist, version); source obterTarefa.tarefa; organisms acoesGestor, detalheTarefa, historicoTarefa */
@property({ attribute: false }) tarefa: TarefaDetalhe | null = null;
/** state selectedTarefa — the id of the task selected in tarefasEquipe (the record itself is in tarefa); source entry.params.tarefaId; organisms detalheTarefa, tarefasEquipe; persisted */
@property({ attribute: false }) selectedTarefa: string | null = null;
/** state listaId — filter of the board by list id; source entry.params.listaId; organism tarefasEquipe; persisted */
@property({ attribute: false }) listaId: string | null = null;
/** state responsavelId — filter of the board by owner (member id); source entry.params.responsavelId; organism tarefasEquipe; persisted */
@property({ attribute: false }) responsavelId: string | null = null;
/** state prioridade — filter of the board by priority; source entry.params.prioridade; organism tarefasEquipe; persisted */
@property({ attribute: false }) prioridade: Prioridade | null = null;
/** state status — filter of the board by task status; source entry.params.status; organism tarefasEquipe; persisted */
@property({ attribute: false }) status: TarefaStatus | null = null;
/** state prazoDe — filter: start of the due-date interval; source entry.params.prazoDe; organism tarefasEquipe; persisted */
@property({ attribute: false }) prazoDe: string | null = null;
/** state prazoAte — filter: end of the due-date interval; source entry.params.prazoAte; organism tarefasEquipe; persisted */
@property({ attribute: false }) prazoAte: string | null = null;
/** state venceHoje — filter: when true only open tasks due today; source entry.params.venceHoje; organism tarefasEquipe; persisted */
@property({ attribute: false }) venceHoje: boolean | null = null;
/** state atrasada — filter: when true only open overdue tasks; source entry.params.atrasada; organism tarefasEquipe; persisted */
@property({ attribute: false }) atrasada: boolean | null = null;
/** state reatribuirTarefaDraft — draft of the reassign command: the member chosen as new owner (prefilled with the current owner of the selected task); source reatribuirTarefa.input; organism acoesGestor */
@property({ attribute: false }) reatribuirTarefaDraft: ReatribuirTarefaDraft = emptyReatribuirTarefaDraft();
/** state pageStatus — overall status of the page load: idle, loading, empty, success or error */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarOpcoesEquipeStatus — status of the request carregarOpcoesEquipe */
@property({ attribute: false }) carregarOpcoesEquipeStatus: RequestStatus = 'idle';
/** state carregarOpcoesEquipeError — error of the request carregarOpcoesEquipe, null when none */
@property({ attribute: false }) carregarOpcoesEquipeError: ErrorState = null;
/** state listarTarefasEquipeStatus — status of the request listarTarefasEquipe */
@property({ attribute: false }) listarTarefasEquipeStatus: RequestStatus = 'idle';
/** state listarTarefasEquipeError — error of the request listarTarefasEquipe, null when none */
@property({ attribute: false }) listarTarefasEquipeError: ErrorState = null;
/** state obterTarefaStatus — status of the request obterTarefa */
@property({ attribute: false }) obterTarefaStatus: RequestStatus = 'idle';
/** state obterTarefaError — error of the request obterTarefa, null when none */
@property({ attribute: false }) obterTarefaError: ErrorState = null;
/** state reatribuirTarefaStatus — status of the command reatribuirTarefa (success stays until the person changes the draft, the selection or the scene) */
@property({ attribute: false }) reatribuirTarefaStatus: RequestStatus = 'idle';
/** state reatribuirTarefaError — error of the command reatribuirTarefa, null when none */
@property({ attribute: false }) reatribuirTarefaError: ErrorState = null;
/** state cancelarTarefaStatus — status of the command cancelarTarefa (success stays until the person changes the draft, the selection or the scene) */
@property({ attribute: false }) cancelarTarefaStatus: RequestStatus = 'idle';
/** state cancelarTarefaError — error of the command cancelarTarefa, null when none */
@property({ attribute: false }) cancelarTarefaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private subscribed = false;
private loadingTarefaId: string | null = null;
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.tarefas.tarefas_equipe.${member}`, value);
const param = PERSIST_PARAM[member];
if (param) {
try {
const storageKey = `tarefas.tarefas_equipe.${param}`;
if (value === null || value === undefined) {
localStorage.removeItem(storageKey);
} else {
localStorage.setItem(storageKey, String(value));
}
} catch {
// storage unavailable: the value stays in memory only
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
if (this.subscribed) {
unsubscribe([...STATE_KEYS], this);
this.subscribed = false;
}
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (!(key in STATE_MEMBER_BY_KEY)) {
super.handleIcaStateChange(key, value);
return;
}
if (value === undefined) {
return;
}
this.assignState(key, value);
this.requestUpdate();
}
private hydrateData(): void {
for (const key of DATA_KEYS) {
const value = getState(key);
if (value !== undefined) {
this.assignState(key, value);
}
}
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('scenary', '');
this.publish('carregarOpcoesEquipeStatus', 'idle');
this.publish('carregarOpcoesEquipeError', null);
this.publish('listarTarefasEquipeStatus', 'idle');
this.publish('listarTarefasEquipeError', null);
this.publish('obterTarefaStatus', 'idle');
this.publish('obterTarefaError', null);
this.publish('reatribuirTarefaStatus', 'idle');
this.publish('reatribuirTarefaError', null);
this.publish('cancelarTarefaStatus', 'idle');
this.publish('cancelarTarefaError', null);
this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
}
private resetCommandResults(): void {
this.publish('reatribuirTarefaStatus', 'idle');
this.publish('reatribuirTarefaError', null);
this.publish('cancelarTarefaStatus', 'idle');
this.publish('cancelarTarefaError', null);
}
private readRaw(name: string): string | null {
try {
const fromUrl = new URLSearchParams(window.location.search).get(name);
if (fromUrl !== null) {
return fromUrl;
}
} catch {
// url unavailable: fall back to storage
}
try {
return localStorage.getItem(`tarefas.tarefas_equipe.${name}`);
} catch {
return null;
}
}
private readString(name: string): string | null {
const raw = this.readRaw(name);
if (raw === null || raw === '') {
return null;
}
return raw;
}
private readBoolean(name: string): boolean | null {
const raw = this.readRaw(name);
if (raw === null || raw === '') {
return null;
}
return raw === 'true';
}
private readPrioridade(): Prioridade | null {
const raw = this.readRaw('prioridade');
const found = PRIORIDADES.find(item => item === raw);
return found ?? null;
}
private readStatus(): TarefaStatus | null {
const raw = this.readRaw('status');
const found = STATUSES.find(item => item === raw);
return found ?? null;
}
private applyEntryParams(): void {
this.publish('listaId', this.readString('listaId'));
this.publish('responsavelId', this.readString('responsavelId'));
this.publish('prioridade', this.readPrioridade());
this.publish('status', this.readStatus());
this.publish('prazoDe', this.readString('prazoDe'));
this.publish('prazoAte', this.readString('prazoAte'));
this.publish('venceHoje', this.readBoolean('venceHoje'));
this.publish('atrasada', this.readBoolean('atrasada'));
// the selection is applied after the filters
this.publish('selectedTarefa', this.readString('tarefaId'));
if (this.selectedTarefa === null) {
this.publish('tarefa', null);
}
}
private async loadInitial(): Promise<void> {
this.publish('pageStatus', 'loading');
const selected = this.selectedTarefa;
await Promise.all([
this.carregarOpcoesEquipe(),
this.listarTarefasEquipe(),
selected !== null ? this.obterTarefa(selected) : Promise.resolve(),
]);
this.syncPageStatus();
}
private syncPageStatus(): void {
if (this.carregarOpcoesEquipeStatus === 'loading' || this.listarTarefasEquipeStatus === 'loading') {
return;
}
if (this.carregarOpcoesEquipeStatus === 'error' || this.listarTarefasEquipeStatus === 'error') {
this.publish('pageStatus', 'error');
return;
}
if (this.carregarOpcoesEquipeStatus !== 'success' || this.listarTarefasEquipeStatus !== 'success') {
return;
}
const noTarefas = this.tarefas === null || this.tarefas.items.length === 0;
if (noTarefas && this.listas.length === 0 && this.membros.length === 0) {
this.publish('pageStatus', 'empty');
return;
}
this.publish('pageStatus', 'success');
}
private unexpected(name: string): ErrorState {
return { code: 'client.unexpected', message: '', details: { name } };
}
private thrown(error: unknown): ErrorState {
return this.unexpected(error instanceof Error ? error.name : 'unknown');
}
/** scene — publishes the visible scene of the page (a free scene id the page defines); also clears the result of the commands */
public setScenario(value: string): void {
this.resetCommandResults();
this.publish('scenary', value);
}
/** draft — replaces the reassign draft (the member chosen as new owner); also clears the result of the commands */
public setReatribuirTarefaDraft(value: ReatribuirTarefaDraft): void {
this.resetCommandResults();
this.publish('reatribuirTarefaDraft', { ...value });
}
/** request carregarOpcoesEquipe — loads the lists and the team members used by the board filters and by the choice of the new owner; replaces listas and membros; no arguments (scope is the manager's organization); runs on open and can be called to reload */
public async carregarOpcoesEquipe(): Promise<void> {
if (this.carregarOpcoesEquipeStatus === 'loading') {
return;
}
this.publish('carregarOpcoesEquipeStatus', 'loading');
this.publish('carregarOpcoesEquipeError', null);
try {
const input: Input<'tarefas.tarefas_equipe.carregarOpcoesEquipe'> = {};
const response = await execBff<Output<'tarefas.tarefas_equipe.carregarOpcoesEquipe'>>('tarefas.tarefas_equipe.carregarOpcoesEquipe', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarOpcoesEquipeError', response.error ?? this.unexpected('noResponse'));
this.publish('carregarOpcoesEquipeStatus', 'error');
this.syncPageStatus();
return;
}
this.publish('listas', response.data.listas);
this.publish('membros', response.data.membros);
this.publish('carregarOpcoesEquipeStatus', 'success');
} catch (error) {
this.publish('carregarOpcoesEquipeError', this.thrown(error));
this.publish('carregarOpcoesEquipeStatus', 'error');
}
this.syncPageStatus();
}
private applyFiltros(changes: TarefasEquipeFiltros): void {
if (changes.listaId !== undefined) {
this.publish('listaId', changes.listaId === '' ? null : changes.listaId);
}
if (changes.responsavelId !== undefined) {
this.publish('responsavelId', changes.responsavelId === '' ? null : changes.responsavelId);
}
if (changes.prioridade !== undefined) {
this.publish('prioridade', changes.prioridade);
}
if (changes.status !== undefined) {
this.publish('status', changes.status);
}
if (changes.prazoDe !== undefined) {
this.publish('prazoDe', changes.prazoDe === '' ? null : changes.prazoDe);
}
if (changes.prazoAte !== undefined) {
this.publish('prazoAte', changes.prazoAte === '' ? null : changes.prazoAte);
}
if (changes.venceHoje !== undefined) {
this.publish('venceHoje', changes.venceHoje);
}
if (changes.atrasada !== undefined) {
this.publish('atrasada', changes.atrasada);
}
}
/** request listarTarefasEquipe — lists the team tasks with the board filters (also the method to reload, filter and page); replaces tarefas, or appends the next page to tarefas.items when append is true; arguments: changes = filter values the person changed (listaId, responsavelId, prioridade, status, prazoDe, prazoAte, venceHoje, atrasada; undefined keeps, null clears), page = page to load starting at 1 (use 1 after any filter change), append = true for "load more" (loads tarefas.page + 1 and does nothing unless tarefas.hasMore) */
public async listarTarefasEquipe(changes: TarefasEquipeFiltros = {}, page = 1, append = false): Promise<void> {
if (this.listarTarefasEquipeStatus === 'loading') {
return;
}
const current = this.tarefas;
if (append && (current === null || !current.hasMore)) {
return;
}
const pageToLoad = append && current !== null ? current.page + 1 : page;
this.applyFiltros(changes);
this.publish('listarTarefasEquipeStatus', 'loading');
this.publish('listarTarefasEquipeError', null);
try {
const input: Input<'tarefas.tarefas_equipe.listarTarefasEquipe'> = {
...(this.listaId !== null && this.listaId !== '' ? { listaId: this.listaId } : {}),
...(this.responsavelId !== null && this.responsavelId !== '' ? { responsavelId: this.responsavelId } : {}),
...(this.prioridade !== null ? { prioridade: this.prioridade } : {}),
...(this.status !== null ? { status: this.status } : {}),
...(this.prazoDe !== null && this.prazoDe !== '' ? { prazoDe: this.prazoDe } : {}),
...(this.prazoAte !== null && this.prazoAte !== '' ? { prazoAte: this.prazoAte } : {}),
details: {
...(this.venceHoje === true ? { venceHoje: true } : {}),
...(this.atrasada === true ? { atrasada: true } : {}),
},
page: pageToLoad,
pageSize: PAGE_SIZE,
};
const response = await execBff<Output<'tarefas.tarefas_equipe.listarTarefasEquipe'>>('tarefas.tarefas_equipe.listarTarefasEquipe', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('listarTarefasEquipeError', response.error ?? this.unexpected('noResponse'));
this.publish('listarTarefasEquipeStatus', 'error');
this.syncPageStatus();
return;
}
const loaded = response.data.tarefas;
if (append) {
const previous = this.tarefas ? this.tarefas.items : [];
this.publish('tarefas', { items: [...previous, ...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore });
} else {
this.publish('tarefas', loaded);
}
this.publish('listarTarefasEquipeStatus', 'success');
} catch (error) {
this.publish('listarTarefasEquipeError', this.thrown(error));
this.publish('listarTarefasEquipeStatus', 'error');
}
this.syncPageStatus();
}
/** request obterTarefa — selects a task of the board and opens it with detail, checklist and history milestones; replaces tarefa (and selectedTarefa, persisted) and prefills reatribuirTarefaDraft with the current owner; argument: tarefaId = id of the picked row, or null to clear the selection */
public async obterTarefa(tarefaId: string | null): Promise<void> {
this.resetCommandResults();
if (tarefaId === null || tarefaId === '') {
this.loadingTarefaId = null;
this.publish('selectedTarefa', null);
this.publish('tarefa', null);
this.publish('obterTarefaStatus', 'idle');
this.publish('obterTarefaError', null);
this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
return;
}
if (this.obterTarefaStatus === 'loading' && this.loadingTarefaId === tarefaId) {
return;
}
this.loadingTarefaId = tarefaId;
this.publish('selectedTarefa', tarefaId);
this.publish('obterTarefaStatus', 'loading');
this.publish('obterTarefaError', null);
try {
const input: Input<'tarefas.tarefas_equipe.obterTarefa'> = { tarefaId };
const response = await execBff<Output<'tarefas.tarefas_equipe.obterTarefa'>>('tarefas.tarefas_equipe.obterTarefa', input, { mode: 'silent' });
if (this.selectedTarefa !== tarefaId) {
return;
}
if (!response.ok || !response.data) {
this.publish('obterTarefaError', response.error ?? this.unexpected('noResponse'));
this.publish('obterTarefaStatus', 'error');
return;
}
this.publish('tarefa', response.data.tarefa);
this.publish('reatribuirTarefaDraft', { responsavelId: response.data.tarefa.responsavelId });
this.publish('obterTarefaStatus', 'success');
} catch (error) {
if (this.selectedTarefa !== tarefaId) {
return;
}
this.publish('obterTarefaError', this.thrown(error));
this.publish('obterTarefaStatus', 'error');
}
}
// Whether the returned task still belongs to the loaded page under the active filters.
private rowBelongs(tarefa: TarefaDetalhe): boolean {
if (this.status !== null && this.status !== tarefa.status) {
return false;
}
if (this.responsavelId !== null && this.responsavelId !== '' && this.responsavelId !== tarefa.responsavelId) {
return false;
}
if (this.prioridade !== null && this.prioridade !== tarefa.prioridade) {
return false;
}
if ((this.venceHoje === true || this.atrasada === true) && !tarefa.details.aberta) {
return false;
}
return true;
}
// Applies the task returned by a command: the detail, the draft, and the row of the board.
private applyTarefaResult(tarefa: TarefaDetalhe): void {
this.publish('tarefa', tarefa);
this.publish('reatribuirTarefaDraft', { responsavelId: tarefa.responsavelId });
const page = this.tarefas;
if (!page) {
return;
}
const belongs = this.rowBelongs(tarefa);
const items = belongs
? page.items.map(row => {
if (row.id !== tarefa.id) {
return row;
}
return {
...row,
titulo: tarefa.titulo,
status: tarefa.status,
prioridade: tarefa.prioridade,
prazo: tarefa.prazo,
responsavelId: tarefa.responsavelId,
responsavel: tarefa.responsavel,
details: { ...row.details, progressoChecklist: tarefa.details.progressoChecklist },
};
})
: page.items.filter(row => row.id !== tarefa.id);
this.publish('tarefas', { ...page, items });
}
/** request reatribuirTarefa — changes the owner of the selected task to the member chosen in reatribuirTarefaDraft (must be an Active member); redraws tarefa (replace), the draft (refilled from the saved task) and the row in tarefas (update by id, removed when it no longer matches the filters); no arguments: id and version come from the selected task */
public async reatribuirTarefa(): Promise<void> {
if (this.reatribuirTarefaStatus === 'loading') {
return;
}
this.publish('reatribuirTarefaStatus', 'loading');
this.publish('reatribuirTarefaError', null);
const tarefa = this.tarefa;
const responsavelId = this.reatribuirTarefaDraft.responsavelId;
const missing: string[] = [];
if (!tarefa) {
missing.push('ui.tarefas.tarefas_equipe.tarefa');
}
if (responsavelId === null || responsavelId === '') {
missing.push('ui.tarefas.tarefas_equipe.reatribuirTarefaDraft');
}
if (!tarefa || responsavelId === null || responsavelId === '') {
this.publish('reatribuirTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
this.publish('reatribuirTarefaStatus', 'error');
return;
}
try {
const input: Input<'tarefas.tarefas_equipe.reatribuirTarefa'> = { id: tarefa.id, version: tarefa.version, responsavelId };
const response = await runBlockingUiAction(signal => execBff<Output<'tarefas.tarefas_equipe.reatribuirTarefa'>>('tarefas.tarefas_equipe.reatribuirTarefa', input, { mode: 'blocking', signal }));
if (response === undefined) {
this.publish('reatribuirTarefaError', this.unexpected('aborted'));
this.publish('reatribuirTarefaStatus', 'error');
return;
}
if (!response.ok || !response.data) {
this.publish('reatribuirTarefaError', response.error ?? this.unexpected('noResponse'));
this.publish('reatribuirTarefaStatus', 'error');
return;
}
this.applyTarefaResult(response.data.tarefa);
this.publish('reatribuirTarefaStatus', 'success');
} catch (error) {
this.publish('reatribuirTarefaError', this.thrown(error));
this.publish('reatribuirTarefaStatus', 'error');
}
}
/** request cancelarTarefa — cancels the selected task while it is still open; redraws tarefa (replace) and the row in tarefas (update by id, removed when it no longer matches the filters); no arguments: id and version come from the selected task */
public async cancelarTarefa(): Promise<void> {
if (this.cancelarTarefaStatus === 'loading') {
return;
}
this.publish('cancelarTarefaStatus', 'loading');
this.publish('cancelarTarefaError', null);
const tarefa = this.tarefa;
if (!tarefa) {
this.publish('cancelarTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['ui.tarefas.tarefas_equipe.tarefa'] } });
this.publish('cancelarTarefaStatus', 'error');
return;
}
try {
const input: Input<'tarefas.tarefas_equipe.cancelarTarefa'> = { id: tarefa.id, version: tarefa.version };
const response = await runBlockingUiAction(signal => execBff<Output<'tarefas.tarefas_equipe.cancelarTarefa'>>('tarefas.tarefas_equipe.cancelarTarefa', input, { mode: 'blocking', signal }));
if (response === undefined) {
this.publish('cancelarTarefaError', this.unexpected('aborted'));
this.publish('cancelarTarefaStatus', 'error');
return;
}
if (!response.ok || !response.data) {
this.publish('cancelarTarefaError', response.error ?? this.unexpected('noResponse'));
this.publish('cancelarTarefaStatus', 'error');
return;
}
this.applyTarefaResult(response.data.tarefa);
this.publish('cancelarTarefaStatus', 'success');
} catch (error) {
this.publish('cancelarTarefaError', this.thrown(error));
this.publish('cancelarTarefaStatus', 'error');
}
}
}
