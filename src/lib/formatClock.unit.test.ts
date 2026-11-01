import { describe, expect, it } from "vitest";

import { formatClock } from "./formatClock";

describe("formatClock", () => {
  it("should format 24 hour time with a dot before the seconds", () => {
    // Arrange
    const date = new Date(2026, 9, 25, 14, 54, 0);

    // Act
    const result = formatClock(date, "24h");

    // Assert
    expect(result).toBe("14:54.00");
  });

  it("should zero pad hours, minutes and seconds in 24 hour time", () => {
    // Arrange
    const date = new Date(2026, 9, 25, 0, 5, 9);

    // Act
    const result = formatClock(date, "24h");

    // Assert
    expect(result).toBe("00:05.09");
  });

  it("should format an afternoon time in 12 hour view with PM", () => {
    // Arrange
    const date = new Date(2026, 9, 25, 14, 54, 0);

    // Act
    const result = formatClock(date, "12h");

    // Assert
    expect(result).toBe("02:54.00 PM");
  });

  it("should format a morning time in 12 hour view with AM", () => {
    // Arrange
    const date = new Date(2026, 9, 25, 9, 7, 3);

    // Act
    const result = formatClock(date, "12h");

    // Assert
    expect(result).toBe("09:07.03 AM");
  });

  it("should show midnight as 12 AM in 12 hour view", () => {
    // Arrange
    const date = new Date(2026, 9, 25, 0, 30, 15);

    // Act
    const result = formatClock(date, "12h");

    // Assert
    expect(result).toBe("12:30.15 AM");
  });

  it("should show noon as 12 PM in 12 hour view", () => {
    // Arrange
    const date = new Date(2026, 9, 25, 12, 0, 0);

    // Act
    const result = formatClock(date, "12h");

    // Assert
    expect(result).toBe("12:00.00 PM");
  });
});
