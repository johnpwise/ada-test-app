import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("appStore", () => {
  beforeEach(() => {
    // Arrange
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
    vi.resetModules();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
  });

  it("should default to light mode and the default theme when nothing is persisted", async () => {
    // Arrange

    // Act
    const { useAppStore } = await import("../store/appStore");

    // Assert
    expect(useAppStore.getState().isDarkMode).toBe(false);
    expect(useAppStore.getState().theme).toBe("theme");
  });

  it("should initialize from persisted localStorage values on load", async () => {
    // Arrange
    localStorage.setItem("ada-test-app:isDarkMode", "true");
    localStorage.setItem("ada-test-app:theme", "theme-ocean");

    // Act
    const { useAppStore } = await import("../store/appStore");

    // Assert
    expect(useAppStore.getState().isDarkMode).toBe(true);
    expect(useAppStore.getState().theme).toBe("theme-ocean");
  });

  it("should toggle dark mode, apply the dark class, and persist the value", async () => {
    // Arrange
    const { useAppStore } = await import("../store/appStore");

    // Act
    useAppStore.getState().toggleDarkMode();

    // Assert
    expect(useAppStore.getState().isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("ada-test-app:isDarkMode")).toBe("true");

    // Act
    useAppStore.getState().toggleDarkMode();

    // Assert
    expect(useAppStore.getState().isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("ada-test-app:isDarkMode")).toBe("false");
  });

  it("should update the theme, apply data-theme on the root element, and persist the value", async () => {
    // Arrange
    const { useAppStore } = await import("../store/appStore");

    // Act
    useAppStore.getState().setTheme("theme-harvest");

    // Assert
    expect(useAppStore.getState().theme).toBe("theme-harvest");
    expect(document.documentElement.getAttribute("data-theme")).toBe("theme-harvest");
    expect(localStorage.getItem("ada-test-app:theme")).toBe("theme-harvest");
  });
});
