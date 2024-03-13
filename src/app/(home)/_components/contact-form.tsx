import React from "react";
import { Box, Container, FormControl, Grid, Input, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import Image from "next/image";
import londonView from "../../../images/london-view.jpg";

export default function ContactForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Box
      sx={{
        position: "relative",
        my: 5,
      }}
    >
      <Image
        alt="londonView"
        src={londonView}
        sizes="100vw"
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 10,
          pb: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "black",
            opacity: 0.6,
          },
        }}
      >
        <Container
          sx={{
            backgroundColor: "white",
            opacity: 0.9,
            borderRadius: 15,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography>Get In Touch</Typography>
            <Typography>
              Our friendly customer service team are ready to help you choose
              the best safety certificate for your needs.
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid xs={7}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <FormControl>
                        <Input
                          name="firstname"
                          type="text"
                          placeholder="First Name"
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={6}>
                      <FormControl>
                        <Input
                          name="lastname"
                          type="text"
                          placeholder="Last Name"
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={6}>
                      <FormControl>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={6}>
                      <FormControl>
                        <Input
                          name="phone"
                          type="number"
                          placeholder="Phone Number"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid xs={5}>
                <Box>
                  <Typography>Visit us</Typography>
                  <Typography>Information Technology Building</Typography>
                  <Typography>+123-456-7890</Typography>
                  <Typography>info@homesafetylondon.co.uk</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                    style={{
                      width: "100%",
                      height: "300px",
                      border: 0,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
