/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page31/despesas_aprovadas.ts" enhancement="_102020_/l2/enhancementAura"/>


import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_aprovadasShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_aprovadas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupnavigatesteps/ml-wizard-steps.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  queueIntro: 'Escolha a despesa que você vai pagar agora.',
  filterLabel: 'Categoria',
  filterAll: 'Todas',
  colColaborador: 'Colaborador',
  colData: 'Data da despesa',
  colCategoria: 'Categoria',
  colValor: 'Valor',
  empty: 'Nenhuma despesa aprovada aguardando pagamento.',
  loading: 'Carregando despesas aprovadas…',
  loadMore: 'Carregar mais despesas',
  errorQueue: 'Não foi possível carregar a fila de pagamento.',
  retry: 'Tentar novamente',
  back: 'Voltar',
  scFila: 'Despesas aprovadas para pagar',
  scConferir: 'Conferir a despesa',
  scPagar: 'Registrar o pagamento',
  scSucesso: 'Pagamento registrado',
  step1of2: 'Passo 1 de 2',
  step2of2: 'Passo 2 de 2',
  stepConferir: 'Conferir',
  stepData: 'Data do pagamento',
  continuar: 'Continuar',
  fColaborador: 'Colaborador',
  fData: 'Data da despesa',
  fCategoria: 'Categoria',
  fDescricao: 'Descrição',
  fSituacao: 'Situação',
  fDataPagamento: 'Data de pagamento',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  loadingDetail: 'Carregando dados da despesa…',
  detailError: 'Não foi possível carregar a despesa.',
  noDetail: 'Nenhuma despesa escolhida. Volte para a fila e escolha uma.',
  payingLabel: 'Você vai pagar',
  payDateLabel: 'Data em que foi paga',
  payDateHelper: 'Informe o dia em que o pagamento foi feito.',
  payDatePlaceholder: 'Escolha a data',
  payConfirm: 'Confirmar pagamento',
  payError: 'Não foi possível registrar o pagamento. A data foi mantida, tente novamente.',
  successMsg: 'A despesa foi marcada como paga e saiu da fila.',
  backToQueue: 'Voltar para a fila'
};
const pageMessage_en_us: typeof pageMessage_pt_br = {
  queueIntro: 'Choose the expense you are going to pay now.',
  filterLabel: 'Category',
  filterAll: 'All',
  colColaborador: 'Employee',
  colData: 'Expense date',
  colCategoria: 'Category',
  colValor: 'Amount',
  empty: 'No approved expenses waiting for payment.',
  loading: 'Loading approved expenses…',
  loadMore: 'Load more expenses',
  errorQueue: 'The payment queue could not be loaded.',
  retry: 'Try again',
  back: 'Back',
  scFila: 'Approved expenses to pay',
  scConferir: 'Review the expense',
  scPagar: 'Register the payment',
  scSucesso: 'Payment registered',
  step1of2: 'Step 1 of 2',
  step2of2: 'Step 2 of 2',
  stepConferir: 'Review',
  stepData: 'Payment date',
  continuar: 'Continue',
  fColaborador: 'Employee',
  fData: 'Expense date',
  fCategoria: 'Category',
  fDescricao: 'Description',
  fSituacao: 'Status',
  fDataPagamento: 'Payment date',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  loadingDetail: 'Loading expense data…',
  detailError: 'The expense could not be loaded.',
  noDetail: 'No expense chosen. Go back to the queue and choose one.',
  payingLabel: 'You are about to pay',
  payDateLabel: 'Date it was paid',
  payDateHelper: 'Enter the day the payment was made.',
  payDatePlaceholder: 'Choose the date',
  payConfirm: 'Confirm payment',
  payError: 'The payment could not be registered. Your date was kept, please try again.',
  successMsg: 'The expense was marked as paid and left the queue.',
  backToQueue: 'Back to the queue'
};
const pageMessage_es_es: typeof pageMessage_pt_br = {
  queueIntro: 'Elige el gasto que vas a pagar ahora.',
  filterLabel: 'Categoría',
  filterAll: 'Todas',
  colColaborador: 'Colaborador',
  colData: 'Fecha del gasto',
  colCategoria: 'Categoría',
  colValor: 'Importe',
  empty: 'No hay gastos aprobados pendientes de pago.',
  loading: 'Cargando gastos aprobados…',
  loadMore: 'Cargar más gastos',
  errorQueue: 'No se pudo cargar la cola de pagos.',
  retry: 'Intentar de nuevo',
  back: 'Volver',
  scFila: 'Gastos aprobados por pagar',
  scConferir: 'Revisar el gasto',
  scPagar: 'Registrar el pago',
  scSucesso: 'Pago registrado',
  step1of2: 'Paso 1 de 2',
  step2of2: 'Paso 2 de 2',
  stepConferir: 'Revisar',
  stepData: 'Fecha del pago',
  continuar: 'Continuar',
  fColaborador: 'Colaborador',
  fData: 'Fecha del gasto',
  fCategoria: 'Categoría',
  fDescricao: 'Descripción',
  fSituacao: 'Situación',
  fDataPagamento: 'Fecha de pago',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  loadingDetail: 'Cargando datos del gasto…',
  detailError: 'No se pudo cargar el gasto.',
  noDetail: 'Ningún gasto elegido. Vuelve a la cola y elige uno.',
  payingLabel: 'Vas a pagar',
  payDateLabel: 'Fecha en que se pagó',
  payDateHelper: 'Indica el día en que se hizo el pago.',
  payDatePlaceholder: 'Elige la fecha',
  payConfirm: 'Confirmar pago',
  payError: 'No se pudo registrar el pago. La fecha se mantuvo, inténtalo de nuevo.',
  successMsg: 'El gasto se marcó como pagado y salió de la cola.',
  backToQueue: 'Volver a la cola'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

function currentLang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtDate(value?: string | null): string {
  if (!value) return '—';
  const d = new Date(value.length === 10 ? value + 'T00:00:00' : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(currentLang()).format(d);
}

function uniqueCategories(items: ReadonlyArray<{ details: { details: { categoria: string } } }>, current: string | null): string[] {
  const out: string[] = [];
  for (const it of items) {
    const c = it.details.details.categoria;
    if (c && !out.includes(c)) out.push(c);
  }
  if (current && !out.includes(current)) out.push(current);
  return out;
}

@customElement('reembolso-despesas--web--desktop--page31--despesas_aprovadas-102047')
export class ReembolsoDespesasDesktopPage31Despesas_aprovadasPage extends ReembolsoDespesasDespesas_aprovadasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid') {
    switch (status) {
      case 'draft': return this.msg['statusDraft'];
      case 'awaitingApproval': return this.msg['statusAwaiting'];
      case 'rejected': return this.msg['statusRejected'];
      case 'approved': return this.msg['statusApproved'];
      case 'paid': return this.msg['statusPaid'];
    }
  }

  private onPick(index: number) {
    const item = this.despesas?.items[index];
    if (!item) return;
    this.selectDespesaAprovadaDetalhe(item.id);
    this.setScenario('conferir');
  }

  private onFilter(value: string | null) {
    this.listarDespesasAprovadas({ categoria: !value || value === 'all' ? null : value });
  }

  private onConfirm() {
    this.registrarPagamento().then(() => {
      if (this.registrarPagamentoStatus === 'success') this.setScenario('sucesso');
    });
  }

  private renderQueue() {
    const items = this.despesas?.items ?? [];
    const cats = uniqueCategories(items, this.categoria);
    return html`
      <section data-organism-id="despesasAprovadasLista" class="flex flex-col gap-5">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['queueIntro']}</p>
        <groupselectone--ml-segmented-control
          .value=${this.categoria ?? 'all'}
          @change=${(e: CustomEvent<{ value: string | null }>) => { if (e.target === e.currentTarget) this.onFilter(e.detail.value); }}>
          <Label>${this.msg['filterLabel']}</Label>
          <Item value="all">${this.msg['filterAll']}</Item>
          ${cats.map(c => html`<Item value=${c}>${c}</Item>`)}
        </groupselectone--ml-segmented-control>

        ${this.pageStatus === 'error' || this.listarDespesasAprovadasError
          ? html`
            <div class="flex items-center justify-between gap-4 rounded-lg border border-[var(--status-error-text,currentColor)] bg-[var(--status-error-bg,transparent)] px-4 py-3 text-[var(--status-error-text,currentColor)]" aria-live="polite">
              <span>${this.msg['errorQueue']}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.listarDespesasAprovadas()}>
                <Label>${this.msg['retry']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}

        <groupviewdata--ml-vertical-record-list
          .hoverable=${true}
          .loading=${this.pageStatus === 'loading'}
          @row-click=${(e: CustomEvent<{ index: number }>) => this.onPick(e.detail.index)}>
          <Columns>
            <Column field="colaborador" header=${this.msg['colColaborador']} />
            <Column field="data" header=${this.msg['colData']} width="140px" />
            <Column field="categoria" header=${this.msg['colCategoria']} width="160px" />
            <Column field="valor" header=${this.msg['colValor']} align="right" width="160px" />
          </Columns>
          <Rows>
            ${items.map(it => html`
              <Row ?selected=${it.id === this.selectedDespesa}>
                <Cell><span class="font-medium text-[var(--text-strong,currentColor)]">${it.colaboradorId}</span></Cell>
                <Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${fmtDate(it.details.details.dataDespesa)}</span></Cell>
                <Cell><span class="text-sm text-[var(--text-default,currentColor)]">${it.details.details.categoria}</span></Cell>
                <Cell><span class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${it.details.details.valor}</span></Cell>
              </Row>`)}
          </Rows>
          <Empty><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['empty']}</div></Empty>
          <Loading><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['loading']}</div></Loading>
        </groupviewdata--ml-vertical-record-list>

        ${this.despesas?.hasMore
          ? html`
            <div class="flex justify-center">
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                .loading=${this.listarDespesasAprovadasStatus === 'loading'}
                @action=${() => this.listarDespesasAprovadas({ append: true })}>
                <Label>${this.msg['loadMore']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : nothing}
      </section>`;
  }

  private renderSteps(current: 0 | 1) {
    return html`
      <groupnavigatesteps--ml-wizard-steps .value=${current}>
        <Label>${current === 0 ? this.msg['step1of2'] : this.msg['step2of2']}</Label>
        <Step title=${this.msg['stepConferir']} ?completed=${current === 1}></Step>
        <Step title=${this.msg['stepData']}></Step>
      </groupnavigatesteps--ml-wizard-steps>`;
  }

  private field(label: string, value: unknown) {
    return html`
      <div class="flex flex-col gap-0.5">
        <dt class="text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="text-base text-[var(--text-default,currentColor)]">${value}</dd>
      </div>`;
  }

  private renderDetail() {
    const d = this.despesa;
    const loading = this.obterDespesaAprovadaStatus === 'loading';
    if (this.obterDespesaAprovadaError) {
      return html`
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
          <Message>${this.msg['detailError']} ${this.obterDespesaAprovadaError.message}</Message>
        </groupnotifyuser--ml-contextual-feedback>`;
    }
    if (!d && !loading) {
      return html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['noDetail']}</p>`;
    }
    return html`
      <groupviewcard--ml-vertical-card .loading=${loading || !d}>
        ${d ? html`
          <CardHeader>
            <CardTitle><span class="text-3xl font-semibold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span></CardTitle>
            <CardDescription>${this.msg['fColaborador']}: ${d.colaboradorId}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="grid grid-cols-2 gap-x-8 gap-y-4 pt-2">
              ${this.field(this.msg['fData'], fmtDate(d.details.details.dataDespesa))}
              ${this.field(this.msg['fCategoria'], d.details.details.categoria)}
              ${this.field(this.msg['fSituacao'], this.statusLabel(d.status))}
              ${d.details.details.dataPagamento ? this.field(this.msg['fDataPagamento'], fmtDate(d.details.details.dataPagamento)) : nothing}
              <div class="col-span-2">${this.field(this.msg['fDescricao'], d.details.details.descricao)}</div>
            </dl>
          </CardContent>` : nothing}
      </groupviewcard--ml-vertical-card>`;
  }

  private renderConferir() {
    return html`
      <section data-organism-id="despesaAprovadaDetalhe" class="flex flex-col gap-6">
        ${this.renderSteps(0)}
        ${this.renderDetail()}
        <div class="flex justify-end">
          <grouptriggeraction--ml-button-standard
            size="lg"
            .disabled=${!this.despesa || this.obterDespesaAprovadaStatus === 'loading'}
            @action=${() => this.setScenario('pagamento')}>
            <Label>${this.msg['continuar']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>`;
  }

  private renderPagamento() {
    const d = this.despesa;
    const date = this.registrarPagamentoDraft.details.dataPagamento;
    const loading = this.registrarPagamentoStatus === 'loading';
    return html`
      <section data-organism-id="registroPagamentoForm" class="flex flex-col gap-6">
        ${this.renderSteps(1)}
        ${d ? html`
          <div class="flex items-baseline justify-between gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-5 py-4">
            <div class="flex flex-col">
              <span class="text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['payingLabel']}</span>
              <span class="text-[var(--text-default,currentColor)]">${d.colaboradorId} · ${d.details.details.categoria} · ${fmtDate(d.details.details.dataDespesa)}</span>
            </div>
            <span class="text-3xl font-semibold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span>
          </div>` : nothing}
        <groupenterdate--ml-date-picker
          .value=${date}
          .locale=${currentLang() ?? ''}
          .placeholder=${this.msg['payDatePlaceholder']}
          .disabled=${loading}
          required
          @change=${(e: CustomEvent<{ value: string | null }>) => {
            if (e.target === e.currentTarget) return;
            this.setRegistrarPagamentoDraft({ details: { dataPagamento: e.detail.value } });
          }}>
          <Label>${this.msg['payDateLabel']}</Label>
          <Helper>${this.msg['payDateHelper']}</Helper>
        </groupenterdate--ml-date-picker>
        <div aria-live="polite">
          ${this.registrarPagamentoError
            ? html`
              <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
                <Message>${this.msg['payError']} ${this.registrarPagamentoError.message}</Message>
              </groupnotifyuser--ml-contextual-feedback>`
            : nothing}
        </div>
        <div class="flex justify-end">
          <grouptriggeraction--ml-button-standard
            size="lg"
            .disabled=${!date || !d}
            .loading=${loading}
            @action=${() => this.onConfirm()}>
            <Label>${this.msg['payConfirm']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>`;
  }

  private renderSucesso() {
    const d = this.despesa;
    return html`
      <section class="flex flex-col items-center gap-6 py-6 text-center">
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
          <Message>${this.msg['successMsg']}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        ${d ? html`
          <div class="flex flex-col items-center gap-2">
            <span class="text-5xl font-semibold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span>
            <span class="text-[var(--text-default,currentColor)]">${d.colaboradorId} · ${d.details.details.categoria}</span>
            <span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['fDataPagamento']}: ${fmtDate(d.details.details.dataPagamento)}</span>
          </div>` : nothing}
        <grouptriggeraction--ml-button-standard size="lg" @action=${() => this.setScenario('fila')}>
          <Label>${this.msg['backToQueue']}</Label>
        </grouptriggeraction--ml-button-standard>
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto w-full max-w-3xl px-6 py-8 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .backLabel=${this.msg['back']}
          .value=${this.scenary || 'fila'}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="fila" title=${this.msg['scFila']}>
            ${this.renderQueue()}
          </Scene>
          <Scene value="conferir" title=${this.msg['scConferir']} nav="back" backTo="fila">
            ${this.renderConferir()}
          </Scene>
          <Scene value="pagamento" title=${this.msg['scPagar']} nav="back" backTo="conferir">
            ${this.renderPagamento()}
          </Scene>
          <Scene value="sucesso" title=${this.msg['scSucesso']}>
            ${this.renderSucesso()}
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
