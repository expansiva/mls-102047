/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { ColaboradorNome } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Despesas da equipe',
  queueTitle: 'Aguardando sua aprovação',
  analysisTitle: 'Análise da despesa',
  backLabel: 'Voltar à fila',
  colCollaborator: 'Colaborador',
  colDate: 'Data',
  colAmount: 'Valor',
  loadingQueue: 'Carregando despesas…',
  emptyQueue: 'Nenhuma despesa da equipe aguarda sua aprovação.',
  errorQueue: 'Não foi possível carregar as despesas da equipe.',
  retry: 'Tentar novamente',
  loadMore: 'Ver mais despesas',
  loadingExpense: 'Carregando a despesa…',
  errorExpense: 'Não foi possível abrir esta despesa.',
  noSelection: 'Escolha uma despesa na fila para analisar.',
  factCategory: 'Categoria',
  factDate: 'Data da despesa',
  factAmount: 'Valor',
  narrativeLabel: 'Descrição',
  trailTitle: 'Histórico',
  resubmitLabel: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  rejectionLabel: 'Motivo da rejeição',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  decisionTitle: 'Sua decisão',
  approveOpen: 'Aprovar despesa',
  rejectOpen: 'Rejeitar com motivo',
  reasonLabel: 'Por que você está rejeitando?',
  reasonHelper: 'Obrigatório para rejeitar.',
  reasonRequired: 'Informe o motivo da rejeição.',
  rejectConfirm: 'Confirmar rejeição',
  decisionError: 'Não foi possível registrar a decisão. O que você escreveu foi mantido; tente novamente.',
  confirmHeading: 'Você está aprovando',
  confirmCta: 'Confirmar aprovação',
  cancel: 'Voltar',
  decidedApproved: 'Despesa aprovada. Ela segue para o financeiro.',
  decidedRejected: 'Despesa rejeitada com o motivo informado.',
  decidedOther: 'Esta despesa não aguarda mais uma decisão.',
  backToQueue: 'Ir para a fila'
};
const pageMessage_en_us = {
  pageTitle: 'Team expenses',
  queueTitle: 'Waiting for your approval',
  analysisTitle: 'Expense review',
  backLabel: 'Back to the queue',
  colCollaborator: 'Collaborator',
  colDate: 'Date',
  colAmount: 'Amount',
  loadingQueue: 'Loading expenses…',
  emptyQueue: 'No team expenses are waiting for your approval.',
  errorQueue: 'We could not load the team expenses.',
  retry: 'Try again',
  loadMore: 'Show more expenses',
  loadingExpense: 'Loading the expense…',
  errorExpense: 'We could not open this expense.',
  noSelection: 'Pick an expense from the queue to review.',
  factCategory: 'Category',
  factDate: 'Expense date',
  factAmount: 'Amount',
  narrativeLabel: 'Description',
  trailTitle: 'History',
  resubmitLabel: 'Resubmitted',
  yes: 'Yes',
  no: 'No',
  rejectionLabel: 'Rejection reason',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  decisionTitle: 'Your decision',
  approveOpen: 'Approve expense',
  rejectOpen: 'Reject with a reason',
  reasonLabel: 'Why are you rejecting?',
  reasonHelper: 'Required to reject.',
  reasonRequired: 'Enter the reason for rejecting.',
  rejectConfirm: 'Confirm rejection',
  decisionError: 'We could not record the decision. What you wrote was kept; please try again.',
  confirmHeading: 'You are approving',
  confirmCta: 'Confirm approval',
  cancel: 'Go back',
  decidedApproved: 'Expense approved. It moves on to finance.',
  decidedRejected: 'Expense rejected with the reason you gave.',
  decidedOther: 'This expense no longer awaits a decision.',
  backToQueue: 'Go to the queue'
};
const pageMessage_es_es = {
  pageTitle: 'Gastos del equipo',
  queueTitle: 'Pendientes de tu aprobación',
  analysisTitle: 'Revisión del gasto',
  backLabel: 'Volver a la cola',
  colCollaborator: 'Colaborador',
  colDate: 'Fecha',
  colAmount: 'Importe',
  loadingQueue: 'Cargando gastos…',
  emptyQueue: 'Ningún gasto del equipo espera tu aprobación.',
  errorQueue: 'No se pudieron cargar los gastos del equipo.',
  retry: 'Intentar de nuevo',
  loadMore: 'Ver más gastos',
  loadingExpense: 'Cargando el gasto…',
  errorExpense: 'No se pudo abrir este gasto.',
  noSelection: 'Elige un gasto de la cola para revisarlo.',
  factCategory: 'Categoría',
  factDate: 'Fecha del gasto',
  factAmount: 'Importe',
  narrativeLabel: 'Descripción',
  trailTitle: 'Historial',
  resubmitLabel: 'Reenvío realizado',
  yes: 'Sí',
  no: 'No',
  rejectionLabel: 'Motivo del rechazo',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  decisionTitle: 'Tu decisión',
  approveOpen: 'Aprobar gasto',
  rejectOpen: 'Rechazar con motivo',
  reasonLabel: '¿Por qué lo rechazas?',
  reasonHelper: 'Obligatorio para rechazar.',
  reasonRequired: 'Indica el motivo del rechazo.',
  rejectConfirm: 'Confirmar rechazo',
  decisionError: 'No se pudo registrar la decisión. Lo que escribiste se conservó; inténtalo de nuevo.',
  confirmHeading: 'Estás aprobando',
  confirmCta: 'Confirmar aprobación',
  cancel: 'Volver',
  decidedApproved: 'Gasto aprobado. Pasa a finanzas.',
  decidedRejected: 'Gasto rechazado con el motivo indicado.',
  decidedOther: 'Este gasto ya no espera una decisión.',
  backToQueue: 'Ir a la cola'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

function nameOf(c: ColaboradorNome): string {
  return c.details.identification.details.identification.name;
}

function formatDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined).format(d);
}

function openConfirm(e: Event) {
  const root = (e.currentTarget as HTMLElement).closest('[data-organism-id]');
  const dlg = root?.querySelector('dialog') as HTMLDialogElement | null | undefined;
  if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
}

function closeDialog(e: Event) {
  const dlg = (e.currentTarget as HTMLElement).closest('dialog') as HTMLDialogElement | null;
  dlg?.close();
}

@customElement('reembolso-despesas--web--mobile--page11--despesas_da_equipe-102047')
export class ReembolsoDespesasMobilePage11Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto flex min-h-full w-full max-w-md flex-col gap-4 bg-[var(--page-bg,transparent)] px-4 pb-10 pt-5 text-[var(--text-default,currentColor)]">
        <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['backLabel']}
          .value=${this.scenary || 'fila'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="fila" title=${this.msg['queueTitle']}>${this.renderQueue()}</Scene>
          <Scene value="analise" title=${this.msg['analysisTitle']} nav="back" backTo="fila">${this.renderAnalysis()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private renderQueue() {
    const items = this.despesas?.items ?? [];
    const hasMore = this.despesas?.hasMore ?? false;
    const selectedIndex = items.findIndex((i) => i.id === this.selectedDespesa);
    return html`
      <section data-organism-id="despesasPendentes" class="flex flex-col gap-3">
        ${this.pageStatus === 'loading'
          ? html`<p aria-live="polite" aria-busy="true" class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['loadingQueue']}</p>`
          : this.pageStatus === 'error'
            ? html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
                <p class="text-sm">${this.msg['errorQueue']}</p>
                <grouptriggeraction--ml-button-standard data-variant="secondary" data-class="w-full" @action=${() => this.listarDespesasPendentesEquipe()}>
                  <Label>${this.msg['retry']}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>`
            : this.pageStatus === 'empty'
              ? html`<p class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyQueue']}</p>`
              : html`
                <groupviewtable--ml-responsive-data-table
                  .value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
                  @rowClick=${(e: CustomEvent<{ index: number }>) => {
                    const item = items[e.detail.index];
                    if (!item) return;
                    this.selectDespesa(item.id);
                    this.setScenario('analise');
                  }}
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead key="colaborador">${this.msg['colCollaborator']}</TableHead>
                      <TableHead key="data">${this.msg['colDate']}</TableHead>
                      <TableHead key="valor">${this.msg['colAmount']}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    ${items.map(
                      (item) => html`
                        <TableRow key=${item.id}>
                          <TableCell>
                            <div class="font-medium text-[var(--text-strong,currentColor)]">${nameOf(item.colaborador)}</div>
                            <div class="text-xs text-[var(--text-muted,currentColor)]">${item.details.details.categoria}</div>
                          </TableCell>
                          <TableCell>${formatDate(item.details.details.dataDespesa)}</TableCell>
                          <TableCell><span class="font-semibold text-[var(--text-strong,currentColor)]">${item.details.details.valor}</span></TableCell>
                        </TableRow>
                      `
                    )}
                  </TableBody>
                </groupviewtable--ml-responsive-data-table>
                ${hasMore
                  ? html`<grouptriggeraction--ml-button-standard
                      data-variant="secondary"
                      size="lg"
                      data-class="w-full"
                      ?loading=${this.listarDespesasPendentesEquipeStatus === 'loading'}
                      @action=${() => this.listarDespesasPendentesEquipe(undefined, true)}
                    >
                      <Label>${this.msg['loadMore']}</Label>
                    </grouptriggeraction--ml-button-standard>`
                  : nothing}
              `}
      </section>
    `;
  }

  private statusLabel(status: string) {
    switch (status) {
      case 'draft':
        return this.msg['statusDraft'];
      case 'awaitingApproval':
        return this.msg['statusAwaiting'];
      case 'rejected':
        return this.msg['statusRejected'];
      case 'approved':
        return this.msg['statusApproved'];
      case 'paid':
        return this.msg['statusPaid'];
      default:
        return status;
    }
  }

  private renderAnalysis() {
    const d = this.despesa;
    if (!d) {
      return html`
        <section data-organism-id="analiseDespesa" class="flex flex-col gap-3">
          ${this.obterDespesaParaAnaliseStatus === 'loading'
            ? html`<p aria-live="polite" aria-busy="true" class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['loadingExpense']}</p>`
            : this.obterDespesaParaAnaliseStatus === 'error' && this.selectedDespesa
              ? html`<div role="alert" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] p-4">
                  <p class="text-sm">${this.msg['errorExpense']}</p>
                  <grouptriggeraction--ml-button-standard data-variant="secondary" data-class="w-full" @action=${() => this.obterDespesaParaAnalise(this.selectedDespesa ?? '')}>
                    <Label>${this.msg['retry']}</Label>
                  </grouptriggeraction--ml-button-standard>
                </div>`
              : html`<p class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['noSelection']}</p>`}
        </section>
      `;
    }
    const x = d.details.details;
    return html`
      <div class="flex flex-col gap-5">
        <section data-organism-id="analiseDespesa" aria-busy=${this.obterDespesaParaAnaliseStatus === 'loading' ? 'true' : 'false'}>
          <groupviewcard--ml-vertical-card>
            <CardHeader>
              <CardTitle>${nameOf(d.colaborador)}</CardTitle>
              <CardDescription>${this.statusLabel(d.status)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-5">
                <div>
                  <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factAmount']}</p>
                  <p class="text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${x.valor}</p>
                </div>
                <dl class="grid grid-cols-2 gap-4">
                  <div>
                    <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factCategory']}</dt>
                    <dd class="font-medium text-[var(--text-strong,currentColor)]">${x.categoria}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factDate']}</dt>
                    <dd class="font-medium text-[var(--text-strong,currentColor)]">${formatDate(x.dataDespesa)}</dd>
                  </div>
                </dl>
                <div>
                  <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['narrativeLabel']}</p>
                  <p class="whitespace-pre-line text-base leading-relaxed">${x.descricao}</p>
                </div>
                <div class="border-t border-[var(--border-subtle,currentColor)] pt-4">
                  <p class="mb-2 text-xs font-medium text-[var(--text-muted,currentColor)]">${this.msg['trailTitle']}</p>
                  <dl class="flex flex-col gap-3 text-sm text-[var(--text-muted,currentColor)]">
                    <div class="flex justify-between gap-3">
                      <dt>${this.msg['resubmitLabel']}</dt>
                      <dd>${x.reenvioRealizado ? this.msg['yes'] : this.msg['no']}</dd>
                    </div>
                    ${x.motivoRejeicao
                      ? html`<div>
                          <dt>${this.msg['rejectionLabel']}</dt>
                          <dd class="mt-1 whitespace-pre-line text-[var(--text-default,currentColor)]">${x.motivoRejeicao}</dd>
                        </div>`
                      : nothing}
                  </dl>
                </div>
              </div>
            </CardContent>
          </groupviewcard--ml-vertical-card>
        </section>
        ${this.renderDecision()}
      </div>
    `;
  }

  private renderDecision() {
    const d = this.despesa;
    if (!d) return nothing;
    const x = d.details.details;
    const busy = this.aprovarDespesaStatus === 'loading' || this.rejeitarDespesaStatus === 'loading';
    const hasError = this.aprovarDespesaError !== null || this.rejeitarDespesaError !== null;
    const reason = this.rejeitarDespesaDraft.motivoRejeicao ?? '';
    const reasonError = this.rejeitarDespesaError?.code === 'client.requiredMissing' ? this.msg['reasonRequired'] : '';

    if (d.status !== 'awaitingApproval') {
      const text =
        d.status === 'approved' ? this.msg['decidedApproved'] : d.status === 'rejected' ? this.msg['decidedRejected'] : this.msg['decidedOther'];
      return html`
        <section data-organism-id="decisaoDespesa" aria-live="polite" role="status" class="flex flex-col gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4">
          <p class="font-medium text-[var(--text-strong,currentColor)]">${text}</p>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${nameOf(d.colaborador)} · ${x.valor} · ${this.statusLabel(d.status)}</p>
          <button
            type="button"
            class="min-h-11 self-start rounded text-sm text-[var(--link-text,currentColor)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => this.setScenario('fila')}
          >${this.msg['backToQueue']}</button>
        </section>
      `;
    }

    return html`
      <section data-organism-id="decisaoDespesa" aria-busy=${busy ? 'true' : 'false'} class="flex flex-col gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['decisionTitle']}</h2>
        <div aria-live="polite">
          ${hasError
            ? html`<p role="alert" class="rounded-lg bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]">${this.msg['decisionError']}</p>`
            : nothing}
        </div>
        <grouptriggeraction--ml-button-standard
          size="lg"
          data-variant="primary"
          data-class="w-full"
          ?disabled=${busy}
          ?loading=${this.aprovarDespesaStatus === 'loading'}
          @action=${openConfirm}
        >
          <Label>${this.msg['approveOpen']}</Label>
        </grouptriggeraction--ml-button-standard>

        <details class="group rounded-lg border border-[var(--border-default,currentColor)]">
          <summary
            class="flex min-h-12 cursor-pointer list-none items-center justify-center rounded-lg px-4 text-center text-base font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] [&::-webkit-details-marker]:hidden"
          >${this.msg['rejectOpen']}</summary>
          <div class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] p-3">
            <groupentertext--ml-multiline-text
              rows="4"
              required
              ?disabled=${busy}
              .value=${reason}
              .error=${reasonError}
              @input=${(e: CustomEvent<{ value: string }>) => {
                if (e.detail && typeof e.detail.value === 'string') this.setRejeitarDespesaDraft({ motivoRejeicao: e.detail.value });
              }}
            >
              <Label>${this.msg['reasonLabel']}</Label>
              <Helper>${this.msg['reasonHelper']}</Helper>
            </groupentertext--ml-multiline-text>
            <grouptriggeraction--ml-button-standard
              size="lg"
              data-variant="secondary"
              data-class="w-full"
              ?disabled=${busy || reason.trim() === ''}
              ?loading=${this.rejeitarDespesaStatus === 'loading'}
              @action=${() => this.rejeitarDespesa()}
            >
              <Label>${this.msg['rejectConfirm']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </details>

        <dialog
          aria-labelledby="confirm-approval-title"
          class="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 text-[var(--text-default,currentColor)] backdrop:bg-[var(--overlay-backdrop-bg,transparent)]"
        >
          <div class="flex flex-col gap-4">
            <h2 id="confirm-approval-title" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['confirmHeading']}</h2>
            <div>
              <p class="font-medium text-[var(--text-strong,currentColor)]">${nameOf(d.colaborador)}</p>
              <p class="text-2xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${x.valor}</p>
              <p class="text-sm text-[var(--text-muted,currentColor)]">${x.categoria} · ${formatDate(x.dataDespesa)}</p>
            </div>
            <div class="flex flex-col gap-2">
              <grouptriggeraction--ml-button-standard
                size="lg"
                data-variant="primary"
                data-class="w-full"
                @action=${(e: Event) => {
                  closeDialog(e);
                  this.aprovarDespesa();
                }}
              >
                <Label>${this.msg['confirmCta']}</Label>
              </grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard size="lg" data-variant="ghost" data-class="w-full" @action=${closeDialog}>
                <Label>${this.msg['cancel']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </div>
        </dialog>
      </section>
    `;
  }
}
