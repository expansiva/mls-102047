/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { TarefaDetalhe, Prioridade, StatusTarefa } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-interval-presets.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
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
  sceneQuadro: 'Tarefas da equipe',
  sceneTarefa: 'Detalhe da tarefa',
  back: 'Voltar às tarefas',
  filtros: 'Filtros',
  filtroLista: 'Lista',
  filtroResponsavel: 'Responsável',
  filtroPrioridade: 'Prioridade',
  filtroSituacao: 'Situação',
  filtroPrazo: 'Período do prazo',
  prazoDe: 'De',
  prazoAte: 'Até',
  todas: 'Todas',
  todos: 'Todos',
  escolher: 'Escolher',
  limparFiltros: 'Limpar filtros',
  chipAtrasadas: 'Atrasadas',
  chipVenceHoje: 'Vencem hoje',
  prio_low: 'Baixa',
  prio_medium: 'Média',
  prio_high: 'Alta',
  status_aFazer: 'A fazer',
  status_emAndamento: 'Em andamento',
  status_emRevisao: 'Em revisão',
  status_concluida: 'Concluída',
  status_cancelada: 'Cancelada',
  colTarefa: 'Tarefa',
  colPrazo: 'Prazo',
  colResponsavel: 'Responsável',
  colSituacao: 'Situação',
  colPrioridade: 'Prioridade',
  venceHojeTag: 'Vence hoje',
  atrasadaSr: 'Atrasada.',
  carregando: 'Carregando tarefas…',
  atualizando: 'Atualizando a lista…',
  vazio: 'Nenhuma tarefa encontrada com estes filtros.',
  carregarMais: 'Carregar mais tarefas',
  erroLista: 'Não foi possível carregar as tarefas da equipe.',
  tentarNovamente: 'Tentar de novo',
  precondicao: 'Esta tela foi aberta sem o que precisa para mostrar as tarefas da equipe. Volte para a tela anterior e abra de novo.',
  voltarTela: 'Voltar à tela anterior',
  carregandoDetalhe: 'Abrindo a tarefa…',
  erroDetalhe: 'Não foi possível abrir esta tarefa.',
  descricao: 'Descrição',
  motivoDevolucao: 'Motivo da devolução',
  criadaPor: 'Criada por',
  responsavel: 'Responsável',
  prazo: 'Prazo',
  situacao: 'Situação',
  prioridade: 'Prioridade',
  subtarefas: 'Subtarefas',
  checklist: 'Checklist',
  criadaEm: 'Criada em',
  checklistVazia: 'Esta tarefa não tem itens na checklist.',
  itemFeito: 'Feito',
  itemPendente: 'Pendente',
  colItem: 'Item',
  colFeito: 'Feito',
  acoes: 'Ações do gestor',
  novoResponsavel: 'Novo responsável',
  escolherPessoa: 'Escolha uma pessoa da equipe',
  semPessoa: 'Nenhuma pessoa encontrada',
  indisponivel: '(indisponível)',
  trocarResponsavel: 'Trocar responsável',
  cancelarTarefa: 'Cancelar tarefa',
  erroReatribuir: 'Não foi possível trocar o responsável. Tente de novo.',
  erroCancelar: 'Não foi possível cancelar a tarefa. Tente de novo.',
  confirmaTitulo: 'Confirmar cancelamento',
  confirmaMsg: 'Cancelar a tarefa "{titulo}"? Depois disso ela não muda mais de situação.',
  confirmaSim: 'Sim, cancelar a tarefa',
  confirmaNao: 'Manter a tarefa',
  toastReatribuida: 'Responsável trocado. A pessoa foi avisada.',
  toastCancelada: 'A tarefa foi cancelada.',
  encerrada: 'Esta tarefa está encerrada e não aceita mais ações.',
  historico: 'Histórico da tarefa',
  colQuando: 'Quando',
  colEvento: 'Evento',
  evCriada: 'Tarefa criada',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Concluída',
  evCancelada: 'Cancelada',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const TODOS = '__todos';

function lang() {
  return document.documentElement.lang || undefined;
}

function formatDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function statusChipClass(s: string) {
  switch (s) {
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

function setModal(e: Event, visible: boolean) {
  const modal = (e.currentTarget as HTMLElement)
    .closest('[data-organism-id="acoesGestor"]')
    ?.querySelector('groupnotifyuser--ml-alert-modal') as (HTMLElement & { visible: boolean }) | null;
  if (modal) modal.visible = visible;
}

function goBack() {
  window.history.back();
}

@customElement('tarefas--web--mobile--page11--tarefas_equipe-102047')
export class TarefasMobilePage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private label(prefix: string, key: string) {
    return this.msg[(prefix + key) as keyof PageMessageType];
  }

  private chip(s: string) {
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusChipClass(s)}">${this.label('status_', s)}</span>`;
  }

  private filtroSelect(
    label: string,
    value: string | null,
    options: { value: string; label: string }[],
    allLabel: string,
    onPick: (v: string | null) => void,
  ) {
    return html`
      <groupselectone--ml-select
        .value=${value ?? TODOS}
        placeholder=${this.msg['escolher']}
        @change=${(e: CustomEvent<{ value: string | null }>) => onPick(e.detail.value === TODOS ? null : e.detail.value)}
      >
        <Label>${label}</Label>
        <Item value=${TODOS}>${allLabel}</Item>
        ${options.map((o) => html`<Item value=${o.value}>${o.label}</Item>`)}
      </groupselectone--ml-select>
    `;
  }

  private chipToggle(label: string, on: boolean, onClick: () => void) {
    const cls = on
      ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
      : 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]';
    return html`<button
      type="button"
      aria-pressed=${on ? 'true' : 'false'}
      class="min-h-[44px] flex-1 rounded-full border px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${cls}"
      @click=${onClick}
    >${label}</button>`;
  }

  private renderFiltros() {
    const prioridades: Prioridade[] = ['low', 'medium', 'high'];
    const situacoes: StatusTarefa[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
    return html`
      <details class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <summary class="flex min-h-[44px] cursor-pointer items-center px-4 font-medium text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['filtros']}</summary>
        <div class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] p-4">
          ${this.filtroSelect(
            this.msg['filtroLista'],
            this.listaId,
            this.listas.map((l) => ({ value: l.id, label: l.nome })),
            this.msg['todas'],
            (v) => this.filtrarTarefasEquipe({ listaId: v }),
          )}
          ${this.filtroSelect(
            this.msg['filtroResponsavel'],
            this.responsavelId,
            this.membros.map((m) => ({ value: m.id, label: m.details.identification.name })),
            this.msg['todos'],
            (v) => this.filtrarTarefasEquipe({ responsavelId: v }),
          )}
          ${this.filtroSelect(
            this.msg['filtroPrioridade'],
            this.prioridade,
            prioridades.map((p) => ({ value: p, label: this.label('prio_', p) })),
            this.msg['todas'],
            (v) => this.filtrarTarefasEquipe({ prioridade: v as Prioridade | null }),
          )}
          ${this.filtroSelect(
            this.msg['filtroSituacao'],
            this.status,
            situacoes.map((s) => ({ value: s, label: this.label('status_', s) })),
            this.msg['todas'],
            (v) => this.filtrarTarefasEquipe({ status: v as StatusTarefa | null }),
          )}
          <groupenterdateinterval--ml-date-interval-presets
            .startDate=${this.prazoDe}
            .endDate=${this.prazoAte}
            locale="pt-BR"
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) =>
              this.filtrarTarefasEquipe({ prazoDe: e.detail.startDate, prazoAte: e.detail.endDate })}
          >
            <Label>${this.msg['filtroPrazo']}</Label>
            <LabelStart>${this.msg['prazoDe']}</LabelStart>
            <LabelEnd>${this.msg['prazoAte']}</LabelEnd>
          </groupenterdateinterval--ml-date-interval-presets>
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="lg"
            data-class="w-full"
            @action=${() => this.limparFiltrosTarefasEquipe()}
          >
            <Label>${this.msg['limparFiltros']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </details>
    `;
  }

  private renderLista() {
    const items = this.tarefas?.items ?? [];
    const idx = items.findIndex((i) => i.id === this.selectedTarefa);
    const loadingMore = this.listarTarefasEquipeStatus === 'loading';
    return html`
      <div class="flex gap-2">
        ${this.chipToggle(this.msg['chipAtrasadas'], this.atrasada === true, () =>
          this.filtrarTarefasEquipe({ atrasada: this.atrasada ? null : true }),
        )}
        ${this.chipToggle(this.msg['chipVenceHoje'], this.venceHoje === true, () =>
          this.filtrarTarefasEquipe({ venceHoje: this.venceHoje ? null : true }),
        )}
      </div>
      ${this.renderFiltros()}
      <p class="min-h-[1rem] text-xs text-[var(--text-muted,currentColor)]" aria-live="polite">
        ${loadingMore && this.pageStatus !== 'loading' ? this.msg['atualizando'] : ''}
      </p>
      <groupviewtable--ml-responsive-table
        .value=${idx >= 0 ? String(idx) : ''}
        .loading=${this.pageStatus === 'loading'}
        @rowClick=${(e: CustomEvent<{ index: number }>) => {
          const item = items[e.detail.index];
          if (item) {
            this.obterTarefa(item.id);
            this.setScenario('tarefa');
          }
        }}
      >
        <TableHeader>
          <TableRow>
            <TableHead key="titulo">${this.msg['colTarefa']}</TableHead>
            <TableHead key="prazo">${this.msg['colPrazo']}</TableHead>
            <TableHead key="responsavel">${this.msg['colResponsavel']}</TableHead>
            <TableHead key="status">${this.msg['colSituacao']}</TableHead>
            <TableHead key="prioridade">${this.msg['colPrioridade']}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          ${items.map(
            (t) => html`
              <TableRow key=${t.id}>
                <TableCell>
                  <div class="flex flex-col gap-0.5">
                    <span class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
                    <span class="text-xs text-[var(--text-muted,currentColor)]">${t.lista.nome} · ${this.msg['checklist']} ${t.details.progressoChecklist}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class=${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}>${formatDate(t.prazo)}${t.details.atrasada ? html`<span class="sr-only"> ${this.msg['atrasadaSr']}</span>` : nothing}</span>
                    ${t.details.venceHoje
                      ? html`<span class="rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['venceHojeTag']}</span>`
                      : nothing}
                  </div>
                </TableCell>
                <TableCell>${t.responsavel.details.identification.name}</TableCell>
                <TableCell>${this.chip(t.status)}</TableCell>
                <TableCell><span class=${t.prioridade === 'high' ? 'font-semibold' : ''}>${this.label('prio_', t.prioridade)}</span></TableCell>
              </TableRow>
            `,
          )}
        </TableBody>
        <Empty>
          <div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['vazio']}</div>
        </Empty>
        <Loading>
          <div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['carregando']}</div>
        </Loading>
      </groupviewtable--ml-responsive-table>
      ${this.tarefas?.hasMore
        ? html`<grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="lg"
            data-class="w-full"
            .loading=${loadingMore}
            @action=${() => this.listarTarefasEquipe((this.tarefas?.page ?? 1) + 1, true)}
          >
            <Label>${this.msg['carregarMais']}</Label>
          </grouptriggeraction--ml-button-standard>`
        : nothing}
    `;
  }

  private renderQuadro() {
    const precondicao =
      this.listarTarefasEquipeError?.code === 'client.preconditionMissing' ||
      this.carregarOpcoesEquipeError?.code === 'client.preconditionMissing';
    return html`
      <section data-organism-id="tarefasEquipe" class="flex flex-col gap-3" aria-busy=${this.pageStatus === 'loading' ? 'true' : 'false'}>
        ${this.pageStatus === 'error'
          ? html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
              <p class="text-[var(--text-default,currentColor)]">${precondicao ? this.msg['precondicao'] : this.msg['erroLista']}</p>
              ${precondicao
                ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${goBack}>
                    <Label>${this.msg['voltarTela']}</Label>
                  </grouptriggeraction--ml-button-standard>`
                : html`<grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.listarTarefasEquipe()}>
                    <Label>${this.msg['tentarNovamente']}</Label>
                  </grouptriggeraction--ml-button-standard>`}
            </div>`
          : this.renderLista()}
      </section>
    `;
  }

  private dt(label: string, value: unknown) {
    return html`<div class="flex flex-col gap-0.5">
      <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
      <dd class="text-sm text-[var(--text-strong,currentColor)]">${value}</dd>
    </div>`;
  }

  private renderDetalhe(t: TarefaDetalhe) {
    return html`
      <section data-organism-id="detalheTarefa" class="flex flex-col gap-3">
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
            <CardDescription>${this.chip(t.status)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-4">
              ${t.details.descricao
                ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${t.details.descricao}</p>`
                : nothing}
              ${t.details.motivoDevolucao
                ? html`<div class="rounded-md bg-[var(--status-warning-bg,transparent)] p-3 text-sm text-[var(--status-warning-text,currentColor)]">
                    <span class="font-medium">${this.msg['motivoDevolucao']}:</span> ${t.details.motivoDevolucao}
                  </div>`
                : nothing}
              <dl class="grid grid-cols-2 gap-3">
                ${this.dt(this.msg['prazo'], formatDate(t.prazo))}
                ${this.dt(this.msg['prioridade'], this.label('prio_', t.prioridade))}
                ${this.dt(this.msg['responsavel'], t.responsavel.details.identification.name)}
                ${this.dt(this.msg['criadaPor'], t.criador.details.identification.name)}
                ${this.dt(this.msg['subtarefas'], t.details.quantidadeSubtarefas)}
                ${this.dt(this.msg['checklist'], t.details.progressoChecklist)}
              </dl>
              <groupviewdata--ml-vertical-record-list>
                <Columns>
                  <Column field="feito" header=${this.msg['colFeito']} width="56px"></Column>
                  <Column field="descricao" header=${this.msg['colItem']}></Column>
                </Columns>
                <Rows>
                  ${t.itensChecklist.map(
                    (i) => html`<Row>
                      <Cell><span aria-hidden="true">${i.feito ? '✓' : '○'}</span><span class="sr-only">${i.feito ? this.msg['itemFeito'] : this.msg['itemPendente']}</span></Cell>
                      <Cell><span class=${i.feito ? 'text-[var(--text-muted,currentColor)] line-through' : ''}>${i.details.descricao}</span></Cell>
                    </Row>`,
                  )}
                </Rows>
                <Empty><div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['checklistVazia']}</div></Empty>
              </groupviewdata--ml-vertical-record-list>
            </div>
          </CardContent>
          <CardFooter>
            <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['criadaEm']} ${formatDateTime(t.criadaEm)}</span>
          </CardFooter>
        </groupviewcard--ml-vertical-card>
      </section>
    `;
  }

  private renderAcoes(t: TarefaDetalhe) {
    const draft = this.reatribuirTarefaDraft;
    const reatribuindo = this.reatribuirTarefaStatus === 'loading';
    const cancelando = this.cancelarTarefaStatus === 'loading';
    return html`
      <section data-organism-id="acoesGestor" class="flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['acoes']}</h2>
        ${t.details.aberta
          ? html`
              <div class="flex flex-col gap-3">
                <groupselectone--ml-select-one-autocomplete
                  .value=${draft.responsavelId}
                  placeholder=${this.msg['escolherPessoa']}
                  .loading=${reatribuindo}
                  @change=${(e: CustomEvent<{ value: string | null }>) =>
                    this.setReatribuirTarefaDraft({ ...draft, responsavelId: e.detail.value })}
                >
                  <Label>${this.msg['novoResponsavel']}</Label>
                  ${this.membros.map(
                    (m) => html`<Item value=${m.id} ?disabled=${m.details.identification.status !== 'Active'}>${m.details.identification.name}${m.details.identification.status !== 'Active' ? ` ${this.msg['indisponivel']}` : ''}</Item>`,
                  )}
                  <Empty>${this.msg['semPessoa']}</Empty>
                </groupselectone--ml-select-one-autocomplete>
                ${this.reatribuirTarefaStatus === 'error'
                  ? html`<p role="alert" class="text-sm text-[var(--text-default,currentColor)]">${this.msg['erroReatribuir']}</p>`
                  : nothing}
                <grouptriggeraction--ml-button-standard
                  size="lg"
                  data-class="w-full"
                  .disabled=${draft.responsavelId === null || draft.responsavelId === t.responsavelId}
                  .loading=${reatribuindo}
                  @action=${() => this.reatribuirTarefa()}
                >
                  <Label>${this.msg['trocarResponsavel']}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
              <hr class="border-[var(--border-subtle,currentColor)]" />
              <div class="flex flex-col gap-3">
                ${this.cancelarTarefaStatus === 'error'
                  ? html`<p role="alert" class="text-sm text-[var(--text-default,currentColor)]">${this.msg['erroCancelar']}</p>`
                  : nothing}
                <grouptriggeraction--ml-button-standard
                  data-variant="danger"
                  size="lg"
                  data-class="w-full"
                  .loading=${cancelando}
                  @action=${(e: Event) => setModal(e, true)}
                >
                  <Label>${this.msg['cancelarTarefa']}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
              <groupnotifyuser--ml-alert-modal type="danger" .dismissible=${false}>
                <Title>${this.msg['confirmaTitulo']}</Title>
                <Message>${this.msg['confirmaMsg'].replace('{titulo}', t.titulo)}</Message>
                <Action>
                  <div class="flex w-full flex-col gap-2">
                    <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${(e: Event) => setModal(e, false)}>
                      <Label>${this.msg['confirmaNao']}</Label>
                    </grouptriggeraction--ml-button-standard>
                    <grouptriggeraction--ml-button-standard
                      data-variant="danger"
                      size="lg"
                      data-class="w-full"
                      @action=${(e: Event) => {
                        setModal(e, false);
                        this.cancelarTarefa();
                      }}
                    >
                      <Label>${this.msg['confirmaSim']}</Label>
                    </grouptriggeraction--ml-button-standard>
                  </div>
                </Action>
              </groupnotifyuser--ml-alert-modal>
            `
          : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['encerrada']}</p>`}
        <groupnotifyuser--ml-toast-notification type="success" position="bottom" .duration=${4000} .visible=${this.reatribuirTarefaStatus === 'success'}>
          <Message>${this.msg['toastReatribuida']}</Message>
        </groupnotifyuser--ml-toast-notification>
        <groupnotifyuser--ml-toast-notification type="success" position="bottom" .duration=${4000} .visible=${this.cancelarTarefaStatus === 'success'}>
          <Message>${this.msg['toastCancelada']}</Message>
        </groupnotifyuser--ml-toast-notification>
      </section>
    `;
  }

  private renderHistorico(t: TarefaDetalhe) {
    return html`
      <section data-organism-id="historicoTarefa">
        <details class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <summary class="flex min-h-[44px] cursor-pointer items-center px-4 font-semibold text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['historico']}</summary>
          <div class="border-t border-[var(--border-subtle,currentColor)] p-4">
            <groupviewdata--ml-timeline-view>
              <Columns>
                <Column field="quando" header=${this.msg['colQuando']}></Column>
                <Column field="evento" header=${this.msg['colEvento']}></Column>
              </Columns>
              <Rows>
                <Row>
                  <Cell>${formatDateTime(t.criadaEm)}</Cell>
                  <Cell>${this.msg['evCriada']}</Cell>
                </Row>
                ${t.details.devolvidaEm
                  ? html`<Row>
                      <Cell>${formatDateTime(t.details.devolvidaEm)}</Cell>
                      <Cell>${this.msg['evDevolvida']}${t.details.motivoDevolucao ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${t.details.motivoDevolucao}</div>` : nothing}</Cell>
                    </Row>`
                  : nothing}
                ${t.details.concluidaEm
                  ? html`<Row>
                      <Cell>${formatDateTime(t.details.concluidaEm)}</Cell>
                      <Cell>${this.msg['evConcluida']}</Cell>
                    </Row>`
                  : nothing}
                ${t.details.canceladaEm
                  ? html`<Row>
                      <Cell>${formatDateTime(t.details.canceladaEm)}</Cell>
                      <Cell>${this.msg['evCancelada']}</Cell>
                    </Row>`
                  : nothing}
              </Rows>
            </groupviewdata--ml-timeline-view>
          </div>
        </details>
      </section>
    `;
  }

  private renderTarefa() {
    const t = this.tarefa;
    if (this.obterTarefaStatus === 'loading' && t === null) {
      return html`<p class="py-8 text-center text-[var(--text-muted,currentColor)]" aria-live="polite" aria-busy="true">${this.msg['carregandoDetalhe']}</p>`;
    }
    if (this.obterTarefaStatus === 'error' || t === null) {
      return html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <p>${this.msg['erroDetalhe']}</p>
        ${this.selectedTarefa !== null
          ? html`<grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.obterTarefa(this.selectedTarefa)}>
              <Label>${this.msg['tentarNovamente']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      </div>`;
    }
    return html`
      <div class="flex flex-col gap-4">
        ${this.renderDetalhe(t)} ${this.renderAcoes(t)} ${this.renderHistorico(t)}
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || (this.selectedTarefa !== null ? 'tarefa' : 'quadro')}
          .backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'quadro') this.obterTarefa(null);
            }
          }}
        >
          <Scene value="quadro" title=${this.msg['sceneQuadro']}>
            <div class="mx-auto flex w-full max-w-[430px] flex-col gap-3 px-4 pb-8 pt-2">${this.renderQuadro()}</div>
          </Scene>
          <Scene value="tarefa" title=${this.msg['sceneTarefa']} nav="back" backTo="quadro">
            <div class="mx-auto flex w-full max-w-[430px] flex-col gap-3 px-4 pb-8 pt-2">${this.renderTarefa()}</div>
          </Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
