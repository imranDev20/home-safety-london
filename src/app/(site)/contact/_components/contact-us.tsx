import ContactUsForm from "@/app/_components/common/contact-us-form";
import { Container, Grid } from "@mui/joy";
import React from "react";

export default function ContactUs() {
  return (
    <Container
      sx={{
        mt: 10,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={5}></Grid>
        <Grid xs={12} md={7}>
          <ContactUsForm />
        </Grid>
      </Grid>
    </Container>
  );
}
