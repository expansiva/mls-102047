/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/itemChecklist.ts" enhancement="_blank"/>
export type ItemChecklist = {
  id: string;
  version: number;
  tarefaId: string;
  ordem: number;
  feito: boolean;
  details: {
    descricao: string;
    marcadoEm?: string;
  };
};
