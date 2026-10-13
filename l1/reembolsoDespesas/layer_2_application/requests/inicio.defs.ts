/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "inicio",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getColaborador.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts"
  ],
  "data": {
    "pageId": "inicio",
    "requests": [
      {
        "route": "reembolsoDespesas.inicio.qryInicio",
        "kind": "qry",
        "uses": [
          "listDespesa",
          "getColaborador"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesasPendentes.items.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.inicio.qryInicio projects items.details, items.colaborador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "despesasPendentes",
            "entity": "Despesa",
            "items": "items",
            "page": "despesasPendentes.page",
            "pageSize": "despesasPendentes.pageSize",
            "hasMore": "despesasPendentes.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "despesasPendentes.items.colaborador.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.inicio.qryInicio projects items.details, items.colaborador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "despesasPendentes.items.colaborador",
            "entity": "Colaborador",
            "relationship": "expenseCollaborator",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "despesasPendentes.items.colaborador.details.identification",
            "entity": "Colaborador",
            "fields": [
              {
                "field": "details.identification.subtype",
                "path": "details.identification.subtype"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.docType",
                "path": "details.identification.docType"
              },
              {
                "field": "details.identification.docId",
                "path": "details.identification.docId"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.tags",
                "path": "details.identification.tags"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "totalPendentes",
            "reason": "Output totalPendentes is a value (number), not an interface; no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "despesasPendentes.colaborador.details.identification",
            "reason": "Colaborador inside Colaborador needs one L4 relationship between them; found 0."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "despesasPendentes",
            "pages": "despesasPendentes"
          },
          {
            "name": "pageSize",
            "target": "despesasPendentes",
            "pages": "despesasPendentes"
          }
        ],
        "rules": [
          "managerTeamExpenseAccess"
        ],
        "doc": {
          "raw": "Finalidade: Carrega, ao abrir a página inicial, o total de despesas da equipe que aguardam a decisão do gestor e a lista dessas despesas com quem as registrou.\nEntrada: page: número da página da lista de pendências (padrão 1); pageSize: quantidade de despesas por página.\nProcessamento: Identifica o gestor logado e os colaboradores de sua equipe (vínculo ReportsTo). Aplica managerTeamExpenseAccess: considera somente despesas de colaboradores da própria equipe. Filtra status = awaitingApproval, ordena pela data da despesa mais antiga primeiro, pagina a lista e junta a identificação completa do colaborador (nome, tipo de cadastro, situação, documento, país e etiquetas) pelo colaboradorId. O totalPendentes é calculado no servidor por contagem com os mesmos filtros (situação e escopo da equipe), independentemente da página.\nSaída: totalPendentes: número de despesas aguardando decisão, para o destaque do volume pendente; despesasPendentes: página de despesas com data, categoria, valor, indicador de reenvio e identificação do colaborador, para o gestor escolher o que analisar antes de seguir para despesas_da_equipe.",
          "purpose": "Carrega, ao abrir a página inicial, o total de despesas da equipe que aguardam a decisão do gestor e a lista dessas despesas com quem as registrou.",
          "input": "page: número da página da lista de pendências (padrão 1); pageSize: quantidade de despesas por página.",
          "processing": "Identifica o gestor logado e os colaboradores de sua equipe (vínculo ReportsTo). Aplica managerTeamExpenseAccess: considera somente despesas de colaboradores da própria equipe. Filtra status = awaitingApproval, ordena pela data da despesa mais antiga primeiro, pagina a lista e junta a identificação completa do colaborador (nome, tipo de cadastro, situação, documento, país e etiquetas) pelo colaboradorId. O totalPendentes é calculado no servidor por contagem com os mesmos filtros (situação e escopo da equipe), independentemente da página.",
          "output": "totalPendentes: número de despesas aguardando decisão, para o destaque do volume pendente; despesasPendentes: página de despesas com data, categoria, valor, indicador de reenvio e identificação do colaborador, para o gestor escolher o que analisar antes de seguir para despesas_da_equipe."
        }
      }
    ]
  }
} as const;

export default definition;
