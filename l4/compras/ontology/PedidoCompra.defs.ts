/// <mls fileReference="_102047_/l4/compras/ontology/PedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasEntityPedidoCompra = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "PedidoCompra",
  "title": "Pedido de compra",
  "description": "Pedido aberto pelo comprador para um fornecedor, enviado, aprovado ou rejeitado pelo gerente quando acima do limite, e recebido total ou parcialmente.",
  "displayField": "numero",
  "relationships": {
    "fornecedor": {
      "relationshipId": "pedidoFornecedor",
      "to": "Fornecedor",
      "via": "PedidoCompra.fornecedorId",
      "cardinality": "N:1",
      "title": "Fornecedor do pedido",
      "description": "Fornecedor para o qual o pedido de compra é feito.",
      "mode": "fk",
      "required": true
    },
    "comprador": {
      "relationshipId": "pedidoComprador",
      "to": "Comprador",
      "via": "PedidoCompra.compradorId",
      "cardinality": "N:1",
      "title": "Comprador do pedido",
      "description": "Comprador que abriu o pedido.",
      "mode": "fk",
      "required": true
    },
    "itens": {
      "relationshipId": "itemPedidoPedido",
      "to": "ItemPedido",
      "via": "ItemPedido.pedidoCompraId",
      "cardinality": "1:N",
      "title": "Itens do pedido",
      "description": "Produtos, quantidades e preços do pedido.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "recebimentos": {
      "relationshipId": "recebimentoPedido",
      "to": "Recebimento",
      "via": "Recebimento.pedidoCompraId",
      "cardinality": "1:N",
      "title": "Recebimentos do pedido",
      "description": "Chegadas totais ou parciais registradas pelo almoxarife.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Abre o pedido pelo id para o comprador revisar, o gerente analisar e o almoxarife conferir itens e situação.",
    "locate.byColumn": "Lista pedidos por situação, fornecedor, comprador, data de abertura ou entrega prevista: pendentes de aprovação para o gerente, aprovados para o almoxarife, em aberto e atrasados no painel.",
    "locate.byText": "Busca o pedido pelo número digitado, usada pelo almoxarife ao localizar o pedido que chegou.",
    "count": "Conta pedidos aguardando aprovação, em aberto e atrasados para os indicadores do gerente de compras.",
    "listByForeignKey": "Lista os pedidos de um fornecedor ou de um comprador na ficha do cadastro.",
    "create": "O comprador abre o pedido em rascunho para o fornecedor escolhido.",
    "update": "O comprador ajusta entrega prevista, condição de pagamento e observações enquanto o pedido está em rascunho.",
    "transition": "Move o pedido: o comprador envia, o gerente aprova ou rejeita acima do limite e o almoxarife marca recebido parcial ou total ao registrar o recebimento.",
    "uniqueKey": "Garante que o número do pedido não se repete.",
    "transaction": "Grava juntos o recebimento, a entrada no estoque e a nova situação do pedido, tudo ou nada.",
    "read.mdmRecord": "Lê razão social, CNPJ e contatos do fornecedor e o nome do comprador para exibir no pedido e nas listas.",
    "sequence.next": "Emite o número do pedido de compra na abertura, pela sequência compras.PedidoCompra.",
    "attach.document": "Anexa ao pedido a proposta do fornecedor ou o pedido assinado, pelo comprador.",
    "comment": "Permite ao comprador, ao gerente e ao almoxarife deixar notas sobre o pedido.",
    "statusHistory.read": "Mostra quando o pedido foi enviado, aprovado, rejeitado e recebido, e por quem.",
    "audit": "Registra quem alterou o pedido e quando, para consulta do administrador."
  },
  "rules": [
    "valorLimiteAprovacao",
    "pedidoExigeItens",
    "rejeicaoExigeMotivo",
    "recebimentoSomenteLiberado",
    "edicaoSomenteRascunho",
    "numeroPedidoUnico"
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
      "numero": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "derived": true,
        "title": "Número do pedido",
        "description": "Número do pedido de compra emitido pela sequência do módulo na abertura; é o número que o comprador, o gerente e o almoxarife citam e pelo qual localizam o pedido."
      },
      "fornecedorId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Fornecedor"
        ],
        "title": "Fornecedor",
        "description": "Fornecedor para o qual o pedido é feito; razão social, CNPJ e contatos são lidos do cadastro mestre."
      },
      "compradorId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Comprador"
        ],
        "title": "Comprador",
        "description": "Comprador que abriu o pedido."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "rascunho",
            "title": "Rascunho",
            "description": "Aberto pelo comprador, ainda recebendo itens."
          },
          {
            "value": "enviado",
            "title": "Enviado",
            "description": "Enviado pelo comprador; abaixo do limite segue ao fornecedor, acima aguarda decisão do gerente."
          },
          {
            "value": "aprovado",
            "title": "Aprovado",
            "description": "Aprovado pelo gerente de compras e liberado ao fornecedor."
          },
          {
            "value": "rejeitado",
            "title": "Rejeitado",
            "description": "Rejeitado pelo gerente de compras, com motivo."
          },
          {
            "value": "recebidoParcial",
            "title": "Recebido parcialmente",
            "description": "Parte dos itens já foi recebida pelo almoxarife."
          },
          {
            "value": "recebido",
            "title": "Recebido",
            "description": "Todos os itens foram recebidos."
          }
        ],
        "title": "Situação",
        "description": "Etapa do pedido no ciclo de compra."
      },
      "dataEmissao": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "derived": true,
        "title": "Data de abertura",
        "description": "Momento em que o pedido foi aberto; ordena as listas e situa o pedido no mês."
      },
      "dataPrevistaEntrega": {
        "type": "date",
        "indexed": true,
        "title": "Entrega prevista",
        "description": "Data combinada com o fornecedor para a chegada do pedido; serve para identificar pedidos atrasados."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados do pedido que não são filtrados.",
        "fields": {
          "observacoes": {
            "type": "text",
            "title": "Observações",
            "description": "Instruções ao fornecedor ou anotações do comprador sobre o pedido.",
            "maxLength": 2000
          },
          "condicaoPagamento": {
            "type": "string",
            "title": "Condição de pagamento",
            "description": "Condição de pagamento combinada com o fornecedor para este pedido.",
            "maxLength": 200
          },
          "dataEnvio": {
            "type": "timestamp",
            "derived": true,
            "title": "Data de envio",
            "description": "Momento em que o comprador enviou o pedido."
          },
          "decisao": {
            "type": "object",
            "title": "Decisão do gerente",
            "description": "Registro da aprovação ou rejeição do pedido acima do valor limite.",
            "fields": {
              "decididoEm": {
                "type": "timestamp",
                "derived": true,
                "title": "Decidido em",
                "description": "Momento da aprovação ou rejeição."
              },
              "motivoRejeicao": {
                "type": "text",
                "title": "Motivo da rejeição",
                "description": "Motivo informado pelo gerente de compras ao rejeitar o pedido.",
                "maxLength": 1000
              }
            }
          },
          "valorTotal": {
            "type": "money",
            "derived": true,
            "title": "Valor total",
            "description": "Soma de quantidade vezes preço de todos os itens do pedido."
          },
          "aguardandoAprovacao": {
            "type": "boolean",
            "derived": true,
            "title": "Aguardando aprovação",
            "description": "Pedido enviado cujo valor total está acima do valor limite e que o gerente de compras ainda não aprovou nem rejeitou."
          },
          "liberadoAoFornecedor": {
            "type": "boolean",
            "derived": true,
            "title": "Liberado ao fornecedor",
            "description": "Pedido aprovado pelo gerente, ou enviado com valor total até o valor limite, e portanto pronto para ser recebido."
          },
          "emAberto": {
            "type": "boolean",
            "derived": true,
            "title": "Em aberto",
            "description": "Pedido enviado, aprovado ou recebido parcialmente, que ainda não chegou por inteiro nem foi rejeitado."
          },
          "atrasado": {
            "type": "boolean",
            "derived": true,
            "title": "Atrasado",
            "description": "Pedido em aberto cuja entrega prevista é anterior a hoje."
          },
          "quantidadePendente": {
            "type": "number",
            "derived": true,
            "title": "Quantidade pendente",
            "description": "Soma das quantidades pedidas nos itens menos o que já foi registrado nos recebimentos deste pedido."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "numero"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "rascunho",
      "reachedBy": "actor"
    },
    {
      "state": "enviado",
      "reachedBy": "actor"
    },
    {
      "state": "aprovado",
      "reachedBy": "actor"
    },
    {
      "state": "rejeitado",
      "reachedBy": "actor"
    },
    {
      "state": "recebidoParcial",
      "reachedBy": "actor"
    },
    {
      "state": "recebido",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "enviar",
      "from": [
        "rascunho"
      ],
      "to": "enviado",
      "by": [
        "comprador"
      ],
      "description": "O comprador envia o pedido; até o valor limite ele segue ao fornecedor, acima aguarda a decisão do gerente de compras.",
      "payload": [
        "dataPrevistaEntrega"
      ],
      "ruleRefs": [
        "pedidoExigeItens",
        "valorLimiteAprovacao"
      ]
    },
    {
      "transitionId": "aprovar",
      "from": [
        "enviado"
      ],
      "to": "aprovado",
      "by": [
        "gerenteCompras"
      ],
      "description": "O gerente de compras aprova o pedido acima do valor limite, liberando-o ao fornecedor.",
      "payload": [],
      "ruleRefs": [
        "valorLimiteAprovacao"
      ]
    },
    {
      "transitionId": "rejeitar",
      "from": [
        "enviado"
      ],
      "to": "rejeitado",
      "by": [
        "gerenteCompras"
      ],
      "description": "O gerente de compras rejeita o pedido acima do valor limite, informando o motivo.",
      "payload": [
        "details.decisao.motivoRejeicao"
      ],
      "ruleRefs": [
        "valorLimiteAprovacao",
        "rejeicaoExigeMotivo"
      ]
    },
    {
      "transitionId": "receberParcial",
      "from": [
        "enviado",
        "aprovado",
        "recebidoParcial"
      ],
      "to": "recebidoParcial",
      "by": [
        "almoxarife"
      ],
      "description": "Ao registrar um recebimento que não completa todos os itens, o pedido fica recebido parcialmente.",
      "payload": [],
      "ruleRefs": [
        "recebimentoSomenteLiberado"
      ]
    },
    {
      "transitionId": "receberTotal",
      "from": [
        "enviado",
        "aprovado",
        "recebidoParcial"
      ],
      "to": "recebido",
      "by": [
        "almoxarife"
      ],
      "description": "Ao registrar o recebimento que completa todos os itens, o pedido fica recebido.",
      "payload": [],
      "ruleRefs": [
        "recebimentoSomenteLiberado"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type ComprasEntityPedidoCompraType = typeof comprasEntityPedidoCompra;

export default comprasEntityPedidoCompra;
