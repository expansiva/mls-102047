/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/EmailParticipante.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityEmailParticipante = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "entityId": "EmailParticipante",
  "title": "E-mail do participante",
  "description": "Canal de contato de e-mail informado pelo participante na inscrição; é por ele que se garante uma única inscrição por evento.",
  "displayField": "details.identification.name",
  "relationships": {
    "participante": {
      "relationshipId": "participanteEmail",
      "to": "Participante",
      "via": "HasContact",
      "cardinality": "N:1",
      "title": "Participante dono do e-mail",
      "description": "O participante que informou este e-mail na inscrição, ligado por HasContact.",
      "direction": "to",
      "required": true,
      "role": "HasContact"
    }
  },
  "capabilities": {
    "read.byId": "Lê o e-mail pelo mdmId para preencher a lista de inscritos e o CSV do organizador.",
    "locate.byContact": "Encontra o e-mail já registrado quando o público se inscreve, para reaproveitar o participante e checar a inscrição única por evento.",
    "register.createOrAttach": "Cria o canal de e-mail na inscrição pública quando ainda não existe e marca o papel inscricaoEvento.EmailParticipante.",
    "link": "Liga o e-mail ao participante por HasContact no momento da inscrição.",
    "unlink": "Encerra o vínculo do e-mail com o participante mantendo o histórico, quando o organizador corrige um cadastro.",
    "listLinks": "Mostra ao organizador o participante dono do e-mail.",
    "edit.platformFields": "Permite ao organizador corrigir um e-mail digitado errado.",
    "inactivate": "Retira de uso um e-mail inválido sem apagá-lo.",
    "audit": "Informa quem registrou ou alterou o e-mail e quando."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-contact-value-unique-per-type",
    "rule-delete-blocked-by-relationships",
    "rule-document-shape-validated",
    "umaInscricaoPorEmailPorEvento"
  ],
  "kind": "role",
  "subtype": "ContactChannel",
  "roleTag": "inscricaoEvento.EmailParticipante",
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
        "description": "The JSONB document, as a map of groups (see groups).",
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
                    "title": "Canal de contato"
                  }
                ],
                "description": "Sempre ContactChannel: o e-mail é um canal de contato do participante.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Como o e-mail aparece nas listas do organizador; normalmente o próprio endereço de e-mail.",
                "title": "Nome de exibição"
              },
              "status": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  "Active",
                  "Inactive",
                  "Merged",
                  "Blocked"
                ],
                "title": "Situação no MDM",
                "description": "Ativo enquanto o e-mail está em uso; inativo quando deixa de ser usado."
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País (ISO 3166-1 alfa-2) da organização que recebeu a inscrição.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulo do registro, incluindo inscricaoEvento.EmailParticipante.",
                "title": "Papéis"
              },
              "createdAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Criado em",
                "description": "Quando o e-mail foi registrado pela primeira vez."
              },
              "updatedAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Atualizado em",
                "description": "Última alteração do registro."
              }
            },
            "description": "Índice do canal de e-mail informado na inscrição."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas recalculadas pelo motor, incluindo o participante dono do e-mail via HasContact.",
                "title": "Vínculos"
              }
            },
            "description": "Dados comuns do registro; o módulo lê apenas os vínculos derivados."
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
                    "value": "Email",
                    "title": "E-mail"
                  }
                ],
                "title": "Tipo de contato",
                "description": "Neste módulo, sempre e-mail."
              },
              "value": {
                "type": "string",
                "required": true,
                "description": "Endereço de e-mail informado na inscrição; é a chave que garante uma única inscrição por evento.",
                "title": "E-mail",
                "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
                "maxLength": 254
              },
              "isVerified": {
                "type": "boolean",
                "required": true,
                "title": "Verificado",
                "description": "Se a plataforma já confirmou que o e-mail pertence ao participante."
              },
              "verifiedAt": {
                "type": "timestamp",
                "title": "Verificado em",
                "description": "Quando a verificação aconteceu."
              }
            },
            "description": "O e-mail que o participante digitou na página pública do evento."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o módulo apenas lê."
          },
          "inscricaoEvento": {
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

export type InscricaoEventoEntityEmailParticipanteType = typeof inscricaoEventoEntityEmailParticipante;

export default inscricaoEventoEntityEmailParticipante;
