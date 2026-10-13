/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/shared/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

// every state and status member, and nothing else
type StateMember = 'pageStatus' | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.reembolsoDespesas.inicio.pageStatus': 'pageStatus',
  'ui.reembolsoDespesas.inicio.scenary': 'scenary',
};

const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class ReembolsoDespesasInicioShared extends StateLitElement {
  /** state pageStatus — overall status of the page; this hub has no load, so it is 'success' once entered; source none (status member) */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.reembolsoDespesas.inicio.${member}`, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private resetVisit(): void {
    this.publish('scenary', '');
    this.publish('pageStatus', 'success');
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
  }

  public disconnectedCallback(): void {
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!(key in STATE_MEMBER_BY_KEY)) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  /** setScenario — publishes the visible scene of the page; redraws scenary (replace); value is the scene id, '' for none */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** function abrirDespesasDaEquipe — opens the team expenses page (the manager's pending queue); redraws no state, navigates to despesas_da_equipe; no arguments */
  public abrirDespesasDaEquipe(): void {
    auraNavigate('/reembolsoDespesas/despesas_da_equipe', { basePath: '/reembolsoDespesas' });
  }
}
