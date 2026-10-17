/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/inicio_pessoa.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InicioInicio_pessoaShared } from '/_102047_/l2/inicio/web/shared/inicio_pessoa.js';
import type { PendenciaAcesso } from '/_102047_/l2/inicio/web/shared/inicio_pessoa.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupshowprogress/ml-segmented-progress.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewcard/ml-view-card-horizontal.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Início',
loading: 'Carregando seu acesso…',
errorTitle: 'Não foi possível carregar o seu acesso.',
errorMissing: 'Esta página foi aberta sem o cadastro da sua sessão. Entre novamente para continuar.',
retry: 'Tentar de novo',
emptyTitle: 'Ainda não há informações de acesso para mostrar.',
headlineOk: 'Nada precisa de atenção agora. Seu acesso está completo.',
headlineAttention: 'Seu acesso ainda precisa de atenção.',
missingLabel: 'Dados que faltam',
progressLabel: 'Dados mínimos do acesso completos',
progressDone: 'Dados mínimos completos',
consentTitle: 'Consentimento de privacidade',
consentMessage: 'O país do seu cadastro exige o consentimento de privacidade para completar o acesso.',
openRegistration: 'Abrir meu cadastro',
lanePending: 'O que espera por você',
lanePendingEmpty: 'Nenhuma pendência. Você pode seguir para os seus módulos.',
pendingMinimumTitle: 'Dados mínimos do cadastro',
pendingMinimumFact: 'Falta informar',
pendingMinimumAction: 'Completar meus dados',
pendingReleaseTitle: 'Liberação do acesso',
pendingReleaseFact: 'E-mail da conta',
pendingReleaseAction: 'Encaminhar pedido ao responsável',
pendingReleaseNotice: 'Já existe outro cadastro com o seu e-mail. O responsável precisa liberar o seu acesso.',
stripLabel: 'Situação do seu cadastro',
stripName: 'Nome',
stripCountry: 'País',
stripStatus: 'Situação na plataforma',
statusActive: 'Ativo',
statusInactive: 'Inativo',
statusMerged: 'Mesclado',
statusBlocked: 'Bloqueado',
companyHeading: 'Sua empresa',
companyNone: 'Nenhuma empresa vinculada ao seu cadastro.',
companyTradeName: 'Nome fantasia',
notInformed: 'Não informado'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
function listText(items: string[] | undefined): string {
if (!items) return '';
return items.join(', ');
}
@customElement('inicio--web--desktop--page11--inicio_pessoa-102047')
export class InicioDesktopPage11Inicio_pessoaPage extends InicioInicio_pessoaShared {
private msg: PageMessageType = pageMessage_pt_br;
private statusLabel(status: string | undefined) {
switch (status) {
case 'Active': return this.msg['statusActive'];
case 'Inactive': return this.msg['statusInactive'];
case 'Merged': return this.msg['statusMerged'];
case 'Blocked': return this.msg['statusBlocked'];
default: return this.msg['notInformed'];
}
}
private renderSkeleton() {
return html`
<div class="flex flex-col gap-4" aria-busy="true" aria-live="polite">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['loading']}</p>
<div class="h-10 w-2/3 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-24 w-full animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-24 w-full animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
</div>
`;
}
private renderError() {
const missing = this.qryInicioPessoaError?.code === 'client.preconditionMissing';
return html`
<div role="alert" aria-live="polite" class="flex flex-col items-start gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
<p class="text-base font-medium text-[var(--text-strong,currentColor)]">${this.msg['errorTitle']}</p>
<p class="text-sm text-[var(--text-muted,currentColor)]">${missing ? this.msg['errorMissing'] : this.qryInicioPessoaError?.message ?? ''}</p>
${missing ? nothing : html`
<molecules--grouptriggeraction--ml-button-standard-102040 data-variant="secondary" size="md" @action=${() => this.qryInicioPessoa()}>
<Label>${this.msg['retry']}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>`}
</div>
`;
}
private renderResumo() {
const acesso = this.meuAcesso;
if (!acesso) return nothing;
const inicio = acesso.details.inicio;
const faltantes = listText(inicio.dadosFaltantes);
return html`
<section data-organism-id="resumoMeuAcesso" class="flex flex-col gap-4">
<div class="flex flex-wrap items-start justify-between gap-4">
<div class="flex flex-col gap-2 min-w-0">
<p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">
${inicio.acessoCompleto ? this.msg['headlineOk'] : this.msg['headlineAttention']}
</p>
${inicio.acessoCompleto ? nothing : html`
<p class="text-sm text-[var(--text-default,currentColor)]">
${this.msg['missingLabel']}:
<span class="font-medium text-[var(--status-warning-text,currentColor)]">${faltantes || this.msg['notInformed']}</span>
</p>`}
</div>
<molecules--grouptriggeraction--ml-button-standard-102040 data-variant="secondary" size="md" @action=${() => this.abrirMeuCadastroResumo()}>
<Label>${this.msg['openRegistration']}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>
</div>
${inicio.acessoCompleto ? html`
<div class="max-w-sm">
<molecules--groupshowprogress--ml-segmented-progress-102040 value="100" size="sm" label=${this.msg['progressLabel']}></molecules--groupshowprogress--ml-segmented-progress-102040>
<p class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${this.msg['progressDone']}</p>
</div>` : nothing}
<molecules--groupnotifyuser--ml-notify-banner-102040 type="info" .visible=${inicio.consentimentoExigido} .dismissible=${false}>
<Title>${this.msg['consentTitle']}</Title>
<Message>${this.msg['consentMessage']}</Message>
</molecules--groupnotifyuser--ml-notify-banner-102040>
</section>
`;
}
private renderPendencia(p: PendenciaAcesso) {
const isMinimo = p.tipo === 'completarDadosMinimos';
const fact = isMinimo ? listText(p.details?.inicio?.dadosFaltantes) : p.emailConta ?? '';
return html`
<li class="flex flex-col gap-2">
<molecules--groupviewcard--ml-view-card-horizontal-102040>
<CardHeader>
<CardTitle>${isMinimo ? this.msg['pendingMinimumTitle'] : this.msg['pendingReleaseTitle']}</CardTitle>
<CardDescription>
${isMinimo ? this.msg['pendingMinimumFact'] : this.msg['pendingReleaseFact']}:
<span class="font-medium ${isMinimo ? 'text-[var(--status-warning-text,currentColor)]' : 'text-[var(--text-strong,currentColor)]'}">${fact || this.msg['notInformed']}</span>
</CardDescription>
</CardHeader>
<CardAction>
<molecules--grouptriggeraction--ml-button-standard-102040
data-variant=${isMinimo ? 'primary' : 'secondary'}
size="md"
@action=${() => (isMinimo ? this.completarDadosMinimos() : this.encaminharPedidoLiberacao())}>
<Label>${isMinimo ? this.msg['pendingMinimumAction'] : this.msg['pendingReleaseAction']}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>
</CardAction>
</molecules--groupviewcard--ml-view-card-horizontal-102040>
${isMinimo ? nothing : html`
<molecules--groupnotifyuser--ml-contextual-feedback-102040 type="warning" .visible=${true} .dismissible=${false}>
<Message>${this.msg['pendingReleaseNotice']}</Message>
</molecules--groupnotifyuser--ml-contextual-feedback-102040>`}
</li>
`;
}
private renderPendencias() {
return html`
<section data-organism-id="pendenciasMeuAcesso" class="flex flex-col gap-3">
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['lanePending']}</h2>
${this.pendencias.length === 0
? html`<p class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--status-success-bg,transparent)] px-4 py-3 text-sm text-[var(--status-success-text,currentColor)]">${this.msg['lanePendingEmpty']}</p>`
: html`<ul class="flex flex-col gap-3">${this.pendencias.map(p => this.renderPendencia(p))}</ul>`}
</section>
`;
}
private renderStrip() {
const ident = this.meuAcesso?.details.identification;
if (!ident) return nothing;
return html`
<dl aria-label=${this.msg['stripLabel']} class="flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--border-subtle,currentColor)] pt-4 text-sm">
<div class="flex flex-col">
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['stripName']}</dt>
<dd class="text-[var(--text-default,currentColor)]">${ident.name || this.msg['notInformed']}</dd>
</div>
<div class="flex flex-col">
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['stripCountry']}</dt>
<dd class="text-[var(--text-default,currentColor)]">${ident.countryCode || this.msg['notInformed']}</dd>
</div>
<div class="flex flex-col">
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['stripStatus']}</dt>
<dd class="text-[var(--text-default,currentColor)]">${this.statusLabel(ident.status)}</dd>
</div>
</dl>
`;
}
private renderEmpresa() {
const e = this.empresa;
return html`
<section data-organism-id="destaqueEmpresa" class="flex flex-col gap-2">
<h2 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['companyHeading']}</h2>
${e ? html`
<div class="max-w-sm">
<molecules--groupviewcard--ml-vertical-card-102040>
<CardHeader>
<CardTitle>${e.details.identification.name}</CardTitle>
${e.details.company.tradeName ? html`<CardDescription>${this.msg['companyTradeName']}: ${e.details.company.tradeName}</CardDescription>` : nothing}
</CardHeader>
</molecules--groupviewcard--ml-vertical-card-102040>
</div>` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['companyNone']}</p>`}
</section>
`;
}
private renderBody() {
if (this.pageStatus === 'idle' || this.pageStatus === 'loading' || this.qryInicioPessoaStatus === 'loading') {
return this.renderSkeleton();
}
if (this.pageStatus === 'error') return this.renderError();
if (this.pageStatus === 'empty' || !this.meuAcesso) {
return html`<p class="text-base text-[var(--text-muted,currentColor)]">${this.msg['emptyTitle']}</p>`;
}
return html`
<div class="flex flex-col gap-8">
${this.renderResumo()}
${this.renderPendencias()}
${this.renderStrip()}
${this.renderEmpresa()}
</div>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<div class="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-8">
<header>
<h1 class="text-sm font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
</header>
${this.renderBody()}
</div>
</main>
`;
}
}
