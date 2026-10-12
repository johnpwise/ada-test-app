import { ABOUT_VIEW_TEST_IDS } from "./AboutView.testIds";

export default function AboutView() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold" data-id={ABOUT_VIEW_TEST_IDS.heading}>
        About
      </h1>
    </section>
  );
}
