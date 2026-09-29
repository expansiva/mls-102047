/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/produtos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { createMovimentacaoEstoqueRoute, createProdutoRoute, listMovimentacaoEstoqueRoute, listProdutoRoute } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import type { CreateMovimentacaoEstoqueInput, CreateMovimentacaoEstoqueOutput, CreateProdutoInput, CreateProdutoOutput, ListMovimentacaoEstoqueInput, ListMovimentacaoEstoqueOutput, ListProdutoInput, ListProdutoOutput, ListProdutoItem } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
interface ErrorState { code?: string; message: string; details?: unknown; [key: string]: unknown; }
type PageStatus = 'idle'|'loading'|'empty'|'success'|'error';
type Scenary = 'base'|'detail'|'createMovimentacaoEstoque'|'createProduto';
type TipoMovimentacao = 'entrada'|'saida';
type ProdutoStatus = 'Active'|'Inactive'|'Merged'|'Blocked';
type ActionStatus = 'idle'|'loading'|'success'|'error';
export class ProdutosShared extends StateLitElement {
public pageStatus: PageStatus='idle'; public scenary: Scenary='base';
public stateCreateMovimentacaoEstoqueProdutoId:string|null=null; public stateCreateMovimentacaoEstoqueMovimentadoEm:string|null=null; public stateCreateMovimentacaoEstoqueDetailsTipo:TipoMovimentacao|null=null; public stateCreateMovimentacaoEstoqueDetailsQuantidade:number|null=null; public stateCreateMovimentacaoEstoqueStatus:ActionStatus='idle'; public stateCreateMovimentacaoEstoqueError:ErrorState|null=null; public stateCreateMovimentacaoEstoqueResult:CreateMovimentacaoEstoqueOutput|null=null;
public stateCreateProdutoDetailsIdentificationName:string|null=null; public stateCreateProdutoDetailsProductUnitOfMeasure:string|null=null; public stateCreateProdutoDetailsControleEstoqueQuantidadeMinima:number|null=null; public stateCreateProdutoStatus:ActionStatus='idle'; public stateCreateProdutoError:ErrorState|null=null; public stateCreateProdutoResult:CreateProdutoOutput|null=null;
public stateListMovimentacaoEstoqueId:string|null=null; public stateListMovimentacaoEstoqueProdutoId:string|null=null; public stateListMovimentacaoEstoqueMovimentadoEm:string|null=null; public stateListMovimentacaoEstoquePage:number|null=null; public stateListMovimentacaoEstoqueStatus:ActionStatus='idle'; public stateListMovimentacaoEstoqueError:ErrorState|null=null; public stateListMovimentacaoEstoqueResult:ListMovimentacaoEstoqueOutput=[];
public stateListProdutoId:string|null=null; public stateListProdutoDetailsIdentificationSubtype:'Product'|null=null; public stateListProdutoDetailsIdentificationName:string|null=null; public stateListProdutoDetailsIdentificationStatus:ProdutoStatus|null=null; public stateListProdutoPage:number|null=null; public stateListProdutoStatus:ActionStatus='idle'; public stateListProdutoError:ErrorState|null=null; public stateListProdutoResult:ListProdutoOutput=[];
private readonly subscribedStateKeys:string[]=['ui.produtos.pageStatus','ui.produtos.scenary','ui.produtos.createMovimentacaoEstoque.input.produtoId','ui.produtos.createMovimentacaoEstoque.input.movimentadoEm','ui.produtos.createMovimentacaoEstoque.input.details.tipo','ui.produtos.createMovimentacaoEstoque.input.details.quantidade','ui.produtos.createMovimentacaoEstoque.status','ui.produtos.createMovimentacaoEstoque.error','ui.produtos.createMovimentacaoEstoque.result','ui.produtos.createProduto.input.details.identification.name','ui.produtos.createProduto.input.details.product.unitOfMeasure','ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima','ui.produtos.createProduto.status','ui.produtos.createProduto.error','ui.produtos.createProduto.result','ui.produtos.listMovimentacaoEstoque.input.id','ui.produtos.listMovimentacaoEstoque.input.produtoId','ui.produtos.listMovimentacaoEstoque.input.movimentadoEm','ui.produtos.listMovimentacaoEstoque.input.page','ui.produtos.listMovimentacaoEstoque.status','ui.produtos.listMovimentacaoEstoque.error','ui.produtos.listMovimentacaoEstoque.result','ui.produtos.listProduto.input.id','ui.produtos.listProduto.input.details.identification.subtype','ui.produtos.listProduto.input.details.identification.name','ui.produtos.listProduto.input.details.identification.status','ui.produtos.listProduto.input.page','ui.produtos.listProduto.status','ui.produtos.listProduto.error','ui.produtos.listProduto.result'];
private errorFrom(error:unknown,fallback:string):ErrorState { if(error&&typeof error==='object'&&'message' in error&&typeof error.message==='string') return {...(error as Record<string,unknown>),message:error.message} as ErrorState; return {code:'frontend_error',message:fallback,details:error}; }
private publish(key:string,value:unknown):void { setState(key,value); }
private async refresh(ids:string[]):Promise<void>{for(const id of ids){if(id==='listProduto') await this.runListProduto(); if(id==='listMovimentacaoEstoque') await this.runListMovimentacaoEstoque();}}
public connectedCallback():void{super.connectedCallback(); for(const key of this.subscribedStateKeys){const value:unknown=getState(key); if(value!==undefined)this.handleIcaStateChange(key,value);} subscribe(this.subscribedStateKeys,this); this.applyUrlScenary(); void this.runListMovimentacaoEstoque(); void this.runListProduto();}
public disconnectedCallback():void{unsubscribe(this.subscribedStateKeys,this); super.disconnectedCallback();}
public handleIcaStateChange(key:string,value:any):void{if(value===undefined)return; const v:Record<string,(x:any)=>void>={'ui.produtos.pageStatus':x=>this.pageStatus=x,'ui.produtos.scenary':x=>this.scenary=x,'ui.produtos.createMovimentacaoEstoque.input.produtoId':x=>this.stateCreateMovimentacaoEstoqueProdutoId=x,'ui.produtos.createMovimentacaoEstoque.input.movimentadoEm':x=>this.stateCreateMovimentacaoEstoqueMovimentadoEm=x,'ui.produtos.createMovimentacaoEstoque.input.details.tipo':x=>this.stateCreateMovimentacaoEstoqueDetailsTipo=x,'ui.produtos.createMovimentacaoEstoque.input.details.quantidade':x=>this.stateCreateMovimentacaoEstoqueDetailsQuantidade=x,'ui.produtos.createMovimentacaoEstoque.status':x=>this.stateCreateMovimentacaoEstoqueStatus=x,'ui.produtos.createMovimentacaoEstoque.error':x=>this.stateCreateMovimentacaoEstoqueError=x,'ui.produtos.createMovimentacaoEstoque.result':x=>this.stateCreateMovimentacaoEstoqueResult=x,'ui.produtos.createProduto.input.details.identification.name':x=>this.stateCreateProdutoDetailsIdentificationName=x,'ui.produtos.createProduto.input.details.product.unitOfMeasure':x=>this.stateCreateProdutoDetailsProductUnitOfMeasure=x,'ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima':x=>this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima=x,'ui.produtos.createProduto.status':x=>this.stateCreateProdutoStatus=x,'ui.produtos.createProduto.error':x=>this.stateCreateProdutoError=x,'ui.produtos.createProduto.result':x=>this.stateCreateProdutoResult=x,'ui.produtos.listMovimentacaoEstoque.input.id':x=>this.stateListMovimentacaoEstoqueId=x,'ui.produtos.listMovimentacaoEstoque.input.produtoId':x=>this.stateListMovimentacaoEstoqueProdutoId=x,'ui.produtos.listMovimentacaoEstoque.input.movimentadoEm':x=>this.stateListMovimentacaoEstoqueMovimentadoEm=x,'ui.produtos.listMovimentacaoEstoque.input.page':x=>this.stateListMovimentacaoEstoquePage=x,'ui.produtos.listMovimentacaoEstoque.status':x=>this.stateListMovimentacaoEstoqueStatus=x,'ui.produtos.listMovimentacaoEstoque.error':x=>this.stateListMovimentacaoEstoqueError=x,'ui.produtos.listMovimentacaoEstoque.result':x=>this.stateListMovimentacaoEstoqueResult=x,'ui.produtos.listProduto.input.id':x=>this.stateListProdutoId=x,'ui.produtos.listProduto.input.details.identification.subtype':x=>this.stateListProdutoDetailsIdentificationSubtype=x,'ui.produtos.listProduto.input.details.identification.name':x=>this.stateListProdutoDetailsIdentificationName=x,'ui.produtos.listProduto.input.details.identification.status':x=>this.stateListProdutoDetailsIdentificationStatus=x,'ui.produtos.listProduto.input.page':x=>this.stateListProdutoPage=x,'ui.produtos.listProduto.status':x=>this.stateListProdutoStatus=x,'ui.produtos.listProduto.error':x=>this.stateListProdutoError=x,'ui.produtos.listProduto.result':x=>this.stateListProdutoResult=x}; if(v[key])v[key](value); this.requestUpdate();}
private put<T>(key:string,value:T,assign:(v:T)=>void):void{assign(value);this.publish(key,value);}
public setCreateMovimentacaoEstoqueMovimentadoEm(v:string|null):void{this.put('ui.produtos.createMovimentacaoEstoque.input.movimentadoEm',v,x=>this.stateCreateMovimentacaoEstoqueMovimentadoEm=x)} public setCreateMovimentacaoEstoqueDetailsTipo(v:TipoMovimentacao|null):void{this.put('ui.produtos.createMovimentacaoEstoque.input.details.tipo',v,x=>this.stateCreateMovimentacaoEstoqueDetailsTipo=x)} public setCreateMovimentacaoEstoqueDetailsQuantidade(v:number|null):void{this.put('ui.produtos.createMovimentacaoEstoque.input.details.quantidade',v,x=>this.stateCreateMovimentacaoEstoqueDetailsQuantidade=x)}
public setCreateProdutoDetailsIdentificationName(v:string|null):void{this.put('ui.produtos.createProduto.input.details.identification.name',v,x=>this.stateCreateProdutoDetailsIdentificationName=x)} public setCreateProdutoDetailsProductUnitOfMeasure(v:string|null):void{this.put('ui.produtos.createProduto.input.details.product.unitOfMeasure',v,x=>this.stateCreateProdutoDetailsProductUnitOfMeasure=x)} public setCreateProdutoDetailsControleEstoqueQuantidadeMinima(v:number|null):void{this.put('ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima',v,x=>this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima=x)}
public setListMovimentacaoEstoqueId(v:string|null):void{this.put('ui.produtos.listMovimentacaoEstoque.input.id',v,x=>this.stateListMovimentacaoEstoqueId=x)} public setListMovimentacaoEstoqueMovimentadoEm(v:string|null):void{this.put('ui.produtos.listMovimentacaoEstoque.input.movimentadoEm',v,x=>this.stateListMovimentacaoEstoqueMovimentadoEm=x)} public setListProdutoId(v:string|null):void{this.put('ui.produtos.listProduto.input.id',v,x=>this.stateListProdutoId=x)} public setListProdutoDetailsIdentificationSubtype(v:'Product'|null):void{this.put('ui.produtos.listProduto.input.details.identification.subtype',v,x=>this.stateListProdutoDetailsIdentificationSubtype=x)} public setListProdutoDetailsIdentificationName(v:string|null):void{this.put('ui.produtos.listProduto.input.details.identification.name',v,x=>this.stateListProdutoDetailsIdentificationName=x)} public setListProdutoDetailsIdentificationStatus(v:ProdutoStatus|null):void{this.put('ui.produtos.listProduto.input.details.identification.status',v,x=>this.stateListProdutoDetailsIdentificationStatus=x)}
public selectCreateMovimentacaoEstoqueProdutoId(id:string|null):void{this.selectProduct('ui.produtos.createMovimentacaoEstoque.input.produtoId',id,true)} public selectListMovimentacaoEstoqueProdutoId(id:string|null):void{this.selectProduct('ui.produtos.listMovimentacaoEstoque.input.produtoId',id,false)} private selectProduct(key:string,id:string|null,required:boolean):void{if(id===null||id===''){this.publish(key,null);if(required)this.stateCreateMovimentacaoEstoqueProdutoId=null;else this.stateListMovimentacaoEstoqueProdutoId=null;return;} const row:ListProdutoItem|undefined=this.stateListProdutoResult.find((x:ListProdutoItem)=>x.id===id);if(!row){const e=this.errorFrom(null,'errors.selection.identityNotFound');if(required)this.setCreateMovimentacaoError(e);else{this.stateListProdutoError=e;this.publish('ui.produtos.listProduto.error',e);}return;}this.publish(key,row.id);if(required)this.stateCreateMovimentacaoEstoqueProdutoId=row.id;else this.stateListMovimentacaoEstoqueProdutoId=row.id;this.requestUpdate();}
private setCreateMovimentacaoError(e:ErrorState):void{this.stateCreateMovimentacaoEstoqueError=e;this.stateCreateMovimentacaoEstoqueStatus='error';this.publish('ui.produtos.createMovimentacaoEstoque.error',e);this.publish('ui.produtos.createMovimentacaoEstoque.status','error');} private setCreateProdutoError(e:ErrorState):void{this.stateCreateProdutoError=e;this.stateCreateProdutoStatus='error';this.publish('ui.produtos.createProduto.error',e);this.publish('ui.produtos.createProduto.status','error');}
public async runCreateMovimentacaoEstoque():Promise<void>{if(this.stateCreateMovimentacaoEstoqueStatus==='loading')return;const produtoId=this.stateCreateMovimentacaoEstoqueProdutoId,movimentadoEm=this.stateCreateMovimentacaoEstoqueMovimentadoEm,tipo=this.stateCreateMovimentacaoEstoqueDetailsTipo,quantidade=this.stateCreateMovimentacaoEstoqueDetailsQuantidade;if(!produtoId||!movimentadoEm||!tipo||quantidade===null){this.setCreateMovimentacaoError(this.errorFrom(null,'errors.createMovimentacaoEstoque.required'));return;}this.stateCreateMovimentacaoEstoqueStatus='loading';this.publish('ui.produtos.createMovimentacaoEstoque.status','loading');this.publish('ui.produtos.createMovimentacaoEstoque.error',null);try{const response=await runBlockingUiAction((signal:AbortSignal)=>execBff<CreateMovimentacaoEstoqueOutput>(createMovimentacaoEstoqueRoute,{produtoId,movimentadoEm,details:{tipo,quantidade}},{mode:'blocking',signal}),{mode:'blocking'});if(response===undefined){this.setCreateMovimentacaoError(this.errorFrom(null,'errors.createMovimentacaoEstoque.failed'));return;}if(!response.ok||response.data===null){const feedback=response.error;const message=feedback&&typeof feedback==='object'&&'message' in feedback&&typeof feedback.message==='string'?feedback.message:'errors.createMovimentacaoEstoque.failed';this.setCreateMovimentacaoError(this.errorFrom(feedback,message));return;}this.stateCreateMovimentacaoEstoqueResult=response.data;this.publish('ui.produtos.createMovimentacaoEstoque.result',response.data);this.stateCreateMovimentacaoEstoqueStatus='success';this.publish('ui.produtos.createMovimentacaoEstoque.status','success');await this.refresh(['listMovimentacaoEstoque','listProduto']);}catch(e:unknown){this.setCreateMovimentacaoError(this.errorFrom(e,'errors.createMovimentacaoEstoque.failed'));}}
public async runCreateProduto():Promise<void>{if(this.stateCreateProdutoStatus==='loading')return;const name=this.stateCreateProdutoDetailsIdentificationName,unit=this.stateCreateProdutoDetailsProductUnitOfMeasure,minimum=this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima;if(!name||!unit||minimum===null){this.setCreateProdutoError(this.errorFrom(null,'errors.createProduto.required'));return;}this.stateCreateProdutoStatus='loading';this.publish('ui.produtos.createProduto.status','loading');this.publish('ui.produtos.createProduto.error',null);try{const params:CreateProdutoInput={details:{identification:{name},product:{unitOfMeasure:unit},controleEstoque:{quantidadeMinima:minimum}}};const response=await runBlockingUiAction((signal:AbortSignal)=>execBff<CreateProdutoOutput>(createProdutoRoute,params,{mode:'blocking',signal}),{mode:'blocking'});if(response===undefined){this.setCreateProdutoError(this.errorFrom(null,'errors.createProduto.failed'));return;}if(!response.ok||response.data===null){const feedback=response.error;const message=feedback&&typeof feedback==='object'&&'message' in feedback&&typeof feedback.message==='string'?feedback.message:'errors.createProduto.failed';this.setCreateProdutoError(this.errorFrom(feedback,message));return;}this.stateCreateProdutoResult=response.data;this.publish('ui.produtos.createProduto.result',response.data);this.stateCreateProdutoStatus='success';this.publish('ui.produtos.createProduto.status','success');await this.refresh(['listProduto']);}catch(e:unknown){this.setCreateProdutoError(this.errorFrom(e,'errors.createProduto.failed'));}}
public async runListMovimentacaoEstoque():Promise<void>{this.stateListMovimentacaoEstoqueStatus='loading';this.publish('ui.produtos.listMovimentacaoEstoque.status','loading');const params:ListMovimentacaoEstoqueInput={};if(this.stateListMovimentacaoEstoqueId)params.id=this.stateListMovimentacaoEstoqueId;if(this.stateListMovimentacaoEstoqueProdutoId)params.produtoId=this.stateListMovimentacaoEstoqueProdutoId;if(this.stateListMovimentacaoEstoqueMovimentadoEm)params.movimentadoEm=this.stateListMovimentacaoEstoqueMovimentadoEm;if(this.stateListMovimentacaoEstoquePage!==null)params.page=this.stateListMovimentacaoEstoquePage;try{const r=await execBff<ListMovimentacaoEstoqueOutput>(listMovimentacaoEstoqueRoute,params,{mode:'silent'});if(!r.ok||r.data===null){const er=this.errorFrom(r.error,'errors.listMovimentacaoEstoque.failed');this.stateListMovimentacaoEstoqueError=er;this.stateListMovimentacaoEstoqueStatus='error';this.publish('ui.produtos.listMovimentacaoEstoque.error',er);this.publish('ui.produtos.listMovimentacaoEstoque.status','error');return;}this.stateListMovimentacaoEstoqueResult=r.data;this.stateListMovimentacaoEstoqueStatus='success';this.publish('ui.produtos.listMovimentacaoEstoque.result',r.data);this.publish('ui.produtos.listMovimentacaoEstoque.status','success');}catch(e:unknown){const er=this.errorFrom(e,'errors.listMovimentacaoEstoque.failed');this.stateListMovimentacaoEstoqueError=er;this.stateListMovimentacaoEstoqueStatus='error';this.publish('ui.produtos.listMovimentacaoEstoque.error',er);this.publish('ui.produtos.listMovimentacaoEstoque.status','error');}}
public async runListProduto():Promise<void>{this.stateListProdutoStatus='loading';this.publish('ui.produtos.listProduto.status','loading');const params:ListProdutoInput={};if(this.stateListProdutoId)params.id=this.stateListProdutoId;const identification:NonNullable<NonNullable<ListProdutoInput['details']>['identification']>={};if(this.stateListProdutoDetailsIdentificationSubtype)identification.subtype=this.stateListProdutoDetailsIdentificationSubtype;if(this.stateListProdutoDetailsIdentificationName)identification.name=this.stateListProdutoDetailsIdentificationName;if(this.stateListProdutoDetailsIdentificationStatus)identification.status=this.stateListProdutoDetailsIdentificationStatus;if(Object.keys(identification).length)params.details={identification};if(this.stateListProdutoPage!==null)params.page=this.stateListProdutoPage;try{const r=await execBff<ListProdutoOutput>(listProdutoRoute,params,{mode:'silent'});if(!r.ok||r.data===null){const er=this.errorFrom(r.error,'errors.listProduto.failed');this.stateListProdutoError=er;this.stateListProdutoStatus='error';this.publish('ui.produtos.listProduto.error',er);this.publish('ui.produtos.listProduto.status','error');return;}this.stateListProdutoResult=r.data;this.stateListProdutoStatus='success';this.publish('ui.produtos.listProduto.result',r.data);this.publish('ui.produtos.listProduto.status','success');}catch(e:unknown){const er=this.errorFrom(e,'errors.listProduto.failed');this.stateListProdutoError=er;this.stateListProdutoStatus='error';this.publish('ui.produtos.listProduto.error',er);this.publish('ui.produtos.listProduto.status','error');}}
public setScenario(value:Scenary):void{const checks:Record<Scenary,unknown[]>={base:[],detail:[this.stateListProdutoId],createMovimentacaoEstoque:[this.stateCreateMovimentacaoEstoqueProdutoId,this.stateCreateMovimentacaoEstoqueMovimentadoEm,this.stateCreateMovimentacaoEstoqueDetailsTipo,this.stateCreateMovimentacaoEstoqueDetailsQuantidade],createProduto:[this.stateCreateProdutoDetailsIdentificationName,this.stateCreateProdutoDetailsProductUnitOfMeasure,this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima]};if(checks[value]===undefined||checks[value].some((x:unknown)=>x===null||x===undefined||x==='')){console.warn('errors.scenary.precondition');return;}this.scenary=value;this.publish('ui.produtos.scenary',value);this.requestUpdate();} private stateScenarioError(message:string):void{console.warn(message);} public enterBaseScenario():void{this.setScenario('base');} public enterDetailScenario():void{this.setScenario('detail');} public enterCreateMovimentacaoEstoqueScenario():void{this.setScenario('createMovimentacaoEstoque');} public enterCreateProdutoScenario():void{this.setScenario('createProduto');}

  /** setter for state ui.produtos.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'detail', 'createMovimentacaoEstoque', 'createProduto'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'detail' && ((this.stateListProdutoId == null || String(this.stateListProdutoId) === ''))) next = 'base';
    if (value === 'createMovimentacaoEstoque' && ((this.stateCreateMovimentacaoEstoqueProdutoId == null || String(this.stateCreateMovimentacaoEstoqueProdutoId) === '') || (this.stateCreateMovimentacaoEstoqueMovimentadoEm == null || String(this.stateCreateMovimentacaoEstoqueMovimentadoEm) === '') || (this.stateCreateMovimentacaoEstoqueDetailsTipo == null || String(this.stateCreateMovimentacaoEstoqueDetailsTipo) === '') || (this.stateCreateMovimentacaoEstoqueDetailsQuantidade == null || String(this.stateCreateMovimentacaoEstoqueDetailsQuantidade) === ''))) next = 'base';
    if (value === 'createProduto' && ((this.stateCreateProdutoDetailsIdentificationName == null || String(this.stateCreateProdutoDetailsIdentificationName) === '') || (this.stateCreateProdutoDetailsProductUnitOfMeasure == null || String(this.stateCreateProdutoDetailsProductUnitOfMeasure) === '') || (this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima == null || String(this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima) === ''))) next = 'base';
    this.scenary = next as typeof this.scenary;
    setState('ui.produtos.scenary', next);
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
    const rawId: string = params.get('id') || '';
    if (rawId) {
      if (this.stateListProdutoId == null || String(this.stateListProdutoId) === '') {
        this.stateListProdutoId = rawId;
        setState('ui.produtos.listProduto.input.id', rawId);
      }
    }
    const rawProdutoId: string = params.get('produtoId') || '';
    if (rawProdutoId) {
      if (this.stateCreateMovimentacaoEstoqueProdutoId == null || String(this.stateCreateMovimentacaoEstoqueProdutoId) === '') {
        this.stateCreateMovimentacaoEstoqueProdutoId = rawProdutoId;
        setState('ui.produtos.createMovimentacaoEstoque.input.produtoId', rawProdutoId);
      }
    }
    const rawMovimentadoEm: string = params.get('movimentadoEm') || '';
    if (rawMovimentadoEm) {
      if (this.stateCreateMovimentacaoEstoqueMovimentadoEm == null || String(this.stateCreateMovimentacaoEstoqueMovimentadoEm) === '') {
        this.stateCreateMovimentacaoEstoqueMovimentadoEm = rawMovimentadoEm;
        setState('ui.produtos.createMovimentacaoEstoque.input.movimentadoEm', rawMovimentadoEm);
      }
    }
    const rawTipo: string = params.get('tipo') || '';
    if (rawTipo) {
      if (this.stateCreateMovimentacaoEstoqueDetailsTipo == null || String(this.stateCreateMovimentacaoEstoqueDetailsTipo) === '') {
        if (['entrada', 'saida'].includes(rawTipo)) {
          this.stateCreateMovimentacaoEstoqueDetailsTipo = rawTipo as typeof this.stateCreateMovimentacaoEstoqueDetailsTipo;
          setState('ui.produtos.createMovimentacaoEstoque.input.details.tipo', rawTipo);
        }
      }
    }
    const rawQuantidade: string = params.get('quantidade') || '';
    if (rawQuantidade) {
      if (this.stateCreateMovimentacaoEstoqueDetailsQuantidade == null || String(this.stateCreateMovimentacaoEstoqueDetailsQuantidade) === '') {
        const stateCreateMovimentacaoEstoqueDetailsQuantidadeNum = Number(rawQuantidade);
        if (Number.isFinite(stateCreateMovimentacaoEstoqueDetailsQuantidadeNum)) {
          this.stateCreateMovimentacaoEstoqueDetailsQuantidade = stateCreateMovimentacaoEstoqueDetailsQuantidadeNum as unknown as typeof this.stateCreateMovimentacaoEstoqueDetailsQuantidade;
          setState('ui.produtos.createMovimentacaoEstoque.input.details.quantidade', stateCreateMovimentacaoEstoqueDetailsQuantidadeNum);
        }
      }
    }
    const rawName: string = params.get('name') || '';
    if (rawName) {
      if (this.stateCreateProdutoDetailsIdentificationName == null || String(this.stateCreateProdutoDetailsIdentificationName) === '') {
        this.stateCreateProdutoDetailsIdentificationName = rawName;
        setState('ui.produtos.createProduto.input.details.identification.name', rawName);
      }
    }
    const rawUnitOfMeasure: string = params.get('unitOfMeasure') || '';
    if (rawUnitOfMeasure) {
      if (this.stateCreateProdutoDetailsProductUnitOfMeasure == null || String(this.stateCreateProdutoDetailsProductUnitOfMeasure) === '') {
        this.stateCreateProdutoDetailsProductUnitOfMeasure = rawUnitOfMeasure;
        setState('ui.produtos.createProduto.input.details.product.unitOfMeasure', rawUnitOfMeasure);
      }
    }
    const rawQuantidadeMinima: string = params.get('quantidadeMinima') || '';
    if (rawQuantidadeMinima) {
      if (this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima == null || String(this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima) === '') {
        const stateCreateProdutoDetailsControleEstoqueQuantidadeMinimaNum = Number(rawQuantidadeMinima);
        if (Number.isFinite(stateCreateProdutoDetailsControleEstoqueQuantidadeMinimaNum)) {
          this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima = stateCreateProdutoDetailsControleEstoqueQuantidadeMinimaNum as unknown as typeof this.stateCreateProdutoDetailsControleEstoqueQuantidadeMinima;
          setState('ui.produtos.createProduto.input.details.controleEstoque.quantidadeMinima', stateCreateProdutoDetailsControleEstoqueQuantidadeMinimaNum);
        }
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

}
export { ProdutosShared as ControleEstoqueProdutosBase };