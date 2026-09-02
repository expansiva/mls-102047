/// <mls fileReference="_102047_/l2/controleChamados/web/shared/commentOpenTicket.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
QryLocateTicketInput,
QryLocateTicketOutput,
CmdRecordCommentInput,
CmdRecordCommentOutput,
} from '/_102047_/l2/controleChamados/web/contracts/commentOpenTicket.js';
import {
qryLocateTicketRoute,
cmdRecordCommentRoute,
} from '/_102047_/l2/controleChamados/web/contracts/commentOpenTicket.js';
export type {
QryLocateTicketInput,
QryLocateTicketOutput,
CmdRecordCommentInput,
CmdRecordCommentOutput,
} from '/_102047_/l2/controleChamados/web/contracts/commentOpenTicket.js';
const SUBSCRIBED_STATE_KEYS: string[] = [
'ui.commentOpenTicket.status',
'ui.commentOpenTicket.scenary',
'ui.commentOpenTicket.action.qryLocateTicket.status',
'ui.commentOpenTicket.data.qryLocateTicket',
'ui.commentOpenTicket.action.cmdRecordComment.status',
'ui.commentOpenTicket.input.cmdRecordComment.ticketId',
'ui.commentOpenTicket.input.cmdRecordComment.commentText',
'ui.commentOpenTicket.output.cmdRecordComment',
'ui.commentOpenTicket.action.cmdRecordComment.error',
];
export class ControleChamadosCommentOpenTicketBase extends CollabLitElement {
/** state status — pageStatus */
@property() status: string = '';
/** state ui.commentOpenTicket.scenary — uiScenary, values: base|recordComment */
@property() uiScenary: 'base' | 'recordComment' = 'base';
/** state qryLocateTicketState — actionStatus, values: idle|loading|success|error */
@property() qryLocateTicketState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state qryLocateTicketData — queryResult, outputShape: array */
@property() qryLocateTicketData: QryLocateTicketOutput[] = [];
/** state cmdRecordCommentState — actionStatus, values: idle|loading|success|error */
@property() cmdRecordCommentState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state cmdRecordCommentTicketId — input */
@property() cmdRecordCommentTicketId: string = '';
/** state cmdRecordCommentCommentText — input */
@property() cmdRecordCommentCommentText: string = '';
/** state cmdRecordCommentOutput — commandOutput */
@property() cmdRecordCommentOutput: CmdRecordCommentOutput | null = null;
/** state cmdRecordCommentError — actionError */
@property() cmdRecordCommentError: string = '';
/** Lifecycle connection for state initialization and initial data loading. */
connectedCallback(): void {
super.connectedCallback();
this.initStateValue('ui.commentOpenTicket.status', '');
this.initStateValue('ui.commentOpenTicket.scenary', 'base');
this.initStateValue('ui.commentOpenTicket.action.qryLocateTicket.status', 'idle');
this.initStateValue('ui.commentOpenTicket.data.qryLocateTicket', []);
this.initStateValue('ui.commentOpenTicket.action.cmdRecordComment.status', 'idle');
this.initStateValue('ui.commentOpenTicket.input.cmdRecordComment.ticketId', '');
this.initStateValue('ui.commentOpenTicket.input.cmdRecordComment.commentText', '');
this.initStateValue('ui.commentOpenTicket.output.cmdRecordComment', null);
this.initStateValue('ui.commentOpenTicket.action.cmdRecordComment.error', '');
this.syncRouteParams();
this.applyUrlScenary();
subscribe(SUBSCRIBED_STATE_KEYS, this);
void this.loadQryLocateTicket();
}
/** Lifecycle disconnection for removing shared-state subscriptions. */
disconnectedCallback(): void {
unsubscribe(SUBSCRIBED_STATE_KEYS, this);
super.disconnectedCallback();
}
/** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
handleIcaStateChange(key: string, value: unknown): void {
switch (key) {
case 'ui.commentOpenTicket.status':
this.status = (value as string) ?? '';
break;
case 'ui.commentOpenTicket.scenary':
this.uiScenary = (value as 'base' | 'recordComment') ?? 'base';
break;
case 'ui.commentOpenTicket.action.qryLocateTicket.status':
this.qryLocateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.commentOpenTicket.data.qryLocateTicket':
this.qryLocateTicketData = (value as QryLocateTicketOutput[]) ?? [];
break;
case 'ui.commentOpenTicket.action.cmdRecordComment.status':
this.cmdRecordCommentState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.commentOpenTicket.input.cmdRecordComment.ticketId':
this.cmdRecordCommentTicketId = (value as string) ?? '';
break;
case 'ui.commentOpenTicket.input.cmdRecordComment.commentText':
this.cmdRecordCommentCommentText = (value as string) ?? '';
break;
case 'ui.commentOpenTicket.output.cmdRecordComment':
this.cmdRecordCommentOutput = (value as CmdRecordCommentOutput | null) ?? null;
break;
case 'ui.commentOpenTicket.action.cmdRecordComment.error':
this.cmdRecordCommentError = (value as string) ?? '';
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
case 'ui.commentOpenTicket.status':
this.status = (value as string) ?? '';
break;
case 'ui.commentOpenTicket.scenary':
this.uiScenary = (value as 'base' | 'recordComment') ?? 'base';
break;
case 'ui.commentOpenTicket.action.qryLocateTicket.status':
this.qryLocateTicketState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.commentOpenTicket.data.qryLocateTicket':
this.qryLocateTicketData = (value as QryLocateTicketOutput[]) ?? [];
break;
case 'ui.commentOpenTicket.action.cmdRecordComment.status':
this.cmdRecordCommentState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.commentOpenTicket.input.cmdRecordComment.ticketId':
this.cmdRecordCommentTicketId = (value as string) ?? '';
break;
case 'ui.commentOpenTicket.input.cmdRecordComment.commentText':
this.cmdRecordCommentCommentText = (value as string) ?? '';
break;
case 'ui.commentOpenTicket.output.cmdRecordComment':
this.cmdRecordCommentOutput = (value as CmdRecordCommentOutput | null) ?? null;
break;
case 'ui.commentOpenTicket.action.cmdRecordComment.error':
this.cmdRecordCommentError = (value as string) ?? '';
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
/^\/controleChamados\/commentOpenTicket(?:\/([^/]+))?\/?$/,
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
if (!this.cmdRecordCommentTicketId) {
this.cmdRecordCommentTicketId = ticketId;
setState('ui.commentOpenTicket.input.cmdRecordComment.ticketId', ticketId);
}
}
}

  /** setter for state ui.commentOpenTicket.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'recordComment'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'recordComment' && (!this.cmdRecordCommentTicketId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.commentOpenTicket.scenary', next);
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
      if (!this.cmdRecordCommentTicketId) {
        this.cmdRecordCommentTicketId = rawTicketId;
        setState('ui.commentOpenTicket.input.cmdRecordComment.ticketId', rawTicketId);
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
/** action qryLocateTicket (query) — route controleChamados.commentOpenTicket.qryLocateTicket; inputs none; writes ui.commentOpenTicket.data.qryLocateTicket; status ui.commentOpenTicket.action.qryLocateTicket.status */
async loadQryLocateTicket(): Promise<void> {
this.syncRouteParams();
this.qryLocateTicketState = 'loading';
setState('ui.commentOpenTicket.action.qryLocateTicket.status', 'loading');
const params: QryLocateTicketInput = {};
const options: BffClientOptions = { mode: 'silent' };
const response = await execBff<QryLocateTicketOutput[]>(qryLocateTicketRoute, params, options);
if (response.ok) {
const data: QryLocateTicketOutput[] = response.data ?? [];
this.qryLocateTicketData = data;
setState('ui.commentOpenTicket.data.qryLocateTicket', data);
this.qryLocateTicketState = 'success';
setState('ui.commentOpenTicket.action.qryLocateTicket.status', 'success');
} else {
this.qryLocateTicketState = 'error';
setState('ui.commentOpenTicket.action.qryLocateTicket.status', 'error');
if (response.error) {
console.error('qryLocateTicket failed', response.error);
}
}
this.requestUpdate();
}
/** handler for action qryLocateTicket — bind UI events here */
handleQryLocateTicketClick(event?: Event): void {
if (event) {
event.preventDefault();
}
void this.loadQryLocateTicket();
}
/** action cmdRecordComment (command) — route controleChamados.commentOpenTicket.cmdRecordComment; inputs ticketId, commentText; writes ui.commentOpenTicket.output.cmdRecordComment; status ui.commentOpenTicket.action.cmdRecordComment.status; feedback keys action.cmdRecordComment.success / action.cmdRecordComment.error */
async cmdRecordComment(): Promise<void> {
this.syncRouteParams();
if (!this.cmdRecordCommentTicketId) {
this.cmdRecordCommentState = 'idle';
setState('ui.commentOpenTicket.action.cmdRecordComment.status', 'idle');
this.requestUpdate();
return;
}
this.cmdRecordCommentState = 'loading';
setState('ui.commentOpenTicket.action.cmdRecordComment.status', 'loading');
this.cmdRecordCommentError = '';
setState('ui.commentOpenTicket.action.cmdRecordComment.error', '');
const params: CmdRecordCommentInput = {
ticketId: this.cmdRecordCommentTicketId,
commentText: this.cmdRecordCommentCommentText,
};
const options: BffClientOptions = { mode: 'blocking' };
const response = await execBff<CmdRecordCommentOutput>(cmdRecordCommentRoute, params, options);
if (!response.ok) {
const errMsg: string = this.readErrorMessage(response.error, 'action.cmdRecordComment.error');
this.cmdRecordCommentError = errMsg;
setState('ui.commentOpenTicket.action.cmdRecordComment.error', errMsg);
this.cmdRecordCommentState = 'error';
setState('ui.commentOpenTicket.action.cmdRecordComment.status', 'error');
this.requestUpdate();
return;
}
const data: CmdRecordCommentOutput | null = response.data ?? null;
this.cmdRecordCommentOutput = data;
setState('ui.commentOpenTicket.output.cmdRecordComment', data);
try {
await this.loadQryLocateTicket();
if (this.qryLocateTicketState === 'error') {
this.cmdRecordCommentState = 'error';
setState('ui.commentOpenTicket.action.cmdRecordComment.status', 'error');
this.requestUpdate();
return;
}
} catch (refreshError: unknown) {
console.error('cmdRecordComment refresh failed', refreshError);
this.cmdRecordCommentState = 'error';
setState('ui.commentOpenTicket.action.cmdRecordComment.status', 'error');
this.requestUpdate();
return;
}
this.cmdRecordCommentCommentText = '';
setState('ui.commentOpenTicket.input.cmdRecordComment.commentText', '');
this.setUiScenary('base');
this.cmdRecordCommentState = 'success';
setState('ui.commentOpenTicket.action.cmdRecordComment.status', 'success');
this.requestUpdate();
}
/** handler for action cmdRecordComment — bind UI events here */
handleCmdRecordCommentClick(event?: Event): void {
if (event) {
event.preventDefault();
}
void runBlockingUiAction(async (_signal: AbortSignal) => {
await this.cmdRecordComment();
});
}
/** setter for state ui.commentOpenTicket.input.cmdRecordComment.ticketId */
setCmdRecordCommentTicketId(value: string): void {
this.cmdRecordCommentTicketId = value;
setState('ui.commentOpenTicket.input.cmdRecordComment.ticketId', value);
this.requestUpdate();
}
/** handler for action set.cmdRecordCommentTicketId — bind UI events here */
handleCmdRecordCommentTicketIdChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setCmdRecordCommentTicketId(value);
}
/** setter for state ui.commentOpenTicket.input.cmdRecordComment.commentText */
setCmdRecordCommentCommentText(value: string): void {
this.cmdRecordCommentCommentText = value;
setState('ui.commentOpenTicket.input.cmdRecordComment.commentText', value);
this.requestUpdate();
}
/** handler for action set.cmdRecordCommentCommentText — bind UI events here */
handleCmdRecordCommentCommentTextChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setCmdRecordCommentCommentText(value);
}
}
