export const descriptions = [
  "On a phone the receptionist still books by finding an active physician or therapist, checking the name, finding the patient, reviewing that professional’s occupied appointments, and recording the appointment only if the time is free.",
  "Constrained space puts reading priority on the professional’s name and active status first, then remaining identification (subtype, document type, document identifier, country code), then the matching patient identity, then occupied appointments (patient, professional, scheduled moment, status), and finally the booking values. Paging remains available when a collection does not fit in one request.",
  "Touch-first entry lets the receptionist type or pick professional filters and request that collection, type or pick patient filters and request that collection, type or pick appointment filters including identifier, patient, professional, scheduled moment, status, and optional page and request occupancy, then type or pick patient, professional, scheduled moment, and appointment status and submit the booking. No capability is omitted relative to the wide-screen experience; a successful booking still refreshes occupancy.",
  "Loading copy appears while the page, any collection, or booking is running so a thumb-driven pause is understood. An empty collection is called out so the receptionist can change filters without guessing. Errors from listing or booking, including a time already taken by the same professional, are announced in place and remain retryable. Idle and success remain distinct so the receptionist knows when occupancy is trustworthy.",
  "Tap targets stay easy to hit, reading order follows professional then patient then occupancy then booking, every field is labeled, and assistive technology hears loading, empty, success, and error so the same appointment can be completed without a pointing device."
] as const;

export const pipeline = [
  {
    "id": "profissionais__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/profissionais.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/profissionais.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/profissionais.ts"
    ],
    "dependsOn": [
      "profissionais__l2_shared"
    ],
    "skills": []
  }
] as const;
