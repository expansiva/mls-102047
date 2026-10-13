/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/motoristas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px (usável entre 360px e 430px), o gestor consulta os motoristas e a situação do cadastro e cadastra ou atualiza um motorista.",
  "sections": [
    {
      "id": "listaMotoristas",
      "priority": "primary",
      "purpose": "Lista compacta de motoristas com nome e situação do cadastro, com o CPF logo abaixo, para tocar e abrir os dados.",
      "organisms": [
        "motoristasList"
      ]
    },
    {
      "id": "cadastroMotorista",
      "priority": "main",
      "purpose": "Formulário empilhado para cadastrar um motorista ou atualizar o escolhido, com o botão de salvar ao final.",
      "organisms": [
        "motoristaForm"
      ]
    }
  ],
  "organisms": {
    "motoristasList": {
      "kind": "list",
      "text": "Motoristas da transportadora com nome, CPF e situação do cadastro; tocar em um motorista abre seus dados para atualização.",
      "intents": []
    },
    "motoristaForm": {
      "kind": "form",
      "text": "Cadastrar ou atualizar um motorista: nome, CPF, país do documento, data de nascimento e apelidos.",
      "intents": [
        {
          "id": "cadastrarMotorista",
          "kind": "submit"
        },
        {
          "id": "atualizarMotorista",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "motoristasList": [
      {
        "role": "lista empilhada de motoristas com situação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "motoristaForm": [
      {
        "role": "nome do motorista",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "CPF do motorista",
        "preferred": "groupentertext--ml-cpf-input"
      },
      {
        "role": "país do documento",
        "preferred": "groupselectone--ml-select"
      },
      {
        "role": "data de nascimento",
        "preferred": "groupenterdate--ml-date-picker"
      },
      {
        "role": "apelidos do motorista",
        "preferred": "groupentertext--ml-tag-input"
      },
      {
        "role": "salvar cadastro",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação de cadastro salvo",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
