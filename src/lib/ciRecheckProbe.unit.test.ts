import { describe, expect, it } from "vitest";

// Temporary probe for the Kanban App "Check CI again" live check. CI passes PROBE_FAIL from the repository variable
// CI_PROBE_FAIL; setting that variable to "1" makes this test (and so CI) fail on GitHub Actions only. Inert when unset.
describe("ci recheck probe", () => {
  it("is red only while the CI_PROBE_FAIL repository variable is 1", () => {
    expect(process.env.PROBE_FAIL).not.toBe("1");
  });
});
