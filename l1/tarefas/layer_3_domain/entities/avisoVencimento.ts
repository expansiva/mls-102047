/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.ts" enhancement="_blank"/>
export type AvisoVencimento = {
  id: string;
  version: number;
  responsavelId: string;
  dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: {
    geradoEm: string;
    finalizadoEm?: string;
    motivoFalha?: string;
    tarefas: {
      tarefaId: string;
      prazo: string;
      situacaoPrazo: 'dueToday' | 'overdue';
    }[];
    quantidadeTarefas?: number;
    quantidadeAtrasadas?: number;
  };
};
