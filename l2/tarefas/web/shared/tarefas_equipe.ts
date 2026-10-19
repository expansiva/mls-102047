/// <mls fileReference="_102047_/l2/tarefas/web/shared/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Tarefas_equipeContracts, TarefaDetalhe, TarefaEquipeItem } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';

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

type RouteOpcoes = 'tarefas.tarefas_equipe.carregarOpcoesEquipe';
type RouteListar = 'tarefas.tarefas_equipe.listarTarefasEquipe';
type RouteObter = 'tarefas.tarefas_equipe.obterTarefa';
type RouteReatribuir = 'tarefas.tarefas_equipe.reatribuirTarefa';
type RouteCancelar = 'tarefas.tarefas_equipe.cancelarTarefa';

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type TarefaPrioridade = 'low' | 'medium' | 'high';
export type TarefaStatus = 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';

/** Filter values of the board; a key left out is not changed, a key set to null clears that filter. */
export type TarefasEquipeFiltroChange = {
  listaId?: string | null;
  responsavelId?: string | null;
  prioridade?: TarefaPrioridade | null;
  status?: TarefaStatus | null;
  prazoDe?: string | null;
  prazoAte?: string | null;
  venceHoje?: boolean | null;
  atrasada?: boolean | null;
};

/** Draft of the reassignment: the member chosen as the new responsible. */
export type ReatribuirTarefaDraft = {
  responsavelId: string | null;
};

export function emptyReatribuirTarefaDraft(): ReatribuirTarefaDraft {
  return { responsavelId: null };
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

const STATE_PREFIX = 'ui.tarefas.tarefas_equipe';
const STORAGE_PREFIX = 'tarefas.tarefas_equipe';
const PAGE_SIZE = 20;

/** Persisted members and the localStorage key each one writes. */
const PERSISTED_KEY_BY_MEMBER: Partial<Record<StateMember, string>> = {
  listaId: 'tarefas.tarefas_equipe.listaId',
  responsavelId: 'tarefas.tarefas_equipe.responsavelId',
  prioridade: 'tarefas.tarefas_equipe.prioridade',
  status: 'tarefas.tarefas_equipe.status',
  prazoDe: 'tarefas.tarefas_equipe.prazoDe',
  prazoAte: 'tarefas.tarefas_equipe.prazoAte',
  venceHoje: 'tarefas.tarefas_equipe.venceHoje',
  atrasada: 'tarefas.tarefas_equipe.atrasada',
};

function parsePrioridade(raw: string | null): TarefaPrioridade | null {
  if (raw === 'low' || raw === 'medium' || raw === 'high') return raw;
  return null;
}

function parseStatus(raw: string | null): TarefaStatus | null {
  if (raw === 'aFazer' || raw === 'emAndamento' || raw === 'emRevisao' || raw === 'concluida' || raw === 'cancelada') return raw;
  return null;
}

function parseBoolean(raw: string | null): boolean | null {
  if (raw === null) return null;
  return raw === 'true';
}

export class TarefasTarefas_equipeShared extends StateLitElement {
  /** state tarefas — the page of team tasks (title, list, responsible, priority, due date, status, due signals, checklist progress); source listarTarefasEquipe.tarefas; organism tarefasEquipe */
  @property({ attribute: false }) tarefas: Output<RouteListar>['tarefas'] | null = null;

  /** state listas — the lists (project or area) offered in the board filter; source carregarOpcoesEquipe.listas; organism tarefasEquipe */
  @property({ attribute: false }) listas: Output<RouteOpcoes>['listas'] = [];

  /** state membros — the team members with their registry status (only Active members can be chosen as responsible); source carregarOpcoesEquipe.membros; organisms acoesGestor, tarefasEquipe */
  @property({ attribute: false }) membros: Output<RouteOpcoes>['membros'] = [];

  /** state tarefa — the open task in full (creator, responsible, history milestones, checklist, version); source obterTarefa.tarefa; organisms acoesGestor, detalheTarefa, historicoTarefa */
  @property({ attribute: false }) tarefa: TarefaDetalhe | null = null;

  /** state selectedTarefa — the id of the task selected in tarefasEquipe; source entry.params.tarefaId; organisms detalheTarefa, tarefasEquipe */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state listaId — filter of the board by list id (null = all); source entry.params.listaId; organism tarefasEquipe; persisted */
  @property({ attribute: false }) listaId: string | null = null;

  /** state responsavelId — filter of the board by responsible member id (null = all); source entry.params.responsavelId; organism tarefasEquipe; persisted */
  @property({ attribute: false }) responsavelId: string | null = null;

  /** state prioridade — filter of the board by priority (null = all); source entry.params.prioridade; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prioridade: TarefaPrioridade | null = null;

  /** state status — filter of the board by task status (null = all); source entry.params.status; organism tarefasEquipe; persisted */
  @property({ attribute: false }) status: TarefaStatus | null = null;

  /** state prazoDe — filter: start of the due date range (null = no lower bound); source entry.params.prazoDe; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prazoDe: string | null = null;

  /** state prazoAte — filter: end of the due date range (null = no upper bound); source entry.params.prazoAte; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prazoAte: string | null = null;

  /** state venceHoje — filter: when true only open tasks due today are listed; source entry.params.venceHoje; organism tarefasEquipe; persisted */
  @property({ attribute: false }) venceHoje: boolean | null = null;

  /** state atrasada — filter: when true only open overdue tasks are listed; source entry.params.atrasada; organism tarefasEquipe; persisted */
  @property({ attribute: false }) atrasada: boolean | null = null;

  /** state reatribuirTarefaDraft — draft of the reassignment form: the member chosen as the new responsible; source reatribuirTarefa.input; organism acoesGestor */
  @property({ attribute: false }) reatribuirTarefaDraft: ReatribuirTarefaDraft = emptyReatribuirTarefaDraft();

  /** state pageStatus — overall status of the page load (options and task list): loading while they run, error if one failed, empty when the task list is empty, success otherwise */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state carregarOpcoesEquipeStatus — status of the request carregarOpcoesEquipe */
  @property({ attribute: false }) carregarOpcoesEquipeStatus: RequestStatus = 'idle';

  /** state carregarOpcoesEquipeError — error of the request carregarOpcoesEquipe, null when none */
  @property({ attribute: false }) carregarOpcoesEquipeError: ErrorState = null;

  /** state listarTarefasEquipeStatus — status of the request listarTarefasEquipe */
  @property({ attribute: false }) listarTarefasEquipeStatus: RequestStatus = 'idle';

  /** state listarTarefasEquipeError — error of the request listarTarefasEquipe, null when none */
  @property({ attribute: false }) listarTarefasEquipeError: ErrorState = null;

  /** state obterTarefaStatus — status of the request obterTarefa (opening the selected task) */
  @property({ attribute: false }) obterTarefaStatus: RequestStatus = 'idle';

  /** state obterTarefaError — error of the request obterTarefa, null when none */
  @property({ attribute: false }) obterTarefaError: ErrorState = null;

  /** state reatribuirTarefaStatus — status of the command reatribuirTarefa; success stays until the person changes the draft, the selection or the scene */
  @property({ attribute: false }) reatribuirTarefaStatus: RequestStatus = 'idle';

  /** state reatribuirTarefaError — error of the command reatribuirTarefa, null when none */
  @property({ attribute: false }) reatribuirTarefaError: ErrorState = null;

  /** state cancelarTarefaStatus — status of the command cancelarTarefa; success stays until the person changes the selection or the scene */
  @property({ attribute: false }) cancelarTarefaStatus: RequestStatus = 'idle';

  /** state cancelarTarefaError — error of the command cancelarTarefa, null when none */
  @property({ attribute: false }) cancelarTarefaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`${STATE_PREFIX}.${member}`, value);
    const storageKey = PERSISTED_KEY_BY_MEMBER[member];
    if (storageKey) {
      try {
        if (value === null || value === undefined || value === '') {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, String(value));
        }
      } catch {
        // storage unavailable: the state still lives in memory
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private hydrate(member: StateMember): void {
    const value = getState(`${STATE_PREFIX}.${member}`);
    if (value !== undefined) this.assignState(`${STATE_PREFIX}.${member}`, value);
  }

  private unexpectedError(name: string): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private errorName(error: unknown): string {
    return error instanceof Error ? error.name : 'unknown';
  }

  /** Starts a fresh visit: publishes the initial value of every transient member. */
  private resetVisit(): void {
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

  /** Clears the result of every command, so an old success or error never sits next to a new form, record or scene. */
  private resetCommandResults(): void {
    this.publish('reatribuirTarefaStatus', 'idle');
    this.publish('reatribuirTarefaError', null);
    this.publish('cancelarTarefaStatus', 'idle');
    this.publish('cancelarTarefaError', null);
  }

  private updatePageStatus(): void {
    const opcoes = this.carregarOpcoesEquipeStatus;
    const lista = this.listarTarefasEquipeStatus;
    if (opcoes === 'loading' || lista === 'loading') {
      this.publish('pageStatus', 'loading');
      return;
    }
    if (opcoes === 'error' || lista === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    if (lista === 'success') {
      const current = this.tarefas;
      if (!current || current.items.length === 0) {
        this.publish('pageStatus', 'empty');
        return;
      }
      this.publish('pageStatus', 'success');
      return;
    }
    this.publish('pageStatus', 'idle');
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}.${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable: the param is absent
    }
    return null;
  }

  /** Applies the entry params; returns the id of the task to open, when there is one. */
  private applyEntryParams(): string | null {
    this.publish('listaId', this.readParam('listaId'));
    this.publish('responsavelId', this.readParam('responsavelId'));
    this.publish('prioridade', parsePrioridade(this.readParam('prioridade')));
    this.publish('status', parseStatus(this.readParam('status')));
    this.publish('prazoDe', this.readParam('prazoDe'));
    this.publish('prazoAte', this.readParam('prazoAte'));
    this.publish('venceHoje', parseBoolean(this.readParam('venceHoje')));
    this.publish('atrasada', parseBoolean(this.readParam('atrasada')));
    return this.readParam('tarefaId');
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.hydrate('tarefas');
    this.hydrate('listas');
    this.hydrate('membros');
    this.hydrate('tarefa');
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    const tarefaId = this.applyEntryParams();
    if (tarefaId === null) {
      this.publish('selectedTarefa', null);
      this.publish('tarefa', null);
    }
    void this.carregarOpcoesEquipe();
    void this.listarTarefasEquipe();
    if (tarefaId !== null) {
      void this.obterTarefa(tarefaId);
    }
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

  /** scene — publishes the visible scene of the page; clears the result of any command */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the reassignment draft (the member chosen as new responsible); clears the result of any command */
  public setReatribuirTarefaDraft(value: ReatribuirTarefaDraft): void {
    this.resetCommandResults();
    this.publish('reatribuirTarefaDraft', value);
  }

  /** request carregarOpcoesEquipe — loads at once the lists and team members used by the board filters and the new-responsible choice; redraws listas and membros (replace); no arguments, scope is the manager's team. Also the method to reload the options. */
  public async carregarOpcoesEquipe(): Promise<void> {
    if (this.carregarOpcoesEquipeStatus === 'loading') return;
    this.publish('carregarOpcoesEquipeStatus', 'loading');
    this.publish('carregarOpcoesEquipeError', null);
    this.updatePageStatus();
    try {
      const input: Input<RouteOpcoes> = {};
      const response = await execBff<Output<RouteOpcoes>>('tarefas.tarefas_equipe.carregarOpcoesEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('carregarOpcoesEquipeError', response.error ?? this.unexpectedError('noData'));
        this.publish('carregarOpcoesEquipeStatus', 'error');
        this.updatePageStatus();
        return;
      }
      this.publish('listas', response.data.listas);
      this.publish('membros', response.data.membros);
      this.publish('carregarOpcoesEquipeStatus', 'success');
      this.updatePageStatus();
    } catch (error) {
      this.publish('carregarOpcoesEquipeError', this.unexpectedError(this.errorName(error)));
      this.publish('carregarOpcoesEquipeStatus', 'error');
      this.updatePageStatus();
    }
  }

  private applyFilterChange(change: TarefasEquipeFiltroChange): void {
    if (change.listaId !== undefined) this.publish('listaId', change.listaId);
    if (change.responsavelId !== undefined) this.publish('responsavelId', change.responsavelId);
    if (change.prioridade !== undefined) this.publish('prioridade', change.prioridade);
    if (change.status !== undefined) this.publish('status', change.status);
    if (change.prazoDe !== undefined) this.publish('prazoDe', change.prazoDe);
    if (change.prazoAte !== undefined) this.publish('prazoAte', change.prazoAte);
    if (change.venceHoje !== undefined) this.publish('venceHoje', change.venceHoje);
    if (change.atrasada !== undefined) this.publish('atrasada', change.atrasada);
  }

  /** request listarTarefasEquipe — paged list of every team task with the board filters; runs on open and on each filter or page change; redraws tarefas (replace by default, append adds the next page to items); arguments: change = filter values to apply before loading (keys left out stay, null clears a filter; a change always loads from the first page), page = page to load (default 1, ignored when append), append = true loads the next page and adds it to the loaded items (does nothing when the list says there is no more) */
  public async listarTarefasEquipe(change: TarefasEquipeFiltroChange = {}, page = 1, append = false): Promise<void> {
    if (append && (!this.tarefas || !this.tarefas.hasMore)) return;
    if (this.listarTarefasEquipeStatus === 'loading') return;
    this.resetCommandResults();
    this.applyFilterChange(change);
    const current = this.tarefas;
    const pageToLoad = append && current ? current.page + 1 : page;
    this.publish('listarTarefasEquipeStatus', 'loading');
    this.publish('listarTarefasEquipeError', null);
    this.updatePageStatus();
    try {
      const details: Input<RouteListar>['details'] = {
        ...(this.venceHoje === true ? { venceHoje: true } : {}),
        ...(this.atrasada === true ? { atrasada: true } : {}),
      };
      const input: Input<RouteListar> = {
        ...(this.listaId !== null && this.listaId !== '' ? { listaId: this.listaId } : {}),
        ...(this.responsavelId !== null && this.responsavelId !== '' ? { responsavelId: this.responsavelId } : {}),
        ...(this.prioridade !== null ? { prioridade: this.prioridade } : {}),
        ...(this.status !== null ? { status: this.status } : {}),
        ...(this.prazoDe !== null && this.prazoDe !== '' ? { prazoDe: this.prazoDe } : {}),
        ...(this.prazoAte !== null && this.prazoAte !== '' ? { prazoAte: this.prazoAte } : {}),
        details,
        page: pageToLoad,
        pageSize: PAGE_SIZE,
      };
      const response = await execBff<Output<RouteListar>>('tarefas.tarefas_equipe.listarTarefasEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarTarefasEquipeError', response.error ?? this.unexpectedError('noData'));
        this.publish('listarTarefasEquipeStatus', 'error');
        this.updatePageStatus();
        return;
      }
      const loaded = response.data.tarefas;
      const before = this.tarefas;
      if (append && before) {
        this.publish('tarefas', { ...loaded, items: [...before.items, ...loaded.items] });
      } else {
        this.publish('tarefas', loaded);
      }
      this.publish('listarTarefasEquipeStatus', 'success');
      this.updatePageStatus();
    } catch (error) {
      this.publish('listarTarefasEquipeError', this.unexpectedError(this.errorName(error)));
      this.publish('listarTarefasEquipeStatus', 'error');
      this.updatePageStatus();
    }
  }

  /** request obterTarefa — selects a task of the board and opens it with detail, checklist and history milestones; redraws selectedTarefa (the id) and tarefa (replace); argument: tarefaId = id of the task picked in the board, or null to clear the selection (clears tarefa too) */
  public async obterTarefa(tarefaId: string | null): Promise<void> {
    this.resetCommandResults();
    if (tarefaId === null || tarefaId === '') {
      this.publish('selectedTarefa', null);
      this.publish('tarefa', null);
      this.publish('obterTarefaStatus', 'idle');
      this.publish('obterTarefaError', null);
      return;
    }
    if (this.obterTarefaStatus === 'loading') return;
    this.publish('selectedTarefa', tarefaId);
    this.publish('obterTarefaStatus', 'loading');
    this.publish('obterTarefaError', null);
    try {
      const input: Input<RouteObter> = { tarefaId };
      const response = await execBff<Output<RouteObter>>('tarefas.tarefas_equipe.obterTarefa', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('tarefa', null);
        this.publish('obterTarefaError', response.error ?? this.unexpectedError('noData'));
        this.publish('obterTarefaStatus', 'error');
        return;
      }
      this.publish('tarefa', response.data.tarefa);
      this.publish('obterTarefaStatus', 'success');
    } catch (error) {
      this.publish('tarefa', null);
      this.publish('obterTarefaError', this.unexpectedError(this.errorName(error)));
      this.publish('obterTarefaStatus', 'error');
    }
  }

  /** True when the task, as returned by a command, still belongs to the board under the current filters. */
  private rowBelongs(detail: TarefaDetalhe): boolean {
    if (this.status !== null && this.status !== detail.status) return false;
    if (this.responsavelId !== null && this.responsavelId !== '' && this.responsavelId !== detail.responsavelId) return false;
    const closed = detail.status === 'concluida' || detail.status === 'cancelada';
    if ((this.venceHoje === true || this.atrasada === true) && closed) return false;
    return true;
  }

  /** Applies the task returned by a command: redraws the open record and updates (or removes) its row in the board. */
  private applyTarefaResult(detail: TarefaDetalhe): void {
    this.publish('tarefa', detail);
    const current = this.tarefas;
    if (!current) return;
    const belongs = this.rowBelongs(detail);
    const items: TarefaEquipeItem[] = [];
    for (const row of current.items) {
      if (row.id !== detail.id) {
        items.push(row);
        continue;
      }
      if (!belongs) continue;
      items.push({
        ...row,
        titulo: detail.titulo,
        status: detail.status,
        prioridade: detail.prioridade,
        prazo: detail.prazo,
        responsavelId: detail.responsavelId,
        responsavel: detail.responsavel,
      });
    }
    this.publish('tarefas', { ...current, items });
  }

  /** request reatribuirTarefa — swaps the responsible of the open task for the member chosen in the draft (the backend refuses members that are not active and callers that are neither creator nor manager); redraws tarefa (replace with the returned task, new version) and updates or removes its row in tarefas; no arguments: uses the open task (id, version) and reatribuirTarefaDraft.responsavelId, which is emptied on success */
  public async reatribuirTarefa(): Promise<void> {
    if (this.reatribuirTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    const responsavelId = this.reatribuirTarefaDraft.responsavelId;
    const missing: string[] = [];
    if (!tarefa) missing.push('tarefa');
    if (responsavelId === null || responsavelId === '') missing.push('reatribuirTarefaDraft.responsavelId');
    if (missing.length > 0 || !tarefa || responsavelId === null || responsavelId === '') {
      this.publish('reatribuirTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.publish('reatribuirTarefaStatus', 'error');
      return;
    }
    this.publish('reatribuirTarefaStatus', 'loading');
    this.publish('reatribuirTarefaError', null);
    try {
      const input: Input<RouteReatribuir> = { id: tarefa.id, version: tarefa.version, responsavelId };
      const response = await runBlockingUiAction(signal => execBff<Output<RouteReatribuir>>('tarefas.tarefas_equipe.reatribuirTarefa', input, { mode: 'blocking', signal }));
      if (!response) {
        this.publish('reatribuirTarefaError', this.unexpectedError('aborted'));
        this.publish('reatribuirTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('reatribuirTarefaError', response.error ?? this.unexpectedError('noData'));
        this.publish('reatribuirTarefaStatus', 'error');
        return;
      }
      this.applyTarefaResult(response.data.tarefa);
      this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
      this.publish('reatribuirTarefaStatus', 'success');
    } catch (error) {
      this.publish('reatribuirTarefaError', this.unexpectedError(this.errorName(error)));
      this.publish('reatribuirTarefaStatus', 'error');
    }
  }

  /** request cancelarTarefa — cancels the open task while it is still open (to do, in progress or in review); redraws tarefa (replace with the returned cancelled task, new version) and updates or removes its row in tarefas; no arguments: uses the open task (id, version) */
  public async cancelarTarefa(): Promise<void> {
    if (this.cancelarTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    if (!tarefa) {
      this.publish('cancelarTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['tarefa'] } });
      this.publish('cancelarTarefaStatus', 'error');
      return;
    }
    this.publish('cancelarTarefaStatus', 'loading');
    this.publish('cancelarTarefaError', null);
    try {
      const input: Input<RouteCancelar> = { id: tarefa.id, version: tarefa.version };
      const response = await runBlockingUiAction(signal => execBff<Output<RouteCancelar>>('tarefas.tarefas_equipe.cancelarTarefa', input, { mode: 'blocking', signal }));
      if (!response) {
        this.publish('cancelarTarefaError', this.unexpectedError('aborted'));
        this.publish('cancelarTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cancelarTarefaError', response.error ?? this.unexpectedError('noData'));
        this.publish('cancelarTarefaStatus', 'error');
        return;
      }
      this.applyTarefaResult(response.data.tarefa);
      this.publish('cancelarTarefaStatus', 'success');
    } catch (error) {
      this.publish('cancelarTarefaError', this.unexpectedError(this.errorName(error)));
      this.publish('cancelarTarefaStatus', 'error');
    }
  }
}
