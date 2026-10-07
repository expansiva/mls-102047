/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/getProfissional.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetProfissionalInput extends Record<string, unknown> {
  id: string;
}

export interface GetProfissionalOutput extends Record<string, unknown> {
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

export async function getProfissional(input: GetProfissionalInput, ctx: RequestContext): Promise<GetProfissionalOutput> {
  const result = await ctx.mdm.entity.get({ mdmId: String(input.id) });

  if (result == null) {
    throw new AppError('NOT_FOUND', 'Profissional was not found.', 404);
  }

  const flatDetails = result.details as Record<string, unknown>;
  const agendaDetails = flatDetails.agendaClinica;
  const agenda = agendaDetails !== null && typeof agendaDetails === 'object' && !Array.isArray(agendaDetails)
    ? agendaDetails as Record<string, unknown>
    : null;

  const subtype = flatDetails.subtype;
  const name = flatDetails.name;
  const status = flatDetails.status;
  const countryCode = flatDetails.countryCode;
  const professionalType = agenda?.professionalType;

  if (
    typeof subtype !== 'string' ||
    typeof name !== 'string' ||
    typeof status !== 'string' ||
    typeof countryCode !== 'string' ||
    typeof professionalType !== 'string'
  ) {
    throw new AppError('INVALID_RECORD', 'Profissional has an invalid stored document.', 400);
  }

  const identification: GetProfissionalOutput['details']['identification'] = {
    subtype,
    name,
    status,
    countryCode,
  };

  if (flatDetails.docType != null) {
    if (typeof flatDetails.docType !== 'string') {
      throw new AppError('INVALID_RECORD', 'Profissional has an invalid document type.', 400);
    }
    identification.docType = flatDetails.docType;
  }

  if (flatDetails.docId != null) {
    if (typeof flatDetails.docId !== 'string') {
      throw new AppError('INVALID_RECORD', 'Profissional has an invalid document identifier.', 400);
    }
    identification.docId = flatDetails.docId;
  }

  const outputDetails: GetProfissionalOutput['details'] = {
    identification,
    agendaClinica: { professionalType },
  };

  if (flatDetails.base !== null && typeof flatDetails.base === 'object' && !Array.isArray(flatDetails.base)) {
    outputDetails.base = flatDetails.base as Record<string, unknown>;
  }

  if (flatDetails.privacyConsent !== null && typeof flatDetails.privacyConsent === 'object' && !Array.isArray(flatDetails.privacyConsent)) {
    outputDetails.person = { privacyConsent: flatDetails.privacyConsent as Record<string, unknown> };
  }

  if (flatDetails.general !== null && typeof flatDetails.general === 'object' && !Array.isArray(flatDetails.general)) {
    outputDetails.general = flatDetails.general as Record<string, unknown>;
  }

  return {
    id: String(result.mdmId),
    version: Number(result.version),
    details: outputDetails,
  };
}
