/// <mls fileReference="_102047_/l2/tarefas/web/shared/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Minhas_tarefasContracts, TarefaResumo, TarefaAberta, ListaOpcao, MembroOpcao, ItemChecklistEntrada } from '/_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.js';
export type { Minhas_tarefasContracts, ListaNome, MembroIdentificacao, MembroNomeDetalhes, MembroNome, MembroOpcao, ListaOpcaoDetalhes, ListaOpcao, TarefaResumoDetalhes, TarefaResumo, ItemChecklistLinhaDetalhes, ItemChecklistLinha, TarefaAbertaDetalhes, TarefaAberta, ItemChecklistEntradaDetalhes, ItemChecklistEntrada } from '/_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.js';
type Input<R extends keyof Minhas_tarefasContracts> = Minhas_tarefasContracts[R]['input'];
type Output<R extends keyof Minhas_tarefasContracts> = Minhas_tarefasContracts[R]['output'];
/** Error published by a request: a backend error stored whole or a client code (client.*). */
export type ErrorState = { code: string; message: string; details?: unknown } | null;
/** Status of one request. */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
/** Status of the whole page. */
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
/** Situation of a task, as the contract names it. */
export type TarefaStatus = TarefaResumo['status'];
/** Priority of a task, as the contract names it. */
export type TarefaPrioridade = TarefaResumo['prioridade'];
/** Page of task rows: { items, page, pageSize, hasMore }. */
export type TarefasPage = Output<'tarefas.minhas_tarefas.minhasTarefas'>['tarefas'];
/** Filters the person can change on the task list; null clears a filter, undefined leaves it as it is. */
export type TarefasFiltroChange = {
criadasPorMim?: boolean | null;
atribuidasAMim?: boolean | null;
status?: TarefaStatus | null;
somenteDevolvidas?: boolean | null;
};
/** One checklist row of a form draft; id and version are null for a new item. */
export type ItemChecklistDraft = {
id: string | null;
version: number | null;
ordem: number | null;
details: { details: { descricao: string | null } };
};
/** Draft of the create-task form (input of salvarNovaTarefa; the creator comes from the session). */
export type SalvarNovaTarefaDraft = {
chaveCriacao: string | null;
listaId: string | null;
titulo: string | null;
details: { descricao: string | null };
prioridade: TarefaPrioridade | null;
prazo: string | null;
responsavelId: string | null;
checklist: ItemChecklistDraft[];
};
/** Draft of the edit-task form (input of salvarEdicaoTarefa), filled from the open task. */
export type SalvarEdicaoTarefaDraft = {
id: string | null;
version: number | null;
listaId: string | null;
titulo: string | null;
details: { descricao: string | null };
prioridade: TarefaPrioridade | null;
prazo: string | null;
responsavelId: string | null;
checklist: ItemChecklistDraft[];
};
/** Draft of the return-with-reason action (input of devolverComMotivo). */
export type DevolverComMotivoDraft = {
details: { motivoDevolucao: string | null };
};
type QueryId = 'minhasTarefas' | 'tarefaAberta' | 'opcoesFormulario' | 'buscarResponsaveis';
type CommandId = 'salvarNovaTarefa' | 'salvarEdicaoTarefa' | 'iniciarTarefa' | 'marcarItemChecklist' | 'enviarParaRevisao' | 'aceitarEntrega' | 'devolverComMotivo' | 'cancelarTarefa';
type RequestId = QueryId | CommandId;
type StatusMember = `${RequestId}Status`;
type ErrorMember = `${RequestId}Error`;
// every state and status member, and nothing else: NEVER `keyof TarefasMinhas_tarefasShared`
type StateMember =
| 'tarefas'
| 'tarefa'
| 'listas'
| 'membros'
| 'selectedTarefa'
| 'criadasPorMim'
| 'atribuidasAMim'
| 'status'
| 'somenteDevolvidas'
| 'page'
| 'termo'
| 'salvarNovaTarefaDraft'
| 'salvarEdicaoTarefaDraft'
| 'devolverComMotivoDraft'
| 'pageStatus'
| 'scenary'
| StatusMember
| ErrorMember;
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.tarefas.minhas_tarefas.tarefas': 'tarefas',
'ui.tarefas.minhas_tarefas.tarefa': 'tarefa',
'ui.tarefas.minhas_tarefas.listas': 'listas',
'ui.tarefas.minhas_tarefas.membros': 'membros',
'ui.tarefas.minhas_tarefas.selectedTarefa': 'selectedTarefa',
'ui.tarefas.minhas_tarefas.criadasPorMim': 'criadasPorMim',
'ui.tarefas.minhas_tarefas.atribuidasAMim': 'atribuidasAMim',
'ui.tarefas.minhas_tarefas.status': 'status',
'ui.tarefas.minhas_tarefas.somenteDevolvidas': 'somenteDevolvidas',
'ui.tarefas.minhas_tarefas.page': 'page',
'ui.tarefas.minhas_tarefas.termo': 'termo',
'ui.tarefas.minhas_tarefas.salvarNovaTarefaDraft': 'salvarNovaTarefaDraft',
'ui.tarefas.minhas_tarefas.salvarEdicaoTarefaDraft': 'salvarEdicaoTarefaDraft',
'ui.tarefas.minhas_tarefas.devolverComMotivoDraft': 'devolverComMotivoDraft',
'ui.tarefas.minhas_tarefas.pageStatus': 'pageStatus',
'ui.tarefas.minhas_tarefas.scenary': 'scenary',
'ui.tarefas.minhas_tarefas.minhasTarefasStatus': 'minhasTarefasStatus',
'ui.tarefas.minhas_tarefas.minhasTarefasError': 'minhasTarefasError',
'ui.tarefas.minhas_tarefas.tarefaAbertaStatus': 'tarefaAbertaStatus',
'ui.tarefas.minhas_tarefas.tarefaAbertaError': 'tarefaAbertaError',
'ui.tarefas.minhas_tarefas.opcoesFormularioStatus': 'opcoesFormularioStatus',
'ui.tarefas.minhas_tarefas.opcoesFormularioError': 'opcoesFormularioError',
'ui.tarefas.minhas_tarefas.buscarResponsaveisStatus': 'buscarResponsaveisStatus',
'ui.tarefas.minhas_tarefas.buscarResponsaveisError': 'buscarResponsaveisError',
'ui.tarefas.minhas_tarefas.salvarNovaTarefaStatus': 'salvarNovaTarefaStatus',
'ui.tarefas.minhas_tarefas.salvarNovaTarefaError': 'salvarNovaTarefaError',
'ui.tarefas.minhas_tarefas.salvarEdicaoTarefaStatus': 'salvarEdicaoTarefaStatus',
'ui.tarefas.minhas_tarefas.salvarEdicaoTarefaError': 'salvarEdicaoTarefaError',
'ui.tarefas.minhas_tarefas.iniciarTarefaStatus': 'iniciarTarefaStatus',
'ui.tarefas.minhas_tarefas.iniciarTarefaError': 'iniciarTarefaError',
'ui.tarefas.minhas_tarefas.marcarItemChecklistStatus': 'marcarItemChecklistStatus',
'ui.tarefas.minhas_tarefas.marcarItemChecklistError': 'marcarItemChecklistError',
'ui.tarefas.minhas_tarefas.enviarParaRevisaoStatus': 'enviarParaRevisaoStatus',
'ui.tarefas.minhas_tarefas.enviarParaRevisaoError': 'enviarParaRevisaoError',
'ui.tarefas.minhas_tarefas.aceitarEntregaStatus': 'aceitarEntregaStatus',
'ui.tarefas.minhas_tarefas.aceitarEntregaError': 'aceitarEntregaError',
'ui.tarefas.minhas_tarefas.devolverComMotivoStatus': 'devolverComMotivoStatus',
'ui.tarefas.minhas_tarefas.devolverComMotivoError': 'devolverComMotivoError',
'ui.tarefas.minhas_tarefas.cancelarTarefaStatus': 'cancelarTarefaStatus',
'ui.tarefas.minhas_tarefas.cancelarTarefaError': 'cancelarTarefaError',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
// states whose source is a request output: hydrated from the app state on entry
const DATA_KEYS = [
'ui.tarefas.minhas_tarefas.tarefas',
'ui.tarefas.minhas_tarefas.tarefa',
'ui.tarefas.minhas_tarefas.listas',
'ui.tarefas.minhas_tarefas.membros',
];
// persisted entry params: state member -> param name (localStorage key suffix)
const PERSISTED_PARAM_BY_MEMBER: Partial<Record<StateMember, string>> = {
selectedTarefa: 'tarefaId',
criadasPorMim: 'criadasPorMim',
atribuidasAMim: 'atribuidasAMim',
status: 'status',
somenteDevolvidas: 'somenteDevolvidas',
page: 'page',
termo: 'termo',
};
const PAGE_SIZE = 20;
const STORAGE_PREFIX = 'tarefas.minhas_tarefas.';
function statusMember(id: RequestId): StatusMember {
return `${id}Status` as StatusMember;
}
function errorMember(id: RequestId): ErrorMember {
return `${id}Error` as ErrorMember;
}
function isTarefaStatus(value: string | null): value is TarefaStatus {
return value === 'aFazer' || value === 'emAndamento' || value === 'emRevisao' || value === 'concluida' || value === 'cancelada';
}
function emptySalvarNovaTarefaDraft(): SalvarNovaTarefaDraft {
return {
chaveCriacao: crypto.randomUUID(),
listaId: null,
titulo: null,
details: { descricao: null },
prioridade: null,
prazo: null,
responsavelId: null,
checklist: [],
};
}
function emptySalvarEdicaoTarefaDraft(): SalvarEdicaoTarefaDraft {
return {
id: null,
version: null,
listaId: null,
titulo: null,
details: { descricao: null },
prioridade: null,
prazo: null,
responsavelId: null,
checklist: [],
};
}
function emptyDevolverComMotivoDraft(): DevolverComMotivoDraft {
return { details: { motivoDevolucao: null } };
}
function draftFromTarefa(tarefa: TarefaAberta): SalvarEdicaoTarefaDraft {
return {
id: tarefa.id,
version: tarefa.version,
listaId: tarefa.listaId,
titulo: tarefa.titulo,
details: { descricao: tarefa.details.details.descricao ?? null },
prioridade: tarefa.prioridade,
prazo: tarefa.prazo,
responsavelId: tarefa.responsavelId,
checklist: tarefa.checklist.map((item) => ({
id: item.id,
version: item.version,
ordem: item.ordem,
details: { details: { descricao: item.details.details.descricao } },
})),
};
}
function checklistInput(items: ItemChecklistDraft[]): ItemChecklistEntrada[] {
const result: ItemChecklistEntrada[] = [];
items.forEach((item, index) => {
const descricao = (item.details.details.descricao ?? '').trim();
if (descricao === '') return;
result.push({
...(item.id !== null ? { id: item.id } : {}),
...(item.version !== null ? { version: item.version } : {}),
ordem: item.ordem ?? index + 1,
details: { details: { descricao } },
});
});
return result;
}
export class TarefasMinhas_tarefasShared extends StateLitElement {
/** state tarefas — rows of my tasks (created by me or assigned to me) with list, owner and creator names, due-today/overdue flags, subtask count and checklist progress, as a page { items, page, pageSize, hasMore }; also updated per row after a command; source minhasTarefas.tarefas; organism tarefasLista */
@property({ attribute: false }) tarefas: TarefasPage | null = null;
/** state tarefa — the open task with names, checklist and history milestones; serves detail, actions, history and the edit form; source tarefaAberta.tarefa; organisms tarefaAcoes, tarefaDetalhe, tarefaForm, tarefaHistorico */
@property({ attribute: false }) tarefa: TarefaAberta | null = null;
/** state listas — active lists that can receive the task, for the form selector; source opcoesFormulario.listas; organism tarefaForm */
@property({ attribute: false }) listas: ListaOpcao[] = [];
/** state membros — active members found by name that can be chosen as owner; source buscarResponsaveis.membros; organism tarefaForm */
@property({ attribute: false }) membros: MembroOpcao[] = [];
/** state selectedTarefa — id of the selected task; the selected record itself is in `tarefa` (loaded by tarefaAberta); source entry.params.tarefaId; organisms tarefaDetalhe, tarefasLista; persisted */
@property({ attribute: false }) selectedTarefa: string | null = null;
/** filter — only tasks created by the session member (null = no filter); source entry.params.criadasPorMim; organism tarefasLista; persisted; change it through minhasTarefas({ criadasPorMim }) */
@property({ attribute: false }) criadasPorMim: boolean | null = null;
/** filter — only tasks assigned to the session member (null = no filter); source entry.params.atribuidasAMim; organism tarefasLista; persisted; change it through minhasTarefas({ atribuidasAMim }) */
@property({ attribute: false }) atribuidasAMim: boolean | null = null;
/** filter — situation filter of the list, e.g. emRevisao (null = every situation); source entry.params.status; organism tarefasLista; persisted; change it through minhasTarefas({ status }) */
@property({ attribute: false }) status: TarefaStatus | null = null;
/** filter — only returned tasks that are still in progress (null = no filter); source entry.params.somenteDevolvidas; organism tarefasLista; persisted; change it through minhasTarefas({ somenteDevolvidas }) */
@property({ attribute: false }) somenteDevolvidas: boolean | null = null;
/** filter — the page the person went to with a pager (a "load more" never writes it); source entry.params.page; organism tarefasLista; persisted; change it through minhasTarefas(undefined, page) */
@property({ attribute: false }) page: number | null = null;
/** filter — the name fragment typed to search owners; source entry.params.termo; organism tarefaForm; persisted; change it through buscarResponsaveis(termo) */
@property({ attribute: false }) termo: string | null = null;
/** draft — create-task form (list, title, description, priority, due date, owner, checklist) with the idempotency key generated when the draft starts; prefilled from the params listaId and responsavelId; source salvarNovaTarefa.input; organism tarefaForm */
@property({ attribute: false }) salvarNovaTarefaDraft: SalvarNovaTarefaDraft = emptySalvarNovaTarefaDraft();
/** draft — edit-task form, filled from the open task and again from every record a command returns; source salvarEdicaoTarefa.input; organism tarefaForm */
@property({ attribute: false }) salvarEdicaoTarefaDraft: SalvarEdicaoTarefaDraft = emptySalvarEdicaoTarefaDraft();
/** draft — the reason typed to return a task in review for adjustment; source devolverComMotivo.input; organism tarefaAcoes */
@property({ attribute: false }) devolverComMotivoDraft: DevolverComMotivoDraft = emptyDevolverComMotivoDraft();
/** state pageStatus — status of the page as a whole: loading while the initial loads run, error if one failed, empty when every loaded list is empty, success otherwise */
@property({ attribute: false }) pageStatus: PageStatus = 'idle';
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
/** state minhasTarefasStatus — status of the request minhasTarefas */
@property({ attribute: false }) minhasTarefasStatus: RequestStatus = 'idle';
/** state minhasTarefasError — error of the request minhasTarefas; null when none */
@property({ attribute: false }) minhasTarefasError: ErrorState = null;
/** state tarefaAbertaStatus — status of the request tarefaAberta */
@property({ attribute: false }) tarefaAbertaStatus: RequestStatus = 'idle';
/** state tarefaAbertaError — error of the request tarefaAberta; null when none */
@property({ attribute: false }) tarefaAbertaError: ErrorState = null;
/** state opcoesFormularioStatus — status of the request opcoesFormulario */
@property({ attribute: false }) opcoesFormularioStatus: RequestStatus = 'idle';
/** state opcoesFormularioError — error of the request opcoesFormulario; null when none */
@property({ attribute: false }) opcoesFormularioError: ErrorState = null;
/** state buscarResponsaveisStatus — status of the request buscarResponsaveis */
@property({ attribute: false }) buscarResponsaveisStatus: RequestStatus = 'idle';
/** state buscarResponsaveisError — error of the request buscarResponsaveis; null when none */
@property({ attribute: false }) buscarResponsaveisError: ErrorState = null;
/** state salvarNovaTarefaStatus — status of the command salvarNovaTarefa */
@property({ attribute: false }) salvarNovaTarefaStatus: RequestStatus = 'idle';
/** state salvarNovaTarefaError — error of the command salvarNovaTarefa; null when none */
@property({ attribute: false }) salvarNovaTarefaError: ErrorState = null;
/** state salvarEdicaoTarefaStatus — status of the command salvarEdicaoTarefa */
@property({ attribute: false }) salvarEdicaoTarefaStatus: RequestStatus = 'idle';
/** state salvarEdicaoTarefaError — error of the command salvarEdicaoTarefa; null when none */
@property({ attribute: false }) salvarEdicaoTarefaError: ErrorState = null;
/** state iniciarTarefaStatus — status of the command iniciarTarefa */
@property({ attribute: false }) iniciarTarefaStatus: RequestStatus = 'idle';
/** state iniciarTarefaError — error of the command iniciarTarefa; null when none */
@property({ attribute: false }) iniciarTarefaError: ErrorState = null;
/** state marcarItemChecklistStatus — status of the command marcarItemChecklist */
@property({ attribute: false }) marcarItemChecklistStatus: RequestStatus = 'idle';
/** state marcarItemChecklistError — error of the command marcarItemChecklist; null when none */
@property({ attribute: false }) marcarItemChecklistError: ErrorState = null;
/** state enviarParaRevisaoStatus — status of the command enviarParaRevisao */
@property({ attribute: false }) enviarParaRevisaoStatus: RequestStatus = 'idle';
/** state enviarParaRevisaoError — error of the command enviarParaRevisao; null when none */
@property({ attribute: false }) enviarParaRevisaoError: ErrorState = null;
/** state aceitarEntregaStatus — status of the command aceitarEntrega */
@property({ attribute: false }) aceitarEntregaStatus: RequestStatus = 'idle';
/** state aceitarEntregaError — error of the command aceitarEntrega; null when none */
@property({ attribute: false }) aceitarEntregaError: ErrorState = null;
/** state devolverComMotivoStatus — status of the command devolverComMotivo */
@property({ attribute: false }) devolverComMotivoStatus: RequestStatus = 'idle';
/** state devolverComMotivoError — error of the command devolverComMotivo; null when none */
@property({ attribute: false }) devolverComMotivoError: ErrorState = null;
/** state cancelarTarefaStatus — status of the command cancelarTarefa */
@property({ attribute: false }) cancelarTarefaStatus: RequestStatus = 'idle';
/** state cancelarTarefaError — error of the command cancelarTarefa; null when none */
@property({ attribute: false }) cancelarTarefaError: ErrorState = null;
private tarefaAbertaPending: string | null = null;
private buscarResponsaveisPending: string | null = null;
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.tarefas.minhas_tarefas.${member}`, value);
const param = PERSISTED_PARAM_BY_MEMBER[member];
if (param === undefined) return;
try {
const storageKey = `${STORAGE_PREFIX}${param}`;
if (value === null || value === undefined) {
window.localStorage.removeItem(storageKey);
} else {
window.localStorage.setItem(storageKey, String(value));
}
} catch {
// storage unavailable: the value stays in memory only
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
subscribe([...STATE_KEYS], this);
this.applyEntryParams();
void this.minhasTarefas();
void this.opcoesFormulario();
const selected = this.selectedTarefa;
if (selected !== null) {
void this.tarefaAberta(selected);
}
}
public disconnectedCallback(): void {
unsubscribe([...STATE_KEYS], this);
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (!STATE_KEYS.includes(key)) {
super.handleIcaStateChange(key, value);
return;
}
if (value === undefined) return;
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
this.tarefaAbertaPending = null;
this.buscarResponsaveisPending = null;
this.publish('pageStatus', 'idle');
this.publish('scenary', '');
this.publish('minhasTarefasStatus', 'idle');
this.publish('minhasTarefasError', null);
this.publish('tarefaAbertaStatus', 'idle');
this.publish('tarefaAbertaError', null);
this.publish('opcoesFormularioStatus', 'idle');
this.publish('opcoesFormularioError', null);
this.publish('buscarResponsaveisStatus', 'idle');
this.publish('buscarResponsaveisError', null);
this.publish('salvarNovaTarefaStatus', 'idle');
this.publish('salvarNovaTarefaError', null);
this.publish('salvarEdicaoTarefaStatus', 'idle');
this.publish('salvarEdicaoTarefaError', null);
this.publish('iniciarTarefaStatus', 'idle');
this.publish('iniciarTarefaError', null);
this.publish('marcarItemChecklistStatus', 'idle');
this.publish('marcarItemChecklistError', null);
this.publish('enviarParaRevisaoStatus', 'idle');
this.publish('enviarParaRevisaoError', null);
this.publish('aceitarEntregaStatus', 'idle');
this.publish('aceitarEntregaError', null);
this.publish('devolverComMotivoStatus', 'idle');
this.publish('devolverComMotivoError', null);
this.publish('cancelarTarefaStatus', 'idle');
this.publish('cancelarTarefaError', null);
this.publish('salvarNovaTarefaDraft', emptySalvarNovaTarefaDraft());
this.publish('salvarEdicaoTarefaDraft', emptySalvarEdicaoTarefaDraft());
this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
}
private resetCommandResults(): void {
this.publish('salvarNovaTarefaStatus', 'idle');
this.publish('salvarNovaTarefaError', null);
this.publish('salvarEdicaoTarefaStatus', 'idle');
this.publish('salvarEdicaoTarefaError', null);
this.publish('iniciarTarefaStatus', 'idle');
this.publish('iniciarTarefaError', null);
this.publish('marcarItemChecklistStatus', 'idle');
this.publish('marcarItemChecklistError', null);
this.publish('enviarParaRevisaoStatus', 'idle');
this.publish('enviarParaRevisaoError', null);
this.publish('aceitarEntregaStatus', 'idle');
this.publish('aceitarEntregaError', null);
this.publish('devolverComMotivoStatus', 'idle');
this.publish('devolverComMotivoError', null);
this.publish('cancelarTarefaStatus', 'idle');
this.publish('cancelarTarefaError', null);
}
private readParam(name: string): string | null {
const fromUrl = new URLSearchParams(window.location.search).get(name);
if (fromUrl !== null) return fromUrl;
try {
return window.localStorage.getItem(`${STORAGE_PREFIX}${name}`);
} catch {
return null;
}
}
private readTextParam(name: string): string | null {
const raw = this.readParam(name);
if (raw === null || raw === '') return null;
return raw;
}
private readBooleanParam(name: string): boolean | null {
const raw = this.readParam(name);
if (raw === null || raw === '') return null;
return raw === 'true';
}
private readNumberParam(name: string): number | null {
const raw = this.readParam(name);
if (raw === null || raw === '') return null;
const value = Number(raw);
return Number.isFinite(value) ? value : null;
}
private applyEntryParams(): void {
this.publish('criadasPorMim', this.readBooleanParam('criadasPorMim'));
this.publish('atribuidasAMim', this.readBooleanParam('atribuidasAMim'));
const status = this.readTextParam('status');
this.publish('status', isTarefaStatus(status) ? status : null);
this.publish('somenteDevolvidas', this.readBooleanParam('somenteDevolvidas'));
this.publish('page', this.readNumberParam('page'));
this.publish('termo', this.readTextParam('termo'));
this.publish('selectedTarefa', this.readTextParam('tarefaId'));
const listaId = this.readTextParam('listaId');
const responsavelId = this.readTextParam('responsavelId');
this.publish('salvarNovaTarefaDraft', { ...emptySalvarNovaTarefaDraft(), listaId, responsavelId });
if (this.selectedTarefa === null) {
this.publish('tarefa', null);
}
}
private clientError(code: string, details?: unknown): ErrorState {
if (details === undefined) return { code, message: '' };
return { code, message: '', details };
}
private unexpectedError(error: unknown): ErrorState {
const name = error instanceof Error ? error.name : 'unknown';
return this.clientError('client.unexpected', { name });
}
private startRequest(id: RequestId): void {
this.publish(statusMember(id), 'loading');
this.publish(errorMember(id), null);
}
private failRequest(id: RequestId, error: ErrorState): void {
this.publish(errorMember(id), error ?? this.clientError('client.unexpected', { name: 'noResponse' }));
this.publish(statusMember(id), 'error');
}
private failMissing(id: RequestId, stateKeys: string[]): void {
this.failRequest(id, this.clientError('client.requiredMissing', { stateKeys }));
}
private finishRequest(id: RequestId): void {
this.publish(statusMember(id), 'success');
}
private refreshPageStatus(): void {
const tarefasStatus = this.minhasTarefasStatus;
const opcoesStatus = this.opcoesFormularioStatus;
if (tarefasStatus === 'loading' || opcoesStatus === 'loading') {
this.publish('pageStatus', 'loading');
return;
}
if (tarefasStatus === 'error' || opcoesStatus === 'error') {
this.publish('pageStatus', 'error');
return;
}
if (tarefasStatus === 'success' && opcoesStatus === 'success') {
const rowsEmpty = this.tarefas === null || this.tarefas.items.length === 0;
const empty = rowsEmpty && this.listas.length === 0;
this.publish('pageStatus', empty ? 'empty' : 'success');
return;
}
this.publish('pageStatus', 'loading');
}
/** scene — publishes the visible scene of the page (any string the page uses to name a scene); clears the results of every command */
public setScenario(value: string): void {
this.resetCommandResults();
this.publish('scenary', value);
}
/** draft — replaces the whole create-task form draft (keep chaveCriacao as it came); clears the results of every command */
public setSalvarNovaTarefaDraft(value: SalvarNovaTarefaDraft): void {
this.resetCommandResults();
this.publish('salvarNovaTarefaDraft', value);
}
/** draft — replaces the whole edit-task form draft; clears the results of every command */
public setSalvarEdicaoTarefaDraft(value: SalvarEdicaoTarefaDraft): void {
this.resetCommandResults();
this.publish('salvarEdicaoTarefaDraft', value);
}
/** draft — replaces the return-reason draft; clears the results of every command */
public setDevolverComMotivoDraft(value: DevolverComMotivoDraft): void {
this.resetCommandResults();
this.publish('devolverComMotivoDraft', value);
}
/** draft — clears the create-task form (empty fields) and generates a new idempotency key; clears the results of every command */
public limparSalvarNovaTarefaDraft(): void {
this.resetCommandResults();
this.publish('salvarNovaTarefaDraft', emptySalvarNovaTarefaDraft());
}
/** draft — discards the edits and fills the edit form again from the open task (empty when no task is open); clears the results of every command */
public restaurarSalvarEdicaoTarefaDraft(): void {
this.resetCommandResults();
const tarefa = this.tarefa;
this.publish('salvarEdicaoTarefaDraft', tarefa ? draftFromTarefa(tarefa) : emptySalvarEdicaoTarefaDraft());
}
/** select — selects the task with this id (opens it through tarefaAberta and keeps it in `tarefa`) or clears the selection with null; an empty id publishes client.selectionInvalid in minhasTarefasError */
public async selectTarefa(tarefaId: string | null): Promise<void> {
this.resetCommandResults();
if (tarefaId === null) {
this.tarefaAbertaPending = null;
this.publish('selectedTarefa', null);
this.publish('tarefa', null);
this.publish('tarefaAbertaStatus', 'idle');
this.publish('tarefaAbertaError', null);
this.publish('salvarEdicaoTarefaDraft', emptySalvarEdicaoTarefaDraft());
this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
return;
}
if (tarefaId.trim() === '') {
this.publish('minhasTarefasError', this.clientError('client.selectionInvalid', { tarefaId }));
return;
}
await this.tarefaAberta(tarefaId);
}
/** request minhasTarefas — loads the page of tasks I created or am responsible for, with list, owner and creator names and the derived indicators; redraws tarefas (replace, or append the next page when append is true); filters: values the person changed (null clears one; a filter change loads from the first page); page: the page to load (default: the current page param, or the first page after a filter change); append: true adds the next page to the items ("load more") and never writes the page param; also the method to reload, filter and page the list */
public async minhasTarefas(filters?: TarefasFiltroChange, page?: number, append = false): Promise<void> {
if (this.minhasTarefasStatus === 'loading') return;
const before = this.tarefas;
if (append && (before === null || !before.hasMore)) return;
if (filters) {
this.applyFiltros(filters);
}
let pageToLoad = 1;
if (page !== undefined) {
pageToLoad = page;
} else if (append && before !== null) {
pageToLoad = before.page + 1;
} else if (filters === undefined && this.page !== null) {
pageToLoad = this.page;
}
const input: Input<'tarefas.minhas_tarefas.minhasTarefas'> = {
...(this.criadasPorMim !== null ? { criadasPorMim: this.criadasPorMim } : {}),
...(this.atribuidasAMim !== null ? { atribuidasAMim: this.atribuidasAMim } : {}),
...(this.status !== null ? { status: this.status } : {}),
...(this.somenteDevolvidas !== null ? { somenteDevolvidas: this.somenteDevolvidas } : {}),
page: pageToLoad,
pageSize: PAGE_SIZE,
};
this.startRequest('minhasTarefas');
this.refreshPageStatus();
try {
const response = await execBff<Output<'tarefas.minhas_tarefas.minhasTarefas'>>('tarefas.minhas_tarefas.minhasTarefas', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.failRequest('minhasTarefas', response.error);
this.refreshPageStatus();
return;
}
const loaded = response.data.tarefas;
const current = this.tarefas;
if (append && current !== null) {
this.publish('tarefas', { ...loaded, items: [...current.items, ...loaded.items] });
} else {
this.publish('tarefas', loaded);
this.publish('page', loaded.page);
}
this.finishRequest('minhasTarefas');
this.refreshPageStatus();
} catch (error) {
this.failRequest('minhasTarefas', this.unexpectedError(error));
this.refreshPageStatus();
}
}
private applyFiltros(filters: TarefasFiltroChange): void {
if (filters.criadasPorMim !== undefined) {
this.publish('criadasPorMim', filters.criadasPorMim ? true : null);
}
if (filters.atribuidasAMim !== undefined) {
this.publish('atribuidasAMim', filters.atribuidasAMim ? true : null);
}
if (filters.status !== undefined) {
this.publish('status', filters.status);
}
if (filters.somenteDevolvidas !== undefined) {
this.publish('somenteDevolvidas', filters.somenteDevolvidas ? true : null);
}
}
/** request tarefaAberta — opens a task with names, checklist and history milestones; selects it (selectedTarefa) and redraws tarefa (replace) and the edit form draft (filled from the record); tarefaId: id of the task picked in the list or from a notice */
public async tarefaAberta(tarefaId: string): Promise<void> {
if (this.tarefaAbertaStatus === 'loading' && this.tarefaAbertaPending === tarefaId) return;
this.resetCommandResults();
this.tarefaAbertaPending = tarefaId;
this.publish('selectedTarefa', tarefaId);
this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
this.startRequest('tarefaAberta');
try {
const response = await execBff<Output<'tarefas.minhas_tarefas.tarefaAberta'>>('tarefas.minhas_tarefas.tarefaAberta', { tarefaId }, { mode: 'silent' });
if (this.selectedTarefa !== tarefaId) return;
if (!response.ok || !response.data) {
this.failRequest('tarefaAberta', response.error);
return;
}
this.publish('tarefa', response.data.tarefa);
this.publish('salvarEdicaoTarefaDraft', draftFromTarefa(response.data.tarefa));
this.finishRequest('tarefaAberta');
} catch (error) {
if (this.selectedTarefa !== tarefaId) return;
this.failRequest('tarefaAberta', this.unexpectedError(error));
}
}
/** request opcoesFormulario — loads the active lists that can receive a task, ordered by name; redraws listas (replace); no arguments */
public async opcoesFormulario(): Promise<void> {
if (this.opcoesFormularioStatus === 'loading') return;
this.startRequest('opcoesFormulario');
this.refreshPageStatus();
try {
const response = await execBff<Output<'tarefas.minhas_tarefas.opcoesFormulario'>>('tarefas.minhas_tarefas.opcoesFormulario', {}, { mode: 'silent' });
if (!response.ok || !response.data) {
this.failRequest('opcoesFormulario', response.error);
this.refreshPageStatus();
return;
}
this.publish('listas', response.data.listas);
this.finishRequest('opcoesFormulario');
this.refreshPageStatus();
} catch (error) {
this.failRequest('opcoesFormulario', this.unexpectedError(error));
this.refreshPageStatus();
}
}
/** request buscarResponsaveis — searches active members by name to choose the owner; redraws membros (replace) and records the typed fragment in termo; termo: fragment of the name typed (empty publishes client.requiredMissing and does not call) */
public async buscarResponsaveis(termo: string): Promise<void> {
const value = termo.trim();
if (this.buscarResponsaveisStatus === 'loading' && this.buscarResponsaveisPending === value) return;
this.publish('termo', value === '' ? null : value);
if (value === '') {
this.buscarResponsaveisPending = null;
this.publish('membros', []);
this.failMissing('buscarResponsaveis', ['termo']);
return;
}
this.buscarResponsaveisPending = value;
this.startRequest('buscarResponsaveis');
try {
const response = await execBff<Output<'tarefas.minhas_tarefas.buscarResponsaveis'>>('tarefas.minhas_tarefas.buscarResponsaveis', { termo: value }, { mode: 'silent' });
if (this.termo !== value) return;
if (!response.ok || !response.data) {
this.failRequest('buscarResponsaveis', response.error);
return;
}
this.publish('membros', response.data.membros);
this.finishRequest('buscarResponsaveis');
} catch (error) {
if (this.termo !== value) return;
this.failRequest('buscarResponsaveis', this.unexpectedError(error));
}
}
private belongsToList(resumo: TarefaResumo): boolean {
if (this.status !== null && resumo.status !== this.status) return false;
if (this.somenteDevolvidas === true && resumo.status !== 'emAndamento') return false;
return true;
}
private upsertResumo(resumo: TarefaResumo): void {
const current = this.tarefas;
if (current === null) return;
const exists = current.items.some((item) => item.id === resumo.id);
let items: TarefaResumo[];
if (!this.belongsToList(resumo)) {
items = current.items.filter((item) => item.id !== resumo.id);
} else if (exists) {
items = current.items.map((item) => (item.id === resumo.id ? resumo : item));
} else {
items = [resumo, ...current.items];
}
this.publish('tarefas', { ...current, items });
}
private applyTarefaResult(tarefa: TarefaAberta, resumo: TarefaResumo): void {
this.publish('tarefa', tarefa);
this.publish('selectedTarefa', tarefa.id);
this.publish('salvarEdicaoTarefaDraft', draftFromTarefa(tarefa));
this.upsertResumo(resumo);
}
private currentTarefaRef(id: CommandId): { id: string; version: number } | null {
const tarefa = this.tarefa;
if (!tarefa) {
this.failMissing(id, ['tarefa']);
return null;
}
return { id: tarefa.id, version: tarefa.version };
}
/** request salvarNovaTarefa — creates the task with its initial checklist and assigns it to the chosen owner (the creator is the session member; the idempotency key stays in the draft and is reused on every retry); redraws tarefa (the new task), selectedTarefa, the edit draft, tarefas (the summary row is inserted, or left out when it does not belong to the current filter) and resets the create draft with a new key; no arguments, reads salvarNovaTarefaDraft */
public async salvarNovaTarefa(): Promise<void> {
if (this.salvarNovaTarefaStatus === 'loading') return;
const draft = this.salvarNovaTarefaDraft;
const chaveCriacao = draft.chaveCriacao ?? '';
const listaId = draft.listaId ?? '';
const titulo = (draft.titulo ?? '').trim();
const prioridade = draft.prioridade;
const prazo = draft.prazo ?? '';
const responsavelId = draft.responsavelId ?? '';
const missing: string[] = [];
if (chaveCriacao === '') missing.push('salvarNovaTarefaDraft.chaveCriacao');
if (listaId === '') missing.push('salvarNovaTarefaDraft.listaId');
if (titulo === '') missing.push('salvarNovaTarefaDraft.titulo');
if (prioridade === null) missing.push('salvarNovaTarefaDraft.prioridade');
if (prazo === '') missing.push('salvarNovaTarefaDraft.prazo');
if (responsavelId === '') missing.push('salvarNovaTarefaDraft.responsavelId');
if (missing.length > 0 || prioridade === null) {
this.failMissing('salvarNovaTarefa', missing);
return;
}
const descricao = (draft.details.descricao ?? '').trim();
const checklist = checklistInput(draft.checklist);
const input: Input<'tarefas.minhas_tarefas.salvarNovaTarefa'> = {
chaveCriacao,
listaId,
titulo,
details: descricao !== '' ? { descricao } : {},
prioridade,
prazo,
responsavelId,
criadorId: '',
...(checklist.length > 0 ? { checklist } : {}),
};
this.startRequest('salvarNovaTarefa');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.salvarNovaTarefa'>>('tarefas.minhas_tarefas.salvarNovaTarefa', input, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('salvarNovaTarefa', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('salvarNovaTarefa', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.publish('salvarNovaTarefaDraft', emptySalvarNovaTarefaDraft());
this.finishRequest('salvarNovaTarefa');
} catch (error) {
this.failRequest('salvarNovaTarefa', this.unexpectedError(error));
}
}
/** request salvarEdicaoTarefa — saves the edit of the open task (fields, owner change, checklist; never changes the situation); redraws tarefa and the edit draft from the returned record and upserts the row in tarefas; no arguments, reads salvarEdicaoTarefaDraft (id and version come with it) */
public async salvarEdicaoTarefa(): Promise<void> {
if (this.salvarEdicaoTarefaStatus === 'loading') return;
const draft = this.salvarEdicaoTarefaDraft;
const id = draft.id ?? '';
const version = draft.version;
const listaId = draft.listaId ?? '';
const titulo = (draft.titulo ?? '').trim();
const prioridade = draft.prioridade;
const prazo = draft.prazo ?? '';
const responsavelId = draft.responsavelId ?? '';
const missing: string[] = [];
if (id === '') missing.push('salvarEdicaoTarefaDraft.id');
if (version === null) missing.push('salvarEdicaoTarefaDraft.version');
if (listaId === '') missing.push('salvarEdicaoTarefaDraft.listaId');
if (titulo === '') missing.push('salvarEdicaoTarefaDraft.titulo');
if (prioridade === null) missing.push('salvarEdicaoTarefaDraft.prioridade');
if (prazo === '') missing.push('salvarEdicaoTarefaDraft.prazo');
if (responsavelId === '') missing.push('salvarEdicaoTarefaDraft.responsavelId');
if (missing.length > 0 || version === null || prioridade === null) {
this.failMissing('salvarEdicaoTarefa', missing);
return;
}
const descricao = (draft.details.descricao ?? '').trim();
const input: Input<'tarefas.minhas_tarefas.salvarEdicaoTarefa'> = {
id,
version,
listaId,
titulo,
details: descricao !== '' ? { descricao } : {},
prioridade,
prazo,
responsavelId,
checklist: checklistInput(draft.checklist),
};
this.startRequest('salvarEdicaoTarefa');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.salvarEdicaoTarefa'>>('tarefas.minhas_tarefas.salvarEdicaoTarefa', input, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('salvarEdicaoTarefa', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('salvarEdicaoTarefa', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.finishRequest('salvarEdicaoTarefa');
} catch (error) {
this.failRequest('salvarEdicaoTarefa', this.unexpectedError(error));
}
}
/** request iniciarTarefa — starts the open task (a fazer → em andamento; only the owner); redraws tarefa, the edit draft and upserts the row in tarefas; no arguments, uses the open task and its version */
public async iniciarTarefa(): Promise<void> {
if (this.iniciarTarefaStatus === 'loading') return;
const ref = this.currentTarefaRef('iniciarTarefa');
if (!ref) return;
this.startRequest('iniciarTarefa');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.iniciarTarefa'>>('tarefas.minhas_tarefas.iniciarTarefa', { id: ref.id, version: ref.version }, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('iniciarTarefa', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('iniciarTarefa', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.finishRequest('iniciarTarefa');
} catch (error) {
this.failRequest('iniciarTarefa', this.unexpectedError(error));
}
}
/** request marcarItemChecklist — checks or unchecks one checklist item of the open task (the situation never changes); redraws tarefa (checklist and progress), the edit draft and upserts the row in tarefas; itemId: id of the checklist item of the open task; feito: the new state of the item */
public async marcarItemChecklist(itemId: string, feito: boolean): Promise<void> {
if (this.marcarItemChecklistStatus === 'loading') return;
const item = this.tarefa?.checklist.find((candidate) => candidate.id === itemId);
if (!item) {
this.failMissing('marcarItemChecklist', ['tarefa']);
return;
}
this.startRequest('marcarItemChecklist');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.marcarItemChecklist'>>('tarefas.minhas_tarefas.marcarItemChecklist', { id: item.id, version: item.version, feito }, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('marcarItemChecklist', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('marcarItemChecklist', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.finishRequest('marcarItemChecklist');
} catch (error) {
this.failRequest('marcarItemChecklist', this.unexpectedError(error));
}
}
/** request enviarParaRevisao — sends or resends the open task to the creator's review (em andamento → em revisão; only the owner); redraws tarefa, the edit draft and upserts the row in tarefas; no arguments, uses the open task and its version */
public async enviarParaRevisao(): Promise<void> {
if (this.enviarParaRevisaoStatus === 'loading') return;
const ref = this.currentTarefaRef('enviarParaRevisao');
if (!ref) return;
this.startRequest('enviarParaRevisao');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.enviarParaRevisao'>>('tarefas.minhas_tarefas.enviarParaRevisao', { id: ref.id, version: ref.version }, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('enviarParaRevisao', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('enviarParaRevisao', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.finishRequest('enviarParaRevisao');
} catch (error) {
this.failRequest('enviarParaRevisao', this.unexpectedError(error));
}
}
/** request aceitarEntrega — accepts the delivery of the open task in review, concluding it (only the creator); redraws tarefa, the edit draft and upserts the row in tarefas (removed from the list when it no longer matches the status filter); no arguments, uses the open task and its version */
public async aceitarEntrega(): Promise<void> {
if (this.aceitarEntregaStatus === 'loading') return;
const ref = this.currentTarefaRef('aceitarEntrega');
if (!ref) return;
this.startRequest('aceitarEntrega');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.aceitarEntrega'>>('tarefas.minhas_tarefas.aceitarEntrega', { id: ref.id, version: ref.version }, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('aceitarEntrega', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('aceitarEntrega', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.finishRequest('aceitarEntrega');
} catch (error) {
this.failRequest('aceitarEntrega', this.unexpectedError(error));
}
}
/** request devolverComMotivo — returns the open task in review to the owner for adjustment with a reason (only the creator; empty reason publishes client.requiredMissing and does not call); redraws tarefa (reason and date), the edit draft and upserts the row in tarefas, then clears devolverComMotivoDraft; no arguments, reads devolverComMotivoDraft */
public async devolverComMotivo(): Promise<void> {
if (this.devolverComMotivoStatus === 'loading') return;
const ref = this.currentTarefaRef('devolverComMotivo');
if (!ref) return;
const motivoDevolucao = (this.devolverComMotivoDraft.details.motivoDevolucao ?? '').trim();
if (motivoDevolucao === '') {
this.failMissing('devolverComMotivo', ['devolverComMotivoDraft.details.motivoDevolucao']);
return;
}
this.startRequest('devolverComMotivo');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.devolverComMotivo'>>('tarefas.minhas_tarefas.devolverComMotivo', { id: ref.id, version: ref.version, details: { motivoDevolucao } }, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('devolverComMotivo', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('devolverComMotivo', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
this.finishRequest('devolverComMotivo');
} catch (error) {
this.failRequest('devolverComMotivo', this.unexpectedError(error));
}
}
/** request cancelarTarefa — cancels the open task that I created (only the creator, only while not concluded); redraws tarefa, the edit draft and upserts the row in tarefas (removed from the list when it no longer matches the status filter); no arguments, uses the open task and its version */
public async cancelarTarefa(): Promise<void> {
if (this.cancelarTarefaStatus === 'loading') return;
const ref = this.currentTarefaRef('cancelarTarefa');
if (!ref) return;
this.startRequest('cancelarTarefa');
try {
const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.minhas_tarefas.cancelarTarefa'>>('tarefas.minhas_tarefas.cancelarTarefa', { id: ref.id, version: ref.version }, { mode: 'blocking', signal }));
if (!response) {
this.failRequest('cancelarTarefa', this.clientError('client.unexpected', { name: 'aborted' }));
return;
}
if (!response.ok || !response.data) {
this.failRequest('cancelarTarefa', response.error);
return;
}
this.applyTarefaResult(response.data.tarefa, response.data.resumo);
this.finishRequest('cancelarTarefa');
} catch (error) {
this.failRequest('cancelarTarefa', this.unexpectedError(error));
}
}
}
