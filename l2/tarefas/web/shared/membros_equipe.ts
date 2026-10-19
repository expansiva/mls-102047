/// <mls fileReference="_102047_/l2/tarefas/web/shared/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Membros_equipeContracts, PessoaEquipe, PessoaEquipeDetalhes, PessoaEquipeIdentificacao, PessoaEquipeBase } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

export type { Membros_equipeContracts, PessoaEquipe, PessoaEquipeDetalhes, PessoaEquipeIdentificacao, PessoaEquipeBase } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

type Input<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['input'];
type Output<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** One page of the team list, as the query returns it. */
export type PessoasPage = Output<'tarefas.membros_equipe.qryPessoasEquipe'>['pessoas'];

/** Draft of the register form (new person); every leaf is null until typed. */
export type CadastrarPessoaDraft = {
  details: { identification: { name: string | null; countryCode: string | null } };
};

/** Draft of the edit form (selected person); id and version come from the selected record. */
export type SalvarAlteracoesDraft = {
  id: string | null;
  version: number | null;
  details: { identification: { name: string | null; countryCode: string | null } };
};

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

type StateMember =
  | 'pessoas'
  | 'cmdCadastrarPessoaPessoa'
  | 'cmdSalvarAlteracoesPessoa'
  | 'selectedMembroEquipe'
  | 'busca'
  | 'cmdCadastrarPessoaDraft'
  | 'cmdSalvarAlteracoesDraft'
  | 'pageStatus'
  | 'qryPessoasEquipeStatus'
  | 'qryPessoasEquipeError'
  | 'cmdCadastrarPessoaStatus'
  | 'cmdCadastrarPessoaError'
  | 'cmdSalvarAlteracoesStatus'
  | 'cmdSalvarAlteracoesError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.membros_equipe.pessoas': 'pessoas',
  'ui.tarefas.membros_equipe.cmdCadastrarPessoaPessoa': 'cmdCadastrarPessoaPessoa',
  'ui.tarefas.membros_equipe.cmdSalvarAlteracoesPessoa': 'cmdSalvarAlteracoesPessoa',
  'ui.tarefas.membros_equipe.selectedMembroEquipe': 'selectedMembroEquipe',
  'ui.tarefas.membros_equipe.busca': 'busca',
  'ui.tarefas.membros_equipe.cmdCadastrarPessoaDraft': 'cmdCadastrarPessoaDraft',
  'ui.tarefas.membros_equipe.cmdSalvarAlteracoesDraft': 'cmdSalvarAlteracoesDraft',
  'ui.tarefas.membros_equipe.pageStatus': 'pageStatus',
  'ui.tarefas.membros_equipe.qryPessoasEquipeStatus': 'qryPessoasEquipeStatus',
  'ui.tarefas.membros_equipe.qryPessoasEquipeError': 'qryPessoasEquipeError',
  'ui.tarefas.membros_equipe.cmdCadastrarPessoaStatus': 'cmdCadastrarPessoaStatus',
  'ui.tarefas.membros_equipe.cmdCadastrarPessoaError': 'cmdCadastrarPessoaError',
  'ui.tarefas.membros_equipe.cmdSalvarAlteracoesStatus': 'cmdSalvarAlteracoesStatus',
  'ui.tarefas.membros_equipe.cmdSalvarAlteracoesError': 'cmdSalvarAlteracoesError',
  'ui.tarefas.membros_equipe.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PAGE_SIZE = 20;
const STORAGE_PREFIX = 'tarefas.membros_equipe.';

function emptyCadastrarDraft(): CadastrarPessoaDraft {
  return { details: { identification: { name: null, countryCode: null } } };
}

function emptySalvarDraft(): SalvarAlteracoesDraft {
  return { id: null, version: null, details: { identification: { name: null, countryCode: null } } };
}

function salvarDraftFromPessoa(pessoa: PessoaEquipe): SalvarAlteracoesDraft {
  return {
    id: pessoa.id,
    version: pessoa.version,
    details: {
      identification: {
        name: pessoa.details.identification.name,
        countryCode: pessoa.details.identification.countryCode,
      },
    },
  };
}

function readParam(name: string): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get(name);
  if (fromUrl !== null) return fromUrl;
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${name}`);
  } catch {
    return null;
  }
}

function isFilled(value: string | null): value is string {
  return value !== null && value.trim() !== '';
}

export class TarefasMembros_equipeShared extends StateLitElement {
  /** state pessoas — the page of team members (identification, registry status, roles, contacts summary); source qryPessoasEquipe.pessoas; organism pessoasEquipe */
  @property({ attribute: false }) pessoas: PessoasPage | null = null;

  /** state cmdCadastrarPessoaPessoa — the member just registered by cmdCadastrarPessoa; source cmdCadastrarPessoa.pessoa; organism cadastroPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaPessoa: PessoaEquipe | null = null;

  /** state cmdSalvarAlteracoesPessoa — the member just updated by cmdSalvarAlteracoes; source cmdSalvarAlteracoes.pessoa; organism cadastroPessoa */
  @property({ attribute: false }) cmdSalvarAlteracoesPessoa: PessoaEquipe | null = null;

  /** state selectedMembroEquipe — the id of the MembroEquipe selected in pessoasEquipe (the record is the getter cadastroPessoa); source entry.params.membroEquipeId; organism cadastroPessoa, pessoasEquipe */
  @property({ attribute: false }) selectedMembroEquipe: string | null = null;

  /** state busca — the name search text that filters pessoasEquipe; null means no filter; source entry.params.busca; organism pessoasEquipe; persisted */
  @property({ attribute: false }) busca: string | null = null;

  /** state cmdCadastrarPessoaDraft — draft of the register form (name and country of a new person); source cmdCadastrarPessoa.input; organism cadastroPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaDraft: CadastrarPessoaDraft = emptyCadastrarDraft();

  /** state cmdSalvarAlteracoesDraft — draft of the edit form, prefilled from the selected member (id, version, name, country); source cmdSalvarAlteracoes.input; organism cadastroPessoa */
  @property({ attribute: false }) cmdSalvarAlteracoesDraft: SalvarAlteracoesDraft = emptySalvarDraft();

  /** state pageStatus — overall page status: idle, loading, empty (no member loaded), success or error; written only by the initial/list load */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryPessoasEquipeStatus — status of the team list request */
  @property({ attribute: false }) qryPessoasEquipeStatus: RequestStatus = 'idle';

  /** state qryPessoasEquipeError — error of the team list request (also client.selectionInvalid when the selected id is not in the list) */
  @property({ attribute: false }) qryPessoasEquipeError: ErrorState = null;

  /** state cmdCadastrarPessoaStatus — status of the register command */
  @property({ attribute: false }) cmdCadastrarPessoaStatus: RequestStatus = 'idle';

  /** state cmdCadastrarPessoaError — error of the register command */
  @property({ attribute: false }) cmdCadastrarPessoaError: ErrorState = null;

  /** state cmdSalvarAlteracoesStatus — status of the save-changes command */
  @property({ attribute: false }) cmdSalvarAlteracoesStatus: RequestStatus = 'idle';

  /** state cmdSalvarAlteracoesError — error of the save-changes command */
  @property({ attribute: false }) cmdSalvarAlteracoesError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.membros_equipe.${member}`, value);
    if (member === 'busca') {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem(`${STORAGE_PREFIX}busca`);
        } else {
          localStorage.setItem(`${STORAGE_PREFIX}busca`, String(value));
        }
      } catch {
        // storage unavailable: the filter simply is not persisted
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private hydrateData(): void {
    const keys = [
      'ui.tarefas.membros_equipe.pessoas',
      'ui.tarefas.membros_equipe.cmdCadastrarPessoaPessoa',
      'ui.tarefas.membros_equipe.cmdSalvarAlteracoesPessoa',
    ];
    for (const key of keys) {
      const value = getState(key);
      if (value !== undefined) this.assignState(key, value);
    }
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('qryPessoasEquipeStatus', 'idle');
    this.publish('qryPessoasEquipeError', null);
    this.publish('cmdCadastrarPessoaStatus', 'idle');
    this.publish('cmdCadastrarPessoaError', null);
    this.publish('cmdSalvarAlteracoesStatus', 'idle');
    this.publish('cmdSalvarAlteracoesError', null);
    this.publish('cmdCadastrarPessoaDraft', emptyCadastrarDraft());
    this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
  }

  private resetCommandResults(): void {
    this.publish('cmdCadastrarPessoaStatus', 'idle');
    this.publish('cmdCadastrarPessoaError', null);
    this.publish('cmdSalvarAlteracoesStatus', 'idle');
    this.publish('cmdSalvarAlteracoesError', null);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.hydrateData();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    const rawBusca = readParam('busca');
    this.publish('busca', isFilled(rawBusca) ? rawBusca : null);
    const rawId = readParam('membroEquipeId');
    this.publish('selectedMembroEquipe', isFilled(rawId) ? rawId : null);
    void this.qryPessoasEquipe(this.busca, 1, false);
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

  /** The selected member record: the row of the loaded list whose id is selectedMembroEquipe; null when nothing is selected or the row is not loaded. */
  public get cadastroPessoa(): PessoaEquipe | null {
    const id = this.selectedMembroEquipe;
    if (id === null || !this.pessoas) return null;
    return this.pessoas.items.find((item) => item.id === id) ?? null;
  }

  /** scene — publishes the visible scene of the page (any string; '' for none). */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the register form draft (name and country of a new person). */
  public setCmdCadastrarPessoaDraft(value: CadastrarPessoaDraft): void {
    this.resetCommandResults();
    this.publish('cmdCadastrarPessoaDraft', value);
  }

  /** draft — replaces the edit form draft (id and version come from the selected member; name and country are typed). */
  public setCmdSalvarAlteracoesDraft(value: SalvarAlteracoesDraft): void {
    this.resetCommandResults();
    this.publish('cmdSalvarAlteracoesDraft', value);
  }

  /** select — selects the member to edit by id (null clears); the edit draft is prefilled from the loaded row; an id with no loaded row publishes client.selectionInvalid in qryPessoasEquipeError. */
  public selectMembroEquipe(id: string | null): void {
    this.resetCommandResults();
    if (id === null || id === '') {
      this.publish('selectedMembroEquipe', null);
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
      return;
    }
    this.publish('selectedMembroEquipe', id);
    if (!this.pessoas) {
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
      return;
    }
    this.applySelection();
  }

  /** Fills the edit draft from the selected row; false (and selectionInvalid error) when the id has no loaded row. */
  private applySelection(): boolean {
    const id = this.selectedMembroEquipe;
    if (id === null) return true;
    const row = this.cadastroPessoa;
    if (!row) {
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
      this.publish('qryPessoasEquipeError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('qryPessoasEquipeStatus', 'error');
      return false;
    }
    this.publish('cmdSalvarAlteracoesDraft', salvarDraftFromPessoa(row));
    return true;
  }

  private upsertPessoa(pessoa: PessoaEquipe): void {
    if (!this.pessoas) return;
    const exists = this.pessoas.items.some((item) => item.id === pessoa.id);
    const items = exists
      ? this.pessoas.items.map((item) => (item.id === pessoa.id ? pessoa : item))
      : [...this.pessoas.items, pessoa];
    this.publish('pessoas', { ...this.pessoas, items });
  }

  /** request qryPessoasEquipe — lists the team members (role tarefas.MembroEquipe) one page at a time, optionally filtered by name; redraws pessoas (replace, or append when append is true; append does nothing when there is no more), selects the row of selectedMembroEquipe and fills the edit draft; busca: name fragment (null or '' clears the filter, omit to keep the current one; a new value is published and persisted); page: page to load (default 1); append: true adds the page to the loaded items ("load more"). Also the method to reload, filter and page. */
  public async qryPessoasEquipe(busca: string | null = this.busca, page = 1, append = false): Promise<void> {
    if (this.qryPessoasEquipeStatus === 'loading') return;
    const nextBusca = isFilled(busca) ? busca : null;
    if (append && this.pessoas && !this.pessoas.hasMore) return;
    if (nextBusca !== this.busca) this.publish('busca', nextBusca);
    this.publish('qryPessoasEquipeStatus', 'loading');
    this.publish('qryPessoasEquipeError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'tarefas.membros_equipe.qryPessoasEquipe'> = {
      ...(nextBusca !== null ? { busca: nextBusca } : {}),
      page,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'tarefas.membros_equipe.qryPessoasEquipe'>>('tarefas.membros_equipe.qryPessoasEquipe', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryPessoasEquipeError', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        this.publish('qryPessoasEquipeStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.pessoas;
      const current = this.pessoas;
      if (append && current) {
        this.publish('pessoas', {
          items: [...current.items, ...loaded.items],
          page: loaded.page,
          pageSize: loaded.pageSize,
          hasMore: loaded.hasMore,
        });
      } else {
        this.publish('pessoas', loaded);
      }
      this.publish('pageStatus', loaded.items.length === 0 && !(append && current && current.items.length > 0) ? 'empty' : 'success');
      this.publish('qryPessoasEquipeStatus', 'success');
      this.applySelection();
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('qryPessoasEquipeError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('qryPessoasEquipeStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request cmdCadastrarPessoa — registers a new team member (name and country from cmdCadastrarPessoaDraft; both required); redraws cmdCadastrarPessoaPessoa (replace) and upserts the returned person by id into pessoas, then empties the register draft; takes no arguments. */
  public async cmdCadastrarPessoa(): Promise<void> {
    if (this.cmdCadastrarPessoaStatus === 'loading') return;
    const name = this.cmdCadastrarPessoaDraft.details.identification.name;
    const countryCode = this.cmdCadastrarPessoaDraft.details.identification.countryCode;
    this.publish('cmdCadastrarPessoaStatus', 'loading');
    this.publish('cmdCadastrarPessoaError', null);
    if (!isFilled(name) || !isFilled(countryCode)) {
      this.publish('cmdCadastrarPessoaError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.tarefas.membros_equipe.cmdCadastrarPessoaDraft'] },
      });
      this.publish('cmdCadastrarPessoaStatus', 'error');
      return;
    }
    const input: Input<'tarefas.membros_equipe.cmdCadastrarPessoa'> = {
      details: { identification: { name, countryCode } },
    };
    try {
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.membros_equipe.cmdCadastrarPessoa'>>('tarefas.membros_equipe.cmdCadastrarPessoa', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('cmdCadastrarPessoaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cmdCadastrarPessoaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cmdCadastrarPessoaError', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        this.publish('cmdCadastrarPessoaStatus', 'error');
        return;
      }
      const pessoa = response.data.pessoa;
      this.publish('cmdCadastrarPessoaPessoa', pessoa);
      this.upsertPessoa(pessoa);
      this.publish('cmdCadastrarPessoaDraft', emptyCadastrarDraft());
      this.publish('cmdCadastrarPessoaStatus', 'success');
    } catch (error) {
      const name2 = error instanceof Error ? error.name : 'unknown';
      this.publish('cmdCadastrarPessoaError', { code: 'client.unexpected', message: '', details: { name: name2 } });
      this.publish('cmdCadastrarPessoaStatus', 'error');
    }
  }

  /** request cmdSalvarAlteracoes — corrects name and country of the selected member (id, version, name and country come from cmdSalvarAlteracoesDraft, prefilled by selectMembroEquipe; all required); redraws cmdSalvarAlteracoesPessoa (replace) and upserts the returned person by id into pessoas (so the selection shows the new version), then refills the edit draft from the returned record; takes no arguments. */
  public async cmdSalvarAlteracoes(): Promise<void> {
    if (this.cmdSalvarAlteracoesStatus === 'loading') return;
    const draft = this.cmdSalvarAlteracoesDraft;
    const id = draft.id;
    const version = draft.version;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    this.publish('cmdSalvarAlteracoesStatus', 'loading');
    this.publish('cmdSalvarAlteracoesError', null);
    if (!isFilled(id) || version === null || !isFilled(name) || !isFilled(countryCode)) {
      this.publish('cmdSalvarAlteracoesError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.tarefas.membros_equipe.cmdSalvarAlteracoesDraft'] },
      });
      this.publish('cmdSalvarAlteracoesStatus', 'error');
      return;
    }
    const input: Input<'tarefas.membros_equipe.cmdSalvarAlteracoes'> = {
      id,
      version,
      details: { identification: { name, countryCode } },
    };
    try {
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.membros_equipe.cmdSalvarAlteracoes'>>('tarefas.membros_equipe.cmdSalvarAlteracoes', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('cmdSalvarAlteracoesError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cmdSalvarAlteracoesStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cmdSalvarAlteracoesError', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        this.publish('cmdSalvarAlteracoesStatus', 'error');
        return;
      }
      const pessoa = response.data.pessoa;
      this.publish('cmdSalvarAlteracoesPessoa', pessoa);
      this.upsertPessoa(pessoa);
      this.publish('cmdSalvarAlteracoesDraft', salvarDraftFromPessoa(pessoa));
      this.publish('cmdSalvarAlteracoesStatus', 'success');
    } catch (error) {
      const name2 = error instanceof Error ? error.name : 'unknown';
      this.publish('cmdSalvarAlteracoesError', { code: 'client.unexpected', message: '', details: { name: name2 } });
      this.publish('cmdSalvarAlteracoesStatus', 'error');
    }
  }
}
