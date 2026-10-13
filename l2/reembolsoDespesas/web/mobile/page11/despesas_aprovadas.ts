/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import type { DespesaLoad } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102040_/l2/molecules/groupenterdate/ml-compact-calendar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  queueTitle: 'Despesas aprovadas a pagar',
  paymentTitle: 'Conferir e pagar',
  back: 'Voltar à fila',
  colExpense: 'Despesa',
  colValue: 'Valor',
  emptyQueue: 'Nenhuma despesa aprovada aguardando pagamento.',
  loadingQueue: 'Carregando despesas aprovadas…',
  loadError: 'Não foi possível carregar as despesas aprovadas.',
  retry: 'Tentar novamente',
  filterToken: 'Filtrado por colaborador',
  removeFilter: 'Remover filtro de colaborador',
  loadMore: 'Carregar mais despesas',
  employee: 'Colaborador',
  expenseDate: 'Data da despesa',
  value: 'Valor',
  status: 'Situação',
  paymentDate: 'Data de pagamento',
  noSelection: 'Escolha uma despesa na fila para conferir os dados e registrar o pagamento.',
  paymentDateLabel: 'Data em que o pagamento foi realizado',
  paymentDateHelper: 'Informe a data para encerrar a despesa como paga.',
  registerPayment: 'Registrar pagamento',
  paymentRegistered: 'Pagamento registrado. A despesa está paga.',
  errRequired: 'Informe a data de pagamento para registrar.',
  errPrecondition: 'Escolha uma despesa aprovada na fila antes de registrar.',
  errGeneric: 'Não foi possível registrar o pagamento. Tente novamente.',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  empty: '—',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function formatMoney(v: string): string {
  const n = Number(v);
  if (v === '' || v == null || Number.isNaN(n)) return v || '—';
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function formatDate(v: string | null | undefined): string {
  if (!v) return '—';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return v;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function statusLabel(msg: PageMessageType, s: DespesaLoad['status']): string {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaiting;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
    default: return msg.empty;
  }
}

function statusTone(s: DespesaLoad['status']): string {
  switch (s) {
    case 'paid': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    default: return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

@customElement('reembolso-despesas--web--mobile--page11--despesas_aprovadas-102047')
export class ReembolsoDespesasMobilePage11Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg!: PageMessageType;

  private openExpense(index: number) {
    const row = this.despesasAprovadas[index];
    if (!row) return;
    this.selectDespesaAprovada(row.id);
    this.setScenario('payment');
  }

  private renderQueue() {
    const loading = this.pageStatus === 'loading' || this.loadStatus === 'loading';
    const error = this.loadError || this.loadDespesasAprovadasError;
    return html`
      <section data-organism-id="approvedExpensesList" class="flex flex-col gap-3">
        ${this.colaboradorId
          ? html`<div class="flex">
              <span class="inline-flex items-center gap-1 rounded-full border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] pl-3 text-sm text-[var(--text-default,currentColor)]">
                ${this.msg['filterToken']}
                <button type="button"
                  class="min-h-[44px] min-w-[44px] rounded-full text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                  aria-label=${this.msg['removeFilter']}
                  @click=${() => this.filterApprovedExpensesList(null)}>×</button>
              </span>
            </div>`
          : nothing}
        <div aria-live="polite">
          ${error
            ? html`<div class="flex flex-col gap-2 rounded-lg border-l-4 border-[var(--status-error-text,currentColor)] bg-[var(--surface-bg,transparent)] p-3 text-[var(--text-default,currentColor)]">
                <p class="text-sm">${this.msg['loadError']}</p>
                <button type="button"
                  class="min-h-[44px] self-start rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                  @click=${() => this.load()}>${this.msg['retry']}</button>
              </div>`
            : nothing}
        </div>
        <div class="overflow-hidden rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewdata--ml-vertical-record-list
            .loading=${loading}
            .hoverable=${true}
            @row-click=${(e: CustomEvent<{ index: number }>) => this.openExpense(e.detail.index)}>
            <Columns>
              <Column field="expense" header=${this.msg['colExpense']} />
              <Column field="value" header=${this.msg['colValue']} align="right" width="120px" />
            </Columns>
            <Rows>
              ${this.despesasAprovadas.map(
                (row) => html`
                  <Row ?selected=${row.id === this.despesaAprovada}>
                    <Cell>
                      <div class="flex min-h-[44px] min-w-0 flex-col justify-center">
                        <span class="truncate font-medium text-[var(--text-strong,currentColor)]">${row.details.categoria}</span>
                        <span class="text-xs text-[var(--text-muted,currentColor)]">${formatDate(row.details.dataDespesa)}</span>
                        <span class="truncate text-xs text-[var(--text-muted,currentColor)]">${row.colaboradorId}</span>
                      </div>
                    </Cell>
                    <Cell>
                      <span class="block text-right font-medium tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(row.details.valor)}</span>
                    </Cell>
                  </Row>`,
              )}
            </Rows>
            <Empty>
              <div class="px-4 py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyQueue']}</div>
            </Empty>
            <Loading>
              <div class="px-4 py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['loadingQueue']}</div>
            </Loading>
          </groupviewdata--ml-vertical-record-list>
        </div>
        ${this.hasMoreApprovedExpensesList
          ? html`<grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="lg"
              data-class="w-full"
              ?loading=${this.loadDespesasAprovadasStatus === 'loading'}
              @action=${() => this.loadMoreApprovedExpensesList()}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      </section>`;
  }

  private renderDetail() {
    const d = this.approvedExpenseDetail;
    return html`
      <section data-organism-id="approvedExpenseDetail">
        ${d
          ? html`<groupviewcard--ml-vertical-card>
              <CardHeader>
                <CardTitle>${d.details.categoria}</CardTitle>
                <CardDescription>${formatDate(d.details.dataDespesa)}</CardDescription>
              </CardHeader>
              <CardContent>
                <dl class="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-3 text-sm">
                  <dt class="text-[var(--text-muted,currentColor)]">${this.msg['value']}</dt>
                  <dd class="text-right text-lg font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(d.details.valor)}</dd>
                  <dt class="text-[var(--text-muted,currentColor)]">${this.msg['employee']}</dt>
                  <dd class="min-w-0 break-all text-right text-[var(--text-default,currentColor)]">${d.colaboradorId}</dd>
                  <dt class="text-[var(--text-muted,currentColor)]">${this.msg['status']}</dt>
                  <dd class="text-right"><span class="inline-block rounded-full px-2 py-0.5 text-xs ${statusTone(d.status)}">${statusLabel(this.msg, d.status)}</span></dd>
                  ${d.details.dataPagamento
                    ? html`<dt class="text-[var(--text-muted,currentColor)]">${this.msg['paymentDate']}</dt>
                        <dd class="text-right tabular-nums text-[var(--text-default,currentColor)]">${formatDate(d.details.dataPagamento)}</dd>`
                    : nothing}
                </dl>
              </CardContent>
            </groupviewcard--ml-vertical-card>`
          : html`<p class="rounded-lg border border-dashed border-[var(--border-default,currentColor)] p-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['noSelection']}</p>`}
      </section>`;
  }

  private paymentErrorText(): string {
    const err = this.registerPaymentError;
    if (!err) return '';
    if (err.code === 'client.requiredMissing') return this.msg['errRequired'];
    if (err.code === 'client.preconditionMissing') return this.msg['errPrecondition'];
    return this.msg['errGeneric'];
  }

  private renderForm() {
    const d = this.approvedExpenseDetail;
    const paid = !!d && !!d.details.dataPagamento;
    const busy = this.registerPaymentStatus === 'loading';
    return html`
      <section data-organism-id="paymentDateForm" class="flex flex-col gap-3">
        ${paid
          ? html`<p aria-live="polite" class="rounded-lg border-l-4 border-[var(--status-success-text,currentColor)] bg-[var(--surface-bg,transparent)] p-3 text-sm text-[var(--text-default,currentColor)]">${this.msg['paymentRegistered']}</p>`
          : html`
            <div class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
              <groupenterdate--ml-compact-calendar
                .value=${this.dataPagamento?.details?.dataPagamento ?? null}
                .error=${this.paymentErrorText()}
                .locale=${document.documentElement.lang || 'pt-BR'}
                ?disabled=${!d || busy}
                required
                @change=${(e: CustomEvent<{ value: string | null }>) => {
                  if (e.target === e.currentTarget) return;
                  this.setDataPagamento({ details: { dataPagamento: e.detail.value } });
                }}>
                <Label>${this.msg['paymentDateLabel']}</Label>
                <Helper>${this.msg['paymentDateHelper']}</Helper>
              </groupenterdate--ml-compact-calendar>
            </div>
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              size="lg"
              data-class="w-full"
              ?disabled=${!d}
              ?loading=${busy}
              @action=${() => this.registerPayment()}>
              <Label>${this.msg['registerPayment']}</Label>
            </grouptriggeraction--ml-button-standard>`}
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto min-h-full w-full max-w-[430px] bg-[var(--page-bg,transparent)] p-3 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'queue'}
          .backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}>
          <Scene value="queue" title=${this.msg['queueTitle']}>
            ${this.renderQueue()}
          </Scene>
          <Scene value="payment" title=${this.msg['paymentTitle']} nav="back" backTo="queue">
            <div class="flex flex-col gap-4">
              ${this.renderDetail()}
              ${this.renderForm()}
            </div>
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
