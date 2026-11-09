import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import { CLOCK_TEST_IDS } from "../../components/clock/Clock.testIds";
import { PAGE_VIEWS_PANEL_TEST_IDS } from "../../components/page-views-panel/PageViewsPanel.testIds";
import { TORUS_WIDGET_TEST_IDS } from "../../components/torus-widget/TorusWidget.testIds";
import HomeView from "./HomeView";
import { HOME_VIEW_TEST_IDS } from "./HomeView.testIds";

describe("HomeView", () => {
  afterEach(() => {
    cleanup();
  });

  it("should not render the green bordered box or its text", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.queryByLabelText("Red bordered square")).not.toBeInTheDocument();
    expect(screen.queryByText("ADA plugin test")).not.toBeInTheDocument();
  });

  it("should greet with Hello ADA and not render Hello Nick", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByText("Hello ADA")).toBeInTheDocument();
    expect(screen.queryByText("Hello Nick")).not.toBeInTheDocument();
  });

  it("should render the page views by day panel", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByTestId(PAGE_VIEWS_PANEL_TEST_IDS.panel)).toBeInTheDocument();
  });

  it("should render the clock widget", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.clock)).toBeInTheDocument();
  });

  it("should render two torus widgets, one green and one red", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getAllByTestId(TORUS_WIDGET_TEST_IDS.widget)).toHaveLength(2);
    const colours = screen
      .getAllByTestId(TORUS_WIDGET_TEST_IDS.torus)
      .map((torus) => torus.getAttribute("data-color"));
    expect(colours).toEqual(["green", "red"]);
  });

  it("should give the two torus widgets different accessible names", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByRole("region", { name: "Torus Widget" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Red Torus Widget" })).toBeInTheDocument();
  });

  it("should render the green and red torus widgets side by side in one row", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const row = screen.getByTestId(HOME_VIEW_TEST_IDS.torusRow);
    expect(row).toHaveClass("flex");
    expect(row).not.toHaveClass("flex-col");
    const colours = within(row)
      .getAllByTestId(TORUS_WIDGET_TEST_IDS.torus)
      .map((torus) => torus.getAttribute("data-color"));
    expect(colours).toEqual(["green", "red"]);
  });
});
