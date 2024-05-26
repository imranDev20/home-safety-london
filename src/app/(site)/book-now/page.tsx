"use client";
import { useEffect } from "react";
import Box from "@mui/joy/Box";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import PageHeader from "../../_components/common/page-header";
import BackgroundImage from "@/images/about-bg.jpeg";
import Paragraph from "../../_components/common/paragraph";
import { useSearchParams } from "next/navigation";
import ServiceDetails from "./_components/service-details";
import PersonalDetails from "./_components/personal-details";
import Confirmation from "./_components/confirmation";
import Payments from "./_components/payments";
import Heading from "@/app/_components/common/heading";
import BookNowStepper from "./_components/book-now-stepper";

export default function BookNowPage() {
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;
  const theme = useTheme();

  // useEffect(() => {
  //   window.scrollTo(0, 300);
  // }, [activeStep]);

  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
      }}
    >
      <PageHeader backgroundImage={BackgroundImage} title="Book Now" />

      <Container
        maxWidth="lg"
        sx={{
          my: 7,
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            mb: 3,
            display: {
              xs: "flex",
              md: "none",
            },
          }}
        >
          <CircularProgress
            sx={{
              "--CircularProgress-trackColor": theme.palette.secondary[200],
              "--CircularProgress-size": "60px",
            }}
            determinate
            value={100 / (4 - activeStep)}
          >
            {activeStep} / 3
          </CircularProgress>

          <Stack justifyContent="center">
            <Typography fontWeight={600} fontSize={24}>
              {activeStep === 1 && "Property Details"}
              {activeStep === 2 && "Confirmation & Payment"}
              {activeStep === 3 && "Confirmation & Payment"}
            </Typography>

            <Typography fontWeight={500} fontSize={16} color="neutral">
              {activeStep === 1 && "Next: Personal Details"}
              {activeStep === 2 && "Next: Confirmation & Payment"}
              {activeStep === 3 && "Next: Complete Order"}
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          <Grid xs={12} lg={8}>
            <BookNowStepper />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{
            position: "relative",
          }}
        >
          <Grid xs={12} lg={8}>
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
                {activeStep === 3 || activeStep === 4 ? <Confirmation /> : null}
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
