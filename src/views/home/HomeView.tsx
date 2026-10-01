import ModeToggle from "../../components/mode-toggle/ModeToggle";
import ThemePicker from "../../components/theme-picker/ThemePicker";

export default function HomeView() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Home View</h1>
        <h3>Hello Bob</h3>
        <p className="text-sm text-muted-foreground">
          Configure your theme and color mode preferences.
        </p>
      </header>
      <ModeToggle />
      <ThemePicker />
    </section>
  );
}
