/// <mls fileReference="_102047_/l4/controleChamados/workspace-model.defs.ts" enhancement="_blank"/>

export const controleChamadosWorkspaceModel = {
  "planId": "e8-workspace-model",
  "schemaVersion": "2026-08-14-ns4-e8-model-v1",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "title": "Workspaces",
  "reviewRound": 1,
  "hubEntity": "Ticket",
  "workspaces": [
    {
      "workspaceId": "commentOpenTicket",
      "tier": "journey",
      "title": "Registrar comentário em chamado aberto",
      "purpose": "Documentar o andamento do atendimento em um chamado aberto.",
      "kind": "operation",
      "entity": "TicketComment",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [
        "ticketCommenting"
      ],
      "hostedStepRefs": [
        "commentOpenTicket.locateTicket",
        "commentOpenTicket.recordComment"
      ],
      "journeyRef": "commentOpenTicket",
      "categoryRef": "processWizard",
      "bffCalls": [
        {
          "bffId": "qryLocateTicket",
          "kind": "query",
          "operationId": "locateTicket",
          "outputKind": "paginated",
          "entityRef": "Ticket"
        },
        {
          "bffId": "cmdRecordComment",
          "kind": "command",
          "operationId": "recordComment",
          "outputKind": "object",
          "entityRef": "TicketComment"
        }
      ],
      "sections": [
        {
          "sectionId": "locateTicket",
          "intent": "Um chamado aberto é selecionado a partir da Lista de chamados para acompanhamento.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryLocateTicket",
              "usage": "picker"
            }
          ]
        },
        {
          "sectionId": "recordComment",
          "intent": "Um comentário fica registrado no histórico do chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdRecordComment"
            }
          ]
        }
      ]
    },
    {
      "workspaceId": "ticketCatalogue",
      "tier": "recordCatalogue",
      "title": "Chamado",
      "purpose": "Cadastro de Chamado.",
      "kind": "operation",
      "entity": "Ticket",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [
        "ticketClosure"
      ],
      "hostedStepRefs": [
        "closeOpenTicket.locateTicket",
        "closeOpenTicket.decideClosure"
      ],
      "categoryRef": "entityRecordManagement",
      "bffCalls": [
        {
          "bffId": "qryListTicket",
          "kind": "query",
          "operationId": "listTicket",
          "outputKind": "paginated",
          "entityRef": "Ticket"
        },
        {
          "bffId": "cmdCreateTicket",
          "kind": "command",
          "operationId": "createTicket",
          "outputKind": "object",
          "entityRef": "Ticket"
        },
        {
          "bffId": "cmdUpdateTicket",
          "kind": "command",
          "operationId": "updateTicket",
          "outputKind": "object",
          "entityRef": "Ticket"
        },
        {
          "bffId": "cmdDeleteTicket",
          "kind": "command",
          "operationId": "deleteTicket",
          "outputKind": "object",
          "entityRef": "Ticket"
        },
        {
          "bffId": "qryGetTicket",
          "kind": "query",
          "operationId": "getTicket",
          "outputKind": "object",
          "entityRef": "Ticket"
        },
        {
          "bffId": "qryLocateTicket",
          "kind": "query",
          "operationId": "locateTicket",
          "outputKind": "paginated",
          "entityRef": "Ticket"
        },
        {
          "bffId": "cmdDecideClosure",
          "kind": "command",
          "operationId": "decideClosure",
          "outputKind": "object",
          "entityRef": "Ticket"
        }
      ],
      "sections": [
        {
          "sectionId": "recordList",
          "intent": "Localizar Chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListTicket"
            },
            {
              "role": "filterControl",
              "attachTo": "qryListTicket"
            },
            {
              "role": "contextualAction",
              "action": "cmdDeleteTicket"
            }
          ]
        },
        {
          "sectionId": "recordForm",
          "intent": "Criar ou corrigir Chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdCreateTicket"
            },
            {
              "role": "contextualAction",
              "action": "cmdUpdateTicket"
            }
          ]
        },
        {
          "sectionId": "decideClosure",
          "intent": "O chamado passa a ter status fechado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdDecideClosure"
            }
          ]
        }
      ]
    },
    {
      "workspaceId": "ticketCommentCatalogue",
      "tier": "recordCatalogue",
      "title": "Comentário do chamado",
      "purpose": "Cadastro de Comentário do chamado.",
      "kind": "operation",
      "entity": "TicketComment",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [],
      "hostedStepRefs": [],
      "categoryRef": "entityRecordManagement",
      "bffCalls": [
        {
          "bffId": "qryListTicketComment",
          "kind": "query",
          "operationId": "listTicketComment",
          "outputKind": "paginated",
          "entityRef": "TicketComment"
        },
        {
          "bffId": "cmdCreateTicketComment",
          "kind": "command",
          "operationId": "createTicketComment",
          "outputKind": "object",
          "entityRef": "TicketComment",
          "inputSources": [
            {
              "inputId": "ticketId",
              "bffId": "qryTicketPicker"
            }
          ]
        },
        {
          "bffId": "cmdUpdateTicketComment",
          "kind": "command",
          "operationId": "updateTicketComment",
          "outputKind": "object",
          "entityRef": "TicketComment",
          "inputSources": [
            {
              "inputId": "ticketId",
              "bffId": "qryTicketPicker"
            }
          ]
        },
        {
          "bffId": "cmdDeleteTicketComment",
          "kind": "command",
          "operationId": "deleteTicketComment",
          "outputKind": "object",
          "entityRef": "TicketComment"
        },
        {
          "bffId": "qryGetTicketComment",
          "kind": "query",
          "operationId": "getTicketComment",
          "outputKind": "object",
          "entityRef": "TicketComment"
        },
        {
          "bffId": "qryTicketPicker",
          "kind": "query",
          "operationId": "listTicket",
          "outputKind": "paginated",
          "entityRef": "Ticket"
        }
      ],
      "sections": [
        {
          "sectionId": "recordList",
          "intent": "Localizar Comentário do chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListTicketComment"
            },
            {
              "role": "contextualAction",
              "action": "cmdDeleteTicketComment"
            }
          ]
        },
        {
          "sectionId": "recordForm",
          "intent": "Criar ou corrigir Comentário do chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdCreateTicketComment"
            },
            {
              "role": "contextualAction",
              "action": "cmdUpdateTicketComment"
            },
            {
              "role": "filterControl",
              "dataSource": "qryTicketPicker",
              "usage": "picker"
            }
          ]
        }
      ]
    },
    {
      "workspaceId": "ticketHub",
      "tier": "hub",
      "title": "Chamado",
      "purpose": "Painel de Chamado.",
      "kind": "landing",
      "entity": "Ticket",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [],
      "hostedStepRefs": [],
      "categoryRef": "dashboardCommandCenter",
      "bffCalls": [
        {
          "bffId": "qryListTicket",
          "kind": "query",
          "operationId": "listTicket",
          "outputKind": "paginated",
          "entityRef": "Ticket"
        },
        {
          "bffId": "qryListTicketComment",
          "kind": "query",
          "operationId": "listTicketComment",
          "outputKind": "paginated",
          "entityRef": "TicketComment"
        }
      ],
      "sections": [
        {
          "sectionId": "collection",
          "intent": "Carteira e busca.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListTicket"
            }
          ]
        },
        {
          "sectionId": "record",
          "intent": "Registro selecionado e o que gira em volta dele.",
          "organisms": [
            {
              "role": "detailPanel",
              "dataSource": "qryListTicketComment"
            }
          ]
        }
      ],
      "hubCatalogue": {
        "anchorEntity": "Ticket",
        "items": [
          {
            "itemId": "actionCommentOpenTicket",
            "kind": "action",
            "label": "Registrar comentário em chamado aberto",
            "entityRef": "TicketComment",
            "targetRef": "commentOpenTicket",
            "score": 2
          },
          {
            "itemId": "relatedTicketComment",
            "kind": "relatedList",
            "label": "Comentário do chamado",
            "entityRef": "TicketComment",
            "targetRef": "ticketCommentCatalogue",
            "sourceOperationId": "listTicketComment",
            "sourceBffId": "qryListTicketComment",
            "sourceOutputKind": "paginated",
            "score": 2
          }
        ]
      },
      "navigation": [
        {
          "targetWorkspaceId": "commentOpenTicket",
          "label": "Registrar comentário em chamado aberto",
          "prominence": "primary",
          "order": 0
        }
      ]
    }
  ],
  "operations": [
    {
      "operationId": "listTicket",
      "title": "Listar Chamado",
      "kind": "query",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [
        {
          "inputId": "search",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "title"
          },
          "source": "userInput",
          "required": false,
          "description": "Buscar por Título."
        },
        {
          "inputId": "sortBy",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "status"
          },
          "source": "userInput",
          "required": false,
          "enumValues": [
            "status"
          ],
          "description": "Campo de ordenação da listagem."
        },
        {
          "inputId": "sortOrder",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "status"
          },
          "source": "userInput",
          "required": false,
          "enumValues": [
            "asc",
            "desc"
          ],
          "description": "Direção da ordenação."
        }
      ],
      "outputRefs": [
        "Ticket.ticketId",
        "Ticket.title",
        "Ticket.description",
        "Ticket.status"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Encontrar o registro."
      ]
    },
    {
      "operationId": "createTicket",
      "title": "Criar Chamado",
      "kind": "command",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "accessPattern": {
        "kind": "create"
      },
      "inputs": [
        {
          "inputId": "title",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "title"
          },
          "description": "Título que identifica resumidamente a solicitação de atendimento.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "description",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "description"
          },
          "description": "Descrição detalhada da solicitação de atendimento registrada no chamado.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "status",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "status"
          },
          "description": "Situação atual do chamado durante o atendimento.",
          "enumValues": [
            "open",
            "closed"
          ],
          "source": "systemDefault",
          "required": true
        }
      ],
      "outputRefs": [
        "Ticket.ticketId"
      ],
      "useRules": [
        "onlyOpenTicketCanReceiveComment",
        "onlyOpenTicketCanBeClosed",
        "closedTicketCannotBeReopened"
      ],
      "transitionRefs": [],
      "story": [
        "Informar os dados do novo registro."
      ]
    },
    {
      "operationId": "updateTicket",
      "title": "Atualizar Chamado",
      "kind": "command",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "accessPattern": {
        "kind": "update"
      },
      "inputs": [
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "ticketId"
          },
          "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "title",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "title"
          },
          "description": "Título que identifica resumidamente a solicitação de atendimento.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "description",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "description"
          },
          "description": "Descrição detalhada da solicitação de atendimento registrada no chamado.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "status",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "status"
          },
          "description": "Situação atual do chamado durante o atendimento.",
          "enumValues": [
            "open",
            "closed"
          ],
          "source": "systemDefault",
          "required": true
        }
      ],
      "outputRefs": [
        "Ticket.ticketId"
      ],
      "useRules": [
        "onlyOpenTicketCanReceiveComment",
        "onlyOpenTicketCanBeClosed",
        "closedTicketCannotBeReopened"
      ],
      "transitionRefs": [],
      "story": [
        "Corrigir os dados do registro escolhido."
      ]
    },
    {
      "kind": "command",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "inputs": [
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "ticketId"
          },
          "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Ticket.ticketId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "operationId": "deleteTicket",
      "title": "Excluir Chamado",
      "accessPattern": {
        "kind": "delete"
      },
      "story": [
        "Remover o registro escolhido."
      ]
    },
    {
      "operationId": "getTicket",
      "title": "Obter Chamado",
      "kind": "query",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "accessPattern": {
        "kind": "getById"
      },
      "inputs": [
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "ticketId"
          },
          "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Ticket.ticketId",
        "Ticket.title",
        "Ticket.description",
        "Ticket.status"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Ler o registro pelo identificador."
      ]
    },
    {
      "operationId": "listTicketComment",
      "title": "Listar Comentário do chamado",
      "kind": "query",
      "entityRef": "TicketComment",
      "entityRefs": [
        "TicketComment"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [],
      "outputRefs": [
        "TicketComment.ticketCommentId",
        "TicketComment.ticketId",
        "TicketComment.commentText"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Encontrar o registro."
      ]
    },
    {
      "operationId": "createTicketComment",
      "title": "Criar Comentário do chamado",
      "kind": "command",
      "entityRef": "TicketComment",
      "entityRefs": [
        "Ticket",
        "TicketComment"
      ],
      "accessPattern": {
        "kind": "create"
      },
      "inputs": [
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "ticketId"
          },
          "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "commentText",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "commentText"
          },
          "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado.",
          "source": "userInput",
          "required": true
        }
      ],
      "outputRefs": [
        "TicketComment.ticketCommentId"
      ],
      "useRules": [
        "onlyOpenTicketCanReceiveComment"
      ],
      "transitionRefs": [],
      "story": [
        "Informar os dados do novo registro."
      ]
    },
    {
      "operationId": "updateTicketComment",
      "title": "Atualizar Comentário do chamado",
      "kind": "command",
      "entityRef": "TicketComment",
      "entityRefs": [
        "Ticket",
        "TicketComment"
      ],
      "accessPattern": {
        "kind": "update"
      },
      "inputs": [
        {
          "inputId": "ticketCommentId",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "ticketCommentId"
          },
          "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "ticketId"
          },
          "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "commentText",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "commentText"
          },
          "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado.",
          "source": "userInput",
          "required": true
        }
      ],
      "outputRefs": [
        "TicketComment.ticketCommentId"
      ],
      "useRules": [
        "onlyOpenTicketCanReceiveComment"
      ],
      "transitionRefs": [],
      "story": [
        "Corrigir os dados do registro escolhido."
      ]
    },
    {
      "kind": "command",
      "entityRef": "TicketComment",
      "entityRefs": [
        "TicketComment"
      ],
      "inputs": [
        {
          "inputId": "ticketCommentId",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "ticketCommentId"
          },
          "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "TicketComment.ticketCommentId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "operationId": "deleteTicketComment",
      "title": "Excluir Comentário do chamado",
      "accessPattern": {
        "kind": "delete"
      },
      "story": [
        "Remover o registro escolhido."
      ]
    },
    {
      "operationId": "getTicketComment",
      "title": "Obter Comentário do chamado",
      "kind": "query",
      "entityRef": "TicketComment",
      "entityRefs": [
        "TicketComment"
      ],
      "accessPattern": {
        "kind": "getById"
      },
      "inputs": [
        {
          "inputId": "ticketCommentId",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "ticketCommentId"
          },
          "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "TicketComment.ticketCommentId",
        "TicketComment.ticketId",
        "TicketComment.commentText"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Ler o registro pelo identificador."
      ]
    },
    {
      "operationId": "locateTicket",
      "title": "Localizar o chamado aberto",
      "kind": "query",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [],
      "outputRefs": [
        "Ticket.ticketId",
        "Ticket.title",
        "Ticket.description",
        "Ticket.status"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Localizar o chamado aberto",
        "Um chamado aberto é selecionado a partir da Lista de chamados para encerramento."
      ],
      "useCaseId": "locateTicket"
    },
    {
      "operationId": "recordComment",
      "title": "Registrar comentário",
      "kind": "command",
      "entityRef": "TicketComment",
      "entityRefs": [
        "Ticket",
        "TicketComment"
      ],
      "accessPattern": {
        "kind": "commandInput"
      },
      "inputs": [
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "ticketId"
          },
          "source": "routeParam",
          "required": true,
          "description": "Chamado"
        },
        {
          "inputId": "commentText",
          "fieldRef": {
            "entityId": "TicketComment",
            "fieldId": "commentText"
          },
          "source": "userInput",
          "required": true,
          "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado."
        }
      ],
      "outputRefs": [
        "TicketComment.ticketCommentId",
        "TicketComment.ticketId",
        "TicketComment.commentText"
      ],
      "useRules": [
        "onlyOpenTicketCanReceiveComment"
      ],
      "transitionRefs": [],
      "story": [
        "Registrar comentário",
        "Um comentário fica registrado no histórico do chamado."
      ],
      "useCaseId": "recordComment"
    },
    {
      "operationId": "decideClosure",
      "title": "Confirmar o fechamento do chamado",
      "kind": "command",
      "entityRef": "Ticket",
      "entityRefs": [
        "Ticket"
      ],
      "accessPattern": {
        "kind": "transition"
      },
      "inputs": [
        {
          "inputId": "ticketId",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "ticketId"
          },
          "source": "routeParam",
          "required": true,
          "description": "Chamado"
        },
        {
          "inputId": "status",
          "fieldRef": {
            "entityId": "Ticket",
            "fieldId": "status"
          },
          "source": "userInput",
          "required": true,
          "description": "Decisão tomada.",
          "enumValues": [
            "closed"
          ]
        }
      ],
      "outputRefs": [
        "Ticket.ticketId",
        "Ticket.title",
        "Ticket.description",
        "Ticket.status"
      ],
      "useRules": [
        "onlyOpenTicketCanBeClosed"
      ],
      "transitionRefs": [
        "closeTicket"
      ],
      "story": [
        "Confirmar o fechamento do chamado",
        "O chamado passa a ter status fechado."
      ],
      "useCaseId": "decideClosure"
    }
  ],
  "menu": [
    {
      "workspaceId": "ticketCatalogue",
      "label": "Chamado",
      "featureRef": "ticketClosure",
      "tier": "recordCatalogue",
      "profileRefs": [
        "atendente"
      ]
    },
    {
      "workspaceId": "ticketCommentCatalogue",
      "label": "Comentário do chamado",
      "featureRef": "",
      "tier": "recordCatalogue",
      "profileRefs": [
        "atendente"
      ]
    },
    {
      "workspaceId": "ticketHub",
      "label": "Chamado",
      "featureRef": "",
      "tier": "hub",
      "profileRefs": [
        "atendente"
      ]
    }
  ],
  "landings": [
    {
      "profileRef": "atendente",
      "workspaceId": "ticketHub"
    }
  ],
  "systemDecisions": [
    {
      "decisionId": "hubCompositionTicketHub",
      "stage": "e8-workspaces",
      "question": "A composição proposta para o painel de Chamado não respeitou o catálogo; usar a ordem padrão?",
      "chosen": "keepDerivedComposition",
      "alternatives": [
        "keepDerivedComposition",
        "reviewDashboardComposition"
      ],
      "decidedBy": "system",
      "findingRef": "NS4_E8_HUB_COMPOSITION:ticketHub",
      "changeHint": "Revisar a ordem e os destaques do painel de Chamado no próximo round."
    }
  ]
} as const;

export default controleChamadosWorkspaceModel;
