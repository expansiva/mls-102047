/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/agenda.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaShared } from '/_102047_/l2/agendaClinica/web/shared/agenda.js';
import type { ListConsultaItem } from '/_102047_/l2/agendaClinica/web/contracts/agenda.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
type InputDetail = { value?: unknown };
/// **collab_i18n_start**
const pageMessage_pt = {
title: 'Agenda',
subtitle: 'Consulte suas consultas e registre os atendimentos.',
today: 'Hoje',
calendarCaption: 'Consultas da sua agenda',
refresh: 'Atualizar',
calendarLabel: 'Agenda diária',
loading: 'Carregando consultas…',
empty: 'Não há consultas na agenda.',
unavailable: 'Os dados da consulta não estão disponíveis.',
detailTitle: 'Dados da consulta',
time: 'Horário',
patient: 'Paciente',
status: 'Situação',
patientUnknown: 'Paciente não identificado',
scheduled: 'Agendada',
attended: 'Atendida',
noShow: 'Falta registrada',
registerTitle: 'Registrar atendimento',
noteLabel: 'Anotação do atendimento (obrigatória)',
noteHelper: 'Informe a anotação antes de concluir.',
finish: 'Concluir atendimento',
success: 'Atendimento registrado.',
back: 'Voltar para a agenda',
errorTitle: 'Não foi possível concluir o atendimento',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessage_en: PageMessageType = {
title: 'Schedule',
subtitle: 'Review your appointments and record visits.',
today: 'Today',
calendarCaption: 'Appointments in your schedule',
refresh: 'Refresh',
calendarLabel: 'Daily schedule',
loading: 'Loading appointments…',
empty: 'There are no appointments in the schedule.',
unavailable: 'The appointment data is unavailable.',
detailTitle: 'Appointment details',
time: 'Time',
patient: 'Patient',
status: 'Status',
patientUnknown: 'Patient not identified',
scheduled: 'Scheduled',
attended: 'Attended',
noShow: 'No-show recorded',
registerTitle: 'Record visit',
noteLabel: 'Visit note (required)',
noteHelper: 'Enter the note before completing.',
finish: 'Complete visit',
success: 'Visit recorded.',
back: 'Back to schedule',
errorTitle: 'The visit could not be completed',
};
const pageMessages: Readonly<Record<string, PageMessageType>> = { pt: pageMessage_pt, 'pt-BR': pageMessage_pt, en: pageMessage_en };
/// **collab_i18n_end**
@customElement('agenda-clinica--web--mobile--page11--agenda-102047')
export class Agenda extends AgendaShared {
private selectedConsulta(): ListConsultaItem | undefined {
const selectedId = this.stateRegistrarAtendimentoId;
if (!selectedId) return undefined;
return this.stateListConsultaResult.find((item: ListConsultaItem) => item.id === selectedId);
}
private get msg(): PageMessageType {
const language = (document.documentElement.lang || 'pt-BR').toLowerCase();
return pageMessages[language] ?? pageMessages[language.slice(0, 2)] ?? pageMessage_pt;
}
private patientName(item: ListConsultaItem): string {
return item.consultaPaciente?.details?.identification?.name ?? this.msg.patientUnknown;
}
private statusLabel(status: ListConsultaItem['status']): string {
if (status === 'scheduled') return this.msg.scheduled;
if (status === 'attended') return this.msg.attended;
return this.msg.noShow;
}
private formatDateTime(value: string): string {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', {
day: '2-digit',
month: '2-digit',
year: 'numeric',
hour: '2-digit',
minute: '2-digit',
}).format(date);
}
private formatTime(value: string): string {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date);
}
private selectConsulta(item: ListConsultaItem): void {
this.selectRegistrarAtendimentoId(item.id);
this.enterRegistrarAtendimentoScenario();
}
private handleNoteInput(event: Event): void {
const custom = event as CustomEvent<InputDetail>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setRegistrarAtendimentoDetailsAttendanceNote(value);
}
private renderConsultaBlock(item: ListConsultaItem): TemplateResult {
const selected = item.id === this.stateRegistrarAtendimentoId;
return html`
<button
type="button"
class="agenda-consulta-block"
data-selected=${selected ? 'true' : 'false'}
aria-label="${this.formatTime(item.scheduledAt)}, ${this.patientName(item)}, ${this.statusLabel(item.status)}"
@click=${(): void => this.selectConsulta(item)}
>
<span class="agenda-consulta-time">${this.formatTime(item.scheduledAt)}</span>
<span class="agenda-consulta-patient">${this.patientName(item)}</span>
<span class="agenda-consulta-status">${this.statusLabel(item.status)}</span>
</button>
`;
}
private renderCalendar(): TemplateResult {
const items = [...this.stateListConsultaResult].sort((a: ListConsultaItem, b: ListConsultaItem) =>
a.scheduledAt.localeCompare(b.scheduledAt),
);
const loading = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e000073000074000061000074000075000073 === 'loading';
const error = this.stateListConsultaError;
return html`
<section class="agenda-calendar-region" aria-labelledby="agenda-calendar-title">
<div class="agenda-calendar-heading">
<div>
<h2 id="agenda-calendar-title">${this.msg.today}</h2>
<p class="agenda-calendar-caption">${this.msg.calendarCaption}</p>
</div>
<button type="button" class="agenda-refresh" @click=${(): void => { void this.runListConsulta(); }}>
${this.msg.refresh}
</button>
</div>
${error ? html`<div class="agenda-error" role="alert">${error.message}</div>` : nothing}
<groupviewdata--ml-calendar-view .loading=${loading} class="agenda-calendar-grid" aria-label=${this.msg.calendarLabel}>
<Columns>
<Column field="scheduledAt" header=${this.msg.time} />
<Column field="patient" header=${this.msg.patient} />
<Column field="status" header=${this.msg.status} />
</Columns>
<Rows>
${items.map((item: ListConsultaItem) => html`
<Row>
<Cell>${this.renderConsultaBlock(item)}</Cell>
<Cell>${this.patientName(item)}</Cell>
<Cell>${this.statusLabel(item.status)}</Cell>
</Row>
`)}
</Rows>
${loading ? html`<Loading><p role="status" aria-live="polite">${this.msg.loading}</p></Loading>` : nothing}
${!loading && items.length === 0 && !error ? html`<Empty><p class="agenda-empty">${this.msg.empty}</p></Empty>` : nothing}
</groupviewdata--ml-calendar-view>
</section>
`;
}
private renderDetail(item: ListConsultaItem | undefined): TemplateResult {
if (!item) return html`<p class="agenda-unavailable" role="status">${this.msg.unavailable}</p>`;
return html`
<section class="agenda-detail" aria-labelledby="agenda-detail-title">
<h2 id="agenda-detail-title">${this.msg.detailTitle}</h2>
<dl>
<div><dt>${this.msg.time}</dt><dd>${this.formatDateTime(item.scheduledAt)}</dd></div>
<div><dt>${this.msg.patient}</dt><dd>${this.patientName(item)}</dd></div>
<div><dt>${this.msg.status}</dt><dd>${this.statusLabel(item.status)}</dd></div>
</dl>
</section>
`;
}
private renderForm(item: ListConsultaItem | undefined): TemplateResult {
const note = this.stateRegistrarAtendimentoDetailsAttendanceNote ?? '';
const actionLoading = this.stateRegistrarAtendimentoStatus === 'loading';
const actionError = this.stateRegistrarAtendimentoError;
const actionSuccess = this.stateRegistrarAtendimentoStatus === 'success';
if (!item || item.status !== 'scheduled') return html`
${actionError ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Title>${this.msg.errorTitle}</Title><Message>${actionError.message}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
${actionSuccess ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true}>
<Message>${this.msg.success}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
`;
return html`
<section class="agenda-form" aria-labelledby="agenda-form-title">
<h2 id="agenda-form-title">${this.msg.registerTitle}</h2>
${actionError ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Title>${this.msg.errorTitle}</Title><Message>${actionError.message}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
${actionSuccess ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true}>
<Message>${this.msg.success}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
<groupentertext--ml-multiline-text
.value=${note}
rows="5"
required
name="attendanceNote"
@input=${(event: Event): void => this.handleNoteInput(event)}
>
<Label>${this.msg.noteLabel}</Label>
<Helper>${this.msg.noteHelper}</Helper>
</groupentertext--ml-multiline-text>
<grouptriggeraction--ml-button-standard
data-variant="primary"
.loading=${actionLoading}
.disabled=${actionLoading || note.trim().length === 0}
@action=${(): void => { void this.runRegistrarAtendimento(); }}
>
<Label>${this.msg.finish}</Label>
</grouptriggeraction--ml-button-standard>
</section>
`;
}
private renderBaseScene(): TemplateResult {
return html`
<div class="agenda-list-organism" data-organism-id="organism.list.1">
${this.renderCalendar()}
</div>
`;
}
private renderRegistrarScene(): TemplateResult {
const item = this.selectedConsulta();
return html`
<div class="agenda-detail-organism" data-organism-id="organism.detail.1">
${this.renderDetail(item)}
</div>
<div class="agenda-form-organism" data-organism-id="organism.form.1">
${this.renderForm(item)}
</div>
<button type="button" class="agenda-back" @click=${(): void => this.enterBaseScenario()}>${this.msg.back}</button>
`;
}
public render(): TemplateResult {
const activeScenario = this.scenary;
return html`
<main class="agenda-page" aria-labelledby="agenda-title">
<header class="agenda-header">
<h1 id="agenda-title">${this.msg.title}</h1>
<p>${this.msg.subtitle}</p>
</header>
<molecules--ml-scenary-102020 mode="scenary" .value=${activeScenario} @change=${(event: Event): void => this.handleScenarioChange(event)}>
<Scene value="base" title=${this.msg.title}>
${this.renderBaseScene()}
</Scene>
<Scene value="registrarAtendimento" title=${this.msg.registerTitle}>
${this.renderRegistrarScene()}
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
private handleScenarioChange(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
if (custom.detail && typeof custom.detail.value === 'string') this.setScenario(custom.detail.value === 'registrarAtendimento' ? 'registrarAtendimento' : 'base');
}
}
if (!customElements.get('agenda-clinica--web--mobile--page11--agenda-102047')) {
customElements.define('agenda-clinica--web--mobile--page11--agenda-102047', Agenda);
}
