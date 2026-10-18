/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
TarefasMembros_equipeShared,
emptyCadastrarPessoaDraft,
} from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import type {
PessoaEquipe,
CadastrarPessoaDraft,
SalvarAlteracoesDraft,
} from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
listTitle: 'Pessoas da equipe',
searchLabel: 'Buscar pessoa',
searchPlaceholder: 'Buscar pelo nome',
colName: 'Nome',
colStatus: 'Situação',
colCountry: 'País',
empty: 'Nenhuma pessoa encontrada.',
newPerson: 'Nova pessoa',
loadMore: 'Carregar mais pessoas',
backLabel: 'Voltar para a lista',
newTitle: 'Dados da nova pessoa',
personFallback: 'Pessoa da equipe',
fieldName: 'Nome',
fieldCountry: 'País',
nameHelper: 'Como aparece nas tarefas e na escolha do responsável.',
countryHelper: 'Código do país, por exemplo BR. Define as regras de privacidade.',
register: 'Cadastrar pessoa',
save: 'Salvar alterações',
registerError: 'Não foi possível cadastrar a pessoa. Confira os dados e toque em Cadastrar pessoa para tentar de novo.',
saveError: 'Não foi possível salvar as alterações. Confira os dados e toque em Salvar alterações para tentar de novo.',
registeredToast: 'Pessoa cadastrada.',
savedToast: 'Alterações salvas.',
statusActive: 'Ativo',
statusInactive: 'Inativo',
statusMerged: 'Unificado',
statusBlocked: 'Bloqueado',
rolesLabel: 'Papéis',
statusLabel: 'Situação no cadastro',
loadError: 'Não foi possível carregar a equipe.',
selectionInvalid: 'Essa pessoa não está mais na lista. Atualize a lista e escolha de novo.',
retry: 'Tentar de novo',
preconditionTitle: 'Faltam informações para abrir a equipe',
preconditionBody: 'Esta página foi aberta sem o contexto de que precisa. Volte para a tela anterior e abra a equipe de novo.',
goBack: 'Voltar à tela anterior',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
type StatusValue = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
function statusKey(s: StatusValue): 'statusActive' | 'statusInactive' | 'statusMerged' | 'statusBlocked' {
if (s === 'Active') return 'statusActive';
if (s === 'Blocked') return 'statusBlocked';
if (s === 'Merged') return 'statusMerged';
return 'statusInactive';
}
function statusClass(s: StatusValue): string {
if (s === 'Active') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
if (s === 'Blocked') return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}
function filled(v: string | null): boolean {
return !!v && v.trim().length > 0;
}
function canRegister(d: CadastrarPessoaDraft): boolean {
return filled(d.details.identification.name) && filled(d.details.identification.countryCode);
}
function canSave(d: SalvarAlteracoesDraft, rec: PessoaEquipe): boolean {
const i = d.details.identification;
const r = rec.details.identification;
return filled(i.name) && filled(i.countryCode) && (i.name !== r.name || i.countryCode !== r.countryCode);
}
function textOf(e: Event): string | null {
const detail = (e as CustomEvent<{ value?: string }>).detail;
if (!detail || typeof detail.value !== 'string') return null;
return detail.value;
}
@customElement('tarefas--web--mobile--page11--membros_equipe-102047')
export class TarefasMobilePage11Membros_equipePage extends TarefasMembros_equipeShared {
private msg: PageMessageType = pageMessage_pt_br;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)] ?? pageMessage_pt_br;
const rec = this.cadastroPessoa;
const title = rec
? rec.details.identification.name || this.msg.personFallback
: this.msg.newTitle;
return html`
<div class="min-h-screen w-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'lista'}
backLabel=${this.msg.backLabel}
@change=${(e: CustomEvent<{ value: string }>) => {
if (e.target === e.currentTarget) this.setScenario(e.detail.value);
}}
>
<Scene value="lista" title=${this.msg.listTitle}>${this.renderList()}</Scene>
<Scene value="cadastro" title=${title} nav="back">${this.renderForm(rec)}</Scene>
</molecules--ml-scenary-102020>
${this.renderToasts()}
</div>
`;
}
private renderToasts() {
return html`
<groupnotifyuser--ml-toast-notification
type="success"
position="bottom"
duration="3000"
?visible=${this.cmdCadastrarPessoaStatus === 'success'}
>
<Message>${this.msg['registeredToast']}</Message>
</groupnotifyuser--ml-toast-notification>
<groupnotifyuser--ml-toast-notification
type="success"
position="bottom"
duration="3000"
?visible=${this.cmdSalvarAlteracoesStatus === 'success'}
>
<Message>${this.msg['savedToast']}</Message>
</groupnotifyuser--ml-toast-notification>
`;
}
private renderList() {
const err = this.qryPessoasEquipeError;
if (err && err.code === 'client.preconditionMissing') {
return html`
<section data-organism-id="pessoasEquipe" class="flex flex-col gap-3 px-4 py-6" aria-live="polite">
<p class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['preconditionTitle']}</p>
<p class="text-[var(--text-default,currentColor)]">${this.msg['preconditionBody']}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => history.back()}>
<Label>${this.msg['goBack']}</Label>
</grouptriggeraction--ml-button-standard>
</section>
`;
}
const items = this.pessoas?.items ?? [];
const selIndex = items.findIndex((p) => p.id === this.selectedMembroEquipe);
const loading = this.qryPessoasEquipeStatus === 'loading';
return html`
<section data-organism-id="pessoasEquipe" class="flex flex-col gap-4 px-4 pt-2 pb-0">
<groupsearchcontent--ml-search-bar
.value=${this.busca}
placeholder=${this.msg['searchPlaceholder']}
?loading=${loading}
@search=${(e: CustomEvent<{ query: string }>) => this.qryPessoasEquipe(e.detail.query)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.qryPessoasEquipe(e.detail.value)}
@clear=${() => this.qryPessoasEquipe('')}
>
<Label>${this.msg['searchLabel']}</Label>
</groupsearchcontent--ml-search-bar>
${err
? html`
<div class="flex flex-col gap-2 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3" aria-live="polite">
<p class="text-[var(--text-default,currentColor)]">
${err.code === 'client.selectionInvalid' ? this.msg['selectionInvalid'] : this.msg['loadError']}
</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.qryPessoasEquipe()}>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`
: nothing}
<groupviewtable--ml-responsive-table
.value=${selIndex >= 0 ? String(selIndex) : ''}
?loading=${loading && items.length === 0}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const p = items[e.detail.index];
if (!p) return;
this.selectCadastroPessoa(p.id);
this.setScenario('cadastro');
}}
>
<TableHeader>
<TableRow>
<TableHead key="name">${this.msg['colName']}</TableHead>
<TableHead key="status">${this.msg['colStatus']}</TableHead>
<TableHead key="country">${this.msg['colCountry']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${items.map((p) => {
const id = p.details.identification;
const muted = id.status !== 'Active';
return html`
<TableRow key=${p.id}>
<TableCell>
<span class="text-base font-semibold ${muted ? 'text-[var(--text-muted,currentColor)]' : 'text-[var(--text-strong,currentColor)]'}">${id.name}</span>
</TableCell>
<TableCell>
<span class="inline-block rounded-full px-2 py-0.5 text-xs ${statusClass(id.status)}">${this.msg[statusKey(id.status)]}</span>
</TableCell>
<TableCell>
<span class="text-sm text-[var(--text-muted,currentColor)]">${id.countryCode}</span>
</TableCell>
</TableRow>
`;
})}
</TableBody>
<Empty>${this.msg['empty']}</Empty>
</groupviewtable--ml-responsive-table>
${this.pessoas?.hasMore
? html`
<grouptriggeraction--ml-button-standard
data-variant="secondary"
size="lg"
data-class="w-full"
?loading=${loading}
@action=${() => this.qryPessoasEquipe(undefined, (this.pessoas?.page ?? 1) + 1, true)}
>
<Label>${this.msg['loadMore']}</Label>
</grouptriggeraction--ml-button-standard>
`
: nothing}
<div class="sticky bottom-0 -mx-4 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-3">
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="lg"
data-class="w-full"
@action=${() => {
this.selectCadastroPessoa(null);
this.setCmdCadastrarPessoaDraft(emptyCadastrarPessoaDraft());
this.setScenario('cadastro');
}}
>
<Label>${this.msg['newPerson']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>
`;
}
private renderForm(rec: PessoaEquipe | null) {
return html`
<section data-organism-id="cadastroPessoa" class="flex flex-col gap-4 px-4 pt-2">
${rec ? this.renderEditForm(rec) : this.renderCreateForm()}
</section>
`;
}
private renderCreateForm() {
const d = this.cmdCadastrarPessoaDraft;
const id = d.details.identification;
const busy = this.cmdCadastrarPessoaStatus === 'loading';
const setId = (patch: Partial<CadastrarPessoaDraft['details']['identification']>) =>
this.setCmdCadastrarPessoaDraft({ ...d, details: { identification: { ...id, ...patch } } });
return html`
<form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
<groupentertext--ml-floating-text-input
.value=${id.name ?? ''}
required
autocomplete="off"
?disabled=${busy}
@input=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ name: v }); }}
@change=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ name: v }); }}
>
<Label>${this.msg['fieldName']}</Label>
<Helper>${this.msg['nameHelper']}</Helper>
</groupentertext--ml-floating-text-input>
<groupentertext--ml-enter-text
.value=${id.countryCode ?? ''}
required
autocomplete="country"
?disabled=${busy}
@input=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ countryCode: v }); }}
@change=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ countryCode: v }); }}
>
<Label>${this.msg['fieldCountry']}</Label>
<Helper>${this.msg['countryHelper']}</Helper>
</groupentertext--ml-enter-text>
<div class="sticky bottom-0 -mx-4 flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-3">
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${this.cmdCadastrarPessoaStatus === 'error'} .dismissible=${false}>
<Message>${this.msg['registerError']}</Message>
</groupnotifyuser--ml-contextual-feedback>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="lg"
data-class="w-full"
?disabled=${!canRegister(d)}
?loading=${busy}
@action=${() => {
this.cmdCadastrarPessoa().then(() => {
if (this.cmdCadastrarPessoaStatus === 'success') this.setScenario('lista');
});
}}
>
<Label>${this.msg['register']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</form>
`;
}
private renderEditForm(rec: PessoaEquipe) {
const d = this.cmdSalvarAlteracoesDraft;
const id = d.details.identification;
const busy = this.cmdSalvarAlteracoesStatus === 'loading';
const setId = (patch: Partial<SalvarAlteracoesDraft['details']['identification']>) =>
this.setCmdSalvarAlteracoesDraft({ ...d, details: { identification: { ...id, ...patch } } });
const info = rec.details.identification;
return html`
<form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
<groupentertext--ml-floating-text-input
.value=${id.name ?? ''}
required
autocomplete="off"
?disabled=${busy}
@input=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ name: v }); }}
@change=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ name: v }); }}
>
<Label>${this.msg['fieldName']}</Label>
<Helper>${this.msg['nameHelper']}</Helper>
</groupentertext--ml-floating-text-input>
<groupentertext--ml-enter-text
.value=${id.countryCode ?? ''}
required
autocomplete="country"
?disabled=${busy}
@input=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ countryCode: v }); }}
@change=${(e: Event) => { const v = textOf(e); if (v !== null) setId({ countryCode: v }); }}
>
<Label>${this.msg['fieldCountry']}</Label>
<Helper>${this.msg['countryHelper']}</Helper>
</groupentertext--ml-enter-text>
<dl class="grid grid-cols-1 gap-2 text-sm">
<div class="flex items-center justify-between gap-3">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['statusLabel']}</dt>
<dd><span class="inline-block rounded-full px-2 py-0.5 text-xs ${statusClass(info.status)}">${this.msg[statusKey(info.status)]}</span></dd>
</div>
<div class="flex items-center justify-between gap-3">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['rolesLabel']}</dt>
<dd class="text-right text-[var(--text-default,currentColor)]">${info.tags}</dd>
</div>
</dl>
<div class="sticky bottom-0 -mx-4 flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-3">
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${this.cmdSalvarAlteracoesStatus === 'error'} .dismissible=${false}>
<Message>${this.msg['saveError']}</Message>
</groupnotifyuser--ml-contextual-feedback>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="lg"
data-class="w-full"
?disabled=${!canSave(d, rec)}
?loading=${busy}
@action=${() => {
this.cmdSalvarAlteracoes().then(() => {
if (this.cmdSalvarAlteracoesStatus === 'success') this.setScenario('lista');
});
}}
>
<Label>${this.msg['save']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</form>
`;
}
}
