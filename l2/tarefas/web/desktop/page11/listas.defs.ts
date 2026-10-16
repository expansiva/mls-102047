/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/listas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "O gestor vê todas as listas que agrupam as tarefas da equipe, com quantas tarefas abertas cada uma tem, e cadastra novas listas ou altera as existentes.",
  "sections": [
    {
      "id": "cadastroListas",
      "priority": "primary",
      "purpose": "Mostrar as listas de projetos e áreas, se estão ativas e quantas tarefas abertas cada uma ainda tem, para o gestor escolher qual manter.",
      "organisms": [
        "listasCadastradas"
      ]
    },
    {
      "id": "manutencaoLista",
      "priority": "main",
      "purpose": "Ao lado da lista, cadastrar uma nova lista ou alterar nome, tipo, descrição e se a lista ainda recebe tarefas.",
      "organisms": [
        "formularioLista"
      ]
    }
  ],
  "organisms": {
    "listasCadastradas": {
      "kind": "list",
      "text": "Listas que agrupam as tarefas, com nome, tipo (projeto ou área), se está ativa e a quantidade de tarefas abertas em cada uma; escolher uma lista abre seus dados para edição.",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "paginação das listas",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "formularioLista": [
      {
        "role": "nome da lista",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
