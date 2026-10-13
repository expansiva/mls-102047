/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Despesas_aprovadasContracts, DespesaLoad, DespesaRegisterPayment } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

export type { Despesas_aprovadasContracts, DespesaLoad, DespesaRegisterPayment } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

type Input<R extends keyof Despesas_aprovadasContracts> = Despesas_aprovadasContracts[R]['input'];
type Output<R extends keyof Despesas_aprovadasContracts> = Despesas_aprovadasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

type ListRequest = 'load' | 'loadDespesasAprovadas';

/** Draft of the registerPayment command input: only what the person types (id, colaboradorId and version come from the selected expense). */
export type DataPagamentoDraft = {
  details: {
    dataPagamento: string | null;
  };
};

function emptyDataPagamentoDraft(): DataPagamentoDraft {
  return { details: { dataPagamento: null } };
}

type StateMember =
  | 'despesasAprovadas'
  | 'despesaAprovada'
  | 'colaboradorId'
  | 'page'
  | 'dataPagamento'
  | 'pageSizeApprovedExpensesList'
  | 'hasMoreApprovedExpensesList'
  | 'pageStatus'
  | 'loadStatus'
  | 'loadError'
  | 'loadDespesasAprovadasStatus'
  | 'loadDespesasAprovadasError'
  | 'registerPaymentStatus'
  | 'registerPaymentError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.despesas_aprovadas.despesasAprovadas': 'despesasAprovadas',
  'ui.reembolsoDespesas.despesas_aprovadas.despesaAprovada': 'despesaAprovada',
  'ui.reembolsoDespesas.despesas_aprovadas.colaboradorId': 'colaboradorId',
  'ui.reembolsoDespesas.despesas_aprovadas.page': 'page',
  'ui.reembolsoDespesas.despesas_aprovadas.dataPagamento': 'dataPagamento',
  'ui.reembolsoDespesas.despesas_aprovadas.pageSizeApprovedExpensesList': 'pageSizeApprovedExpensesList',
  'ui.reembolsoDespesas.despesas_aprovadas.hasMoreApprovedExpensesList': 'hasMoreApprovedExpensesList',
  'ui.reembolsoDespesas.despesas_aprovadas.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.loadStatus': 'loadStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.loadError': 'loadError',
  'ui.reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadasStatus': 'loadDespesasAprovadasStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadasError': 'loadDespesasAprovadasError',
  'ui.reembolsoDespesas.despesas_aprovadas.registerPaymentStatus': 'registerPaymentStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.registerPaymentError': 'registerPaymentError',
  'ui.reembolsoDespesas.despesas_aprovadas.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

// state member -> entry param name, for the members persisted in localStorage
const PERSISTED_PARAM: Partial<Record<StateMember, string>> = {
  despesaAprovada: 'despesaId',
  colaboradorId: 'colaboradorId',
  page: 'page',
};

const STORAGE_PREFIX = 'reembolsoDespesas.despesas_aprovadas.';
const DEFAULT_PAGE_SIZE = 20;

const ROUTE_LOAD = 'reembolsoDespesas.despesas_aprovadas.load';
const ROUTE_FILTER = 'reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadas';
const ROUTE_REGISTER_PAYMENT = 'reembolsoDespesas.despesas_aprovadas.registerPayment';

export class ReembolsoDespesasDespesas_aprovadasShared extends StateLitElement {
  /** state despesasAprovadas — approved expenses awaiting payment; source load.despesasAprovadas; organism approvedExpensesList */
  @property({ attribute: false }) despesasAprovadas: DespesaLoad[] = [];

  /** state despesaAprovada — id of the selected approved expense (the record is read through the approvedExpenseDetail getter); source entry.params.despesaId; organism approvedExpenseDetail; persisted */
  @property({ attribute: false }) despesaAprovada: string | null = null;

  /** state colaboradorId — employee used to filter the approved expenses; source entry.params.colaboradorId; organism approvedExpensesList; persisted */
  @property({ attribute: false }) colaboradorId: string | null = null;

  /** state page — current page of the approved expenses list; source entry.params.page; organism approvedExpensesList; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state dataPagamento — draft of the payment date being typed (command registerPayment input); source registerPayment.input; organism paymentDateForm */
  @property({ attribute: false }) dataPagamento: DataPagamentoDraft = emptyDataPagamentoDraft();

  /** state pageSizeApprovedExpensesList — page size of the approved expenses list as answered by the backend; source load.pageSizeApprovedExpensesList */
  @property({ attribute: false }) pageSizeApprovedExpensesList: number | null = null;

  /** state hasMoreApprovedExpensesList — true when the approved expenses list has a next page to load; source load.hasMoreApprovedExpensesList */
  @property({ attribute: false }) hasMoreApprovedExpensesList = false;

  /** state pageStatus — overall status of the page (idle, loading, empty, success, error) */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state loadStatus — status of the initial load request (idle, loading, success, error) */
  @property({ attribute: false }) loadStatus: RequestStatus = 'idle';

  /** state loadError — error of the initial load request, also carries client.selectionInvalid when the selected id is not in the list; null when none */
  @property({ attribute: false }) loadError: ErrorState = null;

  /** state loadDespesasAprovadasStatus — status of the filter / load more request (idle, loading, success, error) */
  @property({ attribute: false }) loadDespesasAprovadasStatus: RequestStatus = 'idle';

  /** state loadDespesasAprovadasError — error of the filter / load more request; null when none */
  @property({ attribute: false }) loadDespesasAprovadasError: ErrorState = null;

  /** state registerPaymentStatus — status of the register payment command (idle, loading, success, error) */
  @property({ attribute: false }) registerPaymentStatus: RequestStatus = 'idle';

  /** state registerPaymentError — error of the register payment command (client.requiredMissing, client.preconditionMissing or backend error); null when none */
  @property({ attribute: false }) registerPaymentError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.despesas_aprovadas.${member}`, value);
    const param = PERSISTED_PARAM[member];
    if (param) {
      try {
        if (value === null) {
          window.localStorage.removeItem(`${STORAGE_PREFIX}${param}`);
        } else {
          window.localStorage.setItem(`${STORAGE_PREFIX}${param}`, String(value));
        }
      } catch {
        // storage unavailable: the param simply is not persisted
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const dataKeys = [
      'ui.reembolsoDespesas.despesas_aprovadas.despesasAprovadas',
      'ui.reembolsoDespesas.despesas_aprovadas.pageSizeApprovedExpensesList',
      'ui.reembolsoDespesas.despesas_aprovadas.hasMoreApprovedExpensesList',
    ];
    for (const key of dataKeys) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.load();
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

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('loadStatus', 'idle');
    this.publish('loadError', null);
    this.publish('loadDespesasAprovadasStatus', 'idle');
    this.publish('loadDespesasAprovadasError', null);
    this.publish('registerPaymentStatus', 'idle');
    this.publish('registerPaymentError', null);
    this.publish('scenary', '');
    this.publish('dataPagamento', emptyDataPagamentoDraft());
  }

  private resetCommandResults(): void {
    this.publish('registerPaymentStatus', 'idle');
    this.publish('registerPaymentError', null);
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null) return fromUrl;
    try {
      return window.localStorage.getItem(`${STORAGE_PREFIX}${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const colaboradorRaw = this.readParam('colaboradorId');
    this.publish('colaboradorId', colaboradorRaw !== null && colaboradorRaw !== '' ? colaboradorRaw : null);
    const pageRaw = this.readParam('page');
    let pageValue: number | null = null;
    if (pageRaw !== null && pageRaw !== '') {
      const parsed = Number(pageRaw);
      if (Number.isFinite(parsed)) pageValue = parsed;
    }
    this.publish('page', pageValue);
    // the selection is applied after the filters; it is validated once the list has loaded
    const despesaRaw = this.readParam('despesaId');
    this.publish('despesaAprovada', despesaRaw !== null && despesaRaw !== '' ? despesaRaw : null);
  }

  /** getter approvedExpenseDetail — the selected approved expense record (the row of despesasAprovadas whose id is despesaAprovada); null when nothing is selected or the row is not loaded; organism approvedExpenseDetail */
  public get approvedExpenseDetail(): DespesaLoad | null {
    const selectedId = this.despesaAprovada;
    if (selectedId === null) return null;
    return this.despesasAprovadas.find((row) => row.id === selectedId) ?? null;
  }

  /** draft — sets the whole payment date draft (command registerPayment input) typed in paymentDateForm; takes the new draft object ({ details: { dataPagamento } }, date as typed) */
  public setDataPagamento(value: DataPagamentoDraft): void {
    this.resetCommandResults();
    this.publish('dataPagamento', value);
  }

  /** select — selects the approved expense with the given id (or clears the selection with null); the record is then read through approvedExpenseDetail; an id not present in the loaded list publishes client.selectionInvalid in loadError; arguments: id of the expense or null */
  public selectDespesaAprovada(id: string | null): void {
    this.resetCommandResults();
    if (id === null) {
      this.publish('despesaAprovada', null);
      return;
    }
    const found = this.despesasAprovadas.find((row) => row.id === id);
    if (!found) {
      this.publish('loadError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('loadStatus', 'error');
      return;
    }
    this.publish('despesaAprovada', id);
  }

  /** scene — publishes the visible scene of the page; argument: the scene name ('' for none) */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  private setListRequest(request: ListRequest, status: RequestStatus, error: ErrorState): void {
    if (request === 'load') {
      this.publish('loadError', error);
      this.publish('loadStatus', status);
    } else {
      this.publish('loadDespesasAprovadasError', error);
      this.publish('loadDespesasAprovadasStatus', status);
    }
  }

  private async runListQuery(request: ListRequest, pageNumber: number, mode: 'replace' | 'append'): Promise<boolean> {
    const currentStatus = request === 'load' ? this.loadStatus : this.loadDespesasAprovadasStatus;
    if (currentStatus === 'loading') return false;
    this.setListRequest(request, 'loading', null);
    const filterValue = this.colaboradorId;
    const input: Input<'reembolsoDespesas.despesas_aprovadas.load'> = {
      ...(filterValue !== null && filterValue !== '' ? { colaboradorId: filterValue } : {}),
      page: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
    };
    try {
      const response = request === 'load'
        ? await execBff<Output<'reembolsoDespesas.despesas_aprovadas.load'>>(ROUTE_LOAD, input, { mode: 'silent' })
        : await execBff<Output<'reembolsoDespesas.despesas_aprovadas.loadDespesasAprovadas'>>(ROUTE_FILTER, input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.setListRequest(request, 'error', response.error ?? { code: 'client.unexpected', message: '' });
        return false;
      }
      const output = response.data;
      const rows = mode === 'append' ? [...this.despesasAprovadas, ...output.despesasAprovadas] : output.despesasAprovadas;
      this.publish('despesasAprovadas', rows);
      this.publish('page', output.pageApprovedExpensesList);
      this.publish('pageSizeApprovedExpensesList', output.pageSizeApprovedExpensesList);
      this.publish('hasMoreApprovedExpensesList', output.hasMoreApprovedExpensesList);
      this.setListRequest(request, 'success', null);
      return true;
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.setListRequest(request, 'error', { code: 'client.unexpected', message: '', details: { name } });
      return false;
    }
  }

  /** function load — loads the approved expenses awaiting payment (first page, or the page of the entry param) with the current colaboradorId filter; redraws despesasAprovadas (replace), page, pageSizeApprovedExpensesList, hasMoreApprovedExpensesList and pageStatus; also checks that the selected despesaAprovada exists in the list (otherwise client.selectionInvalid in loadError); no arguments */
  public async load(): Promise<void> {
    if (this.loadStatus === 'loading') return;
    this.publish('pageStatus', 'loading');
    const ok = await this.runListQuery('load', this.page ?? 1, 'replace');
    if (!ok) {
      this.publish('pageStatus', 'error');
      return;
    }
    const selectedId = this.despesaAprovada;
    if (selectedId !== null && !this.despesasAprovadas.some((row) => row.id === selectedId)) {
      this.publish('despesaAprovada', null);
      this.publish('loadError', { code: 'client.selectionInvalid', message: '', details: { id: selectedId } });
      this.publish('loadStatus', 'error');
      this.publish('pageStatus', 'error');
      return;
    }
    this.publish('pageStatus', this.despesasAprovadas.length === 0 ? 'empty' : 'success');
  }

  /** function filterApprovedExpensesList — filters the approved expenses by employee and reloads from the first page; redraws despesasAprovadas (replace), page, hasMoreApprovedExpensesList; arguments: colaboradorId, the employee id to filter by (null or '' removes the filter) */
  public async filterApprovedExpensesList(colaboradorId: string | null): Promise<void> {
    this.resetCommandResults();
    this.publish('colaboradorId', colaboradorId !== null && colaboradorId !== '' ? colaboradorId : null);
    this.publish('page', 1);
    await this.runListQuery('loadDespesasAprovadas', 1, 'replace');
  }

  /** function loadMoreApprovedExpensesList — loads the next page of approved expenses and appends it; redraws despesasAprovadas (append), page, hasMoreApprovedExpensesList; does nothing when hasMoreApprovedExpensesList is false; no arguments */
  public async loadMoreApprovedExpensesList(): Promise<void> {
    if (!this.hasMoreApprovedExpensesList) return;
    await this.runListQuery('loadDespesasAprovadas', (this.page ?? 1) + 1, 'append');
  }

  /** function registerPayment — registers the payment date of the selected approved expense (form paymentDateForm, draft dataPagamento); requires a selected expense (despesaAprovada) and a typed payment date; redraws despesasAprovadas (upsert: version and details.dataPagamento of the returned expense are merged into its row), keeps despesaAprovada on the paid expense, and resets the dataPagamento draft; no arguments */
  public async registerPayment(): Promise<void> {
    if (this.registerPaymentStatus === 'loading') return;
    const typedDate = this.dataPagamento.details.dataPagamento;
    if (typedDate === null || typedDate === '') {
      this.publish('registerPaymentError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.reembolsoDespesas.despesas_aprovadas.dataPagamento'] },
      });
      this.publish('registerPaymentStatus', 'error');
      return;
    }
    const selected = this.approvedExpenseDetail;
    if (!selected) {
      this.publish('registerPaymentError', {
        code: 'client.preconditionMissing',
        message: '',
        details: { stateKeys: ['ui.reembolsoDespesas.despesas_aprovadas.despesaAprovada'] },
      });
      this.publish('registerPaymentStatus', 'error');
      return;
    }
    this.publish('registerPaymentStatus', 'loading');
    this.publish('registerPaymentError', null);
    const input: Input<'reembolsoDespesas.despesas_aprovadas.registerPayment'> = {
      details: { dataPagamento: typedDate },
      colaboradorId: selected.colaboradorId,
      id: selected.id,
      version: selected.version,
    };
    try {
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'reembolsoDespesas.despesas_aprovadas.registerPayment'>>(ROUTE_REGISTER_PAYMENT, input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('registerPaymentError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('registerPaymentStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('registerPaymentError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('registerPaymentStatus', 'error');
        return;
      }
      const paid: DespesaRegisterPayment = response.data.despesa;
      const rows = this.despesasAprovadas.map((row) =>
        row.id === paid.id
          ? { ...row, version: paid.version, details: { ...row.details, ...paid.details } }
          : row,
      );
      this.publish('despesasAprovadas', rows);
      this.publish('despesaAprovada', paid.id);
      this.publish('dataPagamento', emptyDataPagamentoDraft());
      this.publish('registerPaymentStatus', 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('registerPaymentError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('registerPaymentStatus', 'error');
    }
  }
}
