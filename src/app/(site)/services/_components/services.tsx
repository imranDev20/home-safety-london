"use client";
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import Service from "./service";
import { SUB_SERVICES } from "@/shared/constants";
import { DETAILED_SERVICES } from "../../_components/sub-services";

export default function ServicesItem() {
  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          level="h1"
          component="h2"
          fontSize={42}
          sx={{
            mb: 7,
            textAlign: "center",
          }}
        >
          We Offer Plumbing Work Since 1967
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {DETAILED_SERVICES.map((service) => (
          <Grid xs={12} sm={6} md={4} key={service.id}>
            <Service service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
