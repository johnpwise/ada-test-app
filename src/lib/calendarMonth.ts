const DAYS_PER_WEEK = 7;

const DATE_LABEL_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export type MonthCell = number | null;

export function buildMonthGrid(year: number, monthIndex: number): MonthCell[][] {
  const leadingBlanks = new Date(year, monthIndex, 1).getDay();
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();
  const cells: MonthCell[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: dayCount }, (_, index) => index + 1),
  ];

  while (cells.length % DAYS_PER_WEEK !== 0) {
    cells.push(null);
  }

  const weeks: MonthCell[][] = [];
  for (let start = 0; start < cells.length; start += DAYS_PER_WEEK) {
    weeks.push(cells.slice(start, start + DAYS_PER_WEEK));
  }

  return weeks;
}

export function formatSelectedDate(date: Date): string {
  return DATE_LABEL_FORMAT.format(date);
}
