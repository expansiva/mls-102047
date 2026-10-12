/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Evento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityEvento = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "entityId": "Evento",
  "title": "Evento",
  "description": "Evento cadastrado pelo organizador com título, descrição, data, local e número de vagas; nasce em rascunho e, ao ser publicado, ganha página pública de inscrição. Vagas ocupadas e tamanho da lista de espera são valores derivados das inscrições.",
  "displayField": "titulo",
  "relationships": {
    "inscricoes": {
      "relationshipId": "inscricaoEvento",
      "to": "Inscricao",
      "via": "Inscricao.eventoId",
      "cardinality": "1:N",
      "title": "Inscrições do evento",
      "description": "Inscrições confirmadas e lista de espera deste evento, por ordem de chegada.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "participantes": {
      "relationshipId": "participantesDoEvento",
      "to": "Participante",
      "via": "Inscricao",
      "cardinality": "N:N",
      "title": "Participantes do evento",
      "description": "Pessoas inscritas no evento, obtidas a partir das suas inscrições.",
      "mode": "throughTable",
      "path": "Evento <- Inscricao.eventoId -> Inscricao.participanteId -> Participante",
      "derived": true
    }
  },
  "capabilities": {
    "read.byId": "Abre o evento pelo id para o organizador revisar antes de publicar e para a página pública mostrar seus detalhes.",
    "locate.byColumn": "Lista os eventos filtrando por situação e ordenando pela data do evento, para o organizador encontrar o que editar ou acompanhar.",
    "locate.byText": "Busca eventos pelo título digitado na caixa de pesquisa da lista do organizador.",
    "count": "Conta os eventos por situação no cabeçalho da lista do organizador.",
    "listByForeignKey": "Lista as inscrições de um evento, confirmadas e em espera por ordem de chegada, para o organizador acompanhar e calcular a ocupação.",
    "create": "O organizador cadastra um novo evento com título, descrição, data, local e número de vagas, que nasce em rascunho.",
    "update": "O organizador corrige título, descrição, data, local ou número de vagas de um evento já cadastrado.",
    "transition": "O organizador publica o evento em rascunho, abrindo a página pública de inscrição.",
    "read.mdmRecord": "Lê o nome e o e-mail dos participantes inscritos no evento para a lista do organizador e o arquivo CSV.",
    "inscricaoEvento.paginaPublica": "Exibe ao público a página de um evento publicado com título, descrição, data, local e disponibilidade de vagas, sem login.",
    "inscricaoEvento.exportarCsv": "Gera para o organizador o arquivo CSV com os inscritos do evento, confirmados e lista de espera, com nome, e-mail, situação e ordem de chegada."
  },
  "rules": [
    "eventoCompletoParaPublicar",
    "numeroVagasPositivo",
    "somentePublicadoRecebeInscricao",
    "inscricaoAlemDasVagasVaiParaEspera",
    "vagasNaoMenoresQueConfirmados"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "inscricaoEvento_evento",
    "kind": "relational"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "titulo": {
        "type": "string",
        "required": true,
        "indexed": true,
        "title": "Título",
        "description": "Nome do evento exibido na lista do organizador e na página pública; usado na busca por texto.",
        "maxLength": 200
      },
      "dataEvento": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "title": "Data do evento",
        "description": "Data e hora em que o evento acontece; ordena a lista de eventos e permite filtrar os próximos."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "rascunho",
            "title": "Rascunho",
            "description": "Cadastrado pelo organizador, ainda sem página pública."
          },
          {
            "value": "publicado",
            "title": "Publicado",
            "description": "Com página pública aberta para inscrições."
          }
        ],
        "title": "Situação",
        "description": "Etapa do evento: em rascunho enquanto o organizador prepara, publicado quando a página pública passa a aceitar inscrições."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados descritivos do evento.",
        "fields": {
          "descricao": {
            "type": "text",
            "required": true,
            "title": "Descrição",
            "description": "Texto que apresenta o evento na página pública: programação, público-alvo e demais informações."
          },
          "local": {
            "type": "string",
            "required": true,
            "title": "Local",
            "description": "Onde o evento acontece, como informado pelo organizador (endereço, sala ou link de transmissão).",
            "maxLength": 300
          },
          "numeroVagas": {
            "type": "integer",
            "required": true,
            "title": "Número de vagas",
            "description": "Quantidade de inscrições confirmadas que o evento comporta; acima disso as inscrições entram na lista de espera.",
            "min": 1
          },
          "vagasOcupadas": {
            "type": "integer",
            "derived": true,
            "title": "Vagas ocupadas",
            "description": "Quantidade de inscrições confirmadas e não canceladas deste evento."
          },
          "vagasDisponiveis": {
            "type": "integer",
            "derived": true,
            "title": "Vagas disponíveis",
            "description": "Número de vagas do evento menos as vagas ocupadas pelas inscrições confirmadas, nunca abaixo de zero."
          },
          "tamanhoListaEspera": {
            "type": "integer",
            "derived": true,
            "title": "Lista de espera",
            "description": "Quantidade de inscrições deste evento que estão aguardando na lista de espera."
          },
          "lotado": {
            "type": "boolean",
            "derived": true,
            "title": "Lotado",
            "description": "Verdadeiro quando as inscrições confirmadas já ocupam todas as vagas do evento, de modo que novas inscrições vão para a lista de espera."
          }
        }
      }
    }
  },
  "lifecycleStates": [
    {
      "state": "rascunho",
      "reachedBy": "actor"
    },
    {
      "state": "publicado",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "publicar",
      "from": [
        "rascunho"
      ],
      "to": "publicado",
      "by": [
        "organizador"
      ],
      "description": "O organizador publica o evento, que ganha página pública e passa a aceitar inscrições.",
      "payload": [],
      "ruleRefs": [
        "eventoCompletoParaPublicar"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type InscricaoEventoEntityEventoType = typeof inscricaoEventoEntityEvento;

export default inscricaoEventoEntityEvento;
