/// <mls fileReference="_102047_/l4/comandaRestaurante/ontology/Mesa.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteEntityMesa = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "comandaRestaurante",
  "entityId": "Mesa",
  "title": "Mesa",
  "description": "Mesa física do restaurante utilizada para vincular e identificar o atendimento por comanda; sua disponibilidade é derivada das comandas abertas.",
  "displayField": "details.identification.name",
  "relationships": {
    "comandaParaMesa": {
      "relationshipId": "comandaParaMesa",
      "to": "Comanda",
      "via": "Comanda.mesaId",
      "cardinality": "1:N",
      "title": "Comandas da mesa",
      "description": "Comandas abertas e encerradas que foram vinculadas a esta mesa em atendimentos distintos.",
      "mode": "fk",
      "direction": "to",
      "required": "Ao abrir uma comanda para a mesa."
    }
  },
  "capabilities": {
    "read.byId": "Lê uma mesa pelo identificador mestre, por consulta direta do registro, para o garçom carregar a mesa já selecionada.",
    "locate.byName": "Localiza mesas pelo nome no índice de localizações, para o garçom selecionar a mesa do atendimento.",
    "register.createOrAttach": "Cria ou vincula a mesa física ao papel do módulo após localizar o registro mestre, para o garçom iniciar atendimento em uma mesa cadastrada.",
    "edit.platformFields": "Atualiza nome, código e demais dados de localização permitidos no registro mestre, pela atualização do documento, para a manutenção operacional das mesas.",
    "inactivate": "Inativa ou reativa uma mesa pelo status mestre, impedindo ou permitindo seu uso em novos atendimentos, para a manutenção operacional.",
    "listLinks": "Lista as comandas relacionadas à mesa pela relação comandaParaMesa, para consulta do histórico de atendimentos.",
    "statusHistory.read": "Consulta as alterações de status do cadastro mestre da mesa no histórico da plataforma, para a manutenção operacional.",
    "audit": "Consulta quem alterou o cadastro mestre da mesa e quando no registro de auditoria, para a conferência administrativa.",
    "comandaRestaurante.locateAvailable": "Lista mesas ativas sem comanda aberta por consulta das comandas vinculadas, para o garçom selecionar uma mesa disponível antes de abrir o atendimento."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace"
  ],
  "kind": "role",
  "subtype": "Location",
  "roleTag": "comandaRestaurante.Mesa",
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
        "description": "Documento mestre da mesa física usada nos atendimentos do restaurante.",
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
                    "value": "Location",
                    "title": "Localização física do restaurante.",
                    "description": "Registro mestre de local físico."
                  }
                ],
                "description": "Subtipo mestre Location que identifica este registro como local físico.",
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
                "description": "Nome pelo qual o garçom reconhece e seleciona a mesa para abrir uma comanda.",
                "title": "Nome da mesa",
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
                    "title": "Ativa",
                    "description": "Mesa disponível para uso no cadastro mestre."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativa",
                    "description": "Mesa retirada de uso no cadastro mestre."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclada",
                    "description": "Registro mestre mesclado a outro registro."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueada",
                    "description": "Registro mestre bloqueado pela plataforma."
                  }
                ],
                "title": "Status do cadastro",
                "description": "Situação mestre da mesa; mesas inativas não devem ser usadas em novos atendimentos.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação da mesa no cadastro mestre."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados básicos da plataforma mantidos para a mesa quando aplicáveis."
          },
          "location": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "locationType": {
                "type": "enum",
                "required": true,
                "values": [
                  {
                    "value": "Other",
                    "title": "Outro local físico",
                    "description": "Classificação de plataforma para uma mesa de restaurante."
                  }
                ],
                "title": "Tipo de localização",
                "description": "Classificação de localização usada para representar a mesa física do restaurante.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "locationCode": {
                "type": "string",
                "title": "Código da mesa",
                "description": "Código de identificação operacional da mesa, como seu número no salão.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Características de localização física da mesa no restaurante."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização, somente para leitura pelo módulo."
          },
          "comandaRestaurante": {
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

export type ComandaRestauranteEntityMesaType = typeof comandaRestauranteEntityMesa;

export default comandaRestauranteEntityMesa;
