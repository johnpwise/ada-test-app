import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ColourPickerWidget from "./ColourPickerWidget";
import { COLOUR_PICKER_WIDGET_TEST_IDS } from "./ColourPickerWidget.testIds";

const mockAreaBounds = (area: HTMLElement): void => {
  area.getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect;
};

const renderWidget = () => {
  render(<ColourPickerWidget />);
  const area = screen.getByTestId(COLOUR_PICKER_WIDGET_TEST_IDS.area);
  mockAreaBounds(area);

  return {
    area,
    hex: screen.getByLabelText("Hex colour") as HTMLInputElement,
    hue: screen.getByLabelText("Hue") as HTMLInputElement,
    saturation: screen.getByLabelText("Saturation") as HTMLInputElement,
    brightness: screen.getByLabelText("Brightness") as HTMLInputElement,
    swatch: screen.getByTestId(COLOUR_PICKER_WIDGET_TEST_IDS.swatch),
    rgb: screen.getByTestId(COLOUR_PICKER_WIDGET_TEST_IDS.rgb),
    marker: screen.getByTestId(COLOUR_PICKER_WIDGET_TEST_IDS.marker),
  };
};

describe("ColourPickerWidget", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a region named Colour picker starting on #3B82F6", () => {
    // Arrange

    // Act
    const { hex, swatch, rgb } = renderWidget();

    // Assert
    expect(screen.getByRole("region", { name: "Colour picker" })).toBeInTheDocument();
    expect(hex).toHaveValue("#3B82F6");
    expect(rgb).toHaveTextContent("rgb(59, 130, 246)");
    expect(swatch).toHaveAttribute("data-colour", "#3B82F6");
  });

  it("should change the hue from the Hue slider and update every display", () => {
    // Arrange
    const { hex, hue, swatch, rgb } = renderWidget();

    // Act
    fireEvent.change(hue, { target: { value: "0" } });

    // Assert
    expect(hex).toHaveValue("#F63B3B");
    expect(rgb).toHaveTextContent("rgb(246, 59, 59)");
    expect(swatch).toHaveAttribute("data-colour", "#F63B3B");
  });

  it("should give white from zero saturation and full brightness", () => {
    // Arrange
    const { hex, saturation, brightness, swatch, rgb } = renderWidget();

    // Act
    fireEvent.change(saturation, { target: { value: "0" } });
    fireEvent.change(brightness, { target: { value: "100" } });

    // Assert
    expect(hex).toHaveValue("#FFFFFF");
    expect(rgb).toHaveTextContent("rgb(255, 255, 255)");
    expect(swatch).toHaveAttribute("data-colour", "#FFFFFF");
  });

  it("should expose the sliders with their ranges", () => {
    // Arrange

    // Act
    const { hue, saturation, brightness } = renderWidget();

    // Assert
    expect(hue).toHaveAttribute("type", "range");
    expect(hue).toHaveAttribute("max", "360");
    expect(saturation).toHaveAttribute("type", "range");
    expect(saturation).toHaveAttribute("max", "100");
    expect(brightness).toHaveAttribute("type", "range");
    expect(brightness).toHaveAttribute("max", "100");
  });

  it("should set saturation and brightness from a pointer down in the area", () => {
    // Arrange
    const { area, saturation, brightness, marker } = renderWidget();

    // Act
    fireEvent.pointerDown(area, { clientX: 0, clientY: 0 });

    // Assert
    expect(saturation).toHaveValue("0");
    expect(brightness).toHaveValue("100");
    expect(marker.style.left).toBe("0%");
    expect(marker.style.top).toBe("0%");

    // Act
    fireEvent.pointerDown(area, { clientX: 200, clientY: 100 });

    // Assert
    expect(saturation).toHaveValue("100");
    expect(brightness).toHaveValue("0");

    // Act
    fireEvent.pointerDown(area, { clientX: 100, clientY: 50 });

    // Assert
    expect(saturation).toHaveValue("50");
    expect(brightness).toHaveValue("50");
    expect(marker.style.left).toBe("50%");
    expect(marker.style.top).toBe("50%");
  });

  it("should update the hex, rgb and swatch from the area", () => {
    // Arrange
    const { area, hex, rgb, swatch } = renderWidget();

    // Act
    fireEvent.pointerDown(area, { clientX: 200, clientY: 0 });

    // Assert
    expect(hex).toHaveValue("#0061FF");
    expect(rgb).toHaveTextContent("rgb(0, 97, 255)");
    expect(swatch).toHaveAttribute("data-colour", "#0061FF");
  });

  it("should clamp a pointer outside the area to its edge", () => {
    // Arrange
    const { area, saturation, brightness } = renderWidget();

    // Act
    fireEvent.pointerDown(area, { clientX: 500, clientY: -40 });

    // Assert
    expect(saturation).toHaveValue("100");
    expect(brightness).toHaveValue("100");
  });

  it("should track a drag while pressed and ignore moves after release", () => {
    // Arrange
    const { area, saturation, brightness } = renderWidget();

    // Act
    fireEvent.pointerDown(area, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(area, { clientX: 100, clientY: 50 });

    // Assert
    expect(saturation).toHaveValue("50");
    expect(brightness).toHaveValue("50");

    // Act
    fireEvent.pointerUp(area, { clientX: 100, clientY: 50 });
    fireEvent.pointerMove(area, { clientX: 200, clientY: 100 });

    // Assert
    expect(saturation).toHaveValue("50");
    expect(brightness).toHaveValue("50");
  });

  it("should ignore a pointer move that never started a press", () => {
    // Arrange
    const { area, hex } = renderWidget();

    // Act
    fireEvent.pointerMove(area, { clientX: 0, clientY: 0 });

    // Assert
    expect(hex).toHaveValue("#3B82F6");
  });

  it.each([
    ["ff0000", "#FF0000", "rgb(255, 0, 0)"],
    ["#f00", "#FF0000", "rgb(255, 0, 0)"],
  ])("should set the colour from typed hex %s", (typed, hexColour, rgbText) => {
    // Arrange
    const { hex, hue, saturation, brightness, swatch, rgb } = renderWidget();

    // Act
    fireEvent.change(hex, { target: { value: typed } });

    // Assert
    expect(hex).not.toHaveAttribute("aria-invalid", "true");
    expect(swatch).toHaveAttribute("data-colour", hexColour);
    expect(rgb).toHaveTextContent(rgbText);
    expect(hue).toHaveValue("0");
    expect(saturation).toHaveValue("100");
    expect(brightness).toHaveValue("100");
  });

  it("should keep what was typed while editing and show canonical hex on blur", () => {
    // Arrange
    const { hex } = renderWidget();

    // Act
    fireEvent.change(hex, { target: { value: "ff0000" } });

    // Assert
    expect(hex).toHaveValue("ff0000");

    // Act
    fireEvent.blur(hex);

    // Assert
    expect(hex).toHaveValue("#FF0000");
  });

  it("should mark an invalid hex and keep the current colour", () => {
    // Arrange
    const { hex, swatch, rgb } = renderWidget();

    // Act
    fireEvent.change(hex, { target: { value: "zzz" } });

    // Assert
    expect(hex).toHaveAttribute("aria-invalid", "true");
    expect(swatch).toHaveAttribute("data-colour", "#3B82F6");
    expect(rgb).toHaveTextContent("rgb(59, 130, 246)");
  });

  it("should restore the current colour on blur after an invalid entry", () => {
    // Arrange
    const { hex } = renderWidget();
    fireEvent.change(hex, { target: { value: "zzz" } });

    // Act
    fireEvent.blur(hex);

    // Assert
    expect(hex).toHaveValue("#3B82F6");
    expect(hex).not.toHaveAttribute("aria-invalid", "true");
  });

  it("should clear the invalid state when a valid hex follows an invalid one", () => {
    // Arrange
    const { hex, swatch } = renderWidget();
    fireEvent.change(hex, { target: { value: "zzz" } });

    // Act
    fireEvent.change(hex, { target: { value: "00ff00" } });

    // Assert
    expect(hex).not.toHaveAttribute("aria-invalid", "true");
    expect(swatch).toHaveAttribute("data-colour", "#00FF00");
  });

  it("should keep the hue when saturation is dragged to zero", () => {
    // Arrange
    const { area, hue } = renderWidget();
    const startHue = hue.value;

    // Act
    fireEvent.pointerDown(area, { clientX: 0, clientY: 50 });

    // Assert
    expect(hue).toHaveValue(startHue);
  });

  it("should replace a stale invalid draft when a slider moves", () => {
    // Arrange
    const { hex, hue } = renderWidget();
    fireEvent.change(hex, { target: { value: "zzz" } });

    // Act
    fireEvent.change(hue, { target: { value: "0" } });

    // Assert
    expect(hex).toHaveValue("#F63B3B");
    expect(hex).not.toHaveAttribute("aria-invalid", "true");
  });
});
