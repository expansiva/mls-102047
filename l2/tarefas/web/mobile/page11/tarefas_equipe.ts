/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/tarefas_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasTarefas_equipeShared } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import type { TarefaEquipeItem, TarefaDetalhe, TarefaPrioridade, TarefaStatus } from '/_102047_/l2/tarefas/web/shared/tarefas_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-interval-presets.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

const ALL = '__todas';

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtDate(value: string | undefined | null): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function fmtDateTime(value: string | undefined | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function statusLabel(msg: PageMessageType, s: string): string {
  switch (s) {
    case 'aFazer': return msg['stAFazer'];
    case 'emAndamento': return msg['stEmAndamento'];
    case 'emRevisao': return msg['stEmRevisao'];
    case 'concluida': return msg['stConcluida'];
    case 'cancelada': return msg['stCancelada'];
    default: return s;
  }
}

function prioridadeLabel(msg: PageMessageType, p: string): string {
  switch (p) {
    case 'low': return msg['prBaixa'];
    case 'medium': return msg['prMedia'];
    case 'high': return msg['prAlta'];
    default: return p;
  }
}

const CHIP = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ';

function statusClass(s: string): string {
  switch (s) {
    case 'emAndamento': return CHIP + 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'emRevisao': return CHIP + 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'concluida': return CHIP + 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    default: return CHIP + 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function prioridadeClass(p: string): string {
  return p === 'high'
    ? CHIP + 'border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] text-[var(--text-strong,currentColor)]'
    : CHIP + 'bg-[var(--surface-alt-bg,transparent)] text-[var(--text-muted,currentColor)]';
}

const BTN = 'inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]';

function normalize(v: string | null): string | null {
  return v === null || v === ALL ? null : v;
}

type Evento = { quando: string; evento: string; detalhe: string };

function eventosHistorico(msg: PageMessageType, t: TarefaDetalhe): Evento[] {
  const out: Evento[] = [];
  out.push({
    quando: fmtDateTime(t.criadaEm),
    evento: msg['evCriada'],
    detalhe: t.criador.details.identification.name,
  });
  if (t.details.devolvidaEm) {
    out.push({ quando: fmtDateTime(t.details.devolvidaEm), evento: msg['evDevolvida'], detalhe: t.details.motivoDevolucao ?? '' });
  }
  if (t.details.concluidaEm) {
    out.push({ quando: fmtDateTime(t.details.concluidaEm), evento: msg['evConcluida'], detalhe: '' });
  }
  if (t.details.canceladaEm) {
    out.push({ quando: fmtDateTime(t.details.canceladaEm), evento: msg['evCancelada'], detalhe: '' });
  }
  return out;
}

type ModalEl = (HTMLElement & { visible: boolean }) | null | undefined;

function setModal(e: Event, visible: boolean) {
  const modal = (e.currentTarget as HTMLElement)
    .closest('[data-organism-id="acoesGestor"]')
    ?.querySelector('groupnotifyuser--ml-alert-modal') as ModalEl;
  if (modal) modal.visible = visible;
}

@customElement('tarefas--web--mobile--page11--tarefas_equipe-102047')
export class TarefasMobilePage11Tarefas_equipePage extends TarefasTarefas_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full w-full max-w-[430px] mx-auto bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-3 py-3">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['voltarLista']}
          .value=${this.scenary || 'quadro'}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}
        >
          <Scene value="quadro" title=${this.msg['sceneQuadro']}>${this.renderQuadro()}</Scene>
          <Scene value="tarefa" title=${this.msg['sceneTarefa']} nav="back" backTo="quadro">${this.renderTarefaScene()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private filtroSelect(label: string, value: string | null, items: TemplateResult[], allLabel: string, apply: (v: string | null) => void) {
    return html`
      <groupselectone--ml-select
        .value=${value}
        @change=${(e: CustomEvent<{ value: string | null }>) => apply(normalize(e.detail.value))}
      >
        <Label>${label}</Label>
        <Trigger>${allLabel}</Trigger>
        <Item value=${ALL}>${allLabel}</Item>
        ${items}
      </groupselectone--ml-select>
    `;
  }

  private renderFiltros() {
    const m = this.msg;
    const listas = this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`);
    const membros = this.membros.map((mb) => html`<Item value=${mb.id}>${mb.details.identification.name}</Item>`);
    const prioridades = [
      html`<Item value="low">${m['prBaixa']}</Item>`,
      html`<Item value="medium">${m['prMedia']}</Item>`,
      html`<Item value="high">${m['prAlta']}</Item>`,
    ];
    const situacoes = [
      html`<Item value="aFazer">${m['stAFazer']}</Item>`,
      html`<Item value="emAndamento">${m['stEmAndamento']}</Item>`,
      html`<Item value="emRevisao">${m['stEmRevisao']}</Item>`,
      html`<Item value="concluida">${m['stConcluida']}</Item>`,
      html`<Item value="cancelada">${m['stCancelada']}</Item>`,
    ];
    return html`
      <details class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <summary class="flex min-h-[44px] cursor-pointer items-center px-3 text-sm font-semibold text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]">${m['filtros']}</summary>
        <div class="grid gap-3 border-t border-[var(--border-subtle,currentColor)] p-3">
          ${this.filtroSelect(m['filtroLista'], this.listaId, listas, m['todas'], (v) => this.listarTarefasEquipe({ listaId: v }))}
          ${this.filtroSelect(m['filtroResponsavel'], this.responsavelId, membros, m['todos'], (v) => this.listarTarefasEquipe({ responsavelId: v }))}
          ${this.filtroSelect(m['filtroPrioridade'], this.prioridade, prioridades, m['todas'], (v) => this.listarTarefasEquipe({ prioridade: v as TarefaPrioridade | null }))}
          ${this.filtroSelect(m['filtroSituacao'], this.status, situacoes, m['todas'], (v) => this.listarTarefasEquipe({ status: v as TarefaStatus | null }))}
          <groupenterdateinterval--ml-date-interval-presets
            .startDate=${this.prazoDe}
            .endDate=${this.prazoAte}
            locale="pt-BR"
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) =>
              this.listarTarefasEquipe({ prazoDe: e.detail.startDate, prazoAte: e.detail.endDate })}
          >
            <Label>${m['filtroPrazo']}</Label>
            <LabelStart>${m['de']}</LabelStart>
            <LabelEnd>${m['ate']}</LabelEnd>
          </groupenterdateinterval--ml-date-interval-presets>
          <div class="grid gap-1">
            <label class="flex min-h-[44px] items-center gap-3 text-sm">
              <input type="checkbox" class="h-5 w-5 focus-visible:ring-2" .checked=${!!this.venceHoje}
                @change=${(e: Event) => this.listarTarefasEquipe({ venceHoje: (e.target as HTMLInputElement).checked ? true : null })} />
              <span>${m['venceHoje']}</span>
            </label>
            <label class="flex min-h-[44px] items-center gap-3 text-sm">
              <input type="checkbox" class="h-5 w-5 focus-visible:ring-2" .checked=${!!this.atrasada}
                @change=${(e: Event) => this.listarTarefasEquipe({ atrasada: (e.target as HTMLInputElement).checked ? true : null })} />
              <span>${m['atrasadas']}</span>
            </label>
          </div>
          <button type="button" class=${BTN}
            @click=${() => this.listarTarefasEquipe({ listaId: null, responsavelId: null, prioridade: null, status: null, prazoDe: null, prazoAte: null, venceHoje: null, atrasada: null })}>
            ${m['limparFiltros']}
          </button>
        </div>
      </details>
    `;
  }

  private renderLinha(t: TarefaEquipeItem) {
    const m = this.msg;
    return html`
      <TableRow key=${t.id}>
        <TableCell>
          <div class="min-w-0">
            <div class="break-words font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
            <div class="text-xs text-[var(--text-muted,currentColor)]">${t.lista.nome}</div>
            ${t.details.venceHoje ? html`<span class=${statusClass('emRevisao') + ' mt-1'}>${m['venceHoje']}</span>` : nothing}
          </div>
        </TableCell>
        <TableCell>${t.responsavel.details.identification.name}</TableCell>
        <TableCell>
          <span class=${t.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}>${fmtDate(t.prazo)}</span>
          ${t.details.atrasada ? html`<span class="ml-1 text-xs text-[var(--text-muted,currentColor)]">${m['atrasada']}</span>` : nothing}
        </TableCell>
        <TableCell><span class=${statusClass(t.status)}>${statusLabel(m, t.status)}</span></TableCell>
        <TableCell><span class=${prioridadeClass(t.prioridade)}>${prioridadeLabel(m, t.prioridade)}</span></TableCell>
        <TableCell>${t.details.progressoChecklist}</TableCell>
      </TableRow>
    `;
  }

  private renderQuadro() {
    const m = this.msg;
    const items = this.tarefas?.items ?? [];
    const idx = items.findIndex((t) => t.id === this.selectedTarefa);
    const erro = this.listarTarefasEquipeError ?? this.carregarOpcoesEquipeError;
    const precondition = erro?.code === 'client.preconditionMissing';
    return html`
      <div data-organism-id="tarefasEquipe" class="grid gap-3">
        ${this.renderFiltros()}
        ${this.pageStatus === 'error' || erro
          ? html`
              <div role="alert" aria-live="polite" class="grid gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]">
                <p>${precondition ? m['precondicao'] : m['erroLista']}</p>
                <div class="flex flex-wrap gap-2">
                  ${precondition
                    ? html`<button type="button" class=${BTN} @click=${() => window.history.back()}>${m['voltar']}</button>`
                    : nothing}
                  <button type="button" class=${BTN} @click=${() => { this.carregarOpcoesEquipe(); this.listarTarefasEquipe(); }}>${m['tentarNovamente']}</button>
                </div>
              </div>`
          : html`
              <groupviewtable--ml-responsive-table
                .value=${idx >= 0 ? String(idx) : ''}
                ?loading=${this.pageStatus === 'loading'}
                @rowClick=${(e: CustomEvent<{ index: number }>) => {
                  const t = this.tarefas?.items[e.detail.index];
                  if (t) {
                    this.obterTarefa(t.id);
                    this.setScenario('tarefa');
                  }
                }}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead key="titulo">${m['colTarefa']}</TableHead>
                    <TableHead key="responsavel">${m['colResponsavel']}</TableHead>
                    <TableHead key="prazo">${m['colPrazo']}</TableHead>
                    <TableHead key="status">${m['colSituacao']}</TableHead>
                    <TableHead key="prioridade">${m['colPrioridade']}</TableHead>
                    <TableHead key="checklist">${m['colChecklist']}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>${items.map((t) => this.renderLinha(t))}</TableBody>
                <Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['vazio']}</div></Empty>
                <Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['carregando']}</div></Loading>
              </groupviewtable--ml-responsive-table>
              ${items.length > 0
                ? html`<button type="button" class=${BTN} ?disabled=${this.listarTarefasEquipeStatus === 'loading'}
                    aria-busy=${this.listarTarefasEquipeStatus === 'loading' ? 'true' : 'false'}
                    @click=${() => this.listarTarefasEquipe(undefined, undefined, true)}>${m['maisTarefas']}</button>`
                : nothing}`}
      </div>
    `;
  }

  private renderTarefaScene() {
    const m = this.msg;
    const t = this.tarefa;
    let body;
    if (this.obterTarefaStatus === 'loading') {
      body = html`<p aria-busy="true" class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['carregando']}</p>`;
    } else if (this.obterTarefaStatus === 'error') {
      body = html`
        <div role="alert" aria-live="polite" class="grid gap-3 rounded-lg bg-[var(--status-error-bg,transparent)] p-3 text-sm text-[var(--status-error-text,currentColor)]">
          <p>${m['erroTarefa']}</p>
          <button type="button" class=${BTN} @click=${() => this.obterTarefa(this.selectedTarefa)}>${m['tentarNovamente']}</button>
        </div>`;
    } else if (!t) {
      body = html`<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${m['nenhumaSelecionada']}</p>`;
    } else {
      body = nothing;
    }
    const ok = this.obterTarefaStatus !== 'loading' && this.obterTarefaStatus !== 'error' && t;
    return html`
      <div class="grid gap-5">
        ${body}
        <div data-organism-id="detalheTarefa">${ok ? this.renderDetalhe(t) : nothing}</div>
        <div data-organism-id="acoesGestor">${ok ? this.renderAcoes(t) : nothing}</div>
        <div data-organism-id="historicoTarefa">${ok ? this.renderHistorico(t) : nothing}</div>
      </div>
    `;
  }

  private dl(label: string, value: unknown) {
    return html`
      <div class="flex items-start justify-between gap-4 border-b border-[var(--border-subtle,currentColor)] py-2 last:border-b-0">
        <dt class="text-sm text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="min-w-0 break-words text-right text-sm text-[var(--text-strong,currentColor)]">${value}</dd>
      </div>
    `;
  }

  private renderDetalhe(t: TarefaDetalhe) {
    const m = this.msg;
    return html`
      <div class="grid gap-4">
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2 pb-2">
              <span class=${statusClass(t.status)}>${statusLabel(m, t.status)}</span>
              <span class=${prioridadeClass(t.prioridade)}>${prioridadeLabel(m, t.prioridade)}</span>
            </div>
            ${t.details.descricao ? html`<p class="whitespace-pre-line break-words py-2 text-sm">${t.details.descricao}</p>` : nothing}
            ${t.details.motivoDevolucao
              ? html`<p class="my-2 rounded-lg bg-[var(--status-warning-bg,transparent)] p-2 text-sm text-[var(--status-warning-text,currentColor)]"><strong>${m['motivoDevolucao']}:</strong> ${t.details.motivoDevolucao}</p>`
              : nothing}
            <dl>
              ${this.dl(m['criador'], t.criador.details.identification.name)}
              ${this.dl(m['responsavel'], t.responsavel.details.identification.name)}
              ${this.dl(m['colPrazo'], fmtDate(t.prazo))}
              ${this.dl(m['colSituacao'], statusLabel(m, t.status))}
              ${this.dl(m['subtarefas'], t.details.quantidadeSubtarefas)}
              ${this.dl(m['criadaEm'], fmtDateTime(t.criadaEm))}
            </dl>
          </CardContent>
        </groupviewcard--ml-vertical-card>

        <section class="grid gap-2">
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m['checklist']} · ${t.details.progressoChecklist}</h3>
          <groupviewdata--ml-vertical-record-list .hoverable=${false}>
            <Columns>
              <Column field="situacao" header=${m['colFeito']} width="96px" />
              <Column field="descricao" header=${m['colItem']} />
            </Columns>
            <Rows>
              ${t.itensChecklist.map((i) => html`
                <Row>
                  <Cell><span class=${i.feito ? statusClass('concluida') : statusClass('aFazer')}>${i.feito ? m['feito'] : m['pendente']}</span></Cell>
                  <Cell><span class="break-words text-sm">${i.details.descricao}</span></Cell>
                </Row>`)}
            </Rows>
            <Empty><div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${m['semChecklist']}</div></Empty>
          </groupviewdata--ml-vertical-record-list>
        </section>
      </div>
    `;
  }

  private renderAcoes(t: TarefaDetalhe) {
    const m = this.msg;
    const draft = this.reatribuirTarefaDraft;
    const reatribuindo = this.reatribuirTarefaStatus === 'loading';
    const cancelando = this.cancelarTarefaStatus === 'loading';
    return html`
      <section class="grid gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m['acoesGestor']}</h3>
        ${t.details.aberta
          ? html`
              <div class="grid gap-3">
                <groupselectone--ml-select-one-autocomplete
                  .value=${draft.responsavelId}
                  ?disabled=${reatribuindo}
                  @change=${(e: CustomEvent<{ value: string | null }>) => this.setReatribuirTarefaDraft({ ...draft, responsavelId: e.detail.value })}
                >
                  <Label>${m['novoResponsavel']}</Label>
                  <Helper>${m['somenteAtivos']}</Helper>
                  ${this.membros.map((mb) => html`<Item value=${mb.id} ?disabled=${mb.details.identification.status !== 'Active'}>${mb.details.identification.name}</Item>`)}
                  <Empty>${m['nenhumMembro']}</Empty>
                </groupselectone--ml-select-one-autocomplete>
                ${this.reatribuirTarefaStatus === 'error'
                  ? html`<p role="alert" aria-live="polite" class="text-sm text-[var(--status-error-text,currentColor)]">${m['erroReatribuir']}</p>`
                  : nothing}
                <grouptriggeraction--ml-button-standard
                  size="lg" data-variant="primary" data-class="w-full"
                  ?disabled=${!draft.responsavelId}
                  ?loading=${reatribuindo}
                  @action=${() => this.reatribuirTarefa()}
                ><Label>${m['reatribuir']}</Label></grouptriggeraction--ml-button-standard>
              </div>
              <div class="grid gap-3 border-t border-[var(--border-subtle,currentColor)] pt-3">
                ${this.cancelarTarefaStatus === 'error'
                  ? html`<p role="alert" aria-live="polite" class="text-sm text-[var(--status-error-text,currentColor)]">${m['erroCancelar']}</p>`
                  : nothing}
                <grouptriggeraction--ml-button-standard
                  size="lg" data-variant="danger" data-class="w-full"
                  ?loading=${cancelando}
                  @action=${(e: Event) => setModal(e, true)}
                ><Label>${m['cancelar']}</Label></grouptriggeraction--ml-button-standard>
              </div>`
          : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m['encerrada']}</p>`}

        <groupnotifyuser--ml-alert-modal type="warning" @dismiss=${(e: Event) => setModal(e, false)}>
          <Title>${m['confirmaTitulo']}</Title>
          <Message>${m['confirmaPre']} “${t.titulo}”. ${m['confirmaPos']}</Message>
          <Action>
            <div class="flex gap-2">
              <grouptriggeraction--ml-button-standard size="md" data-variant="secondary"
                @action=${(e: Event) => setModal(e, false)}><Label>${m['manter']}</Label></grouptriggeraction--ml-button-standard>
              <grouptriggeraction--ml-button-standard size="md" data-variant="danger"
                @action=${(e: Event) => { setModal(e, false); this.cancelarTarefa(); }}><Label>${m['confirmarCancelar']}</Label></grouptriggeraction--ml-button-standard>
            </div>
          </Action>
        </groupnotifyuser--ml-alert-modal>

        <groupnotifyuser--ml-toast-notification type="success" position="bottom" .duration=${4000}
          ?visible=${this.reatribuirTarefaStatus === 'success'}>
          <Message>${m['okReatribuir']}</Message>
        </groupnotifyuser--ml-toast-notification>
        <groupnotifyuser--ml-toast-notification type="success" position="bottom" .duration=${4000}
          ?visible=${this.cancelarTarefaStatus === 'success'}>
          <Message>${m['okCancelar']}</Message>
        </groupnotifyuser--ml-toast-notification>
      </section>
    `;
  }

  private renderHistorico(t: TarefaDetalhe) {
    const m = this.msg;
    const eventos = eventosHistorico(m, t);
    return html`
      <section class="grid gap-2">
        <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m['historico']}</h3>
        <groupviewdata--ml-timeline-view>
          <Columns>
            <Column field="quando" header=${m['quando']} />
            <Column field="evento" header=${m['evento']} />
          </Columns>
          <Rows>
            ${eventos.map((ev) => html`
              <Row>
                <Cell><span class="text-xs text-[var(--text-muted,currentColor)]">${ev.quando}</span></Cell>
                <Cell>
                  <div class="text-sm font-medium text-[var(--text-strong,currentColor)]">${ev.evento}</div>
                  ${ev.detalhe ? html`<div class="break-words text-xs text-[var(--text-muted,currentColor)]">${ev.detalhe}</div>` : nothing}
                </Cell>
              </Row>`)}
          </Rows>
          <Empty><div class="py-4 text-center text-sm text-[var(--text-muted,currentColor)]">${m['semHistorico']}</div></Empty>
        </groupviewdata--ml-timeline-view>
      </section>
    `;
  }
}

/// **collab_i18n_start**
const pageMessage_pt_br = {
  sceneQuadro: 'Tarefas da equipe',
  sceneTarefa: 'Tarefa',
  voltarLista: 'Voltar às tarefas',
  filtros: 'Filtros',
  filtroLista: 'Lista',
  filtroResponsavel: 'Responsável',
  filtroPrioridade: 'Prioridade',
  filtroSituacao: 'Situação',
  filtroPrazo: 'Prazo',
  de: 'De',
  ate: 'Até',
  todas: 'Todas',
  todos: 'Todos',
  venceHoje: 'Vence hoje',
  atrasada: 'Atrasada',
  atrasadas: 'Somente atrasadas',
  limparFiltros: 'Limpar filtros',
  colTarefa: 'Tarefa',
  colResponsavel: 'Responsável',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colPrioridade: 'Prioridade',
  colChecklist: 'Progresso da checklist',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prBaixa: 'Baixa',
  prMedia: 'Média',
  prAlta: 'Alta',
  vazio: 'Nenhuma tarefa encontrada com esses filtros.',
  carregando: 'Carregando…',
  erroLista: 'Não foi possível carregar as tarefas da equipe.',
  precondicao: 'Esta tela foi aberta sem o que ela precisa para mostrar as tarefas da equipe. Volte para a tela anterior e abra-a de novo.',
  tentarNovamente: 'Tentar novamente',
  voltar: 'Voltar',
  maisTarefas: 'Mostrar mais tarefas',
  erroTarefa: 'Não foi possível abrir a tarefa.',
  nenhumaSelecionada: 'Toque numa tarefa da lista para ver o detalhe.',
  motivoDevolucao: 'Motivo da devolução',
  criador: 'Criada por',
  responsavel: 'Responsável',
  subtarefas: 'Subtarefas',
  criadaEm: 'Criada em',
  checklist: 'Checklist',
  colFeito: 'Situação',
  colItem: 'Item',
  feito: 'Feito',
  pendente: 'Pendente',
  semChecklist: 'Esta tarefa não tem itens na checklist.',
  acoesGestor: 'Ações do gestor',
  novoResponsavel: 'Novo responsável',
  somenteAtivos: 'Só membros ativos da equipe podem receber a tarefa; o novo responsável é avisado.',
  nenhumMembro: 'Nenhum membro encontrado',
  reatribuir: 'Trocar responsável',
  cancelar: 'Cancelar tarefa',
  encerrada: 'Tarefa encerrada: não é possível trocar o responsável nem cancelar.',
  erroReatribuir: 'Não foi possível trocar o responsável. Confira a escolha e tente de novo.',
  erroCancelar: 'Não foi possível cancelar a tarefa. Tente de novo.',
  confirmaTitulo: 'Cancelar esta tarefa?',
  confirmaPre: 'Você vai cancelar a tarefa',
  confirmaPos: 'Depois de cancelada, ela não muda mais de situação.',
  manter: 'Manter tarefa',
  confirmarCancelar: 'Sim, cancelar tarefa',
  okReatribuir: 'Responsável trocado. O novo responsável foi avisado.',
  okCancelar: 'Tarefa cancelada.',
  historico: 'Histórico',
  quando: 'Quando',
  evento: 'Evento',
  evCriada: 'Tarefa criada',
  evDevolvida: 'Devolvida para ajuste',
  evConcluida: 'Tarefa concluída',
  evCancelada: 'Tarefa cancelada',
  semHistorico: 'Nenhum marco registrado.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
