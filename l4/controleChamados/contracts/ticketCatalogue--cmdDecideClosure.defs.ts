/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCatalogue--cmdDecideClosure.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdDecideClosure (command); Output kind=object; route controleChamados.ticketCatalogue.cmdDecideClosure.

export interface CmdDecideClosureInput {
  ticketId: string;
  status: 'closed';
}

export interface CmdDecideClosureOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const cmdDecideClosureRoute = 'controleChamados.ticketCatalogue.cmdDecideClosure' as const;
