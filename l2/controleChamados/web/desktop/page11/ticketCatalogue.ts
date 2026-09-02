/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page11/ticketCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosTicketCatalogueBase } from '/_102047_/l2/controleChamados/web/shared/ticketCatalogue.js';
import type { QryListTicketOutput, QryGetTicketOutput } from '/_102047_/l2/controleChamados/web/shared/ticketCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.recordList.title': 'Localizar chamados',
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
'organism.qryLocateTicket.title': 'Localizar o chamado aberto',
'intent.qryLocateTicket.list.title': 'Localizar o chamado aberto',
'intent.qryLocateTicket.list.empty': 'Nenhum registro encontrado',
'intent.qryLocateTicket.list.column.ticketId.label': 'Identificador do chamado',
'intent.qryLocateTicket.list.column.title.label': 'Título',
'intent.qryLocateTicket.list.column.description.label': 'Descrição',
'intent.qryLocateTicket.list.column.status.label': 'Status',
'organism.cmdDeleteTicket.title': 'Excluir Chamado',
'intent.cmdDeleteTicket.form.title': 'Excluir Chamado',
'intent.cmdDeleteTicket.form.action.cmdDeleteTicket': 'Excluir Chamado',
'organism.qryGetTicket.title': 'Obter Chamado',
'intent.qryGetTicket.list.title': 'Obter Chamado',
'intent.qryGetTicket.list.empty': 'Nenhum registro encontrado',
'intent.qryGetTicket.list.column.ticketId.label': 'Identificador do chamado',
'intent.qryGetTicket.list.column.title.label': 'Título',
'intent.qryGetTicket.list.column.description.label': 'Descrição',
'intent.qryGetTicket.list.column.status.label': 'Status',
'section.recordForm.title': 'Criar ou corrigir chamado',
'organism.cmdCreateTicket.title': 'Criar Chamado',
'intent.cmdCreateTicket.form.title': 'Criar Chamado',
'intent.cmdCreateTicket.form.action.cmdCreateTicket': 'Criar Chamado',
'intent.cmdCreateTicket.form.field.title.label': 'Título',
'intent.cmdCreateTicket.form.field.description.label': 'Descrição',
'intent.cmdCreateTicket.form.field.status.label': 'Status',
'organism.cmdUpdateTicket.title': 'Atualizar Chamado',
'intent.cmdUpdateTicket.form.title': 'Atualizar Chamado',
'intent.cmdUpdateTicket.form.action.cmdUpdateTicket': 'Atualizar Chamado',
'intent.cmdUpdateTicket.form.field.title.label': 'Título',
'intent.cmdUpdateTicket.form.field.description.label': 'Descrição',
'intent.cmdUpdateTicket.form.field.status.label': 'Status',
'section.decideClosure.title': 'Decidir fechamento',
'organism.cmdDecideClosure.title': 'Confirmar o fechamento do chamado',
'intent.cmdDecideClosure.form.title': 'Confirmar o fechamento do chamado',
'intent.cmdDecideClosure.form.action.cmdDecideClosure': 'Confirmar o fechamento do chamado',
'intent.cmdDecideClosure.form.field.status.label': 'Status',
'action.cmdCreateTicket.success': 'Criar Chamado: OK',
'action.cmdCreateTicket.error': 'Criar Chamado: falhou',
'action.cmdUpdateTicket.success': 'Atualizar Chamado: OK',
'action.cmdUpdateTicket.error': 'Atualizar Chamado: falhou',
'action.cmdDeleteTicket.success': 'Excluir Chamado: OK',
'action.cmdDeleteTicket.error': 'Excluir Chamado: falhou',
'action.cmdDecideClosure.success': 'Confirmar o fechamento do chamado: OK',
'action.cmdDecideClosure.error': 'Confirmar o fechamento do chamado: falhou',
'scenary.base': 'Listar Chamado',
'scenary.detail': 'Obter Chamado',
'scenary.createTicket': 'Criar Chamado',
'scenary.updateTicket': 'Atualizar Chamado',
'scenary.decideClosure': 'Confirmar o fechamento do chamado',
'scenary.back': 'Voltar',
'page.title': 'Chamados',
'common.loading': 'Carregando...',
'common.refresh': 'Atualizar lista',
'common.create': 'Novo chamado',
'common.edit': 'Editar chamado',
'common.close': 'Decidir fechamento',
'common.delete': 'Excluir chamado',
'common.cancel': 'Cancelar',
'common.select': 'Selecionar',
'common.selected': 'Chamado selecionado',
'common.chooseStatus': 'Selecione o status',
'filter.all': 'Todos',
'filter.open': 'Abertos',
'filter.closed': 'Fechados',
'status.open': 'Aberto',
'status.closed': 'Fechado',
'feedback.noSelection': 'Selecione um chamado para continuar.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--ticket-catalogue-102047')
export class ControleChamadosDesktopPage11TicketCataloguePage extends ControleChamadosTicketCatalogueBase {
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
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.uiScenary}
@change=${this.handleUiScenaryChange} backLabel=${msg['scenary.back']}>
<Scene value="base" title=${msg['scenary.base']}>${this.renderScenaryBase()}</Scene>
<Scene value="detail" title=${msg['scenary.detail']} nav="back">${this.renderScenaryDetail()}</Scene>
<Scene value="createTicket" title=${msg['scenary.createTicket']}>${this.renderScenaryCreateTicket()}</Scene>
<Scene value="updateTicket" title=${msg['scenary.updateTicket']}>${this.renderScenaryUpdateTicket()}</Scene>
<Scene value="decideClosure" title=${msg['scenary.decideClosure']}>${this.renderScenaryDecideClosure()}</Scene>
</molecules--ml-scenary-102020>`;
}
renderScenaryBase() {
const msg = this.msg;
const statusLabel: Record<string, string> = { open: msg['status.open'], closed: msg['status.closed'] };
const rows: QryListTicketOutput[] = this.qryListTicketData;
const openRows: QryListTicketOutput[] = this.qryLocateTicketData;
const renderRow = (item: QryListTicketOutput) => html`<tr class="border-b border-[var(--border-subtle,#e2e8f0)] cursor-pointer ${item.ticketId === this.qryGetTicketTicketId ? 'bg-[var(--selected-bg,#eef2ff)]' : ''}" @click=${() => { this.setQryGetTicketTicketId(String(item.ticketId)); this.setCmdUpdateTicketTicketId(String(item.ticketId)); this.setCmdDeleteTicketTicketId(String(item.ticketId)); this.setCmdDecideClosureTicketId(String(item.ticketId)); void this.loadQryGetTicket(); }}><td class="px-3 py-3">${item.title}</td><td class="px-3 py-3">${item.description}</td><td class="px-3 py-3">${statusLabel[String(item.status)] ?? String(item.status)}</td></tr>`;
return html`<div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]"><div class="max-w-6xl mx-auto px-4 py-6 space-y-6"><header class="flex items-center justify-between gap-4"><h1 class="text-2xl font-bold">${msg['page.title']}</h1><button class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('createTicket')}>${msg['common.create']}</button></header>
${this.cmdCreateTicketState === 'success' ? html`<p role="status" class="p-3 rounded-md bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateTicket.success']}</p>` : nothing}
${this.cmdUpdateTicketState === 'success' ? html`<p role="status" class="p-3 rounded-md bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateTicket.success']}</p>` : nothing}
${this.cmdDeleteTicketState === 'success' ? html`<p role="status" class="p-3 rounded-md bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteTicket.success']}</p>` : nothing}
${this.cmdDecideClosureState === 'success' ? html`<p role="status" class="p-3 rounded-md bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdDecideClosure.success']}</p>` : nothing}
<section class="rounded-lg bg-[var(--surface-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] p-4 space-y-4"><h2 class="text-lg font-semibold">${msg['section.recordList.title']}</h2><div class="flex flex-wrap gap-3 items-end"><label class="flex flex-col gap-1">${msg['intent.qryListTicket.list.filter.search.label']}<input class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" .value=${this.qryListTicketSearch} @input=${this.handleQryListTicketSearchChange}></label><button class="rounded-md px-3 py-2 bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryListTicketClick}>${msg['common.refresh']}</button></div>${this.qryListTicketState === 'loading' ? html`<p>${msg['common.loading']}</p>` : rows.length === 0 ? html`<p>${msg['intent.qryListTicket.list.empty']}</p>` : html`<div class="overflow-x-auto"><table class="w-full text-left"><thead><tr class="border-b border-[var(--border-default,#e2e8f0)]"><th class="px-3 py-2">${msg['intent.qryListTicket.list.column.title.label']}</th><th class="px-3 py-2">${msg['intent.qryListTicket.list.column.description.label']}</th><th class="px-3 py-2">${msg['intent.qryListTicket.list.column.status.label']}</th></tr></thead><tbody>${rows.map(renderRow)}</tbody></table></div>`}</section>
<section class="rounded-lg bg-[var(--surface-alt-bg,#f1f5f9)] p-4"><h2 class="text-lg font-semibold">${msg['organism.qryLocateTicket.title']}</h2>${this.qryLocateTicketState === 'loading' ? html`<p>${msg['common.loading']}</p>` : openRows.length === 0 ? html`<p>${msg['intent.qryLocateTicket.list.empty']}</p>` : html`<ul class="space-y-2">${openRows.map((item: QryListTicketOutput) => html`<li><button class="w-full text-left rounded-md p-2 hover:bg-[var(--selected-bg,#eef2ff)]" @click=${() => { this.setQryGetTicketTicketId(String(item.ticketId)); this.setCmdUpdateTicketTicketId(String(item.ticketId)); this.setCmdDeleteTicketTicketId(String(item.ticketId)); this.setCmdDecideClosureTicketId(String(item.ticketId)); void this.loadQryGetTicket(); }}>${item.title} — ${statusLabel[String(item.status)] ?? String(item.status)}</button></li>`)}</ul>`}</section></div></div>`;
}
renderScenaryDetail() {
const msg = this.msg;
const ticket: QryGetTicketOutput | null = this.qryGetTicketData;
return html`<div class="max-w-6xl mx-auto px-4 py-6 space-y-4">${this.qryGetTicketState === 'loading' ? html`<p>${msg['common.loading']}</p>` : ticket === null ? html`<p>${msg['feedback.noSelection']}</p>` : html`<section class="rounded-lg bg-[var(--surface-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] p-5 space-y-3"><h2 class="text-lg font-semibold">${ticket.title}</h2><dl class="space-y-2"><dt class="font-semibold">${msg['intent.qryGetTicket.list.column.description.label']}</dt><dd>${ticket.description}</dd><dt class="font-semibold">${msg['intent.qryGetTicket.list.column.status.label']}</dt><dd>${String(ticket.status) === 'open' ? msg['status.open'] : msg['status.closed']}</dd></dl><div class="flex flex-wrap gap-2 pt-3"><button class="rounded-md px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('updateTicket')}>${msg['common.edit']}</button><button class="rounded-md px-3 py-2 bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('decideClosure')}>${msg['common.close']}</button><button title=${this.cmdDeleteTicketTicketId ? nothing : msg['feedback.noSelection']} class="rounded-md px-3 py-2 bg-[var(--button-danger-bg,#dc2626)] text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdDeleteTicketTicketId || this.cmdDeleteTicketState === 'loading'} @click=${(event: Event) => { if (window.confirm(msg['common.delete'] + ': ' + ticket.title)) this.handleCmdDeleteTicketClick(event); }}>${this.cmdDeleteTicketState === 'loading' ? msg['common.loading'] : msg['common.delete']}</button></div>${this.cmdDeleteTicketState === 'error' ? html`<p role="alert" class="p-3 rounded-md bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]">${this.cmdDeleteTicketError || msg['action.cmdDeleteTicket.error']}</p>` : nothing}</section>`}</div>`;
}
renderScenaryCreateTicket() {
const msg = this.msg;
return html`<div class="max-w-2xl mx-auto px-4 py-6"><form class="rounded-lg bg-[var(--surface-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] p-5 space-y-4" @submit=${this.handleCmdCreateTicketClick}><h2 class="text-lg font-semibold">${msg['intent.cmdCreateTicket.form.title']}</h2><label class="block">${msg['intent.cmdCreateTicket.form.field.title.label']}<input required class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" .value=${this.cmdCreateTicketTitle} @input=${this.handleCmdCreateTicketTitleChange}></label><label class="block">${msg['intent.cmdCreateTicket.form.field.description.label']}<textarea required class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2" .value=${this.cmdCreateTicketDescription} @input=${this.handleCmdCreateTicketDescriptionChange}></textarea></label><label class="block">${msg['intent.cmdCreateTicket.form.field.status.label']}<select required class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] px-3 py-2" .value=${this.cmdCreateTicketStatus} @change=${this.handleCmdCreateTicketStatusChange}><option value="">${msg['common.chooseStatus']}</option><option value="open">${msg['status.open']}</option><option value="closed">${msg['status.closed']}</option></select></label><div class="flex gap-2"><button type="button" class="rounded-md px-3 py-2 border border-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('base')}>${msg['common.cancel']}</button><button type="submit" class="rounded-md px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${this.cmdCreateTicketState === 'loading'}>${this.cmdCreateTicketState === 'loading' ? msg['common.loading'] : msg['intent.cmdCreateTicket.form.action.cmdCreateTicket']}</button></div>${this.cmdCreateTicketState === 'error' ? html`<p role="alert" class="p-3 bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]">${this.cmdCreateTicketError || msg['action.cmdCreateTicket.error']}</p>` : nothing}</form></div>`;
}
renderScenaryUpdateTicket() {
const msg = this.msg;
return html`<div class="max-w-2xl mx-auto px-4 py-6"><form class="rounded-lg bg-[var(--surface-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] p-5 space-y-4" @submit=${this.handleCmdUpdateTicketClick}><h2 class="text-lg font-semibold">${msg['intent.cmdUpdateTicket.form.title']}</h2><p>${this.cmdUpdateTicketTicketId ? msg['common.selected'] : msg['feedback.noSelection']}</p><label class="block">${msg['intent.cmdUpdateTicket.form.field.title.label']}<input required class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] px-3 py-2" .value=${this.cmdUpdateTicketTitle} @input=${this.handleCmdUpdateTicketTitleChange}></label><label class="block">${msg['intent.cmdUpdateTicket.form.field.description.label']}<textarea required class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] px-3 py-2" .value=${this.cmdUpdateTicketDescription} @input=${this.handleCmdUpdateTicketDescriptionChange}></textarea></label><label class="block">${msg['intent.cmdUpdateTicket.form.field.status.label']}<select required class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] px-3 py-2" .value=${this.cmdUpdateTicketStatus} @change=${this.handleCmdUpdateTicketStatusChange}><option value="">${msg['common.chooseStatus']}</option><option value="open">${msg['status.open']}</option><option value="closed">${msg['status.closed']}</option></select></label><div class="flex gap-2"><button type="button" class="rounded-md px-3 py-2 border border-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('base')}>${msg['common.cancel']}</button><button title=${this.cmdUpdateTicketTicketId ? nothing : msg['feedback.noSelection']} type="submit" class="rounded-md px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdUpdateTicketTicketId || this.cmdUpdateTicketState === 'loading'}>${this.cmdUpdateTicketState === 'loading' ? msg['common.loading'] : msg['intent.cmdUpdateTicket.form.action.cmdUpdateTicket']}</button></div>${this.cmdUpdateTicketState === 'error' ? html`<p role="alert" class="p-3 bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateTicketError || msg['action.cmdUpdateTicket.error']}</p>` : nothing}</form></div>`;
}
renderScenaryDecideClosure() {
const msg = this.msg;
return html`<div class="max-w-2xl mx-auto px-4 py-6"><section class="rounded-lg bg-[var(--surface-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] p-5 space-y-4"><h2 class="text-lg font-semibold">${msg['intent.cmdDecideClosure.form.title']}</h2><p>${this.cmdDecideClosureTicketId ? msg['common.selected'] : msg['feedback.noSelection']}</p><label class="block">${msg['intent.cmdDecideClosure.form.field.status.label']}<select class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] px-3 py-2" .value=${this.cmdDecideClosureStatus} @change=${this.handleCmdDecideClosureStatusChange}><option value="">${msg['common.chooseStatus']}</option><option value="open">${msg['status.open']}</option><option value="closed">${msg['status.closed']}</option></select></label><div class="flex gap-2"><button class="rounded-md px-3 py-2 border border-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('base')}>${msg['common.cancel']}</button><button title=${this.cmdDecideClosureTicketId ? nothing : msg['feedback.noSelection']} class="rounded-md px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdDecideClosureTicketId || this.cmdDecideClosureState === 'loading'} @click=${this.handleCmdDecideClosureClick}>${this.cmdDecideClosureState === 'loading' ? msg['common.loading'] : msg['intent.cmdDecideClosure.form.action.cmdDecideClosure']}</button></div>${this.cmdDecideClosureState === 'error' ? html`<p role="alert" class="p-3 bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]">${this.cmdDecideClosureError || msg['action.cmdDecideClosure.error']}</p>` : nothing}</section></div>`;
}
}
