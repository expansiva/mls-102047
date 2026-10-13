/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  queueTitle: 'Despesas aprovadas',
  payTitle: 'Conferir e pagar',
  back: 'Voltar à fila',
  searchLabel: 'Categoria',
  searchPlaceholder: 'Buscar por categoria',
  searchEmpty: 'Digite e confirme para filtrar',
  filterToken: 'Categoria',
  removeFilter: 'Remover filtro de categoria',
  colDespesa: 'Despesa',
  colValor: 'Valor',
  colaborador: 'Colaborador',
  dataDespesa: 'Data da despesa',
  categoria: 'Categoria',
  descricao: 'Descrição',
  situacao: 'Situação',
  dataPagamento: 'Data de pagamento',
  dataPagamentoHelper: 'Informe o dia em que a despesa foi paga.',
  empty: 'Nenhuma despesa aprovada aguardando pagamento.',
  loading: 'Carregando despesas…',
  loadError: 'Não foi possível carregar as despesas.',
  detailError: 'Não foi possível carregar esta despesa.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  registrar: 'Registrar pagamento',
  paidMsg: 'Pagamento registrado. A despesa saiu da fila.',
  backToQueue: 'Escolher outra despesa',
  pickHint: 'Escolha uma despesa na fila para conferir e pagar.',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Em aprovação',
  statusRejected: 'Rejeitada'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

type Status = 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';

function formatDate(value: string | undefined | null): string {
  if (!value) return '';
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium' }).format(d);
}

function statusLabel(msg: PageMessageType, status: Status): string {
  switch (status) {
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaiting;
    case 'rejected': return msg.statusRejected;
  }
}

function statusClass(status: Status): string {
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
  private msg: PageMessageType = pageMessage_pt;

  private chip(status: Status) {
    return html`<span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(status)}">${statusLabel(this.msg, status)}</span>`;
  }

  private renderFilter() {
    return html`
      <groupsearchcontent--ml-search-bar
        class="block"
        .value=${this.categoria}
        placeholder=${this.msg['searchPlaceholder']}
        @change=${(e: CustomEvent<{ value: string | null }>) => {
          if (e.target !== e.currentTarget) return;
          this.listarDespesasAprovadas({ categoria: e.detail.value });
        }}
        @clear=${(e: Event) => {
          if (e.target !== e.currentTarget) return;
          this.listarDespesasAprovadas({ categoria: null });
        }}>
        <Label>${this.msg['searchLabel']}</Label>
        <Empty>${this.msg['searchEmpty']}</Empty>
      </groupsearchcontent--ml-search-bar>
      ${this.categoria
        ? html`<div class="mt-2">
            <button type="button"
              class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-4 text-sm text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              aria-label=${this.msg['removeFilter']}
              @click=${() => this.listarDespesasAprovadas({ categoria: null })}>
              <span>${this.msg['filterToken']}: ${this.categoria}</span><span aria-hidden="true">×</span>
            </button>
          </div>`
        : nothing}
    `;
  }

  private renderQueue() {
    const items = this.despesas?.items ?? [];
    const hasMore = this.despesas?.hasMore ?? false;
    const failed = this.pageStatus === 'error';
    return html`
      <section data-organism-id="despesasAprovadasLista" class="flex flex-col gap-3">
        ${this.renderFilter()}
        ${failed
          ? html`<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]" aria-live="polite">
              <p class="mb-3 text-sm">${this.msg['loadError']}</p>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full min-h-[44px]"
                @action=${() => this.listarDespesasAprovadas()}>
                <Label>${this.msg['retry']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : html`
            <groupviewdata--ml-vertical-record-list
              .hoverable=${true}
              .loading=${this.pageStatus === 'loading'}
              @row-click=${(e: CustomEvent<{ index: number }>) => {
                if (e.target !== e.currentTarget) return;
                const item = items[e.detail.index];
                if (!item) return;
                this.obterDespesaAprovada(item.id);
                this.setScenario('pagamento');
              }}>
              <Columns>
                <Column field="despesa" header=${this.msg['colDespesa']} />
                <Column field="valor" header=${this.msg['colValor']} align="right" />
              </Columns>
              <Rows>
                ${items.map(item => html`
                  <Row ?selected=${item.id === this.selectedDespesa}>
                    <Cell>
                      <div class="min-h-[44px] py-1">
                        <div class="font-medium text-[var(--text-strong,currentColor)]">${item.details.details.categoria}</div>
                        <div class="text-sm text-[var(--text-muted,currentColor)]">${formatDate(item.details.details.dataDespesa)}</div>
                        <div class="truncate text-xs text-[var(--text-muted,currentColor)]">${this.msg['colaborador']}: ${item.colaboradorId}</div>
                      </div>
                    </Cell>
                    <Cell>
                      <div class="flex flex-col items-end gap-1 py-1">
                        <span class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${item.details.details.valor}</span>
                        ${this.chip(item.status)}
                      </div>
                    </Cell>
                  </Row>`)}
              </Rows>
              <Loading><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['loading']}</div></Loading>
              <Empty><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['empty']}</div></Empty>
            </groupviewdata--ml-vertical-record-list>
            ${hasMore
              ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full min-h-[44px]"
                  ?loading=${this.listarDespesasAprovadasStatus === 'loading'}
                  @action=${() => this.listarDespesasAprovadas({ append: true })}>
                  <Label>${this.msg['loadMore']}</Label>
                </grouptriggeraction--ml-button-standard>`
              : nothing}`}
      </section>
    `;
  }

  private row(label: string, value: unknown) {
    return html`<div class="flex flex-col gap-0.5 py-2">
      <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
      <dd class="text-sm text-[var(--text-default,currentColor)]">${value}</dd>
    </div>`;
  }

  private renderDetail() {
    const d = this.despesa;
    const loading = this.obterDespesaAprovadaStatus === 'loading';
    if (this.obterDespesaAprovadaStatus === 'error') {
      return html`<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-live="polite">
        <p class="mb-3 text-sm text-[var(--text-default,currentColor)]">${this.msg['detailError']}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full min-h-[44px]"
          @action=${() => this.obterDespesaAprovada(this.selectedDespesa)}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    if (!d && !loading) {
      return html`<p class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['pickHint']}</p>`;
    }
    return html`
      <groupviewcard--ml-vertical-card ?loading=${loading}>
        <CardHeader>
          <CardTitle>${d ? html`<span class="text-2xl font-semibold tabular-nums">${d.details.details.valor}</span>` : nothing}</CardTitle>
          <CardDescription>${d ? d.details.details.categoria : nothing}</CardDescription>
        </CardHeader>
        <CardContent>
          ${d
            ? html`<dl class="divide-y divide-[var(--border-subtle,currentColor)]">
                ${this.row(this.msg['colaborador'], d.colaboradorId)}
                ${this.row(this.msg['dataDespesa'], formatDate(d.details.details.dataDespesa))}
                ${this.row(this.msg['descricao'], d.details.details.descricao)}
                ${this.row(this.msg['situacao'], this.chip(d.status))}
                ${d.details.details.dataPagamento ? this.row(this.msg['dataPagamento'], formatDate(d.details.details.dataPagamento)) : nothing}
              </dl>`
            : nothing}
        </CardContent>
      </groupviewcard--ml-vertical-card>
    `;
  }

  private renderForm() {
    const paid = this.registrarPagamentoStatus === 'success';
    const running = this.registrarPagamentoStatus === 'loading';
    return html`
      <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        ${paid
          ? html`<div aria-live="polite">
              <groupnotifyuser--ml-toast-notification type="success" .visible=${true} .dismissible=${false}>
                <Message>${this.msg['paidMsg']}</Message>
              </groupnotifyuser--ml-toast-notification>
            </div>`
          : html`
            <groupenterdate--ml-date-shortcut-picker
              class="block"
              .value=${this.registrarPagamentoDraft.details.dataPagamento}
              .error=${this.registrarPagamentoError?.message ?? ''}
              .locale=${document.documentElement.lang || ''}
              ?disabled=${running}
              required
              @change=${(e: CustomEvent<{ value: string | null }>) => {
                if (e.target !== e.currentTarget) return;
                this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
              }}>
              <Label>${this.msg['dataPagamento']}</Label>
              <Helper>${this.msg['dataPagamentoHelper']}</Helper>
            </groupenterdate--ml-date-shortcut-picker>`}
        ${paid
          ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full min-h-[44px]"
              @action=${() => this.setScenario('fila')}>
              <Label>${this.msg['backToQueue']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : html`<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full min-h-[44px]"
              ?loading=${running}
              ?disabled=${!this.despesa || running}
              @action=${() => this.registrarPagamento()}>
              <Label>${this.msg['registrar']}</Label>
            </grouptriggeraction--ml-button-standard>`}
      </form>
    `;
  }

  private renderPayment() {
    return html`
      <div class="flex flex-col gap-4">
        <section data-organism-id="despesaAprovadaDetalhe">${this.renderDetail()}</section>
        <section data-organism-id="registroPagamentoForm"
          class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
          ${this.renderForm()}
        </section>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'fila'}
          .backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="fila" title=${this.msg['queueTitle']}>${this.renderQueue()}</Scene>
          <Scene value="pagamento" title=${this.msg['payTitle']} nav="back" backTo="fila">${this.renderPayment()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
