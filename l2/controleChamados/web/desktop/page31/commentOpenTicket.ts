/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page31/commentOpenTicket.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosCommentOpenTicketBase } from '/_102047_/l2/controleChamados/web/shared/commentOpenTicket.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type { QryLocateTicketOutput } from '/_102047_/l2/controleChamados/web/shared/commentOpenTicket.js';
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
'query.loading': 'Carregando chamados...',
'query.error': 'Não foi possível carregar os chamados.',
'comment.opening': 'Escolha o chamado que receberá o registro.',
'comment.choose': 'Selecionar este chamado',
'comment.context': 'Chamado selecionado',
'comment.required': 'Escreva um comentário antes de continuar.',
'comment.continue': 'Continuar para o comentário',
'comment.back': 'Voltar aos chamados',
'comment.saving': 'Registrando comentário...',
'comment.discard': 'Descartar comentário',
'comment.success.detail': 'O comentário foi registrado no chamado.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--comment-open-ticket-102047')
export class ControleChamadosDesktopPage31CommentOpenTicketPage extends ControleChamadosCommentOpenTicketBase {
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
const isLoading: boolean = this.qryLocateTicketState === 'loading';
const hasError: boolean = this.qryLocateTicketState === 'error';
return html`
<section class="mx-auto flex max-w-5xl flex-col gap-6 p-6 text-[var(--text-default,#0f172a)]">
<header class="flex flex-col gap-2">
<h1 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.locateTicket.title']}</h1>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.opening']}</p>
</header>
${isLoading ? html`<div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-6" role="status">${msg['query.loading']}</div>` : nothing}
${hasError ? html`<div class="rounded-lg bg-[var(--status-error-bg,#fee2e2)] p-4 text-[var(--status-error-text,#991b1b)]" role="alert">${msg['query.error']}</div>` : nothing}
${!isLoading && !hasError && tickets.length === 0 ? html`<div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 text-[var(--text-muted,#64748b)]">${msg['intent.qryLocateTicket.list.empty']}</div>` : nothing}
${!isLoading && !hasError && tickets.length > 0 ? html`
<div class="overflow-x-auto rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-[var(--shadow-small,0 1px 2px rgba(0,0,0,.08))]">
<table class="w-full text-left text-sm">
<thead class="border-b border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)]">
<tr>
<th class="p-4 font-bold">${msg['intent.qryLocateTicket.list.column.ticketId.label']}</th>
<th class="p-4 font-bold">${msg['intent.qryLocateTicket.list.column.title.label']}</th>
<th class="p-4 font-bold">${msg['intent.qryLocateTicket.list.column.description.label']}</th>
<th class="p-4 font-bold">${msg['intent.qryLocateTicket.list.column.status.label']}</th>
<th class="p-4"><span class="sr-only">${msg['comment.choose']}</span></th>
</tr>
</thead>
<tbody>
${tickets.map((ticket: QryLocateTicketOutput) => html`
<tr class="border-b border-[var(--border-subtle,#e2e8f0)] last:border-0">
<td class="p-4 font-medium">${ticket.ticketId}</td>
<td class="p-4">${ticket.title}</td>
<td class="p-4 text-[var(--text-muted,#64748b)]">${ticket.description}</td>
<td class="p-4">${ticket.status}</td>
<td class="p-4 text-right">
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => { this.setCmdRecordCommentTicketId(ticket.ticketId); this.setUiScenary('recordComment'); }}>${msg['comment.choose']}</button>
</td>
</tr>`)}
</tbody>
</table>
</div>` : nothing}
${this.cmdRecordCommentState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-4 text-[var(--status-success-text,#166534)]" role="status">${msg['comment.success.detail']}</p>` : nothing}
</section>
`;
}
renderScenaryRecordComment() {
const msg = this.msg;
const hasText: boolean = this.cmdRecordCommentCommentText.trim().length > 0;
const isSaving: boolean = this.cmdRecordCommentState === 'loading';
const hasError: boolean = this.cmdRecordCommentState === 'error' && this.cmdRecordCommentError.length > 0;
return html`
<section class="mx-auto flex max-w-3xl flex-col gap-6 p-6 text-[var(--text-default,#0f172a)]">
<header class="flex flex-col gap-2">
<h1 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.recordComment.title']}</h1>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['comment.context']}: ${this.cmdRecordCommentTicketId}</p>
</header>
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0 1px 2px rgba(0,0,0,.08))]">
<h2 class="mb-4 text-base font-bold">${msg['section.comment-action.title']}</h2>
<label class="flex flex-col gap-2 text-sm font-medium" for="comment-text">
${msg['intent.cmdRecordComment.form.field.commentText.label']} <span class="text-[var(--status-error-text,#991b1b)]">*</span>
<textarea id="comment-text" class="min-h-32 rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdRecordCommentCommentText} @input=${this.handleCmdRecordCommentCommentTextChange} required></textarea>
</label>
${!hasText && this.cmdRecordCommentCommentText.length > 0 ? html`<p class="mt-2 text-sm text-[var(--status-error-text,#991b1b)]" role="alert">${msg['comment.required']}</p>` : nothing}
${hasError ? html`<p class="mt-4 rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]" role="alert">${this.cmdRecordCommentError || msg['action.cmdRecordComment.error']}</p>` : nothing}
<div class="mt-6 flex flex-wrap gap-3">
<button class="rounded-md border border-[var(--button-secondary-border,#cbd5e1)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => this.setUiScenary('base')}>${msg['comment.back']}</button>
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" ?disabled=${!this.cmdRecordCommentTicketId || !hasText || isSaving} title=${!this.cmdRecordCommentTicketId ? msg['comment.context'] : ''} @click=${this.handleCmdRecordCommentClick}>${isSaving ? msg['comment.saving'] : msg['intent.cmdRecordComment.form.action.cmdRecordComment']}</button>
</div>
</div>
</section>
`;
}
}
