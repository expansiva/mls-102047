/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page21/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  ReembolsoDespesasMinhas_despesasShared,
  type DespesaResumo,
  type DespesaDetalhe,
  type DespesaStatus,
  type DespesaDetailsDraft,
} from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  boardTitle: 'Minhas despesas',
  detailTitle: 'Despesa',
  registerTitle: 'Nova despesa',
  correctTitle: 'Corrigir despesa',
  backLabel: 'Voltar',
  registerAction: 'Registrar despesa',
  filterLabel: 'Filtrar por situação',
  filterAll: 'Todas',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  loadMore: 'Carregar mais',
  loading: 'Carregando…',
  listError: 'Não foi possível carregar suas despesas.',
  openError: 'Não foi possível abrir a despesa.',
  retry: 'Tentar novamente',
  empty: 'Você ainda não registrou nenhuma despesa.',
  emptyFiltered: 'Nenhuma despesa com esta situação.',
  noDespesa: 'Escolha uma despesa no quadro para ver os detalhes.',
  fieldDate: 'Data da despesa',
  fieldCategory: 'Categoria',
  fieldValue: 'Valor',
  fieldDescription: 'Descrição',
  fieldStatus: 'Situação',
  fieldRejection: 'Motivo da rejeição',
  fieldResubmitted: 'Reenvio realizado',
  fieldPaidOn: 'Data de pagamento',
  yes: 'Sim',
  no: 'Não',
  submitForApproval: 'Enviar para aprovação',
  resubmit: 'Reenviar para aprovação',
  correct: 'Corrigir despesa',
  saveCorrection: 'Salvar correção',
  cancel: 'Cancelar',
  sentDone: 'Despesa enviada para a aprovação do gestor.',
  resentDone: 'Despesa reenviada para uma nova análise do gestor.',
  resubmitHint: 'Uma despesa rejeitada só pode ser corrigida e reenviada uma vez.',
  noActions: 'Não há ações de envio para esta situação.',
  datePlaceholder: 'Escolha a data',
  categoryPlaceholder: 'Ex.: Transporte, Alimentação',
  descriptionPlaceholder: 'Explique o motivo da despesa',
  openCard: 'Abrir despesa',
};
const pageMessage_en_us: typeof pageMessage_pt_br = {
  boardTitle: 'My expenses',
  detailTitle: 'Expense',
  registerTitle: 'New expense',
  correctTitle: 'Correct expense',
  backLabel: 'Back',
  registerAction: 'Register expense',
  filterLabel: 'Filter by status',
  filterAll: 'All',
  statusDraft: 'Draft',
  statusAwaitingApproval: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  loadMore: 'Load more',
  loading: 'Loading…',
  listError: 'Your expenses could not be loaded.',
  openError: 'The expense could not be opened.',
  retry: 'Try again',
  empty: 'You have not registered any expense yet.',
  emptyFiltered: 'No expense with this status.',
  noDespesa: 'Pick an expense on the board to see its details.',
  fieldDate: 'Expense date',
  fieldCategory: 'Category',
  fieldValue: 'Amount',
  fieldDescription: 'Description',
  fieldStatus: 'Status',
  fieldRejection: 'Rejection reason',
  fieldResubmitted: 'Resubmitted',
  fieldPaidOn: 'Payment date',
  yes: 'Yes',
  no: 'No',
  submitForApproval: 'Submit for approval',
  resubmit: 'Resubmit for approval',
  correct: 'Correct expense',
  saveCorrection: 'Save correction',
  cancel: 'Cancel',
  sentDone: 'Expense sent for your manager’s approval.',
  resentDone: 'Expense resubmitted for a new review by your manager.',
  resubmitHint: 'A rejected expense can only be corrected and resubmitted once.',
  noActions: 'There are no submit actions for this status.',
  datePlaceholder: 'Pick the date',
  categoryPlaceholder: 'E.g. Transport, Meals',
  descriptionPlaceholder: 'Explain the reason for the expense',
  openCard: 'Open expense',
};
const pageMessage_es_es: typeof pageMessage_pt_br = {
  boardTitle: 'Mis gastos',
  detailTitle: 'Gasto',
  registerTitle: 'Nuevo gasto',
  correctTitle: 'Corregir gasto',
  backLabel: 'Volver',
  registerAction: 'Registrar gasto',
  filterLabel: 'Filtrar por situación',
  filterAll: 'Todos',
  statusDraft: 'Borrador',
  statusAwaitingApproval: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  loadMore: 'Cargar más',
  loading: 'Cargando…',
  listError: 'No se pudieron cargar tus gastos.',
  openError: 'No se pudo abrir el gasto.',
  retry: 'Intentar de nuevo',
  empty: 'Todavía no has registrado ningún gasto.',
  emptyFiltered: 'Ningún gasto con esta situación.',
  noDespesa: 'Elige un gasto en el tablero para ver los detalles.',
  fieldDate: 'Fecha del gasto',
  fieldCategory: 'Categoría',
  fieldValue: 'Importe',
  fieldDescription: 'Descripción',
  fieldStatus: 'Situación',
  fieldRejection: 'Motivo del rechazo',
  fieldResubmitted: 'Reenvío realizado',
  fieldPaidOn: 'Fecha de pago',
  yes: 'Sí',
  no: 'No',
  submitForApproval: 'Enviar para aprobación',
  resubmit: 'Reenviar para aprobación',
  correct: 'Corregir gasto',
  saveCorrection: 'Guardar corrección',
  cancel: 'Cancelar',
  sentDone: 'Gasto enviado a la aprobación del gestor.',
  resentDone: 'Gasto reenviado para un nuevo análisis del gestor.',
  resubmitHint: 'Un gasto rechazado solo puede corregirse y reenviarse una vez.',
  noActions: 'No hay acciones de envío para esta situación.',
  datePlaceholder: 'Elige la fecha',
  categoryPlaceholder: 'Ej.: Transporte, Comidas',
  descriptionPlaceholder: 'Explica el motivo del gasto',
  openCard: 'Abrir gasto',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

const STATUS_FILTERS: (DespesaStatus | null)[] = [null, 'draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function rowsOf(p: unknown): DespesaResumo[] {
  if (Array.isArray(p)) return p as DespesaResumo[];
  const items = (p as { items?: unknown } | null)?.items;
  return Array.isArray(items) ? (items as DespesaResumo[]) : [];
}

function hasMoreOf(p: unknown): boolean {
  return !!(p as { hasMore?: boolean } | null)?.hasMore;
}

function fmtDate(iso?: string | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(new Date(y, m - 1, d));
}

function fmtMoney(v: string): string {
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function toNumber(v: string | null): number | null {
  if (v === null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function statusLabel(msg: PageMessageType, s: DespesaStatus): string {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaitingApproval;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
  }
}

function statusClasses(s: DespesaStatus): string {
  switch (s) {
    case 'draft': return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'paid': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
  }
}

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('reembolso-despesas--web--desktop--page21--minhas_despesas-102047')
export class ReembolsoDespesasDesktopPage21Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'board'}
          .backLabel=${this.msg['backLabel']}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="board" title=${this.msg['boardTitle']}>${this.renderBoard()}</Scene>
          <Scene value="detalhe" title=${this.msg['detailTitle']} nav="back" backTo="board">${this.renderDetalhe()}</Scene>
          <Scene value="registrar" title=${this.msg['registerTitle']} nav="back" backTo="board">${this.renderForm('registrar')}</Scene>
          <Scene value="corrigir" title=${this.msg['correctTitle']} nav="back" backTo="detalhe">${this.renderForm('corrigir')}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private btn(label: string, variant: string, onAction: () => void, loading = false, size = 'lg') {
    return html`
      <grouptriggeraction--ml-button-standard size=${size} data-variant=${variant} ?loading=${loading} @action=${onAction}>
        <Label>${label}</Label>
      </grouptriggeraction--ml-button-standard>
    `;
  }

  private statusLabelOf(s: DespesaStatus): string {
    return statusLabel(this.msg, s);
  }

  private renderBoard() {
    const rows = rowsOf(this.despesas);
    const busy = this.listarMinhasDespesasStatus === 'loading';
    let body;
    if (this.pageStatus === 'error') {
      body = html`
        <div class="flex flex-col items-start gap-3 rounded-xl border border-[var(--border-default,currentColor)] p-6" role="alert">
          <p>${this.listarMinhasDespesasError?.message || this.msg['listError']}</p>
          ${this.btn(this.msg['retry'], 'secondary', () => void this.listarMinhasDespesas(), busy, 'md')}
        </div>`;
    } else if (busy && rows.length === 0) {
      body = html`
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label=${this.msg['loading']}>
          ${[0, 1, 2, 3, 4, 5].map(() => html`<div class="h-44 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>`)}
        </div>`;
    } else if (rows.length === 0) {
      body = html`
        <div class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-[var(--border-default,currentColor)] px-6 py-16 text-center">
          <svg class="h-24 w-24 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"></path>
            <path d="M9 7h6M9 11h6M9 15h3"></path>
          </svg>
          <p class="text-lg text-[var(--text-strong,currentColor)]">${this.status ? this.msg['emptyFiltered'] : this.msg['empty']}</p>
          ${this.btn(this.msg['registerAction'], 'primary', () => this.setScenario('registrar'))}
        </div>`;
    } else {
      body = html`
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy=${busy ? 'true' : 'false'}>
          ${rows.map((r) => this.renderCard(r))}
        </ul>
        ${hasMoreOf(this.despesas)
          ? html`<div class="flex justify-center">${this.btn(this.msg['loadMore'], 'secondary', () => void this.listarMinhasDespesas({ append: true }), busy, 'md')}</div>`
          : nothing}`;
    }
    return html`
      <div data-organism-id="listaMinhasDespesas" class="flex flex-col gap-5">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label=${this.msg['filterLabel']} class="flex flex-wrap gap-2">
            ${STATUS_FILTERS.map((s) => {
              const on = this.status === s;
              return html`
                <button type="button" aria-pressed=${on ? 'true' : 'false'}
                  class="h-10 rounded-full border px-4 text-sm font-medium ${FOCUS} ${on
                    ? 'border-[var(--selected-border,currentColor)] bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)]'
                    : 'border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)]'}"
                  @click=${() => void this.listarMinhasDespesas({ status: s })}>
                  ${s === null ? this.msg['filterAll'] : this.statusLabelOf(s)}
                </button>`;
            })}
          </div>
          ${rows.length > 0 ? this.btn(this.msg['registerAction'], 'primary', () => this.setScenario('registrar'), false, 'md') : nothing}
        </div>
        ${body}
      </div>
    `;
  }

  private renderCard(r: DespesaResumo) {
    const selected = this.selectedDespesa === r.id;
    return html`
      <li>
        <button type="button" aria-label=${`${this.msg['openCard']}: ${r.details.details.categoria}`}
          class="flex w-full flex-col overflow-hidden rounded-xl border-2 bg-[var(--surface-bg,transparent)] text-left shadow-sm transition hover:shadow-md ${FOCUS} ${selected
            ? 'border-[var(--selected-border,currentColor)]'
            : 'border-[var(--border-subtle,currentColor)]'}"
          @click=${() => {
            this.setScenario('detalhe');
            void this.obterDespesa(r.id);
          }}>
          <span class="block w-full px-4 py-2 text-sm font-semibold uppercase tracking-wide ${statusClasses(r.status)}">${this.statusLabelOf(r.status)}</span>
          <span class="flex flex-col gap-1 p-4">
            <span class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(r.details.details.dataDespesa)}</span>
            <span class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${r.details.details.categoria}</span>
            <span class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(r.details.details.valor)}</span>
          </span>
        </button>
      </li>
    `;
  }

  private renderDetalhe() {
    const d = this.despesa;
    let content;
    if (this.obterDespesaStatus === 'loading') {
      content = html`<div class="flex flex-col gap-4" aria-busy="true" aria-label=${this.msg['loading']}>
        <div class="h-12 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-20 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-40 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
      </div>`;
    } else if (this.obterDespesaStatus === 'error') {
      content = html`<div class="flex flex-col items-start gap-3" role="alert">
        <p>${this.obterDespesaError?.message || this.msg['openError']}</p>
        ${this.btn(this.msg['retry'], 'secondary', () => void this.obterDespesa(this.selectedDespesa), false, 'md')}
      </div>`;
    } else if (!d) {
      content = html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['noDespesa']}</p>`;
    } else {
      content = this.renderDespesa(d);
    }
    return html`<div class="mx-auto max-w-3xl">${content}</div>`;
  }

  private renderDespesa(d: DespesaDetalhe) {
    const det = d.details.details;
    return html`
      <article data-organism-id="detalheDespesa" class="flex flex-col gap-5">
        <header class="overflow-hidden rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
          <div class="px-4 py-2 text-sm font-semibold uppercase tracking-wide ${statusClasses(d.status)}">${this.statusLabelOf(d.status)}</div>
          <div class="flex flex-wrap items-end justify-between gap-2 p-4">
            <div>
              <p class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${det.categoria}</p>
              <p class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(det.dataDespesa)}</p>
            </div>
            <p class="text-4xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(det.valor)}</p>
          </div>
        </header>

        ${this.renderAcoes(d)}

        ${det.motivoRejeicao
          ? html`
            <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
              <Title>${this.msg['fieldRejection']}</Title>
              <Message>${det.motivoRejeicao}</Message>
            </groupnotifyuser--ml-contextual-feedback>`
          : nothing}

        <groupviewcard--ml-vertical-card>
          <CardContent>
            <dl class="grid grid-cols-2 gap-x-6 gap-y-4 p-4">
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldStatus']}</dt>
                <dd class="font-medium text-[var(--text-strong,currentColor)]">${this.statusLabelOf(d.status)}</dd>
              </div>
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldDate']}</dt>
                <dd class="font-medium text-[var(--text-strong,currentColor)]">${fmtDate(det.dataDespesa)}</dd>
              </div>
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldCategory']}</dt>
                <dd class="font-medium text-[var(--text-strong,currentColor)]">${det.categoria}</dd>
              </div>
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldValue']}</dt>
                <dd class="font-medium text-[var(--text-strong,currentColor)]">${fmtMoney(det.valor)}</dd>
              </div>
              <div class="col-span-2">
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldDescription']}</dt>
                <dd class="whitespace-pre-line text-[var(--text-default,currentColor)]">${det.descricao}</dd>
              </div>
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldResubmitted']}</dt>
                <dd class="font-medium text-[var(--text-strong,currentColor)]">${det.reenvioRealizado ? this.msg['yes'] : this.msg['no']}</dd>
              </div>
              ${det.dataPagamento
                ? html`<div>
                    <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fieldPaidOn']}</dt>
                    <dd class="font-medium text-[var(--text-strong,currentColor)]">${fmtDate(det.dataPagamento)}</dd>
                  </div>`
                : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
      </article>
    `;
  }

  private renderAcoes(d: DespesaDetalhe) {
    let inner;
    if (this.enviarParaAprovacaoStatus === 'success') {
      inner = html`<p role="status" aria-live="polite" class="rounded-xl bg-[var(--status-success-bg,transparent)] px-4 py-3 font-medium text-[var(--status-success-text,currentColor)]">${this.msg['sentDone']}</p>`;
    } else if (this.reenviarParaAprovacaoStatus === 'success') {
      inner = html`<p role="status" aria-live="polite" class="rounded-xl bg-[var(--status-success-bg,transparent)] px-4 py-3 font-medium text-[var(--status-success-text,currentColor)]">${this.msg['resentDone']}</p>`;
    } else {
      const err = this.enviarParaAprovacaoError?.message || this.reenviarParaAprovacaoError?.message;
      let buttons;
      if (d.status === 'draft') {
        buttons = html`${this.btn(this.msg['submitForApproval'], 'primary', () => void this.enviarParaAprovacao(), this.enviarParaAprovacaoStatus === 'loading')}`;
      } else if (d.status === 'rejected' && !d.details.details.reenvioRealizado) {
        buttons = html`
          ${this.btn(this.msg['resubmit'], 'primary', () => void this.reenviarParaAprovacao(), this.reenviarParaAprovacaoStatus === 'loading')}
          ${this.btn(this.msg['correct'], 'secondary', () => this.setScenario('corrigir'))}`;
      } else {
        buttons = nothing;
      }
      inner = html`
        <div aria-live="polite">
          ${err ? html`<p role="alert" class="mb-3 text-[var(--text-default,currentColor)]">${err}</p>` : nothing}
        </div>
        ${buttons === nothing
          ? html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['noActions']}</p>`
          : html`<div class="flex flex-wrap gap-3">${buttons}</div>
              ${d.status === 'rejected' ? html`<p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg['resubmitHint']}</p>` : nothing}`}
      `;
    }
    return html`<section data-organism-id="acoesEnvio">${inner}</section>`;
  }

  private renderForm(mode: 'registrar' | 'corrigir') {
    const reg = mode === 'registrar';
    const det = reg ? this.registrarDespesaDraft.details : this.salvarCorrecaoDraft.details;
    const set = (patch: Partial<DespesaDetailsDraft>) => {
      if (reg) {
        this.setRegistrarDespesaDraft({ ...this.registrarDespesaDraft, details: { ...this.registrarDespesaDraft.details, ...patch } });
      } else {
        this.setSalvarCorrecaoDraft({ ...this.salvarCorrecaoDraft, details: { ...this.salvarCorrecaoDraft.details, ...patch } });
      }
    };
    const status = reg ? this.registrarDespesaStatus : this.salvarCorrecaoStatus;
    const error = reg ? this.registrarDespesaError : this.salvarCorrecaoError;
    const locale = document.documentElement.lang || 'pt-BR';
    const submit = () => {
      const p = reg ? this.registrarDespesa() : this.salvarCorrecao();
      void p.then(() => {
        const st = reg ? this.registrarDespesaStatus : this.salvarCorrecaoStatus;
        if (st === 'success') this.setScenario('detalhe');
      });
    };
    return html`
      <section data-organism-id="formularioDespesa" class="mx-auto flex max-w-2xl flex-col gap-5 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <groupenterdate--ml-date-picker
            .value=${det.dataDespesa}
            .locale=${locale}
            placeholder=${this.msg['datePlaceholder']}
            required
            @change=${(e: CustomEvent<{ value: string | null }>) => set({ dataDespesa: e.detail.value })}>
            <Label>${this.msg['fieldDate']}</Label>
          </groupenterdate--ml-date-picker>
          <groupentermoney--ml-enter-money-br
            .value=${toNumber(det.valor)}
            currency="BRL"
            locale="pt-BR"
            min="0"
            required
            @change=${(e: CustomEvent<{ value: number | null }>) => set({ valor: e.detail.value === null ? null : String(e.detail.value) })}>
            <Label>${this.msg['fieldValue']}</Label>
          </groupentermoney--ml-enter-money-br>
        </div>
        <groupentertext--ml-enter-text
          .value=${det.categoria ?? ''}
          placeholder=${this.msg['categoryPlaceholder']}
          required
          @change=${(e: CustomEvent<{ value: string }>) => set({ categoria: e.detail.value })}>
          <Label>${this.msg['fieldCategory']}</Label>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-multiline-text
          .value=${det.descricao ?? ''}
          .rows=${4}
          placeholder=${this.msg['descriptionPlaceholder']}
          required
          @change=${(e: CustomEvent<{ value: string }>) => set({ descricao: e.detail.value })}>
          <Label>${this.msg['fieldDescription']}</Label>
        </groupentertext--ml-multiline-text>
        <div aria-live="polite">
          ${error ? html`<p role="alert" class="text-[var(--text-default,currentColor)]">${error.message}</p>` : nothing}
        </div>
        <div class="flex flex-wrap gap-3">
          ${this.btn(reg ? this.msg['registerAction'] : this.msg['saveCorrection'], 'primary', submit, status === 'loading')}
          ${this.btn(this.msg['cancel'], 'secondary', () => this.setScenario(reg ? 'board' : 'detalhe'))}
        </div>
      </section>
    `;
  }
}
