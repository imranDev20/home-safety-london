import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Container, Grid } from "@mui/joy";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import payment from "../../../../public/payment.png";

export default function Footer() {
  const [color, setColor] = React.useState<ColorPaletteProp>("success");
  return (
    <Box>
      <Sheet
        variant="solid"
        color={color}
        invertedColors
        sx={{
          bgcolor: `${color}.600`,
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
            <Grid xs={5}>
              <Box>
                <Box>
                  <Image src={logo} alt="logo-image" />
                  <Typography>
                    London Property Inspections team are certified top quality
                    engineers ready to provide you with all types of landlord
                    safety certificates in London and the M25 area for domestic
                    and commercial purposes.
                  </Typography>
                </Box>
                <Box sx={{ paddingY: "10px" }}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                      marginBottom: "5px",
                    }}
                  >
                    <PhoneIcon />
                    <Typography component="span" sx={{ marginLeft: "8px" }}>
                      0191 743 1448
                    </Typography>
                  </Typography>
                  <Typography sx={{ display: "flex", fontSize: "18px" }}>
                    <MailIcon />
                    <Typography component="span" sx={{ marginLeft: "8px" }}>
                      info@londonpropertyinspections.co.uk
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <FacebookIcon
                    sx={{
                      backgroundColor: "#8cbff5",
                      padding: "5px",
                      color: "black",
                      margin: "5px",
                      borderRadius: "50%",
                      fontSize: "32px",
                    }}
                  />
                  <InstagramIcon
                    sx={{
                      backgroundColor: "#8cbff5",
                      padding: "5px",
                      color: "black",
                      margin: "5px",
                      borderRadius: "50%",
                      fontSize: "32px",
                    }}
                  />
                  <YouTubeIcon
                    sx={{
                      backgroundColor: "#8cbff5",
                      padding: "5px",
                      color: "black",
                      margin: "5px",
                      borderRadius: "50%",
                      fontSize: "32px",
                    }}
                  />
                  <XIcon
                    sx={{
                      backgroundColor: "#8cbff5",
                      padding: "5px",
                      color: "black",
                      margin: "5px",
                      borderRadius: "50%",
                      fontSize: "32px",
                    }}
                  />
                </Box>
                <Box>
                  <Image
                    width={350}
                    height={100}
                    objectFit="contain"
                    src={payment}
                    alt="payment-image"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid xs={3}>
              <List>
                <ListItem nested sx={{}}>
                  <ListSubheader
                    sx={{ fontSize: "18px", fontWeight: "xl", color: "white" }}
                  >
                    Quick Links
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
            <Grid xs={4}>
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
          </Grid>
        </Container>
      </Sheet>
      <Box></Box>
    </Box>
  );
}
