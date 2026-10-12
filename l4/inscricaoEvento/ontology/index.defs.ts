/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "businessDomain": "Inscrição em eventos: cadastro e publicação de eventos com vagas limitadas, inscrição pública por nome e e-mail, lista de espera por ordem de chegada com promoção automática e acompanhamento de inscritos pelo organizador.",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "inscricaoEvento",
    "description": "Branch details.inscricaoEvento of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Evento",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Inscricao",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "Participante",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "EmailParticipante",
      "kind": "role",
      "subtype": "ContactChannel"
    }
  ],
  "relationships": [
    {
      "relationshipId": "inscricaoEvento",
      "from": "Inscricao",
      "to": "Evento",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada inscrição pertence a um evento; um evento reúne confirmados e lista de espera.",
      "field": "Inscricao.eventoId"
    },
    {
      "relationshipId": "inscricaoParticipante",
      "from": "Inscricao",
      "to": "Participante",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada inscrição é de um participante; um participante pode se inscrever em vários eventos, uma única vez em cada.",
      "field": "Inscricao.participanteId"
    },
    {
      "relationshipId": "participanteEmail",
      "from": "Participante",
      "to": "EmailParticipante",
      "type": "oneToMany",
      "required": true,
      "mode": "mdmRelationship",
      "description": "O participante possui o e-mail informado na inscrição como canal de contato.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "participantesDoEvento",
      "from": "Evento",
      "to": "Participante",
      "type": "manyToMany",
      "required": false,
      "mode": "throughTable",
      "description": "Pessoas inscritas em um evento, obtidas a partir das suas inscrições.",
      "through": "Inscricao",
      "path": "Evento <- Inscricao.eventoId -> Inscricao.participanteId -> Participante",
      "derived": true
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type InscricaoEventoOntologyIndexType = typeof inscricaoEventoOntologyIndex;

export default inscricaoEventoOntologyIndex;
