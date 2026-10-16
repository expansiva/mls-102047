/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/lista.ts" enhancement="_blank"/>
export type Lista = {
  id: string;
  version: number;
  nome: string;
  ativa: boolean;
  details: {
    tipo: 'project' | 'area';
    descricao?: string;
    quantidadeTarefasAbertas?: number;
  };
};
