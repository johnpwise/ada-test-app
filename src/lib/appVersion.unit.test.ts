import { describe, expect, it } from "vitest";

import { version as packageVersion } from "../../package.json";
import { APP_VERSION } from "./appVersion";

describe("APP_VERSION", () => {
  it("should be a semver-shaped string", () => {
    // Arrange / Act
    const version = APP_VERSION;

    // Assert
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("should equal the package.json version", () => {
    // Arrange / Act
    const version = APP_VERSION;

    // Assert
    expect(version).toBe(packageVersion);
  });
});
