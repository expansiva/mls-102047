/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ProdutosShared } from '/_102047_/l2/controleEstoque/web/shared/produtos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-input.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import type { ListProdutoItem } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
type ProdutoStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
/// **collab_i18n_start**
const pageMessage_ptBR = {
productWithoutName: 'Produto sem nome',
unavailable: '—',
active: 'Ativo',
inactive: 'Inativo',
merged: 'Mesclado',
blocked: 'Bloqueado',
loadingProducts: 'Carregando produtos…',
productsError: 'Não foi possível consultar os produtos.',
noProducts: 'Nenhum produto encontrado.',
lowStock: 'Saldo baixo',
withinMinimum: 'Dentro do mínimo',
loadingAlerts: 'Carregando avisos…',
noLowStock: 'Nenhum produto abaixo do mínimo.',
searchEmpty: 'Nenhum produto corresponde à pesquisa.',
loadingProduct: 'Carregando produto…',
unavailableProduct: 'Produto indisponível.',
createProduct: 'Cadastrar produto',
minimumHelp: 'Informe uma quantidade mínima maior ou igual a zero.',
creatingProduct: 'Cadastrando produto…',
productCreated: 'Produto cadastrado com sucesso.',
createProductError: 'Não foi possível cadastrar o produto.',
stockMovement: 'Movimentação de estoque',
movementHelp: 'Registre uma entrada ou saída para atualizar o saldo do produto selecionado.',
movementAvailable: 'Esta operação permanece disponível conforme o produto selecionado e os dados de movimentação.',
movementCreating: 'Registrando movimentação…',
movementCreated: 'Movimentação registrada com sucesso.',
movementError: 'Não foi possível registrar a movimentação.',
};
type PageMessageType = typeof pageMessage_ptBR;
const pageMessages: Record<string, PageMessageType> = { ptBR: pageMessage_ptBR, 'pt-BR': pageMessage_ptBR, default: pageMessage_ptBR };
/// **collab_i18n_end**
@customElement('controle-estoque--web--mobile--page11--produtos-102047')
export class ControleEstoqueProdutosPage11 extends ProdutosShared {
private statusLabel(status: ProdutoStatus): string {
const labels: Record<ProdutoStatus, string> = { Active: pageMessage_ptBR.active, Inactive: pageMessage_ptBR.inactive, Merged: pageMessage_ptBR.merged, Blocked: pageMessage_ptBR.blocked };
return labels[status];
}
private productName(product: ListProdutoItem): string { return product.details.identification?.name ?? pageMessage_ptBR.productWithoutName; }
private productUnit(product: ListProdutoItem): string { return product.details.product?.unitOfMeasure ?? pageMessage_ptBR.unavailable; }
private productBalance(product: ListProdutoItem): number | null { return product.details.controleEstoque?.saldoAtual ?? null; }
private productMinimum(product: ListProdutoItem): number | null { return product.details.controleEstoque?.quantidadeMinima ?? null; }
private isLow(product: ListProdutoItem): boolean { return product.details.controleEstoque?.saldoAbaixoDoMinimo === true; }
private readonly onSearch = (event: Event): void => { const detail = (event as CustomEvent<{ query?: unknown }>).detail; const query = typeof detail?.query === 'string' ? detail.query : ''; this.setListProdutoDetailsIdentificationName(query || null); void this.runListProduto(); };
private readonly onSearchChange = (event: Event): void => { const detail = (event as CustomEvent<{ value?: unknown }>).detail; const value = typeof detail?.value === 'string' ? detail.value : ''; this.setListProdutoDetailsIdentificationName(value || null); void this.runListProduto(); };
private readonly onStatusChange = (event: Event): void => { const target = event.target as HTMLSelectElement | null; const value = target?.value ?? ''; const status: ProdutoStatus | null = value === '' ? null : value as ProdutoStatus; this.setListProdutoDetailsIdentificationStatus(status); void this.runListProduto(); };
private readonly onSubtypeChange = (event: Event): void => { const target = event.target as HTMLSelectElement | null; const value = target?.value ?? ''; this.setListProdutoDetailsIdentificationSubtype(value === 'Product' ? 'Product' : null); void this.runListProduto(); };
private readonly onProductSelect = (event: Event): void => { const detail = (event as CustomEvent<{ index?: unknown }>).detail; if (typeof detail?.index !== 'number') return; const product = this.stateListProdutoResult[detail.index]; if (!product) return; this.setListProdutoId(product.id); this.enterDetailScenario(); };
private readonly onNameInput = (event: Event): void => { const detail = (event as CustomEvent<{ value?: unknown }>).detail; this.setCreateProdutoDetailsIdentificationName(typeof detail?.value === 'string' ? detail.value : null); };
private readonly onUnitInput = (event: Event): void => { const detail = (event as CustomEvent<{ value?: unknown }>).detail; this.setCreateProdutoDetailsProductUnitOfMeasure(typeof detail?.value === 'string' ? detail.value : null); };
private readonly onMinimumInput = (event: Event): void => { const detail = (event as CustomEvent<{ value?: unknown }>).detail; const value = detail?.value; this.setCreateProdutoDetailsControleEstoqueQuantidadeMinima(typeof value === 'number' && Number.isFinite(value) ? value : null); };
private renderListFeedback(): TemplateResult { if (this.stateListProdutoStatus === 'loading') return html`<p role="status">${pageMessage_ptBR.loadingProducts}</p>`; if (this.stateListProdutoStatus === 'error') return html`<p role="alert">${this.stateListProdutoError?.message ?? pageMessage_ptBR.productsError}</p>`; if (this.stateListProdutoResult.length === 0) return html`<p role="status">${pageMessage_ptBR.noProducts}</p>`; return html``; }
private renderProductRows(products: ListProdutoItem[]): TemplateResult { return html`<groupviewdata--ml-vertical-record-list .loading=${this.stateListProdutoStatus === 'loading'} .hoverable=${true} @row-click=${this.onProductSelect}><Columns><Column field="name" header="Produto"></Column><Column field="status" header="Situação"></Column><Column field="balance" header="Saldo atual"></Column><Column field="minimum" header="Quantidade mínima"></Column><Column field="unit" header="Unidade"></Column><Column field="warning" header="Aviso"></Column></Columns><Rows>${products.map((product: ListProdutoItem) => html`<Row><Cell>${this.productName(product)}</Cell><Cell>${this.statusLabel(product.details.identification?.status ?? 'Inactive')}</Cell><Cell>${this.productBalance(product) ?? pageMessage_ptBR.unavailable}</Cell><Cell>${this.productMinimum(product) ?? pageMessage_ptBR.unavailable}</Cell><Cell>${this.productUnit(product)}</Cell><Cell>${this.isLow(product) ? pageMessage_ptBR.lowStock : pageMessage_ptBR.withinMinimum}</Cell></Row>`)}</Rows><Empty><span>${pageMessage_ptBR.noProducts}</span></Empty><Loading><span role="status">${pageMessage_ptBR.loadingProducts}</span></Loading></groupviewdata--ml-vertical-record-list>`; }
private renderSummary(): TemplateResult { return html`<section aria-labelledby="produtos-summary-title"><h2 id="produtos-summary-title">Saldos atuais</h2><p>Consulte o saldo atual por produto, com unidade de medida.</p>${this.renderListFeedback()}${this.renderProductRows(this.stateListProdutoResult)}</section>`; }
private renderHighlights(): TemplateResult { const lowProducts = this.stateListProdutoResult.filter((product: ListProdutoItem) => this.isLow(product)); return html`<section aria-labelledby="produtos-highlights-title"><h2 id="produtos-highlights-title">Avisos de saldo baixo</h2>${this.stateListProdutoStatus === 'loading' ? html`<p role="status">${pageMessage_ptBR.loadingAlerts}</p>` : nothing}${this.stateListProdutoStatus === 'error' ? html`<p role="alert">${this.stateListProdutoError?.message ?? pageMessage_ptBR.productsError}</p>` : nothing}${this.stateListProdutoStatus === 'success' && lowProducts.length === 0 ? html`<p role="status">${pageMessage_ptBR.noLowStock}</p>` : nothing}${lowProducts.map((product: ListProdutoItem) => html`<article class="product-highlight"><h3>${this.productName(product)}</h3><p>Saldo atual: ${this.productBalance(product) ?? pageMessage_ptBR.unavailable} ${this.productUnit(product)}</p><p>Quantidade mínima: ${this.productMinimum(product) ?? pageMessage_ptBR.unavailable} ${this.productUnit(product)}</p><p role="status">${pageMessage_ptBR.lowStock}</p></article>`)}</section>`; }
private renderFiltersAndList(): TemplateResult { return html`<section aria-labelledby="produtos-list-title"><h2 id="produtos-list-title">Produtos</h2><groupsearchcontent--ml-search-bar .value=${this.stateListProdutoDetailsIdentificationName} @search=${this.onSearch} @change=${this.onSearchChange} placeholder="Pesquisar pelo nome"><Label>Pesquisar produtos</Label><Empty>${pageMessage_ptBR.searchEmpty}</Empty></groupsearchcontent--ml-search-bar><div class="filters" aria-label="Filtros de produtos"><label>Tipo<select @change=${this.onSubtypeChange}><option value="">Todos</option><option value="Product">Produto</option></select></label><label>Situação<select @change=${this.onStatusChange}><option value="">Todas</option><option value="Active">Ativo</option><option value="Inactive">Inativo</option><option value="Merged">Mesclado</option><option value="Blocked">Bloqueado</option></select></label></div>${this.renderListFeedback()}${this.renderProductRows(this.stateListProdutoResult)}</section>`; }
private renderDetail(): TemplateResult { const product = this.stateListProdutoResult.find((item: ListProdutoItem) => item.id === this.stateListProdutoId); if (this.stateListProdutoStatus === 'loading') return html`<p role="status">${pageMessage_ptBR.loadingProduct}</p>`; if (this.stateListProdutoStatus === 'error') return html`<p role="alert">${this.stateListProdutoError?.message ?? pageMessage_ptBR.productsError}</p>`; if (!product) return html`<p role="status">${pageMessage_ptBR.unavailableProduct}</p>`; return html`<section aria-labelledby="produto-detail-title"><h2 id="produto-detail-title">${this.productName(product)}</h2><dl><dt>Situação</dt><dd>${this.statusLabel(product.details.identification?.status ?? 'Inactive')}</dd><dt>Unidade de medida</dt><dd>${this.productUnit(product)}</dd><dt>Saldo atual</dt><dd>${this.productBalance(product) ?? pageMessage_ptBR.unavailable}</dd><dt>Quantidade mínima</dt><dd>${this.productMinimum(product) ?? pageMessage_ptBR.unavailable}</dd><dt>Aviso</dt><dd>${this.isLow(product) ? pageMessage_ptBR.lowStock : pageMessage_ptBR.withinMinimum}</dd></dl></section>`; }
private renderCreateProduct(): TemplateResult { return html`<section aria-labelledby="create-product-title"><h2 id="create-product-title">${pageMessage_ptBR.createProduct}</h2><p>${pageMessage_ptBR.minimumHelp}</p><groupentertext--ml-enter-text .value=${this.stateCreateProdutoDetailsIdentificationName ?? ''} @input=${this.onNameInput} required><Label>Nome do produto</Label></groupentertext--ml-enter-text><groupentertext--ml-enter-text .value=${this.stateCreateProdutoDetailsProductUnitOfMeasure ?? ''} @input=${this.onUnitInput} required><Label>Unidade de medida</Label></groupentertext--ml-enter-text><groupenternumber--ml-number-input .value=${this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima} .min=${0} .decimals=${0} @input=${this.onMinimumInput} required><Label>Quantidade mínima</Label></groupenternumber--ml-number-input>${this.stateCreateProdutoStatus === 'loading' ? html`<p role="status">${pageMessage_ptBR.creatingProduct}</p>` : nothing}${this.stateCreateProdutoStatus === 'success' ? html`<p role="status">${pageMessage_ptBR.productCreated}</p>` : nothing}${this.stateCreateProdutoStatus === 'error' ? html`<p role="alert">${this.stateCreateProdutoError?.message ?? pageMessage_ptBR.createProductError}</p>` : nothing}<grouptriggeraction--ml-button-standard .loading=${this.stateCreateProdutoStatus === 'loading'} .disabled=${this.stateCreateProdutoStatus === 'loading'} @action=${(): void => { void this.runCreateProduto(); }}><Label>${pageMessage_ptBR.createProduct}</Label></grouptriggeraction--ml-button-standard></section>`; }
private renderMovementActions(): TemplateResult { return html`<section aria-labelledby="movement-title"><h2 id="movement-title">${pageMessage_ptBR.stockMovement}</h2><p>${pageMessage_ptBR.movementHelp}</p><p>${pageMessage_ptBR.movementAvailable}</p>${this.stateCreateMovimentacaoEstoqueStatus === 'loading' ? html`<p role="status">${pageMessage_ptBR.movementCreating}</p>` : nothing}${this.stateCreateMovimentacaoEstoqueStatus === 'success' ? html`<p role="status">${pageMessage_ptBR.movementCreated}</p>` : nothing}${this.stateCreateMovimentacaoEstoqueStatus === 'error' ? html`<p role="alert">${this.stateCreateMovimentacaoEstoqueError?.message ?? pageMessage_ptBR.movementError}</p>` : nothing}</section>`; }
render(): TemplateResult { return html`<main><header><h1>Produtos</h1><p>Consulte saldos, acompanhe avisos e cadastre produtos.</p></header><molecules--ml-scenary-102020 .value=${this.scenary} mode="scenary" @change=${this.handleUiScenaryChange}><Scene value="base" title="Consulta"><div class="page-content">${this.renderSummary()}${this.renderHighlights()}${this.renderFiltersAndList()}</div></Scene><Scene value="detail" title="Detalhes">${this.renderDetail()}</Scene><Scene value="createProduto" title="Cadastro"><div class="page-content">${this.renderCreateProduct()}${this.renderMovementActions()}</div></Scene><Scene value="createMovimentacaoEstoque" title="Movimentação">${this.renderMovementActions()}</Scene></molecules--ml-scenary-102020></main>`; }
}
