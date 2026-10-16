/// <mls fileReference="_102047_/l2/tarefas/web/shared/listas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { ListasContracts, ListaResumo, ListaResumoDetalhes, ListaEdicao, ListaEdicaoDetalhes } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';

export type { ListasContracts, ListaResumo, ListaResumoDetalhes, ListaEdicao, ListaEdicaoDetalhes } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type ListaTipo = 'project' | 'area';

/** Draft of the criarLista form: every leaf may be null until the person fills it. */
export type CriarListaDraft = {
  nome: string | null;
  ativa: boolean | null;
  details: { tipo: ListaTipo | null; descricao: string | null };
};

/** Draft of the salvarLista form: the edited record (id, version) plus the editable leaves. */
export type SalvarListaDraft = {
  id: string | null;
  version: number | null;
  nome: string | null;
  ativa: boolean | null;
  details: { tipo: ListaTipo | null; descricao: string | null };
};

export function emptyCriarListaDraft(): CriarListaDraft {
  return { nome: null, ativa: true, details: { tipo: null, descricao: null } };
}

export function emptySalvarListaDraft(): SalvarListaDraft {
  return { id: null, version: null, nome: null, ativa: null, details: { tipo: null, descricao: null } };
}

function draftFromRegistro(registro: ListaEdicao): SalvarListaDraft {
  return {
    id: registro.id,
    version: registro.version,
    nome: registro.nome,
    ativa: registro.ativa,
    details: {
      tipo: registro.details.details.tipo,
      descricao: registro.details.details.descricao ?? null,
    },
  };
}

type Input<R extends keyof ListasContracts> = ListasContracts[R]['input'];
type Output<R extends keyof ListasContracts> = ListasContracts[R]['output'];

type StateMember =
  | 'listas'
  | 'lista'
  | 'selectedLista'
  | 'criarListaDraft'
  | 'salvarListaDraft'
  | 'pageStatus'
  | 'listarListasStatus'
  | 'listarListasError'
  | 'obterListaStatus'
  | 'obterListaError'
  | 'criarListaStatus'
  | 'criarListaError'
  | 'salvarListaStatus'
  | 'salvarListaError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.listas.listas': 'listas',
  'ui.tarefas.listas.lista': 'lista',
  'ui.tarefas.listas.selectedLista': 'selectedLista',
  'ui.tarefas.listas.criarListaDraft': 'criarListaDraft',
  'ui.tarefas.listas.salvarListaDraft': 'salvarListaDraft',
  'ui.tarefas.listas.pageStatus': 'pageStatus',
  'ui.tarefas.listas.listarListasStatus': 'listarListasStatus',
  'ui.tarefas.listas.listarListasError': 'listarListasError',
  'ui.tarefas.listas.obterListaStatus': 'obterListaStatus',
  'ui.tarefas.listas.obterListaError': 'obterListaError',
  'ui.tarefas.listas.criarListaStatus': 'criarListaStatus',
  'ui.tarefas.listas.criarListaError': 'criarListaError',
  'ui.tarefas.listas.salvarListaStatus': 'salvarListaStatus',
  'ui.tarefas.listas.salvarListaError': 'salvarListaError',
  'ui.tarefas.listas.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class TarefasListasShared extends StateLitElement {
  /** state listas — rows of the lists register (name, type, active flag, open task count); source listarListas.listas; organism listasCadastradas */
  @property({ attribute: false }) listas: ListaResumo[] = [];

  /** state lista — the list record loaded in the edit form (with its version); source obterLista.lista; organism formularioLista */
  @property({ attribute: false }) lista: ListaEdicao | null = null;

  /** state selectedLista — id of the list chosen in the register, whose record is loaded in the form (null = none, new list); source entry.params.listaId; organisms formularioLista, listasCadastradas; persisted */
  @property({ attribute: false }) selectedLista: string | null = null;

  /** state criarListaDraft — draft of the new-list form (nome, ativa, details.tipo, details.descricao); source criarLista.input; organism formularioLista */
  @property({ attribute: false }) criarListaDraft: CriarListaDraft = emptyCriarListaDraft();

  /** state salvarListaDraft — draft of the edit-list form, filled from the loaded record (id and version travel with it); source salvarLista.input; organism formularioLista */
  @property({ attribute: false }) salvarListaDraft: SalvarListaDraft = emptySalvarListaDraft();

  /** state pageStatus — overall status of the page load: idle, loading, empty (no list), success or error */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state listarListasStatus — status of the lists query */
  @property({ attribute: false }) listarListasStatus: RequestStatus = 'idle';

  /** state listarListasError — error of the lists query, null when none */
  @property({ attribute: false }) listarListasError: ErrorState = null;

  /** state obterListaStatus — status of the query that opens one list for editing */
  @property({ attribute: false }) obterListaStatus: RequestStatus = 'idle';

  /** state obterListaError — error of the open-one-list query, null when none */
  @property({ attribute: false }) obterListaError: ErrorState = null;

  /** state criarListaStatus — status of the create-list command */
  @property({ attribute: false }) criarListaStatus: RequestStatus = 'idle';

  /** state criarListaError — error of the create-list command, null when none */
  @property({ attribute: false }) criarListaError: ErrorState = null;

  /** state salvarListaStatus — status of the save-list command */
  @property({ attribute: false }) salvarListaStatus: RequestStatus = 'idle';

  /** state salvarListaError — error of the save-list command, null when none */
  @property({ attribute: false }) salvarListaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.listas.${member}`, value);
    if (member === 'selectedLista') {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem('tarefas.listas.listaId');
        } else {
          localStorage.setItem('tarefas.listas.listaId', String(value));
        }
      } catch {
        // storage unavailable: the selection simply is not persisted
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const dataKeys = ['ui.tarefas.listas.listas', 'ui.tarefas.listas.lista'];
    for (const key of dataKeys) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
    this.resetVisit();
    if (!this.subscribed) {
      subscribe([...STATE_KEYS], this);
      this.subscribed = true;
    }
    this.applyEntryParams();
    void this.listarListas();
    if (this.selectedLista !== null) {
      void this.obterLista(this.selectedLista);
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

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('listarListasStatus', 'idle');
    this.publish('listarListasError', null);
    this.publish('obterListaStatus', 'idle');
    this.publish('obterListaError', null);
    this.publish('criarListaStatus', 'idle');
    this.publish('criarListaError', null);
    this.publish('salvarListaStatus', 'idle');
    this.publish('salvarListaError', null);
    this.publish('criarListaDraft', emptyCriarListaDraft());
    this.publish('salvarListaDraft', emptySalvarListaDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('criarListaStatus', 'idle');
    this.publish('criarListaError', null);
    this.publish('salvarListaStatus', 'idle');
    this.publish('salvarListaError', null);
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null && fromUrl !== '') return fromUrl;
    try {
      const stored = localStorage.getItem(`tarefas.listas.${name}`);
      if (stored !== null && stored !== '') return stored;
    } catch {
      // storage unavailable
    }
    return null;
  }

  private applyEntryParams(): void {
    const listaId = this.readParam('listaId');
    this.publish('selectedLista', listaId);
    if (listaId === null) {
      this.publish('lista', null);
    }
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page (any string the page uses to switch scenes) */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the new-list form (nome, ativa, details.tipo, details.descricao); clears the previous command result */
  public setCriarListaDraft(value: CriarListaDraft): void {
    this.resetCommandResults();
    this.publish('criarListaDraft', { ...value, details: { ...value.details } });
  }

  /** draft — replaces the draft of the edit-list form (keeps id and version of the loaded record); clears the previous command result */
  public setSalvarListaDraft(value: SalvarListaDraft): void {
    this.resetCommandResults();
    this.publish('salvarListaDraft', { ...value, details: { ...value.details } });
  }

  /** select — chooses a list of the register by id and loads its record into the edit form (lista, salvarListaDraft); null clears the selection and the edit draft so the form returns to creating a new list; an id that cannot be fetched is reported in obterListaError */
  public selecionarLista(listaId: string | null): void {
    this.resetCommandResults();
    if (listaId === null || listaId === '') {
      this.publish('selectedLista', null);
      this.publish('lista', null);
      this.publish('salvarListaDraft', emptySalvarListaDraft());
      this.publish('obterListaStatus', 'idle');
      this.publish('obterListaError', null);
      return;
    }
    this.publish('selectedLista', listaId);
    void this.obterLista(listaId);
  }

  /** request listarListas — loads every list of the organization (active and inactive, ordered by name, with open task count) when the page opens; redraws listas (replace); no arguments; call it again to reload the register */
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
      const rows = response.data.listas;
      this.publish('listas', rows);
      this.publish('listarListasStatus', 'success');
      this.publish('pageStatus', rows.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarListasError', this.unexpectedError(error));
      this.publish('listarListasStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request obterLista — opens one list of the register for editing; redraws lista (replace) and fills salvarListaDraft from the record; listaId: id of the list to open (prefer selecionarLista, which also records the selection) */
  public async obterLista(listaId: string): Promise<void> {
    if (this.obterListaStatus === 'loading') return;
    if (listaId === '') {
      this.publish('obterListaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['selectedLista'] } });
      this.publish('obterListaStatus', 'error');
      return;
    }
    this.publish('obterListaStatus', 'loading');
    this.publish('obterListaError', null);
    try {
      const input: Input<'tarefas.listas.obterLista'> = { listaId };
      const response = await execBff<Output<'tarefas.listas.obterLista'>>('tarefas.listas.obterLista', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('obterListaError', response.error);
        this.publish('obterListaStatus', 'error');
        return;
      }
      const registro = response.data.lista;
      this.publish('lista', registro);
      this.publish('salvarListaDraft', draftFromRegistro(registro));
      this.publish('obterListaStatus', 'success');
    } catch (error) {
      this.publish('obterListaError', this.unexpectedError(error));
      this.publish('obterListaStatus', 'error');
    }
  }

  private upsertLista(row: ListaResumo): ListaResumo[] {
    const exists = this.listas.some(item => item.id === row.id);
    if (exists) return this.listas.map(item => (item.id === row.id ? row : item));
    return [...this.listas, row];
  }

  /** request criarLista — registers a new project/area list from criarListaDraft (nome and details.tipo required); redraws listas (upsert of the returned row), lista and selectedLista (the new record, so the form continues in edit), salvarListaDraft (filled from the record) and resets criarListaDraft; no arguments; errors such as listaNomeUnico come in criarListaError */
  public async criarLista(): Promise<void> {
    if (this.criarListaStatus === 'loading') return;
    const draft = this.criarListaDraft;
    const nome = draft.nome === null ? '' : draft.nome.trim();
    const missing: string[] = [];
    if (nome === '') missing.push('criarListaDraft.nome');
    if (draft.ativa === null) missing.push('criarListaDraft.ativa');
    if (draft.details.tipo === null) missing.push('criarListaDraft.details.tipo');
    if (missing.length > 0 || draft.ativa === null || draft.details.tipo === null) {
      this.publish('criarListaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.publish('criarListaStatus', 'error');
      return;
    }
    const descricao = draft.details.descricao;
    const input: Input<'tarefas.listas.criarLista'> = {
      nome,
      ativa: draft.ativa,
      details: {
        tipo: draft.details.tipo,
        ...(descricao !== null && descricao !== '' ? { descricao } : {}),
      },
    };
    this.publish('criarListaStatus', 'loading');
    this.publish('criarListaError', null);
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<'tarefas.listas.criarLista'>>('tarefas.listas.criarLista', input, { mode: 'blocking', signal }));
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
      const output = response.data;
      this.publish('listas', this.upsertLista(output.lista));
      this.publish('lista', output.registro);
      this.publish('selectedLista', output.registro.id);
      this.publish('salvarListaDraft', draftFromRegistro(output.registro));
      this.publish('criarListaDraft', emptyCriarListaDraft());
      this.publish('pageStatus', 'success');
      this.publish('criarListaStatus', 'success');
    } catch (error) {
      this.publish('criarListaError', this.unexpectedError(error));
      this.publish('criarListaStatus', 'error');
    }
  }

  /** request salvarLista — saves the edits of the selected list from salvarListaDraft (id, version, nome, ativa and details.tipo required; version guards concurrency); redraws listas (upsert of the returned row), lista (the saved record with its new version) and salvarListaDraft (filled again from it); no arguments; errors such as listaNomeUnico or a stale version come in salvarListaError */
  public async salvarLista(): Promise<void> {
    if (this.salvarListaStatus === 'loading') return;
    const draft = this.salvarListaDraft;
    const nome = draft.nome === null ? '' : draft.nome.trim();
    const missing: string[] = [];
    if (draft.id === null || draft.id === '') missing.push('salvarListaDraft.id');
    if (draft.version === null) missing.push('salvarListaDraft.version');
    if (nome === '') missing.push('salvarListaDraft.nome');
    if (draft.ativa === null) missing.push('salvarListaDraft.ativa');
    if (draft.details.tipo === null) missing.push('salvarListaDraft.details.tipo');
    if (missing.length > 0 || draft.id === null || draft.version === null || draft.ativa === null || draft.details.tipo === null) {
      this.publish('salvarListaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.publish('salvarListaStatus', 'error');
      return;
    }
    const descricao = draft.details.descricao;
    const input: Input<'tarefas.listas.salvarLista'> = {
      id: draft.id,
      version: draft.version,
      nome,
      ativa: draft.ativa,
      details: {
        tipo: draft.details.tipo,
        ...(descricao !== null && descricao !== '' ? { descricao } : {}),
      },
    };
    this.publish('salvarListaStatus', 'loading');
    this.publish('salvarListaError', null);
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<'tarefas.listas.salvarLista'>>('tarefas.listas.salvarLista', input, { mode: 'blocking', signal }));
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
      const output = response.data;
      this.publish('listas', this.upsertLista(output.lista));
      this.publish('lista', output.registro);
      this.publish('selectedLista', output.registro.id);
      this.publish('salvarListaDraft', draftFromRegistro(output.registro));
      this.publish('salvarListaStatus', 'success');
    } catch (error) {
      this.publish('salvarListaError', this.unexpectedError(error));
      this.publish('salvarListaStatus', 'error');
    }
  }
}
