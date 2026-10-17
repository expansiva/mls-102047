/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/processWizard/page21.md",
    "experience": "linearStepper"
  },
  "intent": "No celular, mostrar logo de início se a empresa está preparada e o que falta, e permitir completar só esses dados em uma coluna fluida de cerca de 390px, que também funciona em 360px e 430px.",
  "sections": [
    {
      "id": "boasVindas",
      "priority": "primary",
      "purpose": "Boas-vindas curtas com o indicador de empresa preparada e os dados já registrados; quando preparada, mostra a orientação para o Studio.",
      "organisms": [
        "boasVindasEmpresa"
      ]
    },
    {
      "id": "pendencias",
      "priority": "main",
      "purpose": "Mostrar primeiro o aviso do que falta e, logo abaixo, os campos apenas desses dados, empilhados na largura estreita.",
      "organisms": [
        "dadosFaltantesEmpresa",
        "completarDadosEmpresa"
      ]
    },
    {
      "id": "proximosPassos",
      "priority": "secondary",
      "purpose": "Ações ao final do conteúdo, com largura total para o toque: salvar e ver as pessoas da organização.",
      "organisms": [
        "acoesEmpresa"
      ]
    }
  ],
  "organisms": {
    "boasVindasEmpresa": {
      "kind": "detail",
      "text": "Boas-vindas com o indicador de empresa preparada em destaque e um resumo do nome, documento, endereço e contatos já registrados; quando preparada, a orientação para criar o primeiro módulo no Studio.",
      "intents": []
    },
    "dadosFaltantesEmpresa": {
      "kind": "summary",
      "text": "Aviso compacto com os dados obrigatórios que ainda faltam entre nome, documento, endereço e contato.",
      "intents": []
    },
    "completarDadosEmpresa": {
      "kind": "form",
      "text": "Campos em uma única coluna só para o que falta: nome e razão social, tipo e número do documento, país e endereço, com os contatos da empresa já ligados visíveis.",
      "intents": []
    },
    "acoesEmpresa": {
      "kind": "actions",
      "text": "Salvar os dados da empresa e ver as pessoas da organização.",
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
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Indicador de empresa preparada",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "dadosFaltantesEmpresa": [
      {
        "role": "Aviso dos dados obrigatórios que faltam",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "completarDadosEmpresa": [
      {
        "role": "Nome, razão social e número do documento",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "País da empresa",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
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
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
