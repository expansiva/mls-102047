/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/requests/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "painel_organizador",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/listEvento.defs.ts"
  ],
  "data": {
    "pageId": "painel_organizador",
    "requests": [
      {
        "route": "inscricaoEvento.painel_organizador.qryPainelOrganizador",
        "kind": "qry",
        "uses": [
          "listEvento"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "eventosOcupacao",
            "entity": "Evento",
            "items": "",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "title",
                "path": "title"
              },
              {
                "field": "eventDate",
                "path": "eventDate"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "list",
            "path": "publicacoesRecentes",
            "entity": "Evento",
            "items": "",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "title",
                "path": "title"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "totalVagasOcupadas",
            "reason": "Output totalVagasOcupadas is a value (number), not an interface; no entity owns it."
          }
        ],
        "params": [],
        "rules": [
          "calculoVagasOcupadas",
          "calculoVagasRestantes",
          "listaEsperaQuandoVagasEsgotadas"
        ],
        "doc": {
          "raw": "Finalidade: Carrega numa só chamada tudo o que o painel do organizador mostra ao abrir: a ocupação de cada evento publicado, o total de vagas ocupadas e os eventos publicados recentemente.\nEntrada: Nenhuma entrada; o escopo é a organização do organizador autenticado.\nProcessamento: Filtra os eventos da organização com status ’published’. Para cada um calcula a partir das inscrições (nunca grava): occupiedSeats = inscrições confirmadas, sem canceladas nem em lista de espera (calculoVagasOcupadas); remainingSeats = capacity - occupiedSeats, nunca abaixo de zero (calculoVagasRestantes); waitlistSize = inscrições em lista de espera; isFull = occupiedSeats >= capacity (listaEsperaQuandoVagasEsgotadas). Ordena eventosOcupacao colocando primeiro os lotados e com fila (isFull desc, waitlistSize desc), depois os com menos vagas restantes, e por eventDate. totalVagasOcupadas é a soma de occupiedSeats dos eventos publicados, calculada no servidor. publicacoesRecentes traz os eventos publicados mais recentes ordenados por publishedAt decrescente, limitados a um número curto (ex.: 5).\nSaída: eventosOcupacao para os destaques de ocupação; totalVagasOcupadas já somado para o resumo; publicacoesRecentes com a data de publicação. Os ids permitem navegar para a gestão do evento.",
          "purpose": "Carrega numa só chamada tudo o que o painel do organizador mostra ao abrir: a ocupação de cada evento publicado, o total de vagas ocupadas e os eventos publicados recentemente.",
          "input": "Nenhuma entrada; o escopo é a organização do organizador autenticado.",
          "processing": "Filtra os eventos da organização com status ’published’. Para cada um calcula a partir das inscrições (nunca grava): occupiedSeats = inscrições confirmadas, sem canceladas nem em lista de espera (calculoVagasOcupadas); remainingSeats = capacity - occupiedSeats, nunca abaixo de zero (calculoVagasRestantes); waitlistSize = inscrições em lista de espera; isFull = occupiedSeats >= capacity (listaEsperaQuandoVagasEsgotadas). Ordena eventosOcupacao colocando primeiro os lotados e com fila (isFull desc, waitlistSize desc), depois os com menos vagas restantes, e por eventDate. totalVagasOcupadas é a soma de occupiedSeats dos eventos publicados, calculada no servidor. publicacoesRecentes traz os eventos publicados mais recentes ordenados por publishedAt decrescente, limitados a um número curto (ex.: 5).",
          "output": "eventosOcupacao para os destaques de ocupação; totalVagasOcupadas já somado para o resumo; publicacoesRecentes com a data de publicação. Os ids permitem navegar para a gestão do evento."
        }
      }
    ]
  }
} as const;

export default definition;
