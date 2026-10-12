/// <mls fileReference="_102047_/l4/compras/ontology/ContatoFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasEntityContatoFornecedor = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "ContatoFornecedor",
  "title": "Contato do fornecedor",
  "description": "Canal de contato (telefone, e-mail) do fornecedor, registrado como canal próprio e vinculado por HasContact.",
  "displayField": "details.identification.name",
  "relationships": {
    "fornecedor": {
      "relationshipId": "fornecedorContato",
      "to": "Fornecedor",
      "via": "HasContact",
      "cardinality": "N:1",
      "title": "Fornecedor do contato",
      "description": "Fornecedor ao qual este canal de contato está vinculado por HasContact.",
      "direction": "to",
      "role": "HasContact"
    }
  },
  "capabilities": {
    "read.byId": "Lê o canal de contato pelo mdmId para exibir o telefone ou e-mail na ficha do fornecedor e no pedido de compra; usado pelo comprador e pelo gerente de compras.",
    "locate.byContact": "Localiza o canal pelo telefone ou e-mail antes de cadastrar, evitando duplicar o contato; usado pelo comprador.",
    "locate.byName": "Busca canais de contato pelo nome digitado; usado pelo comprador.",
    "register.createOrAttach": "Cria o canal quando não existe e marca com o papel compras.ContatoFornecedor; usado pelo comprador ao cadastrar o fornecedor.",
    "edit.platformFields": "Corrige o tipo, o valor ou o nome do canal de contato; usado pelo comprador.",
    "inactivate": "Retira de uso um telefone ou e-mail que o fornecedor deixou de usar, sem apagá-lo; usado pelo comprador.",
    "link": "Vincula o canal ao fornecedor por HasContact; usado pelo comprador.",
    "unlink": "Encerra o vínculo do canal com o fornecedor mantendo o histórico; usado pelo comprador.",
    "listLinks": "Mostra a qual fornecedor o canal pertence; usado pelo comprador e pelo gerente de compras.",
    "comment": "Registra observações sobre o contato, como melhor horário para ligar; usado pelo comprador.",
    "audit": "Mostra quem alterou o canal de contato e quando; usado pelo gerente de compras."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-contact-value-unique-per-type",
    "rule-delete-blocked-by-relationships",
    "rule-document-shape-validated"
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
                "description": "Sempre ContactChannel: o contato do fornecedor é um canal próprio.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Como o comprador reconhece o canal, por exemplo 'Comercial - telefone' ou o nome da pessoa de contato no fornecedor.",
                "title": "Nome do contato"
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
                "description": "Situação do canal no cadastro mestre; um contato inativo não é usado para enviar pedidos."
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País do canal (ISO 3166-1 alfa-2), normalmente BR.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulo do registro; inclui compras.ContatoFornecedor.",
                "title": "Papéis"
              },
              "createdAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Criado em",
                "description": "Quando o canal foi cadastrado."
              },
              "updatedAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Atualizado em",
                "description": "Última alteração do canal."
              }
            },
            "description": "Identificação do canal de contato do fornecedor no cadastro mestre."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "notes": {
                "type": "string",
                "maxLength": 1000,
                "title": "Observações",
                "description": "Observação sobre o uso do canal, como horário de atendimento do fornecedor."
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas recalculadas pela plataforma, incluindo o fornecedor ao qual o contato pertence.",
                "title": "Vínculos"
              }
            },
            "description": "Dados comuns do registro mestre usados pelo módulo."
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
                  },
                  {
                    "value": "Email",
                    "title": "E-mail"
                  },
                  {
                    "value": "WhatsApp",
                    "title": "WhatsApp"
                  },
                  {
                    "value": "Other",
                    "title": "Outro"
                  }
                ],
                "title": "Tipo de contato",
                "description": "Tipo do canal usado pelo comprador para falar com o fornecedor."
              },
              "value": {
                "type": "string",
                "required": true,
                "description": "O número de telefone ou o endereço de e-mail do fornecedor, sem máscara.",
                "title": "Contato"
              },
              "isVerified": {
                "type": "boolean",
                "required": true,
                "title": "Verificado",
                "description": "Indica se o canal já foi confirmado como do fornecedor."
              },
              "verifiedAt": {
                "type": "timestamp",
                "title": "Verificado em",
                "description": "Quando o canal foi confirmado."
              }
            },
            "description": "O telefone ou e-mail do fornecedor como registro próprio."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o módulo apenas lê."
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

export type ComprasEntityContatoFornecedorType = typeof comprasEntityContatoFornecedor;

export default comprasEntityContatoFornecedor;
