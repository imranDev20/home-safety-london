"use client";
import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import { Card, CardContent, Container, Grid, Typography } from "@mui/joy";
import PageHeader from "../../_components/common/page-header";
import BackgroundImage from "@/images/about-bg.jpeg";
import Paragraph from "../../_components/common/paragraph";
import { Order } from "@/types/misc";
import { useSearchParams } from "next/navigation";
import ServiceDetails from "./_components/service-details";
import PersonalDetails from "./_components/personal-details";
import Confirmation from "./_components/confirmation";
import Payments from "./_components/payments";
import Heading from "@/app/_components/common/heading";

export default function BookNowPage() {
  const searchParams = useSearchParams();

  const [order, setOrder] = useState<Order>({
    isGas: false,
    isEpc: false,
    isEicr: false,
    appliances: "",
    fuseBoards: "",
    bedRooms: "",
    tflZone: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    house: "",
    postCode: "",
    city: "",
    date: null,
  });

  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;

  useEffect(() => {
    window.scrollTo(0, 300);
  }, [activeStep]);

  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
      }}
    >
      <PageHeader backgroundImage={BackgroundImage} title="Request a Quote" />

      <Heading sx={{ textAlign: "center", mb: 1, mt: 7 }}>
        3 Simple Steps to Your Quote
      </Heading>
      <Paragraph
        color="neutral"
        sx={{ maxWidth: 700, mx: "auto", textAlign: "center", mb: 5 }}
      >
        Obtaining a quote for our landlord safety certification services is
        quick and easy. Follow our three simple steps to get a quote tailored to
        your needs.
      </Paragraph>

      <Container
        maxWidth="lg"
        sx={{
          pb: 7,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            position: "relative",
          }}
        >
          <Grid xs={12} sm={8}>
            <Card
              variant="plain"
              size="lg"
              sx={{
                boxShadow: "md",
              }}
            >
              <CardContent>
                {activeStep === 1 || Number.isNaN(activeStep) ? (
                  <ServiceDetails />
                ) : null}
                {activeStep === 2 ? <PersonalDetails /> : null}

                {activeStep === 3 ? <Confirmation order={order} /> : null}

                <Payments activeStep={activeStep} order={order} />
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={4}>
            <Card
              variant="plain"
              size="lg"
              sx={{
                boxShadow: "md",
                position: "sticky",
                top: 20,
              }}
            >
              <Typography
                component="h3"
                level="h4"
                sx={{
                  mb: 3,
                }}
              >
                Cart Summary
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
