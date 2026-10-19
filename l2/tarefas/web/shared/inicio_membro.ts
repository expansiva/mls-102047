/// <mls fileReference="_102047_/l2/tarefas/web/shared/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type {
  Inicio_membroContracts,
  TarefaResumoDetalhes,
  ListaRef,
  TarefaResumo,
  ResumoMinhasTarefas,
  AvisoTarefa,
  AvisoDetalhes,
  AvisoDoDia,
  MembroIdentificacao,
  MembroDetalhes,
  MembroRef,
  TarefaPendenciaDetalhes,
  TarefaPendencia,
  EsperaPorMim,
} from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';

export type {
  Inicio_membroContracts,
  TarefaResumoDetalhes,
  ListaRef,
  TarefaResumo,
  ResumoMinhasTarefas,
  AvisoTarefa,
  AvisoDetalhes,
  AvisoDoDia,
  MembroIdentificacao,
  MembroDetalhes,
  MembroRef,
  TarefaPendenciaDetalhes,
  TarefaPendencia,
  EsperaPorMim,
} from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';

type Input<R extends keyof Inicio_membroContracts> = Inicio_membroContracts[R]['input'];
type Output<R extends keyof Inicio_membroContracts> = Inicio_membroContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';

/** Draft of the devolverComMotivo command: the typed reason lives in details.motivoDevolucao. */
export type DevolverComMotivoDraft = {
  id: string | null;
  version: number | null;
  details: { motivoDevolucao: string | null };
};

export function emptyDevolverComMotivoDraft(): DevolverComMotivoDraft {
  return { id: null, version: null, details: { motivoDevolucao: null } };
}

type CommandId = 'iniciarTarefa' | 'enviarParaRevisao' | 'aceitarEntrega' | 'devolverComMotivo';
type CommandOutput = Output<'tarefas.inicio_membro.iniciarTarefa'>;
type CommandResponse = { ok: boolean; data: CommandOutput | null; error: ErrorState };

type StateMember =
  | 'resumo'
  | 'avisoDoDia'
  | 'esperaPorMim'
  | 'devolverComMotivoDraft'
  | 'pageStatus'
  | 'carregarInicioStatus'
  | 'carregarInicioError'
  | 'iniciarTarefaStatus'
  | 'iniciarTarefaError'
  | 'enviarParaRevisaoStatus'
  | 'enviarParaRevisaoError'
  | 'aceitarEntregaStatus'
  | 'aceitarEntregaError'
  | 'devolverComMotivoStatus'
  | 'devolverComMotivoError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.inicio_membro.resumo': 'resumo',
  'ui.tarefas.inicio_membro.avisoDoDia': 'avisoDoDia',
  'ui.tarefas.inicio_membro.esperaPorMim': 'esperaPorMim',
  'ui.tarefas.inicio_membro.devolverComMotivoDraft': 'devolverComMotivoDraft',
  'ui.tarefas.inicio_membro.pageStatus': 'pageStatus',
  'ui.tarefas.inicio_membro.carregarInicioStatus': 'carregarInicioStatus',
  'ui.tarefas.inicio_membro.carregarInicioError': 'carregarInicioError',
  'ui.tarefas.inicio_membro.iniciarTarefaStatus': 'iniciarTarefaStatus',
  'ui.tarefas.inicio_membro.iniciarTarefaError': 'iniciarTarefaError',
  'ui.tarefas.inicio_membro.enviarParaRevisaoStatus': 'enviarParaRevisaoStatus',
  'ui.tarefas.inicio_membro.enviarParaRevisaoError': 'enviarParaRevisaoError',
  'ui.tarefas.inicio_membro.aceitarEntregaStatus': 'aceitarEntregaStatus',
  'ui.tarefas.inicio_membro.aceitarEntregaError': 'aceitarEntregaError',
  'ui.tarefas.inicio_membro.devolverComMotivoStatus': 'devolverComMotivoStatus',
  'ui.tarefas.inicio_membro.devolverComMotivoError': 'devolverComMotivoError',
  'ui.tarefas.inicio_membro.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class TarefasInicio_membroShared extends StateLitElement {
  /** state resumo — workload of the person: totals of open, due-today and overdue tasks and the most urgent open tasks; source carregarInicio.resumo; organism resumoMinhasTarefas */
  @property({ attribute: false }) resumo: ResumoMinhasTarefas | null = null;

  /** state avisoDoDia — the person's daily due-date notice for today, with delivery status and included tasks; null when not generated yet; source carregarInicio.avisoDoDia; organism avisoDoDia */
  @property({ attribute: false }) avisoDoDia: AvisoDoDia | null = null;

  /** state esperaPorMim — tasks waiting on the person grouped by expected action (paraIniciar, paraEnviarRevisao, paraRevisar, devolvidas); source carregarInicio.esperaPorMim; organism esperaPorMim */
  @property({ attribute: false }) esperaPorMim: EsperaPorMim | null = null;

  /** state devolverComMotivoDraft — draft of the return-with-reason form (details.motivoDevolucao is the typed reason); source devolverComMotivo.input; organism esperaPorMim */
  @property({ attribute: false }) devolverComMotivoDraft: DevolverComMotivoDraft = emptyDevolverComMotivoDraft();

  /** state pageStatus — overall page status: loading while the initial load runs, error if it failed, empty when every loaded list is empty, success otherwise */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state carregarInicioStatus — status of the initial load request */
  @property({ attribute: false }) carregarInicioStatus: RequestStatus = 'idle';

  /** state carregarInicioError — error of the initial load request (also used by refused navigations); null when none */
  @property({ attribute: false }) carregarInicioError: ErrorState = null;

  /** state iniciarTarefaStatus — status of the start-task command */
  @property({ attribute: false }) iniciarTarefaStatus: RequestStatus = 'idle';

  /** state iniciarTarefaError — error of the start-task command; null when none */
  @property({ attribute: false }) iniciarTarefaError: ErrorState = null;

  /** state enviarParaRevisaoStatus — status of the send-to-review command */
  @property({ attribute: false }) enviarParaRevisaoStatus: RequestStatus = 'idle';

  /** state enviarParaRevisaoError — error of the send-to-review command; null when none */
  @property({ attribute: false }) enviarParaRevisaoError: ErrorState = null;

  /** state aceitarEntregaStatus — status of the accept-delivery command */
  @property({ attribute: false }) aceitarEntregaStatus: RequestStatus = 'idle';

  /** state aceitarEntregaError — error of the accept-delivery command; null when none */
  @property({ attribute: false }) aceitarEntregaError: ErrorState = null;

  /** state devolverComMotivoStatus — status of the return-with-reason command */
  @property({ attribute: false }) devolverComMotivoStatus: RequestStatus = 'idle';

  /** state devolverComMotivoError — error of the return-with-reason command; null when none */
  @property({ attribute: false }) devolverComMotivoError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.tarefas.inicio_membro.${member}`, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private readonly onPopState = (): void => {
    if (window.location.pathname.endsWith('/tarefas/inicio_membro')) {
      this.startVisit();
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();
    const storedResumo = getState('ui.tarefas.inicio_membro.resumo');
    if (storedResumo !== undefined) this.assignState('ui.tarefas.inicio_membro.resumo', storedResumo);
    const storedAviso = getState('ui.tarefas.inicio_membro.avisoDoDia');
    if (storedAviso !== undefined) this.assignState('ui.tarefas.inicio_membro.avisoDoDia', storedAviso);
    const storedEspera = getState('ui.tarefas.inicio_membro.esperaPorMim');
    if (storedEspera !== undefined) this.assignState('ui.tarefas.inicio_membro.esperaPorMim', storedEspera);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    this.applyEntryParams();
    void this.carregarInicio();
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
    void this.carregarInicio();
  }

  /** Transient members go back to their initial value on every entry. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('carregarInicioStatus', 'idle');
    this.publish('carregarInicioError', null);
    this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
    this.resetCommandResults();
  }

  /** The page has no entry params. */
  private applyEntryParams(): void {
    // no entry params declared
  }

  private resetCommandResults(): void {
    this.publish('iniciarTarefaError', null);
    this.publish('iniciarTarefaStatus', 'idle');
    this.publish('enviarParaRevisaoError', null);
    this.publish('enviarParaRevisaoStatus', 'idle');
    this.publish('aceitarEntregaError', null);
    this.publish('aceitarEntregaStatus', 'idle');
    this.publish('devolverComMotivoError', null);
    this.publish('devolverComMotivoStatus', 'idle');
  }

  /** scene — publishes the visible scene of the page (value is the scene id); clears old command results */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the return-with-reason form (set details.motivoDevolucao to the typed reason); clears old command results */
  public setDevolverComMotivoDraft(value: DevolverComMotivoDraft): void {
    this.resetCommandResults();
    this.publish('devolverComMotivoDraft', value);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** request carregarInicio — loads at once the workload summary, today's daily notice and the pending tasks waiting on the person (the person is the session's); redraws resumo, avisoDoDia and esperaPorMim by replace; no arguments, also the method to reload the page */
  public async carregarInicio(): Promise<void> {
    if (this.carregarInicioStatus === 'loading') return;
    this.publish('carregarInicioStatus', 'loading');
    this.publish('carregarInicioError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'tarefas.inicio_membro.carregarInicio'> = {};
      const response = await execBff<Output<'tarefas.inicio_membro.carregarInicio'>>(
        'tarefas.inicio_membro.carregarInicio',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('carregarInicioError', response.error);
        this.publish('carregarInicioStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const output = response.data;
      this.publish('resumo', output.resumo);
      this.publish('avisoDoDia', output.avisoDoDia ?? null);
      this.publish('esperaPorMim', output.esperaPorMim);
      this.publish('carregarInicioStatus', 'success');
      const espera = output.esperaPorMim;
      const isEmpty =
        output.resumo.tarefas.length === 0 &&
        espera.paraIniciar.length === 0 &&
        espera.paraEnviarRevisao.length === 0 &&
        espera.paraRevisar.length === 0 &&
        espera.devolvidas.length === 0;
      this.publish('pageStatus', isEmpty ? 'empty' : 'success');
    } catch (error) {
      this.publish('carregarInicioError', this.unexpectedError(error));
      this.publish('carregarInicioStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  private setCommandState(request: CommandId, status: RequestStatus, error: ErrorState): void {
    switch (request) {
      case 'iniciarTarefa':
        this.publish('iniciarTarefaError', error);
        this.publish('iniciarTarefaStatus', status);
        break;
      case 'enviarParaRevisao':
        this.publish('enviarParaRevisaoError', error);
        this.publish('enviarParaRevisaoStatus', status);
        break;
      case 'aceitarEntrega':
        this.publish('aceitarEntregaError', error);
        this.publish('aceitarEntregaStatus', status);
        break;
      case 'devolverComMotivo':
        this.publish('devolverComMotivoError', error);
        this.publish('devolverComMotivoStatus', status);
        break;
    }
  }

  private commandStatus(request: CommandId): RequestStatus {
    switch (request) {
      case 'iniciarTarefa':
        return this.iniciarTarefaStatus;
      case 'enviarParaRevisao':
        return this.enviarParaRevisaoStatus;
      case 'aceitarEntrega':
        return this.aceitarEntregaStatus;
      case 'devolverComMotivo':
        return this.devolverComMotivoStatus;
    }
  }

  /** Runs a command: replaces resumo and esperaPorMim with the returned values (never reloads), then onSuccess, then publishes success last. */
  private async runCommand(
    request: CommandId,
    call: (signal: AbortSignal) => Promise<CommandResponse>,
    onSuccess?: () => void,
  ): Promise<void> {
    if (this.commandStatus(request) === 'loading') return;
    this.setCommandState(request, 'loading', null);
    try {
      const response = await runBlockingUiAction(call);
      if (response === undefined) {
        this.setCommandState(request, 'error', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        return;
      }
      if (!response.ok || !response.data) {
        this.setCommandState(request, 'error', response.error);
        return;
      }
      const output = response.data;
      this.publish('resumo', output.resumo);
      this.publish('esperaPorMim', output.esperaPorMim);
      if (onSuccess) onSuccess();
      this.setCommandState(request, 'success', null);
    } catch (error) {
      this.setCommandState(request, 'error', this.unexpectedError(error));
    }
  }

  private requiredMissing(request: CommandId, stateKeys: string[]): void {
    this.setCommandState(request, 'error', { code: 'client.requiredMissing', message: '', details: { stateKeys } });
  }

  /** request iniciarTarefa — starts a task assigned to the person (aFazer to emAndamento); redraws resumo and esperaPorMim by replace with the recalculated values; arguments: id of the task, version read with it (optimistic concurrency) */
  public async iniciarTarefa(id: string, version: number): Promise<void> {
    if (!id) {
      this.requiredMissing('iniciarTarefa', ['id']);
      return;
    }
    const input: Input<'tarefas.inicio_membro.iniciarTarefa'> = { id, version };
    await this.runCommand('iniciarTarefa', (signal) =>
      execBff<Output<'tarefas.inicio_membro.iniciarTarefa'>>('tarefas.inicio_membro.iniciarTarefa', input, {
        mode: 'blocking',
        signal,
      }),
    );
  }

  /** request enviarParaRevisao — sends an in-progress task of the person (also one returned for adjustment) to the creator's review; redraws resumo and esperaPorMim by replace with the recalculated values; arguments: id of the task, version read with it */
  public async enviarParaRevisao(id: string, version: number): Promise<void> {
    if (!id) {
      this.requiredMissing('enviarParaRevisao', ['id']);
      return;
    }
    const input: Input<'tarefas.inicio_membro.enviarParaRevisao'> = { id, version };
    await this.runCommand('enviarParaRevisao', (signal) =>
      execBff<Output<'tarefas.inicio_membro.enviarParaRevisao'>>('tarefas.inicio_membro.enviarParaRevisao', input, {
        mode: 'blocking',
        signal,
      }),
    );
  }

  /** request aceitarEntrega — accepts the delivery of a task created by the person, concluding it; redraws resumo and esperaPorMim by replace (the task leaves the to-review list); arguments: id of the task in review, version read with it */
  public async aceitarEntrega(id: string, version: number): Promise<void> {
    if (!id) {
      this.requiredMissing('aceitarEntrega', ['id']);
      return;
    }
    const input: Input<'tarefas.inicio_membro.aceitarEntrega'> = { id, version };
    await this.runCommand('aceitarEntrega', (signal) =>
      execBff<Output<'tarefas.inicio_membro.aceitarEntrega'>>('tarefas.inicio_membro.aceitarEntrega', input, {
        mode: 'blocking',
        signal,
      }),
    );
  }

  /** request devolverComMotivo — returns for adjustment a task in review created by the person, with the reason typed in devolverComMotivoDraft.details.motivoDevolucao (required; set it with setDevolverComMotivoDraft first); redraws resumo and esperaPorMim by replace and clears the draft; arguments: id of the task in review, version read with it */
  public async devolverComMotivo(id: string, version: number): Promise<void> {
    const motivo = this.devolverComMotivoDraft.details.motivoDevolucao;
    const missing: string[] = [];
    if (!id) missing.push('id');
    if (motivo === null || motivo.trim() === '') missing.push('ui.tarefas.inicio_membro.devolverComMotivoDraft');
    if (motivo === null || missing.length > 0) {
      this.requiredMissing('devolverComMotivo', missing);
      return;
    }
    const input: Input<'tarefas.inicio_membro.devolverComMotivo'> = {
      id,
      version,
      details: { motivoDevolucao: motivo },
    };
    await this.runCommand(
      'devolverComMotivo',
      (signal) =>
        execBff<Output<'tarefas.inicio_membro.devolverComMotivo'>>('tarefas.inicio_membro.devolverComMotivo', input, {
          mode: 'blocking',
          signal,
        }),
      () => {
        this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
      },
    );
  }

  /** navigate — opens the person's task list page (minhas_tarefas) from the summary; carries nothing */
  public abrirMinhasTarefas(): void {
    auraNavigate('/tarefas/minhas_tarefas', { basePath: '/tarefas' });
  }

  /** navigate — opens the daily notices page (meus_avisos) from the notice card; carries the id of today's notice when one is loaded, otherwise just opens the page */
  public abrirMeusAvisos(): void {
    const avisoId = this.avisoDoDia ? this.avisoDoDia.id : '';
    if (avisoId) {
      auraNavigate(`/tarefas/meus_avisos?avisoVencimentoId=${encodeURIComponent(avisoId)}`, { basePath: '/tarefas' });
      return;
    }
    auraNavigate('/tarefas/meus_avisos', { basePath: '/tarefas' });
  }

  /** navigate — opens a task on the minhas_tarefas page to adjust it (selects it there through tarefaId); argument: id of the task the person picked; refused with client.preconditionMissing in carregarInicioError when null */
  public abrirTarefaParaAjustar(tarefaId: string | null): void {
    if (tarefaId === null || tarefaId === '') {
      this.publish('carregarInicioError', {
        code: 'client.preconditionMissing',
        message: '',
        details: { params: ['tarefaId'] },
      });
      return;
    }
    auraNavigate(`/tarefas/minhas_tarefas?tarefaId=${encodeURIComponent(tarefaId)}`, { basePath: '/tarefas' });
  }
}
