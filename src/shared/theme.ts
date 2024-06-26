"use client";
import { extendTheme } from "@mui/joy/styles";
import type { PaletteRange } from "@mui/joy/styles";
import { hexToRgba } from "./functions";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    secondary: true;
    accent1: true;
  }

  interface Palette {
    secondary: PaletteRange;
    accent1: PaletteRange;
  }
}

export const theme = extendTheme({
  fontFamily: {
    body: "",
    display: "", //for some reason keeping empty works
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#E6F1FB",
          "100": "#B3D4F5",
          "200": "#80B7EF",
          "300": "#4D9AEA",
          "400": "#267ED7",
          "500": "#267ECE", // Original color
          "600": "#206AB2",
          "700": "#1A5797",
          "800": "#13437B",
          "900": "#0D2F60",
        },
        secondary: {
          "50": "#FFF8E1",
          "100": "#FFEDB3",
          "200": "#FFE180",
          "300": "#FFD54D",
          "400": "#FFCA26",
          "500": "#FFC527", // Original color
          "600": "#E6B322",
          "700": "#CC9F1D",
          "800": "#B38C17",
          "900": "#996A12",

          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: "var(--joy-palette-secondary-400)",
          solidActiveBg: "var(--joy-palette-secondary-600)",
          solidHoverBg: "var(--joy-palette-secondary-600)",
          solidColor: "#222222",
          outlinedBorder: "var(--joy-palette-secondary-400)",
          outlinedColor: "var(--joy-palette-secondary-400)",
          outlinedHoverBg: hexToRgba("#FFCA26", 0.3),
          outlinedActiveBg: "var(--joy-palette-secondary-100)",
          softColor: "var(--joy-palette-secondary-800)",
          softBg: "var(--joy-palette-secondary-100)",
          softActiveBg: "var(--joy-palette-secondary-200)",
          softHoverBg: "var(--joy-palette-secondary-200)",
          plainColor: "var(--joy-palette-secondary-600)",
          plainActiveBg: "var(--joy-palette-secondary-100)",
        },

        accent1: {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#434343",
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

        text: {
          primary: "#222222",
        },

        background: {
          // level1: "#E2F3F6",
          // level2: "#EAF3FB",
          // level3: "#F8F8F8",
        },
      },
    },
  },
});
