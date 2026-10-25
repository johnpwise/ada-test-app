import { useEffect, useState } from "react";

import { formatRelativeTime } from "../../lib/formatRelativeTime";
import { LAST_UPDATED_FOOTER_TEST_IDS } from "./LastUpdatedFooter.testIds";

const REFRESH_INTERVAL_MS = 60_000;

interface LastUpdatedFooterProps {
  updatedAt: number;
}

export default function LastUpdatedFooter({ updatedAt }: LastUpdatedFooterProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer
      data-id={LAST_UPDATED_FOOTER_TEST_IDS.footer}
      className="border-t border-border bg-background text-foreground"
    >
      <p
        data-id={LAST_UPDATED_FOOTER_TEST_IDS.text}
        className="mx-auto w-full max-w-3xl px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8"
      >
        Last updated {formatRelativeTime(updatedAt, now)}
      </p>
    </footer>
  );
}
