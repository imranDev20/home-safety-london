import { CorporateFare, Home, Textsms } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Link as JoyLink,
} from "@mui/joy";
import Link from "next/link";
import React from "react";

const BookNow = () => {
  return (
    <Card
      variant="solid"
      color="primary"
      sx={{
        borderRadius: "lg",
      }}
    >
      <CardContent>
        <Typography
          level="h2"
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          Book Now
        </Typography>

        <Typography
          sx={{
            color: "white",
            textAlign: "center",
          }}
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
            size="lg"
            component={Link}
            sx={{
              border: "1px solid white",
            }}
            href="/book-now?property_type=residential"
          >
            Residential Property
          </Button>
          <Button
            startDecorator={<CorporateFare />}
            size="lg"
            component={Link}
            sx={{
              border: "1px solid white",
            }}
            href="/book-now?property_type=commercial"
          >
            Commercial Property
          </Button>

          <Button
            startDecorator={<Textsms />}
            size="lg"
            color="secondary"
            component={JoyLink}
            href="#contact-us-form"
            underline="none"
          >
            Request a Quote
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookNow;
