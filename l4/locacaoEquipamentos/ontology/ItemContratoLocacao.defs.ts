/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/ItemContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosEntityItemContratoLocacao = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "locacaoEquipamentos",
  "entityId": "ItemContratoLocacao",
  "title": "Item do contrato de locação",
  "description": "Equipamento individual incluído em um contrato, com a diária aplicável à locação e os valores necessários para apurar multa por atraso.",
  "displayField": "id",
  "relationships": {
    "contratoLocacao": {
      "relationshipId": "contratoLocacaoItens",
      "to": "ContratoLocacao",
      "via": "ItemContratoLocacao.contratoLocacaoId",
      "cardinality": "N:1",
      "title": "Contrato de locação",
      "description": "Item pertencente a um contrato de locação.",
      "mode": "fk",
      "direction": "to",
      "required": "sempre"
    },
    "equipamento": {
      "relationshipId": "itemContratoLocacaoEquipamento",
      "to": "Equipamento",
      "via": "ItemContratoLocacao.equipamentoId",
      "cardinality": "N:1",
      "title": "Equipamento locado",
      "description": "Equipamento individual reservado neste item do contrato.",
      "mode": "fk",
      "required": "sempre"
    }
  },
  "capabilities": {
    "read.byId": "Consulta um item pelo identificador da linha para exibir o equipamento e sua diária aplicável no contrato, usada por atendentes e gerentes.",
    "locate.byColumn": "Lista itens filtrados pelo contrato ou pelo equipamento indexados, com paginação, usada para consultar os equipamentos de um contrato e verificar locações de um equipamento.",
    "count": "Conta os itens que correspondem aos filtros de contrato ou equipamento para compor listas e verificações da locação, usado por atendentes e gerentes.",
    "listByForeignKey": "Lista os itens vinculados a um contrato ou a um equipamento pela chave estrangeira, usada nas telas de contrato e de disponibilidade.",
    "create": "Inclui um equipamento e sua diária aplicável como item de um novo contrato, gravado junto à abertura pelo atendente.",
    "update": "Atualiza a diária aplicável ou o equipamento de um item enquanto o contrato pode ser ajustado, usado pelo atendente.",
    "delete": "Remove um item incluído indevidamente antes da confirmação do contrato, usado pelo atendente.",
    "uniqueKey": "Impede que o mesmo equipamento seja incluído mais de uma vez no mesmo contrato pela chave composta de contrato e equipamento, aplicado pelo sistema.",
    "transaction": "Grava de forma atômica o contrato e todos os seus itens de equipamentos, usada pelo atendente na abertura da locação."
  },
  "rules": [
    "equipamentoSemSobreposicao",
    "calcularMultaAtraso"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "locacaoEquipamentos_itemcontratolocacao",
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
      "contratoLocacaoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "ContratoLocacao"
        ],
        "title": "Contrato de locação",
        "description": "Contrato de locação ao qual este equipamento foi incluído.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "equipamentoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Equipamento"
        ],
        "title": "Equipamento",
        "description": "Equipamento individual reservado e locado neste item do contrato.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Dados do item",
        "description": "Dados comerciais aplicáveis ao equipamento neste contrato de locação.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "valorDiariaAplicavel": {
            "type": "money",
            "required": true,
            "of": "Address",
            "title": "Valor da diária aplicável",
            "description": "Valor da diária do equipamento acordado para este item no contrato.",
            "maxLength": 0,
            "min": 0,
            "max": 0
          },
          "multaAtraso": {
            "type": "money",
            "derived": true,
            "title": "Multa por atraso",
            "description": "Multa deste equipamento quando a devolução real do contrato é posterior à data prevista, calculada pela diária aplicável multiplicada pelos dias de atraso e por 1,5."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "contratoLocacaoId",
      "equipamentoId"
    ]
  ]
} as const satisfies Ns5OntologyEntityV3;

export type LocacaoEquipamentosEntityItemContratoLocacaoType = typeof locacaoEquipamentosEntityItemContratoLocacao;

export default locacaoEquipamentosEntityItemContratoLocacao;
