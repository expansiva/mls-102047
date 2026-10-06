/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/cardapio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import { ComandaRestauranteCardapioShared } from '/_102047_/l2/comandaRestaurante/web/shared/cardapio.js';
import type { ErrorState, ItemCardapioResumo } from '/_102047_/l2/comandaRestaurante/web/shared/cardapio.js';
/// **collab_i18n_start
const pageMessage_pt = {
'page.title': 'Cardápio',
'scene.lista': 'Itens do cardápio',
'scene.cadastro': 'Manutenção do item',
'scene.back': 'Voltar para o cardápio',
'list.new': 'Cadastrar item',
'list.name': 'Nome',
'list.price': 'Preço vigente',
'list.empty': 'Nenhum item cadastrado no cardápio.',
'list.loading': 'Carregando itens do cardápio…',
'list.more': 'Carregar mais itens',
'list.moreLoading': 'Carregando mais itens…',
'list.errorTitle': 'Não foi possível carregar o cardápio',
'list.retry': 'Tentar novamente',
'form.newTitle': 'Novo item do cardápio',
'form.editTitle': 'Atualizar item do cardápio',
'form.name': 'Nome',
'form.namePlaceholder': 'Nome apresentado à equipe',
'form.price': 'Preço vigente',
'form.pricePlaceholder': 'Informe o preço',
'form.required': 'Preenchimento obrigatório',
'form.create': 'Cadastrar item',
'form.update': 'Salvar alterações',
'form.cancel': 'Cancelar',
'form.loading': 'Carregando item…',
'form.successCreate': 'Item cadastrado com sucesso.',
'form.successUpdate': 'Item atualizado com sucesso.',
'form.errorTitle': 'Não foi possível salvar o item',
'form.retry': 'Tentar novamente',
'error.generic': 'Não foi possível concluir a operação. Tente novamente.',
'error.client.validation': 'Confira os campos obrigatórios e tente novamente.',
'error.client.conflict': 'Este item foi alterado por outra pessoa. Reabra o item e tente novamente.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages = { pt: pageMessage_pt };
/// **collab_i18n_end
const moneyValue = (value: string | null | undefined): number | null => {
if (value === null || value === undefined || value.trim() === '') return null;
const parsed = Number(value.replace(',', '.'));
return Number.isFinite(parsed) ? parsed : null;
};
const errorMessage = (error: ErrorState, msg: PageMessageType): string => {
if (!error) return '';
if (error.code === 'client.validation') return msg['error.client.validation'];
if (error.code === 'client.conflict') return msg['error.client.conflict'];
return msg['error.generic'];
};
@customElement('comanda-restaurante--web--mobile--page11--cardapio-102047')
export class ComandaRestauranteMobilePage11CardapioPage extends ComandaRestauranteCardapioShared {
private msg!: PageMessageType;
render() {
const messageKey = this.getMessageKey(pageMessages);
this.msg = pageMessages[messageKey as keyof typeof pageMessages];
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-4 py-5">
<header class="mb-5">
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['page.title']}</h1>
</header>
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'lista'}
backLabel=${this.msg['scene.back']}
?loading=${this.pageStatus === 'loading'}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="lista" title=${this.msg['scene.lista']}>${this.renderSceneLista()}</Scene>
<Scene value="cadastro" title=${this.msg['scene.cadastro']} nav="back">${this.renderSceneCadastro()}</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
renderSceneLista() {
const pagina = this.pagina;
const itens = pagina?.items ?? [];
const loading = this.carregarItensCardapioStatus === 'loading';
const error = errorMessage(this.carregarItensCardapioError, this.msg);
return html`
<section class="space-y-4" data-organism-id="listaItensCardapio">
<div class="flex items-center justify-between gap-3">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['scene.lista']}</p>
<grouptriggeraction--ml-button-standard size="md" data-variant="primary" data-class="min-h-11 shrink-0" @action=${() => { this.selectItemCardapio(null); this.setScenario('cadastro'); }}>
<Label>${this.msg['list.new']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Title>${this.msg['list.errorTitle']}</Title><Message>${error}</Message>
<Action><button type="button" @click=${() => this.carregarItensCardapio()}>${this.msg['list.retry']}</button></Action>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
<groupviewdata--ml-vertical-record-list .selectable=${true} .loading=${loading}>
<Columns>
<Column field="name" header=${this.msg['list.name']}></Column>
<Column field="price" header=${this.msg['list.price']} align="right"></Column>
</Columns>
<Rows>
${itens.map((item: ItemCardapioResumo, index: number) => html`
<Row .selected=${this.selectedItemCardapio === item.id} .value=${String(index)} @click=${() => { this.selectItemCardapio(item.id); this.setScenario('cadastro'); }}>
<Cell>${item.name}</Cell><Cell>${item.details.details.precoVigente}</Cell>
</Row>
`)}
</Rows>
${loading ? html`<Loading>${this.msg['list.loading']}</Loading>` : nothing}
${!loading && itens.length === 0 ? html`<Empty>${this.msg['list.empty']}</Empty>` : nothing}
</groupviewdata--ml-vertical-record-list>
${pagina && itens.length > 0 ? html`
<grouptriggeraction--ml-button-standard size="md" data-variant="secondary" data-class="w-full min-h-11" .loading=${this.carregarMaisItensCardapioStatus === 'loading'} ?disabled=${this.carregarMaisItensCardapioStatus === 'loading'} @action=${() => this.carregarMaisItensCardapio()}>
<Label>${this.carregarMaisItensCardapioStatus === 'loading' ? this.msg['list.moreLoading'] : this.msg['list.more']}</Label>
</grouptriggeraction--ml-button-standard>` : nothing}
</section>
`;
}
renderSceneCadastro() {
const editing = this.selectedItemCardapio !== null;
const draft = editing ? this.atualizarItemCardapioDraft : this.cadastrarItemCardapioDraft;
const commandLoading = editing ? this.atualizarItemCardapioStatus === 'loading' : this.cadastrarItemCardapioStatus === 'loading';
const commandError = editing ? errorMessage(this.atualizarItemCardapioError, this.msg) : errorMessage(this.cadastrarItemCardapioError, this.msg);
const success = editing ? this.atualizarItemCardapioStatus === 'success' : this.cadastrarItemCardapioStatus === 'success';
return html`
<section class="space-y-5" data-organism-id="formularioItemCardapio">
<div>
<h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${editing ? this.msg['form.editTitle'] : this.msg['form.newTitle']}</h2>
${this.obterItemCardapioStatus === 'loading' ? html`<p class="mt-2 text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg['form.loading']}</p>` : nothing}
</div>
${commandError ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Title>${this.msg['form.errorTitle']}</Title><Message>${commandError}</Message>
<Action><button type="button" @click=${() => editing ? this.atualizarItemCardapio() : this.cadastrarItemCardapio()}>${this.msg['form.retry']}</button></Action>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
${success ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true}><Message>${editing ? this.msg['form.successUpdate'] : this.msg['form.successCreate']}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}
<div class="space-y-4">
<groupentertext--ml-floating-text-input .value=${draft.name ?? ''} name="name" required placeholder=${this.msg['form.namePlaceholder']} @change=${(e: CustomEvent<{ value: string }>) => editing ? this.setAtualizarItemCardapioDraft({ ...this.atualizarItemCardapioDraft, name: e.detail.value }) : this.setCadastrarItemCardapioDraft({ ...this.cadastrarItemCardapioDraft, name: e.detail.value })}>
<Label>${this.msg['form.name']}</Label><Helper>${this.msg['form.required']}</Helper>
</groupentertext--ml-floating-text-input>
<groupentermoney--ml-enter-money-br .value=${moneyValue(draft.details.precoVigente)} currency="BRL" locale="pt-BR" required min=${0} placeholder=${this.msg['form.pricePlaceholder']} @change=${(e: CustomEvent<{ value: number | null }>) => editing ? this.setAtualizarItemCardapioDraft({ ...this.atualizarItemCardapioDraft, details: { precoVigente: e.detail.value === null ? null : String(e.detail.value) } }) : this.setCadastrarItemCardapioDraft({ ...this.cadastrarItemCardapioDraft, details: { precoVigente: e.detail.value === null ? null : String(e.detail.value) } })}>
<Label>${this.msg['form.price']}</Label><Helper>${this.msg['form.required']}</Helper>
</groupentermoney--ml-enter-money-br>
</div>
<div class="flex flex-col gap-3 pt-2">
<grouptriggeraction--ml-button-standard size="lg" data-variant="primary" data-class="w-full min-h-11" .loading=${commandLoading} ?disabled=${commandLoading} @action=${() => editing ? this.atualizarItemCardapio() : this.cadastrarItemCardapio()}>
<Label>${editing ? this.msg['form.update'] : this.msg['form.create']}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard size="md" data-variant="secondary" data-class="w-full min-h-11" ?disabled=${commandLoading} @action=${() => this.setScenario('lista')}>
<Label>${this.msg['form.cancel']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>
`;
}
}
