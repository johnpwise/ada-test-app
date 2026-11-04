import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { CLOCK_TEST_IDS } from "../../components/clock/Clock.testIds";
import { PAGE_VIEWS_PANEL_TEST_IDS } from "../../components/page-views-panel/PageViewsPanel.testIds";
import HomeView from "./HomeView";

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
});
