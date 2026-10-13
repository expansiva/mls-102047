/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/oficinas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Permitir ao gestor manter o cadastro das oficinas que executam as ordens de manutenção da frota: localizar uma oficina pelo nome ou CNPJ, ver a situação do cadastro e cadastrar uma nova oficina ou corrigir os dados de uma existente.",
  "sections": [
    {
      "id": "listaOficinas",
      "priority": "primary",
      "purpose": "Mostrar todas as oficinas da transportadora com nome, CNPJ, razão social e situação, para o gestor reconhecer onde as ordens podem ser executadas e escolher qual oficina abrir para edição.",
      "organisms": [
        "oficinasList"
      ]
    },
    {
      "id": "edicaoOficina",
      "priority": "main",
      "purpose": "Ao lado da lista, cadastrar uma nova oficina ou atualizar a oficina escolhida: identificação, dados de pessoa jurídica, endereço onde os veículos são levados e observações.",
      "organisms": [
        "oficinaForm"
      ]
    }
  ],
  "organisms": {
    "oficinasList": {
      "kind": "list",
      "text": "Oficinas que executam as ordens de manutenção, com nome, CNPJ, razão social, nome fantasia e situação do cadastro (ativa ou inativa). Selecionar uma oficina abre seus dados no formulário para atualização.",
      "intents": []
    },
    "oficinaForm": {
      "kind": "form",
      "text": "Cadastrar ou atualizar uma oficina: nome pelo qual o gestor a reconhece, tipo e número do documento (normalmente CNPJ, para evitar duplicidade), país, tipo de organização, razão social, nome fantasia, outros nomes, endereço e observações.",
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
        "role": "Tabela das oficinas com ordenação por nome e situação e seleção da oficina a editar",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "oficinaForm": [
      {
        "role": "Nome da oficina, número do documento, razão social e nome fantasia",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Tipo de documento e país da oficina",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Tipo de organização: pessoa jurídica, filial ou franquia",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
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
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
