/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import type { AvisoResumo, AvisoLinhaTarefa } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-range-dual-calendar.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-view-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meus avisos',
  pageIntro: 'Os avisos diários das 8h: escolha um dia e veja o que vencia ou já estava atrasado.',
  tabAvisos: 'Avisos',
  tabRegistro: 'Registro de envio',
  filterLabel: 'Período de referência',
  filterStart: 'De',
  filterEnd: 'Até',
  filterClear: 'Limpar período',
  listEmpty: 'Nenhum aviso neste período.',
  colDia: 'Dia',
  colSituacao: 'Situação',
  tasksCount: 'tarefas',
  overdueCount: 'atrasadas',
  statusPending: 'Aguardando envio',
  statusCompleted: 'Enviado',
  statusFailed: 'Falhou',
  avisoDe: 'Aviso de',
  metricTarefas: 'Tarefas no aviso',
  metricAtrasadas: 'Atrasadas',
  tableTitulo: 'Tarefa',
  tablePrazo: 'Prazo',
  tableSituacao: 'Situação',
  tableEmpty: 'Este aviso não trouxe tarefas.',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  taskAFazer: 'A fazer',
  taskEmAndamento: 'Em andamento',
  taskEmRevisao: 'Em revisão',
  taskConcluida: 'Concluída',
  taskCancelada: 'Cancelada',
  panelHint: 'Escolha um aviso na lista para ver as tarefas que vencem naquele dia ou já estavam atrasadas.',
  geradoEm: 'Gerado em',
  finalizadoEm: 'Finalizado em',
  motivoFalha: 'Motivo da falha',
  notFinished: 'Ainda não finalizado',
  historyEmpty: 'Nenhum envio registrado.',
  loadingPage: 'Carregando seus avisos…',
  loadingNotice: 'Abrindo o aviso…',
  errorTitle: 'Não foi possível carregar seus avisos.',
  errorNotice: 'Não foi possível abrir este aviso.',
  retry: 'Tentar de novo',
  missingTitle: 'Esta página foi aberta sem o que ela precisa.',
  missingBody: 'Os avisos dependem da pessoa logada e do contexto de onde você veio. Volte e abra os avisos de novo.',
  back: 'Voltar',
  emptyTitle: 'Você ainda não recebeu avisos diários.',
  emptyBody: 'Quando houver tarefas abertas vencendo ou atrasadas, o aviso das 8h aparece aqui.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

function currentLang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function formatDay(v: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(currentLang(), { dateStyle: 'medium' }).format(d);
}

function formatMoment(v: string): string {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(currentLang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

const chipBase = 'inline-block px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap';

@customElement('tarefas--web--desktop--page11--meus_avisos-102047')
export class TarefasDesktopPage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private avisoStatusLabel(s: AvisoResumo['status']) {
    switch (s) {
      case 'completed': return this.msg['statusCompleted'];
      case 'failed': return this.msg['statusFailed'];
      default: return this.msg['statusPending'];
    }
  }

  private avisoStatusChip(s: AvisoResumo['status']) {
    const tone = s === 'completed'
      ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
      : s === 'failed'
        ? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
        : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    return html`<span class="${chipBase} ${tone}">${this.avisoStatusLabel(s)}</span>`;
  }

  private tarefaStatusLabel(s: AvisoLinhaTarefa['tarefa']['status']) {
    switch (s) {
      case 'emAndamento': return this.msg['taskEmAndamento'];
      case 'emRevisao': return this.msg['taskEmRevisao'];
      case 'concluida': return this.msg['taskConcluida'];
      case 'cancelada': return this.msg['taskCancelada'];
      default: return this.msg['taskAFazer'];
    }
  }

  private prazoChip(s: AvisoLinhaTarefa['situacaoPrazo']) {
    return s === 'overdue'
      ? html`<span class="${chipBase} bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${this.msg['overdue']}</span>`
      : html`<span class="${chipBase} bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['dueToday']}</span>`;
  }

  private renderCentered(title: string, body: string, actions: unknown) {
    return html`
      <div class="flex flex-col items-center justify-center text-center gap-3 py-24 max-w-md mx-auto" aria-live="polite">
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${title}</h2>
        ${body ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${body}</p>` : nothing}
        ${actions}
      </div>`;
  }

  private renderFilter() {
    const hasFilter = this.filtroDataInicio !== null || this.filtroDataFim !== null;
    return html`
      <div class="flex flex-col gap-2 pb-3">
        <groupenterdateinterval--ml-date-range-dual-calendar
          .startDate=${this.filtroDataInicio}
          .endDate=${this.filtroDataFim}
          .locale=${currentLang() ?? ''}
          .loading=${this.qryListarMeusAvisosStatus === 'loading'}
          @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => {
            this.setFiltroDataInicio(e.detail.startDate);
            this.setFiltroDataFim(e.detail.endDate);
            this.qryListarMeusAvisos({ dataInicio: e.detail.startDate, dataFim: e.detail.endDate });
          }}>
          <Label>${this.msg['filterLabel']}</Label>
          <LabelStart>${this.msg['filterStart']}</LabelStart>
          <LabelEnd>${this.msg['filterEnd']}</LabelEnd>
        </groupenterdateinterval--ml-date-range-dual-calendar>
        ${hasFilter ? html`
          <button type="button"
            class="self-start text-sm underline text-[var(--link-text,currentColor)] min-h-8 rounded focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => {
              this.setFiltroDataInicio(null);
              this.setFiltroDataFim(null);
              this.qryListarMeusAvisos({ dataInicio: null, dataFim: null });
            }}>${this.msg['filterClear']}</button>` : nothing}
        ${this.qryListarMeusAvisosError ? html`<p class="text-sm text-[var(--text-default,currentColor)]" aria-live="polite">${this.msg['errorTitle']}</p>` : nothing}
      </div>`;
  }

  private renderList() {
    const items = this.avisos.items;
    const currentId = this.avisoAtual?.id ?? this.selectedAvisoVencimento;
    return html`
      ${this.renderFilter()}
      <groupviewdata--ml-vertical-record-list
        .hoverable=${true}
        .loading=${this.qryListarMeusAvisosStatus === 'loading'}
        @row-click=${(e: CustomEvent<{ index: number }>) => {
          const aviso = items[e.detail.index];
          if (aviso) this.selectAvisoVencimento(aviso.id);
        }}>
        <Columns>
          <Column field="dia" header=${this.msg['colDia']} />
          <Column field="situacao" header=${this.msg['colSituacao']} align="right" />
        </Columns>
        <Rows>
          ${items.map((a) => html`
            <Row ?selected=${a.id === currentId}>
              <Cell>
                <div class="font-medium text-[var(--text-strong,currentColor)]">${formatDay(a.dataReferencia)}</div>
                <div class="text-xs text-[var(--text-muted,currentColor)]">${a.details.quantidadeTarefas} ${this.msg['tasksCount']} · ${a.details.quantidadeAtrasadas} ${this.msg['overdueCount']}</div>
              </Cell>
              <Cell>${this.avisoStatusChip(a.status)}</Cell>
            </Row>`)}
        </Rows>
        <Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['listEmpty']}</div></Empty>
        <Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['loadingPage']}</div></Loading>
      </groupviewdata--ml-vertical-record-list>`;
  }

  private renderHistory() {
    const items = this.avisos.items;
    return html`
      <groupviewdata--ml-timeline-view .hoverable=${false}>
        <Columns>
          <Column field="dia" header=${this.msg['colDia']} />
          <Column field="envio" header=${this.msg['colSituacao']} />
        </Columns>
        <Rows>
          ${items.map((a) => html`
            <Row>
              <Cell><span class="font-medium text-[var(--text-strong,currentColor)]">${formatDay(a.dataReferencia)}</span></Cell>
              <Cell>
                <div class="flex flex-col gap-1 text-sm">
                  <div>${this.avisoStatusChip(a.status)}</div>
                  <div class="text-[var(--text-default,currentColor)]">${this.msg['geradoEm']} ${formatMoment(a.details.geradoEm)}</div>
                  <div class="text-[var(--text-muted,currentColor)]">${a.details.finalizadoEm ? html`${this.msg['finalizadoEm']} ${formatMoment(a.details.finalizadoEm)}` : this.msg['notFinished']}</div>
                  ${a.details.motivoFalha ? html`<div class="text-[var(--text-default,currentColor)]">${this.msg['motivoFalha']}: ${a.details.motivoFalha}</div>` : nothing}
                </div>
              </Cell>
            </Row>`)}
        </Rows>
        <Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['historyEmpty']}</div></Empty>
      </groupviewdata--ml-timeline-view>`;
  }

  private renderPanel() {
    const loading = this.qryAvisoPorIdStatus === 'loading';
    const aviso = this.avisoAtual;
    if (this.qryAvisoPorIdError) {
      return html`
        <div class="flex flex-col items-start gap-3" aria-live="polite">
          <p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['errorNotice']}</p>
          <button type="button"
            class="px-4 min-h-10 rounded-md border bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border-[var(--button-secondary-border,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => this.selectAvisoVencimento(this.selectedAvisoVencimento)}>${this.msg['retry']}</button>
        </div>`;
    }
    if (!aviso) {
      return html`<p class="text-sm text-[var(--text-muted,currentColor)] py-16 text-center">${loading ? this.msg['loadingNotice'] : this.msg['panelHint']}</p>`;
    }
    const tarefas = aviso.details.tarefas;
    return html`
      <div class="flex flex-col gap-5 ${loading ? 'opacity-60' : ''}" aria-busy=${loading ? 'true' : 'false'}>
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['avisoDe']} ${formatDay(aviso.dataReferencia)}</h2>
          ${this.avisoStatusChip(aviso.status)}
        </div>
        <div class="grid grid-cols-2 gap-4">
          <groupviewmetric--ml-metric-card .loading=${loading}>
            <Label>${this.msg['metricTarefas']}</Label>
            <Value>${aviso.details.quantidadeTarefas}</Value>
          </groupviewmetric--ml-metric-card>
          <groupviewmetric--ml-metric-card .loading=${loading}>
            <Label>${this.msg['metricAtrasadas']}</Label>
            <Value>${aviso.details.quantidadeAtrasadas}</Value>
          </groupviewmetric--ml-metric-card>
        </div>
        <groupviewtable--ml-view-table .loading=${loading}>
          <TableHeader>
            <TableRow>
              <TableHead key="titulo">${this.msg['tableTitulo']}</TableHead>
              <TableHead key="prazo">${this.msg['tablePrazo']}</TableHead>
              <TableHead key="situacao">${this.msg['tableSituacao']}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${tarefas.map((t) => html`
              <TableRow key=${t.tarefaId}>
                <TableCell>
                  <div class="font-medium text-[var(--text-strong,currentColor)]">${t.tarefa.titulo}</div>
                  <div class="text-xs text-[var(--text-muted,currentColor)]">${this.tarefaStatusLabel(t.tarefa.status)}</div>
                </TableCell>
                <TableCell sort-value=${t.prazo}>${formatDay(t.prazo)}</TableCell>
                <TableCell>${this.prazoChip(t.situacaoPrazo)}</TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>${this.msg['tableEmpty']}</Empty>
        </groupviewtable--ml-view-table>
      </div>`;
  }

  private renderBody() {
    if (this.pageStatus === 'idle' || this.pageStatus === 'loading') {
      return html`<p class="py-24 text-center text-sm text-[var(--text-muted,currentColor)]" aria-busy="true" aria-live="polite">${this.msg['loadingPage']}</p>`;
    }
    if (this.pageStatus === 'error') {
      if (this.qryPaginaMeusAvisosError?.code === 'client.preconditionMissing') {
        return this.renderCentered(this.msg['missingTitle'], this.msg['missingBody'], html`
          <button type="button"
            class="px-4 min-h-10 rounded-md border bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border-[var(--button-secondary-border,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => history.back()}>${this.msg['back']}</button>`);
      }
      return this.renderCentered(this.msg['errorTitle'], '', html`
        <button type="button"
          class="px-4 min-h-10 rounded-md bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          @click=${() => this.qryPaginaMeusAvisos()}>${this.msg['retry']}</button>`);
    }
    if (this.pageStatus === 'empty') {
      return this.renderCentered(this.msg['emptyTitle'], this.msg['emptyBody'], nothing);
    }
    return html`
      <div class="grid grid-cols-[minmax(320px,380px)_1fr] gap-6 items-start">
        <section class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
          <molecules--ml-scenary-102020 mode="tabs"
            .value=${this.scenary || 'avisos'}
            @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
            <Scene value="avisos" title=${this.msg['tabAvisos']}>
              <div data-organism-id="listaAvisos" class="pt-3">${this.renderList()}</div>
            </Scene>
            <Scene value="registro" title=${this.msg['tabRegistro']}>
              <div data-organism-id="historicoAvisos" class="pt-3">${this.renderHistory()}</div>
            </Scene>
          </molecules--ml-scenary-102020>
        </section>
        <section data-organism-id="avisoDoDia" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 min-h-[320px]">
          ${this.renderPanel()}
        </section>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full p-6 flex flex-col gap-5 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="flex flex-col gap-1">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageIntro']}</p>
        </header>
        ${this.renderBody()}
      </div>`;
  }
}
