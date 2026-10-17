/// <mls fileReference="_102047_/l2/tarefas/web/contracts/membros_equipe.defs.ts" enhancement="_blank"/>

/** Membro da equipe com identificação, situação no cadastro, papéis e resumo dos contatos. */
export interface PessoaEquipe {
  id: string;
  version: number;
  details: PessoaEquipeDetalhes;
}

/** Detalhes do membro da equipe: identificação e dados de base. */
export interface PessoaEquipeDetalhes {
  identification: PessoaEquipeIdentificacao;
  base: PessoaEquipeBase;
}

/** Identificação do membro da equipe: subtipo, nome, situação no cadastro, país e papéis. */
export interface PessoaEquipeIdentificacao {
  readonly subtype: 'Person';
  name: string;
  readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
  countryCode: string;
  readonly tags: string;
}

/** Dados de base do membro: resumo dos canais de contato vinculados. */
export interface PessoaEquipeBase {
  readonly contacts: string;
}

export interface Membros_equipeContracts {
  /**
   * Finalidade: Lista, de forma paginada, as pessoas da equipe da organização com o papel tarefas.MembroEquipe, com busca opcional pelo nome.
   * Entrada: busca: trecho do nome para filtrar (opcional); page e pageSize: página solicitada e tamanho da página.
   * Processamento: Filtra os membros da organização que têm o papel tarefas.MembroEquipe em tags; se houver busca, aplica correspondência parcial e sem distinção de maiúsculas sobre details.identification.name; ordena por nome. Não expõe o consentimento de privacidade (campo negado ao gestor). Situação, papéis, subtipo e contatos são campos calculados pela plataforma e apenas lidos.
   * Saída: Página { items, page, pageSize, hasMore } de pessoas, cada uma com id, version, subtipo, nome, situação no cadastro, país, papéis e resumo dos contatos.
   */
  'tarefas.membros_equipe.qryPessoasEquipe': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { pessoas: { items: PessoaEquipe[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma nova pessoa na equipe com o papel tarefas.MembroEquipe.
   * Entrada: details.identification.name: nome da pessoa como aparecerá nas tarefas; details.identification.countryCode: país da pessoa.
   * Processamento: Usa register.createOrAttach: cria a pessoa no cadastro mestre ou anexa o papel tarefas.MembroEquipe a quem já existe, sem duplicar. Valida o formato do documento. id, version, subtipo, situação, papéis e contatos são definidos pela plataforma, nunca informados pelo endpoint.
   * Saída: A pessoa cadastrada, ativa, com id, version, subtipo, nome, situação, país, papéis e resumo dos contatos.
   */
  'tarefas.membros_equipe.cmdCadastrarPessoa': {
    kind: 'cmd';
    writes: 'MembroEquipe.create';
    input: { details: { identification: { name: string; countryCode: string } } };
    output: { pessoa: PessoaEquipe };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Corrige o nome e o país de uma pessoa que já está na equipe.
   * Entrada: id: identificador do membro; version: versão lida, para controle de concorrência otimista; details.identification.name: novo nome; details.identification.countryCode: novo país.
   * Processamento: Usa edit.platformFields no cadastro mestre; recusa se a versão não for a atual. Altera apenas nome e país; os demais campos são mantidos pela plataforma.
   * Saída: A pessoa atualizada, com a nova version, subtipo, nome, situação, país, papéis e resumo dos contatos.
   */
  'tarefas.membros_equipe.cmdSalvarAlteracoes': {
    kind: 'cmd';
    writes: 'MembroEquipe.update';
    input: { id: string; version: number; details: { identification: { name: string; countryCode: string } } };
    output: { pessoa: PessoaEquipe };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorMembros']; scope: 'organization' };
  };
}
