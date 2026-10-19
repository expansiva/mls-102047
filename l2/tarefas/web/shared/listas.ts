/// <mls fileReference="_102047_/l2/tarefas/web/shared/listas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { ListasContracts, ListaCadastrada } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';

export type { ListasContracts, ListaCadastrada, ListaDetalhes } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';

type Input<R extends keyof ListasContracts> = ListasContracts[R]['input'];
type Output<R extends keyof ListasContracts> = ListasContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type ListaTipo = 'project' | 'area';

/** Draft of the new lista form (input of criarLista); every leaf is null until the person fills it. */
export type CriarListaDraft = {
  nome: string | null;
  details: { tipo: ListaTipo | null; descricao: string | null };
  ativa: boolean | null;
};

/** Draft of the lista edit form (input of salvarLista); id and version come from the selected record. */
export type SalvarListaDraft = {
  id: string | null;
  version: number | null;
  nome: string | null;
  details: { tipo: ListaTipo | null; descricao: string | null };
  ativa: boolean | null;
};

function emptyCriarListaDraft(): CriarListaDraft {
  return { nome: null, details: { tipo: null, descricao: null }, ativa: true };
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

export class TarefasListasShared extends StateLitElement {
  /** state listas — the list of Lista de tarefas de um projeto ou área, com seus dados editáveis, versão e a quantidade de tarefas abertas; source listarListas.listas; organism formularioLista, listasCadastradas */
  @property({ attribute: false }) listas: ListaCadastrada[] = [];

  /** state selectedLista — the id of the Lista selected in listasCadastradas (null when none); source entry.params.listaId; organism formularioLista, listasCadastradas; lives in the URL (listaId) */
  @property({ attribute: false }) selectedLista: string | null = null;

  /** state busca — filter: the name fragment last searched through buscarListas ('' lists everything); source buscarListas.input; organism listasCadastradas */
  @property({ attribute: false }) busca = '';

  /** state criarListaDraft — draft of the new lista form (nome, details.tipo, details.descricao, ativa); source criarLista.input; organism formularioLista */
  @property({ attribute: false }) criarListaDraft: CriarListaDraft = emptyCriarListaDraft();

  /** state salvarListaDraft — draft of the edit form, filled from the selected lista (id, version, nome, details, ativa); source salvarLista.input; organism formularioLista */
  @property({ attribute: false }) salvarListaDraft: SalvarListaDraft = emptySalvarListaDraft();

  /** state pageStatus — overall status of the page: loading while the initial load runs, empty when there is no lista, error when it failed */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state listarListasStatus — status of the initial load of every lista */
  @property({ attribute: false }) listarListasStatus: RequestStatus = 'idle';

  /** state listarListasError — error of the initial load (also client.selectionInvalid when the listaId param matches no lista); null when none */
  @property({ attribute: false }) listarListasError: ErrorState = null;

  /** state buscarListasStatus — status of the search by name */
  @property({ attribute: false }) buscarListasStatus: RequestStatus = 'idle';

  /** state buscarListasError — error of the search by name; null when none */
  @property({ attribute: false }) buscarListasError: ErrorState = null;

  /** state criarListaStatus — status of the creation of a lista; success stays until the person changes something */
  @property({ attribute: false }) criarListaStatus: RequestStatus = 'idle';

  /** state criarListaError — error of the creation (client.requiredMissing or a backend rule such as listaNomeUnico); null when none */
  @property({ attribute: false }) criarListaError: ErrorState = null;

  /** state salvarListaStatus — status of the update of a lista; success stays until the person changes something */
  @property({ attribute: false }) salvarListaStatus: RequestStatus = 'idle';

  /** state salvarListaError — error of the update (client.requiredMissing or a backend rule such as listaNomeUnico or a version conflict); null when none */
  @property({ attribute: false }) salvarListaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  /** selected formularioLista — the loaded lista whose id is in selectedLista, or null when nothing is selected or the row is not in the loaded list */
  public get formularioLista(): ListaCadastrada | null {
    const id = this.selectedLista;
    if (id === null) return null;
    return this.listas.find((row) => row.id === id) ?? null;
  }

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.listas.${member}`, value);
    if (member === 'selectedLista') {
      try {
        const url = new URL(window.location.href);
        if (value === null) {
          url.searchParams.delete('listaId');
        } else {
          url.searchParams.set('listaId', String(value));
        }
        history.replaceState(null, '', url.toString());
      } catch {
        // the URL could not be updated; the state stays published
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const storedListas = getState('ui.tarefas.listas.listas');
    if (storedListas !== undefined) this.assignState('ui.tarefas.listas.listas', storedListas);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.listarListas().then(() => this.applySelection());
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
    this.publish('selectedLista', raw !== null && raw !== '' ? raw : null);
  }

  /** Applied after the load: the selected id wins over the filters; it fills the edit draft or reports client.selectionInvalid. */
  private applySelection(): void {
    const id = this.selectedLista;
    if (id === null) return;
    if (this.listarListasStatus !== 'success') return;
    const row = this.listas.find((item) => item.id === id);
    if (!row) {
      this.publish('listarListasError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    this.publish('salvarListaDraft', draftFromLista(row));
  }

  private unexpected(error: unknown): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
  }

  private upsertLista(lista: ListaCadastrada): void {
    const exists = this.listas.some((row) => row.id === lista.id);
    const next = exists ? this.listas.map((row) => (row.id === lista.id ? lista : row)) : [...this.listas, lista];
    this.publish('listas', next);
  }

  /** request listarListas — initial load of every lista of the organization (active and inactive) with its open task count; redraws listas (replace), pageStatus and, when listaId is in the URL, the edit draft; no arguments; call it again to reload without a filter */
  public async listarListas(): Promise<void> {
    if (this.listarListasStatus === 'loading') return;
    this.publish('listarListasStatus', 'loading');
    this.publish('listarListasError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'tarefas.listas.listarListas'> = {};
      const response = await execBff<Output<'tarefas.listas.listarListas'>>('tarefas.listas.listarListas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarListasError', response.error ?? this.unexpected(null));
        this.publish('listarListasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      this.publish('listas', response.data.listas);
      this.publish('listarListasStatus', 'success');
      this.publish('pageStatus', response.data.listas.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarListasError', this.unexpected(error));
      this.publish('listarListasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request buscarListas — search the listas whose name contains a fragment (case-insensitive, '' returns all); redraws listas (replace) and busca; argument busca = the fragment typed by the gestor */
  public async buscarListas(busca: string): Promise<void> {
    if (this.buscarListasStatus === 'loading') return;
    this.publish('busca', busca);
    this.publish('buscarListasStatus', 'loading');
    this.publish('buscarListasError', null);
    try {
      const input: Input<'tarefas.listas.buscarListas'> = { busca };
      const response = await execBff<Output<'tarefas.listas.buscarListas'>>('tarefas.listas.buscarListas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('buscarListasError', response.error ?? this.unexpected(null));
        this.publish('buscarListasStatus', 'error');
        return;
      }
      this.publish('listas', response.data.listas);
      this.publish('buscarListasStatus', 'success');
    } catch (error) {
      this.publish('buscarListasError', this.unexpected(error));
      this.publish('buscarListasStatus', 'error');
    }
  }

  /** select — select a lista by id (null clears the selection); publishes selectedLista, fills salvarListaDraft from the loaded row (or empties it) and clears old command results; an id with no loaded row publishes client.selectionInvalid in listarListasError */
  public selectLista(id: string | null): void {
    this.resetCommandResults();
    if (id === null || id === '') {
      this.publish('selectedLista', null);
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      return;
    }
    const row = this.listas.find((item) => item.id === id);
    if (!row) {
      this.publish('listarListasError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    if (this.listarListasError !== null && this.listarListasError.code === 'client.selectionInvalid') {
      this.publish('listarListasError', null);
    }
    this.publish('selectedLista', id);
    this.publish('salvarListaDraft', draftFromLista(row));
  }

  /** draft — replace the whole draft of the new lista form (nome, details.tipo, details.descricao, ativa); clears old command results */
  public setCriarListaDraft(value: CriarListaDraft): void {
    this.resetCommandResults();
    this.publish('criarListaDraft', value);
  }

  /** draft — replace the whole draft of the edit lista form (id, version, nome, details.tipo, details.descricao, ativa); clears old command results */
  public setSalvarListaDraft(value: SalvarListaDraft): void {
    this.resetCommandResults();
    this.publish('salvarListaDraft', value);
  }

  /** setScenario — publish the visible scene of the page (state scenary); clears old command results */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** request criarLista — register a new lista from criarListaDraft (nome, tipo, descricao, ativa); redraws listas (upsert of the returned lista) and empties criarListaDraft; no arguments; a missing nome or tipo publishes client.requiredMissing without calling the backend */
  public async criarLista(): Promise<void> {
    if (this.criarListaStatus === 'loading') return;
    const draft = this.criarListaDraft;
    const nome = draft.nome ?? '';
    const tipo = draft.details.tipo;
    const ativa = draft.ativa;
    const missing: string[] = [];
    if (nome === '') missing.push('ui.tarefas.listas.criarListaDraft.nome');
    if (tipo === null) missing.push('ui.tarefas.listas.criarListaDraft.details.tipo');
    if (ativa === null) missing.push('ui.tarefas.listas.criarListaDraft.ativa');
    if (nome === '' || tipo === null || ativa === null) {
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
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.listas.criarLista'>>('tarefas.listas.criarLista', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('criarListaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('criarListaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('criarListaError', response.error ?? this.unexpected(null));
        this.publish('criarListaStatus', 'error');
        return;
      }
      this.upsertLista(response.data.lista);
      this.publish('criarListaDraft', emptyCriarListaDraft());
      this.publish('criarListaStatus', 'success');
    } catch (error) {
      this.publish('criarListaError', this.unexpected(error));
      this.publish('criarListaStatus', 'error');
    }
  }

  /** request salvarLista — save the changes of the selected lista from salvarListaDraft (id, version, nome, tipo, descricao, ativa); redraws listas (upsert of the returned lista) and refills salvarListaDraft from the saved record with its new version; no arguments; select a lista first, otherwise client.requiredMissing is published without calling the backend */
  public async salvarLista(): Promise<void> {
    if (this.salvarListaStatus === 'loading') return;
    const draft = this.salvarListaDraft;
    const id = draft.id;
    const version = draft.version;
    const nome = draft.nome ?? '';
    const tipo = draft.details.tipo;
    const ativa = draft.ativa;
    const missing: string[] = [];
    if (id === null) missing.push('ui.tarefas.listas.salvarListaDraft.id');
    if (version === null) missing.push('ui.tarefas.listas.salvarListaDraft.version');
    if (nome === '') missing.push('ui.tarefas.listas.salvarListaDraft.nome');
    if (tipo === null) missing.push('ui.tarefas.listas.salvarListaDraft.details.tipo');
    if (ativa === null) missing.push('ui.tarefas.listas.salvarListaDraft.ativa');
    if (id === null || version === null || nome === '' || tipo === null || ativa === null) {
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
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.listas.salvarLista'>>('tarefas.listas.salvarLista', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('salvarListaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('salvarListaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('salvarListaError', response.error ?? this.unexpected(null));
        this.publish('salvarListaStatus', 'error');
        return;
      }
      const lista = response.data.lista;
      this.upsertLista(lista);
      this.publish('salvarListaDraft', draftFromLista(lista));
      this.publish('salvarListaStatus', 'success');
    } catch (error) {
      this.publish('salvarListaError', this.unexpected(error));
      this.publish('salvarListaStatus', 'error');
    }
  }
}
