/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/meu_cadastro.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "meu_cadastro",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.defs.ts",
    "_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.defs.ts"
  ],
  "data": {
    "pageId": "meu_cadastro",
    "requests": [
      {
        "route": "inicio.meu_cadastro.qryMeuCadastro",
        "kind": "qry",
        "uses": [
          "getPessoaOrganizacao",
          "getEmpresa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "meuCadastro",
            "entity": "PessoaOrganizacao",
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
                "field": "details.base.contacts",
                "path": "details.base.contacts"
              },
              {
                "field": "details.base.relationshipRefs",
                "path": "details.base.relationshipRefs"
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
            "kind": "computed",
            "path": "meuCadastro.aguardaLiberacao",
            "entity": "PessoaOrganizacao",
            "rules": [
              "acessoCompletoDadosMinimos",
              "naoPedirDadoJaExistente",
              "ligacaoLoginPelaPlataforma",
              "seguirDiretoSeCompleto",
              "repetirNaoDuplicaPessoa",
              "emailContaNaoEditavel"
            ]
          },
          {
            "kind": "related",
            "path": "meuCadastro.empresa",
            "entity": "Empresa",
            "relationship": "pessoaMembroEmpresa",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "acessoCompletoDadosMinimos",
          "naoPedirDadoJaExistente",
          "ligacaoLoginPelaPlataforma",
          "seguirDiretoSeCompleto",
          "repetirNaoDuplicaPessoa",
          "emailContaNaoEditavel"
        ],
        "doc": {
          "raw": "Finalidade: Carrega, em uma só chamada, o cadastro da pessoa logada na organização com a situação do acesso, o que falta, o aviso de liberação e o andamento do pedido.\nEntrada: Nenhuma entrada: a pessoa é a da sessão, resolvida pela plataforma (locate.byLogin).\nProcessamento: Lê o PessoaOrganizacao da sessão (read.byId) e o nome da Empresa ligada por AssignedTo. Calcula, sem gravar, acessoCompleto, dadosFaltantes e consentimentoExigido conforme acessoCompletoDadosMinimos (nome e país, e consentimento válido se o país for Brasil ou União Europeia; telefone não conta) e naoPedirDadoJaExistente (só lista o que a plataforma ainda não tem). Calcula aguardaLiberacao a partir da situação, dos contatos e dos vínculos quando já existe outro cadastro com o mesmo e-mail, sem guardar pendência nem decidir a ligação (ligacaoLoginPelaPlataforma); como é recalculado a cada leitura, o aviso persiste em outro navegador (repetirNaoDuplicaPessoa). O e-mail da conta vem nos contatos apenas para exibição (emailContaNaoEditavel). acessoCompleto verdadeiro indica que a pessoa pode seguir direto aos módulos (seguirDiretoSeCompleto).\nSaída: meuCadastro: o cadastro atual da pessoa com id, versão, nome, país, situação, contatos, vínculos, acesso completo, dados que faltam, consentimento exigido, indicador de aguardar liberação e o nome da empresa.",
          "purpose": "Carrega, em uma só chamada, o cadastro da pessoa logada na organização com a situação do acesso, o que falta, o aviso de liberação e o andamento do pedido.",
          "input": "Nenhuma entrada: a pessoa é a da sessão, resolvida pela plataforma (locate.byLogin).",
          "processing": "Lê o PessoaOrganizacao da sessão (read.byId) e o nome da Empresa ligada por AssignedTo. Calcula, sem gravar, acessoCompleto, dadosFaltantes e consentimentoExigido conforme acessoCompletoDadosMinimos (nome e país, e consentimento válido se o país for Brasil ou União Europeia; telefone não conta) e naoPedirDadoJaExistente (só lista o que a plataforma ainda não tem). Calcula aguardaLiberacao a partir da situação, dos contatos e dos vínculos quando já existe outro cadastro com o mesmo e-mail, sem guardar pendência nem decidir a ligação (ligacaoLoginPelaPlataforma); como é recalculado a cada leitura, o aviso persiste em outro navegador (repetirNaoDuplicaPessoa). O e-mail da conta vem nos contatos apenas para exibição (emailContaNaoEditavel). acessoCompleto verdadeiro indica que a pessoa pode seguir direto aos módulos (seguirDiretoSeCompleto).",
          "output": "meuCadastro: o cadastro atual da pessoa com id, versão, nome, país, situação, contatos, vínculos, acesso completo, dados que faltam, consentimento exigido, indicador de aguardar liberação e o nome da empresa."
        }
      },
      {
        "route": "inicio.meu_cadastro.salvarMeusDados",
        "kind": "cmd",
        "uses": [
          "updatePessoaOrganizacao",
          "getEmpresa"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "meuCadastro",
            "entity": "PessoaOrganizacao",
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
                "field": "details.base.contacts",
                "path": "details.base.contacts"
              },
              {
                "field": "details.base.relationshipRefs",
                "path": "details.base.relationshipRefs"
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
            "kind": "computed",
            "path": "meuCadastro.aguardaLiberacao",
            "entity": "PessoaOrganizacao",
            "rules": [
              "acessoCompletoDadosMinimos",
              "naoPedirDadoJaExistente",
              "emailContaNaoEditavel",
              "repetirNaoDuplicaPessoa",
              "dadosNaoConcedemPermissoes"
            ]
          },
          {
            "kind": "related",
            "path": "meuCadastro.empresa",
            "entity": "Empresa",
            "relationship": "pessoaMembroEmpresa",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "acessoCompletoDadosMinimos",
          "naoPedirDadoJaExistente",
          "emailContaNaoEditavel",
          "repetirNaoDuplicaPessoa",
          "dadosNaoConcedemPermissoes"
        ],
        "doc": {
          "raw": "Finalidade: Grava no próprio cadastro da pessoa logada os dados mínimos que faltavam.\nEntrada: id e version: o cadastro da pessoa e a versão lida, para concorrência otimista. details.identification.name: nome, quando faltava. details.identification.countryCode: país ISO 3166-1 alfa-2, quando faltava. details.person.privacyConsent: consentimento de privacidade, enviado quando o país exige (Brasil ou União Europeia).\nProcessamento: Recusa se o id não for o cadastro da pessoa da sessão ou se a versão estiver desatualizada. Atualiza pelo PessoaOrganizacao.update apenas os campos ainda vazios, sem sobrescrever o que a plataforma já tem (naoPedirDadoJaExistente). Recusa qualquer alteração do e-mail da conta (emailContaNaoEditavel). Exige consentimento quando o país informado ou existente é Brasil ou União Europeia (acessoCompletoDadosMinimos). É idempotente: repetir o envio atualiza o mesmo cadastro e nunca cria outra pessoa nem outro vínculo (repetirNaoDuplicaPessoa). Não concede papéis nem permissões (dadosNaoConcedemPermissoes). acessoCompleto, dadosFaltantes e consentimentoExigido são recalculados, nunca gravados.\nSaída: meuCadastro: o cadastro da pessoa no novo estado, com a nova versão, o acesso completo e os dados que ainda faltam recalculados, contatos, vínculos, aviso de liberação e nome da empresa.",
          "purpose": "Grava no próprio cadastro da pessoa logada os dados mínimos que faltavam.",
          "input": "id e version: o cadastro da pessoa e a versão lida, para concorrência otimista. details.identification.name: nome, quando faltava. details.identification.countryCode: país ISO 3166-1 alfa-2, quando faltava. details.person.privacyConsent: consentimento de privacidade, enviado quando o país exige (Brasil ou União Europeia).",
          "processing": "Recusa se o id não for o cadastro da pessoa da sessão ou se a versão estiver desatualizada. Atualiza pelo PessoaOrganizacao.update apenas os campos ainda vazios, sem sobrescrever o que a plataforma já tem (naoPedirDadoJaExistente). Recusa qualquer alteração do e-mail da conta (emailContaNaoEditavel). Exige consentimento quando o país informado ou existente é Brasil ou União Europeia (acessoCompletoDadosMinimos). É idempotente: repetir o envio atualiza o mesmo cadastro e nunca cria outra pessoa nem outro vínculo (repetirNaoDuplicaPessoa). Não concede papéis nem permissões (dadosNaoConcedemPermissoes). acessoCompleto, dadosFaltantes e consentimentoExigido são recalculados, nunca gravados.",
          "output": "meuCadastro: o cadastro da pessoa no novo estado, com a nova versão, o acesso completo e os dados que ainda faltam recalculados, contatos, vínculos, aviso de liberação e nome da empresa."
        }
      }
    ]
  }
} as const;

export default definition;
