export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsv {
  h: number;
  s: number;
  v: number;
}

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const hsvToRgb = (h: number, s: number, v: number): Rgb => {
  const saturation = s / 100;
  const value = v / 100;
  const chroma = value * saturation;
  const sector = (((h % 360) + 360) % 360) / 60;
  const x = chroma * (1 - Math.abs((sector % 2) - 1));
  const m = value - chroma;

  const [r, g, b] =
    sector < 1
      ? [chroma, x, 0]
      : sector < 2
        ? [x, chroma, 0]
        : sector < 3
          ? [0, chroma, x]
          : sector < 4
            ? [0, x, chroma]
            : sector < 5
              ? [x, 0, chroma]
              : [chroma, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

export const rgbToHsv = (r: number, g: number, b: number): Hsv => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const delta = max - Math.min(red, green, blue);

  let h = 0;
  if (delta !== 0) {
    if (max === red) {
      h = 60 * (((green - blue) / delta + 6) % 6);
    } else if (max === green) {
      h = 60 * ((blue - red) / delta + 2);
    } else {
      h = 60 * ((red - green) / delta + 4);
    }
  }

  return { h, s: max === 0 ? 0 : (delta / max) * 100, v: max * 100 };
};

const toHexPair = (channel: number): string =>
  channel.toString(16).toUpperCase().padStart(2, "0");

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`;

export const hsvToHex = (h: number, s: number, v: number): string => {
  const { r, g, b } = hsvToRgb(h, s, v);

  return rgbToHex(r, g, b);
};

export const parseHex = (input: string): Rgb | null => {
  const match = HEX_PATTERN.exec(input.trim());
  if (match === null) {
    return null;
  }

  const digits =
    match[1].length === 3
      ? [...match[1]].map((digit) => digit + digit).join("")
      : match[1];

  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16),
  };
};
