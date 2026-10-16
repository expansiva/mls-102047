/// <mls fileReference="_102047_/l2/tarefas/web/shared/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Tarefas_equipeContracts, ListaResumo, MembroResumo, TarefaDetalhe, TarefaQuadroItem } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';

export type { Tarefas_equipeContracts, MembroIdentificacao, MembroDetalhes, MembroResumo, ListaResumo, TarefaQuadroDetails, TarefaQuadroItem, ItemChecklistDetails, ItemChecklistLinha, TarefaPaiResumo, TarefaDetalheDetails, TarefaDetalhe } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';

type Route = keyof Tarefas_equipeContracts;
type Input<R extends Route> = Tarefas_equipeContracts[R]['input'];
type Output<R extends Route> = Tarefas_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type TarefaStatus = TarefaQuadroItem['status'];
export type TarefaPrioridade = TarefaQuadroItem['prioridade'];
export type TarefasPage = Output<'tarefas.tarefas_equipe.qryTarefasEquipe'>['tarefas'];

/** Draft of the reassignment form: the member chosen as the new responsible. */
export type ReatribuirTarefaDraft = { responsavelId: string | null };

function emptyReatribuirTarefaDraft(): ReatribuirTarefaDraft {
  return { responsavelId: null };
}

const PAGE_SIZE = 20;
const STATUS_VALUES: readonly TarefaStatus[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const PRIORIDADE_VALUES: readonly TarefaPrioridade[] = ['low', 'medium', 'high'];

function isStatus(value: string): value is TarefaStatus {
  return STATUS_VALUES.some(item => item === value);
}

function isPrioridade(value: string): value is TarefaPrioridade {
  return PRIORIDADE_VALUES.some(item => item === value);
}

function blank(value: string | null): string | null {
  if (value === null || value === '') return null;
  return value;
}

// every state and status member, and nothing else
type StateMember =
  | 'tarefas'
  | 'listas'
  | 'membros'
  | 'tarefa'
  | 'selectedTarefa'
  | 'filtroListaId'
  | 'filtroResponsavelId'
  | 'filtroPrioridade'
  | 'filtroPrazo'
  | 'filtroStatus'
  | 'filtroTitulo'
  | 'filtroPagina'
  | 'filtroNomeMembro'
  | 'filtroSomenteAtivos'
  | 'cmdReatribuirTarefaDraft'
  | 'pageStatus'
  | 'qryTarefasEquipeStatus'
  | 'qryTarefasEquipeError'
  | 'qryListasFiltroStatus'
  | 'qryListasFiltroError'
  | 'qryBuscarMembrosStatus'
  | 'qryBuscarMembrosError'
  | 'qryDetalheTarefaStatus'
  | 'qryDetalheTarefaError'
  | 'cmdReatribuirTarefaStatus'
  | 'cmdReatribuirTarefaError'
  | 'cmdCancelarTarefaStatus'
  | 'cmdCancelarTarefaError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.tarefas_equipe.tarefas': 'tarefas',
  'ui.tarefas.tarefas_equipe.listas': 'listas',
  'ui.tarefas.tarefas_equipe.membros': 'membros',
  'ui.tarefas.tarefas_equipe.tarefa': 'tarefa',
  'ui.tarefas.tarefas_equipe.selectedTarefa': 'selectedTarefa',
  'ui.tarefas.tarefas_equipe.filtroListaId': 'filtroListaId',
  'ui.tarefas.tarefas_equipe.filtroResponsavelId': 'filtroResponsavelId',
  'ui.tarefas.tarefas_equipe.filtroPrioridade': 'filtroPrioridade',
  'ui.tarefas.tarefas_equipe.filtroPrazo': 'filtroPrazo',
  'ui.tarefas.tarefas_equipe.filtroStatus': 'filtroStatus',
  'ui.tarefas.tarefas_equipe.filtroTitulo': 'filtroTitulo',
  'ui.tarefas.tarefas_equipe.filtroPagina': 'filtroPagina',
  'ui.tarefas.tarefas_equipe.filtroNomeMembro': 'filtroNomeMembro',
  'ui.tarefas.tarefas_equipe.filtroSomenteAtivos': 'filtroSomenteAtivos',
  'ui.tarefas.tarefas_equipe.cmdReatribuirTarefaDraft': 'cmdReatribuirTarefaDraft',
  'ui.tarefas.tarefas_equipe.pageStatus': 'pageStatus',
  'ui.tarefas.tarefas_equipe.qryTarefasEquipeStatus': 'qryTarefasEquipeStatus',
  'ui.tarefas.tarefas_equipe.qryTarefasEquipeError': 'qryTarefasEquipeError',
  'ui.tarefas.tarefas_equipe.qryListasFiltroStatus': 'qryListasFiltroStatus',
  'ui.tarefas.tarefas_equipe.qryListasFiltroError': 'qryListasFiltroError',
  'ui.tarefas.tarefas_equipe.qryBuscarMembrosStatus': 'qryBuscarMembrosStatus',
  'ui.tarefas.tarefas_equipe.qryBuscarMembrosError': 'qryBuscarMembrosError',
  'ui.tarefas.tarefas_equipe.qryDetalheTarefaStatus': 'qryDetalheTarefaStatus',
  'ui.tarefas.tarefas_equipe.qryDetalheTarefaError': 'qryDetalheTarefaError',
  'ui.tarefas.tarefas_equipe.cmdReatribuirTarefaStatus': 'cmdReatribuirTarefaStatus',
  'ui.tarefas.tarefas_equipe.cmdReatribuirTarefaError': 'cmdReatribuirTarefaError',
  'ui.tarefas.tarefas_equipe.cmdCancelarTarefaStatus': 'cmdCancelarTarefaStatus',
  'ui.tarefas.tarefas_equipe.cmdCancelarTarefaError': 'cmdCancelarTarefaError',
  'ui.tarefas.tarefas_equipe.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

// persisted states and the entry param each one is stored under (localStorage key tarefas.tarefas_equipe.<param>)
const PERSIST_PARAM: Partial<Record<StateMember, string>> = {
  filtroListaId: 'listaId',
  filtroResponsavelId: 'responsavelId',
  filtroPrioridade: 'prioridade',
  filtroPrazo: 'prazo',
  filtroStatus: 'status',
  filtroTitulo: 'titulo',
  filtroPagina: 'page',
  filtroNomeMembro: 'name',
  filtroSomenteAtivos: 'somenteAtivos',
  selectedTarefa: 'tarefaId',
};

export class TarefasTarefas_equipeShared extends StateLitElement {
  /** state tarefas — page of the team task board rows (items, page, pageSize, hasMore); source qryTarefasEquipe.tarefas; organism quadroTarefasEquipe */
  @property({ attribute: false }) tarefas: TarefasPage | null = null;

  /** state listas — lists (id and name) offered by the list filter; source qryListasFiltro.listas; organism quadroTarefasEquipe */
  @property({ attribute: false }) listas: ListaResumo[] = [];

  /** state membros — team members found by name, used as responsible option (reassignment) or responsible filter; source qryBuscarMembros.membros; organisms acoesGestorTarefa, quadroTarefasEquipe */
  @property({ attribute: false }) membros: MembroResumo[] = [];

  /** state tarefa — the selected task in full (list, responsible, creator, parent task, checklist, history milestones, version); source qryDetalheTarefa.tarefa; organisms acoesGestorTarefa, detalheTarefa, historicoTarefa */
  @property({ attribute: false }) tarefa: TarefaDetalhe | null = null;

  /** state selectedTarefa — id of the task chosen on the board (the record itself is in tarefa); source entry.params.tarefaId; organisms detalheTarefa, quadroTarefasEquipe; persisted */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state filtroListaId — id of the list the board is filtered/selected by, null for all lists; source entry.params.listaId; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroListaId: string | null = null;

  /** state filtroResponsavelId — id of the responsible member the board is filtered by, null for all; source entry.params.responsavelId; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroResponsavelId: string | null = null;

  /** state filtroPrioridade — priority the board is filtered by, null for all; source entry.params.prioridade; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroPrioridade: TarefaPrioridade | null = null;

  /** state filtroPrazo — due date the board is filtered by (date string), null for any; source entry.params.prazo; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroPrazo: string | null = null;

  /** state filtroStatus — situations the board is filtered by, empty for all; source entry.params.status; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroStatus: TarefaStatus[] = [];

  /** state filtroTitulo — title fragment searched on the board, null for none; source entry.params.titulo; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroTitulo: string | null = null;

  /** state filtroPagina — page of the board the person went to with a pager (a load more never writes it); source entry.params.page; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroPagina: number | null = null;

  /** state filtroNomeMembro — name fragment typed to search members; source entry.params.name; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroNomeMembro: string | null = null;

  /** state filtroSomenteAtivos — true to search only active members (new responsible choice); source entry.params.somenteAtivos; organism quadroTarefasEquipe; persisted */
  @property({ attribute: false }) filtroSomenteAtivos: boolean | null = null;

  /** state cmdReatribuirTarefaDraft — draft of the reassignment form (the member chosen as new responsible); source cmdReatribuirTarefa.input; organism acoesGestorTarefa */
  @property({ attribute: false }) cmdReatribuirTarefaDraft: ReatribuirTarefaDraft = emptyReatribuirTarefaDraft();

  /** state pageStatus — overall status of the page load: idle, loading, empty, success or error */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state qryTarefasEquipeStatus — status of the board load */
  @property({ attribute: false }) qryTarefasEquipeStatus: RequestStatus = 'idle';

  /** state qryTarefasEquipeError — error of the board load, null when none */
  @property({ attribute: false }) qryTarefasEquipeError: ErrorState = null;

  /** state qryListasFiltroStatus — status of the list filter options load */
  @property({ attribute: false }) qryListasFiltroStatus: RequestStatus = 'idle';

  /** state qryListasFiltroError — error of the list filter options load (also client.selectionInvalid of a list selection), null when none */
  @property({ attribute: false }) qryListasFiltroError: ErrorState = null;

  /** state qryBuscarMembrosStatus — status of the member search */
  @property({ attribute: false }) qryBuscarMembrosStatus: RequestStatus = 'idle';

  /** state qryBuscarMembrosError — error of the member search, null when none */
  @property({ attribute: false }) qryBuscarMembrosError: ErrorState = null;

  /** state qryDetalheTarefaStatus — status of the selected task detail load */
  @property({ attribute: false }) qryDetalheTarefaStatus: RequestStatus = 'idle';

  /** state qryDetalheTarefaError — error of the selected task detail load, null when none */
  @property({ attribute: false }) qryDetalheTarefaError: ErrorState = null;

  /** state cmdReatribuirTarefaStatus — status of the reassignment command; success stays until the person changes something */
  @property({ attribute: false }) cmdReatribuirTarefaStatus: RequestStatus = 'idle';

  /** state cmdReatribuirTarefaError — error of the reassignment command, null when none */
  @property({ attribute: false }) cmdReatribuirTarefaError: ErrorState = null;

  /** state cmdCancelarTarefaStatus — status of the cancel command; success stays until the person changes something */
  @property({ attribute: false }) cmdCancelarTarefaStatus: RequestStatus = 'idle';

  /** state cmdCancelarTarefaError — error of the cancel command, null when none */
  @property({ attribute: false }) cmdCancelarTarefaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.tarefas_equipe.${member}`, value);
    const param = PERSIST_PARAM[member];
    if (param !== undefined) {
      try {
        const storageKey = `tarefas.tarefas_equipe.${param}`;
        const raw = this.serializeParam(value);
        if (raw === null) {
          window.localStorage.removeItem(storageKey);
        } else {
          window.localStorage.setItem(storageKey, raw);
        }
      } catch {
        // storage unavailable: the value stays in memory only
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private serializeParam(value: unknown): string | null {
    if (value === null || value === undefined) return null;
    if (Array.isArray(value)) return value.length > 0 ? value.join(',') : null;
    if (typeof value === 'string') return value === '' ? null : value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return null;
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = window.localStorage.getItem(`tarefas.tarefas_equipe.${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.hydrateData();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    if (this.selectedTarefa === null) this.publish('tarefa', null);
    void this.qryTarefasEquipe(this.filtroPagina ?? 1, false);
    void this.qryListasFiltro();
    if (this.selectedTarefa !== null) void this.qryDetalheTarefa();
  }

  public disconnectedCallback(): void {
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!(key in STATE_MEMBER_BY_KEY)) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  private hydrateData(): void {
    const dataKeys = [
      'ui.tarefas.tarefas_equipe.tarefas',
      'ui.tarefas.tarefas_equipe.listas',
      'ui.tarefas.tarefas_equipe.membros',
      'ui.tarefas.tarefas_equipe.tarefa',
    ];
    for (const key of dataKeys) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('qryTarefasEquipeStatus', 'idle');
    this.publish('qryTarefasEquipeError', null);
    this.publish('qryListasFiltroStatus', 'idle');
    this.publish('qryListasFiltroError', null);
    this.publish('qryBuscarMembrosStatus', 'idle');
    this.publish('qryBuscarMembrosError', null);
    this.publish('qryDetalheTarefaStatus', 'idle');
    this.publish('qryDetalheTarefaError', null);
    this.publish('cmdReatribuirTarefaStatus', 'idle');
    this.publish('cmdReatribuirTarefaError', null);
    this.publish('cmdCancelarTarefaStatus', 'idle');
    this.publish('cmdCancelarTarefaError', null);
    this.publish('cmdReatribuirTarefaDraft', emptyReatribuirTarefaDraft());
  }

  private resetCommandResults(): void {
    this.publish('cmdReatribuirTarefaStatus', 'idle');
    this.publish('cmdReatribuirTarefaError', null);
    this.publish('cmdCancelarTarefaStatus', 'idle');
    this.publish('cmdCancelarTarefaError', null);
  }

  private applyEntryParams(): void {
    this.publish('filtroListaId', this.readParam('listaId'));
    this.publish('filtroResponsavelId', this.readParam('responsavelId'));
    const prioridade = this.readParam('prioridade');
    this.publish('filtroPrioridade', prioridade !== null && isPrioridade(prioridade) ? prioridade : null);
    this.publish('filtroPrazo', this.readParam('prazo'));
    const statusRaw = this.readParam('status');
    this.publish('filtroStatus', statusRaw === null ? [] : statusRaw.split(',').filter(isStatus));
    this.publish('filtroTitulo', this.readParam('titulo'));
    const pageRaw = this.readParam('page');
    const pageNumber = pageRaw === null ? Number.NaN : Number(pageRaw);
    this.publish('filtroPagina', Number.isFinite(pageNumber) && pageNumber >= 1 ? pageNumber : null);
    this.publish('filtroNomeMembro', this.readParam('name'));
    const somenteAtivosRaw = this.readParam('somenteAtivos');
    this.publish('filtroSomenteAtivos', somenteAtivosRaw === null ? null : somenteAtivosRaw === 'true');
    this.publish('selectedTarefa', this.readParam('tarefaId'));
  }

  private refreshPageStatus(): void {
    const board = this.qryTarefasEquipeStatus;
    const options = this.qryListasFiltroStatus;
    if (board === 'loading' || options === 'loading') {
      this.publish('pageStatus', 'loading');
      return;
    }
    if (board === 'error' || options === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    if (board === 'success' && options === 'success') {
      const boardEmpty = (this.tarefas?.items.length ?? 0) === 0;
      const optionsEmpty = this.listas.length === 0;
      this.publish('pageStatus', boardEmpty && optionsEmpty ? 'empty' : 'success');
    }
  }

  /** getter lista — the list currently selected as filter (row of listas with id filtroListaId), null when none or not loaded */
  public get lista(): ListaResumo | null {
    const found = this.listas.find(item => item.id === this.filtroListaId);
    return found ?? null;
  }

  /** setScenario — publishes the visible scene of the page (value: scene name) */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** setCmdReatribuirTarefaDraft — draft: replaces the reassignment form draft (responsavelId = id of the member chosen from membros) */
  public setCmdReatribuirTarefaDraft(value: ReatribuirTarefaDraft): void {
    this.resetCommandResults();
    this.publish('cmdReatribuirTarefaDraft', value);
  }

  /** selecionarTarefa — select: chooses the task whose detail and actions are shown (id of a board row) or clears the selection (null); loads the detail into tarefa and empties the reassignment draft */
  public selecionarTarefa(id: string | null): void {
    this.resetCommandResults();
    this.publish('cmdReatribuirTarefaDraft', emptyReatribuirTarefaDraft());
    const value = blank(id);
    this.publish('selectedTarefa', value);
    if (value === null) {
      this.publish('tarefa', null);
      this.publish('qryDetalheTarefaStatus', 'idle');
      this.publish('qryDetalheTarefaError', null);
      return;
    }
    void this.qryDetalheTarefa();
  }

  /** selecionarLista — select: selects a list from listas as the board filter (id) or clears it (null); an id not found in the loaded listas publishes client.selectionInvalid in qryListasFiltroError; reloads the board from the first page */
  public async selecionarLista(id: string | null): Promise<void> {
    const value = blank(id);
    if (value !== null && this.listas.length > 0 && !this.listas.some(item => item.id === value)) {
      this.publish('qryListasFiltroError', { code: 'client.selectionInvalid', message: '', details: { id: value } });
      return;
    }
    this.publish('filtroListaId', value);
    await this.qryTarefasEquipe(1, false);
  }

  /** filtrarPorResponsavel — filter: sets the responsible filter (member id, null for all) and reloads the board from the first page */
  public async filtrarPorResponsavel(responsavelId: string | null): Promise<void> {
    this.publish('filtroResponsavelId', blank(responsavelId));
    await this.qryTarefasEquipe(1, false);
  }

  /** filtrarPorPrioridade — filter: sets the priority filter (null for all) and reloads the board from the first page */
  public async filtrarPorPrioridade(prioridade: TarefaPrioridade | null): Promise<void> {
    this.publish('filtroPrioridade', prioridade);
    await this.qryTarefasEquipe(1, false);
  }

  /** filtrarPorPrazo — filter: sets the due date filter (date string, null for any) and reloads the board from the first page */
  public async filtrarPorPrazo(prazo: string | null): Promise<void> {
    this.publish('filtroPrazo', blank(prazo));
    await this.qryTarefasEquipe(1, false);
  }

  /** filtrarPorStatus — filter: sets the situations the board shows (empty array for all) and reloads the board from the first page */
  public async filtrarPorStatus(status: TarefaStatus[]): Promise<void> {
    this.publish('filtroStatus', [...status]);
    await this.qryTarefasEquipe(1, false);
  }

  /** buscarPorTitulo — filter: sets the title search fragment (null or empty for none) and reloads the board from the first page */
  public async buscarPorTitulo(titulo: string | null): Promise<void> {
    this.publish('filtroTitulo', blank(titulo));
    await this.qryTarefasEquipe(1, false);
  }

  /** limparFiltros — filter: clears every board filter (list, responsible, priority, due date, situations, title) and reloads the board from the first page */
  public async limparFiltros(): Promise<void> {
    this.publish('filtroListaId', null);
    this.publish('filtroResponsavelId', null);
    this.publish('filtroPrioridade', null);
    this.publish('filtroPrazo', null);
    this.publish('filtroStatus', []);
    this.publish('filtroTitulo', null);
    await this.qryTarefasEquipe(1, false);
  }

  /** request qryTarefasEquipe — loads the team board already filtered and paged (opening, filter, search, page change); redraws tarefas (replace, or append items when append is true) and, when not appending, filtroPagina; arguments: page = page to load (default 1; for a load more pass tarefas.page + 1), append = add the page to the current items instead of replacing them (only when tarefas.hasMore) */
  public async qryTarefasEquipe(page = 1, append = false): Promise<void> {
    if (this.qryTarefasEquipeStatus === 'loading') return;
    const current = this.tarefas;
    if (append && (current === null || !current.hasMore)) return;
    this.publish('qryTarefasEquipeStatus', 'loading');
    this.publish('qryTarefasEquipeError', null);
    if (!append) this.refreshPageStatus();
    const input: Input<'tarefas.tarefas_equipe.qryTarefasEquipe'> = {
      ...(this.filtroListaId !== null && this.filtroListaId !== '' ? { listaId: this.filtroListaId } : {}),
      ...(this.filtroResponsavelId !== null && this.filtroResponsavelId !== '' ? { responsavelId: this.filtroResponsavelId } : {}),
      ...(this.filtroPrioridade !== null ? { prioridade: this.filtroPrioridade } : {}),
      ...(this.filtroPrazo !== null && this.filtroPrazo !== '' ? { prazo: this.filtroPrazo } : {}),
      ...(this.filtroStatus.length > 0 ? { status: this.filtroStatus } : {}),
      ...(this.filtroTitulo !== null && this.filtroTitulo !== '' ? { titulo: this.filtroTitulo } : {}),
      page,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.qryTarefasEquipe'>>('tarefas.tarefas_equipe.qryTarefasEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryTarefasEquipeError', response.error);
        this.publish('qryTarefasEquipeStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      const incoming = response.data.tarefas;
      const base = this.tarefas;
      if (append && base !== null) {
        this.publish('tarefas', { ...incoming, items: [...base.items, ...incoming.items] });
      } else {
        this.publish('tarefas', incoming);
        this.publish('filtroPagina', page);
      }
      this.publish('qryTarefasEquipeStatus', 'success');
      this.refreshPageStatus();
    } catch (error) {
      this.publish('qryTarefasEquipeError', this.unexpectedError(error));
      this.publish('qryTarefasEquipeStatus', 'error');
      this.refreshPageStatus();
    }
  }

  /** request qryListasFiltro — loads the lists (active and inactive) offered by the list filter; redraws listas (replace); no arguments */
  public async qryListasFiltro(): Promise<void> {
    if (this.qryListasFiltroStatus === 'loading') return;
    this.publish('qryListasFiltroStatus', 'loading');
    this.publish('qryListasFiltroError', null);
    this.refreshPageStatus();
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.qryListasFiltro'>>('tarefas.tarefas_equipe.qryListasFiltro', {}, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryListasFiltroError', response.error);
        this.publish('qryListasFiltroStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      this.publish('listas', response.data.listas);
      this.publish('qryListasFiltroStatus', 'success');
      this.refreshPageStatus();
    } catch (error) {
      this.publish('qryListasFiltroError', this.unexpectedError(error));
      this.publish('qryListasFiltroStatus', 'error');
      this.refreshPageStatus();
    }
  }

  /** request qryBuscarMembros — searches team members by name to choose the new responsible or the responsible filter; redraws membros (replace); arguments: nome = typed name fragment (empty for none), somenteAtivos = true to return only active members (new responsible choice) */
  public async qryBuscarMembros(nome: string, somenteAtivos = false): Promise<void> {
    if (this.qryBuscarMembrosStatus === 'loading') return;
    this.publish('qryBuscarMembrosStatus', 'loading');
    this.publish('qryBuscarMembrosError', null);
    const typed = blank(nome);
    this.publish('filtroNomeMembro', typed);
    this.publish('filtroSomenteAtivos', somenteAtivos);
    const input: Input<'tarefas.tarefas_equipe.qryBuscarMembros'> = {
      details: { identification: { ...(typed !== null ? { name: typed } : {}) } },
      ...(somenteAtivos ? { somenteAtivos: true } : {}),
    };
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.qryBuscarMembros'>>('tarefas.tarefas_equipe.qryBuscarMembros', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryBuscarMembrosError', response.error);
        this.publish('qryBuscarMembrosStatus', 'error');
        return;
      }
      this.publish('membros', response.data.membros);
      this.publish('qryBuscarMembrosStatus', 'success');
    } catch (error) {
      this.publish('qryBuscarMembrosError', this.unexpectedError(error));
      this.publish('qryBuscarMembrosStatus', 'error');
    }
  }

  /** request qryDetalheTarefa — loads the selected task in full (detail, actions, history); redraws tarefa (replace); no arguments, it reads selectedTarefa (use selecionarTarefa to choose a task); without a selection it fails with client.requiredMissing */
  public async qryDetalheTarefa(): Promise<void> {
    if (this.qryDetalheTarefaStatus === 'loading') return;
    const tarefaId = this.selectedTarefa;
    if (tarefaId === null || tarefaId === '') {
      this.publish('qryDetalheTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['selectedTarefa'] } });
      this.publish('qryDetalheTarefaStatus', 'error');
      return;
    }
    this.publish('qryDetalheTarefaStatus', 'loading');
    this.publish('qryDetalheTarefaError', null);
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.qryDetalheTarefa'>>('tarefas.tarefas_equipe.qryDetalheTarefa', { tarefaId }, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryDetalheTarefaError', response.error);
        this.publish('qryDetalheTarefaStatus', 'error');
        return;
      }
      this.publish('tarefa', response.data.tarefa);
      this.publish('qryDetalheTarefaStatus', 'success');
    } catch (error) {
      this.publish('qryDetalheTarefaError', this.unexpectedError(error));
      this.publish('qryDetalheTarefaStatus', 'error');
    }
  }

  /** applies a board row returned by a command: updates the row by id, or removes it when it no longer matches the situation or responsible filters; rows not loaded are left alone */
  private applyItemQuadro(item: TarefaQuadroItem): void {
    const list = this.tarefas;
    if (list === null) return;
    if (!list.items.some(row => row.id === item.id)) return;
    const statusMatches = this.filtroStatus.length === 0 || this.filtroStatus.some(status => status === item.status);
    const responsavelMatches = this.filtroResponsavelId === null || this.filtroResponsavelId === item.responsavelId;
    const items = statusMatches && responsavelMatches
      ? list.items.map(row => (row.id === item.id ? item : row))
      : list.items.filter(row => row.id !== item.id);
    this.publish('tarefas', { ...list, items });
  }

  /** request cmdReatribuirTarefa — replaces the responsible of the selected task by the member in the draft and notifies them; redraws tarefa (replace with the returned task, new version) and tarefas (the returned row is updated by id, or removed when it leaves the active filters), then empties cmdReatribuirTarefaDraft; no arguments: it reads tarefa (id, version) and cmdReatribuirTarefaDraft.responsavelId (fill it with setCmdReatribuirTarefaDraft); missing values fail with client.requiredMissing */
  public async cmdReatribuirTarefa(): Promise<void> {
    if (this.cmdReatribuirTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    const responsavelId = blank(this.cmdReatribuirTarefaDraft.responsavelId);
    if (tarefa === null || responsavelId === null) {
      const stateKeys: string[] = [];
      if (tarefa === null) stateKeys.push('tarefa');
      if (responsavelId === null) stateKeys.push('cmdReatribuirTarefaDraft');
      this.publish('cmdReatribuirTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys } });
      this.publish('cmdReatribuirTarefaStatus', 'error');
      return;
    }
    this.publish('cmdReatribuirTarefaStatus', 'loading');
    this.publish('cmdReatribuirTarefaError', null);
    const input: Input<'tarefas.tarefas_equipe.cmdReatribuirTarefa'> = { id: tarefa.id, version: tarefa.version, responsavelId };
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<'tarefas.tarefas_equipe.cmdReatribuirTarefa'>>('tarefas.tarefas_equipe.cmdReatribuirTarefa', input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.publish('cmdReatribuirTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cmdReatribuirTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cmdReatribuirTarefaError', response.error);
        this.publish('cmdReatribuirTarefaStatus', 'error');
        return;
      }
      const output = response.data;
      this.publish('tarefa', output.tarefa);
      this.applyItemQuadro(output.itemQuadro);
      this.publish('cmdReatribuirTarefaDraft', emptyReatribuirTarefaDraft());
      this.publish('cmdReatribuirTarefaStatus', 'success');
    } catch (error) {
      this.publish('cmdReatribuirTarefaError', this.unexpectedError(error));
      this.publish('cmdReatribuirTarefaStatus', 'error');
    }
  }

  /** request cmdCancelarTarefa — cancels the selected task (the page asks the person to confirm before calling); redraws tarefa (replace with the returned task, with canceladaEm) and tarefas (the returned row is updated by id, or removed when its new situation is not among the filtered ones); no arguments: it reads tarefa (id, version); without a selected task it fails with client.requiredMissing */
  public async cmdCancelarTarefa(): Promise<void> {
    if (this.cmdCancelarTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    if (tarefa === null) {
      this.publish('cmdCancelarTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['tarefa'] } });
      this.publish('cmdCancelarTarefaStatus', 'error');
      return;
    }
    this.publish('cmdCancelarTarefaStatus', 'loading');
    this.publish('cmdCancelarTarefaError', null);
    const input: Input<'tarefas.tarefas_equipe.cmdCancelarTarefa'> = { id: tarefa.id, version: tarefa.version };
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<'tarefas.tarefas_equipe.cmdCancelarTarefa'>>('tarefas.tarefas_equipe.cmdCancelarTarefa', input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.publish('cmdCancelarTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cmdCancelarTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cmdCancelarTarefaError', response.error);
        this.publish('cmdCancelarTarefaStatus', 'error');
        return;
      }
      const output = response.data;
      this.publish('tarefa', output.tarefa);
      this.applyItemQuadro(output.itemQuadro);
      this.publish('cmdCancelarTarefaStatus', 'success');
    } catch (error) {
      this.publish('cmdCancelarTarefaError', this.unexpectedError(error));
      this.publish('cmdCancelarTarefaStatus', 'error');
    }
  }

  /** reatribuirTarefa — page intent of the actions organism: reassigns the selected task to the member in cmdReatribuirTarefaDraft; same as cmdReatribuirTarefa */
  public async reatribuirTarefa(): Promise<void> {
    await this.cmdReatribuirTarefa();
  }

  /** cancelarTarefa — page intent of the actions organism: cancels the selected task (ask for confirmation first); same as cmdCancelarTarefa */
  public async cancelarTarefa(): Promise<void> {
    await this.cmdCancelarTarefa();
  }
}
