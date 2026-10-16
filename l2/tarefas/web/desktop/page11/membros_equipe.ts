/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/membros_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMembros_equipeShared } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import type { MembroEquipeResumo } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  titulo: 'Pessoas da equipe',
  subtitulo: 'Quem pode criar tarefas e ser responsável por elas.',
  novaPessoa: 'Nova pessoa',
  buscaLabel: 'Buscar por nome',
  buscaPlaceholder: 'Digite parte do nome',
  colNome: 'Nome',
  colSituacao: 'Situação no cadastro',
  colPais: 'País',
  colContatos: 'Contatos',
  vazioLista: 'Nenhuma pessoa encontrada.',
  carregando: 'Carregando a equipe…',
  erroLista: 'Não foi possível carregar a equipe.',
  precondicao: 'Esta tela foi aberta sem o que precisa para carregar a equipe. Volte ao início do módulo e abra-a novamente.',
  tentarNovamente: 'Tentar novamente',
  anterior: 'Anterior',
  proxima: 'Próxima',
  pagina: 'Página',
  cenaVazio: 'Cadastro da pessoa',
  cenaForm: 'Dados da pessoa',
  dicaVazio: 'Escolha uma pessoa na lista para corrigir o nome e o país, ou use o botão acima para cadastrar alguém novo.',
  campoNome: 'Nome',
  ajudaNome: 'Como aparece nas tarefas e na escolha de quem recebe a tarefa.',
  campoPais: 'País',
  ajudaPais: 'Define as regras de privacidade aplicáveis. Informe o código do país, por exemplo BR.',
  placeholderPais: 'BR',
  cadastrar: 'Cadastrar pessoa',
  salvar: 'Salvar alterações',
  fechar: 'Fechar',
  okCadastrada: 'Pessoa cadastrada na equipe.',
  okSalva: 'Alterações salvas.',
  erroSalvar: 'Não foi possível salvar.',
  carregandoPessoa: 'Carregando os dados da pessoa…',
  erroPessoa: 'Não foi possível abrir os dados da pessoa.',
  labelSituacao: 'Situação no cadastro',
  labelPapeis: 'Papéis',
  labelContatos: 'Contatos',
  semValor: '—',
  statusActive: 'Ativa',
  statusInactive: 'Inativa',
  statusMerged: 'Unificada',
  statusBlocked: 'Bloqueada',
  statusAtivaDica: 'Ativas recebem tarefas.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const nomeDe = (m: MembroEquipeResumo) => m.details.identification.details.identification.name;
const paisDe = (m: MembroEquipeResumo) => m.details.identification.details.identification.countryCode;
const situacaoDe = (m: MembroEquipeResumo) => m.details.identification.details.identification.status;
const contatosDe = (m: MembroEquipeResumo) => m.details.base.details.base.contacts;
const papeisDe = (m: MembroEquipeResumo) => m.details.identification.details.identification.tags;

const preenchido = (v: string | null | undefined) => typeof v === 'string' && v.trim().length > 0;

const indiceDe = (items: MembroEquipeResumo[], id: string | null) => (id ? items.findIndex((m) => m.id === id) : -1);

@customElement('tarefas--web--desktop--page11--membros_equipe-102047')
export class TarefasDesktopPage11Membros_equipePage extends TarefasMembros_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: MembroEquipeResumo['details']['identification']['details']['identification']['status']) {
    switch (s) {
      case 'Active': return this.msg['statusActive'];
      case 'Inactive': return this.msg['statusInactive'];
      case 'Merged': return this.msg['statusMerged'];
      default: return this.msg['statusBlocked'];
    }
  }

  private statusClasses(s: string) {
    if (s === 'Active') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    if (s === 'Blocked') return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }

  private renderBusca() {
    return html`
      <div class="min-w-[240px] flex-1">
        <groupsearchcontent--ml-search-bar
          .value=${this.busca ?? null}
          placeholder=${this.msg['buscaPlaceholder']}
          @search=${(e: CustomEvent<{ query: string }>) => { void this.listarMembrosEquipe(e.detail.query); }}
          @clear=${() => { void this.listarMembrosEquipe(''); }}
        >
          <Label>${this.msg['buscaLabel']}</Label>
        </groupsearchcontent--ml-search-bar>
      </div>
    `;
  }

  private renderTabela() {
    const items = this.membros?.items ?? [];
    const carregando = this.listarMembrosEquipeStatus === 'loading' || this.pageStatus === 'loading';
    const erro = this.listarMembrosEquipeError;
    if (erro && !carregando) {
      const semPre = erro.code === 'client.preconditionMissing';
      return html`
        <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-[var(--text-default,currentColor)]" aria-live="polite">
          <p>${semPre ? this.msg['precondicao'] : this.msg['erroLista']}</p>
          ${semPre ? nothing : html`
            <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${erro.message}</p>
            <div class="mt-4">
              <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => { void this.listarMembrosEquipe(); }}>
                <Label>${this.msg['tentarNovamente']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`}
        </div>
      `;
    }
    const idx = indiceDe(items, this.selectedMembroEquipe);
    return html`
      <groupviewtable--ml-data-table
        .value=${idx >= 0 ? String(idx) : ''}
        ?loading=${carregando}
        @rowClick=${(e: CustomEvent<{ index: number }>) => {
          const m = items[e.detail.index];
          if (m) {
            void this.selectCadastroPessoa(m.id);
            this.setScenario('cadastro');
          }
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
          ${items.map((m) => html`
            <TableRow key=${m.id}>
              <TableCell><span class="font-medium ${situacaoDe(m) === 'Active' ? 'text-[var(--text-strong,currentColor)]' : 'text-[var(--text-muted,currentColor)]'}">${nomeDe(m)}</span></TableCell>
              <TableCell><span class="inline-block rounded-full px-2 py-0.5 text-xs ${this.statusClasses(situacaoDe(m))}">${this.statusLabel(situacaoDe(m))}</span></TableCell>
              <TableCell>${paisDe(m)}</TableCell>
              <TableCell><span class="text-[var(--text-muted,currentColor)]">${contatosDe(m) || this.msg['semValor']}</span></TableCell>
            </TableRow>
          `)}
        </TableBody>
        <Loading>${this.msg['carregando']}</Loading>
        <Empty>${this.msg['vazioLista']}</Empty>
      </groupviewtable--ml-data-table>
    `;
  }

  private renderPaginacao() {
    const m = this.membros;
    if (!m) return nothing;
    const nf = new Intl.NumberFormat(document.documentElement.lang || undefined);
    return html`
      <div class="mt-3 flex items-center justify-end gap-3 text-sm text-[var(--text-muted,currentColor)]">
        <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary" ?disabled=${m.page <= 1}
          @action=${() => { void this.listarMembrosEquipe(undefined, m.page - 1); }}>
          <Label>${this.msg['anterior']}</Label>
        </grouptriggeraction--ml-button-standard>
        <span aria-live="polite">${this.msg['pagina']} ${nf.format(m.page)}</span>
        <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary" ?disabled=${!m.hasMore}
          @action=${() => { void this.listarMembrosEquipe(undefined, m.page + 1); }}>
          <Label>${this.msg['proxima']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderFeedback(tipo: 'success' | 'error', visivel: boolean, texto: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type=${tipo} .visible=${visivel} .dismissible=${false}>
        <Message>${texto}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
  }

  private renderFormNovo() {
    const d = this.cadastrarPessoaDraft;
    const id = d.details.identification;
    const ocupado = this.cadastrarPessoaStatus === 'loading';
    const erro = this.cadastrarPessoaError;
    const invalido = !preenchido(id.name) || !preenchido(id.countryCode);
    return html`
      <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        <groupentertext--ml-enter-text
          .value=${id.name ?? ''} required
          @input=${(e: CustomEvent<{ value: string }>) => this.setCadastrarPessoaDraft({ details: { identification: { ...id, name: e.detail.value } } })}
          @change=${(e: CustomEvent<{ value: string }>) => this.setCadastrarPessoaDraft({ details: { identification: { ...id, name: e.detail.value } } })}
        >
          <Label>${this.msg['campoNome']}</Label>
          <Helper>${this.msg['ajudaNome']}</Helper>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-enter-text
          .value=${id.countryCode ?? ''} required placeholder=${this.msg['placeholderPais']}
          @input=${(e: CustomEvent<{ value: string }>) => this.setCadastrarPessoaDraft({ details: { identification: { ...id, countryCode: e.detail.value } } })}
          @change=${(e: CustomEvent<{ value: string }>) => this.setCadastrarPessoaDraft({ details: { identification: { ...id, countryCode: e.detail.value } } })}
        >
          <Label>${this.msg['campoPais']}</Label>
          <Helper>${this.msg['ajudaPais']}</Helper>
        </groupentertext--ml-enter-text>
        <div aria-live="polite">
          ${this.renderFeedback('error', !!erro, erro ? `${this.msg['erroSalvar']} ${erro.message}` : '')}
        </div>
        <div class="flex items-center gap-2">
          <grouptriggeraction--ml-button-standard ?disabled=${invalido} ?loading=${ocupado}
            @action=${() => {
              void this.cadastrarPessoa();
            }}>
            <Label>${this.msg['cadastrar']}</Label>
          </grouptriggeraction--ml-button-standard>
          ${this.renderFechar()}
        </div>
      </form>
    `;
  }

  private renderFormEdicao() {
    const d = this.salvarAlteracoesPessoaDraft;
    const id = d.details.identification;
    const ocupado = this.salvarAlteracoesPessoaStatus === 'loading';
    const erro = this.salvarAlteracoesPessoaError;
    const invalido = !d.id || d.version === null || !preenchido(id.name) || !preenchido(id.countryCode);
    const m = this.membro;
    const sucesso = this.cadastrarPessoaStatus === 'success' || this.salvarAlteracoesPessoaStatus === 'success';
    const textoSucesso = this.cadastrarPessoaStatus === 'success' ? this.msg['okCadastrada'] : this.msg['okSalva'];
    if (this.obterMembroEquipeStatus === 'loading') {
      return html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg['carregandoPessoa']}</p>`;
    }
    if (this.obterMembroEquipeError) {
      return html`
        <div class="flex flex-col gap-3" aria-live="polite">
          <p class="text-[var(--text-default,currentColor)]">${this.msg['erroPessoa']} ${this.obterMembroEquipeError.message}</p>
          <div>
            <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => { void this.obterMembroEquipe(); }}>
              <Label>${this.msg['tentarNovamente']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>
      `;
    }
    return html`
      <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        ${m ? html`
          <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt class="text-[var(--text-muted,currentColor)]">${this.msg['labelSituacao']}</dt>
            <dd class="text-[var(--text-default,currentColor)]">${this.statusLabel(situacaoDe(m))}</dd>
            <dt class="text-[var(--text-muted,currentColor)]">${this.msg['labelPapeis']}</dt>
            <dd class="text-[var(--text-default,currentColor)]">${papeisDe(m) || this.msg['semValor']}</dd>
            <dt class="text-[var(--text-muted,currentColor)]">${this.msg['labelContatos']}</dt>
            <dd class="text-[var(--text-default,currentColor)]">${contatosDe(m) || this.msg['semValor']}</dd>
          </dl>` : nothing}
        <groupentertext--ml-enter-text
          .value=${id.name ?? ''} required
          @input=${(e: CustomEvent<{ value: string }>) => this.setSalvarAlteracoesPessoaDraft({ ...d, details: { identification: { ...id, name: e.detail.value } } })}
          @change=${(e: CustomEvent<{ value: string }>) => this.setSalvarAlteracoesPessoaDraft({ ...d, details: { identification: { ...id, name: e.detail.value } } })}
        >
          <Label>${this.msg['campoNome']}</Label>
          <Helper>${this.msg['ajudaNome']}</Helper>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-enter-text
          .value=${id.countryCode ?? ''} required placeholder=${this.msg['placeholderPais']}
          @input=${(e: CustomEvent<{ value: string }>) => this.setSalvarAlteracoesPessoaDraft({ ...d, details: { identification: { ...id, countryCode: e.detail.value } } })}
          @change=${(e: CustomEvent<{ value: string }>) => this.setSalvarAlteracoesPessoaDraft({ ...d, details: { identification: { ...id, countryCode: e.detail.value } } })}
        >
          <Label>${this.msg['campoPais']}</Label>
          <Helper>${this.msg['ajudaPais']}</Helper>
        </groupentertext--ml-enter-text>
        <div aria-live="polite" class="flex flex-col gap-2">
          ${this.renderFeedback('error', !!erro, erro ? `${this.msg['erroSalvar']} ${erro.message}` : '')}
          ${this.renderFeedback('success', sucesso, textoSucesso)}
        </div>
        <div class="flex items-center gap-2">
          <grouptriggeraction--ml-button-standard ?disabled=${invalido} ?loading=${ocupado}
            @action=${() => { void this.salvarAlteracoesPessoa(); }}>
            <Label>${this.msg['salvar']}</Label>
          </grouptriggeraction--ml-button-standard>
          ${this.renderFechar()}
        </div>
      </form>
    `;
  }

  private renderFechar() {
    return html`
      <grouptriggeraction--ml-button-standard data-variant="ghost"
        @action=${() => {
          void this.selectCadastroPessoa(null);
          this.setScenario('vazio');
        }}>
        <Label>${this.msg['fechar']}</Label>
      </grouptriggeraction--ml-button-standard>
    `;
  }

  private renderPainel() {
    const nomeAtual = this.selectedMembroEquipe && this.membro ? nomeDe(this.membro) : '';
    const tituloForm = nomeAtual || this.msg['cenaForm'];
    return html`
      <molecules--ml-scenary-102020
        mode="scenary"
        .value=${this.scenary || 'vazio'}
        @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}
      >
        <Scene value="vazio" title=${this.msg['cenaVazio']}>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['dicaVazio']}</p>
        </Scene>
        <Scene value="cadastro" title=${tituloForm}>
          ${this.selectedMembroEquipe ? this.renderFormEdicao() : this.renderFormNovo()}
        </Scene>
      </molecules--ml-scenary-102020>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="mb-5">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['titulo']}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['subtitulo']} ${this.msg['statusAtivaDica']}</p>
        </header>
        <div class="grid grid-cols-[minmax(0,1fr)_380px] items-start gap-6">
          <section data-organism-id="pessoasEquipe" class="min-w-0">
            <div class="mb-3 flex flex-wrap items-end gap-3">
              ${this.renderBusca()}
              <grouptriggeraction--ml-button-standard
                @action=${() => {
                  void this.selectCadastroPessoa(null);
                  this.setScenario('cadastro');
                }}>
                <Label>${this.msg['novaPessoa']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
            ${this.renderTabela()}
            ${this.renderPaginacao()}
          </section>
          <aside data-organism-id="cadastroPessoa" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
            ${this.renderPainel()}
          </aside>
        </div>
      </div>
    `;
  }
}
