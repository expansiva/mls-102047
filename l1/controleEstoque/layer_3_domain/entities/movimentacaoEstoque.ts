/// <mls fileReference="_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.ts" enhancement="_blank"/>
export interface MovimentacaoEstoque {
  id: string;
  version: number;
  produtoId: string;
  movimentadoEm: string;
  details: {
    tipo: 'entrada' | 'saida';
    quantidade: number;
  };
}
