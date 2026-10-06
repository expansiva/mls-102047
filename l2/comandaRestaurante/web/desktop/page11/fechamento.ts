/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/fechamento.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteFechamentoShared, FecharComandaPagaDraft } from '/_102047_/l2/comandaRestaurante/web/shared/fechamento.js';

import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-listbox-sidebar-select.js';
import '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Fechamento de comanda',
  locateTitle: 'Localizar comanda aberta',
  searchLabel: 'Número ou mesa',
  searchPlaceholder: 'Digite o número da comanda ou o código da mesa',
  listNumber: 'Número da comanda',
  listTable: 'Mesa',
  listStatus: 'Situação',
  openStatus: 'Em atendimento',
  closedStatus: 'Fechada',
  listTotal: 'Total da comanda',
  emptyOpen: 'Nenhuma comanda aberta encontrada.',
  loadingOpen: 'Carregando comandas abertas…',
  loadMore: 'Carregar mais comandas',
  reviewTitle: 'Conferir comanda',
  noSelection: 'Selecione uma comanda aberta para conferir os itens e receber o pagamento.',
  loadingReview: 'Carregando dados da comanda…',
  reviewError: 'Não foi possível carregar esta comanda.',
  commandNumber: 'Comanda',
  reviewItem: 'Item do cardápio',
  reviewQuantity: 'Quantidade',
  reviewUnit: 'Preço unitário registrado',
  reviewLineTotal: 'Valor total do item',
  reviewObservation: 'Observação',
  reviewStatus: 'Situação',
  launched: 'Lançado',
  canceled: 'Cancelado',
  emptyItems: 'Nenhum item para exibir.',
  subtotal: 'Subtotal dos itens',
  total: 'Total da comanda',
  mesaAvailable: 'Mesa disponível',
  mesaOccupied: 'Mesa vinculada à comanda',
  settleTitle: 'Receber e fechar',
  discount: 'Desconto',
  discountPlaceholder: '0,00',
  discountHelper: 'Opcional. Não pode exceder o subtotal.',
  paymentMethod: 'Forma de pagamento',
  cash: 'Dinheiro',
  debitCard: 'Cartão de débito',
  creditCard: 'Cartão de crédito',
  pix: 'Pix',
  paymentRequired: 'Escolha uma forma de pagamento para fechar a comanda.',
  closeAction: 'Registrar pagamento e fechar comanda',
  closing: 'Fechando comanda…',
  closeError: 'Não foi possível fechar a comanda. Confira os dados e tente novamente.',
  closeSuccess: 'Comanda fechada. A mesa foi liberada para um novo atendimento.',
  genericError: 'Não foi possível carregar as comandas.',
  retry: 'Tentar novamente'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const money = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === '') return '—';
  const amount = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(amount) ? new Intl.NumberFormat(document.documentElement.lang || 'pt-BR', { style: 'currency', currency: 'BRL' }).format(amount) : String(value);
};
const draftNumber = (value: string | null) => {
  if (!value) return null;
  const normalized = value.replace(/\./g, '').replace(',', '.');
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
};

@customElement('comanda-restaurante--web--desktop--page11--fechamento-102047')
export class ComandaRestauranteDesktopPage11FechamentoPage extends ComandaRestauranteFechamentoShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.pageStatus === 'loading' || this.carregarFechamentoStatus === 'loading';
    const selected = this.comanda;
    const commandError = this.obterComandaParaFechamentoError?.message || '';
    const closeError = this.fecharComandaPagaError?.message || '';
    const listError = this.carregarFechamentoError?.message || this.buscarComandasAbertasError?.message || '';
    return html`
      <main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6">
        <div class="mx-auto max-w-[1500px]">
          <div class="mb-5 flex items-end justify-between gap-6">
            <div>
              <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageTitle}</p>
              <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.locateTitle} · ${this.msg.reviewTitle}</p>
            </div>
            ${this.renderPageError(listError)}
          </div>
          <div class="grid grid-cols-[minmax(360px,0.82fr)_minmax(620px,1.55fr)] gap-6 items-start">
            <section data-organism-id="openComandaList" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 shadow-sm">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.locateTitle}</h2>
                <span class="rounded-full bg-[var(--status-info-bg,transparent)] px-3 py-1 text-xs text-[var(--status-info-text,currentColor)]">${this.msg.openStatus}</span>
              </div>
              <groupsearchcontent--ml-search-bar
                .value=${this.number !== null ? String(this.number) : this.mesaCode}
                .loading=${this.buscarComandasAbertasStatus === 'loading'}
                placeholder=${this.msg.searchPlaceholder}
                @search=${(e: CustomEvent<{ query: string }>) => this.search(e.detail.query)}
                @change=${(e: CustomEvent<{ value: string | null }>) => this.search(e.detail.value || '')}>
                <Label>${this.msg.searchLabel}</Label>
              </groupsearchcontent--ml-search-bar>
              <div class="mt-4" data-organism-id="openComandaList">
                <groupviewdata--ml-vertical-record-list
                  .selectable=${true}
                  .loading=${loading}
                  .hoverable=${true}
                  @row-click=${(e: CustomEvent<{ index: number }>) => this.pick(e.detail.index)}>
                  <Columns>
                    <Column field="number" header=${this.msg.listNumber}></Column>
                    <Column field="mesa" header=${this.msg.listTable}></Column>
                    <Column field="total" header=${this.msg.listTotal} align="right"></Column>
                  </Columns>
                  <Rows>
                    ${(this.openComandas?.items || []).map((row) => html`<Row .selected=${this.selectedComanda === row.id}>
                      <Cell>${row.number}</Cell><Cell>${row.mesa.code}</Cell><Cell>${money(row.details.totalComanda)}</Cell>
                    </Row>`)}
                  </Rows>
                  <Loading>${this.msg.loadingOpen}</Loading>
                  <Empty>${this.msg.emptyOpen}</Empty>
                </groupviewdata--ml-vertical-record-list>
                <grouptriggeraction--ml-button-standard
                  data-variant="secondary" data-class="mt-4 w-full"
                  .disabled=${this.carregarMaisComandasAbertasStatus === 'loading'}
                  .loading=${this.carregarMaisComandasAbertasStatus === 'loading'}
                  @action=${() => this.carregarMaisComandasAbertas()}>
                  <Label>${this.msg.loadMore}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
            </section>

            <section data-organism-id="comandaReview" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 shadow-sm">
              ${selected ? this.renderReview(selected, commandError, closeError) : html`
                <div class="flex min-h-[520px] items-center justify-center text-center">
                  <p class="max-w-sm text-[var(--text-muted,currentColor)]">${loading ? this.msg.loadingReview : this.msg.noSelection}</p>
                </div>`}
            </section>
          </div>
        </div>
      </main>`;
  }

  private renderReview(command: NonNullable<typeof this.comanda>, commandError: string, closeError: string) {
    const draft = this.fecharComandaPagaDraft;
    const busy = this.fecharComandaPagaStatus === 'loading';
    return html`
      <div class="flex items-start justify-between gap-5 border-b border-[var(--border-subtle,currentColor)] pb-5">
        <div>
          <h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.commandNumber} ${command.number}</h2>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${command.mesa.disponivel ? this.msg.mesaAvailable : this.msg.mesaOccupied}</p>
        </div>
        <groupviewmetric--ml-metric-card data-class="min-w-[230px]">
          <Label>${this.msg.total}</Label><Value>${money(command.details.totalComanda)}</Value>
        </groupviewmetric--ml-metric-card>
      </div>
      ${commandError ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" .visible=${true}><Message>${commandError || this.msg.reviewError}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
      <div class="mt-5" >
        <groupviewtable--ml-data-table .loading=${this.obterComandaParaFechamentoStatus === 'loading'}>
          <Caption>${this.msg.reviewTitle}</Caption>
          <TableHeader><TableRow><TableHead key="item">${this.msg.reviewItem}</TableHead><TableHead key="quantity">${this.msg.reviewQuantity}</TableHead><TableHead key="unit">${this.msg.reviewUnit}</TableHead><TableHead key="total">${this.msg.reviewLineTotal}</TableHead></TableRow></TableHeader>
          <TableBody>${command.items.map((item) => html`<TableRow><TableCell><div>${item.itemCardapio.name}</div>${item.details.details.observacao ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${item.details.details.observacao}</div>` : ''}</TableCell><TableCell>${item.details.details.quantidade}</TableCell><TableCell>${money(item.details.details.precoUnitario)}</TableCell><TableCell>${money(item.details.valorTotal)}</TableCell></TableRow>`)}</TableBody>
          <Empty>${this.msg.emptyItems}</Empty>
        </groupviewtable--ml-data-table>
      </div>
      <div class="mt-5 grid grid-cols-2 gap-4">
        <groupviewmetric--ml-metric-card><Label>${this.msg.subtotal}</Label><Value>${money(command.details.subtotal)}</Value></groupviewmetric--ml-metric-card>
        <groupviewmetric--ml-metric-big-number><Label>${this.msg.total}</Label><Value>${money(command.details.totalComanda)}</Value></groupviewmetric--ml-metric-big-number>
      </div>
      <div data-organism-id="paymentForm" class="mt-6 border-t border-[var(--border-subtle,currentColor)] pt-6">
        <h3 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.settleTitle}</h3>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <groupentermoney--ml-enter-money-br
            .value=${draftNumber(draft.details.discountAmount)} currency="BRL" locale="pt-BR" .max=${Number(command.details.subtotal)} placeholder=${this.msg.discountPlaceholder} @change=${(e: CustomEvent<{ value: number | null }>) => this.setDraft({ ...draft, details: { ...draft.details, discountAmount: e.detail.value === null ? null : String(e.detail.value) } })}>
            <Label>${this.msg.discount}</Label><Helper>${this.msg.discountHelper}</Helper>
          </groupentermoney--ml-enter-money-br>
          <groupselectone--ml-radio-group variant="radio" .value=${draft.details.paymentMethod} required @change=${(e: CustomEvent<{ value: string | null }>) => this.setDraft({ ...draft, details: { ...draft.details, paymentMethod: this.paymentMethod(e.detail.value) } })}>
            <Label>${this.msg.paymentMethod}</Label><Item value="cash">${this.msg.cash}</Item><Item value="debitCard">${this.msg.debitCard}</Item><Item value="creditCard">${this.msg.creditCard}</Item><Item value="pix">${this.msg.pix}</Item>
          </groupselectone--ml-radio-group>
        </div>
        ${closeError ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" .visible=${true}><Message>${closeError}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
        <div data-organism-id="closeComandaActions" class="mt-5 flex items-center justify-end gap-4">
          <grouptriggeraction--ml-button-standard size="lg" .disabled=${busy || !draft.details.paymentMethod} .loading=${busy} @action=${() => this.fecharComandaPaga()}>
            <Label>${busy ? this.msg.closing : this.msg.closeAction}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
        <groupnotifyuser--ml-contextual-feedback class="mt-4" type="success" .visible=${this.fecharComandaPagaStatus === 'success'}><Message>${this.msg.closeSuccess}</Message></groupnotifyuser--ml-contextual-feedback>
      </div>`;
  }

  private search(value: string) {
    const trimmed = value.trim();
    const number = trimmed && /^\d+$/.test(trimmed) ? Number(trimmed) : null;
    this.buscarComandasAbertas(number, number === null && trimmed ? trimmed : null);
  }

  private pick(index: number) {
    const row = this.openComandas?.items[index];
    if (row) this.selectComandaReview(row.id);
  }

  private setDraft(value: FecharComandaPagaDraft) { this.setFecharComandaPaga(value); }

  private paymentMethod(value: string | null): FecharComandaPagaDraft['details']['paymentMethod'] {
    return value === 'cash' || value === 'debitCard' || value === 'creditCard' || value === 'pix' ? value : null;
  }

  private renderPageError(message: string) {
    return message ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}><Message>${message || this.msg.genericError}</Message><Action><button type="button" class="min-h-11 rounded-md px-3 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.carregarFechamento()}>${this.msg.retry}</button></Action></groupnotifyuser--ml-contextual-feedback>` : '';
  }
}
