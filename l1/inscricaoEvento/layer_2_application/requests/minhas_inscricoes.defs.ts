/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/requests/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "minhas_inscricoes",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/cancelar.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/getEvento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/getInscricao.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/listInscricao.defs.ts"
  ],
  "data": {
    "pageId": "minhas_inscricoes",
    "requests": [
      {
        "route": "inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes",
        "kind": "qry",
        "uses": [
          "listInscricao",
          "getEvento"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "resumo",
            "entity": "Inscricao",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.evento",
            "reason": "CONTRACT_UNPARSED: Route inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes output resumo.evento nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "inscricoes",
            "entity": "Inscricao",
            "items": "items",
            "page": "inscricoes.page",
            "pageSize": "inscricoes.pageSize",
            "hasMore": "inscricoes.hasMore",
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
                "field": "eventoId",
                "path": "eventoId"
              },
              {
                "field": "receivedAt",
                "path": "receivedAt"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "related",
            "path": "inscricoes.items.evento",
            "entity": "Evento",
            "relationship": "inscricaoEvento",
            "fields": [
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
            "kind": "list",
            "path": "promocoes",
            "entity": "Inscricao",
            "items": "",
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
            "kind": "related",
            "path": "promocoes.evento",
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
            "kind": "unresolved",
            "path": "resumo.totalOcupandoVaga",
            "reason": "Interface ResumoInscricoes pages inscricoesAtivas; totalOcupandoVaga is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalNaListaEspera",
            "reason": "Interface ResumoInscricoes pages inscricoesAtivas; totalNaListaEspera is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalOcupandoVaga",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes projects Inscricao.totalOcupandoVaga, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalNaListaEspera",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes projects Inscricao.totalNaListaEspera, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.inscricoesAtivas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes projects Inscricao.inscricoesAtivas, which is not a field of the ontology."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "inscricoes",
            "pages": "inscricoes"
          },
          {
            "name": "pageSize",
            "target": "inscricoes",
            "pages": "inscricoes"
          }
        ],
        "rules": [
          "calculoPosicaoListaEspera",
          "ordemChegadaListaEspera"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez tudo o que a página Minhas inscrições mostra ao abrir: o resumo da situação, a primeira página da lista de inscrições e a linha do tempo de promoções.\nEntrada: page e pageSize: página da lista de inscrições (a primeira na abertura). O participante vem da sessão (escopo own), nunca do cliente.\nProcessamento: Filtra as inscrições do participante autenticado. Resumo: conta as que ocupam vaga (status confirmed, ocupaVaga verdadeiro) e as em lista de espera (waitlisted), e lista as não canceladas com título do evento, ocupaVaga e posicaoListaEspera calculada pela regra calculoPosicaoListaEspera (inscrições waitlisted do mesmo evento com receivedAt anterior, mais um, conforme ordemChegadaListaEspera); os derivados são calculados, nunca gravados. Lista: inscrições com evento (título e data), ordenadas por receivedAt da mais recente, paginada. Promoções: inscrições com promotedAt preenchido, ordenadas por promotedAt decrescente.\nSaída: resumo com os indicadores já calculados, inscricoes paginada ({ items, page, pageSize, hasMore }) e promocoes para a linha do tempo.",
          "purpose": "Carrega de uma vez tudo o que a página Minhas inscrições mostra ao abrir: o resumo da situação, a primeira página da lista de inscrições e a linha do tempo de promoções.",
          "input": "page e pageSize: página da lista de inscrições (a primeira na abertura). O participante vem da sessão (escopo own), nunca do cliente.",
          "processing": "Filtra as inscrições do participante autenticado. Resumo: conta as que ocupam vaga (status confirmed, ocupaVaga verdadeiro) e as em lista de espera (waitlisted), e lista as não canceladas com título do evento, ocupaVaga e posicaoListaEspera calculada pela regra calculoPosicaoListaEspera (inscrições waitlisted do mesmo evento com receivedAt anterior, mais um, conforme ordemChegadaListaEspera); os derivados são calculados, nunca gravados. Lista: inscrições com evento (título e data), ordenadas por receivedAt da mais recente, paginada. Promoções: inscrições com promotedAt preenchido, ordenadas por promotedAt decrescente.",
          "output": "resumo com os indicadores já calculados, inscricoes paginada ({ items, page, pageSize, hasMore }) e promocoes para a linha do tempo."
        }
      },
      {
        "route": "inscricaoEvento.minhas_inscricoes.buscarInscricoes",
        "kind": "qry",
        "uses": [
          "listInscricao",
          "getEvento"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "inscricoes",
            "entity": "Inscricao",
            "items": "items",
            "page": "inscricoes.page",
            "pageSize": "inscricoes.pageSize",
            "hasMore": "inscricoes.hasMore",
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
                "field": "eventoId",
                "path": "eventoId"
              },
              {
                "field": "receivedAt",
                "path": "receivedAt"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "related",
            "path": "inscricoes.items.evento",
            "entity": "Evento",
            "relationship": "inscricaoEvento",
            "fields": [
              {
                "field": "title",
                "path": "title"
              },
              {
                "field": "eventDate",
                "path": "eventDate"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "inscricoes",
            "pages": "inscricoes"
          },
          {
            "name": "pageSize",
            "target": "inscricoes",
            "pages": "inscricoes"
          },
          {
            "name": "busca",
            "target": "inscricoes",
            "field": "registrationCode"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Busca as inscrições da própria pessoa pelo código ou pelo nome do evento e traz as páginas seguintes.\nEntrada: busca: texto digitado, comparado ao código da inscrição ou ao título do evento; page e pageSize: página pedida.\nProcessamento: Restringe às inscrições do participante da sessão; filtra por registrationCode igual/iniciando pelo texto ou Evento.title contendo o texto; ordena por receivedAt decrescente; pagina.\nSaída: inscricoes paginada que substitui a lista numa nova busca.",
          "purpose": "Busca as inscrições da própria pessoa pelo código ou pelo nome do evento e traz as páginas seguintes.",
          "input": "busca: texto digitado, comparado ao código da inscrição ou ao título do evento; page e pageSize: página pedida.",
          "processing": "Restringe às inscrições do participante da sessão; filtra por registrationCode igual/iniciando pelo texto ou Evento.title contendo o texto; ordena por receivedAt decrescente; pagina.",
          "output": "inscricoes paginada que substitui a lista numa nova busca."
        }
      },
      {
        "route": "inscricaoEvento.minhas_inscricoes.obterInscricao",
        "kind": "qry",
        "uses": [
          "getInscricao",
          "getEvento"
        ],
        "transaction": "none",
        "output": [
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
              },
              {
                "field": "eventoId",
                "path": "eventoId"
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
            "path": "inscricao.evento.details",
            "reason": "DISCLOSURE: Route inscricaoEvento.minhas_inscricoes.obterInscricao projects evento.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
              },
              {
                "field": "eventDate",
                "path": "eventDate"
              }
            ]
          },
          {
            "kind": "related",
            "path": "inscricao.evento.details.venue",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.name",
                "path": "details.venue.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "inscricao.evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [
          {
            "name": "inscricaoId",
            "target": "inscricao",
            "field": "registrationCode"
          }
        ],
        "rules": [
          "calculoPosicaoListaEspera"
        ],
        "doc": {
          "raw": "Finalidade: Abre a inscrição escolhida na lista para a pessoa conferir antes de cancelar.\nEntrada: inscricaoId: id da inscrição selecionada na lista.\nProcessamento: Lê a inscrição garantindo que pertence ao participante da sessão; compõe com o evento (título, data, nome do local); calcula ocupaVaga (confirmada) e posicaoListaEspera pela regra calculoPosicaoListaEspera apenas quando waitlisted.\nSaída: inscricao com código, recebida em, evento com data e local, situação, ocupaVaga e posição na fila; alimenta o detalhe e as ações.",
          "purpose": "Abre a inscrição escolhida na lista para a pessoa conferir antes de cancelar.",
          "input": "inscricaoId: id da inscrição selecionada na lista.",
          "processing": "Lê a inscrição garantindo que pertence ao participante da sessão; compõe com o evento (título, data, nome do local); calcula ocupaVaga (confirmada) e posicaoListaEspera pela regra calculoPosicaoListaEspera apenas quando waitlisted.",
          "output": "inscricao com código, recebida em, evento com data e local, situação, ocupaVaga e posição na fila; alimenta o detalhe e as ações."
        }
      },
      {
        "route": "inscricaoEvento.minhas_inscricoes.cancelarInscricao",
        "kind": "cmd",
        "uses": [
          "cancelar",
          "getEvento"
        ],
        "transaction": "single",
        "output": [
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
              },
              {
                "field": "eventoId",
                "path": "eventoId"
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
            "path": "inscricao.evento.details",
            "reason": "DISCLOSURE: Route inscricaoEvento.minhas_inscricoes.cancelarInscricao projects evento.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
              },
              {
                "field": "eventDate",
                "path": "eventDate"
              }
            ]
          },
          {
            "kind": "related",
            "path": "inscricao.evento.details.venue",
            "entity": "Evento",
            "fields": [
              {
                "field": "details.venue.name",
                "path": "details.venue.name"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "item",
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
                "field": "eventoId",
                "path": "eventoId"
              },
              {
                "field": "receivedAt",
                "path": "receivedAt"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "related",
            "path": "item.evento",
            "entity": "Evento",
            "relationship": "inscricaoEvento",
            "fields": [
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
            "kind": "list",
            "path": "resumo",
            "entity": "Inscricao",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.evento",
            "reason": "CONTRACT_UNPARSED: Route inscricaoEvento.minhas_inscricoes.cancelarInscricao output resumo.evento nests a relation with no readable interface."
          },
          {
            "kind": "unresolved",
            "path": "inscricao.evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalOcupandoVaga",
            "reason": "Interface ResumoInscricoes pages inscricoesAtivas; totalOcupandoVaga is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalNaListaEspera",
            "reason": "Interface ResumoInscricoes pages inscricoesAtivas; totalNaListaEspera is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalOcupandoVaga",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.minhas_inscricoes.cancelarInscricao projects Inscricao.totalOcupandoVaga, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.totalNaListaEspera",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.minhas_inscricoes.cancelarInscricao projects Inscricao.totalNaListaEspera, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.inscricoesAtivas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.minhas_inscricoes.cancelarInscricao projects Inscricao.inscricoesAtivas, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "cancelamentoSomentePropriaInscricao",
          "promoverPrimeiroListaEsperaAoCancelar"
        ],
        "doc": {
          "raw": "Finalidade: Cancela a inscrição da própria pessoa, liberando a vaga para o primeiro da lista de espera.\nEntrada: inscricaoId: id da inscrição a cancelar; version: versão da inscrição conhecida pela página quando a abriu, usada para controle de concorrência otimista (tratada como token opaco, não exibida ao público).\nProcessamento: cancelamentoSomentePropriaInscricao: recusa se a inscrição não pertence ao participante da sessão ou se o status não é confirmed ou waitlisted. Recusa com conflito se version difere da versão atual. Executa a transição cancelar (status cancelled, registra cancelledAt). promoverPrimeiroListaEsperaAoCancelar: se a inscrição estava confirmada, na mesma transação promove a primeira inscrição waitlisted do mesmo evento por receivedAt, registrando promotedAt. Recalcula os derivados (ocupaVaga, posicaoListaEspera) sem gravá-los.\nSaída: inscricao atualizada para o detalhe, item para atualizar a linha da lista e resumo recalculado, para a página redesenhar sem nova chamada.",
          "purpose": "Cancela a inscrição da própria pessoa, liberando a vaga para o primeiro da lista de espera.",
          "input": "inscricaoId: id da inscrição a cancelar; version: versão da inscrição conhecida pela página quando a abriu, usada para controle de concorrência otimista (tratada como token opaco, não exibida ao público).",
          "processing": "cancelamentoSomentePropriaInscricao: recusa se a inscrição não pertence ao participante da sessão ou se o status não é confirmed ou waitlisted. Recusa com conflito se version difere da versão atual. Executa a transição cancelar (status cancelled, registra cancelledAt). promoverPrimeiroListaEsperaAoCancelar: se a inscrição estava confirmada, na mesma transação promove a primeira inscrição waitlisted do mesmo evento por receivedAt, registrando promotedAt. Recalcula os derivados (ocupaVaga, posicaoListaEspera) sem gravá-los.",
          "output": "inscricao atualizada para o detalhe, item para atualizar a linha da lista e resumo recalculado, para a página redesenhar sem nova chamada."
        }
      }
    ]
  }
} as const;

export default definition;
