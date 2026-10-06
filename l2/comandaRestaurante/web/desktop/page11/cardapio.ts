/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/cardapio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteCardapioShared } from '/_102047_/l2/comandaRestaurante/web/shared/cardapio.js';
import type { ItemCardapioResumo } from '/_102047_/l2/comandaRestaurante/web/shared/cardapio.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Cardápio',
pageIntro: 'Confira os itens vigentes e mantenha nome e preço prontos para o lançamento das comandas.',
catalogTitle: 'Itens do cardápio',
catalogHint: 'Selecione um item para consultar ou atualizar.',
newItem: 'Novo item',
itemName: 'Nome',
currentPrice: 'Preço vigente',
itemDetails: 'Detalhes do item',
selectedItem: 'Item selecionado',
noSelection: 'Selecione um item da lista para ver seus detalhes.',
loading: 'Carregando…',
loadingCatalog: 'Carregando itens do cardápio…',
emptyCatalog: 'Ainda não há itens cadastrados no cardápio.',
catalogError: 'Não foi possível carregar o cardápio.',
retry: 'Tentar novamente',
edit: 'Atualizar item',
createTitle: 'Cadastrar item',
editTitle: 'Atualizar item',
saveNew: 'Cadastrar item',
saveEdit: 'Salvar alterações',
cancel: 'Cancelar',
requiredName: 'Informe o nome do item.',
requiredPrice: 'Informe o preço vigente.',
createSuccess: 'Item cadastrado com sucesso.',
updateSuccess: 'Item atualizado com sucesso.',
commandError: 'Não foi possível concluir a operação.',
back: 'Voltar para os detalhes',
namePlaceholder: 'Ex.: Filé à parmegiana',
pricePlaceholder: '0,00',
priceHelp: 'Preço cobrado quando o item é lançado em uma comanda.',
nameHelp: 'Nome apresentado à equipe no cardápio.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const money = (value: string) => {
const number = Number(value);
return Number.isFinite(number)
? new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency: 'BRL' }).format(number)
: value;
};
@customElement('comanda-restaurante--web--desktop--page11--cardapio-102047')
export class ComandaRestauranteDesktopPage11CardapioPage extends ComandaRestauranteCardapioShared {
private msg!: PageMessageType;
private renderCatalog(rows: ItemCardapioResumo[]) {
const loading = this.carregarItensCardapioStatus === 'loading';
const error = this.carregarItensCardapioStatus === 'error';
return html`
<section data-organism-id="listaItensCardapio" class="min-w-0 rounded-2xl border border-[var(--border-default,transparent)] bg-[var(--surface-bg,transparent)] p-6 shadow-sm">
<div class="mb-5 flex items-start justify-between gap-4">
<div>
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.catalogTitle}</h2>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.catalogHint}</p>
</div>
<grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => this.setScenario('novo')}>
<Label>${this.msg.newItem}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible>
<Message>${this.carregarItensCardapioError?.message || this.msg.catalogError}</Message>
<Action><button type="button" class="min-h-11 rounded-lg px-3 underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.carregarItensCardapio()}>${this.msg.retry}</button></Action>
</groupnotifyuser--ml-contextual-feedback>` : ''}
<groupviewdata--ml-vertical-record-list .loading=${loading} .selectable=${true} .hoverable=${true} @row-click=${(e: CustomEvent<{ index: number }>) => {
const row = rows[e.detail.index];
if (row) { this.selectItemCardapio(row.id); this.setScenario('detalhe'); }
}}>
<Columns>
<Column field="name" header=${this.msg.itemName}></Column>
<Column field="price" header=${this.msg.currentPrice} align="right"></Column>
</Columns>
<Rows>${rows.map((row) => html`<Row .selected=${row.id === this.selectedItemCardapio}>
<Cell><span class="font-medium text-[var(--text-strong,currentColor)]">${row.name}</span></Cell>
<Cell><span class="tabular-nums">${money(row.details.details.precoVigente)}</span></Cell>
</Row>`)}</Rows>
<Loading><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.loadingCatalog}</div></Loading>
<Empty><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.emptyCatalog}</div></Empty>
</groupviewdata--ml-vertical-record-list>
</section>`;
}
private renderForm(editing: boolean) {
const draft = editing ? this.atualizarItemCardapioDraft : this.cadastrarItemCardapioDraft;
const status = editing ? this.atualizarItemCardapioStatus : this.cadastrarItemCardapioStatus;
const failure = editing ? this.atualizarItemCardapioError : this.cadastrarItemCardapioError;
const busy = status === 'loading';
return html`<section data-organism-id="formularioItemCardapio" class="rounded-2xl border border-[var(--border-default,transparent)] bg-[var(--surface-bg,transparent)] p-7 shadow-sm">
<div class="mb-6"><h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${editing ? this.msg.editTitle : this.msg.createTitle}</h2></div>
${failure ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible><Message>${failure.message || this.msg.commandError}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
<div class="space-y-5">
<groupentertext--ml-enter-text .value=${draft.name || ''} .required=${true} .disabled=${busy} placeholder=${this.msg.namePlaceholder} @change=${(e: CustomEvent<{ value: string }>) => editing ? this.setAtualizarItemCardapioDraft({ ...this.atualizarItemCardapioDraft, name: e.detail.value }) : this.setCadastrarItemCardapioDraft({ ...this.cadastrarItemCardapioDraft, name: e.detail.value })}>
<Label>${this.msg.itemName}</Label><Helper>${this.msg.nameHelp}</Helper>
</groupentertext--ml-enter-text>
<groupentermoney--ml-enter-money-br .value=${draft.details.precoVigente ? Number(draft.details.precoVigente) : null} currency="BRL" locale="pt-BR" .required=${true} .disabled=${busy} placeholder=${this.msg.pricePlaceholder} @change=${(e: CustomEvent<{ value: number | null }>) => { const value = e.detail.value === null ? null : String(e.detail.value); return editing ? this.setAtualizarItemCardapioDraft({ ...this.atualizarItemCardapioDraft, details: { precoVigente: value } }) : this.setCadastrarItemCardapioDraft({ ...this.cadastrarItemCardapioDraft, details: { precoVigente: value } }); }}>
<Label>${this.msg.currentPrice}</Label><Helper>${this.msg.priceHelp}</Helper>
</groupentermoney--ml-enter-money-br>
</div>
<div class="mt-8 flex flex-wrap gap-3">
<grouptriggeraction--ml-button-standard data-variant="primary" .loading=${busy} .disabled=${busy} @action=${() => editing ? this.atualizarItemCardapio() : this.cadastrarItemCardapio()}><Label>${editing ? this.msg.saveEdit : this.msg.saveNew}</Label></grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="secondary" .disabled=${busy} @action=${() => this.setScenario(editing ? 'detalhe' : 'detalhe')}><Label>${this.msg.cancel}</Label></grouptriggeraction--ml-button-standard>
</div>
</section>`;
}
private renderDetail() {
const item = this.item;
const loading = this.obterItemCardapioStatus === 'loading';
return html`<section class="rounded-2xl border border-[var(--border-default,transparent)] bg-[var(--surface-bg,transparent)] p-7 shadow-sm">
<div class="mb-6"><h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${item?.name || this.msg.selectedItem}</h2></div>
${loading ? html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loading}</p>` : item ? html`<dl class="space-y-5">
<div><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.itemName}</dt><dd class="mt-1 text-base font-medium text-[var(--text-strong,currentColor)]">${item.name}</dd></div>
<div><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.currentPrice}</dt><dd class="mt-1 text-base font-medium tabular-nums text-[var(--text-strong,currentColor)]">${money(item.details.details.precoVigente)}</dd></div>
</dl>
<div class="mt-8"><grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.setScenario('editar')}><Label>${this.msg.edit}</Label></grouptriggeraction--ml-button-standard></div>` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.noSelection}</p>`}
</section>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const rows = this.pagina?.items || [];
return html`<main class="min-h-screen bg-[var(--page-bg,transparent)] px-8 py-8 text-[var(--text-default,currentColor)]">
<header class="mb-8"><h1 class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1><p class="mt-2 max-w-3xl text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p></header>
<div class="grid grid-cols-[minmax(0,1.15fr)_minmax(23rem,0.85fr)] items-start gap-7">
${this.renderCatalog(rows)}
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'detalhe'} backLabel=${this.msg.back} @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="detalhe" title=${this.msg.selectedItem}>${this.renderDetail()}</Scene>
<Scene value="novo" title=${this.msg.createTitle} nav="back" backTo="detalhe">${this.renderForm(false)}</Scene>
<Scene value="editar" title=${this.msg.editTitle} nav="back" backTo="detalhe">${this.renderForm(true)}</Scene>
</molecules--ml-scenary-102020>
</div>
</main>`;
}
}
