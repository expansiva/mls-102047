/// <mls fileReference="_102047_/l4/comandaRestaurante/ontology/ItemCardapio.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteEntityItemCardapio = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "comandaRestaurante",
  "entityId": "ItemCardapio",
  "title": "Item do cardápio",
  "description": "Produto oferecido no cardápio do restaurante, com o preço vigente específico do módulo.",
  "displayField": "details.identification.name",
  "relationships": {
    "itensComanda": {
      "relationshipId": "itemComandaParaItemCardapio",
      "to": "ItemComanda",
      "via": "ItemComanda.itemCardapioId",
      "cardinality": "1:N",
      "title": "Lançamentos em comanda",
      "description": "Lançamentos de comanda que referenciam este item do cardápio.",
      "mode": "fk",
      "direction": "to",
      "required": "Não obrigatório; um item do cardápio pode ainda não ter sido lançado em nenhuma comanda.",
      "role": "item do cardápio"
    }
  },
  "capabilities": {
    "read.byId": "Consulta um item do cardápio pelo identificador mestre, por leitura direta no MDM, para o garçom conferir o item e seu preço vigente antes do lançamento.",
    "locate.byName": "Localiza itens do cardápio pelo nome no índice de produtos, para o garçom encontrar o item escolhido pelo cliente.",
    "register.createOrAttach": "Cria o produto mestre quando ausente ou anexa seu papel de item do cardápio, por deduplicação e atribuição da tag do módulo, para usuários autorizados que mantêm o cardápio.",
    "edit.platformFields": "Atualiza os dados de plataforma mantidos deste produto, com atualização do índice de identificação quando aplicável, para usuários autorizados que mantêm o cardápio.",
    "edit.moduleNamespace": "Atualiza exclusivamente o preço vigente em details.comandaRestaurante, pela escrita autorizada no namespace do módulo, para usuários autorizados que mantêm o cardápio.",
    "inactivate": "Inativa ou reativa o registro mestre sem removê-lo, pela mudança de situação no MDM, para usuários autorizados retirarem ou devolverem um item ao uso.",
    "listLinks": "Lista os lançamentos de comanda relacionados a este item, pela consulta dos vínculos disponíveis, para usuários autorizados verificarem onde ele foi utilizado.",
    "audit": "Consulta quem alterou os dados do item e quando, pelo log de auditoria do MDM, para usuários autorizados acompanharem a manutenção do cardápio."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace"
  ],
  "writer": "crud",
  "kind": "role",
  "subtype": "Product",
  "roleTag": "comandaRestaurante.ItemCardapio",
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
        "description": "Documento mestre do produto utilizado como item do cardápio neste módulo.",
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
                    "value": "Product",
                    "title": "Produto",
                    "description": "Produto do catálogo mestre."
                  }
                ],
                "description": "Indica que este registro mestre é um produto usado como item do cardápio.",
                "title": "Subtipo",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 0,
                "description": "Nome pelo qual o garçom reconhece e seleciona o item no cardápio.",
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
                    "description": "Registro mestre ativo."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo",
                    "description": "Registro mestre inativo."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado",
                    "description": "Registro mestre mesclado a outro."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Registro mestre bloqueado."
                  }
                ],
                "title": "Situação",
                "description": "Situação mestre que determina se o item pode permanecer em uso no cardápio.",
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
                "description": "Código ISO do país aplicável ao registro mestre do produto.",
                "title": "País",
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação do produto mestre exibidos e consultados no cardápio."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados básicos compartilhados do registro mestre do produto; nenhum campo desta camada é usado especificamente pelo cardápio."
          },
          "product": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados próprios do subtipo Produto da plataforma; nenhum campo desta camada é necessário para o lançamento no cardápio."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização, legíveis pelo módulo e definidos no registro central."
          },
          "comandaRestaurante": {
            "type": "object",
            "owner": "module",
            "fields": {
              "precoVigente": {
                "type": "money",
                "required": true,
                "of": "Address",
                "title": "Preço vigente",
                "description": "Preço atualmente praticado para este item no cardápio e consultado antes de seu lançamento em uma comanda.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados específicos deste módulo sobre o produto oferecido no cardápio."
          }
        }
      }
    }
  }
} as const satisfies Ns5OntologyEntityV3;

export type ComandaRestauranteEntityItemCardapioType = typeof comandaRestauranteEntityItemCardapio;

export default comandaRestauranteEntityItemCardapio;
