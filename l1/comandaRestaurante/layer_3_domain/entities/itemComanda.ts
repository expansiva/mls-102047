/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.ts" enhancement="_blank"/>
export interface ItemComanda {
  id: string;
  version: number;
  comandaId: string;
  itemCardapioId: string;
  status: 'launched' | 'canceled';
  details: {
    quantidade: number;
    observacao?: string;
    precoUnitario: string;
    valorTotal?: string;
  };
}
