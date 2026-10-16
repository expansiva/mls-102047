/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMembros_equipeShared } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  listaTitulo: 'Membros da equipe',
  buscaLabel: 'Buscar por nome',
  buscaPlaceholder: 'Digite parte do nome',
  colNome: 'Nome',
  colSituacao: 'Situação no cadastro',
  colPais: 'País',
  colContatos: 'Contatos',
  statusActive: 'Ativo',
  statusInactive: 'Inativo',
  statusMerged: 'Unificado',
  statusBlocked: 'Bloqueado',
  vazioTitulo: 'Nenhuma pessoa encontrada',
  vazioTexto: 'Ajuste a busca ou cadastre uma pessoa da equipe.',
  verMais: 'Ver mais pessoas',
  cadastrarPessoa: 'Cadastrar pessoa',
  erroListaTitulo: 'Não foi possível mostrar a equipe',
  erroListaTexto: 'A lista não carregou. Tente de novo em instantes.',
  precondicaoTitulo: 'Faltam informações para abrir a equipe',
  precondicaoTexto: 'Esta tela foi aberta sem o que ela precisa para carregar. Volte à tela anterior e abra a equipe de novo.',
  voltarTelaAnterior: 'Voltar à tela anterior',
  tentarNovamente: 'Tentar novamente',
  voltar: 'Voltar',
  novaPessoaTitulo: 'Dados da nova pessoa',
  carregandoPessoa: 'Carregando pessoa…',
  nomeLabel: 'Nome',
  nomeAjuda: 'Como a pessoa aparece nas tarefas e na escolha de responsável.',
  paisLabel: 'País',
  paisAjuda: 'Define as regras de privacidade aplicáveis. Ex.: BR',
  salvarAlteracoes: 'Salvar alterações',
  situacaoLabel: 'Situação no cadastro',
  contatosLabel: 'Contatos',
  erroSalvarTitulo: 'Não foi possível salvar',
  erroSalvarTexto: 'Confira os dados e tente salvar de novo.',
  erroCarregarPessoa: 'Não foi possível abrir os dados desta pessoa.',
  semContatos: '—',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type CampoDraft = { details: { identification: { name: string | null; countryCode: string | null } } };

@customElement('tarefas--web--mobile--page11--membros_equipe-102047')
export class TarefasMobilePage11Membros_equipePage extends TarefasMembros_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: string) {
    const map: Record<string, string> = {
      Active: this.msg['statusActive'],
      Inactive: this.msg['statusInactive'],
      Merged: this.msg['statusMerged'],
      Blocked: this.msg['statusBlocked'],
    };
    return map[s] ?? s;
  }

  private statusClasses(s: string) {
    switch (s) {
      case 'Active':
        return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
      case 'Merged':
        return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
      case 'Blocked':
        return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
      default:
        return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    }
  }

  private renderStatus(s: string) {
    return html`<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${this.statusClasses(s)}">${this.statusLabel(s)}</span>`;
  }

  private renderLista() {
    const items = this.membros?.items ?? [];
    const selectedIdx = items.findIndex((m) => m.id === this.selectedMembroEquipe);
    const loading = this.listarMembrosEquipeStatus === 'loading';
    const err = this.listarMembrosEquipeError;
    const precondition = err?.code === 'client.preconditionMissing';

    return html`
      <div class="flex flex-col gap-4 px-4 pt-2 pb-4">
        <div data-organism-id="pessoasEquipe" class="flex flex-col gap-4">
          <groupsearchcontent--ml-search-bar
            .value=${this.busca}
            .loading=${loading}
            placeholder=${this.msg['buscaPlaceholder']}
            @search=${(e: CustomEvent<{ query: string }>) => { this.listarMembrosEquipe(e.detail.query ?? ''); }}
            @change=${(e: CustomEvent<{ value: string | null }>) => { this.listarMembrosEquipe(e.detail.value ?? ''); }}
            @clear=${() => { this.listarMembrosEquipe(''); }}
          >
            <Label>${this.msg['buscaLabel']}</Label>
          </groupsearchcontent--ml-search-bar>

          ${err
            ? html`
                <div role="alert" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
                  <p class="font-semibold text-[var(--text-strong,currentColor)]">${precondition ? this.msg['precondicaoTitulo'] : this.msg['erroListaTitulo']}</p>
                  <p class="mt-1 text-sm">${precondition ? this.msg['precondicaoTexto'] : this.msg['erroListaTexto']}</p>
                  <div class="mt-3">
                    ${precondition
                      ? html`<grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" data-class="w-full" @action=${() => window.history.back()}><Label>${this.msg['voltarTelaAnterior']}</Label></grouptriggeraction--ml-button-standard>`
                      : html`<grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" data-class="w-full" @action=${() => { this.listarMembrosEquipe(); }}><Label>${this.msg['tentarNovamente']}</Label></grouptriggeraction--ml-button-standard>`}
                  </div>
                </div>
              `
            : html`
                <groupviewtable--ml-responsive-table
                  .value=${selectedIdx >= 0 ? String(selectedIdx) : ''}
                  .loading=${loading}
                  @rowClick=${(e: CustomEvent<{ index: number }>) => {
                    const m = items[e.detail.index];
                    if (!m) return;
                    this.selectCadastroPessoa(m.id);
                    this.setScenario('registro');
                  }}
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead key="nome">${this.msg['colNome']}</TableHead>
                      <TableHead key="situacao">${this.msg['colSituacao']}</TableHead>
                      <TableHead key="pais">${this.msg['colPais']}</TableHead>
                      <TableHead key="contatos">${this.msg['colContatos']}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    ${items.map(
                      (m) => html`
                        <TableRow key=${m.id}>
                          <TableCell><span class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m.details.identification.details.identification.name}</span></TableCell>
                          <TableCell>${this.renderStatus(m.details.identification.details.identification.status)}</TableCell>
                          <TableCell><span class="text-sm text-[var(--text-muted,currentColor)]">${m.details.identification.details.identification.countryCode}</span></TableCell>
                          <TableCell><span class="text-sm text-[var(--text-muted,currentColor)]">${m.details.base.details.base.contacts || this.msg['semContatos']}</span></TableCell>
                        </TableRow>
                      `,
                    )}
                  </TableBody>
                  <Empty>
                    <div class="py-6 text-center">
                      <p class="font-semibold text-[var(--text-strong,currentColor)]">${this.msg['vazioTitulo']}</p>
                      <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['vazioTexto']}</p>
                    </div>
                  </Empty>
                </groupviewtable--ml-responsive-table>

                ${this.membros?.hasMore
                  ? html`<grouptriggeraction--ml-button-standard
                      size="lg"
                      data-variant="secondary"
                      data-class="w-full"
                      .loading=${loading}
                      @action=${() => { this.listarMembrosEquipe(undefined, undefined, true); }}
                    ><Label>${this.msg['verMais']}</Label></grouptriggeraction--ml-button-standard>`
                  : nothing}
              `}
        </div>
      </div>
      <div class="sticky bottom-0 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <grouptriggeraction--ml-button-standard
          size="lg"
          data-variant="primary"
          data-class="w-full"
          @action=${() => {
            this.selectCadastroPessoa(null);
            this.setScenario('registro');
          }}
        ><Label>${this.msg['cadastrarPessoa']}</Label></grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderCampos(
    draft: CampoDraft,
    busy: boolean,
    onName: (v: string) => void,
    onCountry: (v: string) => void,
  ) {
    const guard = (fn: (v: string) => void) => (e: CustomEvent<{ value: string }>) => {
      const v = e.detail?.value;
      if (typeof v === 'string') fn(v);
    };
    return html`
      <groupentertext--ml-floating-text-input
        .value=${draft.details.identification.name ?? ''}
        .disabled=${busy}
        .required=${true}
        autocomplete="name"
        @input=${guard(onName)}
        @change=${guard(onName)}
      >
        <Label>${this.msg['nomeLabel']}</Label>
        <Helper>${this.msg['nomeAjuda']}</Helper>
      </groupentertext--ml-floating-text-input>
      <groupentertext--ml-floating-text-input
        .value=${draft.details.identification.countryCode ?? ''}
        .disabled=${busy}
        .required=${true}
        @input=${guard(onCountry)}
        @change=${guard(onCountry)}
      >
        <Label>${this.msg['paisLabel']}</Label>
        <Helper>${this.msg['paisAjuda']}</Helper>
      </groupentertext--ml-floating-text-input>
    `;
  }

  private renderErro(titulo: string, texto: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
        <Title>${titulo}</Title>
        <Message>${texto}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
  }

  private renderRegistro() {
    const editando = !!this.selectedMembroEquipe;
    const carregando = this.obterMembroEquipeStatus === 'loading';

    if (editando) {
      const d = this.salvarAlteracoesPessoaDraft;
      const salvando = this.salvarAlteracoesPessoaStatus === 'loading';
      const incompleto = !d.details.identification.name?.trim() || !d.details.identification.countryCode?.trim();
      const identif = this.membro?.details.identification.details.identification;
      const contatos = this.membro?.details.base.details.base.contacts;

      return html`
        <form class="flex flex-col gap-5 px-4 pt-2" aria-busy=${carregando ? 'true' : 'false'} @submit=${(e: Event) => e.preventDefault()}>
          ${this.obterMembroEquipeError
            ? html`<p role="alert" class="text-sm text-[var(--text-default,currentColor)]">${this.msg['erroCarregarPessoa']}</p>
                <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" data-class="w-full" @action=${() => { this.obterMembroEquipe(); }}><Label>${this.msg['tentarNovamente']}</Label></grouptriggeraction--ml-button-standard>`
            : nothing}
          ${this.renderCampos(
            d,
            carregando || salvando,
            (v) => {
              const c = this.salvarAlteracoesPessoaDraft;
              this.setSalvarAlteracoesPessoaDraft({ ...c, details: { identification: { ...c.details.identification, name: v } } });
            },
            (v) => {
              const c = this.salvarAlteracoesPessoaDraft;
              this.setSalvarAlteracoesPessoaDraft({ ...c, details: { identification: { ...c.details.identification, countryCode: v } } });
            },
          )}
          ${identif
            ? html`<dl class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex items-center justify-between gap-3 border-t border-[var(--border-subtle,currentColor)] pt-3">
                  <dt class="text-[var(--text-muted,currentColor)]">${this.msg['situacaoLabel']}</dt>
                  <dd>${this.renderStatus(identif.status)}</dd>
                </div>
                <div class="flex items-center justify-between gap-3 border-t border-[var(--border-subtle,currentColor)] pt-3">
                  <dt class="text-[var(--text-muted,currentColor)]">${this.msg['contatosLabel']}</dt>
                  <dd class="text-right text-[var(--text-default,currentColor)]">${contatos || this.msg['semContatos']}</dd>
                </div>
              </dl>`
            : nothing}
        </form>
        <div class="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3" data-organism-id="cadastroPessoa-acoes-edicao">
          <div aria-live="polite">
            ${this.salvarAlteracoesPessoaError ? this.renderErro(this.msg['erroSalvarTitulo'], this.msg['erroSalvarTexto']) : nothing}
          </div>
          <grouptriggeraction--ml-button-standard
            size="lg"
            data-variant="primary"
            data-class="w-full"
            .disabled=${incompleto || carregando}
            .loading=${salvando}
            @action=${() => {
              this.salvarAlteracoesPessoa().then(() => {
                if (this.salvarAlteracoesPessoaStatus === 'success') this.setScenario('lista');
              });
            }}
          ><Label>${this.msg['salvarAlteracoes']}</Label></grouptriggeraction--ml-button-standard>
        </div>
      `;
    }

    const d = this.cadastrarPessoaDraft;
    const salvando = this.cadastrarPessoaStatus === 'loading';
    const incompleto = !d.details.identification.name?.trim() || !d.details.identification.countryCode?.trim();
    return html`
      <form class="flex flex-col gap-5 px-4 pt-2" @submit=${(e: Event) => e.preventDefault()}>
        ${this.renderCampos(
          d,
          salvando,
          (v) => {
            const c = this.cadastrarPessoaDraft;
            this.setCadastrarPessoaDraft({ ...c, details: { identification: { ...c.details.identification, name: v } } });
          },
          (v) => {
            const c = this.cadastrarPessoaDraft;
            this.setCadastrarPessoaDraft({ ...c, details: { identification: { ...c.details.identification, countryCode: v } } });
          },
        )}
      </form>
      <div class="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
        <div aria-live="polite">
          ${this.cadastrarPessoaError ? this.renderErro(this.msg['erroSalvarTitulo'], this.msg['erroSalvarTexto']) : nothing}
        </div>
        <grouptriggeraction--ml-button-standard
          size="lg"
          data-variant="primary"
          data-class="w-full"
          .disabled=${incompleto}
          .loading=${salvando}
          @action=${() => {
            this.cadastrarPessoa().then(() => {
              if (this.cadastrarPessoaStatus === 'success') this.setScenario('lista');
            });
          }}
        ><Label>${this.msg['cadastrarPessoa']}</Label></grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const nomeAtual = this.membro?.details.identification.details.identification.name;
    const tituloRegistro = this.selectedMembroEquipe
      ? nomeAtual || this.msg['carregandoPessoa']
      : this.msg['novaPessoaTitulo'];

    return html`
      <div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['voltar']}
          .value=${this.scenary || 'lista'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="lista" title=${this.msg['listaTitulo']}>
            <div data-organism-id="equipeCadastrada">${this.renderLista()}</div>
          </Scene>
          <Scene value="registro" title=${tituloRegistro} nav="back" backTo="lista">
            <div data-organism-id="cadastroPessoa">${this.renderRegistro()}</div>
          </Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }
}
