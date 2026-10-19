/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/listas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasListasShared } from '/_102047_/l2/tarefas/web/shared/listas.js';
import type { CriarListaDraft, ErrorState, ListaTipo } from '/_102047_/l2/tarefas/web/shared/listas.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  listasTitulo: 'Listas',
  novaListaTitulo: 'Dados da nova lista',
  voltar: 'Voltar',
  buscaLabel: 'Buscar lista',
  buscaPlaceholder: 'Nome da lista',
  novaLista: 'Nova lista',
  carregando: 'Carregando as listas…',
  vazio: 'Nenhuma lista cadastrada ainda. Toque em “Nova lista” para criar a primeira.',
  semResultado: 'Nenhuma lista tem esse nome. Tente outro trecho do nome.',
  colLista: 'Lista',
  colAbertas: 'Tarefas abertas',
  abertas: 'abertas',
  projeto: 'Projeto',
  area: 'Área',
  ativa: 'Ativa',
  inativa: 'Inativa',
  erroCarregarTitulo: 'Não foi possível carregar as listas',
  precondicaoTitulo: 'Faltam informações para abrir as listas',
  precondicaoTexto: 'Esta tela foi aberta sem o que ela precisa para mostrar as listas. Volte para a tela anterior e abra as listas de novo.',
  tentarNovamente: 'Tentar novamente',
  sucessoCriada: 'Lista cadastrada.',
  sucessoSalva: 'Alterações salvas.',
  campoNome: 'Nome da lista',
  campoNomeAjuda: 'Não pode repetir o nome de outra lista.',
  campoTipo: 'Tipo',
  campoDescricao: 'Descrição (opcional)',
  campoAtiva: 'Situação',
  ativaAjuda: 'Listas inativas não aparecem na escolha ao criar tarefa.',
  tarefasAbertas: 'Tarefas abertas',
  cadastrar: 'Cadastrar lista',
  salvar: 'Salvar alterações',
  erroSalvarTitulo: 'Não foi possível salvar a lista',
  erroCriarTitulo: 'Não foi possível cadastrar a lista'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;
const formatCount = (n: number) => new Intl.NumberFormat(lang()).format(n);

@customElement('tarefas--web--mobile--page11--listas-102047')
export class TarefasMobilePage11ListasPage extends TarefasListasShared {
  private msg: PageMessageType = pageMessages['pt-br'];

  private tipoLabel(tipo: ListaTipo) {
    return tipo === 'project' ? this.msg['projeto'] : this.msg['area'];
  }

  private option(name: string, label: string, checked: boolean, onPick: () => void) {
    return html`
      <label class="flex min-h-[48px] flex-1 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-base focus-within:ring-2 focus-within:ring-[var(--focus-ring,currentColor)] ${checked
        ? 'border-[var(--selected-border,currentColor)] bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)]'
        : 'border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] text-[var(--text-default,currentColor)]'}">
        <input type="radio" class="h-5 w-5" name=${name} .checked=${checked} @change=${onPick} />
        <span>${label}</span>
      </label>`;
  }

  private feedback(error: ErrorState, title: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type="error" .visible=${!!error} .dismissible=${false}>
        <Title>${title}</Title>
        <Message>${error ? error.message : ''}</Message>
      </groupnotifyuser--ml-contextual-feedback>`;
  }

  private fields<T extends CriarListaDraft>(d: T, update: (next: T) => void) {
    return html`
      <groupentertext--ml-floating-text-input
        data-class="w-full"
        name="nome"
        required
        .value=${d.nome ?? ''}
        @input=${(e: CustomEvent<{ value: string }>) => update({ ...d, nome: e.detail.value })}
        @change=${(e: CustomEvent<{ value: string }>) => update({ ...d, nome: e.detail.value })}
      >
        <Label>${this.msg['campoNome']}</Label>
        <Helper>${this.msg['campoNomeAjuda']}</Helper>
      </groupentertext--ml-floating-text-input>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg['campoTipo']}</legend>
        <div class="flex gap-2">
          ${this.option('tipo', this.msg['projeto'], d.details.tipo === 'project', () => update({ ...d, details: { ...d.details, tipo: 'project' } }))}
          ${this.option('tipo', this.msg['area'], d.details.tipo === 'area', () => update({ ...d, details: { ...d.details, tipo: 'area' } }))}
        </div>
      </fieldset>

      <groupentertext--ml-multiline-text
        data-class="w-full"
        name="descricao"
        .rows=${4}
        .maxLength=${500}
        .value=${d.details.descricao ?? ''}
        @input=${(e: CustomEvent<{ value: string }>) => update({ ...d, details: { ...d.details, descricao: e.detail.value === '' ? null : e.detail.value } })}
        @change=${(e: CustomEvent<{ value: string }>) => update({ ...d, details: { ...d.details, descricao: e.detail.value === '' ? null : e.detail.value } })}
      >
        <Label>${this.msg['campoDescricao']}</Label>
      </groupentertext--ml-multiline-text>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg['campoAtiva']}</legend>
        <div class="flex gap-2">
          ${this.option('ativa', this.msg['ativa'], d.ativa === true, () => update({ ...d, ativa: true }))}
          ${this.option('ativa', this.msg['inativa'], d.ativa === false, () => update({ ...d, ativa: false }))}
        </div>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['ativaAjuda']}</p>
      </fieldset>`;
  }

  private invalid(d: CriarListaDraft) {
    return !(d.nome && d.nome.trim()) || d.details.tipo === null || d.ativa === null;
  }

  private renderListaScene() {
    const loading = this.pageStatus === 'loading' || this.listarListasStatus === 'loading';
    const preconditionMissing = this.listarListasError?.code === 'client.preconditionMissing';
    const failed = this.pageStatus === 'error' || this.listarListasStatus === 'error';
    const successMsg = this.salvarListaStatus === 'success' ? this.msg['sucessoSalva'] : this.criarListaStatus === 'success' ? this.msg['sucessoCriada'] : '';

    return html`
      <div data-organism-id="listasCadastradas" class="flex min-h-full flex-col gap-3 text-[var(--text-default,currentColor)]">
        <groupsearchcontent--ml-search-bar
          data-class="w-full"
          placeholder=${this.msg['buscaPlaceholder']}
          .loading=${this.buscarListasStatus === 'loading'}
          @search=${(e: CustomEvent<{ query: string }>) => { void this.buscarListas(e.detail.query); }}
          @clear=${() => { void this.buscarListas(''); }}
        >
          <Label>${this.msg['buscaLabel']}</Label>
        </groupsearchcontent--ml-search-bar>

        <div aria-live="polite">
          ${successMsg
            ? html`<div class="rounded-lg bg-[var(--status-success-bg,transparent)] px-3 py-3 text-sm text-[var(--status-success-text,currentColor)]">${successMsg}</div>`
            : nothing}
        </div>

        ${preconditionMissing
          ? html`
            <div class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" role="alert">
              <p class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['precondicaoTitulo']}</p>
              <p class="text-sm">${this.msg['precondicaoTexto']}</p>
              <grouptriggeraction--ml-button-standard data-variant="secondary" data-class="w-full min-h-[44px]" @action=${() => window.history.back()}>
                <Label>${this.msg['voltar']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : failed
            ? html`
            <div class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" role="alert">
              <p class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['erroCarregarTitulo']}</p>
              <p class="text-sm">${this.listarListasError ? this.listarListasError.message : ''}</p>
              <grouptriggeraction--ml-button-standard data-variant="secondary" data-class="w-full min-h-[44px]" @action=${() => { void this.listarListas(); }}>
                <Label>${this.msg['tentarNovamente']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
            : html`
            <groupviewdata--ml-vertical-record-list
              .loading=${loading}
              .hoverable=${true}
              @row-click=${(e: CustomEvent<{ index: number }>) => {
                const lista = this.listas[e.detail.index];
                if (lista) {
                  this.selectLista(lista.id);
                  this.setScenario('registro');
                }
              }}
            >
              <Columns>
                <Column field="nome" header=${this.msg['colLista']} />
                <Column field="abertas" header=${this.msg['colAbertas']} align="right" width="84px" />
              </Columns>
              <Rows>
                ${this.listas.map(l => html`
                  <Row ?selected=${l.id === this.selectedLista}>
                    <Cell>
                      <div class="flex min-h-[56px] flex-col justify-center py-1 ${l.ativa ? '' : 'text-[var(--text-muted,currentColor)]'}">
                        <span class="break-words text-lg font-semibold ${l.ativa ? 'text-[var(--text-strong,currentColor)]' : ''}">${l.nome}</span>
                        <span class="text-sm text-[var(--text-muted,currentColor)]">${this.tipoLabel(l.details.tipo)} · ${l.ativa ? this.msg['ativa'] : this.msg['inativa']}</span>
                      </div>
                    </Cell>
                    <Cell>
                      <div class="flex flex-col items-end justify-center py-1 ${l.ativa ? '' : 'text-[var(--text-muted,currentColor)]'}">
                        <span class="text-lg font-semibold">${formatCount(l.details.quantidadeTarefasAbertas)}</span>
                        <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['abertas']}</span>
                      </div>
                    </Cell>
                  </Row>`)}
              </Rows>
              <Loading><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['carregando']}</div></Loading>
              <Empty><div class="px-4 py-10 text-center text-[var(--text-muted,currentColor)]">${this.busca ? this.msg['semResultado'] : this.msg['vazio']}</div></Empty>
            </groupviewdata--ml-vertical-record-list>`}

        <div class="sticky bottom-0 mt-auto border-t border-[var(--border-subtle,currentColor)] bg-[var(--page-bg,transparent)] py-3">
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-class="w-full min-h-[48px]"
            @action=${() => {
              this.selectLista(null);
              this.setScenario('registro');
            }}
          >
            <Label>${this.msg['novaLista']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  private renderRegistroScene() {
    if (this.selectedLista) {
      const lista = this.formularioLista;
      const d = this.salvarListaDraft;
      return html`
        <div data-organism-id="formularioLista" class="flex min-h-full flex-col gap-5 text-[var(--text-default,currentColor)]">
          ${lista
            ? html`
              <dl class="flex items-baseline justify-between rounded-lg bg-[var(--surface-alt-bg,transparent)] px-3 py-3">
                <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['tarefasAbertas']}</dt>
                <dd class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${formatCount(lista.details.quantidadeTarefasAbertas)}</dd>
              </dl>`
            : nothing}
          ${this.fields(d, next => this.setSalvarListaDraft(next))}
          <div class="sticky bottom-0 mt-auto flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--page-bg,transparent)] py-3" aria-live="polite">
            ${this.feedback(this.salvarListaError, this.msg['erroSalvarTitulo'])}
            <grouptriggeraction--ml-button-standard
              size="lg"
              data-class="w-full min-h-[48px]"
              .disabled=${this.invalid(d)}
              .loading=${this.salvarListaStatus === 'loading'}
              @action=${() => {
                void this.salvarLista().then(() => {
                  if (this.salvarListaStatus === 'success') this.setScenario('lista');
                });
              }}
            >
              <Label>${this.msg['salvar']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>`;
    }
    const d = this.criarListaDraft;
    return html`
      <div data-organism-id="formularioLista" class="flex min-h-full flex-col gap-5 text-[var(--text-default,currentColor)]">
        ${this.fields(d, next => this.setCriarListaDraft(next))}
        <div class="sticky bottom-0 mt-auto flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--page-bg,transparent)] py-3" aria-live="polite">
          ${this.feedback(this.criarListaError, this.msg['erroCriarTitulo'])}
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-class="w-full min-h-[48px]"
            .disabled=${this.invalid(d)}
            .loading=${this.criarListaStatus === 'loading'}
            @action=${() => {
              void this.criarLista().then(() => {
                if (this.criarListaStatus === 'success') this.setScenario('lista');
              });
            }}
          >
            <Label>${this.msg['cadastrar']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const lista = this.selectedLista ? this.formularioLista : null;
    const registroTitle = lista ? lista.nome : this.msg['novaListaTitulo'];
    return html`
      <div class="mx-auto w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-4 pb-0 pt-3">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['voltar']}
          .value=${this.scenary || 'lista'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="lista" title=${this.msg['listasTitulo']}>${this.renderListaScene()}</Scene>
          <Scene value="registro" title=${registroTitle} nav="back" backTo="lista">${this.renderRegistroScene()}</Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
