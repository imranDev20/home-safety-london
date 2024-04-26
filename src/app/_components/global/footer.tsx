"use client";
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Container, Divider, Grid } from "@mui/joy";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import PlaceIcon from "@mui/icons-material/Place";
import Link from "next/link";
import { SITE_OPTIONS } from "@/shared/constants";
import servicesData from "@/assets/services-data.json";

export default function Footer() {
  const [color, setColor] = React.useState<ColorPaletteProp>("success");

  const today = new Date();
  const year = today.getFullYear();

  return (
    <Box>
      <Sheet
        variant="solid"
        invertedColors
        sx={{
          bgcolor: "rgba(17, 38, 49, 1)",
          py: 7,
        }}
      >
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "flex-start" },
              justifyContent: "space-between",
            }}
          >
            <Grid xs={12} sm={6} md={4}>
              <Box>
                <Typography component="h3" level="h3" sx={{ mb: 2 }}>
                  London Home Safety
                </Typography>
                <Typography>
                  London Property Inspections team are certified top quality
                  engineers ready to provide you with all types of landlord
                  safety certificates in London and the M25 area for domestic
                  and commercial purposes.
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <List>
                <ListItem nested>
                  <ListSubheader
                    sx={{
                      fontSize: 18,
                      fontWeight: "xl",
                      color: "white",
                      mb: 1,
                    }}
                  >
                    Company
                  </ListSubheader>
                  {SITE_OPTIONS.map((option) => (
                    <ListItem key={option.route}>
                      <ListItemButton component={Link} href={option.route}>
                        {option.label}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </ListItem>
              </List>
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{
                      fontSize: 18,
                      fontWeight: "xl",
                      color: "white",
                      mb: 1,
                    }}
                  >
                    Services
                  </ListSubheader>

                  {servicesData.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemButton
                        component={Link}
                        href={`/services/${item.route}`}
                      >
                        {item.title}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </ListItem>
              </List>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{
                      fontSize: 18,
                      fontWeight: "xl",
                      color: "white",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    Contact us
                  </ListSubheader>
                  <ListItem>
                    <MailIcon /> info@homesafetylondon.co.uk
                  </ListItem>
                  <ListItem>
                    <PhoneIcon /> +123-456-7890
                  </ListItem>
                  <ListItem>
                    <PlaceIcon />
                    27 Old Gloucester Street, London WC1N 3AX
                  </ListItem>
                  <ListItem
                    sx={{
                      mt: 2,
                    }}
                  >
                    <FacebookIcon />
                    <InstagramIcon />
                    <XIcon />
                    <YouTubeIcon />
                  </ListItem>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider
            sx={{
              my: 5,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "row" },
              justifyContent: {
                xs: "center",
                sm: "space-between",
                md: "space-between",
              },
              py: 2,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography>
                ©{year} Home Safety London. All Right Reserved
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Typography>Support</Typography>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
              <Typography>Disclaimer</Typography>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
              <Typography>Contact us</Typography>
            </Box>
          </Box>
        </Container>
      </Sheet>
    </Box>
  );
}
