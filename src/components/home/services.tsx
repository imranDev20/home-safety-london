import React from "react";
import { Box, Container, Grid, Sheet, Typography } from "@mui/joy";
import Service from "./service";

const SERVICES_PRICE = [
  {
    id: 1,
    ServiceName: "Electrical Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
  },
  {
    id: 2,
    ServiceName: "Gas Services",
    serviceDetail:
      "Reliable gas services for homes and businesses. Installation, repairs, and maintenance. Experienced technicians, 24/7 emergency support, and competitive rates.",
  },
  {
    id: 3,
    ServiceName: "Fire Services",
    serviceDetail:
      "Fire protection service ensures safety by installing fire alarms, extinguishers, and sprinkler systems, providing crucial support in emergencies, safeguarding lives, and properties.",
  },
  {
    id: 4,
    ServiceName: "Health & Safety",
    serviceDetail:
      "Energy performance certification ensures buildings meet energy standards, promoting energy efficiency, reducing costs, and contributing to a sustainable environment.",
  },
  {
    id: 5,
    ServiceName: "Inventory Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
  },
];

export default function Services() {
  return (
    <Container sx={{ paddingY: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingY: "20px",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
          Services & Prices
        </Typography>
        <Typography sx={{ fontSize: "20px", paddingY: "5px" }}>
          We provide following services. Our prices are{" "}
          <Typography component="span" color="primary" sx={{ fontWeight: 600 }}>
            all tax inclusive
          </Typography>
          . We do not charge any extra or hidden fee.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingX: "30px",
          paddingY: "10px",
        }}
      >
        {SERVICES_PRICE.map((service) => (
          <Grid xs={6} key={service.id}>
            <Service service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
