import ModeToggle from "../../components/mode-toggle/ModeToggle";
import ThemePicker from "../../components/theme-picker/ThemePicker";
import { HOME_VIEW_TEST_IDS } from "./HomeView.testIds";

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
      <ModeToggle />
      <ThemePicker />
      <div
        aria-label="Red bordered square"
        className="mx-auto flex size-[200px] items-center justify-center rounded-[10px] border-2 border-red-500 text-[8px]"
        data-id={HOME_VIEW_TEST_IDS.redBorderedSquare}
      >
        ADA plugin test
      </div>
    </section>
  );
}
