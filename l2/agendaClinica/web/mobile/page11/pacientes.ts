/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/pacientes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing, type TemplateResult } from 'lit';
import { PacientesShared } from '/_102047_/l2/agendaClinica/web/shared/pacientes.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import { customElement } from 'lit/decorators.js';
import type { ListPacienteItem } from '/_102047_/l2/agendaClinica/web/contracts/pacientes.defs.js';
type DocType = 'CPF' | 'NationalId' | 'Passport' | 'Other';
/// **collab_i18n_start**
const pageMessage_pt = {
createSuccess: 'Paciente cadastrado. A consulta foi atualizada.',
processing: 'Processando cadastro…',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
@customElement('agenda-clinica--web--mobile--page11--pacientes-102047')
export class Pacientes extends PacientesShared {
private readonly docTypes: ReadonlyArray<{ value: DocType; label: string }> = [
{ value: 'CPF', label: 'CPF' },
{ value: 'NationalId', label: 'Documento nacional' },
{ value: 'Passport', label: 'Passaporte' },
{ value: 'Other', label: 'Outro' },
];
private msg(key: keyof PageMessageType): string {
const language = (document.documentElement.lang || 'pt').toLowerCase();
const locale = language.startsWith('pt') ? 'pt' : 'pt';
return pageMessages[locale][key];
}
private onSearch(event: Event): void {
const detail = (event as CustomEvent<{ query?: unknown }>).detail;
const query = detail && typeof detail.query === 'string' ? detail.query : '';
this.setListPacienteDetailsIdentificationName(query || null);
void this.runListPaciente();
}
private onSearchClear(): void {
this.setListPacienteDetailsIdentificationName(null);
void this.runListPaciente();
}
private onRowClick(event: Event): void {
const detail = (event as CustomEvent<{ index?: unknown }>).detail;
const index = detail && typeof detail.index === 'number' ? detail.index : -1;
const item = index >= 0 ? this.stateListPacienteResult[index] : undefined;
if (item) {
this.setListPacienteId(item.id);
this.requestUpdate();
}
}
private onNameInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setCreatePacienteDetailsIdentificationName(value);
}
private onCountryInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setCreatePacienteDetailsIdentificationCountryCode(value.toUpperCase().slice(0, 2));
}
private onDocIdInput(event: Event): void {
const detail = (event as CustomEvent<{ value?: unknown }>).detail;
const value = detail && typeof detail.value === 'string' ? detail.value : '';
this.setCreatePacienteDetailsIdentificationDocId(value || null);
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
private selectedPaciente(): ListPacienteItem | undefined {
const selectedId = this.stateListPacienteId;
if (selectedId === null) return undefined;
return this.stateListPacienteResult.find((item: ListPacienteItem) => item.id === selectedId);
}
private renderPatientCard(item: ListPacienteItem, index: number): TemplateResult {
const identification = item.details.identification;
const selected = item.id === this.stateListPacienteId;
return html`
<Row ?selected=${selected} @click=${(_event: Event) => this.onRowClick(new CustomEvent('row-click', { detail: { index }, bubbles: true, composed: true }))}>
<Cell>
<div class="patient-row" tabindex="0" role="button" aria-label=${`Abrir paciente ${identification?.name ?? 'sem nome'}`}>
<strong>${identification?.name ?? 'Nome indisponível'}</strong>
<span>${identification?.docType ?? 'Documento não informado'}</span>
<span>${identification?.countryCode ?? 'País não informado'}</span>
</div>
</Cell>
</Row>
`;
}
private renderList(): TemplateResult {
const loading = this.stateListPacienteStatus === 'loading' || this.pageStatus === 'loading';
const error = this.stateListPacienteError?.message;
const empty = this.pageStatus === 'empty';
return html`
<section aria-labelledby="pacientes-list-title">
<div class="page-heading">
<h1 id="pacientes-list-title">Pacientes</h1>
<p>Consulte pacientes cadastrados e inicie um novo cadastro.</p>
</div>
<div class="list-toolbar">
<groupsearchcontent--ml-search-bar
name="patient-search"
placeholder="Buscar paciente pelo nome"
.value=${this.stateListPacienteDetailsIdentificationName}
.loading=${loading}
@search=${(event: Event) => this.onSearch(event)}
@clear=${() => this.onSearchClear()}>
<Label>Buscar paciente</Label>
<Helper>Digite o nome para localizar um paciente.</Helper>
</groupsearchcontent--ml-search-bar>
<grouptriggeraction--ml-button-standard @action=${() => this.enterCreatePacienteScenario()}>
<Label>Novo paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible=${true}><Message>${error}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}
<groupviewdata--ml-vertical-record-list .loading=${loading} @row-click=${(event: Event) => this.onRowClick(event)}>
<Columns><Column field="patient" header="Paciente"></Column></Columns>
<Rows>${this.stateListPacienteResult.map((item: ListPacienteItem, index: number) => this.renderPatientCard(item, index))}</Rows>
${empty && !loading ? html`<Empty><p>Nenhum paciente encontrado.</p></Empty>` : nothing}
${loading ? html`<Loading><p aria-live="polite">Carregando pacientes…</p></Loading>` : nothing}
</groupviewdata--ml-vertical-record-list>
</section>
`;
}
private renderDetail(): TemplateResult {
const patient = this.selectedPaciente();
if (!patient) {
return html`<aside aria-labelledby="patient-detail-title"><h2 id="patient-detail-title">Detalhes do paciente</h2><p>Selecione um paciente para consultar sua identificação.</p></aside>`;
}
const identification = patient.details.identification;
return html`
<aside aria-labelledby="patient-detail-title">
<h2 id="patient-detail-title">Identificação do paciente</h2>
<dl>
<dt>Nome</dt><dd>${identification?.name ?? 'Nome indisponível'}</dd>
<dt>Documento</dt><dd>${identification?.docType && identification.docId ? `${identification.docType}: ${identification.docId}` : 'Não informado'}</dd>
<dt>País</dt><dd>${identification?.countryCode ?? 'Não informado'}</dd>
</dl>
</aside>
`;
}
private renderForm(): TemplateResult {
const actionLoading = this.stateCreatePacienteStatus === 'loading';
const actionError = this.stateCreatePacienteError?.message;
const actionSuccess = this.stateCreatePacienteStatus === 'success';
return html`
<section aria-labelledby="create-patient-title">
<div class="form-heading">
<h1 id="create-patient-title">Novo paciente</h1>
<p>Informe somente os dados de identificação necessários para o cadastro.</p>
</div>
${actionError ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible=${true}><Message>${actionError}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}
${actionSuccess ? html`<groupnotifyuser--ml-contextual-feedback type="success" visible=${true}><Message>${this.msg('createSuccess')}</Message></groupnotifyuser--ml-contextual-feedback>` : nothing}
${actionError ? html`<p role="alert" aria-live="assertive">${actionError}</p>` : actionSuccess ? html`<p role="status" aria-live="polite">${this.msg('createSuccess')}</p>` : nothing}
<div class="patient-form">
<groupentertext--ml-enter-text
name="patient-name"
.value=${this.stateCreatePacienteDetailsIdentificationName ?? ''}
required
@input=${(event: Event) => this.onNameInput(event)}>
<Label>Nome</Label><Helper>Campo obrigatório.</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
name="patient-country"
.value=${this.stateCreatePacienteDetailsIdentificationCountryCode ?? ''}
maxlength="2"
required
autocomplete="country"
@input=${(event: Event) => this.onCountryInput(event)}>
<Label>País</Label><Helper>Use o código de país com duas letras.</Helper>
</groupentertext--ml-enter-text>
<groupselectone--ml-select
name="patient-document-type"
.value=${this.stateCreatePacienteDetailsIdentificationDocType}
@change=${(event: Event) => this.onDocTypeChange(event)}>
<Label>Tipo de documento</Label><Trigger>Selecione, se aplicável</Trigger>
${this.docTypes.map((option) => html`<Item value=${option.value}>${option.label}</Item>`)}
</groupselectone--ml-select>
<groupentertext--ml-enter-text
name="patient-document-number"
.value=${this.stateCreatePacienteDetailsIdentificationDocId ?? ''}
@input=${(event: Event) => this.onDocIdInput(event)}>
<Label>Número do documento</Label><Helper>Campo opcional.</Helper>
</groupentertext--ml-enter-text>
<div class="form-actions">
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.enterBaseScenario()}>
<Label>Voltar para pacientes</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard .loading=${actionLoading} ?disabled=${actionLoading} @action=${() => this.runCreatePaciente()}>
<Label>Cadastrar paciente</Label>
</grouptriggeraction--ml-button-standard>
</div>
${actionLoading ? html`<p aria-live="polite">${this.msg('processing')}</p>` : nothing}
</div>
</section>
`;
}
render(): TemplateResult {
const selectedScene = this.scenary;
return html`
<main class="pacientes-page" aria-busy=${this.stateListPacienteStatus === 'loading' || this.stateCreatePacienteStatus === 'loading'}>
<molecules--ml-scenary-102020 .value=${selectedScene} mode="direct" backLabel="Voltar" @change=${(event: Event) => this.handleUiScenaryChange(event)}>
<Scene value="base" title="Pacientes">${this.renderList()}${this.renderDetail()}</Scene>
<Scene value="createPaciente" title="Novo paciente">${this.renderForm()}</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
declare global {
interface HTMLElementTagNameMap {
'agenda-clinica-web-mobile-page11-pacientes': Pacientes;
}
}
