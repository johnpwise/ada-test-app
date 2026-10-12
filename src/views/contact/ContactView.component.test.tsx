import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import ContactView from "./ContactView";
import { CONTACT_VIEW_TEST_IDS } from "./ContactView.testIds";

describe("ContactView", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the Contact heading", () => {
    // Arrange

    // Act
    render(<ContactView />);

    // Assert
    expect(screen.getByTestId(CONTACT_VIEW_TEST_IDS.heading)).toHaveTextContent("Contact");
  });
});
