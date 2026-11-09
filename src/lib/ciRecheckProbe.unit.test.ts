import { describe, expect, it } from "vitest";

// Temporary probe for the Kanban App "Check CI again" live check. CI passes PROBE_FAIL from the repository variable
// CI_PROBE_FAIL; setting that variable to "1" makes this test (and so CI) fail on GitHub Actions only. Inert when unset.
// The app's tsconfig has no Node types, so the environment is read through globalThis rather than `process`.
const runtimeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;

describe("ci recheck probe", () => {
  it("is red only while the CI_PROBE_FAIL repository variable is 1", () => {
    expect(runtimeEnv?.PROBE_FAIL).not.toBe("1");
  });
});
