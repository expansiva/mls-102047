/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaDraft, DespesaLoad } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupshowprogress/ml-indeterminate-spinner.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Minhas despesas',
newExpense: 'Nova despesa',
listLabel: 'Despesas registradas',
filterLabel: 'Colaborador',
filterHelper: 'Digite o identificador do colaborador e confirme para filtrar. Deixe vazio para ver todas.',
filterPlaceholder: 'Identificador do colaborador',
colDate: 'Data da despesa',
colCategory: 'Categoria',
colDescription: 'Descrição',
colStatus: 'Situação',
colAmount: 'Valor',
emptyList: 'Você ainda não registrou despesas. Use o botão Nova despesa para começar.',
loadMore: 'Carregar mais despesas',
retry: 'Tentar novamente',
errorTitle: 'Não foi possível concluir',
sceneDetail: 'Detalhe da despesa',
sceneRegister: 'Dados da nova despesa',
sceneCorrect: 'Correção da despesa',
back: 'Voltar ao detalhe',
noSelection: 'Selecione uma despesa na lista para ver os dados e as ações disponíveis.',
fieldDate: 'Data da despesa',
fieldDateHelper: 'Dia em que a despesa foi realizada',
fieldDatePlaceholder: 'Selecione a data',
fieldCategory: 'Categoria',
fieldCategoryPlaceholder: 'Ex.: Transporte, Alimentação',
fieldAmount: 'Valor (R$)',
fieldAmountHelper: 'Valor solicitado para reembolso',
fieldDescription: 'Descrição',
fieldDescriptionPlaceholder: 'Conte o que foi comprado e por quê',
registerAction: 'Registrar despesa',
saveCorrection: 'Salvar correção',
correctAction: 'Corrigir despesa',
sendAction: 'Enviar para aprovação',
resendAction: 'Reenviar para aprovação',
sendHint: 'O gestor da equipe analisa a despesa depois do envio. A despesa precisa ter comprovante.',
resendHint: 'Corrija os dados se necessário e reenvie. O reenvio só pode ser feito uma vez.',
resentNote: 'Esta despesa já foi corrigida e reenviada uma vez. Não é possível reenviar de novo.',
noActions: 'Não há ações disponíveis para a situação atual.',
fieldResent: 'Reenvio realizado',
yes: 'Sim',
no: 'Não',
statusDraft: 'Rascunho',
statusAwaiting: 'Aguardando aprovação',
statusRejected: 'Rejeitada',
statusApproved: 'Aprovada',
statusPaid: 'Paga',
working: 'Processando',
loadingList: 'Carregando despesas'
};
/// **collab_i18n_end**
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
type DetailKey = keyof DespesaDraft['details'];
function lang(): string | undefined {
return document.documentElement.lang || undefined;
}
function fmtDate(v: string): string {
const d = new Date(v.length === 10 ? `${v}T00:00:00` : v);
if (Number.isNaN(d.getTime())) return v;
return new Intl.DateTimeFormat(lang(), { dateStyle: 'short' }).format(d);
}
function fmtMoney(v: string): string {
const n = Number(v);
if (v === '' || Number.isNaN(n)) return v;
return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}
function evValue(e: Event): unknown {
return (e as CustomEvent<{ value?: unknown }>).detail?.value;
}
function patchDraft(d: DespesaDraft, key: DetailKey, value: string | null): DespesaDraft {
return { details: { ...d.details, [key]: value } };
}
function draftFrom(item: DespesaLoad): DespesaDraft {
return {
details: {
dataDespesa: item.details.dataDespesa,
categoria: item.details.categoria,
valor: item.details.valor,
descricao: item.details.descricao
}
};
}
function moneyToNumber(s: string | null): number | null {
if (s === null || s === '') return null;
const n = Number(s);
return Number.isNaN(n) ? null : n;
}
function statusLabel(msg: PageMessageType, s: DespesaLoad['status']): string {
switch (s) {
case 'draft': return msg['statusDraft'];
case 'awaitingApproval': return msg['statusAwaiting'];
case 'rejected': return msg['statusRejected'];
case 'approved': return msg['statusApproved'];
default: return msg['statusPaid'];
}
}
function statusTone(s: DespesaLoad['status']): string {
switch (s) {
case 'draft': return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
case 'approved': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
default: return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
}
}
function statusChip(msg: PageMessageType, s: DespesaLoad['status']) {
return html`<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${statusTone(s)}">${statusLabel(msg, s)}</span>`;
}
@customElement('reembolso-despesas--web--desktop--page11--minhas_despesas-102047')
export class ReembolsoDespesasDesktopPage11Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
private msg: PageMessageType = pageMessage_pt;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6">
<header class="mb-5 flex items-center justify-between gap-4">
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => this.setScenario('registrar')}>
<Label>${this.msg['newExpense']}</Label>
</grouptriggeraction--ml-button-standard>
</header>
<div class="grid grid-cols-[minmax(0,1fr)_420px] gap-6 items-start">
${this.renderList()}
<aside class="sticky top-4">${this.renderPanel()}</aside>
</div>
</div>
`;
}
private renderList() {
const err = this.loadError ?? this.loadMinhasDespesasError;
const idx = this.detalheDespesa === null ? -1 : this.minhasDespesas.findIndex((d) => d.id === this.detalheDespesa);
return html`
<section data-organism-id="listaMinhasDespesas" aria-label=${this.msg['listLabel']}
class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3 min-w-0">
<div class="mb-3">
<groupentertext--ml-enter-text
.value=${this.colaboradorId ?? ''}
placeholder=${this.msg['filterPlaceholder']}
?disabled=${this.loadMinhasDespesasStatus === 'loading'}
@change=${(e: Event) => {
const v = evValue(e);
if (typeof v !== 'string') return;
const t = v.trim();
void this.filterListaMinhasDespesas(t === '' ? null : t);
}}>
<Label>${this.msg['filterLabel']}</Label>
<Helper>${this.msg['filterHelper']}</Helper>
</groupentertext--ml-enter-text>
</div>
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${!!err} .dismissible=${false}>
<Title>${this.msg['errorTitle']}</Title>
<Message>${err?.message ?? ''}</Message>
<Action><button type="button" class="px-3 min-h-[36px] rounded border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.load()}>${this.msg['retry']}</button></Action>
</groupnotifyuser--ml-contextual-feedback>
<groupviewtable--ml-data-table
.value=${idx >= 0 ? String(idx) : ''}
?loading=${this.pageStatus === 'loading'}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const row = this.minhasDespesas[e.detail.index];
this.selectDetalheDespesa(row ? row.id : null);
this.setScenario('consulta');
}}>
<TableHeader>
<TableRow>
<TableHead key="data">${this.msg['colDate']}</TableHead>
<TableHead key="categoria">${this.msg['colCategory']}</TableHead>
<TableHead key="descricao">${this.msg['colDescription']}</TableHead>
<TableHead key="situacao">${this.msg['colStatus']}</TableHead>
<TableHead key="valor" align="right">${this.msg['colAmount']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${this.minhasDespesas.map((d) => html`
<TableRow key=${d.id}>
<TableCell>${fmtDate(d.details.dataDespesa)}</TableCell>
<TableCell>${d.details.categoria}</TableCell>
<TableCell>${d.details.descricao}</TableCell>
<TableCell>${statusChip(this.msg, d.status)}</TableCell>
<TableCell data-class="text-right tabular-nums">${fmtMoney(d.details.valor)}</TableCell>
</TableRow>`)}
</TableBody>
<Empty>${this.msg['emptyList']}</Empty>
<Loading>${this.msg['loadingList']}</Loading>
</groupviewtable--ml-data-table>
${this.hasMoreListaMinhasDespesas ? html`
<div class="mt-3 flex justify-center">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="sm"
?loading=${this.loadMinhasDespesasStatus === 'loading'}
@action=${() => this.loadMoreListaMinhasDespesas()}>
<Label>${this.msg['loadMore']}</Label>
</grouptriggeraction--ml-button-standard>
</div>` : nothing}
</section>
`;
}
private renderPanel() {
return html`
<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
<molecules--ml-scenary-102020 mode="scenary"
.value=${this.scenary || 'consulta'}
.backLabel=${this.msg['back']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="consulta" title=${this.msg['sceneDetail']}>
${this.renderDetail()}
${this.renderActions()}
</Scene>
<Scene value="registrar" title=${this.msg['sceneRegister']} nav="back" backTo="consulta">
${this.renderForm('registrar')}
</Scene>
<Scene value="corrigir" title=${this.msg['sceneCorrect']} nav="back" backTo="consulta">
${this.renderForm('corrigir')}
</Scene>
</molecules--ml-scenary-102020>
</div>
`;
}
private renderDetail() {
const item = this.detalheDespesaItem;
return html`
<div data-organism-id="detalheDespesa" class="mt-2">
${item ? html`
<groupviewcard--ml-vertical-card>
<CardHeader>
<CardTitle>${item.details.categoria}</CardTitle>
<CardDescription>${fmtDate(item.details.dataDespesa)}</CardDescription>
</CardHeader>
<CardContent>
<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['colAmount']}</dt>
<dd class="text-right tabular-nums font-medium text-[var(--text-strong,currentColor)]">${fmtMoney(item.details.valor)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['colStatus']}</dt>
<dd class="text-right">${statusChip(this.msg, item.status)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['fieldResent']}</dt>
<dd class="text-right">${item.details.reenvioRealizado ? this.msg['yes'] : this.msg['no']}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['colDescription']}</dt>
<dd class="text-right break-words">${item.details.descricao}</dd>
</dl>
</CardContent>
</groupviewcard--ml-vertical-card>` : html`
<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${this.msg['noSelection']}</p>`}
</div>
`;
}
private renderActions() {
const item = this.detalheDespesaItem;
const sendLoading = this.enviarParaAprovacaoStatus === 'loading';
const resendLoading = this.reenviarParaAprovacaoStatus === 'loading';
const busy = sendLoading || resendLoading;
const sendErr = this.enviarParaAprovacaoError;
const resendErr = this.reenviarParaAprovacaoError;
return html`
<div data-organism-id="acoesDespesa" class="mt-4" aria-live="polite">
${item && item.status === 'draft' ? html`
<p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg['sendHint']}</p>
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" ?loading=${sendLoading} ?disabled=${busy}
@action=${() => { this.setEnviarParaAprovacaoInput(draftFrom(item)); void this.enviarParaAprovacao(); }}>
<Label>${this.msg['sendAction']}</Label>
</grouptriggeraction--ml-button-standard>` : nothing}
${item && item.status === 'rejected' && !item.details.reenvioRealizado ? html`
<p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg['resendHint']}</p>
<div class="flex gap-2">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" ?disabled=${busy}
@action=${() => { this.setCorrigirDespesaInput(draftFrom(item)); this.setScenario('corrigir'); }}>
<Label>${this.msg['correctAction']}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" ?loading=${resendLoading} ?disabled=${busy}
@action=${() => { this.setReenviarParaAprovacaoInput(draftFrom(item)); void this.reenviarParaAprovacao(); }}>
<Label>${this.msg['resendAction']}</Label>
</grouptriggeraction--ml-button-standard>
</div>` : nothing}
${item && item.status === 'rejected' && item.details.reenvioRealizado ? html`
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['resentNote']}</p>` : nothing}
${item && item.status !== 'draft' && item.status !== 'rejected' ? html`
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['noActions']}</p>` : nothing}
${busy ? html`
<div class="mt-3">
<groupshowprogress--ml-indeterminate-spinner size="sm" label=${this.msg['working']}></groupshowprogress--ml-indeterminate-spinner>
</div>` : nothing}
<div class="mt-3">
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${!!sendErr} .dismissible=${false}>
<Title>${this.msg['errorTitle']}</Title>
<Message>${sendErr?.message ?? ''}</Message>
</groupnotifyuser--ml-contextual-feedback>
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${!!resendErr} .dismissible=${false}>
<Title>${this.msg['errorTitle']}</Title>
<Message>${resendErr?.message ?? ''}</Message>
</groupnotifyuser--ml-contextual-feedback>
</div>
</div>
`;
}
private renderForm(kind: 'registrar' | 'corrigir') {
const isNew = kind === 'registrar';
const draft = isNew ? this.registrarDespesaInput : this.corrigirDespesaInput;
const status = isNew ? this.registrarDespesaStatus : this.corrigirDespesaStatus;
const error = isNew ? this.registrarDespesaError : this.corrigirDespesaError;
const setDraft = (d: DespesaDraft) => (isNew ? this.setRegistrarDespesaInput(d) : this.setCorrigirDespesaInput(d));
const loading = status === 'loading';
const onText = (key: DetailKey) => (e: Event) => {
const v = evValue(e);
if (typeof v !== 'string') return;
setDraft(patchDraft(draft, key, v === '' ? null : v));
};
const submit = () => {
const run = isNew ? this.registrarDespesa() : this.corrigirDespesa();
run.then(() => {
const ok = (isNew ? this.registrarDespesaStatus : this.corrigirDespesaStatus) === 'success';
if (ok) this.setScenario('consulta');
});
};
return html`
<div data-organism-id="formularioDespesa" class="mt-2 flex flex-col gap-4" aria-busy=${loading ? 'true' : 'false'}>
<groupenterdate--ml-date-picker
.value=${draft.details.dataDespesa}
.locale=${lang() ?? ''}
placeholder=${this.msg['fieldDatePlaceholder']}
?disabled=${loading}
required
@change=${(e: Event) => {
const v = evValue(e);
if (v === undefined) return;
setDraft(patchDraft(draft, 'dataDespesa', typeof v === 'string' ? v : null));
}}>
<Label>${this.msg['fieldDate']}</Label>
<Helper>${this.msg['fieldDateHelper']}</Helper>
</groupenterdate--ml-date-picker>
<groupentermoney--ml-enter-money-br
.value=${moneyToNumber(draft.details.valor)}
?disabled=${loading}
required
@change=${(e: Event) => {
const v = evValue(e);
if (typeof v === 'number') setDraft(patchDraft(draft, 'valor', String(v)));
else if (v === null) setDraft(patchDraft(draft, 'valor', null));
}}>
<Label>${this.msg['fieldAmount']}</Label>
<Helper>${this.msg['fieldAmountHelper']}</Helper>
</groupentermoney--ml-enter-money-br>
<groupentertext--ml-enter-text
.value=${draft.details.categoria ?? ''}
placeholder=${this.msg['fieldCategoryPlaceholder']}
?disabled=${loading}
required
@input=${onText('categoria')}
@change=${onText('categoria')}>
<Label>${this.msg['fieldCategory']}</Label>
</groupentertext--ml-enter-text>
<groupentertext--ml-multiline-text
.value=${draft.details.descricao ?? ''}
.rows=${4}
placeholder=${this.msg['fieldDescriptionPlaceholder']}
?disabled=${loading}
required
@input=${onText('descricao')}
@change=${onText('descricao')}>
<Label>${this.msg['fieldDescription']}</Label>
</groupentertext--ml-multiline-text>
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${!!error} .dismissible=${false}>
<Title>${this.msg['errorTitle']}</Title>
<Message>${error?.message ?? ''}</Message>
</groupnotifyuser--ml-contextual-feedback>
<div class="flex items-center gap-3">
<grouptriggeraction--ml-button-standard data-variant="primary" size="md" ?loading=${loading} ?disabled=${loading}
@action=${submit}>
<Label>${isNew ? this.msg['registerAction'] : this.msg['saveCorrection']}</Label>
</grouptriggeraction--ml-button-standard>
${loading ? html`<groupshowprogress--ml-indeterminate-spinner size="sm" label=${this.msg['working']}></groupshowprogress--ml-indeterminate-spinner>` : nothing}
</div>
</div>
`;
}
}
