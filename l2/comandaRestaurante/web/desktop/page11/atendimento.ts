/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/atendimento.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteAtendimentoShared } from '/_102047_/l2/comandaRestaurante/web/shared/atendimento.js';

import '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-card-grid.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Atendimento',
  locateTitle: 'Localizar atendimento',
  locateIntro: 'Encontre a mesa, a comanda ou o item do cardápio para continuar.',
  mesas: 'Mesas disponíveis',
  comandas: 'Comandas abertas',
  cardapio: 'Cardápio',
  mesaCode: 'Mesa',
  comandaNumber: 'Número da comanda',
  itemName: 'Item do cardápio',
  searchMesa: 'Buscar por código da mesa',
  searchComanda: 'Buscar pelo número da comanda',
  searchItem: 'Buscar item do cardápio',
  searchPlaceholder: 'Digite para buscar',
  openMesa: 'Abrir comanda',
  openTitle: 'Abrir nova comanda para esta mesa',
  emptyMesas: 'Nenhuma mesa disponível encontrada.',
  emptyComandas: 'Nenhuma comanda aberta encontrada.',
  emptyItens: 'Nenhum item do cardápio encontrado.',
  loading: 'Carregando atendimento…',
  retry: 'Tentar novamente',
  selectedContext: 'Comanda em atendimento',
  comanda: 'Comanda',
  situation: 'Situação',
  open: 'Em atendimento',
  closed: 'Fechada',
  subtotal: 'Subtotal dos itens',
  lines: 'Itens lançados',
  item: 'Item',
  quantity: 'Quantidade',
  unitPrice: 'Preço unitário registrado',
  lineTotal: 'Valor total do item',
  observation: 'Observação',
  canceled: 'Cancelado',
  launched: 'Lançado',
  cancel: 'Cancelar item',
  launchTitle: 'Informar pedido',
  chooseItem: 'Item do cardápio',
  chooseItemPlaceholder: 'Selecione um item',
  quantityLabel: 'Quantidade',
  observationLabel: 'Observação para o preparo',
  observationPlaceholder: 'Ex.: sem cebola',
  launch: 'Lançar item',
  noComanda: 'Selecione uma comanda aberta para lançar itens ou corrigir lançamentos.',
  noItems: 'Ainda não há itens lançados nesta comanda.',
  errorTitle: 'Não foi possível concluir',
  successTitle: 'Atendimento atualizado',
  opening: 'Abrindo comanda…',
  launching: 'Lançando item…',
  canceling: 'Cancelando item…',
  requiredItem: 'Escolha um item do cardápio.',
  chooseComanda: 'Escolha uma comanda aberta.',
  unavailableAction: 'A ação está disponível somente para uma comanda em atendimento.',
  retryLookup: 'Recarregar localização'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const money = (value: string) => new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency: 'BRL' }).format(Number(value));
const errorText = (error: { message: string } | null) => error?.message || '';

@customElement('comanda-restaurante--web--desktop--page11--atendimento-102047')
export class ComandaRestauranteDesktopPage11AtendimentoPage extends ComandaRestauranteAtendimentoShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const context = this.contextoAtendimento;
    const selected = this.comanda;
    const busy = this.pageStatus === 'loading' || this.carregarAtendimentoStatus === 'loading';
    return html`
      <main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6" aria-busy=${busy}>
        <div class="mx-auto max-w-[1600px]">
          <div class="mb-5 flex items-end justify-between gap-6">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted,currentColor)]">${this.msg.pageTitle}</p>
              <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.locateIntro}</p>
            </div>
            ${busy ? html`<span class="text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loading}</span>` : nothing}
          </div>
          ${this.lookup(context)}
          <div class="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(380px,0.72fr)] gap-6 items-start">
            <section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5" data-organism-id="formularioLancamento">
              ${this.launchForm(selected)}
            </section>
            <section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5" data-organism-id="detalheComanda">
              ${this.detail(selected)}
            </section>
          </div>
        </div>
      </main>`;
  }

  private lookup(context: typeof this.contextoAtendimento) {
    return html`<section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5" data-organism-id="lookupAtendimento">
      <h1 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.locateTitle}</h1>
      <groupnavigatesection--ml-navigate-pills value="mesas" data-class="mt-4 w-full">
        <Label>${this.msg.locateTitle}</Label>
        <Tab value="mesas" title=${this.msg.mesas}>${this.mesas(context)}</Tab>
        <Tab value="comandas" title=${this.msg.comandas}>${this.comandas(context)}</Tab>
        <Tab value="itens" title=${this.msg.cardapio}>${this.itens(context)}</Tab>
      </groupnavigatesection--ml-navigate-pills>
      ${this.lookupError()}
    </section>`;
  }

  private mesas(context: typeof this.contextoAtendimento) {
    const rows = context?.mesasDisponiveis.items || [];
    return html`<div class="mt-4 space-y-4">
      <groupsearchcontent--ml-search-bar .value=${this.mesaTermo} placeholder=${this.msg.searchPlaceholder} loading=${this.atualizarLocalizacaoAtendimentoStatus === 'loading'} @search=${(e: CustomEvent<{ query: string }>) => this.atualizarLocalizacaoAtendimento(e.detail.query, this.comandaNumero, this.itemTermo)}>
        <Label>${this.msg.searchMesa}</Label><Empty>${this.msg.emptyMesas}</Empty>
      </groupsearchcontent--ml-search-bar>
      <groupviewdata--ml-card-grid .loading=${this.carregarAtendimentoStatus === 'loading'} @row-click=${(e: CustomEvent<{ index: number }>) => { const mesa = rows[e.detail.index]; if (mesa) this.abrirComanda(mesa.id); }}>
        <Columns><Column field="code" header=${this.msg.mesaCode}></Column></Columns><Rows>
          ${rows.map((mesa) => html`<Row><Cell><div class="flex items-center justify-between gap-3"><span class="text-lg font-semibold">${mesa.code}</span><button type="button" class="min-h-11 rounded-lg border border-[var(--button-secondary-border,currentColor)] px-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${(e: Event) => { e.stopPropagation(); this.abrirComanda(mesa.id); }}>${this.msg.openMesa}</button></div></Cell></Row>`)}
        </Rows><Empty>${this.msg.emptyMesas}</Empty><Loading>${this.msg.loading}</Loading>
      </groupviewdata--ml-card-grid>
    </div>`;
  }

  private comandas(context: typeof this.contextoAtendimento) {
    const rows = context?.comandasAbertas.items || [];
    return html`<div class="mt-4 space-y-4">
      <groupsearchcontent--ml-search-bar .value=${this.comandaNumero === null ? null : String(this.comandaNumero)} placeholder=${this.msg.searchPlaceholder} @search=${(e: CustomEvent<{ query: string }>) => { const value = Number(e.detail.query); this.atualizarLocalizacaoAtendimento(this.mesaTermo, Number.isNaN(value) ? null : value, this.itemTermo); }}>
        <Label>${this.msg.searchComanda}</Label><Empty>${this.msg.emptyComandas}</Empty>
      </groupsearchcontent--ml-search-bar>
      <groupviewdata--ml-card-grid @row-click=${(e: CustomEvent<{ index: number }>) => { const row = rows[e.detail.index]; if (row) this.selectComanda(row.id); }}>
        <Columns><Column field="number" header=${this.msg.comandaNumber}></Column><Column field="mesa" header=${this.msg.mesaCode}></Column></Columns><Rows>
          ${rows.map((row) => html`<Row><Cell><span class="text-lg font-semibold">${row.number}</span></Cell><Cell>${row.mesa.code}</Cell></Row>`)}
        </Rows><Empty>${this.msg.emptyComandas}</Empty>
      </groupviewdata--ml-card-grid>
    </div>`;
  }

  private itens(context: typeof this.contextoAtendimento) {
    const rows = context?.itensCardapio.items || [];
    return html`<div class="mt-4 space-y-4">
      <groupsearchcontent--ml-search-bar .value=${this.itemTermo} placeholder=${this.msg.searchPlaceholder} @search=${(e: CustomEvent<{ query: string }>) => this.atualizarLocalizacaoAtendimento(this.mesaTermo, this.comandaNumero, e.detail.query)}>
        <Label>${this.msg.searchItem}</Label><Empty>${this.msg.emptyItens}</Empty>
      </groupsearchcontent--ml-search-bar>
      <groupviewdata--ml-card-grid>
        <Columns><Column field="name" header=${this.msg.item}></Column><Column field="price" header=${this.msg.unitPrice}></Column></Columns><Rows>
          ${rows.map((row) => html`<Row><Cell>${row.name}</Cell><Cell>${money(row.details.precoVigente)}</Cell></Row>`)}
        </Rows><Empty>${this.msg.emptyItens}</Empty>
      </groupviewdata--ml-card-grid>
    </div>`;
  }

  private launchForm(selected: typeof this.comanda) {
    const draft = this.formularioLancamento;
    const items = this.contextoAtendimento?.itensCardapio.items || [];
    const canLaunch = selected?.status === 'open';
    return html`<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.launchTitle}</h2>
      ${!canLaunch ? html`<p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg.noComanda}</p>` : html`<div class="mt-4 space-y-4">
        <groupselectone--ml-select-one-autocomplete .value=${draft.itemCardapioId} required searchable placeholder=${this.msg.chooseItemPlaceholder} @change=${(e: CustomEvent<{ value: string | null }>) => this.setFormularioLancamento({ ...draft, itemCardapioId: e.detail.value })}>
          <Label>${this.msg.chooseItem}</Label>${items.map((item) => html`<Item value=${item.id}>${item.name} · ${money(item.details.precoVigente)}</Item>`)}<Empty>${this.msg.emptyItens}</Empty>
        </groupselectone--ml-select-one-autocomplete>
        <groupenternumber--ml-number-stepper .value=${draft.details.quantidade} min="1" step="1" required @change=${(e: CustomEvent<{ value: number | null }>) => this.setFormularioLancamento({ ...draft, details: { ...draft.details, quantidade: e.detail.value } })}>
          <Label>${this.msg.quantityLabel}</Label>
        </groupenternumber--ml-number-stepper>
        <groupentertext--ml-multiline-text .value=${draft.details.observacao || ''} rows="3" placeholder=${this.msg.observationPlaceholder} @change=${(e: CustomEvent<{ value: string }>) => this.setFormularioLancamento({ ...draft, details: { ...draft.details, observacao: e.detail.value || null } })}>
          <Label>${this.msg.observationLabel}</Label>
        </groupentertext--ml-multiline-text>
        ${this.actionFeedback()}
        <div data-organism-id="acoesAtendimento"><grouptriggeraction--ml-button-standard size="lg" .disabled=${this.lancarItemStatus === 'loading'} .loading=${this.lancarItemStatus === 'loading'} @action=${() => this.lancarItem()}><Label>${this.lancarItemStatus === 'loading' ? this.msg.launching : this.msg.launch}</Label></grouptriggeraction--ml-button-standard></div>
      </div>`}`;
  }

  private detail(selected: typeof this.comanda) {
    if (!selected) return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.noComanda}</p>`;
    return html`<div class="flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.comanda} ${selected.number}</h2><p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.mesaCode}: ${selected.mesa.code} · ${this.msg.situation}: ${selected.status === 'open' ? this.msg.open : this.msg.closed}</p></div><groupviewmetric--ml-metric-big-number><Label>${this.msg.subtotal}</Label><Value>${money(selected.details.subtotal)}</Value></groupviewmetric--ml-metric-big-number></div>
      <div class="mt-6"><h3 class="mb-3 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.lines}</h3><groupviewtable--ml-data-table>
        <Caption>${this.msg.lines}</Caption><TableHeader><TableRow><TableHead key="item">${this.msg.item}</TableHead><TableHead key="quantity">${this.msg.quantity}</TableHead><TableHead key="total">${this.msg.lineTotal}</TableHead><TableHead key="action">${this.msg.situation}</TableHead></TableRow></TableHeader><TableBody>
          ${selected.itens.map((line) => html`<TableRow key=${line.id}><TableCell>${line.itemCardapio.name}${line.details.observacao ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${line.details.observacao}</div>` : nothing}</TableCell><TableCell>${line.details.quantidade}</TableCell><TableCell>${money(line.details.valorTotal)}</TableCell><TableCell>${line.status === 'canceled' ? this.msg.canceled : html`<grouptriggeraction--ml-button-standard data-variant="danger" size="sm" .disabled=${selected.status !== 'open' || this.cancelarItemStatus === 'loading'} .loading=${this.cancelarItemStatus === 'loading'} @action=${() => this.cancelarItem(line.id, line.version)}><Label>${this.msg.cancel}</Label></grouptriggeraction--ml-button-standard>`}</TableCell></TableRow>`)}
        </TableBody><Empty>${this.msg.noItems}</Empty></groupviewtable--ml-data-table></div>
      ${this.detailFeedback()}`;
  }

  private lookupError() {
    const error = this.carregarAtendimentoError || this.atualizarLocalizacaoAtendimentoError;
    return error ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" visible><Title>${this.msg.errorTitle}</Title><Message>${errorText(error)}</Message><Action><button type="button" class="min-h-11 rounded-lg px-3 font-semibold focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.carregarAtendimento()}>${this.msg.retryLookup}</button></Action></groupnotifyuser--ml-contextual-feedback>` : nothing;
  }

  private actionFeedback() {
    return this.lancarItemError ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible><Title>${this.msg.errorTitle}</Title><Message>${errorText(this.lancarItemError)}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing;
  }

  private detailFeedback() {
    const error = this.obterComandaAtendimentoError || this.abrirComandaError || this.cancelarItemError;
    return error ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" visible><Title>${this.msg.errorTitle}</Title><Message>${errorText(error)}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing;
  }
}
