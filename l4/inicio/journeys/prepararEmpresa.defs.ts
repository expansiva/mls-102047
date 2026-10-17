/// <mls fileReference="_102047_/l4/inicio/journeys/prepararEmpresa.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const prepararEmpresaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "prepararEmpresa",
  "business": {
    "actorRef": "responsavel",
    "title": "Preparar a empresa",
    "goal": "Completar os dados obrigatórios da empresa para que ela fique marcada como preparada.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "abrirEmpresa",
        "kind": "locate",
        "entity": "Empresa",
        "title": "Abrir dados da empresa",
        "description": "O responsável abre a tela inicial e acessa o cadastro da própria empresa."
      },
      {
        "stepId": "verPendencias",
        "kind": "inspect",
        "entity": "Empresa",
        "title": "Ver dados que faltam",
        "description": "A tela mostra o que a plataforma já tem e destaca só os dados obrigatórios que faltam (nome, documento, endereço, contato)."
      },
      {
        "stepId": "completarDados",
        "kind": "act",
        "entity": "Empresa",
        "effect": "update",
        "title": "Confirmar dados da empresa",
        "description": "O responsável informa e confirma apenas os dados que faltam; com os obrigatórios completos, a empresa passa a constar como preparada."
      },
      {
        "stepId": "verOrientacao",
        "kind": "inspect",
        "entity": "Empresa",
        "title": "Ver orientação final",
        "description": "A tela mostra o texto fixo de orientação com o link para criar o primeiro módulo no Studio."
      }
    ],
    "outcome": {
      "statement": "A empresa tem os dados obrigatórios completos e aparece como preparada.",
      "evidence": [
        "Os dados da empresa aparecem completos sem pedir de novo o que já existia",
        "A empresa é exibida como preparada",
        "O texto de orientação com o link para o Studio é exibido"
      ]
    }
  },
  "businessHash": "sha256:8333ee6685a9bc27344839a74fc26971a49271e3e5ecfd9e72b56aa14b83ac79"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type PrepararEmpresaJourneyType = typeof prepararEmpresaJourney;

export default prepararEmpresaJourney;
