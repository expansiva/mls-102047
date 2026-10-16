/// <mls fileReference="_102047_/l2/tarefas/web/contracts/inicio_gestor.defs.ts" enhancement="_blank"/>

/** Indicadores da equipe já calculados no servidor. */
export interface TotaisEquipe {
  readonly abertas: number;
  readonly vencemHoje: number;
  readonly atrasadas: number;
  readonly itensChecklistFeitos: number;
  readonly itensChecklistTotal: number;
  readonly progressoChecklist: string;
}

export interface ListaAbertasDetails {
  details: {
    readonly quantidadeTarefasAbertas: number;
  };
}

/** Lista com a quantidade de tarefas abertas. */
export interface ListaAbertas {
  id: string;
  nome: string;
  details: ListaAbertasDetails;
}

export interface TarefaAcaoDetails {
  details: {
    readonly aberta: boolean;
    readonly venceHoje: boolean;
    readonly atrasada: boolean;
    readonly progressoChecklist: string;
  };
}

export interface ListaRef {
  nome: string;
}

export interface MembroRefIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface MembroRefDetails {
  identification: MembroRefIdentification;
}

export interface MembroRef {
  details: MembroRefDetails;
}

/** Tarefa aberta atrasada ou vencendo hoje, com lista e responsável. */
export interface TarefaAcao {
  id: string;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  responsavelId: string;
  details: TarefaAcaoDetails;
  lista: ListaRef;
  membroEquipe: MembroRef;
}

export interface Inicio_gestorContracts {
  /**
   * Finalidade: Carrega, ao abrir o início do gestor, o panorama da equipe: totais de tarefas abertas, vencendo hoje e atrasadas, progresso das checklists e tarefas abertas por lista.
   * Entrada: Nenhuma entrada; o escopo é toda a equipe (organização) do gestor da sessão.
   * Processamento: Conta as tarefas da organização com details.aberta (status aFazer, emAndamento ou emRevisao), as que vencem hoje (aberta e prazo = hoje) e as atrasadas (aberta e prazo < hoje); esses indicadores derivados são calculados na consulta, nunca gravados. Soma os itens de checklist (ItemChecklist.feito por tarefaId) das tarefas abertas para obter feitos/total e o texto do progresso. Lista as listas ativas ordenadas por nome com quantidadeTarefasAbertas calculada pela contagem de tarefas abertas por listaId.
   * Saída: totais com os números já prontos para os blocos de destaque e listas com nome e quantidade de tarefas abertas, para o gestor saber onde olhar primeiro.
   */
  'tarefas.inicio_gestor.qryPanoramaEquipe': {
    kind: 'qry';
    input: {};
    output: { totais: TotaisEquipe; listas: ListaAbertas[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
  /**
   * Finalidade: Traz a caixa de tarefas da equipe que podem pedir ação do gestor: abertas e atrasadas ou vencendo hoje.
   * Entrada: page: página pedida (começa em 1); pageSize: quantidade de tarefas por página.
   * Processamento: Filtra as tarefas da organização com status aFazer, emAndamento ou emRevisao cujo prazo é hoje ou anterior; calcula aberta, venceHoje, atrasada e progressoChecklist (itens feitos do total da checklist) na consulta, sem gravar. Ordena atrasadas primeiro, por prazo crescente e prioridade decrescente. Junta o nome da lista (Lista.nome por listaId) e o nome do responsável lido no cadastro mestre (MembroEquipe.details.identification.name por responsavelId), carregados em lote.
   * Saída: Página { items, page, pageSize, hasMore } de tarefas com título, lista, responsável, prioridade, prazo, situação e progresso da checklist, prontas para os cartões; a escolha leva a Tarefas da equipe.
   */
  'tarefas.inicio_gestor.qryTarefasPedemAcao': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { tarefas: { items: TarefaAcao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorTarefasEquipe', 'gestorListas', 'gestorMembros']; scope: 'organization' };
  };
}
