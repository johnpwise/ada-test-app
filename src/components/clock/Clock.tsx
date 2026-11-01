import { useEffect, useState } from "react";

import { formatClock, type HourCycle } from "../../lib/formatClock";
import { CLOCK_TEST_IDS } from "./Clock.testIds";

const TICK_INTERVAL_MS = 1000;

export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [hourCycle, setHourCycle] = useState<HourCycle>("24h");

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  const is12Hour = hourCycle === "12h";

  return (
    <section
      aria-label="Clock"
      className="space-y-3 rounded-lg border border-border bg-surface p-4"
      data-id={CLOCK_TEST_IDS.clock}
    >
      <p
        className="font-mono text-3xl tabular-nums text-surface-foreground"
        data-id={CLOCK_TEST_IDS.time}
      >
        {formatClock(now, hourCycle)}
      </p>
      <button
        type="button"
        aria-pressed={is12Hour}
        data-id={CLOCK_TEST_IDS.toggle}
        className="inline-flex items-center rounded-md border border-primary-line bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => setHourCycle(is12Hour ? "24h" : "12h")}
      >
        12 hour view
      </button>
    </section>
  );
}
