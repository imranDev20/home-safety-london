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

const SERVICE_PRICING = [
  {
    id: 1,
    residential: [
      "Studio Flat £79",
      " 1-2 bedrooms £99",
      " 3-4 bedrooms £119",
      " 5-6 bedrooms £149",
    ],
  },
  {
    id: 2,
    commercial: [
      "1-5 circuits - £149",
      "6-10 circuits - £199",
      "11-20 circuits - £249",
    ],
  },
];

export default function ServicePrice() {
  return (
    <Container>
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
                <Typography level="body-xs">
                  Price based on the number of bedrooms in a property
                </Typography>
                <Divider inset="none" />
                <Typography>Below prices are all tax inclusive</Typography>
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
                      <CheckCircleOutlineIcon />
                    </ListItemDecorator>
                    Studio Flat £79
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <CheckCircleOutlineIcon />
                    </ListItemDecorator>
                    Studio Flat £79
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <CheckCircleOutlineIcon />
                    </ListItemDecorator>
                    Studio Flat £79
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <CheckCircleOutlineIcon />
                    </ListItemDecorator>
                    Studio Flat £79
                  </ListItem>
                </List>

                <Button variant="soft">Book now</Button>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
