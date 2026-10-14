/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaResumo, DespesasPage, DespesaStatus, DespesaDetailsDraft } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Minhas despesas',
  sceneList: 'Situação das despesas',
  sceneNew: 'Dados da nova despesa',
  sceneFix: 'Correção da despesa rejeitada',
  back: 'Voltar',
  newExpense: 'Nova despesa',
  filterLabel: 'Filtrar por situação',
  filterAll: 'Todas',
  stDraft: 'Rascunho',
  stAwaiting: 'Aguardando aprovação',
  stRejected: 'Rejeitada',
  stApproved: 'Aprovada',
  stPaid: 'Paga',
  colDate: 'Data da despesa',
  colCategory: 'Categoria',
  colValue: 'Valor',
  colStatus: 'Situação',
  emptyList: 'Nenhuma despesa encontrada nesta situação.',
  loadMore: 'Mostrar mais despesas',
  listError: 'Não foi possível carregar suas despesas.',
  retry: 'Tentar novamente',
  pickPrompt: 'Escolha uma despesa na lista para ver os dados e a situação.',
  loadingDetail: 'Abrindo a despesa…',
  detailError: 'Não foi possível abrir a despesa.',
  factValue: 'Valor solicitado',
  factDate: 'Data da despesa',
  factPaid: 'Data de pagamento',
  narrative: 'Descrição',
  trail: 'Andamento',
  resubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  rejectionTitle: 'Motivo da rejeição',
  hintDraft: 'Esta despesa ainda é um rascunho. Ao enviar, o gestor passa a analisá-la.',
  hintRejected: 'Corrija os dados, se precisar, e reenvie. O reenvio só pode ser feito uma vez.',
  btnSend: 'Enviar para aprovação',
  btnFix: 'Corrigir dados',
  btnResend: 'Reenviar para aprovação',
  sentOk: 'Despesa enviada para aprovação do gestor.',
  resentOk: 'Despesa reenviada para uma nova análise do gestor.',
  noteResubmitted: 'Esta despesa já foi reenviada uma vez e não pode ser reenviada de novo.',
  noteAwaiting: 'Aguardando a análise do gestor.',
  noteApproved: 'Aprovada pelo gestor.',
  notePaid: 'Reembolso pago.',
  fDate: 'Data da despesa',
  fCategory: 'Categoria',
  fCategoryPh: 'Ex.: Transporte',
  fValue: 'Valor',
  fDescription: 'Descrição',
  requiredHint: 'Todos os campos são obrigatórios.',
  registerHint: 'A despesa é registrada como rascunho; depois você a envia para aprovação.',
  fixHint: 'Ajuste os dados da despesa rejeitada. Depois de salvar, reenvie para aprovação.',
  btnRegister: 'Registrar despesa',
  btnSaveFix: 'Salvar correção',
  cancel: 'Cancelar',
};
const pageMessage_en_us: typeof pageMessage_pt_br = {
  pageTitle: 'My expenses',
  sceneList: 'Expense status',
  sceneNew: 'New expense details',
  sceneFix: 'Correcting the rejected expense',
  back: 'Back',
  newExpense: 'New expense',
  filterLabel: 'Filter by status',
  filterAll: 'All',
  stDraft: 'Draft',
  stAwaiting: 'Awaiting approval',
  stRejected: 'Rejected',
  stApproved: 'Approved',
  stPaid: 'Paid',
  colDate: 'Expense date',
  colCategory: 'Category',
  colValue: 'Amount',
  colStatus: 'Status',
  emptyList: 'No expenses found for this status.',
  loadMore: 'Show more expenses',
  listError: 'Your expenses could not be loaded.',
  retry: 'Try again',
  pickPrompt: 'Pick an expense from the list to see its details and status.',
  loadingDetail: 'Opening the expense…',
  detailError: 'The expense could not be opened.',
  factValue: 'Requested amount',
  factDate: 'Expense date',
  factPaid: 'Payment date',
  narrative: 'Description',
  trail: 'Progress',
  resubmitted: 'Resubmitted',
  yes: 'Yes',
  no: 'No',
  rejectionTitle: 'Rejection reason',
  hintDraft: 'This expense is still a draft. Once sent, your manager starts reviewing it.',
  hintRejected: 'Correct the data if needed and resend. Resubmission can only be done once.',
  btnSend: 'Send for approval',
  btnFix: 'Correct details',
  btnResend: 'Resend for approval',
  sentOk: 'Expense sent for your manager’s approval.',
  resentOk: 'Expense resent for a new manager review.',
  noteResubmitted: 'This expense was already resubmitted once and cannot be resubmitted again.',
  noteAwaiting: 'Waiting for the manager’s review.',
  noteApproved: 'Approved by the manager.',
  notePaid: 'Reimbursement paid.',
  fDate: 'Expense date',
  fCategory: 'Category',
  fCategoryPh: 'E.g.: Transport',
  fValue: 'Amount',
  fDescription: 'Description',
  requiredHint: 'All fields are required.',
  registerHint: 'The expense is registered as a draft; then you send it for approval.',
  fixHint: 'Adjust the rejected expense. After saving, resend it for approval.',
  btnRegister: 'Register expense',
  btnSaveFix: 'Save correction',
  cancel: 'Cancel',
};
const pageMessage_es_es: typeof pageMessage_pt_br = {
  pageTitle: 'Mis gastos',
  sceneList: 'Situación de los gastos',
  sceneNew: 'Datos del nuevo gasto',
  sceneFix: 'Corrección del gasto rechazado',
  back: 'Volver',
  newExpense: 'Nuevo gasto',
  filterLabel: 'Filtrar por situación',
  filterAll: 'Todos',
  stDraft: 'Borrador',
  stAwaiting: 'Pendiente de aprobación',
  stRejected: 'Rechazado',
  stApproved: 'Aprobado',
  stPaid: 'Pagado',
  colDate: 'Fecha del gasto',
  colCategory: 'Categoría',
  colValue: 'Importe',
  colStatus: 'Situación',
  emptyList: 'No hay gastos en esta situación.',
  loadMore: 'Mostrar más gastos',
  listError: 'No se pudieron cargar tus gastos.',
  retry: 'Intentar de nuevo',
  pickPrompt: 'Elige un gasto de la lista para ver sus datos y su situación.',
  loadingDetail: 'Abriendo el gasto…',
  detailError: 'No se pudo abrir el gasto.',
  factValue: 'Importe solicitado',
  factDate: 'Fecha del gasto',
  factPaid: 'Fecha de pago',
  narrative: 'Descripción',
  trail: 'Seguimiento',
  resubmitted: 'Reenvío realizado',
  yes: 'Sí',
  no: 'No',
  rejectionTitle: 'Motivo del rechazo',
  hintDraft: 'Este gasto sigue en borrador. Al enviarlo, el gestor empieza a revisarlo.',
  hintRejected: 'Corrige los datos si hace falta y reenvía. El reenvío solo se puede hacer una vez.',
  btnSend: 'Enviar para aprobación',
  btnFix: 'Corregir datos',
  btnResend: 'Reenviar para aprobación',
  sentOk: 'Gasto enviado para la aprobación del gestor.',
  resentOk: 'Gasto reenviado para una nueva revisión del gestor.',
  noteResubmitted: 'Este gasto ya fue reenviado una vez y no se puede reenviar de nuevo.',
  noteAwaiting: 'A la espera de la revisión del gestor.',
  noteApproved: 'Aprobado por el gestor.',
  notePaid: 'Reembolso pagado.',
  fDate: 'Fecha del gasto',
  fCategory: 'Categoría',
  fCategoryPh: 'Ej.: Transporte',
  fValue: 'Importe',
  fDescription: 'Descripción',
  requiredHint: 'Todos los campos son obligatorios.',
  registerHint: 'El gasto se registra como borrador; después lo envías para aprobación.',
  fixHint: 'Ajusta el gasto rechazado. Tras guardar, reenvíalo para aprobación.',
  btnRegister: 'Registrar gasto',
  btnSaveFix: 'Guardar corrección',
  cancel: 'Cancelar',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

const chipBase = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ';
const chipClass: Record<DespesaStatus, string> = {
  draft: chipBase + 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  awaitingApproval: chipBase + 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  rejected: chipBase + 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
  approved: chipBase + 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  paid: chipBase + 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
};
const filterOptions: Array<DespesaStatus | null> = [null, 'draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

const own = (e: Event) => e.target === e.currentTarget;
const docLang = () => document.documentElement.lang || undefined;

function rowsOf(p: DespesasPage | null): DespesaResumo[] {
  if (!p) return [];
  const o = p as unknown as DespesaResumo[] | { items?: DespesaResumo[] };
  return Array.isArray(o) ? o : o.items ?? [];
}
function hasMoreOf(p: DespesasPage | null): boolean {
  return !!(p as unknown as { hasMore?: boolean } | null)?.hasMore;
}
function fmtDate(v: string | null | undefined): string {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return v;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(docLang(), { dateStyle: 'medium' }).format(d);
}
function fmtMoney(v: string | null | undefined): string {
  if (v == null || v === '') return '';
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return new Intl.NumberFormat(docLang(), { style: 'currency', currency: 'BRL' }).format(n);
}
function toNum(v: string | null): number | null {
  if (v == null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

@customElement('reembolso-despesas--web--desktop--page11--minhas_despesas-102047')
export class ReembolsoDespesasDesktopPage11Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg!: PageMessageType;

  private statusLabel(s: DespesaStatus) {
    switch (s) {
      case 'draft': return this.msg.stDraft;
      case 'awaitingApproval': return this.msg.stAwaiting;
      case 'rejected': return this.msg.stRejected;
      case 'approved': return this.msg.stApproved;
      default: return this.msg.stPaid;
    }
  }

  private chip(s: DespesaStatus) {
    return html`<span class=${chipClass[s]}>${this.statusLabel(s)}</span>`;
  }

  private renderFilters() {
    return html`
      <div class="flex flex-wrap items-center gap-2" role="group" aria-label=${this.msg.filterLabel}>
        ${filterOptions.map((opt) => {
          const active = this.status === opt;
          const cls = active
            ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
            : 'bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]';
          return html`<button type="button" aria-pressed=${active ? 'true' : 'false'}
            class="min-h-9 rounded-full border px-3 text-sm focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${cls}"
            @click=${() => { this.listarMinhasDespesas({ status: opt }); }}>
            ${opt === null ? this.msg.filterAll : this.statusLabel(opt)}
          </button>`;
        })}
      </div>`;
  }

  private renderList() {
    const rows = rowsOf(this.despesas);
    const idx = this.selectedDespesa ? rows.findIndex((r) => r.id === this.selectedDespesa) : -1;
    const failed = this.pageStatus === 'error' || this.listarMinhasDespesasStatus === 'error';
    return html`
      <div data-organism-id="listaMinhasDespesas" class="flex flex-col gap-3">
        ${failed
          ? html`<div class="rounded-lg border border-[var(--border-default,currentColor)] p-4 flex items-center justify-between gap-3" role="alert">
              <p class="text-sm text-[var(--text-default,currentColor)]">${this.listarMinhasDespesasError?.message || this.msg.listError}</p>
              <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary" @action=${() => { this.listarMinhasDespesas(); }}>
                <Label>${this.msg.retry}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : html`
          <groupviewtable--ml-data-table
            value=${idx >= 0 ? String(idx) : ''}
            ?loading=${this.listarMinhasDespesasStatus === 'loading' && rows.length === 0}
            @rowClick=${(e: CustomEvent<{ index: number }>) => {
              const r = rows[e.detail.index];
              if (r) this.obterDespesa(r.id);
            }}>
            <TableHeader>
              <TableRow>
                <TableHead key="dataDespesa">${this.msg.colDate}</TableHead>
                <TableHead key="categoria">${this.msg.colCategory}</TableHead>
                <TableHead key="valor">${this.msg.colValue}</TableHead>
                <TableHead key="status">${this.msg.colStatus}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              ${rows.map((r) => html`
                <TableRow key=${r.id}>
                  <TableCell>${fmtDate(r.details.details.dataDespesa)}</TableCell>
                  <TableCell>${r.details.details.categoria}</TableCell>
                  <TableCell>${fmtMoney(r.details.details.valor)}</TableCell>
                  <TableCell>${this.chip(r.status)}</TableCell>
                </TableRow>`)}
            </TableBody>
            <Empty>${this.msg.emptyList}</Empty>
          </groupviewtable--ml-data-table>
          ${hasMoreOf(this.despesas)
            ? html`<div class="flex justify-center">
                <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary"
                  ?loading=${this.listarMinhasDespesasStatus === 'loading'}
                  @action=${() => { this.listarMinhasDespesas({ append: true }); }}>
                  <Label>${this.msg.loadMore}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>`
            : nothing}`}
      </div>`;
  }

  private renderDetail() {
    const d = this.despesa;
    let body;
    if (this.obterDespesaStatus === 'loading') {
      body = html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-busy="true" aria-live="polite">${this.msg.loadingDetail}</p>`;
    } else if (this.obterDespesaStatus === 'error') {
      body = html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${this.obterDespesaError?.message || this.msg.detailError}</p>`;
    } else if (!d) {
      body = html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.pickPrompt}</p>`;
    } else {
      const x = d.details.details;
      body = html`
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${x.categoria}</CardTitle>
            <CardDescription>${fmtDate(x.dataDespesa)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-5 pt-2">
              <div>${this.chip(d.status)}</div>
              <dl class="grid grid-cols-2 gap-4">
                <div>
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.factValue}</dt>
                  <dd class="text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(x.valor)}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.factDate}</dt>
                  <dd class="text-base text-[var(--text-strong,currentColor)]">${fmtDate(x.dataDespesa)}</dd>
                </div>
                ${x.dataPagamento
                  ? html`<div>
                      <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.factPaid}</dt>
                      <dd class="text-base text-[var(--text-strong,currentColor)]">${fmtDate(x.dataPagamento)}</dd>
                    </div>`
                  : nothing}
              </dl>
              <div>
                <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.narrative}</p>
                <p class="mt-1 whitespace-pre-line text-sm text-[var(--text-default,currentColor)]">${x.descricao}</p>
              </div>
              <div class="border-t border-[var(--border-subtle,currentColor)] pt-3 flex flex-col gap-3">
                <p class="text-sm text-[var(--text-muted,currentColor)]">
                  ${this.msg.resubmitted}: ${x.reenvioRealizado ? this.msg.yes : this.msg.no}
                </p>
                ${x.motivoRejeicao
                  ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}>
                      <Title>${this.msg.rejectionTitle}</Title>
                      <Message>${x.motivoRejeicao}</Message>
                    </groupnotifyuser--ml-contextual-feedback>`
                  : nothing}
              </div>
            </div>
          </CardContent>
        </groupviewcard--ml-vertical-card>`;
    }
    return html`<div data-organism-id="detalheDespesa">${body}</div>`;
  }

  private renderActions() {
    const d = this.despesa;
    let body = nothing as unknown;
    if (d) {
      if (d.status === 'draft') {
        const busy = this.enviarParaAprovacaoStatus === 'loading';
        body = html`
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.hintDraft}</p>
          ${this.enviarParaAprovacaoStatus === 'error'
            ? html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${this.enviarParaAprovacaoError?.message}</p>`
            : nothing}
          <div>
            <grouptriggeraction--ml-button-standard data-variant="primary" ?loading=${busy} ?disabled=${busy}
              @action=${() => { this.enviarParaAprovacao(); }}>
              <Label>${this.msg.btnSend}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`;
      } else if (d.status === 'rejected' && !d.details.details.reenvioRealizado) {
        const busy = this.reenviarParaAprovacaoStatus === 'loading';
        body = html`
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.hintRejected}</p>
          ${this.reenviarParaAprovacaoStatus === 'error'
            ? html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${this.reenviarParaAprovacaoError?.message}</p>`
            : nothing}
          <div class="flex flex-wrap gap-3">
            <grouptriggeraction--ml-button-standard data-variant="secondary" ?disabled=${busy}
              @action=${() => { this.setScenario('corrigir'); }}>
              <Label>${this.msg.btnFix}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard data-variant="primary" ?loading=${busy} ?disabled=${busy}
              @action=${() => { this.reenviarParaAprovacao(); }}>
              <Label>${this.msg.btnResend}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`;
      } else {
        let note: string = this.msg.noteAwaiting;
        if (d.status === 'rejected') note = this.msg.noteResubmitted;
        else if (d.status === 'approved') note = this.msg.noteApproved;
        else if (d.status === 'paid') note = this.msg.notePaid;
        const sent = d.status === 'awaitingApproval' && (this.enviarParaAprovacaoStatus === 'success' || this.reenviarParaAprovacaoStatus === 'success');
        body = html`
          ${sent
            ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
                <Message>${this.reenviarParaAprovacaoStatus === 'success' ? this.msg.resentOk : this.msg.sentOk}</Message>
              </groupnotifyuser--ml-contextual-feedback>`
            : nothing}
          <p class="text-sm text-[var(--text-muted,currentColor)]">${note}</p>`;
      }
    }
    return html`<div data-organism-id="acoesEnvio" class="flex flex-col gap-3 ${d ? 'border-t border-[var(--border-default,currentColor)] pt-4' : ''}" aria-live="polite">${body}</div>`;
  }

  private renderForm(kind: 'new' | 'fix') {
    const isNew = kind === 'new';
    const draft: DespesaDetailsDraft = isNew ? this.registrarDespesaDraft.details : this.salvarCorrecaoDraft.details;
    const patch = (p: Partial<DespesaDetailsDraft>) => {
      if (isNew) {
        const c = this.registrarDespesaDraft;
        this.setRegistrarDespesaDraft({ ...c, details: { ...c.details, ...p } });
      } else {
        const c = this.salvarCorrecaoDraft;
        this.setSalvarCorrecaoDraft({ ...c, details: { ...c.details, ...p } });
      }
    };
    const status = isNew ? this.registrarDespesaStatus : this.salvarCorrecaoStatus;
    const error = isNew ? this.registrarDespesaError : this.salvarCorrecaoError;
    const busy = status === 'loading';
    const submit = () => {
      if (isNew) {
        this.registrarDespesa().then(() => { if (this.registrarDespesaStatus === 'success') this.setScenario('acompanhamento'); });
      } else {
        this.salvarCorrecao().then(() => { if (this.salvarCorrecaoStatus === 'success') this.setScenario('acompanhamento'); });
      }
    };
    const lang = docLang() || '';
    return html`
      <div data-organism-id="formularioDespesa" class="max-w-2xl flex flex-col gap-5">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${isNew ? this.msg.registerHint : this.msg.fixHint} ${this.msg.requiredHint}</p>
        <div class="grid grid-cols-2 gap-4">
          <groupenterdate--ml-date-picker data-class="w-full" required ?disabled=${busy} locale=${lang}
            .value=${draft.dataDespesa}
            @change=${(e: CustomEvent<{ value: string | null }>) => { if (own(e)) patch({ dataDespesa: e.detail.value }); }}>
            <Label>${this.msg.fDate}</Label>
          </groupenterdate--ml-date-picker>
          <groupentermoney--ml-enter-money-br data-class="w-full" required ?disabled=${busy}
            .value=${toNum(draft.valor)}
            @change=${(e: CustomEvent<{ value: number | null }>) => { if (own(e)) patch({ valor: e.detail.value == null ? null : String(e.detail.value) }); }}>
            <Label>${this.msg.fValue}</Label>
          </groupentermoney--ml-enter-money-br>
        </div>
        <groupentertext--ml-enter-text data-class="w-full" required ?disabled=${busy}
          placeholder=${this.msg.fCategoryPh}
          .value=${draft.categoria ?? ''}
          @change=${(e: CustomEvent<{ value: string }>) => { if (own(e)) patch({ categoria: e.detail.value }); }}>
          <Label>${this.msg.fCategory}</Label>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-multiline-text data-class="w-full" required ?disabled=${busy} .rows=${4}
          .value=${draft.descricao ?? ''}
          @change=${(e: CustomEvent<{ value: string }>) => { if (own(e)) patch({ descricao: e.detail.value }); }}>
          <Label>${this.msg.fDescription}</Label>
        </groupentertext--ml-multiline-text>
        ${status === 'error'
          ? html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${error?.message}</p>`
          : nothing}
        <div class="flex gap-3">
          <grouptriggeraction--ml-button-standard data-variant="primary" ?loading=${busy} ?disabled=${busy} @action=${submit}>
            <Label>${isNew ? this.msg.btnRegister : this.msg.btnSaveFix}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="ghost" ?disabled=${busy}
            @action=${() => { this.setScenario('acompanhamento'); }}>
            <Label>${this.msg.cancel}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full p-6 flex flex-col gap-5 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
        <molecules--ml-scenary-102020 mode="scenary" .backLabel=${this.msg.back}
          .value=${this.scenary || 'acompanhamento'}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="acompanhamento" title=${this.msg.sceneList}>
            <div class="flex flex-col gap-5">
              <div class="flex flex-wrap items-center justify-between gap-3">
                ${this.renderFilters()}
                <grouptriggeraction--ml-button-standard data-variant="primary" @action=${() => { this.setScenario('registrar'); }}>
                  <Label>${this.msg.newExpense}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
              <div class="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start gap-6">
                ${this.renderList()}
                <section class="flex flex-col gap-4 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-5" data-organism-id="despesaSelecionada" aria-busy=${this.obterDespesaStatus === 'loading' ? 'true' : 'false'}>
                  ${this.renderDetail()}
                  ${this.renderActions()}
                </section>
              </div>
            </div>
          </Scene>
          <Scene value="registrar" title=${this.msg.sceneNew} nav="back" backTo="acompanhamento">
            ${this.renderForm('new')}
          </Scene>
          <Scene value="corrigir" title=${this.msg.sceneFix} nav="back" backTo="acompanhamento">
            ${this.renderForm('fix')}
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
