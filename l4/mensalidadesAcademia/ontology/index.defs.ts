/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "mensalidadesAcademia",
  "businessDomain": "Gestão de mensalidades, matrículas, pagamentos e indicadores de academia.",
  "entities": [
    "Aluno",
    "Plano",
    "Matricula",
    "Mensalidade",
    "Pagamento"
  ],
  "relationships": [
    {
      "relationshipId": "alunoMatriculas",
      "fromEntity": "Aluno",
      "toEntity": "Matricula",
      "type": "oneToMany",
      "required": true,
      "description": "Um aluno pode possuir matrículas registradas na academia.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Matricula",
        "from": {
          "entityId": "Aluno",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Matricula",
          "fieldIds": [
            "alunoId"
          ]
        }
      }
    },
    {
      "relationshipId": "planoMatriculas",
      "fromEntity": "Plano",
      "toEntity": "Matricula",
      "type": "oneToMany",
      "required": true,
      "description": "Um plano pode estar vinculado a diversas matrículas.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Matricula",
        "from": {
          "entityId": "Plano",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Matricula",
          "fieldIds": [
            "planoId"
          ]
        }
      }
    },
    {
      "relationshipId": "matriculaMensalidades",
      "fromEntity": "Matricula",
      "toEntity": "Mensalidade",
      "type": "oneToMany",
      "required": true,
      "description": "Uma matrícula origina mensalidades para os períodos em que permanece ativa.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Mensalidade",
        "from": {
          "entityId": "Matricula",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Mensalidade",
          "fieldIds": [
            "matriculaId"
          ]
        }
      }
    },
    {
      "relationshipId": "mensalidadePagamentos",
      "fromEntity": "Mensalidade",
      "toEntity": "Pagamento",
      "type": "oneToMany",
      "required": true,
      "description": "Uma mensalidade pode receber um ou mais pagamentos registrados.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Pagamento",
        "from": {
          "entityId": "Mensalidade",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Pagamento",
          "fieldIds": [
            "mensalidadeId"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type MensalidadesAcademiaOntologyIndexType = typeof mensalidadesAcademiaOntologyIndex;

export default mensalidadesAcademiaOntologyIndex;
