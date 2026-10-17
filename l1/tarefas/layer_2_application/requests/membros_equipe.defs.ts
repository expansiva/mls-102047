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
        "route": "tarefas.membros_equipe.qryPessoasEquipe",
        "kind": "qry",
        "uses": [
          "listMembroEquipe",
          "getMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "pessoas.items.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.qryPessoasEquipe projects items.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "pessoas",
            "entity": "MembroEquipe",
            "items": "items",
            "page": "pessoas.page",
            "pageSize": "pessoas.pageSize",
            "hasMore": "pessoas.hasMore",
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
            "path": "pessoas.items.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "subtype",
                "path": "details.identification.subtype"
              },
              {
                "field": "name",
                "path": "details.identification.name"
              },
              {
                "field": "countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "pessoas.items.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.membros_equipe.qryPessoasEquipe items.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "pessoas.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "pessoas.details.identification.status",
            "reason": "Interface PessoaEquipeIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "pessoas.details.base",
            "reason": "Interface PessoaEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "pessoas",
            "pages": "pessoas"
          },
          {
            "name": "pageSize",
            "target": "pessoas",
            "pages": "pessoas"
          },
          {
            "name": "busca",
            "target": "pessoas",
            "field": "details.identification.name"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Lista, de forma paginada, as pessoas da equipe da organização com o papel tarefas.MembroEquipe, com busca opcional pelo nome.\nEntrada: busca: trecho do nome para filtrar (opcional); page e pageSize: página solicitada e tamanho da página.\nProcessamento: Filtra os membros da organização que têm o papel tarefas.MembroEquipe em tags; se houver busca, aplica correspondência parcial e sem distinção de maiúsculas sobre details.identification.name; ordena por nome. Não expõe o consentimento de privacidade (campo negado ao gestor). Situação, papéis, subtipo e contatos são campos calculados pela plataforma e apenas lidos.\nSaída: Página { items, page, pageSize, hasMore } de pessoas, cada uma com id, version, subtipo, nome, situação no cadastro, país, papéis e resumo dos contatos.",
          "purpose": "Lista, de forma paginada, as pessoas da equipe da organização com o papel tarefas.MembroEquipe, com busca opcional pelo nome.",
          "input": "busca: trecho do nome para filtrar (opcional); page e pageSize: página solicitada e tamanho da página.",
          "processing": "Filtra os membros da organização que têm o papel tarefas.MembroEquipe em tags; se houver busca, aplica correspondência parcial e sem distinção de maiúsculas sobre details.identification.name; ordena por nome. Não expõe o consentimento de privacidade (campo negado ao gestor). Situação, papéis, subtipo e contatos são campos calculados pela plataforma e apenas lidos.",
          "output": "Página { items, page, pageSize, hasMore } de pessoas, cada uma com id, version, subtipo, nome, situação no cadastro, país, papéis e resumo dos contatos."
        }
      },
      {
        "route": "tarefas.membros_equipe.cmdCadastrarPessoa",
        "kind": "cmd",
        "uses": [
          "createMembroEquipe"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "pessoa.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.cmdCadastrarPessoa projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "pessoa",
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
            "path": "pessoa.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "subtype",
                "path": "details.identification.subtype"
              },
              {
                "field": "name",
                "path": "details.identification.name"
              },
              {
                "field": "countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.membros_equipe.cmdCadastrarPessoa details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.identification.status",
            "reason": "Interface PessoaEquipeIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.base",
            "reason": "Interface PessoaEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Cadastra uma nova pessoa na equipe com o papel tarefas.MembroEquipe.\nEntrada: details.identification.name: nome da pessoa como aparecerá nas tarefas; details.identification.countryCode: país da pessoa.\nProcessamento: Usa register.createOrAttach: cria a pessoa no cadastro mestre ou anexa o papel tarefas.MembroEquipe a quem já existe, sem duplicar. Valida o formato do documento. id, version, subtipo, situação, papéis e contatos são definidos pela plataforma, nunca informados pelo endpoint.\nSaída: A pessoa cadastrada, ativa, com id, version, subtipo, nome, situação, país, papéis e resumo dos contatos.",
          "purpose": "Cadastra uma nova pessoa na equipe com o papel tarefas.MembroEquipe.",
          "input": "details.identification.name: nome da pessoa como aparecerá nas tarefas; details.identification.countryCode: país da pessoa.",
          "processing": "Usa register.createOrAttach: cria a pessoa no cadastro mestre ou anexa o papel tarefas.MembroEquipe a quem já existe, sem duplicar. Valida o formato do documento. id, version, subtipo, situação, papéis e contatos são definidos pela plataforma, nunca informados pelo endpoint.",
          "output": "A pessoa cadastrada, ativa, com id, version, subtipo, nome, situação, país, papéis e resumo dos contatos."
        }
      },
      {
        "route": "tarefas.membros_equipe.cmdSalvarAlteracoes",
        "kind": "cmd",
        "uses": [
          "updateMembroEquipe"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "pessoa.details",
            "reason": "DISCLOSURE: Route tarefas.membros_equipe.cmdSalvarAlteracoes projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "pessoa",
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
            "path": "pessoa.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "subtype",
                "path": "details.identification.subtype"
              },
              {
                "field": "name",
                "path": "details.identification.name"
              },
              {
                "field": "countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.membros_equipe.cmdSalvarAlteracoes details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.identification.status",
            "reason": "Interface PessoaEquipeIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "pessoa.details.base",
            "reason": "Interface PessoaEquipeBase has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Corrige o nome e o país de uma pessoa que já está na equipe.\nEntrada: id: identificador do membro; version: versão lida, para controle de concorrência otimista; details.identification.name: novo nome; details.identification.countryCode: novo país.\nProcessamento: Usa edit.platformFields no cadastro mestre; recusa se a versão não for a atual. Altera apenas nome e país; os demais campos são mantidos pela plataforma.\nSaída: A pessoa atualizada, com a nova version, subtipo, nome, situação, país, papéis e resumo dos contatos.",
          "purpose": "Corrige o nome e o país de uma pessoa que já está na equipe.",
          "input": "id: identificador do membro; version: versão lida, para controle de concorrência otimista; details.identification.name: novo nome; details.identification.countryCode: novo país.",
          "processing": "Usa edit.platformFields no cadastro mestre; recusa se a versão não for a atual. Altera apenas nome e país; os demais campos são mantidos pela plataforma.",
          "output": "A pessoa atualizada, com a nova version, subtipo, nome, situação, país, papéis e resumo dos contatos."
        }
      }
    ]
  }
} as const;

export default definition;
