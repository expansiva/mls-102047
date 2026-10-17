/// <mls fileReference="_102047_/l2/tarefas/web/contracts/meus_avisos.defs.ts" enhancement="_blank"/>

/** Detalhes de um aviso diário: momentos de geração e finalização, motivo de falha e totais de tarefas. */
export interface AvisoResumoDetails {
  readonly geradoEm: string;
  readonly finalizadoEm?: string;
  motivoFalha?: string;
  readonly quantidadeTarefas: number;
  readonly quantidadeAtrasadas: number;
}

/** Aviso diário de vencimentos de um responsável, com data de referência, situação do envio, totais e registro de geração e finalização. */
export interface AvisoResumo {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: AvisoResumoDetails;
}

/** Indicadores atuais de prazo de uma tarefa aberta. */
export interface TarefaAvisoDetails {
  readonly venceHoje: boolean;
  readonly atrasada: boolean;
}

/** Tarefa referenciada por um aviso, com título, situação e prazo atuais. */
export interface TarefaAviso {
  id: string;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prazo: string;
  details: TarefaAvisoDetails;
}

/** Linha de um aviso diário: tarefa incluída, prazo no momento da geração e situação do prazo naquele dia. */
export interface AvisoLinhaTarefa {
  tarefaId: string;
  prazo: string;
  situacaoPrazo: 'dueToday' | 'overdue';
  tarefa: TarefaAviso;
}

/** Detalhes de um aviso diário com totais e linhas de tarefas. */
export interface AvisoDetalheDetails {
  readonly quantidadeTarefas: number;
  readonly quantidadeAtrasadas: number;
  tarefas: AvisoLinhaTarefa[];
}

/** Aviso diário de vencimentos com seus totais e as tarefas que trouxe. */
export interface AvisoDetalhe {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: AvisoDetalheDetails;
}

export interface Meus_avisosContracts {
  /**
   * Finalidade: Carrega a abertura da página de avisos: a primeira página dos avisos diários da pessoa logada e o aviso mais recente já completo com suas tarefas.
   * Entrada: pageSize: tamanho da página de avisos (opcional, padrão do servidor). A pessoa logada não é enviada: o servidor a usa como responsável.
   * Processamento: Filtra AvisoVencimento pelo responsável da sessão, ordenado por dataReferencia decrescente, página 1 (no máximo um aviso por dia, avisoUnicoPorResponsavelEDia). quantidadeTarefas e quantidadeAtrasadas são calculadas a partir das linhas do aviso (total e linhas com situacaoPrazo overdue), nunca gravadas. Para o aviso mais recente compõe as linhas (tarefaId, prazo e situacaoPrazo do momento da geração, conforme avisoSomenteTarefasAbertasVencendo) com a Tarefa atual (titulo, status, prazo) e calcula venceHoje e atrasada da tarefa em relação à data de hoje.
   * Saída: avisos: página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha. avisoAtual: o aviso mais recente com totais e linhas de tarefas; ausente se a pessoa ainda não recebeu aviso.
   */
  'tarefas.meus_avisos.qryPaginaMeusAvisos': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { avisos: { items: AvisoResumo[]; page: number; pageSize: number; hasMore: boolean }; avisoAtual?: AvisoDetalhe };
    rules: ['avisoUnicoPorResponsavelEDia', 'avisoSomenteTarefasAbertasVencendo'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
  /**
   * Finalidade: Lista os avisos diários da pessoa logada num período, página a página.
   * Entrada: dataInicio e dataFim: limites inclusivos da data de referência (opcionais); page e pageSize: página pedida e tamanho.
   * Processamento: Filtra AvisoVencimento pelo responsável da sessão e por dataReferencia entre dataInicio e dataFim, ordenado por dataReferencia decrescente (um aviso por dia, avisoUnicoPorResponsavelEDia). Calcula quantidadeTarefas e quantidadeAtrasadas a partir das linhas de cada aviso.
   * Saída: Página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha.
   */
  'tarefas.meus_avisos.qryListarMeusAvisos': {
    kind: 'qry';
    input: { dataInicio?: string; dataFim?: string; page: number; pageSize: number };
    output: { avisos: { items: AvisoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['avisoUnicoPorResponsavelEDia'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
  /**
   * Finalidade: Abre um aviso diário escolhido com seus totais e as tarefas que ele trouxe.
   * Entrada: id: id do aviso escolhido.
   * Processamento: Lê o AvisoVencimento pelo id e recusa se o responsável não for a pessoa logada. Compõe cada linha (tarefaId, prazo e situacaoPrazo do momento da geração, que conforme avisoSomenteTarefasAbertasVencendo traz só tarefas abertas vencendo no dia ou atrasadas) com a Tarefa atual (titulo, status, prazo). Calcula quantidadeTarefas, quantidadeAtrasadas e, para cada tarefa, venceHoje e atrasada em relação a hoje; nada disso é gravado.
   * Saída: O aviso com data de referência, situação, totais e as linhas de tarefas com os dados atuais de cada tarefa.
   */
  'tarefas.meus_avisos.qryAvisoPorId': {
    kind: 'qry';
    input: { id: string };
    output: { aviso: AvisoDetalhe };
    rules: ['avisoSomenteTarefasAbertasVencendo'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
}
