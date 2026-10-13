/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Despesas da equipe',
  pageSubtitle: 'Veja o que está esperando a sua decisão e siga direto para a análise.',
  metricLabel: 'Aguardando sua decisão',
  metricHelper: 'despesas da equipe para analisar',
  listHeading: 'Fila de análise',
  colCollaborator: 'Colaborador',
  colDate: 'Data da despesa',
  colCategory: 'Categoria',
  colValue: 'Valor',
  colResubmission: 'Reenvio',
  colAction: 'Ação',
  resubmitted: 'Reenviada após correção',
  analyze: 'Analisar despesa',
  empty: 'Nenhuma despesa da equipe está esperando a sua decisão.',
  loading: 'Carregando as despesas pendentes…',
  errorTitle: 'Não foi possível carregar as despesas pendentes.',
  retry: 'Tentar novamente'
};
/// **collab_i18n_end**
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };

function lang() {
  return document.documentElement.lang || undefined;
}

function formatDate(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(lang()).format(d);
}

function formatMoney(value: string) {
  const n = Number(value);
  if (value === '' || !Number.isFinite(n)) return value;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

@customElement('reembolso-despesas--web--desktop--page11--inicio-102047')
export class ReembolsoDespesasDesktopPage11InicioPage extends ReembolsoDespesasInicioShared {
  private msg!: PageMessageType;

  private renderRow(item: DespesaPendente) {
    const d = item.details.details;
    const name = item.colaborador.details.identification.details.identification.name;
    return html`
      <TableRow key=${item.id}>
        <TableCell><span class="font-medium text-[var(--text-strong,currentColor)]">${name}</span></TableCell>
        <TableCell>${formatDate(d.dataDespesa)}</TableCell>
        <TableCell>${d.categoria}</TableCell>
        <TableCell><div class="text-right font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(d.valor)}</div></TableCell>
        <TableCell>
          ${d.reenvioRealizado
            ? html`<span class="inline-block rounded-full px-2 py-0.5 text-xs bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]">${this.msg['resubmitted']}</span>`
            : html`<span class="text-[var(--text-muted,currentColor)]">—</span>`}
        </TableCell>
        <TableCell>
          <span class="inline-block" @click=${(e: Event) => e.stopPropagation()}>
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.abrirAnaliseDespesas(item.id)}>
              <Label>${this.msg['analyze']}</Label>
            </grouptriggeraction--ml-button-standard>
          </span>
        </TableCell>
      </TableRow>`;
  }

  private renderError() {
    if (!this.qryInicioError) return nothing;
    return html`
      <div role="alert" aria-live="polite" class="mb-4 flex items-center justify-between gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] px-4 py-3 text-[var(--status-error-text,currentColor)]">
        <span>${this.msg['errorTitle']}</span>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.qryInicio()}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const list = this.despesasPendentes;
    const items = list ? list.items : [];
    const loading = this.pageStatus === 'loading' || this.qryInicioStatus === 'loading';
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-8">
        <div class="mx-auto max-w-6xl flex flex-col gap-6">
          <header class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
            <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
          </header>
          <div data-organism-id="caixaDespesasPendentes" class="flex flex-col gap-6">
            <div class="max-w-sm">
              <groupviewmetric--ml-metric-card .loading=${loading && !list}>
                <Label>${this.msg['metricLabel']}</Label>
                <Value>${new Intl.NumberFormat(lang()).format(this.totalPendentes ?? 0)}</Value>
                <Helper>${this.msg['metricHelper']}</Helper>
              </groupviewmetric--ml-metric-card>
            </div>
            <section class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
              <h2 class="mb-4 text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['listHeading']}</h2>
              ${this.renderError()}
              <groupviewtable--ml-data-table
                .loading=${loading}
                .page=${list ? list.page : 1}
                .pageSize=${list ? list.pageSize : 0}
                .totalItems=${this.totalPendentes ?? 0}
                @pageChange=${(e: CustomEvent<{ page: number }>) => this.qryInicio(e.detail.page)}
                @rowClick=${(e: CustomEvent<{ index: number }>) => {
                  const row = items[e.detail.index];
                  if (row) this.abrirAnaliseDespesas(row.id);
                }}>
                <TableHeader>
                  <TableRow>
                    <TableHead key="colaborador">${this.msg['colCollaborator']}</TableHead>
                    <TableHead key="dataDespesa">${this.msg['colDate']}</TableHead>
                    <TableHead key="categoria">${this.msg['colCategory']}</TableHead>
                    <TableHead key="valor" align="right">${this.msg['colValue']}</TableHead>
                    <TableHead key="reenvio">${this.msg['colResubmission']}</TableHead>
                    <TableHead key="acao">${this.msg['colAction']}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  ${items.map(item => this.renderRow(item))}
                </TableBody>
                <Empty><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['empty']}</div></Empty>
                <Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['loading']}</div></Loading>
              </groupviewtable--ml-data-table>
            </section>
          </div>
        </div>
      </main>`;
  }
}
