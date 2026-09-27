/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/consultas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConsultasShared } from '/_102047_/l2/agendaClinica/web/shared/consultas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
/// **collab_i18n_start**
const pageMessage_pt = {
agendaClinica: 'Agenda clínica', consultas: 'Consultas',
subtitle: 'Localize consultas e mantenha os registros da agenda.',
schedule: 'Agendar consulta', agenda: 'Agenda', details: 'Detalhes', edit: 'Editar',
filters: 'Filtros de consultas', dateTime: 'Data e horário', patient: 'Paciente',
professional: 'Profissional', allPatients: 'Todos os pacientes', allProfessionals: 'Todos os profissionais',
anyStatus: 'Qualquer situação', scheduled: 'Agendada', noShow: 'Falta registrada', attended: 'Atendida',
loading: 'Carregando consultas…', empty: 'Nenhuma consulta encontrada para os critérios informados.',
unavailable: 'Não foi possível carregar os dados.', selected: 'Consulta selecionada',
telephone: 'Confirmação telefônica', notRecorded: 'Ainda não registrada',
registerNoShow: 'Registrar falta', confirmPhone: 'Registrar confirmação telefônica',
editConsultation: 'Editar consulta', back: 'Voltar à agenda', selectPatient: 'Selecione um paciente',
selectProfessional: 'Selecione um profissional', chooseTime: 'Escolha o horário em que a consulta será agendada.',
informConfirmation: 'Informe o momento em que a confirmação foi registrada.', save: 'Salvar alterações',
saved: 'Consulta salva com sucesso.', selectToView: 'Selecione uma consulta na agenda para ver seus detalhes.',
count: 'consulta(s)', noData: 'Não informado',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const TAG = 'agenda-clinica--web--desktop--page11--consultas';
type ConsultaStatus = 'scheduled' | 'noShow' | 'attended';
type SceneName = 'base' | 'detailConsulta' | 'createConsulta' | 'updateConsulta';
type ConsultaRow = ConsultasShared['stateListConsultaResult'][number];
type PacienteRow = ConsultasShared['stateListPacienteResult'][number];
type ProfissionalRow = ConsultasShared['stateListProfissionalResult'][number];
const listStatusMember = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073' as const;
const listInputStatusMember = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073' as const;
const statusLabel: Record<ConsultaStatus, string> = { scheduled: 'Agendada', noShow: 'Falta registrada', attended: 'Atendida' };
@customElement('agenda-clinica--web--desktop--page11--consultas-102047')
export class Consultas extends ConsultasShared {
private selectedId: string | null = null;
private messages(): PageMessageType { const lang = (document.documentElement.lang || 'pt').toLowerCase().slice(0, 2); return pageMessages[lang] ?? pageMessage_pt; }
private formatDate(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date); }
private formatTime(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date); }
private patientName(row: ConsultaRow): string { return row.consultaPaciente?.details?.identification?.name ?? this.messages().noData; }
private professionalName(row: ConsultaRow): string { return row.consultaProfissional?.details?.identification?.name ?? this.messages().noData; }
private selectedConsulta(): ConsultaRow | undefined { return this.stateListConsultaResult.find((row: ConsultaRow) => row.id === this.selectedId); }
private selectConsulta(row: ConsultaRow): void {
this.selectedId = row.id; this.selectRegistrarFaltaId(row.id); this.selectUpdateConsultaId(row.id);
this.selectUpdateConsultaPacienteId(row.pacienteId); this.selectUpdateConsultaProfissionalId(row.profissionalId);
this.setUpdateConsultaScheduledAt(row.scheduledAt);
this.setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt(row.details.telephoneConfirmation?.confirmedAt ?? null);
this.enterDetailConsultaScenario();
}
private handleStatusChange(event: Event): void { const value = (event as CustomEvent<{ value?: string | null }>).detail?.value ?? null; if (value === null || value === 'scheduled' || value === 'noShow' || value === 'attended') { this.setListConsultaStatus(value); void this.runListConsulta(); } }
private handlePacienteChange(event: Event): void { this.selectCreateConsultaPacienteId((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null); }
private handleProfissionalChange(event: Event): void { this.selectCreateConsultaProfissionalId((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null); }
private handleCreateDateChange(event: Event): void { this.setCreateConsultaScheduledAt((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null); }
private handleCreateConfirmationChange(event: Event): void { this.setCreateConsultaDetailsTelephoneConfirmationConfirmedAt((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null); }
private handleUpdateDateChange(event: Event): void { this.setUpdateConsultaScheduledAt((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null); }
private handleUpdateConfirmationChange(event: Event): void { this.setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null); }
private renderFilters(): TemplateResult {
const m = this.messages();
return html`<section class="consultas-filters" aria-label=${m.filters}>
<label class="native-field"><span>${m.dateTime}</span><input type="datetime-local" .value=${this.stateListConsultaScheduledAt ?? ''} @change=${(event: Event) => { const target = event.target as HTMLInputElement; this.setListConsultaScheduledAt(target.value || null); void this.runListConsulta(); }} /></label>
<label class="native-field"><span>${m.patient}</span><select .value=${this.stateListConsultaPacienteId ?? ''} @change=${(event: Event) => { const target = event.target as HTMLSelectElement; this.selectListConsultaPacienteId(target.value || null); void this.runListConsulta(); }}><option value="">${m.allPatients}</option>${this.stateListPacienteResult.map((row: PacienteRow) => html`<option value=${row.id}>${row.details.identification?.name ?? row.id}</option>`)}</select></label>
<label class="native-field"><span>${m.professional}</span><select .value=${this.stateListConsultaProfissionalId ?? ''} @change=${(event: Event) => { const target = event.target as HTMLSelectElement; this.selectListConsultaProfissionalId(target.value || null); void this.runListConsulta(); }}><option value="">${m.allProfessionals}</option>${this.stateListProfissionalResult.map((row: ProfissionalRow) => html`<option value=${row.id}>${row.details.identification?.name ?? row.id}</option>`)}</select></label>
<groupselectone--ml-select @change=${this.handleStatusChange} .value=${this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073}><Label>${m.anyStatus}</Label><Trigger>${m.anyStatus}</Trigger><Item value="scheduled">${m.scheduled}</Item><Item value="noShow">${m.noShow}</Item><Item value="attended">${m.attended}</Item></groupselectone--ml-select>
</section>`;
}
private renderCalendar(): TemplateResult {
const m = this.messages(); const rows = this.stateListConsultaResult; const loading = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073 === 'loading';
return html`<section class="calendar-surface" aria-label=${m.agenda} aria-busy=${loading ? 'true' : 'false'}><div class="calendar-heading"><h2>${m.agenda}</h2><span aria-live="polite">${loading ? m.loading : `${rows.length} ${m.count}`}</span></div><div class="calendar-grid" role="list" aria-label=${m.consultas}>${rows.length === 0 && !loading ? html`<p class="empty-message">${m.empty}</p>` : nothing}${rows.map((row: ConsultaRow) => html`<button class="calendar-block" type="button" role="listitem" @click=${() => this.selectConsulta(row)} aria-label=${`${this.patientName(row)}, ${this.formatDate(row.scheduledAt)} às ${this.formatTime(row.scheduledAt)}, ${statusLabel[row.status]}`}><strong>${this.formatTime(row.scheduledAt)} · ${this.patientName(row)}</strong><span>${this.professionalName(row)}</span><small>${statusLabel[row.status]}</small></button>`)}</div>${this.stateListConsultaError ? html`<p class="error-message" role="alert">${this.stateListConsultaError.message}</p>` : nothing}</section>`;
}
private renderActions(row: ConsultaRow): TemplateResult {
const m = this.messages(); const canNoShow = row.status === 'scheduled';
return html`<div class="detail-actions" aria-label=${m.consultas}><grouptriggeraction--ml-button-standard data-variant="danger" ?disabled=${!canNoShow || this.stateRegistrarFaltaStatus === 'loading'} ?loading=${this.stateRegistrarFaltaStatus === 'loading'} @action=${() => void this.runRegistrarFalta()}><Label>${m.registerNoShow}</Label></grouptriggeraction--ml-button-standard>${row.details.telephoneConfirmation?.confirmedAt ? nothing : html`<grouptriggeraction--ml-button-standard data-variant="secondary" ?disabled=${this.stateUpdateConsultaStatus === 'loading'} ?loading=${this.stateUpdateConsultaStatus === 'loading'} @action=${() => { this.setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt(new Date().toISOString()); void this.runUpdateConsulta(); }}><Label>${m.confirmPhone}</Label></grouptriggeraction--ml-button-standard>`}</div>${this.stateRegistrarFaltaStatus === 'success' ? html`<p role="status">${m.saved}</p>` : nothing}${this.stateRegistrarFaltaError ? html`<p class="error-message" role="alert">${this.stateRegistrarFaltaError.message}</p>` : nothing}`;
}
private renderDetail(): TemplateResult {
const m = this.messages(); const row = this.selectedConsulta();
return html`<section class="detail-panel" aria-label=${m.details}>${row ? html`<h2>${m.selected}</h2><dl><dt>${m.patient}</dt><dd>${this.patientName(row)}</dd><dt>${m.professional}</dt><dd>${this.professionalName(row)}</dd><dt>${m.dateTime}</dt><dd>${this.formatDate(row.scheduledAt)} às ${this.formatTime(row.scheduledAt)}</dd><dt>${m.consultas}</dt><dd>${statusLabel[row.status]}</dd><dt>${m.telephone}</dt><dd>${row.details.telephoneConfirmation?.confirmedAt ? this.formatDate(row.details.telephoneConfirmation.confirmedAt) : m.notRecorded}</dd></dl>${this.renderActions(row)}<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.enterUpdateConsultaScenario()}><Label>${m.editConsultation}</Label></grouptriggeraction--ml-button-standard>${this.stateUpdateConsultaStatus === 'success' ? html`<p role="status">${m.saved}</p>` : nothing}${this.stateUpdateConsultaError ? html`<p class="error-message" role="alert">${this.stateUpdateConsultaError.message}</p>` : nothing}` : html`<p>${m.selectToView}</p>`}</section>`;
}
private renderForm(update: boolean): TemplateResult {
const m = this.messages(); const status = update ? this.stateUpdateConsultaStatus : this.stateCreateConsultaStatus; const error = update ? this.stateUpdateConsultaError : this.stateCreateConsultaError;
const patient = update ? this.stateUpdateConsultaPacienteId : this.stateCreateConsultaPacienteId; const professional = update ? this.stateUpdateConsultaProfissionalId : this.stateCreateConsultaProfissionalId;
return html`<section class="form-panel" aria-label=${update ? m.editConsultation : m.schedule}><h2>${update ? m.editConsultation : m.schedule}</h2><groupselectone--ml-select .value=${patient} required @change=${update ? (event: Event) => this.selectUpdateConsultaPacienteId((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null) : this.handlePacienteChange}><Label>${m.patient}</Label><Trigger>${m.selectPatient}</Trigger>${this.stateListPacienteResult.map((row: PacienteRow) => html`<Item value=${row.id}>${row.details.identification?.name ?? row.id}</Item>`)}</groupselectone--ml-select><groupselectone--ml-select .value=${professional} required @change=${update ? (event: Event) => this.selectUpdateConsultaProfissionalId((event as CustomEvent<{ value?: string | null }>).detail?.value ?? null) : this.handleProfissionalChange}><Label>${m.professional}</Label><Trigger>${m.selectProfessional}</Trigger>${this.stateListProfissionalResult.map((row: ProfissionalRow) => html`<Item value=${row.id}>${row.details.identification?.name ?? row.id}</Item>`)}</groupselectone--ml-select><groupenterdatetime--ml-datetime-picker required locale="pt-BR" .value=${update ? this.stateUpdateConsultaScheduledAt : this.stateCreateConsultaScheduledAt} @change=${update ? this.handleUpdateDateChange : this.handleCreateDateChange}><Label>${m.dateTime}</Label><Helper>${m.chooseTime}</Helper></groupenterdatetime--ml-datetime-picker><groupenterdatetime--ml-datetime-picker required locale="pt-BR" .value=${update ? this.stateUpdateConsultaDetailsTelephoneConfirmationConfirmedAt : this.stateCreateConsultaDetailsTelephoneConfirmationConfirmedAt} @change=${update ? this.handleUpdateConfirmationChange : this.handleCreateConfirmationChange}><Label>${m.telephone}</Label><Helper>${m.informConfirmation}</Helper></groupenterdatetime--ml-datetime-picker>${error ? html`<p class="error-message" role="alert">${error.message}</p>` : nothing}${status === 'success' ? html`<p role="status">${m.saved}</p>` : nothing}<div class="form-actions"><grouptriggeraction--ml-button-standard ?loading=${status === 'loading'} ?disabled=${status === 'loading'} @action=${() => void (update ? this.runUpdateConsulta() : this.runCreateConsulta())}><Label>${update ? m.save : m.schedule}</Label></grouptriggeraction--ml-button-standard><grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.enterBaseScenario()}><Label>${m.back}</Label></grouptriggeraction--ml-button-standard></div></section>`;
}
private renderScenes(): TemplateResult { return html`<molecules--ml-scenary-102020 .value=${this.scenary} mode="scenary" back-label=${this.messages().back} @change=${this.handleUiScenaryChange}><Scene value="base" title=${this.messages().agenda}><div class="scene-content">${this.renderFilters()}${this.renderCalendar()}</div></Scene><Scene value="detailConsulta" title=${this.messages().details}><div class="scene-content">${this.renderDetail()}</div></Scene><Scene value="createConsulta" title=${this.messages().schedule}><div class="scene-content">${this.renderForm(false)}</div></Scene><Scene value="updateConsulta" title=${this.messages().edit}><div class="scene-content">${this.renderForm(true)}</div></Scene></molecules--ml-scenary-102020>`; }
render(): TemplateResult { const m = this.messages(); return html`<main class="consultas-page" aria-labelledby="consultas-title"><header class="page-header"><div><p class="eyebrow">${m.agendaClinica}</p><h1 id="consultas-title">${m.consultas}</h1><p>${m.subtitle}</p></div><grouptriggeraction--ml-button-standard @action=${() => this.enterCreateConsultaScenario()}><Label>${m.schedule}</Label></grouptriggeraction--ml-button-standard></header>${this.renderScenes()}</main>`; }
}
