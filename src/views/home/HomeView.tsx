import Clock from "../../components/clock/Clock";
import ModeToggle from "../../components/mode-toggle/ModeToggle";
import PageViewsPanel from "../../components/page-views-panel/PageViewsPanel";
import ThemePicker from "../../components/theme-picker/ThemePicker";
import TorusWidget from "../../components/torus-widget/TorusWidget";

export default function HomeView() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Home View</h1>
        <h3>Hello Nick</h3>
        <p className="text-sm text-muted-foreground">
          Configure your theme and color mode preferences.
        </p>
      </header>
      <Clock />
      <ModeToggle />
      <ThemePicker />
      <PageViewsPanel />
      <TorusWidget />
      <TorusWidget color="red" />
    </section>
  );
}
