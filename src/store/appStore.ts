import { create } from "zustand";

const DARK_MODE_STORAGE_KEY = "ada-test-app:isDarkMode";
const THEME_STORAGE_KEY = "ada-test-app:theme";
const DEFAULT_THEME = "theme";

interface AppState {
  isDarkMode: boolean;
  theme: string;
  toggleDarkMode: () => void;
  setTheme: (theme: string) => void;
}

function readPersistedBoolean(key: string, fallback: boolean): boolean {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : stored === "true";
  } catch {
    return fallback;
  }
}

function readPersistedString(key: string, fallback: string): string {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : stored;
  } catch {
    return fallback;
  }
}

function persistValue(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore persistence failures (for example, storage disabled).
  }
}

function applyDarkModeSideEffect(isDarkMode: boolean): void {
  document.documentElement.classList.toggle("dark", isDarkMode);
  persistValue(DARK_MODE_STORAGE_KEY, String(isDarkMode));
}

function applyThemeSideEffect(theme: string): void {
  document.documentElement.setAttribute("data-theme", theme);
  persistValue(THEME_STORAGE_KEY, theme);
}

const initialIsDarkMode = readPersistedBoolean(DARK_MODE_STORAGE_KEY, false);
const initialTheme = readPersistedString(THEME_STORAGE_KEY, DEFAULT_THEME);

applyDarkModeSideEffect(initialIsDarkMode);
applyThemeSideEffect(initialTheme);

export const useAppStore = create<AppState>((set, get) => ({
  isDarkMode: initialIsDarkMode,
  theme: initialTheme,
  toggleDarkMode: () => {
    const nextIsDarkMode = !get().isDarkMode;
    applyDarkModeSideEffect(nextIsDarkMode);
    set({ isDarkMode: nextIsDarkMode });
  },
  setTheme: (theme: string) => {
    applyThemeSideEffect(theme);
    set({ theme });
  },
}));
