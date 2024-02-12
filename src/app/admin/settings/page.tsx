"use client";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link as JoyLink, Typography, useTheme } from "@mui/joy";
import Link from "next/link";

const Settings = () => {
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
          href="/admin/settings"
          sx={{
            textDecoration: "none",
          }}
        >
          Settings
        </JoyLink>
      </Breadcrumbs>

      <Typography component="h1" level="h2">
        Settings
      </Typography>
    </>
  );
};

export default Settings;
