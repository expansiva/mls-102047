/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/meu_cadastro_recepcao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Permitir que a recepcionista consulte o próprio cadastro de atuação na clínica e grave identificação e privacidade, mantendo um único registro pessoal sem listagem.",
  "sections": [
    {
      "id": "resumoAtuacao",
      "priority": "primary",
      "purpose": "Apresentar o resumo do cadastro da recepcionista para ela reconhecer nome, documento e situação atuais antes de editar.",
      "organisms": [
        "dadosAtuacao"
      ]
    },
    {
      "id": "edicaoAtuacao",
      "priority": "main",
      "purpose": "Concentrar a edição dos dados de identificação e privacidade que a recepcionista pode manter neste cadastro próprio.",
      "organisms": [
        "formularioAtuacao"
      ]
    },
    {
      "id": "comandosCadastro",
      "priority": "secondary",
      "purpose": "Disponibilizar a criação e a gravação do cadastro próprio e da atuação profissional declarada nesta página.",
      "organisms": [
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "dadosAtuacao": {
      "kind": "detail",
      "text": "Mostra nome, documento, situação e consentimento do próprio cadastro para a recepcionista confirmar quem está autenticada e quais dados de atuação já estão registrados.",
      "intents": []
    },
    "formularioAtuacao": {
      "kind": "form",
      "text": "Reúne os campos de identificação e privacidade do próprio cadastro para a recepcionista corrigir nome, documento, país e consentimento e preparar a gravação da atuação na clínica.",
      "intents": []
    },
    "acoesCadastro": {
      "kind": "actions",
      "text": "Oferece criar ou salvar o próprio cadastro de recepcionista e criar ou atualizar o cadastro profissional associado, para concluir a manutenção sem sair desta página.",
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
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "formularioAtuacao": [
      {
        "role": "nameField",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "documentField",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "documentTypeField",
        "preferred": "groupselectone--ml-select-dropdown",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "countryField",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "privacyField",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "acoesCadastro": [
      {
        "role": "primaryAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "actionGroup",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
