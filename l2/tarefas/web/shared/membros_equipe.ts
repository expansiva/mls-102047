/// <mls fileReference="_102047_/l2/tarefas/web/shared/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Membros_equipeContracts, PessoaEquipe } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

export type {
  Membros_equipeContracts,
  PessoaEquipe,
  PessoaEquipeDetalhes,
  PessoaEquipeIdentificacao,
  PessoaEquipeBase,
} from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

type Input<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['input'];
type Output<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** One page of the team members list: items plus paging indicators. */
export type PessoasPage = Output<'tarefas.membros_equipe.qryPessoasEquipe'>['pessoas'];

/** Draft of the form that registers a new team member. */
export type CadastrarPessoaDraft = {
  details: {
    identification: {
      name: string | null;
      countryCode: string | null;
    };
  };
};

/** Draft of the form that edits the selected team member (name and country), with the id and version it was read at. */
export type SalvarAlteracoesDraft = {
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
const DATA_KEYS = [
  'ui.tarefas.membros_equipe.pessoas',
  'ui.tarefas.membros_equipe.cmdCadastrarPessoaPessoa',
  'ui.tarefas.membros_equipe.cmdSalvarAlteracoesPessoa',
];
const PAGE_SIZE = 20;
const BUSCA_STORAGE_KEY = 'tarefas.membros_equipe.busca';
const ROUTE_PATH_SUFFIX = '/tarefas/membros_equipe';

function emptyCadastrarPessoaDraft(): CadastrarPessoaDraft {
  return { details: { identification: { name: null, countryCode: null } } };
}

function emptySalvarAlteracoesDraft(): SalvarAlteracoesDraft {
  return { id: null, version: null, details: { identification: { name: null, countryCode: null } } };
}

function unexpectedError(error: unknown): ErrorState {
  return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
}

export class TarefasMembros_equipeShared extends StateLitElement {
  /** state pessoas — the list of team members (id, version, name, status, country, roles, contacts summary) as a page { items, page, pageSize, hasMore }; source qryPessoasEquipe.pessoas; organism pessoasEquipe */
  @property({ attribute: false }) pessoas: PessoasPage | null = null;

  /** state cmdCadastrarPessoaPessoa — the team member just registered; source cmdCadastrarPessoa.pessoa; organism cadastroPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaPessoa: PessoaEquipe | null = null;

  /** state cmdSalvarAlteracoesPessoa — the team member just saved with name and country corrected; source cmdSalvarAlteracoes.pessoa; organism cadastroPessoa */
  @property({ attribute: false }) cmdSalvarAlteracoesPessoa: PessoaEquipe | null = null;

  /** state selectedMembroEquipe — the id of the team member selected in pessoasEquipe (null when none); source entry.params.membroEquipeId; organisms cadastroPessoa, pessoasEquipe; lives in the URL */
  @property({ attribute: false }) selectedMembroEquipe: string | null = null;

  /** state busca — the name fragment that filters pessoasEquipe (null when no filter); source entry.params.busca; organism pessoasEquipe; persisted */
  @property({ attribute: false }) busca: string | null = null;

  /** state cmdCadastrarPessoaDraft — the form draft to register a new team member (name and country); source cmdCadastrarPessoa.input; organism cadastroPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaDraft: CadastrarPessoaDraft = emptyCadastrarPessoaDraft();

  /** state cmdSalvarAlteracoesDraft — the form draft to edit the selected team member (id, version, name and country), filled from the selected record; source cmdSalvarAlteracoes.input; organism cadastroPessoa */
  @property({ attribute: false }) cmdSalvarAlteracoesDraft: SalvarAlteracoesDraft = emptySalvarAlteracoesDraft();

  /** state pageStatus — overall status of the page: idle, loading, empty (no member loaded), success or error; source page load */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryPessoasEquipeStatus — status of the members list request */
  @property({ attribute: false }) qryPessoasEquipeStatus: RequestStatus = 'idle';

  /** state qryPessoasEquipeError — error of the members list request (also client.selectionInvalid when the selected id is not in the list); null when none */
  @property({ attribute: false }) qryPessoasEquipeError: ErrorState = null;

  /** state cmdCadastrarPessoaStatus — status of the register command */
  @property({ attribute: false }) cmdCadastrarPessoaStatus: RequestStatus = 'idle';

  /** state cmdCadastrarPessoaError — error of the register command; null when none */
  @property({ attribute: false }) cmdCadastrarPessoaError: ErrorState = null;

  /** state cmdSalvarAlteracoesStatus — status of the save command */
  @property({ attribute: false }) cmdSalvarAlteracoesStatus: RequestStatus = 'idle';

  /** state cmdSalvarAlteracoesError — error of the save command; null when none */
  @property({ attribute: false }) cmdSalvarAlteracoesError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.membros_equipe.${member}`, value);
    if (member === 'busca') {
      try {
        if (typeof value === 'string' && value !== '') {
          localStorage.setItem(BUSCA_STORAGE_KEY, value);
        } else {
          localStorage.removeItem(BUSCA_STORAGE_KEY);
        }
      } catch (error) {
        void error;
      }
    }
    if (member === 'selectedMembroEquipe') {
      try {
        const url = new URL(window.location.href);
        if (typeof value === 'string' && value !== '') {
          url.searchParams.set('membroEquipeId', value);
        } else {
          url.searchParams.delete('membroEquipeId');
        }
        history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
      } catch (error) {
        void error;
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private onPopState = (): void => {
    if (window.location.pathname.endsWith(ROUTE_PATH_SUFFIX)) {
      this.startVisit();
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();
    for (const key of DATA_KEYS) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    this.applyEntryParams();
    void this.qryPessoasEquipe();
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
    void this.qryPessoasEquipe();
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('qryPessoasEquipeStatus', 'idle');
    this.publish('qryPessoasEquipeError', null);
    this.resetCommandResults();
    this.publish('cmdCadastrarPessoaDraft', emptyCadastrarPessoaDraft());
    this.publish('cmdSalvarAlteracoesDraft', emptySalvarAlteracoesDraft());
  }

  private resetCommandResults(): void {
    this.publish('cmdCadastrarPessoaStatus', 'idle');
    this.publish('cmdCadastrarPessoaError', null);
    this.publish('cmdSalvarAlteracoesStatus', 'idle');
    this.publish('cmdSalvarAlteracoesError', null);
  }

  private applyEntryParams(): void {
    const params = new URLSearchParams(window.location.search);
    let busca: string | null = params.get('busca');
    if (busca === null) {
      try {
        busca = localStorage.getItem(BUSCA_STORAGE_KEY);
      } catch (error) {
        void error;
        busca = null;
      }
    }
    this.publish('busca', busca !== null && busca !== '' ? busca : null);
    const membroEquipeId = params.get('membroEquipeId');
    this.publish('selectedMembroEquipe', membroEquipeId !== null && membroEquipeId !== '' ? membroEquipeId : null);
  }

  /** The selected member record: the row of the loaded list whose id is selectedMembroEquipe; null when nothing is selected or the row is not loaded. Feeds the cadastroPessoa form. */
  public get cadastroPessoa(): PessoaEquipe | null {
    const id = this.selectedMembroEquipe;
    if (id === null || this.pessoas === null) return null;
    const row = this.pessoas.items.find(item => item.id === id);
    return row ?? null;
  }

  private fillSalvarDraft(pessoa: PessoaEquipe): void {
    this.publish('cmdSalvarAlteracoesDraft', {
      id: pessoa.id,
      version: pessoa.version,
      details: {
        identification: {
          name: pessoa.details.identification.name,
          countryCode: pessoa.details.identification.countryCode,
        },
      },
    });
  }

  /** Resolves the selection against the loaded list: fills the save draft from the selected row, or publishes client.selectionInvalid in qryPessoasEquipeError when the id is not in the list. */
  private syncSelection(): void {
    const id = this.selectedMembroEquipe;
    if (id === null) {
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarAlteracoesDraft());
      return;
    }
    const row = this.cadastroPessoa;
    if (row === null) {
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarAlteracoesDraft());
      this.publish('qryPessoasEquipeError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    this.fillSalvarDraft(row);
  }

  private upsertPessoa(pessoa: PessoaEquipe): void {
    const current = this.pessoas;
    if (current === null) return;
    const exists = current.items.some(item => item.id === pessoa.id);
    const items = exists
      ? current.items.map(item => (item.id === pessoa.id ? pessoa : item))
      : [...current.items, pessoa];
    this.publish('pessoas', { items, page: current.page, pageSize: current.pageSize, hasMore: current.hasMore });
  }

  /** select — picks the team member to edit in cadastroPessoa by id (null clears the selection); fills the save draft from the loaded row; an id not in the loaded list publishes client.selectionInvalid in qryPessoasEquipeError */
  public selectMembroEquipe(id: string | null): void {
    this.resetCommandResults();
    this.publish('selectedMembroEquipe', id !== null && id !== '' ? id : null);
    this.publish('qryPessoasEquipeError', null);
    if (this.pessoas === null) {
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarAlteracoesDraft());
      return;
    }
    this.syncSelection();
  }

  /** draft — replaces the register form draft (new member: name and country); clears old command results */
  public setCmdCadastrarPessoaDraft(value: CadastrarPessoaDraft): void {
    this.resetCommandResults();
    this.publish('cmdCadastrarPessoaDraft', value);
  }

  /** draft — replaces the edit form draft (id, version, name and country of the selected member); clears old command results */
  public setCmdSalvarAlteracoesDraft(value: SalvarAlteracoesDraft): void {
    this.resetCommandResults();
    this.publish('cmdSalvarAlteracoesDraft', value);
  }

  /** scene — publishes the visible scene of the page; clears old command results */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** request qryPessoasEquipe — lists the team members (role MembroEquipe), optionally searched by name, paged; redraws pessoas (replace, or append when append is true) and pageStatus; arguments: busca = name fragment (omit to keep the current filter, null or '' clears it; a new value is saved and reloads from the first page), page = page to load (default 1), append = true adds the page to the loaded items ("load more"; does nothing when the list has no more pages) */
  public async qryPessoasEquipe(busca?: string | null, page = 1, append = false): Promise<void> {
    if (this.qryPessoasEquipeStatus === 'loading') return;
    if (append && (this.pessoas === null || !this.pessoas.hasMore)) return;
    if (busca !== undefined) {
      this.publish('busca', busca !== null && busca !== '' ? busca : null);
    }
    this.publish('qryPessoasEquipeStatus', 'loading');
    this.publish('qryPessoasEquipeError', null);
    if (!append) this.publish('pageStatus', 'loading');
    try {
      const currentBusca = this.busca;
      const input: Input<'tarefas.membros_equipe.qryPessoasEquipe'> = {
        page,
        pageSize: PAGE_SIZE,
        ...(currentBusca !== null && currentBusca !== '' ? { busca: currentBusca } : {}),
      };
      const response = await execBff<Output<'tarefas.membros_equipe.qryPessoasEquipe'>>(
        'tarefas.membros_equipe.qryPessoasEquipe',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('qryPessoasEquipeError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('qryPessoasEquipeStatus', 'error');
        if (!append) this.publish('pageStatus', 'error');
        return;
      }
      const received = response.data.pessoas;
      const previous = this.pessoas;
      const items = append && previous !== null ? [...previous.items, ...received.items] : received.items;
      this.publish('pessoas', {
        items,
        page: received.page,
        pageSize: received.pageSize,
        hasMore: received.hasMore,
      });
      this.publish('qryPessoasEquipeStatus', 'success');
      this.publish('pageStatus', items.length === 0 ? 'empty' : 'success');
      if (!append) this.syncSelection();
    } catch (error) {
      this.publish('qryPessoasEquipeError', unexpectedError(error));
      this.publish('qryPessoasEquipeStatus', 'error');
      if (!append) this.publish('pageStatus', 'error');
    }
  }

  /** request cmdCadastrarPessoa — registers a new team member with the role MembroEquipe from cmdCadastrarPessoaDraft (name and country required); redraws cmdCadastrarPessoaPessoa (replace), inserts the person in pessoas (upsert by id) and resets the register draft; takes no arguments */
  public async cmdCadastrarPessoa(): Promise<void> {
    if (this.cmdCadastrarPessoaStatus === 'loading') return;
    const identification = this.cmdCadastrarPessoaDraft.details.identification;
    const name = identification.name;
    const countryCode = identification.countryCode;
    if (name === null || name.trim() === '' || countryCode === null || countryCode.trim() === '') {
      this.publish('cmdCadastrarPessoaError', {
        code: 'client.requiredMissing',
        message: '',
        details: {
          stateKeys: [
            'cmdCadastrarPessoaDraft.details.identification.name',
            'cmdCadastrarPessoaDraft.details.identification.countryCode',
          ],
        },
      });
      this.publish('cmdCadastrarPessoaStatus', 'error');
      return;
    }
    this.publish('cmdCadastrarPessoaStatus', 'loading');
    this.publish('cmdCadastrarPessoaError', null);
    try {
      const input: Input<'tarefas.membros_equipe.cmdCadastrarPessoa'> = {
        details: { identification: { name, countryCode } },
      };
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.membros_equipe.cmdCadastrarPessoa'>>(
          'tarefas.membros_equipe.cmdCadastrarPessoa',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('cmdCadastrarPessoaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cmdCadastrarPessoaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cmdCadastrarPessoaError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('cmdCadastrarPessoaStatus', 'error');
        return;
      }
      const pessoa = response.data.pessoa;
      this.publish('cmdCadastrarPessoaPessoa', pessoa);
      this.upsertPessoa(pessoa);
      this.publish('cmdCadastrarPessoaDraft', emptyCadastrarPessoaDraft());
      this.publish('cmdCadastrarPessoaStatus', 'success');
    } catch (error) {
      this.publish('cmdCadastrarPessoaError', unexpectedError(error));
      this.publish('cmdCadastrarPessoaStatus', 'error');
    }
  }

  /** request cmdSalvarAlteracoes — saves the corrected name and country of the selected team member from cmdSalvarAlteracoesDraft (id, version, name and country required; refused by the backend when the version is stale); redraws cmdSalvarAlteracoesPessoa (replace), updates the row in pessoas (upsert by id) and refills the edit draft from the saved record; takes no arguments */
  public async cmdSalvarAlteracoes(): Promise<void> {
    if (this.cmdSalvarAlteracoesStatus === 'loading') return;
    const draft = this.cmdSalvarAlteracoesDraft;
    const id = draft.id;
    const version = draft.version;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    if (
      id === null ||
      id === '' ||
      version === null ||
      name === null ||
      name.trim() === '' ||
      countryCode === null ||
      countryCode.trim() === ''
    ) {
      this.publish('cmdSalvarAlteracoesError', {
        code: 'client.requiredMissing',
        message: '',
        details: {
          stateKeys: [
            'cmdSalvarAlteracoesDraft.id',
            'cmdSalvarAlteracoesDraft.version',
            'cmdSalvarAlteracoesDraft.details.identification.name',
            'cmdSalvarAlteracoesDraft.details.identification.countryCode',
          ],
        },
      });
      this.publish('cmdSalvarAlteracoesStatus', 'error');
      return;
    }
    this.publish('cmdSalvarAlteracoesStatus', 'loading');
    this.publish('cmdSalvarAlteracoesError', null);
    try {
      const input: Input<'tarefas.membros_equipe.cmdSalvarAlteracoes'> = {
        id,
        version,
        details: { identification: { name, countryCode } },
      };
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'tarefas.membros_equipe.cmdSalvarAlteracoes'>>(
          'tarefas.membros_equipe.cmdSalvarAlteracoes',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('cmdSalvarAlteracoesError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('cmdSalvarAlteracoesStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('cmdSalvarAlteracoesError', response.error ?? { code: 'client.unexpected', message: '' });
        this.publish('cmdSalvarAlteracoesStatus', 'error');
        return;
      }
      const pessoa = response.data.pessoa;
      this.publish('cmdSalvarAlteracoesPessoa', pessoa);
      this.upsertPessoa(pessoa);
      this.fillSalvarDraft(pessoa);
      this.publish('cmdSalvarAlteracoesStatus', 'success');
    } catch (error) {
      this.publish('cmdSalvarAlteracoesError', unexpectedError(error));
      this.publish('cmdSalvarAlteracoesStatus', 'error');
    }
  }
}
