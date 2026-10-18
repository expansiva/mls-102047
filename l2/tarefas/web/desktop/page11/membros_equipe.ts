/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMembros_equipeShared } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import type { PessoaEquipe, SalvarAlteracoesDraft } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Pessoas da equipe',
newPerson: 'Nova pessoa',
searchPlaceholder: 'Buscar pelo nome',
searchLabel: 'Buscar pessoa',
colName: 'Nome',
colCountry: 'País',
colStatus: 'Situação',
colContacts: 'Contatos',
noValue: '—',
emptyAll: 'Ainda não há pessoas na equipe. Cadastre a primeira no painel ao lado.',
emptySearch: 'Nenhuma pessoa encontrada com esse nome.',
loadMore: 'Carregar mais pessoas',
statusActive: 'Ativo',
statusInactive: 'Inativo',
statusMerged: 'Mesclado',
statusBlocked: 'Bloqueado',
newSceneTitle: 'Dados de quem entra na equipe',
editSceneFallback: 'Dados da pessoa',
hostBack: 'Voltar',
fieldName: 'Nome',
fieldNameHelper: 'É o nome que aparece como responsável e criador nas tarefas.',
fieldCountry: 'País',
fieldCountryHelper: 'Sigla do país, por exemplo BR. Define as regras de privacidade aplicáveis.',
namePlaceholder: 'Nome completo',
countryPlaceholder: 'BR',
registerPerson: 'Cadastrar pessoa',
saveChanges: 'Salvar alterações',
closePanel: 'Fechar painel',
detailStatus: 'Situação no cadastro',
detailRoles: 'Papéis',
detailContacts: 'Contatos',
detailStatusHint: 'Pessoa ativa pode receber tarefas.',
noSelection: 'Escolha uma pessoa na tabela para corrigir os dados dela.',
discardConfirm: 'Há alterações não salvas nesta pessoa. Fechar agora descarta o que você mudou. Deseja continuar?',
registerError: 'Não foi possível cadastrar a pessoa. Confira os dados e tente de novo.',
saveError: 'Não foi possível salvar as alterações. Confira os dados e tente de novo.',
registerOk: 'Pessoa cadastrada na equipe.',
saveOk: 'Alterações salvas.',
loadErrorTitle: 'Não foi possível carregar a equipe.',
retry: 'Tentar de novo',
missingTitle: 'Esta tela foi aberta sem o que ela precisa para listar a equipe.',
missingBody: 'Volte para a tela de onde você veio e abra as pessoas da equipe novamente.',
back: 'Voltar',
loading: 'Carregando pessoas…',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
function isDirty(draft: SalvarAlteracoesDraft, pessoa: PessoaEquipe): boolean {
const id = draft.details.identification;
return (id.name ?? '') !== pessoa.details.identification.name
|| (id.countryCode ?? '') !== pessoa.details.identification.countryCode;
}
function filled(v: string | null): boolean {
return (v ?? '').trim().length > 0;
}
function statusTone(status: string): string {
switch (status) {
case 'Active':
return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
case 'Blocked':
return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
default:
return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}
}
@customElement('tarefas--web--desktop--page11--membros_equipe-102047')
export class TarefasDesktopPage11Membros_equipePage extends TarefasMembros_equipeShared {
private msg: PageMessageType = pageMessage_pt_br;
private statusLabel(status: string) {
switch (status) {
case 'Active': return this.msg['statusActive'];
case 'Inactive': return this.msg['statusInactive'];
case 'Merged': return this.msg['statusMerged'];
default: return this.msg['statusBlocked'];
}
}
private confirmDiscard(): boolean {
const p = this.cadastroPessoa;
if (!p) return true;
if (!isDirty(this.cmdSalvarAlteracoesDraft, p)) return true;
return window.confirm(this.msg['discardConfirm']);
}
private openNew() {
if (!this.confirmDiscard()) return;
this.selectCadastroPessoa(null);
this.setScenario('novo');
}
private closePanel() {
if (!this.confirmDiscard()) return;
this.selectCadastroPessoa(null);
this.setScenario('novo');
}
private openRow(index: number) {
const item = this.pessoas?.items[index];
if (!item || item.id === this.selectedMembroEquipe) return;
if (!this.confirmDiscard()) return;
this.selectCadastroPessoa(item.id);
this.setScenario('editar');
}
private saveEdit() {
void this.cmdSalvarAlteracoes().then(() => {
if (this.cmdSalvarAlteracoesStatus === 'success') {
this.selectCadastroPessoa(null);
this.setScenario('novo');
}
});
}
private setNewField(patch: { name?: string | null; countryCode?: string | null }) {
const d = this.cmdCadastrarPessoaDraft;
this.setCmdCadastrarPessoaDraft({
...d,
details: { identification: { ...d.details.identification, ...patch } },
});
}
private setEditField(patch: { name?: string | null; countryCode?: string | null }) {
const d = this.cmdSalvarAlteracoesDraft;
this.setCmdSalvarAlteracoesDraft({
...d,
details: { identification: { ...d.details.identification, ...patch } },
});
}
private renderTable() {
const items = this.pessoas?.items ?? [];
const selIndex = items.findIndex((p) => p.id === this.selectedMembroEquipe);
const busy = this.pageStatus === 'loading' || this.pageStatus === 'idle';
return html`
<groupviewtable--ml-data-table
.value=${selIndex >= 0 ? String(selIndex) : ''}
.loading=${busy}
@rowClick=${(e: CustomEvent<{ index: number }>) => this.openRow(e.detail.index)}
>
<TableHeader>
<TableRow>
<TableHead key="name">${this.msg['colName']}</TableHead>
<TableHead key="country">${this.msg['colCountry']}</TableHead>
<TableHead key="status">${this.msg['colStatus']}</TableHead>
<TableHead key="contacts">${this.msg['colContacts']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${items.map((p) => {
const id = p.details.identification;
const muted = id.status !== 'Active';
return html`
<TableRow key=${p.id}>
<TableCell><span class=${muted ? 'text-[var(--text-muted,currentColor)]' : 'font-medium text-[var(--text-strong,currentColor)]'}>${id.name}</span></TableCell>
<TableCell><span class="text-[var(--text-default,currentColor)]">${id.countryCode}</span></TableCell>
<TableCell><span class="inline-block rounded-full px-2 py-0.5 text-xs ${statusTone(id.status)}">${this.statusLabel(id.status)}</span></TableCell>
<TableCell><span class="text-[var(--text-muted,currentColor)]">${p.details.base.contacts || this.msg['noValue']}</span></TableCell>
</TableRow>
`;
})}
</TableBody>
<Empty>${this.busca ? this.msg['emptySearch'] : this.msg['emptyAll']}</Empty>
<Loading>${this.msg['loading']}</Loading>
</groupviewtable--ml-data-table>
`;
}
private renderList() {
if (this.qryPessoasEquipeError?.code === 'client.preconditionMissing') {
return html`
<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 flex flex-col gap-3 items-start" aria-live="polite">
<p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['missingTitle']}</p>
<p class="text-[var(--text-default,currentColor)]">${this.msg['missingBody']}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => window.history.back()}>
<Label>${this.msg['back']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`;
}
return html`
<div class="flex flex-col gap-3">
<groupsearchcontent--ml-search-bar
.value=${this.busca}
.loading=${this.qryPessoasEquipeStatus === 'loading'}
placeholder=${this.msg['searchPlaceholder']}
@search=${(e: CustomEvent<{ query: string }>) => { void this.qryPessoasEquipe(e.detail.query); }}
@clear=${() => { void this.qryPessoasEquipe(''); }}
>
<Label>${this.msg['searchLabel']}</Label>
</groupsearchcontent--ml-search-bar>
${this.pageStatus === 'error' && this.qryPessoasEquipeError
? html`
<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex items-center justify-between gap-3" aria-live="polite">
<p class="text-[var(--text-default,currentColor)]">${this.msg['loadErrorTitle']}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.qryPessoasEquipe(); }}>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: this.renderTable()}
${this.pessoas?.hasMore
? html`
<div class="flex justify-center">
<grouptriggeraction--ml-button-standard
data-variant="ghost"
size="sm"
.loading=${this.qryPessoasEquipeStatus === 'loading'}
@action=${() => { void this.qryPessoasEquipe(undefined, (this.pessoas?.page ?? 1) + 1, true); }}
>
<Label>${this.msg['loadMore']}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: nothing}
</div>
`;
}
private renderNewScene() {
const id = this.cmdCadastrarPessoaDraft.details.identification;
const loading = this.cmdCadastrarPessoaStatus === 'loading';
const ready = filled(id.name) && filled(id.countryCode);
return html`
<div class="flex flex-col gap-4">
<groupentertext--ml-enter-text
.value=${id.name ?? ''}
placeholder=${this.msg['namePlaceholder']}
required
@input=${(e: CustomEvent<{ value: string }>) => this.setNewField({ name: e.detail.value })}
>
<Label>${this.msg['fieldName']}</Label>
<Helper>${this.msg['fieldNameHelper']}</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${id.countryCode ?? ''}
placeholder=${this.msg['countryPlaceholder']}
required
@input=${(e: CustomEvent<{ value: string }>) => this.setNewField({ countryCode: e.detail.value })}
>
<Label>${this.msg['fieldCountry']}</Label>
<Helper>${this.msg['fieldCountryHelper']}</Helper>
</groupentertext--ml-enter-text>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.cmdCadastrarPessoaStatus === 'error'} .dismissible=${false}>
<Message>${this.msg['registerError']}</Message>
</groupnotifyuser--ml-contextual-feedback>
<div>
<grouptriggeraction--ml-button-standard
.disabled=${!ready}
.loading=${loading}
@action=${() => { void this.cmdCadastrarPessoa(); }}
>
<Label>${this.msg['registerPerson']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
`;
}
private renderEditScene() {
const p = this.cadastroPessoa;
if (!p) {
return html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['noSelection']}</p>`;
}
const d = this.cmdSalvarAlteracoesDraft.details.identification;
const loading = this.cmdSalvarAlteracoesStatus === 'loading';
const ready = filled(d.name) && filled(d.countryCode) && isDirty(this.cmdSalvarAlteracoesDraft, p);
const info = p.details.identification;
return html`
<div class="flex flex-col gap-4">
<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm rounded-md bg-[var(--surface-alt-bg,transparent)] p-3">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['detailStatus']}</dt>
<dd class="text-[var(--text-default,currentColor)]">
<span class="inline-block rounded-full px-2 py-0.5 text-xs ${statusTone(info.status)}">${this.statusLabel(info.status)}</span>
</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['detailRoles']}</dt>
<dd class="text-[var(--text-default,currentColor)]">${info.tags || this.msg['noValue']}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['detailContacts']}</dt>
<dd class="text-[var(--text-default,currentColor)]">${p.details.base.contacts || this.msg['noValue']}</dd>
</dl>
<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['detailStatusHint']}</p>
<groupentertext--ml-enter-text
.value=${d.name ?? ''}
placeholder=${this.msg['namePlaceholder']}
required
@input=${(e: CustomEvent<{ value: string }>) => this.setEditField({ name: e.detail.value })}
>
<Label>${this.msg['fieldName']}</Label>
<Helper>${this.msg['fieldNameHelper']}</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${d.countryCode ?? ''}
placeholder=${this.msg['countryPlaceholder']}
required
@input=${(e: CustomEvent<{ value: string }>) => this.setEditField({ countryCode: e.detail.value })}
>
<Label>${this.msg['fieldCountry']}</Label>
<Helper>${this.msg['fieldCountryHelper']}</Helper>
</groupentertext--ml-enter-text>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.cmdSalvarAlteracoesStatus === 'error'} .dismissible=${false}>
<Message>${this.msg['saveError']}</Message>
</groupnotifyuser--ml-contextual-feedback>
<div class="flex items-center gap-3">
<grouptriggeraction--ml-button-standard
.disabled=${!ready}
.loading=${loading}
@action=${() => this.saveEdit()}
>
<Label>${this.msg['saveChanges']}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="ghost" @action=${() => this.closePanel()}>
<Label>${this.msg['closePanel']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const current = this.cadastroPessoa;
const editTitle = current ? current.details.identification.name : this.msg['editSceneFallback'];
return html`
<div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6 flex flex-col gap-5">
<header class="flex items-center justify-between gap-4">
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
<grouptriggeraction--ml-button-standard @action=${() => this.openNew()}>
<Label>${this.msg['newPerson']}</Label>
</grouptriggeraction--ml-button-standard>
</header>
<div class="grid grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
<section data-organism-id="pessoasEquipe" class="min-w-0">
${this.renderList()}
</section>
<aside data-organism-id="cadastroPessoa" class="sticky top-6 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || (current ? 'editar' : 'novo')}
backLabel=${this.msg['hostBack']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}
>
<Scene value="novo" title=${this.msg['newSceneTitle']}>
${this.renderNewScene()}
</Scene>
<Scene value="editar" title=${editTitle}>
${this.renderEditScene()}
</Scene>
</molecules--ml-scenary-102020>
<groupnotifyuser--ml-toast-notification
type="success"
position="top-right"
.duration=${3500}
.visible=${this.cmdCadastrarPessoaStatus === 'success'}
>
<Message>${this.msg['registerOk']}</Message>
</groupnotifyuser--ml-toast-notification>
<groupnotifyuser--ml-toast-notification
type="success"
position="top-right"
.duration=${3500}
.visible=${this.cmdSalvarAlteracoesStatus === 'success'}
>
<Message>${this.msg['saveOk']}</Message>
</groupnotifyuser--ml-toast-notification>
</aside>
</div>
</div>
`;
}
}
