/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/mesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteMesasShared } from '/_102047_/l2/comandaRestaurante/web/shared/mesas.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Mesas',
pageIntro: 'Consulte a disponibilidade e mantenha as mesas da casa em ordem.',
tableRegion: 'Mesas da casa',
codeHeader: 'Código da mesa',
availabilityHeader: 'Disponível',
available: 'Disponível',
occupied: 'Em atendimento',
empty: 'Nenhuma mesa cadastrada.',
loading: 'Carregando mesas…',
loadError: 'Não foi possível carregar as mesas.',
newMesa: 'Nova mesa',
createTitle: 'Cadastrar mesa',
editTitle: 'Editar mesa',
codeLabel: 'Código da mesa',
codePlaceholder: 'Ex.: 12',
codeHelper: 'Informe a identificação curta usada pelo garçom e pelo caixa.',
createAction: 'Cadastrar mesa',
updateAction: 'Salvar mesa',
cancel: 'Cancelar',
back: 'Voltar para mesas',
required: 'Informe o código da mesa.',
createError: 'Não foi possível cadastrar a mesa.',
updateError: 'Não foi possível salvar a mesa.',
selected: 'Mesa selecionada',
createSuccess: 'Mesa cadastrada.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
@customElement('comanda-restaurante--web--desktop--page11--mesas-102047')
export class ComandaRestauranteDesktopPage11MesasPage extends ComandaRestauranteMesasShared {
private msg!: PageMessageType;
private renderTable() {
const selectedIndex = this.selectedMesa
? this.mesas.findIndex((mesa) => mesa.id === this.selectedMesa?.id)
: -1;
const tableError = this.carregarMesasError?.message || (this.carregarMesasStatus === 'error' ? this.msg.loadError : '');
return html`
<section class="min-w-0 flex-1" data-organism-id="mesasList">
<div class="mb-5 flex items-start justify-between gap-6">
<div>
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.tableRegion}</h2>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p>
</div>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="md"
.disabled=${this.criarMesaStatus === 'loading'}
@action=${() => {
this.selectMesa(null);
this.setScenario('create');
}}>
<Label>${this.msg.newMesa}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${tableError ? html`<p class="mb-3 rounded-md border border-[var(--status-error-text,currentColor)] bg-[var(--status-error-bg,transparent)] px-3 py-2 text-sm text-[var(--text-default,currentColor)]" aria-live="polite">${tableError}</p>` : ''}
<groupviewtable--ml-data-table
class="block overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]"
.value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
.loading=${this.carregarMesasStatus === 'loading'}
@rowClick=${(event: CustomEvent<{ index: number }>) => {
const mesa = this.mesas[event.detail.index];
if (mesa) {
this.selectMesa(mesa.id);
this.setScenario('edit');
}
}}>
<Caption>${this.msg.tableRegion}</Caption>
<TableHeader>
<TableRow>
<TableHead key="code">${this.msg.codeHeader}</TableHead>
<TableHead key="available">${this.msg.availabilityHeader}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${this.mesas.map((mesa) => html`
<TableRow key=${mesa.id}>
<TableCell>${mesa.code}</TableCell>
<TableCell>
<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${mesa.details.disponivel ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">
${mesa.details.disponivel ? this.msg.available : this.msg.occupied}
</span>
</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>${this.msg.empty}</Empty>
<Loading>${this.msg.loading}</Loading>
</groupviewtable--ml-data-table>
</section>
`;
}
private renderForm(editing: boolean) {
const code = editing ? this.updateMesaDraft.code : this.createMesaDraft.code;
const value = code || '';
const commandStatus = editing ? this.atualizarMesaStatus : this.criarMesaStatus;
const commandError = editing ? this.atualizarMesaError : this.criarMesaError;
const valid = value.trim().length > 0;
const changed = editing && this.selectedMesa ? value !== this.selectedMesa.code : valid;
const busy = commandStatus === 'loading';
return html`
<aside class="w-[22rem] shrink-0 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" data-organism-id="mesaForm">
<div class="mb-6 border-b border-[var(--border-subtle,currentColor)] pb-4">
<h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${editing ? this.msg.editTitle : this.msg.createTitle}</h2>
${editing && this.selectedMesa ? html`<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.selectedMesa.code}</p>` : ''}
</div>
<groupentertext--ml-enter-text
class="block"
data-class="w-full"
name="code"
.value=${value}
.error=${!valid && (commandStatus !== 'idle') ? this.msg.required : ''}
.placeholder=${this.msg.codePlaceholder}
.required=${true}
.disabled=${busy}
@input=${(event: CustomEvent<{ value: string }>) => {
if (editing) {
this.setUpdateMesaDraft({ ...this.updateMesaDraft, code: event.detail.value });
} else {
this.setCreateMesaDraft({ code: event.detail.value });
}
}}>
<Label>${this.msg.codeLabel}</Label>
<Helper>${this.msg.codeHelper}</Helper>
</groupentertext--ml-enter-text>
${commandError ? html`<p class="mt-4 rounded-md border border-[var(--status-error-text,currentColor)] bg-[var(--status-error-bg,transparent)] px-3 py-2 text-sm text-[var(--text-default,currentColor)]" aria-live="polite">${commandError.message || (editing ? this.msg.updateError : this.msg.createError)}</p>` : ''}
<div class="mt-8 flex items-center justify-end gap-3">
<grouptriggeraction--ml-button-standard
data-variant="secondary"
size="md"
.disabled=${busy}
@action=${() => this.setScenario('closed')}>
<Label>${this.msg.cancel}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="md"
.disabled=${!valid || !changed || busy}
.loading=${busy}
@action=${() => {
if (editing) {
void this.atualizarMesa().then(() => {
if (this.atualizarMesaStatus === 'success') this.setScenario('closed');
});
} else {
void this.criarMesa().then(() => {
if (this.criarMesaStatus === 'success') this.setScenario('closed');
});
}
}}>
<Label>${editing ? this.msg.updateAction : this.msg.createAction}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</aside>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] px-10 py-8 text-[var(--text-default,currentColor)]">
<header class="mb-8">
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
</header>
<div class="flex items-start gap-8">
${this.renderTable()}
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'closed'}
.loading=${this.criarMesaStatus === 'loading' || this.atualizarMesaStatus === 'loading'}
backLabel=${this.msg.back}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="closed" title="${this.msg.tableRegion}"></Scene>
<Scene value="create" title="${this.msg.createTitle}">${this.renderForm(false)}</Scene>
<Scene value="edit" title="${this.msg.editTitle}" nav="back" backTo="closed">${this.renderForm(true)}</Scene>
</molecules--ml-scenary-102020>
</div>
</main>
`;
}
}
