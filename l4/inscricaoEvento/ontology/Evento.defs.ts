/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Evento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityEvento = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "inscricaoEvento",
  "entityId": "Evento",
  "title": "Evento",
  "description": "Evento organizado com informações, capacidade e publicação para inscrições públicas.",
  "kind": "core",
  "party": "none",
  "displayField": "titulo",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do evento."
    },
    {
      "fieldId": "titulo",
      "title": "Título",
      "type": "string",
      "required": true,
      "constraints": {
        "maxLength": 255
      },
      "description": "Título de apresentação do evento."
    },
    {
      "fieldId": "descricao",
      "title": "Descrição",
      "type": "text",
      "required": true,
      "description": "Descrição do evento e das informações relevantes para os participantes."
    },
    {
      "fieldId": "data",
      "title": "Data e horário",
      "type": "datetime",
      "required": true,
      "description": "Data e horário programados para a realização do evento."
    },
    {
      "fieldId": "local",
      "title": "Local",
      "type": "string",
      "required": true,
      "constraints": {
        "maxLength": 255
      },
      "description": "Local onde o evento será realizado."
    },
    {
      "fieldId": "numeroVagas",
      "title": "Número de vagas",
      "type": "integer",
      "required": true,
      "description": "Quantidade total de vagas disponíveis para inscrição no evento."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "cadastrado",
          "title": "Cadastrado"
        },
        {
          "value": "publicado",
          "title": "Publicado"
        }
      ],
      "description": "Situação atual do evento quanto à sua disponibilidade para inscrições públicas."
    }
  ],
  "details": {
    "totalVagasOcupadas": {
      "type": "integer",
      "description": "Quantidade de inscrições confirmadas que ocupam vagas no evento."
    },
    "vagasDisponiveis": {
      "type": "integer",
      "description": "Quantidade de vagas ainda disponíveis para confirmação de inscrições no evento."
    }
  },
  "lifecycleStates": [
    {
      "state": "cadastrado",
      "reachedBy": "actor"
    },
    {
      "state": "publicado",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "publicarEvento",
      "from": [
        "cadastrado"
      ],
      "to": "publicado",
      "by": [
        "organizador"
      ],
      "description": "Publica o evento e disponibiliza sua página para inscrições públicas."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type InscricaoEventoEntityEventoType = typeof inscricaoEventoEntityEvento;

export default inscricaoEventoEntityEvento;
