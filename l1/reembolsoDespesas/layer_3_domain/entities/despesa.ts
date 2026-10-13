/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.ts" enhancement="_blank"/>
export type Despesa = {
  id: string;
  version: number;
  colaboradorId: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: {
    dataDespesa: string;
    categoria: string;
    valor: string;
    descricao: string;
    motivoRejeicao?: string;
    reenvioRealizado: boolean;
    dataPagamento?: string;
  };
};
