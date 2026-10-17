/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/processWizard/page21.md",
    "experience": "linearStepper"
  },
  "intent": "Receber o responsável com os dados que a plataforma já tem da empresa, mostrar só os dados obrigatórios que ainda faltam e permitir completá-los para que a empresa fique preparada e ele possa seguir ao Studio.",
  "sections": [
    {
      "id": "boasVindas",
      "priority": "primary",
      "purpose": "Dar boas-vindas e mostrar a situação da empresa: os dados já registrados e se ela já está preparada, com a orientação para o Studio quando estiver.",
      "organisms": [
        "boasVindasEmpresa"
      ]
    },
    {
      "id": "pendencias",
      "priority": "main",
      "purpose": "Deixar claro o que ainda falta e permitir completar apenas esses dados, sem repetir o que a plataforma já tem.",
      "organisms": [
        "dadosFaltantesEmpresa",
        "completarDadosEmpresa"
      ]
    },
    {
      "id": "proximosPassos",
      "priority": "secondary",
      "purpose": "Salvar os dados informados e seguir para as pessoas da organização.",
      "organisms": [
        "acoesEmpresa"
      ]
    }
  ],
  "organisms": {
    "boasVindasEmpresa": {
      "kind": "detail",
      "text": "Boas-vindas ao responsável com o nome, o documento, o endereço e os contatos que a empresa já tem, e o indicador de empresa preparada; quando a empresa estiver preparada, mostra a orientação para criar o primeiro módulo no Studio.",
      "intents": []
    },
    "dadosFaltantesEmpresa": {
      "kind": "summary",
      "text": "Lista dos dados obrigatórios da empresa que ainda faltam entre nome, documento, endereço e contato, para o responsável saber exatamente o que completar.",
      "intents": []
    },
    "completarDadosEmpresa": {
      "kind": "form",
      "text": "Campos apenas para os dados obrigatórios que faltam: nome e razão social, tipo e número do documento, país, endereço, além dos contatos da empresa já ligados.",
      "intents": []
    },
    "acoesEmpresa": {
      "kind": "actions",
      "text": "Salvar os dados da empresa e ver as pessoas da organização e quem ainda não completou o acesso.",
      "intents": [
        {
          "id": "salvarDadosEmpresa",
          "kind": "submit"
        },
        {
          "id": "verPessoasOrganizacao",
          "kind": "navigate",
          "to": "pessoas_organizacao"
        }
      ]
    }
  },
  "molecules": {
    "boasVindasEmpresa": [
      {
        "role": "Cartão com os dados da empresa e boas-vindas",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Indicador de empresa preparada",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "dadosFaltantesEmpresa": [
      {
        "role": "Aviso dos dados obrigatórios que faltam",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "completarDadosEmpresa": [
      {
        "role": "Nome, razão social e número do documento",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "País da empresa",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "Endereço da empresa",
        "preferred": "groupentertext--ml-address-field",
        "alternative": "grouplocateposition--ml-address-autocomplete"
      }
    ],
    "acoesEmpresa": [
      {
        "role": "Salvar dados da empresa",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Ver pessoas da organização",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
