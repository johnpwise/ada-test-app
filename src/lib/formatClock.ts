export type HourCycle = "12h" | "24h";

const pad = (value: number) => String(value).padStart(2, "0");

type ClockParts = { hours: number; minutes: number; seconds: number };

function getClockParts(date: Date, timeZone?: string): ClockParts {
  if (timeZone === undefined) {
    return { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() };
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return { hours: read("hour"), minutes: read("minute"), seconds: read("second") };
}

export function formatClock(date: Date, hourCycle: HourCycle, timeZone?: string): string {
  const { hours, minutes: rawMinutes, seconds: rawSeconds } = getClockParts(date, timeZone);
  const minutes = pad(rawMinutes);
  const seconds = pad(rawSeconds);

  if (hourCycle === "24h") {
    return `${pad(hours)}:${minutes}.${seconds}`;
  }

  const suffix = hours < 12 ? "AM" : "PM";

  return `${pad(hours % 12 || 12)}:${minutes}.${seconds} ${suffix}`;
}
