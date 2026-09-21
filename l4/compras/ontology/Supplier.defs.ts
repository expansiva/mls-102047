/// <mls fileReference="_102047_/l4/compras/ontology/Supplier.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntitySupplier = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "Supplier",
  "title": "Fornecedor",
  "description": "Empresa fornecedora cadastrada ou vinculada ao cadastro mestre, identificada pelo CNPJ e utilizada nos pedidos de compra.",
  "displayField": "details.identification.name",
  "relationships": {
    "supplierContacts": {
      "relationshipId": "supplierHasContact",
      "to": "SupplierContact",
      "via": "HasContact",
      "cardinality": "1:N",
      "title": "Contatos do fornecedor",
      "description": "Canais de contato mestre vinculados ao fornecedor para a comunicação comercial.",
      "required": "ao cadastrar ou vincular o fornecedor",
      "role": "HasContact"
    },
    "supplierProducts": {
      "relationshipId": "supplierProductSupplier",
      "to": "SupplierProduct",
      "via": "SupplierProduct.supplierId",
      "cardinality": "1:N",
      "title": "Produtos fornecidos",
      "description": "Registros do catálogo comercial que definem os produtos e os preços combinados deste fornecedor.",
      "mode": "fk",
      "direction": "to",
      "required": "quando houver produto cadastrado no catálogo do fornecedor",
      "role": "fornecedor"
    },
    "catalogProducts": {
      "relationshipId": "supplierCatalogProducts",
      "to": "Product",
      "via": "SupplierProduct",
      "cardinality": "N:N",
      "title": "Catálogo de produtos",
      "description": "Produtos fornecidos pela empresa, obtidos por meio dos registros de produto do fornecedor e seus preços combinados.",
      "mode": "throughTable",
      "path": "SupplierProduct.supplierId -> SupplierProduct.productId",
      "derived": true,
      "required": "quando o fornecedor possuir catálogo comercial",
      "role": "fornecedor"
    },
    "purchaseOrders": {
      "relationshipId": "purchaseOrderSupplier",
      "to": "PurchaseOrder",
      "via": "PurchaseOrder.supplierId",
      "cardinality": "1:N",
      "title": "Pedidos de compra",
      "description": "Pedidos de compra destinados a este fornecedor.",
      "mode": "fk",
      "direction": "to",
      "required": "quando houver pedido de compra destinado ao fornecedor",
      "role": "fornecedor"
    }
  },
  "capabilities": {
    "read.byId": "Lê o fornecedor pelo identificador mestre para exibi-lo nos pedidos e no catálogo comercial; usado por comprador e gerente de compras.",
    "locate.byName": "Localiza empresas fornecedoras pelo nome para selecionar um fornecedor já cadastrado; usado pelo comprador.",
    "locate.byDocument": "Localiza o fornecedor pelo CNPJ para reutilizar o cadastro mestre e evitar duplicidade; usado pelo comprador.",
    "locate.byContact": "Localiza o fornecedor por um canal de contato mestre quando necessário para comunicação comercial; usado pelo comprador.",
    "register.createOrAttach": "Cria a empresa quando o CNPJ não existe ou anexa o papel de fornecedor quando ela já existe, gravando os dados permitidos do módulo; usado pelo comprador.",
    "edit.platformFields": "Atualiza os dados mestre permitidos, como razão social e CNPJ, no cadastro do fornecedor; usado pelo comprador.",
    "inactivate": "Inativa o fornecedor no cadastro mestre sem apagar seu histórico de compras; usado pelo comprador.",
    "link.contact": "Vincula um canal de contato mestre ao fornecedor por HasContact para comunicação comercial; usado pelo comprador.",
    "listLinks": "Lista contatos, produtos do catálogo e pedidos relacionados ao fornecedor; usado pelo comprador e gerente de compras.",
    "audit": "Consulta as alterações auditadas do cadastro mestre do fornecedor; usado pelo gerente de compras."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-company-legal-name-required"
  ],
  "kind": "role",
  "subtype": "Company",
  "roleTag": "compras.Supplier",
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
        "description": "Documento mestre da empresa fornecedora utilizado pelo módulo de compras.",
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
                    "value": "Company",
                    "title": "Empresa",
                    "description": "Empresa no cadastro mestre."
                  }
                ],
                "description": "Subtipo mestre que identifica este registro como empresa.",
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
                "description": "Nome pelo qual o fornecedor é reconhecido nas buscas e nos pedidos de compra.",
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
                    "description": "Fornecedor disponível para uso."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo",
                    "description": "Fornecedor inativado e indisponível para novos usos."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado",
                    "description": "Registro incorporado a outro cadastro mestre."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Registro bloqueado pela organização."
                  }
                ],
                "title": "Situação",
                "description": "Situação mestre do fornecedor para uso no módulo de compras.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "CNPJ",
                    "title": "CNPJ",
                    "description": "Cadastro Nacional da Pessoa Jurídica."
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo de documento nacional usado para identificar o fornecedor brasileiro.",
                "required": true,
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do CNPJ que identifica e evita duplicidade do fornecedor.",
                "title": "CNPJ",
                "required": true,
                "pattern": "^\\d{14}$",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^BR$",
                "maxLength": 0,
                "default": "US",
                "description": "Código do Brasil, país cujas regras documentais se aplicam ao CNPJ.",
                "title": "País",
                "min": 0,
                "max": 0
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Marcadores derivados, incluindo o papel de fornecedor do módulo de compras.",
                "title": "Marcadores",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação mestre da empresa fornecedora."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "contacts": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "ContactSummary",
                "derived": true,
                "description": "Resumo derivado dos canais de contato mestre vinculados ao fornecedor.",
                "title": "Contatos",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Referências compactas derivadas dos relacionamentos ativos do fornecedor.",
                "title": "Referências de relacionamentos",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados básicos mestre utilizados para comunicar-se e relacionar-se com o fornecedor."
          },
          "company": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "companyKind": {
                "type": "enum",
                "required": true,
                "values": [
                  {
                    "value": "LegalEntity",
                    "title": "Pessoa jurídica",
                    "description": "Empresa juridicamente constituída."
                  }
                ],
                "description": "Classifica o fornecedor como uma entidade jurídica.",
                "title": "Natureza da empresa",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "legalName": {
                "type": "string",
                "required": true,
                "description": "Nome empresarial oficial do fornecedor informado no cadastro e usado nas compras.",
                "title": "Razão social",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados legais mestre da empresa fornecedora."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização, somente para leitura pelo módulo de compras."
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

export type ComprasEntitySupplierType = typeof comprasEntitySupplier;

export default comprasEntitySupplier;
