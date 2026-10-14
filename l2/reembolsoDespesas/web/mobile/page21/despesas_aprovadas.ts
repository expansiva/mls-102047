/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page21/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import type { DespesaAprovadaResumo } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  sceneQueue: 'Despesas a pagar',
  sceneReview: 'Conferir despesa',
  sceneDate: 'Data do pagamento',
  sceneDone: 'Pagamento registrado',
  back: 'Voltar',
  step1: 'Passo 1 de 2',
  step2: 'Passo 2 de 2',
  filterLabel: 'Filtrar por categoria',
  pillAll: 'Todas',
  loading: 'Carregando despesas…',
  loadingDetail: 'Carregando a despesa…',
  emptyQueue: 'Nenhuma despesa aprovada aguarda pagamento.',
  queueError: 'Não foi possível carregar a fila.',
  detailError: 'Não foi possível carregar a despesa.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  colaborador: 'Colaborador',
  dataDespesa: 'Data da despesa',
  categoria: 'Categoria',
  valor: 'Valor',
  descricao: 'Descrição',
  situacao: 'Situação',
  dataPagamento: 'Data de pagamento',
  status_draft: 'Rascunho',
  status_awaitingApproval: 'Aguardando aprovação',
  status_rejected: 'Rejeitada',
  status_approved: 'Aprovada',
  status_paid: 'Paga',
  continueBtn: 'Continuar',
  dateLabel: 'Data em que a despesa foi paga',
  datePlaceholder: 'Escolha a data',
  dateHint: 'Informe a data para liberar o pagamento.',
  confirmPay: 'Registrar pagamento',
  paying: 'Registrando…',
  payError: 'Não foi possível registrar o pagamento. A data foi mantida; tente novamente.',
  doneTitle: 'Pagamento registrado',
  doneText: 'A despesa foi paga e saiu da fila.',
  backToQueue: 'Voltar à fila de despesas'
};
const pageMessage_en_us = {
  sceneQueue: 'Expenses to pay',
  sceneReview: 'Review expense',
  sceneDate: 'Payment date',
  sceneDone: 'Payment registered',
  back: 'Back',
  step1: 'Step 1 of 2',
  step2: 'Step 2 of 2',
  filterLabel: 'Filter by category',
  pillAll: 'All',
  loading: 'Loading expenses…',
  loadingDetail: 'Loading the expense…',
  emptyQueue: 'No approved expense is waiting for payment.',
  queueError: 'The queue could not be loaded.',
  detailError: 'The expense could not be loaded.',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  colaborador: 'Employee',
  dataDespesa: 'Expense date',
  categoria: 'Category',
  valor: 'Amount',
  descricao: 'Description',
  situacao: 'Status',
  dataPagamento: 'Payment date',
  status_draft: 'Draft',
  status_awaitingApproval: 'Awaiting approval',
  status_rejected: 'Rejected',
  status_approved: 'Approved',
  status_paid: 'Paid',
  continueBtn: 'Continue',
  dateLabel: 'Date the expense was paid',
  datePlaceholder: 'Pick the date',
  dateHint: 'Enter the date to enable the payment.',
  confirmPay: 'Register payment',
  paying: 'Registering…',
  payError: 'The payment could not be registered. Your date was kept; try again.',
  doneTitle: 'Payment registered',
  doneText: 'The expense was paid and left the queue.',
  backToQueue: 'Back to the expense queue'
};
const pageMessage_es_es = {
  sceneQueue: 'Gastos por pagar',
  sceneReview: 'Revisar gasto',
  sceneDate: 'Fecha de pago',
  sceneDone: 'Pago registrado',
  back: 'Volver',
  step1: 'Paso 1 de 2',
  step2: 'Paso 2 de 2',
  filterLabel: 'Filtrar por categoría',
  pillAll: 'Todas',
  loading: 'Cargando gastos…',
  loadingDetail: 'Cargando el gasto…',
  emptyQueue: 'Ningún gasto aprobado espera pago.',
  queueError: 'No se pudo cargar la cola.',
  detailError: 'No se pudo cargar el gasto.',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  colaborador: 'Colaborador',
  dataDespesa: 'Fecha del gasto',
  categoria: 'Categoría',
  valor: 'Importe',
  descricao: 'Descripción',
  situacao: 'Situación',
  dataPagamento: 'Fecha de pago',
  status_draft: 'Borrador',
  status_awaitingApproval: 'Pendiente de aprobación',
  status_rejected: 'Rechazado',
  status_approved: 'Aprobado',
  status_paid: 'Pagado',
  continueBtn: 'Continuar',
  dateLabel: 'Fecha en que se pagó el gasto',
  datePlaceholder: 'Elige la fecha',
  dateHint: 'Indica la fecha para habilitar el pago.',
  confirmPay: 'Registrar pago',
  paying: 'Registrando…',
  payError: 'No se pudo registrar el pago. La fecha se conservó; inténtalo de nuevo.',
  doneTitle: 'Pago registrado',
  doneText: 'El gasto fue pagado y salió de la cola.',
  backToQueue: 'Volver a la cola de gastos'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

function formatDate(value: string | null | undefined): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined).format(d);
}

function categoriasDe(items: DespesaAprovadaResumo[], ativa: string | null): string[] {
  const set = new Set<string>();
  if (ativa) set.add(ativa);
  for (const it of items) set.add(it.details.details.categoria);
  return Array.from(set);
}

@customElement('reembolso-despesas--web--mobile--page21--despesas_aprovadas-102047')
export class ReembolsoDespesasMobilePage21Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: string) {
    const key = ('status_' + status) as keyof PageMessageType;
    return this.msg[key] ?? status;
  }

  private pick(id: string) {
    this.selectDespesaAprovadaDetalhe(id);
    this.setScenario('conferir');
  }

  private pay() {
    this.registrarPagamento().then(() => {
      if (this.registrarPagamentoStatus === 'success') this.setScenario('sucesso');
    });
  }

  private backToQueue() {
    this.selectDespesaAprovadaDetalhe(null);
    this.setScenario('fila');
  }

  private renderStep(n: 1 | 2) {
    return html`
      <div class="mb-4" role="status" aria-live="polite">
        <p class="text-sm font-medium text-[var(--text-muted,currentColor)]">${n === 1 ? this.msg['step1'] : this.msg['step2']}</p>
        <div class="mt-2 flex gap-2" aria-hidden="true">
          <span class="h-1.5 flex-1 rounded-full bg-[var(--button-primary-bg,transparent)]"></span>
          <span class="h-1.5 flex-1 rounded-full ${n === 2 ? 'bg-[var(--button-primary-bg,transparent)]' : 'bg-[var(--border-subtle,transparent)]'}"></span>
        </div>
      </div>`;
  }

  private renderPills() {
    const items = this.despesas?.items ?? [];
    const cats = categoriasDe(items, this.categoria);
    const pill = (active: boolean) =>
      `min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${
        active
          ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
          : 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]'
      }`;
    return html`
      <div class="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label=${this.msg['filterLabel']}>
        <button type="button" class=${pill(this.categoria === null)} aria-pressed=${this.categoria === null ? 'true' : 'false'}
          @click=${() => this.listarDespesasAprovadas({ categoria: null })}>${this.msg['pillAll']}</button>
        ${cats.map(c => html`
          <button type="button" class=${pill(this.categoria === c)} aria-pressed=${this.categoria === c ? 'true' : 'false'}
            @click=${() => this.listarDespesasAprovadas({ categoria: c })}>${c}</button>`)}
      </div>`;
  }

  private renderQueueBody() {
    const items = this.despesas?.items ?? [];
    if (this.pageStatus === 'loading' && items.length === 0) {
      return html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]" aria-busy="true" role="status">${this.msg['loading']}</p>`;
    }
    if (this.pageStatus === 'error') {
      return html`
        <div class="rounded-xl bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]" role="alert">
          <p>${this.msg['queueError']}${this.listarDespesasAprovadasError ? html` ${this.listarDespesasAprovadasError.message}` : nothing}</p>
          <div class="mt-3">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full"
              @action=${() => this.listarDespesasAprovadas()}>
              <Label>${this.msg['retry']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>`;
    }
    if (items.length === 0) {
      return html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['emptyQueue']}</p>`;
    }
    return html`
      <ul class="flex flex-col gap-3" aria-busy=${this.listarDespesasAprovadasStatus === 'loading' ? 'true' : 'false'}>
        ${items.map(item => html`
          <li>
            <groupviewcard--ml-vertical-card clickable ?selected=${item.id === this.selectedDespesa}
              @cardClick=${() => this.pick(item.id)}>
              <CardContent>
                <div class="flex min-h-[44px] items-center justify-between gap-3">
                  <div class="min-w-0">
                    <p class="truncate text-sm text-[var(--text-muted,currentColor)]">${this.msg['colaborador']}</p>
                    <p class="truncate font-medium text-[var(--text-strong,currentColor)]">${item.colaboradorId}</p>
                    <p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${formatDate(item.details.details.dataDespesa)} · ${item.details.details.categoria}</p>
                  </div>
                  <p class="shrink-0 text-right text-xl font-bold text-[var(--text-strong,currentColor)]">${item.details.details.valor}</p>
                </div>
              </CardContent>
            </groupviewcard--ml-vertical-card>
          </li>`)}
      </ul>
      ${this.despesas?.hasMore ? html`
        <div class="mt-4">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full"
            .loading=${this.listarDespesasAprovadasStatus === 'loading'}
            @action=${() => this.listarDespesasAprovadas({ append: true })}>
            <Label>${this.msg['loadMore']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>` : nothing}`;
  }

  private renderQueue() {
    return html`
      <section data-organism-id="despesasAprovadasLista" class="px-4 pb-6">
        ${this.renderPills()}
        ${this.renderQueueBody()}
      </section>`;
  }

  private renderReview() {
    const d = this.despesa;
    let body;
    if (this.obterDespesaAprovadaStatus === 'loading' || (!d && this.obterDespesaAprovadaStatus !== 'error')) {
      body = html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]" aria-busy="true" role="status">${this.msg['loadingDetail']}</p>`;
    } else if (this.obterDespesaAprovadaStatus === 'error' || !d) {
      body = html`
        <div class="rounded-xl bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]" role="alert">
          ${this.msg['detailError']}${this.obterDespesaAprovadaError ? html` ${this.obterDespesaAprovadaError.message}` : nothing}
        </div>`;
    } else {
      const row = (label: string, value: unknown) => html`
        <div class="py-3">
          <dt class="text-sm text-[var(--text-muted,currentColor)]">${label}</dt>
          <dd class="mt-0.5 text-base text-[var(--text-strong,currentColor)] break-words">${value}</dd>
        </div>`;
      body = html`
        <groupviewcard--ml-vertical-card>
          <CardContent>
            <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['valor']}</p>
            <p class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</p>
            <span class="mt-2 inline-block rounded-full bg-[var(--status-success-bg,transparent)] px-3 py-1 text-sm font-medium text-[var(--status-success-text,currentColor)]">${this.statusLabel(d.status)}</span>
            <dl class="mt-3 divide-y divide-[var(--border-subtle,currentColor)]">
              ${row(this.msg['colaborador'], d.colaboradorId)}
              ${row(this.msg['dataDespesa'], formatDate(d.details.details.dataDespesa))}
              ${row(this.msg['categoria'], d.details.details.categoria)}
              ${row(this.msg['descricao'], d.details.details.descricao)}
              ${row(this.msg['situacao'], this.statusLabel(d.status))}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
        <div class="mt-5">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
            @action=${() => this.setScenario('pagamento')}>
            <Label>${this.msg['continueBtn']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    return html`
      <section data-organism-id="despesaAprovadaDetalhe" class="px-4 pb-6">
        ${this.renderStep(1)}
        ${body}
      </section>`;
  }

  private renderPay() {
    const d = this.despesa;
    const date = this.registrarPagamentoDraft.details.dataPagamento;
    const paying = this.registrarPagamentoStatus === 'loading';
    return html`
      <section data-organism-id="registroPagamentoForm" class="px-4 pb-6">
        ${this.renderStep(2)}
        ${d ? html`
          <div class="mb-4 flex items-center justify-between gap-3 rounded-xl bg-[var(--surface-alt-bg,transparent)] p-4">
            <div class="min-w-0">
              <p class="truncate text-sm text-[var(--text-muted,currentColor)]">${this.msg['colaborador']}</p>
              <p class="truncate font-medium text-[var(--text-strong,currentColor)]">${d.colaboradorId}</p>
            </div>
            <p class="shrink-0 text-right text-xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</p>
          </div>` : nothing}
        <groupenterdate--ml-date-shortcut-picker
          .value=${date ?? null}
          locale=${document.documentElement.lang || ''}
          placeholder=${this.msg['datePlaceholder']}
          required
          .disabled=${paying}
          @change=${(e: CustomEvent<{ value: string | null }>) => {
            if (e.target === e.currentTarget) return this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
            e.stopPropagation();
            this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
          }}>
          <Label>${this.msg['dateLabel']}</Label>
          <Helper>${this.msg['dateHint']}</Helper>
        </groupenterdate--ml-date-shortcut-picker>
        <div aria-live="polite">
          ${this.registrarPagamentoStatus === 'error' ? html`
            <p class="mt-4 rounded-xl bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]" role="alert">
              ${this.msg['payError']}${this.registrarPagamentoError ? html` (${this.registrarPagamentoError.message})` : nothing}
            </p>` : nothing}
        </div>
        <div class="mt-5">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
            .disabled=${!date || !d}
            .loading=${paying}
            @action=${() => this.pay()}>
            <Label>${paying ? this.msg['paying'] : this.msg['confirmPay']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>`;
  }

  private renderDone() {
    const d = this.despesa;
    return html`
      <section class="px-4 pb-6 text-center" aria-live="polite">
        <div class="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--status-success-bg,transparent)] text-4xl text-[var(--status-success-text,currentColor)]" aria-hidden="true">✓</div>
        <h2 class="mt-4 text-2xl font-bold text-[var(--text-strong,currentColor)]">${this.msg['doneTitle']}</h2>
        <p class="mt-1 text-[var(--text-default,currentColor)]">${this.msg['doneText']}</p>
        ${d ? html`
          <dl class="mt-5 divide-y divide-[var(--border-subtle,currentColor)] rounded-xl bg-[var(--surface-alt-bg,transparent)] px-4 text-left">
            <div class="py-3"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['colaborador']}</dt><dd class="text-[var(--text-strong,currentColor)]">${d.colaboradorId}</dd></div>
            <div class="py-3"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['valor']}</dt><dd class="text-2xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</dd></div>
            <div class="py-3"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['dataPagamento']}</dt><dd class="text-[var(--text-strong,currentColor)]">${formatDate(d.details.details.dataPagamento)}</dd></div>
            <div class="py-3"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['situacao']}</dt><dd class="text-[var(--text-strong,currentColor)]">${this.statusLabel(d.status)}</dd></div>
          </dl>` : nothing}
        <div class="mt-6">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
            @action=${() => this.backToQueue()}>
            <Label>${this.msg['backToQueue']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto w-full max-w-[430px] bg-[var(--page-bg,transparent)] py-4 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020 mode="scenary"
          .value=${this.scenary || 'fila'}
          backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="fila" title=${this.msg['sceneQueue']}>${this.renderQueue()}</Scene>
          <Scene value="conferir" title=${this.msg['sceneReview']} nav="back" backTo="fila">${this.renderReview()}</Scene>
          <Scene value="pagamento" title=${this.msg['sceneDate']} nav="back" backTo="conferir">${this.renderPay()}</Scene>
          <Scene value="sucesso" title=${this.msg['sceneDone']}>${this.renderDone()}</Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
