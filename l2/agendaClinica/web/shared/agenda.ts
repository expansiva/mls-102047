/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/agenda.ts" enhancement="_102020_/l2/enhancementAura"/>

import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { registrarAtendimentoRoute, listConsultaRoute } from '../contracts/agenda.defs.js';
import type {
RegistrarAtendimentoInput,
RegistrarAtendimentoOutput,
ListConsultaInput,
ListConsultaOutput,
ListConsultaItem,
} from '../contracts/agenda.defs.js';
type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type Scenario = 'base' | 'registrarAtendimento';
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
type ConsultaStatus = 'scheduled' | 'noShow' | 'attended';
type ErrorEnvelope = { code: string; message: string; details?: unknown };
type OperationBinding = {
actorRef: string;
grantRefs: readonly string[];
authorities: readonly string[];
transition?: unknown;
ruleRefs: readonly unknown[];
sourceHashes: readonly string[];
};
const operationBindings: Readonly<Record<string, OperationBinding>> = {
listConsulta: {
actorRef: 'profissional',
grantRefs: ['profissionalAgendaPropria'],
authorities: ['profissional'],
ruleRefs: [],
sourceHashes: [
'l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552',
'l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b',
'l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe',
],
},
registrarAtendimento: {
actorRef: 'profissional',
grantRefs: ['profissionalAgendaPropria'],
authorities: ['profissional'],
transition: {
transitionId: 'registrarAtendimento',
from: ['scheduled'],
to: 'attended',
by: ['profissional'],
payload: ['details.attendanceNote'],
},
ruleRefs: [
{ ruleId: 'consultaSomenteAgendadaPodeRegistrarAtendimento', file: 'l4/agendaClinica/rules.defs.ts', symbol: 'rules.consultaSomenteAgendadaPodeRegistrarAtendimento' },
{ ruleId: 'anotacaoObrigatoriaNoAtendimento', file: 'l4/agendaClinica/rules.defs.ts', symbol: 'rules.anotacaoObrigatoriaNoAtendimento' },
{ ruleId: 'profissionalAtendeSomentePropriaConsulta', file: 'l4/agendaClinica/rules.defs.ts', symbol: 'rules.profissionalAtendeSomentePropriaConsulta' },
],
sourceHashes: [
'l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552',
'l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b',
'l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe',
],
},
};
export class AgendaShared extends StateLitElement {
public pageStatus: PageStatus = 'idle';
public scenary: Scenario = 'base';
public stateRegistrarAtendimentoId: string | null = null;
public stateRegistrarAtendimentoDetailsAttendanceNote: string | null = null;
public stateRegistrarAtendimentoStatus: ActionStatus = 'idle';
public stateRegistrarAtendimentoError: ErrorEnvelope | null = null;
public stateRegistrarAtendimentoResult: RegistrarAtendimentoOutput | null = null;
public stateListConsultaId: string | null = null;
public stateListConsultaPacienteId: string | null = null;
public stateListConsultaProfissionalId: string | null = null;
public stateListConsultaScheduledAt: string | null = null;
public stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073: ConsultaStatus | null = null;
public stateListConsultaPage: number | null = null;
public stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e000073000074000061000074000075000073: ActionStatus = 'idle';
public stateListConsultaError: ErrorEnvelope | null = null;
public stateListConsultaResult: ListConsultaOutput = [];
private readonly subscribedStateKeys = [
'ui.agenda.pageStatus', 'ui.agenda.scenary', 'ui.agenda.registrarAtendimento.input.id',
'ui.agenda.registrarAtendimento.input.details.attendanceNote', 'ui.agenda.registrarAtendimento.status',
'ui.agenda.registrarAtendimento.error', 'ui.agenda.registrarAtendimento.result', 'ui.agenda.listConsulta.input.id',
'ui.agenda.listConsulta.input.pacienteId', 'ui.agenda.listConsulta.input.profissionalId', 'ui.agenda.listConsulta.input.scheduledAt',
'ui.agenda.listConsulta.input.status', 'ui.agenda.listConsulta.input.page', 'ui.agenda.listConsulta.status',
'ui.agenda.listConsulta.error', 'ui.agenda.listConsulta.result',
] as const;
private readonly statePropertyByKey: Readonly<Record<string, string>> = {
'ui.agenda.pageStatus': 'pageStatus', 'ui.agenda.scenary': 'scenary',
'ui.agenda.registrarAtendimento.input.id': 'stateRegistrarAtendimentoId',
'ui.agenda.registrarAtendimento.input.details.attendanceNote': 'stateRegistrarAtendimentoDetailsAttendanceNote',
'ui.agenda.registrarAtendimento.status': 'stateRegistrarAtendimentoStatus', 'ui.agenda.registrarAtendimento.error': 'stateRegistrarAtendimentoError',
'ui.agenda.registrarAtendimento.result': 'stateRegistrarAtendimentoResult', 'ui.agenda.listConsulta.input.id': 'stateListConsultaId',
'ui.agenda.listConsulta.input.pacienteId': 'stateListConsultaPacienteId', 'ui.agenda.listConsulta.input.profissionalId': 'stateListConsultaProfissionalId',
'ui.agenda.listConsulta.input.scheduledAt': 'stateListConsultaScheduledAt', 'ui.agenda.listConsulta.input.status': 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073',
'ui.agenda.listConsulta.input.page': 'stateListConsultaPage', 'ui.agenda.listConsulta.status': 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e000073000074000061000074000075000073',
'ui.agenda.listConsulta.error': 'stateListConsultaError', 'ui.agenda.listConsulta.result': 'stateListConsultaResult',
};
public constructor() {
super();
this.subscribedStateKeys.forEach((key: string) => this.stateKeys.set(`${this.statePropertyByKey[key]};${key}`, false));
}
public connectedCallback(): void {
super.connectedCallback();
this.subscribedStateKeys.forEach((key: string) => {
const value = getState(key);
if (value !== undefined) this.applyState(key, value);
});
void this.runListConsulta();
}
public disconnectedCallback(): void {
this.subscribedStateKeys.forEach((key: string) => unsubscribe([key], this));
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: unknown): void {
if (this.statePropertyByKey[key]) {
this.applyState(key, value);
this.requestUpdate();
}
}
private applyState(key: string, value: unknown): void {
const property = this.statePropertyByKey[key] as keyof AgendaShared;
(this[property] as unknown) = value;
}
private publish(key: string, value: unknown): void {
setState(key, value);
this.applyState(key, value);
}
private errorFrom(error: unknown): ErrorEnvelope {
if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
const candidate = error as { code: unknown; message: unknown; details?: unknown };
if (typeof candidate.code === 'string' && typeof candidate.message === 'string') return { code: candidate.code, message: candidate.message, details: candidate.details };
}
return { code: 'UNEXPECTED_ERROR', message: error instanceof Error ? error.message : String(error) };
}
private queryParams(): ListConsultaInput {
const params: ListConsultaInput = {};
if (this.stateListConsultaId) params.id = this.stateListConsultaId;
if (this.stateListConsultaPacienteId) params.pacienteId = this.stateListConsultaPacienteId;
if (this.stateListConsultaProfissionalId) params.profissionalId = this.stateListConsultaProfissionalId;
if (this.stateListConsultaScheduledAt) params.scheduledAt = this.stateListConsultaScheduledAt;
if (this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073) params.status = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e0000610000670000650006e00006400006100002e00006c00006900007300007400004300006f00006e0000730000750006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073;
if (this.stateListConsultaPage !== null) params.page = this.stateListConsultaPage;
return params;
}
public setScenario(value: Scenario): void {
if (value === 'registrarAtendimento' && !this.stateRegistrarAtendimentoId) {
this.publish('ui.agenda.registrarAtendimento.error', { code: 'PRECONDITION_REQUIRED', message: 'Selecione uma consulta antes de registrar o atendimento.' });
return;
}
this.publish('ui.agenda.scenary', value);
}
public selectRegistrarAtendimentoId(value: string | null): void {
if (value === null) {
this.publish('ui.agenda.registrarAtendimento.input.id', null);
return;
}
const row = this.stateListConsultaResult.find((item: ListConsultaItem) => item.id === value);
if (!row) {
this.publish('ui.agenda.registrarAtendimento.error', { code: 'INVALID_SELECTION', message: 'Selecione uma consulta válida da agenda.' });
return;
}
this.publish('ui.agenda.registrarAtendimento.input.id', row.id);
}
public setRegistrarAtendimentoDetailsAttendanceNote(value: string | null): void { this.publish('ui.agenda.registrarAtendimento.input.details.attendanceNote', value); }
public setListConsultaId(value: string | null): void { this.publish('ui.agenda.listConsulta.input.id', value); }
public setListConsultaPacienteId(value: string | null): void { this.publish('ui.agenda.listConsulta.input.pacienteId', value); }
public setListConsultaProfissionalId(value: string | null): void { this.publish('ui.agenda.listConsulta.input.profissionalId', value); }
public setListConsultaScheduledAt(value: string | null): void { this.publish('ui.agenda.listConsulta.input.scheduledAt', value); }
public setListConsultaStatus(value: ConsultaStatus | null): void { this.publish('ui.agenda.listConsulta.input.status', value); }
public async runListConsulta(): Promise<void> {
this.publish('ui.agenda.listConsulta.status', 'loading');
this.publish('ui.agenda.listConsulta.error', null);
try {
const response = await execBff<ListConsultaOutput>(listConsultaRoute, this.queryParams(), { mode: 'silent' });
if (response.ok && response.data !== null) {
this.publish('ui.agenda.listConsulta.result', response.data);
this.publish('ui.agenda.pageStatus', response.data.length === 0 ? 'empty' : 'success');
this.publish('ui.agenda.listConsulta.status', 'success');
} else {
const error = this.errorFrom(response.error);
this.publish('ui.agenda.listConsulta.error', error); this.publish('ui.agenda.listConsulta.status', 'error'); this.publish('ui.agenda.pageStatus', 'error');
}
} catch (error: unknown) {
const normalized = this.errorFrom(error); this.publish('ui.agenda.listConsulta.error', normalized); this.publish('ui.agenda.listConsulta.status', 'error'); this.publish('ui.agenda.pageStatus', 'error');
}
}
public async runRegistrarAtendimento(): Promise<void> {
if (this.stateRegistrarAtendimentoStatus === 'loading') return;
if (!this.stateRegistrarAtendimentoId) { this.publish('ui.agenda.registrarAtendimento.error', { code: 'REQUIRED_INPUT', message: 'Selecione uma consulta antes de registrar o atendimento.' }); return; }
if (!this.stateRegistrarAtendimentoDetailsAttendanceNote?.trim()) { this.publish('ui.agenda.registrarAtendimento.error', { code: 'REQUIRED_INPUT', message: 'Informe a anotação do atendimento.' }); return; }
this.publish('ui.agenda.registrarAtendimento.status', 'loading'); this.publish('ui.agenda.registrarAtendimento.error', null);
const params: RegistrarAtendimentoInput = { id: this.stateRegistrarAtendimentoId, details: { attendanceNote: this.stateRegistrarAtendimentoDetailsAttendanceNote } };
try {
const result = await runBlockingUiAction((signal: AbortSignal) => execBff<RegistrarAtendimentoOutput>(registrarAtendimentoRoute, params, { mode: 'blocking', signal } as BffClientOptions), { mode: 'blocking' });
if (result?.ok && result.data !== null) {
this.publish('ui.agenda.registrarAtendimento.result', result.data); this.publish('ui.agenda.registrarAtendimento.status', 'success'); await this.runListConsulta();
} else {
const error = this.errorFrom(result?.error);
const message = result?.error && typeof result.error.message === 'string' ? result.error.message : error.message;
this.publish('ui.agenda.registrarAtendimento.error', { ...error, message }); this.publish('ui.agenda.registrarAtendimento.status', 'error');
}
} catch (error: unknown) {
this.publish('ui.agenda.registrarAtendimento.error', this.errorFrom(error)); this.publish('ui.agenda.registrarAtendimento.status', 'error');
}
}
public enterBaseScenario(): void { this.setScenario('base'); }
public enterRegistrarAtendimentoScenario(): void { this.setScenario('registrarAtendimento'); }

  /** setter for state ui.agenda.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'registrarAtendimento'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'registrarAtendimento' && (!this.id)) next = 'base';
    this.scenary = next as typeof this.scenary;
    setState('ui.agenda.scenary', next);
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
      if (!this.id) {
        this.id = rawId;
        setState('ui.agenda.registrarAtendimento.input.id', rawId);
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
void operationBindings;
