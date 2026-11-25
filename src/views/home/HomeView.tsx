import CalendarWidget from "../../components/calendar-widget/CalendarWidget";
import Clock from "../../components/clock/Clock";
import ModeToggle from "../../components/mode-toggle/ModeToggle";
import PageViewsPanel from "../../components/page-views-panel/PageViewsPanel";
import PieChartWidget from "../../components/pie-chart-widget/PieChartWidget";
import ThemePicker from "../../components/theme-picker/ThemePicker";
import TorusWidget from "../../components/torus-widget/TorusWidget";
import { HOME_VIEW_TEST_IDS } from "./HomeView.testIds";

export default function HomeView() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Home View</h1>
        <h3>Your imagination, realised</h3>
        <p className="text-sm text-muted-foreground">
          Sandbox application to showcase ADA
        </p>
      </header>
      <Clock />
      <ModeToggle />
      <ThemePicker />
      <PageViewsPanel />
      <div className="flex items-start gap-4" data-id={HOME_VIEW_TEST_IDS.torusRow}>
        <TorusWidget />
        <TorusWidget color="blue" />
        <PieChartWidget />
      </div>
      <CalendarWidget />
    </section>
  );
}
