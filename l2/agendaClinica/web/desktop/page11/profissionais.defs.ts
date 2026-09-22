export const descriptions = [
  "The receptionist’s objective is to locate an active physician or therapist, confirm that professional’s name, locate the patient who will receive the appointment, inspect appointments already occupying that professional at the intended moment, and register a new appointment only when the same professional has no other appointment at the same time.",
  "Information available includes professionals and patients identified by name, status, subtype, document type, document identifier, and country code, together with appointments that show identifier, patient, professional, scheduled moment, and appointment status. Longer professional, patient, and appointment collections can be requested a page at a time.",
  "The receptionist enters professional identification criteria and requests the professional collection, then confirms the chosen name. The receptionist enters patient identification criteria and requests the patient collection. The receptionist enters appointment criteria including identifier, patient, professional, scheduled moment, status, and optional page, then requests occupied appointments. The receptionist then supplies the patient, professional, scheduled moment, and appointment status and registers the appointment; a successful registration refreshes the occupied-appointment collection.",
  "While the page or a professional, patient, or appointment collection is loading, or while registration is in progress, the receptionist is informed that work is still running and must not treat the view as complete. When a collection returns no matches, an empty outcome is stated so criteria can be revised. When listing or registration fails, including when the professional already has an appointment at that time, the error is stated and the receptionist may retry with the values already entered. Idle and success outcomes stay equally clear so it is obvious when it is safe to continue.",
  "Keyboard access reaches every criterion, every collection request, paging, and registration. Each value has an accessible name. Changes among idle, loading, empty, success, and error are announced to assistive technology without trapping focus, so a screen-reader user can confirm the professional, inspect occupancy, and complete the same booking."
] as const;

export const pipeline = [
  {
    "id": "profissionais__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/profissionais.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/profissionais.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/profissionais.ts"
    ],
    "dependsOn": [
      "profissionais__l2_shared"
    ],
    "skills": []
  }
] as const;
