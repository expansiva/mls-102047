/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page31/ticketHub.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosTicketHubBase } from '/_102047_/l2/controleChamados/web/shared/ticketHub.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.collection.title': 'Carteira de chamados',
'organism.qryListTicket.title': 'Listar Chamado',
'intent.qryListTicket.list.title': 'Listar Chamado',
'intent.qryListTicket.list.empty': 'Nenhum registro encontrado',
'intent.qryListTicket.list.column.ticketId.label': 'Identificador do chamado',
'intent.qryListTicket.list.column.title.label': 'Título',
'intent.qryListTicket.list.column.description.label': 'Descrição',
'intent.qryListTicket.list.column.status.label': 'Status',
'intent.qryListTicket.list.filter.search.label': 'Search',
'intent.qryListTicket.list.filter.sortBy.label': 'Sort By',
'intent.qryListTicket.list.filter.sortOrder.label': 'Sort Order',
'section.record.title': 'Chamado selecionado e comentários',
'organism.qryListTicketComment.title': 'Listar Comentário do chamado',
'intent.qryListTicketComment.list.title': 'Listar Comentário do chamado',
'intent.qryListTicketComment.list.empty': 'Nenhum registro encontrado',
'intent.qryListTicketComment.list.column.ticketCommentId.label': 'Identificador do comentário',
'intent.qryListTicketComment.list.column.ticketId.label': 'Identificador do chamado',
'intent.qryListTicketComment.list.column.commentText.label': 'Comentário',
'section.ticket-workspace.title': 'Carteira de chamados',
'section.ticket-context.title': 'Chamado selecionado',
'scenary.base': 'Listar Chamado',
'stat.tickets': 'Chamados na carteira',
'stat.comments': 'Comentários disponíveis',
'board.search.placeholder': 'Pesquisar chamados',
'board.sort.open': 'Abertos primeiro',
'board.sort.closed': 'Fechados primeiro',
'board.order.asc': 'Ordem crescente',
'board.order.desc': 'Ordem decrescente',
'board.refresh': 'Atualizar chamados',
'board.loading': 'Carregando chamados',
'board.error': 'Não foi possível carregar os chamados',
'board.retry': 'Tentar novamente',
'board.comments.loading': 'Carregando comentários',
'board.comments.error': 'Não foi possível carregar os comentários',
'board.comments.retry': 'Tentar novamente',
'board.seeAll': 'Ver todos',
'board.noDescription': 'Sem descrição',
'board.status.open': 'Aberto',
'board.status.closed': 'Fechado',
'board.status.other': 'Em atendimento',
// The copy you invent, with short keys. Only this part repeats per language.
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--ticket-hub-102047')
export class ControleChamadosDesktopPage31TicketHubPage extends ControleChamadosTicketHubBase {
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
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const tickets = this.qryListTicketData;
const comments = this.qryListTicketCommentData;
const ticketCount = this.qryListTicketState === 'loading' ? nothing : html`${tickets.length}`;
const commentCount = this.qryListTicketCommentState === 'loading' ? nothing : html`${comments.length}`;
const statusLabel = (status: string): string => {
if (status === 'open') return msg['board.status.open'];
if (status === 'closed') return msg['board.status.closed'];
return msg['board.status.other'];
};
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] p-4 md:p-6 text-[var(--text-default,#0f172a)]">
<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
<div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-[var(--shadow-small,0 1px 2px rgba(0,0,0,.08))]">
<div class="text-3xl font-bold tabular-nums text-[var(--text-strong,#0f172a)]">${ticketCount}</div>
<div class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${msg['stat.tickets']}</div>
</div>
<div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 shadow-[var(--shadow-small,0 1px 2px rgba(0,0,0,.08))]">
<div class="text-3xl font-bold tabular-nums text-[var(--text-strong,#0f172a)]">${commentCount}</div>
<div class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${msg['stat.comments']}</div>
</div>
</div>
<div class="grid gap-6 lg:grid-cols-2">
<section class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4">
<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
<div>
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.collection.title']}</h2>
</div>
<div class="flex flex-col gap-2 sm:flex-row">
<label class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicket.list.filter.search.label']}
<input class="mt-1 block rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]" type="search" .value=${this.qryListTicketSearch} placeholder=${msg['board.search.placeholder']} @input=${this.handleQryListTicketSearchChange} />
</label>
</div>
</div>
${this.qryListTicketState === 'loading' ? html`<div class="space-y-3" role="status" aria-label=${msg['board.loading']}><div class="h-16 animate-pulse rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div><div class="h-16 animate-pulse rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div></div>` : nothing}
${this.qryListTicketState === 'error' ? html`<div class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]" role="alert">${msg['board.error']} <button class="ml-3 underline" @click=${this.handleQryListTicketClick}>${msg['board.retry']}</button></div>` : nothing}
${this.qryListTicketState !== 'loading' && this.qryListTicketState !== 'error' && tickets.length === 0 ? html`<p class="py-6 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicket.list.empty']}</p>` : nothing}
${this.qryListTicketState !== 'loading' && this.qryListTicketState !== 'error' && tickets.length > 0 ? html`<div class="space-y-2">
${tickets.slice(0, 5).map((ticket) => html`<article class="rounded-md border border-[var(--border-subtle,#e2e8f0)] p-3">
<div class="flex items-start justify-between gap-3"><h3 class="font-medium text-[var(--text-strong,#0f172a)]">${ticket.title}</h3><span class="rounded-full bg-[var(--status-neutral-bg,#f1f5f9)] px-2 py-1 text-xs text-[var(--status-neutral-text,#475569)]">${statusLabel(ticket.status)}</span></div>
<p class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${ticket.description || msg['board.noDescription']}</p>
</article>`)}
</div>` : nothing}
<div class="mt-4 flex justify-end"><button class="text-sm text-[var(--link-text,#2563eb)]" disabled title=${msg['board.seeAll']}>${msg['board.seeAll']}</button></div>
</section>
<section class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4">
<h2 class="mb-4 text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.record.title']}</h2>
${this.qryListTicketCommentState === 'loading' ? html`<div class="space-y-3" role="status" aria-label=${msg['board.comments.loading']}><div class="h-14 animate-pulse rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div><div class="h-14 animate-pulse rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div></div>` : nothing}
${this.qryListTicketCommentState === 'error' ? html`<div class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]" role="alert">${msg['board.comments.error']} <button class="ml-3 underline" @click=${this.handleQryListTicketCommentClick}>${msg['board.comments.retry']}</button></div>` : nothing}
${this.qryListTicketCommentState !== 'loading' && this.qryListTicketCommentState !== 'error' && comments.length === 0 ? html`<p class="py-6 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicketComment.list.empty']}</p>` : nothing}
${this.qryListTicketCommentState !== 'loading' && this.qryListTicketCommentState !== 'error' && comments.length > 0 ? html`<div class="space-y-2">${comments.slice(0, 5).map((comment) => html`<article class="rounded-md border border-[var(--border-subtle,#e2e8f0)] p-3"><p class="text-sm text-[var(--text-default,#0f172a)]">${comment.commentText}</p><p class="mt-1 text-xs text-[var(--text-muted,#64748b)]">${comment.ticketId}</p></article>`)}</div>` : nothing}
<div class="mt-4 flex justify-end"><button class="text-sm text-[var(--link-text,#2563eb)]" disabled title=${msg['board.seeAll']}>${msg['board.seeAll']}</button></div>
</section>
</div>
</div>
`;
}
}
