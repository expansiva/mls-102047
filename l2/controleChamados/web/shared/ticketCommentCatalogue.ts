/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { QryListTicketCommentInput, QryListTicketCommentOutput, CmdCreateTicketCommentInput, CmdCreateTicketCommentOutput, CmdUpdateTicketCommentInput, CmdUpdateTicketCommentOutput, CmdDeleteTicketCommentInput, CmdDeleteTicketCommentOutput, QryGetTicketCommentInput, QryGetTicketCommentOutput, QryTicketPickerInput, QryTicketPickerOutput } from '/_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.js';
import { qryListTicketCommentRoute, cmdCreateTicketCommentRoute, cmdUpdateTicketCommentRoute, cmdDeleteTicketCommentRoute, qryGetTicketCommentRoute, qryTicketPickerRoute } from '/_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.js';
export type { QryListTicketCommentInput, QryListTicketCommentOutput, CmdCreateTicketCommentInput, CmdCreateTicketCommentOutput, CmdUpdateTicketCommentInput, CmdUpdateTicketCommentOutput, CmdDeleteTicketCommentInput, CmdDeleteTicketCommentOutput, QryGetTicketCommentInput, QryGetTicketCommentOutput, QryTicketPickerInput, QryTicketPickerOutput } from '/_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.js';

const SUBSCRIBED_STATE_KEYS: string[] = [
'ui.ticketCommentCatalogue.status','ui.ticketCommentCatalogue.scenary','ui.ticketCommentCatalogue.action.qryListTicketComment.status','ui.ticketCommentCatalogue.data.qryListTicketComment','ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId','ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText','ui.ticketCommentCatalogue.output.cmdCreateTicketComment','ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error','ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId','ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId','ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText','ui.ticketCommentCatalogue.output.cmdUpdateTicketComment','ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error','ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId','ui.ticketCommentCatalogue.output.cmdDeleteTicketComment','ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error','ui.ticketCommentCatalogue.action.qryGetTicketComment.status','ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId','ui.ticketCommentCatalogue.data.qryGetTicketComment','ui.ticketCommentCatalogue.action.qryTicketPicker.status','ui.ticketCommentCatalogue.input.qryTicketPicker.search','ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy','ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder','ui.ticketCommentCatalogue.data.qryTicketPicker'];

type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
type Scenary = 'base' | 'detail' | 'createTicketComment' | 'updateTicketComment';

export class ControleChamadosTicketCommentCatalogueBase extends CollabLitElement {
/** state status — pageStatus */ @property() status: string = '';
/** state ui.ticketCommentCatalogue.scenary — uiScenary, values: base|detail|createTicketComment|updateTicketComment */ @property() uiScenary: Scenary = 'base';
/** state qryListTicketCommentState — actionStatus, values: idle|loading|success|error */ @property() qryListTicketCommentState: ActionStatus = 'idle';
/** state qryListTicketCommentData — queryResult, outputShape: array */ @property() qryListTicketCommentData: QryListTicketCommentOutput[] = [];
/** state cmdCreateTicketCommentState — actionStatus, values: idle|loading|success|error */ @property() cmdCreateTicketCommentState: ActionStatus = 'idle';
/** state cmdCreateTicketCommentTicketId — input */ @property() cmdCreateTicketCommentTicketId: string = '';
/** state cmdCreateTicketCommentCommentText — input */ @property() cmdCreateTicketCommentCommentText: string = '';
/** state cmdCreateTicketCommentOutput — commandOutput */ @property() cmdCreateTicketCommentOutput: CmdCreateTicketCommentOutput | null = null;
/** state cmdCreateTicketCommentError — actionError */ @property() cmdCreateTicketCommentError: string = '';
/** state cmdUpdateTicketCommentState — actionStatus, values: idle|loading|success|error */ @property() cmdUpdateTicketCommentState: ActionStatus = 'idle';
/** state cmdUpdateTicketCommentTicketCommentId — input */ @property() cmdUpdateTicketCommentTicketCommentId: string = '';
/** state cmdUpdateTicketCommentTicketId — input */ @property() cmdUpdateTicketCommentTicketId: string = '';
/** state cmdUpdateTicketCommentCommentText — input */ @property() cmdUpdateTicketCommentCommentText: string = '';
/** state cmdUpdateTicketCommentOutput — commandOutput */ @property() cmdUpdateTicketCommentOutput: CmdUpdateTicketCommentOutput | null = null;
/** state cmdUpdateTicketCommentError — actionError */ @property() cmdUpdateTicketCommentError: string = '';
/** state cmdDeleteTicketCommentState — actionStatus, values: idle|loading|success|error */ @property() cmdDeleteTicketCommentState: ActionStatus = 'idle';
/** state cmdDeleteTicketCommentTicketCommentId — input */ @property() cmdDeleteTicketCommentTicketCommentId: string = '';
/** state cmdDeleteTicketCommentOutput — commandOutput */ @property() cmdDeleteTicketCommentOutput: CmdDeleteTicketCommentOutput | null = null;
/** state cmdDeleteTicketCommentError — actionError */ @property() cmdDeleteTicketCommentError: string = '';
/** state qryGetTicketCommentState — actionStatus, values: idle|loading|success|error */ @property() qryGetTicketCommentState: ActionStatus = 'idle';
/** state qryGetTicketCommentTicketCommentId — input */ @property() qryGetTicketCommentTicketCommentId: string = '';
/** state qryGetTicketCommentData — queryResult, outputShape: object */ @property() qryGetTicketCommentData: QryGetTicketCommentOutput | null = null;
/** state qryTicketPickerState — actionStatus, values: idle|loading|success|error */ @property() qryTicketPickerState: ActionStatus = 'idle';
/** state qryTicketPickerSearch — input */ @property() qryTicketPickerSearch: string = '';
/** state qryTicketPickerSortBy — input, values: open|closed */ @property() qryTicketPickerSortBy: string = '';
/** state qryTicketPickerSortOrder — input, values: asc|desc */ @property() qryTicketPickerSortOrder: string = '';
/** state qryTicketPickerData — queryResult, outputShape: array */ @property() qryTicketPickerData: QryTicketPickerOutput[] = [];

connectedCallback(): void {
 super.connectedCallback();
 const defaults: Array<[string, unknown]> = [['ui.ticketCommentCatalogue.status',''],['ui.ticketCommentCatalogue.scenary','base'],['ui.ticketCommentCatalogue.action.qryListTicketComment.status','idle'],['ui.ticketCommentCatalogue.data.qryListTicketComment',[]],['ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','idle'],['ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId',''],['ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText',''],['ui.ticketCommentCatalogue.output.cmdCreateTicketComment',null],['ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error',''],['ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','idle'],['ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId',''],['ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId',''],['ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText',''],['ui.ticketCommentCatalogue.output.cmdUpdateTicketComment',null],['ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error',''],['ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','idle'],['ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId',''],['ui.ticketCommentCatalogue.output.cmdDeleteTicketComment',null],['ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error',''],['ui.ticketCommentCatalogue.action.qryGetTicketComment.status','idle'],['ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId',''],['ui.ticketCommentCatalogue.data.qryGetTicketComment',null],['ui.ticketCommentCatalogue.action.qryTicketPicker.status','idle'],['ui.ticketCommentCatalogue.input.qryTicketPicker.search',''],['ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy',''],['ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder',''],['ui.ticketCommentCatalogue.data.qryTicketPicker',[]]];
 defaults.forEach(([key,value]) => this.initStateValue(key,value));
 this.applyUrlScenary(); subscribe(SUBSCRIBED_STATE_KEYS,this);
 void this.loadQryListTicketComment(); void this.loadQryTicketPicker();
}
disconnectedCallback(): void { unsubscribe(SUBSCRIBED_STATE_KEYS,this); super.disconnectedCallback(); }
/** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
handleIcaStateChange(key: string,value: unknown): void { this.assignState(key,value); this.requestUpdate(); }
private initStateValue(key: string, defaultValue: unknown): void { const value: unknown=getState(key) ?? defaultValue; this.assignState(key,value); if (getState(key) === undefined) setState(key,value); }
private assignState(key: string,value: unknown): void {
 switch(key) {
 case 'ui.ticketCommentCatalogue.status': this.status=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.scenary': this.uiScenary=(value as Scenary)??'base'; break;
 case 'ui.ticketCommentCatalogue.action.qryListTicketComment.status': this.qryListTicketCommentState=(value as ActionStatus)??'idle'; break;
 case 'ui.ticketCommentCatalogue.data.qryListTicketComment': this.qryListTicketCommentData=(value as QryListTicketCommentOutput[])??[]; break;
 case 'ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status': this.cmdCreateTicketCommentState=(value as ActionStatus)??'idle'; break;
 case 'ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId': this.cmdCreateTicketCommentTicketId=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText': this.cmdCreateTicketCommentCommentText=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.output.cmdCreateTicketComment': this.cmdCreateTicketCommentOutput=(value as CmdCreateTicketCommentOutput|null)??null; break;
 case 'ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error': this.cmdCreateTicketCommentError=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status': this.cmdUpdateTicketCommentState=(value as ActionStatus)??'idle'; break;
 case 'ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId': this.cmdUpdateTicketCommentTicketCommentId=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId': this.cmdUpdateTicketCommentTicketId=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText': this.cmdUpdateTicketCommentCommentText=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.output.cmdUpdateTicketComment': this.cmdUpdateTicketCommentOutput=(value as CmdUpdateTicketCommentOutput|null)??null; break;
 case 'ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error': this.cmdUpdateTicketCommentError=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status': this.cmdDeleteTicketCommentState=(value as ActionStatus)??'idle'; break;
 case 'ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId': this.cmdDeleteTicketCommentTicketCommentId=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.output.cmdDeleteTicketComment': this.cmdDeleteTicketCommentOutput=(value as CmdDeleteTicketCommentOutput|null)??null; break;
 case 'ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error': this.cmdDeleteTicketCommentError=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.action.qryGetTicketComment.status': this.qryGetTicketCommentState=(value as ActionStatus)??'idle'; break;
 case 'ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId': this.qryGetTicketCommentTicketCommentId=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.data.qryGetTicketComment': this.qryGetTicketCommentData=(value as QryGetTicketCommentOutput|null)??null; break;
 case 'ui.ticketCommentCatalogue.action.qryTicketPicker.status': this.qryTicketPickerState=(value as ActionStatus)??'idle'; break;
 case 'ui.ticketCommentCatalogue.input.qryTicketPicker.search': this.qryTicketPickerSearch=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy': this.qryTicketPickerSortBy=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder': this.qryTicketPickerSortOrder=(value as string)??''; break;
 case 'ui.ticketCommentCatalogue.data.qryTicketPicker': this.qryTicketPickerData=(value as QryTicketPickerOutput[])??[]; break;
 }
}

  /** setter for state ui.ticketCommentCatalogue.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'detail', 'createTicketComment', 'updateTicketComment'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'detail' && (!this.qryGetTicketCommentTicketCommentId)) next = 'base';
    if (value === 'createTicketComment' && (!this.cmdCreateTicketCommentTicketId)) next = 'base';
    if (value === 'updateTicketComment' && (!this.cmdUpdateTicketCommentTicketCommentId || !this.cmdUpdateTicketCommentTicketId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.ticketCommentCatalogue.scenary', next);
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
    const rawTicketCommentId: string = params.get('ticketCommentId') || '';
    if (rawTicketCommentId) {
      if (!this.qryGetTicketCommentTicketCommentId) {
        this.qryGetTicketCommentTicketCommentId = rawTicketCommentId;
        setState('ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId', rawTicketCommentId);
      }
      if (!this.cmdUpdateTicketCommentTicketCommentId) {
        this.cmdUpdateTicketCommentTicketCommentId = rawTicketCommentId;
        setState('ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId', rawTicketCommentId);
      }
    }
    const rawTicketId: string = params.get('ticketId') || '';
    if (rawTicketId) {
      if (!this.cmdCreateTicketCommentTicketId) {
        this.cmdCreateTicketCommentTicketId = rawTicketId;
        setState('ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId', rawTicketId);
      }
      if (!this.cmdUpdateTicketCommentTicketId) {
        this.cmdUpdateTicketCommentTicketId = rawTicketId;
        setState('ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId', rawTicketId);
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

private readErrorMessage(error: unknown,fallback: string): string { if(error&&typeof error==='object'&&'message' in error){const message=(error as {message?:unknown}).message;if(typeof message==='string'&&message)return message;} return fallback; }
private setStatus(key: string,status: ActionStatus): void { setState(key,status); this.assignState(key,status); }
private async refresh(action: string): Promise<boolean> { if(action==='qryListTicketComment'){await this.loadQryListTicketComment();return this.qryListTicketCommentState!=='error';} if(action==='qryGetTicketComment'){await this.loadQryGetTicketComment();return this.qryGetTicketCommentState!=='error';} await this.loadQryTicketPicker(); return this.qryTicketPickerState!=='error'; }

/** action qryListTicketComment (query) — route controleChamados.ticketCommentCatalogue.qryListTicketComment; inputs none; writes ui.ticketCommentCatalogue.data.qryListTicketComment; status ui.ticketCommentCatalogue.action.qryListTicketComment.status */
async loadQryListTicketComment(): Promise<void> { this.setStatus('ui.ticketCommentCatalogue.action.qryListTicketComment.status','loading'); const params:QryListTicketCommentInput={}; const options:BffClientOptions={mode:'silent'}; const response=await execBff<QryListTicketCommentOutput[]>(qryListTicketCommentRoute,params,options); if(response.ok){const data=response.data??[];this.qryListTicketCommentData=data;setState('ui.ticketCommentCatalogue.data.qryListTicketComment',data);this.setStatus('ui.ticketCommentCatalogue.action.qryListTicketComment.status','success');}else{this.setStatus('ui.ticketCommentCatalogue.action.qryListTicketComment.status','error');if(response.error)console.error('qryListTicketComment failed',response.error);} this.requestUpdate(); }
/** handler for action qryListTicketComment — bind UI events here */
handleQryListTicketCommentClick(event?: Event): void {event?.preventDefault();void this.loadQryListTicketComment();}

/** action cmdCreateTicketComment (command) — route controleChamados.ticketCommentCatalogue.cmdCreateTicketComment; inputs ticketId, commentText; writes ui.ticketCommentCatalogue.output.cmdCreateTicketComment; status ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status; feedback keys action.cmdCreateTicketComment.success / action.cmdCreateTicketComment.error */
async cmdCreateTicketComment(): Promise<void> { if(!this.cmdCreateTicketCommentTicketId){this.setStatus('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','idle');return;} this.setStatus('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','loading');setState('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error',''); const params:CmdCreateTicketCommentInput={ticketId:this.cmdCreateTicketCommentTicketId,commentText:this.cmdCreateTicketCommentCommentText}; const response=await execBff<CmdCreateTicketCommentOutput>(cmdCreateTicketCommentRoute,params,{mode:'blocking'}); if(!response.ok){const message=this.readErrorMessage(response.error,'action.cmdCreateTicketComment.error');this.assignState('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error',message);setState('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error',message);this.setStatus('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','error');return;} const data=response.data??null;this.cmdCreateTicketCommentOutput=data;setState('ui.ticketCommentCatalogue.output.cmdCreateTicketComment',data); for(const action of ['qryListTicketComment','qryGetTicketComment','qryTicketPicker'])if(!(await this.refresh(action))){this.setStatus('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','error');return;} this.setCmdCreateTicketCommentTicketId('');this.setCmdCreateTicketCommentCommentText('');this.setUiScenary('base');this.setStatus('ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status','success'); }
/** handler for action cmdCreateTicketComment — bind UI events here */
handleCmdCreateTicketCommentClick(event?: Event): void {event?.preventDefault();void runBlockingUiAction(async():Promise<void>=>{await this.cmdCreateTicketComment();});}

/** action cmdUpdateTicketComment (command) — route controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment; inputs ticketCommentId, ticketId, commentText; writes ui.ticketCommentCatalogue.output.cmdUpdateTicketComment; status ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status; feedback keys action.cmdUpdateTicketComment.success / action.cmdUpdateTicketComment.error */
async cmdUpdateTicketComment(): Promise<void> {if(!this.cmdUpdateTicketCommentTicketCommentId||!this.cmdUpdateTicketCommentTicketId){this.setStatus('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','idle');return;}this.setStatus('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','loading');setState('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error','');const params:CmdUpdateTicketCommentInput={ticketCommentId:this.cmdUpdateTicketCommentTicketCommentId,ticketId:this.cmdUpdateTicketCommentTicketId,commentText:this.cmdUpdateTicketCommentCommentText};const response=await execBff<CmdUpdateTicketCommentOutput>(cmdUpdateTicketCommentRoute,params,{mode:'blocking'});if(!response.ok){const message=this.readErrorMessage(response.error,'action.cmdUpdateTicketComment.error');this.assignState('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error',message);setState('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error',message);this.setStatus('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','error');return;}const data=response.data??null;this.cmdUpdateTicketCommentOutput=data;setState('ui.ticketCommentCatalogue.output.cmdUpdateTicketComment',data);for(const action of ['qryListTicketComment','qryGetTicketComment','qryTicketPicker'])if(!(await this.refresh(action))){this.setStatus('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','error');return;}this.setCmdUpdateTicketCommentTicketCommentId('');this.setCmdUpdateTicketCommentTicketId('');this.setCmdUpdateTicketCommentCommentText('');this.setUiScenary('base');this.setStatus('ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status','success');}
/** handler for action cmdUpdateTicketComment — bind UI events here */
handleCmdUpdateTicketCommentClick(event?: Event): void {event?.preventDefault();void runBlockingUiAction(async():Promise<void>=>{await this.cmdUpdateTicketComment();});}

/** action cmdDeleteTicketComment (command) — route controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment; inputs ticketCommentId; writes ui.ticketCommentCatalogue.output.cmdDeleteTicketComment; status ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status; feedback keys action.cmdDeleteTicketComment.success / action.cmdDeleteTicketComment.error */
async cmdDeleteTicketComment(): Promise<void> {if(!this.cmdDeleteTicketCommentTicketCommentId){this.setStatus('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','idle');return;}this.setStatus('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','loading');setState('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error','');const params:CmdDeleteTicketCommentInput={ticketCommentId:this.cmdDeleteTicketCommentTicketCommentId};const response=await execBff<CmdDeleteTicketCommentOutput>(cmdDeleteTicketCommentRoute,params,{mode:'blocking'});if(!response.ok){const message=this.readErrorMessage(response.error,'action.cmdDeleteTicketComment.error');this.assignState('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error',message);setState('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error',message);this.setStatus('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','error');return;}const data=response.data??null;this.cmdDeleteTicketCommentOutput=data;setState('ui.ticketCommentCatalogue.output.cmdDeleteTicketComment',data);for(const action of ['qryListTicketComment','qryGetTicketComment','qryTicketPicker'])if(!(await this.refresh(action))){this.setStatus('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','error');return;}this.setCmdDeleteTicketCommentTicketCommentId('');this.setUiScenary('base');this.setStatus('ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status','success');}
/** handler for action cmdDeleteTicketComment — bind UI events here */
handleCmdDeleteTicketCommentClick(event?: Event): void {event?.preventDefault();void runBlockingUiAction(async():Promise<void>=>{await this.cmdDeleteTicketComment();});}

/** action qryGetTicketComment (query) — route controleChamados.ticketCommentCatalogue.qryGetTicketComment; inputs ticketCommentId; writes ui.ticketCommentCatalogue.data.qryGetTicketComment; status ui.ticketCommentCatalogue.action.qryGetTicketComment.status */
async loadQryGetTicketComment(): Promise<void> {if(!this.qryGetTicketCommentTicketCommentId){this.setStatus('ui.ticketCommentCatalogue.action.qryGetTicketComment.status','idle');return;}this.setStatus('ui.ticketCommentCatalogue.action.qryGetTicketComment.status','loading');const params:QryGetTicketCommentInput={ticketCommentId:this.qryGetTicketCommentTicketCommentId};const response=await execBff<QryGetTicketCommentOutput>(qryGetTicketCommentRoute,params,{mode:'silent'});if(response.ok){const data=response.data??null;this.qryGetTicketCommentData=data;setState('ui.ticketCommentCatalogue.data.qryGetTicketComment',data);this.setStatus('ui.ticketCommentCatalogue.action.qryGetTicketComment.status','success');}else{this.setStatus('ui.ticketCommentCatalogue.action.qryGetTicketComment.status','error');if(response.error)console.error('qryGetTicketComment failed',response.error);}this.requestUpdate();}
/** handler for action qryGetTicketComment — bind UI events here */
handleQryGetTicketCommentClick(event?: Event): void {event?.preventDefault();void this.loadQryGetTicketComment();}
/** action qryTicketPicker (query) — route controleChamados.ticketCommentCatalogue.qryTicketPicker; inputs search, sortBy, sortOrder; writes ui.ticketCommentCatalogue.data.qryTicketPicker; status ui.ticketCommentCatalogue.action.qryTicketPicker.status */
async loadQryTicketPicker(): Promise<void> {this.setStatus('ui.ticketCommentCatalogue.action.qryTicketPicker.status','loading');const params:QryTicketPickerInput={};if(this.qryTicketPickerSearch)params.search=this.qryTicketPickerSearch;if(this.qryTicketPickerSortBy)params.sortBy=this.qryTicketPickerSortBy as QryTicketPickerInput['sortBy'];if(this.qryTicketPickerSortOrder)params.sortOrder=this.qryTicketPickerSortOrder as QryTicketPickerInput['sortOrder'];const response=await execBff<QryTicketPickerOutput[]>(qryTicketPickerRoute,params,{mode:'silent'});if(response.ok){const data=response.data??[];this.qryTicketPickerData=data;setState('ui.ticketCommentCatalogue.data.qryTicketPicker',data);this.setStatus('ui.ticketCommentCatalogue.action.qryTicketPicker.status','success');}else{this.setStatus('ui.ticketCommentCatalogue.action.qryTicketPicker.status','error');if(response.error)console.error('qryTicketPicker failed',response.error);}this.requestUpdate();}
/** handler for action qryTicketPicker — bind UI events here */
handleQryTicketPickerClick(event?: Event): void {event?.preventDefault();void this.loadQryTicketPicker();}

private inputValue(event: Event): string {const target=event.target as HTMLInputElement|HTMLSelectElement|null;return target&&'value' in target?String(target.value):'';}
/** setter for state ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId */
setCmdCreateTicketCommentTicketId(value: string): void {this.cmdCreateTicketCommentTicketId=value;setState('ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId',value);const item=this.qryListTicketCommentData.find((row:QryListTicketCommentOutput)=>String(row.ticketId)===String(value));if(item&&item.commentText!=null){this.setCmdCreateTicketCommentCommentText(item.commentText);}this.requestUpdate();}
/** handler for action set.cmdCreateTicketCommentTicketId — bind UI events here */ handleCmdCreateTicketCommentTicketIdChange(event: Event): void {this.setCmdCreateTicketCommentTicketId(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText */
setCmdCreateTicketCommentCommentText(value: string): void {this.cmdCreateTicketCommentCommentText=value;setState('ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText',value);this.requestUpdate();}
/** handler for action set.cmdCreateTicketCommentCommentText — bind UI events here */ handleCmdCreateTicketCommentCommentTextChange(event: Event): void {this.setCmdCreateTicketCommentCommentText(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId */
setCmdUpdateTicketCommentTicketCommentId(value: string): void {this.cmdUpdateTicketCommentTicketCommentId=value;setState('ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId',value);const item=this.qryListTicketCommentData.find((row:QryListTicketCommentOutput)=>String(row.ticketCommentId)===String(value));if(item&&item.commentText!=null)this.setCmdUpdateTicketCommentCommentText(item.commentText);this.requestUpdate();}
/** handler for action set.cmdUpdateTicketCommentTicketCommentId — bind UI events here */ handleCmdUpdateTicketCommentTicketCommentIdChange(event: Event): void {this.setCmdUpdateTicketCommentTicketCommentId(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId */
setCmdUpdateTicketCommentTicketId(value: string): void {this.cmdUpdateTicketCommentTicketId=value;setState('ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId',value);const item=this.qryListTicketCommentData.find((row:QryListTicketCommentOutput)=>String(row.ticketId)===String(value));if(item&&item.commentText!=null)this.setCmdUpdateTicketCommentCommentText(item.commentText);this.requestUpdate();}
/** handler for action set.cmdUpdateTicketCommentTicketId — bind UI events here */ handleCmdUpdateTicketCommentTicketIdChange(event: Event): void {this.setCmdUpdateTicketCommentTicketId(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText */
setCmdUpdateTicketCommentCommentText(value: string): void {this.cmdUpdateTicketCommentCommentText=value;setState('ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText',value);this.requestUpdate();}
/** handler for action set.cmdUpdateTicketCommentCommentText — bind UI events here */ handleCmdUpdateTicketCommentCommentTextChange(event: Event): void {this.setCmdUpdateTicketCommentCommentText(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId */
setCmdDeleteTicketCommentTicketCommentId(value: string): void {this.cmdDeleteTicketCommentTicketCommentId=value;setState('ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId',value);this.requestUpdate();}
/** handler for action set.cmdDeleteTicketCommentTicketCommentId — bind UI events here */ handleCmdDeleteTicketCommentTicketCommentIdChange(event: Event): void {this.setCmdDeleteTicketCommentTicketCommentId(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId */
setQryGetTicketCommentTicketCommentId(value: string): void {this.qryGetTicketCommentTicketCommentId=value;setState('ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId',value);this.requestUpdate();}
/** handler for action set.qryGetTicketCommentTicketCommentId — bind UI events here */ handleQryGetTicketCommentTicketCommentIdChange(event: Event): void {this.setQryGetTicketCommentTicketCommentId(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.qryTicketPicker.search */
setQryTicketPickerSearch(value: string): void {this.qryTicketPickerSearch=value;setState('ui.ticketCommentCatalogue.input.qryTicketPicker.search',value);this.requestUpdate();}
/** handler for action set.qryTicketPickerSearch — bind UI events here */ handleQryTicketPickerSearchChange(event: Event): void {this.setQryTicketPickerSearch(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy */
setQryTicketPickerSortBy(value: string): void {this.qryTicketPickerSortBy=value;setState('ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy',value);this.requestUpdate();}
/** handler for action set.qryTicketPickerSortBy — bind UI events here */ handleQryTicketPickerSortByChange(event: Event): void {this.setQryTicketPickerSortBy(this.inputValue(event));}
/** setter for state ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder */
setQryTicketPickerSortOrder(value: string): void {this.qryTicketPickerSortOrder=value;setState('ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder',value);this.requestUpdate();}
/** handler for action set.qryTicketPickerSortOrder — bind UI events here */ handleQryTicketPickerSortOrderChange(event: Event): void {this.setQryTicketPickerSortOrder(this.inputValue(event));}
}