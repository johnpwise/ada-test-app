import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import HomeView from "./HomeView";
import { HOME_VIEW_TEST_IDS } from "./HomeView.testIds";

describe("HomeView", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the ADA plugin test text inside the red bordered square", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const square = screen.getByTestId(HOME_VIEW_TEST_IDS.redBorderedSquare);
    expect(square).toHaveTextContent("ADA plugin test");
  });

  it("should center the text horizontally and vertically within the red bordered square", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const square = screen.getByTestId(HOME_VIEW_TEST_IDS.redBorderedSquare);
    expect(square.className).toContain("flex");
    expect(square.className).toContain("items-center");
    expect(square.className).toContain("justify-center");
  });

  it("should size the text at 8px", () => {
    // Arrange

    // Act
    render(<HomeView />);

    // Assert
    const square = screen.getByTestId(HOME_VIEW_TEST_IDS.redBorderedSquare);
    expect(square.className).toContain("text-[8px]");
  });
});
