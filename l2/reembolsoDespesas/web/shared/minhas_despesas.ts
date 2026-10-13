/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import type { BffClientResponse } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Minhas_despesasContracts, DespesaLoad, DespesaRegistrarDespesa } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

export type { Minhas_despesasContracts, DespesaLoad, DespesaRegistrarDespesa } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

type Input<R extends keyof Minhas_despesasContracts> = Minhas_despesasContracts[R]['input'];
type Output<R extends keyof Minhas_despesasContracts> = Minhas_despesasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
type ListRequest = 'load' | 'loadMinhasDespesas';
type CommandName = 'registrarDespesa' | 'corrigirDespesa' | 'enviarParaAprovacao' | 'reenviarParaAprovacao';
type ListOutput = Output<'reembolsoDespesas.minhas_despesas.load'>;
type CommandOutput = Output<'reembolsoDespesas.minhas_despesas.registrarDespesa'>;
type DespesaDetailsInput = Input<'reembolsoDespesas.minhas_despesas.registrarDespesa'>['details'];

/** Draft of the expense form: the details of the write, every leaf null until typed. */
export type DespesaDraft = {
  details: {
    dataDespesa: string | null;
    categoria: string | null;
    valor: string | null;
    descricao: string | null;
  };
};

export function createEmptyDespesaDraft(): DespesaDraft {
  return {
    details: {
      dataDespesa: null,
      categoria: null,
      valor: null,
      descricao: null,
    },
  };
}

type StateMember =
  | 'minhasDespesas'
  | 'hasMoreListaMinhasDespesas'
  | 'colaboradorId'
  | 'page'
  | 'detalheDespesa'
  | 'registrarDespesaInput'
  | 'corrigirDespesaInput'
  | 'enviarParaAprovacaoInput'
  | 'reenviarParaAprovacaoInput'
  | 'pageStatus'
  | 'scenary'
  | 'loadStatus'
  | 'loadError'
  | 'loadMinhasDespesasStatus'
  | 'loadMinhasDespesasError'
  | 'registrarDespesaStatus'
  | 'registrarDespesaError'
  | 'corrigirDespesaStatus'
  | 'corrigirDespesaError'
  | 'enviarParaAprovacaoStatus'
  | 'enviarParaAprovacaoError'
  | 'reenviarParaAprovacaoStatus'
  | 'reenviarParaAprovacaoError';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.minhas_despesas.minhasDespesas': 'minhasDespesas',
  'ui.reembolsoDespesas.minhas_despesas.hasMoreListaMinhasDespesas': 'hasMoreListaMinhasDespesas',
  'ui.reembolsoDespesas.minhas_despesas.colaboradorId': 'colaboradorId',
  'ui.reembolsoDespesas.minhas_despesas.page': 'page',
  'ui.reembolsoDespesas.minhas_despesas.detalheDespesa': 'detalheDespesa',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaInput': 'registrarDespesaInput',
  'ui.reembolsoDespesas.minhas_despesas.corrigirDespesaInput': 'corrigirDespesaInput',
  'ui.reembolsoDespesas.minhas_despesas.enviarParaAprovacaoInput': 'enviarParaAprovacaoInput',
  'ui.reembolsoDespesas.minhas_despesas.reenviarParaAprovacaoInput': 'reenviarParaAprovacaoInput',
  'ui.reembolsoDespesas.minhas_despesas.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.minhas_despesas.scenary': 'scenary',
  'ui.reembolsoDespesas.minhas_despesas.loadStatus': 'loadStatus',
  'ui.reembolsoDespesas.minhas_despesas.loadError': 'loadError',
  'ui.reembolsoDespesas.minhas_despesas.loadMinhasDespesasStatus': 'loadMinhasDespesasStatus',
  'ui.reembolsoDespesas.minhas_despesas.loadMinhasDespesasError': 'loadMinhasDespesasError',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaStatus': 'registrarDespesaStatus',
  'ui.reembolsoDespesas.minhas_despesas.registrarDespesaError': 'registrarDespesaError',
  'ui.reembolsoDespesas.minhas_despesas.corrigirDespesaStatus': 'corrigirDespesaStatus',
  'ui.reembolsoDespesas.minhas_despesas.corrigirDespesaError': 'corrigirDespesaError',
  'ui.reembolsoDespesas.minhas_despesas.enviarParaAprovacaoStatus': 'enviarParaAprovacaoStatus',
  'ui.reembolsoDespesas.minhas_despesas.enviarParaAprovacaoError': 'enviarParaAprovacaoError',
  'ui.reembolsoDespesas.minhas_despesas.reenviarParaAprovacaoStatus': 'reenviarParaAprovacaoStatus',
  'ui.reembolsoDespesas.minhas_despesas.reenviarParaAprovacaoError': 'reenviarParaAprovacaoError',
};

const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PERSISTED_PARAM_BY_MEMBER: Partial<Record<StateMember, string>> = {
  detalheDespesa: 'despesaId',
  colaboradorId: 'colaboradorId',
  page: 'page',
};

const STORAGE_PREFIX = 'reembolsoDespesas.minhas_despesas.';
const PAGE_SIZE = 20;

export class ReembolsoDespesasMinhas_despesasShared extends StateLitElement {
  /** state minhasDespesas — paginated list of the collaborator's expenses; source load.minhasDespesas; organism listaMinhasDespesas */
  @property({ attribute: false }) minhasDespesas: DespesaLoad[] = [];

  /** state hasMoreListaMinhasDespesas — true when the backend said there is a next page of the expense list; source load (list paging metadata, added by the shared) */
  @property({ attribute: false }) hasMoreListaMinhasDespesas: boolean = false;

  /** state colaboradorId — id of the collaborator used to filter the expenses; source entry.params.colaboradorId; organism listaMinhasDespesas; persisted */
  @property({ attribute: false }) colaboradorId: string | null = null;

  /** state page — page of the expense list last requested/loaded; source entry.params.page; organism listaMinhasDespesas; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state detalheDespesa — id of the expense selected in the list for consulting, correcting or sending (the record is the getter detalheDespesaItem); source entry.params.despesaId; organism detalheDespesa; persisted */
  @property({ attribute: false }) detalheDespesa: string | null = null;

  /** state registrarDespesaInput — draft of the form that registers a new expense; source registrarDespesa.input; organism formularioDespesa */
  @property({ attribute: false }) registrarDespesaInput: DespesaDraft = createEmptyDespesaDraft();

  /** state corrigirDespesaInput — draft of the form that corrects the selected expense; source corrigirDespesa.input; organism formularioDespesa */
  @property({ attribute: false }) corrigirDespesaInput: DespesaDraft = createEmptyDespesaDraft();

  /** state enviarParaAprovacaoInput — draft of the expense data sent along when sending the selected expense for approval; source enviarParaAprovacao.input; organism formularioDespesa */
  @property({ attribute: false }) enviarParaAprovacaoInput: DespesaDraft = createEmptyDespesaDraft();

  /** state reenviarParaAprovacaoInput — draft of the expense data sent along when resubmitting the selected rejected expense; source reenviarParaAprovacao.input; organism formularioDespesa */
  @property({ attribute: false }) reenviarParaAprovacaoInput: DespesaDraft = createEmptyDespesaDraft();

  /** state pageStatus — overall status of the page: loading while the initial load runs, error if it failed, empty when the list is empty, success otherwise */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  /** state loadStatus — status of the initial load request */
  @property({ attribute: false }) loadStatus: RequestStatus = 'idle';

  /** state loadError — error of the initial load request (also receives client.selectionInvalid for an entry selection that matches no row) */
  @property({ attribute: false }) loadError: ErrorState = null;

  /** state loadMinhasDespesasStatus — status of the filter / next-page request of the expense list */
  @property({ attribute: false }) loadMinhasDespesasStatus: RequestStatus = 'idle';

  /** state loadMinhasDespesasError — error of the filter / next-page request (also receives client.selectionInvalid when a selected id matches no loaded row) */
  @property({ attribute: false }) loadMinhasDespesasError: ErrorState = null;

  /** state registrarDespesaStatus — status of the register-expense command */
  @property({ attribute: false }) registrarDespesaStatus: RequestStatus = 'idle';

  /** state registrarDespesaError — error of the register-expense command */
  @property({ attribute: false }) registrarDespesaError: ErrorState = null;

  /** state corrigirDespesaStatus — status of the correct-expense command */
  @property({ attribute: false }) corrigirDespesaStatus: RequestStatus = 'idle';

  /** state corrigirDespesaError — error of the correct-expense command */
  @property({ attribute: false }) corrigirDespesaError: ErrorState = null;

  /** state enviarParaAprovacaoStatus — status of the send-for-approval command */
  @property({ attribute: false }) enviarParaAprovacaoStatus: RequestStatus = 'idle';

  /** state enviarParaAprovacaoError — error of the send-for-approval command */
  @property({ attribute: false }) enviarParaAprovacaoError: ErrorState = null;

  /** state reenviarParaAprovacaoStatus — status of the resubmit-for-approval command */
  @property({ attribute: false }) reenviarParaAprovacaoStatus: RequestStatus = 'idle';

  /** state reenviarParaAprovacaoError — error of the resubmit-for-approval command */
  @property({ attribute: false }) reenviarParaAprovacaoError: ErrorState = null;

  private subscribed = false;

  private entrySelection: string | null = null;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.minhas_despesas.${member}`, value);
    const param = PERSISTED_PARAM_BY_MEMBER[member];
    if (param) {
      try {
        const storageKey = `${STORAGE_PREFIX}${param}`;
        if (value === null || value === undefined) {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, String(value));
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
      'ui.reembolsoDespesas.minhas_despesas.minhasDespesas',
      'ui.reembolsoDespesas.minhas_despesas.hasMoreListaMinhasDespesas',
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
    this.publish('loadMinhasDespesasStatus', 'idle');
    this.publish('loadMinhasDespesasError', null);
    this.publish('registrarDespesaInput', createEmptyDespesaDraft());
    this.publish('corrigirDespesaInput', createEmptyDespesaDraft());
    this.publish('enviarParaAprovacaoInput', createEmptyDespesaDraft());
    this.publish('reenviarParaAprovacaoInput', createEmptyDespesaDraft());
    this.resetCommandResults();
  }

  private resetCommandResults(): void {
    this.publish('registrarDespesaStatus', 'idle');
    this.publish('registrarDespesaError', null);
    this.publish('corrigirDespesaStatus', 'idle');
    this.publish('corrigirDespesaError', null);
    this.publish('enviarParaAprovacaoStatus', 'idle');
    this.publish('enviarParaAprovacaoError', null);
    this.publish('reenviarParaAprovacaoStatus', 'idle');
    this.publish('reenviarParaAprovacaoError', null);
  }

  private readParam(search: URLSearchParams, name: string): string | null {
    const fromUrl = search.get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private applyEntryParams(): void {
    const search = new URLSearchParams(window.location.search);
    this.publish('colaboradorId', this.readParam(search, 'colaboradorId'));
    const rawPage = this.readParam(search, 'page');
    let pageValue: number | null = null;
    if (rawPage !== null) {
      const converted = Number(rawPage);
      if (Number.isFinite(converted)) pageValue = converted;
    }
    this.publish('page', pageValue);
    const despesaId = this.readParam(search, 'despesaId');
    this.publish('detalheDespesa', despesaId);
    this.entrySelection = despesaId;
  }

  /** scene — publishes the visible scene of the page; resets every command result (status idle, error null). Argument: the scene name. */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the register-expense form (details of the new expense); resets command results. Argument: the whole draft. */
  public setRegistrarDespesaInput(value: DespesaDraft): void {
    this.resetCommandResults();
    this.publish('registrarDespesaInput', value);
  }

  /** draft — replaces the draft of the correct-expense form (details of the selected expense); resets command results. Argument: the whole draft. */
  public setCorrigirDespesaInput(value: DespesaDraft): void {
    this.resetCommandResults();
    this.publish('corrigirDespesaInput', value);
  }

  /** draft — replaces the draft of the data sent when sending the selected expense for approval; resets command results. Argument: the whole draft. */
  public setEnviarParaAprovacaoInput(value: DespesaDraft): void {
    this.resetCommandResults();
    this.publish('enviarParaAprovacaoInput', value);
  }

  /** draft — replaces the draft of the data sent when resubmitting the selected rejected expense; resets command results. Argument: the whole draft. */
  public setReenviarParaAprovacaoInput(value: DespesaDraft): void {
    this.resetCommandResults();
    this.publish('reenviarParaAprovacaoInput', value);
  }

  /** getter detalheDespesaItem — the selected expense record (the loaded row whose id is in detalheDespesa), or null when nothing is selected or the row is not loaded; organism detalheDespesa */
  public get detalheDespesaItem(): DespesaLoad | null {
    const id = this.detalheDespesa;
    if (id === null) return null;
    const row = this.minhasDespesas.find(item => item.id === id);
    return row === undefined ? null : row;
  }

  /** select — selects the expense to consult, correct or send, or clears the selection; redraws detalheDespesa (replace). Argument: the expense id from the loaded list, or null to clear. An id with no loaded row publishes client.selectionInvalid in loadMinhasDespesasError. */
  public selectDetalheDespesa(id: string | null): void {
    this.resetCommandResults();
    this.resolveSelection(id, 'loadMinhasDespesas');
  }

  private resolveSelection(id: string | null, which: ListRequest): void {
    if (id === null) {
      this.publish('detalheDespesa', null);
      return;
    }
    const found = this.minhasDespesas.some(item => item.id === id);
    if (found) {
      this.publish('detalheDespesa', id);
      return;
    }
    this.publish('detalheDespesa', null);
    this.setListError(which, { code: 'client.selectionInvalid', message: '', details: { stateKeys: ['detalheDespesa'] } });
  }

  private setListStatus(which: ListRequest, status: RequestStatus): void {
    if (which === 'load') {
      this.publish('loadStatus', status);
    } else {
      this.publish('loadMinhasDespesasStatus', status);
    }
  }

  private setListError(which: ListRequest, error: ErrorState): void {
    if (which === 'load') {
      this.publish('loadError', error);
    } else {
      this.publish('loadMinhasDespesasError', error);
    }
  }

  private listStatusOf(which: ListRequest): RequestStatus {
    return which === 'load' ? this.loadStatus : this.loadMinhasDespesasStatus;
  }

  private async runList(which: ListRequest, mode: 'replace' | 'append', page: number | null): Promise<boolean> {
    if (this.listStatusOf(which) === 'loading') return false;
    this.setListStatus(which, 'loading');
    this.setListError(which, null);
    try {
      const colaboradorId = this.colaboradorId;
      const input: Input<'reembolsoDespesas.minhas_despesas.load'> = {
        ...(colaboradorId !== null && colaboradorId !== '' ? { colaboradorId } : {}),
        ...(page !== null ? { page } : {}),
        pageSize: PAGE_SIZE,
      };
      const response = which === 'load'
        ? await execBff<ListOutput>('reembolsoDespesas.minhas_despesas.load', input, { mode: 'silent' })
        : await execBff<ListOutput>('reembolsoDespesas.minhas_despesas.loadMinhasDespesas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.setListError(which, response.error ?? { code: 'client.unexpected', message: '' });
        this.setListStatus(which, 'error');
        return false;
      }
      const output = response.data;
      const rows = mode === 'append' ? [...this.minhasDespesas, ...output.minhasDespesas] : [...output.minhasDespesas];
      this.publish('minhasDespesas', rows);
      this.publish('hasMoreListaMinhasDespesas', output.hasMoreListaMinhasDespesas);
      this.publish('page', output.pageListaMinhasDespesas);
      this.setListStatus(which, 'success');
      return true;
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.setListError(which, { code: 'client.unexpected', message: '', details: { name } });
      this.setListStatus(which, 'error');
      return false;
    }
  }

  /** function load — initial load of the collaborator's expenses (uses the entry filters colaboradorId and page); redraws minhasDespesas (replace), hasMoreListaMinhasDespesas and page, then applies the entry selection to detalheDespesa and sets pageStatus. No arguments. */
  public async load(): Promise<void> {
    if (this.loadStatus === 'loading') return;
    this.publish('pageStatus', 'loading');
    const ok = await this.runList('load', 'replace', this.page);
    if (!ok) {
      this.publish('pageStatus', 'error');
      return;
    }
    const pending = this.entrySelection;
    this.entrySelection = null;
    if (pending !== null) this.resolveSelection(pending, 'load');
    this.publish('pageStatus', this.minhasDespesas.length === 0 ? 'empty' : 'success');
  }

  /** function filterListaMinhasDespesas — reloads the first page of the expense list with the given filter; redraws colaboradorId (replace), minhasDespesas (replace), hasMoreListaMinhasDespesas and page. Argument: the collaborator id to filter by, or null/'' for no filter. */
  public async filterListaMinhasDespesas(colaboradorId: string | null): Promise<void> {
    this.resetCommandResults();
    this.publish('colaboradorId', colaboradorId !== null && colaboradorId !== '' ? colaboradorId : null);
    await this.runList('loadMinhasDespesas', 'replace', 1);
  }

  /** function loadMoreListaMinhasDespesas — appends the next page of expenses to the list, keeping the current filter; does nothing unless hasMoreListaMinhasDespesas is true; redraws minhasDespesas (append), hasMoreListaMinhasDespesas and page. No arguments. */
  public async loadMoreListaMinhasDespesas(): Promise<void> {
    if (!this.hasMoreListaMinhasDespesas) return;
    if (this.loadMinhasDespesasStatus === 'loading') return;
    const next = (this.page ?? 1) + 1;
    await this.runList('loadMinhasDespesas', 'append', next);
  }

  private commandStatusOf(name: CommandName): RequestStatus {
    switch (name) {
      case 'registrarDespesa':
        return this.registrarDespesaStatus;
      case 'corrigirDespesa':
        return this.corrigirDespesaStatus;
      case 'enviarParaAprovacao':
        return this.enviarParaAprovacaoStatus;
      default:
        return this.reenviarParaAprovacaoStatus;
    }
  }

  private setCommandStatus(name: CommandName, status: RequestStatus): void {
    switch (name) {
      case 'registrarDespesa':
        this.publish('registrarDespesaStatus', status);
        break;
      case 'corrigirDespesa':
        this.publish('corrigirDespesaStatus', status);
        break;
      case 'enviarParaAprovacao':
        this.publish('enviarParaAprovacaoStatus', status);
        break;
      default:
        this.publish('reenviarParaAprovacaoStatus', status);
        break;
    }
  }

  private setCommandError(name: CommandName, error: ErrorState): void {
    switch (name) {
      case 'registrarDespesa':
        this.publish('registrarDespesaError', error);
        break;
      case 'corrigirDespesa':
        this.publish('corrigirDespesaError', error);
        break;
      case 'enviarParaAprovacao':
        this.publish('enviarParaAprovacaoError', error);
        break;
      default:
        this.publish('reenviarParaAprovacaoError', error);
        break;
    }
  }

  private draftOf(name: CommandName): DespesaDraft {
    switch (name) {
      case 'registrarDespesa':
        return this.registrarDespesaInput;
      case 'corrigirDespesa':
        return this.corrigirDespesaInput;
      case 'enviarParaAprovacao':
        return this.enviarParaAprovacaoInput;
      default:
        return this.reenviarParaAprovacaoInput;
    }
  }

  private clearDraft(name: CommandName): void {
    switch (name) {
      case 'registrarDespesa':
        this.publish('registrarDespesaInput', createEmptyDespesaDraft());
        break;
      case 'corrigirDespesa':
        this.publish('corrigirDespesaInput', createEmptyDespesaDraft());
        break;
      case 'enviarParaAprovacao':
        this.publish('enviarParaAprovacaoInput', createEmptyDespesaDraft());
        break;
      default:
        this.publish('reenviarParaAprovacaoInput', createEmptyDespesaDraft());
        break;
    }
  }

  private collectDetails(draft: DespesaDraft, stateId: string): { details: DespesaDetailsInput | null; missing: string[] } {
    const missing: string[] = [];
    const { dataDespesa, categoria, valor, descricao } = draft.details;
    if (dataDespesa === null || dataDespesa.trim() === '') missing.push(`${stateId}.details.dataDespesa`);
    if (categoria === null || categoria.trim() === '') missing.push(`${stateId}.details.categoria`);
    if (valor === null || valor.trim() === '') missing.push(`${stateId}.details.valor`);
    if (descricao === null || descricao.trim() === '') missing.push(`${stateId}.details.descricao`);
    if (dataDespesa === null || categoria === null || valor === null || descricao === null || missing.length > 0) {
      return { details: null, missing };
    }
    return { details: { dataDespesa, categoria, valor, descricao }, missing };
  }

  private upsertDespesa(despesa: DespesaRegistrarDespesa): DespesaLoad[] {
    const exists = this.minhasDespesas.some(row => row.id === despesa.id);
    if (exists) {
      return this.minhasDespesas.map(row => {
        if (row.id !== despesa.id) return row;
        return { ...row, version: despesa.version, details: { ...row.details, ...despesa.details } };
      });
    }
    const created: DespesaLoad = {
      id: despesa.id,
      version: despesa.version,
      status: 'draft',
      details: { ...despesa.details, reenvioRealizado: false },
    };
    return [created, ...this.minhasDespesas];
  }

  private async runCommand(name: CommandName): Promise<void> {
    if (this.commandStatusOf(name) === 'loading') return;
    const stateId = `${name}Input`;
    const { details, missing } = this.collectDetails(this.draftOf(name), stateId);
    const colaboradorId = this.colaboradorId;
    if (colaboradorId === null || colaboradorId === '') missing.push('colaboradorId');
    if (details === null || colaboradorId === null || colaboradorId === '' || missing.length > 0) {
      this.setCommandError(name, { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.setCommandStatus(name, 'error');
      return;
    }
    const row = this.detalheDespesaItem;
    if (name !== 'registrarDespesa' && row === null) {
      this.setCommandError(name, { code: 'client.selectionInvalid', message: '', details: { stateKeys: ['detalheDespesa'] } });
      this.setCommandStatus(name, 'error');
      return;
    }
    const id = row !== null ? row.id : '';
    const version = row !== null ? row.version : 0;
    this.setCommandStatus(name, 'loading');
    this.setCommandError(name, null);
    try {
      const response = await runBlockingUiAction((signal): Promise<BffClientResponse<CommandOutput>> => {
        switch (name) {
          case 'registrarDespesa':
            return execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.registrarDespesa', { details, colaboradorId }, { mode: 'blocking', signal });
          case 'corrigirDespesa':
            return execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.corrigirDespesa', { details, colaboradorId, id, version }, { mode: 'blocking', signal });
          case 'enviarParaAprovacao':
            return execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.enviarParaAprovacao', { details, colaboradorId, id, version }, { mode: 'blocking', signal });
          default:
            return execBff<CommandOutput>('reembolsoDespesas.minhas_despesas.reenviarParaAprovacao', { details, colaboradorId, id, version }, { mode: 'blocking', signal });
        }
      });
      if (response === undefined) {
        this.setCommandError(name, { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.setCommandStatus(name, 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.setCommandError(name, response.error ?? { code: 'client.unexpected', message: '' });
        this.setCommandStatus(name, 'error');
        return;
      }
      const despesa = response.data.despesa;
      this.publish('minhasDespesas', this.upsertDespesa(despesa));
      this.publish('detalheDespesa', despesa.id);
      this.clearDraft(name);
      this.setCommandStatus(name, 'success');
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'unknown';
      this.setCommandError(name, { code: 'client.unexpected', message: '', details: { name: errorName } });
      this.setCommandStatus(name, 'error');
    }
  }

  /** function registrarDespesa — registers a new expense from the registrarDespesaInput draft (date, category, amount, description) for the collaborator in colaboradorId; redraws minhasDespesas (upsert of the returned expense), detalheDespesa (replace, selects the new expense) and clears the draft; result in registrarDespesaStatus/Error. No arguments. */
  public async registrarDespesa(): Promise<void> {
    await this.runCommand('registrarDespesa');
  }

  /** function corrigirDespesa — corrects the selected expense (detalheDespesa) with the corrigirDespesaInput draft; redraws minhasDespesas (upsert of the returned expense), detalheDespesa (replace) and clears the draft; result in corrigirDespesaStatus/Error. No arguments; requires a selected expense. */
  public async corrigirDespesa(): Promise<void> {
    await this.runCommand('corrigirDespesa');
  }

  /** function enviarParaAprovacao — sends the selected registered expense (detalheDespesa) for approval with the enviarParaAprovacaoInput draft; redraws minhasDespesas (upsert of the returned expense), detalheDespesa (replace) and clears the draft; result in enviarParaAprovacaoStatus/Error. No arguments; requires a selected expense. */
  public async enviarParaAprovacao(): Promise<void> {
    await this.runCommand('enviarParaAprovacao');
  }

  /** function reenviarParaAprovacao — resubmits the selected rejected expense (detalheDespesa) for approval with the reenviarParaAprovacaoInput draft; redraws minhasDespesas (upsert of the returned expense), detalheDespesa (replace) and clears the draft; result in reenviarParaAprovacaoStatus/Error. No arguments; requires a selected expense. */
  public async reenviarParaAprovacao(): Promise<void> {
    await this.runCommand('reenviarParaAprovacao');
  }
}
