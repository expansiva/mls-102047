/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/atendimento.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-input.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import { ComandaRestauranteAtendimentoShared } from '/_102047_/l2/comandaRestaurante/web/shared/atendimento.js';
import type { ContextoAtendimento, ComandaAtendimento, ComandaResumo, MesaDisponivel, ItemCardapioResumo, ItemComandaAtendimento } from '/_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.js';
/// **collab_i18n_start**
const pageMessage_pt = {
'scene.localizacao':'Localizar atendimento','scene.atendimento':'Atendimento','scene.back':'Voltar',
'page.kicker':'Atendimento no salão','lookup.label':'Escolha o contexto do atendimento','lookup.mesa':'Mesa disponível','lookup.comanda':'Comanda aberta','lookup.cardapio':'Item do cardápio',
'search.mesa':'Código da mesa','search.comanda':'Número da comanda','search.item':'Nome do item','search.placeholder.mesa':'Ex.: M12','search.placeholder.comanda':'Ex.: 24','search.placeholder.item':'Ex.: Café',
'list.mesas':'Mesas disponíveis','list.comandas':'Comandas abertas','list.itens':'Cardápio para lançamento','list.code':'Mesa','list.number':'Comanda','list.mesa':'Mesa','list.item':'Item','list.price':'Preço vigente','list.open':'Abrir comanda','list.choose':'Selecionar',
'empty.mesas':'Nenhuma mesa disponível encontrada.','empty.comandas':'Nenhuma comanda aberta encontrada.','empty.itens':'Nenhum item do cardápio encontrado.','loading':'Carregando atendimento…',
'detail.title':'Comanda em atendimento','detail.number':'Número da comanda','detail.mesa':'Mesa','detail.status':'Situação','detail.open':'Em atendimento','detail.closed':'Fechada','detail.items':'Itens lançados','detail.item':'Item','detail.quantity':'Quantidade','detail.note':'Observação','detail.unit':'Preço unitário','detail.total':'Valor total do item','detail.cancel':'Cancelar item','detail.subtotal':'Subtotal dos itens','detail.noItems':'Ainda não há itens lançados nesta comanda.',
'form.title':'Lançar item','form.item':'Item do cardápio','form.item.placeholder':'Selecione um item','form.quantity':'Quantidade','form.note':'Observação','form.note.placeholder':'Orientação para o preparo (opcional)','form.launch':'Lançar item',
'action.open':'Abrir comanda','action.cancel':'Cancelar item','action.confirmCancel':'Cancelar lançamento','action.cancelHint':'Esta ação retira o item da comanda.','success.open':'Comanda aberta.','success.launch':'Item lançado na comanda.','success.cancel':'Item cancelado.','error.title':'Não foi possível concluir','error.retry':'Tente novamente.',
'state.noComanda':'Selecione uma comanda aberta ou abra uma mesa para começar.','error.required':'Informe o item e a quantidade.','error.noSelection':'Selecione uma mesa disponível.','aria.subtotal':'Subtotal da comanda',
'error.client.validation':'Confira os dados informados.','error.client.conflict':'A comanda mudou. Atualize e tente novamente.','error.client.notFound':'O registro não foi encontrado.','error.client.unavailable':'A mesa não está mais disponível.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages = { pt: pageMessage_pt };
/// **collab_i18n_end**
const money = (value: string) => value;
const numberText = (value: number) => new Intl.NumberFormat(document.documentElement.lang || 'pt-BR').format(value);
const errorText = (error: { code: string; message: string } | null, msg: PageMessageType) => error ? (error.code.startsWith('client.') ? (msg[`error.${error.code}` as keyof PageMessageType] || msg['error.title']) : msg['error.title']) : '';
@customElement('comanda-restaurante--web--mobile--page11--atendimento-102047')
export class ComandaRestauranteMobilePage11AtendimentoPage extends ComandaRestauranteAtendimentoShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages.pt;
return html`<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] pb-24">
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'localizacao'} backLabel=${this.msg['scene.back']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="localizacao" title=${this.msg['scene.localizacao']}>${this.renderSceneLocalizacao()}</Scene>
<Scene value="atendimento" title=${this.msg['scene.atendimento']} nav="back">${this.renderSceneAtendimento()}</Scene>
</molecules--ml-scenary-102020>
</main>`;
}
private renderSceneLocalizacao() {
const c = this.contextoAtendimento;
return html`<section class="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-4" data-organism-id="lookupAtendimento">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['page.kicker']}</p>
<h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['lookup.label']}</h1>
<groupnavigatesection--ml-navigate-pills value="mesas" data-class="w-full">
<Label>${this.msg['lookup.label']}</Label><Tab value="mesas" title=${this.msg['lookup.mesa']}>${this.renderMesas(c)}</Tab>
<Tab value="comandas" title=${this.msg['lookup.comanda']}>${this.renderComandas(c)}</Tab>
<Tab value="itens" title=${this.msg['lookup.cardapio']}>${this.renderItens(c)}</Tab>
</groupnavigatesection--ml-navigate-pills>
${this.renderBottomBar()}
</section>`;
}
private renderMesas(c: ContextoAtendimento | null) {
return html`<div class="mt-3 flex flex-col gap-3">
<groupsearchcontent--ml-search-bar .value=${this.mesaTermo} placeholder=${this.msg['search.placeholder.mesa']} @search=${(e: CustomEvent<{query:string}>) => this.atualizarLocalizacaoAtendimento(e.detail.query, this.comandaNumero, this.itemTermo, 1)} @clear=${() => this.atualizarLocalizacaoAtendimento(null, this.comandaNumero, this.itemTermo, 1)}><Label>${this.msg['search.mesa']}</Label></groupsearchcontent--ml-search-bar>
<groupviewdata--ml-vertical-record-list .loading=${this.carregarAtendimentoStatus === 'loading' || this.atualizarLocalizacaoAtendimentoStatus === 'loading'}>
<Columns><Column field="code" header=${this.msg['list.code']} /><Column field="action" header="" /></Columns><Rows>${(c?.mesasDisponiveis.items || []).map((mesa: MesaDisponivel) => html`<Row><Cell>${mesa.code}</Cell><Cell><grouptriggeraction--ml-button-standard data-variant="primary" size="sm" @action=${() => this.abrirComanda(mesa.id)}><Label>${this.msg['list.open']}</Label></grouptriggeraction--ml-button-standard></Cell></Row>`)}</Rows><Empty>${this.msg['empty.mesas']}</Empty><Loading>${this.msg['loading']}</Loading>
</groupviewdata--ml-vertical-record-list>
</div>`;
}
private renderComandas(c: ContextoAtendimento | null) {
return html`<div class="mt-3 flex flex-col gap-3"><groupsearchcontent--ml-search-bar .value=${this.comandaNumero === null ? null : String(this.comandaNumero)} placeholder=${this.msg['search.placeholder.comanda']} @search=${(e: CustomEvent<{query:string}>) => this.atualizarLocalizacaoAtendimento(this.mesaTermo, e.detail.query ? Number(e.detail.query) : null, this.itemTermo, 1)} @clear=${() => this.atualizarLocalizacaoAtendimento(this.mesaTermo, null, this.itemTermo, 1)}><Label>${this.msg['search.comanda']}</Label></groupsearchcontent--ml-search-bar><groupviewdata--ml-vertical-record-list .loading=${this.carregarAtendimentoStatus === 'loading' || this.atualizarLocalizacaoAtendimentoStatus === 'loading'} @row-click=${(e: CustomEvent<{index:number}>) => { const row = c?.comandasAbertas.items[e.detail.index]; if (row) { this.selectComanda(row.id); this.setScenario('atendimento'); } }}><Columns><Column field="number" header=${this.msg['list.number']} /><Column field="mesa" header=${this.msg['list.mesa']} /></Columns><Rows>${(c?.comandasAbertas.items || []).map((row: ComandaResumo) => html`<Row><Cell>${numberText(row.number)}</Cell><Cell>${row.mesa.code}</Cell></Row>`)}</Rows><Empty>${this.msg['empty.comandas']}</Empty><Loading>${this.msg['loading']}</Loading></groupviewdata--ml-vertical-record-list></div>`;
}
private renderItens(c: ContextoAtendimento | null) {
return html`<div class="mt-3 flex flex-col gap-3"><groupsearchcontent--ml-search-bar .value=${this.itemTermo} placeholder=${this.msg['search.placeholder.item']} @search=${(e: CustomEvent<{query:string}>) => this.atualizarLocalizacaoAtendimento(this.mesaTermo, this.comandaNumero, e.detail.query, 1)} @clear=${() => this.atualizarLocalizacaoAtendimento(this.mesaTermo, this.comandaNumero, null, 1)}><Label>${this.msg['search.item']}</Label></groupsearchcontent--ml-search-bar><groupviewdata--ml-vertical-record-list .loading=${this.carregarAtendimentoStatus === 'loading' || this.atualizarLocalizacaoAtendimentoStatus === 'loading'}><Columns><Column field="name" header=${this.msg['list.item']} /><Column field="price" header=${this.msg['list.price']} /></Columns><Rows>${(c?.itensCardapio.items || []).map((item: ItemCardapioResumo) => html`<Row><Cell>${item.name}</Cell><Cell>${money(item.details.precoVigente)}</Cell></Row>`)}</Rows><Empty>${this.msg['empty.itens']}</Empty><Loading>${this.msg['loading']}</Loading></groupviewdata--ml-vertical-record-list></div>`;
}
private renderSceneAtendimento() {
const c = this.comanda;
const draft = this.formularioLancamento;
const error = errorText(this.obterComandaAtendimentoError || this.lancarItemError || this.cancelarItemError || this.abrirComandaError, this.msg);
return html`<section class="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-4" data-organism-id="detalheComanda">
<div class="flex items-center justify-between"><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['detail.title']}</p>${c ? html`<span class="font-semibold text-[var(--text-strong,currentColor)]">#${numberText(c.number)}</span>` : nothing}</div>
${c ? html`<div class="grid grid-cols-2 gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4"><div><span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['detail.mesa']}</span><p class="font-medium">${c.mesa.code}</p></div><div><span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['detail.status']}</span><p class="font-medium">${c.status === 'open' ? this.msg['detail.open'] : this.msg['detail.closed']}</p></div></div><groupviewmetric--ml-metric-big-number aria-label=${this.msg['aria.subtotal']}><Label>${this.msg['detail.subtotal']}</Label><Value>${money(c.details.subtotal)}</Value></groupviewmetric--ml-metric-big-number><groupviewtable--ml-responsive-table .loading=${this.obterComandaAtendimentoStatus === 'loading'}><Caption>${this.msg['detail.items']}</Caption><TableHeader><TableRow><TableHead key="item">${this.msg['detail.item']}</TableHead><TableHead key="quantity">${this.msg['detail.quantity']}</TableHead><TableHead key="total">${this.msg['detail.total']}</TableHead><TableHead key="action"></TableHead></TableRow></TableHeader><TableBody>${c.itens.map((item: ItemComandaAtendimento) => html`<TableRow key=${item.id}><TableCell>${item.itemCardapio.name}</TableCell><TableCell>${item.details.quantidade}</TableCell><TableCell>${money(item.details.valorTotal)}</TableCell><TableCell>${item.status === 'launched' ? html`<grouptriggeraction--ml-button-standard data-variant="danger" size="sm" @action=${() => this.cancelarItem(item.id, item.version)}><Label>${this.msg['detail.cancel']}</Label></grouptriggeraction--ml-button-standard>` : nothing}</TableCell></TableRow>`)}</TableBody><Empty>${this.msg['detail.noItems']}</Empty><Loading>${this.msg['loading']}</Loading></groupviewtable--ml-responsive-table>` : html`<p class="rounded-xl bg-[var(--surface-alt-bg,transparent)] p-4 text-sm">${this.msg['state.noComanda']}</p>`}
<div data-organism-id="formularioLancamento" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4"><h2 class="mb-3 font-semibold">${this.msg['form.title']}</h2><groupselectone--ml-combobox .value=${draft.itemCardapioId} placeholder=${this.msg['form.item.placeholder']} ?disabled=${!c || c.status !== 'open'} @change=${(e: CustomEvent<{value:string|null}>) => this.setFormularioLancamento({ ...draft, itemCardapioId: e.detail.value })}><Label>${this.msg['form.item']}</Label>${(this.contextoAtendimento?.itensCardapio.items || []).map((item: ItemCardapioResumo) => html`<Item value=${item.id}>${item.name} — ${money(item.details.precoVigente)}</Item>`)}</groupselectone--ml-combobox><groupenternumber--ml-number-stepper .value=${draft.details.quantidade} min="1" step="1" required ?disabled=${!c || c.status !== 'open'} @change=${(e: CustomEvent<{value:number|null}>) => this.setFormularioLancamento({ ...draft, details: { ...draft.details, quantidade: e.detail.value } })}><Label>${this.msg['form.quantity']}</Label></groupenternumber--ml-number-stepper><groupentertext--ml-enter-text .value=${draft.details.observacao || ''} placeholder=${this.msg['form.note.placeholder']} rows="2" ?disabled=${!c || c.status !== 'open'} @change=${(e: CustomEvent<{value:string}>) => this.setFormularioLancamento({ ...draft, details: { ...draft.details, observacao: e.detail.value || null } })}><Label>${this.msg['form.note']}</Label></groupentertext--ml-enter-text></div>
<div data-organism-id="acoesAtendimento" class="flex flex-col gap-2"><grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .loading=${this.lancarItemStatus === 'loading'} ?disabled=${!c || c.status !== 'open' || !draft.itemCardapioId || draft.details.quantidade === null} @action=${() => this.lancarItem()}><Label>${this.msg['form.launch']}</Label></grouptriggeraction--ml-button-standard>${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible><Title>${this.msg['error.title']}</Title><Message>${error} ${this.msg['error.retry']}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}${this.lancarItemStatus === 'success' ? html`<groupnotifyuser--ml-contextual-feedback type="success" visible><Message>${this.msg['success.launch']}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}${this.cancelarItemStatus === 'success' ? html`<groupnotifyuser--ml-contextual-feedback type="success" visible><Message>${this.msg['success.cancel']}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}${this.abrirComandaStatus === 'success' ? html`<groupnotifyuser--ml-contextual-feedback type="success" visible><Message>${this.msg['success.open']}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}</div>
</section>`;
}
private renderBottomBar() {
return this.comanda ? html`<button type="button" class="fixed inset-x-3 bottom-3 z-10 flex min-h-14 items-center justify-between rounded-xl border border-[var(--selected-border,currentColor)] bg-[var(--selected-bg,transparent)] px-4 text-left shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" aria-label=${this.msg['scene.atendimento']} @click=${() => this.setScenario('atendimento')}><span class="text-sm font-medium">${this.msg['scene.atendimento']}</span><strong class="text-2xl text-[var(--text-strong,currentColor)]">${money(this.comanda.details.subtotal)}</strong></button>` : nothing;
}
}
