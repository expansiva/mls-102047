/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  title: 'Despesas aprovadas',
  subtitle: 'Fila de despesas que aguardam pagamento.',
  searchLabel: 'Filtrar por categoria',
  searchPlaceholder: 'Digite a categoria e tecle Enter',
  filterCategoria: 'Categoria',
  filterColaborador: 'Colaborador',
  removeFilter: 'Remover filtro',
  colColaborador: 'Colaborador',
  colData: 'Data da despesa',
  colCategoria: 'Categoria',
  colSituacao: 'Situação',
  colValor: 'Valor',
  empty: 'Nenhuma despesa aprovada aguardando pagamento.',
  listError: 'Não foi possível carregar as despesas aprovadas.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  panelHeading: 'Despesa escolhida',
  emptyPanel: 'Escolha uma despesa na fila para conferir os dados e registrar o pagamento.',
  detailLoading: 'Carregando os dados da despesa…',
  detailError: 'Não foi possível carregar os dados desta despesa.',
  fieldColaborador: 'Colaborador',
  fieldData: 'Data da despesa',
  fieldCategoria: 'Categoria',
  fieldSituacao: 'Situação',
  fieldDataPagamento: 'Data de pagamento',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  payDateLabel: 'Data em que foi paga',
  payHelper: 'A data de pagamento é obrigatória para registrar o pagamento.',
  payButton: 'Registrar pagamento',
  payError: 'Não foi possível registrar o pagamento. Confira a data e tente novamente.',
  paySuccess: 'Pagamento registrado. A despesa saiu da fila e está paga em',
};
const pageMessage_en_us: PageMessageType = {
  title: 'Approved expenses',
  subtitle: 'Queue of expenses waiting for payment.',
  searchLabel: 'Filter by category',
  searchPlaceholder: 'Type the category and press Enter',
  filterCategoria: 'Category',
  filterColaborador: 'Employee',
  removeFilter: 'Remove filter',
  colColaborador: 'Employee',
  colData: 'Expense date',
  colCategoria: 'Category',
  colSituacao: 'Status',
  colValor: 'Amount',
  empty: 'No approved expenses waiting for payment.',
  listError: 'Could not load the approved expenses.',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  panelHeading: 'Chosen expense',
  emptyPanel: 'Choose an expense in the queue to check its data and register the payment.',
  detailLoading: 'Loading the expense data…',
  detailError: 'Could not load the data of this expense.',
  fieldColaborador: 'Employee',
  fieldData: 'Expense date',
  fieldCategoria: 'Category',
  fieldSituacao: 'Status',
  fieldDataPagamento: 'Payment date',
  statusDraft: 'Draft',
  statusAwaitingApproval: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  payDateLabel: 'Date it was paid',
  payHelper: 'The payment date is required to register the payment.',
  payButton: 'Register payment',
  payError: 'Could not register the payment. Check the date and try again.',
  paySuccess: 'Payment registered. The expense left the queue and is paid on',
};
const pageMessage_es_es: PageMessageType = {
  title: 'Gastos aprobados',
  subtitle: 'Cola de gastos pendientes de pago.',
  searchLabel: 'Filtrar por categoría',
  searchPlaceholder: 'Escriba la categoría y pulse Enter',
  filterCategoria: 'Categoría',
  filterColaborador: 'Colaborador',
  removeFilter: 'Quitar filtro',
  colColaborador: 'Colaborador',
  colData: 'Fecha del gasto',
  colCategoria: 'Categoría',
  colSituacao: 'Situación',
  colValor: 'Importe',
  empty: 'No hay gastos aprobados pendientes de pago.',
  listError: 'No se pudieron cargar los gastos aprobados.',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  panelHeading: 'Gasto elegido',
  emptyPanel: 'Elija un gasto de la cola para revisar sus datos y registrar el pago.',
  detailLoading: 'Cargando los datos del gasto…',
  detailError: 'No se pudieron cargar los datos de este gasto.',
  fieldColaborador: 'Colaborador',
  fieldData: 'Fecha del gasto',
  fieldCategoria: 'Categoría',
  fieldSituacao: 'Situación',
  fieldDataPagamento: 'Fecha de pago',
  statusDraft: 'Borrador',
  statusAwaitingApproval: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  payDateLabel: 'Fecha en que se pagó',
  payHelper: 'La fecha de pago es obligatoria para registrar el pago.',
  payButton: 'Registrar pago',
  payError: 'No se pudo registrar el pago. Revise la fecha e inténtelo de nuevo.',
  paySuccess: 'Pago registrado. El gasto salió de la cola y está pagado el',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

type Status = 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  const d = new Date(dateOnly ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, dateOnly ? { timeZone: 'UTC' } : undefined).format(d);
}

function statusLabel(msg: PageMessageType, s: Status): string {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaitingApproval;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
  }
}

function statusClass(s: Status): string {
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
  private msg: PageMessageType = pageMessage_pt_br;

  private renderChip(s: Status) {
    return html`<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(s)}">${statusLabel(this.msg, s)}</span>`;
  }

  private renderToken(label: string, value: string, onRemove: () => void) {
    return html`
      <span class="inline-flex items-center gap-1 rounded-full border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] py-0.5 pl-3 pr-1 text-sm text-[var(--text-default,currentColor)]">
        <span class="text-[var(--text-muted,currentColor)]">${label}:</span>
        <span class="font-medium">${value}</span>
        <button type="button" aria-label="${this.msg.removeFilter}: ${label}" title="${this.msg.removeFilter}"
          class="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[var(--selected-bg,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          @click=${onRemove}>×</button>
      </span>`;
  }

  private renderLista() {
    const items = this.despesas?.items ?? [];
    const selectedIndex = items.findIndex((i) => i.id === this.selectedDespesa);
    const loading = this.pageStatus === 'loading';
    return html`
      <div data-organism-id="despesasAprovadasLista" class="flex flex-col gap-3">
        <groupsearchcontent--ml-search-bar
          .value=${this.categoria}
          placeholder="${this.msg.searchPlaceholder}"
          @change=${(e: CustomEvent<{ value: string | null }>) => { this.listarDespesasAprovadas({ categoria: e.detail.value || null }); }}
          @clear=${() => { this.listarDespesasAprovadas({ categoria: null }); }}>
          <Label>${this.msg.searchLabel}</Label>
        </groupsearchcontent--ml-search-bar>

        ${this.categoria || this.colaboradorId
          ? html`<div class="flex flex-wrap gap-2">
              ${this.categoria ? this.renderToken(this.msg.filterCategoria, this.categoria, () => { this.listarDespesasAprovadas({ categoria: null }); }) : nothing}
              ${this.colaboradorId ? this.renderToken(this.msg.filterColaborador, this.colaboradorId, () => { this.listarDespesasAprovadas({ colaboradorId: null }); }) : nothing}
            </div>`
          : nothing}

        ${this.pageStatus === 'error' || this.listarDespesasAprovadasStatus === 'error'
          ? html`<div role="alert" aria-live="polite" class="flex items-center justify-between gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3 text-[var(--text-default,currentColor)]">
              <span>${this.msg.listError}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { this.listarDespesasAprovadas(); }}>
                <Label>${this.msg.retry}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}

        <groupviewtable--ml-data-table
          .value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
          ?loading=${loading}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const row = items[e.detail.index];
            if (row) this.selectDespesaAprovadaDetalhe(row.id);
          }}
          @change=${(e: Event) => e.stopPropagation()}>
          <TableHeader>
            <TableRow>
              <TableHead key="colaborador">${this.msg.colColaborador}</TableHead>
              <TableHead key="data">${this.msg.colData}</TableHead>
              <TableHead key="categoria">${this.msg.colCategoria}</TableHead>
              <TableHead key="situacao">${this.msg.colSituacao}</TableHead>
              <TableHead key="valor" align="right">${this.msg.colValor}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map((i) => html`
              <TableRow key=${i.id}>
                <TableCell>${i.colaboradorId}</TableCell>
                <TableCell>${fmtDate(i.details.details.dataDespesa)}</TableCell>
                <TableCell>${i.details.details.categoria}</TableCell>
                <TableCell>${this.renderChip(i.status)}</TableCell>
                <TableCell><div class="w-full text-right tabular-nums font-medium">${i.details.details.valor}</div></TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>${this.msg.empty}</Empty>
        </groupviewtable--ml-data-table>

        ${this.despesas?.hasMore
          ? html`<div class="flex justify-center">
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
                ?loading=${this.listarDespesasAprovadasStatus === 'loading'}
                @action=${() => { this.listarDespesasAprovadas({ append: true }); }}>
                <Label>${this.msg.loadMore}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </div>`;
  }

  private renderDetalhe() {
    const d = this.despesa;
    if (!d) return nothing;
    const f = d.details.details;
    return html`
      <div data-organism-id="despesaAprovadaDetalhe">
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle><span class="tabular-nums">${f.valor}</span></CardTitle>
            <CardDescription>${f.descricao}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg.fieldColaborador}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${d.colaboradorId}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg.fieldData}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${fmtDate(f.dataDespesa)}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg.fieldCategoria}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${f.categoria}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg.fieldSituacao}</dt>
              <dd>${this.renderChip(d.status)}</dd>
              ${f.dataPagamento
                ? html`<dt class="text-[var(--text-muted,currentColor)]">${this.msg.fieldDataPagamento}</dt>
                    <dd class="text-[var(--text-strong,currentColor)]">${fmtDate(f.dataPagamento)}</dd>`
                : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
      </div>`;
  }

  private renderForm() {
    const d = this.despesa;
    if (!d) return nothing;
    const date = this.registrarPagamentoDraft.details.dataPagamento;
    const running = this.registrarPagamentoStatus === 'loading';
    if (d.status !== 'approved') {
      return d.details.details.dataPagamento
        ? html`<div data-organism-id="registroPagamentoForm" aria-live="polite">
            <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
              <Message>${this.msg.paySuccess} ${fmtDate(d.details.details.dataPagamento)}</Message>
            </groupnotifyuser--ml-contextual-feedback>
          </div>`
        : html`<div data-organism-id="registroPagamentoForm"></div>`;
    }
    return html`
      <form data-organism-id="registroPagamentoForm" class="flex flex-col gap-3"
        @submit=${(e: Event) => { e.preventDefault(); if (date) this.registrarPagamento(); }}>
        <groupenterdate--ml-date-shortcut-picker
          .value=${date}
          locale=${document.documentElement.lang || 'pt-BR'}
          required
          ?disabled=${running}
          @change=${(e: CustomEvent<{ value: string | null }>) => {
            if (e.target === e.currentTarget) this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
          }}>
          <Label>${this.msg.payDateLabel}</Label>
          <Helper>${this.msg.payHelper}</Helper>
        </groupenterdate--ml-date-shortcut-picker>
        ${this.registrarPagamentoStatus === 'error'
          ? html`<div aria-live="polite">
              <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
                <Message>${this.msg.payError}</Message>
              </groupnotifyuser--ml-contextual-feedback>
            </div>`
          : nothing}
        <div>
          <grouptriggeraction--ml-button-standard size="md" ?loading=${running} ?disabled=${!date}
            @action=${() => { if (date) this.registrarPagamento(); }}>
            <Label>${this.msg.payButton}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </form>`;
  }

  private renderPanel() {
    let body;
    if (!this.selectedDespesa) {
      body = html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.emptyPanel}</p>`;
    } else if (this.obterDespesaAprovadaStatus === 'loading') {
      body = html`<p aria-busy="true" class="animate-pulse text-sm text-[var(--text-muted,currentColor)]">${this.msg.detailLoading}</p>`;
    } else if (this.obterDespesaAprovadaStatus === 'error') {
      const id = this.selectedDespesa;
      body = html`<div role="alert" aria-live="polite" class="flex flex-col items-start gap-3 text-[var(--text-default,currentColor)]">
        <span>${this.msg.detailError}</span>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { this.obterDespesaAprovada(id); }}>
          <Label>${this.msg.retry}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    } else if (this.despesa) {
      body = html`<div class="flex flex-col gap-4">${this.renderDetalhe()}${this.renderForm()}</div>`;
    } else {
      body = nothing;
    }
    return html`
      <aside class="sticky top-6 self-start rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <h2 class="mb-3 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.panelHeading}</h2>
        ${body}
      </aside>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="mx-auto mb-5 max-w-[1400px]">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.title}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.subtitle}</p>
        </header>
        <div class="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_380px] gap-6">
          <section data-section-id="filaPagamento" class="min-w-0">${this.renderLista()}</section>
          <section data-section-id="analisePagamento">${this.renderPanel()}</section>
        </div>
      </div>`;
  }
}
