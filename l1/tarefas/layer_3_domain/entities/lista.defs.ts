/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/lista.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Lista",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "Lista",
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
        "name": "nome",
        "type": "string"
      },
      {
        "name": "ativa",
        "type": "boolean"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.tipo",
        "type": "enum"
      },
      {
        "name": "details.descricao",
        "type": "text"
      },
      {
        "name": "details.quantidadeTarefasAbertas",
        "type": "integer",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [
      "listaNomeUnico",
      "listaMantidaPorGestor",
      "listaInativaNaoRecebeTarefa"
    ],
    "imports": []
  }
} as const;

export default definition;
