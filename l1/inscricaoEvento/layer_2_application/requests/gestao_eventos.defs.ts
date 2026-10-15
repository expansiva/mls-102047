/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/requests/gestao_eventos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "gestao_eventos",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/createEvento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/getEvento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/listEvento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/listInscricao.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/publicar.defs.ts"
  ],
  "data": {
    "pageId": "gestao_eventos",
    "requests": [
      {
        "route": "inscricaoEvento.gestao_eventos.qryEventos",
        "kind": "qry",
        "uses": [
          "listEvento"
        ],
        "transaction": "none",
        "output": [
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
            "name": "busca",
            "target": "eventos",
            "field": "title"
          },
          {
            "name": "status",
            "target": "eventos",
            "field": "status"
          },
          {
            "name": "eventDate",
            "target": "eventos",
            "field": "eventDate"
          }
        ],
        "rules": [
          "calculoVagasOcupadas",
          "calculoVagasRestantes"
        ],
        "doc": {
          "raw": "Finalidade: Lista os eventos da organização do organizador para localizar o evento a trabalhar, já com a ocupação de cada um.\nEntrada: busca: trecho do título; status: filtra rascunho ou publicado; dataDe/dataAte: intervalo da data do evento; page/pageSize: paginação.\nProcessamento: Filtra os eventos do escopo da organização por título (contém, sem diferenciar maiúsculas), situação e intervalo de data, ordenando pela data do evento. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas, sem canceladas nem lista de espera) e vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero); valores derivados, nunca gravados.\nSaída: Página de eventos com título, data, situação, número de vagas, vagas ocupadas e restantes, para a lista de localização.",
          "purpose": "Lista os eventos da organização do organizador para localizar o evento a trabalhar, já com a ocupação de cada um.",
          "input": "busca: trecho do título; status: filtra rascunho ou publicado; dataDe/dataAte: intervalo da data do evento; page/pageSize: paginação.",
          "processing": "Filtra os eventos do escopo da organização por título (contém, sem diferenciar maiúsculas), situação e intervalo de data, ordenando pela data do evento. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas, sem canceladas nem lista de espera) e vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero); valores derivados, nunca gravados.",
          "output": "Página de eventos com título, data, situação, número de vagas, vagas ocupadas e restantes, para a lista de localização."
        }
      },
      {
        "route": "inscricaoEvento.gestao_eventos.qryEventoPainel",
        "kind": "qry",
        "uses": [
          "getEvento",
          "listInscricao"
        ],
        "transaction": "none",
        "output": [
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
                "field": "version",
                "path": "version"
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
            "kind": "unresolved",
            "path": "evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "promocoes.participante",
            "reason": "Interface ParticipanteRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "promocoes.participante",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.gestao_eventos.qryEventoPainel projects Inscricao.participante, which is not a field of the ontology."
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "evento",
            "field": "id"
          }
        ],
        "rules": [
          "calculoVagasOcupadas",
          "calculoVagasRestantes",
          "listaEsperaQuandoVagasEsgotadas",
          "promoverPrimeiroListaEsperaAoCancelar"
        ],
        "doc": {
          "raw": "Finalidade: Carrega o evento escolhido para revisão, ocupação e publicação, junto com as promoções automáticas da lista de espera.\nEntrada: eventoId: id do evento selecionado na lista.\nProcessamento: Lê o evento pelo id (escopo da organização). Calcula vagas ocupadas (calculoVagasOcupadas), vagas restantes (calculoVagasRestantes), lotado quando ocupadas alcançam o número de vagas (listaEsperaQuandoVagasEsgotadas) e tamanho da lista de espera (contagem das inscrições em lista de espera); todos derivados, nunca gravados. Compõe as promoções: inscrições do evento com promotedAt preenchido (registrado por promoverPrimeiroListaEsperaAoCancelar), com nome do participante, ordenadas da mais recente para a mais antiga.\nSaída: O evento com dados cadastrados, situação, publicado em e indicadores de ocupação, mais a linha do tempo de promoções; versão incluída para publicar.",
          "purpose": "Carrega o evento escolhido para revisão, ocupação e publicação, junto com as promoções automáticas da lista de espera.",
          "input": "eventoId: id do evento selecionado na lista.",
          "processing": "Lê o evento pelo id (escopo da organização). Calcula vagas ocupadas (calculoVagasOcupadas), vagas restantes (calculoVagasRestantes), lotado quando ocupadas alcançam o número de vagas (listaEsperaQuandoVagasEsgotadas) e tamanho da lista de espera (contagem das inscrições em lista de espera); todos derivados, nunca gravados. Compõe as promoções: inscrições do evento com promotedAt preenchido (registrado por promoverPrimeiroListaEsperaAoCancelar), com nome do participante, ordenadas da mais recente para a mais antiga.",
          "output": "O evento com dados cadastrados, situação, publicado em e indicadores de ocupação, mais a linha do tempo de promoções; versão incluída para publicar."
        }
      },
      {
        "route": "inscricaoEvento.gestao_eventos.qryInscritosEvento",
        "kind": "qry",
        "uses": [
          "listInscricao"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "inscritos",
            "entity": "Inscricao",
            "items": "items",
            "page": "inscritos.page",
            "pageSize": "inscritos.pageSize",
            "hasMore": "inscritos.hasMore",
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
            "path": "inscritos.participante",
            "reason": "Interface ParticipanteRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "inscritos.emailParticipante",
            "reason": "Interface EmailRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "inscritos.items.participante",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.gestao_eventos.qryInscritosEvento projects Inscricao.participante, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "inscritos.items.emailParticipante",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inscricaoEvento.gestao_eventos.qryInscritosEvento projects Inscricao.emailParticipante, which is not a field of the ontology."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "inscritos",
            "pages": "inscritos"
          },
          {
            "name": "pageSize",
            "target": "inscritos",
            "pages": "inscritos"
          },
          {
            "name": "eventoId",
            "target": "inscritos",
            "field": "eventoId"
          }
        ],
        "rules": [
          "ordemChegadaListaEspera",
          "calculoPosicaoListaEspera"
        ],
        "doc": {
          "raw": "Finalidade: Lista os inscritos do evento selecionado por ordem de chegada.\nEntrada: eventoId: evento selecionado; page/pageSize: paginação.\nProcessamento: Lista as inscrições do evento ordenadas por receivedAt ascendente (ordemChegadaListaEspera), compondo nome do participante e e-mail do cadastro mestre. Calcula ocupaVaga (inscrição confirmada) e posicaoListaEspera (calculoPosicaoListaEspera: quantas em lista de espera do mesmo evento chegaram antes, mais um; vazio fora da lista); derivados, nunca gravados.\nSaída: Página de inscritos com código, nome, e-mail, recebida em, situação, se ocupa vaga e posição na lista de espera.",
          "purpose": "Lista os inscritos do evento selecionado por ordem de chegada.",
          "input": "eventoId: evento selecionado; page/pageSize: paginação.",
          "processing": "Lista as inscrições do evento ordenadas por receivedAt ascendente (ordemChegadaListaEspera), compondo nome do participante e e-mail do cadastro mestre. Calcula ocupaVaga (inscrição confirmada) e posicaoListaEspera (calculoPosicaoListaEspera: quantas em lista de espera do mesmo evento chegaram antes, mais um; vazio fora da lista); derivados, nunca gravados.",
          "output": "Página de inscritos com código, nome, e-mail, recebida em, situação, se ocupa vaga e posição na lista de espera."
        }
      },
      {
        "route": "inscricaoEvento.gestao_eventos.qryExportarInscritosCsv",
        "kind": "qry",
        "uses": [],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "inscricaoEvento.gestao_eventos.qryExportarInscritosCsv",
            "reason": "AUTHORITY_REQUIRED: Operation inscricaoEvento.gestao_eventos.qryExportarInscritosCsv on inscricaoEvento.gestao_eventos.qryExportarInscritosCsv has no authority. No permissive fallback was applied."
          }
        ],
        "params": [],
        "rules": [
          "ordemChegadaListaEspera"
        ],
        "doc": {
          "raw": "Finalidade: Gera o CSV com todos os inscritos do evento para o organizador baixar.\nEntrada: eventoId: evento selecionado.\nProcessamento: Lê todas as inscrições do evento (sem paginação) por ordem de chegada (ordemChegadaListaEspera), compõe nome e e-mail do participante e monta o CSV com código, nome, e-mail, situação e recebida em.\nSaída: Nome do arquivo e conteúdo CSV, que a página entrega como download.",
          "purpose": "Gera o CSV com todos os inscritos do evento para o organizador baixar.",
          "input": "eventoId: evento selecionado.",
          "processing": "Lê todas as inscrições do evento (sem paginação) por ordem de chegada (ordemChegadaListaEspera), compõe nome e e-mail do participante e monta o CSV com código, nome, e-mail, situação e recebida em.",
          "output": "Nome do arquivo e conteúdo CSV, que a página entrega como download."
        }
      },
      {
        "route": "inscricaoEvento.gestao_eventos.cmdSalvarEvento",
        "kind": "cmd",
        "uses": [
          "createEvento"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "resumo",
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
            "kind": "entity",
            "path": "evento",
            "entity": "Evento",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
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
            "kind": "unresolved",
            "path": "evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Cadastra um novo evento como rascunho.\nEntrada: title, description, eventDate, venueName (nome do local) e capacity (número de vagas) informados no formulário.\nProcessamento: Cria o evento na organização do organizador com situação draft. Ocupação é derivada (zero vagas ocupadas, restantes iguais às vagas, lista de espera vazia), nunca gravada.\nSaída: O evento criado no formato da lista (inserido nela) e no formato de detalhe (exibido para revisão), sem nova chamada.",
          "purpose": "Cadastra um novo evento como rascunho.",
          "input": "title, description, eventDate, venueName (nome do local) e capacity (número de vagas) informados no formulário.",
          "processing": "Cria o evento na organização do organizador com situação draft. Ocupação é derivada (zero vagas ocupadas, restantes iguais às vagas, lista de espera vazia), nunca gravada.",
          "output": "O evento criado no formato da lista (inserido nela) e no formato de detalhe (exibido para revisão), sem nova chamada."
        }
      },
      {
        "route": "inscricaoEvento.gestao_eventos.cmdPublicarEvento",
        "kind": "cmd",
        "uses": [
          "publicar"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "resumo",
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
            "kind": "entity",
            "path": "evento",
            "entity": "Evento",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
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
            "kind": "unresolved",
            "path": "evento.details.venue",
            "reason": "Evento inside Evento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "publicarExigeDadosCompletos"
        ],
        "doc": {
          "raw": "Finalidade: Publica o evento em rascunho, abrindo a página pública para inscrições.\nEntrada: id e version do evento (concorrência otimista).\nProcessamento: Aplica a transição publicar (draft → published). Recusa se o evento não tiver título, descrição, data, local e número de vagas preenchidos ou se as vagas não forem maiores que zero (publicarExigeDadosCompletos). publishedAt é registrado pelo sistema na transição.\nSaída: O evento atualizado no formato da lista e do detalhe, com situação publicado e data de publicação, para redesenhar sem nova chamada.",
          "purpose": "Publica o evento em rascunho, abrindo a página pública para inscrições.",
          "input": "id e version do evento (concorrência otimista).",
          "processing": "Aplica a transição publicar (draft → published). Recusa se o evento não tiver título, descrição, data, local e número de vagas preenchidos ou se as vagas não forem maiores que zero (publicarExigeDadosCompletos). publishedAt é registrado pelo sistema na transição.",
          "output": "O evento atualizado no formato da lista e do detalhe, com situação publicado e data de publicação, para redesenhar sem nova chamada."
        }
      }
    ]
  }
} as const;

export default definition;
