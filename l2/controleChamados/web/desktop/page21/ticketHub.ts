/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page21/ticketHub.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosTicketHubBase } from '/_102047_/l2/controleChamados/web/shared/ticketHub.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryListTicketOutput,
QryListTicketCommentOutput,
} from '/_102047_/l2/controleChamados/web/shared/ticketHub.js';
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
// The copy you invent, with short keys. Only this part repeats per language.
'triage.headline': 'chamados precisam de atenção',
'triage.lane': 'Chamados em aberto',
'triage.clear': 'Nada precisa de atenção agora',
'triage.health': 'Visão geral',
'triage.total': 'Chamados no total',
'triage.comments': 'Comentários registrados',
'triage.loading': 'Carregando chamados',
'triage.error': 'Não foi possível carregar os chamados',
'triage.retry': 'Tentar novamente',
'ticket.status.open': 'Aberto',
'ticket.status.closed': 'Fechado',
'ticket.status.unknown': 'Status não informado',
'ticket.untitled': 'Chamado sem título',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--ticket-hub-102047')
export class ControleChamadosDesktopPage21TicketHubPage extends ControleChamadosTicketHubBase {
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
const tickets: QryListTicketOutput[] = this.qryListTicketData;
const comments: QryListTicketCommentOutput[] = this.qryListTicketCommentData;
const openTickets: QryListTicketOutput[] = tickets.filter((ticket: QryListTicketOutput) => ticket.status === 'open');
const statusLabel = (status: string): string => {
if (status === 'open') return msg['ticket.status.open'];
if (status === 'closed') return msg['ticket.status.closed'];
return msg['ticket.status.unknown'];
};
if (this.qryListTicketState === 'loading' && tickets.length === 0) {
return html`
<section class="space-y-4" aria-busy="true" aria-label=${msg['triage.loading']}>
<div class="h-8 w-2/5 animate-pulse rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
<div class="space-y-3">
${[1, 2, 3].map((index: number) => html`<div class="h-16 animate-pulse rounded-lg bg-[var(--surface-alt-bg,#f1f5f9)]" data-skeleton=${index}></div>`)}
</div>
</section>
`;
}
return html`
<section class="space-y-6">
<header>
<p class="text-2xl font-semibold text-[var(--text-strong,#172033)]">
${openTickets.length} ${msg['triage.headline']}
</p>
</header>
${this.qryListTicketState === 'error' ? html`
<div class="flex items-center justify-between rounded-lg bg-[var(--status-error-bg,#fef2f2)] px-4 py-3 text-[var(--status-error-text,#991b1b)]" role="alert">
<span>${msg['triage.error']}</span>
<button type="button" class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-[var(--button-secondary-text,#334155)]" @click=${this.handleQryListTicketClick}>${msg['triage.retry']}</button>
</div>
` : nothing}
<section aria-labelledby="ticket-triage-lane">
<h2 id="ticket-triage-lane" class="mb-3 text-lg font-semibold text-[var(--text-default,#0f172a)]">${msg['triage.lane']}</h2>
${openTickets.length === 0 ? html`<p class="rounded-lg bg-[var(--status-success-bg,#f0fdf4)] px-4 py-4 text-[var(--status-success-text,#166534)]">${msg['triage.clear']}</p>` : html`
<div class="divide-y divide-[var(--border-subtle,#e2e8f0)] rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)]">
${openTickets.map((ticket: QryListTicketOutput) => html`
<article class="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-4">
<div class="min-w-0">
<h3 class="truncate font-medium text-[var(--text-strong,#172033)]">${ticket.title || msg['ticket.untitled']}</h3>
<p class="mt-1 truncate text-sm text-[var(--text-muted,#64748b)]">${ticket.description || nothing}</p>
</div>
<div class="text-right">
<p class="font-medium tabular-nums text-[var(--status-warning-text,#92400e)]">${statusLabel(ticket.status)}</p>
<p class="mt-1 text-xs text-[var(--text-muted,#64748b)]">${ticket.ticketId}</p>
</div>
</article>
`)}
</div>
`}
</section>
<section class="border-t border-[var(--border-subtle,#e2e8f0)] pt-4" aria-labelledby="ticket-health">
<h2 id="ticket-health" class="sr-only">${msg['triage.health']}</h2>
<div class="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--text-muted,#64748b)]">
<span><strong class="mr-1 text-[var(--text-default,#0f172a)] tabular-nums">${tickets.length}</strong>${msg['triage.total']}</span>
<span><strong class="mr-1 text-[var(--text-default,#0f172a)] tabular-nums">${comments.length}</strong>${msg['triage.comments']}</span>
</div>
</section>
</section>
`;
}
}
