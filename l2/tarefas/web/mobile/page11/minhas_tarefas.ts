/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
TarefaAberta,
TarefaStatus,
TarefaPrioridade,
TarefasFiltroChange,
MembroNome,
RequestStatus,
ErrorState,
SalvarNovaTarefaDraft,
SalvarEdicaoTarefaDraft,
} from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-compact-calendar.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
minhasTarefas: 'Minhas tarefas',
filtroTodas: 'Todas',
filtroCriadas: 'Criadas por mim',
filtroAtribuidas: 'Atribuídas a mim',
filtroRevisao: 'Em revisão',
filtroDevolvidas: 'Devolvidas',
criarTarefa: 'Criar tarefa',
carregarMais: 'Carregar mais tarefas',
carregando: 'Carregando…',
listaVazia: 'Nenhuma tarefa por aqui. Ajuste o filtro ou crie uma tarefa.',
colTarefa: 'Tarefa',
colPrazo: 'Prazo',
colSituacao: 'Situação',
colChecklist: 'Checklist',
atrasada: 'Atrasada',
venceHoje: 'Vence hoje',
devolvida: 'Devolvida para ajuste',
voltar: 'Voltar',
voltarTelaAnterior: 'Voltar à tela anterior',
tentarNovamente: 'Tentar novamente',
erroLista: 'Não foi possível carregar suas tarefas.',
erroPrecondicao: 'Esta tela foi aberta sem o que precisa para carregar as tarefas. Volte à tela anterior e abra de novo.',
erroTarefa: 'Não foi possível abrir a tarefa.',
erroGenerico: 'Não foi possível concluir. Tente novamente.',
erroObrigatorio: 'Preencha os campos obrigatórios.',
erroMotivo: 'Informe o motivo da devolução.',
statusAFazer: 'A fazer',
statusEmAndamento: 'Em andamento',
statusEmRevisao: 'Em revisão',
statusConcluida: 'Concluída',
statusCancelada: 'Cancelada',
prioridadeLow: 'Baixa',
prioridadeMedium: 'Média',
prioridadeHigh: 'Alta',
tituloTarefa: 'Tarefa',
tituloNova: 'Nova tarefa',
tituloAjustar: 'Ajustar tarefa',
semTarefaAberta: 'Nenhuma tarefa aberta. Volte à lista e escolha uma.',
campoSituacao: 'Situação',
campoPrioridade: 'Prioridade',
campoPrazo: 'Prazo',
campoLista: 'Lista',
campoResponsavel: 'Responsável',
campoCriador: 'Criada por',
campoDescricao: 'Descrição',
campoTitulo: 'Título',
semDescricao: 'Sem descrição.',
motivoDevolucao: 'Motivo da devolução',
checklist: 'Checklist',
semChecklist: 'Esta tarefa não tem itens na checklist.',
marcadoEm: 'Marcado em',
iniciarTarefa: 'Iniciar tarefa',
enviarRevisao: 'Enviar para revisão',
reenviarRevisao: 'Reenviar para revisão',
aceitarEntrega: 'Aceitar entrega',
devolverComMotivo: 'Devolver com motivo',
porQueDevolver: 'Por que está devolvendo?',
cancelarTarefa: 'Cancelar tarefa',
editarTarefa: 'Editar tarefa',
confirmaCancelar: 'Cancelar a tarefa',
confirmaAviso: 'Ela não poderá ser retomada.',
encerrada: 'Esta tarefa está encerrada e não tem mais ações.',
okIniciada: 'Tarefa iniciada.',
okRevisao: 'Tarefa enviada para revisão.',
okAceita: 'Entrega aceita. A tarefa foi concluída.',
okDevolvida: 'Tarefa devolvida ao responsável.',
okCancelada: 'Tarefa cancelada.',
historico: 'Histórico',
colQuando: 'Quando',
colEvento: 'Evento',
evCriada: 'Tarefa criada',
evDevolvida: 'Devolvida para ajuste',
evConcluida: 'Entrega aceita, tarefa concluída',
evCancelada: 'Tarefa cancelada',
escolhaLista: 'Escolha a lista',
semListas: 'Nenhuma lista disponível.',
ajudaResponsavel: 'Digite o nome para buscar a pessoa.',
buscarResponsavel: 'Buscar por nome',
semMembros: 'Nenhuma pessoa encontrada.',
itemChecklist: 'Item',
adicionarItem: 'Adicionar item',
removerItem: 'Remover item',
registrarTarefa: 'Registrar tarefa',
salvarAlteracoes: 'Salvar alterações',
descartar: 'Descartar',
};
/// **collab_i18n_end**
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
type Msg = PageMessageType;
type FormDraft = SalvarNovaTarefaDraft | SalvarEdicaoTarefaDraft;
function lang() {
return document.documentElement.lang || undefined;
}
function fmtDate(v?: string | null) {
if (!v) return '';
const d = new Date(v.length === 10 ? `${v}T00:00:00` : v);
if (Number.isNaN(d.getTime())) return v;
return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}
function fmtDateTime(v?: string | null) {
if (!v) return '';
const d = new Date(v);
if (Number.isNaN(d.getTime())) return v;
return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}
function nome(m: MembroNome) {
return m.details.identification.details.identification.name;
}
function onValue<T>(fn: (v: T) => void) {
return (e: Event) => {
const d = (e as CustomEvent<{ value?: T }>).detail;
if (d && typeof d === 'object' && 'value' in d) fn(d.value as T);
};
}
function statusLabel(msg: Msg, s: TarefaStatus) {
switch (s) {
case 'aFazer': return msg['statusAFazer'];
case 'emAndamento': return msg['statusEmAndamento'];
case 'emRevisao': return msg['statusEmRevisao'];
case 'concluida': return msg['statusConcluida'];
default: return msg['statusCancelada'];
}
}
function prioridadeLabel(msg: Msg, p: TarefaPrioridade) {
switch (p) {
case 'low': return msg['prioridadeLow'];
case 'medium': return msg['prioridadeMedium'];
default: return msg['prioridadeHigh'];
}
}
function chipClass(s: TarefaStatus) {
switch (s) {
case 'emAndamento': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
case 'emRevisao': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
case 'concluida': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
default: return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}
}
function chip(msg: Msg, s: TarefaStatus) {
return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${chipClass(s)}">${statusLabel(msg, s)}</span>`;
}
function filtroAtual(f: { c: boolean | null; a: boolean | null; s: TarefaStatus | null; d: boolean | null }) {
if (f.c) return 'criadas';
if (f.a) return 'atribuidas';
if (f.s === 'emRevisao') return 'revisao';
if (f.d) return 'devolvidas';
return 'todas';
}
function filtroDe(v: string): TarefasFiltroChange {
return {
criadasPorMim: v === 'criadas' ? true : null,
atribuidasAMim: v === 'atribuidas' ? true : null,
status: v === 'revisao' ? 'emRevisao' : null,
somenteDevolvidas: v === 'devolvidas' ? true : null,
};
}
function erroTexto(msg: Msg, err: ErrorState) {
if (!err) return '';
return err.code === 'client.requiredMissing' ? msg['erroObrigatorio'] : msg['erroGenerico'];
}
function completo(d: FormDraft) {
return !!(d.titulo && d.titulo.trim() && d.listaId && d.prioridade && d.prazo && d.responsavelId);
}
function botao(label: string, variant: string, loading: boolean, onAction: () => void, disabled = false) {
return html`<grouptriggeraction--ml-button-standard
data-variant=${variant}
size="lg"
data-class="w-full"
.loading=${loading}
.disabled=${disabled}
@action=${onAction}
><Label>${label}</Label></grouptriggeraction--ml-button-standard>`;
}
function eventos(msg: Msg, t: TarefaAberta) {
const out: { quando: string; titulo: string; nota: string }[] = [];
out.push({ quando: fmtDateTime(t.criadaEm), titulo: msg['evCriada'], nota: `${msg['campoCriador']} ${nome(t.criador)}` });
const d = t.details.details;
if (d.devolvidaEm) out.push({ quando: fmtDateTime(d.devolvidaEm), titulo: msg['evDevolvida'], nota: d.motivoDevolucao ?? '' });
if (d.concluidaEm) out.push({ quando: fmtDateTime(d.concluidaEm), titulo: msg['evConcluida'], nota: '' });
if (d.canceladaEm) out.push({ quando: fmtDateTime(d.canceladaEm), titulo: msg['evCancelada'], nota: '' });
return out;
}
const cardBox = 'rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3';
@customElement('tarefas--web--mobile--page11--minhas_tarefas-102047')
export class TarefasMobilePage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<div class="w-full min-h-screen px-4 py-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'lista'}
.backLabel=${this.msg['voltar']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}
>
<Scene value="lista" title=${this.msg['minhasTarefas']}>${this.renderLista()}</Scene>
<Scene value="tarefa" title=${this.msg['tituloTarefa']} nav="back" backTo="lista">${this.renderTarefaAberta()}</Scene>
<Scene value="criar" title=${this.msg['tituloNova']} nav="back" backTo="lista">${this.renderFormCriar()}</Scene>
<Scene value="editar" title=${this.msg['tituloAjustar']} nav="back" backTo="tarefa">${this.renderFormEditar()}</Scene>
</molecules--ml-scenary-102020>
</div>
`;
}
private renderLista() {
const m = this.msg;
const items = this.tarefas?.items ?? [];
const selIdx = items.findIndex(t => t.id === this.selectedTarefa);
const err = this.minhasTarefasError;
const precond = err?.code === 'client.preconditionMissing';
const loading = this.minhasTarefasStatus === 'loading';
const atual = filtroAtual({ c: this.criadasPorMim, a: this.atribuidasAMim, s: this.status, d: this.somenteDevolvidas });
return html`
<div class="flex flex-col gap-4 pb-6">
${botao(m['criarTarefa'], 'primary', false, () => this.setScenario('criar'))}
<div data-organism-id="tarefasLista" class="flex flex-col gap-3" aria-busy=${loading ? 'true' : 'false'}>
<groupnavigatesection--ml-navigate-pills
.value=${atual}
@change=${onValue<string>(v => { this.minhasTarefas(filtroDe(v)); })}
>
<Tab value="todas" title=${m['filtroTodas']}></Tab>
<Tab value="criadas" title=${m['filtroCriadas']}></Tab>
<Tab value="atribuidas" title=${m['filtroAtribuidas']}></Tab>
<Tab value="revisao" title=${m['filtroRevisao']}></Tab>
<Tab value="devolvidas" title=${m['filtroDevolvidas']}></Tab>
</groupnavigatesection--ml-navigate-pills>
${err
? html`<div role="alert" class="${cardBox} flex flex-col gap-3 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
<p class="text-sm">${precond ? m['erroPrecondicao'] : m['erroLista']}</p>
${precond
? botao(m['voltarTelaAnterior'], 'secondary', false, () => history.back())
: botao(m['tentarNovamente'], 'secondary', loading, () => { this.minhasTarefas(); })}
</div>`
: nothing}
<div class=${loading && items.length ? 'opacity-60' : ''}>
<groupviewtable--ml-responsive-table
.value=${selIdx >= 0 ? String(selIdx) : ''}
.loading=${loading && items.length === 0}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const t = items[e.detail.index];
if (t) {
this.selectTarefa(t.id);
this.setScenario('tarefa');
}
}}
>
<TableHeader>
<TableRow>
<TableHead key="tarefa">${m['colTarefa']}</TableHead>
<TableHead key="prazo">${m['colPrazo']}</TableHead>
<TableHead key="situacao">${m['colSituacao']}</TableHead>
<TableHead key="checklist">${m['colChecklist']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${items.map(t => html`
<TableRow key=${t.id}>
<TableCell>
<div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
<div class="text-xs text-[var(--text-muted,currentColor)]">${t.lista.nome} · ${nome(t.responsavel)} · ${prioridadeLabel(m, t.prioridade)}</div>
${t.details.details.devolvidaEm
? html`<div class="text-xs font-medium text-[var(--text-default,currentColor)]">${m['devolvida']}</div>`
: nothing}
</TableCell>
<TableCell>
<span class=${t.details.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}>${fmtDate(t.prazo)}</span>
${t.details.details.atrasada
? html`<div class="text-xs text-[var(--status-error-text,currentColor)]">${m['atrasada']}</div>`
: t.details.details.venceHoje
? html`<div class="text-xs font-semibold">${m['venceHoje']}</div>`
: nothing}
</TableCell>
<TableCell>${chip(m, t.status)}</TableCell>
<TableCell>${t.details.details.progressoChecklist}</TableCell>
</TableRow>
`)}
</TableBody>
<Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['listaVazia']}</div></Empty>
<Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['carregando']}</div></Loading>
</groupviewtable--ml-responsive-table>
</div>
${this.tarefas?.hasMore
? botao(m['carregarMais'], 'secondary', loading, () => { this.minhasTarefas(undefined, (this.tarefas?.page ?? 1) + 1, true); })
: nothing}
</div>
</div>
`;
}
private renderTarefaAberta() {
const m = this.msg;
const t = this.tarefa;
const loading = this.tarefaAbertaStatus === 'loading';
const err = this.tarefaAbertaError;
let detalhe;
if (loading) {
detalhe = html`<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${m['carregando']}</p>`;
} else if (err) {
detalhe = html`<div role="alert" class="${cardBox} flex flex-col gap-3 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
<p class="text-sm">${err.code === 'client.preconditionMissing' ? m['erroPrecondicao'] : m['erroTarefa']}</p>
${err.code === 'client.preconditionMissing'
? botao(m['voltarTelaAnterior'], 'secondary', false, () => history.back())
: botao(m['tentarNovamente'], 'secondary', false, () => { if (this.selectedTarefa) this.tarefaAberta(this.selectedTarefa); })}
</div>`;
} else if (!t) {
detalhe = html`<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['semTarefaAberta']}</p>`;
} else {
detalhe = this.renderDetalhe(t);
}
const ok = !loading && !err && t;
return html`
<div class="flex flex-col gap-4 pb-8">
<div data-organism-id="tarefaDetalhe">${detalhe}</div>
<div data-organism-id="tarefaAcoes">${ok ? this.renderAcoes(t) : nothing}</div>
<div data-organism-id="tarefaHistorico">${ok ? this.renderHistorico(t) : nothing}</div>
</div>
`;
}
private renderDetalhe(t: TarefaAberta) {
const m = this.msg;
const d = t.details.details;
const busy = this.marcarItemChecklistStatus === 'loading';
return html`
<div class="flex flex-col gap-4">
<groupviewcard--ml-vertical-card>
<CardHeader>
<CardTitle>${t.titulo}</CardTitle>
<CardDescription>${t.lista.nome}</CardDescription>
</CardHeader>
<CardContent>
<div class="mb-3 flex flex-wrap items-center gap-2">
${chip(m, t.status)}
<span class="text-xs text-[var(--text-muted,currentColor)]">${m['campoPrioridade']}: ${prioridadeLabel(m, t.prioridade)}</span>
</div>
<dl class="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm">
<dt class="text-[var(--text-muted,currentColor)]">${m['campoPrazo']}</dt>
<dd class="text-[var(--text-strong,currentColor)]">${fmtDate(t.prazo)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${m['campoResponsavel']}</dt>
<dd class="text-[var(--text-strong,currentColor)]">${nome(t.responsavel)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${m['campoCriador']}</dt>
<dd class="text-[var(--text-strong,currentColor)]">${nome(t.criador)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${m['campoDescricao']}</dt>
<dd>${d.descricao ?? m['semDescricao']}</dd>
</dl>
</CardContent>
</groupviewcard--ml-vertical-card>
${d.motivoDevolucao
? html`<div class="${cardBox} bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">
<p class="text-xs font-semibold">${m['motivoDevolucao']}${d.devolvidaEm ? html` · ${fmtDateTime(d.devolvidaEm)}` : nothing}</p>
<p class="mt-1 text-sm">${d.motivoDevolucao}</p>
</div>`
: nothing}
<section class=${cardBox}>
<div class="mb-1 flex items-center justify-between gap-2">
<h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m['checklist']}</h3>
<span class="text-sm text-[var(--text-muted,currentColor)]">${d.progressoChecklist}</span>
</div>
${t.checklist.length === 0
? html`<p class="py-2 text-sm text-[var(--text-muted,currentColor)]">${m['semChecklist']}</p>`
: html`<ul class="flex flex-col">
${t.checklist.map(item => html`
<li class="min-h-[44px] flex flex-col justify-center py-1">
<groupenterboolean--ml-checkbox-preference
.value=${item.feito}
.disabled=${busy}
@change=${onValue<boolean>(v => { this.marcarItemChecklist(item.id, v); })}
>
<Label>${item.details.details.descricao}</Label>
${item.feito && item.details.details.marcadoEm
? html`<Helper>${m['marcadoEm']} ${fmtDateTime(item.details.details.marcadoEm)}</Helper>`
: nothing}
</groupenterboolean--ml-checkbox-preference>
</li>
`)}
</ul>`}
</section>
</div>
`;
}
private renderFeedback() {
const m = this.msg;
const motivoObrigatorio = this.devolverComMotivoError?.code === 'client.requiredMissing';
const itens: [RequestStatus, ErrorState, string][] = [
[this.iniciarTarefaStatus, this.iniciarTarefaError, m['okIniciada']],
[this.enviarParaRevisaoStatus, this.enviarParaRevisaoError, m['okRevisao']],
[this.aceitarEntregaStatus, this.aceitarEntregaError, m['okAceita']],
[this.devolverComMotivoStatus, motivoObrigatorio ? null : this.devolverComMotivoError, m['okDevolvida']],
[this.cancelarTarefaStatus, this.cancelarTarefaError, m['okCancelada']],
[this.marcarItemChecklistStatus, this.marcarItemChecklistError, ''],
];
const erro = itens.find(i => i[0] === 'error' && i[1]);
const sucesso = itens.find(i => i[0] === 'success' && i[2]);
const tipo = erro ? 'error' : 'success';
const texto = erro ? erroTexto(m, erro[1]) : sucesso ? sucesso[2] : '';
return html`<div aria-live="polite">
${texto
? html`<groupnotifyuser--ml-contextual-feedback .type=${tipo} .visible=${true} .dismissible=${false}>
<Message>${texto}</Message>
</groupnotifyuser--ml-contextual-feedback>`
: nothing}
</div>`;
}
private renderAcoes(t: TarefaAberta) {
const m = this.msg;
const s = t.status;
const aberta = s === 'aFazer' || s === 'emAndamento' || s === 'emRevisao';
const motivo = this.devolverComMotivoDraft.details.motivoDevolucao ?? '';
const motivoErro = this.devolverComMotivoError?.code === 'client.requiredMissing' ? m['erroMotivo'] : '';
return html`
<div class="flex flex-col gap-3">
${this.renderFeedback()}
${s === 'aFazer'
? botao(m['iniciarTarefa'], 'primary', this.iniciarTarefaStatus === 'loading', () => { this.iniciarTarefa(); })
: nothing}
${s === 'emAndamento'
? botao(
t.details.details.motivoDevolucao ? m['reenviarRevisao'] : m['enviarRevisao'],
'primary',
this.enviarParaRevisaoStatus === 'loading',
() => { this.enviarParaRevisao(); },
)
: nothing}
${s === 'emRevisao'
? html`
${botao(m['aceitarEntrega'], 'primary', this.aceitarEntregaStatus === 'loading', () => { this.aceitarEntrega(); })}
<div class="${cardBox} flex flex-col gap-3">
<groupentertext--ml-multiline-text
.rows=${3}
.value=${motivo}
.error=${motivoErro}
@change=${onValue<string>(v => this.setDevolverComMotivoDraft({ details: { motivoDevolucao: v } }))}
>
<Label>${m['porQueDevolver']}</Label>
</groupentertext--ml-multiline-text>
${botao(m['devolverComMotivo'], 'secondary', this.devolverComMotivoStatus === 'loading', () => { this.devolverComMotivo(); }, !motivo.trim())}
</div>`
: nothing}
${!aberta ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m['encerrada']}</p>` : nothing}
${botao(m['editarTarefa'], 'secondary', false, () => this.setScenario('editar'))}
${aberta
? botao(m['cancelarTarefa'], 'danger', this.cancelarTarefaStatus === 'loading', () => {
if (window.confirm(`${m['confirmaCancelar']} “${t.titulo}”? ${m['confirmaAviso']}`)) this.cancelarTarefa();
})
: nothing}
</div>
`;
}
private renderHistorico(t: TarefaAberta) {
const m = this.msg;
const ev = eventos(m, t);
return html`
<details class="${cardBox} p-0">
<summary class="flex min-h-[44px] cursor-pointer items-center px-3 text-sm font-semibold text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${m['historico']}</summary>
<div class="px-3 pb-3">
<groupviewdata--ml-timeline-view>
<Columns>
<Column field="quando" header=${m['colQuando']}></Column>
<Column field="evento" header=${m['colEvento']}></Column>
</Columns>
<Rows>
${ev.map(e => html`
<Row>
<Cell><span class="text-xs text-[var(--text-muted,currentColor)]">${e.quando}</span></Cell>
<Cell>
<div class="text-sm font-medium text-[var(--text-strong,currentColor)]">${e.titulo}</div>
${e.nota ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${e.nota}</div>` : nothing}
</Cell>
</Row>
`)}
</Rows>
</groupviewdata--ml-timeline-view>
</div>
</details>
`;
}
private renderFormCriar() {
const m = this.msg;
const draft = this.salvarNovaTarefaDraft;
const err = this.salvarNovaTarefaError;
return html`
<div data-organism-id="tarefaForm" class="flex flex-col gap-4">
${this.renderCampos(draft, d => this.setSalvarNovaTarefaDraft(d), null)}
<div class="sticky bottom-0 -mx-4 flex flex-col gap-2 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-3">
<div aria-live="polite">
${err
? html`<groupnotifyuser--ml-contextual-feedback .type=${'error'} .visible=${true} .dismissible=${false}>
<Message>${erroTexto(m, err)}</Message>
</groupnotifyuser--ml-contextual-feedback>`
: nothing}
</div>
${botao(m['registrarTarefa'], 'primary', this.salvarNovaTarefaStatus === 'loading', () => {
this.salvarNovaTarefa().then(() => {
if (this.salvarNovaTarefaStatus === 'success') this.setScenario('tarefa');
});
}, !completo(draft))}
${botao(m['descartar'], 'secondary', false, () => {
this.limparSalvarNovaTarefaDraft();
this.setScenario('lista');
})}
</div>
</div>
`;
}
private renderFormEditar() {
const m = this.msg;
const t = this.tarefa;
const draft = this.salvarEdicaoTarefaDraft;
const err = this.salvarEdicaoTarefaError;
if (!t) {
return html`<div data-organism-id="tarefaForm"><p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['semTarefaAberta']}</p></div>`;
}
return html`
<div data-organism-id="tarefaForm" class="flex flex-col gap-4">
${this.renderCampos(draft, d => this.setSalvarEdicaoTarefaDraft(d), { id: t.responsavelId, nome: nome(t.responsavel) })}
<div class="sticky bottom-0 -mx-4 flex flex-col gap-2 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-3">
<div aria-live="polite">
${err
? html`<groupnotifyuser--ml-contextual-feedback .type=${'error'} .visible=${true} .dismissible=${false}>
<Message>${erroTexto(m, err)}</Message>
</groupnotifyuser--ml-contextual-feedback>`
: nothing}
</div>
${botao(m['salvarAlteracoes'], 'primary', this.salvarEdicaoTarefaStatus === 'loading', () => {
this.salvarEdicaoTarefa().then(() => {
if (this.salvarEdicaoTarefaStatus === 'success') this.setScenario('tarefa');
});
}, !completo(draft))}
${botao(m['descartar'], 'secondary', false, () => {
this.restaurarSalvarEdicaoTarefaDraft();
this.setScenario('tarefa');
})}
</div>
</div>
`;
}
private renderCampos<D extends FormDraft>(draft: D, set: (d: D) => void, atual: { id: string; nome: string } | null) {
const m = this.msg;
const membroAtualFora = atual && draft.responsavelId === atual.id && !this.membros.some(x => x.responsavelId === atual.id);
return html`
<div class="flex flex-col gap-4">
<groupselectone--ml-select
.value=${draft.listaId}
.loading=${this.opcoesFormularioStatus === 'loading'}
@change=${onValue<string | null>(v => set({ ...draft, listaId: v }))}
>
<Label>${m['campoLista']}</Label>
<Trigger>${m['escolhaLista']}</Trigger>
${this.listas.map(l => html`<Item value=${l.tarefa.listaId}>${l.nome}</Item>`)}
<Empty>${m['semListas']}</Empty>
</groupselectone--ml-select>
<groupentertext--ml-floating-text-input
.value=${draft.titulo ?? ''}
@change=${onValue<string>(v => set({ ...draft, titulo: v }))}
>
<Label>${m['campoTitulo']}</Label>
</groupentertext--ml-floating-text-input>
<groupentertext--ml-multiline-text
.rows=${4}
.value=${draft.details.descricao ?? ''}
@change=${onValue<string>(v => set({ ...draft, details: { ...draft.details, descricao: v } }))}
>
<Label>${m['campoDescricao']}</Label>
</groupentertext--ml-multiline-text>
<groupselectone--ml-segmented-control
.value=${draft.prioridade}
@change=${onValue<string | null>(v => set({ ...draft, prioridade: v as TarefaPrioridade | null }))}
>
<Label>${m['campoPrioridade']}</Label>
<Item value="low">${m['prioridadeLow']}</Item>
<Item value="medium">${m['prioridadeMedium']}</Item>
<Item value="high">${m['prioridadeHigh']}</Item>
</groupselectone--ml-segmented-control>
<groupenterdate--ml-compact-calendar
.value=${draft.prazo}
.locale=${lang() ?? ''}
.firstDayOfWeek=${1}
@change=${onValue<string | null>(v => set({ ...draft, prazo: v }))}
>
<Label>${m['campoPrazo']}</Label>
</groupenterdate--ml-compact-calendar>
<groupselectone--ml-select-one-autocomplete
.value=${draft.responsavelId}
.placeholder=${m['buscarResponsavel']}
@change=${onValue<string | null>(v => {
if (v === null || v === '') {
set({ ...draft, responsavelId: null });
return;
}
const conhecido = this.membros.some(x => x.responsavelId === v) || (atual !== null && atual.id === v);
if (conhecido) {
set({ ...draft, responsavelId: v });
} else if (typeof v === 'string' && v.trim().length > 1) {
this.buscarResponsaveis(v.trim());
}
})}
>
<Label>${m['campoResponsavel']}</Label>
<Helper>${m['ajudaResponsavel']}</Helper>
${membroAtualFora && atual ? html`<Item value=${atual.id}>${atual.nome}</Item>` : nothing}
${this.membros.map(x => html`<Item value=${x.responsavelId}>${nome(x)}</Item>`)}
<Empty>${m['semMembros']}</Empty>
</groupselectone--ml-select-one-autocomplete>
<fieldset class="flex flex-col gap-3">
<legend class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m['checklist']}</legend>
${draft.checklist.map((item, i) => html`
<div class="flex items-start gap-2">
<div class="min-w-0 flex-1">
<groupentertext--ml-floating-text-input
.value=${item.details.details.descricao ?? ''}
@change=${onValue<string>(v => set({
...draft,
checklist: draft.checklist.map((x, j) => (j === i ? { ...x, details: { details: { descricao: v } } } : x)),
}))}
>
<Label>${m['itemChecklist']} ${i + 1}</Label>
</groupentertext--ml-floating-text-input>
</div>
<button
type="button"
class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
aria-label=${m['removerItem']}
@click=${() => set({
...draft,
checklist: draft.checklist.filter((_, j) => j !== i).map((x, j) => ({ ...x, ordem: j + 1 })),
})}
><span aria-hidden="true">×</span></button>
</div>
`)}
${botao(m['adicionarItem'], 'secondary', false, () => set({
...draft,
checklist: [
...draft.checklist,
{ id: null, version: null, ordem: draft.checklist.length + 1, details: { details: { descricao: '' } } },
],
}))}
</fieldset>
</div>
`;
}
}
