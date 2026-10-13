/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>


import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Despesas_da_equipeContracts, DespesaAnalise } from '/_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.js';

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

type DespesasPage = Output<'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe'>['despesas'];

/** Form draft of the rejection command: only what the manager types. */
export type RejeitarDespesaDraft = {
  details: {
    motivoRejeicao: string | null;
  };
};

function emptyRejeitarDespesaDraft(): RejeitarDespesaDraft {
  return { details: { motivoRejeicao: null } };
}

function emptyDespesasPage(): DespesasPage {
  return { items: [], page: 1, pageSize: 20, hasMore: false };
}

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
const DEFAULT_PAGE_SIZE = 20;

export class ReembolsoDespesasDespesas_da_equipeShared extends StateLitElement {
  /** state despesas — rows of the pending team expense queue (a page { items, page, pageSize, hasMore }); source listarDespesasPendentesEquipe.despesas; organism despesasPendentes */
  @property({ attribute: false }) despesas: DespesasPage = emptyDespesasPage();

  /** state despesa — the full expense under analysis, with collaborator, used by the analysis and the decision (null until one is selected); source obterDespesaParaAnalise.despesa; organisms analiseDespesa, decisaoDespesa */
  @property({ attribute: false }) despesa: DespesaAnalise | null = null;

  /** state selectedDespesa — id of the expense selected in the queue for analysis; the selected record itself is in `despesa`; source entry.params.despesaId; organisms analiseDespesa, decisaoDespesa, despesasPendentes; persisted */
  @property({ attribute: false }) selectedDespesa: string | null = null;

  /** state page — the queue page the person went to with a pager (a "load more" never writes it); source entry.params.page; organism despesasPendentes; persisted */
  @property({ attribute: false }) page: number | null = null;

  /** state rejeitarDespesaDraft — draft of the rejection form (the reason typed by the manager); source rejeitarDespesa.input; organism decisaoDespesa */
  @property({ attribute: false }) rejeitarDespesaDraft: RejeitarDespesaDraft = emptyRejeitarDespesaDraft();

  /** state pageStatus — overall status of the page: loading while the queue loads, empty when it has no rows, error when it failed, success otherwise */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state listarDespesasPendentesEquipeStatus — status of the queue request */
  @property({ attribute: false }) listarDespesasPendentesEquipeStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state listarDespesasPendentesEquipeError — error of the queue request, null when none */
  @property({ attribute: false }) listarDespesasPendentesEquipeError: ErrorState = null;

  /** state obterDespesaParaAnaliseStatus — status of the request that loads the expense under analysis */
  @property({ attribute: false }) obterDespesaParaAnaliseStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state obterDespesaParaAnaliseError — error of the request that loads the expense under analysis, null when none */
  @property({ attribute: false }) obterDespesaParaAnaliseError: ErrorState = null;

  /** state aprovarDespesaStatus — status of the approve command; stays until the person changes what it acted on */
  @property({ attribute: false }) aprovarDespesaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state aprovarDespesaError — error of the approve command, null when none */
  @property({ attribute: false }) aprovarDespesaError: ErrorState = null;

  /** state rejeitarDespesaStatus — status of the reject command; stays until the person changes what it acted on */
  @property({ attribute: false }) rejeitarDespesaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state rejeitarDespesaError — error of the reject command, null when none */
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
    this.hydrateData();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    this.applyEntryParams();
    void this.startVisit();
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

  private hydrateData(): void {
    const despesas = getState('ui.reembolsoDespesas.despesas_da_equipe.despesas');
    if (despesas !== undefined) this.assignState('ui.reembolsoDespesas.despesas_da_equipe.despesas', despesas);
    const despesa = getState('ui.reembolsoDespesas.despesas_da_equipe.despesa');
    if (despesa !== undefined) this.assignState('ui.reembolsoDespesas.despesas_da_equipe.despesa', despesa);
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('listarDespesasPendentesEquipeStatus', 'idle');
    this.publish('listarDespesasPendentesEquipeError', null);
    this.publish('obterDespesaParaAnaliseStatus', 'idle');
    this.publish('obterDespesaParaAnaliseError', null);
    this.publish('aprovarDespesaStatus', 'idle');
    this.publish('aprovarDespesaError', null);
    this.publish('rejeitarDespesaStatus', 'idle');
    this.publish('rejeitarDespesaError', null);
    this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('aprovarDespesaStatus', 'idle');
    this.publish('aprovarDespesaError', null);
    this.publish('rejeitarDespesaStatus', 'idle');
    this.publish('rejeitarDespesaError', null);
  }

  private readParam(name: string): string | null {
    const fromUrl = new URLSearchParams(window.location.search).get(name);
    if (fromUrl !== null) return fromUrl;
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}${name}`);
    } catch {
      return null;
    }
  }

  private applyEntryParams(): void {
    const rawPage = this.readParam('page');
    let pageValue: number | null = null;
    if (rawPage !== null && rawPage !== '') {
      const parsed = Number(rawPage);
      if (Number.isFinite(parsed)) pageValue = parsed;
    }
    this.publish('page', pageValue);
    const rawId = this.readParam('despesaId');
    this.publish('selectedDespesa', rawId !== null && rawId !== '' ? rawId : null);
  }

  private async startVisit(): Promise<void> {
    await this.listarDespesasPendentesEquipe(this.page !== null && this.page >= 1 ? this.page : 1, false);
    // the selection wins over the filter: applied after the queue is loaded
    const selected = this.selectedDespesa;
    if (selected !== null) {
      await this.obterDespesaParaAnalise(selected);
    }
  }

  private unexpectedError(error: unknown, fallbackName = 'unknown'): ErrorState {
    const name = error instanceof Error ? error.name : fallbackName;
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page (a view name chosen by the page); resets the results of the commands */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the whole rejection draft (the reason the manager types); resets the results of the commands */
  public setRejeitarDespesaDraft(value: RejeitarDespesaDraft): void {
    this.resetCommandResults();
    this.publish('rejeitarDespesaDraft', value);
  }

  /** request listarDespesasPendentesEquipe — loads the paged queue of team expenses awaiting approval (also the method to reload and to page the list); redraws despesas (replace, or append the next page when append is true) and page (replace, only when not appending); arguments: page = page to load (starts at 1), append = true adds the page to the loaded rows ("load more"; does nothing when the list has no more) */
  public async listarDespesasPendentesEquipe(page = 1, append = false): Promise<void> {
    if (this.listarDespesasPendentesEquipeStatus === 'loading') return;
    if (append && !this.despesas.hasMore) return;
    this.publish('listarDespesasPendentesEquipeStatus', 'loading');
    this.publish('listarDespesasPendentesEquipeError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const input: Input<'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe'> = {
      page,
      pageSize: DEFAULT_PAGE_SIZE,
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
        if (!append) this.publish('pageStatus', 'error');
        return;
      }
      const loaded = response.data.despesas;
      if (append) {
        this.publish('despesas', {
          items: [...this.despesas.items, ...loaded.items],
          page: loaded.page,
          pageSize: loaded.pageSize,
          hasMore: loaded.hasMore,
        });
      } else {
        this.publish('despesas', {
          items: [...loaded.items],
          page: loaded.page,
          pageSize: loaded.pageSize,
          hasMore: loaded.hasMore,
        });
        this.publish('page', page);
      }
      this.publish('listarDespesasPendentesEquipeStatus', 'success');
      this.publish('pageStatus', this.despesas.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('listarDespesasPendentesEquipeError', this.unexpectedError(error));
      this.publish('listarDespesasPendentesEquipeStatus', 'error');
      if (!append) this.publish('pageStatus', 'error');
    }
  }

  /** request obterDespesaParaAnalise — selects an expense of the queue and loads its full data for analysis and decision; redraws selectedDespesa (replace with the id) and despesa (replace with the loaded record, or clear it); argument: despesaId = id of the expense the person picked, or null to clear the selection */
  public async obterDespesaParaAnalise(despesaId: string | null): Promise<void> {
    this.resetCommandResults();
    if (despesaId === null || despesaId === '') {
      this.publish('selectedDespesa', null);
      this.publish('despesa', null);
      this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
      this.publish('obterDespesaParaAnaliseStatus', 'idle');
      this.publish('obterDespesaParaAnaliseError', null);
      return;
    }
    if (this.obterDespesaParaAnaliseStatus === 'loading') return;
    this.publish('obterDespesaParaAnaliseStatus', 'loading');
    this.publish('obterDespesaParaAnaliseError', null);
    this.publish('selectedDespesa', despesaId);
    if (this.despesa !== null && this.despesa.id !== despesaId) {
      this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
    }
    const input: Input<'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise'> = { despesaId };
    try {
      const response = await execBff<Output<'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise'>>(
        'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('despesa', null);
        this.publish('obterDespesaParaAnaliseError', response.error);
        this.publish('obterDespesaParaAnaliseStatus', 'error');
        return;
      }
      this.publish('despesa', response.data.despesa);
      this.publish('obterDespesaParaAnaliseStatus', 'success');
    } catch (error) {
      this.publish('despesa', null);
      this.publish('obterDespesaParaAnaliseError', this.unexpectedError(error));
      this.publish('obterDespesaParaAnaliseStatus', 'error');
    }
  }

  /** Applies the updated expense returned by a decision: redraws despesa and removes the row from the pending queue. */
  private applyDecision(updated: DespesaAnalise): void {
    this.publish('despesa', updated);
    this.publish('despesas', {
      items: this.despesas.items.filter(row => row.id !== updated.id),
      page: this.despesas.page,
      pageSize: this.despesas.pageSize,
      hasMore: this.despesas.hasMore,
    });
    this.publish('rejeitarDespesaDraft', emptyRejeitarDespesaDraft());
  }

  /** request aprovarDespesa — approves the expense under analysis so it follows to finance; takes no argument (uses the loaded despesa id and version); redraws despesa (replace with the updated record) and despesas (remove the approved row from the queue, no reload) */
  public async aprovarDespesa(): Promise<void> {
    if (this.aprovarDespesaStatus === 'loading') return;
    const current = this.despesa;
    if (!current) {
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
      this.applyDecision(response.data.despesa);
      this.publish('aprovarDespesaStatus', 'success');
    } catch (error) {
      this.publish('aprovarDespesaError', this.unexpectedError(error));
      this.publish('aprovarDespesaStatus', 'error');
    }
  }

  /** request rejeitarDespesa — rejects the expense under analysis with the reason typed in rejeitarDespesaDraft (required); takes no argument (uses the loaded despesa id and version); redraws despesa (replace with the updated record), despesas (remove the rejected row from the queue, no reload) and clears the draft */
  public async rejeitarDespesa(): Promise<void> {
    if (this.rejeitarDespesaStatus === 'loading') return;
    const current = this.despesa;
    if (!current) {
      this.publish('rejeitarDespesaError', { code: 'client.preconditionMissing', message: '', details: { stateKeys: ['despesa'] } });
      this.publish('rejeitarDespesaStatus', 'error');
      return;
    }
    const motivo = this.rejeitarDespesaDraft.details.motivoRejeicao;
    if (motivo === null || motivo.trim() === '') {
      this.publish('rejeitarDespesaError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.reembolsoDespesas.despesas_da_equipe.rejeitarDespesaDraft'] },
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
      this.applyDecision(response.data.despesa);
      this.publish('rejeitarDespesaStatus', 'success');
    } catch (error) {
      this.publish('rejeitarDespesaError', this.unexpectedError(error));
      this.publish('rejeitarDespesaStatus', 'error');
    }
  }
}
