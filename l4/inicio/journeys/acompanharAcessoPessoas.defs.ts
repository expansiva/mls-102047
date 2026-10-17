/// <mls fileReference="_102047_/l4/inicio/journeys/acompanharAcessoPessoas.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharAcessoPessoasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharAcessoPessoas",
  "business": {
    "actorRef": "responsavel",
    "title": "Acompanhar acesso das pessoas",
    "goal": "Saber quais pessoas da organização ainda não completaram o acesso.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarPessoas",
        "kind": "locate",
        "entity": "PessoaOrganizacao",
        "title": "Listar pessoas da organização",
        "description": "O responsável abre a lista de pessoas da organização, podendo filtrar as que ainda não completaram o acesso."
      },
      {
        "stepId": "inspecionarPessoa",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver o que falta",
        "description": "O responsável vê de uma pessoa quais dados mínimos ainda faltam; a liberação de acesso é feita pela liberação da plataforma."
      }
    ],
    "outcome": {
      "statement": "O responsável sabe quem ainda não completou o acesso e o que falta para cada pessoa.",
      "evidence": [
        "A lista mostra a situação de acesso de cada pessoa da organização.",
        "As pessoas com dados mínimos incompletos aparecem destacadas."
      ]
    }
  },
  "businessHash": "sha256:c026175523d8ffd64bd19bc0cdaf5dce6937af071b27969e724fcc0949787331"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharAcessoPessoasJourneyType = typeof acompanharAcessoPessoasJourney;

export default acompanharAcessoPessoasJourney;
