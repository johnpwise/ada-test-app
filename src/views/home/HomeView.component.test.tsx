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

  it("should show the sandbox subtitle and not the old theme preferences text", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByText("Sandbox application to showcase ADA")).toBeInTheDocument();
    expect(
      screen.queryByText("Configure your theme and color mode preferences."),
    ).not.toBeInTheDocument();
  });

  it("should greet with Your imagination, realised and not render Hello ADA", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    expect(screen.getByText("Your imagination, realised")).toBeInTheDocument();
    expect(screen.queryByText("Hello ADA")).not.toBeInTheDocument();
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

  it("should render one pie chart widget in the torus row after the torus widgets", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const row = screen.getByTestId(HOME_VIEW_TEST_IDS.torusRow);
    expect(screen.getAllByRole("region", { name: "Pie Chart Widget" })).toHaveLength(1);
    const names = within(row)
      .getAllByRole("region")
      .map((widget) => widget.getAttribute("aria-label"));
    expect(names).toEqual(["Torus Widget", "Blue Torus Widget", "Pie Chart Widget"]);
  });

  it("should render one calendar widget after the torus row with no date selected", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const row = screen.getByTestId(HOME_VIEW_TEST_IDS.torusRow);
    const calendar = screen.getByRole("region", { name: "Calendar" });
    expect(screen.getAllByRole("region", { name: "Calendar" })).toHaveLength(1);
    expect(within(row).queryByRole("region", { name: "Calendar" })).not.toBeInTheDocument();
    expect(
      row.compareDocumentPosition(calendar) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByText("No date selected")).toBeInTheDocument();
  });

  it("should render one colour picker widget after the calendar widget", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const calendar = screen.getByRole("region", { name: "Calendar" });
    const picker = screen.getByRole("region", { name: "Colour picker" });
    expect(screen.getAllByRole("region", { name: "Colour picker" })).toHaveLength(1);
    expect(
      calendar.compareDocumentPosition(picker) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
