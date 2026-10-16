/// <mls fileReference="_102047_/l2/tarefas/web/shared/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type { Meus_avisosContracts, AvisoResumoDetalhes, AvisoResumo, TarefaResumo, TarefaAviso, AvisoDetalheDetalhes, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';
export type { Meus_avisosContracts, AvisoResumoDetalhes, AvisoResumo, TarefaResumo, TarefaAviso, AvisoDetalheDetalhes, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';
type Input<R extends keyof Meus_avisosContracts> = Meus_avisosContracts[R]['input'];
type Output<R extends keyof Meus_avisosContracts> = Meus_avisosContracts[R]['output'];
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type AvisosPage = Output<'tarefas.meus_avisos.carregarMeusAvisos'>['avisos'];
type StateMember =
| 'avisos'
| 'avisoAberto'
| 'selectedAvisoVencimento'
| 'page'
| 'pageStatus'
| 'carregarMeusAvisosStatus'
| 'carregarMeusAvisosError'
| 'abrirAvisoStatus'
| 'abrirAvisoError'
| 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.tarefas.meus_avisos.avisos': 'avisos',
'ui.tarefas.meus_avisos.avisoAberto': 'avisoAberto',
'ui.tarefas.meus_avisos.selectedAvisoVencimento': 'selectedAvisoVencimento',
'ui.tarefas.meus_avisos.page': 'page',
'ui.tarefas.meus_avisos.pageStatus': 'pageStatus',
'ui.tarefas.meus_avisos.carregarMeusAvisosStatus': 'carregarMeusAvisosStatus',
'ui.tarefas.meus_avisos.carregarMeusAvisosError': 'carregarMeusAvisosError',
'ui.tarefas.meus_avisos.abrirAvisoStatus': 'abrirAvisoStatus',
'ui.tarefas.meus_avisos.abrirAvisoError': 'abrirAvisoError',
'ui.tarefas.meus_avisos.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
/** persisted members and the entry param name each one is stored under */
const PERSISTED_PARAM_BY_MEMBER: Partial<Record<StateMember, string>> = {
page: 'page',
selectedAvisoVencimento: 'avisoVencimentoId',
};
const PAGE_SIZE = 20;
function emptyAvisosPage(): AvisosPage {
return { items: [], page: 1, pageSize: PAGE_SIZE, hasMore: false };
}
export class TarefasMeus_avisosShared extends StateLitElement {
/** state avisos — the page of daily notices (list and send history), each with totals and send dates; source carregarMeusAvisos.avisos; organisms historicoAvisos, listaAvisos */
@property({ attribute: false }) avisos: AvisosPage = emptyAvisosPage();
/** state avisoAberto — the open notice with its due-today or overdue task rows; source carregarMeusAvisos.avisoAberto; organism detalheAviso */
@property({ attribute: false }) avisoAberto: AvisoDetalhe | null = null;
/** state selectedAvisoVencimento — id of the notice the person selected (the record itself is avisoAberto); source entry.params.avisoVencimentoId; organisms detalheAviso, listaAvisos; persisted */
@property({ attribute: false }) selectedAvisoVencimento: string | null = null;
/** state page — the page of the list the person went to with a pager (completed gap: no state held the page filter); source entry.params.page; organism listaAvisos; persisted */
@property({ attribute: false }) page: number | null = null;
/** state pageStatus — overall status of the page: loading while the initial load runs, empty when there are no notices, error if it failed; source page runtime */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state carregarMeusAvisosStatus — status of the request carregarMeusAvisos; source request runtime */
@property({ attribute: false }) carregarMeusAvisosStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state carregarMeusAvisosError — error of the request carregarMeusAvisos, null when none; source request runtime */
@property({ attribute: false }) carregarMeusAvisosError: ErrorState = null;
/** state abrirAvisoStatus — status of the request abrirAviso; source request runtime */
@property({ attribute: false }) abrirAvisoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state abrirAvisoError — error of the request abrirAviso, null when none; source request runtime */
@property({ attribute: false }) abrirAvisoError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.tarefas.meus_avisos.${member}`, value);
const param = PERSISTED_PARAM_BY_MEMBER[member];
if (param) {
try {
const storageKey = `tarefas.meus_avisos.${param}`;
if (value === null || value === undefined) {
localStorage.removeItem(storageKey);
} else {
localStorage.setItem(storageKey, String(value));
}
} catch {
// storage unavailable: ignore
}
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
void this.startVisit();
}
public disconnectedCallback(): void {
unsubscribe([...STATE_KEYS], this);
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
private hydrateData(): void {
const avisos = getState('ui.tarefas.meus_avisos.avisos');
if (avisos !== undefined) this.assignState('ui.tarefas.meus_avisos.avisos', avisos);
const aberto = getState('ui.tarefas.meus_avisos.avisoAberto');
if (aberto !== undefined) this.assignState('ui.tarefas.meus_avisos.avisoAberto', aberto);
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('carregarMeusAvisosStatus', 'idle');
this.publish('carregarMeusAvisosError', null);
this.publish('abrirAvisoStatus', 'idle');
this.publish('abrirAvisoError', null);
this.publish('scenary', '');
}
private readParam(name: string): string | null {
const fromUrl = new URLSearchParams(window.location.search).get(name);
if (fromUrl !== null && fromUrl !== '') return fromUrl;
try {
const stored = localStorage.getItem(`tarefas.meus_avisos.${name}`);
if (stored !== null && stored !== '') return stored;
} catch {
// storage unavailable: ignore
}
return null;
}
private applyEntryParams(): void {
const rawPage = this.readParam('page');
let pageValue: number | null = null;
if (rawPage !== null) {
const parsed = Number(rawPage);
if (Number.isFinite(parsed) && parsed >= 1) pageValue = parsed;
}
this.publish('page', pageValue);
const selected = this.readParam('avisoVencimentoId') ?? this.readParam('avisoId');
this.publish('selectedAvisoVencimento', selected);
}
private async startVisit(): Promise<void> {
await this.carregarMeusAvisos();
const selected = this.selectedAvisoVencimento;
if (selected !== null && selected !== '' && this.avisoAberto?.id !== selected) {
await this.abrirAviso(selected);
}
}
private unexpectedError(error: unknown): ErrorState {
return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
}
/** scene — publishes the visible scene of the page (any string; '' for none) */
public setScenario(value: string): void {
this.publish('scenary', value);
}
/** request carregarMeusAvisos — opens the page: the paged list of the session user's daily notices (also the send history) and the latest notice already open with its tasks; redraws avisos (replace, or append the next page when append is true; page/hasMore stay in the list), avisoAberto (replace, only when no notice is selected and not appending) and page (the page the person went to with a pager, only when not appending); also the method to reload and to page the list. page: page to load (omit to use the stored page, or the first); append: true adds the next page to the items (only when the list says hasMore) */
public async carregarMeusAvisos(page?: number, append = false): Promise<void> {
if (this.carregarMeusAvisosStatus === 'loading') return;
let target = page ?? this.page ?? 1;
if (append) {
if (!this.avisos.hasMore) return;
target = this.avisos.page + 1;
}
this.publish('carregarMeusAvisosStatus', 'loading');
this.publish('carregarMeusAvisosError', null);
this.publish('pageStatus', 'loading');
// responsavelId: entry param read by name (url or storage); the backend fills it from the session when absent
const responsavelId = this.readParam('responsavelId') ?? '';
const input: Input<'tarefas.meus_avisos.carregarMeusAvisos'> = {
responsavelId,
page: target,
pageSize: PAGE_SIZE,
};
try {
const response = await execBff<Output<'tarefas.meus_avisos.carregarMeusAvisos'>>('tarefas.meus_avisos.carregarMeusAvisos', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('carregarMeusAvisosError', response.error ?? this.unexpectedError(null));
this.publish('carregarMeusAvisosStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
const output = response.data;
if (append) {
this.publish('avisos', {
items: [...this.avisos.items, ...output.avisos.items],
page: output.avisos.page,
pageSize: output.avisos.pageSize,
hasMore: output.avisos.hasMore,
});
} else {
this.publish('avisos', output.avisos);
if (page !== undefined) this.publish('page', page);
if (this.selectedAvisoVencimento === null) {
this.publish('avisoAberto', output.avisoAberto ?? null);
}
}
this.publish('carregarMeusAvisosStatus', 'success');
this.publish('pageStatus', this.avisos.items.length === 0 ? 'empty' : 'success');
} catch (error) {
this.publish('carregarMeusAvisosError', this.unexpectedError(error));
this.publish('carregarMeusAvisosStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** request abrirAviso — select a notice of the list and load it with its task rows; redraws avisoAberto (replace) and selectedAvisoVencimento (the id, persisted). avisoId: id of the notice picked in the list; null clears the selection (no call) */
public async abrirAviso(avisoId: string | null): Promise<void> {
if (avisoId === null) {
this.publish('selectedAvisoVencimento', null);
this.publish('abrirAvisoStatus', 'idle');
this.publish('abrirAvisoError', null);
return;
}
if (this.abrirAvisoStatus === 'loading') return;
if (avisoId === '') {
this.publish('abrirAvisoError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['ui.tarefas.meus_avisos.selectedAvisoVencimento'] } });
this.publish('abrirAvisoStatus', 'error');
return;
}
this.publish('abrirAvisoStatus', 'loading');
this.publish('abrirAvisoError', null);
const input: Input<'tarefas.meus_avisos.abrirAviso'> = { avisoId };
try {
const response = await execBff<Output<'tarefas.meus_avisos.abrirAviso'>>('tarefas.meus_avisos.abrirAviso', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('abrirAvisoError', response.error ?? this.unexpectedError(null));
this.publish('abrirAvisoStatus', 'error');
return;
}
this.publish('avisoAberto', response.data.aviso);
this.publish('selectedAvisoVencimento', avisoId);
this.publish('abrirAvisoStatus', 'success');
} catch (error) {
this.publish('abrirAvisoError', this.unexpectedError(error));
this.publish('abrirAvisoStatus', 'error');
}
}
}
