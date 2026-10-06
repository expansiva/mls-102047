/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.ts" enhancement="_blank"/>
export interface Mesa {
  id: string;
  version: number;
  code: string;
  details: {
    disponivel?: boolean;
  };
}
