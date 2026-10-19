/// <mls fileReference="_102047_/l2/tarefas/web/shared/listas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { ListasContracts, ListaCadastrada, ListaDetalhes } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';

export type { ListasContracts, ListaCadastrada, ListaDetalhes } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';

type Input<R extends keyof ListasContracts> = ListasContracts[R]['input'];
type Output<R extends keyof ListasContracts> = ListasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

export type ListaTipo = 'project' | 'area';

/** Draft of the criarLista command input; every leaf is null until the person fills it. */
export type CriarListaDraft = {
  nome: string | null;
  details: { tipo: ListaTipo | null; descricao: string | null };
  ativa: boolean | null;
};

/** Draft of the salvarLista command input; id and version come from the selected record. */
export type SalvarListaDraft = {
  id: string | null;
  version: number | null;
  nome: string | null;
  details: { tipo: ListaTipo | null; descricao: string | null };
  ativa: boolean | null;
};

type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

type StateMember =
  | 'listas'
  | 'selectedLista'
  | 'busca'
  | 'criarListaDraft'
  | 'salvarListaDraft'
  | 'pageStatus'
  | 'listarListasStatus'
  | 'listarListasError'
  | 'buscarListasStatus'
  | 'buscarListasError'
  | 'criarListaStatus'
  | 'criarListaError'
  | 'salvarListaStatus'
  | 'salvarListaError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.listas.listas': 'listas',
  'ui.tarefas.listas.selectedLista': 'selectedLista',
  'ui.tarefas.listas.busca': 'busca',
  'ui.tarefas.listas.criarListaDraft': 'criarListaDraft',
  'ui.tarefas.listas.salvarListaDraft': 'salvarListaDraft',
  'ui.tarefas.listas.pageStatus': 'pageStatus',
  'ui.tarefas.listas.listarListasStatus': 'listarListasStatus',
  'ui.tarefas.listas.listarListasError': 'listarListasError',
  'ui.tarefas.listas.buscarListasStatus': 'buscarListasStatus',
  'ui.tarefas.listas.buscarListasError': 'buscarListasError',
  'ui.tarefas.listas.criarListaStatus': 'criarListaStatus',
  'ui.tarefas.listas.criarListaError': 'criarListaError',
  'ui.tarefas.listas.salvarListaStatus': 'salvarListaStatus',
  'ui.tarefas.listas.salvarListaError': 'salvarListaError',
  'ui.tarefas.listas.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

function emptyCriarListaDraft(): CriarListaDraft {
  return { nome: null, details: { tipo: null, descricao: null }, ativa: null };
}

function emptySalvarListaDraft(): SalvarListaDraft {
  return { id: null, version: null, nome: null, details: { tipo: null, descricao: null }, ativa: null };
}

function draftFromLista(lista: ListaCadastrada): SalvarListaDraft {
  return {
    id: lista.id,
    version: lista.version,
    nome: lista.nome,
    details: { tipo: lista.details.tipo, descricao: lista.details.descricao ?? null },
    ativa: lista.ativa,
  };
}

export class TarefasListasShared extends StateLitElement {
  /** state listas — the Listas de tarefas de um projeto ou área, with editable data, version and open task count; source listarListas.listas; organism formularioLista, listasCadastradas */
  @property({ attribute: false }) listas: ListaCadastrada[] = [];

  /** state selectedLista — the id of the Lista selected in listasCadastradas (null when none); source entry.params.listaId; organism formularioLista, listasCadastradas; lives in the URL */
  @property({ attribute: false }) selectedLista: string | null = null;

  /** state busca — the name fragment the manager typed to search the listas ('' returns all); source buscarListas.input (filter state added by the shared); organism listasCadastradas */
  @property({ attribute: false }) busca = '';

  /** state criarListaDraft — draft of the new lista being typed in formularioLista (nome, details.tipo, details.descricao, ativa; every leaf null until filled); source criarLista.input; organism formularioLista */
  @property({ attribute: false }) criarListaDraft: CriarListaDraft = emptyCriarListaDraft();

  /** state salvarListaDraft — draft of the selected lista being edited in formularioLista (id and version come from the record; filled when a lista is selected); source salvarLista.input; organism formularioLista */
  @property({ attribute: false }) salvarListaDraft: SalvarListaDraft = emptySalvarListaDraft();

  /** state pageStatus — overall status of the page: loading while the initial load runs, empty when there is no lista, error when it failed, success otherwise */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state listarListasStatus — status of the request listarListas (initial load and reload) */
  @property({ attribute: false }) listarListasStatus: RequestStatus = 'idle';

  /** state listarListasError — error of the request listarListas, null when none (also client.selectionInvalid when the listaId param matches no lista) */
  @property({ attribute: false }) listarListasError: ErrorState = null;

  /** state buscarListasStatus — status of the request buscarListas (search by name) */
  @property({ attribute: false }) buscarListasStatus: RequestStatus = 'idle';

  /** state buscarListasError — error of the request buscarListas, null when none */
  @property({ attribute: false }) buscarListasError: ErrorState = null;

  /** state criarListaStatus — status of the command criarLista; success stays until the person changes something */
  @property({ attribute: false }) criarListaStatus: RequestStatus = 'idle';

  /** state criarListaError — error of the command criarLista, null when none */
  @property({ attribute: false }) criarListaError: ErrorState = null;

  /** state salvarListaStatus — status of the command salvarLista; success stays until the person changes something */
  @property({ attribute: false }) salvarListaStatus: RequestStatus = 'idle';

  /** state salvarListaError — error of the command salvarLista, null when none */
  @property({ attribute: false }) salvarListaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private readonly onPopState = (): void => {
    if (window.location.pathname.endsWith('/tarefas/listas')) {
      this.startVisit();
    }
  };

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.listas.${member}`, value);
    if (member === 'selectedLista') {
      this.syncUrlParam(typeof value === 'string' ? value : null);
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  /** Keeps the url-only param listaId in the query without changing page. */
  private syncUrlParam(value: string | null): void {
    try {
      const url = new URL(window.location.href);
      if (value === null || value === '') {
        url.searchParams.delete('listaId');
      } else {
        url.searchParams.set('listaId', value);
      }
      history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    } catch {
      // the query is only a convenience; ignore failures
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const stored = getState('ui.tarefas.listas.listas');
    if (stored !== undefined) this.assignState('ui.tarefas.listas.listas', stored);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    this.applyEntryParams();
    void this.listarListas();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.onPopState);
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

  private startVisit(): void {
    this.resetVisit();
    this.applyEntryParams();
    void this.listarListas();
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('listarListasStatus', 'idle');
    this.publish('listarListasError', null);
    this.publish('buscarListasStatus', 'idle');
    this.publish('buscarListasError', null);
    this.publish('criarListaStatus', 'idle');
    this.publish('criarListaError', null);
    this.publish('salvarListaStatus', 'idle');
    this.publish('salvarListaError', null);
    this.publish('scenary', '');
    this.publish('busca', '');
    this.publish('criarListaDraft', emptyCriarListaDraft());
    this.publish('salvarListaDraft', emptySalvarListaDraft());
  }

  private resetCommandResults(): void {
    this.publish('criarListaStatus', 'idle');
    this.publish('criarListaError', null);
    this.publish('salvarListaStatus', 'idle');
    this.publish('salvarListaError', null);
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get('listaId');
    const id = raw !== null && raw !== '' ? raw : null;
    this.publish('selectedLista', id);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private upsertLista(lista: ListaCadastrada): void {
    const exists = this.listas.some(row => row.id === lista.id);
    const next = exists ? this.listas.map(row => (row.id === lista.id ? lista : row)) : [...this.listas, lista];
    this.publish('listas', next);
  }

  /** The selected lista record: the row of the loaded listas whose id is selectedLista, null when none. Feeds formularioLista. */
  public get formularioLista(): ListaCadastrada | null {
    if (this.selectedLista === null) return null;
    return this.listas.find(row => row.id === this.selectedLista) ?? null;
  }

  /** Fills the edit draft from the selected row, or publishes client.selectionInvalid when the id matches no loaded lista. */
  private syncSelection(): void {
    if (this.selectedLista === null) {
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      return;
    }
    const row = this.listas.find(item => item.id === this.selectedLista);
    if (!row) {
      this.publish('listarListasError', {
        code: 'client.selectionInvalid',
        message: '',
        details: { listaId: this.selectedLista },
      });
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      return;
    }
    this.publish('salvarListaDraft', draftFromLista(row));
  }

  /** select — chooses the lista to edit in formularioLista by its id (null clears the selection); fills salvarListaDraft from the loaded row; an id no loaded lista has publishes client.selectionInvalid in listarListasError */
  public selectLista(id: string | null): void {
    this.resetCommandResults();
    if (id === null || id === '') {
      this.publish('selectedLista', null);
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      return;
    }
    this.publish('selectedLista', id);
    this.publish('listarListasError', null);
    this.syncSelection();
  }

  /** draft — replaces the whole draft of a new lista (nome, details.tipo, details.descricao, ativa); the page sends the draft it edited */
  public setCriarListaDraft(value: CriarListaDraft): void {
    this.resetCommandResults();
    this.publish('criarListaDraft', value);
  }

  /** draft — replaces the whole draft of the lista being edited (id and version must stay those of the selected record); the page sends the draft it edited */
  public setSalvarListaDraft(value: SalvarListaDraft): void {
    this.resetCommandResults();
    this.publish('salvarListaDraft', value);
  }

  /** scene — publishes the visible scene of the page */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** request listarListas — loads every lista of the organization (active and inactive) with its open task count; redraws listas (replace), pageStatus, and the edit draft when a lista is selected; no arguments, also the method to reload the page */
  public async listarListas(): Promise<void> {
    if (this.listarListasStatus === 'loading') return;
    this.publish('listarListasStatus', 'loading');
    this.publish('listarListasError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'tarefas.listas.listarListas'> = {};
      const response = await execBff<Output<'tarefas.listas.listarListas'>>('tarefas.listas.listarListas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarListasError', response.error ?? this.unexpectedError(null));
        this.publish('listarListasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      this.publish('listas', response.data.listas);
      this.syncSelection();
      this.publish('listarListasStatus', 'success');
      this.publish('pageStatus', response.data.listas.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarListasError', this.unexpectedError(error));
      this.publish('listarListasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request buscarListas — searches the listas whose name contains the typed fragment ('' returns all); redraws listas (replace) and busca; argument busca is the name fragment */
  public async buscarListas(busca: string): Promise<void> {
    this.publish('busca', busca);
    if (this.buscarListasStatus === 'loading') return;
    this.publish('buscarListasStatus', 'loading');
    this.publish('buscarListasError', null);
    try {
      const input: Input<'tarefas.listas.buscarListas'> = { busca };
      const response = await execBff<Output<'tarefas.listas.buscarListas'>>('tarefas.listas.buscarListas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('buscarListasError', response.error ?? this.unexpectedError(null));
        this.publish('buscarListasStatus', 'error');
        return;
      }
      this.publish('listas', response.data.listas);
      this.publish('buscarListasStatus', 'success');
    } catch (error) {
      this.publish('buscarListasError', this.unexpectedError(error));
      this.publish('buscarListasStatus', 'error');
    }
  }

  /** request criarLista — registers a new lista of project or area from criarListaDraft (nome, details.tipo and ativa required; details.descricao optional); redraws listas (the created lista is inserted by id) and resets criarListaDraft to empty; no arguments */
  public async criarLista(): Promise<void> {
    if (this.criarListaStatus === 'loading') return;
    const draft = this.criarListaDraft;
    const nome = draft.nome;
    const tipo = draft.details.tipo;
    const ativa = draft.ativa;
    const missing: string[] = [];
    if (nome === null || nome === '') missing.push('ui.tarefas.listas.criarListaDraft.nome');
    if (tipo === null) missing.push('ui.tarefas.listas.criarListaDraft.details.tipo');
    if (ativa === null) missing.push('ui.tarefas.listas.criarListaDraft.ativa');
    if (nome === null || nome === '' || tipo === null || ativa === null) {
      this.publish('criarListaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.publish('criarListaStatus', 'error');
      return;
    }
    const descricao = draft.details.descricao;
    const input: Input<'tarefas.listas.criarLista'> = {
      nome,
      details: { tipo, ...(descricao !== null && descricao !== '' ? { descricao } : {}) },
      ativa,
    };
    this.publish('criarListaStatus', 'loading');
    this.publish('criarListaError', null);
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.listas.criarLista'>>('tarefas.listas.criarLista', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('criarListaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('criarListaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('criarListaError', response.error ?? this.unexpectedError(null));
        this.publish('criarListaStatus', 'error');
        return;
      }
      this.upsertLista(response.data.lista);
      this.publish('criarListaDraft', emptyCriarListaDraft());
      this.publish('criarListaStatus', 'success');
    } catch (error) {
      this.publish('criarListaError', this.unexpectedError(error));
      this.publish('criarListaStatus', 'error');
    }
  }

  /** request salvarLista — saves the changes of the selected lista from salvarListaDraft (id, version, nome and details.tipo and ativa required; details.descricao optional); redraws listas (the saved lista replaces its row by id, with the new version) and refills salvarListaDraft from the saved record; no arguments */
  public async salvarLista(): Promise<void> {
    if (this.salvarListaStatus === 'loading') return;
    const draft = this.salvarListaDraft;
    const id = draft.id;
    const version = draft.version;
    const nome = draft.nome;
    const tipo = draft.details.tipo;
    const ativa = draft.ativa;
    const missing: string[] = [];
    if (id === null || id === '') missing.push('ui.tarefas.listas.selectedLista');
    if (version === null) missing.push('ui.tarefas.listas.salvarListaDraft.version');
    if (nome === null || nome === '') missing.push('ui.tarefas.listas.salvarListaDraft.nome');
    if (tipo === null) missing.push('ui.tarefas.listas.salvarListaDraft.details.tipo');
    if (ativa === null) missing.push('ui.tarefas.listas.salvarListaDraft.ativa');
    if (id === null || id === '' || version === null || nome === null || nome === '' || tipo === null || ativa === null) {
      this.publish('salvarListaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.publish('salvarListaStatus', 'error');
      return;
    }
    const descricao = draft.details.descricao;
    const input: Input<'tarefas.listas.salvarLista'> = {
      id,
      version,
      nome,
      details: { tipo, ...(descricao !== null && descricao !== '' ? { descricao } : {}) },
      ativa,
    };
    this.publish('salvarListaStatus', 'loading');
    this.publish('salvarListaError', null);
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.listas.salvarLista'>>('tarefas.listas.salvarLista', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('salvarListaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('salvarListaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('salvarListaError', response.error ?? this.unexpectedError(null));
        this.publish('salvarListaStatus', 'error');
        return;
      }
      const lista = response.data.lista;
      this.upsertLista(lista);
      this.publish('salvarListaDraft', draftFromLista(lista));
      this.publish('salvarListaStatus', 'success');
    } catch (error) {
      this.publish('salvarListaError', this.unexpectedError(error));
      this.publish('salvarListaStatus', 'error');
    }
  }
}
