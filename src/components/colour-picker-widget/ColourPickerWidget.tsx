import { useState } from "react";
import type { ChangeEvent, PointerEvent } from "react";

import { hsvToHex, hsvToRgb, parseHex, rgbToHsv } from "../../lib/colour";
import type { Hsv } from "../../lib/colour";
import { COLOUR_PICKER_WIDGET_TEST_IDS } from "./ColourPickerWidget.testIds";

const INITIAL_COLOUR = parseHex("#3B82F6") ?? { r: 59, g: 130, b: 246 };

const LABEL_CLASS = "block text-sm font-medium text-muted-foreground";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export default function ColourPickerWidget() {
  const [hsv, setHsv] = useState<Hsv>(() =>
    rgbToHsv(INITIAL_COLOUR.r, INITIAL_COLOUR.g, INITIAL_COLOUR.b),
  );
  const [draft, setDraft] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const hex = hsvToHex(hsv.h, hsv.s, hsv.v);
  const { r, g, b } = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const isInvalid = draft !== null && parseHex(draft) === null;

  const update = (next: Partial<Hsv>): void => {
    setHsv((current) => ({ ...current, ...next }));
    setDraft(null);
  };

  const pickFromPointer = (event: PointerEvent<HTMLDivElement>): void => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    update({
      s: clamp(((event.clientX - bounds.left) / bounds.width) * 100, 0, 100),
      v: clamp(100 - ((event.clientY - bounds.top) / bounds.height) * 100, 0, 100),
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pickFromPointer(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (isDragging) {
      pickFromPointer(event);
    }
  };

  const handlePointerUp = (): void => {
    setIsDragging(false);
  };

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setDraft(value);

    const parsed = parseHex(value);
    if (parsed !== null) {
      const next = rgbToHsv(parsed.r, parsed.g, parsed.b);
      setHsv((current) => ({
        // Greys have no hue of their own, so keep the one the user had.
        h: next.s === 0 ? current.h : next.h,
        s: next.s,
        v: next.v,
      }));
    }
  };

  const slider = (
    id: string,
    label: string,
    max: number,
    value: number,
    onChange: (next: number) => void,
    background?: string,
  ) => (
    <div className="space-y-1">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={1}
        value={Math.round(value)}
        style={background === undefined ? undefined : { background }}
        className="block h-3 w-full cursor-pointer rounded-md accent-primary"
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );

  return (
    <section
      aria-label="Colour picker"
      className="max-w-xs space-y-3 rounded-lg border border-border bg-surface p-4"
      data-id={COLOUR_PICKER_WIDGET_TEST_IDS.widget}
    >
      <div
        className="relative h-40 w-full cursor-crosshair touch-none overflow-hidden rounded-md border border-border"
        data-id={COLOUR_PICKER_WIDGET_TEST_IDS.area}
        style={{
          backgroundColor: `hsl(${Math.round(hsv.h)}, 100%, 50%)`,
          backgroundImage:
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          data-id={COLOUR_PICKER_WIDGET_TEST_IDS.marker}
          style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }}
        />
      </div>
      {slider(
        "colour-picker-hue",
        "Hue",
        360,
        hsv.h,
        (h) => update({ h }),
        "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
      )}
      {slider("colour-picker-saturation", "Saturation", 100, hsv.s, (s) => update({ s }))}
      {slider("colour-picker-brightness", "Brightness", 100, hsv.v, (v) => update({ v }))}
      <div className="flex items-end gap-3">
        <div
          role="img"
          aria-label={`Selected colour ${hex}`}
          className="h-10 w-10 shrink-0 rounded-md border border-border"
          data-colour={hex}
          data-id={COLOUR_PICKER_WIDGET_TEST_IDS.swatch}
          style={{ backgroundColor: hex }}
        />
        <div className="min-w-0 flex-1 space-y-1">
          <label htmlFor="colour-picker-hex" className={LABEL_CLASS}>
            Hex colour
          </label>
          <input
            id="colour-picker-hex"
            type="text"
            value={draft ?? hex}
            aria-invalid={isInvalid ? "true" : undefined}
            spellCheck={false}
            autoComplete="off"
            className={`block w-full rounded-md border bg-surface px-3 py-1 font-mono text-surface-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isInvalid ? "border-red-600" : "border-border"
            }`}
            onChange={handleHexChange}
            onBlur={() => setDraft(null)}
          />
        </div>
      </div>
      <p
        className="font-mono text-sm text-surface-foreground"
        data-id={COLOUR_PICKER_WIDGET_TEST_IDS.rgb}
      >
        {`rgb(${r}, ${g}, ${b})`}
      </p>
    </section>
  );
}
