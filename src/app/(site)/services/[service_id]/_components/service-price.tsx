import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function ServicePrice() {
  return (
    <Container
      sx={{
        my: 20,
      }}
    >
      <Grid container spacing={4} sx={{ px: 8 }}>
        {[0, 1].map((item) => (
          <Grid xs={6} key={item}>
            <Box>
              <Card
                variant="outlined"
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography component="h3" level="h2">
                  Residential EICR Cost
                </Typography>
                <Typography level="body-sm">
                  Price based on the number of bedrooms in a property
                </Typography>
                <Divider
                  inset="none"
                  sx={{
                    my: 1,
                  }}
                />
                <Typography color="primary">
                  Below prices are all tax inclusive
                </Typography>
                <List
                  size="md"
                  sx={{
                    mx: "calc(-1 * var(--ListItem-paddingX))",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItem>
                    <ListItemDecorator>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemDecorator>
                    Studio Flat £79
                  </ListItem>
                </List>

                <Button variant="solid">Book Now</Button>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
