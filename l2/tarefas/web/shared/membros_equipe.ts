/// <mls fileReference="_102047_/l2/tarefas/web/shared/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Membros_equipeContracts, PessoaEquipe } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

export type { Membros_equipeContracts, PessoaEquipe, PessoaEquipeDetalhes, PessoaEquipeIdentificacao, PessoaEquipeBase } from '/_102047_/l2/tarefas/web/contracts/membros_equipe.defs.js';

type Input<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['input'];
type Output<R extends keyof Membros_equipeContracts> = Membros_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type PessoasPage = Output<'tarefas.membros_equipe.qryPessoasEquipe'>['pessoas'];

/** Draft of the new person form (command cmdCadastrarPessoa); every leaf is null until typed. */
export type CmdCadastrarPessoaDraft = {
  details: { identification: { name: string | null; countryCode: string | null } };
};

/** Draft of the edit form (command cmdSalvarAlteracoes); filled from the selected person, with the version read. */
export type CmdSalvarAlteracoesDraft = {
  id: string | null;
  version: number | null;
  details: { identification: { name: string | null; countryCode: string | null } };
};

function emptyCadastrarDraft(): CmdCadastrarPessoaDraft {
  return { details: { identification: { name: null, countryCode: null } } };
}

function emptySalvarDraft(): CmdSalvarAlteracoesDraft {
  return { id: null, version: null, details: { identification: { name: null, countryCode: null } } };
}

function draftFromPessoa(pessoa: PessoaEquipe): CmdSalvarAlteracoesDraft {
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

const BUSCA_STORAGE_KEY = 'tarefas.membros_equipe.busca';
const PAGE_SIZE = 20;

export class TarefasMembros_equipeShared extends StateLitElement {
  /** state pessoas — the list of team members (id, version, name, status, country, roles, contacts summary) as a page { items, page, pageSize, hasMore }; source qryPessoasEquipe.pessoas; organism pessoasEquipe */
  @property({ attribute: false }) pessoas: PessoasPage | null = null;

  /** state cmdCadastrarPessoaPessoa — the team member just registered by cmdCadastrarPessoa; source cmdCadastrarPessoa.pessoa; organism cadastroPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaPessoa: PessoaEquipe | null = null;

  /** state cmdSalvarAlteracoesPessoa — the team member just saved by cmdSalvarAlteracoes; source cmdSalvarAlteracoes.pessoa; organism cadastroPessoa */
  @property({ attribute: false }) cmdSalvarAlteracoesPessoa: PessoaEquipe | null = null;

  /** state selectedMembroEquipe — the id of the MembroEquipe selected in pessoasEquipe (the record is the getter cadastroPessoa); source entry.params.membroEquipeId; organism cadastroPessoa, pessoasEquipe */
  @property({ attribute: false }) selectedMembroEquipe: string | null = null;

  /** state busca — name search text that filters pessoasEquipe; source entry.params.busca; organism pessoasEquipe; persisted */
  @property({ attribute: false }) busca: string | null = null;

  /** state cmdCadastrarPessoaDraft — draft of the new person form (name, country); source cmdCadastrarPessoa.input; organism cadastroPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaDraft: CmdCadastrarPessoaDraft = emptyCadastrarDraft();

  /** state cmdSalvarAlteracoesDraft — draft of the edit form (id, version, name, country), filled from the selected person; source cmdSalvarAlteracoes.input; organism cadastroPessoa */
  @property({ attribute: false }) cmdSalvarAlteracoesDraft: CmdSalvarAlteracoesDraft = emptySalvarDraft();

  /** state pageStatus — overall status of the page load: idle, loading, empty, success or error; source qryPessoasEquipe */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryPessoasEquipeStatus — status of the list request; source qryPessoasEquipe */
  @property({ attribute: false }) qryPessoasEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state qryPessoasEquipeError — error of the list request (also client.selectionInvalid); source qryPessoasEquipe */
  @property({ attribute: false }) qryPessoasEquipeError: ErrorState = null;

  /** state cmdCadastrarPessoaStatus — status of the register command; source cmdCadastrarPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state cmdCadastrarPessoaError — error of the register command; source cmdCadastrarPessoa */
  @property({ attribute: false }) cmdCadastrarPessoaError: ErrorState = null;

  /** state cmdSalvarAlteracoesStatus — status of the save command; source cmdSalvarAlteracoes */
  @property({ attribute: false }) cmdSalvarAlteracoesStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state cmdSalvarAlteracoesError — error of the save command; source cmdSalvarAlteracoes */
  @property({ attribute: false }) cmdSalvarAlteracoesError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private subscribed = false;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.membros_equipe.${member}`, value);
    if (member === 'busca') {
      try {
        if (value === null) {
          localStorage.removeItem(BUSCA_STORAGE_KEY);
        } else {
          localStorage.setItem(BUSCA_STORAGE_KEY, String(value));
        }
      } catch {
        // storage unavailable
      }
    }
    if (member === 'selectedMembroEquipe') {
      try {
        const url = new URL(window.location.href);
        if (value === null) {
          url.searchParams.delete('membroEquipeId');
        } else {
          url.searchParams.set('membroEquipeId', String(value));
        }
        history.replaceState(null, '', url.toString());
      } catch {
        // URL not writable
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  /** Selected person: the row of the loaded list whose id is selectedMembroEquipe, or null. */
  public get cadastroPessoa(): PessoaEquipe | null {
    const id = this.selectedMembroEquipe;
    if (id === null || this.pessoas === null) return null;
    const row = this.pessoas.items.find(item => item.id === id);
    return row ?? null;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const pessoas = getState('ui.tarefas.membros_equipe.pessoas');
    if (pessoas !== undefined) this.assignState('ui.tarefas.membros_equipe.pessoas', pessoas);
    const cadastrada = getState('ui.tarefas.membros_equipe.cmdCadastrarPessoaPessoa');
    if (cadastrada !== undefined) this.assignState('ui.tarefas.membros_equipe.cmdCadastrarPessoaPessoa', cadastrada);
    const salva = getState('ui.tarefas.membros_equipe.cmdSalvarAlteracoesPessoa');
    if (salva !== undefined) this.assignState('ui.tarefas.membros_equipe.cmdSalvarAlteracoesPessoa', salva);
    this.resetVisit();
    if (!this.subscribed) {
      subscribe([...STATE_KEYS], this);
      this.subscribed = true;
    }
    const entry = this.applyEntryParams();
    void this.initialLoad(entry.membroEquipeId);
  }

  public disconnectedCallback(): void {
    unsubscribe([...STATE_KEYS], this);
    this.subscribed = false;
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!STATE_MEMBER_BY_KEY[key]) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('qryPessoasEquipeStatus', 'idle');
    this.publish('qryPessoasEquipeError', null);
    this.publish('cmdCadastrarPessoaStatus', 'idle');
    this.publish('cmdCadastrarPessoaError', null);
    this.publish('cmdSalvarAlteracoesStatus', 'idle');
    this.publish('cmdSalvarAlteracoesError', null);
    this.publish('cmdCadastrarPessoaDraft', emptyCadastrarDraft());
    this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('cmdCadastrarPessoaStatus', 'idle');
    this.publish('cmdCadastrarPessoaError', null);
    this.publish('cmdSalvarAlteracoesStatus', 'idle');
    this.publish('cmdSalvarAlteracoesError', null);
  }

  private applyEntryParams(): { membroEquipeId: string | null } {
    const search = new URLSearchParams(window.location.search);
    let busca: string | null = search.get('busca');
    if (busca === null) {
      try {
        busca = localStorage.getItem(BUSCA_STORAGE_KEY);
      } catch {
        busca = null;
      }
    }
    this.publish('busca', busca !== null && busca !== '' ? busca : null);
    const rawId = search.get('membroEquipeId');
    const membroEquipeId = rawId !== null && rawId !== '' ? rawId : null;
    this.publish('selectedMembroEquipe', membroEquipeId);
    return { membroEquipeId };
  }

  private async initialLoad(membroEquipeId: string | null): Promise<void> {
    await this.qryPessoasEquipe();
    if (this.qryPessoasEquipeStatus !== 'success') return;
    if (membroEquipeId !== null) this.applySelection(membroEquipeId);
  }

  private applySelection(id: string | null): void {
    if (id === null) {
      this.publish('selectedMembroEquipe', null);
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
      return;
    }
    const row = this.pessoas ? this.pessoas.items.find(item => item.id === id) : undefined;
    if (!row) {
      this.publish('selectedMembroEquipe', null);
      this.publish('cmdSalvarAlteracoesDraft', emptySalvarDraft());
      this.publish('qryPessoasEquipeError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    this.publish('selectedMembroEquipe', id);
    this.publish('cmdSalvarAlteracoesDraft', draftFromPessoa(row));
  }

  private upsertPessoa(pessoa: PessoaEquipe): void {
    const current = this.pessoas;
    if (current === null) return;
    const exists = current.items.some(item => item.id === pessoa.id);
    const items = exists
      ? current.items.map(item => (item.id === pessoa.id ? pessoa : item))
      : [...current.items, pessoa];
    this.publish('pessoas', { ...current, items });
  }

  /** scene — publishes the visible scene of the page (no backend call); clears the results of the commands */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the new person form (name and country the person types); clears the results of the commands */
  public setCmdCadastrarPessoaDraft(value: CmdCadastrarPessoaDraft): void {
    this.resetCommandResults();
    this.publish('cmdCadastrarPessoaDraft', value);
  }

  /** draft — replaces the draft of the edit form (name and country of the selected person, id and version come from the record); clears the results of the commands */
  public setCmdSalvarAlteracoesDraft(value: CmdSalvarAlteracoesDraft): void {
    this.resetCommandResults();
    this.publish('cmdSalvarAlteracoesDraft', value);
  }

  /** select — selects the person with this id in pessoasEquipe (null clears it) and fills the edit draft from that row; an id that is not in the loaded list publishes client.selectionInvalid in qryPessoasEquipeError; id: the person id or null */
  public selectMembroEquipe(id: string | null): void {
    this.resetCommandResults();
    this.applySelection(id);
  }

  /** request qryPessoasEquipe — lists the team members (role MembroEquipe), optionally searched by name, paged; redraws pessoas (replace, or append more items when append is true); also the method to reload, to search and to page; busca: new search text (omit to keep the current one, empty or null clears it and loads from the first page); page: page to load (default 1); append: true adds the page to the current items (load more) and does nothing when hasMore is false */
  public async qryPessoasEquipe(busca?: string | null, page = 1, append = false): Promise<void> {
    if (this.qryPessoasEquipeStatus === 'loading') return;
    if (busca !== undefined) {
      this.publish('busca', busca !== null && busca !== '' ? busca : null);
    }
    if (append && (this.pessoas === null || !this.pessoas.hasMore)) return;
    this.publish('qryPessoasEquipeStatus', 'loading');
    this.publish('qryPessoasEquipeError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const currentBusca = this.busca;
    const input: Input<'tarefas.membros_equipe.qryPessoasEquipe'> = {
      page,
      pageSize: PAGE_SIZE,
      ...(currentBusca !== null && currentBusca !== '' ? { busca: currentBusca } : {}),
    };
    try {
      const response = await execBff<Output<'tarefas.membros_equipe.qryPessoasEquipe'>>(
        'tarefas.membros_equipe.qryPessoasEquipe',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('qryPessoasEquipeError', response.error);
        this.publish('qryPessoasEquipeStatus', 'error');
        if (!append) this.publish('pageStatus', 'error');
        return;
      }
      const incoming = response.data.pessoas;
      const current = this.pessoas;
      if (append && current !== null) {
        this.publish('pessoas', {
          items: [...current.items, ...incoming.items],
          page: incoming.page,
          pageSize: incoming.pageSize,
          hasMore: incoming.hasMore,
        });
      } else {
        this.publish('pessoas', incoming);
      }
      this.publish('qryPessoasEquipeStatus', 'success');
      const loaded = this.pessoas;
      this.publish('pageStatus', loaded !== null && loaded.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'Error';
      this.publish('qryPessoasEquipeError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('qryPessoasEquipeStatus', 'error');
      if (!append) this.publish('pageStatus', 'error');
    }
  }

  /** request cmdCadastrarPessoa — registers a new person in the team with the MembroEquipe role, from cmdCadastrarPessoaDraft (name, country); redraws cmdCadastrarPessoaPessoa (replace), pessoas (upsert by id) and empties the draft; takes no arguments */
  public async cmdCadastrarPessoa(): Promise<void> {
    const draft = this.cmdCadastrarPessoaDraft;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    if (name === null || name.trim() === '' || countryCode === null || countryCode.trim() === '') {
      const stateKeys: string[] = [];
      if (name === null || name.trim() === '') stateKeys.push('cmdCadastrarPessoaDraft.details.identification.name');
      if (countryCode === null || countryCode.trim() === '') stateKeys.push('cmdCadastrarPessoaDraft.details.identification.countryCode');
      this.publish('cmdCadastrarPessoaError', { code: 'client.requiredMissing', message: '', details: { stateKeys } });
      this.publish('cmdCadastrarPessoaStatus', 'error');
      return;
    }
    this.publish('cmdCadastrarPessoaStatus', 'loading');
    this.publish('cmdCadastrarPessoaError', null);
    const input: Input<'tarefas.membros_equipe.cmdCadastrarPessoa'> = {
      details: { identification: { name, countryCode } },
    };
    try {
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
        this.publish('cmdCadastrarPessoaError', response.error);
        this.publish('cmdCadastrarPessoaStatus', 'error');
        return;
      }
      const pessoa = response.data.pessoa;
      this.publish('cmdCadastrarPessoaPessoa', pessoa);
      this.upsertPessoa(pessoa);
      this.publish('cmdCadastrarPessoaDraft', emptyCadastrarDraft());
      this.publish('cmdCadastrarPessoaStatus', 'success');
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'Error';
      this.publish('cmdCadastrarPessoaError', { code: 'client.unexpected', message: '', details: { name: errorName } });
      this.publish('cmdCadastrarPessoaStatus', 'error');
    }
  }

  /** request cmdSalvarAlteracoes — corrects the name and country of the selected person, from cmdSalvarAlteracoesDraft (id and version come from the selected record); redraws cmdSalvarAlteracoesPessoa (replace), pessoas (upsert by id, so the selected record shows the new version) and refills the draft from the saved record; takes no arguments */
  public async cmdSalvarAlteracoes(): Promise<void> {
    const draft = this.cmdSalvarAlteracoesDraft;
    const id = draft.id;
    const version = draft.version;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    if (id === null || version === null || name === null || name.trim() === '' || countryCode === null || countryCode.trim() === '') {
      const stateKeys: string[] = [];
      if (id === null) stateKeys.push('cmdSalvarAlteracoesDraft.id');
      if (version === null) stateKeys.push('cmdSalvarAlteracoesDraft.version');
      if (name === null || name.trim() === '') stateKeys.push('cmdSalvarAlteracoesDraft.details.identification.name');
      if (countryCode === null || countryCode.trim() === '') stateKeys.push('cmdSalvarAlteracoesDraft.details.identification.countryCode');
      this.publish('cmdSalvarAlteracoesError', { code: 'client.requiredMissing', message: '', details: { stateKeys } });
      this.publish('cmdSalvarAlteracoesStatus', 'error');
      return;
    }
    this.publish('cmdSalvarAlteracoesStatus', 'loading');
    this.publish('cmdSalvarAlteracoesError', null);
    const input: Input<'tarefas.membros_equipe.cmdSalvarAlteracoes'> = {
      id,
      version,
      details: { identification: { name, countryCode } },
    };
    try {
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
        this.publish('cmdSalvarAlteracoesError', response.error);
        this.publish('cmdSalvarAlteracoesStatus', 'error');
        return;
      }
      const pessoa = response.data.pessoa;
      this.publish('cmdSalvarAlteracoesPessoa', pessoa);
      this.upsertPessoa(pessoa);
      this.publish('cmdSalvarAlteracoesDraft', draftFromPessoa(pessoa));
      this.publish('cmdSalvarAlteracoesStatus', 'success');
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'Error';
      this.publish('cmdSalvarAlteracoesError', { code: 'client.unexpected', message: '', details: { name: errorName } });
      this.publish('cmdSalvarAlteracoesStatus', 'error');
    }
  }
}
