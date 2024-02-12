"use client";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Link as JoyLink,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";

export default function AdminPanel() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
      }}
    ></Box>
  );
}
