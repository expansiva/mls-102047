/// <mls fileReference="_102047_/l4/controleChamados/ontology/TicketComment.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyEntityArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosEntityTicketComment = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "entityId": "TicketComment",
  "title": "Comentário do chamado",
  "description": "Registro histórico de uma atualização escrita pelo atendente em um chamado aberto.",
  "kind": "core",
  "ownership": "moduleOwned",
  "party": "none",
  "sourceRefs": {
    "journeyIds": [
      "commentOpenTicket",
      "consultTicket"
    ],
    "featureIds": [
      "ticketCommenting",
      "ticketConsultation"
    ],
    "authorityRefs": [
      "tickets:read",
      "tickets:manage"
    ]
  },
  "fields": [
    {
      "fieldId": "ticketCommentId",
      "title": "Identificador do comentário",
      "type": "uuid",
      "required": true,
      "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado.",
      "constraints": [
        {
          "constraintId": "uniqueTicketCommentId",
          "kind": "unique",
          "value": "true",
          "description": "Cada comentário possui um identificador estável e exclusivo.",
          "source": "inferred"
        }
      ]
    },
    {
      "fieldId": "ticketId",
      "title": "Chamado",
      "type": "uuid",
      "required": true,
      "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido.",
      "constraints": []
    },
    {
      "fieldId": "commentText",
      "title": "Comentário",
      "type": "text",
      "required": true,
      "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado.",
      "constraints": [
        {
          "constraintId": "commentTextMinLength",
          "kind": "minLength",
          "value": "1",
          "description": "O comentário deve conter uma atualização escrita pelo atendente.",
          "source": "journey"
        }
      ]
    }
  ],
  "lifecycleStates": [],
  "lifecyclePredicates": [],
  "useRules": [
    "onlyOpenTicketCanReceiveComment"
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "ticketCommentId",
    "notes": "Comentário é um evento operacional persistido no histórico do chamado. A autoria é associada à identidade do atendente disponível no diretório e na auditoria da plataforma, sem duplicar usuários neste módulo."
  },
  "ontologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a",
  "approvedBy": "auto",
  "approvedAt": "2026-09-02T12:55:28.916Z"
} as const satisfies Ns4OntologyEntityArtifact;

export type ControleChamadosEntityTicketCommentType = typeof controleChamadosEntityTicketComment;

export default controleChamadosEntityTicketComment;
