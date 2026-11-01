import { useEffect, useState } from "react";

import { APP_VERSION } from "../../lib/appVersion";
import { formatRelativeTime } from "../../lib/formatRelativeTime";
import { LAST_UPDATED_FOOTER_TEST_IDS } from "./LastUpdatedFooter.testIds";

const REFRESH_INTERVAL_MS = 60_000;

interface LastUpdatedFooterProps {
  updatedAt: number;
  version?: string;
}

export default function LastUpdatedFooter({
  updatedAt,
  version = APP_VERSION,
}: LastUpdatedFooterProps) {
  const [now, setNow] = useState(() => Date.now());
  const versionLabel = version.trim();

  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer
      data-id={LAST_UPDATED_FOOTER_TEST_IDS.footer}
      className="border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p data-id={LAST_UPDATED_FOOTER_TEST_IDS.text}>
          Last updated {formatRelativeTime(updatedAt, now)}
        </p>
        {versionLabel ? (
          <span data-id={LAST_UPDATED_FOOTER_TEST_IDS.version}>v{versionLabel}</span>
        ) : null}
      </div>
    </footer>
  );
}
