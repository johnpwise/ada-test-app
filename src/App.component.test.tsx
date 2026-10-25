import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { routes } from "./router";
import { ABOUT_VIEW_TEST_IDS } from "./views/about/AboutView.testIds";
import { CONTACT_VIEW_TEST_IDS } from "./views/contact/ContactView.testIds";
import { HOME_VIEW_TEST_IDS } from "./views/home/HomeView.testIds";
import { APP_SHELL_TEST_IDS } from "./app/appShell.testIds";
import { NAVBAR_TEST_IDS } from "./components/navbar/Navbar.testIds";
import { LAST_UPDATED_FOOTER_TEST_IDS } from "./components/last-updated-footer/LastUpdatedFooter.testIds";

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the navbar above the routed content", () => {
    // Arrange
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    const navbar = screen.getByTestId(NAVBAR_TEST_IDS.nav);
    const shell = screen.getByTestId(APP_SHELL_TEST_IDS.shell);
    expect(navbar.compareDocumentPosition(shell) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("should render the last updated footer after the routed content", () => {
    // Arrange
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    const shell = screen.getByTestId(APP_SHELL_TEST_IDS.shell);
    const footer = screen.getByTestId(LAST_UPDATED_FOOTER_TEST_IDS.footer);
    expect(shell.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(footer).toHaveTextContent("Last updated just now");
  });

  it("should render the HomeView at the root route", () => {
    // Arrange
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    expect(screen.getByTestId(HOME_VIEW_TEST_IDS.redBorderedSquare)).toBeInTheDocument();
  });

  it("should render the AboutView at the about route", () => {
    // Arrange
    const router = createMemoryRouter(routes, { initialEntries: ["/about"] });

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    expect(screen.getByTestId(ABOUT_VIEW_TEST_IDS.heading)).toBeInTheDocument();
  });

  it("should render the ContactView at the contact route", () => {
    // Arrange
    const router = createMemoryRouter(routes, { initialEntries: ["/contact"] });

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    expect(screen.getByTestId(CONTACT_VIEW_TEST_IDS.heading)).toBeInTheDocument();
  });

  it("should navigate back to the HomeView when the Home link is clicked", async () => {
    // Arrange
    const router = createMemoryRouter(routes, { initialEntries: ["/about"] });
    render(<RouterProvider router={router} />);

    // Act
    fireEvent.click(screen.getByTestId(NAVBAR_TEST_IDS.homeLink));

    // Assert
    expect(await screen.findByTestId(HOME_VIEW_TEST_IDS.redBorderedSquare)).toBeInTheDocument();
  });
});
