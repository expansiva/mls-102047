/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { customElement } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { PacientesShared } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';
import type { ListPacienteItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Pacientes',
pageDescription: 'Consulta e cadastro de pacientes da clínica.',
listTitle: 'Pacientes cadastrados',
listDescription: 'Localize um paciente pelo nome.',
newPatient: 'Novo paciente',
searchLabel: 'Buscar paciente',
searchPlaceholder: 'Buscar por nome',
searchHelper: 'Digite o nome para consultar os pacientes disponíveis.',
emptyResults: 'Nenhum paciente encontrado.',
querying: 'Consultando pacientes...',
identificationUnavailable: 'Identificação indisponível.',
identificationTitle: 'Dados de identificação',
identificationPrompt: 'Os dados de identificação aparecerão quando houver resultados.',
patientIdentificationLabel: 'Dados de identificação do paciente',
name: 'Nome',
document: 'Documento',
country: 'País',
notInformed: 'Não informado',
createTitle: 'Cadastrar paciente',
createDescription: 'Informe os dados de identificação permitidos.',
back: 'Voltar aos pacientes',
namePlaceholder: 'Nome completo',
required: 'Obrigatório.',
countryPlaceholder: 'BR',
countryHelper: 'Use o código de duas letras, por exemplo BR.',
documentType: 'Tipo de documento',
selectDocumentType: 'Selecione o tipo de documento',
documentNumber: 'Número do documento',
documentNumberPlaceholder: 'Número do documento',
optional: 'Opcional.',
createAction: 'Cadastrar paciente',
created: 'Paciente cadastrado. Ele já está disponível para consulta.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const PAGE_TAG = 'agenda-clinica--web--desktop--page11--pacientes-102047';
type DocType = 'CPF' | 'NationalId' | 'Passport' | 'Other';
@customElement('agenda-clinica--web--desktop--page11--pacientes-102047')
class PacientesPage extends PacientesShared {
private readonly documentTypes: ReadonlyArray<{ value: DocType; label: string }> = [
{ value: 'CPF', label: 'CPF' },
{ value: 'NationalId', label: 'Documento nacional' },
{ value: 'Passport', label: 'Passaporte' },
{ value: 'Other', label: 'Outro' },
];
private onSearch(event: CustomEvent<{ query: string }>): void {
const query = event.detail?.query ?? '';
this.setListPacienteDetailsIdentificationName(query.trim() === '' ? null : query);
void this.runListPaciente();
}
private onSearchChange(event: CustomEvent<{ value: string | null }>): void {
const value = event.detail?.value ?? null;
this.setListPacienteDetailsIdentificationName(value && value.trim() !== '' ? value : null);
void this.runListPaciente();
}
private onCreateName(event: CustomEvent<{ value: string }>): void {
this.setCreatePacienteDetailsIdentificationName(event.detail?.value ?? '');
}
private onCreateCountry(event: CustomEvent<{ value: string }>): void {
const value = (event.detail?.value ?? '').toUpperCase();
this.setCreatePacienteDetailsIdentificationCountryCode(value);
}
private onCreateDocId(event: CustomEvent<{ value: string }>): void {
this.setCreatePacienteDetailsIdentificationDocId(event.detail?.value ?? '');
}
private onCreateDocType(event: Event): void {
const custom = event as CustomEvent<{ value?: unknown }>;
const detailValue = custom.detail?.value;
const target = event.target as HTMLSelectElement | null;
const value = typeof detailValue === 'string' ? detailValue : target?.value ?? '';
const valid = this.documentTypes.some((item) => item.value === value);
this.setCreatePacienteDetailsIdentificationDocType(valid ? value as DocType : null);
}
private openCreate(): void {
this.enterCreatePacienteScenario();
}
private closeCreate(): void {
this.enterBaseScenario();
}
private renderIdentification(item: ListPacienteItem): TemplateResult {
const identification = item.details.identification;
if (!identification) {
return html`<p class="pacientes-muted">Identificação indisponível.</p>`;
}
return html`
<dl class="pacientes-identification">
<div><dt>Nome</dt><dd>${identification.name}</dd></div>
<div><dt>Documento</dt><dd>${identification.docType ?? 'Não informado'}${identification.docId ? html` — ${identification.docId}` : nothing}</dd></div>
<div><dt>País</dt><dd>${identification.countryCode}</dd></div>
</dl>
`;
}
private renderListContent(): TemplateResult {
const error = this.stateListPacienteError?.message ?? '';
const loading = this.stateListPacienteStatus === 'loading';
return html`
<section aria-labelledby="pacientes-list-title" class="pacientes-list-scenario">
<div class="pacientes-toolbar">
<div>
<h2 id="pacientes-list-title">Pacientes cadastrados</h2>
<p class="pacientes-muted">Localize um paciente pelo nome.</p>
</div>
<grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => this.openCreate()}>
<Label>Novo paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
<groupsearchcontent--ml-search-bar
.value=${this.stateListPacienteDetailsIdentificationName}
.loading=${loading}
name="nomePaciente"
placeholder="Buscar por nome"
@search=${(event: CustomEvent<{ query: string }>) => this.onSearch(event)}
@change=${(event: CustomEvent<{ value: string | null }>) => this.onSearchChange(event)}
@clear=${() => { this.setListPacienteDetailsIdentificationName(null); void this.runListPaciente(); }}>
<Label>Buscar paciente</Label>
<Helper>Digite o nome para consultar os pacientes disponíveis.</Helper>
<Empty>Nenhum paciente encontrado.</Empty>
</groupsearchcontent--ml-search-bar>
${error ? html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Message>${error}</Message>
</groupnotifyuser--ml-contextual-feedback>
` : nothing}
<groupviewdata--ml-vertical-record-list .loading=${loading} .hoverable=${true}>
<Columns>
<Column field="name" header="Nome"></Column>
<Column field="document" header="Documento"></Column>
<Column field="country" header="País"></Column>
</Columns>
<Rows>
${this.stateListPacienteResult.map((item: ListPacienteItem) => {
const identification = item.details.identification;
return html`
<Row>
<Cell>${identification?.name ?? 'Identificação indisponível'}</Cell>
<Cell>${identification?.docType ?? 'Não informado'}${identification?.docId ? html` — ${identification.docId}` : nothing}</Cell>
<Cell>${identification?.countryCode ?? 'Não informado'}</Cell>
</Row>
`;
})}
</Rows>
<Loading><span aria-live="polite">Consultando pacientes...</span></Loading>
<Empty><span>Nenhum paciente encontrado.</span></Empty>
</groupviewdata--ml-vertical-record-list>
<section aria-labelledby="pacientes-details-title" class="pacientes-details">
<h2 id="pacientes-details-title">Dados de identificação</h2>
${this.stateListPacienteResult.length === 0
? html`<p class="pacientes-muted">Os dados de identificação aparecerão quando houver resultados.</p>`
: this.stateListPacienteResult.map((item: ListPacienteItem) => html`
<article class="pacientes-detail-card" aria-label="Dados de identificação do paciente">
${this.renderIdentification(item)}
</article>
`)}
</section>
</section>
`;
}
private renderCreateContent(): TemplateResult {
const error = this.stateCreatePacienteError?.message ?? '';
const busy = this.stateCreatePacienteStatus === 'loading';
const success = this.stateCreatePacienteStatus === 'success';
return html`
<section aria-labelledby="pacientes-create-title" class="pacientes-form-scenario">
<div class="pacientes-form-header">
<button type="button" class="pacientes-back" @click=${() => this.closeCreate()}>Voltar aos pacientes</button>
<h2 id="pacientes-create-title">Cadastrar paciente</h2>
<p class="pacientes-muted">Informe os dados de identificação permitidos.</p>
</div>
${success ? html`
<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true}>
<Message>Paciente cadastrado. Ele já está disponível para consulta.</Message>
</groupnotifyuser--ml-contextual-feedback>
<p class="pacientes-form-status" role="status" aria-live="polite">Paciente cadastrado. Ele já está disponível para consulta.</p>
` : nothing}
${error ? html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true}>
<Message>${error}</Message>
</groupnotifyuser--ml-contextual-feedback>
<p id="pacientes-create-feedback" class="pacientes-form-error" role="alert">${error}</p>
` : nothing}
${busy ? html`<p class="pacientes-form-status" role="status" aria-live="polite">Cadastrando paciente...</p>` : nothing}
<div class="pacientes-form" aria-describedby=${error ? 'pacientes-create-error' : nothing}>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationName ?? ''}
.required=${true}
.disabled=${busy}
name="nome"
placeholder="Nome completo"
@input=${(event: CustomEvent<{ value: string }>) => this.onCreateName(event)}>
<Label>Nome</Label>
<Helper>Obrigatório.</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationCountryCode ?? ''}
.required=${true}
.disabled=${busy}
name="pais"
placeholder="BR"
@input=${(event: CustomEvent<{ value: string }>) => this.onCreateCountry(event)}>
<Label>País</Label>
<Helper>Use o código de duas letras, por exemplo BR.</Helper>
</groupentertext--ml-enter-text>
<groupselectone--ml-select
.value=${this.stateCreatePacienteDetailsIdentificationDocType}
.disabled=${busy}
name="tipoDocumento"
placeholder="Selecione o tipo de documento"
@change=${(event: CustomEvent<{ value: string | null }>) => {
const value = event.detail?.value ?? '';
const valid = this.documentTypes.some((item) => item.value === value);
this.setCreatePacienteDetailsIdentificationDocType(valid ? value as DocType : null);
}}>
<Label>Tipo de documento</Label>
<Trigger>Selecione o tipo de documento</Trigger>
${this.documentTypes.map((item) => html`<Item value=${item.value}>${item.label}</Item>`)}
</groupselectone--ml-select>
<groupentertext--ml-enter-text
.value=${this.stateCreatePacienteDetailsIdentificationDocId ?? ''}
.disabled=${busy}
name="numeroDocumento"
placeholder="Número do documento"
@input=${(event: CustomEvent<{ value: string }>) => this.onCreateDocId(event)}>
<Label>Número do documento</Label>
<Helper>Opcional.</Helper>
</groupentertext--ml-enter-text>
${error ? html`<p id="pacientes-create-error" class="pacientes-form-error" role="alert">${error}</p>` : nothing}
<grouptriggeraction--ml-button-standard data-variant="primary" .loading=${busy} .disabled=${busy} @action=${() => { void this.runCreatePaciente(); }}>
<Label>Cadastrar paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>
`;
}
render(): TemplateResult {
return html`
<main class="pacientes-page" aria-labelledby="pacientes-page-title">
<header class="pacientes-page-header">
<h1 id="pacientes-page-title">Pacientes</h1>
<p>Consulta e cadastro de pacientes da clínica.</p>
</header>
<molecules--ml-scenary-102020 .value=${this.scenary} mode="scenary" @change=${this.handleUiScenaryChange}>
<Scene value="base" title="Consulta de pacientes">${this.renderListContent()}</Scene>
<Scene value="createPaciente" title="Cadastro de paciente">${this.renderCreateContent()}</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
export { PacientesPage };