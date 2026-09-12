/// <mls fileReference="_102047_/l4/controleEstoque/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const controleEstoqueAccess = {
  "schemaVersion": "2026-09-10-ns5-access-v2",
  "moduleName": "controleEstoque",
  "actors": [
    {
      "actorId": "estoquista",
      "kind": "internal",
      "origin": "named",
      "title": "Estoquista",
      "description": "Profissional da organização responsável por operar o controle de estoque."
    }
  ],
  "authorities": [
    {
      "authorityId": "gerenciarProdutosEstoque",
      "title": "Gerenciar produtos do estoque",
      "description": "Permite cadastrar ou vincular produtos ao controle de estoque e definir o estoque mínimo."
    },
    {
      "authorityId": "registrarMovimentacoesEstoque",
      "title": "Registrar movimentações de estoque",
      "description": "Permite registrar definitivamente entradas e saídas de unidades dos produtos controlados."
    },
    {
      "authorityId": "consultarEstoque",
      "title": "Consultar estoque",
      "description": "Permite consultar saldos, limites mínimos, avisos de estoque baixo e movimentações registradas."
    }
  ],
  "grants": [
    {
      "grantId": "estoquistaGerenciaProdutosEstoque",
      "actorRef": "estoquista",
      "authorityRef": "gerenciarProdutosEstoque",
      "entityRefs": [
        "Product"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Produtos controlados por toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos dados do produto necessários para seu controle de estoque."
      }
    },
    {
      "grantId": "estoquistaRegistraMovimentacoesEstoque",
      "actorRef": "estoquista",
      "authorityRef": "registrarMovimentacoesEstoque",
      "entityRefs": [
        "StockMovement",
        "Product"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Movimentações e produtos controlados por toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos dados necessários para registrar movimentações e atualizar a disponibilidade calculada dos produtos."
      }
    },
    {
      "grantId": "estoquistaConsultaEstoque",
      "actorRef": "estoquista",
      "authorityRef": "consultarEstoque",
      "entityRefs": [
        "Product",
        "StockMovement"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Produtos e movimentações de estoque de toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos produtos, saldos calculados, avisos de estoque baixo e movimentações registradas."
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type ControleEstoqueAccessType = typeof controleEstoqueAccess;

export default controleEstoqueAccess;
