import { useState } from "react";

import { buildMonthGrid, formatSelectedDate } from "../../lib/calendarMonth";
import { CALENDAR_WIDGET_TEST_IDS } from "./CalendarWidget.testIds";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

const MONTH_HEADING_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const NAV_BUTTON_CLASS =
  "inline-flex items-center rounded-md border border-primary-line bg-primary px-3 py-1 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const isSameDay = (a: Date | null, b: Date): boolean =>
  a !== null &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function CalendarWidget() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();

    return { year: today.getFullYear(), monthIndex: today.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { year, monthIndex } = visibleMonth;
  const weeks = buildMonthGrid(year, monthIndex);

  const showMonth = (offset: number): void => {
    const target = new Date(year, monthIndex + offset, 1);
    setVisibleMonth({ year: target.getFullYear(), monthIndex: target.getMonth() });
  };

  return (
    <section
      aria-label="Calendar"
      className="max-w-xs space-y-3 rounded-lg border border-border bg-surface p-4"
      data-id={CALENDAR_WIDGET_TEST_IDS.widget}
    >
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          data-id={CALENDAR_WIDGET_TEST_IDS.previous}
          className={NAV_BUTTON_CLASS}
          onClick={() => showMonth(-1)}
        >
          ‹
        </button>
        <h2
          className="text-sm font-medium text-surface-foreground"
          data-id={CALENDAR_WIDGET_TEST_IDS.heading}
        >
          {MONTH_HEADING_FORMAT.format(new Date(year, monthIndex, 1))}
        </h2>
        <button
          type="button"
          aria-label="Next month"
          data-id={CALENDAR_WIDGET_TEST_IDS.next}
          className={NAV_BUTTON_CLASS}
          onClick={() => showMonth(1)}
        >
          ›
        </button>
      </div>
      <table className="w-full table-fixed border-collapse text-center text-sm">
        <thead>
          <tr>
            {WEEKDAY_LABELS.map((label) => (
              <th key={label} scope="col" className="font-medium text-muted-foreground">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, cellIndex) => {
                if (day === null) {
                  return <td key={cellIndex} />;
                }

                const date = new Date(year, monthIndex, day);
                const isSelected = isSameDay(selectedDate, date);

                return (
                  <td key={cellIndex}>
                    <button
                      type="button"
                      aria-label={formatSelectedDate(date)}
                      aria-pressed={isSelected}
                      className={`w-full rounded-md py-1 text-surface-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isSelected ? "bg-primary text-primary-foreground" : "hover:bg-border"
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p
        aria-live="polite"
        className="text-sm text-surface-foreground"
        data-id={CALENDAR_WIDGET_TEST_IDS.selectedDate}
      >
        {selectedDate === null ? "No date selected" : formatSelectedDate(selectedDate)}
      </p>
    </section>
  );
}
