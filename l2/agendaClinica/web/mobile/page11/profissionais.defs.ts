/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/profissionais.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Em uma coluna estreita, a recepcionista percorre os profissionais da clínica, confere o cadastro escolhido e mantém nome, documento e tipo de atuação para o agendamento.",
  "sections": [
    {
      "id": "professionalsDirectory",
      "priority": "primary",
      "purpose": "Em largura estreita, cerca de 390px e ainda usável em 360px e 430px, apresenta os profissionais em sequência para a recepcionista localizar quem está disponível.",
      "organisms": [
        "professionalList"
      ]
    },
    {
      "id": "professionalRecord",
      "priority": "main",
      "purpose": "Empilha o cadastro conferido e o formulário de manutenção para a recepcionista revisar e atualizar o profissional sem sair do fluxo estreito.",
      "organisms": [
        "professionalDetail",
        "professionalForm"
      ]
    },
    {
      "id": "professionalMaintenance",
      "priority": "secondary",
      "purpose": "Explica no final do conteúdo fluido que a manutenção do profissional é concluída pelo formulário de inclusão ou atualização.",
      "organisms": [
        "professionalActions"
      ]
    }
  ],
  "organisms": {
    "professionalList": {
      "kind": "list",
      "text": "Mostra os profissionais da clínica em uma lista estreita, com nome, situação e tipo de atuação, para a recepcionista ver quem está disponível e escolher um cadastro.",
      "intents": []
    },
    "professionalDetail": {
      "kind": "detail",
      "text": "Resume o cadastro do profissional selecionado — nome, documento, situação e atuação — para a recepcionista conferir os dados no espaço estreito antes de alterar.",
      "intents": []
    },
    "professionalForm": {
      "kind": "form",
      "text": "Concentra nome, documento e tipo de atuação em campos empilhados para a recepcionista cadastrar ou atualizar o profissional usado no agendamento.",
      "intents": [
        {
          "id": "createProfessional",
          "kind": "submit"
        },
        {
          "id": "updateProfessional",
          "kind": "submit"
        }
      ]
    },
    "professionalActions": {
      "kind": "actions",
      "text": "Apresenta, no final do conteúdo estreito, o contexto de manutenção que é gravada pelo formulário do profissional.",
      "intents": []
    }
  },
  "molecules": {
    "professionalList": [
      {
        "role": "collection",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "professionalDetail": [
      {
        "role": "profile",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupexpandcontent--ml-single-expand-content"
      }
    ],
    "professionalForm": [
      {
        "role": "name",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "document",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      },
      {
        "role": "submit",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ],
    "professionalActions": [
      {
        "role": "commands",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
