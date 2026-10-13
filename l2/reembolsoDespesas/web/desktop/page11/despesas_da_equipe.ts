/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { DespesaLoad } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Despesas da equipe',
  pageIntro: 'Escolha uma despesa pendente, confira os dados e decida.',
  queueTitle: 'Despesas aguardando decisão',
  reviewTitle: 'Conferência da despesa',
  backToQueue: 'Voltar à fila',
  filterLabel: 'Colaborador',
  filterAll: 'Toda a equipe',
  colCollaborator: 'Colaborador',
  colDate: 'Data da despesa',
  colCategory: 'Categoria',
  colAmount: 'Valor',
  colStatus: 'Situação',
  emptyQueue: 'Nenhuma despesa da equipe aguarda decisão.',
  loadMore: 'Carregar mais despesas',
  loadingMore: 'Carregando…',
  loadError: 'Não foi possível carregar as despesas.',
  retry: 'Tentar novamente',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  unknownCollaborator: 'Colaborador não identificado',
  reviewCaption: 'Solicitação de reembolso',
  factAmount: 'Valor solicitado',
  factDate: 'Data da despesa',
  factCategory: 'Categoria',
  factStatus: 'Situação',
  trailTitle: 'Histórico',
  trailResubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  trailRejectionReason: 'Motivo da rejeição anterior',
  noneSelected: 'Nenhuma despesa escolhida para conferência. Escolha uma na fila.',
  decisionTitle: 'Sua decisão',
  reasonLabel: 'Motivo da rejeição',
  reasonHelper: 'Obrigatório apenas para rejeitar a despesa.',
  reasonPlaceholder: 'Explique ao colaborador por que a despesa foi rejeitada',
  approveAction: 'Aprovar despesa',
  rejectAction: 'Rejeitar despesa',
  confirmTitle: 'Confirmar aprovação',
  confirmText: 'A despesa será aprovada para pagamento.',
  confirmCancel: 'Cancelar',
  confirmApprove: 'Aprovar para pagamento',
  approvedStatement: 'Despesa aprovada para pagamento.',
  rejectedStatement: 'Despesa rejeitada e motivo registrado para o colaborador.',
  decisionFailed: 'Não foi possível concluir a decisão. Nada do que você escreveu foi perdido; tente novamente.',
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function fmtMoney(v: string): string {
  const n = Number(v);
  if (v.trim() === '' || !Number.isFinite(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v: string): string {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(v);
  return new Intl.DateTimeFormat(lang(), dateOnly ? { dateStyle: 'medium', timeZone: 'UTC' } : { dateStyle: 'medium' }).format(d);
}

function badgeClass(status: DespesaLoad['status']): string {
  switch (status) {
    case 'approved':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'rejected':
      return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'paid':
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'awaitingApproval':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

@customElement('reembolso-despesas--web--desktop--page11--despesas_da_equipe-102047')
export class ReembolsoDespesasDesktopPage11Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg!: PageMessageType;

  private statusLabel(s: DespesaLoad['status']) {
    switch (s) {
      case 'draft': return this.msg.statusDraft;
      case 'awaitingApproval': return this.msg.statusAwaitingApproval;
      case 'rejected': return this.msg.statusRejected;
      case 'approved': return this.msg.statusApproved;
      case 'paid': return this.msg.statusPaid;
    }
  }

  private badge(s: DespesaLoad['status']) {
    return html`<span class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass(s)}">${this.statusLabel(s)}</span>`;
  }

  private collaboratorName(id: string) {
    const c = this.colaborador.find((x) => x.id === id);
    return c ? c.details.identification : this.msg.unknownCollaborator;
  }

  private renderQueue() {
    const loading = this.pageStatus === 'loading' || this.loadDespesasDaEquipeStatus === 'loading';
    const idx = this.despesasDaEquipe.findIndex((r) => r.id === this.despesaSelecionada);
    const err = this.loadError && this.loadError.code !== 'client.selectionInvalid' ? this.loadError : this.loadDespesasDaEquipeError;
    return html`
      <div data-organism-id="pendingTeamExpenses" class="flex flex-col gap-4">
        <div class="flex items-end gap-3">
          <label class="flex flex-col gap-1 text-sm text-[var(--text-muted,currentColor)]">
            <span>${this.msg.filterLabel}</span>
            <select
              class="min-w-64 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 py-2 text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              aria-busy=${loading ? 'true' : 'false'}
              @change=${(e: Event) => {
                const v = (e.target as HTMLSelectElement).value;
                void this.filterPendingTeamExpenses(v === '' ? null : v);
              }}
            >
              <option value="" ?selected=${!this.colaboradorId}>${this.msg.filterAll}</option>
              ${this.colaborador.map(
                (c) => html`<option value=${c.id} ?selected=${this.colaboradorId === c.id}>${c.details.identification}</option>`,
              )}
            </select>
          </label>
        </div>
        ${err
          ? html`<div role="alert" aria-live="polite" class="flex items-center gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3 text-sm text-[var(--text-default,currentColor)]">
              <span>${this.msg.loadError}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.load(); }}>
                <Label>${this.msg.retry}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
        <groupviewtable--ml-data-table
          .value=${idx >= 0 ? String(idx) : ''}
          ?loading=${loading}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const row = this.despesasDaEquipe[e.detail.index];
            if (row) {
              this.selectExpenseReview(row.id);
              this.setScenario('review');
            }
          }}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="colaborador">${this.msg.colCollaborator}</TableHead>
              <TableHead key="data">${this.msg.colDate}</TableHead>
              <TableHead key="categoria">${this.msg.colCategory}</TableHead>
              <TableHead key="valor">${this.msg.colAmount}</TableHead>
              <TableHead key="situacao">${this.msg.colStatus}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${this.despesasDaEquipe.map(
              (r) => html`<TableRow key=${r.id}>
                <TableCell>${this.collaboratorName(r.colaboradorId)}</TableCell>
                <TableCell>${fmtDate(r.details.dataDespesa)}</TableCell>
                <TableCell>${r.details.categoria}</TableCell>
                <TableCell>${fmtMoney(r.details.valor)}</TableCell>
                <TableCell>${this.badge(r.status)}</TableCell>
              </TableRow>`,
            )}
          </TableBody>
          <Empty>${this.msg.emptyQueue}</Empty>
        </groupviewtable--ml-data-table>
        ${this.hasMorePendingTeamExpenses
          ? html`<div>
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                ?loading=${this.loadDespesasDaEquipeStatus === 'loading'}
                @action=${() => { void this.loadMorePendingTeamExpenses(); }}
              >
                <Label>${this.msg.loadMore}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </div>
    `;
  }

  private renderReview() {
    const d = this.expenseReview;
    if (!d) {
      return html`<div data-organism-id="expenseReview">
        <p class="text-[var(--text-muted,currentColor)]">${this.msg.noneSelected}</p>
      </div>`;
    }
    const name = this.expenseReviewColaborador
      ? this.expenseReviewColaborador.details.identification
      : this.collaboratorName(d.colaboradorId);
    return html`
      <div data-organism-id="expenseReview">
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${name}</CardTitle>
            <CardDescription>${this.msg.reviewCaption}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-6 py-2">
              <dl class="grid grid-cols-4 gap-6">
                <div class="flex flex-col gap-1">
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.factAmount}</dt>
                  <dd class="text-3xl font-semibold text-[var(--text-strong,currentColor)]">${fmtMoney(d.details.valor)}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.factDate}</dt>
                  <dd class="text-lg text-[var(--text-strong,currentColor)]">${fmtDate(d.details.dataDespesa)}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.factCategory}</dt>
                  <dd class="text-lg text-[var(--text-strong,currentColor)]">${d.details.categoria}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.factStatus}</dt>
                  <dd>${this.badge(d.status)}</dd>
                </div>
              </dl>
              <div class="border-t border-[var(--border-subtle,currentColor)] pt-4">
                <h3 class="mb-2 text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg.trailTitle}</h3>
                <dl class="flex flex-col gap-2 text-sm text-[var(--text-muted,currentColor)]">
                  <div class="flex gap-2">
                    <dt>${this.msg.trailResubmitted}:</dt>
                    <dd>${d.details.reenvioRealizado ? this.msg.yes : this.msg.no}</dd>
                  </div>
                  ${d.details.motivoRejeicao
                    ? html`<div class="flex flex-col gap-1">
                        <dt>${this.msg.trailRejectionReason}</dt>
                        <dd class="text-[var(--text-default,currentColor)]">${d.details.motivoRejeicao}</dd>
                      </div>`
                    : nothing}
                </dl>
              </div>
            </div>
          </CardContent>
        </groupviewcard--ml-vertical-card>
      </div>
    `;
  }

  private renderDecision() {
    const d = this.expenseReview;
    const approving = this.approveExpenseStatus === 'loading';
    const rejecting = this.rejectExpenseStatus === 'loading';
    const busy = approving || rejecting;
    const reason = this.rejectExpenseInput.details.motivoRejeicao ?? '';
    const reasonMissing = reason.trim() === '';
    const reasonError = this.rejectExpenseError && this.rejectExpenseError.code === 'client.requiredMissing' ? this.rejectExpenseError.message : '';
    const cmdError = this.approveExpenseError || (this.rejectExpenseError && !reasonError ? this.rejectExpenseError : null);

    if (!d && this.approveExpenseStatus === 'success') {
      return html`<div data-organism-id="approvalDecision">
        <p role="status" aria-live="polite" class="rounded-md bg-[var(--status-success-bg,transparent)] p-4 text-[var(--status-success-text,currentColor)]">${this.msg.approvedStatement}</p>
      </div>`;
    }
    if (!d && this.rejectExpenseStatus === 'success') {
      return html`<div data-organism-id="approvalDecision">
        <p role="status" aria-live="polite" class="rounded-md bg-[var(--surface-alt-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">${this.msg.rejectedStatement}</p>
      </div>`;
    }

    return html`
      <div data-organism-id="approvalDecision" class="flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
        <h3 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.decisionTitle}</h3>
        <groupentertext--ml-multiline-text
          rows="3"
          maxLength="500"
          .value=${reason}
          .error=${reasonError}
          ?disabled=${!d || busy}
          placeholder=${this.msg.reasonPlaceholder}
          @input=${(e: CustomEvent<{ value: string }>) => {
            e.stopPropagation();
            this.setRejectExpenseInput({
              ...this.rejectExpenseInput,
              details: { ...this.rejectExpenseInput.details, motivoRejeicao: e.detail.value },
            });
          }}
        >
          <Label>${this.msg.reasonLabel}</Label>
          <Helper>${this.msg.reasonHelper}</Helper>
        </groupentertext--ml-multiline-text>
        <div aria-live="polite">
          ${cmdError
            ? html`<p role="alert" class="text-sm text-[var(--text-default,currentColor)]">${this.msg.decisionFailed} ${cmdError.message}</p>`
            : nothing}
        </div>
        <div class="flex items-center gap-3">
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            ?disabled=${!d || busy}
            ?loading=${approving}
            @action=${(e: Event) => {
              (e.currentTarget as HTMLElement)
                .closest('[data-organism-id]')
                ?.querySelector<HTMLDialogElement>('dialog')
                ?.showModal();
            }}
          >
            <Label>${this.msg.approveAction}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            ?disabled=${!d || busy || reasonMissing}
            ?loading=${rejecting}
            @action=${() => { void this.rejectExpense(); }}
          >
            <Label>${this.msg.rejectAction}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
        <dialog
          aria-labelledby="confirm-approve-title"
          class="m-auto w-full max-w-md rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-[var(--text-default,currentColor)] backdrop:bg-[var(--overlay-backdrop-bg,transparent)]"
        >
          <h4 id="confirm-approve-title" class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.confirmTitle}</h4>
          <p class="mt-2 text-sm">${this.msg.confirmText}</p>
          ${d
            ? html`<dl class="mt-4 flex flex-col gap-2 text-sm">
                <div class="flex justify-between gap-4"><dt class="text-[var(--text-muted,currentColor)]">${this.msg.colCollaborator}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${this.collaboratorName(d.colaboradorId)}</dd></div>
                <div class="flex justify-between gap-4"><dt class="text-[var(--text-muted,currentColor)]">${this.msg.colAmount}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${fmtMoney(d.details.valor)}</dd></div>
              </dl>`
            : nothing}
          <div class="mt-6 flex justify-end gap-3">
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              @action=${(e: Event) => { (e.currentTarget as HTMLElement).closest('dialog')?.close(); }}
            >
              <Label>${this.msg.confirmCancel}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              @action=${(e: Event) => {
                (e.currentTarget as HTMLElement).closest('dialog')?.close();
                void this.approveExpense();
              }}
            >
              <Label>${this.msg.confirmApprove}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </dialog>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] px-8 py-8 text-[var(--text-default,currentColor)]">
        <div class="mx-auto flex max-w-5xl flex-col gap-6">
          <header class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
            <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p>
          </header>
          <molecules--ml-scenary-102020
            mode="scenary"
            backLabel=${this.msg.backToQueue}
            .value=${this.scenary || (this.despesaSelecionada ? 'review' : 'queue')}
            @change=${(e: CustomEvent<{ value: string }>) => {
              if (e.target === e.currentTarget) this.setScenario(e.detail.value);
            }}
          >
            <Scene value="queue" title=${this.msg.queueTitle}>
              ${this.renderQueue()}
            </Scene>
            <Scene value="review" title=${this.msg.reviewTitle} nav="back" backTo="queue">
              <div class="flex flex-col gap-6">
                ${this.renderReview()}
                ${this.renderDecision()}
              </div>
            </Scene>
          </molecules--ml-scenary-102020>
        </div>
      </main>
    `;
  }
}
