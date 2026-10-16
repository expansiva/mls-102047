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
tags: string[];
};
base: {
contacts: Record<string, unknown>[];
};
person?: {
privacyConsent?: Record<string, unknown>;
};
general?: Record<string, unknown>;
tarefas?: Record<string, unknown>;
};
}

type MdmPatch = Parameters<RequestContext['mdm']['entity']['update']>[0]['patch'];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

export async function updateMembroEquipe(input: UpdateMembroEquipeInput, ctx: RequestContext): Promise<UpdateMembroEquipeOutput> {
  const id = String(input.id ?? '');
  if (id === '') {
    throw new AppError('INVALID_INPUT', 'The member id is required.', 400);
  }
  const expectedVersion = Number(input.version);
  if (!Number.isInteger(expectedVersion)) {
    throw new AppError('INVALID_INPUT', 'The member version is required.', 400);
  }

  const identification = input.details?.identification;
  const name = identification?.name == null ? '' : String(identification.name).trim();
  const countryCode = identification?.countryCode == null ? '' : String(identification.countryCode).trim();
  if (name === '' || name.length > 200) {
    throw new AppError('INVALID_INPUT', 'The member name is required and has at most 200 characters.', 400);
  }
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new AppError('INVALID_INPUT', 'The country code must be two uppercase letters.', 400);
  }

  const current = await ctx.mdm.entity.get({ mdmId: id });
  if (current == null) {
    throw new AppError('NOT_FOUND', 'Team member not found.', 404);
  }
  if (Number(current.version) !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const patchFlat: Record<string, unknown> = { name, countryCode };
  const privacyConsent = input.details?.person?.privacyConsent;
  if (privacyConsent != null) {
    patchFlat.privacyConsent = privacyConsent;
  }

  const saved = await ctx.mdm.entity.update({
    mdmId: id,
    expectedVersion,
    patch: patchFlat as MdmPatch,
  });

  const d = saved.details as Record<string, unknown>;
  const tags = Array.isArray(d.tags) ? d.tags.map((t) => String(t)) : [];
  const contacts = Array.isArray(d.contacts) ? d.contacts.filter(isPlainObject) : [];

  const output: UpdateMembroEquipeOutput = {
    id: String(saved.mdmId),
    version: Number(saved.version),
    details: {
      identification: {
        subtype: d.subtype == null ? 'Person' : String(d.subtype),
        name: String(d.name ?? ''),
        status: String(d.status ?? ''),
        countryCode: String(d.countryCode ?? ''),
        tags,
      },
      base: { contacts },
    },
  };
  if (isPlainObject(d.privacyConsent)) {
    output.details.person = { privacyConsent: d.privacyConsent };
  }
  if (isPlainObject(d.general)) {
    output.details.general = d.general;
  }
  if (isPlainObject(d.tarefas)) {
    output.details.tarefas = d.tarefas;
  }
  return output;
}
