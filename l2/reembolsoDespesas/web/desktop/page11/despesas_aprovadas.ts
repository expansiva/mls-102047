/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import type { DespesaLoad, ErrorState } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Despesas aprovadas',
  pageIntent: 'Localize o que ainda aguarda pagamento, confira o reembolso e registre a data em que foi pago.',
  queueCaption: 'Aguardando pagamento',
  colColaborador: 'Colaborador',
  colDataDespesa: 'Data da despesa',
  colCategoria: 'Categoria',
  colSituacao: 'Situação',
  colDataPagamento: 'Data de pagamento',
  colValor: 'Valor',
  emptyQueue: 'Nenhuma despesa aprovada aguardando pagamento.',
  filterLabel: 'Colaborador',
  removeFilter: 'Remover filtro por colaborador',
  loadMore: 'Carregar mais despesas',
  loadingMore: 'Carregando…',
  retry: 'Tentar novamente',
  queueError: 'Não foi possível carregar as despesas aprovadas.',
  detailTitle: 'Conferência da despesa',
  detailEmpty: 'Selecione uma despesa na fila para conferir os dados do reembolso.',
  notPaid: 'Ainda não paga',
  onlyThisEmployee: 'Ver só deste colaborador',
  paymentTitle: 'Pagamento da despesa',
  paymentDateLabel: 'Data de pagamento',
  paymentHelper: 'Informe o dia em que o reembolso foi pago.',
  paymentPlaceholder: 'Escolha a data',
  registerPayment: 'Registrar pagamento',
  paymentSuccess: 'Pagamento registrado. A data já aparece na despesa.',
  paymentSelectFirst: 'Selecione uma despesa para registrar o pagamento.',
  paymentError: 'Não foi possível registrar o pagamento.',
  selectionInvalid: 'A despesa selecionada não está mais na fila.',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  emptyValue: '—',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtMoney(v: string | null | undefined, dash: string): string {
  if (v === null || v === undefined || v === '') return dash;
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return new Intl.NumberFormat(lang() || 'pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v: string | null | undefined, dash: string): string {
  if (!v) return dash;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return v;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(lang()).format(d);
}

function statusLabel(msg: PageMessageType, s: DespesaLoad['status']): string {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaitingApproval;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
    default: return s;
  }
}

function statusClass(s: DespesaLoad['status']): string {
  switch (s) {
    case 'approved': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'paid': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    default: return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

@customElement('reembolso-despesas--web--desktop--page11--despesas_aprovadas-102047')
export class ReembolsoDespesasDesktopPage11Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg!: PageMessageType;

  private renderStatus(s: DespesaLoad['status']) {
    return html`<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(s)}">${statusLabel(this.msg, s)}</span>`;
  }

  private renderQueueError(err: ErrorState) {
    if (!err) return nothing;
    const text = err.code === 'client.selectionInvalid' ? this.msg['selectionInvalid'] : this.msg['queueError'];
    return html`
      <div class="flex items-center justify-between gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-4 py-3 text-sm text-[var(--text-default,currentColor)]" role="alert" aria-live="polite">
        <span>${text}</span>
        <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary" @action=${() => { void this.load(); }}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  private renderFilterToken() {
    if (!this.colaboradorId) return nothing;
    return html`
      <div class="flex items-center gap-2 text-sm text-[var(--text-muted,currentColor)]">
        <span class="inline-flex items-center gap-1 rounded-full border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] py-1 pl-3 pr-1 text-[var(--text-default,currentColor)]">
          <span>${this.msg['filterLabel']}: ${this.colaboradorId}</span>
          <button type="button" class="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-[var(--selected-bg,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            aria-label=${this.msg['removeFilter']}
            @click=${() => { void this.filterApprovedExpensesList(null); }}>×</button>
        </span>
      </div>`;
  }

  private renderQueue() {
    const rows = this.despesasAprovadas;
    const selectedIdx = rows.findIndex((r) => r.id === this.despesaAprovada);
    const loading = this.pageStatus === 'loading' || this.loadDespesasAprovadasStatus === 'loading';
    const dash = this.msg['emptyValue'];
    const err = this.loadError || this.loadDespesasAprovadasError;
    return html`
      <section data-organism-id="approvedExpensesList" class="flex min-w-0 flex-col gap-3" aria-busy=${loading ? 'true' : 'false'}>
        ${this.renderFilterToken()}
        ${this.renderQueueError(err)}
        <groupviewtable--ml-data-table
          .value=${selectedIdx >= 0 ? String(selectedIdx) : ''}
          ?loading=${loading && rows.length === 0}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const row = this.despesasAprovadas[e.detail.index];
            if (row) this.selectDespesaAprovada(row.id);
          }}
          @change=${(e: Event) => e.stopPropagation()}>
          <TableCaption>${this.msg['queueCaption']}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead key="colaborador">${this.msg['colColaborador']}</TableHead>
              <TableHead key="dataDespesa">${this.msg['colDataDespesa']}</TableHead>
              <TableHead key="categoria">${this.msg['colCategoria']}</TableHead>
              <TableHead key="situacao">${this.msg['colSituacao']}</TableHead>
              <TableHead key="dataPagamento">${this.msg['colDataPagamento']}</TableHead>
              <TableHead key="valor" align="right">${this.msg['colValor']}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${rows.map((r) => html`
              <TableRow key=${r.id}>
                <TableCell>${r.colaboradorId}</TableCell>
                <TableCell>${fmtDate(r.details.dataDespesa, dash)}</TableCell>
                <TableCell>${r.details.categoria}</TableCell>
                <TableCell>${this.renderStatus(r.status)}</TableCell>
                <TableCell>${fmtDate(r.details.dataPagamento, dash)}</TableCell>
                <TableCell><span class="block text-right tabular-nums font-medium">${fmtMoney(r.details.valor, dash)}</span></TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>${this.msg['emptyQueue']}</Empty>
        </groupviewtable--ml-data-table>
        ${this.hasMoreApprovedExpensesList ? html`
          <div class="flex justify-center">
            <grouptriggeraction--ml-button-standard size="md" data-variant="secondary"
              ?loading=${this.loadDespesasAprovadasStatus === 'loading'}
              @action=${() => { void this.loadMoreApprovedExpensesList(); }}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}
      </section>`;
  }

  private renderDetail() {
    const d = this.approvedExpenseDetail;
    const dash = this.msg['emptyValue'];
    return html`
      <div data-organism-id="approvedExpenseDetail">
        <groupviewcard--ml-vertical-card ?loading=${this.pageStatus === 'loading' && !d}>
          <CardHeader>
            <CardTitle>${this.msg['detailTitle']}</CardTitle>
          </CardHeader>
          <CardContent>
            ${d ? html`
              <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colColaborador']}</dt>
                <dd class="text-right text-[var(--text-strong,currentColor)]">${d.colaboradorId}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colCategoria']}</dt>
                <dd class="text-right text-[var(--text-strong,currentColor)]">${d.details.categoria}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colDataDespesa']}</dt>
                <dd class="text-right text-[var(--text-strong,currentColor)]">${fmtDate(d.details.dataDespesa, dash)}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colSituacao']}</dt>
                <dd class="flex justify-end">${this.renderStatus(d.status)}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colDataPagamento']}</dt>
                <dd class="text-right text-[var(--text-strong,currentColor)]">${d.details.dataPagamento ? fmtDate(d.details.dataPagamento, dash) : this.msg['notPaid']}</dd>
                <dt class="self-baseline text-[var(--text-muted,currentColor)]">${this.msg['colValor']}</dt>
                <dd class="text-right text-xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(d.details.valor, dash)}</dd>
              </dl>` : html`
              <p class="py-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['detailEmpty']}</p>`}
          </CardContent>
          ${d ? html`
            <CardFooter>
              <grouptriggeraction--ml-button-standard size="sm" data-variant="ghost"
                @action=${() => { void this.filterApprovedExpensesList(d.colaboradorId); }}>
                <Label>${this.msg['onlyThisEmployee']}</Label>
              </grouptriggeraction--ml-button-standard>
            </CardFooter>` : nothing}
        </groupviewcard--ml-vertical-card>
      </div>`;
  }

  private renderForm() {
    const d = this.approvedExpenseDetail;
    const busy = this.registerPaymentStatus === 'loading';
    const err = this.registerPaymentError;
    return html`
      <section data-organism-id="paymentDateForm" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-busy=${busy ? 'true' : 'false'}>
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['paymentTitle']}</h2>
        <groupenterdate--ml-date-picker
          .value=${this.dataPagamento.details.dataPagamento}
          locale=${lang() || 'pt-BR'}
          placeholder=${this.msg['paymentPlaceholder']}
          ?disabled=${!d || busy}
          required
          @change=${(e: CustomEvent<{ value: string | null }>) => {
            e.stopPropagation();
            this.setDataPagamento({ details: { dataPagamento: e.detail.value } });
          }}>
          <Label>${this.msg['paymentDateLabel']}</Label>
          <Helper>${d ? this.msg['paymentHelper'] : this.msg['paymentSelectFirst']}</Helper>
        </groupenterdate--ml-date-picker>
        <div aria-live="polite" class="text-sm">
          ${err ? html`<p class="rounded-md bg-[var(--status-error-bg,transparent)] px-3 py-2 text-[var(--status-error-text,currentColor)]" role="alert">${this.msg['paymentError']}</p>` : nothing}
          ${!err && this.registerPaymentStatus === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,transparent)] px-3 py-2 text-[var(--status-success-text,currentColor)]">${this.msg['paymentSuccess']}</p>` : nothing}
        </div>
        <grouptriggeraction--ml-button-standard size="md" data-variant="primary" data-class="w-full"
          ?disabled=${!d}
          ?loading=${busy}
          @action=${() => { void this.registerPayment(); }}>
          <Label>${this.msg['registerPayment']}</Label>
        </grouptriggeraction--ml-button-standard>
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="mb-5">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageIntent']}</p>
        </header>
        <div class="grid grid-cols-[minmax(0,1fr)_380px] items-start gap-6">
          ${this.renderQueue()}
          <aside class="sticky top-4 flex flex-col gap-4">
            ${this.renderDetail()}
            ${this.renderForm()}
          </aside>
        </div>
      </div>`;
  }
}
