/// <mls fileReference="_102047_/l2/tarefas/web/shared/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { Inicio_gestorContracts, ListaResumoDetalhes, ListaResumo, ListaNome, MembroNomeIdentificacao, MembroNomeDetalhes, MembroNome, TarefaAcaoDetalhes, TarefaAcao } from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';

export type { Inicio_gestorContracts, ListaResumoDetalhes, ListaResumo, ListaNome, MembroNomeIdentificacao, MembroNomeDetalhes, MembroNome, TarefaAcaoDetalhes, TarefaAcao } from '/_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof Inicio_gestorContracts> = Inicio_gestorContracts[R]['input'];
type Output<R extends keyof Inicio_gestorContracts> = Inicio_gestorContracts[R]['output'];

type TarefasPage = Output<'tarefas.inicio_gestor.listarTarefasParaAcao'>['tarefas'];
type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

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

const DATA_KEYS = [
  'ui.tarefas.inicio_gestor.listas',
  'ui.tarefas.inicio_gestor.totalAbertas',
  'ui.tarefas.inicio_gestor.totalVenceHoje',
  'ui.tarefas.inicio_gestor.totalAtrasadas',
  'ui.tarefas.inicio_gestor.progressoChecklist',
  'ui.tarefas.inicio_gestor.tarefas',
];

const PAGE_SIZE = 20;

export class TarefasInicio_gestorShared extends StateLitElement {
  /** state listas — the list of Lista (projeto ou área) with the count of open tasks each one has; source obterPanoramaEquipe.listas; organism destaquesEquipe */
  @property({ attribute: false }) listas: ListaResumo[] = [];

  /** state totalAbertas — total of open tasks of the team; source obterPanoramaEquipe.totalAbertas; organism destaquesEquipe */
  @property({ attribute: false }) totalAbertas = 0;

  /** state totalVenceHoje — total of open tasks of the team due today; source obterPanoramaEquipe.totalVenceHoje; organism destaquesEquipe */
  @property({ attribute: false }) totalVenceHoje = 0;

  /** state totalAtrasadas — total of overdue open tasks of the team; source obterPanoramaEquipe.totalAtrasadas; organism destaquesEquipe */
  @property({ attribute: false }) totalAtrasadas = 0;

  /** state progressoChecklist — overall checklist progress as 'done/total'; source obterPanoramaEquipe.progressoChecklist; organism destaquesEquipe */
  @property({ attribute: false }) progressoChecklist = '';

  /** state tarefas — page { items, page, pageSize, hasMore } of team tasks that may ask for a manager decision (overdue and due today); source listarTarefasParaAcao.tarefas; organism tarefasParaAcao */
  @property({ attribute: false }) tarefas: TarefasPage | null = null;

  /** state selectedTarefa — the id of the Tarefa selected in destaquesEquipe and tarefasParaAcao (null when none); source entry.params.tarefaId; organisms destaquesEquipe, tarefasParaAcao; lives in the URL */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state pageStatus — overall status of the page: idle, loading, empty, success or error; derived from the two initial loads */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state obterPanoramaEquipeStatus — status of the request obterPanoramaEquipe */
  @property({ attribute: false }) obterPanoramaEquipeStatus: RequestStatus = 'idle';

  /** state obterPanoramaEquipeError — error of the request obterPanoramaEquipe, null when none */
  @property({ attribute: false }) obterPanoramaEquipeError: ErrorState = null;

  /** state listarTarefasParaAcaoStatus — status of the request listarTarefasParaAcao */
  @property({ attribute: false }) listarTarefasParaAcaoStatus: RequestStatus = 'idle';

  /** state listarTarefasParaAcaoError — error of the request listarTarefasParaAcao (also client.selectionInvalid when the selected id is not in the loaded rows), null when none */
  @property({ attribute: false }) listarTarefasParaAcaoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private popstateHandler = (): void => {
    const suffix = '/tarefas/inicio_gestor';
    if (window.location.pathname.endsWith(suffix)) {
      this.resetVisit();
      this.startVisit();
    }
  };

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.inicio_gestor.${member}`, value);
    if (member === 'selectedTarefa') {
      try {
        const url = new URL(window.location.href);
        const raw = value as unknown;
        if (typeof raw === 'string' && raw !== '') {
          url.searchParams.set('tarefaId', raw);
        } else {
          url.searchParams.delete('tarefaId');
        }
        history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
      } catch {
        // URL update is best effort
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    for (const key of DATA_KEYS) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.popstateHandler);
    this.startVisit();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.popstateHandler);
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

  /** Publishes the initial value of every transient member: a new visit never shows an old status, error or scene. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('obterPanoramaEquipeStatus', 'idle');
    this.publish('obterPanoramaEquipeError', null);
    this.publish('listarTarefasParaAcaoStatus', 'idle');
    this.publish('listarTarefasParaAcaoError', null);
  }

  private startVisit(): void {
    this.applyEntryParams();
    void this.loadInitial();
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get('tarefaId');
    this.publish('selectedTarefa', raw !== null && raw !== '' ? raw : null);
  }

  private async loadInitial(): Promise<void> {
    await Promise.all([this.obterPanoramaEquipe(), this.listarTarefasParaAcao(1, false)]);
    this.refreshPageStatus();
  }

  private refreshPageStatus(): void {
    const a = this.obterPanoramaEquipeStatus;
    const b = this.listarTarefasParaAcaoStatus;
    if (a === 'error' || b === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    if (a === 'loading' || b === 'loading') {
      this.publish('pageStatus', 'loading');
      return;
    }
    if (a === 'idle' || b === 'idle') {
      this.publish('pageStatus', 'idle');
      return;
    }
    const listasEmpty = this.listas.length === 0;
    const tarefasEmpty = !this.tarefas || this.tarefas.items.length === 0;
    this.publish('pageStatus', listasEmpty && tarefasEmpty ? 'empty' : 'success');
  }

  /** Row of the loaded tarefas list whose id is selectedTarefa (organism tarefasParaAcao); null when nothing is selected or the row is not loaded. */
  public get tarefasParaAcao(): TarefaAcao | null {
    const id = this.selectedTarefa;
    if (id === null || !this.tarefas) return null;
    const row = this.tarefas.items.find((item) => item.id === id);
    return row ?? null;
  }

  /** select — selects the Tarefa with this id (or clears the selection with null) in destaquesEquipe and tarefasParaAcao; an id that is not in the loaded rows publishes client.selectionInvalid in listarTarefasParaAcaoError; the selected record is read through the getter tarefasParaAcao; arguments: id of the task or null */
  public selectTarefasParaAcao(id: string | null): void {
    if (id === null || id === '') {
      this.publish('selectedTarefa', null);
      this.publish('listarTarefasParaAcaoError', null);
      return;
    }
    const found = this.tarefas ? this.tarefas.items.some((item) => item.id === id) : false;
    if (!found) {
      this.publish('listarTarefasParaAcaoError', { code: 'client.selectionInvalid', message: '', details: { tarefaId: id } });
      return;
    }
    this.publish('listarTarefasParaAcaoError', null);
    this.publish('selectedTarefa', id);
  }

  /** scene — publishes the visible scene of the page; argument: the scene name ('' for none) */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  private unexpectedError(error: unknown): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
  }

  /** request obterPanoramaEquipe — delivers the team overview: totals of open, due-today and overdue tasks, overall checklist progress and open tasks per list; redraws listas, totalAbertas, totalVenceHoje, totalAtrasadas and progressoChecklist (replace); no arguments. Call it again to reload the overview. */
  public async obterPanoramaEquipe(): Promise<void> {
    if (this.obterPanoramaEquipeStatus === 'loading') return;
    this.publish('obterPanoramaEquipeStatus', 'loading');
    this.publish('obterPanoramaEquipeError', null);
    this.refreshPageStatus();
    try {
      const input: Input<'tarefas.inicio_gestor.obterPanoramaEquipe'> = {};
      const response = await execBff<Output<'tarefas.inicio_gestor.obterPanoramaEquipe'>>('tarefas.inicio_gestor.obterPanoramaEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('obterPanoramaEquipeError', response.error ?? this.unexpectedError(null));
        this.publish('obterPanoramaEquipeStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      const output = response.data;
      this.publish('listas', output.listas);
      this.publish('totalAbertas', output.totalAbertas);
      this.publish('totalVenceHoje', output.totalVenceHoje);
      this.publish('totalAtrasadas', output.totalAtrasadas);
      this.publish('progressoChecklist', output.progressoChecklist);
      this.publish('obterPanoramaEquipeStatus', 'success');
    } catch (error) {
      this.publish('obterPanoramaEquipeError', this.unexpectedError(error));
      this.publish('obterPanoramaEquipeStatus', 'error');
    }
    this.refreshPageStatus();
  }

  /** request listarTarefasParaAcao — lists the team tasks that may ask for a manager decision (overdue first, then due today), with list and owner names, in pages; redraws tarefas (replace, or append the next page to its items when append is true; append does nothing when the loaded page has no more); arguments: page = page number to load starting at 1 (default 1), append = true for a "load more" that adds the page to the current items */
  public async listarTarefasParaAcao(page = 1, append = false): Promise<void> {
    if (this.listarTarefasParaAcaoStatus === 'loading') return;
    const current = this.tarefas;
    if (append && (!current || !current.hasMore)) return;
    this.publish('listarTarefasParaAcaoStatus', 'loading');
    this.publish('listarTarefasParaAcaoError', null);
    this.refreshPageStatus();
    try {
      const input: Input<'tarefas.inicio_gestor.listarTarefasParaAcao'> = {
        page: page >= 1 ? page : 1,
        pageSize: current ? current.pageSize : PAGE_SIZE,
      };
      const response = await execBff<Output<'tarefas.inicio_gestor.listarTarefasParaAcao'>>('tarefas.inicio_gestor.listarTarefasParaAcao', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarTarefasParaAcaoError', response.error ?? this.unexpectedError(null));
        this.publish('listarTarefasParaAcaoStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      const loaded = response.data.tarefas;
      const base = this.tarefas;
      if (append && base) {
        this.publish('tarefas', { items: [...base.items, ...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore });
      } else {
        this.publish('tarefas', loaded);
      }
      const selected = this.selectedTarefa;
      const rows = this.tarefas ? this.tarefas.items : [];
      if (selected !== null && !rows.some((item) => item.id === selected)) {
        this.publish('listarTarefasParaAcaoError', { code: 'client.selectionInvalid', message: '', details: { tarefaId: selected } });
      }
      this.publish('listarTarefasParaAcaoStatus', 'success');
    } catch (error) {
      this.publish('listarTarefasParaAcaoError', this.unexpectedError(error));
      this.publish('listarTarefasParaAcaoStatus', 'error');
    }
    this.refreshPageStatus();
  }

  /** navigate — opens Tarefas da equipe (tarefas_equipe) on the task the person picked in tarefasParaAcao, to reassign or cancel it; argument: id of the picked task (null refuses with client.preconditionMissing in listarTarefasParaAcaoError) */
  public abrirTarefasEquipe(tarefaId: string | null): void {
    if (tarefaId === null || tarefaId === '') {
      this.publish('listarTarefasParaAcaoError', { code: 'client.preconditionMissing', message: '', details: { params: ['tarefaId'] } });
      return;
    }
    auraNavigate(`/tarefas/tarefas_equipe?tarefaId=${encodeURIComponent(tarefaId)}`, { basePath: '/tarefas' });
  }
}
