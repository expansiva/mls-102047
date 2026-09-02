/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketHub.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
QryListTicketInput,
QryListTicketOutput,
QryListTicketCommentInput,
QryListTicketCommentOutput,
} from '/_102047_/l2/controleChamados/web/contracts/ticketHub.js';
import {
qryListTicketRoute,
qryListTicketCommentRoute,
} from '/_102047_/l2/controleChamados/web/contracts/ticketHub.js';
export type {
QryListTicketInput,
QryListTicketOutput,
QryListTicketCommentInput,
QryListTicketCommentOutput,
} from '/_102047_/l2/controleChamados/web/contracts/ticketHub.js';
const SUBSCRIBED_STATE_KEYS: string[] = [
'ui.ticketHub.status',
'ui.ticketHub.scenary',
'ui.ticketHub.action.qryListTicket.status',
'ui.ticketHub.input.qryListTicket.search',
'ui.ticketHub.input.qryListTicket.sortBy',
'ui.ticketHub.input.qryListTicket.sortOrder',
'ui.ticketHub.data.qryListTicket',
'ui.ticketHub.action.qryListTicketComment.status',
'ui.ticketHub.data.qryListTicketComment',
];
export class ControleChamadosTicketHubBase extends CollabLitElement {
/** state status — pageStatus */
@property() status: string = '';
/** state ui.ticketHub.scenary — uiScenary, values: base */
@property() uiScenary: 'base' = 'base';
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
/** state qryListTicketCommentState — actionStatus, values: idle|loading|success|error */
@property() qryListTicketCommentState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state qryListTicketCommentData — queryResult, outputShape: array */
@property() qryListTicketCommentData: QryListTicketCommentOutput[] = [];
/** lifecycle — initialize shared state, subscriptions and initial query loads */
connectedCallback(): void {
super.connectedCallback();
this.initStateValue('ui.ticketHub.status', '');
this.initStateValue('ui.ticketHub.scenary', 'base');
this.initStateValue('ui.ticketHub.action.qryListTicket.status', 'idle');
this.initStateValue('ui.ticketHub.input.qryListTicket.search', '');
this.initStateValue('ui.ticketHub.input.qryListTicket.sortBy', '');
this.initStateValue('ui.ticketHub.input.qryListTicket.sortOrder', '');
this.initStateValue('ui.ticketHub.data.qryListTicket', []);
this.initStateValue('ui.ticketHub.action.qryListTicketComment.status', 'idle');
this.initStateValue('ui.ticketHub.data.qryListTicketComment', []);
this.applyUrlScenary();
subscribe(SUBSCRIBED_STATE_KEYS, this);
void this.loadQryListTicket();
void this.loadQryListTicketComment();
}
/** lifecycle — remove shared-state subscriptions */
disconnectedCallback(): void {
unsubscribe(SUBSCRIBED_STATE_KEYS, this);
super.disconnectedCallback();
}
/** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
handleIcaStateChange(key: string, value: unknown): void {
switch (key) {
case 'ui.ticketHub.status':
this.status = (value as string) ?? '';
break;
case 'ui.ticketHub.scenary':
this.uiScenary = (value as 'base') ?? 'base';
break;
case 'ui.ticketHub.action.qryListTicket.status':
this.qryListTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.ticketHub.input.qryListTicket.search':
this.qryListTicketSearch = (value as string) ?? '';
break;
case 'ui.ticketHub.input.qryListTicket.sortBy':
this.qryListTicketSortBy = (value as string) ?? '';
break;
case 'ui.ticketHub.input.qryListTicket.sortOrder':
this.qryListTicketSortOrder = (value as string) ?? '';
break;
case 'ui.ticketHub.data.qryListTicket':
this.qryListTicketData = (value as QryListTicketOutput[]) ?? [];
break;
case 'ui.ticketHub.action.qryListTicketComment.status':
this.qryListTicketCommentState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.ticketHub.data.qryListTicketComment':
this.qryListTicketCommentData = (value as QryListTicketCommentOutput[]) ?? [];
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
case 'ui.ticketHub.status':
this.status = (value as string) ?? '';
break;
case 'ui.ticketHub.scenary':
this.uiScenary = (value as 'base') ?? 'base';
break;
case 'ui.ticketHub.action.qryListTicket.status':
this.qryListTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.ticketHub.input.qryListTicket.search':
this.qryListTicketSearch = (value as string) ?? '';
break;
case 'ui.ticketHub.input.qryListTicket.sortBy':
this.qryListTicketSortBy = (value as string) ?? '';
break;
case 'ui.ticketHub.input.qryListTicket.sortOrder':
this.qryListTicketSortOrder = (value as string) ?? '';
break;
case 'ui.ticketHub.data.qryListTicket':
this.qryListTicketData = (value as QryListTicketOutput[]) ?? [];
break;
case 'ui.ticketHub.action.qryListTicketComment.status':
this.qryListTicketCommentState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.ticketHub.data.qryListTicketComment':
this.qryListTicketCommentData = (value as QryListTicketCommentOutput[]) ?? [];
break;
default:
break;
}
if (existing === undefined) {
setState(stateKey, value);
}
}

  /** setter for state ui.ticketHub.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.ticketHub.scenary', next);
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
    const requested: string = params.get('scenary') || 'base';
    this.setUiScenary(requested);
  }

  private syncScenaryQuery(value: string): void {
    const url = new URL(window.location.href);
    if (value === 'base') url.searchParams.delete('scenary');
    else url.searchParams.set('scenary', value);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

/** action qryListTicket (query) — route controleChamados.ticketHub.qryListTicket; inputs: search, sortBy, sortOrder; writes ui.ticketHub.data.qryListTicket; status ui.ticketHub.action.qryListTicket.status */
async loadQryListTicket(): Promise<void> {
this.qryListTicketState = 'loading';
setState('ui.ticketHub.action.qryListTicket.status', 'loading');
const params: QryListTicketInput = {};
if (this.qryListTicketSearch) params.search = this.qryListTicketSearch;
if (this.qryListTicketSortBy) params.sortBy = this.qryListTicketSortBy as QryListTicketInput['sortBy'];
if (this.qryListTicketSortOrder) params.sortOrder = this.qryListTicketSortOrder as QryListTicketInput['sortOrder'];
const options: BffClientOptions = { mode: 'silent' };
const response = await execBff<QryListTicketOutput[]>(qryListTicketRoute, params, options);
if (response.ok) {
const data: QryListTicketOutput[] = response.data ?? [];
this.qryListTicketData = data;
setState('ui.ticketHub.data.qryListTicket', data);
this.qryListTicketState = 'success';
setState('ui.ticketHub.action.qryListTicket.status', 'success');
} else {
this.qryListTicketState = 'error';
setState('ui.ticketHub.action.qryListTicket.status', 'error');
if (response.error) console.error('qryListTicket failed', response.error);
}
this.requestUpdate();
}
/** handler for action qryListTicket — bind UI events here */
handleQryListTicketClick(event?: Event): void {
if (event) event.preventDefault();
void this.loadQryListTicket();
}
/** action qryListTicketComment (query) — route controleChamados.ticketHub.qryListTicketComment; inputs: none; writes ui.ticketHub.data.qryListTicketComment; status ui.ticketHub.action.qryListTicketComment.status */
async loadQryListTicketComment(): Promise<void> {
this.qryListTicketCommentState = 'loading';
setState('ui.ticketHub.action.qryListTicketComment.status', 'loading');
const params: QryListTicketCommentInput = {};
const options: BffClientOptions = { mode: 'silent' };
const response = await execBff<QryListTicketCommentOutput[]>(qryListTicketCommentRoute, params, options);
if (response.ok) {
const data: QryListTicketCommentOutput[] = response.data ?? [];
this.qryListTicketCommentData = data;
setState('ui.ticketHub.data.qryListTicketComment', data);
this.qryListTicketCommentState = 'success';
setState('ui.ticketHub.action.qryListTicketComment.status', 'success');
} else {
this.qryListTicketCommentState = 'error';
setState('ui.ticketHub.action.qryListTicketComment.status', 'error');
if (response.error) console.error('qryListTicketComment failed', response.error);
}
this.requestUpdate();
}
/** handler for action qryListTicketComment — bind UI events here */
handleQryListTicketCommentClick(event?: Event): void {
if (event) event.preventDefault();
void this.loadQryListTicketComment();
}
/** setter for state ui.ticketHub.input.qryListTicket.search */
setQryListTicketSearch(value: string): void {
this.qryListTicketSearch = value;
setState('ui.ticketHub.input.qryListTicket.search', value);
this.requestUpdate();
}
/** handler for action set.qryListTicketSearch — bind UI events here */
handleQryListTicketSearchChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setQryListTicketSearch(value);
}
/** setter for state ui.ticketHub.input.qryListTicket.sortBy */
setQryListTicketSortBy(value: string): void {
this.qryListTicketSortBy = value;
setState('ui.ticketHub.input.qryListTicket.sortBy', value);
this.requestUpdate();
}
/** handler for action set.qryListTicketSortBy — bind UI events here */
handleQryListTicketSortByChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setQryListTicketSortBy(value);
}
/** setter for state ui.ticketHub.input.qryListTicket.sortOrder */
setQryListTicketSortOrder(value: string): void {
this.qryListTicketSortOrder = value;
setState('ui.ticketHub.input.qryListTicket.sortOrder', value);
this.requestUpdate();
}
/** handler for action set.qryListTicketSortOrder — bind UI events here */
handleQryListTicketSortOrderChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setQryListTicketSortOrder(value);
}
}
