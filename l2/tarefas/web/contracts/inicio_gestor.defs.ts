/// <mls fileReference="_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.ts" enhancement="_blank"/>

/** Dados calculados de uma lista de tarefas. */
export interface ListaResumoDetalhes {
  readonly quantidadeTarefasAbertas: number;
}

/** Lista (projeto ou área) com a quantidade de tarefas abertas que ela tem. */
export interface ListaResumo {
  id: string;
  nome: string;
  details: ListaResumoDetalhes;
}

/** Identificação da lista de uma tarefa pelo nome. */
export interface ListaNome {
  nome: string;
}

/** Identificação de um membro da equipe. */
export interface MembroNomeIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes de um membro da equipe usados para identificá-lo. */
export interface MembroNomeDetalhes {
  identification: MembroNomeIdentificacao;
}

/** Membro da equipe identificado pelo nome. */
export interface MembroNome {
  details: MembroNomeDetalhes;
}

/** Indicadores calculados de uma tarefa: se está aberta, vence hoje, está atrasada e o progresso da checklist. */
export interface TarefaAcaoDetalhes {
  readonly aberta: boolean;
  readonly venceHoje: boolean;
  readonly atrasada: boolean;
  readonly progressoChecklist: string;
}

/** Tarefa da equipe com título, situação, prioridade, prazo, nome da lista, nome do responsável e indicadores de prazo e checklist. */
export interface TarefaAcao {
  id: string;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  responsavelId: string;
  details: TarefaAcaoDetalhes;
  lista: ListaNome;
  membroEquipe: MembroNome;
}

export interface Inicio_gestorContracts {
  /**
   * Finalidade: Entrega de uma só vez o panorama da equipe para o gestor: totais de tarefas abertas, que vencem hoje e atrasadas, progresso geral das checklists e tarefas abertas por lista.
   * Entrada: Nenhuma entrada. O gestor é conhecido pela sessão e enxerga todas as tarefas da equipe (escopo da organização).
   * Processamento: Conta as tarefas da equipe com Tarefa.details.aberta verdadeiro (totalAbertas), com Tarefa.details.venceHoje (totalVenceHoje) e com Tarefa.details.atrasada (totalAtrasadas). Esses campos são derivados e calculados na consulta, nunca gravados: aberta = a fazer, em andamento ou em revisão; venceHoje = aberta com prazo hoje; atrasada = aberta com prazo anterior a hoje. Soma, nas tarefas abertas, os itens feitos e o total de itens das checklists e devolve o resultado no formato ’feitos/total’ (progressoChecklist). Lista as listas, ordenadas por nome, com Lista.details.quantidadeTarefasAbertas (derivado, calculado). Não usa campos de privacidade do membro.
   * Saída: Objeto com totalAbertas, totalVenceHoje e totalAtrasadas (números), progressoChecklist (texto ’feitos/total’) e listas (cada lista com id, nome e quantidade de tarefas abertas).
   */
  'tarefas.inicio_gestor.obterPanoramaEquipe': {
    kind: 'qry';
    input: {};
    output: { readonly totalAbertas: number; readonly totalVenceHoje: number; readonly totalAtrasadas: number; readonly progressoChecklist: string; listas: ListaResumo[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista as tarefas da equipe que podem pedir uma decisão do gestor (atrasadas e que vencem hoje), já com nome da lista e do responsável, em páginas.
   * Entrada: page: número da página, começando em 1 (padrão 1). pageSize: quantidade de tarefas por página (padrão de uma tela).
   * Processamento: Considera todas as tarefas da equipe (o gestor vê todas) com Tarefa.details.aberta verdadeiro e (Tarefa.details.atrasada ou Tarefa.details.venceHoje verdadeiro); esses campos são derivados e calculados na consulta, nunca gravados. Ordena com as atrasadas primeiro, depois as que vencem hoje, e dentro de cada grupo por prazo crescente e prioridade decrescente. Resolve o nome da lista (Lista.nome) e o nome do responsável (MembroEquipe.details.identification.name) no cadastro mestre; não expõe o consentimento de privacidade. Calcula Tarefa.details.progressoChecklist (’feitos/total’) por tarefa. Pagina com page e pageSize e informa hasMore.
   * Saída: Página { items, page, pageSize, hasMore } de tarefas com id, título, situação, prioridade, prazo, listaId, responsavelId, indicadores (aberta, venceHoje, atrasada, progressoChecklist), nome da lista e nome do responsável.
   */
  'tarefas.inicio_gestor.listarTarefasParaAcao': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { tarefas: { items: TarefaAcao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
}
