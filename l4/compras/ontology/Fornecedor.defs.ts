/// <mls fileReference="_102047_/l4/compras/ontology/Fornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityFornecedor = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "compras",
  "entityId": "Fornecedor",
  "title": "Fornecedor",
  "description": "Empresa fornecedora cadastrada ou vinculada para atender às compras da organização.",
  "displayField": "details.identification.name",
  "relationships": {
    "contatosFornecedor": {
      "relationshipId": "fornecedorHasContact",
      "to": "ContatoFornecedor",
      "via": "HasContact",
      "cardinality": "1:N",
      "title": "Canais de contato do fornecedor",
      "description": "Canais de contato vinculados ao fornecedor para a comunicação de compras.",
      "required": "Não obrigatório para cadastrar o fornecedor."
    },
    "produtosFornecidos": {
      "relationshipId": "fornecedorSuppliesProduct",
      "to": "Produto",
      "via": "SuppliesProduct",
      "cardinality": "N:N",
      "title": "Produtos fornecidos",
      "description": "Produtos que o fornecedor pode fornecer; as condições comerciais são registradas em ProdutoFornecedor.",
      "required": "Não obrigatório para cadastrar o fornecedor."
    },
    "condicoesComerciais": {
      "relationshipId": "produtoFornecedorFornecedor",
      "to": "ProdutoFornecedor",
      "via": "ProdutoFornecedor.fornecedorId",
      "cardinality": "1:N",
      "title": "Condições comerciais do fornecedor",
      "description": "Condições de produto e preço combinado pertencentes ao fornecedor.",
      "mode": "fk",
      "direction": "to",
      "required": "Obrigatório em cada condição comercial de produto fornecido."
    },
    "pedidosDeCompra": {
      "relationshipId": "pedidoCompraFornecedor",
      "to": "PedidoCompra",
      "via": "PedidoCompra.fornecedorId",
      "cardinality": "1:N",
      "title": "Pedidos de compra do fornecedor",
      "description": "Pedidos de compra abertos para este fornecedor.",
      "mode": "fk",
      "direction": "to",
      "required": "Obrigatório em cada pedido de compra."
    }
  },
  "capabilities": {
    "read.byId": "Lê o fornecedor pelo identificador mestre, por consulta direta ao MDM, para telas e pedidos que já possuem sua referência.",
    "locate.byName": "Localiza fornecedores pelo nome informado, na busca do índice mestre, para o comprador selecionar o fornecedor do pedido.",
    "locate.byDocument": "Localiza o fornecedor pelo CNPJ, na verificação documental do MDM, para o comprador evitar cadastros duplicados.",
    "register.createOrAttach": "Cria ou vincula a empresa identificada pelo CNPJ e atribui o papel de Fornecedor, por deduplicação e anexação de papel no MDM, para o comprador cadastrá-la.",
    "edit.platformFields": "Atualiza razão social e demais dados empresariais permitidos da plataforma, no registro mestre, para o comprador manter o fornecedor correto.",
    "inactivate": "Inativa ou reativa o fornecedor no MDM sem removê-lo, para o comprador retirar fornecedores indisponíveis do uso.",
    "link": "Cria vínculos versionados de contato e de produtos fornecidos no MDM, para o comprador relacionar o fornecedor aos seus canais e produtos.",
    "link.contact": "Vincula um canal de contato ao fornecedor por um relacionamento HasContact, para o comprador registrar o contato de compras sem duplicá-lo no cadastro da empresa.",
    "listLinks": "Lista contatos, produtos e demais vínculos ativos do fornecedor, por consulta de relacionamentos, para o comprador consultar seus dados de compra.",
    "statusHistory.read": "Exibe o histórico de situação do cadastro mestre, para o comprador verificar ativações e inativações do fornecedor.",
    "audit": "Consulta a auditoria das alterações do fornecedor no MDM, para responsáveis autorizados rastrearem sua manutenção."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-company-legal-name-required"
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
        "description": "Bumped by the engine on every write; optimistic concurrency."
      },
      "details": {
        "type": "object",
        "required": true,
        "description": "Documento mestre da empresa fornecedora, com dados da plataforma e o espaço próprio do módulo de compras.",
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
                    "description": "Empresa cadastrada no MDM."
                  }
                ],
                "description": "Subtipo de registro mestre; identifica o fornecedor como uma empresa.",
                "title": "Tipo de cadastro",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 0,
                "description": "Nome pelo qual o fornecedor é localizado pelo comprador.",
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
                    "description": "Fornecedor temporariamente fora de uso."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado",
                    "description": "Registro incorporado a outro registro mestre."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Registro bloqueado pela plataforma."
                  }
                ],
                "title": "Situação do cadastro",
                "description": "Situação do registro mestre do fornecedor, controlada pela plataforma.",
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
                "description": "Tipo do documento nacional usado para identificar e deduplicar o fornecedor.",
                "required": true,
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do CNPJ que identifica o fornecedor.",
                "title": "CNPJ",
                "required": true,
                "pattern": "^\\d{14}$",
                "maxLength": 14,
                "min": 0,
                "max": 0
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^BR$",
                "maxLength": 2,
                "default": "US",
                "description": "Código do país do CNPJ e das regras aplicáveis ao fornecedor.",
                "title": "País",
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação da empresa usados para reconhecê-la e localizá-la nas compras."
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
                "description": "Resumo derivado dos canais de contato vinculados ao fornecedor.",
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
            "description": "Dados básicos da plataforma lidos para comunicar-se e consultar os vínculos do fornecedor."
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
                    "description": "Empresa legalmente constituída."
                  }
                ],
                "description": "Classifica o fornecedor como pessoa jurídica.",
                "title": "Natureza da empresa",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "legalName": {
                "type": "string",
                "required": true,
                "description": "Nome empresarial oficial do fornecedor.",
                "title": "Razão social",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados oficiais da empresa fornecedora."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização, apenas para leitura pelo módulo de compras."
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

export type ComprasEntityFornecedorType = typeof comprasEntityFornecedor;

export default comprasEntityFornecedor;
