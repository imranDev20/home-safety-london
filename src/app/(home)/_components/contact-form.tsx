import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import Image from "next/image";
import londonView from "../../../images/london-view.jpg";

export default function ContactForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Container>
      <Box sx={{ backgroundColor: "white" }}>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography>Get In Touch</Typography>
          <Typography>
            Our friendly customer service team are ready to help you choose
            <br />
            the best safety certificate for your needs.
          </Typography>
        </Box>
        <form>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid xs={7}>
              <Box>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <FormControl>
                      <Input
                        name="firstname"
                        type="text"
                        placeholder="Your Name"
                        size="lg"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={6}>
                    <FormControl>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email Address"
                        size="lg"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={6}>
                    <FormControl>
                      <Input
                        name="phone"
                        type="number"
                        placeholder="Your Phone Number"
                        size="lg"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl>
                      <Textarea
                        minRows={4}
                        name="message"
                        placeholder="Your Message here…"
                        variant="outlined"
                        size="lg"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ pt: 2 }}>
                  <Button type="submit" variant="solid" sx={{ width: "100%" }}>
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
