"use client";

import HookFormError from "@/app/_components/common/hook-form-error";
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
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { createQueryString, isObjectEmpty } from "@/shared/functions";
import { ServiceFormInput } from "@/types/form";
import { Order } from "@/types/misc";
import { usePathname, useRouter } from "next/navigation";
// import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
        level="title-lg"
        sx={{
          mb: 3,
        }}
      >
        1. Service Details
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12}>
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
              <FormControlLabel
                control={
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
                  />
                }
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
            )}
          />

          <HookFormError name="isGas" errors={errors} />

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
                fullWidth
                sx={{
                  mt: 1,
                }}
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
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
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
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
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
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
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
              </FormControl>
            )}
          />
          <HookFormError name="appliances" errors={errors} />
        </Grid>

        <Grid xs={12}>
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
              <FormControlLabel
                control={
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
                  />
                }
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
            )}
          />
          <HookFormError name="isEicr" errors={errors} />

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
              <FormControl fullWidth sx={{ mt: 1 }} disabled={!isEicr}>
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
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
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
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
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
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
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
              </FormControl>
            )}
          />
          <HookFormError name="fuseBoards" errors={errors} />
        </Grid>

        <Grid xs={12}>
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
              <FormControlLabel
                control={
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
                  />
                }
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
            )}
          />
          <HookFormError name="isEpc" errors={errors} />

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
              <FormControl fullWidth sx={{ mt: 1 }} disabled={!isEpc}>
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
                  <FormControlLabel
                    value="0-3"
                    control={<Radio />}
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
                  <FormControlLabel
                    value="4-6"
                    control={<Radio />}
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
              </FormControl>
            )}
          />
          <HookFormError name="bedRooms" errors={errors} />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid xs={12}>
          <Controller
            name="tflZone"
            control={control}
            rules={{
              required: "TFL Zone information is required",
            }}
            render={({ field }) => (
              <FormControl fullWidth>
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
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel
                    value="inside_tfl_1"
                    control={<Radio />}
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
                  <FormControlLabel
                    value="outside_tfl_5"
                    control={<Radio />}
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
              </FormControl>
            )}
          />
          <HookFormError name="tflZone" errors={errors} />
        </Grid>

        <Grid xs={12}>
          <Controller
            control={control}
            name="time"
            rules={{
              required: "Time information is required",
            }}
            render={({ field }) => (
              <FormControl fullWidth>
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
                  <FormControlLabel
                    value="24"
                    control={<Radio />}
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
                  <FormControlLabel
                    value="48"
                    control={<Radio />}
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
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Some other time"
                  />

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
              </FormControl>
            )}
          />
          <HookFormError name="date" errors={errors} />
          <HookFormError name="time" errors={errors} />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormHelperText
          sx={{
            fontSize: 16,
          }}
        >
          {!isObjectEmpty(errors) && "Please select all the necessary fields"}
        </FormHelperText>
        <Button
          type="submit"
          variant="outlined"
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
