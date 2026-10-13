/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/minhas_despesas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasMinhas_despesasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import type { ExpenseStatus, DespesaDetailsDraft, DespesaDetalhe, ErrorState } from '/_102047_/l2/reembolsoDespesas/web/shared/minhas_despesas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectfileforupload/ml-file-upload-preview.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  voltar: 'Voltar',
  tituloLista: 'Minhas despesas',
  tituloDetalhe: 'Despesa',
  tituloRegistrar: 'Nova despesa',
  tituloCorrigir: 'Corrigir despesa',
  novaDespesa: 'Nova despesa',
  filtroSituacao: 'Situação',
  todasSituacoes: 'Todas',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  colDespesa: 'Despesa',
  colValorSituacao: 'Valor e situação',
  carregando: 'Carregando…',
  vazio: 'Nenhuma despesa por aqui.',
  vazioDica: 'Registre uma despesa nova para começar.',
  maisDespesas: 'Ver mais despesas',
  tentarNovamente: 'Tentar novamente',
  erroLista: 'Não foi possível carregar suas despesas.',
  erroDespesa: 'Não foi possível abrir a despesa.',
  erroGenerico: 'Algo deu errado. Tente novamente.',
  semDespesaAberta: 'Escolha uma despesa na lista para ver os detalhes.',
  valor: 'Valor',
  dataDespesa: 'Data da despesa',
  categoria: 'Categoria',
  descricao: 'Descrição',
  motivoRejeicao: 'Motivo da rejeição',
  reenvioRealizado: 'Reenvio realizado',
  sim: 'Sim',
  nao: 'Não',
  dataPagamento: 'Data de pagamento',
  historico: 'Andamento',
  proximoPasso: 'Próximo passo',
  dicaRascunho: 'Para enviar, a despesa precisa ter o comprovante anexado.',
  dicaRejeitada: 'Corrija o que for preciso e reenvie. O reenvio só pode ser feito uma vez.',
  enviarAprovacao: 'Enviar para aprovação',
  reenviarAprovacao: 'Reenviar para aprovação',
  corrigirDados: 'Corrigir dados',
  enviadoOk: 'Despesa enviada para aprovação do gestor.',
  aguardandoGestor: 'Esta despesa está com o gestor para análise.',
  reenviadaAnalise: 'Esta despesa foi reenviada para nova análise do gestor.',
  semAcoes: 'Nenhuma ação pendente para esta despesa.',
  categoriaPlaceholder: 'Ex.: Transporte, Alimentação',
  descricaoPlaceholder: 'Conte rapidamente do que se trata',
  comprovante: 'Comprovante',
  comprovanteTrigger: 'Toque para anexar o comprovante',
  comprovanteAjuda: 'Obrigatório para enviar a despesa para aprovação.',
  registrarDespesa: 'Registrar despesa',
  salvarCorrecao: 'Salvar correção',
  formulario: 'Dados da despesa'
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };

const lang = () => document.documentElement.lang || undefined;

function fmtDate(s: string | undefined | null): string {
  if (!s) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtMoney(s: string): string {
  const n = Number(s);
  if (s === '' || Number.isNaN(n)) return s;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function toNum(v: string | null): number | null {
  if (v === null || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function fromNum(n: number | null): string | null {
  return n === null || n === undefined ? null : String(n);
}

function statusLabel(msg: PageMessageType, s: ExpenseStatus): string {
  switch (s) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaitingApproval;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
  }
}

function statusTone(s: ExpenseStatus): string {
  switch (s) {
    case 'draft': return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'paid': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
  }
}

function badge(msg: PageMessageType, s: ExpenseStatus) {
  return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone(s)}">${statusLabel(msg, s)}</span>`;
}

function errText(msg: PageMessageType, e: ErrorState): string {
  return e && e.message ? e.message : msg.erroGenerico;
}

@customElement('reembolso-despesas--web--mobile--page11--minhas_despesas-102047')
export class ReembolsoDespesasMobilePage11Minhas_despesasPage extends ReembolsoDespesasMinhas_despesasShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-screen w-full max-w-[430px] mx-auto px-4 pt-4 pb-10 box-border bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .backLabel=${this.msg['voltar']}
          .value=${this.scenary || 'lista'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="lista" title=${this.msg['tituloLista']}>${this.renderLista()}</Scene>
          <Scene value="detalhe" title=${this.msg['tituloDetalhe']} nav="back" backTo="lista">${this.renderDetalhe()}</Scene>
          <Scene value="registrar" title=${this.msg['tituloRegistrar']} nav="back" backTo="lista">${this.renderForm('registrar')}</Scene>
          <Scene value="corrigir" title=${this.msg['tituloCorrigir']} nav="back" backTo="detalhe">${this.renderForm('corrigir')}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private btn(label: string, variant: string, loading: boolean, onAction: () => void) {
    return html`
      <grouptriggeraction--ml-button-standard
        data-variant=${variant}
        size="lg"
        data-class="w-full"
        .loading=${loading}
        @action=${onAction}
      ><Label>${label}</Label></grouptriggeraction--ml-button-standard>
    `;
  }

  private feedback(type: string, text: string, title?: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type=${type} .visible=${true} .dismissible=${false}>
        ${title ? html`<Title>${title}</Title>` : nothing}
        <Message>${text}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
  }

  private renderLista() {
    const items = this.despesas?.items ?? [];
    const filters: Array<{ v: ExpenseStatus | ''; label: string }> = [
      { v: '', label: this.msg['todasSituacoes'] },
      { v: 'draft', label: this.msg['statusDraft'] },
      { v: 'awaitingApproval', label: this.msg['statusAwaitingApproval'] },
      { v: 'rejected', label: this.msg['statusRejected'] },
      { v: 'approved', label: this.msg['statusApproved'] },
      { v: 'paid', label: this.msg['statusPaid'] }
    ];
    return html`
      <section data-organism-id="listaMinhasDespesas" class="flex flex-col gap-4">
        <div class="flex items-end gap-3">
          <div class="flex-1 min-w-0 flex flex-col gap-1">
            <label for="filtro-situacao" class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['filtroSituacao']}</label>
            <select
              id="filtro-situacao"
              class="w-full min-h-[44px] rounded-lg border px-3 bg-[var(--input-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] outline-none"
              @change=${(e: Event) => {
                const v = (e.target as HTMLSelectElement).value;
                this.listarMinhasDespesas(v === '' ? null : (v as ExpenseStatus));
              }}
            >
              ${filters.map(f => html`<option value=${f.v} ?selected=${(this.status ?? '') === f.v}>${f.label}</option>`)}
            </select>
          </div>
          <div class="shrink-0">
            <grouptriggeraction--ml-button-standard size="lg" @action=${() => this.setScenario('registrar')}>
              <Label>${this.msg['novaDespesa']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>

        ${this.listarMinhasDespesasError
          ? html`
              <div class="flex flex-col gap-3 rounded-lg border p-4 border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]" aria-live="polite">
                <p class="text-sm">${this.msg['erroLista']} ${errText(this.msg, this.listarMinhasDespesasError)}</p>
                ${this.btn(this.msg['tentarNovamente'], 'secondary', this.listarMinhasDespesasStatus === 'loading', () => { this.listarMinhasDespesas(); })}
              </div>`
          : nothing}

        <div class="rounded-lg border overflow-hidden border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewdata--ml-vertical-record-list .hoverable=${true} .loading=${this.pageStatus === 'loading'}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const item = items[e.detail.index];
              if (item) {
                this.setScenario('detalhe');
                this.obterDespesa(item.id);
              }
            }}
          >
            <Columns>
              <Column field="resumo" header=${this.msg['colDespesa']} />
              <Column field="valorSituacao" header=${this.msg['colValorSituacao']} align="right" width="150px" />
            </Columns>
            <Rows>
              ${items.map(r => html`
                <Row ?selected=${r.id === this.selectedDespesa}>
                  <Cell>
                    <div class="font-medium text-[var(--text-strong,currentColor)]">${r.details.details.categoria}</div>
                    <div class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(r.details.details.dataDespesa)}</div>
                  </Cell>
                  <Cell>
                    <div class="text-right font-semibold text-[var(--text-strong,currentColor)]">${fmtMoney(r.details.details.valor)}</div>
                    <div class="mt-1 flex justify-end">${badge(this.msg, r.status)}</div>
                  </Cell>
                </Row>`)}
            </Rows>
            <Empty>
              <div class="text-center py-8 px-4">
                <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['vazio']}</p>
                <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['vazioDica']}</p>
              </div>
            </Empty>
            <Loading>
              <div class="text-center py-8 text-[var(--text-muted,currentColor)]">${this.msg['carregando']}</div>
            </Loading>
          </groupviewdata--ml-vertical-record-list>
        </div>

        ${items.length > 0
          ? this.btn(this.msg['maisDespesas'], 'secondary', this.listarMinhasDespesasStatus === 'loading', () => { this.listarMinhasDespesas(undefined, undefined, true); })
          : nothing}
      </section>
    `;
  }

  private renderDetalhe() {
    const d = this.despesa;
    const loading = this.obterDespesaStatus === 'loading';
    const ready = d !== null && !loading && !this.obterDespesaError;
    return html`
      <div class="flex flex-col gap-6">
        <section data-organism-id="detalheDespesa" class="flex flex-col gap-4" aria-busy=${loading ? 'true' : 'false'}>
          ${loading
            ? html`<p class="py-8 text-center text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg['carregando']}</p>`
            : this.obterDespesaError
              ? html`
                  <div class="flex flex-col gap-3" aria-live="polite">
                    <p class="text-sm">${this.msg['erroDespesa']} ${errText(this.msg, this.obterDespesaError)}</p>
                    ${this.btn(this.msg['tentarNovamente'], 'secondary', false, () => { this.obterDespesa(this.selectedDespesa); })}
                  </div>`
              : d
                ? this.renderDespesa(d)
                : html`<p class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['semDespesaAberta']}</p>`}
        </section>
        <section data-organism-id="acoesEnvio" class="flex flex-col gap-3">
          ${ready && d ? this.renderAcoes(d) : nothing}
        </section>
      </div>
    `;
  }

  private renderDespesa(d: DespesaDetalhe) {
    const x = d.details.details;
    const mostrarReenvio = d.status === 'rejected' || x.reenvioRealizado;
    return html`
      <groupviewcard--ml-vertical-card>
        <CardHeader>
          <CardTitle>${x.categoria}</CardTitle>
          <CardDescription>${badge(this.msg, d.status)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-end justify-between gap-4">
            <div>
              <div class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['valor']}</div>
              <div class="text-3xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(x.valor)}</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['dataDespesa']}</div>
              <div class="font-medium text-[var(--text-strong,currentColor)]">${fmtDate(x.dataDespesa)}</div>
            </div>
          </div>
        </CardContent>
      </groupviewcard--ml-vertical-card>

      ${x.motivoRejeicao ? this.feedback('warning', x.motivoRejeicao, this.msg['motivoRejeicao']) : nothing}

      <div class="flex flex-col gap-1">
        <h3 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['descricao']}</h3>
        <p class="whitespace-pre-line break-words text-[var(--text-default,currentColor)]">${x.descricao}</p>
      </div>

      ${mostrarReenvio || x.dataPagamento
        ? html`
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['historico']}</h3>
              <dl class="m-0 flex flex-col gap-2 text-sm">
                ${mostrarReenvio
                  ? html`<div class="flex justify-between gap-4 border-b pb-2 border-[var(--border-subtle,currentColor)]">
                      <dt class="text-[var(--text-muted,currentColor)]">${this.msg['reenvioRealizado']}</dt>
                      <dd class="m-0 text-[var(--text-strong,currentColor)]">${x.reenvioRealizado ? this.msg['sim'] : this.msg['nao']}</dd>
                    </div>`
                  : nothing}
                ${x.dataPagamento
                  ? html`<div class="flex justify-between gap-4 border-b pb-2 border-[var(--border-subtle,currentColor)]">
                      <dt class="text-[var(--text-muted,currentColor)]">${this.msg['dataPagamento']}</dt>
                      <dd class="m-0 text-[var(--text-strong,currentColor)]">${fmtDate(x.dataPagamento)}</dd>
                    </div>`
                  : nothing}
              </dl>
            </div>`
        : nothing}
    `;
  }

  private renderAcoes(d: DespesaDetalhe) {
    const ok = this.enviarParaAprovacaoStatus === 'success' || this.reenviarParaAprovacaoStatus === 'success';
    const head = html`<h3 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['proximoPasso']}</h3>`;
    const okBox = ok ? this.feedback('success', this.msg['enviadoOk']) : nothing;

    if (d.status === 'draft') {
      return html`
        ${head}${okBox}
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['dicaRascunho']}</p>
        <div aria-live="polite">${this.enviarParaAprovacaoError ? this.feedback('error', errText(this.msg, this.enviarParaAprovacaoError)) : nothing}</div>
        ${this.btn(this.msg['enviarAprovacao'], 'primary', this.enviarParaAprovacaoStatus === 'loading', () => { this.enviarParaAprovacao(); })}
      `;
    }

    if (d.status === 'rejected' && !d.details.details.reenvioRealizado) {
      return html`
        ${head}${okBox}
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['dicaRejeitada']}</p>
        <div aria-live="polite">${this.reenviarParaAprovacaoError ? this.feedback('error', errText(this.msg, this.reenviarParaAprovacaoError)) : nothing}</div>
        ${this.btn(this.msg['corrigirDados'], 'secondary', false, () => { this.setScenario('corrigir'); })}
        ${this.btn(this.msg['reenviarAprovacao'], 'primary', this.reenviarParaAprovacaoStatus === 'loading', () => { this.reenviarParaAprovacao(); })}
      `;
    }

    const statement =
      d.status === 'awaitingApproval' ? this.msg['aguardandoGestor']
      : d.status === 'rejected' ? this.msg['reenviadaAnalise']
      : this.msg['semAcoes'];
    return html`
      ${head}${okBox}
      <p class="text-sm text-[var(--text-default,currentColor)]">${statement}</p>
    `;
  }

  private renderForm(mode: 'registrar' | 'corrigir') {
    const registrar = mode === 'registrar';
    const draft = registrar ? this.registrarDespesaDraft : this.salvarCorrecaoDraft;
    const d = draft.details;
    const set = (patch: Partial<DespesaDetailsDraft>) => {
      const next = { details: { ...draft.details, ...patch } };
      if (registrar) this.setRegistrarDespesaDraft(next);
      else this.setSalvarCorrecaoDraft(next);
    };
    const onMoney = (e: CustomEvent<{ value: number | null }>) => set({ valor: fromNum(e.detail.value) });
    const onText = (field: 'categoria' | 'descricao') => (e: CustomEvent<{ value: string }>) =>
      set(field === 'categoria' ? { categoria: e.detail.value } : { descricao: e.detail.value });
    const status = registrar ? this.registrarDespesaStatus : this.salvarCorrecaoStatus;
    const error = registrar ? this.registrarDespesaError : this.salvarCorrecaoError;
    const motivo = !registrar ? this.despesa?.details.details.motivoRejeicao : undefined;

    const submit = () => {
      if (registrar) {
        this.registrarDespesa().then(() => {
          if (this.registrarDespesaStatus === 'success') this.setScenario('detalhe');
        });
      } else {
        this.salvarCorrecao().then(() => {
          if (this.salvarCorrecaoStatus === 'success') this.setScenario('detalhe');
        });
      }
    };

    return html`
      <section data-organism-id="formularioDespesa" class="flex flex-col gap-5">
        ${motivo ? this.feedback('warning', motivo, this.msg['motivoRejeicao']) : nothing}
        <form
          class="flex flex-col gap-5"
          aria-label=${this.msg['formulario']}
          aria-busy=${status === 'loading' ? 'true' : 'false'}
          @submit=${(e: Event) => e.preventDefault()}
        >
          <groupenterdate--ml-date-shortcut-picker
            .value=${d.dataDespesa}
            locale="pt-BR"
            required
            @change=${(e: CustomEvent<{ value: string | null }>) => set({ dataDespesa: e.detail.value })}
          ><Label>${this.msg['dataDespesa']}</Label></groupenterdate--ml-date-shortcut-picker>

          <groupentertext--ml-enter-text
            .value=${d.categoria ?? ''}
            placeholder=${this.msg['categoriaPlaceholder']}
            required
            @input=${onText('categoria')}
            @change=${onText('categoria')}
          ><Label>${this.msg['categoria']}</Label></groupentertext--ml-enter-text>

          <groupentermoney--ml-enter-money-br
            .value=${toNum(d.valor)}
            currency="BRL"
            locale="pt-BR"
            required
            @input=${onMoney}
            @change=${onMoney}
          ><Label>${this.msg['valor']}</Label></groupentermoney--ml-enter-money-br>

          <groupentertext--ml-multiline-text
            .value=${d.descricao ?? ''}
            .rows=${4}
            placeholder=${this.msg['descricaoPlaceholder']}
            required
            @input=${onText('descricao')}
            @change=${onText('descricao')}
          ><Label>${this.msg['descricao']}</Label></groupentertext--ml-multiline-text>

          <groupselectfileforupload--ml-file-upload-preview accept="image/*,.pdf">
            <Label>${this.msg['comprovante']}</Label>
            <Trigger>${this.msg['comprovanteTrigger']}</Trigger>
            <Helper>${this.msg['comprovanteAjuda']}</Helper>
          </groupselectfileforupload--ml-file-upload-preview>

          <div aria-live="polite">${error ? this.feedback('error', errText(this.msg, error)) : nothing}</div>
          ${this.btn(registrar ? this.msg['registrarDespesa'] : this.msg['salvarCorrecao'], 'primary', status === 'loading', submit)}
        </form>
      </section>
    `;
  }
}
