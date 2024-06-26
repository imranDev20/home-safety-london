"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { WatchLater } from "@mui/icons-material";
import { ADDRESS } from "@/shared/constants";

export default function ContactAddress() {
  const theme = useTheme();

  return (
    <Sheet
      variant="soft"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container sx={{ py: 10 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <Card
              variant="plain"
              sx={{
                height: "100%",
                p: 3,
                backgroundColor: theme.palette.background.level3,
                borderRadius: "xl",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: 45,
                      mr: 2,
                    }}
                    color="primary"
                  />

                  <Box>
                    <Typography
                      level="h4"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Address:
                    </Typography>
                    <Typography
                      color="neutral"
                      sx={{
                        mb: 0.5,
                      }}
                      level="body-lg"
                    >
                      {ADDRESS}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Card
              variant="plain"
              sx={{
                height: "100%",
                p: 3,
                backgroundColor: theme.palette.background.level3,
                borderRadius: "xl",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <WatchLater
                    sx={{
                      fontSize: 45,
                      mr: 2,
                    }}
                    color="primary"
                  />

                  <Box>
                    <Typography
                      level="h4"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Work Hours:
                    </Typography>
                    <Typography
                      color="neutral"
                      level="body-lg"
                      sx={{
                        mb: 0.5,
                      }}
                    >
                      Mon-Fri 08:00 AM - 05:00 PM
                    </Typography>
                    <Typography color="neutral" level="body-lg">
                      Sat-Sun: Emergency only
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card
              variant="plain"
              sx={{
                height: "100%",
                p: 3,
                backgroundColor: theme.palette.background.level3,
                borderRadius: "xl",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <EmailIcon
                    sx={{
                      fontSize: 45,
                      mr: 2,
                    }}
                    color="primary"
                  />

                  <Box>
                    <Typography
                      level="h4"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Contact Info:
                    </Typography>
                    <Typography
                      color="neutral"
                      level="body-lg"
                      sx={{
                        mb: 0.5,
                      }}
                    >
                      07480 062995
                    </Typography>
                    <Typography color="neutral" level="body-lg">
                      info@londonhomesafety.co.uk
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
