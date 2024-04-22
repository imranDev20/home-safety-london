import { CorporateFare, Home, Textsms } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import React from "react";

const BookNow = () => {
  return (
    <Card variant="plain">
      <CardContent>
        <Typography
          level="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Book Now
        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
          }}
          color="neutral"
        >
          Select Your Property as appropriate and get quote in 30 seconds!
        </Typography>

        <Stack
          spacing={2}
          sx={{
            mt: 3,
          }}
        >
          <Button
            startDecorator={<Home />}
            variant="outlined"
            color="primary"
            size="lg"
            component={Link}
            href="/book-now?property_type=residential"
          >
            Residential Property
          </Button>
          <Button
            startDecorator={<CorporateFare />}
            variant="outlined"
            color="primary"
            size="lg"
            component={Link}
            href="/book-now?property_type=commercial"
          >
            Commercial Property
          </Button>

          <Button startDecorator={<Textsms />} size="lg">
            Request a Quote
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookNow;
