/// <mls fileReference="_102047_/l2/tarefas/web/shared/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Membros_equipeContracts, MembroEquipeResumo } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

export type { Membros_equipeContracts, MembroEquipeResumo, MembroEquipeDetalhes, MembroEquipeIdentificacao, MembroEquipeBase } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

type Input<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['input'];
type Output<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** One page of the team list: items plus paging data. */
export type MembrosPage = Output<'tarefas.membros_equipe.listarMembrosEquipe'>['membros'];

/** Draft of the cadastrarPessoa form (new person); every leaf may be null while empty. */
export type CadastrarPessoaDraft = {
  details: {
    identification: {
      name: string | null;
      countryCode: string | null;
    };
  };
};

/** Draft of the salvarAlteracoesPessoa form (edit of the selected person); filled from the loaded record. */
export type SalvarAlteracoesPessoaDraft = {
  id: string | null;
  version: number | null;
  details: {
    identification: {
      name: string | null;
      countryCode: string | null;
    };
  };
};

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

type StateMember =
  | 'membros'
  | 'membro'
  | 'selectedMembroEquipe'
  | 'busca'
  | 'page'
  | 'cadastrarPessoaDraft'
  | 'salvarAlteracoesPessoaDraft'
  | 'pageStatus'
  | 'listarMembrosEquipeStatus'
  | 'listarMembrosEquipeError'
  | 'obterMembroEquipeStatus'
  | 'obterMembroEquipeError'
  | 'cadastrarPessoaStatus'
  | 'cadastrarPessoaError'
  | 'salvarAlteracoesPessoaStatus'
  | 'salvarAlteracoesPessoaError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.membros_equipe.membros': 'membros',
  'ui.tarefas.membros_equipe.membro': 'membro',
  'ui.tarefas.membros_equipe.selectedMembroEquipe': 'selectedMembroEquipe',
  'ui.tarefas.membros_equipe.busca': 'busca',
  'ui.tarefas.membros_equipe.page': 'page',
  'ui.tarefas.membros_equipe.cadastrarPessoaDraft': 'cadastrarPessoaDraft',
  'ui.tarefas.membros_equipe.salvarAlteracoesPessoaDraft': 'salvarAlteracoesPessoaDraft',
  'ui.tarefas.membros_equipe.pageStatus': 'pageStatus',
  'ui.tarefas.membros_equipe.listarMembrosEquipeStatus': 'listarMembrosEquipeStatus',
  'ui.tarefas.membros_equipe.listarMembrosEquipeError': 'listarMembrosEquipeError',
  'ui.tarefas.membros_equipe.obterMembroEquipeStatus': 'obterMembroEquipeStatus',
  'ui.tarefas.membros_equipe.obterMembroEquipeError': 'obterMembroEquipeError',
  'ui.tarefas.membros_equipe.cadastrarPessoaStatus': 'cadastrarPessoaStatus',
  'ui.tarefas.membros_equipe.cadastrarPessoaError': 'cadastrarPessoaError',
  'ui.tarefas.membros_equipe.salvarAlteracoesPessoaStatus': 'salvarAlteracoesPessoaStatus',
  'ui.tarefas.membros_equipe.salvarAlteracoesPessoaError': 'salvarAlteracoesPessoaError',
  'ui.tarefas.membros_equipe.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

/** State members that are persisted as entry params, with the param name used in localStorage. */
const PERSISTED_PARAM: Partial<Record<StateMember, string>> = {
  busca: 'busca',
  page: 'page',
  selectedMembroEquipe: 'membroEquipeId',
};

const PAGE_SIZE = 20;

function emptyCadastrarPessoaDraft(): CadastrarPessoaDraft {
  return { details: { identification: { name: null, countryCode: null } } };
}

function emptySalvarAlteracoesPessoaDraft(): SalvarAlteracoesPessoaDraft {
  return { id: null, version: null, details: { identification: { name: null, countryCode: null } } };
}

function draftFromMembro(membro: MembroEquipeResumo): SalvarAlteracoesPessoaDraft {
  const identification = membro.details.identification.details.identification;
  return {
    id: membro.id,
    version: membro.version,
    details: { identification: { name: identification.name, countryCode: identification.countryCode } },
  };
}

function isBlank(value: string | null): boolean {
  return value === null || value.trim() === '';
}

export class TarefasMembros_equipeShared extends StateLitElement {
  /** state membros — people of the team as the list shows them (page with items, page, pageSize, hasMore); source listarMembrosEquipe.membros; organism pessoasEquipe */
  @property({ attribute: false }) membros: MembrosPage | null = null;

  /** state membro — the person loaded for the registration form (record with id and version); source obterMembroEquipe.membro; organism cadastroPessoa */
  @property({ attribute: false }) membro: MembroEquipeResumo | null = null;

  /** state selectedMembroEquipe — id of the selected person, opened in the registration form; source entry.params.membroEquipeId; organisms cadastroPessoa, pessoasEquipe; persisted */
  @property({ attribute: false }) selectedMembroEquipe: string | null = null;

  /** state busca — optional name fragment that filters the list; source entry.params.busca; organism pessoasEquipe; persisted */
  @property({ attribute: false }) busca: string | null = null;

  /** state page — the page of the list the person went to with a pager; source entry.params.page; organism pessoasEquipe; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state cadastrarPessoaDraft — form draft of a new person (name, countryCode); source cadastrarPessoa.input; organism cadastroPessoa */
  @property({ attribute: false }) cadastrarPessoaDraft: CadastrarPessoaDraft = emptyCadastrarPessoaDraft();

  /** state salvarAlteracoesPessoaDraft — form draft editing the selected person (id, version, name, countryCode), filled from the loaded record; source salvarAlteracoesPessoa.input; organism cadastroPessoa */
  @property({ attribute: false }) salvarAlteracoesPessoaDraft: SalvarAlteracoesPessoaDraft = emptySalvarAlteracoesPessoaDraft();

  /** state pageStatus — overall status of the page: idle, loading, empty, success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state listarMembrosEquipeStatus — status of the team list request */
  @property({ attribute: false }) listarMembrosEquipeStatus: RequestStatus = 'idle';

  /** state listarMembrosEquipeError — error of the team list request, null when none */
  @property({ attribute: false }) listarMembrosEquipeError: ErrorState = null;

  /** state obterMembroEquipeStatus — status of the request that loads the selected person */
  @property({ attribute: false }) obterMembroEquipeStatus: RequestStatus = 'idle';

  /** state obterMembroEquipeError — error of the request that loads the selected person, null when none */
  @property({ attribute: false }) obterMembroEquipeError: ErrorState = null;

  /** state cadastrarPessoaStatus — status of the command that registers a new person */
  @property({ attribute: false }) cadastrarPessoaStatus: RequestStatus = 'idle';

  /** state cadastrarPessoaError — error of the command that registers a new person, null when none */
  @property({ attribute: false }) cadastrarPessoaError: ErrorState = null;

  /** state salvarAlteracoesPessoaStatus — status of the command that saves the edited person */
  @property({ attribute: false }) salvarAlteracoesPessoaStatus: RequestStatus = 'idle';

  /** state salvarAlteracoesPessoaError — error of the command that saves the edited person, null when none */
  @property({ attribute: false }) salvarAlteracoesPessoaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.membros_equipe.${member}`, value);
    const param = PERSISTED_PARAM[member];
    if (param) {
      try {
        const storageKey = `tarefas.membros_equipe.${param}`;
        if (value === null) {
          window.localStorage.removeItem(storageKey);
        } else {
          window.localStorage.setItem(storageKey, String(value));
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
    const membros = getState('ui.tarefas.membros_equipe.membros');
    if (membros !== undefined) this.assignState('ui.tarefas.membros_equipe.membros', membros);
    const membro = getState('ui.tarefas.membros_equipe.membro');
    if (membro !== undefined) this.assignState('ui.tarefas.membros_equipe.membro', membro);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.initialLoad();
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
    this.publish('listarMembrosEquipeStatus', 'idle');
    this.publish('listarMembrosEquipeError', null);
    this.publish('obterMembroEquipeStatus', 'idle');
    this.publish('obterMembroEquipeError', null);
    this.publish('cadastrarPessoaStatus', 'idle');
    this.publish('cadastrarPessoaError', null);
    this.publish('salvarAlteracoesPessoaStatus', 'idle');
    this.publish('salvarAlteracoesPessoaError', null);
    this.publish('cadastrarPessoaDraft', emptyCadastrarPessoaDraft());
    this.publish('salvarAlteracoesPessoaDraft', emptySalvarAlteracoesPessoaDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('cadastrarPessoaStatus', 'idle');
    this.publish('cadastrarPessoaError', null);
    this.publish('salvarAlteracoesPessoaStatus', 'idle');
    this.publish('salvarAlteracoesPessoaError', null);
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null) return fromUrl;
    try {
      return window.localStorage.getItem(`tarefas.membros_equipe.${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const rawBusca = this.readParam('busca');
    this.publish('busca', rawBusca !== null && rawBusca !== '' ? rawBusca : null);
    const rawPage = this.readParam('page');
    let pageValue: number | null = null;
    if (rawPage !== null && rawPage !== '') {
      const parsed = Number(rawPage);
      if (Number.isFinite(parsed)) pageValue = parsed;
    }
    this.publish('page', pageValue);
    const rawSelected = this.readParam('membroEquipeId');
    this.publish('selectedMembroEquipe', rawSelected !== null && rawSelected !== '' ? rawSelected : null);
    if (this.selectedMembroEquipe === null) this.publish('membro', null);
  }

  private async initialLoad(): Promise<void> {
    await this.listarMembrosEquipe();
    if (this.selectedMembroEquipe !== null) await this.obterMembroEquipe();
  }

  private toError(error: { code: string; message?: string; details?: unknown } | null): ErrorState {
    if (!error) return { code: 'client.unexpected', message: '', details: { name: 'noError' } };
    return { code: error.code, message: error.message ?? '', details: error.details };
  }

  private unexpected(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private upsertMembro(membro: MembroEquipeResumo): void {
    if (!this.membros) return;
    const exists = this.membros.items.some((item) => item.id === membro.id);
    const items = exists
      ? this.membros.items.map((item) => (item.id === membro.id ? membro : item))
      : [...this.membros.items, membro];
    this.publish('membros', { ...this.membros, items });
  }

  /** request listarMembrosEquipe — loads the team people (role tarefas.MembroEquipe), filtered by name, one page at a time; redraws membros (replace, or append when append is true), the busca and page states and pageStatus; arguments: busca = new name filter (empty string clears it; a new filter loads from the first page), page = page to load (defaults to the current page, or the next one when appending), append = true adds the next page to the items instead of replacing them (does nothing when there is no more) */
  public async listarMembrosEquipe(busca?: string | null, page?: number, append = false): Promise<void> {
    if (this.listarMembrosEquipeStatus === 'loading') return;
    let nextPage = page ?? this.page ?? 1;
    if (busca !== undefined) {
      this.publish('busca', busca !== null && busca !== '' ? busca : null);
      if (page === undefined) nextPage = 1;
    }
    if (append) {
      if (!this.membros || !this.membros.hasMore) return;
      if (page === undefined) nextPage = this.membros.page + 1;
    } else if (page !== undefined || busca !== undefined) {
      this.publish('page', nextPage);
    }
    this.publish('listarMembrosEquipeStatus', 'loading');
    this.publish('listarMembrosEquipeError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const currentBusca = this.busca;
    const input: Input<'tarefas.membros_equipe.listarMembrosEquipe'> = {
      page: nextPage,
      pageSize: PAGE_SIZE,
      ...(currentBusca !== null && currentBusca !== '' ? { busca: currentBusca } : {}),
    };
    try {
      const response = await execBff<Output<'tarefas.membros_equipe.listarMembrosEquipe'>>('tarefas.membros_equipe.listarMembrosEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('listarMembrosEquipeError', this.toError(response.error));
        this.publish('listarMembrosEquipeStatus', 'error');
        if (!append) this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.membros;
      const previous = this.membros;
      const merged: MembrosPage = append && previous
        ? { ...loaded, items: [...previous.items, ...loaded.items] }
        : loaded;
      this.publish('membros', merged);
      this.publish('listarMembrosEquipeStatus', 'success');
      this.publish('pageStatus', merged.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarMembrosEquipeError', this.unexpected(error));
      this.publish('listarMembrosEquipeStatus', 'error');
      if (!append) this.publish('pageStatus', 'error');
    }
  }

  /** select — selects the person opened in the registration form (id, or null to clear and start a new registration); publishes selectedMembroEquipe, then loads the record with obterMembroEquipe, or clears membro and the edit draft when null */
  public async selectCadastroPessoa(id: string | null): Promise<void> {
    this.resetCommandResults();
    this.publish('selectedMembroEquipe', id !== null && id !== '' ? id : null);
    if (this.selectedMembroEquipe === null) {
      this.publish('membro', null);
      this.publish('salvarAlteracoesPessoaDraft', emptySalvarAlteracoesPessoaDraft());
      this.publish('obterMembroEquipeStatus', 'idle');
      this.publish('obterMembroEquipeError', null);
      return;
    }
    await this.obterMembroEquipe();
  }

  /** request obterMembroEquipe — loads the selected person (selectedMembroEquipe) with its current version for the registration form; redraws membro (replace) and fills salvarAlteracoesPessoaDraft from it; no arguments, reads the selection (without a selection it fails with client.requiredMissing) */
  public async obterMembroEquipe(): Promise<void> {
    if (this.obterMembroEquipeStatus === 'loading') return;
    const id = this.selectedMembroEquipe;
    if (id === null) {
      this.publish('obterMembroEquipeError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['ui.tarefas.membros_equipe.selectedMembroEquipe'] } });
      this.publish('obterMembroEquipeStatus', 'error');
      return;
    }
    this.publish('obterMembroEquipeStatus', 'loading');
    this.publish('obterMembroEquipeError', null);
    const input: Input<'tarefas.membros_equipe.obterMembroEquipe'> = { id };
    try {
      const response = await execBff<Output<'tarefas.membros_equipe.obterMembroEquipe'>>('tarefas.membros_equipe.obterMembroEquipe', input, { mode: 'silent' });
      if (this.selectedMembroEquipe !== id) {
        this.publish('obterMembroEquipeStatus', 'idle');
        if (this.selectedMembroEquipe !== null) await this.obterMembroEquipe();
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('obterMembroEquipeError', this.toError(response.error));
        this.publish('obterMembroEquipeStatus', 'error');
        return;
      }
      const loaded = response.data.membro;
      this.publish('membro', loaded);
      this.publish('salvarAlteracoesPessoaDraft', draftFromMembro(loaded));
      this.publish('obterMembroEquipeStatus', 'success');
    } catch (error) {
      this.publish('obterMembroEquipeError', this.unexpected(error));
      this.publish('obterMembroEquipeStatus', 'error');
    }
  }

  /** draft — replaces the form draft of a new person (name, countryCode); resets the results of the commands */
  public setCadastrarPessoaDraft(value: CadastrarPessoaDraft): void {
    this.resetCommandResults();
    this.publish('cadastrarPessoaDraft', value);
  }

  /** draft — replaces the form draft that edits the selected person (id, version, name, countryCode); resets the results of the commands */
  public setSalvarAlteracoesPessoaDraft(value: SalvarAlteracoesPessoaDraft): void {
    this.resetCommandResults();
    this.publish('salvarAlteracoesPessoaDraft', value);
  }

  /** request cadastrarPessoa — registers a new team person from cadastrarPessoaDraft (name and countryCode required); redraws membros (inserts the returned person by id), membro and selectedMembroEquipe (the new person stays in the form), salvarAlteracoesPessoaDraft (filled from the record) and clears cadastrarPessoaDraft; no arguments */
  public async cadastrarPessoa(): Promise<void> {
    if (this.cadastrarPessoaStatus === 'loading') return;
    const draft = this.cadastrarPessoaDraft;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    if (name === null || countryCode === null || isBlank(name) || isBlank(countryCode)) {
      this.publish('cadastrarPessoaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['ui.tarefas.membros_equipe.cadastrarPessoaDraft'] } });
      this.publish('cadastrarPessoaStatus', 'error');
      return;
    }
    this.publish('cadastrarPessoaStatus', 'loading');
    this.publish('cadastrarPessoaError', null);
    const input: Input<'tarefas.membros_equipe.cadastrarPessoa'> = {
      details: { identification: { name: name.trim(), countryCode: countryCode.trim() } },
    };
    try {
      const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.membros_equipe.cadastrarPessoa'>>('tarefas.membros_equipe.cadastrarPessoa', input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.publish('cadastrarPessoaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cadastrarPessoaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cadastrarPessoaError', this.toError(response.error));
        this.publish('cadastrarPessoaStatus', 'error');
        return;
      }
      const created = response.data.membro;
      this.upsertMembro(created);
      this.publish('membro', created);
      this.publish('selectedMembroEquipe', created.id);
      this.publish('salvarAlteracoesPessoaDraft', draftFromMembro(created));
      this.publish('cadastrarPessoaDraft', emptyCadastrarPessoaDraft());
      this.publish('cadastrarPessoaStatus', 'success');
    } catch (error) {
      this.publish('cadastrarPessoaError', this.unexpected(error));
      this.publish('cadastrarPessoaStatus', 'error');
    }
  }

  /** request salvarAlteracoesPessoa — saves the new name and country of the selected person from salvarAlteracoesPessoaDraft (id, version, name, countryCode required; stale version is refused by the backend); redraws membros (updates the row by id), membro (replace) and salvarAlteracoesPessoaDraft (filled again from the returned record with the new version); no arguments */
  public async salvarAlteracoesPessoa(): Promise<void> {
    if (this.salvarAlteracoesPessoaStatus === 'loading') return;
    const draft = this.salvarAlteracoesPessoaDraft;
    const id = draft.id;
    const version = draft.version;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    if (id === null || version === null || name === null || countryCode === null || isBlank(id) || isBlank(name) || isBlank(countryCode)) {
      this.publish('salvarAlteracoesPessoaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['ui.tarefas.membros_equipe.salvarAlteracoesPessoaDraft'] } });
      this.publish('salvarAlteracoesPessoaStatus', 'error');
      return;
    }
    this.publish('salvarAlteracoesPessoaStatus', 'loading');
    this.publish('salvarAlteracoesPessoaError', null);
    const input: Input<'tarefas.membros_equipe.salvarAlteracoesPessoa'> = {
      id,
      version,
      details: { identification: { name: name.trim(), countryCode: countryCode.trim() } },
    };
    try {
      const response = await runBlockingUiAction((signal) => execBff<Output<'tarefas.membros_equipe.salvarAlteracoesPessoa'>>('tarefas.membros_equipe.salvarAlteracoesPessoa', input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.publish('salvarAlteracoesPessoaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('salvarAlteracoesPessoaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('salvarAlteracoesPessoaError', this.toError(response.error));
        this.publish('salvarAlteracoesPessoaStatus', 'error');
        return;
      }
      const saved = response.data.membro;
      this.upsertMembro(saved);
      this.publish('membro', saved);
      this.publish('salvarAlteracoesPessoaDraft', draftFromMembro(saved));
      this.publish('salvarAlteracoesPessoaStatus', 'success');
    } catch (error) {
      this.publish('salvarAlteracoesPessoaError', this.unexpected(error));
      this.publish('salvarAlteracoesPessoaStatus', 'error');
    }
  }

  /** scene — publishes the visible scene of the page (scenary); resets the results of the commands */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }
}
