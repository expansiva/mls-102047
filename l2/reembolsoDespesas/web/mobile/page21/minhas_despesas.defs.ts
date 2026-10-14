/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page21/minhas_despesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templatesTest/decisionFirst/page21.md",
    "experience": "decisionFirst"
  },
  "intent": "Em tela estreita e fluida, por volta de 390px e ainda usável entre 360px e 430px, deixar o colaborador acompanhar suas despesas, abrir uma de cada vez, registrar ou corrigir e enviar ou reenviar para aprovação.",
  "sections": [
    {
      "id": "acompanhamento",
      "priority": "primary",
      "purpose": "Mostrar as despesas do colaborador numa lista empilhada, com situação e valor bem visíveis, para tocar e abrir a que interessa.",
      "organisms": [
        "listaMinhasDespesas"
      ]
    },
    {
      "id": "despesaSelecionada",
      "priority": "main",
      "purpose": "Mostrar a despesa aberta em leitura vertical, com o motivo da rejeição em destaque quando houver, e logo abaixo as ações de envio ou reenvio.",
      "organisms": [
        "detalheDespesa",
        "acoesEnvio"
      ]
    },
    {
      "id": "registroCorrecao",
      "priority": "secondary",
      "purpose": "Oferecer um formulário em coluna única para registrar uma despesa nova ou corrigir uma rejeitada, com o comprovante anexado.",
      "organisms": [
        "formularioDespesa"
      ]
    }
  ],
  "organisms": {
    "listaMinhasDespesas": {
      "kind": "list",
      "text": "Vejo as despesas que registrei, com data, categoria, valor e situação de cada uma, para acompanhar o andamento e escolher qual abrir.",
      "intents": []
    },
    "detalheDespesa": {
      "kind": "detail",
      "text": "Abro a despesa para ver os dados, o comprovante, a situação, se já foi reenviada, a data de pagamento e o motivo informado pelo gestor quando ela foi rejeitada.",
      "intents": []
    },
    "formularioDespesa": {
      "kind": "form",
      "text": "Preencho a data, a categoria, o valor, a descrição e o comprovante para registrar uma despesa nova ou corrigir uma rejeitada.",
      "intents": [
        {
          "id": "registrarDespesa",
          "kind": "submit"
        },
        {
          "id": "salvarCorrecao",
          "kind": "submit"
        }
      ]
    },
    "acoesEnvio": {
      "kind": "actions",
      "text": "Envio a despesa em rascunho para aprovação do gestor ou reenvio, uma única vez, a despesa rejeitada que corrigi.",
      "intents": [
        {
          "id": "enviarParaAprovacao",
          "kind": "submit"
        },
        {
          "id": "reenviarParaAprovacao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaMinhasDespesas": [
      {
        "role": "Lista das minhas despesas com situação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheDespesa": [
      {
        "role": "Resumo da despesa selecionada",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Destaque do motivo da rejeição",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "formularioDespesa": [
      {
        "role": "Data da despesa",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Categoria da despesa",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Valor a reembolsar",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Descrição da despesa",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "Comprovante da despesa",
        "preferred": "groupselectfileforupload--ml-file-upload-preview",
        "alternative": "groupselectfileforupload--ml-file-upload-dropzone"
      }
    ],
    "acoesEnvio": [
      {
        "role": "Enviar ou reenviar para aprovação",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "Confirmação do envio",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
