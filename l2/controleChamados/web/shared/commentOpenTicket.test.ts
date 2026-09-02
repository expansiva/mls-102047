/// <mls fileReference="_102047_/l2/controleChamados/web/shared/commentOpenTicket.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleChamadosCommentOpenTicketBase } from '/_102047_/l2/controleChamados/web/shared/commentOpenTicket.js';
import type { CmdRecordCommentInput, CmdRecordCommentOutput, QryLocateTicketOutput } from '/_102047_/l2/controleChamados/web/contracts/commentOpenTicket.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleChamadosCommentOpenTicketBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_uiScenary = Assert<Assignable<typeof page.uiScenary, "base" | "recordComment">>;
type _State_qryLocateTicketState = Assert<Assignable<typeof page.qryLocateTicketState, "idle" | "loading" | "success" | "error">>;
type _State_qryLocateTicketData = Assert<Assignable<typeof page.qryLocateTicketData, unknown[] | QryLocateTicketOutput>>;
type _State_cmdRecordCommentState = Assert<Assignable<typeof page.cmdRecordCommentState, "idle" | "loading" | "success" | "error">>;
type _State_cmdRecordCommentTicketId = Assert<Assignable<typeof page.cmdRecordCommentTicketId, string | CmdRecordCommentInput["ticketId"]>>;
type _State_cmdRecordCommentCommentText = Assert<Assignable<typeof page.cmdRecordCommentCommentText, string | CmdRecordCommentInput["commentText"]>>;
type _State_cmdRecordCommentOutput = Assert<Assignable<typeof page.cmdRecordCommentOutput, CmdRecordCommentOutput | null>>;
type _State_cmdRecordCommentError = Assert<Assignable<typeof page.cmdRecordCommentError, string>>;
type _Action_loadQryLocateTicket = Assert<Assignable<typeof page.loadQryLocateTicket, (...args: any[]) => unknown>>;
type _Handler_handleQryLocateTicketClick = Assert<Assignable<typeof page.handleQryLocateTicketClick, (...args: any[]) => unknown>>;
type _Action_cmdRecordComment = Assert<Assignable<typeof page.cmdRecordComment, (...args: any[]) => unknown>>;
type _Handler_handleCmdRecordCommentClick = Assert<Assignable<typeof page.handleCmdRecordCommentClick, (...args: any[]) => unknown>>;
type _Action_setCmdRecordCommentTicketId = Assert<Assignable<typeof page.setCmdRecordCommentTicketId, (...args: any[]) => unknown>>;
type _Handler_handleCmdRecordCommentTicketIdChange = Assert<Assignable<typeof page.handleCmdRecordCommentTicketIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdRecordCommentCommentText = Assert<Assignable<typeof page.setCmdRecordCommentCommentText, (...args: any[]) => unknown>>;
type _Handler_handleCmdRecordCommentCommentTextChange = Assert<Assignable<typeof page.handleCmdRecordCommentCommentTextChange, (...args: any[]) => unknown>>;

export {};