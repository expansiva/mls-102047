/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "listas",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/createLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getLista.defs.ts",
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
          "raw": "Finalidade: Carrega, ao abrir a página, todas as listas da organização para o gestor escolher qual manter.\nEntrada: Nenhuma entrada; o escopo é a organização do gestor da sessão.\nProcessamento: Busca todas as listas (ativas e inativas) ordenadas por nome. Para cada lista calcula quantidadeTarefasAbertas contando as tarefas com listaId igual à lista e situação aFazer, emAndamento ou emRevisao; é um campo derivado, calculado na consulta e nunca gravado. Lista não paginada, pois o número de listas de projetos e áreas cabe numa tela.\nSaída: Lista de ListaResumo com id, nome, ativa, tipo e quantidade de tarefas abertas, no formato que o cadastro exibe.",
          "purpose": "Carrega, ao abrir a página, todas as listas da organização para o gestor escolher qual manter.",
          "input": "Nenhuma entrada; o escopo é a organização do gestor da sessão.",
          "processing": "Busca todas as listas (ativas e inativas) ordenadas por nome. Para cada lista calcula quantidadeTarefasAbertas contando as tarefas com listaId igual à lista e situação aFazer, emAndamento ou emRevisao; é um campo derivado, calculado na consulta e nunca gravado. Lista não paginada, pois o número de listas de projetos e áreas cabe numa tela.",
          "output": "Lista de ListaResumo com id, nome, ativa, tipo e quantidade de tarefas abertas, no formato que o cadastro exibe."
        }
      },
      {
        "route": "tarefas.listas.obterLista",
        "kind": "qry",
        "uses": [
          "getLista"
        ],
        "transaction": "none",
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
        "params": [
          {
            "name": "listaId",
            "target": "lista",
            "field": "nome"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Abre os dados de uma lista escolhida no cadastro para edição no formulário.\nEntrada: listaId: id da lista selecionada no cadastro.\nProcessamento: Lê a lista pelo id (read.byId) dentro da organização do gestor.\nSaída: ListaEdicao com id, version, nome, ativa, tipo e descrição, para preencher o formulário e enviar a versão ao salvar.",
          "purpose": "Abre os dados de uma lista escolhida no cadastro para edição no formulário.",
          "input": "listaId: id da lista selecionada no cadastro.",
          "processing": "Lê a lista pelo id (read.byId) dentro da organização do gestor.",
          "output": "ListaEdicao com id, version, nome, ativa, tipo e descrição, para preencher o formulário e enviar a versão ao salvar."
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
          },
          {
            "kind": "entity",
            "path": "registro",
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
          "raw": "Finalidade: Cadastra uma nova lista de projeto ou área.\nEntrada: nome: nome da lista; ativa: se recebe novas tarefas; tipo: project ou area; descricao: texto livre opcional.\nProcessamento: listaMantidaPorGestor: recusa se o usuário da sessão não for gestor. listaNomeUnico: recusa se já existir lista com o mesmo nome. Grava a lista; id e version são gerados pelo sistema; quantidadeTarefasAbertas é calculada (zero para lista nova), nunca gravada.\nSaída: lista: a linha ListaResumo para inserir no cadastro; registro: ListaEdicao com id e version para o formulário continuar em edição sem nova chamada.",
          "purpose": "Cadastra uma nova lista de projeto ou área.",
          "input": "nome: nome da lista; ativa: se recebe novas tarefas; tipo: project ou area; descricao: texto livre opcional.",
          "processing": "listaMantidaPorGestor: recusa se o usuário da sessão não for gestor. listaNomeUnico: recusa se já existir lista com o mesmo nome. Grava a lista; id e version são gerados pelo sistema; quantidadeTarefasAbertas é calculada (zero para lista nova), nunca gravada.",
          "output": "lista: a linha ListaResumo para inserir no cadastro; registro: ListaEdicao com id e version para o formulário continuar em edição sem nova chamada."
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
          },
          {
            "kind": "entity",
            "path": "registro",
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
          "raw": "Finalidade: Altera nome, tipo, descrição e situação ativa de uma lista existente.\nEntrada: id e version: lista editada e versão lida (controle de concorrência); nome, ativa, tipo, descricao: novos valores.\nProcessamento: listaMantidaPorGestor: recusa se o usuário não for gestor. listaNomeUnico: recusa se outra lista já tiver o mesmo nome. Recusa se a version não for a atual. Ao inativar, a lista deixa de aparecer na escolha ao criar tarefas. quantidadeTarefasAbertas é recalculada na resposta, nunca gravada.\nSaída: lista: a linha ListaResumo atualizada para substituir no cadastro; registro: ListaEdicao com a nova version para o formulário.",
          "purpose": "Altera nome, tipo, descrição e situação ativa de uma lista existente.",
          "input": "id e version: lista editada e versão lida (controle de concorrência); nome, ativa, tipo, descricao: novos valores.",
          "processing": "listaMantidaPorGestor: recusa se o usuário não for gestor. listaNomeUnico: recusa se outra lista já tiver o mesmo nome. Recusa se a version não for a atual. Ao inativar, a lista deixa de aparecer na escolha ao criar tarefas. quantidadeTarefasAbertas é recalculada na resposta, nunca gravada.",
          "output": "lista: a linha ListaResumo atualizada para substituir no cadastro; registro: ListaEdicao com a nova version para o formulário."
        }
      }
    ]
  }
} as const;

export default definition;
