/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/pessoas_organizacao.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InicioPessoas_organizacaoShared } from '/_102047_/l2/inicio/web/shared/pessoas_organizacao.js';
import type { PessoaResumo, PessoaDetalhe, SituacaoFiltro } from '/_102047_/l2/inicio/web/shared/pessoas_organizacao.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupnavigatesteps/ml-vertical-stepper.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-data-table.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
tituloLista: 'Pessoas da organização',
tituloPessoa: 'Acesso da pessoa',
voltar: 'Voltar às pessoas',
buscaRotulo: 'Buscar pela pessoa',
buscaPlaceholder: 'Digite o nome',
buscaDica: 'Os resultados aparecem na lista abaixo.',
filtroRotulo: 'Situação do acesso',
filtroTodas: 'Todas',
filtroIncompleto: 'Incompleto',
filtroAguardando: 'Aguardando',
colNome: 'Nome',
colPais: 'País',
colAcesso: 'Acesso',
acessoCompleto: 'Completo',
acessoPendente: 'Pendente',
listaVazia: 'Nenhuma pessoa encontrada. Ajuste a busca ou o filtro.',
listaCarregando: 'Carregando pessoas…',
carregarMais: 'Carregar mais pessoas',
tentarNovamente: 'Tentar de novo',
erroLista: 'Não foi possível carregar as pessoas da organização.',
erroBusca: 'Não foi possível atualizar a lista com a busca ou o filtro.',
erroPessoa: 'Não foi possível abrir os dados desta pessoa.',
faltaPreCondicaoTitulo: 'Esta página foi aberta sem o que ela precisa',
faltaPreCondicaoTexto: 'Para ver as pessoas da organização, abra esta página a partir do início ou da preparação da empresa, para que a empresa seja conhecida.',
voltarPaginaAnterior: 'Voltar à página anterior',
pessoaCarregando: 'Carregando os dados da pessoa…',
pessoaNenhuma: 'Toque em uma pessoa da lista para ver o que falta e o andamento da liberação.',
dtPais: 'País',
dtSituacao: 'Situação na plataforma',
dtContatos: 'Contatos',
dtAcesso: 'Acesso completo',
dtConsentimento: 'Consentimento de privacidade exigido',
sim: 'Sim',
nao: 'Não',
semContatos: 'Sem contatos informados',
semInformacao: 'Não informado',
statusActive: 'Ativa',
statusInactive: 'Inativa',
statusMerged: 'Unificada',
statusBlocked: 'Bloqueada',
faltaTitulo: 'O que falta',
completoTitulo: 'Acesso completo',
completoTexto: 'Esta pessoa já informou os dados mínimos.',
andamentoRotulo: 'Andamento da liberação',
etapa1: 'Pedido encaminhado',
etapa1d: 'O pedido de liberação foi encaminhado.',
etapa2: 'Acesso liberado',
etapa2d: 'O responsável liberou o acesso.',
etapa3: 'Login ligado pela plataforma',
etapa3d: 'A plataforma ligou o login à pessoa.',
etapa4: 'Acesso completado',
etapa4d: 'A pessoa completou o acesso.',
avisoLiberacao: 'O acesso de quem aguarda liberação é liberado pela plataforma. Aqui você só acompanha.',
empresaFalta: 'A empresa ainda não está preparada. Falta:',
irEmpresa: 'Voltar à preparação da empresa',
irInicioBtn: 'Voltar ao início',
erroNavegacao: 'Não foi possível abrir essa página agora. Confira se a pessoa e a empresa estão selecionadas.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const STAGES: PessoaDetalhe['etapaLiberacao'][] = ['pedidoEncaminhado', 'acessoLiberado', 'loginLigado', 'acessoCompletado'];
function itemsOf(p: unknown): PessoaResumo[] {
if (Array.isArray(p)) return p as PessoaResumo[];
if (p && typeof p === 'object') {
const it = (p as Record<string, unknown>)['items'];
if (Array.isArray(it)) return it as PessoaResumo[];
}
return [];
}
function hasMoreOf(p: unknown): boolean {
if (p && typeof p === 'object' && !Array.isArray(p)) {
return (p as Record<string, unknown>)['hasMore'] === true;
}
return false;
}
function countryName(code: string): string {
try {
const lang = document.documentElement.lang || undefined;
return new Intl.DisplayNames(lang ? [lang] : undefined, { type: 'region' }).of(code) || code;
} catch {
return code;
}
}
@customElement('inicio--web--mobile--page11--pessoas_organizacao-102047')
export class InicioMobilePage11Pessoas_organizacaoPage extends InicioPessoas_organizacaoShared {
private msg: PageMessageType = pageMessage_pt_br;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<div class="min-h-screen w-full max-w-[430px] mx-auto px-4 py-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'lista'}
backLabel=${this.msg['voltar']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}
>
<Scene value="lista" title=${this.msg['tituloLista']}>${this.renderLista()}</Scene>
<Scene value="pessoa" title=${this.msg['tituloPessoa']} nav="back">${this.renderPessoa()}</Scene>
</molecules--ml-scenary-102020>
</div>
`;
}
private chip(kind: 'success' | 'warning' | 'error' | 'neutral', text: string) {
const cls =
kind === 'success'
? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
: kind === 'warning'
? 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'
: kind === 'error'
? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
return html`<span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${cls}">${text}</span>`;
}
private statusLabel(s: PessoaDetalhe['details']['identification']['status']) {
switch (s) {
case 'Active': return this.chip('success', this.msg['statusActive']);
case 'Inactive': return this.chip('neutral', this.msg['statusInactive']);
case 'Merged': return this.chip('neutral', this.msg['statusMerged']);
default: return this.chip('error', this.msg['statusBlocked']);
}
}
private renderLista() {
const err = this.abrirPessoasOrganizacaoError;
if (this.pageStatus === 'error' && err) {
if (err.code === 'client.preconditionMissing') {
return html`
<section data-organism-id="listaPessoas" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex flex-col gap-3" aria-live="polite">
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['faltaPreCondicaoTitulo']}</h2>
<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['faltaPreCondicaoTexto']}</p>
<button type="button" class="min-h-[44px] rounded-md px-4 border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => window.history.back()}>${this.msg['voltarPaginaAnterior']}</button>
</section>
`;
}
return html`
<section data-organism-id="listaPessoas" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex flex-col gap-3" aria-live="polite">
<p class="text-sm">${this.msg['erroLista']}</p>
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full" @action=${() => this.abrirPessoasOrganizacao()}>
<Label>${this.msg['tentarNovamente']}</Label>
</grouptriggeraction--ml-button-standard>
</section>
`;
}
const rows = itemsOf(this.pessoas);
const selIdx = this.selectedPessoaOrganizacao ? rows.findIndex((r) => r.id === this.selectedPessoaOrganizacao) : -1;
const busy = this.pageStatus === 'loading' || this.buscarPessoasStatus === 'loading';
return html`
<section data-organism-id="listaPessoas" class="flex flex-col gap-4" aria-busy=${busy ? 'true' : 'false'}>
<groupsearchcontent--ml-search-bar
.value=${this.filtroBusca || null}
placeholder=${this.msg['buscaPlaceholder']}
@search=${(e: CustomEvent<{ query: string }>) => this.buscarPessoas({ busca: e.detail.query })}
@change=${(e: CustomEvent<{ value: string | null }>) => this.buscarPessoas({ busca: e.detail.value ?? '' })}
@clear=${() => this.buscarPessoas({ busca: '' })}
>
<Label>${this.msg['buscaRotulo']}</Label>
<Empty>${this.msg['buscaDica']}</Empty>
</groupsearchcontent--ml-search-bar>
<groupselectone--ml-segmented-control
variant="segmented"
.value=${this.filtroSituacao}
@change=${(e: CustomEvent<{ value: string | null }>) => {
const v = e.detail.value;
if (v === 'todas' || v === 'acessoIncompleto' || v === 'aguardandoLiberacao') {
this.buscarPessoas({ situacao: v as SituacaoFiltro });
}
}}
>
<Label>${this.msg['filtroRotulo']}</Label>
<Item value="todas">${this.msg['filtroTodas']}</Item>
<Item value="acessoIncompleto">${this.msg['filtroIncompleto']}</Item>
<Item value="aguardandoLiberacao">${this.msg['filtroAguardando']}</Item>
</groupselectone--ml-segmented-control>
${this.buscarPessoasStatus === 'error'
? html`<div class="flex flex-col gap-2" aria-live="polite">
<p class="text-sm">${this.msg['erroBusca']}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.buscarPessoas()}>
<Label>${this.msg['tentarNovamente']}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: nothing}
<groupviewtable--ml-responsive-data-table
.value=${selIdx >= 0 ? String(selIdx) : ''}
?loading=${busy}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const p = rows[e.detail.index];
if (p) {
this.selectPessoaOrganizacao(p.id);
this.setScenario('pessoa');
}
}}
>
<TableHeader>
<TableRow>
<TableHead key="nome">${this.msg['colNome']}</TableHead>
<TableHead key="pais">${this.msg['colPais']}</TableHead>
<TableHead key="acesso">${this.msg['colAcesso']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${rows.map((p) => html`
<TableRow key=${p.id}>
<TableCell><span class="font-medium text-[var(--text-strong,currentColor)]">${p.details.identification.name}</span></TableCell>
<TableCell>${countryName(p.details.identification.countryCode)}</TableCell>
<TableCell>${p.details.inicio.acessoCompleto
? this.chip('success', this.msg['acessoCompleto'])
: this.chip('warning', this.msg['acessoPendente'])}</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>${this.msg['listaVazia']}</Empty>
<Loading>${this.msg['listaCarregando']}</Loading>
</groupviewtable--ml-responsive-data-table>
${hasMoreOf(this.pessoas)
? html`<grouptriggeraction--ml-button-standard
data-variant="secondary"
size="lg"
data-class="w-full"
?loading=${this.buscarPessoasStatus === 'loading'}
@action=${() => this.buscarPessoas({ append: true })}
>
<Label>${this.msg['carregarMais']}</Label>
</grouptriggeraction--ml-button-standard>`
: nothing}
</section>
`;
}
private renderPessoa() {
const p = this.pessoa;
const selected = this.selectedPessoaOrganizacao;
if (this.obterPessoaStatus === 'loading') {
return html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-busy="true" aria-live="polite">${this.msg['pessoaCarregando']}</p>`;
}
if (this.obterPessoaStatus === 'error') {
return html`
<div class="flex flex-col gap-3" aria-live="polite">
<p class="text-sm">${this.msg['erroPessoa']}</p>
${selected
? html`<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full" @action=${() => this.selectPessoaOrganizacao(selected)}>
<Label>${this.msg['tentarNovamente']}</Label>
</grouptriggeraction--ml-button-standard>`
: nothing}
</div>
`;
}
if (!p) {
return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['pessoaNenhuma']}</p>`;
}
const stageIdx = STAGES.indexOf(p.etapaLiberacao);
const stepKeys: { t: string; d: string }[] = [
{ t: this.msg['etapa1'], d: this.msg['etapa1d'] },
{ t: this.msg['etapa2'], d: this.msg['etapa2d'] },
{ t: this.msg['etapa3'], d: this.msg['etapa3d'] },
{ t: this.msg['etapa4'], d: this.msg['etapa4d'] }
];
const inicio = p.details.inicio;
const ident = p.details.identification;
const contatos = p.contacts.map((c) => c.details.base.contacts).filter((c) => !!c);
return html`
<div class="flex flex-col gap-5">
<section data-organism-id="detalhePessoa" class="flex flex-col gap-3">
<groupviewcard--ml-profile-card>
<CardHeader>
<CardTitle>${ident.name}</CardTitle>
<CardDescription>${countryName(ident.countryCode)}</CardDescription>
</CardHeader>
<CardContent>
<dl class="grid grid-cols-1 gap-3 text-sm">
<div class="flex items-center justify-between gap-3">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['dtSituacao']}</dt>
<dd>${this.statusLabel(ident.status)}</dd>
</div>
<div class="flex items-center justify-between gap-3">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['dtAcesso']}</dt>
<dd>${inicio.acessoCompleto
? this.chip('success', this.msg['acessoCompleto'])
: this.chip('warning', this.msg['acessoPendente'])}</dd>
</div>
<div class="flex items-center justify-between gap-3">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['dtConsentimento']}</dt>
<dd class="font-medium text-[var(--text-strong,currentColor)]">${inicio.consentimentoExigido ? this.msg['sim'] : this.msg['nao']}</dd>
</div>
<div class="flex flex-col gap-1">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['dtContatos']}</dt>
<dd class="text-[var(--text-strong,currentColor)] break-words">${contatos.length
? contatos.map((c) => html`<div>${c}</div>`)
: this.msg['semContatos']}</dd>
</div>
</dl>
</CardContent>
</groupviewcard--ml-profile-card>
${inicio.acessoCompleto
? html`<groupnotifyuser--ml-contextual-feedback type="success" visible .dismissible=${false}>
<Title>${this.msg['completoTitulo']}</Title>
<Message>${this.msg['completoTexto']}</Message>
</groupnotifyuser--ml-contextual-feedback>`
: html`<groupnotifyuser--ml-contextual-feedback type="warning" visible .dismissible=${false}>
<Title>${this.msg['faltaTitulo']}</Title>
<Message>${inicio.dadosFaltantes.join(', ')}</Message>
</groupnotifyuser--ml-contextual-feedback>`}
</section>
<section data-organism-id="andamentoLiberacao">
<groupnavigatesteps--ml-vertical-stepper .value=${stageIdx < 0 ? 0 : stageIdx} .linear=${false}>
<Label>${this.msg['andamentoRotulo']}</Label>
${stepKeys.map((s, i) => html`<Step title=${s.t} description=${s.d} ?completed=${i < stageIdx || p.etapaLiberacao === 'acessoCompletado'}></Step>`)}
</groupnavigatesteps--ml-vertical-stepper>
</section>
${this.renderAcoes()}
</div>
`;
}
private renderAcoes() {
const emp = this.empresa;
const faltaEmpresa = emp && !emp.details.inicio.preparada;
const err = this.abrirPessoasOrganizacaoError;
return html`
<section data-organism-id="acoesLiberacao" class="flex flex-col gap-3">
<groupnotifyuser--ml-contextual-feedback type="info" visible .dismissible=${false}>
<Message>${this.msg['avisoLiberacao']}</Message>
</groupnotifyuser--ml-contextual-feedback>
${faltaEmpresa && emp
? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['empresaFalta']} ${emp.details.inicio.dadosFaltantes.join(', ')}</p>`
: nothing}
<grouptriggeraction--ml-button-standard
data-variant=${faltaEmpresa ? 'primary' : 'secondary'}
size="lg"
data-class="w-full"
@action=${() => this.irPrepararEmpresa()}
>
<Label>${this.msg['irEmpresa']}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard
data-variant=${faltaEmpresa ? 'secondary' : 'primary'}
size="lg"
data-class="w-full"
@action=${() => this.irInicio()}
>
<Label>${this.msg['irInicioBtn']}</Label>
</grouptriggeraction--ml-button-standard>
${err ? html`<p class="text-sm" role="alert" aria-live="polite">${this.msg['erroNavegacao']}</p>` : nothing}
</section>
`;
}
}
