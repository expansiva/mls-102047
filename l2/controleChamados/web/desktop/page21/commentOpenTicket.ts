/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page21/commentOpenTicket.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosCommentOpenTicketBase } from '/_102047_/l2/controleChamados/web/shared/commentOpenTicket.js';
import type { QryLocateTicketOutput } from '/_102047_/l2/controleChamados/web/shared/commentOpenTicket.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.locateTicket.title': 'Localizar chamado',
'organism.qryLocateTicket.title': 'Localizar o chamado aberto',
'intent.qryLocateTicket.list.title': 'Localizar o chamado aberto',
'intent.qryLocateTicket.list.empty': 'Nenhum registro encontrado',
'intent.qryLocateTicket.list.column.ticketId.label': 'Chamado',
'intent.qryLocateTicket.list.column.title.label': 'Título',
'intent.qryLocateTicket.list.column.description.label': 'Descrição',
'intent.qryLocateTicket.list.column.status.label': 'Status',
'section.recordComment.title': 'Registrar comentário',
'organism.cmdRecordComment.title': 'Registrar comentário',
'intent.cmdRecordComment.form.title': 'Registrar comentário',
'intent.cmdRecordComment.form.action.cmdRecordComment': 'Registrar comentário',
'intent.cmdRecordComment.form.field.commentText.label': 'Comentário',
'action.cmdRecordComment.success': 'Registrar comentário: OK',
'action.cmdRecordComment.error': 'Registrar comentário: falhou',
'section.ticket-context.title': 'Chamado em acompanhamento',
'section.comment-action.title': 'Registro no histórico',
'scenary.base': 'Localizar o chamado aberto',
'scenary.recordComment': 'Registrar comentário',
// The copy you invent, with short keys. Only this part repeats per language.
'journey.step.locate': 'Escolha o chamado',
'journey.step.comment': 'Escreva o comentário',
'journey.selected': 'Chamado selecionado',
'journey.continue': 'Continuar',
'journey.back': 'Voltar',
'journey.required': 'Preencha este campo para continuar.',
'journey.loading': 'Carregando chamados…',
'journey.retry': 'Tentar novamente',
'journey.running': 'Registrando…',
'journey.ticketMissing': 'Selecione um chamado antes de registrar o comentário.',
'journey.commentHint': 'Descreva o andamento do atendimento.',
'journey.change': 'Alterar chamado',
'journey.completed': 'Comentário registrado com sucesso.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--comment-open-ticket-102047')
export class ControleChamadosDesktopPage21CommentOpenTicketPage extends ControleChamadosCommentOpenTicketBase {
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
@change=${this.handleUiScenaryChange}>
<Scene value="base" title=${msg['scenary.base']}>
${this.renderScenaryBase()}
</Scene>
<Scene value="recordComment" title=${msg['scenary.recordComment']}>
${this.renderScenaryRecordComment()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const tickets: QryLocateTicketOutput[] = this.qryLocateTicketData;
const selectedTicket: QryLocateTicketOutput | undefined = tickets.find(
(ticket: QryLocateTicketOutput): boolean => ticket.ticketId === this.cmdRecordCommentTicketId,
);
const hasSelection: boolean = Boolean(selectedTicket);
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]">
<div class="mx-auto max-w-6xl space-y-6">
<div class="flex items-center gap-3" aria-label=${msg['journey.step.locate']}>
<div class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--button-primary-bg,#2563eb)] font-bold text-[var(--button-primary-text,#ffffff)]">1</div>
<div class="h-px flex-1 bg-[var(--border-subtle,#e2e8f0)]"></div>
<div class="flex h-9 w-9 items-center justify-center rounded-full ${hasSelection ? 'bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]' : 'bg-[var(--surface-alt-bg,#f8fafc)] text-[var(--text-muted,#64748b)]'}">2</div>
</div>
${this.cmdRecordCommentState === 'success' ? html`<div class="rounded-lg bg-[var(--status-success-bg,#dcfce7)] p-4 text-[var(--status-success-text,#166534)]" role="status">${msg['action.cmdRecordComment.success']}</div>` : nothing}
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]">
<h2 class="mb-4 text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['organism.qryLocateTicket.title']}</h2>
${this.qryLocateTicketState === 'loading' ? html`<div class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-6 text-[var(--text-muted,#64748b)]" role="status">${msg['journey.loading']}</div>` : nothing}
${this.qryLocateTicketState === 'error' ? html`<div class="flex items-center justify-between rounded-lg bg-[var(--status-error-bg,#fee2e2)] p-4 text-[var(--status-error-text,#991b1b)]" role="alert"><span>${msg['action.cmdRecordComment.error']}</span><button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${this.handleQryLocateTicketClick}>${msg['journey.retry']}</button></div>` : nothing}
${this.qryLocateTicketState !== 'loading' && tickets.length === 0 ? html`<p class="py-6 text-[var(--text-muted,#64748b)]">${msg['intent.qryLocateTicket.list.empty']}</p>` : nothing}
${tickets.length > 0 ? html`
<div class="overflow-x-auto">
<table class="w-full border-collapse text-left">
<thead><tr class="border-b border-[var(--border-default,#e2e8f0)] text-sm text-[var(--text-muted,#64748b)]"><th class="p-3">${msg['intent.qryLocateTicket.list.column.ticketId.label']}</th><th class="p-3">${msg['intent.qryLocateTicket.list.column.title.label']}</th><th class="p-3">${msg['intent.qryLocateTicket.list.column.description.label']}</th><th class="p-3">${msg['intent.qryLocateTicket.list.column.status.label']}</th></tr></thead>
<tbody>${tickets.map((ticket: QryLocateTicketOutput) => html`<tr class="cursor-pointer border-b border-[var(--border-subtle,#e2e8f0)] hover:bg-[var(--selected-bg,#eff6ff)] ${ticket.ticketId === this.cmdRecordCommentTicketId ? 'bg-[var(--selected-bg,#eff6ff)]' : ''}" @click=${(): void => { this.setCmdRecordCommentTicketId(ticket.ticketId); }}>
<td class="p-3 font-medium">${ticket.ticketId}</td><td class="p-3">${ticket.title}</td><td class="p-3">${ticket.description}</td><td class="p-3">${ticket.status}</td>
</tr>`)}</tbody>
</table>
</div>` : nothing}
${hasSelection ? html`<div class="mt-5 flex items-center justify-between rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4"><span class="text-sm text-[var(--text-muted,#64748b)]">${msg['journey.selected']}: <strong class="text-[var(--text-strong,#0f172a)]">${selectedTicket?.title ?? selectedTicket?.ticketId}</strong></span><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-5 py-3 font-medium text-[var(--button-primary-text,#ffffff)]" @click=${(): void => this.setUiScenary('recordComment')}>${msg['journey.continue']}</button></div>` : nothing}
</div>
</div>
</div>`;
}
renderScenaryRecordComment() {
const msg = this.msg;
const canSubmit: boolean = Boolean(this.cmdRecordCommentTicketId && this.cmdRecordCommentCommentText.trim());
const selectedTicket: QryLocateTicketOutput | undefined = this.qryLocateTicketData.find(
(ticket: QryLocateTicketOutput): boolean => ticket.ticketId === this.cmdRecordCommentTicketId,
);
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]">
<div class="mx-auto max-w-3xl space-y-6">
<div class="flex items-center gap-3"><div class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--status-success-bg,#dcfce7)] font-bold text-[var(--status-success-text,#166534)]">1</div><div class="h-px flex-1 bg-[var(--border-subtle,#e2e8f0)]"></div><div class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--button-primary-bg,#2563eb)] font-bold text-[var(--button-primary-text,#ffffff)]">2</div></div>
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]">
<h2 class="mb-4 text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.comment-action.title']}</h2>
${selectedTicket ? html`<div class="mb-6 rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4"><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['journey.selected']}</p><p class="font-medium text-[var(--text-strong,#0f172a)]">${selectedTicket.title}</p><button class="mt-2 text-[var(--link-text,#2563eb)] underline" @click=${(): void => this.setUiScenary('base')}>${msg['journey.change']}</button></div>` : nothing}
${this.cmdRecordCommentError ? html`<div class="mb-4 rounded-lg bg-[var(--status-error-bg,#fee2e2)] p-4 text-[var(--status-error-text,#991b1b)]" role="alert">${this.cmdRecordCommentError}</div>` : nothing}
<label class="mb-2 block font-medium" for="commentText">${msg['intent.cmdRecordComment.form.field.commentText.label']} <span aria-hidden="true">*</span></label>
<textarea id="commentText" class="min-h-40 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdRecordCommentCommentText} @input=${this.handleCmdRecordCommentCommentTextChange} placeholder=${msg['journey.commentHint']} required></textarea>
${!this.cmdRecordCommentCommentText.trim() ? html`<p class="mt-2 text-sm text-[var(--text-muted,#64748b)]">${msg['journey.required']}</p>` : nothing}
${!this.cmdRecordCommentTicketId ? html`<p class="mt-2 text-sm text-[var(--status-error-text,#991b1b)]">${msg['journey.ticketMissing']}</p>` : nothing}
<div class="mt-6 flex justify-between gap-3"><button class="rounded-md border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] px-5 py-3 text-[var(--button-secondary-text,#334155)]" @click=${(): void => this.setUiScenary('base')}>${msg['journey.back']}</button><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-5 py-3 font-medium text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" ?disabled=${!this.cmdRecordCommentTicketId || !this.cmdRecordCommentCommentText.trim() || this.cmdRecordCommentState === 'loading'} title=${!this.cmdRecordCommentTicketId ? msg['journey.ticketMissing'] : nothing} @click=${this.handleCmdRecordCommentClick}>${this.cmdRecordCommentState === 'loading' ? msg['journey.running'] : msg['intent.cmdRecordComment.form.action.cmdRecordComment']}</button></div>
</div>
</div>
</div>`;
}
}
