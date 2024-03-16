"use client";
import { extendTheme } from "@mui/joy/styles";

import type { PaletteRange } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    secondary: true;
  }

  interface Palette {
    secondary: PaletteRange;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#e0f2f1",
          "100": "#b2dfdb",
          "200": "#80cbc4",
          "300": "#4db6ac",
          "400": "#26a69a",
          "500": "#009688",
          "600": "#00897b",
          "700": "#00796b",
          "800": "#00695c",
          "900": "#004d40",
        },
        secondary: {
          // Credit:
          // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12",

          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: "var(--joy-palette-secondary-400)",
          solidActiveBg: "var(--joy-palette-secondary-500)",
          outlinedBorder: "var(--joy-palette-secondary-500)",
          outlinedColor: "var(--joy-palette-secondary-700)",
          outlinedActiveBg: "var(--joy-palette-secondary-100)",
          softColor: "var(--joy-palette-secondary-800)",
          softBg: "var(--joy-palette-secondary-200)",
          softActiveBg: "var(--joy-palette-secondary-300)",
          plainColor: "var(--joy-palette-secondary-600)",
          plainActiveBg: "var(--joy-palette-secondary-100)",
        },
      },
    },
  },
});
