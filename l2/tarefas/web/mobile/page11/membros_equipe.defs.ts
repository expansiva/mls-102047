/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/membros_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, deixar o gestor consultar as pessoas da equipe em uma coluna estreita e fluida (por volta de 390px, também usável em 360px e 430px) e cadastrar ou corrigir uma pessoa sem sair da página.",
  "sections": [
    {
      "id": "equipe",
      "priority": "primary",
      "purpose": "Lista compacta das pessoas da equipe, com nome e situação em destaque e busca pelo nome no topo, para chegar rápido a quem precisa ser revisado.",
      "organisms": [
        "pessoasEquipe"
      ]
    },
    {
      "id": "cadastro",
      "priority": "main",
      "purpose": "Formulário curto, logo abaixo da lista ou aberto ao tocar em uma pessoa, para cadastrar alguém novo ou atualizar nome e país.",
      "organisms": [
        "cadastroPessoa"
      ]
    }
  ],
  "organisms": {
    "pessoasEquipe": {
      "kind": "list",
      "text": "Pessoas da equipe que podem criar tarefas e ser responsáveis, com nome e situação no cadastro em primeiro plano, e país e contatos em seguida. Tocar em uma pessoa abre o cadastro dela para editar.",
      "intents": []
    },
    "cadastroPessoa": {
      "kind": "form",
      "text": "Cadastrar uma nova pessoa da equipe ou atualizar o nome e o país da pessoa escolhida. O botão de salvar fica sempre ao alcance do polegar.",
      "intents": [
        {
          "id": "cadastrarPessoa",
          "kind": "submit"
        },
        {
          "id": "salvarAlteracoes",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "pessoasEquipe": [
      {
        "role": "lista de pessoas em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "busca por nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "paginação da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "cadastroPessoa": [
      {
        "role": "nome da pessoa",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "país da pessoa",
        "preferred": "groupentertext--ml-enter-text"
      },
      {
        "role": "salvar cadastro",
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
