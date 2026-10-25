import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import { useAppStore } from "../../store/appStore";
import PageViewsPanel from "./PageViewsPanel";
import { PAGE_VIEWS_PANEL_TEST_IDS } from "./PageViewsPanel.testIds";

describe("PageViewsPanel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 25, 12, 0, 0));
    useAppStore.setState({ pageViewsByDay: { "2026-10-25": 3, "2026-10-23": 2 } });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("should render a titled panel", () => {
    // Arrange

    // Act
    render(<PageViewsPanel />);

    // Assert
    const panel = screen.getByTestId(PAGE_VIEWS_PANEL_TEST_IDS.panel);
    expect(within(panel).getByRole("heading", { name: "Page views by day" })).toBeInTheDocument();
  });

  it("should list the last 7 days oldest first with their counts", () => {
    // Arrange

    // Act
    render(<PageViewsPanel />);

    // Assert
    const rows = screen.getAllByTestId(PAGE_VIEWS_PANEL_TEST_IDS.row);
    expect(rows).toHaveLength(7);
    expect(rows[0]).toHaveTextContent("2026-10-19");
    expect(rows[0]).toHaveTextContent("0");
    expect(rows[4]).toHaveTextContent("2026-10-23");
    expect(rows[4]).toHaveTextContent("2");
    expect(rows[6]).toHaveTextContent("2026-10-25");
    expect(rows[6]).toHaveTextContent("3");
  });
});
