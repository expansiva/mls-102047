/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PacientesShared } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import './pacientes.less';
import type { ListPacienteItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
type DocType = 'CPF' | 'NationalId' | 'Passport' | 'Other';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Pacientes',
createSuccess: 'Paciente cadastrado e disponível para consulta.',
createError: 'Não foi possível cadastrar o paciente.',
listError: 'Não foi possível localizar os pacientes.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const DOC_TYPES: ReadonlyArray<{ value: DocType; label: string }> = [
{ value: 'CPF', label: 'CPF' },
{ value: 'NationalId', label: 'Documento nacional' },
{ value: 'Passport', label: 'Passaporte' },
{ value: 'Other', label: 'Outro' },
];
@customElement('agenda-clinica--web--desktop--page11--pacientes-102047')
export class PacientesPage extends PacientesShared {
private readonly onSearchInput = (event: Event): void => {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setListPacienteDetailsIdentificationName(value || null);
};
private readonly onNameInput = (event: Event): void => {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setCreatePacienteDetailsIdentificationName(value || null);
};
private readonly onCountryInput = (event: Event): void => {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setCreatePacienteDetailsIdentificationCountryCode(value ? value.toUpperCase() : null);
};
private readonly onDocumentInput = (event: Event): void => {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setCreatePacienteDetailsIdentificationDocId(value || null);
};
private readonly onDocumentTypeChange = (event: Event): void => {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail?.value;
if (value === null || value === undefined || value === '') {
this.setCreatePacienteDetailsIdentificationDocType(null);
return;
}
if (value === 'CPF' || value === 'NationalId' || value === 'Passport' || value === 'Other') {
this.setCreatePacienteDetailsIdentificationDocType(value);
}
};
private readonly search = (): void => {
void this.runListPaciente();
};
private readonly create = (): void => {
void this.runCreatePaciente();
};
private readonly openCreate = (): void => {
this.enterCreatePacienteScenario();
};
private readonly closeCreate = (): void => {
this.enterBaseScenario();
};
private readonly renderList = (): TemplateResult => {
const rows = this.stateListPacienteResult;
const loading = this.stateListPacienteStatus === 'loading' || this.pageStatus === 'loading';
const error = this.stateListPacienteError?.message ?? '';
return html`
<section class="pacientes-list-organism" data-organism-id="organism.list.1" aria-labelledby="pacientes-list-title">
<div class="pacientes-section-header">
<div>
<h2 id="pacientes-list-title">Pacientes cadastrados</h2>
<p class="pacientes-muted">Consulte pacientes pelo nome antes de iniciar um cadastro.</p>
</div>
<grouptriggeraction--ml-button-standard @action=${this.openCreate}>
<Label>Novo paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
<div class="pacientes-search-row">
<groupentertext--ml-enter-text
.value=${this.stateListPacienteDetailsIdentificationName ?? ''}
name="patient-search"
inputType="search"
autocomplete="off"
placeholder="Digite o nome do paciente"
@input=${this.onSearchInput}>
<Label>Buscar paciente</Label>
</groupentertext--ml-enter-text>
<grouptriggeraction--ml-button-standard
data-variant="secondary"
.disabled=${loading}
.loading=${loading}
@action=${this.search}>
<Label>Pesquisar</Label>
</grouptriggeraction--ml-button-standard>
</div>
${error
? html`<groupnotifyuser--ml-contextual-feedback type="error" visible>
<Message>${error}</Message>
</groupnotifyuser--ml-contextual-feedback>`
: nothing}
<groupviewdata--ml-vertical-record-list .loading=${loading} hoverable>
<Columns>
<Column field="name" header="Nome"></Column>
<Column field="document" header="Documento"></Column>
<Column field="country" header="País"></Column>
</Columns>
<Rows>
${rows.map((patient: ListPacienteItem) => {
const identification = patient.details.identification;
const name = identification?.name ?? 'Nome indisponível';
const document = identification?.docType && identification.docId
? `${identification.docType}: ${identification.docId}`
: 'Documento não informado';
const country = identification?.countryCode ?? 'País indisponível';
return html`<Row data-patient-id=${patient.id} @click=${(): void => this.setListPacienteId(patient.id)}>
<Cell>${name}</Cell>
<Cell>${document}</Cell>
<Cell>${country}</Cell>
</Row>`;
})}
</Rows>
${this.pageStatus === 'empty' && !loading
? html`<Empty><p>Nenhum paciente encontrado.</p></Empty>`
: nothing}
${loading ? html`<Loading><p>Carregando pacientes…</p></Loading>` : nothing}
</groupviewdata--ml-vertical-record-list>
</section>
`;
};
private readonly renderDetail = (): TemplateResult => {
const selected = this.stateListPacienteResult.find(
(patient: ListPacienteItem) => patient.id === this.stateListPacienteId,
);
const identification = selected?.details.identification;
return html`
<aside class="pacientes-detail-organism" data-organism-id="organism.detail.1" aria-labelledby="pacientes-detail-title">
<h2 id="pacientes-detail-title">Identificação do paciente</h2>
${this.pageStatus === 'error'
? html`<p role="status">Os dados do paciente estão indisponíveis porque a consulta não pôde ser concluída.</p>`
: identification
? html`<dl>
<div><dt>Nome</dt><dd>${identification.name}</dd></div>
<div><dt>Documento</dt><dd>${identification.docType && identification.docId ? `${identification.docType}: ${identification.docId}` : 'Não informado'}</dd></div>
<div><dt>País</dt><dd>${identification.countryCode}</dd></div>
</dl>`
: html`<p>Selecione um paciente nos resultados para consultar sua identificação.</p>`}
</aside>
`;
};
private readonly renderForm = (): TemplateResult => {
const busy = this.stateCreatePacienteStatus === 'loading';
const error = this.stateCreatePacienteError?.message ?? '';
const country = this.stateCreatePacienteDetailsIdentificationCountryCode ?? '';
const name = this.stateCreatePacienteDetailsIdentificationName ?? '';
const docId = this.stateCreatePacienteDetailsIdentificationDocId ?? '';
return html`
<section class="pacientes-form-organism" data-organism-id="organism.form.1" aria-labelledby="pacientes-form-title">
<div class="pacientes-section-header">
<div>
<h2 id="pacientes-form-title">Cadastrar paciente</h2>
<p class="pacientes-muted">Informe apenas os dados de identificação permitidos.</p>
</div>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${this.closeCreate}>
<Label>Voltar aos pacientes</Label>
</grouptriggeraction--ml-button-standard>
</div>
<div class="pacientes-form-grid">
<groupentertext--ml-enter-text .value=${name} name="patient-name" required @input=${this.onNameInput}>
<Label>Nome</Label><Helper>Campo obrigatório.</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text .value=${country} name="patient-country" required maxlength="2" @input=${this.onCountryInput}>
<Label>País</Label><Helper>Use o código de duas letras, como BR.</Helper>
</groupentertext--ml-enter-text>
<groupselectone--ml-select
.value=${this.stateCreatePacienteDetailsIdentificationDocType}
name="patient-document-type"
placeholder="Não informado"
@change=${this.onDocumentTypeChange}>
<Label>Tipo de documento</Label>
${DOC_TYPES.map((option: { value: DocType; label: string }) => html`<Item value=${option.value}>${option.label}</Item>`)}
</groupselectone--ml-select>
<groupentertext--ml-enter-text .value=${docId} name="patient-document-id" @input=${this.onDocumentInput}>
<Label>Número do documento</Label>
</groupentertext--ml-enter-text>
</div>
${error
? html`<groupnotifyuser--ml-contextual-feedback type="error" visible>
<Message>${error}</Message>
</groupnotifyuser--ml-contextual-feedback>
<p class="pacientes-mutation-feedback" role="alert" aria-live="assertive">${error}</p>`
: nothing}
${this.stateCreatePacienteStatus === 'success'
? html`<groupnotifyuser--ml-contextual-feedback type="success" visible>
<Message>Paciente cadastrado e disponível para consulta.</Message>
</groupnotifyuser--ml-contextual-feedback>
<p class="pacientes-mutation-feedback" role="status" aria-live="polite">Paciente cadastrado e disponível para consulta.</p>`
: nothing}
<div class="pacientes-form-actions" aria-live="polite">
<grouptriggeraction--ml-button-standard .disabled=${busy} .loading=${busy} @action=${this.create}>
<Label>Cadastrar paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
</section>
`;
};
protected render(): TemplateResult {
const messages = pageMessages[document.documentElement.lang?.toLowerCase().split('-')[0] ?? 'pt'] ?? pageMessage_pt;
return html`
<main class="pacientes-page" aria-labelledby="pacientes-page-title">
<header class="pacientes-page-header"><h1 id="pacientes-page-title">${messages.pageTitle}</h1></header>
<molecules--ml-scenary-102020 .value=${this.scenary} mode="direct" @change=${this.handleUiScenaryChange}>
<Scene value="base" title="Pacientes">
<div class="pacientes-base-content">
${this.renderList()}
${this.renderDetail()}
</div>
</Scene>
<Scene value="createPaciente" title="Cadastrar paciente">
${this.renderForm()}
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
