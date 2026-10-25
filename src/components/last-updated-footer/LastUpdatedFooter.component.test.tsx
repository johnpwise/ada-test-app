import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";

import LastUpdatedFooter from "./LastUpdatedFooter";
import { LAST_UPDATED_FOOTER_TEST_IDS } from "./LastUpdatedFooter.testIds";

const MINUTE = 60_000;

describe("LastUpdatedFooter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-25T12:00:00.000Z"));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("should show just now for a fresh timestamp", () => {
    // Arrange
    const updatedAt = Date.now();

    // Act
    render(<LastUpdatedFooter updatedAt={updatedAt} />);

    // Assert
    expect(screen.getByTestId(LAST_UPDATED_FOOTER_TEST_IDS.text)).toHaveTextContent(
      "Last updated just now",
    );
  });

  it("should render inside a footer landmark", () => {
    // Arrange
    const updatedAt = Date.now();

    // Act
    render(<LastUpdatedFooter updatedAt={updatedAt} />);

    // Assert
    expect(screen.getByRole("contentinfo")).toBe(
      screen.getByTestId(LAST_UPDATED_FOOTER_TEST_IDS.footer),
    );
  });

  it("should show minutes ago for an older timestamp", () => {
    // Arrange
    const updatedAt = Date.now() - 5 * MINUTE;

    // Act
    render(<LastUpdatedFooter updatedAt={updatedAt} />);

    // Assert
    expect(screen.getByTestId(LAST_UPDATED_FOOTER_TEST_IDS.text)).toHaveTextContent(
      "Last updated 5 min ago",
    );
  });

  it("should refresh the relative text as time passes", () => {
    // Arrange
    render(<LastUpdatedFooter updatedAt={Date.now()} />);

    // Act
    act(() => {
      vi.advanceTimersByTime(3 * MINUTE);
    });

    // Assert
    expect(screen.getByTestId(LAST_UPDATED_FOOTER_TEST_IDS.text)).toHaveTextContent(
      "Last updated 3 min ago",
    );
  });
});
