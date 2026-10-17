/// <mls fileReference="_102047_/l4/inicio/ontology/Empresa.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioEntityEmpresa = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inicio",
  "entityId": "Empresa",
  "title": "Empresa",
  "description": "O cadastro mestre da empresa da organização. O responsável completa só os dados obrigatórios que faltam (nome, documento, endereço, contato). O módulo calcula se a empresa está preparada a partir desses dados; não grava essa situação.",
  "displayField": "details.identification.name",
  "relationships": {
    "contatos": {
      "relationshipId": "empresaTemContato",
      "to": "Contato",
      "via": "HasContact",
      "cardinality": "1:N",
      "title": "Contatos da empresa",
      "description": "Canais de contato da empresa; um deles é exigido para a empresa ficar preparada.",
      "required": "para a empresa ficar preparada"
    },
    "pessoas": {
      "relationshipId": "pessoaMembroEmpresa",
      "to": "PessoaOrganizacao",
      "via": "AssignedTo",
      "cardinality": "1:N",
      "title": "Pessoas da organização",
      "description": "Pessoas que fazem parte da organização e que o responsável acompanha.",
      "roles": [
        "member"
      ],
      "direction": "to",
      "required": true
    },
    "responsaveis": {
      "relationshipId": "responsavelPelaEmpresa",
      "to": "PessoaOrganizacao",
      "via": "ManagedBy",
      "cardinality": "1:N",
      "title": "Responsáveis pela empresa",
      "description": "Pessoas que a plataforma reconhece como responsáveis pela empresa.",
      "roles": [
        "manager"
      ],
      "direction": "to"
    }
  },
  "capabilities": {
    "read.byId": "Lê o cadastro da empresa pelo id já conhecido da organização, ao abrir a tela inicial do responsável.",
    "locate.byName": "Localiza a empresa pelo nome no índice do cadastro mestre, usada pelo responsável ao abrir a própria empresa.",
    "locate.byDocument": "Verifica pelo documento (CNPJ, EIN…) se já existe outra empresa antes de o responsável confirmar o documento que faltava.",
    "edit.platformFields": "Grava nome, documento, endereço e razão social que faltavam, informados pelo responsável na preparação da empresa.",
    "link.contact": "Cria um canal de contato e o liga à empresa por HasContact, quando o responsável informa o contato que faltava.",
    "listLinks": "Lista contatos, pessoas da organização e responsáveis ligados à empresa, para o responsável ver quem ainda não completou o acesso.",
    "link": "Registra o vínculo versionado entre a empresa e suas pessoas, mantido pela plataforma ao aceitar e convidar pessoas.",
    "audit": "Mostra quem alterou os dados da empresa e quando, a partir do registro da plataforma.",
    "inicio.verPendencias": "Mostra ao responsável o que a plataforma já tem e destaca só os dados obrigatórios que faltam, a partir do valor calculado de dados faltantes.",
    "inicio.verOrientacao": "Mostra ao responsável o texto fixo de orientação com o link para criar o primeiro módulo no Studio, sem guardar módulos."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-document-shape-validated",
    "rule-company-legal-name-required",
    "rule-company-ein-unique-for-us",
    "empresaPreparadaComDadosObrigatorios",
    "naoPedirDadoJaExistente",
    "prepararSomenteResponsavel"
  ],
  "kind": "role",
  "subtype": "Company",
  "roleTag": "inicio.Empresa",
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
        "description": "Documento mestre da empresa da organização, como a plataforma guarda e devolve.",
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
                "description": "Sempre empresa neste papel.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Nome pelo qual a empresa é reconhecida; dado obrigatório para a empresa ficar preparada.",
                "title": "Nome da empresa"
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
                    "title": "Unificada"
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueada"
                  }
                ],
                "title": "Situação no cadastro",
                "description": "Situação do cadastro mestre (ativo ou inativo), mantida pela plataforma."
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
                    "value": "EIN",
                    "title": "EIN"
                  },
                  {
                    "value": "VAT",
                    "title": "VAT"
                  },
                  {
                    "value": "NationalId",
                    "title": "Documento nacional"
                  },
                  {
                    "value": "Other",
                    "title": "Outro"
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento nacional da empresa; o responsável informa só se a plataforma ainda não tem. Obrigatório para a empresa ficar preparada."
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do documento da empresa; pedido apenas quando falta. Obrigatório para a empresa ficar preparada.",
                "title": "Número do documento"
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País da empresa (ISO 3166-1 alfa-2), que define o documento e as regras legais aplicáveis.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis de módulos no cadastro, incluindo inicio.Empresa; escritos pela plataforma.",
                "title": "Papéis"
              },
              "createdAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Criado em",
                "description": "Momento em que o cadastro foi criado."
              },
              "updatedAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Atualizado em",
                "description": "Momento da última alteração do cadastro."
              }
            },
            "description": "Dados de identificação da empresa mantidos pela plataforma."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "aliases": {
                "type": "string",
                "required": true,
                "collection": true,
                "description": "Nome fantasia e outros nomes da empresa.",
                "title": "Outros nomes"
              },
              "addresses": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "Address",
                "title": "Endereços",
                "description": "Endereços da empresa; ao menos um é obrigatório para a empresa ficar preparada."
              },
              "contacts": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "ContactSummary",
                "derived": true,
                "description": "Resumo dos canais de contato ligados à empresa; ao menos um é obrigatório para a empresa ficar preparada.",
                "title": "Contatos"
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas dos vínculos da empresa, recalculadas pela plataforma.",
                "title": "Vínculos"
              }
            },
            "description": "Dados comuns do cadastro mestre."
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
                  }
                ],
                "description": "A empresa da organização é a pessoa jurídica.",
                "title": "Tipo de empresa"
              },
              "legalName": {
                "type": "string",
                "required": true,
                "description": "Nome oficial registrado da empresa.",
                "title": "Razão social"
              },
              "tradeName": {
                "type": "string",
                "description": "Nome comercial da empresa, quando houver.",
                "title": "Nome fantasia"
              }
            },
            "description": "Dados próprios de pessoa jurídica."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o módulo apenas lê."
          },
          "inicio": {
            "type": "object",
            "owner": "module",
            "fields": {
              "preparada": {
                "type": "boolean",
                "derived": true,
                "title": "Empresa preparada",
                "description": "Verdadeiro quando a empresa tem nome, documento, ao menos um endereço e ao menos um contato; calculado na leitura, nunca gravado."
              },
              "dadosFaltantes": {
                "type": "string",
                "derived": true,
                "title": "Dados que faltam",
                "description": "Lista dos dados obrigatórios ainda ausentes entre nome, documento, endereço e contato, mostrada ao responsável para pedir só o que falta."
              }
            },
            "description": "Espaço do módulo Início; vazio, pois o módulo não guarda nada próprio sobre a empresa."
          }
        }
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type InicioEntityEmpresaType = typeof inicioEntityEmpresa;

export default inicioEntityEmpresa;
