/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PacientesShared } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';
import type { ListPacienteItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import './pacientes.less';
const PAGE_TAG = 'agenda-clinica--web--mobile--page11--pacientes-102047';
type DocType = 'CPF' | 'NationalId' | 'Passport' | 'Other';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Pacientes',
pageDescription: 'Consulte pacientes cadastrados ou registre um novo cadastro.',
registeredPatients: 'Pacientes cadastrados',
newPatient: 'Novo paciente',
searchByName: 'Buscar por nome',
search: 'Buscar',
loadingPatients: 'Carregando pacientes…',
listError: 'Não foi possível localizar os pacientes.',
emptyPatients: 'Nenhum paciente encontrado.',
patientResults: 'Resultados de pacientes',
nameUnavailable: 'Nome indisponível',
document: 'Documento',
notInformed: 'Não informado',
country: 'País',
patientDetails: 'Detalhes do paciente',
patientDataUnavailable: 'Os dados do paciente consultado não estão disponíveis.',
registerPatient: 'Cadastrar paciente',
identificationHelp: 'Informe os dados de identificação permitidos.',
back: 'Voltar',
required: 'obrigatório',
optional: 'opcional',
processing: 'Processando cadastro…',
createdSuccessfully: 'Paciente cadastrado com sucesso.',
name: 'Nome',
countryCode: 'País',
documentType: 'Tipo de documento',
noDocumentType: 'Não informado',
nationalDocument: 'Documento nacional',
passport: 'Passaporte',
other: 'Outro',
documentNumber: 'Número do documento',
submitPatient: 'Cadastrar paciente',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessage_en: PageMessageType = {
pageTitle: 'Patients',
pageDescription: 'Find registered patients or register a new patient.',
registeredPatients: 'Registered patients',
newPatient: 'New patient',
searchByName: 'Search by name',
search: 'Search',
loadingPatients: 'Loading patients…',
listError: 'Could not find patients.',
emptyPatients: 'No patients found.',
patientResults: 'Patient results',
nameUnavailable: 'Name unavailable',
document: 'Document',
notInformed: 'Not informed',
country: 'Country',
patientDetails: 'Patient details',
patientDataUnavailable: 'The consulted patient data is unavailable.',
registerPatient: 'Register patient',
identificationHelp: 'Enter the permitted identification data.',
back: 'Back',
required: 'required',
optional: 'optional',
processing: 'Processing registration…',
createdSuccessfully: 'Patient registered successfully.',
name: 'Name',
countryCode: 'Country',
documentType: 'Document type',
noDocumentType: 'Not informed',
nationalDocument: 'National document',
passport: 'Passport',
other: 'Other',
documentNumber: 'Document number',
submitPatient: 'Register patient',
};
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt, 'pt-BR': pageMessage_pt, en: pageMessage_en };
/// **collab_i18n_end**
@customElement('agenda-clinica--web--mobile--page11--pacientes-102047')
export class PacientesPage extends PacientesShared {
private get msg(): PageMessageType {
const lang = (document.documentElement.lang || 'pt').toLowerCase();
return pageMessages[lang] ?? pageMessages[lang.split('-')[0]] ?? pageMessage_pt;
}
private onSearchInput(event: Event): void {
const target = event.target as HTMLInputElement | null;
this.setListPacienteDetailsIdentificationName(target?.value ?? '');
}
private onSearchSubmit(event: SubmitEvent): void {
event.preventDefault();
void this.runListPaciente();
}
private onNameInput(event: Event): void {
const target = event.target as HTMLInputElement | null;
this.setCreatePacienteDetailsIdentificationName(target?.value ?? '');
}
private onCountryInput(event: Event): void {
const target = event.target as HTMLInputElement | null;
this.setCreatePacienteDetailsIdentificationCountryCode((target?.value ?? '').toUpperCase());
}
private onDocTypeChange(event: Event): void {
const target = event.target as HTMLSelectElement | null;
const value = target?.value ?? '';
this.setCreatePacienteDetailsIdentificationDocType(
value === 'CPF' || value === 'NationalId' || value === 'Passport' || value === 'Other'
? value
: null,
);
}
private onDocIdInput(event: Event): void {
const target = event.target as HTMLInputElement | null;
this.setCreatePacienteDetailsIdentificationDocId(target?.value ?? '');
}
private onCreateSubmit(event: SubmitEvent): void {
event.preventDefault();
void this.runCreatePaciente();
}
private onCreateAction(): void {
this.enterCreatePacienteScenario();
}
private onBackToList(): void {
this.enterBaseScenario();
}
private onScenarioChange(event: Event): void {
this.handleUiScenaryChange(event);
}
private identification(item: ListPacienteItem): NonNullable<ListPacienteItem['details']['identification']> | null {
return item.details.identification ?? null;
}
private renderList(): TemplateResult {
const status = this.stateListPacienteStatus;
const pageStatus = this.pageStatus;
const rows = this.stateListPacienteResult;
return html`
<section class="patients-list" aria-labelledby="patients-results-heading">
<div class="section-heading-row">
<h2 id="patients-results-heading">${this.msg.registeredPatients}</h2>
<button class="primary-action" type="button" @click=${this.onCreateAction}>${this.msg.newPatient}</button>
</div>
<form class="search-form" @submit=${this.onSearchSubmit} role="search">
<label for="patient-name-search">${this.msg.searchByName}</label>
<div class="search-controls">
<input
id="patient-name-search"
name="patientName"
type="search"
.value=${this.stateListPacienteDetailsIdentificationName ?? ''}
@input=${this.onSearchInput}
autocomplete="off"
/>
<button type="submit" class="secondary-action">${this.msg.search}</button>
</div>
</form>
<div class="results-status" aria-live="polite" aria-busy=${status === 'loading' ? 'true' : 'false'}>
${status === 'loading' ? html`<p>${this.msg.loadingPatients}</p>` : nothing}
${status === 'error' ? html`<p class="error-message" role="alert">${this.stateListPacienteError?.message ?? this.msg.listError}</p>` : nothing}
${pageStatus === 'empty' ? html`<p class="empty-message">${this.msg.emptyPatients}</p>` : nothing}
</div>
${pageStatus === 'success' ? html`
<ul class="patient-results" aria-label=${this.msg.patientResults}>
${rows.map((item: ListPacienteItem) => {
const details = this.identification(item);
return html`
<li class="patient-result">
<article>
<h3>${details?.name ?? this.msg.nameUnavailable}</h3>
<dl>
<div><dt>${this.msg.document}</dt><dd>${details?.docId ?? this.msg.notInformed}</dd></div>
<div><dt>${this.msg.country}</dt><dd>${details?.countryCode ?? this.msg.notInformed}</dd></div>
</dl>
</article>
</li>
`;
})}
</ul>
` : nothing}
</section>
`;
}
private renderDetail(): TemplateResult {
const item = this.stateListPacienteResult[0];
const details = item ? this.identification(item) : null;
return html`
<section class="patient-detail" aria-labelledby="patient-detail-heading">
<h2 id="patient-detail-heading">${this.msg.patientDetails}</h2>
${details ? html`
<dl class="detail-list">
<div><dt>${this.msg.name}</dt><dd>${details.name}</dd></div>
<div><dt>${this.msg.document}</dt><dd>${details.docId ?? this.msg.notInformed}</dd></div>
<div><dt>${this.msg.country}</dt><dd>${details.countryCode}</dd></div>
</dl>
` : html`<p class="empty-message">${this.msg.patientDataUnavailable}</p>`}
</section>
`;
}
private renderForm(): TemplateResult {
const actionStatus = this.stateCreatePacienteStatus;
const error = this.stateCreatePacienteError?.message;
return html`
<section class="patient-form-panel" aria-labelledby="patient-form-heading">
<div class="section-heading-row">
<div>
<h2 id="patient-form-heading">${this.msg.registerPatient}</h2>
<p class="helper-text">${this.msg.identificationHelp}</p>
</div>
<button type="button" class="quiet-action" @click=${this.onBackToList}>${this.msg.back}</button>
</div>
<label for="patient-name">${this.msg.name} <span aria-hidden="true">*</span></label>
<input id="patient-name" name="name" type="text" required .value=${this.stateCreatePacienteDetailsIdentificationName ?? ''} @input=${this.onNameInput} />
<label for="patient-country">${this.msg.countryCode} <span aria-hidden="true">*</span></label>
<input id="patient-country" name="countryCode" type="text" required maxlength="2" pattern="[A-Za-z]{2}" .value=${this.stateCreatePacienteDetailsIdentificationCountryCode ?? ''} @input=${this.onCountryInput} autocomplete="country" />
<label for="patient-doc-type">${this.msg.documentType} <span class="optional">(${this.msg.optional})</span></label>
<select id="patient-doc-type" name="docType" .value=${this.stateCreatePacienteDetailsIdentificationDocType ?? ''} @change=${this.onDocTypeChange}>
<option value="">${this.msg.noDocumentType}</option>
<option value="CPF">CPF</option>
<option value="NationalId">${this.msg.nationalDocument}</option>
<option value="Passport">${this.msg.passport}</option>
<option value="Other">${this.msg.other}</option>
</select>
<label for="patient-doc-id">${this.msg.documentNumber} <span class="optional">(${this.msg.optional})</span></label>
<input id="patient-doc-id" name="docId" type="text" .value=${this.stateCreatePacienteDetailsIdentificationDocId ?? ''} @input=${this.onDocIdInput} />
<p id="patient-form-status" class="form-status" aria-live="polite" aria-busy=${actionStatus === 'loading' ? 'true' : 'false'}>
${actionStatus === 'loading' ? this.msg.processing : nothing}
${actionStatus === 'success' ? this.msg.createdSuccessfully : nothing}
${error ? html`<span class="error-message" role="alert">${error}</span>` : nothing}
</p>
<button class="primary-action submit-action" type="submit" ?disabled=${actionStatus === 'loading'}>${this.msg.submitPatient}</button>
</section>
`;
}
protected render(): TemplateResult {
const active = this.scenary;
return html`
<main class="patients-page" aria-labelledby="patients-page-heading">
<header class="page-header">
<h1 id="patients-page-heading">${this.msg.pageTitle}</h1>
<p>${this.msg.pageDescription}</p>
</header>
<molecules--ml-scenary-102020 mode="direct" .value=${active} @change=${this.onScenarioChange}>
<Scene value="base" title=${this.msg.registeredPatients}>${this.renderList()}${this.renderDetail()}</Scene>
<Scene value="createPaciente" title=${this.msg.registerPatient}><form class="patient-form" @submit=${this.onCreateSubmit} aria-describedby="patient-form-status">${this.renderForm()}</form></Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
