/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/meu_cadastro.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InicioMeu_cadastroShared } from '/_102047_/l2/inicio/web/shared/meu_cadastro.js';
import type { MeuCadastro, SalvarMeusDadosDraft } from '/_102047_/l2/inicio/web/shared/meu_cadastro.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnavigatesteps/ml-vertical-stepper.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Meu cadastro',
loading: 'Carregando seu cadastro…',
emptyTitle: 'Nenhum cadastro encontrado',
emptyBody: 'Não encontramos o seu cadastro na organização. Tente carregar de novo.',
errorTitle: 'Não foi possível abrir seu cadastro',
errorBody: 'Algo deu errado ao carregar. Seus dados não foram alterados.',
preconditionTitle: 'Falta saber qual cadastro abrir',
preconditionBody: 'Esta tela foi aberta sem a indicação do seu cadastro na organização. Volte à página anterior e abra Meu cadastro de novo.',
retry: 'Tentar de novo',
goBack: 'Voltar à página anterior',
bannerTitle: 'Seu acesso aguarda liberação',
bannerMessage: 'Já existe outro cadastro com o mesmo e-mail de contato. O responsável precisa liberar o seu acesso. Este aviso fica aqui até a liberação.',
cardCountry: 'País',
cardContacts: 'Contatos',
cardCompany: 'Empresa',
cardAccess: 'Acesso',
cardMissing: 'Falta informar',
noName: 'Nome ainda não informado',
noValue: '—',
accessComplete: 'Acesso completo',
accessPending: 'Acesso pendente',
statusActive: 'Ativo',
statusInactive: 'Inativo',
statusMerged: 'Unificado',
statusBlocked: 'Bloqueado',
formTitle: 'Complete seu cadastro',
formIntro: 'Informe só o que ainda falta. O e-mail da conta não pode ser editado aqui.',
nameLabel: 'Nome',
namePlaceholder: 'Como você quer ser chamado',
countryLabel: 'País (sigla de 2 letras)',
countryPlaceholder: 'BR',
countryHelper: 'Para Brasil e União Europeia, pediremos também o consentimento de privacidade.',
consentLabel: 'Concordo com o tratamento dos meus dados pessoais',
consentHelper: 'Exigido pela lei do seu país.',
requiredHint: 'Campos com * são obrigatórios.',
completeTitle: 'Dados mínimos completos',
completeBody: 'Você segue para os módulos que o responsável liberou para você.',
saveLabel: 'Salvar meus dados',
saveCaption: 'O pedido de liberação fica com o responsável. Repetir o envio não cria outro cadastro.',
saveError: 'Não foi possível salvar seus dados. O que você digitou foi mantido; toque em salvar para tentar de novo.',
saveSuccess: 'Dados salvos.',
progressTitle: 'Andamento do pedido',
progressNone: 'Nenhum pedido de liberação pendente.',
stepForwarded: 'Encaminhado ao responsável',
stepReleased: 'Acesso liberado',
stepLogin: 'Login ligado pela plataforma'
};
/// **collab_i18n_end**
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
function withName(d: SalvarMeusDadosDraft, v: string): SalvarMeusDadosDraft {
return {
details: {
identification: { ...d.details.identification, name: v === '' ? null : v },
person: { ...d.details.person }
}
};
}
function withCountry(d: SalvarMeusDadosDraft, v: string): SalvarMeusDadosDraft {
return {
details: {
identification: { ...d.details.identification, countryCode: v === '' ? null : v.toUpperCase() },
person: { ...d.details.person }
}
};
}
function withConsent(d: SalvarMeusDadosDraft, v: boolean): SalvarMeusDadosDraft {
return {
details: {
identification: { ...d.details.identification },
person: { ...d.details.person, privacyConsent: v ? 'true' : null }
}
};
}
function hasText(v: string | null | undefined): boolean {
return typeof v === 'string' && v.trim() !== '';
}
function canSave(c: MeuCadastro, d: SalvarMeusDadosDraft): boolean {
const nameOk = hasText(c.details.identification.name) || hasText(d.details.identification.name);
const countryOk = hasText(c.details.identification.countryCode) || hasText(d.details.identification.countryCode);
const consentOk = !c.details.inicio.consentimentoExigido || hasText(d.details.person.privacyConsent);
return nameOk && countryOk && consentOk;
}
@customElement('inicio--web--mobile--page11--meu_cadastro-102047')
export class InicioMobilePage11Meu_cadastroPage extends InicioMeu_cadastroShared {
private msg: PageMessageType = pageMessage_pt_br;
private statusLabel(s: MeuCadastro['details']['identification']['status']) {
switch (s) {
case 'Active': return this.msg['statusActive'];
case 'Inactive': return this.msg['statusInactive'];
case 'Merged': return this.msg['statusMerged'];
default: return this.msg['statusBlocked'];
}
}
private renderState(title: string, body: string, withRetry: boolean, withBack: boolean) {
return html`
<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex flex-col gap-3" role="status" aria-live="polite">
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${title}</h2>
<p class="text-sm text-[var(--text-default,currentColor)]">${body}</p>
<div class="flex flex-col gap-2">
${withRetry ? html`
<grouptriggeraction--ml-button-standard-102040 size="lg" data-class="w-full" @action=${() => { void this.qryMeuCadastro(); }}>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard-102040>` : nothing}
${withBack ? html`
<grouptriggeraction--ml-button-standard-102040 size="lg" data-variant="secondary" data-class="w-full" @action=${() => { window.history.back(); }}>
<Label>${this.msg['goBack']}</Label>
</grouptriggeraction--ml-button-standard-102040>` : nothing}
</div>
</div>`;
}
private renderBanner(c: MeuCadastro) {
return html`
<div data-organism-id="avisoLiberacao">
<groupnotifyuser--ml-notify-banner-102040 type="warning" .visible=${c.aguardaLiberacao} .dismissible=${false}>
<Title>${this.msg['bannerTitle']}</Title>
<Message>${this.msg['bannerMessage']}</Message>
</groupnotifyuser--ml-notify-banner-102040>
</div>`;
}
private renderResumo(c: MeuCadastro | null) {
return html`
<div data-organism-id="meuCadastroResumo">
${c ? html`
<groupviewcard--ml-profile-card-102040>
<CardHeader>
<CardTitle>${c.details.identification.name || this.msg['noName']}</CardTitle>
<CardDescription>
<span class="inline-flex flex-wrap gap-2 mt-1">
<span class="rounded-full px-2 py-0.5 text-xs bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]">${this.statusLabel(c.details.identification.status)}</span>
${c.details.inicio.acessoCompleto
? html`<span class="rounded-full px-2 py-0.5 text-xs bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">${this.msg['accessComplete']}</span>`
: html`<span class="rounded-full px-2 py-0.5 text-xs bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['accessPending']}</span>`}
</span>
</CardDescription>
</CardHeader>
<CardContent>
<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['cardCountry']}</dt>
<dd class="text-[var(--text-default,currentColor)] break-words">${c.details.identification.countryCode || this.msg['noValue']}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['cardContacts']}</dt>
<dd class="text-[var(--text-default,currentColor)] break-words">${c.details.base.contacts || this.msg['noValue']}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['cardCompany']}</dt>
<dd class="text-[var(--text-default,currentColor)] break-words">${c.empresa?.details?.identification?.name || this.msg['noValue']}</dd>
${c.details.inicio.dadosFaltantes ? html`
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['cardMissing']}</dt>
<dd class="text-[var(--text-default,currentColor)] break-words">${c.details.inicio.dadosFaltantes}</dd>` : nothing}
</dl>
</CardContent>
</groupviewcard--ml-profile-card-102040>` : nothing}
</div>`;
}
private renderForm(c: MeuCadastro) {
const d = this.salvarMeusDadosDraft;
const needName = !hasText(c.details.identification.name);
const needCountry = !hasText(c.details.identification.countryCode);
const needConsent = c.details.inicio.consentimentoExigido;
return html`
<div data-organism-id="dadosMinimosForm">
${c.details.inicio.acessoCompleto ? html`
<div class="rounded-lg bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)] p-4">
<p class="text-sm font-semibold">${this.msg['completeTitle']}</p>
<p class="text-sm mt-1">${this.msg['completeBody']}</p>
</div>` : html`
<div class="flex flex-col gap-4">
<div>
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['formTitle']}</h2>
<p class="text-sm text-[var(--text-muted,currentColor)] mt-1">${this.msg['formIntro']}</p>
</div>
${needName ? html`
<groupentertext--ml-enter-text-102040
required
autocomplete="name"
.maxLength=${200}
placeholder=${this.msg['namePlaceholder']}
.value=${d.details.identification.name ?? ''}
@input=${(e: CustomEvent<{ value: string }>) => this.setSalvarMeusDadosDraft(withName(this.salvarMeusDadosDraft, e.detail.value))}
@change=${(e: CustomEvent<{ value: string }>) => this.setSalvarMeusDadosDraft(withName(this.salvarMeusDadosDraft, e.detail.value))}>
<Label>${this.msg['nameLabel']} *</Label>
</groupentertext--ml-enter-text-102040>` : nothing}
${needCountry ? html`
<groupentertext--ml-enter-text-102040
required
autocomplete="country"
.maxLength=${2}
placeholder=${this.msg['countryPlaceholder']}
.value=${d.details.identification.countryCode ?? ''}
@input=${(e: CustomEvent<{ value: string }>) => this.setSalvarMeusDadosDraft(withCountry(this.salvarMeusDadosDraft, e.detail.value))}
@change=${(e: CustomEvent<{ value: string }>) => this.setSalvarMeusDadosDraft(withCountry(this.salvarMeusDadosDraft, e.detail.value))}>
<Label>${this.msg['countryLabel']} *</Label>
<Helper>${this.msg['countryHelper']}</Helper>
</groupentertext--ml-enter-text-102040>` : nothing}
${needConsent ? html`
<groupenterboolean--ml-checkbox-preference-102040
.value=${hasText(d.details.person.privacyConsent)}
@change=${(e: CustomEvent<{ value: boolean }>) => this.setSalvarMeusDadosDraft(withConsent(this.salvarMeusDadosDraft, e.detail.value))}>
<Label>${this.msg['consentLabel']} *</Label>
<Helper>${this.msg['consentHelper']}</Helper>
</groupenterboolean--ml-checkbox-preference-102040>` : nothing}
<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['requiredHint']}</p>
</div>`}
</div>`;
}
private renderActions(c: MeuCadastro) {
const saving = this.salvarMeusDadosStatus === 'loading';
const showSave = !c.details.inicio.acessoCompleto;
return html`
<div data-organism-id="acoesMeuCadastro" class="flex flex-col gap-3">
<div aria-live="polite">
${this.salvarMeusDadosStatus === 'error' ? html`
<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">
${this.msg['saveError']}
${this.salvarMeusDadosError?.message ? html`<span class="block mt-1 text-[var(--text-muted,currentColor)]">${this.salvarMeusDadosError.message}</span>` : nothing}
</p>` : nothing}
${this.salvarMeusDadosStatus === 'success' ? html`
<p class="text-sm rounded-md px-3 py-2 bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">${this.msg['saveSuccess']}</p>` : nothing}
</div>
${showSave ? html`
<grouptriggeraction--ml-button-standard-102040
size="lg"
data-class="w-full min-h-[44px]"
.disabled=${!canSave(c, this.salvarMeusDadosDraft)}
.loading=${saving}
@action=${() => { void this.salvarMeusDados(); }}>
<Label>${this.msg['saveLabel']}</Label>
</grouptriggeraction--ml-button-standard-102040>
<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['saveCaption']}</p>` : nothing}
</div>`;
}
private renderAndamento(c: MeuCadastro) {
const pending = c.aguardaLiberacao;
return html`
<div data-organism-id="andamentoLiberacao" class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4">
<h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)] mb-2">${this.msg['progressTitle']}</h2>
${pending ? html`
<groupnavigatesteps--ml-vertical-stepper-102040 .value=${1} .linear=${true} .disabled=${true}>
<Step title=${this.msg['stepForwarded']} completed></Step>
<Step title=${this.msg['stepReleased']}></Step>
<Step title=${this.msg['stepLogin']}></Step>
</groupnavigatesteps--ml-vertical-stepper-102040>` : html`
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['progressNone']}</p>`}
</div>`;
}
private renderBody() {
const c = this.meuCadastro;
const loading = this.pageStatus === 'loading' || this.qryMeuCadastroStatus === 'loading';
if (!c) {
if (loading || this.pageStatus === 'idle') {
return html`<div class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-6 text-sm text-[var(--text-muted,currentColor)]" aria-busy="true" role="status">${this.msg['loading']}</div>`;
}
if (this.qryMeuCadastroError) {
const pre = this.qryMeuCadastroError.code === 'client.preconditionMissing';
return pre
? this.renderState(this.msg['preconditionTitle'], this.msg['preconditionBody'], false, true)
: this.renderState(this.msg['errorTitle'], this.msg['errorBody'], true, false);
}
return this.renderState(this.msg['emptyTitle'], this.msg['emptyBody'], true, false);
}
return html`
<div class="flex flex-col gap-4" aria-busy=${loading ? 'true' : 'false'}>
${this.qryMeuCadastroError ? html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${this.msg['errorBody']}</p>` : nothing}
<section class="flex flex-col gap-3" data-section="situacaoCadastro">
${this.renderBanner(c)}
${this.renderResumo(this.meuCadastroResumo)}
</section>
<section class="flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" data-section="completarDados">
${this.renderForm(c)}
${this.renderActions(c)}
</section>
<section data-section="andamentoPedido">
${this.renderAndamento(c)}
</section>
</div>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<div class="mx-auto w-full max-w-md px-4 py-5 flex flex-col gap-4">
<h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
${this.renderBody()}
</div>
</main>`;
}
}
