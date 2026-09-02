/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page11/ticketHub.ts" enhancement="_102020_/l2/enhancementAura"/>

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
'page.search.placeholder': 'Buscar por título ou descrição',
'page.filter.all': 'Todos',
'page.sortBy.open': 'Abertos',
'page.sortBy.closed': 'Fechados',
'page.sortOrder.asc': 'Crescente',
'page.sortOrder.desc': 'Decrescente',
'page.refresh': 'Atualizar chamados',
'page.refreshComments': 'Atualizar comentários',
'page.loading': 'Carregando dados',
'page.error': 'Não foi possível carregar os dados',
'page.comments.empty': 'Nenhum comentário encontrado',
'page.comment.ticket': 'Chamado',
'page.status.open': 'Aberto',
'page.status.closed': 'Fechado',
'page.status.pending': 'Pendente',
'page.status.inProgress': 'Em andamento',
'page.status.completed': 'Concluído',
'page.status.cancelled': 'Cancelado',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--ticket-hub-102047')
export class ControleChamadosDesktopPage11TicketHubPage extends ControleChamadosTicketHubBase {
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
const statusLabels: Record<string, string> = {
open: msg['page.status.open'],
closed: msg['page.status.closed'],
pending: msg['page.status.pending'],
inProgress: msg['page.status.inProgress'],
completed: msg['page.status.completed'],
cancelled: msg['page.status.cancelled'],
};
const ticketLoading = this.qryListTicketState === 'loading';
const commentLoading = this.qryListTicketCommentState === 'loading';
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]">
<div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
<header class="space-y-1">
<h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.collection.title']}</h1>
</header>
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-sm p-4 space-y-4" aria-labelledby="ticket-list-title">
<div class="flex flex-wrap items-end justify-between gap-3">
<div>
<h2 id="ticket-list-title" class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['intent.qryListTicket.list.title']}</h2>
</div>
<button type="button" class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${this.handleQryListTicketClick} ?disabled=${ticketLoading}>
${ticketLoading ? msg['page.loading'] : msg['page.refresh']}
</button>
</div>
<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
<label class="space-y-1">
<span class="block text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicket.list.filter.search.label']}</span>
<input class="w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" type="search" .value=${this.qryListTicketSearch} placeholder=${msg['page.search.placeholder']} @input=${this.handleQryListTicketSearchChange} />
</label>
</div>
${ticketLoading ? html`<p class="rounded-md bg-[var(--status-info-bg,#dbeafe)] px-3 py-2 text-[var(--status-info-text,#1e3a8a)]">${msg['page.loading']}</p>` : nothing}
${this.qryListTicketState === 'error' ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-[var(--status-error-text,#991b1b)]">${msg['page.error']}</p>` : nothing}
${!ticketLoading && tickets.length === 0 ? html`<p class="py-4 text-[var(--text-muted,#64748b)]">${msg['intent.qryListTicket.list.empty']}</p>` : nothing}
${tickets.length > 0 ? html`
<div class="overflow-x-auto">
<table class="w-full text-left text-sm">
<thead><tr class="border-b border-[var(--border-subtle,#e2e8f0)]">
<th class="px-3 py-2">${msg['intent.qryListTicket.list.column.title.label']}</th>
<th class="px-3 py-2">${msg['intent.qryListTicket.list.column.description.label']}</th>
<th class="px-3 py-2">${msg['intent.qryListTicket.list.column.status.label']}</th>
</tr></thead>
<tbody>
${tickets.map((item) => html`<tr class="border-b border-[var(--border-subtle,#e2e8f0)]">
<td class="px-3 py-3 font-medium text-[var(--text-strong,#0f172a)]">${item.title}</td>
<td class="px-3 py-3 text-[var(--text-muted,#64748b)]">${item.description}</td>
<td class="px-3 py-3"><span class="rounded-full bg-[var(--status-neutral-bg,#f1f5f9)] px-2 py-1 text-[var(--status-neutral-text,#334155)]">${statusLabels[String(item.status)] ?? String(item.status)}</span></td>
</tr>`)}
</tbody>
</table>
</div>` : nothing}
</section>
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-sm p-4 space-y-4" aria-labelledby="comment-list-title">
<div class="flex flex-wrap items-center justify-between gap-3">
<h2 id="comment-list-title" class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.record.title']}</h2>
<button type="button" class="rounded-md border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${this.handleQryListTicketCommentClick} ?disabled=${commentLoading}>
${commentLoading ? msg['page.loading'] : msg['page.refreshComments']}
</button>
</div>
${commentLoading ? html`<p class="rounded-md bg-[var(--status-info-bg,#dbeafe)] px-3 py-2 text-[var(--status-info-text,#1e3a8a)]">${msg['page.loading']}</p>` : nothing}
${this.qryListTicketCommentState === 'error' ? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-[var(--status-error-text,#991b1b)]">${msg['page.error']}</p>` : nothing}
${!commentLoading && comments.length === 0 ? html`<p class="py-4 text-[var(--text-muted,#64748b)]">${msg['page.comments.empty']}</p>` : nothing}
${comments.length > 0 ? html`<div class="space-y-3">${comments.map((comment) => html`
<article class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['page.comment.ticket']}: ${comment.ticketId}</p>
<p class="mt-1 text-[var(--text-default,#0f172a)]">${comment.commentText}</p>
</article>`)} </div>` : nothing}
</section>
</div>
</div>
`;
}
}
