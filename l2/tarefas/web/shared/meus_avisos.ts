/// <mls fileReference="_102047_/l2/tarefas/web/shared/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type { Meus_avisosContracts, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';

export type {
  Meus_avisosContracts,
  AvisoResumoDetails,
  AvisoResumo,
  TarefaAvisoDetails,
  TarefaAviso,
  AvisoLinhaTarefa,
  AvisoDetalheDetails,
  AvisoDetalhe,
} from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof Meus_avisosContracts> = Meus_avisosContracts[R]['input'];
type Output<R extends keyof Meus_avisosContracts> = Meus_avisosContracts[R]['output'];

type AvisosPage = Output<'tarefas.meus_avisos.qryPaginaMeusAvisos'>['avisos'];
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
const SELECTED_PARAM = 'avisoVencimentoId';

function emptyAvisosPage(): AvisosPage {
  return { items: [], page: 1, pageSize: PAGE_SIZE, hasMore: false };
}

export class TarefasMeus_avisosShared extends StateLitElement {
  /** state avisos — the list of daily due-date notices of the signed-in person, with reference date, delivery status, totals and generation/finish record; source qryPaginaMeusAvisos.avisos; organisms historicoAvisos, listaAvisos */
  @property({ attribute: false }) avisos: AvisosPage = emptyAvisosPage();

  /** state avisoAtual — the notice shown in the detail (latest completed notice on load, or the one selected) with its totals and task lines; source qryPaginaMeusAvisos.avisoAtual (also written by qryAvisoPorId); organism avisoDoDia */
  @property({ attribute: false }) avisoAtual: AvisoDetalhe | null = null;

  /** state selectedAvisoVencimento — the id of the AvisoVencimento selected in listaAvisos; source entry.params.avisoVencimentoId; organisms avisoDoDia, listaAvisos; lives in the URL */
  @property({ attribute: false }) selectedAvisoVencimento: string | null = null;

  /** state filtroDataInicio — draft: inclusive start of the reference-date period used to filter listaAvisos (ISO date) or null; used by qryListarMeusAvisos; organism listaAvisos */
  @property({ attribute: false }) filtroDataInicio: string | null = null;

  /** state filtroDataFim — draft: inclusive end of the reference-date period used to filter listaAvisos (ISO date) or null; used by qryListarMeusAvisos; organism listaAvisos */
  @property({ attribute: false }) filtroDataFim: string | null = null;

  /** state pageStatus — overall status of the page: loading while the initial load runs, error if it failed, empty when there are no notices, success otherwise */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryPaginaMeusAvisosStatus — status of the initial load request */
  @property({ attribute: false }) qryPaginaMeusAvisosStatus: RequestStatus = 'idle';

  /** state qryPaginaMeusAvisosError — error of the initial load request, null when none */
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

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.meus_avisos.${member}`, value);
    if (member === 'selectedAvisoVencimento') {
      try {
        const url = new URL(window.location.href);
        if (value === null || value === undefined || value === '') {
          url.searchParams.delete(SELECTED_PARAM);
        } else {
          url.searchParams.set(SELECTED_PARAM, String(value));
        }
        history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
      } catch {
        // URL not writable: the state stays in memory
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
    if (!this.subscribed) {
      subscribe([...STATE_KEYS], this);
      this.subscribed = true;
    }
    this.applyEntryParams();
    void this.startVisit();
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
    const dataKeys = ['ui.tarefas.meus_avisos.avisos', 'ui.tarefas.meus_avisos.avisoAtual'];
    for (const key of dataKeys) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('filtroDataInicio', null);
    this.publish('filtroDataFim', null);
    this.publish('qryPaginaMeusAvisosStatus', 'idle');
    this.publish('qryPaginaMeusAvisosError', null);
    this.publish('qryListarMeusAvisosStatus', 'idle');
    this.publish('qryListarMeusAvisosError', null);
    this.publish('qryAvisoPorIdStatus', 'idle');
    this.publish('qryAvisoPorIdError', null);
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get(SELECTED_PARAM);
    const value = raw !== null && raw !== '' ? raw : null;
    this.publish('selectedAvisoVencimento', value);
  }

  private async startVisit(): Promise<void> {
    await this.qryPaginaMeusAvisos();
    if (this.selectedAvisoVencimento !== null) {
      await this.qryAvisoPorId();
    }
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page; scene is a free scene name, '' for none */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** draft — sets the start of the reference-date period filter (ISO date, null clears it); only stores it, call qryListarMeusAvisos() afterwards to apply */
  public setFiltroDataInicio(value: string | null): void {
    this.publish('filtroDataInicio', value !== null && value !== '' ? value : null);
  }

  /** draft — sets the end of the reference-date period filter (ISO date, null clears it); only stores it, call qryListarMeusAvisos() afterwards to apply */
  public setFiltroDataFim(value: string | null): void {
    this.publish('filtroDataFim', value !== null && value !== '' ? value : null);
  }

  /** select — selects the notice with this id in listaAvisos (null clears the selection); publishes selectedAvisoVencimento, keeps it in the URL and, for an id, loads the notice into avisoAtual through qryAvisoPorId; a null clears avisoAtual */
  public selectAvisoVencimento(id: string | null): void {
    const value = id !== null && id !== '' ? id : null;
    this.publish('selectedAvisoVencimento', value);
    if (value === null) {
      this.publish('avisoAtual', null);
      this.publish('qryAvisoPorIdError', null);
      this.publish('qryAvisoPorIdStatus', 'idle');
      return;
    }
    void this.qryAvisoPorId();
  }

  /** request qryPaginaMeusAvisos — initial load: a page of the signed-in person's daily notices plus the latest completed notice with its task lines; redraws avisos (replace, or append items when append is true; page and hasMore stay in the list) and avisoAtual (replace, only when not appending and no notice is selected); page: page to load (default 1); append: true adds the next page to the current items (does nothing when there is no more); also the method to reload the page */
  public async qryPaginaMeusAvisos(page: number = 1, append: boolean = false): Promise<void> {
    if (this.qryPaginaMeusAvisosStatus === 'loading') return;
    if (append && !this.avisos.hasMore) return;
    this.publish('qryPaginaMeusAvisosStatus', 'loading');
    this.publish('qryPaginaMeusAvisosError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const input: Input<'tarefas.meus_avisos.qryPaginaMeusAvisos'> = { page, pageSize: PAGE_SIZE };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryPaginaMeusAvisos'>>(
        'tarefas.meus_avisos.qryPaginaMeusAvisos',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('qryPaginaMeusAvisosError', response.error ?? this.unexpectedError(null));
        this.publish('qryPaginaMeusAvisosStatus', 'error');
        if (!append) this.publish('pageStatus', 'error');
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
        if (this.selectedAvisoVencimento === null) {
          this.publish('avisoAtual', output.avisoAtual ?? null);
        }
      }
      this.publish('qryPaginaMeusAvisosStatus', 'success');
      if (!append) {
        this.publish('pageStatus', this.avisos.items.length === 0 ? 'empty' : 'success');
      }
    } catch (error) {
      this.publish('qryPaginaMeusAvisosError', this.unexpectedError(error));
      this.publish('qryPaginaMeusAvisosStatus', 'error');
      if (!append) this.publish('pageStatus', 'error');
    }
  }

  /** request qryListarMeusAvisos — lists the signed-in person's daily notices in the period held by filtroDataInicio and filtroDataFim, page by page; redraws avisos (replace, or append items when append is true; page and hasMore stay in the list); page: page to load (default 1, use 1 after a filter change); append: true adds the next page (does nothing when there is no more) */
  public async qryListarMeusAvisos(page: number = 1, append: boolean = false): Promise<void> {
    if (this.qryListarMeusAvisosStatus === 'loading') return;
    if (append && !this.avisos.hasMore) return;
    this.publish('qryListarMeusAvisosStatus', 'loading');
    this.publish('qryListarMeusAvisosError', null);
    const inicio = this.filtroDataInicio;
    const fim = this.filtroDataFim;
    const input: Input<'tarefas.meus_avisos.qryListarMeusAvisos'> = {
      ...(inicio !== null && inicio !== '' ? { dataInicio: inicio } : {}),
      ...(fim !== null && fim !== '' ? { dataFim: fim } : {}),
      page,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryListarMeusAvisos'>>(
        'tarefas.meus_avisos.qryListarMeusAvisos',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('qryListarMeusAvisosError', response.error ?? this.unexpectedError(null));
        this.publish('qryListarMeusAvisosStatus', 'error');
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
      }
      this.publish('qryListarMeusAvisosStatus', 'success');
    } catch (error) {
      this.publish('qryListarMeusAvisosError', this.unexpectedError(error));
      this.publish('qryListarMeusAvisosStatus', 'error');
    }
  }

  /** request qryAvisoPorId — opens the selected notice (selectedAvisoVencimento) with its totals and task lines; redraws avisoAtual (replace); takes no argument: call selectAvisoVencimento(id) to choose the notice, which calls this */
  public async qryAvisoPorId(): Promise<void> {
    if (this.qryAvisoPorIdStatus === 'loading') return;
    const id = this.selectedAvisoVencimento;
    if (id === null || id === '') {
      this.publish('qryAvisoPorIdError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.tarefas.meus_avisos.selectedAvisoVencimento'] },
      });
      this.publish('qryAvisoPorIdStatus', 'error');
      return;
    }
    this.publish('qryAvisoPorIdStatus', 'loading');
    this.publish('qryAvisoPorIdError', null);
    const input: Input<'tarefas.meus_avisos.qryAvisoPorId'> = { id };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryAvisoPorId'>>(
        'tarefas.meus_avisos.qryAvisoPorId',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('qryAvisoPorIdError', response.error ?? this.unexpectedError(null));
        this.publish('qryAvisoPorIdStatus', 'error');
        return;
      }
      this.publish('avisoAtual', response.data.aviso);
      this.publish('qryAvisoPorIdStatus', 'success');
    } catch (error) {
      this.publish('qryAvisoPorIdError', this.unexpectedError(error));
      this.publish('qryAvisoPorIdStatus', 'error');
    }
  }
}
