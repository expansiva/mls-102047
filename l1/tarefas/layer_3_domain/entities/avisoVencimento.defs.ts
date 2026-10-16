/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "AvisoVencimento",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_3_domain/entities/membroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_3_domain/entities/tarefa.defs.ts"
  ],
  "data": {
    "entityId": "AvisoVencimento",
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
        "name": "responsavelId",
        "type": "record",
        "ref": "MembroEquipe"
      },
      {
        "name": "dataReferencia",
        "type": "date",
        "derived": true
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.geradoEm",
        "type": "timestamp",
        "derived": true
      },
      {
        "name": "details.finalizadoEm",
        "type": "timestamp",
        "derived": true
      },
      {
        "name": "details.motivoFalha",
        "type": "text"
      },
      {
        "name": "details.tarefas",
        "type": "object"
      },
      {
        "name": "details.tarefas.tarefaId",
        "type": "record",
        "ref": "Tarefa"
      },
      {
        "name": "details.tarefas.prazo",
        "type": "date"
      },
      {
        "name": "details.tarefas.situacaoPrazo",
        "type": "enum"
      },
      {
        "name": "details.quantidadeTarefas",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details.quantidadeAtrasadas",
        "type": "integer",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
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
          "ruleRefs": [
            "avisoNaoIniciaSemConcluirAnterior"
          ]
        }
      ]
    },
    "invariants": [
      "avisoUnicoPorResponsavelEDia",
      "avisoNaoIniciaSemConcluirAnterior",
      "avisoSomenteTarefasAbertasVencendo"
    ],
    "imports": []
  }
} as const;

export default definition;
