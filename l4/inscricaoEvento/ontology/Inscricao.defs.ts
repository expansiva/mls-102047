/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityInscricao = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "entityId": "Inscricao",
  "title": "Inscrição",
  "description": "Inscrição de uma pessoa em um evento publicado: confirmada quando há vaga, em lista de espera por ordem de chegada quando as vagas acabam, promovida quando um confirmado cancela, ou cancelada. Um mesmo e-mail só pode ter uma inscrição por evento.",
  "displayField": "numeroInscricao",
  "relationships": {
    "evento": {
      "relationshipId": "inscricaoEvento",
      "to": "Evento",
      "via": "Inscricao.eventoId",
      "cardinality": "N:1",
      "title": "Evento da inscrição",
      "description": "Cada inscrição pertence a um evento.",
      "mode": "fk",
      "required": true
    },
    "participante": {
      "relationshipId": "inscricaoParticipante",
      "to": "Participante",
      "via": "Inscricao.participanteId",
      "cardinality": "N:1",
      "title": "Participante inscrito",
      "description": "Cada inscrição é de um participante; o mesmo participante pode se inscrever em vários eventos.",
      "mode": "fk",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Abre uma inscrição pelo id para o organizador ver o detalhe ou para a pessoa ver a própria inscrição.",
    "locate.byColumn": "Lista as inscrições de um evento filtradas por situação e ordenadas pela data de inscrição, para o organizador ver confirmados e lista de espera e para a pessoa localizar a própria inscrição.",
    "listByForeignKey": "Lista as inscrições de um evento ou de um participante pela chave estrangeira, usada na tela de inscritos do organizador e no processo de promoção.",
    "count": "Conta as inscrições confirmadas e em espera de um evento para mostrar as vagas ocupadas e decidir se uma nova inscrição é confirmada ou vai para a espera.",
    "create": "Grava a inscrição enviada pela pessoa na página pública, como confirmada ou em lista de espera conforme as vagas.",
    "transition": "Move a inscrição para cancelada quando a pessoa desiste e para confirmada quando o processo promove o primeiro da lista de espera.",
    "uniqueKey": "Recusa uma segunda inscrição do mesmo participante (mesmo e-mail) no mesmo evento e garante número de inscrição único.",
    "transaction": "Cancela uma inscrição e promove o primeiro da lista de espera numa única operação, sem perder nem duplicar vaga.",
    "read.mdmRecord": "Lê nome e e-mail do participante de cada inscrição no cadastro mestre, hidratando a lista de inscritos de uma vez.",
    "sequence.next": "Emite o número da inscrição na criação, pela sequência da plataforma por evento.",
    "inscricaoEvento.exportarCsv": "Gera o arquivo CSV com os inscritos de um evento (número, nome, e-mail, situação e data de inscrição) para o organizador baixar."
  },
  "rules": [
    "inscricaoEmailUnicoPorEvento",
    "inscricaoSomenteEventoPublicado",
    "inscricaoListaEsperaQuandoLotado",
    "inscricaoPromocaoOrdemChegada",
    "inscricaoCancelamentoSomentePropria",
    "inscricaoNumeroSequencial"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "inscricaoEvento_inscricao",
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
      "numeroInscricao": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "title": "Número da inscrição",
        "description": "Número que a pessoa e o organizador citam para identificar a inscrição, emitido pela sequência da plataforma na criação.",
        "maxLength": 30
      },
      "eventoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Evento"
        ],
        "title": "Evento",
        "description": "Evento publicado no qual a pessoa se inscreveu."
      },
      "participanteId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Participante"
        ],
        "title": "Participante",
        "description": "Pessoa inscrita; nome e e-mail ficam no cadastro mestre do participante e são lidos de lá."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "confirmada",
            "title": "Confirmada",
            "description": "A inscrição ocupa uma vaga do evento."
          },
          {
            "value": "listaEspera",
            "title": "Lista de espera",
            "description": "As vagas tinham acabado; aguarda promoção por ordem de chegada."
          },
          {
            "value": "cancelada",
            "title": "Cancelada",
            "description": "A pessoa desistiu da inscrição."
          }
        ],
        "title": "Situação",
        "description": "Situação da inscrição: confirmada com vaga, em lista de espera ou cancelada."
      },
      "inscritoEm": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "title": "Data e hora da inscrição",
        "description": "Momento em que a inscrição chegou; define a ordem de chegada da lista de espera e a ordenação da lista de inscritos."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Demais dados da inscrição.",
        "fields": {
          "confirmadaEm": {
            "type": "timestamp",
            "title": "Confirmada em",
            "description": "Momento em que a inscrição passou a ocupar uma vaga, na criação ou na promoção da lista de espera."
          },
          "promovidaEm": {
            "type": "timestamp",
            "title": "Promovida em",
            "description": "Momento em que a inscrição saiu da lista de espera e foi confirmada após um cancelamento."
          },
          "canceladaEm": {
            "type": "timestamp",
            "title": "Cancelada em",
            "description": "Momento em que a pessoa cancelou a inscrição."
          },
          "situacaoAoCancelar": {
            "type": "enum",
            "values": [
              {
                "value": "confirmada",
                "title": "Confirmada"
              },
              {
                "value": "listaEspera",
                "title": "Lista de espera"
              }
            ],
            "title": "Situação ao cancelar",
            "description": "Se a inscrição ocupava uma vaga ou estava na lista de espera quando foi cancelada; decide se há promoção."
          },
          "idioma": {
            "type": "enum",
            "values": [
              {
                "value": "pt",
                "title": "Português"
              },
              {
                "value": "en",
                "title": "Inglês"
              }
            ],
            "title": "Idioma",
            "description": "Idioma em que a pessoa usou a página pública, para as mensagens da inscrição."
          },
          "posicaoListaEspera": {
            "type": "integer",
            "derived": true,
            "title": "Posição na lista de espera",
            "description": "Posição desta inscrição entre as inscrições em lista de espera do mesmo evento, contada pela ordem de chegada; vazia quando a inscrição não está em espera."
          },
          "ocupaVaga": {
            "type": "boolean",
            "derived": true,
            "title": "Ocupa vaga",
            "description": "Verdadeiro quando a inscrição está confirmada e portanto conta nas vagas ocupadas do evento."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "eventoId",
      "participanteId"
    ],
    [
      "numeroInscricao"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "confirmada",
      "reachedBy": "command"
    },
    {
      "state": "listaEspera",
      "reachedBy": "command"
    },
    {
      "state": "cancelada",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "cancelar",
      "from": [
        "confirmada",
        "listaEspera"
      ],
      "to": "cancelada",
      "by": [
        "publico"
      ],
      "description": "A pessoa cancela a própria inscrição; se ocupava uma vaga, a vaga é liberada e o processo de promoção da lista de espera é disparado.",
      "payload": [],
      "ruleRefs": [
        "inscricaoCancelamentoSomentePropria",
        "inscricaoPromocaoOrdemChegada"
      ]
    },
    {
      "transitionId": "promover",
      "from": [
        "listaEspera"
      ],
      "to": "confirmada",
      "by": [],
      "description": "O processo promove a inscrição mais antiga da lista de espera do evento quando uma vaga é liberada por cancelamento.",
      "payload": [],
      "ruleRefs": [
        "inscricaoPromocaoOrdemChegada"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type InscricaoEventoEntityInscricaoType = typeof inscricaoEventoEntityInscricao;

export default inscricaoEventoEntityInscricao;
