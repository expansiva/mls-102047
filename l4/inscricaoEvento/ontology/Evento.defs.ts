/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Evento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityEvento = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "entityId": "Evento",
  "title": "Evento",
  "description": "Evento cadastrado pelo organizador com título, descrição, data, local e número de vagas; nasce como rascunho e, ao ser publicado, ganha uma página pública de inscrição. Vagas ocupadas, vagas disponíveis e tamanho da lista de espera são valores derivados das inscrições.",
  "displayField": "titulo",
  "relationships": {
    "inscricoes": {
      "relationshipId": "inscricaoEvento",
      "to": "Inscricao",
      "via": "Inscricao.eventoId",
      "cardinality": "1:N",
      "title": "Inscrições do evento",
      "description": "Inscrições confirmadas e lista de espera deste evento.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "participantes": {
      "relationshipId": "eventoParticipantes",
      "to": "Participante",
      "via": "Inscricao",
      "cardinality": "N:N",
      "title": "Participantes inscritos",
      "description": "Pessoas inscritas no evento, obtidas a partir das inscrições.",
      "mode": "throughTable",
      "path": "Evento <- Inscricao.eventoId -> Inscricao.participanteId -> Participante",
      "derived": true
    }
  },
  "capabilities": {
    "read.byId": "Abre um evento pelo id, para o organizador revisar e editar e para a página pública exibir título, descrição, data, local e disponibilidade.",
    "locate.byColumn": "Lista os eventos filtrando por situação e ordenando por data, na lista do organizador.",
    "locate.byText": "Busca eventos pelo título digitado na caixa de busca do organizador.",
    "count": "Conta os eventos por situação no cabeçalho da lista do organizador.",
    "listByForeignKey": "Lista as inscrições que apontam para o evento, para o organizador acompanhar confirmados e lista de espera.",
    "create": "Cria o evento como rascunho com título, descrição, data, local e número de vagas; usado pelo organizador.",
    "update": "Altera título, descrição, data, local ou número de vagas de um evento; usado pelo organizador.",
    "transition": "Publica o evento, movendo-o de rascunho para publicado; feito pelo organizador.",
    "transaction": "Grava a redução de vagas e a promoção de inscrições da lista de espera juntas, tudo ou nada, quando o organizador altera o número de vagas.",
    "inscricaoEvento.paginaPublica": "Exibe a página pública de um evento publicado, com dados e disponibilidade de vagas, para qualquer pessoa do público se inscrever.",
    "inscricaoEvento.ocupacao": "Mostra ao organizador o total de vagas, as vagas ocupadas, as disponíveis e o tamanho da lista de espera do evento."
  },
  "rules": [
    "numeroVagasPositivo",
    "publicarExigeDadosCompletos",
    "inscricaoSomenteEmEventoPublicado",
    "inscricaoExcedenteVaiParaEspera",
    "aumentoVagasPromoveListaEspera"
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
        "description": "Título do evento, exibido na lista do organizador e na página pública; usado na busca por texto e na ordenação.",
        "maxLength": 200
      },
      "dataEvento": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "title": "Data do evento",
        "description": "Data e hora em que o evento acontece; a lista de eventos é filtrada e ordenada por ela."
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
        "description": "Situação do evento no ciclo de vida: rascunho enquanto o organizador prepara, publicado quando a página pública aceita inscrições."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados do evento que apenas são exibidos.",
        "fields": {
          "descricao": {
            "type": "text",
            "title": "Descrição",
            "description": "Texto que apresenta o evento na página pública."
          },
          "local": {
            "type": "string",
            "required": true,
            "title": "Local",
            "description": "Onde o evento acontece, como o organizador o descreve (endereço, sala ou link).",
            "maxLength": 300
          },
          "numeroVagas": {
            "type": "integer",
            "required": true,
            "title": "Número de vagas",
            "description": "Quantidade de inscrições confirmadas que o evento comporta; além dela, as novas inscrições vão para a lista de espera.",
            "min": 1
          },
          "publicadoEm": {
            "type": "timestamp",
            "title": "Publicado em",
            "description": "Momento em que o organizador publicou o evento."
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
            "description": "Número de vagas do evento menos as vagas ocupadas, nunca abaixo de zero."
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
            "description": "Verdadeiro quando as vagas ocupadas atingem o número de vagas do evento; novas inscrições vão para a lista de espera."
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
      "description": "O organizador publica o evento, que passa a ter uma página pública de inscrição.",
      "payload": [],
      "ruleRefs": [
        "publicarExigeDadosCompletos"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type InscricaoEventoEntityEventoType = typeof inscricaoEventoEntityEvento;

export default inscricaoEventoEntityEvento;
