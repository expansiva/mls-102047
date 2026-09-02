/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page21/ticketCommentCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosTicketCommentCatalogueBase } from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type { QryGetTicketCommentOutput, QryTicketPickerOutput } from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do not inline a string in the template: reference a key, or add your own SHORT
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
'comment.new': 'Novo comentário',
'comment.saved': 'Comentário salvo',
'comment.edit': 'Editar comentário',
'comment.ticket': 'Chamado relacionado',
'comment.chooseTicket': 'Selecione um chamado',
'comment.required': 'Obrigatório',
'comment.save': 'Salvar comentário',
'comment.update': 'Salvar alterações',
'comment.cancel': 'Cancelar',
'comment.loading': 'Carregando...',
'comment.noRecord': 'Nenhum comentário selecionado',
'comment.delete': 'Excluir comentário',
'comment.deleteConfirm': 'Excluir este comentário?',
'comment.selectExisting': 'Comentário selecionado',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--ticket-comment-catalogue-102047')
export class ControleChamadosDesktopPage21TicketCommentCataloguePage extends ControleChamadosTicketCommentCatalogueBase {
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
const hasRecord = Boolean(this.qryGetTicketCommentData?.ticketCommentId || this.cmdUpdateTicketCommentTicketCommentId);
const createReady = Boolean(this.cmdCreateTicketCommentTicketId);
const createError = this.cmdCreateTicketCommentError;
const updateError = this.cmdUpdateTicketCommentError;
const deleteError = this.cmdDeleteTicketCommentError;
const rows = this.qryListTicketCommentData;
return html`
<section class="mx-auto flex max-w-2xl flex-col gap-6 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0 1px 3px)]">
<header class="flex items-start justify-between gap-4">
<div>
<h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.commentWorkspace.title']}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${hasRecord ? msg['comment.selectExisting'] : msg['comment.new']}</p>
</div>
${hasRecord ? html`<span class="rounded-full bg-[var(--status-info-bg,#dbeafe)] px-3 py-1 text-sm text-[var(--status-info-text,#1e40af)]">${msg['comment.saved']}</span>` : nothing}
</header>
${this.qryListTicketCommentState === 'loading' ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.loading']}</p>` : rows.length === 0 ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicketComment.list.empty']}</p>` : html`
<div class="flex flex-col gap-2">
${rows.map((row: { ticketCommentId?: unknown; ticketId?: unknown; commentText?: unknown }) => {
const commentId = String(row.ticketCommentId ?? '');
const selected = commentId === this.cmdUpdateTicketCommentTicketCommentId;
return html`<button type="button" class="flex flex-col items-start gap-1 rounded-md border p-3 text-left ${selected ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)]' : 'border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)]'}" @click=${() => { this.setCmdUpdateTicketCommentTicketCommentId(commentId); this.setCmdUpdateTicketCommentTicketId(String(row.ticketId ?? '')); this.setCmdDeleteTicketCommentTicketCommentId(commentId); this.setQryGetTicketCommentTicketCommentId(commentId); void this.loadQryGetTicketComment(); this.setUiScenary('detail'); }}>
<span class="text-sm font-medium text-[var(--text-default,#0f172a)]">${String(row.commentText ?? '')}</span>
<span class="text-xs text-[var(--text-muted,#64748b)]">${msg['comment.ticket']}: ${String(row.ticketId ?? '')}</span>
</button>`;
})}
</div>`}
${this.qryTicketPickerState === 'loading' ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.loading']}</p>` : html`
<label class="flex flex-col gap-2 text-sm font-medium text-[var(--text-default,#0f172a)]">
${msg['comment.ticket']}
<select class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateTicketCommentTicketId} @change=${this.handleCmdCreateTicketCommentTicketIdChange}>
<option value="">${msg['comment.chooseTicket']}</option>
${this.qryTicketPickerData.map((ticket: QryTicketPickerOutput) => html`<option value=${String(ticket.ticketId)}>${String(ticket.title ?? ticket.ticketId)}</option>`)}
</select>
</label>`}
${createError ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-sm text-[var(--status-error-text,#991b1b)]">${createError}</p>` : nothing}
${updateError ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-sm text-[var(--status-error-text,#991b1b)]">${updateError}</p>` : nothing}
${deleteError ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-sm text-[var(--status-error-text,#991b1b)]">${deleteError}</p>` : nothing}
${this.cmdCreateTicketCommentState === 'success' ? html`<p class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateTicketComment.success']}</p>` : nothing}
${this.cmdUpdateTicketCommentState === 'success' ? html`<p class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateTicketComment.success']}</p>` : nothing}
${this.cmdDeleteTicketCommentState === 'success' ? html`<p class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteTicketComment.success']}</p>` : nothing}
<div class="flex flex-wrap gap-3">
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdCreateTicketCommentTicketId} title=${!this.cmdCreateTicketCommentTicketId ? msg['comment.chooseTicket'] : nothing} @click=${() => this.setUiScenary('createTicketComment')}>${msg['comment.new']}</button>
${hasRecord ? html`<button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-4 py-3 text-[var(--button-secondary-text,#0f172a)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('updateTicketComment')}>${msg['comment.edit']}</button>` : nothing}
<button class="rounded-md bg-[var(--button-danger-bg,#dc2626)] px-4 py-3 text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdDeleteTicketCommentTicketCommentId || this.cmdDeleteTicketCommentState === 'loading'} title=${!this.cmdDeleteTicketCommentTicketCommentId ? msg['comment.noRecord'] : msg['comment.deleteConfirm']} @click=${this.handleCmdDeleteTicketCommentClick}>${this.cmdDeleteTicketCommentState === 'loading' ? msg['comment.loading'] : msg['comment.delete']}</button>
</div>
</section>`;
}
renderScenaryDetail() {
const msg = this.msg;
const record: QryGetTicketCommentOutput | null = this.qryGetTicketCommentData;
return record ? html`<section class="mx-auto flex max-w-2xl flex-col gap-4 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6">
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['comment.selectExisting']}</h2>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.ticket']}: ${String(record.ticketId)}</p>
<p class="whitespace-pre-wrap text-[var(--text-default,#0f172a)]">${String(record.commentText ?? '')}</p>
</section>` : html`<p class="mx-auto max-w-2xl text-sm text-[var(--text-muted,#64748b)]">${msg['comment.noRecord']}</p>`;
}
renderScenaryCreateTicketComment() {
const msg = this.msg;
const ready = Boolean(this.cmdCreateTicketCommentTicketId && this.cmdCreateTicketCommentCommentText.trim());
return html`<form class="mx-auto flex max-w-2xl flex-col gap-5 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6" @submit=${this.handleCmdCreateTicketCommentClick}>
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.commentCreation.title']}</h2>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.ticket']}: ${this.cmdCreateTicketCommentTicketId || msg['comment.chooseTicket']}</p>
<label class="flex flex-col gap-2 text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['intent.cmdCreateTicketComment.form.field.commentText.label']} <span class="text-[var(--status-error-text,#991b1b)]">${msg['comment.required']}</span>
<textarea required rows="7" class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateTicketCommentCommentText} @input=${this.handleCmdCreateTicketCommentCommentTextChange}></textarea></label>
${this.cmdCreateTicketCommentError ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-sm text-[var(--status-error-text,#991b1b)]">${this.cmdCreateTicketCommentError}</p>` : nothing}
${this.cmdCreateTicketCommentState === 'success' ? html`<p class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateTicketComment.success']}</p>` : nothing}
<div class="flex gap-3"><button type="button" class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-4 py-3 text-[var(--button-secondary-text,#0f172a)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('base')}>${msg['comment.cancel']}</button><button type="submit" class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdCreateTicketCommentTicketId || !ready || this.cmdCreateTicketCommentState === 'loading'} title=${!this.cmdCreateTicketCommentTicketId ? msg['comment.chooseTicket'] : nothing}>${this.cmdCreateTicketCommentState === 'loading' ? msg['comment.loading'] : msg['comment.save']}</button></div>
</form>`;
}
renderScenaryUpdateTicketComment() {
const msg = this.msg;
const ready = Boolean(this.cmdUpdateTicketCommentTicketCommentId && this.cmdUpdateTicketCommentTicketId && this.cmdUpdateTicketCommentCommentText.trim());
return html`<form class="mx-auto flex max-w-2xl flex-col gap-5 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6" @submit=${this.handleCmdUpdateTicketCommentClick}>
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['comment.edit']}</h2>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.ticket']}: ${this.cmdUpdateTicketCommentTicketId}</p>
<label class="flex flex-col gap-2 text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['intent.cmdUpdateTicketComment.form.field.commentText.label']} <span class="text-[var(--status-error-text,#991b1b)]">${msg['comment.required']}</span>
<textarea required rows="7" class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdUpdateTicketCommentCommentText} @input=${this.handleCmdUpdateTicketCommentCommentTextChange}></textarea></label>
${this.cmdUpdateTicketCommentError ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-sm text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateTicketCommentError}</p>` : nothing}
${this.cmdUpdateTicketCommentState === 'success' ? html`<p class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateTicketComment.success']}</p>` : nothing}
<div class="flex gap-3"><button type="button" class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-4 py-3 text-[var(--button-secondary-text,#0f172a)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('base')}>${msg['comment.cancel']}</button><button type="submit" class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdUpdateTicketCommentTicketCommentId || !this.cmdUpdateTicketCommentTicketId || !ready || this.cmdUpdateTicketCommentState === 'loading'} title=${!this.cmdUpdateTicketCommentTicketCommentId ? msg['comment.noRecord'] : !this.cmdUpdateTicketCommentTicketId ? msg['comment.chooseTicket'] : nothing}>${this.cmdUpdateTicketCommentState === 'loading' ? msg['comment.loading'] : msg['comment.update']}</button></div>
</form>`;
}
}
