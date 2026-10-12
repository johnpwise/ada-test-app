import { NavLink } from "react-router-dom";

import { NAVBAR_TEST_IDS } from "./Navbar.testIds";

const LINK_CLASS_NAME =
  "rounded-md px-3 py-2 text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground";

export default function Navbar() {
  return (
    <nav
      aria-label="Main"
      className="border-b border-border bg-background text-foreground"
      data-id={NAVBAR_TEST_IDS.nav}
    >
      <ul className="mx-auto flex w-full max-w-3xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <li>
          <NavLink to="/" end className={LINK_CLASS_NAME} data-id={NAVBAR_TEST_IDS.homeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={LINK_CLASS_NAME} data-id={NAVBAR_TEST_IDS.aboutLink}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={LINK_CLASS_NAME} data-id={NAVBAR_TEST_IDS.contactLink}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
