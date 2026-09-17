/// <mls fileReference="_102047_/l4/compras/ontology/PedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityPedidoCompra = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "compras",
  "entityId": "PedidoCompra",
  "title": "Pedido de compra",
  "description": "Solicitação de compra enviada a um fornecedor, com itens, quantidades, preços e decisão de aprovação quando aplicável.",
  "displayField": "orderNumber",
  "relationships": {
    "fornecedor": {
      "relationshipId": "pedidoCompraFornecedor",
      "to": "Fornecedor",
      "via": "PedidoCompra.fornecedorId",
      "cardinality": "N:1",
      "title": "Fornecedor do pedido",
      "description": "Cada pedido de compra é aberto para um único fornecedor.",
      "mode": "fk",
      "required": "Sempre, ao abrir o pedido de compra.",
      "role": "fornecedor do pedido"
    },
    "recebimentos": {
      "relationshipId": "recebimentoPedidoPedidoCompra",
      "to": "RecebimentoPedido",
      "via": "RecebimentoPedido.pedidoCompraId",
      "cardinality": "1:N",
      "title": "Recebimentos do pedido",
      "description": "Recebimentos registram entregas totais ou parciais deste pedido de compra.",
      "mode": "fk",
      "direction": "to",
      "required": "Quando houver entrega registrada para o pedido.",
      "role": "pedido de origem do recebimento"
    }
  },
  "capabilities": {
    "read.byId": "Lê um pedido de compra pelo identificador da linha · consulta por id no repositório de PedidoCompra · comprador, gerente de compras e almoxarife.",
    "locate.byColumn": "Localiza pedidos por fornecedor, situação, data do pedido ou data prevista de entrega · usa colunas indexadas com ordenação e paginação · comprador, gerente de compras e almoxarife.",
    "count": "Conta pedidos por situação e prazo de entrega · aplica os mesmos filtros da lista sem paginação · gerente de compras no painel de acompanhamento.",
    "listByForeignKey": "Lista os pedidos de um fornecedor · consulta PedidoCompra pela chave estrangeira fornecedorId · comprador e gerente de compras.",
    "create": "Abre um pedido de compra em rascunho para um fornecedor · insere a linha com itens e dados do pedido · comprador.",
    "update": "Altera os dados e os itens de um pedido ainda em rascunho · aplica atualização parcial da linha · comprador.",
    "transition": "Move o pedido entre as situações de envio, decisão e recebimento · atualiza a coluna indexada status sob as regras do módulo · comprador, gerente de compras e almoxarife.",
    "uniqueKey": "Impede repetição do número do pedido · aplica índice único na coluna orderNumber · motor da plataforma ao gravar.",
    "transaction": "Grava de forma atômica a abertura ou a atualização de situação do pedido com seus efeitos de negócio · executa a operação em transação do módulo · serviços usados por comprador, gerente de compras e almoxarife.",
    "read.mdmRecord": "Lê os dados mestres do fornecedor e dos produtos referenciados pelo pedido · hidrata os registros MDM pelos seus identificadores · telas de pedido e de acompanhamento.",
    "sequence.next": "Emite o próximo número identificador do pedido · usa a sequência compras.PedidoCompra no escopo aplicável · módulo ao abrir o pedido para o comprador."
  },
  "rules": [
    "pedidoCompraItensObrigatorios",
    "pedidoCompraProdutoPertenceFornecedor",
    "pedidoCompraLimiteAprovacao",
    "pedidoCompraDecisaoNecessaria",
    "pedidoCompraJustificativaRejeicao",
    "pedidoCompraRecebimentoAutorizado",
    "pedidoCompraQuantidadeRecebidaNaoExcede"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_pedidocompra",
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
      "orderNumber": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "of": "Address",
        "title": "Número do pedido",
        "description": "Número único do pedido de compra, emitido pela sequência do módulo para identificação e consulta.",
        "pattern": "^.*$",
        "maxLength": 40,
        "min": 0,
        "max": 0
      },
      "fornecedorId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Fornecedor"
        ],
        "title": "Fornecedor",
        "description": "Fornecedor para o qual o pedido de compra foi aberto.",
        "pattern": "^.*$",
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
            "value": "draft",
            "title": "Rascunho",
            "description": "Pedido ainda em elaboração pelo comprador."
          },
          {
            "value": "sent",
            "title": "Enviado",
            "description": "Pedido enviado e disponível para acompanhamento ou recebimento, conforme a necessidade de aprovação."
          },
          {
            "value": "decided",
            "title": "Decidido",
            "description": "Pedido acima do limite cuja aprovação ou rejeição foi registrada pelo gerente."
          },
          {
            "value": "partiallyReceived",
            "title": "Recebido parcialmente",
            "description": "Pedido com parte das quantidades registradas em recebimentos."
          },
          {
            "value": "received",
            "title": "Recebido",
            "description": "Pedido com todas as quantidades previstas recebidas."
          }
        ],
        "title": "Situação do pedido",
        "description": "Etapa operacional do pedido de compra, usada para acompanhar pedidos em aberto, recebidos parcialmente e concluídos.",
        "pattern": "^.*$",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "orderDate": {
        "type": "date",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Data do pedido",
        "description": "Data em que a compra foi aberta, usada para a apuração mensal por fornecedor.",
        "pattern": "^.*$",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "expectedDeliveryDate": {
        "type": "date",
        "indexed": true,
        "of": "Address",
        "title": "Data prevista de entrega",
        "description": "Data combinada para entrega, usada para localizar pedidos atrasados.",
        "pattern": "^.*$",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Dados do pedido",
        "description": "Itens, valores calculados, envio e decisão de aprovação específicos deste pedido de compra.",
        "pattern": "^.*$",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "items": {
            "type": "object",
            "required": true,
            "collection": true,
            "of": "Address",
            "title": "Itens do pedido",
            "description": "Produtos solicitados ao fornecedor, com quantidade e preço aplicável no pedido.",
            "pattern": "^.*$",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "fields": {
              "produtoId": {
                "type": "record",
                "required": true,
                "of": "Address",
                "to": [
                  "Produto"
                ],
                "title": "Produto",
                "description": "Produto adquirido nesta linha do pedido.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "produtoFornecedorId": {
                "type": "record",
                "required": true,
                "of": "Address",
                "to": [
                  "ProdutoFornecedor"
                ],
                "title": "Produto do fornecedor",
                "description": "Cadastro do produto fornecido que referencia o preço combinado usado como base nesta linha.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "quantity": {
                "type": "number",
                "required": true,
                "of": "Address",
                "title": "Quantidade pedida",
                "description": "Quantidade do produto solicitada nesta linha.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0.0001,
                "max": 999999999
              },
              "unitPrice": {
                "type": "money",
                "required": true,
                "of": "Address",
                "title": "Preço unitário",
                "description": "Preço unitário aplicável ao produto no momento da abertura do pedido.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0,
                "max": 999999999
              },
              "lineTotal": {
                "type": "money",
                "of": "Address",
                "title": "Total do item",
                "description": "Valor calculado pela multiplicação da quantidade pelo preço unitário da linha.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0,
                "max": 999999999
              }
            }
          },
          "orderTotal": {
            "type": "money",
            "of": "Address",
            "title": "Valor total do pedido",
            "description": "Valor calculado pela soma dos totais dos itens; é usado para verificar a necessidade de decisão do gerente.",
            "pattern": "^.*$",
            "maxLength": 0,
            "min": 0,
            "max": 999999999
          },
          "sentAt": {
            "type": "timestamp",
            "of": "Address",
            "title": "Enviado em",
            "description": "Data e hora em que o comprador enviou o pedido de compra.",
            "pattern": "^.*$",
            "maxLength": 0,
            "min": 0,
            "max": 0
          },
          "approval": {
            "type": "object",
            "required": true,
            "of": "Address",
            "title": "Decisão de aprovação",
            "description": "Necessidade e resultado da decisão do gerente para pedidos que ultrapassam o valor limite.",
            "pattern": "^.*$",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "fields": {
              "decision": {
                "type": "enum",
                "required": true,
                "of": "Address",
                "values": [
                  {
                    "value": "notRequired",
                    "title": "Não necessária",
                    "description": "O valor do pedido não exige decisão do gerente."
                  },
                  {
                    "value": "pending",
                    "title": "Pendente",
                    "description": "O pedido ultrapassa o limite e aguarda decisão do gerente."
                  },
                  {
                    "value": "approved",
                    "title": "Aprovado",
                    "description": "O gerente autorizou o pedido."
                  },
                  {
                    "value": "rejected",
                    "title": "Rejeitado",
                    "description": "O gerente recusou o pedido."
                  }
                ],
                "title": "Resultado da decisão",
                "description": "Resultado da aprovação do pedido ou indicação de que ela não é necessária.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "decidedAt": {
                "type": "timestamp",
                "of": "Address",
                "title": "Decidido em",
                "description": "Data e hora em que o gerente registrou a aprovação ou a rejeição.",
                "pattern": "^.*$",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "reason": {
                "type": "text",
                "of": "Address",
                "title": "Justificativa da decisão",
                "description": "Justificativa registrada pelo gerente, obrigatória quando o pedido é rejeitado.",
                "pattern": "^.*$",
                "maxLength": 2000,
                "min": 0,
                "max": 0
              }
            }
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "orderNumber"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "draft",
      "reachedBy": "actor"
    },
    {
      "state": "sent",
      "reachedBy": "actor"
    },
    {
      "state": "decided",
      "reachedBy": "actor"
    },
    {
      "state": "partiallyReceived",
      "reachedBy": "actor"
    },
    {
      "state": "received",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "enviarPedidoCompra",
      "from": [
        "draft"
      ],
      "to": "sent",
      "by": [
        "comprador"
      ],
      "description": "Envia o pedido ao fornecedor e registra a necessidade de aprovação conforme o valor total.",
      "ruleRefs": [
        "pedidoCompraItensObrigatorios",
        "pedidoCompraProdutoPertenceFornecedor",
        "pedidoCompraLimiteAprovacao"
      ]
    },
    {
      "transitionId": "decidirPedidoCompra",
      "from": [
        "sent"
      ],
      "to": "decided",
      "by": [
        "gerenteCompras"
      ],
      "description": "Registra a decisão de aprovar ou rejeitar um pedido acima do valor limite.",
      "ruleRefs": [
        "pedidoCompraDecisaoNecessaria",
        "pedidoCompraJustificativaRejeicao"
      ]
    },
    {
      "transitionId": "registrarRecebimentoParcial",
      "from": [
        "sent",
        "decided",
        "partiallyReceived"
      ],
      "to": "partiallyReceived",
      "by": [
        "almoxarife"
      ],
      "description": "Atualiza a situação após um recebimento que ainda não completa todas as quantidades do pedido.",
      "ruleRefs": [
        "pedidoCompraRecebimentoAutorizado",
        "pedidoCompraQuantidadeRecebidaNaoExcede"
      ]
    },
    {
      "transitionId": "registrarRecebimentoTotal",
      "from": [
        "sent",
        "decided",
        "partiallyReceived"
      ],
      "to": "received",
      "by": [
        "almoxarife"
      ],
      "description": "Atualiza a situação quando os recebimentos completam todas as quantidades do pedido.",
      "ruleRefs": [
        "pedidoCompraRecebimentoAutorizado",
        "pedidoCompraQuantidadeRecebidaNaoExcede"
      ]
    }
  ]
} as const satisfies Ns5OntologyEntityV3;

export type ComprasEntityPedidoCompraType = typeof comprasEntityPedidoCompra;

export default comprasEntityPedidoCompra;
