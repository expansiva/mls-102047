/// <mls fileReference="_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.ts" enhancement="_blank"/>

/** Identificação de um membro da equipe no cadastro mestre, com nome e situação. */
export interface MembroIdentificacao {
  name: string;
  readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
}

/** Detalhes de um membro da equipe. */
export interface MembroDetalhes {
  identification: MembroIdentificacao;
}

/** Membro da equipe com nome e situação no cadastro. */
export interface MembroResumo {
  id: string;
  details: MembroDetalhes;
}

/** Lista (projeto ou área) identificada pelo nome. */
export interface ListaResumo {
  id: string;
  nome: string;
}

/** Indicadores calculados de prazo e checklist de uma tarefa. */
export interface TarefaItemDetalhes {
  readonly venceHoje: boolean;
  readonly atrasada: boolean;
  readonly progressoChecklist: string;
}

/** Tarefa da equipe resumida com lista, responsável, prazo, situação e indicadores. */
export interface TarefaEquipeItem {
  id: string;
  titulo: string;
  listaId: string;
  lista: ListaResumo;
  responsavelId: string;
  responsavel: MembroResumo;
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  details: TarefaItemDetalhes;
}

/** Descrição de um item da checklist. */
export interface ItemChecklistDetalhes {
  descricao: string;
}

/** Item da checklist de uma tarefa com ordem e indicação de feito. */
export interface ItemChecklistLinha {
  id: string;
  ordem: number;
  feito: boolean;
  details: ItemChecklistDetalhes;
}

/** Descrição, marcos do ciclo e indicadores calculados de uma tarefa. */
export interface TarefaDetalheDetalhes {
  descricao?: string;
  motivoDevolucao?: string;
  devolvidaEm?: string;
  concluidaEm?: string;
  canceladaEm?: string;
  readonly aberta: boolean;
  readonly quantidadeSubtarefas: number;
  readonly progressoChecklist: string;
}

/** Tarefa completa com criador, responsável, marcos do histórico e itens da checklist. */
export interface TarefaDetalhe {
  id: string;
  version: number;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  readonly criadaEm: string;
  criadorId: string;
  criador: MembroResumo;
  responsavelId: string;
  responsavel: MembroResumo;
  details: TarefaDetalheDetalhes;
  itensChecklist: ItemChecklistLinha[];
}

export interface Tarefas_equipeContracts {
  /**
   * Finalidade: Carrega de uma vez as listas e os membros da equipe usados nos filtros do quadro e na escolha do novo responsável.
   * Entrada: Nenhuma entrada; o escopo é a equipe (organização) do gestor logado.
   * Processamento: Lê todas as listas da organização ordenadas por nome e todos os membros da equipe (papel tarefas.MembroEquipe) ordenados por nome, com a situação no cadastro. A situação permite distinguir os membros ativos, os únicos aceitos como responsável (responsavelDeveSerMembroAtivo).
   * Saída: listas: id e nome de cada lista; membros: id, nome e situação no cadastro de cada membro da equipe.
   */
  'tarefas.tarefas_equipe.carregarOpcoesEquipe': {
    kind: 'qry';
    input: {};
    output: { listas: ListaResumo[]; membros: MembroResumo[] };
    rules: ['responsavelDeveSerMembroAtivo'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista paginada de todas as tarefas da equipe com os filtros do quadro do gestor; roda ao abrir e a cada mudança de filtro ou página.
   * Entrada: listaId, responsavelId, prioridade, status: filtros exatos opcionais; prazoDe/prazoAte: intervalo opcional de prazo; details.venceHoje/details.atrasada: quando true, só tarefas abertas que vencem hoje ou estão atrasadas; page e pageSize: paginação.
   * Processamento: O gestor vê todas as tarefas da equipe (editarSomenteTarefaVisivel, escopo da organização). Aplica os filtros informados, ordena atrasadas e que vencem hoje primeiro e depois por prazo. Junta o nome da lista e o nome do responsável (cadastro mestre). Calcula venceHoje e atrasada (tarefa aberta com prazo igual ou anterior a hoje) e progressoChecklist (itens feitos do total, contagem dos ItemChecklist da tarefa); nada é gravado.
   * Saída: Página { items, page, pageSize, hasMore } de tarefas com título, lista, responsável, prioridade, prazo, situação, sinais de vencimento e progresso da checklist.
   */
  'tarefas.tarefas_equipe.listarTarefasEquipe': {
    kind: 'qry';
    input: { listaId?: string; responsavelId?: string; prioridade?: 'low' | 'medium' | 'high'; status?: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada'; prazoDe?: string; prazoAte?: string; details: { venceHoje?: boolean; atrasada?: boolean }; page: number; pageSize: number };
    output: { tarefas: { items: TarefaEquipeItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a tarefa escolhida no quadro com detalhe, checklist e marcos do histórico.
   * Entrada: tarefaId: id da tarefa selecionada no quadro.
   * Processamento: Lê a tarefa pelo id no escopo da equipe, junta os nomes do criador e do responsável no cadastro mestre e os itens da checklist ordenados por ordem. Calcula aberta, quantidadeSubtarefas (tarefas com esta como tarefa pai) e progressoChecklist (itens feitos do total), sem gravar.
   * Saída: A tarefa com versão, situação, prazo, criador, responsável, descrição, subtarefas, checklist e os momentos de criação, devolução (com motivo), conclusão e cancelamento.
   */
  'tarefas.tarefas_equipe.obterTarefa': {
    kind: 'qry';
    input: { tarefaId: string };
    output: { tarefa: TarefaDetalhe };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Troca o responsável da tarefa pelo membro escolhido pelo gestor.
   * Entrada: id: tarefa a reatribuir; version: versão lida, para concorrência otimista; responsavelId: novo responsável.
   * Processamento: Recusa se quem chama não for o criador nem o gestor (reatribuicaoPorCriadorOuGestor) e se o novo responsável não for membro ativo da equipe (responsavelDeveSerMembroAtivo). Grava apenas responsavelId, sem alterar a situação (edicaoNaoMudaSituacao); recusa versão divergente. Quando a etapa é do responsável, o novo responsável passa a ser quem age agora e é avisado.
   * Saída: A tarefa atualizada com o novo responsável, nova versão, checklist e marcos do histórico.
   */
  'tarefas.tarefas_equipe.reatribuirTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.update';
    input: { id: string; version: number; responsavelId: string };
    output: { tarefa: TarefaDetalhe };
    rules: ['reatribuicaoPorCriadorOuGestor', 'responsavelDeveSerMembroAtivo', 'edicaoNaoMudaSituacao', 'editarSomenteTarefaVisivel'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cancela a tarefa escolhida enquanto ela ainda está aberta.
   * Entrada: id: tarefa a cancelar; version: versão lida, para concorrência otimista.
   * Processamento: Aplica a transição cancelar. Recusa se quem chama não for o criador nem o gestor ou se a tarefa não estiver a fazer, em andamento ou em revisão (cancelamentoPorCriadorOuGestor); tarefa concluída ou cancelada não muda (tarefaEncerradaNaoTransiciona). Registra canceladaEm e a mensagem na sala de discussão; recusa versão divergente.
   * Saída: A tarefa na situação cancelada, com canceladaEm, nova versão, checklist e marcos do histórico.
   */
  'tarefas.tarefas_equipe.cancelarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.cancelar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe };
    rules: ['cancelamentoPorCriadorOuGestor', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
}
