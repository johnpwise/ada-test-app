import { useState } from "react";

import { lastDays } from "../../lib/pageViews";
import { useAppStore } from "../../store/appStore";
import { PAGE_VIEWS_PANEL_TEST_IDS } from "./PageViewsPanel.testIds";

const DAYS_SHOWN = 7;

export default function PageViewsPanel() {
  const pageViewsByDay = useAppStore((state) => state.pageViewsByDay);
  const [now] = useState(() => Date.now());
  const days = lastDays(pageViewsByDay, now, DAYS_SHOWN);

  return (
    <section
      data-id={PAGE_VIEWS_PANEL_TEST_IDS.panel}
      className="space-y-3 rounded-lg border border-border bg-surface p-4"
    >
      <h2 className="text-sm font-medium text-muted-foreground">Page views by day</h2>
      <ul className="divide-y divide-border text-surface-foreground">
        {days.map(({ day, count }) => (
          <li
            key={day}
            data-id={PAGE_VIEWS_PANEL_TEST_IDS.row}
            className="flex items-center justify-between py-1 text-sm"
          >
            <span>{day}</span>
            <span className="font-medium">{count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
