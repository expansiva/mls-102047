/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/compradores.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, o gerente de compras localiza um comprador pelo nome em uma lista estreita e fluida e abre o cadastro para incluir ou alterar os dados, em tela de cerca de 390px, usável também em 360px e 430px.",
  "sections": [
    {
      "id": "listaCompradores",
      "priority": "primary",
      "purpose": "Lista empilhada de compradores com nome em destaque, documento e situação logo abaixo, para tocar e abrir o cadastro.",
      "organisms": [
        "compradoresList"
      ]
    },
    {
      "id": "cadastroComprador",
      "priority": "main",
      "purpose": "Formulário em uma coluna para cadastrar ou alterar o comprador, com o botão de salvar ao final.",
      "organisms": [
        "compradorForm"
      ]
    }
  ],
  "organisms": {
    "compradoresList": {
      "kind": "list",
      "text": "Compradores da organização com nome, documento e situação (ativo, inativo); tocar em um comprador abre seus dados para alteração.",
      "intents": []
    },
    "compradorForm": {
      "kind": "form",
      "text": "Cadastrar ou alterar um comprador: nome, tipo e número do documento, país e consentimento de privacidade exigido para residentes no Brasil.",
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
        "role": "lista de compradores",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "busca por nome",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "paginação",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "compradorForm": [
      {
        "role": "nome do comprador",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
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
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
      },
      {
        "role": "salvar comprador",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação de gravação",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
