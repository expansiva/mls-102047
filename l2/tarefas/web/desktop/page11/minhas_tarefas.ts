/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
  ErrorState,
  ItemChecklistDraft,
  MinhasTarefasFiltro,
  Prioridade,
  SalvarEdicaoDraft,
  TarefaDetalhe,
  TarefaResumo,
} from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-group.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  titulo: 'Minhas tarefas',
  subtitulo: 'Tarefas que você criou ou pelas quais é responsável, por prazo.',
  novaTarefa: 'Nova tarefa',
  fTodas: 'Todas',
  fCriadas: 'Criadas por mim',
  fAtribuidas: 'Atribuídas a mim',
  fRevisao: 'Em revisão',
  fDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colResp: 'Responsável',
  colChecklist: 'Checklist',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  subtarefas: 'Subtarefas',
  venceHoje: 'Vence hoje',
  atrasada: 'Atrasada',
  devolvidaEm: 'Devolvida em',
  listaVazia: 'Nenhuma tarefa por aqui.',
  listaVaziaAjuda: 'Mude o filtro ou crie uma nova tarefa.',
  carregandoLista: 'Carregando tarefas…',
  carregarMais: 'Carregar mais tarefas',
  erroLista: 'Não foi possível carregar suas tarefas.',
  tentarNovamente: 'Tentar novamente',
  semContexto: 'Esta página foi aberta sem o que precisa para mostrar as tarefas.',
  semContextoAjuda: 'Volte para a página de onde você veio e abra as tarefas novamente.',
  voltarAnterior: 'Voltar à página anterior',
  voltar: 'Voltar',
  semValor: '—',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prLow: 'Baixa',
  prMedium: 'Média',
  prHigh: 'Alta',
  tarefaAberta: 'Tarefa',
  escolhaTarefa: 'Escolha uma tarefa na lista para ver os detalhes, o histórico e as ações disponíveis para você.',
  carregandoTarefa: 'Abrindo a tarefa…',
  erroTarefa: 'Não foi possível abrir a tarefa.',
  editarTarefa: 'Editar tarefa',
  lblDescricao: 'Descrição',
  lblLista: 'Lista',
  lblCriador: 'Criada por',
  lblResponsavel: 'Responsável',
  lblPrazo: 'Prazo',
  lblPrioridade: 'Prioridade',
  lblSituacao: 'Situação',
  lblCriadaEm: 'Criada em',
  semDescricao: 'Sem descrição.',
  motivoTitulo: 'Motivo da devolução',
  lblChecklist: 'Checklist',
  feito: 'Feito',
  pendente: 'Pendente',
  checklistVazia: 'Esta tarefa não tem itens na checklist.',
  iniciar: 'Iniciar tarefa',
  enviarRevisao: 'Enviar para revisão',
  reenviarRevisao: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolver: 'Devolver para ajuste',
  cancelarTarefa: 'Cancelar tarefa',
  semAcoes: 'Nenhuma ação de ciclo disponível para você nesta etapa.',
  motivoDevolver: 'O que precisa ser ajustado',
  motivoAjuda: 'Obrigatório para devolver a tarefa.',
  historicoTitulo: 'Histórico',
  histColQuando: 'Quando',
  histColEvento: 'O que aconteceu',
  evCriada: 'Tarefa criada por',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Entrega aceita, tarefa concluída',
  evCancelada: 'Tarefa cancelada',
  tituloCancelar: 'Cancelar esta tarefa?',
  cancelarAviso: 'A tarefa será cancelada e não mudará mais de situação:',
  confirmarCancelar: 'Sim, cancelar tarefa',
  manter: 'Manter tarefa',
  tituloEditar: 'Ajustar tarefa',
  tituloCriar: 'Detalhes da nova tarefa',
  dadosTarefa: 'Dados da tarefa',
  fLista: 'Lista',
  fTitulo: 'Título',
  fDescricao: 'Descrição',
  fPrioridade: 'Prioridade',
  fPrazo: 'Prazo',
  fResp: 'Responsável',
  ajudaRespEditar: 'Digite o nome para buscar. Só quem criou a tarefa troca o responsável.',
  ajudaRespCriar: 'Digite o nome para buscar um membro ativo da equipe.',
  phPrazo: 'Escolha a data',
  semListas: 'Nenhuma lista ativa disponível',
  semMembros: 'Nenhum membro encontrado',
  salvarEdicao: 'Salvar alterações',
  criarTarefa: 'Criar tarefa',
  salvarChecklist: 'Salvar checklist',
  checklistInicial: 'Checklist inicial',
  itemDescricao: 'Descrição do item',
  adicionarItem: 'Adicionar item',
  removerItem: 'Remover item',
  obrigatorios: 'Preencha lista, título, prazo e responsável para continuar.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type Status = TarefaResumo['status'];
type CamposDraft = Pick<SalvarEdicaoDraft, 'listaId' | 'titulo' | 'details' | 'prioridade' | 'prazo' | 'responsavelId'>;

const STATUS_KEY: Record<Status, keyof PageMessageType> = {
  aFazer: 'stAFazer',
  emAndamento: 'stEmAndamento',
  emRevisao: 'stEmRevisao',
  concluida: 'stConcluida',
  cancelada: 'stCancelada',
};
const STATUS_CLS: Record<Status, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--text-muted,currentColor)]',
};
const PRIO_KEY: Record<Prioridade, keyof PageMessageType> = { low: 'prLow', medium: 'prMedium', high: 'prHigh' };
const PRIO_CLS: Record<Prioridade, string> = {
  low: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  medium: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  high: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
};
const FILTROS: { value: string; key: keyof PageMessageType }[] = [
  { value: 'todas', key: 'fTodas' },
  { value: 'criadasPorMim', key: 'fCriadas' },
  { value: 'atribuidasAMim', key: 'fAtribuidas' },
  { value: 'emRevisao', key: 'fRevisao' },
  { value: 'devolvidas', key: 'fDevolvidas' },
];
const ABERTAS: string[] = ['aFazer', 'emAndamento', 'emRevisao'];

const lang = () => document.documentElement.lang || undefined;
function toDate(v: string) {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(v) ? `${v}T00:00:00` : v);
}
function fmtDate(v?: string | null) {
  if (!v) return '';
  const d = toDate(v);
  return Number.isNaN(d.getTime()) ? v : new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}
function fmtDateTime(v?: string | null) {
  if (!v) return '';
  const d = toDate(v);
  return Number.isNaN(d.getTime()) ? v : new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}
function val<T>(e: Event): T | undefined {
  return (e as CustomEvent<{ value: T }>).detail?.value;
}
const on =
  <T,>(fn: (v: T) => void) =>
  (e: Event) => {
    const v = val<T>(e);
    if (v !== undefined) fn(v);
  };
const patchItem = (list: ItemChecklistDraft[], i: number, patch: Partial<ItemChecklistDraft>): ItemChecklistDraft[] =>
  list.map((it, k) => (k === i ? { ...it, ...patch } : it));
const novoItem = (list: ItemChecklistDraft[]): ItemChecklistDraft[] => [
  ...list,
  { id: null, version: null, descricao: '', ordem: list.length + 1, feito: false },
];
const semItem = (list: ItemChecklistDraft[], i: number): ItemChecklistDraft[] =>
  list.filter((_, k) => k !== i).map((it, k) => ({ ...it, ordem: k + 1 }));

const CARD = 'rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]';
const MUTED = 'text-[var(--text-muted,currentColor)]';

@customElement('tarefas--web--desktop--page11--minhas_tarefas-102047')
export class TarefasDesktopPage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    return html`
      <div class="flex min-h-full flex-col gap-5 bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${m.titulo}</h1>
            <p class="mt-1 text-sm ${MUTED}">${m.subtitulo}</p>
          </div>
          ${this.btn(m.novaTarefa, 'primary', () => this.abrirCriar())}
        </header>
        <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-6">
          ${this.renderLista()} ${this.renderPainel()}
        </div>
      </div>
    `;
  }

  private abrirCriar() {
    this.clearCmdCriarTarefaDraft();
    if (!this.listas.length) void this.qryListasAtivas();
    this.setScenario('criar');
  }

  private btn(
    label: string,
    variant: string,
    onAction: () => unknown,
    opts: { loading?: boolean; disabled?: boolean; size?: string } = {},
  ) {
    return html`<grouptriggeraction--ml-button-group
      data-variant=${variant}
      size=${opts.size ?? 'md'}
      .loading=${!!opts.loading}
      .disabled=${!!opts.disabled}
      @action=${() => {
        onAction();
      }}
    >
      <Label>${label}</Label>
    </grouptriggeraction--ml-button-group>`;
  }

  private erro(e: ErrorState) {
    return e
      ? html`<div aria-live="polite">
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
            <Message>${e.message}</Message>
          </groupnotifyuser--ml-contextual-feedback>
        </div>`
      : nothing;
  }

  private chip(cls: string, text: string) {
    return html`<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}">${text}</span>`;
  }

  // ───────────── Lista ─────────────
  private renderLista() {
    const m = this.msg;
    const items = this.tarefas?.items ?? [];
    const sel = items.findIndex((t) => t.id === this.selectedTarefa);
    const loading = this.qryMinhasTarefasStatus === 'loading';
    const err = this.qryMinhasTarefasError;
    const semContexto = err?.code === 'client.preconditionMissing';
    return html`
      <section data-organism-id="listaTarefas" class="flex min-w-0 flex-col gap-3" aria-busy=${loading ? 'true' : 'false'}>
        <groupnavigatesection--ml-navigate-pills
          .value=${this.filtro ?? 'todas'}
          @change=${on<string>((v) => {
            void this.qryMinhasTarefas(v === 'todas' ? null : (v as MinhasTarefasFiltro));
          })}
        >
          ${FILTROS.map((f) => html`<Tab value=${f.value} title=${m[f.key]}></Tab>`)}
        </groupnavigatesection--ml-navigate-pills>
        ${semContexto
          ? html`<div class="${CARD} flex flex-col items-start gap-3 p-6" aria-live="polite">
              <p class="font-medium text-[var(--text-strong,currentColor)]">${m.semContexto}</p>
              <p class="text-sm ${MUTED}">${m.semContextoAjuda}</p>
              ${this.btn(m.voltarAnterior, 'secondary', () => history.back())}
            </div>`
          : err
            ? html`<div class="${CARD} flex flex-col items-start gap-3 p-4" aria-live="polite">
                <p class="text-sm">${m.erroLista} ${err.message}</p>
                ${this.btn(m.tentarNovamente, 'secondary', () => this.qryMinhasTarefas(), { size: 'sm' })}
              </div>`
            : nothing}
        <div class="${loading && items.length ? 'opacity-60' : ''}">
          <groupviewtable--ml-data-table
            .value=${sel >= 0 ? String(sel) : ''}
            .loading=${loading && items.length === 0}
            @rowClick=${(e: CustomEvent<{ index: number }>) => {
              const row = items[e.detail?.index];
              if (row) {
                void this.selectTarefa(row.id);
                this.setScenario('detalhe');
              }
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead key="titulo">${m.colTarefa}</TableHead>
                <TableHead key="responsavel">${m.colResp}</TableHead>
                <TableHead key="checklist">${m.colChecklist}</TableHead>
                <TableHead key="prazo" align="right">${m.colPrazo}</TableHead>
                <TableHead key="situacao">${m.colSituacao}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>${items.map((r) => this.renderLinha(r))}</TableBody>
            <Empty>
              <div class="py-8 text-center">
                <p class="font-medium">${m.listaVazia}</p>
                <p class="text-sm ${MUTED}">${m.listaVaziaAjuda}</p>
              </div>
            </Empty>
            <Loading><div class="py-8 text-center ${MUTED}">${m.carregandoLista}</div></Loading>
          </groupviewtable--ml-data-table>
        </div>
        ${this.tarefas?.hasMore
          ? html`<div>
              ${this.btn(m.carregarMais, 'secondary', () => this.qryMinhasTarefas(undefined, (this.tarefas?.page ?? 1) + 1, true), {
                loading,
                size: 'sm',
              })}
            </div>`
          : nothing}
      </section>
    `;
  }

  private renderLinha(r: TarefaResumo) {
    const m = this.msg;
    return html`
      <TableRow key=${r.id}>
        <TableCell>
          <div class="font-medium text-[var(--text-strong,currentColor)]">${r.titulo}</div>
          <div class="text-xs ${MUTED}">
            ${r.lista.nome} · ${m[PRIO_KEY[r.prioridade]]} · ${m.subtarefas}: ${r.details.quantidadeSubtarefas}
          </div>
        </TableCell>
        <TableCell>${r.responsavel.details.identification.name}</TableCell>
        <TableCell>${r.details.progressoChecklist}</TableCell>
        <TableCell>
          <div class="text-right">
            <div class="${r.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}">
              ${fmtDate(r.prazo) || m.semValor}
            </div>
            ${r.details.atrasada
              ? html`<div class="text-xs ${MUTED}">${m.atrasada}</div>`
              : r.details.venceHoje
                ? html`<div class="text-xs font-medium">${m.venceHoje}</div>`
                : nothing}
          </div>
        </TableCell>
        <TableCell>
          ${this.chip(STATUS_CLS[r.status], m[STATUS_KEY[r.status]])}
          ${r.details.devolvidaEm
            ? html`<div class="mt-1 text-xs ${MUTED}">${m.devolvidaEm} ${fmtDate(r.details.devolvidaEm)}</div>`
            : nothing}
        </TableCell>
      </TableRow>
    `;
  }

  // ───────────── Painel (cenas) ─────────────
  private renderPainel() {
    const m = this.msg;
    return html`
      <div class="${CARD} min-w-0 p-4">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'detalhe'}
          .backLabel=${m.voltar}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="detalhe" title=${this.tarefa?.titulo ?? m.tarefaAberta}>${this.renderDetalheScene()}</Scene>
          <Scene value="editar" nav="back" backTo="detalhe" title=${m.tituloEditar}>${this.renderEditar()}</Scene>
          <Scene value="criar" nav="back" backTo="detalhe" title=${m.tituloCriar}>${this.renderCriar()}</Scene>
          <Scene value="cancelar" nav="back" backTo="detalhe" title=${m.tituloCancelar}>${this.renderCancelar()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private renderDetalheScene() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t) {
      const loading = this.qryTarefaStatus === 'loading';
      return html`<div data-organism-id="detalheTarefa" class="py-10 text-center text-sm ${MUTED}" aria-live="polite" aria-busy=${loading ? 'true' : 'false'}>
        ${loading ? m.carregandoTarefa : this.qryTarefaError ? `${m.erroTarefa} ${this.qryTarefaError.message}` : m.escolhaTarefa}
      </div>`;
    }
    return html`
      <div class="flex flex-col gap-6 ${this.qryTarefaStatus === 'loading' ? 'opacity-60' : ''}" aria-busy=${this.qryTarefaStatus === 'loading' ? 'true' : 'false'}>
        ${this.renderAcoes(t)} ${this.renderDetalhe(t)} ${this.renderHistorico(t)}
      </div>
    `;
  }

  private dd(label: string, value: unknown) {
    return html`<div>
      <dt class="text-xs ${MUTED}">${label}</dt>
      <dd class="text-sm font-medium text-[var(--text-strong,currentColor)]">${value}</dd>
    </div>`;
  }

  private renderDetalhe(t: TarefaDetalhe) {
    const m = this.msg;
    return html`
      <div data-organism-id="detalheTarefa" class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-2">
            ${this.chip(STATUS_CLS[t.status], m[STATUS_KEY[t.status]])} ${this.chip(PRIO_CLS[t.prioridade], m[PRIO_KEY[t.prioridade]])}
          </div>
          ${this.btn(m.editarTarefa, 'secondary', () => this.setScenario('editar'), { size: 'sm' })}
        </div>
        ${t.details.motivoDevolucao
          ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}>
              <Title>${m.motivoTitulo}</Title>
              <Message>${t.details.motivoDevolucao}</Message>
            </groupnotifyuser--ml-contextual-feedback>`
          : nothing}
        <p class="text-sm">${t.details.descricao || m.semDescricao}</p>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-3">
          ${this.dd(m.lblLista, t.lista.nome)} ${this.dd(m.lblPrazo, fmtDate(t.prazo) || m.semValor)}
          ${this.dd(m.lblResponsavel, t.responsavel.details.identification.name)}
          ${this.dd(m.lblCriador, t.criador.details.identification.name)} ${this.dd(m.lblCriadaEm, fmtDateTime(t.criadaEm))}
        </dl>
        <div>
          <h3 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.lblChecklist}</h3>
          ${t.checklist.length
            ? html`<ul class="flex flex-col gap-1.5">
                ${t.checklist.map(
                  (it) => html`<li class="flex items-start gap-2 text-sm">
                    <span aria-hidden="true" class="${it.feito ? 'text-[var(--status-success-text,currentColor)]' : MUTED}">${it.feito ? '✓' : '○'}</span>
                    <span class="sr-only">${it.feito ? m.feito : m.pendente}</span>
                    <span class="${it.feito ? MUTED : ''}">${it.details.descricao}</span>
                  </li>`,
                )}
              </ul>`
            : html`<p class="text-sm ${MUTED}">${m.checklistVazia}</p>`}
        </div>
      </div>
    `;
  }

  private renderAcoes(t: TarefaDetalhe) {
    const m = this.msg;
    const aberta = ABERTAS.includes(t.status);
    const executa = t.souResponsavel && (t.status === 'aFazer' || t.status === 'emAndamento');
    const revisa = t.souCriador && t.status === 'emRevisao';
    const cancela = t.souCriador && aberta;
    const motivo = this.cmdDevolverDraft.details.motivoDevolucao ?? '';
    const err =
      this.cmdIniciarError ?? this.cmdEnviarRevisaoError ?? this.cmdAceitarError ?? this.cmdDevolverError ?? this.cmdCancelarError;
    return html`
      <div data-organism-id="acoesTarefa" class="flex flex-col gap-3">
        ${executa || revisa || cancela
          ? html`<div class="flex flex-wrap items-center gap-2">
              ${t.souResponsavel && t.status === 'aFazer'
                ? this.btn(m.iniciar, 'primary', () => this.cmdIniciar(), { loading: this.cmdIniciarStatus === 'loading' })
                : nothing}
              ${t.souResponsavel && t.status === 'emAndamento'
                ? this.btn(
                    t.details.motivoDevolucao ? m.reenviarRevisao : m.enviarRevisao,
                    'primary',
                    () => this.cmdEnviarRevisao(),
                    { loading: this.cmdEnviarRevisaoStatus === 'loading' },
                  )
                : nothing}
              ${revisa ? this.btn(m.aceitar, 'primary', () => this.cmdAceitar(), { loading: this.cmdAceitarStatus === 'loading' }) : nothing}
              ${cancela ? this.btn(m.cancelarTarefa, 'secondary', () => this.setScenario('cancelar')) : nothing}
            </div>`
          : html`<p class="text-sm ${MUTED}">${m.semAcoes}</p>`}
        ${revisa
          ? html`<div class="flex flex-col gap-2">
              <groupentertext--ml-multiline-text
                .rows=${3}
                .value=${motivo}
                @input=${on<string>((v) => this.setCmdDevolverDraft({ details: { motivoDevolucao: v } }))}
                @change=${on<string>((v) => this.setCmdDevolverDraft({ details: { motivoDevolucao: v } }))}
              >
                <Label>${m.motivoDevolver}</Label>
                <Helper>${m.motivoAjuda}</Helper>
              </groupentertext--ml-multiline-text>
              <div>
                ${this.btn(m.devolver, 'secondary', () => this.cmdDevolver(), {
                  loading: this.cmdDevolverStatus === 'loading',
                  disabled: !motivo.trim(),
                })}
              </div>
            </div>`
          : nothing}
        ${this.erro(err)}
      </div>
    `;
  }

  private renderHistorico(t: TarefaDetalhe) {
    const m = this.msg;
    return html`
      <div data-organism-id="historicoTarefa">
        <h3 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.historicoTitulo}</h3>
        <groupviewdata--ml-timeline-view>
          <Columns>
            <Column field="quando" header=${m.histColQuando}></Column>
            <Column field="evento" header=${m.histColEvento}></Column>
          </Columns>
          <Rows>
            <Row>
              <Cell>${fmtDateTime(t.criadaEm)}</Cell>
              <Cell>${m.evCriada} ${t.criador.details.identification.name}</Cell>
            </Row>
            ${t.details.devolvidaEm
              ? html`<Row>
                  <Cell>${fmtDateTime(t.details.devolvidaEm)}</Cell>
                  <Cell>
                    <div>${m.evDevolvida}</div>
                    ${t.details.motivoDevolucao ? html`<div class="text-xs ${MUTED}">${t.details.motivoDevolucao}</div>` : nothing}
                  </Cell>
                </Row>`
              : nothing}
            ${t.details.concluidaEm
              ? html`<Row><Cell>${fmtDateTime(t.details.concluidaEm)}</Cell><Cell>${m.evConcluida}</Cell></Row>`
              : nothing}
            ${t.details.canceladaEm
              ? html`<Row><Cell>${fmtDateTime(t.details.canceladaEm)}</Cell><Cell>${m.evCancelada}</Cell></Row>`
              : nothing}
          </Rows>
        </groupviewdata--ml-timeline-view>
      </div>
    `;
  }

  // ───────────── Cancelar (confirmação) ─────────────
  private renderCancelar() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t) return html`<p class="text-sm ${MUTED}">${m.escolhaTarefa}</p>`;
    return html`
      <div class="flex flex-col gap-4">
        <p class="text-sm">${m.cancelarAviso}</p>
        <p class="font-semibold text-[var(--text-strong,currentColor)]">${t.titulo}</p>
        ${this.erro(this.cmdCancelarError)}
        <div class="flex flex-wrap gap-2">
          ${this.btn(
            m.confirmarCancelar,
            'danger',
            () =>
              this.cmdCancelar().then(() => {
                if (this.cmdCancelarStatus === 'success') this.setScenario('detalhe');
              }),
            { loading: this.cmdCancelarStatus === 'loading' },
          )}
          ${this.btn(m.manter, 'secondary', () => this.setScenario('detalhe'))}
        </div>
      </div>
    `;
  }

  // ───────────── Formulário ─────────────
  private renderCampos(
    d: CamposDraft,
    patch: (p: Partial<CamposDraft>) => void,
    dono: { id: string; nome: string } | null,
    podeTrocarDono: boolean,
  ) {
    const m = this.msg;
    const opcoes = this.membros.map((x) => ({ id: x.id, nome: x.details.identification.name }));
    if (dono && !opcoes.some((o) => o.id === dono.id)) opcoes.unshift(dono);
    const lingua = document.documentElement.lang || 'pt-BR';
    return html`
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <groupselectone--ml-select-one-autocomplete
            .value=${d.listaId}
            .required=${true}
            @change=${on<string | null>((v) => patch({ listaId: v }))}
          >
            <Label>${m.fLista}</Label>
            ${this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
            <Empty>${m.semListas}</Empty>
          </groupselectone--ml-select-one-autocomplete>
        </div>
        <div class="col-span-2">
          <groupentertext--ml-enter-text
            .value=${d.titulo ?? ''}
            .required=${true}
            @input=${on<string>((v) => patch({ titulo: v }))}
            @change=${on<string>((v) => patch({ titulo: v }))}
          >
            <Label>${m.fTitulo}</Label>
          </groupentertext--ml-enter-text>
        </div>
        <div class="col-span-2">
          <groupentertext--ml-multiline-text
            .rows=${4}
            .value=${d.details.descricao ?? ''}
            @input=${on<string>((v) => patch({ details: { ...d.details, descricao: v } }))}
            @change=${on<string>((v) => patch({ details: { ...d.details, descricao: v } }))}
          >
            <Label>${m.fDescricao}</Label>
          </groupentertext--ml-multiline-text>
        </div>
        <div class="col-span-2">
          <groupselectone--ml-segmented-control
            .value=${d.prioridade}
            @change=${on<string | null>((v) => patch({ prioridade: v as Prioridade | null }))}
          >
            <Label>${m.fPrioridade}</Label>
            <Item value="low">${m.prLow}</Item>
            <Item value="medium">${m.prMedium}</Item>
            <Item value="high">${m.prHigh}</Item>
          </groupselectone--ml-segmented-control>
        </div>
        <div>
          <groupenterdate--ml-date-picker
            .value=${d.prazo}
            .locale=${lingua}
            .required=${true}
            .placeholder=${m.phPrazo}
            @change=${on<string | null>((v) => patch({ prazo: v }))}
          >
            <Label>${m.fPrazo}</Label>
          </groupenterdate--ml-date-picker>
        </div>
        <div>
          <groupselectone--ml-combobox
            .value=${d.responsavelId}
            .required=${true}
            .disabled=${!podeTrocarDono}
            @input=${(e: Event) => {
              const v = val<string>(e);
              if (typeof v === 'string') void this.qryBuscarMembros(v);
            }}
            @change=${on<string | null>((v) => patch({ responsavelId: v }))}
          >
            <Label>${m.fResp}</Label>
            <Helper>${podeTrocarDono && !dono ? m.ajudaRespCriar : m.ajudaRespEditar}</Helper>
            ${opcoes.map((o) => html`<Item value=${o.id}>${o.nome}</Item>`)}
            <Empty>${m.semMembros}</Empty>
          </groupselectone--ml-combobox>
        </div>
      </div>
    `;
  }

  private renderItemChecklist(
    it: ItemChecklistDraft,
    i: number,
    onPatch: (i: number, p: Partial<ItemChecklistDraft>) => void,
    onRemove: ((i: number) => void) | null,
  ) {
    const m = this.msg;
    return html`<li class="flex items-start gap-3">
      <groupenterboolean--ml-checkbox-preference
        .value=${!!it.feito}
        @change=${on<boolean>((v) => onPatch(i, { feito: v }))}
      >
        <Label>${m.feito}</Label>
      </groupenterboolean--ml-checkbox-preference>
      <groupentertext--ml-enter-text
        class="min-w-0 flex-1"
        .value=${it.descricao ?? ''}
        @input=${on<string>((v) => onPatch(i, { descricao: v }))}
        @change=${on<string>((v) => onPatch(i, { descricao: v }))}
      >
        <Label data-class="sr-only">${m.itemDescricao}</Label>
      </groupentertext--ml-enter-text>
      ${onRemove ? this.btn(m.removerItem, 'ghost', () => onRemove(i), { size: 'sm' }) : nothing}
    </li>`;
  }

  private renderEditar() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t) return html`<div data-organism-id="formTarefa"><p class="text-sm ${MUTED}">${m.escolhaTarefa}</p></div>`;
    const d = this.cmdSalvarEdicaoDraft;
    const c = this.cmdSalvarChecklistDraft;
    const valido = !!d.titulo?.trim() && !!d.listaId && !!d.prazo && !!d.responsavelId;
    const alterado =
      d.titulo !== t.titulo ||
      d.listaId !== t.listaId ||
      (d.details.descricao ?? '') !== (t.details.descricao ?? '') ||
      d.prioridade !== t.prioridade ||
      d.prazo !== t.prazo ||
      d.responsavelId !== t.responsavelId;
    const checkValido = c.itens.every((i) => !!i.descricao?.trim());
    const setItem = (i: number, p: Partial<ItemChecklistDraft>) =>
      this.setCmdSalvarChecklistDraft({ itens: patchItem(c.itens, i, p) });
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-6">
        <section class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.dadosTarefa}</h3>
          ${this.renderCampos(
            d,
            (p) => this.setCmdSalvarEdicaoDraft({ ...d, ...p }),
            { id: t.responsavelId, nome: t.responsavel.details.identification.name },
            t.souCriador,
          )}
          ${valido ? nothing : html`<p class="text-xs ${MUTED}">${m.obrigatorios}</p>`}
          ${this.erro(this.cmdSalvarEdicaoError)}
          <div>
            ${this.btn(
              m.salvarEdicao,
              'primary',
              () =>
                this.cmdSalvarEdicao().then(() => {
                  if (this.cmdSalvarEdicaoStatus === 'success') this.setScenario('detalhe');
                }),
              { loading: this.cmdSalvarEdicaoStatus === 'loading', disabled: !valido || !alterado },
            )}
          </div>
        </section>
        <section class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.lblChecklist}</h3>
          <ul class="flex flex-col gap-2">${c.itens.map((it, i) => this.renderItemChecklist(it, i, setItem, null))}</ul>
          <div>
            ${this.btn(m.adicionarItem, 'ghost', () => this.setCmdSalvarChecklistDraft({ itens: novoItem(c.itens) }), { size: 'sm' })}
          </div>
          ${this.erro(this.cmdSalvarChecklistError)}
          <div>
            ${this.btn(
              m.salvarChecklist,
              'primary',
              () =>
                this.cmdSalvarChecklist().then(() => {
                  if (this.cmdSalvarChecklistStatus === 'success') this.setScenario('detalhe');
                }),
              { loading: this.cmdSalvarChecklistStatus === 'loading', disabled: !checkValido },
            )}
          </div>
        </section>
      </div>
    `;
  }

  private renderCriar() {
    const m = this.msg;
    const d = this.cmdCriarTarefaDraft;
    const valido = !!d.titulo?.trim() && !!d.listaId && !!d.prazo && !!d.responsavelId;
    const setItem = (i: number, p: Partial<ItemChecklistDraft>) =>
      this.setCmdCriarTarefaDraft({ ...d, checklist: patchItem(d.checklist, i, p) });
    const remover = (i: number) => this.setCmdCriarTarefaDraft({ ...d, checklist: semItem(d.checklist, i) });
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-5">
        ${this.renderCampos(d, (p) => this.setCmdCriarTarefaDraft({ ...d, ...p }), null, true)}
        <section class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.checklistInicial}</h3>
          <ul class="flex flex-col gap-2">${d.checklist.map((it, i) => this.renderItemChecklist(it, i, setItem, remover))}</ul>
          <div>
            ${this.btn(m.adicionarItem, 'ghost', () => this.setCmdCriarTarefaDraft({ ...d, checklist: novoItem(d.checklist) }), {
              size: 'sm',
            })}
          </div>
        </section>
        ${valido ? nothing : html`<p class="text-xs ${MUTED}">${m.obrigatorios}</p>`} ${this.erro(this.cmdCriarTarefaError)}
        <div>
          ${this.btn(
            m.criarTarefa,
            'primary',
            () =>
              this.cmdCriarTarefa().then(() => {
                if (this.cmdCriarTarefaStatus === 'success') this.setScenario('detalhe');
              }),
            { loading: this.cmdCriarTarefaStatus === 'loading', disabled: !valido },
          )}
        </div>
      </div>
    `;
  }
}
