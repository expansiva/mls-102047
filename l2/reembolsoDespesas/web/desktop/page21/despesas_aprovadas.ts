/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page21/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import type { DespesaAprovadaResumo } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  titleFila: 'Despesas aguardando pagamento',
  titleConferir: 'Conferir despesa',
  titlePagamento: 'Data do pagamento',
  titleSucesso: 'Pagamento registrado',
  back: 'Voltar',
  filterLabel: 'Categoria',
  filterAll: 'Todas',
  loadMore: 'Carregar mais despesas',
  hintPick: 'Escolha uma despesa para conferir e pagar.',
  emptyTitle: 'Nenhuma despesa aguardando pagamento',
  emptyHint: 'Quando houver despesas aprovadas, elas aparecem aqui.',
  errorQueue: 'Não foi possível carregar a fila de pagamentos.',
  retry: 'Tentar novamente',
  step1: 'Passo 1 de 2',
  step2: 'Passo 2 de 2',
  fColab: 'Colaborador',
  fData: 'Data da despesa',
  fCategoria: 'Categoria',
  fValor: 'Valor',
  fDescricao: 'Descrição',
  fSituacao: 'Situação',
  fDataPagamento: 'Data de pagamento',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  continueBtn: 'Continuar',
  loadingDetail: 'Carregando os dados da despesa…',
  errorDetail: 'Não foi possível carregar os dados desta despesa.',
  paying: 'Você vai pagar',
  dateLabel: 'Data do pagamento',
  dateHelper: 'Informe o dia em que a despesa foi paga.',
  datePlaceholder: 'Selecione a data',
  confirm: 'Registrar pagamento',
  confirmRetry: 'Tentar registrar novamente',
  errorPay: 'Não foi possível registrar o pagamento. A data foi mantida; tente novamente.',
  successHeadline: 'Pagamento registrado com sucesso',
  successLine: 'Esta despesa saiu da fila de pagamentos.',
  backToQueue: 'Voltar à fila de pagamentos',
  none: '—',
};
const pageMessage_en_us: typeof pageMessage_pt_br = {
  titleFila: 'Expenses awaiting payment',
  titleConferir: 'Review expense',
  titlePagamento: 'Payment date',
  titleSucesso: 'Payment registered',
  back: 'Back',
  filterLabel: 'Category',
  filterAll: 'All',
  loadMore: 'Load more expenses',
  hintPick: 'Pick an expense to review and pay.',
  emptyTitle: 'No expenses awaiting payment',
  emptyHint: 'When there are approved expenses, they will show up here.',
  errorQueue: 'The payment queue could not be loaded.',
  retry: 'Try again',
  step1: 'Step 1 of 2',
  step2: 'Step 2 of 2',
  fColab: 'Employee',
  fData: 'Expense date',
  fCategoria: 'Category',
  fValor: 'Amount',
  fDescricao: 'Description',
  fSituacao: 'Status',
  fDataPagamento: 'Payment date',
  statusDraft: 'Draft',
  statusAwaitingApproval: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  continueBtn: 'Continue',
  loadingDetail: 'Loading the expense data…',
  errorDetail: 'The data of this expense could not be loaded.',
  paying: 'You are about to pay',
  dateLabel: 'Payment date',
  dateHelper: 'Enter the day the expense was paid.',
  datePlaceholder: 'Select the date',
  confirm: 'Register payment',
  confirmRetry: 'Try registering again',
  errorPay: 'The payment could not be registered. The date was kept; try again.',
  successHeadline: 'Payment registered successfully',
  successLine: 'This expense has left the payment queue.',
  backToQueue: 'Back to the payment queue',
  none: '—',
};
const pageMessage_es_es: typeof pageMessage_pt_br = {
  titleFila: 'Gastos pendientes de pago',
  titleConferir: 'Revisar gasto',
  titlePagamento: 'Fecha de pago',
  titleSucesso: 'Pago registrado',
  back: 'Volver',
  filterLabel: 'Categoría',
  filterAll: 'Todas',
  loadMore: 'Cargar más gastos',
  hintPick: 'Elige un gasto para revisar y pagar.',
  emptyTitle: 'Ningún gasto pendiente de pago',
  emptyHint: 'Cuando haya gastos aprobados, aparecerán aquí.',
  errorQueue: 'No se pudo cargar la cola de pagos.',
  retry: 'Intentar de nuevo',
  step1: 'Paso 1 de 2',
  step2: 'Paso 2 de 2',
  fColab: 'Colaborador',
  fData: 'Fecha del gasto',
  fCategoria: 'Categoría',
  fValor: 'Valor',
  fDescricao: 'Descripción',
  fSituacao: 'Situación',
  fDataPagamento: 'Fecha de pago',
  statusDraft: 'Borrador',
  statusAwaitingApproval: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  continueBtn: 'Continuar',
  loadingDetail: 'Cargando los datos del gasto…',
  errorDetail: 'No se pudieron cargar los datos de este gasto.',
  paying: 'Vas a pagar',
  dateLabel: 'Fecha de pago',
  dateHelper: 'Indica el día en que se pagó el gasto.',
  datePlaceholder: 'Selecciona la fecha',
  confirm: 'Registrar pago',
  confirmRetry: 'Intentar registrar de nuevo',
  errorPay: 'No se pudo registrar el pago. La fecha se conservó; inténtalo de nuevo.',
  successHeadline: 'Pago registrado con éxito',
  successLine: 'Este gasto salió de la cola de pagos.',
  backToQueue: 'Volver a la cola de pagos',
  none: '—',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

function fmtDate(iso: string | undefined | null, none: string) {
  if (!iso) return none;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium' }).format(d);
}

function statusText(msg: PageMessageType, status: string) {
  switch (status) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaitingApproval;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
    default: return status;
  }
}

function categoriesOf(items: DespesaAprovadaResumo[], current: string | null) {
  const set = new Set<string>();
  if (current) set.add(current);
  items.forEach((i) => set.add(i.details.details.categoria));
  return Array.from(set);
}

@customElement('reembolso-despesas--web--desktop--page21--despesas_aprovadas-102047')
export class ReembolsoDespesasDesktopPage21Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private renderStep(n: 1 | 2) {
    return html`
      <div class="mb-5" role="group" aria-label=${n === 1 ? this.msg['step1'] : this.msg['step2']}>
        <p class="mb-2 text-sm font-medium text-[var(--text-muted,currentColor)]">${n === 1 ? this.msg['step1'] : this.msg['step2']}</p>
        <div class="flex gap-2" aria-hidden="true">
          <span class="h-1.5 flex-1 rounded-full bg-[var(--button-primary-bg,transparent)]"></span>
          <span class="h-1.5 flex-1 rounded-full ${n === 2 ? 'bg-[var(--button-primary-bg,transparent)]' : 'bg-[var(--border-default,transparent)]'}"></span>
        </div>
      </div>
    `;
  }

  private renderPills(items: DespesaAprovadaResumo[]) {
    const loading = this.listarDespesasAprovadasStatus === 'loading';
    const base = 'min-h-[40px] rounded-full border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50';
    const on = 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]';
    const off = 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]';
    return html`
      <div role="group" aria-label=${this.msg['filterLabel']} class="mb-5 flex flex-wrap gap-2">
        <button type="button" class="${base} ${this.categoria === null ? on : off}" aria-pressed=${this.categoria === null ? 'true' : 'false'} ?disabled=${loading}
          @click=${() => this.listarDespesasAprovadas({ categoria: null })}>${this.msg['filterAll']}</button>
        ${categoriesOf(items, this.categoria).map((c) => html`
          <button type="button" class="${base} ${this.categoria === c ? on : off}" aria-pressed=${this.categoria === c ? 'true' : 'false'} ?disabled=${loading}
            @click=${() => this.listarDespesasAprovadas({ categoria: c })}>${c}</button>
        `)}
      </div>
    `;
  }

  private renderQueue() {
    const items = this.despesas?.items ?? [];
    const status = this.pageStatus;
    return html`
      <section data-organism-id="despesasAprovadasLista" class="mx-auto w-full max-w-3xl">
        ${this.renderPills(items)}
        ${status === 'loading' && items.length === 0
          ? html`<div aria-busy="true" class="flex flex-col gap-3">
              ${[0, 1, 2].map(() => html`<div class="h-20 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>`)}
            </div>`
          : status === 'error'
          ? html`<div role="alert" class="flex items-center justify-between gap-4 rounded-lg bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]">
              <span>${this.msg['errorQueue']}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.listarDespesasAprovadas()}>
                <Label>${this.msg['retry']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : status === 'empty' || (status === 'success' && items.length === 0)
          ? html`<div class="rounded-lg border border-dashed border-[var(--border-default,currentColor)] p-10 text-center">
              <p class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</p>
              <p class="mt-1 text-[var(--text-muted,currentColor)]">${this.msg['emptyHint']}</p>
            </div>`
          : html`
            <p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg['hintPick']}</p>
            <ul class="flex flex-col gap-3" aria-busy=${status === 'loading' ? 'true' : 'false'}>
              ${items.map((item) => html`
                <li>
                  <groupviewcard--ml-vertical-card clickable ?selected=${this.selectedDespesa === item.id}
                    @cardClick=${() => { this.selectDespesaAprovadaDetalhe(item.id); this.setScenario('conferir'); }}>
                    <CardContent>
                      <div class="flex items-center justify-between gap-6 py-1">
                        <div class="min-w-0">
                          <p class="truncate font-semibold text-[var(--text-strong,currentColor)]">${this.msg['fColab']}: ${item.colaboradorId}</p>
                          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${fmtDate(item.details.details.dataDespesa, this.msg['none'])} · ${item.details.details.categoria}</p>
                        </div>
                        <p class="shrink-0 text-right text-2xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${item.details.details.valor}</p>
                      </div>
                    </CardContent>
                  </groupviewcard--ml-vertical-card>
                </li>
              `)}
            </ul>
            ${this.despesas?.hasMore
              ? html`<div class="mt-4 flex justify-center">
                  <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" ?loading=${status === 'loading'}
                    @action=${() => this.listarDespesasAprovadas({ append: true })}>
                    <Label>${this.msg['loadMore']}</Label>
                  </grouptriggeraction--ml-button-standard>
                </div>`
              : nothing}
          `}
      </section>
    `;
  }

  private renderFact(label: string, value: string) {
    return html`
      <div class="flex justify-between gap-6 border-b border-[var(--border-subtle,currentColor)] py-2 last:border-b-0">
        <dt class="text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="text-right font-medium text-[var(--text-strong,currentColor)]">${value}</dd>
      </div>
    `;
  }

  private renderConferir() {
    const d = this.despesa;
    const loading = this.obterDespesaAprovadaStatus === 'loading';
    return html`
      <section data-organism-id="despesaAprovadaDetalhe" class="mx-auto w-full max-w-2xl">
        ${this.renderStep(1)}
        ${this.obterDespesaAprovadaStatus === 'error'
          ? html`<div role="alert" class="flex items-center justify-between gap-4 rounded-lg bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]">
              <span>${this.msg['errorDetail']}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
                @action=${() => this.selectDespesaAprovadaDetalhe(this.selectedDespesa)}>
                <Label>${this.msg['retry']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : loading || !d
          ? html`<div aria-busy="true" aria-live="polite" class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['loadingDetail']}</div>`
          : html`
            <groupviewcard--ml-vertical-card>
              <CardHeader>
                <CardTitle>${d.details.details.valor}</CardTitle>
                <CardDescription>${d.colaboradorId}</CardDescription>
              </CardHeader>
              <CardContent>
                <dl class="mt-2">
                  ${this.renderFact(this.msg['fColab'], d.colaboradorId)}
                  ${this.renderFact(this.msg['fData'], fmtDate(d.details.details.dataDespesa, this.msg['none']))}
                  ${this.renderFact(this.msg['fCategoria'], d.details.details.categoria)}
                  ${this.renderFact(this.msg['fValor'], d.details.details.valor)}
                  ${this.renderFact(this.msg['fDescricao'], d.details.details.descricao)}
                  ${this.renderFact(this.msg['fSituacao'], statusText(this.msg, d.status))}
                </dl>
              </CardContent>
            </groupviewcard--ml-vertical-card>
          `}
        <div class="mt-6 flex justify-end">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" ?disabled=${loading || !d}
            @action=${() => this.setScenario('pagamento')}>
            <Label>${this.msg['continueBtn']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  private renderPagamento() {
    const d = this.despesa;
    const date = this.registrarPagamentoDraft?.details?.dataPagamento ?? null;
    const busy = this.registrarPagamentoStatus === 'loading';
    const failed = this.registrarPagamentoStatus === 'error';
    return html`
      <section data-organism-id="registroPagamentoForm" class="mx-auto w-full max-w-2xl">
        ${this.renderStep(2)}
        ${d
          ? html`<div class="mb-6 flex items-center justify-between gap-6 rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4">
              <div class="min-w-0">
                <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['paying']}</p>
                <p class="truncate font-semibold text-[var(--text-strong,currentColor)]">${d.colaboradorId}</p>
                <p class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(d.details.details.dataDespesa, this.msg['none'])} · ${d.details.details.categoria}</p>
              </div>
              <p class="shrink-0 text-2xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${d.details.details.valor}</p>
            </div>`
          : nothing}
        <groupenterdate--ml-date-shortcut-picker
          .value=${date}
          .locale=${document.documentElement.lang || ''}
          .placeholder=${this.msg['datePlaceholder']}
          ?disabled=${busy}
          required
          @change=${(e: CustomEvent<{ value: string | null }>) => this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } })}>
          <Label>${this.msg['dateLabel']}</Label>
          <Helper>${this.msg['dateHelper']}</Helper>
        </groupenterdate--ml-date-shortcut-picker>
        <div class="mt-5" aria-live="polite">
          ${failed
            ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible dismissible="false">
                <Message>${this.msg['errorPay']}</Message>
              </groupnotifyuser--ml-contextual-feedback>`
            : nothing}
        </div>
        <div class="mt-4 flex justify-end">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" ?disabled=${!date || !d} ?loading=${busy}
            @action=${() => {
              this.registrarPagamento().then(() => {
                if (this.registrarPagamentoStatus === 'success') this.setScenario('sucesso');
              });
            }}>
            <Label>${failed ? this.msg['confirmRetry'] : this.msg['confirm']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  private renderSucesso() {
    const d = this.despesa;
    return html`
      <section class="mx-auto w-full max-w-xl text-center" aria-live="polite">
        <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--status-success-bg,transparent)] text-4xl text-[var(--status-success-text,currentColor)]" aria-hidden="true">✓</div>
        <h2 class="text-2xl font-bold text-[var(--text-strong,currentColor)]">${this.msg['successHeadline']}</h2>
        ${d
          ? html`<p class="mt-4 text-4xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${d.details.details.valor}</p>
            <p class="mt-2 text-[var(--text-default,currentColor)]">${d.colaboradorId} · ${d.details.details.categoria}</p>
            <p class="mt-1 text-[var(--text-muted,currentColor)]">${this.msg['fDataPagamento']}: ${fmtDate(d.details.details.dataPagamento, this.msg['none'])}</p>`
          : nothing}
        <p class="mt-4 text-[var(--text-muted,currentColor)]">${this.msg['successLine']}</p>
        <div class="mt-8 flex justify-center">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg"
            @action=${() => { this.selectDespesaAprovadaDetalhe(null); this.setScenario('fila'); }}>
            <Label>${this.msg['backToQueue']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-8 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'fila'}
          .backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="fila" title=${this.msg['titleFila']}>${this.renderQueue()}</Scene>
          <Scene value="conferir" title=${this.msg['titleConferir']} nav="back" backTo="fila">${this.renderConferir()}</Scene>
          <Scene value="pagamento" title=${this.msg['titlePagamento']} nav="back" backTo="conferir">${this.renderPagamento()}</Scene>
          <Scene value="sucesso" title=${this.msg['titleSucesso']}>${this.renderSucesso()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
