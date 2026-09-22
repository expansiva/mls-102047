export const descriptions = [
  "The professional opens Agenda do dia to review only the consultations of the day that belong to them and, when a visit is finished, to record that attendance. They read each consultation’s patient, scheduled time, and situation so they can confirm the right encounter. Other professionals’ agendas are out of scope; the information stays limited to their own day.",
  "They locate their own daily consultations, refining by consultation identity, patient, professional, scheduled time, situation, and paging, and they request that list whenever those criteria change. They inspect a consultation to confirm patient and time. To register attendance they select that consultation, enter the required attendance details, may add an attendance note, and confirm so the consultation becomes attended and the note is stored. After success they continue reviewing the rest of their day with the same locate and inspect work.",
  "While the page or the consultation list is loading, they wait and are told the day is still being retrieved so they do not treat silence as an empty agenda. If nothing matches, they learn they have no consultations of their own for the day. If listing fails, they receive an error and can try locating again. Registering attendance has its own waiting, success, and error outcomes so they know whether the attended situation and note were saved. They remain on the daily agenda until they begin registering attendance, then stay with that recording work until it succeeds, fails, or they stop.",
  "Keyboard and pointer both reach every task: locating the day, inspecting a consultation, entering attendance details and an optional note, and confirming. Focus follows that task order and returns to the consultation they were working on after attendance is saved or fails. Loading, empty, error, and success are announced in text to assistive technology, and the shift between browsing the day and recording attendance is named so a screen reader user always knows which work they are in."
] as const;

export const pipeline = [
  {
    "id": "consultas_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_profissional.ts"
    ],
    "dependsOn": [
      "consultas_profissional__l2_shared"
    ],
    "skills": []
  }
] as const;
