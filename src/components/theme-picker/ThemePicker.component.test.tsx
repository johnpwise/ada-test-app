import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { useAppStore } from "../../store/appStore";
import ThemePicker from "./ThemePicker";
import { THEME_PICKER_TEST_IDS } from "./ThemePicker.testIds";

describe("ThemePicker", () => {
  beforeEach(() => {
    // Arrange
    document.documentElement.removeAttribute("data-theme");
    useAppStore.setState({ isDarkMode: false, theme: "theme" });
  });

  afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
  });

  it("should render the default theme selected with themed surface/select classes", () => {
    // Arrange

    // Act
    const { container } = render(<ThemePicker />);

    // Assert
    const select = screen.getByTestId(THEME_PICKER_TEST_IDS.select) as HTMLSelectElement;
    expect(select.value).toBe("theme");
    expect(select.className).toContain("bg-surface");
    expect(select.className).toContain("border-border");
    expect(select.className).toContain("text-surface-foreground");

    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-surface");
    expect(section?.className).toContain("border-border");
  });

  it("should update the theme and apply data-theme when a non-default option is selected", () => {
    // Arrange
    render(<ThemePicker />);
    const select = screen.getByTestId(THEME_PICKER_TEST_IDS.select) as HTMLSelectElement;

    // Act
    fireEvent.change(select, { target: { value: "theme-ocean" } });

    // Assert
    expect(select.value).toBe("theme-ocean");
    expect(document.documentElement.getAttribute("data-theme")).toBe("theme-ocean");
  });
});
