/// <mls fileReference="_102047_/l2/tarefas/web/shared/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type { Meus_avisosContracts, AvisoResumoDetails, AvisoResumo, TarefaAvisoDetails, TarefaAviso, AvisoLinhaTarefa, AvisoDetalheDetails, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';

export type { Meus_avisosContracts, AvisoResumoDetails, AvisoResumo, TarefaAvisoDetails, TarefaAviso, AvisoLinhaTarefa, AvisoDetalheDetails, AvisoDetalhe } from '/_102047_/l2/tarefas/web/contracts/meus_avisos.defs.js';

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

export class TarefasMeus_avisosShared extends StateLitElement {
  /** state avisos — the list of daily due-date notices of the logged person (date, delivery status, totals, generated/finished moments, failure reason); source qryPaginaMeusAvisos.avisos; organisms historicoAvisos, listaAvisos */
  @property({ attribute: false }) avisos: AvisosPage | null = null;

  /** state avisoAtual — the notice shown in the detail (totals and task lines): the most recent completed notice after load, or the notice the person selected; source qryPaginaMeusAvisos.avisoAtual (also written by qryAvisoPorId); organism avisoDoDia */
  @property({ attribute: false }) avisoAtual: AvisoDetalhe | null = null;

  /** state selectedAvisoVencimento — the id of the AvisoVencimento selected in listaAvisos; source entry.params.avisoVencimentoId; organisms avisoDoDia, listaAvisos */
  @property({ attribute: false }) selectedAvisoVencimento: string | null = null;

  /** state filtroDataInicio — period filter, inclusive start of the reference date (yyyy-mm-dd) or null; source local filter of qryListarMeusAvisos; organism listaAvisos */
  @property({ attribute: false }) filtroDataInicio: string | null = null;

  /** state filtroDataFim — period filter, inclusive end of the reference date (yyyy-mm-dd) or null; source local filter of qryListarMeusAvisos; organism listaAvisos */
  @property({ attribute: false }) filtroDataFim: string | null = null;

  /** state pageStatus — overall status of the page: loading while the initial load runs, error if it failed, empty when there is no notice, success otherwise */
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

  // most recent notice delivered by the initial load, restored when the selection is cleared
  private avisoMaisRecente: AvisoDetalhe | null = null;

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.meus_avisos.${member}`, value);
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
    const avisos = getState('ui.tarefas.meus_avisos.avisos');
    if (avisos !== undefined) this.assignState('ui.tarefas.meus_avisos.avisos', avisos);
    const avisoAtual = getState('ui.tarefas.meus_avisos.avisoAtual');
    if (avisoAtual !== undefined) this.assignState('ui.tarefas.meus_avisos.avisoAtual', avisoAtual);
  }

  private resetVisit(): void {
    this.avisoMaisRecente = null;
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

  private readEntryParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = localStorage.getItem(`tarefas.meus_avisos.${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private applyEntryParams(): void {
    this.publish('selectedAvisoVencimento', this.readEntryParam('avisoVencimentoId'));
  }

  private async startVisit(): Promise<void> {
    await this.qryPaginaMeusAvisos();
    const id = this.selectedAvisoVencimento;
    if (id !== null && this.qryPaginaMeusAvisosStatus === 'success') {
      await this.qryAvisoPorId(id);
    }
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** draft — sets the period filter start (inclusive reference date, yyyy-mm-dd, or null to clear); does not load: call qryListarMeusAvisos afterwards */
  public setFiltroDataInicio(value: string | null): void {
    this.publish('filtroDataInicio', value === '' ? null : value);
  }

  /** draft — sets the period filter end (inclusive reference date, yyyy-mm-dd, or null to clear); does not load: call qryListarMeusAvisos afterwards */
  public setFiltroDataFim(value: string | null): void {
    this.publish('filtroDataFim', value === '' ? null : value);
  }

  /** request qryPaginaMeusAvisos — opens the page: a page of the daily notices of the logged person plus the most recent completed notice with its tasks; redraws avisos (replace, or append the next page when append is true) and avisoAtual (replace, only for page 1 and when no notice is selected); page: page to load (default 1); append: add the page to the current list instead of replacing it. Also the method to reload the page. */
  public async qryPaginaMeusAvisos(page = 1, append = false): Promise<void> {
    if (this.qryPaginaMeusAvisosStatus === 'loading') return;
    if (append && this.avisos !== null && !this.avisos.hasMore) return;
    this.publish('qryPaginaMeusAvisosStatus', 'loading');
    this.publish('qryPaginaMeusAvisosError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const input: Input<'tarefas.meus_avisos.qryPaginaMeusAvisos'> = { page, pageSize: PAGE_SIZE };
    try {
      const response = await execBff<Output<'tarefas.meus_avisos.qryPaginaMeusAvisos'>>('tarefas.meus_avisos.qryPaginaMeusAvisos', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryPaginaMeusAvisosError', response.error ?? this.unexpectedError(null));
        this.publish('qryPaginaMeusAvisosStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const output = response.data;
      const current = this.avisos;
      const nextAvisos: AvisosPage = append && current !== null
        ? { ...output.avisos, items: [...current.items, ...output.avisos.items] }
        : output.avisos;
      this.publish('avisos', nextAvisos);
      if (page === 1 && !append) {
        const latest = output.avisoAtual ?? null;
        this.avisoMaisRecente = latest;
        if (this.selectedAvisoVencimento === null) {
          this.publish('avisoAtual', latest);
        }
      }
      this.publish('qryPaginaMeusAvisosStatus', 'success');
      this.publish('pageStatus', nextAvisos.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('qryPaginaMeusAvisosError', this.unexpectedError(error));
      this.publish('qryPaginaMeusAvisosStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request qryListarMeusAvisos — lists the daily notices of the logged person in the period held by filtroDataInicio/filtroDataFim, page by page; redraws avisos (replace, or append the next page when append is true); page: page to load (default 1, use 1 after changing a filter); append: add the page to the current list ("load more") */
  public async qryListarMeusAvisos(page = 1, append = false): Promise<void> {
    if (this.qryListarMeusAvisosStatus === 'loading') return;
    if (append && this.avisos !== null && !this.avisos.hasMore) return;
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
      const response = await execBff<Output<'tarefas.meus_avisos.qryListarMeusAvisos'>>('tarefas.meus_avisos.qryListarMeusAvisos', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryListarMeusAvisosError', response.error ?? this.unexpectedError(null));
        this.publish('qryListarMeusAvisosStatus', 'error');
        return;
      }
      const output = response.data;
      const current = this.avisos;
      const nextAvisos: AvisosPage = append && current !== null
        ? { ...output.avisos, items: [...current.items, ...output.avisos.items] }
        : output.avisos;
      this.publish('avisos', nextAvisos);
      this.publish('qryListarMeusAvisosStatus', 'success');
    } catch (error) {
      this.publish('qryListarMeusAvisosError', this.unexpectedError(error));
      this.publish('qryListarMeusAvisosStatus', 'error');
    }
  }

  /** request qryAvisoPorId — opens one daily notice with its totals and task lines; redraws avisoAtual (replace); id: id of the notice to open */
  public async qryAvisoPorId(id: string): Promise<void> {
    if (this.qryAvisoPorIdStatus === 'loading') return;
    if (id === '') {
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

  /** select — selects a notice of listaAvisos by id (or null to clear): publishes selectedAvisoVencimento and loads the notice into avisoAtual through qryAvisoPorId; null restores the most recent notice of the initial load */
  public async selectAvisoVencimento(id: string | null): Promise<void> {
    if (this.qryAvisoPorIdStatus === 'loading') return;
    this.publish('selectedAvisoVencimento', id);
    if (id === null) {
      this.publish('qryAvisoPorIdStatus', 'idle');
      this.publish('qryAvisoPorIdError', null);
      this.publish('avisoAtual', this.avisoMaisRecente);
      return;
    }
    await this.qryAvisoPorId(id);
  }
}
