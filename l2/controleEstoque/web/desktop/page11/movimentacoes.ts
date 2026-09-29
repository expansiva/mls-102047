/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/movimentacoes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-input.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import { MovimentacoesShared } from '/_102047_/l2/controleEstoque/web/shared/movimentacoes.js';
import type { ListMovimentacaoEstoqueItem, ListProdutoItem } from '/_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Movimentações',
pageDescription: 'Consulte o histórico e registre entradas ou saídas de estoque.',
history: 'Histórico de movimentações',
historyDescription: 'Consulte entradas e saídas registradas no estoque.',
filterProduct: 'Filtrar por produto',
allProducts: 'Todos os produtos',
stockMovements: 'Movimentações de estoque',
noMovements: 'Nenhuma movimentação registrada.',
loadingMovements: 'Buscando registros de movimentação…',
register: 'Registrar movimentação',
registerDescription: 'Informe uma entrada ou saída para atualizar o saldo do produto.',
selectProduct: 'Selecione um produto',
noProducts: 'Nenhum produto disponível.',
currentBalance: 'Saldo atual',
minimumQuantity: 'Quantidade mínima',
belowMinimum: 'Saldo abaixo do mínimo.',
dateTime: 'Data e hora da movimentação',
dateTimeHelper: 'Informe quando a entrada ou saída ocorreu.',
movementType: 'Tipo de movimentação',
movementTypePlaceholder: 'Selecione o tipo',
entry: 'Entrada',
exit: 'Saída',
quantity: 'Quantidade',
quantityHelper: 'Informe um número inteiro positivo.',
actions: 'Ações',
registering: 'Registrando…',
registered: 'Movimentação registrada com sucesso.',
requiredProduct: 'Produto é obrigatório.',
requiredDateTime: 'Data e hora da movimentação são obrigatórias.',
requiredType: 'Tipo de movimentação é obrigatório.',
requiredQuantity: 'Quantidade é obrigatória.',
loadError: 'Não foi possível carregar os dados.',
createError: 'Não foi possível registrar a movimentação.',
emptyContext: 'Selecione um produto para consultar o saldo e registrar a movimentação.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessage_en: PageMessageType = {
pageTitle: 'Movimentações', pageDescription: 'Consulte o histórico e registre entradas ou saídas de estoque.',
history: 'Histórico de movimentações', historyDescription: 'Consulte entradas e saídas registradas no estoque.',
filterProduct: 'Filtrar por produto', allProducts: 'Todos os produtos', stockMovements: 'Movimentações de estoque',
noMovements: 'Nenhuma movimentação registrada.', loadingMovements: 'Buscando registros de movimentação…',
register: 'Registrar movimentação', registerDescription: 'Informe uma entrada ou saída para atualizar o saldo do produto.',
selectProduct: 'Selecione um produto', noProducts: 'Nenhum produto disponível.', currentBalance: 'Saldo atual',
minimumQuantity: 'Quantidade mínima', belowMinimum: 'Saldo abaixo do mínimo.',
dateTime: 'Data e hora da movimentação', dateTimeHelper: 'Informe quando a entrada ou saída ocorreu.',
movementType: 'Tipo de movimentação', movementTypePlaceholder: 'Selecione o tipo', entry: 'Entrada', exit: 'Saída',
quantity: 'Quantidade', quantityHelper: 'Informe um número inteiro positivo.', actions: 'Ações',
registering: 'Registrando…', registered: 'Movimentação registrada com sucesso.',
requiredProduct: 'Produto é obrigatório.', requiredDateTime: 'Data e hora da movimentação são obrigatórias.',
requiredType: 'Tipo de movimentação é obrigatório.', requiredQuantity: 'Quantidade é obrigatória.',
loadError: 'Não foi possível carregar os dados.', createError: 'Não foi possível registrar a movimentação.',
emptyContext: 'Selecione um produto para consultar o saldo e registrar a movimentação.',
};
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt, 'pt-BR': pageMessage_pt, en: pageMessage_en };
/// **collab_i18n_end**
type TipoMovimentacao = 'entrada' | 'saida';
type SelectChangeDetail = { value: string | null };
type DateChangeDetail = { value: string | null };
type NumberChangeDetail = { value: number | null };
@customElement('controle-estoque--web--desktop--page11--movimentacoes-102047')
export class ControleEstoqueMovimentacoes extends MovimentacoesShared {
private readonly onProductForCreate = (event: Event): void => {
const detail = (event as CustomEvent<SelectChangeDetail>).detail;
this.selectCreateMovimentacaoEstoqueProdutoId(detail?.value ?? null);
};
private readonly onProductForList = (event: Event): void => {
const detail = (event as CustomEvent<SelectChangeDetail>).detail;
this.selectListMovimentacaoEstoqueProdutoId(detail?.value ?? null);
void this.runListMovimentacaoEstoque();
};
private readonly onDateChange = (event: Event): void => {
const detail = (event as CustomEvent<DateChangeDetail>).detail;
this.setCreateMovimentacaoEstoqueMovimentadoEm(detail?.value ?? null);
};
private readonly onTipoChange = (event: Event): void => {
const detail = (event as CustomEvent<SelectChangeDetail>).detail;
const value = detail?.value;
this.setCreateMovimentacaoEstoqueDetailsTipo(value === 'entrada' || value === 'saida' ? value : null);
};
private readonly onQuantityChange = (event: Event): void => {
const detail = (event as CustomEvent<NumberChangeDetail>).detail;
this.setCreateMovimentacaoEstoqueDetailsQuantidade(detail?.value ?? null);
};
private readonly onCreate = (): void => {
void this.runCreateMovimentacaoEstoque();
};
private productName(productId: string | null): string {
if (!productId) return '';
const product = this.stateListProdutoResult.find((item: ListProdutoItem): boolean => item.id === productId);
return product?.details.identification?.name ?? '';
}
private selectedProduct(): ListProdutoItem | undefined {
const id = this.stateCreateMovimentacaoEstoqueProdutoId;
return id ? this.stateListProdutoResult.find((item: ListProdutoItem): boolean => item.id === id) : undefined;
}
private renderProductItems(): TemplateResult[] {
return this.stateListProdutoResult.map((product: ListProdutoItem): TemplateResult => html`
<Item value=${product.id}>${product.details.identification?.name ?? product.id}</Item>
`);
}
private renderProductContext(): TemplateResult {
const product = this.selectedProduct();
if (!product) {
return html`<p class="movimentacoes-empty-context">Selecione um produto para consultar o saldo e registrar a movimentação.</p>`;
}
const estoque = product.details.controleEstoque;
const saldo = estoque?.saldoAtual;
const minimo = estoque?.quantidadeMinima;
return html`
<section class="movimentacoes-product-context" aria-labelledby="movimentacoes-product-context-title">
<h3 id="movimentacoes-product-context-title">${product.details.identification?.name ?? product.id}</h3>
<dl>
<div><dt>Saldo atual</dt><dd>${saldo ?? '—'}</dd></div>
<div><dt>Quantidade mínima</dt><dd>${minimo ?? '—'}</dd></div>
</dl>
${estoque?.saldoAbaixoDoMinimo === true
? html`<p role="status">Saldo abaixo do mínimo.</p>`
: nothing}
</section>
`;
}
private renderList(): TemplateResult {
const rows = this.stateListMovimentacaoEstoqueResult;
const error = this.stateListMovimentacaoEstoqueError?.message ?? '';
const loading = this.stateListMovimentacaoEstoqueStatus === 'loading';
return html`
<section class="movimentacoes-list" aria-labelledby="movimentacoes-list-title">
<div class="movimentacoes-section-heading">
<div>
<h2 id="movimentacoes-list-title">Histórico de movimentações</h2>
<p>Consulte entradas e saídas registradas no estoque.</p>
</div>
<groupselectone--ml-select
name="produto-filtro"
.value=${this.stateListMovimentacaoEstoqueProdutoId}
?loading=${this.stateListProdutoStatus === 'loading'}
@change=${this.onProductForList}>
<Label>Filtrar por produto</Label>
<Trigger>${this.stateListMovimentacaoEstoqueProdutoId ? this.productName(this.stateListMovimentacaoEstoqueProdutoId) : 'Todos os produtos'}</Trigger>
<Item value="">Todos os produtos</Item>
${this.renderProductItems()}
</groupselectone--ml-select>
</div>
${error ? html`<p class="movimentacoes-error" role="alert">${error}</p>` : nothing}
<groupviewtable--ml-responsive-table
.loading=${loading}
.error=${error}
data-class="movimentacoes-table">
<Caption>Movimentações de estoque</Caption>
<TableHeader>
<TableRow>
<TableHead key="produto">Produto</TableHead>
<TableHead key="movimentadoEm" sortable>Data e hora</TableHead>
<TableHead key="tipo">Tipo</TableHead>
<TableHead key="quantidade" sortable>Quantidade</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${rows.map((row: ListMovimentacaoEstoqueItem): TemplateResult => html`
<TableRow key=${row.id}>
<TableCell>${row.movimentacaoEstoqueProduto?.details?.identification?.name ?? row.produtoId}</TableCell>
<TableCell>${row.movimentadoEm}</TableCell>
<TableCell>${row.details.tipo === 'entrada' ? 'Entrada' : 'Saída'}</TableCell>
<TableCell sort-value=${String(row.details.quantidade)}>${row.details.quantidade}</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>Nenhuma movimentação registrada.</Empty>
<Loading>Buscando registros de movimentação…</Loading>
</groupviewtable--ml-responsive-table>
</section>
`;
}
private renderForm(): TemplateResult {
const productId = this.stateCreateMovimentacaoEstoqueProdutoId;
const error = this.stateCreateMovimentacaoEstoqueError?.message ?? '';
return html`
<section class="movimentacoes-form" aria-labelledby="movimentacoes-form-title">
<h2 id="movimentacoes-form-title">Registrar movimentação</h2>
<p>Informe uma entrada ou saída para atualizar o saldo do produto.</p>
<groupselectone--ml-select
name="produto"
required
.value=${productId}
?loading=${this.stateListProdutoStatus === 'loading'}
@change=${this.onProductForCreate}>
<Label>Produto</Label>
<Trigger>${productId ? this.productName(productId) : 'Selecione um produto'}</Trigger>
${this.renderProductItems()}
<Empty>Nenhum produto disponível.</Empty>
</groupselectone--ml-select>
${this.renderProductContext()}
<groupenterdatetime--ml-datetime-picker
name="movimentadoEm"
locale="pt-BR"
required
.value=${this.stateCreateMovimentacaoEstoqueMovimentadoEm}
@change=${this.onDateChange}>
<Label>Data e hora da movimentação</Label>
<Helper>Informe quando a entrada ou saída ocorreu.</Helper>
</groupenterdatetime--ml-datetime-picker>
<groupselectone--ml-select
name="tipo"
required
.value=${this.stateCreateMovimentacaoEstoqueDetailsTipo}
@change=${this.onTipoChange}>
<Label>Tipo de movimentação</Label>
<Trigger>${this.stateCreateMovimentacaoEstoqueDetailsTipo === 'entrada' ? 'Entrada' : this.stateCreateMovimentacaoEstoqueDetailsTipo === 'saida' ? 'Saída' : 'Selecione o tipo'}</Trigger>
<Item value="entrada">Entrada</Item>
<Item value="saida">Saída</Item>
</groupselectone--ml-select>
<groupenternumber--ml-number-input
name="quantidade"
required
min="1"
step="1"
decimals="0"
.value=${this.stateCreateMovimentacaoEstoqueDetailsQuantidade}
@change=${this.onQuantityChange}>
<Label>Quantidade</Label>
<Helper>Informe um número inteiro positivo.</Helper>
</groupenternumber--ml-number-input>
${error ? html`<p class="movimentacoes-error" role="alert">${error}</p>` : nothing}
</section>
`;
}
private renderActions(): TemplateResult {
const busy = this.stateCreateMovimentacaoEstoqueStatus === 'loading';
const success = this.stateCreateMovimentacaoEstoqueStatus === 'success';
const error = this.stateCreateMovimentacaoEstoqueStatus === 'error';
return html`
<section class="movimentacoes-actions" aria-labelledby="movimentacoes-actions-title">
<h2 id="movimentacoes-actions-title">Ações</h2>
<grouptriggeraction--ml-button-standard
data-variant="primary"
?loading=${busy}
?disabled=${busy}
@action=${this.onCreate}>
<Label>${busy ? 'Registrando…' : 'Registrar movimentação'}</Label>
</grouptriggeraction--ml-button-standard>
${success ? html`<p class="movimentacoes-feedback" role="status">Movimentação registrada com sucesso.</p><groupnotifyuser--ml-contextual-feedback type="success" visible><Message>Movimentação registrada com sucesso.</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}
${error ? html`<p class="movimentacoes-feedback" role="alert">${this.stateCreateMovimentacaoEstoqueError?.message ?? 'Não foi possível registrar a movimentação.'}</p><groupnotifyuser--ml-contextual-feedback type="error" visible><Message>${this.stateCreateMovimentacaoEstoqueError?.message ?? 'Não foi possível registrar a movimentação.'}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}
</section>
`;
}
protected override render(): TemplateResult {
const active = this.scenary;
return html`
<main class="controleestoque-movimentacoes" aria-labelledby="movimentacoes-page-title">
<header class="movimentacoes-page-header">
<h1 id="movimentacoes-page-title">Movimentações</h1>
<p>Consulte o histórico e registre entradas ou saídas de estoque.</p>
</header>
<molecules--ml-scenary-102020
mode="tabs"
.value=${active}
@change=${this.handleUiScenaryChange}>
<Scene value="base" title="Histórico">
${this.renderList()}
</Scene>
<Scene value="createMovimentacaoEstoque" title="Registrar movimentação">
<div class="movimentacoes-create-layout">
${this.renderForm()}
${this.renderActions()}
</div>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
