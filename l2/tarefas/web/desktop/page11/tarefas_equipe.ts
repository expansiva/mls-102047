/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type {
  TarefaEquipeItem,
  TarefaDetalhe,
  MembroResumo,
  ListaResumo,
  TarefaStatus,
  TarefaPrioridade,
  ErrorState,
} from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-range-dual-calendar.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Tarefas da equipe',
  pageLead: 'Acompanhe o andamento de todas as tarefas, abra uma para ver o histórico e troque o responsável ou cancele quando for preciso.',
  filtersLabel: 'Filtros do quadro',
  filterLista: 'Lista',
  filterResponsavel: 'Responsável',
  filterPrioridade: 'Prioridade',
  filterStatus: 'Situação',
  filterAll: 'Sem filtro',
  filterPrazo: 'Prazo',
  prazoDe: 'De',
  prazoAte: 'Até',
  quickHoje: 'Vencem hoje',
  quickAtrasadas: 'Atrasadas',
  clearFilters: 'Limpar filtros',
  boardLabel: 'Quadro de tarefas',
  colTarefa: 'Tarefa',
  colPrazo: 'Prazo',
  colResponsavel: 'Responsável',
  colPrioridade: 'Prioridade',
  colSituacao: 'Situação',
  colChecklist: 'Checklist',
  tagHoje: 'Vence hoje',
  tagAtrasada: 'Atrasada',
  priority_low: 'Baixa',
  priority_medium: 'Média',
  priority_high: 'Alta',
  status_aFazer: 'A fazer',
  status_emAndamento: 'Em andamento',
  status_emRevisao: 'Em revisão',
  status_concluida: 'Concluída',
  status_cancelada: 'Cancelada',
  emptyList: 'Nenhuma tarefa encontrada com esses filtros.',
  loadMore: 'Carregar mais tarefas',
  errorTitle: 'Não foi possível carregar as tarefas.',
  retry: 'Tentar novamente',
  preconditionTitle: 'Faltam informações para abrir esta tela.',
  preconditionBody: 'A tela foi aberta sem o que ela precisa para mostrar as tarefas da equipe. Volte à página anterior e abra-a de novo.',
  back: 'Voltar',
  panelEmpty: 'Escolha uma tarefa no quadro para ver o andamento e agir sobre ela.',
  panelLoading: 'Abrindo a tarefa…',
  panelError: 'Não foi possível abrir a tarefa.',
  sceneDetalhe: 'Tarefa selecionada',
  sceneConfirmar: 'Cancelamento',
  detResponsavel: 'Responsável',
  detCriador: 'Criada por',
  detPrazo: 'Prazo',
  detPrioridade: 'Prioridade',
  detSubtarefas: 'Subtarefas',
  detChecklist: 'Progresso da checklist',
  detCriadaEm: 'Criada em',
  detDescricao: 'Descrição',
  detMotivo: 'Motivo da devolução',
  checklistHeading: 'Checklist',
  checkColSituacao: 'Situação',
  checkColItem: 'Item',
  checkDone: 'Feito',
  checkPending: 'Pendente',
  checkEmpty: 'Esta tarefa não tem itens de checklist.',
  historyHeading: 'Histórico',
  histColWhen: 'Quando',
  histColWhat: 'O que aconteceu',
  histCreated: 'Tarefa criada por',
  histReturned: 'Devolvida para ajuste',
  histReason: 'Motivo',
  histDone: 'Concluída',
  histCancelled: 'Cancelada',
  histEmpty: 'Ainda não há eventos registrados.',
  actionsLabel: 'Ações do gestor',
  reassignLabel: 'Novo responsável',
  reassignHelper: 'A pessoa escolhida passa a agir na tarefa e é avisada.',
  reassignEmpty: 'Nenhum membro encontrado.',
  reassignButton: 'Trocar responsável',
  reassignOk: 'Responsável trocado. A nova pessoa foi avisada.',
  reassignFail: 'Não foi possível trocar o responsável.',
  inactive: '(inativo)',
  cancelButton: 'Cancelar tarefa',
  cancelOk: 'Tarefa cancelada.',
  cancelFail: 'Não foi possível cancelar a tarefa.',
  closedHint: 'Tarefa encerrada: ela não pode mais ser cancelada.',
  confirmTitle: 'Cancelar esta tarefa?',
  confirmMessage: 'Esta tarefa será cancelada e não mudará mais de situação:',
  confirmKeep: 'Manter tarefa',
  confirmYes: 'Sim, cancelar a tarefa',
  confirmHint: 'Confirme ou mantenha a tarefa na janela de aviso.',
};
/// **collab_i18n_end**
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

const ALL = '__todas';

const chipBase = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap';
const statusChip: Record<TarefaStatus, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};
const statusKey: Record<TarefaStatus, keyof PageMessageType> = {
  aFazer: 'status_aFazer',
  emAndamento: 'status_emAndamento',
  emRevisao: 'status_emRevisao',
  concluida: 'status_concluida',
  cancelada: 'status_cancelada',
};
const priorityKey: Record<TarefaPrioridade, keyof PageMessageType> = {
  low: 'priority_low',
  medium: 'priority_medium',
  high: 'priority_high',
};
const statusOrder: TarefaStatus[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const priorityOrder: TarefaPrioridade[] = ['high', 'medium', 'low'];

type HistoryEvent = { when: string; what: string; note?: string };

function listOf<T>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[];
  const items = (v as { items?: unknown } | null)?.items;
  return Array.isArray(items) ? (items as T[]) : [];
}

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function formatDate(v: string | undefined): string {
  if (!v) return '';
  const d = new Date(v.length === 10 ? `${v}T00:00:00` : v);
  return Number.isNaN(d.getTime()) ? v : new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function formatDateTime(v: string | undefined): string {
  if (!v) return '';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function historyOf(msg: PageMessageType, t: TarefaDetalhe): HistoryEvent[] {
  const events: HistoryEvent[] = [
    { when: formatDateTime(t.criadaEm), what: `${msg.histCreated} ${t.criador.details.identification.name}` },
  ];
  if (t.details.devolvidaEm) {
    events.push({
      when: formatDateTime(t.details.devolvidaEm),
      what: msg.histReturned,
      note: t.details.motivoDevolucao ? `${msg.histReason}: ${t.details.motivoDevolucao}` : undefined,
    });
  }
  if (t.details.concluidaEm) events.push({ when: formatDateTime(t.details.concluidaEm), what: msg.histDone });
  if (t.details.canceladaEm) events.push({ when: formatDateTime(t.details.canceladaEm), what: msg.histCancelled });
  return events;
}

@customElement('tarefas--web--desktop--page11--tarefas_equipe-102047')
export class TarefasDesktopPage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const missing =
      this.carregarOpcoesEquipeError?.code === 'client.preconditionMissing' ||
      this.listarTarefasEquipeError?.code === 'client.preconditionMissing';
    return html`
      <main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-6 py-5 flex flex-col gap-4">
        <header class="flex flex-col gap-1">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)] max-w-3xl">${this.msg['pageLead']}</p>
        </header>
        ${missing
          ? this.renderPrecondition()
          : html`
              ${this.renderFilters()}
              <div class="grid gap-4 items-start lg:grid-cols-[minmax(0,1fr)_26rem]">
                ${this.renderBoard()} ${this.renderPanel()}
              </div>
            `}
      </main>
    `;
  }

  private renderPrecondition() {
    return html`
      <section class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 flex flex-col gap-3 max-w-xl" aria-live="polite">
        <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['preconditionTitle']}</p>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['preconditionBody']}</p>
        <div>
          <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => history.back()}>
            <Label>${this.msg['back']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  private filterSelect(
    label: string,
    value: string | null,
    options: { value: string; label: string }[],
    onPick: (v: string | null) => void,
  ) {
    return html`
      <groupselectone--ml-select-dropdown
        class="w-44"
        .value=${value ?? ALL}
        @change=${(e: CustomEvent<{ value: string | null }>) =>
          onPick(!e.detail.value || e.detail.value === ALL ? null : e.detail.value)}
      >
        <Label>${label}</Label>
        <Item value=${ALL}>${this.msg['filterAll']}</Item>
        ${options.map((o) => html`<Item value=${o.value}>${o.label}</Item>`)}
      </groupselectone--ml-select-dropdown>
    `;
  }

  private renderFilters() {
    const listas = listOf<ListaResumo>(this.listas).map((l) => ({ value: l.id, label: l.nome }));
    const membros = listOf<MembroResumo>(this.membros).map((m) => ({ value: m.id, label: m.details.identification.name }));
    const prioridades = priorityOrder.map((p) => ({ value: p, label: this.msg[priorityKey[p]] }));
    const situacoes = statusOrder.map((s) => ({ value: s, label: this.msg[statusKey[s]] }));
    const hojeOn = this.venceHoje === true;
    const atrasadaOn = this.atrasada === true;
    return html`
      <section
        aria-label=${this.msg['filtersLabel']}
        class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex flex-wrap items-end gap-3"
      >
        ${this.filterSelect(this.msg['filterLista'], this.listaId, listas, (v) => this.listarTarefasEquipe({ listaId: v }))}
        ${this.filterSelect(this.msg['filterResponsavel'], this.responsavelId, membros, (v) =>
          this.listarTarefasEquipe({ responsavelId: v }),
        )}
        ${this.filterSelect(this.msg['filterPrioridade'], this.prioridade, prioridades, (v) =>
          this.listarTarefasEquipe({ prioridade: v as TarefaPrioridade | null }),
        )}
        ${this.filterSelect(this.msg['filterStatus'], this.status, situacoes, (v) =>
          this.listarTarefasEquipe({ status: v as TarefaStatus | null }),
        )}
        <groupenterdateinterval--ml-date-range-dual-calendar
          .startDate=${this.prazoDe}
          .endDate=${this.prazoAte}
          locale=${document.documentElement.lang || 'pt-BR'}
          @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) =>
            this.listarTarefasEquipe({ prazoDe: e.detail.startDate, prazoAte: e.detail.endDate })}
        >
          <Label>${this.msg['filterPrazo']}</Label>
          <LabelStart>${this.msg['prazoDe']}</LabelStart>
          <LabelEnd>${this.msg['prazoAte']}</LabelEnd>
        </groupenterdateinterval--ml-date-range-dual-calendar>
        <div class="flex items-center gap-2 pb-0.5">
          <grouptriggeraction--ml-button-standard
            size="md"
            data-variant=${hojeOn ? 'primary' : 'secondary'}
            aria-pressed=${hojeOn ? 'true' : 'false'}
            @action=${() => this.listarTarefasEquipe({ venceHoje: hojeOn ? null : true })}
          >
            <Label>${this.msg['quickHoje']}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            size="md"
            data-variant=${atrasadaOn ? 'primary' : 'secondary'}
            aria-pressed=${atrasadaOn ? 'true' : 'false'}
            @action=${() => this.listarTarefasEquipe({ atrasada: atrasadaOn ? null : true })}
          >
            <Label>${this.msg['quickAtrasadas']}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            size="md"
            data-variant="ghost"
            @action=${() =>
              this.listarTarefasEquipe({
                listaId: null,
                responsavelId: null,
                prioridade: null,
                status: null,
                prazoDe: null,
                prazoAte: null,
                venceHoje: null,
                atrasada: null,
              })}
          >
            <Label>${this.msg['clearFilters']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  private renderLoadError(error: ErrorState) {
    return html`
      <div class="p-6 flex flex-col gap-3 items-start" aria-live="polite">
        <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['errorTitle']}</p>
        ${error?.message ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${error.message}</p>` : nothing}
        <grouptriggeraction--ml-button-standard
          data-variant="secondary"
          @action=${() => {
            this.carregarOpcoesEquipe();
            this.listarTarefasEquipe();
          }}
        >
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderBoard() {
    const rows = listOf<TarefaEquipeItem>(this.tarefas);
    const loading = this.pageStatus === 'loading' || this.listarTarefasEquipeStatus === 'loading';
    const selected = rows.findIndex((r) => r.id === this.selectedTarefa);
    const failed = this.pageStatus === 'error';
    return html`
      <section
        data-organism-id="tarefasEquipe"
        aria-label=${this.msg['boardLabel']}
        aria-busy=${loading ? 'true' : 'false'}
        class="min-w-0 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] overflow-hidden"
      >
        ${failed
          ? this.renderLoadError(this.listarTarefasEquipeError ?? this.carregarOpcoesEquipeError)
          : html`
              <groupviewtable--ml-advanced-data-table
                value=${selected >= 0 ? String(selected) : ''}
                .loading=${loading}
                @rowClick=${(e: CustomEvent<{ index: number }>) => {
                  const row = rows[e.detail.index];
                  if (row) this.obterTarefa(row.id);
                }}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead key="titulo" sortable>${this.msg['colTarefa']}</TableHead>
                    <TableHead key="prazo" sortable>${this.msg['colPrazo']}</TableHead>
                    <TableHead key="responsavel" sortable>${this.msg['colResponsavel']}</TableHead>
                    <TableHead key="prioridade" sortable>${this.msg['colPrioridade']}</TableHead>
                    <TableHead key="status" sortable>${this.msg['colSituacao']}</TableHead>
                    <TableHead key="checklist">${this.msg['colChecklist']}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  ${rows.map((r) => this.renderRow(r))}
                </TableBody>
                <Empty>
                  <div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyList']}</div>
                </Empty>
              </groupviewtable--ml-advanced-data-table>
              ${rows.length > 0
                ? html`
                    <div class="p-3 border-t border-[var(--border-subtle,currentColor)] flex justify-center">
                      <grouptriggeraction--ml-button-standard
                        data-variant="ghost"
                        ?loading=${this.listarTarefasEquipeStatus === 'loading'}
                        @action=${() => this.listarTarefasEquipe(undefined, undefined, true)}
                      >
                        <Label>${this.msg['loadMore']}</Label>
                      </grouptriggeraction--ml-button-standard>
                    </div>
                  `
                : nothing}
            `}
      </section>
    `;
  }

  private renderRow(r: TarefaEquipeItem) {
    return html`
      <TableRow key=${r.id}>
        <TableCell sort-value=${r.titulo}>
          <div class="font-medium text-[var(--text-strong,currentColor)]">${r.titulo}</div>
          <div class="text-xs text-[var(--text-muted,currentColor)]">${r.lista.nome}</div>
        </TableCell>
        <TableCell sort-value=${r.prazo}>
          <div class="flex flex-col gap-0.5 items-start">
            <span
              class=${r.details.atrasada
                ? 'font-semibold text-[var(--status-error-text,currentColor)]'
                : 'text-[var(--text-default,currentColor)]'}
              >${formatDate(r.prazo)}</span
            >
            ${r.details.atrasada
              ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['tagAtrasada']}</span>`
              : nothing}
            ${r.details.venceHoje
              ? html`<span class="${chipBase} bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['tagHoje']}</span>`
              : nothing}
          </div>
        </TableCell>
        <TableCell sort-value=${r.responsavel.details.identification.name}>${r.responsavel.details.identification.name}</TableCell>
        <TableCell sort-value=${r.prioridade}>
          <span class=${r.prioridade === 'high' ? 'font-semibold text-[var(--text-strong,currentColor)]' : ''}>${this.msg[priorityKey[r.prioridade]]}</span>
        </TableCell>
        <TableCell sort-value=${r.status}>
          <span class="${chipBase} ${statusChip[r.status]}">${this.msg[statusKey[r.status]]}</span>
        </TableCell>
        <TableCell>${r.details.progressoChecklist}</TableCell>
      </TableRow>
    `;
  }

  private renderPanel() {
    const t = this.tarefa;
    return html`
      <aside
        class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'detalhe'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="detalhe" title=${this.msg['sceneDetalhe']}>
            <div class="flex flex-col gap-5 p-4">
              ${this.renderDetail(t)} ${this.renderHistory(t)}
            </div>
            ${this.renderActions(t)}
          </Scene>
          <Scene value="confirmar" title=${this.msg['sceneConfirmar']}>${this.renderConfirm(t)}</Scene>
        </molecules--ml-scenary-102020>
      </aside>
    `;
  }

  private dlItem(label: string, value: unknown) {
    return html`
      <div class="min-w-0">
        <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="text-[var(--text-strong,currentColor)] break-words">${value}</dd>
      </div>
    `;
  }

  private renderDetail(t: TarefaDetalhe | null) {
    const loading = this.obterTarefaStatus === 'loading';
    let body;
    if (loading) {
      body = html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['panelLoading']}</p>`;
    } else if (this.obterTarefaStatus === 'error') {
      body = html`<p class="text-sm text-[var(--text-default,currentColor)]">
        ${this.msg['panelError']} ${this.obterTarefaError?.message ?? ''}
      </p>`;
    } else if (!t) {
      body = html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['panelEmpty']}</p>`;
    } else {
      const checklist = t.itensChecklist;
      body = html`
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
            <CardDescription>
              <span class="${chipBase} ${statusChip[t.status]}">${this.msg[statusKey[t.status]]}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              ${this.dlItem(this.msg['detResponsavel'], t.responsavel.details.identification.name)}
              ${this.dlItem(this.msg['detCriador'], t.criador.details.identification.name)}
              ${this.dlItem(this.msg['detPrazo'], formatDate(t.prazo))}
              ${this.dlItem(this.msg['detPrioridade'], this.msg[priorityKey[t.prioridade]])}
              ${this.dlItem(this.msg['detSubtarefas'], t.details.quantidadeSubtarefas)}
              ${this.dlItem(this.msg['detChecklist'], t.details.progressoChecklist)}
              ${this.dlItem(this.msg['detCriadaEm'], formatDateTime(t.criadaEm))}
              ${t.details.descricao
                ? html`<div class="col-span-2">${this.dlItem(this.msg['detDescricao'], t.details.descricao)}</div>`
                : nothing}
              ${t.details.motivoDevolucao
                ? html`<div class="col-span-2">${this.dlItem(this.msg['detMotivo'], t.details.motivoDevolucao)}</div>`
                : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
        <div class="flex flex-col gap-2">
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['checklistHeading']}</h3>
          <groupviewdata--ml-vertical-record-list .hoverable=${false}>
            <Columns>
              <Column field="situacao" header=${this.msg['checkColSituacao']} width="110px"></Column>
              <Column field="item" header=${this.msg['checkColItem']}></Column>
            </Columns>
            <Rows>
              ${checklist.map(
                (i) => html`
                  <Row>
                    <Cell>
                      <span
                        class="${chipBase} ${i.feito
                          ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
                          : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}"
                        >${i.feito ? this.msg['checkDone'] : this.msg['checkPending']}</span
                      >
                    </Cell>
                    <Cell>${i.details.descricao}</Cell>
                  </Row>
                `,
              )}
            </Rows>
            <Empty>
              <div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['checkEmpty']}</div>
            </Empty>
          </groupviewdata--ml-vertical-record-list>
        </div>
      `;
    }
    return html`<section data-organism-id="detalheTarefa" aria-busy=${loading ? 'true' : 'false'} aria-live="polite" class="flex flex-col gap-4">${body}</section>`;
  }

  private renderHistory(t: TarefaDetalhe | null) {
    const show = t !== null && this.obterTarefaStatus !== 'loading' && this.obterTarefaStatus !== 'error';
    return html`
      <section data-organism-id="historicoTarefa" class="flex flex-col gap-2">
        ${show && t
          ? html`
              <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['historyHeading']}</h3>
              <groupviewdata--ml-timeline-view .hoverable=${false}>
                <Columns>
                  <Column field="quando" header=${this.msg['histColWhen']} width="140px"></Column>
                  <Column field="evento" header=${this.msg['histColWhat']}></Column>
                </Columns>
                <Rows>
                  ${historyOf(this.msg, t).map(
                    (ev) => html`
                      <Row>
                        <Cell><span class="text-xs text-[var(--text-muted,currentColor)]">${ev.when}</span></Cell>
                        <Cell>
                          <div class="text-sm text-[var(--text-strong,currentColor)]">${ev.what}</div>
                          ${ev.note ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${ev.note}</div>` : nothing}
                        </Cell>
                      </Row>
                    `,
                  )}
                </Rows>
                <Empty>
                  <div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['histEmpty']}</div>
                </Empty>
              </groupviewdata--ml-timeline-view>
            `
          : nothing}
      </section>
    `;
  }

  private feedback(type: 'success' | 'error', text: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type=${type} .visible=${true} .dismissible=${false}>
        <Message>${text}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
  }

  private renderActions(t: TarefaDetalhe | null) {
    const ready = t !== null && this.obterTarefaStatus !== 'loading' && this.obterTarefaStatus !== 'error';
    return html`
      <section data-organism-id="acoesGestor" aria-label=${this.msg['actionsLabel']}>
        ${ready && t
          ? html`
              <div class="sticky bottom-0 border-t border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <groupselectone--ml-select-one-autocomplete
                    .value=${this.reatribuirTarefaDraft.responsavelId}
                    ?disabled=${this.reatribuirTarefaStatus === 'loading'}
                    @change=${(e: CustomEvent<{ value: string | null }>) =>
                      this.setReatribuirTarefaDraft({ responsavelId: e.detail.value })}
                  >
                    <Label>${this.msg['reassignLabel']}</Label>
                    <Helper>${this.msg['reassignHelper']}</Helper>
                    ${listOf<MembroResumo>(this.membros).map(
                      (m) => html`
                        <Item value=${m.id} ?disabled=${m.details.identification.status !== 'Active'}>
                          ${m.details.identification.name}${m.details.identification.status !== 'Active' ? ` ${this.msg['inactive']}` : ''}
                        </Item>
                      `,
                    )}
                    <Empty>${this.msg['reassignEmpty']}</Empty>
                  </groupselectone--ml-select-one-autocomplete>
                  <div>
                    <grouptriggeraction--ml-button-standard
                      data-variant="primary"
                      ?disabled=${this.reatribuirTarefaDraft.responsavelId === null}
                      ?loading=${this.reatribuirTarefaStatus === 'loading'}
                      @action=${() => this.reatribuirTarefa()}
                    >
                      <Label>${this.msg['reassignButton']}</Label>
                    </grouptriggeraction--ml-button-standard>
                  </div>
                  <div aria-live="polite">
                    ${this.reatribuirTarefaStatus === 'success' ? this.feedback('success', this.msg['reassignOk']) : nothing}
                    ${this.reatribuirTarefaStatus === 'error'
                      ? this.feedback('error', `${this.msg['reassignFail']} ${this.reatribuirTarefaError?.message ?? ''}`)
                      : nothing}
                  </div>
                </div>
                <div class="flex flex-col gap-2 pt-3 border-t border-[var(--border-subtle,currentColor)]">
                  <div>
                    <grouptriggeraction--ml-button-standard
                      data-variant="danger"
                      ?disabled=${!t.details.aberta}
                      ?loading=${this.cancelarTarefaStatus === 'loading'}
                      @action=${() => this.setScenario('confirmar')}
                    >
                      <Label>${this.msg['cancelButton']}</Label>
                    </grouptriggeraction--ml-button-standard>
                  </div>
                  ${!t.details.aberta
                    ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['closedHint']}</p>`
                    : nothing}
                  <div aria-live="polite">
                    ${this.cancelarTarefaStatus === 'success' ? this.feedback('success', this.msg['cancelOk']) : nothing}
                    ${this.cancelarTarefaStatus === 'error'
                      ? this.feedback('error', `${this.msg['cancelFail']} ${this.cancelarTarefaError?.message ?? ''}`)
                      : nothing}
                  </div>
                </div>
              </div>
            `
          : nothing}
      </section>
    `;
  }

  private renderConfirm(t: TarefaDetalhe | null) {
    return html`
      <div class="p-4">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['confirmHint']}</p>
        <groupnotifyuser--ml-alert-modal
          type="error"
          .visible=${true}
          .dismissible=${true}
          @dismiss=${() => this.setScenario('detalhe')}
        >
          <Title>${this.msg['confirmTitle']}</Title>
          <Message>${this.msg['confirmMessage']} “${t ? t.titulo : ''}”</Message>
          <Action>
            <div class="flex gap-2 justify-end">
              <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.setScenario('detalhe')}>
                <Label>${this.msg['confirmKeep']}</Label>
              </grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard
                data-variant="danger"
                @action=${() => {
                  this.setScenario('detalhe');
                  this.cancelarTarefa();
                }}
              >
                <Label>${this.msg['confirmYes']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </Action>
        </groupnotifyuser--ml-alert-modal>
      </div>
    `;
  }
}
