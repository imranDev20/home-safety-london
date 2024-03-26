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

export default function ContactUs() {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Typography
          component="h2"
          level="h2"
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          Get In Touch
        </Typography>
        <Typography
          color="neutral"
          sx={{
            mb: 2,
          }}
        >
          Are you stumped by a home wiring project or problem? Fill out the form
          with the <br /> details of your situation and we can come to your aid.
        </Typography>
      </Box>
      <form>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
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
    </Container>
  );
}
