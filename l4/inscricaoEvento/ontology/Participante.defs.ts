/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Participante.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityParticipante = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inscricaoEvento",
  "entityId": "Participante",
  "title": "Participante",
  "description": "Pessoa que se inscreve em eventos pela página pública, identificada pelo nome e pelo e-mail; criada ou anexada no momento da inscrição.",
  "displayField": "details.identification.name",
  "relationships": {
    "inscricoes": {
      "relationshipId": "inscricaoParticipante",
      "to": "Inscricao",
      "via": "Inscricao.participanteId",
      "cardinality": "1:N",
      "title": "Inscrições do participante",
      "description": "Inscrições feitas por esta pessoa; no máximo uma por evento.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "emails": {
      "relationshipId": "participanteEmail",
      "to": "EmailParticipante",
      "via": "HasContact",
      "cardinality": "1:N",
      "title": "E-mail do participante",
      "description": "Canal de e-mail informado na inscrição, vinculado por HasContact.",
      "required": true,
      "role": "HasContact"
    },
    "eventos": {
      "relationshipId": "participantesDoEvento",
      "to": "Evento",
      "via": "Inscricao",
      "cardinality": "N:N",
      "title": "Eventos em que se inscreveu",
      "description": "Eventos obtidos a partir das inscrições do participante.",
      "mode": "throughTable",
      "path": "Evento <- Inscricao.eventoId -> Inscricao.participanteId -> Participante",
      "derived": true,
      "direction": "to"
    }
  },
  "capabilities": {
    "read.byId": "Lê o participante pelo mdmId para preencher nome e e-mail na lista de inscritos do organizador e no CSV.",
    "locate.byName": "O organizador procura um participante pelo nome ao conferir os inscritos de um evento.",
    "locate.byContact": "Na inscrição pela página pública, localiza a pessoa pelo e-mail informado para não duplicar o registro e impedir segunda inscrição no mesmo evento.",
    "register.createOrAttach": "Ao se inscrever, o público cria o participante pelo e-mail ou anexa o papel inscricaoEvento.Participante a uma pessoa já existente.",
    "link.contact": "Cria o canal EmailParticipante com o e-mail da inscrição e o vincula por HasContact.",
    "edit.platformFields": "O organizador corrige o nome de um participante digitado errado na inscrição.",
    "inactivate": "O organizador inativa um participante sem apagá-lo, mantendo o histórico de inscrições.",
    "listLinks": "Mostra os canais de contato do participante na ficha vista pelo organizador.",
    "comment": "O organizador deixa observações sobre o participante (por exemplo, necessidades de acessibilidade).",
    "tag": "O organizador marca participantes com rótulos livres do módulo.",
    "statusHistory.read": "Mostra ao organizador quando o participante foi ativado ou inativado.",
    "audit": "Registra quem criou ou alterou o participante, consultável pelo administrador."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-document-shape-validated",
    "rule-person-privacy-consent-required-br-eu",
    "rule-delete-blocked-by-relationships"
  ],
  "kind": "role",
  "subtype": "Person",
  "roleTag": "inscricaoEvento.Participante",
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
        "description": "Registro mestre da pessoa que se inscreve em eventos, com o papel inscricaoEvento.Participante.",
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
                "description": "Sempre Person: o participante é uma pessoa física.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Nome informado pela pessoa ao se inscrever na página pública do evento; é como o organizador a reconhece na lista de inscritos e no CSV.",
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
                "description": "Situação do registro mestre (ativo ou inativo), mantida pela plataforma."
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País da pessoa (ISO 3166-1 alfa-2), que define as regras de privacidade aplicáveis à inscrição.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulos no registro; contém inscricaoEvento.Participante após a primeira inscrição.",
                "title": "Papéis"
              }
            },
            "description": "Colunas de índice da plataforma usadas para localizar e listar o participante."
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
                "description": "Resumo dos canais de contato vinculados por HasContact; inclui o e-mail informado na inscrição, usado para identificar a pessoa e enviar avisos do evento.",
                "title": "Contatos"
              }
            },
            "description": "Dados comuns da plataforma; o módulo lê apenas os contatos vinculados."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "privacyConsent": {
                "type": "object",
                "of": "PrivacyConsent",
                "description": "Consentimento dado na página pública para o uso do nome e do e-mail na gestão da inscrição (LGPD/GDPR).",
                "title": "Consentimento de privacidade"
              }
            },
            "description": "Dados de pessoa física da plataforma usados pelo módulo."
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

export type InscricaoEventoEntityParticipanteType = typeof inscricaoEventoEntityParticipante;

export default inscricaoEventoEntityParticipante;
