/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/readOnlyDetailPortal/page21.md",
    "experience": "summaryFirstStatement"
  },
  "intent": "Mostrar à recepcionista conectada o seu próprio cadastro, que identifica as matrículas que ela registrou, apenas para consulta.",
  "sections": [
    {
      "id": "meusDados",
      "priority": "primary",
      "purpose": "Apresentar de forma direta o cadastro da recepcionista conectada: nome, situação e apelidos, que a identificam nas matrículas registradas.",
      "organisms": [
        "meusDadosRecepcionista"
      ]
    }
  ],
  "organisms": {
    "meusDadosRecepcionista": {
      "kind": "detail",
      "text": "Meus dados de recepcionista, que identificam as matrículas que registrei. É uma consulta do próprio cadastro, sem alterações, com acesso às matrículas.",
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
