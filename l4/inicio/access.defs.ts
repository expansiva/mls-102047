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
      "description": "Pessoa que a plataforma já reconhece como responsável pela empresa; completa os dados da empresa, convida pessoas pelo convite da plataforma, vê quem ainda não completou o acesso e libera o acesso das pessoas.",
      "personEntity": "PessoaOrganizacao"
    },
    {
      "actorId": "pessoaOrganizacao",
      "kind": "internal",
      "origin": "named",
      "title": "Pessoa da organização",
      "description": "Toda pessoa autenticada e aceita na organização, incluindo o responsável; completa o próprio acesso informando só os dados mínimos que faltam e o consentimento de privacidade quando a lei exige.",
      "personEntity": "PessoaOrganizacao"
    }
  ],
  "grants": [
    {
      "grantId": "responsavelPreparaEmpresa",
      "actorRef": "responsavel",
      "title": "Preparar a empresa",
      "description": "O responsável vê o cadastro completo da empresa da organização, com o que a plataforma já tem e o que falta, e completa apenas os dados obrigatórios ausentes (nome, documento, endereço, contato).",
      "entityRefs": [
        "Empresa"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "A empresa da organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Todo o cadastro da empresa, inclusive a indicação calculada de preparada e dos dados faltantes."
      }
    },
    {
      "grantId": "responsavelContatosEmpresa",
      "actorRef": "responsavel",
      "title": "Contatos da organização",
      "description": "O responsável vê e informa os canais de contato da empresa e consulta os contatos das pessoas da organização.",
      "entityRefs": [
        "Contato"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Canais de contato ligados à empresa e às pessoas da organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Todo o registro do canal de contato."
      }
    },
    {
      "grantId": "responsavelAcompanhaPessoas",
      "actorRef": "responsavel",
      "title": "Acompanhar e liberar acessos",
      "description": "O responsável vê as pessoas da organização, quais ainda não completaram o acesso e confere o cadastro antes de convidar a pessoa certa pelo convite da plataforma. O detalhe do consentimento de privacidade de cada pessoa não é exibido.",
      "entityRefs": [
        "PessoaOrganizacao"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as pessoas da organização."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Cadastro da pessoa e situação do acesso, sem o conteúdo do consentimento de privacidade.",
        "deniedFields": [
          "PessoaOrganizacao.details.person.privacyConsent"
        ]
      }
    },
    {
      "grantId": "pessoaCompletaMeuAcesso",
      "actorRef": "pessoaOrganizacao",
      "title": "Completar meu acesso",
      "description": "A pessoa vê o próprio cadastro ligado ao e-mail da conta e informa só o que falta: nome, país, telefone opcional e o consentimento de privacidade quando a lei exige.",
      "entityRefs": [
        "PessoaOrganizacao"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente o cadastro da própria pessoa, ligado ao login da sessão.",
        "anchorEntity": "PessoaOrganizacao"
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Todo o próprio cadastro, inclusive os dados faltantes e a situação do acesso."
      }
    },
    {
      "grantId": "pessoaMeusContatos",
      "actorRef": "pessoaOrganizacao",
      "title": "Meu telefone",
      "description": "A pessoa vê e informa o próprio telefone opcional ao completar o acesso.",
      "entityRefs": [
        "Contato"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente os canais de contato ligados pelo vínculo HasContact da plataforma ao cadastro da pessoa da sessão."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Todo o registro do próprio canal de contato."
      }
    },
    {
      "grantId": "pessoaVeEmpresa",
      "actorRef": "pessoaOrganizacao",
      "title": "Boas-vindas da empresa",
      "description": "A pessoa vê o nome da empresa da organização na tela de boas-vindas.",
      "entityRefs": [
        "Empresa"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "A empresa da organização."
      },
      "disclosure": {
        "mode": "summaryOnly",
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
