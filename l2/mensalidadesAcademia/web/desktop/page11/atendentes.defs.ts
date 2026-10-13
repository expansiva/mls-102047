/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/atendentes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Permitir que a gerência veja todas as pessoas que trabalham na recepção da academia e mantenha o cadastro de cada atendente atualizado, incluindo novos atendentes, sem duplicar ninguém.",
  "sections": [
    {
      "id": "equipe",
      "priority": "primary",
      "purpose": "Mostrar a equipe da recepção com nome, documento e situação no cadastro, para a gerência encontrar rapidamente quem precisa revisar.",
      "organisms": [
        "equipeRecepcao"
      ]
    },
    {
      "id": "cadastro",
      "priority": "main",
      "purpose": "Ao lado da lista, abrir os dados do atendente escolhido para atualização ou um cadastro em branco para incluir uma nova pessoa.",
      "organisms": [
        "cadastroAtendente"
      ]
    }
  ],
  "organisms": {
    "equipeRecepcao": {
      "kind": "list",
      "text": "Pessoas que trabalham na recepção, com nome, apelidos, documento e se o cadastro está ativo ou inativo. Escolher uma pessoa abre seus dados para atualização.",
      "intents": []
    },
    "cadastroAtendente": {
      "kind": "form",
      "text": "Cadastrar um novo atendente ou atualizar nome, apelidos, documento, país e consentimento de privacidade de quem já está na equipe.",
      "intents": [
        {
          "id": "cadastrarAtendente",
          "kind": "submit"
        },
        {
          "id": "salvarAtendente",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "equipeRecepcao": [
      {
        "role": "Tabela da equipe da recepção",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      },
      {
        "role": "Busca de atendente pelo nome ou documento",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Novo atendente",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "cadastroAtendente": [
      {
        "role": "Nome e número do documento",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Número do CPF",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Apelidos",
        "preferred": "groupentertext--ml-tag-input"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "País",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "Salvar cadastro",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação ou erro ao salvar",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
