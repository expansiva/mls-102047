/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';


/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Início do gestor',
  pageCaption: 'Acompanhe o que a sua equipe enviou para reembolso.',
  queueHeading: 'Despesas aguardando a sua decisão',
  queueText: 'As despesas dos colaboradores da sua equipe que ainda não foram analisadas ficam reunidas em uma única fila de pendências.',
  queueAction: 'Analisar despesas da equipe',
  stepsHeading: 'Como a análise funciona',
  step1: 'Abra a fila e veja o que está pendente.',
  step2: 'Leia a despesa de cada colaborador.',
  step3: 'Aprove ou rejeite, informando o motivo da rejeição.'
};

type PageMessageType = typeof pageMessage_pt;

const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

@customElement('reembolso-despesas--web--desktop--page11--inicio-102047')
export class ReembolsoDespesasDesktopPage11InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt;

  private renderHeader() {
    return html`
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageCaption']}</p>
      </header>
    `;
  }

  private renderQueueEntry() {
    return html`
      <section
        data-organism-id="despesasPendentesEquipe"
        class="flex flex-col justify-between gap-8 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-8"
      >
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['queueHeading']}</h2>
          <p class="max-w-prose text-sm leading-relaxed text-[var(--text-default,currentColor)]">${this.msg['queueText']}</p>
        </div>
        <div>
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="lg"
            @action=${() => this.abrirDespesasDaEquipe()}
          >
            <Label>${this.msg['queueAction']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  private renderSteps() {
    const steps = [this.msg['step1'], this.msg['step2'], this.msg['step3']];
    return html`
      <aside class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-6">
        <h2 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['stepsHeading']}</h2>
        <ol class="mt-4 flex flex-col gap-4">
          ${steps.map(
            (text, i) => html`
              <li class="flex items-start gap-3">
                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--status-neutral-bg,transparent)] text-xs font-semibold text-[var(--status-neutral-text,currentColor)]"
                  aria-hidden="true"
                  >${i + 1}</span
                >
                <span class="pt-0.5 text-sm text-[var(--text-default,currentColor)]">${text}</span>
              </li>
            `
          )}
        </ol>
      </aside>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] p-10">
        <div class="mx-auto max-w-5xl">
          ${this.renderHeader()}
          <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
            ${this.renderQueueEntry()} ${this.renderSteps()}
          </div>
        </div>
      </main>
    `;
  }
}
