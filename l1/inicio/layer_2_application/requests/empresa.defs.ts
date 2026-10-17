/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "empresa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/listContatoEmpresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/updateEmpresa.defs.ts"
  ],
  "data": {
    "pageId": "empresa",
    "requests": [
      {
        "route": "inicio.empresa.qryEmpresaPreparo",
        "kind": "qry",
        "uses": [
          "getEmpresa",
          "listContatoEmpresa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "empresa",
            "entity": "Empresa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.docType",
                "path": "details.identification.docType"
              },
              {
                "field": "details.identification.docId",
                "path": "details.identification.docId"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.company.legalName",
                "path": "details.company.legalName"
              },
              {
                "field": "details.company.tradeName",
                "path": "details.company.tradeName"
              },
              {
                "field": "details.base.addresses",
                "path": "details.base.addresses"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "empresa.preparada",
            "entity": "Empresa",
            "rules": [
              "empresaPreparadaDadosObrigatorios",
              "naoPedirDadoJaExistente"
            ]
          },
          {
            "kind": "computed",
            "path": "empresa.dadosFaltantes",
            "entity": "Empresa",
            "rules": [
              "empresaPreparadaDadosObrigatorios",
              "naoPedirDadoJaExistente"
            ]
          },
          {
            "kind": "related",
            "path": "empresa.contacts",
            "entity": "ContatoEmpresa",
            "relationship": "empresaTemContato",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.contactChannel.contactType",
                "path": "details.contactChannel.contactType"
              },
              {
                "field": "details.contactChannel.value",
                "path": "details.contactChannel.value"
              },
              {
                "field": "details.contactChannel.isVerified",
                "path": "details.contactChannel.isVerified"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "empresa.preparada",
            "reason": "Interface EmpresaPreparo: readonly preparada is not a field of Empresa; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "empresa.dadosFaltantes",
            "reason": "Interface EmpresaPreparo: readonly dadosFaltantes is not a field of Empresa; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "empresaPreparadaDadosObrigatorios",
          "naoPedirDadoJaExistente"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez a empresa do app do responsável logado, com os dados já registrados, os contatos ligados, o indicador de preparada e os dados obrigatórios que faltam.\nEntrada: Nenhuma entrada: a empresa é resolvida pela sessão do responsável (escopo organização).\nProcessamento: Lê a empresa pelo id da sessão (read.byId) e os contatos ligados por HasContact que não estão inativos. Calcula, sem gravar, ’preparada’ e ’dadosFaltantes’ (inicio.verificarPreparo): pela regra empresaPreparadaDadosObrigatorios a empresa só está preparada com nome, documento (tipo e número), ao menos um endereço e ao menos um contato; pela regra naoPedirDadoJaExistente a lista de faltantes contém apenas o que a plataforma ainda não tem.\nSaída: A empresa em seu estado atual, com id e versão, nome, documento, país, razão social, nome fantasia, endereços, contatos ligados (nome, tipo, valor, verificado), o indicador preparada e a lista de dados que faltam.",
          "purpose": "Carrega de uma vez a empresa do app do responsável logado, com os dados já registrados, os contatos ligados, o indicador de preparada e os dados obrigatórios que faltam.",
          "input": "Nenhuma entrada: a empresa é resolvida pela sessão do responsável (escopo organização).",
          "processing": "Lê a empresa pelo id da sessão (read.byId) e os contatos ligados por HasContact que não estão inativos. Calcula, sem gravar, ’preparada’ e ’dadosFaltantes’ (inicio.verificarPreparo): pela regra empresaPreparadaDadosObrigatorios a empresa só está preparada com nome, documento (tipo e número), ao menos um endereço e ao menos um contato; pela regra naoPedirDadoJaExistente a lista de faltantes contém apenas o que a plataforma ainda não tem.",
          "output": "A empresa em seu estado atual, com id e versão, nome, documento, país, razão social, nome fantasia, endereços, contatos ligados (nome, tipo, valor, verificado), o indicador preparada e a lista de dados que faltam."
        }
      },
      {
        "route": "inicio.empresa.cmdSalvarDadosEmpresa",
        "kind": "cmd",
        "uses": [
          "updateEmpresa",
          "listContatoEmpresa"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "empresa",
            "entity": "Empresa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.docType",
                "path": "details.identification.docType"
              },
              {
                "field": "details.identification.docId",
                "path": "details.identification.docId"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.company.legalName",
                "path": "details.company.legalName"
              },
              {
                "field": "details.company.tradeName",
                "path": "details.company.tradeName"
              },
              {
                "field": "details.base.addresses",
                "path": "details.base.addresses"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "empresa.preparada",
            "entity": "Empresa",
            "rules": [
              "somenteResponsavelEditaEmpresa",
              "naoPedirDadoJaExistente",
              "empresaPreparadaDadosObrigatorios"
            ]
          },
          {
            "kind": "computed",
            "path": "empresa.dadosFaltantes",
            "entity": "Empresa",
            "rules": [
              "somenteResponsavelEditaEmpresa",
              "naoPedirDadoJaExistente",
              "empresaPreparadaDadosObrigatorios"
            ]
          },
          {
            "kind": "related",
            "path": "empresa.contacts",
            "entity": "ContatoEmpresa",
            "relationship": "empresaTemContato",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.contactChannel.contactType",
                "path": "details.contactChannel.contactType"
              },
              {
                "field": "details.contactChannel.value",
                "path": "details.contactChannel.value"
              },
              {
                "field": "details.contactChannel.isVerified",
                "path": "details.contactChannel.isVerified"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "empresa.preparada",
            "reason": "Interface EmpresaPreparo: readonly preparada is not a field of Empresa; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "empresa.dadosFaltantes",
            "reason": "Interface EmpresaPreparo: readonly dadosFaltantes is not a field of Empresa; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelEditaEmpresa",
          "naoPedirDadoJaExistente",
          "empresaPreparadaDadosObrigatorios"
        ],
        "doc": {
          "raw": "Finalidade: Grava na empresa os dados obrigatórios que faltavam, informados pelo responsável.\nEntrada: id e version da empresa (concorrência otimista); details.identification.name, details.identification.docType, details.identification.docId, details.identification.countryCode, details.company.legalName, details.company.tradeName e details.base.addresses, cada um enviado apenas quando era um dado faltante.\nProcessamento: Pela regra somenteResponsavelEditaEmpresa, recusa se quem chama não é reconhecido pela plataforma como responsável pela empresa. Pela regra naoPedirDadoJaExistente, ignora ou recusa a sobrescrita de dado que a plataforma já tinha. Valida o formato do documento conforme o país e verifica duplicidade pelo documento (locate.byDocument). Atualiza via edit.platformFields com a versão informada. Depois recalcula, sem gravar, ’preparada’ e ’dadosFaltantes’ conforme empresaPreparadaDadosObrigatorios.\nSaída: A empresa no novo estado, com nova versão, dados registrados, contatos ligados, indicador preparada e dados que ainda faltam.",
          "purpose": "Grava na empresa os dados obrigatórios que faltavam, informados pelo responsável.",
          "input": "id e version da empresa (concorrência otimista); details.identification.name, details.identification.docType, details.identification.docId, details.identification.countryCode, details.company.legalName, details.company.tradeName e details.base.addresses, cada um enviado apenas quando era um dado faltante.",
          "processing": "Pela regra somenteResponsavelEditaEmpresa, recusa se quem chama não é reconhecido pela plataforma como responsável pela empresa. Pela regra naoPedirDadoJaExistente, ignora ou recusa a sobrescrita de dado que a plataforma já tinha. Valida o formato do documento conforme o país e verifica duplicidade pelo documento (locate.byDocument). Atualiza via edit.platformFields com a versão informada. Depois recalcula, sem gravar, ’preparada’ e ’dadosFaltantes’ conforme empresaPreparadaDadosObrigatorios.",
          "output": "A empresa no novo estado, com nova versão, dados registrados, contatos ligados, indicador preparada e dados que ainda faltam."
        }
      }
    ]
  }
} as const;

export default definition;
