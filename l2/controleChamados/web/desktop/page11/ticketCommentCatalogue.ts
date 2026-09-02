/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page11/ticketCommentCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosTicketCommentCatalogueBase } from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type { QryListTicketCommentOutput, QryGetTicketCommentOutput, QryTicketPickerOutput } from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
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
'action.delete.confirm': 'Confirma a exclusão deste comentário?',
'form.ticket.choose': 'Selecione um chamado',
'form.comment.placeholder': 'Digite o comentário',
'form.cancel': 'Cancelar',
'query.refresh': 'Atualizar lista',
'query.loading': 'Carregando',
'query.select': 'Selecionar',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--ticket-comment-catalogue-102047')
export class ControleChamadosDesktopPage11TicketCommentCataloguePage extends ControleChamadosTicketCommentCatalogueBase {
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
render() {
const msg = this.msg;
return html`<molecules--ml-scenary-102020 mode="scenary" .value=${this.uiScenary} @change=${this.handleUiScenaryChange} backLabel=${msg['scenary.back']}>
<Scene value="base" title=${msg['scenary.base']}>${this.renderScenaryBase()}</Scene>
<Scene value="detail" title=${msg['scenary.detail']} nav="back">${this.renderScenaryDetail()}</Scene>
<Scene value="createTicketComment" title=${msg['scenary.createTicketComment']}>${this.renderScenaryCreateTicketComment()}</Scene>
<Scene value="updateTicketComment" title=${msg['scenary.updateTicketComment']}>${this.renderScenaryUpdateTicketComment()}</Scene>
</molecules--ml-scenary-102020>`;
}
renderScenaryBase() {
const msg = this.msg;
const rows: QryListTicketCommentOutput[] = this.qryListTicketCommentData;
const tickets: QryTicketPickerOutput[] = this.qryTicketPickerData;
const selectedId = this.cmdUpdateTicketCommentTicketCommentId || this.cmdDeleteTicketCommentTicketCommentId;
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]"><div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-sm"><div class="flex flex-wrap items-end gap-4">
<label class="flex min-w-64 flex-1 flex-col gap-1 text-sm"><span class="text-[var(--text-strong,#0f172a)]">${msg['intent.qryTicketPicker.list.filter.search.label']}</span><input class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" .value=${this.qryTicketPickerSearch} @input=${this.handleQryTicketPickerSearchChange} /></label>
<button class="rounded px-4 py-2 bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)]" @click=${this.handleQryTicketPickerClick}>${msg['query.refresh']}</button></div>
<div class="mt-4 flex flex-wrap gap-2">${tickets.length === 0 ? html`<span class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryTicketPicker.list.empty']}</span>` : tickets.map((ticket: QryTicketPickerOutput) => html`<button class="rounded border border-[var(--border-subtle,#e2e8f0)] px-3 py-2 text-left hover:bg-[var(--selected-bg,#f1f5f9)]" @click=${() => { this.setCmdCreateTicketCommentTicketId(String(ticket.ticketId)); this.setCmdUpdateTicketCommentTicketId(String(ticket.ticketId)); }}><span class="font-medium">${String(ticket.title ?? ticket.ticketId)}</span>${ticket.description ? html`<span class="ml-2 text-sm text-[var(--text-muted,#64748b)]">${String(ticket.description)}</span>` : nothing}</button>`)}</div></section>
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-sm"><div class="mb-4 flex items-center justify-between gap-4"><h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.recordList.title']}</h2><div class="flex gap-2"><button title=${this.cmdCreateTicketCommentTicketId ? nothing : msg['form.ticket.choose']} class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" @click=${() => { this.setUiScenary('createTicketComment'); }} ?disabled=${!this.cmdCreateTicketCommentTicketId}>${msg['intent.cmdCreateTicketComment.form.action.cmdCreateTicketComment']}</button><button class="rounded px-4 py-2 bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)]" @click=${this.handleQryListTicketCommentClick}>${msg['query.refresh']}</button></div></div>
${this.qryListTicketCommentState === 'loading' ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['query.loading']}</p>` : rows.length === 0 ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicketComment.list.empty']}</p>` : html`<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="border-b border-[var(--border-subtle,#e2e8f0)]"><th class="px-3 py-2">${msg['intent.qryListTicketComment.list.column.ticketId.label']}</th><th class="px-3 py-2">${msg['intent.qryListTicketComment.list.column.commentText.label']}</th><th class="px-3 py-2">${msg['query.select']}</th></tr></thead><tbody>${rows.map((row: QryListTicketCommentOutput) => html`<tr class=${String(row.ticketCommentId) === selectedId ? 'bg-[var(--selected-bg,#f1f5f9)]' : ''} @click=${() => { this.setCmdDeleteTicketCommentTicketCommentId(String(row.ticketCommentId)); }}><td class="px-3 py-2">${String(row.ticketId)}</td><td class="px-3 py-2">${String(row.commentText ?? '')}</td><td class="px-3 py-2"><button class="underline text-[var(--link-text,#2563eb)]" @click=${(event: Event) => { event.stopPropagation(); this.setCmdUpdateTicketCommentTicketCommentId(String(row.ticketCommentId)); this.setCmdUpdateTicketCommentTicketId(String(row.ticketId)); this.setCmdDeleteTicketCommentTicketCommentId(String(row.ticketCommentId)); this.setQryGetTicketCommentTicketCommentId(String(row.ticketCommentId)); void this.loadQryGetTicketComment(); this.setUiScenary('detail'); }}>${msg['query.select']}</button></td></tr>`)}</tbody></table></div>`}
${this.cmdCreateTicketCommentState === 'success' ? html`<p class="mt-4 rounded bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateTicketComment.success']}</p>` : nothing}${this.cmdCreateTicketCommentState === 'error' ? html`<p class="mt-4 rounded bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdCreateTicketCommentError || msg['action.cmdCreateTicketComment.error']}</p>` : nothing}${this.cmdUpdateTicketCommentState === 'success' ? html`<p class="mt-4 rounded bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateTicketComment.success']}</p>` : nothing}${this.cmdUpdateTicketCommentState === 'error' ? html`<p class="mt-4 rounded bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateTicketCommentError || msg['action.cmdUpdateTicketComment.error']}</p>` : nothing}${this.cmdDeleteTicketCommentState === 'success' ? html`<p class="mt-4 rounded bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteTicketComment.success']}</p>` : nothing}${this.cmdDeleteTicketCommentState === 'error' ? html`<p class="mt-4 rounded bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdDeleteTicketCommentError || msg['action.cmdDeleteTicketComment.error']}</p>` : nothing}</section></div></div>`;
}
renderScenaryDetail() {
const msg = this.msg;
const record: QryGetTicketCommentOutput | null = this.qryGetTicketCommentData;
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6"><section class="mx-auto max-w-2xl rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-sm">${this.qryGetTicketCommentState === 'loading' ? html`<p>${msg['query.loading']}</p>` : record === null ? html`<p class="text-[var(--text-muted,#64748b)]">${msg['intent.qryGetTicketComment.list.empty']}</p>` : html`<dl class="space-y-3"><div><dt class="font-semibold">${msg['intent.qryGetTicketComment.list.column.ticketCommentId.label']}</dt><dd>${String(record.ticketCommentId)}</dd></div><div><dt class="font-semibold">${msg['intent.qryGetTicketComment.list.column.ticketId.label']}</dt><dd>${String(record.ticketId)}</dd></div><div><dt class="font-semibold">${msg['intent.qryGetTicketComment.list.column.commentText.label']}</dt><dd>${String(record.commentText ?? '')}</dd></div></dl>`}<div class="mt-6 flex flex-wrap gap-2"><button title=${this.cmdUpdateTicketCommentTicketCommentId && this.cmdUpdateTicketCommentTicketId ? nothing : (!this.cmdUpdateTicketCommentTicketCommentId ? msg['query.select'] : msg['form.ticket.choose'])} class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('updateTicketComment')} ?disabled=${!this.cmdUpdateTicketCommentTicketCommentId || !this.cmdUpdateTicketCommentTicketId}>${msg['intent.cmdUpdateTicketComment.form.action.cmdUpdateTicketComment']}</button><button title=${this.cmdDeleteTicketCommentTicketCommentId ? nothing : msg['query.select']} class="rounded px-4 py-2 bg-[var(--button-danger-bg,#dc2626)] text-[var(--button-danger-text,#ffffff)]" @click=${(event: Event) => { if (this.cmdDeleteTicketCommentTicketCommentId && window.confirm(msg['action.delete.confirm'])) this.handleCmdDeleteTicketCommentClick(event); }} ?disabled=${!this.cmdDeleteTicketCommentTicketCommentId}>${msg['intent.cmdDeleteTicketComment.form.action.cmdDeleteTicketComment']}</button></div>${this.cmdDeleteTicketCommentState === 'error' ? html`<p class="mt-4 rounded bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdDeleteTicketCommentError || msg['action.cmdDeleteTicketComment.error']}</p>` : nothing}</section></div>`;
}
renderScenaryCreateTicketComment() {
const msg = this.msg;
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6"><form class="mx-auto max-w-2xl space-y-4 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-sm" @submit=${this.handleCmdCreateTicketCommentClick}><label class="flex flex-col gap-1 text-sm"><span>${msg['intent.qryTicketPicker.list.column.ticketId.label']}</span><input readonly class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" .value=${this.cmdCreateTicketCommentTicketId} /></label><label class="flex flex-col gap-1 text-sm"><span>${msg['intent.cmdCreateTicketComment.form.field.commentText.label']}</span><textarea required class="min-h-32 rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" placeholder=${msg['form.comment.placeholder']} .value=${this.cmdCreateTicketCommentCommentText} @input=${this.handleCmdCreateTicketCommentCommentTextChange}></textarea></label><div class="flex gap-2"><button type="button" class="rounded px-4 py-2 bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)]" @click=${() => this.setUiScenary('base')}>${msg['form.cancel']}</button><button title=${this.cmdCreateTicketCommentTicketId ? nothing : msg['form.ticket.choose']} type="submit" class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${this.cmdCreateTicketCommentState === 'loading' || !this.cmdCreateTicketCommentTicketId}>${this.cmdCreateTicketCommentState === 'loading' ? msg['query.loading'] : msg['intent.cmdCreateTicketComment.form.action.cmdCreateTicketComment']}</button></div>${this.cmdCreateTicketCommentState === 'success' ? html`<p class="rounded bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateTicketComment.success']}</p>` : nothing}${this.cmdCreateTicketCommentState === 'error' ? html`<p class="rounded bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdCreateTicketCommentError || msg['action.cmdCreateTicketComment.error']}</p>` : nothing}</form></div>`;
}
renderScenaryUpdateTicketComment() {
const msg = this.msg;
return html`<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6"><form class="mx-auto max-w-2xl space-y-4 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-sm" @submit=${this.handleCmdUpdateTicketCommentClick}><label class="flex flex-col gap-1 text-sm"><span>${msg['intent.qryTicketPicker.list.column.ticketId.label']}</span><input readonly class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" .value=${this.cmdUpdateTicketCommentTicketId} /></label><label class="flex flex-col gap-1 text-sm"><span>${msg['intent.cmdUpdateTicketComment.form.field.commentText.label']}</span><textarea required class="min-h-32 rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" placeholder=${msg['form.comment.placeholder']} .value=${this.cmdUpdateTicketCommentCommentText} @input=${this.handleCmdUpdateTicketCommentCommentTextChange}></textarea></label><div class="flex gap-2"><button type="button" class="rounded px-4 py-2 bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)]" @click=${() => this.setUiScenary('base')}>${msg['form.cancel']}</button><button title=${this.cmdUpdateTicketCommentTicketCommentId && this.cmdUpdateTicketCommentTicketId ? nothing : (!this.cmdUpdateTicketCommentTicketCommentId ? msg['query.select'] : msg['form.ticket.choose'])} type="submit" class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${this.cmdUpdateTicketCommentState === 'loading' || !this.cmdUpdateTicketCommentTicketCommentId || !this.cmdUpdateTicketCommentTicketId}>${this.cmdUpdateTicketCommentState === 'loading' ? msg['query.loading'] : msg['intent.cmdUpdateTicketComment.form.action.cmdUpdateTicketComment']}</button></div>${this.cmdUpdateTicketCommentState === 'success' ? html`<p class="rounded bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateTicketComment.success']}</p>` : nothing}${this.cmdUpdateTicketCommentState === 'error' ? html`<p class="rounded bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateTicketCommentError || msg['action.cmdUpdateTicketComment.error']}</p>` : nothing}</form></div>`;
}
}
