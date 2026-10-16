/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/updateMembroEquipe.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface UpdateMembroEquipeInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
      countryCode: string;
    };
    base: Record<string, unknown>;
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
  id: string;
  version: number;
}

export interface UpdateMembroEquipeOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      countryCode: string;
      tags: string;
    };
    base: {
      contacts: Record<string, unknown>;
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
}

type MdmPatch = Parameters<RequestContext['mdm']['entity']['update']>[0]['patch'];

const ROLE_TAG = 'tarefas.MembroEquipe';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function updateMembroEquipe(input: UpdateMembroEquipeInput, ctx: RequestContext): Promise<UpdateMembroEquipeOutput> {
  const id = input.id == null ? '' : String(input.id).trim();
  if (id === '') {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const expectedVersion = Number(input.version);
  if (!Number.isInteger(expectedVersion)) {
    throw new AppError('INVALID_INPUT', 'version is required and must be an integer.', 400);
  }

  const identification = input.details?.identification;
  const name = identification?.name == null ? '' : String(identification.name).trim();
  if (name === '') {
    throw new AppError('INVALID_INPUT', 'details.identification.name is required.', 400);
  }
  if (name.length > 200) {
    throw new AppError('INVALID_INPUT', 'details.identification.name must have at most 200 characters.', 400);
  }
  const countryCode = identification?.countryCode == null ? '' : String(identification.countryCode).trim();
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new AppError('INVALID_INPUT', 'details.identification.countryCode must be two uppercase letters.', 400);
  }

  const current = await ctx.mdm.entity.get({ mdmId: id });
  if (current == null) {
    throw new AppError('NOT_FOUND', 'MembroEquipe not found.', 404);
  }
  const currentDetails = current.details as Record<string, unknown>;
  const currentTags = Array.isArray(currentDetails.tags) ? currentDetails.tags.map((tag) => String(tag)) : [];
  if (!currentTags.includes(ROLE_TAG)) {
    throw new AppError('NOT_FOUND', 'MembroEquipe not found.', 404);
  }
  if (current.version !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const patchData: Record<string, unknown> = { name, countryCode };
  const privacyConsent = input.details?.person?.privacyConsent;
  if (privacyConsent != null) {
    patchData.privacyConsent = privacyConsent;
  }

  const updated = await ctx.mdm.entity.update({
    mdmId: id,
    expectedVersion: current.version,
    patch: patchData as MdmPatch,
  });

  const d = updated.details as Record<string, unknown>;
  const tags = Array.isArray(d.tags) ? d.tags.map((tag) => String(tag)) : [];
  const contactsList = Array.isArray(d.contacts) ? d.contacts : [];
  const contacts: Record<string, unknown> = Object.fromEntries(
    contactsList.map((contact, index): [string, unknown] => [String(index), contact]),
  );

  const output: UpdateMembroEquipeOutput = {
    id: updated.mdmId,
    version: updated.version,
    details: {
      identification: {
        subtype: d.subtype == null ? 'Person' : String(d.subtype),
        name: d.name == null ? name : String(d.name),
        status: d.status == null ? '' : String(d.status),
        countryCode: d.countryCode == null ? countryCode : String(d.countryCode),
        tags: tags.join(','),
      },
      base: { contacts },
    },
  };
  if (isRecord(d.privacyConsent)) {
    output.details.person = { privacyConsent: d.privacyConsent };
  }
  if (isRecord(d.general)) {
    output.details.general = d.general;
  }
  if (isRecord(d.tarefas)) {
    output.details.tarefas = d.tarefas;
  }
  return output;
}
