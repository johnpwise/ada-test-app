import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import PieChartWidget from "./PieChartWidget";
import { PIE_CHART_WIDGET_TEST_IDS } from "./PieChartWidget.testIds";

const EXPECTED_SLICES = [
  { name: "Alpha", percentage: 40 },
  { name: "Beta", percentage: 30 },
  { name: "Gamma", percentage: 20 },
  { name: "Delta", percentage: 10 },
];

function getSweepDegrees(pathData: string): number {
  const numbers = [...pathData.matchAll(/-?\d+(?:\.\d+)?/g)].map((match) => Number(match[0]));
  // M cx cy L x1 y1 A r r rot large sweep x2 y2 Z
  const [cx, cy, x1, y1, , , , , , x2, y2] = numbers;
  const start = Math.atan2(y1 - cy, x1 - cx);
  const end = Math.atan2(y2 - cy, x2 - cx);
  return (((end - start) * 180) / Math.PI + 360) % 360;
}

describe("PieChartWidget", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a region named 'Pie Chart Widget' with the same visible label", () => {
    // Arrange

    // Act
    render(<PieChartWidget />);

    // Assert
    expect(screen.getByRole("region", { name: "Pie Chart Widget" })).toBeInTheDocument();
    expect(screen.getByTestId(PIE_CHART_WIDGET_TEST_IDS.label)).toHaveTextContent(/^Pie Chart Widget$/);
  });

  it("should have the same 200px by 200px outer box as the torus widget", () => {
    // Arrange

    // Act
    render(<PieChartWidget />);

    // Assert
    const widget = screen.getByTestId(PIE_CHART_WIDGET_TEST_IDS.widget);
    expect(widget.style.width).toBe("200px");
    expect(widget.style.height).toBe("200px");
  });

  it("should draw one slice per fake data item with distinct palette fills", () => {
    // Arrange

    // Act
    render(<PieChartWidget />);

    // Assert
    const slices = screen.getAllByTestId(PIE_CHART_WIDGET_TEST_IDS.slice);
    expect(slices).toHaveLength(EXPECTED_SLICES.length);
    const fills = slices.map((slice) => slice.getAttribute("fill"));
    fills.forEach((fill) => expect(fill).toMatch(/^#[0-9a-f]{6}$/i));
    expect(new Set(fills).size).toBe(EXPECTED_SLICES.length);
  });

  it("should size each slice arc in proportion to its value, summing to a full circle", () => {
    // Arrange

    // Act
    render(<PieChartWidget />);

    // Assert
    const sweeps = screen
      .getAllByTestId(PIE_CHART_WIDGET_TEST_IDS.slice)
      .map((slice) => getSweepDegrees(slice.getAttribute("d") ?? ""));
    sweeps.forEach((sweep, index) => {
      expect(sweep).toBeCloseTo((EXPECTED_SLICES[index].percentage / 100) * 360, 1);
    });
    expect(sweeps.reduce((total, sweep) => total + sweep, 0)).toBeCloseTo(360, 1);
  });

  it("should list every slice name with its percentage as text", () => {
    // Arrange

    // Act
    render(<PieChartWidget />);

    // Assert
    const legend = screen.getByTestId(PIE_CHART_WIDGET_TEST_IDS.legend);
    const items = within(legend).getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual(
      EXPECTED_SLICES.map(({ name, percentage }) => `${name}: ${percentage}%`),
    );
  });

  it("should hide the decorative pie graphic from assistive technology", () => {
    // Arrange

    // Act
    render(<PieChartWidget />);

    // Assert
    expect(screen.getByTestId(PIE_CHART_WIDGET_TEST_IDS.chart)).toHaveAttribute("aria-hidden", "true");
  });
});
