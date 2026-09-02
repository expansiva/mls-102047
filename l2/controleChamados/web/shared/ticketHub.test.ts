/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketHub.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleChamadosTicketHubBase } from '/_102047_/l2/controleChamados/web/shared/ticketHub.js';
import type { QryListTicketCommentOutput, QryListTicketInput, QryListTicketOutput } from '/_102047_/l2/controleChamados/web/contracts/ticketHub.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleChamadosTicketHubBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_uiScenary = Assert<Assignable<typeof page.uiScenary, "base">>;
type _State_qryListTicketState = Assert<Assignable<typeof page.qryListTicketState, "idle" | "loading" | "success" | "error">>;
type _State_qryListTicketSearch = Assert<Assignable<typeof page.qryListTicketSearch, string | QryListTicketInput["search"]>>;
type _State_qryListTicketSortBy = Assert<Assignable<typeof page.qryListTicketSortBy, "open" | "closed" | QryListTicketInput["sortBy"] | ''>>;
type _State_qryListTicketSortOrder = Assert<Assignable<typeof page.qryListTicketSortOrder, "asc" | "desc" | QryListTicketInput["sortOrder"] | ''>>;
type _State_qryListTicketData = Assert<Assignable<typeof page.qryListTicketData, unknown[] | QryListTicketOutput>>;
type _State_qryListTicketCommentState = Assert<Assignable<typeof page.qryListTicketCommentState, "idle" | "loading" | "success" | "error">>;
type _State_qryListTicketCommentData = Assert<Assignable<typeof page.qryListTicketCommentData, unknown[] | QryListTicketCommentOutput>>;
type _Action_loadQryListTicket = Assert<Assignable<typeof page.loadQryListTicket, (...args: any[]) => unknown>>;
type _Handler_handleQryListTicketClick = Assert<Assignable<typeof page.handleQryListTicketClick, (...args: any[]) => unknown>>;
type _Action_loadQryListTicketComment = Assert<Assignable<typeof page.loadQryListTicketComment, (...args: any[]) => unknown>>;
type _Handler_handleQryListTicketCommentClick = Assert<Assignable<typeof page.handleQryListTicketCommentClick, (...args: any[]) => unknown>>;
type _Action_setQryListTicketSearch = Assert<Assignable<typeof page.setQryListTicketSearch, (...args: any[]) => unknown>>;
type _Handler_handleQryListTicketSearchChange = Assert<Assignable<typeof page.handleQryListTicketSearchChange, (...args: any[]) => unknown>>;
type _Action_setQryListTicketSortBy = Assert<Assignable<typeof page.setQryListTicketSortBy, (...args: any[]) => unknown>>;
type _Handler_handleQryListTicketSortByChange = Assert<Assignable<typeof page.handleQryListTicketSortByChange, (...args: any[]) => unknown>>;
type _Action_setQryListTicketSortOrder = Assert<Assignable<typeof page.setQryListTicketSortOrder, (...args: any[]) => unknown>>;
type _Handler_handleQryListTicketSortOrderChange = Assert<Assignable<typeof page.handleQryListTicketSortOrderChange, (...args: any[]) => unknown>>;

export {};