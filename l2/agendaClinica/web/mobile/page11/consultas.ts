/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/consultas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConsultasShared } from '/_102047_/l2/agendaClinica/web/shared/consultas.js';
import type { ListConsultaItem } from '/_102047_/l2/agendaClinica/web/contracts/consultas.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import './consultas.less';
/// **collab_i18n_start**
const pageMessage_pt = {
title: 'Consultas',
loading: 'Carregando consultas…',
empty: 'Nenhuma consulta encontrada para os critérios informados.',
error: 'Não foi possível carregar os dados.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt, 'pt-BR': pageMessage_pt };
/// **collab_i18n_end**
const statusLabel: Record<ListConsultaItem['status'], string> = {
scheduled: 'Agendada',
noShow: 'Falta registrada',
attended: 'Atendida',
};
type SelectDetail = { value?: string | null };
type RowDetail = { index?: number };
@customElement('agenda-clinica--web--mobile--page11--consultas-102047')
export class Consultas extends ConsultasShared {
private eventValue(event: Event): string | null {
const detail = (event as CustomEvent<SelectDetail>).detail;
return detail && ('value' in detail) ? (detail.value ?? null) : null;
}
private chooseConsulta(index: number): void {
const item = this.stateListConsultaResult[index];
if (!item) return;
this.selectRegistrarFaltaId(item.id);
this.selectUpdateConsultaId(item.id);
this.selectUpdateConsultaPacienteId(item.pacienteId);
this.selectUpdateConsultaProfissionalId(item.profissionalId);
this.setUpdateConsultaScheduledAt(item.scheduledAt);
this.setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt(item.details.telephoneConfirmation?.confirmedAt ?? null);
this.enterDetailConsultaScenario();
}
private chooseConsultaFromRow(event: Event): void {
const detail = (event as CustomEvent<RowDetail>).detail;
if (detail && typeof detail.index === 'number') this.chooseConsulta(detail.index);
}
private chooseCreatePaciente(event: Event): void { this.selectCreateConsultaPacienteId(this.eventValue(event)); }
private chooseCreateProfissional(event: Event): void { this.selectCreateConsultaProfissionalId(this.eventValue(event)); }
private chooseUpdatePaciente(event: Event): void { this.selectUpdateConsultaPacienteId(this.eventValue(event)); }
private chooseUpdateProfissional(event: Event): void { this.selectUpdateConsultaProfissionalId(this.eventValue(event)); }
private formatDate(value: string): string {
const date = new Date(value);
return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}
private patientName(item: ListConsultaItem): string { return item.consultaPaciente?.details?.identification?.name ?? item.pacienteId; }
private professionalName(item: ListConsultaItem): string { return item.consultaProfissional?.details?.identification?.name ?? item.profissionalId; }
private renderError(message: string | null): TemplateResult | typeof nothing {
return message ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible="true"><Message>${message}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing;
}
private renderCalendar(): TemplateResult {
const loading = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073 === 'loading';
return html`
<groupviewdata--ml-calendar-view .loading=${loading} @row-click=${(event: Event) => this.chooseConsultaFromRow(event)}>
<Columns><Column field="scheduledAt" header="Data e horário"></Column><Column field="patient" header="Paciente"></Column><Column field="professional" header="Profissional"></Column><Column field="status" header="Situação"></Column></Columns>
<Rows>${this.stateListConsultaResult.map((item: ListConsultaItem) => html`<Row><Cell>${this.formatDate(item.scheduledAt)}</Cell><Cell>${this.patientName(item)}</Cell><Cell>${this.professionalName(item)}</Cell><Cell>${statusLabel[item.status]}</Cell></Row>`)}</Rows>
<Loading><p role="status">${pageMessages.pt.loading}</p></Loading>
<Empty><p>${pageMessages.pt.empty}</p></Empty>
</groupviewdata--ml-calendar-view>`;
}
private renderFilters(): TemplateResult {
return html`<section class="consultas-filters" aria-labelledby="consultas-filter-title">
<h2 id="consultas-filter-title">Localizar consultas</h2>
<label>Data e horário<input type="datetime-local" .value=${this.stateListConsultaScheduledAt ?? ''} @change=${(event: Event) => this.setListConsultaScheduledAt((event.target as HTMLInputElement).value || null)} /></label>
<groupselectone--ml-select .value=${this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073} @change=${(event: Event) => this.setListConsultaStatus(this.eventValue(event) as ListConsultaItem['status'] | null)}><Label>Situação</Label><Item value="scheduled">Agendada</Item><Item value="noShow">Falta registrada</Item><Item value="attended">Atendida</Item></groupselectone--ml-select>
<grouptriggeraction--ml-button-standard @action=${() => void this.runListConsulta()}><Label>Aplicar filtros</Label></grouptriggeraction--ml-button-standard>
</section>`;
}
private renderPersonSelector(kind: 'create' | 'update', person: 'paciente' | 'profissional'): TemplateResult {
const patients = this.stateListPacienteResult;
const professionals = this.stateListProfissionalResult;
const isPatient = person === 'paciente';
const value = kind === 'create' ? (isPatient ? this.stateCreateConsultaPacienteId : this.stateCreateConsultaProfissionalId) : (isPatient ? this.stateUpdateConsultaPacienteId : this.stateUpdateConsultaProfissionalId);
const change = kind === 'create' ? (isPatient ? (event: Event) => this.chooseCreatePaciente(event) : (event: Event) => this.chooseCreateProfissional(event)) : (isPatient ? (event: Event) => this.chooseUpdatePaciente(event) : (event: Event) => this.chooseUpdateProfissional(event));
return html`<groupselectone--ml-select .value=${value} required @change=${change}><Label>${isPatient ? 'Paciente' : 'Profissional'}</Label>${isPatient ? patients.map((item) => html`<Item value=${item.id}>${item.details.identification?.name ?? item.id}</Item>`) : professionals.map((item) => html`<Item value=${item.id}>${item.details.identification?.name ?? item.id}</Item>`)}</groupselectone--ml-select>`;
}
private renderForm(kind: 'create' | 'update'): TemplateResult {
const create = kind === 'create';
const scheduled = create ? this.stateCreateConsultaScheduledAt : this.stateUpdateConsultaScheduledAt;
const confirmed = create ? this.stateCreateConsultaDetailsTelephoneConfirmationConfirmedAt : this.stateUpdateConsultaDetailsTelephoneConfirmationConfirmedAt;
const status = create ? this.stateCreateConsultaStatus : this.stateUpdateConsultaStatus;
const error = create ? this.stateCreateConsultaError : this.stateUpdateConsultaError;
return html`<section class="consultas-form" aria-labelledby="${kind}-consulta-title"><h2 id="${kind}-consulta-title">${create ? 'Agendar consulta' : 'Atualizar consulta'}</h2>${this.renderPersonSelector(kind, 'paciente')}${this.renderPersonSelector(kind, 'profissional')}<groupenterdatetime--ml-datetime-picker .value=${scheduled} locale="pt-BR" required @change=${(event: Event) => { const value = this.eventValue(event); if (create) this.setCreateConsultaScheduledAt(value); else this.setUpdateConsultaScheduledAt(value); }}><Label>Data e horário</Label></groupenterdatetime--ml-datetime-picker><groupenterdatetime--ml-datetime-picker .value=${confirmed} locale="pt-BR" required @change=${(event: Event) => { const value = this.eventValue(event); if (create) this.setCreateConsultaDetailsTelephoneConfirmationConfirmedAt(value); else this.setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt(value); }}><Label>Confirmação telefônica</Label></groupenterdatetime--ml-datetime-picker>${this.renderError(error?.message ?? null)}<p role="status" aria-live="polite">${error?.message ?? (status === 'loading' ? 'Enviando…' : status === 'success' ? (create ? 'Consulta agendada com sucesso.' : 'Confirmação salva com sucesso.') : status === 'error' ? 'Não foi possível concluir a operação.' : '')}</p><grouptriggeraction--ml-button-standard ?disabled=${status === 'loading'} @action=${() => void (create ? this.runCreateConsulta() : this.runUpdateConsulta())}><Label>${create ? 'Agendar consulta' : 'Salvar confirmação'}</Label></grouptriggeraction--ml-button-standard></section>`;
}
private renderDetail(): TemplateResult {
const item = this.stateListConsultaResult.find((entry: ListConsultaItem) => entry.id === this.stateRegistrarFaltaId);
if (!item) return html`<section role="status"><h2>Detalhes da consulta</h2><p>Selecione uma consulta para visualizar os detalhes.</p></section>`;
const confirmedAt = item.details.telephoneConfirmation?.confirmedAt;
const faltaStatus = this.stateRegistrarFaltaStatus;
return html`<section class="consultas-detail" aria-labelledby="detail-title"><h2 id="detail-title">Detalhes da consulta</h2><dl><dt>Paciente</dt><dd>${this.patientName(item)}</dd><dt>Profissional</dt><dd>${this.professionalName(item)}</dd><dt>Data e horário</dt><dd>${this.formatDate(item.scheduledAt)}</dd><dt>Situação</dt><dd>${statusLabel[item.status]}</dd><dt>Confirmação telefônica</dt><dd>${confirmedAt ? this.formatDate(confirmedAt) : 'Não registrada'}</dd></dl>${this.renderError(this.stateRegistrarFaltaError?.message ?? null)}<p role="status" aria-live="polite">${this.stateRegistrarFaltaError?.message ?? (faltaStatus === 'loading' ? 'Registrando falta…' : faltaStatus === 'success' ? 'Falta registrada com sucesso.' : faltaStatus === 'error' ? 'Não foi possível registrar a falta.' : '')}</p>${item.status === 'scheduled' ? html`<grouptriggeraction--ml-button-standard data-variant="danger" ?disabled=${faltaStatus === 'loading'} @action=${() => void this.runRegistrarFalta()}><Label>Registrar falta</Label></grouptriggeraction--ml-button-standard>` : nothing}<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.enterUpdateConsultaScenario()}><Label>Editar confirmação</Label></grouptriggeraction--ml-button-standard></section>`;
}
render(): TemplateResult {
return html`<main class="consultas-page"><header><h1>${pageMessages.pt.title}</h1><grouptriggeraction--ml-button-standard @action=${() => this.enterCreateConsultaScenario()}><Label>Agendar consulta</Label></grouptriggeraction--ml-button-standard></header><molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary} @change=${this.handleUiScenaryChange}>
<Scene value="base" title="Agenda"><div id="organism.list.1">${this.renderFilters()}${this.renderCalendar()}${this.renderError(this.stateListConsultaError?.message ?? null)}</div></Scene>
<Scene value="detailConsulta" title="Detalhe"><div id="organism.detail.1">${this.renderDetail()}</div><div id="organism.actions.1"></div></Scene>
<Scene value="createConsulta" title="Novo agendamento"><div id="organism.form.1">${this.renderForm('create')}</div></Scene>
<Scene value="updateConsulta" title="Atualizar consulta"><div id="organism.form.1-update">${this.renderForm('update')}</div></Scene>
</molecules--ml-scenary-102020></main>`;
}
}
