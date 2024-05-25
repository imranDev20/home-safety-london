import {
  BoilerOutlinedIcon,
  EicrOutlinedTwoIcon,
  EpcOutlinedIcon,
  EvChargerOutlinedIcon,
  FireAlarmOutlined2Icon,
  FireAlarmOutlinedIcon,
  FireRiskOutlinedIcon,
  FuseBoxOutlinedIcon,
  GasOutlinedIcon,
  PatOutlinedIcon,
  ScrewDriverOutlinedIcon,
} from "@/app/_components/common/icons";
import { useTheme } from "@mui/joy/styles";
import ElectricImage from "@/images/electric.jpg";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Sheet,
  Typography,
  Link as JoyLink,
  Button,
  Stack,
} from "@mui/joy";
import Link from "next/link";
import { hexToRgba } from "@/shared/functions";
import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";

export const DETAILED_SERVICES = [
  {
    id: 1,
    name: "Energy Certificate (EPC)",
    Icon: EpcOutlinedIcon,
    image: ElectricImage,
    route: "/electrical-services/epc",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 2,
    name: "EICR",
    Icon: EicrOutlinedTwoIcon,
    image: ElectricImage,

    route: "/electrical-services/eicr",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 3,
    name: "Gas Certificate & Repair",
    Icon: GasOutlinedIcon,
    image: ElectricImage,

    route: "/gas-services/gas-certificate-repair",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 4,
    name: "Boiler Service & Repair",
    Icon: BoilerOutlinedIcon,
    image: ElectricImage,

    route: "/gas-services/boiler-certificate-repair",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 7,
    name: "PAT Testing",
    Icon: PatOutlinedIcon,
    image: ElectricImage,

    route: "/electrical-services/pat",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 1,
    name: "Fire Risk Assessment",
    Icon: FireRiskOutlinedIcon,
    image: ElectricImage,

    route: "/fire-services/fire-risk-assessment",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 2,
    name: "Fire Alarm Certificate",
    Icon: FireAlarmOutlinedIcon,
    image: ElectricImage,

    route: "/fire-services/fire-alarm-certificate",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 3,
    name: "Fuse Box Installation",
    Icon: FuseBoxOutlinedIcon,
    image: ElectricImage,

    route: "/electrical-services/fuse-box-installation",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 4,
    name: "Electrical Repairs",
    Icon: ScrewDriverOutlinedIcon,
    image: ElectricImage,

    route: "/electrical-services/electrical-repairs",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 6,
    name: "Fire Alarm Installation",
    Icon: FireAlarmOutlined2Icon,
    image: ElectricImage,

    route: "/fire-services/fire-alarm-installation",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
  {
    id: 7,
    name: "EV Charger Installation",
    Icon: EvChargerOutlinedIcon,
    image: ElectricImage,

    route: "/electrical-services/ev-charger-installation",
    description:
      "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
  },
];

export default function SubServices() {
  const theme = useTheme();

  return (
    <Sheet
      variant="solid"
      sx={{
        py: 15,
        backgroundColor: theme.palette.background.level2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          level="h1"
          component="h2"
          fontSize={40}
          sx={{
            mb: 10,
            textAlign: "center",
          }}
        >
          Complete Solution Under One Roof
        </Typography>
        <Grid container spacing={5}>
          {DETAILED_SERVICES.map((item) => (
            <Grid xs={12} md={4} key={item.id}>
              <Card
                variant="plain"
                component={Link}
                href={`/services${item.route}`}
                sx={{
                  textDecoration: "none",
                  transition: ".3s ease-in-out",
                  borderRadius: "lg",
                  backgroundColor: "white",
                  overflow: "hidden",
                  position: "relative",
                  p: 0,

                  ".MuiCardContent-root": {
                    backgroundColor: "white",
                    transition: "500ms all",
                  },
                  ":hover": {
                    ".MuiCardContent-root": {
                      backgroundColor: hexToRgba(
                        theme.palette.primary[500],
                        0.7
                      ),
                    },
                    ".MuiSvgIcon-root": {
                      color: "white",
                      fontSize: 100,
                    },
                  },
                }}
              >
                <Image
                  src={backgroundImage}
                  alt="Background"
                  sizes="100vw"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  style={{
                    objectFit: "cover",
                    transition: "100ms all ease-in-out",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 250,
                    }}
                  >
                    <item.Icon
                      sx={{
                        fontSize: 65,
                        color: theme.palette.text.primary,
                        transition: "150ms ease",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              <JoyLink
                underline="none"
                component={Link}
                href={`/services/${item.route}`}
                sx={{
                  color: theme.palette.text.primary,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ":hover": {
                    color: theme.palette.primary[500],
                    transition: "0.3s ease",
                  },
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    fontWeight: 600,
                    fontSize: 26,
                  }}
                >
                  {item.name}
                </Typography>
              </JoyLink>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{
            mt: 10,
          }}
        >
          <Button
            variant="solid"
            href="/book-now/"
            component={Link}
            size="lg"
            sx={{
              backgroundColor: theme.palette.secondary[500],
              color: "white",
              ":hover": {
                backgroundColor: theme.palette.text.primary,
              },
            }}
          >
            Book Now
          </Button>

          <Button
            variant="solid"
            href="/services/"
            component={Link}
            size="lg"
            sx={{
              backgroundColor: theme.palette.primary[500],
              color: "white",
              ":hover": {
                backgroundColor: theme.palette.secondary[500],
                color: theme.palette.text.primary,
              },
            }}
          >
            Browse all Services
          </Button>
        </Stack>
      </Container>
    </Sheet>
  );
}
