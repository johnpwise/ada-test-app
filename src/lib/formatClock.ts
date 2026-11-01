export type HourCycle = "12h" | "24h";

const pad = (value: number) => String(value).padStart(2, "0");

export function formatClock(date: Date, hourCycle: HourCycle): string {
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  if (hourCycle === "24h") {
    return `${pad(date.getHours())}:${minutes}.${seconds}`;
  }

  const hours = date.getHours();
  const suffix = hours < 12 ? "AM" : "PM";

  return `${pad(hours % 12 || 12)}:${minutes}.${seconds} ${suffix}`;
}
