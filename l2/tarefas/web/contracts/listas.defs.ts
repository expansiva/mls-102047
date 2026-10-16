/// <mls fileReference="_102047_/l2/tarefas/web/contracts/listas.defs.ts" enhancement="_blank"/>

/** Detalhes da lista exibidos no cadastro: tipo e tarefas abertas. */
export interface ListaResumoDetalhes {
  details: {
    tipo: 'project' | 'area';
  };
  readonly quantidadeTarefasAbertas: number;
}

/** Linha do cadastro de listas. */
export interface ListaResumo {
  id: string;
  nome: string;
  ativa: boolean;
  details: ListaResumoDetalhes;
}

/** Detalhes editáveis da lista. */
export interface ListaEdicaoDetalhes {
  details: {
    tipo: 'project' | 'area';
    descricao?: string;
  };
}

/** Registro da lista carregado no formulário de edição. */
export interface ListaEdicao {
  id: string;
  version: number;
  nome: string;
  ativa: boolean;
  details: ListaEdicaoDetalhes;
}

export interface ListasContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, todas as listas da organização para o gestor escolher qual manter.
   * Entrada: Nenhuma entrada; o escopo é a organização do gestor da sessão.
   * Processamento: Busca todas as listas (ativas e inativas) ordenadas por nome. Para cada lista calcula quantidadeTarefasAbertas contando as tarefas com listaId igual à lista e situação aFazer, emAndamento ou emRevisao; é um campo derivado, calculado na consulta e nunca gravado. Lista não paginada, pois o número de listas de projetos e áreas cabe numa tela.
   * Saída: Lista de ListaResumo com id, nome, ativa, tipo e quantidade de tarefas abertas, no formato que o cadastro exibe.
   */
  'tarefas.listas.listarListas': {
    kind: 'qry';
    input: {};
    output: { listas: ListaResumo[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre os dados de uma lista escolhida no cadastro para edição no formulário.
   * Entrada: listaId: id da lista selecionada no cadastro.
   * Processamento: Lê a lista pelo id (read.byId) dentro da organização do gestor.
   * Saída: ListaEdicao com id, version, nome, ativa, tipo e descrição, para preencher o formulário e enviar a versão ao salvar.
   */
  'tarefas.listas.obterLista': {
    kind: 'qry';
    input: { listaId: string };
    output: { lista: ListaEdicao };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma nova lista de projeto ou área.
   * Entrada: nome: nome da lista; ativa: se recebe novas tarefas; tipo: project ou area; descricao: texto livre opcional.
   * Processamento: listaMantidaPorGestor: recusa se o usuário da sessão não for gestor. listaNomeUnico: recusa se já existir lista com o mesmo nome. Grava a lista; id e version são gerados pelo sistema; quantidadeTarefasAbertas é calculada (zero para lista nova), nunca gravada.
   * Saída: lista: a linha ListaResumo para inserir no cadastro; registro: ListaEdicao com id e version para o formulário continuar em edição sem nova chamada.
   */
  'tarefas.listas.criarLista': {
    kind: 'cmd';
    writes: 'Lista.create';
    input: { nome: string; ativa: boolean; details: { tipo: 'project' | 'area'; descricao?: string } };
    output: { lista: ListaResumo; registro: ListaEdicao };
    rules: ['listaMantidaPorGestor', 'listaNomeUnico'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas']; scope: 'organization' };
  };
  /**
   * Finalidade: Altera nome, tipo, descrição e situação ativa de uma lista existente.
   * Entrada: id e version: lista editada e versão lida (controle de concorrência); nome, ativa, tipo, descricao: novos valores.
   * Processamento: listaMantidaPorGestor: recusa se o usuário não for gestor. listaNomeUnico: recusa se outra lista já tiver o mesmo nome. Recusa se a version não for a atual. Ao inativar, a lista deixa de aparecer na escolha ao criar tarefas. quantidadeTarefasAbertas é recalculada na resposta, nunca gravada.
   * Saída: lista: a linha ListaResumo atualizada para substituir no cadastro; registro: ListaEdicao com a nova version para o formulário.
   */
  'tarefas.listas.salvarLista': {
    kind: 'cmd';
    writes: 'Lista.update';
    input: { id: string; version: number; nome: string; ativa: boolean; details: { tipo: 'project' | 'area'; descricao?: string } };
    output: { lista: ListaResumo; registro: ListaEdicao };
    rules: ['listaMantidaPorGestor', 'listaNomeUnico'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas']; scope: 'organization' };
  };
}
