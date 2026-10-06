/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/mesas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import { ComandaRestauranteMesasShared } from '/_102047_/l2/comandaRestaurante/web/shared/mesas.js';
import type { MesaResumo } from '/_102047_/l2/comandaRestaurante/web/shared/mesas.js';
/// **collab_i18n_start**
const pageMessage_pt = {
'scene.back': 'Voltar para mesas',
'scene.lista': 'Mesas da casa',
'scene.cadastro': 'Manutenção da mesa',
'page.title': 'Mesas',
'list.description': 'Confira o código e a disponibilidade antes de abrir uma comanda.',
'list.new': 'Cadastrar mesa',
'list.code': 'Código da mesa',
'list.availability': 'Disponibilidade',
'list.available': 'Disponível',
'list.unavailable': 'Em uso',
'list.empty': 'Nenhuma mesa cadastrada.',
'list.loading': 'Carregando mesas…',
'form.new.title': 'Nova mesa',
'form.edit.title': 'Mesa',
'form.code.label': 'Código da mesa',
'form.code.placeholder': 'Informe o código da mesa',
'form.code.helper': 'Use a identificação curta usada pelo garçom e pelo caixa.',
'form.create': 'Cadastrar mesa',
'form.update': 'Salvar alterações',
'form.saving': 'Salvando…',
'error.generic': 'Não foi possível concluir a operação. Tente novamente.',
'form.success': 'Mesa salva com sucesso.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages = { pt: pageMessage_pt };
/// **collab_i18n_end**
const formatCode = (mesa: MesaResumo): string => mesa.code;
@customElement('comanda-restaurante--web--mobile--page11--mesas-102047')
export class ComandaRestauranteMobilePage11MesasPage extends ComandaRestauranteMesasShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages) as keyof typeof pageMessages];
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'lista'}
backLabel=${this.msg['scene.back']}
@change=${(e: CustomEvent<{ value: string }>) => {
if (e.target === e.currentTarget) this.setScenario(e.detail.value);
}}>
<Scene value="lista" title=${this.msg['scene.lista']}>
${this.renderSceneLista()}
</Scene>
<Scene value="cadastro" title=${this.msg['scene.cadastro']} nav="back">
${this.renderSceneCadastro()}
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
private renderSceneLista() {
const loading = this.carregarMesasStatus === 'loading';
return html`
<section class="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-5" aria-labelledby="mesas-page-title">
<header class="space-y-2">
<h1 id="mesas-page-title" class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['page.title']}</h1>
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['list.description']}</p>
</header>
<div data-organism-id="mesasList" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
<groupviewdata--ml-vertical-record-list
.loading=${loading}
.hoverable=${true}
.selectable=${true}
@row-click=${(e: CustomEvent<{ index: number }>) => {
const mesa = this.mesas[e.detail.index];
if (mesa) {
this.selectMesa(mesa.id);
this.setScenario('cadastro');
}
}}>
<Columns>
<Column field="code" header=${this.msg['list.code']}></Column>
<Column field="availability" header=${this.msg['list.availability']}></Column>
</Columns>
<Rows>
${this.mesas.map((mesa) => html`
<Row .selected=${this.selectedMesa?.id === mesa.id}>
<Cell>
<span class="text-base font-semibold text-[var(--text-strong,currentColor)]">${formatCode(mesa)}</span>
</Cell>
<Cell>
<span class="text-sm ${mesa.details.disponivel ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">
${mesa.details.disponivel ? this.msg['list.available'] : this.msg['list.unavailable']}
</span>
</Cell>
</Row>
`)}
</Rows>
<Loading>
<p class="px-3 py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['list.loading']}</p>
</Loading>
<Empty>
<p class="px-3 py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['list.empty']}</p>
</Empty>
</groupviewdata--ml-vertical-record-list>
</div>
<div class="pt-1">
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="lg"
data-class="w-full min-h-[44px]"
@action=${() => {
this.selectMesa(null);
this.setScenario('cadastro');
}}>
<Label>${this.msg['list.new']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>
`;
}
private renderSceneCadastro() {
const editing = this.selectedMesa !== null;
const saving = this.criarMesaStatus === 'loading' || this.atualizarMesaStatus === 'loading';
const code = editing ? this.updateMesaDraft.code ?? '' : this.createMesaDraft.code ?? '';
const error = editing ? this.atualizarMesaError : this.criarMesaError;
const title = editing ? `${this.msg['form.edit.title']} ${this.selectedMesa?.code ?? ''}` : this.msg['form.new.title'];
return html`
<section class="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-5" aria-labelledby="mesa-form-title">
<header>
<h1 id="mesa-form-title" class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${title}</h1>
</header>
<div data-organism-id="mesaForm" class="flex flex-col gap-5 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
<groupentertext--ml-enter-text
name="code"
.value=${code}
placeholder=${this.msg['form.code.placeholder']}
required
.disabled=${saving}
@input=${(e: CustomEvent<{ value: string }>) => {
if (editing) {
this.setUpdateMesaDraft({ ...this.updateMesaDraft, code: e.detail.value });
} else {
this.setCreateMesaDraft({ ...this.createMesaDraft, code: e.detail.value });
}
}}>
<Label>${this.msg['form.code.label']}</Label>
<Helper>${this.msg['form.code.helper']}</Helper>
</groupentertext--ml-enter-text>
${error ? html`<p aria-live="polite" class="text-sm text-[var(--status-error-text,currentColor)]">${this.msg['error.generic']}</p>` : nothing}
${this.atualizarMesaStatus === 'success' || this.criarMesaStatus === 'success'
? html`<p aria-live="polite" class="text-sm text-[var(--status-success-text,currentColor)]">${this.msg['form.success']}</p>`
: nothing}
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="lg"
.disabled=${saving || code.trim() === ''}
.loading=${saving}
data-class="mt-2 min-h-[44px] w-full"
@action=${() => editing
? this.atualizarMesa().then(() => this.setScenario('lista'))
: this.criarMesa().then(() => this.setScenario('lista'))}>
<Label>${saving ? this.msg['form.saving'] : editing ? this.msg['form.update'] : this.msg['form.create']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>
`;
}
}
