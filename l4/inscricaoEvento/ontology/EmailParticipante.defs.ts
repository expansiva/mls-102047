/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/EmailParticipante.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityEmailParticipante = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "entityId": "EmailParticipante",
  "title": "E-mail do participante",
  "description": "Canal de e-mail informado pelo participante na inscrição, registro de contato que permite garantir uma única inscrição por e-mail em cada evento.",
  "displayField": "details.identification.name",
  "relationships": {
    "participante": {
      "relationshipId": "participanteEmail",
      "to": "Participante",
      "via": "HasContact",
      "cardinality": "N:1",
      "title": "Participante dono do e-mail",
      "description": "O participante possui este e-mail como canal de contato (HasContact).",
      "direction": "to",
      "required": true,
      "role": "HasContact"
    }
  },
  "capabilities": {
    "read.byId": "Lê o e-mail pelo id ao montar a lista de inscritos e o CSV do organizador.",
    "locate.byContact": "Localiza o e-mail já existente quando alguém se inscreve na página pública, para reaproveitar o registro e checar inscrição duplicada no evento.",
    "register.createOrAttach": "Cria o canal de e-mail na inscrição pública quando ainda não existe, ou o reaproveita, marcando o papel inscricaoEvento.EmailParticipante.",
    "link": "Vincula o e-mail ao participante por HasContact no momento da inscrição.",
    "listLinks": "Mostra ao organizador a qual participante o e-mail pertence.",
    "edit.platformFields": "Permite ao organizador corrigir um e-mail digitado errado por um inscrito.",
    "inactivate": "Retira de uso um e-mail inválido sem apagá-lo, preservando o histórico das inscrições.",
    "unlink": "Encerra o vínculo do e-mail com o participante mantendo o histórico, quando o organizador corrige o contato.",
    "audit": "Mostra quem criou ou alterou o e-mail e quando."
  },
  "rules": [
    "rule-contact-value-unique-per-type",
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-delete-blocked-by-relationships",
    "rule-document-shape-validated",
    "emailUnicoPorEvento"
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
                "description": "Sempre ContactChannel: o e-mail é um registro de contato próprio.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Rótulo legível do canal, normalmente o próprio e-mail informado na inscrição.",
                "title": "Nome"
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
                "title": "Situação",
                "description": "Situação do registro no MDM (ativo ou inativo)."
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País (ISO 3166-1 alfa-2) a que o registro pertence.",
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
                "description": "Momento em que o e-mail foi registrado pela primeira vez."
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
            "description": "Identificação do canal de e-mail do participante no MDM."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas recalculadas pela plataforma, incluindo o participante dono do e-mail via HasContact.",
                "title": "Referências de relacionamento"
              }
            },
            "description": "Dados comuns da plataforma; o módulo apenas lê as referências de relacionamento."
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
                "description": "Neste módulo é sempre e-mail."
              },
              "value": {
                "type": "string",
                "required": true,
                "description": "Endereço de e-mail usado na inscrição; garante uma única inscrição por e-mail em cada evento.",
                "title": "E-mail",
                "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
                "maxLength": 254
              },
              "isVerified": {
                "type": "boolean",
                "required": true,
                "title": "Verificado",
                "description": "Indica se a plataforma já verificou o e-mail; o módulo não exige verificação para inscrever."
              }
            },
            "description": "O e-mail informado pelo participante na página pública do evento."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; lidos, não declarados aqui."
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
