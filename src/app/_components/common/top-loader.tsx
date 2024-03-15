"use client";
import { useTheme } from "@mui/joy/styles";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function TopLoader() {
  const theme = useTheme();
  return (
    <NextTopLoader
      color={theme.colorSchemes.light.palette.primary[100]}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${theme.colorSchemes.light.palette.primary[100]},0 0 5px ${theme.colorSchemes.light.palette.primary[100]}`}
    />
  );
}
