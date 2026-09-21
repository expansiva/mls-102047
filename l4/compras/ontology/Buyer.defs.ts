/// <mls fileReference="_102047_/l4/compras/ontology/Buyer.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityBuyer = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "Buyer",
  "title": "Comprador",
  "description": "Pessoa responsável pela criação dos pedidos de compra, usada para aplicar o escopo pessoal aos pedidos que abriu.",
  "displayField": "details.identification.name",
  "relationships": {
    "purchaseOrders": {
      "relationshipId": "purchaseOrderBuyer",
      "to": "PurchaseOrder",
      "via": "PurchaseOrder.buyerId",
      "cardinality": "1:N",
      "title": "Pedidos de compra abertos",
      "description": "Pedidos de compra abertos por este comprador responsável.",
      "mode": "fk",
      "direction": "to",
      "required": "Ao consultar os pedidos de compra abertos pelo comprador.",
      "role": "comprador responsável"
    }
  },
  "capabilities": {
    "read.byId": "Lê o comprador pelo identificador mestre para apresentar o responsável de um pedido de compra; usa leitura direta por mdmId; é usado pelas telas de pedidos e pelos perfis autorizados.",
    "locate.byName": "Localiza compradores pelo nome para manutenção do papel no módulo; pesquisa o índice de pessoas por nome; é usado pelo comprador e pelo gerente de compras autorizados.",
    "locate.byDocument": "Localiza a pessoa compradora pelo documento nacional para evitar duplicidade ao vinculá-la ao módulo; consulta o índice de documento; é usado por quem mantém compradores autorizado.",
    "register.createOrAttach": "Cria ou associa uma pessoa já existente ao papel de comprador; localiza o registro e anexa a etiqueta compras.Buyer; é usado por quem mantém compradores autorizado.",
    "edit.platformFields": "Atualiza os dados de identificação da pessoa compradora mantidos pela plataforma; grava os campos permitidos do registro mestre e atualiza o índice quando necessário; é usado por quem mantém compradores autorizado.",
    "edit.moduleNamespace": "Atualiza exclusivamente o namespace compras do comprador quando houver dado próprio do módulo; grava somente details.compras; é usado pelo módulo de compras autorizado.",
    "inactivate": "Inativa ou reativa o papel de comprador sem apagar a pessoa mestre; altera a situação do registro no MDM; é usado por quem mantém compradores autorizado.",
    "listLinks": "Lista os pedidos de compra relacionados ao comprador; consulta o vínculo indexado entre pedidos e responsável; é usado pelo comprador e pelo gerente de compras.",
    "statusHistory.read": "Exibe o histórico de mudanças de situação do registro mestre do comprador; consulta o histórico de status do MDM; é usado por quem mantém compradores autorizado.",
    "audit": "Mostra quem alterou os dados do comprador e quando; consulta a auditoria do MDM; é usado por administradores autorizados."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-person-privacy-consent-required-br-eu"
  ],
  "writer": "crud",
  "kind": "role",
  "subtype": "Person",
  "roleTag": "compras.Buyer",
  "source": "/_102034_/l4/ontology/mdm.defs.ts",
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "indexed": true,
        "derived": true,
        "description": "mdmId; stable through promotion and merge."
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true,
        "description": "Bumped by the engine on every write; optimistic concurrency."
      },
      "details": {
        "type": "object",
        "required": true,
        "description": "Documento mestre da pessoa que atua como comprador no módulo de compras.",
        "fields": {
          "identification": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "subtype": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  {
                    "value": "Person",
                    "title": "Pessoa",
                    "description": "Pessoa física cadastrada no MDM."
                  }
                ],
                "description": "Indica que este registro mestre é uma pessoa.",
                "title": "Tipo do cadastro",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 0,
                "description": "Nome pelo qual o comprador é identificado ao abrir e consultar pedidos de compra.",
                "title": "Nome",
                "min": 0,
                "max": 0
              },
              "status": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  {
                    "value": "Active",
                    "title": "Ativo",
                    "description": "Registro disponível para uso."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo",
                    "description": "Registro fora de uso."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado",
                    "description": "Registro unido a outro registro mestre."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Registro bloqueado pela plataforma."
                  }
                ],
                "title": "Situação",
                "description": "Situação do registro mestre do comprador.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 0,
                "default": "US",
                "description": "Código do país aplicável ao cadastro mestre do comprador.",
                "title": "País",
                "min": 0,
                "max": 0
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Etiquetas derivadas, incluindo o papel compras.Buyer, que identificam a participação da pessoa no módulo.",
                "title": "Etiquetas",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação da pessoa reconhecida como comprador."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados comuns da plataforma; este papel não utiliza campos base próprios."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados específicos de pessoa física da plataforma; este papel não utiliza campos adicionais."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização, apenas para leitura pelo módulo de compras."
          },
          "compras": {
            "type": "object",
            "owner": "module",
            "fields": {},
            "description": "Module namespace; the prompt asked for no data of this module about the record."
          }
        }
      }
    }
  }
} as const satisfies Ns5OntologyEntityV3;

export type ComprasEntityBuyerType = typeof comprasEntityBuyer;

export default comprasEntityBuyer;
