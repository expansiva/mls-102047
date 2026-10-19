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

/** Draft of the devolverComMotivo command input; every leaf is nullable until typed. */
export type DevolverComMotivoDraft = {
  id: string | null;
  version: number | null;
  details: { motivoDevolucao: string | null };
};

function emptyDevolverComMotivoDraft(): DevolverComMotivoDraft {
  return { id: null, version: null, details: { motivoDevolucao: null } };
}

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

  /** state avisoDoDia — today's daily due-date notice with delivery status and included tasks (null when not generated yet); source carregarInicio.avisoDoDia; organism avisoDoDia */
  @property({ attribute: false }) avisoDoDia: AvisoDoDia | null = null;

  /** state esperaPorMim — tasks waiting for the person, grouped by expected action: paraIniciar, paraEnviarRevisao, paraRevisar, devolvidas; source carregarInicio.esperaPorMim; organism esperaPorMim */
  @property({ attribute: false }) esperaPorMim: EsperaPorMim | null = null;

  /** state devolverComMotivoDraft — draft of the return-with-reason form (the typed reason lives in details.motivoDevolucao); source devolverComMotivo.input; organism esperaPorMim */
  @property({ attribute: false }) devolverComMotivoDraft: DevolverComMotivoDraft = emptyDevolverComMotivoDraft();

  /** state pageStatus — overall status of the page: idle, loading, empty (nothing loaded in any list), success or error; source carregarInicio */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state carregarInicioStatus — status of the initial load request; source carregarInicio */
  @property({ attribute: false }) carregarInicioStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state carregarInicioError — error of the initial load request (also used by navigations refused on a missing value); source carregarInicio */
  @property({ attribute: false }) carregarInicioError: ErrorState = null;

  /** state iniciarTarefaStatus — status of the start-task command; source iniciarTarefa */
  @property({ attribute: false }) iniciarTarefaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state iniciarTarefaError — error of the start-task command; source iniciarTarefa */
  @property({ attribute: false }) iniciarTarefaError: ErrorState = null;

  /** state enviarParaRevisaoStatus — status of the send-to-review command; source enviarParaRevisao */
  @property({ attribute: false }) enviarParaRevisaoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state enviarParaRevisaoError — error of the send-to-review command; source enviarParaRevisao */
  @property({ attribute: false }) enviarParaRevisaoError: ErrorState = null;

  /** state aceitarEntregaStatus — status of the accept-delivery command; source aceitarEntrega */
  @property({ attribute: false }) aceitarEntregaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state aceitarEntregaError — error of the accept-delivery command; source aceitarEntrega */
  @property({ attribute: false }) aceitarEntregaError: ErrorState = null;

  /** state devolverComMotivoStatus — status of the return-with-reason command; source devolverComMotivo */
  @property({ attribute: false }) devolverComMotivoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state devolverComMotivoError — error of the return-with-reason command; source devolverComMotivo */
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

  public connectedCallback(): void {
    super.connectedCallback();
    const resumo = getState('ui.tarefas.inicio_membro.resumo');
    if (resumo !== undefined) this.assignState('ui.tarefas.inicio_membro.resumo', resumo);
    const aviso = getState('ui.tarefas.inicio_membro.avisoDoDia');
    if (aviso !== undefined) this.assignState('ui.tarefas.inicio_membro.avisoDoDia', aviso);
    const espera = getState('ui.tarefas.inicio_membro.esperaPorMim');
    if (espera !== undefined) this.assignState('ui.tarefas.inicio_membro.esperaPorMim', espera);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    void this.carregarInicio();
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
    this.publish('scenary', '');
    this.publish('carregarInicioStatus', 'idle');
    this.publish('carregarInicioError', null);
    this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
    this.resetCommandResults();
  }

  private resetCommandResults(): void {
    this.publish('iniciarTarefaStatus', 'idle');
    this.publish('iniciarTarefaError', null);
    this.publish('enviarParaRevisaoStatus', 'idle');
    this.publish('enviarParaRevisaoError', null);
    this.publish('aceitarEntregaStatus', 'idle');
    this.publish('aceitarEntregaError', null);
    this.publish('devolverComMotivoStatus', 'idle');
    this.publish('devolverComMotivoError', null);
  }

  private unexpected(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** Finds the version of a pending task by id across the four pending lists (picks an element, computes nothing). */
  private findVersion(id: string): number | null {
    const espera = this.esperaPorMim;
    if (!espera) return null;
    const groups: TarefaPendencia[][] = [espera.paraIniciar, espera.paraEnviarRevisao, espera.paraRevisar, espera.devolvidas];
    for (const group of groups) {
      const found = group.find((item) => item.id === id);
      if (found) return found.version;
    }
    return null;
  }

  private isEverythingEmpty(resumo: ResumoMinhasTarefas, espera: EsperaPorMim): boolean {
    return (
      resumo.tarefas.length === 0 &&
      espera.paraIniciar.length === 0 &&
      espera.paraEnviarRevisao.length === 0 &&
      espera.paraRevisar.length === 0 &&
      espera.devolvidas.length === 0
    );
  }

  private applyCommandOutput(output: { resumo: ResumoMinhasTarefas; esperaPorMim: EsperaPorMim }): void {
    this.publish('resumo', output.resumo);
    this.publish('esperaPorMim', output.esperaPorMim);
  }

  /** setScenario — publishes the visible scene of the page; clears the results of every command. */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the draft of the return-with-reason form (set details.motivoDevolucao with the typed reason); clears the results of every command. */
  public setDevolverComMotivoDraft(value: DevolverComMotivoDraft): void {
    this.resetCommandResults();
    this.publish('devolverComMotivoDraft', value);
  }

  /** request carregarInicio — loads the workload summary, today's daily notice and the tasks waiting for the person (the person is the session's); redraws resumo, avisoDoDia and esperaPorMim by replace; no arguments, also the method to reload the page */
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
      const data = response.data;
      this.publish('resumo', data.resumo);
      this.publish('avisoDoDia', data.avisoDoDia ?? null);
      this.publish('esperaPorMim', data.esperaPorMim);
      this.publish('carregarInicioStatus', 'success');
      this.publish('pageStatus', this.isEverythingEmpty(data.resumo, data.esperaPorMim) ? 'empty' : 'success');
    } catch (error) {
      this.publish('carregarInicioError', this.unexpected(error));
      this.publish('carregarInicioStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request iniciarTarefa — starts a task assigned to the person (aFazer to emAndamento); redraws resumo and esperaPorMim by replace with the recalculated values; id: the pending task to start (its version is read from esperaPorMim) */
  public async iniciarTarefa(id: string): Promise<void> {
    if (this.iniciarTarefaStatus === 'loading') return;
    const version = this.findVersion(id);
    if (version === null) {
      this.publish('iniciarTarefaError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('iniciarTarefaStatus', 'error');
      return;
    }
    this.publish('iniciarTarefaStatus', 'loading');
    this.publish('iniciarTarefaError', null);
    try {
      const input: Input<'tarefas.inicio_membro.iniciarTarefa'> = { id, version };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.inicio_membro.iniciarTarefa'>>('tarefas.inicio_membro.iniciarTarefa', input, { mode: 'blocking', signal }),
      );
      if (!response) {
        this.publish('iniciarTarefaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('iniciarTarefaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('iniciarTarefaError', response.error);
        this.publish('iniciarTarefaStatus', 'error');
        return;
      }
      this.applyCommandOutput(response.data);
      this.publish('iniciarTarefaStatus', 'success');
    } catch (error) {
      this.publish('iniciarTarefaError', this.unexpected(error));
      this.publish('iniciarTarefaStatus', 'error');
    }
  }

  /** request enviarParaRevisao — sends an in-progress task of the person (also a returned one) to the creator's review; redraws resumo and esperaPorMim by replace with the recalculated values; id: the pending task to send (its version is read from esperaPorMim) */
  public async enviarParaRevisao(id: string): Promise<void> {
    if (this.enviarParaRevisaoStatus === 'loading') return;
    const version = this.findVersion(id);
    if (version === null) {
      this.publish('enviarParaRevisaoError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('enviarParaRevisaoStatus', 'error');
      return;
    }
    this.publish('enviarParaRevisaoStatus', 'loading');
    this.publish('enviarParaRevisaoError', null);
    try {
      const input: Input<'tarefas.inicio_membro.enviarParaRevisao'> = { id, version };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.inicio_membro.enviarParaRevisao'>>('tarefas.inicio_membro.enviarParaRevisao', input, { mode: 'blocking', signal }),
      );
      if (!response) {
        this.publish('enviarParaRevisaoError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('enviarParaRevisaoStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('enviarParaRevisaoError', response.error);
        this.publish('enviarParaRevisaoStatus', 'error');
        return;
      }
      this.applyCommandOutput(response.data);
      this.publish('enviarParaRevisaoStatus', 'success');
    } catch (error) {
      this.publish('enviarParaRevisaoError', this.unexpected(error));
      this.publish('enviarParaRevisaoStatus', 'error');
    }
  }

  /** request aceitarEntrega — accepts the delivery of a task the person created, concluding it; redraws resumo and esperaPorMim by replace (the task leaves paraRevisar); id: the task in review (its version is read from esperaPorMim) */
  public async aceitarEntrega(id: string): Promise<void> {
    if (this.aceitarEntregaStatus === 'loading') return;
    const version = this.findVersion(id);
    if (version === null) {
      this.publish('aceitarEntregaError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('aceitarEntregaStatus', 'error');
      return;
    }
    this.publish('aceitarEntregaStatus', 'loading');
    this.publish('aceitarEntregaError', null);
    try {
      const input: Input<'tarefas.inicio_membro.aceitarEntrega'> = { id, version };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.inicio_membro.aceitarEntrega'>>('tarefas.inicio_membro.aceitarEntrega', input, { mode: 'blocking', signal }),
      );
      if (!response) {
        this.publish('aceitarEntregaError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('aceitarEntregaStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('aceitarEntregaError', response.error);
        this.publish('aceitarEntregaStatus', 'error');
        return;
      }
      this.applyCommandOutput(response.data);
      this.publish('aceitarEntregaStatus', 'success');
    } catch (error) {
      this.publish('aceitarEntregaError', this.unexpected(error));
      this.publish('aceitarEntregaStatus', 'error');
    }
  }

  /** request devolverComMotivo — returns a task in review that the person created back for adjustment, with the reason typed in devolverComMotivoDraft.details.motivoDevolucao; redraws resumo and esperaPorMim by replace and clears the draft; id: the task in review (its version is read from esperaPorMim) */
  public async devolverComMotivo(id: string): Promise<void> {
    if (this.devolverComMotivoStatus === 'loading') return;
    const version = this.findVersion(id);
    if (version === null) {
      this.publish('devolverComMotivoError', { code: 'client.selectionInvalid', message: '', details: { id } });
      this.publish('devolverComMotivoStatus', 'error');
      return;
    }
    const motivo = this.devolverComMotivoDraft.details.motivoDevolucao;
    if (motivo === null || motivo.trim() === '') {
      this.publish('devolverComMotivoError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['ui.tarefas.inicio_membro.devolverComMotivoDraft'] },
      });
      this.publish('devolverComMotivoStatus', 'error');
      return;
    }
    this.publish('devolverComMotivoStatus', 'loading');
    this.publish('devolverComMotivoError', null);
    try {
      const input: Input<'tarefas.inicio_membro.devolverComMotivo'> = { id, version, details: { motivoDevolucao: motivo } };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'tarefas.inicio_membro.devolverComMotivo'>>('tarefas.inicio_membro.devolverComMotivo', input, { mode: 'blocking', signal }),
      );
      if (!response) {
        this.publish('devolverComMotivoError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('devolverComMotivoStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('devolverComMotivoError', response.error);
        this.publish('devolverComMotivoStatus', 'error');
        return;
      }
      this.applyCommandOutput(response.data);
      this.publish('devolverComMotivoDraft', emptyDevolverComMotivoDraft());
      this.publish('devolverComMotivoStatus', 'success');
    } catch (error) {
      this.publish('devolverComMotivoError', this.unexpected(error));
      this.publish('devolverComMotivoStatus', 'error');
    }
  }

  /** navigate — opens the page minhas_tarefas (carries nothing) from the workload summary */
  public abrirMinhasTarefas(): void {
    auraNavigate('/tarefas/minhas_tarefas', { basePath: '/tarefas' });
  }

  /** navigate — opens the page meus_avisos, carrying today's notice id (avisoVencimentoId) when the notice exists */
  public abrirMeusAvisos(): void {
    const aviso = this.avisoDoDia;
    if (aviso && aviso.id) {
      auraNavigate(`/tarefas/meus_avisos?avisoVencimentoId=${encodeURIComponent(aviso.id)}`, { basePath: '/tarefas' });
      return;
    }
    auraNavigate('/tarefas/meus_avisos', { basePath: '/tarefas' });
  }

  /** navigate — opens minhas_tarefas with the given task selected (tarefaId) so the person adjusts a returned task; tarefaId: id of the task picked */
  public abrirTarefaParaAjustar(tarefaId: string | null): void {
    if (tarefaId === null || tarefaId === '') {
      this.publish('carregarInicioError', { code: 'client.preconditionMissing', message: '', details: { params: ['tarefaId'] } });
      return;
    }
    auraNavigate(`/tarefas/minhas_tarefas?tarefaId=${encodeURIComponent(tarefaId)}`, { basePath: '/tarefas' });
  }
}
