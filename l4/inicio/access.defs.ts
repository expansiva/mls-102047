/// <mls fileReference="_102047_/l4/inicio/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioAccess = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "inicio",
  "actors": [
    {
      "actorId": "responsavel",
      "kind": "internal",
      "origin": "named",
      "title": "Responsável pela empresa",
      "description": "Pessoa que a plataforma já reconhece como responsável pela empresa. Completa os dados da empresa que faltam, vê as pessoas da organização e quais ainda não completaram o acesso, e libera o acesso pela liberação da plataforma. Também é uma pessoa da organização.",
      "personEntity": "PessoaOrganizacao"
    },
    {
      "actorId": "pessoaOrganizacao",
      "kind": "internal",
      "origin": "named",
      "title": "Pessoa da organização",
      "description": "Qualquer pessoa autenticada e aceita na organização. Ao entrar, completa só os dados mínimos que faltam no próprio cadastro (nome, telefone opcional, país e consentimento de privacidade quando a lei exige) e segue para os módulos que pode usar.",
      "personEntity": "PessoaOrganizacao"
    }
  ],
  "grants": [
    {
      "grantId": "responsavelPrepararEmpresa",
      "actorRef": "responsavel",
      "title": "Preparar a empresa",
      "description": "O responsável vê os dados da empresa e seus contatos e completa só os dados obrigatórios que faltam (nome, documento, endereço, contato).",
      "entityRefs": [
        "Empresa",
        "ContatoEmpresa"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "A empresa dona do app e os contatos dela, na organização inteira."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O responsável vê o registro completo da empresa e dos contatos, inclusive se a empresa está preparada e o que ainda falta."
      }
    },
    {
      "grantId": "responsavelAcompanharPessoas",
      "actorRef": "responsavel",
      "title": "Acompanhar o acesso das pessoas",
      "description": "O responsável vê as pessoas da organização e quais ainda não completaram o acesso; a liberação de acesso é feita pela plataforma.",
      "entityRefs": [
        "PessoaOrganizacao"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as pessoas da organização."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "O responsável vê nome, situação, país, contatos e o que falta para cada pessoa completar o acesso; não vê o conteúdo do consentimento de privacidade.",
        "allowedFields": [
          "PessoaOrganizacao.details.identification",
          "PessoaOrganizacao.details.base.contacts",
          "PessoaOrganizacao.details.inicio"
        ],
        "deniedFields": [
          "PessoaOrganizacao.details.person.privacyConsent"
        ]
      }
    },
    {
      "grantId": "responsavelMeuAcesso",
      "actorRef": "responsavel",
      "title": "Completar meu acesso (responsável)",
      "description": "Como pessoa da organização, o responsável também completa os dados mínimos do próprio cadastro.",
      "entityRefs": [
        "PessoaOrganizacao"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente o próprio cadastro ligado ao login do responsável.",
        "anchorEntity": "PessoaOrganizacao"
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O responsável vê todo o próprio cadastro."
      }
    },
    {
      "grantId": "responsavelMeuTelefone",
      "actorRef": "responsavel",
      "title": "Meu telefone (responsável)",
      "description": "O responsável informa ou corrige o próprio telefone opcional ao completar o acesso.",
      "entityRefs": [
        "TelefonePessoa"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente o telefone ligado, pelo vínculo de contato da plataforma (HasContact), ao cadastro da pessoa da sessão."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O responsável vê todo o registro do próprio telefone."
      }
    },
    {
      "grantId": "pessoaCompletarMeuAcesso",
      "actorRef": "pessoaOrganizacao",
      "title": "Completar meu acesso",
      "description": "A pessoa vê o próprio cadastro ligado ao e-mail da conta autenticada e informa só o que falta: nome, país e consentimento de privacidade quando a lei exige.",
      "entityRefs": [
        "PessoaOrganizacao"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente o próprio cadastro da pessoa ligado ao seu login.",
        "anchorEntity": "PessoaOrganizacao"
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A pessoa vê todo o próprio cadastro e o que ainda falta; o e-mail de login é apenas exibido."
      }
    },
    {
      "grantId": "pessoaMeuTelefone",
      "actorRef": "pessoaOrganizacao",
      "title": "Meu telefone",
      "description": "A pessoa informa o telefone opcional ao completar o acesso.",
      "entityRefs": [
        "TelefonePessoa"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente o telefone ligado, pelo vínculo de contato da plataforma (HasContact), ao cadastro da pessoa da sessão."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A pessoa vê todo o registro do próprio telefone."
      }
    },
    {
      "grantId": "pessoaVerEmpresa",
      "actorRef": "pessoaOrganizacao",
      "title": "Ver a empresa na boas-vindas",
      "description": "A pessoa vê o nome da empresa na tela de boas-vindas.",
      "entityRefs": [
        "Empresa"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "A empresa dona do app à qual a pessoa pertence."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Apenas o nome e o nome comercial da empresa.",
        "allowedFields": [
          "Empresa.details.identification.name",
          "Empresa.details.company.tradeName"
        ]
      }
    }
  ]
} as const satisfies Ns5Readonly<Ns5AccessArtifact>;

export type InicioAccessType = typeof inicioAccess;

export default inicioAccess;
