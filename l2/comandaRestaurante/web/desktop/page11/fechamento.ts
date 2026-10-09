/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/fechamento.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteFechamentoShared } from '/_102047_/l2/comandaRestaurante/web/shared/fechamento.js';
import type { ComandaAbertaResumo, ItemComandaParaFechamento } from '/_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Fechamento de comanda', locateTitle: 'Localizar comanda aberta', reviewTitle: 'Conferência da cobrança', paymentTitle: 'Pagamento e fechamento',
numberLabel: 'Número da comanda', tableLabel: 'Mesa', numberPlaceholder: 'Digite o número', tablePlaceholder: 'Digite o código da mesa', searchHelper: 'Busque por número ou mesa.',
listNumber: 'Comanda', listTable: 'Mesa', listStatus: 'Situação', open: 'Aberta', closed: 'Fechada', emptyComandas: 'Nenhuma comanda aberta encontrada.', loading: 'Carregando comandas…', loadMore: 'Carregar mais comandas',
selectedComanda: 'Comanda selecionada', itemsTitle: 'Itens da comanda', itemName: 'Item', quantity: 'Quantidade', unitPrice: 'Preço unitário', itemTotal: 'Valor total', note: 'Observação', canceled: 'Cancelado',
subtotal: 'Subtotal dos itens', discount: 'Desconto', total: 'Total da comanda', tableAvailable: 'Mesa disponível após o fechamento', yes: 'Sim', no: 'Não',
discountLabel: 'Desconto opcional', discountHelper: 'O desconto não pode exceder o subtotal.', paymentMethod: 'Forma de pagamento', paymentHelper: 'Escolha como a comanda foi quitada.', cash: 'Dinheiro', debitCard: 'Cartão de débito', creditCard: 'Cartão de crédito', pix: 'Pix',
closeAction: 'Fechar comanda paga', closing: 'Fechando comanda…', closeSuccess: 'Comanda fechada. A mesa foi liberada para um novo atendimento.', closeError: 'Não foi possível fechar a comanda.', searchError: 'Não foi possível localizar as comandas.', reviewError: 'Não foi possível carregar a comanda selecionada.', noSelection: 'Selecione uma comanda para conferir a cobrança.',
invalidNumber: 'Informe um número válido.', selectedStatus: 'Situação da comanda', statusOpen: 'Aberta', statusClosed: 'Fechada'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const money = (value: string | number | null | undefined) => {
const amount = typeof value === 'number' ? value : Number(value ?? 0);
return new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency: 'BRL' }).format(amount);
};
const dateLocale = () => document.documentElement.lang || undefined;
@customElement('comanda-restaurante--web--desktop--page11--fechamento-102047')
export class ComandaRestauranteDesktopPage11FechamentoPage extends ComandaRestauranteFechamentoShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const loading = this.pageStatus === 'loading' || this.carregarFechamentoStatus === 'loading';
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-8" aria-busy=${loading}>
<div class="mx-auto max-w-[1500px]">
<p class="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted,currentColor)]">${this.msg.pageTitle}</p>
<div class="grid grid-cols-[minmax(360px,0.85fr)_minmax(620px,1.5fr)] gap-6 items-start">
${this.renderLocate(loading)}
${this.renderReview()}
</div>
</div>
</main>`;
}
private renderLocate(loading: boolean) {
const rows = this.openComandas?.items ?? [];
const listLoading = loading || this.buscarComandasAbertasStatus === 'loading';
return html`
<section data-organism-id="openComandaList" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 shadow-sm">
<h1 class="text-xl font-bold text-[var(--text-strong,currentColor)]">${this.msg.locateTitle}</h1>
<div class="mt-5 grid grid-cols-2 gap-3">
<groupsearchcontent--ml-search-bar .value=${null} .loading=${this.buscarComandasAbertasStatus === 'loading'} placeholder=${this.msg.numberPlaceholder} name="number" @search=${(e: CustomEvent<{query: string}>) => this.searchNumber(e.detail.query)}>
<Label>${this.msg.numberLabel}</Label><Helper>${this.msg.searchHelper}</Helper>
</groupsearchcontent--ml-search-bar>
<groupsearchcontent--ml-search-bar .value=${null} .loading=${this.buscarComandasAbertasStatus === 'loading'} placeholder=${this.msg.tablePlaceholder} name="mesaCode" @search=${(e: CustomEvent<{query: string}>) => this.searchTable(e.detail.query)}>
<Label>${this.msg.tableLabel}</Label>
</groupsearchcontent--ml-search-bar>
</div>
<div class="mt-6" data-organism-id="openComandaList">
<groupviewdata--ml-vertical-record-list .loading=${listLoading} .hoverable=${true} @row-click=${(e: CustomEvent<{index: number}>) => this.selectRow(e.detail.index)}>
<Columns><Column field="number" header=${this.msg.listNumber}></Column><Column field="mesa" header=${this.msg.listTable}></Column><Column field="status" header=${this.msg.listStatus}></Column></Columns>
<Rows>${rows.map((row: ComandaAbertaResumo) => html`<Row ?selected=${row.id === this.selectedComanda}><Cell>${row.number}</Cell><Cell>${row.mesa.code}</Cell><Cell>${row.status === 'open' ? this.msg.open : this.msg.closed}</Cell></Row>`)}</Rows>
<Loading><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.loading}</div></Loading>
<Empty><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.emptyComandas}</div></Empty>
</groupviewdata--ml-vertical-record-list>
</div>
${this.openComandas && rows.length > 0 ? html`<button type="button" class="mt-4 min-h-11 rounded-lg border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 py-2 font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" ?disabled=${this.carregarMaisComandasAbertasStatus === 'loading'} @click=${() => this.carregarMaisComandasAbertas()}>${this.msg.loadMore}</button>` : ''}
${this.buscarComandasAbertasError ? html`<groupnotifyuser--ml-contextual-feedback visible type="error"><Title>${this.msg.searchError}</Title><Message>${this.buscarComandasAbertasError.message}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
</section>`;
}
private renderReview() {
const comanda = this.comanda;
if (!comanda) return html`<section data-organism-id="comandaReview" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-10"><p class="text-[var(--text-muted,currentColor)]">${this.msg.noSelection}</p></section>`;
const validItems = comanda.items.filter((item: ItemComandaParaFechamento) => item.status === 'launched');
const closing = this.fecharComandaPagaStatus === 'loading';
return html`
<section class="space-y-6">
<div data-organism-id="comandaReview" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 shadow-sm">
<div class="flex items-start justify-between gap-6"><div><h2 class="text-xl font-bold text-[var(--text-strong,currentColor)]">${this.msg.reviewTitle}</h2><p class="mt-1 text-[var(--text-muted,currentColor)]">${this.msg.selectedComanda} ${comanda.number} · ${this.msg.tableLabel} ${comanda.mesa ? (comanda.mesa.disponivel ? this.msg.yes : this.msg.no) : ''}</p></div><groupviewmetric--ml-metric-big-number><Label>${this.msg.total}</Label><Value>${money(comanda.details.totalComanda)}</Value></groupviewmetric--ml-metric-big-number></div>
<div class="mt-6"><groupviewtable--ml-data-table><TableCaption>${this.msg.itemsTitle}</TableCaption><TableHeader><TableRow><TableHead key="item">${this.msg.itemName}</TableHead><TableHead key="quantity">${this.msg.quantity}</TableHead><TableHead key="unit">${this.msg.unitPrice}</TableHead><TableHead key="total">${this.msg.itemTotal}</TableHead></TableRow></TableHeader><TableBody>${validItems.map((item: ItemComandaParaFechamento) => html`<TableRow><TableCell>${item.itemCardapio.name}</TableCell><TableCell>${item.details.details.quantidade}</TableCell><TableCell>${money(item.details.details.precoUnitario)}</TableCell><TableCell>${money(item.details.valorTotal)}</TableCell></TableRow>`)}</TableBody><Empty>${this.msg.noSelection}</Empty></groupviewtable--ml-data-table></div>
<dl class="mt-6 ml-auto max-w-sm space-y-2 border-t border-[var(--border-subtle,currentColor)] pt-4"><div class="flex justify-between"><dt>${this.msg.subtotal}</dt><dd>${money(comanda.details.subtotal)}</dd></div><div class="flex justify-between"><dt>${this.msg.discount}</dt><dd>${money(comanda.details.details.discountAmount)}</dd></div><div class="flex justify-between text-lg font-bold"><dt>${this.msg.total}</dt><dd>${money(comanda.details.totalComanda)}</dd></div></dl>
</div>
${this.renderPayment(comanda, closing)}
</section>`;
}
private renderPayment(comanda: NonNullable<ComandaRestauranteFechamentoShared['comanda']>, closing: boolean) {
const draft = this.fecharComandaPagaInput;
const paymentError = this.fecharComandaPagaError;
return html`<section data-organism-id="paymentForm" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-6"><h2 class="text-lg font-bold text-[var(--text-strong,currentColor)]">${this.msg.paymentTitle}</h2><div class="mt-5 grid grid-cols-2 gap-6"><groupentermoney--ml-enter-money-br name="discountAmount" .value=${draft.discountAmount === null ? null : Number(draft.discountAmount)} .max=${Number(comanda.details.subtotal)} currency="BRL" locale="pt-BR" @input=${(e: CustomEvent<{value: number | null}>) => this.updateDraft(e.detail.value, draft.paymentMethod)}><Label>${this.msg.discountLabel}</Label><Helper>${this.msg.discountHelper}</Helper></groupentermoney--ml-enter-money-br><groupselectone--ml-radio-group variant="radio" name="paymentMethod" .value=${draft.paymentMethod} required @change=${(e: CustomEvent<{value: string | null}>) => this.updateDraft(draft.discountAmount === null ? null : Number(draft.discountAmount), this.paymentValue(e.detail.value))}><Label>${this.msg.paymentMethod}</Label><Item value="cash">${this.msg.cash}</Item><Item value="debitCard">${this.msg.debitCard}</Item><Item value="creditCard">${this.msg.creditCard}</Item><Item value="pix">${this.msg.pix}</Item><Helper>${this.msg.paymentHelper}</Helper></groupselectone--ml-radio-group></div><div data-organism-id="closeComandaActions" class="mt-6"><grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .disabled=${!draft.paymentMethod || closing} .loading=${closing} @action=${() => this.fecharComandaPaga()}><Label>${closing ? this.msg.closing : this.msg.closeAction}</Label></grouptriggeraction--ml-button-standard></div>${paymentError ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" visible type="error"><Title>${this.msg.closeError}</Title><Message>${paymentError.message}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}${this.fecharComandaPagaStatus === 'success' ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" visible type="success"><Title>${this.msg.closeSuccess}</Title><Message>${this.msg.tableAvailable}: ${this.msg.yes}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}</section>`;
}
private searchNumber(query: string) { const number = Number(query.trim()); this.buscarComandasAbertas(query.trim() === '' || Number.isNaN(number) ? null : number, null); }
private searchTable(query: string) { this.buscarComandasAbertas(null, query.trim() || null); }
private selectRow(index: number) { const row = this.openComandas?.items[index]; if (row) this.selectComandaReview(row.id); }
private updateDraft(discountAmount: number | null, paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' | null) { this.setFecharComandaPaga({ discountAmount: discountAmount === null ? null : String(discountAmount), paymentMethod }); }
private paymentValue(value: string | null): 'cash' | 'debitCard' | 'creditCard' | 'pix' | null { return value === 'cash' || value === 'debitCard' || value === 'creditCard' || value === 'pix' ? value : null; }
}
