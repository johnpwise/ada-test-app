import { useId } from "react";

import { TORUS_WIDGET_TEST_IDS } from "./TorusWidget.testIds";

const WIDGET_SIZE_PX = 200;

const TORUS_PALETTES = {
  green: { base: "#16a34a", light: "#4ade80", dark: "#14532d" },
  red: { base: "#dc2626", light: "#f87171", dark: "#7f1d1d" },
  blue: { base: "#2563eb", light: "#60a5fa", dark: "#1e3a8a" },
} as const;

const TORUS_LABELS = {
  green: "Torus Widget",
  red: "Red Torus Widget",
  blue: "Blue Torus Widget",
} as const satisfies Record<keyof typeof TORUS_PALETTES, string>;

type TorusWidgetProps = {
  color?: keyof typeof TORUS_PALETTES;
};

export default function TorusWidget({ color = "green" }: TorusWidgetProps) {
  const gradientId = useId();
  const palette = TORUS_PALETTES[color];
  const label = TORUS_LABELS[color];

  return (
    <section
      aria-label={label}
      className="flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-border bg-surface p-2"
      data-id={TORUS_WIDGET_TEST_IDS.widget}
      style={{ width: WIDGET_SIZE_PX, height: WIDGET_SIZE_PX }}
    >
      <svg
        aria-hidden="true"
        data-color={color}
        data-id={TORUS_WIDGET_TEST_IDS.torus}
        viewBox="0 0 100 100"
        width={150}
        height={150}
        fill={palette.base}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="60%" stopColor={palette.base} />
            <stop offset="100%" stopColor={palette.dark} />
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
        {label}
      </p>
    </section>
  );
}
