/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/membros_equipe.ts" enhancement="_blank" />

import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import { TarefasMembros_equipeShared } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';
import type { PessoaEquipe } from '/_102047_/l2/tarefas/web/shared/membros_equipe.js';

const pageMessage_pt_br = {
  'scene.back': 'Voltar',
  'scene.lista': 'Equipe',
  'scene.cadastro': 'Pessoa',
  'search.label': 'Buscar por nome',
  'search.placeholder': 'Nome da pessoa',
  'list.loading': 'Carregando a equipe…',
  'list.empty': 'Nenhuma pessoa encontrada.',
  'list.loadMore': 'Carregar mais',
  'list.new': 'Nova pessoa',
  'list.country': 'País',
  'status.Active': 'Ativo',
  'status.Inactive': 'Inativo',
  'status.Merged': 'Unificado',
  'status.Blocked': 'Bloqueado',
  'form.name': 'Nome',
  'form.country': 'País (código)',
  'form.status': 'Situação',
  'form.roles': 'Papéis',
  'form.contacts': 'Contatos',
  'form.save': 'Salvar alterações',
  'form.register': 'Cadastrar pessoa',
  'form.saving': 'Salvando…',
  'form.unnamed': 'Sem nome',
  'form.noValue': '—'
};

type PageMessageType = typeof pageMessage_pt_br;

const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br
};

@customElement('tarefas--web--mobile--page11--membros_equipe-102047')
export class TarefasMobilePage11Membros_equipePage extends TarefasMembros_equipeShared {
  msg: PageMessageType = pageMessage_pt_br;

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      color: #1f2933;
    }
    .view {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      box-sizing: border-box;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }
    input {
      min-height: 44px;
      padding: 0 12px;
      border: 1px solid #cbd2d9;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .row {
      width: 100%;
      min-height: 56px;
      padding: 8px 12px;
      text-align: left;
      border: 1px solid #e4e7eb;
      border-radius: 8px;
      background: #fff;
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 16px;
    }
    .meta {
      font-size: 13px;
      color: #616e7c;
    }
    .fact {
      display: flex;
      flex-direction: column;
      font-size: 14px;
    }
    .fact span:first-child {
      font-size: 13px;
      color: #616e7c;
    }
    .primary {
      min-height: 48px;
      border: none;
      border-radius: 8px;
      background: #1f5fbf;
      color: #fff;
      font-size: 16px;
    }
    .primary[disabled] {
      opacity: 0.6;
    }
    .secondary {
      min-height: 44px;
      border: 1px solid #cbd2d9;
      border-radius: 8px;
      background: #fff;
      font-size: 15px;
    }
    .error {
      color: #b42318;
      font-size: 14px;
    }
    .note {
      color: #616e7c;
      font-size: 14px;
    }
    .foot {
      position: sticky;
      bottom: 0;
      padding-top: 8px;
      background: #fff;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.msg = pageMessages[this.getMessageKey(pageMessages)] ?? pageMessage_pt_br;
  }

  private statusLabel(status: PessoaEquipe['details']['identification']['status']): string {
    switch (status) {
      case 'Active':
        return this.msg['status.Active'];
      case 'Inactive':
        return this.msg['status.Inactive'];
      case 'Merged':
        return this.msg['status.Merged'];
      case 'Blocked':
        return this.msg['status.Blocked'];
    }
  }

  private openPessoa(id: string) {
    this.selectMembroEquipe(id);
    this.setScenario('cadastro');
  }

  private openNova() {
    this.selectMembroEquipe(null);
    this.setCmdCadastrarPessoaDraft({
      details: { identification: { name: null, countryCode: null } }
    });
    this.setScenario('cadastro');
  }

  private loadMore() {
    const page = this.pessoas?.page ?? 1;
    void this.qryPessoasEquipe(undefined, page + 1, true);
  }

  private renderRow(item: PessoaEquipe) {
    const ident = item.details.identification;
    return html`<li>
      <button class="row" type="button" @click=${() => this.openPessoa(item.id)}>
        <span>${ident.name || this.msg['form.unnamed']}</span>
        <span class="meta">${this.statusLabel(ident.status)} · ${this.msg['list.country']}: ${ident.countryCode || this.msg['form.noValue']}</span>
      </button>
    </li>`;
  }

  private renderListBody() {
    const items = this.pessoas?.items ?? [];
    if (this.pageStatus === 'loading' && items.length === 0) {
      return html`<p class="note">${this.msg['list.loading']}</p>`;
    }
    if (this.pageStatus === 'error' && this.qryPessoasEquipeError) {
      return html`<p class="error">${this.qryPessoasEquipeError.message}</p>`;
    }
    if (items.length === 0) {
      return html`<p class="note">${this.msg['list.empty']}</p>`;
    }
    return html`<ul>${items.map((item: PessoaEquipe) => this.renderRow(item))}</ul>
      ${this.pessoas?.hasMore
        ? html`<button class="secondary" type="button" @click=${() => this.loadMore()}>${this.msg['list.loadMore']}</button>`
        : nothing}`;
  }

  private renderSceneLista() {
    return html`<div class="view">
      <label>
        <span>${this.msg['search.label']}</span>
        <input
          type="search"
          placeholder=${this.msg['search.placeholder']}
          .value=${this.busca ?? ''}
          @change=${(e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            void this.qryPessoasEquipe(value);
          }}
        />
      </label>
      ${this.renderListBody()}
      <div class="foot">
        <button class="primary" style="width:100%" type="button" @click=${() => this.openNova()}>${this.msg['list.new']}</button>
      </div>
    </div>`;
  }

  private renderSceneCadastro() {
    const selected = this.cadastroPessoa;
    const editing = selected !== null;
    const draft = editing ? this.cmdSalvarAlteracoesDraft : this.cmdCadastrarPessoaDraft;
    const ident = draft.details.identification;
    const status = editing ? this.cmdSalvarAlteracoesStatus : this.cmdCadastrarPessoaStatus;
    const error = editing ? this.cmdSalvarAlteracoesError : this.cmdCadastrarPessoaError;
    const saving = status === 'loading';

    const onName = (e: Event) => {
      const name = (e.target as HTMLInputElement).value;
      if (editing) {
        const d = this.cmdSalvarAlteracoesDraft;
        this.setCmdSalvarAlteracoesDraft({
          ...d,
          details: { identification: { ...d.details.identification, name } }
        });
      } else {
        const d = this.cmdCadastrarPessoaDraft;
        this.setCmdCadastrarPessoaDraft({
          ...d,
          details: { identification: { ...d.details.identification, name } }
        });
      }
    };

    const onCountry = (e: Event) => {
      const countryCode = (e.target as HTMLInputElement).value;
      if (editing) {
        const d = this.cmdSalvarAlteracoesDraft;
        this.setCmdSalvarAlteracoesDraft({
          ...d,
          details: { identification: { ...d.details.identification, countryCode } }
        });
      } else {
        const d = this.cmdCadastrarPessoaDraft;
        this.setCmdCadastrarPessoaDraft({
          ...d,
          details: { identification: { ...d.details.identification, countryCode } }
        });
      }
    };

    const onSave = () => {
      if (editing) {
        void this.cmdSalvarAlteracoes();
      } else {
        void this.cmdCadastrarPessoa();
      }
    };

    return html`<div class="view">
      <label>
        <span>${this.msg['form.name']}</span>
        <input type="text" .value=${ident.name ?? ''} @input=${onName} />
      </label>
      <label>
        <span>${this.msg['form.country']}</span>
        <input type="text" .value=${ident.countryCode ?? ''} @input=${onCountry} />
      </label>
      ${selected
        ? html`
            <div class="fact">
              <span>${this.msg['form.status']}</span>
              <span>${this.statusLabel(selected.details.identification.status)}</span>
            </div>
            <div class="fact">
              <span>${this.msg['form.roles']}</span>
              <span>${selected.details.identification.tags || this.msg['form.noValue']}</span>
            </div>
            <div class="fact">
              <span>${this.msg['form.contacts']}</span>
              <span>${selected.details.base.contacts || this.msg['form.noValue']}</span>
            </div>
          `
        : nothing}
      <div class="foot">
        ${error ? html`<p class="error">${error.message}</p>` : nothing}
        <button class="primary" style="width:100%" type="button" ?disabled=${saving} @click=${onSave}>
          ${saving ? this.msg['form.saving'] : editing ? this.msg['form.save'] : this.msg['form.register']}
        </button>
      </div>
    </div>`;
  }

  render() {
    return html`<molecules--ml-scenary-102020
      mode="scenary"
      .value=${this.scenary || 'lista'}
      backLabel=${this.msg['scene.back']}
      @change=${(e: CustomEvent<{ value: string }>) => {
        if (e.target === e.currentTarget) this.setScenario(e.detail.value);
      }}
    >
      <Scene value="lista" title=${this.msg['scene.lista']}>${this.renderSceneLista()}</Scene>
      <Scene value="cadastro" title=${this.msg['scene.cadastro']} nav="back">${this.renderSceneCadastro()}</Scene>
    </molecules--ml-scenary-102020>`;
  }
}
