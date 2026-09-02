/// <mls fileReference="_102047_/l4/controleChamados/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyIndexArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosOntologyIndex = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "title": "Ontologia de negócio",
  "businessDomain": "Controle de chamados e acompanhamento de atendimento",
  "entities": [
    {
      "entityId": "Ticket",
      "title": "Chamado",
      "kind": "core",
      "storage": {
        "target": "moduleDatabase",
        "scope": "module",
        "idField": "ticketId"
      },
      "definitionRef": "l4/controleChamados/ontology/Ticket.defs.ts"
    },
    {
      "entityId": "TicketComment",
      "title": "Comentário do chamado",
      "kind": "core",
      "storage": {
        "target": "moduleDatabase",
        "scope": "module",
        "idField": "ticketCommentId"
      },
      "definitionRef": "l4/controleChamados/ontology/TicketComment.defs.ts"
    }
  ],
  "relationships": [
    {
      "relationshipId": "ticketCommentBelongsToTicket",
      "fromEntity": "TicketComment",
      "toEntity": "Ticket",
      "type": "manyToOne",
      "required": true,
      "description": "Cada comentário pertence a um único chamado, mantendo seu histórico vinculado ao chamado selecionado.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "TicketComment",
        "from": {
          "entityId": "TicketComment",
          "fieldIds": [
            "ticketId"
          ]
        },
        "to": {
          "entityId": "Ticket",
          "fieldIds": [
            "ticketId"
          ]
        },
        "description": "TicketComment.ticketId obrigatório referencia Ticket.ticketId, vinculando cada comentário ao chamado."
      }
    }
  ],
  "ontologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a",
  "approvedBy": "auto",
  "approvedAt": "2026-09-02T12:55:28.916Z",
  "realization": {
    "status": "pending",
    "compiledFromOntologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a"
  }
} as const satisfies Ns4OntologyIndexArtifact;

export type ControleChamadosOntologyIndexType = typeof controleChamadosOntologyIndex;

export default controleChamadosOntologyIndex;
