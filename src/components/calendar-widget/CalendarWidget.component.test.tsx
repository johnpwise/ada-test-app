import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import CalendarWidget from "./CalendarWidget";
import { CALENDAR_WIDGET_TEST_IDS } from "./CalendarWidget.testIds";

describe("CalendarWidget", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 25, 12, 0, 0));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("should render a region named Calendar showing the current month and year", () => {
    // Arrange

    // Act
    render(<CalendarWidget />);

    // Assert
    expect(screen.getByRole("region", { name: "Calendar" })).toBeInTheDocument();
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.heading)).toHaveTextContent(
      "November 2026",
    );
  });

  it("should show No date selected before any selection", () => {
    // Arrange

    // Act
    render(<CalendarWidget />);

    // Assert
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.selectedDate)).toHaveTextContent(
      "No date selected",
    );
  });

  it("should show the date of the clicked day", () => {
    // Arrange
    render(<CalendarWidget />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Wednesday, November 25, 2026" }));

    // Assert
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.selectedDate)).toHaveTextContent(
      "Wednesday, November 25, 2026",
    );
  });

  it("should mark only the selected day with aria-pressed", () => {
    // Arrange
    render(<CalendarWidget />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Wednesday, November 25, 2026" }));

    // Assert
    expect(
      screen.getByRole("button", { name: "Wednesday, November 25, 2026" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Thursday, November 26, 2026" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("should move the selection when another day is clicked", () => {
    // Arrange
    render(<CalendarWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Wednesday, November 25, 2026" }));

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Thursday, November 26, 2026" }));

    // Assert
    expect(
      screen.getByRole("button", { name: "Wednesday, November 25, 2026" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.getByRole("button", { name: "Thursday, November 26, 2026" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.selectedDate)).toHaveTextContent(
      "Thursday, November 26, 2026",
    );
  });

  it("should keep the day selected when it is clicked again", () => {
    // Arrange
    render(<CalendarWidget />);
    const day = screen.getByRole("button", { name: "Wednesday, November 25, 2026" });
    fireEvent.click(day);

    // Act
    fireEvent.click(day);

    // Assert
    expect(day).toHaveAttribute("aria-pressed", "true");
  });

  it("should show the next month when Next month is pressed", () => {
    // Arrange
    render(<CalendarWidget />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));

    // Assert
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.heading)).toHaveTextContent(
      "December 2026",
    );
    expect(
      screen.getByRole("button", { name: "Tuesday, December 1, 2026" }),
    ).toBeInTheDocument();
  });

  it("should show the previous month when Previous month is pressed", () => {
    // Arrange
    render(<CalendarWidget />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));

    // Assert
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.heading)).toHaveTextContent(
      "October 2026",
    );
  });

  it("should roll over the year when navigating past December", () => {
    // Arrange
    render(<CalendarWidget />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));

    // Assert
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.heading)).toHaveTextContent(
      "January 2027",
    );
  });

  it("should keep a selection made in another month", () => {
    // Arrange
    render(<CalendarWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    fireEvent.click(screen.getByRole("button", { name: "Tuesday, December 1, 2026" }));

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));

    // Assert
    expect(screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.selectedDate)).toHaveTextContent(
      "Tuesday, December 1, 2026",
    );
    expect(
      screen.getByRole("button", { name: "Wednesday, November 25, 2026" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("should announce the selected date politely", () => {
    // Arrange

    // Act
    render(<CalendarWidget />);

    // Assert
    const selected = screen.getByTestId(CALENDAR_WIDGET_TEST_IDS.selectedDate);
    expect(selected).toHaveAttribute("aria-live", "polite");
  });
});
