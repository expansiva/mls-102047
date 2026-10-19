/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/listas.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasListasShared } from '/_102047_/l2/tarefas/web/shared/listas.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Listas de tarefas',
  pageDescription: 'Listas que organizam o trabalho da equipe.',
  newList: 'Cadastrar lista',
  searchLabel: 'Buscar lista',
  searchPlaceholder: 'Digite o nome da lista',
  searchHelper: 'A busca encontra listas pelo nome.',
  searchEmpty: 'Nenhuma lista encontrada.',
  searchError: 'Não foi possível buscar as listas agora.',
  tableTitle: 'Listas cadastradas',
  name: 'Nome',
  type: 'Tipo',
  status: 'Ativa',
  openTasks: 'Tarefas abertas',
  project: 'Projeto',
  area: 'Área',
  active: 'Ativa',
  inactive: 'Inativa',
  noLists: 'Ainda não há listas cadastradas.',
  loadingLists: 'Carregando listas.',
  loadErrorTitle: 'Não foi possível carregar as listas',
  loadErrorMessage: 'Tente atualizar a relação de listas.',
  retry: 'Tentar novamente',
  startPanelTitle: 'Escolha uma lista',
  startPanelMessage: 'Selecione uma lista na tabela para alterar seus dados ou cadastre uma nova lista.',
  newPanelTitle: 'Nova lista',
  editPanelTitle: 'Dados da lista',
  panelBack: 'Voltar para a seleção',
  description: 'Descrição',
  descriptionPlaceholder: 'Descreva o objetivo desta lista',
  typeHelper: 'Escolha se a lista agrupa tarefas de um projeto ou de uma área.',
  activeHelper: 'Listas inativas não aparecem na escolha ao criar tarefa.',
  nameHelper: 'O nome precisa ser único entre as listas.',
  saveNew: 'Cadastrar lista',
  saveChanges: 'Salvar alterações',
  createErrorTitle: 'Não foi possível cadastrar a lista',
  saveErrorTitle: 'Não foi possível salvar as alterações',
  formErrorMessage: 'Revise os dados da lista e tente novamente.',
  createSuccessTitle: 'Lista cadastrada',
  createSuccessMessage: 'A nova lista já está disponível para acompanhamento.',
  saveSuccessTitle: 'Alterações salvas',
  saveSuccessMessage: 'Os dados da lista foram atualizados.',
  requiredNameError: 'Informe o nome da lista.',
  requiredTypeError: 'Escolha o tipo da lista.',
  preconditionMessage: 'Não foi possível abrir as listas porque faltam informações necessárias.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
};
/// **collab_i18n_end**

const formatNumber = (value: number) => new Intl.NumberFormat(document.documentElement.lang || undefined).format(value);

@customElement('tarefas--web--desktop--page11--listas-102047')
export class TarefasDesktopPage11ListasPage extends TarefasListasShared {
  private msg!: PageMessageType;

  private renderForm(editing: boolean) {
    const draft = editing ? this.salvarListaDraft : this.criarListaDraft;
    const busy = editing ? this.salvarListaStatus === 'loading' : this.criarListaStatus === 'loading';
    const commandError = editing ? this.salvarListaError : this.criarListaError;
    const commandSuccess = editing ? this.salvarListaStatus === 'success' : this.criarListaStatus === 'success';
    const nameError = commandError ? this.msg.requiredNameError : '';
    const typeError = commandError ? this.msg.requiredTypeError : '';
    return html`
      <div data-organism-id="formularioLista" class="flex h-full flex-col gap-5 p-6">
        <div class="grid gap-5">
          <groupentertext--ml-enter-text
            .value=${draft.nome ?? ''}
            .error=${nameError}
            .required=${true}
            .disabled=${busy}
            .placeholder=${this.msg.name}
            @input=${(e: CustomEvent<{ value: string }>) => editing
              ? this.setSalvarListaDraft({ ...this.salvarListaDraft, nome: e.detail.value || null })
              : this.setCriarListaDraft({ ...this.criarListaDraft, nome: e.detail.value || null })}>
            <Label>${this.msg.name}</Label>
            <Helper>${this.msg.nameHelper}</Helper>
          </groupentertext--ml-enter-text>

          <div class="grid gap-2">
            <label for="lista-tipo" class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.type}</label>
            <select
              id="lista-tipo"
              class="min-h-11 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-[var(--text-default,currentColor)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,currentColor)]"
              .value=${draft.details.tipo ?? ''}
              ?disabled=${busy}
              @change=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                const tipo = value === 'project' ? 'project' : value === 'area' ? 'area' : null;
                editing
                  ? this.setSalvarListaDraft({ ...this.salvarListaDraft, details: { ...this.salvarListaDraft.details, tipo } })
                  : this.setCriarListaDraft({ ...this.criarListaDraft, details: { ...this.criarListaDraft.details, tipo } });
              }}>
              <option value="">${this.msg.requiredTypeError}</option>
              <option value="project">${this.msg.project}</option>
              <option value="area">${this.msg.area}</option>
            </select>
            <p class="text-sm text-[var(--text-muted,currentColor)]">${typeError || this.msg.typeHelper}</p>
          </div>

          <groupentertext--ml-multiline-text
            .value=${draft.details.descricao ?? ''}
            .rows=${4}
            .disabled=${busy}
            .placeholder=${this.msg.descriptionPlaceholder}
            @input=${(e: CustomEvent<{ value: string }>) => editing
              ? this.setSalvarListaDraft({ ...this.salvarListaDraft, details: { ...this.salvarListaDraft.details, descricao: e.detail.value || null } })
              : this.setCriarListaDraft({ ...this.criarListaDraft, details: { ...this.criarListaDraft.details, descricao: e.detail.value || null } })}>
            <Label>${this.msg.description}</Label>
          </groupentertext--ml-multiline-text>

          <label class="flex min-h-11 items-center gap-3 rounded-md border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-3 text-sm text-[var(--text-default,currentColor)]">
            <input
              type="checkbox"
              .checked=${draft.ativa ?? false}
              ?disabled=${busy}
              @change=${(e: Event) => editing
                ? this.setSalvarListaDraft({ ...this.salvarListaDraft, ativa: (e.target as HTMLInputElement).checked })
                : this.setCriarListaDraft({ ...this.criarListaDraft, ativa: (e.target as HTMLInputElement).checked })}>
            <span>${this.msg.status}</span>
          </label>
          <p class="-mt-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg.activeHelper}</p>
        </div>

        <groupnotifyuser--ml-contextual-feedback
          .type=${commandError ? 'error' : 'success'}
          .visible=${Boolean(commandError || commandSuccess)}
          .dismissible=${false}>
          <Title>${commandError ? (editing ? this.msg.saveErrorTitle : this.msg.createErrorTitle) : (editing ? this.msg.saveSuccessTitle : this.msg.createSuccessTitle)}</Title>
          <Message>${commandError ? this.msg.formErrorMessage : (editing ? this.msg.saveSuccessMessage : this.msg.createSuccessMessage)}</Message>
        </groupnotifyuser--ml-contextual-feedback>

        <div class="mt-auto border-t border-[var(--border-subtle,currentColor)] pt-5">
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            .loading=${busy}
            .disabled=${busy || draft.nome === null || draft.details.tipo === null || draft.ativa === null}
            @action=${() => editing ? this.salvarLista() : this.criarLista()}>
            <Label>${editing ? this.msg.saveChanges : this.msg.saveNew}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const selectedIndex = this.selectedLista === null ? -1 : this.listas.findIndex((lista) => lista.id === this.selectedLista);
    const loadError = this.listarListasError !== null;
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] px-8 py-7 text-[var(--text-default,currentColor)]">
        <header class="mb-7 flex items-end justify-between gap-6">
          <div>
            <h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
            <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageDescription}</p>
          </div>
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            @action=${() => { this.selectLista(null); this.setScenario('nova'); }}>
            <Label>${this.msg.newList}</Label>
          </grouptriggeraction--ml-button-standard>
        </header>

        ${loadError ? html`
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false} data-class="mb-5">
            <Title>${this.msg.loadErrorTitle}</Title>
            <Message>${this.listarListasError?.code === 'client.preconditionMissing' ? this.msg.preconditionMessage : this.msg.loadErrorMessage}</Message>
            <Action><button type="button" @click=${() => this.listarListas()}>${this.msg.retry}</button></Action>
          </groupnotifyuser--ml-contextual-feedback>
        ` : ''}

        <div class="grid min-h-[620px] grid-cols-[minmax(0,1fr)_25rem] overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <section data-organism-id="listasCadastradas" class="min-w-0 border-r border-[var(--border-default,currentColor)] p-6">
            <groupsearchcontent--ml-search-bar
              data-class="mb-5 max-w-md"
              .value=${this.busca || null}
              .error=${this.buscarListasError ? this.msg.searchError : ''}
              .loading=${this.buscarListasStatus === 'loading'}
              .placeholder=${this.msg.searchPlaceholder}
              @search=${(e: CustomEvent<{ query: string }>) => this.buscarListas(e.detail.query)}
              @change=${(e: CustomEvent<{ value: string | null }>) => this.buscarListas(e.detail.value ?? '')}
              @clear=${() => this.buscarListas('')}>
              <Label>${this.msg.searchLabel}</Label>
              <Helper>${this.msg.searchHelper}</Helper>
              <Empty>${this.msg.searchEmpty}</Empty>
            </groupsearchcontent--ml-search-bar>

            <groupviewtable--ml-data-table
              .value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
              .loading=${this.pageStatus === 'loading' || this.listarListasStatus === 'loading'}
              .error=${loadError ? this.msg.loadErrorMessage : ''}
              @rowClick=${(e: CustomEvent<{ index: number }>) => {
                const lista = this.listas[e.detail.index];
                if (lista) {
                  this.selectLista(lista.id);
                  this.setScenario('editar');
                }
              }}>
              <TableCaption>${this.msg.tableTitle}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead key="nome" sortable>${this.msg.name}</TableHead>
                  <TableHead key="tipo" sortable>${this.msg.type}</TableHead>
                  <TableHead key="ativa" sortable>${this.msg.status}</TableHead>
                  <TableHead key="tarefas" sortable>${this.msg.openTasks}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                ${this.listas.map((lista) => html`
                  <TableRow key=${lista.id}>
                    <TableCell>${lista.nome}</TableCell>
                    <TableCell>${lista.details.tipo === 'project' ? this.msg.project : this.msg.area}</TableCell>
                    <TableCell>
                      <span class=${lista.ativa ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}>
                        ${lista.ativa ? this.msg.active : this.msg.inactive}
                      </span>
                    </TableCell>
                    <TableCell sort-value=${String(lista.details.quantidadeTarefasAbertas)}>${formatNumber(lista.details.quantidadeTarefasAbertas)}</TableCell>
                  </TableRow>
                `)}
              </TableBody>
              <Empty>${this.msg.noLists}</Empty>
              <Loading>${this.msg.loadingLists}</Loading>
            </groupviewtable--ml-data-table>
          </section>

          <aside class="bg-[var(--surface-alt-bg,transparent)]">
            <molecules--ml-scenary-102020
              mode="scenary"
              .value=${this.scenary || (this.selectedLista !== null ? 'editar' : 'orientacao')}
              .backLabel=${this.msg.panelBack}
              @change=${(e: CustomEvent<{ value: string }>) => {
                if (e.target === e.currentTarget) {
                  this.setScenario(e.detail.value);
                  if (e.detail.value !== 'editar') this.selectLista(null);
                }
              }}>
              <Scene value="orientacao" title=${this.msg.startPanelTitle}>
                <div class="p-6 text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.startPanelMessage}</div>
              </Scene>
              <Scene value="nova" title=${this.msg.newPanelTitle} nav="back" backTo="orientacao">
                ${this.renderForm(false)}
              </Scene>
              <Scene value="editar" title=${this.msg.editPanelTitle} nav="back" backTo="orientacao">
                ${this.renderForm(true)}
              </Scene>
            </molecules--ml-scenary-102020>
          </aside>
        </div>
      </main>
    `;
  }
}
