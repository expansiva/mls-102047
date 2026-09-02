/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleChamadosTicketCommentCatalogueBase } from '/_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.js';
import type { CmdCreateTicketCommentInput, CmdCreateTicketCommentOutput, CmdDeleteTicketCommentInput, CmdDeleteTicketCommentOutput, CmdUpdateTicketCommentInput, CmdUpdateTicketCommentOutput, QryGetTicketCommentInput, QryGetTicketCommentOutput, QryListTicketCommentOutput, QryTicketPickerInput, QryTicketPickerOutput } from '/_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleChamadosTicketCommentCatalogueBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_uiScenary = Assert<Assignable<typeof page.uiScenary, "base" | "detail" | "createTicketComment" | "updateTicketComment">>;
type _State_qryListTicketCommentState = Assert<Assignable<typeof page.qryListTicketCommentState, "idle" | "loading" | "success" | "error">>;
type _State_qryListTicketCommentData = Assert<Assignable<typeof page.qryListTicketCommentData, unknown[] | QryListTicketCommentOutput>>;
type _State_cmdCreateTicketCommentState = Assert<Assignable<typeof page.cmdCreateTicketCommentState, "idle" | "loading" | "success" | "error">>;
type _State_cmdCreateTicketCommentTicketId = Assert<Assignable<typeof page.cmdCreateTicketCommentTicketId, string | CmdCreateTicketCommentInput["ticketId"]>>;
type _State_cmdCreateTicketCommentCommentText = Assert<Assignable<typeof page.cmdCreateTicketCommentCommentText, string | CmdCreateTicketCommentInput["commentText"]>>;
type _State_cmdCreateTicketCommentOutput = Assert<Assignable<typeof page.cmdCreateTicketCommentOutput, CmdCreateTicketCommentOutput | null>>;
type _State_cmdCreateTicketCommentError = Assert<Assignable<typeof page.cmdCreateTicketCommentError, string>>;
type _State_cmdUpdateTicketCommentState = Assert<Assignable<typeof page.cmdUpdateTicketCommentState, "idle" | "loading" | "success" | "error">>;
type _State_cmdUpdateTicketCommentTicketCommentId = Assert<Assignable<typeof page.cmdUpdateTicketCommentTicketCommentId, string | CmdUpdateTicketCommentInput["ticketCommentId"]>>;
type _State_cmdUpdateTicketCommentTicketId = Assert<Assignable<typeof page.cmdUpdateTicketCommentTicketId, string | CmdUpdateTicketCommentInput["ticketId"]>>;
type _State_cmdUpdateTicketCommentCommentText = Assert<Assignable<typeof page.cmdUpdateTicketCommentCommentText, string | CmdUpdateTicketCommentInput["commentText"]>>;
type _State_cmdUpdateTicketCommentOutput = Assert<Assignable<typeof page.cmdUpdateTicketCommentOutput, CmdUpdateTicketCommentOutput | null>>;
type _State_cmdUpdateTicketCommentError = Assert<Assignable<typeof page.cmdUpdateTicketCommentError, string>>;
type _State_cmdDeleteTicketCommentState = Assert<Assignable<typeof page.cmdDeleteTicketCommentState, "idle" | "loading" | "success" | "error">>;
type _State_cmdDeleteTicketCommentTicketCommentId = Assert<Assignable<typeof page.cmdDeleteTicketCommentTicketCommentId, string | CmdDeleteTicketCommentInput["ticketCommentId"]>>;
type _State_cmdDeleteTicketCommentOutput = Assert<Assignable<typeof page.cmdDeleteTicketCommentOutput, CmdDeleteTicketCommentOutput | null>>;
type _State_cmdDeleteTicketCommentError = Assert<Assignable<typeof page.cmdDeleteTicketCommentError, string>>;
type _State_qryGetTicketCommentState = Assert<Assignable<typeof page.qryGetTicketCommentState, "idle" | "loading" | "success" | "error">>;
type _State_qryGetTicketCommentTicketCommentId = Assert<Assignable<typeof page.qryGetTicketCommentTicketCommentId, string | QryGetTicketCommentInput["ticketCommentId"]>>;
type _State_qryGetTicketCommentData = Assert<Assignable<typeof page.qryGetTicketCommentData, QryGetTicketCommentOutput | null>>;
type _State_qryTicketPickerState = Assert<Assignable<typeof page.qryTicketPickerState, "idle" | "loading" | "success" | "error">>;
type _State_qryTicketPickerSearch = Assert<Assignable<typeof page.qryTicketPickerSearch, string | QryTicketPickerInput["search"]>>;
type _State_qryTicketPickerSortBy = Assert<Assignable<typeof page.qryTicketPickerSortBy, "open" | "closed" | QryTicketPickerInput["sortBy"] | ''>>;
type _State_qryTicketPickerSortOrder = Assert<Assignable<typeof page.qryTicketPickerSortOrder, "asc" | "desc" | QryTicketPickerInput["sortOrder"] | ''>>;
type _State_qryTicketPickerData = Assert<Assignable<typeof page.qryTicketPickerData, unknown[] | QryTicketPickerOutput>>;
type _Action_loadQryListTicketComment = Assert<Assignable<typeof page.loadQryListTicketComment, (...args: any[]) => unknown>>;
type _Handler_handleQryListTicketCommentClick = Assert<Assignable<typeof page.handleQryListTicketCommentClick, (...args: any[]) => unknown>>;
type _Action_cmdCreateTicketComment = Assert<Assignable<typeof page.cmdCreateTicketComment, (...args: any[]) => unknown>>;
type _Handler_handleCmdCreateTicketCommentClick = Assert<Assignable<typeof page.handleCmdCreateTicketCommentClick, (...args: any[]) => unknown>>;
type _Action_cmdUpdateTicketComment = Assert<Assignable<typeof page.cmdUpdateTicketComment, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateTicketCommentClick = Assert<Assignable<typeof page.handleCmdUpdateTicketCommentClick, (...args: any[]) => unknown>>;
type _Action_cmdDeleteTicketComment = Assert<Assignable<typeof page.cmdDeleteTicketComment, (...args: any[]) => unknown>>;
type _Handler_handleCmdDeleteTicketCommentClick = Assert<Assignable<typeof page.handleCmdDeleteTicketCommentClick, (...args: any[]) => unknown>>;
type _Action_loadQryGetTicketComment = Assert<Assignable<typeof page.loadQryGetTicketComment, (...args: any[]) => unknown>>;
type _Handler_handleQryGetTicketCommentClick = Assert<Assignable<typeof page.handleQryGetTicketCommentClick, (...args: any[]) => unknown>>;
type _Action_loadQryTicketPicker = Assert<Assignable<typeof page.loadQryTicketPicker, (...args: any[]) => unknown>>;
type _Handler_handleQryTicketPickerClick = Assert<Assignable<typeof page.handleQryTicketPickerClick, (...args: any[]) => unknown>>;
type _Action_setCmdCreateTicketCommentTicketId = Assert<Assignable<typeof page.setCmdCreateTicketCommentTicketId, (...args: any[]) => unknown>>;
type _Handler_handleCmdCreateTicketCommentTicketIdChange = Assert<Assignable<typeof page.handleCmdCreateTicketCommentTicketIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdCreateTicketCommentCommentText = Assert<Assignable<typeof page.setCmdCreateTicketCommentCommentText, (...args: any[]) => unknown>>;
type _Handler_handleCmdCreateTicketCommentCommentTextChange = Assert<Assignable<typeof page.handleCmdCreateTicketCommentCommentTextChange, (...args: any[]) => unknown>>;
type _Action_setCmdUpdateTicketCommentTicketCommentId = Assert<Assignable<typeof page.setCmdUpdateTicketCommentTicketCommentId, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateTicketCommentTicketCommentIdChange = Assert<Assignable<typeof page.handleCmdUpdateTicketCommentTicketCommentIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdUpdateTicketCommentTicketId = Assert<Assignable<typeof page.setCmdUpdateTicketCommentTicketId, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateTicketCommentTicketIdChange = Assert<Assignable<typeof page.handleCmdUpdateTicketCommentTicketIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdUpdateTicketCommentCommentText = Assert<Assignable<typeof page.setCmdUpdateTicketCommentCommentText, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateTicketCommentCommentTextChange = Assert<Assignable<typeof page.handleCmdUpdateTicketCommentCommentTextChange, (...args: any[]) => unknown>>;
type _Action_setCmdDeleteTicketCommentTicketCommentId = Assert<Assignable<typeof page.setCmdDeleteTicketCommentTicketCommentId, (...args: any[]) => unknown>>;
type _Handler_handleCmdDeleteTicketCommentTicketCommentIdChange = Assert<Assignable<typeof page.handleCmdDeleteTicketCommentTicketCommentIdChange, (...args: any[]) => unknown>>;
type _Action_setQryGetTicketCommentTicketCommentId = Assert<Assignable<typeof page.setQryGetTicketCommentTicketCommentId, (...args: any[]) => unknown>>;
type _Handler_handleQryGetTicketCommentTicketCommentIdChange = Assert<Assignable<typeof page.handleQryGetTicketCommentTicketCommentIdChange, (...args: any[]) => unknown>>;
type _Action_setQryTicketPickerSearch = Assert<Assignable<typeof page.setQryTicketPickerSearch, (...args: any[]) => unknown>>;
type _Handler_handleQryTicketPickerSearchChange = Assert<Assignable<typeof page.handleQryTicketPickerSearchChange, (...args: any[]) => unknown>>;
type _Action_setQryTicketPickerSortBy = Assert<Assignable<typeof page.setQryTicketPickerSortBy, (...args: any[]) => unknown>>;
type _Handler_handleQryTicketPickerSortByChange = Assert<Assignable<typeof page.handleQryTicketPickerSortByChange, (...args: any[]) => unknown>>;
type _Action_setQryTicketPickerSortOrder = Assert<Assignable<typeof page.setQryTicketPickerSortOrder, (...args: any[]) => unknown>>;
type _Handler_handleQryTicketPickerSortOrderChange = Assert<Assignable<typeof page.handleQryTicketPickerSortOrderChange, (...args: any[]) => unknown>>;

export {};