"use client";

import HookFormError from "@/app/_components/common/hook-form-error";

import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { createQueryString, isObjectEmpty } from "@/shared/functions";
import { ServiceFormInput } from "@/types/form";
import { Order } from "@/types/misc";
import { usePathname, useRouter } from "next/navigation";
// import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/joy";

export default function ServiceDetails({
  order,
  setOrder,
}: {
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    watch,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormInput>({
    defaultValues: {
      propertyType: "residential",
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
        component="h2"
        level="h3"
        sx={{
          mb: 5,
        }}
      >
        1. Service Details
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
                  mt: 1,
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
                <RadioGroup {...field}>
                  <Radio
                    value={1}
                    disabled={!isGas}
                    label={
                      <Typography>
                        1 Applicance -{" "}
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
                    value={2}
                    disabled={!isGas}
                    label={
                      <Typography>
                        2 Applicances -{" "}
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
                  <Radio
                    value={3}
                    disabled={!isGas}
                    label={
                      <Typography>
                        3 Applicances -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( £120 )
                        </Typography>
                      </Typography>
                    }
                  />
                </RadioGroup>
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
                <RadioGroup {...field}>
                  <Radio
                    disabled={!isEicr}
                    value={1}
                    label={
                      <Typography>
                        1 Unit -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( £150 )
                        </Typography>
                      </Typography>
                    }
                  />

                  <Radio
                    disabled={!isEicr}
                    value={2}
                    label={
                      <Typography>
                        2 Units -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( £200 )
                        </Typography>
                      </Typography>
                    }
                  />
                  <Radio
                    disabled={!isEicr}
                    value={3}
                    label={
                      <Typography>
                        3 Units -{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                          }}
                        >
                          ( Call for Price )
                        </Typography>
                      </Typography>
                    }
                  />
                </RadioGroup>
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

        <Box>
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

                  {/* {time === "other" && (
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
                  )} */}
                </RadioGroup>

                <HookFormError name="date" errors={errors} />
                <HookFormError name="time" errors={errors} />
              </FormControl>
            )}
          />
        </Box>
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
