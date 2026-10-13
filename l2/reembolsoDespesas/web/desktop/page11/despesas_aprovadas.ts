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
const pageMessage_pt = {
  pageTitle: 'Despesas aprovadas',
  pageSubtitle: 'Confira as despesas que aguardam pagamento e registre a data em que foram pagas.',
  queueHeading: 'Aguardando pagamento',
  searchLabel: 'Categoria',
  searchPlaceholder: 'Buscar por categoria',
  colaborador: 'Colaborador',
  dataDespesa: 'Data da despesa',
  categoria: 'Categoria',
  valor: 'Valor',
  descricao: 'Descrição',
  situacao: 'Situação',
  dataPagamento: 'Data de pagamento',
  emptyQueue: 'Nenhuma despesa aprovada aguardando pagamento.',
  emptyFiltered: 'Nenhuma despesa encontrada. Ajuste ou remova os filtros.',
  removeFilter: 'Remover filtro',
  loadMore: 'Carregar mais despesas',
  queueError: 'Não foi possível carregar a fila de despesas.',
  retry: 'Tentar novamente',
  panelHeading: 'Despesa escolhida',
  panelEmpty: 'Escolha uma despesa da fila para conferir os dados e registrar o pagamento.',
  detailLoading: 'Carregando os dados da despesa…',
  detailError: 'Não foi possível carregar os dados da despesa.',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  paymentDateLabel: 'Data em que a despesa foi paga',
  paymentDateHelper: 'Informe a data do pagamento realizado.',
  paymentDateRequired: 'Informe a data de pagamento para continuar.',
  registerPayment: 'Registrar pagamento',
  paymentSuccess: 'Pagamento registrado. A despesa agora está paga.',
  paymentFailure: 'Não foi possível registrar o pagamento. Confira os dados e tente novamente.',
  alreadyPaid: 'Esta despesa já foi paga.'
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function formatDate(v: string | undefined | null): string {
  if (!v) return '—';
  const d = new Date(v.length === 10 ? v + 'T00:00:00' : v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short' }).format(d);
}

function formatMoney(v: string | undefined | null): string {
  if (v === undefined || v === null || v === '') return '—';
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function statusLabel(m: PageMessageType, s: string): string {
  switch (s) {
    case 'draft': return m.statusDraft;
    case 'awaitingApproval': return m.statusAwaitingApproval;
    case 'rejected': return m.statusRejected;
    case 'approved': return m.statusApproved;
    case 'paid': return m.statusPaid;
    default: return '—';
  }
}

@customElement('reembolso-despesas--web--desktop--page11--despesas_aprovadas-102047')
export class ReembolsoDespesasDesktopPage11Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg: PageMessageType = pageMessage_pt;

  private renderChips() {
    const chips: Array<{ label: string; value: string; remove: () => void }> = [];
    if (this.categoria) {
      const c = this.categoria;
      chips.push({ label: this.msg['categoria'], value: c, remove: () => { void this.listarDespesasAprovadas({ categoria: null }); } });
    }
    if (this.colaboradorId) {
      const c = this.colaboradorId;
      chips.push({ label: this.msg['colaborador'], value: c, remove: () => { void this.listarDespesasAprovadas({ colaboradorId: null }); } });
    }
    if (!chips.length) return nothing;
    return html`<ul class="flex flex-wrap gap-2 mt-3">
      ${chips.map(c => html`<li>
        <button type="button" @click=${c.remove} aria-label="${this.msg['removeFilter']}: ${c.label}"
          class="inline-flex items-center gap-2 min-h-8 px-3 rounded-full text-sm border bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)] border-[var(--border-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">
          <span>${c.label}: ${c.value}</span><span aria-hidden="true">×</span>
        </button></li>`)}
    </ul>`;
  }

  private renderQueue() {
    const items = this.despesas?.items ?? [];
    const idx = items.findIndex(i => i.id === this.selectedDespesa);
    const loading = this.listarDespesasAprovadasStatus === 'loading' && !items.length;
    const filtered = !!(this.categoria || this.colaboradorId);
    return html`
      <section data-organism-id="despesasAprovadasLista" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 min-w-0">
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['queueHeading']}</h2>
        <div class="mt-3">
          <groupsearchcontent--ml-search-bar
            .value=${this.categoria}
            placeholder=${this.msg['searchPlaceholder']}
            ?loading=${this.listarDespesasAprovadasStatus === 'loading'}
            @change=${(e: CustomEvent<{ value: string | null }>) => { void this.listarDespesasAprovadas({ categoria: e.detail.value }); }}
            @clear=${() => { void this.listarDespesasAprovadas({ categoria: null }); }}>
            <Label>${this.msg['searchLabel']}</Label>
          </groupsearchcontent--ml-search-bar>
          ${this.renderChips()}
        </div>

        ${this.pageStatus === 'error' || this.listarDespesasAprovadasStatus === 'error' ? html`
          <div role="alert" aria-live="polite" class="mt-4 flex items-center justify-between gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-3 text-[var(--text-default,currentColor)]">
            <span>${this.msg['queueError']}</span>
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.listarDespesasAprovadas(); }}>
              <Label>${this.msg['retry']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}

        <div class="mt-4" aria-busy=${loading ? 'true' : 'false'}>
          <groupviewtable--ml-data-table
            .value=${idx >= 0 ? String(idx) : ''}
            ?loading=${loading}
            @change=${(e: Event) => e.stopPropagation()}
            @rowClick=${(e: CustomEvent<{ index: number }>) => {
              const row = items[e.detail.index];
              if (row) void this.obterDespesaAprovada(row.id);
            }}>
            <TableHeader>
              <TableRow>
                <TableHead key="colaborador">${this.msg['colaborador']}</TableHead>
                <TableHead key="data" sortable>${this.msg['dataDespesa']}</TableHead>
                <TableHead key="categoria" sortable>${this.msg['categoria']}</TableHead>
                <TableHead key="valor" sortable data-class="text-right">${this.msg['valor']}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              ${items.map(i => html`
                <TableRow key=${i.id}>
                  <TableCell>${i.colaboradorId}</TableCell>
                  <TableCell sort-value=${i.details.details.dataDespesa}>${formatDate(i.details.details.dataDespesa)}</TableCell>
                  <TableCell>${i.details.details.categoria}</TableCell>
                  <TableCell sort-value=${i.details.details.valor} data-class="text-right tabular-nums">${formatMoney(i.details.details.valor)}</TableCell>
                </TableRow>`)}
            </TableBody>
            <Empty>${filtered ? this.msg['emptyFiltered'] : this.msg['emptyQueue']}</Empty>
          </groupviewtable--ml-data-table>
        </div>

        ${this.despesas?.hasMore ? html`
          <div class="mt-4 flex justify-center">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
              ?loading=${this.listarDespesasAprovadasStatus === 'loading'}
              @action=${() => { void this.listarDespesasAprovadas({ append: true }); }}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}
      </section>`;
  }

  private renderDetail() {
    const d = this.despesa;
    let body;
    if (this.obterDespesaAprovadaStatus === 'loading') {
      body = html`<p class="text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg['detailLoading']}</p>`;
    } else if (this.obterDespesaAprovadaStatus === 'error') {
      body = html`<div role="alert" aria-live="polite" class="flex items-center justify-between gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-3">
        <span>${this.msg['detailError']}</span>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.obterDespesaAprovada(this.selectedDespesa); }}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    } else if (!d) {
      body = html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['panelEmpty']}</p>`;
    } else {
      const det = d.details.details;
      body = html`
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle><span class="tabular-nums">${formatMoney(det.valor)}</span></CardTitle>
            <CardDescription>${det.categoria}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colaborador']}</dt><dd class="text-[var(--text-default,currentColor)] break-all">${d.colaboradorId}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg['dataDespesa']}</dt><dd class="text-[var(--text-default,currentColor)]">${formatDate(det.dataDespesa)}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg['descricao']}</dt><dd class="text-[var(--text-default,currentColor)]">${det.descricao}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${this.msg['situacao']}</dt>
              <dd><span class="inline-block px-2 py-0.5 rounded-full text-xs bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]">${statusLabel(this.msg, d.status)}</span></dd>
              ${det.dataPagamento ? html`<dt class="text-[var(--text-muted,currentColor)]">${this.msg['dataPagamento']}</dt><dd class="text-[var(--text-default,currentColor)]">${formatDate(det.dataPagamento)}</dd>` : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>`;
    }
    return html`<div data-organism-id="despesaAprovadaDetalhe">${body}</div>`;
  }

  private renderForm() {
    const d = this.despesa;
    const running = this.registrarPagamentoStatus === 'loading';
    const err = this.registrarPagamentoError;
    const dateError = err && err.code === 'client.requiredMissing' ? this.msg['paymentDateRequired'] : '';
    const otherError = this.registrarPagamentoStatus === 'error' && !dateError;
    let body = nothing as unknown;
    if (d) {
      body = html`
        ${this.registrarPagamentoStatus === 'success' ? html`
          <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
            <Message>${this.msg['paymentSuccess']}</Message>
          </groupnotifyuser--ml-contextual-feedback>` : nothing}
        ${otherError ? html`
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
            <Message>${this.msg['paymentFailure']}</Message>
          </groupnotifyuser--ml-contextual-feedback>` : nothing}
        ${d.status === 'approved' ? html`
          <form class="flex flex-col gap-4" @submit=${(e: Event) => { e.preventDefault(); void this.registrarPagamento(); }}>
            <groupenterdate--ml-date-shortcut-picker
              locale="pt-BR"
              required
              .value=${this.registrarPagamentoDraft.details.dataPagamento}
              error=${dateError}
              ?disabled=${running}
              @change=${(e: CustomEvent<{ value: string | null }>) => this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } })}>
              <Label>${this.msg['paymentDateLabel']}</Label>
              <Helper>${this.msg['paymentDateHelper']}</Helper>
            </groupenterdate--ml-date-shortcut-picker>
            <div class="flex justify-end">
              <grouptriggeraction--ml-button-standard data-variant="primary" size="md" ?loading=${running} ?disabled=${running}
                @action=${() => { void this.registrarPagamento(); }}>
                <Label>${this.msg['registerPayment']} · ${formatMoney(d.details.details.valor)}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </form>` : html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['alreadyPaid']}</p>`}`;
    }
    return html`<div data-organism-id="registroPagamentoForm" class="flex flex-col gap-4" aria-live="polite">${body}</div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="mt-1 text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
        </header>
        <div class="grid gap-6 items-start grid-cols-[minmax(0,1.7fr)_minmax(340px,1fr)]">
          ${this.renderQueue()}
          <aside class="sticky top-6 flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-5 min-w-0">
            <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['panelHeading']}</h2>
            ${this.renderDetail()}
            ${this.renderForm()}
          </aside>
        </div>
      </div>`;
  }
}
