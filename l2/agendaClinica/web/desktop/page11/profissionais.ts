/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/profissionais.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaClinicaProfissionaisShared } from '/_102047_/l2/agendaClinica/web/shared/profissionais.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-cpf-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-group.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Profissionais',
pageDescription: 'Localize profissionais disponíveis e mantenha o cadastro usado no agendamento.',
directoryTitle: 'Profissionais da clínica',
searchLabel: 'Buscar por nome',
searchPlaceholder: 'Digite o nome do profissional',
newProfessional: 'Cadastrar profissional',
loading: 'Carregando profissionais…',
empty: 'Nenhum profissional cadastrado.',
loadError: 'Não foi possível carregar os profissionais.',
retry: 'Tentar novamente',
name: 'Nome',
status: 'Situação',
professionalType: 'Tipo de profissional',
medical: 'Médico',
therapist: 'Terapeuta',
active: 'Ativo',
inactive: 'Inativo',
merged: 'Unificado',
blocked: 'Bloqueado',
recordTitle: 'Cadastro do profissional',
newRecordTitle: 'Novo profissional',
detailsTitle: 'Dados cadastrados',
documentType: 'Tipo de documento',
documentNumber: 'Número do documento',
country: 'País',
cpf: 'CPF',
passport: 'Passaporte',
nationalId: 'Documento nacional',
other: 'Outro',
chooseDocument: 'Selecione o tipo de documento',
chooseProfessionalType: 'Selecione o tipo de profissional',
save: 'Salvar alterações',
create: 'Cadastrar profissional',
cancel: 'Voltar à lista',
requiredName: 'Informe o nome.',
requiredType: 'Informe o tipo de profissional.',
commandError: 'Não foi possível salvar o cadastro. Revise os dados e tente novamente.',
creating: 'Cadastrando…',
saving: 'Salvando…',
back: 'Voltar',
selected: 'Selecionado',
noDocument: 'Documento não informado',
statusLabel: 'Situação no cadastro mestre'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const professionalTypeLabel = (value: 'medical' | 'therapist', msg: PageMessageType) => value === 'medical' ? msg.medical : msg.therapist;
const statusLabel = (value: 'Active' | 'Inactive' | 'Merged' | 'Blocked', msg: PageMessageType) => ({ Active: msg.active, Inactive: msg.inactive, Merged: msg.merged, Blocked: msg.blocked }[value]);
const documentTypeLabel = (value: 'CPF' | 'Passport' | 'NationalId' | 'Other' | undefined, msg: PageMessageType) => ({ CPF: msg.cpf, Passport: msg.passport, NationalId: msg.nationalId, Other: msg.other }[value || 'Other'] || '');
@customElement('agenda-clinica--web--desktop--page11--profissionais-102047')
export class AgendaClinicaDesktopPage11ProfissionaisPage extends AgendaClinicaProfissionaisShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const isDirectoryLoading = this.pageStatus === 'loading' || this.loadAvailableProfessionalsStatus === 'loading';
const selected = this.professional;
const isCreating = !selected;
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-8" aria-labelledby="page-title">
<header class="mb-7">
<h1 id="page-title" class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageDescription}</p>
</header>
<molecules--ml-scenary-102020
class="block"
mode="scenary"
.value=${this.scenary || 'directory'}
backLabel=${this.msg.back}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="directory" title=${this.msg.directoryTitle}>
<section class="grid grid-cols-[minmax(0,1fr)_minmax(25rem,34rem)] gap-6 items-start">
<div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 shadow-sm" data-organism-id="professionalList">
<div class="mb-5 flex items-end justify-between gap-5">
<div class="min-w-0 flex-1">
<groupentertext--ml-enter-text
class="block"
name="professional-search"
placeholder=${this.msg.searchPlaceholder}
@change=${(e: CustomEvent<{ value: string }>) => this.searchAvailableProfessionals(e.detail.value)}>
<Label>${this.msg.searchLabel}</Label>
</groupentertext--ml-enter-text>
</div>
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => { this.setSelectedProfissional(null); this.setScenario('record'); }}>
<Label>${this.msg.newProfessional}</Label>
</grouptriggeraction--ml-button-standard>
</div>
<groupviewtable--ml-data-table
class="block"
.loading=${isDirectoryLoading}
value=${this.selectedProfissional ? String(this.professionals.items.findIndex((item) => item.id === this.selectedProfissional)) : ''}
@rowClick=${(e: CustomEvent<{ index: number }>) => { const item = this.professionals.items[e.detail.index]; if (item) { this.setSelectedProfissional(item.id); this.setScenario('record'); } }}>
<TableCaption>${this.msg.directoryTitle}</TableCaption>
<TableHeader><TableRow>
<TableHead key="name">${this.msg.name}</TableHead>
<TableHead key="professionalType">${this.msg.professionalType}</TableHead>
<TableHead key="status">${this.msg.status}</TableHead>
</TableRow></TableHeader>
<TableBody>${this.professionals.items.map((item) => html`
<TableRow>
<TableCell>${item.details.identification.details.identification.name}</TableCell>
<TableCell>${professionalTypeLabel(item.details.agendaClinica.details.agendaClinica.professionalType, this.msg)}</TableCell>
<TableCell>${statusLabel(item.details.identification.details.identification.status, this.msg)}</TableCell>
</TableRow>`)}</TableBody>
<Loading><div class="py-12 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.loading}</div></Loading>
<Empty><div class="py-12 text-center text-sm text-[var(--text-muted,currentColor)]">${this.professionals.items.length ? '' : this.msg.empty}</div></Empty>
</groupviewtable--ml-data-table>
${this.loadAvailableProfessionalsError ? html`<div class="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[var(--status-error-bg,transparent)] bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]" aria-live="polite"><span>${this.msg.loadError}</span><grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.loadAvailableProfessionals()}><Label>${this.msg.retry}</Label></grouptriggeraction--ml-button-standard></div>` : ''}
</div>
<div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" data-organism-id="professionalRecord">
${selected ? this.renderProfessionalDetail(selected) : html`<div data-organism-id="professionalDetail" class="mb-6"><h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.newRecordTitle}</h2></div>`}
${this.renderProfessionalForm(isCreating)}
</div>
</section>
</Scene>
<Scene value="record" title=${selected ? selected.details.identification.details.identification.name : this.msg.newRecordTitle} nav="back" backTo="directory">
<section class="max-w-2xl rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" data-organism-id="professionalRecord">
${selected ? this.renderProfessionalDetail(selected) : ''}
${this.renderProfessionalForm(isCreating)}
</section>
</Scene>
</molecules--ml-scenary-102020>
</main>`;
}
private renderProfessionalDetail(record: NonNullable<AgendaClinicaProfissionaisShared['professional']>) {
const identification = record.details.identification.details.identification;
const agenda = record.details.agendaClinica.details.agendaClinica;
return html`<div data-organism-id="professionalDetail" class="mb-6">
<groupviewcard--ml-profile-card class="block" ?selected=${record.id === this.selectedProfissional}>
<CardHeader><CardTitle>${identification.name}</CardTitle><CardDescription>${professionalTypeLabel(agenda.professionalType, this.msg)}</CardDescription></CardHeader>
<CardContent><dl class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.statusLabel}</dt><dd class="font-medium">${statusLabel(identification.status, this.msg)}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.documentType}</dt><dd>${documentTypeLabel(identification.docType, this.msg) || this.msg.noDocument}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.documentNumber}</dt><dd>${identification.docId || this.msg.noDocument}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.country}</dt><dd>${identification.countryCode}</dd></div>
</dl></CardContent>
</groupviewcard--ml-profile-card>
</div>`;
}
private renderProfessionalForm(isCreating: boolean) {
const draft = isCreating ? this.createProfessionalDraft : this.updateProfessionalDraft;
const identification = draft.details.identification;
const agenda = draft.details.agendaClinica;
const busy = isCreating ? this.createProfessionalStatus === 'loading' : this.updateProfessionalStatus === 'loading';
const error = isCreating ? this.createProfessionalError : this.updateProfessionalError;
const setDraft = (name: string, value: string) => {
if (isCreating) {
const next = { ...this.createProfessionalDraft, details: { ...this.createProfessionalDraft.details, identification: { ...this.createProfessionalDraft.details.identification, [name]: value || null } } };
this.setCreateProfessional(next);
} else {
const next = { ...this.updateProfessionalDraft, details: { ...this.updateProfessionalDraft.details, identification: { ...this.updateProfessionalDraft.details.identification, [name]: value || null } } };
this.setUpdateProfessional(next);
}
};
return html`<form data-organism-id="professionalForm" class="space-y-5" @submit=${(e: SubmitEvent) => { e.preventDefault(); if (isCreating) this.createProfessional(); else this.updateProfessional(); }}>
<div class="grid grid-cols-2 gap-4">
<groupentertext--ml-enter-text class="block" .value=${identification.name || ''} required @input=${(e: CustomEvent<{ value: string }>) => setDraft('name', e.detail.value)}>
<Label>${this.msg.name}</Label>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text class="block" .value=${identification.countryCode || ''} required @input=${(e: CustomEvent<{ value: string }>) => setDraft('countryCode', e.detail.value)}>
<Label>${this.msg.country}</Label>
</groupentertext--ml-enter-text>
</div>
<label class="block text-sm font-medium text-[var(--text-default,currentColor)]">${this.msg.documentType}
<select class="mt-2 min-h-11 w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" .value=${identification.docType || ''} @change=${(e: Event) => setDraft('docType', (e.target as HTMLSelectElement).value)}>
<option value="">${this.msg.chooseDocument}</option><option value="CPF">${this.msg.cpf}</option><option value="Passport">${this.msg.passport}</option><option value="NationalId">${this.msg.nationalId}</option><option value="Other">${this.msg.other}</option>
</select>
</label>
<groupentertext--ml-cpf-input class="block" .value=${identification.docId || ''} ?disabled=${identification.docType !== 'CPF'} @input=${(e: CustomEvent<{ value: string }>) => setDraft('docId', e.detail.value)}>
<Label>${this.msg.documentNumber}</Label>
</groupentertext--ml-cpf-input>
<label class="block text-sm font-medium text-[var(--text-default,currentColor)]">${this.msg.professionalType}
<select class="mt-2 min-h-11 w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" .value=${agenda.professionalType || ''} @change=${(e: Event) => { const value = (e.target as HTMLSelectElement).value as 'medical' | 'therapist' | ''; if (isCreating) { const next = { ...this.createProfessionalDraft, details: { ...this.createProfessionalDraft.details, agendaClinica: { professionalType: value || null } } }; this.setCreateProfessional(next); } else { const next = { ...this.updateProfessionalDraft, details: { ...this.updateProfessionalDraft.details, agendaClinica: { professionalType: value || null } } }; this.setUpdateProfessional(next); } }}>
<option value="">${this.msg.chooseProfessionalType}</option><option value="medical">${this.msg.medical}</option><option value="therapist">${this.msg.therapist}</option>
</select>
</label>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${Boolean(error)} dismissible="false"><Title>${this.msg.commandError}</Title><Message>${error?.message || this.msg.commandError}</Message></groupnotifyuser--ml-contextual-feedback>
<div data-organism-id="professionalActions" class="flex items-center justify-end gap-3 border-t border-[var(--border-subtle,currentColor)] pt-5">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" ?disabled=${busy} @action=${() => this.setScenario('directory')}><Label>${this.msg.cancel}</Label></grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" .loading=${busy} ?disabled=${busy} @action=${() => isCreating ? this.createProfessional() : this.updateProfessional()}><Label>${isCreating ? this.msg.create : this.msg.save}</Label></grouptriggeraction--ml-button-standard>
</div>
</form>`;
}
}
