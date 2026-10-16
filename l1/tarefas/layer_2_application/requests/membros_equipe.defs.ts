/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/membros_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "membros_equipe",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/createMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateMembroEquipe.defs.ts"
  ],
  "data": {
    "pageId": "membros_equipe",
    "requests": [
      {
        "route": "tarefas.membros_equipe.listarMembrosEquipe",
        "kind": "qry",
        "uses": [
          "listMembroEquipe",
          "getMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "membros.items.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.listarMembrosEquipe projects items.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "membros",
            "entity": "MembroEquipe",
            "items": "items",
            "page": "membros.page",
            "pageSize": "membros.pageSize",
            "hasMore": "membros.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              }
            ]
          },
          {
            "kind": "related",
            "path": "membros.items.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membros.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "membros.details.base",
            "reason": "Interface MembroEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "membros",
            "pages": "membros"
          },
          {
            "name": "pageSize",
            "target": "membros",
            "pages": "membros"
          },
          {
            "name": "busca",
            "target": "membros",
            "field": "details.identification.name"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Carrega, ao abrir a página, as pessoas da equipe (papel tarefas.MembroEquipe) para o gestor ver quem pode criar e receber tarefas e escolher quem atualizar.\nEntrada: page e pageSize: página da lista; busca: trecho opcional do nome para filtrar as pessoas.\nProcessamento: Lista os membros da organização que têm o papel tarefas.MembroEquipe em details.identification.tags, filtrando pelo nome quando houver busca, ordenados por nome. Situação, papéis e resumo de contatos são campos derivados lidos do cadastro mestre, nunca calculados ou gravados aqui. Não devolve o consentimento de privacidade (campo negado ao gestor).\nSaída: Página { items, page, pageSize, hasMore } com id, version, nome, situação, país, papéis e contatos de cada pessoa, no formato que a lista mostra.",
          "purpose": "Carrega, ao abrir a página, as pessoas da equipe (papel tarefas.MembroEquipe) para o gestor ver quem pode criar e receber tarefas e escolher quem atualizar.",
          "input": "page e pageSize: página da lista; busca: trecho opcional do nome para filtrar as pessoas.",
          "processing": "Lista os membros da organização que têm o papel tarefas.MembroEquipe em details.identification.tags, filtrando pelo nome quando houver busca, ordenados por nome. Situação, papéis e resumo de contatos são campos derivados lidos do cadastro mestre, nunca calculados ou gravados aqui. Não devolve o consentimento de privacidade (campo negado ao gestor).",
          "output": "Página { items, page, pageSize, hasMore } com id, version, nome, situação, país, papéis e contatos de cada pessoa, no formato que a lista mostra."
        }
      },
      {
        "route": "tarefas.membros_equipe.obterMembroEquipe",
        "kind": "qry",
        "uses": [
          "getMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "membro.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.obterMembroEquipe projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "membro",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              }
            ]
          },
          {
            "kind": "related",
            "path": "membro.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membro.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "membro.details.base",
            "reason": "Interface MembroEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "membro",
            "field": "id"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Carrega a pessoa escolhida na lista para abrir seus dados no formulário de cadastro.\nEntrada: id: identificador (mdmId) da pessoa selecionada.\nProcessamento: Lê o membro pelo id (read.byId) com a versão atual, para que a edição use o controle de concorrência otimista.\nSaída: A pessoa com id, version, nome, país e situação, que o formulário preenche.",
          "purpose": "Carrega a pessoa escolhida na lista para abrir seus dados no formulário de cadastro.",
          "input": "id: identificador (mdmId) da pessoa selecionada.",
          "processing": "Lê o membro pelo id (read.byId) com a versão atual, para que a edição use o controle de concorrência otimista.",
          "output": "A pessoa com id, version, nome, país e situação, que o formulário preenche."
        }
      },
      {
        "route": "tarefas.membros_equipe.cadastrarPessoa",
        "kind": "cmd",
        "uses": [
          "createMembroEquipe"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "membro.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.cadastrarPessoa projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "membro",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              }
            ]
          },
          {
            "kind": "related",
            "path": "membro.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membro.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "membro.details.base",
            "reason": "Interface MembroEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Cadastra uma nova pessoa na equipe para que ela possa criar e receber tarefas.\nEntrada: name: nome como aparece nas tarefas; countryCode: país que define as regras de privacidade.\nProcessamento: Cria ou anexa a pessoa no cadastro mestre (register.createOrAttach) com o papel tarefas.MembroEquipe, sem duplicar quem já existe. Id, versão, subtipo, situação, papéis e contatos são definidos pela plataforma, não pelo endpoint.\nSaída: A pessoa criada com id, version e dados derivados, para inserir na lista e manter no formulário sem nova chamada.",
          "purpose": "Cadastra uma nova pessoa na equipe para que ela possa criar e receber tarefas.",
          "input": "name: nome como aparece nas tarefas; countryCode: país que define as regras de privacidade.",
          "processing": "Cria ou anexa a pessoa no cadastro mestre (register.createOrAttach) com o papel tarefas.MembroEquipe, sem duplicar quem já existe. Id, versão, subtipo, situação, papéis e contatos são definidos pela plataforma, não pelo endpoint.",
          "output": "A pessoa criada com id, version e dados derivados, para inserir na lista e manter no formulário sem nova chamada."
        }
      },
      {
        "route": "tarefas.membros_equipe.salvarAlteracoesPessoa",
        "kind": "cmd",
        "uses": [
          "updateMembroEquipe"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "membro.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.salvarAlteracoesPessoa projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "membro",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              }
            ]
          },
          {
            "kind": "related",
            "path": "membro.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membro.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "membro.details.base",
            "reason": "Interface MembroEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Corrige o nome e o país da pessoa selecionada, mantendo correto como ela aparece nas tarefas.\nEntrada: id e version: pessoa editada e versão lida; name: novo nome; countryCode: novo país.\nProcessamento: Atualiza nome e país no cadastro mestre (edit.platformFields), recusando a gravação se a versão não for a atual (concorrência otimista). Campos derivados não são alterados.\nSaída: A pessoa atualizada com a nova versão, para atualizar a linha da lista e o formulário sem nova chamada.",
          "purpose": "Corrige o nome e o país da pessoa selecionada, mantendo correto como ela aparece nas tarefas.",
          "input": "id e version: pessoa editada e versão lida; name: novo nome; countryCode: novo país.",
          "processing": "Atualiza nome e país no cadastro mestre (edit.platformFields), recusando a gravação se a versão não for a atual (concorrência otimista). Campos derivados não são alterados.",
          "output": "A pessoa atualizada com a nova versão, para atualizar a linha da lista e o formulário sem nova chamada."
        }
      }
    ]
  }
} as const;

export default definition;
