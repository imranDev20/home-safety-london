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
  { id: 2, serviceName: "Fire", serviceDetail: "Risk Assessment" },
  { id: 3, serviceName: "Fire", serviceDetail: "Alarm Certificate" },
  { id: 4, serviceName: "PAT", serviceDetail: "Testing" },
  { id: 5, serviceName: "GAS", serviceDetail: "Safety Certificate" },
  {
    id: 6,
    serviceName: "EPC",
    serviceDetail: "Energy Performancer Certificate",
  },
  { id: 7, serviceName: "Fire", serviceDetail: "Alarm Installation" },
  { id: 8, serviceName: "Fuse", serviceDetail: "Box Installation" },
  { id: 9, serviceName: "Boiler", serviceDetail: "Box Installation" },
  { id: 10, serviceName: "Electrial", serviceDetail: "Repairs" },
  { id: 11, serviceName: "GAS", serviceDetail: "Repairs" },
  { id: 12, serviceName: "Plumbing", serviceDetail: "" },
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
                    <Typography sx={{ fontSize: "12px" }}>
                      {items.serviceDetail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={4}>
          <Card
            variant="outlined"
            sx={{
              padding: 0,
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "32px",
                textAlign: "center",
                backgroundColor: "#14a51a",
                paddingY: "15px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Book Now
            </Typography>

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
                    paddingY: "15px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    color: "#000000",
                    borderColor: "#14a51a",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#14a51a",
                      color: "#fff", // Text color on hover
                    },
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
                    paddingY: "15px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    color: "#000000",
                    borderColor: "#14a51a",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#14a51a",
                      color: "#fff", // Text color on hover
                    },
                  }}
                >
                  Commercial Property
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="lg"
                  sx={{
                    paddingX: "50px",
                    paddingY: "15px",
                    cursor: "pointer",
                    backgroundColor: "#14a51a",
                    "&:hover": {
                      backgroundColor: "#14a51a",
                    },
                  }}
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
