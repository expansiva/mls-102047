/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaDetailsDraft, DespesaResumo, DespesaStatus, DespesasPage } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-card-grid.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  boardTitle: 'Minhas despesas',
  detailTitle: 'Despesa',
  newTitle: 'Nova despesa',
  fixTitle: 'Corrigir despesa',
  back: 'Voltar',
  filterLabel: 'Situação',
  filterAll: 'Todas as situações',
  stDraft: 'Rascunho',
  stAwaiting: 'Aguardando aprovação',
  stRejected: 'Rejeitada',
  stApproved: 'Aprovada',
  stPaid: 'Paga',
  colStatus: 'Situação',
  colCategory: 'Categoria',
  colValue: 'Valor',
  colDate: 'Data da despesa',
  register: 'Registrar despesa',
  loadMore: 'Carregar mais despesas',
  loading: 'Carregando…',
  emptyText: 'Você ainda não tem despesas por aqui. Registre a primeira para pedir reembolso.',
  listError: 'Não foi possível carregar suas despesas.',
  retry: 'Tentar novamente',
  detailError: 'Não foi possível abrir a despesa.',
  detailEmpty: 'Nenhuma despesa aberta.',
  send: 'Enviar para aprovação',
  resubmit: 'Reenviar para aprovação',
  fix: 'Corrigir despesa',
  sentOk: 'Despesa enviada para aprovação do gestor.',
  resentOk: 'Despesa reenviada para nova análise do gestor.',
  alreadyResent: 'Esta despesa já foi reenviada uma vez e não pode ser reenviada de novo.',
  rejectionTitle: 'Motivo da rejeição',
  factsTitle: 'Dados da despesa',
  fDate: 'Data da despesa',
  fDesc: 'Descrição',
  fResent: 'Reenvio realizado',
  fPaid: 'Data de pagamento',
  yes: 'Sim',
  no: 'Não',
  lCategory: 'Categoria',
  lValue: 'Valor',
  lDesc: 'Descrição',
  phCategory: 'Ex.: Transporte, Alimentação',
  phDesc: 'Conte o que foi essa despesa',
  registerBtn: 'Registrar despesa',
  saveFix: 'Salvar correção',
  genericError: 'Não foi possível concluir. Tente novamente.'
};

const pageMessage_en_us = {
  boardTitle: 'My expenses',
  detailTitle: 'Expense',
  newTitle: 'New expense',
  fixTitle: 'Correct expense',
  back: 'Back',
  filterLabel: 'Status',
  filterAll: 'All statuses',
  stDraft: 'Draft',
  stAwaiting: 'Awaiting approval',
  stRejected: 'Rejected',
  stApproved: 'Approved',
  stPaid: 'Paid',
  colStatus: 'Status',
  colCategory: 'Category',
  colValue: 'Amount',
  colDate: 'Expense date',
  register: 'Register expense',
  loadMore: 'Load more expenses',
  loading: 'Loading…',
  emptyText: 'You have no expenses here yet. Register the first one to request a refund.',
  listError: 'We could not load your expenses.',
  retry: 'Try again',
  detailError: 'We could not open the expense.',
  detailEmpty: 'No expense open.',
  send: 'Send for approval',
  resubmit: 'Resubmit for approval',
  fix: 'Correct expense',
  sentOk: 'Expense sent to your manager for approval.',
  resentOk: 'Expense resubmitted for a new manager review.',
  alreadyResent: 'This expense was already resubmitted once and cannot be resubmitted again.',
  rejectionTitle: 'Rejection reason',
  factsTitle: 'Expense details',
  fDate: 'Expense date',
  fDesc: 'Description',
  fResent: 'Resubmitted',
  fPaid: 'Payment date',
  yes: 'Yes',
  no: 'No',
  lCategory: 'Category',
  lValue: 'Amount',
  lDesc: 'Description',
  phCategory: 'E.g. Transport, Meals',
  phDesc: 'Tell what this expense was',
  registerBtn: 'Register expense',
  saveFix: 'Save correction',
  genericError: 'Could not complete. Please try again.'
};

const pageMessage_es_es = {
  boardTitle: 'Mis gastos',
  detailTitle: 'Gasto',
  newTitle: 'Nuevo gasto',
  fixTitle: 'Corregir gasto',
  back: 'Volver',
  filterLabel: 'Situación',
  filterAll: 'Todas las situaciones',
  stDraft: 'Borrador',
  stAwaiting: 'Pendiente de aprobación',
  stRejected: 'Rechazado',
  stApproved: 'Aprobado',
  stPaid: 'Pagado',
  colStatus: 'Situación',
  colCategory: 'Categoría',
  colValue: 'Importe',
  colDate: 'Fecha del gasto',
  register: 'Registrar gasto',
  loadMore: 'Cargar más gastos',
  loading: 'Cargando…',
  emptyText: 'Aún no tienes gastos aquí. Registra el primero para pedir el reembolso.',
  listError: 'No se pudieron cargar tus gastos.',
  retry: 'Intentar de nuevo',
  detailError: 'No se pudo abrir el gasto.',
  detailEmpty: 'Ningún gasto abierto.',
  send: 'Enviar para aprobación',
  resubmit: 'Reenviar para aprobación',
  fix: 'Corregir gasto',
  sentOk: 'Gasto enviado a tu gestor para aprobación.',
  resentOk: 'Gasto reenviado para una nueva revisión del gestor.',
  alreadyResent: 'Este gasto ya fue reenviado una vez y no se puede reenviar de nuevo.',
  rejectionTitle: 'Motivo del rechazo',
  factsTitle: 'Datos del gasto',
  fDate: 'Fecha del gasto',
  fDesc: 'Descripción',
  fResent: 'Reenvío realizado',
  fPaid: 'Fecha de pago',
  yes: 'Sí',
  no: 'No',
  lCategory: 'Categoría',
  lValue: 'Importe',
  lDesc: 'Descripción',
  phCategory: 'Ej.: Transporte, Comidas',
  phDesc: 'Cuenta qué fue este gasto',
  registerBtn: 'Registrar gasto',
  saveFix: 'Guardar corrección',
  genericError: 'No se pudo completar. Inténtalo de nuevo.'
};

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

type ValueEvent<T> = CustomEvent<{ value: T }>;
type PageShape = { items?: DespesaResumo[]; hasMore?: boolean };

const STRIP: Record<DespesaStatus, string> = {
  draft: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  awaitingApproval: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  rejected: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
  approved: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  paid: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]'
};

const STATUSES: DespesaStatus[] = ['draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function rowsOf(p: DespesasPage | null): DespesaResumo[] {
  return (p as unknown as PageShape | null)?.items ?? [];
}

function hasMoreOf(p: DespesasPage | null): boolean {
  return (p as unknown as PageShape | null)?.hasMore === true;
}

function fmtMoney(v: string): string {
  const n = Number(v);
  if (v === '' || Number.isNaN(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v?: string): string {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return v;
  return new Intl.DateTimeFormat(lang()).format(new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

@customElement('reembolso-despesas--web--mobile--page31--minhas_despesas-102047')
export class ReembolsoDespesasMobilePage31Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusText(s: DespesaStatus) {
    const map: Record<DespesaStatus, string> = {
      draft: this.msg['stDraft'],
      awaitingApproval: this.msg['stAwaiting'],
      rejected: this.msg['stRejected'],
      approved: this.msg['stApproved'],
      paid: this.msg['stPaid']
    };
    return map[s];
  }

  private renderStrip(s: DespesaStatus, big: boolean) {
    return html`<div class="w-full px-3 ${big ? 'py-2 text-base' : 'py-1.5 text-sm'} text-center font-semibold uppercase tracking-wide ${STRIP[s]}">${this.statusText(s)}</div>`;
  }

  private renderError(message: string | undefined) {
    return html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
      <Message>${message || this.msg['genericError']}</Message>
    </groupnotifyuser--ml-contextual-feedback>`;
  }

  // ───────────── board ─────────────
  private renderBoard() {
    const rows = rowsOf(this.despesas);
    const isEmpty = this.pageStatus === 'empty';
    return html`
      <div class="flex flex-col gap-4 p-4">
        <div data-organism-id="listaMinhasDespesas" class="flex flex-col gap-4">
          <label class="flex flex-col gap-1 text-sm text-[var(--text-muted,currentColor)]">
            <span>${this.msg['filterLabel']}</span>
            <select
              class="min-h-11 w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-base text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]"
              @change=${(e: Event) => {
                const v = (e.target as HTMLSelectElement).value;
                this.listarMinhasDespesas({ status: v === '' ? null : (v as DespesaStatus) });
              }}>
              <option value="" ?selected=${this.status === null}>${this.msg['filterAll']}</option>
              ${STATUSES.map(s => html`<option value=${s} ?selected=${this.status === s}>${this.statusText(s)}</option>`)}
            </select>
          </label>

          ${this.pageStatus === 'loading' ? this.renderBoardLoading()
            : this.pageStatus === 'error' ? this.renderBoardError()
            : isEmpty ? this.renderBoardEmpty()
            : html`
              <groupviewdata--ml-card-grid
                .hoverable=${true}
                @row-click=${(e: CustomEvent<{ index: number }>) => {
                  const r = rows[e.detail.index];
                  if (r) {
                    this.setScenario('detalhe');
                    this.obterDespesa(r.id);
                  }
                }}>
                <Columns>
                  <Column field="status" header=${this.msg['colStatus']} />
                  <Column field="categoria" header=${this.msg['colCategory']} />
                  <Column field="valor" header=${this.msg['colValue']} />
                  <Column field="dataDespesa" header=${this.msg['colDate']} />
                </Columns>
                <Rows>
                  ${rows.map(r => html`
                    <Row ?selected=${r.id === this.selectedDespesa}>
                      <Cell>${this.renderStrip(r.status, false)}</Cell>
                      <Cell><div class="pt-1 text-base font-medium text-[var(--text-strong,currentColor)]">${r.details.details.categoria}</div></Cell>
                      <Cell><div class="text-2xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(r.details.details.valor)}</div></Cell>
                      <Cell><div class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(r.details.details.dataDespesa)}</div></Cell>
                    </Row>`)}
                </Rows>
              </groupviewdata--ml-card-grid>
              ${hasMoreOf(this.despesas) ? html`
                <button type="button"
                  class="min-h-11 w-full rounded-lg border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-base font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)] disabled:opacity-60"
                  ?disabled=${this.listarMinhasDespesasStatus === 'loading'}
                  aria-busy=${this.listarMinhasDespesasStatus === 'loading' ? 'true' : 'false'}
                  @click=${() => this.listarMinhasDespesas({ append: true })}>
                  ${this.listarMinhasDespesasStatus === 'loading' ? this.msg['loading'] : this.msg['loadMore']}
                </button>` : nothing}
            `}
        </div>
      </div>
      ${isEmpty ? nothing : html`
        <div class="sticky bottom-0 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
          <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.setScenario('registrar')}>
            <Label>${this.msg['register']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`}
    `;
  }

  private renderBoardLoading() {
    return html`
      <div class="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        <span class="sr-only">${this.msg['loading']}</span>
        ${[0, 1, 2].map(() => html`<div class="h-32 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
  }

  private renderBoardError() {
    return html`
      <div class="flex flex-col items-stretch gap-3" aria-live="polite">
        ${this.renderError(this.listarMinhasDespesasError?.message || this.msg['listError'])}
        <button type="button"
          class="min-h-11 w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 text-base font-medium text-[var(--button-primary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]"
          @click=${() => this.listarMinhasDespesas()}>${this.msg['retry']}</button>
      </div>`;
  }

  private renderBoardEmpty() {
    return html`
      <div class="flex flex-col items-center gap-5 px-4 py-12 text-center">
        <svg aria-hidden="true" viewBox="0 0 24 24" class="h-24 w-24 text-[var(--text-muted,currentColor)]" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
          <path d="M9 8h6M9 12h6" />
        </svg>
        <p class="text-lg text-[var(--text-default,currentColor)]">${this.msg['emptyText']}</p>
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.setScenario('registrar')}>
          <Label>${this.msg['register']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  // ───────────── detail ─────────────
  private renderDetalhe() {
    const d = this.despesa;
    if (this.obterDespesaStatus === 'loading') {
      return html`<div class="p-4" aria-busy="true" aria-live="polite">
        <span class="sr-only">${this.msg['loading']}</span>
        <div class="flex flex-col gap-3">
          <div class="h-28 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-14 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-40 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
        </div></div>`;
    }
    if (this.obterDespesaStatus === 'error') {
      return html`<div class="flex flex-col gap-3 p-4" aria-live="polite">
        ${this.renderError(this.obterDespesaError?.message || this.msg['detailError'])}
        <button type="button"
          class="min-h-11 w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 text-base font-medium text-[var(--button-primary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]"
          @click=${() => this.obterDespesa(this.selectedDespesa)}>${this.msg['retry']}</button>
      </div>`;
    }
    if (!d) {
      return html`<p class="p-4 text-[var(--text-muted,currentColor)]">${this.msg['detailEmpty']}</p>`;
    }
    const info = d.details.details;
    return html`
      <div data-organism-id="detalheDespesa" class="flex flex-col gap-4 p-4">
        <div class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          ${this.renderStrip(d.status, true)}
          <div class="flex flex-col gap-1 p-4">
            <p class="text-lg font-medium text-[var(--text-strong,currentColor)]">${info.categoria}</p>
            <p class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(info.valor)}</p>
          </div>
        </div>

        ${this.renderAcoes()}

        ${info.motivoRejeicao ? html`
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
            <Title>${this.msg['rejectionTitle']}</Title>
            <Message>${info.motivoRejeicao}</Message>
          </groupnotifyuser--ml-contextual-feedback>` : nothing}

        <groupviewcard--ml-vertical-card>
          <CardHeader><CardTitle>${this.msg['factsTitle']}</CardTitle></CardHeader>
          <CardContent>
            <dl class="flex flex-col gap-3 text-base">
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fDate']}</dt>
                <dd class="text-[var(--text-default,currentColor)]">${fmtDate(info.dataDespesa)}</dd>
              </div>
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fDesc']}</dt>
                <dd class="whitespace-pre-line break-words text-[var(--text-default,currentColor)]">${info.descricao}</dd>
              </div>
              <div>
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fResent']}</dt>
                <dd class="text-[var(--text-default,currentColor)]">${info.reenvioRealizado ? this.msg['yes'] : this.msg['no']}</dd>
              </div>
              ${info.dataPagamento ? html`
                <div>
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fPaid']}</dt>
                  <dd class="text-[var(--text-default,currentColor)]">${fmtDate(info.dataPagamento)}</dd>
                </div>` : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
      </div>`;
  }

  private renderAcoes() {
    const d = this.despesa;
    if (!d) return nothing;
    const sentOk = this.enviarParaAprovacaoStatus === 'success';
    const resentOk = this.reenviarParaAprovacaoStatus === 'success';
    if (sentOk || resentOk) {
      return html`<div data-organism-id="acoesEnvio" aria-live="polite">
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
          <Message>${sentOk ? this.msg['sentOk'] : this.msg['resentOk']}</Message>
        </groupnotifyuser--ml-contextual-feedback>
      </div>`;
    }
    const canSend = d.status === 'draft';
    const canFix = d.status === 'rejected' && !d.details.details.reenvioRealizado;
    const lockedRejected = d.status === 'rejected' && d.details.details.reenvioRealizado;
    const errorState = this.enviarParaAprovacaoStatus === 'error' ? this.enviarParaAprovacaoError
      : this.reenviarParaAprovacaoStatus === 'error' ? this.reenviarParaAprovacaoError : null;
    return html`
      <div data-organism-id="acoesEnvio" class="flex flex-col gap-3" aria-live="polite">
        ${errorState ? this.renderError(errorState.message) : nothing}
        ${canSend ? html`
          <grouptriggeraction--ml-button-standard size="lg" data-class="w-full"
            .loading=${this.enviarParaAprovacaoStatus === 'loading'}
            @action=${() => this.enviarParaAprovacao()}>
            <Label>${this.msg['send']}</Label>
          </grouptriggeraction--ml-button-standard>` : nothing}
        ${canFix ? html`
          <div class="grid grid-cols-2 gap-2">
            <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" data-class="w-full"
              @action=${() => this.setScenario('corrigir')}>
              <Label>${this.msg['fix']}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard size="lg" data-class="w-full"
              .loading=${this.reenviarParaAprovacaoStatus === 'loading'}
              @action=${() => this.reenviarParaAprovacao()}>
              <Label>${this.msg['resubmit']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}
        ${lockedRejected ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['alreadyResent']}</p>` : nothing}
      </div>`;
  }

  // ───────────── form ─────────────
  private renderFormulario(corrigir: boolean) {
    const d: DespesaDetailsDraft = corrigir ? this.salvarCorrecaoDraft.details : this.registrarDespesaDraft.details;
    const patch = (p: Partial<DespesaDetailsDraft>) => {
      if (corrigir) {
        this.setSalvarCorrecaoDraft({ ...this.salvarCorrecaoDraft, details: { ...this.salvarCorrecaoDraft.details, ...p } });
      } else {
        this.setRegistrarDespesaDraft({ ...this.registrarDespesaDraft, details: { ...this.registrarDespesaDraft.details, ...p } });
      }
    };
    const status = corrigir ? this.salvarCorrecaoStatus : this.registrarDespesaStatus;
    const error = corrigir ? this.salvarCorrecaoError : this.registrarDespesaError;
    const n = d.valor === null || d.valor === '' ? null : Number(d.valor);
    const money = n === null || Number.isNaN(n) ? null : n;
    const motivo = corrigir ? this.despesa?.details.details.motivoRejeicao : undefined;
    const locale = document.documentElement.lang || 'pt-BR';
    return html`
      <div data-organism-id="formularioDespesa" class="flex flex-col gap-4 p-4">
        ${motivo ? html`
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
            <Title>${this.msg['rejectionTitle']}</Title>
            <Message>${motivo}</Message>
          </groupnotifyuser--ml-contextual-feedback>` : nothing}

        <groupenterdate--ml-date-shortcut-picker
          .value=${d.dataDespesa}
          locale=${locale}
          required
          @change=${(e: ValueEvent<string | null>) => patch({ dataDespesa: e.detail.value })}>
          <Label>${this.msg['fDate']}</Label>
        </groupenterdate--ml-date-shortcut-picker>

        <groupentertext--ml-enter-text
          .value=${d.categoria ?? ''}
          placeholder=${this.msg['phCategory']}
          required
          @change=${(e: ValueEvent<string>) => patch({ categoria: e.detail.value })}>
          <Label>${this.msg['lCategory']}</Label>
        </groupentertext--ml-enter-text>

        <groupentermoney--ml-enter-money-br
          .value=${money}
          currency="BRL"
          locale="pt-BR"
          required
          @change=${(e: ValueEvent<number | null>) => patch({ valor: e.detail.value === null ? null : String(e.detail.value) })}>
          <Label>${this.msg['lValue']}</Label>
        </groupentermoney--ml-enter-money-br>

        <groupentertext--ml-multiline-text
          .value=${d.descricao ?? ''}
          .rows=${4}
          placeholder=${this.msg['phDesc']}
          required
          @change=${(e: ValueEvent<string>) => patch({ descricao: e.detail.value })}>
          <Label>${this.msg['lDesc']}</Label>
        </groupentertext--ml-multiline-text>

        <div aria-live="polite">
          ${status === 'error' ? this.renderError(error?.message) : nothing}
        </div>
      </div>
      <div class="sticky bottom-0 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full"
          .loading=${status === 'loading'}
          @action=${() => {
            if (corrigir) {
              this.salvarCorrecao().then(() => {
                if (this.salvarCorrecaoStatus === 'success') this.setScenario('detalhe');
              });
            } else {
              this.registrarDespesa().then(() => {
                if (this.registrarDespesaStatus === 'success') this.setScenario('detalhe');
              });
            }
          }}>
          <Label>${corrigir ? this.msg['saveFix'] : this.msg['registerBtn']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['back']}
          .value=${this.scenary || 'board'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}>
          <Scene value="board" title=${this.msg['boardTitle']}>
            ${this.renderBoard()}
          </Scene>
          <Scene value="detalhe" title=${this.msg['detailTitle']} nav="back" backTo="board">
            ${this.renderDetalhe()}
          </Scene>
          <Scene value="registrar" title=${this.msg['newTitle']} nav="back" backTo="board">
            ${this.renderFormulario(false)}
          </Scene>
          <Scene value="corrigir" title=${this.msg['fixTitle']} nav="back" backTo="detalhe">
            ${this.renderFormulario(true)}
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
