/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { DespesaResumo, ExpenseStatus, DespesaDetailsDraft, ErrorState } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  titulo: 'Minhas despesas',
  registrar: 'Registrar despesa',
  listaTitulo: 'Despesas registradas',
  filtroSituacao: 'Filtrar por situação',
  todas: 'Todas as situações',
  colData: 'Data da despesa',
  colCategoria: 'Categoria',
  colValor: 'Valor',
  colSituacao: 'Situação',
  vazio: 'Nenhuma despesa para mostrar.',
  tentar: 'Tentar novamente',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  cenaDetalhe: 'Detalhes da despesa',
  semSelecao: 'Escolha uma despesa na lista para ler os dados, o motivo da rejeição e as ações disponíveis.',
  semSelecaoAcoes: 'As ações de envio aparecem quando uma despesa está aberta.',
  abrindo: 'Abrindo a despesa…',
  descricao: 'Descrição',
  motivo: 'Motivo da rejeição',
  valor: 'Valor',
  dataDespesa: 'Data da despesa',
  categoria: 'Categoria',
  dataPagamento: 'Data de pagamento',
  reenvio: 'Reenvio realizado',
  sim: 'Sim',
  nao: 'Não',
  avisoRascunho: 'Esta despesa ainda é um rascunho. Para enviá-la ao gestor, ela precisa ter comprovante.',
  enviar: 'Enviar para aprovação',
  avisoRejeitada: 'Corrija os dados, se precisar, e reenvie. O reenvio só pode ser feito uma vez.',
  corrigir: 'Corrigir despesa',
  reenviar: 'Reenviar para aprovação',
  jaReenviada: 'Esta despesa já foi corrigida e reenviada uma vez, e não pode ser reenviada de novo.',
  aguardando: 'Enviada ao gestor, aguardando a decisão.',
  aprovada: 'Aprovada pelo gestor.',
  paga: 'Despesa paga.',
  pagaEm: 'Paga em',
  tituloRegistro: 'Nova despesa',
  tituloCorrecao: 'Corrigir despesa rejeitada',
  dicaRegistro: 'Informe data, categoria, valor e descrição. Depois de registrada, a despesa fica em rascunho até ser enviada.',
  dicaCorrecao: 'Ajuste os dados e salve a correção. Em seguida, reenvie a despesa para aprovação.',
  motivoGestor: 'Motivo informado pelo gestor',
  selecioneData: 'Selecione a data',
  exemploCategoria: 'Ex.: Transporte',
  salvarRegistro: 'Registrar despesa',
  salvarCorrecao: 'Salvar correção',
  voltar: 'Voltar'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

const statusKey: Record<ExpenseStatus, keyof PageMessageType> = {
  draft: 'statusDraft',
  awaitingApproval: 'statusAwaiting',
  rejected: 'statusRejected',
  approved: 'statusApproved',
  paid: 'statusPaid'
};

const statusTone: Record<ExpenseStatus, string> = {
  draft: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  awaitingApproval: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  rejected: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
  approved: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  paid: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
};

const statusOptions: ExpenseStatus[] = ['draft', 'awaitingApproval', 'rejected', 'approved', 'paid'];

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtMoney(v: string): string {
  const n = Number(v);
  if (v === '' || Number.isNaN(n)) return v;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function fmtDate(v: string | undefined): string {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return v;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function rowsOf(d: unknown): DespesaResumo[] {
  const items = (d as { items?: DespesaResumo[] } | null)?.items;
  return Array.isArray(items) ? items : [];
}

function toNum(v: string | null): number | null {
  if (v === null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

@customElement('reembolso-despesas--web--desktop--page11--minhas_despesas-102047')
export class ReembolsoDespesasDesktopPage11Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg: PageMessageType = pageMessage_pt;

  private pill(s: ExpenseStatus) {
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[s]}">${this.msg[statusKey[s]]}</span>`;
  }

  private errorLine(e: ErrorState) {
    return e
      ? html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert">${e.message}</p>`
      : nothing;
  }

  private renderLista() {
    const rows = rowsOf(this.despesas);
    const sel = rows.findIndex((r) => r.id === this.selectedDespesa);
    const loading = this.listarMinhasDespesasStatus === 'loading';
    return html`
      <section data-organism-id="listaMinhasDespesas" class="flex flex-col gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.listaTitulo}</h2>
          <select
            aria-label=${this.msg.filtroSituacao}
            class="min-h-10 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-sm text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            ?disabled=${loading}
            @change=${(e: Event) => {
              const v = (e.target as HTMLSelectElement).value;
              this.listarMinhasDespesas(v === '' ? null : (v as ExpenseStatus));
            }}
          >
            <option value="" ?selected=${this.status === null}>${this.msg.todas}</option>
            ${statusOptions.map(
              (s) => html`<option value=${s} ?selected=${this.status === s}>${this.msg[statusKey[s]]}</option>`
            )}
          </select>
        </div>
        <groupviewtable--ml-data-table
          .value=${sel >= 0 ? String(sel) : ''}
          .loading=${loading}
          @rowClick=${(e: CustomEvent<{ index: number }>) => {
            const r = rows[e.detail.index];
            if (r) {
              this.setScenario('detalhe');
              this.obterDespesa(r.id);
            }
          }}
          @change=${(e: Event) => e.stopPropagation()}
        >
          <TableHeader>
            <TableRow>
              <TableHead key="dataDespesa">${this.msg.colData}</TableHead>
              <TableHead key="categoria">${this.msg.colCategoria}</TableHead>
              <TableHead key="valor">${this.msg.colValor}</TableHead>
              <TableHead key="status">${this.msg.colSituacao}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${rows.map(
              (r) => html`
                <TableRow key=${r.id}>
                  <TableCell>${fmtDate(r.details.details.dataDespesa)}</TableCell>
                  <TableCell>${r.details.details.categoria}</TableCell>
                  <TableCell>${fmtMoney(r.details.details.valor)}</TableCell>
                  <TableCell>${this.pill(r.status)}</TableCell>
                </TableRow>
              `
            )}
          </TableBody>
          <Empty>${this.msg.vazio}</Empty>
        </groupviewtable--ml-data-table>
        ${this.listarMinhasDespesasError
          ? html`<div class="flex items-center gap-3">
              ${this.errorLine(this.listarMinhasDespesasError)}
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.listarMinhasDespesas()}>
                <Label>${this.msg.tentar}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </section>
    `;
  }

  private renderAcoes() {
    const d = this.despesa;
    if (!d) {
      return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.semSelecaoAcoes}</p>`;
    }
    const busy = this.enviarParaAprovacaoStatus === 'loading' || this.reenviarParaAprovacaoStatus === 'loading';
    const info = d.details.details;
    let body;
    if (d.status === 'draft') {
      body = html`
        <p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.avisoRascunho}</p>
        ${this.errorLine(this.enviarParaAprovacaoError)}
        <div>
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="md"
            .loading=${this.enviarParaAprovacaoStatus === 'loading'}
            .disabled=${busy}
            @action=${() => this.enviarParaAprovacao()}
          >
            <Label>${this.msg.enviar}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    } else if (d.status === 'rejected' && !info.reenvioRealizado) {
      body = html`
        <p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.avisoRejeitada}</p>
        ${this.errorLine(this.reenviarParaAprovacaoError)}
        <div class="flex flex-wrap gap-3">
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="md"
            .disabled=${busy}
            @action=${() => this.setScenario('formulario')}
          >
            <Label>${this.msg.corrigir}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="md"
            .loading=${this.reenviarParaAprovacaoStatus === 'loading'}
            .disabled=${busy}
            @action=${() => this.reenviarParaAprovacao()}
          >
            <Label>${this.msg.reenviar}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    } else if (d.status === 'rejected') {
      body = html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.jaReenviada}</p>`;
    } else if (d.status === 'awaitingApproval') {
      body = html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.aguardando}</p>`;
    } else if (d.status === 'approved') {
      body = html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.aprovada}</p>`;
    } else {
      body = html`<p class="text-sm text-[var(--text-default,currentColor)]">
        ${info.dataPagamento ? `${this.msg.pagaEm} ${fmtDate(info.dataPagamento)}.` : this.msg.paga}
      </p>`;
    }
    return html`<div class="flex flex-col gap-3" aria-live="polite" aria-busy=${busy ? 'true' : 'false'}>${body}</div>`;
  }

  private renderDetalhe() {
    const d = this.despesa;
    let detalhe;
    if (this.obterDespesaStatus === 'loading') {
      detalhe = html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg.abrindo}</p>`;
    } else if (this.obterDespesaError) {
      detalhe = this.errorLine(this.obterDespesaError);
    } else if (!d) {
      detalhe = html`<p class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.semSelecao}</p>`;
    } else {
      const info = d.details.details;
      detalhe = html`
        <div class="flex flex-col gap-6">
          <groupviewcard--ml-vertical-card>
            <CardHeader>
              <CardTitle>${info.categoria} · ${fmtDate(info.dataDespesa)}</CardTitle>
              <CardDescription>${this.pill(d.status)}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl class="grid grid-cols-2 gap-x-6 gap-y-4">
                <div class="col-span-2">
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.valor}</dt>
                  <dd class="text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(info.valor)}</dd>
                </div>
                <div>
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.dataDespesa}</dt>
                  <dd class="text-[var(--text-default,currentColor)]">${fmtDate(info.dataDespesa)}</dd>
                </div>
                <div>
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.categoria}</dt>
                  <dd class="text-[var(--text-default,currentColor)]">${info.categoria}</dd>
                </div>
                ${info.dataPagamento
                  ? html`<div>
                      <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.dataPagamento}</dt>
                      <dd class="text-[var(--text-default,currentColor)]">${fmtDate(info.dataPagamento)}</dd>
                    </div>`
                  : nothing}
                <div>
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.reenvio}</dt>
                  <dd class="text-[var(--text-default,currentColor)]">${info.reenvioRealizado ? this.msg.sim : this.msg.nao}</dd>
                </div>
              </dl>
            </CardContent>
          </groupviewcard--ml-vertical-card>
          <div>
            <h3 class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.descricao}</h3>
            <p class="mt-1 whitespace-pre-line text-[var(--text-default,currentColor)]">${info.descricao}</p>
          </div>
          ${info.motivoRejeicao
            ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}>
                <Title>${this.msg.motivo}</Title>
                <Message>${info.motivoRejeicao}</Message>
              </groupnotifyuser--ml-contextual-feedback>`
            : nothing}
        </div>
      `;
    }
    return html`
      <div class="flex flex-col gap-6">
        <div data-organism-id="detalheDespesa">${detalhe}</div>
        <div data-organism-id="acoesEnvio" class="border-t border-[var(--border-subtle,currentColor)] pt-5">${this.renderAcoes()}</div>
      </div>
    `;
  }

  private renderFormulario() {
    const correcting = this.despesa !== null;
    const draft = correcting ? this.salvarCorrecaoDraft : this.registrarDespesaDraft;
    const d = draft.details;
    const loading = correcting ? this.salvarCorrecaoStatus === 'loading' : this.registrarDespesaStatus === 'loading';
    const error = correcting ? this.salvarCorrecaoError : this.registrarDespesaError;
    const motivo = this.despesa?.details.details.motivoRejeicao;

    const setDetails = (patch: Partial<DespesaDetailsDraft>) => {
      const next = { details: { ...d, ...patch } };
      if (correcting) this.setSalvarCorrecaoDraft(next);
      else this.setRegistrarDespesaDraft(next);
    };
    const submit = () => {
      if (correcting) {
        this.salvarCorrecao().then(() => {
          if (this.salvarCorrecaoStatus === 'success') this.setScenario('detalhe');
        });
      } else {
        this.registrarDespesa().then(() => {
          if (this.registrarDespesaStatus === 'success') this.setScenario('detalhe');
        });
      }
    };

    return html`
      <div data-organism-id="formularioDespesa" class="flex flex-col gap-5">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${correcting ? this.msg.dicaCorrecao : this.msg.dicaRegistro}</p>
        ${correcting && motivo
          ? html`<div class="rounded-md border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3">
              <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.motivoGestor}</p>
              <p class="mt-1 whitespace-pre-line text-[var(--text-default,currentColor)]">${motivo}</p>
            </div>`
          : nothing}
        <div class="grid grid-cols-2 gap-4">
          <groupenterdate--ml-date-picker
            .value=${d.dataDespesa}
            locale="pt-BR"
            placeholder=${this.msg.selecioneData}
            .required=${true}
            .disabled=${loading}
            @change=${(e: CustomEvent<{ value: string | null }>) => setDetails({ dataDespesa: e.detail.value })}
          >
            <Label>${this.msg.dataDespesa}</Label>
          </groupenterdate--ml-date-picker>
          <groupentermoney--ml-enter-money-br
            .value=${toNum(d.valor)}
            currency="BRL"
            locale="pt-BR"
            .required=${true}
            .disabled=${loading}
            @change=${(e: CustomEvent<{ value: number | null }>) =>
              setDetails({ valor: e.detail.value === null ? null : String(e.detail.value) })}
          >
            <Label>${this.msg.valor}</Label>
          </groupentermoney--ml-enter-money-br>
        </div>
        <groupentertext--ml-enter-text
          .value=${d.categoria ?? ''}
          placeholder=${this.msg.exemploCategoria}
          .required=${true}
          .disabled=${loading}
          @change=${(e: CustomEvent<{ value: string }>) => setDetails({ categoria: e.detail.value === '' ? null : e.detail.value })}
        >
          <Label>${this.msg.categoria}</Label>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-multiline-text
          .value=${d.descricao ?? ''}
          .rows=${4}
          .required=${true}
          .disabled=${loading}
          @change=${(e: CustomEvent<{ value: string }>) => setDetails({ descricao: e.detail.value === '' ? null : e.detail.value })}
        >
          <Label>${this.msg.descricao}</Label>
        </groupentertext--ml-multiline-text>
        <div aria-live="polite" class="flex flex-col gap-3">
          ${this.errorLine(error)}
          <div>
            <grouptriggeraction--ml-button-standard data-variant="primary" size="md" .loading=${loading} .disabled=${loading} @action=${submit}>
              <Label>${correcting ? this.msg.salvarCorrecao : this.msg.salvarRegistro}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="mb-6 flex items-center justify-between gap-4">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.titulo}</h1>
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="md"
            @action=${() => {
              this.obterDespesa(null);
              this.setScenario('formulario');
            }}
          >
            <Label>${this.msg.registrar}</Label>
          </grouptriggeraction--ml-button-standard>
        </header>
        <div class="grid items-start gap-6 grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          ${this.renderLista()}
          <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
            <molecules--ml-scenary-102020
              mode="scenary"
              .value=${this.scenary || 'detalhe'}
              backLabel=${this.msg.voltar}
              @change=${(e: CustomEvent<{ value: string }>) => {
                if (e.target === e.currentTarget) this.setScenario(e.detail.value);
              }}
            >
              <Scene value="detalhe" title=${this.msg.cenaDetalhe}>${this.renderDetalhe()}</Scene>
              <Scene
                value="formulario"
                title=${this.despesa ? this.msg.tituloCorrecao : this.msg.tituloRegistro}
                nav="back"
                backTo="detalhe"
              >
                ${this.renderFormulario()}
              </Scene>
            </molecules--ml-scenary-102020>
          </div>
        </div>
      </div>
    `;
  }
}
