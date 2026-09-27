/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/agenda.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaShared } from '/_102047_/l2/agendaClinica/web/shared/agenda.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
/// **collab_i18n_start**
const pageMessage_pt = {
agendaTitle: 'Agenda clínica',
dayAppointments: 'Consultas do dia',
consultationsToday: 'Consultas de hoje',
loadingAppointments: 'Carregando consultas...',
emptyAppointments: 'Não há consultas na agenda de hoje.',
unavailableAppointments: 'Não foi possível carregar a agenda.',
retry: 'Tentar novamente',
consultationReview: 'Conferência da consulta',
selectConsultation: 'Toque em uma consulta para conferir seus dados.',
appointmentTime: 'Horário',
patient: 'Paciente',
situation: 'Situação',
unidentifiedPatient: 'Paciente não identificado',
scheduled: 'Agendada',
attended: 'Atendida',
noShow: 'Falta registrada',
registerAttendance: 'Registrar atendimento',
attendanceRegistration: 'Registrar atendimento',
attendanceNote: 'Anotação do atendimento *',
requiredNote: 'Informe a anotação obrigatória para concluir o atendimento.',
confirmAttendance: 'Confirmar atendimento',
backToAgenda: 'Voltar para agenda',
selectScheduled: 'Selecione uma consulta agendada antes de registrar o atendimento.',
attendanceSuccess: 'Atendimento registrado com sucesso.',
attendanceUnavailable: 'Não foi possível registrar o atendimento.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessage_en: PageMessageType = {
agendaTitle: 'Clinical agenda',
dayAppointments: "Today's appointments",
consultationsToday: "Today's consultations",
loadingAppointments: 'Loading appointments...',
emptyAppointments: 'There are no consultations in today’s agenda.',
unavailableAppointments: 'The agenda could not be loaded.',
retry: 'Try again',
consultationReview: 'Consultation review',
selectConsultation: 'Tap a consultation to review its details.',
appointmentTime: 'Time',
patient: 'Patient',
situation: 'Status',
unidentifiedPatient: 'Patient not identified',
scheduled: 'Scheduled',
attended: 'Attended',
noShow: 'No-show recorded',
registerAttendance: 'Register attendance',
attendanceRegistration: 'Attendance registration',
attendanceNote: 'Attendance note *',
requiredNote: 'Enter the required note to complete the attendance.',
confirmAttendance: 'Confirm attendance',
backToAgenda: 'Back to agenda',
selectScheduled: 'Select a scheduled consultation before registering attendance.',
attendanceSuccess: 'Attendance registered successfully.',
attendanceUnavailable: 'The attendance could not be registered.',
};
const pageMessages: Record<string, PageMessageType> = {
'pt': pageMessage_pt,
'pt-BR': pageMessage_pt,
'en': pageMessage_en,
};
/// **collab_i18n_end**
const LIST_STATUS_KEY = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073' as const;
type ConsultaItem = AgendaShared['stateListConsultaResult'][number];
type ConsultaStatus = ConsultaItem['status'];
type CustomValueEvent = CustomEvent<{ value?: unknown }>;
@customElement('agenda-clinica--web--mobile--page11--agenda-102047')
export class AgendaMobilePage11 extends AgendaShared {
private get msg(): PageMessageType {
const language = (document.documentElement.lang || 'pt-BR').toLowerCase();
return pageMessages[language] ?? pageMessages[language.split('-')[0]] ?? pageMessage_pt;
}
private formatDate(value: string): string {
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
private patientName(item: ConsultaItem): string {
return item.consultaPaciente?.details?.identification?.name ?? this.msg.unidentifiedPatient;
}
private statusLabel(status: ConsultaStatus): string {
if (status === 'scheduled') return this.msg.scheduled;
if (status === 'attended') return this.msg.attended;
return this.msg.noShow;
}
private selectConsulta(item: ConsultaItem): void {
this.selectRegistrarAtendimentoId(item.id);
this.requestUpdate();
}
private openAttendance(item: ConsultaItem): void {
if (item.status !== 'scheduled') return;
this.selectRegistrarAtendimentoId(item.id);
this.enterRegistrarAtendimentoScenario();
}
private handleNoteInput(event: Event): void {
const detail = (event as CustomValueEvent).detail;
if (detail && typeof detail.value === 'string') {
this.setRegistrarAtendimentoDetailsAttendanceNote(detail.value);
}
}
private selectedConsulta(): ConsultaItem | undefined {
const id = this.stateRegistrarAtendimentoId;
return id === null ? undefined : this.stateListConsultaResult.find((item: ConsultaItem) => item.id === id);
}
private renderList(): TemplateResult {
const status = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073;
const loading = status === 'loading';
const error = this.stateListConsultaError;
const rows = this.stateListConsultaResult;
return html`
<section class="agenda-list" aria-labelledby="agenda-list-title">
<h2 id="agenda-list-title">${this.msg.consultationsToday}</h2>
${error ? html`
<div class="agenda-error" role="alert">${error.message || this.msg.unavailableAppointments}</div>
<grouptriggeraction--ml-button-standard @action=${() => void this.runListConsulta()}>
<Label>${this.msg.retry}</Label>
</grouptriggeraction--ml-button-standard>
` : nothing}
<groupviewdata--ml-calendar-view .loading=${loading} .hoverable=${true} @row-click=${(event: CustomEvent<{ index: number }>) => {
const item = rows[event.detail.index];
if (item) this.selectConsulta(item);
}}>
<Columns>
<Column field="scheduledAt" header=${this.msg.appointmentTime} />
<Column field="patient" header=${this.msg.patient} />
<Column field="status" header=${this.msg.situation} />
</Columns>
<Rows>
${rows.map((item: ConsultaItem) => html`
<Row ?selected=${item.id === this.stateRegistrarAtendimentoId}>
<Cell>${this.formatDate(item.scheduledAt)}</Cell>
<Cell>
<button type="button" class="agenda-consulta-button" @click=${() => this.selectConsulta(item)}>
${this.patientName(item)}
</button>
</Cell>
<Cell>${this.statusLabel(item.status)}</Cell>
</Row>
`)}
</Rows>
${loading ? html`<Loading><p role="status" aria-live="polite">${this.msg.loadingAppointments}</p></Loading>` : nothing}
${!loading && !error && rows.length === 0 ? html`<Empty><p>${this.msg.emptyAppointments}</p></Empty>` : nothing}
</groupviewdata--ml-calendar-view>
</section>
`;
}
private renderDetail(): TemplateResult {
const selected = this.selectedConsulta();
return html`
<section class="agenda-detail" aria-labelledby="agenda-detail-title">
<h2 id="agenda-detail-title">${this.msg.consultationReview}</h2>
${selected ? html`
<dl>
<div><dt>${this.msg.appointmentTime}</dt><dd>${this.formatDate(selected.scheduledAt)}</dd></div>
<div><dt>${this.msg.patient}</dt><dd>${this.patientName(selected)}</dd></div>
<div><dt>${this.msg.situation}</dt><dd>${this.statusLabel(selected.status)}</dd></div>
</dl>
${selected.status === 'scheduled' ? html`
<grouptriggeraction--ml-button-standard @action=${() => this.openAttendance(selected)}>
<Label>${this.msg.registerAttendance}</Label>
</grouptriggeraction--ml-button-standard>
` : nothing}
` : html`<p>${this.msg.selectConsultation}</p>`}
</section>
`;
}
private renderForm(): TemplateResult {
const selected = this.selectedConsulta();
const actionStatus = this.stateRegistrarAtendimentoStatus;
const actionError = this.stateRegistrarAtendimentoError;
const note = this.stateRegistrarAtendimentoDetailsAttendanceNote ?? '';
const canSubmit = selected?.status === 'scheduled' && note.trim().length > 0 && actionStatus !== 'loading';
return html`
<section class="agenda-form" aria-labelledby="agenda-form-title">
<h2 id="agenda-form-title">${this.msg.attendanceRegistration}</h2>
${selected ? html`
<p><strong>${this.patientName(selected)}</strong><br />${this.formatDate(selected.scheduledAt)}</p>
${actionError ? html`<div class="agenda-error" role="alert">${actionError.message || this.msg.attendanceUnavailable}</div>` : nothing}
${actionStatus === 'success' ? html`<div class="agenda-success" role="status" aria-live="polite">${this.msg.attendanceSuccess}</div>` : nothing}
<groupentertext--ml-multiline-text
.value=${note}
.rows=${5}
.required=${true}
.isEditing=${true}
@input=${(event: Event) => this.handleNoteInput(event)}>
<Label>${this.msg.attendanceNote}</Label>
<Helper>${this.msg.requiredNote}</Helper>
</groupentertext--ml-multiline-text>
<grouptriggeraction--ml-button-standard
?disabled=${!canSubmit}
.loading=${actionStatus === 'loading'}
@action=${() => void this.runRegistrarAtendimento()}>
<Label>${this.msg.confirmAttendance}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.enterBaseScenario()}>
<Label>${this.msg.backToAgenda}</Label>
</grouptriggeraction--ml-button-standard>
` : html`<p role="alert">${this.msg.selectScheduled}</p>`}
</section>
`;
}
render(): TemplateResult {
const active = this.scenary;
return html`
<main class="agenda-page" aria-labelledby="agenda-title">
<header class="agenda-header">
<h1 id="agenda-title">${this.msg.agendaTitle}</h1>
<p>${this.msg.dayAppointments}</p>
</header>
<molecules--ml-scenary-102020 .value=${active} mode="scenary" @change=${(event: Event) => this.handleUiScenaryChange(event)}>
<Scene value="base" title="Agenda">
<div class="agenda-base-content">
${this.renderList()}
${this.renderDetail()}
</div>
</Scene>
<Scene value="registrarAtendimento" title="Registro de atendimento">
${this.renderForm()}
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
