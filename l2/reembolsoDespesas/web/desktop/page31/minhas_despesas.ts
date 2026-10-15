/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page31/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaDetalhe, DespesaResumo, DespesasPage, DespesaStatus, DespesaDetailsDraft, ErrorState } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  sceneBoard: 'Minhas despesas',
  sceneDetail: 'Despesa selecionada',
  sceneNew: 'Nova despesa',
  sceneFix: 'Correção da despesa',
  back: 'Voltar',
  newExpense: 'Registrar despesa',
  filterLabel: 'Filtrar por situação',
  filterAll: 'Todas',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  loadMore: 'Carregar mais despesas',
  loadingList: 'Carregando suas despesas…',
  emptyText: 'Nenhuma despesa por aqui. Registre a primeira para pedir reembolso.',
  errorList: 'Não foi possível carregar suas despesas.',
  retry: 'Tentar novamente',
  loadingDetail: 'Abrindo despesa…',
  errorDetail: 'Não foi possível abrir a despesa.',
  noSelection: 'Escolha uma despesa no quadro para ver os detalhes.',
  submitForApproval: 'Enviar para aprovação',
  resubmit: 'Reenviar para aprovação',
  fixExpense: 'Corrigir despesa',
  sentDone: 'Despesa enviada para aprovação do gestor.',
  resentDone: 'Despesa reenviada para nova análise do gestor.',
  alreadyResent: 'Esta despesa já foi reenviada uma vez e não pode ser reenviada de novo.',
  noActions: 'Nenhuma ação de envio disponível nesta situação.',
  actionError: 'Não foi possível concluir a ação.',
  rejectionTitle: 'Motivo da rejeição',
  factsTitle: 'Dados da despesa',
  fieldDate: 'Data da despesa',
  fieldCategory: 'Categoria',
  fieldValue: 'Valor',
  fieldDescription: 'Descrição',
  fieldStatus: 'Situação',
  fieldResent: 'Reenvio realizado',
  fieldPaidOn: 'Data de pagamento',
  yes: 'Sim',
  no: 'Não',
  datePlaceholder: 'Selecione a data',
  categoryPlaceholder: 'Ex.: Transporte, Alimentação',
  saveCorrection: 'Salvar correção',
  formError: 'Não foi possível salvar a despesa.'
};
const pageMessage_en_us = {
  sceneBoard: 'My expenses',
  sceneDetail: 'Selected expense',
  sceneNew: 'New expense',
  sceneFix: 'Expense correction',
  back: 'Back',
  newExpense: 'Register expense',
  filterLabel: 'Filter by status',
  filterAll: 'All',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  loadMore: 'Load more expenses',
  loadingList: 'Loading your expenses…',
  emptyText: 'No expenses here yet. Register the first one to ask for reimbursement.',
  errorList: 'We could not load your expenses.',
  retry: 'Try again',
  loadingDetail: 'Opening expense…',
  errorDetail: 'We could not open the expense.',
  noSelection: 'Pick an expense on the board to see its details.',
  submitForApproval: 'Submit for approval',
  resubmit: 'Resubmit for approval',
  fixExpense: 'Correct expense',
  sentDone: 'Expense submitted for manager approval.',
  resentDone: 'Expense resubmitted for a new manager review.',
  alreadyResent: 'This expense was already resubmitted once and cannot be resubmitted again.',
  noActions: 'No submit action is available in this status.',
  actionError: 'We could not complete the action.',
  rejectionTitle: 'Rejection reason',
  factsTitle: 'Expense data',
  fieldDate: 'Expense date',
  fieldCategory: 'Category',
  fieldValue: 'Amount',
  fieldDescription: 'Description',
  fieldStatus: 'Status',
  fieldResent: 'Resubmitted',
  fieldPaidOn: 'Payment date',
  yes: 'Yes',
  no: 'No',
  datePlaceholder: 'Select the date',
  categoryPlaceholder: 'E.g.: Transport, Meals',
  saveCorrection: 'Save correction',
  formError: 'We could not save the expense.'
};
const pageMessage_es_es = {
  sceneBoard: 'Mis gastos',
  sceneDetail: 'Gasto seleccionado',
  sceneNew: 'Nuevo gasto',
  sceneFix: 'Corrección del gasto',
  back: 'Volver',
  newExpense: 'Registrar gasto',
  filterLabel: 'Filtrar por estado',
  filterAll: 'Todos',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  loadMore: 'Cargar más gastos',
  loadingList: 'Cargando tus gastos…',
  emptyText: 'Aún no hay gastos. Registra el primero para pedir el reembolso.',
  errorList: 'No fue posible cargar tus gastos.',
  retry: 'Intentar de nuevo',
  loadingDetail: 'Abriendo gasto…',
  errorDetail: 'No fue posible abrir el gasto.',
  noSelection: 'Elige un gasto en el tablero para ver los detalles.',
  submitForApproval: 'Enviar para aprobación',
  resubmit: 'Reenviar para aprobación',
  fixExpense: 'Corregir gasto',
  sentDone: 'Gasto enviado para la aprobación del gestor.',
  resentDone: 'Gasto reenviado para un nuevo análisis del gestor.',
  alreadyResent: 'Este gasto ya fue reenviado una vez y no puede reenviarse de nuevo.',
  noActions: 'No hay acción de envío disponible en este estado.',
  actionError: 'No fue posible completar la acción.',
  rejectionTitle: 'Motivo del rechazo',
  factsTitle: 'Datos del gasto',
  fieldDate: 'Fecha del gasto',
  fieldCategory: 'Categoría',
  fieldValue: 'Valor',
  fieldDescription: 'Descripción',
  fieldStatus: 'Estado',
  fieldResent: 'Reenvío realizado',
  fieldPaidOn: 'Fecha de pago',
  yes: 'Sí',
  no: 'No',
  datePlaceholder: 'Selecciona la fecha',
  categoryPlaceholder: 'Ej.: Transporte, Comidas',
  saveCorrection: 'Guardar corrección',
  formError: 'No fue posible guardar el gasto.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

const FILTERS: (DespesaStatus | null)[] = [null, 'draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

const lang = () => document.documentElement.lang || undefined;

function statusLabel(msg: PageMessageType, s: DespesaStatus | null) {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaiting;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
    default: return msg.filterAll;
  }
}

function statusClass(s: DespesaStatus) {
  switch (s) {
    case 'draft': return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    default: return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
  }
}

function fmtMoney(v: string) {
  const n = Number(v);
  if (v === '' || Number.isNaN(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v?: string | null) {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function toNumber(v: string | null): number | null {
  if (v === null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function rowsOf(p: DespesasPage | null): DespesaResumo[] {
  if (!p) return [];
  if (Array.isArray(p)) return p as DespesaResumo[];
  return (p as unknown as { items?: DespesaResumo[] }).items ?? [];
}

function hasMoreOf(p: DespesasPage | null): boolean {
  if (!p) return false;
  return Boolean((p as unknown as { hasMore?: boolean }).hasMore);
}

function patchDetails<T extends { details: DespesaDetailsDraft }>(d: T, patch: Partial<DespesaDetailsDraft>): T {
  return { ...d, details: { ...d.details, ...patch } };
}

const focusCls = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('reembolso-despesas--web--desktop--page31--minhas_despesas-102047')
export class ReembolsoDespesasDesktopPage31Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg!: PageMessageType;

  private renderFeedback(type: 'success' | 'error', text: string, title?: string) {
    return html`<groupnotifyuser--ml-contextual-feedback type=${type} .visible=${true} .dismissible=${false}>
      ${title ? html`<Title>${title}</Title>` : nothing}
      <Message>${text}</Message>
    </groupnotifyuser--ml-contextual-feedback>`;
  }

  private errorText(e: ErrorState, fallback: string) {
    return e && e.message ? e.message : fallback;
  }

  private renderBoard() {
    const rows = this.despesas ? rowsOf(this.despesas) : [];
    const loading = this.listarMinhasDespesasStatus === 'loading';
    return html`
      <div data-organism-id="listaMinhasDespesas" class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label=${this.msg.filterLabel} class="flex flex-wrap gap-2">
            ${FILTERS.map(f => {
              const active = this.status === f;
              return html`<button type="button" aria-pressed=${active ? 'true' : 'false'}
                class="min-h-[40px] rounded-full border px-4 text-sm font-medium ${focusCls} ${active
                  ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
                  : 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]'}"
                @click=${() => { this.listarMinhasDespesas({ status: f }); }}>${statusLabel(this.msg, f)}</button>`;
            })}
          </div>
          <grouptriggeraction--ml-button-standard size="lg" data-variant="primary" @action=${() => this.setScenario('novo')}>
            <Label>${this.msg.newExpense}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
        ${this.renderBoardBody(rows, loading)}
      </div>`;
  }

  private renderBoardBody(rows: DespesaResumo[], loading: boolean) {
    if (this.pageStatus === 'error' || (this.listarMinhasDespesasError && rows.length === 0)) {
      return html`<div class="flex flex-col items-start gap-3" aria-live="polite">
        <p class="text-[var(--text-default,currentColor)]">${this.errorText(this.listarMinhasDespesasError, this.msg.errorList)}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => { this.listarMinhasDespesas(); }}>
          <Label>${this.msg.retry}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    if (rows.length === 0 && (loading || this.pageStatus === 'loading' || this.pageStatus === 'idle')) {
      return html`<div aria-busy="true" aria-label=${this.msg.loadingList} class="grid grid-cols-2 gap-4 xl:grid-cols-3">
        ${[1, 2, 3, 4, 5, 6].map(() => html`<div class="h-36 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
    }
    if (rows.length === 0) {
      return html`<div class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-[var(--border-default,currentColor)] px-6 py-16 text-center">
        <span class="text-7xl" aria-hidden="true">🧾</span>
        <p class="max-w-md text-lg text-[var(--text-default,currentColor)]">${this.msg.emptyText}</p>
        <grouptriggeraction--ml-button-standard size="lg" data-variant="primary" @action=${() => this.setScenario('novo')}>
          <Label>${this.msg.newExpense}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    return html`
      <ul class="grid grid-cols-2 gap-4 xl:grid-cols-3" aria-busy=${loading ? 'true' : 'false'}>
        ${rows.map(row => {
          const selected = this.selectedDespesa === row.id;
          return html`<li>
            <button type="button"
              class="flex h-full w-full flex-col overflow-hidden rounded-xl border text-left transition-shadow hover:shadow-md bg-[var(--surface-bg,transparent)] ${focusCls} ${selected
                ? 'border-[var(--selected-border,currentColor)] ring-2 ring-[var(--selected-border,currentColor)]'
                : 'border-[var(--border-default,currentColor)]'}"
              aria-current=${selected ? 'true' : 'false'}
              @click=${() => { this.setScenario('despesa'); this.obterDespesa(row.id); }}>
              <span class="block w-full px-4 py-2 text-sm font-semibold uppercase tracking-wide ${statusClass(row.status)}">${statusLabel(this.msg, row.status)}</span>
              <span class="flex flex-col gap-1 p-4">
                <span class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(row.details.details.valor)}</span>
                <span class="text-base text-[var(--text-default,currentColor)]">${row.details.details.categoria}</span>
                <span class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(row.details.details.dataDespesa)}</span>
              </span>
            </button>
          </li>`;
        })}
      </ul>
      ${hasMoreOf(this.despesas) ? html`<div class="flex justify-center">
        <grouptriggeraction--ml-button-standard data-variant="secondary" ?loading=${loading}
          @action=${() => { this.listarMinhasDespesas({ append: true }); }}>
          <Label>${this.msg.loadMore}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>` : nothing}`;
  }

  private renderActions(d: DespesaDetalhe) {
    const sending = this.enviarParaAprovacaoStatus === 'loading';
    const resending = this.reenviarParaAprovacaoStatus === 'loading';
    let body;
    if (this.enviarParaAprovacaoStatus === 'success') {
      body = this.renderFeedback('success', this.msg.sentDone);
    } else if (this.reenviarParaAprovacaoStatus === 'success') {
      body = this.renderFeedback('success', this.msg.resentDone);
    } else {
      const err = this.enviarParaAprovacaoError || this.reenviarParaAprovacaoError;
      let buttons;
      if (d.status === 'draft') {
        buttons = html`<grouptriggeraction--ml-button-standard size="lg" data-variant="primary" ?loading=${sending}
          @action=${() => { this.enviarParaAprovacao(); }}>
          <Label>${this.msg.submitForApproval}</Label>
        </grouptriggeraction--ml-button-standard>`;
      } else if (d.status === 'rejected' && !d.details.details.reenvioRealizado) {
        buttons = html`
          <grouptriggeraction--ml-button-standard size="lg" data-variant="primary" ?loading=${resending}
            @action=${() => { this.reenviarParaAprovacao(); }}>
            <Label>${this.msg.resubmit}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" ?disabled=${resending}
            @action=${() => this.setScenario('correcao')}>
            <Label>${this.msg.fixExpense}</Label>
          </grouptriggeraction--ml-button-standard>`;
      } else if (d.status === 'rejected') {
        buttons = html`<p class="text-[var(--text-muted,currentColor)]">${this.msg.alreadyResent}</p>`;
      } else {
        buttons = html`<p class="text-[var(--text-muted,currentColor)]">${this.msg.noActions}</p>`;
      }
      body = html`
        ${err ? this.renderFeedback('error', this.errorText(err, this.msg.actionError)) : nothing}
        <div class="flex flex-wrap items-center gap-3">${buttons}</div>`;
    }
    return html`<div data-organism-id="acoesEnvio" class="flex flex-col gap-3" aria-live="polite">${body}</div>`;
  }

  private renderDetail() {
    const d = this.despesa;
    if (this.obterDespesaStatus === 'loading') {
      return html`<div aria-busy="true" aria-label=${this.msg.loadingDetail} class="flex flex-col gap-4">
        <div class="h-10 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-16 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-40 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
      </div>`;
    }
    if (this.obterDespesaStatus === 'error') {
      return html`<div class="flex flex-col items-start gap-3" aria-live="polite">
        <p class="text-[var(--text-default,currentColor)]">${this.errorText(this.obterDespesaError, this.msg.errorDetail)}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => { this.obterDespesa(this.selectedDespesa); }}>
          <Label>${this.msg.retry}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    if (!d) return html`<p class="text-[var(--text-muted,currentColor)]">${this.msg.noSelection}</p>`;
    const x = d.details.details;
    return html`
      <div data-organism-id="detalheDespesa" class="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <div class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <div class="px-5 py-2 text-sm font-semibold uppercase tracking-wide ${statusClass(d.status)}">${statusLabel(this.msg, d.status)}</div>
          <div class="flex flex-wrap items-baseline justify-between gap-3 px-5 py-4">
            <span class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${x.categoria}</span>
            <span class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(x.valor)}</span>
          </div>
        </div>
        ${this.renderActions(d)}
        ${d.status === 'rejected' && x.motivoRejeicao
          ? this.renderFeedback('error', x.motivoRejeicao, this.msg.rejectionTitle)
          : nothing}
        <groupviewcard--ml-vertical-card>
          <CardHeader><CardTitle>${this.msg.factsTitle}</CardTitle></CardHeader>
          <CardContent>
            <dl class="grid grid-cols-2 gap-x-6 gap-y-4">
              <div><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fieldDate}</dt><dd class="text-[var(--text-default,currentColor)]">${fmtDate(x.dataDespesa)}</dd></div>
              <div><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fieldStatus}</dt><dd class="text-[var(--text-default,currentColor)]">${statusLabel(this.msg, d.status)}</dd></div>
              <div class="col-span-2"><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fieldDescription}</dt><dd class="whitespace-pre-line text-[var(--text-default,currentColor)]">${x.descricao}</dd></div>
              <div><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fieldResent}</dt><dd class="text-[var(--text-default,currentColor)]">${x.reenvioRealizado ? this.msg.yes : this.msg.no}</dd></div>
              ${x.dataPagamento
                ? html`<div><dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.fieldPaidOn}</dt><dd class="text-[var(--text-default,currentColor)]">${fmtDate(x.dataPagamento)}</dd></div>`
                : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
      </div>`;
  }

  private renderForm(mode: 'novo' | 'correcao') {
    const isNew = mode === 'novo';
    const draft = isNew ? this.registrarDespesaDraft : this.salvarCorrecaoDraft;
    const details = draft.details;
    const busy = (isNew ? this.registrarDespesaStatus : this.salvarCorrecaoStatus) === 'loading';
    const error = isNew ? this.registrarDespesaError : this.salvarCorrecaoError;
    const update = (patch: Partial<DespesaDetailsDraft>) => {
      if (isNew) this.setRegistrarDespesaDraft(patchDetails(this.registrarDespesaDraft, patch));
      else this.setSalvarCorrecaoDraft(patchDetails(this.salvarCorrecaoDraft, patch));
    };
    const submit = () => {
      if (isNew) {
        this.registrarDespesa().then(() => { if (this.registrarDespesaStatus === 'success') this.setScenario('despesa'); });
      } else {
        this.salvarCorrecao().then(() => { if (this.salvarCorrecaoStatus === 'success') this.setScenario('despesa'); });
      }
    };
    return html`
      <div data-organism-id="formularioDespesa" class="mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
        <div class="grid grid-cols-2 gap-4">
          <groupenterdate--ml-date-picker .value=${details.dataDespesa} locale=${lang() ?? ''} placeholder=${this.msg.datePlaceholder}
            ?disabled=${busy} required
            @change=${(e: CustomEvent<{ value: string | null }>) => update({ dataDespesa: e.detail.value })}>
            <Label>${this.msg.fieldDate}</Label>
          </groupenterdate--ml-date-picker>
          <groupentermoney--ml-enter-money-br .value=${toNumber(details.valor)} ?disabled=${busy} required
            @change=${(e: CustomEvent<{ value: number | null }>) => update({ valor: e.detail.value === null ? null : String(e.detail.value) })}>
            <Label>${this.msg.fieldValue}</Label>
          </groupentermoney--ml-enter-money-br>
        </div>
        <groupentertext--ml-enter-text .value=${details.categoria ?? ''} placeholder=${this.msg.categoryPlaceholder} ?disabled=${busy} required
          @change=${(e: CustomEvent<{ value: string }>) => update({ categoria: e.detail.value })}>
          <Label>${this.msg.fieldCategory}</Label>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-multiline-text .value=${details.descricao ?? ''} .rows=${4} ?disabled=${busy} required
          @change=${(e: CustomEvent<{ value: string }>) => update({ descricao: e.detail.value })}>
          <Label>${this.msg.fieldDescription}</Label>
        </groupentertext--ml-multiline-text>
        <div aria-live="polite" class="flex flex-col gap-3">
          ${error ? this.renderFeedback('error', this.errorText(error, this.msg.formError)) : nothing}
          <div>
            <grouptriggeraction--ml-button-standard size="lg" data-variant="primary" ?loading=${busy} @action=${submit}>
              <Label>${isNew ? this.msg.newExpense : this.msg.saveCorrection}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-8 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'quadro'} .backLabel=${this.msg.back}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="quadro" title=${this.msg.sceneBoard}>${this.renderBoard()}</Scene>
          <Scene value="despesa" title=${this.msg.sceneDetail} nav="back" backTo="quadro">${this.renderDetail()}</Scene>
          <Scene value="novo" title=${this.msg.sceneNew} nav="back" backTo="quadro">${this.renderForm('novo')}</Scene>
          <Scene value="correcao" title=${this.msg.sceneFix} nav="back" backTo="despesa">${this.renderForm('correcao')}</Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
