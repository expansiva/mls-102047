/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Comanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts"
  ],
  "data": {
    "entityId": "Comanda",
    "storageTarget": "moduleDatabase",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "number",
        "type": "integer"
      },
      {
        "name": "mesaId",
        "type": "record",
        "ref": "Mesa"
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.discountAmount",
        "type": "money"
      },
      {
        "name": "details.paymentMethod",
        "type": "enum"
      },
      {
        "name": "details.subtotal",
        "type": "money",
        "derived": true
      },
      {
        "name": "details.totalComanda",
        "type": "money",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
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
          "transitionId": "fecharComanda",
          "from": [
            "open"
          ],
          "to": "closed",
          "by": [
            "caixa"
          ],
          "ruleRefs": [
            "pagamentoObrigatorioNoFechamento",
            "descontoNaoExcedeSubtotal",
            "fechamentoLiberaMesa"
          ]
        }
      ]
    },
    "invariants": [
      "mesaDisponivelParaAbrirComanda",
      "umaComandaAbertaPorMesa",
      "itensSomenteEmComandaAberta",
      "pagamentoObrigatorioNoFechamento",
      "descontoNaoExcedeSubtotal",
      "fechamentoLiberaMesa"
    ],
    "imports": []
  }
} as const;

export default definition;
