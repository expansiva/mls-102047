/// <mls fileReference="_102047_/l4/inicio/journeys/aguardarLiberacaoAcesso.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const aguardarLiberacaoAcessoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "aguardarLiberacaoAcesso",
  "business": {
    "actorRef": "pessoaOrganizacao",
    "title": "Aguardar liberação do acesso",
    "goal": "Entender que o responsável precisa liberar o acesso quando a plataforma não consegue ligar o e-mail sozinha.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verAvisoLiberacao",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver aviso de liberação",
        "description": "A pessoa vê que já existe outro cadastro com o mesmo e-mail de contato e que o responsável precisa liberar o seu acesso."
      },
      {
        "stepId": "encaminharResponsavel",
        "kind": "handoff",
        "entity": "PessoaOrganizacao",
        "title": "Aguardar o responsável",
        "description": "O responsável libera o acesso pela liberação da plataforma, que decide a qual cadastro o login fica ligado.",
        "handoffTo": "responsavel"
      }
    ],
    "outcome": {
      "statement": "A pessoa sabe que seu acesso depende da liberação do responsável.",
      "evidence": [
        "A tela mostra o aviso de que o responsável precisa liberar o acesso.",
        "Voltar por outro navegador mostra o mesmo aviso até a liberação."
      ]
    }
  },
  "businessHash": "sha256:62828a1f12c1c2a898673bb86f235e9f88f9be2a1544bbd6a49b6302f476f000"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AguardarLiberacaoAcessoJourneyType = typeof aguardarLiberacaoAcessoJourney;

export default aguardarLiberacaoAcessoJourney;
