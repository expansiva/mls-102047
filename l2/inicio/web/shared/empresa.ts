/// <mls fileReference="_102047_/l2/inicio/web/shared/empresa.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { EmpresaContracts, EmpresaPreparo, ContatoEmpresaResumo } from '/_102047_/l2/inicio/web/contracts/empresa.defs.js';
export type { EmpresaContracts, EmpresaPreparo, ContatoEmpresaResumo } from '/_102047_/l2/inicio/web/contracts/empresa.defs.js';
type Input<R extends keyof EmpresaContracts> = EmpresaContracts[R]['input'];
type Output<R extends keyof EmpresaContracts> = EmpresaContracts[R]['output'];
export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type DocType = NonNullable<EmpresaPreparo['details']['identification']['docType']>;
/** Form draft of cmdSalvarDadosEmpresa: only the data the platform still lacks; id and version come from the loaded empresa. */
export type CmdSalvarDadosEmpresaDraft = {
details: {
identification: {
name: string | null;
docType: DocType | null;
docId: string | null;
countryCode: string | null;
};
company: {
legalName: string | null;
tradeName: string | null;
};
base: {
addresses: string[] | null;
};
};
};
export function emptyCmdSalvarDadosEmpresaDraft(): CmdSalvarDadosEmpresaDraft {
return {
details: {
identification: { name: null, docType: null, docId: null, countryCode: null },
company: { legalName: null, tradeName: null },
base: { addresses: null },
},
};
}
type StateMember =
| 'empresa'
| 'empresaId'
| 'cmdSalvarDadosEmpresaDraft'
| 'pageStatus'
| 'qryEmpresaPreparoStatus'
| 'qryEmpresaPreparoError'
| 'cmdSalvarDadosEmpresaStatus'
| 'cmdSalvarDadosEmpresaError'
| 'scenary';
const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
'ui.inicio.empresa.empresa': 'empresa',
'ui.inicio.empresa.empresaId': 'empresaId',
'ui.inicio.empresa.cmdSalvarDadosEmpresaDraft': 'cmdSalvarDadosEmpresaDraft',
'ui.inicio.empresa.pageStatus': 'pageStatus',
'ui.inicio.empresa.qryEmpresaPreparoStatus': 'qryEmpresaPreparoStatus',
'ui.inicio.empresa.qryEmpresaPreparoError': 'qryEmpresaPreparoError',
'ui.inicio.empresa.cmdSalvarDadosEmpresaStatus': 'cmdSalvarDadosEmpresaStatus',
'ui.inicio.empresa.cmdSalvarDadosEmpresaError': 'cmdSalvarDadosEmpresaError',
'ui.inicio.empresa.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
function isFilled(value: string | null): value is string {
return value !== null && value !== '';
}
export class InicioEmpresaShared extends StateLitElement {
/** state empresa — company that owns the app with its registered data, linked contacts, the prepared indicator and the mandatory data still missing; source qryEmpresaPreparo.empresa; organism acoesEmpresa, boasVindasEmpresa, completarDadosEmpresa, dadosFaltantesEmpresa */
@property({ attribute: false }) empresa: EmpresaPreparo | null = null;
/** state empresaId — id of the company received as entry param (the selection of the company shown; the record itself is in empresa); source entry.params.empresaId; organism boasVindasEmpresa; persisted */
@property({ attribute: false }) empresaId: string | null = null;
/** state cmdSalvarDadosEmpresaDraft — form draft of the data the company still lacks (name, document type and number, country, legal name, trade name, addresses); source cmdSalvarDadosEmpresa.input; organism completarDadosEmpresa */
@property({ attribute: false }) cmdSalvarDadosEmpresaDraft: CmdSalvarDadosEmpresaDraft = emptyCmdSalvarDadosEmpresaDraft();
/** state pageStatus — overall status of the page load: idle, loading, empty, success or error; source derived from qryEmpresaPreparo */
@property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';
/** state qryEmpresaPreparoStatus — status of the company load: idle, loading, success or error; source qryEmpresaPreparo */
@property({ attribute: false }) qryEmpresaPreparoStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state qryEmpresaPreparoError — error of the company load (code, message, details) or null; source qryEmpresaPreparo */
@property({ attribute: false }) qryEmpresaPreparoError: ErrorState = null;
/** state cmdSalvarDadosEmpresaStatus — status of saving the company data: idle, loading, success or error; source cmdSalvarDadosEmpresa */
@property({ attribute: false }) cmdSalvarDadosEmpresaStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state cmdSalvarDadosEmpresaError — error of saving the company data (code, message, details) or null; source cmdSalvarDadosEmpresa */
@property({ attribute: false }) cmdSalvarDadosEmpresaError: ErrorState = null;
/** state scenary — the visible scene of the page; '' until the page shows its first scene */
@property({ attribute: false }) scenary = '';
private publish<M extends StateMember>(member: M, value: this[M]): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(`ui.inicio.empresa.${member}`, value);
if (member === 'empresaId') {
try {
if (value === null) {
localStorage.removeItem('inicio.empresa.empresaId');
} else {
localStorage.setItem('inicio.empresa.empresaId', String(value));
}
} catch {
// storage unavailable: nothing to persist
}
}
}
private assignState(key: string, value: unknown): void {
const member = STATE_MEMBER_BY_KEY[key];
if (member) (this as unknown as Record<string, unknown>)[member] = value;
}
public connectedCallback(): void {
super.connectedCallback();
const empresa = getState('ui.inicio.empresa.empresa');
if (empresa !== undefined) this.assignState('ui.inicio.empresa.empresa', empresa);
this.resetVisit();
subscribe([...STATE_KEYS], this);
this.applyEntryParams();
void this.updateComplete.then(() => this.qryEmpresaPreparo());
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
private resetVisit(): void {
this.publish('pageStatus', 'idle');
this.publish('qryEmpresaPreparoStatus', 'idle');
this.publish('qryEmpresaPreparoError', null);
this.publish('cmdSalvarDadosEmpresaStatus', 'idle');
this.publish('cmdSalvarDadosEmpresaError', null);
this.publish('cmdSalvarDadosEmpresaDraft', emptyCmdSalvarDadosEmpresaDraft());
this.publish('scenary', '');
}
private resetCommandResults(): void {
this.publish('cmdSalvarDadosEmpresaStatus', 'idle');
this.publish('cmdSalvarDadosEmpresaError', null);
}
private readParam(name: string): string | null {
const fromUrl = new URLSearchParams(window.location.search).get(name);
if (fromUrl !== null && fromUrl !== '') return fromUrl;
try {
const stored = localStorage.getItem(`inicio.empresa.${name}`);
if (stored !== null && stored !== '') return stored;
} catch {
// storage unavailable
}
return null;
}
private applyEntryParams(): void {
const empresaId = this.readParam('empresaId');
this.publish('empresaId', empresaId);
const docId = this.readParam('docId');
if (docId !== null) {
const draft = emptyCmdSalvarDadosEmpresaDraft();
draft.details.identification.docId = docId;
this.publish('cmdSalvarDadosEmpresaDraft', draft);
}
}
/** scene — publishes the visible scene of the page (a free scene id chosen by the page); clears the old result of the save command */
public setScenario(value: string): void {
this.resetCommandResults();
this.publish('scenary', value);
}
/** draft — replaces the form draft of the company data to save (fill only the data the company still lacks); clears the old result of the save command */
public setCmdSalvarDadosEmpresaDraft(value: CmdSalvarDadosEmpresaDraft): void {
this.resetCommandResults();
this.publish('cmdSalvarDadosEmpresaDraft', value);
}
/** request qryEmpresaPreparo — loads at once the company of the logged-in responsible (resolved by the session) with registered data, linked contacts, the prepared indicator and the missing mandatory data; redraws empresa (replace); no arguments, also the method to reload the page */
public async qryEmpresaPreparo(): Promise<void> {
if (this.qryEmpresaPreparoStatus === 'loading') return;
this.publish('qryEmpresaPreparoStatus', 'loading');
this.publish('qryEmpresaPreparoError', null);
this.publish('pageStatus', 'loading');
try {
const input: Input<'inicio.empresa.qryEmpresaPreparo'> = {};
const response = await execBff<Output<'inicio.empresa.qryEmpresaPreparo'>>('inicio.empresa.qryEmpresaPreparo', input, { mode: 'silent' });
if (!response.ok || !response.data) {
this.publish('qryEmpresaPreparoError', response.error);
this.publish('qryEmpresaPreparoStatus', 'error');
this.publish('pageStatus', 'error');
return;
}
this.publish('empresa', response.data.empresa);
this.publish('qryEmpresaPreparoStatus', 'success');
this.publish('pageStatus', 'success');
} catch (error) {
this.publish('qryEmpresaPreparoError', {
code: 'client.unexpected',
message: '',
details: { name: error instanceof Error ? error.name : 'unknown' },
});
this.publish('qryEmpresaPreparoStatus', 'error');
this.publish('pageStatus', 'error');
}
}
/** request cmdSalvarDadosEmpresa — saves into the company the mandatory data it lacked, taken from cmdSalvarDadosEmpresaDraft (only filled fields are sent) with the id and version of the loaded empresa; redraws empresa (replace, with the new version, prepared indicator and remaining missing data) and clears the draft; no arguments; called by the salvarDadosEmpresa intent */
public async cmdSalvarDadosEmpresa(): Promise<void> {
if (this.cmdSalvarDadosEmpresaStatus === 'loading') return;
const empresa = this.empresa;
if (!empresa) {
this.publish('cmdSalvarDadosEmpresaError', {
code: 'client.requiredMissing',
message: '',
details: { stateKeys: ['ui.inicio.empresa.empresa'] },
});
this.publish('cmdSalvarDadosEmpresaStatus', 'error');
return;
}
const draft = this.cmdSalvarDadosEmpresaDraft;
const identification: Input<'inicio.empresa.cmdSalvarDadosEmpresa'>['details']['identification'] = {
...(isFilled(draft.details.identification.name) ? { name: draft.details.identification.name } : {}),
...(draft.details.identification.docType !== null ? { docType: draft.details.identification.docType } : {}),
...(isFilled(draft.details.identification.docId) ? { docId: draft.details.identification.docId } : {}),
...(isFilled(draft.details.identification.countryCode) ? { countryCode: draft.details.identification.countryCode } : {}),
};
const company: Input<'inicio.empresa.cmdSalvarDadosEmpresa'>['details']['company'] = {
...(isFilled(draft.details.company.legalName) ? { legalName: draft.details.company.legalName } : {}),
...(isFilled(draft.details.company.tradeName) ? { tradeName: draft.details.company.tradeName } : {}),
};
const addresses = draft.details.base.addresses;
const base: Input<'inicio.empresa.cmdSalvarDadosEmpresa'>['details']['base'] = {
...(addresses !== null && addresses.length > 0 ? { addresses } : {}),
};
if (Object.keys(identification).length === 0 && Object.keys(company).length === 0 && Object.keys(base).length === 0) {
this.publish('cmdSalvarDadosEmpresaError', {
code: 'client.requiredMissing',
message: '',
details: { stateKeys: ['ui.inicio.empresa.cmdSalvarDadosEmpresaDraft'] },
});
this.publish('cmdSalvarDadosEmpresaStatus', 'error');
return;
}
const input: Input<'inicio.empresa.cmdSalvarDadosEmpresa'> = {
id: empresa.id,
version: empresa.version,
details: { identification, company, base },
};
this.publish('cmdSalvarDadosEmpresaStatus', 'loading');
this.publish('cmdSalvarDadosEmpresaError', null);
try {
const response = await runBlockingUiAction(signal =>
execBff<Output<'inicio.empresa.cmdSalvarDadosEmpresa'>>('inicio.empresa.cmdSalvarDadosEmpresa', input, { mode: 'blocking', signal }),
);
if (response === undefined) {
this.publish('cmdSalvarDadosEmpresaError', {
code: 'client.unexpected',
message: '',
details: { name: 'aborted' },
});
this.publish('cmdSalvarDadosEmpresaStatus', 'error');
return;
}
if (!response.ok || !response.data) {
this.publish('cmdSalvarDadosEmpresaError', response.error);
this.publish('cmdSalvarDadosEmpresaStatus', 'error');
return;
}
this.publish('empresa', response.data.empresa);
this.publish('cmdSalvarDadosEmpresaDraft', emptyCmdSalvarDadosEmpresaDraft());
this.publish('cmdSalvarDadosEmpresaStatus', 'success');
} catch (error) {
this.publish('cmdSalvarDadosEmpresaError', {
code: 'client.unexpected',
message: '',
details: { name: error instanceof Error ? error.name : 'unknown' },
});
this.publish('cmdSalvarDadosEmpresaStatus', 'error');
}
}
/** navigate — opens the people of the organization page (/inicio/pessoas_organizacao) carrying the company id (empresaId); refuses with client.preconditionMissing in qryEmpresaPreparoError when no company id is known; no arguments */
public verPessoasOrganizacao(): void {
const empresaId = this.empresa ? this.empresa.id : this.empresaId;
if (empresaId === null || empresaId === '') {
this.publish('qryEmpresaPreparoError', {
code: 'client.preconditionMissing',
message: '',
details: { params: ['empresaId'] },
});
return;
}
auraNavigate(`/inicio/pessoas_organizacao?empresaId=${encodeURIComponent(empresaId)}`, { basePath: '/inicio' });
}
}
