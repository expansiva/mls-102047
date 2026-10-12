/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/criarContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const criarContratoLocacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "criarContratoLocacao",
  "business": {
    "actorRef": "atendente",
    "title": "Criar contrato de locação",
    "goal": "Registrar a locação de um ou mais equipamentos para um cliente em um período definido.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarCliente",
        "kind": "locate",
        "entity": "Cliente",
        "title": "Localizar o cliente",
        "description": "Busca o cliente pelo nome ou documento; se não existir, informa os dados para cadastrá-lo junto com o contrato."
      },
      {
        "stepId": "informarPeriodo",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "create",
        "title": "Informar período da locação",
        "description": "Cria o contrato para o cliente com a data de retirada e a data prevista de devolução."
      },
      {
        "stepId": "localizarEquipamentos",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "Buscar equipamentos disponíveis",
        "description": "Pesquisa os equipamentos pelo código ou descrição e confere a situação e o valor da diária."
      },
      {
        "stepId": "adicionarItens",
        "kind": "act",
        "entity": "ItemContrato",
        "effect": "create",
        "title": "Adicionar equipamentos ao contrato",
        "description": "Inclui um ou mais equipamentos no contrato; o sistema recusa equipamento que já esteja em outro contrato com período sobreposto."
      },
      {
        "stepId": "confirmarContrato",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "transition",
        "transitionRef": "ativarContrato",
        "title": "Confirmar a locação",
        "description": "Confirma o contrato, que passa a vigente, e os equipamentos passam à situação locado."
      }
    ],
    "outcome": {
      "statement": "O contrato de locação está vigente com o cliente, os equipamentos e o período registrados.",
      "evidence": [
        "Contrato aparece como vigente com cliente, data de retirada e data prevista de devolução",
        "Cada equipamento do contrato aparece com situação locado",
        "Nenhum equipamento do contrato está em outro contrato com período sobreposto"
      ]
    }
  },
  "businessHash": "sha256:861d641ddad779527cca20c8de6b74306384b1e6c08c2a5646152d544b44a73e"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CriarContratoLocacaoJourneyType = typeof criarContratoLocacaoJourney;

export default criarContratoLocacaoJourney;
