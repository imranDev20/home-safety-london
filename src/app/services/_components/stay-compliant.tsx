import React from "react";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/joy";
import { FireRiskIcon } from "@/app/_components/common/icons";

const BOOKING_SYSTEM = [
  {
    id: 1,
    bookingName: "Our Qualified Engineers",
    bookingDetail: "Over 30 Years Experience",
  },
  {
    id: 2,
    bookingName: "Low Price Promise",
    bookingDetail: "We won't be beaten on price.",
  },
  {
    id: 3,
    bookingName: "Fast Response",
    bookingDetail: "Arrange an appointment, as early as tomorrow",
  },
  {
    id: 4,
    bookingName: "Book Any Time",
    bookingDetail: "Book at a time that works for you",
  },
];

export default function StayCompliant() {
  return (
    <Container component="section" sx={{ py: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 32, fontWeight: 600, marginBottom: 2 }}>
          Stay Safe & Compliant
        </Typography>
        <Typography>
          Qualified to carry out a vast range of safety checks Our Landlords
          Checks expert engineers are qualified to carry out a range of safety
          checks & issue safety certificates to Landlords Businesses &
          Homeowners in London & M25 area. Our experienced engineers are Gas
          Safe- registered and Stroma- registered. Our engineers hold NICEIC
          certification.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ py: 5 }}>
        {BOOKING_SYSTEM.map((book) => (
          <Grid xs={3} key={book.id}>
            <Card variant="soft" sx={{ height: "100%" }}>
              <FireRiskIcon sx={{ fontSize: 55, mx: "auto" }} />
              <Typography level="title-md">{book.bookingName}</Typography>
              <Typography>{book.bookingDetail}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="solid">Book Online Now</Button>
      </Box>
    </Container>
  );
}
