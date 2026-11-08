import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import TorusWidget from "./TorusWidget";
import { TORUS_WIDGET_TEST_IDS } from "./TorusWidget.testIds";

describe("TorusWidget", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the label 'Torus Widget'", () => {
    // Arrange

    // Act
    render(<TorusWidget />);

    // Assert
    expect(screen.getByTestId(TORUS_WIDGET_TEST_IDS.label)).toHaveTextContent("Torus Widget");
  });

  it("should render a green torus", () => {
    // Arrange
    const blueHexValues = ["#2563eb", "#60a5fa", "#1e3a8a"];
    const greenHexValues = ["#16a34a", "#4ade80", "#14532d"];

    // Act
    render(<TorusWidget />);

    // Assert
    const torus = screen.getByTestId(TORUS_WIDGET_TEST_IDS.torus);
    expect(torus).toHaveAttribute("data-color", "green");
    expect(torus).toHaveAttribute("fill", greenHexValues[0]);
    const stopColors = [...torus.querySelectorAll("stop")].map((stop) => stop.getAttribute("stop-color"));
    expect(stopColors).toEqual([greenHexValues[1], greenHexValues[0], greenHexValues[2]]);
    expect(torus.outerHTML.toLowerCase()).not.toMatch(new RegExp(blueHexValues.join("|")));
  });

  it("should render the torus ring 6px wide at its rendered size", () => {
    // Arrange
    const expectedRingWidthPx = 6;

    // Act
    render(<TorusWidget />);

    // Assert
    const torus = screen.getByTestId(TORUS_WIDGET_TEST_IDS.torus);
    const viewBoxWidth = Number(torus.getAttribute("viewBox")?.split(" ")[2]);
    const scale = Number(torus.getAttribute("width")) / viewBoxWidth;
    const radii = [...(torus.querySelector("path")?.getAttribute("d") ?? "").matchAll(/a(\d+(?:\.\d+)?) /g)].map(
      (match) => Number(match[1]),
    );
    expect(radii).toHaveLength(2);
    expect((Math.max(...radii) - Math.min(...radii)) * scale).toBeCloseTo(expectedRingWidthPx, 5);
  });

  it("should keep the torus outer diameter at 150px", () => {
    // Arrange

    // Act
    render(<TorusWidget />);

    // Assert
    const torus = screen.getByTestId(TORUS_WIDGET_TEST_IDS.torus);
    expect(torus).toHaveAttribute("width", "150");
    expect(torus).toHaveAttribute("height", "150");
  });

  it("should be no bigger than 200px by 200px", () => {
    // Arrange

    // Act
    render(<TorusWidget />);

    // Assert
    const widget = screen.getByTestId(TORUS_WIDGET_TEST_IDS.widget);
    expect(parseInt(widget.style.width, 10)).toBeLessThanOrEqual(200);
    expect(parseInt(widget.style.height, 10)).toBeLessThanOrEqual(200);
  });
});
