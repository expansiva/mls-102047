/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/shared/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {},
  "requests": {
    "obterMeuCadastro": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "name",
        "status",
        "aliases"
      ]
    }
  },
  "states": {
    "name": {
      "source": "obterMeuCadastro.name",
      "description": "Nome, situação e lista de apelidos da recepcionista, que a identificam nas matrículas registradas; a página exibe no cartão de leitura, com o acesso às matrículas por navegação.",
      "organisms": [
        "meusDadosRecepcionista"
      ]
    },
    "status": {
      "source": "obterMeuCadastro.status",
      "description": "Nome, situação e lista de apelidos da recepcionista, que a identificam nas matrículas registradas; a página exibe no cartão de leitura, com o acesso às matrículas por navegação.",
      "organisms": [
        "meusDadosRecepcionista"
      ]
    },
    "aliases": {
      "source": "obterMeuCadastro.aliases",
      "description": "Nome, situação e lista de apelidos da recepcionista, que a identificam nas matrículas registradas; a página exibe no cartão de leitura, com o acesso às matrículas por navegação.",
      "organisms": [
        "meusDadosRecepcionista"
      ]
    }
  },
  "functions": {
    "obterMeuCadastro": {
      "description": "Carrega, na abertura da página, o cadastro da própria recepcionista conectada, somente para consulta.",
      "calls": "obterMeuCadastro",
      "sets": "name",
      "updates": [
        "status",
        "aliases"
      ]
    },
    "verMatriculas": {
      "description": "Meus dados de recepcionista, que identificam as matrículas que registrei. É uma consulta do próprio cadastro, sem alterações, com acesso às matrículas.",
      "navigate": "matriculas"
    }
  },
  "journeys": [],
  "rules": {
    "obterMeuCadastro": []
  },
  "access": {
    "actors": [
      "recepcao"
    ],
    "grants": [
      "recepcaoProprioCadastro"
    ]
  },
  "fields": {}
} as const;
