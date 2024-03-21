import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  Sheet,
  Textarea,
  Typography,
} from "@mui/joy";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Container sx={{ py: 10 }}>
      <Box>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography component="h3" level="h3" sx={{ pb: 2 }}>
            Get In Touch
          </Typography>
          <Typography color="neutral">
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
                        sx={{ bgcolor: "white" }}
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
                        sx={{ bgcolor: "white" }}
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
                        sx={{ bgcolor: "white" }}
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
                        sx={{ bgcolor: "white" }}
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
