/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/agenda.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import { AgendaShared } from '/_102047_/l2/agendaClinica/web/shared/agenda.js';
import type { ListConsultaItem } from '/_102047_/l2/agendaClinica/web/contracts/agenda.defs.js';
/// **collab_i18n_start**
const pageMessage_pt = {
agenda: 'Agenda',
agendaDescription: 'Consulte suas consultas do dia e registre o atendimento quando ele estiver agendado.',
consultasDoDia: 'Consultas do dia',
dadosDaConsulta: 'Dados da consulta',
registroDeAtendimento: 'Registro de atendimento',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessage_en: PageMessageType = {
agenda: 'Agenda',
agendaDescription: 'Review your appointments for the day and record care when scheduled.',
consultasDoDia: "Today's appointments",
dadosDaConsulta: 'Appointment details',
registroDeAtendimento: 'Care record',
};
const pageMessages: Readonly<Record<string, PageMessageType>> = { pt: pageMessage_pt, 'pt-BR': pageMessage_pt, en: pageMessage_en };
/// **collab_i18n_end**
const listStatusKey = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073' as const;
const listInputStatusKey = 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00000061' as const;
type AgendaPageEvent = CustomEvent<{ value?: unknown }>;
@customElement('agenda-clinica--web--desktop--page11--agenda-102047')
export class AgendaPage11 extends AgendaShared {
private selected: ListConsultaItem | null = null;
private get msg(): PageMessageType {
const language = (document.documentElement.lang || 'pt').toLowerCase();
return pageMessages[language] ?? pageMessages[language.slice(0, 2)] ?? pageMessage_pt;
}
private statusLabel(status: ListConsultaItem['status']): string {
if (status === 'scheduled') return 'Agendada';
if (status === 'noShow') return 'Falta registrada';
return 'Atendida';
}
private patientName(item: ListConsultaItem): string {
return item.consultaPaciente?.details?.identification?.name ?? 'Paciente sem identificação';
}
private formatDate(value: string): string {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}
private selectedItem(): ListConsultaItem | null {
if (this.selected && this.stateListConsultaResult.some((item: ListConsultaItem) => item.id === this.selected?.id)) {
return this.selected;
}
if (this.stateRegistrarAtendimentoId) {
return this.stateListConsultaResult.find((item: ListConsultaItem) => item.id === this.stateRegistrarAtendimentoId) ?? null;
}
return null;
}
private selectItem(item: ListConsultaItem): void {
this.selected = item;
this.selectRegistrarAtendimentoId(item.id);
this.requestUpdate();
}
private onRowClick(event: CustomEvent<{ index: number; data: Element }>): void {
const item = this.stateListConsultaResult[event.detail.index];
if (item) this.selectItem(item);
}
private onNoteInput(event: Event): void {
const custom = event as AgendaPageEvent;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setRegistrarAtendimentoDetailsAttendanceNote(value);
}
private openAttendance(): void {
const item = this.selectedItem();
if (!item) return;
this.selectRegistrarAtendimentoId(item.id);
this.enterRegistrarAtendimentoScenario();
}
private async submitAttendance(): Promise<void> {
await this.runRegistrarAtendimento();
this.requestUpdate();
}
private renderListFeedback(): TemplateResult | typeof nothing {
if (this[listStatusKey] === 'loading') {
return html`<p role="status" aria-live="polite">Carregando a agenda do dia…</p>`;
}
if (this[listStatusKey] === 'success' && this.stateListConsultaResult.length === 0) {
return html`<p role="status">Não há consultas na agenda do dia.</p>`;
}
if (this[listStatusKey] === 'error') {
const message = this.stateListConsultaError?.message ?? 'Não foi possível consultar a agenda.';
return html`<div role="alert"><p>${message}</p><button type="button" @click=${(): void => { void this.runListConsulta(); }}>Tentar novamente</button></div>`;
}
return nothing;
}
private renderCalendar(): TemplateResult {
const rows = this.stateListConsultaResult;
return html`
<section aria-labelledby="agenda-calendar-title">
<h2 id="agenda-calendar-title">Consultas do dia</h2>
${this.renderListFeedback()}
<groupviewdata--ml-calendar-view
.loading=${this[listStatusKey] === 'loading'}
.hoverable=${true}
@row-click=${(event: CustomEvent<{ index: number; data: Element }>): void => this.onRowClick(event)}>
<Columns>
<Column field="scheduledAt" header="Horário"></Column>
<Column field="patient" header="Paciente"></Column>
<Column field="status" header="Situação"></Column>
</Columns>
<Rows>
${rows.map((item: ListConsultaItem) => html`
<Row ?selected=${this.selectedItem()?.id === item.id}>
<Cell>${this.formatDate(item.scheduledAt)}</Cell>
<Cell>${this.patientName(item)}</Cell>
<Cell>${this.statusLabel(item.status)}</Cell>
</Row>
`)}
</Rows>
<Empty><span>Não há consultas na agenda do dia.</span></Empty>
<Loading><span role="status">Carregando a agenda…</span></Loading>
</groupviewdata--ml-calendar-view>
</section>
`;
}
private renderDetail(item: ListConsultaItem | null): TemplateResult {
return html`
<section aria-labelledby="consulta-detail-title">
<h2 id="consulta-detail-title">Dados da consulta</h2>
${item ? html`
<dl>
<div><dt>Horário</dt><dd>${this.formatDate(item.scheduledAt)}</dd></div>
<div><dt>Paciente</dt><dd>${this.patientName(item)}</dd></div>
<div><dt>Situação</dt><dd>${this.statusLabel(item.status)}</dd></div>
</dl>
${item.status === 'scheduled' ? html`
<grouptriggeraction--ml-button-standard
data-variant="primary"
@action=${(): void => this.openAttendance()}>
<Label>Registrar atendimento</Label>
</grouptriggeraction--ml-button-standard>
` : nothing}
` : html`<p>Selecione uma consulta para conferir seus dados.</p>`}
</section>
`;
}
private renderForm(item: ListConsultaItem | null): TemplateResult {
const note = this.stateRegistrarAtendimentoDetailsAttendanceNote ?? '';
const actionStatus = this.stateRegistrarAtendimentoStatus;
const error = this.stateRegistrarAtendimentoError?.message;
const success = actionStatus === 'success';
const canSubmit = item?.status === 'scheduled' && note.trim().length > 0 && actionStatus !== 'loading';
return html`
<section aria-labelledby="attendance-form-title">
<h2 id="attendance-form-title">Registrar atendimento</h2>
${item ? html`
<p>Consulta de ${this.patientName(item)} em ${this.formatDate(item.scheduledAt)}.</p>
<groupentertext--ml-multiline-text
.value=${note}
.rows=${5}
.required=${true}
.isEditing=${true}
.error=${error ?? ''}
@input=${(event: Event): void => this.onNoteInput(event)}>
<Label>Anotação do atendimento (obrigatória)</Label>
<Helper>Informe a anotação antes de concluir o atendimento.</Helper>
</groupentertext--ml-multiline-text>
${actionStatus === 'loading' ? html`<p role="status" aria-live="polite">Registrando atendimento…</p>` : nothing}
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Message>${error}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
${success ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true}>
<Message>Atendimento registrado com sucesso.</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
<grouptriggeraction--ml-button-standard
data-variant="primary"
.disabled=${!canSubmit}
.loading=${actionStatus === 'loading'}
@action=${(): void => { void this.submitAttendance(); }}>
<Label>Concluir atendimento</Label>
</grouptriggeraction--ml-button-standard>
` : html`<p>Selecione uma consulta agendada para registrar o atendimento.</p>`}
</section>
`;
}
private renderScene(): TemplateResult {
const item = this.selectedItem();
return html`
<molecules--ml-scenary-102020 .value=${this.scenary} mode="scenary" @change=${(event: AgendaPageEvent): void => this.handleUiScenaryChange(event)}>
<Scene value="base" title="Agenda">
<div class="agenda-base-content">
${this.renderCalendar()}
${this.renderDetail(item)}
</div>
</Scene>
<Scene value="registrarAtendimento" title="Registro de atendimento">
<div class="agenda-attendance-content">
${this.renderDetail(item)}
${this.renderForm(item)}
</div>
</Scene>
</molecules--ml-scenary-102020>
`;
}
render(): TemplateResult {
return html`
<main aria-labelledby="agenda-title" style="background:var(--page-bg,#fff);color:var(--text-default,#1f2937);font-family:var(--font-family-primary, sans-serif);">
<header>
<h1 id="agenda-title">${this.msg.agenda}</h1>
<p>${this.msg.agendaDescription}</p>
</header>
${this.renderScene()}
</main>
`;
}
}
