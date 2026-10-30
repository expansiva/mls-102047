/// <mls fileReference="_102047_/l4/notasTeste41/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41OntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "notasTeste41",
  "businessDomain": "Módulo temporário de notas curtas: o Operador registra uma nota com título obrigatório e texto opcional, lista as notas e abre uma nota para leitura.",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "notasTeste41",
    "description": "Branch details.notasTeste41 of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Nota",
      "kind": "entity",
      "class": "core"
    }
  ],
  "relationships": []
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type NotasTeste41OntologyIndexType = typeof notasTeste41OntologyIndex;

export default notasTeste41OntologyIndex;
