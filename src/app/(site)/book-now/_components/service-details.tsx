"use client";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createQueryString, isObjectEmpty } from "@/shared/functions";
import { ServiceFormInput, ServiceType } from "@/types/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
  useTheme,
  Grid,
} from "@mui/joy";
import { CorporateFare, Home } from "@mui/icons-material";
import HookFormError from "@/app/_components/common/hook-form-error";

type PropertyType = "residential" | "commercial";

const PRICING = [
  {
    serviceName: "EICR - Electrical Certificate",
    unit: "fuse box",
    mininumAmount: 1,
    bedroomWisePrice: [
      {
        bedroom: "studio_flat",
        firstUnitCost: 79,
        extraUnitCost: 80,
      },
      {
        bedroom: "1",
        firstUnitCost: 99,
        extraUnitCost: 80,
      },
      {
        bedroom: "2",
        firstUnitCost: 99,
        extraUnitCost: 80,
      },
      {
        bedroom: "3",
        firstUnitCost: 119,
        extraUnitCost: 80,
      },
      {
        bedroom: "4",
        firstUnitCost: 119,
        extraUnitCost: 80,
      },
      {
        bedroom: "5",
        firstUnitCost: 119,
        extraUnitCost: 80,
      },
    ],
  },
];

const RESIDENTIAL_SERVICES = [
  {
    id: 1,
    title: "EICR - Electrical Certificate",
    name: "eicr",
  },
  {
    id: 2,
    title: "Gas Safety Certificate",
    name: "gas_cert",
  },
  {
    id: 3,
    title: "Energy Performance Certificate",
    name: "epc",
  },
  {
    id: 4,
    title: "PAT Testing",
    name: "pat",
  },
  {
    id: 5,
    title: "Gas Safety Certificate + Boiler Service",
    name: "gas_boiler",
  },
  {
    id: 6,
    title: "Fire Safety Certificate",
    name: "fire_safety",
  },
  {
    id: 7,
    title: "Fire Risk Assessment",
    name: "fire_risk",
  },
  {
    id: 8,
    title: "Emergency Lighting Certificate",
    name: "emergency_light",
  },
];

const COMMERCIAL_SERVICES = [
  {
    id: 1,
    title: "EICR - Electrical Certificate",
    name: "com_eicr",
  },
  {
    id: 2,
    title: "PAT Testing",
    name: "com_pat",
  },
  {
    id: 3,
    title: "Fire Safety Certificate",
    name: "com_fire_safety",
  },
];

export default function ServiceDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();

  const {
    control,
    watch,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormInput>({
    defaultValues: {
      propertyType:
        (searchParams.get("property_type") as PropertyType) || "residential",
      propertySubtype: "",
      bedrooms: "",
    },
  });

  const propertyType = watch("propertyType");

  const ServicesBySelectedType =
    propertyType === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;

  const handleServiceDetailsSubmit: SubmitHandler<ServiceFormInput> = (
    data
  ) => {
    console.log(data);
    // router.push(pathname + "?" + createQueryString("active_step", "2"));
    // window.scrollTo(0, 300);
  };

  const daysBefore = () => {
    const today = dayjs();
    return dayjs(today.set("hour", today.get("hour") + 72));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleServiceDetailsSubmit)}
      noValidate
    >
      {/* <SnackbarProvider /> */}
      <Typography
        component="h3"
        level="h4"
        sx={{
          mb: 3,
        }}
      >
        Select Type
      </Typography>

      <Controller
        rules={{
          required: {
            value: true,
            message: "Property type is required",
          },
        }}
        control={control}
        name="propertyType"
        render={({ field }) => (
          <FormControl>
            <RadioGroup
              {...field}
              size="lg"
              sx={{ gap: 1.5, mb: 5, display: "flex", flexDirection: "row" }}
            >
              {[
                {
                  value: "residential",
                  Icon: Home,
                },
                {
                  value: "commercial",
                  Icon: CorporateFare,
                },
              ].map((option) => (
                <Sheet
                  key={option.value}
                  sx={{
                    p: 2,
                    borderRadius: "md",
                    boxShadow: "sm",
                    flex: 1,
                  }}
                >
                  <Radio
                    label={
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <option.Icon
                          sx={{
                            mr: 1,
                            color:
                              theme.colorSchemes.light.palette.primary[600],
                          }}
                        />
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {option.value}
                        </Typography>
                      </Box>
                    }
                    overlay
                    disableIcon
                    value={option.value}
                    slotProps={{
                      label: ({ checked }) => ({
                        sx: {
                          fontWeight: "lg",
                          fontSize: "md",
                          color: checked ? "text.primary" : "text.secondary",
                        },
                      }),
                      action: ({ checked }) => ({
                        sx: (theme) => ({
                          ...(checked && {
                            "--variant-borderWidth": "2px",
                            "&&": {
                              // && to increase the specificity to win the base :hover styles
                              borderColor: theme.vars.palette.primary[500],
                            },
                          }),
                        }),
                      }),
                    }}
                  />
                </Sheet>
              ))}
            </RadioGroup>
            <HookFormError name="propertyType" errors={errors} />
          </FormControl>
        )}
      />

      {propertyType === "residential" && (
        <>
          <Typography
            component="h3"
            level="h4"
            sx={{
              mb: 3,
            }}
          >
            Select Property Type
          </Typography>
          <Controller
            control={control}
            name="propertySubtype"
            render={({ field }) => (
              <RadioGroup
                size="lg"
                sx={{ gap: 1.5, mb: 5, display: "flex", flexDirection: "row" }}
                {...field}
              >
                {[
                  {
                    value: "flat",
                    name: "Flat",
                    Icon: Home,
                  },
                  {
                    value: "house",
                    name: "House",
                    Icon: CorporateFare,
                  },
                  {
                    value: "hmo",
                    name: "HMO",
                    Icon: CorporateFare,
                  },
                ].map((option) => (
                  <Sheet
                    key={option.value}
                    sx={{
                      p: 2,
                      borderRadius: "md",
                      boxShadow: "sm",
                      flex: 1,
                    }}
                  >
                    <Radio
                      label={
                        <Box>
                          <Typography>{option.name}</Typography>
                        </Box>
                      }
                      overlay
                      disableIcon
                      value={option.value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary",
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500],
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            )}
          />
          <Typography
            component="h3"
            level="h4"
            sx={{
              mt: 6,
              mb: 3,
            }}
          >
            Number of Bedrooms
          </Typography>

          <Controller
            control={control}
            name="bedrooms"
            render={({ field }) => (
              <RadioGroup
                size="lg"
                sx={{
                  gap: 1.5,
                  mb: 5,
                }}
                {...field}
              >
                <Grid container spacing={2}>
                  {["Studio Flat", "1", "2", "3", "4", "5"].map(
                    (option, index) => (
                      <Grid xs={6} key={option}>
                        <Sheet
                          key={option}
                          sx={{
                            p: 2,
                            borderRadius: "md",
                            boxShadow: "sm",
                          }}
                        >
                          <Radio
                            label={
                              <Box>
                                <Typography>{`${option} ${
                                  index !== 0 ? "Bedrooms" : ""
                                }`}</Typography>
                              </Box>
                            }
                            overlay
                            disableIcon
                            value={option}
                            slotProps={{
                              label: ({ checked }) => ({
                                sx: {
                                  fontWeight: "lg",
                                  fontSize: "md",
                                  color: checked
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }),
                              action: ({ checked }) => ({
                                sx: (theme) => ({
                                  ...(checked && {
                                    "--variant-borderWidth": "2px",
                                    "&&": {
                                      // && to increase the specificity to win the base :hover styles
                                      borderColor:
                                        theme.vars.palette.primary[500],
                                    },
                                  }),
                                }),
                              }),
                            }}
                          />
                        </Sheet>
                      </Grid>
                    )
                  )}
                </Grid>
              </RadioGroup>
            )}
          />
        </>
      )}

      <Typography
        component="h3"
        level="h4"
        sx={{
          mt: 6,
          mb: 3,
        }}
      >
        Choose Your Services
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          "& > div": { borderRadius: "md", display: "flex" },
        }}
      >
        <Grid container spacing={2}>
          {ServicesBySelectedType.map((option) => (
            <Grid xs={12} md={6} key={option.id}>
              <Sheet
                sx={{
                  p: 2,
                  borderRadius: "md",
                  boxShadow: "sm",
                }}
              >
                <Controller
                  control={control}
                  name={option.name as ServiceType}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value || false}
                      onChange={(e) => onChange(e.target.checked)}
                      label={
                        <Box>
                          <Typography>{option.title}</Typography>
                        </Box>
                      }
                      overlay
                      disableIcon
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary",
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",

                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                backgroundColor: "transparent",
                                border: "2px solid",
                                borderColor: theme.vars.palette.primary[500],
                                ":hover": {
                                  backgroundColor:
                                    theme.vars.palette.primary[100],
                                },
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  )}
                />
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl error={!isObjectEmpty(errors)}>
          <FormHelperText
            sx={{
              fontSize: 16,
            }}
          >
            {!isObjectEmpty(errors) && "Please select all the necessary fields"}
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="solid"
          sx={{
            mt: 5,
          }}
        >
          Next: Personal Details
        </Button>
      </Box>
    </Box>
  );
}
