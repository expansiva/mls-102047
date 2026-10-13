/// <mls fileReference="_102047_/l4/compras/ontology/PainelCompras.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasEntityPainelCompras = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "PainelCompras",
  "title": "Painel de compras",
  "description": "Indicadores recalculados: pedidos em aberto, pedidos atrasados e total comprado por fornecedor no mês.",
  "displayField": "mesReferencia",
  "relationships": {
    "fornecedor": {
      "relationshipId": "fornecedorPedidosPainel",
      "to": "Fornecedor",
      "via": "PedidoCompra",
      "cardinality": "N:N",
      "title": "Total comprado por fornecedor",
      "description": "Total comprado no mês agrupado por fornecedor, apurado pelos pedidos de compra.",
      "mode": "throughTable",
      "path": "PainelCompras -> PedidoCompra.fornecedorId -> Fornecedor",
      "derived": true
    }
  },
  "capabilities": {
    "aggregate.byWindow": "Resume os pedidos de compra e seus itens por mês e por fornecedor, contando pedidos em aberto e atrasados e somando o total comprado, por meio de um agregado declarado nas visões do módulo; alimenta o painel do gerente de compras.",
    "read.window": "Lê os indicadores de um mês e, opcionalmente, de um fornecedor, filtrando pelo mês de referência e pelo fornecedor indexados; usado pelo gerente de compras ao abrir o painel.",
    "refresh": "Mantém o painel atualizado à medida que pedidos são enviados, aprovados, rejeitados e recebidos, por política de atualização do agregado executada pela plataforma.",
    "rebuild": "Recalcula todo o painel a partir dos pedidos de compra e recebimentos quando o módulo é publicado ou migrado.",
    "read.mdmRecord": "Lê o registro mestre do fornecedor de cada linha para exibir a razão social no ranking do total comprado no mês; usado pela tela do gerente de compras."
  },
  "rules": [
    "pedidoAtrasadoPrevisaoVencida",
    "totalCompradoConsideraPedidosAprovados",
    "pedidoEmAbertoAteRecebimentoTotal"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_painelcompras",
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
      "mesReferencia": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "derived": true,
        "title": "Mês de referência",
        "description": "Início do mês que esta linha resume, apurado a partir da data de emissão dos pedidos de compra."
      },
      "fornecedorId": {
        "type": "record",
        "indexed": true,
        "derived": true,
        "to": [
          "Fornecedor"
        ],
        "title": "Fornecedor",
        "description": "Fornecedor pelo qual os pedidos de compra do mês são agrupados; vazio na linha que totaliza a organização."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Indicadores",
        "description": "Medidas recalculadas a partir dos pedidos de compra do mês e do fornecedor; ninguém as digita.",
        "fields": {
          "pedidosEmAberto": {
            "type": "integer",
            "required": true,
            "derived": true,
            "title": "Pedidos em aberto",
            "description": "Quantidade de pedidos de compra enviados ou aprovados que ainda não foram recebidos por completo.",
            "min": 0
          },
          "pedidosAtrasados": {
            "type": "integer",
            "required": true,
            "derived": true,
            "title": "Pedidos atrasados",
            "description": "Quantidade de pedidos em aberto cuja data prevista de entrega já passou sem recebimento total.",
            "min": 0
          },
          "quantidadePedidos": {
            "type": "integer",
            "required": true,
            "derived": true,
            "title": "Pedidos no mês",
            "description": "Quantidade de pedidos de compra emitidos no mês para o fornecedor, excluídos os rejeitados e cancelados.",
            "min": 0
          },
          "totalComprado": {
            "type": "money",
            "required": true,
            "derived": true,
            "title": "Total comprado no mês",
            "description": "Soma do valor dos pedidos de compra aprovados ou enviados no mês para o fornecedor (quantidade vezes preço de cada item).",
            "min": 0
          },
          "totalRecebido": {
            "type": "money",
            "required": true,
            "derived": true,
            "title": "Total recebido no mês",
            "description": "Soma do valor dos itens efetivamente recebidos pelo almoxarife no mês para o fornecedor.",
            "min": 0
          }
        },
        "derived": true
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type ComprasEntityPainelComprasType = typeof comprasEntityPainelCompras;

export default comprasEntityPainelCompras;
