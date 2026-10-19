/// <mls fileReference="_102047_/l2/tarefas/web/shared/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Tarefas_equipeContracts, TarefaDetalhe, TarefaEquipeItem, ListaResumo, MembroResumo } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';

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

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof Tarefas_equipeContracts> = Tarefas_equipeContracts[R]['input'];
type Output<R extends keyof Tarefas_equipeContracts> = Tarefas_equipeContracts[R]['output'];

/** Priority values accepted by the board filter. */
export type TarefaPrioridade = TarefaEquipeItem['prioridade'];
/** Status values accepted by the board filter. */
export type TarefaSituacao = TarefaEquipeItem['status'];
/** Paged list of team tasks, as the list route returns it. */
export type TarefasPage = Output<'tarefas.tarefas_equipe.listarTarefasEquipe'>['tarefas'];

/** Draft of the reassign command: the member chosen as the new responsible. */
export type ReatribuirTarefaDraft = {
  responsavelId: string | null;
};

/** Filter values the person changes; an omitted key keeps its current value, null clears it. */
export type TarefasEquipeFilterChange = {
  listaId?: string | null;
  responsavelId?: string | null;
  prioridade?: TarefaPrioridade | null;
  status?: TarefaSituacao | null;
  prazoDe?: string | null;
  prazoAte?: string | null;
  venceHoje?: boolean | null;
  atrasada?: boolean | null;
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

const DATA_KEYS = [
  'ui.tarefas.tarefas_equipe.tarefas',
  'ui.tarefas.tarefas_equipe.listas',
  'ui.tarefas.tarefas_equipe.membros',
  'ui.tarefas.tarefas_equipe.tarefa',
];

/** Members that are persisted entry params (filters), stored in localStorage under tarefas.tarefas_equipe.<name>. */
const PERSISTED_MEMBERS: string[] = [
  'listaId',
  'responsavelId',
  'prioridade',
  'status',
  'prazoDe',
  'prazoAte',
  'venceHoje',
  'atrasada',
];

const PAGE_SIZE = 20;

function parsePrioridade(raw: string | null): TarefaPrioridade | null {
  if (raw === 'low' || raw === 'medium' || raw === 'high') return raw;
  return null;
}

function parseSituacao(raw: string | null): TarefaSituacao | null {
  if (raw === 'aFazer' || raw === 'emAndamento' || raw === 'emRevisao' || raw === 'concluida' || raw === 'cancelada') return raw;
  return null;
}

function parseBoolean(raw: string | null): boolean | null {
  if (raw === null) return null;
  return raw === 'true';
}

function emptyToNull(value: string | null): string | null {
  if (value === null || value === '') return null;
  return value;
}

export class TarefasTarefas_equipeShared extends StateLitElement {
  /** state tarefas — the page of team tasks (title, list, responsible, priority, due date, status and indicators); source listarTarefasEquipe.tarefas; organism tarefasEquipe */
  @property({ attribute: false }) tarefas: TarefasPage | null = null;

  /** state listas — the lists (projects or areas) identified by name, used by the list filter; source carregarOpcoesEquipe.listas; organism tarefasEquipe */
  @property({ attribute: false }) listas: ListaResumo[] = [];

  /** state membros — the team members with name and registry status (only Active ones can be chosen as responsible); source carregarOpcoesEquipe.membros; organisms acoesGestor, tarefasEquipe */
  @property({ attribute: false }) membros: MembroResumo[] = [];

  /** state tarefa — the selected task in full (creator, responsible, history milestones, checklist, version); source obterTarefa.tarefa; organisms acoesGestor, detalheTarefa, historicoTarefa */
  @property({ attribute: false }) tarefa: TarefaDetalhe | null = null;

  /** state selectedTarefa — the id of the task selected in tarefasEquipe; source entry.params.tarefaId; organisms detalheTarefa, tarefasEquipe; lives in the URL */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state listaId — filter of the board by list id; source entry.params.listaId; organism tarefasEquipe; persisted */
  @property({ attribute: false }) listaId: string | null = null;

  /** state responsavelId — filter of the board by responsible member id; source entry.params.responsavelId; organism tarefasEquipe; persisted */
  @property({ attribute: false }) responsavelId: string | null = null;

  /** state prioridade — filter of the board by priority (low, medium, high); source entry.params.prioridade; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prioridade: TarefaPrioridade | null = null;

  /** state status — filter of the board by task status; source entry.params.status; organism tarefasEquipe; persisted */
  @property({ attribute: false }) status: TarefaSituacao | null = null;

  /** state prazoDe — filter of the board: start of the due date range; source entry.params.prazoDe; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prazoDe: string | null = null;

  /** state prazoAte — filter of the board: end of the due date range; source entry.params.prazoAte; organism tarefasEquipe; persisted */
  @property({ attribute: false }) prazoAte: string | null = null;

  /** state venceHoje — filter of the board: when true only open tasks due today; source entry.params.venceHoje; organism tarefasEquipe; persisted */
  @property({ attribute: false }) venceHoje: boolean | null = null;

  /** state atrasada — filter of the board: when true only open overdue tasks; source entry.params.atrasada; organism tarefasEquipe; persisted */
  @property({ attribute: false }) atrasada: boolean | null = null;

  /** state reatribuirTarefaDraft — draft of the reassign command: the member chosen as new responsible; source reatribuirTarefa.input; organism acoesGestor */
  @property({ attribute: false }) reatribuirTarefaDraft: ReatribuirTarefaDraft = emptyReatribuirTarefaDraft();

  /** state pageStatus — overall status of the page (loading while the initial queries run, empty when every loaded list is empty); source onLoad requests */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state carregarOpcoesEquipeStatus — status of the request carregarOpcoesEquipe */
  @property({ attribute: false }) carregarOpcoesEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state carregarOpcoesEquipeError — error of the request carregarOpcoesEquipe, null when none */
  @property({ attribute: false }) carregarOpcoesEquipeError: ErrorState = null;

  /** state listarTarefasEquipeStatus — status of the request listarTarefasEquipe */
  @property({ attribute: false }) listarTarefasEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarTarefasEquipeError — error of the request listarTarefasEquipe, null when none */
  @property({ attribute: false }) listarTarefasEquipeError: ErrorState = null;

  /** state obterTarefaStatus — status of the request obterTarefa (opening the selected task) */
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

  private reloadPending = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.tarefas_equipe.${member}`, value);
    if (PERSISTED_MEMBERS.includes(member)) {
      try {
        const storageKey = `tarefas.tarefas_equipe.${member}`;
        if (value === null) {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, String(value));
        }
      } catch {
        // storage unavailable: the value stays only in memory
      }
    }
    if (member === 'selectedTarefa') {
      try {
        const url = new URL(window.location.href);
        if (value === null) {
          url.searchParams.delete('tarefaId');
        } else {
          url.searchParams.set('tarefaId', String(value));
        }
        history.replaceState(history.state, '', url.toString());
      } catch {
        // URL not writable: the selection stays only in memory
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
    void this.startLoad();
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
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
  }

  private resetVisit(): void {
    this.reloadPending = false;
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

  private readParam(name: string, useStorage: boolean): string | null {
    const raw = new URLSearchParams(window.location.search).get(name);
    if (raw !== null && raw !== '') return raw;
    if (!useStorage) return null;
    try {
      const stored = localStorage.getItem(`tarefas.tarefas_equipe.${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private applyEntryParams(): void {
    this.publish('listaId', this.readParam('listaId', true));
    this.publish('responsavelId', this.readParam('responsavelId', true));
    this.publish('prioridade', parsePrioridade(this.readParam('prioridade', true)));
    this.publish('status', parseSituacao(this.readParam('status', true)));
    this.publish('prazoDe', this.readParam('prazoDe', true));
    this.publish('prazoAte', this.readParam('prazoAte', true));
    this.publish('venceHoje', parseBoolean(this.readParam('venceHoje', true)));
    this.publish('atrasada', parseBoolean(this.readParam('atrasada', true)));
    this.publish('selectedTarefa', this.readParam('tarefaId', false));
  }

  private async startLoad(): Promise<void> {
    await Promise.all([this.carregarOpcoesEquipe(), this.listarTarefasEquipe()]);
    const selected = this.selectedTarefa;
    if (selected !== null) await this.obterTarefa(selected);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private refreshPageStatus(): void {
    const statuses = [this.carregarOpcoesEquipeStatus, this.listarTarefasEquipeStatus];
    if (statuses.includes('loading')) {
      this.publish('pageStatus', 'loading');
      return;
    }
    if (statuses.includes('error')) {
      this.publish('pageStatus', 'error');
      return;
    }
    if (statuses.includes('idle')) return;
    const rows = this.tarefas ? this.tarefas.items : [];
    if (rows.length === 0 && this.listas.length === 0 && this.membros.length === 0) {
      this.publish('pageStatus', 'empty');
      return;
    }
    this.publish('pageStatus', 'success');
  }

  /** setScenario — publishes the visible scene of the page; resets the result of every command. */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the reassign command (the member chosen as new responsible); resets the result of every command. */
  public setReatribuirTarefaDraft(value: ReatribuirTarefaDraft): void {
    this.resetCommandResults();
    this.publish('reatribuirTarefaDraft', value);
  }

  /** request carregarOpcoesEquipe — loads the lists and the team members used by the board filters and by the choice of the new responsible; redraws listas and membros (replace); no arguments, also the method to reload the options */
  public async carregarOpcoesEquipe(): Promise<void> {
    if (this.carregarOpcoesEquipeStatus === 'loading') return;
    this.publish('carregarOpcoesEquipeStatus', 'loading');
    this.publish('carregarOpcoesEquipeError', null);
    this.publish('pageStatus', 'loading');
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.carregarOpcoesEquipe'>>(
        'tarefas.tarefas_equipe.carregarOpcoesEquipe',
        {} satisfies Input<'tarefas.tarefas_equipe.carregarOpcoesEquipe'>,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('carregarOpcoesEquipeError', response.error ?? this.unexpectedError(null));
        this.publish('carregarOpcoesEquipeStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      this.publish('listas', response.data.listas);
      this.publish('membros', response.data.membros);
      this.publish('carregarOpcoesEquipeStatus', 'success');
    } catch (error) {
      this.publish('carregarOpcoesEquipeError', this.unexpectedError(error));
      this.publish('carregarOpcoesEquipeStatus', 'error');
    }
    this.refreshPageStatus();
  }

  private applyFilterChange(filters: TarefasEquipeFilterChange): boolean {
    let changed = false;
    if (filters.listaId !== undefined) {
      this.publish('listaId', emptyToNull(filters.listaId));
      changed = true;
    }
    if (filters.responsavelId !== undefined) {
      this.publish('responsavelId', emptyToNull(filters.responsavelId));
      changed = true;
    }
    if (filters.prioridade !== undefined) {
      this.publish('prioridade', filters.prioridade);
      changed = true;
    }
    if (filters.status !== undefined) {
      this.publish('status', filters.status);
      changed = true;
    }
    if (filters.prazoDe !== undefined) {
      this.publish('prazoDe', emptyToNull(filters.prazoDe));
      changed = true;
    }
    if (filters.prazoAte !== undefined) {
      this.publish('prazoAte', emptyToNull(filters.prazoAte));
      changed = true;
    }
    if (filters.venceHoje !== undefined) {
      this.publish('venceHoje', filters.venceHoje);
      changed = true;
    }
    if (filters.atrasada !== undefined) {
      this.publish('atrasada', filters.atrasada);
      changed = true;
    }
    return changed;
  }

  /** request listarTarefasEquipe — loads the paged board of every team task with the current filters; redraws tarefas (replace, or append the next page when append is true); filters: values the person changed (omitted keeps, null clears; any change reloads from the first page; with no argument it reloads the current view); page: page to load (default 1); append: true for "load more", only when tarefas.hasMore */
  public async listarTarefasEquipe(filters: TarefasEquipeFilterChange = {}, page = 1, append = false): Promise<void> {
    const changed = this.applyFilterChange(filters);
    const pageToLoad = changed ? 1 : page;
    const appendRows = changed ? false : append;
    if (this.listarTarefasEquipeStatus === 'loading') {
      if (changed) this.reloadPending = true;
      return;
    }
    const current = this.tarefas;
    if (appendRows && (current === null || !current.hasMore)) return;
    this.publish('listarTarefasEquipeStatus', 'loading');
    this.publish('listarTarefasEquipeError', null);
    this.publish('pageStatus', 'loading');
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
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.listarTarefasEquipe'>>(
        'tarefas.tarefas_equipe.listarTarefasEquipe',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('listarTarefasEquipeError', response.error ?? this.unexpectedError(null));
        this.publish('listarTarefasEquipeStatus', 'error');
      } else {
        const incoming = response.data.tarefas;
        const base = this.tarefas;
        const next: TarefasPage = appendRows && base !== null ? { ...incoming, items: [...base.items, ...incoming.items] } : incoming;
        this.publish('tarefas', next);
        this.publish('listarTarefasEquipeStatus', 'success');
      }
    } catch (error) {
      this.publish('listarTarefasEquipeError', this.unexpectedError(error));
      this.publish('listarTarefasEquipeStatus', 'error');
    }
    this.refreshPageStatus();
    if (this.reloadPending) {
      this.reloadPending = false;
      void this.listarTarefasEquipe();
    }
  }

  /** request obterTarefa — selects a task and opens it in full (detail, checklist and history milestones); redraws selectedTarefa (replace, kept in the URL) and tarefa (replace); tarefaId: id of the picked task, or null to clear the selection */
  public async obterTarefa(tarefaId: string | null): Promise<void> {
    if (tarefaId === null || tarefaId === '') {
      this.resetCommandResults();
      this.publish('selectedTarefa', null);
      this.publish('tarefa', null);
      this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
      this.publish('obterTarefaError', null);
      this.publish('obterTarefaStatus', 'idle');
      return;
    }
    if (this.obterTarefaStatus === 'loading') return;
    this.resetCommandResults();
    if (tarefaId !== this.selectedTarefa) {
      this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
    }
    this.publish('selectedTarefa', tarefaId);
    this.publish('obterTarefaStatus', 'loading');
    this.publish('obterTarefaError', null);
    try {
      const response = await execBff<Output<'tarefas.tarefas_equipe.obterTarefa'>>(
        'tarefas.tarefas_equipe.obterTarefa',
        { tarefaId } satisfies Input<'tarefas.tarefas_equipe.obterTarefa'>,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('tarefa', null);
        this.publish('obterTarefaError', response.error ?? this.unexpectedError(null));
        this.publish('obterTarefaStatus', 'error');
        return;
      }
      this.publish('tarefa', response.data.tarefa);
      this.publish('obterTarefaStatus', 'success');
    } catch (error) {
      this.publish('tarefa', null);
      this.publish('obterTarefaError', this.unexpectedError(error));
      this.publish('obterTarefaStatus', 'error');
    }
  }

  /** Applies the returned task to its board row (upsert by id, never inserted when absent); removes the row when it no longer matches the active filters. */
  private patchRow(updated: TarefaDetalhe): void {
    const current = this.tarefas;
    if (current === null) return;
    const matchesResponsavel = this.responsavelId === null || this.responsavelId === updated.responsavelId;
    const matchesStatus = this.status === null || this.status === updated.status;
    const matchesOpen = (this.venceHoje !== true && this.atrasada !== true) || updated.details.aberta;
    const stays = matchesResponsavel && matchesStatus && matchesOpen;
    const items: TarefaEquipeItem[] = [];
    for (const row of current.items) {
      if (row.id !== updated.id) {
        items.push(row);
      } else if (stays) {
        items.push({
          ...row,
          titulo: updated.titulo,
          responsavelId: updated.responsavelId,
          responsavel: updated.responsavel,
          prioridade: updated.prioridade,
          prazo: updated.prazo,
          status: updated.status,
        });
      }
    }
    this.publish('tarefas', { ...current, items });
  }

  /** request reatribuirTarefa — swaps the responsible of the selected task for the member in reatribuirTarefaDraft (must be an Active member); redraws tarefa (replace with the returned task, new version) and the matching row of tarefas (upsert), then clears the draft; no arguments, reads the selected tarefa (id, version) and the draft */
  public async reatribuirTarefa(): Promise<void> {
    if (this.reatribuirTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    const responsavelId = this.reatribuirTarefaDraft.responsavelId;
    if (tarefa === null || responsavelId === null || responsavelId === '') {
      const stateKeys: string[] = [];
      if (tarefa === null) stateKeys.push('ui.tarefas.tarefas_equipe.tarefa');
      if (responsavelId === null || responsavelId === '') stateKeys.push('ui.tarefas.tarefas_equipe.reatribuirTarefaDraft');
      this.publish('reatribuirTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys } });
      this.publish('reatribuirTarefaStatus', 'error');
      return;
    }
    this.publish('reatribuirTarefaStatus', 'loading');
    this.publish('reatribuirTarefaError', null);
    const input: Input<'tarefas.tarefas_equipe.reatribuirTarefa'> = {
      id: tarefa.id,
      version: tarefa.version,
      responsavelId,
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.tarefas_equipe.reatribuirTarefa'>>('tarefas.tarefas_equipe.reatribuirTarefa', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('reatribuirTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('reatribuirTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('reatribuirTarefaError', response.error ?? this.unexpectedError(null));
        this.publish('reatribuirTarefaStatus', 'error');
        return;
      }
      const updated = response.data.tarefa;
      this.publish('tarefa', updated);
      this.patchRow(updated);
      this.publish('reatribuirTarefaDraft', emptyReatribuirTarefaDraft());
      this.publish('reatribuirTarefaStatus', 'success');
    } catch (error) {
      this.publish('reatribuirTarefaError', this.unexpectedError(error));
      this.publish('reatribuirTarefaStatus', 'error');
    }
  }

  /** request cancelarTarefa — cancels the selected task while it is still open; redraws tarefa (replace with the returned cancelled task, new version) and the matching row of tarefas (upsert, or remove when it no longer matches the filters); no arguments, reads the selected tarefa (id, version) */
  public async cancelarTarefa(): Promise<void> {
    if (this.cancelarTarefaStatus === 'loading') return;
    const tarefa = this.tarefa;
    if (tarefa === null) {
      this.publish('cancelarTarefaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['ui.tarefas.tarefas_equipe.tarefa'] } });
      this.publish('cancelarTarefaStatus', 'error');
      return;
    }
    this.publish('cancelarTarefaStatus', 'loading');
    this.publish('cancelarTarefaError', null);
    const input: Input<'tarefas.tarefas_equipe.cancelarTarefa'> = {
      id: tarefa.id,
      version: tarefa.version,
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.tarefas_equipe.cancelarTarefa'>>('tarefas.tarefas_equipe.cancelarTarefa', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('cancelarTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cancelarTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cancelarTarefaError', response.error ?? this.unexpectedError(null));
        this.publish('cancelarTarefaStatus', 'error');
        return;
      }
      const updated = response.data.tarefa;
      this.publish('tarefa', updated);
      this.patchRow(updated);
      this.publish('cancelarTarefaStatus', 'success');
    } catch (error) {
      this.publish('cancelarTarefaError', this.unexpectedError(error));
      this.publish('cancelarTarefaStatus', 'error');
    }
  }
}
