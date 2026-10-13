/// <mls fileReference="_102047_/l4/compras/ontology/Fornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasEntityFornecedor = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "Fornecedor",
  "title": "Fornecedor",
  "description": "Empresa (CNPJ, razão social) da qual a organização compra; papel do módulo compras sobre o cadastro mestre de empresas.",
  "displayField": "details.identification.name",
  "relationships": {
    "contatos": {
      "relationshipId": "fornecedorContato",
      "to": "ContatoFornecedor",
      "via": "HasContact",
      "cardinality": "1:N",
      "title": "Contatos do fornecedor",
      "description": "Canais de contato (telefone, e-mail) do fornecedor, vínculo HasContact."
    },
    "produtosFornecidos": {
      "relationshipId": "fornecedorFornecePoduto",
      "to": "Produto",
      "via": "SuppliesProduct",
      "cardinality": "N:N",
      "title": "Produtos que fornece",
      "description": "O fornecedor fornece o produto, registrado no cadastro mestre (SuppliesProduct)."
    },
    "precosCombinados": {
      "relationshipId": "produtoFornecidoFornecedor",
      "to": "ProdutoFornecido",
      "via": "ProdutoFornecido.fornecedorId",
      "cardinality": "1:N",
      "title": "Produtos com preço combinado",
      "description": "Produtos fornecidos por este fornecedor com o preço combinado.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "pedidos": {
      "relationshipId": "pedidoFornecedor",
      "to": "PedidoCompra",
      "via": "PedidoCompra.fornecedorId",
      "cardinality": "1:N",
      "title": "Pedidos de compra",
      "description": "Pedidos de compra feitos a este fornecedor.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "painel": {
      "relationshipId": "fornecedorPedidosPainel",
      "to": "PainelCompras",
      "via": "PedidoCompra",
      "cardinality": "N:N",
      "title": "Total comprado no mês",
      "description": "Total comprado no mês por fornecedor, apurado pelos pedidos de compra.",
      "mode": "throughTable",
      "path": "PainelCompras -> PedidoCompra.fornecedorId -> Fornecedor",
      "derived": true,
      "direction": "to"
    }
  },
  "capabilities": {
    "read.byId": "Lê o fornecedor pelo id para exibir razão social e CNPJ no pedido de compra, no produto fornecido e no painel do gerente de compras.",
    "locate.byName": "O comprador busca o fornecedor pela razão social ou nome ao cadastrar, atualizar preço ou abrir um pedido.",
    "locate.byDocument": "O comprador busca o fornecedor pelo CNPJ antes de cadastrar, para evitar duplicidade.",
    "register.createOrAttach": "O comprador cadastra o fornecedor: a empresa é criada pelo CNPJ quando não existe e recebe o papel compras.Fornecedor.",
    "edit.platformFields": "O comprador corrige razão social, nome fantasia e endereços do fornecedor.",
    "edit.moduleNamespace": "O módulo compras mantém seu espaço próprio sobre o fornecedor, hoje vazio.",
    "inactivate": "O comprador inativa o fornecedor com quem a organização deixou de comprar, e pode reativá-lo.",
    "link.contact": "O comprador registra telefone e e-mail do fornecedor como canais de contato vinculados por HasContact.",
    "link": "O comprador registra no cadastro mestre que o fornecedor fornece um produto (SuppliesProduct).",
    "unlink": "O comprador encerra o vínculo de fornecimento de um produto mantendo o histórico.",
    "listLinks": "A ficha do fornecedor mostra seus contatos e os produtos que fornece.",
    "attach.document": "O comprador anexa contratos e documentos do fornecedor.",
    "comment": "Comprador e gerente de compras deixam observações sobre o fornecedor.",
    "tag": "O comprador marca fornecedores com etiquetas livres, como categoria de compra.",
    "statusHistory.read": "A ficha mostra quando o fornecedor foi inativado ou reativado e por quem.",
    "audit": "Registra quem alterou os dados do fornecedor e quando."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-delete-blocked-by-relationships",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-company-legal-name-required",
    "fornecedorCnpjObrigatorio",
    "fornecedorInativoSemNovoPedido"
  ],
  "kind": "role",
  "subtype": "Company",
  "roleTag": "compras.Fornecedor",
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
        "writePrecondition": true,
        "description": "Bumped by the engine on every write; optimistic concurrency."
      },
      "details": {
        "type": "object",
        "required": true,
        "description": "Documento mestre da empresa da qual a organização compra, visto pelo módulo compras.",
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
                    "title": "Empresa"
                  }
                ],
                "description": "Sempre empresa: o fornecedor é um papel sobre o cadastro mestre de empresas.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Nome pelo qual o comprador reconhece o fornecedor nas buscas e no pedido de compra.",
                "title": "Nome do fornecedor"
              },
              "status": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  {
                    "value": "Active",
                    "title": "Ativo"
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo"
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado"
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado"
                  }
                ],
                "title": "Situação no cadastro",
                "description": "Situação do registro mestre; um fornecedor inativo não recebe novos pedidos de compra."
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "CNPJ",
                    "title": "CNPJ"
                  }
                ],
                "title": "Tipo de documento",
                "description": "Os fornecedores são identificados pelo CNPJ.",
                "required": true
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do CNPJ do fornecedor, usado pelo comprador para localizar e evitar cadastro duplicado.",
                "title": "CNPJ",
                "required": true,
                "pattern": "^\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}-?\\d{2}$"
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País do documento do fornecedor (BR para CNPJ).",
                "title": "País"
              }
            },
            "description": "Colunas de índice da plataforma usadas para localizar o fornecedor e evitar duplicidade."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "aliases": {
                "type": "string",
                "required": true,
                "collection": true,
                "description": "Nome fantasia e outros nomes pelos quais o fornecedor é conhecido, consultados na busca.",
                "title": "Outros nomes"
              },
              "addresses": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "Address",
                "title": "Endereços",
                "description": "Endereços do fornecedor, como sede e local de expedição das mercadorias."
              },
              "contacts": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "ContactSummary",
                "derived": true,
                "description": "Resumo dos canais de contato (telefone, e-mail) vinculados ao fornecedor; mantidos como registros próprios.",
                "title": "Contatos"
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas dos vínculos do fornecedor, como contatos e produtos fornecidos, recalculadas pela plataforma.",
                "title": "Vínculos"
              },
              "notes": {
                "type": "string",
                "maxLength": 1000,
                "title": "Observações",
                "description": "Observações gerais sobre o fornecedor."
              }
            },
            "description": "Dados comuns a todo registro mestre que o módulo compras lê."
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
                    "title": "Pessoa jurídica"
                  },
                  {
                    "value": "Branch",
                    "title": "Filial"
                  }
                ],
                "description": "Fornecedor é sempre uma pessoa jurídica (ou filial dela).",
                "title": "Natureza"
              },
              "legalName": {
                "type": "string",
                "required": true,
                "description": "Razão social registrada do fornecedor, que aparece no pedido de compra.",
                "title": "Razão social"
              },
              "tradeName": {
                "type": "string",
                "description": "Nome comercial do fornecedor.",
                "title": "Nome fantasia"
              }
            },
            "description": "Dados de pessoa jurídica do fornecedor."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o módulo compras apenas lê."
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
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type ComprasEntityFornecedorType = typeof comprasEntityFornecedor;

export default comprasEntityFornecedor;
