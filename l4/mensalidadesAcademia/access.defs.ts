/// <mls fileReference="_102047_/l4/mensalidadesAcademia/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaAccess = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "mensalidadesAcademia",
  "actors": [
    {
      "actorId": "recepcao",
      "kind": "internal",
      "origin": "named",
      "title": "Recepção",
      "description": "Matricula alunos em planos a partir de uma data e registra os pagamentos das mensalidades (data, valor e forma).",
      "personEntity": ""
    },
    {
      "actorId": "gerencia",
      "kind": "internal",
      "origin": "named",
      "title": "Gerência",
      "description": "Gera todo mês as mensalidades dos alunos ativos e acompanha o painel de valores a receber, valores recebidos, alunos ativos, bloqueados e inadimplentes.",
      "personEntity": ""
    }
  ],
  "grants": [
    {
      "grantId": "recepcaoAlunos",
      "actorRef": "recepcao",
      "title": "Cadastro e consulta de alunos",
      "description": "A recepção localiza o aluno por nome ou documento, cadastra o aluno quando ele não existe e verifica se ele está bloqueado na chegada à academia.",
      "entityRefs": [
        "Aluno"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os alunos da academia."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A recepção vê o cadastro completo do aluno, incluindo a situação de bloqueio e inadimplência calculada pelo módulo."
      }
    },
    {
      "grantId": "recepcaoPlanosConsulta",
      "actorRef": "recepcao",
      "title": "Consulta de planos para matrícula",
      "description": "A recepção escolhe o plano da matrícula vendo nome, periodicidade, valor e dia de vencimento.",
      "entityRefs": [
        "Plano"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os planos da academia."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "A recepção vê os dados do plano necessários para a matrícula, sem as observações internas.",
        "allowedFields": [
          "Plano.id",
          "Plano.nome",
          "Plano.periodicidade",
          "Plano.ativo",
          "Plano.details.valor",
          "Plano.details.diaVencimento"
        ]
      }
    },
    {
      "grantId": "recepcaoMatriculas",
      "actorRef": "recepcao",
      "title": "Matrículas dos alunos",
      "description": "A recepção matricula alunos em planos a partir de uma data, registra cancelamentos e consulta se a matrícula está liberada para entrada.",
      "entityRefs": [
        "Matricula"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as matrículas da academia."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A recepção vê a matrícula completa, inclusive bloqueio e mensalidades vencidas."
      }
    },
    {
      "grantId": "recepcaoMensalidadesPagamentos",
      "actorRef": "recepcao",
      "title": "Mensalidades e pagamentos",
      "description": "A recepção localiza as mensalidades em aberto ou vencidas do aluno e registra os pagamentos com data, valor e forma.",
      "entityRefs": [
        "Mensalidade",
        "Pagamento"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as mensalidades e pagamentos da academia."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A recepção vê a mensalidade e o pagamento completos, incluindo saldo devedor e situação."
      }
    },
    {
      "grantId": "gerenciaPlanos",
      "actorRef": "gerencia",
      "title": "Gestão de planos",
      "description": "A gerência cadastra e mantém os planos mensal, trimestral e anual, com valor e dia de vencimento.",
      "entityRefs": [
        "Plano"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os planos da academia."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A gerência vê e mantém todos os dados do plano."
      }
    },
    {
      "grantId": "gerenciaMatriculasMensalidades",
      "actorRef": "gerencia",
      "title": "Geração e acompanhamento de mensalidades",
      "description": "A gerência confere as matrículas ativas, gera as mensalidades do mês e acompanha pagamentos, vencidas e inadimplentes.",
      "entityRefs": [
        "Matricula",
        "Mensalidade",
        "Pagamento"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as matrículas, mensalidades e pagamentos da academia."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "A gerência vê os registros completos para gerar e conferir as cobranças."
      }
    },
    {
      "grantId": "gerenciaAlunosConsulta",
      "actorRef": "gerencia",
      "title": "Consulta de alunos",
      "description": "A gerência identifica os alunos das mensalidades e os inadimplentes e bloqueados.",
      "entityRefs": [
        "Aluno"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os alunos da academia."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "A gerência vê nome, documento, situação do cadastro e a situação de bloqueio e inadimplência; endereços, contatos e dados pessoais ficam com a recepção.",
        "allowedFields": [
          "Aluno.id",
          "Aluno.details.identification.name",
          "Aluno.details.identification.status",
          "Aluno.details.identification.docType",
          "Aluno.details.identification.docId",
          "Aluno.details.mensalidadesAcademia"
        ]
      }
    },
    {
      "grantId": "gerenciaPainel",
      "actorRef": "gerencia",
      "title": "Painel de mensalidades",
      "description": "A gerência acompanha o total a receber no mês, o total recebido e as quantidades de alunos ativos, bloqueados e inadimplentes.",
      "entityRefs": [
        "PainelMensalidades"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Indicadores de toda a academia."
      },
      "disclosure": {
        "mode": "aggregateOnly",
        "description": "Somente totais e contagens calculados por mês de referência."
      }
    }
  ]
} as const satisfies Ns5Readonly<Ns5AccessArtifact>;

export type MensalidadesAcademiaAccessType = typeof mensalidadesAcademiaAccess;

export default mensalidadesAcademiaAccess;
