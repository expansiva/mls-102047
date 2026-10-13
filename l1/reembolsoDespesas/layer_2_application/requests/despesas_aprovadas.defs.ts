/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "despesas_aprovadas",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.defs.ts"
  ],
  "data": {
    "pageId": "despesas_aprovadas",
    "requests": [
      {
        "route": "reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesas.items.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas projects items.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "despesas",
            "entity": "Despesa",
            "items": "items",
            "page": "despesas.page",
            "pageSize": "despesas.pageSize",
            "hasMore": "despesas.hasMore",
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
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "despesas",
            "pages": "despesas"
          },
          {
            "name": "pageSize",
            "target": "despesas",
            "pages": "despesas"
          },
          {
            "name": "colaboradorId",
            "target": "despesas",
            "field": "colaboradorId"
          },
          {
            "name": "details",
            "target": "despesas",
            "field": "details"
          }
        ],
        "rules": [
          "financeApprovedExpenseAccess"
        ],
        "doc": {
          "raw": "Finalidade: Carrega a fila de despesas aprovadas que aguardam pagamento, para o financeiro localizar e escolher a despesa a pagar.\nEntrada: page e pageSize: página e tamanho da página da fila; colaboradorId (opcional): filtra as despesas de um colaborador; categoria (opcional): filtra pela categoria informada.\nProcessamento: Localiza despesas com status = ’approved’ (locate.byColumn), aplicando os filtros opcionais de colaborador e categoria, ordenadas pela data da despesa. Aplica financeApprovedExpenseAccess: o financeiro só consulta despesas aprovadas, portanto nenhuma outra situação é retornada.\nSaída: Página { items, page, pageSize, hasMore } com id, colaborador, situação, data, categoria e valor de cada despesa, no formato que a lista exibe.",
          "purpose": "Carrega a fila de despesas aprovadas que aguardam pagamento, para o financeiro localizar e escolher a despesa a pagar.",
          "input": "page e pageSize: página e tamanho da página da fila; colaboradorId (opcional): filtra as despesas de um colaborador; categoria (opcional): filtra pela categoria informada.",
          "processing": "Localiza despesas com status = ’approved’ (locate.byColumn), aplicando os filtros opcionais de colaborador e categoria, ordenadas pela data da despesa. Aplica financeApprovedExpenseAccess: o financeiro só consulta despesas aprovadas, portanto nenhuma outra situação é retornada.",
          "output": "Página { items, page, pageSize, hasMore } com id, colaborador, situação, data, categoria e valor de cada despesa, no formato que a lista exibe."
        }
      },
      {
        "route": "reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada",
        "kind": "qry",
        "uses": [
          "getDespesa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesa.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "despesa",
            "entity": "Despesa",
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
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "despesa",
            "field": "id"
          }
        ],
        "rules": [
          "financeApprovedExpenseAccess"
        ],
        "doc": {
          "raw": "Finalidade: Carrega os dados completos da despesa escolhida na fila, para o financeiro conferir antes de registrar o pagamento.\nEntrada: id: identificador da despesa selecionada na lista.\nProcessamento: Lê a despesa por id (read.byId). Aplica financeApprovedExpenseAccess: recusa a consulta se a despesa não estiver aprovada (ou já paga por este fluxo). Retorna apenas os campos permitidos ao financeiro.\nSaída: A despesa com id, versão, colaborador, situação, data, categoria, valor, descrição e data de pagamento; alimenta o detalhe e o formulário de pagamento (a versão é usada no comando).",
          "purpose": "Carrega os dados completos da despesa escolhida na fila, para o financeiro conferir antes de registrar o pagamento.",
          "input": "id: identificador da despesa selecionada na lista.",
          "processing": "Lê a despesa por id (read.byId). Aplica financeApprovedExpenseAccess: recusa a consulta se a despesa não estiver aprovada (ou já paga por este fluxo). Retorna apenas os campos permitidos ao financeiro.",
          "output": "A despesa com id, versão, colaborador, situação, data, categoria, valor, descrição e data de pagamento; alimenta o detalhe e o formulário de pagamento (a versão é usada no comando)."
        }
      },
      {
        "route": "reembolsoDespesas.despesas_aprovadas.registrarPagamento",
        "kind": "cmd",
        "uses": [
          "registrarPagamento"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesa.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_aprovadas.registrarPagamento projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "despesa",
            "entity": "Despesa",
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
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "financeApprovedExpenseAccess",
          "paymentDateRequired"
        ],
        "doc": {
          "raw": "Finalidade: Registra o pagamento da despesa aprovada, movendo-a da situação aprovada para paga.\nEntrada: id: despesa a pagar; version: versão lida no detalhe, para controle de concorrência; dataPagamento: data em que a despesa foi paga.\nProcessamento: Executa a transição registrarPagamento (approved -> paid) gravando details.dataPagamento. Aplica financeApprovedExpenseAccess: recusa se a despesa não estiver aprovada; aplica paymentDateRequired: recusa se a data de pagamento não for informada. Recusa se a versão não corresponder à atual.\nSaída: A despesa atualizada (situação paga, data de pagamento e nova versão), para o detalhe ser redesenhado e o item sair da fila sem nova chamada.",
          "purpose": "Registra o pagamento da despesa aprovada, movendo-a da situação aprovada para paga.",
          "input": "id: despesa a pagar; version: versão lida no detalhe, para controle de concorrência; dataPagamento: data em que a despesa foi paga.",
          "processing": "Executa a transição registrarPagamento (approved -> paid) gravando details.dataPagamento. Aplica financeApprovedExpenseAccess: recusa se a despesa não estiver aprovada; aplica paymentDateRequired: recusa se a data de pagamento não for informada. Recusa se a versão não corresponder à atual.",
          "output": "A despesa atualizada (situação paga, data de pagamento e nova versão), para o detalhe ser redesenhado e o item sair da fila sem nova chamada."
        }
      }
    ]
  }
} as const;

export default definition;
