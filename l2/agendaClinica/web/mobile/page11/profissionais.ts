/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/profissionais.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaClinicaProfissionaisShared } from '/_102047_/l2/agendaClinica/web/shared/profissionais.js';
import '/_102040_/l2/molecules/groupentertext/ml-cpf-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Profissionais', directoryTitle: 'Profissionais da clínica', newProfessional: 'Cadastrar profissional',
chooseProfessional: 'Escolha um profissional para conferir o cadastro.', loading: 'Carregando profissionais…',
empty: 'Nenhum profissional disponível.', loadError: 'Não foi possível carregar os profissionais.', retry: 'Tentar novamente',
name: 'Nome', documentType: 'Tipo de documento', documentNumber: 'Número do documento', country: 'País',
professionalType: 'Tipo de profissional', status: 'Situação', medical: 'Médico', therapist: 'Terapeuta',
active: 'Ativo', inactive: 'Inativo', merged: 'Unificado', blocked: 'Bloqueado',
cpf: 'CPF', passport: 'Passaporte', nationalId: 'Identidade nacional', other: 'Outro',
createTitle: 'Novo profissional', editTitle: 'Cadastro do profissional', saveCreate: 'Cadastrar profissional',
saveUpdate: 'Salvar alterações', back: 'Voltar para profissionais', requiredName: 'Informe o nome.',
requiredType: 'Escolha o tipo de profissional.', requiredDocumentType: 'Escolha o tipo de documento.',
feedbackErrorTitle: 'Não foi possível salvar', created: 'Profissional cadastrado.', updated: 'Cadastro atualizado.',
recordDetails: 'Dados do cadastro', version: 'Versão do cadastro', noDocument: 'Documento não informado',
selectDocumentType: 'Selecione o tipo', selectProfessionalType: 'Selecione o tipo', countryPlaceholder: 'BR',
maintenance: 'A manutenção deste profissional é concluída pelo formulário acima.', saving: 'Salvando…'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const statusKey = (value: string): keyof PageMessageType => ({ Active: 'active', Inactive: 'inactive', Merged: 'merged', Blocked: 'blocked' }[value] || 'inactive') as keyof PageMessageType;
const typeKey = (value: string): keyof PageMessageType => value === 'medical' ? 'medical' : 'therapist';
const docKey = (value: string): keyof PageMessageType => ({ CPF: 'cpf', Passport: 'passport', NationalId: 'nationalId', Other: 'other' }[value] || 'other') as keyof PageMessageType;
@customElement('agenda-clinica--web--mobile--page11--profissionais-102047')
export class AgendaClinicaMobilePage11ProfissionaisPage extends AgendaClinicaProfissionaisShared {
private msg!: PageMessageType;
private listView() {
const loading = this.loadAvailableProfessionalsStatus === 'loading' || this.pageStatus === 'loading';
const error = this.loadAvailableProfessionalsError;
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
<header class="mb-5">
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.chooseProfessional}</p>
</header>
<div class="mb-4">
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => this.setScenario('create')}>
<Label>${this.msg.newProfessional}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${error ? html`<div class="mb-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3 text-sm" aria-live="polite">${this.msg.loadError}</div>` : ''}
<section data-organism-id="professionalList" aria-label=${this.msg.directoryTitle}>
<groupviewdata--ml-vertical-record-list .loading=${loading} @row-click=${(e: CustomEvent<{ index: number }>) => { const item = this.professionals.items[e.detail.index]; if (item) void this.openProfessional(item.id); }}>
<Columns>
<Column field="name" header=${this.msg.name}></Column>
<Column field="type" header=${this.msg.professionalType}></Column>
<Column field="status" header=${this.msg.status}></Column>
</Columns>
<Rows>
${(this.professionals.items || []).map((item) => html`
<Row ?selected=${item.id === this.selectedProfissional}>
<Cell><div class="font-medium text-[var(--text-strong,currentColor)]">${item.details.identification.details.identification.name}</div></Cell>
<Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg[typeKey(item.details.agendaClinica.details.agendaClinica.professionalType)]}</span></Cell>
<Cell><span class="text-sm ${item.details.identification.details.identification.status === 'Active' ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">${this.msg[statusKey(item.details.identification.details.identification.status)]}</span></Cell>
</Row>`)}
</Rows>
<Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loading}</div></Loading>
<Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.empty}</div></Empty>
</groupviewdata--ml-vertical-record-list>
</section>
${error ? html`<div class="mt-3"><grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.loadAvailableProfessionals()}><Label>${this.msg.retry}</Label></grouptriggeraction--ml-button-standard></div>` : ''}
</main>`;
}
private async openProfessional(id: string) {
await this.setSelectedProfissional(id);
this.setScenario('edit');
}
private detailView() {
const record = this.professional;
if (!record) return html`<div class="p-4 text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loading}</div>`;
const identification = record.details.identification.details.identification;
const agenda = record.details.agendaClinica.details.agendaClinica;
return html`<section data-organism-id="professionalDetail" class="mb-5">
<groupviewcard--ml-profile-card data-class="block w-full" .selected=${true}>
<CardHeader><CardTitle>${identification.name}</CardTitle><CardDescription>${this.msg[typeKey(agenda.professionalType)]}</CardDescription></CardHeader>
<CardContent><div class="space-y-2 text-sm"><div><span class="text-[var(--text-muted,currentColor)]">${this.msg.documentNumber}</span><div>${identification.docId || this.msg.noDocument}</div></div><div><span class="text-[var(--text-muted,currentColor)]">${this.msg.status}</span><div>${this.msg[statusKey(identification.status)]}</div></div></div></CardContent>
</groupviewcard--ml-profile-card>
</section>`;
}
private formView(editing: boolean) {
const draft = editing ? this.updateProfessionalDraft : this.createProfessionalDraft;
const identification = draft.details.identification;
const agenda = draft.details.agendaClinica;
const busy = editing ? this.updateProfessionalStatus === 'loading' : this.createProfessionalStatus === 'loading';
const error = editing ? this.updateProfessionalError : this.createProfessionalError;
const setDraft = (patch: Partial<{ name: string | null; docType: 'CPF' | 'Passport' | 'NationalId' | 'Other' | null; docId: string | null; countryCode: string | null; professionalType: 'medical' | 'therapist' | null }>) => {
const next = { ...draft, details: { ...draft.details, identification: { ...identification, ...patch }, agendaClinica: { ...agenda, ...(patch.professionalType === undefined ? {} : { professionalType: patch.professionalType }) } } };
if (editing) this.setUpdateProfessional({ ...next, id: this.updateProfessionalDraft.id, version: this.updateProfessionalDraft.version }); else this.setCreateProfessional(next);
};
return html`<section data-organism-id="professionalForm" class="space-y-4">
<groupentertext--ml-floating-text-input .value=${identification.name || ''} name="name" required .error=${!identification.name && !busy ? this.msg.requiredName : ''} @input=${(e: CustomEvent<{ value: string }>) => setDraft({ name: e.detail.value })}>
<Label>${this.msg.name}</Label>
</groupentertext--ml-floating-text-input>
<label class="block text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.documentType}<select class="mt-1 min-h-11 w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" .value=${identification.docType || ''} @change=${(e: Event) => setDraft({ docType: (e.target as HTMLSelectElement).value as 'CPF' | 'Passport' | 'NationalId' | 'Other' || null })}><option value="">${this.msg.selectDocumentType}</option><option value="CPF">${this.msg.cpf}</option><option value="Passport">${this.msg.passport}</option><option value="NationalId">${this.msg.nationalId}</option><option value="Other">${this.msg.other}</option></select></label>
${identification.docType === 'CPF' ? html`<groupentertext--ml-cpf-input .value=${identification.docId || ''} name="docId" @input=${(e: CustomEvent<{ value: string }>) => setDraft({ docId: e.detail.value })}><Label>${this.msg.documentNumber}</Label></groupentertext--ml-cpf-input>` : html`<groupentertext--ml-floating-text-input .value=${identification.docId || ''} name="docId" @input=${(e: CustomEvent<{ value: string }>) => setDraft({ docId: e.detail.value })}><Label>${this.msg.documentNumber}</Label></groupentertext--ml-floating-text-input>`}
<groupentertext--ml-floating-text-input .value=${identification.countryCode || ''} name="countryCode" placeholder=${this.msg.countryPlaceholder} @input=${(e: CustomEvent<{ value: string }>) => setDraft({ countryCode: e.detail.value })}><Label>${this.msg.country}</Label></groupentertext--ml-floating-text-input>
<label class="block text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.professionalType}<select class="mt-1 min-h-11 w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" .value=${agenda.professionalType || ''} @change=${(e: Event) => setDraft({ professionalType: (e.target as HTMLSelectElement).value as 'medical' | 'therapist' || null })}><option value="">${this.msg.selectProfessionalType}</option><option value="medical">${this.msg.medical}</option><option value="therapist">${this.msg.therapist}</option></select></label>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${!!error}><Title>${this.msg.feedbackErrorTitle}</Title><Message>${error?.message || this.msg.loadError}</Message></groupnotifyuser--ml-contextual-feedback>
<div class="pt-2"><grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .loading=${busy} .disabled=${busy || !identification.name || !agenda.professionalType} @action=${() => editing ? this.updateProfessional() : this.createProfessional()}><Label>${busy ? this.msg.saving : editing ? this.msg.saveUpdate : this.msg.saveCreate}</Label></grouptriggeraction--ml-button-standard></div>
</section>`;
}
private editView() {
return html`<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]"><h2 class="mb-4 text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.editTitle}</h2>${this.detailView()}${this.formView(true)}<section data-organism-id="professionalActions" class="mt-7 border-t border-[var(--border-subtle,currentColor)] pt-4"><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.maintenance}</p></section></main>`;
}
private createView() {
return html`<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]"><h2 class="mb-5 text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.createTitle}</h2><section data-organism-id="professionalDetail" class="mb-5"><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.chooseProfessional}</p></section>${this.formView(false)}<section data-organism-id="professionalActions" class="mt-7 border-t border-[var(--border-subtle,currentColor)] pt-4"><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.maintenance}</p></section></main>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'directory'} backLabel=${this.msg.back} @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}><Scene value="directory" title=${this.msg.directoryTitle}>${this.listView()}</Scene><Scene value="create" title=${this.msg.createTitle} nav="back" backTo="directory">${this.createView()}</Scene><Scene value="edit" title=${this.msg.editTitle} nav="back" backTo="directory">${this.editView()}</Scene></molecules--ml-scenary-102020>`;
}
}
