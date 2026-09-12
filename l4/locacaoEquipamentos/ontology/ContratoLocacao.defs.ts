/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/ContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosEntityContratoLocacao = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "locacaoEquipamentos",
  "entityId": "ContratoLocacao",
  "title": "Contrato de locação",
  "description": "Registro da locação de equipamentos para um cliente durante um período definido.",
  "kind": "core",
  "party": "none",
  "displayField": "id",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do contrato de locação."
    },
    {
      "fieldId": "clienteId",
      "title": "Cliente",
      "type": "uuid",
      "required": true,
      "description": "Referência ao cliente responsável pelo contrato de locação."
    },
    {
      "fieldId": "equipamentoIds",
      "title": "Equipamentos",
      "type": "json",
      "required": true,
      "description": "Referências aos um ou mais equipamentos incluídos no contrato."
    },
    {
      "fieldId": "dataRetirada",
      "title": "Data de retirada",
      "type": "date",
      "required": true,
      "description": "Data em que os equipamentos são retirados para locação."
    },
    {
      "fieldId": "dataPrevistaDevolucao",
      "title": "Data prevista de devolução",
      "type": "date",
      "required": true,
      "description": "Data prevista para a devolução dos equipamentos."
    },
    {
      "fieldId": "dataRealDevolucao",
      "title": "Data real de devolução",
      "type": "date",
      "required": false,
      "description": "Data em que os equipamentos foram efetivamente devolvidos."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "open",
          "title": "Em aberto"
        },
        {
          "value": "returned",
          "title": "Devolvido"
        }
      ],
      "description": "Situação atual do contrato de locação."
    }
  ],
  "details": {
    "diasAtraso": {
      "type": "integer",
      "description": "Quantidade de dias entre a data prevista e a data real de devolução quando houver atraso."
    },
    "multaAtraso": {
      "type": "money",
      "description": "Valor total da multa por atraso, calculado pelas diárias dos equipamentos, dias de atraso e fator de 1,5."
    }
  },
  "lifecycleStates": [
    {
      "state": "open",
      "reachedBy": "actor"
    },
    {
      "state": "returned",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "registrarDevolucao",
      "from": [
        "open"
      ],
      "to": "returned",
      "by": [
        "atendente"
      ],
      "description": "Registra a data real de devolução e conclui o contrato de locação."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type LocacaoEquipamentosEntityContratoLocacaoType = typeof locacaoEquipamentosEntityContratoLocacao;

export default locacaoEquipamentosEntityContratoLocacao;
