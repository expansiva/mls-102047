/// <mls fileReference="_102047_/l4/tarefas/ontology/AvisoVencimento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const tarefasEntityAvisoVencimento = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "tarefas",
  "entityId": "AvisoVencimento",
  "title": "Aviso diário de vencimentos",
  "description": "Aviso gerado todo dia às 8h para cada responsável, com suas tarefas abertas que vencem hoje ou estão atrasadas; um novo aviso não começa enquanto o do dia anterior não terminou.",
  "displayField": "dataReferencia",
  "relationships": {
    "responsavel": {
      "relationshipId": "avisoResponsavel",
      "to": "MembroEquipe",
      "via": "AvisoVencimento.responsavelId",
      "cardinality": "N:1",
      "title": "Responsável que recebe o aviso",
      "description": "Cada aviso pertence a um único responsável; um responsável recebe um aviso por dia.",
      "mode": "fk",
      "required": true
    }
  },
  "capabilities": {
    "create": "O processo diário das 8h grava um aviso por responsável com as suas tarefas abertas que vencem hoje ou estão atrasadas.",
    "uniqueKey": "Recusa um segundo aviso para o mesmo responsável na mesma data de referência, garantindo um aviso por dia.",
    "transition": "O processo diário marca o aviso como concluído ou com falha ao fim do envio; nenhuma pessoa move essa situação.",
    "locate.byColumn": "O processo consulta, por responsável, data e situação, se o aviso do dia anterior ainda está em envio antes de começar o novo; o gestor lista os avisos por data.",
    "listByForeignKey": "Lista os avisos recebidos por um responsável, para o próprio membro ou para o gestor acompanhar.",
    "read.byId": "Abre um aviso já conhecido para mostrar as tarefas que ele trouxe.",
    "count": "Conta avisos por situação e data, para o gestor ver quantos falharam ou ainda estão em envio.",
    "read.mdmRecord": "Lê no cadastro mestre o nome do responsável de cada aviso para exibir nas listas.",
    "transaction": "Grava os avisos de todos os responsáveis do dia de uma vez, tudo ou nada, no processo diário."
  },
  "rules": [
    "avisoUnicoPorResponsavelEDia",
    "avisoNaoIniciaSemConcluirAnterior",
    "avisoSomenteTarefasAbertasVencendo"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "tarefas_avisovencimento",
    "kind": "relational"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "responsavelId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "MembroEquipe"
        ],
        "title": "Responsável",
        "description": "Membro da equipe que recebe o aviso diário com as suas tarefas abertas que vencem hoje ou estão atrasadas."
      },
      "dataReferencia": {
        "type": "date",
        "required": true,
        "indexed": true,
        "derived": true,
        "title": "Data de referência",
        "description": "Dia a que o aviso se refere, preenchido pelo processo diário das 8h; ninguém digita."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "pending",
            "title": "Em envio"
          },
          {
            "value": "completed",
            "title": "Concluído"
          },
          {
            "value": "failed",
            "title": "Falhou"
          }
        ],
        "title": "Situação do aviso",
        "description": "Andamento do envio do aviso; um novo aviso só começa quando o do dia anterior terminou."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Conteúdo do aviso enviado ao responsável.",
        "fields": {
          "geradoEm": {
            "type": "timestamp",
            "required": true,
            "derived": true,
            "title": "Gerado em",
            "description": "Momento em que o processo diário gerou o aviso."
          },
          "finalizadoEm": {
            "type": "timestamp",
            "derived": true,
            "title": "Finalizado em",
            "description": "Momento em que o envio do aviso terminou, com sucesso ou falha."
          },
          "motivoFalha": {
            "type": "text",
            "title": "Motivo da falha",
            "description": "Explicação registrada pelo processo quando o aviso não pôde ser entregue."
          },
          "tarefas": {
            "type": "object",
            "required": true,
            "collection": true,
            "title": "Tarefas do aviso",
            "description": "Tarefas abertas do responsável que vencem no dia ou estão atrasadas, como estavam no momento do aviso.",
            "fields": {
              "tarefaId": {
                "type": "record",
                "required": true,
                "to": [
                  "Tarefa"
                ],
                "title": "Tarefa",
                "description": "Tarefa incluída no aviso."
              },
              "prazo": {
                "type": "date",
                "required": true,
                "title": "Prazo",
                "description": "Prazo da tarefa no momento em que o aviso foi gerado."
              },
              "situacaoPrazo": {
                "type": "enum",
                "required": true,
                "values": [
                  {
                    "value": "dueToday",
                    "title": "Vence hoje"
                  },
                  {
                    "value": "overdue",
                    "title": "Atrasada"
                  }
                ],
                "title": "Situação do prazo",
                "description": "Se a tarefa vence no dia do aviso ou já estava atrasada."
              }
            }
          },
          "quantidadeTarefas": {
            "type": "integer",
            "derived": true,
            "title": "Quantidade de tarefas",
            "description": "Número de tarefas incluídas neste aviso."
          },
          "quantidadeAtrasadas": {
            "type": "integer",
            "derived": true,
            "title": "Quantidade de atrasadas",
            "description": "Número de tarefas deste aviso que já estavam atrasadas no dia do aviso."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "responsavelId",
      "dataReferencia"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "pending",
      "reachedBy": "command"
    },
    {
      "state": "completed",
      "reachedBy": "command"
    },
    {
      "state": "failed",
      "reachedBy": "command"
    }
  ],
  "transitions": [
    {
      "transitionId": "concluirAviso",
      "from": [
        "pending"
      ],
      "to": "completed",
      "by": [],
      "description": "O processo diário termina o envio do aviso ao responsável.",
      "payload": [
        "details.finalizadoEm"
      ],
      "ruleRefs": [
        "avisoNaoIniciaSemConcluirAnterior"
      ]
    },
    {
      "transitionId": "falharAviso",
      "from": [
        "pending"
      ],
      "to": "failed",
      "by": [],
      "description": "O processo diário registra que o envio do aviso não pôde ser concluído.",
      "payload": [
        "details.finalizadoEm",
        "details.motivoFalha"
      ],
      "ruleRefs": [
        "avisoNaoIniciaSemConcluirAnterior"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type TarefasEntityAvisoVencimentoType = typeof tarefasEntityAvisoVencimento;

export default tarefasEntityAvisoVencimento;
