/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/pessoas_organizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "pessoas_organizacao",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.defs.ts"
  ],
  "data": {
    "pageId": "pessoas_organizacao",
    "requests": [
      {
        "route": "inicio.pessoas_organizacao.abrirPessoasOrganizacao",
        "kind": "qry",
        "uses": [
          "getEmpresa",
          "listPessoaOrganizacao"
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
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.inicio.acessoCompleto",
                "path": "details.inicio.acessoCompleto"
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
          "acessoCompletoDadosMinimos",
          "empresaPreparadaDadosObrigatorios"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez a situação de preparo da empresa do responsável e a primeira página das pessoas da organização.\nEntrada: page: número da página da lista de pessoas (começa em 1); pageSize: quantidade de pessoas por página.\nProcessamento: Resolve a empresa da organização do responsável logado e calcula preparada e dadosFaltantes conforme empresaPreparadaDadosObrigatorios (nome, documento, ao menos um endereço e ao menos um contato). Lista as pessoas com o papel inicio.PessoaOrganizacao ligadas à empresa (locate.byTag/listLinks), ordenadas com as de acesso incompleto primeiro e depois por nome; para cada uma calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento válido se Brasil/UE; telefone não conta). Valores derivados são calculados, nunca gravados. O consentimento de privacidade nunca é lido para a saída.\nSaída: empresa: id, preparada e lista dos dados obrigatórios que faltam. pessoas: página { items, page, pageSize, hasMore } de pessoas com id, nome, país, situação na plataforma, acesso completo e dados que faltam.",
          "purpose": "Carrega de uma vez a situação de preparo da empresa do responsável e a primeira página das pessoas da organização.",
          "input": "page: número da página da lista de pessoas (começa em 1); pageSize: quantidade de pessoas por página.",
          "processing": "Resolve a empresa da organização do responsável logado e calcula preparada e dadosFaltantes conforme empresaPreparadaDadosObrigatorios (nome, documento, ao menos um endereço e ao menos um contato). Lista as pessoas com o papel inicio.PessoaOrganizacao ligadas à empresa (locate.byTag/listLinks), ordenadas com as de acesso incompleto primeiro e depois por nome; para cada uma calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento válido se Brasil/UE; telefone não conta). Valores derivados são calculados, nunca gravados. O consentimento de privacidade nunca é lido para a saída.",
          "output": "empresa: id, preparada e lista dos dados obrigatórios que faltam. pessoas: página { items, page, pageSize, hasMore } de pessoas com id, nome, país, situação na plataforma, acesso completo e dados que faltam."
        }
      },
      {
        "route": "inicio.pessoas_organizacao.buscarPessoas",
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
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.inicio.acessoCompleto",
                "path": "details.inicio.acessoCompleto"
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
          },
          {
            "name": "busca",
            "target": "pessoas",
            "field": "details.identification.name"
          }
        ],
        "rules": [
          "acessoCompletoDadosMinimos"
        ],
        "doc": {
          "raw": "Finalidade: Procura as pessoas da organização pelo nome e filtra pela situação do acesso, paginando o resultado.\nEntrada: busca: trecho do nome da pessoa (opcional); situacao: ’todas’, ’acessoIncompleto’ (acessoCompleto falso) ou ’aguardandoLiberacao’ (situação na plataforma diferente de Active); page e pageSize: página pedida e tamanho.\nProcessamento: Restringe às pessoas da organização do responsável logado com papel inicio.PessoaOrganizacao; aplica locate.byName quando há busca; calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos e aplica o filtro de situação sobre esses valores e o status. Ordena com acesso incompleto primeiro e depois por nome. Não lê o consentimento de privacidade.\nSaída: pessoas: página { items, page, pageSize, hasMore } de pessoas com id, nome, país, situação, acesso completo e dados que faltam.",
          "purpose": "Procura as pessoas da organização pelo nome e filtra pela situação do acesso, paginando o resultado.",
          "input": "busca: trecho do nome da pessoa (opcional); situacao: ’todas’, ’acessoIncompleto’ (acessoCompleto falso) ou ’aguardandoLiberacao’ (situação na plataforma diferente de Active); page e pageSize: página pedida e tamanho.",
          "processing": "Restringe às pessoas da organização do responsável logado com papel inicio.PessoaOrganizacao; aplica locate.byName quando há busca; calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos e aplica o filtro de situação sobre esses valores e o status. Ordena com acesso incompleto primeiro e depois por nome. Não lê o consentimento de privacidade.",
          "output": "pessoas: página { items, page, pageSize, hasMore } de pessoas com id, nome, país, situação, acesso completo e dados que faltam."
        }
      },
      {
        "route": "inicio.pessoas_organizacao.obterPessoa",
        "kind": "qry",
        "uses": [
          "getPessoaOrganizacao"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "pessoa",
            "entity": "PessoaOrganizacao",
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
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.inicio.acessoCompleto",
                "path": "details.inicio.acessoCompleto"
              },
              {
                "field": "details.inicio.dadosFaltantes",
                "path": "details.inicio.dadosFaltantes"
              },
              {
                "field": "details.inicio.consentimentoExigido",
                "path": "details.inicio.consentimentoExigido"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "pessoa.etapaLiberacao",
            "reason": "COMPUTED_NOT_DISCLOSED: inicio.pessoas_organizacao.obterPessoa etapaLiberacao"
          },
          {
            "kind": "unresolved",
            "path": "pessoa.contacts",
            "reason": "Interface ContatoPessoa has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "pessoa.contacts",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route inicio.pessoas_organizacao.obterPessoa projects PessoaOrganizacao.contacts, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "acessoCompletoDadosMinimos",
          "ligacaoLoginPelaPlataforma",
          "dadosNaoConcedemPermissoes"
        ],
        "doc": {
          "raw": "Finalidade: Lê a pessoa selecionada com tudo que explica a situação do acesso dela e a etapa da liberação.\nEntrada: pessoaId: id (mdmId) da pessoa selecionada na lista.\nProcessamento: Lê a pessoa por read.byId, recusando se não pertence à organização do responsável logado. Calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos e consentimentoExigido pelo país (Brasil ou União Europeia), sem expor o conteúdo do consentimento (campo negado pelo grant). Deriva etapaLiberacao de status e acessoCompleto: acessoCompletado se acesso completo; loginLigado se Active com dados faltando; acessoLiberado/pedidoEncaminhado conforme a situação na plataforma; a ligação do login é decidida só pela liberação da plataforma (ligacaoLoginPelaPlataforma) e o endpoint não registra pendência. Não concede papéis nem permissões (dadosNaoConcedemPermissoes).\nSaída: pessoa: id, nome, país, situação, contatos (e-mail da conta e telefone opcional), acesso completo, dados que faltam, se o consentimento é exigido e a etapa atual da liberação.",
          "purpose": "Lê a pessoa selecionada com tudo que explica a situação do acesso dela e a etapa da liberação.",
          "input": "pessoaId: id (mdmId) da pessoa selecionada na lista.",
          "processing": "Lê a pessoa por read.byId, recusando se não pertence à organização do responsável logado. Calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos e consentimentoExigido pelo país (Brasil ou União Europeia), sem expor o conteúdo do consentimento (campo negado pelo grant). Deriva etapaLiberacao de status e acessoCompleto: acessoCompletado se acesso completo; loginLigado se Active com dados faltando; acessoLiberado/pedidoEncaminhado conforme a situação na plataforma; a ligação do login é decidida só pela liberação da plataforma (ligacaoLoginPelaPlataforma) e o endpoint não registra pendência. Não concede papéis nem permissões (dadosNaoConcedemPermissoes).",
          "output": "pessoa: id, nome, país, situação, contatos (e-mail da conta e telefone opcional), acesso completo, dados que faltam, se o consentimento é exigido e a etapa atual da liberação."
        }
      }
    ]
  }
} as const;

export default definition;
