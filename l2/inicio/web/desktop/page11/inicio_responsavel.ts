/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/inicio_responsavel.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InicioInicio_responsavelShared } from '/_102047_/l2/inicio/web/shared/inicio_responsavel.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Início',
companyLabel: 'Empresa',
headlineCompany: 'A empresa ainda não está preparada: faltam dados obrigatórios.',
headlineNone: 'Nada precisa de atenção agora.',
headlinePeople: 'Há pessoas aguardando a sua liberação de acesso.',
laneCompanyTitle: 'Dados da empresa que faltam',
laneCompanyGood: 'A empresa está preparada: todos os dados obrigatórios foram informados.',
missingFact: 'Falta informar',
complete: 'Completar',
lanePeopleTitle: 'Pessoas aguardando a sua liberação',
lanePeopleEmpty: 'Nenhuma pessoa aguarda liberação de acesso.',
openPerson: 'Abrir',
awaitingRelease: 'Aguarda liberação',
loadMore: 'Carregar mais pessoas',
stripLabel: 'Acesso das pessoas da organização',
stripComplete: 'com acesso completo',
stripMissing: 'com dados faltando',
stripConsent: 'com consentimento pendente',
seeAllPeople: 'Ver pessoas da organização',
retry: 'Tentar de novo',
errorPanel: 'Não foi possível carregar a situação da empresa e os números de acesso.',
errorPeople: 'Não foi possível carregar as pessoas que aguardam liberação.',
errorSelection: 'A pessoa escolhida não está na lista carregada.',
preconditionTitle: 'Falta informação para abrir esta tela',
preconditionText: 'A página foi aberta sem os dados necessários da empresa. Volte à tela anterior e entre de novo.',
back: 'Voltar',
statusActive: 'Ativa',
statusInactive: 'Inativa',
statusMerged: 'Unificada',
statusBlocked: 'Bloqueada',
loading: 'Carregando'
};
/// **collab_i18n_end**
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
const fmtNumber = (n: number) => new Intl.NumberFormat(document.documentElement.lang || undefined).format(n);
const rowCls =
'w-full min-h-[44px] flex items-center justify-between gap-4 px-4 py-3 text-left cursor-pointer hover:bg-[var(--surface-alt-bg,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';
@customElement('inicio--web--desktop--page11--inicio_responsavel-102047')
export class InicioDesktopPage11Inicio_responsavelPage extends InicioInicio_responsavelShared {
private msg: PageMessageType = pageMessage_pt_br;
private statusLabel(s: 'Active' | 'Inactive' | 'Merged' | 'Blocked') {
if (s === 'Active') return this.msg['statusActive'];
if (s === 'Inactive') return this.msg['statusInactive'];
if (s === 'Merged') return this.msg['statusMerged'];
return this.msg['statusBlocked'];
}
private skeleton(rows: number) {
return html`<div class="animate-pulse space-y-3 p-4" aria-busy="true" aria-label=${this.msg['loading']}>
${Array.from({ length: rows }).map(
() => html`<div class="h-5 rounded bg-[var(--surface-alt-bg,transparent)]"></div>`
)}
</div>`;
}
private errorBox(text: string, onRetry: () => void) {
return html`<div class="flex items-center justify-between gap-4 p-4" role="alert" aria-live="polite">
<p class="text-[var(--status-error-text,currentColor)]">${text}</p>
<grouptriggeraction--ml-button-standard-102040 data-variant="secondary" size="sm" @action=${onRetry}>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard-102040>
</div>`;
}
private renderHeadline() {
const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
let text = '';
if (!loading) {
if (this.empresa && !this.empresa.details.inicio.preparada) text = this.msg['headlineCompany'];
else if (this.empresa && this.pageStatus === 'empty') text = this.msg['headlineNone'];
else if (this.pageStatus === 'success' && this.pessoas) text = this.msg['headlinePeople'];
}
if (loading) {
return html`<div class="animate-pulse h-8 w-2/3 rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`;
}
return html`<p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]" aria-live="polite">${text}</p>`;
}
private renderEmpresa() {
const err = this.qryPainelResponsavelError;
let body;
if (err && err.code === 'client.preconditionMissing') {
body = html`<div class="p-4 space-y-3" role="alert" aria-live="polite">
<p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['preconditionTitle']}</p>
<p class="text-[var(--text-muted,currentColor)]">${this.msg['preconditionText']}</p>
<grouptriggeraction--ml-button-standard-102040 data-variant="secondary" size="sm" @action=${() => history.back()}>
<Label>${this.msg['back']}</Label>
</grouptriggeraction--ml-button-standard-102040>
</div>`;
} else if (this.qryPainelResponsavelStatus === 'loading' || (!this.empresa && !err)) {
body = this.skeleton(2);
} else if (err || !this.empresa) {
body = this.errorBox(this.msg['errorPanel'], () => void this.qryPainelResponsavel());
} else if (this.empresa.details.inicio.preparada) {
body = html`<p class="p-4 text-[var(--text-default,currentColor)]">${this.msg['laneCompanyGood']}</p>`;
} else {
body = html`<ul class="divide-y divide-[var(--border-subtle,currentColor)]">
${this.empresa.details.inicio.dadosFaltantes.map(
(d) => html`<li>
<button type="button" class=${rowCls} @click=${() => this.irPrepararEmpresa()}>
<span class="font-medium text-[var(--text-strong,currentColor)]">${d}</span>
<span class="flex items-center gap-4">
<span class="tabular-nums text-[var(--status-error-text,currentColor)]">${this.msg['missingFact']}</span>
<span class="text-[var(--text-muted,currentColor)]">${this.msg['complete']} ›</span>
</span>
</button>
</li>`
)}
</ul>`;
}
const showTitle = !(this.empresa && this.empresa.details.inicio.preparada);
return html`<section data-organism-id="situacaoEmpresa" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
${showTitle
? html`<h2 class="px-4 pt-4 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['laneCompanyTitle']}</h2>`
: nothing}
${body}
</section>`;
}
private renderPessoas() {
const err = this.qryPessoasAguardandoLiberacaoError;
let body;
if (this.qryPessoasAguardandoLiberacaoStatus === 'loading' && !this.pessoas) {
body = this.skeleton(3);
} else if (err) {
const text = err.code === 'client.selectionInvalid' ? this.msg['errorSelection'] : this.msg['errorPeople'];
body = this.errorBox(text, () => void this.qryPessoasAguardandoLiberacao());
} else if (!this.pessoas) {
body = this.skeleton(3);
} else if (this.pageStatus === 'empty') {
body = html`<p class="p-4 text-[var(--text-muted,currentColor)]">${this.msg['lanePeopleEmpty']}</p>`;
} else {
const pg = this.pessoas;
body = html`<ul class="divide-y divide-[var(--border-subtle,currentColor)]">
${pg.items.map((p) => {
const selected = p.id === this.pessoaOrganizacaoId;
const missing = p.details.inicio.dadosFaltantes;
return html`<li>
<button
type="button"
class="${rowCls} ${selected ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)]' : ''}"
aria-current=${selected ? 'true' : 'false'}
@click=${() => this.abrirPessoaParaLiberar(p.id)}
>
<span class="flex flex-col min-w-0">
<span class="font-medium text-[var(--text-strong,currentColor)]">${p.details.identification.name}</span>
<span class="text-sm text-[var(--text-muted,currentColor)]">${p.details.base.contacts} · ${this.statusLabel(p.details.identification.status)}</span>
</span>
<span class="flex items-center gap-4 shrink-0">
<span class="text-right tabular-nums text-[var(--status-error-text,currentColor)]">${missing.length ? missing.join(', ') : this.msg['awaitingRelease']}</span>
<span class="text-[var(--text-muted,currentColor)]">${this.msg['openPerson']} ›</span>
</span>
</button>
</li>`;
})}
</ul>
${pg.hasMore
? html`<div class="p-3 border-t border-[var(--border-subtle,currentColor)]">
<grouptriggeraction--ml-button-standard-102040
data-variant="secondary"
size="sm"
.loading=${this.qryPessoasAguardandoLiberacaoStatus === 'loading'}
@action=${() => void this.qryPessoasAguardandoLiberacao(pg.page + 1, true)}
>
<Label>${this.msg['loadMore']}</Label>
</grouptriggeraction--ml-button-standard-102040>
</div>`
: nothing}`;
}
const showTitle = this.pageStatus !== 'empty';
return html`<section data-organism-id="pessoasAguardandoLiberacao" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
${showTitle
? html`<h2 class="px-4 pt-4 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['lanePeopleTitle']}</h2>`
: nothing}
${body}
</section>`;
}
private renderStrip() {
const ind = this.indicadores;
const pair = (n: number, label: string) => html`<div class="flex items-baseline gap-2">
<dt class="order-2 text-sm text-[var(--text-muted,currentColor)]">${label}</dt>
<dd class="order-1 text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${fmtNumber(n)}</dd>
</div>`;
return html`<section data-organism-id="indicadoresAcessoPessoas" aria-label=${this.msg['stripLabel']} class="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle,currentColor)] pt-4">
${ind
? html`<dl class="flex flex-wrap items-baseline gap-x-8 gap-y-2">
${pair(ind.totalAcessoCompleto, this.msg['stripComplete'])}
${pair(ind.totalComDadosFaltando, this.msg['stripMissing'])}
${pair(ind.totalConsentimentoPendente, this.msg['stripConsent'])}
</dl>`
: html`<div class="animate-pulse h-5 w-80 rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`}
<grouptriggeraction--ml-button-standard-102040 data-variant="link" size="sm" @action=${() => this.verPessoasOrganizacao()}>
<Label>${this.msg['seeAllPeople']}</Label>
</grouptriggeraction--ml-button-standard-102040>
</section>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const name = this.empresa ? this.empresa.details.identification.name : '';
return html`<div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<div class="mx-auto max-w-4xl px-6 py-8 space-y-6">
<header class="space-y-3">
<div class="flex items-baseline gap-3">
<h1 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
${name ? html`<span class="text-sm text-[var(--text-muted,currentColor)]">· ${name}</span>` : nothing}
</div>
${this.renderHeadline()}
</header>
${this.renderEmpresa()} ${this.renderPessoas()} ${this.renderStrip()}
</div>
</div>`;
}
}
