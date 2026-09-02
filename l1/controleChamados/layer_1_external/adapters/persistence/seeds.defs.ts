/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/seeds.defs.ts" enhancement="_blank"/>

export const seedsDefs = {
  "schemaVersion": "2026-06-26",
  "artifactType": "seeds",
  "artifactId": "seeds",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbSeeds",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "version": 1,
    "language": "en",
    "plan": {
      "summary": "Three ticket comments attached to the three existing open support tickets, providing distinct customer-support conversation history.",
      "localTables": [
        {
          "tableId": "Ticket",
          "rows": [
            {
              "key": "ticket-1",
              "columns": [
                {
                  "name": "title",
                  "value": "Unable to update pet profile"
                },
                {
                  "name": "status",
                  "value": "open"
                }
              ],
              "details": [
                {
                  "name": "description",
                  "value": "The customer cannot save the pet's updated weight and vaccination details."
                }
              ],
              "children": []
            },
            {
              "key": "ticket-2",
              "columns": [
                {
                  "name": "title",
                  "value": "Appointment confirmation missing"
                },
                {
                  "name": "status",
                  "value": "open"
                }
              ],
              "details": [
                {
                  "name": "description",
                  "value": "The customer completed an appointment request but has not received a confirmation message."
                }
              ],
              "children": []
            },
            {
              "key": "ticket-3",
              "columns": [
                {
                  "name": "title",
                  "value": "Question about grooming service"
                },
                {
                  "name": "status",
                  "value": "open"
                }
              ],
              "details": [
                {
                  "name": "description",
                  "value": "The customer is asking which grooming services are included in the selected package."
                }
              ],
              "children": []
            }
          ]
        },
        {
          "tableId": "TicketComment",
          "rows": [
            {
              "key": "comment-1",
              "columns": [
                {
                  "name": "ticket_id",
                  "value": {
                    "ref": "local:Ticket.ticket-1"
                  }
                }
              ],
              "details": [
                {
                  "name": "ticketId",
                  "value": {
                    "ref": "local:Ticket.ticket-1"
                  }
                },
                {
                  "name": "commentText",
                  "value": "I am available this afternoon if you need any additional information."
                }
              ],
              "children": []
            },
            {
              "key": "comment-2",
              "columns": [
                {
                  "name": "ticket_id",
                  "value": {
                    "ref": "local:Ticket.ticket-2"
                  }
                }
              ],
              "details": [
                {
                  "name": "ticketId",
                  "value": {
                    "ref": "local:Ticket.ticket-2"
                  }
                },
                {
                  "name": "commentText",
                  "value": "Thank you for the update; I will send the requested document shortly."
                }
              ],
              "children": []
            },
            {
              "key": "comment-3",
              "columns": [
                {
                  "name": "ticket_id",
                  "value": {
                    "ref": "local:Ticket.ticket-3"
                  }
                }
              ],
              "details": [
                {
                  "name": "ticketId",
                  "value": {
                    "ref": "local:Ticket.ticket-3"
                  }
                },
                {
                  "name": "commentText",
                  "value": "The issue is still occurring after restarting the application."
                }
              ],
              "children": []
            }
          ]
        }
      ],
      "mdmEntities": []
    }
  }
} as const;

export default seedsDefs;

export const pipeline = [
  {
    "id": "seeds__persistenceSeeds",
    "type": "persistenceSeeds",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/seeds.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/persistence/seeds.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/persistenceSeeds.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
