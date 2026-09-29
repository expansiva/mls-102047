/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleEstoqueMovimentacoesBase } from '/_102047_/l2/controleEstoque/web/shared/movimentacoes.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/groupenternumber/ml-number-input.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Movimentações de estoque',
historyTitle: 'Histórico de movimentações',
registerTitle: 'Registrar movimentação',
product: 'Produto',
selectProduct: 'Selecione um produto',
currentBalance: 'Saldo atual',
minimumQuantity: 'Quantidade mínima',
belowMinimum: 'Saldo abaixo do mínimo.',
loadingMovements: 'Carregando movimentações…',
noMovements: 'Nenhuma movimentação encontrada.',
dateTime: 'Data e hora',
movementType: 'Tipo de movimentação',
selectType: 'Selecione o tipo',
entry: 'Entrada',
exit: 'Saída',
quantity: 'Quantidade',
positiveInteger: 'Informe uma quantidade inteira positiva.',
movementRegistered: 'Movimentação registrada com sucesso.',
registering: 'Registrando…',
backToHistory: 'Voltar ao histórico',
registerMovement: 'Registrar movimentação',
selectProductForBalance: 'Selecione um produto para consultar o saldo.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { 'pt-BR': pageMessage_pt };
/// **collab_i18n_end**
@customElement('controle-estoque--web--mobile--page11--movimentacoes-102047')
export class ControleEstoqueMovimentacoesMobilePage11 extends ControleEstoqueMovimentacoesBase {
private readonly formatDate = (value: string): string => {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
};
private selectedProduct(productId: string | null): this['stateListProdutoResult'][number] | undefined {
if (!productId) return undefined;
return this.stateListProdutoResult.find((product): boolean => product.id === productId);
}
private handleCreateProductChange(event: Event): void {
const target = event.target as HTMLSelectElement;
this.selectCreateMovimentacaoEstoqueProdutoId(target.value || null);
}
private handleListProductChange(event: Event): void {
const target = event.target as HTMLSelectElement;
this.selectListMovimentacaoEstoqueProdutoId(target.value || null);
void this.runListMovimentacaoEstoque();
}
private handleDateChange(event: Event): void {
const target = event.target as HTMLInputElement;
this.setCreateMovimentacaoEstoqueMovimentadoEm(target.value ? new Date(target.value).toISOString() : null);
}
private handleTypeChange(event: Event): void {
const target = event.target as HTMLSelectElement;
const value = target.value;
this.setCreateMovimentacaoEstoqueDetailsTipo(value === 'entrada' || value === 'saida' ? value : null);
}
private handleQuantityChange(event: Event): void {
const target = event.target as HTMLInputElement;
const value = target.value;
const quantity = value === '' ? null : Number(value);
this.setCreateMovimentacaoEstoqueDetailsQuantidade(quantity !== null && Number.isFinite(quantity) ? quantity : null);
}
private openCreate(): void {
this.setUiScenary('createMovimentacaoEstoque');
}
private closeCreate(): void {
this.setUiScenary('base');
}
private async submitCreate(): Promise<void> {
await this.runCreateMovimentacaoEstoque();
}
private renderProductOptions(): TemplateResult {
return html`
<option value="">Selecione um produto</option>
${this.stateListProdutoResult.map((product) => html`
<option value=${product.id}>${product.details.identification?.name ?? product.id}</option>
`)}
`;
}
private renderProductSummary(product: this['stateListProdutoResult'][number] | undefined): TemplateResult {
if (!product) {
return html`<p role="status">Selecione um produto para consultar o saldo.</p>`;
}
const stock = product.details.controleEstoque;
return html`
<section aria-labelledby="produto-resumo-titulo">
<h3 id="produto-resumo-titulo">${product.details.identification?.name ?? product.id}</h3>
<dl>
<div><dt>Saldo atual</dt><dd>${stock?.saldoAtual ?? '—'}</dd></div>
<div><dt>Quantidade mínima</dt><dd>${stock?.quantidadeMinima ?? '—'}</dd></div>
</dl>
${stock?.saldoAbaixoDoMinimo === true
? html`<p role="alert">Saldo abaixo do mínimo.</p>`
: nothing}
</section>
`;
}
private renderHistory(): TemplateResult {
const loading = this.stateListMovimentacaoEstoqueStatus === 'loading';
const error = this.stateListMovimentacaoEstoqueError;
const rows = this.stateListMovimentacaoEstoqueResult;
return html`
<section aria-labelledby="historico-titulo">
<h2 id="historico-titulo">Histórico de movimentações</h2>
<label for="produto-filtro">Produto</label>
<select id="produto-filtro" @change=${(event: Event): void => this.handleListProductChange(event)}>
${this.renderProductOptions()}
</select>
${this.renderProductSummary(this.selectedProduct(this.stateListMovimentacaoEstoqueProdutoId))}
${loading ? html`<p role="status" aria-live="polite">Carregando movimentações…</p>` : nothing}
${error ? html`<p role="alert">${error.message}</p>` : nothing}
${!loading && !error && rows.length === 0 ? html`<p role="status">Nenhuma movimentação encontrada.</p>` : nothing}
${rows.length > 0 ? html`
<groupviewdata--ml-vertical-record-list .loading=${loading} aria-label="Lista de movimentações">
<Columns>
<Column field="produto" header="Produto"></Column>
<Column field="quando" header="Data e hora"></Column>
<Column field="tipo" header="Tipo"></Column>
<Column field="quantidade" header="Quantidade"></Column>
</Columns>
<Rows>
${rows.map((row) => html`
<Row>
<Cell>${row.movimentacaoEstoqueProduto?.details?.identification?.name ?? row.produtoId}</Cell>
<Cell>${this.formatDate(row.movimentadoEm)}</Cell>
<Cell>${row.details.tipo === 'entrada' ? 'Entrada' : 'Saída'}</Cell>
<Cell>${row.details.quantidade}</Cell>
</Row>
`)}
</Rows>
<Empty><span>Nenhuma movimentação encontrada.</span></Empty>
<Loading><span>Carregando movimentações…</span></Loading>
</groupviewdata--ml-vertical-record-list>
` : nothing}
<button type="button" @click=${(): void => this.openCreate()}>Registrar movimentação</button>
</section>
`;
}
private renderForm(): TemplateResult {
const product = this.selectedProduct(this.stateCreateMovimentacaoEstoqueProdutoId);
const actionLoading = this.stateCreateMovimentacaoEstoqueStatus === 'loading';
const actionError = this.stateCreateMovimentacaoEstoqueError;
return html`
<section aria-labelledby="registro-titulo">
<button type="button" @click=${(): void => this.closeCreate()}>Voltar ao histórico</button>
<h2 id="registro-titulo">Registrar movimentação</h2>
${this.renderProductSummary(product)}
<label for="produto-registro">Produto</label>
<select id="produto-registro" required .value=${this.stateCreateMovimentacaoEstoqueProdutoId ?? ''} @change=${(event: Event): void => this.handleCreateProductChange(event)}>
${this.renderProductOptions()}
</select>
<label for="movimentado-em">Data e hora</label>
<input id="movimentado-em" type="datetime-local" required .value=${this.stateCreateMovimentacaoEstoqueMovimentadoEm ? this.stateCreateMovimentacaoEstoqueMovimentadoEm.slice(0, 16) : ''} @change=${(event: Event): void => this.handleDateChange(event)} />
<label for="tipo-movimentacao">Tipo de movimentação</label>
<select id="tipo-movimentacao" required .value=${this.stateCreateMovimentacaoEstoqueDetailsTipo ?? ''} @change=${(event: Event): void => this.handleTypeChange(event)}>
<option value="">Selecione o tipo</option>
<option value="entrada">Entrada</option>
<option value="saida">Saída</option>
</select>
<label for="quantidade-movimentacao">Quantidade</label>
<input id="quantidade-movimentacao" type="number" min="1" step="1" required .value=${this.stateCreateMovimentacaoEstoqueDetailsQuantidade?.toString() ?? ''} @input=${(event: Event): void => this.handleQuantityChange(event)} />
${this.stateCreateMovimentacaoEstoqueDetailsQuantidade !== null && (!Number.isInteger(this.stateCreateMovimentacaoEstoqueDetailsQuantidade) || this.stateCreateMovimentacaoEstoqueDetailsQuantidade < 1)
? html`<p role="alert">Informe uma quantidade inteira positiva.</p>`
: nothing}
${actionError ? html`<p role="alert" aria-live="assertive">${actionError.message}</p>` : nothing}
<button type="submit" ?disabled=${actionLoading} aria-busy=${actionLoading ? 'true' : 'false'}>
${actionLoading ? 'Registrando…' : 'Registrar movimentação'}
</button>
${this.stateCreateMovimentacaoEstoqueStatus === 'success'
? html`<p role="status" aria-live="polite">Movimentação registrada com sucesso.</p>`
: nothing}
</section>
`;
}
render(): TemplateResult {
const active = this.scenary === 'createMovimentacaoEstoque' ? 'createMovimentacaoEstoque' : 'base';
return html`
<main aria-labelledby="page-title">
<h1 id="page-title">Movimentações de estoque</h1>
<molecules--ml-scenary-102020 .value=${active} mode="scenary" @change=${(event: Event): void => this.handleUiScenaryChange(event)}>
<Scene value="base" title="Histórico">
${this.renderHistory()}
</Scene>
<Scene value="createMovimentacaoEstoque" title="Registrar movimentação">
<form @submit=${(event: SubmitEvent): void => { event.preventDefault(); void this.submitCreate(); }}>
${this.renderForm()}
</form>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
export default ControleEstoqueMovimentacoesMobilePage11;
