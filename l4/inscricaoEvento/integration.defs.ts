/// <mls fileReference="_102047_/l4/inscricaoEvento/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "inscricaoEvento",
  "inbound": [],
  "outbound": [
    {
      "id": "eventoPublicado",
      "kind": "event",
      "to": "any",
      "event": "eventoPublicado",
      "on": "Evento.publicar",
      "description": "Publicado quando o organizador publica um evento. O registro do Evento nesse momento traz título, data, local e número de vagas, e qualquer módulo interessado pode usá-lo.",
      "entityRefs": [
        "Evento"
      ]
    },
    {
      "id": "inscricaoRealizada",
      "kind": "event",
      "to": "any",
      "event": "inscricaoRealizada",
      "on": "Inscricao.create",
      "description": "Publicado quando uma pessoa do público se inscreve em um evento, seja com vaga confirmada ou na lista de espera. O registro da Inscricao indica o evento e o participante.",
      "entityRefs": [
        "Inscricao",
        "Evento",
        "Participante"
      ]
    },
    {
      "id": "inscricaoCancelada",
      "kind": "event",
      "to": "any",
      "event": "inscricaoCancelada",
      "on": "Inscricao.cancelar",
      "description": "Publicado quando um inscrito cancela a própria inscrição e libera uma vaga no evento.",
      "entityRefs": [
        "Inscricao",
        "Evento",
        "Participante"
      ]
    },
    {
      "id": "inscricaoPromovida",
      "kind": "event",
      "to": "any",
      "event": "inscricaoPromovida",
      "on": "Inscricao.promover",
      "description": "Publicado quando o primeiro da lista de espera sobe para uma vaga confirmada depois de um cancelamento.",
      "entityRefs": [
        "Inscricao",
        "Evento",
        "Participante"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type InscricaoEventoIntegrationType = typeof inscricaoEventoIntegration;

export default inscricaoEventoIntegration;
