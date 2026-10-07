/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/profissionais.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "A recepcionista localiza os profissionais da clínica, confere quem está disponível e mantém o cadastro mestre com nome, documento e tipo de atuação para usar no agendamento.",
  "sections": [
    {
      "id": "professionalsDirectory",
      "priority": "primary",
      "purpose": "Mostra os profissionais cadastrados para a recepcionista localizar quem está disponível na clínica e escolher um cadastro.",
      "organisms": [
        "professionalList"
      ]
    },
    {
      "id": "professionalRecord",
      "priority": "main",
      "purpose": "Exibe o cadastro do profissional selecionado e o formulário para incluir ou atualizar os dados usados no agendamento.",
      "organisms": [
        "professionalDetail",
        "professionalForm"
      ]
    },
    {
      "id": "professionalMaintenance",
      "priority": "secondary",
      "purpose": "Indica onde a recepcionista mantém o cadastro do profissional pelo formulário de inclusão ou atualização.",
      "organisms": [
        "professionalActions"
      ]
    }
  ],
  "organisms": {
    "professionalList": {
      "kind": "list",
      "text": "Lista os profissionais da clínica com nome, situação e tipo de atuação para a recepcionista ver quem está disponível e escolher um cadastro.",
      "intents": []
    },
    "professionalDetail": {
      "kind": "detail",
      "text": "Mostra o cadastro do profissional selecionado — nome, documento, situação e se atua como médico ou terapeuta — para a recepcionista conferir os dados antes de alterar.",
      "intents": []
    },
    "professionalForm": {
      "kind": "form",
      "text": "Permite informar ou atualizar nome, documento e tipo de atuação do profissional, para a recepcionista manter o cadastro usado no agendamento das consultas.",
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
      "text": "Apresenta o contexto de manutenção do cadastro do profissional, cujas inclusões e alterações são gravadas pelo formulário.",
      "intents": []
    }
  },
  "molecules": {
    "professionalList": [
      {
        "role": "collection",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "professionalDetail": [
      {
        "role": "profile",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "professionalForm": [
      {
        "role": "name",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
