/// <mls fileReference="_102047_/l4/inicio/journeys/pedirLiberacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const pedirLiberacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "pedirLiberacao",
  "business": {
    "actorRef": "pessoaOrganizacao",
    "title": "Aguardar liberação do acesso",
    "goal": "Saber que o responsável precisa liberar meu acesso quando a plataforma não liga meu e-mail sozinha.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verAviso",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver aviso de liberação",
        "description": "A pessoa vê que a plataforma não conseguiu ligar seu e-mail e que o responsável precisa liberar o acesso."
      },
      {
        "stepId": "passarResponsavel",
        "kind": "handoff",
        "entity": "PessoaOrganizacao",
        "title": "Aguardar o responsável",
        "description": "A liberação passa ao responsável, que convida a pessoa certa pelo convite da plataforma; o módulo não guarda essa pendência.",
        "handoffTo": "responsavel"
      }
    ],
    "outcome": {
      "statement": "A pessoa sabe que seu acesso depende da liberação do responsável.",
      "evidence": [
        "O aviso de que o responsável precisa liberar o acesso é exibido",
        "Nenhuma pessoa ou vínculo novo é criado enquanto aguarda"
      ]
    }
  },
  "businessHash": "sha256:e2b008f6fbd2533fd8487b2186d3df84fd5e1751a5cbcd2150f160fd93034aad"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type PedirLiberacaoJourneyType = typeof pedirLiberacaoJourney;

export default pedirLiberacaoJourney;
