/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/movimentacoes.ts" enhancement="_102020_/l2/enhancementAura"/>

import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { createMovimentacaoEstoqueRoute, listMovimentacaoEstoqueRoute, listProdutoRoute, type CreateMovimentacaoEstoqueInput, type CreateMovimentacaoEstoqueOutput, type ListMovimentacaoEstoqueInput, type ListMovimentacaoEstoqueOutput, type ListProdutoInput, type ListProdutoOutput } from '/_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.js';
type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
type Scenary = 'base' | 'createMovimentacaoEstoque';
type Tipo = 'entrada' | 'saida';
type ProdutoSubtype = 'Product';
type ProdutoStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
type ErrorState = { code?: string; message: string; details?: unknown };
type NullableErrorState = ErrorState | null;
const stateKeys: string[] = ['ui.movimentacoes.pageStatus','ui.movimentacoes.scenary','ui.movimentacoes.createMovimentacaoEstoque.input.produtoId','ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm','ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo','ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade','ui.movimentacoes.createMovimentacaoEstoque.status','ui.movimentacoes.createMovimentacaoEstoque.error','ui.movimentacoes.createMovimentacaoEstoque.result','ui.movimentacoes.listMovimentacaoEstoque.input.id','ui.movimentacoes.listMovimentacaoEstoque.input.produtoId','ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm','ui.movimentacoes.listMovimentacaoEstoque.input.page','ui.movimentacoes.listMovimentacaoEstoque.status','ui.movimentacoes.listMovimentacaoEstoque.error','ui.movimentacoes.listMovimentacaoEstoque.result','ui.movimentacoes.listProduto.input.id','ui.movimentacoes.listProduto.input.details.identification.subtype','ui.movimentacoes.listProduto.input.details.identification.name','ui.movimentacoes.listProduto.input.details.identification.status','ui.movimentacoes.listProduto.input.page','ui.movimentacoes.listProduto.status','ui.movimentacoes.listProduto.error','ui.movimentacoes.listProduto.result'];
export class MovimentacoesShared extends StateLitElement {
public pageStatus: PageStatus='idle'; public scenary: Scenary='base';
public stateCreateMovimentacaoEstoqueProdutoId:string|null=null; public stateCreateMovimentacaoEstoqueMovimentadoEm:string|null=null; public stateCreateMovimentacaoEstoqueDetailsTipo:Tipo|null=null; public stateCreateMovimentacaoEstoqueDetailsQuantidade:number|null=null; public stateCreateMovimentacaoEstoqueStatus:ActionStatus='idle'; public stateCreateMovimentacaoEstoqueError:NullableErrorState=null; public stateCreateMovimentacaoEstoqueResult:CreateMovimentacaoEstoqueOutput|null=null;
public stateListMovimentacaoEstoqueId:string|null=null; public stateListMovimentacaoEstoqueProdutoId:string|null=null; public stateListMovimentacaoEstoqueMovimentadoEm:string|null=null; public stateListMovimentacaoEstoquePage:number|null=null; public stateListMovimentacaoEstoqueStatus:ActionStatus='idle'; public stateListMovimentacaoEstoqueError:NullableErrorState=null; public stateListMovimentacaoEstoqueResult:ListMovimentacaoEstoqueOutput=[];
public stateListProdutoId:string|null=null; public stateListProdutoDetailsIdentificationSubtype:ProdutoSubtype|null=null; public stateListProdutoDetailsIdentificationName:string|null=null; public stateListProdutoDetailsIdentificationStatus:ProdutoStatus|null=null; public stateListProdutoPage:number|null=null; public stateListProdutoStatus:ActionStatus='idle'; public stateListProdutoError:NullableErrorState=null; public stateListProdutoResult:ListProdutoOutput=[];
private feedback(error:unknown,fallback:string):NonNullable<ErrorState>{if(error&&typeof error==='object'&&'message'in error&&typeof error.message==='string'){const e=error as {code?:unknown;message:string;details?:unknown};const r:ErrorState={message:e.message};if(typeof e.code==='string')r.code=e.code;if('details'in e)r.details=e.details;return r;}return {message:fallback};}
private publish(k:string,v:unknown):void{setState(k,v);} private required(v:unknown,label:string):boolean{if(v!==null&&v!==undefined&&String(v)!=='')return true;this.setLocalError(label);return false;} private setLocalError(m:string):void{const e:NonNullable<ErrorState>={message:m};this.stateCreateMovimentacaoEstoqueError=e;this.publish('ui.movimentacoes.createMovimentacaoEstoque.error',e);}
private buildNested<T extends object>(values:Array<[string,unknown]>):T{const r:Record<string,unknown>={};for(const [p,v] of values){if(v===null||v===undefined||v==='')continue;const a=p.split('.');let c:Record<string,unknown>=r;a.forEach((x,i)=>{if(i===a.length-1)c[x]=v;else{const q=c[x];if(!q||typeof q!=='object'||Array.isArray(q))c[x]={};c=c[x] as Record<string,unknown>;}});}return r as T;}
public setScenario(v:Scenary):void{if(v==='createMovimentacaoEstoque'&&!this.createPreconditions())return;this.scenary=v;this.publish('ui.movimentacoes.scenary',v);this.requestUpdate();} private createPreconditions():boolean{return this.required(this.stateCreateMovimentacaoEstoqueProdutoId,'Produto é obrigatório.')&&this.required(this.stateCreateMovimentacaoEstoqueMovimentadoEm,'Data e hora da movimentação são obrigatórias.')&&this.required(this.stateCreateMovimentacaoEstoqueDetailsTipo,'Tipo de movimentação é obrigatório.')&&this.required(this.stateCreateMovimentacaoEstoqueDetailsQuantidade,'Quantidade é obrigatória.');}
public setCreateMovimentacaoEstoqueMovimentadoEm(v:string|null):void{this.stateCreateMovimentacaoEstoqueMovimentadoEm=v;this.publish('ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm',v);} public setCreateMovimentacaoEstoqueDetailsTipo(v:Tipo|null):void{this.stateCreateMovimentacaoEstoqueDetailsTipo=v;this.publish('ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo',v);} public setCreateMovimentacaoEstoqueDetailsQuantidade(v:number|null):void{this.stateCreateMovimentacaoEstoqueDetailsQuantidade=v;this.publish('ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade',v);}
public setListMovimentacaoEstoqueId(v:string|null):void{this.stateListMovimentacaoEstoqueId=v;this.publish('ui.movimentacoes.listMovimentacaoEstoque.input.id',v);} public setListMovimentacaoEstoqueMovimentadoEm(v:string|null):void{this.stateListMovimentacaoEstoqueMovimentadoEm=v;this.publish('ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm',v);} public setListProdutoId(v:string|null):void{this.stateListProdutoId=v;this.publish('ui.movimentacoes.listProduto.input.id',v);} public setListProdutoDetailsIdentificationSubtype(v:ProdutoSubtype|null):void{this.stateListProdutoDetailsIdentificationSubtype=v;this.publish('ui.movimentacoes.listProduto.input.details.identification.subtype',v);} public setListProdutoDetailsIdentificationName(v:string|null):void{this.stateListProdutoDetailsIdentificationName=v;this.publish('ui.movimentacoes.listProduto.input.details.identification.name',v);} public setListProdutoDetailsIdentificationStatus(v:ProdutoStatus|null):void{this.stateListProdutoDetailsIdentificationStatus=v;this.publish('ui.movimentacoes.listProduto.input.details.identification.status',v);}
public selectCreateMovimentacaoEstoqueProdutoId(v:string|null):void{this.selectProduct(v,'create');} public selectListMovimentacaoEstoqueProdutoId(v:string|null):void{this.selectProduct(v,'list');} private selectProduct(v:string|null,t:'create'|'list'):void{if(v===null||v===''){if(t==='create'){this.stateCreateMovimentacaoEstoqueProdutoId=null;this.publish('ui.movimentacoes.createMovimentacaoEstoque.input.produtoId',null);}else{this.stateListMovimentacaoEstoqueProdutoId=null;this.publish('ui.movimentacoes.listMovimentacaoEstoque.input.produtoId',null);}return;}const row=this.stateListProdutoResult.find((x:ListProdutoOutput[number]):boolean=>x.id===v);if(!row){this.setLocalError('Selecione um produto presente na lista autorizada.');return;}if(t==='create'){this.stateCreateMovimentacaoEstoqueProdutoId=row.id;this.publish('ui.movimentacoes.createMovimentacaoEstoque.input.produtoId',row.id);}else{this.stateListMovimentacaoEstoqueProdutoId=row.id;this.publish('ui.movimentacoes.listMovimentacaoEstoque.input.produtoId',row.id);}}
public async runCreateMovimentacaoEstoque():Promise<void>{if(this.stateCreateMovimentacaoEstoqueStatus==='loading'||!this.createPreconditions())return;const input:CreateMovimentacaoEstoqueInput=this.buildNested([['produtoId',this.stateCreateMovimentacaoEstoqueProdutoId],['movimentadoEm',this.stateCreateMovimentacaoEstoqueMovimentadoEm],['details.tipo',this.stateCreateMovimentacaoEstoqueDetailsTipo],['details.quantidade',this.stateCreateMovimentacaoEstoqueDetailsQuantidade]]);this.stateCreateMovimentacaoEstoqueStatus='loading';this.stateCreateMovimentacaoEstoqueError=null;this.publish('ui.movimentacoes.createMovimentacaoEstoque.status','loading');this.publish('ui.movimentacoes.createMovimentacaoEstoque.error',null);try{const response=await runBlockingUiAction(()=>execBff<CreateMovimentacaoEstoqueOutput>(createMovimentacaoEstoqueRoute,input,{mode:'blocking'}),{mode:'blocking'});if(!response)throw new Error('A operação não retornou uma resposta.');if(response.ok&&response.data!==null){this.stateCreateMovimentacaoEstoqueResult=response.data;this.stateCreateMovimentacaoEstoqueStatus='success';this.publish('ui.movimentacoes.createMovimentacaoEstoque.result',response.data);this.publish('ui.movimentacoes.createMovimentacaoEstoque.status','success');await Promise.all([this.runListMovimentacaoEstoque(),this.runListProduto()]);}else{const fallback = response.error && typeof response.error === 'object' && 'message' in response.error && typeof response.error.message === 'string' ? response.error.message : 'Não foi possível registrar a movimentação.';const e=this.feedback(response.error,fallback);this.stateCreateMovimentacaoEstoqueError=e;this.stateCreateMovimentacaoEstoqueStatus='error';this.publish('ui.movimentacoes.createMovimentacaoEstoque.error',e);this.publish('ui.movimentacoes.createMovimentacaoEstoque.status','error');}}catch(e:unknown){const f=this.feedback(e,'Não foi possível registrar a movimentação.');this.stateCreateMovimentacaoEstoqueError=f;this.stateCreateMovimentacaoEstoqueStatus='error';this.publish('ui.movimentacoes.createMovimentacaoEstoque.error',f);this.publish('ui.movimentacoes.createMovimentacaoEstoque.status','error');}}
public async runListMovimentacaoEstoque():Promise<void>{this.stateListMovimentacaoEstoqueStatus='loading';this.stateListMovimentacaoEstoqueError=null;this.pageStatus='loading';this.publish('ui.movimentacoes.pageStatus','loading');const i:ListMovimentacaoEstoqueInput=this.buildNested([['id',this.stateListMovimentacaoEstoqueId],['produtoId',this.stateListMovimentacaoEstoqueProdutoId],['movimentadoEm',this.stateListMovimentacaoEstoqueMovimentadoEm],['page',this.stateListMovimentacaoEstoquePage]]);await this.query(listMovimentacaoEstoqueRoute,i,(d:ListMovimentacaoEstoqueOutput):void=>{this.stateListMovimentacaoEstoqueResult=d;this.publish('ui.movimentacoes.listMovimentacaoEstoque.result',d);},(e:ErrorState):void=>{this.stateListMovimentacaoEstoqueError=e;this.publish('ui.movimentacoes.listMovimentacaoEstoque.error',e);});}
public async runListProduto():Promise<void>{this.stateListProdutoStatus='loading';this.stateListProdutoError=null;const i:ListProdutoInput=this.buildNested([['id',this.stateListProdutoId],['details.identification.subtype',this.stateListProdutoDetailsIdentificationSubtype],['details.identification.name',this.stateListProdutoDetailsIdentificationName],['details.identification.status',this.stateListProdutoDetailsIdentificationStatus],['page',this.stateListProdutoPage]]);await this.query(listProdutoRoute,i,(d:ListProdutoOutput):void=>{this.stateListProdutoResult=d;this.publish('ui.movimentacoes.listProduto.result',d);},(e:ErrorState):void=>{this.stateListProdutoError=e;this.publish('ui.movimentacoes.listProduto.error',e);});}
private async query<T>(route:string,input:object,ok:(d:T)=>void,fail:(e:ErrorState)=>void):Promise<void>{try{const r=await execBff<T>(route,input,{mode:'silent'});if(r.ok&&r.data!==null){ok(r.data);this.pageStatus=Array.isArray(r.data)&&r.data.length===0?'empty':'success';}else{const e=this.feedback(r.error,'Não foi possível carregar os dados.');fail(e);this.pageStatus='error';}}catch(e:unknown){fail(this.feedback(e,'Não foi possível carregar os dados.'));this.pageStatus='error';}this.publish('ui.movimentacoes.pageStatus',this.pageStatus);}

  /** setter for state ui.movimentacoes.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'createMovimentacaoEstoque'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'createMovimentacaoEstoque' && ((this.stateCreateMovimentacaoEstoqueProdutoId == null || String(this.stateCreateMovimentacaoEstoqueProdutoId) === '') || (this.stateCreateMovimentacaoEstoqueMovimentadoEm == null || String(this.stateCreateMovimentacaoEstoqueMovimentadoEm) === '') || (this.stateCreateMovimentacaoEstoqueDetailsTipo == null || String(this.stateCreateMovimentacaoEstoqueDetailsTipo) === '') || (this.stateCreateMovimentacaoEstoqueDetailsQuantidade == null || String(this.stateCreateMovimentacaoEstoqueDetailsQuantidade) === ''))) next = 'base';
    this.scenary = next as typeof this.scenary;
    setState('ui.movimentacoes.scenary', next);
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
    const rawProdutoId: string = params.get('produtoId') || '';
    if (rawProdutoId) {
      if (this.stateCreateMovimentacaoEstoqueProdutoId == null || String(this.stateCreateMovimentacaoEstoqueProdutoId) === '') {
        this.stateCreateMovimentacaoEstoqueProdutoId = rawProdutoId;
        setState('ui.movimentacoes.createMovimentacaoEstoque.input.produtoId', rawProdutoId);
      }
    }
    const rawMovimentadoEm: string = params.get('movimentadoEm') || '';
    if (rawMovimentadoEm) {
      if (this.stateCreateMovimentacaoEstoqueMovimentadoEm == null || String(this.stateCreateMovimentacaoEstoqueMovimentadoEm) === '') {
        this.stateCreateMovimentacaoEstoqueMovimentadoEm = rawMovimentadoEm;
        setState('ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm', rawMovimentadoEm);
      }
    }
    const rawTipo: string = params.get('tipo') || '';
    if (rawTipo) {
      if (this.stateCreateMovimentacaoEstoqueDetailsTipo == null || String(this.stateCreateMovimentacaoEstoqueDetailsTipo) === '') {
        if (['entrada', 'saida'].includes(rawTipo)) {
          this.stateCreateMovimentacaoEstoqueDetailsTipo = rawTipo as typeof this.stateCreateMovimentacaoEstoqueDetailsTipo;
          setState('ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo', rawTipo);
        }
      }
    }
    const rawQuantidade: string = params.get('quantidade') || '';
    if (rawQuantidade) {
      if (this.stateCreateMovimentacaoEstoqueDetailsQuantidade == null || String(this.stateCreateMovimentacaoEstoqueDetailsQuantidade) === '') {
        const stateCreateMovimentacaoEstoqueDetailsQuantidadeNum = Number(rawQuantidade);
        if (Number.isFinite(stateCreateMovimentacaoEstoqueDetailsQuantidadeNum)) {
          this.stateCreateMovimentacaoEstoqueDetailsQuantidade = stateCreateMovimentacaoEstoqueDetailsQuantidadeNum as unknown as typeof this.stateCreateMovimentacaoEstoqueDetailsQuantidade;
          setState('ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade', stateCreateMovimentacaoEstoqueDetailsQuantidadeNum);
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

public enterBaseScenario():void{this.setScenario('base');} public enterCreateMovimentacaoEstoqueScenario():void{if(this.createPreconditions())this.setScenario('createMovimentacaoEstoque');}
public connectedCallback():void{super.connectedCallback();for(const k of stateKeys){const v:unknown=getState(k);if(v!==undefined)this.handleIcaStateChange(k,v);}subscribe(stateKeys,this);this.applyUrlScenary();void this.runListMovimentacaoEstoque();void this.runListProduto();} public disconnectedCallback():void{unsubscribe(stateKeys,this);super.disconnectedCallback();}
public handleIcaStateChange(key:string,value:any):void{if(value===undefined)return;const m:Record<string,string>={'ui.movimentacoes.pageStatus':'pageStatus','ui.movimentacoes.scenary':'scenary','ui.movimentacoes.createMovimentacaoEstoque.input.produtoId':'stateCreateMovimentacaoEstoqueProdutoId','ui.movimentacoes.createMovimentacaoEstoque.input.movimentadoEm':'stateCreateMovimentacaoEstoqueMovimentadoEm','ui.movimentacoes.createMovimentacaoEstoque.input.details.tipo':'stateCreateMovimentacaoEstoqueDetailsTipo','ui.movimentacoes.createMovimentacaoEstoque.input.details.quantidade':'stateCreateMovimentacaoEstoqueDetailsQuantidade','ui.movimentacoes.createMovimentacaoEstoque.status':'stateCreateMovimentacaoEstoqueStatus','ui.movimentacoes.createMovimentacaoEstoque.error':'stateCreateMovimentacaoEstoqueError','ui.movimentacoes.createMovimentacaoEstoque.result':'stateCreateMovimentacaoEstoqueResult','ui.movimentacoes.listMovimentacaoEstoque.input.id':'stateListMovimentacaoEstoqueId','ui.movimentacoes.listMovimentacaoEstoque.input.produtoId':'stateListMovimentacaoEstoqueProdutoId','ui.movimentacoes.listMovimentacaoEstoque.input.movimentadoEm':'stateListMovimentacaoEstoqueMovimentadoEm','ui.movimentacoes.listMovimentacaoEstoque.input.page':'stateListMovimentacaoEstoquePage','ui.movimentacoes.listMovimentacaoEstoque.status':'stateListMovimentacaoEstoqueStatus','ui.movimentacoes.listMovimentacaoEstoque.error':'stateListMovimentacaoEstoqueError','ui.movimentacoes.listMovimentacaoEstoque.result':'stateListMovimentacaoEstoqueResult','ui.movimentacoes.listProduto.input.id':'stateListProdutoId','ui.movimentacoes.listProduto.input.details.identification.subtype':'stateListProdutoDetailsIdentificationSubtype','ui.movimentacoes.listProduto.input.details.identification.name':'stateListProdutoDetailsIdentificationName','ui.movimentacoes.listProduto.input.details.identification.status':'stateListProdutoDetailsIdentificationStatus','ui.movimentacoes.listProduto.input.page':'stateListProdutoPage','ui.movimentacoes.listProduto.status':'stateListProdutoStatus','ui.movimentacoes.listProduto.error':'stateListProdutoError','ui.movimentacoes.listProduto.result':'stateListProdutoResult'};const member=m[key];if(member)(this as unknown as Record<string,unknown>)[member]=value;this.requestUpdate();}
}
export { MovimentacoesShared as ControleEstoqueMovimentacoesBase };