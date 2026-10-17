/// <mls fileReference="_102047_/l2/tarefas/web/contracts/listas.defs.ts" enhancement="_blank"/>

/** Detalhes de uma lista: tipo, descrição e quantidade de tarefas abertas. */
export interface ListaDetalhes {
  tipo: 'project' | 'area';
  descricao?: string;
  readonly quantidadeTarefasAbertas: number;
}

/** Lista de tarefas de um projeto ou área, com seus dados editáveis, versão e a quantidade de tarefas abertas. */
export interface ListaCadastrada {
  id: string;
  version: number;
  nome: string;
  ativa: boolean;
  details: ListaDetalhes;
}

export interface ListasContracts {
  /**
   * Finalidade: Carrega todas as listas da organização, ativas e inativas, com os dados necessários para exibir e editar cada uma.
   * Entrada: Sem entrada; o escopo é a organização do gestor logado.
   * Processamento: Lê todas as listas da organização ordenadas por nome. Para cada lista calcula quantidadeTarefasAbertas contando as tarefas com listaId igual à lista cuja situação não é concluída nem cancelada (campo derivado, nunca gravado).
   * Saída: A coleção de listas, cada uma com id, versão, nome, ativa, tipo, descrição e quantidade de tarefas abertas.
   */
  'tarefas.listas.listarListas': {
    kind: 'qry';
    input: {};
    output: { listas: ListaCadastrada[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorListas']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca as listas cujo nome contém o trecho digitado pelo gestor.
   * Entrada: busca: trecho do nome da lista; vazio devolve todas as listas.
   * Processamento: Filtra as listas da organização pelo trecho do nome, sem diferenciar maiúsculas e minúsculas, ordenando por nome. Calcula quantidadeTarefasAbertas de cada lista contando as tarefas nem concluídas nem canceladas (derivado, nunca gravado).
   * Saída: As listas encontradas, cada uma com id, versão, nome, ativa, tipo, descrição e quantidade de tarefas abertas.
   */
  'tarefas.listas.buscarListas': {
    kind: 'qry';
    input: { busca: string };
    output: { listas: ListaCadastrada[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorListas']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma nova lista de projeto ou área.
   * Entrada: nome: nome da lista; details.tipo: projeto ou área; details.descricao: objetivo da lista (opcional); ativa: se a lista recebe novas tarefas.
   * Processamento: listaMantidaPorGestor: recusa se quem chama não é gestor. listaNomeUnico: recusa se já existe outra lista com o mesmo nome. Grava a lista; quantidadeTarefasAbertas é derivada e começa em zero.
   * Saída: A lista criada, com id, versão inicial, dados gravados e quantidade de tarefas abertas.
   */
  'tarefas.listas.criarLista': {
    kind: 'cmd';
    writes: 'Lista.create';
    input: { nome: string; details: { tipo: 'project' | 'area'; descricao?: string }; ativa: boolean };
    output: { lista: ListaCadastrada };
    rules: ['listaMantidaPorGestor', 'listaNomeUnico'];
    access: { actors: ['gestor']; grants: ['gestorListas']; scope: 'organization' };
  };
  /**
   * Finalidade: Altera nome, tipo, descrição e situação de ativa de uma lista existente.
   * Entrada: id e version: lista alterada e versão lida (controle de concorrência); nome, details.tipo, details.descricao, ativa: novos valores.
   * Processamento: listaMantidaPorGestor: recusa se quem chama não é gestor. Recusa se a versão não confere com a gravada. listaNomeUnico: recusa se outra lista já usa o nome. Grava as alterações; inativar não afeta as tarefas já existentes. quantidadeTarefasAbertas é recalculada, nunca gravada.
   * Saída: A lista alterada, com a nova versão, os dados gravados e a quantidade de tarefas abertas.
   */
  'tarefas.listas.salvarLista': {
    kind: 'cmd';
    writes: 'Lista.update';
    input: { id: string; version: number; nome: string; details: { tipo: 'project' | 'area'; descricao?: string }; ativa: boolean };
    output: { lista: ListaCadastrada };
    rules: ['listaMantidaPorGestor', 'listaNomeUnico'];
    access: { actors: ['gestor']; grants: ['gestorListas']; scope: 'organization' };
  };
}
