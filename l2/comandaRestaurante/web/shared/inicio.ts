/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type { InicioContracts, ResumoOperacional } from '/_102047_/l2/comandaRestaurante/web/contracts/inicio.defs.js';
export type { InicioContracts, ResumoOperacional } from '/_102047_/l2/comandaRestaurante/web/contracts/inicio.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;
type Input<R extends keyof InicioContracts> = InicioContracts[R]['input'];
type Output<R extends keyof InicioContracts> = InicioContracts[R]['output'];

type StateMember = 'resumoOperacional' | 'pageStatus' | 'carregarResumoOperacionalStatus' | 'carregarResumoOperacionalError' | 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.comandaRestaurante.inicio.resumoOperacional': 'resumoOperacional',
  'ui.comandaRestaurante.inicio.pageStatus': 'pageStatus',
  'ui.comandaRestaurante.inicio.carregarResumoOperacionalStatus': 'carregarResumoOperacionalStatus',
  'ui.comandaRestaurante.inicio.carregarResumoOperacionalError': 'carregarResumoOperacionalError',
  'ui.comandaRestaurante.inicio.scenary': 'scenary'
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class ComandaRestauranteInicioShared extends StateLitElement {
  /** state resumoOperacional — Indicadores consolidados da operação do restaurante para a visão geral.; source carregarResumoOperacional.resumoOperacional; organism resumoOperacional */
  @property({ attribute: false }) resumoOperacional: ResumoOperacional | null = null;

  /** state pageStatus — the overall loading state of the page; source pageStatus */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state carregarResumoOperacionalStatus — the execution status of the operational summary query; source carregarResumoOperacional.status */
  @property({ attribute: false }) carregarResumoOperacionalStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state carregarResumoOperacionalError — the error returned by the operational summary query; source carregarResumoOperacional.error */
  @property({ attribute: false }) carregarResumoOperacionalError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.comandaRestaurante.inicio.${member}`, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) {
      (this as unknown as Record<string, unknown>)[member] = value;
    }
  }

  private unexpectedError(name: string): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('carregarResumoOperacionalStatus', 'idle');
    this.publish('carregarResumoOperacionalError', null);
    this.publish('scenary', '');
  }

  public connectedCallback(): void {
    super.connectedCallback();
    for (const key of STATE_KEYS) {
      const member = STATE_MEMBER_BY_KEY[key];
      if (member === 'resumoOperacional') {
        const value = getState(key);
        if (value !== undefined) {
          this.assignState(key, value);
        }
      }
    }
    this.resetVisit();
    subscribe(STATE_KEYS, this);
    void this.carregarResumoOperacional();
  }

  public disconnectedCallback(): void {
    unsubscribe(STATE_KEYS, this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!STATE_MEMBER_BY_KEY[key]) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) {
      return;
    }
    this.assignState(key, value);
    this.requestUpdate();
  }

  /** function setScenario — changes the visible scene of the page; redraws scenary by replacement; value is the scene identifier */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** function carregarResumoOperacional — loads the consolidated operational indicators used for quick consultation; redraws resumoOperacional by replacement; no arguments are required */
  public async carregarResumoOperacional(): Promise<void> {
    if (this.carregarResumoOperacionalStatus === 'loading') {
      return;
    }
    this.publish('pageStatus', 'loading');
    this.publish('carregarResumoOperacionalStatus', 'loading');
    this.publish('carregarResumoOperacionalError', null);
    try {
      const response = await execBff<Output<'comandaRestaurante.inicio.carregarResumoOperacional'>>('comandaRestaurante.inicio.carregarResumoOperacional', {} as Input<'comandaRestaurante.inicio.carregarResumoOperacional'>, { mode: 'silent' });
      if (!response.ok || !response.data) {
        const error = response.error ?? this.unexpectedError('response');
        this.publish('carregarResumoOperacionalError', error);
        this.publish('carregarResumoOperacionalStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      this.publish('resumoOperacional', response.data.resumoOperacional);
      this.publish('carregarResumoOperacionalStatus', 'success');
      this.publish('pageStatus', 'success');
    } catch (error: unknown) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('carregarResumoOperacionalError', this.unexpectedError(name));
      this.publish('carregarResumoOperacionalStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }
}
