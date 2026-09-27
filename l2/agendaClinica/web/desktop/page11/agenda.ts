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
agenda: 'Agenda',
consultasDoDia: 'Consultas do dia',
agendaPropria: 'Agenda própria do profissional',
hoje: 'Hoje',
carregandoAgenda: 'Carregando a agenda...',
semConsultas: 'Não há consultas na agenda.',
consultaSelecionada: 'Consulta selecionada',
horario: 'Horário',
paciente: 'Paciente',
situacao: 'Situação',
agendada: 'Agendada',
faltaRegistrada: 'Falta registrada',
atendida: 'Atendida',
pacienteNaoIdentificado: 'Paciente não identificado',
registrarAtendimento: 'Registrar atendimento',
registroDeAtendimento: 'Registro de atendimento',
consulteERegistre: 'Consulte suas consultas e registre os atendimentos.',
fechar: 'Fechar',
anotacaoDoAtendimento: 'Anotação do atendimento *',
anotacaoObrigatoria: 'A anotação é obrigatória.',
registrando: 'Registrando...',
atendimentoRegistrado: 'Atendimento registrado com sucesso.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
@customElement('agenda-clinica--web--desktop--page11--agenda-102047')
export class AgendaPage11 extends AgendaShared {
private selectedConsulta: ListConsultaItem | null = null;
private get msg(): PageMessageType {
const language = (document.documentElement.lang || 'pt').toLowerCase();
return pageMessages[language] ?? pageMessages[language.slice(0, 2)] ?? pageMessage_pt;
}
private formatDate(value: string): string {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', {
weekday: 'short',
day: '2-digit',
month: '2-digit',
year: 'numeric',
}).format(date);
}
private formatTime(value: string): string {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat('pt-BR', {
hour: '2-digit',
minute: '2-digit',
}).format(date);
}
private patientName(item: ListConsultaItem): string {
return item.consultaPaciente?.details?.identification?.name ?? this.msg.pacienteNaoIdentificado;
}
private statusLabel(status: ListConsultaItem['status']): string {
if (status === 'scheduled') return this.msg.agendada;
if (status === 'noShow') return this.msg.faltaRegistrada;
return this.msg.atendida;
}
private selectConsulta(item: ListConsultaItem): void {
this.selectedConsulta = item;
this.selectRegistrarAtendimentoId(item.id);
this.requestUpdate();
}
private openAttendance(item: ListConsultaItem): void {
if (item.status !== 'scheduled') return;
this.selectConsulta(item);
this.enterRegistrarAtendimentoScenario();
}
private closeAttendance(): void {
this.enterBaseScenario();
}
private handleNoteInput(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setRegistrarAtendimentoDetailsAttendanceNote(value);
}
private renderStatusFeedback(): TemplateResult | typeof nothing {
const error = this.stateListConsultaError;
if (this.pageStatus === 'error' && error) {
return html`<groupnotifyuser--ml-contextual-feedback type="error" visible>
<Message>${error.message}</Message>
</groupnotifyuser--ml-contextual-feedback>`;
}
if (this.pageStatus === 'loading') {
return html`<p class="agenda-feedback" role="status" aria-live="polite">${this.msg.carregandoAgenda}</p>`;
}
if (this.pageStatus === 'empty') {
return html`<p class="agenda-feedback" role="status">${this.msg.semConsultas}</p>`;
}
return nothing;
}
private renderCalendar(): TemplateResult {
const items = this.stateListConsultaResult;
return html`
<section class="agenda-surface" aria-labelledby="agenda-calendar-title">
<div class="agenda-surface-heading">
<div>
<h2 id="agenda-calendar-title">${this.msg.consultasDoDia}</h2>
<p class="agenda-muted">${this.msg.agendaPropria}</p>
</div>
<p class="agenda-today">${this.msg.hoje}</p>
</div>
${this.renderStatusFeedback()}
<groupviewdata--ml-calendar-view
.loading=${this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e000073000074000061000074000075000073 === 'loading'}
@row-click=${(event: Event) => {
const custom = event as CustomEvent<{ index?: unknown }>;
const index = typeof custom.detail?.index === 'number' ? custom.detail.index : -1;
const item = items[index];
if (item) this.selectConsulta(item);
}}>
<Columns>
<Column field="scheduledAt" header=${this.msg.horario}></Column>
<Column field="patient" header=${this.msg.paciente}></Column>
<Column field="status" header=${this.msg.situacao}></Column>
</Columns>
<Rows>
${items.map((item: ListConsultaItem) => html`
<Row>
<Cell>${this.formatTime(item.scheduledAt)}</Cell>
<Cell>${this.patientName(item)}</Cell>
<Cell>${this.statusLabel(item.status)}</Cell>
</Row>
`)}
</Rows>
<Empty><span>${this.msg.semConsultas}</span></Empty>
<Loading><span>${this.msg.carregandoAgenda}</span></Loading>
</groupviewdata--ml-calendar-view>
${this.selectedConsulta ? this.renderSelectedSummary(this.selectedConsulta) : nothing}
</section>
`;
}
private renderSelectedSummary(item: ListConsultaItem): TemplateResult {
return html`
<aside class="agenda-detail" aria-labelledby="consulta-detail-title">
<h2 id="consulta-detail-title">${this.msg.consultaSelecionada}</h2>
<dl>
<div><dt>${this.msg.horario}</dt><dd>${this.formatDate(item.scheduledAt)} às ${this.formatTime(item.scheduledAt)}</dd></div>
<div><dt>${this.msg.paciente}</dt><dd>${this.patientName(item)}</dd></div>
<div><dt>${this.msg.situacao}</dt><dd>${this.statusLabel(item.status)}</dd></div>
</dl>
${item.status === 'scheduled' ? html`
<grouptriggeraction--ml-button-standard @action=${() => this.openAttendance(item)}>
<Label>${this.msg.registrarAtendimento}</Label>
</grouptriggeraction--ml-button-standard>
` : nothing}
</aside>
`;
}
private renderAttendanceForm(): TemplateResult {
const item = this.selectedConsulta;
const note = this.stateRegistrarAtendimentoDetailsAttendanceNote ?? '';
const error = this.stateRegistrarAtendimentoError;
const loading = this.stateRegistrarAtendimentoStatus === 'loading';
return html`
<section class="attendance-panel" aria-labelledby="attendance-title">
<div class="attendance-heading">
<div>
<h2 id="attendance-title">${this.msg.registroDeAtendimento}</h2>
${item ? html`<p>${this.patientName(item)} · ${this.formatTime(item.scheduledAt)}</p>` : nothing}
</div>
<button class="agenda-close" type="button" @click=${this.closeAttendance}>${this.msg.fechar}</button>
</div>
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible>
<Message>${error.message}</Message>
</groupnotifyuser--ml-contextual-feedback>` : nothing}
${this.stateRegistrarAtendimentoStatus === 'success' ? html`<p class="agenda-success" role="status" aria-live="polite">${this.msg.atendimentoRegistrado}</p>` : nothing}
<groupentertext--ml-multiline-text
.value=${note}
rows="5"
required
?loading=${loading}
@input=${this.handleNoteInput}>
<Label>${this.msg.anotacaoDoAtendimento}</Label>
<Helper>${this.msg.anotacaoObrigatoria}</Helper>
</groupentertext--ml-multiline-text>
<grouptriggeraction--ml-button-standard
type="submit"
.loading=${loading}
?disabled=${loading || note.trim().length === 0}>
<Label>${loading ? this.msg.registrando : this.msg.registrarAtendimento}</Label>
</grouptriggeraction--ml-button-standard>
</section>
`;
}
protected override render(): TemplateResult {
return html`
<main class="agenda-page" aria-labelledby="agenda-title">
<header class="agenda-header">
<div>
<h1 id="agenda-title">${this.msg.agenda}</h1>
<p>${this.msg.consulteERegistre}</p>
</div>
<span class="agenda-date">${this.stateListConsultaResult.length > 0 ? this.formatDate(this.stateListConsultaResult[0].scheduledAt) : this.msg.hoje}</span>
</header>
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary} @change=${(event: Event) => this.handleUiScenaryChange(event)}>
<Scene value="base" title=${this.msg.agenda}>
${this.renderCalendar()}
</Scene>
<Scene value="registrarAtendimento" title=${this.msg.registroDeAtendimento}>
${this.renderCalendar()}
<form @submit=${(event: Event) => { event.preventDefault(); void this.runRegistrarAtendimento(); }}>
${this.renderAttendanceForm()}
</form>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
