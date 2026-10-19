/// <mls fileReference="_102047_/l2/tarefas/web/shared/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { Inicio_gestorContracts, ListaResumo, TarefaAcao } from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';

export type {
  Inicio_gestorContracts,
  ListaResumoDetalhes,
  ListaResumo,
  ListaNome,
  MembroNomeIdentificacao,
  MembroNomeDetalhes,
  MembroNome,
  TarefaAcaoDetalhes,
  TarefaAcao,
} from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof Inicio_gestorContracts> = Inicio_gestorContracts[R]['input'];
type Output<R extends keyof Inicio_gestorContracts> = Inicio_gestorContracts[R]['output'];

export type TarefasPage = Output<'tarefas.inicio_gestor.listarTarefasParaAcao'>['tarefas'];

type StateMember =
  | 'listas'
  | 'totalAbertas'
  | 'totalVenceHoje'
  | 'totalAtrasadas'
  | 'progressoChecklist'
  | 'tarefas'
  | 'selectedTarefa'
  | 'pageStatus'
  | 'obterPanoramaEquipeStatus'
  | 'obterPanoramaEquipeError'
  | 'listarTarefasParaAcaoStatus'
  | 'listarTarefasParaAcaoError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.inicio_gestor.listas': 'listas',
  'ui.tarefas.inicio_gestor.totalAbertas': 'totalAbertas',
  'ui.tarefas.inicio_gestor.totalVenceHoje': 'totalVenceHoje',
  'ui.tarefas.inicio_gestor.totalAtrasadas': 'totalAtrasadas',
  'ui.tarefas.inicio_gestor.progressoChecklist': 'progressoChecklist',
  'ui.tarefas.inicio_gestor.tarefas': 'tarefas',
  'ui.tarefas.inicio_gestor.selectedTarefa': 'selectedTarefa',
  'ui.tarefas.inicio_gestor.pageStatus': 'pageStatus',
  'ui.tarefas.inicio_gestor.obterPanoramaEquipeStatus': 'obterPanoramaEquipeStatus',
  'ui.tarefas.inicio_gestor.obterPanoramaEquipeError': 'obterPanoramaEquipeError',
  'ui.tarefas.inicio_gestor.listarTarefasParaAcaoStatus': 'listarTarefasParaAcaoStatus',
  'ui.tarefas.inicio_gestor.listarTarefasParaAcaoError': 'listarTarefasParaAcaoError',
  'ui.tarefas.inicio_gestor.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const DEFAULT_PAGE_SIZE = 20;

function emptyPage(): TarefasPage {
  return { items: [], page: 1, pageSize: DEFAULT_PAGE_SIZE, hasMore: false };
}

export class TarefasInicio_gestorShared extends StateLitElement {
  /** state listas — the lists (project or area) with the quantity of open tasks each one has; source obterPanoramaEquipe.listas; organism destaquesEquipe */
  @property({ attribute: false }) listas: ListaResumo[] = [];

  /** state totalAbertas — total of open team tasks; source obterPanoramaEquipe.totalAbertas; organism destaquesEquipe */
  @property({ attribute: false }) totalAbertas: number = 0;

  /** state totalVenceHoje — total of open team tasks due today; source obterPanoramaEquipe.totalVenceHoje; organism destaquesEquipe */
  @property({ attribute: false }) totalVenceHoje: number = 0;

  /** state totalAtrasadas — total of overdue open team tasks; source obterPanoramaEquipe.totalAtrasadas; organism destaquesEquipe */
  @property({ attribute: false }) totalAtrasadas: number = 0;

  /** state progressoChecklist — overall checklist progress of open tasks as 'done/total' text; source obterPanoramaEquipe.progressoChecklist; organism destaquesEquipe */
  @property({ attribute: false }) progressoChecklist: string = '';

  /** state tarefas — page { items, page, pageSize, hasMore } of team tasks that may need the manager's action (overdue first, then due today), with list name, assignee name and deadline and checklist indicators; source listarTarefasParaAcao.tarefas; organism tarefasParaAcao */
  @property({ attribute: false }) tarefas: TarefasPage = emptyPage();

  /** state selectedTarefa — the id of the Tarefa selected in destaquesEquipe and tarefasParaAcao (the record is the getter tarefasParaAcao); source entry.params.tarefaId; organism destaquesEquipe, tarefasParaAcao; lives in the URL */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state pageStatus — overall status of the page: loading while a load runs, error if one failed, empty when every list is empty, success otherwise */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state obterPanoramaEquipeStatus — status of the request obterPanoramaEquipe */
  @property({ attribute: false }) obterPanoramaEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state obterPanoramaEquipeError — error of the request obterPanoramaEquipe, null when none */
  @property({ attribute: false }) obterPanoramaEquipeError: ErrorState = null;

  /** state listarTarefasParaAcaoStatus — status of the request listarTarefasParaAcao */
  @property({ attribute: false }) listarTarefasParaAcaoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarTarefasParaAcaoError — error of the request listarTarefasParaAcao (also client.selectionInvalid and navigation refusals), null when none */
  @property({ attribute: false }) listarTarefasParaAcaoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.inicio_gestor.${member}`, value);
    if (member === 'selectedTarefa') {
      try {
        const url = new URL(window.location.href);
        if (value === null || value === undefined || value === '') {
          url.searchParams.delete('tarefaId');
        } else {
          url.searchParams.set('tarefaId', String(value));
        }
        history.replaceState(history.state, '', url.toString());
      } catch {
        // URL not writable: the state still holds the value
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
    void this.loadPage();
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
    const listas = getState('ui.tarefas.inicio_gestor.listas');
    if (listas !== undefined) this.assignState('ui.tarefas.inicio_gestor.listas', listas);
    const totalAbertas = getState('ui.tarefas.inicio_gestor.totalAbertas');
    if (totalAbertas !== undefined) this.assignState('ui.tarefas.inicio_gestor.totalAbertas', totalAbertas);
    const totalVenceHoje = getState('ui.tarefas.inicio_gestor.totalVenceHoje');
    if (totalVenceHoje !== undefined) this.assignState('ui.tarefas.inicio_gestor.totalVenceHoje', totalVenceHoje);
    const totalAtrasadas = getState('ui.tarefas.inicio_gestor.totalAtrasadas');
    if (totalAtrasadas !== undefined) this.assignState('ui.tarefas.inicio_gestor.totalAtrasadas', totalAtrasadas);
    const progresso = getState('ui.tarefas.inicio_gestor.progressoChecklist');
    if (progresso !== undefined) this.assignState('ui.tarefas.inicio_gestor.progressoChecklist', progresso);
    const tarefas = getState('ui.tarefas.inicio_gestor.tarefas');
    if (tarefas !== undefined) this.assignState('ui.tarefas.inicio_gestor.tarefas', tarefas);
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('obterPanoramaEquipeStatus', 'idle');
    this.publish('obterPanoramaEquipeError', null);
    this.publish('listarTarefasParaAcaoStatus', 'idle');
    this.publish('listarTarefasParaAcaoError', null);
    this.publish('scenary', '');
    this.publish('selectedTarefa', null);
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get('tarefaId');
    if (raw !== null && raw !== '') {
      this.publish('selectedTarefa', raw);
    }
  }

  private async loadPage(): Promise<void> {
    this.publish('pageStatus', 'loading');
    await Promise.all([this.obterPanoramaEquipe(), this.listarTarefasParaAcao(1, false)]);
    this.refreshPageStatus();
  }

  private refreshPageStatus(): void {
    const a = this.obterPanoramaEquipeStatus;
    const b = this.listarTarefasParaAcaoStatus;
    if (a === 'loading' || b === 'loading') {
      this.publish('pageStatus', 'loading');
      return;
    }
    if (a === 'error' || b === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    if (a === 'success' && b === 'success') {
      const isEmpty = this.listas.length === 0 && this.tarefas.items.length === 0;
      this.publish('pageStatus', isEmpty ? 'empty' : 'success');
    }
  }

  private unexpectedError(error: unknown): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
  }

  /** The row of the loaded list of tasks selected by selectedTarefa (the selected record), or null when none or not loaded */
  public get tarefasParaAcao(): TarefaAcao | null {
    if (this.selectedTarefa === null) return null;
    const found = this.tarefas.items.find(item => item.id === this.selectedTarefa);
    return found ?? null;
  }

  private checkSelection(): void {
    if (this.selectedTarefa === null) return;
    if (this.listarTarefasParaAcaoStatus !== 'success') return;
    if (this.tarefasParaAcao !== null) return;
    this.publish('listarTarefasParaAcaoError', { code: 'client.selectionInvalid', message: '', details: { tarefaId: this.selectedTarefa } });
  }

  /** select — selects a task by its id (null clears the selection); the record is read from the getter tarefasParaAcao; an id no loaded row resolves publishes client.selectionInvalid in listarTarefasParaAcaoError; argument id: the task id or null */
  public setSelectedTarefa(id: string | null): void {
    const value = id === '' ? null : id;
    if (this.listarTarefasParaAcaoError !== null && this.listarTarefasParaAcaoError.code === 'client.selectionInvalid') {
      this.publish('listarTarefasParaAcaoError', null);
    }
    this.publish('selectedTarefa', value);
    this.checkSelection();
  }

  /** Publishes the visible scene of the page; argument value: the scene name, '' for none */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** request obterPanoramaEquipe — delivers the team overview at once (open, due today and overdue totals, overall checklist progress and open tasks per list); redraws listas, totalAbertas, totalVenceHoje, totalAtrasadas and progressoChecklist (replace); no arguments, also the method to reload the overview */
  public async obterPanoramaEquipe(): Promise<void> {
    if (this.obterPanoramaEquipeStatus === 'loading') return;
    this.publish('obterPanoramaEquipeStatus', 'loading');
    this.publish('obterPanoramaEquipeError', null);
    const input: Input<'tarefas.inicio_gestor.obterPanoramaEquipe'> = {};
    try {
      const response = await execBff<Output<'tarefas.inicio_gestor.obterPanoramaEquipe'>>('tarefas.inicio_gestor.obterPanoramaEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('obterPanoramaEquipeError', response.error ?? this.unexpectedError(null));
        this.publish('obterPanoramaEquipeStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      this.publish('listas', [...response.data.listas]);
      this.publish('totalAbertas', response.data.totalAbertas);
      this.publish('totalVenceHoje', response.data.totalVenceHoje);
      this.publish('totalAtrasadas', response.data.totalAtrasadas);
      this.publish('progressoChecklist', response.data.progressoChecklist);
      this.publish('obterPanoramaEquipeStatus', 'success');
    } catch (error) {
      this.publish('obterPanoramaEquipeError', this.unexpectedError(error));
      this.publish('obterPanoramaEquipeStatus', 'error');
    }
    this.refreshPageStatus();
  }

  /** request listarTarefasParaAcao — lists the team tasks that may need a decision (overdue first, then due today) in pages; redraws tarefas (replace, or append items when append is true, keeping page and hasMore of the loaded page); arguments page: page to load starting at 1 (default 1), append: true for a "load more" that adds the next page (does nothing when tarefas.hasMore is false) */
  public async listarTarefasParaAcao(page: number = 1, append: boolean = false): Promise<void> {
    if (this.listarTarefasParaAcaoStatus === 'loading') return;
    if (append && !this.tarefas.hasMore) return;
    this.publish('listarTarefasParaAcaoStatus', 'loading');
    this.publish('listarTarefasParaAcaoError', null);
    const input: Input<'tarefas.inicio_gestor.listarTarefasParaAcao'> = {
      page: page >= 1 ? page : 1,
      pageSize: this.tarefas.pageSize > 0 ? this.tarefas.pageSize : DEFAULT_PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.inicio_gestor.listarTarefasParaAcao'>>('tarefas.inicio_gestor.listarTarefasParaAcao', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarTarefasParaAcaoError', response.error ?? this.unexpectedError(null));
        this.publish('listarTarefasParaAcaoStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      const loaded = response.data.tarefas;
      if (append) {
        this.publish('tarefas', { items: [...this.tarefas.items, ...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore });
      } else {
        this.publish('tarefas', { items: [...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore });
      }
      this.publish('listarTarefasParaAcaoStatus', 'success');
      this.checkSelection();
    } catch (error) {
      this.publish('listarTarefasParaAcaoError', this.unexpectedError(error));
      this.publish('listarTarefasParaAcaoStatus', 'error');
    }
    this.refreshPageStatus();
  }

  /** navigate — opens Tarefas da equipe (tarefas_equipe) on the task the person picked, carrying its id as tarefaId; argument tarefaId: the id of the picked task (defaults to the selected task); without an id it publishes client.preconditionMissing in listarTarefasParaAcaoError and does not navigate */
  public abrirTarefasEquipe(tarefaId: string | null = null): void {
    const id = tarefaId ?? this.selectedTarefa;
    if (id === null || id === '') {
      this.publish('listarTarefasParaAcaoError', { code: 'client.preconditionMissing', message: '', details: { params: ['tarefaId'] } });
      return;
    }
    auraNavigate(`/tarefas/tarefas_equipe?tarefaId=${encodeURIComponent(id)}`, { basePath: '/tarefas' });
  }
}
