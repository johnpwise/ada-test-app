import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { toDayKey } from "../lib/pageViews";

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

  it("should record one page view for today on load and persist it", async () => {
    // Arrange
    const today = toDayKey(Date.now());

    // Act
    const { useAppStore } = await import("../store/appStore");

    // Assert
    expect(useAppStore.getState().pageViewsByDay).toEqual({ [today]: 1 });
    expect(JSON.parse(localStorage.getItem("ada-test-app:pageViewsByDay") ?? "{}")).toEqual({
      [today]: 1,
    });
  });

  it("should add to persisted page view counts on load", async () => {
    // Arrange
    const today = toDayKey(Date.now());
    localStorage.setItem(
      "ada-test-app:pageViewsByDay",
      JSON.stringify({ "2026-01-01": 5, [today]: 2 }),
    );

    // Act
    const { useAppStore } = await import("../store/appStore");

    // Assert
    expect(useAppStore.getState().pageViewsByDay).toEqual({ "2026-01-01": 5, [today]: 3 });
  });

  it("should ignore corrupt persisted page view counts", async () => {
    // Arrange
    const today = toDayKey(Date.now());
    localStorage.setItem("ada-test-app:pageViewsByDay", "not json");

    // Act
    const { useAppStore } = await import("../store/appStore");

    // Assert
    expect(useAppStore.getState().pageViewsByDay).toEqual({ [today]: 1 });
  });
});
