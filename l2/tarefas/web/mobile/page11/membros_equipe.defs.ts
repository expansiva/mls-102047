/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/membros_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Em tela estreita e fluida (cerca de 390px, também usável em 360px e 430px), o gestor percorre as pessoas da equipe e abre uma delas para corrigir nome e país, ou cadastra uma nova pessoa.",
  "sections": [
    {
      "id": "equipeCadastrada",
      "priority": "primary",
      "purpose": "Lista compacta das pessoas da equipe, com nome e situação em destaque e país e contatos em segundo plano, para achar rapidamente quem atualizar.",
      "organisms": [
        "pessoasEquipe"
      ]
    },
    {
      "id": "manutencaoPessoa",
      "priority": "main",
      "purpose": "Formulário em coluna única para cadastrar uma pessoa ou atualizar a selecionada, com o botão de salvar sempre ao alcance.",
      "organisms": [
        "cadastroPessoa"
      ]
    }
  ],
  "organisms": {
    "pessoasEquipe": {
      "kind": "list",
      "text": "Pessoas da equipe que podem criar tarefas e ser responsáveis, mostrando nome e situação no cadastro; tocar em uma pessoa abre seus dados para edição.",
      "intents": []
    },
    "cadastroPessoa": {
      "kind": "form",
      "text": "Cadastrar ou atualizar o nome e os dados de uma pessoa da equipe: nome como aparece nas tarefas e país.",
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
        "role": "nome e país da pessoa",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
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
