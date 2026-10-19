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

const PAGE_SIZE = 20;

export class TarefasInicio_gestorShared extends StateLitElement {
  /** state listas — the list of Lista (projeto ou área) with the count of open tasks each one has; source obterPanoramaEquipe.listas; organism destaquesEquipe */
  @property({ attribute: false }) listas: ListaResumo[] = [];

  /** state totalAbertas — total of open tasks of the team; source obterPanoramaEquipe.totalAbertas; organism destaquesEquipe */
  @property({ attribute: false }) totalAbertas: number = 0;

  /** state totalVenceHoje — total of open tasks of the team due today; source obterPanoramaEquipe.totalVenceHoje; organism destaquesEquipe */
  @property({ attribute: false }) totalVenceHoje: number = 0;

  /** state totalAtrasadas — total of overdue open tasks of the team; source obterPanoramaEquipe.totalAtrasadas; organism destaquesEquipe */
  @property({ attribute: false }) totalAtrasadas: number = 0;

  /** state progressoChecklist — overall checklist progress of the open tasks, text 'done/total'; source obterPanoramaEquipe.progressoChecklist; organism destaquesEquipe */
  @property({ attribute: false }) progressoChecklist: string = '';

  /** state tarefas — page { items, page, pageSize, hasMore } of team tasks that may ask for a manager decision (overdue first, then due today), with list name and assignee name; source listarTarefasParaAcao.tarefas; organism tarefasParaAcao */
  @property({ attribute: false }) tarefas: TarefasPage | null = null;

  /** state selectedTarefa — the id of the Tarefa selected in destaquesEquipe and tarefasParaAcao; the selected record is the getter tarefasParaAcao; source entry.params.tarefaId; organisms destaquesEquipe, tarefasParaAcao */
  @property({ attribute: false }) selectedTarefa: string | null = null;

  /** state pageStatus — overall status of the page: idle, loading, empty (nothing loaded), success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state obterPanoramaEquipeStatus — status of the request obterPanoramaEquipe */
  @property({ attribute: false }) obterPanoramaEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state obterPanoramaEquipeError — error of the request obterPanoramaEquipe, null when none */
  @property({ attribute: false }) obterPanoramaEquipeError: ErrorState = null;

  /** state listarTarefasParaAcaoStatus — status of the request listarTarefasParaAcao */
  @property({ attribute: false }) listarTarefasParaAcaoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarTarefasParaAcaoError — error of the request listarTarefasParaAcao (also client.selectionInvalid and client.preconditionMissing of the selection and navigation), null when none */
  @property({ attribute: false }) listarTarefasParaAcaoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.inicio_gestor.${member}`, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
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
    void this.initialLoad();
  }

  public disconnectedCallback(): void {
    unsubscribe([...STATE_KEYS], this);
    this.subscribed = false;
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

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null) return fromUrl;
    try {
      return localStorage.getItem(`tarefas.inicio_gestor.${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const tarefaId = this.readParam('tarefaId');
    this.publish('selectedTarefa', tarefaId !== null && tarefaId !== '' ? tarefaId : null);
  }

  private unexpectedError(error: unknown): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
  }

  private findTarefa(id: string): TarefaAcao | null {
    const rows = this.tarefas ? this.tarefas.items : [];
    return rows.find((row) => row.id === id) ?? null;
  }

  /** getter — the selected Tarefa record of tarefasParaAcao: the loaded row whose id is selectedTarefa, or null when nothing is selected or the row is not loaded */
  public get tarefasParaAcao(): TarefaAcao | null {
    if (this.selectedTarefa === null) return null;
    return this.findTarefa(this.selectedTarefa);
  }

  private refreshPageStatus(): void {
    if (this.obterPanoramaEquipeStatus === 'error' || this.listarTarefasParaAcaoStatus === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    if (this.obterPanoramaEquipeStatus === 'loading' || this.listarTarefasParaAcaoStatus === 'loading') {
      this.publish('pageStatus', 'loading');
      return;
    }
    const noTarefas = this.tarefas === null || this.tarefas.items.length === 0;
    if (this.listas.length === 0 && noTarefas) {
      this.publish('pageStatus', 'empty');
      return;
    }
    this.publish('pageStatus', 'success');
  }

  private async initialLoad(): Promise<void> {
    this.publish('pageStatus', 'loading');
    await Promise.all([this.obterPanoramaEquipe(), this.listarTarefasParaAcao(1, false)]);
    if (
      this.listarTarefasParaAcaoStatus === 'success' &&
      this.selectedTarefa !== null &&
      this.findTarefa(this.selectedTarefa) === null
    ) {
      this.publish('selectedTarefa', null);
      this.publish('listarTarefasParaAcaoError', { code: 'client.selectionInvalid', message: '', details: { stateKeys: ['selectedTarefa'] } });
    }
    this.refreshPageStatus();
  }

  /** setScenario — publishes the visible scene of the page; scene id as string */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** select — selects the Tarefa of tarefasParaAcao by id (null clears); the selected record is the getter tarefasParaAcao; an id that is not among the loaded rows publishes client.selectionInvalid in listarTarefasParaAcaoError and keeps the selection empty */
  public selectTarefasParaAcao(id: string | null): void {
    if (id === null || id === '') {
      this.publish('selectedTarefa', null);
      this.publish('listarTarefasParaAcaoError', null);
      return;
    }
    if (this.findTarefa(id) === null) {
      this.publish('selectedTarefa', null);
      this.publish('listarTarefasParaAcaoError', { code: 'client.selectionInvalid', message: '', details: { stateKeys: ['selectedTarefa'] } });
      return;
    }
    this.publish('selectedTarefa', id);
    this.publish('listarTarefasParaAcaoError', null);
  }

  /** request obterPanoramaEquipe — delivers the team overview at once (open, due today and overdue totals, overall checklist progress, open tasks per list); redraws listas, totalAbertas, totalVenceHoje, totalAtrasadas and progressoChecklist (replace); no arguments, also the method to reload the overview */
  public async obterPanoramaEquipe(): Promise<void> {
    if (this.obterPanoramaEquipeStatus === 'loading') return;
    this.publish('obterPanoramaEquipeStatus', 'loading');
    this.publish('obterPanoramaEquipeError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'tarefas.inicio_gestor.obterPanoramaEquipe'> = {};
    try {
      const response = await execBff<Output<'tarefas.inicio_gestor.obterPanoramaEquipe'>>('tarefas.inicio_gestor.obterPanoramaEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('obterPanoramaEquipeError', response.error);
        this.publish('obterPanoramaEquipeStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      const output = response.data;
      this.publish('listas', [...output.listas]);
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

  /** request listarTarefasParaAcao — lists the team tasks that may ask for a manager decision (overdue first, then due today), in pages; redraws tarefas (replace, or append of items when append is true, keeping page and hasMore of the loaded page); arguments: page = page number to load starting at 1 (default 1), append = true for a "load more" that adds the next page (does nothing when the list says there is no more); also the method to reload the list */
  public async listarTarefasParaAcao(page: number = 1, append: boolean = false): Promise<void> {
    if (this.listarTarefasParaAcaoStatus === 'loading') return;
    if (append && (this.tarefas === null || !this.tarefas.hasMore)) return;
    this.publish('listarTarefasParaAcaoStatus', 'loading');
    this.publish('listarTarefasParaAcaoError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'tarefas.inicio_gestor.listarTarefasParaAcao'> = {
      page: Number.isFinite(page) && page >= 1 ? page : 1,
      pageSize: this.tarefas !== null && this.tarefas.pageSize > 0 ? this.tarefas.pageSize : PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.inicio_gestor.listarTarefasParaAcao'>>('tarefas.inicio_gestor.listarTarefasParaAcao', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarTarefasParaAcaoError', response.error);
        this.publish('listarTarefasParaAcaoStatus', 'error');
        this.refreshPageStatus();
        return;
      }
      const loaded = response.data.tarefas;
      if (append && this.tarefas !== null) {
        this.publish('tarefas', {
          items: [...this.tarefas.items, ...loaded.items],
          page: loaded.page,
          pageSize: loaded.pageSize,
          hasMore: loaded.hasMore,
        });
      } else {
        this.publish('tarefas', { items: [...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore });
      }
      this.publish('listarTarefasParaAcaoStatus', 'success');
    } catch (error) {
      this.publish('listarTarefasParaAcaoError', this.unexpectedError(error));
      this.publish('listarTarefasParaAcaoStatus', 'error');
    }
    this.refreshPageStatus();
  }

  /** navigate — opens the page tarefas_equipe (reassign or cancel a task) from tarefasParaAcao, carrying the picked task id as its tarefaId param; argument: tarefaId = id of the task the person opens (null refuses with client.preconditionMissing in listarTarefasParaAcaoError) */
  public abrirTarefasEquipe(tarefaId: string | null): void {
    if (tarefaId === null || tarefaId === '') {
      this.publish('listarTarefasParaAcaoError', { code: 'client.preconditionMissing', message: '', details: { params: ['tarefaId'] } });
      return;
    }
    auraNavigate(`/tarefas/tarefas_equipe?tarefaId=${encodeURIComponent(tarefaId)}`, { basePath: '/tarefas' });
  }
}
