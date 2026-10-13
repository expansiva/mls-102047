/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Despesas_da_equipeContracts, DespesaLoad, ColaboradorLoad, DespesaApproveExpense } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.js';

export type { Despesas_da_equipeContracts, DespesaLoad, ColaboradorLoad, DespesaApproveExpense } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.js';

type Input<R extends keyof Despesas_da_equipeContracts> = Despesas_da_equipeContracts[R]['input'];
type Output<R extends keyof Despesas_da_equipeContracts> = Despesas_da_equipeContracts[R]['output'];

type RouteLoad = 'reembolsoDespesas.despesas_da_equipe.load';
type RouteLoadDespesas = 'reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipe';
type RouteApprove = 'reembolsoDespesas.despesas_da_equipe.approveExpense';
type RouteReject = 'reembolsoDespesas.despesas_da_equipe.rejectExpense';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** Draft of the approve/reject decision input; every leaf is null until filled. */
export type DecisionDraft = {
  details: { motivoRejeicao: string | null };
  colaboradorId: string | null;
  id: string | null;
  version: number | null;
};
export type ApproveExpenseDraft = DecisionDraft;
export type RejectExpenseDraft = DecisionDraft;

function emptyDecisionDraft(): DecisionDraft {
  return { details: { motivoRejeicao: null }, colaboradorId: null, id: null, version: null };
}

type StateMember =
  | 'despesasDaEquipe'
  | 'colaborador'
  | 'despesaSelecionada'
  | 'colaboradorId'
  | 'page'
  | 'pageSizePendingTeamExpenses'
  | 'hasMorePendingTeamExpenses'
  | 'approveExpenseInput'
  | 'rejectExpenseInput'
  | 'pageStatus'
  | 'loadStatus'
  | 'loadError'
  | 'loadDespesasDaEquipeStatus'
  | 'loadDespesasDaEquipeError'
  | 'approveExpenseStatus'
  | 'approveExpenseError'
  | 'rejectExpenseStatus'
  | 'rejectExpenseError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.despesas_da_equipe.despesasDaEquipe': 'despesasDaEquipe',
  'ui.reembolsoDespesas.despesas_da_equipe.colaborador': 'colaborador',
  'ui.reembolsoDespesas.despesas_da_equipe.despesaSelecionada': 'despesaSelecionada',
  'ui.reembolsoDespesas.despesas_da_equipe.colaboradorId': 'colaboradorId',
  'ui.reembolsoDespesas.despesas_da_equipe.page': 'page',
  'ui.reembolsoDespesas.despesas_da_equipe.pageSizePendingTeamExpenses': 'pageSizePendingTeamExpenses',
  'ui.reembolsoDespesas.despesas_da_equipe.hasMorePendingTeamExpenses': 'hasMorePendingTeamExpenses',
  'ui.reembolsoDespesas.despesas_da_equipe.approveExpenseInput': 'approveExpenseInput',
  'ui.reembolsoDespesas.despesas_da_equipe.rejectExpenseInput': 'rejectExpenseInput',
  'ui.reembolsoDespesas.despesas_da_equipe.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.loadStatus': 'loadStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.loadError': 'loadError',
  'ui.reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipeStatus': 'loadDespesasDaEquipeStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipeError': 'loadDespesasDaEquipeError',
  'ui.reembolsoDespesas.despesas_da_equipe.approveExpenseStatus': 'approveExpenseStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.approveExpenseError': 'approveExpenseError',
  'ui.reembolsoDespesas.despesas_da_equipe.rejectExpenseStatus': 'rejectExpenseStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.rejectExpenseError': 'rejectExpenseError',
  'ui.reembolsoDespesas.despesas_da_equipe.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

// persisted entry params: member -> localStorage key
const PERSIST_KEY_BY_MEMBER: Partial<Record<StateMember, string>> = {
  despesaSelecionada: 'reembolsoDespesas.despesas_da_equipe.despesaId',
  colaboradorId: 'reembolsoDespesas.despesas_da_equipe.colaboradorId',
  page: 'reembolsoDespesas.despesas_da_equipe.page',
};

const DEFAULT_PAGE_SIZE = 20;

export class ReembolsoDespesasDespesas_da_equipeShared extends StateLitElement {
  /** state despesasDaEquipe — pending expenses of the team (already filtered and paged by the backend); source load.despesasDaEquipe; organism pendingTeamExpenses */
  @property({ attribute: false }) despesasDaEquipe: DespesaLoad[] = [];

  /** state colaborador — collaborators of the team expenses, to show who owns the selected expense; source load.colaborador; organism expenseReview */
  @property({ attribute: false }) colaborador: ColaboradorLoad[] = [];

  /** state despesaSelecionada — id of the expense selected for review (null when none); the record is read through the expenseReview getter; source entry.params.despesaId; organism expenseReview; persisted */
  @property({ attribute: false }) despesaSelecionada: string | null = null;

  /** state colaboradorId — collaborator filter of the pending list (null when no filter); source entry.params.colaboradorId; organism pendingTeamExpenses; persisted */
  @property({ attribute: false }) colaboradorId: string | null = null;

  /** state page — current page of the pending expenses list (null until known); source entry.params.page; organism pendingTeamExpenses; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state pageSizePendingTeamExpenses — page size used by the pending expenses list; source load.pageSizePendingTeamExpenses */
  @property({ attribute: false }) pageSizePendingTeamExpenses: number = DEFAULT_PAGE_SIZE;

  /** state hasMorePendingTeamExpenses — true when the backend says there is a next page of pending expenses; source load.hasMorePendingTeamExpenses */
  @property({ attribute: false }) hasMorePendingTeamExpenses: boolean = false;

  /** state approveExpenseInput — draft of the approve decision (reason leaf; id, collaborator and version are taken from the selected expense when null); source approveExpense.input; organism approvalDecision */
  @property({ attribute: false }) approveExpenseInput: ApproveExpenseDraft = emptyDecisionDraft();

  /** state rejectExpenseInput — draft of the reject decision (the rejection reason is required; id, collaborator and version are taken from the selected expense when null); source rejectExpense.input; organism approvalDecision */
  @property({ attribute: false }) rejectExpenseInput: RejectExpenseDraft = emptyDecisionDraft();

  /** state pageStatus — overall status of the page load: idle, loading, empty, success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state loadStatus — status of the initial load request */
  @property({ attribute: false }) loadStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state loadError — error of the initial load request (also client.selectionInvalid when the selected id resolves to no loaded row); null when none */
  @property({ attribute: false }) loadError: ErrorState = null;

  /** state loadDespesasDaEquipeStatus — status of the filter / next page request of the pending list */
  @property({ attribute: false }) loadDespesasDaEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state loadDespesasDaEquipeError — error of the filter / next page request; null when none */
  @property({ attribute: false }) loadDespesasDaEquipeError: ErrorState = null;

  /** state approveExpenseStatus — status of the approve command */
  @property({ attribute: false }) approveExpenseStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state approveExpenseError — error of the approve command; null when none */
  @property({ attribute: false }) approveExpenseError: ErrorState = null;

  /** state rejectExpenseStatus — status of the reject command */
  @property({ attribute: false }) rejectExpenseStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state rejectExpenseError — error of the reject command; null when none */
  @property({ attribute: false }) rejectExpenseError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.despesas_da_equipe.${member}`, value);
    const persistKey = PERSIST_KEY_BY_MEMBER[member];
    if (persistKey) {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem(persistKey);
        } else {
          localStorage.setItem(persistKey, String(value));
        }
      } catch {
        // storage unavailable: the state still lives in memory
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  /** getter expenseReview — the selected expense record: the loaded row whose id is despesaSelecionada, or null */
  public get expenseReview(): DespesaLoad | null {
    if (this.despesaSelecionada === null) return null;
    return this.despesasDaEquipe.find(row => row.id === this.despesaSelecionada) ?? null;
  }

  /** getter expenseReviewColaborador — the collaborator of the selected expense (the loaded collaborator whose id is the expense colaboradorId), or null */
  public get expenseReviewColaborador(): ColaboradorLoad | null {
    const selected = this.expenseReview;
    if (!selected) return null;
    return this.colaborador.find(row => row.id === selected.colaboradorId) ?? null;
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
    void this.load();
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
    const dataKeys = [
      'ui.reembolsoDespesas.despesas_da_equipe.despesasDaEquipe',
      'ui.reembolsoDespesas.despesas_da_equipe.colaborador',
      'ui.reembolsoDespesas.despesas_da_equipe.pageSizePendingTeamExpenses',
      'ui.reembolsoDespesas.despesas_da_equipe.hasMorePendingTeamExpenses',
    ];
    for (const key of dataKeys) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('loadStatus', 'idle');
    this.publish('loadError', null);
    this.publish('loadDespesasDaEquipeStatus', 'idle');
    this.publish('loadDespesasDaEquipeError', null);
    this.publish('approveExpenseStatus', 'idle');
    this.publish('approveExpenseError', null);
    this.publish('rejectExpenseStatus', 'idle');
    this.publish('rejectExpenseError', null);
    this.publish('approveExpenseInput', emptyDecisionDraft());
    this.publish('rejectExpenseInput', emptyDecisionDraft());
  }

  private resetCommandResults(): void {
    this.publish('approveExpenseStatus', 'idle');
    this.publish('approveExpenseError', null);
    this.publish('rejectExpenseStatus', 'idle');
    this.publish('rejectExpenseError', null);
  }

  private readParam(name: string): string | null {
    let raw: string | null = new URLSearchParams(window.location.search).get(name);
    if (raw === null) {
      try {
        raw = localStorage.getItem(`reembolsoDespesas.despesas_da_equipe.${name}`);
      } catch {
        raw = null;
      }
    }
    return raw === null || raw === '' ? null : raw;
  }

  private applyEntryParams(): void {
    this.publish('colaboradorId', this.readParam('colaboradorId'));
    const rawPage = this.readParam('page');
    const pageNumber = rawPage === null ? Number.NaN : Number(rawPage);
    this.publish('page', Number.isFinite(pageNumber) ? pageNumber : null);
    this.publish('despesaSelecionada', this.readParam('despesaId'));
  }

  private unexpected(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private finishPageStatus(): void {
    if (this.loadStatus === 'error') {
      this.publish('pageStatus', 'error');
      return;
    }
    if (this.despesasDaEquipe.length === 0 && this.colaborador.length === 0) {
      this.publish('pageStatus', 'empty');
      return;
    }
    this.publish('pageStatus', 'success');
  }

  /** setScenario — publishes the visible scene of the page; redraws scenary (replace); value is the scene id ('' for none) */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the approve decision draft; redraws approveExpenseInput (replace); value is the whole draft (only details.motivoRejeicao is typed by the person) */
  public setApproveExpenseInput(value: ApproveExpenseDraft): void {
    this.resetCommandResults();
    this.publish('approveExpenseInput', value);
  }

  /** draft — replaces the reject decision draft; redraws rejectExpenseInput (replace); value is the whole draft (details.motivoRejeicao is the required rejection reason) */
  public setRejectExpenseInput(value: RejectExpenseDraft): void {
    this.resetCommandResults();
    this.publish('rejectExpenseInput', value);
  }

  /** select — selects the expense to review (organism expenseReview); redraws despesaSelecionada (replace) and, when the id resolves to no loaded row, loadError with client.selectionInvalid; id is the expense id or null to clear the selection; read the record through the expenseReview getter */
  public selectExpenseReview(id: string | null): void {
    this.resetCommandResults();
    this.publish('despesaSelecionada', id);
    if (id !== null && !this.despesasDaEquipe.some(row => row.id === id)) {
      this.publish('loadError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('loadStatus', 'error');
    }
  }

  /** function load — loads the pending expenses of the team and the collaborators of the expenses, using the current colaboradorId filter and page; redraws despesasDaEquipe (replace), colaborador (replace), page, pageSizePendingTeamExpenses and hasMorePendingTeamExpenses; no arguments; runs on page entry */
  public async load(): Promise<void> {
    if (this.loadStatus === 'loading') return;
    this.publish('loadStatus', 'loading');
    this.publish('loadError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<RouteLoad> = {
        ...(this.colaboradorId !== null && this.colaboradorId !== '' ? { colaboradorId: this.colaboradorId } : {}),
        ...(this.page !== null ? { page: this.page } : {}),
        pageSize: this.pageSizePendingTeamExpenses,
      };
      const response = await execBff<Output<RouteLoad>>('reembolsoDespesas.despesas_da_equipe.load', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('loadError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('loadStatus', 'error');
        this.finishPageStatus();
        return;
      }
      const output = response.data;
      this.publish('despesasDaEquipe', output.despesasDaEquipe);
      this.publish('colaborador', output.colaborador);
      this.publish('page', output.pagePendingTeamExpenses);
      this.publish('pageSizePendingTeamExpenses', output.pageSizePendingTeamExpenses);
      this.publish('hasMorePendingTeamExpenses', output.hasMorePendingTeamExpenses);
      this.publish('loadStatus', 'success');
      if (this.despesaSelecionada !== null && this.expenseReview === null) {
        this.publish('loadError', { code: 'client.selectionInvalid', message: '', details: { id: this.despesaSelecionada } });
        this.publish('loadStatus', 'error');
      }
      this.finishPageStatus();
    } catch (error) {
      this.publish('loadError', this.unexpected(error));
      this.publish('loadStatus', 'error');
      this.finishPageStatus();
    }
  }

  private async runLoadDespesas(mode: 'replace' | 'append', page: number): Promise<void> {
    if (this.loadDespesasDaEquipeStatus === 'loading') return;
    this.publish('loadDespesasDaEquipeStatus', 'loading');
    this.publish('loadDespesasDaEquipeError', null);
    try {
      const input: Input<RouteLoadDespesas> = {
        ...(this.colaboradorId !== null && this.colaboradorId !== '' ? { colaboradorId: this.colaboradorId } : {}),
        page,
        pageSize: this.pageSizePendingTeamExpenses,
      };
      const response = await execBff<Output<RouteLoadDespesas>>('reembolsoDespesas.despesas_da_equipe.loadDespesasDaEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('loadDespesasDaEquipeError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('loadDespesasDaEquipeStatus', 'error');
        return;
      }
      const output = response.data;
      this.publish('despesasDaEquipe', mode === 'append' ? [...this.despesasDaEquipe, ...output.despesasDaEquipe] : output.despesasDaEquipe);
      this.publish('page', output.pagePendingTeamExpenses);
      this.publish('pageSizePendingTeamExpenses', output.pageSizePendingTeamExpenses);
      this.publish('hasMorePendingTeamExpenses', output.hasMorePendingTeamExpenses);
      this.publish('loadDespesasDaEquipeStatus', 'success');
    } catch (error) {
      this.publish('loadDespesasDaEquipeError', this.unexpected(error));
      this.publish('loadDespesasDaEquipeStatus', 'error');
    }
  }

  /** function filterPendingTeamExpenses — filters the pending team expenses by collaborator and reloads from the first page; redraws colaboradorId and page (replace) and despesasDaEquipe (replace), pageSizePendingTeamExpenses, hasMorePendingTeamExpenses; colaboradorId is the collaborator id to filter by, or null to clear the filter */
  public async filterPendingTeamExpenses(colaboradorId: string | null): Promise<void> {
    if (this.loadDespesasDaEquipeStatus === 'loading') return;
    this.publish('colaboradorId', colaboradorId === '' ? null : colaboradorId);
    this.publish('page', 1);
    await this.runLoadDespesas('replace', 1);
  }

  /** function loadMorePendingTeamExpenses — loads the next page of pending team expenses with the current filter; does nothing when hasMorePendingTeamExpenses is false; redraws despesasDaEquipe (append), page and hasMorePendingTeamExpenses; no arguments */
  public async loadMorePendingTeamExpenses(): Promise<void> {
    if (!this.hasMorePendingTeamExpenses) return;
    await this.runLoadDespesas('append', (this.page ?? 1) + 1);
  }

  private buildDecisionInput(
    draft: DecisionDraft,
    draftKey: string,
    requireReason: boolean,
  ): { input: Input<RouteApprove> | null; error: ErrorState } {
    const selected = this.expenseReview;
    if (!selected) {
      return { input: null, error: { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesaSelecionada'] } } };
    }
    const motivoRejeicao = draft.details.motivoRejeicao ?? '';
    if (requireReason && motivoRejeicao.trim() === '') {
      return { input: null, error: { code: 'client.requiredMissing', message: '', details: { stateKeys: [`${draftKey}.details.motivoRejeicao`] } } };
    }
    return {
      input: {
        details: { motivoRejeicao },
        colaboradorId: draft.colaboradorId ?? selected.colaboradorId,
        id: draft.id ?? selected.id,
        version: draft.version ?? selected.version,
      },
      error: null,
    };
  }

  // the decided expense leaves the pending list and the selection is cleared
  private applyDecision(despesa: DespesaApproveExpense): void {
    this.publish('despesasDaEquipe', this.despesasDaEquipe.filter(row => row.id !== despesa.id));
    if (this.despesaSelecionada === despesa.id) {
      this.publish('despesaSelecionada', null);
    }
  }

  /** function approveExpense — approves the selected expense for payment (form approveExpense, organism approvalDecision); redraws despesasDaEquipe (remove: the decided expense leaves the pending list) and despesaSelecionada (cleared); reads id, collaborator and version from the selected expense and details from approveExpenseInput; no arguments; error client.preconditionMissing when nothing is selected */
  public async approveExpense(): Promise<void> {
    if (this.approveExpenseStatus === 'loading') return;
    this.publish('approveExpenseError', null);
    const built = this.buildDecisionInput(this.approveExpenseInput, 'approveExpenseInput', false);
    const input = built.input;
    if (!input) {
      this.publish('approveExpenseError', built.error);
      this.publish('approveExpenseStatus', 'error');
      return;
    }
    this.publish('approveExpenseStatus', 'loading');
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<RouteApprove>>('reembolsoDespesas.despesas_da_equipe.approveExpense', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('approveExpenseError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('approveExpenseStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('approveExpenseError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('approveExpenseStatus', 'error');
        return;
      }
      this.applyDecision(response.data.despesa);
      this.publish('approveExpenseInput', emptyDecisionDraft());
      this.publish('rejectExpenseInput', emptyDecisionDraft());
      this.publish('approveExpenseStatus', 'success');
    } catch (error) {
      this.publish('approveExpenseError', this.unexpected(error));
      this.publish('approveExpenseStatus', 'error');
    }
  }

  /** function rejectExpense — rejects the selected expense recording the reason (form rejectExpense, organism approvalDecision); redraws despesasDaEquipe (remove: the decided expense leaves the pending list) and despesaSelecionada (cleared); reads id, collaborator and version from the selected expense and the required reason from rejectExpenseInput.details.motivoRejeicao; no arguments; error client.requiredMissing when the reason is empty, client.preconditionMissing when nothing is selected */
  public async rejectExpense(): Promise<void> {
    if (this.rejectExpenseStatus === 'loading') return;
    this.publish('rejectExpenseError', null);
    const built = this.buildDecisionInput(this.rejectExpenseInput, 'rejectExpenseInput', true);
    const input = built.input;
    if (!input) {
      this.publish('rejectExpenseError', built.error);
      this.publish('rejectExpenseStatus', 'error');
      return;
    }
    this.publish('rejectExpenseStatus', 'loading');
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<RouteReject>>('reembolsoDespesas.despesas_da_equipe.rejectExpense', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('rejectExpenseError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('rejectExpenseStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('rejectExpenseError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('rejectExpenseStatus', 'error');
        return;
      }
      this.applyDecision(response.data.despesa);
      this.publish('approveExpenseInput', emptyDecisionDraft());
      this.publish('rejectExpenseInput', emptyDecisionDraft());
      this.publish('rejectExpenseStatus', 'success');
    } catch (error) {
      this.publish('rejectExpenseError', this.unexpected(error));
      this.publish('rejectExpenseStatus', 'error');
    }
  }
}
