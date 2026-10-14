/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Despesas_aprovadasContracts, DespesaAprovadaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

export type {
  Despesas_aprovadasContracts,
  DespesaAprovadaResumoDetails,
  DespesaAprovadaResumo,
  DespesaAprovadaDetalheDetails,
  DespesaAprovadaDetalhe,
} from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.js';

type Input<R extends keyof Despesas_aprovadasContracts> = Despesas_aprovadasContracts[R]['input'];
type Output<R extends keyof Despesas_aprovadasContracts> = Despesas_aprovadasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** Page of approved expenses waiting for payment: { items, page, pageSize, hasMore }. */
export type DespesasPage = Output<'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas'>['despesas'];

/** Draft of the payment registration form (command registrarPagamento); id and version come from the loaded despesa. */
export type RegistrarPagamentoDraft = {
  details: {
    dataPagamento: string | null;
  };
};

/** Arguments of listarDespesasAprovadas: undefined keeps the current value, null clears a filter. */
export type ListarDespesasAprovadasArgs = {
  colaboradorId?: string | null;
  categoria?: string | null;
  page?: number;
  append?: boolean;
};

function emptyRegistrarPagamentoDraft(): RegistrarPagamentoDraft {
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

const KEY_PREFIX = 'ui.reembolsoDespesas.despesas_aprovadas.';

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

/** Persisted members and the entry param name each one is stored under in localStorage. */
const PERSISTED_PARAM: Partial<Record<StateMember, string>> = {
  colaboradorId: 'colaboradorId',
  categoria: 'categoria',
  page: 'page',
  selectedDespesa: 'despesaId',
};

const STORAGE_PREFIX = 'reembolsoDespesas.despesas_aprovadas.';
const PAGE_SIZE = 20;

export class ReembolsoDespesasDespesas_aprovadasShared extends StateLitElement {
  /** state despesas — page of approved expenses waiting for payment (items, page, pageSize, hasMore); source listarDespesasAprovadas.despesas; organism despesasAprovadasLista */
  @property({ attribute: false }) despesas: DespesasPage | null = null;

  /** state despesa — the chosen expense with its full data and the version used to register the payment; source obterDespesaAprovada.despesa; organisms despesaAprovadaDetalhe, registroPagamentoForm */
  @property({ attribute: false }) despesa: DespesaAprovadaDetalhe | null = null;

  /** state selectedDespesa — id of the chosen expense (the record itself is in despesa); source entry.params.despesaId; organisms despesaAprovadaDetalhe, despesasAprovadasLista; persisted */
  @property({ attribute: false }) selectedDespesa: string | null = null;

  /** state colaboradorId — filter of the queue by collaborator id (null = no filter); source entry.params.colaboradorId; organism despesasAprovadasLista; persisted */
  @property({ attribute: false }) colaboradorId: string | null = null;

  /** state categoria — filter of the queue by category (null = no filter); source entry.params.categoria; organism despesasAprovadasLista; persisted */
  @property({ attribute: false }) categoria: string | null = null;

  /** state page — the page of the queue the person went to with a pager (a load-more never writes it); source entry.params.page; organism despesasAprovadasLista; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state registrarPagamentoDraft — draft of the payment form (payment date); source registrarPagamento.input; organism registroPagamentoForm */
  @property({ attribute: false }) registrarPagamentoDraft: RegistrarPagamentoDraft = emptyRegistrarPagamentoDraft();

  /** state pageStatus — overall status of the page load: idle, loading, empty (queue has no items), success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state listarDespesasAprovadasStatus — status of the queue request */
  @property({ attribute: false }) listarDespesasAprovadasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarDespesasAprovadasError — error of the queue request, null when none */
  @property({ attribute: false }) listarDespesasAprovadasError: ErrorState = null;

  /** state obterDespesaAprovadaStatus — status of the expense detail request */
  @property({ attribute: false }) obterDespesaAprovadaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state obterDespesaAprovadaError — error of the expense detail request, null when none */
  @property({ attribute: false }) obterDespesaAprovadaError: ErrorState = null;

  /** state registrarPagamentoStatus — status of the payment registration command */
  @property({ attribute: false }) registrarPagamentoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state registrarPagamentoError — error of the payment registration command, null when none */
  @property({ attribute: false }) registrarPagamentoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`${KEY_PREFIX}${member}`, value);
    const paramName = PERSISTED_PARAM[member];
    if (paramName) {
      try {
        if (value === null || value === undefined) {
          window.localStorage.removeItem(`${STORAGE_PREFIX}${paramName}`);
        } else {
          window.localStorage.setItem(`${STORAGE_PREFIX}${paramName}`, String(value));
        }
      } catch {
        // storage unavailable: the value stays only in memory
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
    void this.listarDespesasAprovadas({ page: this.page ?? 1 });
    if (this.selectedDespesa !== null) {
      void this.obterDespesaAprovada(this.selectedDespesa);
    }
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
    const dataMembers: StateMember[] = ['despesas', 'despesa'];
    for (const member of dataMembers) {
      const stored = getState(`${KEY_PREFIX}${member}`);
      if (stored !== undefined) {
        this.assignState(`${KEY_PREFIX}${member}`, stored);
      }
    }
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
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = window.localStorage.getItem(`${STORAGE_PREFIX}${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private applyEntryParams(): void {
    this.publish('colaboradorId', this.readParam('colaboradorId'));
    this.publish('categoria', this.readParam('categoria'));
    const rawPage = this.readParam('page');
    const parsedPage = rawPage !== null ? Number(rawPage) : NaN;
    this.publish('page', Number.isFinite(parsedPage) ? parsedPage : null);
    const despesaId = this.readParam('despesaId');
    this.publish('selectedDespesa', despesaId);
    if (despesaId === null) {
      this.publish('despesa', null);
    }
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** select scene — publishes the visible scene of the page */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the payment form draft (payment date); resets the previous command result */
  public setRegistrarPagamentoDraft(value: RegistrarPagamentoDraft): void {
    this.resetCommandResults();
    this.publish('registrarPagamentoDraft', value);
  }

  /** select — chooses the expense to inspect and pay by its id (null clears the selection); loads its full data into despesa through obterDespesaAprovada */
  public selectDespesaAprovadaDetalhe(id: string | null): void {
    if (id === null) {
      this.resetCommandResults();
      this.publish('selectedDespesa', null);
      this.publish('despesa', null);
      this.publish('obterDespesaAprovadaStatus', 'idle');
      this.publish('obterDespesaAprovadaError', null);
      this.publish('registrarPagamentoDraft', emptyRegistrarPagamentoDraft());
      return;
    }
    void this.obterDespesaAprovada(id);
  }

  /** request listarDespesasAprovadas — loads the queue of approved expenses waiting for payment; redraws despesas (replace, or append the next page when append is true), pageStatus and the page state (only when not appending); args.colaboradorId / args.categoria: new filter value (null clears it, omitted keeps the current one) and loading restarts at the first page; args.page: page to load (default: first page, or the current page + 1 when appending); args.append: add the page to the loaded items (a "load more") instead of replacing them */
  public async listarDespesasAprovadas(args: ListarDespesasAprovadasArgs = {}): Promise<void> {
    if (this.listarDespesasAprovadasStatus === 'loading') return;
    const append = args.append === true;
    const current = this.despesas;
    if (append && (current === null || !current.hasMore)) return;
    const colaboradorId = args.colaboradorId !== undefined ? args.colaboradorId : this.colaboradorId;
    const categoria = args.categoria !== undefined ? args.categoria : this.categoria;
    const filterChanged = args.colaboradorId !== undefined || args.categoria !== undefined;
    let pageToLoad = this.page ?? 1;
    if (args.page !== undefined) {
      pageToLoad = args.page;
    } else if (append && current !== null) {
      pageToLoad = current.page + 1;
    } else if (filterChanged) {
      pageToLoad = 1;
    }
    this.publish('listarDespesasAprovadasStatus', 'loading');
    this.publish('listarDespesasAprovadasError', null);
    this.publish('pageStatus', 'loading');
    if (args.colaboradorId !== undefined) this.publish('colaboradorId', colaboradorId);
    if (args.categoria !== undefined) this.publish('categoria', categoria);
    if (!append) this.publish('page', pageToLoad);
    const input: Input<'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas'> = {
      ...(colaboradorId !== null && colaboradorId !== '' ? { colaboradorId } : {}),
      details: {
        ...(categoria !== null && categoria !== '' ? { categoria } : {}),
      },
      page: pageToLoad,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas'>>(
        'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('listarDespesasAprovadasError', response.error ?? this.unexpectedError(null));
        this.publish('listarDespesasAprovadasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.despesas;
      if (append && current !== null) {
        this.publish('despesas', {
          items: [...current.items, ...loaded.items],
          page: loaded.page,
          pageSize: loaded.pageSize,
          hasMore: loaded.hasMore,
        });
      } else {
        this.publish('despesas', loaded);
      }
      this.publish('listarDespesasAprovadasStatus', 'success');
      this.publish('pageStatus', loaded.items.length === 0 && !append ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarDespesasAprovadasError', this.unexpectedError(error));
      this.publish('listarDespesasAprovadasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request obterDespesaAprovada — loads the full data of the chosen expense (with the version used to pay it); redraws selectedDespesa (the id), despesa (replace) and empties the payment draft; id: id of the expense picked in the queue */
  public async obterDespesaAprovada(id: string): Promise<void> {
    if (this.obterDespesaAprovadaStatus === 'loading') return;
    this.resetCommandResults();
    this.publish('obterDespesaAprovadaStatus', 'loading');
    this.publish('obterDespesaAprovadaError', null);
    this.publish('selectedDespesa', id);
    this.publish('registrarPagamentoDraft', emptyRegistrarPagamentoDraft());
    const input: Input<'reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada'> = { id };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada'>>(
        'reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('despesa', null);
        this.publish('obterDespesaAprovadaError', response.error ?? this.unexpectedError(null));
        this.publish('obterDespesaAprovadaStatus', 'error');
        return;
      }
      this.publish('despesa', response.data.despesa);
      this.publish('obterDespesaAprovadaStatus', 'success');
    } catch (error) {
      this.publish('despesa', null);
      this.publish('obterDespesaAprovadaError', this.unexpectedError(error));
      this.publish('obterDespesaAprovadaStatus', 'error');
    }
  }

  /** request registrarPagamento — registers the payment of the loaded expense with the date typed in registrarPagamentoDraft (approved -> paid); redraws despesa (replace with the returned expense, new version), removes the expense from despesas (it leaves the queue, no reload) and empties the draft; takes no arguments: id and version come from despesa, the date from the draft */
  public async registrarPagamento(): Promise<void> {
    if (this.registrarPagamentoStatus === 'loading') return;
    const current = this.despesa;
    if (current === null) {
      this.publish('registrarPagamentoError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: [`${KEY_PREFIX}despesa`] } });
      this.publish('registrarPagamentoStatus', 'error');
      return;
    }
    const dataPagamento = this.registrarPagamentoDraft.details.dataPagamento;
    if (dataPagamento === null || dataPagamento === '') {
      this.publish('registrarPagamentoError', { code: 'client.requiredMissing', message: '', details: { stateKeys: [`${KEY_PREFIX}registrarPagamentoDraft`] } });
      this.publish('registrarPagamentoStatus', 'error');
      return;
    }
    this.publish('registrarPagamentoStatus', 'loading');
    this.publish('registrarPagamentoError', null);
    const input: Input<'reembolsoDespesas.despesas_aprovadas.registrarPagamento'> = {
      id: current.id,
      version: current.version,
      details: { dataPagamento },
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'reembolsoDespesas.despesas_aprovadas.registrarPagamento'>>(
          'reembolsoDespesas.despesas_aprovadas.registrarPagamento',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('registrarPagamentoError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
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
      const list = this.despesas;
      if (list !== null) {
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
