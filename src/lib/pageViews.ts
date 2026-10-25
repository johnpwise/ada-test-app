export type PageViewsByDay = Record<string, number>;

export interface PageViewDay {
  day: string;
  count: number;
}

export function toDayKey(timestamp: number): string {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

export function incrementDay(counts: PageViewsByDay, timestamp: number): PageViewsByDay {
  const key = toDayKey(timestamp);

  return { ...counts, [key]: (counts[key] ?? 0) + 1 };
}

export function lastDays(counts: PageViewsByDay, timestamp: number, days: number): PageViewDay[] {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(timestamp);
    date.setDate(date.getDate() - (days - 1 - index));
    const day = toDayKey(date.getTime());

    return { day, count: counts[day] ?? 0 };
  });
}

export function parsePageViewsByDay(raw: string | null): PageViewsByDay {
  if (raw === null) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, number] => Number.isInteger(entry[1]) && entry[1] >= 0,
      ),
    );
  } catch {
    return {};
  }
}
