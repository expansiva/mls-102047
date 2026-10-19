/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { TarefaEquipeItem, TarefasPage, TarefaPrioridade, TarefaSituacao } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-interval-presets.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Tarefas da equipe',
  sceneDetail: 'Detalhe da tarefa',
  sceneConfirm: 'Confirmar cancelamento',
  back: 'Voltar',
  atrasadas: 'Atrasadas',
  venceHoje: 'Vencem hoje',
  filtros: 'Filtros',
  limparFiltros: 'Limpar filtros',
  lista: 'Lista',
  responsavel: 'Responsável',
  prioridade: 'Prioridade',
  situacao: 'Situação',
  prazo: 'Prazo',
  periodoPrazo: 'Período do prazo',
  de: 'De',
  ate: 'Até',
  todasListas: 'Todas as listas',
  todosResponsaveis: 'Todos os responsáveis',
  todasPrioridades: 'Todas as prioridades',
  todasSituacoes: 'Todas as situações',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prBaixa: 'Baixa',
  prMedia: 'Média',
  prAlta: 'Alta',
  colTarefa: 'Tarefa',
  chipVenceHoje: 'Vence hoje',
  chipAtrasada: 'Atrasada',
  emptyBoard: 'Nenhuma tarefa encontrada',
  emptyHint: 'Ajuste ou limpe os filtros para ver outras tarefas.',
  loadMore: 'Carregar mais tarefas',
  loadingBoard: 'Carregando tarefas…',
  errorBoard: 'Não foi possível carregar as tarefas.',
  retry: 'Tentar novamente',
  preconditionTitle: 'Faltam informações para abrir esta tela',
  preconditionBody: 'Abra as tarefas da equipe a partir do menu do módulo para que a lista possa ser carregada.',
  goBack: 'Voltar para a tela anterior',
  opening: 'Abrindo tarefa…',
  errorDetail: 'Não foi possível abrir a tarefa.',
  descricao: 'Descrição',
  noDescricao: 'Sem descrição',
  criador: 'Criada por',
  criadaEm: 'Criada em',
  subtarefas: 'Subtarefas',
  motivoDevolucao: 'Motivo da devolução',
  checklist: 'Checklist',
  checkItem: 'Item',
  checkDone: 'Feito',
  checkPending: 'Pendente',
  emptyChecklist: 'Esta tarefa não tem itens na checklist.',
  acoesTitle: 'Ações do gestor',
  novoResp: 'Novo responsável',
  novoRespPlaceholder: 'Escolha uma pessoa da equipe',
  novoRespHelper: 'Só pessoas ativas podem receber a tarefa, e ela será avisada.',
  btnReatribuir: 'Reatribuir tarefa',
  btnCancelar: 'Cancelar tarefa',
  closedNote: 'Esta tarefa está encerrada e não aceita mais ações.',
  confirmMessage: 'Você vai cancelar a tarefa abaixo. Depois disso, ela não muda mais de situação.',
  btnConfirmCancel: 'Sim, cancelar a tarefa',
  btnKeep: 'Manter a tarefa',
  toastReatribuida: 'Responsável trocado. A nova pessoa foi avisada.',
  toastCancelada: 'Tarefa cancelada.',
  historico: 'Histórico',
  hQuando: 'Quando',
  hEvento: 'O que aconteceu',
  hCriada: 'Tarefa criada por',
  hDevolvida: 'Devolvida para ajuste',
  hConcluida: 'Concluída',
  hCancelada: 'Cancelada',
  semDados: '—',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const ALL = '__all';
const PRECONDITION = 'client.preconditionMissing';

function lang() {
  return document.documentElement.lang || undefined;
}

function fmtDate(value: string | undefined) {
  if (!value) return '';
  const d = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function fmtDateTime(value: string | undefined) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function rowsOf(page: TarefasPage | null): TarefaEquipeItem[] {
  return page ? page.items : [];
}

function chipClass(status: TarefaSituacao) {
  switch (status) {
    case 'emAndamento':
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'emRevisao':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'concluida':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

const btnQuick = 'min-h-[44px] px-4 rounded-full border text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';
const btnQuickOn = 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]';
const btnQuickOff = 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]';

@customElement('tarefas--web--mobile--page11--tarefas_equipe-102047')
export class TarefasMobilePage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: TarefaSituacao) {
    const m = this.msg;
    const map: Record<TarefaSituacao, string> = {
      aFazer: m.stAFazer,
      emAndamento: m.stEmAndamento,
      emRevisao: m.stEmRevisao,
      concluida: m.stConcluida,
      cancelada: m.stCancelada,
    };
    return map[s];
  }

  private prioridadeLabel(p: TarefaPrioridade) {
    const m = this.msg;
    const map: Record<TarefaPrioridade, string> = { low: m.prBaixa, medium: m.prMedia, high: m.prAlta };
    return map[p];
  }

  private chip(s: TarefaSituacao) {
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${chipClass(s)}">${this.statusLabel(s)}</span>`;
  }

  private abrir(t: TarefaEquipeItem | undefined) {
    if (!t) return;
    this.setScenario('tarefa');
    this.obterTarefa(t.id);
  }

  private limparFiltros() {
    this.listarTarefasEquipe({
      listaId: null,
      responsavelId: null,
      prioridade: null,
      status: null,
      prazoDe: null,
      prazoAte: null,
      venceHoje: null,
      atrasada: null,
    });
  }

  private filterSelect(
    label: string,
    allLabel: string,
    value: string | null,
    items: { value: string; label: string }[],
    onPick: (v: string | null) => void,
  ) {
    return html`
      <groupselectone--ml-select
        .value=${value ?? ALL}
        @change=${(e: CustomEvent<{ value: string | null }>) => onPick(e.detail.value === ALL ? null : e.detail.value)}
      >
        <Label>${label}</Label>
        <Trigger>${allLabel}</Trigger>
        <Item value=${ALL}>${allLabel}</Item>
        ${items.map((i) => html`<Item value=${i.value}>${i.label}</Item>`)}
      </groupselectone--ml-select>
    `;
  }

  private renderFiltros() {
    const m = this.msg;
    return html`
      <details class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <summary class="min-h-[44px] flex items-center px-3 cursor-pointer text-sm font-medium text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${m.filtros}</summary>
        <div class="grid gap-3 p-3 border-t border-[var(--border-subtle,currentColor)]">
          ${this.filterSelect(m.lista, m.todasListas, this.listaId, this.listas.map((l) => ({ value: l.id, label: l.nome })), (v) => this.listarTarefasEquipe({ listaId: v }))}
          ${this.filterSelect(m.responsavel, m.todosResponsaveis, this.responsavelId, this.membros.map((x) => ({ value: x.id, label: x.details.identification.name })), (v) => this.listarTarefasEquipe({ responsavelId: v }))}
          ${this.filterSelect(m.prioridade, m.todasPrioridades, this.prioridade, [
            { value: 'low', label: m.prBaixa },
            { value: 'medium', label: m.prMedia },
            { value: 'high', label: m.prAlta },
          ], (v) => this.listarTarefasEquipe({ prioridade: v as TarefaPrioridade | null }))}
          ${this.filterSelect(m.situacao, m.todasSituacoes, this.status, [
            { value: 'aFazer', label: m.stAFazer },
            { value: 'emAndamento', label: m.stEmAndamento },
            { value: 'emRevisao', label: m.stEmRevisao },
            { value: 'concluida', label: m.stConcluida },
            { value: 'cancelada', label: m.stCancelada },
          ], (v) => this.listarTarefasEquipe({ status: v as TarefaSituacao | null }))}
          <groupenterdateinterval--ml-date-interval-presets
            .startDate=${this.prazoDe}
            .endDate=${this.prazoAte}
            locale=${lang() || 'pt-BR'}
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) =>
              this.listarTarefasEquipe({ prazoDe: e.detail.startDate, prazoAte: e.detail.endDate })}
          >
            <Label>${m.periodoPrazo}</Label>
            <LabelStart>${m.de}</LabelStart>
            <LabelEnd>${m.ate}</LabelEnd>
          </groupenterdateinterval--ml-date-interval-presets>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.limparFiltros()}>
            <Label>${m.limparFiltros}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </details>
    `;
  }

  private renderErroQuadro() {
    const m = this.msg;
    const err = this.listarTarefasEquipeError ?? this.carregarOpcoesEquipeError;
    if (!err) return nothing;
    if (err.code === PRECONDITION) {
      return html`
        <div role="alert" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 flex flex-col gap-3">
          <p class="font-semibold text-[var(--text-strong,currentColor)]">${m.preconditionTitle}</p>
          <p class="text-sm text-[var(--text-default,currentColor)]">${m.preconditionBody}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => history.back()}>
            <Label>${m.goBack}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    return html`
      <div role="alert" aria-live="polite" class="rounded-lg bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)] p-3 flex flex-col gap-2">
        <p class="text-sm font-medium">${m.errorBoard}</p>
        <p class="text-sm">${err.message}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.listarTarefasEquipe()}>
          <Label>${m.retry}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderQuadro() {
    const m = this.msg;
    const rows = rowsOf(this.tarefas);
    const loading = this.listarTarefasEquipeStatus === 'loading' || this.pageStatus === 'loading';
    const idx = rows.findIndex((r) => r.id === this.selectedTarefa);
    const hasMore = this.tarefas ? this.tarefas.hasMore : false;
    return html`
      <section data-organism-id="tarefasEquipe" class="flex flex-col gap-3">
        <div class="flex gap-2 flex-wrap">
          <button type="button" aria-pressed=${this.atrasada ? 'true' : 'false'} class="${btnQuick} ${this.atrasada ? btnQuickOn : btnQuickOff}"
            @click=${() => this.listarTarefasEquipe({ atrasada: this.atrasada ? null : true })}>${m.atrasadas}</button>
          <button type="button" aria-pressed=${this.venceHoje ? 'true' : 'false'} class="${btnQuick} ${this.venceHoje ? btnQuickOn : btnQuickOff}"
            @click=${() => this.listarTarefasEquipe({ venceHoje: this.venceHoje ? null : true })}>${m.venceHoje}</button>
        </div>
        ${this.renderFiltros()}
        ${this.renderErroQuadro()}
        <groupviewtable--ml-responsive-table
          .value=${idx >= 0 ? String(idx) : ''}
          .loading=${loading}
          @rowClick=${(e: CustomEvent<{ index: number }>) => this.abrir(rows[e.detail.index])}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="titulo">${m.colTarefa}</TableHead>
              <TableHead key="responsavel">${m.responsavel}</TableHead>
              <TableHead key="prazo">${m.prazo}</TableHead>
              <TableHead key="status">${m.situacao}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${rows.map((r) => html`
              <TableRow key=${r.id}>
                <TableCell>
                  <div class="font-medium text-[var(--text-strong,currentColor)]">${r.titulo}</div>
                  <div class="text-xs text-[var(--text-muted,currentColor)]">${r.lista.nome} · ${r.details.progressoChecklist} · ${this.prioridadeLabel(r.prioridade)}</div>
                </TableCell>
                <TableCell>${r.responsavel.details.identification.name}</TableCell>
                <TableCell>
                  <span class="${r.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : 'text-[var(--text-default,currentColor)]'}">${fmtDate(r.prazo)}</span>
                  ${r.details.atrasada
                    ? html`<span class="ml-1 text-xs text-[var(--status-error-text,currentColor)]">${m.chipAtrasada}</span>`
                    : r.details.venceHoje
                      ? html`<span class="ml-1 inline-flex rounded-full px-2 py-0.5 text-xs bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${m.chipVenceHoje}</span>`
                      : nothing}
                </TableCell>
                <TableCell>${this.chip(r.status)}</TableCell>
              </TableRow>`)}
          </TableBody>
          <Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.loadingBoard}</div></Loading>
          <Empty>
            <div class="py-8 px-4 text-center flex flex-col gap-2">
              <p class="font-medium text-[var(--text-strong,currentColor)]">${m.emptyBoard}</p>
              <p class="text-sm text-[var(--text-muted,currentColor)]">${m.emptyHint}</p>
            </div>
          </Empty>
        </groupviewtable--ml-responsive-table>
        ${hasMore
          ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full"
              ?loading=${this.listarTarefasEquipeStatus === 'loading'}
              @action=${() => this.listarTarefasEquipe(undefined, (this.tarefas ? this.tarefas.page : 1) + 1, true)}>
              <Label>${m.loadMore}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      </section>
    `;
  }

  private renderDetalhe() {
    const m = this.msg;
    const t = this.tarefa;
    if (this.obterTarefaStatus === 'loading') {
      return html`<section data-organism-id="detalheTarefa" aria-busy="true" class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.opening}</section>`;
    }
    if (this.obterTarefaError) {
      return html`
        <section data-organism-id="detalheTarefa" role="alert" aria-live="polite" class="rounded-lg bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)] p-3 flex flex-col gap-2">
          <p class="text-sm font-medium">${m.errorDetail}</p>
          <p class="text-sm">${this.obterTarefaError.message}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.obterTarefa(this.selectedTarefa)}>
            <Label>${m.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </section>`;
    }
    if (!t) return html`<section data-organism-id="detalheTarefa"></section>`;
    return html`
      <section data-organism-id="detalheTarefa" class="flex flex-col gap-4">
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
            <CardDescription>
              <span class="inline-flex items-center gap-2">${this.chip(t.status)}<span>${this.prioridadeLabel(t.prioridade)}</span></span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt class="text-[var(--text-muted,currentColor)]">${m.responsavel}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${t.responsavel.details.identification.name}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${m.criador}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${t.criador.details.identification.name}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${m.prazo}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${fmtDate(t.prazo)}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${m.subtarefas}</dt>
              <dd class="text-[var(--text-strong,currentColor)]">${t.details.quantidadeSubtarefas}</dd>
              <dt class="text-[var(--text-muted,currentColor)]">${m.descricao}</dt>
              <dd class="text-[var(--text-default,currentColor)]">${t.details.descricao || m.noDescricao}</dd>
              ${t.details.motivoDevolucao
                ? html`<dt class="text-[var(--text-muted,currentColor)]">${m.motivoDevolucao}</dt><dd class="text-[var(--text-default,currentColor)]">${t.details.motivoDevolucao}</dd>`
                : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
        <div class="flex flex-col gap-2">
          <div class="flex items-baseline justify-between">
            <h3 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m.checklist}</h3>
            <span class="text-sm text-[var(--text-muted,currentColor)]">${t.details.progressoChecklist}</span>
          </div>
          <groupviewdata--ml-vertical-record-list>
            <Columns>
              <Column field="feito" header=${m.checkDone} width="56px" align="center" />
              <Column field="descricao" header=${m.checkItem} />
            </Columns>
            <Rows>
              ${t.itensChecklist.map((i) => html`
                <Row>
                  <Cell><span role="img" aria-label=${i.feito ? m.checkDone : m.checkPending}>${i.feito ? '✓' : '○'}</span></Cell>
                  <Cell>${i.details.descricao}</Cell>
                </Row>`)}
            </Rows>
            <Empty><div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${m.emptyChecklist}</div></Empty>
          </groupviewdata--ml-vertical-record-list>
        </div>
      </section>
    `;
  }

  private renderAcoes() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t || this.obterTarefaStatus === 'loading') return html`<section data-organism-id="acoesGestor"></section>`;
    const erro = this.reatribuirTarefaError ?? this.cancelarTarefaError;
    return html`
      <section data-organism-id="acoesGestor" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <h3 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m.acoesTitle}</h3>
        ${t.details.aberta
          ? html`
            <groupselectone--ml-select-one-autocomplete
              .value=${this.reatribuirTarefaDraft.responsavelId}
              placeholder=${m.novoRespPlaceholder}
              @change=${(e: CustomEvent<{ value: string | null }>) => this.setReatribuirTarefaDraft({ responsavelId: e.detail.value })}
            >
              <Label>${m.novoResp}</Label>
              <Helper>${m.novoRespHelper}</Helper>
              ${this.membros.map((x) => html`<Item value=${x.id} ?disabled=${x.details.identification.status !== 'Active'}>${x.details.identification.name}</Item>`)}
            </groupselectone--ml-select-one-autocomplete>
            ${erro
              ? html`<p role="alert" aria-live="polite" class="rounded-md bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)] p-2 text-sm">${erro.message}</p>`
              : nothing}
            <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
              ?disabled=${!this.reatribuirTarefaDraft.responsavelId}
              ?loading=${this.reatribuirTarefaStatus === 'loading'}
              @action=${() => this.reatribuirTarefa()}>
              <Label>${m.btnReatribuir}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard data-variant="danger" size="lg" data-class="w-full"
              ?loading=${this.cancelarTarefaStatus === 'loading'}
              @action=${() => this.setScenario('cancelar')}>
              <Label>${m.btnCancelar}</Label>
            </grouptriggeraction--ml-button-standard>`
          : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.closedNote}</p>`}
        <groupnotifyuser--ml-toast-notification type="success" position="bottom" duration="4000"
          ?visible=${this.reatribuirTarefaStatus === 'success'}
          @dismiss=${() => this.setScenario('tarefa')}>
          <Message>${m.toastReatribuida}</Message>
        </groupnotifyuser--ml-toast-notification>
        <groupnotifyuser--ml-toast-notification type="success" position="bottom" duration="4000"
          ?visible=${this.cancelarTarefaStatus === 'success'}
          @dismiss=${() => this.setScenario('tarefa')}>
          <Message>${m.toastCancelada}</Message>
        </groupnotifyuser--ml-toast-notification>
      </section>
    `;
  }

  private renderHistorico() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t || this.obterTarefaStatus === 'loading') return html`<section data-organism-id="historicoTarefa"></section>`;
    const eventos: { quando: string; texto: string; extra: string }[] = [
      { quando: t.criadaEm, texto: `${m.hCriada} ${t.criador.details.identification.name}`, extra: '' },
    ];
    if (t.details.devolvidaEm) eventos.push({ quando: t.details.devolvidaEm, texto: m.hDevolvida, extra: t.details.motivoDevolucao ?? '' });
    if (t.details.concluidaEm) eventos.push({ quando: t.details.concluidaEm, texto: m.hConcluida, extra: '' });
    if (t.details.canceladaEm) eventos.push({ quando: t.details.canceladaEm, texto: m.hCancelada, extra: '' });
    return html`
      <section data-organism-id="historicoTarefa" class="flex flex-col gap-2">
        <h3 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m.historico}</h3>
        <groupviewdata--ml-timeline-view>
          <Columns>
            <Column field="quando" header=${m.hQuando} />
            <Column field="evento" header=${m.hEvento} />
          </Columns>
          <Rows>
            ${eventos.map((ev) => html`
              <Row>
                <Cell><span class="text-xs text-[var(--text-muted,currentColor)]">${fmtDateTime(ev.quando)}</span></Cell>
                <Cell>
                  <div class="text-sm text-[var(--text-strong,currentColor)]">${ev.texto}</div>
                  ${ev.extra ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${ev.extra}</div>` : nothing}
                </Cell>
              </Row>`)}
          </Rows>
        </groupviewdata--ml-timeline-view>
      </section>
    `;
  }

  private renderConfirmar() {
    const m = this.msg;
    const t = this.tarefa;
    return html`
      <div class="flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <p class="text-sm text-[var(--text-default,currentColor)]">${m.confirmMessage}</p>
        <p class="text-base font-semibold text-[var(--text-strong,currentColor)]">${t ? t.titulo : m.semDados}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.setScenario('tarefa')}>
          <Label>${m.btnKeep}</Label>
        </grouptriggeraction--ml-button-standard>
        <grouptriggeraction--ml-button-standard data-variant="danger" size="lg" data-class="w-full"
          ?disabled=${!t}
          @action=${() => { this.setScenario('tarefa'); this.cancelarTarefa(); }}>
          <Label>${m.btnConfirmCancel}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-3 max-w-[430px] mx-auto">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${m.back}
          .value=${this.scenary || 'quadro'}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}
        >
          <Scene value="quadro" title=${m.pageTitle}>
            ${this.renderQuadro()}
          </Scene>
          <Scene value="tarefa" title=${m.sceneDetail} nav="back" backTo="quadro">
            <div class="flex flex-col gap-5">
              ${this.renderDetalhe()}
              ${this.renderAcoes()}
              ${this.renderHistorico()}
            </div>
          </Scene>
          <Scene value="cancelar" title=${m.sceneConfirm} nav="back" backTo="tarefa">
            ${this.renderConfirmar()}
          </Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
