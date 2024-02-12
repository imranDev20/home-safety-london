"use client";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link as JoyLink, useTheme } from "@mui/joy";
import Link from "next/link";

export default function Notifications() {
  const theme = useTheme();

  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={<KeyboardArrowRight fontSize="md" />}
      >
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          <Home />
        </JoyLink>
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/notifications"
          sx={{
            textDecoration: "none",
          }}
        >
          Notifications
        </JoyLink>
      </Breadcrumbs>
    </>
  );
}
