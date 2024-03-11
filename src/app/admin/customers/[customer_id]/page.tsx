"use client";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, useTheme, Link as JoyLink, Typography } from "@mui/joy";
import Link from "next/link";
import React from "react";

const SingleCustomer = () => {
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
          href="/admin/customers"
          sx={{
            textDecoration: "none",
          }}
        >
          Customers
        </JoyLink>

        <Typography
          color="primary"
          sx={{
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          John Doe
        </Typography>
      </Breadcrumbs>
    </>
  );
};

export default SingleCustomer;
