import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Link as JoyLink,
  Divider,
} from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { hexToRgba } from "@/shared/functions";
import Link from "next/link";
import { PHONE_NO } from "@/shared/constants";
import { PhoneOutlined } from "@mui/icons-material";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image-new.jpeg";

const categories = [
  { text: "Ullamcorper dignissim cras tincidunt." },
  { text: "Ullamcorper dignissim cras tincidunt." },
  { text: "Ullamcorper dignissim cras tincidunt." },
  { text: "Ullamcorper dignissim cras tincidunt." },
  { text: "Ullamcorper dignissim cras tincidunt." },
];

function DotIcon() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: hexToRgba(theme.palette.secondary[500], 0.3),
        width: "16px",
        height: "16px",
        p: "2px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="span"
    >
      <Box
        component="span"
        sx={{
          backgroundColor: theme.palette.secondary[500],
          width: "7px",
          height: "7px",
          p: "2px",
          borderRadius: "50%",
        }}
      ></Box>
    </Box>
  );
}

export default function About() {
  const theme = useTheme();

  return (
    <Container sx={{ my: 15 }}>
      <Grid container spacing={10}>
        <Grid
          xs={12}
          md={7}
          sx={{
            position: "relative",
          }}
        >
          <Stack
            spacing={3}
            direction="row"
            sx={{
              position: "sticky",
              top: 70,
            }}
          >
            <Box
              sx={{
                position: "relative",
                py: 3,
              }}
            >
              <Image
                src={BackgroundImage}
                objectFit="cover"
                alt="serviceImage"
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
              />
            </Box>

            <Stack spacing={3}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  src={BackgroundImage}
                  objectFit="cover"
                  alt="serviceImage"
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              </Box>

              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  src={BackgroundImage}
                  objectFit="cover"
                  alt="serviceImage"
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              </Box>
            </Stack>

            <Box
              sx={{
                backgroundColor: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                p: 5,
              }}
            >
              TrustPilot
            </Box>
          </Stack>
        </Grid>
        <Grid xs={12} md={5}>
          <Box>
            <Typography
              sx={{
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: 2,
                mb: 1,
              }}
            >
              About us
            </Typography>
            <Typography
              component="h2"
              sx={{
                mb: 2,
              }}
              fontSize={36}
            >
              Reliable & Professional Maintenance Work
            </Typography>
            <Typography
              color="neutral"
              sx={{
                lineHeight: 1.8,
                my: 3,
              }}
            >
              Mauris ac risus sed quam semper auctor. Nam tempus volutpat ipsum,
              non viverra odio mollis mollis. Integer lacus ligula, imperdiet
              vel massa in, maximus suscipit turpis. Mauris ac risus sed quam
              semper auctor. Nam tempus volutpat ipsum, non viverra
            </Typography>

            <Stack
              spacing={2}
              sx={{
                my: 3,
              }}
            >
              {categories.map((cat) => (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  key={cat.text}
                  level="body-lg"
                >
                  <DotIcon />
                  <Typography
                    sx={{
                      ml: 1,
                    }}
                  >
                    {" "}
                    Enim eu turpis egestas pretium aenean.
                  </Typography>
                </Typography>
              ))}
            </Stack>

            <Divider
              sx={{
                my: 4,
              }}
            />

            <Stack
              direction="row"
              spacing={4}
              sx={{
                mt: 3,
              }}
            >
              <Button variant="solid" size="lg" component={Link} href="/about">
                More About Us
              </Button>

              <Stack direction="row" alignItems="center">
                <PhoneOutlined
                  fontSize="xl3"
                  sx={{
                    mr: 1,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    Call Us Anytime
                  </Typography>
                  <JoyLink
                    fontWeight={600}
                    sx={{
                      fontSize: 20,
                      color: theme.palette.text.primary,
                    }}
                    href={`tel:${PHONE_NO}`}
                  >
                    {PHONE_NO}
                  </JoyLink>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
