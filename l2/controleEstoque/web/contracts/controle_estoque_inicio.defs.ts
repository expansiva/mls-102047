export const listMovimentacaoEstoqueRoute = "controleEstoque.controle_estoque_inicio.qryListMovimentacaoEstoque" as const;

export interface ListMovimentacaoEstoqueInput {
  "id": string;
  "produtoId": string;
  "occurredAt": string;
  "page"?: number;
}

export interface ListMovimentacaoEstoqueItem {
  "id": string;
  "version": number;
  "produtoId": string;
  "occurredAt": string;
  "details": {
    "movementType": "entry" | "exit";
    "quantity": number;
  };
}

export type ListMovimentacaoEstoqueOutput = ListMovimentacaoEstoqueItem[];

export const listProdutoRoute = "controleEstoque.controle_estoque_inicio.qryListProduto" as const;

export interface ListProdutoInput {
  "id": string;
  "details": {
    "identification"?: {
      "subtype": "Product";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "countryCode": string;
    };
  };
  "page"?: number;
}

export interface ListProdutoItem {
  "id": string;
  "details": {
    "identification"?: {
      "subtype": "Product";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "countryCode": string;
    };
    "product"?: {
      "unitOfMeasure": string;
    };
    "controleEstoque"?: {
      "minimumStock": number;
      "currentStock"?: number;
      "belowMinimumStock"?: boolean;
    };
  };
}

export type ListProdutoOutput = ListProdutoItem[];
