/// <mls fileReference="_102047_/l2/tarefas/web/contracts/meus_avisos.defs.ts" enhancement="_blank"/>

/** Aviso diário de vencimentos de um responsável, com seus totais e o registro de geração e finalização do envio. */
export interface AvisoResumo {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: {
    readonly quantidadeTarefas: number;
    readonly quantidadeAtrasadas: number;
    readonly geradoEm: string;
    readonly finalizadoEm?: string;
    motivoFalha?: string;
  };
}

/** Dados atuais da tarefa incluída em um aviso: título, situação, prazo e indicadores de vencimento. */
export interface TarefaDoAviso {
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prazo: string;
  details: {
    readonly venceHoje: boolean;
    readonly atrasada: boolean;
  };
}

/** Linha do aviso: tarefa incluída, com o prazo registrado na geração e a situação do prazo naquele dia. */
export interface AvisoTarefa {
  details: {
    tarefas: {
      tarefaId: string;
      prazo: string;
      situacaoPrazo: 'dueToday' | 'overdue';
    };
  };
  tarefa: TarefaDoAviso;
}

/** Aviso diário de vencimentos com seus totais e a relação das tarefas incluídas. */
export interface AvisoDetalhe {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: {
    readonly quantidadeTarefas: number;
    readonly quantidadeAtrasadas: number;
  };
  tarefas: AvisoTarefa[];
}

export interface Meus_avisosContracts {
  /**
   * Finalidade: Abre a página de avisos com a primeira página dos avisos diários da pessoa logada e o conteúdo do aviso mais recente já montado.
   * Entrada: page: número da página da lista de avisos; pageSize: quantidade de avisos por página.
   * Processamento: Filtra os AvisoVencimento cujo responsavelId é a pessoa da sessão, ordenados por dataReferencia decrescente, paginados. Pela regra avisoUnicoPorResponsavelEDia há no máximo um aviso por data. Para o aviso mais recente, carrega as linhas de details.tarefas e compõe cada uma com título, situação e prazo atuais da Tarefa; venceHoje e atrasada são calculados na leitura a partir do prazo e da situação da tarefa, e quantidadeTarefas e quantidadeAtrasadas são calculados a partir das linhas. O conteúdo reflete a regra avisoSomenteTarefasAbertasVencendo: apenas tarefas abertas com prazo no dia do aviso ou anterior.
   * Saída: avisos: página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha; avisoAtual: o aviso mais recente com totais e suas tarefas, ausente se a pessoa ainda não recebeu nenhum aviso.
   */
  'tarefas.meus_avisos.carregarMeusAvisos': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { avisos: { items: AvisoResumo[]; page: number; pageSize: number; hasMore: boolean }; avisoAtual?: AvisoDetalhe };
    rules: ['avisoUnicoPorResponsavelEDia', 'avisoSomenteTarefasAbertasVencendo'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
  /**
   * Finalidade: Lista os avisos diários da pessoa logada em um período de datas de referência, página a página.
   * Entrada: dataInicio: data de referência inicial do período (inclusive, opcional); dataFim: data de referência final (inclusive, opcional); page e pageSize: página e tamanho da página.
   * Processamento: Filtra AvisoVencimento pelo responsavelId da pessoa da sessão e por dataReferencia entre dataInicio e dataFim, ordenando por dataReferencia decrescente; um aviso por data (avisoUnicoPorResponsavelEDia). quantidadeTarefas e quantidadeAtrasadas são calculados a partir das linhas de cada aviso.
   * Saída: Página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha.
   */
  'tarefas.meus_avisos.buscarAvisos': {
    kind: 'qry';
    input: { dataInicio?: string; dataFim?: string; page: number; pageSize: number };
    output: { avisos: { items: AvisoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['avisoUnicoPorResponsavelEDia'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
  /**
   * Finalidade: Traz o conteúdo completo de um aviso diário escolhido pela pessoa logada.
   * Entrada: avisoId: id do aviso escolhido na lista.
   * Processamento: Lê o AvisoVencimento pelo id e recusa se o responsavelId não for a pessoa da sessão. Compõe cada linha de details.tarefas (tarefaId, prazo registrado, situacaoPrazo) com título, situação e prazo atuais da Tarefa; venceHoje e atrasada são calculados na leitura, e quantidadeTarefas e quantidadeAtrasadas a partir das linhas. As linhas seguem a regra avisoSomenteTarefasAbertasVencendo: tarefas abertas com prazo no dia do aviso ou já vencido.
   * Saída: O aviso com data de referência, situação do envio, totais de tarefas e de atrasadas e a relação das tarefas incluídas com seus dados atuais.
   */
  'tarefas.meus_avisos.obterAviso': {
    kind: 'qry';
    input: { avisoId: string };
    output: { aviso: AvisoDetalhe };
    rules: ['avisoSomenteTarefasAbertasVencendo'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
}
