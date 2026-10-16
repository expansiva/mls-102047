/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/tarefa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Tarefa",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/lista.defs.ts",
    "_102047_/l1/tarefas/layer_3_domain/entities/membroEquipe.defs.ts"
  ],
  "data": {
    "entityId": "Tarefa",
    "storageTarget": "moduleDatabase",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "titulo",
        "type": "string"
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "prioridade",
        "type": "enum"
      },
      {
        "name": "prazo",
        "type": "date"
      },
      {
        "name": "listaId",
        "type": "record",
        "ref": "Lista"
      },
      {
        "name": "responsavelId",
        "type": "record",
        "ref": "MembroEquipe"
      },
      {
        "name": "criadorId",
        "type": "record",
        "ref": "MembroEquipe"
      },
      {
        "name": "tarefaPaiId",
        "type": "record",
        "ref": "Tarefa"
      },
      {
        "name": "chaveCriacao",
        "type": "uuid"
      },
      {
        "name": "criadaEm",
        "type": "timestamp",
        "derived": true
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.descricao",
        "type": "text"
      },
      {
        "name": "details.motivoDevolucao",
        "type": "text"
      },
      {
        "name": "details.devolvidaEm",
        "type": "timestamp"
      },
      {
        "name": "details.concluidaEm",
        "type": "timestamp"
      },
      {
        "name": "details.canceladaEm",
        "type": "timestamp"
      },
      {
        "name": "details.aberta",
        "type": "boolean",
        "derived": true
      },
      {
        "name": "details.venceHoje",
        "type": "boolean",
        "derived": true
      },
      {
        "name": "details.atrasada",
        "type": "boolean",
        "derived": true
      },
      {
        "name": "details.quantidadeSubtarefas",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details.progressoChecklist",
        "type": "string",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "aFazer",
          "reachedBy": "actor"
        },
        {
          "state": "emAndamento",
          "reachedBy": "actor"
        },
        {
          "state": "emRevisao",
          "reachedBy": "actor"
        },
        {
          "state": "concluida",
          "reachedBy": "actor"
        },
        {
          "state": "cancelada",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "iniciar",
          "from": [
            "aFazer"
          ],
          "to": "emAndamento",
          "by": [
            "membroEquipe",
            "gestor"
          ],
          "ruleRefs": [
            "somenteResponsavelExecuta"
          ]
        },
        {
          "transitionId": "enviarParaRevisao",
          "from": [
            "emAndamento"
          ],
          "to": "emRevisao",
          "by": [
            "membroEquipe",
            "gestor"
          ],
          "ruleRefs": [
            "somenteResponsavelExecuta"
          ]
        },
        {
          "transitionId": "aceitar",
          "from": [
            "emRevisao"
          ],
          "to": "concluida",
          "by": [
            "membroEquipe",
            "gestor"
          ],
          "ruleRefs": [
            "somenteCriadorRevisa"
          ]
        },
        {
          "transitionId": "devolver",
          "from": [
            "emRevisao"
          ],
          "to": "emAndamento",
          "by": [
            "membroEquipe",
            "gestor"
          ],
          "ruleRefs": [
            "somenteCriadorRevisa",
            "devolucaoExigeMotivo"
          ]
        },
        {
          "transitionId": "cancelar",
          "from": [
            "aFazer",
            "emAndamento",
            "emRevisao"
          ],
          "to": "cancelada",
          "by": [
            "membroEquipe",
            "gestor"
          ],
          "ruleRefs": [
            "cancelamentoPorCriadorOuGestor"
          ]
        }
      ]
    },
    "invariants": [
      "criacaoIdempotente",
      "reatribuicaoPorCriadorOuGestor",
      "edicaoNaoMudaSituacao",
      "tarefaPaiNaoPodeSerElaMesma",
      "tarefaEncerradaNaoTransiciona"
    ],
    "imports": []
  }
} as const;

export default definition;
