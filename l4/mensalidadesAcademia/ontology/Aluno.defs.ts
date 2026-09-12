/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Aluno.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityAluno = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Aluno",
  "title": "Aluno",
  "description": "Pessoa que possui matrícula na academia e para a qual são geradas mensalidades.",
  "kind": "mdm",
  "party": "person",
  "mdmSubtype": "Person",
  "displayField": "name",
  "fields": [],
  "details": {
    "quantidadeMensalidadesVencidas": {
      "type": "integer",
      "description": "Quantidade atual de mensalidades vencidas e ainda não regularizadas pelo aluno."
    },
    "inadimplente": {
      "type": "boolean",
      "description": "Indica se o aluno possui ao menos uma mensalidade vencida e não regularizada."
    },
    "bloqueadoParaEntrada": {
      "type": "boolean",
      "description": "Indica se o aluno está bloqueado para entrada por possuir duas ou mais mensalidades vencidas não regularizadas."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "mensalidadesAcademia.Aluno"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type MensalidadesAcademiaEntityAlunoType = typeof mensalidadesAcademiaEntityAluno;

export default mensalidadesAcademiaEntityAluno;
