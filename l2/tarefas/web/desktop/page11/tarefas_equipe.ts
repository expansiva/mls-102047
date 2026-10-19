/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { TarefaPrioridade, TarefaSituacao } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-range-dual-calendar.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Tarefas da equipe',
  pageSubtitle: 'Acompanhe o andamento de todas as tarefas, encontre onde agir e abra uma tarefa para ver o detalhe.',
  filtersLabel: 'Filtros do quadro',
  fListaLabel: 'Lista',
  fListaAll: 'Todas as listas',
  fRespLabel: 'Responsável',
  fRespAll: 'Todas as pessoas',
  fPrioLabel: 'Prioridade',
  fPrioAll: 'Todas as prioridades',
  fStatusLabel: 'Situação',
  fStatusAll: 'Todas as situações',
  fPrazoLabel: 'Prazo',
  fPrazoStart: 'De',
  fPrazoEnd: 'Até',
  chipHoje: 'Vencem hoje',
  chipAtrasadas: 'Atrasadas',
  clearFilters: 'Limpar filtros',
  prioLow: 'Baixa',
  prioMedium: 'Média',
  prioHigh: 'Alta',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  colTarefa: 'Tarefa',
  colResp: 'Responsável',
  colPrio: 'Prioridade',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colChecklist: 'Checklist',
  venceHoje: 'Vence hoje',
  atrasada: 'Atrasada',
  emptyBoard: 'Nenhuma tarefa encontrada',
  emptyBoardHint: 'Ajuste ou limpe os filtros para ver mais tarefas da equipe.',
  loadingBoard: 'Carregando tarefas…',
  loadMore: 'Carregar mais tarefas',
  boardError: 'Não foi possível carregar o quadro de tarefas.',
  retry: 'Tentar novamente',
  preconditionTitle: 'Esta página foi aberta sem o que ela precisa',
  preconditionBody: 'Abra o quadro pelo módulo Tarefas da equipe para ver as tarefas e escolher uma delas.',
  back: 'Voltar',
  panelEmpty: 'Escolha uma tarefa no quadro para ver o detalhe, o histórico e as ações do gestor.',
  detailLoading: 'Abrindo a tarefa…',
  detailError: 'Não foi possível abrir a tarefa.',
  noDescription: 'Sem descrição.',
  dCriador: 'Criada por',
  dResp: 'Responsável',
  dPrazo: 'Prazo',
  dPrioridade: 'Prioridade',
  dSubtarefas: 'Subtarefas',
  dChecklist: 'Checklist feita',
  dCriadaEm: 'Criada em',
  checklistHeading: 'Itens da checklist',
  checklistEmpty: 'Esta tarefa não tem itens na checklist.',
  colItemState: 'Situação do item',
  colItem: 'Item',
  itemDone: 'Feito',
  itemPending: 'Pendente',
  historyHeading: 'Como a tarefa chegou até aqui',
  colWhen: 'Quando',
  colEvent: 'O que aconteceu',
  evCriada: 'Tarefa criada por',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Concluída',
  evCancelada: 'Cancelada',
  evMotivo: 'Motivo:',
  actionsHeading: 'Ações do gestor',
  newRespLabel: 'Novo responsável',
  newRespPlaceholder: 'Escolha uma pessoa da equipe',
  newRespHelper: 'Só pessoas ativas recebem a tarefa. Quem recebe passa a agir agora e é avisada.',
  newRespEmpty: 'Nenhuma pessoa encontrada.',
  inativo: 'inativo',
  btnReassign: 'Passar para essa pessoa',
  btnCancel: 'Cancelar tarefa',
  closedNote: 'Tarefa encerrada: ela não muda mais de situação.',
  confirmTitle: 'Cancelar esta tarefa?',
  confirmMessage: 'A tarefa abaixo passa para cancelada e não poderá mais mudar de situação.',
  confirmYes: 'Sim, cancelar a tarefa',
  confirmNo: 'Manter a tarefa',
  toastReassigned: 'Responsável trocado. A nova pessoa foi avisada.',
  toastCancelled: 'Tarefa cancelada.',
  reassignFailed: 'Não foi possível trocar o responsável.',
  cancelFailed: 'Não foi possível cancelar a tarefa.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const CHIP_BASE = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap';
const STATUS_CLASS: Record<TarefaSituacao, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};

function lang() {
  return document.documentElement.lang || undefined;
}

function parseDate(v: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : new Date(v);
}

function fmtDate(v: string) {
  const d = parseDate(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtDateTime(v: string) {
  const d = parseDate(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
}

function statusLabel(m: PageMessageType, s: TarefaSituacao) {
  const map: Record<TarefaSituacao, string> = {
    aFazer: m.stAFazer,
    emAndamento: m.stEmAndamento,
    emRevisao: m.stEmRevisao,
    concluida: m.stConcluida,
    cancelada: m.stCancelada,
  };
  return map[s];
}

function prioLabel(m: PageMessageType, p: TarefaPrioridade) {
  const map: Record<TarefaPrioridade, string> = { low: m.prioLow, medium: m.prioMedium, high: m.prioHigh };
  return map[p];
}

/** Opens or closes the cancel confirmation straight on the modal element (the page keeps no state). */
function setModal(e: Event, open: boolean) {
  const root = (e.currentTarget as HTMLElement).closest('[data-organism-id="acoesGestor"]');
  const modal = root?.querySelector('groupnotifyuser--ml-alert-modal') as (HTMLElement & { visible: boolean }) | null;
  if (modal) modal.visible = open;
}

@customElement('tarefas--web--desktop--page11--tarefas_equipe-102047')
export class TarefasDesktopPage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    const missing =
      this.listarTarefasEquipeError?.code === 'client.preconditionMissing' ||
      this.carregarOpcoesEquipeError?.code === 'client.preconditionMissing';

    if (missing) {
      return html`
        <div class="min-h-full bg-[var(--page-bg,transparent)] p-8">
          <div role="alert" class="mx-auto max-w-xl rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
            <h1 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${m.preconditionTitle}</h1>
            <p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${m.preconditionBody}</p>
            <button type="button" class="mt-4 min-h-[40px] rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => history.back()}>${m.back}</button>
          </div>
        </div>`;
    }

    return html`
      <div class="flex min-h-full flex-col gap-4 bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header>
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${m.pageTitle}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${m.pageSubtitle}</p>
        </header>
        <div class="grid grid-cols-[minmax(0,1fr)_26rem] items-start gap-4">
          ${this.renderBoard()}
          <aside class="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col gap-4 overflow-auto">
            ${this.renderDetail()}
            ${this.renderActions()}
            ${this.renderHistory()}
          </aside>
        </div>
      </div>`;
  }

  private filterSelect(
    label: string,
    all: string,
    value: string | null,
    options: { value: string; label: string }[],
    onPick: (v: string | null) => void,
  ) {
    return html`
      <groupselectone--ml-select-dropdown class="w-52" .value=${value ?? ''} @change=${(e: CustomEvent<{ value: string | null }>) => onPick(e.detail.value || null)}>
        <Label>${label}</Label>
        <Trigger>${all}</Trigger>
        <Item value="">${all}</Item>
        ${options.map((o) => html`<Item value=${o.value}>${o.label}</Item>`)}
      </groupselectone--ml-select-dropdown>`;
  }

  private chip(label: string, pressed: boolean, onToggle: () => void) {
    const cls = pressed
      ? 'border-[var(--selected-border,currentColor)] bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)]'
      : 'border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)]';
    return html`<button type="button" aria-pressed=${pressed ? 'true' : 'false'} class="min-h-[40px] rounded-full border px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${cls}" @click=${onToggle}>${label}</button>`;
  }

  private renderBoard() {
    const m = this.msg;
    const items = this.tarefas?.items ?? [];
    const selIdx = items.findIndex((t) => t.id === this.selectedTarefa);
    const loading = this.listarTarefasEquipeStatus === 'loading';
    const anyFilter = !!(this.listaId || this.responsavelId || this.prioridade || this.status || this.prazoDe || this.prazoAte || this.venceHoje || this.atrasada);

    return html`
      <section data-organism-id="tarefasEquipe" class="flex min-w-0 flex-col gap-3" aria-busy=${loading ? 'true' : 'false'}>
        <div role="group" aria-label=${m.filtersLabel} class="flex flex-wrap items-end gap-3 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
          ${this.filterSelect(m.fListaLabel, m.fListaAll, this.listaId, this.listas.map((l) => ({ value: l.id, label: l.nome })), (v) => this.listarTarefasEquipe({ listaId: v }))}
          ${this.filterSelect(m.fRespLabel, m.fRespAll, this.responsavelId, this.membros.map((p) => ({ value: p.id, label: p.details.identification.name })), (v) => this.listarTarefasEquipe({ responsavelId: v }))}
          ${this.filterSelect(m.fPrioLabel, m.fPrioAll, this.prioridade, [
            { value: 'low', label: m.prioLow },
            { value: 'medium', label: m.prioMedium },
            { value: 'high', label: m.prioHigh },
          ], (v) => this.listarTarefasEquipe({ prioridade: v as TarefaPrioridade | null }))}
          ${this.filterSelect(m.fStatusLabel, m.fStatusAll, this.status, [
            { value: 'aFazer', label: m.stAFazer },
            { value: 'emAndamento', label: m.stEmAndamento },
            { value: 'emRevisao', label: m.stEmRevisao },
            { value: 'concluida', label: m.stConcluida },
            { value: 'cancelada', label: m.stCancelada },
          ], (v) => this.listarTarefasEquipe({ status: v as TarefaSituacao | null }))}
          <groupenterdateinterval--ml-date-range-dual-calendar
            .startDate=${this.prazoDe}
            .endDate=${this.prazoAte}
            locale=${document.documentElement.lang || 'pt-BR'}
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => this.listarTarefasEquipe({ prazoDe: e.detail.startDate, prazoAte: e.detail.endDate })}
          >
            <Label>${m.fPrazoLabel}</Label>
            <LabelStart>${m.fPrazoStart}</LabelStart>
            <LabelEnd>${m.fPrazoEnd}</LabelEnd>
          </groupenterdateinterval--ml-date-range-dual-calendar>
          <div class="flex items-center gap-2 pb-0.5">
            ${this.chip(m.chipHoje, !!this.venceHoje, () => this.listarTarefasEquipe({ venceHoje: this.venceHoje ? null : true }))}
            ${this.chip(m.chipAtrasadas, !!this.atrasada, () => this.listarTarefasEquipe({ atrasada: this.atrasada ? null : true }))}
            ${anyFilter
              ? html`<button type="button" class="min-h-[40px] rounded-md px-3 text-sm text-[var(--link-text,currentColor)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.listarTarefasEquipe({ listaId: null, responsavelId: null, prioridade: null, status: null, prazoDe: null, prazoAte: null, venceHoje: null, atrasada: null })}>${m.clearFilters}</button>`
              : nothing}
          </div>
        </div>

        ${this.listarTarefasEquipeStatus === 'error'
          ? html`<div role="alert" class="flex items-center justify-between gap-3 rounded-lg bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]">
              <span>${m.boardError} ${this.listarTarefasEquipeError?.message ?? ''}</span>
              <button type="button" class="min-h-[36px] rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-3 text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.listarTarefasEquipe()}>${m.retry}</button>
            </div>`
          : nothing}

        <div class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] ${loading ? 'opacity-70' : ''}">
          <groupviewtable--ml-advanced-data-table
            value=${selIdx >= 0 ? String(selIdx) : ''}
            .loading=${this.pageStatus === 'loading'}
            @rowClick=${(e: CustomEvent<{ index: number }>) => {
              const row = items[e.detail.index];
              if (row) this.obterTarefa(row.id);
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead key="titulo">${m.colTarefa}</TableHead>
                <TableHead key="responsavel">${m.colResp}</TableHead>
                <TableHead key="prioridade">${m.colPrio}</TableHead>
                <TableHead key="prazo">${m.colPrazo}</TableHead>
                <TableHead key="status">${m.colSituacao}</TableHead>
                <TableHead key="checklist">${m.colChecklist}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              ${items.map(
                (t) => html`
                  <TableRow key=${t.id}>
                    <TableCell>
                      <div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
                      <div class="text-xs text-[var(--text-muted,currentColor)]">${t.lista.nome}</div>
                    </TableCell>
                    <TableCell>${t.responsavel.details.identification.name}</TableCell>
                    <TableCell><span class=${t.prioridade === 'high' ? 'font-semibold text-[var(--text-strong,currentColor)]' : ''}>${prioLabel(m, t.prioridade)}</span></TableCell>
                    <TableCell>
                      <div class="text-right ${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}">
                        ${fmtDate(t.prazo)}${t.details.atrasada ? html`<span class="sr-only"> — ${m.atrasada}</span>` : nothing}
                      </div>
                      ${t.details.venceHoje ? html`<div class="text-right text-xs font-semibold text-[var(--text-strong,currentColor)]">${m.venceHoje}</div>` : nothing}
                    </TableCell>
                    <TableCell><span class="${CHIP_BASE} ${STATUS_CLASS[t.status]}">${statusLabel(m, t.status)}</span></TableCell>
                    <TableCell>${t.details.progressoChecklist}</TableCell>
                  </TableRow>`,
              )}
            </TableBody>
            <Empty>
              <div class="px-4 py-10 text-center">
                <p class="font-medium text-[var(--text-strong,currentColor)]">${m.emptyBoard}</p>
                <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${m.emptyBoardHint}</p>
              </div>
            </Empty>
            <Loading><div class="px-4 py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${m.loadingBoard}</div></Loading>
          </groupviewtable--ml-advanced-data-table>
        </div>

        ${this.tarefas?.hasMore
          ? html`<div class="flex justify-center">
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" .loading=${loading} @action=${() => this.listarTarefasEquipe(undefined, (this.tarefas?.page ?? 1) + 1, true)}>
                <Label>${m.loadMore}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </section>`;
  }

  private dlItem(label: string, value: string) {
    return html`<div><dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt><dd class="mt-0.5 text-sm text-[var(--text-strong,currentColor)]">${value}</dd></div>`;
  }

  private renderDetail() {
    const m = this.msg;
    const t = this.tarefa;
    const loading = this.obterTarefaStatus === 'loading';
    let body;
    if (loading) {
      body = html`<p class="p-4 text-sm text-[var(--text-muted,currentColor)]">${m.detailLoading}</p>`;
    } else if (this.obterTarefaStatus === 'error') {
      body = html`<div role="alert" class="flex flex-col gap-2 rounded-lg bg-[var(--status-error-bg,transparent)] p-4 text-sm text-[var(--status-error-text,currentColor)]">
        <span>${m.detailError} ${this.obterTarefaError?.message ?? ''}</span>
        <button type="button" class="min-h-[36px] self-start rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-3 text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.obterTarefa(this.selectedTarefa)}>${m.retry}</button>
      </div>`;
    } else if (!t) {
      body = html`<p class="rounded-lg border border-dashed border-[var(--border-default,currentColor)] p-6 text-center text-sm text-[var(--text-muted,currentColor)]">${m.panelEmpty}</p>`;
    } else {
      body = html`
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
            <CardDescription>${t.details.descricao ?? m.noDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <span class="${CHIP_BASE} ${STATUS_CLASS[t.status]}">${statusLabel(m, t.status)}</span>
            </div>
            <dl class="grid grid-cols-2 gap-x-4 gap-y-3">
              ${this.dlItem(m.dResp, t.responsavel.details.identification.name)}
              ${this.dlItem(m.dCriador, t.criador.details.identification.name)}
              ${this.dlItem(m.dPrazo, fmtDate(t.prazo))}
              ${this.dlItem(m.dPrioridade, prioLabel(m, t.prioridade))}
              ${this.dlItem(m.dSubtarefas, String(t.details.quantidadeSubtarefas))}
              ${this.dlItem(m.dChecklist, t.details.progressoChecklist)}
              ${this.dlItem(m.dCriadaEm, fmtDateTime(t.criadaEm))}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
        <div class="mt-3">
          <h2 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.checklistHeading}</h2>
          <groupviewdata--ml-vertical-record-list>
            <Columns>
              <Column field="estado" header=${m.colItemState} width="110px"></Column>
              <Column field="item" header=${m.colItem}></Column>
            </Columns>
            <Rows>
              ${t.itensChecklist.map(
                (i) => html`<Row>
                  <Cell><span class="text-xs ${i.feito ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">${i.feito ? `✓ ${m.itemDone}` : `○ ${m.itemPending}`}</span></Cell>
                  <Cell><span class=${i.feito ? 'text-[var(--text-muted,currentColor)]' : ''}>${i.details.descricao}</span></Cell>
                </Row>`,
              )}
            </Rows>
            <Empty><div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${m.checklistEmpty}</div></Empty>
          </groupviewdata--ml-vertical-record-list>
        </div>`;
    }
    return html`<section data-organism-id="detalheTarefa" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3" aria-busy=${loading ? 'true' : 'false'}>${body}</section>`;
  }

  private renderActions() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t || this.obterTarefaStatus === 'loading') return html`<section data-organism-id="acoesGestor"></section>`;
    const draft = this.reatribuirTarefaDraft;
    const aberta = t.details.aberta;
    const reLoading = this.reatribuirTarefaStatus === 'loading';
    const caLoading = this.cancelarTarefaStatus === 'loading';

    return html`
      <section data-organism-id="acoesGestor" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.actionsHeading}</h2>
        ${aberta
          ? nothing
          : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.closedNote}</p>`}
        <groupselectone--ml-select-one-autocomplete
          .value=${draft.responsavelId}
          placeholder=${m.newRespPlaceholder}
          ?disabled=${!aberta}
          @change=${(e: CustomEvent<{ value: string | null }>) => this.setReatribuirTarefaDraft({ ...draft, responsavelId: e.detail.value })}
        >
          <Label>${m.newRespLabel}</Label>
          <Helper>${m.newRespHelper}</Helper>
          ${this.membros.map(
            (p) => html`<Item value=${p.id} ?disabled=${p.details.identification.status !== 'Active'}>${p.details.identification.name}${p.details.identification.status !== 'Active' ? ` (${m.inativo})` : ''}</Item>`,
          )}
          <Empty>${m.newRespEmpty}</Empty>
        </groupselectone--ml-select-one-autocomplete>

        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.reatribuirTarefaStatus === 'error'} .dismissible=${false}>
          <Message>${m.reassignFailed} ${this.reatribuirTarefaError?.message ?? ''}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.cancelarTarefaStatus === 'error'} .dismissible=${false}>
          <Message>${m.cancelFailed} ${this.cancelarTarefaError?.message ?? ''}</Message>
        </groupnotifyuser--ml-contextual-feedback>

        <div class="flex flex-wrap items-center justify-between gap-2">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="md" ?disabled=${!aberta || !draft.responsavelId} .loading=${reLoading} @action=${() => this.reatribuirTarefa()}>
            <Label>${m.btnReassign}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" ?disabled=${!aberta} .loading=${caLoading} @action=${(e: Event) => setModal(e, true)}>
            <Label>${m.btnCancel}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>

        <groupnotifyuser--ml-alert-modal type="danger" @dismiss=${(e: Event) => setModal(e, false)}>
          <Title>${m.confirmTitle}</Title>
          <Message>
            <p>${m.confirmMessage}</p>
            <p class="mt-2 font-semibold">${t.titulo}</p>
          </Message>
          <Action>
            <div class="flex gap-2">
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${(e: Event) => setModal(e, false)}>
                <Label>${m.confirmNo}</Label>
              </grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard data-variant="danger" size="md" @action=${(e: Event) => { setModal(e, false); this.cancelarTarefa(); }}>
                <Label>${m.confirmYes}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </Action>
        </groupnotifyuser--ml-alert-modal>

        <groupnotifyuser--ml-toast-notification type="success" position="bottom-right" .duration=${4000} .visible=${this.reatribuirTarefaStatus === 'success'}>
          <Message>${m.toastReassigned}</Message>
        </groupnotifyuser--ml-toast-notification>
        <groupnotifyuser--ml-toast-notification type="success" position="bottom-right" .duration=${4000} .visible=${this.cancelarTarefaStatus === 'success'}>
          <Message>${m.toastCancelled}</Message>
        </groupnotifyuser--ml-toast-notification>
      </section>`;
  }

  private renderHistory() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t || this.obterTarefaStatus === 'loading') return html`<section data-organism-id="historicoTarefa"></section>`;
    const d = t.details;
    const events: { when: string; title: string; note?: string }[] = [
      { when: t.criadaEm, title: `${m.evCriada} ${t.criador.details.identification.name}` },
    ];
    if (d.devolvidaEm) events.push({ when: d.devolvidaEm, title: m.evDevolvida, note: d.motivoDevolucao });
    if (d.concluidaEm) events.push({ when: d.concluidaEm, title: m.evConcluida });
    if (d.canceladaEm) events.push({ when: d.canceladaEm, title: m.evCancelada });

    return html`
      <section data-organism-id="historicoTarefa" class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <h2 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.historyHeading}</h2>
        <groupviewdata--ml-timeline-view>
          <Columns>
            <Column field="quando" header=${m.colWhen} width="130px"></Column>
            <Column field="evento" header=${m.colEvent}></Column>
          </Columns>
          <Rows>
            ${events.map(
              (ev) => html`<Row>
                <Cell><span class="text-xs text-[var(--text-muted,currentColor)]">${fmtDateTime(ev.when)}</span></Cell>
                <Cell>
                  <div class="text-sm text-[var(--text-strong,currentColor)]">${ev.title}</div>
                  ${ev.note ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${m.evMotivo} ${ev.note}</div>` : nothing}
                </Cell>
              </Row>`,
            )}
          </Rows>
        </groupviewdata--ml-timeline-view>
      </section>`;
  }
}
