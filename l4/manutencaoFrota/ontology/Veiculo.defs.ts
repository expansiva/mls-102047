/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/Veiculo.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaEntityVeiculo = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "manutencaoFrota",
  "entityId": "Veiculo",
  "title": "Veículo",
  "description": "Veículo da frota acompanhado pela transportadora para operação, abastecimento e manutenção.",
  "kind": "mdm",
  "party": "none",
  "mdmSubtype": "AssetVehicle",
  "displayField": "name",
  "fields": [
    {
      "fieldId": "quilometragemAtual",
      "title": "Quilometragem atual",
      "type": "integer",
      "required": true,
      "constraints": {
        "min": 0
      },
      "description": "Quilometragem atualmente registrada no painel do veículo."
    }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "manutencaoFrota.Veiculo"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ManutencaoFrotaEntityVeiculoType = typeof manutencaoFrotaEntityVeiculo;

export default manutencaoFrotaEntityVeiculo;
