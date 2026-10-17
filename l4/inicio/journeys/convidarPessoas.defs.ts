/// <mls fileReference="_102047_/l4/inicio/journeys/convidarPessoas.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const convidarPessoasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "convidarPessoas",
  "business": {
    "actorRef": "responsavel",
    "title": "Convidar pessoas",
    "goal": "Trazer pessoas para a organização pelo e-mail usando o convite da plataforma.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "informarEmail",
        "kind": "act",
        "entity": "PessoaOrganizacao",
        "effect": "create",
        "title": "Convidar pessoa por e-mail",
        "description": "O responsável informa o e-mail; a plataforma usa a pessoa já cadastrada ou cadastra a pessoa, dá a ela o login e envia o convite, sem que o módulo guarde convites."
      },
      {
        "stepId": "conferirPessoa",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Conferir pessoa convidada",
        "description": "O responsável vê a pessoa na lista da organização, ainda sem acesso completo."
      }
    ],
    "outcome": {
      "statement": "A pessoa convidada faz parte da organização e recebeu o convite da plataforma.",
      "evidence": [
        "A pessoa aparece na lista de pessoas da organização",
        "Nenhuma pessoa duplicada é criada para um e-mail já cadastrado"
      ]
    }
  },
  "businessHash": "sha256:580dc1a846a9716f27c28a26412883769059d85473b4b0ff85da6c13e4d22335"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConvidarPessoasJourneyType = typeof convidarPessoasJourney;

export default convidarPessoasJourney;
