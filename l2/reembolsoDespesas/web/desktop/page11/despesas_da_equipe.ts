/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { ColaboradorNome } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Despesas da equipe',
  pageIntro: 'Escolha uma despesa pendente, leia os dados e registre a sua decisão.',
  queueHeading: 'Aguardando aprovação',
  colColaborador: 'Colaborador',
  colData: 'Data da despesa',
  colCategoria: 'Categoria',
  colValor: 'Valor',
  colStatus: 'Situação',
  loadingQueue: 'Carregando as despesas da equipe…',
  emptyQueue: 'Nenhuma despesa da equipe aguarda aprovação.',
  errorQueue: 'Não foi possível carregar as despesas da equipe.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  pickPrompt: 'Escolha uma despesa na fila para ler os detalhes e decidir.',
  analysisLoading: 'Carregando a despesa…',
  analysisError: 'Não foi possível carregar esta despesa.',
  expenseOf: 'Despesa de',
  factDate: 'Data da despesa',
  factCategory: 'Categoria',
  factAmount: 'Valor',
  narrativeHeading: 'Descrição',
  trailHeading: 'Histórico da despesa',
  resubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  previousReason: 'Motivo da rejeição anterior',
  decisionHeading: 'Sua decisão',
  inertHint: 'A decisão fica disponível depois que você escolher uma despesa.',
  approve: 'Aprovar despesa',
  rejectOpen: 'Rejeitar informando o motivo',
  reasonLabel: 'Motivo da rejeição',
  reasonHelper: 'Obrigatório para rejeitar. O colaborador verá este motivo.',
  reasonRequired: 'Informe o motivo para rejeitar a despesa.',
  reject: 'Rejeitar despesa',
  running: 'Registrando a decisão…',
  decisionFailed: 'Não foi possível registrar a decisão. Nada foi perdido, tente novamente.',
  confirmTitle: 'Confirmar aprovação',
  confirmLead: 'Você vai aprovar a despesa de',
  confirmNote: 'Depois de aprovada, ela segue para o financeiro.',
  back: 'Voltar',
  approvedStatement: 'Despesa aprovada. Ela segue para o financeiro.',
  rejectedStatement: 'Despesa rejeitada. O motivo foi enviado ao colaborador.',
  otherStatement: 'Esta despesa não está mais aguardando aprovação. Situação atual:',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga'
};
const pageMessage_en_us: typeof pageMessage_pt_br = {
  pageTitle: 'Team expenses',
  pageIntro: 'Pick a pending expense, read its details and record your decision.',
  queueHeading: 'Awaiting approval',
  colColaborador: 'Employee',
  colData: 'Expense date',
  colCategoria: 'Category',
  colValor: 'Amount',
  colStatus: 'Status',
  loadingQueue: 'Loading team expenses…',
  emptyQueue: 'No team expense is awaiting approval.',
  errorQueue: 'The team expenses could not be loaded.',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  pickPrompt: 'Choose an expense in the queue to read its details and decide.',
  analysisLoading: 'Loading the expense…',
  analysisError: 'This expense could not be loaded.',
  expenseOf: 'Expense from',
  factDate: 'Expense date',
  factCategory: 'Category',
  factAmount: 'Amount',
  narrativeHeading: 'Description',
  trailHeading: 'Expense history',
  resubmitted: 'Resubmitted',
  yes: 'Yes',
  no: 'No',
  previousReason: 'Previous rejection reason',
  decisionHeading: 'Your decision',
  inertHint: 'The decision becomes available once you choose an expense.',
  approve: 'Approve expense',
  rejectOpen: 'Reject and give a reason',
  reasonLabel: 'Rejection reason',
  reasonHelper: 'Required to reject. The employee will see this reason.',
  reasonRequired: 'Enter the reason to reject the expense.',
  reject: 'Reject expense',
  running: 'Recording the decision…',
  decisionFailed: 'The decision could not be recorded. Nothing was lost, please try again.',
  confirmTitle: 'Confirm approval',
  confirmLead: 'You are about to approve the expense from',
  confirmNote: 'Once approved, it goes on to finance.',
  back: 'Go back',
  approvedStatement: 'Expense approved. It goes on to finance.',
  rejectedStatement: 'Expense rejected. The reason was sent to the employee.',
  otherStatement: 'This expense is no longer awaiting approval. Current status:',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid'
};
const pageMessage_es_es: typeof pageMessage_pt_br = {
  pageTitle: 'Gastos del equipo',
  pageIntro: 'Elija un gasto pendiente, lea sus datos y registre su decisión.',
  queueHeading: 'Pendientes de aprobación',
  colColaborador: 'Colaborador',
  colData: 'Fecha del gasto',
  colCategoria: 'Categoría',
  colValor: 'Importe',
  colStatus: 'Situación',
  loadingQueue: 'Cargando los gastos del equipo…',
  emptyQueue: 'Ningún gasto del equipo espera aprobación.',
  errorQueue: 'No se pudieron cargar los gastos del equipo.',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  pickPrompt: 'Elija un gasto en la cola para leer los detalles y decidir.',
  analysisLoading: 'Cargando el gasto…',
  analysisError: 'No se pudo cargar este gasto.',
  expenseOf: 'Gasto de',
  factDate: 'Fecha del gasto',
  factCategory: 'Categoría',
  factAmount: 'Importe',
  narrativeHeading: 'Descripción',
  trailHeading: 'Historial del gasto',
  resubmitted: 'Reenvío realizado',
  yes: 'Sí',
  no: 'No',
  previousReason: 'Motivo del rechazo anterior',
  decisionHeading: 'Su decisión',
  inertHint: 'La decisión estará disponible cuando elija un gasto.',
  approve: 'Aprobar gasto',
  rejectOpen: 'Rechazar indicando el motivo',
  reasonLabel: 'Motivo del rechazo',
  reasonHelper: 'Obligatorio para rechazar. El colaborador verá este motivo.',
  reasonRequired: 'Indique el motivo para rechazar el gasto.',
  reject: 'Rechazar gasto',
  running: 'Registrando la decisión…',
  decisionFailed: 'No se pudo registrar la decisión. No se perdió nada, inténtelo de nuevo.',
  confirmTitle: 'Confirmar aprobación',
  confirmLead: 'Va a aprobar el gasto de',
  confirmNote: 'Una vez aprobado, pasa a finanzas.',
  back: 'Volver',
  approvedStatement: 'Gasto aprobado. Pasa a finanzas.',
  rejectedStatement: 'Gasto rechazado. El motivo fue enviado al colaborador.',
  otherStatement: 'Este gasto ya no espera aprobación. Situación actual:',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

type DespesaStatus = 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';

function statusLabel(m: PageMessageType, s: DespesaStatus): string {
  switch (s) {
    case 'draft': return m.statusDraft;
    case 'awaitingApproval': return m.statusAwaiting;
    case 'rejected': return m.statusRejected;
    case 'approved': return m.statusApproved;
    default: return m.statusPaid;
  }
}

function statusClasses(s: DespesaStatus): string {
  switch (s) {
    case 'awaitingApproval':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'approved':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'rejected':
      return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function nameOf(c: ColaboradorNome): string {
  return c.details.identification.details.identification.name;
}

function formatDate(s: string): string {
  const t = Date.parse(s);
  if (Number.isNaN(t)) return s;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(t));
}

@customElement('reembolso-despesas--web--desktop--page11--despesas_da_equipe-102047')
export class ReembolsoDespesasDesktopPage11Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private chip(s: DespesaStatus) {
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses(s)}">${statusLabel(this.msg, s)}</span>`;
  }

  private renderQueue() {
    const items = this.despesas?.items ?? [];
    const selectedIdx = items.findIndex((i) => i.id === this.selectedDespesa);
    const status = this.pageStatus;
    let body;
    if (status === 'loading' || status === 'idle') {
      body = html`<div class="space-y-2" aria-busy="true" aria-live="polite">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.loadingQueue}</p>
        ${[0, 1, 2, 3].map(() => html`<div class="h-11 animate-pulse rounded-md bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
    } else if (status === 'error') {
      body = html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
        <Message>${this.msg.errorQueue}</Message>
        <Action><button type="button" class="underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.listarDespesasPendentesEquipe()}>${this.msg.retry}</button></Action>
      </groupnotifyuser--ml-contextual-feedback>`;
    } else if (status === 'empty' || items.length === 0) {
      body = html`<p class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.emptyQueue}</p>`;
    } else {
      body = html`
        <groupviewtable--ml-data-table
          .value=${selectedIdx < 0 ? '' : String(selectedIdx)}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const it = items[e.detail.index];
            if (it) this.selectDespesa(it.id);
          }}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="colaborador">${this.msg.colColaborador}</TableHead>
              <TableHead key="data">${this.msg.colData}</TableHead>
              <TableHead key="categoria">${this.msg.colCategoria}</TableHead>
              <TableHead key="valor">${this.msg.colValor}</TableHead>
              <TableHead key="status">${this.msg.colStatus}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map((i) => html`
              <TableRow key=${i.id}>
                <TableCell>${nameOf(i.colaborador)}</TableCell>
                <TableCell sort-value=${i.details.details.dataDespesa}>${formatDate(i.details.details.dataDespesa)}</TableCell>
                <TableCell>${i.details.details.categoria}</TableCell>
                <TableCell>${i.details.details.valor}</TableCell>
                <TableCell>${statusLabel(this.msg, i.status)}</TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>${this.msg.emptyQueue}</Empty>
        </groupviewtable--ml-data-table>
        ${this.despesas?.hasMore ? html`
          <div class="mt-4 flex justify-center">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
              .loading=${this.listarDespesasPendentesEquipeStatus === 'loading'}
              @action=${() => this.listarDespesasPendentesEquipe(undefined, true)}>
              <Label>${this.msg.loadMore}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}`;
    }
    return html`
      <div data-organism-id="despesasPendentes" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
        <h2 class="mb-4 text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.queueHeading}</h2>
        ${body}
      </div>`;
  }

  private renderAnalysis() {
    const d = this.despesa;
    let inner;
    if (this.obterDespesaParaAnaliseStatus === 'loading') {
      inner = html`<div class="space-y-3" aria-busy="true" aria-live="polite">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.analysisLoading}</p>
        <div class="h-8 w-2/3 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-20 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="h-24 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
      </div>`;
    } else if (this.obterDespesaParaAnaliseError) {
      const id = this.selectedDespesa;
      inner = html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
        <Message>${this.msg.analysisError}</Message>
        <Action><button type="button" class="underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.selectDespesa(id)}>${this.msg.retry}</button></Action>
      </groupnotifyuser--ml-contextual-feedback>`;
    } else if (!d) {
      inner = html`<p class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.pickPrompt}</p>`;
    } else {
      const det = d.details.details;
      inner = html`
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.expenseOf}</p>
            <h2 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${nameOf(d.colaborador)}</h2>
          </div>
          ${this.chip(d.status)}
        </div>
        <dl class="mt-5 grid grid-cols-3 gap-4 rounded-md bg-[var(--surface-alt-bg,transparent)] p-4">
          <div>
            <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.factDate}</dt>
            <dd class="mt-1 text-base text-[var(--text-strong,currentColor)]">${formatDate(det.dataDespesa)}</dd>
          </div>
          <div>
            <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.factCategory}</dt>
            <dd class="mt-1 text-base text-[var(--text-strong,currentColor)]">${det.categoria}</dd>
          </div>
          <div class="text-right">
            <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.factAmount}</dt>
            <dd class="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${det.valor}</dd>
          </div>
        </dl>
        <section class="mt-6">
          <h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.narrativeHeading}</h3>
          <p class="whitespace-pre-line text-[var(--text-default,currentColor)]">${det.descricao}</p>
        </section>
        <section class="mt-6">
          <h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.trailHeading}</h3>
          <dl class="space-y-2 text-sm text-[var(--text-muted,currentColor)]">
            <div class="flex gap-2"><dt>${this.msg.resubmitted}:</dt><dd>${det.reenvioRealizado ? this.msg.yes : this.msg.no}</dd></div>
            ${det.motivoRejeicao ? html`<div><dt>${this.msg.previousReason}:</dt><dd class="mt-0.5 whitespace-pre-line text-[var(--text-default,currentColor)]">${det.motivoRejeicao}</dd></div>` : nothing}
          </dl>
        </section>`;
    }
    return html`<div data-organism-id="analiseDespesa">${inner}</div>`;
  }

  private renderDecision() {
    const d = this.despesa;
    const head = html`<h3 class="mb-3 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.decisionHeading}</h3>`;
    const wrap = (c: unknown) => html`<div data-organism-id="decisaoDespesa" class="mt-8 border-t border-[var(--border-subtle,currentColor)] pt-5">${head}${c}</div>`;

    if (!d) {
      return wrap(html`
        <p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg.inertHint}</p>
        <div class="flex flex-wrap gap-3">
          <grouptriggeraction--ml-button-standard data-variant="primary" .disabled=${true}><Label>${this.msg.approve}</Label></grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="secondary" .disabled=${true}><Label>${this.msg.reject}</Label></grouptriggeraction--ml-button-standard>
        </div>`);
    }

    if (d.status !== 'awaitingApproval') {
      const text = d.status === 'approved' ? this.msg.approvedStatement
        : d.status === 'rejected' ? this.msg.rejectedStatement
        : `${this.msg.otherStatement} ${statusLabel(this.msg, d.status)}`;
      return wrap(html`<p class="rounded-md p-3 ${statusClasses(d.status)}" role="status" aria-live="polite">${text}</p>`);
    }

    const busy = this.aprovarDespesaStatus === 'loading' || this.rejeitarDespesaStatus === 'loading';
    const hasError = !!(this.aprovarDespesaError || this.rejeitarDespesaError);
    const motivo = this.rejeitarDespesaDraft.motivoRejeicao ?? '';
    const reasonError = this.rejeitarDespesaError?.code === 'client.requiredMissing' ? this.msg.reasonRequired : '';
    const onReason = (e: CustomEvent<{ value: string }>) => this.setRejeitarDespesaDraft({ motivoRejeicao: e.detail?.value ?? '' });

    return wrap(html`
      <div aria-busy=${busy ? 'true' : 'false'}>
        ${busy ? html`<p class="mb-3 text-sm text-[var(--text-muted,currentColor)]" role="status" aria-live="polite">${this.msg.running}</p>` : nothing}
        ${hasError && !reasonError ? html`
          <div class="mb-3">
            <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
              <Message>${this.msg.decisionFailed}</Message>
            </groupnotifyuser--ml-contextual-feedback>
          </div>` : nothing}
        <div class="flex flex-col gap-4">
          <div>
            <grouptriggeraction--ml-button-standard data-variant="primary" size="md"
              .disabled=${busy}
              .loading=${this.aprovarDespesaStatus === 'loading'}
              @action=${(e: Event) => {
                const root = (e.currentTarget as HTMLElement).closest('[data-organism-id]');
                root?.querySelector('dialog')?.showModal();
              }}>
              <Label>${this.msg.approve}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
          <details class="rounded-md border border-[var(--border-default,currentColor)] p-3">
            <summary class="min-h-[44px] cursor-pointer select-none py-2 text-sm font-medium text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg.rejectOpen}</summary>
            <div class="mt-3 flex flex-col gap-3">
              <groupentertext--ml-multiline-text
                .value=${motivo}
                .rows=${4}
                .required=${true}
                .disabled=${busy}
                .error=${reasonError}
                @input=${onReason}
                @change=${onReason}>
                <Label>${this.msg.reasonLabel}</Label>
                <Helper>${this.msg.reasonHelper}</Helper>
              </groupentertext--ml-multiline-text>
              <div>
                <grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
                  .disabled=${busy || motivo.trim() === ''}
                  .loading=${this.rejeitarDespesaStatus === 'loading'}
                  @action=${() => this.rejeitarDespesa()}>
                  <Label>${this.msg.reject}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
            </div>
          </details>
        </div>
      </div>
      <dialog class="m-auto w-[28rem] max-w-[90vw] rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-[var(--text-default,currentColor)] backdrop:bg-[var(--overlay-backdrop-bg,transparent)]" aria-labelledby="confirm-title">
        <h4 id="confirm-title" class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.confirmTitle}</h4>
        <p class="mt-3">${this.msg.confirmLead} <strong>${nameOf(d.colaborador)}</strong></p>
        <p class="mt-1 text-sm">${d.details.details.categoria} · <span class="text-xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span></p>
        <p class="mt-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg.confirmNote}</p>
        <div class="mt-6 flex justify-end gap-3">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md"
            @action=${(e: Event) => (e.currentTarget as HTMLElement).closest('dialog')?.close()}>
            <Label>${this.msg.back}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="primary" size="md"
            @action=${(e: Event) => {
              (e.currentTarget as HTMLElement).closest('dialog')?.close();
              this.aprovarDespesa();
            }}>
            <Label>${this.msg.approve}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </dialog>`);
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-screen bg-[var(--page-bg,transparent)] p-8 text-[var(--text-default,currentColor)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p>
        </header>
        <div class="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start gap-6">
          ${this.renderQueue()}
          <div class="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
            ${this.renderAnalysis()}
            ${this.renderDecision()}
          </div>
        </div>
      </div>`;
  }
}
