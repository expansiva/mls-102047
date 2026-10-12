/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Aluno.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityAluno = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Aluno",
  "title": "Aluno",
  "description": "Pessoa matriculada na academia; papel do módulo sobre o cadastro mestre de pessoa. A situação de bloqueio é derivada das mensalidades vencidas de suas matrículas.",
  "displayField": "details.identification.name",
  "relationships": {
    "matriculas": {
      "relationshipId": "matriculaAluno",
      "to": "Matricula",
      "via": "Matricula.alunoId",
      "cardinality": "1:N",
      "title": "Matrículas do aluno",
      "description": "Matrículas do aluno em planos ao longo do tempo.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "mensalidades": {
      "relationshipId": "alunoMensalidades",
      "to": "Mensalidade",
      "via": "Matricula",
      "cardinality": "1:N",
      "title": "Mensalidades do aluno",
      "description": "Mensalidades obtidas pelas matrículas do aluno, usadas para ver as vencidas e o bloqueio.",
      "mode": "throughTable",
      "path": "Aluno <- Matricula.alunoId <- Mensalidade.matriculaId",
      "derived": true
    }
  },
  "capabilities": {
    "read.byId": "Lê o aluno pelo identificador para exibir nome e situação na matrícula, nas mensalidades e nos pagamentos; usado pela recepção e pela gerência.",
    "locate.byName": "Procura o aluno pelo nome digitado, ao matricular e ao conferir a entrada; usado pela recepção.",
    "locate.byDocument": "Localiza o aluno pelo CPF ou outro documento para evitar cadastro duplicado antes de matricular; usado pela recepção.",
    "locate.byContact": "Encontra o aluno pelo telefone, WhatsApp ou e-mail quando ele entra em contato; usado pela recepção.",
    "register.createOrAttach": "Cadastra o aluno quando não existe ou anexa o papel de aluno a uma pessoa já cadastrada, na jornada de matrícula; usado pela recepção.",
    "edit.platformFields": "Corrige nome, documento, endereço, nascimento e consentimento do aluno; usado pela recepção.",
    "link.contact": "Adiciona telefone, WhatsApp ou e-mail do aluno como canal de contato vinculado; usado pela recepção.",
    "listLinks": "Mostra os vínculos do aluno, como contatos, na ficha do aluno; usado pela recepção e pela gerência.",
    "inactivate": "Inativa o cadastro do aluno que deixou a academia, sem apagá-lo, e permite reativá-lo; usado pela gerência.",
    "attach.document": "Guarda foto ou documento digitalizado do aluno no cadastro; usado pela recepção.",
    "comment": "Registra observações sobre o aluno, como combinados de pagamento; usado pela recepção e pela gerência.",
    "statusHistory.read": "Mostra quando o cadastro do aluno foi ativado ou inativado e por quem; usado pela gerência.",
    "audit": "Informa quem alterou o cadastro do aluno e quando; usado pela gerência.",
    "mensalidadesAcademia.verificarAcesso": "Calcula se o aluno pode entrar a partir das mensalidades vencidas de suas matrículas, mostrando bloqueio e vencidas na entrada; usado pela recepção."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-identity-never-in-namespace",
    "rule-document-shape-validated",
    "rule-delete-blocked-by-relationships",
    "rule-person-privacy-consent-required-br-eu",
    "alunoBloqueadoComDuasVencidas",
    "alunoBloqueadoNaoPodeEntrar"
  ],
  "kind": "role",
  "subtype": "Person",
  "roleTag": "mensalidadesAcademia.Aluno",
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
        "description": "Cadastro mestre da pessoa que é aluno da academia, com o papel mensalidadesAcademia.Aluno.",
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
                "description": "Sempre pessoa: o aluno é uma pessoa física.",
                "title": "Subtipo"
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 200,
                "description": "Nome pelo qual a recepção procura o aluno na matrícula e na entrada da academia.",
                "title": "Nome do aluno"
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
                "title": "Situação do cadastro",
                "description": "Situação do cadastro mestre (ativo ou inativo), mantida pela plataforma; não é o bloqueio por mensalidades vencidas, que é calculado."
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "CPF",
                    "title": "CPF"
                  },
                  {
                    "value": "Passport",
                    "title": "Passaporte"
                  },
                  {
                    "value": "NationalId",
                    "title": "RG / documento nacional"
                  },
                  {
                    "value": "Other",
                    "title": "Outro"
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento nacional usado para evitar cadastro duplicado do aluno."
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do documento informado pelo aluno; a recepção o usa para localizar o aluno antes de cadastrar.",
                "title": "Número do documento"
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 2,
                "default": "US",
                "description": "País do documento do aluno (ISO 3166-1 alfa-2), normalmente BR.",
                "title": "País"
              },
              "tags": {
                "type": "string",
                "required": true,
                "collection": true,
                "derived": true,
                "description": "Papéis do cadastro nos módulos; inclui mensalidadesAcademia.Aluno, escrito pela plataforma.",
                "title": "Papéis"
              },
              "createdAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Cadastrado em",
                "description": "Data em que o cadastro foi criado."
              },
              "updatedAt": {
                "type": "string",
                "required": true,
                "indexed": true,
                "derived": true,
                "title": "Atualizado em",
                "description": "Data da última alteração do cadastro."
              }
            },
            "description": "Dados de identificação do aluno, indexados pela plataforma."
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
                "description": "Endereços do aluno registrados no cadastro."
              },
              "contacts": {
                "type": "object",
                "required": true,
                "collection": true,
                "of": "ContactSummary",
                "derived": true,
                "description": "Resumo dos telefones, WhatsApp e e-mails do aluno, vinculados como canais de contato; usado pela recepção para falar sobre mensalidades.",
                "title": "Contatos"
              },
              "relationshipRefs": {
                "type": "object",
                "required": true,
                "derived": true,
                "description": "Chaves compactas dos vínculos do aluno, recalculadas pela plataforma.",
                "title": "Vínculos"
              }
            },
            "description": "Dados comuns de qualquer cadastro mestre que o módulo lê."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "birthDate": {
                "type": "date",
                "title": "Data de nascimento",
                "description": "Data de nascimento do aluno, informada no cadastro."
              },
              "privacyConsent": {
                "type": "object",
                "of": "PrivacyConsent",
                "description": "Consentimento do aluno para o tratamento de seus dados pela academia, exigido pela LGPD.",
                "title": "Consentimento LGPD",
                "required": true
              }
            },
            "description": "Dados de pessoa física do aluno."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Campos promovidos pela organização; o módulo apenas lê."
          },
          "mensalidadesAcademia": {
            "type": "object",
            "owner": "module",
            "fields": {
              "quantidadeMensalidadesVencidas": {
                "type": "integer",
                "derived": true,
                "title": "Mensalidades vencidas",
                "description": "Quantidade de mensalidades das matrículas do aluno que estão em aberto e com vencimento anterior a hoje."
              },
              "inadimplente": {
                "type": "boolean",
                "derived": true,
                "title": "Inadimplente",
                "description": "Verdadeiro quando o aluno tem pelo menos uma mensalidade vencida e não paga."
              },
              "bloqueado": {
                "type": "boolean",
                "derived": true,
                "title": "Bloqueado",
                "description": "Verdadeiro quando o aluno tem duas ou mais mensalidades vencidas e não pagas; deixa de valer assim que ele regulariza os pagamentos."
              }
            },
            "description": "Namespace do módulo; vazio, pois matrícula, mensalidades e pagamentos ficam nas entidades próprias do módulo."
          }
        }
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type MensalidadesAcademiaEntityAlunoType = typeof mensalidadesAcademiaEntityAluno;

export default mensalidadesAcademiaEntityAluno;
