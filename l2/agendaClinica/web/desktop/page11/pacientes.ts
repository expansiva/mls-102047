/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import { PacientesShared } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';
import type { ListPacienteItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Pacientes',
pageDescription: 'Consulta e cadastro de pacientes da clínica.',
createSuccess: 'Paciente cadastrado e disponível para consulta.',
createLoading: 'Cadastrando paciente…',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessage_en: PageMessageType = {
pageTitle: 'Patients',
pageDescription: 'Consult and register clinic patients.',
createSuccess: 'Patient registered and available for consultation.',
createLoading: 'Registering patient…',
};
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt, en: pageMessage_en };
/// **collab_i18n_end**
@customElement('agenda-clinica--web--desktop--page11--pacientes-102047')
class PacientesPage11 extends PacientesShared {
private onScenarioChange(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
if (detail && typeof detail.value === 'string') this.setScenario(detail.value as 'base' | 'createPaciente');
}
private onSearchChange(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : null;
this.setListPacienteDetailsIdentificationName(value);
void this.runListPaciente();
}
private onRowClick(event: Event): void {
const detail = (event as CustomEvent<{ index?: number }>).detail;
const index = detail?.index;
if (typeof index !== 'number') return;
const patient = this.stateListPacienteResult[index];
if (!patient) return;
this.setListPacienteId(patient.id);
void this.runListPaciente();
}
private onNameInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
this.setCreatePacienteDetailsIdentificationName(
detail && typeof detail.value === 'string' ? detail.value : null,
);
}
private onCountryInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
this.setCreatePacienteDetailsIdentificationCountryCode(
detail && typeof detail.value === 'string' ? detail.value : null,
);
}
private onDocIdInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
this.setCreatePacienteDetailsIdentificationDocId(
detail && typeof detail.value === 'string' ? detail.value : null,
);
}
private onDocTypeChange(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail?.value;
if (value === null || value === undefined || value === '') {
this.setCreatePacienteDetailsIdentificationDocType(null);
return;
}
if (value === 'CPF' || value === 'NationalId' || value === 'Passport' || value === 'Other') {
this.setCreatePacienteDetailsIdentificationDocType(value);
}
}
private patientDetail(): ListPacienteItem | null {
const selectedId = this.stateListPacienteId;
if (selectedId !== null) {
return this.stateListPacienteResult.find((item: ListPacienteItem) => item.id === selectedId) ?? null;
}
return this.stateListPacienteResult.length === 1 ? this.stateListPacienteResult[0] : null;
}
private renderListScene(): TemplateResult {
const error = this.stateListPacienteError;
const loading = this.stateListPacienteStatus === 'loading' || this.pageStatus === 'loading';
const rows = this.stateListPacienteResult;
return html`
<section class="patients-list" data-organism-id="organism.list.1" aria-labelledby="patients-list-title">
<div class="section-heading">
<div>
<h2 id="patients-list-title">Pacientes cadastrados</h2>
<p>Consulte pacientes disponíveis para agendamento.</p>
</div>
<grouptriggeraction--ml-button-standard @action=${this.enterCreatePacienteScenario}>
<Label>Novo paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
<groupsearchcontent--ml-search-bar
.value=${this.stateListPacienteDetailsIdentificationName}
.loading=${loading}
name="patient-search"
placeholder="Buscar pelo nome"
@change=${this.onSearchChange}>
<Label>Buscar paciente</Label>
<Helper>Digite o nome e confirme a busca.</Helper>
${rows.slice(0, 5).map((item: ListPacienteItem) => html`
<Suggestion value=${item.details.identification?.name ?? ''}>${item.details.identification?.name ?? ''}</Suggestion>
`)}
${!loading && rows.length === 0 ? html`<Empty>Nenhum paciente encontrado.</Empty>` : nothing}
</groupsearchcontent--ml-search-bar>
${error ? html`<p class="feedback feedback-error" role="alert">${error.message}</p>` : nothing}
<groupviewdata--ml-vertical-record-list
.loading=${loading}
.hoverable=${true}
@row-click=${this.onRowClick}>
<Columns>
<Column field="name" header="Nome"></Column>
<Column field="document" header="Documento"></Column>
<Column field="country" header="País"></Column>
</Columns>
<Rows>
${rows.map((item: ListPacienteItem) => {
const identification = item.details.identification;
return html`
<Row ?selected=${item.id === this.stateListPacienteId}>
<Cell>${identification?.name ?? 'Nome indisponível'}</Cell>
<Cell>${identification?.docType && identification.docId ? `${identification.docType}: ${identification.docId}` : 'Não informado'}</Cell>
<Cell>${identification?.countryCode ?? 'Não informado'}</Cell>
</Row>
`;
})}
</Rows>
<Loading><span>Carregando pacientes…</span></Loading>
<Empty><span>Nenhum paciente encontrado.</span></Empty>
</groupviewdata--ml-vertical-record-list>
</section>
`;
}
private renderDetailScene(): TemplateResult {
const patient = this.patientDetail();
const identification = patient?.details.identification;
const unavailable = this.stateListPacienteStatus === 'error' || !patient;
return html`
<aside class="patient-detail" data-organism-id="organism.detail.1" aria-labelledby="patient-detail-title">
<h2 id="patient-detail-title">Detalhes do paciente</h2>
${unavailable ? html`<p class="muted" role="status">Os dados de identificação do paciente estão indisponíveis.</p>` : html`
<dl>
<div><dt>Nome</dt><dd>${identification?.name ?? 'Indisponível'}</dd></div>
<div><dt>Tipo de documento</dt><dd>${identification?.docType ?? 'Não informado'}</dd></div>
<div><dt>Número do documento</dt><dd>${identification?.docId ?? 'Não informado'}</dd></div>
<div><dt>País</dt><dd>${identification?.countryCode ?? 'Indisponível'}</dd></div>
</dl>
`}
</aside>
`;
}
private renderFormScene(): TemplateResult {
const error = this.stateCreatePacienteError;
const loading = this.stateCreatePacienteStatus === 'loading';
const locale = (document.documentElement.lang || 'pt').toLowerCase().slice(0, 2);
const messages = pageMessages[locale] ?? pageMessage_pt;
return html`
<section class="patient-form" data-organism-id="organism.form.1" aria-labelledby="patient-form-title">
<div class="section-heading">
<div>
<h2 id="patient-form-title">Cadastrar paciente</h2>
<p>Informe os dados de identificação autorizados.</p>
</div>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${this.enterBaseScenario}>
<Label>Voltar à consulta</Label>
</grouptriggeraction--ml-button-standard>
</div>
<div class="form-fields">
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationName ?? ''}
required
name="patient-name"
@input=${this.onNameInput}>
<Label>Nome</Label>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationCountryCode ?? ''}
required
maxlength="2"
name="patient-country"
placeholder="BR"
@input=${this.onCountryInput}>
<Label>País</Label>
<Helper>Use o código de duas letras, como BR.</Helper>
</groupentertext--ml-enter-text>
<groupselectone--ml-select
.value=${this.stateCreatePacienteDetailsIdentificationDocType}
name="patient-document-type"
placeholder="Selecione o tipo"
@change=${this.onDocTypeChange}>
<Label>Tipo de documento</Label>
<Item value="CPF">CPF</Item>
<Item value="NationalId">Documento nacional</Item>
<Item value="Passport">Passaporte</Item>
<Item value="Other">Outro</Item>
<Empty>Nenhum tipo disponível.</Empty>
</groupselectone--ml-select>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationDocId ?? ''}
name="patient-document-number"
@input=${this.onDocIdInput}>
<Label>Número do documento</Label>
</groupentertext--ml-enter-text>
</div>
${loading ? html`<p class="feedback feedback-info" role="status" aria-live="polite">${messages.createLoading}</p>` : nothing}
${error ? html`<p class="feedback feedback-error" role="alert">${error.message}</p>` : nothing}
${this.stateCreatePacienteStatus === 'success' ? html`<p class="feedback feedback-success" role="status">${messages.createSuccess}</p>` : nothing}
<grouptriggeraction--ml-button-standard .loading=${loading} .disabled=${loading} @action=${this.runCreatePaciente}>
<Label>Cadastrar paciente</Label>
</grouptriggeraction--ml-button-standard>
</section>
`;
}
protected render(): TemplateResult {
const isCreate = this.scenary === 'createPaciente';
return html`
<main class="pacientes-page" aria-labelledby="page-title">
<header class="page-header">
<h1 id="page-title">Pacientes</h1>
<p>Consulta e cadastro de pacientes da clínica.</p>
</header>
<molecules--ml-scenary-102020
.value=${this.scenary}
mode="scenary"
@change=${this.onScenarioChange}>
<Scene value="base" title="Consulta de pacientes">
<div class="base-content" ?hidden=${isCreate} ?inert=${isCreate}>
${this.renderListScene()}
${this.renderDetailScene()}
</div>
</Scene>
<Scene value="createPaciente" title="Cadastro de paciente">
<div class="create-content" ?hidden=${!isCreate} ?inert=${!isCreate}>
${this.renderFormScene()}
</div>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
export { PacientesPage11 };
