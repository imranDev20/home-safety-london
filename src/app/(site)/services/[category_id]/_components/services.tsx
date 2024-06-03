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
  Sheet,
} from "@mui/joy";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import Link from "next/link";

export default function Services() {
  const theme = useTheme();

  return (
    <Sheet
      sx={{
        py: 10,
        pb: 15,
        backgroundColor: theme.palette.background.level2,
      }}
    >
      <Container maxWidth="lg">
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
                  variant="plain"
                  sx={{
                    transition: "0.3s ease all",
                    borderRadius: "lg",
                    backgroundColor: "white",
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
                        mb: 1,
                        ":hover": {
                          color: theme.palette.primary[500],
                        },
                      }}
                    >
                      Gas Safety Certificate
                    </Typography>

                    <Typography
                      level="body-md"
                      sx={{
                        my: 1,
                        // textAlign: "justify",
                      }}
                      color="neutral"
                    >
                      Are you in need of a reliable and professional boiler
                      installation service in London? Look no further than the
                      EICR Cert! With years of experience
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 13,
                            textAlign: "center",
                            mr: 2,
                            fontWeight: 500,
                          }}
                        >
                          Starts
                          <br />
                          From
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 30,
                            textAlign: "center",
                            fontWeight: 600,
                            position: "relative",
                          }}
                          color="secondary"
                        >
                          £180
                        </Typography>
                      </Box>
                      <Button color="secondary" variant="solid">
                        Find Out More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </JoyLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
