/// <mls fileReference="_102047_/l2/tarefas/web/shared/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type { Meus_avisosContracts, AvisoResumoDetails, AvisoResumo, TarefaAvisoDetails, TarefaAviso, AvisoLinhaTarefa, AvisoDetalheDetails, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';

export type { Meus_avisosContracts, AvisoResumoDetails, AvisoResumo, TarefaAvisoDetails, TarefaAviso, AvisoLinhaTarefa, AvisoDetalheDetails, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';

type Input<R extends keyof Meus_avisosContracts> = Meus_avisosContracts[R]['input'];
type Output<R extends keyof Meus_avisosContracts> = Meus_avisosContracts[R]['output'];

/** Page of daily notices: items plus paging info. */
export type AvisosPage = Output<'tarefas.meus_avisos.qryPaginaMeusAvisos'>['avisos'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

type StateMember =
  | 'avisos'
  | 'avisoAtual'
  | 'selectedAvisoVencimento'
  | 'filtroDataInicio'
  | 'filtroDataFim'
  | 'pageStatus'
  | 'qryPaginaMeusAvisosStatus'
  | 'qryPaginaMeusAvisosError'
  | 'qryListarMeusAvisosStatus'
  | 'qryListarMeusAvisosError'
  | 'qryAvisoPorIdStatus'
  | 'qryAvisoPorIdError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.meus_avisos.avisos': 'avisos',
  'ui.tarefas.meus_avisos.avisoAtual': 'avisoAtual',
  'ui.tarefas.meus_avisos.selectedAvisoVencimento': 'selectedAvisoVencimento',
  'ui.tarefas.meus_avisos.filtroDataInicio': 'filtroDataInicio',
  'ui.tarefas.meus_avisos.filtroDataFim': 'filtroDataFim',
  'ui.tarefas.meus_avisos.pageStatus': 'pageStatus',
  'ui.tarefas.meus_avisos.qryPaginaMeusAvisosStatus': 'qryPaginaMeusAvisosStatus',
  'ui.tarefas.meus_avisos.qryPaginaMeusAvisosError': 'qryPaginaMeusAvisosError',
  'ui.tarefas.meus_avisos.qryListarMeusAvisosStatus': 'qryListarMeusAvisosStatus',
  'ui.tarefas.meus_avisos.qryListarMeusAvisosError': 'qryListarMeusAvisosError',
  'ui.tarefas.meus_avisos.qryAvisoPorIdStatus': 'qryAvisoPorIdStatus',
  'ui.tarefas.meus_avisos.qryAvisoPorIdError': 'qryAvisoPorIdError',
  'ui.tarefas.meus_avisos.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PAGE_SIZE = 20;
const ROUTE_PATH = '/tarefas/meus_avisos';

function emptyAvisosPage(): AvisosPage {
  return { items: [], page: 1, pageSize: PAGE_SIZE, hasMore: false };
}

export class TarefasMeus_avisosShared extends StateLitElement {
  /** state avisos — the list of daily due-date notices of the logged person, with reference date, delivery status, totals and generation/finish record; source qryPaginaMeusAvisos.avisos; organisms historicoAvisos, listaAvisos */
  @property({ attribute: false }) avisos: AvisosPage = emptyAvisosPage();

  /** state avisoAtual — the notice shown in the detail (latest notice at load, or the one opened by id) with totals and task lines; null when the person has no notice; source qryPaginaMeusAvisos.avisoAtual; organism avisoDoDia */
  @property({ attribute: false }) avisoAtual: AvisoDetalhe | null = null;

  /** state selectedAvisoVencimento — the id of the notice selected in listaAvisos; source entry.params.avisoVencimentoId; organisms avisoDoDia, listaAvisos; lives in the URL */
  @property({ attribute: false }) selectedAvisoVencimento: string | null = null;

  /** state filtroDataInicio — filter of listaAvisos: inclusive start of the reference-date period (YYYY-MM-DD) or null; source draft added for qryListarMeusAvisos */
  @property({ attribute: false }) filtroDataInicio: string | null = null;

  /** state filtroDataFim — filter of listaAvisos: inclusive end of the reference-date period (YYYY-MM-DD) or null; source draft added for qryListarMeusAvisos */
  @property({ attribute: false }) filtroDataFim: string | null = null;

  /** state pageStatus — overall page status: idle, loading, empty (no notices), success or error; source opening load */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryPaginaMeusAvisosStatus — status of the opening load request */
  @property({ attribute: false }) qryPaginaMeusAvisosStatus: RequestStatus = 'idle';

  /** state qryPaginaMeusAvisosError — error of the opening load request, null when none */
  @property({ attribute: false }) qryPaginaMeusAvisosError: ErrorState = null;

  /** state qryListarMeusAvisosStatus — status of the period list request */
  @property({ attribute: false }) qryListarMeusAvisosStatus: RequestStatus = 'idle';

  /** state qryListarMeusAvisosError — error of the period list request, null when none */
  @property({ attribute: false }) qryListarMeusAvisosError: ErrorState = null;

  /** state qryAvisoPorIdStatus — status of the open-one-notice request */
  @property({ attribute: false }) qryAvisoPorIdStatus: RequestStatus = 'idle';

  /** state qryAvisoPorIdError — error of the open-one-notice request, null when none */
  @property({ attribute: false }) qryAvisoPorIdError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private readonly onPopState = (): void => {
    const path = window.location.pathname.replace(/\/+$/, '');
    if (!path.endsWith(ROUTE_PATH)) return;
    this.resetVisit();
    void this.startVisit();
  };

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.meus_avisos.${member}`, value);
    if (member === 'selectedAvisoVencimento') {
      try {
        const url = new URL(window.location.href);
        if (value === null || value === undefined || value === '') {
          url.searchParams.delete('avisoVencimentoId');
        } else {
          url.searchParams.set('avisoVencimentoId', String(value));
        }
        history.replaceState(history.state, '', url.pathname + url.search + url.hash);
      } catch (_error) {
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
    const storedAvisos = getState('ui.tarefas.meus_avisos.avisos');
    if (storedAvisos !== undefined) this.assignState('ui.tarefas.meus_avisos.avisos', storedAvisos);
    const storedAtual = getState('ui.tarefas.meus_avisos.avisoAtual');
    if (storedAtual !== undefined) this.assignState('ui.tarefas.meus_avisos.avisoAtual', storedAtual);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    void this.startVisit();
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

  /** Resets every transient member (statuses, errors, scene, filters) at the start of a visit. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('qryPaginaMeusAvisosStatus', 'idle');
    this.publish('qryPaginaMeusAvisosError', null);
    this.publish('qryListarMeusAvisosStatus', 'idle');
    this.publish('qryListarMeusAvisosError', null);
    this.publish('qryAvisoPorIdStatus', 'idle');
    this.publish('qryAvisoPorIdError', null);
    this.publish('filtroDataInicio', null);
    this.publish('filtroDataFim', null);
    this.publish('scenary', '');
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get('avisoVencimentoId');
    const value = raw !== null && raw !== '' ? raw : null;
    this.publish('selectedAvisoVencimento', value);
  }

  private async startVisit(): Promise<void> {
    this.applyEntryParams();
    await this.qryPaginaMeusAvisos();
    const id = this.selectedAvisoVencimento;
    if (id !== null && this.pageStatus !== 'error') {
      await this.qryAvisoPorId(id);
    }
  }

  private toErrorState(error: { code: string; message: string; details?: unknown } | null): ErrorState {
    if (!error) return { code: 'client.unexpected', message: '', details: { name: 'noError' } };
    return error;
  }

  private unexpected(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page. */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** draft — sets the start of the period filter of listaAvisos (state only; call qryListarMeusAvisos to apply it). */
  public setFiltroDataInicio(value: string | null): void {
    this.publish('filtroDataInicio', value !== null && value !== '' ? value : null);
  }

  /** draft — sets the end of the period filter of listaAvisos (state only; call qryListarMeusAvisos to apply it). */
  public setFiltroDataFim(value: string | null): void {
    this.publish('filtroDataFim', value !== null && value !== '' ? value : null);
  }

  /** request qryPaginaMeusAvisos — opening load: the notices page of the logged person and the latest completed notice with its tasks; redraws avisos (replace, or append the next page when append is true) and avisoAtual (replace, only when loading the first page without append); page: page to load (default 1), append: add the page to the current items (a "load more") instead of replacing; also the method to reload the page */
  public async qryPaginaMeusAvisos(page = 1, append = false): Promise<void> {
    if (this.qryPaginaMeusAvisosStatus === 'loading') return;
    if (append && !this.avisos.hasMore) return;
    this.publish('qryPaginaMeusAvisosStatus', 'loading');
    this.publish('qryPaginaMeusAvisosError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'tarefas.meus_avisos.qryPaginaMeusAvisos'> = { page, pageSize: PAGE_SIZE };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryPaginaMeusAvisos'>>('tarefas.meus_avisos.qryPaginaMeusAvisos', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryPaginaMeusAvisosError', this.toErrorState(response.error));
        this.publish('qryPaginaMeusAvisosStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const output = response.data;
      const nextAvisos: AvisosPage = append
        ? { items: [...this.avisos.items, ...output.avisos.items], page: output.avisos.page, pageSize: output.avisos.pageSize, hasMore: output.avisos.hasMore }
        : { items: [...output.avisos.items], page: output.avisos.page, pageSize: output.avisos.pageSize, hasMore: output.avisos.hasMore };
      this.publish('avisos', nextAvisos);
      if (!append && page === 1) {
        this.publish('avisoAtual', output.avisoAtual ?? null);
      }
      this.publish('qryPaginaMeusAvisosStatus', 'success');
      this.publish('pageStatus', nextAvisos.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('qryPaginaMeusAvisosError', this.unexpected(error));
      this.publish('qryPaginaMeusAvisosStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request qryListarMeusAvisos — lists the notices of the logged person in a reference-date period, page by page; redraws avisos (replace, or append the next page when append is true); filter: optional dataInicio / dataFim (YYYY-MM-DD, inclusive; omit a key to keep the current filter, null to clear it, a new filter loads from page 1), page: page to load (default 1), append: add the page to the current items instead of replacing */
  public async qryListarMeusAvisos(filter: { dataInicio?: string | null; dataFim?: string | null; page?: number; append?: boolean } = {}): Promise<void> {
    if (this.qryListarMeusAvisosStatus === 'loading') return;
    const page = filter.page ?? 1;
    const append = filter.append ?? false;
    if (append && !this.avisos.hasMore) return;
    if (filter.dataInicio !== undefined) this.setFiltroDataInicio(filter.dataInicio);
    if (filter.dataFim !== undefined) this.setFiltroDataFim(filter.dataFim);
    const dataInicio = this.filtroDataInicio;
    const dataFim = this.filtroDataFim;
    this.publish('qryListarMeusAvisosStatus', 'loading');
    this.publish('qryListarMeusAvisosError', null);
    const input: Input<'tarefas.meus_avisos.qryListarMeusAvisos'> = {
      ...(dataInicio !== null && dataInicio !== '' ? { dataInicio } : {}),
      ...(dataFim !== null && dataFim !== '' ? { dataFim } : {}),
      page,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryListarMeusAvisos'>>('tarefas.meus_avisos.qryListarMeusAvisos', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryListarMeusAvisosError', this.toErrorState(response.error));
        this.publish('qryListarMeusAvisosStatus', 'error');
        return;
      }
      const output = response.data;
      const nextAvisos: AvisosPage = append
        ? { items: [...this.avisos.items, ...output.avisos.items], page: output.avisos.page, pageSize: output.avisos.pageSize, hasMore: output.avisos.hasMore }
        : { items: [...output.avisos.items], page: output.avisos.page, pageSize: output.avisos.pageSize, hasMore: output.avisos.hasMore };
      this.publish('avisos', nextAvisos);
      this.publish('qryListarMeusAvisosStatus', 'success');
    } catch (error) {
      this.publish('qryListarMeusAvisosError', this.unexpected(error));
      this.publish('qryListarMeusAvisosStatus', 'error');
    }
  }

  /** request qryAvisoPorId — opens one daily notice with its totals and the current data of each task; redraws avisoAtual (replace with the returned notice); id: id of the notice to open (missing id gives client.requiredMissing) */
  public async qryAvisoPorId(id: string | null): Promise<void> {
    if (this.qryAvisoPorIdStatus === 'loading') return;
    if (id === null || id === '') {
      this.publish('qryAvisoPorIdError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['selectedAvisoVencimento'] } });
      this.publish('qryAvisoPorIdStatus', 'error');
      return;
    }
    this.publish('qryAvisoPorIdStatus', 'loading');
    this.publish('qryAvisoPorIdError', null);
    const input: Input<'tarefas.meus_avisos.qryAvisoPorId'> = { id };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryAvisoPorId'>>('tarefas.meus_avisos.qryAvisoPorId', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryAvisoPorIdError', this.toErrorState(response.error));
        this.publish('qryAvisoPorIdStatus', 'error');
        return;
      }
      this.publish('avisoAtual', response.data.aviso);
      this.publish('qryAvisoPorIdStatus', 'success');
    } catch (error) {
      this.publish('qryAvisoPorIdError', this.unexpected(error));
      this.publish('qryAvisoPorIdStatus', 'error');
    }
  }

  /** select — selects the notice of listaAvisos by id (null clears the selection): publishes selectedAvisoVencimento (kept in the URL) and, for an id, loads the notice into avisoAtual through qryAvisoPorId */
  public async selectAvisoVencimento(id: string | null): Promise<void> {
    const value = id !== null && id !== '' ? id : null;
    this.publish('selectedAvisoVencimento', value);
    if (value === null) return;
    await this.qryAvisoPorId(value);
  }
}
