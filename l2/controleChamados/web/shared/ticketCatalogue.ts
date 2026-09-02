/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  QryListTicketInput,
  QryListTicketOutput,
  CmdCreateTicketInput,
  CmdCreateTicketOutput,
  CmdUpdateTicketInput,
  CmdUpdateTicketOutput,
  CmdDeleteTicketInput,
  CmdDeleteTicketOutput,
  QryGetTicketInput,
  QryGetTicketOutput,
  QryLocateTicketInput,
  QryLocateTicketOutput,
  CmdDecideClosureInput,
  CmdDecideClosureOutput,
} from '/_102047_/l2/controleChamados/web/contracts/ticketCatalogue.js';
import {
  qryListTicketRoute,
  cmdCreateTicketRoute,
  cmdUpdateTicketRoute,
  cmdDeleteTicketRoute,
  qryGetTicketRoute,
  qryLocateTicketRoute,
  cmdDecideClosureRoute,
} from '/_102047_/l2/controleChamados/web/contracts/ticketCatalogue.js';

export type {
  QryListTicketInput,
  QryListTicketOutput,
  CmdCreateTicketInput,
  CmdCreateTicketOutput,
  CmdUpdateTicketInput,
  CmdUpdateTicketOutput,
  CmdDeleteTicketInput,
  CmdDeleteTicketOutput,
  QryGetTicketInput,
  QryGetTicketOutput,
  QryLocateTicketInput,
  QryLocateTicketOutput,
  CmdDecideClosureInput,
  CmdDecideClosureOutput,
} from '/_102047_/l2/controleChamados/web/contracts/ticketCatalogue.js';


const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.ticketCatalogue.status',
  'ui.ticketCatalogue.scenary',
  'ui.ticketCatalogue.action.qryListTicket.status',
  'ui.ticketCatalogue.input.qryListTicket.search',
  'ui.ticketCatalogue.input.qryListTicket.sortBy',
  'ui.ticketCatalogue.input.qryListTicket.sortOrder',
  'ui.ticketCatalogue.data.qryListTicket',
  'ui.ticketCatalogue.action.cmdCreateTicket.status',
  'ui.ticketCatalogue.input.cmdCreateTicket.title',
  'ui.ticketCatalogue.input.cmdCreateTicket.description',
  'ui.ticketCatalogue.input.cmdCreateTicket.status',
  'ui.ticketCatalogue.output.cmdCreateTicket',
  'ui.ticketCatalogue.action.cmdCreateTicket.error',
  'ui.ticketCatalogue.action.cmdUpdateTicket.status',
  'ui.ticketCatalogue.input.cmdUpdateTicket.ticketId',
  'ui.ticketCatalogue.input.cmdUpdateTicket.title',
  'ui.ticketCatalogue.input.cmdUpdateTicket.description',
  'ui.ticketCatalogue.input.cmdUpdateTicket.status',
  'ui.ticketCatalogue.output.cmdUpdateTicket',
  'ui.ticketCatalogue.action.cmdUpdateTicket.error',
  'ui.ticketCatalogue.action.cmdDeleteTicket.status',
  'ui.ticketCatalogue.input.cmdDeleteTicket.ticketId',
  'ui.ticketCatalogue.output.cmdDeleteTicket',
  'ui.ticketCatalogue.action.cmdDeleteTicket.error',
  'ui.ticketCatalogue.action.qryGetTicket.status',
  'ui.ticketCatalogue.input.qryGetTicket.ticketId',
  'ui.ticketCatalogue.data.qryGetTicket',
  'ui.ticketCatalogue.action.qryLocateTicket.status',
  'ui.ticketCatalogue.data.qryLocateTicket',
  'ui.ticketCatalogue.action.cmdDecideClosure.status',
  'ui.ticketCatalogue.input.cmdDecideClosure.ticketId',
  'ui.ticketCatalogue.input.cmdDecideClosure.status',
  'ui.ticketCatalogue.output.cmdDecideClosure',
  'ui.ticketCatalogue.action.cmdDecideClosure.error',
];

export class ControleChamadosTicketCatalogueBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state ui.ticketCatalogue.scenary — values: base|detail|createTicket|updateTicket|decideClosure */
  @property() uiScenary: 'base' | 'detail' | 'createTicket' | 'updateTicket' | 'decideClosure' = 'base';
  /** state qryListTicketState — actionStatus, values: idle|loading|success|error */
  @property() qryListTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryListTicketSearch — input */
  @property() qryListTicketSearch: string = '';
  /** state qryListTicketSortBy — input, values: open|closed */
  @property() qryListTicketSortBy: string = '';
  /** state qryListTicketSortOrder — input, values: asc|desc */
  @property() qryListTicketSortOrder: string = '';
  /** state qryListTicketData — queryResult, outputShape: array */
  @property() qryListTicketData: QryListTicketOutput[] = [];
  /** state cmdCreateTicketState — actionStatus, values: idle|loading|success|error */
  @property() cmdCreateTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdCreateTicketTitle — input */
  @property() cmdCreateTicketTitle: string = '';
  /** state cmdCreateTicketDescription — input */
  @property() cmdCreateTicketDescription: string = '';
  /** state cmdCreateTicketStatus — input, values: open|closed */
  @property() cmdCreateTicketStatus: string = '';
  /** state cmdCreateTicketOutput — commandOutput */
  @property() cmdCreateTicketOutput: CmdCreateTicketOutput | null = null;
  /** state cmdCreateTicketError — actionError */
  @property() cmdCreateTicketError: string = '';
  /** state cmdUpdateTicketState — actionStatus, values: idle|loading|success|error */
  @property() cmdUpdateTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdUpdateTicketTicketId — input */
  @property() cmdUpdateTicketTicketId: string = '';
  /** state cmdUpdateTicketTitle — input */
  @property() cmdUpdateTicketTitle: string = '';
  /** state cmdUpdateTicketDescription — input */
  @property() cmdUpdateTicketDescription: string = '';
  /** state cmdUpdateTicketStatus — input, values: open|closed */
  @property() cmdUpdateTicketStatus: string = '';
  /** state cmdUpdateTicketOutput — commandOutput */
  @property() cmdUpdateTicketOutput: CmdUpdateTicketOutput | null = null;
  /** state cmdUpdateTicketError — actionError */
  @property() cmdUpdateTicketError: string = '';
  /** state cmdDeleteTicketState — actionStatus, values: idle|loading|success|error */
  @property() cmdDeleteTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdDeleteTicketTicketId — input */
  @property() cmdDeleteTicketTicketId: string = '';
  /** state cmdDeleteTicketOutput — commandOutput */
  @property() cmdDeleteTicketOutput: CmdDeleteTicketOutput | null = null;
  /** state cmdDeleteTicketError — actionError */
  @property() cmdDeleteTicketError: string = '';
  /** state qryGetTicketState — actionStatus, values: idle|loading|success|error */
  @property() qryGetTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryGetTicketTicketId — input */
  @property() qryGetTicketTicketId: string = '';
  /** state qryGetTicketData — queryResult, outputShape: object */
  @property() qryGetTicketData: QryGetTicketOutput | null = null;
  /** state qryLocateTicketState — actionStatus, values: idle|loading|success|error */
  @property() qryLocateTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryLocateTicketData — queryResult, outputShape: array */
  @property() qryLocateTicketData: QryLocateTicketOutput[] = [];
  /** state cmdDecideClosureState — actionStatus, values: idle|loading|success|error */
  @property() cmdDecideClosureState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdDecideClosureTicketId — input */
  @property() cmdDecideClosureTicketId: string = '';
  /** state cmdDecideClosureStatus — input, values: open|closed */
  @property() cmdDecideClosureStatus: string = '';
  /** state cmdDecideClosureOutput — commandOutput */
  @property() cmdDecideClosureOutput: CmdDecideClosureOutput | null = null;
  /** state cmdDecideClosureError — actionError */
  @property() cmdDecideClosureError: string = '';

  connectedCallback(): void {
    super.connectedCallback();
    this.initStateValue('ui.ticketCatalogue.status', '');
    this.initStateValue('ui.ticketCatalogue.scenary', 'base');
    this.initStateValue('ui.ticketCatalogue.action.qryListTicket.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.input.qryListTicket.search', '');
    this.initStateValue('ui.ticketCatalogue.input.qryListTicket.sortBy', '');
    this.initStateValue('ui.ticketCatalogue.input.qryListTicket.sortOrder', '');
    this.initStateValue('ui.ticketCatalogue.data.qryListTicket', []);
    this.initStateValue('ui.ticketCatalogue.action.cmdCreateTicket.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.input.cmdCreateTicket.title', '');
    this.initStateValue('ui.ticketCatalogue.input.cmdCreateTicket.description', '');
    this.initStateValue('ui.ticketCatalogue.input.cmdCreateTicket.status', '');
    this.initStateValue('ui.ticketCatalogue.output.cmdCreateTicket', null);
    this.initStateValue('ui.ticketCatalogue.action.cmdCreateTicket.error', '');
    this.initStateValue('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.input.cmdUpdateTicket.ticketId', '');
    this.initStateValue('ui.ticketCatalogue.input.cmdUpdateTicket.title', '');
    this.initStateValue('ui.ticketCatalogue.input.cmdUpdateTicket.description', '');
    this.initStateValue('ui.ticketCatalogue.input.cmdUpdateTicket.status', '');
    this.initStateValue('ui.ticketCatalogue.output.cmdUpdateTicket', null);
    this.initStateValue('ui.ticketCatalogue.action.cmdUpdateTicket.error', '');
    this.initStateValue('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.input.cmdDeleteTicket.ticketId', '');
    this.initStateValue('ui.ticketCatalogue.output.cmdDeleteTicket', null);
    this.initStateValue('ui.ticketCatalogue.action.cmdDeleteTicket.error', '');
    this.initStateValue('ui.ticketCatalogue.action.qryGetTicket.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.input.qryGetTicket.ticketId', '');
    this.initStateValue('ui.ticketCatalogue.data.qryGetTicket', null);
    this.initStateValue('ui.ticketCatalogue.action.qryLocateTicket.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.data.qryLocateTicket', []);
    this.initStateValue('ui.ticketCatalogue.action.cmdDecideClosure.status', 'idle');
    this.initStateValue('ui.ticketCatalogue.input.cmdDecideClosure.ticketId', '');
    this.initStateValue('ui.ticketCatalogue.input.cmdDecideClosure.status', '');
    this.initStateValue('ui.ticketCatalogue.output.cmdDecideClosure', null);
    this.initStateValue('ui.ticketCatalogue.action.cmdDecideClosure.error', '');
    this.syncRouteParams();
    this.applyUrlScenary();
    subscribe(SUBSCRIBED_STATE_KEYS, this);
    void this.loadQryListTicket();
    void this.loadQryLocateTicket();
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.ticketCatalogue.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.scenary':
        this.uiScenary = (value as 'base' | 'detail' | 'createTicket' | 'updateTicket' | 'decideClosure') ?? 'base';
        break;
      case 'ui.ticketCatalogue.action.qryListTicket.status':
        this.qryListTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.qryListTicket.search':
        this.qryListTicketSearch = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.qryListTicket.sortBy':
        this.qryListTicketSortBy = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.qryListTicket.sortOrder':
        this.qryListTicketSortOrder = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.data.qryListTicket':
        this.qryListTicketData = (value as QryListTicketOutput[]) ?? [];
        break;
      case 'ui.ticketCatalogue.action.cmdCreateTicket.status':
        this.cmdCreateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdCreateTicket.title':
        this.cmdCreateTicketTitle = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdCreateTicket.description':
        this.cmdCreateTicketDescription = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdCreateTicket.status':
        this.cmdCreateTicketStatus = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdCreateTicket':
        this.cmdCreateTicketOutput = (value as CmdCreateTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdCreateTicket.error':
        this.cmdCreateTicketError = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.action.cmdUpdateTicket.status':
        this.cmdUpdateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.ticketId':
        this.cmdUpdateTicketTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.title':
        this.cmdUpdateTicketTitle = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.description':
        this.cmdUpdateTicketDescription = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.status':
        this.cmdUpdateTicketStatus = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdUpdateTicket':
        this.cmdUpdateTicketOutput = (value as CmdUpdateTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdUpdateTicket.error':
        this.cmdUpdateTicketError = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.action.cmdDeleteTicket.status':
        this.cmdDeleteTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdDeleteTicket.ticketId':
        this.cmdDeleteTicketTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdDeleteTicket':
        this.cmdDeleteTicketOutput = (value as CmdDeleteTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdDeleteTicket.error':
        this.cmdDeleteTicketError = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.action.qryGetTicket.status':
        this.qryGetTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.qryGetTicket.ticketId':
        this.qryGetTicketTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.data.qryGetTicket':
        this.qryGetTicketData = (value as QryGetTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.qryLocateTicket.status':
        this.qryLocateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.data.qryLocateTicket':
        this.qryLocateTicketData = (value as QryLocateTicketOutput[]) ?? [];
        break;
      case 'ui.ticketCatalogue.action.cmdDecideClosure.status':
        this.cmdDecideClosureState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdDecideClosure.ticketId':
        this.cmdDecideClosureTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdDecideClosure.status':
        this.cmdDecideClosureStatus = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdDecideClosure':
        this.cmdDecideClosureOutput = (value as CmdDecideClosureOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdDecideClosure.error':
        this.cmdDecideClosureError = (value as string) ?? '';
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  private initStateValue(stateKey: string, defaultValue: unknown): void {
    const existing: unknown = getState(stateKey);
    const value: unknown = existing !== undefined ? existing : defaultValue;
    switch (stateKey) {
      case 'ui.ticketCatalogue.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.scenary':
        this.uiScenary = (value as 'base' | 'detail' | 'createTicket' | 'updateTicket' | 'decideClosure') ?? 'base';
        break;
      case 'ui.ticketCatalogue.action.qryListTicket.status':
        this.qryListTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.qryListTicket.search':
        this.qryListTicketSearch = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.qryListTicket.sortBy':
        this.qryListTicketSortBy = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.qryListTicket.sortOrder':
        this.qryListTicketSortOrder = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.data.qryListTicket':
        this.qryListTicketData = (value as QryListTicketOutput[]) ?? [];
        break;
      case 'ui.ticketCatalogue.action.cmdCreateTicket.status':
        this.cmdCreateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdCreateTicket.title':
        this.cmdCreateTicketTitle = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdCreateTicket.description':
        this.cmdCreateTicketDescription = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdCreateTicket.status':
        this.cmdCreateTicketStatus = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdCreateTicket':
        this.cmdCreateTicketOutput = (value as CmdCreateTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdCreateTicket.error':
        this.cmdCreateTicketError = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.action.cmdUpdateTicket.status':
        this.cmdUpdateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.ticketId':
        this.cmdUpdateTicketTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.title':
        this.cmdUpdateTicketTitle = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.description':
        this.cmdUpdateTicketDescription = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdUpdateTicket.status':
        this.cmdUpdateTicketStatus = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdUpdateTicket':
        this.cmdUpdateTicketOutput = (value as CmdUpdateTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdUpdateTicket.error':
        this.cmdUpdateTicketError = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.action.cmdDeleteTicket.status':
        this.cmdDeleteTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdDeleteTicket.ticketId':
        this.cmdDeleteTicketTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdDeleteTicket':
        this.cmdDeleteTicketOutput = (value as CmdDeleteTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdDeleteTicket.error':
        this.cmdDeleteTicketError = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.action.qryGetTicket.status':
        this.qryGetTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.qryGetTicket.ticketId':
        this.qryGetTicketTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.data.qryGetTicket':
        this.qryGetTicketData = (value as QryGetTicketOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.qryLocateTicket.status':
        this.qryLocateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.data.qryLocateTicket':
        this.qryLocateTicketData = (value as QryLocateTicketOutput[]) ?? [];
        break;
      case 'ui.ticketCatalogue.action.cmdDecideClosure.status':
        this.cmdDecideClosureState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.ticketCatalogue.input.cmdDecideClosure.ticketId':
        this.cmdDecideClosureTicketId = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.input.cmdDecideClosure.status':
        this.cmdDecideClosureStatus = (value as string) ?? '';
        break;
      case 'ui.ticketCatalogue.output.cmdDecideClosure':
        this.cmdDecideClosureOutput = (value as CmdDecideClosureOutput | null) ?? null;
        break;
      case 'ui.ticketCatalogue.action.cmdDecideClosure.error':
        this.cmdDecideClosureError = (value as string) ?? '';
        break;
      default:
        break;
    }
    if (existing === undefined) {
      setState(stateKey, value);
    }
  }

  private syncRouteParams(): void {
    const pathname: string = window.location.pathname;
    const match: RegExpMatchArray | null = pathname.match(
      /^\/controleChamados\/ticketCatalogue(?:\/([^/]+))?\/?$/,
    );
    const rawTicketId: string = match && match[1] ? match[1] : '';
    let ticketId: string = '';
    if (rawTicketId) {
      try {
        ticketId = decodeURIComponent(rawTicketId);
      } catch {
        ticketId = rawTicketId;
      }
    }
    if (ticketId) {
      if (!this.cmdDecideClosureTicketId) {
        this.cmdDecideClosureTicketId = ticketId;
        setState('ui.ticketCatalogue.input.cmdDecideClosure.ticketId', ticketId);
      }
    }
  }

  /** setter for state ui.ticketCatalogue.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'detail', 'createTicket', 'updateTicket', 'decideClosure'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'detail' && (!this.qryGetTicketTicketId)) next = 'base';
    if (value === 'updateTicket' && (!this.cmdUpdateTicketTicketId)) next = 'base';
    if (value === 'decideClosure' && (!this.cmdDecideClosureTicketId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.ticketCatalogue.scenary', next);
    this.syncScenaryQuery(next);
    this.requestUpdate();
  }

  /** handler for action set.uiScenary — bind UI events here */
  handleUiScenaryChange(event: Event): void {
    const custom = event as CustomEvent<{ value?: unknown }>;
    const fromDetail: string = custom.detail && typeof custom.detail.value === 'string' ? custom.detail.value : '';
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = fromDetail || (target && 'value' in target ? String(target.value) : '');
    this.setUiScenary(value);
  }

  private applyUrlScenary(): void {
    const params = new URLSearchParams(window.location.search);
    const rawTicketId: string = params.get('ticketId') || '';
    if (rawTicketId) {
      if (!this.qryGetTicketTicketId) {
        this.qryGetTicketTicketId = rawTicketId;
        setState('ui.ticketCatalogue.input.qryGetTicket.ticketId', rawTicketId);
      }
      if (!this.cmdUpdateTicketTicketId) {
        this.cmdUpdateTicketTicketId = rawTicketId;
        setState('ui.ticketCatalogue.input.cmdUpdateTicket.ticketId', rawTicketId);
      }
      if (!this.cmdDecideClosureTicketId) {
        this.cmdDecideClosureTicketId = rawTicketId;
        setState('ui.ticketCatalogue.input.cmdDecideClosure.ticketId', rawTicketId);
      }
    }
    const requested: string = params.get('scenary') || 'base';
    this.setUiScenary(requested);
  }

  private syncScenaryQuery(value: string): void {
    const url = new URL(window.location.href);
    if (value === 'base') url.searchParams.delete('scenary');
    else url.searchParams.set('scenary', value);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

  private readErrorMessage(error: unknown, fallback: string): string {
    if (error && typeof error === 'object') {
      const record = error as { message?: unknown; error?: unknown };
      if (typeof record.message === 'string' && record.message) {
        return record.message;
      }
      if (typeof record.error === 'string' && record.error) {
        return record.error;
      }
    }
    return fallback;
  }

  /** action qryListTicket (query) "Listar Chamado" — route controleChamados.ticketCatalogue.qryListTicket; inputs: search, sortBy, sortOrder; writes ui.ticketCatalogue.data.qryListTicket; status ui.ticketCatalogue.action.qryListTicket.status */
  async loadQryListTicket(): Promise<void> {
    this.syncRouteParams();
    this.qryListTicketState = 'loading';
    setState('ui.ticketCatalogue.action.qryListTicket.status', 'loading');
    const params: QryListTicketInput = {
    };
    if (this.qryListTicketSearch) {
      params.search = this.qryListTicketSearch;
    }
    if (this.qryListTicketSortBy) {
      params.sortBy = this.qryListTicketSortBy as QryListTicketInput['sortBy'];
    }
    if (this.qryListTicketSortOrder) {
      params.sortOrder = this.qryListTicketSortOrder as QryListTicketInput['sortOrder'];
    }
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryListTicketOutput[]>(qryListTicketRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.qryListTicketData = data;
      setState('ui.ticketCatalogue.data.qryListTicket', data);
      this.qryListTicketState = 'success';
      setState('ui.ticketCatalogue.action.qryListTicket.status', 'success');
    } else {
      this.qryListTicketState = 'error';
      setState('ui.ticketCatalogue.action.qryListTicket.status', 'error');
      if (response.error) {
        console.error('qryListTicket failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryListTicket "Listar Chamado" — bind UI events here */
  handleQryListTicketClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryListTicket();
  }

  /** action cmdCreateTicket (command) "Criar Chamado" — route controleChamados.ticketCatalogue.cmdCreateTicket; inputs: title, description, status; writes ui.ticketCatalogue.output.cmdCreateTicket; status ui.ticketCatalogue.action.cmdCreateTicket.status; feedback keys action.cmdCreateTicket.success / action.cmdCreateTicket.error */
  async cmdCreateTicket(): Promise<void> {
    this.syncRouteParams();
    this.cmdCreateTicketState = 'loading';
    setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'loading');
    this.cmdCreateTicketError = '';
    setState('ui.ticketCatalogue.action.cmdCreateTicket.error', '');
    const params: CmdCreateTicketInput = {
      title: this.cmdCreateTicketTitle,
      description: this.cmdCreateTicketDescription,
      status: this.cmdCreateTicketStatus as CmdCreateTicketInput['status'],
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdCreateTicketOutput>(cmdCreateTicketRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdCreateTicket.error');
      this.cmdCreateTicketError = errMsg;
      setState('ui.ticketCatalogue.action.cmdCreateTicket.error', errMsg);
      this.cmdCreateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdCreateTicketOutput | null = response.data ?? null;
    this.cmdCreateTicketOutput = data;
    setState('ui.ticketCatalogue.output.cmdCreateTicket', data);
    try {
      await this.loadQryListTicket();
      if (this.qryListTicketState === 'error') {
        this.cmdCreateTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateTicket refresh failed', refreshError);
      this.cmdCreateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetTicket();
      if (this.qryGetTicketState === 'error') {
        this.cmdCreateTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateTicket refresh failed', refreshError);
      this.cmdCreateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryLocateTicket();
      if (this.qryLocateTicketState === 'error') {
        this.cmdCreateTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateTicket refresh failed', refreshError);
      this.cmdCreateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdCreateTicketTitle = '';
    setState('ui.ticketCatalogue.input.cmdCreateTicket.title', '');
    this.cmdCreateTicketDescription = '';
    setState('ui.ticketCatalogue.input.cmdCreateTicket.description', '');
    this.cmdCreateTicketStatus = '';
    setState('ui.ticketCatalogue.input.cmdCreateTicket.status', '');
    this.setUiScenary('base');
    this.cmdCreateTicketState = 'success';
    setState('ui.ticketCatalogue.action.cmdCreateTicket.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdCreateTicket "Criar Chamado" — bind UI events here */
  handleCmdCreateTicketClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdCreateTicket();
    });
  }

  /** action cmdUpdateTicket (command) "Atualizar Chamado" — route controleChamados.ticketCatalogue.cmdUpdateTicket; inputs: ticketId, title, description, status; writes ui.ticketCatalogue.output.cmdUpdateTicket; status ui.ticketCatalogue.action.cmdUpdateTicket.status; feedback keys action.cmdUpdateTicket.success / action.cmdUpdateTicket.error */
  async cmdUpdateTicket(): Promise<void> {
    this.syncRouteParams();
    if (!this.cmdUpdateTicketTicketId) {
      this.cmdUpdateTicketState = 'idle';
      setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdUpdateTicketState = 'loading';
    setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'loading');
    this.cmdUpdateTicketError = '';
    setState('ui.ticketCatalogue.action.cmdUpdateTicket.error', '');
    const params: CmdUpdateTicketInput = {
      ticketId: this.cmdUpdateTicketTicketId,
      title: this.cmdUpdateTicketTitle,
      description: this.cmdUpdateTicketDescription,
      status: this.cmdUpdateTicketStatus as CmdUpdateTicketInput['status'],
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdUpdateTicketOutput>(cmdUpdateTicketRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdUpdateTicket.error');
      this.cmdUpdateTicketError = errMsg;
      setState('ui.ticketCatalogue.action.cmdUpdateTicket.error', errMsg);
      this.cmdUpdateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdUpdateTicketOutput | null = response.data ?? null;
    this.cmdUpdateTicketOutput = data;
    setState('ui.ticketCatalogue.output.cmdUpdateTicket', data);
    try {
      await this.loadQryListTicket();
      if (this.qryListTicketState === 'error') {
        this.cmdUpdateTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateTicket refresh failed', refreshError);
      this.cmdUpdateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetTicket();
      if (this.qryGetTicketState === 'error') {
        this.cmdUpdateTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateTicket refresh failed', refreshError);
      this.cmdUpdateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryLocateTicket();
      if (this.qryLocateTicketState === 'error') {
        this.cmdUpdateTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateTicket refresh failed', refreshError);
      this.cmdUpdateTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdUpdateTicketTicketId = '';
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.ticketId', '');
    this.cmdUpdateTicketTitle = '';
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.title', '');
    this.cmdUpdateTicketDescription = '';
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.description', '');
    this.cmdUpdateTicketStatus = '';
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.status', '');
    this.setUiScenary('base');
    this.cmdUpdateTicketState = 'success';
    setState('ui.ticketCatalogue.action.cmdUpdateTicket.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdUpdateTicket "Atualizar Chamado" — bind UI events here */
  handleCmdUpdateTicketClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdUpdateTicket();
    });
  }

  /** action cmdDeleteTicket (command) "Excluir Chamado" — route controleChamados.ticketCatalogue.cmdDeleteTicket; inputs: ticketId; writes ui.ticketCatalogue.output.cmdDeleteTicket; status ui.ticketCatalogue.action.cmdDeleteTicket.status; feedback keys action.cmdDeleteTicket.success / action.cmdDeleteTicket.error */
  async cmdDeleteTicket(): Promise<void> {
    this.syncRouteParams();
    if (!this.cmdDeleteTicketTicketId) {
      this.cmdDeleteTicketState = 'idle';
      setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdDeleteTicketState = 'loading';
    setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'loading');
    this.cmdDeleteTicketError = '';
    setState('ui.ticketCatalogue.action.cmdDeleteTicket.error', '');
    const params: CmdDeleteTicketInput = {
      ticketId: this.cmdDeleteTicketTicketId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdDeleteTicketOutput>(cmdDeleteTicketRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdDeleteTicket.error');
      this.cmdDeleteTicketError = errMsg;
      setState('ui.ticketCatalogue.action.cmdDeleteTicket.error', errMsg);
      this.cmdDeleteTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdDeleteTicketOutput | null = response.data ?? null;
    this.cmdDeleteTicketOutput = data;
    setState('ui.ticketCatalogue.output.cmdDeleteTicket', data);
    try {
      await this.loadQryListTicket();
      if (this.qryListTicketState === 'error') {
        this.cmdDeleteTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteTicket refresh failed', refreshError);
      this.cmdDeleteTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetTicket();
      if (this.qryGetTicketState === 'error') {
        this.cmdDeleteTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteTicket refresh failed', refreshError);
      this.cmdDeleteTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryLocateTicket();
      if (this.qryLocateTicketState === 'error') {
        this.cmdDeleteTicketState = 'error';
        setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteTicket refresh failed', refreshError);
      this.cmdDeleteTicketState = 'error';
      setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdDeleteTicketTicketId = '';
    setState('ui.ticketCatalogue.input.cmdDeleteTicket.ticketId', '');
    this.setUiScenary('base');
    this.cmdDeleteTicketState = 'success';
    setState('ui.ticketCatalogue.action.cmdDeleteTicket.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdDeleteTicket "Excluir Chamado" — bind UI events here */
  handleCmdDeleteTicketClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdDeleteTicket();
    });
  }

  /** action qryGetTicket (query) "Obter Chamado" — route controleChamados.ticketCatalogue.qryGetTicket; inputs: ticketId; writes ui.ticketCatalogue.data.qryGetTicket; status ui.ticketCatalogue.action.qryGetTicket.status */
  async loadQryGetTicket(): Promise<void> {
    this.syncRouteParams();
    if (!this.qryGetTicketTicketId) {
      this.qryGetTicketState = 'idle';
      setState('ui.ticketCatalogue.action.qryGetTicket.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.qryGetTicketState = 'loading';
    setState('ui.ticketCatalogue.action.qryGetTicket.status', 'loading');
    const params: QryGetTicketInput = {
      ticketId: this.qryGetTicketTicketId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryGetTicketOutput>(qryGetTicketRoute, params, options);
    if (response.ok) {
      const data = response.data ?? null;
      this.qryGetTicketData = data;
      setState('ui.ticketCatalogue.data.qryGetTicket', data);
      this.qryGetTicketState = 'success';
      setState('ui.ticketCatalogue.action.qryGetTicket.status', 'success');
    } else {
      this.qryGetTicketState = 'error';
      setState('ui.ticketCatalogue.action.qryGetTicket.status', 'error');
      if (response.error) {
        console.error('qryGetTicket failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryGetTicket "Obter Chamado" — bind UI events here */
  handleQryGetTicketClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryGetTicket();
  }

  /** action qryLocateTicket (query) "Localizar o chamado aberto" — route controleChamados.ticketCatalogue.qryLocateTicket; inputs: (none); writes ui.ticketCatalogue.data.qryLocateTicket; status ui.ticketCatalogue.action.qryLocateTicket.status */
  async loadQryLocateTicket(): Promise<void> {
    this.syncRouteParams();
    this.qryLocateTicketState = 'loading';
    setState('ui.ticketCatalogue.action.qryLocateTicket.status', 'loading');
    const params: QryLocateTicketInput = {
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryLocateTicketOutput[]>(qryLocateTicketRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.qryLocateTicketData = data;
      setState('ui.ticketCatalogue.data.qryLocateTicket', data);
      this.qryLocateTicketState = 'success';
      setState('ui.ticketCatalogue.action.qryLocateTicket.status', 'success');
    } else {
      this.qryLocateTicketState = 'error';
      setState('ui.ticketCatalogue.action.qryLocateTicket.status', 'error');
      if (response.error) {
        console.error('qryLocateTicket failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryLocateTicket "Localizar o chamado aberto" — bind UI events here */
  handleQryLocateTicketClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryLocateTicket();
  }

  /** action cmdDecideClosure (command) "Confirmar o fechamento do chamado" — route controleChamados.ticketCatalogue.cmdDecideClosure; inputs: ticketId, status; writes ui.ticketCatalogue.output.cmdDecideClosure; status ui.ticketCatalogue.action.cmdDecideClosure.status; feedback keys action.cmdDecideClosure.success / action.cmdDecideClosure.error */
  async cmdDecideClosure(): Promise<void> {
    this.syncRouteParams();
    if (!this.cmdDecideClosureTicketId) {
      this.cmdDecideClosureState = 'idle';
      setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdDecideClosureState = 'loading';
    setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'loading');
    this.cmdDecideClosureError = '';
    setState('ui.ticketCatalogue.action.cmdDecideClosure.error', '');
    const params: CmdDecideClosureInput = {
      ticketId: this.cmdDecideClosureTicketId,
      status: this.cmdDecideClosureStatus as CmdDecideClosureInput['status'],
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdDecideClosureOutput>(cmdDecideClosureRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdDecideClosure.error');
      this.cmdDecideClosureError = errMsg;
      setState('ui.ticketCatalogue.action.cmdDecideClosure.error', errMsg);
      this.cmdDecideClosureState = 'error';
      setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdDecideClosureOutput | null = response.data ?? null;
    this.cmdDecideClosureOutput = data;
    setState('ui.ticketCatalogue.output.cmdDecideClosure', data);
    try {
      await this.loadQryListTicket();
      if (this.qryListTicketState === 'error') {
        this.cmdDecideClosureState = 'error';
        setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDecideClosure refresh failed', refreshError);
      this.cmdDecideClosureState = 'error';
      setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetTicket();
      if (this.qryGetTicketState === 'error') {
        this.cmdDecideClosureState = 'error';
        setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDecideClosure refresh failed', refreshError);
      this.cmdDecideClosureState = 'error';
      setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryLocateTicket();
      if (this.qryLocateTicketState === 'error') {
        this.cmdDecideClosureState = 'error';
        setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDecideClosure refresh failed', refreshError);
      this.cmdDecideClosureState = 'error';
      setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdDecideClosureStatus = '';
    setState('ui.ticketCatalogue.input.cmdDecideClosure.status', '');
    this.setUiScenary('base');
    this.cmdDecideClosureState = 'success';
    setState('ui.ticketCatalogue.action.cmdDecideClosure.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdDecideClosure "Confirmar o fechamento do chamado" — bind UI events here */
  handleCmdDecideClosureClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdDecideClosure();
    });
  }

  /** setter for state ui.ticketCatalogue.input.qryListTicket.search */
  setQryListTicketSearch(value: string): void {
    this.qryListTicketSearch = value;
    setState('ui.ticketCatalogue.input.qryListTicket.search', value);
    this.requestUpdate();
  }

  /** handler for action set.qryListTicketSearch — bind UI events here */
  handleQryListTicketSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryListTicketSearch(value);
  }

  /** setter for state ui.ticketCatalogue.input.qryListTicket.sortBy */
  setQryListTicketSortBy(value: string): void {
    this.qryListTicketSortBy = value;
    setState('ui.ticketCatalogue.input.qryListTicket.sortBy', value);
    this.requestUpdate();
  }

  /** handler for action set.qryListTicketSortBy — bind UI events here */
  handleQryListTicketSortByChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryListTicketSortBy(value);
  }

  /** setter for state ui.ticketCatalogue.input.qryListTicket.sortOrder */
  setQryListTicketSortOrder(value: string): void {
    this.qryListTicketSortOrder = value;
    setState('ui.ticketCatalogue.input.qryListTicket.sortOrder', value);
    this.requestUpdate();
  }

  /** handler for action set.qryListTicketSortOrder — bind UI events here */
  handleQryListTicketSortOrderChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryListTicketSortOrder(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdCreateTicket.title */
  setCmdCreateTicketTitle(value: string): void {
    this.cmdCreateTicketTitle = value;
    setState('ui.ticketCatalogue.input.cmdCreateTicket.title', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateTicketTitle — bind UI events here */
  handleCmdCreateTicketTitleChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateTicketTitle(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdCreateTicket.description */
  setCmdCreateTicketDescription(value: string): void {
    this.cmdCreateTicketDescription = value;
    setState('ui.ticketCatalogue.input.cmdCreateTicket.description', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateTicketDescription — bind UI events here */
  handleCmdCreateTicketDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateTicketDescription(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdCreateTicket.status */
  setCmdCreateTicketStatus(value: string): void {
    this.cmdCreateTicketStatus = value;
    setState('ui.ticketCatalogue.input.cmdCreateTicket.status', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateTicketStatus — bind UI events here */
  handleCmdCreateTicketStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateTicketStatus(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdUpdateTicket.ticketId */
  setCmdUpdateTicketTicketId(value: string): void {
    this.cmdUpdateTicketTicketId = value;
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.ticketId', value);
    const collection =
      (getState('ui.ticketCatalogue.data.qryListTicket') as QryListTicketOutput[] | null | undefined) ?? this.qryListTicketData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListTicketOutput) => String(row.ticketId) === String(value),
      );
      if (item) {
        this.cmdUpdateTicketTitle = item.title;
        setState('ui.ticketCatalogue.input.cmdUpdateTicket.title', item.title);
        this.cmdUpdateTicketDescription = item.description;
        setState('ui.ticketCatalogue.input.cmdUpdateTicket.description', item.description);
        this.cmdUpdateTicketStatus = String(item.status);
        setState('ui.ticketCatalogue.input.cmdUpdateTicket.status', String(item.status));
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateTicketTicketId — bind UI events here */
  handleCmdUpdateTicketTicketIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateTicketTicketId(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdUpdateTicket.title */
  setCmdUpdateTicketTitle(value: string): void {
    this.cmdUpdateTicketTitle = value;
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.title', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateTicketTitle — bind UI events here */
  handleCmdUpdateTicketTitleChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateTicketTitle(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdUpdateTicket.description */
  setCmdUpdateTicketDescription(value: string): void {
    this.cmdUpdateTicketDescription = value;
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.description', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateTicketDescription — bind UI events here */
  handleCmdUpdateTicketDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateTicketDescription(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdUpdateTicket.status */
  setCmdUpdateTicketStatus(value: string): void {
    this.cmdUpdateTicketStatus = value;
    setState('ui.ticketCatalogue.input.cmdUpdateTicket.status', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateTicketStatus — bind UI events here */
  handleCmdUpdateTicketStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateTicketStatus(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdDeleteTicket.ticketId */
  setCmdDeleteTicketTicketId(value: string): void {
    this.cmdDeleteTicketTicketId = value;
    setState('ui.ticketCatalogue.input.cmdDeleteTicket.ticketId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdDeleteTicketTicketId — bind UI events here */
  handleCmdDeleteTicketTicketIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdDeleteTicketTicketId(value);
  }

  /** setter for state ui.ticketCatalogue.input.qryGetTicket.ticketId */
  setQryGetTicketTicketId(value: string): void {
    this.qryGetTicketTicketId = value;
    setState('ui.ticketCatalogue.input.qryGetTicket.ticketId', value);
    if (value) this.setUiScenary('detail');
    this.requestUpdate();
  }

  /** handler for action set.qryGetTicketTicketId — bind UI events here */
  handleQryGetTicketTicketIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryGetTicketTicketId(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdDecideClosure.ticketId */
  setCmdDecideClosureTicketId(value: string): void {
    this.cmdDecideClosureTicketId = value;
    setState('ui.ticketCatalogue.input.cmdDecideClosure.ticketId', value);
    const collection =
      (getState('ui.ticketCatalogue.data.qryListTicket') as QryListTicketOutput[] | null | undefined) ?? this.qryListTicketData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListTicketOutput) => String(row.ticketId) === String(value),
      );
      if (item) {
        this.cmdDecideClosureStatus = String(item.status);
        setState('ui.ticketCatalogue.input.cmdDecideClosure.status', String(item.status));
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdDecideClosureTicketId — bind UI events here */
  handleCmdDecideClosureTicketIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdDecideClosureTicketId(value);
  }

  /** setter for state ui.ticketCatalogue.input.cmdDecideClosure.status */
  setCmdDecideClosureStatus(value: string): void {
    this.cmdDecideClosureStatus = value;
    setState('ui.ticketCatalogue.input.cmdDecideClosure.status', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdDecideClosureStatus — bind UI events here */
  handleCmdDecideClosureStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdDecideClosureStatus(value);
  }
}
