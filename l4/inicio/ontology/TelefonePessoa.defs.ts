/// <mls fileReference="_102047_/l4/inicio/ontology/TelefonePessoa.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioEntityTelefonePessoa = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inicio",
  "entityId": "TelefonePessoa",
  "title": "Telefone da pessoa",
  "description": "Telefone opcional que a própria pessoa informa ao completar o acesso. O e-mail de login não é este registro e não é editável.",
  "displayField": "details.contactChannel.value",
  "relationships": {
    "pessoa": {
      "relationshipId": "pessoaTemTelefone",
      "to": "PessoaOrganizacao",
      "via": "HasContact",
      "cardinality": "N:1",
      "title": "Pessoa dona do telefone",
      "description": "Pessoa da organização a quem o telefone pertence, ligada por HasContact.",
      "direction": "to",
      "role": "HasContact"
    }
  },
  "capabilities": {
    "read.byId": "Lê o telefone já ligado à pessoa pelo id, para mostrar na tela Completar meu acesso o que já existe e pedir só o que falta.",
    "locate.byContact": "Procura se o número informado já pertence a um registro, evitando criar outro telefone ao repetir ou interromper o preenchimento.",
    "register.createOrAttach": "Cria o registro do telefone quando ausente ou reaproveita o existente, marcando o papel inicio.TelefonePessoa; usado pela pessoa da organização ao completar o acesso.",
    "edit.platformFields": "Permite à pessoa da organização corrigir o próprio número de telefone.",
    "link": "Liga o telefone à pessoa da organização pelo relacionamento HasContact, sem duplicar o vínculo em repetições.",
    "unlink": "Desfaz o vínculo quando a pessoa remove o telefone opcional, mantendo o histórico.",
    "listLinks": "Mostra a qual pessoa o telefone está ligado; usado pelo responsável ao ver as pessoas da organização.",
    "inactivate": "Retira de uso um telefone que a pessoa deixou de usar, sem apagá-lo.",
    "audit": "Mostra quem registrou ou alterou o telefone e quando, pelo módulo de auditoria da plataforma."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-contact-value-unique-per-type",
    "rule-document-shape-validated",
    "rule-delete-blocked-by-relationships",
    "telefoneOpcional",
    "telefoneSemDuplicarVinculo"
  ],
  "kind": "role",
  "subtype": "ContactChannel",
  "roleTag": "inicio.TelefonePessoa",
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
        "description": "Registro de canal de contato do tipo telefone, ligado à pessoa da organização.",
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
                "description": "Sempre ContactChannel para este registro.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Como o telefone é reconhecido na lista, normalmente o próprio número.",
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
                "description": "Situação do registro na plataforma (ativo ou inativo)."
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País do telefone (ISO 3166-1 alfa-2), em geral o país informado pela pessoa ao completar o acesso.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulo do registro; inclui inicio.TelefonePessoa.",
                "title": "Papéis"
              },
              "createdAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Criado em",
                "description": "Quando o telefone foi registrado."
              },
              "updatedAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Atualizado em",
                "description": "Última alteração do telefone."
              }
            },
            "description": "Colunas de índice da plataforma para o canal de contato."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Camada comum da plataforma; o Início não usa nenhum campo dela para o telefone."
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
                    "title": "Telefone"
                  }
                ],
                "title": "Tipo de contato",
                "description": "No Início este registro é sempre um telefone; o e-mail de login não é registrado aqui."
              },
              "value": {
                "type": "string",
                "required": true,
                "description": "Número de telefone opcional que a própria pessoa informa ao completar o acesso, guardado sem máscara.",
                "title": "Telefone",
                "pattern": "^\\+?[0-9]{8,15}$",
                "maxLength": 20
              },
              "isVerified": {
                "type": "boolean",
                "required": true,
                "title": "Verificado",
                "description": "Se o telefone foi verificado pela plataforma; o Início não verifica telefones."
              },
              "verifiedAt": {
                "type": "timestamp",
                "title": "Verificado em",
                "description": "Quando a plataforma verificou o telefone, se verificou."
              }
            },
            "description": "O telefone como registro próprio da plataforma."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o Início apenas lê."
          },
          "inicio": {
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

export type InicioEntityTelefonePessoaType = typeof inicioEntityTelefonePessoa;

export default inicioEntityTelefonePessoa;
