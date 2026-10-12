import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";
import { NAVBAR_TEST_IDS } from "./Navbar.testIds";

describe("Navbar", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a Home link to the root route", () => {
    // Arrange

    // Act
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert
    const link = screen.getByTestId(NAVBAR_TEST_IDS.homeLink);
    expect(link).toHaveTextContent("Home");
    expect(link).toHaveAttribute("href", "/");
  });

  it("should render an About link to the about route", () => {
    // Arrange

    // Act
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert
    const link = screen.getByTestId(NAVBAR_TEST_IDS.aboutLink);
    expect(link).toHaveTextContent("About");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("should render a Contact link to the contact route", () => {
    // Arrange

    // Act
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert
    const link = screen.getByTestId(NAVBAR_TEST_IDS.contactLink);
    expect(link).toHaveTextContent("Contact");
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("should mark the link for the current route as the current page", () => {
    // Arrange

    // Act
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Navbar />
      </MemoryRouter>,
    );

    // Assert
    expect(screen.getByTestId(NAVBAR_TEST_IDS.aboutLink)).toHaveAttribute("aria-current", "page");
  });
});
