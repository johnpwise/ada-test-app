import { describe, expect, it } from "vitest";

import { buildMonthGrid, formatSelectedDate } from "./calendarMonth";

const countDays = (grid: (number | null)[][]): number =>
  grid.flat().filter((cell) => cell !== null).length;

describe("buildMonthGrid", () => {
  it("should return rows of seven cells", () => {
    // Arrange

    // Act
    const grid = buildMonthGrid(2026, 10);

    // Assert
    expect(grid.length).toBeGreaterThanOrEqual(4);
    expect(grid.every((week) => week.length === 7)).toBe(true);
  });

  it("should put the first day under the right weekday with leading blanks", () => {
    // Arrange

    // Act
    const grid = buildMonthGrid(2026, 10);

    // Assert
    expect(grid[0]).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should leave leading blanks when the month starts mid week", () => {
    // Arrange

    // Act
    const grid = buildMonthGrid(2026, 11);

    // Assert
    expect(grid[0]).toEqual([null, null, 1, 2, 3, 4, 5]);
  });

  it("should fill the last week with trailing blanks", () => {
    // Arrange

    // Act
    const grid = buildMonthGrid(2026, 11);

    // Assert
    expect(grid[grid.length - 1]).toEqual([27, 28, 29, 30, 31, null, null]);
  });

  it("should contain every day of 30 and 31 day months", () => {
    // Arrange

    // Act
    const thirty = buildMonthGrid(2026, 3);
    const thirtyOne = buildMonthGrid(2026, 0);

    // Assert
    expect(countDays(thirty)).toBe(30);
    expect(countDays(thirtyOne)).toBe(31);
  });

  it("should handle February in leap and non leap years", () => {
    // Arrange

    // Act
    const leap = buildMonthGrid(2024, 1);
    const common = buildMonthGrid(2026, 1);

    // Assert
    expect(countDays(leap)).toBe(29);
    expect(countDays(common)).toBe(28);
  });
});

describe("formatSelectedDate", () => {
  it("should format a date as an en-US long label", () => {
    // Arrange
    const date = new Date(2026, 10, 25);

    // Act
    const result = formatSelectedDate(date);

    // Assert
    expect(result).toBe("Wednesday, November 25, 2026");
  });
});
