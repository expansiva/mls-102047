/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCommentCatalogue--qryTicketPicker.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryTicketPicker (query); Output kind=list; route controleChamados.ticketCommentCatalogue.qryTicketPicker.

export interface QryTicketPickerInput {
  search?: string;
  sortBy?: 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface QryTicketPickerOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const qryTicketPickerRoute = 'controleChamados.ticketCommentCatalogue.qryTicketPicker' as const;
