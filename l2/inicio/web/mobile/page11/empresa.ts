/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/empresa.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InicioEmpresaShared } from '/_102047_/l2/inicio/web/shared/empresa.js';
import type { CmdSalvarDadosEmpresaDraft, DocType } from '/_102047_/l2/inicio/web/shared/empresa.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
welcome: 'Boas-vindas',
preparedLabel: 'Empresa preparada',
preparedYes: 'Sim',
preparedNo: 'Ainda não',
preparedHelperYes: 'Todos os dados obrigatórios estão completos.',
preparedHelperNo: 'Faltam dados obrigatórios para concluir.',
studioGuide: 'Tudo pronto. O próximo passo é criar o primeiro módulo da sua empresa no Studio.',
lblName: 'Nome da empresa',
lblDoc: 'Documento',
lblAddress: 'Endereço',
lblContacts: 'Contatos',
notInformed: 'Não informado',
noContacts: 'Nenhum contato ligado ainda',
contactVerified: 'Verificado',
contactNotVerified: 'Não verificado',
typePhone: 'Telefone',
typeEmail: 'E-mail',
typeWhatsApp: 'WhatsApp',
missingTitle: 'Falta completar',
missing_nome: 'Falta informar o nome da empresa.',
missing_documento: 'Falta informar o documento da empresa.',
missing_endereco: 'Falta informar o endereço da empresa.',
missing_contato: 'Falta ao menos um contato. A plataforma liga o contato da empresa; não há o que preencher aqui.',
allDoneTitle: 'Dados completos',
allDoneText: 'A plataforma já tem tudo o que é obrigatório.',
formHint: 'Preencha só o que falta. O que a plataforma já tem não é pedido de novo.',
fName: 'Nome da empresa',
fLegalName: 'Razão social',
fDocType: 'Tipo de documento',
fDocTypePlaceholder: 'Escolha o tipo',
fDocId: 'Número do documento',
fCountry: 'País da empresa',
fCountryPlaceholder: 'Digite para buscar o país',
fAddress: 'Endereço da empresa',
docCNPJ: 'CNPJ',
docEIN: 'EIN',
docVAT: 'VAT',
docNationalId: 'Documento nacional',
docOther: 'Outro',
actionSave: 'Salvar dados da empresa',
actionPeople: 'Ver pessoas da organização',
saved: 'Dados salvos. A empresa foi atualizada.',
saveErrorTitle: 'Não foi possível salvar',
loading: 'Carregando sua empresa…',
errorTitle: 'Não foi possível abrir a empresa',
errorPrecondition: 'Esta tela foi aberta sem a empresa identificada. Volte ao início e abra de novo.',
errorBack: 'Voltar ao início',
retry: 'Tentar novamente',
emptyTitle: 'Nenhuma empresa encontrada',
emptyText: 'Não encontramos uma empresa ligada ao seu acesso.',
peopleErrorTitle: 'Não foi possível abrir as pessoas'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const COUNTRIES = ['BR', 'PT', 'US', 'AR', 'CL', 'CO', 'MX', 'PY', 'UY', 'ES', 'DE', 'FR', 'GB', 'IT'];
function countryName(code: string): string {
try {
const names = new Intl.DisplayNames([document.documentElement.lang || 'pt-BR'], { type: 'region' });
return names.of(code) || code;
} catch {
return code;
}
}
function patchIdentification(
d: CmdSalvarDadosEmpresaDraft,
p: Partial<CmdSalvarDadosEmpresaDraft['details']['identification']>
): CmdSalvarDadosEmpresaDraft {
return { details: { ...d.details, identification: { ...d.details.identification, ...p } } };
}
function patchCompany(
d: CmdSalvarDadosEmpresaDraft,
p: Partial<CmdSalvarDadosEmpresaDraft['details']['company']>
): CmdSalvarDadosEmpresaDraft {
return { details: { ...d.details, company: { ...d.details.company, ...p } } };
}
function patchAddress(d: CmdSalvarDadosEmpresaDraft, v: string): CmdSalvarDadosEmpresaDraft {
return { details: { ...d.details, base: { addresses: v ? [v] : null } } };
}
function textOrNull(v: string | null | undefined): string | null {
return v ? v : null;
}
@customElement('inicio--web--mobile--page11--empresa-102047')
export class InicioMobilePage11EmpresaPage extends InicioEmpresaShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main
class="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-4 bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]"
aria-busy=${this.pageStatus === 'loading' ? 'true' : 'false'}
>
${this.renderBody()}
</main>
`;
}
private renderBody() {
if (this.pageStatus === 'idle' || this.pageStatus === 'loading') return this.renderLoading();
if (this.pageStatus === 'error') return this.renderError();
if (!this.empresa || this.pageStatus === 'empty') return this.renderEmpty();
return html`
${this.renderBoasVindas()}
${this.renderFaltantes()}
${this.renderFormulario()}
${this.renderAcoes()}
`;
}
private renderLoading() {
return html`
<div class="flex flex-col gap-3" role="status" aria-live="polite">
<div class="h-40 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-16 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['loading']}</p>
</div>
`;
}
private renderError() {
const err = this.qryEmpresaPreparoError;
const precondition = err?.code === 'client.preconditionMissing';
return html`
<section
class="flex flex-col gap-3 rounded-xl border border-[var(--status-error-text,currentColor)] bg-[var(--status-error-bg,transparent)] p-4"
role="alert"
>
<h1 class="text-lg font-semibold text-[var(--status-error-text,currentColor)]">${this.msg['errorTitle']}</h1>
<p class="text-sm text-[var(--text-default,currentColor)]">
${precondition ? this.msg['errorPrecondition'] : err?.message ?? ''}
</p>
<div class="flex flex-col gap-2">
<grouptriggeraction--ml-button-standard-102040
size="lg"
data-class="w-full min-h-[44px]"
@action=${() => { void this.qryEmpresaPreparo(); }}
>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard-102040>
${precondition
? html`<a
href="/inicio"
class="inline-flex min-h-[44px] items-center justify-center text-sm text-[var(--link-text,currentColor)] underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
>${this.msg['errorBack']}</a
>`
: nothing}
</div>
</section>
`;
}
private renderEmpty() {
return html`
<section class="flex flex-col gap-2 rounded-xl bg-[var(--surface-bg,transparent)] p-4 text-center">
<h1 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</h1>
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyText']}</p>
</section>
`;
}
private contactTypeLabel(t: 'Phone' | 'Email' | 'WhatsApp') {
if (t === 'Phone') return this.msg['typePhone'];
if (t === 'Email') return this.msg['typeEmail'];
return this.msg['typeWhatsApp'];
}
private renderBoasVindas() {
const e = this.empresa;
if (!e) return nothing;
const ident = e.details.identification;
const doc = [ident.docType, ident.docId].filter(Boolean).join(' ');
const addresses = e.details.base.addresses;
return html`
<section data-organism-id="boasVindasEmpresa" class="flex flex-col gap-3">
<groupviewcard--ml-vertical-card-102040>
<CardHeader>
<CardTitle>${this.msg['welcome']}</CardTitle>
<CardDescription>${ident.name ?? this.msg['notInformed']}</CardDescription>
</CardHeader>
<CardContent>
<div class="flex flex-col gap-4">
<groupviewmetric--ml-metric-big-number-102040>
<Label>${this.msg['preparedLabel']}</Label>
<Value>${e.preparada ? this.msg['preparedYes'] : this.msg['preparedNo']}</Value>
<Helper>${e.preparada ? this.msg['preparedHelperYes'] : this.msg['preparedHelperNo']}</Helper>
</groupviewmetric--ml-metric-big-number-102040>
<dl class="flex flex-col gap-3 text-sm">
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['lblName']}</dt>
<dd class="text-[var(--text-strong,currentColor)]">${ident.name ?? this.msg['notInformed']}</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['lblDoc']}</dt>
<dd class="text-[var(--text-strong,currentColor)]">${doc || this.msg['notInformed']}</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['lblAddress']}</dt>
<dd class="text-[var(--text-strong,currentColor)]">
${addresses.length
? addresses.map((a) => html`<span class="block break-words">${a}</span>`)
: this.msg['notInformed']}
</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['lblContacts']}</dt>
<dd>
${e.contacts.length
? html`<ul class="flex flex-col gap-2">
${e.contacts.map(
(c) => html`
<li class="flex items-start justify-between gap-2">
<span class="min-w-0">
<span class="block text-xs text-[var(--text-muted,currentColor)]"
>${c.details.identification.name} · ${this.contactTypeLabel(c.details.contactChannel.contactType)}</span
>
<span class="block break-words text-[var(--text-strong,currentColor)]"
>${c.details.contactChannel.value}</span
>
</span>
<span
class="shrink-0 rounded-full px-2 py-0.5 text-xs ${c.details.contactChannel.isVerified
? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}"
>${c.details.contactChannel.isVerified
? this.msg['contactVerified']
: this.msg['contactNotVerified']}</span
>
</li>
`
)}
</ul>`
: html`<span class="text-[var(--text-muted,currentColor)]">${this.msg['noContacts']}</span>`}
</dd>
</div>
</dl>
${e.preparada
? html`<p
class="rounded-lg bg-[var(--status-success-bg,transparent)] p-3 text-sm text-[var(--status-success-text,currentColor)]"
>
${this.msg['studioGuide']}
</p>`
: nothing}
</div>
</CardContent>
</groupviewcard--ml-vertical-card-102040>
</section>
`;
}
private missingText(k: 'nome' | 'documento' | 'endereco' | 'contato') {
switch (k) {
case 'nome':
return this.msg['missing_nome'];
case 'documento':
return this.msg['missing_documento'];
case 'endereco':
return this.msg['missing_endereco'];
default:
return this.msg['missing_contato'];
}
}
private renderFaltantes() {
const e = this.empresa;
if (!e) return nothing;
return html`
<section data-organism-id="dadosFaltantesEmpresa">
${e.preparada
? html`<groupnotifyuser--ml-contextual-feedback-102040 type="success" visible .dismissible=${false}>
<Title>${this.msg['allDoneTitle']}</Title>
<Message>${this.msg['allDoneText']}</Message>
</groupnotifyuser--ml-contextual-feedback-102040>`
: html`<groupnotifyuser--ml-contextual-feedback-102040 type="warning" visible .dismissible=${false}>
<Title>${this.msg['missingTitle']}</Title>
<Message>${this.missingText(e.dadosFaltantes)}</Message>
</groupnotifyuser--ml-contextual-feedback-102040>`}
</section>
`;
}
private renderFormulario() {
const e = this.empresa;
if (!e) return nothing;
const draft = this.cmdSalvarDadosEmpresaDraft;
const ident = draft.details.identification;
const busy = this.cmdSalvarDadosEmpresaStatus === 'loading';
const k = e.dadosFaltantes;
const docTypes: DocType[] = ['CNPJ', 'EIN', 'VAT', 'NationalId', 'Other'];
const docLabel = (t: DocType) => {
if (t === 'CNPJ') return this.msg['docCNPJ'];
if (t === 'EIN') return this.msg['docEIN'];
if (t === 'VAT') return this.msg['docVAT'];
if (t === 'NationalId') return this.msg['docNationalId'];
return this.msg['docOther'];
};
return html`
<section data-organism-id="completarDadosEmpresa" class="flex flex-col gap-3">
${e.preparada
? nothing
: html`
<form
class="flex flex-col gap-4 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4"
@submit=${(ev: Event) => ev.preventDefault()}
>
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['formHint']}</p>
${k === 'nome'
? html`
<groupentertext--ml-floating-text-input-102040
.value=${ident.name ?? ''}
?disabled=${busy}
required
autocomplete="organization"
@change=${(ev: CustomEvent<{ value: string }>) =>
this.setCmdSalvarDadosEmpresaDraft(patchIdentification(draft, { name: textOrNull(ev.detail.value) }))}
>
<Label>${this.msg['fName']}</Label>
</groupentertext--ml-floating-text-input-102040>
<groupentertext--ml-floating-text-input-102040
.value=${draft.details.company.legalName ?? ''}
?disabled=${busy}
required
@change=${(ev: CustomEvent<{ value: string }>) =>
this.setCmdSalvarDadosEmpresaDraft(patchCompany(draft, { legalName: textOrNull(ev.detail.value) }))}
>
<Label>${this.msg['fLegalName']}</Label>
</groupentertext--ml-floating-text-input-102040>
`
: nothing}
${k === 'documento'
? html`
<groupselectone--ml-select-102040
.value=${ident.docType ?? null}
?disabled=${busy}
required
@change=${(ev: CustomEvent<{ value: string | null }>) =>
this.setCmdSalvarDadosEmpresaDraft(
patchIdentification(draft, { docType: (ev.detail.value as DocType | null) ?? null })
)}
>
<Label>${this.msg['fDocType']}</Label>
<Trigger>${this.msg['fDocTypePlaceholder']}</Trigger>
${docTypes.map((t) => html`<Item value=${t}>${docLabel(t)}</Item>`)}
</groupselectone--ml-select-102040>
<groupentertext--ml-floating-text-input-102040
.value=${ident.docId ?? ''}
?disabled=${busy}
required
@change=${(ev: CustomEvent<{ value: string }>) =>
this.setCmdSalvarDadosEmpresaDraft(patchIdentification(draft, { docId: textOrNull(ev.detail.value) }))}
>
<Label>${this.msg['fDocId']}</Label>
</groupentertext--ml-floating-text-input-102040>
<groupselectone--ml-select-one-autocomplete-102040
.value=${ident.countryCode ?? null}
?disabled=${busy}
required
placeholder=${this.msg['fCountryPlaceholder']}
@change=${(ev: CustomEvent<{ value: string | null }>) =>
this.setCmdSalvarDadosEmpresaDraft(patchIdentification(draft, { countryCode: ev.detail.value ?? null }))}
>
<Label>${this.msg['fCountry']}</Label>
${COUNTRIES.map((c) => html`<Item value=${c}>${countryName(c)}</Item>`)}
</groupselectone--ml-select-one-autocomplete-102040>
`
: nothing}
${k === 'endereco'
? html`
<groupentertext--ml-enter-text-102040
.value=${draft.details.base.addresses?.[0] ?? ''}
.rows=${2}
?disabled=${busy}
required
autocomplete="street-address"
@change=${(ev: CustomEvent<{ value: string }>) =>
this.setCmdSalvarDadosEmpresaDraft(patchAddress(draft, ev.detail.value))}
>
<Label>${this.msg['fAddress']}</Label>
</groupentertext--ml-enter-text-102040>
`
: nothing}
</form>
`}
</section>
`;
}
private renderAcoes() {
const e = this.empresa;
if (!e) return nothing;
const busy = this.cmdSalvarDadosEmpresaStatus === 'loading';
const canSave = !e.preparada && e.dadosFaltantes !== 'contato';
const saveErr = this.cmdSalvarDadosEmpresaError;
const navErr = this.qryEmpresaPreparoError;
return html`
<section data-organism-id="acoesEmpresa" class="flex flex-col gap-3 pb-4">
<div aria-live="polite" class="flex flex-col gap-2">
${this.cmdSalvarDadosEmpresaStatus === 'success'
? html`<p
class="rounded-lg bg-[var(--status-success-bg,transparent)] p-3 text-sm text-[var(--status-success-text,currentColor)]"
>
${this.msg['saved']}
</p>`
: nothing}
${saveErr
? html`<p
class="rounded-lg bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]"
>
<strong class="block">${this.msg['saveErrorTitle']}</strong>${saveErr.message}
</p>`
: nothing}
${navErr
? html`<p
class="rounded-lg bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]"
>
<strong class="block">${this.msg['peopleErrorTitle']}</strong>${navErr.code === 'client.preconditionMissing'
? this.msg['errorPrecondition']
: navErr.message}
</p>`
: nothing}
</div>
${canSave
? html`<grouptriggeraction--ml-button-standard-102040
size="lg"
data-variant="primary"
data-class="w-full min-h-[44px]"
?loading=${busy}
?disabled=${busy}
@action=${() => { void this.cmdSalvarDadosEmpresa(); }}
>
<Label>${this.msg['actionSave']}</Label>
</grouptriggeraction--ml-button-standard-102040>`
: nothing}
<grouptriggeraction--ml-button-standard-102040
size="lg"
data-variant=${canSave ? 'secondary' : 'primary'}
data-class="w-full min-h-[44px]"
?disabled=${busy}
@action=${() => this.verPessoasOrganizacao()}
>
<Label>${this.msg['actionPeople']}</Label>
</grouptriggeraction--ml-button-standard-102040>
</section>
`;
}
}
