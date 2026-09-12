/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "manutencaoFrota",
  "businessDomain": "Gestão de frota de transportadora, incluindo abastecimentos, manutenção preventiva e ordens de manutenção.",
  "entities": [
    "Veiculo",
    "Oficina",
    "Abastecimento",
    "PlanoManutencaoPreventiva",
    "OrdemManutencao"
  ],
  "relationships": [
    {
      "relationshipId": "abastecimentoVeiculo",
      "fromEntity": "Abastecimento",
      "toEntity": "Veiculo",
      "type": "manyToOne",
      "required": true,
      "description": "Cada abastecimento é registrado para um único veículo da frota.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Abastecimento",
        "from": {
          "entityId": "Abastecimento",
          "fieldIds": [
            "veiculoId"
          ]
        },
        "to": {
          "entityId": "Veiculo",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "planoVeiculo",
      "fromEntity": "PlanoManutencaoPreventiva",
      "toEntity": "Veiculo",
      "type": "oneToOne",
      "required": true,
      "description": "Cada plano preventivo vigente define a periodicidade de manutenção de um veículo.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PlanoManutencaoPreventiva",
        "from": {
          "entityId": "PlanoManutencaoPreventiva",
          "fieldIds": [
            "veiculoId"
          ]
        },
        "to": {
          "entityId": "Veiculo",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "ordemVeiculo",
      "fromEntity": "OrdemManutencao",
      "toEntity": "Veiculo",
      "type": "manyToOne",
      "required": true,
      "description": "Cada ordem de manutenção é aberta para um único veículo.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "OrdemManutencao",
        "from": {
          "entityId": "OrdemManutencao",
          "fieldIds": [
            "veiculoId"
          ]
        },
        "to": {
          "entityId": "Veiculo",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "ordemPlanoPreventivo",
      "fromEntity": "OrdemManutencao",
      "toEntity": "PlanoManutencaoPreventiva",
      "type": "manyToOne",
      "required": false,
      "description": "Uma ordem pode estar vinculada ao plano preventivo que motivou a manutenção.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "OrdemManutencao",
        "from": {
          "entityId": "OrdemManutencao",
          "fieldIds": [
            "planoManutencaoPreventivaId"
          ]
        },
        "to": {
          "entityId": "PlanoManutencaoPreventiva",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "ordemOficina",
      "fromEntity": "OrdemManutencao",
      "toEntity": "Oficina",
      "type": "manyToOne",
      "required": true,
      "description": "Cada ordem de manutenção indica a oficina responsável pelo serviço.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "OrdemManutencao",
        "from": {
          "entityId": "OrdemManutencao",
          "fieldIds": [
            "oficinaId"
          ]
        },
        "to": {
          "entityId": "Oficina",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type ManutencaoFrotaOntologyIndexType = typeof manutencaoFrotaOntologyIndex;

export default manutencaoFrotaOntologyIndex;
