/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMembros_equipeShared, type PessoaEquipe } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Pessoas da equipe',
  pageLead: 'Quem pode criar tarefas e ser responsável por elas.',
  searchLabel: 'Buscar por nome',
  searchPlaceholder: 'Nome da pessoa',
  newPerson: 'Nova pessoa',
  colName: 'Nome',
  colCountry: 'País',
  colStatus: 'Situação no cadastro',
  colContacts: 'Contatos',
  statusActive: 'Ativo',
  statusInactive: 'Inativo',
  statusMerged: 'Unificado',
  statusBlocked: 'Bloqueado',
  none: '—',
  emptyList: 'Nenhuma pessoa encontrada.',
  loadMore: 'Carregar mais pessoas',
  panelHint: 'Escolha uma pessoa na lista para corrigir nome e país, ou cadastre uma nova.',
  newTitle: 'Dados da nova pessoa',
  editFallbackTitle: 'Pessoa selecionada',
  back: 'Voltar à lista',
  fieldName: 'Nome',
  nameHelper: 'É o nome que aparece como responsável e criador nas tarefas.',
  fieldCountry: 'País',
  countryHelper: 'Código do país, por exemplo BR.',
  registerAction: 'Cadastrar pessoa',
  saveAction: 'Salvar alterações',
  registeredOk: 'Pessoa cadastrada. Ela já aparece na lista.',
  savedOk: 'Alterações salvas. A linha da lista foi atualizada.',
  preconditionMissing: 'Esta página foi aberta sem o que precisa para carregar a equipe. Volte à página anterior e abra as pessoas da equipe de novo.',
  goBack: 'Voltar',
  selectionInvalid: 'A pessoa escolhida não está na lista carregada.',
  clearSelection: 'Limpar escolha',
  loadError: 'Não foi possível carregar as pessoas da equipe.',
  retry: 'Tentar de novo',
  notFoundInList: 'Esta pessoa não está na lista carregada.'
};

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type MsgKey = keyof PageMessageType;

function statusMsgKey(status: PessoaEquipe['details']['identification']['status']): MsgKey {
  switch (status) {
    case 'Active': return 'statusActive';
    case 'Inactive': return 'statusInactive';
    case 'Merged': return 'statusMerged';
    default: return 'statusBlocked';
  }
}

function statusClass(status: PessoaEquipe['details']['identification']['status']): string {
  switch (status) {
    case 'Active':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'Blocked':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

@customElement('tarefas--web--desktop--page11--membros_equipe-102047')
export class TarefasDesktopPage11Membros_equipePage extends TarefasMembros_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private t(key: MsgKey) {
    return this.msg[key];
  }

  private openNew() {
    this.selectMembroEquipe(null);
    this.setScenario('novo');
  }

  private openRow(index: number) {
    const item = this.pessoas?.items[index];
    if (item) {
      this.selectMembroEquipe(item.id);
      this.setScenario('editar');
    }
  }

  private renderListError() {
    const err = this.qryPessoasEquipeError;
    if (!err) return nothing;
    if (err.code === 'client.preconditionMissing') {
      return html`<div role="alert" class="rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-6 text-[var(--text-default,currentColor)] flex flex-col gap-3 items-start">
        <p>${this.msg['preconditionMissing']}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => history.back()}>
          <Label>${this.msg['goBack']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    if (err.code === 'client.selectionInvalid') {
      return html`<div role="alert" class="mb-3 rounded-md bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)] p-3 flex items-center justify-between gap-3">
        <span>${this.msg['selectionInvalid']}</span>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => { this.selectMembroEquipe(null); this.setScenario('fechado'); }}>
          <Label>${this.msg['clearSelection']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
    }
    return html`<div role="alert" class="mb-3 rounded-md bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)] p-3 flex items-center justify-between gap-3">
      <span>${this.msg['loadError']}</span>
      <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.qryPessoasEquipe()}>
        <Label>${this.msg['retry']}</Label>
      </grouptriggeraction--ml-button-standard>
    </div>`;
  }

  private renderTable() {
    const items = this.pessoas?.items ?? [];
    const idx = this.selectedMembroEquipe === null ? -1 : items.findIndex((p) => p.id === this.selectedMembroEquipe);
    const loading = this.qryPessoasEquipeStatus === 'loading' && items.length === 0;
    return html`
      <groupviewtable--ml-data-table
        .value=${idx >= 0 ? String(idx) : ''}
        .loading=${loading}
        @rowClick=${(e: CustomEvent<{ index: number }>) => this.openRow(e.detail.index)}
      >
        <TableHeader>
          <TableRow>
            <TableHead key="name">${this.msg['colName']}</TableHead>
            <TableHead key="country">${this.msg['colCountry']}</TableHead>
            <TableHead key="status">${this.msg['colStatus']}</TableHead>
            <TableHead key="contacts">${this.msg['colContacts']}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          ${items.map((p) => {
            const ident = p.details.identification;
            const muted = ident.status !== 'Active';
            return html`<TableRow key=${p.id}>
              <TableCell><span class=${muted ? 'text-[var(--text-muted,currentColor)]' : 'font-medium text-[var(--text-strong,currentColor)]'}>${ident.name}</span></TableCell>
              <TableCell><span class=${muted ? 'text-[var(--text-muted,currentColor)]' : ''}>${ident.countryCode}</span></TableCell>
              <TableCell><span class=${'inline-block rounded-full px-2 py-0.5 text-xs ' + statusClass(ident.status)}>${this.t(statusMsgKey(ident.status))}</span></TableCell>
              <TableCell><span class="text-[var(--text-muted,currentColor)]">${p.details.base.contacts || this.msg['none']}</span></TableCell>
            </TableRow>`;
          })}
        </TableBody>
        <Empty>${this.msg['emptyList']}</Empty>
      </groupviewtable--ml-data-table>
      ${this.pessoas?.hasMore
        ? html`<div class="mt-3 flex justify-center">
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              .loading=${this.qryPessoasEquipeStatus === 'loading'}
              @action=${() => this.qryPessoasEquipe(undefined, (this.pessoas?.page ?? 1) + 1, true)}
            >
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`
        : nothing}
    `;
  }

  private renderPessoasEquipe() {
    const preconditionMissing = this.qryPessoasEquipeError?.code === 'client.preconditionMissing';
    return html`
      <section data-organism-id="pessoasEquipe" class="min-w-0 flex flex-col gap-4">
        ${preconditionMissing
          ? this.renderListError()
          : html`
            <div class="flex items-end justify-between gap-4">
              <div class="w-full max-w-sm">
                <groupsearchcontent--ml-search-bar
                  .value=${this.busca}
                  placeholder=${this.msg['searchPlaceholder']}
                  @search=${(e: CustomEvent<{ query: string }>) => this.qryPessoasEquipe(e.detail.query)}
                  @clear=${() => this.qryPessoasEquipe(null)}
                >
                  <Label>${this.msg['searchLabel']}</Label>
                </groupsearchcontent--ml-search-bar>
              </div>
              <grouptriggeraction--ml-button-standard @action=${() => this.openNew()}>
                <Label>${this.msg['newPerson']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
            ${this.renderListError()}
            ${this.renderTable()}`}
      </section>
    `;
  }

  private renderFeedback(error: { message: string } | null, okVisible: boolean, okText: string) {
    return html`
      <div aria-live="polite" class="flex flex-col gap-2">
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${error !== null} .dismissible=${false}>
          <Message>${error?.message ?? ''}</Message>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${okVisible} .dismissible=${false}>
          <Message>${okText}</Message>
        </groupnotifyuser--ml-contextual-feedback>
      </div>
    `;
  }

  private renderNew() {
    const draft = this.cmdCadastrarPessoaDraft;
    const ident = draft.details.identification;
    const busy = this.cmdCadastrarPessoaStatus === 'loading';
    const incomplete = !ident.name?.trim() || !ident.countryCode?.trim();
    const setIdent = (patch: Partial<typeof ident>) =>
      this.setCmdCadastrarPessoaDraft({ ...draft, details: { identification: { ...ident, ...patch } } });
    return html`
      <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        <groupentertext--ml-enter-text
          required
          .value=${ident.name ?? ''}
          @input=${(e: CustomEvent<{ value: string }>) => { if (e.detail && typeof e.detail.value === 'string') setIdent({ name: e.detail.value }); }}
          @change=${(e: CustomEvent<{ value: string }>) => { if (e.detail && typeof e.detail.value === 'string' && e.target !== e.currentTarget) setIdent({ name: e.detail.value }); }}
        >
          <Label>${this.msg['fieldName']}</Label>
          <Helper>${this.msg['nameHelper']}</Helper>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-enter-text
          required
          .value=${ident.countryCode ?? ''}
          @input=${(e: CustomEvent<{ value: string }>) => { if (e.detail && typeof e.detail.value === 'string') setIdent({ countryCode: e.detail.value }); }}
        >
          <Label>${this.msg['fieldCountry']}</Label>
          <Helper>${this.msg['countryHelper']}</Helper>
        </groupentertext--ml-enter-text>
        ${this.renderFeedback(
          this.cmdCadastrarPessoaError,
          this.cmdCadastrarPessoaStatus === 'success',
          this.msg['registeredOk']
        )}
        <div>
          <grouptriggeraction--ml-button-standard
            .disabled=${incomplete || busy}
            .loading=${busy}
            @action=${() => this.cmdCadastrarPessoa()}
          >
            <Label>${this.msg['registerAction']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </form>
    `;
  }

  private renderEdit() {
    const pessoa = this.cadastroPessoa;
    if (!pessoa) {
      return html`<p class="text-[var(--text-muted,currentColor)]">${this.msg['notFoundInList']}</p>`;
    }
    const draft = this.cmdSalvarAlteracoesDraft;
    const ident = draft.details.identification;
    const busy = this.cmdSalvarAlteracoesStatus === 'loading';
    const incomplete = !ident.name?.trim() || !ident.countryCode?.trim() || draft.id === null;
    const setIdent = (patch: Partial<typeof ident>) =>
      this.setCmdSalvarAlteracoesDraft({ ...draft, details: { identification: { ...ident, ...patch } } });
    const status = pessoa.details.identification.status;
    return html`
      <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colStatus']}</dt>
          <dd><span class=${'inline-block rounded-full px-2 py-0.5 text-xs ' + statusClass(status)}>${this.t(statusMsgKey(status))}</span></dd>
          <dt class="text-[var(--text-muted,currentColor)]">${this.msg['colContacts']}</dt>
          <dd class="text-[var(--text-default,currentColor)]">${pessoa.details.base.contacts || this.msg['none']}</dd>
        </dl>
        <groupentertext--ml-enter-text
          required
          .value=${ident.name ?? ''}
          @input=${(e: CustomEvent<{ value: string }>) => { if (e.detail && typeof e.detail.value === 'string') setIdent({ name: e.detail.value }); }}
        >
          <Label>${this.msg['fieldName']}</Label>
          <Helper>${this.msg['nameHelper']}</Helper>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-enter-text
          required
          .value=${ident.countryCode ?? ''}
          @input=${(e: CustomEvent<{ value: string }>) => { if (e.detail && typeof e.detail.value === 'string') setIdent({ countryCode: e.detail.value }); }}
        >
          <Label>${this.msg['fieldCountry']}</Label>
          <Helper>${this.msg['countryHelper']}</Helper>
        </groupentertext--ml-enter-text>
        ${this.renderFeedback(
          this.cmdSalvarAlteracoesError,
          this.cmdSalvarAlteracoesStatus === 'success',
          this.msg['savedOk']
        )}
        <div>
          <grouptriggeraction--ml-button-standard
            .disabled=${incomplete || busy}
            .loading=${busy}
            @action=${() => this.cmdSalvarAlteracoes()}
          >
            <Label>${this.msg['saveAction']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </form>
    `;
  }

  private renderCadastroPessoa() {
    const selected = this.cadastroPessoa;
    const editTitle = selected?.details.identification.name || this.msg['editFallbackTitle'];
    return html`
      <aside data-organism-id="cadastroPessoa" class="sticky top-6 self-start rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['back']}
          .value=${this.scenary || (this.selectedMembroEquipe !== null ? 'editar' : 'fechado')}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value !== 'editar') this.selectMembroEquipe(null);
            }
          }}
        >
          <Scene value="fechado" title="">
            <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['panelHint']}</p>
          </Scene>
          <Scene value="novo" title=${this.msg['newTitle']} nav="back" backTo="fechado">
            ${this.renderNew()}
          </Scene>
          <Scene value="editar" title=${editTitle} nav="back" backTo="fechado">
            ${this.renderEdit()}
          </Scene>
        </molecules--ml-scenary-102020>
      </aside>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full p-6 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageLead']}</p>
        </header>
        <div class="grid gap-6 grid-cols-[minmax(0,1fr)_22rem]">
          ${this.renderPessoasEquipe()}
          ${this.renderCadastroPessoa()}
        </div>
      </div>
    `;
  }
}
