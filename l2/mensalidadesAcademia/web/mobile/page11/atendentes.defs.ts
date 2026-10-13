/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/atendentes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, a gerência consulta a equipe da recepção e abre o cadastro de um atendente para atualizar ou incluir alguém, em conteúdo fluido de coluna única pensado para cerca de 390px e usável entre 360px e 430px.",
  "sections": [
    {
      "id": "equipe",
      "priority": "primary",
      "purpose": "Lista compacta da equipe da recepção, com nome e situação em destaque, para tocar e abrir o cadastro.",
      "organisms": [
        "equipeRecepcao"
      ]
    },
    {
      "id": "cadastro",
      "priority": "main",
      "purpose": "Formulário empilhado abaixo da lista, ou em seu lugar ao escolher alguém, para cadastrar ou atualizar o atendente.",
      "organisms": [
        "cadastroAtendente"
      ]
    }
  ],
  "organisms": {
    "equipeRecepcao": {
      "kind": "list",
      "text": "Pessoas que trabalham na recepção, mostrando nome, documento e se estão ativas. Tocar em uma pessoa abre seus dados.",
      "intents": []
    },
    "cadastroAtendente": {
      "kind": "form",
      "text": "Cadastrar um novo atendente ou atualizar nome, apelidos, documento, país e consentimento de privacidade, com o botão de salvar sempre ao alcance.",
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
        "role": "Lista da equipe da recepção",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Busca de atendente pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Novo atendente",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "cadastroAtendente": [
      {
        "role": "Nome e número do documento",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
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
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "País",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
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
