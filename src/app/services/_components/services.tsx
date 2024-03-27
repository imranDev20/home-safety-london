"use client";
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import Service from "./service";
import { SERVICES } from "@/shared/constants";

const MODIFIED_SERVICES = SERVICES.map((service) =>
  service.sub_services.map((s_service) => ({
    ...s_service,
    parentService: service.title,
  }))
);

const SUB_SERVICES = MODIFIED_SERVICES.flatMap((service) => service);

export default function ServicesItem() {
  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography component="h2" level="h2">
          We Provide Our Best Electric Services For You.
        </Typography>
        <Typography color="neutral" sx={{ my: 3 }}>
          We offers our services on a “Pay as You Use” basis. There is a minimum
          charge of $50 per visit, which is exempt if the repair cost is more
          than $200. We also offer 3 days workmanship guarantee.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {SUB_SERVICES.map((service) => (
          <Grid xs={4} key={service.id}>
            <Service service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
