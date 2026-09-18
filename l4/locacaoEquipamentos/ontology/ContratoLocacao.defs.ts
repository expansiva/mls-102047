/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/ContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosEntityContratoLocacao = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "locacaoEquipamentos",
  "entityId": "ContratoLocacao",
  "title": "Contrato de locação",
  "description": "Contrato que registra a locação de equipamentos para um cliente, o período previsto e a devolução efetiva.",
  "displayField": "id",
  "relationships": {
    "cliente": {
      "relationshipId": "contratoLocacaoCliente",
      "to": "Cliente",
      "via": "ContratoLocacao.clienteId",
      "cardinality": "N:1",
      "title": "Cliente do contrato",
      "description": "Cliente para quem este contrato de locação foi criado.",
      "mode": "fk",
      "required": "Sempre."
    },
    "itens": {
      "relationshipId": "contratoLocacaoItens",
      "to": "ItemContratoLocacao",
      "via": "ItemContratoLocacao.contratoLocacaoId",
      "cardinality": "1:N",
      "title": "Itens do contrato",
      "description": "Itens que registram os equipamentos incluídos neste contrato.",
      "mode": "fk",
      "required": "Sempre, com pelo menos um equipamento locado."
    },
    "equipamentos": {
      "relationshipId": "contratoLocacaoEquipamentos",
      "to": "Equipamento",
      "via": "ItemContratoLocacao",
      "cardinality": "N:N",
      "title": "Equipamentos locados",
      "description": "Equipamentos obtidos pelos itens deste contrato de locação.",
      "mode": "throughTable",
      "path": "ContratoLocacao <- ItemContratoLocacao.contratoLocacaoId; ItemContratoLocacao.equipamentoId -> Equipamento",
      "derived": true,
      "required": "Sempre, por meio dos itens do contrato."
    }
  },
  "capabilities": {
    "read.byId": "Lê um contrato pelo identificador no repositório para o atendente consultar uma locação já selecionada.",
    "locate.byColumn": "Lista contratos por cliente, situação e datas indexadas para o atendente localizar a locação em devolução e o gerente acompanhar locações.",
    "count": "Conta contratos conforme os filtros de cliente, situação e período para exibir totais nas listas do atendente e do gerente.",
    "listByForeignKey": "Lista os contratos vinculados a um cliente pela chave estrangeira para consultar o histórico de locações desse cliente.",
    "create": "Cria o contrato com cliente, período e itens em uma operação de locação realizada pelo atendente.",
    "transition": "Move o contrato de em aberto para encerrado ao registrar a devolução pelo atendente.",
    "transaction": "Grava o contrato e seus itens de equipamentos de forma atômica para o atendente não deixar uma locação incompleta.",
    "read.mdmRecord": "Lê o registro mestre apontado por clienteId para mostrar os dados do cliente ao atendente e ao gerente."
  },
  "rules": [
    "contratoComPeloMenosUmEquipamento",
    "equipamentoSemPeriodosSobrepostos",
    "multaAtrasoLocacao"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "locacaoEquipamentos_contratolocacao",
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
      "clienteId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Cliente"
        ],
        "title": "Cliente",
        "description": "Cliente para quem o contrato de locação foi registrado.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "of": "Address",
        "values": [
          {
            "value": "open",
            "title": "Em aberto",
            "description": "Locação criada e ainda sem devolução registrada."
          },
          {
            "value": "closed",
            "title": "Encerrado",
            "description": "Locação cuja devolução foi registrada."
          }
        ],
        "title": "Situação do contrato",
        "description": "Situação operacional do contrato de locação, usada para distinguir locações em aberto das encerradas.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "dataRetirada": {
        "type": "date",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Data de retirada",
        "description": "Data prevista para retirada dos equipamentos pelo cliente.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "dataPrevistaDevolucao": {
        "type": "date",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Data prevista de devolução",
        "description": "Data até a qual os equipamentos devem ser devolvidos, usada para verificar disponibilidade e atraso.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "dataRealDevolucao": {
        "type": "date",
        "indexed": true,
        "of": "Address",
        "title": "Data real de devolução",
        "description": "Data em que a devolução dos equipamentos foi efetivamente registrada.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Detalhes do contrato",
        "description": "Informações do contrato que não precisam de filtro, ordenação ou deduplicação.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "multaPorAtraso": {
            "type": "money",
            "derived": true,
            "title": "Multa por atraso",
            "description": "Multa calculada quando a data real de devolução for posterior à data prevista, somando a diária de cada equipamento locado multiplicada pelos dias de atraso e por 1,5."
          }
        }
      }
    }
  },
  "lifecycleStates": [
    {
      "state": "open",
      "reachedBy": "actor"
    },
    {
      "state": "closed",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "registrarDevolucao",
      "from": [
        "open"
      ],
      "to": "closed",
      "by": [
        "atendente"
      ],
      "description": "Registra a data real de devolução e encerra a locação dos equipamentos do contrato.",
      "ruleRefs": [
        "multaAtrasoLocacao"
      ]
    }
  ]
} as const satisfies Ns5OntologyEntityV3;

export type LocacaoEquipamentosEntityContratoLocacaoType = typeof locacaoEquipamentosEntityContratoLocacao;

export default locacaoEquipamentosEntityContratoLocacao;
