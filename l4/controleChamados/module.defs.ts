/// <mls fileReference="_102047_/l4/controleChamados/module.defs.ts" enhancement="_blank"/>

import type { Ns4ModuleArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosModule = {
  "schemaVersion": "2026-08-06-ns4-module-v4",
  "presentation": {
    "userLanguage": "pt-BR",
    "stepTitles": {
      "e1-clarification": "Defina os detalhes",
      "e1-compile": "Revise o resumo",
      "e2-journeys": "Veja as jornadas",
      "e3-access-matrix": "Confira os acessos",
      "e4-ontology": "Explore os conceitos",
      "e5-rules": "Valide as regras",
      "e6-behaviors": "Revise módulos e plugins",
      "e7-realization": "Acompanhe a construção",
      "e8-workspaces": "Organize os espaços",
      "e9-navigation-compiler": "Confira a navegação",
      "e10-validation": "Valide a solução"
    }
  },
  "module": {
    "moduleName": "controleChamados",
    "title": "Controle de Chamados",
    "purpose": "Permitir que o atendente registre, acompanhe, comente e encerre chamados com título, descrição e status.",
    "languages": [
      "pt-BR"
    ]
  },
  "designContext": {
    "initialPrompt": "criar um site chamado controleChamados , em portugues. cada chamado tem titulo, descricao e status (aberto ou fechado). o atendente registra o chamado, escreve comentarios no chamado, e depois fecha o chamado. um unico perfil de acesso: atendente.",
    "clarification": {
      "mainActors": "Atendente",
      "mainGoal": "Registrar, acompanhar e encerrar chamados com título, descrição, status e comentários.",
      "boundaries": "in: Cadastro de chamados com título, descrição e status (aberto ou fechado); in: Consulta de chamados; in: Registro de comentários no chamado; in: Fechamento do chamado pelo atendente; in: Único ator de negócio: atendente; out: Outros perfis ou atores de acesso além do atendente; out: Funcionalidades não relacionadas ao controle de chamados; out: Integrações com sistemas externos"
    }
  },
  "reviewPolicy": {
    "mode": "automatic"
  },
  "solutionStrategy": {
    "mode": "newSolution",
    "rationale": "A solicitação pede a criação de um site novo, sem sistema legado, preservação de banco existente ou migração de dados.",
    "databaseChangePolicy": "new"
  },
  "businessScope": {
    "mainGoal": "Registrar, acompanhar e encerrar chamados com título, descrição, status e comentários.",
    "actors": [
      {
        "actorId": "atendente",
        "title": "Atendente",
        "kind": "internal",
        "expectedOutcome": "Registrar chamados, escrever comentários e fechar chamados."
      }
    ],
    "expectedOutcomes": [
      {
        "outcomeId": "chamadoRegistrado",
        "title": "Chamado registrado",
        "description": "O atendente cria o chamado com título, descrição e status aberto."
      },
      {
        "outcomeId": "chamadoComentado",
        "title": "Comentários no chamado",
        "description": "O atendente registra comentários no chamado durante o atendimento."
      },
      {
        "outcomeId": "chamadoEncerrado",
        "title": "Chamado fechado",
        "description": "O atendente altera o status do chamado para fechado ao concluir o atendimento."
      }
    ],
    "inScope": [
      "Cadastro de chamados com título, descrição e status (aberto ou fechado)",
      "Consulta de chamados",
      "Registro de comentários no chamado",
      "Fechamento do chamado pelo atendente",
      "Único ator de negócio: atendente"
    ],
    "outOfScope": [
      "Outros perfis ou atores de acesso além do atendente",
      "Funcionalidades não relacionadas ao controle de chamados",
      "Integrações com sistemas externos"
    ]
  },
  "localization": {
    "productLanguages": [
      "pt-BR"
    ],
    "defaultLanguage": "pt-BR",
    "defaultLocale": "",
    "currency": "",
    "timeZone": "",
    "primaryMarket": ""
  },
  "declaredConstraints": {
    "mandatoryIntegrations": [],
    "regulatoryNotes": "",
    "criticalNotes": ""
  },
  "specStatus": {
    "flowId": "agentNewSolution",
    "flowVersion": "2026-08-14-ns4-flow-v40",
    "state": "complete",
    "artifactCompleteness": "full",
    "completedSteps": [
      {
        "stepId": "e1",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:51:41.474Z"
      },
      {
        "stepId": "e2-journeys",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:53:41.206Z"
      },
      {
        "stepId": "e3-access-matrix",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:54:03.994Z"
      },
      {
        "stepId": "e4-ontology",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:55:28.916Z"
      },
      {
        "stepId": "e5-rules",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:55:34.793Z"
      },
      {
        "stepId": "e6-behaviors",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:55:40.636Z"
      },
      {
        "stepId": "e7-realization",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:55:53.516Z"
      },
      {
        "stepId": "e8-workspaces",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:56:10.827Z"
      },
      {
        "stepId": "e9-navigation-compiler",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:56:11.111Z"
      },
      {
        "stepId": "e10-validation",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-02T12:56:11.376Z"
      }
    ],
    "nextStep": "complete",
    "updatedAt": "2026-09-02T12:56:11.376Z"
  }
} as const satisfies Ns4ModuleArtifact;

export type ControleChamadosModuleType = typeof controleChamadosModule;

export default controleChamadosModule;
