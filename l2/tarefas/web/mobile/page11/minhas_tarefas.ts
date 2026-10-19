/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type { ErrorState, Filtro, ItemChecklistDraft, Prioridade, SalvarEdicaoDraft, TarefaDetalhe } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  voltar: 'Voltar',
  tituloLista: 'Minhas tarefas',
  tituloTarefa: 'Tarefa',
  tituloCriar: 'Dados da nova tarefa',
  tituloEditar: 'Editar tarefa',
  tituloChecklist: 'Checklist da tarefa',
  filtrosRapidos: 'Filtros rápidos',
  filtroTodas: 'Todas',
  filtroCriadas: 'Criadas por mim',
  filtroAtribuidas: 'Atribuídas a mim',
  filtroRevisao: 'Em revisão',
  filtroDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  vazio: 'Nenhuma tarefa por aqui',
  vazioDica: 'Quando você criar uma tarefa ou receber uma, ela aparece nesta lista.',
  carregando: 'Carregando suas tarefas…',
  carregarMais: 'Carregar mais tarefas',
  novaTarefa: 'Nova tarefa',
  erroLista: 'Não foi possível carregar suas tarefas.',
  semContexto: 'Esta tela foi aberta sem o que ela precisa para mostrar suas tarefas. Volte e abra de novo.',
  tentarNovamente: 'Tentar novamente',
  voltarOrigem: 'Voltar para onde eu estava',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prioBaixa: 'Baixa',
  prioMedia: 'Média',
  prioAlta: 'Alta',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  devolvida: 'Devolvida',
  subtarefas: 'Subtarefas',
  checklistProgresso: 'Checklist',
  abrindoTarefa: 'Abrindo a tarefa…',
  semTarefa: 'Nenhuma tarefa aberta. Escolha uma na lista.',
  erroTarefa: 'Não foi possível abrir a tarefa.',
  rotLista: 'Lista',
  rotCriadaPor: 'Criada por',
  rotResponsavel: 'Responsável',
  rotPrazo: 'Prazo',
  rotPrioridade: 'Prioridade',
  rotSituacao: 'Situação',
  rotDescricao: 'Descrição',
  rotCriadaEm: 'Criada em',
  motivoTitulo: 'Devolvida para ajuste',
  checklist: 'Checklist',
  checklistVazio: 'Esta tarefa não tem itens na checklist.',
  itemFeito: 'Feito',
  itemPendente: 'Pendente',
  alterarDados: 'Alterar dados',
  ajustarChecklist: 'Marcar ou ajustar itens',
  iniciar: 'Iniciar tarefa',
  enviar: 'Enviar para revisão',
  reenviar: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  maisAcoes: 'Mais ações',
  motivoCampo: 'Motivo da devolução',
  motivoDica: 'Explique o que precisa ser ajustado.',
  devolver: 'Devolver para ajuste',
  cancelarAbrir: 'Cancelar tarefa',
  cancelarAviso: 'A tarefa “{t}” será encerrada e não poderá mais mudar de situação.',
  cancelarConfirmar: 'Sim, cancelar esta tarefa',
  okIniciada: 'Tarefa iniciada.',
  okEnviada: 'Tarefa enviada para revisão.',
  okAceita: 'Entrega aceita. A tarefa está concluída.',
  okDevolvida: 'Tarefa devolvida para ajuste.',
  okCancelada: 'Tarefa cancelada.',
  historico: 'Histórico',
  colQuando: 'Quando',
  colEvento: 'O que aconteceu',
  evCriada: 'Tarefa criada',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Entrega aceita',
  evCancelada: 'Tarefa cancelada',
  por: 'por',
  campoLista: 'Lista',
  escolhaLista: 'Escolha a lista',
  campoTitulo: 'Título',
  campoDescricao: 'Descrição',
  campoPrioridade: 'Prioridade',
  campoPrazo: 'Prazo',
  campoResponsavel: 'Responsável',
  buscaResponsavel: 'Digite o nome para buscar',
  semMembros: 'Digite parte do nome para encontrar alguém da equipe.',
  campoItem: 'Item',
  descricaoItem: 'O que precisa ser feito',
  feito: 'Feito',
  adicionarItem: 'Adicionar item',
  removerItem: 'Remover item',
  checklistInicial: 'Checklist inicial',
  checklistInicialDica: 'Opcional: itens para acompanhar o andamento.',
  criarTarefa: 'Criar tarefa',
  descartarRascunho: 'Descartar rascunho',
  faltaPreencher: 'Para criar, informe lista, título, prioridade, prazo e responsável.',
  okCriada: 'Tarefa criada.',
  abrirCriada: 'Ver a tarefa criada',
  salvarAlteracoes: 'Salvar alterações',
  dicaEdicao: 'Editar não muda a situação da tarefa.',
  okEditada: 'Alterações salvas.',
  salvarChecklist: 'Salvar checklist',
  dicaChecklist: 'Marcar itens não muda a situação da tarefa.',
  okChecklist: 'Checklist salva.',
  voltarTarefa: 'Voltar à tarefa',
  erroGenerico: 'Não foi possível concluir. Tente de novo.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type Situacao = TarefaDetalhe['status'];

const BTN_SEC =
  'min-h-[44px] px-4 rounded-lg border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] font-medium focus-visible:outline-none focus-visible:ring-2 ring-[var(--focus-ring,currentColor)]';
const SUMMARY =
  'min-h-[44px] flex items-center px-3 cursor-pointer font-medium text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 ring-[var(--focus-ring,currentColor)] rounded-lg';
const BOX = 'rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]';

const STATUS_CLASS: Record<Situacao, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'
};

function lang() {
  return document.documentElement.lang || undefined;
}

function toDate(v: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : new Date(v);
}

function fmtData(v: string | null | undefined, withYear: boolean) {
  if (!v) return '–';
  const d = toDate(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), withYear ? { day: '2-digit', month: 'short', year: 'numeric' } : { day: '2-digit', month: 'short' }).format(d);
}

function fmtDataHora(v: string | null | undefined) {
  if (!v) return '–';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function fmt(s: string, vars: Record<string, string>) {
  return s.replace(/\{(\w+)\}/g, (_x, k: string) => vars[k] ?? '');
}

function statusLabel(m: PageMessageType, s: Situacao) {
  const map: Record<Situacao, string> = {
    aFazer: m.stAFazer,
    emAndamento: m.stEmAndamento,
    emRevisao: m.stEmRevisao,
    concluida: m.stConcluida,
    cancelada: m.stCancelada
  };
  return map[s];
}

function prioLabel(m: PageMessageType, p: Prioridade) {
  const map: Record<Prioridade, string> = { low: m.prioBaixa, medium: m.prioMedia, high: m.prioAlta };
  return map[p];
}

function detailValue(e: Event): unknown {
  const d = (e as CustomEvent).detail as { value?: unknown } | null | undefined;
  return d && typeof d === 'object' ? d.value : undefined;
}

function strOf(e: Event): string | null | undefined {
  const v = detailValue(e);
  return typeof v === 'string' || v === null ? v : undefined;
}

function onText(fn: (v: string) => void) {
  return (e: Event) => {
    const v = detailValue(e);
    if (typeof v === 'string') fn(v);
  };
}

function camposValidos(d: SalvarEdicaoDraft) {
  return !!d.listaId && !!d.titulo?.trim() && !!d.prazo && !!d.prioridade && !!d.responsavelId;
}

function itensValidos(itens: ItemChecklistDraft[]) {
  return itens.every((i) => !!i.descricao?.trim());
}

function mudou(d: SalvarEdicaoDraft, t: TarefaDetalhe | null) {
  if (!t) return false;
  return (
    d.listaId !== t.listaId ||
    (d.titulo ?? '') !== t.titulo ||
    (d.descricao ?? '') !== (t.details.descricao ?? '') ||
    d.prioridade !== t.prioridade ||
    d.prazo !== t.prazo ||
    d.responsavelId !== t.responsavelId
  );
}

function primeiroErro(...errs: ErrorState[]): ErrorState {
  return errs.find((e) => e !== null) ?? null;
}

function erroBox(m: PageMessageType, err: ErrorState) {
  if (!err) return nothing;
  return html`<div role="alert" aria-live="polite" class="rounded-lg px-3 py-2 text-sm bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${err.message || m.erroGenerico}</div>`;
}

function okBox(texto: string | null) {
  if (!texto) return nothing;
  return html`<div role="status" aria-live="polite" class="rounded-lg px-3 py-2 text-sm bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]">${texto}</div>`;
}

function chip(cls: string, texto: string) {
  return html`<span class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${cls}">${texto}</span>`;
}

function botao(label: string, run: () => void, opt: { variant?: string; disabled?: boolean; loading?: boolean } = {}) {
  return html`<grouptriggeraction--ml-button-standard
    data-variant=${opt.variant ?? 'primary'}
    size="lg"
    type="button"
    data-class="w-full"
    ?disabled=${!!opt.disabled}
    ?loading=${!!opt.loading}
    @action=${() => run()}
  >
    <Label>${label}</Label>
  </grouptriggeraction--ml-button-standard>`;
}

@customElement('tarefas--web--mobile--page11--minhas_tarefas-102047')
export class TarefasMobilePage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    const tituloDetalhe = this.qryTarefaStatus === 'loading' ? m.tituloTarefa : this.tarefa?.titulo ?? m.tituloTarefa;
    return html`
      <div class="w-full max-w-[430px] mx-auto px-4 py-3 min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'lista'}
          .backLabel=${m.voltar}
          @change=${(e: CustomEvent<{ value: string; previous?: string }>) => {
            if (e.target !== e.currentTarget) return;
            const { value, previous } = e.detail;
            if (previous === 'editar' || previous === 'checklist') this.resetEdicaoDrafts();
            if (previous === 'criar' && value === 'lista') this.qryMinhasTarefas();
            this.setScenario(value);
          }}
        >
          <Scene value="lista" title=${m.tituloLista}>${this.renderLista()}</Scene>
          <Scene value="detalhe" title=${tituloDetalhe} nav="back" backTo="lista">${this.renderDetalhe()}</Scene>
          <Scene value="criar" title=${m.tituloCriar} nav="back" backTo="lista">${this.renderCriar()}</Scene>
          <Scene value="editar" title=${m.tituloEditar} nav="back" backTo="detalhe">${this.renderEditar()}</Scene>
          <Scene value="checklist" title=${m.tituloChecklist} nav="back" backTo="detalhe">${this.renderChecklistForm()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  /* ───────────── lista ───────────── */

  private renderLista() {
    const m = this.msg;
    const items = this.tarefas?.items ?? [];
    const sel = this.selectedTarefa ? items.findIndex((t) => t.id === this.selectedTarefa) : -1;
    const carregandoVazio = this.qryMinhasTarefasStatus === 'loading' && items.length === 0;
    const recarregando = this.qryMinhasTarefasStatus === 'loading' && items.length > 0;
    const erro = this.qryMinhasTarefasError;
    const semContexto = erro?.code === 'client.preconditionMissing';

    let corpo;
    if (erro && items.length === 0) {
      corpo = html`<div role="alert" class="${BOX} p-4 flex flex-col gap-3">
        <p class="text-[var(--text-default,currentColor)]">${semContexto ? m.semContexto : m.erroLista}</p>
        ${semContexto ? botao(m.voltarOrigem, () => history.back(), { variant: 'secondary' }) : botao(m.tentarNovamente, () => { this.qryMinhasTarefas(); }, { variant: 'secondary' })}
      </div>`;
    } else {
      corpo = html`
        <div aria-busy=${recarregando ? 'true' : 'false'} class="${BOX} overflow-hidden ${recarregando ? 'opacity-60' : ''}">
          <groupviewtable--ml-responsive-data-table
            .value=${sel >= 0 ? String(sel) : ''}
            .loading=${carregandoVazio}
            @rowClick=${(e: CustomEvent<{ index: number }>) => {
              const t = items[e.detail?.index];
              if (!t) return;
              this.qryTarefa(t.id);
              this.setScenario('detalhe');
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead key="tarefa">${m.colTarefa}</TableHead>
                <TableHead key="prazo">${m.colPrazo}</TableHead>
                <TableHead key="situacao">${m.colSituacao}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              ${items.map(
                (t) => html`<TableRow key=${t.id}>
                  <TableCell>
                    <div class="flex flex-col gap-1 py-1 min-w-0">
                      <span class="font-medium break-words text-[var(--text-strong,currentColor)]">${t.titulo}</span>
                      <span class="text-xs text-[var(--text-muted,currentColor)]">${t.lista.nome} · ${t.responsavel.details.identification.name}</span>
                      <span class="text-xs text-[var(--text-muted,currentColor)]">
                        ${prioLabel(m, t.prioridade)} · ${m.checklistProgresso} ${t.details.progressoChecklist}${t.details.quantidadeSubtarefas > 0 ? html` · ${m.subtarefas} ${t.details.quantidadeSubtarefas}` : nothing}${t.details.devolvidaEm && t.status === 'emAndamento' ? html` · ${m.devolvida}` : nothing}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex flex-col items-end gap-0.5 text-right">
                      <span class="${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : 'text-[var(--text-strong,currentColor)]'}">${fmtData(t.prazo, false)}</span>
                      ${t.details.atrasada ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${m.atrasada}</span>` : t.details.venceHoje ? html`<span class="text-xs font-medium text-[var(--text-strong,currentColor)]">${m.venceHoje}</span>` : nothing}
                    </div>
                  </TableCell>
                  <TableCell>${chip(STATUS_CLASS[t.status], statusLabel(m, t.status))}</TableCell>
                </TableRow>`
              )}
            </TableBody>
            <Loading><div class="p-6 text-center text-[var(--text-muted,currentColor)]">${m.carregando}</div></Loading>
            <Empty>
              <div class="p-6 text-center flex flex-col gap-1">
                <p class="font-medium text-[var(--text-strong,currentColor)]">${m.vazio}</p>
                <p class="text-sm text-[var(--text-muted,currentColor)]">${m.vazioDica}</p>
              </div>
            </Empty>
          </groupviewtable--ml-responsive-data-table>
        </div>
        ${this.tarefas?.hasMore
          ? botao(m.carregarMais, () => { this.qryMinhasTarefas(undefined, undefined, true); }, { variant: 'secondary', loading: recarregando })
          : nothing}
      `;
    }

    return html`
      <div class="flex flex-col gap-3 pb-4">
        <div data-organism-id="listaTarefas" class="flex flex-col gap-3">
          <div role="group" aria-label=${m.filtrosRapidos} class="-mx-4 px-4">
            <groupnavigatesection--ml-navigate-pills
              .value=${this.filtro ?? 'todas'}
              @change=${(e: Event) => {
                const v = strOf(e);
                if (typeof v !== 'string') return;
                this.qryMinhasTarefas(v === 'todas' ? null : (v as Filtro));
              }}
            >
              <Tab value="todas" title=${m.filtroTodas}></Tab>
              <Tab value="atribuidasAMim" title=${m.filtroAtribuidas}></Tab>
              <Tab value="criadasPorMim" title=${m.filtroCriadas}></Tab>
              <Tab value="emRevisao" title=${m.filtroRevisao}></Tab>
              <Tab value="devolvidas" title=${m.filtroDevolvidas}></Tab>
            </groupnavigatesection--ml-navigate-pills>
          </div>
          ${corpo}
        </div>
        <div class="sticky bottom-0 -mx-4 px-4 py-3 bg-[var(--page-bg,transparent)] border-t border-[var(--border-subtle,currentColor)]">
          ${botao(m.novaTarefa, () => this.setScenario('criar'))}
        </div>
      </div>
    `;
  }

  /* ───────────── detalhe ───────────── */

  private renderDetalhe() {
    const m = this.msg;
    const t = this.tarefa;
    const carregando = this.qryTarefaStatus === 'loading';
    const vazio = carregando
      ? html`<p role="status" aria-busy="true" class="p-4 text-[var(--text-muted,currentColor)]">${m.abrindoTarefa}</p>`
      : html`${erroBox(m, this.qryTarefaError ? { ...this.qryTarefaError, message: this.qryTarefaError.message || m.erroTarefa } : null)}<p class="p-4 text-[var(--text-muted,currentColor)]">${m.semTarefa}</p>`;
    const ok = !carregando && t;
    return html`
      <div class="flex flex-col gap-4">
        <div data-organism-id="detalheTarefa" class="flex flex-col gap-4">${ok ? this.renderCartao(t) : vazio}</div>
        <div data-organism-id="historicoTarefa">${ok ? this.renderHistorico(t) : nothing}</div>
        <div data-organism-id="acoesTarefa" class="sticky bottom-0 -mx-4 px-4 py-3 flex flex-col gap-3 bg-[var(--page-bg,transparent)] border-t border-[var(--border-subtle,currentColor)] max-h-[70vh] overflow-y-auto">
          ${ok ? this.renderAcoes(t) : nothing}
        </div>
      </div>
    `;
  }

  private renderCartao(t: TarefaDetalhe) {
    const m = this.msg;
    const dt = (rot: string, val: unknown) => html`<div class="flex flex-col gap-0.5">
      <dt class="text-xs text-[var(--text-muted,currentColor)]">${rot}</dt>
      <dd class="text-[var(--text-strong,currentColor)] break-words">${val}</dd>
    </div>`;
    return html`
      ${t.details.motivoDevolucao
        ? html`<div role="note" class="rounded-lg p-3 flex flex-col gap-1 bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">
            <p class="font-semibold">${m.motivoTitulo}${t.details.devolvidaEm ? html` · <span class="font-normal">${fmtDataHora(t.details.devolvidaEm)}</span>` : nothing}</p>
            <p class="whitespace-pre-line">${t.details.motivoDevolucao}</p>
          </div>`
        : nothing}
      <groupviewcard--ml-vertical-card>
        <CardHeader>
          <CardDescription>${chip(STATUS_CLASS[t.status], statusLabel(m, t.status))}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl class="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
            ${dt(m.rotLista, t.lista.nome)}
            ${dt(m.rotPrazo, fmtData(t.prazo, true))}
            ${dt(m.rotResponsavel, t.responsavel.details.identification.name)}
            ${dt(m.rotCriadaPor, t.criador.details.identification.name)}
            ${dt(m.rotPrioridade, prioLabel(m, t.prioridade))}
            ${t.details.descricao ? html`<div class="col-span-2">${dt(m.rotDescricao, html`<span class="whitespace-pre-line">${t.details.descricao}</span>`)}</div>` : nothing}
          </dl>
        </CardContent>
        <CardFooter><span class="text-xs text-[var(--text-muted,currentColor)]">${m.rotCriadaEm} ${fmtDataHora(t.criadaEm)}</span></CardFooter>
      </groupviewcard--ml-vertical-card>

      <section class="${BOX} p-3 flex flex-col gap-2" aria-label=${m.checklist}>
        <h3 class="font-semibold text-[var(--text-strong,currentColor)]">${m.checklist}</h3>
        ${t.checklist.length === 0
          ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.checklistVazio}</p>`
          : html`<ul class="flex flex-col gap-2">
              ${t.checklist.map(
                (it) => html`<li class="flex items-start gap-2 min-h-[32px]">
                  <span aria-hidden="true" class="w-5 text-center ${it.feito ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">${it.feito ? '✓' : '○'}</span>
                  <span class="sr-only">${it.feito ? m.itemFeito : m.itemPendente}</span>
                  <span class="${it.feito ? 'text-[var(--text-muted,currentColor)] line-through' : 'text-[var(--text-default,currentColor)]'} break-words">${it.details.descricao}</span>
                </li>`
              )}
            </ul>`}
      </section>

      <div class="grid grid-cols-1 gap-2">
        <button type="button" class=${BTN_SEC} @click=${() => this.setScenario('editar')}>${m.alterarDados}</button>
        <button type="button" class=${BTN_SEC} @click=${() => this.setScenario('checklist')}>${m.ajustarChecklist}</button>
      </div>
    `;
  }

  private renderHistorico(t: TarefaDetalhe) {
    const m = this.msg;
    const eventos: { quando: string; texto: string }[] = [
      { quando: t.criadaEm, texto: `${m.evCriada} · ${m.por} ${t.criador.details.identification.name}` }
    ];
    if (t.details.devolvidaEm) eventos.push({ quando: t.details.devolvidaEm, texto: m.evDevolvida });
    if (t.details.concluidaEm) eventos.push({ quando: t.details.concluidaEm, texto: m.evConcluida });
    if (t.details.canceladaEm) eventos.push({ quando: t.details.canceladaEm, texto: m.evCancelada });
    return html`
      <details class=${BOX}>
        <summary class=${SUMMARY}>${m.historico}</summary>
        <div class="px-3 pb-3">
          <groupviewdata--ml-timeline-view>
            <Columns>
              <Column field="quando" header=${m.colQuando}></Column>
              <Column field="evento" header=${m.colEvento}></Column>
            </Columns>
            <Rows>
              ${eventos.map((ev) => html`<Row><Cell>${fmtDataHora(ev.quando)}</Cell><Cell>${ev.texto}</Cell></Row>`)}
            </Rows>
          </groupviewdata--ml-timeline-view>
        </div>
      </details>
    `;
  }

  private renderAcoes(t: TarefaDetalhe) {
    const m = this.msg;
    const ocupado = [this.cmdIniciarStatus, this.cmdEnviarRevisaoStatus, this.cmdAceitarStatus, this.cmdDevolverStatus, this.cmdCancelarStatus].some((s) => s === 'loading');

    let principal: { label: string; busy: boolean; run: () => void } | null = null;
    if (t.status === 'aFazer' && t.souResponsavel) {
      principal = { label: m.iniciar, busy: this.cmdIniciarStatus === 'loading', run: () => { this.cmdIniciar(); } };
    } else if (t.status === 'emAndamento' && t.souResponsavel) {
      principal = {
        label: t.details.motivoDevolucao ? m.reenviar : m.enviar,
        busy: this.cmdEnviarRevisaoStatus === 'loading',
        run: () => { this.cmdEnviarRevisao(); }
      };
    } else if (t.status === 'emRevisao' && t.souCriador) {
      principal = { label: m.aceitar, busy: this.cmdAceitarStatus === 'loading', run: () => { this.cmdAceitar(); } };
    }

    const podeDevolver = t.status === 'emRevisao' && t.souCriador;
    const podeCancelar = t.souCriador && (t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao');

    const ok = this.cmdIniciarStatus === 'success' ? m.okIniciada
      : this.cmdEnviarRevisaoStatus === 'success' ? m.okEnviada
      : this.cmdAceitarStatus === 'success' ? m.okAceita
      : this.cmdDevolverStatus === 'success' ? m.okDevolvida
      : this.cmdCancelarStatus === 'success' ? m.okCancelada
      : null;
    const erro = primeiroErro(this.cmdIniciarError, this.cmdEnviarRevisaoError, this.cmdAceitarError, this.cmdDevolverError, this.cmdCancelarError);
    const motivo = this.cmdDevolverDraft.motivoDevolucao ?? '';

    return html`
      ${okBox(ok)} ${erroBox(m, erro)}
      ${podeDevolver || podeCancelar
        ? html`<details class=${BOX}>
            <summary class=${SUMMARY}>${m.maisAcoes}</summary>
            <div class="p-3 flex flex-col gap-4">
              ${podeDevolver
                ? html`<div class="flex flex-col gap-3">
                    <groupentertext--ml-multiline-text
                      .value=${motivo}
                      .rows=${3}
                      required
                      @input=${onText((v) => this.setCmdDevolverDraft({ motivoDevolucao: v }))}
                      @change=${onText((v) => this.setCmdDevolverDraft({ motivoDevolucao: v }))}
                    >
                      <Label>${m.motivoCampo}</Label>
                      <Helper>${m.motivoDica}</Helper>
                    </groupentertext--ml-multiline-text>
                    ${botao(m.devolver, () => { this.cmdDevolver(); }, { variant: 'secondary', disabled: !motivo.trim() || ocupado, loading: this.cmdDevolverStatus === 'loading' })}
                  </div>`
                : nothing}
              ${podeCancelar
                ? html`<details class="rounded-lg border border-[var(--border-default,currentColor)]">
                    <summary class=${SUMMARY}>${m.cancelarAbrir}</summary>
                    <div class="p-3 flex flex-col gap-3">
                      <p class="text-sm">${fmt(m.cancelarAviso, { t: t.titulo })}</p>
                      ${botao(m.cancelarConfirmar, () => { this.cmdCancelar(); }, { variant: 'danger', disabled: ocupado, loading: this.cmdCancelarStatus === 'loading' })}
                    </div>
                  </details>`
                : nothing}
            </div>
          </details>`
        : nothing}
      ${principal ? botao(principal.label, principal.run, { disabled: ocupado, loading: principal.busy }) : nothing}
    `;
  }

  /* ───────────── formulários ───────────── */

  private renderCampos(d: SalvarEdicaoDraft, patch: (p: Partial<SalvarEdicaoDraft>) => void, atual: { id: string; nome: string } | null) {
    const m = this.msg;
    const incluiAtual = !!atual && d.responsavelId === atual.id && !this.membros.some((x) => x.id === atual.id);
    return html`
      <div class="flex flex-col gap-4">
        <groupselectone--ml-select
          .value=${d.listaId}
          required
          @change=${(e: Event) => {
            const v = strOf(e);
            if (v !== undefined) patch({ listaId: v });
          }}
        >
          <Label>${m.campoLista}</Label>
          <Trigger>${m.escolhaLista}</Trigger>
          ${this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
        </groupselectone--ml-select>

        <groupentertext--ml-enter-text
          .value=${d.titulo ?? ''}
          required
          @input=${onText((v) => patch({ titulo: v === '' ? null : v }))}
          @change=${onText((v) => patch({ titulo: v === '' ? null : v }))}
        >
          <Label>${m.campoTitulo}</Label>
        </groupentertext--ml-enter-text>

        <groupentertext--ml-multiline-text
          .value=${d.descricao ?? ''}
          .rows=${4}
          @input=${onText((v) => patch({ descricao: v === '' ? null : v }))}
          @change=${onText((v) => patch({ descricao: v === '' ? null : v }))}
        >
          <Label>${m.campoDescricao}</Label>
        </groupentertext--ml-multiline-text>

        <groupselectone--ml-segmented-control
          .value=${d.prioridade}
          required
          @change=${(e: Event) => {
            const v = strOf(e);
            if (v === 'low' || v === 'medium' || v === 'high') patch({ prioridade: v });
          }}
        >
          <Label>${m.campoPrioridade}</Label>
          <Item value="low">${m.prioBaixa}</Item>
          <Item value="medium">${m.prioMedia}</Item>
          <Item value="high">${m.prioAlta}</Item>
        </groupselectone--ml-segmented-control>

        <groupenterdate--ml-date-picker
          .value=${d.prazo}
          .locale=${document.documentElement.lang || 'pt-BR'}
          required
          @change=${(e: Event) => {
            const v = strOf(e);
            if (v !== undefined) patch({ prazo: v });
          }}
        >
          <Label>${m.campoPrazo}</Label>
        </groupenterdate--ml-date-picker>

        <groupselectone--ml-combobox
          .value=${d.responsavelId}
          required
          @input=${(e: Event) => {
            const v = detailValue(e);
            if (typeof v === 'string') this.qryBuscarMembros(v);
          }}
          @change=${(e: Event) => {
            const v = strOf(e);
            if (v !== undefined) patch({ responsavelId: v });
          }}
        >
          <Label>${m.campoResponsavel}</Label>
          <Helper>${m.buscaResponsavel}</Helper>
          ${incluiAtual && atual ? html`<Item value=${atual.id}>${atual.nome}</Item>` : nothing}
          ${this.membros.map((x) => html`<Item value=${x.id}>${x.details.identification.name}</Item>`)}
          <Empty>${m.semMembros}</Empty>
        </groupselectone--ml-combobox>
      </div>
    `;
  }

  private renderItens(itens: ItemChecklistDraft[], set: (v: ItemChecklistDraft[]) => void, opt: { feito: boolean; remover: boolean }) {
    const m = this.msg;
    const mudar = (i: number, p: Partial<ItemChecklistDraft>) => set(itens.map((x, j) => (j === i ? { ...x, ...p } : x)));
    return html`
      <div class="flex flex-col gap-3">
        <ul class="flex flex-col gap-3">
          ${itens.map(
            (it, i) => html`<li class="${BOX} p-3 flex flex-col gap-2">
              <groupentertext--ml-enter-text
                .value=${it.descricao ?? ''}
                @input=${onText((v) => mudar(i, { descricao: v }))}
                @change=${onText((v) => mudar(i, { descricao: v }))}
              >
                <Label>${m.campoItem} ${i + 1}</Label>
              </groupentertext--ml-enter-text>
              ${opt.feito
                ? html`<groupenterboolean--ml-checkbox-preference
                    .value=${!!it.feito}
                    @change=${(e: Event) => {
                      const v = detailValue(e);
                      if (typeof v === 'boolean') mudar(i, { feito: v });
                    }}
                  >
                    <Label>${m.feito}</Label>
                  </groupenterboolean--ml-checkbox-preference>`
                : nothing}
              ${opt.remover && it.id === null
                ? html`<button type="button" class=${BTN_SEC} @click=${() => set(itens.filter((_x, j) => j !== i).map((x, j) => ({ ...x, ordem: j + 1 })))}>${m.removerItem}</button>`
                : nothing}
            </li>`
          )}
        </ul>
        <button type="button" class=${BTN_SEC} @click=${() => set([...itens, { id: null, version: null, descricao: null, ordem: itens.length + 1, feito: false }])}>${m.adicionarItem}</button>
      </div>
    `;
  }

  private renderCriar() {
    const m = this.msg;
    const d = this.cmdCriarTarefaDraft;
    const busy = this.cmdCriarTarefaStatus === 'loading';
    const valido = camposValidos(d) && itensValidos(d.checklist);
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-5">
        ${this.cmdCriarTarefaStatus === 'success'
          ? html`<div class="flex flex-col gap-2">
              ${okBox(m.okCriada)}
              ${botao(m.abrirCriada, () => { this.setScenario('detalhe'); this.qryMinhasTarefas(); }, { variant: 'secondary' })}
            </div>`
          : nothing}
        ${this.renderCampos(d, (p) => this.setCmdCriarTarefaDraft({ ...this.cmdCriarTarefaDraft, ...p }), null)}
        <section class="flex flex-col gap-2" aria-label=${m.checklistInicial}>
          <h3 class="font-semibold text-[var(--text-strong,currentColor)]">${m.checklistInicial}</h3>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${m.checklistInicialDica}</p>
          ${this.renderItens(d.checklist, (itens) => this.setCmdCriarTarefaDraft({ ...this.cmdCriarTarefaDraft, checklist: itens }), { feito: false, remover: true })}
        </section>
        <div class="sticky bottom-0 -mx-4 px-4 py-3 flex flex-col gap-2 bg-[var(--page-bg,transparent)] border-t border-[var(--border-subtle,currentColor)]">
          ${erroBox(m, this.cmdCriarTarefaError)}
          ${valido ? nothing : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.faltaPreencher}</p>`}
          ${botao(m.criarTarefa, () => { this.cmdCriarTarefa(); }, { disabled: !valido || busy, loading: busy })}
          <button type="button" class=${BTN_SEC} @click=${() => this.clearCmdCriarTarefaDraft()}>${m.descartarRascunho}</button>
        </div>
      </div>
    `;
  }

  private renderEditar() {
    const m = this.msg;
    const t = this.tarefa;
    const d = this.cmdSalvarEdicaoDraft;
    const busy = this.cmdSalvarEdicaoStatus === 'loading';
    const pode = camposValidos(d) && mudou(d, t);
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-5">
        ${t
          ? html`
              <p class="text-sm text-[var(--text-muted,currentColor)]">${m.dicaEdicao}</p>
              ${this.renderCampos(d, (p) => this.setCmdSalvarEdicaoDraft({ ...this.cmdSalvarEdicaoDraft, ...p }), { id: t.responsavelId, nome: t.responsavel.details.identification.name })}
              <div class="sticky bottom-0 -mx-4 px-4 py-3 flex flex-col gap-2 bg-[var(--page-bg,transparent)] border-t border-[var(--border-subtle,currentColor)]">
                ${this.cmdSalvarEdicaoStatus === 'success' ? okBox(m.okEditada) : nothing}
                ${erroBox(m, this.cmdSalvarEdicaoError)}
                ${botao(m.salvarAlteracoes, () => { this.cmdSalvarEdicao(); }, { disabled: !pode || busy, loading: busy })}
                ${this.cmdSalvarEdicaoStatus === 'success' ? botao(m.voltarTarefa, () => this.setScenario('detalhe'), { variant: 'secondary' }) : nothing}
              </div>`
          : html`<p class="p-4 text-[var(--text-muted,currentColor)]">${m.semTarefa}</p>`}
      </div>
    `;
  }

  private renderChecklistForm() {
    const m = this.msg;
    const t = this.tarefa;
    const d = this.cmdSalvarChecklistDraft;
    const busy = this.cmdSalvarChecklistStatus === 'loading';
    const valido = itensValidos(d.itens);
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-5">
        ${t
          ? html`
              <p class="text-sm text-[var(--text-muted,currentColor)]">${m.dicaChecklist}</p>
              ${this.renderItens(d.itens, (itens) => this.setCmdSalvarChecklistDraft({ itens }), { feito: true, remover: true })}
              <div class="sticky bottom-0 -mx-4 px-4 py-3 flex flex-col gap-2 bg-[var(--page-bg,transparent)] border-t border-[var(--border-subtle,currentColor)]">
                ${this.cmdSalvarChecklistStatus === 'success' ? okBox(m.okChecklist) : nothing}
                ${erroBox(m, this.cmdSalvarChecklistError)}
                ${botao(m.salvarChecklist, () => { this.cmdSalvarChecklist(); }, { disabled: !valido || busy, loading: busy })}
                ${this.cmdSalvarChecklistStatus === 'success' ? botao(m.voltarTarefa, () => this.setScenario('detalhe'), { variant: 'secondary' }) : nothing}
              </div>`
          : html`<p class="p-4 text-[var(--text-muted,currentColor)]">${m.semTarefa}</p>`}
      </div>
    `;
  }
}
