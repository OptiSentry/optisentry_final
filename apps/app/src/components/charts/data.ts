// logins per day (letzte 14 Tage)
export const dataLogins = [
  { day: 'Mo', value: 120 }, { day: 'Di', value: 150 }, { day: 'Mi', value: 180 },
  { day: 'Do', value: 160 }, { day: 'Fr', value: 210 }, { day: 'Sa', value: 90 }, { day: 'So', value: 70 },
  { day: 'Mo2', value: 140 }, { day: 'Di2', value: 170 }, { day: 'Mi2', value: 200 },
  { day: 'Do2', value: 190 }, { day: 'Fr2', value: 230 }, { day: 'Sa2', value: 110 }, { day: 'So2', value: 80 },
];

// DSAR-Durchlaufzeiten (in Tagen)
export const dataDsar = [
  { type: 'Auskunft', days: 3.2 },
  { type: 'Löschung', days: 2.1 },
  { type: 'Berichtigung', days: 1.4 },
];

// Anomalie-Kategorien
export const dataAnomaly = [
  { name: 'Fehlversuche', value: 42 },
  { name: 'Ungewöhnl. Orte', value: 18 },
  { name: 'Ungewöhnl. Zeiten', value: 25 },
  { name: 'Sonstiges', value: 15 },
];
