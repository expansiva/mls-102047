/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "No celular, deixar o responsável ver logo se a empresa está preparada e o que falta, e completar só os dados obrigatórios em um conteúdo fluido e estreito (cerca de 390px, também usável em 360px e 430px).",
  "sections": [
    {
      "id": "situacaoEmpresa",
      "priority": "primary",
      "purpose": "Mostrar no topo, de forma compacta, os dados da empresa e se ela já está preparada.",
      "organisms": [
        "dadosEmpresa"
      ]
    },
    {
      "id": "pendencias",
      "priority": "main",
      "purpose": "Mostrar logo abaixo os dados obrigatórios que faltam e, quando tudo estiver completo, a orientação com o link para o Studio.",
      "organisms": [
        "pendenciasEmpresa"
      ]
    },
    {
      "id": "completarDados",
      "priority": "main",
      "purpose": "Mostrar em uma única coluna só os campos que faltam, com a confirmação ao final e fácil de alcançar.",
      "organisms": [
        "completarDadosEmpresa"
      ]
    }
  ],
  "organisms": {
    "dadosEmpresa": {
      "kind": "detail",
      "text": "Veja de forma resumida os dados da sua empresa e se ela já está marcada como preparada.",
      "intents": []
    },
    "pendenciasEmpresa": {
      "kind": "summary",
      "text": "Veja os dados obrigatórios que ainda faltam e a orientação para completá-los. Com tudo completo, aparece o link para criar o primeiro módulo no Studio.",
      "intents": []
    },
    "completarDadosEmpresa": {
      "kind": "form",
      "text": "Complete só os dados obrigatórios que faltam e confirme para deixar a empresa preparada.",
      "intents": [
        {
          "id": "confirmarDadosEmpresa",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "dadosEmpresa": [
      {
        "role": "Cartão compacto com os dados da empresa e a indicação de preparada",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "pendenciasEmpresa": [
      {
        "role": "Aviso com os dados que faltam ou com a orientação final",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "completarDadosEmpresa": [
      {
        "role": "Nome, razão social e número do documento",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Endereço da empresa",
        "preferred": "groupentertext--ml-address-field"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select-dropdown",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Confirmar os dados da empresa",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
