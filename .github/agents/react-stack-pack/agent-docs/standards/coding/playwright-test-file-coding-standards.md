# react-playwright-test-file-policy.md

## Purpose

This document defines formatting and structure standards for Playwright test files in React-based
repos that inherit this stack pack. Playwright is the browser/E2E testing framework for this stack.

Repo overlays should keep only facts and exceptions.

## Formatting Baseline

## Existing test preservation

- treat the file's current assertions as a regression contract unless the intended behavior is explicitly changing
- do not weaken or delete an existing assertion merely to make a new implementation pass
- prefer adding new test cases for new behavior over rewriting existing ones
- if an existing test must change, keep the replacement focused on the same intended behavior and update it only as much as the contract change requires

### File scope

- each Playwright spec file should target one user-visible flow or behavior contract
- keep test setup in-file unless it is shared by 2+ spec files; promote shared setup to a fixture
- avoid unrelated helper logic in the spec file; move reusable setup to a support or fixture module

### Import layout

- order imports as: `@playwright/test` (`test`, `expect`, fixtures), app-owned test ID constants, local fixtures/support modules, local test data/builders
- keep one import per line and group blocks with a single blank line

### Test structure

- one top-level `test.describe("<flow or page>")` block per file
- use `test("should ...")` phrasing for test names
- keep each test in Arrange-Act-Assert order with clear visual separation via blank lines
- require explicit AAA comment headers in every test: `// Arrange`, `// Act`, `// Assert`
- keep AAA blocks in strict order with no interleaving of actions and assertions
- separate AAA blocks with exactly one blank line between sections
- test names should communicate scenario and expected outcome
- prefer deterministic setup in `// Arrange` and keep navigation/interactions in `// Act`

Canonical pattern:

```ts
import { expect, test } from "@playwright/test";

import { APP_SHELL_TEST_IDS } from "../src/app/appShell.testIds";

test.describe("app shell", () => {
  test("should render app shell", async ({ page }) => {
    // Arrange

    // Act
    await page.goto("/");

    // Assert
    await expect(page.getByTestId(APP_SHELL_TEST_IDS.shell)).toBeVisible();
  });
});
```

## Locator hierarchy

Prefer locators in this order, matching the accessibility-first review lens:

1. **Role/accessible-name locators** (`page.getByRole("button", { name: "Subscribe" })`).
2. **Stable test IDs** (`page.getByTestId(...)`) for elements without a stable accessible role/name or where similar controls need disambiguation.
3. **Label/text locators** (`getByLabel`, `getByText`) when text is part of the contract.
4. **CSS or XPath selectors** — avoid. If no semantic or test-ID locator fits, add an app-owned `data-id` selector.

### Stable test IDs (`data-id`)

This repository's stable-selector convention is `data-id`, not Playwright's default `data-testid`.
Configure Playwright accordingly:

```ts
use: {
  testIdAttribute: "data-id",
},
```

With this set, `page.getByTestId(APP_SHELL_TEST_IDS.shell)` resolves the app-owned `data-id` value.
Import selectors from the same colocated `*_TEST_IDS` constants the component-test layer uses;
never hard-code a `data-id` string in a spec file.

## Waiting and assertion discipline

- use Playwright's built-in auto-waiting and web-first assertions (`await expect(locator)...`)
- do not use arbitrary sleeps (`page.waitForTimeout(...)`) for synchronization; wait on a locator state, network response, URL, or text assertion
- prefer `await expect(locator).toBeVisible()` / `.toHaveText(...)` / `.toHaveURL(...)` over bare boolean checks
- keep one primary assertion per test; tightly related follow-up assertions are allowed only when they validate the same behavior

## Deterministic setup and test isolation

- each test creates the state it needs; do not depend on execution order between tests or files
- prefer Playwright's fresh browser context per test over manual clean-up; do not share mutable state via module-level variables
- seed data explicitly in `// Arrange` via a fixture or API call rather than assuming prior state
- keep specs independent of run order and safe to run in parallel (`fullyParallel: true`)

## Fixtures and authentication

- use Playwright fixtures (`test.extend`) for setup shared across multiple spec files; keep them narrowly scoped
- for authenticated flows, use Playwright's storage-state pattern rather than logging in through the UI for every test
- document the concrete authentication mechanism in the repo-local overlay once the project has real authentication; the baseline bootstrap has none

## Page Object usage policy

This stack pack does not mandate a Page Object Model. Prefer small, focused React SPA specs using
locators and fixtures directly. If flow complexity genuinely justifies a Page Object layer, introduce
it deliberately in a repo-local overlay and keep it behavior-oriented rather than a locator wrapper.

## Failure diagnostics

- `trace: "on-first-retry"` and `screenshot: "only-on-failure"` are the baseline so failed runs have diagnostics without committing green-run artifacts
- inspect a trace with `npx playwright show-trace <path>` before re-running blindly
- do not disable diagnostics merely to shorten CI logs

## Accessibility-aware interaction

- interact as a user would with `locator.click()`, `locator.fill()`, or `locator.press("Enter")`, not `page.evaluate(...)`
- prefer role/accessible-name locators where stable; needing a CSS class is a signal to improve the accessible name or add an app-owned test ID
- assert user-perceivable state rather than internal implementation details

## Avoiding assertion duplication

Playwright specs prove full user journeys, routing, and real browser behavior. Keep E2E assertions
focused on what requires the browser; do not re-prove a pure function's branches or schema edge cases
already covered at the unit layer.

## Quality gate alignment

- test files must satisfy lint and type-check gates
- changes should preserve test readability under standard formatter output
- keep diffs scoped to the user-visible behavior being validated
