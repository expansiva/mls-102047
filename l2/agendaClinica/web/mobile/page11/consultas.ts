/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/consultas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaClinicaConsultasShared } from '/_102047_/l2/agendaClinica/web/shared/consultas.js';
import type { ConsultaAgenda, ConsultaDetalhe, PacienteResumo, ProfissionalResumo } from '/_102047_/l2/agendaClinica/web/shared/consultas.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Agenda clínica',
agendaRegion: 'Agenda do dia',
selectedRegion: 'Consulta selecionada',
scheduleRegion: 'Novo agendamento',
searchLabel: 'Buscar consulta',
searchPlaceholder: 'Paciente ou profissional',
calendarTime: 'Horário',
calendarPatient: 'Paciente',
calendarProfessional: 'Profissional',
calendarStatus: 'Situação',
calendarEmpty: 'Nenhuma consulta neste período.',
calendarLoading: 'Carregando agenda…',
consultationTitle: 'Consulta',
patientLabel: 'Paciente',
professionalLabel: 'Profissional',
dateTimeLabel: 'Data e horário',
statusLabel: 'Situação',
choosePatient: 'Localize um paciente',
chooseProfessional: 'Selecione um profissional',
chooseDateTime: 'Informe a data e o horário',
dateTimeHelper: 'Escolha um horário disponível.',
scheduleButton: 'Agendar consulta',
confirmButton: 'Confirmar consulta',
noShowButton: 'Registrar falta',
noSelection: 'Selecione uma consulta na agenda para conferir os dados.',
noPatients: 'Nenhum paciente encontrado.',
noProfessionals: 'Nenhum profissional encontrado.',
moreAppointments: 'Carregar mais consultas',
morePatients: 'Mais pacientes',
moreProfessionals: 'Mais profissionais',
errorTitle: 'Não foi possível concluir',
successTitle: 'Operação concluída',
scheduleSuccess: 'Consulta agendada.',
confirmSuccess: 'Consulta confirmada.',
noShowSuccess: 'Falta registrada.',
statusScheduled: 'Agendada',
statusConfirmed: 'Confirmada',
statusNoShow: 'Falta',
statusAttended: 'Atendida',
loading: 'Carregando…'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const dateTime = (value: string, dateStyle: 'date' | 'time' | 'both') => {
const locale = document.documentElement.lang || undefined;
const options: Intl.DateTimeFormatOptions = dateStyle === 'date'
? { dateStyle: 'medium' }
: dateStyle === 'time'
? { timeStyle: 'short' }
: { dateStyle: 'medium', timeStyle: 'short' };
return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};
@customElement('agenda-clinica--web--mobile--page11--consultas-102047')
export class AgendaClinicaMobilePage11ConsultasPage extends AgendaClinicaConsultasShared {
private msg!: PageMessageType;
private statusText(status: ConsultaAgenda['status'] | ConsultaDetalhe['status']) {
const key = `status${status === 'scheduled' ? 'Scheduled' : status === 'confirmed' ? 'Confirmed' : status === 'noShow' ? 'NoShow' : 'Attended'}` as keyof PageMessageType;
return this.msg[key];
}
private errorMessage(error: { message: string } | null) {
return error?.message || '';
}
private patientName(patient: PacienteResumo) {
return patient.identification.details.identification.name;
}
private professionalName(professional: ProfissionalResumo) {
return professional.identification.details.identification.name;
}
private renderAgenda() {
const rows: ConsultaAgenda[] = this.agenda?.items ?? [];
return html`
<section data-organism-id="listaAgenda" class="space-y-3">
<div class="flex items-end justify-between gap-3">
<div>
<p class="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.agendaRegion}</p>
${this.cabecalho ? html`<p class="mt-1 text-lg font-semibold text-[var(--text-strong,currentColor)]">${dateTime(this.cabecalho.dataAgenda, 'date')}</p>` : nothing}
</div>
${this.quantidadePendentes !== null ? html`<span class="rounded-full bg-[var(--status-warning-bg,transparent)] px-3 py-1 text-sm text-[var(--status-warning-text,currentColor)]">${this.quantidadePendentes}</span>` : nothing}
</div>
<groupsearchcontent--ml-search-bar
.value=${this.termo}
.loading=${this.filtrarAgendaStatus === 'loading'}
placeholder=${this.msg.searchPlaceholder}
@search=${(e: CustomEvent<{ query: string }>) => { this.termo = e.detail.query; void this.filtrarAgenda(); }}
@change=${(e: CustomEvent<{ value: string | null }>) => { this.termo = e.detail.value; void this.filtrarAgenda(); }}>
<Label>${this.msg.searchLabel}</Label>
</groupsearchcontent--ml-search-bar>
<groupviewdata--ml-calendar-view
.loading=${this.carregarAgendaStatus === 'loading'}
@row-click=${(e: CustomEvent<{ index: number }>) => { const row = rows[e.detail.index]; if (row) void this.selectConsulta(row.id); }}>
<Columns>
<Column field="scheduledAt" header=${this.msg.calendarTime}></Column>
<Column field="paciente" header=${this.msg.calendarPatient}></Column>
<Column field="profissional" header=${this.msg.calendarProfessional}></Column>
<Column field="status" header=${this.msg.calendarStatus}></Column>
</Columns>
<Rows>
${rows.map(row => html`
<Row date=${row.scheduledAt} title=${`${this.patientName(row.paciente)} — ${dateTime(row.scheduledAt, 'time')}`} ?selected=${row.id === this.selectedConsulta}>
<Cell>${dateTime(row.scheduledAt, 'time')}</Cell>
<Cell>${this.patientName(row.paciente)}</Cell>
<Cell>${this.professionalName(row.profissional)}</Cell>
<Cell>${this.statusText(row.status)}</Cell>
</Row>`)}
</Rows>
<Empty>${this.msg.calendarEmpty}</Empty>
<Loading>${this.msg.calendarLoading}</Loading>
</groupviewdata--ml-calendar-view>
${this.agenda?.hasMore ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full mt-3" .loading=${this.carregarMaisAgendaStatus === 'loading'} @action=${() => this.carregarMaisAgenda()}><Label>${this.msg.moreAppointments}</Label></grouptriggeraction--ml-button-standard>` : ''}
</section>`;
}
private renderDetail() {
const item = this.consulta;
return html`
<section data-organism-id="detalheConsulta" class="space-y-3">
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.selectedRegion}</h2>
${item ? html`
<groupviewcard--ml-vertical-card .selected=${true}>
<CardHeader>
<CardTitle>${this.patientName(item.paciente)}</CardTitle>
<CardDescription>${this.professionalName(item.profissional)}</CardDescription>
</CardHeader>
<CardContent>
<dl class="grid grid-cols-2 gap-3 text-sm">
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.dateTimeLabel}</dt><dd class="font-medium">${dateTime(item.scheduledAt, 'both')}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.statusLabel}</dt><dd class="font-medium">${this.statusText(item.status)}</dd></div>
</dl>
</CardContent>
</groupviewcard--ml-vertical-card>
` : html`<p class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg.noSelection}</p>`}
</section>`;
}
private renderForm() {
const patients = this.pacientes?.items ?? [];
const professionals = this.profissionais?.items ?? [];
const draft = this.agendarConsultaDraft;
return html`
<section data-organism-id="formularioConsulta" class="space-y-4">
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.scheduleRegion}</h2>
<groupselectone--ml-combobox
.value=${draft.pacienteId}
.loading=${this.localizarPacientesParaAgendamentoStatus === 'loading'}
placeholder=${this.msg.choosePatient}
@change=${(e: CustomEvent<{ value: string | null }>) => { this.pacienteId = e.detail.value; this.setAgendarConsultaDraft({ ...this.agendarConsultaDraft, pacienteId: e.detail.value }); }}
@input=${(e: CustomEvent<{ value: string }>) => { const termo = e.detail.value.trim(); this.termo = termo || null; if (termo) void this.localizarPacientesParaAgendamento(); }}>
<Label>${this.msg.patientLabel}</Label>
${patients.map(patient => html`<Item value=${patient.id}>${this.patientName(patient)}</Item>`)}
<Empty>${this.msg.noPatients}</Empty>
</groupselectone--ml-combobox>
${this.pacientes?.hasMore ? html`<grouptriggeraction--ml-button-standard data-variant="ghost" size="md" .loading=${this.carregarMaisPacientesParaAgendamentoStatus === 'loading'} @action=${() => this.carregarMaisPacientesParaAgendamento()}><Label>${this.msg.morePatients}</Label></grouptriggeraction--ml-button-standard>` : ''}
<groupselectone--ml-combobox
.value=${draft.profissionalId}
.loading=${this.localizarProfissionaisParaAgendamentoStatus === 'loading'}
placeholder=${this.msg.chooseProfessional}
@change=${(e: CustomEvent<{ value: string | null }>) => { this.profissionalId = e.detail.value; this.setAgendarConsultaDraft({ ...this.agendarConsultaDraft, profissionalId: e.detail.value }); }}
@input=${(e: CustomEvent<{ value: string }>) => { const termo = e.detail.value.trim(); this.termo = termo || null; if (termo) void this.localizarProfissionaisParaAgendamento(); }}>
<Label>${this.msg.professionalLabel}</Label>
${professionals.map(professional => html`<Item value=${professional.id}>${this.professionalName(professional)}</Item>`)}
<Empty>${this.msg.noProfessionals}</Empty>
</groupselectone--ml-combobox>
${this.profissionais?.hasMore ? html`<grouptriggeraction--ml-button-standard data-variant="ghost" size="md" .loading=${this.carregarMaisProfissionaisParaAgendamentoStatus === 'loading'} @action=${() => this.carregarMaisProfissionaisParaAgendamento()}><Label>${this.msg.moreProfessionals}</Label></grouptriggeraction--ml-button-standard>` : ''}
<groupenterdatetime--ml-datetime-picker
.value=${draft.scheduledAt}
locale="pt-BR"
minuteStep=${15}
required
placeholder=${this.msg.chooseDateTime}
@change=${(e: CustomEvent<{ value: string | null }>) => { this.setAgendarConsultaDraft({ ...this.agendarConsultaDraft, scheduledAt: e.detail.value }); }}>
<Label>${this.msg.dateTimeLabel}</Label>
<Helper>${this.msg.dateTimeHelper}</Helper>
</groupenterdatetime--ml-datetime-picker>
</section>`;
}
private renderActions() {
const busy = this.agendarConsultaStatus === 'loading' || this.confirmarConsultaStatus === 'loading' || this.registrarFaltaStatus === 'loading';
const feedback = this.agendarConsultaStatus === 'error' ? this.errorMessage(this.agendarConsultaError) : this.confirmarConsultaStatus === 'error' ? this.errorMessage(this.confirmarConsultaError) : this.registrarFaltaStatus === 'error' ? this.errorMessage(this.registrarFaltaError) : this.pageStatus === 'success' ? (this.msg.successTitle) : '';
return html`
<section data-organism-id="acoesConsulta" class="space-y-3">
${feedback ? html`<groupnotifyuser--ml-contextual-feedback .visible=${true} type=${this.pageStatus === 'success' ? 'success' : 'error'}>
<Title>${this.pageStatus === 'success' ? this.msg.successTitle : this.msg.errorTitle}</Title><Message>${feedback}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
<div class="grid gap-3">
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .disabled=${busy || !this.agendarConsultaDraft.pacienteId || !this.agendarConsultaDraft.profissionalId || !this.agendarConsultaDraft.scheduledAt} .loading=${this.agendarConsultaStatus === 'loading'} @action=${() => void this.agendarConsulta()}><Label>${this.msg.scheduleButton}</Label></grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" .disabled=${busy || !this.consulta} .loading=${this.confirmarConsultaStatus === 'loading'} @action=${() => void this.confirmarConsulta()}><Label>${this.msg.confirmButton}</Label></grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="danger" size="lg" .disabled=${busy || !this.consulta} .loading=${this.registrarFaltaStatus === 'loading'} @action=${() => void this.registrarFalta()}><Label>${this.msg.noShowButton}</Label></grouptriggeraction--ml-button-standard>
</div>
</section>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
<header class="mb-5"><h1 class="text-2xl font-bold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1></header>
<div class="space-y-8">
${this.renderAgenda()}
${this.renderDetail()}
${this.renderForm()}
${this.renderActions()}
</div>
</main>`;
}
}
