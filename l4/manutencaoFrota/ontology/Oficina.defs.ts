/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/Oficina.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaEntityOficina = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "manutencaoFrota",
  "entityId": "Oficina",
  "title": "Oficina",
  "description": "Empresa que executa as manutenções dos veículos, indicada em cada ordem de manutenção.",
  "displayField": "details.identification.name",
  "relationships": {
    "ordens": {
      "relationshipId": "ordemOficina",
      "to": "OrdemManutencao",
      "via": "OrdemManutencao.oficinaId",
      "cardinality": "1:N",
      "title": "Ordens de manutenção executadas",
      "description": "Ordens de manutenção em que esta oficina executa o serviço.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Lê a oficina pelo id para exibir seu nome nas ordens de manutenção; usado pelo gestor.",
    "locate.byName": "Busca a oficina pelo nome ao abrir uma ordem de manutenção; usado pelo gestor.",
    "locate.byDocument": "Localiza a oficina pelo CNPJ antes de cadastrar, evitando duplicidade; usado pelo gestor.",
    "register.createOrAttach": "Cadastra a oficina ou vincula uma empresa existente ao papel de oficina da frota; usado pelo gestor.",
    "edit.platformFields": "Altera nome, razão social, CNPJ e endereço da oficina; usado pelo gestor.",
    "inactivate": "Inativa a oficina que deixou de atender a frota, sem apagar o histórico de ordens; usado pelo gestor.",
    "link.contact": "Registra telefone, WhatsApp ou e-mail da oficina como canal de contato; usado pelo gestor.",
    "listLinks": "Mostra os vínculos da oficina, como contatos, na ficha dela; usado pelo gestor.",
    "attach.document": "Anexa contratos ou documentos da oficina ao cadastro; usado pelo gestor.",
    "comment": "Deixa observações sobre a qualidade do atendimento da oficina; usado pelo gestor."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-document-shape-validated",
    "rule-company-legal-name-required",
    "rule-delete-blocked-by-relationships",
    "oficinaInativaSemNovasOrdens"
  ],
  "kind": "role",
  "subtype": "Company",
  "roleTag": "manutencaoFrota.Oficina",
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
        "description": "Registro mestre da empresa que executa manutenções da frota.",
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
                    "value": "Company",
                    "title": "Empresa"
                  }
                ],
                "description": "Sempre Company para uma oficina.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Nome pelo qual o gestor reconhece a oficina ao abrir uma ordem de manutenção.",
                "title": "Nome da oficina"
              },
              "status": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  {
                    "value": "Active",
                    "title": "Ativa"
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativa"
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclada"
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueada"
                  }
                ],
                "title": "Situação",
                "description": "Situação do cadastro; oficina inativa não recebe novas ordens."
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "CNPJ",
                    "title": "CNPJ"
                  },
                  {
                    "value": "Other",
                    "title": "Outro"
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento da oficina, normalmente CNPJ."
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "CNPJ da oficina, usado para evitar cadastro duplicado.",
                "title": "Número do documento"
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País da oficina (ISO 3166-1 alfa-2), normalmente BR.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulo do registro, incluindo manutencaoFrota.Oficina.",
                "title": "Papéis"
              },
              "createdAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Criado em",
                "description": "Data de criação do registro."
              },
              "updatedAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Atualizado em",
                "description": "Data da última alteração do registro."
              }
            },
            "description": "Identificação da oficina no cadastro mestre."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "aliases": {
                "type": "string",
                "required": true,
                "collection": true,
                "description": "Nome fantasia ou apelidos pelos quais a oficina é conhecida.",
                "title": "Outros nomes"
              },
              "addresses": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "Address",
                "title": "Endereços",
                "description": "Endereço onde os veículos são entregues para manutenção."
              },
              "contacts": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "ContactSummary",
                "derived": true,
                "description": "Resumo dos canais de contato da oficina (telefone, WhatsApp, e-mail).",
                "title": "Contatos"
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas dos vínculos, mantidas pela plataforma.",
                "title": "Vínculos"
              },
              "notes": {
                "type": "string",
                "maxLength": 1000,
                "title": "Observações",
                "description": "Observações gerais sobre a oficina."
              }
            },
            "description": "Dados comuns do registro mestre."
          },
          "company": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "companyKind": {
                "type": "enum",
                "required": true,
                "values": [
                  {
                    "value": "LegalEntity",
                    "title": "Pessoa jurídica"
                  },
                  {
                    "value": "Branch",
                    "title": "Filial"
                  }
                ],
                "description": "Oficina é uma pessoa jurídica ou filial.",
                "title": "Tipo de empresa"
              },
              "legalName": {
                "type": "string",
                "required": true,
                "description": "Razão social registrada da oficina.",
                "title": "Razão social"
              },
              "tradeName": {
                "type": "string",
                "description": "Nome comercial da oficina.",
                "title": "Nome fantasia"
              }
            },
            "description": "Dados empresariais da oficina."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; lidos pelo módulo."
          },
          "manutencaoFrota": {
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

export type ManutencaoFrotaEntityOficinaType = typeof manutencaoFrotaEntityOficina;

export default manutencaoFrotaEntityOficina;
