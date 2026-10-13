/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "qryMeuCadastro": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "atendente"
      ]
    }
  },
  "states": {
    "atendente": {
      "source": "qryMeuCadastro.atendente",
      "description": "Dados cadastrais do atendente da recepção conectado, somente leitura.",
      "organisms": [
        "meuCadastroAtendente"
      ]
    }
  },
  "functions": {
    "qryMeuCadastro": {
      "description": "Carregar, ao abrir Meu cadastro, os dados cadastrais do próprio atendente da recepção conectado, para consulta.",
      "calls": "qryMeuCadastro",
      "sets": "atendente"
    }
  },
  "journeys": [],
  "rules": {
    "qryMeuCadastro": []
  },
  "access": {
    "actors": [
      "recepcao"
    ],
    "grants": []
  },
  "fields": {}
} as const;
