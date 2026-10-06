/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.ts" enhancement="_blank"/>
export interface ItemCardapio {
  id: string;
  version: number;
  name: string;
  details: {
    precoVigente: string;
  };
}
