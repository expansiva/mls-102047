/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>
import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const seedPlan = {
  "phase": "plan",
  "scenarios": [
    {
      "scenarioId": "registrarMovimentacaoEstoque",
      "tableId": "movimentacaoEstoque",
      "source": "journey:registrarMovimentacaoEstoque",
      "constraints": [
        "ref:produtoId:Produto"
      ],
      "refs": [
        {
          "field": "produtoId",
          "relationshipId": "movimentacaoEstoqueProduto",
          "entityId": "Produto"
        }
      ],
      "states": [],
      "entityId": "MovimentacaoEstoque"
    }
  ]
} as const;

export const certificationFixture = {
  "schemaVersion": "2026-09-27-m1-certification-fixture-v1",
  "phase": "plan",
  "targets": [
    "memory",
    "development"
  ],
  "datasets": [
    {
      "supportId": "data:MovimentacaoEstoque",
      "entityId": "MovimentacaoEstoque",
      "tableId": "movimentacaoEstoque",
      "dependsOn": [],
      "sourceRefs": [
        "grant:gerenciarEstoque",
        "journey:acompanharSaldos/consultarSaldos",
        "journey:acompanharSaldos/localizarProdutos",
        "journey:cadastrarProduto/informarProduto",
        "journey:registrarMovimentacaoEstoque/consultarSaldo",
        "journey:registrarMovimentacaoEstoque/localizarProduto",
        "journey:registrarMovimentacaoEstoque/registrarMovimentacao",
        "journey:tratarAvisoSaldoBaixo/consultarProdutoAvisado",
        "relationship:MovimentacaoEstoque/movimentacaoEstoqueProduto",
        "relationship:Produto/movimentacaoEstoqueProduto"
      ]
    }
  ],
  "runtime": [
    {
      "supportId": "identity:estoquista",
      "kind": "identity",
      "entityId": "",
      "actorRefs": [
        "estoquista"
      ],
      "gap": "PERSON_ENTITY_UNDECLARED: actor estoquista declares no personEntity; the test identity cannot be bound",
      "owner": "runtime"
    },
    {
      "supportId": "mdm:Produto",
      "kind": "mdm",
      "entityId": "Produto",
      "actorRefs": [
        "estoquista"
      ],
      "gap": "RUNTIME_MDM_FIXTURE_UNREFERENCED: no verified runtime capability provisions and removes Produto records by execution id",
      "owner": "runtime"
    }
  ],
  "gaps": []
} as const;

export function applicableSeeds(mode: string): TableSeedRows[] {
  if (mode !== 'development' && mode !== 'presentation') return [];
  return [];
}
