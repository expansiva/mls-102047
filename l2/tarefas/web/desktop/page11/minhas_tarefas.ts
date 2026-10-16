/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
  ErrorState,
  RequestStatus,
  TarefaStatus,
  TarefaPrioridade,
  TarefasFiltroChange,
  ItemChecklistDraft,
  SalvarNovaTarefaDraft,
  MembroNome,
  TarefaResumo,
  TarefaAberta,
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
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-group.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-advanced-data-table.js';

type Modo = 'nova' | 'editar';
type Campos = Pick<SalvarNovaTarefaDraft, 'listaId' | 'titulo' | 'details' | 'prioridade' | 'prazo' | 'responsavelId' | 'checklist'>;

const STRONG = 'text-[var(--text-strong,currentColor)]';
const MUTED = 'text-[var(--text-muted,currentColor)]';
const SURFACE = 'bg-[var(--surface-bg,transparent)] border border-[var(--border-default,currentColor)]';

const CHIP: Record<TarefaStatus, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};

const FILTROS: Record<string, TarefasFiltroChange> = {
  todas: { criadasPorMim: null, atribuidasAMim: null, status: null, somenteDevolvidas: null },
  criadas: { criadasPorMim: true, atribuidasAMim: null, status: null, somenteDevolvidas: null },
  atribuidas: { criadasPorMim: null, atribuidasAMim: true, status: null, somenteDevolvidas: null },
  revisao: { criadasPorMim: null, atribuidasAMim: null, status: 'emRevisao', somenteDevolvidas: null },
  devolvidas: { criadasPorMim: null, atribuidasAMim: null, status: null, somenteDevolvidas: true },
};

function lang() {
  return document.documentElement.lang || undefined;
}

function fmtDate(v: string | null | undefined) {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtDateTime(v: string | null | undefined) {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function nomeMembro(m: MembroNome | undefined) {
  return m?.details.identification.details.identification.name ?? '';
}

function textoEvento(e: Event): string | null {
  const d = (e as CustomEvent<{ value?: string }>).detail;
  return d && typeof d.value === 'string' ? d.value : null;
}

@customElement('tarefas--web--desktop--page11--minhas_tarefas-102047')
export class TarefasDesktopPage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const precondicao = this.minhasTarefasError?.code === 'client.preconditionMissing';
    return html`
      <div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6">
        <header class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold ${STRONG}">${this.msg['pageTitle']}</h1>
            <p class="mt-1 text-sm ${MUTED}">${this.msg['pageIntro']}</p>
          </div>
          ${this.botao(this.msg['novaTarefa'], 'primary', () => this.abrirNova())}
        </header>
        ${precondicao
          ? this.renderPrecondicao()
          : html`
              <div class="grid grid-cols-[minmax(0,1fr)_30rem] items-start gap-6">
                ${this.renderLista()}
                <aside class="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg p-4 ${SURFACE}">
                  ${this.renderPainel()}
                </aside>
              </div>
            `}
      </div>
    `;
  }

  // ---------- helpers ----------

  private botao(label: string, variant: string, onAction: () => void, loading = false, disabled = false) {
    return html`<grouptriggeraction--ml-button-group
      data-variant=${variant}
      size="md"
      .loading=${loading}
      .disabled=${disabled}
      @action=${onAction}
    >
      <Label>${label}</Label>
    </grouptriggeraction--ml-button-group>`;
  }

  private rotuloStatus(s: TarefaStatus) {
    const m: Record<TarefaStatus, string> = {
      aFazer: this.msg['stAFazer'],
      emAndamento: this.msg['stEmAndamento'],
      emRevisao: this.msg['stEmRevisao'],
      concluida: this.msg['stConcluida'],
      cancelada: this.msg['stCancelada'],
    };
    return m[s];
  }

  private rotuloPrioridade(p: TarefaPrioridade) {
    const m: Record<TarefaPrioridade, string> = { low: this.msg['prBaixa'], medium: this.msg['prMedia'], high: this.msg['prAlta'] };
    return m[p];
  }

  private chip(s: TarefaStatus) {
    return html`<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${CHIP[s]}">${this.rotuloStatus(s)}</span>`;
  }

  private filtroAtual() {
    if (this.criadasPorMim) return 'criadas';
    if (this.atribuidasAMim) return 'atribuidas';
    if (this.status === 'emRevisao') return 'revisao';
    if (this.somenteDevolvidas) return 'devolvidas';
    return 'todas';
  }

  private comandoOcupado() {
    return [
      this.iniciarTarefaStatus,
      this.marcarItemChecklistStatus,
      this.enviarParaRevisaoStatus,
      this.aceitarEntregaStatus,
      this.devolverComMotivoStatus,
      this.cancelarTarefaStatus,
    ].some((s) => s === 'loading');
  }

  private abrir(t: TarefaResumo | undefined) {
    if (!t) return;
    this.setScenario('detalhe');
    this.selectTarefa(t.id);
  }

  private abrirNova() {
    if (!this.listas.length) this.opcoesFormulario();
    this.setScenario('nova');
  }

  private abrirEdicao() {
    if (!this.listas.length) this.opcoesFormulario();
    this.restaurarSalvarEdicaoTarefaDraft();
    this.setScenario('editar');
  }

  // ---------- list ----------

  private renderPrecondicao() {
    return html`
      <div data-organism-id="tarefasLista" class="mx-auto max-w-xl rounded-lg p-6 ${SURFACE}" aria-live="polite">
        <p class="${STRONG}">${this.msg['precondicao']}</p>
        <div class="mt-4">${this.botao(this.msg['voltar'], 'secondary', () => history.back())}</div>
      </div>
    `;
  }

  private renderLista() {
    const items = this.tarefas?.items ?? [];
    const sel = items.findIndex((t) => t.id === this.selectedTarefa);
    const erro = this.minhasTarefasStatus === 'error' || this.pageStatus === 'error';
    return html`
      <section data-organism-id="tarefasLista" class="min-w-0 rounded-lg p-4 ${SURFACE}">
        <div class="mb-3" role="group" aria-label=${this.msg['filtrarTarefas']}>
          <groupnavigatesection--ml-navigate-pills
            .value=${this.filtroAtual()}
            @change=${(e: CustomEvent<{ value: string }>) => {
              const f = FILTROS[e.detail.value];
              if (f) this.minhasTarefas(f);
            }}
          >
            <Tab value="todas" title=${this.msg['fTodas']}></Tab>
            <Tab value="criadas" title=${this.msg['fCriadas']}></Tab>
            <Tab value="atribuidas" title=${this.msg['fAtribuidas']}></Tab>
            <Tab value="revisao" title=${this.msg['fRevisao']}></Tab>
            <Tab value="devolvidas" title=${this.msg['fDevolvidas']}></Tab>
          </groupnavigatesection--ml-navigate-pills>
        </div>
        ${erro
          ? html`<div class="mb-3 flex items-center justify-between gap-3 rounded-md p-3 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]" aria-live="polite">
              <span>${this.msg['erroLista']}</span>
              ${this.botao(this.msg['tentarNovamente'], 'secondary', () => this.minhasTarefas())}
            </div>`
          : nothing}
        <groupviewtable--ml-advanced-data-table
          .value=${sel >= 0 ? String(sel) : ''}
          .loading=${this.minhasTarefasStatus === 'loading'}
          @rowClick=${(e: CustomEvent<{ index: number }>) => this.abrir(items[e.detail.index])}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="titulo">${this.msg['colTarefa']}</TableHead>
              <TableHead key="responsavel">${this.msg['colResponsavel']}</TableHead>
              <TableHead key="prioridade">${this.msg['colPrioridade']}</TableHead>
              <TableHead key="prazo">${this.msg['colPrazo']}</TableHead>
              <TableHead key="situacao">${this.msg['colSituacao']}</TableHead>
              <TableHead key="checklist">${this.msg['colChecklist']}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map((t) => this.renderLinha(t))}
          </TableBody>
          <Empty><div class="py-8 text-center ${MUTED}">${this.msg['listaVazia']}</div></Empty>
          <Loading><div class="py-8 text-center ${MUTED}">${this.msg['listaCarregando']}</div></Loading>
        </groupviewtable--ml-advanced-data-table>
        ${this.tarefas?.hasMore
          ? html`<div class="mt-3 flex justify-center">
              ${this.botao(
                this.msg['carregarMais'],
                'secondary',
                () => this.minhasTarefas(undefined, (this.tarefas?.page ?? 1) + 1, true),
                this.minhasTarefasStatus === 'loading',
              )}
            </div>`
          : nothing}
      </section>
    `;
  }

  private renderLinha(t: TarefaResumo) {
    const d = t.details.details;
    return html`
      <TableRow key=${t.id}>
        <TableCell>
          <div class="font-medium ${STRONG}">${t.titulo}</div>
          <div class="text-xs ${MUTED}">
            ${t.lista.nome}${d.quantidadeSubtarefas ? html` · ${d.quantidadeSubtarefas} ${this.msg['subtarefas']}` : nothing}
          </div>
          ${d.devolvidaEm
            ? html`<span class="mt-1 inline-flex rounded-full px-2 py-0.5 text-xs bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]">${this.msg['devolvida']}</span>`
            : nothing}
        </TableCell>
        <TableCell>${nomeMembro(t.responsavel)}</TableCell>
        <TableCell><span class="${t.prioridade === 'high' ? 'font-semibold' : ''}">${this.rotuloPrioridade(t.prioridade)}</span></TableCell>
        <TableCell>
          <div class="${d.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}">${fmtDate(t.prazo)}</div>
          ${d.atrasada
            ? html`<div class="text-xs ${MUTED}">${this.msg['atrasada']}</div>`
            : d.venceHoje
              ? html`<div class="text-xs font-medium ${STRONG}">${this.msg['venceHoje']}</div>`
              : nothing}
        </TableCell>
        <TableCell>${this.chip(t.status)}</TableCell>
        <TableCell>${d.progressoChecklist}</TableCell>
      </TableRow>
    `;
  }

  // ---------- panel ----------

  private renderPainel() {
    return html`
      <molecules--ml-scenary-102020
        mode="scenary"
        .backLabel=${this.msg['voltarTarefa']}
        .value=${this.scenary || 'detalhe'}
        @change=${(e: CustomEvent<{ value: string }>) => {
          if (e.target === e.currentTarget) this.setScenario(e.detail.value);
        }}
      >
        <Scene value="detalhe" title=${this.msg['cenaDetalhe']}>${this.renderDetalhe()}</Scene>
        <Scene value="nova" title=${this.msg['cenaNova']} nav="back" backTo="detalhe">
          <div data-organism-id="tarefaForm">${this.renderForm('nova')}</div>
        </Scene>
        <Scene value="editar" title=${this.msg['cenaEditar']} nav="back" backTo="detalhe">
          <div data-organism-id="tarefaForm">${this.renderForm('editar')}</div>
        </Scene>
      </molecules--ml-scenary-102020>
    `;
  }

  private renderDetalhe() {
    const t = this.tarefa;
    const carregando = this.tarefaAbertaStatus === 'loading';
    const erro = this.tarefaAbertaStatus === 'error';
    return html`
      <div class="space-y-5">
        <div data-organism-id="tarefaDetalhe">
          ${carregando
            ? html`<p aria-busy="true" class="py-6 text-center ${MUTED}">${this.msg['carregandoTarefa']}</p>`
            : erro
              ? html`<p aria-live="polite" class="py-6 text-center text-[var(--status-error-text,currentColor)]">${this.msg['erroTarefa']}</p>`
              : t
                ? this.renderResumo(t)
                : html`<p class="py-6 text-center ${MUTED}">${this.msg['semSelecao']}</p>`}
        </div>
        <div data-organism-id="tarefaAcoes">${t && !carregando ? this.renderAcoes(t) : nothing}</div>
        <div data-organism-id="tarefaHistorico">${t && !carregando ? this.renderHistorico(t) : nothing}</div>
      </div>
    `;
  }

  private campo(rotulo: string, valor: unknown) {
    return html`<div><dt class="text-xs ${MUTED}">${rotulo}</dt><dd class="text-sm ${STRONG}">${valor}</dd></div>`;
  }

  private renderResumo(t: TarefaAberta) {
    const d = t.details.details;
    const encerrada = t.status === 'concluida' || t.status === 'cancelada';
    return html`
      <div class="space-y-4">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="text-lg font-semibold ${STRONG}">${t.titulo}</h3>
            <div class="mt-1 flex flex-wrap items-center gap-2">
              ${this.chip(t.status)}
              <span class="text-xs ${MUTED}">${this.msg['colPrioridade']}: ${this.rotuloPrioridade(t.prioridade)}</span>
            </div>
          </div>
          ${this.botao(this.msg['editarTarefa'], 'secondary', () => this.abrirEdicao())}
        </div>
        <dl class="grid grid-cols-2 gap-3">
          ${this.campo(this.msg['detLista'], t.lista.nome)}
          ${this.campo(this.msg['colPrazo'], fmtDate(t.prazo))}
          ${this.campo(this.msg['detCriador'], nomeMembro(t.criador))}
          ${this.campo(this.msg['colResponsavel'], nomeMembro(t.responsavel))}
          ${this.campo(this.msg['detCriadaEm'], fmtDateTime(t.criadaEm))}
          ${d.concluidaEm ? this.campo(this.msg['detConcluidaEm'], fmtDateTime(d.concluidaEm)) : nothing}
          ${d.canceladaEm ? this.campo(this.msg['detCanceladaEm'], fmtDateTime(d.canceladaEm)) : nothing}
        </dl>
        <div>
          <div class="text-xs ${MUTED}">${this.msg['detDescricao']}</div>
          <p class="whitespace-pre-line text-sm ${STRONG}">${d.descricao || this.msg['semDescricao']}</p>
        </div>
        ${d.motivoDevolucao
          ? html`<div class="rounded-md p-3 bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">
              <div class="text-xs font-semibold">${this.msg['detMotivo']}${d.devolvidaEm ? html` · ${fmtDateTime(d.devolvidaEm)}` : nothing}</div>
              <p class="mt-1 whitespace-pre-line text-sm">${d.motivoDevolucao}</p>
            </div>`
          : nothing}
        <div>
          <div class="mb-2 flex items-center justify-between">
            <h4 class="text-sm font-semibold ${STRONG}">${this.msg['detChecklist']}</h4>
            <span class="text-sm ${MUTED}">${d.progressoChecklist}</span>
          </div>
          ${t.checklist.length
            ? html`<ul class="space-y-1">
                ${t.checklist.map(
                  (i) => html`<li>
                    <groupenterboolean--ml-checkbox-preference
                      .value=${i.feito}
                      .disabled=${encerrada || this.marcarItemChecklistStatus === 'loading'}
                      @change=${(e: CustomEvent<{ value: boolean }>) => this.marcarItemChecklist(i.id, e.detail.value)}
                    >
                      <Label>${i.details.details.descricao}</Label>
                    </groupenterboolean--ml-checkbox-preference>
                  </li>`,
                )}
              </ul>`
            : html`<p class="text-sm ${MUTED}">${this.msg['checklistVazia']}</p>`}
        </div>
      </div>
    `;
  }

  private renderAcoes(t: TarefaAberta) {
    const ocupado = this.comandoOcupado();
    const sucessos: Array<[RequestStatus, keyof PageMessageType]> = [
      [this.iniciarTarefaStatus, 'okIniciar'],
      [this.enviarParaRevisaoStatus, 'okRevisao'],
      [this.aceitarEntregaStatus, 'okAceitar'],
      [this.devolverComMotivoStatus, 'okDevolver'],
      [this.cancelarTarefaStatus, 'okCancelar'],
    ];
    const falhas: Array<[RequestStatus, ErrorState]> = [
      [this.iniciarTarefaStatus, this.iniciarTarefaError],
      [this.marcarItemChecklistStatus, this.marcarItemChecklistError],
      [this.enviarParaRevisaoStatus, this.enviarParaRevisaoError],
      [this.aceitarEntregaStatus, this.aceitarEntregaError],
      [this.devolverComMotivoStatus, this.devolverComMotivoError],
      [this.cancelarTarefaStatus, this.cancelarTarefaError],
    ];
    const ok = sucessos.find(([s]) => s === 'success');
    const falha = falhas.find(([s]) => s === 'error');
    const textoFalha = falha ? (falha[1]?.code === 'client.requiredMissing' ? this.msg['motivoObrigatorio'] : this.msg['erroAcao']) : '';
    const aberta = t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
    const reenvio = !!t.details.details.devolvidaEm;
    return html`
      <section class="space-y-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
        <h4 class="text-sm font-semibold ${STRONG}">${this.msg['acoesTitulo']}</h4>
        <div aria-live="polite" class="space-y-2">
          ${falha
            ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
                <Message>${textoFalha}</Message>
              </groupnotifyuser--ml-contextual-feedback>`
            : ok
              ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
                  <Message>${this.msg[ok[1]]}</Message>
                </groupnotifyuser--ml-contextual-feedback>`
              : nothing}
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${t.status === 'aFazer'
            ? this.botao(this.msg['iniciar'], 'primary', () => this.iniciarTarefa(), this.iniciarTarefaStatus === 'loading', ocupado)
            : nothing}
          ${t.status === 'emAndamento'
            ? this.botao(
                reenvio ? this.msg['reenviarRevisao'] : this.msg['enviarRevisao'],
                'primary',
                () => this.enviarParaRevisao(),
                this.enviarParaRevisaoStatus === 'loading',
                ocupado,
              )
            : nothing}
          ${t.status === 'emRevisao'
            ? this.botao(this.msg['aceitar'], 'primary', () => this.aceitarEntrega(), this.aceitarEntregaStatus === 'loading', ocupado)
            : nothing}
          ${aberta
            ? this.botao(
                this.msg['cancelar'],
                'ghost',
                () => {
                  if (window.confirm(`${this.msg['confirmarCancelar']} “${t.titulo}”?`)) this.cancelarTarefa();
                },
                this.cancelarTarefaStatus === 'loading',
                ocupado,
              )
            : nothing}
        </div>
        ${t.status === 'emRevisao'
          ? html`<div class="space-y-2">
              <groupentertext--ml-multiline-text
                .rows=${3}
                .value=${this.devolverComMotivoDraft.details.motivoDevolucao ?? ''}
                placeholder=${this.msg['motivoPlaceholder']}
                @input=${(e: Event) => {
                  const v = textoEvento(e);
                  if (v !== null) this.setDevolverComMotivoDraft({ details: { motivoDevolucao: v } });
                }}
                @change=${(e: Event) => {
                  const v = textoEvento(e);
                  if (v !== null) this.setDevolverComMotivoDraft({ details: { motivoDevolucao: v } });
                }}
              >
                <Label>${this.msg['motivoLabel']}</Label>
              </groupentertext--ml-multiline-text>
              ${this.botao(this.msg['devolver'], 'secondary', () => this.devolverComMotivo(), this.devolverComMotivoStatus === 'loading', ocupado)}
            </div>`
          : nothing}
        ${aberta ? nothing : html`<p class="text-sm ${MUTED}">${this.msg['encerrada']}</p>`}
      </section>
    `;
  }

  private renderHistorico(t: TarefaAberta) {
    const d = t.details.details;
    return html`
      <section class="border-t border-[var(--border-subtle,currentColor)] pt-4">
        <h4 class="mb-2 text-sm font-semibold ${STRONG}">${this.msg['historicoTitulo']}</h4>
        <groupviewdata--ml-timeline-view>
          <Columns>
            <Column field="evento" header=${this.msg['colEvento']}></Column>
            <Column field="quando" header=${this.msg['colQuando']}></Column>
          </Columns>
          <Rows>
            <Row>
              <Cell>${this.msg['evCriada']} ${nomeMembro(t.criador)}</Cell>
              <Cell>${fmtDateTime(t.criadaEm)}</Cell>
            </Row>
            ${d.devolvidaEm
              ? html`<Row>
                  <Cell>${this.msg['evDevolvida']}${d.motivoDevolucao ? html`: ${d.motivoDevolucao}` : nothing}</Cell>
                  <Cell>${fmtDateTime(d.devolvidaEm)}</Cell>
                </Row>`
              : nothing}
            ${d.concluidaEm
              ? html`<Row><Cell>${this.msg['evConcluida']}</Cell><Cell>${fmtDateTime(d.concluidaEm)}</Cell></Row>`
              : nothing}
            ${d.canceladaEm
              ? html`<Row><Cell>${this.msg['evCancelada']}</Cell><Cell>${fmtDateTime(d.canceladaEm)}</Cell></Row>`
              : nothing}
          </Rows>
          <Empty>${this.msg['historicoVazio']}</Empty>
        </groupviewdata--ml-timeline-view>
      </section>
    `;
  }

  // ---------- form ----------

  private atualizar(modo: Modo, patch: Partial<Campos>) {
    if (modo === 'nova') this.setSalvarNovaTarefaDraft({ ...this.salvarNovaTarefaDraft, ...patch });
    else this.setSalvarEdicaoTarefaDraft({ ...this.salvarEdicaoTarefaDraft, ...patch });
  }

  private setItem(modo: Modo, lista: ItemChecklistDraft[], idx: number, descricao: string) {
    this.atualizar(modo, {
      checklist: lista.map((it, i) => (i === idx ? { ...it, details: { details: { descricao } } } : it)),
    });
  }

  private renderForm(modo: Modo) {
    const d: Campos = modo === 'nova' ? this.salvarNovaTarefaDraft : this.salvarEdicaoTarefaDraft;
    const status = modo === 'nova' ? this.salvarNovaTarefaStatus : this.salvarEdicaoTarefaStatus;
    const valido = !!(d.listaId && d.titulo && d.titulo.trim() && d.prioridade && d.prazo && d.responsavelId);
    const extraResp =
      modo === 'editar' &&
      d.responsavelId &&
      this.tarefa &&
      this.tarefa.responsavelId === d.responsavelId &&
      !this.membros.some((m) => m.responsavelId === d.responsavelId)
        ? nomeMembro(this.tarefa.responsavel)
        : '';
    const salvar = () => {
      if (modo === 'nova') {
        this.salvarNovaTarefa().then(() => {
          if (this.salvarNovaTarefaStatus === 'success') this.setScenario('detalhe');
        });
      } else {
        this.salvarEdicaoTarefa().then(() => {
          if (this.salvarEdicaoTarefaStatus === 'success') this.setScenario('detalhe');
        });
      }
    };
    const texto = (fn: (v: string) => void) => (e: Event) => {
      const v = textoEvento(e);
      if (v !== null) fn(v);
    };
    return html`
      <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
        <groupselectone--ml-combobox
          .value=${d.listaId}
          .required=${true}
          placeholder=${this.msg['formListaPlaceholder']}
          .loading=${this.opcoesFormularioStatus === 'loading'}
          @change=${(e: CustomEvent<{ value: string | null }>) => this.atualizar(modo, { listaId: e.detail.value })}
        >
          <Label>${this.msg['detLista']}</Label>
          ${this.listas.map((l) => html`<Item value=${l.tarefa.listaId}>${l.nome}</Item>`)}
          <Empty>${this.msg['semListas']}</Empty>
        </groupselectone--ml-combobox>

        <groupentertext--ml-enter-text
          .value=${d.titulo ?? ''}
          .required=${true}
          @input=${texto((v) => this.atualizar(modo, { titulo: v }))}
          @change=${texto((v) => this.atualizar(modo, { titulo: v }))}
        >
          <Label>${this.msg['formTitulo']}</Label>
        </groupentertext--ml-enter-text>

        <groupentertext--ml-multiline-text
          .rows=${4}
          .value=${d.details.descricao ?? ''}
          @input=${texto((v) => this.atualizar(modo, { details: { descricao: v } }))}
          @change=${texto((v) => this.atualizar(modo, { details: { descricao: v } }))}
        >
          <Label>${this.msg['detDescricao']}</Label>
        </groupentertext--ml-multiline-text>

        <groupselectone--ml-segmented-control
          .value=${d.prioridade}
          .required=${true}
          @change=${(e: CustomEvent<{ value: string | null }>) =>
            this.atualizar(modo, { prioridade: e.detail.value as TarefaPrioridade | null })}
        >
          <Label>${this.msg['colPrioridade']}</Label>
          <Item value="low">${this.msg['prBaixa']}</Item>
          <Item value="medium">${this.msg['prMedia']}</Item>
          <Item value="high">${this.msg['prAlta']}</Item>
        </groupselectone--ml-segmented-control>

        <groupenterdate--ml-date-picker
          .value=${d.prazo}
          .required=${true}
          .locale=${document.documentElement.lang || 'pt-BR'}
          @change=${(e: CustomEvent<{ value: string | null }>) => this.atualizar(modo, { prazo: e.detail.value })}
        >
          <Label>${this.msg['colPrazo']}</Label>
        </groupenterdate--ml-date-picker>

        <groupselectone--ml-combobox
          .value=${d.responsavelId}
          .required=${true}
          .loading=${this.buscarResponsaveisStatus === 'loading'}
          @input=${(e: Event) => {
            const v = textoEvento(e);
            if (v) this.buscarResponsaveis(v);
          }}
          @change=${(e: CustomEvent<{ value: string | null }>) => this.atualizar(modo, { responsavelId: e.detail.value })}
        >
          <Label>${this.msg['colResponsavel']}</Label>
          <Helper>${modo === 'editar' ? this.msg['formResponsavelEdicao'] : this.msg['formResponsavelDica']}</Helper>
          ${extraResp ? html`<Item value=${d.responsavelId ?? ''}>${extraResp}</Item>` : nothing}
          ${this.membros.map((m) => html`<Item value=${m.responsavelId}>${nomeMembro(m)}</Item>`)}
          <Empty>${this.msg['semMembros']}</Empty>
        </groupselectone--ml-combobox>

        <fieldset class="space-y-2">
          <legend class="mb-1 text-sm font-semibold ${STRONG}">${this.msg['formChecklist']}</legend>
          ${d.checklist.map(
            (it, i) => html`<div class="flex items-end gap-2">
              <div class="min-w-0 flex-1">
                <groupentertext--ml-enter-text
                  .value=${it.details.details.descricao ?? ''}
                  placeholder=${this.msg['itemPlaceholder']}
                  @input=${texto((v) => this.setItem(modo, d.checklist, i, v))}
                  @change=${texto((v) => this.setItem(modo, d.checklist, i, v))}
                >
                  <Label>${this.msg['itemLabel']} ${i + 1}</Label>
                </groupentertext--ml-enter-text>
              </div>
              ${this.botao(this.msg['removerItem'], 'ghost', () =>
                this.atualizar(modo, {
                  checklist: d.checklist.filter((_, k) => k !== i).map((x, k) => ({ ...x, ordem: k + 1 })),
                }),
              )}
            </div>`,
          )}
          ${this.botao(this.msg['adicionarItem'], 'secondary', () =>
            this.atualizar(modo, {
              checklist: [
                ...d.checklist,
                { id: null, version: null, ordem: d.checklist.length + 1, details: { details: { descricao: '' } } },
              ],
            }),
          )}
        </fieldset>

        <div class="space-y-2 border-t border-[var(--border-subtle,currentColor)] pt-4" aria-live="polite">
          ${status === 'error'
            ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
                <Message>${this.msg['erroSalvar']}</Message>
              </groupnotifyuser--ml-contextual-feedback>`
            : nothing}
          <div class="flex flex-wrap items-center gap-2">
            ${this.botao(
              modo === 'nova' ? this.msg['criarTarefa'] : this.msg['salvarAlteracoes'],
              'primary',
              salvar,
              status === 'loading',
              !valido,
            )}
            ${this.botao(
              modo === 'nova' ? this.msg['limpar'] : this.msg['descartar'],
              'secondary',
              () => (modo === 'nova' ? this.limparSalvarNovaTarefaDraft() : this.restaurarSalvarEdicaoTarefaDraft()),
              false,
              status === 'loading',
            )}
          </div>
          ${valido ? nothing : html`<p class="text-xs ${MUTED}">${this.msg['formObrigatorios']}</p>`}
        </div>
      </form>
    `;
  }
}

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Minhas tarefas',
  pageIntro: 'As tarefas que criei ou pelas quais sou responsável, num só lugar.',
  novaTarefa: 'Nova tarefa',
  filtrarTarefas: 'Filtrar tarefas',
  fTodas: 'Todas',
  fCriadas: 'Criadas por mim',
  fAtribuidas: 'Atribuídas a mim',
  fRevisao: 'Em revisão',
  fDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colResponsavel: 'Responsável',
  colPrioridade: 'Prioridade',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colChecklist: 'Checklist',
  listaVazia: 'Nenhuma tarefa encontrada com este filtro.',
  listaCarregando: 'Carregando suas tarefas…',
  carregarMais: 'Carregar mais tarefas',
  erroLista: 'Não foi possível carregar suas tarefas.',
  tentarNovamente: 'Tentar novamente',
  precondicao: 'Esta tela foi aberta sem o que precisa para mostrar suas tarefas. Volte para a tela anterior e abra as tarefas de novo.',
  voltar: 'Voltar',
  subtarefas: 'subtarefas',
  devolvida: 'Devolvida',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prBaixa: 'Baixa',
  prMedia: 'Média',
  prAlta: 'Alta',
  cenaDetalhe: 'Tarefa aberta',
  cenaNova: 'Dados da nova tarefa',
  cenaEditar: 'Ajustar tarefa',
  voltarTarefa: 'Voltar à tarefa',
  semSelecao: 'Escolha uma tarefa na lista para ver os detalhes, executá-la, revisá-la ou ajustá-la.',
  carregandoTarefa: 'Abrindo a tarefa…',
  erroTarefa: 'Não foi possível abrir a tarefa.',
  editarTarefa: 'Editar tarefa',
  detLista: 'Lista',
  detCriador: 'Criada por',
  detCriadaEm: 'Criada em',
  detConcluidaEm: 'Concluída em',
  detCanceladaEm: 'Cancelada em',
  detDescricao: 'Descrição',
  semDescricao: 'Sem descrição.',
  detMotivo: 'Motivo da devolução',
  detChecklist: 'Checklist',
  checklistVazia: 'Esta tarefa não tem itens de checklist.',
  acoesTitulo: 'O que fazer agora',
  iniciar: 'Iniciar tarefa',
  enviarRevisao: 'Enviar para revisão',
  reenviarRevisao: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolver: 'Devolver para ajuste',
  cancelar: 'Cancelar tarefa',
  confirmarCancelar: 'Cancelar a tarefa',
  motivoLabel: 'O que precisa ser ajustado',
  motivoPlaceholder: 'Explique ao responsável o que deve mudar',
  motivoObrigatorio: 'Informe o motivo para devolver a tarefa.',
  encerrada: 'Esta tarefa já foi encerrada e não muda mais de situação.',
  okIniciar: 'Tarefa iniciada.',
  okRevisao: 'Tarefa enviada para revisão.',
  okAceitar: 'Entrega aceita. A tarefa está concluída.',
  okDevolver: 'Tarefa devolvida para ajuste.',
  okCancelar: 'Tarefa cancelada.',
  erroAcao: 'Não foi possível concluir a ação. Confira se você pode fazê-la nesta tarefa e tente de novo.',
  historicoTitulo: 'Histórico',
  colEvento: 'Evento',
  colQuando: 'Quando',
  evCriada: 'Tarefa registrada por',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Entrega aceita',
  evCancelada: 'Tarefa cancelada',
  historicoVazio: 'Nada aconteceu com esta tarefa ainda.',
  formListaPlaceholder: 'Escolha a lista',
  semListas: 'Nenhuma lista disponível.',
  formTitulo: 'Título',
  formResponsavelDica: 'Digite parte do nome para buscar',
  formResponsavelEdicao: 'Só quem criou a tarefa troca o responsável. Digite parte do nome para buscar.',
  semMembros: 'Nenhuma pessoa encontrada.',
  formChecklist: 'Itens da checklist',
  itemLabel: 'Item',
  itemPlaceholder: 'O que precisa ser feito',
  adicionarItem: 'Adicionar item',
  removerItem: 'Remover item',
  criarTarefa: 'Criar tarefa',
  salvarAlteracoes: 'Salvar alterações',
  limpar: 'Limpar formulário',
  descartar: 'Descartar alterações',
  erroSalvar: 'Não foi possível salvar a tarefa. Seus dados foram mantidos; tente de novo.',
  formObrigatorios: 'Preencha lista, título, prioridade, prazo e responsável para salvar.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
