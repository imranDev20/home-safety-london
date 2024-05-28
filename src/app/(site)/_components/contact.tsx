"use client";
import ContactUsForm from "@/app/_components/common/contact-us-form";
import { PHONE_NO } from "@/shared/constants";
import { Phone } from "@mui/icons-material";
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
import Image from "next/image";
import ContactUsImage from "@/images/home/home-contact-image.jpeg";

const Contact = () => {
  const theme = useTheme();

  return (
    <Sheet
      variant="soft"
      id="contact"
      sx={{
        backgroundColor: theme.palette.background.level2,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 15,
        }}
      >
        <Typography
          level="h1"
          component="h2"
          fontSize={42}
          sx={{
            mb: 10,
            textAlign: "center",
          }}
        >
          We Offer Plumbing Work Since 1967
        </Typography>
        <Grid
          container
          sx={{
            borderRadius: "lg",
            overflow: "hidden",
          }}
        >
          <Grid xs={12} lg={3}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
              }}
            >
              <Image
                src={ContactUsImage}
                alt="serviceImage"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
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
                  mt: 3,
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <>
                    <Stack justifyContent="space-between" direction="row">
                      <Typography
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        Monday:
                      </Typography>
                      <Typography>8:00 AM - 6:00 PM</Typography>
                    </Stack>
                    <Divider />
                  </>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                }}
              >
                <Typography
                  component="span"
                  fontWeight={600}
                  color="primary"
                  sx={{
                    mr: 2,
                    display: "flex",
                  }}
                >
                  <Phone
                    sx={{
                      mr: 1,
                    }}
                  />
                  Need Help?
                </Typography>
                <JoyLink
                  component="span"
                  fontWeight={600}
                  underline="hover"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {PHONE_NO}
                </JoyLink>
              </Box>
            </Sheet>
          </Grid>
          <Grid xs={12} md={6} lg={5}>
            <Box
              sx={{
                p: 5,
                backgroundColor: theme.palette.primary[500],
                height: "100%",
              }}
              id="contact-us-form"
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
