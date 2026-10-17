/// <mls fileReference="_102047_/l4/inicio/journeys/liberarAcesso.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const liberarAcessoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "liberarAcesso",
  "business": {
    "actorRef": "responsavel",
    "title": "Liberar acesso de uma pessoa",
    "goal": "Liberar o acesso de quem a plataforma não conseguiu ligar ao e-mail sozinha.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPessoa",
        "kind": "locate",
        "entity": "PessoaOrganizacao",
        "title": "Localizar a pessoa certa",
        "description": "O responsável procura a pessoa que pediu a liberação entre as pessoas da organização."
      },
      {
        "stepId": "conferirCadastro",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Conferir cadastro da pessoa",
        "description": "O responsável confere se é a pessoa certa antes de liberar."
      },
      {
        "stepId": "convidarPessoaCerta",
        "kind": "act",
        "entity": "PessoaOrganizacao",
        "effect": "create",
        "title": "Convidar a pessoa certa",
        "description": "O responsável convida a pessoa certa pelo e-mail com o convite da plataforma, que liga o e-mail ao cadastro existente sem criar outra pessoa."
      }
    ],
    "outcome": {
      "statement": "O e-mail da pessoa fica ligado ao cadastro certo e ela consegue completar o acesso.",
      "evidence": [
        "A pessoa deixa de ver o aviso de liberação pendente",
        "Não há segundo cadastro para a mesma pessoa"
      ]
    }
  },
  "businessHash": "sha256:56837c91d0d5a4a8c96ea4111bcb10659e00d4458100c96866749b95b5c895c5"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type LiberarAcessoJourneyType = typeof liberarAcessoJourney;

export default liberarAcessoJourney;
