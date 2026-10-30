/// <mls fileReference="_102047_/l4/notasTeste41/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41Access = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "notasTeste41",
  "actors": [
    {
      "actorId": "operador",
      "kind": "internal",
      "origin": "named",
      "title": "Operador",
      "description": "Pessoa da organização que registra notas curtas com título obrigatório e texto opcional, lista as notas e abre uma nota para leitura.",
      "personEntity": ""
    }
  ],
  "grants": [
    {
      "grantId": "operadorNotas",
      "actorRef": "operador",
      "title": "Registrar, listar e ler notas",
      "description": "O operador registra notas com título obrigatório e texto opcional, vê a lista de notas da organização e abre qualquer nota para leitura.",
      "entityRefs": [
        "Nota"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as notas da organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O operador vê a nota inteira: identificador, título, texto e data de criação."
      }
    }
  ]
} as const satisfies Ns5Readonly<Ns5AccessArtifact>;

export type NotasTeste41AccessType = typeof notasTeste41Access;

export default notasTeste41Access;
