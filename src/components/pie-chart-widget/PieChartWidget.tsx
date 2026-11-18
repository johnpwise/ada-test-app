import { PIE_CHART_WIDGET_TEST_IDS } from "./PieChartWidget.testIds";

const WIDGET_SIZE_PX = 200;
const PIE_CENTER = 50;
const PIE_RADIUS = 45;

const FAKE_PIE_DATA = [
  { name: "Alpha", value: 40, color: "#2563eb" },
  { name: "Beta", value: 30, color: "#f59e0b" },
  { name: "Gamma", value: 20, color: "#16a34a" },
  { name: "Delta", value: 10, color: "#dc2626" },
] as const;

const TOTAL_VALUE = FAKE_PIE_DATA.reduce((total, slice) => total + slice.value, 0);

function pointOnPie(angleRadians: number): string {
  const x = PIE_CENTER + PIE_RADIUS * Math.cos(angleRadians);
  const y = PIE_CENTER + PIE_RADIUS * Math.sin(angleRadians);
  return `${x.toFixed(3)} ${y.toFixed(3)}`;
}

function buildSlices() {
  let startAngle = -Math.PI / 2;

  return FAKE_PIE_DATA.map((slice) => {
    const fraction = slice.value / TOTAL_VALUE;
    const endAngle = startAngle + fraction * 2 * Math.PI;
    const largeArc = fraction > 0.5 ? 1 : 0;
    const path = `M${PIE_CENTER} ${PIE_CENTER} L${pointOnPie(startAngle)} A${PIE_RADIUS} ${PIE_RADIUS} 0 ${largeArc} 1 ${pointOnPie(endAngle)} Z`;
    startAngle = endAngle;

    return { ...slice, path, percentage: Math.round(fraction * 100) };
  });
}

const PIE_SLICES = buildSlices();

export default function PieChartWidget() {
  return (
    <section
      aria-label="Pie Chart Widget"
      className="flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-border bg-surface p-2"
      data-id={PIE_CHART_WIDGET_TEST_IDS.widget}
      style={{ width: WIDGET_SIZE_PX, height: WIDGET_SIZE_PX }}
    >
      <svg
        aria-hidden="true"
        data-id={PIE_CHART_WIDGET_TEST_IDS.chart}
        viewBox="0 0 100 100"
        width={150}
        height={150}
      >
        {PIE_SLICES.map((slice) => (
          <path
            key={slice.name}
            d={slice.path}
            data-id={PIE_CHART_WIDGET_TEST_IDS.slice}
            fill={slice.color}
          />
        ))}
      </svg>
      <p
        className="text-sm font-medium text-surface-foreground"
        data-id={PIE_CHART_WIDGET_TEST_IDS.label}
      >
        Pie Chart Widget
      </p>
      <ul className="sr-only" data-id={PIE_CHART_WIDGET_TEST_IDS.legend}>
        {PIE_SLICES.map((slice) => (
          <li key={slice.name}>{`${slice.name}: ${slice.percentage}%`}</li>
        ))}
      </ul>
    </section>
  );
}
