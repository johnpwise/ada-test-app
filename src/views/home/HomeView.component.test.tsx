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

  it("should render a green torus widget followed by a blue torus widget", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getAllByTestId(TORUS_WIDGET_TEST_IDS.widget)).toHaveLength(2);
    const colours = screen
      .getAllByTestId(TORUS_WIDGET_TEST_IDS.torus)
      .map((torus) => torus.getAttribute("data-color"));
    expect(colours).toEqual(["green", "blue"]);
  });

  it("should give the green and blue torus widgets distinct accessible names and not render a red one", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByRole("region", { name: "Torus Widget" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Blue Torus Widget" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Red Torus Widget" })).not.toBeInTheDocument();
  });

  it("should keep both torus widgets in the torus row", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const row = screen.getByTestId(HOME_VIEW_TEST_IDS.torusRow);
    const colours = within(row)
      .getAllByTestId(TORUS_WIDGET_TEST_IDS.torus)
      .map((torus) => torus.getAttribute("data-color"));
    expect(colours).toEqual(["green", "blue"]);
  });
});
