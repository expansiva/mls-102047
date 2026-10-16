/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meus avisos',
  pageSubtitle: 'Tarefas que vencem hoje ou estão atrasadas, avisadas às 8h.',
  sceneAviso: 'Tarefas vencendo',
  sceneAvisos: 'Avisos recebidos',
  back: 'Voltar ao aviso',
  avisoDe: 'Aviso de',
  totalTarefas: 'Tarefas no aviso',
  totalAtrasadas: 'Atrasadas',
  helperTarefas: 'vencem hoje ou já venceram',
  helperAtrasadas: 'com prazo anterior ao aviso',
  colTarefa: 'Tarefa',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colData: 'Data de referência',
  colResumo: 'Resumo',
  colQuando: 'Data do aviso',
  colEnvio: 'Envio',
  tarefasWord: 'tarefas',
  atrasadasWord: 'atrasadas',
  emptyTasks: 'Nenhuma tarefa vencendo neste aviso.',
  emptyList: 'Você ainda não recebeu nenhum aviso.',
  noOpenAviso: 'Nenhum aviso aberto. Escolha um na lista de avisos.',
  seeAvisos: 'Ver meus avisos',
  loadMore: 'Carregar mais avisos',
  loading: 'Carregando seus avisos…',
  loadingAviso: 'Abrindo o aviso…',
  historyTitle: 'Envio dos avisos',
  generatedAt: 'Gerado em',
  finishedAt: 'finalizado em',
  failedWith: 'Envio falhou',
  statusPending: 'Aguardando envio',
  statusCompleted: 'Enviado',
  statusFailed: 'Falhou',
  taskAFazer: 'A fazer',
  taskEmAndamento: 'Em andamento',
  taskEmRevisao: 'Em revisão',
  taskConcluida: 'Concluída',
  taskCancelada: 'Cancelada',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  errorTitle: 'Não foi possível carregar seus avisos',
  errorGeneric: 'Tente novamente em instantes.',
  retry: 'Tentar de novo',
  preconditionTitle: 'Faltam informações para abrir seus avisos',
  preconditionBody: 'Esta página foi aberta sem a sessão ou o contexto necessário. Volte para a página anterior e abra os avisos de lá.',
  goBack: 'Voltar à página anterior',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

const lang = () => document.documentElement.lang || undefined;

function formatDate(value: string | undefined | null): string {
  if (!value) return '';
  const d = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function formatDateTime(value: string | undefined | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

const badgeBase = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';

function avisoStatusClass(status: 'pending' | 'completed' | 'failed'): string {
  if (status === 'completed') return `${badgeBase} bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]`;
  if (status === 'failed') return `${badgeBase} bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]`;
  return `${badgeBase} bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]`;
}

function prazoClass(situacao: 'dueToday' | 'overdue'): string {
  if (situacao === 'overdue') return `${badgeBase} bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]`;
  return `${badgeBase} bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]`;
}

const btnSecondary = 'min-h-11 w-full rounded-lg border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50';
const btnPrimary = 'min-h-11 rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 text-sm font-medium text-[var(--button-primary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50';

@customElement('tarefas--web--mobile--page11--meus_avisos-102047')
export class TarefasMobilePage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private avisoStatusLabel(status: 'pending' | 'completed' | 'failed') {
    if (status === 'completed') return this.msg.statusCompleted;
    if (status === 'failed') return this.msg.statusFailed;
    return this.msg.statusPending;
  }

  private taskStatusLabel(status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada') {
    switch (status) {
      case 'aFazer': return this.msg.taskAFazer;
      case 'emAndamento': return this.msg.taskEmAndamento;
      case 'emRevisao': return this.msg.taskEmRevisao;
      case 'concluida': return this.msg.taskConcluida;
      default: return this.msg.taskCancelada;
    }
  }

  private renderPrecondition() {
    return html`
      <section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" role="alert">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.preconditionTitle}</h2>
        <p class="mt-2 text-sm text-[var(--text-default,currentColor)]">${this.msg.preconditionBody}</p>
        <button type="button" class="${btnPrimary} mt-4 w-full" @click=${() => window.history.back()}>${this.msg.goBack}</button>
      </section>`;
  }

  private renderLoadError() {
    const err = this.carregarMeusAvisosError;
    if (!err) return nothing;
    return html`
      <section class="mb-4 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-live="polite">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.errorTitle}</h2>
        <p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${err.message || this.msg.errorGeneric}</p>
        <button type="button" class="${btnSecondary} mt-3" ?disabled=${this.carregarMeusAvisosStatus === 'loading'}
          @click=${() => this.carregarMeusAvisos()}>${this.msg.retry}</button>
      </section>`;
  }

  private renderDetalhe() {
    const aviso = this.avisoAberto;
    const loading = this.abrirAvisoStatus === 'loading' || (this.pageStatus === 'loading' && !aviso);
    return html`
      <div data-organism-id="detalheAviso" class="flex flex-col gap-4" aria-busy=${loading ? 'true' : 'false'}>
        ${this.abrirAvisoError ? html`
          <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3 text-sm text-[var(--text-default,currentColor)]" aria-live="polite">
            <p>${this.abrirAvisoError.message || this.msg.errorGeneric}</p>
            <button type="button" class="${btnSecondary} mt-2"
              @click=${() => this.abrirAviso(this.selectedAvisoVencimento)}>${this.msg.retry}</button>
          </div>` : nothing}
        ${loading ? html`<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.pageStatus === 'loading' ? this.msg.loading : this.msg.loadingAviso}</p>`
        : !aviso ? html`<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.noOpenAviso}</p>`
        : html`
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.avisoDe} ${formatDate(aviso.dataReferencia)}</p>
            <span class=${avisoStatusClass(aviso.status)}>${this.avisoStatusLabel(aviso.status)}</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
              <groupviewmetric--ml-metric-big-number>
                <Label>${this.msg.totalTarefas}</Label>
                <Value>${aviso.details.details.quantidadeTarefas}</Value>
                <Helper>${this.msg.helperTarefas}</Helper>
              </groupviewmetric--ml-metric-big-number>
            </div>
            <div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
              <groupviewmetric--ml-metric-big-number>
                <Label>${this.msg.totalAtrasadas}</Label>
                <Value>${aviso.details.details.quantidadeAtrasadas}</Value>
                <Helper>${this.msg.helperAtrasadas}</Helper>
              </groupviewmetric--ml-metric-big-number>
            </div>
          </div>
          <groupviewtable--ml-responsive-table>
            <TableHeader>
              <TableRow>
                <TableHead key="titulo">${this.msg.colTarefa}</TableHead>
                <TableHead key="prazo">${this.msg.colPrazo}</TableHead>
                <TableHead key="situacao">${this.msg.colSituacao}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              ${aviso.details.tarefas.map(t => html`
                <TableRow key=${t.tarefa.id}>
                  <TableCell>
                    <span class="font-medium text-[var(--text-strong,currentColor)]">${t.tarefa.titulo}</span>
                    <span class="block text-xs text-[var(--text-muted,currentColor)]">${this.taskStatusLabel(t.tarefa.status)}</span>
                  </TableCell>
                  <TableCell>${formatDate(t.details.tarefas.prazo)}</TableCell>
                  <TableCell>
                    <span class=${prazoClass(t.details.tarefas.situacaoPrazo)}>${t.details.tarefas.situacaoPrazo === 'overdue' ? this.msg.overdue : this.msg.dueToday}</span>
                  </TableCell>
                </TableRow>`)}
            </TableBody>
            <Empty><p class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.emptyTasks}</p></Empty>
          </groupviewtable--ml-responsive-table>`}
        <button type="button" class=${btnSecondary} @click=${() => this.setScenario('avisos')}>${this.msg.seeAvisos}</button>
      </div>`;
  }

  private renderLista() {
    const items = this.avisos?.items ?? [];
    const current = this.selectedAvisoVencimento ?? this.avisoAberto?.id ?? null;
    const loading = this.pageStatus === 'loading';
    return html`
      <div data-organism-id="listaAvisos" class="flex flex-col gap-3">
        <groupviewdata--ml-vertical-record-list
          .loading=${loading}
          @row-click=${(e: CustomEvent<{ index: number }>) => {
            const item = items[e.detail.index];
            if (!item) return;
            this.abrirAviso(item.id);
            this.setScenario('aviso');
          }}>
          <Columns>
            <Column field="data" header=${this.msg.colData} />
            <Column field="resumo" header=${this.msg.colResumo} align="right" />
          </Columns>
          <Rows>
            ${items.map(a => html`
              <Row ?selected=${a.id === current}>
                <Cell>
                  <div class="flex min-h-11 flex-col justify-center gap-1">
                    <span class="font-medium text-[var(--text-strong,currentColor)]">${formatDate(a.dataReferencia)}</span>
                    <span class=${avisoStatusClass(a.status)}>${this.avisoStatusLabel(a.status)}</span>
                  </div>
                </Cell>
                <Cell>
                  <div class="text-xs text-[var(--text-default,currentColor)]">
                    <div>${a.details.details.quantidadeTarefas} ${this.msg.tarefasWord}</div>
                    <div class="text-[var(--text-muted,currentColor)]">${a.details.details.quantidadeAtrasadas} ${this.msg.atrasadasWord}</div>
                  </div>
                </Cell>
              </Row>`)}
          </Rows>
          <Loading><p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.loading}</p></Loading>
          <Empty><p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.emptyList}</p></Empty>
        </groupviewdata--ml-vertical-record-list>
        ${this.avisos?.hasMore ? html`
          <button type="button" class=${btnSecondary} ?disabled=${this.carregarMeusAvisosStatus === 'loading'}
            aria-busy=${this.carregarMeusAvisosStatus === 'loading' ? 'true' : 'false'}
            @click=${() => this.carregarMeusAvisos((this.avisos?.page ?? 1) + 1, true)}>${this.msg.loadMore}</button>` : nothing}
      </div>`;
  }

  private renderHistorico() {
    const items = this.avisos?.items ?? [];
    return html`
      <section data-organism-id="historicoAvisos" class="mt-6 border-t border-[var(--border-subtle,currentColor)] pt-4">
        <h2 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.historyTitle}</h2>
        <groupviewdata--ml-timeline-view .loading=${this.pageStatus === 'loading'}>
          <Columns>
            <Column field="quando" header=${this.msg.colQuando} />
            <Column field="envio" header=${this.msg.colEnvio} />
          </Columns>
          <Rows>
            ${items.map(a => html`
              <Row>
                <Cell><span class="text-xs font-medium text-[var(--text-strong,currentColor)]">${formatDate(a.dataReferencia)}</span></Cell>
                <Cell>
                  <div class="text-xs text-[var(--text-default,currentColor)]">
                    <div>${this.msg.generatedAt} ${formatDateTime(a.details.details.geradoEm)}</div>
                    ${a.details.details.finalizadoEm ? html`<div class="text-[var(--text-muted,currentColor)]">${this.msg.finishedAt} ${formatDateTime(a.details.details.finalizadoEm)}</div>` : nothing}
                    ${a.status === 'failed' ? html`<div class="mt-0.5"><span class=${avisoStatusClass('failed')}>${this.msg.failedWith}</span>${a.details.details.motivoFalha ? html` <span class="text-[var(--text-muted,currentColor)]">${a.details.details.motivoFalha}</span>` : nothing}</div>` : nothing}
                  </div>
                </Cell>
              </Row>`)}
          </Rows>
          <Loading><p class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.loading}</p></Loading>
          <Empty><p class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.emptyList}</p></Empty>
        </groupviewdata--ml-timeline-view>
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const precondition = this.carregarMeusAvisosError?.code === 'client.preconditionMissing';
    return html`
      <main class="mx-auto min-h-screen w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-4 pb-8 pt-5 text-[var(--text-default,currentColor)]">
        <header class="mb-4">
          <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageSubtitle}</p>
        </header>
        ${precondition ? this.renderPrecondition() : html`
          ${this.renderLoadError()}
          <molecules--ml-scenary-102020
            mode="scenary"
            .backLabel=${this.msg.back}
            .value=${this.scenary || 'aviso'}
            @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
            <Scene value="aviso" title=${this.msg.sceneAviso}>
              ${this.renderDetalhe()}
            </Scene>
            <Scene value="avisos" title=${this.msg.sceneAvisos} nav="back" backTo="aviso">
              ${this.renderLista()}
              ${this.renderHistorico()}
            </Scene>
          </molecules--ml-scenary-102020>`}
      </main>`;
  }
}
