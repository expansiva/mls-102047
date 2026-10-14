/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { InicioContracts, IdentificacaoColaborador, DetalhesColaborador, ColaboradorResponsavel, DetalhesDespesaPendente, DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.js';

export type { InicioContracts, IdentificacaoColaborador, DetalhesColaborador, ColaboradorResponsavel, DetalhesDespesaPendente, DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof InicioContracts> = InicioContracts[R]['input'];
type Output<R extends keyof InicioContracts> = InicioContracts[R]['output'];

type DespesasPendentesPage = Output<'reembolsoDespesas.inicio.qryInicio'>['despesasPendentes'];

type StateMember = 'page' | 'totalPendentes' | 'despesasPendentes' | 'pageStatus' | 'qryInicioStatus' | 'qryInicioError' | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.inicio.page': 'page',
  'ui.reembolsoDespesas.inicio.totalPendentes': 'totalPendentes',
  'ui.reembolsoDespesas.inicio.despesasPendentes': 'despesasPendentes',
  'ui.reembolsoDespesas.inicio.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.inicio.qryInicioStatus': 'qryInicioStatus',
  'ui.reembolsoDespesas.inicio.qryInicioError': 'qryInicioError',
  'ui.reembolsoDespesas.inicio.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PAGE_STORAGE_KEY = 'reembolsoDespesas.inicio.page';
const DEFAULT_PAGE_SIZE = 20;

export class ReembolsoDespesasInicioShared extends StateLitElement {
  /** state page — the page of the pending-expense list the person went to with a pager; source entry.params.page; organism caixaDespesasPendentes; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state totalPendentes — number of team expenses waiting for the manager's decision, for the pending volume highlight; source qryInicio.totalPendentes; organism caixaDespesasPendentes */
  @property({ attribute: false }) totalPendentes: number = 0;

  /** state despesasPendentes — page of team expenses waiting for the manager's decision, each with the collaborator who registered it; source qryInicio.despesasPendentes; organism caixaDespesasPendentes */
  @property({ attribute: false }) despesasPendentes: DespesasPendentesPage | null = null;

  /** state pageStatus — overall status of the page: idle, loading, empty (no pending expense), success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryInicioStatus — status of the request qryInicio: idle, loading, success or error */
  @property({ attribute: false }) qryInicioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state qryInicioError — error of the request qryInicio (code, message, details), null when none */
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
    void this.qryInicio();
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
    const total = getState('ui.reembolsoDespesas.inicio.totalPendentes');
    if (total !== undefined) this.assignState('ui.reembolsoDespesas.inicio.totalPendentes', total);
    const lista = getState('ui.reembolsoDespesas.inicio.despesasPendentes');
    if (lista !== undefined) this.assignState('ui.reembolsoDespesas.inicio.despesasPendentes', lista);
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('qryInicioStatus', 'idle');
    this.publish('qryInicioError', null);
    this.publish('scenary', '');
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null) return fromUrl;
    try {
      return localStorage.getItem(`reembolsoDespesas.inicio.${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const raw = this.readParam('page');
    let value: number | null = null;
    if (raw !== null && raw !== '') {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) value = parsed;
    }
    this.publish('page', value);
  }

  /** scene — publishes the visible scene of the page; resets nothing else */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** request qryInicio — loads the total of team expenses awaiting the manager's decision and the list of those expenses with who registered them; redraws totalPendentes (replace) and despesasPendentes (replace, or append more items when append is true, keeping page and hasMore of the list itself); arguments: page = page to load (omit to use the current page param, or the first page), append = true for a "load more" that adds the next page to the items without changing the page param (does nothing when the list has no more pages). Also the method to reload and to page the list. */
  public async qryInicio(page?: number, append: boolean = false): Promise<void> {
    if (this.qryInicioStatus === 'loading') return;
    if (append && (!this.despesasPendentes || !this.despesasPendentes.hasMore)) return;
    let target = 1;
    if (append && this.despesasPendentes) {
      target = this.despesasPendentes.page + 1;
    } else if (page !== undefined) {
      target = page;
    } else if (this.page !== null) {
      target = this.page;
    }
    this.publish('qryInicioStatus', 'loading');
    this.publish('qryInicioError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'reembolsoDespesas.inicio.qryInicio'> = {
      page: target,
      pageSize: this.despesasPendentes ? this.despesasPendentes.pageSize : DEFAULT_PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'reembolsoDespesas.inicio.qryInicio'>>('reembolsoDespesas.inicio.qryInicio', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryInicioError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('qryInicioStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const output = response.data;
      const current = this.despesasPendentes;
      const nextList: DespesasPendentesPage = append && current
        ? { ...output.despesasPendentes, items: [...current.items, ...output.despesasPendentes.items] }
        : output.despesasPendentes;
      this.publish('totalPendentes', output.totalPendentes);
      this.publish('despesasPendentes', nextList);
      if (!append && page !== undefined) {
        this.publish('page', target);
      }
      this.publish('qryInicioStatus', 'success');
      this.publish('pageStatus', nextList.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('qryInicioError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('qryInicioStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** navigate — opens the team expenses page (despesas_da_equipe) to analyse and decide the expense the person picked; despesaId = id of the picked pending expense, carried as the param that selects it there; refuses with client.preconditionMissing in qryInicioError when it is null or empty */
  public abrirAnaliseDespesas(despesaId: string | null): void {
    if (despesaId === null || despesaId === '') {
      this.publish('qryInicioError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesaId'] } });
      return;
    }
    auraNavigate(`/reembolsoDespesas/despesas_da_equipe?despesaId=${encodeURIComponent(despesaId)}`, { basePath: '/reembolsoDespesas' });
  }
}
