/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/inicio_responsavel.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "inicio_responsavel",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.defs.ts"
  ],
  "data": {
    "pageId": "inicio_responsavel",
    "requests": [
      {
        "route": "inicio.inicio_responsavel.qryPainelResponsavel",
        "kind": "qry",
        "uses": [
          "getEmpresa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "empresa",
            "entity": "Empresa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.inicio.preparada",
                "path": "details.inicio.preparada"
              },
              {
                "field": "details.inicio.dadosFaltantes",
                "path": "details.inicio.dadosFaltantes"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "indicadores",
            "rules": [
              "acessoCompletoDadosMinimos"
            ]
          }
        ],
        "params": [],
        "rules": [
          "empresaPreparadaDadosObrigatorios",
          "naoPedirDadoJaExistente",
          "acessoCompletoDadosMinimos"
        ],
        "doc": {
          "raw": "Finalidade: Carrega, ao abrir o Início do responsável, a situação de preparo da empresa e os números de acesso das pessoas da organização.\nEntrada: Nenhuma entrada: a empresa e a organização vêm da sessão do responsável.\nProcessamento: Lê a empresa da organização da sessão e calcula (inicio.verificarPreparo) preparada e dadosFaltantes conforme empresaPreparadaDadosObrigatorios: nome, documento, ao menos um endereço e ao menos um contato; dadosFaltantes lista só o que a plataforma ainda não tem (naoPedirDadoJaExistente). Para as pessoas com papel inicio.PessoaOrganizacao da organização, calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento quando o país é Brasil ou UE; telefone não conta) e conta: quantas têm acesso completo, quantas têm dados faltando e quantas têm consentimento exigido ainda pendente. Valores derivados são calculados, nunca gravados.\nSaída: empresa: id, nome, indicador de preparada e lista de dados obrigatórios que faltam. indicadores: os três totais já calculados.",
          "purpose": "Carrega, ao abrir o Início do responsável, a situação de preparo da empresa e os números de acesso das pessoas da organização.",
          "input": "Nenhuma entrada: a empresa e a organização vêm da sessão do responsável.",
          "processing": "Lê a empresa da organização da sessão e calcula (inicio.verificarPreparo) preparada e dadosFaltantes conforme empresaPreparadaDadosObrigatorios: nome, documento, ao menos um endereço e ao menos um contato; dadosFaltantes lista só o que a plataforma ainda não tem (naoPedirDadoJaExistente). Para as pessoas com papel inicio.PessoaOrganizacao da organização, calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento quando o país é Brasil ou UE; telefone não conta) e conta: quantas têm acesso completo, quantas têm dados faltando e quantas têm consentimento exigido ainda pendente. Valores derivados são calculados, nunca gravados.",
          "output": "empresa: id, nome, indicador de preparada e lista de dados obrigatórios que faltam. indicadores: os três totais já calculados."
        }
      },
      {
        "route": "inicio.inicio_responsavel.qryPessoasAguardandoLiberacao",
        "kind": "qry",
        "uses": [
          "listPessoaOrganizacao"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "pessoas",
            "entity": "PessoaOrganizacao",
            "items": "items",
            "page": "pessoas.page",
            "pageSize": "pessoas.pageSize",
            "hasMore": "pessoas.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
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
                "field": "details.base.contacts",
                "path": "details.base.contacts"
              },
              {
                "field": "details.inicio.dadosFaltantes",
                "path": "details.inicio.dadosFaltantes"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "pessoas",
            "pages": "pessoas"
          },
          {
            "name": "pageSize",
            "target": "pessoas",
            "pages": "pessoas"
          }
        ],
        "rules": [
          "ligacaoLoginPelaPlataforma",
          "acessoCompletoDadosMinimos",
          "dadosNaoConcedemPermissoes"
        ],
        "doc": {
          "raw": "Finalidade: Lista, por páginas, as pessoas da organização que aguardam o responsável liberar o acesso.\nEntrada: page: número da página pedida; pageSize: quantidade de pessoas por página.\nProcessamento: Filtra as pessoas da organização do responsável com papel inicio.PessoaOrganizacao cuja situação na plataforma não está ativa (Inactive ou Blocked), ou seja, que aguardam a liberação da plataforma; o Início não guarda pendência nem decide a ligação do login (ligacaoLoginPelaPlataforma). Calcula dadosFaltantes de cada pessoa conforme acessoCompletoDadosMinimos. Não expõe o consentimento de privacidade (negado pelo grant). Ordena pelo nome.\nSaída: pessoas: página { items, page, pageSize, hasMore } com id, nome, situação, contatos e dados mínimos que faltam de cada pessoa.",
          "purpose": "Lista, por páginas, as pessoas da organização que aguardam o responsável liberar o acesso.",
          "input": "page: número da página pedida; pageSize: quantidade de pessoas por página.",
          "processing": "Filtra as pessoas da organização do responsável com papel inicio.PessoaOrganizacao cuja situação na plataforma não está ativa (Inactive ou Blocked), ou seja, que aguardam a liberação da plataforma; o Início não guarda pendência nem decide a ligação do login (ligacaoLoginPelaPlataforma). Calcula dadosFaltantes de cada pessoa conforme acessoCompletoDadosMinimos. Não expõe o consentimento de privacidade (negado pelo grant). Ordena pelo nome.",
          "output": "pessoas: página { items, page, pageSize, hasMore } com id, nome, situação, contatos e dados mínimos que faltam de cada pessoa."
        }
      }
    ]
  }
} as const;

export default definition;
