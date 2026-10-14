/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Minhas_despesasContracts, DespesaResumoDetalhes, DespesaResumo, DespesaDetalheDetalhes, DespesaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

export type { Minhas_despesasContracts, DespesaResumoDetalhes, DespesaResumo, DespesaDetalheDetalhes, DespesaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

type Input<R extends keyof Minhas_despesasContracts> = Minhas_despesasContracts[R]['input'];
type Output<R extends keyof Minhas_despesasContracts> = Minhas_despesasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type DespesaStatus = DespesaResumo['status'];
export type DespesasPage = Output<'reembolsoDespesas.minhas_despesas.listarMinhasDespesas'>['despesas'];

type CommandRoute =
  | 'reembolsoDespesas.minhas_despesas.registrarDespesa'
  | 'reembolsoDespesas.minhas_despesas.salvarCorrecao'
  | 'reembolsoDespesas.minhas_despesas.enviarParaAprovacao'
  | 'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao';

type CommandId = 'registrarDespesa' | 'salvarCorrecao' | 'enviarParaAprovacao' | 'reenviarParaAprovacao';

/** Typed fields of an expense (every leaf null until typed). */
export type DespesaDetailsDraft = {
  dataDespesa: string | null;
  categoria: string | null;
  valor: string | null;
  descricao: string | null;
};

/** Draft of the registrarDespesa command input. colaboradorId comes from the session, so it may stay null. */
export type RegistrarDespesaDraft = {
  colaboradorId: string | null;
  details: DespesaDetailsDraft;
};

/** Draft of the salvarCorrecao command input; prefilled from the open expense. */
export type SalvarCorrecaoDraft = {
  id: string | null;
  version: number | null;
  details: DespesaDetailsDraft;
};

/** Options of the list request. */
export type ListarMinhasDespesasOptions = {
  status?: DespesaStatus | null;
  page?: number;
  append?: boolean;
};

const DESPESA_STATUS_VALUES: string[] = ['draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];
const PAGE_SIZE = 20;
const STORAGE_PREFIX = 'reembolsoDespesas.minhas_despesas.';

function isDespesaStatus(value: string): value is DespesaStatus {
  return DESPESA_STATUS_VALUES.includes(value);
}

function emptyDetailsDraft(): DespesaDetailsDraft {
  return { dataDespesa: null, categoria: null, valor: null, descricao: null };
}

function emptyRegistrarDespesaDraft(): RegistrarDespesaDraft {
  return { colaboradorId: null, details: emptyDetailsDraft() };
}

function emptySalvarCorrecaoDraft(): SalvarCorrecaoDraft {
  return { id: null, version: null, details: emptyDetailsDraft() };
}

function isFilled(value: string | null): boolean {
  return value !== null && value.trim() !== '';
}

type StateMember =
  | 'despesas'
  | 'despesa'
  | 'selectedDespesa'
  | 'status'
  | 'page'
  | 'registrarDespesaDraft'
  | 'salvarCorrecaoDraft'
  | 'pageStatus'
  | 'listarMinhasDespesasStatus'
  | 'listarMinhasDespesasError'
  | 'obterDespesaStatus'
  | 'obterDespesaError'
  | 'registrarDespesaStatus'
  | 'registrarDespesaError'
  | 'salvarCorrecaoStatus'
  | 'salvarCorrecaoError'
  | 'enviarParaAprovacaoStatus'
  | 'enviarParaAprovacaoError'
  | 'reenviarParaAprovacaoStatus'
  | 'reenviarParaAprovacaoError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.minhas_despesas.despesas': 'despesas',
  'ui.reembolsoDespesas.minhas_despesas.despesa': 'despesa',
  'ui.reembolsoDespesas.minhas_despesas.selectedDespesa': 'selectedDespesa',
  'ui.reembolsoDespesas.minhas_despesas.status': 'status',
  'ui.reembolsoDespesas.minhas_despesas.page': 'page',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaDraft': 'registrarDespesaDraft',
  'ui.reembolsoDespesas.minhas_despesas.salvarCorrecaoDraft': 'salvarCorrecaoDraft',
  'ui.reembolsoDespesas.minhas_despesas.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.minhas_despesas.listarMinhasDespesasStatus': 'listarMinhasDespesasStatus',
  'ui.reembolsoDespesas.minhas_despesas.listarMinhasDespesasError': 'listarMinhasDespesasError',
  'ui.reembolsoDespesas.minhas_despesas.obterDespesaStatus': 'obterDespesaStatus',
  'ui.reembolsoDespesas.minhas_despesas.obterDespesaError': 'obterDespesaError',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaStatus': 'registrarDespesaStatus',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaError': 'registrarDespesaError',
  'ui.reembolsoDespesas.minhas_despesas.salvarCorrecaoStatus': 'salvarCorrecaoStatus',
  'ui.reembolsoDespesas.minhas_despesas.salvarCorrecaoError': 'salvarCorrecaoError',
  'ui.reembolsoDespesas.minhas_despesas.enviarParaAprovacaoStatus': 'enviarParaAprovacaoStatus',
  'ui.reembolsoDespesas.minhas_despesas.enviarParaAprovacaoError': 'enviarParaAprovacaoError',
  'ui.reembolsoDespesas.minhas_despesas.reenviarParaAprovacaoStatus': 'reenviarParaAprovacaoStatus',
  'ui.reembolsoDespesas.minhas_despesas.reenviarParaAprovacaoError': 'reenviarParaAprovacaoError',
  'ui.reembolsoDespesas.minhas_despesas.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class ReembolsoDespesasMinhas_despesasShared extends StateLitElement {
  /** state despesas — page of the collaborator's own expenses (rows with id, status, date, category, value); source listarMinhasDespesas.despesas; organism listaMinhasDespesas */
  @property({ attribute: false }) despesas: DespesasPage | null = null;

  /** state despesa — the open expense with all its data (id, version, status, details), used by the detail, the correction form and the submit actions; source obterDespesa.despesa; organisms acoesEnvio, detalheDespesa, formularioDespesa */
  @property({ attribute: false }) despesa: DespesaDetalhe | null = null;

  /** state selectedDespesa — id of the selected expense (the record itself is in despesa); source entry.params.despesaId; organisms detalheDespesa, listaMinhasDespesas; persisted */
  @property({ attribute: false }) selectedDespesa: string | null = null;

  /** state status — status filter of the expense list, null for all; source entry.params.status; organism listaMinhasDespesas; persisted */
  @property({ attribute: false }) status: DespesaStatus | null = null;

  /** state page — page of the list the person went to with a pager (a "load more" never writes it); source entry.params.page; organism listaMinhasDespesas; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state registrarDespesaDraft — form draft of a new expense (date, category, value, description); source registrarDespesa.input; organism formularioDespesa */
  @property({ attribute: false }) registrarDespesaDraft: RegistrarDespesaDraft = emptyRegistrarDespesaDraft();

  /** state salvarCorrecaoDraft — form draft correcting a rejected expense, prefilled from the open expense; source salvarCorrecao.input; organism formularioDespesa */
  @property({ attribute: false }) salvarCorrecaoDraft: SalvarCorrecaoDraft = emptySalvarCorrecaoDraft();

  /** state pageStatus — overall status of the page: loading while the list loads, empty when it has no rows, error when it failed; source page load */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state listarMinhasDespesasStatus — status of the list request; source listarMinhasDespesas */
  @property({ attribute: false }) listarMinhasDespesasStatus: RequestStatus = 'idle';

  /** state listarMinhasDespesasError — error of the list request, null when none; source listarMinhasDespesas */
  @property({ attribute: false }) listarMinhasDespesasError: ErrorState = null;

  /** state obterDespesaStatus — status of the request that opens an expense; source obterDespesa */
  @property({ attribute: false }) obterDespesaStatus: RequestStatus = 'idle';

  /** state obterDespesaError — error of the request that opens an expense, null when none; source obterDespesa */
  @property({ attribute: false }) obterDespesaError: ErrorState = null;

  /** state registrarDespesaStatus — status of the command that registers a new expense; source registrarDespesa */
  @property({ attribute: false }) registrarDespesaStatus: RequestStatus = 'idle';

  /** state registrarDespesaError — error of the register command, null when none; source registrarDespesa */
  @property({ attribute: false }) registrarDespesaError: ErrorState = null;

  /** state salvarCorrecaoStatus — status of the command that saves the correction of a rejected expense; source salvarCorrecao */
  @property({ attribute: false }) salvarCorrecaoStatus: RequestStatus = 'idle';

  /** state salvarCorrecaoError — error of the save-correction command, null when none; source salvarCorrecao */
  @property({ attribute: false }) salvarCorrecaoError: ErrorState = null;

  /** state enviarParaAprovacaoStatus — status of the command that submits a draft expense for approval; source enviarParaAprovacao */
  @property({ attribute: false }) enviarParaAprovacaoStatus: RequestStatus = 'idle';

  /** state enviarParaAprovacaoError — error of the submit command, null when none; source enviarParaAprovacao */
  @property({ attribute: false }) enviarParaAprovacaoError: ErrorState = null;

  /** state reenviarParaAprovacaoStatus — status of the command that resubmits a corrected rejected expense; source reenviarParaAprovacao */
  @property({ attribute: false }) reenviarParaAprovacaoStatus: RequestStatus = 'idle';

  /** state reenviarParaAprovacaoError — error of the resubmit command, null when none; source reenviarParaAprovacao */
  @property({ attribute: false }) reenviarParaAprovacaoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.minhas_despesas.${member}`, value);
    if (member === 'status') {
      this.persistParam('status', this.status);
    }
    if (member === 'page') {
      this.persistParam('page', this.page);
    }
    if (member === 'selectedDespesa') {
      this.persistParam('despesaId', this.selectedDespesa);
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private persistParam(name: string, value: string | number | null): void {
    try {
      if (value === null) {
        localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
      } else {
        localStorage.setItem(`${STORAGE_PREFIX}${name}`, String(value));
      }
    } catch {
      // storage unavailable: the param simply is not persisted
    }
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable: no stored value
    }
    return null;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const hydrated: Array<'despesas' | 'despesa'> = ['despesas', 'despesa'];
    for (const member of hydrated) {
      const key = `ui.reembolsoDespesas.minhas_despesas.${member}`;
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.listarMinhasDespesas();
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
    this.publish('listarMinhasDespesasStatus', 'idle');
    this.publish('listarMinhasDespesasError', null);
    this.publish('obterDespesaStatus', 'idle');
    this.publish('obterDespesaError', null);
    this.resetCommandResults();
    this.publish('registrarDespesaDraft', emptyRegistrarDespesaDraft());
    this.publish('salvarCorrecaoDraft', emptySalvarCorrecaoDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('registrarDespesaStatus', 'idle');
    this.publish('registrarDespesaError', null);
    this.publish('salvarCorrecaoStatus', 'idle');
    this.publish('salvarCorrecaoError', null);
    this.publish('enviarParaAprovacaoStatus', 'idle');
    this.publish('enviarParaAprovacaoError', null);
    this.publish('reenviarParaAprovacaoStatus', 'idle');
    this.publish('reenviarParaAprovacaoError', null);
  }

  private applyEntryParams(): void {
    const rawStatus = this.readParam('status');
    this.publish('status', rawStatus !== null && isDespesaStatus(rawStatus) ? rawStatus : null);
    const rawPage = this.readParam('page');
    const parsedPage = rawPage !== null ? Number(rawPage) : NaN;
    this.publish('page', Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : null);
    const rawId = this.readParam('despesaId');
    if (rawId !== null) {
      void this.obterDespesa(rawId);
    } else {
      this.publish('selectedDespesa', null);
      this.publish('despesa', null);
    }
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private draftFromDespesa(despesa: DespesaDetalhe): SalvarCorrecaoDraft {
    return {
      id: despesa.id,
      version: despesa.version,
      details: {
        dataDespesa: despesa.details.details.dataDespesa,
        categoria: despesa.details.details.categoria,
        valor: despesa.details.details.valor,
        descricao: despesa.details.details.descricao,
      },
    };
  }

  /** scene — publishes the visible scene of the page (any command result is cleared) */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the form draft of a new expense (date, category, value, description); clears old command results */
  public setRegistrarDespesaDraft(value: RegistrarDespesaDraft): void {
    this.resetCommandResults();
    this.publish('registrarDespesaDraft', value);
  }

  /** draft — replaces the form draft that corrects a rejected expense (prefilled by obterDespesa); clears old command results */
  public setSalvarCorrecaoDraft(value: SalvarCorrecaoDraft): void {
    this.resetCommandResults();
    this.publish('salvarCorrecaoDraft', value);
  }

  /** request listarMinhasDespesas — loads the collaborator's own expenses (newest expense date first), optionally by status; redraws despesas (replace, or append the next page when append is true), status and page (replace; append never writes page), pageStatus; options.status: new status filter (null clears it) and loads from page 1; options.page: page to load (pager); options.append: true adds the next page to the rows (load more), only when despesas.hasMore. Call with no arguments to reload. */
  public async listarMinhasDespesas(options: ListarMinhasDespesasOptions = {}): Promise<void> {
    if (this.listarMinhasDespesasStatus === 'loading') return;
    const append = options.append === true;
    if (append && (this.despesas === null || !this.despesas.hasMore)) return;
    const newStatus = options.status;
    if (newStatus !== undefined) {
      this.publish('status', newStatus);
    }
    let requestedPage = 1;
    if (options.page !== undefined) {
      requestedPage = options.page;
    } else if (append && this.despesas !== null) {
      requestedPage = this.despesas.page + 1;
    } else if (newStatus === undefined && this.page !== null) {
      requestedPage = this.page;
    }
    const currentStatus = this.status;
    const input: Input<'reembolsoDespesas.minhas_despesas.listarMinhasDespesas'> = {
      page: requestedPage,
      pageSize: PAGE_SIZE,
      ...(currentStatus !== null ? { status: currentStatus } : {}),
    };
    this.publish('listarMinhasDespesasStatus', 'loading');
    this.publish('listarMinhasDespesasError', null);
    if (!append) {
      this.publish('pageStatus', 'loading');
    }
    try {
      const response = await execBff<Output<'reembolsoDespesas.minhas_despesas.listarMinhasDespesas'>>('reembolsoDespesas.minhas_despesas.listarMinhasDespesas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarMinhasDespesasError', response.error ?? this.unexpectedError(null));
        this.publish('listarMinhasDespesasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const result = response.data.despesas;
      const previous = this.despesas;
      if (append && previous !== null) {
        this.publish('despesas', { ...result, items: [...previous.items, ...result.items] });
      } else {
        this.publish('despesas', result);
        this.publish('page', result.page);
      }
      this.publish('listarMinhasDespesasStatus', 'success');
      const rows = this.despesas;
      this.publish('pageStatus', rows === null || rows.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarMinhasDespesasError', this.unexpectedError(error));
      this.publish('listarMinhasDespesasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** select — opens an expense: selects the id (selectedDespesa) and fetches the full record; redraws despesa (replace) and refills salvarCorrecaoDraft from it; id: the expense picked in the list, or null to clear the selection */
  public async obterDespesa(id: string | null): Promise<void> {
    this.resetCommandResults();
    if (id === null || id === '') {
      this.publish('selectedDespesa', null);
      this.publish('despesa', null);
      this.publish('salvarCorrecaoDraft', emptySalvarCorrecaoDraft());
      this.publish('obterDespesaStatus', 'idle');
      this.publish('obterDespesaError', null);
      return;
    }
    if (this.obterDespesaStatus === 'loading' && this.selectedDespesa === id) return;
    this.publish('selectedDespesa', id);
    if (this.despesa !== null && this.despesa.id !== id) {
      this.publish('despesa', null);
      this.publish('salvarCorrecaoDraft', emptySalvarCorrecaoDraft());
    }
    this.publish('obterDespesaStatus', 'loading');
    this.publish('obterDespesaError', null);
    try {
      const input: Input<'reembolsoDespesas.minhas_despesas.obterDespesa'> = { id };
      const response = await execBff<Output<'reembolsoDespesas.minhas_despesas.obterDespesa'>>('reembolsoDespesas.minhas_despesas.obterDespesa', input, { mode: 'silent' });
      if (this.selectedDespesa !== id) return;
      if (!response.ok || !response.data) {
        this.publish('obterDespesaError', response.error ?? this.unexpectedError(null));
        this.publish('obterDespesaStatus', 'error');
        return;
      }
      const record = response.data.despesa;
      this.publish('despesa', record);
      this.publish('salvarCorrecaoDraft', this.draftFromDespesa(record));
      this.publish('obterDespesaStatus', 'success');
    } catch (error) {
      if (this.selectedDespesa !== id) return;
      this.publish('obterDespesaError', this.unexpectedError(error));
      this.publish('obterDespesaStatus', 'error');
    }
  }

  private setCommandState(request: CommandId, status: RequestStatus, error: ErrorState): void {
    if (request === 'registrarDespesa') {
      this.publish('registrarDespesaError', error);
      this.publish('registrarDespesaStatus', status);
      return;
    }
    if (request === 'salvarCorrecao') {
      this.publish('salvarCorrecaoError', error);
      this.publish('salvarCorrecaoStatus', status);
      return;
    }
    if (request === 'enviarParaAprovacao') {
      this.publish('enviarParaAprovacaoError', error);
      this.publish('enviarParaAprovacaoStatus', status);
      return;
    }
    this.publish('reenviarParaAprovacaoError', error);
    this.publish('reenviarParaAprovacaoStatus', status);
  }

  private async runCommand(request: CommandId, route: CommandRoute, input: Input<CommandRoute>): Promise<Output<CommandRoute> | null> {
    this.setCommandState(request, 'loading', null);
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<CommandRoute>>(route, input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.setCommandState(request, 'error', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        return null;
      }
      if (!response.ok || !response.data) {
        this.setCommandState(request, 'error', response.error ?? this.unexpectedError(null));
        return null;
      }
      return response.data;
    } catch (error) {
      this.setCommandState(request, 'error', this.unexpectedError(error));
      return null;
    }
  }

  private upsertItem(item: DespesaResumo): void {
    const current = this.despesas;
    if (current === null) return;
    const belongs = this.status === null || item.status === this.status;
    const exists = current.items.some(row => row.id === item.id);
    let items: DespesaResumo[];
    if (!belongs) {
      items = current.items.filter(row => row.id !== item.id);
    } else if (exists) {
      items = current.items.map(row => (row.id === item.id ? item : row));
    } else {
      items = [item, ...current.items];
    }
    this.publish('despesas', { ...current, items });
  }

  private applyDespesaResult(output: Output<CommandRoute>): void {
    this.publish('despesa', output.despesa);
    this.publish('selectedDespesa', output.despesa.id);
    this.publish('salvarCorrecaoDraft', this.draftFromDespesa(output.despesa));
    this.upsertItem(output.item);
  }

  /** request registrarDespesa — registers a new expense as draft from registrarDespesaDraft (date, category, value and description are required); redraws despesa and selectedDespesa (the created expense opens in the detail), despesas (the row is inserted at the top, no reload, unless the status filter excludes it), salvarCorrecaoDraft (refilled) and clears registrarDespesaDraft; no arguments */
  public async registrarDespesa(): Promise<void> {
    const draft = this.registrarDespesaDraft;
    const { dataDespesa, categoria, valor, descricao } = draft.details;
    const missing: string[] = [];
    if (!isFilled(dataDespesa)) missing.push('registrarDespesaDraft.details.dataDespesa');
    if (!isFilled(categoria)) missing.push('registrarDespesaDraft.details.categoria');
    if (!isFilled(valor)) missing.push('registrarDespesaDraft.details.valor');
    if (!isFilled(descricao)) missing.push('registrarDespesaDraft.details.descricao');
    if (missing.length > 0 || dataDespesa === null || categoria === null || valor === null || descricao === null) {
      this.setCommandState('registrarDespesa', 'error', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.registrarDespesa'> = {
      colaboradorId: draft.colaboradorId ?? '',
      details: { dataDespesa, categoria, valor, descricao },
    };
    const output = await this.runCommand('registrarDespesa', 'reembolsoDespesas.minhas_despesas.registrarDespesa', input);
    if (!output) return;
    this.applyDespesaResult(output);
    this.publish('registrarDespesaDraft', emptyRegistrarDespesaDraft());
    this.setCommandState('registrarDespesa', 'success', null);
  }

  /** request salvarCorrecao — saves the correction of a rejected expense from salvarCorrecaoDraft (id, version and all details required); redraws despesa (replace), the row in despesas (updated in place) and refills salvarCorrecaoDraft from the saved record; no arguments */
  public async salvarCorrecao(): Promise<void> {
    const draft = this.salvarCorrecaoDraft;
    const { dataDespesa, categoria, valor, descricao } = draft.details;
    const missing: string[] = [];
    if (draft.id === null) missing.push('salvarCorrecaoDraft.id');
    if (draft.version === null) missing.push('salvarCorrecaoDraft.version');
    if (!isFilled(dataDespesa)) missing.push('salvarCorrecaoDraft.details.dataDespesa');
    if (!isFilled(categoria)) missing.push('salvarCorrecaoDraft.details.categoria');
    if (!isFilled(valor)) missing.push('salvarCorrecaoDraft.details.valor');
    if (!isFilled(descricao)) missing.push('salvarCorrecaoDraft.details.descricao');
    if (missing.length > 0 || draft.id === null || draft.version === null || dataDespesa === null || categoria === null || valor === null || descricao === null) {
      this.setCommandState('salvarCorrecao', 'error', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.salvarCorrecao'> = {
      id: draft.id,
      version: draft.version,
      details: { dataDespesa, categoria, valor, descricao },
    };
    const output = await this.runCommand('salvarCorrecao', 'reembolsoDespesas.minhas_despesas.salvarCorrecao', input);
    if (!output) return;
    this.applyDespesaResult(output);
    this.setCommandState('salvarCorrecao', 'success', null);
  }

  /** request enviarParaAprovacao — submits the open draft expense (despesa) for manager approval using its id and version; redraws despesa (new status, new version), the row in despesas (updated in place or removed when the status filter no longer matches) and salvarCorrecaoDraft; no arguments */
  public async enviarParaAprovacao(): Promise<void> {
    const current = this.despesa;
    if (current === null) {
      this.setCommandState('enviarParaAprovacao', 'error', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.enviarParaAprovacao'> = { id: current.id, version: current.version };
    const output = await this.runCommand('enviarParaAprovacao', 'reembolsoDespesas.minhas_despesas.enviarParaAprovacao', input);
    if (!output) return;
    this.applyDespesaResult(output);
    this.setCommandState('enviarParaAprovacao', 'success', null);
  }

  /** request reenviarParaAprovacao — resubmits, once, the open rejected and corrected expense (despesa) for a new manager review using its id and version; redraws despesa (new status, resubmission flag, new version), the row in despesas (updated in place or removed when the status filter no longer matches) and salvarCorrecaoDraft; no arguments */
  public async reenviarParaAprovacao(): Promise<void> {
    const current = this.despesa;
    if (current === null) {
      this.setCommandState('reenviarParaAprovacao', 'error', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao'> = { id: current.id, version: current.version };
    const output = await this.runCommand('reenviarParaAprovacao', 'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao', input);
    if (!output) return;
    this.applyDespesaResult(output);
    this.setCommandState('reenviarParaAprovacao', 'success', null);
  }
}
