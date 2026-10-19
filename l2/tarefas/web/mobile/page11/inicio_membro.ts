/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared, emptyDevolverComMotivoDraft } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { TarefaPendencia, TarefaResumo, ErrorState, RequestStatus, AvisoDoDia } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupshowprogress/ml-linear-progress.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  headline: 'O que precisa de você agora',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHint: 'Quando algo depender de você, aparece aqui.',
  avisoTitulo: 'Aviso das 8h',
  avisoVencendo: 'Vencem hoje ou atrasadas',
  avisoAtrasadas: 'Atrasadas',
  avisoPendente: 'O aviso de hoje ainda não foi entregue.',
  avisoFalhou: 'Não foi possível entregar o aviso de hoje.',
  avisoAbrir: 'Ver tarefas do aviso',
  avisoAusente: 'O aviso de hoje ainda não foi gerado.',
  laneDevolvidas: 'Devolvidas para ajustar',
  laneRevisar: 'Entregas para revisar',
  laneEnviar: 'Prontas para enviar à revisão',
  laneIniciar: 'Para começar',
  ajustar: 'Ajustar tarefa',
  reenviar: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolver: 'Devolver com motivo',
  enviar: 'Enviar para revisão',
  iniciar: 'Iniciar tarefa',
  prazo: 'Prazo',
  criadaPor: 'Criada por',
  entreguePor: 'Entregue por',
  checklist: 'Checklist',
  motivo: 'Motivo da devolução',
  devolvidaEm: 'Devolvida em',
  colTarefa: 'Tarefa',
  panorama: 'Meu panorama',
  abertas: 'Abertas',
  vencemHoje: 'Vencem hoje',
  atrasadas: 'Atrasadas',
  venceHojeChip: 'Vence hoje',
  atrasadaChip: 'Atrasada',
  verTodas: 'Ver todas as minhas tarefas',
  okIniciar: 'Tarefa iniciada.',
  okEnviar: 'Tarefa enviada para revisão.',
  okAceitar: 'Entrega aceita. A tarefa foi concluída.',
  falhou: 'Não foi possível concluir',
  erroCarregar: 'Não foi possível carregar o seu início.',
  faltaContexto: 'Esta tela foi aberta sem o que precisa para continuar: a tarefa escolhida não foi informada. Volte para as suas tarefas e escolha de novo.',
  tentar: 'Tentar de novo',
  abrirMinhas: 'Abrir minhas tarefas',
  carregando: 'Carregando seu início',
  devolverTitulo: 'Devolver para ajuste',
  voltar: 'Voltar',
  tarefaEmRevisao: 'Tarefa em revisão',
  motivoDica: 'Explique o que precisa ser ajustado. O responsável lê isso ao retomar a tarefa.',
  motivoExemplo: 'Ex.: faltou anexar o comprovante',
  okDevolvida: 'Tarefa devolvida para ajuste.',
  voltarInicio: 'Voltar ao início'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br
};
/// **collab_i18n_end**

type LaneKey = 'devolvidas' | 'paraRevisar' | 'paraEnviarRevisao' | 'paraIniciar';

const lang = () => document.documentElement.lang || undefined;

function fmtNum(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}

function fmtDate(v: string | undefined): string {
  if (!v) return '';
  const d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(v + 'T00:00:00') : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short' }).format(d);
}

function checklistPercent(v: string): number | null {
  const match = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(v || '');
  if (!match) return null;
  const total = Number(match[2]);
  if (!total) return null;
  return Math.min(100, Math.round((Number(match[1]) * 100) / total));
}

@customElement('tarefas--web--mobile--page11--inicio_membro-102047')
export class TarefasMobilePage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    return html`
      <molecules--ml-scenary-102020
        mode="scenary"
        .value=${this.scenary || 'inicio'}
        backLabel=${m.voltar}
        @change=${(e: CustomEvent<{ value: string }>) => {
          if (e.target === e.currentTarget) {
            this.setScenario(e.detail.value);
            if (e.detail.value === 'inicio') this.setDevolverComMotivoDraft(emptyDevolverComMotivoDraft());
          }
        }}
      >
        <Scene value="inicio" title=${this.pageStatus === 'empty' ? m.goodNews : m.headline}>
          ${this.renderInicio()}
        </Scene>
        <Scene value="devolver" nav="back" backTo="inicio" title=${m.devolverTitulo}>
          ${this.renderDevolver()}
        </Scene>
      </molecules--ml-scenary-102020>
    `;
  }

  private voltarInicio() {
    this.setScenario('inicio');
    this.setDevolverComMotivoDraft(emptyDevolverComMotivoDraft());
  }

  private btn(label: string, variant: string, loading: boolean, disabled: boolean, onAction: () => unknown) {
    return html`
      <grouptriggeraction--ml-button-standard
        class="flex-1"
        data-variant=${variant}
        size="md"
        data-class="w-full min-h-[44px]"
        ?loading=${loading}
        ?disabled=${disabled}
        @action=${() => { onAction(); }}
      ><Label>${label}</Label></grouptriggeraction--ml-button-standard>
    `;
  }

  private renderLoadError(error: ErrorState) {
    const m = this.msg;
    const missing = error?.code === 'client.preconditionMissing';
    return html`
      <div role="alert" class="flex flex-col gap-3 rounded-lg p-4 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
        <p class="text-sm font-medium">${missing ? m.faltaContexto : m.erroCarregar}</p>
        <div class="flex gap-2">
          ${this.btn(m.abrirMinhas, 'secondary', false, false, () => this.abrirMinhasTarefas())}
          ${missing ? nothing : this.btn(m.tentar, 'primary', false, false, () => this.carregarInicio())}
        </div>
      </div>
    `;
  }

  private renderSkeleton() {
    const bar = 'rounded-lg animate-pulse bg-[var(--surface-alt-bg,transparent)]';
    return html`
      <div class="flex flex-col gap-4" aria-busy="true" aria-label=${this.msg.carregando}>
        <div class="${bar} h-20"></div>
        <div class="${bar} h-28"></div>
        <div class="${bar} h-28"></div>
        <div class="${bar} h-6 w-2/3"></div>
      </div>
    `;
  }

  private renderInicio() {
    const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
    if (loading) return html`<div class="w-full max-w-[430px] mx-auto px-4 py-3">${this.renderSkeleton()}</div>`;
    if (this.pageStatus === 'error') {
      return html`<div class="w-full max-w-[430px] mx-auto px-4 py-3">${this.renderLoadError(this.carregarInicioError)}</div>`;
    }
    return html`
      <div class="w-full max-w-[430px] mx-auto px-4 py-3 flex flex-col gap-5 text-[var(--text-default,currentColor)]">
        ${this.carregarInicioError ? this.renderLoadError(this.carregarInicioError) : nothing}
        ${this.renderFeedback()}
        ${this.renderAviso()}
        ${this.renderEspera()}
        ${this.renderResumo()}
      </div>
    `;
  }

  private renderFeedback() {
    const m = this.msg;
    const cmds: Array<{ status: RequestStatus; error: ErrorState; ok: string }> = [
      { status: this.iniciarTarefaStatus, error: this.iniciarTarefaError, ok: m.okIniciar },
      { status: this.enviarParaRevisaoStatus, error: this.enviarParaRevisaoError, ok: m.okEnviar },
      { status: this.aceitarEntregaStatus, error: this.aceitarEntregaError, ok: m.okAceitar }
    ];
    return html`
      <div aria-live="polite" class="sticky top-2 z-10 flex flex-col gap-2 empty:hidden">
        ${cmds.map((c) =>
          c.error
            ? html`<p role="alert" class="rounded-lg px-3 py-2 text-sm shadow bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${m.falhou}: ${c.error.message}</p>`
            : c.status === 'success'
              ? html`<p class="rounded-lg px-3 py-2 text-sm shadow bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">${c.ok}</p>`
              : nothing
        )}
      </div>
    `;
  }

  private renderAviso() {
    const m = this.msg;
    const aviso: AvisoDoDia | null = this.avisoDoDia;
    return html`
      <div data-organism-id="avisoDoDia">
        ${aviso
          ? html`
              <groupnotifyuser--ml-notify-banner
                .type=${aviso.status === 'failed' ? 'error' : 'info'}
                .visible=${true}
                .dismissible=${false}
                @action=${() => this.abrirMeusAvisos()}
              >
                <Title>${m.avisoTitulo}</Title>
                <Message>${m.avisoVencendo}: ${fmtNum(aviso.details?.quantidadeTarefas ?? 0)} · ${m.avisoAtrasadas}: ${fmtNum(aviso.details?.quantidadeAtrasadas ?? 0)}${aviso.status === 'pending' ? ' · ' + m.avisoPendente : ''}${aviso.status === 'failed' ? ' · ' + m.avisoFalhou : ''}</Message>
                <Action><span class="inline-flex min-h-[44px] items-center font-medium underline">${m.avisoAbrir}</span></Action>
              </groupnotifyuser--ml-notify-banner>
            `
          : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.avisoAusente}</p>`}
      </div>
    `;
  }

  private renderEspera() {
    const m = this.msg;
    const e = this.esperaPorMim;
    const lanes: Array<[LaneKey, TarefaPendencia[]]> = e
      ? [
          ['devolvidas', e.devolvidas],
          ['paraRevisar', e.paraRevisar],
          ['paraEnviarRevisao', e.paraEnviarRevisao],
          ['paraIniciar', e.paraIniciar]
        ]
      : [];
    return html`
      <div data-organism-id="esperaPorMim" class="flex flex-col gap-5">
        ${this.pageStatus === 'empty'
          ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.goodNewsHint}</p>`
          : lanes.map(([key, items]) => this.renderLane(key, items))}
      </div>
    `;
  }

  private laneTitle(key: LaneKey): string {
    const m = this.msg;
    if (key === 'devolvidas') return m.laneDevolvidas;
    if (key === 'paraRevisar') return m.laneRevisar;
    if (key === 'paraEnviarRevisao') return m.laneEnviar;
    return m.laneIniciar;
  }

  private renderLane(key: LaneKey, items: TarefaPendencia[]) {
    if (!items || items.length === 0) return nothing;
    const title = this.laneTitle(key);
    return html`
      <section aria-label=${title} class="flex flex-col gap-1">
        <h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${title}</h2>
        <groupviewdata--ml-vertical-record-list
          .hoverable=${true}
          @row-click=${(ev: CustomEvent<{ index: number }>) => {
            const t = items[ev.detail.index];
            if (t) this.abrirTarefaParaAjustar(t.id);
          }}
        >
          <Columns><Column field="tarefa" header=${this.msg.colTarefa} /></Columns>
          <Rows>
            ${items.map((t) => html`<Row><Cell>${this.renderRowBody(key, t)}</Cell></Row>`)}
          </Rows>
        </groupviewdata--ml-vertical-record-list>
      </section>
    `;
  }

  private renderRowBody(key: LaneKey, t: TarefaPendencia) {
    const m = this.msg;
    const who = key === 'paraRevisar'
      ? `${m.entreguePor} ${t.responsavel?.details?.identification?.name ?? ''}`
      : `${m.criadaPor} ${t.criador?.details?.identification?.name ?? ''}`;
    return html`
      <div class="flex w-full flex-col gap-2 py-1">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="break-words font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</p>
            <p class="text-xs text-[var(--text-muted,currentColor)]">${who} · ${m.checklist} ${t.details?.progressoChecklist ?? ''}</p>
          </div>
          <div class="shrink-0 text-right">
            <p class="text-xs text-[var(--text-muted,currentColor)]">${m.prazo}</p>
            <p class="font-medium tabular-nums">${fmtDate(t.prazo)}</p>
          </div>
        </div>
        ${key === 'devolvidas' && t.details?.motivoDevolucao
          ? html`
              <p class="rounded-lg px-3 py-2 text-sm bg-[var(--surface-alt-bg,transparent)] text-[var(--text-default,currentColor)]">
                <span class="block text-xs text-[var(--text-muted,currentColor)]">${m.motivo}${t.details.devolvidaEm ? ' · ' + m.devolvidaEm + ' ' + fmtDate(t.details.devolvidaEm) : ''}</span>
                ${t.details.motivoDevolucao}
              </p>
            `
          : nothing}
        <div class="flex gap-2" @click=${(ev: Event) => ev.stopPropagation()}>
          ${this.renderActions(key, t)}
        </div>
      </div>
    `;
  }

  private renderActions(key: LaneKey, t: TarefaPendencia) {
    const m = this.msg;
    const busy =
      this.iniciarTarefaStatus === 'loading' ||
      this.enviarParaRevisaoStatus === 'loading' ||
      this.aceitarEntregaStatus === 'loading';
    if (key === 'paraIniciar') {
      return this.btn(m.iniciar, 'primary', this.iniciarTarefaStatus === 'loading', busy, () => this.iniciarTarefa(t.id, t.version));
    }
    if (key === 'paraEnviarRevisao') {
      return this.btn(m.enviar, 'primary', this.enviarParaRevisaoStatus === 'loading', busy, () => this.enviarParaRevisao(t.id, t.version));
    }
    if (key === 'paraRevisar') {
      return html`
        ${this.btn(m.aceitar, 'primary', this.aceitarEntregaStatus === 'loading', busy, () => this.aceitarEntrega(t.id, t.version))}
        ${this.btn(m.devolver, 'secondary', false, busy, () => {
          this.setDevolverComMotivoDraft({ id: t.id, version: t.version, details: { motivoDevolucao: null } });
          this.setScenario('devolver');
        })}
      `;
    }
    return html`
      ${this.btn(m.ajustar, 'primary', false, busy, () => this.abrirTarefaParaAjustar(t.id))}
      ${this.btn(m.reenviar, 'secondary', this.enviarParaRevisaoStatus === 'loading', busy, () => this.enviarParaRevisao(t.id, t.version))}
    `;
  }

  private renderResumo() {
    const m = this.msg;
    const r = this.resumo;
    return html`
      <div data-organism-id="resumoMinhasTarefas" class="flex flex-col gap-3 border-t pt-4 border-[var(--border-subtle,currentColor)]">
        ${r
          ? html`
              <h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.panorama}</h2>
              <dl class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div class="flex items-baseline gap-1.5"><dt class="order-last text-xs text-[var(--text-muted,currentColor)]">${m.abertas}</dt><dd class="font-semibold tabular-nums">${fmtNum(r.quantidadeAbertas)}</dd></div>
                <div class="flex items-baseline gap-1.5"><dt class="order-last text-xs text-[var(--text-muted,currentColor)]">${m.vencemHoje}</dt><dd class="font-semibold tabular-nums">${fmtNum(r.quantidadeVencemHoje)}</dd></div>
                <div class="flex items-baseline gap-1.5"><dt class="order-last text-xs text-[var(--text-muted,currentColor)]">${m.atrasadas}</dt><dd class="font-semibold tabular-nums">${fmtNum(r.quantidadeAtrasadas)}</dd></div>
              </dl>
              <ul class="flex flex-col">
                ${(r.tarefas ?? []).map((t) => this.renderResumoItem(t))}
              </ul>
            `
          : nothing}
        <button
          type="button"
          class="min-h-[44px] w-full rounded-lg text-sm font-medium underline text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          @click=${() => this.abrirMinhasTarefas()}
        >${m.verTodas}</button>
      </div>
    `;
  }

  private renderResumoItem(t: TarefaResumo) {
    const m = this.msg;
    const pct = checklistPercent(t.details?.progressoChecklist);
    const prazoColor = t.details?.atrasada
      ? 'text-[var(--status-error-text,currentColor)]'
      : t.details?.venceHoje
        ? 'text-[var(--status-warning-text,currentColor)]'
        : 'text-[var(--text-default,currentColor)]';
    return html`
      <li class="border-b last:border-b-0 border-[var(--border-subtle,currentColor)]">
        <button
          type="button"
          class="flex min-h-[44px] w-full flex-col gap-1 py-2 text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          @click=${() => this.abrirMinhasTarefas()}
        >
          <span class="flex items-start justify-between gap-3">
            <span class="min-w-0 break-words text-sm font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
            <span class="shrink-0 text-sm font-medium tabular-nums ${prazoColor}">
              ${t.details?.atrasada ? m.atrasadaChip + ' · ' : t.details?.venceHoje ? m.venceHojeChip + ' · ' : ''}${fmtDate(t.prazo)}
            </span>
          </span>
          <span class="text-xs text-[var(--text-muted,currentColor)]">${t.lista?.nome ?? ''} · ${m.checklist} ${t.details?.progressoChecklist ?? ''}</span>
          ${pct !== null
            ? html`<groupshowprogress--ml-linear-progress .value=${pct} size="xs" label=${m.checklist}></groupshowprogress--ml-linear-progress>`
            : nothing}
        </button>
      </li>
    `;
  }

  private renderDevolver() {
    const m = this.msg;
    const d = this.devolverComMotivoDraft;
    const alvo = this.esperaPorMim?.paraRevisar.find((t) => t.id === d.id);
    const motivo = d.details.motivoDevolucao ?? '';
    if (this.devolverComMotivoStatus === 'success') {
      return html`
        <div class="w-full max-w-[430px] mx-auto px-4 py-3 flex flex-col gap-4" aria-live="polite">
          <p class="rounded-lg px-3 py-3 text-sm bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">${m.okDevolvida}</p>
          <div class="flex">${this.btn(m.voltarInicio, 'primary', false, false, () => this.voltarInicio())}</div>
        </div>
      `;
    }
    const loading = this.devolverComMotivoStatus === 'loading';
    return html`
      <form
        class="w-full max-w-[430px] mx-auto px-4 py-3 flex flex-col gap-4"
        @submit=${(e: Event) => e.preventDefault()}
      >
        ${alvo
          ? html`
              <div class="rounded-lg px-3 py-2 bg-[var(--surface-alt-bg,transparent)]">
                <p class="text-xs text-[var(--text-muted,currentColor)]">${m.tarefaEmRevisao}</p>
                <p class="break-words font-medium text-[var(--text-strong,currentColor)]">${alvo.titulo}</p>
              </div>
            `
          : nothing}
        <div class="flex flex-col gap-1">
          <label for="motivoDevolucao" class="text-sm font-medium text-[var(--text-strong,currentColor)]">${m.motivo}</label>
          <textarea
            id="motivoDevolucao"
            rows="5"
            required
            placeholder=${m.motivoExemplo}
            class="min-h-[120px] w-full rounded-lg border p-3 text-base border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            .value=${motivo}
            ?disabled=${loading}
            @input=${(e: Event) =>
              this.setDevolverComMotivoDraft({
                ...d,
                details: { ...d.details, motivoDevolucao: (e.target as HTMLTextAreaElement).value }
              })}
          ></textarea>
          <p class="text-xs text-[var(--text-muted,currentColor)]">${m.motivoDica}</p>
        </div>
        <div aria-live="polite">
          ${this.devolverComMotivoError
            ? html`<p role="alert" class="rounded-lg px-3 py-2 text-sm bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${m.falhou}: ${this.devolverComMotivoError.message}</p>`
            : nothing}
        </div>
        <div class="flex">
          ${this.btn(m.devolver, 'primary', loading, d.id === null || d.version === null || motivo.trim() === '', () => {
            if (d.id !== null && d.version !== null) this.devolverComMotivo(d.id, d.version);
          })}
        </div>
      </form>
    `;
  }
}
