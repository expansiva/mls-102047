/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import type { BffClientResponse } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Minhas_despesasContracts, DespesaResumo, DespesaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

export type { Minhas_despesasContracts, DespesaResumoDetalhes, DespesaResumo, DespesaDetalheDetalhes, DespesaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

type Input<R extends keyof Minhas_despesasContracts> = Minhas_despesasContracts[R]['input'];
type Output<R extends keyof Minhas_despesasContracts> = Minhas_despesasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type QueryStatus = 'idle' | 'loading' | 'success' | 'error';
export type ExpenseStatus = DespesaResumo['status'];
export type DespesasPage = Output<'reembolsoDespesas.minhas_despesas.listarMinhasDespesas'>['despesas'];
type CommandOutput = Output<'reembolsoDespesas.minhas_despesas.registrarDespesa'>;
type CommandId = 'registrarDespesa' | 'salvarCorrecao' | 'enviarParaAprovacao' | 'reenviarParaAprovacao';

/** The expense data the person types; every leaf is null until filled. */
export type DespesaDetailsDraft = {
  dataDespesa: string | null;
  categoria: string | null;
  valor: string | null;
  descricao: string | null;
};
/** Draft of a new expense (input of registrarDespesa; colaboradorId comes from the session). */
export type RegistrarDespesaDraft = { details: DespesaDetailsDraft };
/** Draft of the correction of a rejected expense (input of salvarCorrecao; id and version come from the loaded expense). */
export type SalvarCorrecaoDraft = { details: DespesaDetailsDraft };

type StateMember =
  | 'despesas'
  | 'despesa'
  | 'selectedDespesa'
  | 'status'
  | 'page'
  | 'registrarDespesaDraft'
  | 'salvarCorrecaoDraft'
  | 'scenary'
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
  | 'reenviarParaAprovacaoError';

const KEY_PREFIX = 'ui.reembolsoDespesas.minhas_despesas.';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.minhas_despesas.despesas': 'despesas',
  'ui.reembolsoDespesas.minhas_despesas.despesa': 'despesa',
  'ui.reembolsoDespesas.minhas_despesas.selectedDespesa': 'selectedDespesa',
  'ui.reembolsoDespesas.minhas_despesas.status': 'status',
  'ui.reembolsoDespesas.minhas_despesas.page': 'page',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaDraft': 'registrarDespesaDraft',
  'ui.reembolsoDespesas.minhas_despesas.salvarCorrecaoDraft': 'salvarCorrecaoDraft',
  'ui.reembolsoDespesas.minhas_despesas.scenary': 'scenary',
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
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

/** Persisted entry params: state member -> param name (localStorage key suffix). */
const PERSISTED_PARAM: Partial<Record<StateMember, string>> = {
  status: 'status',
  page: 'page',
  selectedDespesa: 'despesaId',
};

const STORAGE_PREFIX = 'reembolsoDespesas.minhas_despesas.';
const PAGE_SIZE = 20;
const EXPENSE_STATUSES: string[] = ['draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

function isExpenseStatus(value: string | null): value is ExpenseStatus {
  return value !== null && EXPENSE_STATUSES.includes(value);
}

function emptyDetailsDraft(): DespesaDetailsDraft {
  return { dataDespesa: null, categoria: null, valor: null, descricao: null };
}

function emptyRegistrarDespesaDraft(): RegistrarDespesaDraft {
  return { details: emptyDetailsDraft() };
}

function emptySalvarCorrecaoDraft(): SalvarCorrecaoDraft {
  return { details: emptyDetailsDraft() };
}

function draftFromDespesa(despesa: DespesaDetalhe): SalvarCorrecaoDraft {
  return {
    details: {
      dataDespesa: despesa.details.details.dataDespesa,
      categoria: despesa.details.details.categoria,
      valor: despesa.details.details.valor,
      descricao: despesa.details.details.descricao,
    },
  };
}

function unexpectedError(error: unknown): ErrorState {
  const name = error instanceof Error ? error.name : 'unknown';
  return { code: 'client.unexpected', message: '', details: { name } };
}

export class ReembolsoDespesasMinhas_despesasShared extends StateLitElement {
  /** state despesas — page of the expenses of the logged collaborator (rows with id, status, date, category, value); source listarMinhasDespesas.despesas; organism listaMinhasDespesas */
  @property({ attribute: false }) despesas: DespesasPage | null = null;

  /** state despesa — the complete open expense (detail, correction form and submit actions); null when none is open; source obterDespesa.despesa; organisms acoesEnvio, detalheDespesa, formularioDespesa */
  @property({ attribute: false }) despesa: DespesaDetalhe | null = null;

  /** state selectedDespesa — id of the selected expense (the record itself is in `despesa`); source entry.params.despesaId; organisms detalheDespesa, listaMinhasDespesas; persisted */
  @property({ attribute: false }) selectedDespesa: string | null = null;

  /** state status — filter of the list by expense status, null for every status; source entry.params.status; organism listaMinhasDespesas; persisted */
  @property({ attribute: false }) status: ExpenseStatus | null = null;

  /** state page — the page of the list the person went to with a pager (a "load more" never writes it); source entry.params.page; organism listaMinhasDespesas; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state registrarDespesaDraft — draft of the new expense typed in the form; source registrarDespesa.input; organism formularioDespesa */
  @property({ attribute: false }) registrarDespesaDraft: RegistrarDespesaDraft = emptyRegistrarDespesaDraft();

  /** state salvarCorrecaoDraft — draft of the correction of the open rejected expense, prefilled from `despesa`; source salvarCorrecao.input; organism formularioDespesa */
  @property({ attribute: false }) salvarCorrecaoDraft: SalvarCorrecaoDraft = emptySalvarCorrecaoDraft();

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  /** state pageStatus — overall status of the page load: idle, loading, empty (no expense), success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state listarMinhasDespesasStatus — status of the list request */
  @property({ attribute: false }) listarMinhasDespesasStatus: QueryStatus = 'idle';

  /** state listarMinhasDespesasError — error of the list request, null when none */
  @property({ attribute: false }) listarMinhasDespesasError: ErrorState = null;

  /** state obterDespesaStatus — status of the request that opens an expense */
  @property({ attribute: false }) obterDespesaStatus: QueryStatus = 'idle';

  /** state obterDespesaError — error of the request that opens an expense, null when none */
  @property({ attribute: false }) obterDespesaError: ErrorState = null;

  /** state registrarDespesaStatus — status of the command that registers a new expense */
  @property({ attribute: false }) registrarDespesaStatus: QueryStatus = 'idle';

  /** state registrarDespesaError — error of the register command, null when none */
  @property({ attribute: false }) registrarDespesaError: ErrorState = null;

  /** state salvarCorrecaoStatus — status of the command that saves the correction */
  @property({ attribute: false }) salvarCorrecaoStatus: QueryStatus = 'idle';

  /** state salvarCorrecaoError — error of the save-correction command, null when none */
  @property({ attribute: false }) salvarCorrecaoError: ErrorState = null;

  /** state enviarParaAprovacaoStatus — status of the command that submits a draft expense for approval */
  @property({ attribute: false }) enviarParaAprovacaoStatus: QueryStatus = 'idle';

  /** state enviarParaAprovacaoError — error of the submit command, null when none */
  @property({ attribute: false }) enviarParaAprovacaoError: ErrorState = null;

  /** state reenviarParaAprovacaoStatus — status of the command that resubmits a rejected expense */
  @property({ attribute: false }) reenviarParaAprovacaoStatus: QueryStatus = 'idle';

  /** state reenviarParaAprovacaoError — error of the resubmit command, null when none */
  @property({ attribute: false }) reenviarParaAprovacaoError: ErrorState = null;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`${KEY_PREFIX}${member}`, value);
    const param: string | undefined = PERSISTED_PARAM[member];
    if (param) {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem(`${STORAGE_PREFIX}${param}`);
        } else {
          localStorage.setItem(`${STORAGE_PREFIX}${param}`, String(value));
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
    this.hydrateData();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.listarMinhasDespesas(this.status, this.page ?? 1);
    if (this.selectedDespesa !== null) {
      void this.obterDespesa(this.selectedDespesa);
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

  private hydrateData(): void {
    const despesas = getState(`${KEY_PREFIX}despesas`);
    if (despesas !== undefined) this.assignState(`${KEY_PREFIX}despesas`, despesas);
    const despesa = getState(`${KEY_PREFIX}despesa`);
    if (despesa !== undefined) this.assignState(`${KEY_PREFIX}despesa`, despesa);
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('listarMinhasDespesasStatus', 'idle');
    this.publish('listarMinhasDespesasError', null);
    this.publish('obterDespesaStatus', 'idle');
    this.publish('obterDespesaError', null);
    this.publish('registrarDespesaDraft', emptyRegistrarDespesaDraft());
    this.publish('salvarCorrecaoDraft', emptySalvarCorrecaoDraft());
    this.resetCommandResults();
  }

  private readParam(name: string): string | null {
    const raw = new URLSearchParams(window.location.search).get(name);
    if (raw !== null) return raw;
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const statusRaw = this.readParam('status');
    this.publish('status', isExpenseStatus(statusRaw) ? statusRaw : null);
    const pageRaw = this.readParam('page');
    const pageNumber = pageRaw !== null && pageRaw !== '' ? Number(pageRaw) : NaN;
    this.publish('page', Number.isFinite(pageNumber) && pageNumber >= 1 ? pageNumber : null);
    const despesaRaw = this.readParam('despesaId');
    this.publish('selectedDespesa', despesaRaw !== null && despesaRaw !== '' ? despesaRaw : null);
  }

  private commandStatus(id: CommandId): QueryStatus {
    switch (id) {
      case 'registrarDespesa':
        return this.registrarDespesaStatus;
      case 'salvarCorrecao':
        return this.salvarCorrecaoStatus;
      case 'enviarParaAprovacao':
        return this.enviarParaAprovacaoStatus;
      case 'reenviarParaAprovacao':
        return this.reenviarParaAprovacaoStatus;
    }
  }

  private setCommandStatus(id: CommandId, value: QueryStatus): void {
    switch (id) {
      case 'registrarDespesa':
        this.publish('registrarDespesaStatus', value);
        break;
      case 'salvarCorrecao':
        this.publish('salvarCorrecaoStatus', value);
        break;
      case 'enviarParaAprovacao':
        this.publish('enviarParaAprovacaoStatus', value);
        break;
      case 'reenviarParaAprovacao':
        this.publish('reenviarParaAprovacaoStatus', value);
        break;
    }
  }

  private setCommandError(id: CommandId, value: ErrorState): void {
    switch (id) {
      case 'registrarDespesa':
        this.publish('registrarDespesaError', value);
        break;
      case 'salvarCorrecao':
        this.publish('salvarCorrecaoError', value);
        break;
      case 'enviarParaAprovacao':
        this.publish('enviarParaAprovacaoError', value);
        break;
      case 'reenviarParaAprovacao':
        this.publish('reenviarParaAprovacaoError', value);
        break;
    }
  }

  private resetCommandResults(): void {
    const ids: CommandId[] = ['registrarDespesa', 'salvarCorrecao', 'enviarParaAprovacao', 'reenviarParaAprovacao'];
    for (const id of ids) {
      this.setCommandStatus(id, 'idle');
      this.setCommandError(id, null);
    }
  }

  private failCommand(id: CommandId, error: ErrorState): void {
    this.setCommandError(id, error);
    this.setCommandStatus(id, 'error');
  }

  private missingKeys(prefix: string, details: DespesaDetailsDraft): string[] {
    const keys: string[] = [];
    if (!details.dataDespesa) keys.push(`${prefix}.details.dataDespesa`);
    if (!details.categoria) keys.push(`${prefix}.details.categoria`);
    if (!details.valor) keys.push(`${prefix}.details.valor`);
    if (!details.descricao) keys.push(`${prefix}.details.descricao`);
    return keys;
  }

  private async executeCommand(
    id: CommandId,
    call: (signal: AbortSignal) => Promise<BffClientResponse<CommandOutput>>,
  ): Promise<CommandOutput | null> {
    if (this.commandStatus(id) === 'loading') return null;
    this.setCommandStatus(id, 'loading');
    this.setCommandError(id, null);
    try {
      const response = await runBlockingUiAction((signal) => call(signal));
      if (response === undefined) {
        this.failCommand(id, { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        return null;
      }
      if (!response.ok || !response.data) {
        this.failCommand(id, response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        return null;
      }
      return response.data;
    } catch (error) {
      this.failCommand(id, unexpectedError(error));
      return null;
    }
  }

  /** Redraws the open expense, its selection, the correction draft and the list row from a command output. A row that no longer matches the status filter leaves the list. */
  private applyCommandOutput(output: CommandOutput, insertIfMissing: boolean): void {
    this.publish('despesa', output.despesa);
    this.publish('selectedDespesa', output.despesa.id);
    this.publish('salvarCorrecaoDraft', draftFromDespesa(output.despesa));
    const current = this.despesas;
    if (current === null) return;
    const item = output.item;
    const belongs = this.status === null || item.status === this.status;
    const exists = current.items.some((row) => row.id === item.id);
    let items: DespesaResumo[] = current.items;
    if (!belongs) {
      items = current.items.filter((row) => row.id !== item.id);
    } else if (exists) {
      items = current.items.map((row) => (row.id === item.id ? item : row));
    } else if (insertIfMissing) {
      items = [item, ...current.items];
    }
    this.publish('despesas', { ...current, items });
  }

  /** setScenario — publishes the visible scene of the page (`scenary`); clears the results of the commands */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** setRegistrarDespesaDraft — replaces the draft of the new expense with the whole value typed in the form; clears the results of the commands */
  public setRegistrarDespesaDraft(value: RegistrarDespesaDraft): void {
    this.resetCommandResults();
    this.publish('registrarDespesaDraft', value);
  }

  /** setSalvarCorrecaoDraft — replaces the draft of the correction with the whole value typed in the form; clears the results of the commands */
  public setSalvarCorrecaoDraft(value: SalvarCorrecaoDraft): void {
    this.resetCommandResults();
    this.publish('salvarCorrecaoDraft', value);
  }

  /** request listarMinhasDespesas — loads the expenses of the logged collaborator (the onLoad request, also used to reload, filter by status and page the list); redraws despesas (replace, or append the next page to its items when append is true) and pageStatus; arguments: status = the status filter (null for every status, omitted for the current filter), page = the page to load (default 1; a new filter loads page 1), append = true for "load more" (does nothing when the list has no more pages; it never changes the page param) */
  public async listarMinhasDespesas(status: ExpenseStatus | null = this.status, page = 1, append = false): Promise<void> {
    if (this.listarMinhasDespesasStatus === 'loading') return;
    if (append && !(this.despesas && this.despesas.hasMore)) return;
    if (!append) {
      this.publish('status', status);
      this.publish('page', page);
    }
    this.publish('listarMinhasDespesasStatus', 'loading');
    this.publish('listarMinhasDespesasError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'reembolsoDespesas.minhas_despesas.listarMinhasDespesas'> = {
      page,
      pageSize: PAGE_SIZE,
      ...(status !== null ? { status } : {}),
    };
    try {
      const response = await execBff<Output<'reembolsoDespesas.minhas_despesas.listarMinhasDespesas'>>(
        'reembolsoDespesas.minhas_despesas.listarMinhasDespesas',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('listarMinhasDespesasError', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        this.publish('listarMinhasDespesasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.despesas;
      const next: DespesasPage =
        append && this.despesas
          ? { items: [...this.despesas.items, ...loaded.items], page: loaded.page, pageSize: loaded.pageSize, hasMore: loaded.hasMore }
          : loaded;
      this.publish('despesas', next);
      this.publish('listarMinhasDespesasStatus', 'success');
      this.publish('pageStatus', next.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarMinhasDespesasError', unexpectedError(error));
      this.publish('listarMinhasDespesasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request obterDespesa — selects an expense of the list: opens it with every field the detail, the correction form and the submit actions need; redraws selectedDespesa (the id) and despesa (replace, the record with its version) and fills salvarCorrecaoDraft from it; argument: id = the expense picked in the list, or null to clear the selection (no call) */
  public async obterDespesa(id: string | null): Promise<void> {
    if (id === null || id === '') {
      this.resetCommandResults();
      this.publish('selectedDespesa', null);
      this.publish('despesa', null);
      this.publish('salvarCorrecaoDraft', emptySalvarCorrecaoDraft());
      this.publish('obterDespesaError', null);
      this.publish('obterDespesaStatus', 'idle');
      return;
    }
    if (this.obterDespesaStatus === 'loading') return;
    this.resetCommandResults();
    this.publish('selectedDespesa', id);
    this.publish('obterDespesaStatus', 'loading');
    this.publish('obterDespesaError', null);
    try {
      const response = await execBff<Output<'reembolsoDespesas.minhas_despesas.obterDespesa'>>(
        'reembolsoDespesas.minhas_despesas.obterDespesa',
        { id },
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('despesa', null);
        this.publish('obterDespesaError', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        this.publish('obterDespesaStatus', 'error');
        return;
      }
      this.publish('despesa', response.data.despesa);
      this.publish('salvarCorrecaoDraft', draftFromDespesa(response.data.despesa));
      this.publish('obterDespesaStatus', 'success');
    } catch (error) {
      this.publish('obterDespesaError', unexpectedError(error));
      this.publish('obterDespesaStatus', 'error');
    }
  }

  /** request registrarDespesa — registers a new expense as a draft from registrarDespesaDraft (date, category, value and description are required); redraws despesa and selectedDespesa (the created expense opens in the detail), inserts the returned row at the top of despesas (when the status filter allows it), fills salvarCorrecaoDraft and resets registrarDespesaDraft; no arguments */
  public async registrarDespesa(): Promise<void> {
    const draft = this.registrarDespesaDraft;
    const { dataDespesa, categoria, valor, descricao } = draft.details;
    if (!dataDespesa || !categoria || !valor || !descricao) {
      this.failCommand('registrarDespesa', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: this.missingKeys('registrarDespesaDraft', draft.details) },
      });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.registrarDespesa'> = {
      colaboradorId: '',
      details: { dataDespesa, categoria, valor, descricao },
    };
    const output = await this.executeCommand('registrarDespesa', (signal) =>
      execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.registrarDespesa', input, { mode: 'blocking', signal }),
    );
    if (!output) return;
    this.applyCommandOutput(output, true);
    this.publish('registrarDespesaDraft', emptyRegistrarDespesaDraft());
    this.setCommandStatus('registrarDespesa', 'success');
  }

  /** request salvarCorrecao — saves the correction of the open rejected expense from salvarCorrecaoDraft (id and version come from `despesa`); redraws despesa, salvarCorrecaoDraft (filled again from the saved record) and updates the row in despesas; no arguments; refused with client.preconditionMissing when no expense is open */
  public async salvarCorrecao(): Promise<void> {
    const current = this.despesa;
    if (current === null) {
      this.failCommand('salvarCorrecao', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      return;
    }
    const draft = this.salvarCorrecaoDraft;
    const { dataDespesa, categoria, valor, descricao } = draft.details;
    if (!dataDespesa || !categoria || !valor || !descricao) {
      this.failCommand('salvarCorrecao', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: this.missingKeys('salvarCorrecaoDraft', draft.details) },
      });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.salvarCorrecao'> = {
      id: current.id,
      version: current.version,
      details: { dataDespesa, categoria, valor, descricao },
    };
    const output = await this.executeCommand('salvarCorrecao', (signal) =>
      execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.salvarCorrecao', input, { mode: 'blocking', signal }),
    );
    if (!output) return;
    this.applyCommandOutput(output, false);
    this.setCommandStatus('salvarCorrecao', 'success');
  }

  /** request enviarParaAprovacao — sends the open draft expense to the manager for approval (needs an attached proof); redraws despesa (new status and version) and updates the row in despesas; no arguments; refused with client.preconditionMissing when no expense is open */
  public async enviarParaAprovacao(): Promise<void> {
    const current = this.despesa;
    if (current === null) {
      this.failCommand('enviarParaAprovacao', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.enviarParaAprovacao'> = {
      id: current.id,
      version: current.version,
    };
    const output = await this.executeCommand('enviarParaAprovacao', (signal) =>
      execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.enviarParaAprovacao', input, { mode: 'blocking', signal }),
    );
    if (!output) return;
    this.applyCommandOutput(output, false);
    this.setCommandStatus('enviarParaAprovacao', 'success');
  }

  /** request reenviarParaAprovacao — resubmits, only once, the open rejected and corrected expense for a new analysis; redraws despesa (new status, resubmission marked, new version) and updates the row in despesas; no arguments; refused with client.preconditionMissing when no expense is open */
  public async reenviarParaAprovacao(): Promise<void> {
    const current = this.despesa;
    if (current === null) {
      this.failCommand('reenviarParaAprovacao', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      return;
    }
    const input: Input<'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao'> = {
      id: current.id,
      version: current.version,
    };
    const output = await this.executeCommand('reenviarParaAprovacao', (signal) =>
      execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.reenviarParaAprovacao', input, { mode: 'blocking', signal }),
    );
    if (!output) return;
    this.applyCommandOutput(output, false);
    this.setCommandStatus('reenviarParaAprovacao', 'success');
  }
}
