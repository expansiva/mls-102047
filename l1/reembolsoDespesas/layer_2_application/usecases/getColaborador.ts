/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getColaborador.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetColaboradorInput extends Record<string, unknown> {
  id: string;
}

export interface GetColaboradorOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      docType?: string;
      docId?: string;
      countryCode: string;
      tags: string[];
    };
    base: {
      relationshipRefs: Record<string, unknown>;
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    reembolsoDespesas?: Record<string, unknown>;
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

export async function getColaborador(input: GetColaboradorInput, ctx: RequestContext): Promise<GetColaboradorOutput> {
  const id = input.id == null ? '' : String(input.id);
  if (id === '') {
    throw new AppError('VALIDATION_ERROR', 'The id of the colaborador is required.', 400);
  }

  const found = await ctx.mdm.entity.get({ mdmId: id });
  if (!found || found.mdmId == null || String(found.mdmId) === '') {
    throw new AppError('NOT_FOUND', 'Colaborador was not found.', 404);
  }

  const flat: Record<string, unknown> = isObject(found.details) ? (found.details as Record<string, unknown>) : {};

  const identification: GetColaboradorOutput['details']['identification'] = {
    subtype: flat.subtype == null ? 'Person' : String(flat.subtype),
    name: flat.name == null ? '' : String(flat.name),
    status: flat.status == null ? '' : String(flat.status),
    countryCode: flat.countryCode == null ? '' : String(flat.countryCode),
    tags: Array.isArray(flat.tags) ? flat.tags.map((tag) => String(tag)) : [],
  };
  if (flat.docType != null) identification.docType = String(flat.docType);
  if (flat.docId != null) identification.docId = String(flat.docId);

  const details: GetColaboradorOutput['details'] = {
    identification,
    base: {
      relationshipRefs: isObject(flat.relationshipRefs) ? flat.relationshipRefs : {},
    },
  };

  if (isObject(flat.privacyConsent)) {
    details.person = { privacyConsent: flat.privacyConsent };
  }
  if (isObject(flat.general)) {
    details.general = flat.general;
  }
  if (isObject(flat.reembolsoDespesas)) {
    details.reembolsoDespesas = flat.reembolsoDespesas;
  }

  return {
    id: String(found.mdmId),
    version: Number(found.version),
    details,
  };
}
