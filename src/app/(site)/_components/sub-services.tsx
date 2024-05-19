import {
  BoilerIcon,
  BoilerOutlinedIcon,
  EicrIcon,
  EicrOutlinedIcon,
  EicrOutlinedTwoIcon,
  ElectricalRepairIcon,
  EpcOutlinedIcon,
  FireAlarmCertificateIcon,
  FireAlarmInstallIcon,
  FireRiskIcon,
  FireRiskOutlinedIcon,
  FuseBoxIcon,
  GasOutlinedIcon,
  GasSafteyIcon,
  PatIcon,
  PatOutlinedIcon,
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
} from "@mui/joy";
import Link from "next/link";

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
    Icon: FireAlarmCertificateIcon,
    route: "/fire-services/fire-alarm-certificate",
  },
  {
    id: 3,
    name: "Fuse Box Installation",
    Icon: FuseBoxIcon,
    route: "/electrical-services/fuse-box-installation",
  },
  {
    id: 4,
    name: "Electrical Repairs",
    Icon: ElectricalRepairIcon,
    route: "/electrical-services/electrical-repairs",
  },
  {
    id: 6,
    name: "Fire Alarm Installation",
    Icon: FireAlarmInstallIcon,
    route: "/fire-services/fire-alarm-installation",
  },
  {
    id: 7,
    name: "EV Charger Installation",
    Icon: FireAlarmInstallIcon,
    route: "/electrical-services/ev-charger-installation",
  },
];

export default function SubServices() {
  const theme = useTheme();

  return (
    <Sheet
      variant="solid"
      sx={{
        py: 10,
        backgroundColor: theme.palette.background.level2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          level="h1"
          component="h2"
          fontSize={40}
          sx={{
            mb: 5,
            textAlign: "center",
          }}
        >
          Complete Solution Under One Roof
        </Typography>
        <Grid container spacing={5}>
          {FIRST_ROW.map((item) => (
            <Grid xs={12} md={3} key={item.id}>
              <Card
                variant="plain"
                component={Link}
                href={`/services${item.route}`}
                sx={{
                  textDecoration: "none",
                  transition: ".3s ease",
                  borderRadius: "lg",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 150,
                    }}
                  >
                    <item.Icon
                      color="primary"
                      sx={{
                        fontSize: 65,
                        mb: 2,
                        // color: theme.palette.text.primary,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
              <Typography
                level="title-lg"
                sx={{
                  textAlign: "center",
                  mt: 2,
                }}
              >
                {item.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
