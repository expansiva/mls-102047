/// <mls fileReference="_102047_/l1/controleEstoque/layer_3_domain/entities/produto.ts" enhancement="_blank"/>
export interface Produto {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Product';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    base: Record<string, unknown>;
    product: {
      unitOfMeasure: string;
    };
    general: Record<string, unknown>;
    controleEstoque: {
      quantidadeMinima: number;
      saldoAtual: number;
      saldoAbaixoDoMinimo: boolean;
    };
  };
}
