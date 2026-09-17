/// <mls fileReference="_102047_/l4/compras/ontology/ContatoFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityContatoFornecedor = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "compras",
  "entityId": "ContatoFornecedor",
  "title": "Contato do fornecedor",
  "description": "Canal de contato vinculado a um fornecedor para a comunicação de compras.",
  "displayField": "details.identification.name",
  "relationships": {
    "fornecedor": {
      "relationshipId": "fornecedorHasContact",
      "to": "Fornecedor",
      "via": "HasContact",
      "cardinality": "N:1",
      "title": "Fornecedor vinculado",
      "description": "Fornecedor ao qual este canal de contato está vinculado para a comunicação de compras.",
      "direction": "to",
      "role": "HasContact"
    }
  },
  "capabilities": {
    "read.byId": "Consulta um canal de contato pelo identificador mestre, por leitura direta do registro, para telas de fornecedor e compradores.",
    "locate.byName": "Localiza canais de contato pelo nome, pesquisando o índice de registros ContactChannel, para o comprador selecionar um contato existente.",
    "locate.byContact": "Localiza um canal pelo telefone, e-mail ou identificador informado, consultando os registros de contato, para evitar duplicidade no cadastro do fornecedor.",
    "register.createOrAttach": "Cria ou vincula um canal de contato mestre ao papel de contato de fornecedor, verificando o cadastro existente antes de anexar a função, para o comprador.",
    "edit.platformFields": "Atualiza nome e dados próprios do canal no registro mestre, regravando os índices quando necessário, para o comprador manter a comunicação com o fornecedor.",
    "edit.moduleNamespace": "Atualiza exclusivamente o espaço do módulo compras no registro mestre, pela chave detalhes.compras, para o módulo compras.",
    "inactivate": "Inativa ou reativa um canal de contato no cadastro mestre, alterando sua situação sem removê-lo, para o comprador.",
    "link": "Vincula este canal ao fornecedor por meio do relacionamento HasContact versionado, para o comprador disponibilizar a comunicação de compras.",
    "unlink": "Encerra o vínculo HasContact deste canal com o fornecedor preservando o histórico, para o comprador quando o contato deixar de ser aplicável.",
    "listLinks": "Lista os fornecedores relacionados a este canal com a vigência do vínculo, por consulta de relacionamentos, para o comprador.",
    "audit": "Exibe quem alterou o canal de contato e quando, pela trilha de auditoria mestre, para o gerente de compras ou administrador."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-contact-value-unique-per-type"
  ],
  "kind": "role",
  "subtype": "ContactChannel",
  "roleTag": "compras.ContatoFornecedor",
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
        "description": "Documento mestre do canal de contato utilizado na comunicação com fornecedores.",
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
                    "value": "ContactChannel",
                    "title": "Canal de contato",
                    "description": "Canal de contato mestre."
                  }
                ],
                "description": "Indica que este registro mestre é um canal de contato.",
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
                "description": "Nome pelo qual o canal de contato é reconhecido nas compras.",
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
                    "description": "Canal disponível para uso."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo",
                    "description": "Canal fora de uso."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado",
                    "description": "Canal incorporado a outro registro."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Canal bloqueado pela organização."
                  }
                ],
                "title": "Situação",
                "description": "Situação do canal de contato no cadastro mestre.",
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
                "description": "Código ISO do país aplicável ao canal de contato do fornecedor.",
                "title": "País",
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação do canal de contato no cadastro mestre."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados básicos compartilhados do registro mestre."
          },
          "contactChannel": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "contactType": {
                "type": "enum",
                "required": true,
                "values": [
                  {
                    "value": "Phone",
                    "title": "Telefone",
                    "description": "Telefone para contato."
                  },
                  {
                    "value": "Email",
                    "title": "E-mail",
                    "description": "E-mail para contato."
                  },
                  {
                    "value": "WhatsApp",
                    "title": "WhatsApp",
                    "description": "WhatsApp para contato."
                  },
                  {
                    "value": "Instagram",
                    "title": "Instagram",
                    "description": "Perfil do Instagram."
                  },
                  {
                    "value": "LinkedIn",
                    "title": "LinkedIn",
                    "description": "Perfil do LinkedIn."
                  },
                  {
                    "value": "X",
                    "title": "X",
                    "description": "Perfil na rede X."
                  },
                  {
                    "value": "Other",
                    "title": "Outro",
                    "description": "Outro meio de contato."
                  }
                ],
                "title": "Tipo de contato",
                "description": "Tipo do canal usado para comunicação de compras com o fornecedor.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "value": {
                "type": "string",
                "required": true,
                "description": "Valor do canal de contato do fornecedor, como número, endereço ou identificador.",
                "title": "Contato",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "isVerified": {
                "type": "boolean",
                "required": true,
                "title": "Verificado",
                "description": "Indica se o canal de contato foi verificado.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "verifiedAt": {
                "type": "timestamp",
                "title": "Verificado em",
                "description": "Data e hora da verificação do canal de contato.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Meio de comunicação que pode ser vinculado a um fornecedor."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização e compartilhados entre módulos."
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

export type ComprasEntityContatoFornecedorType = typeof comprasEntityContatoFornecedor;

export default comprasEntityContatoFornecedor;
