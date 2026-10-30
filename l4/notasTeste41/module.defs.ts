/// <mls fileReference="_102047_/l4/notasTeste41/module.defs.ts" enhancement="_blank"/>

import type { Ns5ModuleArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41Module = {
  "schemaVersion": "2026-09-10-ns5-module-v2",
  "moduleName": "notasTeste41",
  "title": "Notas de teste (temporário)",
  "userLanguage": "pt-BR",
  "productLanguages": [
    "pt-BR"
  ],
  "defaultLanguage": "pt-BR",
  "sourcePrompt": "Crie o modulo temporario notasTeste41 para prova do New Release. Um unico papel interno Operador registra uma nota curta com titulo obrigatorio e texto opcional, lista as notas e abre uma nota para leitura. Cada nota tem identificador e data de criacao. A jornada inclui criar a nota e confirmar que ela aparece na lista. Sem aprovacao, sem estados de negocio, sem integracoes externas, sem dados ou papeis da plataforma. Gere o menor conjunto de telas e artefatos que atenda isso. Idioma pt-BR."
} as const satisfies Ns5Readonly<Ns5ModuleArtifact>;

export type NotasTeste41ModuleType = typeof notasTeste41Module;

export default notasTeste41Module;
