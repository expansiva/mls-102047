/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/Cliente.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosEntityCliente = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "locacaoEquipamentos",
  "entityId": "Cliente",
  "title": "Cliente",
  "description": "Pessoa cliente para a qual a locação de equipamentos é contratada.",
  "displayField": "details.identification.name",
  "relationships": {
    "contratoLocacaoCliente": {
      "relationshipId": "contratoLocacaoCliente",
      "to": "ContratoLocacao",
      "via": "ContratoLocacao.clienteId",
      "cardinality": "1:N",
      "title": "Contratos de locação do cliente",
      "description": "Contratos de locação celebrados para este cliente.",
      "mode": "fk",
      "direction": "to",
      "required": true,
      "role": "cliente"
    }
  },
  "capabilities": {
    "read.byId": "Lê o cadastro mestre de um cliente pelo identificador já conhecido, hidratando seu nome nos contratos, para atendentes e gerentes.",
    "locate.byName": "Localiza clientes pelo nome digitado no índice de pessoas, para o atendente selecionar o cliente ao criar um contrato.",
    "locate.byDocument": "Localiza o cliente pelo documento nacional antes do cadastro, para o atendente evitar duplicidade de pessoa.",
    "register.createOrAttach": "Cria o registro mestre quando não existir ou anexa a função de cliente ao registro já localizado por documento, para o atendente contratar a locação para a pessoa correta.",
    "edit.platformFields": "Atualiza os dados de identificação de plataforma do cliente e reindexa a identificação quando necessário, para o atendente manter o cadastro correto.",
    "inactivate": "Inativa ou reativa o cadastro mestre sem apagá-lo, para o atendente impedir ou restabelecer seu uso em novas locações."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-person-privacy-consent-required-br-eu"
  ],
  "kind": "role",
  "subtype": "Person",
  "roleTag": "locacaoEquipamentos.Cliente",
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
        "description": "Registro mestre da pessoa cliente, com dados de identificação da plataforma e o espaço exclusivo deste módulo.",
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
                    "description": "Pessoa física cadastrada como cliente."
                  }
                ],
                "description": "Indica que este registro mestre representa uma pessoa cliente.",
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
                "description": "Nome pelo qual o cliente é identificado nos contratos de locação.",
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
                    "description": "Cadastro disponível para uso."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo",
                    "description": "Cadastro fora de uso."
                  },
                  {
                    "value": "Merged",
                    "title": "Unificado",
                    "description": "Cadastro incorporado a outro registro mestre."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Cadastro bloqueado pela plataforma."
                  }
                ],
                "title": "Situação do cadastro",
                "description": "Situação de atividade do registro mestre do cliente.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "SSN",
                    "title": "SSN",
                    "description": "Número de seguridade social dos Estados Unidos."
                  },
                  {
                    "value": "EIN",
                    "title": "EIN",
                    "description": "Identificador fiscal empresarial dos Estados Unidos."
                  },
                  {
                    "value": "Passport",
                    "title": "Passaporte",
                    "description": "Documento de viagem internacional."
                  },
                  {
                    "value": "DriversLicense",
                    "title": "Carteira de motorista",
                    "description": "Documento de habilitação."
                  },
                  {
                    "value": "NationalId",
                    "title": "Documento nacional",
                    "description": "Documento nacional de identificação."
                  },
                  {
                    "value": "CPF",
                    "title": "CPF",
                    "description": "Cadastro de Pessoas Físicas."
                  },
                  {
                    "value": "CNPJ",
                    "title": "CNPJ",
                    "description": "Cadastro Nacional da Pessoa Jurídica."
                  },
                  {
                    "value": "VAT",
                    "title": "Identificação fiscal",
                    "description": "Número de identificação para imposto sobre valor agregado."
                  },
                  {
                    "value": "Other",
                    "title": "Outro",
                    "description": "Outro documento aceito pela plataforma."
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento nacional apresentado para identificar e deduplicar o cliente.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do documento apresentado para identificar e deduplicar o cliente.",
                "title": "Número do documento",
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
                "description": "Código do país aplicável ao documento e às regras legais do cliente.",
                "title": "País",
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação usados para localizar e reconhecer o cliente na locadora."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados básicos da plataforma que esta função de cliente não precisa declarar."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "privacyConsent": {
                "type": "object",
                "of": "PrivacyConsent",
                "description": "Consentimento de privacidade do cliente, quando exigido pela legislação aplicável.",
                "title": "Consentimento de privacidade",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados pessoais de plataforma necessários para observar o consentimento aplicável ao cliente."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização para uso entre módulos, somente para leitura neste módulo."
          },
          "locacaoEquipamentos": {
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

export type LocacaoEquipamentosEntityClienteType = typeof locacaoEquipamentosEntityCliente;

export default locacaoEquipamentosEntityCliente;
