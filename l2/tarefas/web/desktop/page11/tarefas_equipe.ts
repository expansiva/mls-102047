/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { Prioridade, StatusTarefa } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-range-dual-calendar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Tarefas da equipe',
  filtroLista: 'Lista',
  filtroResponsavel: 'Responsável',
  filtroPrioridade: 'Prioridade',
  filtroSituacao: 'Situação',
  filtroPrazo: 'Prazo',
  prazoDe: 'De',
  prazoAte: 'Até',
  todas: 'Todas',
  todos: 'Todos',
  venceHoje: 'Vencem hoje',
  atrasadas: 'Atrasadas',
  limparFiltros: 'Limpar filtros',
  colTarefa: 'Tarefa',
  colResponsavel: 'Responsável',
  colPrioridade: 'Prioridade',
  colSituacao: 'Situação',
  colPrazo: 'Prazo',
  checklist: 'Checklist',
  venceHojeChip: 'Vence hoje',
  prioLow: 'Baixa',
  prioMedium: 'Média',
  prioHigh: 'Alta',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  carregando: 'Carregando…',
  carregandoTarefas: 'Carregando as tarefas da equipe…',
  semTarefas: 'Nenhuma tarefa encontrada com esses filtros.',
  carregarMais: 'Carregar mais tarefas',
  erroTitulo: 'Não foi possível carregar o quadro da equipe',
  erroPrecondicao: 'Esta tela foi aberta sem as informações de que precisa. Volte para a tela anterior e abra o quadro novamente.',
  voltar: 'Voltar',
  tentarNovamente: 'Tentar novamente',
  detalheTitulo: 'Detalhe da tarefa',
  fecharDetalhe: 'Fechar detalhe',
  vazioTexto: 'Escolha uma tarefa no quadro para ver o detalhe, o histórico e as ações do gestor.',
  carregandoDetalhe: 'Abrindo a tarefa…',
  erroDetalhe: 'Não foi possível abrir esta tarefa.',
  criadoPor: 'Criada por',
  responsavel: 'Responsável',
  prazo: 'Prazo',
  situacao: 'Situação',
  prioridade: 'Prioridade',
  subtarefas: 'Subtarefas',
  progressoChecklist: 'Progresso da checklist',
  criadaEm: 'Criada em',
  descricao: 'Descrição',
  motivoDevolucao: 'Motivo da devolução',
  colItem: 'Item',
  colFeito: 'Feito',
  feito: 'Feito',
  pendente: 'Pendente',
  checklistVazia: 'Esta tarefa não tem itens na checklist.',
  acoesTitulo: 'Ações do gestor',
  novoResponsavel: 'Novo responsável',
  novoResponsavelDica: 'Só membros ativos podem receber a tarefa; a pessoa escolhida passa a agir e é avisada.',
  buscarMembro: 'Buscar pelo nome',
  nenhumMembro: 'Nenhum membro encontrado',
  reatribuir: 'Trocar responsável',
  cancelarTarefa: 'Cancelar tarefa',
  tarefaEncerrada: 'Esta tarefa está encerrada e não aceita mais ações.',
  reatribuidaOk: 'Responsável trocado. O novo responsável foi avisado.',
  canceladaOk: 'Tarefa cancelada.',
  confirmarTitulo: 'Confirmar cancelamento',
  confirmarMensagem: 'A tarefa abaixo será cancelada e não poderá mais mudar de situação:',
  manterTarefa: 'Manter tarefa',
  historicoTitulo: 'Histórico',
  evCriada: 'Tarefa criada por',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Tarefa concluída',
  evCancelada: 'Tarefa cancelada',
  semData: '—'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type ModalEl = HTMLElement & { visible: boolean };

const lang = () => document.documentElement.lang || undefined;

function fmtDate(value: string | null | undefined): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function fmtDateTime(value: string | null | undefined): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function toPrioridade(v: string | null): Prioridade | null {
  return v === 'low' || v === 'medium' || v === 'high' ? v : null;
}

function toStatus(v: string | null): StatusTarefa | null {
  return v === 'aFazer' || v === 'emAndamento' || v === 'emRevisao' || v === 'concluida' || v === 'cancelada' ? v : null;
}

function chipClass(status: string): string {
  const tone: Record<string, string> = {
    aFazer: 'neutral',
    emAndamento: 'info',
    emRevisao: 'warning',
    concluida: 'success',
    cancelada: 'neutral'
  };
  const t = tone[status] || 'neutral';
  return `bg-[var(--status-${t}-bg,transparent)] text-[var(--status-${t}-text,currentColor)]`;
}

@customElement('tarefas--web--desktop--page11--tarefas_equipe-102047')
export class TarefasDesktopPage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: string): string {
    const map: Record<string, string> = {
      aFazer: this.msg.stAFazer,
      emAndamento: this.msg.stEmAndamento,
      emRevisao: this.msg.stEmRevisao,
      concluida: this.msg.stConcluida,
      cancelada: this.msg.stCancelada
    };
    return map[s] || s;
  }

  private prioLabel(p: string): string {
    const map: Record<string, string> = { low: this.msg.prioLow, medium: this.msg.prioMedium, high: this.msg.prioHigh };
    return map[p] || p;
  }

  private chip(status: string) {
    return html`<span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${chipClass(status)}">${this.statusLabel(status)}</span>`;
  }

  private openModal() {
    const el = this.renderRoot.querySelector<ModalEl>('#modal-cancelar');
    if (el) el.visible = true;
  }

  private closeModal() {
    const el = this.renderRoot.querySelector<ModalEl>('#modal-cancelar');
    if (el) el.visible = false;
  }

  private renderFiltros() {
    const m = this.msg;
    return html`
      <div class="flex flex-wrap items-end gap-3 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <groupselectone--ml-select-dropdown class="w-48" .value=${this.listaId ?? 'todas'}
          @change=${(e: CustomEvent<{ value: string | null }>) => { void this.filtrarTarefasEquipe({ listaId: e.detail.value === 'todas' ? null : e.detail.value }); }}>
          <Label>${m.filtroLista}</Label>
          <Item value="todas">${m.todas}</Item>
          ${this.listas.map(l => html`<Item value=${l.id}>${l.nome}</Item>`)}
        </groupselectone--ml-select-dropdown>
        <groupselectone--ml-select-dropdown class="w-48" .value=${this.responsavelId ?? 'todos'}
          @change=${(e: CustomEvent<{ value: string | null }>) => { void this.filtrarTarefasEquipe({ responsavelId: e.detail.value === 'todos' ? null : e.detail.value }); }}>
          <Label>${m.filtroResponsavel}</Label>
          <Item value="todos">${m.todos}</Item>
          ${this.membros.map(p => html`<Item value=${p.id}>${p.details.identification.name}</Item>`)}
        </groupselectone--ml-select-dropdown>
        <groupselectone--ml-select-dropdown class="w-40" .value=${this.prioridade ?? 'todas'}
          @change=${(e: CustomEvent<{ value: string | null }>) => { void this.filtrarTarefasEquipe({ prioridade: toPrioridade(e.detail.value) }); }}>
          <Label>${m.filtroPrioridade}</Label>
          <Item value="todas">${m.todas}</Item>
          <Item value="high">${m.prioHigh}</Item>
          <Item value="medium">${m.prioMedium}</Item>
          <Item value="low">${m.prioLow}</Item>
        </groupselectone--ml-select-dropdown>
        <groupselectone--ml-select-dropdown class="w-44" .value=${this.status ?? 'todas'}
          @change=${(e: CustomEvent<{ value: string | null }>) => { void this.filtrarTarefasEquipe({ status: toStatus(e.detail.value) }); }}>
          <Label>${m.filtroSituacao}</Label>
          <Item value="todas">${m.todas}</Item>
          <Item value="aFazer">${m.stAFazer}</Item>
          <Item value="emAndamento">${m.stEmAndamento}</Item>
          <Item value="emRevisao">${m.stEmRevisao}</Item>
          <Item value="concluida">${m.stConcluida}</Item>
          <Item value="cancelada">${m.stCancelada}</Item>
        </groupselectone--ml-select-dropdown>
        <groupenterdateinterval--ml-date-range-dual-calendar
          .startDate=${this.prazoDe}
          .endDate=${this.prazoAte}
          locale=${document.documentElement.lang || 'pt-BR'}
          @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => { void this.filtrarTarefasEquipe({ prazoDe: e.detail.startDate, prazoAte: e.detail.endDate }); }}>
          <Label>${m.filtroPrazo}</Label>
          <LabelStart>${m.prazoDe}</LabelStart>
          <LabelEnd>${m.prazoAte}</LabelEnd>
        </groupenterdateinterval--ml-date-range-dual-calendar>
        <div class="flex items-center gap-2 pb-0.5">
          <grouptriggeraction--ml-button-standard size="sm" aria-pressed=${this.venceHoje ? 'true' : 'false'}
            data-variant=${this.venceHoje ? 'primary' : 'secondary'}
            @action=${() => { void this.filtrarTarefasEquipe({ venceHoje: this.venceHoje ? null : true }); }}>
            <Label>${m.venceHoje}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard size="sm" aria-pressed=${this.atrasada ? 'true' : 'false'}
            data-variant=${this.atrasada ? 'primary' : 'secondary'}
            @action=${() => { void this.filtrarTarefasEquipe({ atrasada: this.atrasada ? null : true }); }}>
            <Label>${m.atrasadas}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard size="sm" data-variant="ghost"
            @action=${() => { void this.limparFiltrosTarefasEquipe(); }}>
            <Label>${m.limparFiltros}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  private renderQuadro() {
    const m = this.msg;
    const items = this.tarefas?.items ?? [];
    const idx = items.findIndex(t => t.id === this.selectedTarefa);
    return html`
      <div class="flex flex-col gap-3">
        <groupviewtable--ml-advanced-data-table
          .value=${idx >= 0 ? String(idx) : ''}
          .loading=${this.pageStatus === 'loading'}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const t = items[e.detail.index];
            if (t) {
              void this.obterTarefa(t.id);
              this.setScenario('detalhe');
            }
          }}>
          <TableHeader>
            <TableRow>
              <TableHead key="tarefa">${m.colTarefa}</TableHead>
              <TableHead key="responsavel">${m.colResponsavel}</TableHead>
              <TableHead key="prioridade">${m.colPrioridade}</TableHead>
              <TableHead key="situacao">${m.colSituacao}</TableHead>
              <TableHead key="prazo">${m.colPrazo}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map(t => html`
              <TableRow key=${t.id}>
                <TableCell>
                  <div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
                  <div class="text-xs text-[var(--text-muted,currentColor)]">${t.lista.nome} · ${m.checklist} ${t.details.progressoChecklist}</div>
                </TableCell>
                <TableCell>${t.responsavel.details.identification.name}</TableCell>
                <TableCell><span class=${t.prioridade === 'high' ? 'font-semibold text-[var(--text-strong,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}>${this.prioLabel(t.prioridade)}</span></TableCell>
                <TableCell>${this.chip(t.status)}</TableCell>
                <TableCell>
                  <div class="text-right whitespace-nowrap">
                    <span class=${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : 'text-[var(--text-default,currentColor)]'}>${fmtDate(t.prazo)}</span>
                    ${t.details.venceHoje ? html`<span class="ml-1 inline-block rounded-full px-2 py-0.5 text-xs bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${m.venceHojeChip}</span>` : nothing}
                  </div>
                </TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.semTarefas}</div></Empty>
          <Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.carregandoTarefas}</div></Loading>
        </groupviewtable--ml-advanced-data-table>
        ${this.tarefas?.hasMore ? html`
          <div class="flex justify-center">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm"
              ?loading=${this.listarTarefasEquipeStatus === 'loading'}
              @action=${() => { if (this.tarefas) void this.listarTarefasEquipe(this.tarefas.page + 1, true); }}>
              <Label>${m.carregarMais}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}
      </div>`;
  }

  private renderResumo() {
    const t = this.tarefa;
    const m = this.msg;
    if (!t) return nothing;
    const row = (label: string, value: unknown) => html`
      <div class="flex justify-between gap-3 py-1 border-b border-[var(--border-subtle,currentColor)]">
        <dt class="text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="text-right text-[var(--text-default,currentColor)]">${value}</dd>
      </div>`;
    return html`
      <groupviewcard--ml-vertical-card>
        <CardHeader>
          <CardTitle>${t.titulo}</CardTitle>
          <CardDescription>${t.details.descricao ?? ''}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl class="text-sm">
            ${row(m.situacao, this.chip(t.status))}
            ${row(m.prioridade, this.prioLabel(t.prioridade))}
            ${row(m.prazo, fmtDate(t.prazo))}
            ${row(m.responsavel, t.responsavel.details.identification.name)}
            ${row(m.criadoPor, t.criador.details.identification.name)}
            ${row(m.subtarefas, t.details.quantidadeSubtarefas)}
            ${row(m.progressoChecklist, t.details.progressoChecklist)}
            ${row(m.criadaEm, fmtDateTime(t.criadaEm))}
            ${t.details.motivoDevolucao ? row(m.motivoDevolucao, t.details.motivoDevolucao) : nothing}
          </dl>
        </CardContent>
      </groupviewcard--ml-vertical-card>
      <section class="mt-4">
        <h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.checklist}</h3>
        <groupviewdata--ml-vertical-record-list>
          <Columns>
            <Column field="feito" header=${m.colFeito} width="90px" />
            <Column field="item" header=${m.colItem} />
          </Columns>
          <Rows>
            ${t.itensChecklist.map(i => html`
              <Row>
                <Cell><span class=${i.feito ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}>${i.feito ? m.feito : m.pendente}</span></Cell>
                <Cell>${i.details.descricao}</Cell>
              </Row>`)}
          </Rows>
          <Empty><div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${m.checklistVazia}</div></Empty>
        </groupviewdata--ml-vertical-record-list>
      </section>`;
  }

  private renderAcoes() {
    const t = this.tarefa;
    const m = this.msg;
    if (!t) return nothing;
    if (!t.details.aberta) {
      return html`<p class="mt-4 text-sm text-[var(--text-muted,currentColor)]">${m.tarefaEncerrada}</p>`;
    }
    const draft = this.reatribuirTarefaDraft;
    const reLoading = this.reatribuirTarefaStatus === 'loading';
    const caLoading = this.cancelarTarefaStatus === 'loading';
    return html`
      <section class="mt-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3 flex flex-col gap-3">
        <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.acoesTitulo}</h3>
        <groupselectone--ml-select-one-autocomplete
          .value=${draft.responsavelId}
          placeholder=${m.buscarMembro}
          ?disabled=${reLoading || caLoading}
          @change=${(e: CustomEvent<{ value: string | null }>) => this.setReatribuirTarefaDraft({ ...draft, responsavelId: e.detail.value })}>
          <Label>${m.novoResponsavel}</Label>
          <Helper>${m.novoResponsavelDica}</Helper>
          ${this.membros.map(p => html`<Item value=${p.id} ?disabled=${p.details.identification.status !== 'Active'}>${p.details.identification.name}</Item>`)}
          <Empty>${m.nenhumMembro}</Empty>
        </groupselectone--ml-select-one-autocomplete>
        <div aria-live="polite" class="flex flex-col gap-2">
          <groupnotifyuser--ml-contextual-feedback type="success" .dismissible=${false} .visible=${this.reatribuirTarefaStatus === 'success'}>
            <Message>${m.reatribuidaOk}</Message>
          </groupnotifyuser--ml-contextual-feedback>
          <groupnotifyuser--ml-contextual-feedback type="success" .dismissible=${false} .visible=${this.cancelarTarefaStatus === 'success'}>
            <Message>${m.canceladaOk}</Message>
          </groupnotifyuser--ml-contextual-feedback>
          <groupnotifyuser--ml-contextual-feedback type="error" .dismissible=${false} .visible=${this.reatribuirTarefaStatus === 'error'}>
            <Message>${this.reatribuirTarefaError?.message ?? ''}</Message>
          </groupnotifyuser--ml-contextual-feedback>
          <groupnotifyuser--ml-contextual-feedback type="error" .dismissible=${false} .visible=${this.cancelarTarefaStatus === 'error'}>
            <Message>${this.cancelarTarefaError?.message ?? ''}</Message>
          </groupnotifyuser--ml-contextual-feedback>
        </div>
        <div class="flex flex-wrap gap-2">
          <grouptriggeraction--ml-button-standard data-variant="primary"
            ?loading=${reLoading}
            ?disabled=${!draft.responsavelId || draft.responsavelId === t.responsavelId || caLoading}
            @action=${() => { void this.reatribuirTarefa(); }}>
            <Label>${m.reatribuir}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="secondary"
            ?loading=${caLoading}
            ?disabled=${reLoading}
            @action=${() => this.openModal()}>
            <Label>${m.cancelarTarefa}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
      <groupnotifyuser--ml-alert-modal id="modal-cancelar" type="danger" position="center" .dismissible=${true}
        @dismiss=${() => this.closeModal()}>
        <Title>${m.confirmarTitulo}</Title>
        <Message>${m.confirmarMensagem} <strong>${t.titulo}</strong></Message>
        <Action>
          <div class="flex gap-2">
            <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.closeModal()}>
              <Label>${m.manterTarefa}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard data-variant="danger"
              @action=${() => { this.closeModal(); void this.cancelarTarefa(); }}>
              <Label>${m.cancelarTarefa}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </Action>
      </groupnotifyuser--ml-alert-modal>`;
  }

  private renderHistorico() {
    const t = this.tarefa;
    const m = this.msg;
    if (!t) return nothing;
    const events: Array<{ when: string; what: unknown }> = [
      { when: fmtDateTime(t.criadaEm), what: html`${m.evCriada} ${t.criador.details.identification.name}` }
    ];
    if (t.details.devolvidaEm) {
      events.push({
        when: fmtDateTime(t.details.devolvidaEm),
        what: html`${m.evDevolvida}${t.details.motivoDevolucao ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${t.details.motivoDevolucao}</div>` : nothing}`
      });
    }
    if (t.details.concluidaEm) events.push({ when: fmtDateTime(t.details.concluidaEm), what: m.evConcluida });
    if (t.details.canceladaEm) events.push({ when: fmtDateTime(t.details.canceladaEm), what: m.evCancelada });
    return html`
      <section class="mt-4">
        <h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.historicoTitulo}</h3>
        <groupviewdata--ml-timeline-view>
          <Columns>
            <Column field="quando" header=${m.criadaEm} />
            <Column field="evento" header=${m.historicoTitulo} />
          </Columns>
          <Rows>
            ${events.map(ev => html`<Row><Cell>${ev.when}</Cell><Cell>${ev.what}</Cell></Row>`)}
          </Rows>
        </groupviewdata--ml-timeline-view>
      </section>`;
  }

  private renderPainel() {
    const m = this.msg;
    const loading = this.obterTarefaStatus === 'loading';
    const failed = this.obterTarefaStatus === 'error';
    return html`
      <molecules--ml-scenary-102020 mode="scenary" backLabel=${m.fecharDetalhe}
        .value=${this.scenary || (this.selectedTarefa !== null ? 'detalhe' : 'vazio')}
        @change=${(e: CustomEvent<{ value: string }>) => {
          if (e.target === e.currentTarget) {
            this.setScenario(e.detail.value);
            if (e.detail.value === 'vazio') void this.obterTarefa(null);
          }
        }}>
        <Scene value="vazio" title=${m.detalheTitulo}>
          <p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m.vazioTexto}</p>
        </Scene>
        <Scene value="detalhe" title=${m.detalheTitulo} nav="back" backTo="vazio">
          <div class="flex flex-col" aria-busy=${loading ? 'true' : 'false'}>
            <div data-organism-id="detalheTarefa">
              ${loading ? html`<p class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${m.carregandoDetalhe}</p>` : nothing}
              ${failed ? html`
                <div class="py-4 flex flex-col gap-2 items-start" aria-live="polite">
                  <p class="text-sm text-[var(--text-default,currentColor)]">${this.obterTarefaError?.message || m.erroDetalhe}</p>
                  <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm"
                    @action=${() => { void this.obterTarefa(this.selectedTarefa); }}>
                    <Label>${m.tentarNovamente}</Label>
                  </grouptriggeraction--ml-button-standard>
                </div>` : nothing}
              ${!loading && !failed ? this.renderResumo() : nothing}
            </div>
            <div data-organism-id="acoesGestor">${!loading && !failed ? this.renderAcoes() : nothing}</div>
            <div data-organism-id="historicoTarefa">${!loading && !failed ? this.renderHistorico() : nothing}</div>
          </div>
        </Scene>
      </molecules--ml-scenary-102020>`;
  }

  private renderErro() {
    const m = this.msg;
    const err = this.carregarOpcoesEquipeError ?? this.listarTarefasEquipeError;
    const precond = err?.code === 'client.preconditionMissing';
    return html`
      <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-6 flex flex-col gap-3 items-start" aria-live="polite">
        <h2 class="font-semibold text-[var(--status-error-text,currentColor)]">${m.erroTitulo}</h2>
        <p class="text-sm text-[var(--status-error-text,currentColor)]">${precond ? m.erroPrecondicao : (err?.message ?? '')}</p>
        <div class="flex gap-2">
          ${precond ? html`
            <grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => history.back()}>
              <Label>${m.voltar}</Label>
            </grouptriggeraction--ml-button-standard>` : html`
            <grouptriggeraction--ml-button-standard data-variant="primary"
              @action=${() => { void this.carregarOpcoesEquipe(); void this.listarTarefasEquipe(); }}>
              <Label>${m.tentarNovamente}</Label>
            </grouptriggeraction--ml-button-standard>`}
        </div>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full p-6 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="mb-4">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
        </header>
        ${this.pageStatus === 'error' ? this.renderErro() : html`
          <div class="grid gap-6 items-start" style="grid-template-columns: minmax(0, 1fr) 28rem;">
            <div data-organism-id="tarefasEquipe" class="flex flex-col gap-3 min-w-0">
              ${this.renderFiltros()}
              ${this.renderQuadro()}
            </div>
            <aside class="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
              ${this.renderPainel()}
            </aside>
          </div>`}
      </div>`;
  }
}
