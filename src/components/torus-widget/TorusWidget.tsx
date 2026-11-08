import { useId } from "react";

import { TORUS_WIDGET_TEST_IDS } from "./TorusWidget.testIds";

const WIDGET_SIZE_PX = 200;
const TORUS_BLUE = "#2563eb";
const TORUS_BLUE_LIGHT = "#60a5fa";
const TORUS_BLUE_DARK = "#1e3a8a";

export default function TorusWidget() {
  const gradientId = useId();

  return (
    <section
      aria-label="Torus Widget"
      className="flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-border bg-surface p-2"
      data-id={TORUS_WIDGET_TEST_IDS.widget}
      style={{ width: WIDGET_SIZE_PX, height: WIDGET_SIZE_PX }}
    >
      <svg
        aria-hidden="true"
        data-color="blue"
        data-id={TORUS_WIDGET_TEST_IDS.torus}
        viewBox="0 0 100 100"
        width={150}
        height={150}
        fill={TORUS_BLUE}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={TORUS_BLUE_LIGHT} />
            <stop offset="60%" stopColor={TORUS_BLUE} />
            <stop offset="100%" stopColor={TORUS_BLUE_DARK} />
          </radialGradient>
        </defs>
        <path
          d="M50 4a46 46 0 1 0 0.001 0ZM50 8a42 42 0 1 1 -0.001 0Z"
          fill={`url(#${gradientId})`}
          fillRule="evenodd"
        />
      </svg>
      <p
        className="text-sm font-medium text-surface-foreground"
        data-id={TORUS_WIDGET_TEST_IDS.label}
      >
        Torus Widget
      </p>
    </section>
  );
}
