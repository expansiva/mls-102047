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
} from '../contracts/agenda.defs.js';
type ErrorState = {
code: string;
message: string;
details?: unknown;
};
type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
type Scenario = 'base' | 'registrarAtendimento';
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
type ConsultaStatus = 'scheduled' | 'noShow' | 'attended';
type AgendaError = NonNullable<ErrorState>;
const STATE_KEYS = [
'ui.agenda.pageStatus',
'ui.agenda.scenary',
'ui.agenda.registrarAtendimento.input.id',
'ui.agenda.registrarAtendimento.input.details.attendanceNote',
'ui.agenda.registrarAtendimento.status',
'ui.agenda.registrarAtendimento.error',
'ui.agenda.registrarAtendimento.result',
'ui.agenda.listConsulta.input.id',
'ui.agenda.listConsulta.input.pacienteId',
'ui.agenda.listConsulta.input.profissionalId',
'ui.agenda.listConsulta.input.scheduledAt',
'ui.agenda.listConsulta.input.status',
'ui.agenda.listConsulta.input.page',
'ui.agenda.listConsulta.status',
'ui.agenda.listConsulta.error',
'ui.agenda.listConsulta.result',
] as const;
const operationBindings = {
registrarAtendimento: {
actorRef: 'profissional',
grantRefs: ['profissionalAgendaPropria'],
authorities: ['profissional'],
transition: { transitionId: 'registrarAtendimento', from: ['scheduled'], to: 'attended', by: ['profissional'], payload: ['details.attendanceNote'] },
ruleRefs: [
{ ruleId: 'consultaSomenteAgendadaPodeRegistrarAtendimento', file: 'l4/agendaClinica/rules.defs.ts', symbol: 'rules.consultaSomenteAgendadaPodeRegistrarAtendimento', description: 'O atendimento só pode ser registrado para uma consulta com situação agendada.' },
{ ruleId: 'anotacaoObrigatoriaNoAtendimento', file: 'l4/agendaClinica/rules.defs.ts', symbol: 'rules.anotacaoObrigatoriaNoAtendimento', description: 'O registro de atendimento deve incluir uma anotação do atendimento.' },
{ ruleId: 'profissionalAtendeSomentePropriaConsulta', file: 'l4/agendaClinica/rules.defs.ts', symbol: 'rules.profissionalAtendeSomentePropriaConsulta', description: 'O profissional só pode registrar o atendimento de uma consulta atribuída a ele.' },
],
sourceHashes: ['l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552', 'l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b', 'l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe'],
},
listConsulta: {
actorRef: 'profissional',
grantRefs: ['profissionalAgendaPropria'],
authorities: ['profissional'],
ruleRefs: [],
sourceHashes: ['l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552', 'l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b', 'l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe'],
},
} as const;
export class AgendaShared extends StateLitElement {
public pageStatus: PageStatus = 'idle';
public scenary: Scenario = 'base';
public stateRegistrarAtendimentoId: string | null = null;
public stateRegistrarAtendimentoDetailsAttendanceNote: string | null = null;
public stateRegistrarAtendimentoStatus: ActionStatus = 'idle';
public stateRegistrarAtendimentoError: ErrorState | null = null;
public stateRegistrarAtendimentoResult: RegistrarAtendimentoOutput | null = null;
public stateListConsultaId: string | null = null;
public stateListConsultaPacienteId: string | null = null;
public stateListConsultaProfissionalId: string | null = null;
public stateListConsultaScheduledAt: string | null = null;
public stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073: ConsultaStatus | null = null;
public stateListConsultaPage: number | null = null;
public stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073: ActionStatus = 'idle';
public stateListConsultaError: ErrorState | null = null;
public stateListConsultaResult: ListConsultaOutput = [];
private readonly stateKeyToMember: ReadonlyMap<string, keyof AgendaShared> = new Map([
['ui.agenda.pageStatus', 'pageStatus'], ['ui.agenda.scenary', 'scenary'],
['ui.agenda.registrarAtendimento.input.id', 'stateRegistrarAtendimentoId'], ['ui.agenda.registrarAtendimento.input.details.attendanceNote', 'stateRegistrarAtendimentoDetailsAttendanceNote'],
['ui.agenda.registrarAtendimento.status', 'stateRegistrarAtendimentoStatus'], ['ui.agenda.registrarAtendimento.error', 'stateRegistrarAtendimentoError'], ['ui.agenda.registrarAtendimento.result', 'stateRegistrarAtendimentoResult'],
['ui.agenda.listConsulta.input.id', 'stateListConsultaId'], ['ui.agenda.listConsulta.input.pacienteId', 'stateListConsultaPacienteId'], ['ui.agenda.listConsulta.input.profissionalId', 'stateListConsultaProfissionalId'], ['ui.agenda.listConsulta.input.scheduledAt', 'stateListConsultaScheduledAt'],
['ui.agenda.listConsulta.input.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073'],
['ui.agenda.listConsulta.input.page', 'stateListConsultaPage'], ['ui.agenda.listConsulta.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073'],
['ui.agenda.listConsulta.error', 'stateListConsultaError'], ['ui.agenda.listConsulta.result', 'stateListConsultaResult'],
]);
public connectedCallback(): void {
super.connectedCallback();
for (const key of STATE_KEYS) {
const member = this.stateKeyToMember.get(key);
if (member) {
const value: unknown = getState(key);
if (value !== undefined) (this as unknown as Record<string, unknown>)[member] = value;
}
subscribe([key], this);
}
void this.runListConsulta();
}
public disconnectedCallback(): void {
for (const key of STATE_KEYS) unsubscribe([key], this);
super.disconnectedCallback();
}
public handleIcaStateChange(key: string, value: any): void {
if (value === undefined) return;
const member = this.stateKeyToMember.get(key);
if (member) {
(this as unknown as Record<string, unknown>)[member] = value;
this.requestUpdate();
}
}
private publish<T>(key: string, member: keyof AgendaShared, value: T): void {
(this as unknown as Record<string, unknown>)[member] = value;
setState(key, value);
}
private errorFrom(error: unknown, fallback: string): AgendaError {
if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
const candidate = error as { code?: unknown; message: string; details?: unknown };
return { code: typeof candidate.code === 'string' ? candidate.code : 'UNEXPECTED_ERROR', message: candidate.message, details: candidate.details };
}
return { code: 'UNEXPECTED_ERROR', message: fallback };
}
public setScenario(value: Scenario): void {
if (value === 'registrarAtendimento' && this.stateRegistrarAtendimentoId === null) {
console.error('Não é possível entrar no cenário de atendimento sem selecionar uma consulta.');
return;
}
this.publish('ui.agenda.scenary', 'scenary', value);
}
public selectRegistrarAtendimentoId(id: string | null): void {
if (id === null) {
this.publish('ui.agenda.registrarAtendimento.input.id', 'stateRegistrarAtendimentoId', null);
return;
}
const row = this.stateListConsultaResult.find((item) => item.id === id);
if (!row) { console.error('Selecione uma consulta presente na agenda.'); return; }
this.publish('ui.agenda.registrarAtendimento.input.id', 'stateRegistrarAtendimentoId', row.id);
}
public setRegistrarAtendimentoDetailsAttendanceNote(value: string | null): void { this.publish('ui.agenda.registrarAtendimento.input.details.attendanceNote', 'stateRegistrarAtendimentoDetailsAttendanceNote', value); }
public setListConsultaId(value: string | null): void { this.publish('ui.agenda.listConsulta.input.id', 'stateListConsultaId', value); }
public setListConsultaPacienteId(value: string | null): void { this.publish('ui.agenda.listConsulta.input.pacienteId', 'stateListConsultaPacienteId', value); }
public setListConsultaProfissionalId(value: string | null): void { this.publish('ui.agenda.listConsulta.input.profissionalId', 'stateListConsultaProfissionalId', value); }
public setListConsultaScheduledAt(value: string | null): void { this.publish('ui.agenda.listConsulta.input.scheduledAt', 'stateListConsultaScheduledAt', value); }
public setListConsultaStatus(value: ConsultaStatus | null): void { this.publish('ui.agenda.listConsulta.input.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073', value); }
public enterBaseScenario(): void { this.setScenario('base'); }
public enterRegistrarAtendimentoScenario(): void { if (this.stateRegistrarAtendimentoId !== null) this.setScenario('registrarAtendimento'); else console.error('Selecione uma consulta antes de registrar o atendimento.'); }
public async runListConsulta(): Promise<void> {
this.publish('ui.agenda.listConsulta.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073', 'loading');
const params: ListConsultaInput = {};
if (this.stateListConsultaId) params.id = this.stateListConsultaId;
if (this.stateListConsultaPacienteId) params.pacienteId = this.stateListConsultaPacienteId;
if (this.stateListConsultaProfissionalId) params.profissionalId = this.stateListConsultaProfissionalId;
if (this.stateListConsultaScheduledAt) params.scheduledAt = this.stateListConsultaScheduledAt;
if (this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073) params.status = this.stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073;
if (this.stateListConsultaPage !== null) params.page = this.stateListConsultaPage;
try {
const response = await execBff<ListConsultaOutput>(listConsultaRoute, params, { mode: 'silent' } satisfies BffClientOptions);
if (response.ok && response.data) {
this.publish('ui.agenda.listConsulta.result', 'stateListConsultaResult', response.data);
this.publish('ui.agenda.listConsulta.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073', response.data.length === 0 ? 'empty' : 'success');
} else {
const feedback = this.errorFrom(response.error, 'Não foi possível carregar a agenda.');
this.publish('ui.agenda.listConsulta.error', 'stateListConsultaError', feedback);
this.publish('ui.agenda.listConsulta.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073', 'error');
}
} catch (error) {
this.publish('ui.agenda.listConsulta.error', 'stateListConsultaError', this.errorFrom(error, 'Não foi possível carregar a agenda.'));
this.publish('ui.agenda.listConsulta.status', 'stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073', 'error');
}
}
public async runRegistrarAtendimento(): Promise<void> {
if (this.stateRegistrarAtendimentoStatus === 'loading') return;
if (!this.stateRegistrarAtendimentoId) { this.publish('ui.agenda.registrarAtendimento.error', 'stateRegistrarAtendimentoError', this.errorFrom(null, 'Selecione uma consulta para registrar o atendimento.')); return; }
if (!this.stateRegistrarAtendimentoDetailsAttendanceNote) { this.publish('ui.agenda.registrarAtendimento.error', 'stateRegistrarAtendimentoError', this.errorFrom(null, 'Informe a anotação do atendimento.')); return; }
this.publish('ui.agenda.registrarAtendimento.status', 'stateRegistrarAtendimentoStatus', 'loading');
this.publish('ui.agenda.registrarAtendimento.error', 'stateRegistrarAtendimentoError', null);
const params: RegistrarAtendimentoInput = { id: this.stateRegistrarAtendimentoId, details: { attendanceNote: this.stateRegistrarAtendimentoDetailsAttendanceNote } };
try {
const response = await runBlockingUiAction((signal: AbortSignal) => execBff<RegistrarAtendimentoOutput>(registrarAtendimentoRoute, params, { mode: 'blocking', signal }), { busyLabel: 'Registrando atendimento...' });
if (response?.ok && response.data) {
this.publish('ui.agenda.registrarAtendimento.result', 'stateRegistrarAtendimentoResult', response.data);
this.publish('ui.agenda.registrarAtendimento.status', 'stateRegistrarAtendimentoStatus', 'success');
await this.runListConsulta();
} else {
const rawError: unknown = response?.error;
const feedback = rawError && typeof rawError === 'object' && 'message' in rawError && typeof rawError.message === 'string'
? this.errorFrom(rawError, rawError.message)
: this.errorFrom(rawError, 'Não foi possível registrar o atendimento.');
this.publish('ui.agenda.registrarAtendimento.error', 'stateRegistrarAtendimentoError', feedback);
this.publish('ui.agenda.registrarAtendimento.status', 'stateRegistrarAtendimentoStatus', 'error');
}
} catch (error) {
const feedback = this.errorFrom(error, 'Não foi possível registrar o atendimento.');
this.publish('ui.agenda.registrarAtendimento.error', 'stateRegistrarAtendimentoError', feedback);
this.publish('ui.agenda.registrarAtendimento.status', 'stateRegistrarAtendimentoStatus', 'error');
}
}

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