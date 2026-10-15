/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/requests/eventos_abertos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "eventos_abertos",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/createInscricao.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/getEvento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/listEvento.defs.ts"
  ],
  "data": {
    "pageId": "eventos_abertos",
    "requests": [
      {
        "route": "inscricaoEvento.eventos_abertos.listarEventosPublicados",
        "kind": "qry",
        "uses": [
          "listEvento",
          "getEvento"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "eventos.items.details",
            "reason": "DISCLOSURE: Route inscricaoEvento.eventos_abertos.listarEventosPublicados projects items.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "eventos",
            "entity": "Evento",
            "items": "items",
            "page": "eventos.page",
            "pageSize": "eventos.pageSize",
            "hasMore": "eventos.hasMore",
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
              }
            ]
          },
          {
            "kind": "related",
            "path": "eventos.items.details.venue",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.name",
                "path": "details.venue.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "eventos.items.details.venue.address",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.address.city",
                "path": "details.venue.address.city"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "eventos.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "eventos.details.venue.address",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "eventos",
            "pages": "eventos"
          },
          {
            "name": "pageSize",
            "target": "eventos",
            "pages": "eventos"
          },
          {
            "name": "texto",
            "target": "eventos",
            "field": "title"
          }
        ],
        "rules": [
          "calculoVagasOcupadas",
          "calculoVagasRestantes",
          "listaEsperaQuandoVagasEsgotadas"
        ],
        "doc": {
          "raw": "Finalidade: Carrega, ao abrir a página e a cada busca, a lista paginada de eventos publicados para a pessoa escolher qual conhecer.\nEntrada: texto: trecho do título; dataInicio/dataFim: intervalo de data do evento; local: trecho do nome do local ou da cidade; page/pageSize: página pedida.\nProcessamento: Filtra apenas eventos com situação publicada, aplica os filtros de título, intervalo de data e local (nome ou cidade) e ordena por data do evento crescente. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas), vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero) e lotado (listaEsperaQuandoVagasEsgotadas: ocupadas alcançaram as vagas); campos derivados, nunca gravados.\nSaída: Página { items, page, pageSize, hasMore } de eventos com título, data, local (nome e cidade), vagas restantes e indicador de lotado, prontos para a lista.",
          "purpose": "Carrega, ao abrir a página e a cada busca, a lista paginada de eventos publicados para a pessoa escolher qual conhecer.",
          "input": "texto: trecho do título; dataInicio/dataFim: intervalo de data do evento; local: trecho do nome do local ou da cidade; page/pageSize: página pedida.",
          "processing": "Filtra apenas eventos com situação publicada, aplica os filtros de título, intervalo de data e local (nome ou cidade) e ordena por data do evento crescente. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas), vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero) e lotado (listaEsperaQuandoVagasEsgotadas: ocupadas alcançaram as vagas); campos derivados, nunca gravados.",
          "output": "Página { items, page, pageSize, hasMore } de eventos com título, data, local (nome e cidade), vagas restantes e indicador de lotado, prontos para a lista."
        }
      },
      {
        "route": "inscricaoEvento.eventos_abertos.obterEventoPublico",
        "kind": "qry",
        "uses": [
          "getEvento"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "evento.details",
            "reason": "DISCLOSURE: Route inscricaoEvento.eventos_abertos.obterEventoPublico projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "evento",
            "entity": "Evento",
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
              }
            ]
          },
          {
            "kind": "related",
            "path": "evento.details.venue",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.name",
                "path": "details.venue.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "evento.details.venue.address",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.address.line1",
                "path": "details.venue.address.line1"
              },
              {
                "field": "details.venue.address.line2",
                "path": "details.venue.address.line2"
              },
              {
                "field": "details.venue.address.city",
                "path": "details.venue.address.city"
              },
              {
                "field": "details.venue.address.stateOrProvince",
                "path": "details.venue.address.stateOrProvince"
              },
              {
                "field": "details.venue.address.postalCode",
                "path": "details.venue.address.postalCode"
              },
              {
                "field": "details.venue.address.countryCode",
                "path": "details.venue.address.countryCode"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "evento.details.venue.address",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "calculoVagasOcupadas",
          "calculoVagasRestantes",
          "listaEsperaQuandoVagasEsgotadas"
        ],
        "doc": {
          "raw": "Finalidade: Carrega o evento escolhido na lista (ou aberto pela URL) com tudo que a pessoa precisa para decidir se inscrever.\nEntrada: eventoId: id do evento selecionado na lista ou vindo da URL da página pública.\nProcessamento: Lê o evento pelo id e só o devolve se estiver publicado (caso contrário, não encontrado). Calcula vagas ocupadas (calculoVagasOcupadas), vagas restantes (calculoVagasRestantes, nunca abaixo de zero), lotado (listaEsperaQuandoVagasEsgotadas) e o tamanho da lista de espera contando as inscrições em espera do evento; tudo derivado, nada gravado.\nSaída: O evento com título, data, descrição, local com endereço completo, número de vagas, vagas restantes, lotado e tamanho da lista de espera; também alimenta o título e o aviso de lotado na ação de inscrição.",
          "purpose": "Carrega o evento escolhido na lista (ou aberto pela URL) com tudo que a pessoa precisa para decidir se inscrever.",
          "input": "eventoId: id do evento selecionado na lista ou vindo da URL da página pública.",
          "processing": "Lê o evento pelo id e só o devolve se estiver publicado (caso contrário, não encontrado). Calcula vagas ocupadas (calculoVagasOcupadas), vagas restantes (calculoVagasRestantes, nunca abaixo de zero), lotado (listaEsperaQuandoVagasEsgotadas) e o tamanho da lista de espera contando as inscrições em espera do evento; tudo derivado, nada gravado.",
          "output": "O evento com título, data, descrição, local com endereço completo, número de vagas, vagas restantes, lotado e tamanho da lista de espera; também alimenta o título e o aviso de lotado na ação de inscrição."
        }
      },
      {
        "route": "inscricaoEvento.eventos_abertos.inscreverEmEvento",
        "kind": "cmd",
        "uses": [
          "createInscricao",
          "getEvento"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "inscricao.details",
            "reason": "DISCLOSURE: Route inscricaoEvento.eventos_abertos.inscreverEmEvento projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "inscricao",
            "entity": "Inscricao",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "registrationCode",
                "path": "registrationCode"
              },
              {
                "field": "receivedAt",
                "path": "receivedAt"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "inscricao.evento.details",
            "reason": "DISCLOSURE: Route inscricaoEvento.eventos_abertos.inscreverEmEvento projects evento.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "inscricao.evento",
            "entity": "Evento",
            "relationship": "inscricaoEvento",
            "fields": [
              {
                "field": "title",
                "path": "title"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "evento",
            "entity": "Evento",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "evento.details.venue",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.name",
                "path": "details.venue.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "evento.details.venue.address",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.address.line1",
                "path": "details.venue.address.line1"
              },
              {
                "field": "details.venue.address.line2",
                "path": "details.venue.address.line2"
              },
              {
                "field": "details.venue.address.city",
                "path": "details.venue.address.city"
              },
              {
                "field": "details.venue.address.stateOrProvince",
                "path": "details.venue.address.stateOrProvince"
              },
              {
                "field": "details.venue.address.postalCode",
                "path": "details.venue.address.postalCode"
              },
              {
                "field": "details.venue.address.countryCode",
                "path": "details.venue.address.countryCode"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "eventoResumo",
            "entity": "Evento",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "eventoResumo.details.venue",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.name",
                "path": "details.venue.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "eventoResumo.details.venue.address",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.address.city",
                "path": "details.venue.address.city"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "inscricao.participante",
            "reason": "Interface ParticipanteInscricao has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "evento.details.venue.address",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "eventoResumo.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "eventoResumo.details.venue.address",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "inscricao.participante",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.eventos_abertos.inscreverEmEvento projects Inscricao.participante, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "inscricaoSomenteEventoPublicado",
          "inscricaoUnicaPorEmailEvento",
          "umaInscricaoPorEmailPorEvento",
          "inscricaoExcedenteVaiParaListaEspera",
          "listaEsperaQuandoVagasEsgotadas",
          "ordemChegadaListaEspera",
          "calculoPosicaoListaEspera",
          "calculoVagasOcupadas",
          "calculoVagasRestantes"
        ],
        "doc": {
          "raw": "Finalidade: Inscreve a pessoa no evento aberto com nome e e-mail, garantindo vaga ou lugar na lista de espera, e devolve o resultado para exibir na hora.\nEntrada: eventoId: evento em que a pessoa se inscreve; name: nome informado; email: e-mail informado, usado para localizar ou criar o participante; countryCode: país da pessoa (ISO 3166-1 alfa-2); privacyConsent: consentimento de privacidade dado ao enviar os dados (exigido para BR/UE).\nProcessamento: Recusa se o evento não estiver publicado (inscricaoSomenteEventoPublicado). Localiza o participante pelo e-mail ou cria-o (register.createOrAttach) e liga o e-mail como contato. Recusa se o mesmo e-mail já tiver inscrição confirmada ou em lista de espera no evento (inscricaoUnicaPorEmailEvento, umaInscricaoPorEmailPorEvento). Na mesma transação, cria a inscrição como confirmada se houver vaga restante, senão em lista de espera (inscricaoExcedenteVaiParaListaEspera, listaEsperaQuandoVagasEsgotadas); o sistema registra o momento de chegada e emite o código. Calcula, sem gravar, ocupaVaga e a posição na lista de espera (calculoPosicaoListaEspera, ordemChegadaListaEspera: em espera do mesmo evento que chegaram antes, mais um) e recalcula vagas ocupadas, restantes, lotado e tamanho da fila do evento.\nSaída: A inscrição com código, momento de chegada, se ocupa vaga ou a posição na lista de espera, título e lotação do evento e o e-mail usado; além do evento atualizado (detalhe e item de lista) para redesenhar a disponibilidade sem nova chamada.",
          "purpose": "Inscreve a pessoa no evento aberto com nome e e-mail, garantindo vaga ou lugar na lista de espera, e devolve o resultado para exibir na hora.",
          "input": "eventoId: evento em que a pessoa se inscreve; name: nome informado; email: e-mail informado, usado para localizar ou criar o participante; countryCode: país da pessoa (ISO 3166-1 alfa-2); privacyConsent: consentimento de privacidade dado ao enviar os dados (exigido para BR/UE).",
          "processing": "Recusa se o evento não estiver publicado (inscricaoSomenteEventoPublicado). Localiza o participante pelo e-mail ou cria-o (register.createOrAttach) e liga o e-mail como contato. Recusa se o mesmo e-mail já tiver inscrição confirmada ou em lista de espera no evento (inscricaoUnicaPorEmailEvento, umaInscricaoPorEmailPorEvento). Na mesma transação, cria a inscrição como confirmada se houver vaga restante, senão em lista de espera (inscricaoExcedenteVaiParaListaEspera, listaEsperaQuandoVagasEsgotadas); o sistema registra o momento de chegada e emite o código. Calcula, sem gravar, ocupaVaga e a posição na lista de espera (calculoPosicaoListaEspera, ordemChegadaListaEspera: em espera do mesmo evento que chegaram antes, mais um) e recalcula vagas ocupadas, restantes, lotado e tamanho da fila do evento.",
          "output": "A inscrição com código, momento de chegada, se ocupa vaga ou a posição na lista de espera, título e lotação do evento e o e-mail usado; além do evento atualizado (detalhe e item de lista) para redesenhar a disponibilidade sem nova chamada."
        }
      }
    ]
  }
} as const;

export default definition;
