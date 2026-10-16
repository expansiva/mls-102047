/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/workflows/promoverListaEspera.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "workflowProcess",
  "artifactId": "promoverListaEspera",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/workflows.defs.ts"
  ],
  "data": {
    "processId": "promoverListaEspera",
    "trigger": {
      "kind": "event",
      "event": "Inscricao.cancelar"
    },
    "functions": [],
    "operations": [
      {
        "operation": "Inscricao.promover",
        "steps": [
          "task:promoverPrimeiraDaFila"
        ]
      }
    ],
    "occurrence": {
      "entityId": "Inscricao"
    }
  }
} as const;

export default definition;
