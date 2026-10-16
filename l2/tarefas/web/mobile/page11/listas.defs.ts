/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, o gestor percorre as listas da equipe com a quantidade de tarefas abertas e abre uma lista para alterá-la ou cadastra uma nova, em conteúdo fluido de coluna estreita (cerca de 390px, utilizável entre 360px e 430px).",
  "sections": [
    {
      "id": "cadastroListas",
      "priority": "primary",
      "purpose": "Mostrar as listas empilhadas, cada uma com nome, tipo, se está ativa e quantas tarefas abertas tem, fáceis de tocar para editar.",
      "organisms": [
        "listasCadastradas"
      ]
    },
    {
      "id": "manutencaoLista",
      "priority": "main",
      "purpose": "Abaixo ou ao tocar numa lista, preencher nome, tipo, descrição e ativa para criar ou salvar a lista.",
      "organisms": [
        "formularioLista"
      ]
    }
  ],
  "organisms": {
    "listasCadastradas": {
      "kind": "list",
      "text": "Listas que agrupam as tarefas, com nome, tipo (projeto ou área), se está ativa e a quantidade de tarefas abertas em cada uma; tocar numa lista abre seus dados para edição.",
      "intents": []
    },
    "formularioLista": {
      "kind": "form",
      "text": "Cadastrar uma nova lista ou alterar o nome, o tipo, a descrição e se a lista está ativa; listas inativas deixam de aparecer na escolha ao criar tarefas.",
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
        "role": "coleção de listas",
        "preferred": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "paginação das listas",
        "preferred": "grouptriggeraction--ml-pagination-control"
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
        "role": "salvar lista",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação ou erro ao salvar",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
