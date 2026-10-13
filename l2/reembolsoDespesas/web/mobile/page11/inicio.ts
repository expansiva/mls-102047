/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Pendências da equipe',
  pageCaption: 'Gestor da equipe',
  queueLead: 'Despesas da sua equipe aguardam a sua análise e decisão.',
  queueHint: 'Todas elas ficam reunidas em uma fila para você tratar uma a uma.',
  stepsLabel: 'Como funciona',
  step1: 'Abra a fila de despesas pendentes',
  step2: 'Analise os dados de cada despesa',
  step3: 'Aprove ou rejeite, informando o motivo da rejeição',
  openQueue: 'Analisar despesas pendentes'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

@customElement('reembolso-despesas--web--mobile--page11--inicio-102047')
export class ReembolsoDespesasMobilePage11InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt;

  private renderStep(n: number, text: string) {
    return html`
      <li class="flex items-start gap-3 min-h-[44px] py-2">
        <span
          class="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]"
          aria-hidden="true"
          >${n}</span
        >
        <span class="text-base leading-snug text-[var(--text-default,currentColor)] pt-0.5">${text}</span>
      </li>
    `;
  }

  private renderQueue() {
    return html`
      <section
        data-organism-id="despesasPendentesEquipe"
        class="flex flex-col gap-5 rounded-2xl p-4 border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]"
      >
        <div class="flex flex-col gap-2">
          <p class="text-lg font-semibold leading-snug text-[var(--text-strong,currentColor)]">${this.msg['queueLead']}</p>
          <p class="text-sm leading-relaxed text-[var(--text-muted,currentColor)]">${this.msg['queueHint']}</p>
        </div>

        <div class="flex flex-col gap-1 rounded-xl p-3 bg-[var(--surface-alt-bg,transparent)]">
          <p class="text-xs font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['stepsLabel']}</p>
          <ol class="flex flex-col">
            ${this.renderStep(1, this.msg['step1'])} ${this.renderStep(2, this.msg['step2'])}
            ${this.renderStep(3, this.msg['step3'])}
          </ol>
        </div>

        <grouptriggeraction--ml-button-standard
          data-variant="primary"
          size="lg"
          data-class="w-full"
          @action=${() => this.abrirDespesasDaEquipe()}
        >
          <Label>${this.msg['openQueue']}</Label>
        </grouptriggeraction--ml-button-standard>
      </section>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="min-h-screen w-full max-w-[430px] mx-auto px-4 pt-6 pb-8 flex flex-col gap-5 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="flex flex-col gap-1">
          <p class="text-xs font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageCaption']}</p>
          <h1 class="text-2xl font-bold leading-tight text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
        </header>
        ${this.renderQueue()}
      </main>
    `;
  }
}
