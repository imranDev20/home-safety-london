"use client";
import { Container, Grid, Sheet, Typography, useTheme } from "@mui/joy";
import ServiceCategoryCard from "./service-category-card";
import {
  EicrOutlinedIcon,
  FireAlarmBellOutlinedIcon,
  GasOutlinedIcon,
  HealthHeartOutlinedIcon,
} from "@/app/_components/common/icons";

const SERVICES_PRICE = [
  {
    id: 1,
    serviceName: "Electrical Services",
    serviceDetail:
      "Ensure your home's electrical systems are safe and efficient with our expert services.",
    column: 6,
    Icon: EicrOutlinedIcon,
  },

  {
    id: 2,
    serviceName: "Gas Services",
    serviceDetail:
      "Keep your home warm and secure with our reliable gas safety solutions.",
    column: 6,
    Icon: GasOutlinedIcon,
  },
  {
    id: 3,
    serviceName: "Fire Services",
    serviceDetail:
      "Protect your property and loved ones with our advanced fire safety measures.",
    column: 6,
    Icon: FireAlarmBellOutlinedIcon,
  },

  {
    id: 4,
    serviceName: "Health & Safety",
    serviceDetail:
      "Maintain a safe and healthy living environment with our comprehensive safety solutions.",
    column: 6,
    Icon: HealthHeartOutlinedIcon,
  },
];

export default function ServiceCategories() {
  const theme = useTheme();

  return (
    <Sheet
      variant="soft"
      sx={{
        backgroundColor: theme.palette.background.level2,
      }}
      id="categories"
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 15,
        }}
      >
        <Typography
          level="h1"
          component="h2"
          fontSize={42}
          sx={{
            mb: 5,
            textAlign: "center",
          }}
        >
          Discover Our Wide Range of Safety Solutions
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {SERVICES_PRICE.map((service) => (
            <Grid xs={12} sm={6} md={service.column} key={service.id}>
              {service.id && <ServiceCategoryCard service={service} />}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
