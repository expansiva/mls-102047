/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/readOnlyDetailPortal/page21.md",
    "experience": "summaryFirstStatement"
  },
  "intent": "Mostrar à recepcionista conectada o seu próprio cadastro numa coluna fluida estreita (em torno de 390px, também usável em 360px e 430px), apenas para consulta.",
  "sections": [
    {
      "id": "meusDados",
      "priority": "primary",
      "purpose": "Mostrar primeiro o nome e a situação da recepcionista, com os apelidos logo abaixo, sem rolagem lateral.",
      "organisms": [
        "meusDadosRecepcionista"
      ]
    }
  ],
  "organisms": {
    "meusDadosRecepcionista": {
      "kind": "detail",
      "text": "Meus dados de recepcionista, que identificam as matrículas que registrei, em um cartão único de leitura com acesso às matrículas.",
      "intents": [
        {
          "id": "verMatriculas",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    }
  },
  "molecules": {
    "meusDadosRecepcionista": [
      {
        "role": "Cartão de identificação da recepcionista com nome, situação e apelidos",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Atalho para abrir as matrículas",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
