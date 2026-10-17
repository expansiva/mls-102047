/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/meu_cadastro.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Em tela estreita e fluida (cerca de 390px, usável em 360px e 430px), mostrar primeiro o aviso e a situação do próprio cadastro, depois só os dados mínimos que faltam com o botão de salvar, e por fim o andamento da liberação.",
  "sections": [
    {
      "id": "situacaoCadastro",
      "priority": "primary",
      "purpose": "Mostrar logo no topo o aviso de liberação, quando houver, e um resumo compacto do cadastro e do acesso.",
      "organisms": [
        "avisoLiberacao",
        "meuCadastroResumo"
      ]
    },
    {
      "id": "completarDados",
      "priority": "main",
      "purpose": "Pedir, em coluna única, apenas os dados mínimos que faltam e salvar com um toque.",
      "organisms": [
        "dadosMinimosForm",
        "acoesMeuCadastro"
      ]
    },
    {
      "id": "andamentoPedido",
      "priority": "secondary",
      "purpose": "Mostrar de forma compacta em que ponto está o pedido de liberação.",
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
        "alternative": "groupviewcard--ml-vertical-card"
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
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
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
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "andamentoLiberacao": [
      {
        "role": "etapas da liberação",
        "preferred": "groupnavigatesteps--ml-compact-step-indicator",
        "alternative": "groupnavigatesteps--ml-vertical-stepper"
      }
    ]
  }
} as const;
