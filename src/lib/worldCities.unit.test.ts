import { describe, expect, it } from "vitest";

import { WORLD_CITIES } from "./worldCities";

describe("WORLD_CITIES", () => {
  it("should list a range of major cities", () => {
    // Arrange

    // Act
    const labels = WORLD_CITIES.map((city) => city.label);

    // Assert
    expect(labels).toEqual(expect.arrayContaining(["London", "New York", "Tokyo", "Sydney"]));
  });

  it("should give every city a unique label and a valid IANA time zone", () => {
    // Arrange

    // Act
    const labels = new Set(WORLD_CITIES.map((city) => city.label));
    const timeZonesAreValid = WORLD_CITIES.every(
      (city) => new Intl.DateTimeFormat("en-US", { timeZone: city.timeZone }).resolvedOptions().timeZone !== "",
    );

    // Assert
    expect(labels.size).toBe(WORLD_CITIES.length);
    expect(timeZonesAreValid).toBe(true);
  });
});
