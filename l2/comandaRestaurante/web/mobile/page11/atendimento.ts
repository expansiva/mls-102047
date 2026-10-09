/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/atendimento.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteAtendimentoShared } from '/_102047_/l2/comandaRestaurante/web/shared/atendimento.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Atendimento', catalogTitle: 'Localizar atendimento', cartTitle: 'Comanda em atendimento',
  lookupLabel: 'Localizar item do cardápio', lookupPlaceholder: 'Digite o nome do item',
  availableTables: 'Mesas disponíveis', openTabs: 'Comandas abertas', menuItems: 'Itens do cardápio',
  tableCode: 'Mesa', tabNumber: 'Comanda', currentStatus: 'Situação', available: 'Disponível',
  open: 'Em atendimento', closed: 'Fechada', openTable: 'Abrir comanda', selectTab: 'Abrir comanda',
  noTables: 'Nenhuma mesa disponível', noTabs: 'Nenhuma comanda aberta', noItems: 'Nenhum item encontrado',
  loading: 'Carregando atendimento…', loadError: 'Não foi possível carregar o atendimento.',
  subtotal: 'Subtotal dos itens', items: 'Itens lançados', item: 'Item', quantity: 'Quantidade',
  unitPrice: 'Preço unitário registrado', lineTotal: 'Valor total do item', observation: 'Observação',
  canceled: 'Cancelado', launched: 'Lançado', cancel: 'Cancelar item', cancelConfirm: 'Cancelar este item?',
  launchItem: 'Lançar item', chooseItem: 'Escolha um item', quantityHelper: 'Informe a quantidade',
  observationPlaceholder: 'Opcional: orientação para o preparo', back: 'Voltar ao catálogo',
  successOpen: 'Comanda aberta.', successLaunch: 'Item lançado na comanda.', successCancel: 'Item cancelado.',
  actionError: 'Não foi possível concluir a ação.', selectTableFirst: 'Escolha uma mesa disponível para abrir a comanda.',
  selectTabFirst: 'Escolha uma comanda aberta para continuar.', emptyComanda: 'Selecione ou abra uma comanda para começar.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const money = (value: string) => new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency: 'BRL' }).format(Number(value));

@customElement('comanda-restaurante--web--mobile--page11--atendimento-102047')
export class ComandaRestauranteMobilePage11AtendimentoPage extends ComandaRestauranteAtendimentoShared {
  private msg = pageMessage_pt;

  private errorText(error: { message: string } | null, fallback: string) { return error?.message || fallback; }

  private renderFeedback() {
    const error = this.lancarItemError || this.abrirComandaError || this.cancelarItemError || this.carregarAtendimentoError || this.atualizarLocalizacaoAtendimentoError || this.obterComandaAtendimentoError;
    const success = this.lancarItemStatus === 'success' || this.abrirComandaStatus === 'success' || this.cancelarItemStatus === 'success';
    return html`
      <groupnotifyuser--ml-contextual-feedback type="${error ? 'error' : 'success'}" .visible=${Boolean(error || success)} dismissible="false">
        <Message>${error ? this.errorText(error, this.msg.actionError) : this.abrirComandaStatus === 'success' ? this.msg.successOpen : this.lancarItemStatus === 'success' ? this.msg.successLaunch : this.msg.successCancel}</Message>
      </groupnotifyuser--ml-contextual-feedback>`;
  }

  private renderLookup() {
    const context = this.contextoAtendimento;
    return html`<section data-organism-id="lookupAtendimento" class="space-y-4">
      <groupsearchcontent--ml-search-bar .value=${this.itemTermo} placeholder="${this.msg.lookupPlaceholder}" .loading=${this.atualizarLocalizacaoAtendimentoStatus === 'loading'} @search=${(e: CustomEvent<{ query: string }>) => this.atualizarLocalizacaoAtendimento(null, null, e.detail.query || null, 1, 20)}>
        <Label>${this.msg.lookupLabel}</Label><Empty>${this.msg.noItems}</Empty>
      </groupsearchcontent--ml-search-bar>
      <div class="space-y-2"><h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.availableTables}</h2>
        <groupviewdata--ml-vertical-record-list .loading=${!context && this.pageStatus === 'loading'}>
          <Columns><Column field="code" header="${this.msg.tableCode}"></Column><Column field="action" header="${this.msg.openTable}"></Column></Columns><Rows>
            ${(context?.mesasDisponiveis.items || []).map(mesa => html`<Row ?disabled=${!mesa.details.disponivel} @click=${(e: Event) => e.stopPropagation()}><Cell>${mesa.code}</Cell><Cell><grouptriggeraction--ml-button-standard data-variant="primary" size="md" .disabled=${!mesa.details.disponivel || this.abrirComandaStatus === 'loading'} @action=${() => this.abrirComanda(mesa.id)}><Label>${this.msg.openTable}</Label></grouptriggeraction--ml-button-standard></Cell></Row>`)}
          </Rows><Empty>${this.msg.noTables}</Empty><Loading>${this.msg.loading}</Loading>
        </groupviewdata--ml-vertical-record-list></div>
      <div class="space-y-2"><h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.openTabs}</h2>
        <groupviewdata--ml-vertical-record-list @row-click=${(e: CustomEvent<{ index: number }>) => { const row = context?.comandasAbertas.items[e.detail.index]; if (row) { this.selectComanda(row.id); this.setScenario('comanda'); } }}>
          <Columns><Column field="number" header="${this.msg.tabNumber}"></Column><Column field="mesa" header="${this.msg.tableCode}"></Column></Columns><Rows>
            ${(context?.comandasAbertas.items || []).map(row => html`<Row ?selected=${row.id === this.selectedComanda}><Cell>${row.number}</Cell><Cell>${row.mesa.code}</Cell></Row>`)}
          </Rows><Empty>${this.msg.noTabs}</Empty>
        </groupviewdata--ml-vertical-record-list></div>
    </section>`;
  }

  private renderComanda() {
    const c = this.comanda;
    const draft = this.lancarItemDraft;
    return html`<div class="space-y-5 pb-24">
      <section data-organism-id="detalheComanda" class="space-y-3">
        ${c ? html`<div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4"><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.tabNumber} ${c.number} · ${this.msg.tableCode} ${c.mesa.code}</p>
          <groupviewmetric--ml-metric-big-number><Label>${this.msg.subtotal}</Label><Value>${money(c.details.subtotal)}</Value></groupviewmetric--ml-metric-big-number></div>
          <groupviewtable--ml-responsive-table>
            <TableCaption>${this.msg.items}</TableCaption><TableHeader><TableRow><TableHead key="item">${this.msg.item}</TableHead><TableHead key="quantity">${this.msg.quantity}</TableHead><TableHead key="total">${this.msg.lineTotal}</TableHead></TableRow></TableHeader><TableBody>
              ${c.itens.map(item => html`<TableRow><TableCell>${item.itemCardapio.name}<div class="text-xs text-[var(--text-muted,currentColor)]">${item.status === 'canceled' ? this.msg.canceled : this.msg.launched}${item.details.observacao ? ` · ${item.details.observacao}` : ''}</div></TableCell><TableCell>${item.details.quantidade}</TableCell><TableCell>${money(item.details.valorTotal)} ${item.status === 'launched' ? html`<grouptriggeraction--ml-button-standard data-variant="danger" size="sm" .disabled=${this.cancelarItemStatus === 'loading'} @action=${() => { if (window.confirm(this.msg.cancelConfirm)) this.cancelarItem(item.id, item.version); }}><Label>${this.msg.cancel}</Label></grouptriggeraction--ml-button-standard>` : ''}</TableCell></TableRow>`)}
            </TableBody><Empty>${this.msg.emptyComanda}</Empty></groupviewtable--ml-responsive-table>` : html`<p class="text-[var(--text-muted,currentColor)]">${this.msg.emptyComanda}</p>`}
      </section>
      <section data-organism-id="formularioLancamento" class="space-y-4 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4">
        <groupselectone--ml-combobox .value=${draft.itemCardapioId} .loading=${this.atualizarLocalizacaoAtendimentoStatus === 'loading'} placeholder="${this.msg.chooseItem}" @change=${(e: CustomEvent<{ value: string | null }>) => this.setLancarItemDraft({ ...draft, itemCardapioId: e.detail.value })}><Label>${this.msg.item}</Label>${(this.contextoAtendimento?.itensCardapio.items || []).map(item => html`<Item value="${item.id}">${item.name} · ${money(item.details.precoVigente)}</Item>`)}<Empty>${this.msg.noItems}</Empty></groupselectone--ml-combobox>
        <groupenternumber--ml-number-stepper .value=${draft.details.quantidade} min="1" step="1" required locale="pt-BR" @change=${(e: CustomEvent<{ value: number | null }>) => this.setLancarItemDraft({ ...draft, details: { ...draft.details, quantidade: e.detail.value } })}><Label>${this.msg.quantity}</Label><Helper>${this.msg.quantityHelper}</Helper></groupenternumber--ml-number-stepper>
        <groupentertext--ml-multiline-text .value=${draft.details.observacao || ''} rows="3" placeholder="${this.msg.observationPlaceholder}" @change=${(e: CustomEvent<{ value: string }>) => this.setLancarItemDraft({ ...draft, details: { ...draft.details, observacao: e.detail.value || null } })}><Label>${this.msg.observation}</Label></groupentertext--ml-multiline-text>
      </section>
      <section data-organism-id="acoesAtendimento" class="space-y-3">${this.renderFeedback()}<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full" .disabled=${!c || this.lancarItemStatus === 'loading'} .loading=${this.lancarItemStatus === 'loading'} @action=${() => this.lancarItem()}><Label>${this.msg.launchItem}</Label></grouptriggeraction--ml-button-standard></section>
      <div class="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3"><button type="button" class="min-h-11 w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 py-2 text-left text-[var(--button-primary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.setScenario('catalogo')}><span class="block text-xs">${this.msg.back}</span><strong class="text-xl">${c ? money(c.details.subtotal) : '—'}</strong></button></div>
    </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]"><p class="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.pageTitle}</p><molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'catalogo'} backLabel="${this.msg.back}" @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}><Scene value="catalogo" title="${this.msg.catalogTitle}">${this.renderLookup()}</Scene><Scene value="comanda" title="${this.msg.cartTitle}" nav="back" backTo="catalogo">${this.renderComanda()}</Scene></molecules--ml-scenary-102020></main>`;
  }
}
