/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Despesas_aprovadasContracts, DespesaAprovadaResumoDetails, DespesaAprovadaResumo, DespesaAprovadaDetalheDetails, DespesaAprovadaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

export type { Despesas_aprovadasContracts, DespesaAprovadaResumoDetails, DespesaAprovadaResumo, DespesaAprovadaDetalheDetails, DespesaAprovadaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

type Input<R extends keyof Despesas_aprovadasContracts> = Despesas_aprovadasContracts[R]['input'];
type Output<R extends keyof Despesas_aprovadasContracts> = Despesas_aprovadasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type DespesasPage = Output<'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas'>['despesas'];

/** Draft of the registrarPagamento command: only what the person types (the payment date). */
export type RegistrarPagamentoDraft = {
  details: {
    dataPagamento: string | null;
  };
};

/** Options of the list request: filters that change (undefined keeps the current one, null or '' clears it), the page to load and whether to append it. */
export type ListarDespesasAprovadasOptions = {
  colaboradorId?: string | null;
  categoria?: string | null;
  page?: number;
  append?: boolean;
};

export function emptyRegistrarPagamentoDraft(): RegistrarPagamentoDraft {
  return { details: { dataPagamento: null } };
}

type StateMember =
  | 'despesas'
  | 'despesa'
  | 'selectedDespesa'
  | 'colaboradorId'
  | 'categoria'
  | 'page'
  | 'registrarPagamentoDraft'
  | 'pageStatus'
  | 'listarDespesasAprovadasStatus'
  | 'listarDespesasAprovadasError'
  | 'obterDespesaAprovadaStatus'
  | 'obterDespesaAprovadaError'
  | 'registrarPagamentoStatus'
  | 'registrarPagamentoError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.despesas_aprovadas.despesas': 'despesas',
  'ui.reembolsoDespesas.despesas_aprovadas.despesa': 'despesa',
  'ui.reembolsoDespesas.despesas_aprovadas.selectedDespesa': 'selectedDespesa',
  'ui.reembolsoDespesas.despesas_aprovadas.colaboradorId': 'colaboradorId',
  'ui.reembolsoDespesas.despesas_aprovadas.categoria': 'categoria',
  'ui.reembolsoDespesas.despesas_aprovadas.page': 'page',
  'ui.reembolsoDespesas.despesas_aprovadas.registrarPagamentoDraft': 'registrarPagamentoDraft',
  'ui.reembolsoDespesas.despesas_aprovadas.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadasStatus': 'listarDespesasAprovadasStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadasError': 'listarDespesasAprovadasError',
  'ui.reembolsoDespesas.despesas_aprovadas.obterDespesaAprovadaStatus': 'obterDespesaAprovadaStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.obterDespesaAprovadaError': 'obterDespesaAprovadaError',
  'ui.reembolsoDespesas.despesas_aprovadas.registrarPagamentoStatus': 'registrarPagamentoStatus',
  'ui.reembolsoDespesas.despesas_aprovadas.registrarPagamentoError': 'registrarPagamentoError',
  'ui.reembolsoDespesas.despesas_aprovadas.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

// state member -> name of the entry param it persists
const PERSIST_PARAM_BY_MEMBER: Partial<Record<StateMember, string>> = {
  colaboradorId: 'colaboradorId',
  categoria: 'categoria',
  page: 'page',
  selectedDespesa: 'despesaId',
};

const DEFAULT_PAGE_SIZE = 20;

export class ReembolsoDespesasDespesas_aprovadasShared extends StateLitElement {
  /** state despesas — queue of approved expenses awaiting payment, as a page { items, page, pageSize, hasMore }; source listarDespesasAprovadas.despesas; organism despesasAprovadasLista */
  @property({ attribute: false }) despesas: DespesasPage | null = null;

  /** state despesa — the chosen expense with its full data and the version used to register the payment; source obterDespesaAprovada.despesa; organisms despesaAprovadaDetalhe, registroPagamentoForm */
  @property({ attribute: false }) despesa: DespesaAprovadaDetalhe | null = null;

  /** state selectedDespesa — id of the chosen expense (the record itself is in despesa); source entry.params.despesaId; organisms despesaAprovadaDetalhe, despesasAprovadasLista; persisted */
  @property({ attribute: false }) selectedDespesa: string | null = null;

  /** state colaboradorId — filter of the queue by collaborator id, null when not filtering; source entry.params.colaboradorId; organism despesasAprovadasLista; persisted */
  @property({ attribute: false }) colaboradorId: string | null = null;

  /** state categoria — filter of the queue by category, null when not filtering; source entry.params.categoria; organism despesasAprovadasLista; persisted */
  @property({ attribute: false }) categoria: string | null = null;

  /** state page — the page of the queue the person went to with a pager (a load-more append never writes it), null for the first; source entry.params.page; organism despesasAprovadasLista; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state registrarPagamentoDraft — form draft of the payment registration (payment date typed by the person); source registrarPagamento.input; organism registroPagamentoForm */
  @property({ attribute: false }) registrarPagamentoDraft: RegistrarPagamentoDraft = emptyRegistrarPagamentoDraft();

  /** state pageStatus — overall status of the page load: loading while the queue loads, empty when it has no items, error when it failed; source none (page status) */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state listarDespesasAprovadasStatus — status of the queue request; source none (request status) */
  @property({ attribute: false }) listarDespesasAprovadasStatus: RequestStatus = 'idle';

  /** state listarDespesasAprovadasError — error of the queue request, null when none; source none (request error) */
  @property({ attribute: false }) listarDespesasAprovadasError: ErrorState = null;

  /** state obterDespesaAprovadaStatus — status of the request that loads the chosen expense; source none (request status) */
  @property({ attribute: false }) obterDespesaAprovadaStatus: RequestStatus = 'idle';

  /** state obterDespesaAprovadaError — error of the request that loads the chosen expense, null when none; source none (request error) */
  @property({ attribute: false }) obterDespesaAprovadaError: ErrorState = null;

  /** state registrarPagamentoStatus — status of the payment registration command ('success' means the payment was registered); source none (request status) */
  @property({ attribute: false }) registrarPagamentoStatus: RequestStatus = 'idle';

  /** state registrarPagamentoError — error of the payment registration command, null when none; source none (request error) */
  @property({ attribute: false }) registrarPagamentoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.despesas_aprovadas.${member}`, value);
    const param = PERSIST_PARAM_BY_MEMBER[member];
    if (param) {
      try {
        const storageKey = `reembolsoDespesas.despesas_aprovadas.${param}`;
        if (value === null || value === undefined) {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, String(value));
        }
      } catch {
        // storage unavailable: the value stays in memory only
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const storedDespesas = getState('ui.reembolsoDespesas.despesas_aprovadas.despesas');
    if (storedDespesas !== undefined) this.assignState('ui.reembolsoDespesas.despesas_aprovadas.despesas', storedDespesas);
    const storedDespesa = getState('ui.reembolsoDespesas.despesas_aprovadas.despesa');
    if (storedDespesa !== undefined) this.assignState('ui.reembolsoDespesas.despesas_aprovadas.despesa', storedDespesa);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.listarDespesasAprovadas();
    if (this.selectedDespesa !== null) {
      void this.obterDespesaAprovada(this.selectedDespesa);
    } else {
      this.publish('despesa', null);
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

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('listarDespesasAprovadasStatus', 'idle');
    this.publish('listarDespesasAprovadasError', null);
    this.publish('obterDespesaAprovadaStatus', 'idle');
    this.publish('obterDespesaAprovadaError', null);
    this.publish('registrarPagamentoStatus', 'idle');
    this.publish('registrarPagamentoError', null);
    this.publish('registrarPagamentoDraft', emptyRegistrarPagamentoDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('registrarPagamentoStatus', 'idle');
    this.publish('registrarPagamentoError', null);
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null) return fromUrl;
    try {
      return localStorage.getItem(`reembolsoDespesas.despesas_aprovadas.${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const colaboradorId = this.readParam('colaboradorId');
    this.publish('colaboradorId', colaboradorId !== null && colaboradorId !== '' ? colaboradorId : null);
    const categoria = this.readParam('categoria');
    this.publish('categoria', categoria !== null && categoria !== '' ? categoria : null);
    const rawPage = this.readParam('page');
    let page: number | null = null;
    if (rawPage !== null && rawPage !== '') {
      const parsed = Number(rawPage);
      if (Number.isFinite(parsed)) page = parsed;
    }
    this.publish('page', page);
    const despesaId = this.readParam('despesaId');
    this.publish('selectedDespesa', despesaId !== null && despesaId !== '' ? despesaId : null);
  }

  private unexpectedError(error: unknown, aborted = false): ErrorState {
    const name = aborted ? 'aborted' : error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page (any string the page uses to switch scenes); clears the previous command result */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the whole payment form draft (the payment date the person types); clears the previous command result */
  public setRegistrarPagamentoDraft(value: RegistrarPagamentoDraft): void {
    this.resetCommandResults();
    this.publish('registrarPagamentoDraft', value);
  }

  /** request listarDespesasAprovadas — loads the queue of approved expenses awaiting payment (initial load, reload, filter and paging); redraws despesas (replace, or append the next page when options.append is true; append keeps page/hasMore in the list itself and never writes the page state), pageStatus, and the filter states colaboradorId, categoria and page; options.colaboradorId and options.categoria are the new filter values (undefined keeps the current one, null or '' clears it) and a filter change loads from the first page; options.page is the page to load (a pager writes the page state); options.append adds the next page to the items and does nothing when the list has no more */
  public async listarDespesasAprovadas(options: ListarDespesasAprovadasOptions = {}): Promise<void> {
    if (this.listarDespesasAprovadasStatus === 'loading') return;
    const append = options.append === true;
    const current = this.despesas;
    if (append && (!current || !current.hasMore)) return;
    const filterChanged = options.colaboradorId !== undefined || options.categoria !== undefined;
    if (options.colaboradorId !== undefined) {
      this.publish('colaboradorId', options.colaboradorId !== null && options.colaboradorId !== '' ? options.colaboradorId : null);
    }
    if (options.categoria !== undefined) {
      this.publish('categoria', options.categoria !== null && options.categoria !== '' ? options.categoria : null);
    }
    let pageToLoad: number;
    if (options.page !== undefined) {
      pageToLoad = options.page;
    } else if (append && current) {
      pageToLoad = current.page + 1;
    } else if (filterChanged) {
      pageToLoad = 1;
    } else {
      pageToLoad = this.page ?? 1;
    }
    if (!append && (options.page !== undefined || filterChanged)) {
      this.publish('page', pageToLoad);
    }
    this.publish('listarDespesasAprovadasStatus', 'loading');
    this.publish('listarDespesasAprovadasError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const colaboradorId = this.colaboradorId;
    const categoria = this.categoria;
    const input: Input<'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas'> = {
      ...(colaboradorId !== null && colaboradorId !== '' ? { colaboradorId } : {}),
      details: {
        ...(categoria !== null && categoria !== '' ? { categoria } : {}),
      },
      page: pageToLoad,
      pageSize: current && append ? current.pageSize : DEFAULT_PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas'>>('reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarDespesasAprovadasError', response.error ?? this.unexpectedError(null));
        this.publish('listarDespesasAprovadasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.despesas;
      if (append && current) {
        this.publish('despesas', { ...loaded, items: [...current.items, ...loaded.items] });
      } else {
        this.publish('despesas', loaded);
      }
      this.publish('listarDespesasAprovadasStatus', 'success');
      const shown = this.despesas;
      this.publish('pageStatus', shown && shown.items.length > 0 ? 'success' : 'empty');
    } catch (error) {
      this.publish('listarDespesasAprovadasError', this.unexpectedError(error));
      this.publish('listarDespesasAprovadasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request obterDespesaAprovada — selects an expense of the queue and loads its full data for review before payment; redraws selectedDespesa (the id, replace) and despesa (the record with its version, replace; cleared first and on failure); id is the expense picked in the list, or null to clear the selection */
  public async obterDespesaAprovada(id: string | null): Promise<void> {
    if (this.obterDespesaAprovadaStatus === 'loading') return;
    this.resetCommandResults();
    this.publish('registrarPagamentoDraft', emptyRegistrarPagamentoDraft());
    if (id === null || id === '') {
      this.publish('selectedDespesa', null);
      this.publish('despesa', null);
      this.publish('obterDespesaAprovadaError', null);
      this.publish('obterDespesaAprovadaStatus', 'idle');
      return;
    }
    this.publish('selectedDespesa', id);
    this.publish('despesa', null);
    this.publish('obterDespesaAprovadaStatus', 'loading');
    this.publish('obterDespesaAprovadaError', null);
    const input: Input<'reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada'> = { id };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada'>>('reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('obterDespesaAprovadaError', response.error ?? this.unexpectedError(null));
        this.publish('obterDespesaAprovadaStatus', 'error');
        return;
      }
      this.publish('despesa', response.data.despesa);
      this.publish('obterDespesaAprovadaStatus', 'success');
    } catch (error) {
      this.publish('obterDespesaAprovadaError', this.unexpectedError(error));
      this.publish('obterDespesaAprovadaStatus', 'error');
    }
  }

  /** request registrarPagamento — registers the payment of the chosen expense (approved -> paid) with the date in registrarPagamentoDraft and the version of despesa; redraws despesa (replace with the paid record and its new version), removes the expense from despesas.items (it no longer belongs to the queue), and resets registrarPagamentoDraft; refuses with client.preconditionMissing when no expense is loaded and with client.requiredMissing when the payment date is empty; takes no arguments */
  public async registrarPagamento(): Promise<void> {
    if (this.registrarPagamentoStatus === 'loading') return;
    const target = this.despesa;
    if (!target) {
      this.publish('registrarPagamentoError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      this.publish('registrarPagamentoStatus', 'error');
      return;
    }
    const rawDate = this.registrarPagamentoDraft.details.dataPagamento;
    const dataPagamento = rawDate !== null ? rawDate.trim() : '';
    if (dataPagamento === '') {
      this.publish('registrarPagamentoError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['registrarPagamentoDraft'] } });
      this.publish('registrarPagamentoStatus', 'error');
      return;
    }
    this.publish('registrarPagamentoStatus', 'loading');
    this.publish('registrarPagamentoError', null);
    const input: Input<'reembolsoDespesas.despesas_aprovadas.registrarPagamento'> = {
      id: target.id,
      version: target.version,
      details: { dataPagamento },
    };
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<'reembolsoDespesas.despesas_aprovadas.registrarPagamento'>>('reembolsoDespesas.despesas_aprovadas.registrarPagamento', input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.publish('registrarPagamentoError', this.unexpectedError(null, true));
        this.publish('registrarPagamentoStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('registrarPagamentoError', response.error ?? this.unexpectedError(null));
        this.publish('registrarPagamentoStatus', 'error');
        return;
      }
      const updated = response.data.despesa;
      this.publish('despesa', updated);
      this.publish('selectedDespesa', updated.id);
      const list = this.despesas;
      if (list) {
        this.publish('despesas', { ...list, items: list.items.filter(item => item.id !== updated.id) });
      }
      this.publish('registrarPagamentoDraft', emptyRegistrarPagamentoDraft());
      this.publish('registrarPagamentoStatus', 'success');
    } catch (error) {
      this.publish('registrarPagamentoError', this.unexpectedError(error));
      this.publish('registrarPagamentoStatus', 'error');
    }
  }
}
