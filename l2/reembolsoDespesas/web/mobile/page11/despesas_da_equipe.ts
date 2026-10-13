/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { ColaboradorNome, DespesaAnalise } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  filaTitulo: 'Despesas da equipe',
  analiseTitulo: 'Análise da despesa',
  voltar: 'Voltar à fila',
  colColaborador: 'Colaborador',
  colValor: 'Valor',
  colData: 'Data da despesa',
  colCategoria: 'Categoria',
  carregando: 'Carregando despesas pendentes…',
  vazio: 'Nenhuma despesa da equipe aguarda aprovação.',
  erroFila: 'Não foi possível carregar as despesas pendentes.',
  tentarNovamente: 'Tentar novamente',
  carregarMais: 'Carregar mais despesas',
  carregandoAnalise: 'Abrindo a despesa…',
  erroAnalise: 'Não foi possível abrir a despesa.',
  nenhumaSelecionada: 'Escolha uma despesa na fila para analisar.',
  situacao: 'Situação',
  descricao: 'Descrição',
  historico: 'Histórico',
  reenvio: 'Reenvio realizado',
  sim: 'Sim',
  nao: 'Não',
  motivoAnterior: 'Motivo da rejeição anterior',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  aprovar: 'Aprovar despesa',
  rejeitar: 'Rejeitar despesa',
  confirmarAprovacaoTitulo: 'Confirmar aprovação',
  confirmarAprovacaoTexto: 'Você vai aprovar a despesa de',
  noValor: 'no valor de',
  aprovarConfirmar: 'Sim, aprovar',
  cancelar: 'Voltar',
  motivoLabel: 'Motivo da rejeição',
  motivoAjuda: 'Informe o motivo para poder rejeitar a despesa.',
  motivoPlaceholder: 'Explique ao colaborador o que precisa ser corrigido',
  rejeitarConfirmar: 'Confirmar rejeição',
  processando: 'Registrando a decisão…',
  decisaoErro: 'Não foi possível registrar a decisão. O que você escreveu foi mantido; tente novamente.',
  decididaAprovada: 'Despesa aprovada e encaminhada ao financeiro.',
  decididaRejeitada: 'Despesa rejeitada. O motivo foi registrado.',
  decididaOutra: 'Esta despesa não está mais aguardando sua decisão.',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };

const lang = () => document.documentElement.lang || undefined;

function nomeDe(c: ColaboradorNome): string {
  return c.details.identification.details.identification.name;
}

function fmtMoney(v: string): string {
  const n = Number(v);
  if (v.trim() === '' || !Number.isFinite(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v: string): string {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(v);
  return new Intl.DateTimeFormat(lang(), dateOnly ? { timeZone: 'UTC' } : undefined).format(d);
}

function openConfirm(e: Event) {
  (e.currentTarget as HTMLElement).closest('[data-organism-id]')?.querySelector('dialog')?.showModal();
}

function closeConfirm(e: Event) {
  (e.currentTarget as HTMLElement).closest('dialog')?.close();
}

@customElement('reembolso-despesas--web--mobile--page11--despesas_da_equipe-102047')
export class ReembolsoDespesasMobilePage11Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt;

  private statusLabel(s: DespesaAnalise['status']): string {
    const m = this.msg;
    const map: Record<DespesaAnalise['status'], string> = {
      draft: m.statusDraft,
      awaitingApproval: m.statusAwaiting,
      rejected: m.statusRejected,
      approved: m.statusApproved,
      paid: m.statusPaid,
    };
    return map[s];
  }

  private openDespesa(index: number) {
    const row = this.despesas.items[index];
    if (!row) return;
    this.obterDespesaParaAnalise(row.id);
    this.setScenario('analise');
  }

  private renderFila() {
    const m = this.msg;
    const status = this.pageStatus;
    let body;
    if (status === 'error') {
      body = html`<div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex flex-col gap-3" aria-live="polite">
        <p class="text-[var(--text-default,currentColor)]">${m.erroFila}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" class="w-full" @action=${() => this.listarDespesasPendentesEquipe()}>
          <Label>${m.tentarNovamente}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    } else if (status === 'empty') {
      body = html`<p class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4 text-center text-[var(--text-muted,currentColor)]" aria-live="polite">${m.vazio}</p>`;
    } else if (status === 'loading' || status === 'idle') {
      body = html`<p class="p-4 text-center text-[var(--text-muted,currentColor)]" role="status" aria-busy="true">${m.carregando}</p>`;
    } else {
      const items = this.despesas.items;
      const idx = items.findIndex((d) => d.id === this.selectedDespesa);
      const loadingMore = this.listarDespesasPendentesEquipeStatus === 'loading';
      body = html`
        <groupviewtable--ml-responsive-table
          value=${idx >= 0 ? String(idx) : ''}
          ?loading=${loadingMore && items.length === 0}
          @rowClick=${(e: CustomEvent<{ index: number }>) => this.openDespesa(e.detail.index)}
          @change=${(e: Event) => e.stopPropagation()}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="colaborador">${m.colColaborador}</TableHead>
              <TableHead key="valor">${m.colValor}</TableHead>
              <TableHead key="data">${m.colData}</TableHead>
              <TableHead key="categoria">${m.colCategoria}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${items.map(
              (d) => html`<TableRow key=${d.id}>
                <TableCell>${nomeDe(d.colaborador)}</TableCell>
                <TableCell>${fmtMoney(d.details.details.valor)}</TableCell>
                <TableCell>${fmtDate(d.details.details.dataDespesa)}</TableCell>
                <TableCell>${d.details.details.categoria}</TableCell>
              </TableRow>`,
            )}
          </TableBody>
          <Empty>${m.vazio}</Empty>
        </groupviewtable--ml-responsive-table>
        ${this.despesas.hasMore
          ? html`<grouptriggeraction--ml-button-standard
              data-variant="secondary"
              class="w-full mt-3"
              ?loading=${loadingMore}
              @action=${() => this.listarDespesasPendentesEquipe(this.despesas.page + 1, true)}
            >
              <Label>${m.carregarMais}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      `;
    }
    return html`<section data-organism-id="despesasPendentes" class="flex flex-col gap-3">${body}</section>`;
  }

  private renderAnalise() {
    const m = this.msg;
    const st = this.obterDespesaParaAnaliseStatus;
    const d = this.despesa;
    if (st === 'loading') {
      return html`<p class="p-4 text-center text-[var(--text-muted,currentColor)]" role="status" aria-busy="true">${m.carregandoAnalise}</p>`;
    }
    if (st === 'error') {
      return html`<div class="rounded-lg border border-[var(--border-default,currentColor)] p-4 flex flex-col gap-3" aria-live="polite">
        <p class="text-[var(--text-default,currentColor)]">${m.erroAnalise}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" class="w-full" @action=${() => this.obterDespesaParaAnalise(this.selectedDespesa)}>
          <Label>${m.tentarNovamente}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    if (!d) {
      return html`<p class="p-4 text-center text-[var(--text-muted,currentColor)]">${m.nenhumaSelecionada}</p>`;
    }
    const f = d.details.details;
    return html`
      <div class="flex flex-col gap-5">
        <div data-organism-id="analiseDespesa" class="flex flex-col gap-5">
          <groupviewcard--ml-vertical-card>
            <CardHeader>
              <CardTitle>${nomeDe(d.colaborador)}</CardTitle>
              <CardDescription>${m.situacao}: ${this.statusLabel(d.status)}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl class="grid grid-cols-2 gap-x-4 gap-y-3">
                <div class="col-span-2">
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${m.colValor}</dt>
                  <dd class="text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(f.valor)}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${m.colData}</dt>
                  <dd class="text-[var(--text-default,currentColor)]">${fmtDate(f.dataDespesa)}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${m.colCategoria}</dt>
                  <dd class="text-[var(--text-default,currentColor)]">${f.categoria}</dd>
                </div>
              </dl>
            </CardContent>
          </groupviewcard--ml-vertical-card>

          <section class="flex flex-col gap-1">
            <h3 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${m.descricao}</h3>
            <p class="whitespace-pre-line text-[var(--text-default,currentColor)]">${f.descricao}</p>
          </section>

          <section class="flex flex-col gap-2">
            <h3 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${m.historico}</h3>
            <dl class="flex flex-col gap-2 text-sm">
              <div class="flex justify-between gap-4">
                <dt class="text-[var(--text-muted,currentColor)]">${m.reenvio}</dt>
                <dd class="text-[var(--text-default,currentColor)]">${f.reenvioRealizado ? m.sim : m.nao}</dd>
              </div>
              ${f.motivoRejeicao
                ? html`<div class="flex flex-col gap-1">
                    <dt class="text-[var(--text-muted,currentColor)]">${m.motivoAnterior}</dt>
                    <dd class="whitespace-pre-line text-[var(--text-default,currentColor)]">${f.motivoRejeicao}</dd>
                  </div>`
                : nothing}
            </dl>
          </section>
        </div>
        ${this.renderDecisao(d)}
      </div>
    `;
  }

  private renderDecisao(d: DespesaAnalise) {
    const m = this.msg;
    const decided = d.status !== 'awaitingApproval';
    if (decided) {
      const text = d.status === 'approved' ? m.decididaAprovada : d.status === 'rejected' ? m.decididaRejeitada : m.decididaOutra;
      return html`<section data-organism-id="decisaoDespesa" class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4 flex flex-col gap-2 border-t border-[var(--border-subtle,currentColor)]" role="status" aria-live="polite">
        <p class="font-medium text-[var(--text-strong,currentColor)]">${this.statusLabel(d.status)}</p>
        <p class="text-[var(--text-default,currentColor)]">${text}</p>
        ${d.status === 'rejected' && d.details.details.motivoRejeicao
          ? html`<p class="whitespace-pre-line text-sm text-[var(--text-muted,currentColor)]">${d.details.details.motivoRejeicao}</p>`
          : nothing}
      </section>`;
    }
    const approving = this.aprovarDespesaStatus === 'loading';
    const rejecting = this.rejeitarDespesaStatus === 'loading';
    const busy = approving || rejecting;
    const err = this.aprovarDespesaError ?? this.rejeitarDespesaError;
    const motivo = this.rejeitarDespesaDraft.details.motivoRejeicao ?? '';
    const canReject = motivo.trim().length > 0;
    return html`
      <section data-organism-id="decisaoDespesa" class="flex flex-col gap-3 pt-4 border-t border-[var(--border-subtle,currentColor)]" aria-busy=${busy ? 'true' : 'false'}>
        <div aria-live="polite">
          ${busy ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.processando}</p>` : nothing}
          ${err && !busy ? html`<p class="text-[var(--text-default,currentColor)]">${m.decisaoErro}</p>` : nothing}
        </div>

        <grouptriggeraction--ml-button-standard
          data-variant="primary"
          size="lg"
          class="w-full"
          ?disabled=${busy}
          ?loading=${approving}
          @action=${openConfirm}
        >
          <Label>${m.aprovar}</Label>
        </grouptriggeraction--ml-button-standard>

        <details class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <summary class="min-h-[44px] flex items-center justify-center px-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-medium text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] rounded-lg">${m.rejeitar}</summary>
          <div class="p-4 flex flex-col gap-3">
            <groupentertext--ml-multiline-text
              rows="4"
              required
              ?disabled=${busy}
              .value=${motivo}
              placeholder=${m.motivoPlaceholder}
              @input=${(e: CustomEvent<{ value: string }>) => {
                e.stopPropagation();
                this.setRejeitarDespesaDraft({ details: { motivoRejeicao: e.detail.value } });
              }}
              @change=${(e: Event) => e.stopPropagation()}
            >
              <Label>${m.motivoLabel}</Label>
              ${canReject ? nothing : html`<Helper>${m.motivoAjuda}</Helper>`}
            </groupentertext--ml-multiline-text>
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="lg"
              class="w-full"
              ?disabled=${!canReject || busy}
              ?loading=${rejecting}
              @action=${() => this.rejeitarDespesa()}
            >
              <Label>${m.rejeitarConfirmar}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </details>

        <dialog class="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl p-5 bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)] backdrop:bg-[var(--overlay-backdrop-bg,transparent)]" aria-labelledby="confirma-aprovacao">
          <div class="flex flex-col gap-4">
            <h3 id="confirma-aprovacao" class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${m.confirmarAprovacaoTitulo}</h3>
            <p>
              ${m.confirmarAprovacaoTexto}
              <strong class="text-[var(--text-strong,currentColor)]">${nomeDe(d.colaborador)}</strong>
              ${m.noValor}
              <strong class="text-[var(--text-strong,currentColor)]">${fmtMoney(d.details.details.valor)}</strong>.
            </p>
            <div class="flex flex-col gap-2">
              <grouptriggeraction--ml-button-standard
                data-variant="primary"
                size="lg"
                class="w-full"
                @action=${(e: Event) => {
                  closeConfirm(e);
                  this.aprovarDespesa();
                }}
              >
                <Label>${m.aprovarConfirmar}</Label>
              </grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard data-variant="ghost" size="lg" class="w-full" @action=${closeConfirm}>
                <Label>${m.cancelar}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          </div>
        </dialog>
      </section>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="min-h-screen w-full max-w-[430px] mx-auto px-4 py-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'fila'}
          .backLabel=${this.msg.voltar}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="fila" title=${this.msg.filaTitulo}>${this.renderFila()}</Scene>
          <Scene value="analise" title=${this.msg.analiseTitulo} nav="back" backTo="fila">${this.renderAnalise()}</Scene>
        </molecules--ml-scenary-102020>
      </main>
    `;
  }
}
