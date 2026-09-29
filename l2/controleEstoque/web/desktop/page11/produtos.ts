/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/produtos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ProdutosShared } from '/_102047_/l2/controleEstoque/web/shared/produtos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-input.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
/// **collab_i18n_start**
const pageMessage_ptBR = {
title: 'Produtos',
loading: 'Carregando produtos…',
empty: 'Nenhum produto encontrado.',
error: 'Não foi possível consultar os produtos.',
createMovimentacaoEstoqueSuccess: 'Movimentação registrada com sucesso.',
createProdutoSuccess: 'Produto cadastrado com sucesso.'
};
type PageMessageType = typeof pageMessage_ptBR;
const pageMessages: Record<string, PageMessageType> = { 'pt-BR': pageMessage_ptBR };
/// **collab_i18n_end**
type ProdutoStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
type TipoMovimentacao = 'entrada' | 'saida';
type ProdutoRow = ProdutosShared['stateListProdutoResult'][number];
@customElement('controle-estoque--web--desktop--page11--produtos-102047')
export class Produtos extends ProdutosShared {
private get msg(): PageMessageType {
const locale = document.documentElement.lang || 'pt-BR';
return pageMessages[locale] ?? pageMessages['pt-BR'];
}
private formatStatus(status: ProdutoStatus): string {
const labels: Record<ProdutoStatus, string> = { Active: 'Ativo', Inactive: 'Inativo', Merged: 'Mesclado', Blocked: 'Bloqueado' };
return labels[status];
}
private formatNumber(value: number | undefined): string { return value === undefined ? '—' : new Intl.NumberFormat('pt-BR').format(value); }
private onNameInput(event: Event): void { const detail = (event as CustomEvent<{ value: string }>).detail; if (detail && typeof detail.value === 'string') this.setCreateProdutoDetailsIdentificationName(detail.value); }
private onUnitInput(event: Event): void { const detail = (event as CustomEvent<{ value: string }>).detail; if (detail && typeof detail.value === 'string') this.setCreateProdutoDetailsProductUnitOfMeasure(detail.value); }
private onMinimumInput(event: Event): void { const detail = (event as CustomEvent<{ value: number | null }>).detail; if (detail && (typeof detail.value === 'number' || detail.value === null)) this.setCreateProdutoDetailsControleEstoqueQuantidadeMinima(detail.value); }
private onMovementQuantity(event: Event): void { const detail = (event as CustomEvent<{ value: number | null }>).detail; if (detail && (typeof detail.value === 'number' || detail.value === null)) this.setCreateMovimentacaoEstoqueDetailsQuantidade(detail.value); }
private onMovementType(event: Event): void { const value = (event.target as HTMLSelectElement | null)?.value; this.setCreateMovimentacaoEstoqueDetailsTipo(value === 'entrada' || value === 'saida' ? value : null); }
private onMovementProduct(event: Event): void { this.selectCreateMovimentacaoEstoqueProdutoId((event.target as HTMLSelectElement | null)?.value || null); }
private onMovementDate(event: Event): void { this.setCreateMovimentacaoEstoqueMovimentadoEm((event.target as HTMLInputElement | null)?.value || null); }
private onProductSelect(event: Event): void {
const detail = (event as CustomEvent<{ index: number }>).detail;
if (!detail || typeof detail.index !== 'number') return;
const row = this.stateListProdutoResult[detail.index];
if (row) { this.setListProdutoId(row.id); this.setUiScenary('detail'); }
}
private renderStatus(status: ProdutosShared['stateListProdutoStatus'], error: ProdutosShared['stateListProdutoError']): TemplateResult {
if (status === 'loading') return html`<p role="status" aria-live="polite">${this.msg.loading}</p>`;
if (status === 'error') return html`<p role="alert">${error?.message || this.msg.error}</p>`;
if (status === 'success' && this.stateListProdutoResult.length === 0) return html`<p role="status">${this.msg.empty}</p>`;
return html``;
}
private renderProductRows(rows: ProdutoRow[]): TemplateResult {
return html`<groupviewdata--ml-vertical-record-list .hoverable=${true} @row-click=${(event: Event) => this.onProductSelect(event)}>
<Columns><Column field="name" header="Produto"></Column><Column field="status" header="Situação"></Column><Column field="unit" header="Unidade"></Column><Column field="balance" header="Saldo"></Column><Column field="minimum" header="Mínimo"></Column><Column field="warning" header="Aviso"></Column></Columns>
<Rows>${rows.map((row: ProdutoRow) => html`<Row><Cell>${row.details.identification?.name || '—'}</Cell><Cell>${row.details.identification?.status ? this.formatStatus(row.details.identification.status) : '—'}</Cell><Cell>${row.details.product?.unitOfMeasure || '—'}</Cell><Cell>${this.formatNumber(row.details.controleEstoque?.saldoAtual)}</Cell><Cell>${this.formatNumber(row.details.controleEstoque?.quantidadeMinima)}</Cell><Cell>${row.details.controleEstoque?.saldoAbaixoDoMinimo ? 'Saldo baixo' : 'Normal'}</Cell></Row>`)}</Rows>
<Empty><span>${this.msg.empty}</span></Empty><Loading><span role="status">${this.msg.loading}</span></Loading>
</groupviewdata--ml-vertical-record-list>`;
}
private renderBase(): TemplateResult {
const rows = this.stateListProdutoResult;
return html`<section aria-labelledby="produtos-titulo"><div class="page-heading"><h1 id="produtos-titulo">${this.msg.title}</h1><p>Consulte saldos, mínimos configurados e avisos de estoque baixo.</p></div>
<div class="page-actions"><grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => this.setUiScenary('createProduto')}><Label>Cadastrar produto</Label></grouptriggeraction--ml-button-standard><grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.setUiScenary('createMovimentacaoEstoque')}><Label>Registrar entrada ou saída</Label></grouptriggeraction--ml-button-standard></div>
<section aria-labelledby="estoque-resumo"><h2 id="estoque-resumo">Posição do estoque</h2>${this.renderStatus(this.stateListProdutoStatus, this.stateListProdutoError)}${this.renderProductRows(rows)}</section>
<section aria-labelledby="estoque-alertas"><h2 id="estoque-alertas">Produtos com saldo baixo</h2>${this.stateListProdutoStatus === 'loading' ? html`<p role="status">Carregando avisos…</p>` : nothing}${this.stateListProdutoStatus === 'error' ? html`<p role="alert">Não foi possível consultar os avisos de saldo baixo.</p>` : nothing}${this.stateListProdutoStatus === 'success' && rows.filter((row: ProdutoRow) => row.details.controleEstoque?.saldoAbaixoDoMinimo === true).length === 0 ? html`<p role="status">Nenhum produto sinalizado.</p>` : nothing}${rows.filter((row: ProdutoRow) => row.details.controleEstoque?.saldoAbaixoDoMinimo === true).map((row: ProdutoRow) => html`<p>${row.details.identification?.name || 'Produto'} — saldo ${this.formatNumber(row.details.controleEstoque?.saldoAtual)}, mínimo ${this.formatNumber(row.details.controleEstoque?.quantidadeMinima)}. Saldo baixo.</p>`)}</section>
</section>`;
}
private renderDetail(): TemplateResult {
const product = this.stateListProdutoResult.find((row: ProdutoRow) => row.id === this.stateListProdutoId);
if (this.stateListProdutoStatus === 'loading') return html`<p role="status">Consultando produto…</p>`;
if (this.stateListProdutoStatus === 'error') return html`<p role="alert">${this.stateListProdutoError?.message || 'Não foi possível consultar o produto.'}</p>`;
if (!product) return html`<p role="status">Produto indisponível.</p>`;
return html`<section aria-labelledby="produto-detalhe"><h2 id="produto-detalhe">${product.details.identification?.name || 'Produto'}</h2><dl><dt>Situação</dt><dd>${product.details.identification?.status ? this.formatStatus(product.details.identification.status) : '—'}</dd><dt>Unidade de medida</dt><dd>${product.details.product?.unitOfMeasure || '—'}</dd><dt>Saldo atual</dt><dd>${this.formatNumber(product.details.controleEstoque?.saldoAtual)}</dd><dt>Quantidade mínima</dt><dd>${this.formatNumber(product.details.controleEstoque?.quantidadeMinima)}</dd><dt>Aviso</dt><dd>${product.details.controleEstoque?.saldoAbaixoDoMinimo ? 'Saldo baixo' : 'Normal'}</dd></dl></section>`;
}
private renderCreateProduct(): TemplateResult {
const busy = this.stateCreateProdutoStatus === 'loading';
return html`<section aria-labelledby="novo-produto"><h2 id="novo-produto">Cadastrar produto</h2><p>Informe a quantidade mínima, que deve ser maior ou igual a zero.</p><groupentertext--ml-enter-text .value=${this.stateCreateProdutoDetailsIdentificationName || ''} .isEditing=${true} required @input=${(event: Event) => this.onNameInput(event)}><Label>Nome do produto</Label></groupentertext--ml-enter-text><groupentertext--ml-enter-text .value=${this.stateCreateProdutoDetailsProductUnitOfMeasure || ''} .isEditing=${true} required @input=${(event: Event) => this.onUnitInput(event)}><Label>Unidade de medida</Label></groupentertext--ml-enter-text><groupenternumber--ml-number-input .value=${this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima} .isEditing=${true} .min=${0} required @input=${(event: Event) => this.onMinimumInput(event)}><Label>Quantidade mínima</Label></groupenternumber--ml-number-input>${this.stateCreateProdutoError ? html`<p role="alert">${this.stateCreateProdutoError.message}</p>` : nothing}${this.stateCreateProdutoStatus === 'success' ? html`<p role="status">${this.msg.createProdutoSuccess}</p>` : nothing}<grouptriggeraction--ml-button-standard data-variant="primary" .loading=${busy} .disabled=${busy} @action=${() => void this.runCreateProduto()}><Label>Cadastrar produto</Label></grouptriggeraction--ml-button-standard></section>`;
}
private renderCreateMovement(): TemplateResult {
const busy = this.stateCreateMovimentacaoEstoqueStatus === 'loading'; const products = this.stateListProdutoResult;
return html`<section aria-labelledby="nova-movimentacao"><h2 id="nova-movimentacao">Registrar entrada ou saída</h2><label>Produto <select .value=${this.stateCreateMovimentacaoEstoqueProdutoId || ''} @change=${(event: Event) => this.onMovementProduct(event)}><option value="">Selecione um produto</option>${products.map((row: ProdutoRow) => html`<option value=${row.id}>${row.details.identification?.name || row.id}</option>`)}</select></label><label>Data e hora <input type="datetime-local" .value=${this.stateCreateMovimentacaoEstoqueMovimentadoEm || ''} @change=${(event: Event) => this.onMovementDate(event)}></label><label>Tipo <select .value=${this.stateCreateMovimentacaoEstoqueDetailsTipo || ''} @change=${(event: Event) => this.onMovementType(event)}><option value="">Selecione</option><option value="entrada">Entrada</option><option value="saida">Saída</option></select></label><groupenternumber--ml-number-input .value=${this.stateCreateMovimentacaoEstoqueDetailsQuantidade} .isEditing=${true} .min=${1} required @input=${(event: Event) => this.onMovementQuantity(event)}><Label>Quantidade</Label></groupenternumber--ml-number-input>${this.stateCreateMovimentacaoEstoqueError ? html`<p role="alert">${this.stateCreateMovimentacaoEstoqueError.message}</p>` : nothing}${this.stateCreateMovimentacaoEstoqueStatus === 'success' ? html`<p role="status">${this.msg.createMovimentacaoEstoqueSuccess}</p>` : nothing}<grouptriggeraction--ml-button-standard data-variant="primary" .loading=${busy} .disabled=${busy} @action=${() => void this.runCreateMovimentacaoEstoque()}><Label>Registrar movimentação</Label></grouptriggeraction--ml-button-standard></section>`;
}
render(): TemplateResult {
const scenes: TemplateResult[] = [html`<Scene value="base" title="Produtos">${this.renderBase()}</Scene>`, html`<Scene value="detail" title="Detalhes do produto">${this.renderDetail()}</Scene>`, html`<Scene value="createProduto" title="Cadastrar produto">${this.renderCreateProduct()}</Scene>`, html`<Scene value="createMovimentacaoEstoque" title="Registrar movimentação">${this.renderCreateMovement()}</Scene>`];
return html`<main class="produtos-page"><molecules--ml-scenary-102020 mode="direct" .value=${this.scenary} @change=${(event: Event) => this.handleUiScenaryChange(event)}>${scenes}</molecules--ml-scenary-102020></main>`;
}
}
