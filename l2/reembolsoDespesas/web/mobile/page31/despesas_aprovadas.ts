/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import type { DespesaAprovadaResumo, DespesaAprovadaDetalhe } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnavigatesteps/ml-wizard-steps.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  queueTitle: 'Despesas aprovadas',
  queueHint: 'Toque na despesa que você vai pagar.',
  filterAll: 'Todas',
  collaborator: 'Colaborador',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  amount: 'Valor',
  description: 'Descrição',
  status: 'Situação',
  paymentDate: 'Data de pagamento',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  emptyQueue: 'Não há despesas aprovadas aguardando pagamento.',
  loadingQueue: 'Carregando despesas aprovadas…',
  errorQueue: 'Não foi possível carregar as despesas aprovadas.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  step1Of2: 'Passo 1 de 2',
  step2Of2: 'Passo 2 de 2',
  stepReview: 'Conferir',
  stepDate: 'Data do pagamento',
  back: 'Voltar',
  reviewTitle: 'Conferir despesa',
  continue: 'Continuar',
  loadingExpense: 'Carregando despesa…',
  errorExpense: 'Não foi possível carregar a despesa.',
  paySceneTitle: 'Pagar despesa',
  youWillPay: 'Você vai pagar',
  paymentDateHelper: 'Informe a data em que a despesa foi paga.',
  paymentDatePlaceholder: 'Selecione a data',
  confirmPayment: 'Confirmar pagamento',
  retryPayment: 'Tentar registrar novamente',
  errorPayment: 'Não foi possível registrar o pagamento. A data informada foi mantida.',
  paidTitle: 'Pagamento registrado',
  paidMessage: 'A despesa agora está paga e saiu da fila.',
  backToQueue: 'Voltar para a fila',
  noValue: '—',
};
const pageMessage_en_us = {
  queueTitle: 'Approved expenses',
  queueHint: 'Tap the expense you are going to pay.',
  filterAll: 'All',
  collaborator: 'Employee',
  expenseDate: 'Expense date',
  category: 'Category',
  amount: 'Amount',
  description: 'Description',
  status: 'Status',
  paymentDate: 'Payment date',
  statusDraft: 'Draft',
  statusAwaitingApproval: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  emptyQueue: 'There are no approved expenses waiting for payment.',
  loadingQueue: 'Loading approved expenses…',
  errorQueue: 'Could not load the approved expenses.',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  step1Of2: 'Step 1 of 2',
  step2Of2: 'Step 2 of 2',
  stepReview: 'Review',
  stepDate: 'Payment date',
  back: 'Back',
  reviewTitle: 'Review expense',
  continue: 'Continue',
  loadingExpense: 'Loading expense…',
  errorExpense: 'Could not load the expense.',
  paySceneTitle: 'Pay expense',
  youWillPay: 'You are about to pay',
  paymentDateHelper: 'Enter the date the expense was paid.',
  paymentDatePlaceholder: 'Select the date',
  confirmPayment: 'Confirm payment',
  retryPayment: 'Try registering again',
  errorPayment: 'Could not register the payment. The date you entered was kept.',
  paidTitle: 'Payment registered',
  paidMessage: 'The expense is now paid and has left the queue.',
  backToQueue: 'Back to the queue',
  noValue: '—',
};
const pageMessage_es_es = {
  queueTitle: 'Gastos aprobados',
  queueHint: 'Toca el gasto que vas a pagar.',
  filterAll: 'Todos',
  collaborator: 'Colaborador',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  amount: 'Valor',
  description: 'Descripción',
  status: 'Situación',
  paymentDate: 'Fecha de pago',
  statusDraft: 'Borrador',
  statusAwaitingApproval: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  emptyQueue: 'No hay gastos aprobados pendientes de pago.',
  loadingQueue: 'Cargando gastos aprobados…',
  errorQueue: 'No se pudieron cargar los gastos aprobados.',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  step1Of2: 'Paso 1 de 2',
  step2Of2: 'Paso 2 de 2',
  stepReview: 'Revisar',
  stepDate: 'Fecha del pago',
  back: 'Volver',
  reviewTitle: 'Revisar gasto',
  continue: 'Continuar',
  loadingExpense: 'Cargando gasto…',
  errorExpense: 'No se pudo cargar el gasto.',
  paySceneTitle: 'Pagar gasto',
  youWillPay: 'Vas a pagar',
  paymentDateHelper: 'Indica la fecha en que se pagó el gasto.',
  paymentDatePlaceholder: 'Selecciona la fecha',
  confirmPayment: 'Confirmar pago',
  retryPayment: 'Intentar registrar de nuevo',
  errorPayment: 'No se pudo registrar el pago. Se conservó la fecha indicada.',
  paidTitle: 'Pago registrado',
  paidMessage: 'El gasto ya está pagado y salió de la cola.',
  backToQueue: 'Volver a la cola',
  noValue: '—',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

const ALL = '__all__';

function currentLang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function formatDate(value: string | undefined | null): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return value;
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(currentLang()).format(date);
}

function formatMoney(value: string): string {
  const n = Number(value);
  if (value.trim() === '' || !Number.isFinite(n)) return value;
  return new Intl.NumberFormat(currentLang(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function categoriesOf(items: DespesaAprovadaResumo[], current: string | null): string[] {
  const set = new Set<string>();
  if (current) set.add(current);
  for (const item of items) set.add(item.details.details.categoria);
  return Array.from(set);
}

function statusClasses(status: DespesaAprovadaResumo['status']): string {
  if (status === 'paid') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
  if (status === 'approved') return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
  if (status === 'rejected') return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
  if (status === 'awaitingApproval') return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
  return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}

@customElement('reembolso-despesas--web--mobile--page31--despesas_aprovadas-102047')
export class ReembolsoDespesasMobilePage31Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: DespesaAprovadaResumo['status']) {
    switch (status) {
      case 'draft': return this.msg.statusDraft;
      case 'awaitingApproval': return this.msg.statusAwaitingApproval;
      case 'rejected': return this.msg.statusRejected;
      case 'approved': return this.msg.statusApproved;
      default: return this.msg.statusPaid;
    }
  }

  private onPick(index: number) {
    const item = this.despesas?.items[index];
    if (!item) return;
    this.selectDespesaAprovadaDetalhe(item.id);
    this.setScenario('conferir');
  }

  private onConfirm() {
    this.registrarPagamento().then(() => {
      if (this.registrarPagamentoStatus === 'success') this.setScenario('sucesso');
    });
  }

  private renderSteps(current: number) {
    return html`
      <div class="flex flex-col gap-2">
        <p class="text-sm font-semibold text-[var(--text-muted,currentColor)]" aria-live="polite">
          ${current === 0 ? this.msg.step1Of2 : this.msg.step2Of2}
        </p>
        <groupnavigatesteps--ml-wizard-steps
          .value=${current}
          .linear=${true}
          @change=${(e: CustomEvent<{ value: number }>) => {
            e.stopPropagation();
            this.setScenario(e.detail.value === 0 ? 'conferir' : 'pagamento');
          }}>
          <Step title=${this.msg.stepReview} ?completed=${current > 0}></Step>
          <Step title=${this.msg.stepDate}></Step>
        </groupnavigatesteps--ml-wizard-steps>
      </div>`;
  }

  private renderFacts(d: DespesaAprovadaDetalhe, withDescription: boolean) {
    const x = d.details.details;
    const row = (label: string, value: unknown) => html`
      <div class="flex flex-col gap-0.5 py-2 border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
        <dt class="text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="text-base text-[var(--text-default,currentColor)] break-words">${value}</dd>
      </div>`;
    return html`
      <dl class="flex flex-col">
        ${row(this.msg.collaborator, d.colaboradorId)}
        ${row(this.msg.expenseDate, formatDate(x.dataDespesa))}
        ${row(this.msg.category, x.categoria)}
        ${withDescription ? row(this.msg.description, x.descricao) : nothing}
        ${x.dataPagamento ? row(this.msg.paymentDate, formatDate(x.dataPagamento)) : nothing}
        ${row(
          this.msg.status,
          html`<span class="inline-block rounded-full px-3 py-1 text-sm font-medium ${statusClasses(d.status)}">${this.statusLabel(d.status)}</span>`,
        )}
      </dl>`;
  }

  private renderFila() {
    const items = this.despesas?.items ?? [];
    const cats = categoriesOf(items, this.categoria);
    const loading = this.pageStatus === 'loading';
    return html`
      <div data-organism-id="despesasAprovadasLista" class="flex flex-col gap-4">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.queueHint}</p>
        <groupnavigatesection--ml-navigate-pills
          .value=${this.categoria ?? ALL}
          @change=${(e: CustomEvent<{ value: string }>) => {
            e.stopPropagation();
            this.listarDespesasAprovadas({ categoria: e.detail.value === ALL ? null : e.detail.value });
          }}>
          <Label>${this.msg.category}</Label>
          <Tab value=${ALL} title=${this.msg.filterAll}></Tab>
          ${cats.map((c) => html`<Tab value=${c} title=${c}></Tab>`)}
        </groupnavigatesection--ml-navigate-pills>

        ${this.pageStatus === 'error'
          ? html`
              <div role="alert" class="flex flex-col gap-3 rounded-xl p-4 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
                <p>${this.msg.errorQueue}</p>
                <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.listarDespesasAprovadas()}>
                  <Label>${this.msg.retry}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>`
          : html`
              <groupviewdata--ml-vertical-record-list
                .hoverable=${true}
                .loading=${loading}
                @row-click=${(e: CustomEvent<{ index: number }>) => this.onPick(e.detail.index)}>
                <Columns>
                  <Column field="categoria" header=${this.msg.category}></Column>
                  <Column field="valor" header=${this.msg.amount} align="right"></Column>
                </Columns>
                <Rows>
                  ${items.map(
                    (d) => html`
                      <Row ?selected=${d.id === this.selectedDespesa}>
                        <Cell>
                          <div class="flex flex-col gap-0.5 py-2 min-h-[44px] min-w-0">
                            <span class="text-base font-semibold text-[var(--text-strong,currentColor)]">${d.details.details.categoria}</span>
                            <span class="text-sm text-[var(--text-default,currentColor)]">${formatDate(d.details.details.dataDespesa)}</span>
                            <span class="text-xs text-[var(--text-muted,currentColor)] break-all">${this.msg.collaborator}: ${d.colaboradorId}</span>
                          </div>
                        </Cell>
                        <Cell>
                          <span class="text-xl font-bold tabular-nums whitespace-nowrap text-[var(--text-strong,currentColor)]">${formatMoney(d.details.details.valor)}</span>
                        </Cell>
                      </Row>`,
                  )}
                </Rows>
                <Empty>
                  <div class="text-center py-10 px-4 text-[var(--text-muted,currentColor)]">${this.msg.emptyQueue}</div>
                </Empty>
                <Loading>
                  <div class="text-center py-10 text-[var(--text-muted,currentColor)]">${this.msg.loadingQueue}</div>
                </Loading>
              </groupviewdata--ml-vertical-record-list>
              ${this.despesas?.hasMore
                ? html`
                    <grouptriggeraction--ml-button-standard
                      data-variant="secondary"
                      size="lg"
                      data-class="w-full"
                      .loading=${this.listarDespesasAprovadasStatus === 'loading'}
                      @action=${() => this.listarDespesasAprovadas({ append: true })}>
                      <Label>${this.msg.loadMore}</Label>
                    </grouptriggeraction--ml-button-standard>`
                : nothing}`}
      </div>`;
  }

  private renderConferir() {
    const d = this.despesa;
    const st = this.obterDespesaAprovadaStatus;
    let body;
    if (st === 'loading') {
      body = html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg.loadingExpense}</p>`;
    } else if (st === 'error') {
      body = html`
        <div role="alert" class="flex flex-col gap-3 rounded-xl p-4 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
          <p>${this.msg.errorExpense}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.selectDespesaAprovadaDetalhe(this.selectedDespesa)}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    } else if (d) {
      body = html`
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>
              <span class="text-3xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(d.details.details.valor)}</span>
            </CardTitle>
            <CardDescription>${d.details.details.categoria}</CardDescription>
          </CardHeader>
          <CardContent>${this.renderFacts(d, true)}</CardContent>
        </groupviewcard--ml-vertical-card>`;
    } else {
      body = nothing;
    }
    return html`
      <div class="flex flex-col gap-4">
        ${this.renderSteps(0)}
        <div data-organism-id="despesaAprovadaDetalhe">${body}</div>
        <grouptriggeraction--ml-button-standard
          size="lg"
          data-class="w-full"
          .disabled=${!d || st !== 'success'}
          @action=${() => this.setScenario('pagamento')}>
          <Label>${this.msg.continue}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  private renderPagamento() {
    const d = this.despesa;
    const date = this.registrarPagamentoDraft.details.dataPagamento;
    const paying = this.registrarPagamentoStatus === 'loading';
    const failed = this.registrarPagamentoStatus === 'error';
    return html`
      <div class="flex flex-col gap-4">
        ${this.renderSteps(1)}
        <div data-organism-id="registroPagamentoForm" class="flex flex-col gap-4">
          ${d
            ? html`
                <div class="flex items-center justify-between gap-3 rounded-xl p-4 bg-[var(--surface-alt-bg,transparent)] border border-[var(--border-subtle,currentColor)]">
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.youWillPay}</span>
                    <span class="text-sm text-[var(--text-default,currentColor)] truncate">${d.details.details.categoria} · ${formatDate(d.details.details.dataDespesa)}</span>
                  </div>
                  <span class="text-2xl font-bold tabular-nums whitespace-nowrap text-[var(--text-strong,currentColor)]">${formatMoney(d.details.details.valor)}</span>
                </div>`
            : nothing}
          <groupenterdate--ml-date-picker
            .value=${date}
            locale=${document.documentElement.lang || ''}
            placeholder=${this.msg.paymentDatePlaceholder}
            .disabled=${paying}
            required
            @change=${(e: CustomEvent<{ value: string | null }>) => {
              e.stopPropagation();
              this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
            }}>
            <Label>${this.msg.paymentDate}</Label>
            <Helper>${this.msg.paymentDateHelper}</Helper>
          </groupenterdate--ml-date-picker>
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${failed} .dismissible=${false}>
            <Message>${this.msg.errorPayment}</Message>
          </groupnotifyuser--ml-contextual-feedback>
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-class="w-full"
            .disabled=${!date || !d}
            .loading=${paying}
            @action=${() => this.onConfirm()}>
            <Label>${failed ? this.msg.retryPayment : this.msg.confirmPayment}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  private renderSucesso() {
    const d = this.despesa;
    return html`
      <div class="flex flex-col items-center gap-4 text-center">
        <div aria-hidden="true" class="flex h-20 w-20 items-center justify-center rounded-full text-4xl bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">✓</div>
        ${d
          ? html`<p class="text-4xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(d.details.details.valor)}</p>`
          : nothing}
        <div class="w-full text-left">
          <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
            <Message>${this.msg.paidMessage}</Message>
          </groupnotifyuser--ml-contextual-feedback>
        </div>
        ${d
          ? html`<div class="w-full text-left rounded-xl p-4 bg-[var(--surface-bg,transparent)] border border-[var(--border-default,currentColor)]">${this.renderFacts(d, false)}</div>`
          : nothing}
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.setScenario('fila')}>
          <Label>${this.msg.backToQueue}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="mx-auto w-full max-w-[430px] min-h-screen px-4 py-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg.back}
          .value=${this.scenary || 'fila'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}>
          <Scene value="fila" title=${this.msg.queueTitle}>${this.renderFila()}</Scene>
          <Scene value="conferir" title=${this.msg.reviewTitle} nav="back" backTo="fila">${this.renderConferir()}</Scene>
          <Scene value="pagamento" title=${this.msg.paySceneTitle} nav="back" backTo="conferir">${this.renderPagamento()}</Scene>
          <Scene value="sucesso" title=${this.msg.paidTitle}>${this.renderSucesso()}</Scene>
        </molecules--ml-scenary-102020>
      </main>`;
  }
}
