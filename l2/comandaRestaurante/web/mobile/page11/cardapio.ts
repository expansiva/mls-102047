/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/cardapio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteCardapioShared } from '/_102047_/l2/comandaRestaurante/web/shared/cardapio.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Cardápio',
catalogScene: 'Itens do cardápio',
itemScene: 'Detalhes do item',
newScene: 'Cadastrar item',
editScene: 'Atualizar item',
newItem: 'Novo item',
name: 'Nome',
currentPrice: 'Preço vigente',
requiredName: 'Informe o nome do item.',
requiredPrice: 'Informe o preço vigente.',
catalogLoading: 'Carregando itens do cardápio…',
catalogEmpty: 'Ainda não há itens cadastrados no cardápio.',
catalogError: 'Não foi possível carregar o cardápio. Tente novamente.',
loadCatalog: 'Tentar novamente',
loadMore: 'Carregar mais itens',
loadingMore: 'Carregando mais itens…',
selectHint: 'Toque em um item para consultar ou atualizar.',
readName: 'Nome do item',
readPrice: 'Preço atualmente cobrado quando lançado em uma comanda',
edit: 'Editar item',
saveNew: 'Cadastrar item',
saveEdit: 'Salvar alterações',
cancel: 'Cancelar',
back: 'Voltar para o cardápio',
createSuccess: 'Item cadastrado no cardápio.',
updateSuccess: 'Item atualizado no cardápio.',
commandError: 'Não foi possível salvar o item. Revise os dados e tente novamente.',
itemLoading: 'Carregando dados do item…',
itemError: 'Não foi possível carregar os dados do item.',
priceHelper: 'Use o valor cobrado atualmente na operação.',
nameHelper: 'Nome apresentado à equipe no cardápio.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const money = (value: string | null | undefined) => {
if (value === null || value === undefined || value === '') return null;
const number = Number(value.replace(',', '.'));
return Number.isFinite(number) ? number : null;
};
@customElement('comanda-restaurante--web--mobile--page11--cardapio-102047')
export class ComandaRestauranteMobilePage11CardapioPage extends ComandaRestauranteCardapioShared {
private msg!: PageMessageType;
private feedback(type: 'success' | 'error', message: string, visible: boolean) {
return html`<groupnotifyuser--ml-contextual-feedback
.visible=${visible} type=${type} .dismissible=${false}>
<Message>${message}</Message>
</groupnotifyuser--ml-contextual-feedback>`;
}
private renderCatalog() {
const rows = this.pagina?.items ?? [];
const loading = this.carregarItensCardapioStatus === 'loading';
const failed = this.carregarItensCardapioStatus === 'error';
return html`
<section data-organism-id="listaItensCardapio" class="space-y-4">
<div class="flex items-start justify-between gap-3">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.selectHint}</p>
<grouptriggeraction--ml-button-standard
data-variant="primary" size="md"
@action=${() => this.setScenario('novo')}>
<Label>${this.msg.newItem}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${failed ? html`
<div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-live="polite">
<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.catalogError}</p>
<grouptriggeraction--ml-button-standard class="mt-3" data-variant="secondary" size="md"
@action=${() => { void this.carregarItensCardapio(); }}>
<Label>${this.msg.loadCatalog}</Label>
</grouptriggeraction--ml-button-standard>
</div>` : html`
<groupviewdata--ml-vertical-record-list .loading=${loading} .hoverable=${true}
@row-click=${(e: CustomEvent<{ index: number }>) => {
const row = rows[e.detail.index];
if (row) {
this.selectItemCardapio(row.id);
this.setScenario('item');
}
}}>
<Columns>
<Column field="name" header=${this.msg.name}></Column>
<Column field="price" header=${this.msg.currentPrice} align="right"></Column>
</Columns>
<Rows>
${rows.map((row) => html`<Row ?selected=${row.id === this.selectedItemCardapio}>
<Cell><span class="font-medium text-[var(--text-strong,currentColor)]">${row.name}</span></Cell>
<Cell><span class="whitespace-nowrap text-[var(--text-default,currentColor)]">${this.formatMoney(row.details.details.precoVigente)}</span></Cell>
</Row>`)}
</Rows>
<Loading><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.catalogLoading}</div></Loading>
<Empty><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.catalogEmpty}</div></Empty>
</groupviewdata--ml-vertical-record-list>
${this.carregarMaisItensCardapioStatus === 'loading' ? html`<p class="text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loadingMore}</p>` : html`
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full"
.disabled=${loading} @action=${() => { void this.carregarMaisItensCardapio(); }}>
<Label>${this.msg.loadMore}</Label>
</grouptriggeraction--ml-button-standard>`}
`}
</section>`;
}
private renderItem() {
const item = this.formularioItemCardapio;
const loading = this.obterItemCardapioStatus === 'loading';
return html`
<section data-organism-id="formularioItemCardapio" class="space-y-5">
${this.feedback('error', this.msg.itemError, this.obterItemCardapioStatus === 'error')}
${loading ? html`<p class="rounded-xl bg-[var(--surface-alt-bg,transparent)] p-4 text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.itemLoading}</p>` : item ? html`
<dl class="divide-y divide-[var(--border-subtle,currentColor)] rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
<div class="p-4"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.readName}</dt><dd class="mt-1 text-lg font-semibold text-[var(--text-strong,currentColor)]">${item.name}</dd></div>
<div class="p-4"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.currentPrice}</dt><dd class="mt-1 text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.formatMoney(item.details.details.precoVigente)}</dd><dd class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.readPrice}</dd></div>
</dl>
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
@action=${() => this.setScenario('editar')}><Label>${this.msg.edit}</Label></grouptriggeraction--ml-button-standard>
` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.catalogEmpty}</p>`}
</section>`;
}
private renderForm(editing: boolean) {
const draft = editing ? this.atualizarItemCardapioDraft : this.cadastrarItemCardapioDraft;
const commandLoading = editing ? this.atualizarItemCardapioStatus === 'loading' : this.cadastrarItemCardapioStatus === 'loading';
const commandError = editing ? this.atualizarItemCardapioStatus === 'error' : this.cadastrarItemCardapioStatus === 'error';
const commandSuccess = editing ? this.atualizarItemCardapioStatus === 'success' : this.cadastrarItemCardapioStatus === 'success';
const name = draft.name ?? '';
const price = money(draft.details.precoVigente);
return html`<section data-organism-id="formularioItemCardapio" class="space-y-5">
${this.feedback('error', this.msg.commandError, commandError)}
${this.feedback('success', editing ? this.msg.updateSuccess : this.msg.createSuccess, commandSuccess)}
<div class="space-y-4">
<groupentertext--ml-floating-text-input .value=${name} name="name" .required=${true} .isEditing=${true}
@input=${(e: CustomEvent<{ value: string }>) => editing
? this.setAtualizarItemCardapioDraft({ ...this.atualizarItemCardapioDraft, name: e.detail.value })
: this.setCadastrarItemCardapioDraft({ ...this.cadastrarItemCardapioDraft, name: e.detail.value })}>
<Label>${this.msg.name}</Label><Helper>${this.msg.nameHelper}</Helper>
</groupentertext--ml-floating-text-input>
<groupentermoney--ml-enter-money-br .value=${price} name="precoVigente" .required=${true}
.loading=${commandLoading} @input=${(e: CustomEvent<{ value: number | null }>) => {
const value = e.detail.value === null ? null : String(e.detail.value);
if (editing) this.setAtualizarItemCardapioDraft({ ...this.atualizarItemCardapioDraft, details: { precoVigente: value } });
else this.setCadastrarItemCardapioDraft({ ...this.cadastrarItemCardapioDraft, details: { precoVigente: value } });
}}>
<Label>${this.msg.currentPrice}</Label><Helper>${this.msg.priceHelper}</Helper>
</groupentermoney--ml-enter-money-br>
</div>
<div class="flex flex-col gap-3">
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
.loading=${commandLoading} .disabled=${commandLoading || name.trim() === '' || price === null}
@action=${() => { if (editing) void this.atualizarItemCardapio(); else void this.cadastrarItemCardapio(); }}>
<Label>${editing ? this.msg.saveEdit : this.msg.saveNew}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full"
.disabled=${commandLoading} @action=${() => this.setScenario(editing ? 'item' : 'catalogo')}>
<Label>${this.msg.cancel}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>`;
}
private formatMoney(value: string) {
const number = money(value);
return number === null ? '—' : new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency: 'BRL' }).format(number);
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
<h1 class="mb-5 text-2xl font-bold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'catalogo'} backLabel=${this.msg.back}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="catalogo" title=${this.msg.catalogScene}>${this.renderCatalog()}</Scene>
<Scene value="item" title=${this.msg.itemScene} nav="back" backTo="catalogo">${this.renderItem()}</Scene>
<Scene value="novo" title=${this.msg.newScene} nav="back" backTo="catalogo">${this.renderForm(false)}</Scene>
<Scene value="editar" title=${this.msg.editScene} nav="back" backTo="item">${this.renderForm(true)}</Scene>
</molecules--ml-scenary-102020>
</main>`;
}
}
