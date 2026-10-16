/// <mls fileReference="_102047_/l2/tarefas/web/contracts/meus_avisos.defs.ts" enhancement="_blank"/>

/** Totais e datas de envio de um aviso, para a lista e o histórico. */
export interface AvisoResumoDetalhes {
  details: {
    readonly quantidadeTarefas: number;
    readonly quantidadeAtrasadas: number;
    readonly geradoEm: string;
    readonly finalizadoEm?: string;
    motivoFalha?: string;
  };
}

/** Um aviso diário na lista e no histórico de envio. */
export interface AvisoResumo {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: AvisoResumoDetalhes;
}

/** Dados atuais da tarefa incluída no aviso. */
export interface TarefaResumo {
  id: string;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prazo: string;
}

/** Linha do aviso: tarefa com o prazo e a situação do prazo no dia do aviso. */
export interface TarefaAviso {
  details: {
    tarefas: {
      tarefaId: string;
      prazo: string;
      situacaoPrazo: 'dueToday' | 'overdue';
    };
  };
  tarefa: TarefaResumo;
}

/** Totais e linhas do aviso aberto. */
export interface AvisoDetalheDetalhes {
  details: {
    readonly quantidadeTarefas: number;
    readonly quantidadeAtrasadas: number;
  };
  tarefas: TarefaAviso[];
}

/** Aviso aberto com suas tarefas que vencem hoje ou estão atrasadas. */
export interface AvisoDetalhe {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: AvisoDetalheDetalhes;
}

export interface Meus_avisosContracts {
  /**
   * Finalidade: Abre a página Meus avisos de uma vez: a lista paginada dos avisos diários do usuário da sessão, que também alimenta o histórico de envio, e o aviso mais recente (o de hoje) já aberto com as suas tarefas.
   * Entrada: responsavelId: membro da sessão (vem do contexto, nunca da tela); page e pageSize: página da lista de avisos.
   * Processamento: Filtra AvisoVencimento pelo responsável da sessão (escopo own) e ordena por dataReferencia decrescente, com o aviso de hoje primeiro; pela regra avisoUnicoPorResponsavelEDia há no máximo um aviso por data, sem agrupamento. Para cada aviso devolve status, geradoEm, finalizadoEm, motivoFalha e os totais quantidadeTarefas e quantidadeAtrasadas, que são calculados pelo servidor a partir das linhas (contagem total e contagem com situacaoPrazo = overdue), nunca gravados pelo endpoint. Para o aviso mais recente compõe as linhas details.tarefas (tarefaId, prazo, situacaoPrazo) com título, situação e prazo atuais de cada Tarefa; as linhas são as que o processo gravou segundo avisoSomenteTarefasAbertasVencendo (tarefas abertas com prazo no dia ou vencido).
   * Saída: avisos: página { items, page, pageSize, hasMore } para a lista e o histórico; avisoAberto: o aviso de hoje (ou o mais recente) com totais e linhas, ausente se o usuário ainda não recebeu aviso.
   */
  'tarefas.meus_avisos.carregarMeusAvisos': {
    kind: 'qry';
    input: { responsavelId: string; page: number; pageSize: number };
    output: { avisos: { items: AvisoResumo[]; page: number; pageSize: number; hasMore: boolean }; avisoAberto?: AvisoDetalhe };
    rules: ['avisoUnicoPorResponsavelEDia', 'avisoSomenteTarefasAbertasVencendo'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
  /**
   * Finalidade: Carrega o aviso que o usuário escolheu na lista, com as tarefas que ele trouxe.
   * Entrada: avisoId: id do aviso selecionado na lista.
   * Processamento: Lê o AvisoVencimento por id e recusa se não pertencer ao responsável da sessão (escopo own). Compõe as linhas details.tarefas (tarefaId, prazo e situacaoPrazo do momento do aviso) com título, situação e prazo atuais de cada Tarefa. As linhas são as gravadas pelo processo diário conforme avisoSomenteTarefasAbertasVencendo. quantidadeTarefas e quantidadeAtrasadas são calculadas pelo servidor a partir das linhas.
   * Saída: aviso: o aviso com data, situação, totais e linhas, para substituir o aviso aberto no detalhe.
   */
  'tarefas.meus_avisos.abrirAviso': {
    kind: 'qry';
    input: { avisoId: string };
    output: { aviso: AvisoDetalhe };
    rules: ['avisoSomenteTarefasAbertasVencendo'];
    access: { actors: ['gestor', 'membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'gestorTarefasEquipe', 'gestorAvisosProprios']; scope: 'own' };
  };
}
