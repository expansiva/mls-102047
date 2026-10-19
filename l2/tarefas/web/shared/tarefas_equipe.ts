/// <mls fileReference="_102047_/l2/tarefas/web/shared/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Tarefas_equipeContracts, TarefaDetalhe } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';

export type {
  Tarefas_equipeContracts,
  MembroIdentificacao,
  MembroDetalhes,
  MembroResumo,
  ListaResumo,
  TarefaItemDetalhes,
  TarefaEquipeItem,
  ItemChecklistDetalhes,
  ItemChecklistLinha,
  TarefaDetalheDetalhes,
  TarefaDetalhe,
} from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';

type Input<R extends keyof Tarefas_equipeContracts> = Tarefas_equipeContracts[R]['input'];
type Output<R extends keyof Tarefas_equipeContracts> = Tarefas_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

const PRIORIDADES = ['low', 'medium', 'high'] as const;
const STATUS_TAREFA = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'] as const;

/** Task priority accepted by the board filter. */
export type Prioridade = (typeof PRIORIDADES)[number];
/** Task status accepted by the board filter. */
export type StatusTarefa = (typeof STATUS_TAREFA)[number];

/** The filters of the team board; every leaf is null when the filter is off. */
export type FiltroTarefasEquipe = {
  listaId: string | null;
  responsavelId: string | null;
  prioridade: Prioridade | null;
  status: StatusTarefa | null;
  prazoDe: string | null;
  prazoAte: string | null;
  venceHoje: boolean | null;
  atrasada: boolean | null;
};

/** Draft of the reassign command: the new assignee the manager picks (id and version come from the selected task). */
export type ReatribuirTarefaDraft = {
  id: string | null;
  version: number | null;
  responsavelId: string | null;
};

function emptyReatribuirTarefaDraft(): ReatribuirTarefaDraft {
  return { id: null, version: null, responsavelId: null };
}

function parsePrioridade(raw: string | null): Prioridade | null {
  const found = PRIORIDADES.find(item => item === raw);
  return found ?? null;
}

function parseStatus(raw: string | null): StatusTarefa | null {
  const found = STATUS_TAREFA.find(item => item === raw);
  return found ?? null;
}

function parseBoolean(raw: string | null): boolean | null {
  if (raw === null) return null;
  return raw === 'true';
}

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

/** Filter members persisted in localStorage under `tarefas.tarefas_equipe.<name>`. */
const PERSISTED_MEMBERS: StateMember[] = [
  'listaId',
  'responsavelId',
  'prioridade',
  'status',
  'prazoDe',
  'prazoAte',
  'venceHoje',
  'atrasada',
];

const STORAGE_PREFIX = 'tarefas.tarefas_equipe.';
const PAGE_SIZE = 20;

type PendingListar = { page: number; append: boolean };

export class TarefasTarefas_equipeShared extends StateLitElement {
  /** state tarefas — the list of team tasks with list, assignee, due date, status and indicators, as a page { items, page, pageSize, hasMore }; source listarTarefasEquipe.tarefas; organism tarefasEquipe */
  @property({ attribute: false }) tarefas: Output<'tarefas.tarefas_equipe.listarTarefasEquipe'>['tarefas'] | null = null;

  /** state listas — the lists (project or area) identified by name, used by the board filter; source carregarOpcoesEquipe.listas; organism tarefasEquipe */
  @property({ attribute: false }) listas: Output<'tarefas.tarefas_equipe.carregarOpcoesEquipe'>['listas'] = [];

  /** state membros — the team members with name and registry status (only Active ones may be picked as new assignee); source carregarOpcoesEquipe.membros; organisms acoesGestor, tarefasEquipe */
  @property({ attribute: false }) membros: Output<'tarefas.tarefas_equipe.carregarOpcoesEquipe'>['membros'] = [];

  /** state tarefa — the selected task in full: creator, assignee, history milestones and checklist items; source obterTarefa.tarefa; organisms acoesGestor, detalheTarefa, historicoTarefa */
  @property({ attribute: false }) tarefa: TarefaDetalhe | null = null;

  /** state selectedTarefa — the id of the task selected in tarefasEquipe; source entry.params.tarefaId; organisms detalheTarefa, tarefasEquipe; lives in the URL query */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state listaId — filter by list id of the board; gap-completed filter state for entry param listaId; organism tarefasEquipe; persisted */
  @property({ attribute: false }) listaId: string | null = null;

  /** state responsavelId — filter by assignee id of the board; gap-completed filter state for entry param responsavelId; organism tarefasEquipe; persisted */
  @property({ attribute: false }) responsavelId: string | null = null;

  /** state prioridade — filter by priority (low, medium, high) of the board; gap-completed filter state for entry param prioridade; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prioridade: Prioridade | null = null;

  /** state status — filter by task status of the board; gap-completed filter state for entry param status; organism tarefasEquipe; persisted */
  @property({ attribute: false }) status: StatusTarefa | null = null;

  /** state prazoDe — filter, start of the due-date interval; gap-completed filter state for entry param prazoDe; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prazoDe: string | null = null;

  /** state prazoAte — filter, end of the due-date interval; gap-completed filter state for entry param prazoAte; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prazoAte: string | null = null;

  /** state venceHoje — filter, when true only open tasks due today; gap-completed filter state for entry param venceHoje; organism tarefasEquipe; persisted */
  @property({ attribute: false }) venceHoje: boolean | null = null;

  /** state atrasada — filter, when true only open overdue tasks; gap-completed filter state for entry param atrasada; organism tarefasEquipe; persisted */
  @property({ attribute: false }) atrasada: boolean | null = null;

  /** state reatribuirTarefaDraft — draft of the reassign command (the new assignee id chosen among active members); source reatribuirTarefa.input; organism acoesGestor */
  @property({ attribute: false }) reatribuirTarefaDraft: ReatribuirTarefaDraft = emptyReatribuirTarefaDraft();

  /** state pageStatus — overall status of the page: loading while the initial load runs, error if it failed, empty when every loaded list is empty, success otherwise */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state carregarOpcoesEquipeStatus — status of the request carregarOpcoesEquipe */
  @property({ attribute: false }) carregarOpcoesEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state carregarOpcoesEquipeError — error of the request carregarOpcoesEquipe, null when none */
  @property({ attribute: false }) carregarOpcoesEquipeError: ErrorState = null;

  /** state listarTarefasEquipeStatus — status of the request listarTarefasEquipe */
  @property({ attribute: false }) listarTarefasEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarTarefasEquipeError — error of the request listarTarefasEquipe, null when none */
  @property({ attribute: false }) listarTarefasEquipeError: ErrorState = null;

  /** state obterTarefaStatus — status of the request obterTarefa */
  @property({ attribute: false }) obterTarefaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state obterTarefaError — error of the request obterTarefa, null when none */
  @property({ attribute: false }) obterTarefaError: ErrorState = null;

  /** state reatribuirTarefaStatus — status of the command reatribuirTarefa */
  @property({ attribute: false }) reatribuirTarefaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state reatribuirTarefaError — error of the command reatribuirTarefa, null when none */
  @property({ attribute: false }) reatribuirTarefaError: ErrorState = null;

  /** state cancelarTarefaStatus — status of the command cancelarTarefa */
  @property({ attribute: false }) cancelarTarefaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state cancelarTarefaError — error of the command cancelarTarefa, null when none */
  @property({ attribute: false }) cancelarTarefaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private pendingListar: PendingListar | null = null;

  private readonly onPopState = (): void => {
    if (window.location.pathname.endsWith('/tarefas/tarefas_equipe')) {
      this.resetVisit();
      this.applyEntryParams();
      void this.loadVisit();
    }
  };

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.tarefas_equipe.${member}`, value);
    this.persistMember(member, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private persistMember(member: StateMember, value: unknown): void {
    if (member === 'selectedTarefa') {
      this.writeUrlParam('tarefaId', value);
      return;
    }
    if (!PERSISTED_MEMBERS.includes(member)) return;
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(`${STORAGE_PREFIX}${member}`);
      } else {
        localStorage.setItem(`${STORAGE_PREFIX}${member}`, String(value));
      }
    } catch {
      // storage unavailable: the state still lives in memory
    }
  }

  private writeUrlParam(name: string, value: unknown): void {
    try {
      const url = new URL(window.location.href);
      const current = url.searchParams.get(name);
      const next = typeof value === 'string' && value !== '' ? value : null;
      if (current === next) return;
      if (next === null) {
        url.searchParams.delete(name);
      } else {
        url.searchParams.set(name, next);
      }
      window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
    } catch {
      // URL not writable: the state still lives in memory
    }
  }

  private readParam(name: string, useStorage: boolean): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    if (!useStorage) return null;
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private unexpected(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.hydrateData();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    this.applyEntryParams();
    void this.loadVisit();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.onPopState);
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
    this.pendingListar = null;
    this.publish('pageStatus', 'idle');
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
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('reatribuirTarefaStatus', 'idle');
    this.publish('reatribuirTarefaError', null);
    this.publish('cancelarTarefaStatus', 'idle');
    this.publish('cancelarTarefaError', null);
  }

  private applyEntryParams(): void {
    this.publish('listaId', this.readParam('listaId', true));
    this.publish('responsavelId', this.readParam('responsavelId', true));
    this.publish('prioridade', parsePrioridade(this.readParam('prioridade', true)));
    this.publish('status', parseStatus(this.readParam('status', true)));
    this.publish('prazoDe', this.readParam('prazoDe', true));
    this.publish('prazoAte', this.readParam('prazoAte', true));
    this.publish('venceHoje', parseBoolean(this.readParam('venceHoje', true)));
    this.publish('atrasada', parseBoolean(this.readParam('atrasada', true)));
    this.publish('selectedTarefa', this.readParam('tarefaId', false));
  }

  private async loadVisit(): Promise<void> {
    this.publish('pageStatus', 'loading');
    const selected = this.selectedTarefa;
    await Promise.all([
      this.carregarOpcoesEquipe(),
      this.listarTarefasEquipe(),
      selected !== null ? this.obterTarefa(selected) : Promise.resolve(),
    ]);
    this.refreshPageStatus();
  }

  private refreshPageStatus(): void {
    if (this.carregarOpcoesEquipeStatus === 'loading' || this.listarTarefasEquipeStatus === 'loading') return;
    if (this.carregarOpcoesEquipeStatus === 'error' || this.listarTarefasEquipeStatus === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    const noTarefas = this.tarefas === null || this.tarefas.items.length === 0;
    if (noTarefas && this.listas.length === 0 && this.membros.length === 0) {
      this.publish('pageStatus', 'empty');
      return;
    }
    this.publish('pageStatus', 'success');
  }

  /** scene — publishes the visible scene of the page and clears the results of the commands */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the reassign command (the new assignee the manager picks); clears the results of the commands */
  public setReatribuirTarefaDraft(value: ReatribuirTarefaDraft): void {
    this.resetCommandResults();
    this.publish('reatribuirTarefaDraft', value);
  }

  /** request carregarOpcoesEquipe — loads at once the lists and the team members used by the board filters and by the choice of the new assignee; redraws listas and membros (replace); no arguments, the scope is the manager's team */
  public async carregarOpcoesEquipe(): Promise<void> {
    if (this.carregarOpcoesEquipeStatus === 'loading') return;
    this.publish('pageStatus', 'loading');
    this.publish('carregarOpcoesEquipeStatus', 'loading');
    this.publish('carregarOpcoesEquipeError', null);
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.carregarOpcoesEquipe'>>(
        'tarefas.tarefas_equipe.carregarOpcoesEquipe',
        {},
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('carregarOpcoesEquipeError', response.error);
        this.publish('carregarOpcoesEquipeStatus', 'error');
      } else {
        this.publish('listas', response.data.listas);
        this.publish('membros', response.data.membros);
        this.publish('carregarOpcoesEquipeStatus', 'success');
      }
    } catch (error) {
      this.publish('carregarOpcoesEquipeError', this.unexpected(error));
      this.publish('carregarOpcoesEquipeStatus', 'error');
    }
    this.refreshPageStatus();
  }

  /** filter — sets the given filters of the board (a key left out keeps its value; null turns a filter off), persists them and reloads the list from the first page */
  public async filtrarTarefasEquipe(filtro: Partial<FiltroTarefasEquipe>): Promise<void> {
    if (filtro.listaId !== undefined) this.publish('listaId', filtro.listaId);
    if (filtro.responsavelId !== undefined) this.publish('responsavelId', filtro.responsavelId);
    if (filtro.prioridade !== undefined) this.publish('prioridade', filtro.prioridade);
    if (filtro.status !== undefined) this.publish('status', filtro.status);
    if (filtro.prazoDe !== undefined) this.publish('prazoDe', filtro.prazoDe);
    if (filtro.prazoAte !== undefined) this.publish('prazoAte', filtro.prazoAte);
    if (filtro.venceHoje !== undefined) this.publish('venceHoje', filtro.venceHoje);
    if (filtro.atrasada !== undefined) this.publish('atrasada', filtro.atrasada);
    await this.listarTarefasEquipe(1, false);
  }

  /** filter — turns every filter of the board off and reloads the list from the first page */
  public async limparFiltrosTarefasEquipe(): Promise<void> {
    await this.filtrarTarefasEquipe({
      listaId: null,
      responsavelId: null,
      prioridade: null,
      status: null,
      prazoDe: null,
      prazoAte: null,
      venceHoje: null,
      atrasada: null,
    });
  }

  /** request listarTarefasEquipe — paged list of all team tasks with the current filters of the board; runs on open and is also the method to reload and to page; redraws tarefas (replace, or append the next page's items when append is true; append does nothing when the list has no more); page: page to load, starting at 1; append: true for "load more" */
  public async listarTarefasEquipe(page = 1, append = false): Promise<void> {
    if (this.listarTarefasEquipeStatus === 'loading') {
      this.pendingListar = { page, append };
      return;
    }
    if (append && !(this.tarefas !== null && this.tarefas.hasMore)) return;
    this.publish('pageStatus', 'loading');
    this.publish('listarTarefasEquipeStatus', 'loading');
    this.publish('listarTarefasEquipeError', null);
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
      page,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.listarTarefasEquipe'>>(
        'tarefas.tarefas_equipe.listarTarefasEquipe',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('listarTarefasEquipeError', response.error);
        this.publish('listarTarefasEquipeStatus', 'error');
      } else {
        const loaded = response.data.tarefas;
        const current = this.tarefas;
        if (append && current !== null) {
          this.publish('tarefas', { ...loaded, items: [...current.items, ...loaded.items] });
        } else {
          this.publish('tarefas', loaded);
        }
        this.publish('listarTarefasEquipeStatus', 'success');
      }
    } catch (error) {
      this.publish('listarTarefasEquipeError', this.unexpected(error));
      this.publish('listarTarefasEquipeStatus', 'error');
    }
    this.refreshPageStatus();
    const next = this.pendingListar;
    this.pendingListar = null;
    if (next !== null) await this.listarTarefasEquipe(next.page, next.append);
  }

  /** request obterTarefa — selects a task of the board and opens it with detail, checklist and history milestones; redraws selectedTarefa (the id, kept in the URL) and tarefa (replace; cleared on null or on failure) and empties the reassign draft; tarefaId: id of the task to open, or null to clear the selection */
  public async obterTarefa(tarefaId: string | null): Promise<void> {
    if (this.obterTarefaStatus === 'loading') return;
    this.resetCommandResults();
    this.publish('obterTarefaError', null);
    if (tarefaId === null || tarefaId === '') {
      this.publish('selectedTarefa', null);
      this.publish('tarefa', null);
      this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
      this.publish('obterTarefaStatus', 'idle');
      return;
    }
    this.publish('obterTarefaStatus', 'loading');
    this.publish('selectedTarefa', tarefaId);
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.obterTarefa'>>(
        'tarefas.tarefas_equipe.obterTarefa',
        { tarefaId },
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('tarefa', null);
        this.publish('obterTarefaError', response.error);
        this.publish('obterTarefaStatus', 'error');
      } else {
        this.publish('tarefa', response.data.tarefa);
        this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
        this.publish('obterTarefaStatus', 'success');
      }
    } catch (error) {
      this.publish('tarefa', null);
      this.publish('obterTarefaError', this.unexpected(error));
      this.publish('obterTarefaStatus', 'error');
    }
  }

  /** command reatribuirTarefa — changes the assignee of the selected task to the member picked in the draft (must be an Active member); redraws tarefa (replace with the returned record), the matching row of tarefas (updated, or removed when it no longer matches the filters) and refills the draft from the record; no arguments: reads the selected tarefa (id, version) and reatribuirTarefaDraft.responsavelId */
  public async reatribuirTarefa(): Promise<void> {
    if (this.reatribuirTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    const responsavelId = this.reatribuirTarefaDraft.responsavelId;
    if (tarefa === null || responsavelId === null || responsavelId === '') {
      const stateKeys: string[] = [];
      if (tarefa === null) stateKeys.push('tarefa');
      if (responsavelId === null || responsavelId === '') stateKeys.push('reatribuirTarefaDraft.responsavelId');
      this.publish('reatribuirTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys } });
      this.publish('reatribuirTarefaStatus', 'error');
      return;
    }
    this.publish('reatribuirTarefaError', null);
    this.publish('reatribuirTarefaStatus', 'loading');
    const input: Input<'tarefas.tarefas_equipe.reatribuirTarefa'> = {
      id: tarefa.id,
      version: tarefa.version,
      responsavelId,
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.tarefas_equipe.reatribuirTarefa'>>(
          'tarefas.tarefas_equipe.reatribuirTarefa',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('reatribuirTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('reatribuirTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('reatribuirTarefaError', response.error);
        this.publish('reatribuirTarefaStatus', 'error');
        return;
      }
      const updated = response.data.tarefa;
      this.applyTarefaResult(updated);
      this.publish('reatribuirTarefaDraft', { id: updated.id, version: updated.version, responsavelId: updated.responsavelId });
      this.publish('reatribuirTarefaStatus', 'success');
    } catch (error) {
      this.publish('reatribuirTarefaError', this.unexpected(error));
      this.publish('reatribuirTarefaStatus', 'error');
    }
  }

  /** command cancelarTarefa — cancels the selected task while it is still open; redraws tarefa (replace with the returned cancelled record) and the matching row of tarefas (updated, or removed when it no longer matches the filters); no arguments: reads the selected tarefa (id, version) */
  public async cancelarTarefa(): Promise<void> {
    if (this.cancelarTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    if (tarefa === null) {
      this.publish('cancelarTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['tarefa'] } });
      this.publish('cancelarTarefaStatus', 'error');
      return;
    }
    this.publish('cancelarTarefaError', null);
    this.publish('cancelarTarefaStatus', 'loading');
    const input: Input<'tarefas.tarefas_equipe.cancelarTarefa'> = {
      id: tarefa.id,
      version: tarefa.version,
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.tarefas_equipe.cancelarTarefa'>>(
          'tarefas.tarefas_equipe.cancelarTarefa',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('cancelarTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cancelarTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cancelarTarefaError', response.error);
        this.publish('cancelarTarefaStatus', 'error');
        return;
      }
      this.applyTarefaResult(response.data.tarefa);
      this.publish('cancelarTarefaStatus', 'success');
    } catch (error) {
      this.publish('cancelarTarefaError', this.unexpected(error));
      this.publish('cancelarTarefaStatus', 'error');
    }
  }

  /** Redraws the selected record and its row in the board with the record a command returned. */
  private applyTarefaResult(updated: TarefaDetalhe): void {
    this.publish('tarefa', updated);
    const page = this.tarefas;
    if (page === null) return;
    if (!page.items.some(row => row.id === updated.id)) return;
    const stays =
      (this.status === null || this.status === updated.status) &&
      (this.responsavelId === null || this.responsavelId === '' || this.responsavelId === updated.responsavelId) &&
      ((this.venceHoje !== true && this.atrasada !== true) || updated.details.aberta);
    if (!stays) {
      this.publish('tarefas', { ...page, items: page.items.filter(row => row.id !== updated.id) });
      return;
    }
    const items = page.items.map(row => {
      if (row.id !== updated.id) return row;
      return {
        ...row,
        titulo: updated.titulo,
        status: updated.status,
        prioridade: updated.prioridade,
        prazo: updated.prazo,
        responsavelId: updated.responsavelId,
        responsavel: updated.responsavel,
        details: {
          ...row.details,
          progressoChecklist: updated.details.progressoChecklist,
          venceHoje: updated.details.aberta ? row.details.venceHoje : false,
          atrasada: updated.details.aberta ? row.details.atrasada : false,
        },
      };
    });
    this.publish('tarefas', { ...page, items });
  }
}
