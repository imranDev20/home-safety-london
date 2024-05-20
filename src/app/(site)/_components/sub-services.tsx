import {
  BoilerOutlinedIcon,
  EicrOutlinedTwoIcon,
  ElectricalRepairIcon,
  EpcOutlinedIcon,
  EvChargerOutlinedIcon,
  FireAlarmInstallIcon,
  FireAlarmOutlined2Icon,
  FireAlarmOutlinedIcon,
  FireRiskOutlinedIcon,
  FuseBoxOutlinedIcon,
  GasOutlinedIcon,
  PatOutlinedIcon,
  ScrewDriverOutlinedIcon,
} from "@/app/_components/common/icons";
import { useTheme } from "@mui/joy/styles";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Sheet,
  Typography,
  Link as JoyLink,
} from "@mui/joy";
import Link from "next/link";
import { hexToRgba } from "@/shared/functions";
import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";

const FIRST_ROW = [
  {
    id: 1,
    name: "Energy Certificate (EPC)",
    Icon: EpcOutlinedIcon,
    route: "/electrical-services/epc",
  },
  {
    id: 2,
    name: "EICR",
    Icon: EicrOutlinedTwoIcon,
    route: "/electrical-services/eicr",
  },
  {
    id: 3,
    name: "Gas Certificate & Repair",
    Icon: GasOutlinedIcon,
    route: "/gas-services/gas-certificate-repair",
  },
  {
    id: 4,
    name: "Boiler Service & Repair",
    Icon: BoilerOutlinedIcon,
    route: "/gas-services/boiler-certificate-repair",
  },
  {
    id: 7,
    name: "PAT Testing",
    Icon: PatOutlinedIcon,
    route: "/electrical-services/pat",
  },
  {
    id: 1,
    name: "Fire Risk Assessment",
    Icon: FireRiskOutlinedIcon,
    route: "/fire-services/fire-risk-assessment",
  },
  {
    id: 2,
    name: "Fire Alarm Certificate",
    Icon: FireAlarmOutlinedIcon,
    route: "/fire-services/fire-alarm-certificate",
  },
  {
    id: 3,
    name: "Fuse Box Installation",
    Icon: FuseBoxOutlinedIcon,
    route: "/electrical-services/fuse-box-installation",
  },
  {
    id: 4,
    name: "Electrical Repairs",
    Icon: ScrewDriverOutlinedIcon,
    route: "/electrical-services/electrical-repairs",
  },
  {
    id: 6,
    name: "Fire Alarm Installation",
    Icon: FireAlarmOutlined2Icon,
    route: "/fire-services/fire-alarm-installation",
  },
  {
    id: 7,
    name: "EV Charger Installation",
    Icon: EvChargerOutlinedIcon,
    route: "/electrical-services/ev-charger-installation",
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
          {FIRST_ROW.map((item) => (
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
      </Container>
    </Sheet>
  );
}
