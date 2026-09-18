/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/inscreverSeEmEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const inscreverSeEmEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "inscreverSeEmEvento",
  "business": {
    "actorRef": "publico",
    "title": "Inscrever-se em evento",
    "goal": "Registrar uma inscrição em um evento publicado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEventoPublicado",
        "kind": "locate",
        "entity": "Evento",
        "title": "Localizar evento publicado",
        "description": "Acessa a página pública do evento ou localiza um evento publicado para inscrição."
      },
      {
        "stepId": "consultarDetalhesDoEvento",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Consultar detalhes do evento",
        "description": "Consulta título, descrição, data, local e disponibilidade de vagas."
      },
      {
        "stepId": "registrarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "create",
        "title": "Registrar inscrição",
        "description": "Informa nome e e-mail para se inscrever. O sistema impede mais de uma inscrição com o mesmo e-mail no mesmo evento e registra a inscrição como confirmada quando há vaga ou na lista de espera quando as vagas estão esgotadas."
      }
    ],
    "outcome": {
      "statement": "A pessoa tem uma inscrição única no evento, confirmada ou posicionada na lista de espera.",
      "evidence": [
        "Inscrição vinculada ao evento e ao e-mail informado.",
        "Situação da inscrição indicada como confirmada ou lista de espera.",
        "Posição de espera registrada quando não há vagas disponíveis."
      ]
    }
  },
  "businessHash": "sha256:3c52b4e559cc28ccf65c4f8d9f1c75084607652551ef964ca7b09a580f7057ed"
} as const satisfies Ns5JourneyArtifact;

export type InscreverSeEmEventoJourneyType = typeof inscreverSeEmEventoJourney;

export default inscreverSeEmEventoJourney;
