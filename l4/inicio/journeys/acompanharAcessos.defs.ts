/// <mls fileReference="_102047_/l4/inicio/journeys/acompanharAcessos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharAcessosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharAcessos",
  "business": {
    "actorRef": "responsavel",
    "title": "Acompanhar acessos",
    "goal": "Ver as pessoas da organização e quais ainda não completaram o acesso.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "listarPessoas",
        "kind": "locate",
        "entity": "PessoaOrganizacao",
        "title": "Listar pessoas da organização",
        "description": "O responsável abre a lista de pessoas da organização."
      },
      {
        "stepId": "verSituacao",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver quem falta completar",
        "description": "A lista indica quais pessoas ainda não completaram os dados mínimos de acesso."
      }
    ],
    "outcome": {
      "statement": "O responsável sabe quem já completou e quem ainda não completou o acesso.",
      "evidence": [
        "Cada pessoa aparece com a indicação de acesso completo ou pendente"
      ]
    }
  },
  "businessHash": "sha256:745961de5b30ceb7ae11d09b2bfefde3599e312c7da1d8a0d1d4ffa261df817d"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharAcessosJourneyType = typeof acompanharAcessosJourney;

export default acompanharAcessosJourney;
