/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/consultas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConsultasShared } from '/_102047_/l2/agendaClinica/web/shared/consultas.js';
import type { ListConsultaItem, ListPacienteItem, ListProfissionalItem } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
/// **collab_i18n_start**
const pageMessage_ptBR = {
loading: 'Carregando consultas…',
empty: 'Nenhuma consulta encontrada para os filtros informados.',
processing: 'Processando…',
createSuccess: 'Consulta agendada com sucesso.',
createError: 'Não foi possível agendar a consulta.',
faltaSuccess: 'Falta registrada com sucesso.',
faltaError: 'Não foi possível registrar a falta.',
updateSuccess: 'Confirmação telefônica registrada com sucesso.',
updateError: 'Não foi possível registrar a confirmação telefônica.',
};
type PageMessageType = typeof pageMessage_ptBR;
const pageMessages: Record<string, PageMessageType> = { 'pt-BR': pageMessage_ptBR, pt: pageMessage_ptBR };
/// **collab_i18n_end**
const PAGE_TAG = 'agenda-clinica--web--desktop--page11--consultas-102047';
type ValueDetail = { value?: string | null };
type ActionDetail = Record<string, never>;
type ConsultaView = ListConsultaItem;
@customElement('agenda-clinica--web--desktop--page11--consultas-102047')
export class ConsultasPage11 extends ConsultasShared {
private selectedConsultaId: string | null = null;
private messages(): PageMessageType {
const language = (document.documentElement.lang || 'pt-BR').toLowerCase();
return pageMessages[language] ?? pageMessages[language.slice(0, 2)] ?? pageMessage_ptBR;
}
private onSelectPaciente = (event: Event): void => { const detail = (event as CustomEvent<ValueDetail>).detail; this.selectCreateConsultaPacienteId(detail?.value ?? null); };
private onSelectProfissional = (event: Event): void => { const detail = (event as CustomEvent<ValueDetail>).detail; this.selectCreateConsultaProfissionalId(detail?.value ?? null); };
private onCreateDate = (event: Event): void => { const detail = (event as CustomEvent<ValueDetail>).detail; this.setCreateConsultaScheduledAt(detail?.value ?? null); };
private onCreateConfirmation = (event: Event): void => { const detail = (event as CustomEvent<ValueDetail>).detail; this.setCreateConsultaDetailsTelephoneConfirmationConfirmedAt(detail?.value ?? null); };
private onFilterPatient = (event: Event): void => { const detail = (event as CustomEvent<ValueDetail>).detail; this.selectListConsultaPacienteId(detail?.value ?? null); void this.runListConsulta(); };
private onFilterProfessional = (event: Event): void => { const detail = (event as CustomEvent<ValueDetail>).detail; this.selectListConsultaProfissionalId(detail?.value ?? null); void this.runListConsulta(); };
private onFilterStatus = (event: Event): void => {
const value = (event as CustomEvent<ValueDetail>).detail?.value;
if (value === 'scheduled' || value === 'noShow' || value === 'attended') this.setListConsultaStatus(value);
else if (value === null || value === undefined || value === '') this.setListConsultaStatus(null);
void this.runListConsulta();
};
private onCreate = (_event: Event): void => { void this.runCreateConsulta(); };
private onConfirmTelephone = (_event: Event): void => {
if (!this.selectedConsultaId) return;
const selected = this.stateListConsultaResult.find((row: ConsultaView) => row.id === this.selectedConsultaId);
if (!selected) return;
this.stateUpdateConsultaId = selected.id;
this.stateUpdateConsultaPacienteId = selected.pacienteId;
this.stateUpdateConsultaProfissionalId = selected.profissionalId;
this.stateUpdateConsultaScheduledAt = selected.scheduledAt;
this.stateUpdateConsultaDetailsTelephoneConfirmationConfirmedAt = new Date().toISOString();
void this.runUpdateConsulta();
};
private onNoShow = (_event: Event): void => {
if (!this.selectedConsultaId) return;
this.selectRegistrarFaltaId(this.selectedConsultaId);
void this.runRegistrarFalta(window.confirm('Confirmar o registro de falta deste paciente?'));
};
private patientName(row: ConsultaView): string { return row.consultaPaciente?.details?.identification?.name ?? 'Paciente não identificado'; }
private professionalName(row: ConsultaView): string { return row.consultaProfissional?.details?.identification?.name ?? 'Profissional não identificado'; }
private formatDate(value: string): string { const parsed = new Date(value); return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(parsed); }
private statusLabel(status: ConsultaView['status']): string { return status === 'scheduled' ? 'Agendada' : status === 'noShow' ? 'Falta registrada' : 'Atendida'; }
private renderFilters(): TemplateResult {
const filterStatus = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073;
return html`<section class="filters" aria-labelledby="filters-title"><h2 id="filters-title">Refinar consultas</h2><div class="filter-grid">
<groupselectone--ml-select value=${this.stateListConsultaPacienteId ?? nothing} @change=${this.onFilterPatient} searchable><Label>Paciente</Label><Trigger>Todos os pacientes</Trigger>${this.stateListPacienteResult.map((row: ListPacienteItem) => html`<Item value=${row.id}>${row.details.identification?.name ?? row.id}</Item>`)}<Empty>Nenhum paciente disponível</Empty></groupselectone--ml-select>
<groupselectone--ml-select value=${this.stateListConsultaProfissionalId ?? nothing} @change=${this.onFilterProfessional} searchable><Label>Profissional</Label><Trigger>Todos os profissionais</Trigger>${this.stateListProfissionalResult.map((row: ListProfissionalItem) => html`<Item value=${row.id}>${row.details.identification?.name ?? row.id}</Item>`)}<Empty>Nenhum profissional disponível</Empty></groupselectone--ml-select>
<groupselectone--ml-select value=${filterStatus ?? nothing} @change=${this.onFilterStatus}><Label>Situação</Label><Trigger>Todas as situações</Trigger><Item value="scheduled">Agendada</Item><Item value="noShow">Falta registrada</Item><Item value="attended">Atendida</Item></groupselectone--ml-select>
</div></section>`;
}
private renderCalendar(): TemplateResult {
const rows = this.stateListConsultaResult;
const operationStatus = String(this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073);
return html`<section class="calendar" aria-labelledby="calendar-title" aria-live="polite"><div class="calendar-heading"><h2 id="calendar-title">Agenda de consultas</h2><span>${rows.length} consulta(s) localizada(s)</span></div><div class="week-grid">${Array.from({ length: 7 }, (_value: unknown, index: number) => html`<div class="day-column"><h3>Dia ${index + 1}</h3><div class="day-slots">${rows.filter((row: ConsultaView) => new Date(row.scheduledAt).getDay() === index).map((row: ConsultaView) => html`<button class="appointment ${row.id === this.selectedConsultaId ? 'selected' : ''}" type="button" @click=${(): void => { this.selectedConsultaId = row.id; this.enterDetailConsultaScenario(); }} aria-label="${this.patientName(row)}, ${this.formatDate(row.scheduledAt)}, ${this.statusLabel(row.status)}"><strong>${this.patientName(row)}</strong><span>${this.professionalName(row)}</span><time>${this.formatDate(row.scheduledAt)}</time><em>${this.statusLabel(row.status)}</em></button>`)}</div></div>`)}</div>${operationStatus === 'loading' ? html`<p role="status">${this.messages().loading}</p>` : nothing}${operationStatus === 'empty' ? html`<p class="empty">${this.messages().empty}</p>` : nothing}${this.stateListConsultaError ? html`<p class="error" role="alert">${this.stateListConsultaError.message}</p>` : nothing}</section>`;
}
private renderDetail(): TemplateResult {
const row = this.stateListConsultaResult.find((item: ConsultaView) => item.id === this.selectedConsultaId);
const busy = this.stateUpdateConsultaStatus === 'loading' || this.stateRegistrarFaltaStatus === 'loading';
return html`<section class="panel" aria-labelledby="detail-title"><h2 id="detail-title">Detalhes da consulta</h2>${row ? html`<dl><dt>Paciente</dt><dd>${this.patientName(row)}</dd><dt>Profissional</dt><dd>${this.professionalName(row)}</dd><dt>Data e horário</dt><dd>${this.formatDate(row.scheduledAt)}</dd><dt>Situação</dt><dd>${this.statusLabel(row.status)}</dd><dt>Confirmação telefônica</dt><dd>${row.details.telephoneConfirmation?.confirmedAt ? this.formatDate(row.details.telephoneConfirmation.confirmedAt) : 'Não registrada'}</dd></dl><div class="actions"><grouptriggeraction--ml-button-standard @action=${this.onConfirmTelephone} ?disabled=${row.status !== 'scheduled'}><Label>Registrar confirmação telefônica</Label></grouptriggeraction--ml-button-standard><grouptriggeraction--ml-button-standard data-variant="danger" @action=${this.onNoShow} ?disabled=${row.status !== 'scheduled'}><Label>Registrar falta</Label></grouptriggeraction--ml-button-standard></div>` : html`<p>Selecione uma consulta no calendário para ver seus dados.</p>`}${busy ? html`<p role="status">${this.messages().processing}</p>` : nothing}${this.stateUpdateConsultaError ? html`<p class="error" role="alert">${this.stateUpdateConsultaError.message || this.messages().updateError}</p>` : nothing}${this.stateRegistrarFaltaError ? html`<p class="error" role="alert">${this.stateRegistrarFaltaError.message || this.messages().faltaError}</p>` : nothing}${this.stateUpdateConsultaStatus === 'success' ? html`<p role="status">${this.messages().updateSuccess}</p>` : nothing}${this.stateRegistrarFaltaStatus === 'success' ? html`<p role="status">${this.messages().faltaSuccess}</p>` : nothing}</section>`;
}
private renderForm(): TemplateResult { return html`<section class="panel form-panel" aria-labelledby="form-title"><h2 id="form-title">Agendar consulta</h2><div class="form-grid"><groupselectone--ml-select value=${this.stateCreateConsultaPacienteId ?? nothing} required @change=${this.onSelectPaciente}><Label>Paciente</Label><Trigger>Selecione o paciente</Trigger>${this.stateListPacienteResult.map((row: ListPacienteItem) => html`<Item value=${row.id}>${row.details.identification?.name ?? row.id}</Item>`)}</groupselectone--ml-select><groupselectone--ml-select value=${this.stateCreateConsultaProfissionalId ?? nothing} required @change=${this.onSelectProfissional}><Label>Profissional</Label><Trigger>Selecione o profissional</Trigger>${this.stateListProfissionalResult.map((row: ListProfissionalItem) => html`<Item value=${row.id}>${row.details.identification?.name ?? row.id}</Item>`)}</groupselectone--ml-select><groupenterdatetime--ml-datetime-picker value=${this.stateCreateConsultaScheduledAt ?? nothing} locale="pt-BR" required @change=${this.onCreateDate}><Label>Data e horário</Label></groupenterdatetime--ml-datetime-picker><groupenterdatetime--ml-datetime-picker value=${this.stateCreateConsultaDetailsTelephoneConfirmationConfirmedAt ?? nothing} locale="pt-BR" required @change=${this.onCreateConfirmation}><Label>Confirmada em</Label></groupenterdatetime--ml-datetime-picker></div>${this.stateCreateConsultaError ? html`<p class="error" role="alert">${this.stateCreateConsultaError.message || this.messages().createError}</p>` : nothing}${this.stateCreateConsultaStatus === 'success' ? html`<p role="status">${this.messages().createSuccess}</p>` : nothing}<grouptriggeraction--ml-button-standard @action=${this.onCreate} ?loading=${this.stateCreateConsultaStatus === 'loading'}><Label>Agendar consulta</Label></grouptriggeraction--ml-button-standard></section>`; }
protected render(): TemplateResult { return html`<main class="page"><header class="page-header"><div><p class="eyebrow">Agenda clínica</p><h1>Consultas</h1><p>Localize, agende e acompanhe consultas da clínica.</p></div><grouptriggeraction--ml-button-standard @action=${(): void => this.enterCreateConsultaScenario()}><Label>Agendar consulta</Label></grouptriggeraction--ml-button-standard></header><molecules--ml-scenary-102020 @change=${this.handleUiScenaryChange} value=${this.scenary} mode="scenary"><Scene value="base" title="Agenda"><div class="content">${this.renderFilters()}${this.renderCalendar()}</div></Scene><Scene value="detailConsulta" title="Detalhes"><div class="content">${this.renderFilters()}${this.renderCalendar()}${this.renderDetail()}</div></Scene><Scene value="createConsulta" title="Agendar"><div class="content">${this.renderFilters()}${this.renderCalendar()}${this.renderForm()}</div></Scene><Scene value="updateConsulta" title="Atualizar"><div class="content">${this.renderFilters()}${this.renderCalendar()}${this.renderDetail()}</div></Scene></molecules--ml-scenary-102020>${this.pageStatus === 'error' ? html`<p class="error" role="alert">Não foi possível carregar a agenda.</p>` : nothing}</main>`; }
}
