/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/enviarEquipamentoManutencao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const enviarEquipamentoManutencaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "enviarEquipamentoManutencao",
  "business": {
    "actorRef": "gerente",
    "title": "Enviar equipamento para manutenção",
    "goal": "Retirar de operação um equipamento disponível para manutenção, depois de conferir que não está em contrato vigente, para que não possa ser locado enquanto é consertado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEquipamento",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "Localizar o equipamento",
        "description": "Busca o equipamento pelo código ou descrição entre os equipamentos disponíveis."
      },
      {
        "stepId": "conferirEquipamento",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "Conferir situação e contratos",
        "description": "Confere que o equipamento está disponível e não faz parte de nenhum contrato de locação vigente."
      },
      {
        "stepId": "enviarManutencao",
        "kind": "act",
        "entity": "Equipamento",
        "effect": "transition",
        "transitionRef": "enviarManutencao",
        "title": "Enviar para manutenção",
        "description": "Coloca o equipamento em manutenção; o sistema recusa se ele estiver em contrato vigente."
      }
    ],
    "outcome": {
      "statement": "O equipamento está em manutenção e não pode ser incluído em novos contratos.",
      "evidence": [
        "Equipamento aparece com situação em manutenção",
        "Equipamento não aparece entre os disponíveis ao criar um contrato"
      ]
    }
  },
  "businessHash": "sha256:d8ec3ef37ab528db202fc2b7f7c31b3529111de58438e3804c0f7f1f805af8d5"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type EnviarEquipamentoManutencaoJourneyType = typeof enviarEquipamentoManutencaoJourney;

export default enviarEquipamentoManutencaoJourney;
