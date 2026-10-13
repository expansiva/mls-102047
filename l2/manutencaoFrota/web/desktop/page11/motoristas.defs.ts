/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/motoristas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Permitir ao gestor ver todos os motoristas da transportadora com a situação do cadastro e cadastrar um novo motorista ou corrigir os dados de um existente.",
  "sections": [
    {
      "id": "listaMotoristas",
      "priority": "primary",
      "purpose": "Mostrar os motoristas da transportadora com nome, CPF e situação do cadastro, para o gestor localizar quem precisa ser atualizado.",
      "organisms": [
        "motoristasList"
      ]
    },
    {
      "id": "cadastroMotorista",
      "priority": "main",
      "purpose": "Cadastrar um novo motorista ou atualizar nome, CPF, país, data de nascimento e apelidos do motorista escolhido na lista.",
      "organisms": [
        "motoristaForm"
      ]
    }
  ],
  "organisms": {
    "motoristasList": {
      "kind": "list",
      "text": "Motoristas da transportadora com nome, CPF e situação do cadastro (ativo, inativo, bloqueado); escolher um motorista abre seus dados para atualização.",
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
        "role": "tabela de motoristas com nome, CPF e situação",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "motoristaForm": [
      {
        "role": "nome do motorista",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "CPF do motorista",
        "preferred": "groupentertext--ml-cpf-input"
      },
      {
        "role": "país do documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
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
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
