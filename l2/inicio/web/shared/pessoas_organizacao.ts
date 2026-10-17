/// <mls fileReference="_102047_/l2/inicio/web/shared/pessoas_organizacao.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { Pessoas_organizacaoContracts, EmpresaPreparo, PessoaDetalhe } from '/_102047_/l2/inicio/web/contracts/pessoas_organizacao.defs.js';
export type { Pessoas_organizacaoContracts, EmpresaPreparo, PessoaResumo, ContatoPessoa, PessoaDetalhe } from '/_102047_/l2/inicio/web/contracts/pessoas_organizacao.defs.js';
type Input<R extends keyof Pessoas_organizacaoContracts> = Pessoas_organizacaoContracts[R]['input'];
type Output<R extends keyof Pessoas_organizacaoContracts> = Pessoas_organizacaoContracts[R]['output'];
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type PessoasPage = Output<'inicio.pessoas_organizacao.buscarPessoas'>['pessoas'];
export type SituacaoFiltro = 'todas' | 'acessoIncompleto' | 'aguardandoLiberacao';
export type BuscarPessoasOptions = {
busca?: string;
situacao?: SituacaoFiltro;
page?: number;
append?: boolean;
};
type StateMember =
| 'pessoas'
| 'pessoa'
| 'empresa'
| 'selectedPessoaOrganizacao'
| 'selectedEmpresaId'
| 'filtroBusca'
| 'filtroSituacao'
| 'pageStatus'
| 'abrirPessoasOrganizacaoStatus'
| 'abrirPessoasOrganizacaoError'
| 'buscarPessoasStatus'
| 'buscarPessoasError'
| 'obterPessoaStatus'
| 'obterPessoaError'
| 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.inicio.pessoas_organizacao.pessoas': 'pessoas',
'ui.inicio.pessoas_organizacao.pessoa': 'pessoa',
'ui.inicio.pessoas_organizacao.empresa': 'empresa',
'ui.inicio.pessoas_organizacao.selectedPessoaOrganizacao': 'selectedPessoaOrganizacao',
'ui.inicio.pessoas_organizacao.selectedEmpresaId': 'selectedEmpresaId',
'ui.inicio.pessoas_organizacao.filtroBusca': 'filtroBusca',
'ui.inicio.pessoas_organizacao.filtroSituacao': 'filtroSituacao',
'ui.inicio.pessoas_organizacao.pageStatus': 'pageStatus',
'ui.inicio.pessoas_organizacao.abrirPessoasOrganizacaoStatus': 'abrirPessoasOrganizacaoStatus',
'ui.inicio.pessoas_organizacao.abrirPessoasOrganizacaoError': 'abrirPessoasOrganizacaoError',
'ui.inicio.pessoas_organizacao.buscarPessoasStatus': 'buscarPessoasStatus',
'ui.inicio.pessoas_organizacao.buscarPessoasError': 'buscarPessoasError',
'ui.inicio.pessoas_organizacao.obterPessoaStatus': 'obterPessoaStatus',
'ui.inicio.pessoas_organizacao.obterPessoaError': 'obterPessoaError',
'ui.inicio.pessoas_organizacao.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const PAGE_SIZE = 20;
function emptyPessoasPage(): PessoasPage {
return { items: [], page: 1, pageSize: PAGE_SIZE, hasMore: false };
}
function unexpectedError(error: unknown): ErrorState {
const name = error instanceof Error ? error.name : 'unknown';
return { code: 'client.unexpected', message: '', details: { name } };
}
export class InicioPessoas_organizacaoShared extends StateLitElement {
/** state pessoas — the page of people of the organization in summary form: name, country, platform status and access status; source abrirPessoasOrganizacao.pessoas; organism listaPessoas */
@property({ attribute: false }) pessoas: PessoasPage = emptyPessoasPage();
/** state pessoa — the selected person of the organization with data, contacts, access status, what is missing, consent requirement and access release stage; source obterPessoa.pessoa; organisms acoesLiberacao, andamentoLiberacao, detalhePessoa */
@property({ attribute: false }) pessoa: PessoaDetalhe | null = null;
/** state empresa — preparation status of the company that owns the app: whether it is prepared and which required data is still missing; source abrirPessoasOrganizacao.empresa; organism acoesLiberacao */
@property({ attribute: false }) empresa: EmpresaPreparo | null = null;
/** state selectedPessoaOrganizacao — the id of the PessoaOrganizacao selected in listaPessoas; source entry.params.pessoaOrganizacaoId; organisms detalhePessoa, listaPessoas; persisted */
@property({ attribute: false }) selectedPessoaOrganizacao: string | null = null;
/** state selectedEmpresaId — the id of the company received as entry param, carried to the company preparation page; source entry.params.empresaId; organism acoesLiberacao; persisted */
@property({ attribute: false }) selectedEmpresaId: string | null = null;
/** state filtroBusca — the name fragment currently used to search people; '' means no search; source buscarPessoas.input; organism listaPessoas */
@property({ attribute: false }) filtroBusca = '';
/** state filtroSituacao — the access situation filter currently applied to the people list ('todas', 'acessoIncompleto' or 'aguardandoLiberacao'); source buscarPessoas.input; organism listaPessoas */
@property({ attribute: false }) filtroSituacao: SituacaoFiltro = 'todas';
/** state pageStatus — overall status of the page: loading while the initial load runs, error if it failed, empty when the people list is empty, success otherwise */
@property({ attribute: false }) pageStatus: PageStatus = 'idle';
/** state abrirPessoasOrganizacaoStatus — status of the initial load request (company preparation and first page of people) */
@property({ attribute: false }) abrirPessoasOrganizacaoStatus: RequestStatus = 'idle';
/** state abrirPessoasOrganizacaoError — error of the initial load request, null when there is none */
@property({ attribute: false }) abrirPessoasOrganizacaoError: ErrorState = null;
/** state buscarPessoasStatus — status of the people search/filter request */
@property({ attribute: false }) buscarPessoasStatus: RequestStatus = 'idle';
/** state buscarPessoasError — error of the people search/filter request, null when there is none */
@property({ attribute: false }) buscarPessoasError: ErrorState = null;
/** state obterPessoaStatus — status of the request that reads the selected person */
@property({ attribute: false }) obterPessoaStatus: RequestStatus = 'idle';
/** state obterPessoaError — error of the request that reads the selected person, null when there is none */
@property({ attribute: false }) obterPessoaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private subscribed = false;
private obterPessoaSeq = 0;
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.inicio.pessoas_organizacao.${member}`, value);
if (member === 'selectedPessoaOrganizacao' || member === 'selectedEmpresaId') {
const storageKey = member === 'selectedPessoaOrganizacao' ? 'inicio.pessoas_organizacao.pessoaOrganizacaoId' : 'inicio.pessoas_organizacao.empresaId';
try {
if (value === null || value === undefined) {
localStorage.removeItem(storageKey);
} else {
localStorage.setItem(storageKey, String(value));
}
} catch {
// storage unavailable: the value stays in memory only
}
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) (this as unknown as Record<string, unknown>)[member] = value;
}
public connectedCallback(): void {
super.connectedCallback();
this.hydrateData();
this.resetVisit();
if (!this.subscribed) {
subscribe([...STATE_KEYS], this);
this.subscribed = true;
}
this.applyEntryParams();
void this.abrirPessoasOrganizacao();
if (this.selectedPessoaOrganizacao !== null) {
void this.obterPessoa(this.selectedPessoaOrganizacao);
}
}
public disconnectedCallback(): void {
if (this.subscribed) {
unsubscribe([...STATE_KEYS], this);
this.subscribed = false;
}
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
private hydrateData(): void {
const pessoas = getState('ui.inicio.pessoas_organizacao.pessoas');
if (pessoas !== undefined) this.assignState('ui.inicio.pessoas_organizacao.pessoas', pessoas);
const pessoa = getState('ui.inicio.pessoas_organizacao.pessoa');
if (pessoa !== undefined) this.assignState('ui.inicio.pessoas_organizacao.pessoa', pessoa);
const empresa = getState('ui.inicio.pessoas_organizacao.empresa');
if (empresa !== undefined) this.assignState('ui.inicio.pessoas_organizacao.empresa', empresa);
}
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('abrirPessoasOrganizacaoStatus', 'idle');
this.publish('abrirPessoasOrganizacaoError', null);
this.publish('buscarPessoasStatus', 'idle');
this.publish('buscarPessoasError', null);
this.publish('obterPessoaStatus', 'idle');
this.publish('obterPessoaError', null);
this.publish('filtroBusca', '');
this.publish('filtroSituacao', 'todas');
this.publish('scenary', '');
}
private readEntryParam(name: string): string | null {
try {
const search = typeof window !== 'undefined' && window.location ? window.location.search : '';
const fromUrl = new URLSearchParams(search).get(name);
if (fromUrl !== null && fromUrl !== '') return fromUrl;
} catch {
// url unavailable
}
try {
const stored = localStorage.getItem(`inicio.pessoas_organizacao.${name}`);
if (stored !== null && stored !== '') return stored;
} catch {
// storage unavailable
}
return null;
}
private applyEntryParams(): void {
this.publish('selectedEmpresaId', this.readEntryParam('empresaId'));
const pessoaId = this.readEntryParam('pessoaOrganizacaoId');
this.publish('selectedPessoaOrganizacao', pessoaId);
if (pessoaId === null) {
this.publish('pessoa', null);
}
}
/** setScenario — publishes the visible scene of the page (scenary) */
public setScenario(value: string): void {
this.publish('scenary', value);
}
/** request abrirPessoasOrganizacao — initial load: the company preparation status and a page of the people of the organization; redraws empresa (replace) and pessoas (replace, or append when append is true; a fresh load also resets the search and situation filters); page: page to load (default 1); append: add the page to the loaded items (load more) instead of replacing them */
public async abrirPessoasOrganizacao(page = 1, append = false): Promise<void> {
if (this.abrirPessoasOrganizacaoStatus === 'loading') return;
if (append && !this.pessoas.hasMore) return;
this.publish('abrirPessoasOrganizacaoStatus', 'loading');
this.publish('abrirPessoasOrganizacaoError', null);
this.publish('pageStatus', 'loading');
const input: Input<'inicio.pessoas_organizacao.abrirPessoasOrganizacao'> = { page, pageSize: PAGE_SIZE };
try {
const response = await execBff<Output<'inicio.pessoas_organizacao.abrirPessoasOrganizacao'>>('inicio.pessoas_organizacao.abrirPessoasOrganizacao', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('abrirPessoasOrganizacaoError', response.error ?? unexpectedError(null));
this.publish('abrirPessoasOrganizacaoStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
const output = response.data;
const nextPage: PessoasPage = append ? { ...output.pessoas, items: [...this.pessoas.items, ...output.pessoas.items] } : output.pessoas;
this.publish('empresa', output.empresa);
this.publish('pessoas', nextPage);
if (!append) {
this.publish('filtroBusca', '');
this.publish('filtroSituacao', 'todas');
}
this.publish('abrirPessoasOrganizacaoStatus', 'success');
this.publish('pageStatus', nextPage.items.length === 0 ? 'empty' : 'success');
} catch (error) {
this.publish('abrirPessoasOrganizacaoError', unexpectedError(error));
this.publish('abrirPessoasOrganizacaoStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** request buscarPessoas — searches the people by name and filters by access situation, paged; redraws pessoas (replace, or append when append is true) and keeps the filters in filtroBusca and filtroSituacao; options.busca: name fragment (omit to keep the current one, '' clears); options.situacao: 'todas' | 'acessoIncompleto' | 'aguardandoLiberacao' (omit to keep the current one); options.page: page to load (default 1, or the next page when appending); options.append: add the page to the loaded items (load more) instead of replacing them */
public async buscarPessoas(options: BuscarPessoasOptions = {}): Promise<void> {
if (this.buscarPessoasStatus === 'loading') return;
const append = options.append === true;
if (append && !this.pessoas.hasMore) return;
const busca = options.busca !== undefined ? options.busca : this.filtroBusca;
const situacao = options.situacao !== undefined ? options.situacao : this.filtroSituacao;
const page = options.page !== undefined ? options.page : append ? this.pessoas.page + 1 : 1;
this.publish('buscarPessoasStatus', 'loading');
this.publish('buscarPessoasError', null);
this.publish('filtroBusca', busca);
this.publish('filtroSituacao', situacao);
const input: Input<'inicio.pessoas_organizacao.buscarPessoas'> = {
...(busca.trim() !== '' ? { busca: busca.trim() } : {}),
situacao,
page,
pageSize: PAGE_SIZE,
};
try {
const response = await execBff<Output<'inicio.pessoas_organizacao.buscarPessoas'>>('inicio.pessoas_organizacao.buscarPessoas', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('buscarPessoasError', response.error ?? unexpectedError(null));
this.publish('buscarPessoasStatus', 'error');
return;
}
const output = response.data;
const nextPage: PessoasPage = append ? { ...output.pessoas, items: [...this.pessoas.items, ...output.pessoas.items] } : output.pessoas;
this.publish('pessoas', nextPage);
this.publish('buscarPessoasStatus', 'success');
} catch (error) {
this.publish('buscarPessoasError', unexpectedError(error));
this.publish('buscarPessoasStatus', 'error');
}
}
/** request obterPessoa — reads the person with everything that explains the access situation and the release stage; redraws pessoa (replace); the latest call wins; pessoaId: id of the person to read */
public async obterPessoa(pessoaId: string): Promise<void> {
if (pessoaId === '') {
this.publish('obterPessoaError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['selectedPessoaOrganizacao'] } });
this.publish('obterPessoaStatus', 'error');
return;
}
this.obterPessoaSeq += 1;
const seq = this.obterPessoaSeq;
this.publish('obterPessoaStatus', 'loading');
this.publish('obterPessoaError', null);
const input: Input<'inicio.pessoas_organizacao.obterPessoa'> = { pessoaId };
try {
const response = await execBff<Output<'inicio.pessoas_organizacao.obterPessoa'>>('inicio.pessoas_organizacao.obterPessoa', input, { mode: 'silent' });
if (seq !== this.obterPessoaSeq) return;
if (!response.ok || !response.data) {
this.publish('obterPessoaError', response.error ?? unexpectedError(null));
this.publish('obterPessoaStatus', 'error');
return;
}
this.publish('pessoa', response.data.pessoa);
this.publish('obterPessoaStatus', 'success');
} catch (error) {
if (seq !== this.obterPessoaSeq) return;
this.publish('obterPessoaError', unexpectedError(error));
this.publish('obterPessoaStatus', 'error');
}
}
/** select — selects the person shown in detalhePessoa/andamentoLiberacao by id (null clears the selection and the loaded person); a non-null id reads the person through obterPessoa */
public async selectPessoaOrganizacao(id: string | null): Promise<void> {
this.publish('selectedPessoaOrganizacao', id);
if (id === null) {
this.obterPessoaSeq += 1;
this.publish('pessoa', null);
this.publish('obterPessoaStatus', 'idle');
this.publish('obterPessoaError', null);
return;
}
await this.obterPessoa(id);
}
/** irPrepararEmpresa — navigates to the company preparation page (empresa), carrying the company id; refuses with client.preconditionMissing in abrirPessoasOrganizacaoError when no company id is known */
public irPrepararEmpresa(): void {
const empresaId = this.empresa !== null ? this.empresa.id : this.selectedEmpresaId;
if (empresaId === null || empresaId === '') {
this.publish('abrirPessoasOrganizacaoError', { code: 'client.preconditionMissing', message: '', details: { params: ['empresaId'] } });
return;
}
auraNavigate(`/inicio/empresa?empresaId=${encodeURIComponent(empresaId)}`, { basePath: '/inicio' });
}
/** irInicio — navigates to the responsible's start page (inicio_responsavel), carrying the selected person id; refuses with client.preconditionMissing in abrirPessoasOrganizacaoError when no person is selected */
public irInicio(): void {
const pessoaId = this.selectedPessoaOrganizacao;
if (pessoaId === null || pessoaId === '') {
this.publish('abrirPessoasOrganizacaoError', { code: 'client.preconditionMissing', message: '', details: { params: ['pessoaOrganizacaoId'] } });
return;
}
auraNavigate(`/inicio/inicio_responsavel?pessoaOrganizacaoId=${encodeURIComponent(pessoaId)}`, { basePath: '/inicio' });
}
}
