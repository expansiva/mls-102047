/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { MembroResumo, TarefaDetalhe, TarefaPrioridade, TarefaQuadroItem, TarefaStatus } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-data-table.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
sceneQuadro: 'Tarefas da equipe',
sceneTarefa: 'Detalhe da tarefa',
voltar: 'Voltar às tarefas',
buscarPlaceholder: 'Buscar pelo título da tarefa',
buscarLabel: 'Título',
filtros: 'Filtros',
situacao: 'Situação',
lista: 'Lista',
responsavel: 'Responsável',
prioridade: 'Prioridade',
prazo: 'Prazo',
todasListas: 'Todas as listas',
todosResponsaveis: 'Todos os responsáveis',
todasPrioridades: 'Todas as prioridades',
limparFiltros: 'Limpar filtros',
stAFazer: 'A fazer',
stEmAndamento: 'Em andamento',
stEmRevisao: 'Em revisão',
stConcluida: 'Concluída',
stCancelada: 'Cancelada',
prLow: 'Baixa',
prMedium: 'Média',
prHigh: 'Alta',
tarefa: 'Tarefa',
checklist: 'Checklist',
atrasada: 'Atrasada',
venceHoje: 'Vence hoje',
carregarMais: 'Carregar mais tarefas',
carregando: 'Carregando…',
vazio: 'Nenhuma tarefa encontrada',
vazioHint: 'Ajuste os filtros para ver outras tarefas da equipe.',
erroQuadro: 'Não foi possível carregar as tarefas da equipe.',
tentarNovamente: 'Tentar de novo',
faltaContexto: 'A página foi aberta sem as informações de que precisa para listar as tarefas da equipe.',
voltarAnterior: 'Voltar à página anterior',
criadaPor: 'Criada por',
descricao: 'Descrição',
tarefaPai: 'Tarefa pai',
subtarefas: 'Subtarefas',
criadaEm: 'Criada em',
semChecklist: 'Sem itens na checklist',
selecioneTarefa: 'Escolha uma tarefa na fila para ver o detalhe e agir sobre ela.',
verTarefas: 'Ver tarefas da equipe',
carregandoDetalhe: 'Abrindo a tarefa…',
erroDetalhe: 'Não foi possível abrir esta tarefa.',
novoResponsavel: 'Novo responsável',
escolhaPessoa: 'Escolha uma pessoa ativa da equipe',
semMembros: 'Nenhuma pessoa encontrada',
trocarResponsavel: 'Trocar responsável',
cancelarTarefa: 'Cancelar tarefa',
manter: 'Manter tarefa',
confirmarCancelamento: 'Confirmar cancelamento',
modalTitulo: 'Esta ação encerra a tarefa',
modalMsgPre: 'Cancelar a tarefa',
modalMsgPos: 'Ela deixa de ser acompanhada e não volta a ser aberta.',
reatribuidoOk: 'Responsável trocado. A pessoa foi avisada.',
canceladoOk: 'Tarefa cancelada.',
erroReatribuir: 'Não foi possível trocar o responsável. Tente de novo.',
erroCancelar: 'Não foi possível cancelar a tarefa. Tente de novo.',
encerrada: 'Tarefa encerrada: não há ações disponíveis.',
historico: 'Histórico',
quando: 'Quando',
evento: 'Evento',
evCriada: 'Tarefa criada',
evDevolvida: 'Devolvida para ajuste',
evConcluida: 'Concluída',
evCancelada: 'Cancelada',
motivo: 'Motivo',
semHistorico: 'Sem eventos registrados'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const STATUSES: TarefaStatus[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const TODAS = 'todas';
type Tone = 'neutral' | 'info' | 'warning' | 'success' | 'error';
const TONE: Record<Tone, string> = {
neutral: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
info: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
warning: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
success: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
error: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
};
const STATUS_TONE: Record<TarefaStatus, Tone> = {
aFazer: 'neutral',
emAndamento: 'info',
emRevisao: 'warning',
concluida: 'success',
cancelada: 'neutral'
};
function parseDate(s: string): Date {
const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(s);
}
function fmtDate(s: string | undefined): string {
if (!s) return '';
const d = parseDate(s);
if (Number.isNaN(d.getTime())) return s;
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}
function fmtDateTime(s: string | undefined): string {
if (!s) return '';
const d = new Date(s);
if (Number.isNaN(d.getTime())) return s;
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'short', timeStyle: 'short' }).format(d);
}
function nomeMembro(m: MembroResumo | undefined): string {
return m?.details?.identification?.details?.identification?.name ?? '';
}
function toggleModal(from: Element, visible: boolean) {
const root = from.closest('[data-organism-id]') ?? from;
const modal = (from.closest('groupnotifyuser--ml-alert-modal') ?? root.querySelector('groupnotifyuser--ml-alert-modal')) as (HTMLElement & { visible: boolean }) | null;
if (modal) modal.visible = visible;
}
@customElement('tarefas--web--mobile--page11--tarefas_equipe-102047')
export class TarefasMobilePage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
private msg: PageMessageType = pageMessages['pt-br'];
private statusLabel(s: TarefaStatus) {
return {
aFazer: this.msg.stAFazer,
emAndamento: this.msg.stEmAndamento,
emRevisao: this.msg.stEmRevisao,
concluida: this.msg.stConcluida,
cancelada: this.msg.stCancelada
}[s];
}
private prioridadeLabel(p: TarefaPrioridade) {
return { low: this.msg.prLow, medium: this.msg.prMedium, high: this.msg.prHigh }[p];
}
private chip(label: string, tone: Tone) {
return html`<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE[tone]}">${label}</span>`;
}
// ---------- Quadro ----------
private renderFiltros() {
const listas = this.listas ?? [];
const membros = this.membros ?? [];
const ativos = this.filtroStatus ?? [];
return html`
<details class="group rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
<summary class="flex min-h-[44px] cursor-pointer list-none items-center justify-between px-3 text-sm font-medium text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">
<span>${this.msg.filtros}</span>
<svg aria-hidden="true" class="h-4 w-4 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8l5 5 5-5"></path></svg>
</summary>
<div class="flex flex-col gap-4 border-t border-[var(--border-subtle,currentColor)] p-3">
<fieldset class="flex flex-col gap-2">
<legend class="mb-1 text-sm font-medium text-[var(--text-default,currentColor)]">${this.msg.situacao}</legend>
<div class="flex flex-wrap gap-2">
${STATUSES.map(s => {
const on = ativos.includes(s);
return html`<button type="button" aria-pressed=${on ? 'true' : 'false'}
class="min-h-[44px] rounded-full border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${on
? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
: 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]'}"
@click=${() => this.filtrarPorStatus(on ? ativos.filter(x => x !== s) : [...ativos, s])}>${this.statusLabel(s)}</button>`;
})}
</div>
</fieldset>
<groupselectone--ml-select-one-autocomplete class="w-full" .value=${this.filtroListaId ?? TODAS}
@change=${(e: CustomEvent<{ value: string | null }>) => this.selecionarLista(!e.detail.value || e.detail.value === TODAS ? null : e.detail.value)}>
<Label>${this.msg.lista}</Label>
<Item value=${TODAS}>${this.msg.todasListas}</Item>
${listas.map(l => html`<Item value=${l.id}>${l.nome}</Item>`)}
</groupselectone--ml-select-one-autocomplete>
<groupselectone--ml-select-one-autocomplete class="w-full" .value=${this.filtroResponsavelId ?? TODAS}
@focus=${() => this.qryBuscarMembros('', false)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.filtrarPorResponsavel(!e.detail.value || e.detail.value === TODAS ? null : e.detail.value)}>
<Label>${this.msg.responsavel}</Label>
<Item value=${TODAS}>${this.msg.todosResponsaveis}</Item>
${membros.map(m => html`<Item value=${m.id}>${nomeMembro(m)}</Item>`)}
</groupselectone--ml-select-one-autocomplete>
<groupselectone--ml-select-dropdown class="w-full" .value=${this.filtroPrioridade ?? TODAS}
@change=${(e: CustomEvent<{ value: string | null }>) => this.filtrarPorPrioridade(!e.detail.value || e.detail.value === TODAS ? null : (e.detail.value as TarefaPrioridade))}>
<Label>${this.msg.prioridade}</Label>
<Item value=${TODAS}>${this.msg.todasPrioridades}</Item>
<Item value="high">${this.msg.prHigh}</Item>
<Item value="medium">${this.msg.prMedium}</Item>
<Item value="low">${this.msg.prLow}</Item>
</groupselectone--ml-select-dropdown>
<label class="flex flex-col gap-1 text-sm font-medium text-[var(--text-default,currentColor)]">
<span>${this.msg.prazo}</span>
<input type="date" .value=${this.filtroPrazo ?? ''}
class="min-h-[44px] rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@change=${(e: Event) => this.filtrarPorPrazo((e.target as HTMLInputElement).value || null)} />
</label>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.limparFiltros()}>
<Label>${this.msg.limparFiltros}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</details>`;
}
private renderLinha(t: TarefaQuadroItem) {
const d = t.details.details;
return html`
<TableRow key=${t.id}>
<TableCell>
<div class="flex min-w-0 flex-col gap-0.5">
<span class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
<span class="text-xs text-[var(--text-muted,currentColor)]">${nomeMembro(t.responsavel)} · ${t.lista?.nome ?? ''}</span>
${d.progressoChecklist ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.checklist}: ${d.progressoChecklist}</span>` : nothing}
</div>
</TableCell>
<TableCell>
<div class="flex flex-col items-start gap-1">
${this.chip(this.statusLabel(t.status), STATUS_TONE[t.status])}
<span class="text-xs text-[var(--text-muted,currentColor)]">${this.prioridadeLabel(t.prioridade)}</span>
</div>
</TableCell>
<TableCell>
<div class="flex flex-col items-start gap-1">
<span class="text-sm text-[var(--text-default,currentColor)]">${fmtDate(t.prazo)}</span>
${d.atrasada ? this.chip(this.msg.atrasada, 'error') : d.venceHoje ? this.chip(this.msg.venceHoje, 'warning') : nothing}
</div>
</TableCell>
</TableRow>`;
}
private renderQuadro() {
const items = this.tarefas?.items ?? [];
const idx = items.findIndex(i => i.id === this.selectedTarefa);
const loading = this.qryTarefasEquipeStatus === 'loading';
const err = this.qryTarefasEquipeError;
const precondicao = err?.code === 'client.preconditionMissing';
return html`
<section data-organism-id="quadroTarefasEquipe" class="flex flex-col gap-3">
<groupsearchcontent--ml-search-bar class="w-full" .value=${this.filtroTitulo ?? null} placeholder=${this.msg.buscarPlaceholder}
@search=${(e: CustomEvent<{ query: string }>) => this.buscarPorTitulo(e.detail.query || null)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.buscarPorTitulo(e.detail.value || null)}
@clear=${() => this.buscarPorTitulo(null)}>
<Label>${this.msg.buscarLabel}</Label>
</groupsearchcontent--ml-search-bar>
${this.renderFiltros()}
${precondicao
? html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
<p>${this.msg.faltaContexto}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => history.back()}>
<Label>${this.msg.voltarAnterior}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: err
? html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
<p>${this.msg.erroQuadro}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.qryTarefasEquipe()}>
<Label>${this.msg.tentarNovamente}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: html`
<groupviewtable--ml-responsive-data-table class="w-full" value=${idx >= 0 ? String(idx) : ''} ?loading=${loading}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const it = items[e.detail.index];
if (it) {
this.selecionarTarefa(it.id);
this.setScenario('tarefa');
}
}}>
<TableHeader>
<TableRow>
<TableHead key="tarefa">${this.msg.tarefa}</TableHead>
<TableHead key="situacao">${this.msg.situacao}</TableHead>
<TableHead key="prazo">${this.msg.prazo}</TableHead>
</TableRow>
</TableHeader>
<TableBody>${items.map(t => this.renderLinha(t))}</TableBody>
<Empty>
<div class="flex flex-col items-center gap-3 py-8 text-center text-[var(--text-muted,currentColor)]">
<p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg.vazio}</p>
<p class="text-sm">${this.msg.vazioHint}</p>
</div>
</Empty>
<Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg.carregando}</div></Loading>
</groupviewtable--ml-responsive-data-table>
${this.tarefas?.hasMore
? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" ?loading=${loading}
@action=${() => this.qryTarefasEquipe((this.tarefas?.page ?? 1) + 1, true)}>
<Label>${this.msg.carregarMais}</Label>
</grouptriggeraction--ml-button-standard>`
: nothing}`}
</section>`;
}
// ---------- Tarefa ----------
private renderDetalhe(t: TarefaDetalhe | null) {
const loading = this.qryDetalheTarefaStatus === 'loading';
let body;
if (t) {
const d = t.details.details;
body = html`
<groupviewcard--ml-vertical-card class="w-full">
<CardHeader>
<CardTitle>${t.titulo}</CardTitle>
</CardHeader>
<CardContent>
<div class="flex flex-col gap-4">
<div class="flex flex-wrap items-center gap-2">
${this.chip(this.statusLabel(t.status), STATUS_TONE[t.status])}
<span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.prioridade}: ${this.prioridadeLabel(t.prioridade)}</span>
</div>
<div class="flex flex-wrap items-center gap-2">
<span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.prazo}</span>
<span class="text-base font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(t.prazo)}</span>
${this.tarefas?.items?.find(i => i.id === t.id)?.details.details.atrasada ? this.chip(this.msg.atrasada, 'error') : nothing}
${this.tarefas?.items?.find(i => i.id === t.id)?.details.details.venceHoje ? this.chip(this.msg.venceHoje, 'warning') : nothing}
</div>
<dl class="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.responsavel}</dt><dd class="text-[var(--text-strong,currentColor)]">${nomeMembro(t.responsavel)}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.criadaPor}</dt><dd class="text-[var(--text-strong,currentColor)]">${nomeMembro(t.criador)}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.lista}</dt><dd class="text-[var(--text-strong,currentColor)]">${t.lista?.nome ?? ''}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.subtarefas}</dt><dd class="text-[var(--text-strong,currentColor)]">${d.quantidadeSubtarefas}</dd></div>
${t.tarefaPai ? html`<div class="col-span-2"><dt class="text-[var(--text-muted,currentColor)]">${this.msg.tarefaPai}</dt><dd class="text-[var(--text-strong,currentColor)]">${t.tarefaPai.titulo}</dd></div>` : nothing}
${d.descricao ? html`<div class="col-span-2"><dt class="text-[var(--text-muted,currentColor)]">${this.msg.descricao}</dt><dd class="whitespace-pre-line text-[var(--text-default,currentColor)]">${d.descricao}</dd></div>` : nothing}
</dl>
<div class="flex flex-col gap-1 border-t border-[var(--border-subtle,currentColor)] pt-3">
<div class="flex items-center justify-between text-sm">
<span class="font-medium text-[var(--text-strong,currentColor)]">${this.msg.checklist}</span>
<span class="text-[var(--text-muted,currentColor)]">${d.progressoChecklist}</span>
</div>
${t.checklist.length
? t.checklist.map(i => html`
<groupenterboolean--ml-checkbox-preference .value=${i.feito} disabled>
<Label>${i.details.details.descricao}</Label>
</groupenterboolean--ml-checkbox-preference>`)
: html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.semChecklist}</p>`}
</div>
</div>
</CardContent>
</groupviewcard--ml-vertical-card>`;
} else if (this.selectedTarefa && this.qryDetalheTarefaError && !loading) {
body = html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
<p>${this.msg.erroDetalhe}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.qryDetalheTarefa()}>
<Label>${this.msg.tentarNovamente}</Label>
</grouptriggeraction--ml-button-standard>
</div>`;
} else if (this.selectedTarefa) {
body = html`<p aria-busy="true" aria-live="polite" class="py-6 text-center text-[var(--text-muted,currentColor)]">${this.msg.carregandoDetalhe}</p>`;
} else {
body = html`<div class="flex flex-col items-center gap-3 py-8 text-center text-[var(--text-muted,currentColor)]">
<p>${this.msg.selecioneTarefa}</p>
<grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.setScenario('quadro')}>
<Label>${this.msg.verTarefas}</Label>
</grouptriggeraction--ml-button-standard>
</div>`;
}
return html`<section data-organism-id="detalheTarefa">${body}</section>`;
}
private renderAcoes(t: TarefaDetalhe | null) {
if (!t) return html`<section data-organism-id="acoesGestorTarefa"></section>`;
const aberta = t.details.details.aberta;
const membros = this.membros ?? [];
const draft = this.cmdReatribuirTarefaDraft;
const trocando = this.cmdReatribuirTarefaStatus === 'loading';
const cancelando = this.cmdCancelarTarefaStatus === 'loading';
const ocupado = trocando || cancelando;
return html`
<section data-organism-id="acoesGestorTarefa" class="flex flex-col gap-4">
<groupnotifyuser--ml-contextual-feedback type="success" .visible=${this.cmdReatribuirTarefaStatus === 'success'} .dismissible=${false}>
<Message>${this.msg.reatribuidoOk}</Message>
</groupnotifyuser--ml-contextual-feedback>
<groupnotifyuser--ml-contextual-feedback type="success" .visible=${this.cmdCancelarTarefaStatus === 'success'} .dismissible=${false}>
<Message>${this.msg.canceladoOk}</Message>
</groupnotifyuser--ml-contextual-feedback>
${aberta
? html`
<div class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
<groupselectone--ml-select-one-autocomplete class="w-full" .value=${draft.responsavelId} ?disabled=${ocupado}
@focus=${() => this.qryBuscarMembros('', true)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.setCmdReatribuirTarefaDraft({ ...draft, responsavelId: e.detail.value })}>
<Label>${this.msg.novoResponsavel}</Label>
<Helper>${this.msg.escolhaPessoa}</Helper>
${membros.map(m => html`<Item value=${m.id}>${nomeMembro(m)}</Item>`)}
<Empty>${this.msg.semMembros}</Empty>
</groupselectone--ml-select-one-autocomplete>
${this.cmdReatribuirTarefaError ? html`<p role="alert" aria-live="polite" class="text-sm text-[var(--text-default,currentColor)]">${this.msg.erroReatribuir}</p>` : nothing}
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" class="w-full"
?disabled=${!draft.responsavelId || ocupado} ?loading=${trocando}
@action=${() => this.cmdReatribuirTarefa()}>
<Label>${this.msg.trocarResponsavel}</Label>
</grouptriggeraction--ml-button-standard>
</div>
<div class="flex flex-col gap-2">
${this.cmdCancelarTarefaError ? html`<p role="alert" aria-live="polite" class="text-sm text-[var(--text-default,currentColor)]">${this.msg.erroCancelar}</p>` : nothing}
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" class="w-full"
?disabled=${ocupado} ?loading=${cancelando}
@action=${(e: Event) => toggleModal(e.currentTarget as Element, true)}>
<Label>${this.msg.cancelarTarefa}</Label>
</grouptriggeraction--ml-button-standard>
<groupnotifyuser--ml-alert-modal type="warning" position="center" .dismissible=${true}
@dismiss=${(e: Event) => toggleModal(e.currentTarget as Element, false)}>
<Title>${this.msg.modalTitulo}</Title>
<Message>${this.msg.modalMsgPre} “${t.titulo}”? ${this.msg.modalMsgPos}</Message>
<Action>
<div class="flex gap-2">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
@action=${(e: Event) => toggleModal(e.currentTarget as Element, false)}>
<Label>${this.msg.manter}</Label>
</grouptriggeraction--ml-button-standard>
<grouptriggeraction--ml-button-standard data-variant="danger" size="md"
@action=${(e: Event) => { toggleModal(e.currentTarget as Element, false); this.cmdCancelarTarefa(); }}>
<Label>${this.msg.confirmarCancelamento}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</Action>
</groupnotifyuser--ml-alert-modal>
</div>`
: this.cmdCancelarTarefaStatus === 'success'
? nothing
: html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.encerrada}</p>`}
</section>`;
}
private renderHistorico(t: TarefaDetalhe | null) {
if (!t) return html`<section data-organism-id="historicoTarefa"></section>`;
const d = t.details.details;
const eventos: { quando: string; titulo: string; detalhe: string }[] = [
{ quando: t.criadaEm, titulo: this.msg.evCriada, detalhe: `${this.msg.criadaPor}: ${nomeMembro(t.criador)}` }
];
if (d.devolvidaEm) eventos.push({ quando: d.devolvidaEm, titulo: this.msg.evDevolvida, detalhe: d.motivoDevolucao ? `${this.msg.motivo}: ${d.motivoDevolucao}` : '' });
if (d.concluidaEm) eventos.push({ quando: d.concluidaEm, titulo: this.msg.evConcluida, detalhe: '' });
if (d.canceladaEm) eventos.push({ quando: d.canceladaEm, titulo: this.msg.evCancelada, detalhe: '' });
return html`
<section data-organism-id="historicoTarefa" class="flex flex-col gap-2">
<h3 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.historico}</h3>
<groupviewdata--ml-timeline-view class="w-full">
<Columns>
<Column field="quando" header=${this.msg.quando}></Column>
<Column field="evento" header=${this.msg.evento}></Column>
</Columns>
<Rows>
${eventos.map(ev => html`
<Row>
<Cell><span class="text-xs text-[var(--text-muted,currentColor)]">${fmtDateTime(ev.quando)}</span></Cell>
<Cell>
<div class="flex flex-col">
<span class="font-medium text-[var(--text-strong,currentColor)]">${ev.titulo}</span>
${ev.detalhe ? html`<span class="text-sm text-[var(--text-default,currentColor)]">${ev.detalhe}</span>` : nothing}
</div>
</Cell>
</Row>`)}
</Rows>
<Empty><div class="py-4 text-center text-[var(--text-muted,currentColor)]">${this.msg.semHistorico}</div></Empty>
</groupviewdata--ml-timeline-view>
</section>`;
}
private renderTarefa() {
const t = this.tarefa && this.tarefa.id === this.selectedTarefa ? this.tarefa : null;
return html`
<div class="flex flex-col gap-5">
${this.renderDetalhe(t)}
${this.renderAcoes(t)}
${this.renderHistorico(t)}
</div>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<div class="min-h-full w-full bg-[var(--page-bg,transparent)] p-3 text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'quadro'} backLabel=${this.msg.voltar}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="quadro" title=${this.msg.sceneQuadro}>${this.renderQuadro()}</Scene>
<Scene value="tarefa" title=${this.msg.sceneTarefa} nav="back" backTo="quadro">${this.renderTarefa()}</Scene>
</molecules--ml-scenary-102020>
</div>`;
}
}
