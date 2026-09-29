import { expect, test } from "@playwright/test";

import { APP_SHELL_TEST_IDS } from "../src/app/appShell.testIds";
import { MODE_TOGGLE_TEST_IDS } from "../src/components/mode-toggle/ModeToggle.testIds";

test.describe("app shell theming", () => {
  test("should render the app shell with baseline themed classes", async ({ page }) => {
    // Arrange
    const appShell = page.getByTestId(APP_SHELL_TEST_IDS.shell);

    // Act
    await page.goto("/");

    // Assert
    await expect(appShell).toBeVisible();
    await expect(appShell).toHaveClass(/\bmin-h-screen\b/);
    await expect(appShell).toHaveClass(/\bbg-background\b/);
    await expect(appShell).toHaveClass(/\btext-foreground\b/);
  });

  test("should toggle mode from light to dark", async ({ page }) => {
    // Arrange
    await page.goto("/");
    const modeLabel = page.getByTestId(MODE_TOGGLE_TEST_IDS.label);
    const toggleButton = page.getByRole("button", { name: "Toggle Mode" });
    await expect(modeLabel).toContainText("Mode is light");
    await expect(toggleButton).toHaveClass(/\bbg-primary\b/);

    // Act
    await toggleButton.click();

    // Assert
    await expect(modeLabel).toContainText("Mode is dark");
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  });

  test("should change theme from the default preset to a selected preset", async ({ page }) => {
    // Arrange
    await page.goto("/");
    const themeSelect = page.getByRole("combobox", { name: "Theme" });
    await expect(themeSelect).toHaveClass(/\bbg-surface\b/);

    // Act
    await themeSelect.selectOption("theme-ocean");

    // Assert
    await expect(themeSelect).toHaveValue("theme-ocean");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "theme-ocean");
  });
});
