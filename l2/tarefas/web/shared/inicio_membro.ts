/// <mls fileReference="_102047_/l2/tarefas/web/shared/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { Inicio_membroContracts, ResumoMinhasTarefas, AvisoDoDia, Pendencia } from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';

export type {
  Inicio_membroContracts,
  ListaNome,
  TarefaResumoDetalhes,
  TarefaResumo,
  ResumoMinhasTarefas,
  AvisoTarefa,
  AvisoDetalhes,
  AvisoDoDia,
  MembroNomeIdentificacao,
  MembroNomeDetalhes,
  MembroNome,
  PendenciaDetalhes,
  Pendencia,
} from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof Inicio_membroContracts> = Inicio_membroContracts[R]['input'];
type Output<R extends keyof Inicio_membroContracts> = Inicio_membroContracts[R]['output'];

type CommandOutput = Output<'tarefas.inicio_membro.cmdIniciarTarefa'>;
type CommandResponse = { ok: boolean; data: CommandOutput | null; error: ErrorState };
type CommandId = 'cmdIniciarTarefa' | 'cmdEnviarParaRevisao' | 'cmdAceitarEntrega' | 'cmdDevolverComMotivo';
type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/** Draft of the return command: the reason typed by the person; id and version come from the chosen pending task. */
export type CmdDevolverComMotivoDraft = {
  id: string | null;
  version: number | null;
  details: { motivoDevolucao: string | null };
};

function emptyCmdDevolverComMotivoDraft(): CmdDevolverComMotivoDraft {
  return { id: null, version: null, details: { motivoDevolucao: null } };
}

type StateMember =
  | 'resumo'
  | 'avisoHoje'
  | 'pendencias'
  | 'cmdDevolverComMotivoDraft'
  | 'pageStatus'
  | 'qryInicioMembroStatus'
  | 'qryInicioMembroError'
  | 'cmdIniciarTarefaStatus'
  | 'cmdIniciarTarefaError'
  | 'cmdEnviarParaRevisaoStatus'
  | 'cmdEnviarParaRevisaoError'
  | 'cmdAceitarEntregaStatus'
  | 'cmdAceitarEntregaError'
  | 'cmdDevolverComMotivoStatus'
  | 'cmdDevolverComMotivoError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.tarefas.inicio_membro.resumo': 'resumo',
  'ui.tarefas.inicio_membro.avisoHoje': 'avisoHoje',
  'ui.tarefas.inicio_membro.pendencias': 'pendencias',
  'ui.tarefas.inicio_membro.cmdDevolverComMotivoDraft': 'cmdDevolverComMotivoDraft',
  'ui.tarefas.inicio_membro.pageStatus': 'pageStatus',
  'ui.tarefas.inicio_membro.qryInicioMembroStatus': 'qryInicioMembroStatus',
  'ui.tarefas.inicio_membro.qryInicioMembroError': 'qryInicioMembroError',
  'ui.tarefas.inicio_membro.cmdIniciarTarefaStatus': 'cmdIniciarTarefaStatus',
  'ui.tarefas.inicio_membro.cmdIniciarTarefaError': 'cmdIniciarTarefaError',
  'ui.tarefas.inicio_membro.cmdEnviarParaRevisaoStatus': 'cmdEnviarParaRevisaoStatus',
  'ui.tarefas.inicio_membro.cmdEnviarParaRevisaoError': 'cmdEnviarParaRevisaoError',
  'ui.tarefas.inicio_membro.cmdAceitarEntregaStatus': 'cmdAceitarEntregaStatus',
  'ui.tarefas.inicio_membro.cmdAceitarEntregaError': 'cmdAceitarEntregaError',
  'ui.tarefas.inicio_membro.cmdDevolverComMotivoStatus': 'cmdDevolverComMotivoStatus',
  'ui.tarefas.inicio_membro.cmdDevolverComMotivoError': 'cmdDevolverComMotivoError',
  'ui.tarefas.inicio_membro.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class TarefasInicio_membroShared extends StateLitElement {
  /** state resumo — indicators already computed for the member's open tasks and the list of those tasks; source qryInicioMembro.resumo; organism resumoMinhasTarefas */
  @property({ attribute: false }) resumo: ResumoMinhasTarefas | null = null;

  /** state avisoHoje — daily due-date notice of today for the member (null when the 8h process has not generated it); source qryInicioMembro.avisoHoje; organism alertaAvisoDiario */
  @property({ attribute: false }) avisoHoje: AvisoDoDia | null = null;

  /** state pendencias — tasks waiting for an action of the member, each with the expected action (acaoEsperada), responsible and creator names and the version for the commands; source qryInicioMembro.pendencias; organism caixaPendencias */
  @property({ attribute: false }) pendencias: Pendencia[] = [];

  /** draft — the return-with-reason form: the page fills details.motivoDevolucao through setCmdDevolverComMotivoDraft, then calls cmdDevolverComMotivo(id); source cmdDevolverComMotivo.input; organism caixaPendencias */
  @property({ attribute: false }) cmdDevolverComMotivoDraft: CmdDevolverComMotivoDraft = emptyCmdDevolverComMotivoDraft();

  /** state pageStatus — overall status of the page: idle, loading, empty (no open tasks and no pending items), success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryInicioMembroStatus — status of the initial load request */
  @property({ attribute: false }) qryInicioMembroStatus: RequestStatus = 'idle';

  /** state qryInicioMembroError — error of the initial load request (also of a refused navigation); null when none */
  @property({ attribute: false }) qryInicioMembroError: ErrorState = null;

  /** state cmdIniciarTarefaStatus — status of the start-task command */
  @property({ attribute: false }) cmdIniciarTarefaStatus: RequestStatus = 'idle';

  /** state cmdIniciarTarefaError — error of the start-task command; null when none */
  @property({ attribute: false }) cmdIniciarTarefaError: ErrorState = null;

  /** state cmdEnviarParaRevisaoStatus — status of the send-to-review command */
  @property({ attribute: false }) cmdEnviarParaRevisaoStatus: RequestStatus = 'idle';

  /** state cmdEnviarParaRevisaoError — error of the send-to-review command; null when none */
  @property({ attribute: false }) cmdEnviarParaRevisaoError: ErrorState = null;

  /** state cmdAceitarEntregaStatus — status of the accept-delivery command */
  @property({ attribute: false }) cmdAceitarEntregaStatus: RequestStatus = 'idle';

  /** state cmdAceitarEntregaError — error of the accept-delivery command; null when none */
  @property({ attribute: false }) cmdAceitarEntregaError: ErrorState = null;

  /** state cmdDevolverComMotivoStatus — status of the return-with-reason command */
  @property({ attribute: false }) cmdDevolverComMotivoStatus: RequestStatus = 'idle';

  /** state cmdDevolverComMotivoError — error of the return-with-reason command; null when none */
  @property({ attribute: false }) cmdDevolverComMotivoError: ErrorState = null;

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

  public connectedCallback(): void {
    super.connectedCallback();
    const resumo = getState('ui.tarefas.inicio_membro.resumo');
    if (resumo !== undefined) this.assignState('ui.tarefas.inicio_membro.resumo', resumo);
    const avisoHoje = getState('ui.tarefas.inicio_membro.avisoHoje');
    if (avisoHoje !== undefined) this.assignState('ui.tarefas.inicio_membro.avisoHoje', avisoHoje);
    const pendencias = getState('ui.tarefas.inicio_membro.pendencias');
    if (pendencias !== undefined) this.assignState('ui.tarefas.inicio_membro.pendencias', pendencias);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    void this.qryInicioMembro();
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

  /** Fresh visit: every transient member goes back to its initial value. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('scenary', '');
    this.publish('qryInicioMembroStatus', 'idle');
    this.publish('qryInicioMembroError', null);
    this.publish('cmdDevolverComMotivoDraft', emptyCmdDevolverComMotivoDraft());
    this.resetCommandResults();
  }

  /** Clears the result (status and error) of every command, so an old success or error never sits next to new input. */
  private resetCommandResults(): void {
    this.publish('cmdIniciarTarefaStatus', 'idle');
    this.publish('cmdIniciarTarefaError', null);
    this.publish('cmdEnviarParaRevisaoStatus', 'idle');
    this.publish('cmdEnviarParaRevisaoError', null);
    this.publish('cmdAceitarEntregaStatus', 'idle');
    this.publish('cmdAceitarEntregaError', null);
    this.publish('cmdDevolverComMotivoStatus', 'idle');
    this.publish('cmdDevolverComMotivoError', null);
  }

  /** Publishes the error and then the status of one command (status last). */
  private publishCommand(id: CommandId, status: RequestStatus, error: ErrorState): void {
    switch (id) {
      case 'cmdIniciarTarefa':
        this.publish('cmdIniciarTarefaError', error);
        this.publish('cmdIniciarTarefaStatus', status);
        break;
      case 'cmdEnviarParaRevisao':
        this.publish('cmdEnviarParaRevisaoError', error);
        this.publish('cmdEnviarParaRevisaoStatus', status);
        break;
      case 'cmdAceitarEntrega':
        this.publish('cmdAceitarEntregaError', error);
        this.publish('cmdAceitarEntregaStatus', status);
        break;
      case 'cmdDevolverComMotivo':
        this.publish('cmdDevolverComMotivoError', error);
        this.publish('cmdDevolverComMotivoStatus', status);
        break;
    }
  }

  private commandStatus(id: CommandId): RequestStatus {
    switch (id) {
      case 'cmdIniciarTarefa':
        return this.cmdIniciarTarefaStatus;
      case 'cmdEnviarParaRevisao':
        return this.cmdEnviarParaRevisaoStatus;
      case 'cmdAceitarEntrega':
        return this.cmdAceitarEntregaStatus;
      case 'cmdDevolverComMotivo':
        return this.cmdDevolverComMotivoStatus;
    }
  }

  /**
   * Validates a command on a pending task and returns the version to send, or null when the call must not happen
   * (command already running, id empty, or id not among the loaded pending tasks).
   */
  private prepareCommand(id: CommandId, tarefaId: string): number | null {
    if (this.commandStatus(id) === 'loading') return null;
    if (!tarefaId) {
      this.publishCommand(id, 'error', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['pendencias'] } });
      return null;
    }
    const row = this.pendencias.find((item) => item.id === tarefaId);
    if (!row) {
      this.publishCommand(id, 'error', { code: 'client.selectionInvalid', message: '', details: { id: tarefaId } });
      return null;
    }
    return row.version;
  }

  /** Runs a command call, applies the returned resumo and pendencias, and publishes the status last. */
  private async submitCommand(
    id: CommandId,
    call: (signal: AbortSignal) => Promise<CommandResponse>,
    onSuccess?: () => void,
  ): Promise<void> {
    this.publishCommand(id, 'loading', null);
    try {
      const response = await runBlockingUiAction(call);
      if (response === undefined) {
        this.publishCommand(id, 'error', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        return;
      }
      if (!response.ok || !response.data) {
        this.publishCommand(id, 'error', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        return;
      }
      this.publish('resumo', response.data.resumo);
      this.publish('pendencias', response.data.pendencias);
      if (onSuccess) onSuccess();
      this.publishCommand(id, 'success', null);
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publishCommand(id, 'error', { code: 'client.unexpected', message: '', details: { name } });
    }
  }

  /** draft — replaces the return-with-reason draft (the page edits details.motivoDevolucao); also clears old command results */
  public setCmdDevolverComMotivoDraft(value: CmdDevolverComMotivoDraft): void {
    this.resetCommandResults();
    this.publish('cmdDevolverComMotivoDraft', value);
  }

  /** Publishes the visible scene of the page and clears old command results. @param value scene name */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** request qryInicioMembro — loads everything the member home shows: overview of open tasks with indicators, today's daily notice and the inbox of pending actions; redraws resumo, avisoHoje and pendencias (replace) and pageStatus; no arguments, the member comes from the session. Also the method to reload the page. */
  public async qryInicioMembro(): Promise<void> {
    if (this.qryInicioMembroStatus === 'loading') return;
    this.publish('qryInicioMembroStatus', 'loading');
    this.publish('qryInicioMembroError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'tarefas.inicio_membro.qryInicioMembro'> = {};
      const response = await execBff<Output<'tarefas.inicio_membro.qryInicioMembro'>>('tarefas.inicio_membro.qryInicioMembro', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryInicioMembroError', response.error ?? { code: 'client.unexpected', message: '', details: { name: 'noData' } });
        this.publish('qryInicioMembroStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const data = response.data;
      this.publish('resumo', data.resumo);
      this.publish('avisoHoje', data.avisoHoje ?? null);
      this.publish('pendencias', data.pendencias);
      this.publish('qryInicioMembroStatus', 'success');
      const isEmpty = data.resumo.tarefas.length === 0 && data.pendencias.length === 0;
      this.publish('pageStatus', isEmpty ? 'empty' : 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('qryInicioMembroError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('qryInicioMembroStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request cmdIniciarTarefa — starts a task assigned to the member (aFazer to emAndamento); redraws resumo and pendencias (replace) with the returned values, no reload; @param id id of the pending task to start (its version is read from the loaded pendencias) */
  public async cmdIniciarTarefa(id: string): Promise<void> {
    const version = this.prepareCommand('cmdIniciarTarefa', id);
    if (version === null) return;
    const input: Input<'tarefas.inicio_membro.cmdIniciarTarefa'> = { id, version };
    await this.submitCommand('cmdIniciarTarefa', (signal) =>
      execBff<Output<'tarefas.inicio_membro.cmdIniciarTarefa'>>('tarefas.inicio_membro.cmdIniciarTarefa', input, { mode: 'blocking', signal }),
    );
  }

  /** request cmdEnviarParaRevisao — sends an in-progress task (also a returned one already adjusted) to the creator's review; redraws resumo and pendencias (replace) with the returned values, no reload; @param id id of the pending task to send (its version is read from the loaded pendencias) */
  public async cmdEnviarParaRevisao(id: string): Promise<void> {
    const version = this.prepareCommand('cmdEnviarParaRevisao', id);
    if (version === null) return;
    const input: Input<'tarefas.inicio_membro.cmdEnviarParaRevisao'> = { id, version };
    await this.submitCommand('cmdEnviarParaRevisao', (signal) =>
      execBff<Output<'tarefas.inicio_membro.cmdEnviarParaRevisao'>>('tarefas.inicio_membro.cmdEnviarParaRevisao', input, { mode: 'blocking', signal }),
    );
  }

  /** request cmdAceitarEntrega — accepts the delivery of a task the member created and that is in review, concluding it; redraws resumo and pendencias (replace) with the returned values, no reload; @param id id of the pending task to accept (its version is read from the loaded pendencias) */
  public async cmdAceitarEntrega(id: string): Promise<void> {
    const version = this.prepareCommand('cmdAceitarEntrega', id);
    if (version === null) return;
    const input: Input<'tarefas.inicio_membro.cmdAceitarEntrega'> = { id, version };
    await this.submitCommand('cmdAceitarEntrega', (signal) =>
      execBff<Output<'tarefas.inicio_membro.cmdAceitarEntrega'>>('tarefas.inicio_membro.cmdAceitarEntrega', input, { mode: 'blocking', signal }),
    );
  }

  /** request cmdDevolverComMotivo — returns for adjustment, with a required reason, a task the member created and that is in review; the reason comes from cmdDevolverComMotivoDraft.details.motivoDevolucao (empty reason gives client.requiredMissing, no call); redraws resumo and pendencias (replace) with the returned values and clears the draft; @param id id of the pending task to return (its version is read from the loaded pendencias) */
  public async cmdDevolverComMotivo(id: string): Promise<void> {
    const version = this.prepareCommand('cmdDevolverComMotivo', id);
    if (version === null) return;
    const motivo = (this.cmdDevolverComMotivoDraft.details.motivoDevolucao ?? '').trim();
    if (motivo === '') {
      this.publishCommand('cmdDevolverComMotivo', 'error', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['cmdDevolverComMotivoDraft'] },
      });
      return;
    }
    const input: Input<'tarefas.inicio_membro.cmdDevolverComMotivo'> = { id, version, details: { motivoDevolucao: motivo } };
    await this.submitCommand(
      'cmdDevolverComMotivo',
      (signal) =>
        execBff<Output<'tarefas.inicio_membro.cmdDevolverComMotivo'>>('tarefas.inicio_membro.cmdDevolverComMotivo', input, { mode: 'blocking', signal }),
      () => {
        this.publish('cmdDevolverComMotivoDraft', emptyCmdDevolverComMotivoDraft());
      },
    );
  }

  /** navigate — opens the member's task list (minhas_tarefas) from the overview; carries nothing */
  public abrirMinhasTarefas(): void {
    auraNavigate('/tarefas/minhas_tarefas', { basePath: '/tarefas' });
  }

  /** navigate — opens the member's daily notices (meus_avisos) from the daily notice alert; carries nothing */
  public abrirMeusAvisos(): void {
    auraNavigate('/tarefas/meus_avisos', { basePath: '/tarefas' });
  }

  /** navigate — opens a pending task in minhas_tarefas to adjust it, selecting it there (param tarefaId); @param tarefaId id of the task the person picked; null or empty is refused with client.preconditionMissing in qryInicioMembroError */
  public abrirTarefaParaAjustar(tarefaId: string | null): void {
    if (tarefaId === null || tarefaId === '') {
      this.publish('qryInicioMembroError', { code: 'client.preconditionMissing', message: '', details: { params: ['tarefaId'] } });
      return;
    }
    auraNavigate(`/tarefas/minhas_tarefas?tarefaId=${encodeURIComponent(tarefaId)}`, { basePath: '/tarefas' });
  }
}
