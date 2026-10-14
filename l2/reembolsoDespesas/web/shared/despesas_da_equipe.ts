/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Despesas_da_equipeContracts } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.js';

export type {
  Despesas_da_equipeContracts,
  ColaboradorIdentificacaoNome,
  ColaboradorDetalhesNome,
  ColaboradorNome,
  DespesaResumoDetalhes,
  DespesaPendenteResumo,
  DespesaAnaliseDetalhes,
  DespesaAnalise,
} from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.js';

type Input<R extends keyof Despesas_da_equipeContracts> = Despesas_da_equipeContracts[R]['input'];
type Output<R extends keyof Despesas_da_equipeContracts> = Despesas_da_equipeContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** The paged queue of pending expenses: { items, page, pageSize, hasMore }. */
export type DespesasPage = Output<'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe'>['despesas'];

/** The expense under analysis, with its version and collaborator name. */
export type DespesaEmAnalise = Output<'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise'>['despesa'];

/** Draft of the rejection command: the reason typed by the manager. */
export type RejeitarDespesaDraft = {
  motivoRejeicao: string | null;
};

function emptyRejeitarDespesaDraft(): RejeitarDespesaDraft {
  return { motivoRejeicao: null };
}

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

type StateMember =
  | 'despesas'
  | 'despesa'
  | 'selectedDespesa'
  | 'page'
  | 'rejeitarDespesaDraft'
  | 'pageStatus'
  | 'listarDespesasPendentesEquipeStatus'
  | 'listarDespesasPendentesEquipeError'
  | 'obterDespesaParaAnaliseStatus'
  | 'obterDespesaParaAnaliseError'
  | 'aprovarDespesaStatus'
  | 'aprovarDespesaError'
  | 'rejeitarDespesaStatus'
  | 'rejeitarDespesaError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.despesas_da_equipe.despesas': 'despesas',
  'ui.reembolsoDespesas.despesas_da_equipe.despesa': 'despesa',
  'ui.reembolsoDespesas.despesas_da_equipe.selectedDespesa': 'selectedDespesa',
  'ui.reembolsoDespesas.despesas_da_equipe.page': 'page',
  'ui.reembolsoDespesas.despesas_da_equipe.rejeitarDespesaDraft': 'rejeitarDespesaDraft',
  'ui.reembolsoDespesas.despesas_da_equipe.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipeStatus': 'listarDespesasPendentesEquipeStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipeError': 'listarDespesasPendentesEquipeError',
  'ui.reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnaliseStatus': 'obterDespesaParaAnaliseStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnaliseError': 'obterDespesaParaAnaliseError',
  'ui.reembolsoDespesas.despesas_da_equipe.aprovarDespesaStatus': 'aprovarDespesaStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.aprovarDespesaError': 'aprovarDespesaError',
  'ui.reembolsoDespesas.despesas_da_equipe.rejeitarDespesaStatus': 'rejeitarDespesaStatus',
  'ui.reembolsoDespesas.despesas_da_equipe.rejeitarDespesaError': 'rejeitarDespesaError',
  'ui.reembolsoDespesas.despesas_da_equipe.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const STORAGE_PREFIX = 'reembolsoDespesas.despesas_da_equipe.';
const PAGE_SIZE = 20;

export class ReembolsoDespesasDespesas_da_equipeShared extends StateLitElement {
  /** state despesas — paged queue of the team's pending expenses ({ items, page, pageSize, hasMore }); source listarDespesasPendentesEquipe.despesas; organism despesasPendentes */
  @property({ attribute: false }) despesas: DespesasPage | null = null;

  /** state despesa — the complete expense under analysis with its collaborator, used by the analysis and the decision; source obterDespesaParaAnalise.despesa; organisms analiseDespesa, decisaoDespesa */
  @property({ attribute: false }) despesa: DespesaEmAnalise | null = null;

  /** state selectedDespesa — id of the expense chosen in the queue for analysis (null when none); the record itself is in `despesa`; source entry.params.despesaId; organisms analiseDespesa, decisaoDespesa, despesasPendentes; persisted */
  @property({ attribute: false }) selectedDespesa: string | null = null;

  /** state page — the page of the queue the person went to with a pager (null until one is chosen); source entry.params.page; organism despesasPendentes; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state rejeitarDespesaDraft — draft of the rejection form (the mandatory reason); source rejeitarDespesa.input */
  @property({ attribute: false }) rejeitarDespesaDraft: RejeitarDespesaDraft = emptyRejeitarDespesaDraft();

  /** state pageStatus — overall status of the page: loading while the queue loads, empty when it has no rows, error when it failed; source page load */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state listarDespesasPendentesEquipeStatus — status of the queue request; source request listarDespesasPendentesEquipe */
  @property({ attribute: false }) listarDespesasPendentesEquipeStatus: RequestStatus = 'idle';

  /** state listarDespesasPendentesEquipeError — error of the queue request, null when none; source request listarDespesasPendentesEquipe */
  @property({ attribute: false }) listarDespesasPendentesEquipeError: ErrorState = null;

  /** state obterDespesaParaAnaliseStatus — status of the expense detail request; source request obterDespesaParaAnalise */
  @property({ attribute: false }) obterDespesaParaAnaliseStatus: RequestStatus = 'idle';

  /** state obterDespesaParaAnaliseError — error of the expense detail request, null when none; source request obterDespesaParaAnalise */
  @property({ attribute: false }) obterDespesaParaAnaliseError: ErrorState = null;

  /** state aprovarDespesaStatus — status of the approve command; source request aprovarDespesa */
  @property({ attribute: false }) aprovarDespesaStatus: RequestStatus = 'idle';

  /** state aprovarDespesaError — error of the approve command, null when none; source request aprovarDespesa */
  @property({ attribute: false }) aprovarDespesaError: ErrorState = null;

  /** state rejeitarDespesaStatus — status of the reject command; source request rejeitarDespesa */
  @property({ attribute: false }) rejeitarDespesaStatus: RequestStatus = 'idle';

  /** state rejeitarDespesaError — error of the reject command, null when none; source request rejeitarDespesa */
  @property({ attribute: false }) rejeitarDespesaError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.despesas_da_equipe.${member}`, value);
    if (member === 'page' || member === 'selectedDespesa') {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem(`${STORAGE_PREFIX}${member === 'page' ? 'page' : 'despesaId'}`);
        } else {
          localStorage.setItem(`${STORAGE_PREFIX}${member === 'page' ? 'page' : 'despesaId'}`, String(value));
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

  public connectedCallback(): void {
    super.connectedCallback();
    const storedDespesas = getState('ui.reembolsoDespesas.despesas_da_equipe.despesas');
    if (storedDespesas !== undefined) this.assignState('ui.reembolsoDespesas.despesas_da_equipe.despesas', storedDespesas);
    const storedDespesa = getState('ui.reembolsoDespesas.despesas_da_equipe.despesa');
    if (storedDespesa !== undefined) this.assignState('ui.reembolsoDespesas.despesas_da_equipe.despesa', storedDespesa);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.startInitialLoad();
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

  /** Every transient member goes back to its initial value on each entry. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('listarDespesasPendentesEquipeStatus', 'idle');
    this.publish('listarDespesasPendentesEquipeError', null);
    this.publish('obterDespesaParaAnaliseStatus', 'idle');
    this.publish('obterDespesaParaAnaliseError', null);
    this.publish('aprovarDespesaStatus', 'idle');
    this.publish('aprovarDespesaError', null);
    this.publish('rejeitarDespesaStatus', 'idle');
    this.publish('rejeitarDespesaError', null);
    this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
  }

  /** An old command result never sits next to a new form, another record or another scene. */
  private resetCommandResults(): void {
    this.publish('aprovarDespesaStatus', 'idle');
    this.publish('aprovarDespesaError', null);
    this.publish('rejeitarDespesaStatus', 'idle');
    this.publish('rejeitarDespesaError', null);
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
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
    const rawPage = this.readParam('page');
    if (rawPage !== null) {
      const parsed = Number(rawPage);
      if (Number.isFinite(parsed)) this.publish('page', parsed);
    }
    const rawId = this.readParam('despesaId');
    if (rawId !== null) this.publish('selectedDespesa', rawId);
  }

  private async startInitialLoad(): Promise<void> {
    await this.listarDespesasPendentesEquipe();
    const selected = this.selectedDespesa;
    if (selected !== null) await this.obterDespesaParaAnalise(selected);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page. */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the rejection form draft (the reason the manager types); resets the command results. */
  public setRejeitarDespesaDraft(value: RejeitarDespesaDraft): void {
    this.resetCommandResults();
    this.publish('rejeitarDespesaDraft', { ...value });
  }

  /** select — chooses the expense to analyse by its id (null clears the selection): publishes selectedDespesa and loads the full record into `despesa` through obterDespesaParaAnalise; the rejection draft is emptied. */
  public selectDespesa(id: string | null): void {
    this.resetCommandResults();
    this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
    this.publish('selectedDespesa', id);
    if (id === null) {
      this.publish('despesa', null);
      this.publish('obterDespesaParaAnaliseStatus', 'idle');
      this.publish('obterDespesaParaAnaliseError', null);
      return;
    }
    void this.obterDespesaParaAnalise(id);
  }

  /** request listarDespesasPendentesEquipe — loads the paged queue of the team's expenses awaiting approval; redraws despesas (replace, or append the next page when append is true) and pageStatus; also the method to reload and to page the list. Arguments: page = page to load (defaults to the current page param, or the first one; ignored when append is true, which loads the next page and does nothing when there is no more); append = true adds the loaded rows to the current ones (a "load more") without touching the page param. */
  public async listarDespesasPendentesEquipe(page?: number, append = false): Promise<void> {
    if (this.listarDespesasPendentesEquipeStatus === 'loading') return;
    const current = this.despesas;
    if (append && (current === null || !current.hasMore)) return;
    const pageToLoad = append && current !== null ? current.page + 1 : page !== undefined ? page : this.page !== null ? this.page : 1;
    this.publish('listarDespesasPendentesEquipeStatus', 'loading');
    this.publish('listarDespesasPendentesEquipeError', null);
    this.publish('pageStatus', 'loading');
    const input: Input<'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe'> = {
      page: pageToLoad,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe'>>(
        'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('listarDespesasPendentesEquipeError', response.error);
        this.publish('listarDespesasPendentesEquipeStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.despesas;
      if (append && current !== null) {
        this.publish('despesas', {
          items: [...current.items, ...loaded.items],
          page: loaded.page,
          pageSize: loaded.pageSize,
          hasMore: loaded.hasMore,
        });
      } else {
        this.publish('despesas', loaded);
        this.publish('page', pageToLoad);
      }
      this.publish('listarDespesasPendentesEquipeStatus', 'success');
      const rows = this.despesas;
      this.publish('pageStatus', rows === null || rows.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarDespesasPendentesEquipeError', this.unexpectedError(error));
      this.publish('listarDespesasPendentesEquipeStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request obterDespesaParaAnalise — loads the complete expense chosen in the queue (version, status, data, category, amount, description, resubmission flag, previous rejection reason, collaborator name); redraws despesa (replace). Argument: despesaId = id of the expense to analyse. Prefer selectDespesa, which also publishes the selection. */
  public async obterDespesaParaAnalise(despesaId: string): Promise<void> {
    if (this.obterDespesaParaAnaliseStatus === 'loading') return;
    this.publish('obterDespesaParaAnaliseStatus', 'loading');
    this.publish('obterDespesaParaAnaliseError', null);
    const input: Input<'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise'> = { despesaId };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise'>>(
        'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('obterDespesaParaAnaliseError', response.error);
        this.publish('obterDespesaParaAnaliseStatus', 'error');
        return;
      }
      this.publish('despesa', response.data.despesa);
      this.publish('obterDespesaParaAnaliseStatus', 'success');
    } catch (error) {
      this.publish('obterDespesaParaAnaliseError', this.unexpectedError(error));
      this.publish('obterDespesaParaAnaliseStatus', 'error');
    }
  }

  /** Applies the expense returned by a decision: redraws the analysis and takes the row out of the pending queue. */
  private applyDecidedDespesa(decided: DespesaEmAnalise): void {
    this.publish('despesa', decided);
    const queue = this.despesas;
    if (queue !== null && decided.status !== 'awaitingApproval') {
      this.publish('despesas', {
        items: queue.items.filter(row => row.id !== decided.id),
        page: queue.page,
        pageSize: queue.pageSize,
        hasMore: queue.hasMore,
      });
    }
  }

  /** request aprovarDespesa — approves the expense under analysis so it goes on to finance; takes no arguments (uses the selected `despesa` id and version); redraws despesa (replace with the returned expense) and despesas (remove the decided row from the queue). */
  public async aprovarDespesa(): Promise<void> {
    if (this.aprovarDespesaStatus === 'loading') return;
    const current = this.despesa;
    if (current === null) {
      this.publish('aprovarDespesaError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      this.publish('aprovarDespesaStatus', 'error');
      return;
    }
    this.publish('aprovarDespesaStatus', 'loading');
    this.publish('aprovarDespesaError', null);
    const input: Input<'reembolsoDespesas.despesas_da_equipe.aprovarDespesa'> = {
      id: current.id,
      version: current.version,
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'reembolsoDespesas.despesas_da_equipe.aprovarDespesa'>>(
          'reembolsoDespesas.despesas_da_equipe.aprovarDespesa',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('aprovarDespesaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('aprovarDespesaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('aprovarDespesaError', response.error);
        this.publish('aprovarDespesaStatus', 'error');
        return;
      }
      this.applyDecidedDespesa(response.data.despesa);
      this.publish('aprovarDespesaStatus', 'success');
    } catch (error) {
      this.publish('aprovarDespesaError', this.unexpectedError(error));
      this.publish('aprovarDespesaStatus', 'error');
    }
  }

  /** request rejeitarDespesa — rejects the expense under analysis with the reason typed in rejeitarDespesaDraft (mandatory; empty gives client.requiredMissing); takes no arguments (uses the selected `despesa` id and version); redraws despesa (replace with the returned expense), despesas (remove the decided row from the queue) and empties the draft. */
  public async rejeitarDespesa(): Promise<void> {
    if (this.rejeitarDespesaStatus === 'loading') return;
    const current = this.despesa;
    if (current === null) {
      this.publish('rejeitarDespesaError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      this.publish('rejeitarDespesaStatus', 'error');
      return;
    }
    const motivo = this.rejeitarDespesaDraft.motivoRejeicao;
    if (motivo === null || motivo.trim() === '') {
      this.publish('rejeitarDespesaError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['rejeitarDespesaDraft.motivoRejeicao'] },
      });
      this.publish('rejeitarDespesaStatus', 'error');
      return;
    }
    this.publish('rejeitarDespesaStatus', 'loading');
    this.publish('rejeitarDespesaError', null);
    const input: Input<'reembolsoDespesas.despesas_da_equipe.rejeitarDespesa'> = {
      id: current.id,
      version: current.version,
      details: { motivoRejeicao: motivo },
    };
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'reembolsoDespesas.despesas_da_equipe.rejeitarDespesa'>>(
          'reembolsoDespesas.despesas_da_equipe.rejeitarDespesa',
          input,
          { mode: 'blocking', signal },
        ),
      );
      if (response === undefined) {
        this.publish('rejeitarDespesaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('rejeitarDespesaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('rejeitarDespesaError', response.error);
        this.publish('rejeitarDespesaStatus', 'error');
        return;
      }
      this.applyDecidedDespesa(response.data.despesa);
      this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
      this.publish('rejeitarDespesaStatus', 'success');
    } catch (error) {
      this.publish('rejeitarDespesaError', this.unexpectedError(error));
      this.publish('rejeitarDespesaStatus', 'error');
    }
  }
}
