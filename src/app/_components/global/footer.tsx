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
          bgcolor: "#0d1d2e",
          p: 2,
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
            <Grid xs={4}>
              <Box>
                <Typography component="h3" level="h3" sx={{ mb: 2 }}>
                  Home Safety London
                </Typography>
                <Typography color="neutral">
                  London Property Inspections team are certified top quality
                  engineers ready to provide you with all types of landlord
                  safety certificates in London and the M25 area for domestic
                  and commercial purposes.
                </Typography>
              </Box>
            </Grid>
            <Grid xs={2}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{ fontSize: "18px", fontWeight: "xl", color: "white" }}
                  >
                    Company
                  </ListSubheader>

                  <ListItem>
                    <ListItemButton>Home</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>About Us</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Services</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Contact Us</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Privacy & Policy</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Terms & Conditions</ListItemButton>
                  </ListItem>
                </ListItem>
              </List>
            </Grid>
            <Grid xs={2}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{ fontSize: "18px", fontWeight: "xl", color: "white" }}
                  >
                    Services
                  </ListSubheader>
                  <ListItem>
                    <ListItemButton>Electrical Services</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Gas Services</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Inventory Services</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Fire Services</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Health & Safety</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Emergency Lights</ListItemButton>
                  </ListItem>
                </ListItem>
              </List>
            </Grid>
            <Grid xs={3}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{ fontSize: "18px", fontWeight: "xl", color: "white" }}
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
                  <ListItem>
                    <FacebookIcon />
                    <InstagramIcon />
                    <XIcon />
                    <YouTubeIcon />
                  </ListItem>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
            <Box>
              <Typography>
                ©{year} Home Safety London. All Right Reserved
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
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
