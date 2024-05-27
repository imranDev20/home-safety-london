"use client";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Container,
  Grid,
  Typography,
  useTheme,
  Link as JoyLink,
  Box,
} from "@mui/joy";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import Link from "next/link";

export default function Services() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        my: 7,
        mb: 10,
      }}
    >
      <Typography
        component="h2"
        sx={{
          mb: 5,
          textAlign: "center",
        }}
        fontSize={36}
      >
        Reliable & Professional Maintenance Work
      </Typography>

      <Grid container spacing={3}>
        {[0, 1, 2].map((item) => (
          <Grid md={4} key={item}>
            <JoyLink
              component={Link}
              underline="none"
              href="/services/electrical-services/epc"
            >
              <Card
                key={item}
                variant="solid"
                sx={{
                  backgroundColor: theme.palette.accent1[500],
                  transition: "0.3s ease all",
                  borderRadius: "lg",
                  ":hover": {
                    backgroundColor: theme.palette.secondary[500],
                    ".MuiTypography-root": {
                      color: theme.palette.text.primary,
                    },

                    ".MuiButton-root": {
                      backgroundColor: theme.palette.accent1[500],
                      color: "white",
                    },
                  },
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <Image
                      src={BackgroundImage}
                      objectFit="cover"
                      alt="serviceImage"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </AspectRatio>
                </CardOverflow>

                <CardContent
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    level="h3"
                    component="h3"
                    sx={{
                      color: "white",
                      mb: 2,
                    }}
                  >
                    Gas Safety Certificate
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        textAlign: "center",
                        mt: 1,
                        mr: 1,
                        color: "white",
                      }}
                      color="secondary"
                    >
                      Starts
                      <br />
                      From
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 40,
                        textAlign: "center",
                        fontWeight: 800,
                        position: "relative",
                      }}
                      color="secondary"
                    >
                      £180
                    </Typography>
                  </Box>

                  <Typography
                    level="body-md"
                    sx={{
                      my: 1,
                      color: "white",
                    }}
                  >
                    Are you in need of a reliable and professional boiler
                    installation service in London? Look no further than the
                    EICR Cert! With years of experience
                  </Typography>
                  <Button color="secondary" variant="solid" sx={{ mt: 2 }}>
                    Find Out More
                  </Button>
                </CardContent>
              </Card>
            </JoyLink>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 7,
        }}
      >
        <Button size="lg" sx={{ px: 6 }} component={Link} href="/book-now">
          Book Now
        </Button>
      </Box>
    </Container>
  );
}
