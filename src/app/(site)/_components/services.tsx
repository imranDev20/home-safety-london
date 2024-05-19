import { Container, Grid, Sheet, Typography, useTheme } from "@mui/joy";
import Service from "./service";
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
      "Reliable, efficient, 24/7 electric service. Expert technicians, prompt repairs. Reliable, effici",
    column: 6,
    Icon: EicrOutlinedIcon,
  },

  {
    id: 2,
    serviceName: "Gas Services",
    serviceDetail:
      "Reliable gas services for homes and businesses. Installation, repairs. Reliable gas services for ",
    column: 6,
    Icon: GasOutlinedIcon,
  },
  {
    id: 3,
    serviceName: "Fire Services",
    serviceDetail:
      "Fire protection service ensures safety by installing fire alarms, extinguishers. Fire protection service ensures ",
    column: 6,
    Icon: FireAlarmBellOutlinedIcon,
  },

  {
    id: 4,
    serviceName: "Health & Safety",
    serviceDetail:
      "Fire protection service ensures safety by installing fire alarms, extinguishers. Fire protection service ensures ",
    column: 6,
    Icon: HealthHeartOutlinedIcon,
  },
];

export default function Services() {
  const theme = useTheme();

  return (
    <Sheet
      variant="soft"
      sx={{
        backgroundColor: theme.palette.background.level2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 10,
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
          We Offer Plumbing Work Since 1967
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
              {service.id && <Service service={service} />}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
