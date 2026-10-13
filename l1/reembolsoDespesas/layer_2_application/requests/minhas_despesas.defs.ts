/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/minhas_despesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "minhas_despesas",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/createDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/enviarParaAprovacao.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/reenviarParaAprovacao.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.defs.ts"
  ],
  "data": {
    "pageId": "minhas_despesas",
    "requests": [
      {
        "route": "reembolsoDespesas.minhas_despesas.listarMinhasDespesas",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "output": [
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
            "target": "despesas",
            "pages": "despesas"
          },
          {
            "name": "pageSize",
            "target": "despesas",
            "pages": "despesas"
          },
          {
            "name": "status",
            "target": "despesas",
            "field": "status"
          }
        ],
        "rules": [
          "expenseOwnerOnly"
        ],
        "doc": {
          "raw": "Finalidade: Carrega, ao abrir a página, as despesas registradas pelo colaborador logado para que ele acompanhe a situação de cada uma e escolha qual abrir.\nEntrada: status: filtro opcional pela situação (por exemplo ’rejected’ para localizar as despesas a corrigir); page e pageSize: página solicitada e tamanho da página.\nProcessamento: Filtra pelo colaboradorId da sessão (expenseOwnerOnly: o colaborador só vê despesas que registrou), aplica o filtro opcional de situação usando a coluna indexada e ordena pela data da despesa mais recente. Pagina o resultado.\nSaída: Página { items, page, pageSize, hasMore } de despesas com id, situação, data, categoria e valor, exatamente o que a lista mostra.",
          "purpose": "Carrega, ao abrir a página, as despesas registradas pelo colaborador logado para que ele acompanhe a situação de cada uma e escolha qual abrir.",
          "input": "status: filtro opcional pela situação (por exemplo ’rejected’ para localizar as despesas a corrigir); page e pageSize: página solicitada e tamanho da página.",
          "processing": "Filtra pelo colaboradorId da sessão (expenseOwnerOnly: o colaborador só vê despesas que registrou), aplica o filtro opcional de situação usando a coluna indexada e ordena pela data da despesa mais recente. Pagina o resultado.",
          "output": "Página { items, page, pageSize, hasMore } de despesas com id, situação, data, categoria e valor, exatamente o que a lista mostra."
        }
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.obterDespesa",
        "kind": "qry",
        "uses": [
          "getDespesa"
        ],
        "transaction": "none",
        "output": [
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
            "name": "id",
            "target": "despesa",
            "field": "id"
          }
        ],
        "rules": [
          "expenseOwnerOnly"
        ],
        "doc": {
          "raw": "Finalidade: Abre a despesa escolhida na lista com todos os dados que o detalhe, o formulário de correção e as ações de envio precisam.\nEntrada: id: identificador da despesa selecionada na lista.\nProcessamento: Lê a despesa pelo id e recusa se o colaboradorId não for o do colaborador logado (expenseOwnerOnly). Inclui a referência do comprovante anexado quando houver.\nSaída: A despesa com id, versão, situação, data, categoria, valor, descrição, motivo da rejeição, indicador de reenvio e data de pagamento; a versão é usada nos comandos seguintes.",
          "purpose": "Abre a despesa escolhida na lista com todos os dados que o detalhe, o formulário de correção e as ações de envio precisam.",
          "input": "id: identificador da despesa selecionada na lista.",
          "processing": "Lê a despesa pelo id e recusa se o colaboradorId não for o do colaborador logado (expenseOwnerOnly). Inclui a referência do comprovante anexado quando houver.",
          "output": "A despesa com id, versão, situação, data, categoria, valor, descrição, motivo da rejeição, indicador de reenvio e data de pagamento; a versão é usada nos comandos seguintes."
        }
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.registrarDespesa",
        "kind": "cmd",
        "uses": [
          "createDespesa"
        ],
        "transaction": "single",
        "output": [
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
            "path": "item",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
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
        "params": [],
        "rules": [
          "validExpenseData"
        ],
        "doc": {
          "raw": "Finalidade: Registra uma nova despesa do colaborador em rascunho.\nEntrada: colaboradorId: colaborador logado, vindo da sessão; dataDespesa, categoria, valor e descricao: dados preenchidos no formulário.\nProcessamento: Valida que data, categoria, valor e descrição estão preenchidos (validExpenseData). Cria a despesa com situação ’draft’ e reenvioRealizado falso, vinculada ao colaboradorId da sessão. O comprovante é anexado pela capacidade de anexo de documento.\nSaída: A despesa criada completa, para abrir no detalhe com a ação de envio, e a linha resumida, para inserir na lista sem nova consulta.",
          "purpose": "Registra uma nova despesa do colaborador em rascunho.",
          "input": "colaboradorId: colaborador logado, vindo da sessão; dataDespesa, categoria, valor e descricao: dados preenchidos no formulário.",
          "processing": "Valida que data, categoria, valor e descrição estão preenchidos (validExpenseData). Cria a despesa com situação ’draft’ e reenvioRealizado falso, vinculada ao colaboradorId da sessão. O comprovante é anexado pela capacidade de anexo de documento.",
          "output": "A despesa criada completa, para abrir no detalhe com a ação de envio, e a linha resumida, para inserir na lista sem nova consulta."
        }
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.salvarCorrecao",
        "kind": "cmd",
        "uses": [
          "updateDespesa"
        ],
        "transaction": "single",
        "output": [
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
            "path": "item",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
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
        "params": [],
        "rules": [
          "expenseOwnerOnly",
          "validExpenseData",
          "singleResubmission"
        ],
        "doc": {
          "raw": "Finalidade: Salva a correção dos dados de uma despesa rejeitada antes do reenvio.\nEntrada: id e version: despesa corrigida e versão lida, para controle de concorrência; dataDespesa, categoria, valor e descricao: dados corrigidos.\nProcessamento: Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’rejected’ ou se reenvioRealizado já for verdadeiro (singleResubmission: só se corrige e reenvia uma vez), ou se a versão divergir. Valida os dados obrigatórios (validExpenseData) e atualiza sem alterar o colaboradorId nem a situação.\nSaída: A despesa atualizada completa, para redesenhar detalhe e formulário, e a linha resumida, para atualizar a lista no lugar.",
          "purpose": "Salva a correção dos dados de uma despesa rejeitada antes do reenvio.",
          "input": "id e version: despesa corrigida e versão lida, para controle de concorrência; dataDespesa, categoria, valor e descricao: dados corrigidos.",
          "processing": "Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’rejected’ ou se reenvioRealizado já for verdadeiro (singleResubmission: só se corrige e reenvia uma vez), ou se a versão divergir. Valida os dados obrigatórios (validExpenseData) e atualiza sem alterar o colaboradorId nem a situação.",
          "output": "A despesa atualizada completa, para redesenhar detalhe e formulário, e a linha resumida, para atualizar a lista no lugar."
        }
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.enviarParaAprovacao",
        "kind": "cmd",
        "uses": [
          "enviarParaAprovacao"
        ],
        "transaction": "single",
        "output": [
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
            "path": "item",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
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
        "params": [],
        "rules": [
          "expenseOwnerOnly",
          "proofRequiredBeforeSubmission",
          "validExpenseData"
        ],
        "doc": {
          "raw": "Finalidade: Envia a despesa em rascunho para aprovação do gestor da equipe.\nEntrada: id e version: despesa a enviar e versão lida.\nProcessamento: Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’draft’, se a versão divergir, se não houver comprovante anexado (proofRequiredBeforeSubmission) ou se faltar data, categoria, valor ou descrição (validExpenseData). Move a situação para ’awaitingApproval’.\nSaída: A despesa com a nova situação, para redesenhar detalhe e ações, e a linha resumida para atualizar a lista.",
          "purpose": "Envia a despesa em rascunho para aprovação do gestor da equipe.",
          "input": "id e version: despesa a enviar e versão lida.",
          "processing": "Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’draft’, se a versão divergir, se não houver comprovante anexado (proofRequiredBeforeSubmission) ou se faltar data, categoria, valor ou descrição (validExpenseData). Move a situação para ’awaitingApproval’.",
          "output": "A despesa com a nova situação, para redesenhar detalhe e ações, e a linha resumida para atualizar a lista."
        }
      },
      {
        "route": "reembolsoDespesas.minhas_despesas.reenviarParaAprovacao",
        "kind": "cmd",
        "uses": [
          "reenviarParaAprovacao"
        ],
        "transaction": "single",
        "output": [
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
            "path": "item",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
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
        "params": [],
        "rules": [
          "expenseOwnerOnly",
          "singleResubmission",
          "proofRequiredBeforeSubmission",
          "validExpenseData"
        ],
        "doc": {
          "raw": "Finalidade: Reenvia, uma única vez, a despesa rejeitada e corrigida para nova análise do gestor.\nEntrada: id e version: despesa a reenviar e versão lida.\nProcessamento: Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’rejected’, se reenvioRealizado já for verdadeiro (singleResubmission), se não houver comprovante (proofRequiredBeforeSubmission), se faltar dado obrigatório (validExpenseData) ou se a versão divergir. Move a situação para ’awaitingApproval’ e marca reenvioRealizado como verdadeiro.\nSaída: A despesa com a nova situação e o reenvio marcado, para redesenhar detalhe e ações, e a linha resumida para atualizar a lista.",
          "purpose": "Reenvia, uma única vez, a despesa rejeitada e corrigida para nova análise do gestor.",
          "input": "id e version: despesa a reenviar e versão lida.",
          "processing": "Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’rejected’, se reenvioRealizado já for verdadeiro (singleResubmission), se não houver comprovante (proofRequiredBeforeSubmission), se faltar dado obrigatório (validExpenseData) ou se a versão divergir. Move a situação para ’awaitingApproval’ e marca reenvioRealizado como verdadeiro.",
          "output": "A despesa com a nova situação e o reenvio marcado, para redesenhar detalhe e ações, e a linha resumida para atualizar a lista."
        }
      }
    ]
  }
} as const;

export default definition;
