"use client";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/shared/functions";

const steps = [
  {
    name: "Property Details",
    number: 1,
  },
  {
    name: "Personal Details",
    number: 2,
  },
  {
    name: "Complete Order",
    number: 3,
  },
];

export default function BookNowStepper() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;

  const handleStep = (stepNumber: number) => {
    router.push(
      pathname + "?" + createQueryString("active_step", stepNumber.toString()),
      { scroll: false }
    );
  };

  return (
    <Stepper
      sx={{
        width: "100%",
        mb: 5,
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      {steps.map((step, index) => (
        <Step
          key={step.number}
          indicator={
            <StepIndicator
              variant={activeStep <= index ? "soft" : "solid"}
              color={activeStep < index ? "neutral" : "primary"}
            >
              {activeStep <= index ? index + 1 : <Check />}
            </StepIndicator>
          }
          sx={{
            "&::after": {
              ...(activeStep > index &&
                index !== 2 && { bgcolor: "primary.solidBg" }),
            },
          }}
        >
          <StepButton onClick={() => handleStep(step.number)}>
            {step.name}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
