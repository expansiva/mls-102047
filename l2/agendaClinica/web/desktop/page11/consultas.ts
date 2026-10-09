/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/consultas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AgendaClinicaConsultasShared } from '/_102047_/l2/agendaClinica/web/shared/consultas.js';
import '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-filters.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-group.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-calendar-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_pt = {
pageTitle: 'Agenda clínica', agenda: 'Agenda', consulta: 'Consulta selecionada', agendamento: 'Novo agendamento',
novo: 'Novo agendamento', buscar: 'Buscar na agenda', hoje: 'Hoje', calendario: 'Calendário', tabela: 'Tabela',
horario: 'Data e horário', paciente: 'Paciente', profissional: 'Profissional', situacao: 'Situação',
confirmar: 'Confirmar consulta', falta: 'Registrar falta', agendar: 'Agendar consulta',
selecionePaciente: 'Selecione um paciente', selecioneProfissional: 'Selecione um profissional',
escolhaHorario: 'Escolha a data e o horário', carregando: 'Carregando…', vazio: 'Nenhuma consulta neste período.',
nenhumPaciente: 'Nenhum paciente encontrado', nenhumProfissional: 'Nenhum profissional encontrado',
maisConsultas: 'Carregar mais consultas', maisPacientes: 'Mais pacientes', maisProfissionais: 'Mais profissionais',
erroAgenda: 'Não foi possível carregar a agenda.', erroConsulta: 'Não foi possível carregar a consulta.',
erroAgendamento: 'Não foi possível agendar a consulta.', sucessoAgendamento: 'Consulta agendada com sucesso.',
sucessoConfirmacao: 'Consulta confirmada.', sucessoFalta: 'Falta registrada.',
pacientes: 'Pacientes', profissionais: 'Profissionais', pacienteAjuda: 'Localize pelo nome do paciente.',
profissionalAjuda: 'Escolha o profissional responsável.', confirmarAjuda: 'Confira os dados antes de registrar a confirmação.',
statusScheduled: 'Agendada', statusConfirmed: 'Confirmada', statusNoShow: 'Falta', statusAttended: 'Atendida',
voltar: 'Voltar', semSelecao: 'Selecione uma consulta na agenda para conferir os dados.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**
const dateText = (value: string, withDate = true) => new Intl.DateTimeFormat(document.documentElement.lang || 'pt-BR', withDate ? { dateStyle: 'short', timeStyle: 'short' } : { timeStyle: 'short' }).format(new Date(value));
const statusKey = (value: string) => ({ scheduled: 'statusScheduled', confirmed: 'statusConfirmed', noShow: 'statusNoShow', attended: 'statusAttended' } as Record<string, string>)[value] || value;
@customElement('agenda-clinica--web--desktop--page11--consultas-102047')
export class AgendaClinicaDesktopPage11ConsultasPage extends AgendaClinicaConsultasShared {
private msg!: PageMessageType;
private renderAgenda() {
const rows = this.agenda?.items ?? [];
const searchError = this.filtrarAgendaError?.message || '';
return html`
<div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-8">
<header class="flex items-center justify-between mb-6">
<div><h1 class="text-3xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1><p class="text-sm text-[var(--text-muted,currentColor)] mt-1">${this.cabecalho?.dataAgenda || ''}</p></div>
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" @action=${() => this.setScenario('agendamento')}><Label>${this.msg.novo}</Label></grouptriggeraction--ml-button-standard>
</header>
<div class="grid grid-cols-[minmax(0,1fr)_22rem] gap-6 items-start">
<main class="space-y-4">
<section data-organism-id="listaAgenda" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
<div class="flex items-end gap-4 mb-5">
<div class="flex-1"><groupsearchcontent--ml-search-filters value=${this.termo} .loading=${this.filtrarAgendaStatus === 'loading'} @search=${() => this.filtrarAgenda()} @change=${() => this.filtrarAgenda()} @clear=${() => this.filtrarAgenda()}><Label>${this.msg.buscar}</Label><Empty>${this.msg.vazio}</Empty></groupsearchcontent--ml-search-filters></div>
<grouptriggeraction--ml-button-group @action=${() => this.carregarAgenda()}><grouptriggeraction--ml-button-standard data-variant="secondary"><Label>${this.msg.hoje}</Label></grouptriggeraction--ml-button-standard></grouptriggeraction--ml-button-group>
</div>
${searchError ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible><Message>${searchError}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
<groupviewdata--ml-calendar-view .loading=${this.carregarAgendaStatus === 'loading'} @row-click=${(e: CustomEvent<{ index: number }>) => { const row = rows[e.detail.index]; if (row) this.selectConsulta(row.id); }}>
<Columns><Column field="horario" header=${this.msg.horario}></Column><Column field="paciente" header=${this.msg.paciente}></Column><Column field="profissional" header=${this.msg.profissional}></Column></Columns>
<Rows>${rows.map(row => html`<Row date=${row.scheduledAt} title=${`${row.paciente.identification.details.identification.name} — ${dateText(row.scheduledAt, false)}`} ?selected=${row.id === this.selectedConsulta}><Cell>${dateText(row.scheduledAt, false)}</Cell><Cell>${row.paciente.identification.details.identification.name}</Cell><Cell>${row.profissional.identification.details.identification.name}</Cell></Row>`)}</Rows>
<Empty>${this.msg.vazio}</Empty><Loading>${this.msg.carregando}</Loading>
</groupviewdata--ml-calendar-view>
${this.agenda?.hasMore ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" data-class="mt-3" .loading=${this.carregarMaisAgendaStatus === 'loading'} @action=${() => this.carregarMaisAgenda()}><Label>${this.msg.maisConsultas}</Label></grouptriggeraction--ml-button-standard>` : ''}
</section>
<section class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4" aria-label=${this.msg.tabela}>
<groupviewtable--ml-data-table .loading=${this.carregarAgendaStatus === 'loading'} .value=${rows.findIndex(row => row.id === this.selectedConsulta).toString()} @rowClick=${(e: CustomEvent<{ index: number }>) => { const row = rows[e.detail.index]; if (row) this.selectConsulta(row.id); }}>
<TableCaption>${this.msg.tabela}</TableCaption><TableHeader><TableRow><TableHead key="horario" sortable>${this.msg.horario}</TableHead><TableHead key="paciente" sortable>${this.msg.paciente}</TableHead><TableHead key="profissional" sortable>${this.msg.profissional}</TableHead><TableHead key="situacao">${this.msg.situacao}</TableHead></TableRow></TableHeader>
<TableBody>${rows.map(row => html`<TableRow><TableCell sort-value=${row.scheduledAt}>${dateText(row.scheduledAt)}</TableCell><TableCell>${row.paciente.identification.details.identification.name}</TableCell><TableCell>${row.profissional.identification.details.identification.name}</TableCell><TableCell>${this.msg[statusKey(row.status) as keyof PageMessageType]}</TableCell></TableRow>`)}</TableBody><Empty>${this.msg.vazio}</Empty>
</groupviewtable--ml-data-table>
</section>
</main>
<aside class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 min-h-[28rem]"><molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'consulta'} backLabel=${this.msg.voltar} @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="consulta" title=${this.msg.consulta}>${this.renderConsulta()}</Scene>
<Scene value="agendamento" title=${this.msg.agendamento}>${this.renderAgendamento()}</Scene>
</molecules--ml-scenary-102020></aside>
</div>
</div>`;
}
private renderConsulta() {
const c = this.consulta;
const error = this.consultarConsultaSelecionadaError?.message || '';
return html`<div data-organism-id="detalheConsulta" class="space-y-5">${c ? html`<dl class="grid grid-cols-2 gap-4"><div><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.paciente}</dt><dd class="font-medium">${c.paciente.identification.details.identification.name}</dd></div><div><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.profissional}</dt><dd class="font-medium">${c.profissional.identification.details.identification.name}</dd></div><div><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.horario}</dt><dd>${dateText(c.scheduledAt)}</dd></div><div><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.situacao}</dt><dd>${this.msg[statusKey(c.status) as keyof PageMessageType]}</dd></div></dl><p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.confirmarAjuda}</p>` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.semSelecao}</p>`}${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible><Message>${error}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}<div data-organism-id="acoesConsulta"><grouptriggeraction--ml-button-group @action=${() => this.confirmarConsulta()}><grouptriggeraction--ml-button-standard data-variant="primary" .disabled=${!c || c.status !== 'scheduled'} .loading=${this.confirmarConsultaStatus === 'loading'}><Label>${this.msg.confirmar}</Label></grouptriggeraction--ml-button-standard><grouptriggeraction--ml-button-standard data-variant="secondary" .disabled=${!c || (c.status !== 'scheduled' && c.status !== 'confirmed')} .loading=${this.registrarFaltaStatus === 'loading'} @action=${() => this.registrarFalta()}><Label>${this.msg.falta}</Label></grouptriggeraction--ml-button-standard></grouptriggeraction--ml-button-group></div></div>`;
}
private renderAgendamento() {
const d = this.agendarConsultaDraft;
const patients = this.pacientes?.items ?? [];
const professionals = this.profissionais?.items ?? [];
const error = this.agendarConsultaError?.message || '';
return html`<form data-organism-id="formularioConsulta" class="space-y-5" @submit=${(e: Event) => { e.preventDefault(); this.agendarConsulta(); }}><groupselectone--ml-combobox .value=${d.pacienteId} .loading=${this.localizarPacientesParaAgendamentoStatus === 'loading'} @input=${(e: CustomEvent<{ value: string }>) => { const termo = e.detail.value.trim(); this.termo = termo || null; if (termo) void this.localizarPacientesParaAgendamento(); }} @change=${(e: CustomEvent<{ value: string | null }>) => this.setAgendarConsultaDraft({ ...d, pacienteId: e.detail.value })}><Label>${this.msg.paciente}</Label><Helper>${this.msg.pacienteAjuda}</Helper>${patients.map(p => html`<Item value=${p.id}>${p.identification.details.identification.name}</Item>`)}<Empty>${this.msg.nenhumPaciente}</Empty></groupselectone--ml-combobox>${this.pacientes?.hasMore ? html`<grouptriggeraction--ml-button-standard data-variant="ghost" size="sm" .loading=${this.carregarMaisPacientesParaAgendamentoStatus === 'loading'} @action=${() => this.carregarMaisPacientesParaAgendamento()}><Label>${this.msg.maisPacientes}</Label></grouptriggeraction--ml-button-standard>` : ''}<groupselectone--ml-combobox .value=${d.profissionalId} .loading=${this.localizarProfissionaisParaAgendamentoStatus === 'loading'} @input=${(e: CustomEvent<{ value: string }>) => { const termo = e.detail.value.trim(); this.termo = termo || null; if (termo) void this.localizarProfissionaisParaAgendamento(); }} @change=${(e: CustomEvent<{ value: string | null }>) => this.setAgendarConsultaDraft({ ...d, profissionalId: e.detail.value })}><Label>${this.msg.profissional}</Label><Helper>${this.msg.profissionalAjuda}</Helper>${professionals.map(p => html`<Item value=${p.id}>${p.identification.details.identification.name}</Item>`)}<Empty>${this.msg.nenhumProfissional}</Empty></groupselectone--ml-combobox>${this.profissionais?.hasMore ? html`<grouptriggeraction--ml-button-standard data-variant="ghost" size="sm" .loading=${this.carregarMaisProfissionaisParaAgendamentoStatus === 'loading'} @action=${() => this.carregarMaisProfissionaisParaAgendamento()}><Label>${this.msg.maisProfissionais}</Label></grouptriggeraction--ml-button-standard>` : ''}<groupenterdatetime--ml-datetime-picker .value=${d.scheduledAt} locale="pt-BR" minuteStep="15" required @change=${(e: CustomEvent<{ value: string | null }>) => this.setAgendarConsultaDraft({ ...d, scheduledAt: e.detail.value })}><Label>${this.msg.horario}</Label><Helper>${this.msg.escolhaHorario}</Helper></groupenterdatetime--ml-datetime-picker>${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" visible><Message>${error}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}<grouptriggeraction--ml-button-standard type="submit" data-variant="primary" .disabled=${!d.pacienteId || !d.profissionalId || !d.scheduledAt} .loading=${this.agendarConsultaStatus === 'loading'}><Label>${this.msg.agendar}</Label></grouptriggeraction--ml-button-standard></form>`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return this.renderAgenda();
}
}
