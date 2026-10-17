/// <mls fileReference="_102047_/l4/inicio/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "inicio",
  "processes": [
    {
      "processId": "liberacaoAcessoPessoa",
      "title": "Liberação do acesso da pessoa",
      "description": "Quando a plataforma não consegue ligar o e-mail da conta autenticada porque já existe outro cadastro com o mesmo e-mail de contato, a pessoa da organização é avisada, o responsável libera o acesso dela pela liberação da plataforma e a pessoa volta para completar o próprio acesso.",
      "trigger": {
        "kind": "manual",
        "actorRef": "pessoaOrganizacao"
      },
      "tasks": [
        {
          "taskId": "pessoaVeAvisoLiberacao",
          "kind": "human",
          "actorRef": "pessoaOrganizacao",
          "journeyRef": "aguardarLiberacaoAcesso",
          "next": [
            "responsavelLiberaAcesso"
          ],
          "description": "A pessoa vê que já existe outro cadastro com o mesmo e-mail de contato e encaminha ao responsável o pedido de liberação do seu acesso."
        },
        {
          "taskId": "responsavelLiberaAcesso",
          "kind": "human",
          "actorRef": "responsavel",
          "journeyRef": "acompanharAcessoPessoas",
          "next": [
            "aguardarLigacaoPlataforma"
          ],
          "description": "O responsável identifica a pessoa que aguarda liberação e libera o acesso dela pela liberação da plataforma, que decide a qual cadastro o login fica ligado."
        },
        {
          "taskId": "aguardarLigacaoPlataforma",
          "kind": "wait",
          "next": [
            "pessoaCompletaAcesso"
          ],
          "description": "Aguarda a plataforma concluir a ligação do login ao cadastro escolhido na liberação."
        },
        {
          "taskId": "pessoaCompletaAcesso",
          "kind": "human",
          "actorRef": "pessoaOrganizacao",
          "journeyRef": "completarMeuAcesso",
          "next": [],
          "description": "Com o login ligado, a pessoa informa só os dados mínimos que ainda faltam e segue para os módulos que o responsável liberou."
        }
      ],
      "functions": [
        {
          "functionId": "abrirPedidoLiberacaoAcesso",
          "description": "Chamada pela tela (BFF) ou pelo cm quando a pessoa autenticada recebe o aviso de que o e-mail não pôde ser ligado; valida que a pessoa é da organização e que a plataforma indicou conflito de e-mail de contato, pede ao cm a mensagem de origem e a Task que referencia a pessoa, passa a vez ao responsável e pede ao cm que o notifique; retorna a ocorrência aberta; repetida, devolve a mesma ocorrência aberta sem criar outra pessoa, outro vínculo nem outra Task."
        },
        {
          "functionId": "resolverResponsavelLiberacao",
          "description": "Chamada pelas funções do processo para decidir quem é a pessoa da etapa de liberação; consulta na plataforma quem é reconhecido como responsável pela empresa (ser o primeiro a entrar não conta) e retorna esse responsável; é somente leitura e repetir dá o mesmo resultado."
        },
        {
          "functionId": "registrarLiberacaoConcluida",
          "description": "Chamada pelo cm ou pelo relógio do módulo quando a liberação da plataforma termina; valida que a ocorrência está aguardando e que o login da pessoa agora está ligado a um cadastro, registra o avanço, passa a vez à pessoa da organização e pede ao cm que a notifique para completar o acesso; retorna a etapa atual; repetida após o avanço, não faz nada e devolve o mesmo estado."
        },
        {
          "functionId": "concluirLiberacaoAcesso",
          "description": "Chamada pela tela (BFF) ou pelo cm quando a pessoa termina de completar os dados mínimos; valida que os dados mínimos estão completos, encerra a ocorrência e a Task no cm; retorna a ocorrência encerrada; repetida, devolve a ocorrência já encerrada sem alterar nada."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "prepararEmpresa",
      "inProcess": false
    },
    {
      "journeyId": "acompanharAcessoPessoas",
      "inProcess": true,
      "processId": "liberacaoAcessoPessoa"
    },
    {
      "journeyId": "completarMeuAcesso",
      "inProcess": true,
      "processId": "liberacaoAcessoPessoa"
    },
    {
      "journeyId": "aguardarLiberacaoAcesso",
      "inProcess": true,
      "processId": "liberacaoAcessoPessoa"
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type InicioWorkflowsType = typeof inicioWorkflows;

export default inicioWorkflows;
