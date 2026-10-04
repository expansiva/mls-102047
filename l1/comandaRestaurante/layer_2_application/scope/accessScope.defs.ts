/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "caixaFechamentoEcadastroOperacional",
        "actorRef": "caixa",
        "entityRefs": [
          "Mesa",
          "ItemCardapio",
          "Comanda",
          "ItemComanda"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Mesa",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "ItemCardapio",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "Comanda",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "ItemComanda",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "garcomAtendimentoComandas",
        "actorRef": "garcom",
        "entityRefs": [
          "Mesa",
          "ItemCardapio",
          "Comanda",
          "ItemComanda"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Mesa.code",
          "Mesa.details.disponivel",
          "ItemCardapio.name",
          "ItemCardapio.details.precoVigente",
          "Comanda.number",
          "Comanda.mesaId",
          "Comanda.status",
          "Comanda.details.subtotal",
          "ItemComanda.comandaId",
          "ItemComanda.itemCardapioId",
          "ItemComanda.status",
          "ItemComanda.details"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Mesa",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "ItemCardapio",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "Comanda",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "ItemComanda",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      }
    ]
  }
} as const;

export default definition;
