/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/listas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasListasShared, type CriarListaDraft, type ListaCadastrada } from '/_102047_/l2/tarefas/web/shared/listas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
listasTitulo: 'Listas',
voltar: 'Voltar',
buscaLabel: 'Buscar lista',
buscaPlaceholder: 'Digite parte do nome da lista',
colLista: 'Lista',
colSituacao: 'Situação',
tarefasAbertas: 'Tarefas abertas',
tipoProjeto: 'Projeto',
tipoArea: 'Área',
ativa: 'Ativa',
inativa: 'Inativa',
vazio: 'Nenhuma lista encontrada.',
carregando: 'Carregando listas…',
erroCarregar: 'Não foi possível carregar as listas.',
erroPrecondicao: 'Esta tela foi aberta sem o que precisa para carregar as listas. Volte ao início do módulo e abra a tela de novo.',
tentarNovamente: 'Tentar novamente',
cadastrarNova: 'Cadastrar nova lista',
novaLista: 'Nova lista',
campoNome: 'Nome da lista',
ajudaNome: 'O nome não pode repetir o de outra lista.',
campoTipo: 'Tipo',
escolhaTipo: 'Escolha o tipo',
campoDescricao: 'Descrição',
campoAtiva: 'Lista ativa',
ajudaAtiva: 'Listas inativas não aparecem na escolha ao criar uma tarefa.',
cadastrarLista: 'Cadastrar lista',
salvarLista: 'Salvar alterações',
erroComando: 'Não foi possível salvar a lista. Confira se o nome já não é usado por outra lista e tente de novo.',
sucesso: 'Lista salva.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const textOf = (e: Event): string | null => {
const d = (e as CustomEvent<{ value?: string }>).detail;
return d && typeof d.value === 'string' ? d.value : null;
};
@customElement('tarefas--web--mobile--page11--listas-102047')
export class TarefasMobilePage11ListasPage extends TarefasListasShared {
private msg: PageMessageType = pageMessage_pt_br;
private tipoLabel(tipo: 'project' | 'area') {
return tipo === 'project' ? this.msg['tipoProjeto'] : this.msg['tipoArea'];
}
private openCreate() {
this.selectFormularioLista(null);
this.setCriarListaDraft({ ...this.criarListaDraft, ativa: this.criarListaDraft.ativa ?? true });
this.setScenario('registro');
}
private openEdit(lista: ListaCadastrada | undefined) {
if (!lista) return;
this.selectFormularioLista(lista.id);
this.setScenario('registro');
}
private submitCreate() {
this.criarLista().then(() => {
if (this.criarListaStatus === 'success') this.setScenario('lista');
});
}
private submitSave() {
this.salvarLista().then(() => {
if (this.salvarListaStatus === 'success') this.setScenario('lista');
});
}
private renderLista() {
const m = this.msg;
const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle' || this.buscarListasStatus === 'loading';
const failed = this.pageStatus === 'error';
const missing = this.listarListasError?.code === 'client.preconditionMissing';
return html`
<div data-organism-id="listasCadastradas" class="flex min-h-full flex-col gap-3">
<div class="px-3 pt-2">
<groupsearchcontent--ml-search-bar
placeholder=${m['buscaPlaceholder']}
@search=${(e: CustomEvent<{ query: string }>) => this.buscarListas(e.detail.query)}
@clear=${() => this.buscarListas('')}
@change=${(e: CustomEvent<{ value: string | null }>) => this.buscarListas(e.detail.value ?? '')}
>
<Label>${m['buscaLabel']}</Label>
</groupsearchcontent--ml-search-bar>
</div>
${failed
? html`<div class="mx-3 flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]" aria-live="polite">
<p>${missing ? m['erroPrecondicao'] : m['erroCarregar']}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.listarListas()}>
<Label>${m['tentarNovamente']}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: html`<div class="flex-1" aria-busy=${loading ? 'true' : 'false'}>
<groupviewdata--ml-vertical-record-list
.loading=${loading}
.hoverable=${true}
@row-click=${(e: CustomEvent<{ index: number }>) => this.openEdit(this.listas[e.detail.index])}
>
<Columns>
<Column field="nome" header=${m['colLista']}></Column>
<Column field="situacao" header=${m['colSituacao']} width="96px" align="right"></Column>
</Columns>
<Rows>
${this.listas.map(
(l) => html`<Row ?selected=${l.id === this.selectedLista}>
<Cell>
<div class="flex min-h-[56px] flex-col justify-center py-2 ${l.ativa ? 'text-[var(--text-strong,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">
<span class="text-base font-semibold break-words">${l.nome}</span>
<span class="text-sm text-[var(--text-muted,currentColor)]">${this.tipoLabel(l.details.tipo)} · ${m['tarefasAbertas']}: ${new Intl.NumberFormat(document.documentElement.lang || undefined).format(l.details.quantidadeTarefasAbertas)}</span>
</div>
</Cell>
<Cell>
<span class="inline-block rounded-full px-2 py-0.5 text-xs ${l.ativa ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">${l.ativa ? m['ativa'] : m['inativa']}</span>
</Cell>
</Row>`
)}
</Rows>
<Empty>
<div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m['vazio']}</div>
</Empty>
<Loading>
<div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m['carregando']}</div>
</Loading>
</groupviewdata--ml-vertical-record-list>
</div>`}
<div class="sticky bottom-0 border-t border-[var(--border-subtle,currentColor)] bg-[var(--page-bg,transparent)] p-3">
<grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.openCreate()}>
<Label>${m['cadastrarNova']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
`;
}
private renderCampos(
draft: CriarListaDraft,
update: (next: CriarListaDraft) => void,
status: string,
failed: boolean,
submitLabel: string,
onSubmit: () => void
) {
const m = this.msg;
const busy = status === 'loading';
const invalid = !(draft.nome ?? '').trim() || !draft.details.tipo;
return html`
<form class="flex flex-col gap-4 p-3" @submit=${(e: Event) => e.preventDefault()}>
<groupentertext--ml-floating-text-input
data-class="w-full"
required
.value=${draft.nome ?? ''}
@input=${(e: Event) => { const v = textOf(e); if (v !== null) update({ ...draft, nome: v }); }}
@change=${(e: CustomEvent<{ value: string }>) => update({ ...draft, nome: e.detail.value })}
>
<Label>${m['campoNome']}</Label>
<Helper>${m['ajudaNome']}</Helper>
</groupentertext--ml-floating-text-input>
<div class="flex flex-col gap-1">
<label for="lista-tipo" class="text-sm text-[var(--text-default,currentColor)]">${m['campoTipo']}</label>
<select
id="lista-tipo"
required
class="min-h-[44px] w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-base text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@change=${(e: Event) => {
const v = (e.target as HTMLSelectElement).value;
update({ ...draft, details: { ...draft.details, tipo: v === 'project' || v === 'area' ? v : null } });
}}
>
<option value="" ?selected=${!draft.details.tipo}>${m['escolhaTipo']}</option>
<option value="project" ?selected=${draft.details.tipo === 'project'}>${m['tipoProjeto']}</option>
<option value="area" ?selected=${draft.details.tipo === 'area'}>${m['tipoArea']}</option>
</select>
</div>
<groupentertext--ml-multiline-text
data-class="w-full"
.rows=${4}
.value=${draft.details.descricao ?? ''}
@input=${(e: Event) => { const v = textOf(e); if (v !== null) update({ ...draft, details: { ...draft.details, descricao: v } }); }}
@change=${(e: CustomEvent<{ value: string }>) => update({ ...draft, details: { ...draft.details, descricao: e.detail.value } })}
>
<Label>${m['campoDescricao']}</Label>
</groupentertext--ml-multiline-text>
<div class="flex flex-col gap-1">
<label class="flex min-h-[44px] items-center gap-3 text-[var(--text-strong,currentColor)]">
<input
type="checkbox"
class="h-6 w-6 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
.checked=${draft.ativa === true}
@change=${(e: Event) => update({ ...draft, ativa: (e.target as HTMLInputElement).checked })}
/>
<span>${m['campoAtiva']}</span>
</label>
<p class="text-sm text-[var(--text-muted,currentColor)]">${m['ajudaAtiva']}</p>
</div>
<div aria-live="polite">
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${failed} .dismissible=${false}>
<Message>${m['erroComando']}</Message>
</groupnotifyuser--ml-contextual-feedback>
</div>
<grouptriggeraction--ml-button-standard
size="lg"
data-class="w-full"
?disabled=${invalid || busy}
?loading=${busy}
@action=${onSubmit}
>
<Label>${submitLabel}</Label>
</grouptriggeraction--ml-button-standard>
</form>
`;
}
private renderForm() {
const m = this.msg;
const lista = this.formularioLista;
return html`
<div data-organism-id="formularioLista">
${lista
? this.renderCampos(
this.salvarListaDraft,
(next) => this.setSalvarListaDraft({ ...this.salvarListaDraft, nome: next.nome, details: next.details, ativa: next.ativa }),
this.salvarListaStatus,
this.salvarListaError !== null,
m['salvarLista'],
() => this.submitSave()
)
: this.renderCampos(
this.criarListaDraft,
(next) => this.setCriarListaDraft(next),
this.criarListaStatus,
this.criarListaError !== null,
m['cadastrarLista'],
() => this.submitCreate()
)}
</div>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const m = this.msg;
const lista = this.formularioLista;
return html`
<div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
backLabel=${m['voltar']}
.value=${this.scenary || 'lista'}
@change=${(e: CustomEvent<{ value: string }>) => {
if (e.target === e.currentTarget) {
this.setScenario(e.detail.value);
if (e.detail.value === 'lista') this.selectFormularioLista(null);
}
}}
>
<Scene value="lista" title=${m['listasTitulo']}>${this.renderLista()}</Scene>
<Scene value="registro" title=${lista ? lista.nome : m['novaLista']} nav="back">${this.renderForm()}</Scene>
</molecules--ml-scenary-102020>
<groupnotifyuser--ml-toast-notification
type="success"
position="top"
.duration=${4000}
?visible=${this.criarListaStatus === 'success' || this.salvarListaStatus === 'success'}
>
<Message>${m['sucesso']}</Message>
</groupnotifyuser--ml-toast-notification>
${nothing}
</div>
`;
}
}
