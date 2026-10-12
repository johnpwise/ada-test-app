import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import AboutView from "./AboutView";
import { ABOUT_VIEW_TEST_IDS } from "./AboutView.testIds";

describe("AboutView", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the About heading", () => {
    // Arrange

    // Act
    render(<AboutView />);

    // Assert
    expect(screen.getByTestId(ABOUT_VIEW_TEST_IDS.heading)).toHaveTextContent("About");
  });
});
