/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/oficinas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, permitir ao gestor encontrar uma oficina da frota e conferir sua situação, e cadastrar ou corrigir uma oficina num formulário de coluna única, fluido em torno de 390px e utilizável de 360px a 430px.",
  "sections": [
    {
      "id": "listaOficinas",
      "priority": "primary",
      "purpose": "Lista empilhada das oficinas com nome em destaque, CNPJ e situação, para o gestor achar rapidamente a oficina e tocar para editá-la.",
      "organisms": [
        "oficinasList"
      ]
    },
    {
      "id": "edicaoOficina",
      "priority": "main",
      "purpose": "Formulário em coluna única, aberto ao tocar numa oficina ou ao iniciar um novo cadastro, com os campos de identificação primeiro e o botão de salvar sempre ao alcance.",
      "organisms": [
        "oficinaForm"
      ]
    }
  ],
  "organisms": {
    "oficinasList": {
      "kind": "list",
      "text": "Oficinas que executam as ordens de manutenção, mostrando nome, CNPJ e se o cadastro está ativo ou inativo. Tocar numa oficina abre seus dados para atualização.",
      "intents": []
    },
    "oficinaForm": {
      "kind": "form",
      "text": "Cadastrar ou atualizar uma oficina: nome, tipo e número do documento, país, tipo de organização, razão social, nome fantasia, outros nomes, endereço e observações.",
      "intents": [
        {
          "id": "cadastrarOficina",
          "kind": "submit"
        },
        {
          "id": "atualizarOficina",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "oficinasList": [
      {
        "role": "Lista empilhada das oficinas para tela estreita, com toque para abrir a oficina",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "oficinaForm": [
      {
        "role": "Nome da oficina, número do documento, razão social e nome fantasia",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Tipo de documento e país da oficina",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Tipo de organização: pessoa jurídica, filial ou franquia",
        "preferred": "groupselectone--ml-radio-group",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Outros nomes pelos quais a oficina é conhecida",
        "preferred": "groupentertext--ml-tag-input"
      },
      {
        "role": "Endereço onde os veículos são levados",
        "preferred": "groupentertext--ml-address-field",
        "alternative": "grouplocateposition--ml-address-autocomplete"
      },
      {
        "role": "Observações sobre a oficina",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "Salvar a oficina nova ou as alterações",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
