/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared, type TarefaPendencia } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  headline: '{a} e {h} vencendo hoje',
  atrasadaUma: 'atrasada',
  atrasadaVarias: 'atrasadas',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHint: 'Quando algo esperar por você, aparece aqui.',
  avisoLabel: 'Aviso diário das 8h',
  avisoTitulo: 'Aviso das 8h de',
  avisoMensagem: '{n} no aviso, {m} atrasadas.',
  avisoTarefaUma: 'tarefa',
  avisoTarefaVarias: 'tarefas',
  avisoPending: 'Envio pendente.',
  avisoCompleted: 'Aviso entregue.',
  avisoFailed: 'Falha no envio do aviso.',
  avisoAbrir: 'Ver tarefas do aviso',
  avisoNenhum: 'O aviso das 8h de hoje ainda não foi gerado.',
  esperaLabel: 'O que espera por mim',
  laneDevolvidas: 'Devolvidas para ajustar',
  laneRevisar: 'Entregas para você revisar',
  laneEnviar: 'Em andamento para entregar',
  laneIniciar: 'Para iniciar',
  verDemais: 'Ver as demais',
  prazo: 'Prazo',
  checklist: 'Checklist',
  entreguePor: 'Entregue por',
  devolvidaPor: 'Devolvida por',
  devolvidaEm: 'em',
  motivo: 'Motivo',
  abrirParaAjustar: 'Toque para abrir e ajustar',
  prioLow: 'Prioridade baixa',
  prioMedium: 'Prioridade média',
  prioHigh: 'Prioridade alta',
  btnIniciar: 'Iniciar tarefa',
  btnEnviar: 'Enviar para revisão',
  btnReenviar: 'Reenviar para revisão',
  btnAceitar: 'Aceitar entrega',
  btnDevolver: 'Devolver…',
  motivoLabel: 'Por que está devolvendo?',
  motivoHint: 'O motivo é obrigatório e fica registrado na tarefa.',
  motivoPlaceholder: 'Explique o que precisa ser ajustado',
  btnConfirmarDevolucao: 'Devolver para ajuste',
  btnCancelar: 'Cancelar',
  okIniciar: 'Tarefa iniciada.',
  okEnviar: 'Tarefa enviada para revisão.',
  okAceitar: 'Entrega aceita, tarefa concluída.',
  okDevolver: 'Tarefa devolvida para ajuste.',
  resumoLabel: 'Resumo das minhas tarefas',
  resumoAbertas: 'abertas',
  resumoHoje: 'vencem hoje',
  resumoAtrasadas: 'atrasadas',
  urgentes: 'Tarefas mais urgentes',
  venceHoje: 'Vence hoje',
  atrasada: 'Atrasada',
  verMinhasTarefas: 'Ver todas as minhas tarefas',
  carregando: 'Carregando seu início',
  erroTitulo: 'Não foi possível carregar o início',
  erroPrecondicao: 'Esta página foi aberta sem o que ela precisa para mostrar as suas tarefas. Volte para as suas tarefas e abra o início de novo.',
  tentarDeNovo: 'Tentar de novo',
  irMinhasTarefas: 'Ir para minhas tarefas',
  erroComando: 'Não foi possível concluir a ação:',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

type Kind = 'iniciar' | 'enviar' | 'revisar' | 'ajustar';
type Variant = 'primary' | 'secondary' | 'ghost';

function lang() {
  return document.documentElement.lang || undefined;
}

function parseDate(s: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(s);
}

function fmtDate(s: string | undefined) {
  if (!s) return '';
  const d = parseDate(s);
  if (Number.isNaN(d.getTime())) return s;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short' }).format(d);
}

function fmtNumber(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

@customElement('tarefas--web--mobile--page11--inicio_membro-102047')
export class TarefasMobilePage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="mx-auto flex w-full max-w-[430px] min-w-[320px] flex-col gap-5 bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]">
        ${this.renderBody()}
      </main>
    `;
  }

  private renderBody() {
    if (this.pageStatus === 'idle' || this.pageStatus === 'loading') return this.renderSkeleton();
    if (this.pageStatus === 'error') return this.renderError();
    return html`
      ${this.renderHeadline()}
      ${this.renderAviso()}
      ${this.renderFeedback()}
      ${this.renderEspera()}
      ${this.renderResumo()}
    `;
  }

  private renderSkeleton() {
    return html`
      <div role="status" aria-busy="true" aria-label=${this.msg['carregando']} class="flex flex-col gap-4">
        <div class="h-8 w-3/4 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-20 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-24 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-24 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-6 w-2/3 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
      </div>
    `;
  }

  private renderError() {
    const err = this.carregarInicioError;
    const missing = err?.code === 'client.preconditionMissing';
    return html`
      <section class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-4" aria-live="polite">
        <h1 class="text-lg font-semibold text-[var(--status-error-text,currentColor)]">${this.msg['erroTitulo']}</h1>
        <p class="text-sm text-[var(--status-error-text,currentColor)]">${missing ? this.msg['erroPrecondicao'] : err?.message ?? ''}</p>
        ${missing
          ? this.btn(this.msg['irMinhasTarefas'], 'primary', () => this.abrirMinhasTarefas())
          : this.btn(this.msg['tentarDeNovo'], 'primary', () => { void this.carregarInicio(); })}
      </section>
    `;
  }

  private renderHeadline() {
    if (this.pageStatus === 'empty') {
      return html`
        <header class="flex flex-col gap-1">
          <h1 class="text-2xl font-semibold leading-tight text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHint']}</p>
        </header>
      `;
    }
    const r = this.resumo;
    if (!r) return nothing;
    const a = r.quantidadeAtrasadas;
    const atrasadasTxt = `${fmtNumber(a)} ${a === 1 ? this.msg['atrasadaUma'] : this.msg['atrasadaVarias']}`;
    const text = this.msg['headline'].replace('{a}', atrasadasTxt).replace('{h}', fmtNumber(r.quantidadeVencemHoje));
    return html`
      <header>
        <h1 class="text-2xl font-semibold leading-tight text-[var(--text-strong,currentColor)]">${text}</h1>
      </header>
    `;
  }

  private renderAviso() {
    const a = this.avisoDoDia;
    const statusTxt = !a
      ? ''
      : a.status === 'completed'
        ? this.msg['avisoCompleted']
        : a.status === 'failed'
          ? this.msg['avisoFailed']
          : this.msg['avisoPending'];
    return html`
      <section data-organism-id="avisoDoDia" aria-label=${this.msg['avisoLabel']}>
        ${a
          ? html`
              <groupnotifyuser--ml-notify-banner
                type=${a.status === 'failed' ? 'error' : 'info'}
                .visible=${true}
                .dismissible=${false}
                data-class="w-full"
                @action=${() => this.abrirMeusAvisos()}
              >
                <Title>${this.msg['avisoTitulo']} ${fmtDate(a.dataReferencia)}</Title>
                <Message>
                  ${this.msg['avisoMensagem']
                    .replace(
                      '{n}',
                      `${fmtNumber(a.details.quantidadeTarefas)} ${a.details.quantidadeTarefas === 1 ? this.msg['avisoTarefaUma'] : this.msg['avisoTarefaVarias']}`,
                    )
                    .replace('{m}', fmtNumber(a.details.quantidadeAtrasadas))}
                  ${statusTxt}
                </Message>
                <Action><button type="button" class="min-h-[44px] font-medium underline">${this.msg['avisoAbrir']}</button></Action>
              </groupnotifyuser--ml-notify-banner>
            `
          : html`<p class="rounded-lg border border-[var(--border-subtle,currentColor)] px-3 py-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg['avisoNenhum']}</p>`}
      </section>
    `;
  }

  private renderFeedback() {
    const err =
      this.iniciarTarefaError ?? this.enviarParaRevisaoError ?? this.aceitarEntregaError ?? this.devolverComMotivoError;
    const ok = this.iniciarTarefaStatus === 'success'
      ? this.msg['okIniciar']
      : this.enviarParaRevisaoStatus === 'success'
        ? this.msg['okEnviar']
        : this.aceitarEntregaStatus === 'success'
          ? this.msg['okAceitar']
          : this.devolverComMotivoStatus === 'success'
            ? this.msg['okDevolver']
            : '';
    return html`
      <div aria-live="polite">
        ${err
          ? html`<p class="rounded-lg bg-[var(--status-error-bg,transparent)] px-3 py-2 text-sm text-[var(--status-error-text,currentColor)]">${this.msg['erroComando']} ${err.message}</p>`
          : ok
            ? html`<p class="rounded-lg bg-[var(--status-success-bg,transparent)] px-3 py-2 text-sm text-[var(--status-success-text,currentColor)]">${ok}</p>`
            : nothing}
      </div>
    `;
  }

  private renderEspera() {
    const e = this.esperaPorMim;
    if (!e) return html`<div data-organism-id="esperaPorMim"></div>`;
    return html`
      <div data-organism-id="esperaPorMim" aria-label=${this.msg['esperaLabel']} class="flex flex-col gap-5">
        ${this.renderLane(this.msg['laneDevolvidas'], e.devolvidas, 'ajustar')}
        ${this.renderLane(this.msg['laneRevisar'], e.paraRevisar, 'revisar')}
        ${this.renderLane(this.msg['laneEnviar'], e.paraEnviarRevisao, 'enviar')}
        ${this.renderLane(this.msg['laneIniciar'], e.paraIniciar, 'iniciar')}
      </div>
    `;
  }

  private renderLane(title: string, items: TarefaPendencia[], kind: Kind) {
    if (!items || items.length === 0) return nothing;
    const first = items.slice(0, 3);
    const rest = items.slice(3);
    return html`
      <section class="flex flex-col gap-2">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--text-strong,currentColor)]">${title}</h2>
        <ul class="flex flex-col gap-3">
          ${first.map((t) => this.renderItem(t, kind))}
        </ul>
        ${rest.length > 0
          ? html`
              <details class="group">
                <summary class="flex min-h-[44px] cursor-pointer items-center text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['verDemais']}</summary>
                <ul class="mt-2 flex flex-col gap-3">
                  ${rest.map((t) => this.renderItem(t, kind))}
                </ul>
              </details>
            `
          : nothing}
      </section>
    `;
  }

  private prioLabel(p: TarefaPendencia['prioridade']) {
    return p === 'high' ? this.msg['prioHigh'] : p === 'medium' ? this.msg['prioMedium'] : this.msg['prioLow'];
  }

  private renderItem(t: TarefaPendencia, kind: Kind) {
    const person =
      kind === 'revisar'
        ? `${this.msg['entreguePor']} ${t.responsavel?.details?.identification?.name ?? ''}`
        : kind === 'ajustar'
          ? `${this.msg['devolvidaPor']} ${t.criador?.details?.identification?.name ?? ''}`
          : '';
    const head = html`
      <div class="flex items-start justify-between gap-3">
        <span class="min-w-0 flex-1 break-words text-base font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
        <span class="shrink-0 text-right text-sm font-semibold tabular-nums text-[var(--text-strong,currentColor)]" aria-label=${this.msg['prazo']}>${fmtDate(t.prazo)}</span>
      </div>
      <div class="mt-1 flex flex-wrap gap-x-3 text-xs text-[var(--text-muted,currentColor)]">
        ${person ? html`<span>${person}${kind === 'ajustar' && t.details?.devolvidaEm ? ` ${this.msg['devolvidaEm']} ${fmtDate(t.details.devolvidaEm)}` : ''}</span>` : nothing}
        <span>${this.prioLabel(t.prioridade)}</span>
        ${t.details?.progressoChecklist ? html`<span>${this.msg['checklist']} ${t.details.progressoChecklist}</span>` : nothing}
      </div>
      ${kind === 'ajustar' && t.details?.motivoDevolucao
        ? html`<p class="mt-2 text-sm text-[var(--text-default,currentColor)]"><span class="text-[var(--text-muted,currentColor)]">${this.msg['motivo']}:</span> ${t.details.motivoDevolucao}</p>`
        : nothing}
    `;
    return html`
      <li class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        ${kind === 'ajustar'
          ? html`
              <button type="button" class="block min-h-[44px] w-full text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.abrirTarefaParaAjustar(t.id)}>
                ${head}
                <span class="mt-1 block text-xs text-[var(--link-text,currentColor)]">${this.msg['abrirParaAjustar']}</span>
              </button>
            `
          : html`<div>${head}</div>`}
        <div class="mt-3 flex flex-col gap-2">${this.renderActions(t, kind)}</div>
      </li>
    `;
  }

  private renderActions(t: TarefaPendencia, kind: Kind) {
    if (kind === 'iniciar') {
      return this.btn(this.msg['btnIniciar'], 'primary', () => { void this.iniciarTarefa(t.id); }, this.iniciarTarefaStatus === 'loading');
    }
    if (kind === 'enviar') {
      return this.btn(this.msg['btnEnviar'], 'primary', () => { void this.enviarParaRevisao(t.id); }, this.enviarParaRevisaoStatus === 'loading');
    }
    if (kind === 'ajustar') {
      return this.btn(this.msg['btnReenviar'], 'secondary', () => { void this.enviarParaRevisao(t.id); }, this.enviarParaRevisaoStatus === 'loading');
    }
    const draft = this.devolverComMotivoDraft;
    if (draft.id === t.id) {
      const reason = draft.details.motivoDevolucao ?? '';
      return html`
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-[var(--text-strong,currentColor)]" for=${`motivo-${t.id}`}>${this.msg['motivoLabel']}</label>
          <textarea
            id=${`motivo-${t.id}`}
            rows="3"
            class="w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] p-3 text-base text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            placeholder=${this.msg['motivoPlaceholder']}
            .value=${reason}
            @input=${(ev: Event) =>
              this.setDevolverComMotivoDraft({ ...draft, details: { ...draft.details, motivoDevolucao: (ev.target as HTMLTextAreaElement).value } })}
          ></textarea>
          <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['motivoHint']}</p>
          ${this.btn(this.msg['btnConfirmarDevolucao'], 'primary', () => { void this.devolverComMotivo(t.id); }, this.devolverComMotivoStatus === 'loading', !reason)}
          ${this.btn(this.msg['btnCancelar'], 'ghost', () => this.setDevolverComMotivoDraft({ id: null, version: null, details: { motivoDevolucao: null } }))}
        </div>
      `;
    }
    return html`
      ${this.btn(this.msg['btnAceitar'], 'primary', () => { void this.aceitarEntrega(t.id); }, this.aceitarEntregaStatus === 'loading')}
      ${this.btn(this.msg['btnDevolver'], 'secondary', () =>
        this.setDevolverComMotivoDraft({ id: t.id, version: t.version, details: { motivoDevolucao: '' } }),
      )}
    `;
  }

  private renderResumo() {
    const r = this.resumo;
    if (!r) return html`<div data-organism-id="resumoMinhasTarefas"></div>`;
    return html`
      <section data-organism-id="resumoMinhasTarefas" aria-label=${this.msg['resumoLabel']} class="flex flex-col gap-2 border-t border-[var(--border-subtle,currentColor)] pt-4">
        <dl class="flex flex-wrap gap-x-6 gap-y-2 text-[var(--text-muted,currentColor)]">
          <div class="flex items-baseline gap-1.5">
            <dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${fmtNumber(r.quantidadeAbertas)}</dd>
            <dt class="text-xs">${this.msg['resumoAbertas']}</dt>
          </div>
          <div class="flex items-baseline gap-1.5">
            <dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${fmtNumber(r.quantidadeVencemHoje)}</dd>
            <dt class="text-xs">${this.msg['resumoHoje']}</dt>
          </div>
          <div class="flex items-baseline gap-1.5">
            <dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${fmtNumber(r.quantidadeAtrasadas)}</dd>
            <dt class="text-xs">${this.msg['resumoAtrasadas']}</dt>
          </div>
        </dl>
        ${r.tarefas && r.tarefas.length > 0
          ? html`
              <details>
                <summary class="flex min-h-[44px] cursor-pointer items-center text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['urgentes']}</summary>
                <ul class="flex flex-col">
                  ${r.tarefas.map(
                    (t) => html`
                      <li class="flex items-start justify-between gap-3 border-b border-[var(--border-subtle,currentColor)] py-2 last:border-b-0">
                        <div class="min-w-0 flex-1">
                          <p class="break-words text-sm text-[var(--text-strong,currentColor)]">${t.titulo}</p>
                          <p class="text-xs text-[var(--text-muted,currentColor)]">${t.lista?.nome ?? ''}${t.details.progressoChecklist ? ` · ${this.msg['checklist']} ${t.details.progressoChecklist}` : ''}</p>
                        </div>
                        <div class="shrink-0 text-right text-sm tabular-nums">
                          <p class=${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : 'text-[var(--text-default,currentColor)]'}>${fmtDate(t.prazo)}</p>
                          ${t.details.atrasada
                            ? html`<p class="text-xs text-[var(--status-error-text,currentColor)]">${this.msg['atrasada']}</p>`
                            : t.details.venceHoje
                              ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['venceHoje']}</p>`
                              : nothing}
                        </div>
                      </li>
                    `,
                  )}
                </ul>
              </details>
            `
          : nothing}
        ${this.btn(this.msg['verMinhasTarefas'], 'ghost', () => this.abrirMinhasTarefas())}
      </section>
    `;
  }

  private btn(label: string, variant: Variant, onAction: () => void, loading = false, disabled = false) {
    return html`
      <grouptriggeraction--ml-button-standard
        data-variant=${variant}
        size="lg"
        data-class="w-full min-h-[44px]"
        ?loading=${loading}
        ?disabled=${disabled}
        @action=${onAction}
      >
        <Label>${label}</Label>
      </grouptriggeraction--ml-button-standard>
    `;
  }
}
