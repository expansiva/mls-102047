/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page31/ticketCommentCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosTicketCommentCatalogueBase } from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryListTicketCommentOutput,
QryGetTicketCommentOutput,
QryTicketPickerOutput,
} from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.recordList.title': 'Comentários do chamado',
'organism.qryListTicketComment.title': 'Listar Comentário do chamado',
'intent.qryListTicketComment.list.title': 'Listar Comentário do chamado',
'intent.qryListTicketComment.list.empty': 'Nenhum registro encontrado',
'intent.qryListTicketComment.list.column.ticketCommentId.label': 'Identificador do comentário',
'intent.qryListTicketComment.list.column.ticketId.label': 'Chamado',
'intent.qryListTicketComment.list.column.commentText.label': 'Comentário',
'organism.qryGetTicketComment.title': 'Obter Comentário do chamado',
'intent.qryGetTicketComment.list.title': 'Obter Comentário do chamado',
'intent.qryGetTicketComment.list.empty': 'Nenhum registro encontrado',
'intent.qryGetTicketComment.list.column.ticketCommentId.label': 'Identificador do comentário',
'intent.qryGetTicketComment.list.column.ticketId.label': 'Chamado',
'intent.qryGetTicketComment.list.column.commentText.label': 'Comentário',
'organism.cmdDeleteTicketComment.title': 'Excluir Comentário do chamado',
'intent.cmdDeleteTicketComment.form.title': 'Excluir Comentário do chamado',
'intent.cmdDeleteTicketComment.form.action.cmdDeleteTicketComment': 'Excluir Comentário do chamado',
'section.recordForm.title': 'Comentário',
'organism.cmdCreateTicketComment.title': 'Criar Comentário do chamado',
'intent.cmdCreateTicketComment.form.title': 'Criar Comentário do chamado',
'intent.cmdCreateTicketComment.form.action.cmdCreateTicketComment': 'Criar Comentário do chamado',
'intent.cmdCreateTicketComment.form.field.commentText.label': 'Comentário',
'organism.cmdUpdateTicketComment.title': 'Atualizar Comentário do chamado',
'intent.cmdUpdateTicketComment.form.title': 'Atualizar Comentário do chamado',
'intent.cmdUpdateTicketComment.form.action.cmdUpdateTicketComment': 'Atualizar Comentário do chamado',
'intent.cmdUpdateTicketComment.form.field.commentText.label': 'Comentário',
'organism.qryTicketPicker.title': 'Listar Chamado',
'intent.qryTicketPicker.list.title': 'Listar Chamado',
'intent.qryTicketPicker.list.empty': 'Nenhum registro encontrado',
'intent.qryTicketPicker.list.column.ticketId.label': 'Chamado',
'intent.qryTicketPicker.list.column.title.label': 'Título',
'intent.qryTicketPicker.list.column.description.label': 'Descrição',
'intent.qryTicketPicker.list.column.status.label': 'Status',
'intent.qryTicketPicker.list.filter.search.label': 'Search',
'intent.qryTicketPicker.list.filter.sortBy.label': 'Sort By',
'intent.qryTicketPicker.list.filter.sortOrder.label': 'Sort Order',
'action.cmdCreateTicketComment.success': 'Criar Comentário do chamado: OK',
'action.cmdCreateTicketComment.error': 'Criar Comentário do chamado: falhou',
'action.cmdUpdateTicketComment.success': 'Atualizar Comentário do chamado: OK',
'action.cmdUpdateTicketComment.error': 'Atualizar Comentário do chamado: falhou',
'action.cmdDeleteTicketComment.success': 'Excluir Comentário do chamado: OK',
'action.cmdDeleteTicketComment.error': 'Excluir Comentário do chamado: falhou',
'section.commentWorkspace.title': 'Comentários do chamado',
'section.commentCreation.title': 'Novo comentário',
'scenary.base': 'Listar Comentário do chamado',
'scenary.detail': 'Obter Comentário do chamado',
'scenary.createTicketComment': 'Criar Comentário do chamado',
'scenary.updateTicketComment': 'Atualizar Comentário do chamado',
'scenary.back': 'Voltar',
'ui.loading': 'Carregando',
'ui.selectTicket': 'Selecione um chamado',
'ui.chooseComment': 'Selecione um comentário para consultar ou editar',
'ui.deleteConfirm': 'Confirme a exclusão deste comentário',
'ui.required': 'Obrigatório',
'ui.createNew': 'Adicionar comentário',
'ui.edit': 'Editar comentário',
'ui.delete': 'Excluir comentário',
'ui.retry': 'Tentar novamente',
'ui.saved': 'Alteração salva',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--ticket-comment-catalogue-102047')
export class ControleChamadosDesktopPage31TicketCommentCataloguePage extends ControleChamadosTicketCommentCatalogueBase {
#msgLang: string | null = null;
#msgCache: PageMessageType = pageFallback;
/** i18n catalog — resolved once per language, refreshed only when the document language changes. */
protected get msg(): PageMessageType {
const lang = (document.documentElement.lang || '').toLowerCase();
if (lang !== this.#msgLang) {
this.#msgLang = lang;
this.#msgCache = pageMessages[this.getMessageKey(pageMessages)] || pageFallback;
}
return this.#msgCache;
}
/** Main render. The scenary host and Scene list are fixed — fill renderScenary<X>(), not this. */
render() {
const msg = this.msg;
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.uiScenary}
@change=${this.handleUiScenaryChange} backLabel=${msg['scenary.back']}>
<Scene value="base" title=${msg['scenary.base']}>
${this.renderScenaryBase()}
</Scene>
<Scene value="detail" title=${msg['scenary.detail']} nav="back">
${this.renderScenaryDetail()}
</Scene>
<Scene value="createTicketComment" title=${msg['scenary.createTicketComment']}>
${this.renderScenaryCreateTicketComment()}
</Scene>
<Scene value="updateTicketComment" title=${msg['scenary.updateTicketComment']}>
${this.renderScenaryUpdateTicketComment()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const comments: QryListTicketCommentOutput[] = this.qryListTicketCommentData;
const tickets: QryTicketPickerOutput[] = this.qryTicketPickerData;
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]">
<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
<div>
<h1 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.commentWorkspace.title']}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicketComment.list.title']}</p>
</div>
<button class="rounded-lg bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => { if (tickets.length > 0) { this.setCmdCreateTicketCommentTicketId(String(tickets[0].ticketId)); } this.setUiScenary('createTicketComment'); }} ?disabled=${tickets.length === 0}>${msg['ui.createNew']}</button>
</div>
${this.qryListTicketCommentState === 'loading' ? html`<p class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4 text-[var(--text-muted,#64748b)]">${msg['ui.loading']}</p>` : comments.length === 0 ? html`<p class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] p-6">${msg['intent.qryListTicketComment.list.empty']}</p>` : html`
<div class="overflow-x-auto rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)]">
<table class="w-full text-left text-sm"><thead class="bg-[var(--surface-alt-bg,#f8fafc)]"><tr>
<th class="p-3">${msg['intent.qryListTicketComment.list.column.ticketId.label']}</th><th class="p-3">${msg['intent.qryListTicketComment.list.column.commentText.label']}</th>
</tr></thead><tbody>${comments.map((item: QryListTicketCommentOutput) => html`
<tr class="cursor-pointer border-t border-[var(--border-subtle,#e2e8f0)] ${String(item.ticketCommentId) === this.qryGetTicketCommentTicketCommentId ? 'bg-[var(--selected-bg,#eff6ff)]' : ''}" @click=${() => { this.setQryGetTicketCommentTicketCommentId(String(item.ticketCommentId)); this.setCmdUpdateTicketCommentTicketCommentId(String(item.ticketCommentId)); this.setCmdUpdateTicketCommentTicketId(String(item.ticketId)); this.setUiScenary('detail'); void this.loadQryGetTicketComment(); }}>
<td class="p-3">${item.ticketId}</td><td class="p-3">${item.commentText}</td>
</tr>` )}</tbody></table>
</div>`}
</div>`;
}
renderScenaryDetail() {
const msg = this.msg;
const record: QryGetTicketCommentOutput | null = this.qryGetTicketCommentData;
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]">
${this.qryGetTicketCommentState === 'loading' ? html`<p>${msg['ui.loading']}</p>` : record === null ? html`<p>${msg['intent.qryGetTicketComment.list.empty']}</p>` : html`
<div class="sticky top-0 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]"><div class="grid gap-3 md:grid-cols-3"><div><span class="text-xs text-[var(--text-muted,#64748b)]">${msg['intent.qryGetTicketComment.list.column.ticketCommentId.label']}</span><p>${record.ticketCommentId}</p></div><div><span class="text-xs text-[var(--text-muted,#64748b)]">${msg['intent.qryGetTicketComment.list.column.ticketId.label']}</span><p>${record.ticketId}</p></div><div><span class="text-xs text-[var(--text-muted,#64748b)]">${msg['intent.qryGetTicketComment.list.column.commentText.label']}</span><p>${record.commentText}</p></div></div>
<div class="mt-5 flex flex-wrap gap-2"><button class="rounded-lg bg-[var(--button-secondary-bg,#ffffff)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => { this.setCmdUpdateTicketCommentTicketCommentId(String(record.ticketCommentId)); this.setCmdUpdateTicketCommentTicketId(String(record.ticketId)); this.setCmdUpdateTicketCommentCommentText(String(record.commentText ?? '')); this.setUiScenary('updateTicketComment'); }}>${msg['ui.edit']}</button><button class="rounded-lg bg-[var(--button-danger-bg,#dc2626)] px-4 py-2 text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdDeleteTicketCommentTicketCommentId} title=${!this.cmdDeleteTicketCommentTicketCommentId ? msg['ui.chooseComment'] : msg['ui.deleteConfirm']} @click=${() => { if (window.confirm(msg['ui.deleteConfirm'])) { this.setCmdDeleteTicketCommentTicketCommentId(String(record.ticketCommentId)); this.handleCmdDeleteTicketCommentClick(); } }}>${msg['ui.delete']}</button></div>
${this.cmdDeleteTicketCommentState === 'success' ? html`<p class="mt-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteTicketComment.success']}</p>` : nothing}${this.cmdDeleteTicketCommentState === 'error' ? html`<p class="mt-3 text-[var(--status-error-text,#b91c1c)]">${this.cmdDeleteTicketCommentError || msg['action.cmdDeleteTicketComment.error']}</p>` : nothing}</div>`}
</div>`;
}
renderScenaryCreateTicketComment() {
const msg = this.msg;
const busy = this.cmdCreateTicketCommentState === 'loading';
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><section class="max-w-2xl rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6"><h2 class="mb-5 text-lg font-bold">${msg['section.commentCreation.title']}</h2><form class="grid gap-4" @submit=${this.handleCmdCreateTicketCommentClick}><label class="grid gap-2 text-sm"><span>${msg['intent.qryTicketPicker.list.column.ticketId.label']}</span><select class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2" .value=${this.cmdCreateTicketCommentTicketId} @change=${this.handleCmdCreateTicketCommentTicketIdChange} required><option value="">${msg['ui.selectTicket']}</option>${this.qryTicketPickerData.map((ticket: QryTicketPickerOutput) => html`<option value=${String(ticket.ticketId)}>${ticket.title}</option>`)}</select></label><label class="grid gap-2 text-sm"><span>${msg['intent.cmdCreateTicketComment.form.field.commentText.label']}</span><textarea class="min-h-32 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2" .value=${this.cmdCreateTicketCommentCommentText} @input=${this.handleCmdCreateTicketCommentCommentTextChange} required></textarea></label><button class="rounded-lg bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${busy || !this.cmdCreateTicketCommentTicketId} title=${!this.cmdCreateTicketCommentTicketId ? msg['ui.selectTicket'] : nothing}>${busy ? msg['ui.loading'] : msg['intent.cmdCreateTicketComment.form.action.cmdCreateTicketComment']}</button>${this.cmdCreateTicketCommentState === 'error' ? html`<p class="text-[var(--status-error-text,#b91c1c)]">${this.cmdCreateTicketCommentError || msg['action.cmdCreateTicketComment.error']}</p>` : nothing}${this.cmdCreateTicketCommentState === 'success' ? html`<p class="text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateTicketComment.success']}</p>` : nothing}</form></section></div>`;
}
renderScenaryUpdateTicketComment() {
const msg = this.msg;
const busy = this.cmdUpdateTicketCommentState === 'loading';
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><section class="max-w-2xl rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6"><h2 class="mb-5 text-lg font-bold">${msg['section.recordForm.title']}</h2><form class="grid gap-4" @submit=${this.handleCmdUpdateTicketCommentClick}><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetTicketComment.list.column.ticketId.label']}: ${this.cmdUpdateTicketCommentTicketId}</p><label class="grid gap-2 text-sm"><span>${msg['intent.cmdUpdateTicketComment.form.field.commentText.label']}</span><textarea class="min-h-32 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2" .value=${this.cmdUpdateTicketCommentCommentText} @input=${this.handleCmdUpdateTicketCommentCommentTextChange} required></textarea></label><button class="rounded-lg bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${busy || !this.cmdUpdateTicketCommentTicketCommentId || !this.cmdUpdateTicketCommentTicketId} title=${!this.cmdUpdateTicketCommentTicketCommentId ? msg['ui.chooseComment'] : !this.cmdUpdateTicketCommentTicketId ? msg['ui.selectTicket'] : nothing}>${busy ? msg['ui.loading'] : msg['intent.cmdUpdateTicketComment.form.action.cmdUpdateTicketComment']}</button>${this.cmdUpdateTicketCommentState === 'error' ? html`<p class="text-[var(--status-error-text,#b91c1c)]">${this.cmdUpdateTicketCommentError || msg['action.cmdUpdateTicketComment.error']}</p>` : nothing}${this.cmdUpdateTicketCommentState === 'success' ? html`<p class="text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateTicketComment.success']}</p>` : nothing}</form></section></div>`;
}
}
