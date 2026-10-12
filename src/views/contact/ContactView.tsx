import { CONTACT_VIEW_TEST_IDS } from "./ContactView.testIds";

export default function ContactView() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold" data-id={CONTACT_VIEW_TEST_IDS.heading}>
        Contact
      </h1>
    </section>
  );
}
