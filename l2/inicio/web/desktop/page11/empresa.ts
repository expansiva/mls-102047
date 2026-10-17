/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/empresa.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InicioEmpresaShared } from '/_102047_/l2/inicio/web/shared/empresa.js';
import type { CmdSalvarDadosEmpresaDraft, DocType, ContatoEmpresaResumo } from '/_102047_/l2/inicio/web/shared/empresa.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-view-card-horizontal.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Preparação da empresa',
pageSubtitle: 'Veja o que a plataforma já sabe da sua empresa e complete só o que falta.',
railStep1: 'Conhecer a empresa',
railStep2: 'Completar o que falta',
railLabel: 'Etapas da preparação',
sceneWelcome: 'Boas-vindas',
sceneComplete: 'Dados obrigatórios da empresa',
back: 'Voltar',
loading: 'Carregando os dados da empresa…',
emptyTitle: 'Nenhuma empresa encontrada',
emptyText: 'A plataforma ainda não encontrou uma empresa ligada ao seu acesso.',
errorTitle: 'Não foi possível abrir a empresa',
errorText: 'Tente carregar novamente em instantes.',
preconditionTitle: 'Falta a empresa para continuar',
preconditionText: 'Esta página foi aberta sem a empresa que ela precisa mostrar. Volte para a página anterior e abra a empresa de lá.',
retry: 'Carregar novamente',
goBack: 'Voltar à página anterior',
welcomeIntro: 'Estes são os dados que a plataforma já tem da sua empresa.',
noName: 'Empresa sem nome registrado',
fDocument: 'Documento',
fCountry: 'País',
fLegalName: 'Razão social',
fTradeName: 'Nome fantasia',
fAddresses: 'Endereços',
fContacts: 'Contatos',
noContacts: 'Nenhum contato ligado à empresa ainda.',
verified: 'Verificado',
notVerified: 'Não verificado',
contactPhone: 'Telefone',
contactEmail: 'E-mail',
contactWhatsApp: 'WhatsApp',
preparedLabel: 'Empresa preparada',
preparedYes: 'Sim',
preparedNo: 'Ainda não',
preparedHelperYes: 'Todos os dados obrigatórios estão completos.',
preparedHelperNo: 'Faltam dados obrigatórios.',
studioTitle: 'Tudo pronto',
studioText: 'Sua empresa está preparada. O próximo passo é criar o primeiro módulo no Studio.',
missingTitle: 'Ainda falta completar',
missingMessage: 'Antes de seguir ao Studio, a empresa precisa destes dados:',
falta_nome: 'nome',
falta_documento: 'documento',
falta_endereco: 'endereço',
falta_contato: 'contato',
goOn: 'Continuar',
formIntro: 'Preencha só o que a plataforma ainda não tem. O que já está registrado não é pedido de novo.',
nothingToComplete: 'Não há mais dados obrigatórios para completar.',
lName: 'Nome da empresa',
lLegalName: 'Razão social',
lDocType: 'Tipo de documento',
lDocId: 'Número do documento',
lCountry: 'País da empresa',
lAddress: 'Endereço da empresa',
hAddress: 'Rua, número, bairro, cidade e estado.',
phDocType: 'Escolha o tipo',
phCountry: 'Busque o país',
docCNPJ: 'CNPJ',
docEIN: 'EIN',
docVAT: 'VAT',
docNationalId: 'Documento nacional',
docOther: 'Outro',
paisBR: 'Brasil',
paisUS: 'Estados Unidos',
paisPT: 'Portugal',
paisAR: 'Argentina',
paisCL: 'Chile',
paisUY: 'Uruguai',
paisPY: 'Paraguai',
paisMX: 'México',
paisCO: 'Colômbia',
paisGB: 'Reino Unido',
linkedContacts: 'Contatos já ligados',
saveData: 'Salvar dados da empresa',
seePeople: 'Ver pessoas da organização',
saveOk: 'Dados salvos. Use Voltar para ver a situação da empresa.',
saveError: 'Não foi possível salvar os dados.',
saveErrorFallback: 'Revise as informações e tente novamente.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
type Draft = CmdSalvarDadosEmpresaDraft;
type Ident = Draft['details']['identification'];
const textOf = (e: Event): string | null => {
const v = (e as CustomEvent<{ value?: unknown }>).detail?.value;
return typeof v === 'string' ? v : null;
};
const patchIdent = (d: Draft, p: Partial<Ident>): Draft => ({
details: { ...d.details, identification: { ...d.details.identification, ...p } }
});
const patchCompany = (d: Draft, p: Partial<Draft['details']['company']>): Draft => ({
details: { ...d.details, company: { ...d.details.company, ...p } }
});
const patchAddress = (d: Draft, v: string | null): Draft => ({
details: { ...d.details, base: { ...d.details.base, addresses: v ? [v] : null } }
});
const row = (label: string, value: unknown) => html`
<div class="flex gap-3 py-0.5">
<dt class="w-32 shrink-0 text-sm text-[var(--text-muted,currentColor)]">${label}</dt>
<dd class="text-sm text-[var(--text-strong,currentColor)]">${value}</dd>
</div>`;
@customElement('inicio--web--desktop--page11--empresa-102047')
export class InicioDesktopPage11EmpresaPage extends InicioEmpresaShared {
private msg: PageMessageType = pageMessage_pt_br;
private docLabel(t: string | undefined) {
switch (t) {
case 'CNPJ': return this.msg['docCNPJ'];
case 'EIN': return this.msg['docEIN'];
case 'VAT': return this.msg['docVAT'];
case 'NationalId': return this.msg['docNationalId'];
case 'Other': return this.msg['docOther'];
default: return '';
}
}
private countryLabel(c: string | undefined) {
switch (c) {
case 'BR': return this.msg['paisBR'];
case 'US': return this.msg['paisUS'];
case 'PT': return this.msg['paisPT'];
case 'AR': return this.msg['paisAR'];
case 'CL': return this.msg['paisCL'];
case 'UY': return this.msg['paisUY'];
case 'PY': return this.msg['paisPY'];
case 'MX': return this.msg['paisMX'];
case 'CO': return this.msg['paisCO'];
case 'GB': return this.msg['paisGB'];
default: return c ?? '';
}
}
private contactTypeLabel(t: ContatoEmpresaResumo['details']['contactChannel']['contactType']) {
if (t === 'Phone') return this.msg['contactPhone'];
if (t === 'Email') return this.msg['contactEmail'];
return this.msg['contactWhatsApp'];
}
private missingLabels(v: string) {
const names: Record<string, string> = {
nome: this.msg['falta_nome'],
documento: this.msg['falta_documento'],
endereco: this.msg['falta_endereco'],
contato: this.msg['falta_contato']
};
return v.split(/[\s,;]+/).filter(Boolean).map((k) => names[k] ?? k).join(', ');
}
private renderRail(current: 1 | 2) {
const steps: Array<{ n: 1 | 2; title: string }> = [
{ n: 1, title: this.msg['railStep1'] },
{ n: 2, title: this.msg['railStep2'] }
];
return html`
<ol class="flex items-center gap-4" aria-label=${this.msg['railLabel']}>
${steps.map((s) => {
const isCurrent = s.n === current;
const isDone = s.n < current;
const badge = isCurrent
? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
: isDone
? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)] border-[var(--status-success-bg,currentColor)]'
: 'bg-[var(--surface-alt-bg,transparent)] text-[var(--text-muted,currentColor)] border-[var(--border-subtle,currentColor)]';
const label = isCurrent ? 'text-[var(--text-strong,currentColor)] font-semibold' : 'text-[var(--text-muted,currentColor)]';
return html`
<li class="flex items-center gap-2" aria-current=${isCurrent ? 'step' : 'false'}>
<span class="flex h-7 w-7 items-center justify-center rounded-full border text-sm ${badge}">${s.n}</span>
<span class="text-sm ${label}">${s.title}</span>
</li>`;
})}
</ol>`;
}
private renderContacts(contacts: ContatoEmpresaResumo[]) {
if (!contacts.length) {
return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['noContacts']}</p>`;
}
return html`
<ul class="flex flex-col gap-1">
${contacts.map((c) => html`
<li class="flex flex-wrap items-center gap-2 text-sm">
<span class="text-[var(--text-muted,currentColor)]">${this.contactTypeLabel(c.details.contactChannel.contactType)}</span>
<span class="text-[var(--text-strong,currentColor)]">${c.details.contactChannel.value}</span>
<span class="rounded-full px-2 py-0.5 text-xs ${c.details.contactChannel.isVerified
? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">
${c.details.contactChannel.isVerified ? this.msg['verified'] : this.msg['notVerified']}
</span>
</li>`)}
</ul>`;
}
private renderWelcome(e: NonNullable<InicioEmpresaShared['empresa']>) {
const ident = e.details.identification;
const name = ident.name || this.msg['noName'];
const doc = ident.docId ? `${this.docLabel(ident.docType)} ${ident.docId}`.trim() : '';
const missing = String(e.dadosFaltantes ?? '');
return html`
<div class="flex flex-col gap-6">
${this.renderRail(1)}
<div class="grid grid-cols-3 gap-4" data-organism-id="boasVindasEmpresa">
<div class="col-span-2">
<groupviewcard--ml-view-card-horizontal>
<CardContent>
<div class="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--selected-bg,transparent)] text-xl font-semibold text-[var(--selected-text,currentColor)]" aria-hidden="true">
${name.charAt(0).toUpperCase()}
</div>
</CardContent>
<CardHeader>
<CardTitle>${name}</CardTitle>
<CardDescription>${this.msg['welcomeIntro']}</CardDescription>
</CardHeader>
<CardFooter>
<dl class="mt-2">
${doc ? row(this.msg['fDocument'], doc) : nothing}
${ident.countryCode ? row(this.msg['fCountry'], this.countryLabel(ident.countryCode)) : nothing}
${e.details.company.legalName ? row(this.msg['fLegalName'], e.details.company.legalName) : nothing}
${e.details.company.tradeName ? row(this.msg['fTradeName'], e.details.company.tradeName) : nothing}
${e.details.base.addresses.length
? row(this.msg['fAddresses'], html`<ul>${e.details.base.addresses.map((a) => html`<li>${a}</li>`)}</ul>`)
: nothing}
${row(this.msg['fContacts'], this.renderContacts(e.contacts))}
</dl>
</CardFooter>
</groupviewcard--ml-view-card-horizontal>
</div>
<groupviewmetric--ml-metric-card>
<Label>${this.msg['preparedLabel']}</Label>
<Value>${e.preparada ? this.msg['preparedYes'] : this.msg['preparedNo']}</Value>
<Helper>${e.preparada ? this.msg['preparedHelperYes'] : this.msg['preparedHelperNo']}</Helper>
</groupviewmetric--ml-metric-card>
${e.preparada
? html`
<div class="col-span-3 rounded-lg border border-[var(--status-success-bg,currentColor)] bg-[var(--status-success-bg,transparent)] p-4 text-[var(--status-success-text,currentColor)]" role="status">
<p class="font-semibold">${this.msg['studioTitle']}</p>
<p class="text-sm">${this.msg['studioText']}</p>
</div>`
: nothing}
</div>
<div data-organism-id="dadosFaltantesEmpresa">
<groupnotifyuser--ml-notify-banner type="warning" .visible=${!e.preparada} .dismissible=${false}>
<Title>${this.msg['missingTitle']}</Title>
<Message>${this.msg['missingMessage']} <strong>${this.missingLabels(missing)}</strong></Message>
</groupnotifyuser--ml-notify-banner>
</div>
<div class="flex justify-end">
${e.preparada
? html`
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => this.verPessoasOrganizacao()}>
<Label>${this.msg['seePeople']}</Label>
</grouptriggeraction--ml-button-standard>`
: html`
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => this.setScenario('completar')}>
<Label>${this.msg['goOn']}</Label>
</grouptriggeraction--ml-button-standard>`}
</div>
</div>`;
}
private renderForm(e: NonNullable<InicioEmpresaShared['empresa']>) {
const d = this.cmdSalvarDadosEmpresaDraft;
const missing = String(e.dadosFaltantes ?? '');
const askName = missing.includes('nome');
const askDoc = missing.includes('documento');
const askAddress = missing.includes('endereco');
const nothingToAsk = !askName && !askDoc && !askAddress;
const onText = (patch: (dr: Draft, v: string | null) => Draft) => (ev: Event) => {
const v = textOf(ev);
if (v === null) return;
this.setCmdSalvarDadosEmpresaDraft(patch(d, v === '' ? null : v));
};
const saving = this.cmdSalvarDadosEmpresaStatus === 'loading';
const err = this.cmdSalvarDadosEmpresaError;
return html`
<div class="flex flex-col gap-6">
${this.renderRail(2)}
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['formIntro']}</p>
<div class="flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" data-organism-id="completarDadosEmpresa">
${nothingToAsk || e.preparada
? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['nothingToComplete']}</p>`
: nothing}
${askName && !e.preparada
? html`
<div class="grid grid-cols-2 gap-4">
<groupentertext--ml-enter-text .value=${d.details.identification.name ?? ''} required maxLength="200"
@input=${onText((dr, v) => patchIdent(dr, { name: v }))}
@change=${onText((dr, v) => patchIdent(dr, { name: v }))}>
<Label>${this.msg['lName']}</Label>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text .value=${d.details.company.legalName ?? ''} required maxLength="200"
@input=${onText((dr, v) => patchCompany(dr, { legalName: v }))}
@change=${onText((dr, v) => patchCompany(dr, { legalName: v }))}>
<Label>${this.msg['lLegalName']}</Label>
</groupentertext--ml-enter-text>
</div>`
: nothing}
${askDoc && !e.preparada
? html`
<div class="grid grid-cols-3 gap-4">
<groupselectone--ml-select .value=${d.details.identification.docType ?? null} required
@change=${(ev: CustomEvent<{ value: string | null }>) => this.setCmdSalvarDadosEmpresaDraft(patchIdent(d, { docType: ev.detail.value as DocType | null }))}>
<Label>${this.msg['lDocType']}</Label>
<Trigger>${this.msg['phDocType']}</Trigger>
<Item value="CNPJ">${this.msg['docCNPJ']}</Item>
<Item value="EIN">${this.msg['docEIN']}</Item>
<Item value="VAT">${this.msg['docVAT']}</Item>
<Item value="NationalId">${this.msg['docNationalId']}</Item>
<Item value="Other">${this.msg['docOther']}</Item>
</groupselectone--ml-select>
<groupentertext--ml-enter-text .value=${d.details.identification.docId ?? ''} required maxLength="40"
@input=${onText((dr, v) => patchIdent(dr, { docId: v }))}
@change=${onText((dr, v) => patchIdent(dr, { docId: v }))}>
<Label>${this.msg['lDocId']}</Label>
</groupentertext--ml-enter-text>
<groupselectone--ml-combobox .value=${d.details.identification.countryCode ?? null} required
placeholder=${this.msg['phCountry']}
@change=${(ev: CustomEvent<{ value: string | null }>) => this.setCmdSalvarDadosEmpresaDraft(patchIdent(d, { countryCode: ev.detail.value }))}>
<Label>${this.msg['lCountry']}</Label>
<Item value="BR">${this.msg['paisBR']}</Item>
<Item value="US">${this.msg['paisUS']}</Item>
<Item value="PT">${this.msg['paisPT']}</Item>
<Item value="AR">${this.msg['paisAR']}</Item>
<Item value="CL">${this.msg['paisCL']}</Item>
<Item value="UY">${this.msg['paisUY']}</Item>
<Item value="PY">${this.msg['paisPY']}</Item>
<Item value="MX">${this.msg['paisMX']}</Item>
<Item value="CO">${this.msg['paisCO']}</Item>
<Item value="GB">${this.msg['paisGB']}</Item>
</groupselectone--ml-combobox>
</div>`
: nothing}
${askAddress && !e.preparada
? html`
<groupentertext--ml-enter-text .value=${d.details.base.addresses?.[0] ?? ''} .rows=${2} required maxLength="300"
@input=${onText((dr, v) => patchAddress(dr, v))}
@change=${onText((dr, v) => patchAddress(dr, v))}>
<Label>${this.msg['lAddress']}</Label>
<Helper>${this.msg['hAddress']}</Helper>
</groupentertext--ml-enter-text>`
: nothing}
<div class="border-t border-[var(--border-subtle,currentColor)] pt-4">
<p class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['linkedContacts']}</p>
${this.renderContacts(e.contacts)}
</div>
</div>
<div class="flex flex-col gap-3" data-organism-id="acoesEmpresa">
<div aria-live="polite">
${err
? html`<p class="rounded-md border border-[var(--status-error-bg,currentColor)] bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]" role="alert">
${this.msg['saveError']} ${err.message || this.msg['saveErrorFallback']}
</p>`
: nothing}
${this.cmdSalvarDadosEmpresaStatus === 'success'
? html`<p class="rounded-md border border-[var(--status-success-bg,currentColor)] bg-[var(--status-success-bg,transparent)] p-3 text-sm text-[var(--status-success-text,currentColor)]" role="status">
${this.msg['saveOk']}
</p>`
: nothing}
</div>
<div class="flex items-center justify-end gap-3">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.verPessoasOrganizacao()}>
<Label>${this.msg['seePeople']}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="primary" size="md"
.loading=${saving} .disabled=${saving || e.preparada}
@action=${() => this.cmdSalvarDadosEmpresa()}>
<Label>${this.msg['saveData']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
</div>`;
}
private renderBody() {
const e = this.empresa;
const status = this.pageStatus;
const loadErr = this.qryEmpresaPreparoError;
if (status === 'error') {
const pre = loadErr?.code === 'client.preconditionMissing';
return html`
<div class="rounded-lg border border-[var(--status-error-bg,currentColor)] bg-[var(--surface-bg,transparent)] p-6" role="alert">
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${pre ? this.msg['preconditionTitle'] : this.msg['errorTitle']}</h2>
<p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${pre ? this.msg['preconditionText'] : (loadErr?.message || this.msg['errorText'])}</p>
<div class="mt-4 flex gap-3">
${pre
? html`<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => window.history.back()}>
<Label>${this.msg['goBack']}</Label>
</grouptriggeraction--ml-button-standard>`
: html`<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => this.qryEmpresaPreparo()}>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard>`}
</div>
</div>`;
}
if (status === 'empty') {
return html`
<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</h2>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyText']}</p>
</div>`;
}
if (!e) {
return html`
<div class="flex flex-col gap-3" role="status" aria-busy="true" aria-live="polite">
<span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['loading']}</span>
<div class="h-24 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-16 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
</div>`;
}
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'boasVindas'} backLabel=${this.msg['back']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="boasVindas" title=${this.msg['sceneWelcome']}>
${this.renderWelcome(e)}
</Scene>
<Scene value="completar" title=${this.msg['sceneComplete']} nav="back">
${this.renderForm(e)}
</Scene>
</molecules--ml-scenary-102020>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<div class="mx-auto flex max-w-5xl flex-col gap-6 bg-[var(--page-bg,transparent)] p-8 text-[var(--text-default,currentColor)]">
<header>
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
</header>
${this.renderBody()}
</div>`;
}
}
