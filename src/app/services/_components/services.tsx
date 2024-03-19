import React from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import Service from "./service";
import serviceImage from "../../../images/electric.jpg";

const SERVICES_ITEMS = [
  {
    id: 1,
    ServiceName: "Electrical Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
    serviceImage: serviceImage,
  },
  {
    id: 2,
    ServiceName: "Gas Services",
    serviceDetail:
      "Reliable gas services for homes and businesses. Installation, repairs, and maintenance. Experienced technicians, 24/7 emergency support, and competitive rates.",
    serviceImage: serviceImage,
  },
  {
    id: 3,
    ServiceName: "Fire Services",
    serviceDetail:
      "Fire protection service ensures safety by installing fire alarms, extinguishers, and sprinkler systems, providing crucial support in emergencies, safeguarding lives, and properties.",
    serviceImage: serviceImage,
  },
  {
    id: 4,
    ServiceName: "Health & Safety",
    serviceDetail:
      "Energy performance certification ensures buildings meet energy standards, promoting energy efficiency, reducing costs, and contributing to a sustainable environment.",
    serviceImage: serviceImage,
  },
  {
    id: 5,
    ServiceName: "Inventory Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
    serviceImage: serviceImage,
  },
  {
    id: 6,
    ServiceName: "Inventory Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
    serviceImage: serviceImage,
  },
  {
    id: 7,
    ServiceName: "Inventory Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
    serviceImage: serviceImage,
  },
  {
    id: 8,
    ServiceName: "Inventory Services",
    serviceDetail:
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs, affordable rates. Powering homes and businesses with safety and excellence.",
    serviceImage: serviceImage,
  },
];

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
        {SERVICES_ITEMS.map((service) => (
          <Grid xs={4} key={service.id}>
            <Service service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
