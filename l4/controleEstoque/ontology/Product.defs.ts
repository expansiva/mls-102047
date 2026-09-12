/// <mls fileReference="_102047_/l4/controleEstoque/ontology/Product.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const controleEstoqueEntityProduct = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "controleEstoque",
  "entityId": "Product",
  "title": "Produto controlado",
  "description": "Papel do módulo para um produto da organização cujo estoque, saldo disponível e estoque mínimo são acompanhados.",
  "kind": "mdm",
  "party": "none",
  "mdmSubtype": "Product",
  "displayField": "name",
  "fields": [
    {
      "fieldId": "minimumStock",
      "title": "Estoque mínimo",
      "type": "number",
      "required": true,
      "description": "Quantidade mínima disponível deste produto que deve acionar um aviso de estoque baixo."
    }
  ],
  "details": {
    "currentStock": {
      "type": "number",
      "description": "Quantidade atualmente disponível do produto, calculada a partir das movimentações de estoque registradas."
    },
    "isBelowMinimum": {
      "type": "boolean",
      "description": "Indica se o saldo atual do produto está abaixo do estoque mínimo definido."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "controleEstoque.Product"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ControleEstoqueEntityProductType = typeof controleEstoqueEntityProduct;

export default controleEstoqueEntityProduct;
