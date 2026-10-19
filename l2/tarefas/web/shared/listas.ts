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

export type ListaTipo = 'project' | 'area';

/** Descriptive data of a list being typed; every leaf is null until the person fills it. */
export type ListaDraftDetails = {
  tipo: ListaTipo | null;
  descricao: string | null;
};

/** Draft of the form that creates a list (input of criarLista); every leaf is null until filled. */
export type CriarListaDraft = {
  nome: string | null;
  details: ListaDraftDetails;
  ativa: boolean | null;
};

/** Draft of the form that edits a list (input of salvarLista); id and version come from the selected record. */
export type SalvarListaDraft = {
  id: string | null;
  version: number | null;
  nome: string | null;
  details: ListaDraftDetails;
  ativa: boolean | null;
};

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

type StateMember =
  | 'listas'
  | 'selectedLista'
  | 'busca'
  | 'criarListaDraft'
  | 'salvarListaDraft'
  | 'scenary'
  | 'pageStatus'
  | 'listarListasStatus'
  | 'listarListasError'
  | 'buscarListasStatus'
  | 'buscarListasError'
  | 'criarListaStatus'
  | 'criarListaError'
  | 'salvarListaStatus'
  | 'salvarListaError';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.listas.listas': 'listas',
  'ui.tarefas.listas.selectedLista': 'selectedLista',
  'ui.tarefas.listas.busca': 'busca',
  'ui.tarefas.listas.criarListaDraft': 'criarListaDraft',
  'ui.tarefas.listas.salvarListaDraft': 'salvarListaDraft',
  'ui.tarefas.listas.scenary': 'scenary',
  'ui.tarefas.listas.pageStatus': 'pageStatus',
  'ui.tarefas.listas.listarListasStatus': 'listarListasStatus',
  'ui.tarefas.listas.listarListasError': 'listarListasError',
  'ui.tarefas.listas.buscarListasStatus': 'buscarListasStatus',
  'ui.tarefas.listas.buscarListasError': 'buscarListasError',
  'ui.tarefas.listas.criarListaStatus': 'criarListaStatus',
  'ui.tarefas.listas.criarListaError': 'criarListaError',
  'ui.tarefas.listas.salvarListaStatus': 'salvarListaStatus',
  'ui.tarefas.listas.salvarListaError': 'salvarListaError',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class TarefasListasShared extends StateLitElement {
  /** state listas — the lists of tasks (project or area) with editable data, version and open-task count; source listarListas.listas; organisms formularioLista, listasCadastradas */
  @property({ attribute: false }) listas: ListaCadastrada[] = [];

  /** state selectedLista — the id of the Lista selected in listasCadastradas (null when none); source entry.params.listaId; organisms formularioLista, listasCadastradas. The selected record is the getter formularioLista */
  @property({ attribute: false }) selectedLista: string | null = null;

  /** state busca — the name fragment of the last search made with buscarListas ('' when listing all); filter of the list, written by buscarListas */
  @property({ attribute: false }) busca = '';

  /** state criarListaDraft — draft of the form that creates a new list; source criarLista.input; organism formularioLista */
  @property({ attribute: false }) criarListaDraft: CriarListaDraft = emptyCriarListaDraft();

  /** state salvarListaDraft — draft of the form that edits the selected list, prefilled from it (carries id and version); source salvarLista.input; organism formularioLista */
  @property({ attribute: false }) salvarListaDraft: SalvarListaDraft = emptySalvarListaDraft();

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  /** state pageStatus — overall status of the page, driven by the initial load */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state listarListasStatus — status of the request listarListas */
  @property({ attribute: false }) listarListasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarListasError — error of the request listarListas (also client.selectionInvalid / client.preconditionMissing), null when none */
  @property({ attribute: false }) listarListasError: ErrorState = null;

  /** state buscarListasStatus — status of the request buscarListas */
  @property({ attribute: false }) buscarListasStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state buscarListasError — error of the request buscarListas, null when none */
  @property({ attribute: false }) buscarListasError: ErrorState = null;

  /** state criarListaStatus — status of the command criarLista */
  @property({ attribute: false }) criarListaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state criarListaError — error of the command criarLista, null when none */
  @property({ attribute: false }) criarListaError: ErrorState = null;

  /** state salvarListaStatus — status of the command salvarLista */
  @property({ attribute: false }) salvarListaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state salvarListaError — error of the command salvarLista, null when none */
  @property({ attribute: false }) salvarListaError: ErrorState = null;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.listas.${member}`, value);
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
    void this.listarListas();
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

  /** Transient members start fresh on every entry. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('busca', '');
    this.publish('listarListasStatus', 'idle');
    this.publish('listarListasError', null);
    this.publish('buscarListasStatus', 'idle');
    this.publish('buscarListasError', null);
    this.publish('criarListaStatus', 'idle');
    this.publish('criarListaError', null);
    this.publish('salvarListaStatus', 'idle');
    this.publish('salvarListaError', null);
    this.publish('criarListaDraft', emptyCriarListaDraft());
    this.publish('salvarListaDraft', emptySalvarListaDraft());
  }

  /** A person's change of form, selection or scene wipes the results of the previous commands. */
  private resetCommandResults(): void {
    this.publish('criarListaStatus', 'idle');
    this.publish('criarListaError', null);
    this.publish('salvarListaStatus', 'idle');
    this.publish('salvarListaError', null);
  }

  private applyEntryParams(): void {
    let listaId: string | null = new URLSearchParams(window.location.search).get('listaId');
    if (listaId === null) {
      try {
        listaId = localStorage.getItem('tarefas.listas.listaId');
      } catch {
        listaId = null;
      }
    }
    this.publish('selectedLista', listaId !== null && listaId !== '' ? listaId : null);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private upsertLista(lista: ListaCadastrada): ListaCadastrada[] {
    const exists = this.listas.some((row) => row.id === lista.id);
    if (exists) return this.listas.map((row) => (row.id === lista.id ? lista : row));
    return [...this.listas, lista];
  }

  /** The selected record: the row of the loaded list whose id is selectedLista (null when none or not loaded). */
  public get formularioLista(): ListaCadastrada | null {
    if (this.selectedLista === null) return null;
    const id = this.selectedLista;
    return this.listas.find((row) => row.id === id) ?? null;
  }

  private applySelection(id: string | null): void {
    if (id === null) {
      this.publish('selectedLista', null);
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      return;
    }
    const row = this.listas.find((item) => item.id === id);
    if (!row) {
      this.publish('selectedLista', null);
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      this.publish('listarListasError', { code: 'client.selectionInvalid', message: '', details: { listaId: id } });
      this.publish('listarListasStatus', 'error');
      return;
    }
    this.publish('selectedLista', id);
    this.publish('salvarListaDraft', draftFromLista(row));
  }

  /** select — selects the list to edit by its id (null clears the selection); fills salvarListaDraft from the loaded row. An id that is not in the loaded lists publishes client.selectionInvalid in listarListasError. */
  public selectLista(id: string | null): void {
    this.resetCommandResults();
    this.applySelection(id);
  }

  /** draft — replaces the draft of the create form (criarLista); takes the whole draft. */
  public setCriarListaDraft(value: CriarListaDraft): void {
    this.resetCommandResults();
    this.publish('criarListaDraft', value);
  }

  /** draft — replaces the draft of the edit form (salvarLista); takes the whole draft, which keeps id and version of the selected list. */
  public setSalvarListaDraft(value: SalvarListaDraft): void {
    this.resetCommandResults();
    this.publish('salvarListaDraft', value);
  }

  /** Publishes the visible scene of the page. */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** request listarListas — loads every list of the organization (active and inactive); redraws listas (replace) and pageStatus (empty/success/error), then resolves the selected list from the entry param; no arguments; also the method to reload the list. */
  public async listarListas(): Promise<void> {
    if (this.listarListasStatus === 'loading') return;
    this.publish('listarListasStatus', 'loading');
    this.publish('listarListasError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'tarefas.listas.listarListas'> = {};
      const response = await execBff<Output<'tarefas.listas.listarListas'>>('tarefas.listas.listarListas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarListasError', response.error);
        this.publish('listarListasStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const listas = response.data.listas;
      this.publish('listas', listas);
      this.publish('listarListasStatus', 'success');
      this.publish('pageStatus', listas.length === 0 ? 'empty' : 'success');
      if (this.selectedLista !== null) this.applySelection(this.selectedLista);
    } catch (error) {
      this.publish('listarListasError', this.unexpectedError(error));
      this.publish('listarListasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request buscarListas — searches the lists whose name contains the typed fragment; redraws listas (replace) and keeps the fragment in busca; busca: fragment of the name ('' returns all lists). */
  public async buscarListas(busca: string): Promise<void> {
    if (this.buscarListasStatus === 'loading') return;
    this.publish('buscarListasStatus', 'loading');
    this.publish('buscarListasError', null);
    this.publish('busca', busca);
    try {
      const input: Input<'tarefas.listas.buscarListas'> = { busca };
      const response = await execBff<Output<'tarefas.listas.buscarListas'>>('tarefas.listas.buscarListas', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('buscarListasError', response.error);
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

  /** request criarLista — creates a new list from criarListaDraft (nome, details.tipo, details.descricao optional, ativa; all but descricao required); upserts the returned list into listas by id and empties criarListaDraft; no arguments. */
  public async criarLista(): Promise<void> {
    if (this.criarListaStatus === 'loading') return;
    const draft = this.criarListaDraft;
    const nome = draft.nome;
    const tipo = draft.details.tipo;
    const ativa = draft.ativa;
    if (nome === null || nome === '' || tipo === null || ativa === null) {
      this.publish('criarListaError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.tarefas.listas.criarListaDraft'] },
      });
      this.publish('criarListaStatus', 'error');
      return;
    }
    const descricao = draft.details.descricao;
    const input: Input<'tarefas.listas.criarLista'> = {
      nome,
      details: {
        tipo,
        ...(descricao !== null && descricao !== '' ? { descricao } : {}),
      },
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
        this.publish('criarListaError', response.error);
        this.publish('criarListaStatus', 'error');
        return;
      }
      this.publish('listas', this.upsertLista(response.data.lista));
      this.publish('criarListaDraft', emptyCriarListaDraft());
      this.publish('criarListaStatus', 'success');
    } catch (error) {
      this.publish('criarListaError', this.unexpectedError(error));
      this.publish('criarListaStatus', 'error');
    }
  }

  /** request salvarLista — saves the edits of the selected list from salvarListaDraft (id, version, nome, details.tipo, details.descricao optional, ativa); upserts the returned list into listas by id (the selection follows) and refills salvarListaDraft from it with the new version; no arguments. */
  public async salvarLista(): Promise<void> {
    if (this.salvarListaStatus === 'loading') return;
    const draft = this.salvarListaDraft;
    const id = draft.id;
    const version = draft.version;
    const nome = draft.nome;
    const tipo = draft.details.tipo;
    const ativa = draft.ativa;
    if (id === null || id === '' || version === null || nome === null || nome === '' || tipo === null || ativa === null) {
      this.publish('salvarListaError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.tarefas.listas.salvarListaDraft'] },
      });
      this.publish('salvarListaStatus', 'error');
      return;
    }
    const descricao = draft.details.descricao;
    const input: Input<'tarefas.listas.salvarLista'> = {
      id,
      version,
      nome,
      details: {
        tipo,
        ...(descricao !== null && descricao !== '' ? { descricao } : {}),
      },
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
        this.publish('salvarListaError', response.error);
        this.publish('salvarListaStatus', 'error');
        return;
      }
      const lista = response.data.lista;
      this.publish('listas', this.upsertLista(lista));
      this.publish('salvarListaDraft', draftFromLista(lista));
      this.publish('salvarListaStatus', 'success');
    } catch (error) {
      this.publish('salvarListaError', this.unexpectedError(error));
      this.publish('salvarListaStatus', 'error');
    }
  }
}
