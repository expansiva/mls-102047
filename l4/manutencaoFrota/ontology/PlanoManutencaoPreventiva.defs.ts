/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/PlanoManutencaoPreventiva.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaEntityPlanoManutencaoPreventiva = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "manutencaoFrota",
  "entityId": "PlanoManutencaoPreventiva",
  "title": "Plano de manutenção preventiva",
  "description": "Definição vigente da periodicidade de manutenção preventiva de um veículo por quilometragem ou tempo.",
  "kind": "core",
  "party": "none",
  "displayField": "intervaloKm",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador do plano",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do plano de manutenção preventiva."
    },
    {
      "fieldId": "veiculoId",
      "title": "Veículo",
      "type": "uuid",
      "required": true,
      "unique": true,
      "description": "Veículo ao qual o plano de manutenção preventiva se aplica."
    },
    {
      "fieldId": "intervaloKm",
      "title": "Intervalo em quilômetros",
      "type": "integer",
      "required": false,
      "constraints": {
        "min": 1
      },
      "description": "Quantidade de quilômetros entre manutenções preventivas, quando a periodicidade for definida por quilometragem."
    },
    {
      "fieldId": "intervaloMeses",
      "title": "Intervalo em meses",
      "type": "integer",
      "required": false,
      "constraints": {
        "min": 1
      },
      "description": "Quantidade de meses entre manutenções preventivas, quando a periodicidade for definida por tempo."
    },
    {
      "fieldId": "quilometragemReferencia",
      "title": "Quilometragem de referência",
      "type": "integer",
      "required": true,
      "constraints": {
        "min": 0
      },
      "description": "Quilometragem do veículo usada como base para calcular a próxima manutenção preventiva."
    },
    {
      "fieldId": "dataReferencia",
      "title": "Data de referência",
      "type": "date",
      "required": true,
      "description": "Data usada como base para calcular a próxima manutenção preventiva por tempo."
    }
  ],
  "details": {
    "quilometragemPrevista": {
      "type": "integer",
      "description": "Quilometragem calculada em que a próxima manutenção preventiva deve ser realizada."
    },
    "dataPrevista": {
      "type": "date",
      "description": "Data calculada em que a próxima manutenção preventiva deve ser realizada por tempo."
    },
    "preventivaVencida": {
      "type": "boolean",
      "description": "Indica se a quilometragem atual do veículo ultrapassou a quilometragem prevista para a preventiva."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type ManutencaoFrotaEntityPlanoManutencaoPreventivaType = typeof manutencaoFrotaEntityPlanoManutencaoPreventiva;

export default manutencaoFrotaEntityPlanoManutencaoPreventiva;
