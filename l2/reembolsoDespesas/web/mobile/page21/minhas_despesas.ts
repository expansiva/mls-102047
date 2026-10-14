/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page21/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaStatus, DespesasPage, DespesaResumo, DespesaDetalhe, DespesaDetailsDraft } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  boardTitle: 'Minhas despesas',
  detailTitle: 'Despesa',
  registerTitle: 'Nova despesa',
  correctTitle: 'Correção da despesa',
  back: 'Voltar',
  registerExpense: 'Registrar despesa',
  filterLabel: 'Filtrar por situação',
  filterAll: 'Todas',
  stDraft: 'Rascunho',
  stAwaiting: 'Aguardando aprovação',
  stRejected: 'Rejeitada',
  stApproved: 'Aprovada',
  stPaid: 'Paga',
  loading: 'Carregando…',
  loadMore: 'Carregar mais despesas',
  listError: 'Não foi possível carregar suas despesas.',
  retry: 'Tentar novamente',
  emptyText: 'Você ainda não tem despesas por aqui. Registre a primeira para pedir reembolso.',
  notOpened: 'Escolha uma despesa na lista para ver os detalhes.',
  detailError: 'Não foi possível abrir a despesa.',
  submitApproval: 'Enviar para aprovação',
  resubmit: 'Reenviar para aprovação',
  correctExpense: 'Corrigir despesa',
  sentOk: 'Despesa enviada para o gestor aprovar.',
  resentOk: 'Despesa reenviada para uma nova análise do gestor.',
  hintAwaiting: 'Aguardando a decisão do gestor.',
  hintApproved: 'Aprovada. Aguardando o registro do pagamento.',
  hintPaid: 'Despesa paga.',
  hintResent: 'Esta despesa já foi reenviada uma vez e não pode ser reenviada de novo.',
  rejectionTitle: 'Motivo da rejeição',
  factsTitle: 'Dados da despesa',
  fDate: 'Data da despesa',
  fDescription: 'Descrição',
  fResent: 'Reenvio realizado',
  fPayment: 'Data de pagamento',
  yes: 'Sim',
  no: 'Não',
  fCategory: 'Categoria',
  fValue: 'Valor',
  categoryPlaceholder: 'Ex.: Transporte, Refeição',
  descriptionPlaceholder: 'Conte brevemente do que se trata a despesa',
  registerHint: 'A despesa é registrada como rascunho. Depois, envie para aprovação.',
  correctHint: 'Corrija os dados e salve. Depois, reenvie para aprovação.',
  saveCorrection: 'Salvar correção',
};
const pageMessage_en_us = {
  boardTitle: 'My expenses',
  detailTitle: 'Expense',
  registerTitle: 'New expense',
  correctTitle: 'Expense correction',
  back: 'Back',
  registerExpense: 'Register expense',
  filterLabel: 'Filter by status',
  filterAll: 'All',
  stDraft: 'Draft',
  stAwaiting: 'Awaiting approval',
  stRejected: 'Rejected',
  stApproved: 'Approved',
  stPaid: 'Paid',
  loading: 'Loading…',
  loadMore: 'Load more expenses',
  listError: 'We could not load your expenses.',
  retry: 'Try again',
  emptyText: 'You have no expenses here yet. Register the first one to ask for reimbursement.',
  notOpened: 'Pick an expense from the list to see its details.',
  detailError: 'We could not open the expense.',
  submitApproval: 'Send for approval',
  resubmit: 'Resubmit for approval',
  correctExpense: 'Correct expense',
  sentOk: 'Expense sent to your manager for approval.',
  resentOk: 'Expense resubmitted for a new manager review.',
  hintAwaiting: 'Waiting for the manager’s decision.',
  hintApproved: 'Approved. Waiting for the payment to be recorded.',
  hintPaid: 'Expense paid.',
  hintResent: 'This expense was already resubmitted once and cannot be resubmitted again.',
  rejectionTitle: 'Rejection reason',
  factsTitle: 'Expense details',
  fDate: 'Expense date',
  fDescription: 'Description',
  fResent: 'Resubmitted',
  fPayment: 'Payment date',
  yes: 'Yes',
  no: 'No',
  fCategory: 'Category',
  fValue: 'Amount',
  categoryPlaceholder: 'E.g. Transport, Meals',
  descriptionPlaceholder: 'Briefly say what the expense is about',
  registerHint: 'The expense is registered as a draft. Then send it for approval.',
  correctHint: 'Fix the data and save. Then resubmit for approval.',
  saveCorrection: 'Save correction',
};
const pageMessage_es_es = {
  boardTitle: 'Mis gastos',
  detailTitle: 'Gasto',
  registerTitle: 'Nuevo gasto',
  correctTitle: 'Corrección del gasto',
  back: 'Volver',
  registerExpense: 'Registrar gasto',
  filterLabel: 'Filtrar por situación',
  filterAll: 'Todos',
  stDraft: 'Borrador',
  stAwaiting: 'Pendiente de aprobación',
  stRejected: 'Rechazado',
  stApproved: 'Aprobado',
  stPaid: 'Pagado',
  loading: 'Cargando…',
  loadMore: 'Cargar más gastos',
  listError: 'No se pudieron cargar tus gastos.',
  retry: 'Intentar de nuevo',
  emptyText: 'Aún no tienes gastos aquí. Registra el primero para pedir el reembolso.',
  notOpened: 'Elige un gasto de la lista para ver sus detalles.',
  detailError: 'No se pudo abrir el gasto.',
  submitApproval: 'Enviar a aprobación',
  resubmit: 'Reenviar a aprobación',
  correctExpense: 'Corregir gasto',
  sentOk: 'Gasto enviado al gestor para su aprobación.',
  resentOk: 'Gasto reenviado para una nueva revisión del gestor.',
  hintAwaiting: 'Esperando la decisión del gestor.',
  hintApproved: 'Aprobado. Esperando el registro del pago.',
  hintPaid: 'Gasto pagado.',
  hintResent: 'Este gasto ya fue reenviado una vez y no se puede reenviar de nuevo.',
  rejectionTitle: 'Motivo del rechazo',
  factsTitle: 'Datos del gasto',
  fDate: 'Fecha del gasto',
  fDescription: 'Descripción',
  fResent: 'Reenvío realizado',
  fPayment: 'Fecha de pago',
  yes: 'Sí',
  no: 'No',
  fCategory: 'Categoría',
  fValue: 'Importe',
  categoryPlaceholder: 'Ej.: Transporte, Comida',
  descriptionPlaceholder: 'Cuenta brevemente de qué trata el gasto',
  registerHint: 'El gasto se registra como borrador. Después, envíalo a aprobación.',
  correctHint: 'Corrige los datos y guarda. Después, reenvía a aprobación.',
  saveCorrection: 'Guardar corrección',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

const FILTERS: (DespesaStatus | null)[] = [null, 'draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

const STRIP: Record<DespesaStatus, string> = {
  draft: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  awaitingApproval: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  rejected: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
  approved: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  paid: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
};

function statusLabel(msg: PageMessageType, s: DespesaStatus): string {
  switch (s) {
    case 'draft': return msg.stDraft;
    case 'awaitingApproval': return msg.stAwaiting;
    case 'rejected': return msg.stRejected;
    case 'approved': return msg.stApproved;
    case 'paid': return msg.stPaid;
  }
}

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtDate(v: string | null | undefined): string {
  if (!v) return '';
  const d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtMoney(v: string | null | undefined): string {
  if (!v) return '';
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function toNumber(v: string | null): number | null {
  if (v === null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function rowsOf(p: DespesasPage | null): DespesaResumo[] {
  if (!p) return [];
  const raw = p as unknown;
  if (Array.isArray(raw)) return raw as DespesaResumo[];
  const o = raw as { items?: DespesaResumo[]; rows?: DespesaResumo[]; data?: DespesaResumo[] };
  return o.items ?? o.rows ?? o.data ?? [];
}

function hasMore(p: DespesasPage | null): boolean {
  if (!p) return false;
  return Boolean((p as unknown as { hasMore?: boolean }).hasMore);
}

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 ring-[var(--focus-ring,currentColor)]';

@customElement('reembolso-despesas--web--mobile--page21--minhas_despesas-102047')
export class ReembolsoDespesasMobilePage21Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full w-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'board'}
          backLabel=${this.msg.back}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="board" title=${this.msg.boardTitle}>${this.renderBoard()}</Scene>
          <Scene value="detalhe" title=${this.msg.detailTitle} nav="back" backTo="board">${this.renderDetalhe()}</Scene>
          <Scene value="registrar" title=${this.msg.registerTitle} nav="back" backTo="board">${this.renderRegistrar()}</Scene>
          <Scene value="corrigir" title=${this.msg.correctTitle} nav="back" backTo="detalhe">${this.renderCorrigir()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  // ---------- board ----------

  private renderBoard() {
    const rows = rowsOf(this.despesas);
    const empty = rows.length === 0 && this.pageStatus === 'empty';
    return html`
      <div class="mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-8 pt-2">
        ${empty ? nothing : this.renderRegisterButton()}
        <div role="group" aria-label=${this.msg.filterLabel} class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          ${FILTERS.map((s) => {
            const on = this.status === s;
            return html`
              <button
                type="button"
                aria-pressed=${on ? 'true' : 'false'}
                class="min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-medium ${FOCUS} ${on
                  ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
                  : 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]'}"
                @click=${() => this.listarMinhasDespesas({ status: s })}
              >${s === null ? this.msg.filterAll : statusLabel(this.msg, s)}</button>
            `;
          })}
        </div>
        <div data-organism-id="listaMinhasDespesas" aria-live="polite">${this.renderLista(rows)}</div>
      </div>
    `;
  }

  private renderRegisterButton() {
    return html`
      <grouptriggeraction--ml-button-standard
        size="lg"
        data-variant="primary"
        data-class="w-full"
        @action=${() => this.setScenario('registrar')}
      ><Label>${this.msg.registerExpense}</Label></grouptriggeraction--ml-button-standard>
    `;
  }

  private renderLista(rows: DespesaResumo[]) {
    if (this.pageStatus === 'error' && rows.length === 0) {
      return html`
        <div class="flex flex-col items-center gap-4 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-center">
          <p class="text-[var(--text-default,currentColor)]">${this.msg.listError}${this.listarMinhasDespesasError ? html` <span class="block text-sm text-[var(--text-muted,currentColor)]">${this.listarMinhasDespesasError.message}</span>` : nothing}</p>
          <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" @action=${() => this.listarMinhasDespesas()}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    if (rows.length > 0) {
      return html`
        <ul class="flex flex-col gap-3">
          ${rows.map((row) => {
            const sel = row.id === this.selectedDespesa;
            return html`
              <li>
                <button
                  type="button"
                  aria-current=${sel ? 'true' : 'false'}
                  class="block w-full overflow-hidden rounded-xl border text-left ${FOCUS} ${sel
                    ? 'border-[var(--selected-border,currentColor)]'
                    : 'border-[var(--border-default,currentColor)]'} bg-[var(--surface-bg,transparent)]"
                  @click=${() => {
                    this.obterDespesa(row.id);
                    this.setScenario('detalhe');
                  }}
                >
                  <span class="block w-full px-4 py-2 text-sm font-semibold uppercase tracking-wide ${STRIP[row.status]}">${statusLabel(this.msg, row.status)}</span>
                  <span class="flex min-h-[64px] items-end justify-between gap-3 px-4 py-3">
                    <span class="min-w-0">
                      <span class="block truncate font-medium text-[var(--text-strong,currentColor)]">${row.details.details.categoria}</span>
                      <span class="block text-sm text-[var(--text-muted,currentColor)]">${fmtDate(row.details.details.dataDespesa)}</span>
                    </span>
                    <span class="shrink-0 text-2xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(row.details.details.valor)}</span>
                  </span>
                </button>
              </li>
            `;
          })}
        </ul>
        ${hasMore(this.despesas)
          ? html`
              <div class="mt-4">
                <grouptriggeraction--ml-button-standard
                  size="lg"
                  data-variant="secondary"
                  data-class="w-full"
                  .loading=${this.listarMinhasDespesasStatus === 'loading'}
                  @action=${() => this.listarMinhasDespesas({ append: true })}
                ><Label>${this.msg.loadMore}</Label></grouptriggeraction--ml-button-standard>
              </div>
            `
          : nothing}
      `;
    }
    if (this.pageStatus === 'empty') {
      return html`
        <div class="flex flex-col items-center gap-5 px-2 py-10 text-center">
          <svg class="h-24 w-24 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"></path>
            <path d="M9 8h6M9 12h6"></path>
          </svg>
          <p class="text-lg text-[var(--text-strong,currentColor)]">${this.msg.emptyText}</p>
          <div class="w-full">${this.renderRegisterButton()}</div>
        </div>
      `;
    }
    return html`
      <ul class="flex flex-col gap-3" aria-busy="true" aria-label=${this.msg.loading}>
        ${[0, 1, 2].map(() => html`
          <li class="h-28 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></li>
        `)}
      </ul>
    `;
  }

  // ---------- detail ----------

  private renderDetalhe() {
    return html`
      <div class="mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-8 pt-2" data-organism-id="detalheDespesa">
        ${this.renderDetalheConteudo()}
      </div>
    `;
  }

  private renderDetalheConteudo() {
    const d = this.despesa;
    if (this.obterDespesaStatus === 'loading') {
      return html`
        <div aria-busy="true" aria-label=${this.msg.loading} class="flex flex-col gap-3">
          <div class="h-28 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-14 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-40 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
        </div>
      `;
    }
    if (this.obterDespesaStatus === 'error') {
      return html`
        <div class="flex flex-col items-center gap-4 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-center" role="alert">
          <p>${this.msg.detailError}${this.obterDespesaError ? html` <span class="block text-sm text-[var(--text-muted,currentColor)]">${this.obterDespesaError.message}</span>` : nothing}</p>
          <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" @action=${() => this.obterDespesa(this.selectedDespesa)}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    if (!d) {
      return html`<p class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg.notOpened}</p>`;
    }
    const x = d.details.details;
    return html`
      <section class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <div class="w-full px-4 py-3 text-base font-semibold uppercase tracking-wide ${STRIP[d.status]}">${statusLabel(this.msg, d.status)}</div>
        <div class="flex flex-col gap-1 px-4 py-4">
          <span class="text-lg text-[var(--text-default,currentColor)]">${x.categoria}</span>
          <span class="text-4xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(x.valor)}</span>
        </div>
      </section>

      ${this.renderAcoes(d)}

      ${x.motivoRejeicao
        ? html`
            <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
              <Title>${this.msg.rejectionTitle}</Title>
              <Message>${x.motivoRejeicao}</Message>
            </groupnotifyuser--ml-contextual-feedback>
          `
        : nothing}

      <groupviewcard--ml-vertical-card>
        <CardHeader><CardTitle>${this.msg.factsTitle}</CardTitle></CardHeader>
        <CardContent>
          <dl class="flex flex-col divide-y divide-[var(--border-subtle,currentColor)]">
            <div class="py-3">
              <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fDate}</dt>
              <dd class="text-base text-[var(--text-strong,currentColor)]">${fmtDate(x.dataDespesa)}</dd>
            </div>
            <div class="py-3">
              <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fDescription}</dt>
              <dd class="whitespace-pre-line break-words text-base text-[var(--text-strong,currentColor)]">${x.descricao}</dd>
            </div>
            <div class="py-3">
              <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fResent}</dt>
              <dd class="text-base text-[var(--text-strong,currentColor)]">${x.reenvioRealizado ? this.msg.yes : this.msg.no}</dd>
            </div>
            ${x.dataPagamento
              ? html`
                  <div class="py-3">
                    <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fPayment}</dt>
                    <dd class="text-base text-[var(--text-strong,currentColor)]">${fmtDate(x.dataPagamento)}</dd>
                  </div>
                `
              : nothing}
          </dl>
        </CardContent>
      </groupviewcard--ml-vertical-card>
    `;
  }

  private renderAcoes(d: DespesaDetalhe) {
    const line = (text: string, ok: boolean) => html`
      <p role="status" aria-live="polite" class="rounded-xl px-4 py-3 text-base font-medium ${ok
        ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
        : 'bg-[var(--surface-alt-bg,transparent)] text-[var(--text-default,currentColor)]'}">${text}</p>
    `;
    const fail = (message: string) => html`
      <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
        <Message>${message}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
    let body;
    if (this.enviarParaAprovacaoStatus === 'success') {
      body = line(this.msg.sentOk, true);
    } else if (this.reenviarParaAprovacaoStatus === 'success') {
      body = line(this.msg.resentOk, true);
    } else if (d.status === 'draft') {
      body = html`
        ${this.enviarParaAprovacaoError ? fail(this.enviarParaAprovacaoError.message) : nothing}
        <grouptriggeraction--ml-button-standard
          size="lg"
          data-variant="primary"
          data-class="w-full"
          .loading=${this.enviarParaAprovacaoStatus === 'loading'}
          @action=${() => this.enviarParaAprovacao()}
        ><Label>${this.msg.submitApproval}</Label></grouptriggeraction--ml-button-standard>
      `;
    } else if (d.status === 'rejected' && !d.details.details.reenvioRealizado) {
      body = html`
        ${this.reenviarParaAprovacaoError ? fail(this.reenviarParaAprovacaoError.message) : nothing}
        <div class="grid grid-cols-1 gap-3">
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-variant="primary"
            data-class="w-full"
            .loading=${this.reenviarParaAprovacaoStatus === 'loading'}
            @action=${() => this.reenviarParaAprovacao()}
          ><Label>${this.msg.resubmit}</Label></grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-variant="secondary"
            data-class="w-full"
            @action=${() => this.setScenario('corrigir')}
          ><Label>${this.msg.correctExpense}</Label></grouptriggeraction--ml-button-standard>
        </div>
      `;
    } else if (d.status === 'rejected') {
      body = line(this.msg.hintResent, false);
    } else if (d.status === 'awaitingApproval') {
      body = line(this.msg.hintAwaiting, false);
    } else if (d.status === 'approved') {
      body = line(this.msg.hintApproved, false);
    } else {
      body = line(this.msg.hintPaid, true);
    }
    return html`<div data-organism-id="acoesEnvio" class="flex flex-col gap-3">${body}</div>`;
  }

  // ---------- forms ----------

  private renderCampos(details: DespesaDetailsDraft, patch: (p: Partial<DespesaDetailsDraft>) => void) {
    return html`
      <groupenterdate--ml-date-shortcut-picker
        name="dataDespesa"
        locale=${document.documentElement.lang || 'pt-BR'}
        required
        .value=${details.dataDespesa}
        @change=${(e: CustomEvent<{ value: string | null }>) => patch({ dataDespesa: e.detail.value })}
      ><Label>${this.msg.fDate}</Label></groupenterdate--ml-date-shortcut-picker>

      <groupentertext--ml-enter-text
        name="categoria"
        required
        placeholder=${this.msg.categoryPlaceholder}
        .value=${details.categoria ?? ''}
        @change=${(e: CustomEvent<{ value: string }>) => patch({ categoria: e.detail.value })}
      ><Label>${this.msg.fCategory}</Label></groupentertext--ml-enter-text>

      <groupentermoney--ml-enter-money-br
        name="valor"
        currency="BRL"
        locale="pt-BR"
        required
        .value=${toNumber(details.valor)}
        @change=${(e: CustomEvent<{ value: number | null }>) => patch({ valor: e.detail.value === null ? null : String(e.detail.value) })}
      ><Label>${this.msg.fValue}</Label></groupentermoney--ml-enter-money-br>

      <groupentertext--ml-multiline-text
        name="descricao"
        required
        .rows=${4}
        placeholder=${this.msg.descriptionPlaceholder}
        .value=${details.descricao ?? ''}
        @change=${(e: CustomEvent<{ value: string }>) => patch({ descricao: e.detail.value })}
      ><Label>${this.msg.fDescription}</Label></groupentertext--ml-multiline-text>
    `;
  }

  private renderRegistrar() {
    const draft = this.registrarDespesaDraft;
    const err = this.registrarDespesaError;
    return html`
      <div data-organism-id="formularioDespesa" class="mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-8 pt-2">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.registerHint}</p>
        ${this.renderCampos(draft.details, (p) =>
          this.setRegistrarDespesaDraft({ ...this.registrarDespesaDraft, details: { ...this.registrarDespesaDraft.details, ...p } }))}
        <div aria-live="polite" class="flex flex-col gap-3">
          ${err
            ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}><Message>${err.message}</Message></groupnotifyuser--ml-contextual-feedback>`
            : nothing}
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-variant="primary"
            data-class="w-full"
            .loading=${this.registrarDespesaStatus === 'loading'}
            @action=${() => {
              this.registrarDespesa().then(() => {
                if (this.registrarDespesaStatus === 'success') this.setScenario('detalhe');
              });
            }}
          ><Label>${this.msg.registerExpense}</Label></grouptriggeraction--ml-button-standard>
        </div>
      </div>
    `;
  }

  private renderCorrigir() {
    const draft = this.salvarCorrecaoDraft;
    const err = this.salvarCorrecaoError;
    const motivo = this.despesa?.details.details.motivoRejeicao;
    return html`
      <div data-organism-id="formularioDespesa" class="mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-8 pt-2">
        ${motivo
          ? html`
              <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
                <Title>${this.msg.rejectionTitle}</Title>
                <Message>${motivo}</Message>
              </groupnotifyuser--ml-contextual-feedback>
            `
          : nothing}
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.correctHint}</p>
        ${this.renderCampos(draft.details, (p) =>
          this.setSalvarCorrecaoDraft({ ...this.salvarCorrecaoDraft, details: { ...this.salvarCorrecaoDraft.details, ...p } }))}
        <div aria-live="polite" class="flex flex-col gap-3">
          ${err
            ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}><Message>${err.message}</Message></groupnotifyuser--ml-contextual-feedback>`
            : nothing}
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-variant="primary"
            data-class="w-full"
            .loading=${this.salvarCorrecaoStatus === 'loading'}
            @action=${() => {
              this.salvarCorrecao().then(() => {
                if (this.salvarCorrecaoStatus === 'success') this.setScenario('detalhe');
              });
            }}
          ><Label>${this.msg.saveCorrection}</Label></grouptriggeraction--ml-button-standard>
        </div>
      </div>
    `;
  }
}
