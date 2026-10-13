/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import { property } from 'lit/decorators.js';
import type { InicioContracts, DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.js';

export type { InicioContracts, DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.js';
export type {
  IdentificacaoColaborador,
  DetalhesColaborador,
  ColaboradorResponsavel,
  DetalhesDespesaPendente,
} from '/_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof InicioContracts> = InicioContracts[R]['input'];
type Output<R extends keyof InicioContracts> = InicioContracts[R]['output'];

type PendingPage = Output<'reembolsoDespesas.inicio.qryInicio'>['despesasPendentes'];

type StateMember =
  | 'totalPendentes'
  | 'despesasPendentes'
  | 'page'
  | 'pageStatus'
  | 'qryInicioStatus'
  | 'qryInicioError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.inicio.totalPendentes': 'totalPendentes',
  'ui.reembolsoDespesas.inicio.despesasPendentes': 'despesasPendentes',
  'ui.reembolsoDespesas.inicio.page': 'page',
  'ui.reembolsoDespesas.inicio.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.inicio.qryInicioStatus': 'qryInicioStatus',
  'ui.reembolsoDespesas.inicio.qryInicioError': 'qryInicioError',
  'ui.reembolsoDespesas.inicio.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PAGE_SIZE = 10;
const PAGE_STORAGE_KEY = 'reembolsoDespesas.inicio.page';

export class ReembolsoDespesasInicioShared extends StateLitElement {
  /** state totalPendentes — number of team expenses waiting for the manager's decision, for the pending volume highlight; source qryInicio.totalPendentes; organism caixaDespesasPendentes */
  @property({ attribute: false }) totalPendentes: number = 0;

  /** state despesasPendentes — page of team expenses waiting for the manager's decision, each with the collaborator who registered it ({ items, page, pageSize, hasMore }); source qryInicio.despesasPendentes; organism caixaDespesasPendentes */
  @property({ attribute: false }) despesasPendentes: PendingPage | null = null;

  /** state page — page of the pending list the person went to with a pager (filter of caixaDespesasPendentes); source entry.params.page; organism caixaDespesasPendentes; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state pageStatus — overall status of the page: idle, loading, empty (no pending expense), success or error; source page status */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryInicioStatus — status of the qryInicio request: idle, loading, success or error; source qryInicio status */
  @property({ attribute: false }) qryInicioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state qryInicioError — error of the qryInicio request (or of a navigation precondition), null when none; source qryInicio error */
  @property({ attribute: false }) qryInicioError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.inicio.${member}`, value);
    if (member === 'page') {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem(PAGE_STORAGE_KEY);
        } else {
          localStorage.setItem(PAGE_STORAGE_KEY, String(value));
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
    this.hydrateData();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.qryInicio(this.page !== null ? this.page : 1);
  }

  public disconnectedCallback(): void {
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!STATE_MEMBER_BY_KEY[key]) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  private hydrateData(): void {
    const total = getState('ui.reembolsoDespesas.inicio.totalPendentes');
    if (total !== undefined) this.assignState('ui.reembolsoDespesas.inicio.totalPendentes', total);
    const list = getState('ui.reembolsoDespesas.inicio.despesasPendentes');
    if (list !== undefined) this.assignState('ui.reembolsoDespesas.inicio.despesasPendentes', list);
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('qryInicioStatus', 'idle');
    this.publish('qryInicioError', null);
    this.publish('scenary', '');
  }

  private applyEntryParams(): void {
    let raw: string | null = new URLSearchParams(window.location.search).get('page');
    if (raw === null) {
      try {
        raw = localStorage.getItem(PAGE_STORAGE_KEY);
      } catch {
        raw = null;
      }
    }
    if (raw !== null && raw !== '') {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) {
        this.publish('page', parsed);
        return;
      }
    }
    this.publish('page', null);
  }

  /** setScenario — publishes the visible scene of the page (state scenary). */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** request qryInicio — loads the total of team expenses awaiting the manager's decision and a page of those expenses with who registered them (oldest expense date first); redraws totalPendentes (replace) and despesasPendentes (replace, or append more items when append is true); page: page number to load, default 1 (the pager passes the page it goes to and it is recorded in state page); append: true for a "load more", which adds the next page to the items, keeps page/hasMore in the list and does not write state page; it does nothing when the list says there is no more. Also the method to reload the page. */
  public async qryInicio(page: number = 1, append: boolean = false): Promise<void> {
    if (this.qryInicioStatus === 'loading') return;
    if (append && this.despesasPendentes !== null && !this.despesasPendentes.hasMore) return;
    this.publish('qryInicioStatus', 'loading');
    this.publish('qryInicioError', null);
    this.publish('pageStatus', 'loading');
    if (!append) this.publish('page', page);
    const input: Input<'reembolsoDespesas.inicio.qryInicio'> = { page, pageSize: PAGE_SIZE };
    try {
      const response = await execBff<Output<'reembolsoDespesas.inicio.qryInicio'>>(
        'reembolsoDespesas.inicio.qryInicio',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('qryInicioError', response.error ? { code: response.error.code, message: response.error.message, details: response.error.details } : { code: 'client.unexpected', message: '' });
        this.publish('qryInicioStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const output = response.data;
      this.publish('totalPendentes', output.totalPendentes);
      const current = this.despesasPendentes;
      if (append && current !== null) {
        const merged: PendingPage = {
          items: [...current.items, ...output.despesasPendentes.items],
          page: output.despesasPendentes.page,
          pageSize: output.despesasPendentes.pageSize,
          hasMore: output.despesasPendentes.hasMore,
        };
        this.publish('despesasPendentes', merged);
      } else {
        this.publish('despesasPendentes', { ...output.despesasPendentes, items: [...output.despesasPendentes.items] });
      }
      const loaded = this.despesasPendentes;
      const isEmpty = loaded === null || loaded.items.length === 0;
      this.publish('qryInicioStatus', 'success');
      this.publish('pageStatus', isEmpty ? 'empty' : 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('qryInicioError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('qryInicioStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** navigate abrirAnaliseDespesas — opens the despesas_da_equipe page to analyse and decide the expense the person picked in caixaDespesasPendentes; despesaId: id of the picked pending expense, carried as the despesaId entry param (selection) of the target page; refuses with client.preconditionMissing (in qryInicioError) when it is null */
  public abrirAnaliseDespesas(despesaId: string | null): void {
    if (despesaId === null || despesaId === '') {
      this.publish('qryInicioError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesaId'] } });
      return;
    }
    auraNavigate(`/reembolsoDespesas/despesas_da_equipe?despesaId=${encodeURIComponent(despesaId)}`, { basePath: '/reembolsoDespesas' });
  }
}
