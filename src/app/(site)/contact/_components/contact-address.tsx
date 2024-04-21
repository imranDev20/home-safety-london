import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Sheet,
  Typography,
} from "@mui/joy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import { WatchLater } from "@mui/icons-material";

export default function ContactAddress() {
  return (
    <Sheet variant="soft">
      <Container sx={{ py: 10 }}>
        <Grid container spacing={3}>
          <Grid xs={4}>
            <Card variant="plain" sx={{ height: "100%" }}>
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
                      level="title-lg"
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
                    >
                      Unit 46D, Micro Business Park, 46-50 Greatorex Street,
                      London E1 5NP
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={4}>
            <Card variant="plain" sx={{ height: "100%" }}>
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
                      level="title-lg"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Work Hours:
                    </Typography>
                    <Typography
                      color="neutral"
                      sx={{
                        mb: 0.5,
                      }}
                    >
                      Mon-Fri 08:00 AM - 05:00 PM
                    </Typography>
                    <Typography color="neutral">
                      Sat-Sun: Emergency only
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={4}>
            <Card variant="plain" sx={{ height: "100%" }}>
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
                      level="title-lg"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Contact Info:
                    </Typography>
                    <Typography
                      color="neutral"
                      sx={{
                        mb: 0.5,
                      }}
                    >
                      07480 062995
                    </Typography>
                    <Typography color="neutral">
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
