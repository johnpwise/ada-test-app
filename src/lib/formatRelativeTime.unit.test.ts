import { describe, expect, it } from "vitest";

import { formatRelativeTime } from "./formatRelativeTime";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("formatRelativeTime", () => {
  it("should return just now when under a minute has passed", () => {
    // Arrange
    const now = 1_000_000_000;

    // Act
    const result = formatRelativeTime(now - 59_000, now);

    // Assert
    expect(result).toBe("just now");
  });

  it("should return just now when the timestamp is in the future", () => {
    // Arrange
    const now = 1_000_000_000;

    // Act
    const result = formatRelativeTime(now + MINUTE, now);

    // Assert
    expect(result).toBe("just now");
  });

  it("should return minutes when under an hour has passed", () => {
    // Arrange
    const now = 1_000_000_000;

    // Act
    const result = formatRelativeTime(now - 5 * MINUTE - 30_000, now);

    // Assert
    expect(result).toBe("5 min ago");
  });

  it("should return hours when under a day has passed", () => {
    // Arrange
    const now = 1_000_000_000;

    // Act
    const result = formatRelativeTime(now - 3 * HOUR, now);

    // Assert
    expect(result).toBe("3 h ago");
  });

  it("should return days when a day or more has passed", () => {
    // Arrange
    const now = 1_000_000_000;

    // Act
    const result = formatRelativeTime(now - 2 * DAY, now);

    // Assert
    expect(result).toBe("2 d ago");
  });
});
