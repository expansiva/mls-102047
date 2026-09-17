/// <mls fileReference="_102047_/l4/financeiro/ontology/Pagador.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const financeiroEntityPagador = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "financeiro",
  "entityId": "Pagador",
  "title": "Pagador",
  "description": "Pessoa responsável pelos títulos a receber e que acessa o portal para consultar e pagar os próprios débitos.",
  "displayField": "details.identification.name",
  "relationships": {
    "tituloPagador": {
      "relationshipId": "tituloPagador",
      "to": "TituloReceber",
      "via": "TituloReceber.pagadorId",
      "cardinality": "1:N",
      "title": "Títulos do pagador",
      "description": "Títulos a receber pertencentes a este pagador.",
      "mode": "fk",
      "direction": "to",
      "required": "Sempre, para cada título a receber."
    },
    "recebimentoPagador": {
      "relationshipId": "recebimentoPagador",
      "to": "Recebimento",
      "via": "TituloReceber",
      "cardinality": "1:N",
      "title": "Recebimentos do pagador",
      "description": "Recebimentos atribuídos ao pagador por meio dos títulos a receber aos quais estão vinculados.",
      "mode": "throughTable",
      "path": "Recebimento.tituloId -> TituloReceber.pagadorId",
      "derived": true,
      "direction": "to",
      "required": "Sempre, quando o recebimento estiver vinculado a um título deste pagador."
    }
  },
  "capabilities": {
    "read.byId": "Lê um pagador pelo identificador mestre para exibir seu nome e dados permitidos no título, recebimento ou extrato; usado pelo caixa e pelo gerente financeiro.",
    "locate.byName": "Localiza pagadores pelo nome no cadastro mestre para que o gerente financeiro selecione o pagador do extrato; usado pelo gerente financeiro.",
    "locate.byDocument": "Localiza um pagador pelo documento nacional para deduplicar e associar cobranças recebidas de outros módulos; usado por integrações e profissionais autorizados.",
    "register.createOrAttach": "Cria ou associa ao papel de pagador a pessoa já existente no MDM ao receber uma cobrança de outro módulo; usado pelas integrações de origem da cobrança.",
    "edit.platformFields": "Atualiza os dados de identificação e privacidade pertencentes à plataforma no cadastro do pagador; usado por profissionais autorizados da organização.",
    "inactivate": "Inativa ou reativa o papel de pagador sem apagar o registro mestre e preservando seus títulos e recebimentos; usado pelo gerente financeiro.",
    "listLinks": "Lista os vínculos e referências relacionadas ao pagador para consulta contextual de seu cadastro; usado pelo gerente financeiro.",
    "statusHistory.read": "Consulta o histórico de mudanças de situação do cadastro mestre do pagador; usado pelo gerente financeiro.",
    "audit": "Consulta as alterações auditadas no cadastro de pagador para rastreabilidade; usado pelo gerente financeiro.",
    "invite.login": "Concede convite de acesso para que o pagador entre no portal e consulte somente seus títulos e recebimentos; usado por profissional autorizado da organização."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-person-ssn-unique-for-us",
    "rule-person-privacy-consent-required-br-eu"
  ],
  "writer": "inbound",
  "kind": "role",
  "subtype": "Person",
  "roleTag": "financeiro.Pagador",
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
        "description": "Documento mestre da pessoa responsável pelos títulos a receber no módulo financeiro.",
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
                    "description": "Pessoa física no cadastro mestre."
                  }
                ],
                "description": "Indica que este registro mestre é uma pessoa que atua como pagador.",
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
                "description": "Nome pelo qual o pagador é identificado nos títulos, recebimentos e extratos.",
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
                    "title": "Mesclado",
                    "description": "Cadastro incorporado a outro registro mestre."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Cadastro bloqueado pela plataforma."
                  }
                ],
                "title": "Situação do cadastro",
                "description": "Situação mestre do pagador, mantida pela plataforma.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "CPF",
                    "title": "CPF",
                    "description": "Cadastro de Pessoas Físicas."
                  },
                  {
                    "value": "Passport",
                    "title": "Passaporte",
                    "description": "Documento de viagem da pessoa."
                  },
                  {
                    "value": "NationalId",
                    "title": "Documento nacional",
                    "description": "Documento nacional de identificação."
                  },
                  {
                    "value": "Other",
                    "title": "Outro",
                    "description": "Outro documento aceito pela organização."
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento nacional usado para deduplicar o pagador quando informado.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do documento nacional do pagador, quando informado.",
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
                "maxLength": 2,
                "default": "US",
                "description": "Código ISO do país aplicável ao documento e às regras legais do pagador.",
                "title": "País",
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação da pessoa usados para reconhecer e localizar o pagador."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Campos base da plataforma aplicáveis à pessoa; nenhum dado base adicional é usado pelo contas a receber."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "privacyConsent": {
                "type": "object",
                "of": "PrivacyConsent",
                "description": "Consentimento de privacidade da pessoa, quando exigido pela legislação aplicável.",
                "title": "Consentimento de privacidade",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados próprios da pessoa necessários para o tratamento legal do cadastro de pagador."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização para uso compartilhado entre módulos; o financeiro apenas os lê."
          },
          "financeiro": {
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

export type FinanceiroEntityPagadorType = typeof financeiroEntityPagador;

export default financeiroEntityPagador;
