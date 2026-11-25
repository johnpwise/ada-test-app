import { describe, expect, it } from "vitest";

import { hsvToHex, hsvToRgb, parseHex, rgbToHex, rgbToHsv } from "./colour";

describe("colour", () => {
  describe("hsvToRgb", () => {
    it.each([
      [0, 100, 100, { r: 255, g: 0, b: 0 }],
      [120, 100, 100, { r: 0, g: 255, b: 0 }],
      [240, 100, 100, { r: 0, g: 0, b: 255 }],
      [0, 0, 100, { r: 255, g: 255, b: 255 }],
      [200, 50, 0, { r: 0, g: 0, b: 0 }],
      [180, 50, 50, { r: 64, g: 128, b: 128 }],
    ])("should convert hsv(%d, %d, %d) to the matching rgb", (h, s, v, expected) => {
      // Arrange

      // Act
      const rgb = hsvToRgb(h, s, v);

      // Assert
      expect(rgb).toEqual(expected);
    });
  });

  describe("rgbToHsv", () => {
    it.each([
      [{ r: 255, g: 0, b: 0 }, { h: 0, s: 100, v: 100 }],
      [{ r: 0, g: 255, b: 0 }, { h: 120, s: 100, v: 100 }],
      [{ r: 0, g: 0, b: 255 }, { h: 240, s: 100, v: 100 }],
      [{ r: 255, g: 255, b: 255 }, { h: 0, s: 0, v: 100 }],
      [{ r: 0, g: 0, b: 0 }, { h: 0, s: 0, v: 0 }],
      [{ r: 128, g: 128, b: 128 }, { h: 0, s: 0, v: 50.2 }],
    ])("should convert %j to the matching hsv", ({ r, g, b }, expected) => {
      // Arrange

      // Act
      const hsv = rgbToHsv(r, g, b);

      // Assert
      expect(hsv.h).toBeCloseTo(expected.h, 1);
      expect(hsv.s).toBeCloseTo(expected.s, 1);
      expect(hsv.v).toBeCloseTo(expected.v, 1);
    });

    it("should round-trip a mid value back to the same rgb", () => {
      // Arrange
      const { h, s, v } = rgbToHsv(59, 130, 246);

      // Act
      const rgb = hsvToRgb(h, s, v);

      // Assert
      expect(rgb).toEqual({ r: 59, g: 130, b: 246 });
    });
  });

  describe("rgbToHex", () => {
    it("should give upper-case 6-digit hex with zero padding", () => {
      // Arrange

      // Act
      const hex = rgbToHex(1, 171, 15);

      // Assert
      expect(hex).toBe("#01AB0F");
    });
  });

  describe("hsvToHex", () => {
    it("should give the hex of the matching colour", () => {
      // Arrange

      // Act
      const hex = hsvToHex(217.2, 76, 96.5);

      // Assert
      expect(hex).toBe("#3B82F6");
    });
  });

  describe("parseHex", () => {
    it.each([
      ["#3b82f6", { r: 59, g: 130, b: 246 }],
      ["3B82F6", { r: 59, g: 130, b: 246 }],
      ["#fff", { r: 255, g: 255, b: 255 }],
      ["f00", { r: 255, g: 0, b: 0 }],
    ])("should accept %s", (input, expected) => {
      // Arrange

      // Act
      const rgb = parseHex(input);

      // Assert
      expect(rgb).toEqual(expected);
    });

    it.each(["", "#", "#12", "#12345", "GGGGGG", "#1234567", "12 456"])(
      "should reject %j",
      (input) => {
        // Arrange

        // Act
        const rgb = parseHex(input);

        // Assert
        expect(rgb).toBeNull();
      },
    );
  });
});
