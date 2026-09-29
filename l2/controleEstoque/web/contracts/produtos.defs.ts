/// <mls fileReference="_102047_/l2/controleEstoque/web/contracts/produtos.defs.ts" enhancement="_blank"/>

export const createMovimentacaoEstoqueRoute = "controleEstoque.produtos.cmdCreateMovimentacaoEstoque" as const;

export interface CreateMovimentacaoEstoqueInput {
  "produtoId": string;
  "movimentadoEm": string;
  "details": {
    "tipo": "entrada" | "saida";
    "quantidade": number;
  };
}

export interface CreateMovimentacaoEstoqueOutput {
  "id": string;
  "version": number;
  "produtoId": string;
  "movimentadoEm": string;
  "details": {
    "tipo": "entrada" | "saida";
    "quantidade": number;
  };
  "movimentacaoEstoqueProduto"?: {
    "id": string;
    "details"?: {
      "identification"?: {
        "name": string;
      };
    };
  };
}

export const createProdutoRoute = "controleEstoque.produtos.cmdCreateProduto" as const;

export interface CreateProdutoInput {
  "details": {
    "identification"?: {
      "name": string;
    };
    "product"?: {
      "unitOfMeasure": string;
    };
    "controleEstoque"?: {
      "quantidadeMinima": number;
    };
  };
}

export interface CreateProdutoOutput {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Product";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
    };
    "base"?: object;
    "product"?: {
      "unitOfMeasure": string;
    };
    "general"?: object;
    "controleEstoque"?: {
      "quantidadeMinima": number;
      "saldoAtual"?: number;
      "saldoAbaixoDoMinimo"?: boolean;
    };
  };
}

export const listMovimentacaoEstoqueRoute = "controleEstoque.produtos.qryListMovimentacaoEstoque" as const;

export interface ListMovimentacaoEstoqueInput {
  "id"?: string;
  "produtoId"?: string;
  "movimentadoEm"?: string;
  "page"?: number;
}

export interface ListMovimentacaoEstoqueItem {
  "id": string;
  "version": number;
  "produtoId": string;
  "movimentadoEm": string;
  "details": {
    "tipo": "entrada" | "saida";
    "quantidade": number;
  };
  "movimentacaoEstoqueProduto"?: {
    "id": string;
    "details"?: {
      "identification"?: {
        "name": string;
      };
    };
  };
}

export type ListMovimentacaoEstoqueOutput = ListMovimentacaoEstoqueItem[];

export const listProdutoRoute = "controleEstoque.produtos.qryListProduto" as const;

export interface ListProdutoInput {
  "id"?: string;
  "details"?: {
    "identification"?: {
      "subtype"?: "Product";
      "name"?: string;
      "status"?: "Active" | "Inactive" | "Merged" | "Blocked";
    };
  };
  "page"?: number;
}

export interface ListProdutoItem {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Product";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
    };
    "base"?: object;
    "product"?: {
      "unitOfMeasure": string;
    };
    "general"?: object;
    "controleEstoque"?: {
      "quantidadeMinima": number;
      "saldoAtual"?: number;
      "saldoAbaixoDoMinimo"?: boolean;
    };
  };
}

export type ListProdutoOutput = ListProdutoItem[];
