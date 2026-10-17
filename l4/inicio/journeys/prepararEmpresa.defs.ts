/// <mls fileReference="_102047_/l4/inicio/journeys/prepararEmpresa.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const prepararEmpresaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "prepararEmpresa",
  "business": {
    "actorRef": "responsavel",
    "title": "Preparar a empresa",
    "goal": "Completar os dados obrigatórios da empresa que ainda faltam para que ela fique preparada.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verBoasVindasEmpresa",
        "kind": "inspect",
        "entity": "Empresa",
        "title": "Ver boas-vindas e pendências",
        "description": "O responsável vê a tela de boas-vindas com os dados da empresa que a plataforma já tem e os que ainda faltam."
      },
      {
        "stepId": "completarDadosEmpresa",
        "kind": "act",
        "entity": "Empresa",
        "effect": "update",
        "title": "Completar dados da empresa",
        "description": "O responsável informa apenas os dados que faltam (nome, documento, endereço, contato), sem repetir o que a plataforma já tem."
      },
      {
        "stepId": "verPessoasOrganizacao",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver pessoas da organização",
        "description": "O responsável vê as pessoas da organização e quais ainda não completaram o acesso."
      },
      {
        "stepId": "verOrientacaoStudio",
        "kind": "inspect",
        "entity": "Empresa",
        "title": "Ver orientação final",
        "description": "A tela mostra a empresa como preparada e um texto fixo de orientação com o link para criar o primeiro módulo no Studio."
      }
    ],
    "outcome": {
      "statement": "A empresa tem os dados obrigatórios completos e aparece como preparada.",
      "evidence": [
        "Os dados obrigatórios da empresa (nome, documento, endereço, contato) estão preenchidos.",
        "A empresa aparece marcada como preparada.",
        "A orientação com o link para o Studio é exibida."
      ]
    }
  },
  "businessHash": "sha256:299fcab64f75d01a733c0d8c9559edc2acec1b5ec174e7869e341868f997b192"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type PrepararEmpresaJourneyType = typeof prepararEmpresaJourney;

export default prepararEmpresaJourney;
