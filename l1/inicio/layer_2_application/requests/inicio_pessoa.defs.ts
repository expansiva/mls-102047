/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/inicio_pessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "inicio_pessoa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.defs.ts"
  ],
  "data": {
    "pageId": "inicio_pessoa",
    "requests": [
      {
        "route": "inicio.inicio_pessoa.qryInicioPessoa",
        "kind": "qry",
        "uses": [
          "getPessoaOrganizacao",
          "getEmpresa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "meuAcesso",
            "entity": "PessoaOrganizacao",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "empresa.details.company",
            "entity": "Empresa",
            "fields": [
              {
                "field": "tradeName",
                "path": "details.company.tradeName"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "meuAcesso.details.inicio",
            "rules": [
              "acessoCompletoDadosMinimos"
            ]
          },
          {
            "kind": "computed",
            "path": "pendencias",
            "rules": [
              "ligacaoLoginPelaPlataforma"
            ]
          },
          {
            "kind": "unresolved",
            "path": "meuAcesso.details.identification",
            "reason": "Interface MeuAcessoIdentificacao: fields details.identification.name, details.identification.countryCode are fields of ContatoEmpresa, Empresa, PessoaOrganizacao, TelefonePessoa; the types do not say which."
          },
          {
            "kind": "unresolved",
            "path": "empresa.details.identification",
            "reason": "Interface EmpresaDestaqueIdentificacao: fields details.identification.name are fields of ContatoEmpresa, Empresa, PessoaOrganizacao, TelefonePessoa; the types do not say which."
          }
        ],
        "params": [],
        "rules": [
          "acessoCompletoDadosMinimos",
          "ligacaoLoginPelaPlataforma",
          "naoPedirDadoJaExistente",
          "emailContaNaoEditavel",
          "seguirDiretoSeCompleto"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez, ao abrir o Início da pessoa, a situação do seu acesso, as pendências que esperam por ela e a empresa à qual pertence.\nEntrada: Nenhuma entrada: a pessoa é a da sessão, resolvida pela plataforma a partir do login (locate.byLogin).\nProcessamento: Lê o cadastro PessoaOrganizacao da pessoa logada (read.byId) e calcula, sem gravar, acessoCompleto, dadosFaltantes e consentimentoExigido (inicio.verificarAcessoCompleto). acessoCompletoDadosMinimos: completo quando há nome e país e, se o país for Brasil ou da União Europeia, consentimento de privacidade válido; telefone não conta. naoPedirDadoJaExistente: dadosFaltantes lista só o que a plataforma ainda não tem. Monta as pendências: ligacaoLoginPelaPlataforma — quando os contatos indicam que já existe outro cadastro com o mesmo e-mail e o login não está ligado, gera uma pendência ’pedirLiberacao’ com o e-mail da conta, sem guardar a pendência nem decidir a ligação; quando o login está ligado e o acesso não está completo, gera ’completarDadosMinimos’ com os dados que faltam. Se o acesso está completo e ligado, a lista vem vazia (seguirDiretoSeCompleto). emailContaNaoEditavel: o e-mail vem apenas para leitura, extraído dos contatos. Lê a empresa ligada por AssignedTo e devolve apenas nome e nome fantasia, conforme o grant pessoaVerEmpresa.\nSaída: meuAcesso: o cadastro da pessoa com nome, país, situação na plataforma e os valores calculados de acesso completo, dados que faltam e consentimento exigido. pendencias: lista curta, não paginada, das pendências da pessoa com tipo, e-mail da conta e dados faltantes. empresa: nome e nome fantasia da empresa da pessoa.",
          "purpose": "Carrega de uma vez, ao abrir o Início da pessoa, a situação do seu acesso, as pendências que esperam por ela e a empresa à qual pertence.",
          "input": "Nenhuma entrada: a pessoa é a da sessão, resolvida pela plataforma a partir do login (locate.byLogin).",
          "processing": "Lê o cadastro PessoaOrganizacao da pessoa logada (read.byId) e calcula, sem gravar, acessoCompleto, dadosFaltantes e consentimentoExigido (inicio.verificarAcessoCompleto). acessoCompletoDadosMinimos: completo quando há nome e país e, se o país for Brasil ou da União Europeia, consentimento de privacidade válido; telefone não conta. naoPedirDadoJaExistente: dadosFaltantes lista só o que a plataforma ainda não tem. Monta as pendências: ligacaoLoginPelaPlataforma — quando os contatos indicam que já existe outro cadastro com o mesmo e-mail e o login não está ligado, gera uma pendência ’pedirLiberacao’ com o e-mail da conta, sem guardar a pendência nem decidir a ligação; quando o login está ligado e o acesso não está completo, gera ’completarDadosMinimos’ com os dados que faltam. Se o acesso está completo e ligado, a lista vem vazia (seguirDiretoSeCompleto). emailContaNaoEditavel: o e-mail vem apenas para leitura, extraído dos contatos. Lê a empresa ligada por AssignedTo e devolve apenas nome e nome fantasia, conforme o grant pessoaVerEmpresa.",
          "output": "meuAcesso: o cadastro da pessoa com nome, país, situação na plataforma e os valores calculados de acesso completo, dados que faltam e consentimento exigido. pendencias: lista curta, não paginada, das pendências da pessoa com tipo, e-mail da conta e dados faltantes. empresa: nome e nome fantasia da empresa da pessoa."
        }
      }
    ]
  }
} as const;

export default definition;
