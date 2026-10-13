/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/compradores.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Permitir ao gerente de compras localizar os compradores da organização, ver nome, documento e situação de cada um, e cadastrar um novo comprador ou alterar os dados de um existente.",
  "sections": [
    {
      "id": "listaCompradores",
      "priority": "primary",
      "purpose": "Mostrar os compradores da organização com nome, documento e situação, para localizar rapidamente quem está ativo e escolher quem alterar.",
      "organisms": [
        "compradoresList"
      ]
    },
    {
      "id": "cadastroComprador",
      "priority": "main",
      "purpose": "Cadastrar um novo comprador ou alterar nome, documento, país e consentimento de privacidade do comprador escolhido na lista.",
      "organisms": [
        "compradorForm"
      ]
    }
  ],
  "organisms": {
    "compradoresList": {
      "kind": "list",
      "text": "Compradores da organização com nome, tipo e número do documento, país e situação (ativo, inativo); escolher um comprador abre seus dados para alteração.",
      "intents": []
    },
    "compradorForm": {
      "kind": "form",
      "text": "Cadastrar ou alterar um comprador: nome, tipo e número do documento para evitar duplicidade, país e consentimento de privacidade exigido para residentes no Brasil.",
      "intents": [
        {
          "id": "cadastrarComprador",
          "kind": "submit"
        },
        {
          "id": "salvarAlteracaoComprador",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "compradoresList": [
      {
        "role": "tabela de compradores",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "busca por nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "paginação",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "compradorForm": [
      {
        "role": "nome do comprador",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "número do documento",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "país",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "salvar comprador",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação de gravação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
