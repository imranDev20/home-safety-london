"use client";
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
import { useSearchParams } from "next/navigation";
import ServiceDetails from "./_components/service-details";
import PersonalDetails from "./_components/personal-details";
import Confirmation from "./_components/confirmation";
import BookNowStepper from "./_components/book-now-stepper";

export default function BookNowPage() {
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
      }}
    >
      <PageHeader backgroundImage={BackgroundImage} title="Book Now" />

      <Container
        maxWidth="md"
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

        <Box
          sx={{
            mb: 2,
          }}
        >
          <BookNowStepper />
        </Box>

        <Box>
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
        </Box>
      </Container>
    </Box>
  );
}
