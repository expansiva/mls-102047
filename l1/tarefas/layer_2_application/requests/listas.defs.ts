/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "listas",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/createLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateLista.defs.ts"
  ],
  "data": {
    "pageId": "listas",
    "requests": [
      {
        "route": "tarefas.listas.listarListas",
        "kind": "qry",
        "uses": [
          "listLista"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "listas",
            "entity": "Lista",
            "items": "",
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
                "field": "nome",
                "path": "nome"
              },
              {
                "field": "ativa",
                "path": "ativa"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Carrega todas as listas da organização, ativas e inativas, com os dados necessários para exibir e editar cada uma.\nEntrada: Sem entrada; o escopo é a organização do gestor logado.\nProcessamento: Lê todas as listas da organização ordenadas por nome. Para cada lista calcula quantidadeTarefasAbertas contando as tarefas com listaId igual à lista cuja situação não é concluída nem cancelada (campo derivado, nunca gravado).\nSaída: A coleção de listas, cada uma com id, versão, nome, ativa, tipo, descrição e quantidade de tarefas abertas.",
          "purpose": "Carrega todas as listas da organização, ativas e inativas, com os dados necessários para exibir e editar cada uma.",
          "input": "Sem entrada; o escopo é a organização do gestor logado.",
          "processing": "Lê todas as listas da organização ordenadas por nome. Para cada lista calcula quantidadeTarefasAbertas contando as tarefas com listaId igual à lista cuja situação não é concluída nem cancelada (campo derivado, nunca gravado).",
          "output": "A coleção de listas, cada uma com id, versão, nome, ativa, tipo, descrição e quantidade de tarefas abertas."
        }
      },
      {
        "route": "tarefas.listas.buscarListas",
        "kind": "qry",
        "uses": [
          "listLista"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "listas",
            "entity": "Lista",
            "items": "",
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
                "field": "nome",
                "path": "nome"
              },
              {
                "field": "ativa",
                "path": "ativa"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "busca",
            "target": "listas",
            "field": "nome"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Busca as listas cujo nome contém o trecho digitado pelo gestor.\nEntrada: busca: trecho do nome da lista; vazio devolve todas as listas.\nProcessamento: Filtra as listas da organização pelo trecho do nome, sem diferenciar maiúsculas e minúsculas, ordenando por nome. Calcula quantidadeTarefasAbertas de cada lista contando as tarefas nem concluídas nem canceladas (derivado, nunca gravado).\nSaída: As listas encontradas, cada uma com id, versão, nome, ativa, tipo, descrição e quantidade de tarefas abertas.",
          "purpose": "Busca as listas cujo nome contém o trecho digitado pelo gestor.",
          "input": "busca: trecho do nome da lista; vazio devolve todas as listas.",
          "processing": "Filtra as listas da organização pelo trecho do nome, sem diferenciar maiúsculas e minúsculas, ordenando por nome. Calcula quantidadeTarefasAbertas de cada lista contando as tarefas nem concluídas nem canceladas (derivado, nunca gravado).",
          "output": "As listas encontradas, cada uma com id, versão, nome, ativa, tipo, descrição e quantidade de tarefas abertas."
        }
      },
      {
        "route": "tarefas.listas.criarLista",
        "kind": "cmd",
        "uses": [
          "createLista"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "lista",
            "entity": "Lista",
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
                "field": "nome",
                "path": "nome"
              },
              {
                "field": "ativa",
                "path": "ativa"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "listaMantidaPorGestor",
          "listaNomeUnico"
        ],
        "doc": {
          "raw": "Finalidade: Cadastra uma nova lista de projeto ou área.\nEntrada: nome: nome da lista; details.tipo: projeto ou área; details.descricao: objetivo da lista (opcional); ativa: se a lista recebe novas tarefas.\nProcessamento: listaMantidaPorGestor: recusa se quem chama não é gestor. listaNomeUnico: recusa se já existe outra lista com o mesmo nome. Grava a lista; quantidadeTarefasAbertas é derivada e começa em zero.\nSaída: A lista criada, com id, versão inicial, dados gravados e quantidade de tarefas abertas.",
          "purpose": "Cadastra uma nova lista de projeto ou área.",
          "input": "nome: nome da lista; details.tipo: projeto ou área; details.descricao: objetivo da lista (opcional); ativa: se a lista recebe novas tarefas.",
          "processing": "listaMantidaPorGestor: recusa se quem chama não é gestor. listaNomeUnico: recusa se já existe outra lista com o mesmo nome. Grava a lista; quantidadeTarefasAbertas é derivada e começa em zero.",
          "output": "A lista criada, com id, versão inicial, dados gravados e quantidade de tarefas abertas."
        }
      },
      {
        "route": "tarefas.listas.salvarLista",
        "kind": "cmd",
        "uses": [
          "updateLista"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "lista",
            "entity": "Lista",
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
                "field": "nome",
                "path": "nome"
              },
              {
                "field": "ativa",
                "path": "ativa"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "listaMantidaPorGestor",
          "listaNomeUnico"
        ],
        "doc": {
          "raw": "Finalidade: Altera nome, tipo, descrição e situação de ativa de uma lista existente.\nEntrada: id e version: lista alterada e versão lida (controle de concorrência); nome, details.tipo, details.descricao, ativa: novos valores.\nProcessamento: listaMantidaPorGestor: recusa se quem chama não é gestor. Recusa se a versão não confere com a gravada. listaNomeUnico: recusa se outra lista já usa o nome. Grava as alterações; inativar não afeta as tarefas já existentes. quantidadeTarefasAbertas é recalculada, nunca gravada.\nSaída: A lista alterada, com a nova versão, os dados gravados e a quantidade de tarefas abertas.",
          "purpose": "Altera nome, tipo, descrição e situação de ativa de uma lista existente.",
          "input": "id e version: lista alterada e versão lida (controle de concorrência); nome, details.tipo, details.descricao, ativa: novos valores.",
          "processing": "listaMantidaPorGestor: recusa se quem chama não é gestor. Recusa se a versão não confere com a gravada. listaNomeUnico: recusa se outra lista já usa o nome. Grava as alterações; inativar não afeta as tarefas já existentes. quantidadeTarefasAbertas é recalculada, nunca gravada.",
          "output": "A lista alterada, com a nova versão, os dados gravados e a quantidade de tarefas abertas."
        }
      }
    ]
  }
} as const;

export default definition;
