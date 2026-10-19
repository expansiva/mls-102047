/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/listas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasListasShared } from '/_102047_/l2/tarefas/web/shared/listas.js';
import type { ErrorState, ListaTipo } from '/_102047_/l2/tarefas/web/shared/listas.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  listTitle: 'Listas de tarefas',
  newListTitle: 'Dados da nova lista',
  back: 'Voltar para as listas',
  searchLabel: 'Buscar lista pelo nome',
  searchPlaceholder: 'Digite parte do nome',
  colList: 'Lista',
  colOpen: 'Tarefas abertas',
  openTasks: 'abertas',
  typeProject: 'Projeto',
  typeArea: 'Área',
  active: 'Ativa',
  inactive: 'Inativa',
  loading: 'Carregando as listas…',
  emptyAll: 'Nenhuma lista cadastrada ainda. Cadastre a primeira para agrupar tarefas.',
  emptySearch: 'Nenhuma lista com esse nome.',
  loadFailed: 'Não foi possível carregar as listas.',
  selectionInvalid: 'A lista pedida não foi encontrada entre as listas carregadas.',
  searchFailed: 'Não foi possível buscar agora. Tente de novo.',
  retry: 'Tentar novamente',
  newList: 'Nova lista',
  fieldName: 'Nome da lista',
  fieldType: 'Tipo',
  fieldDescription: 'Descrição',
  descriptionHelper: 'Explique o objetivo da lista (opcional).',
  fieldActive: 'Ativa',
  activeHelper: 'Listas inativas não aparecem na escolha ao criar uma tarefa.',
  createAction: 'Cadastrar lista',
  saveAction: 'Salvar alterações',
  errRequired: 'Preencha o nome e escolha o tipo da lista.',
  errNameTaken: 'Já existe uma lista com esse nome. Escolha outro nome.',
  errSave: 'Não foi possível salvar a lista. Confira os dados e tente de novo.',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

type DraftShape = { nome: string | null; details: { tipo: ListaTipo | null; descricao: string | null }; ativa: boolean | null };
type DraftPatch = { nome?: string | null; tipo?: ListaTipo | null; descricao?: string | null; ativa?: boolean | null };

function mergeDraft<T extends DraftShape>(d: T, p: DraftPatch): T {
  return {
    ...d,
    nome: p.nome !== undefined ? p.nome : d.nome,
    details: {
      ...d.details,
      tipo: p.tipo !== undefined ? p.tipo : d.details.tipo,
      descricao: p.descricao !== undefined ? p.descricao : d.details.descricao,
    },
    ativa: p.ativa !== undefined ? p.ativa : d.ativa,
  };
}

@customElement('tarefas--web--mobile--page11--listas-102047')
export class TarefasMobilePage11ListasPage extends TarefasListasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private tipoLabel(tipo: ListaTipo) {
    return tipo === 'project' ? this.msg['typeProject'] : this.msg['typeArea'];
  }

  private commandErrorText(err: ErrorState) {
    if (!err) return '';
    if (err.code === 'client.requiredMissing') return this.msg['errRequired'];
    if (err.code.includes('listaNomeUnico')) return this.msg['errNameTaken'];
    return this.msg['errSave'];
  }

  private openEdit(id: string) {
    this.selectLista(id);
    this.setScenario('formulario');
  }

  private openNew() {
    this.selectLista(null);
    this.setCriarListaDraft({ ...this.criarListaDraft, ativa: this.criarListaDraft.ativa ?? true });
    this.setScenario('formulario');
  }

  private renderListError() {
    const err = this.listarListasError;
    const text = err && err.code === 'client.selectionInvalid' ? this.msg['selectionInvalid'] : this.msg['loadFailed'];
    return html`
      <div role="alert" aria-live="polite" class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <p class="text-[var(--text-default,currentColor)]">${text}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => { void this.listarListas(); }}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  private renderList() {
    const loading = this.pageStatus === 'loading' || this.buscarListasStatus === 'loading';
    const fmt = new Intl.NumberFormat(document.documentElement.lang || undefined);
    return html`
      <section data-organism-id="listasCadastradas" class="flex flex-col gap-3 pb-2">
        <groupsearchcontent--ml-search-bar
          placeholder=${this.msg['searchPlaceholder']}
          .loading=${this.buscarListasStatus === 'loading'}
          @search=${(e: CustomEvent<{ query: string }>) => { void this.buscarListas(e.detail.query); }}
          @clear=${() => { void this.buscarListas(''); }}>
          <Label>${this.msg['searchLabel']}</Label>
        </groupsearchcontent--ml-search-bar>
        ${this.buscarListasError ? html`<p role="alert" aria-live="polite" class="text-sm text-[var(--text-default,currentColor)]">${this.msg['searchFailed']}</p>` : nothing}
        ${this.pageStatus === 'error'
          ? this.renderListError()
          : html`
            <groupviewdata--ml-vertical-record-list .hoverable=${true} .loading=${loading}
              @row-click=${(e: CustomEvent<{ index: number }>) => {
                const l = this.listas[e.detail.index];
                if (l) this.openEdit(l.id);
              }}>
              <Columns>
                <Column field="nome" header=${this.msg['colList']}></Column>
                <Column field="abertas" header=${this.msg['colOpen']} align="right" width="96px"></Column>
              </Columns>
              <Rows>
                ${this.listas.map((l) => html`
                  <Row ?selected=${l.id === this.selectedLista}>
                    <Cell>
                      <div class="min-h-11 py-2">
                        <div class="text-base font-semibold break-words ${l.ativa ? 'text-[var(--text-strong,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">${l.nome}</div>
                        <div class="mt-1 flex flex-wrap items-center gap-2 text-xs">
                          <span class="text-[var(--text-muted,currentColor)]">${this.tipoLabel(l.details.tipo)}</span>
                          <span class="rounded-full px-2 py-0.5 ${l.ativa
                            ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
                            : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">${l.ativa ? this.msg['active'] : this.msg['inactive']}</span>
                        </div>
                      </div>
                    </Cell>
                    <Cell>
                      <div class="py-2 text-right ${l.ativa ? '' : 'text-[var(--text-muted,currentColor)]'}">
                        <div class="text-lg font-semibold">${fmt.format(l.details.quantidadeTarefasAbertas)}</div>
                        <div class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['openTasks']}</div>
                      </div>
                    </Cell>
                  </Row>`)}
              </Rows>
              <Empty>
                <div class="py-8 px-4 text-center text-[var(--text-muted,currentColor)]">${this.busca ? this.msg['emptySearch'] : this.msg['emptyAll']}</div>
              </Empty>
              <Loading>
                <div class="py-8 text-center text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg['loading']}</div>
              </Loading>
            </groupviewdata--ml-vertical-record-list>`}
      </section>
      <div class="sticky bottom-0 -mx-4 mt-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--page-bg,transparent)] px-4 py-3">
        <grouptriggeraction--ml-button-standard size="lg" data-class="w-full" @action=${() => this.openNew()}>
          <Label>${this.msg['newList']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  private renderForm() {
    const edit = this.formularioLista !== null;
    const draft: DraftShape = edit ? this.salvarListaDraft : this.criarListaDraft;
    const status = edit ? this.salvarListaStatus : this.criarListaStatus;
    const err = edit ? this.salvarListaError : this.criarListaError;
    const busy = status === 'loading';
    const patch = (p: DraftPatch) => {
      if (edit) this.setSalvarListaDraft(mergeDraft(this.salvarListaDraft, p));
      else this.setCriarListaDraft(mergeDraft(this.criarListaDraft, p));
    };
    const invalid = !(draft.nome ?? '').trim() || !draft.details.tipo;
    const submit = () => {
      if (invalid || busy) return;
      const run = edit ? this.salvarLista() : this.criarLista();
      void run.then(() => {
        const st = edit ? this.salvarListaStatus : this.criarListaStatus;
        if (st === 'success') this.setScenario('lista');
      });
    };
    const tipos: ListaTipo[] = ['project', 'area'];
    return html`
      <section data-organism-id="formularioLista">
        <form class="flex flex-col gap-5 pb-4" @submit=${(e: Event) => { e.preventDefault(); submit(); }}>
          <groupentertext--ml-floating-text-input
            .value=${draft.nome ?? ''}
            name="nome"
            required
            @input=${(e: CustomEvent<{ value: string }>) => patch({ nome: e.detail.value })}
            @change=${(e: CustomEvent<{ value: string }>) => patch({ nome: e.detail.value })}>
            <Label>${this.msg['fieldName']}</Label>
          </groupentertext--ml-floating-text-input>

          <fieldset class="m-0 border-0 p-0">
            <legend class="mb-2 text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg['fieldType']}</legend>
            <div role="radiogroup" aria-label=${this.msg['fieldType']} class="flex gap-2">
              ${tipos.map((t) => {
                const on = draft.details.tipo === t;
                return html`
                  <button type="button" role="radio" aria-checked=${on ? 'true' : 'false'}
                    class="min-h-11 flex-1 rounded-lg border px-3 text-base focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${on
                      ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)] font-semibold'
                      : 'bg-[var(--input-bg,transparent)] text-[var(--text-default,currentColor)] border-[var(--border-default,currentColor)]'}"
                    @click=${() => patch({ tipo: t })}>${this.tipoLabel(t)}</button>`;
              })}
            </div>
          </fieldset>

          <groupentertext--ml-multiline-text
            .value=${draft.details.descricao ?? ''}
            .rows=${4}
            name="descricao"
            @input=${(e: CustomEvent<{ value: string }>) => patch({ descricao: e.detail.value })}
            @change=${(e: CustomEvent<{ value: string }>) => patch({ descricao: e.detail.value })}>
            <Label>${this.msg['fieldDescription']}</Label>
            <Helper>${this.msg['descriptionHelper']}</Helper>
          </groupentertext--ml-multiline-text>

          <label class="flex min-h-11 items-start gap-3 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
            <input type="checkbox" class="mt-0.5 h-6 w-6 shrink-0 accent-[var(--button-primary-bg,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              .checked=${draft.ativa === true}
              @change=${(e: Event) => patch({ ativa: (e.target as HTMLInputElement).checked })} />
            <span class="flex flex-col">
              <span class="text-base font-medium text-[var(--text-strong,currentColor)]">${this.msg['fieldActive']}</span>
              <span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['activeHelper']}</span>
            </span>
          </label>

          <div aria-live="polite">
            ${err ? html`
              <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
                <Message>${this.commandErrorText(err)}</Message>
              </groupnotifyuser--ml-contextual-feedback>` : nothing}
          </div>

          <grouptriggeraction--ml-button-standard size="lg" data-class="w-full"
            .disabled=${invalid}
            .loading=${busy}
            @action=${() => submit()}>
            <Label>${edit ? this.msg['saveAction'] : this.msg['createAction']}</Label>
          </grouptriggeraction--ml-button-standard>
        </form>
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const record = this.formularioLista;
    const formTitle = record ? record.nome : this.msg['newListTitle'];
    return html`
      <div class="min-h-screen w-full bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020 mode="scenary"
          .value=${this.scenary || 'lista'}
          backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
          <Scene value="lista" title=${this.msg['listTitle']}>
            ${this.renderList()}
          </Scene>
          <Scene value="formulario" title=${formTitle} nav="back" backTo="lista">
            ${this.renderForm()}
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
