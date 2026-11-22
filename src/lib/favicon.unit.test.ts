import { describe, expect, it } from "vitest";

import indexHtml from "../../index.html?raw";
import faviconSvg from "../../public/favicon.svg?raw";

describe("favicon", () => {
  it("should link the SVG favicon from index.html", () => {
    // Arrange / Act
    const iconLink = indexHtml.match(/<link\s+rel="icon"[^>]*>/)?.[0];

    // Assert
    expect(iconLink).toContain('type="image/svg+xml"');
    expect(iconLink).toContain('href="/favicon.svg"');
  });

  it("should no longer reference the default Vite logo", () => {
    // Arrange / Act
    const html = indexHtml;

    // Assert
    expect(html).not.toContain("vite.svg");
  });

  it("should provide a valid SVG document", () => {
    // Arrange / Act
    const svg = faviconSvg.trim();

    // Assert
    expect(svg).toMatch(/^<svg[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    expect(svg).toMatch(/<\/svg>$/);
  });
});
