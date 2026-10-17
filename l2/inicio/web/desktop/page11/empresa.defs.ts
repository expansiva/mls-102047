/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Permitir que o responsável abra o cadastro da própria empresa, veja se ela já está preparada e complete apenas os dados obrigatórios que ainda faltam: nome, documento, endereço e contato.",
  "sections": [
    {
      "id": "situacaoEmpresa",
      "priority": "primary",
      "purpose": "Mostrar logo de início os dados que a plataforma já tem da empresa e se ela já consta como preparada.",
      "organisms": [
        "dadosEmpresa"
      ]
    },
    {
      "id": "pendencias",
      "priority": "main",
      "purpose": "Mostrar só os dados obrigatórios que faltam e a orientação final com o link para criar o primeiro módulo no Studio.",
      "organisms": [
        "pendenciasEmpresa"
      ]
    },
    {
      "id": "completarDados",
      "priority": "main",
      "purpose": "Deixar o responsável informar e confirmar só os dados que faltam, sem pedir de novo o que já existe.",
      "organisms": [
        "completarDadosEmpresa"
      ]
    }
  ],
  "organisms": {
    "dadosEmpresa": {
      "kind": "detail",
      "text": "Abra os dados da sua empresa: nome, razão social, documento, país, endereços e contatos já cadastrados. Veja também se ela já está marcada como preparada.",
      "intents": []
    },
    "pendenciasEmpresa": {
      "kind": "summary",
      "text": "Veja quais dados obrigatórios ainda faltam (nome, documento, endereço ou contato) e a orientação para completá-los. Quando estiver tudo completo, aparece o texto de orientação com o link para criar o primeiro módulo no Studio.",
      "intents": []
    },
    "completarDadosEmpresa": {
      "kind": "form",
      "text": "Complete só os dados obrigatórios da empresa que ainda faltam e confirme. Com todos os dados completos, a empresa passa a constar como preparada.",
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
        "role": "Cartão com os dados da empresa e a indicação de preparada",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "pendenciasEmpresa": [
      {
        "role": "Aviso fixo com os dados que faltam ou com a orientação final",
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
        "role": "Endereço da empresa",
        "preferred": "groupentertext--ml-address-field",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "Confirmar os dados da empresa",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
