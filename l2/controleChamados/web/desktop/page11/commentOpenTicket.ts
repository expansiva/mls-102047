/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page11/commentOpenTicket.ts" enhancement="_102020_/l2/enhancementAura"/>

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
'common.refresh': 'Atualizar lista',
'common.loading': 'Carregando...',
'common.selectTicket': 'Selecione um chamado para continuar',
'common.back': 'Voltar',
'common.requiredTicket': 'Informe ou selecione um chamado antes de continuar',
'common.noDescription': 'Sem descrição',
'common.status.open': 'Aberto',
'common.status.inProgress': 'Em atendimento',
'common.status.pending': 'Pendente',
'common.status.closed': 'Fechado',
'common.status.cancelled': 'Cancelado',
'common.status.unknown': 'Não informado',
'common.commentProgress': 'Registrando comentário...',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--comment-open-ticket-102047')
export class ControleChamadosDesktopPage11CommentOpenTicketPage extends ControleChamadosCommentOpenTicketBase {
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
const statusLabel: Record<string, string> = {
open: msg['common.status.open'],
inProgress: msg['common.status.inProgress'],
pending: msg['common.status.pending'],
closed: msg['common.status.closed'],
cancelled: msg['common.status.cancelled'],
};
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]">
<div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-sm p-6">
<h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.locateTicket.title']}</h1>
<div class="mt-4 flex items-center justify-between gap-4">
<h2 class="text-lg font-semibold text-[var(--text-default,#0f172a)]">${msg['organism.qryLocateTicket.title']}</h2>
<button type="button" class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)] px-4 py-2" @click=${this.handleQryLocateTicketClick} ?disabled=${this.qryLocateTicketState === 'loading'}>
${this.qryLocateTicketState === 'loading' ? msg['common.loading'] : msg['common.refresh']}
</button>
</div>
${this.qryLocateTicketState === 'loading' ? html`<p class="mt-4 text-[var(--text-muted,#64748b)]">${msg['common.loading']}</p>` : this.qryLocateTicketData.length === 0 ? html`<p class="mt-4 text-[var(--text-muted,#64748b)]">${msg['intent.qryLocateTicket.list.empty']}</p>` : html`
<div class="mt-4 overflow-x-auto">
<table class="w-full text-left">
<thead><tr class="border-b border-[var(--border-subtle,#e2e8f0)]">
<th class="px-3 py-3">${msg['intent.qryLocateTicket.list.column.title.label']}</th>
<th class="px-3 py-3">${msg['intent.qryLocateTicket.list.column.description.label']}</th>
<th class="px-3 py-3">${msg['intent.qryLocateTicket.list.column.status.label']}</th>
</tr></thead>
<tbody>${this.qryLocateTicketData.map((item: QryLocateTicketOutput) => html`
<tr class="cursor-pointer border-b border-[var(--border-subtle,#e2e8f0)] hover:bg-[var(--selected-bg,#f1f5f9)] ${item.ticketId === this.cmdRecordCommentTicketId ? 'bg-[var(--selected-bg,#f1f5f9)]' : ''}" aria-selected=${item.ticketId === this.cmdRecordCommentTicketId} @click=${() => { this.setCmdRecordCommentTicketId(item.ticketId); this.setUiScenary('recordComment'); }}>
<td class="px-3 py-3">${item.title}</td>
<td class="px-3 py-3">${item.description || msg['common.noDescription']}</td>
<td class="px-3 py-3">${statusLabel[item.status] ?? msg['common.status.unknown']}</td>
</tr>` )}</tbody>
</table>
</div>`}
${this.cmdRecordCommentState === 'success' ? html`<p class="mt-4 rounded-md bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] p-3" role="status">${msg['action.cmdRecordComment.success']}</p>` : nothing}
</section>
</div>
</div>
`;
}
renderScenaryRecordComment() {
const msg = this.msg;
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]">
<div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-sm p-6">
<h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.recordComment.title']}</h1>
<div class="mt-6 space-y-4">
<div class="rounded-md bg-[var(--surface-alt-bg,#f8fafc)] p-4">
<h2 class="font-semibold text-[var(--text-default,#0f172a)]">${msg['section.ticket-context.title']}</h2>
<p class="mt-2 text-[var(--text-muted,#64748b)]">${this.cmdRecordCommentTicketId || msg['common.selectTicket']}</p>
</div>
<div>
<h2 class="font-semibold text-[var(--text-default,#0f172a)]">${msg['section.comment-action.title']}</h2>
<label class="mt-2 block text-[var(--text-default,#0f172a)]" for="comment-text">${msg['intent.cmdRecordComment.form.field.commentText.label']}</label>
<textarea id="comment-text" class="mt-1 min-h-32 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3 text-[var(--text-default,#0f172a)]" .value=${this.cmdRecordCommentCommentText} @input=${this.handleCmdRecordCommentCommentTextChange}></textarea>
</div>
<div class="flex items-center gap-3">
<button type="button" class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)] px-4 py-2" @click=${() => this.setUiScenary('base')}>${msg['common.back']}</button>
<button type="button" title=${!this.cmdRecordCommentTicketId ? msg['common.requiredTicket'] : nothing} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] px-4 py-2" @click=${this.handleCmdRecordCommentClick} ?disabled=${!this.cmdRecordCommentTicketId || this.cmdRecordCommentState === 'loading'}>
${this.cmdRecordCommentState === 'loading' ? msg['common.commentProgress'] : msg['intent.cmdRecordComment.form.action.cmdRecordComment']}
</button>
</div>
${!this.cmdRecordCommentTicketId ? html`<p class="text-[var(--text-muted,#64748b)]">${msg['common.requiredTicket']}</p>` : nothing}
${this.cmdRecordCommentState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] p-3" role="alert">${this.cmdRecordCommentError || msg['action.cmdRecordComment.error']}</p>` : nothing}
</div>
</section>
</div>
</div>
`;
}
}
