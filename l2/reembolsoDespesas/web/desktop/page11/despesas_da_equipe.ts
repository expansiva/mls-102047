/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { DespesaAnalise } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Despesas da equipe',
  pageSubtitle: 'Leia cada despesa pendente e registre a sua decisão.',
  queueCaption: 'Aguardando a sua aprovação',
  colCollaborator: 'Colaborador',
  colDate: 'Data da despesa',
  colCategory: 'Categoria',
  colValue: 'Valor',
  colStatus: 'Situação',
  queueEmpty: 'Nenhuma despesa da equipe aguarda aprovação.',
  queueError: 'Não foi possível carregar a fila de despesas.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  sceneWaitingTitle: 'Análise da despesa',
  sceneReviewTitle: 'Despesa em análise',
  backLabel: 'Fechar análise',
  waitingText: 'Escolha uma despesa na fila para ler os dados e decidir.',
  reviewLoadError: 'Não foi possível carregar a despesa.',
  factValue: 'Valor solicitado',
  factDate: 'Data da despesa',
  factCategory: 'Categoria',
  narrativeTitle: 'Descrição',
  trailTitle: 'Histórico',
  resubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  previousRejection: 'Motivo da rejeição anterior',
  decisionTitle: 'Sua decisão',
  approveOpen: 'Aprovar despesa',
  rejectOpen: 'Rejeitar despesa',
  rejectReasonLabel: 'Motivo da rejeição',
  rejectReasonHelper: 'Obrigatório. Explique ao colaborador o que precisa ser corrigido.',
  rejectReasonPlaceholder: 'Descreva o motivo da rejeição',
  rejectConfirm: 'Registrar rejeição',
  approveError: 'Não foi possível aprovar a despesa. Tente novamente.',
  rejectError: 'Não foi possível registrar a rejeição. O motivo digitado foi mantido; tente novamente.',
  dialogTitle: 'Enviar ao financeiro?',
  dialogText: 'Você está aprovando a despesa de',
  dialogBack: 'Voltar',
  dialogConfirm: 'Sim, aprovar',
  decidedApproved: 'Despesa aprovada. Ela segue para o financeiro.',
  decidedRejected: 'Despesa rejeitada. O colaborador verá o motivo informado.',
  decidedReason: 'Motivo da rejeição',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  loading: 'Carregando…',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };

type Status = DespesaAnalise['status'];

function lang() {
  return document.documentElement.lang || undefined;
}

function fmtDate(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || '');
  if (!m) return value || '';
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

function fmtMoney(value: string) {
  const n = Number(value);
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(n)) {
    return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
  }
  return value || '';
}

function statusLabel(msg: PageMessageType, s: Status) {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaiting;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
  }
}

function statusClass(s: Status) {
  switch (s) {
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'paid': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    default: return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function openConfirm(e: Event) {
  const host = (e.currentTarget as HTMLElement).closest('[data-organism-id]');
  host?.querySelector('dialog')?.showModal();
}

function closeConfirm(e: Event) {
  (e.currentTarget as HTMLElement).closest('dialog')?.close();
}

@customElement('reembolso-despesas--web--desktop--page11--despesas_da_equipe-102047')
export class ReembolsoDespesasDesktopPage11Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full p-6 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
        </header>
        <div class="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-6 items-start">
          ${this.renderQueue()}
          ${this.renderPanel()}
        </div>
      </div>
    `;
  }

  private renderQueue() {
    const rows = this.despesas?.items ?? [];
    const selectedIndex = rows.findIndex((r) => r.id === this.selectedDespesa);
    return html`
      <section data-organism-id="despesasPendentes" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        ${this.listarDespesasPendentesEquipeStatus === 'error'
          ? html`
              <div class="mb-3 flex items-center justify-between gap-3" aria-live="polite">
                <groupnotifyuser--ml-contextual-feedback type="error" visible .dismissible=${false} data-class="flex-1">
                  <Message>${this.msg['queueError']}</Message>
                </groupnotifyuser--ml-contextual-feedback>
                <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.listarDespesasPendentesEquipe(1); }}>
                  <Label>${this.msg['retry']}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>`
          : nothing}
        <groupviewtable--ml-data-table
          .value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
          .loading=${this.pageStatus === 'loading' || this.listarDespesasPendentesEquipeStatus === 'loading'}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const id = rows[e.detail.index]?.id;
            if (id) {
              this.setScenario('analise');
              void this.obterDespesaParaAnalise(id);
            }
          }}
        >
          <TableCaption>${this.msg['queueCaption']}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead key="colaborador">${this.msg['colCollaborator']}</TableHead>
              <TableHead key="data" sortable>${this.msg['colDate']}</TableHead>
              <TableHead key="categoria" sortable>${this.msg['colCategory']}</TableHead>
              <TableHead key="valor">${this.msg['colValue']}</TableHead>
              <TableHead key="situacao">${this.msg['colStatus']}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${rows.map((r) => html`
              <TableRow key=${r.id}>
                <TableCell>${r.colaborador.details.identification.details.identification.name}</TableCell>
                <TableCell sort-value=${r.details.details.dataDespesa}>${fmtDate(r.details.details.dataDespesa)}</TableCell>
                <TableCell>${r.details.details.categoria}</TableCell>
                <TableCell>${fmtMoney(r.details.details.valor)}</TableCell>
                <TableCell>${statusLabel(this.msg, r.status)}</TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>${this.msg['queueEmpty']}</Empty>
        </groupviewtable--ml-data-table>
        ${this.despesas?.hasMore
          ? html`
              <div class="mt-3 flex justify-center">
                <grouptriggeraction--ml-button-standard
                  data-variant="secondary"
                  size="sm"
                  .loading=${this.listarDespesasPendentesEquipeStatus === 'loading'}
                  @action=${() => { void this.listarDespesasPendentesEquipe((this.despesas?.page ?? 1) + 1, true); }}
                >
                  <Label>${this.msg['loadMore']}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>`
          : nothing}
      </section>
    `;
  }

  private renderPanel() {
    const d = this.despesa;
    return html`
      <section class="sticky top-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['backLabel']}
          .value=${this.scenary || (this.selectedDespesa ? 'analise' : 'aguardando')}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'aguardando') void this.obterDespesaParaAnalise(null);
            }
          }}
        >
          <Scene value="aguardando" title=${this.msg['sceneWaitingTitle']}>
            <p class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['waitingText']}</p>
          </Scene>
          <Scene value="analise" title=${this.msg['sceneReviewTitle']} nav="back" backTo="aguardando">
            <div data-organism-id="analiseDespesa" class="flex flex-col gap-6" aria-busy=${this.obterDespesaParaAnaliseStatus === 'loading' ? 'true' : 'false'}>
              ${this.obterDespesaParaAnaliseStatus === 'loading'
                ? html`
                    <div class="flex flex-col gap-3 animate-pulse" aria-live="polite">
                      <span class="sr-only">${this.msg['loading']}</span>
                      <div class="h-6 w-2/3 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
                      <div class="h-16 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
                      <div class="h-20 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
                    </div>`
                : this.obterDespesaParaAnaliseStatus === 'error'
                  ? html`
                      <div class="flex items-center justify-between gap-3" aria-live="polite">
                        <groupnotifyuser--ml-contextual-feedback type="error" visible .dismissible=${false} data-class="flex-1">
                          <Message>${this.msg['reviewLoadError']}</Message>
                        </groupnotifyuser--ml-contextual-feedback>
                        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { void this.obterDespesaParaAnalise(this.selectedDespesa); }}>
                          <Label>${this.msg['retry']}</Label>
                        </grouptriggeraction--ml-button-standard>
                      </div>`
                  : d ? this.renderReading(d) : nothing}
            </div>
            <div data-organism-id="decisaoDespesa" class="mt-6">
              ${d && this.obterDespesaParaAnaliseStatus === 'success' ? this.renderDecision(d) : nothing}
            </div>
          </Scene>
        </molecules--ml-scenary-102020>
      </section>
    `;
  }

  private renderReading(d: DespesaAnalise) {
    const det = d.details.details;
    const name = d.colaborador.details.identification.details.identification.name;
    return html`
      <div class="flex items-center justify-between gap-3">
        <p class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${name}</p>
        <span class="rounded-full px-3 py-1 text-xs font-medium ${statusClass(d.status)}">${statusLabel(this.msg, d.status)}</span>
      </div>
      <dl class="grid grid-cols-3 gap-4 rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4">
        <div>
          <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factValue']}</dt>
          <dd class="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(det.valor)}</dd>
        </div>
        <div>
          <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factDate']}</dt>
          <dd class="mt-1 text-base font-medium text-[var(--text-strong,currentColor)]">${fmtDate(det.dataDespesa)}</dd>
        </div>
        <div>
          <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['factCategory']}</dt>
          <dd class="mt-1 text-base font-medium text-[var(--text-strong,currentColor)]">${det.categoria}</dd>
        </div>
      </dl>
      <div>
        <h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['narrativeTitle']}</h3>
        <p class="whitespace-pre-wrap text-sm leading-relaxed">${det.descricao}</p>
      </div>
      <div>
        <h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['trailTitle']}</h3>
        <ul class="flex flex-col gap-1 text-sm text-[var(--text-muted,currentColor)]">
          <li>${this.msg['resubmitted']}: ${det.reenvioRealizado ? this.msg['yes'] : this.msg['no']}</li>
          ${det.motivoRejeicao
            ? html`<li>${this.msg['previousRejection']}: <span class="whitespace-pre-wrap">${det.motivoRejeicao}</span></li>`
            : nothing}
        </ul>
      </div>
    `;
  }

  private renderDecision(d: DespesaAnalise) {
    const det = d.details.details;
    const name = d.colaborador.details.identification.details.identification.name;

    if (d.status === 'approved' || d.status === 'rejected') {
      return html`
        <div class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4" aria-live="polite">
          <p class="text-sm font-medium text-[var(--text-strong,currentColor)]">
            ${d.status === 'approved' ? this.msg['decidedApproved'] : this.msg['decidedRejected']}
          </p>
          ${d.status === 'rejected' && det.motivoRejeicao
            ? html`<p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg['decidedReason']}: <span class="whitespace-pre-wrap">${det.motivoRejeicao}</span></p>`
            : nothing}
        </div>
      `;
    }

    const approving = this.aprovarDespesaStatus === 'loading';
    const rejecting = this.rejeitarDespesaStatus === 'loading';
    const busy = approving || rejecting;
    const reason = this.rejeitarDespesaDraft?.details?.motivoRejeicao ?? '';
    const onReason = (e: Event) => {
      const v = (e as CustomEvent<{ value: string }>).detail?.value;
      if (typeof v === 'string') this.setRejeitarDespesaDraft({ details: { motivoRejeicao: v } });
    };

    return html`
      <div class="border-t border-[var(--border-subtle,currentColor)] pt-5" aria-busy=${busy ? 'true' : 'false'}>
        <h3 class="mb-3 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['decisionTitle']}</h3>
        ${this.aprovarDespesaStatus === 'error' || this.rejeitarDespesaStatus === 'error'
          ? html`
              <div class="mb-3" aria-live="polite">
                <groupnotifyuser--ml-contextual-feedback type="error" visible .dismissible=${false}>
                  <Message>${this.aprovarDespesaStatus === 'error' ? this.msg['approveError'] : this.msg['rejectError']}</Message>
                </groupnotifyuser--ml-contextual-feedback>
              </div>`
          : nothing}
        <div class="flex items-start gap-3">
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            .loading=${approving}
            .disabled=${busy}
            @action=${openConfirm}
          >
            <Label>${this.msg['approveOpen']}</Label>
          </grouptriggeraction--ml-button-standard>
          <details class="flex-1">
            <summary class="inline-flex min-h-[40px] cursor-pointer select-none items-center rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">
              ${this.msg['rejectOpen']}
            </summary>
            <div class="mt-3 flex flex-col gap-3">
              <groupentertext--ml-multiline-text
                .value=${reason}
                .rows=${4}
                .disabled=${busy}
                required
                placeholder=${this.msg['rejectReasonPlaceholder']}
                @input=${onReason}
                @change=${onReason}
              >
                <Label>${this.msg['rejectReasonLabel']}</Label>
                <Helper>${this.msg['rejectReasonHelper']}</Helper>
              </groupentertext--ml-multiline-text>
              <div>
                <grouptriggeraction--ml-button-standard
                  data-variant="secondary"
                  .loading=${rejecting}
                  .disabled=${busy || reason.trim() === ''}
                  @action=${() => { void this.rejeitarDespesa(); }}
                >
                  <Label>${this.msg['rejectConfirm']}</Label>
                </grouptriggeraction--ml-button-standard>
              </div>
            </div>
          </details>
        </div>
        <dialog class="m-auto w-[420px] max-w-[90vw] rounded-lg bg-[var(--surface-bg,transparent)] p-6 text-[var(--text-default,currentColor)] backdrop:bg-[var(--overlay-backdrop-bg,transparent)]">
          <h4 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['dialogTitle']}</h4>
          <p class="mt-2 text-sm">${this.msg['dialogText']} <strong>${name}</strong>.</p>
          <p class="mt-3 text-sm text-[var(--text-muted,currentColor)]">${det.categoria} · ${fmtDate(det.dataDespesa)}</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(det.valor)}</p>
          <div class="mt-6 flex justify-end gap-3">
            <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${closeConfirm}>
              <Label>${this.msg['dialogBack']}</Label>
            </grouptriggeraction--ml-button-standard>
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              @action=${(e: Event) => { closeConfirm(e); void this.aprovarDespesa(); }}
            >
              <Label>${this.msg['dialogConfirm']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </dialog>
      </div>
    `;
  }
}
