"use client";
import HookFormError from "@/app/_components/common/hook-form-error";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { createQueryString, isObjectEmpty } from "@/shared/functions";
import { ServiceFormInput } from "@/types/form";
import { Order } from "@/types/misc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Sheet,
  Stack,
  Typography,
  sheetClasses,
  radioClasses,
  formLabelClasses,
  useTheme,
  styled,
} from "@mui/joy";
import { CheckCircleRounded, CorporateFare, Home } from "@mui/icons-material";

type PropertyType = "residential" | "commercial";

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  flexDirection: "row",
  gap: "12px",

  [`& .${sheetClasses.root}`]: {
    flex: 1,
  },
  [`& .${radioClasses.checked}`]: {
    [`& .${radioClasses.action}`]: {
      inset: -1,
      border: "3px solid",
      borderColor: "primary.500",
    },
  },
  [`& .${formLabelClasses.root}`]: {
    textAlign: "center",
    width: "100%",
  },
  [`& .${radioClasses.radio}`]: {
    display: "contents",

    "& > svg": {
      zIndex: 2,
      position: "absolute",
      top: "-8px",
      right: "-8px",
      bgcolor: "background.surface",
      borderRadius: "50%",
    },
  },
}));

export default function ServiceDetails({
  order,
  setOrder,
}: {
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
}) {
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
      isGas: order.isGas || false,
      isEicr: order.isEicr || false,
      isEpc: order.isEpc || false,
      appliances: order.appliances || "",
      fuseBoards: order.fuseBoards || "",
      bedRooms: order.bedRooms || "",
      tflZone: order.tflZone || "",
      time: order.time || "",
      date: order.date || null,
    },
  });

  const isGas = watch("isGas");
  const isEicr = watch("isEicr");
  const isEpc = watch("isEpc");
  const time = watch("time");
  const propertyType = watch("propertyType");

  const handleServiceDetailsSubmit: SubmitHandler<ServiceFormInput> = (
    data
  ) => {
    setOrder({ ...order, ...data, isServiceStepComplete: true });
    router.push(pathname + "?" + createQueryString("active_step", "2"));
    window.scrollTo(0, 300);
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
        control={control}
        name="propertyType"
        render={({ field }) => (
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
                          color: theme.colorSchemes.light.palette.primary[600],
                        }}
                      />
                      <Typography>{option.value}</Typography>
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
          mb: 3,
        }}
      >
        Select Property Type
      </Typography>

      <RadioGroup
        size="lg"
        sx={{ gap: 1.5, mb: 5, display: "flex", flexDirection: "row" }}
      >
        {[
          {
            value: "Flat",
            Icon: Home,
          },
          {
            value: "House",
            Icon: CorporateFare,
          },
          {
            value: "HMO",
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
                  <Typography>{option.value}</Typography>
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

      <Typography
        component="h3"
        level="h4"
        sx={{
          mt: 6,
          mb: 3,
        }}
      >
        Select Services
      </Typography>

      <Stack spacing={5}>
        <Box>
          <Controller
            control={control}
            rules={{
              required: {
                value: !isEicr && !isEpc,
                message: "You must select a service",
              },
            }}
            name="isGas"
            render={({ field: { value, onChange } }) => (
              <FormControl error={!!errors.isGas}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,

                    "& > div": { p: 2, borderRadius: "md", display: "flex" },
                  }}
                >
                  <Sheet variant="outlined">
                    <Checkbox
                      checked={value}
                      required={!isEicr && !isEpc}
                      onChange={(e) => {
                        onChange(e.target.checked);

                        setValue("appliances", "");
                        setOrder({ ...order, appliances: "" });

                        clearErrors("isEicr");
                        clearErrors("isEpc");
                        clearErrors("isGas");
                      }}
                      label={
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 500,
                          }}
                        >
                          Gas
                        </Typography>
                      }
                    />
                  </Sheet>
                </Box>
                <HookFormError name="isGas" errors={errors} />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="appliances"
            rules={{
              required: {
                value: isGas,
                message: "Please select the number of appliances",
              },
            }}
            render={({ field }) => (
              <FormControl
                disabled={!isGas}
                sx={{
                  mt: 3,
                }}
                error={!!errors.appliances}
              >
                <FormLabel
                  sx={{
                    fontSize: 18,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  How many gas appliances does your property have?
                </FormLabel>

                <StyledRadioGroup
                  {...field}
                  overlay
                  name="platform"
                  sx={{
                    opacity: isGas ? 1 : 0.5,
                  }}
                >
                  {[
                    { label: "1 appliance", value: "1", price: 120 },
                    { label: "2 appliances", value: "2", price: 120 },
                    { label: "3 appliances", value: "3", price: 120 },
                  ].map((option) => (
                    <Sheet
                      key={option.value}
                      variant="outlined"
                      sx={{
                        borderRadius: "md",
                        boxShadow: "sm",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1.5,
                        p: 2,
                        minWidth: 120,
                      }}
                    >
                      <Radio
                        id={option.value}
                        disabled={!isGas}
                        value={option.value}
                        checkedIcon={<CheckCircleRounded />}
                      />

                      <FormLabel
                        htmlFor={option.value}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>{option.label}</Typography>
                        <Typography level="body-lg" color="primary">
                          £{option.price}
                        </Typography>
                      </FormLabel>
                    </Sheet>
                  ))}
                </StyledRadioGroup>
                <HookFormError name="appliances" errors={errors} />
              </FormControl>
            )}
          />
        </Box>

        <Box>
          <Controller
            name="isEicr"
            rules={{
              required: {
                value: !isGas && !isEpc,
                message: "You must select a service",
              },
            }}
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControl error={!!errors.isEicr}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,

                    "& > div": { p: 2, borderRadius: "md", display: "flex" },
                  }}
                >
                  <Sheet variant="outlined">
                    <Checkbox
                      checked={value}
                      required={!isGas && !isEpc}
                      onChange={(e) => {
                        onChange(e.target.checked);

                        setValue("fuseBoards", "");
                        setOrder({ ...order, fuseBoards: "" });

                        clearErrors("isEicr");
                        clearErrors("isEpc");
                        clearErrors("isGas");
                      }}
                      label={
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 500,
                          }}
                        >
                          EICR
                        </Typography>
                      }
                    />
                  </Sheet>
                </Box>
                <HookFormError name="isEicr" errors={errors} />
              </FormControl>
            )}
          />

          <Controller
            name="fuseBoards"
            control={control}
            rules={{
              required: {
                value: isEicr,
                message: "Please select the number of fuse boards",
              },
            }}
            render={({ field }) => (
              <FormControl sx={{ mt: 1 }} disabled={!isEicr}>
                <FormLabel
                  sx={{
                    fontSize: 18,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  How many Fuse Boards does your property have?
                </FormLabel>

                <HookFormError name="fuseBoards" errors={errors} />
              </FormControl>
            )}
          />
        </Box>

        <Box>
          <Controller
            control={control}
            name="isEpc"
            rules={{
              required: {
                value: !isGas && !isEicr,
                message: "You must select a service",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <FormControl>
                <Checkbox
                  checked={value}
                  required={!isEicr && !isGas}
                  onChange={(e) => {
                    onChange(e.target.checked);

                    setValue("bedRooms", "");
                    setOrder({ ...order, bedRooms: "" });

                    clearErrors("isEicr");
                    clearErrors("isEpc");
                    clearErrors("isGas");
                  }}
                  label={
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 500,
                      }}
                    >
                      EPC
                    </Typography>
                  }
                />
                <HookFormError name="isEpc" errors={errors} />
              </FormControl>
            )}
          />

          <Controller
            name="bedRooms"
            control={control}
            rules={{
              required: {
                value: isEpc,
                message: "Please select the number of bedrooms",
              },
            }}
            render={({ field }) => (
              <FormControl
                sx={{ mt: 1 }}
                disabled={!isEpc}
                error={!!errors.bedRooms}
              >
                <FormLabel
                  sx={{
                    fontSize: 18,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  How many Bed Rooms does your property has?
                </FormLabel>
                <RadioGroup {...field}>
                  <Radio
                    disabled={!isEpc}
                    value="0-3"
                    label={
                      <Typography>
                        0-3 Bedrooms -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( £80 )
                        </Typography>
                      </Typography>
                    }
                  />
                  <Radio
                    disabled={!isEpc}
                    value="4-6"
                    label={
                      <Typography>
                        4-6 Bedrooms -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( £100 )
                        </Typography>
                      </Typography>
                    }
                  />
                </RadioGroup>
                <HookFormError name="bedRooms" errors={errors} />
              </FormControl>
            )}
          />
        </Box>

        {/* <Box>
          <Controller
            name="tflZone"
            control={control}
            rules={{
              required: "TFL Zone information is required",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.tflZone}>
                <FormLabel
                  sx={{
                    fontSize: 18,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Is your property inside TFL Zone 1 or outside TFL Zone 5?
                </FormLabel>
                <RadioGroup {...field}>
                  <Radio value="no" label="No" />
                  <Radio
                    value="inside_tfl_1"
                    label={
                      <Typography>
                        Inside TFL Zone 1 -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( +£30 )
                        </Typography>
                      </Typography>
                    }
                  />
                  <Radio
                    value="outside_tfl_5"
                    label={
                      <Typography>
                        Outside TFL Zone 5 -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( +£10 )
                        </Typography>
                      </Typography>
                    }
                  />
                </RadioGroup>
                <HookFormError name="tflZone" errors={errors} />
              </FormControl>
            )}
          />
        </Box>

        <Box>
          <Controller
            control={control}
            name="time"
            rules={{
              required: "Time information is required",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.time}>
                <FormLabel
                  sx={{
                    fontSize: 18,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  When do you want the service?
                </FormLabel>
                <RadioGroup {...field}>
                  <Radio
                    value="24"
                    label={
                      <Typography>
                        Within the next 24 Hour -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( +£100 )
                        </Typography>
                      </Typography>
                    }
                  />
                  <Radio
                    value="48"
                    label={
                      <Typography>
                        Within the next 48 Hours -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( +£40 )
                        </Typography>
                      </Typography>
                    }
                  />
                  <Radio value="other" label="Some other time" />

                  {time === "other" && (
                    <Controller
                      name="date"
                      rules={{
                        required: "Please specify the date",
                      }}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          minDate={daysBefore()}
                          format="DD/MM/YYYY"
                          {...field}
                          sx={{
                            mt: 1,
                          }}
                          slotProps={{
                            textField: { size: "small" },
                          }}
                        />
                      )}
                    />
                  )}
                </RadioGroup>

                <HookFormError name="date" errors={errors} />
                <HookFormError name="time" errors={errors} />
              </FormControl>
            )}
          />
        </Box> */}
      </Stack>

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
