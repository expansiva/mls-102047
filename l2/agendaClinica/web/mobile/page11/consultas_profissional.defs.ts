export const descriptions = [
  "On a handheld device the professional still has a single objective: see only their consultations of the day and record attendance with a note. Constrained space sets reading priority to the next scheduled time, then the patient, then the situation, so they can act on the imminent visit first without losing access to the rest of their own day.",
  "Touch locates the day with the same consultation identity, patient, professional, scheduled time, situation, and paging criteria, then inspects a consultation and starts registering attendance. They still select the consultation, type the required attendance details, optionally add an attendance note, and confirm the attended change. No capability is removed; they complete the same locate, inspect, and register work through sequential reading and taps instead of scanning many encounters at once.",
  "After a tap, loading of the day is obvious so they do not confuse a slow retrieve with an empty agenda. An empty day is a brief statement that they have no consultations of their own. List errors and attendance-save errors stay readable in the small space and can be retried. Success of registering attendance is confirmed before they go back to reviewing the day.",
  "Thumb-reachable controls and a screen reader expose locating, inspecting, and registering attendance. Live updates speak loading, empty, error, and success. When they start or finish recording attendance, focus remains on the consultation they chose so a gesture does not leave them lost."
] as const;

export const pipeline = [
  {
    "id": "consultas_profissional__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_profissional.ts"
    ],
    "dependsOn": [
      "consultas_profissional__l2_shared"
    ],
    "skills": []
  }
] as const;
