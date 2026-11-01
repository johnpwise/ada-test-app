import { describe, expect, it } from "vitest";

import { APP_VERSION } from "./appVersion";

describe("APP_VERSION", () => {
  it("should be a semver-shaped string", () => {
    // Arrange / Act
    const version = APP_VERSION;

    // Assert
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
