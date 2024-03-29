"use client";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import { Card, CardContent, Container, Grid, Typography } from "@mui/joy";
import PageHeader from "../_components/common/page-header";
import BackgroundImage from "@/images/about-bg.jpeg";
import Paragraph from "../_components/common/paragraph";
import PersonalDetails from "./_components/personal-details";
import { Order } from "@/types/misc";
import { useSearchParams } from "next/navigation";
import Payments from "./_components/payments";
import Confirmation from "./_components/confirmation";
import Heading from "../_components/common/heading";
import ServiceDetails from "./_components/service-details";

export default function QuotePage() {
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
    isServiceStepComplete: false,
    name: "",
    email: "",
    phone: "",
    house: "",
    postCode: "",
    city: "",
    isPersonalStepComplete: false,
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
                  <ServiceDetails order={order} setOrder={setOrder} />
                ) : null}
                {activeStep === 2 ? (
                  <PersonalDetails order={order} setOrder={setOrder} />
                ) : null}

                {activeStep === 3 ? <Confirmation order={order} /> : null}

                {order.isPersonalStepComplete &&
                  order.isServiceStepComplete && (
                    <Payments activeStep={activeStep} order={order} />
                  )}
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
