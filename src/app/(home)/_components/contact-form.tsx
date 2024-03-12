import React from "react";
import { Box, Container, FormControl, Grid, Input, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Container>
      <Box>
        <Typography>Get In Touch</Typography>
        <Typography>
          Our friendly customer service team are ready to help you choose the
          best safety certificate for your needs.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid xs={5}>
            <FormControl>
              <Input name="firstname" type="text" placeholder="First Name" />
            </FormControl>
          </Grid>
          <Grid xs={5}>
            <FormControl>
              <Input name="lastname" type="text" placeholder="Last Name" />
            </FormControl>
          </Grid>
          <Grid xs={5}>
            <FormControl>
              <Input name="email" type="email" placeholder="Email Address" />
            </FormControl>
          </Grid>
          <Grid xs={5}>
            <FormControl>
              <Input name="phone" type="number" placeholder="Phone Number" />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
