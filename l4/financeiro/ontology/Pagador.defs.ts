/// <mls fileReference="_102047_/l4/financeiro/ontology/Pagador.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiroEntityPagador = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "financeiro",
  "entityId": "Pagador",
  "title": "Pagador",
  "description": "Pessoa que deve os títulos a receber da organização; acessa o portal para ver e pagar os próprios títulos. Papel do módulo financeiro sobre o registro mestre de pessoa.",
  "displayField": "details.identification.name",
  "relationships": {
    "titulos": {
      "relationshipId": "tituloPagador",
      "to": "TituloReceber",
      "via": "TituloReceber.pagadorId",
      "cardinality": "1:N",
      "title": "Títulos a receber do pagador",
      "description": "Títulos a receber devidos por este pagador, vindos da comanda, da mensalidade ou da ordem de serviço.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "recebimentos": {
      "relationshipId": "pagadorRecebimentos",
      "to": "Recebimento",
      "via": "TituloReceber",
      "cardinality": "1:N",
      "title": "Recebimentos do pagador",
      "description": "Recebimentos e estornos dos títulos do pagador, usados no extrato e no portal.",
      "mode": "throughTable",
      "path": "Pagador <- TituloReceber.pagadorId <- Recebimento.tituloId",
      "derived": true
    }
  },
  "capabilities": {
    "read.byId": "Lê o pagador pelo identificador para exibir seu nome em títulos, recebimentos, no extrato e no portal; usado por caixa, gerente financeiro e pelo próprio pagador.",
    "locate.byName": "Localiza o pagador pelo nome digitado; usado pelo gerente financeiro ao emitir o extrato e pelo caixa ao procurar os títulos de alguém no balcão.",
    "locate.byDocument": "Localiza o pagador pelo CPF ou outro documento; usado pelo gerente financeiro no extrato e pela entrada de títulos para não duplicar a pessoa.",
    "register.createOrAttach": "Ao chegar um título de outro módulo, encontra a pessoa pelo documento, cria-a se não existir e marca o papel financeiro.Pagador; feito pela entrada automática de títulos.",
    "edit.platformFields": "Corrige nome, documento ou endereço do pagador no cadastro mestre quando o extrato revela dado errado; usado pelo gerente financeiro.",
    "edit.moduleNamespace": "Grava o namespace financeiro do pagador, hoje vazio; reservado ao próprio módulo.",
    "inactivate": "Inativa o papel de pagador sem apagar o histórico de títulos e recebimentos, podendo reativá-lo; usado pelo gerente financeiro.",
    "link.contact": "Vincula telefone, WhatsApp ou e-mail ao pagador como canal de contato para cobrança; usado pelo gerente financeiro.",
    "listLinks": "Mostra os vínculos do pagador, como canais de contato e responsáveis, na ficha consultada pelo gerente financeiro.",
    "invite.login": "Dá ao pagador um login para acessar o portal e ver apenas os próprios títulos e recebimentos; acionado pela plataforma ao registrar o pagador.",
    "locate.byLogin": "Resolve o pagador da sessão a partir do e-mail de login, limitando o portal aos próprios títulos e recebimentos; usado pelo resolvedor de sessão.",
    "comment": "Registra observações sobre o pagador, como acordos de pagamento combinados; usado pelo gerente financeiro e pelo caixa.",
    "statusHistory.read": "Mostra quando o pagador foi ativado ou inativado e por quem; consultado pelo gerente financeiro.",
    "audit": "Informa quem alterou o cadastro do pagador e quando, pelo módulo de auditoria da plataforma; consultado pelo gerente financeiro.",
    "financeiro.extratoPagador": "Emite o extrato do pagador no período escolhido, com títulos, recebimentos, estornos e saldo em aberto, lendo os títulos pelo pagador e os recebimentos pelos títulos; usado pelo gerente financeiro."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-delete-blocked-by-relationships",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-person-privacy-consent-required-br-eu",
    "pagadorVeApenasProprios"
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
        "writePrecondition": true,
        "description": "Bumped by the engine on every write; optimistic concurrency."
      },
      "details": {
        "type": "object",
        "required": true,
        "description": "Registro mestre da pessoa que deve títulos a receber da organização, visto pelo módulo financeiro.",
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
                    "title": "Pessoa"
                  }
                ],
                "description": "Sempre pessoa: o pagador é uma pessoa física do cadastro mestre.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Nome pelo qual o caixa e o gerente financeiro reconhecem o pagador; usado para localizá-lo e no cabeçalho do extrato.",
                "title": "Nome do pagador"
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
                "description": "Situação do registro mestre (ativo, inativo, mesclado, bloqueado), mantida pela plataforma."
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  "SSN",
                  "EIN",
                  "Passport",
                  "DriversLicense",
                  "NationalId",
                  "CPF",
                  "CNPJ",
                  "VAT",
                  "Other"
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento nacional do pagador, usado para localizá-lo e evitar duplicidade quando o título chega de outro módulo."
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do documento do pagador (por exemplo, CPF), usado pelo gerente para localizar o pagador ao emitir o extrato.",
                "title": "Número do documento"
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País ao qual pertencem o documento e as regras legais do pagador.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulo do registro; contém financeiro.Pagador quando a pessoa deve títulos a receber.",
                "title": "Papéis"
              }
            },
            "description": "Dados de identificação da pessoa mantidos pela plataforma; usados para localizar o pagador e exibir seu nome em títulos, recebimentos e extratos."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "addresses": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "Address",
                "title": "Endereços",
                "description": "Endereços do pagador, exibidos no extrato emitido pelo gerente financeiro."
              },
              "contacts": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "ContactSummary",
                "derived": true,
                "description": "Resumo dos canais de contato do pagador, derivado dos vínculos com canais de contato; usado para falar com o pagador sobre títulos em aberto.",
                "title": "Contatos"
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas dos vínculos do pagador, recalculadas pela plataforma.",
                "title": "Vínculos"
              }
            },
            "description": "Dados comuns do registro mestre lidos pelo financeiro para o extrato e para contato com o pagador."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "privacyConsent": {
                "type": "object",
                "of": "PrivacyConsent",
                "description": "Consentimento LGPD do pagador, exigido para que ele permaneça ativo e acesse o portal.",
                "title": "Consentimento de privacidade"
              }
            },
            "description": "Dados de pessoa física mantidos pela plataforma."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o financeiro apenas lê."
          },
          "financeiro": {
            "type": "object",
            "owner": "module",
            "fields": {
              "saldoEmAberto": {
                "type": "money",
                "derived": true,
                "title": "Saldo em aberto",
                "description": "Soma do que falta receber em todos os títulos do pagador que não estão cancelados nem quitados: valor do título menos os recebimentos válidos, desconsiderando os estornados."
              },
              "possuiTitulosVencidos": {
                "type": "boolean",
                "derived": true,
                "title": "Possui títulos vencidos",
                "description": "Verdadeiro quando o pagador tem ao menos um título em aberto com vencimento anterior a hoje."
              }
            },
            "description": "Namespace do módulo financeiro sobre o pagador; vazio, pois títulos e recebimentos ficam nas entidades próprias do módulo."
          }
        }
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type FinanceiroEntityPagadorType = typeof financeiroEntityPagador;

export default financeiroEntityPagador;
