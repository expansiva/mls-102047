/// <mls fileReference="_102047_/l4/notasTeste41/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41Integration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "notasTeste41",
  "inbound": [],
  "outbound": [
    {
      "id": "notaCriada",
      "kind": "event",
      "to": "any",
      "event": "notaCriada",
      "on": "Nota.create",
      "description": "Publica o registro da Nota (identificador, título, texto opcional e data de criação) quando o Operador cria uma nova nota. Fica disponível para os módulos irmãos, mas nenhum módulo consome esse evento hoje. Não há integração externa.",
      "entityRefs": [
        "Nota"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type NotasTeste41IntegrationType = typeof notasTeste41Integration;

export default notasTeste41Integration;
