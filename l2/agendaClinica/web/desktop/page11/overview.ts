/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/overview.ts" enhancement="_102027_/l2/enhancementLit" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

@customElement('agenda-clinica--web--desktop--page11--overview-102047')
export class AgendaClinicaOverview102047 extends StateLitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <main class="review-lab">
        <section class="review-lab__hero">
          <span class="review-lab__eyebrow">Collab Studio · L4</span>
          <h1>Laboratório de revisão humana</h1>
          <p>
            Este ambiente reúne os módulos do projeto 102047 para revisar, com clareza,
            o que o sistema entendeu antes de qualquer aplicação ou execução.
          </p>
          <div class="review-lab__steps" aria-label="Como abrir a revisão">
            <span><strong>1</strong> Ative o modo Studio</span>
            <span><strong>2</strong> Entre no nível L4</span>
            <span><strong>3</strong> Abra Comportamento</span>
          </div>
        </section>

        <section class="review-lab__cards" aria-label="Recursos disponíveis">
          <article>
            <span class="review-lab__icon" aria-hidden="true">01</span>
            <h2>Visão geral</h2>
            <p>Escopo, idiomas, atores e indicadores essenciais do módulo selecionado.</p>
          </article>
          <article>
            <span class="review-lab__icon" aria-hidden="true">02</span>
            <h2>Pipeline visível</h2>
            <p>Progresso das oito etapas, alertas do oráculo, custo e mudanças planejadas.</p>
          </article>
          <article>
            <span class="review-lab__icon" aria-hidden="true">03</span>
            <h2>Edição segura</h2>
            <p>Os ajustes da aba Geral são preparados no tobe; aplicar e executar permanecem bloqueados.</p>
          </article>
        </section>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'agenda-clinica--web--desktop--page11--overview-102047': AgendaClinicaOverview102047;
  }
}
