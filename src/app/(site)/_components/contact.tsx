import ContactUsForm from "@/app/_components/common/contact-us-form";
import {
  Box,
  Container,
  Divider,
  Grid,
  Sheet,
  Stack,
  Typography,
  useTheme,
  Link as JoyLink,
} from "@mui/joy";
import React from "react";

const Contact = () => {
  const theme = useTheme();

  return (
    <Sheet
      variant="soft"
      sx={{
        backgroundColor: theme.palette.background.level2,
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid md={3}></Grid>
          <Grid md={4}>
            <Sheet
              variant="plain"
              sx={{
                p: 5,
                backgroundColor: "white",
                height: "100%",
              }}
            >
              <Typography level="h4">Working Hours:</Typography>
              <Stack
                spacing={2}
                sx={{
                  mt: 4,
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <>
                    <Stack justifyContent="space-between" direction="row">
                      <Typography>Monday:</Typography>
                      <Typography>Monday:</Typography>
                    </Stack>
                    <Divider />
                  </>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                }}
              >
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{
                    color: theme.palette.primary[500],
                    mr: 2,
                  }}
                >
                  Need Help?
                </Typography>
                <JoyLink
                  component="span"
                  fontWeight={600}
                  underline="always"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  (+1) 444 234-8789
                </JoyLink>
              </Box>
            </Sheet>
          </Grid>
          <Grid md={5}>
            <Box
              sx={{
                p: 5,
                backgroundColor: theme.palette.primary[500],
              }}
            >
              <Typography
                level="h1"
                component="h2"
                fontSize={40}
                sx={{
                  mb: 5,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Contact Us
              </Typography>
              <ContactUsForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
};

export default Contact;
