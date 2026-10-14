/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/minhas_despesas.ts" enhancement="_blank"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaDetalhe, DespesaDetailsDraft, DespesaResumo, DespesaStatus, ErrorState } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  tituloLista: 'Minhas despesas',
  tituloDetalhe: 'Detalhe da despesa',
  tituloNovo: 'Nova despesa',
  tituloCorrecao: 'Correção da despesa',
  voltar: 'Voltar',
  novaDespesa: 'Registrar nova despesa',
  filtroLabel: 'Filtrar por situação',
  filtroTodas: 'Todas',
  stDraft: 'Rascunho',
  stAwaiting: 'Aguardando aprovação',
  stRejected: 'Rejeitada',
  stApproved: 'Aprovada',
  stPaid: 'Paga',
  carregando: 'Carregando suas despesas…',
  vazio: 'Nenhuma despesa por aqui ainda.',
  erroLista: 'Não foi possível carregar suas despesas.',
  tentarNovamente: 'Tentar novamente',
  carregarMais: 'Carregar mais despesas',
  colCategoria: 'Categoria',
  colValor: 'Valor',
  lblData: 'Data da despesa',
  lblCategoria: 'Categoria',
  lblValor: 'Valor',
  lblDescricao: 'Descrição',
  lblPagamento: 'Data de pagamento',
  lblSituacao: 'Situação',
  lblMotivo: 'Motivo da rejeição',
  jaReenviada: 'Esta despesa já foi corrigida e reenviada para uma nova análise.',
  phCategoria: 'Ex.: Transporte, Alimentação',
  dicaPreencher: 'Preencha data, categoria, valor e descrição para continuar.',
  btnRegistrar: 'Registrar despesa',
  btnSalvar: 'Salvar correção',
  btnEnviar: 'Enviar para aprovação',
  btnReenviar: 'Reenviar para aprovação',
  btnCorrigir: 'Corrigir despesa',
  enviado: 'Despesa enviada para a aprovação do gestor.',
  reenviado: 'Despesa reenviada para uma nova análise do gestor.',
  stmtAwaiting: 'Esta despesa está aguardando a análise do gestor.',
  stmtApproved: 'Esta despesa foi aprovada e aguarda o pagamento.',
  stmtPaid: 'Esta despesa já foi paga.',
  stmtResent: 'Esta despesa já foi reenviada uma vez e não pode ser reenviada de novo.',
  erroAcao: 'Não foi possível concluir. Nada do que você preencheu foi perdido.',
  erroAbrir: 'Não foi possível abrir esta despesa.',
  semDespesa: 'Nenhuma despesa aberta.',
  abrindo: 'Abrindo despesa…'
};
const pageMessage_en_us = {
  tituloLista: 'My expenses',
  tituloDetalhe: 'Expense details',
  tituloNovo: 'New expense',
  tituloCorrecao: 'Expense correction',
  voltar: 'Back',
  novaDespesa: 'Register a new expense',
  filtroLabel: 'Filter by status',
  filtroTodas: 'All',
  stDraft: 'Draft',
  stAwaiting: 'Awaiting approval',
  stRejected: 'Rejected',
  stApproved: 'Approved',
  stPaid: 'Paid',
  carregando: 'Loading your expenses…',
  vazio: 'No expenses here yet.',
  erroLista: 'Your expenses could not be loaded.',
  tentarNovamente: 'Try again',
  carregarMais: 'Load more expenses',
  colCategoria: 'Category',
  colValor: 'Amount',
  lblData: 'Expense date',
  lblCategoria: 'Category',
  lblValor: 'Amount',
  lblDescricao: 'Description',
  lblPagamento: 'Payment date',
  lblSituacao: 'Status',
  lblMotivo: 'Rejection reason',
  jaReenviada: 'This expense was already corrected and resubmitted for a new review.',
  phCategoria: 'E.g. Transport, Meals',
  dicaPreencher: 'Fill in date, category, amount and description to continue.',
  btnRegistrar: 'Register expense',
  btnSalvar: 'Save correction',
  btnEnviar: 'Send for approval',
  btnReenviar: 'Resubmit for approval',
  btnCorrigir: 'Correct expense',
  enviado: 'Expense sent to your manager for approval.',
  reenviado: 'Expense resubmitted for a new manager review.',
  stmtAwaiting: 'This expense is waiting for the manager’s review.',
  stmtApproved: 'This expense was approved and is waiting for payment.',
  stmtPaid: 'This expense has been paid.',
  stmtResent: 'This expense was already resubmitted once and cannot be resubmitted again.',
  erroAcao: 'This could not be completed. Nothing you entered was lost.',
  erroAbrir: 'This expense could not be opened.',
  semDespesa: 'No expense open.',
  abrindo: 'Opening expense…'
};
const pageMessage_es_es = {
  tituloLista: 'Mis gastos',
  tituloDetalhe: 'Detalle del gasto',
  tituloNovo: 'Nuevo gasto',
  tituloCorrecao: 'Corrección del gasto',
  voltar: 'Volver',
  novaDespesa: 'Registrar un nuevo gasto',
  filtroLabel: 'Filtrar por situación',
  filtroTodas: 'Todos',
  stDraft: 'Borrador',
  stAwaiting: 'Pendiente de aprobación',
  stRejected: 'Rechazado',
  stApproved: 'Aprobado',
  stPaid: 'Pagado',
  carregando: 'Cargando tus gastos…',
  vazio: 'Aún no hay gastos aquí.',
  erroLista: 'No se pudieron cargar tus gastos.',
  tentarNovamente: 'Intentar de nuevo',
  carregarMais: 'Cargar más gastos',
  colCategoria: 'Categoría',
  colValor: 'Valor',
  lblData: 'Fecha del gasto',
  lblCategoria: 'Categoría',
  lblValor: 'Valor',
  lblDescricao: 'Descripción',
  lblPagamento: 'Fecha de pago',
  lblSituacao: 'Situación',
  lblMotivo: 'Motivo del rechazo',
  jaReenviada: 'Este gasto ya fue corregido y reenviado para una nueva revisión.',
  phCategoria: 'Ej.: Transporte, Comidas',
  dicaPreencher: 'Completa fecha, categoría, valor y descripción para continuar.',
  btnRegistrar: 'Registrar gasto',
  btnSalvar: 'Guardar corrección',
  btnEnviar: 'Enviar para aprobación',
  btnReenviar: 'Reenviar para aprobación',
  btnCorrigir: 'Corregir gasto',
  enviado: 'Gasto enviado a la aprobación del gestor.',
  reenviado: 'Gasto reenviado para una nueva revisión del gestor.',
  stmtAwaiting: 'Este gasto está esperando la revisión del gestor.',
  stmtApproved: 'Este gasto fue aprobado y espera el pago.',
  stmtPaid: 'Este gasto ya fue pagado.',
  stmtResent: 'Este gasto ya fue reenviado una vez y no se puede reenviar de nuevo.',
  erroAcao: 'No se pudo completar. No se perdió nada de lo que escribiste.',
  erroAbrir: 'No se pudo abrir este gasto.',
  semDespesa: 'Ningún gasto abierto.',
  abrindo: 'Abriendo gasto…'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

const STATUSES: DespesaStatus[] = ['draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

const STATUS_CLASS: Record<DespesaStatus, string> = {
  draft: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  awaitingApproval: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  rejected: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
  approved: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  paid: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
};

function statusLabel(msg: PageMessageType, s: DespesaStatus): string {
  switch (s) {
    case 'draft': return msg.stDraft;
    case 'awaitingApproval': return msg.stAwaiting;
    case 'rejected': return msg.stRejected;
    case 'approved': return msg.stApproved;
    default: return msg.stPaid;
  }
}

function rowsOf(p: unknown): DespesaResumo[] {
  if (Array.isArray(p)) return p as DespesaResumo[];
  const shape = p as { items?: DespesaResumo[]; rows?: DespesaResumo[] } | null;
  const list = shape?.items ?? shape?.rows;
  return Array.isArray(list) ? list : [];
}

function hasMore(p: unknown): boolean {
  return (p as { hasMore?: boolean } | null)?.hasMore === true;
}

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtMoney(v: string): string {
  const n = Number(v);
  if (v === '' || Number.isNaN(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) {
    const d = new Date(v.slice(0, 10) + 'T00:00:00Z');
    if (!Number.isNaN(d.getTime())) {
      return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeZone: 'UTC' }).format(d);
    }
  }
  return v;
}

function toNum(v: string | null): number | null {
  if (v === null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function filled(d: DespesaDetailsDraft): boolean {
  return !!d.dataDespesa && !!d.categoria && !!d.valor && !!d.descricao;
}

@customElement('reembolso-despesas--web--mobile--page11--minhas_despesas-102047')
export class ReembolsoDespesasMobilePage11Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto w-full max-w-[430px] px-4 py-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg.voltar}
          .value=${this.scenary || 'lista'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="lista" title=${this.msg.tituloLista}>${this.renderLista()}</Scene>
          <Scene value="detalhe" title=${this.msg.tituloDetalhe} nav="back" backTo="lista">${this.renderDetalhe()}</Scene>
          <Scene value="novo" title=${this.msg.tituloNovo} nav="back" backTo="lista">${this.renderForm('novo')}</Scene>
          <Scene value="correcao" title=${this.msg.tituloCorrecao} nav="back" backTo="detalhe">${this.renderForm('correcao')}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private abrir(id: string) {
    this.setScenario('detalhe');
    this.obterDespesa(id);
  }

  private badge(s: DespesaStatus) {
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASS[s]}">${statusLabel(this.msg, s)}</span>`;
  }

  private errorBlock(message: string, retry: () => void) {
    return html`
      <div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
        <p class="text-sm">${message}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${retry}>
          <Label>${this.msg.tentarNovamente}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private commandError(err: ErrorState) {
    if (!err) return nothing;
    return html`
      <div role="alert" aria-live="polite" class="text-sm text-[var(--text-default,currentColor)]">
        <p>${this.msg.erroAcao}</p>
        ${err.message ? html`<p class="mt-1 text-[var(--text-muted,currentColor)]">${err.message}</p>` : nothing}
      </div>
    `;
  }

  /* ───────────── list ───────────── */

  private renderLista() {
    const rows = this.despesas ? rowsOf(this.despesas) : [];
    const failed = this.pageStatus === 'error' || this.listarMinhasDespesasStatus === 'error';
    return html`
      <div class="flex flex-col gap-4">
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.setScenario('novo')}>
          <Label>${this.msg.novaDespesa}</Label>
        </grouptriggeraction--ml-button-standard>

        <div data-organism-id="listaMinhasDespesas" class="flex flex-col gap-4">
          <div role="group" aria-label=${this.msg.filtroLabel} class="flex flex-wrap gap-2">
            ${this.chip(null, this.msg.filtroTodas)}
            ${STATUSES.map((s) => this.chip(s, statusLabel(this.msg, s)))}
          </div>

          ${failed
            ? this.errorBlock(this.msg.erroLista, () => { this.listarMinhasDespesas(); })
            : html`
              <groupviewdata--ml-vertical-record-list
                .hoverable=${true}
                .loading=${this.pageStatus === 'loading'}
                @row-click=${(e: CustomEvent<{ index: number }>) => {
                  const r = rows[e.detail.index];
                  if (r) this.abrir(r.id);
                }}
              >
                <Columns>
                  <Column field="categoria" header=${this.msg.colCategoria} />
                  <Column field="valor" header=${this.msg.colValor} align="right" />
                </Columns>
                <Rows>
                  ${rows.map((r) => html`
                    <Row ?selected=${r.id === this.selectedDespesa}>
                      <Cell>
                        <div class="flex min-h-[44px] flex-col justify-center">
                          <span class="font-medium text-[var(--text-strong,currentColor)]">${r.details.details.categoria}</span>
                          <span class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(r.details.details.dataDespesa)}</span>
                        </div>
                      </Cell>
                      <Cell>
                        <div class="flex flex-col items-end gap-1">
                          <span class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(r.details.details.valor)}</span>
                          ${this.badge(r.status)}
                        </div>
                      </Cell>
                    </Row>
                  `)}
                </Rows>
                <Empty><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.vazio}</div></Empty>
                <Loading><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.carregando}</div></Loading>
              </groupviewdata--ml-vertical-record-list>
              ${hasMore(this.despesas)
                ? html`
                  <grouptriggeraction--ml-button-standard
                    data-variant="secondary"
                    size="lg"
                    data-class="w-full"
                    .loading=${this.listarMinhasDespesasStatus === 'loading'}
                    @action=${() => { this.listarMinhasDespesas({ append: true }); }}
                  >
                    <Label>${this.msg.carregarMais}</Label>
                  </grouptriggeraction--ml-button-standard>`
                : nothing}
            `}
        </div>
      </div>
    `;
  }

  private chip(s: DespesaStatus | null, label: string) {
    const on = this.status === s;
    const cls = on
      ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
      : 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]';
    return html`
      <button
        type="button"
        aria-pressed=${on ? 'true' : 'false'}
        class="min-h-[44px] rounded-full border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 ring-[var(--focus-ring,currentColor)] ${cls}"
        @click=${() => { this.listarMinhasDespesas({ status: s }); }}
      >${label}</button>
    `;
  }

  /* ───────────── detail ───────────── */

  private renderDetalhe() {
    const d = this.despesa;
    const loading = this.obterDespesaStatus === 'loading';
    const failed = this.obterDespesaStatus === 'error' && !loading;
    return html`
      <div class="flex flex-col gap-5">
        <div data-organism-id="detalheDespesa" class="flex flex-col gap-4">
          ${failed
            ? this.errorBlock(this.msg.erroAbrir, () => { if (this.selectedDespesa) this.obterDespesa(this.selectedDespesa); })
            : d || loading
              ? this.renderCard(loading ? null : d, loading)
              : html`<p class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg.semDespesa}</p>`}
        </div>
        ${this.renderAcoes(loading || failed ? null : d)}
      </div>
    `;
  }

  private renderCard(d: DespesaDetalhe | null, loading: boolean) {
    const x = d?.details.details;
    return html`
      <groupviewcard--ml-vertical-card .loading=${loading} aria-busy=${loading ? 'true' : 'false'}>
        ${d && x
          ? html`
            <CardHeader>
              <CardTitle>${x.categoria}</CardTitle>
              <CardDescription>${fmtDate(x.dataDespesa)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(x.valor)}</span>
                  ${this.badge(d.status)}
                </div>
                <dl class="grid grid-cols-1 gap-3 text-sm">
                  ${x.dataPagamento
                    ? html`<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.lblPagamento}</dt><dd class="font-medium">${fmtDate(x.dataPagamento)}</dd></div>`
                    : nothing}
                  <div>
                    <dt class="text-[var(--text-muted,currentColor)]">${this.msg.lblDescricao}</dt>
                    <dd class="whitespace-pre-line break-words">${x.descricao}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            ${x.reenvioRealizado
              ? html`<CardFooter><span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.jaReenviada}</span></CardFooter>`
              : nothing}`
          : nothing}
      </groupviewcard--ml-vertical-card>
      ${x && x.motivoRejeicao ? this.rejeicao(x.motivoRejeicao) : nothing}
    `;
  }

  private rejeicao(motivo: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}>
        <Title>${this.msg.lblMotivo}</Title>
        <Message>${motivo}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
  }

  private renderAcoes(d: DespesaDetalhe | null) {
    if (!d) return html`<div data-organism-id="acoesEnvio"></div>`;
    const resendable = d.status === 'rejected' && !d.details.details.reenvioRealizado;
    const sending = this.enviarParaAprovacaoStatus === 'loading';
    const resending = this.reenviarParaAprovacaoStatus === 'loading';
    let body;
    if (d.status === 'draft') {
      body = html`
        ${this.commandError(this.enviarParaAprovacaoError)}
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" .loading=${sending} .disabled=${sending} @action=${() => { this.enviarParaAprovacao(); }}>
          <Label>${this.msg.btnEnviar}</Label>
        </grouptriggeraction--ml-button-standard>`;
    } else if (resendable) {
      body = html`
        ${this.commandError(this.reenviarParaAprovacaoError)}
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" .disabled=${resending} @action=${() => this.setScenario('correcao')}>
          <Label>${this.msg.btnCorrigir}</Label>
        </grouptriggeraction--ml-button-standard>
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" .loading=${resending} .disabled=${resending} @action=${() => { this.reenviarParaAprovacao(); }}>
          <Label>${this.msg.btnReenviar}</Label>
        </grouptriggeraction--ml-button-standard>`;
    } else {
      const stmt = d.status === 'awaitingApproval' ? this.msg.stmtAwaiting
        : d.status === 'approved' ? this.msg.stmtApproved
        : d.status === 'paid' ? this.msg.stmtPaid
        : this.msg.stmtResent;
      body = html`<p class="text-sm text-[var(--text-muted,currentColor)]">${stmt}</p>`;
    }
    return html`
      <section data-organism-id="acoesEnvio" aria-busy=${sending || resending ? 'true' : 'false'} class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-5">
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${this.enviarParaAprovacaoStatus === 'success'} .dismissible=${false}>
          <Message>${this.msg.enviado}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${this.reenviarParaAprovacaoStatus === 'success'} .dismissible=${false}>
          <Message>${this.msg.reenviado}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        ${body}
      </section>
    `;
  }

  /* ───────────── form (new / correction) ───────────── */

  private renderForm(kind: 'novo' | 'correcao') {
    const novo = kind === 'novo';
    const d = novo ? this.registrarDespesaDraft.details : this.salvarCorrecaoDraft.details;
    const patch = (p: Partial<DespesaDetailsDraft>) => {
      if (novo) {
        this.setRegistrarDespesaDraft({ ...this.registrarDespesaDraft, details: { ...this.registrarDespesaDraft.details, ...p } });
      } else {
        this.setSalvarCorrecaoDraft({ ...this.salvarCorrecaoDraft, details: { ...this.salvarCorrecaoDraft.details, ...p } });
      }
    };
    const st = novo ? this.registrarDespesaStatus : this.salvarCorrecaoStatus;
    const err = novo ? this.registrarDespesaError : this.salvarCorrecaoError;
    const busy = st === 'loading';
    const ready = filled(d);
    const motivo = novo ? undefined : this.despesa?.details.details.motivoRejeicao;
    const submit = () => {
      if (novo) {
        this.registrarDespesa().then(() => {
          if (this.registrarDespesaStatus === 'success') this.setScenario('detalhe');
        });
      } else {
        this.salvarCorrecao().then(() => {
          if (this.salvarCorrecaoStatus === 'success') this.setScenario('detalhe');
        });
      }
    };
    return html`
      <form data-organism-id="formularioDespesa" class="flex flex-col gap-4" aria-busy=${busy ? 'true' : 'false'} @submit=${(e: Event) => e.preventDefault()}>
        ${motivo ? this.rejeicao(motivo) : nothing}

        <groupenterdate--ml-date-picker
          .value=${d.dataDespesa}
          locale=${lang() ?? 'pt-BR'}
          .disabled=${busy}
          required
          @change=${(e: CustomEvent<{ value: string | null }>) => patch({ dataDespesa: e.detail.value })}
        >
          <Label>${this.msg.lblData}</Label>
        </groupenterdate--ml-date-picker>

        <groupentertext--ml-enter-text
          .value=${d.categoria ?? ''}
          placeholder=${this.msg.phCategoria}
          .disabled=${busy}
          required
          @change=${(e: CustomEvent<{ value: string }>) => patch({ categoria: e.detail.value === '' ? null : e.detail.value })}
        >
          <Label>${this.msg.lblCategoria}</Label>
        </groupentertext--ml-enter-text>

        <groupentermoney--ml-enter-money-br
          .value=${toNum(d.valor)}
          .disabled=${busy}
          min="0"
          required
          @change=${(e: CustomEvent<{ value: number | null }>) => patch({ valor: e.detail.value === null ? null : String(e.detail.value) })}
        >
          <Label>${this.msg.lblValor}</Label>
        </groupentermoney--ml-enter-money-br>

        <groupentertext--ml-multiline-text
          .value=${d.descricao ?? ''}
          .rows=${4}
          .disabled=${busy}
          required
          @change=${(e: CustomEvent<{ value: string }>) => patch({ descricao: e.detail.value === '' ? null : e.detail.value })}
        >
          <Label>${this.msg.lblDescricao}</Label>
        </groupentertext--ml-multiline-text>

        ${ready ? nothing : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.dicaPreencher}</p>`}
        ${this.commandError(err)}

        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" .loading=${busy} .disabled=${!ready || busy} @action=${submit}>
          <Label>${novo ? this.msg.btnRegistrar : this.msg.btnSalvar}</Label>
        </grouptriggeraction--ml-button-standard>
      </form>
    `;
  }
}
