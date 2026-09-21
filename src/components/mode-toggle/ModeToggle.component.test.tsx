import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { useAppStore } from "../../store/appStore";
import ModeToggle from "./ModeToggle";
import { MODE_TOGGLE_TEST_IDS } from "./ModeToggle.testIds";

describe("ModeToggle", () => {
  beforeEach(() => {
    // Arrange
    document.documentElement.classList.remove("dark");
    useAppStore.setState({ isDarkMode: false, theme: "theme" });
  });

  afterEach(() => {
    cleanup();
    document.documentElement.classList.remove("dark");
  });

  it("should render the light mode label and themed surface/control classes by default", () => {
    // Arrange

    // Act
    const { container } = render(<ModeToggle />);

    // Assert
    const label = screen.getByTestId(MODE_TOGGLE_TEST_IDS.label);
    expect(label).toHaveTextContent("Mode is light");

    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-surface");
    expect(section?.className).toContain("border-border");

    const button = screen.getByTestId(MODE_TOGGLE_TEST_IDS.button);
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-primary-foreground");
  });

  it("should toggle from light to dark mode when the button is clicked", () => {
    // Arrange
    render(<ModeToggle />);
    const button = screen.getByTestId(MODE_TOGGLE_TEST_IDS.button);

    // Act
    fireEvent.click(button);

    // Assert
    const label = screen.getByTestId(MODE_TOGGLE_TEST_IDS.label);
    expect(label).toHaveTextContent("Mode is dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
