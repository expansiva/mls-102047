/// <mls fileReference="_102047_/l4/controleChamados/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyIndex } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosJourneyIndex = {
  "schemaVersion": "2026-08-15-ns4-journey-index-v7",
  "moduleName": "controleChamados",
  "approvedAt": "2026-09-02T12:53:41.206Z",
  "approvedBy": "auto",
  "journeys": [
    {
      "journeyId": "commentOpenTicket",
      "actorRef": "atendente",
      "title": "Registrar comentário em chamado aberto",
      "goal": "Documentar o andamento do atendimento em um chamado aberto.",
      "entryMode": "contextOrLookup",
      "businessHash": "sha256:496a92da9d280e9db4975401bd6575e57c703078ff53ed3fe4a1383c62164363",
      "artifactPath": "l4/controleChamados/journeys/commentOpenTicket.defs.ts",
      "useCaseRefs": [
        "locateTicket",
        "recordComment"
      ]
    },
    {
      "journeyId": "closeOpenTicket",
      "actorRef": "atendente",
      "title": "Fechar chamado aberto",
      "goal": "Encerrar um chamado quando o atendimento estiver concluído.",
      "entryMode": "contextOrLookup",
      "businessHash": "sha256:59a221f329e03b3d9664759d9ade26252066313814e79d983a82e7fb299aba3e",
      "artifactPath": "l4/controleChamados/journeys/closeOpenTicket.defs.ts",
      "useCaseRefs": [
        "decideClosure",
        "locateTicket"
      ]
    },
    {
      "journeyId": "registerTicket",
      "actorRef": "atendente",
      "title": "Registrar chamado",
      "goal": "Criar um novo chamado para iniciar o atendimento.",
      "entryMode": "coldStart",
      "businessHash": "sha256:fec1c17f3843924c7160eaf9b48ec99cecc163ce2a415c7f4c18385d34c79120",
      "artifactPath": "l4/controleChamados/journeys/registerTicket.defs.ts",
      "useCaseRefs": [
        "createTicket"
      ]
    },
    {
      "journeyId": "consultTicket",
      "actorRef": "atendente",
      "title": "Consultar chamados",
      "goal": "Acompanhar as informações e o histórico de um chamado.",
      "entryMode": "coldStart",
      "businessHash": "sha256:28f65c7aea1dbed9d07c2e278d447809cbf29f4800e00f70af45cd0dcfcca8ce",
      "artifactPath": "l4/controleChamados/journeys/consultTicket.defs.ts",
      "useCaseRefs": [
        "inspectTicket",
        "locateTicket"
      ]
    }
  ],
  "features": [
    {
      "featureId": "ticketCommenting",
      "title": "Comentários em chamados",
      "priority": "now",
      "journeyStepRefs": [
        "commentOpenTicket.locateTicket",
        "commentOpenTicket.recordComment"
      ]
    },
    {
      "featureId": "ticketClosure",
      "title": "Fechamento de chamados",
      "priority": "now",
      "journeyStepRefs": [
        "closeOpenTicket.locateTicket",
        "closeOpenTicket.decideClosure"
      ]
    },
    {
      "featureId": "ticketRegistration",
      "title": "Cadastro de chamados",
      "priority": "now",
      "journeyStepRefs": [
        "registerTicket.createTicket"
      ]
    },
    {
      "featureId": "ticketConsultation",
      "title": "Consulta de chamados",
      "priority": "now",
      "journeyStepRefs": [
        "consultTicket.locateTicket",
        "consultTicket.inspectTicket"
      ]
    }
  ],
  "policyDecisions": [
    {
      "decisionId": "commentAfterTicketClosurePolicy",
      "question": "Comentários podem ser registrados depois que um chamado é fechado?",
      "chosen": "Comentários só podem ser registrados enquanto o chamado estiver aberto.",
      "alternatives": [
        "Permitir comentários também em chamados fechados"
      ],
      "journeyRef": "commentOpenTicket"
    },
    {
      "decisionId": "ticketClosureRequirementPolicy",
      "question": "O que é necessário para fechar um chamado aberto?",
      "chosen": "O atendente pode fechar o chamado quando concluir o atendimento, sem exigir um comentário final.",
      "alternatives": [
        "Exigir pelo menos um comentário antes do fechamento",
        "Exigir um comentário final no momento do fechamento"
      ],
      "journeyRef": "closeOpenTicket"
    },
    {
      "decisionId": "ticketReopeningPolicy",
      "question": "Um chamado fechado pode voltar a ser aberto?",
      "chosen": "O fechamento é definitivo; chamados fechados não são reabertos.",
      "alternatives": [
        "Permitir que o atendente reabra um chamado fechado"
      ],
      "journeyRef": "closeOpenTicket"
    },
    {
      "decisionId": "demoteRegisterTicketToRecordCatalogue",
      "question": "Registrar chamado não tem decisão nem repasse: vira a tela de cadastro padrão de Ticket?",
      "chosen": "Tela de cadastro padrão de Ticket",
      "alternatives": [
        "Tela de cadastro padrão de Ticket",
        "Manter Registrar chamado como jornada própria"
      ],
      "journeyRef": "registerTicket"
    },
    {
      "decisionId": "demoteConsultTicketToRecordCatalogue",
      "question": "Consultar chamados não tem decisão nem repasse: vira a tela de cadastro padrão de Ticket?",
      "chosen": "Tela de cadastro padrão de Ticket",
      "alternatives": [
        "Tela de cadastro padrão de Ticket",
        "Manter Consultar chamados como jornada própria"
      ],
      "journeyRef": "consultTicket"
    }
  ],
  "policyDecisionSelections": [
    {
      "decisionId": "commentAfterTicketClosurePolicy",
      "generatedChoice": "Comentários só podem ser registrados enquanto o chamado estiver aberto.",
      "selectedChoice": "Comentários só podem ser registrados enquanto o chamado estiver aberto.",
      "selectedBy": "auto",
      "selectedAt": "2026-09-02T12:53:41.206Z"
    },
    {
      "decisionId": "ticketClosureRequirementPolicy",
      "generatedChoice": "O atendente pode fechar o chamado quando concluir o atendimento, sem exigir um comentário final.",
      "selectedChoice": "O atendente pode fechar o chamado quando concluir o atendimento, sem exigir um comentário final.",
      "selectedBy": "auto",
      "selectedAt": "2026-09-02T12:53:41.206Z"
    },
    {
      "decisionId": "ticketReopeningPolicy",
      "generatedChoice": "O fechamento é definitivo; chamados fechados não são reabertos.",
      "selectedChoice": "O fechamento é definitivo; chamados fechados não são reabertos.",
      "selectedBy": "auto",
      "selectedAt": "2026-09-02T12:53:41.206Z"
    },
    {
      "decisionId": "demoteRegisterTicketToRecordCatalogue",
      "generatedChoice": "Tela de cadastro padrão de Ticket",
      "selectedChoice": "Tela de cadastro padrão de Ticket",
      "selectedBy": "auto",
      "selectedAt": "2026-09-02T12:53:41.206Z"
    },
    {
      "decisionId": "demoteConsultTicketToRecordCatalogue",
      "generatedChoice": "Tela de cadastro padrão de Ticket",
      "selectedChoice": "Tela de cadastro padrão de Ticket",
      "selectedBy": "auto",
      "selectedAt": "2026-09-02T12:53:41.206Z"
    }
  ],
  "systemDecisions": [],
  "realizationHash": "sha256:fb1c49acf37e739bef2ba30a9d6c791b4d31255872ff61c2823ea8d087f796b5"
} as const satisfies Ns4JourneyIndex;

export type ControleChamadosJourneyIndexType = typeof controleChamadosJourneyIndex;

export default controleChamadosJourneyIndex;
