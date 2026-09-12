/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Venue.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityVenue = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "inscricaoEvento",
  "entityId": "Venue",
  "title": "Local do evento",
  "description": "Local cadastrado na organização onde um evento ocorre.",
  "kind": "mdm",
  "party": "none",
  "mdmSubtype": "Location",
  "displayField": "name",
  "fields": [],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "inscricaoEvento.Venue"
  },
  "maintenance": "crud"
} as const satisfies Ns5OntologyEntityArtifact;

export type InscricaoEventoEntityVenueType = typeof inscricaoEventoEntityVenue;

export default inscricaoEventoEntityVenue;
