export type WorldCity = {
  label: string;
  timeZone: string;
};

export const WORLD_CITIES: readonly WorldCity[] = [
  { label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { label: "Mexico City", timeZone: "America/Mexico_City" },
  { label: "New York", timeZone: "America/New_York" },
  { label: "São Paulo", timeZone: "America/Sao_Paulo" },
  { label: "London", timeZone: "Europe/London" },
  { label: "Paris", timeZone: "Europe/Paris" },
  { label: "Cairo", timeZone: "Africa/Cairo" },
  { label: "Lagos", timeZone: "Africa/Lagos" },
  { label: "Moscow", timeZone: "Europe/Moscow" },
  { label: "Dubai", timeZone: "Asia/Dubai" },
  { label: "Mumbai", timeZone: "Asia/Kolkata" },
  { label: "Bangkok", timeZone: "Asia/Bangkok" },
  { label: "Singapore", timeZone: "Asia/Singapore" },
  { label: "Hong Kong", timeZone: "Asia/Hong_Kong" },
  { label: "Shanghai", timeZone: "Asia/Shanghai" },
  { label: "Tokyo", timeZone: "Asia/Tokyo" },
  { label: "Seoul", timeZone: "Asia/Seoul" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
  { label: "Auckland", timeZone: "Pacific/Auckland" },
];
