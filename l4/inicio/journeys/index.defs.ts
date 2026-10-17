/// <mls fileReference="_102047_/l4/inicio/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "inicio",
  "journeys": [
    {
      "journeyId": "prepararEmpresa",
      "actorRef": "responsavel",
      "title": "Preparar a empresa"
    },
    {
      "journeyId": "convidarPessoas",
      "actorRef": "responsavel",
      "title": "Convidar pessoas"
    },
    {
      "journeyId": "acompanharAcessos",
      "actorRef": "responsavel",
      "title": "Acompanhar acessos"
    },
    {
      "journeyId": "liberarAcesso",
      "actorRef": "responsavel",
      "title": "Liberar acesso de uma pessoa"
    },
    {
      "journeyId": "completarMeuAcesso",
      "actorRef": "pessoaOrganizacao",
      "title": "Completar meu acesso"
    },
    {
      "journeyId": "pedirLiberacao",
      "actorRef": "pessoaOrganizacao",
      "title": "Aguardar liberação do acesso"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5Readonly<Ns5JourneyIndexArtifact>;

export type InicioJourneyIndexType = typeof inicioJourneyIndex;

export default inicioJourneyIndex;
