/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/agenda.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaShared } from '/_102047_/l2/agendaClinica/web/shared/agenda.js';
import type { ListConsultaItem } from '/_102047_/l2/agendaClinica/web/contracts/agenda.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
/// **collab_i18n_start**
const pageMessage_pt = {
agendaTitle: 'Agenda clínica',
agendaDescription: 'Consulte suas consultas e registre o atendimento.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const LIST_STATUS_MEMBER = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073' as const;
const QUERY_STATUS_MEMBER = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073' as const;
type AgendaElement = AgendaShared & {
[LIST_STATUS_MEMBER]: 'idle' | 'loading' | 'success' | 'empty' | 'error';
[QUERY_STATUS_MEMBER]: 'idle' | 'loading' | 'success' | 'error';
};
@customElement('agenda-clinica--web--desktop--page11--agenda-102047')
class AgendaDesktopPage11 extends AgendaShared {
protected get msg(): PageMessageType {
return pageMessages[(document.documentElement.lang || 'pt').toLowerCase()] ?? pageMessages.pt;
}
private selectedConsulta(): ListConsultaItem | undefined {
const id = this.stateRegistrarAtendimentoId;
return id === null ? undefined : this.stateListConsultaResult.find((item: ListConsultaItem) => item.id === id);
}
private patientName(item: ListConsultaItem): string {
return item.consultaPaciente?.details?.identification?.name ?? 'Paciente não identificado';
}
private formatDate(value: string): string {
const date = new Date(value);
return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}
private statusLabel(status: ListConsultaItem['status']): string {
if (status === 'scheduled') return 'Agendada';
if (status === 'attended') return 'Atendida';
return 'Falta registrada';
}
private selectConsulta(item: ListConsultaItem): void {
this.selectRegistrarAtendimentoId(item.id);
}
private handleListClick(event: Event): void {
const detail = (event as CustomEvent<{ index?: number }>).detail;
const index = detail?.index;
if (typeof index !== 'number') return;
const item = this.stateListConsultaResult[index];
if (item) this.selectConsulta(item);
}
private handleNoteInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
this.setRegistrarAtendimentoDetailsAttendanceNote(typeof detail?.value === 'string' ? detail.value : '');
}
private renderFeedback(): TemplateResult | typeof nothing {
const error = this.stateRegistrarAtendimentoError;
if (error === null) return nothing;
return html`
<groupnotifyuser--ml-contextual-feedback type="error" visible="true" dismissible="false" role="alert">
<Message>${error.message}</Message>
</groupnotifyuser--ml-contextual-feedback>
<p class="agenda-mutation-feedback" role="alert" aria-live="assertive">${error.message}</p>
`;
}
private renderCalendar(): TemplateResult {
const listStatus = (this as AgendaElement)[LIST_STATUS_MEMBER];
const loading = listStatus === 'loading';
const rows = this.stateListConsultaResult;
return html`
<section class="agenda-calendar" aria-labelledby="agenda-calendar-title">
<h2 id="agenda-calendar-title">Consultas do dia</h2>
<p class="agenda-caption">Agenda própria do profissional</p>
<groupviewdata--ml-calendar-view .loading=${loading} hoverable="true" @row-click=${(event: Event) => this.handleListClick(event)}>
<Columns>
<Column field="scheduledAt" header="Horário"></Column>
<Column field="patient" header="Paciente"></Column>
<Column field="status" header="Situação"></Column>
</Columns>
<Rows>
${rows.map((item: ListConsultaItem) => html`
<Row ?selected=${item.id === this.stateRegistrarAtendimentoId}>
<Cell>
<button class="agenda-slot" type="button" @click=${() => this.selectConsulta(item)}>
${this.formatDate(item.scheduledAt)}
</button>
</Cell>
<Cell>${this.patientName(item)}</Cell>
<Cell><span class="agenda-status">${this.statusLabel(item.status)}</span></Cell>
</Row>
`)}
</Rows>
<Loading><p role="status" aria-live="polite">Carregando a agenda...</p></Loading>
<Empty><p role="status">Não há consultas na agenda do dia.</p></Empty>
</groupviewdata--ml-calendar-view>
${listStatus === 'error' && this.stateListConsultaError !== null ? html`
<p class="agenda-error" role="alert">${this.stateListConsultaError.message}</p>
` : nothing}
</section>
`;
}
private renderDetail(): TemplateResult {
const item = this.selectedConsulta();
if (!item) return html`<p role="status">Selecione uma consulta para conferir os dados.</p>`;
return html`
<article class="agenda-detail" data-organism-id="organism.detail.1" aria-labelledby="consulta-detail-title">
<h2 id="consulta-detail-title">Dados da consulta</h2>
<dl>
<div><dt>Horário</dt><dd>${this.formatDate(item.scheduledAt)}</dd></div>
<div><dt>Paciente</dt><dd>${this.patientName(item)}</dd></div>
<div><dt>Situação</dt><dd>${this.statusLabel(item.status)}</dd></div>
</dl>
${item.status === 'scheduled' ? html`
<grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => this.enterRegistrarAtendimentoScenario()}>
<Label>Registrar atendimento</Label>
</grouptriggeraction--ml-button-standard>
` : nothing}
</article>
`;
}
private renderForm(): TemplateResult {
const item = this.selectedConsulta();
const status = this.stateRegistrarAtendimentoStatus;
const note = this.stateRegistrarAtendimentoDetailsAttendanceNote ?? '';
const canSubmit = item?.status === 'scheduled' && note.trim().length > 0 && status !== 'loading';
return html`
<form class="agenda-form" data-organism-id="organism.form.1" aria-labelledby="attendance-form-title" @submit=${(event: Event) => { event.preventDefault(); if (canSubmit) void this.runRegistrarAtendimento(); }}>
<h2 id="attendance-form-title">Registrar atendimento</h2>
${item ? html`<p>Consulta de ${this.patientName(item)} em ${this.formatDate(item.scheduledAt)}.</p>` : html`<p>Selecione uma consulta agendada.</p>`}
${item?.status === 'scheduled' ? html`
<groupentertext--ml-multiline-text .value=${note} rows="4" required="true" name="attendanceNote" @input=${(event: Event) => this.handleNoteInput(event)}>
<Label>Anotação do atendimento *</Label>
<Helper>Este campo é obrigatório.</Helper>
</groupentertext--ml-multiline-text>
${this.renderFeedback()}
${status === 'success' ? html`<p role="status" aria-live="polite" class="agenda-mutation-feedback">Atendimento registrado com sucesso.</p>` : nothing}
<grouptriggeraction--ml-button-standard data-variant="primary" .disabled=${!canSubmit} .loading=${status === 'loading'} type="submit">
<Label>Concluir atendimento</Label>
</grouptriggeraction--ml-button-standard>
` : html`<p role="status">O atendimento só pode ser registrado para uma consulta agendada.</p>`}
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.enterBaseScenario()}>
<Label>Voltar para a agenda</Label>
</grouptriggeraction--ml-button-standard>
</form>
`;
}
protected render(): TemplateResult {
return html`
<main class="agenda-page" aria-labelledby="agenda-title">
<header class="agenda-header">
<h1 id="agenda-title">${this.msg.agendaTitle}</h1>
<p>${this.msg.agendaDescription}</p>
</header>
<molecules--ml-scenary-102020 .value=${this.scenary} mode="scenary" back-label="Voltar" @change=${(event: Event) => this.handleUiScenaryChange(event)}>
<Scene value="base" title="Agenda" contentRef="content.list">
<div class="agenda-layout">
<div data-organism-id="organism.list.1">${this.renderCalendar()}</div>
<div>${this.renderDetail()}</div>
</div>
</Scene>
<Scene value="registrarAtendimento" title="Registro do atendimento" contentRef="content.form">
${this.renderForm()}
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
export { AgendaDesktopPage11 };