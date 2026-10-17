/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, o gestor consulta as listas com a quantidade de tarefas abertas em uma coluna fluida e abre o formulário para cadastrar ou alterar uma lista, com conteúdo legível de 360px a 430px.",
  "sections": [
    {
      "id": "cadastroListas",
      "priority": "primary",
      "purpose": "Mostrar as listas empilhadas, com nome, tipo, se está ativa e as tarefas abertas, para o gestor tocar na lista que quer alterar.",
      "organisms": [
        "listasCadastradas"
      ]
    },
    {
      "id": "manutencaoLista",
      "priority": "main",
      "purpose": "Formulário em largura total, abaixo da lista ou aberto ao tocar, para criar ou editar uma lista.",
      "organisms": [
        "formularioLista"
      ]
    }
  ],
  "organisms": {
    "listasCadastradas": {
      "kind": "list",
      "text": "Listas que agrupam as tarefas, cada uma com nome, tipo (projeto ou área), se está ativa e a quantidade de tarefas abertas; busca pelo nome no topo.",
      "intents": []
    },
    "formularioLista": {
      "kind": "form",
      "text": "Cadastrar uma nova lista ou alterar o nome, o tipo, a descrição e se está ativa; o nome não pode repetir o de outra lista.",
      "intents": [
        {
          "id": "criarLista",
          "kind": "submit"
        },
        {
          "id": "salvarLista",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listasCadastradas": [
      {
        "role": "listas empilhadas com tarefas abertas",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "busca pelo nome da lista",
        "preferred": "groupsearchcontent--ml-search-bar"
      }
    ],
    "formularioLista": [
      {
        "role": "nome da lista",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "descrição da lista",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "salvar ou criar lista",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação ou erro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
