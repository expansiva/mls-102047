/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/meu_cadastro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Mostrar à pessoa o próprio cadastro na organização, avisar quando o acesso depende da liberação do responsável e permitir completar só os dados mínimos que faltam para seguir aos módulos liberados.",
  "sections": [
    {
      "id": "situacaoCadastro",
      "priority": "primary",
      "purpose": "Mostrar logo de início quem é a pessoa na organização, se o acesso está completo e qualquer aviso que impeça seguir.",
      "organisms": [
        "meuCadastroResumo",
        "avisoLiberacao"
      ]
    },
    {
      "id": "completarDados",
      "priority": "main",
      "purpose": "Pedir apenas os dados mínimos que ainda faltam, o telefone opcional e o consentimento quando a lei do país exige, e salvar.",
      "organisms": [
        "dadosMinimosForm",
        "acoesMeuCadastro"
      ]
    },
    {
      "id": "andamentoPedido",
      "priority": "secondary",
      "purpose": "Acompanhar em que ponto está o pedido de liberação do acesso.",
      "organisms": [
        "andamentoLiberacao"
      ]
    }
  ],
  "organisms": {
    "meuCadastroResumo": {
      "kind": "detail",
      "text": "Seus dados na organização: nome, país, e-mail da conta (apenas exibido) e telefones, o nome da empresa, se o acesso está completo, o que ainda falta e os módulos que o responsável liberou para você.",
      "intents": []
    },
    "avisoLiberacao": {
      "kind": "alerts",
      "text": "Aviso de que já existe outro cadastro com o mesmo e-mail de contato e de que o responsável precisa liberar o seu acesso. Ele fica visível até a liberação, mesmo que você volte por outro navegador.",
      "intents": []
    },
    "dadosMinimosForm": {
      "kind": "form",
      "text": "Informe só os dados mínimos que ainda faltam: nome, país e telefone opcional. O consentimento de privacidade aparece apenas quando a lei do país exige (Brasil e União Europeia). Repetir o envio não cria outro cadastro.",
      "intents": []
    },
    "acoesMeuCadastro": {
      "kind": "actions",
      "text": "Salvar meus dados. O pedido de liberação fica com o responsável. Depois de completar os dados mínimos, você segue para os módulos liberados.",
      "intents": [
        {
          "id": "salvarMeusDados",
          "kind": "submit"
        }
      ]
    },
    "andamentoLiberacao": {
      "kind": "timeline",
      "text": "Andamento do seu pedido de liberação: encaminhado ao responsável, liberado e login ligado pela plataforma.",
      "intents": []
    }
  },
  "molecules": {
    "meuCadastroResumo": [
      {
        "role": "cartão do próprio cadastro com situação do acesso",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "avisoLiberacao": [
      {
        "role": "aviso persistente de liberação pendente",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "dadosMinimosForm": [
      {
        "role": "nome",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "país",
        "preferred": "groupentertext--ml-enter-text"
      },
      {
        "role": "telefone opcional",
        "preferred": "groupentertext--ml-phone-input"
      },
      {
        "role": "consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference"
      }
    ],
    "acoesMeuCadastro": [
      {
        "role": "salvar meus dados",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ],
    "andamentoLiberacao": [
      {
        "role": "etapas da liberação",
        "preferred": "groupnavigatesteps--ml-vertical-stepper",
        "alternative": "groupnavigatesteps--ml-horizontal-stepper"
      }
    ]
  }
} as const;
