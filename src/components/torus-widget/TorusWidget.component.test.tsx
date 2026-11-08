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

  it("should render a blue torus", () => {
    // Arrange

    // Act
    render(<TorusWidget />);

    // Assert
    expect(screen.getByTestId(TORUS_WIDGET_TEST_IDS.torus)).toHaveAttribute("data-color", "blue");
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
