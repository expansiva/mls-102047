/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { TarefaPendencia, TarefaResumo } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Início',
headline: 'Você tem {a} atrasadas e {h} vencendo hoje.',
goodNews: 'Nada precisa de atenção agora.',
avisoTitle: 'Aviso das 8h',
avisoMessage: '{t} tarefas no aviso de hoje, {a} atrasadas.',
avisoOpen: 'Abrir aviso',
avisoPending: 'Aviso ainda a caminho.',
avisoFailed: 'A entrega do aviso falhou. Veja as tarefas pelo aviso.',
avisoNone: 'O aviso das 8h de hoje ainda não foi gerado.',
laneDevolvidas: 'Devolvidas para ajustar',
laneRevisar: 'Entregas esperando sua decisão',
laneEnviar: 'Em andamento, prontas para enviar',
laneIniciar: 'Prontas para iniciar',
showMore: 'Mostrar mais',
actIniciar: 'Iniciar tarefa',
actEnviar: 'Enviar para revisão',
actReenviar: 'Reenviar para revisão',
actAceitar: 'Aceitar entrega',
devolverSummary: 'Devolver com motivo',
motivoLabel: 'Motivo da devolução',
motivoPlaceholder: 'Explique o que precisa ser ajustado',
devolverConfirm: 'Confirmar devolução',
motivoRecebido: 'Motivo da devolução',
devolvidaEm: 'Devolvida em',
criadaPor: 'Criada por',
entreguePor: 'Entregue por',
checklist: 'Checklist',
prioLow: 'Prioridade baixa',
prioMedium: 'Prioridade média',
prioHigh: 'Prioridade alta',
stripAbertas: 'abertas',
stripHoje: 'vencem hoje',
stripAtrasadas: 'atrasadas',
stripLabel: 'Resumo das minhas tarefas',
urgentesSummary: 'Mais urgentes entre as abertas',
urgentesEmpty: 'Nenhuma tarefa aberta.',
verTodas: 'Ver todas as minhas tarefas',
loading: 'Carregando seu início…',
errorTitle: 'Não foi possível carregar o seu início.',
retry: 'Tentar de novo',
preconditionTitle: 'Esta tela foi aberta sem o que ela precisa.',
preconditionBody: 'Não foi possível identificar a tarefa escolhida. Volte para as suas tarefas e abra o início de novo.',
goBack: 'Ir para minhas tarefas',
commandError: 'Não foi possível concluir a ação. Atualize e tente de novo.',
commandSuccess: 'Pronto. A lista foi atualizada.',
working: 'Enviando…'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
type Kind = 'devolvida' | 'revisar' | 'enviar' | 'iniciar';
const LANE_PREVIEW = 3;
function fill(text: string, values: Record<string, string>): string {
return text.replace(/\{(\w+)\}/g, (_m, k: string) => values[k] ?? '');
}
function fmtInt(n: number | null | undefined): string {
if (n === null || n === undefined) return '0';
return new Intl.NumberFormat(document.documentElement.lang || undefined).format(n);
}
function fmtDate(v: string | undefined): string {
if (!v) return '';
const d = /^\d{4}-\d{2}-\d{2}$/.test(v)
? new Date(Number(v.slice(0, 4)), Number(v.slice(5, 7)) - 1, Number(v.slice(8, 10)))
: new Date(v);
if (Number.isNaN(d.getTime())) return v;
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { day: '2-digit', month: 'short' }).format(d);
}
@customElement('tarefas--web--mobile--page11--inicio_membro-102047')
export class TarefasMobilePage11Inicio_membroPage extends TarefasInicio_membroShared {
private msg: PageMessageType = pageMessage_pt_br;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="mx-auto flex w-full max-w-[430px] flex-col gap-5 bg-[var(--page-bg,transparent)] px-4 pb-10 pt-4 text-[var(--text-default,currentColor)]">
<header>
<h1 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
</header>
${this.renderBody()}
</main>
`;
}
private renderBody() {
if (this.pageStatus === 'error') return this.renderError();
if (this.pageStatus === 'idle' || this.pageStatus === 'loading') return this.renderSkeleton();
return html`
${this.renderHeadline()}
${this.renderCommandFeedback()}
${this.renderAviso()}
${this.renderEspera()}
${this.renderResumo()}
`;
}
private renderSkeleton() {
return html`
<div aria-busy="true" aria-live="polite" class="flex flex-col gap-4">
<span class="sr-only">${this.msg['loading']}</span>
<div class="h-8 w-3/4 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-20 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-44 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
<div class="h-10 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
</div>
`;
}
private renderError() {
const err = this.carregarInicioError;
const missing = err?.code === 'client.preconditionMissing';
return html`
<section role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]">
<p class="font-semibold">${missing ? this.msg['preconditionTitle'] : this.msg['errorTitle']}</p>
${missing ? html`<p class="text-sm">${this.msg['preconditionBody']}</p>` : nothing}
${missing
? html`<molecules--grouptriggeraction--ml-button-standard-102040 size="lg" data-variant="secondary" @action=${() => this.abrirMinhasTarefas()}>
<Label>${this.msg['goBack']}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>`
: html`<molecules--grouptriggeraction--ml-button-standard-102040 size="lg" data-variant="primary" .loading=${this.carregarInicioStatus === 'loading'} @action=${() => this.carregarInicio()}>
<Label>${this.msg['retry']}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>`}
</section>
`;
}
private renderHeadline() {
if (this.pageStatus === 'empty') {
return html`<p class="text-xl font-semibold leading-snug text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</p>`;
}
const r = this.resumo;
const text = fill(this.msg['headline'], {
a: fmtInt(r?.quantidadeAtrasadas),
h: fmtInt(r?.quantidadeVencemHoje)
});
return html`<p class="text-xl font-semibold leading-snug text-[var(--text-strong,currentColor)]">${text}</p>`;
}
private renderCommandFeedback() {
const errors = [this.iniciarTarefaError, this.enviarParaRevisaoError, this.aceitarEntregaError, this.devolverComMotivoError];
const hasError = errors.some((e) => e !== null);
const loading = [this.iniciarTarefaStatus, this.enviarParaRevisaoStatus, this.aceitarEntregaStatus, this.devolverComMotivoStatus].includes('loading');
const success = [this.iniciarTarefaStatus, this.enviarParaRevisaoStatus, this.aceitarEntregaStatus, this.devolverComMotivoStatus].includes('success');
return html`
<div aria-live="polite" class="text-sm">
${hasError
? html`<p role="alert" class="rounded-md bg-[var(--status-error-bg,transparent)] px-3 py-2 text-[var(--status-error-text,currentColor)]">${this.msg['commandError']}</p>`
: loading
? html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['working']}</p>`
: success
? html`<p class="rounded-md bg-[var(--status-success-bg,transparent)] px-3 py-2 text-[var(--status-success-text,currentColor)]">${this.msg['commandSuccess']}</p>`
: nothing}
</div>
`;
}
private renderAviso() {
const a = this.avisoDoDia;
return html`
<section data-organism-id="avisoDoDia" class="flex flex-col gap-2">
${a
? html`
<molecules--groupnotifyuser--ml-notify-banner-102040 type="info" .visible=${true} .dismissible=${false} @action=${() => this.abrirMeusAvisos()}>
<Title>${this.msg['avisoTitle']}</Title>
<Message>${fill(this.msg['avisoMessage'], { t: fmtInt(a.details?.quantidadeTarefas), a: fmtInt(a.details?.quantidadeAtrasadas) })}</Message>
<Action>${this.msg['avisoOpen']}</Action>
</molecules--groupnotifyuser--ml-notify-banner-102040>
${a.status === 'failed' ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['avisoFailed']}</p>` : nothing}
${a.status === 'pending' ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['avisoPending']}</p>` : nothing}`
: html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['avisoNone']}</p>`}
</section>
`;
}
private renderEspera() {
const e = this.esperaPorMim;
return html`
<section data-organism-id="esperaPorMim" class="flex flex-col gap-5">
${e ? this.renderLane(this.msg['laneDevolvidas'], e.devolvidas, 'devolvida') : nothing}
${e ? this.renderLane(this.msg['laneRevisar'], e.paraRevisar, 'revisar') : nothing}
${e ? this.renderLane(this.msg['laneEnviar'], e.paraEnviarRevisao, 'enviar') : nothing}
${e ? this.renderLane(this.msg['laneIniciar'], e.paraIniciar, 'iniciar') : nothing}
</section>
`;
}
private renderLane(title: string, rows: TarefaPendencia[] | undefined, kind: Kind) {
if (!rows || rows.length === 0) return nothing;
const first = rows.slice(0, LANE_PREVIEW);
const rest = rows.slice(LANE_PREVIEW);
return html`
<div class="flex flex-col">
<h2 class="mb-1 text-base font-semibold text-[var(--text-strong,currentColor)]">${title}</h2>
<ul class="flex flex-col">
${first.map((t) => this.renderPendencia(t, kind))}
</ul>
${rest.length > 0
? html`<details class="mt-1">
<summary class="flex min-h-[44px] cursor-pointer items-center text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['showMore']}</summary>
<ul class="flex flex-col">${rest.map((t) => this.renderPendencia(t, kind))}</ul>
</details>`
: nothing}
</div>
`;
}
private prioLabel(p: TarefaPendencia['prioridade']): string {
if (p === 'high') return this.msg['prioHigh'];
if (p === 'medium') return this.msg['prioMedium'];
return this.msg['prioLow'];
}
private renderPendencia(t: TarefaPendencia, kind: Kind) {
const who = kind === 'revisar'
? `${this.msg['entreguePor']} ${t.responsavel?.details?.identification?.name ?? ''}`
: `${this.msg['criadaPor']} ${t.criador?.details?.identification?.name ?? ''}`;
const progresso = t.details?.progressoChecklist;
return html`
<li class="border-b border-[var(--border-subtle,currentColor)] py-3 last:border-b-0">
<button type="button"
class="flex min-h-[44px] w-full items-start justify-between gap-3 rounded text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@click=${() => this.abrirTarefaParaAjustar(t.id)}>
<span class="min-w-0 flex-1">
<span class="block break-words font-medium text-[var(--link-text,currentColor)]">${t.titulo}</span>
<span class="mt-0.5 block text-xs text-[var(--text-muted,currentColor)]">${who} · ${this.prioLabel(t.prioridade)}${progresso ? html` · ${this.msg['checklist']} ${progresso}` : nothing}</span>
</span>
<span class="shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtDate(t.prazo)}</span>
</button>
${kind === 'devolvida' && t.details?.motivoDevolucao
? html`<p class="mt-1 rounded-md bg-[var(--surface-alt-bg,transparent)] px-3 py-2 text-sm text-[var(--text-default,currentColor)]">
<span class="block text-xs text-[var(--text-muted,currentColor)]">${this.msg['motivoRecebido']}${t.details?.devolvidaEm ? html` · ${this.msg['devolvidaEm']} ${fmtDate(t.details.devolvidaEm)}` : nothing}</span>
${t.details.motivoDevolucao}
</p>`
: nothing}
<div class="mt-2 flex flex-col gap-2">
${this.renderAction(t, kind)}
${kind === 'revisar' ? this.renderDevolver(t) : nothing}
</div>
</li>
`;
}
private renderAction(t: TarefaPendencia, kind: Kind) {
const cfg: Record<Kind, { label: string; loading: boolean; run: () => void }> = {
iniciar: { label: this.msg['actIniciar'], loading: this.iniciarTarefaStatus === 'loading', run: () => { void this.iniciarTarefa(t.id, t.version); } },
enviar: { label: this.msg['actEnviar'], loading: this.enviarParaRevisaoStatus === 'loading', run: () => { void this.enviarParaRevisao(t.id, t.version); } },
devolvida: { label: this.msg['actReenviar'], loading: this.enviarParaRevisaoStatus === 'loading', run: () => { void this.enviarParaRevisao(t.id, t.version); } },
revisar: { label: this.msg['actAceitar'], loading: this.aceitarEntregaStatus === 'loading', run: () => { void this.aceitarEntrega(t.id, t.version); } }
};
const c = cfg[kind];
return html`
<molecules--grouptriggeraction--ml-button-standard-102040 size="lg" data-variant="primary" data-class="w-full" .loading=${c.loading} @action=${c.run}>
<Label>${c.label}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>
`;
}
private renderDevolver(t: TarefaPendencia) {
const draft = this.devolverComMotivoDraft;
const motivo = draft?.details?.motivoDevolucao ?? '';
const inputId = `motivo-${t.id}`;
return html`
<details class="rounded-md border border-[var(--border-default,currentColor)]">
<summary class="flex min-h-[44px] cursor-pointer items-center px-3 text-sm font-medium text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['devolverSummary']}</summary>
<div class="flex flex-col gap-2 px-3 pb-3">
<label for=${inputId} class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['motivoLabel']}</label>
<textarea id=${inputId} rows="3"
class="w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] p-2 text-base text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
placeholder=${this.msg['motivoPlaceholder']}
.value=${motivo}
@input=${(e: Event) => this.setDevolverComMotivoDraft({
...draft,
details: { ...draft.details, motivoDevolucao: (e.target as HTMLTextAreaElement).value }
})}></textarea>
<molecules--grouptriggeraction--ml-button-standard-102040 size="lg" data-variant="secondary" data-class="w-full"
.disabled=${motivo.trim() === ''}
.loading=${this.devolverComMotivoStatus === 'loading'}
@action=${() => { void this.devolverComMotivo(t.id, t.version); }}>
<Label>${this.msg['devolverConfirm']}</Label>
</molecules--grouptriggeraction--ml-button-standard-102040>
</div>
</details>
`;
}
private renderResumo() {
const r = this.resumo;
if (!r) return nothing;
return html`
<section data-organism-id="resumoMinhasTarefas" class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
<dl aria-label=${this.msg['stripLabel']} class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
<div class="flex items-baseline gap-1.5">
<dd class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtInt(r.quantidadeAbertas)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['stripAbertas']}</dt>
</div>
<div class="flex items-baseline gap-1.5">
<dd class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtInt(r.quantidadeVencemHoje)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['stripHoje']}</dt>
</div>
<div class="flex items-baseline gap-1.5">
<dd class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtInt(r.quantidadeAtrasadas)}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg['stripAtrasadas']}</dt>
</div>
</dl>
<details>
<summary class="flex min-h-[44px] cursor-pointer items-center text-sm text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['urgentesSummary']}</summary>
${r.tarefas && r.tarefas.length > 0
? html`<ul class="flex flex-col">${r.tarefas.map((t) => this.renderResumoItem(t))}</ul>`
: html`<p class="py-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg['urgentesEmpty']}</p>`}
</details>
<button type="button"
class="flex min-h-[44px] w-full items-center justify-center rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@click=${() => this.abrirMinhasTarefas()}>${this.msg['verTodas']}</button>
</section>
`;
}
private renderResumoItem(t: TarefaResumo) {
const prazoClass = t.details?.atrasada
? 'text-[var(--status-error-text,currentColor)]'
: t.details?.venceHoje
? 'text-[var(--status-warning-text,currentColor)]'
: 'text-[var(--text-default,currentColor)]';
return html`
<li class="border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
<button type="button"
class="flex min-h-[44px] w-full items-start justify-between gap-3 rounded py-2 text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@click=${() => this.abrirTarefaParaAjustar(t.id)}>
<span class="min-w-0 flex-1">
<span class="block break-words text-sm font-medium text-[var(--link-text,currentColor)]">${t.titulo}</span>
<span class="block text-xs text-[var(--text-muted,currentColor)]">${t.lista?.nome ?? ''}${t.details?.progressoChecklist ? html` · ${this.msg['checklist']} ${t.details.progressoChecklist}` : nothing}</span>
</span>
<span class="shrink-0 text-sm font-semibold tabular-nums ${prazoClass}">${fmtDate(t.prazo)}</span>
</button>
</li>
`;
}
}
