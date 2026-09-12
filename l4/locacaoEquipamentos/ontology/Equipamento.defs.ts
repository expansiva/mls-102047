/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/Equipamento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosEntityEquipamento = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "locacaoEquipamentos",
  "entityId": "Equipamento",
  "title": "Equipamento",
  "description": "Equipamento de construção disponível para locação, com informações operacionais próprias da locadora.",
  "kind": "mdm",
  "party": "none",
  "mdmSubtype": "AssetEquipment",
  "displayField": "code",
  "fields": [
    {
      "fieldId": "code",
      "title": "Código",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Código interno que identifica o equipamento na locadora."
    },
    {
      "fieldId": "description",
      "title": "Descrição",
      "type": "text",
      "required": true,
      "description": "Descrição operacional do equipamento disponível para locação."
    },
    {
      "fieldId": "dailyRate",
      "title": "Valor da diária",
      "type": "money",
      "required": true,
      "description": "Valor cobrado por dia de locação do equipamento."
    },
    {
      "fieldId": "operationalStatus",
      "title": "Situação operacional",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "available",
          "title": "Disponível"
        },
        {
          "value": "rented",
          "title": "Locado"
        },
        {
          "value": "maintenance",
          "title": "Em manutenção"
        }
      ],
      "description": "Situação operacional atual do equipamento para locação ou manutenção."
    }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "locacaoEquipamentos.Equipamento"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type LocacaoEquipamentosEntityEquipamentoType = typeof locacaoEquipamentosEntityEquipamento;

export default locacaoEquipamentosEntityEquipamento;
