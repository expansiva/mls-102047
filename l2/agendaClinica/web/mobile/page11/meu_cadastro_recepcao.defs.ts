/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/meu_cadastro_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Permitir que a recepcionista, em coluna fluida estreita, consulte o próprio cadastro e grave identificação e privacidade sem listagem e sem sair da área pessoal.",
  "sections": [
    {
      "id": "resumoAtuacao",
      "priority": "primary",
      "purpose": "Mostrar em faixa estreita o cartão do próprio cadastro, legível por volta de 390px e ainda usável em 360px e 430px.",
      "organisms": [
        "dadosAtuacao"
      ]
    },
    {
      "id": "edicaoAtuacao",
      "priority": "main",
      "purpose": "Empilhar os campos de atualização em conteúdo fluido estreito para a recepcionista editar identificação e privacidade no telefone.",
      "organisms": [
        "formularioAtuacao"
      ]
    },
    {
      "id": "comandosCadastro",
      "priority": "secondary",
      "purpose": "Manter as ações de criar e salvar o cadastro ao final do fluxo, em largura total no conteúdo estreito.",
      "organisms": [
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "dadosAtuacao": {
      "kind": "detail",
      "text": "Mostra em cartão compacto o nome, o documento e a situação do próprio cadastro, para a recepcionista reconhecer seus dados no conteúdo estreito do telefone.",
      "intents": []
    },
    "formularioAtuacao": {
      "kind": "form",
      "text": "Empilha nome, documento, país e consentimento em coluna fluida para a recepcionista atualizar a própria atuação com digitação confortável por volta de 390px.",
      "intents": []
    },
    "acoesCadastro": {
      "kind": "actions",
      "text": "Empilha as ações de criar ou salvar o cadastro de recepcionista e de criar ou atualizar o cadastro profissional associado, ao alcance do polegar no final da página estreita.",
      "intents": [
        {
          "id": "salvarCadastroRecepcao",
          "kind": "submit"
        },
        {
          "id": "criarCadastroRecepcao",
          "kind": "submit"
        },
        {
          "id": "salvarCadastroProfissional",
          "kind": "submit"
        },
        {
          "id": "criarCadastroProfissional",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "dadosAtuacao": [
      {
        "role": "profileCard",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "formularioAtuacao": [
      {
        "role": "nameField",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "documentField",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "documentTypeField",
        "preferred": "groupselectone--ml-select-dropdown",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "countryField",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "privacyField",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acoesCadastro": [
      {
        "role": "primaryAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "actionGroup",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
