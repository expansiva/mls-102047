/// <mls fileReference="_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.ts" enhancement="_blank"/>

/** Identificação do membro no cadastro mestre. */
export interface MembroIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

export interface MembroDetalhes {
  identification: MembroIdentificacao;
}

/** Membro da equipe com id e nome, usado como responsável, criador ou opção de escolha. */
export interface MembroResumo {
  id: string;
  details: MembroDetalhes;
}

/** Lista com id e nome. */
export interface ListaResumo {
  id: string;
  nome: string;
}

export interface TarefaQuadroDetails {
  details: {
    readonly aberta: boolean;
    readonly venceHoje: boolean;
    readonly atrasada: boolean;
    readonly progressoChecklist: string;
  };
}

/** Linha do quadro de tarefas da equipe. */
export interface TarefaQuadroItem {
  id: string;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  responsavelId: string;
  details: TarefaQuadroDetails;
  lista: ListaResumo;
  responsavel: MembroResumo;
}

export interface ItemChecklistDetails {
  details: {
    descricao: string;
  };
}

/** Item da checklist da tarefa, na ordem. */
export interface ItemChecklistLinha {
  id: string;
  ordem: number;
  feito: boolean;
  details: ItemChecklistDetails;
}

export interface TarefaPaiResumo {
  id: string;
  titulo: string;
}

export interface TarefaDetalheDetails {
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
    readonly aberta: boolean;
    readonly quantidadeSubtarefas: number;
    readonly progressoChecklist: string;
  };
}

/** Tarefa escolhida com lista, responsável, criador, tarefa pai, checklist e marcos do histórico. */
export interface TarefaDetalhe {
  id: string;
  version: number;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  responsavelId: string;
  criadorId: string;
  tarefaPaiId?: string;
  readonly criadaEm: string;
  details: TarefaDetalheDetails;
  lista: ListaResumo;
  responsavel: MembroResumo;
  criador: MembroResumo;
  tarefaPai?: TarefaPaiResumo;
  checklist: ItemChecklistLinha[];
}

export interface Tarefas_equipeContracts {
  /**
   * Finalidade: Carrega o quadro com todas as tarefas da equipe, já filtradas e paginadas, ao abrir a página e a cada mudança de filtro, busca ou página.
   * Entrada: listaId: lista; responsavelId: responsável; prioridade; prazoDe/prazoAte: período do prazo (inclusive); status: situações desejadas; busca: trecho do título; page/pageSize: paginação.
   * Processamento: Gestor vê todas as tarefas da equipe (escopo organização, editarSomenteTarefaVisivel). Aplica os filtros informados e a busca por título, ordena por prazo e prioridade. Junta o nome da lista e o nome do responsável (cadastro mestre) em lote. Calcula aberta, venceHoje, atrasada (com a data de hoje) e progressoChecklist (itens feitos / total) no servidor, sem gravar.
   * Saída: Página { items, page, pageSize, hasMore } de linhas prontas para o quadro, com indicação de vence hoje/atrasada e progresso da checklist.
   */
  'tarefas.tarefas_equipe.qryTarefasEquipe': {
    kind: 'qry';
    input: { listaId?: string; responsavelId?: string; prioridade?: 'low' | 'medium' | 'high'; prazo?: string; status?: Array<'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada'>; titulo?: string; page: number; pageSize: number };
    output: { tarefas: { items: TarefaQuadroItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega as opções do filtro por lista do quadro.
   * Entrada: Nenhuma.
   * Processamento: Lista todas as listas (ativas e inativas, pois tarefas antigas podem estar em listas inativas), ordenadas por nome.
   * Saída: Id e nome de cada lista para o seletor do filtro.
   */
  'tarefas.tarefas_equipe.qryListasFiltro': {
    kind: 'qry';
    input: {};
    output: { listas: ListaResumo[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca membros da equipe pelo nome, para escolher o novo responsável na reatribuição ou o responsável no filtro do quadro.
   * Entrada: nome: trecho do nome digitado; somenteAtivos: true na escolha do novo responsável.
   * Processamento: Busca por nome no cadastro mestre entre os membros com papel tarefas.MembroEquipe. Com somenteAtivos, retorna só situação Active (responsavelDeveSerMembroAtivo). Limita a poucas dezenas de resultados, ordenados por nome.
   * Saída: Id, nome e situação dos membros encontrados.
   */
  'tarefas.tarefas_equipe.qryBuscarMembros': {
    kind: 'qry';
    input: { details: { identification: { name?: string } }; somenteAtivos?: boolean };
    output: { membros: MembroResumo[] };
    rules: ['responsavelDeveSerMembroAtivo'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a tarefa escolhida no quadro com tudo o que o detalhe, as ações e o histórico mostram, em uma chamada.
   * Entrada: tarefaId: id da tarefa selecionada no quadro.
   * Processamento: Lê a tarefa pelo id (gestor vê todas). Junta nome da lista, nomes do responsável e do criador, título da tarefa pai quando houver e os itens da checklist ordenados por ordem. Calcula aberta, quantidadeSubtarefas e progressoChecklist sem gravar. Os marcos do histórico (criadaEm, devolvidaEm com motivo, concluidaEm, canceladaEm, situação e responsável atual) vêm da própria tarefa.
   * Saída: Tarefa completa com version para as ações do gestor e os marcos para a linha do tempo.
   */
  'tarefas.tarefas_equipe.qryDetalheTarefa': {
    kind: 'qry';
    input: { tarefaId: string };
    output: { tarefa: TarefaDetalhe };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Troca o responsável da tarefa escolhida pelo membro ativo selecionado e avisa o novo responsável.
   * Entrada: tarefaId: tarefa; version: versão lida, para concorrência otimista; responsavelId: novo responsável escolhido.
   * Processamento: Recusa se a versão mudou. Verifica que quem pede é o criador ou o gestor (reatribuicaoPorCriadorOuGestor) e que o novo responsável é membro ativo (responsavelDeveSerMembroAtivo). Grava só o responsável, sem alterar a situação (edicaoNaoMudaSituacao); quando a etapa é do responsável, ele passa a ser quem age agora e é avisado.
   * Saída: Tarefa atualizada no formato do detalhe e a linha do quadro atualizada, para redesenhar sem nova chamada.
   */
  'tarefas.tarefas_equipe.cmdReatribuirTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.update';
    input: { id: string; version: number; responsavelId: string };
    output: { tarefa: TarefaDetalhe; itemQuadro: TarefaQuadroItem };
    rules: ['reatribuicaoPorCriadorOuGestor', 'responsavelDeveSerMembroAtivo', 'edicaoNaoMudaSituacao', 'editarSomenteTarefaVisivel'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cancela a tarefa escolhida após a confirmação do gestor.
   * Entrada: tarefaId: tarefa; version: versão lida, para concorrência otimista.
   * Processamento: Recusa se a versão mudou. Aplica a transição cancelar: só criador ou gestor e só a partir de a fazer, em andamento ou em revisão (cancelamentoPorCriadorOuGestor); tarefa concluída ou cancelada é recusada (tarefaEncerradaNaoTransciona). Registra canceladaEm e a mensagem na sala de discussão.
   * Saída: Tarefa cancelada no formato do detalhe (com canceladaEm para o histórico) e a linha do quadro atualizada.
   */
  'tarefas.tarefas_equipe.cmdCancelarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.cancelar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe; itemQuadro: TarefaQuadroItem };
    rules: ['cancelamentoPorCriadorOuGestor', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
}
