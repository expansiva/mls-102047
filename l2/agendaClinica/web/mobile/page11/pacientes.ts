/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PacientesShared } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';
import type { ListPacienteItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102047_/l2/agendaClinica/web/mobile/page11/pacientes.less';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Pacientes',
pageDescription: 'Consulta e cadastro de pacientes da clínica.',
listTitle: 'Pacientes cadastrados',
listDescription: 'Localize um paciente pelo nome para consultar seus dados.',
searchPlaceholder: 'Digite o nome do paciente',
searchLabel: 'Nome do paciente',
searchHelper: 'Os resultados aparecem após confirmar a busca.',
newPatient: 'Novo paciente',
loading: 'Carregando pacientes…',
empty: 'Nenhum paciente encontrado.',
listError: 'Não foi possível consultar os pacientes.',
detailTitle: 'Dados de identificação',
selectPatient: 'Selecione um resultado para consultar os dados do paciente.',
name: 'Nome',
document: 'Documento',
country: 'País',
notInformed: 'Não informado',
createTitle: 'Cadastrar paciente',
createDescription: 'Informe os dados de identificação permitidos.',
createName: 'Nome',
createCountry: 'País',
countryHelper: 'Use o código de duas letras, como BR.',
documentType: 'Tipo de documento (opcional)',
documentNumber: 'Número do documento (opcional)',
notProvided: 'Não informado',
register: 'Cadastrar paciente',
created: 'Paciente cadastrado. A consulta foi atualizada.',
required: 'Nome e país são obrigatórios para cadastrar o paciente.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
@customElement('agenda-clinica--web--mobile--page11--pacientes-102047')
export class PacientesPage11 extends PacientesShared {
private readonly documentTypes: Array<{ value: 'CPF' | 'NationalId' | 'Passport' | 'Other'; label: string }> = [
{ value: 'CPF', label: 'CPF' },
{ value: 'NationalId', label: 'Documento nacional' },
{ value: 'Passport', label: 'Passaporte' },
{ value: 'Other', label: 'Outro' },
];
private get msg(): PageMessageType {
const language = (document.documentElement.lang || 'pt').toLowerCase();
return pageMessages[language] ?? pageMessages[language.split('-')[0]] ?? pageMessage_pt;
}
private handleSearchInput(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setListPacienteDetailsIdentificationName(value || null);
}
private handleSearchChange(event: Event): void {
this.handleSearchInput(event);
void this.runListPaciente();
}
private handleRowClick(event: Event): void {
const custom = event as CustomEvent<{ index?: number }>;
const index = custom.detail?.index;
if (typeof index !== 'number') return;
const patient = this.stateListPacienteResult[index];
if (!patient) return;
this.setListPacienteId(patient.id);
const identification = patient.details.identification;
if (identification) {
this.setListPacienteDetailsIdentificationName(identification.name);
this.setListPacienteDetailsIdentificationDocType(identification.docType ?? null);
this.setListPacienteDetailsIdentificationDocId(identification.docId ?? null);
this.setListPacienteDetailsIdentificationCountryCode(identification.countryCode);
}
}
private handleNameInput(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setCreatePacienteDetailsIdentificationName(value || null);
}
private handleCountryInput(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setCreatePacienteDetailsIdentificationCountryCode(value || null);
}
private handleDocumentInput(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const value = typeof custom.detail?.value === 'string' ? custom.detail.value : '';
this.setCreatePacienteDetailsIdentificationDocId(value || null);
}
private handleDocumentTypeChange(event: Event): void {
const target = event.target as HTMLSelectElement | null;
const value = target?.value ?? '';
if (value === 'CPF' || value === 'NationalId' || value === 'Passport' || value === 'Other') {
this.setCreatePacienteDetailsIdentificationDocType(value);
} else {
this.setCreatePacienteDetailsIdentificationDocType(null);
}
}
private renderError(message: string | null): TemplateResult | typeof nothing {
return message ? html`<p class="pacientes-error" role="alert">${message}</p>` : nothing;
}
private renderSearchScene(): TemplateResult {
const status = this.stateListPacienteStatus;
const selected = this.stateListPacienteResult.length === 1 ? this.stateListPacienteResult[0] : undefined;
return html`
<section class="pacientes-content" data-organism-id="organism.list.1" aria-labelledby="pacientes-list-title">
<div class="pacientes-section-heading">
<h2 id="pacientes-list-title">${this.msg.listTitle}</h2>
<p>${this.msg.listDescription}</p>
</div>
<groupentertext--ml-enter-text
.value=${this.stateListPacienteDetailsIdentificationName ?? ''}
name="patient-search"
inputType="search"
autocomplete="off"
placeholder=${this.msg.searchPlaceholder}
@input=${(event: Event) => this.handleSearchInput(event)}
@change=${(event: Event) => this.handleSearchChange(event)}>
<Label>${this.msg.searchLabel}</Label>
<Helper>${this.msg.searchHelper}</Helper>
</groupentertext--ml-enter-text>
<div class="pacientes-actions">
<grouptriggeraction--ml-button-standard
data-variant="primary"
@action=${() => this.enterCreatePacienteScenario()}>
<Label>${this.msg.newPatient}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${this.stateListPacienteError ? this.renderError(this.stateListPacienteError.message || this.msg.listError) : nothing}
<div class="pacientes-results" aria-live="polite">
<groupviewdata--ml-vertical-record-list
.loading=${status === 'loading'}
.hoverable=${true}
@row-click=${(event: Event) => this.handleRowClick(event)}>
<Columns>
<Column field="name" header=${this.msg.name}></Column>
<Column field="document" header=${this.msg.document}></Column>
<Column field="country" header=${this.msg.country}></Column>
</Columns>
<Rows>
${this.stateListPacienteResult.map((patient: ListPacienteItem) => {
const identification = patient.details.identification;
return html`
<Row>
<Cell>${identification?.name ?? this.msg.notInformed}</Cell>
<Cell>${identification?.docId ?? this.msg.notInformed}</Cell>
<Cell>${identification?.countryCode ?? this.msg.notInformed}</Cell>
</Row>
`;
})}
</Rows>
${status === 'loading' ? html`<Loading><span>${this.msg.loading}</span></Loading>` : nothing}
${this.pageStatus === 'empty' ? html`<Empty><span>${this.msg.empty}</span></Empty>` : nothing}
</groupviewdata--ml-vertical-record-list>
</div>
</section>
<section class="pacientes-content pacientes-detail" data-organism-id="organism.detail.1" aria-labelledby="pacientes-detail-title">
<h2 id="pacientes-detail-title">${this.msg.detailTitle}</h2>
${selected ? this.renderPatientDetail(selected) : html`<p>${this.msg.selectPatient}</p>`}
</section>
`;
}
private renderPatientDetail(patient: ListPacienteItem): TemplateResult {
const identification = patient.details.identification;
return html`
<dl class="pacientes-detail-list">
<div><dt>${this.msg.name}</dt><dd>${identification?.name ?? this.msg.notInformed}</dd></div>
<div><dt>${this.msg.document}</dt><dd>${identification?.docId ?? this.msg.notInformed}</dd></div>
<div><dt>${this.msg.country}</dt><dd>${identification?.countryCode ?? this.msg.notInformed}</dd></div>
</dl>
`;
}
private renderCreateScene(): TemplateResult {
const actionLoading = this.stateCreatePacienteStatus === 'loading';
return html`
<section class="pacientes-content pacientes-form" data-organism-id="organism.form.1" aria-labelledby="pacientes-form-title">
<div class="pacientes-section-heading">
<h2 id="pacientes-form-title">${this.msg.createTitle}</h2>
<p>${this.msg.createDescription}</p>
</div>
${this.stateCreatePacienteStatus === 'error' ? this.renderError(this.stateCreatePacienteError?.message ?? this.msg.required) : nothing}
<div class="pacientes-form-fields">
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationName ?? ''}
name="patient-name"
required
@input=${(event: Event) => this.handleNameInput(event)}>
<Label>${this.msg.createName}</Label>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationCountryCode ?? ''}
name="patient-country"
required
maxLength="2"
placeholder="BR"
@input=${(event: Event) => this.handleCountryInput(event)}>
<Label>${this.msg.createCountry}</Label>
<Helper>${this.msg.countryHelper}</Helper>
</groupentertext--ml-enter-text>
<label class="pacientes-native-label" for="patient-document-type">${this.msg.documentType}</label>
<select id="patient-document-type" class="pacientes-native-select" @change=${(event: Event) => this.handleDocumentTypeChange(event)}>
<option value="">${this.msg.notProvided}</option>
${this.documentTypes.map((item) => html`<option value=${item.value} ?selected=${this.stateCreatePacienteDetailsIdentificationDocType === item.value}>${item.label}</option>`)}
</select>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationDocId ?? ''}
name="patient-document-number"
placeholder=${this.msg.documentNumber}
@input=${(event: Event) => this.handleDocumentInput(event)}>
<Label>${this.msg.documentNumber}</Label>
</groupentertext--ml-enter-text>
</div>
<div class="pacientes-form-actions">
<grouptriggeraction--ml-button-standard
data-variant="primary"
.loading=${actionLoading}
.disabled=${actionLoading}
@action=${() => this.runCreatePaciente()}>
<Label>${this.msg.register}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${actionLoading ? html`<p class="pacientes-status" role="status" aria-live="polite">${this.msg.loading}</p>` : nothing}
${this.stateCreatePacienteStatus === 'success' ? html`<p class="pacientes-success" role="status">${this.msg.created}</p>` : nothing}
</section>
`;
}
render(): TemplateResult {
const activeScenario = this.scenary;
return html`
<main class="pacientes-page" aria-labelledby="pacientes-page-title">
<header class="pacientes-header">
<h1 id="pacientes-page-title">${this.msg.pageTitle}</h1>
<p>${this.msg.pageDescription}</p>
</header>
<molecules--ml-scenary-102020
mode="direct"
.value=${activeScenario}
@change=${(event: Event) => this.handleUiScenaryChange(event)}
aria-label=${this.msg.pageTitle}>
<Scene value="base" title=${this.msg.listTitle}>${this.renderSearchScene()}</Scene>
<Scene value="createPaciente" title=${this.msg.createTitle}>${this.renderCreateScene()}</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
