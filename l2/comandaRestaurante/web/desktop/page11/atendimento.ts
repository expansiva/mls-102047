/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/atendimento.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteAtendimentoShared } from '/_102047_/l2/comandaRestaurante/web/shared/atendimento.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-card-grid.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Atendimento', lookupTitle: 'Localizar atendimento', tablesTitle: 'Mesas disponíveis', openTabsTitle: 'Comandas abertas', menuTitle: 'Itens do cardápio', searchTable: 'Buscar código da mesa', searchTab: 'Buscar número da comanda', searchMenu: 'Buscar item do cardápio', tableCode: 'Código da mesa', tabNumber: 'Número da comanda', menuItem: 'Item do cardápio', currentTab: 'Comanda em atendimento', noTab: 'Selecione uma comanda para conferir', noContext: 'Nenhum contexto disponível', unavailable: 'Indisponível', available: 'Disponível', open: 'Em atendimento', closed: 'Fechada', openTable: 'Abrir comanda', addItem: 'Lançar uma unidade', selectItem: 'Escolha um item do cardápio', quantity: 'Quantidade', observation: 'Observação', observationPlaceholder: 'Orientação para o preparo (opcional)', launch: 'Lançar item na comanda', cancel: 'Cancelar', cancelItem: 'Cancelar lançamento', subtotal: 'Subtotal dos itens', situation: 'Situação', unitPrice: 'Preço unitário', total: 'Valor total', note: 'Observação', loading: 'Carregando atendimento…', loadingCommand: 'Carregando comanda…', emptyTables: 'Nenhuma mesa disponível', emptyTabs: 'Nenhuma comanda aberta', emptyMenu: 'Nenhum item encontrado', emptyLines: 'Nenhum item lançado', searchError: 'Não foi possível atualizar a localização.', commandError: 'Não foi possível carregar a comanda.', openError: 'Não foi possível abrir a comanda.', launchError: 'Não foi possível lançar o item.', cancelError: 'Não foi possível cancelar o lançamento.', launched: 'Lançado', canceled: 'Cancelado', successOpen: 'Comanda aberta com sucesso.', successLaunch: 'Item lançado com sucesso.', successCancel: 'Lançamento cancelado.', retry: 'Tentar novamente', confirmCancel: 'Confirmar cancelamento'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const money = (value: string) => new Intl.NumberFormat(document.documentElement.lang || 'pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
const errorText = (error: { message: string } | null) => error?.message || '';

@customElement('comanda-restaurante--web--desktop--page11--atendimento-102047')
export class ComandaRestauranteDesktopPage11AtendimentoPage extends ComandaRestauranteAtendimentoShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const context = this.contextoAtendimento;
    const command = this.comanda;
    const draft = this.lancarItemDraft;
    const busyLookup = this.carregarAtendimentoStatus === 'loading' || this.atualizarLocalizacaoAtendimentoStatus === 'loading';
    const busyCommand = this.obterComandaAtendimentoStatus === 'loading';
    return html`
      <main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6" aria-busy=${busyLookup || busyCommand}>
        <div class="mx-auto max-w-[1500px]">
          <p class="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted,currentColor)]">${this.msg.pageTitle}</p>
          ${this.lookup(context, busyLookup)}
          <div class="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(390px,0.8fr)] gap-6 items-start">
            ${this.detail(command, busyCommand)}
            ${this.operation(context, command, draft)}
          </div>
        </div>
      </main>`;
  }

  private lookup(context: typeof this.contextoAtendimento, loading: boolean) {
    return html`<section data-organism-id="lookupAtendimento" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
      <div class="mb-4 flex items-center justify-between"><h1 class="text-xl font-bold text-[var(--text-strong,currentColor)]">${this.msg.lookupTitle}</h1><span class="text-sm text-[var(--text-muted,currentColor)]">${loading ? this.msg.loading : nothing}</span></div>
      ${context ? html`<div class="grid grid-cols-3 gap-5">
        <div class="space-y-3"><h2 class="font-semibold">${this.msg.tablesTitle}</h2><groupsearchcontent--ml-search-bar .value=${this.mesaTermo} .loading=${loading} placeholder=${this.msg.searchTable} @search=${(e: CustomEvent<{query:string}>) => this.refresh(e.detail.query, this.comandaNumero, this.itemTermo)} @clear=${() => this.refresh(null, this.comandaNumero, this.itemTermo)}><Label>${this.msg.searchTable}</Label></groupsearchcontent--ml-search-bar>
          <groupviewdata--ml-card-grid .loading=${loading} @row-click=${() => undefined}><Columns><Column field="code" header=${this.msg.tableCode}></Column><Column field="status" header=${this.msg.situation}></Column></Columns><Rows>${context.mesasDisponiveis.items.map(mesa => html`<Row ?disabled=${!mesa.details.disponivel}><Cell>${mesa.code}</Cell><Cell>${mesa.details.disponivel ? this.msg.available : this.msg.unavailable}</Cell><Cell><grouptriggeraction--ml-button-standard size="sm" data-variant="primary" ?disabled=${!mesa.details.disponivel || this.abrirComandaStatus === 'loading'} @action=${() => this.abrirComanda(mesa.id)}><Label>${this.msg.openTable}</Label></grouptriggeraction--ml-button-standard></Cell></Row>`)}</Rows><Empty>${this.msg.emptyTables}</Empty><Loading>${this.msg.loading}</Loading></groupviewdata--ml-card-grid>
        </div>
        <div class="space-y-3"><h2 class="font-semibold">${this.msg.openTabsTitle}</h2><groupsearchcontent--ml-search-bar .value=${this.comandaNumero === null ? null : String(this.comandaNumero)} .loading=${loading} placeholder=${this.msg.searchTab} @search=${(e: CustomEvent<{query:string}>) => this.refresh(this.mesaTermo, e.detail.query ? Number(e.detail.query) : null, this.itemTermo)} @clear=${() => this.refresh(this.mesaTermo, null, this.itemTermo)}><Label>${this.msg.searchTab}</Label></groupsearchcontent--ml-search-bar>
          <groupviewdata--ml-vertical-record-list .loading=${loading} @row-click=${(e: CustomEvent<{index:number}>) => this.selectComanda(context.comandasAbertas.items[e.detail.index]?.id || null)}><Columns><Column field="number" header=${this.msg.tabNumber}></Column><Column field="mesa" header=${this.msg.tableCode}></Column><Column field="status" header=${this.msg.situation}></Column></Columns><Rows>${context.comandasAbertas.items.map(tab => html`<Row ?selected=${tab.id === this.selectedComanda}><Cell>${tab.number}</Cell><Cell>${tab.mesa.code}</Cell><Cell>${tab.status === 'open' ? this.msg.open : this.msg.closed}</Cell></Row>`)}</Rows><Empty>${this.msg.emptyTabs}</Empty><Loading>${this.msg.loading}</Loading></groupviewdata--ml-vertical-record-list>
        </div>
        <div class="space-y-3"><h2 class="font-semibold">${this.msg.menuTitle}</h2><groupsearchcontent--ml-search-bar .value=${this.itemTermo} .loading=${loading} placeholder=${this.msg.searchMenu} @search=${(e: CustomEvent<{query:string}>) => this.refresh(this.mesaTermo, this.comandaNumero, e.detail.query)} @clear=${() => this.refresh(this.mesaTermo, this.comandaNumero, null)}><Label>${this.msg.searchMenu}</Label></groupsearchcontent--ml-search-bar>
          <groupviewdata--ml-card-grid .loading=${loading}><Columns><Column field="name" header=${this.msg.menuItem}></Column><Column field="price" header=${this.msg.unitPrice}></Column></Columns><Rows>${context.itensCardapio.items.map(item => html`<Row><Cell>${item.name}</Cell><Cell>${money(item.details.precoVigente)}</Cell><Cell><grouptriggeraction--ml-button-standard size="sm" data-variant="primary" ?disabled=${!this.comanda || this.comanda.status !== 'open' || this.lancarItemStatus === 'loading'} @action=${() => this.quickLaunch(item.id)}><Label>${this.msg.addItem}</Label></grouptriggeraction--ml-button-standard></Cell></Row>`)}</Rows><Empty>${this.msg.emptyMenu}</Empty><Loading>${this.msg.loading}</Loading></groupviewdata--ml-card-grid>
        </div></div>` : html`<div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.noContext}</div>`}
      ${this.lookupError()} </section>`;
  }

  private detail(command: typeof this.comanda, loading: boolean) {
    return html`<section data-organism-id="detalheComanda" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 min-h-[430px]">
      ${command ? html`<div class="mb-5 flex items-start justify-between"><div><h2 class="text-xl font-bold">${this.msg.currentTab} ${command.number}</h2><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.tableCode}: ${command.mesa.code}</p></div><groupviewmetric--ml-metric-big-number><Label>${this.msg.subtotal}</Label><Value>${money(command.details.subtotal)}</Value></groupviewmetric--ml-metric-big-number></div>
        <groupviewtable--ml-data-table .loading=${loading}><TableCaption>${this.msg.menuItem}</TableCaption><TableHeader><TableRow><TableHead key="item">${this.msg.menuItem}</TableHead><TableHead key="quantity">${this.msg.quantity}</TableHead><TableHead key="status">${this.msg.situation}</TableHead><TableHead key="total">${this.msg.total}</TableHead><TableHead key="action">${this.msg.cancel}</TableHead></TableRow></TableHeader><TableBody>${command.itens.map(item => html`<TableRow><TableCell>${item.itemCardapio.name}</TableCell><TableCell>${item.details.quantidade}</TableCell><TableCell>${item.status === 'launched' ? this.msg.launched : this.msg.canceled}</TableCell><TableCell>${money(item.details.valorTotal)}</TableCell><TableCell>${item.status === 'launched' && command.status === 'open' ? html`<grouptriggeraction--ml-button-standard size="sm" data-variant="danger" ?disabled=${this.cancelarItemStatus === 'loading'} @action=${() => this.cancelarItem(item.id, item.version)}><Label>${this.msg.cancelItem}</Label></grouptriggeraction--ml-button-standard>` : nothing}</TableCell></TableRow>`)}</TableBody><Empty>${this.msg.emptyLines}</Empty><Loading>${this.msg.loadingCommand}</Loading></groupviewtable--ml-data-table>` : html`<div class="flex min-h-[350px] items-center justify-center text-[var(--text-muted,currentColor)]">${this.msg.noTab}</div>`}
      ${this.commandFeedback()}</section>`;
  }

  private operation(context: typeof this.contextoAtendimento, command: typeof this.comanda, draft: typeof this.lancarItemDraft) {
    return html`<section data-organism-id="formularioLancamento" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5"><h2 class="mb-5 text-lg font-bold">${this.msg.launch}</h2>
      <groupselectone--ml-select-one-autocomplete .value=${draft.itemCardapioId} .loading=${!context} .disabled=${!command || command.status !== 'open'} placeholder=${this.msg.selectItem} @change=${(e: CustomEvent<{value:string|null}>) => this.setLancarItemDraft({...draft, itemCardapioId: e.detail.value})}><Label>${this.msg.menuItem}</Label>${context?.itensCardapio.items.map(item => html`<Item value=${item.id}>${item.name} — ${money(item.details.precoVigente)}</Item>`)}<Empty>${this.msg.emptyMenu}</Empty></groupselectone--ml-select-one-autocomplete>
      <div class="mt-4"><groupenternumber--ml-number-stepper .value=${draft.details.quantidade} min="1" step="1" required .disabled=${!command || command.status !== 'open'} @change=${(e: CustomEvent<{value:number|null}>) => this.setLancarItemDraft({...draft, details: {...draft.details, quantidade: e.detail.value}})}><Label>${this.msg.quantity}</Label></groupenternumber--ml-number-stepper></div>
      <div class="mt-4"><groupentertext--ml-multiline-text .value=${draft.details.observacao || ''} rows="3" placeholder=${this.msg.observationPlaceholder} .disabled=${!command || command.status !== 'open'} @change=${(e: CustomEvent<{value:string}>) => this.setLancarItemDraft({...draft, details: {...draft.details, observacao: e.detail.value || null}})}><Label>${this.msg.observation}</Label></groupentertext--ml-multiline-text></div>
      ${this.actionFeedback()}<div data-organism-id="acoesAtendimento" class="mt-5"><grouptriggeraction--ml-button-standard size="lg" data-variant="primary" .loading=${this.lancarItemStatus === 'loading'} ?disabled=${!command || command.status !== 'open' || !draft.itemCardapioId || draft.details.quantidade === null} @action=${() => this.lancarItem()}><Label>${this.msg.launch}</Label></grouptriggeraction--ml-button-standard></div>
    </section>`;
  }

  private refresh(mesa: string | null, number: number | null, item: string | null) { this.atualizarLocalizacaoAtendimento(mesa || null, number, item || null, 1, 20); }
  private quickLaunch(itemCardapioId: string) { this.setLancarItemDraft({...this.lancarItemDraft, comandaId: this.comanda?.id || null, itemCardapioId, details: {...this.lancarItemDraft.details, quantidade: 1}}); this.lancarItem(); }
  private lookupError() { const error = this.atualizarLocalizacaoAtendimentoError || this.carregarAtendimentoError; return error ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" visible><Title>${this.msg.searchError}</Title><Message>${errorText(error)}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing; }
  private commandFeedback() { const error = this.obterComandaAtendimentoError || this.cancelarItemError; return error ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" visible><Title>${this.msg.cancelError}</Title><Message>${errorText(error)}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing; }
  private actionFeedback() { const error = this.lancarItemError || this.abrirComandaError; return error ? html`<groupnotifyuser--ml-contextual-feedback class="mt-4" type="error" visible><Title>${this.msg.launchError}</Title><Message>${errorText(error)}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing; }
}
