import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import Clock from "./Clock";
import { CLOCK_TEST_IDS } from "./Clock.testIds";

describe("Clock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 25, 14, 54, 0));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("should show the current time in 24 hour view by default", () => {
    // Arrange

    // Act
    render(<Clock />);

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("14:54.00");
  });

  it("should switch to 12 hour view when the toggle is pressed", () => {
    // Arrange
    render(<Clock />);

    // Act
    fireEvent.click(screen.getByTestId(CLOCK_TEST_IDS.toggle));

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("02:54.00 PM");
  });

  it("should switch back to 24 hour view when the toggle is pressed again", () => {
    // Arrange
    render(<Clock />);
    fireEvent.click(screen.getByTestId(CLOCK_TEST_IDS.toggle));

    // Act
    fireEvent.click(screen.getByTestId(CLOCK_TEST_IDS.toggle));

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("14:54.00");
  });

  it("should label the toggle with the view it switches to", () => {
    // Arrange
    render(<Clock />);
    const toggle = screen.getByTestId(CLOCK_TEST_IDS.toggle);
    expect(toggle).toHaveTextContent("12 hour view");

    // Act
    fireEvent.click(toggle);

    // Assert
    expect(toggle).toHaveTextContent("24 hour view");
  });

  it("should expose the active view through aria-pressed on the toggle", () => {
    // Arrange
    render(<Clock />);
    const toggle = screen.getByTestId(CLOCK_TEST_IDS.toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    // Act
    fireEvent.click(toggle);

    // Assert
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("should advance the time every second", () => {
    // Arrange
    render(<Clock />);

    // Act
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("14:54.01");
  });

  it("should clear its interval on unmount", () => {
    // Arrange
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<Clock />);

    // Act
    unmount();

    // Assert
    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("should offer a labelled city dropdown that defaults to local time", () => {
    // Arrange

    // Act
    render(<Clock />);

    // Assert
    const select = screen.getByLabelText("City");
    expect(select).toBe(screen.getByTestId(CLOCK_TEST_IDS.citySelect));
    expect(select).toHaveValue("local");
    expect(screen.getByRole("option", { name: "Local time" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Tokyo" })).toBeInTheDocument();
  });

  it("should show the time in the chosen city", () => {
    // Arrange
    vi.setSystemTime(new Date("2026-11-03T05:30:00Z"));
    render(<Clock />);

    // Act
    fireEvent.change(screen.getByTestId(CLOCK_TEST_IDS.citySelect), {
      target: { value: "Asia/Tokyo" },
    });

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("14:30.00");
  });

  it("should apply the 12 hour view to the chosen city", () => {
    // Arrange
    vi.setSystemTime(new Date("2026-11-03T05:30:00Z"));
    render(<Clock />);
    fireEvent.change(screen.getByTestId(CLOCK_TEST_IDS.citySelect), {
      target: { value: "Asia/Tokyo" },
    });

    // Act
    fireEvent.click(screen.getByTestId(CLOCK_TEST_IDS.toggle));

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("02:30.00 PM");
  });

  it("should return to local time when Local time is selected again", () => {
    // Arrange
    render(<Clock />);
    const select = screen.getByTestId(CLOCK_TEST_IDS.citySelect);
    fireEvent.change(select, { target: { value: "Asia/Tokyo" } });

    // Act
    fireEvent.change(select, { target: { value: "local" } });

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("14:54.00");
  });

  it("should keep ticking after a city is chosen", () => {
    // Arrange
    vi.setSystemTime(new Date("2026-11-03T05:30:00Z"));
    render(<Clock />);
    fireEvent.change(screen.getByTestId(CLOCK_TEST_IDS.citySelect), {
      target: { value: "Asia/Tokyo" },
    });

    // Act
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.time)).toHaveTextContent("14:30.01");
  });

  it("should not render a clock face", () => {
    // Arrange

    // Act
    render(<Clock />);

    // Assert
    expect(screen.getByTestId(CLOCK_TEST_IDS.clock).querySelector("svg, canvas")).toBeNull();
  });
});
