/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
CmdCriarTarefaDraft,
ErrorState,
ItemChecklistDraft,
TarefaDetalhe,
TarefaFiltro,
TarefaResumo,
} from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Minhas tarefas',
pageSubtitle: 'Tarefas que criei ou pelas quais sou responsável: acompanhe prazo, situação e checklist sem sair da página.',
criarTarefa: 'Criar tarefa',
filtroTodas: 'Todas',
filtroCriadas: 'Criadas por mim',
filtroAtribuidas: 'Atribuídas a mim',
filtroRevisao: 'Em revisão',
filtroDevolvidas: 'Devolvidas',
colTarefa: 'Tarefa',
colResponsavel: 'Responsável',
colPrioridade: 'Prioridade',
colPrazo: 'Prazo',
colSituacao: 'Situação',
criadaPor: 'Criada por',
checklist: 'Checklist',
subtarefas: 'subtarefas',
venceHoje: 'Vence hoje',
atrasada: 'Atrasada',
devolvida: 'Devolvida',
status_aFazer: 'A fazer',
status_emAndamento: 'Em andamento',
status_emRevisao: 'Em revisão',
status_concluida: 'Concluída',
status_cancelada: 'Cancelada',
prio_low: 'Baixa',
prio_medium: 'Média',
prio_high: 'Alta',
semValor: '—',
emptyTodas: 'Você ainda não tem tarefas. Crie a primeira para começar.',
emptyFiltro: 'Nenhuma tarefa neste filtro.',
carregando: 'Carregando tarefas…',
carregarMais: 'Carregar mais tarefas',
erroLista: 'Não foi possível carregar suas tarefas.',
tentarNovamente: 'Tentar de novo',
precondTitulo: 'Faltam informações para abrir suas tarefas',
precondTexto: 'Esta página foi aberta sem o contexto de que precisa. Volte para a página de onde você veio e abra as tarefas por lá.',
voltar: 'Voltar',
sceneDetalhe: 'Detalhes da tarefa',
sceneNova: 'Nova tarefa',
sceneEditar: 'Ajustar tarefa',
voltarDetalhes: 'Voltar aos detalhes',
selecioneTarefa: 'Escolha uma tarefa na lista para ver os detalhes, o checklist e o que fazer em seguida.',
carregandoTarefa: 'Abrindo a tarefa…',
erroTarefa: 'Não foi possível abrir a tarefa.',
editarTarefa: 'Editar tarefa',
lista: 'Lista',
prazo: 'Prazo',
responsavel: 'Responsável',
criadaEm: 'Criada em',
descricao: 'Descrição',
semDescricao: 'Sem descrição.',
motivoDevolucao: 'Motivo da devolução',
devolvidaEm: 'Devolvida em',
checklistVazia: 'Esta tarefa não tem itens no checklist.',
marcarItens: 'Marcar itens',
marcadoEm: 'Marcado em',
acoesTitulo: 'Próximos passos',
iniciar: 'Iniciar tarefa',
enviarRevisao: 'Enviar para revisão',
reenviarRevisao: 'Reenviar para revisão',
aceitar: 'Aceitar entrega',
devolver: 'Devolver para ajuste',
motivoLabel: 'Motivo para devolver',
motivoHelper: 'Explique o que precisa ser ajustado; o responsável lê este texto ao retomar.',
motivoPlaceholder: 'O que precisa mudar?',
cancelarTarefa: 'Cancelar tarefa…',
cancelarAviso: 'A tarefa deixa de andar no fluxo e não poderá ser retomada.',
cancelarSim: 'Sim, cancelar esta tarefa',
semAcoes: 'Nenhuma ação de ciclo disponível para você nesta tarefa agora.',
processando: 'Processando…',
salvando: 'Salvando…',
okAcao: 'Pronto, a tarefa foi atualizada.',
historico: 'Percurso da tarefa',
colQuando: 'Quando',
colEvento: 'O que aconteceu',
evCriada: 'Tarefa criada por',
evDevolvida: 'Devolvida para ajuste',
evConcluida: 'Entrega aceita e tarefa concluída',
evCancelada: 'Tarefa cancelada',
secaoDados: 'Informações da tarefa',
secaoChecklist: 'Itens do checklist',
secaoChecklistInicial: 'Checklist inicial',
fieldLista: 'Lista',
phLista: 'Escolha a lista',
emptyListas: 'Nenhuma lista ativa encontrada',
fieldTitulo: 'Título',
fieldDescricao: 'Descrição',
fieldPrioridade: 'Prioridade',
fieldPrazo: 'Prazo',
phPrazo: 'Escolha a data',
fieldResponsavel: 'Responsável',
phResponsavel: 'Digite o nome para buscar',
emptyMembros: 'Nenhum membro encontrado',
helperResponsavel: 'Só quem criou a tarefa ou o gestor troca o responsável.',
itemDescricao: 'O que precisa ser feito',
feito: 'Feito',
subir: 'Subir item',
descer: 'Descer item',
removerItem: 'Remover item',
adicionarItem: 'Adicionar item',
registrarTarefa: 'Registrar tarefa',
salvarTarefa: 'Salvar tarefa',
salvarChecklist: 'Salvar checklist',
checklistSalva: 'Checklist salvo.',
camposObrigatorios: 'Preencha lista, título, prioridade, prazo e responsável para continuar.',
erroGenerico: 'Não foi possível concluir. Tente de novo.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
'pt-br': pageMessage_pt_br,
};
/// **collab_i18n_end**
type Opc = { id: string; nome: string };
type Campos = Pick<CmdCriarTarefaDraft, 'listaId' | 'titulo' | 'details' | 'prioridade' | 'prazo' | 'responsavelId'>;
const FILTROS: { value: string; key: keyof PageMessageType }[] = [
{ value: 'todas', key: 'filtroTodas' },
{ value: 'criadasPorMim', key: 'filtroCriadas' },
{ value: 'atribuidasAMim', key: 'filtroAtribuidas' },
{ value: 'emRevisao', key: 'filtroRevisao' },
{ value: 'devolvidas', key: 'filtroDevolvidas' },
];
const CARD = 'rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]';
const BTN =
'inline-flex min-h-10 items-center justify-center rounded-md px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:cursor-not-allowed disabled:opacity-50';
const VARIANTES: Record<'primary' | 'secondary' | 'danger', string> = {
primary: 'bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)]',
secondary:
'border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)]',
danger: 'bg-[var(--button-danger-bg,transparent)] text-[var(--button-danger-text,currentColor)]',
};
const STATUS_CLASS: Record<TarefaResumo['status'], string> = {
aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};
function fmtData(v?: string | null): string {
if (!v) return '';
const d = new Date(v.length === 10 ? `${v}T00:00:00` : v);
if (Number.isNaN(d.getTime())) return v;
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}
function fmtDataHora(v?: string | null): string {
if (!v) return '';
const d = new Date(v);
if (Number.isNaN(d.getTime())) return v;
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'short', timeStyle: 'short' }).format(d);
}
/** Value of a molecule event: undefined when the event carries none (native events). */
function valorDe(e: Event): string | null | undefined {
const det = (e as CustomEvent<{ value?: unknown }>).detail;
if (!det || typeof det !== 'object' || !('value' in det)) return undefined;
return typeof det.value === 'string' ? det.value : null;
}
function boolDe(e: Event): boolean | undefined {
const det = (e as CustomEvent<{ value?: unknown }>).detail;
if (!det || typeof det !== 'object') return undefined;
return typeof det.value === 'boolean' ? det.value : undefined;
}
function renumerar(itens: ItemChecklistDraft[]): ItemChecklistDraft[] {
return itens.map((it, i) => ({ ...it, ordem: i + 1 }));
}
function mover(itens: ItemChecklistDraft[], i: number, delta: number): ItemChecklistDraft[] {
const j = i + delta;
if (j < 0 || j >= itens.length) return itens;
const c = [...itens];
[c[i], c[j]] = [c[j], c[i]];
return renumerar(c);
}
function novoItem(itens: ItemChecklistDraft[]): ItemChecklistDraft[] {
return renumerar([...itens, { id: null, version: null, details: { descricao: '' }, ordem: 0, feito: false }]);
}
function camposValidos(d: Campos): boolean {
return !!(d.listaId && (d.titulo ?? '').trim() && d.prioridade && d.prazo && d.responsavelId);
}
let membroTimer: ReturnType<typeof setTimeout> | undefined;
function debounced(fn: () => void, ms: number) {
if (membroTimer) clearTimeout(membroTimer);
membroTimer = setTimeout(fn, ms);
}
@customElement('tarefas--web--desktop--page11--minhas_tarefas-102047')
export class TarefasDesktopPage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const precond = this.qryMinhasTarefasError?.code === 'client.preconditionMissing';
return html`
<div class="min-h-screen bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
<header class="mb-5 flex items-start justify-between gap-4">
<div>
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageSubtitle}</p>
</div>
${precond ? nothing : this.botao(this.msg.criarTarefa, 'primary', false, () => this.abrirNova())}
</header>
${precond
? this.renderPrecondicao()
: html`<div class="grid items-start gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,1fr)]">
${this.renderLista()} ${this.renderPainel()}
</div>`}
</div>
`;
}
private abrirNova() {
this.clearCmdCriarTarefaDraft();
if (this.listas.length === 0) this.qryListasAtivas();
this.setScenario('nova');
}
private botao(rotulo: string, variante: 'primary' | 'secondary' | 'danger', ocupado: boolean, acao: () => void, desabilitado = false) {
return html`<button
type="button"
class="${BTN} ${VARIANTES[variante]}"
?disabled=${ocupado || desabilitado}
aria-busy=${ocupado ? 'true' : 'false'}
@click=${acao}
>
${ocupado ? this.msg.processando : rotulo}
</button>`;
}
private aviso(erro: ErrorState, ok: string | null) {
return html`<div aria-live="polite">
${erro
? html`<p role="alert" class="border-l-4 border-[var(--status-error-text,currentColor)] pl-3 text-sm font-medium text-[var(--text-strong,currentColor)]">
${erro.message || this.msg.erroGenerico}
</p>`
: ok
? html`<p class="text-sm text-[var(--status-success-text,currentColor)]">${ok}</p>`
: nothing}
</div>`;
}
private renderPrecondicao() {
return html`<section class="${CARD} max-w-xl p-6" role="alert">
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.precondTitulo}</h2>
<p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg.precondTexto}</p>
<div class="mt-4">${this.botao(this.msg.voltar, 'secondary', false, () => history.back())}</div>
</section>`;
}
// ---------- list ----------
private renderLista() {
const items = this.tarefas?.items ?? [];
const idx = items.findIndex((t) => t.id === this.selectedTarefa);
const carregando = this.pageStatus === 'loading' || this.qryMinhasTarefasStatus === 'loading';
return html`<section data-organism-id="listaTarefas" class="${CARD} min-w-0 p-4" aria-busy=${carregando ? 'true' : 'false'}>
<groupnavigatesection--ml-navigate-pills-102040
.value=${this.filtro ?? 'todas'}
@change=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') this.qryMinhasTarefas(v === 'todas' ? null : (v as TarefaFiltro));
}}
>
${FILTROS.map((f) => html`<Tab value=${f.value} title=${this.msg[f.key]}></Tab>`)}
</groupnavigatesection--ml-navigate-pills-102040>
${this.qryMinhasTarefasStatus === 'error'
? html`<div class="my-3 flex items-center gap-3" role="alert">
<p class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.erroLista}</p>
${this.botao(this.msg.tentarNovamente, 'secondary', false, () => this.qryMinhasTarefas())}
</div>`
: nothing}
<div class="mt-3">
<groupviewtable--ml-data-table-102040
.value=${idx >= 0 ? String(idx) : ''}
.loading=${carregando}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const t = this.tarefas?.items[e.detail.index];
if (t) {
this.setScenario('detalhe');
this.qryTarefa(t.id);
}
}}
>
<TableHeader>
<TableRow>
<TableHead key="titulo">${this.msg.colTarefa}</TableHead>
<TableHead key="responsavel">${this.msg.colResponsavel}</TableHead>
<TableHead key="prioridade">${this.msg.colPrioridade}</TableHead>
<TableHead key="prazo">${this.msg.colPrazo}</TableHead>
<TableHead key="status">${this.msg.colSituacao}</TableHead>
</TableRow>
</TableHeader>
<TableBody>${items.map((t) => this.renderLinha(t))}</TableBody>
<Empty>
<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">
${this.pageStatus === 'empty' ? this.msg.emptyTodas : this.msg.emptyFiltro}
</p>
</Empty>
<Loading>
<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.carregando}</p>
</Loading>
</groupviewtable--ml-data-table-102040>
</div>
${this.tarefas?.hasMore
? html`<div class="mt-3 flex justify-center">
${this.botao(this.msg.carregarMais, 'secondary', this.qryMinhasTarefasStatus === 'loading', () =>
this.qryMinhasTarefas(undefined, (this.tarefas?.page ?? 0) + 1, true),
)}
</div>`
: nothing}
</section>`;
}
private renderLinha(t: TarefaResumo) {
const prioKey = `prio_${t.prioridade}` as keyof PageMessageType;
const statusKey = `status_${t.status}` as keyof PageMessageType;
return html`<TableRow key=${t.id}>
<TableCell>
<div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
<div class="text-xs text-[var(--text-muted,currentColor)]">
${t.lista.nome} · ${this.msg.checklist} ${t.details.progressoChecklist} · ${t.details.quantidadeSubtarefas} ${this.msg.subtarefas}
</div>
</TableCell>
<TableCell>
<div>${t.responsavel.details.identification.name}</div>
<div class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.criadaPor} ${t.criador.details.identification.name}</div>
</TableCell>
<TableCell>${this.msg[prioKey]}</TableCell>
<TableCell>
<span class=${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}>${fmtData(t.prazo)}</span>
${t.details.atrasada ? html`<span class="sr-only">${this.msg.atrasada}</span>` : nothing}
${t.details.venceHoje ? html`<div class="text-xs font-medium">${this.msg.venceHoje}</div>` : nothing}
</TableCell>
<TableCell>
<span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[t.status]}">${this.msg[statusKey]}</span>
${t.details.devolvidaEm ? html`<div class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${this.msg.devolvida}</div>` : nothing}
</TableCell>
</TableRow>`;
}
// ---------- side panel ----------
private renderPainel() {
return html`<aside class="${CARD} min-w-0 p-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || 'detalhe'}
backLabel=${this.msg.voltarDetalhes}
@change=${(e: CustomEvent<{ value: string }>) => {
if (e.target === e.currentTarget) this.setScenario(e.detail.value);
}}
>
<Scene value="detalhe" title=${this.msg.sceneDetalhe}>${this.renderDetalhe()}</Scene>
<Scene value="nova" title=${this.msg.sceneNova} nav="back" backTo="detalhe">${this.renderNova()}</Scene>
<Scene value="editar" title=${this.msg.sceneEditar} nav="back" backTo="detalhe">${this.renderEditar()}</Scene>
</molecules--ml-scenary-102020>
</aside>`;
}
private renderDetalhe() {
const t = this.tarefa;
let corpo;
if (this.qryTarefaStatus === 'loading') {
corpo = html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg.carregandoTarefa}</p>`;
} else if (this.qryTarefaStatus === 'error') {
corpo = html`<div class="flex items-center gap-3 py-4" role="alert">
<p class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.erroTarefa}</p>
${this.botao(this.msg.tentarNovamente, 'secondary', false, () => this.qryTarefa(this.selectedTarefa))}
</div>`;
} else if (!t) {
corpo = html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${this.msg.selecioneTarefa}</p>`;
} else {
corpo = this.renderTarefaAberta(t);
}
return html`
<div class="space-y-5">
<div data-organism-id="detalheTarefa">${corpo}</div>
<div data-organism-id="acoesTarefa">${t && this.qryTarefaStatus !== 'loading' ? this.renderAcoes(t) : nothing}</div>
<div data-organism-id="historicoTarefa">${t && this.qryTarefaStatus !== 'loading' ? this.renderHistorico(t) : nothing}</div>
</div>
`;
}
private renderTarefaAberta(t: TarefaDetalhe) {
const statusKey = `status_${t.status}` as keyof PageMessageType;
const prioKey = `prio_${t.prioridade}` as keyof PageMessageType;
return html`
<div class="space-y-4">
<div class="flex items-start justify-between gap-3">
<div class="min-w-0">
<h3 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${t.titulo}</h3>
<div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
<span class="rounded-full px-2 py-0.5 font-medium ${STATUS_CLASS[t.status]}">${this.msg[statusKey]}</span>
<span class="text-[var(--text-muted,currentColor)]">${this.msg.colPrioridade}: ${this.msg[prioKey]}</span>
</div>
</div>
${this.botao(this.msg.editarTarefa, 'secondary', false, () => this.setScenario('editar'))}
</div>
${t.details.motivoDevolucao
? html`<groupnotifyuser--ml-contextual-feedback-102040 type="warning" .visible=${true} .dismissible=${false}>
<Title>${this.msg.motivoDevolucao}</Title>
<Message>
${t.details.motivoDevolucao}${t.details.devolvidaEm ? html` (${this.msg.devolvidaEm} ${fmtDataHora(t.details.devolvidaEm)})` : nothing}
</Message>
</groupnotifyuser--ml-contextual-feedback-102040>`
: nothing}
<dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.lista}</dt>
<dd>${t.lista.nome}</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.prazo}</dt>
<dd>${fmtData(t.prazo) || this.msg.semValor}</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.criadaPor}</dt>
<dd>${t.criador.details.identification.name}</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.responsavel}</dt>
<dd>${t.responsavel.details.identification.name}</dd>
</div>
<div>
<dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.criadaEm}</dt>
<dd>${fmtDataHora(t.criadaEm) || this.msg.semValor}</dd>
</div>
</dl>
<div>
<h4 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.descricao}</h4>
<p class="whitespace-pre-wrap text-sm">${t.details.descricao || this.msg.semDescricao}</p>
</div>
<div>
<div class="mb-2 flex items-center justify-between gap-3">
<h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.checklist}</h4>
${t.checklist.length > 0
? html`<button
type="button"
class="min-h-10 rounded-md px-2 text-sm font-medium text-[var(--link-text,currentColor)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@click=${() => this.setScenario('editar')}
>
${this.msg.marcarItens}
</button>`
: nothing}
</div>
${t.checklist.length === 0
? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.checklistVazia}</p>`
: html`<ul class="space-y-1">
${t.checklist.map(
(i) => html`<li>
<groupenterboolean--ml-checkbox-preference-102040 .value=${i.feito} .disabled=${true}>
<Label>${i.details.descricao}</Label>
${i.feito && i.details.marcadoEm ? html`<Helper>${this.msg.marcadoEm} ${fmtDataHora(i.details.marcadoEm)}</Helper>` : nothing}
</groupenterboolean--ml-checkbox-preference-102040>
</li>`,
)}
</ul>`}
</div>
</div>
`;
}
private renderAcoes(t: TarefaDetalhe) {
const aberta = t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
const podeIniciar = t.souResponsavel && t.status === 'aFazer';
const podeEnviar = t.souResponsavel && t.status === 'emAndamento';
const podeRevisar = t.souCriador && t.status === 'emRevisao';
const podeCancelar = t.souCriador && aberta;
const nenhuma = !podeIniciar && !podeEnviar && !podeRevisar && !podeCancelar;
const erro = this.cmdIniciarError ?? this.cmdEnviarRevisaoError ?? this.cmdAceitarError ?? this.cmdDevolverError ?? this.cmdCancelarError;
const sucesso =
this.cmdIniciarStatus === 'success' ||
this.cmdEnviarRevisaoStatus === 'success' ||
this.cmdAceitarStatus === 'success' ||
this.cmdDevolverStatus === 'success' ||
this.cmdCancelarStatus === 'success';
const motivo = this.cmdDevolverDraft.details.motivoDevolucao ?? '';
return html`
<section class="space-y-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
<h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.acoesTitulo}</h4>
${nenhuma ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.semAcoes}</p>` : nothing}
<div class="flex flex-wrap gap-2">
${podeIniciar ? this.botao(this.msg.iniciar, 'primary', this.cmdIniciarStatus === 'loading', () => this.cmdIniciar()) : nothing}
${podeEnviar
? this.botao(
t.details.devolvidaEm ? this.msg.reenviarRevisao : this.msg.enviarRevisao,
'primary',
this.cmdEnviarRevisaoStatus === 'loading',
() => this.cmdEnviarRevisao(),
)
: nothing}
${podeRevisar ? this.botao(this.msg.aceitar, 'primary', this.cmdAceitarStatus === 'loading', () => this.cmdAceitar()) : nothing}
</div>
${podeRevisar
? html`<div class="space-y-2">
<groupentertext--ml-multiline-text-102040
.rows=${3}
.value=${motivo}
placeholder=${this.msg.motivoPlaceholder}
@input=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') this.setCmdDevolverDraft({ details: { motivoDevolucao: v } });
}}
@change=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') this.setCmdDevolverDraft({ details: { motivoDevolucao: v } });
}}
>
<Label>${this.msg.motivoLabel}</Label>
<Helper>${this.msg.motivoHelper}</Helper>
</groupentertext--ml-multiline-text-102040>
${this.botao(this.msg.devolver, 'secondary', this.cmdDevolverStatus === 'loading', () => this.cmdDevolver(), !motivo.trim())}
</div>`
: nothing}
${podeCancelar
? html`<details class="rounded-md border border-[var(--border-subtle,currentColor)] p-2">
<summary
class="min-h-10 cursor-pointer list-none rounded-md px-2 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
>
${this.msg.cancelarTarefa}
</summary>
<div class="mt-2 space-y-2 px-2 pb-2">
<p class="text-sm"><strong>${t.titulo}</strong></p>
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.cancelarAviso}</p>
${this.botao(this.msg.cancelarSim, 'danger', this.cmdCancelarStatus === 'loading', () => this.cmdCancelar())}
</div>
</details>`
: nothing}
${this.aviso(erro, sucesso ? this.msg.okAcao : null)}
</section>
`;
}
private renderHistorico(t: TarefaDetalhe) {
const eventos: { quando: string; texto: string }[] = [
{ quando: t.criadaEm, texto: `${this.msg.evCriada} ${t.criador.details.identification.name}` },
];
if (t.details.devolvidaEm) {
eventos.push({
quando: t.details.devolvidaEm,
texto: t.details.motivoDevolucao ? `${this.msg.evDevolvida}: ${t.details.motivoDevolucao}` : this.msg.evDevolvida,
});
}
if (t.details.concluidaEm) eventos.push({ quando: t.details.concluidaEm, texto: this.msg.evConcluida });
if (t.details.canceladaEm) eventos.push({ quando: t.details.canceladaEm, texto: this.msg.evCancelada });
return html`<section class="border-t border-[var(--border-subtle,currentColor)] pt-4">
<h4 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.historico}</h4>
<groupviewdata--ml-timeline-view-102040>
<Columns>
<Column field="quando" header=${this.msg.colQuando} width="140px"></Column>
<Column field="evento" header=${this.msg.colEvento}></Column>
</Columns>
<Rows>
${eventos.map(
(ev) => html`<Row>
<Cell>${fmtDataHora(ev.quando)}</Cell>
<Cell>${ev.texto}</Cell>
</Row>`,
)}
</Rows>
</groupviewdata--ml-timeline-view-102040>
</section>`;
}
// ---------- forms ----------
private renderNova() {
const d = this.cmdCriarTarefaDraft;
const valido = camposValidos(d);
return html`<div data-organism-id="formTarefa" class="space-y-5">
<section class="space-y-4">
${this.renderCampos(
d,
(p) => this.setCmdCriarTarefaDraft({ ...this.cmdCriarTarefaDraft, ...p }),
null,
null,
)}
</section>
<section class="space-y-2">
<h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.secaoChecklistInicial}</h4>
${this.renderChecklistEditor(d.checklist, (itens) => this.setCmdCriarTarefaDraft({ ...this.cmdCriarTarefaDraft, checklist: itens }), false)}
</section>
${valido ? nothing : html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.camposObrigatorios}</p>`}
${this.aviso(this.cmdCriarTarefaError, null)}
${this.botao(this.msg.registrarTarefa, 'primary', this.cmdCriarTarefaStatus === 'loading', () => {
this.cmdCriarTarefa().then(() => {
if (this.cmdCriarTarefaStatus === 'success') this.setScenario('detalhe');
});
}, !valido)}
</div>`;
}
private renderEditar() {
const t = this.tarefa;
if (!t) {
return html`<div data-organism-id="formTarefa"><p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${this.msg.selecioneTarefa}</p></div>`;
}
const d = this.cmdSalvarEdicaoDraft;
const cl = this.cmdSalvarChecklistDraft;
const valido = camposValidos(d);
const itemVazio = cl.itens.some((i) => !(i.details.descricao ?? '').trim());
return html`<div data-organism-id="formTarefa" class="space-y-6">
<section class="space-y-4">
<h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.secaoDados}</h4>
${this.renderCampos(
d,
(p) => this.setCmdSalvarEdicaoDraft({ ...this.cmdSalvarEdicaoDraft, ...p }),
{ id: t.listaId, nome: t.lista.nome },
{ id: t.responsavelId, nome: t.responsavel.details.identification.name },
)}
${valido ? nothing : html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.camposObrigatorios}</p>`}
${this.aviso(this.cmdSalvarEdicaoError, null)}
${this.botao(this.msg.salvarTarefa, 'primary', this.cmdSalvarEdicaoStatus === 'loading', () => {
this.cmdSalvarEdicao().then(() => {
if (this.cmdSalvarEdicaoStatus === 'success') this.setScenario('detalhe');
});
}, !valido)}
</section>
<section class="space-y-2 border-t border-[var(--border-subtle,currentColor)] pt-4">
<h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.secaoChecklist}</h4>
${this.renderChecklistEditor(cl.itens, (itens) => this.setCmdSalvarChecklistDraft({ ...this.cmdSalvarChecklistDraft, itens }), true)}
${this.aviso(this.cmdSalvarChecklistError, this.cmdSalvarChecklistStatus === 'success' ? this.msg.checklistSalva : null)}
${this.botao(this.msg.salvarChecklist, 'primary', this.cmdSalvarChecklistStatus === 'loading', () => this.cmdSalvarChecklist(), itemVazio)}
</section>
</div>`;
}
private renderCampos(d: Campos, onPatch: (p: Partial<Campos>) => void, listaAtual: Opc | null, membroAtual: Opc | null) {
const listas: Opc[] = this.listas.map((l) => ({ id: l.id, nome: l.nome }));
if (listaAtual && !listas.some((l) => l.id === listaAtual.id)) listas.unshift(listaAtual);
const membros: Opc[] = this.membros.map((m) => ({ id: m.id, nome: m.details.identification.name }));
if (membroAtual && !membros.some((m) => m.id === membroAtual.id)) membros.unshift(membroAtual);
const prazoMin = d.prazo ?? null;
return html`
<groupselectone--ml-select-one-autocomplete-102040
.value=${d.listaId ?? null}
placeholder=${this.msg.phLista}
.loading=${this.qryListasAtivasStatus === 'loading'}
@change=${(e: Event) => {
const v = valorDe(e);
if (v !== undefined) onPatch({ listaId: v });
}}
>
<Label>${this.msg.fieldLista}</Label>
${listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
<Empty>${this.msg.emptyListas}</Empty>
</groupselectone--ml-select-one-autocomplete-102040>
<groupentertext--ml-enter-text-102040
.value=${d.titulo ?? ''}
@input=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') onPatch({ titulo: v });
}}
@change=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') onPatch({ titulo: v });
}}
>
<Label>${this.msg.fieldTitulo}</Label>
</groupentertext--ml-enter-text-102040>
<groupentertext--ml-multiline-text-102040
.rows=${4}
.value=${d.details.descricao ?? ''}
@input=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') onPatch({ details: { descricao: v } });
}}
@change=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') onPatch({ details: { descricao: v } });
}}
>
<Label>${this.msg.fieldDescricao}</Label>
</groupentertext--ml-multiline-text-102040>
<div class="grid grid-cols-2 gap-4">
<groupselectone--ml-segmented-control-102040
.value=${d.prioridade ?? null}
@change=${(e: Event) => {
const v = valorDe(e);
if (v !== undefined) onPatch({ prioridade: v as Campos['prioridade'] });
}}
>
<Label>${this.msg.fieldPrioridade}</Label>
<Item value="low">${this.msg.prio_low}</Item>
<Item value="medium">${this.msg.prio_medium}</Item>
<Item value="high">${this.msg.prio_high}</Item>
</groupselectone--ml-segmented-control-102040>
<groupenterdate--ml-date-picker-102040
.value=${prazoMin}
locale=${document.documentElement.lang || 'pt-BR'}
placeholder=${this.msg.phPrazo}
@change=${(e: Event) => {
const v = valorDe(e);
if (v !== undefined) onPatch({ prazo: v });
}}
>
<Label>${this.msg.fieldPrazo}</Label>
</groupenterdate--ml-date-picker-102040>
</div>
<groupselectone--ml-combobox-102040
.value=${d.responsavelId ?? null}
placeholder=${this.msg.phResponsavel}
.loading=${this.qryBuscarMembrosStatus === 'loading'}
@input=${(e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') debounced(() => this.qryBuscarMembros(v), 300);
}}
@change=${(e: Event) => {
const v = valorDe(e);
if (v !== undefined) onPatch({ responsavelId: v });
}}
>
<Label>${this.msg.fieldResponsavel}</Label>
<Helper>${this.msg.helperResponsavel}</Helper>
${membros.map((m) => html`<Item value=${m.id}>${m.nome}</Item>`)}
<Empty>${this.msg.emptyMembros}</Empty>
</groupselectone--ml-combobox-102040>
`;
}
private renderChecklistEditor(itens: ItemChecklistDraft[], onChange: (i: ItemChecklistDraft[]) => void, comMarcar: boolean) {
const miniBtn =
'inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-default,currentColor)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-40';
return html`
<ul class="space-y-2">
${itens.map((it, i) => {
const editar = (e: Event) => {
const v = valorDe(e);
if (typeof v === 'string') onChange(itens.map((x, j) => (j === i ? { ...x, details: { ...x.details, descricao: v } } : x)));
};
return html`<li class="flex items-center gap-2">
${comMarcar
? html`<groupenterboolean--ml-checkbox-preference-102040
.value=${it.feito === true}
@change=${(e: Event) => {
const v = boolDe(e);
if (v !== undefined) onChange(itens.map((x, j) => (j === i ? { ...x, feito: v } : x)));
}}
>
<Label>${this.msg.feito}</Label>
</groupenterboolean--ml-checkbox-preference-102040>`
: nothing}
<div class="min-w-0 flex-1">
<groupentertext--ml-enter-text-102040 .value=${it.details.descricao ?? ''} placeholder=${this.msg.itemDescricao} @input=${editar} @change=${editar}></groupentertext--ml-enter-text-102040>
</div>
<button type="button" class=${miniBtn} aria-label=${this.msg.subir} ?disabled=${i === 0} @click=${() => onChange(mover(itens, i, -1))}>↑</button>
<button type="button" class=${miniBtn} aria-label=${this.msg.descer} ?disabled=${i === itens.length - 1} @click=${() => onChange(mover(itens, i, 1))}>↓</button>
${it.id === null
? html`<button type="button" class=${miniBtn} aria-label=${this.msg.removerItem} @click=${() => onChange(renumerar(itens.filter((_, j) => j !== i)))}>✕</button>`
: nothing}
</li>`;
})}
</ul>
<div>${this.botao(this.msg.adicionarItem, 'secondary', false, () => onChange(novoItem(itens)))}</div>
`;
}
}
