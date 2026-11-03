import { useEffect, useState, type ChangeEvent } from "react";

import { formatClock, type HourCycle } from "../../lib/formatClock";
import { WORLD_CITIES } from "../../lib/worldCities";
import { CLOCK_TEST_IDS } from "./Clock.testIds";

const TICK_INTERVAL_MS = 1000;
const LOCAL_TIME_VALUE = "local";

export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [hourCycle, setHourCycle] = useState<HourCycle>("24h");
  const [timeZoneChoice, setTimeZoneChoice] = useState(LOCAL_TIME_VALUE);

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setTimeZoneChoice(event.target.value);
  };

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
        {formatClock(now, hourCycle, timeZoneChoice === LOCAL_TIME_VALUE ? undefined : timeZoneChoice)}
      </p>
      <div className="space-y-1">
        <label
          htmlFor="clock-city"
          className="block text-sm font-medium text-muted-foreground"
        >
          City
        </label>
        <select
          id="clock-city"
          data-id={CLOCK_TEST_IDS.citySelect}
          value={timeZoneChoice}
          className="block w-full rounded-md border border-border bg-surface px-3 py-2 text-surface-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onChange={handleCityChange}
        >
          <option value={LOCAL_TIME_VALUE}>Local time</option>
          {WORLD_CITIES.map((city) => (
            <option key={city.timeZone + city.label} value={city.timeZone}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
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
