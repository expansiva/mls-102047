/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/listas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasListasShared, emptyCriarListaDraft } from '/_102047_/l2/tarefas/web/shared/listas.js';
import type { CriarListaDraft, SalvarListaDraft, ListaTipo } from '/_102047_/l2/tarefas/web/shared/listas.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  tituloPagina: 'Listas da equipe',
  dicaLista: 'Toque numa lista para alterá-la.',
  novaLista: 'Nova lista',
  tituloNovaLista: 'Dados da nova lista',
  tituloFichaPadrao: 'Dados da lista',
  voltar: 'Voltar às listas',
  colLista: 'Lista',
  colTipo: 'Tipo',
  colAbertas: 'Tarefas abertas',
  abertas: 'abertas',
  tipoProjeto: 'Projeto',
  tipoArea: 'Área',
  ativa: 'Ativa',
  inativa: 'Inativa',
  carregando: 'Carregando as listas…',
  vazioTitulo: 'Nenhuma lista cadastrada ainda',
  vazioDica: 'Cadastre a primeira lista para agrupar as tarefas da equipe.',
  erroListas: 'Não foi possível carregar as listas.',
  precondicao: 'Esta tela precisa ser aberta a partir do módulo Tarefas da equipe. Volte ao início do módulo e abra as listas novamente.',
  tentarNovamente: 'Tentar de novo',
  abrindo: 'Abrindo a lista…',
  erroAbrir: 'Não foi possível abrir esta lista.',
  campoNome: 'Nome da lista',
  campoTipo: 'Tipo',
  escolhaTipo: 'Escolha projeto ou área',
  campoDescricao: 'Descrição',
  campoAtiva: 'Lista ativa',
  ativaDica: 'Listas inativas deixam de aparecer na escolha ao criar tarefas.',
  cadastrar: 'Cadastrar lista',
  salvar: 'Salvar alterações',
  erroNomeUnico: 'Já existe uma lista com esse nome. Escolha outro nome.',
  erroSalvar: 'Não foi possível salvar a lista. Confira os dados e tente de novo.',
  sucessoCriada: 'Lista cadastrada.',
  sucessoSalva: 'Alterações salvas.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type Patch = {
  nome?: string | null;
  ativa?: boolean | null;
  tipo?: ListaTipo | null;
  descricao?: string | null;
};

function merge<T extends CriarListaDraft>(d: T, p: Patch): T {
  return {
    ...d,
    nome: p.nome !== undefined ? p.nome : d.nome,
    ativa: p.ativa !== undefined ? p.ativa : d.ativa,
    details: {
      tipo: p.tipo !== undefined ? p.tipo : d.details.tipo,
      descricao: p.descricao !== undefined ? p.descricao : d.details.descricao
    }
  };
}

function podeCriar(d: CriarListaDraft): boolean {
  return !!(d.nome && d.nome.trim()) && !!d.details.tipo;
}

function podeSalvar(d: SalvarListaDraft): boolean {
  return podeCriar(d) && d.id !== null && d.version !== null && d.ativa !== null;
}

function formatInt(n: number): string {
  return new Intl.NumberFormat(document.documentElement.lang || undefined).format(n);
}

@customElement('tarefas--web--mobile--page11--listas-102047')
export class TarefasMobilePage11ListasPage extends TarefasListasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const tituloFicha = this.selectedLista === null
      ? this.msg['tituloNovaLista']
      : (this.lista?.nome || this.msg['tituloFichaPadrao']);
    return html`
      <div class="min-h-screen w-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'lista'}
          .backLabel=${this.msg['voltar']}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="lista" title=${this.msg['tituloPagina']}>
            ${this.renderLista()}
          </Scene>
          <Scene value="registro" title=${tituloFicha} nav="back" backTo="lista">
            ${this.renderFicha()}
          </Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private abrirLista(id: string) {
    this.selecionarLista(id);
    this.setScenario('registro');
  }

  private abrirNova() {
    this.selecionarLista(null);
    this.setCriarListaDraft(emptyCriarListaDraft());
    this.setScenario('registro');
  }

  private renderLista() {
    const carregando = this.pageStatus === 'loading' || this.listarListasStatus === 'loading';
    const erro = this.pageStatus === 'error' || this.listarListasStatus === 'error';
    const semPreRequisito = this.listarListasError?.code === 'client.preconditionMissing';
    return html`
      <div data-organism-id="listasCadastradas" class="flex flex-col pb-24">
        ${erro ? html`
          <div class="m-4 flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" role="alert" aria-live="polite">
            <p class="text-base text-[var(--text-strong,currentColor)]">${semPreRequisito ? this.msg['precondicao'] : this.msg['erroListas']}</p>
            ${semPreRequisito ? nothing : html`
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => { this.listarListas(); }}>
                <Label>${this.msg['tentarNovamente']}</Label>
              </grouptriggeraction--ml-button-standard>`}
          </div>
        ` : html`
          <p class="px-4 pb-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg['dicaLista']}</p>
          <groupviewdata--ml-vertical-record-list
            .loading=${carregando}
            .hoverable=${true}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const l = this.listas[e.detail.index];
              if (l) this.abrirLista(l.id);
            }}>
            <Columns>
              <Column field="nome" header=${this.msg['colLista']} />
              <Column field="tipo" header=${this.msg['colTipo']} width="110px" />
              <Column field="abertas" header=${this.msg['colAbertas']} align="right" width="84px" />
            </Columns>
            <Rows>
              ${this.listas.map(l => html`
                <Row ?selected=${l.id === this.selectedLista}>
                  <Cell>
                    <div class="flex min-h-11 items-center py-1 text-lg font-medium ${l.ativa ? 'text-[var(--text-strong,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">${l.nome}</div>
                  </Cell>
                  <Cell>
                    <div class="flex flex-col items-start gap-1 text-xs ${l.ativa ? 'text-[var(--text-default,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">
                      <span>${l.details.details.tipo === 'project' ? this.msg['tipoProjeto'] : this.msg['tipoArea']}</span>
                      <span class="rounded-full px-2 py-0.5 ${l.ativa
                        ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
                        : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">${l.ativa ? this.msg['ativa'] : this.msg['inativa']}</span>
                    </div>
                  </Cell>
                  <Cell>
                    <div class="text-right ${l.ativa ? 'text-[var(--text-strong,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">
                      <span class="block text-xl font-semibold">${formatInt(l.details.quantidadeTarefasAbertas)}</span>
                      <span class="block text-xs text-[var(--text-muted,currentColor)]">${this.msg['abertas']}</span>
                    </div>
                  </Cell>
                </Row>`)}
            </Rows>
            <Loading>
              <div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['carregando']}</div>
            </Loading>
            <Empty>
              <div class="flex flex-col items-center gap-1 px-6 py-10 text-center">
                <p class="text-base font-medium text-[var(--text-strong,currentColor)]">${this.msg['vazioTitulo']}</p>
                <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['vazioDica']}</p>
              </div>
            </Empty>
          </groupviewdata--ml-vertical-record-list>
        `}
        ${semPreRequisito ? nothing : html`
          <div class="fixed inset-x-0 bottom-0 z-10 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
            <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full" @action=${() => this.abrirNova()}>
              <Label>${this.msg['novaLista']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`}
        <groupnotifyuser--ml-toast-notification
          type="success"
          position="top"
          .duration=${3000}
          .visible=${this.salvarListaStatus === 'success'}
          @dismiss=${() => this.setSalvarListaDraft({ ...this.salvarListaDraft })}>
          <Message>${this.msg['sucessoSalva']}</Message>
        </groupnotifyuser--ml-toast-notification>
        <groupnotifyuser--ml-toast-notification
          type="success"
          position="top"
          .duration=${3000}
          .visible=${this.criarListaStatus === 'success'}
          @dismiss=${() => this.setCriarListaDraft({ ...this.criarListaDraft })}>
          <Message>${this.msg['sucessoCriada']}</Message>
        </groupnotifyuser--ml-toast-notification>
      </div>
    `;
  }

  private renderFicha() {
    const criando = this.selectedLista === null;
    const abrindo = !criando && this.obterListaStatus === 'loading';
    const falhaAbrir = !criando && this.obterListaStatus === 'error';
    return html`
      <div data-organism-id="formularioLista" class="flex flex-col gap-5 p-4 pb-8">
        ${abrindo ? html`<p class="py-6 text-center text-[var(--text-muted,currentColor)]" aria-live="polite" aria-busy="true">${this.msg['abrindo']}</p>`
          : falhaAbrir ? html`
            <div class="flex flex-col gap-3" role="alert" aria-live="polite">
              <p class="text-base">${this.msg['erroAbrir']}</p>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.selecionarLista(this.selectedLista)}>
                <Label>${this.msg['tentarNovamente']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : criando ? this.renderCriar() : this.renderSalvar()}
      </div>
    `;
  }

  private erroTexto(code: string | undefined) {
    return code && code.includes('listaNomeUnico') ? this.msg['erroNomeUnico'] : this.msg['erroSalvar'];
  }

  private renderCriar() {
    const d = this.criarListaDraft;
    const ocupado = this.criarListaStatus === 'loading';
    return html`
      <form class="flex flex-col gap-5" @submit=${(e: Event) => e.preventDefault()}>
        ${this.renderCampos(d, p => this.setCriarListaDraft(merge(d, p)), ocupado)}
        <div class="flex flex-col gap-3">
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.criarListaStatus === 'error'} .dismissible=${false}>
            <Message>${this.erroTexto(this.criarListaError?.code)}</Message>
          </groupnotifyuser--ml-contextual-feedback>
          <grouptriggeraction--ml-button-standard
            data-variant="primary" size="lg" data-class="w-full"
            .disabled=${!podeCriar(d)} .loading=${ocupado}
            @action=${() => {
              this.criarLista().then(() => {
                if (this.criarListaStatus === 'success') this.setScenario('lista');
              });
            }}>
            <Label>${this.msg['cadastrar']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </form>
    `;
  }

  private renderSalvar() {
    const d = this.salvarListaDraft;
    const ocupado = this.salvarListaStatus === 'loading';
    return html`
      <form class="flex flex-col gap-5" @submit=${(e: Event) => e.preventDefault()}>
        ${this.renderCampos(d, p => this.setSalvarListaDraft(merge(d, p)), ocupado)}
        <div class="flex flex-col gap-3">
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.salvarListaStatus === 'error'} .dismissible=${false}>
            <Message>${this.erroTexto(this.salvarListaError?.code)}</Message>
          </groupnotifyuser--ml-contextual-feedback>
          <grouptriggeraction--ml-button-standard
            data-variant="primary" size="lg" data-class="w-full"
            .disabled=${!podeSalvar(d)} .loading=${ocupado}
            @action=${() => {
              this.salvarLista().then(() => {
                if (this.salvarListaStatus === 'success') this.setScenario('lista');
              });
            }}>
            <Label>${this.msg['salvar']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </form>
    `;
  }

  private renderCampos(d: CriarListaDraft, patch: (p: Patch) => void, ocupado: boolean) {
    return html`
      <groupentertext--ml-floating-text-input
        .value=${d.nome ?? ''}
        .disabled=${ocupado}
        .required=${true}
        @input=${(e: CustomEvent<{ value: string }>) => patch({ nome: e.detail.value })}>
        <Label>${this.msg['campoNome']}</Label>
      </groupentertext--ml-floating-text-input>

      <label class="flex flex-col gap-1 text-sm text-[var(--text-default,currentColor)]">
        <span>${this.msg['campoTipo']}</span>
        <select
          class="min-h-11 w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-base text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          ?disabled=${ocupado}
          required
          @change=${(e: Event) => {
            const v = (e.target as HTMLSelectElement).value;
            patch({ tipo: v === 'project' || v === 'area' ? v : null });
          }}>
          <option value="" ?selected=${!d.details.tipo}>${this.msg['escolhaTipo']}</option>
          <option value="project" ?selected=${d.details.tipo === 'project'}>${this.msg['tipoProjeto']}</option>
          <option value="area" ?selected=${d.details.tipo === 'area'}>${this.msg['tipoArea']}</option>
        </select>
      </label>

      <groupentertext--ml-multiline-text
        .rows=${4}
        .value=${d.details.descricao ?? ''}
        .disabled=${ocupado}
        @input=${(e: CustomEvent<{ value: string }>) => patch({ descricao: e.detail.value })}>
        <Label>${this.msg['campoDescricao']}</Label>
      </groupentertext--ml-multiline-text>

      <label class="flex min-h-11 items-center justify-between gap-4 rounded-md border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-3 py-2">
        <span class="flex flex-col">
          <span class="text-base text-[var(--text-strong,currentColor)]">${this.msg['campoAtiva']}</span>
          <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['ativaDica']}</span>
        </span>
        <input
          type="checkbox"
          class="size-6 shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          .checked=${d.ativa !== false && d.ativa !== null}
          ?disabled=${ocupado}
          @change=${(e: Event) => patch({ ativa: (e.target as HTMLInputElement).checked })} />
      </label>
    `;
  }
}
