import React from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import ServiceCard from "./service-card";

const SERVICES = [
  {
    id: 1,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 2,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 3,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 4,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 5,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 6,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 7,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
  {
    id: 8,
    serviceName: "GAS SAFETY COMMERCIAL",
    serviceDetail: "Gas Safety Certificate - Commercial - 1 appliance",
    price: "£199",
  },
];

export default function ServicesCard() {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <Typography sx={{ fontSize: 35 }}>Gas Safety Certificate</Typography>
      </Box>
      <Grid container spacing={3}>
        {SERVICES.map((service) => (
          <Grid xs={3} key={service.id}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
