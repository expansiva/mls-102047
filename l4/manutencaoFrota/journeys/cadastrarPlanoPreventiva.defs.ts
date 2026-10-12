/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/cadastrarPlanoPreventiva.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarPlanoPreventivaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarPlanoPreventiva",
  "business": {
    "actorRef": "gestor",
    "title": "Cadastrar plano de preventiva",
    "goal": "Definir o plano de manutenção preventiva de um veículo, a cada N km ou a cada N meses.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculoPlano",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Localizar veículo",
        "description": "O gestor localiza o veículo pela placa."
      },
      {
        "stepId": "criarPlano",
        "kind": "act",
        "entity": "PlanoManutencao",
        "effect": "create",
        "title": "Criar plano preventivo",
        "description": "O gestor informa o intervalo em km e/ou em meses e a referência da última preventiva."
      },
      {
        "stepId": "conferirPlano",
        "kind": "inspect",
        "entity": "PlanoManutencao",
        "title": "Conferir próxima preventiva",
        "description": "O gestor confere o km e a data previstos para a próxima preventiva."
      }
    ],
    "outcome": {
      "statement": "O veículo tem um plano preventivo ativo com a próxima preventiva prevista.",
      "evidence": [
        "O plano aparece no veículo com intervalo em km ou meses",
        "O km e a data previstos da próxima preventiva são exibidos"
      ]
    }
  },
  "businessHash": "sha256:af1f883932cb5b15fd324c11862589cd530b660429a90eb5948806449732a2c3"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarPlanoPreventivaJourneyType = typeof cadastrarPlanoPreventivaJourney;

export default cadastrarPlanoPreventivaJourney;
