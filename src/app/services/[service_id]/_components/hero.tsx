import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import { CorporateFare, Home, Textsms } from "@mui/icons-material";
import { EicrIcon } from "@/app/_components/common/icons";

export default function ServiceHero() {
  return (
    <Container sx={{ my: 10 }}>
      <Grid container spacing={5}>
        <Grid xs={8} sx={{ my: "auto" }}>
          <Box>
            <Grid container spacing={4}>
              <Grid xs={4}>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", textAlign: "center" }}
                >
                  <EicrIcon sx={{ mx: "auto", fontSize: "50" }} />
                  <Typography level="h1">EICR</Typography>
                  <Typography level="body-xs">Electrial Certificate</Typography>
                </Card>
              </Grid>
              <Grid xs={8}>
                <Box>
                  <Typography>EICR Certificate Cost London</Typography>
                  <Typography>
                    An electrical installation condition report previously known
                    as (periodic electrical inspection) is an inspection on the
                    condition of an existing electrical installation, to
                    identify if any part of the installation does not meet
                    current British standards.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                level="h2"
                sx={{
                  textAlign: "center",
                }}
              >
                Book Now
              </Typography>

              <Divider
                sx={{
                  my: 2,
                }}
              />
              <Typography
                sx={{
                  textAlign: "center",
                }}
              >
                Select Your Property as appropriate and get quote in 30 seconds!
              </Typography>

              <Stack
                spacing={2}
                sx={{
                  mt: 3,
                }}
              >
                <Button
                  startDecorator={<Home />}
                  variant="outlined"
                  color="primary"
                  size="lg"
                >
                  Residential Property
                </Button>
                <Button
                  startDecorator={<CorporateFare />}
                  variant="outlined"
                  color="primary"
                  size="lg"
                >
                  Commercial Property
                </Button>

                <Button startDecorator={<Textsms />} size="lg">
                  Request a Quote
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
