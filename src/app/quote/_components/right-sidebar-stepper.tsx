import Box from "@mui/joy/Box";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Card, CardContent, Divider, Grid } from "@mui/joy";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const steps = [
  {
    label: "Service Details",
    optional: "Fitst Step",
  },
  {
    label: "Personal Details",
    optional: "Second Step",
  },
  {
    label: "Confirmation",
    optional: "Third Step",
  },
  {
    label: "Payment Details",
    optional: "Last Step",
  },
];

export default function RightSidebarStepper({
  activeStep,
}: {
  activeStep: number;
}) {
  const handleNext = () => {};

  const handleBack = () => {};

  console.log(activeStep);

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography component="h3">Order Completion</Typography>
          <Divider
            sx={{
              mb: 3,
            }}
          />
          <Stepper orientation="vertical">
            {steps.map((step) => (
              <Step key={step.label}>
                <Typography variant="solid">{step.optional}</Typography>
                <Typography
                  component="h4"
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  {step.label}
                </Typography>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={3} mt={3}>
            <Grid xs={6}>
              <Button
                disabled={activeStep === 1}
                fullWidth
                startDecorator={<ChevronLeft />}
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>

            <Grid xs={6}>
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                endDecorator={<ChevronRight />}
                onClick={handleNext}
              >
                {activeStep === 3 ? "Send" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
