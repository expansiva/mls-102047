/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared, type DespesaAprovadaResumo } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  title: 'Despesas aprovadas',
  queueHint: 'Toque em uma despesa para conferir os dados e registrar o pagamento.',
  filterCategoryLabel: 'Categoria',
  filterCategoryPlaceholder: 'Buscar por categoria',
  removeFilter: 'Remover filtro',
  tokenCategory: 'Categoria',
  tokenCollaborator: 'Colaborador',
  empty: 'Nenhuma despesa aprovada aguardando pagamento.',
  loadingList: 'Carregando despesas…',
  listError: 'Não foi possível carregar as despesas aprovadas.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  collaborator: 'Colaborador',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  amount: 'Valor',
  description: 'Descrição',
  status: 'Situação',
  paymentDate: 'Data de pagamento',
  detailTitle: 'Conferir despesa',
  back: 'Voltar à fila',
  detailError: 'Não foi possível carregar os dados desta despesa.',
  payDateLabel: 'Data em que a despesa foi paga',
  payDateHelper: 'Informe a data para concluir o pagamento.',
  payAction: 'Registrar pagamento',
  payError: 'Não foi possível registrar o pagamento. Confira a data e tente de novo.',
  paySuccess: 'Pagamento registrado.',
  paySuccessInline: 'Pagamento registrado. A despesa saiu da fila de pagamento.',
  backToQueue: 'Ir para a fila',
  stDraft: 'Rascunho',
  stAwaiting: 'Aguardando aprovação',
  stRejected: 'Rejeitada',
  stApproved: 'Aprovada',
  stPaid: 'Paga'
};
const pageMessage_en_us: PageMessageType = {
  title: 'Approved expenses',
  queueHint: 'Tap an expense to check its data and register the payment.',
  filterCategoryLabel: 'Category',
  filterCategoryPlaceholder: 'Search by category',
  removeFilter: 'Remove filter',
  tokenCategory: 'Category',
  tokenCollaborator: 'Employee',
  empty: 'No approved expenses waiting for payment.',
  loadingList: 'Loading expenses…',
  listError: 'Could not load the approved expenses.',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  collaborator: 'Employee',
  expenseDate: 'Expense date',
  category: 'Category',
  amount: 'Amount',
  description: 'Description',
  status: 'Status',
  paymentDate: 'Payment date',
  detailTitle: 'Check expense',
  back: 'Back to queue',
  detailError: 'Could not load the data of this expense.',
  payDateLabel: 'Date the expense was paid',
  payDateHelper: 'Enter the date to complete the payment.',
  payAction: 'Register payment',
  payError: 'Could not register the payment. Check the date and try again.',
  paySuccess: 'Payment registered.',
  paySuccessInline: 'Payment registered. The expense left the payment queue.',
  backToQueue: 'Go to queue',
  stDraft: 'Draft',
  stAwaiting: 'Awaiting approval',
  stRejected: 'Rejected',
  stApproved: 'Approved',
  stPaid: 'Paid'
};
const pageMessage_es_es: PageMessageType = {
  title: 'Gastos aprobados',
  queueHint: 'Toca un gasto para revisar sus datos y registrar el pago.',
  filterCategoryLabel: 'Categoría',
  filterCategoryPlaceholder: 'Buscar por categoría',
  removeFilter: 'Quitar filtro',
  tokenCategory: 'Categoría',
  tokenCollaborator: 'Colaborador',
  empty: 'No hay gastos aprobados pendientes de pago.',
  loadingList: 'Cargando gastos…',
  listError: 'No se pudieron cargar los gastos aprobados.',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  collaborator: 'Colaborador',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  amount: 'Importe',
  description: 'Descripción',
  status: 'Situación',
  paymentDate: 'Fecha de pago',
  detailTitle: 'Revisar gasto',
  back: 'Volver a la cola',
  detailError: 'No se pudieron cargar los datos de este gasto.',
  payDateLabel: 'Fecha en que se pagó el gasto',
  payDateHelper: 'Indica la fecha para completar el pago.',
  payAction: 'Registrar pago',
  payError: 'No se pudo registrar el pago. Revisa la fecha e inténtalo de nuevo.',
  paySuccess: 'Pago registrado.',
  paySuccessInline: 'Pago registrado. El gasto salió de la cola de pago.',
  backToQueue: 'Ir a la cola',
  stDraft: 'Borrador',
  stAwaiting: 'Pendiente de aprobación',
  stRejected: 'Rechazado',
  stApproved: 'Aprobado',
  stPaid: 'Pagado'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

function fmtDate(v?: string | null): string {
  if (!v) return '';
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(v) ? `${v}T00:00:00` : v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium' }).format(d);
}

function statusTone(status: string): string {
  switch (status) {
    case 'paid': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    default: return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

@customElement('reembolso-despesas--web--mobile--page11--despesas_aprovadas-102047')
export class ReembolsoDespesasMobilePage11Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: string) {
    const m = this.msg;
    const map: Record<string, string> = {
      draft: m.stDraft,
      awaitingApproval: m.stAwaiting,
      rejected: m.stRejected,
      approved: m.stApproved,
      paid: m.stPaid
    };
    return map[status] ?? status;
  }

  private openDespesa(id: string) {
    this.selectDespesaAprovadaDetalhe(id);
    this.setScenario('pagamento');
  }

  private renderFilters() {
    return html`
      <div class="flex flex-col gap-2">
        <groupsearchcontent--ml-search-bar
          .value=${this.categoria}
          placeholder=${this.msg.filterCategoryPlaceholder}
          @change=${(e: CustomEvent<{ value: string | null }>) => {
            if (e.target !== e.currentTarget) return;
            this.listarDespesasAprovadas({ categoria: e.detail.value || null });
          }}
          @clear=${() => this.listarDespesasAprovadas({ categoria: null })}
        >
          <Label>${this.msg.filterCategoryLabel}</Label>
        </groupsearchcontent--ml-search-bar>
        ${this.categoria || this.colaboradorId
          ? html`<ul class="flex flex-wrap gap-2" aria-label=${this.msg.filterCategoryLabel}>
              ${this.categoria
                ? html`<li>${this.renderToken(this.msg.tokenCategory, this.categoria, () => this.listarDespesasAprovadas({ categoria: null }))}</li>`
                : nothing}
              ${this.colaboradorId
                ? html`<li>${this.renderToken(this.msg.tokenCollaborator, this.colaboradorId, () => this.listarDespesasAprovadas({ colaboradorId: null }))}</li>`
                : nothing}
            </ul>`
          : nothing}
      </div>
    `;
  }

  private renderToken(label: string, value: string, onRemove: () => void) {
    return html`
      <button
        type="button"
        class="min-h-[44px] max-w-full inline-flex items-center gap-2 rounded-full border px-4 text-sm bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
        aria-label=${`${this.msg.removeFilter}: ${label} ${value}`}
        @click=${onRemove}
      >
        <span class="truncate">${label}: ${value}</span>
        <span aria-hidden="true">×</span>
      </button>
    `;
  }

  private renderRow(row: DespesaAprovadaResumo) {
    return html`
      <Row ?selected=${row.id === this.selectedDespesa}>
        <Cell>
          <div class="flex min-h-[56px] flex-col justify-center gap-0.5 py-2">
            <span class="font-medium text-[var(--text-strong,currentColor)] break-words">${row.details.details.categoria}</span>
            <span class="text-xs text-[var(--text-muted,currentColor)] break-all">${this.msg.collaborator}: ${row.colaboradorId}</span>
            <span class="text-xs text-[var(--text-muted,currentColor)]">${fmtDate(row.details.details.dataDespesa)}</span>
          </div>
        </Cell>
        <Cell>
          <span class="block text-right font-semibold tabular-nums whitespace-nowrap text-[var(--text-strong,currentColor)]">${row.details.details.valor}</span>
        </Cell>
      </Row>
    `;
  }

  private renderFila() {
    const items = this.despesas?.items ?? [];
    const loading = this.listarDespesasAprovadasStatus === 'loading' || this.pageStatus === 'loading';
    const failed = this.listarDespesasAprovadasStatus === 'error' || this.pageStatus === 'error';
    return html`
      <section data-organism-id="despesasAprovadasLista" class="flex flex-col gap-4">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.queueHint}</p>
        ${this.renderFilters()}
        <div aria-live="polite">
          ${failed
            ? html`<div class="flex flex-col items-start gap-3 rounded-lg border p-4 border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] text-[var(--text-default,currentColor)]">
                <p>${this.msg.listError}</p>
                <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.listarDespesasAprovadas()}>
                  <Label>${this.msg.retry}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>`
            : nothing}
        </div>
        <div class="rounded-lg border overflow-hidden border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewdata--ml-vertical-record-list
            .hoverable=${true}
            .loading=${loading}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const row = items[e.detail.index];
              if (row) this.openDespesa(row.id);
            }}
          >
            <Columns>
              <Column field="despesa" header=${this.msg.category} />
              <Column field="valor" header=${this.msg.amount} align="right" />
            </Columns>
            <Rows>${items.map((row) => this.renderRow(row))}</Rows>
            <Empty>
              <div class="px-4 py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.empty}</div>
            </Empty>
            <Loading>
              <div class="px-4 py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.loadingList}</div>
            </Loading>
          </groupviewdata--ml-vertical-record-list>
        </div>
        ${this.despesas?.hasMore
          ? html`<grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="lg"
              data-class="w-full"
              .loading=${this.listarDespesasAprovadasStatus === 'loading'}
              @action=${() => this.listarDespesasAprovadas({ append: true })}
            >
              <Label>${this.msg.loadMore}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      </section>
    `;
  }

  private renderField(label: string, value: string) {
    return html`
      <div class="flex flex-col gap-0.5">
        <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="break-words text-[var(--text-default,currentColor)]">${value}</dd>
      </div>
    `;
  }

  private renderDetalhe() {
    const d = this.despesa;
    const loading = this.obterDespesaAprovadaStatus === 'loading';
    if (this.obterDespesaAprovadaStatus === 'error') {
      return html`
        <div class="flex flex-col items-start gap-3 rounded-lg border p-4 border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] text-[var(--text-default,currentColor)]" aria-live="polite">
          <p>${this.msg.detailError}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.selectDespesaAprovadaDetalhe(this.selectedDespesa)}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    return html`
      <groupviewcard--ml-vertical-card .loading=${loading || !d}>
        ${d
          ? html`
              <CardHeader>
                <CardTitle><span class="text-2xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span></CardTitle>
                <CardDescription>${d.details.details.categoria}</CardDescription>
              </CardHeader>
              <CardContent>
                <dl class="mt-3 flex flex-col gap-3">
                  ${this.renderField(this.msg.collaborator, d.colaboradorId)}
                  ${this.renderField(this.msg.expenseDate, fmtDate(d.details.details.dataDespesa))}
                  ${this.renderField(this.msg.description, d.details.details.descricao)}
                  ${d.details.details.dataPagamento
                    ? this.renderField(this.msg.paymentDate, fmtDate(d.details.details.dataPagamento))
                    : nothing}
                </dl>
              </CardContent>
              <CardFooter>
                <div class="mt-3 flex items-center gap-2">
                  <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.status}</span>
                  <span class="rounded-full px-3 py-1 text-xs font-medium ${statusTone(d.status)}">${this.statusLabel(d.status)}</span>
                </div>
              </CardFooter>
            `
          : nothing}
      </groupviewcard--ml-vertical-card>
    `;
  }

  private renderForm() {
    const status = this.registrarPagamentoStatus;
    const running = status === 'loading';
    const date = this.registrarPagamentoDraft.details.dataPagamento;
    return html`
      <div class="flex flex-col gap-4">
        ${status === 'success'
          ? html`<div class="flex flex-col gap-3 rounded-lg border p-4 border-[var(--border-default,currentColor)] bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]" aria-live="polite">
              <p>${this.msg.paySuccessInline}</p>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.setScenario('fila')}>
                <Label>${this.msg.backToQueue}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : html`
              <groupenterdate--ml-date-shortcut-picker
                .value=${date}
                .locale=${document.documentElement.lang || 'pt-BR'}
                .required=${true}
                .disabled=${running || !this.despesa}
                .error=${status === 'error' ? this.msg.payError : ''}
                @change=${(e: CustomEvent<{ value: string | null }>) => {
                  if (e.target !== e.currentTarget) return;
                  this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
                }}
              >
                <Label>${this.msg.payDateLabel}</Label>
                <Helper>${this.msg.payDateHelper}</Helper>
              </groupenterdate--ml-date-shortcut-picker>
              <grouptriggeraction--ml-button-standard
                data-variant="primary"
                size="lg"
                data-class="w-full"
                .loading=${running}
                .disabled=${!date || !this.despesa}
                @action=${() => this.registrarPagamento()}
              >
                <Label>${this.msg.payAction}</Label>
              </grouptriggeraction--ml-button-standard>
            `}
        <groupnotifyuser--ml-toast-notification
          type="success"
          position="bottom"
          .duration=${4000}
          .visible=${status === 'success'}
        >
          <Message>${this.msg.paySuccess}</Message>
        </groupnotifyuser--ml-toast-notification>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-screen w-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-4 py-4">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'fila'}
          backLabel=${this.msg.back}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="fila" title=${this.msg.title}>${this.renderFila()}</Scene>
          <Scene value="pagamento" title=${this.msg.detailTitle} nav="back" backTo="fila">
            <div class="flex flex-col gap-5">
              <section data-organism-id="despesaAprovadaDetalhe">${this.renderDetalhe()}</section>
              <section data-organism-id="registroPagamentoForm">${this.renderForm()}</section>
            </div>
          </Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
