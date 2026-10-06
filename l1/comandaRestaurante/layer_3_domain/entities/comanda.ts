/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.ts" enhancement="_blank"/>
export interface Comanda {
  id: string;
  version: number;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  details: {
    discountAmount?: string;
    paymentMethod?: 'cash' | 'debitCard' | 'creditCard' | 'pix';
    subtotal?: string;
    totalComanda?: string;
  };
}
