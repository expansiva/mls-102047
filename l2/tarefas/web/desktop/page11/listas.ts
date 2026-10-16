/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/listas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasListasShared, emptyCriarListaDraft } from '/_102047_/l2/tarefas/web/shared/listas.js';
import type { CriarListaDraft, SalvarListaDraft, ListaTipo, ListaEdicao, ErrorState } from '/_102047_/l2/tarefas/web/shared/listas.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Listas da equipe',
pageIntro: 'Veja as listas que agrupam as tarefas e mantenha seus dados.',
novaLista: 'Nova lista',
colNome: 'Nome',
colTipo: 'Tipo',
colSituacao: 'Situação',
colTarefasAbertas: 'Tarefas abertas',
tipoProject: 'Projeto',
tipoArea: 'Área',
ativa: 'Ativa',
inativa: 'Inativa',
listaRegiao: 'Listas cadastradas',
carregando: 'Carregando as listas…',
vazio: 'Nenhuma lista cadastrada ainda. Use “Nova lista” para começar.',
erroCarregar: 'Não foi possível carregar as listas.',
tentarNovamente: 'Tentar novamente',
painelRepousoTitulo: 'Detalhes da lista',
painelRepousoTexto: 'Escolha uma lista na tabela para alterar seus dados ou cadastre uma nova.',
salvoOk: 'Alterações salvas.',
criadoOk: 'Lista cadastrada. Você pode continuar ajustando seus dados.',
novaTitulo: 'Dados da lista',
editarTituloFallback: 'Lista escolhida',
carregandoLista: 'Abrindo a lista…',
erroAbrir: 'Não foi possível abrir esta lista.',
campoNome: 'Nome da lista',
campoNomeAjuda: 'Usado para escolher a lista ao criar tarefas. Não pode repetir o nome de outra lista.',
campoNomeObrigatorio: 'Informe o nome da lista.',
campoTipo: 'Tipo',
tipoEscolha: 'Escolha o tipo',
campoDescricao: 'Descrição',
campoDescricaoAjuda: 'Explique o objetivo da lista (opcional).',
campoAtiva: 'Recebe novas tarefas',
campoAtivaAjuda: 'Listas inativas deixam de aparecer na escolha ao criar tarefas e continuam na tabela.',
cadastrar: 'Cadastrar lista',
salvar: 'Salvar alterações',
fechar: 'Fechar painel',
descartar: 'Há alterações não salvas. Deseja fechar e descartá-las?',
descartarTroca: 'Há alterações não salvas. Deseja abrir outra lista e descartá-las?',
erroNomeUnico: 'Já existe uma lista com este nome. Escolha outro nome.',
erroGenerico: 'Não foi possível concluir. Tente novamente.',
erroSalvarPrefixo: 'Não foi possível salvar',
erroCriarPrefixo: 'Não foi possível cadastrar'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
function fmtNumber(n: number): string {
return new Intl.NumberFormat(document.documentElement.lang || undefined).format(n);
}
function tipoLabel(msg: PageMessageType, tipo: ListaTipo | null | undefined): string {
if (tipo === 'project') return msg.tipoProject;
if (tipo === 'area') return msg.tipoArea;
return '';
}
function errorText(msg: PageMessageType, err: ErrorState, prefix: string): string {
if (!err) return '';
if (String(err.code).includes('listaNomeUnico')) return `${prefix}. ${msg.erroNomeUnico}`;
return err.message ? `${prefix}. ${err.message}` : `${prefix}. ${msg.erroGenerico}`;
}
function criarDirty(d: CriarListaDraft): boolean {
return !!(d.nome && d.nome.trim()) || !!(d.details.descricao && d.details.descricao.trim());
}
function editarDirty(lista: ListaEdicao | null, d: SalvarListaDraft): boolean {
if (!lista) return false;
return (
(d.nome ?? '') !== lista.nome ||
(d.ativa ?? false) !== lista.ativa ||
d.details.tipo !== lista.details.details.tipo ||
(d.details.descricao ?? '') !== (lista.details.details.descricao ?? '')
);
}
@customElement('tarefas--web--desktop--page11--listas-102047')
export class TarefasDesktopPage11ListasPage extends TarefasListasShared {
private msg: PageMessageType = pageMessage_pt_br;
private scenaryDirty(): boolean {
return criarDirty(this.criarListaDraft) || editarDirty(this.lista, this.salvarListaDraft);
}
private abrirNova() {
if (this.scenaryDirty() && !window.confirm(this.msg.descartarTroca)) return;
this.selecionarLista(null);
this.setCriarListaDraft(emptyCriarListaDraft());
this.setScenario('nova');
}
private abrirLista(index: number) {
const row = this.listas[index];
if (!row) return;
if (row.id === this.selectedLista) {
this.setScenario('editar');
return;
}
if (this.scenaryDirty() && !window.confirm(this.msg.descartarTroca)) return;
this.selecionarLista(row.id);
this.setScenario('editar');
}
private fecharPainel() {
if (this.scenaryDirty() && !window.confirm(this.msg.descartar)) return;
this.selecionarLista(null);
this.setCriarListaDraft(emptyCriarListaDraft());
this.setScenario('vazio');
}
private enviarCriar() {
this.criarLista().then(() => {
if (!this.criarListaError) this.setScenario('editar');
});
}
private enviarSalvar() {
this.salvarLista().then(() => {
if (!this.salvarListaError) this.setScenario('vazio');
});
}
private renderTipoSelect(value: ListaTipo | null, onChange: (v: ListaTipo | null) => void) {
return html`
<div class="flex flex-col gap-1">
<label class="text-sm font-medium text-[var(--text-strong,currentColor)]" for="lista-tipo">${this.msg.campoTipo}</label>
<select
id="lista-tipo"
class="min-h-10 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
.value=${value ?? ''}
@change=${(e: Event) => {
const v = (e.target as HTMLSelectElement).value;
onChange(v === 'project' || v === 'area' ? v : null);
}}
>
<option value="" ?selected=${!value}>${this.msg.tipoEscolha}</option>
<option value="project" ?selected=${value === 'project'}>${this.msg.tipoProject}</option>
<option value="area" ?selected=${value === 'area'}>${this.msg.tipoArea}</option>
</select>
</div>
`;
}
private renderAtiva(checked: boolean, onChange: (v: boolean) => void) {
return html`
<label class="flex items-start gap-3 min-h-10 cursor-pointer">
<input
type="checkbox"
class="mt-1 h-4 w-4 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
.checked=${checked}
@change=${(e: Event) => onChange((e.target as HTMLInputElement).checked)}
/>
<span class="flex flex-col">
<span class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.campoAtiva}</span>
<span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.campoAtivaAjuda}</span>
</span>
</label>
`;
}
private renderCommandError(err: ErrorState, prefix: string) {
return html`
<p class="text-sm text-[var(--text-default,currentColor)]" role="alert" aria-live="polite">
${err ? errorText(this.msg, err, prefix) : nothing}
</p>
`;
}
private renderRepouso() {
return html`
<div class="flex flex-col gap-4">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.painelRepousoTexto}</p>
<groupnotifyuser--ml-contextual-feedback type="success" ?visible=${this.salvarListaStatus === 'success'} .dismissible=${false}>
<Message>${this.msg.salvoOk}</Message>
</groupnotifyuser--ml-contextual-feedback>
</div>
`;
}
private renderNova() {
const d = this.criarListaDraft;
const pronto = !!(d.nome && d.nome.trim()) && !!d.details.tipo;
const enviando = this.criarListaStatus === 'loading';
return html`
<form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
<groupentertext--ml-enter-text
.value=${d.nome ?? ''}
required
maxLength="120"
@input=${(e: CustomEvent<{ value: string }>) => this.setCriarListaDraft({ ...d, nome: e.detail.value })}
>
<Label>${this.msg.campoNome}</Label>
<Helper>${this.msg.campoNomeAjuda}</Helper>
</groupentertext--ml-enter-text>
${this.renderTipoSelect(d.details.tipo, (v) => this.setCriarListaDraft({ ...d, details: { ...d.details, tipo: v } }))}
<groupentertext--ml-multiline-text
.value=${d.details.descricao ?? ''}
.rows=${4}
@input=${(e: CustomEvent<{ value: string }>) => this.setCriarListaDraft({ ...d, details: { ...d.details, descricao: e.detail.value } })}
>
<Label>${this.msg.campoDescricao}</Label>
<Helper>${this.msg.campoDescricaoAjuda}</Helper>
</groupentertext--ml-multiline-text>
${this.renderAtiva(d.ativa ?? true, (v) => this.setCriarListaDraft({ ...d, ativa: v }))}
${this.renderCommandError(this.criarListaError, this.msg.erroCriarPrefixo)}
<div class="flex items-center gap-2">
<grouptriggeraction--ml-button-standard data-variant="primary" ?disabled=${!pronto} ?loading=${enviando} @action=${() => this.enviarCriar()}>
<Label>${this.msg.cadastrar}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="ghost" @action=${() => this.fecharPainel()}>
<Label>${this.msg.fechar}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</form>
`;
}
private renderEditar() {
const d = this.salvarListaDraft;
if (this.obterListaStatus === 'loading') {
return html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.carregandoLista}</p>`;
}
if (this.obterListaError) {
return html`
<div class="flex flex-col gap-3">
<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${this.msg.erroAbrir}</p>
<grouptriggeraction--ml-button-standard data-variant="ghost" @action=${() => this.fecharPainel()}>
<Label>${this.msg.fechar}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`;
}
const pronto = !!(d.nome && d.nome.trim()) && !!d.details.tipo && editarDirty(this.lista, d);
const enviando = this.salvarListaStatus === 'loading';
const nomeVazio = d.nome !== null && !d.nome.trim();
return html`
<form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
<groupnotifyuser--ml-contextual-feedback type="success" ?visible=${this.criarListaStatus === 'success'} .dismissible=${false}>
<Message>${this.msg.criadoOk}</Message>
</groupnotifyuser--ml-contextual-feedback>
<groupentertext--ml-enter-text
.value=${d.nome ?? ''}
.error=${nomeVazio ? this.msg.campoNomeObrigatorio : ''}
required
maxLength="120"
@input=${(e: CustomEvent<{ value: string }>) => this.setSalvarListaDraft({ ...d, nome: e.detail.value })}
>
<Label>${this.msg.campoNome}</Label>
<Helper>${this.msg.campoNomeAjuda}</Helper>
</groupentertext--ml-enter-text>
${this.renderTipoSelect(d.details.tipo, (v) => this.setSalvarListaDraft({ ...d, details: { ...d.details, tipo: v } }))}
<groupentertext--ml-multiline-text
.value=${d.details.descricao ?? ''}
.rows=${4}
@input=${(e: CustomEvent<{ value: string }>) => this.setSalvarListaDraft({ ...d, details: { ...d.details, descricao: e.detail.value } })}
>
<Label>${this.msg.campoDescricao}</Label>
<Helper>${this.msg.campoDescricaoAjuda}</Helper>
</groupentertext--ml-multiline-text>
${this.renderAtiva(d.ativa ?? false, (v) => this.setSalvarListaDraft({ ...d, ativa: v }))}
${this.renderCommandError(this.salvarListaError, this.msg.erroSalvarPrefixo)}
<div class="flex items-center gap-2">
<grouptriggeraction--ml-button-standard data-variant="primary" ?disabled=${!pronto} ?loading=${enviando} @action=${() => this.enviarSalvar()}>
<Label>${this.msg.salvar}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="ghost" @action=${() => this.fecharPainel()}>
<Label>${this.msg.fechar}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</form>
`;
}
private renderTabela() {
const carregando = this.pageStatus === 'loading' || this.listarListasStatus === 'loading';
const temErro = this.pageStatus === 'error' || !!this.listarListasError;
return html`
${temErro
? html`
<div class="flex items-center justify-between gap-3 border-b border-[var(--border-subtle,currentColor)] px-4 py-3" role="alert" aria-live="polite">
<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.erroCarregar}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.listarListas(); }}>
<Label>${this.msg.tentarNovamente}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`
: nothing}
<groupviewdata--ml-vertical-record-list
aria-label=${this.msg.listaRegiao}
.loading=${carregando}
.hoverable=${true}
@row-click=${(e: CustomEvent<{ index: number }>) => this.abrirLista(e.detail.index)}
>
<Columns>
<Column field="nome" header=${this.msg.colNome} />
<Column field="tipo" header=${this.msg.colTipo} width="110px" />
<Column field="situacao" header=${this.msg.colSituacao} width="110px" />
<Column field="abertas" header=${this.msg.colTarefasAbertas} width="130px" align="right" />
</Columns>
<Rows>
${this.listas.map(
(l) => html`
<Row ?selected=${l.id === this.selectedLista}>
<Cell>
<span class=${l.ativa ? 'font-medium text-[var(--text-strong,currentColor)]' : 'font-medium text-[var(--text-muted,currentColor)]'}>${l.nome}</span>
</Cell>
<Cell>
<span class=${l.ativa ? 'text-[var(--text-default,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}>${tipoLabel(this.msg, l.details.details.tipo)}</span>
</Cell>
<Cell>
<span
class=${l.ativa
? 'rounded-full px-2 py-0.5 text-xs bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
: 'rounded-full px-2 py-0.5 text-xs bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}
>${l.ativa ? this.msg.ativa : this.msg.inativa}</span
>
</Cell>
<Cell>
<span class=${l.ativa ? 'tabular-nums text-[var(--text-default,currentColor)]' : 'tabular-nums text-[var(--text-muted,currentColor)]'}>${fmtNumber(l.details.quantidadeTarefasAbertas)}</span>
</Cell>
</Row>
`
)}
</Rows>
<Empty>
<div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.vazio}</div>
</Empty>
<Loading>
<div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.carregando}</div>
</Loading>
</groupviewdata--ml-vertical-record-list>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const tituloEditar = this.lista?.nome || this.msg.editarTituloFallback;
return html`
<div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
<header class="mb-5 flex items-end justify-between gap-4">
<div>
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p>
</div>
<grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => this.abrirNova()}>
<Label>${this.msg.novaLista}</Label>
</grouptriggeraction--ml-button-standard>
</header>
<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_26rem]">
<section
data-organism-id="listasCadastradas"
class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]"
>
${this.renderTabela()}
</section>
<aside
data-organism-id="formularioLista"
class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5"
>
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'vazio'}
@change=${(e: CustomEvent<{ value: string }>) => {
if (e.target === e.currentTarget) this.setScenario(e.detail.value);
}}
>
<Scene value="vazio" title=${this.msg.painelRepousoTitulo}>${this.renderRepouso()}</Scene>
<Scene value="nova" title=${this.msg.novaTitulo}>${this.renderNova()}</Scene>
<Scene value="editar" title=${tituloEditar}>${this.renderEditar()}</Scene>
</molecules--ml-scenary-102020>
</aside>
</div>
</div>
`;
}
}
