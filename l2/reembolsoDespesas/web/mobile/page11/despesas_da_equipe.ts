/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { DespesaLoad, ColaboradorLoad } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Despesas da equipe',
  pageLead: 'Analise cada despesa pendente e decida aprovar ou rejeitar.',
  queueScene: 'Aguardando decisão',
  reviewScene: 'Análise da despesa',
  backToQueue: 'Voltar à fila',
  filterLabel: 'Colaborador',
  filterAll: 'Toda a equipe',
  colPerson: 'Colaborador e despesa',
  colValue: 'Valor e situação',
  loadingQueue: 'Carregando despesas pendentes…',
  emptyQueue: 'Nenhuma despesa pendente na equipe.',
  emptyFiltered: 'Nenhuma despesa pendente para este colaborador.',
  loadMore: 'Carregar mais despesas',
  loadingMore: 'Carregando…',
  retry: 'Tentar novamente',
  loadFailed: 'Não foi possível carregar as despesas.',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  factValue: 'Valor solicitado',
  factDate: 'Data da despesa',
  factCategory: 'Categoria',
  factStatus: 'Situação',
  factResubmitted: 'Reenvio realizado',
  factResubmittedYes: 'Esta despesa já foi corrigida e reenviada.',
  factPreviousReason: 'Motivo da rejeição anterior',
  unknownPerson: 'Colaborador não identificado',
  noExpenseOpen: 'Nenhuma despesa aberta para análise.',
  decisionHeading: 'Sua decisão',
  decisionIdle: 'Abra uma despesa da fila para poder decidir.',
  approve: 'Aprovar despesa',
  rejectOpen: 'Rejeitar despesa',
  reasonLabel: 'Motivo da rejeição',
  reasonHelper: 'Obrigatório para rejeitar: explique ao colaborador o que precisa mudar.',
  reasonPlaceholder: 'Escreva o motivo da rejeição',
  rejectConfirm: 'Registrar rejeição',
  confirmTitle: 'Conferir antes de aprovar',
  confirmLead: 'Você vai aprovar esta despesa:',
  confirmApprove: 'Confirmar aprovação',
  confirmCancel: 'Ainda não',
  approvedStatement: 'Despesa aprovada. Ela saiu da fila de pendentes.',
  rejectedStatement: 'Despesa rejeitada e motivo registrado. Ela saiu da fila de pendentes.',
  goToQueue: 'Ver despesas pendentes',
  decisionFailed: 'Não foi possível concluir a decisão. O que você escreveu foi mantido; tente novamente.',
  deciding: 'Registrando decisão…'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function formatDate(value: string): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function formatMoney(value: string): string {
  const n = Number(value);
  if (value === '' || Number.isNaN(n)) return value;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function statusLabel(msg: PageMessageType, status: DespesaLoad['status']): string {
  const map: Record<DespesaLoad['status'], string> = {
    draft: msg.statusDraft,
    awaitingApproval: msg.statusAwaiting,
    rejected: msg.statusRejected,
    approved: msg.statusApproved,
    paid: msg.statusPaid
  };
  return map[status];
}

function statusClass(status: DespesaLoad['status']): string {
  switch (status) {
    case 'awaitingApproval':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'approved':
    case 'paid':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'rejected':
      return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function personName(list: ColaboradorLoad[], id: string): string {
  const c = list.find((x) => x.id === id);
  return c ? c.details.identification : '';
}

@customElement('reembolso-despesas--web--mobile--page11--despesas_da_equipe-102047')
export class ReembolsoDespesasMobilePage11Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="mx-auto min-h-screen w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
        <header class="mb-4">
          <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageLead']}</p>
        </header>
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || (this.expenseReview ? 'review' : 'queue')}
          backLabel=${this.msg['backToQueue']}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="queue" title=${this.msg['queueScene']}>${this.renderQueue()}</Scene>
          <Scene value="review" title=${this.msg['reviewScene']} nav="back" backTo="queue">
            ${this.renderReview()} ${this.renderDecision()}
          </Scene>
        </molecules--ml-scenary-102020>
      </main>
    `;
  }

  private renderQueue() {
    const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
    const moreLoading = this.loadDespesasDaEquipeStatus === 'loading';
    const error = this.loadError || this.loadDespesasDaEquipeError;
    const emptyText = this.colaboradorId ? this.msg['emptyFiltered'] : this.msg['emptyQueue'];
    return html`
      <section data-organism-id="pendingTeamExpenses" class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label for="filtro-colaborador" class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg['filterLabel']}</label>
          <select
            id="filtro-colaborador"
            class="min-h-[44px] w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-base text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            ?disabled=${moreLoading}
            @change=${(e: Event) => {
              const v = (e.target as HTMLSelectElement).value;
              this.filterPendingTeamExpenses(v === '' ? null : v);
            }}
          >
            <option value="" ?selected=${!this.colaboradorId}>${this.msg['filterAll']}</option>
            ${this.colaborador.map(
              (c) => html`<option value=${c.id} ?selected=${c.id === this.colaboradorId}>${c.details.identification}</option>`
            )}
          </select>
        </div>

        <div aria-live="polite">
          ${error
            ? html`<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]">
                <p>${this.msg['loadFailed']}</p>
                <p class="mt-1">${error.message}</p>
                <div class="mt-2">
                  <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.load()}>
                    <Label>${this.msg['retry']}</Label>
                  </grouptriggeraction--ml-button-standard>
                </div>
              </div>`
            : nothing}
        </div>

        <groupviewdata--ml-vertical-record-list
          .loading=${loading}
          .hoverable=${true}
          @row-click=${(e: CustomEvent<{ index: number }>) => {
            const d = this.despesasDaEquipe[e.detail.index];
            if (d) {
              this.selectExpenseReview(d.id);
              this.setScenario('review');
            }
          }}
        >
          <Columns>
            <Column field="person" header=${this.msg['colPerson']} />
            <Column field="value" header=${this.msg['colValue']} align="right" width="140px" />
          </Columns>
          <Rows>
            ${this.despesasDaEquipe.map(
              (d) => html`
                <Row ?selected=${d.id === this.despesaSelecionada}>
                  <Cell>
                    <div class="flex min-h-[44px] flex-col justify-center py-1">
                      <span class="font-medium text-[var(--text-strong,currentColor)]">${personName(this.colaborador, d.colaboradorId) || this.msg['unknownPerson']}</span>
                      <span class="text-sm text-[var(--text-muted,currentColor)]">${d.details.categoria} · ${formatDate(d.details.dataDespesa)}</span>
                    </div>
                  </Cell>
                  <Cell>
                    <div class="flex min-h-[44px] flex-col items-end justify-center gap-1 py-1">
                      <span class="font-semibold text-[var(--text-strong,currentColor)]">${formatMoney(d.details.valor)}</span>
                      <span class="rounded-full px-2 py-0.5 text-xs ${statusClass(d.status)}">${statusLabel(this.msg, d.status)}</span>
                    </div>
                  </Cell>
                </Row>
              `
            )}
          </Rows>
          <Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${emptyText}</div></Empty>
          <Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['loadingQueue']}</div></Loading>
        </groupviewdata--ml-vertical-record-list>

        ${this.hasMorePendingTeamExpenses
          ? html`<grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="lg"
              data-class="w-full"
              ?loading=${moreLoading}
              @action=${() => this.loadMorePendingTeamExpenses()}
            >
              <Label>${moreLoading ? this.msg['loadingMore'] : this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      </section>
    `;
  }

  private renderReview() {
    const d = this.expenseReview;
    if (!d) {
      return html`<section data-organism-id="expenseReview" class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['noExpenseOpen']}</section>`;
    }
    const owner = this.expenseReviewColaborador;
    const name = (owner ? owner.details.identification : personName(this.colaborador, d.colaboradorId)) || this.msg['unknownPerson'];
    return html`
      <section data-organism-id="expenseReview" class="mb-5">
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${name}</CardTitle>
            <CardDescription>${d.details.categoria}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="flex flex-col gap-4">
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factValue']}</dt>
                <dd class="text-3xl font-semibold text-[var(--text-strong,currentColor)]">${formatMoney(d.details.valor)}</dd>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factDate']}</dt>
                  <dd class="text-base text-[var(--text-strong,currentColor)]">${formatDate(d.details.dataDespesa)}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factStatus']}</dt>
                  <dd><span class="inline-block rounded-full px-2 py-0.5 text-sm ${statusClass(d.status)}">${statusLabel(this.msg, d.status)}</span></dd>
                </div>
              </div>
              ${d.details.reenvioRealizado
                ? html`<div>
                    <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factResubmitted']}</dt>
                    <dd class="text-sm">${this.msg['factResubmittedYes']}</dd>
                  </div>`
                : nothing}
              ${d.details.motivoRejeicao
                ? html`<div>
                    <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factPreviousReason']}</dt>
                    <dd class="text-sm">${d.details.motivoRejeicao}</dd>
                  </div>`
                : nothing}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>
      </section>
    `;
  }

  private renderDecision() {
    const d = this.expenseReview;
    if (!d) {
      const statement =
        this.approveExpenseStatus === 'success'
          ? this.msg['approvedStatement']
          : this.rejectExpenseStatus === 'success'
            ? this.msg['rejectedStatement']
            : this.msg['decisionIdle'];
      return html`
        <section data-organism-id="approvalDecision" class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
          <p class="text-base text-[var(--text-strong,currentColor)]" aria-live="polite">${statement}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.setScenario('queue')}>
            <Label>${this.msg['goToQueue']}</Label>
          </grouptriggeraction--ml-button-standard>
        </section>
      `;
    }
    const name =
      (this.expenseReviewColaborador ? this.expenseReviewColaborador.details.identification : personName(this.colaborador, d.colaboradorId)) ||
      this.msg['unknownPerson'];
    const approving = this.approveExpenseStatus === 'loading';
    const rejecting = this.rejectExpenseStatus === 'loading';
    const busy = approving || rejecting;
    const reason = this.rejectExpenseInput.details.motivoRejeicao ?? '';
    const setReason = (value: string) =>
      this.setRejectExpenseInput({
        ...this.rejectExpenseInput,
        details: { ...this.rejectExpenseInput.details, motivoRejeicao: value }
      });
    return html`
      <section data-organism-id="approvalDecision" class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4" aria-busy=${busy ? 'true' : 'false'}>
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['decisionHeading']}</h2>

        <grouptriggeraction--ml-button-standard
          data-variant="primary"
          size="lg"
          data-class="w-full"
          ?disabled=${busy}
          @action=${(e: Event) => {
            const host = e.currentTarget as HTMLElement;
            const dlg = host.closest('[data-organism-id]')?.querySelector('dialog');
            dlg?.showModal();
          }}
        >
          <Label>${this.msg['approve']}</Label>
        </grouptriggeraction--ml-button-standard>

        <details class="group rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <summary
            class="flex min-h-[48px] cursor-pointer items-center justify-center px-4 text-base font-medium text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          >
            ${this.msg['rejectOpen']}
          </summary>
          <div class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] p-4">
            <groupentertext--ml-multiline-text
              rows="4"
              maxLength="500"
              required
              .value=${reason}
              placeholder=${this.msg['reasonPlaceholder']}
              ?disabled=${busy}
              @input=${(e: CustomEvent<{ value: string }>) => {
                if (e.detail && typeof e.detail.value === 'string') setReason(e.detail.value);
              }}
              @change=${(e: CustomEvent<{ value: string }>) => {
                if (e.detail && typeof e.detail.value === 'string') setReason(e.detail.value);
              }}
            >
              <Label>${this.msg['reasonLabel']}</Label>
              <Helper>${this.msg['reasonHelper']}</Helper>
            </groupentertext--ml-multiline-text>

            <div aria-live="polite">
              ${this.rejectExpenseError
                ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['decisionFailed']} ${this.rejectExpenseError.message}</p>`
                : nothing}
            </div>

            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="lg"
              data-class="w-full"
              ?disabled=${reason.trim() === '' || busy}
              ?loading=${rejecting}
              @action=${() => this.rejectExpense()}
            >
              <Label>${rejecting ? this.msg['deciding'] : this.msg['rejectConfirm']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </details>

        <dialog
          class="m-auto w-[calc(100%-2rem)] max-w-[398px] rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 text-[var(--text-default,currentColor)] backdrop:bg-[var(--overlay-backdrop-bg,transparent)]"
          aria-labelledby="confirm-title"
        >
          <div class="flex flex-col gap-4">
            <div>
              <h2 id="confirm-title" class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['confirmTitle']}</h2>
              <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['confirmLead']}</p>
            </div>
            <dl class="flex flex-col gap-2 rounded-lg bg-[var(--surface-alt-bg,transparent)] p-3">
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['filterLabel']}</dt>
                <dd class="font-medium text-[var(--text-strong,currentColor)]">${name}</dd>
              </div>
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factCategory']}</dt>
                <dd>${d.details.categoria} · ${formatDate(d.details.dataDespesa)}</dd>
              </div>
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factValue']}</dt>
                <dd class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${formatMoney(d.details.valor)}</dd>
              </div>
            </dl>
            <div aria-live="polite">
              ${this.approveExpenseError
                ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['decisionFailed']} ${this.approveExpenseError.message}</p>`
                : nothing}
            </div>
            <div class="flex flex-col gap-2">
              <grouptriggeraction--ml-button-standard
                data-variant="primary"
                size="lg"
                data-class="w-full"
                ?loading=${approving}
                ?disabled=${busy}
                @action=${(e: Event) => {
                  const dlg = (e.currentTarget as HTMLElement).closest('dialog');
                  this.approveExpense().then(() => {
                    if (this.approveExpenseStatus === 'success') dlg?.close();
                  });
                }}
              >
                <Label>${approving ? this.msg['deciding'] : this.msg['confirmApprove']}</Label>
              </grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                size="lg"
                data-class="w-full"
                ?disabled=${approving}
                @action=${(e: Event) => (e.currentTarget as HTMLElement).closest('dialog')?.close()}
              >
                <Label>${this.msg['confirmCancel']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </div>
        </dialog>
      </section>
    `;
  }
}
