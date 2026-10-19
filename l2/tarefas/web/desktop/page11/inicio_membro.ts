/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared, emptyDevolverComMotivoDraft } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { TarefaPendencia, ErrorState } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início',
  carregando: 'Carregando o seu dia…',
  goodNews: 'Nada precisa de atenção agora.',
  goodNewsHint: 'Quando algo esperar por você, aparece aqui.',
  headlineZero: 'Nenhuma tarefa atrasada nem vencendo hoje.',
  headline: 'Você tem {a} e {h}.',
  atrasadasOne: '{n} tarefa atrasada',
  atrasadasOther: '{n} tarefas atrasadas',
  hojeOne: '{n} que vence hoje',
  hojeOther: '{n} que vencem hoje',
  laneUrgentes: 'Tarefas mais urgentes',
  laneDevolvidas: 'Devolvidas para ajustar',
  laneRevisar: 'Entregas para revisar',
  laneEnviar: 'Em andamento, prontas para enviar',
  laneIniciar: 'Para iniciar',
  colTarefa: 'Tarefa',
  colSituacao: 'Situação',
  colChecklist: 'Checklist',
  colPrazo: 'Prazo',
  checklist: 'Checklist',
  prazo: 'Prazo',
  criadaPor: 'Criada por',
  responsavel: 'Responsável',
  devolvidaEm: 'Devolvida em',
  motivoLabel: 'Motivo da devolução',
  motivoHint: 'Explique o que precisa ser ajustado; o responsável lê isso ao retomar a tarefa.',
  motivoPlaceholder: 'Ex.: falta anexar o comprovante e revisar o item 3.',
  iniciar: 'Iniciar tarefa',
  enviar: 'Enviar para revisão',
  reenviar: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolver: 'Devolver com motivo',
  confirmarDevolucao: 'Devolver tarefa',
  cancelar: 'Cancelar',
  ajustar: 'Ajustar tarefa',
  conferir: 'Conferir entrega',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  prioridadeLow: 'Prioridade baixa',
  prioridadeMedium: 'Prioridade média',
  prioridadeHigh: 'Prioridade alta',
  statusAFazer: 'A fazer',
  statusEmAndamento: 'Em andamento',
  statusEmRevisao: 'Em revisão',
  statusConcluida: 'Concluída',
  statusCancelada: 'Cancelada',
  stripAbertas: 'Abertas',
  stripHoje: 'Vencem hoje',
  stripAtrasadas: 'Atrasadas',
  verTodas: 'Ver todas as minhas tarefas',
  avisoTitulo: 'Aviso diário das 8h',
  avisoMensagem: 'Aviso de {data}: {total} tarefa(s) com prazo hoje ou vencido; atrasadas: {atrasadas}.',
  avisoAcao: 'Abrir aviso completo',
  avisoVazio: 'O aviso de hoje ainda não foi gerado.',
  avisoPending: 'Envio do aviso pendente',
  avisoCompleted: 'Aviso entregue',
  avisoFailed: 'Falha ao entregar o aviso',
  sucesso: 'Pronto. As listas foram atualizadas.',
  erroAcao: 'Não foi possível concluir a ação:',
  erroCarregar: 'Não foi possível carregar o seu início.',
  erroFaltando: 'Falta informação para abrir esta tela. Volte para as suas tarefas e tente de novo.',
  tentarNovamente: 'Tentar de novo',
  abrirMinhas: 'Abrir minhas tarefas',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const muted = 'text-[var(--text-muted,currentColor)]';
const strong = 'text-[var(--text-strong,currentColor)]';
const laneBox = 'rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]';

function lang() {
  return document.documentElement.lang || undefined;
}

function fill(text: string, vars: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_m, k: string) => String(vars[k] ?? ''));
}

function parseDate(v: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : new Date(v);
}

function formatDate(v: string | undefined) {
  if (!v) return '';
  const d = parseDate(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function formatDateTime(v: string | undefined) {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d);
}

function formatNumber(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

@customElement('tarefas--web--desktop--page11--inicio_membro-102047')
export class TarefasDesktopPage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-8 py-6">
        <div class="mx-auto max-w-6xl">
          <header class="mb-4">
            <h1 class="text-sm font-medium ${muted}">${this.msg['pageTitle']}</h1>
          </header>
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <main class="min-w-0" aria-busy=${this.pageStatus === 'loading' ? 'true' : 'false'}>
              <div data-organism-id="resumoMinhasTarefas" class="flex flex-col gap-8">${this.renderMain()}</div>
            </main>
            <aside class="lg:sticky lg:top-6 self-start">
              <div data-organism-id="avisoDoDia">${this.renderAviso()}</div>
            </aside>
          </div>
        </div>
      </div>
    `;
  }

  private renderMain() {
    const s = this.pageStatus;
    if (s === 'error') return this.renderError();
    if (s === 'idle' || s === 'loading') return this.renderSkeleton();
    return html`
      ${this.renderHeadline()}
      ${this.renderFeedback()}
      ${this.renderUrgentes()}
      <div data-organism-id="esperaPorMim" class="flex flex-col gap-8">${this.renderInbox()}</div>
      ${this.renderStrip()}
    `;
  }

  private renderSkeleton() {
    const bar = 'rounded bg-[var(--surface-alt-bg,transparent)] animate-pulse';
    return html`
      <div role="status" class="flex flex-col gap-8">
        <span class="sr-only">${this.msg['carregando']}</span>
        <div class="${bar} h-9 w-2/3"></div>
        ${[0, 1].map(() => html`
          <div class="flex flex-col gap-3">
            <div class="${bar} h-5 w-48"></div>
            <div class="${bar} h-16 w-full"></div>
            <div class="${bar} h-16 w-full"></div>
          </div>`)}
        <div class="${bar} h-5 w-1/2"></div>
      </div>
    `;
  }

  private renderError() {
    const err = this.carregarInicioError;
    const missing = err?.code === 'client.preconditionMissing';
    return html`
      <div role="alert" class="rounded-lg p-5 flex flex-col gap-3 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
        <p class="font-medium">${missing ? this.msg['erroFaltando'] : this.msg['erroCarregar']}</p>
        ${err && !missing ? html`<p class="text-sm">${err.message}</p>` : nothing}
        <div class="flex gap-3">
          <grouptriggeraction--ml-button-standard size="md" data-variant="primary" @action=${() => { this.carregarInicio(); }}>
            <Label>${this.msg['tentarNovamente']}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard size="md" data-variant="secondary" @action=${() => this.abrirMinhasTarefas()}>
            <Label>${this.msg['abrirMinhas']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>
    `;
  }

  private renderHeadline() {
    if (this.pageStatus === 'empty') {
      return html`
        <section aria-live="polite">
          <p class="text-2xl font-semibold ${strong}">${this.msg['goodNews']}</p>
          <p class="mt-1 text-sm ${muted}">${this.msg['goodNewsHint']}</p>
        </section>`;
    }
    const r = this.resumo;
    if (!r) return nothing;
    const text = r.quantidadeAtrasadas === 0 && r.quantidadeVencemHoje === 0
      ? this.msg['headlineZero']
      : fill(this.msg['headline'], {
        a: fill(r.quantidadeAtrasadas === 1 ? this.msg['atrasadasOne'] : this.msg['atrasadasOther'], { n: formatNumber(r.quantidadeAtrasadas) }),
        h: fill(r.quantidadeVencemHoje === 1 ? this.msg['hojeOne'] : this.msg['hojeOther'], { n: formatNumber(r.quantidadeVencemHoje) }),
      });
    return html`<section aria-live="polite"><p class="text-2xl font-semibold ${strong}">${text}</p></section>`;
  }

  private renderFeedback() {
    const errors: ErrorState[] = [
      this.iniciarTarefaError,
      this.enviarParaRevisaoError,
      this.aceitarEntregaError,
      this.devolverComMotivoError,
    ];
    const first = errors.find((e) => e !== null) ?? null;
    const ok = [
      this.iniciarTarefaStatus,
      this.enviarParaRevisaoStatus,
      this.aceitarEntregaStatus,
      this.devolverComMotivoStatus,
    ].some((s) => s === 'success');
    return html`
      <div aria-live="polite">
        ${first ? html`
          <p role="alert" class="rounded-md px-4 py-3 text-sm bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
            ${this.msg['erroAcao']} ${first.message}
          </p>` : ok ? html`
          <p class="rounded-md px-4 py-3 text-sm bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">
            ${this.msg['sucesso']}
          </p>` : nothing}
      </div>`;
  }

  private statusLabel(s: TarefaPendencia['status']) {
    switch (s) {
      case 'aFazer': return this.msg['statusAFazer'];
      case 'emAndamento': return this.msg['statusEmAndamento'];
      case 'emRevisao': return this.msg['statusEmRevisao'];
      case 'concluida': return this.msg['statusConcluida'];
      case 'cancelada': return this.msg['statusCancelada'];
    }
  }

  private prioridadeLabel(p: TarefaPendencia['prioridade']) {
    switch (p) {
      case 'low': return this.msg['prioridadeLow'];
      case 'medium': return this.msg['prioridadeMedium'];
      case 'high': return this.msg['prioridadeHigh'];
    }
  }

  private renderUrgentes() {
    const tarefas = this.resumo?.tarefas ?? [];
    if (tarefas.length === 0) return nothing;
    return html`
      <section class="flex flex-col gap-3">
        <h2 class="text-base font-semibold ${strong}">${this.msg['laneUrgentes']}</h2>
        <div class="${laneBox} overflow-hidden">
          <groupviewdata--ml-vertical-record-list
            .hoverable=${true}
            @row-click=${(e: CustomEvent<{ index: number }>) => this.abrirTarefaParaAjustar(this.resumo?.tarefas[e.detail.index]?.id ?? null)}>
            <Columns>
              <Column field="titulo" header=${this.msg['colTarefa']} />
              <Column field="status" header=${this.msg['colSituacao']} width="9rem" />
              <Column field="checklist" header=${this.msg['colChecklist']} width="6rem" />
              <Column field="prazo" header=${this.msg['colPrazo']} width="12rem" align="right" />
            </Columns>
            <Rows>
              ${tarefas.map((t) => html`
                <Row>
                  <Cell>
                    <div class="font-medium ${strong}">${t.titulo}</div>
                    <div class="text-xs ${muted}">${t.lista?.nome ?? ''}</div>
                  </Cell>
                  <Cell><span class="text-sm ${muted}">${this.statusLabel(t.status)}</span></Cell>
                  <Cell><span class="text-sm tabular-nums ${muted}">${t.details.progressoChecklist}</span></Cell>
                  <Cell>
                    <div class="flex items-center justify-end gap-2">
                      ${t.details.atrasada ? html`<span class="rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${this.msg['atrasada']}</span>`
                        : t.details.venceHoje ? html`<span class="rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['venceHoje']}</span>` : nothing}
                      <span class="text-sm tabular-nums ${strong}">${formatDate(t.prazo)}</span>
                    </div>
                  </Cell>
                </Row>`)}
            </Rows>
          </groupviewdata--ml-vertical-record-list>
        </div>
      </section>`;
  }

  private renderInbox() {
    const e = this.esperaPorMim;
    if (!e) return nothing;
    return html`
      ${this.lane(this.msg['laneDevolvidas'], e.devolvidas, 'criador', true, (t) => html`
        <grouptriggeraction--ml-button-standard size="sm" data-variant="primary"
          ?loading=${this.enviarParaRevisaoStatus === 'loading'}
          @action=${() => { this.enviarParaRevisao(t.id, t.version); }}>
          <Label>${this.msg['reenviar']}</Label>
        </grouptriggeraction--ml-button-standard>
        <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary"
          @action=${() => this.abrirTarefaParaAjustar(t.id)}>
          <Label>${this.msg['ajustar']}</Label>
        </grouptriggeraction--ml-button-standard>`)}
      ${this.lane(this.msg['laneRevisar'], e.paraRevisar, 'responsavel', false, (t) => html`
        <grouptriggeraction--ml-button-standard size="sm" data-variant="primary"
          ?loading=${this.aceitarEntregaStatus === 'loading'}
          @action=${() => { this.aceitarEntrega(t.id, t.version); }}>
          <Label>${this.msg['aceitar']}</Label>
        </grouptriggeraction--ml-button-standard>
        ${this.devolverComMotivoDraft.id === t.id ? nothing : html`
          <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary"
            @action=${() => this.setDevolverComMotivoDraft({ id: t.id, version: t.version, details: { motivoDevolucao: null } })}>
            <Label>${this.msg['devolver']}</Label>
          </grouptriggeraction--ml-button-standard>`}
        <grouptriggeraction--ml-button-standard size="sm" data-variant="ghost"
          @action=${() => this.abrirTarefaParaAjustar(t.id)}>
          <Label>${this.msg['conferir']}</Label>
        </grouptriggeraction--ml-button-standard>`)}
      ${this.lane(this.msg['laneEnviar'], e.paraEnviarRevisao, 'criador', false, (t) => html`
        <grouptriggeraction--ml-button-standard size="sm" data-variant="primary"
          ?loading=${this.enviarParaRevisaoStatus === 'loading'}
          @action=${() => { this.enviarParaRevisao(t.id, t.version); }}>
          <Label>${this.msg['enviar']}</Label>
        </grouptriggeraction--ml-button-standard>`)}
      ${this.lane(this.msg['laneIniciar'], e.paraIniciar, 'criador', false, (t) => html`
        <grouptriggeraction--ml-button-standard size="sm" data-variant="primary"
          ?loading=${this.iniciarTarefaStatus === 'loading'}
          @action=${() => { this.iniciarTarefa(t.id, t.version); }}>
          <Label>${this.msg['iniciar']}</Label>
        </grouptriggeraction--ml-button-standard>`)}
    `;
  }

  private lane(
    title: string,
    items: TarefaPendencia[],
    person: 'criador' | 'responsavel',
    showMotivo: boolean,
    actions: (t: TarefaPendencia) => unknown,
  ) {
    if (items.length === 0) return nothing;
    return html`
      <section class="flex flex-col gap-3">
        <h2 class="text-base font-semibold ${strong}">${title}</h2>
        <ul class="${laneBox} divide-y divide-[var(--border-subtle,currentColor)]">
          ${items.map((t) => this.row(t, person, showMotivo, actions))}
        </ul>
      </section>`;
  }

  private row(t: TarefaPendencia, person: 'criador' | 'responsavel', showMotivo: boolean, actions: (t: TarefaPendencia) => unknown) {
    const who = person === 'responsavel'
      ? `${this.msg['responsavel']}: ${t.responsavel?.details?.identification?.name ?? ''}`
      : `${this.msg['criadaPor']}: ${t.criador?.details?.identification?.name ?? ''}`;
    return html`
      <li class="px-4 py-3">
        <div class="flex items-start gap-4">
          <div class="min-w-0 flex-1">
            <p class="font-medium ${strong}">${t.titulo}</p>
            <p class="mt-0.5 text-xs ${muted}">
              ${who} · ${this.prioridadeLabel(t.prioridade)} · ${this.msg['checklist']} <span class="tabular-nums">${t.details.progressoChecklist}</span>
            </p>
            ${showMotivo && t.details.motivoDevolucao ? html`
              <div class="mt-2 rounded-md border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-3 py-2 text-sm">
                <p class="text-xs ${muted}">
                  ${this.msg['motivoLabel']}${t.details.devolvidaEm ? html` · ${this.msg['devolvidaEm']} ${formatDateTime(t.details.devolvidaEm)}` : nothing}
                </p>
                <p class="mt-0.5 ${strong}">${t.details.motivoDevolucao}</p>
              </div>` : nothing}
          </div>
          <div class="shrink-0 text-right text-sm tabular-nums">
            <span class="${muted}">${this.msg['prazo']}</span>
            <span class="font-medium ${strong}">${formatDate(t.prazo)}</span>
          </div>
          <div class="flex shrink-0 items-center gap-2">${actions(t)}</div>
        </div>
        ${this.devolverComMotivoDraft.id === t.id ? this.returnForm(t) : nothing}
      </li>`;
  }

  private returnForm(t: TarefaPendencia) {
    const draft = this.devolverComMotivoDraft;
    const motivo = draft.details.motivoDevolucao ?? '';
    const inputId = `motivo-${t.id}`;
    return html`
      <div role="group" aria-labelledby=${`${inputId}-label`} class="mt-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 flex flex-col gap-2">
        <label id=${`${inputId}-label`} for=${inputId} class="text-sm font-medium ${strong}">${this.msg['motivoLabel']}</label>
        <p class="text-xs ${muted}">${this.msg['motivoHint']}</p>
        <textarea id=${inputId} rows="3" required
          class="w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 py-2 text-sm text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          placeholder=${this.msg['motivoPlaceholder']}
          .value=${motivo}
          @input=${(e: Event) => this.setDevolverComMotivoDraft({
            ...draft,
            details: { ...draft.details, motivoDevolucao: (e.target as HTMLTextAreaElement).value },
          })}></textarea>
        <div class="flex justify-end gap-2">
          <grouptriggeraction--ml-button-standard size="sm" data-variant="ghost"
            @action=${() => this.setDevolverComMotivoDraft(emptyDevolverComMotivoDraft())}>
            <Label>${this.msg['cancelar']}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard size="sm" data-variant="primary"
            ?disabled=${motivo.trim() === ''}
            ?loading=${this.devolverComMotivoStatus === 'loading'}
            @action=${() => { this.devolverComMotivo(t.id, t.version); }}>
            <Label>${this.msg['confirmarDevolucao']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  private renderStrip() {
    const r = this.resumo;
    if (!r) return nothing;
    const pair = (label: string, n: number) => html`
      <div class="flex items-baseline gap-1.5">
        <dt class="${muted}">${label}</dt>
        <dd class="font-medium tabular-nums ${strong}">${formatNumber(n)}</dd>
      </div>`;
    return html`
      <div class="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle,currentColor)] pt-4">
        <dl class="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          ${pair(this.msg['stripAbertas'], r.quantidadeAbertas)}
          ${pair(this.msg['stripHoje'], r.quantidadeVencemHoje)}
          ${pair(this.msg['stripAtrasadas'], r.quantidadeAtrasadas)}
        </dl>
        <grouptriggeraction--ml-button-standard size="sm" data-variant="link" @action=${() => this.abrirMinhasTarefas()}>
          <Label>${this.msg['verTodas']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  private renderAviso() {
    const s = this.pageStatus;
    if (s === 'error') return nothing;
    const heading = html`<h2 class="mb-3 text-base font-semibold ${strong}">${this.msg['avisoTitulo']}</h2>`;
    if (s === 'idle' || s === 'loading') {
      return html`${heading}<div class="h-24 rounded-lg bg-[var(--surface-alt-bg,transparent)] animate-pulse" aria-hidden="true"></div>`;
    }
    const a = this.avisoDoDia;
    if (!a) return html`${heading}<p class="text-sm ${muted}">${this.msg['avisoVazio']}</p>`;
    const statusText = a.status === 'completed' ? this.msg['avisoCompleted'] : a.status === 'failed' ? this.msg['avisoFailed'] : this.msg['avisoPending'];
    return html`
      ${heading}
      <groupnotifyuser--ml-notify-banner
        type=${a.status === 'failed' ? 'warning' : 'info'}
        .visible=${true}
        .dismissible=${false}
        @action=${() => this.abrirMeusAvisos()}>
        <Message>${fill(this.msg['avisoMensagem'], {
          data: formatDate(a.dataReferencia),
          total: formatNumber(a.details.quantidadeTarefas),
          atrasadas: formatNumber(a.details.quantidadeAtrasadas),
        })}</Message>
        <Action>${this.msg['avisoAcao']}</Action>
      </groupnotifyuser--ml-notify-banner>
      <p class="mt-2 text-xs ${muted}">${statusText}</p>`;
  }
}
