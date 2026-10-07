/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createProfissional.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface CreateProfissionalInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
      docType?: string;
      docId?: string;
      countryCode: string;
    };
    base?: Record<string, unknown>;
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    agendaClinica: {
      professionalType: string;
    };
  };
}

export interface CreateProfissionalOutput extends Record<string, unknown> {
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
    };
    base?: Record<string, unknown>;
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    agendaClinica: {
      professionalType: string;
    };
  };
}

export async function createProfissional(input: CreateProfissionalInput, ctx: RequestContext): Promise<CreateProfissionalOutput> {
  void AppError;

  const identification = input.details.identification;
  const name = String(identification.name);
  const countryCode = String(identification.countryCode);
  const docType = identification.docType == null ? undefined : String(identification.docType);
  const docId = identification.docId == null ? undefined : String(identification.docId);

  let existing = null;
  if (docType !== undefined && docId !== undefined) {
    existing = await ctx.mdm.entity.findByDocument(docType, docId);
  }

  let record;
  if (existing === null) {
    const details: Record<string, unknown> = {
      subtype: 'Person',
      name,
      countryCode,
    };
    if (docType !== undefined) details.docType = docType;
    if (docId !== undefined) details.docId = docId;

    const privacyConsent = input.details.person?.privacyConsent;
    if (privacyConsent !== undefined) details.privacyConsent = privacyConsent;

    record = await ctx.mdm.entity.create({ details });
  } else {
    record = existing;
  }

  const attached = await ctx.mdm.entity.attachRole(
    String(record.mdmId),
    'agendaClinica.Profissional',
    { professionalType: String(input.details.agendaClinica.professionalType) },
  );

  const flat = attached.details as Record<string, unknown>;
  const person: { privacyConsent?: Record<string, unknown> } = {};
  if (flat.privacyConsent != null && typeof flat.privacyConsent === 'object' && !Array.isArray(flat.privacyConsent)) {
    person.privacyConsent = flat.privacyConsent as Record<string, unknown>;
  }

  const details: CreateProfissionalOutput['details'] = {
    identification: {
      subtype: String(flat.subtype),
      name: String(flat.name),
      status: String(flat.status),
      countryCode: String(flat.countryCode),
    },
    person,
    agendaClinica: {
      professionalType: String(input.details.agendaClinica.professionalType),
    },
  };

  if (flat.docType != null) details.identification.docType = String(flat.docType);
  if (flat.docId != null) details.identification.docId = String(flat.docId);
  if (flat.general != null && typeof flat.general === 'object' && !Array.isArray(flat.general)) {
    details.general = flat.general as Record<string, unknown>;
  }
  if (flat.base != null && typeof flat.base === 'object' && !Array.isArray(flat.base)) {
    details.base = flat.base as Record<string, unknown>;
  }

  return {
    id: String(attached.mdmId),
    version: Number(attached.version),
    details,
  };
}
