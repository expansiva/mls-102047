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
      "journeyId": "acompanharAcessoPessoas",
      "actorRef": "responsavel",
      "title": "Acompanhar acesso das pessoas"
    },
    {
      "journeyId": "completarMeuAcesso",
      "actorRef": "pessoaOrganizacao",
      "title": "Completar meu acesso"
    },
    {
      "journeyId": "aguardarLiberacaoAcesso",
      "actorRef": "pessoaOrganizacao",
      "title": "Aguardar liberação do acesso"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5Readonly<Ns5JourneyIndexArtifact>;

export type InicioJourneyIndexType = typeof inicioJourneyIndex;

export default inicioJourneyIndex;
