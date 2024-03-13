import React from "react";
import { Card, Container, Grid, Typography } from "@mui/joy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";

export default function ContactAddress() {
  return (
    <Container sx={{ pt: 10 }}>
      <Grid container spacing={3}>
        <Grid xs={4}>
          <Card variant="soft" color="primary" sx={{ height: "100%" }}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              <LocationOnIcon sx={{ mr: "5px" }} />
              <Typography component="span">Our Office Location</Typography>
            </Typography>
            <Typography level="title-md">Home Safety London</Typography>
            <Typography level="title-md">
              8494 Signal Hill Road Manassas, <br /> VA, 20110
            </Typography>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="solid" color="primary" sx={{ height: "100%" }}>
            <Typography
              textColor="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              <QueryBuilderIcon sx={{ mr: "5px" }} />
              <Typography component="span">Work Hours:</Typography>
            </Typography>
            <Typography level="title-md" textColor="inherit">
              Mon-Fri 08:00 AM - 05:00 PM
            </Typography>
            <Typography level="title-md" textColor="inherit">
              Sat-Sun: Emergency only
            </Typography>
          </Card>
        </Grid>

        <Grid xs={4}>
          <Card variant="soft" color="primary" sx={{ height: "100%" }}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              <ChatIcon sx={{ mr: "5px" }} />
              <Typography component="span">Contact Info</Typography>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon />
              <Typography level="title-md">+123-456-7890</Typography>
              <Typography level="title-md">+123-456-7890</Typography>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon />
              <Typography level="title-md">
                info@homesafetylondon.co.uk
              </Typography>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
