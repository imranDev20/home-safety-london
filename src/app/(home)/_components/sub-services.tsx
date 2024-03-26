import {
  BoilerIcon,
  EicrIcon,
  ElectricalRepairIcon,
  EpcIcon,
  FireAlarmCertificateIcon,
  FireAlarmInstallIcon,
  FireRiskIcon,
  FuseBoxIcon,
  GasSafteyIcon,
  PatIcon,
} from "@/app/_components/common/icons";
import { useTheme } from "@mui/joy/styles";

import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/joy";
import Link from "next/link";

const FIRST_ROW = [
  {
    id: 1,
    name: "Energy Certificate (EPC)",
    Icon: EpcIcon,
    route: "/electrical-services/epc",
  },
  {
    id: 2,
    name: "EICR",
    Icon: EicrIcon,
    route: "/electrical-services/eicr",
  },
  {
    id: 3,
    name: "Gas Certificate & Repair",
    Icon: GasSafteyIcon,
    route: "/gas-services/gas-certificate-repair",
  },
  {
    id: 4,
    name: "Boiler Service & Repair",
    Icon: BoilerIcon,
    route: "/gas-services/boiler-certificate-repair",
  },
];

const SECOND_ROW = [
  {
    id: 7,
    name: "PAT Testing",
    Icon: PatIcon,
    route: "/electrical-services/pat",
  },
  {
    id: 1,
    name: "Fire Risk Assessment",
    Icon: FireRiskIcon,
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
];

export default function SubServices() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        my: 10,
      }}
    >
      <Typography
        level="h1"
        component="h2"
        sx={{
          mb: 3,
          textAlign: "center",
        }}
      >
        Top Services
      </Typography>
      <Grid container spacing={2}>
        {FIRST_ROW.map((item) => (
          <Grid xs={3} key={item.id}>
            <Card
              variant="outlined"
              component={Link}
              href={`/services${item.route}`}
              sx={{
                textDecoration: "none",
                transition: ".3s ease",
                ":hover": {
                  border: "1px solid",
                  borderColor: theme.colorSchemes.light.palette.primary[600],
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <item.Icon
                    color="primary"
                    sx={{
                      fontSize: 55,
                      mb: 2,
                    }}
                  />

                  <Typography level="title-lg">{item.name}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
        }}
      >
        {SECOND_ROW.map((item) => (
          <Grid xs={2} key={item.id}>
            <Card
              variant="outlined"
              sx={{
                textDecoration: "none",
                transition: ".3s ease",
                height: "100%",
                ":hover": {
                  border: "1px solid",
                  borderColor: theme.colorSchemes.light.palette.primary[600],
                },
              }}
              component={Link}
              href={`/services${item.route}`}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <item.Icon
                    color="primary"
                    sx={{
                      fontSize: 50,
                      mb: 2,
                    }}
                  />

                  <Typography
                    level="title-lg"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
