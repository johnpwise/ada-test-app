import { describe, expect, it } from "vitest";

import { incrementDay, lastDays, toDayKey } from "./pageViews";

describe("pageViews", () => {
  const now = new Date(2026, 9, 25, 12, 0, 0).getTime();

  it("should format a timestamp as a local YYYY-MM-DD day key", () => {
    // Arrange
    const lateEvening = new Date(2026, 0, 5, 23, 59, 0).getTime();

    // Act
    const key = toDayKey(lateEvening);

    // Assert
    expect(key).toBe("2026-01-05");
  });

  it("should increment the count for the day without mutating the input", () => {
    // Arrange
    const counts = { "2026-10-25": 2 };

    // Act
    const next = incrementDay(counts, now);

    // Assert
    expect(next).toEqual({ "2026-10-25": 3 });
    expect(counts).toEqual({ "2026-10-25": 2 });
  });

  it("should start a new day at one", () => {
    // Arrange
    const counts = { "2026-10-24": 4 };

    // Act
    const next = incrementDay(counts, now);

    // Assert
    expect(next).toEqual({ "2026-10-24": 4, "2026-10-25": 1 });
  });

  it("should return the last 7 days oldest first with zero-filled gaps", () => {
    // Arrange
    const counts = { "2026-10-25": 3, "2026-10-23": 2, "2026-10-18": 9 };

    // Act
    const days = lastDays(counts, now, 7);

    // Assert
    expect(days).toEqual([
      { day: "2026-10-19", count: 0 },
      { day: "2026-10-20", count: 0 },
      { day: "2026-10-21", count: 0 },
      { day: "2026-10-22", count: 0 },
      { day: "2026-10-23", count: 2 },
      { day: "2026-10-24", count: 0 },
      { day: "2026-10-25", count: 3 },
    ]);
  });
});
