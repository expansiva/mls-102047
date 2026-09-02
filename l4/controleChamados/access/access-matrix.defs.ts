/// <mls fileReference="_102047_/l4/controleChamados/access/access-matrix.defs.ts" enhancement="_blank"/>

import type { Ns4AccessMatrixArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosAccessMatrix = {
  "schemaVersion": "2026-08-10-ns4-access-matrix-v3",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "title": "Matriz de acesso",
  "profiles": [
    {
      "profileId": "atendente",
      "title": "Atendente",
      "kind": "internal",
      "description": "Profissional responsável por registrar, consultar, comentar e encerrar chamados.",
      "actorRefs": [
        "atendente"
      ],
      "landingIntent": "Acessar a lista de chamados para registrar novos atendimentos e acompanhar os existentes."
    }
  ],
  "authorities": [
    {
      "authorityRef": "tickets:read",
      "title": "Consultar chamados e histórico",
      "description": "Permite localizar e consultar os dados, o status e o histórico de comentários dos chamados da organização.",
      "journeyStepRefs": [
        "commentOpenTicket.locateTicket",
        "closeOpenTicket.locateTicket",
        "consultTicket.locateTicket",
        "consultTicket.inspectTicket"
      ],
      "informationNeeds": [
        "Dados do chamado: título, descrição e status",
        "Histórico de comentários associado ao chamado"
      ]
    },
    {
      "authorityRef": "tickets:manage",
      "title": "Registrar e conduzir chamados",
      "description": "Permite criar chamados, registrar comentários em chamados abertos e fechar chamados abertos.",
      "journeyStepRefs": [
        "registerTicket.createTicket",
        "commentOpenTicket.recordComment",
        "closeOpenTicket.decideClosure"
      ],
      "informationNeeds": []
    }
  ],
  "grants": [
    {
      "profileRef": "atendente",
      "authorityRef": "tickets:read",
      "reason": "O atendente precisa localizar chamados e acompanhar suas informações e comentários para realizar o atendimento.",
      "dataScope": {
        "mode": "organization",
        "description": "Todos os chamados pertencentes à organização ativa."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Disponibiliza os dados completos do chamado e seu histórico de comentários necessários ao acompanhamento.",
        "allowedInformation": [],
        "deniedInformation": []
      },
      "useRules": []
    },
    {
      "profileRef": "atendente",
      "authorityRef": "tickets:manage",
      "reason": "O atendente é o único perfil responsável por iniciar, atualizar o histórico e concluir os chamados da organização.",
      "dataScope": {
        "mode": "organization",
        "description": "Todos os chamados pertencentes à organização ativa."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Permite acessar os dados completos do chamado estritamente para registrá-lo, comentar seu andamento ou fechá-lo.",
        "allowedInformation": [],
        "deniedInformation": []
      },
      "useRules": [
        "onlyOpenTicketCanReceiveComment",
        "onlyOpenTicketCanBeClosed",
        "closedTicketCannotBeReopened"
      ]
    }
  ],
  "accessHash": "sha256:03668099f53ef20645623a13d5c51a48a8c15b9bc3bbe3bc50833957bbe3b35f",
  "approvedBy": "auto",
  "approvedAt": "2026-09-02T12:54:03.994Z",
  "realization": {
    "status": "useCasesCompiled",
    "compiledFromAccessHash": "sha256:03668099f53ef20645623a13d5c51a48a8c15b9bc3bbe3bc50833957bbe3b35f",
    "useCaseAuthorityRefs": [
      {
        "useCaseId": "createTicket",
        "authorityRef": "tickets:manage",
        "journeyStepRefs": [
          "registerTicket.createTicket"
        ]
      },
      {
        "useCaseId": "decideClosure",
        "authorityRef": "tickets:manage",
        "journeyStepRefs": [
          "closeOpenTicket.decideClosure"
        ]
      },
      {
        "useCaseId": "inspectTicket",
        "authorityRef": "tickets:read",
        "journeyStepRefs": [
          "consultTicket.inspectTicket"
        ]
      },
      {
        "useCaseId": "locateTicket",
        "authorityRef": "tickets:read",
        "journeyStepRefs": [
          "closeOpenTicket.locateTicket",
          "commentOpenTicket.locateTicket",
          "consultTicket.locateTicket"
        ]
      },
      {
        "useCaseId": "recordComment",
        "authorityRef": "tickets:manage",
        "journeyStepRefs": [
          "commentOpenTicket.recordComment"
        ]
      }
    ],
    "operationAuthorityRefs": [],
    "realizationHash": "sha256:4d822e2ae4e63b4d18fc6dd661d8f9a94eaf74b2d76679e5f526bddbfda0fb75"
  }
} as const satisfies Ns4AccessMatrixArtifact;

export type ControleChamadosAccessMatrixType = typeof controleChamadosAccessMatrix;

export default controleChamadosAccessMatrix;
