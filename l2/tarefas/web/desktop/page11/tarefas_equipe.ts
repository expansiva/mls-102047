/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { MembroResumo, TarefaStatus, TarefaPrioridade } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-range-dual-calendar.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Tarefas da equipe',
  buscaLabel: 'Buscar tarefa',
  buscaPlaceholder: 'Digite parte do título',
  listaLabel: 'Lista',
  listaPlaceholder: 'Todas as listas',
  responsavelLabel: 'Responsável',
  responsavelPlaceholder: 'Toda a equipe',
  prazoLabel: 'Prazo',
  prazoHelper: 'Escolha o dia do prazo (clique duas vezes no mesmo dia)',
  situacaoLabel: 'Situação',
  prioridadeLabel: 'Prioridade',
  todas: 'Todas',
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  aFazer: 'A fazer',
  emAndamento: 'Em andamento',
  emRevisao: 'Em revisão',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
  limparFiltros: 'Limpar filtros',
  colTarefa: 'Tarefa',
  colResponsavel: 'Responsável',
  colPrioridade: 'Prioridade',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colChecklist: 'Checklist',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  quadroVazio: 'Nenhuma tarefa encontrada com esses filtros.',
  quadroCarregando: 'Carregando tarefas…',
  quadroErro: 'Não foi possível carregar o quadro de tarefas.',
  tentarNovamente: 'Tentar novamente',
  maisTarefas: 'Mostrar mais tarefas',
  precondicao: 'Faltam informações para abrir o quadro da equipe. Volte à página anterior e abra esta tela de novo.',
  voltar: 'Voltar à página anterior',
  abaTarefa: 'Tarefa',
  abaHistorico: 'Histórico',
  voltarRotulo: 'Voltar',
  painelVazio: 'Escolha uma tarefa no quadro para ver o andamento, trocar o responsável ou cancelá-la.',
  historicoVazio: 'O histórico aparece quando você escolhe uma tarefa no quadro.',
  detalheCarregando: 'Carregando a tarefa…',
  detalheErro: 'Não foi possível carregar a tarefa escolhida.',
  descricao: 'Descrição',
  semDescricao: 'Sem descrição.',
  criador: 'Criada por',
  responsavel: 'Responsável',
  prazo: 'Prazo',
  situacao: 'Situação',
  prioridade: 'Prioridade',
  tarefaPai: 'Tarefa pai',
  subtarefas: 'Subtarefas',
  criadaEm: 'Criada em',
  checklist: 'Checklist',
  checklistVazia: 'Esta tarefa não tem itens na checklist.',
  novoResponsavel: 'Novo responsável',
  novoResponsavelPlaceholder: 'Digite o nome de quem assume',
  novoResponsavelHelper: 'A pessoa escolhida passa a agir agora e é avisada.',
  semMembros: 'Nenhuma pessoa ativa encontrada',
  reatribuir: 'Reatribuir tarefa',
  cancelar: 'Cancelar tarefa',
  tarefaEncerrada: 'Esta tarefa está encerrada e não aceita mais ações.',
  confirmaTitulo: 'Confirmar cancelamento',
  confirmaMsgAntes: 'Você vai cancelar a tarefa',
  confirmaMsgDepois: 'Ela deixa de ser acompanhada e não muda mais de situação.',
  manter: 'Manter tarefa',
  confirmaCancelar: 'Sim, cancelar tarefa',
  okReatribuida: 'Responsável trocado. A nova pessoa foi avisada.',
  okCancelada: 'Tarefa cancelada.',
  erroReatribuir: 'Não foi possível trocar o responsável. Confira a escolha e tente de novo.',
  erroCancelar: 'Não foi possível cancelar a tarefa. Tente de novo.',
  marco: 'Marco',
  quando: 'Quando',
  evCriada: 'Tarefa criada',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Concluída',
  evCancelada: 'Cancelada',
  por: 'por',
  motivo: 'Motivo:'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const CHIP = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap';

function statusChip(status: TarefaStatus): string {
  switch (status) {
    case 'emAndamento': return `${CHIP} bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]`;
    case 'emRevisao': return `${CHIP} bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]`;
    case 'concluida': return `${CHIP} bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]`;
    default: return `${CHIP} bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]`;
  }
}

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtDay(value: string | undefined): string {
  const d = parseDate(value);
  return d ? new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d) : '';
}

function fmtDateTime(value: string | undefined): string {
  const d = parseDate(value);
  return d ? new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeStyle: 'short' }).format(d) : '';
}

function nomeMembro(m: MembroResumo | undefined): string {
  return m?.details?.identification?.details?.identification?.name ?? '';
}

function toggleModal(from: EventTarget | null, visible: boolean): void {
  const host = (from as HTMLElement | null)?.closest('[data-organism-id="acoesGestorTarefa"]');
  const modal = host?.querySelector('groupnotifyuser--ml-alert-modal') as (HTMLElement & { visible: boolean }) | null | undefined;
  if (modal) modal.visible = visible;
}

@customElement('tarefas--web--desktop--page11--tarefas_equipe-102047')
export class TarefasDesktopPage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: TarefaStatus) {
    switch (s) {
      case 'aFazer': return this.msg.aFazer;
      case 'emAndamento': return this.msg.emAndamento;
      case 'emRevisao': return this.msg.emRevisao;
      case 'concluida': return this.msg.concluida;
      default: return this.msg.cancelada;
    }
  }

  private prioridadeLabel(p: TarefaPrioridade) {
    return p === 'high' ? this.msg.alta : p === 'medium' ? this.msg.media : this.msg.baixa;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="flex min-h-screen flex-col gap-4 bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
        <div class="grid grid-cols-[minmax(0,1fr)_27rem] items-start gap-6">
          <section class="flex min-w-0 flex-col gap-3" data-organism-id="quadroTarefasEquipe">
            ${this.renderFiltros()}
            ${this.renderQuadro()}
          </section>
          <aside class="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
            ${this.renderPainel()}
          </aside>
        </div>
      </div>
    `;
  }

  private renderFiltros() {
    const m = this.msg;
    const statusAtual = this.filtroStatus[0] ?? 'todas';
    return html`
      <div class="flex flex-col gap-3 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3">
        <div class="grid grid-cols-3 gap-3">
          <groupsearchcontent--ml-search-bar
            .value=${this.filtroTitulo}
            placeholder=${m.buscaPlaceholder}
            @search=${(e: CustomEvent<{ query: string }>) => { void this.buscarPorTitulo(e.detail.query || null); }}
            @change=${(e: CustomEvent<{ value: string | null }>) => { void this.buscarPorTitulo(e.detail.value || null); }}
            @clear=${() => { void this.buscarPorTitulo(null); }}>
            <Label>${m.buscaLabel}</Label>
          </groupsearchcontent--ml-search-bar>
          <groupselectone--ml-combobox
            clearable
            placeholder=${m.listaPlaceholder}
            .value=${this.filtroListaId}
            @change=${(e: CustomEvent<{ value: string | null }>) => { void this.selecionarLista(e.detail.value || null); }}>
            <Label>${m.listaLabel}</Label>
            ${this.listas.map(l => html`<Item value=${l.id}>${l.nome}</Item>`)}
          </groupselectone--ml-combobox>
          <groupselectone--ml-combobox
            clearable
            placeholder=${m.responsavelPlaceholder}
            .value=${this.filtroResponsavelId}
            @focus=${() => { void this.qryBuscarMembros('', false); }}
            @change=${(e: CustomEvent<{ value: string | null }>) => { void this.filtrarPorResponsavel(e.detail.value || null); }}>
            <Label>${m.responsavelLabel}</Label>
            ${this.membros.map(mb => html`<Item value=${mb.id}>${nomeMembro(mb)}</Item>`)}
          </groupselectone--ml-combobox>
        </div>
        <div class="flex flex-wrap items-end gap-4">
          <groupselectone--ml-segmented-control
            .value=${statusAtual}
            @change=${(e: CustomEvent<{ value: string | null }>) => {
              const v = e.detail.value;
              void this.filtrarPorStatus(!v || v === 'todas' ? [] : [v as TarefaStatus]);
            }}>
            <Label>${m.situacaoLabel}</Label>
            <Item value="todas">${m.todas}</Item>
            <Item value="aFazer">${m.aFazer}</Item>
            <Item value="emAndamento">${m.emAndamento}</Item>
            <Item value="emRevisao">${m.emRevisao}</Item>
            <Item value="concluida">${m.concluida}</Item>
            <Item value="cancelada">${m.cancelada}</Item>
          </groupselectone--ml-segmented-control>
          <groupselectone--ml-segmented-control
            .value=${this.filtroPrioridade ?? 'todas'}
            @change=${(e: CustomEvent<{ value: string | null }>) => {
              const v = e.detail.value;
              void this.filtrarPorPrioridade(!v || v === 'todas' ? null : (v as TarefaPrioridade));
            }}>
            <Label>${m.prioridadeLabel}</Label>
            <Item value="todas">${m.todas}</Item>
            <Item value="low">${m.baixa}</Item>
            <Item value="medium">${m.media}</Item>
            <Item value="high">${m.alta}</Item>
          </groupselectone--ml-segmented-control>
          <groupenterdateinterval--ml-date-range-dual-calendar
            locale=${lang() ?? 'pt-BR'}
            .startDate=${this.filtroPrazo}
            .endDate=${this.filtroPrazo}
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => { void this.filtrarPorPrazo(e.detail.startDate || null); }}>
            <Label>${m.prazoLabel}</Label>
            <Helper>${m.prazoHelper}</Helper>
          </groupenterdateinterval--ml-date-range-dual-calendar>
          <div class="ml-auto">
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="sm" @action=${() => { void this.limparFiltros(); }}>
              <Label>${m.limparFiltros}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>
      </div>
    `;
  }

  private renderQuadro() {
    const m = this.msg;
    const erro = this.qryTarefasEquipeError;
    if (erro && erro.code === 'client.preconditionMissing') {
      return html`
        <div class="flex flex-col items-start gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" aria-live="polite">
          <p>${m.precondicao}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => window.history.back()}>
            <Label>${m.voltar}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    if (erro) {
      return html`
        <div class="flex flex-col items-start gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" aria-live="polite">
          <p>${m.quadroErro}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => { void this.qryTarefasEquipe(); }}>
            <Label>${m.tentarNovamente}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    const items = this.tarefas?.items ?? [];
    const idx = items.findIndex(i => i.id === this.selectedTarefa);
    const loading = this.qryTarefasEquipeStatus === 'loading';
    return html`
      <div aria-busy=${loading ? 'true' : 'false'}>
        <groupviewtable--ml-advanced-data-table
          .value=${idx >= 0 ? String(idx) : ''}
          .loading=${loading}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const row = items[e.detail.index];
            if (row) this.selecionarTarefa(row.id);
          }}>
          <TableHeader>
            <TableRow>
              <TableHead key="titulo">${m.colTarefa}</TableHead>
              <TableHead key="responsavel">${m.colResponsavel}</TableHead>
              <TableHead key="prioridade">${m.colPrioridade}</TableHead>
              <TableHead key="prazo">${m.colPrazo}</TableHead>
              <TableHead key="status">${m.colSituacao}</TableHead>
              <TableHead key="checklist">${m.colChecklist}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map(i => html`
              <TableRow key=${i.id}>
                <TableCell>
                  <div class="flex flex-col gap-0.5">
                    <span class="font-medium text-[var(--text-strong,currentColor)]">${i.titulo}</span>
                    <span class="text-xs text-[var(--text-muted,currentColor)]">${i.lista?.nome ?? ''}</span>
                  </div>
                </TableCell>
                <TableCell>${nomeMembro(i.responsavel)}</TableCell>
                <TableCell>
                  <span class=${i.prioridade === 'high' ? 'font-semibold text-[var(--text-strong,currentColor)]' : i.prioridade === 'low' ? 'text-[var(--text-muted,currentColor)]' : ''}>${this.prioridadeLabel(i.prioridade)}</span>
                </TableCell>
                <TableCell>
                  <div class="flex flex-col items-start gap-1">
                    <span>${fmtDay(i.prazo)}</span>
                    ${i.details.details.atrasada
                      ? html`<span class="${CHIP} bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${m.atrasada}</span>`
                      : i.details.details.venceHoje
                        ? html`<span class="${CHIP} bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${m.venceHoje}</span>`
                        : nothing}
                  </div>
                </TableCell>
                <TableCell><span class=${statusChip(i.status)}>${this.statusLabel(i.status)}</span></TableCell>
                <TableCell>${i.details.details.progressoChecklist}</TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>
            <div class="flex flex-col items-center gap-3 py-8 text-[var(--text-muted,currentColor)]">
              <span>${m.quadroVazio}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.limparFiltros(); }}>
                <Label>${m.limparFiltros}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </Empty>
          <Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.quadroCarregando}</div></Loading>
        </groupviewtable--ml-advanced-data-table>
        ${this.tarefas?.hasMore
          ? html`
            <div class="mt-3 flex justify-center">
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                size="sm"
                .loading=${loading}
                @action=${() => { void this.qryTarefasEquipe((this.tarefas?.page ?? 1) + 1, true); }}>
                <Label>${m.maisTarefas}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </div>
    `;
  }

  private renderPainel() {
    const m = this.msg;
    return html`
      <molecules--ml-scenary-102020
        mode="tabs"
        .value=${this.scenary || 'detalhe'}
        @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
        <Scene value="detalhe" title=${m.abaTarefa}>
          <div class="flex flex-col gap-4 pt-3">
            <div data-organism-id="detalheTarefa">${this.renderDetalhe()}</div>
            <div data-organism-id="acoesGestorTarefa">${this.renderAcoes()}</div>
          </div>
        </Scene>
        <Scene value="historico" title=${m.abaHistorico}>
          <div class="pt-3" data-organism-id="historicoTarefa">${this.renderHistorico()}</div>
        </Scene>
      </molecules--ml-scenary-102020>
    `;
  }

  private renderDetalhe() {
    const m = this.msg;
    const t = this.tarefa;
    if (!this.selectedTarefa) {
      return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${m.painelVazio}</p>`;
    }
    if (this.qryDetalheTarefaError) {
      return html`
        <div class="flex flex-col items-start gap-3" aria-live="polite">
          <p>${m.detalheErro}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.qryDetalheTarefa(); }}>
            <Label>${m.tentarNovamente}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    if (!t) {
      return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]" aria-busy="true">${m.detalheCarregando}</p>`;
    }
    const d = t.details.details;
    return html`
      <groupviewcard--ml-vertical-card .loading=${this.qryDetalheTarefaStatus === 'loading'}>
        <CardHeader>
          <CardTitle>${t.titulo}</CardTitle>
          <CardDescription>${t.lista?.nome ?? ''}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-3 text-sm">
            <div class="flex flex-wrap items-center gap-2">
              <span class=${statusChip(t.status)}>${this.statusLabel(t.status)}</span>
              <span class="text-[var(--text-muted,currentColor)]">${this.prioridadeLabel(t.prioridade)}</span>
            </div>
            <div>
              <div class="text-xs text-[var(--text-muted,currentColor)]">${m.descricao}</div>
              <p>${d.descricao ? d.descricao : m.semDescricao}</p>
            </div>
            <dl class="grid grid-cols-2 gap-x-4 gap-y-2">
              <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.responsavel}</dt><dd>${nomeMembro(t.responsavel)}</dd></div>
              <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.criador}</dt><dd>${nomeMembro(t.criador)}</dd></div>
              <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.prazo}</dt><dd>${fmtDay(t.prazo)}</dd></div>
              <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.subtarefas}</dt><dd>${d.quantidadeSubtarefas}</dd></div>
              ${t.tarefaPai
                ? html`<div class="col-span-2"><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.tarefaPai}</dt><dd>${t.tarefaPai.titulo}</dd></div>`
                : nothing}
            </dl>
            <div>
              <div class="mb-1 flex items-center justify-between">
                <span class="text-xs text-[var(--text-muted,currentColor)]">${m.checklist}</span>
                <span class="text-xs font-medium">${d.progressoChecklist}</span>
              </div>
              ${t.checklist.length === 0
                ? html`<p class="text-[var(--text-muted,currentColor)]">${m.checklistVazia}</p>`
                : html`<ul class="flex flex-col">
                    ${t.checklist.map(i => html`
                      <li>
                        <groupenterboolean--ml-checkbox-preference .value=${i.feito} disabled>
                          <Label>${i.details.details.descricao}</Label>
                        </groupenterboolean--ml-checkbox-preference>
                      </li>`)}
                  </ul>`}
            </div>
          </div>
        </CardContent>
        <CardFooter><span class="text-xs text-[var(--text-muted,currentColor)]">${m.criadaEm} ${fmtDateTime(t.criadaEm)}</span></CardFooter>
      </groupviewcard--ml-vertical-card>
    `;
  }

  private renderAcoes() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t || !this.selectedTarefa) return nothing;
    const reLoading = this.cmdReatribuirTarefaStatus === 'loading';
    const caLoading = this.cmdCancelarTarefaStatus === 'loading';
    const travado = reLoading || caLoading;
    const draft = this.cmdReatribuirTarefaDraft;
    return html`
      <div class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-3" aria-live="polite">
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${this.cmdReatribuirTarefaStatus === 'success'} .dismissible=${false}>
          <Message>${m.okReatribuida}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${this.cmdCancelarTarefaStatus === 'success'} .dismissible=${false}>
          <Message>${m.okCancelada}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${!!this.cmdReatribuirTarefaError} .dismissible=${false}>
          <Message>${m.erroReatribuir}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${!!this.cmdCancelarTarefaError} .dismissible=${false}>
          <Message>${m.erroCancelar}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        ${t.details.details.aberta
          ? html`
            <div class="flex flex-col gap-2">
              <groupselectone--ml-select-one-autocomplete
                .value=${draft.responsavelId}
                placeholder=${m.novoResponsavelPlaceholder}
                .disabled=${travado}
                @focus=${() => { void this.qryBuscarMembros('', true); }}
                @change=${(e: CustomEvent<{ value: string | null }>) => this.setCmdReatribuirTarefaDraft({ ...draft, responsavelId: e.detail.value || null })}>
                <Label>${m.novoResponsavel}</Label>
                <Helper>${m.novoResponsavelHelper}</Helper>
                ${this.membros.map(mb => html`<Item value=${mb.id}>${nomeMembro(mb)}</Item>`)}
                <Empty>${m.semMembros}</Empty>
              </groupselectone--ml-select-one-autocomplete>
              <div>
                <grouptriggeraction--ml-button-standard
                  data-variant="primary"
                  .disabled=${!draft.responsavelId || travado}
                  .loading=${reLoading}
                  @action=${() => { void this.cmdReatribuirTarefa(); }}>
                  <Label>${m.reatribuir}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
            </div>
            <div class="border-t border-[var(--border-subtle,currentColor)] pt-3">
              <grouptriggeraction--ml-button-standard
                data-variant="danger"
                .disabled=${travado}
                .loading=${caLoading}
                @action=${(e: Event) => toggleModal(e.currentTarget, true)}>
                <Label>${m.cancelar}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.tarefaEncerrada}</p>`}
        <groupnotifyuser--ml-alert-modal
          type="danger"
          @dismiss=${(e: Event) => toggleModal(e.currentTarget, false)}>
          <Title>${m.confirmaTitulo}</Title>
          <Message>${m.confirmaMsgAntes} “${t.titulo}”. ${m.confirmaMsgDepois}</Message>
          <Action>
            <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${(e: Event) => toggleModal(e.currentTarget, false)}>
              <Label>${m.manter}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard
              data-variant="danger"
              @action=${(e: Event) => { toggleModal(e.currentTarget, false); void this.cmdCancelarTarefa(); }}>
              <Label>${m.confirmaCancelar}</Label>
            </grouptriggeraction--ml-button-standard>
          </Action>
        </groupnotifyuser--ml-alert-modal>
      </div>
    `;
  }

  private renderHistorico() {
    const m = this.msg;
    const t = this.tarefa;
    if (!this.selectedTarefa || !t) {
      return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${m.historicoVazio}</p>`;
    }
    const d = t.details.details;
    return html`
      <groupviewdata--ml-timeline-view>
        <Columns>
          <Column field="marco" header=${m.marco} />
          <Column field="quando" header=${m.quando} width="9rem" />
        </Columns>
        <Rows>
          <Row>
            <Cell>
              <div class="font-medium">${m.evCriada}</div>
              <div class="text-xs text-[var(--text-muted,currentColor)]">${m.por} ${nomeMembro(t.criador)}</div>
            </Cell>
            <Cell>${fmtDateTime(t.criadaEm)}</Cell>
          </Row>
          ${d.devolvidaEm
            ? html`<Row>
                <Cell>
                  <div class="font-medium">${m.evDevolvida}</div>
                  ${d.motivoDevolucao ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${m.motivo} ${d.motivoDevolucao}</div>` : nothing}
                </Cell>
                <Cell>${fmtDateTime(d.devolvidaEm)}</Cell>
              </Row>`
            : nothing}
          ${d.concluidaEm
            ? html`<Row><Cell><div class="font-medium">${m.evConcluida}</div></Cell><Cell>${fmtDateTime(d.concluidaEm)}</Cell></Row>`
            : nothing}
          ${d.canceladaEm
            ? html`<Row><Cell><div class="font-medium">${m.evCancelada}</div></Cell><Cell>${fmtDateTime(d.canceladaEm)}</Cell></Row>`
            : nothing}
        </Rows>
      </groupviewdata--ml-timeline-view>
    `;
  }
}
