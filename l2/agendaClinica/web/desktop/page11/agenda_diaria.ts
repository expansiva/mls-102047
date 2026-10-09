/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/agenda_diaria.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaClinicaAgenda_diariaShared } from '/_102047_/l2/agendaClinica/web/shared/agenda_diaria.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/groupviewcard/ml-view-card-horizontal.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Agenda clínica',
today: 'Hoje',
todayHint: 'Consultas previstas para hoje',
agendaRegion: 'Agenda do dia',
time: 'Horário',
patient: 'Paciente',
situation: 'Situação',
professional: 'Profissional',
openConsultation: 'Abrir consulta',
selectConsultation: 'Selecione uma consulta no calendário para ver os detalhes.',
consultationDetails: 'Detalhes da consulta',
attendance: 'Registrar atendimento',
attendanceNote: 'Anotação do atendimento',
attendanceNotePlaceholder: 'Descreva o atendimento realizado',
attendanceNoteHelper: 'A anotação é obrigatória para registrar o atendimento.',
registerAttendance: 'Registrar atendimento',
loadingAgenda: 'Carregando agenda…',
loadingConsultation: 'Carregando consulta…',
noConsultations: 'Não há consultas previstas para hoje.',
loadMore: 'Carregar mais consultas',
loadingMore: 'Carregando mais consultas…',
retry: 'Tentar novamente',
agendaError: 'Não foi possível carregar a agenda. Tente novamente.',
consultationError: 'Não foi possível abrir esta consulta. Tente novamente.',
attendanceSuccess: 'Atendimento registrado.',
attendanceError: 'Não foi possível registrar o atendimento. Revise a anotação e tente novamente.',
scheduled: 'Agendada',
confirmed: 'Confirmada',
noShow: 'Falta',
attended: 'Atendida',
back: 'Voltar para a consulta',
viewSummary: 'Resumo da consulta',
viewAttendance: 'Anotação do atendimento'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const formatDateTime = (value: string) => new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value));
const formatTime = (value: string) => new Intl.DateTimeFormat(document.documentElement.lang || undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(value));
@customElement('agenda-clinica--web--desktop--page11--agenda_diaria-102047')
export class AgendaClinicaDesktopPage11Agenda_diariaPage extends AgendaClinicaAgenda_diariaShared {
private msg!: PageMessageType;
private statusLabel(status: 'scheduled' | 'confirmed' | 'noShow' | 'attended') {
return this.msg[status];
}
private statusClass(status: 'scheduled' | 'confirmed' | 'noShow' | 'attended') {
if (status === 'attended') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
if (status === 'noShow') return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
if (status === 'confirmed') return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}
private agendaRows() {
return this.carregarAgendaDiariaConsultas?.items ?? [];
}
private renderCalendar() {
const rows = this.agendaRows();
const loading = this.pageStatus === 'loading' || this.carregarAgendaDiariaStatus === 'loading';
return html`
<groupviewdata--ml-calendar-view
class="block min-h-[34rem]"
.loading=${loading}
.hoverable=${true}
@row-click=${(e: CustomEvent<{ index: number; data: Element }>) => {
if (e.detail.index < 0) return;
const consultation = rows[e.detail.index];
if (consultation) {
this.selectConsultaId(consultation.id);
this.setScenario('consultationSummary');
}
}}>
<Columns>
<Column field="scheduledAt" header=${this.msg.time}></Column>
<Column field="patient" header=${this.msg.patient}></Column>
<Column field="status" header=${this.msg.situation}></Column>
</Columns>
<Rows>
${rows.map((consultation) => html`
<Row
date=${consultation.scheduledAt}
title=${`${consultation.paciente.details.details.identification.name} — ${formatTime(consultation.scheduledAt)}`}
?selected=${consultation.id === this.selectedConsulta}>
<Cell>${formatTime(consultation.scheduledAt)}</Cell>
<Cell>${consultation.paciente.details.details.identification.name}</Cell>
<Cell><span class="rounded-full px-2 py-1 text-xs font-medium ${this.statusClass(consultation.status)}">${this.statusLabel(consultation.status)}</span></Cell>
</Row>
`)}
</Rows>
<Empty><div class="px-6 py-16 text-center text-[var(--text-muted,currentColor)]">${this.msg.noConsultations}</div></Empty>
<Loading><div class="px-6 py-16 text-center text-[var(--text-muted,currentColor)]">${this.msg.loadingAgenda}</div></Loading>
</groupviewdata--ml-calendar-view>
`;
}
private renderSummary(consultation: import('/_102047_/l2/agendaClinica/web/contracts/agenda_diaria.defs.js').ConsultaSelecionada | null) {
if (this.carregarConsultaSelecionadaStatus === 'loading') return html`<p class="p-5 text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loadingConsultation}</p>`;
if (!consultation) return html`<p class="p-5 text-[var(--text-muted,currentColor)]">${this.msg.selectConsultation}</p>`;
return html`
<groupviewcard--ml-view-card-horizontal class="block" .selected=${true}>
<CardContent><div class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--selected-bg,transparent)] text-lg font-semibold text-[var(--selected-text,currentColor)]" aria-hidden="true">${consultation.paciente.details.details.identification.name.slice(0, 1).toUpperCase()}</div></CardContent>
<CardHeader>
<CardTitle>${consultation.paciente.details.details.identification.name}</CardTitle>
<CardDescription>${formatDateTime(consultation.scheduledAt)}</CardDescription>
</CardHeader>
<CardFooter><span class="rounded-full px-2 py-1 text-xs font-medium ${this.statusClass(consultation.status)}">${this.statusLabel(consultation.status)}</span></CardFooter>
</groupviewcard--ml-view-card-horizontal>
<dl class="mt-5 grid gap-3 border-t border-[var(--border-subtle,currentColor)] pt-5 text-sm">
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.professional}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${consultation.profissional.details.details.identification.name}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.time}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${formatDateTime(consultation.scheduledAt)}</dd></div>
</dl>
<div class="mt-6">
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" .disabled=${consultation.status === 'attended'} @action=${() => this.setScenario('attendance')}>
<Label>${this.msg.attendance}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`;
}
private renderAttendance() {
const consultation = this.consultationSummary;
const note = this.registerAttendanceDraft.details?.attendanceNote ?? '';
const commandLoading = this.registrarAtendimentoStatus === 'loading';
const error = this.registrarAtendimentoError;
return html`
${consultation ? html`<p class="mb-5 text-sm text-[var(--text-muted,currentColor)]">${consultation.paciente.details.details.identification.name} · ${formatDateTime(consultation.scheduledAt)}</p>` : nothing}
<groupentertext--ml-multiline-text
class="block"
name="attendanceNote"
rows="6"
.value=${note}
.required=${true}
.disabled=${commandLoading}
placeholder=${this.msg.attendanceNotePlaceholder}
@input=${(e: CustomEvent<{ value: string }>) => this.setRegisterAttendance({ ...this.registerAttendanceDraft, details: { attendanceNote: e.detail.value } })}>
<Label>${this.msg.attendanceNote}</Label>
<Helper>${this.msg.attendanceNoteHelper}</Helper>
</groupentertext--ml-multiline-text>
${error ? html`<p class="mt-3 rounded-md bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]" aria-live="polite">${this.msg.attendanceError}</p>` : nothing}
${this.registrarAtendimentoStatus === 'success' ? html`<p class="mt-3 rounded-md bg-[var(--status-success-bg,transparent)] p-3 text-sm text-[var(--status-success-text,currentColor)]" aria-live="polite">${this.msg.attendanceSuccess}</p>` : nothing}
<div class="mt-6 flex items-center gap-3">
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" .loading=${commandLoading} .disabled=${note.length === 0 || commandLoading} @action=${() => this.registrarAtendimento()}>
<Label>${this.msg.registerAttendance}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" .disabled=${commandLoading} @action=${() => this.setScenario('consultationSummary')}>
<Label>${this.msg.back}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`;
}
private renderPanel() {
const consultation = this.consultationSummary;
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'consultationSummary'} .loading=${this.carregarConsultaSelecionadaStatus === 'loading' || this.registrarAtendimentoStatus === 'loading'} backLabel=${this.msg.back} @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="consultationSummary" title=${this.msg.viewSummary}>${this.renderSummary(consultation)}</Scene>
<Scene value="attendance" title=${this.msg.viewAttendance} nav="back" backTo="consultationSummary">${this.renderAttendance()}</Scene>
</molecules--ml-scenary-102020>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const agendaError = this.carregarAgendaDiariaError;
const moreLoading = this.carregarMaisConsultasDoDiaStatus === 'loading';
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<header class="border-b border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-8 py-6">
<div class="mx-auto flex max-w-[1440px] items-end justify-between gap-6">
<div><h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1><p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.todayHint}</p></div>
<time class="rounded-lg bg-[var(--selected-bg,transparent)] px-4 py-2 text-sm font-semibold text-[var(--selected-text,currentColor)]">${this.msg.today}</time>
</div>
</header>
<div class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1.65fr)_minmax(360px,0.8fr)] gap-8 p-8">
<section data-organism-id="dayConsultations" aria-label=${this.msg.agendaRegion} class="min-w-0 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
<div class="mb-4 flex items-center justify-between"><h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.agendaRegion}</h2><span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.today}</span></div>
${agendaError ? html`<div class="mb-4 flex items-center justify-between gap-4 rounded-md bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]" aria-live="polite"><span>${this.msg.agendaError}</span><grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.carregarAgendaDiaria()}><Label>${this.msg.retry}</Label></grouptriggeraction--ml-button-standard></div>` : nothing}
${this.renderCalendar()}
<div class="mt-5 flex justify-center"><grouptriggeraction--ml-button-standard data-variant="secondary" size="md" .loading=${moreLoading} .disabled=${moreLoading} @action=${() => this.carregarMaisConsultasDoDia()}><Label>${moreLoading ? this.msg.loadingMore : this.msg.loadMore}</Label></grouptriggeraction--ml-button-standard></div>
</section>
<aside class="min-w-0 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" data-organism-id="selectedConsultation">
<div data-organism-id="consultationSummary">${this.renderPanel()}</div>
<div data-organism-id="attendanceForm" class="hidden">${nothing}</div>
<div data-organism-id="attendanceActions" class="sr-only">${this.msg.registerAttendance}</div>
</aside>
</div>
</main>
`;
}
}
