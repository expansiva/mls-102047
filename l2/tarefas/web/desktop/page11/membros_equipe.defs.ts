/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/membros_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "O gestor consulta todas as pessoas da equipe que podem criar tarefas e ser responsáveis, e cadastra uma nova pessoa ou corrige o nome e o país de quem já está na equipe.",
  "sections": [
    {
      "id": "equipeCadastrada",
      "priority": "primary",
      "purpose": "Mostrar quem faz parte da equipe, com nome, situação no cadastro, país e contatos, para o gestor saber quem pode receber tarefas e escolher quem atualizar.",
      "organisms": [
        "pessoasEquipe"
      ]
    },
    {
      "id": "manutencaoPessoa",
      "priority": "main",
      "purpose": "Cadastrar uma nova pessoa na equipe ou atualizar o nome e o país da pessoa selecionada, mantendo correto como ela aparece nas tarefas.",
      "organisms": [
        "cadastroPessoa"
      ]
    }
  ],
  "organisms": {
    "pessoasEquipe": {
      "kind": "list",
      "text": "Pessoas da equipe que podem criar tarefas e ser responsáveis, com nome, situação no cadastro (ativas recebem tarefas), país e contatos; ao escolher uma pessoa, seus dados abrem no cadastro ao lado.",
      "intents": []
    },
    "cadastroPessoa": {
      "kind": "form",
      "text": "Cadastrar ou atualizar o nome e os dados de uma pessoa da equipe: nome como aparece nas tarefas e país que define as regras de privacidade.",
      "intents": [
        {
          "id": "cadastrarPessoa",
          "kind": "submit"
        },
        {
          "id": "salvarAlteracoesPessoa",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "pessoasEquipe": [
      {
        "role": "tabela de pessoas da equipe",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      },
      {
        "role": "busca por nome na lista",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "paginação da lista",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "cadastroPessoa": [
      {
        "role": "nome e país da pessoa",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
