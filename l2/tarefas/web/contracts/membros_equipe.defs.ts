/// <mls fileReference="_102047_/l2/tarefas/web/contracts/membros_equipe.defs.ts" enhancement="_blank"/>

/** Pessoa da equipe como aparece na lista e no cadastro: identificação, situação, país, papéis e contatos. */
export interface MembroEquipeResumo {
  id: string;
  version: number;
  details: MembroEquipeDetalhes;
}

export interface MembroEquipeDetalhes {
  identification: MembroEquipeIdentificacao;
  base: MembroEquipeBase;
}

export interface MembroEquipeIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode: string;
      readonly tags: string;
    };
  };
}

export interface MembroEquipeBase {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

export interface Membros_equipeContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, as pessoas da equipe (papel tarefas.MembroEquipe) para o gestor ver quem pode criar e receber tarefas e escolher quem atualizar.
   * Entrada: page e pageSize: página da lista; busca: trecho opcional do nome para filtrar as pessoas.
   * Processamento: Lista os membros da organização que têm o papel tarefas.MembroEquipe em details.identification.tags, filtrando pelo nome quando houver busca, ordenados por nome. Situação, papéis e resumo de contatos são campos derivados lidos do cadastro mestre, nunca calculados ou gravados aqui. Não devolve o consentimento de privacidade (campo negado ao gestor).
   * Saída: Página { items, page, pageSize, hasMore } com id, version, nome, situação, país, papéis e contatos de cada pessoa, no formato que a lista mostra.
   */
  'tarefas.membros_equipe.listarMembrosEquipe': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { membros: { items: MembroEquipeResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a pessoa escolhida na lista para abrir seus dados no formulário de cadastro.
   * Entrada: id: identificador (mdmId) da pessoa selecionada.
   * Processamento: Lê o membro pelo id (read.byId) com a versão atual, para que a edição use o controle de concorrência otimista.
   * Saída: A pessoa com id, version, nome, país e situação, que o formulário preenche.
   */
  'tarefas.membros_equipe.obterMembroEquipe': {
    kind: 'qry';
    input: { id: string };
    output: { membro: MembroEquipeResumo };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma nova pessoa na equipe para que ela possa criar e receber tarefas.
   * Entrada: name: nome como aparece nas tarefas; countryCode: país que define as regras de privacidade.
   * Processamento: Cria ou anexa a pessoa no cadastro mestre (register.createOrAttach) com o papel tarefas.MembroEquipe, sem duplicar quem já existe. Id, versão, subtipo, situação, papéis e contatos são definidos pela plataforma, não pelo endpoint.
   * Saída: A pessoa criada com id, version e dados derivados, para inserir na lista e manter no formulário sem nova chamada.
   */
  'tarefas.membros_equipe.cadastrarPessoa': {
    kind: 'cmd';
    writes: 'MembroEquipe.create';
    input: { details: { identification: { name: string; countryCode: string } } };
    output: { membro: MembroEquipeResumo };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Corrige o nome e o país da pessoa selecionada, mantendo correto como ela aparece nas tarefas.
   * Entrada: id e version: pessoa editada e versão lida; name: novo nome; countryCode: novo país.
   * Processamento: Atualiza nome e país no cadastro mestre (edit.platformFields), recusando a gravação se a versão não for a atual (concorrência otimista). Campos derivados não são alterados.
   * Saída: A pessoa atualizada com a nova versão, para atualizar a linha da lista e o formulário sem nova chamada.
   */
  'tarefas.membros_equipe.salvarAlteracoesPessoa': {
    kind: 'cmd';
    writes: 'MembroEquipe.update';
    input: { id: string; version: number; details: { identification: { name: string; countryCode: string } } };
    output: { membro: MembroEquipeResumo };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
}
