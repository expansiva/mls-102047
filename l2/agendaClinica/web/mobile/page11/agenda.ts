/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/agenda.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import { customElement } from 'lit/decorators.js';
import { AgendaShared } from '/_102047_/l2/agendaClinica/web/shared/agenda.js';
import type { ListConsultaItem } from '/_102047_/l2/agendaClinica/web/contracts/agenda.defs.js';
const LIST_STATUS_KEY = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073';
/// **collab_i18n_start**
const pageMessage_ptBR = {
agenda: 'Agenda',
todayAppointments: 'Suas consultas de hoje',
appointmentsOfDay: 'Consultas do dia',
dailyAppointmentAgenda: 'Agenda diária de consultas',
loadingAppointments: 'Carregando consultas...',
noAppointments: 'Não há consultas na agenda.',
consultationUnavailable: 'Não foi possível consultar a agenda.',
consultationDetails: 'Detalhes da consulta',
selectConsultation: 'Selecione uma consulta para conferir os dados.',
time: 'Horário',
patient: 'Paciente',
status: 'Situação',
identifiedPatient: 'Paciente sem identificação',
booked: 'Agendada',
attended: 'Atendida',
noShow: 'Falta registrada',
registerAttendance: 'Registrar atendimento',
attendanceRegistration: 'Registro de atendimento',
attendanceNote: 'Anotação do atendimento (obrigatória)',
confirmAttendance: 'Confirmar atendimento',
attendanceRegistered: 'Atendimento registrado com sucesso.',
attendanceRegistering: 'Registrando atendimento...',
};
type PageMessageType = typeof pageMessage_ptBR;
const pageMessage_en: PageMessageType = {
agenda: 'Agenda',
todayAppointments: 'Your appointments today',
appointmentsOfDay: 'Appointments for the day',
dailyAppointmentAgenda: 'Daily appointment agenda',
loadingAppointments: 'Loading appointments...',
noAppointments: 'There are no appointments in the agenda.',
consultationUnavailable: 'The agenda could not be loaded.',
consultationDetails: 'Consultation details',
selectConsultation: 'Select a consultation to review its details.',
time: 'Time',
patient: 'Patient',
status: 'Status',
identifiedPatient: 'Patient without identification',
booked: 'Scheduled',
attended: 'Attended',
noShow: 'No-show recorded',
registerAttendance: 'Register attendance',
attendanceRegistration: 'Attendance registration',
attendanceNote: 'Attendance note (required)',
confirmAttendance: 'Confirm attendance',
attendanceRegistered: 'Attendance registered successfully.',
attendanceRegistering: 'Registering attendance...',
};
const pageMessages = { ptBR: pageMessage_ptBR, en: pageMessage_en };
const msg = (key: keyof PageMessageType): string => {
const locale = (document.documentElement.lang || 'pt-BR').toLowerCase();
const selected = locale.startsWith('en') ? pageMessages.en : pageMessages.ptBR;
return selected[key];
};
/// **collab_i18n_end**
@customElement('agenda-clinica--web--mobile--page11--agenda-102047')
export class AgendaPage11 extends AgendaShared {
private selectedConsulta: ListConsultaItem | null = null;
private formatDateTime(value: string): string {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}
private statusLabel(status: ListConsultaItem['status']): string {
if (status === 'scheduled') return msg('booked');
if (status === 'attended') return msg('attended');
return msg('noShow');
}
private patientName(item: ListConsultaItem): string {
return item.consultaPaciente?.details?.identification?.name ?? msg('identifiedPatient');
}
private selectConsulta(item: ListConsultaItem): void {
this.selectedConsulta = item;
this.selectRegistrarAtendimentoId(item.id);
this.requestUpdate();
}
private handleNoteInput(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setRegistrarAtendimentoDetailsAttendanceNote(value);
}
private renderCalendar(): TemplateResult {
const items = this.stateListConsultaResult;
const listStatus = (this as unknown as Record<string, unknown>)[LIST_STATUS_KEY] as 'idle' | 'loading' | 'empty' | 'success' | 'error';
return html`
<section class="agenda-calendar" aria-labelledby="agenda-calendar-title">
<h2 id="agenda-calendar-title">${msg('appointmentsOfDay')}</h2>
<groupviewdata--ml-calendar-view
.loading=${listStatus === 'loading'}
aria-label=${msg('dailyAppointmentAgenda')}>
<Columns>
<Column field="scheduledAt" header=${msg('time')}></Column>
<Column field="patient" header=${msg('patient')}></Column>
<Column field="status" header=${msg('status')}></Column>
</Columns>
<Rows>
${items.map((item: ListConsultaItem) => html`
<Row @click=${() => this.selectConsulta(item)} tabindex="0" aria-label="${this.patientName(item)}, ${this.formatDateTime(item.scheduledAt)}, ${this.statusLabel(item.status)}">
<Cell>${this.formatDateTime(item.scheduledAt)}</Cell>
<Cell>${this.patientName(item)}</Cell>
<Cell>${this.statusLabel(item.status)}</Cell>
</Row>
`)}
</Rows>
${listStatus === 'loading' ? html`<Loading><p aria-live="polite">${msg('loadingAppointments')}</p></Loading>` : nothing}
${listStatus === 'success' && items.length === 0 ? html`<Empty><p>${msg('noAppointments')}</p></Empty>` : nothing}
</groupviewdata--ml-calendar-view>
${listStatus === 'error' ? html`<p role="alert">${this.stateListConsultaError?.message ?? msg('consultationUnavailable')}</p>` : nothing}
</section>
`;
}
private renderDetail(): TemplateResult {
const item = this.selectedConsulta;
if (!item) return html`<section aria-labelledby="agenda-detail-title"><h2 id="agenda-detail-title">${msg('consultationDetails')}</h2><p>${msg('selectConsultation')}</p></section>`;
return html`
<section aria-labelledby="agenda-detail-title" class="agenda-detail">
<h2 id="agenda-detail-title">${msg('consultationDetails')}</h2>
<dl>
<dt>${msg('time')}</dt><dd>${this.formatDateTime(item.scheduledAt)}</dd>
<dt>${msg('patient')}</dt><dd>${this.patientName(item)}</dd>
<dt>${msg('status')}</dt><dd>${this.statusLabel(item.status)}</dd>
</dl>
${item.status === 'scheduled' ? html`
<grouptriggeraction--ml-button-standard @action=${this.enterRegistrarAtendimentoScenario}>
<Label>${msg('registerAttendance')}</Label>
</grouptriggeraction--ml-button-standard>
` : nothing}
</section>
`;
}
private renderForm(): TemplateResult {
const item = this.selectedConsulta;
const active = this.scenary === 'registrarAtendimento' && item?.status === 'scheduled';
return html`
<section ?hidden=${!active} ?inert=${!active} aria-labelledby="agenda-form-title">
<h2 id="agenda-form-title">${msg('attendanceRegistration')}</h2>
<p>${item ? `${this.patientName(item)} — ${this.formatDateTime(item.scheduledAt)}` : ''}</p>
<groupentertext--ml-multiline-text
.value=${this.stateRegistrarAtendimentoDetailsAttendanceNote ?? ''}
required
rows="5"
@input=${this.handleNoteInput}>
<Label>${msg('attendanceNote')}</Label>
</groupentertext--ml-multiline-text>
${this.stateRegistrarAtendimentoError ? html`<p role="alert">${this.stateRegistrarAtendimentoError.message}</p>` : nothing}
${this.stateRegistrarAtendimentoStatus === 'loading' ? html`<p role="status" aria-live="polite">${msg('attendanceRegistering')}</p>` : nothing}
${this.stateRegistrarAtendimentoStatus === 'success' ? html`<p role="status">${msg('attendanceRegistered')}</p>` : nothing}
<grouptriggeraction--ml-button-standard
?disabled=${this.stateRegistrarAtendimentoStatus === 'loading' || !(this.stateRegistrarAtendimentoDetailsAttendanceNote ?? '').trim()}
.loading=${this.stateRegistrarAtendimentoStatus === 'loading'}
@action=${this.runRegistrarAtendimento}>
<Label>${msg('confirmAttendance')}</Label>
</grouptriggeraction--ml-button-standard>
</section>
`;
}
protected render(): TemplateResult {
return html`
<main class="agenda-page" aria-labelledby="agenda-title">
<header><h1 id="agenda-title">${msg('agenda')}</h1><p>${msg('todayAppointments')}</p></header>
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary} @change=${this.handleUiScenaryChange}>
<Scene value="base" title=${msg('agenda')}>
${this.renderCalendar()}
${this.renderDetail()}
</Scene>
<Scene value="registrarAtendimento" title=${msg('attendanceRegistration')}>
${this.renderForm()}
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
