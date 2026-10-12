/// <mls fileReference="_102047_/l4/inscricaoEvento/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoAccess = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "inscricaoEvento",
  "actors": [
    {
      "actorId": "organizador",
      "kind": "internal",
      "origin": "named",
      "title": "Organizador",
      "description": "Cadastra e publica eventos com título, descrição, data, local e número de vagas, acompanha os inscritos e as vagas ocupadas e baixa a lista de inscritos em CSV.",
      "personEntity": ""
    },
    {
      "actorId": "publico",
      "kind": "external",
      "origin": "named",
      "title": "Público",
      "description": "Qualquer pessoa que acessa a página pública de um evento publicado e se inscreve com nome e e-mail, entrando na lista de espera quando as vagas acabam, e pode cancelar a própria inscrição.",
      "personEntity": "Participante"
    }
  ],
  "grants": [
    {
      "grantId": "organizadorGerenciaEventosInscricoes",
      "actorRef": "organizador",
      "title": "Gerenciar eventos e acompanhar inscritos",
      "description": "O organizador cadastra, edita e publica eventos, acompanha as vagas ocupadas e a lista de espera, vê os inscritos com nome e e-mail e baixa a lista em CSV.",
      "entityRefs": [
        "Evento",
        "Inscricao",
        "Participante",
        "EmailParticipante"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os eventos da organização e todas as inscrições, participantes e e-mails ligados a eles."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Registro completo de eventos, inscrições e dos participantes inscritos, incluindo nome, e-mail e totais derivados de vagas."
      }
    },
    {
      "grantId": "publicoMinhaInscricao",
      "actorRef": "publico",
      "title": "Inscrever-se e cancelar a própria inscrição",
      "description": "A pessoa vê os dados do evento publicado em que se inscreve, envia a própria inscrição com nome e e-mail, acompanha se está confirmada ou em espera e pode cancelá-la.",
      "entityRefs": [
        "Inscricao",
        "Evento",
        "Participante",
        "EmailParticipante"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Apenas as inscrições da própria pessoa, o evento dessas inscrições, o próprio registro de participante e o próprio e-mail.",
        "anchorEntity": "Participante"
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "A pessoa vê o evento, sua inscrição, seu nome e seu e-mail; não vê campos internos da organização nem os papéis e relacionamentos do registro mestre.",
        "deniedFields": [
          "Participante.details.general",
          "Participante.details.identification.tags",
          "EmailParticipante.details.base.relationshipRefs",
          "EmailParticipante.details.general",
          "EmailParticipante.details.identification.tags"
        ]
      }
    }
  ]
} as const satisfies Ns5Readonly<Ns5AccessArtifact>;

export type InscricaoEventoAccessType = typeof inscricaoEventoAccess;

export default inscricaoEventoAccess;
