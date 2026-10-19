/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMembros_equipeShared, type PessoaEquipe } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  tituloLista: 'Pessoas da equipe',
  tituloNova: 'Dados da nova pessoa',
  semNome: 'Pessoa sem nome',
  voltarLista: 'Voltar para a lista',
  buscaLabel: 'Buscar pessoa pelo nome',
  buscaPlaceholder: 'Buscar pelo nome',
  buscaVazio: 'Ninguém com esse nome',
  novaPessoa: 'Nova pessoa',
  carregarMais: 'Mostrar mais pessoas',
  carregando: 'Carregando a equipe…',
  vazioTitulo: 'Ainda não há pessoas na equipe.',
  vazioAjuda: 'Cadastre a primeira pessoa para poder atribuir tarefas a ela.',
  vazioBusca: 'Nenhuma pessoa encontrada com esse nome. Tente outro trecho do nome.',
  erroLista: 'Não foi possível carregar a equipe.',
  precondicao: 'Esta tela foi aberta sem o que ela precisa para mostrar a equipe. Volte para a tela anterior e abra a equipe de novo.',
  voltar: 'Voltar',
  tentarNovamente: 'Tentar de novo',
  pessoaNaoEncontrada: 'Essa pessoa não está mais na lista. Volte e escolha outra.',
  campoNome: 'Nome',
  ajudaNome: 'Como aparece nas tarefas e na escolha de quem recebe a tarefa.',
  campoPais: 'País',
  ajudaPais: 'Código do país, por exemplo BR. Define as regras de privacidade aplicáveis.',
  situacao: 'Situação no cadastro',
  papeis: 'Papéis',
  contatos: 'Contatos',
  statusActive: 'Ativo',
  statusInactive: 'Inativo',
  statusMerged: 'Unificado',
  statusBlocked: 'Bloqueado',
  cadastrar: 'Cadastrar pessoa',
  salvar: 'Salvar alterações',
  erroCadastrar: 'Não foi possível cadastrar a pessoa.',
  erroSalvar: 'Não foi possível salvar as alterações.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

function textFromEvent(e: Event): string | null {
  const detail = (e as CustomEvent<{ value?: unknown }>).detail;
  return detail && typeof detail.value === 'string' ? detail.value : null;
}

@customElement('tarefas--web--mobile--page11--membros_equipe-102047')
export class TarefasMobilePage11Membros_equipePage extends TarefasMembros_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: PessoaEquipe['details']['identification']['status']) {
    switch (status) {
      case 'Active': return this.msg.statusActive;
      case 'Inactive': return this.msg.statusInactive;
      case 'Merged': return this.msg.statusMerged;
      default: return this.msg.statusBlocked;
    }
  }

  private renderStatus(status: PessoaEquipe['details']['identification']['status']) {
    let tone = 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    if (status === 'Active') tone = 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    else if (status === 'Blocked') tone = 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}">${this.statusLabel(status)}</span>`;
  }

  private renderRow(p: PessoaEquipe) {
    const ident = p.details.identification;
    const inactive = ident.status !== 'Active';
    const selected = this.selectedMembroEquipe === p.id;
    const contacts = p.details.base.contacts;
    return html`
      <li>
        <button
          type="button"
          class="w-full min-h-[56px] text-left rounded-lg border px-4 py-3 flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${selected
            ? 'bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)] border-[var(--selected-border,currentColor)]'
            : 'bg-[var(--surface-bg,transparent)] border-[var(--border-subtle,currentColor)]'}"
          @click=${() => {
            this.selectMembroEquipe(p.id);
            this.setScenario('registro');
          }}
        >
          <span class="flex items-start justify-between gap-3">
            <span class="text-base font-semibold break-words ${inactive ? 'text-[var(--text-muted,currentColor)]' : 'text-[var(--text-strong,currentColor)]'}">${ident.name || this.msg.semNome}</span>
            ${this.renderStatus(ident.status)}
          </span>
          <span class="text-xs text-[var(--text-muted,currentColor)] break-words">
            ${ident.countryCode}${contacts ? html` · ${contacts}` : nothing}
          </span>
        </button>
      </li>
    `;
  }

  private renderListBody() {
    const status = this.pageStatus;
    const err = this.qryPessoasEquipeError;
    const items = this.pessoas?.items ?? [];

    if (err && items.length === 0) {
      const missing = err.code === 'client.preconditionMissing';
      return html`
        <div role="alert" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 flex flex-col gap-3">
          <p class="text-sm text-[var(--text-default,currentColor)]">${missing ? this.msg.precondicao : this.msg.erroLista}</p>
          ${missing
            ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => window.history.back()}><Label>${this.msg.voltar}</Label></grouptriggeraction--ml-button-standard>`
            : html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => { this.qryPessoasEquipe(); }}><Label>${this.msg.tentarNovamente}</Label></grouptriggeraction--ml-button-standard>`}
        </div>
      `;
    }

    if ((status === 'loading' || status === 'idle') && items.length === 0) {
      return html`
        <div aria-busy="true" aria-live="polite" class="flex flex-col gap-2">
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.carregando}</p>
          ${[0, 1, 2, 3].map(() => html`<div class="h-14 rounded-lg animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>`)}
        </div>
      `;
    }

    if (items.length === 0) {
      return html`
        <div class="rounded-lg border border-dashed border-[var(--border-default,currentColor)] p-5 text-center flex flex-col gap-1">
          ${this.busca
            ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.vazioBusca}</p>`
            : html`<p class="text-base font-medium text-[var(--text-strong,currentColor)]">${this.msg.vazioTitulo}</p>
                   <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.vazioAjuda}</p>`}
        </div>
      `;
    }

    const page = this.pessoas;
    return html`
      <ul class="flex flex-col gap-2" aria-busy=${status === 'loading' ? 'true' : 'false'}>
        ${items.map((p) => this.renderRow(p))}
      </ul>
      ${page && page.hasMore
        ? html`<grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="lg"
            data-class="w-full"
            ?loading=${this.qryPessoasEquipeStatus === 'loading'}
            @action=${() => { this.qryPessoasEquipe(undefined, page.page + 1, true); }}
          ><Label>${this.msg.carregarMais}</Label></grouptriggeraction--ml-button-standard>`
        : nothing}
    `;
  }

  private renderListScene() {
    return html`
      <Scene value="lista" title=${this.msg.tituloLista}>
        <div class="flex flex-col gap-3 pb-4">
          <div data-organism-id="pessoasEquipe" class="flex flex-col gap-3">
            <groupsearchcontent--ml-search-bar
              .value=${this.busca}
              placeholder=${this.msg.buscaPlaceholder}
              ?loading=${this.qryPessoasEquipeStatus === 'loading'}
              @search=${(e: CustomEvent<{ query: string }>) => { this.qryPessoasEquipe(e.detail.query); }}
              @clear=${() => { this.qryPessoasEquipe(null); }}
            >
              <Label data-class="sr-only">${this.msg.buscaLabel}</Label>
              <Empty>${this.msg.buscaVazio}</Empty>
            </groupsearchcontent--ml-search-bar>
            ${this.renderListBody()}
          </div>
          <div class="sticky bottom-0 -mx-1 px-1 pt-2 pb-3 bg-[var(--page-bg,transparent)]">
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              size="lg"
              data-class="w-full"
              @action=${() => {
                this.selectMembroEquipe(null);
                this.setScenario('registro');
              }}
            ><Label>${this.msg.novaPessoa}</Label></grouptriggeraction--ml-button-standard>
          </div>
        </div>
      </Scene>
    `;
  }

  private renderRecordBody(rec: PessoaEquipe | null) {
    const editing = this.selectedMembroEquipe !== null;

    if (editing && rec === null) {
      return html`
        <div role="alert" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-sm text-[var(--text-default,currentColor)]">
          ${this.msg.pessoaNaoEncontrada}
        </div>
      `;
    }

    const draft = editing ? this.cmdSalvarAlteracoesDraft : this.cmdCadastrarPessoaDraft;
    const ident = draft.details.identification;
    const name = ident.name ?? '';
    const country = ident.countryCode ?? '';

    const setField = (field: 'name' | 'countryCode', value: string) => {
      if (editing) {
        this.setCmdSalvarAlteracoesDraft({
          ...this.cmdSalvarAlteracoesDraft,
          details: { identification: { ...this.cmdSalvarAlteracoesDraft.details.identification, [field]: value } },
        });
      } else {
        this.setCmdCadastrarPessoaDraft({
          details: { identification: { ...this.cmdCadastrarPessoaDraft.details.identification, [field]: value } },
        });
      }
    };

    const status = editing ? this.cmdSalvarAlteracoesStatus : this.cmdCadastrarPessoaStatus;
    const error = editing ? this.cmdSalvarAlteracoesError : this.cmdCadastrarPessoaError;
    const busy = status === 'loading';
    const incomplete = name.trim() === '' || country.trim() === '';

    const save = () => {
      if (editing) {
        this.cmdSalvarAlteracoes().then(() => {
          if (this.cmdSalvarAlteracoesStatus === 'success') {
            this.setScenario('lista');
            this.selectMembroEquipe(null);
          }
        });
      } else {
        this.cmdCadastrarPessoa().then(() => {
          if (this.cmdCadastrarPessoaStatus === 'success') {
            this.setScenario('lista');
          }
        });
      }
    };

    return html`
      <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        <groupentertext--ml-floating-text-input
          .value=${name}
          autocomplete="name"
          required
          @input=${(e: Event) => { const v = textFromEvent(e); if (v !== null) setField('name', v); }}
          @change=${(e: Event) => { const v = textFromEvent(e); if (v !== null) setField('name', v); }}
        >
          <Label>${this.msg.campoNome}</Label>
          <Helper>${this.msg.ajudaNome}</Helper>
        </groupentertext--ml-floating-text-input>

        <groupentertext--ml-enter-text
          .value=${country}
          autocomplete="country"
          required
          @input=${(e: Event) => { const v = textFromEvent(e); if (v !== null) setField('countryCode', v); }}
          @change=${(e: Event) => { const v = textFromEvent(e); if (v !== null) setField('countryCode', v); }}
        >
          <Label>${this.msg.campoPais}</Label>
          <Helper>${this.msg.ajudaPais}</Helper>
        </groupentertext--ml-enter-text>

        ${rec
          ? html`
              <dl class="flex flex-col gap-3 rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4">
                <div class="flex flex-col gap-1">
                  <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.situacao}</dt>
                  <dd>${this.renderStatus(rec.details.identification.status)}</dd>
                </div>
                ${rec.details.identification.tags
                  ? html`<div class="flex flex-col gap-1">
                      <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.papeis}</dt>
                      <dd class="text-sm text-[var(--text-default,currentColor)] break-words">${rec.details.identification.tags}</dd>
                    </div>`
                  : nothing}
                ${rec.details.base.contacts
                  ? html`<div class="flex flex-col gap-1">
                      <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.contatos}</dt>
                      <dd class="text-sm text-[var(--text-default,currentColor)] break-words">${rec.details.base.contacts}</dd>
                    </div>`
                  : nothing}
              </dl>
            `
          : nothing}

        <div aria-live="polite">
          <groupnotifyuser--ml-contextual-feedback type="error" .visible=${error !== null} .dismissible=${false}>
            <Title>${editing ? this.msg.erroSalvar : this.msg.erroCadastrar}</Title>
            <Message>${error ? error.message : ''}</Message>
          </groupnotifyuser--ml-contextual-feedback>
        </div>

        <div class="sticky bottom-0 -mx-1 px-1 pt-2 pb-3 bg-[var(--page-bg,transparent)]">
          <grouptriggeraction--ml-button-standard
            data-variant="primary"
            size="lg"
            type="button"
            data-class="w-full"
            ?disabled=${incomplete}
            ?loading=${busy}
            @action=${save}
          ><Label>${editing ? this.msg.salvar : this.msg.cadastrar}</Label></grouptriggeraction--ml-button-standard>
        </div>
      </form>
    `;
  }

  private renderRecordScene() {
    const rec = this.cadastroPessoa;
    const editing = this.selectedMembroEquipe !== null;
    const title = editing ? (rec ? rec.details.identification.name || this.msg.semNome : this.msg.semNome) : this.msg.tituloNova;
    return html`
      <Scene value="registro" title=${title} nav="back" backTo="lista">
        <div data-organism-id="cadastroPessoa" class="pb-2">
          ${this.renderRecordBody(rec)}
        </div>
      </Scene>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto w-full max-w-[430px] px-4 py-3 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .backLabel=${this.msg.voltarLista}
          .value=${this.scenary || (this.selectedMembroEquipe !== null ? 'registro' : 'lista')}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'lista') this.selectMembroEquipe(null);
            }
          }}
        >
          ${this.renderListScene()}
          ${this.renderRecordScene()}
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
