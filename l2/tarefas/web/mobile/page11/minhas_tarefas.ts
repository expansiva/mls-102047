/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
  CriarTarefaDraft,
  ErrorState,
  ItemChecklistDraft,
  MinhasTarefasFiltro,
  Prioridade,
  TarefaDetalhe,
} from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-kebab-action-trigger.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  tituloLista: 'Minhas tarefas',
  tituloDetalhe: 'Tarefa',
  tituloAcoes: 'Outras ações',
  tituloCriar: 'Dados da nova tarefa',
  tituloEditar: 'Editar tarefa',
  voltar: 'Voltar',
  filtroTodas: 'Todas',
  filtroCriadas: 'Criadas por mim',
  filtroAtribuidas: 'Atribuídas a mim',
  filtroRevisao: 'Em revisão',
  filtroDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  listaVazia: 'Nenhuma tarefa por aqui',
  listaVaziaDica: 'As tarefas que você criou ou que foram atribuídas a você aparecem nesta lista.',
  carregando: 'Carregando…',
  erroLista: 'Não foi possível carregar suas tarefas.',
  erroTarefa: 'Não foi possível abrir a tarefa.',
  tentarDeNovo: 'Tentar de novo',
  precondTitulo: 'Faltam informações para abrir suas tarefas',
  precondTexto: 'Esta tela precisa saber quem é você na equipe para listar as tarefas. Volte para a página anterior e abra as tarefas novamente.',
  voltarPagina: 'Voltar à página anterior',
  carregarMais: 'Carregar mais tarefas',
  novaTarefa: 'Nova tarefa',
  subtarefas: 'subtarefas',
  checklistCurto: 'Checklist',
  venceHoje: 'Vence hoje',
  atrasada: 'Atrasada',
  devolvidaChip: 'Devolvida',
  semTarefa: 'Escolha uma tarefa na lista para ver os detalhes.',
  motivoTitulo: 'Motivo da devolução',
  fDescricao: 'Descrição',
  semDescricao: 'Sem descrição',
  fLista: 'Lista',
  criadaPor: 'Criada por',
  fResponsavel: 'Responsável',
  fPrazo: 'Prazo',
  fPrioridade: 'Prioridade',
  fSituacao: 'Situação',
  criadaEm: 'Criada em',
  checklist: 'Checklist',
  checklistVazia: 'Esta tarefa não tem itens na checklist.',
  editarDados: 'Editar dados',
  historico: 'Histórico',
  colEvento: 'Evento',
  colQuando: 'Quando',
  hCriada: 'Tarefa criada',
  hDevolvida: 'Devolvida para ajuste',
  hConcluida: 'Entrega aceita',
  hCancelada: 'Tarefa cancelada',
  statusAFazer: 'A fazer',
  statusEmAndamento: 'Em andamento',
  statusEmRevisao: 'Em revisão',
  statusConcluida: 'Concluída',
  statusCancelada: 'Cancelada',
  prioBaixa: 'Baixa',
  prioMedia: 'Média',
  prioAlta: 'Alta',
  acaoIniciar: 'Iniciar tarefa',
  acaoEnviar: 'Enviar para revisão',
  acaoReenviar: 'Reenviar para revisão',
  acaoAceitar: 'Aceitar entrega',
  maisAcoes: 'Mais ações',
  devolverTitulo: 'Pedir ajuste ao responsável',
  motivoLabel: 'Motivo da devolução',
  motivoAjuda: 'Explique o que precisa ser ajustado.',
  motivoPlaceholder: 'O que precisa mudar?',
  devolver: 'Devolver com motivo',
  encerrarTitulo: 'Encerrar a tarefa',
  cancelarAviso1: 'Você vai cancelar a tarefa “',
  cancelarAviso2: '”. Ela será encerrada e não muda mais de situação.',
  cancelar: 'Cancelar tarefa',
  semAcoes: 'Não há outras ações disponíveis para você nesta tarefa.',
  fListaPlaceholder: 'Escolha a lista',
  fTitulo: 'Título',
  fTituloPlaceholder: 'Dê um nome curto à tarefa',
  fDescricaoPlaceholder: 'O que deve ser feito?',
  fPrazoPlaceholder: 'Escolha a data',
  fResponsavelPlaceholder: 'Digite o nome para buscar',
  responsavelAtual: 'Responsável atual',
  semMembro: 'Nenhum membro encontrado',
  semLista: 'Nenhuma lista disponível',
  itemLabel: 'Item',
  itemPlaceholder: 'O que precisa ser feito?',
  itemFeito: 'Feito',
  addItem: 'Adicionar item',
  removerItem: 'Remover item',
  preencher: 'Preencha lista, título, prioridade, prazo e responsável para continuar.',
  criarBtn: 'Criar tarefa',
  salvarDados: 'Salvar alterações',
  salvarChecklist: 'Salvar checklist',
  dadosSecao: 'Dados',
  salvo: 'Alterações salvas.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type Status = TarefaDetalhe['status'];
type CampoDados = Pick<CriarTarefaDraft, 'listaId' | 'titulo' | 'details' | 'prioridade' | 'prazo' | 'responsavelId'>;

const chip = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';
const statusChipCls: Record<Status, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};
const prioChipCls: Record<Prioridade, string> = {
  low: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  medium: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  high: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
};

const filtroDe = (v: string) => v as MinhasTarefasFiltro;

function lang() {
  return document.documentElement.lang || undefined;
}

function fmtDate(v: string | null | undefined) {
  if (!v) return '—';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtDateTime(v: string | null | undefined) {
  if (!v) return '—';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function textOf(e: Event): string | null {
  const d = (e as CustomEvent<{ value?: unknown }>).detail;
  return d && typeof d.value === 'string' ? d.value : null;
}

function acaoPrincipal(t: TarefaDetalhe): 'iniciar' | 'enviar' | 'aceitar' | null {
  if (t.souResponsavel && t.status === 'aFazer') return 'iniciar';
  if (t.souResponsavel && t.status === 'emAndamento') return 'enviar';
  if (t.souCriador && t.status === 'emRevisao') return 'aceitar';
  return null;
}
function podeDevolver(t: TarefaDetalhe) {
  return t.souCriador && t.status === 'emRevisao';
}
function podeCancelar(t: TarefaDetalhe) {
  return t.souCriador && (t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao');
}
function encerrada(t: TarefaDetalhe) {
  return t.status === 'concluida' || t.status === 'cancelada';
}
function dadosValidos(d: CampoDados, comResponsavel: boolean) {
  const ok = !!(d.titulo ?? '').trim() && !!d.listaId && !!d.prioridade && !!d.prazo;
  return comResponsavel ? ok && !!d.responsavelId : ok;
}

@customElement('tarefas--web--mobile--page11--minhas_tarefas-102047')
export class TarefasMobilePage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: Status) {
    const m = this.msg;
    const map: Record<Status, string> = {
      aFazer: m['statusAFazer'],
      emAndamento: m['statusEmAndamento'],
      emRevisao: m['statusEmRevisao'],
      concluida: m['statusConcluida'],
      cancelada: m['statusCancelada'],
    };
    return map[s];
  }

  private prioLabel(p: Prioridade) {
    const m = this.msg;
    const map: Record<Prioridade, string> = { low: m['prioBaixa'], medium: m['prioMedia'], high: m['prioAlta'] };
    return map[p];
  }

  private renderErro(err: ErrorState, retry?: () => void) {
    if (!err) return nothing;
    return html`<groupnotifyuser--ml-contextual-feedback
      type="error"
      .visible=${true}
      .dismissible=${false}
      @action=${() => retry?.()}
    >
      <Message>${err.message}</Message>
      ${retry ? html`<Action>${this.msg['tentarDeNovo']}</Action>` : nothing}
    </groupnotifyuser--ml-contextual-feedback>`;
  }

  private dl(rotulo: string, valor: unknown) {
    return html`<div class="flex min-w-0 flex-col gap-0.5">
      <dt class="text-xs text-[var(--text-muted,currentColor)]">${rotulo}</dt>
      <dd class="break-words text-sm text-[var(--text-strong,currentColor)]">${valor}</dd>
    </div>`;
  }

  /* ───────────── lista ───────────── */

  private renderLista() {
    const m = this.msg;
    const precond =
      this.pageStatus === 'error' && this.qryMinhasTarefasError?.code === 'client.preconditionMissing';
    if (precond) {
      return html`<div data-organism-id="listaTarefas" class="flex flex-col items-start gap-3 py-6" aria-live="polite">
        <p class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['precondTitulo']}</p>
        <p class="text-sm text-[var(--text-default,currentColor)]">${m['precondTexto']}</p>
        <grouptriggeraction--ml-button-standard
          data-variant="secondary"
          size="lg"
          @action=${() => window.history.back()}
        >
          <Label>${m['voltarPagina']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }

    const items = this.tarefas?.items ?? [];
    const idx = items.findIndex((t) => t.id === this.selectedTarefa);
    const loadingAll = (this.pageStatus === 'loading' || this.pageStatus === 'idle') && !this.tarefas;

    let corpo;
    if (loadingAll) {
      corpo = html`<div class="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        <div class="h-20 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-20 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-20 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <span class="text-sm text-[var(--text-muted,currentColor)]">${m['carregando']}</span>
      </div>`;
    } else if (this.pageStatus === 'error') {
      corpo = html`${this.renderErro(
        this.qryMinhasTarefasError ?? { code: 'x', message: m['erroLista'] },
        () => void this.qryMinhasTarefas(),
      )}`;
    } else if (this.pageStatus === 'empty' || items.length === 0) {
      corpo = html`<div class="flex flex-col gap-1 rounded-lg border border-dashed border-[var(--border-default,currentColor)] p-6 text-center" aria-live="polite">
        <p class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['listaVazia']}</p>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${m['listaVaziaDica']}</p>
      </div>`;
    } else {
      corpo = html`<div aria-busy=${this.qryMinhasTarefasStatus === 'loading' ? 'true' : 'false'} class=${this.qryMinhasTarefasStatus === 'loading' ? 'opacity-60' : ''}>
        <groupviewtable--ml-responsive-table
          .value=${idx >= 0 ? String(idx) : ''}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const t = items[e.detail.index];
            if (t) {
              void this.selectTarefa(t.id);
              this.setScenario('detalhe');
            }
          }}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="titulo">${m['colTarefa']}</TableHead>
              <TableHead key="prazo">${m['colPrazo']}</TableHead>
              <TableHead key="status">${m['colSituacao']}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map(
              (t) => html`<TableRow key=${t.id}>
                <TableCell>
                  <div class="flex min-w-0 flex-col gap-1">
                    <span class="break-words font-semibold text-[var(--text-strong,currentColor)]">${t.titulo}</span>
                    <span class="text-sm text-[var(--text-muted,currentColor)]">${t.lista.nome} · ${t.responsavel.details.identification.name}</span>
                    <span class="flex flex-wrap items-center gap-1.5">
                      <span class="${chip} ${prioChipCls[t.prioridade]}">${this.prioLabel(t.prioridade)}</span>
                      ${t.details.quantidadeSubtarefas
                        ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${t.details.quantidadeSubtarefas} ${m['subtarefas']}</span>`
                        : nothing}
                      ${t.details.progressoChecklist
                        ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${m['checklistCurto']} ${t.details.progressoChecklist}</span>`
                        : nothing}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex flex-col gap-0.5">
                    <span class=${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : 'text-[var(--text-default,currentColor)]'}>${fmtDate(t.prazo)}</span>
                    ${t.details.atrasada
                      ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${m['atrasada']}</span>`
                      : t.details.venceHoje
                        ? html`<span class="text-xs font-medium text-[var(--text-strong,currentColor)]">${m['venceHoje']}</span>`
                        : nothing}
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex flex-col items-start gap-1">
                    <span class="${chip} ${statusChipCls[t.status]}">${this.statusLabel(t.status)}</span>
                    ${t.status === 'emAndamento' && t.details.devolvidaEm
                      ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${m['devolvidaChip']}</span>`
                      : nothing}
                  </div>
                </TableCell>
              </TableRow>`,
            )}
          </TableBody>
        </groupviewtable--ml-responsive-table>
        ${this.tarefas?.hasMore
          ? html`<div class="mt-3">
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                size="lg"
                data-class="w-full"
                .loading=${this.qryMinhasTarefasStatus === 'loading'}
                @action=${() => void this.qryMinhasTarefas(undefined, (this.tarefas?.page ?? 1) + 1, true)}
              >
                <Label>${m['carregarMais']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </div>`;
    }

    return html`<div class="flex flex-col gap-3 pb-24" data-organism-id="listaTarefas">
      <groupnavigatesection--ml-navigate-pills
        .value=${this.filtro ?? 'todas'}
        @change=${(e: CustomEvent<{ value: string }>) => {
          const v = e.detail.value;
          void this.qryMinhasTarefas(v === 'todas' ? null : filtroDe(v));
        }}
      >
        <Tab value="todas" title=${m['filtroTodas']}></Tab>
        <Tab value="criadas" title=${m['filtroCriadas']}></Tab>
        <Tab value="atribuidas" title=${m['filtroAtribuidas']}></Tab>
        <Tab value="emRevisao" title=${m['filtroRevisao']}></Tab>
        <Tab value="devolvidas" title=${m['filtroDevolvidas']}></Tab>
      </groupnavigatesection--ml-navigate-pills>
      ${corpo}
      <div class="sticky bottom-0 -mx-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <grouptriggeraction--ml-button-standard
          data-variant="primary"
          size="lg"
          data-class="w-full"
          @action=${() => {
            this.clearCmdCriarTarefaDraft();
            void this.qryListasAtivas();
            this.setScenario('criar');
          }}
        >
          <Label>${m['novaTarefa']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    </div>`;
  }

  /* ───────────── detalhe ───────────── */

  private marcarItem(t: TarefaDetalhe, id: string, feito: boolean) {
    this.setCmdSalvarChecklistDraft({
      itens: t.checklist.map((i) => ({
        id: i.id,
        version: i.version,
        descricao: i.details.descricao,
        ordem: i.ordem,
        feito: i.id === id ? feito : i.feito,
      })),
    });
    void this.cmdSalvarChecklist();
  }

  private renderDetalhe() {
    const m = this.msg;
    const t = this.tarefa;
    if (this.qryTarefaStatus === 'loading') {
      return html`<div class="flex flex-col gap-3 py-2" aria-busy="true" aria-live="polite">
        <div class="h-32 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        <span class="text-sm text-[var(--text-muted,currentColor)]">${m['carregando']}</span>
      </div>`;
    }
    if (this.qryTarefaStatus === 'error') {
      return html`<div class="py-2">${this.renderErro(
        this.qryTarefaError ?? { code: 'x', message: m['erroTarefa'] },
        () => {
          if (this.selectedTarefa) void this.selectTarefa(this.selectedTarefa);
        },
      )}</div>`;
    }
    if (!t) {
      return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${m['semTarefa']}</p>`;
    }

    const principal = acaoPrincipal(t);
    const temMais = podeDevolver(t) || podeCancelar(t);
    const ocupado =
      this.cmdIniciarStatus === 'loading' ||
      this.cmdEnviarRevisaoStatus === 'loading' ||
      this.cmdAceitarStatus === 'loading' ||
      this.cmdDevolverStatus === 'loading' ||
      this.cmdCancelarStatus === 'loading';
    const rotuloPrincipal =
      principal === 'iniciar'
        ? m['acaoIniciar']
        : principal === 'enviar'
          ? t.details.devolvidaEm
            ? m['acaoReenviar']
            : m['acaoEnviar']
          : m['acaoAceitar'];
    const carregandoPrincipal =
      (principal === 'iniciar' && this.cmdIniciarStatus === 'loading') ||
      (principal === 'enviar' && this.cmdEnviarRevisaoStatus === 'loading') ||
      (principal === 'aceitar' && this.cmdAceitarStatus === 'loading');
    const checklistBloqueada = encerrada(t) || this.cmdSalvarChecklistStatus === 'loading';

    const eventos: { rotulo: string; quando: string; extra?: string }[] = [
      { rotulo: m['hCriada'], quando: fmtDateTime(t.criadaEm) },
    ];
    if (t.details.devolvidaEm) {
      eventos.push({ rotulo: m['hDevolvida'], quando: fmtDateTime(t.details.devolvidaEm), extra: t.details.motivoDevolucao });
    }
    if (t.details.concluidaEm) eventos.push({ rotulo: m['hConcluida'], quando: fmtDateTime(t.details.concluidaEm) });
    if (t.details.canceladaEm) eventos.push({ rotulo: m['hCancelada'], quando: fmtDateTime(t.details.canceladaEm) });

    return html`<div class="flex flex-col gap-4 py-2">
      <div data-organism-id="detalheTarefa" class="flex flex-col gap-4">
        ${t.details.motivoDevolucao
          ? html`<groupnotifyuser--ml-notify-banner type="warning" .visible=${true} .dismissible=${false}>
              <Title>${m['motivoTitulo']}</Title>
              <Message>${t.details.motivoDevolucao}</Message>
            </groupnotifyuser--ml-notify-banner>`
          : nothing}
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
            <CardDescription>${t.lista.nome}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="mb-3 flex flex-wrap gap-1.5">
              <span class="${chip} ${statusChipCls[t.status]}">${this.statusLabel(t.status)}</span>
              <span class="${chip} ${prioChipCls[t.prioridade]}">${this.prioLabel(t.prioridade)}</span>
            </div>
            <dl class="grid grid-cols-2 gap-x-3 gap-y-3">
              <div class="col-span-2">${this.dl(m['fDescricao'], t.details.descricao || m['semDescricao'])}</div>
              ${this.dl(m['fResponsavel'], t.responsavel.details.identification.name)}
              ${this.dl(m['criadaPor'], t.criador.details.identification.name)}
              ${this.dl(m['fPrazo'], fmtDate(t.prazo))}
              ${this.dl(m['fPrioridade'], this.prioLabel(t.prioridade))}
            </dl>
          </CardContent>
          <CardFooter>${m['criadaEm']} ${fmtDateTime(t.criadaEm)}</CardFooter>
        </groupviewcard--ml-vertical-card>

        <section class="flex flex-col gap-2" aria-labelledby="chk-h">
          <div class="flex items-center justify-between gap-2">
            <h3 id="chk-h" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['checklist']}</h3>
            <grouptriggeraction--ml-button-standard
              data-variant="ghost"
              size="md"
              @action=${() => {
                void this.qryListasAtivas();
                this.setScenario('editar');
              }}
            >
              <Label>${m['editarDados']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
          ${t.checklist.length === 0
            ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m['checklistVazia']}</p>`
            : html`<ul class="flex flex-col">
                ${t.checklist.map(
                  (i) => html`<li class="min-h-[44px] border-b border-[var(--border-subtle,currentColor)] py-1">
                    <groupenterboolean--ml-checkbox-preference
                      .value=${i.feito}
                      .disabled=${checklistBloqueada}
                      @change=${(e: CustomEvent<{ value: boolean }>) => this.marcarItem(t, i.id, e.detail.value)}
                    >
                      <Label>${i.details.descricao}</Label>
                    </groupenterboolean--ml-checkbox-preference>
                  </li>`,
                )}
              </ul>`}
          ${this.renderErro(this.cmdSalvarChecklistError)}
        </section>
      </div>

      <details data-organism-id="historicoTarefa" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <summary class="flex min-h-[44px] cursor-pointer items-center px-3 text-base font-semibold text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${m['historico']}</summary>
        <div class="px-3 pb-3">
          <groupviewdata--ml-timeline-view>
            <Columns>
              <Column field="evento" header=${m['colEvento']}></Column>
              <Column field="quando" header=${m['colQuando']}></Column>
            </Columns>
            <Rows>
              ${eventos.map(
                (ev) => html`<Row>
                  <Cell>
                    <div class="font-medium text-[var(--text-strong,currentColor)]">${ev.rotulo}</div>
                    ${ev.extra ? html`<div class="text-sm text-[var(--text-muted,currentColor)]">${ev.extra}</div>` : nothing}
                  </Cell>
                  <Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${ev.quando}</span></Cell>
                </Row>`,
              )}
            </Rows>
          </groupviewdata--ml-timeline-view>
        </div>
      </details>

      <div data-organism-id="acoesTarefa" class="flex flex-col gap-2">
        ${this.renderErro(this.cmdIniciarError ?? this.cmdEnviarRevisaoError ?? this.cmdAceitarError)}
        ${principal || temMais
          ? html`<div class="sticky bottom-0 -mx-3 flex items-center gap-2 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
              ${principal
                ? html`<div class="min-w-0 flex-1">
                    <grouptriggeraction--ml-button-standard
                      data-variant="primary"
                      size="lg"
                      data-class="w-full"
                      .loading=${carregandoPrincipal}
                      .disabled=${ocupado}
                      @action=${() => {
                        if (principal === 'iniciar') void this.cmdIniciar();
                        else if (principal === 'enviar') void this.cmdEnviarRevisao();
                        else void this.cmdAceitar();
                      }}
                    >
                      <Label>${rotuloPrincipal}</Label>
                    </grouptriggeraction--ml-button-standard>
                  </div>`
                : nothing}
              ${temMais
                ? html`<grouptriggeraction--ml-kebab-action-trigger
                    size="lg"
                    .disabled=${ocupado}
                    @action=${() => this.setScenario('acoes')}
                  >
                    <Icon>⋮</Icon>
                    <Label>${m['maisAcoes']}</Label>
                  </grouptriggeraction--ml-kebab-action-trigger>`
                : nothing}
            </div>`
          : nothing}
      </div>
    </div>`;
  }

  /* ───────────── ações secundárias ───────────── */

  private renderAcoes() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t) return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${m['semTarefa']}</p>`;
    const devolver = podeDevolver(t);
    const cancelar = podeCancelar(t);
    const draft = this.cmdDevolverDraft;
    const motivo = draft.details.motivoDevolucao ?? '';
    const devolvendo = this.cmdDevolverStatus === 'loading';
    const cancelando = this.cmdCancelarStatus === 'loading';
    return html`<div data-organism-id="acoesTarefa" class="flex flex-col gap-6 py-2">
      ${!devolver && !cancelar ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m['semAcoes']}</p>` : nothing}
      ${devolver
        ? html`<section class="flex flex-col gap-3" aria-labelledby="dev-h">
            <h3 id="dev-h" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['devolverTitulo']}</h3>
            <groupentertext--ml-multiline-text
              .rows=${4}
              .required=${true}
              .value=${motivo}
              .placeholder=${m['motivoPlaceholder']}
              @input=${(e: Event) => {
                const v = textOf(e);
                if (v !== null) this.setCmdDevolverDraft({ details: { motivoDevolucao: v } });
              }}
              @change=${(e: Event) => {
                const v = textOf(e);
                if (v !== null) this.setCmdDevolverDraft({ details: { motivoDevolucao: v } });
              }}
            >
              <Label>${m['motivoLabel']}</Label>
              <Helper>${m['motivoAjuda']}</Helper>
            </groupentertext--ml-multiline-text>
            ${this.renderErro(this.cmdDevolverError)}
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              size="lg"
              data-class="w-full"
              .loading=${devolvendo}
              .disabled=${!motivo.trim() || devolvendo || cancelando}
              @action=${() => {
                void this.cmdDevolver().then(() => {
                  if (this.cmdDevolverStatus === 'success') this.setScenario('detalhe');
                });
              }}
            >
              <Label>${m['devolver']}</Label>
            </grouptriggeraction--ml-button-standard>
          </section>`
        : nothing}
      ${cancelar
        ? html`<section class="flex flex-col gap-3" aria-labelledby="can-h">
            <h3 id="can-h" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['encerrarTitulo']}</h3>
            <p class="text-sm text-[var(--text-default,currentColor)]">${m['cancelarAviso1']}${t.titulo}${m['cancelarAviso2']}</p>
            ${this.renderErro(this.cmdCancelarError)}
            <grouptriggeraction--ml-button-standard
              data-variant="danger"
              size="lg"
              data-class="w-full"
              .loading=${cancelando}
              .disabled=${devolvendo || cancelando}
              @action=${() => {
                void this.cmdCancelar().then(() => {
                  if (this.cmdCancelarStatus === 'success') this.setScenario('detalhe');
                });
              }}
            >
              <Label>${m['cancelar']}</Label>
            </grouptriggeraction--ml-button-standard>
          </section>`
        : nothing}
    </div>`;
  }

  /* ───────────── formulários ───────────── */

  private renderCampos(
    d: CampoDados,
    set: (p: Partial<CampoDados>) => void,
    comResponsavel: boolean,
    responsavelAtual?: string,
  ) {
    const m = this.msg;
    return html`<div class="flex flex-col gap-4">
      <groupselectone--ml-select
        .value=${d.listaId}
        .required=${true}
        .placeholder=${m['fListaPlaceholder']}
        .loading=${this.qryListasAtivasStatus === 'loading'}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ listaId: e.detail.value })}
      >
        <Label>${m['fLista']}</Label>
        <Trigger>${m['fListaPlaceholder']}</Trigger>
        ${this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
        <Empty>${m['semLista']}</Empty>
      </groupselectone--ml-select>

      <groupentertext--ml-enter-text
        .value=${d.titulo ?? ''}
        .required=${true}
        .placeholder=${m['fTituloPlaceholder']}
        @input=${(e: Event) => {
          const v = textOf(e);
          if (v !== null) set({ titulo: v });
        }}
        @change=${(e: Event) => {
          const v = textOf(e);
          if (v !== null) set({ titulo: v });
        }}
      >
        <Label>${m['fTitulo']}</Label>
      </groupentertext--ml-enter-text>

      <groupentertext--ml-multiline-text
        .rows=${4}
        .value=${d.details.descricao ?? ''}
        .placeholder=${m['fDescricaoPlaceholder']}
        @input=${(e: Event) => {
          const v = textOf(e);
          if (v !== null) set({ details: { descricao: v } });
        }}
        @change=${(e: Event) => {
          const v = textOf(e);
          if (v !== null) set({ details: { descricao: v } });
        }}
      >
        <Label>${m['fDescricao']}</Label>
      </groupentertext--ml-multiline-text>

      <groupselectone--ml-segmented-control
        .value=${d.prioridade}
        .required=${true}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ prioridade: e.detail.value as Prioridade | null })}
      >
        <Label>${m['fPrioridade']}</Label>
        <Item value="low">${m['prioBaixa']}</Item>
        <Item value="medium">${m['prioMedia']}</Item>
        <Item value="high">${m['prioAlta']}</Item>
      </groupselectone--ml-segmented-control>

      <groupenterdate--ml-date-picker
        .value=${d.prazo}
        .required=${true}
        .locale=${lang() ?? ''}
        .placeholder=${m['fPrazoPlaceholder']}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ prazo: e.detail.value })}
      >
        <Label>${m['fPrazo']}</Label>
      </groupenterdate--ml-date-picker>

      ${comResponsavel
        ? html`<groupselectone--ml-combobox
            .value=${d.responsavelId}
            .required=${true}
            .placeholder=${m['fResponsavelPlaceholder']}
            @input=${(e: Event) => {
              const v = textOf(e);
              if (v !== null) void this.qryBuscarMembros(v);
            }}
            @change=${(e: CustomEvent<{ value: string | null }>) => set({ responsavelId: e.detail.value })}
          >
            <Label>${m['fResponsavel']}</Label>
            ${responsavelAtual ? html`<Helper>${m['responsavelAtual']}: ${responsavelAtual}</Helper>` : nothing}
            ${this.membros.map((mb) => html`<Item value=${mb.id}>${mb.details.identification.name}</Item>`)}
            <Empty>${m['semMembro']}</Empty>
          </groupselectone--ml-combobox>`
        : nothing}
    </div>`;
  }

  private renderChecklistEditor(itens: ItemChecklistDraft[], set: (n: ItemChecklistDraft[]) => void) {
    const m = this.msg;
    const reordena = (l: ItemChecklistDraft[]) => l.map((x, i) => ({ ...x, ordem: i + 1 }));
    return html`<div class="flex flex-col gap-3">
      ${itens.map(
        (it, i) => html`<div class="flex flex-col gap-1 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
          <groupentertext--ml-enter-text
            .value=${it.descricao ?? ''}
            .placeholder=${m['itemPlaceholder']}
            @input=${(e: Event) => {
              const v = textOf(e);
              if (v !== null) set(itens.map((x, j) => (j === i ? { ...x, descricao: v } : x)));
            }}
            @change=${(e: Event) => {
              const v = textOf(e);
              if (v !== null) set(itens.map((x, j) => (j === i ? { ...x, descricao: v } : x)));
            }}
          >
            <Label>${m['itemLabel']} ${i + 1}</Label>
          </groupentertext--ml-enter-text>
          <div class="flex items-center justify-between gap-2">
            <groupenterboolean--ml-checkbox-preference
              .value=${it.feito ?? false}
              @change=${(e: CustomEvent<{ value: boolean }>) =>
                set(itens.map((x, j) => (j === i ? { ...x, feito: e.detail.value } : x)))}
            >
              <Label>${m['itemFeito']}</Label>
            </groupenterboolean--ml-checkbox-preference>
            ${it.id === null
              ? html`<grouptriggeraction--ml-button-standard
                  data-variant="ghost"
                  size="md"
                  @action=${() => set(reordena(itens.filter((_, j) => j !== i)))}
                >
                  <Label>${m['removerItem']}</Label>
                </grouptriggeraction--ml-button-standard>`
              : nothing}
          </div>
        </div>`,
      )}
      <grouptriggeraction--ml-button-standard
        data-variant="secondary"
        size="lg"
        data-class="w-full"
        @action=${() => set([...itens, { id: null, version: null, descricao: '', ordem: itens.length + 1, feito: false }])}
      >
        <Label>${m['addItem']}</Label>
      </grouptriggeraction--ml-button-standard>
    </div>`;
  }

  private renderCriar() {
    const m = this.msg;
    const d = this.cmdCriarTarefaDraft;
    const valido = dadosValidos(d, true);
    const ocupado = this.cmdCriarTarefaStatus === 'loading';
    return html`<div data-organism-id="formTarefa" class="flex flex-col gap-5 py-2 pb-4">
      ${this.renderCampos(d, (p) => this.setCmdCriarTarefaDraft({ ...this.cmdCriarTarefaDraft, ...p }), true)}
      <section class="flex flex-col gap-2" aria-labelledby="cc-h">
        <h3 id="cc-h" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['checklist']}</h3>
        ${this.renderChecklistEditor(d.checklist, (n) =>
          this.setCmdCriarTarefaDraft({ ...this.cmdCriarTarefaDraft, checklist: n }),
        )}
      </section>
      <div class="sticky bottom-0 -mx-3 flex flex-col gap-2 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3" aria-live="polite">
        ${this.renderErro(this.cmdCriarTarefaError)}
        ${!valido ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${m['preencher']}</p>` : nothing}
        <grouptriggeraction--ml-button-standard
          data-variant="primary"
          size="lg"
          data-class="w-full"
          .loading=${ocupado}
          .disabled=${!valido || ocupado}
          @action=${() => {
            void this.cmdCriarTarefa().then(() => {
              if (this.cmdCriarTarefaStatus === 'success') this.setScenario('detalhe');
            });
          }}
        >
          <Label>${m['criarBtn']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    </div>`;
  }

  private renderEditar() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t) return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${m['semTarefa']}</p>`;
    const d = this.cmdSalvarEdicaoDraft;
    const comResp = t.souCriador;
    const valido = dadosValidos(d, comResp);
    const salvando = this.cmdSalvarEdicaoStatus === 'loading';
    const salvandoChk = this.cmdSalvarChecklistStatus === 'loading';
    return html`<div data-organism-id="formTarefa" class="flex flex-col gap-6 py-2 pb-4">
      <section class="flex flex-col gap-4" aria-labelledby="ed-h">
        <h3 id="ed-h" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['dadosSecao']}</h3>
        ${this.renderCampos(
          d,
          (p) => this.setCmdSalvarEdicaoDraft({ ...this.cmdSalvarEdicaoDraft, ...p }),
          comResp,
          t.responsavel.details.identification.name,
        )}
        <div class="flex flex-col gap-2" aria-live="polite">
          ${this.renderErro(this.cmdSalvarEdicaoError)}
          ${this.cmdSalvarEdicaoStatus === 'success' ? html`<p class="text-sm text-[var(--status-success-text,currentColor)]">${m['salvo']}</p>` : nothing}
          ${!valido ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${m['preencher']}</p>` : nothing}
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="lg"
            data-class="w-full"
            .loading=${salvando}
            .disabled=${!valido || salvando}
            @action=${() => {
              void this.cmdSalvarEdicao().then(() => {
                if (this.cmdSalvarEdicaoStatus === 'success') this.setScenario('detalhe');
              });
            }}
          >
            <Label>${m['salvarDados']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>

      <section class="flex flex-col gap-3 border-t border-[var(--border-default,currentColor)] pt-5" aria-labelledby="ec-h">
        <h3 id="ec-h" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['checklist']}</h3>
        ${this.renderChecklistEditor(this.cmdSalvarChecklistDraft.itens, (n) => this.setCmdSalvarChecklistDraft({ itens: n }))}
        <div class="flex flex-col gap-2" aria-live="polite">
          ${this.renderErro(this.cmdSalvarChecklistError)}
          ${this.cmdSalvarChecklistStatus === 'success' ? html`<p class="text-sm text-[var(--status-success-text,currentColor)]">${m['salvo']}</p>` : nothing}
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="lg"
            data-class="w-full"
            .loading=${salvandoChk}
            .disabled=${salvandoChk}
            @action=${() => void this.cmdSalvarChecklist()}
          >
            <Label>${m['salvarChecklist']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    return html`<div class="mx-auto w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-3 text-[var(--text-default,currentColor)]">
      <molecules--ml-scenary-102020
        mode="scenary"
        .value=${this.scenary || 'lista'}
        .backLabel=${m['voltar']}
        @change=${(e: CustomEvent<{ value: string }>) => {
          if (e.target === e.currentTarget) this.setScenario(e.detail.value);
        }}
      >
        <Scene value="lista" title=${m['tituloLista']}>${this.renderLista()}</Scene>
        <Scene value="detalhe" title=${m['tituloDetalhe']} nav="back" backTo="lista">${this.renderDetalhe()}</Scene>
        <Scene value="acoes" title=${m['tituloAcoes']} nav="back" backTo="detalhe">${this.renderAcoes()}</Scene>
        <Scene value="criar" title=${m['tituloCriar']} nav="back" backTo="lista">${this.renderCriar()}</Scene>
        <Scene value="editar" title=${m['tituloEditar']} nav="back" backTo="detalhe">${this.renderEditar()}</Scene>
      </molecules--ml-scenary-102020>
    </div>`;
  }
}
