import React from "react";
import { AspectRatio, Button, Container, Divider, Grid } from "@mui/joy";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import icon from "../../../public/icon.png";

const SERVICES = [
  { id: 1, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 2, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 3, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 4, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 5, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 6, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 7, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 8, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 9, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 10, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 11, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 12, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
];

export default function Hero() {
  return (
    <Container sx={{ paddingY: "40px", marginY: "10px" }}>
      <Grid container spacing={3}>
        <Grid xs={8}>
          <Grid container spacing={3}>
            {SERVICES.map((items) => (
              <Grid xs={3} key={items.id}>
                <Card variant="outlined">
                  <Image width={40} height={40} src={icon} alt="icon" />
                  <CardContent>
                    <Typography level="title-md">
                      {items.serviceName}
                    </Typography>
                    <Typography>{items.serviceDetail}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined" sx={{ padding: 0 }}>
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>
              Book Now
            </Typography>
            <Divider />
            <CardContent sx={{ paddingX: "20px", paddingBottom: "40px" }}>
              <Typography sx={{ textAlign: "center", paddingBottom: "15px" }}>
                Select Your Property as appropriate and get quote in 30 seconds!
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingX: "20px",
                  paddingTop: "20px",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="lg"
                  sx={{
                    marginBottom: "15px",
                    paddingX: "40px",
                    paddingY: "14px",
                  }}
                >
                  Residential Property
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="lg"
                  sx={{
                    marginBottom: "15px",
                    paddingX: "40px",
                    paddingY: "14px",
                  }}
                >
                  Commercial Property
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="solid"
                  color="primary"
                  size="lg"
                  sx={{ paddingX: "50px", paddingY: "15px" }}
                >
                  Request a Quote
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
