"use client";
import HookFormError from "@/app/_components/common/hook-form-error";
import { PersonalFormInput } from "@/types/form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputProps,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Textarea,
  Typography,
  colors,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { isValid } from "postcode";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  createQueryString,
  getPreOrderIdFromLocalStorage,
  isObjectEmpty,
} from "@/shared/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPreOrder, updatePreOrder } from "@/services/pre-order.services";
import { PreOrderPersonalPayload } from "@/types/pre-order";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { CONGESTION_ZONE_OPTIONS, PARKING_OPTIONS } from "@/shared/constants";

const PhoneInputAdapter = React.forwardRef<InputProps, any>(
  function PhoneInputAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PhoneInput
        defaultCountry="GB"
        international={false}
        placeholder="Enter phone number"
        {...other}
        onChange={(value) => onChange(value)}
      />
    );
  }
);

export default function PersonalDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PersonalFormInput>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      house: "",
      postCode: "",
      city: "London",
      parkingOptions: "",
      congestionZone: "",
      inspectionDate: "",
      inspectionTime: "",
      orderNotes: "",
    },
  });

  const {
    data: preOrderData,
    isLoading: isPreOrderDataLoading,
    refetch: refetchPreOrder,
  } = useQuery({
    queryKey: ["pre-order"],
    queryFn: async () => {
      const preOrderId = getPreOrderIdFromLocalStorage();
      const response = await getPreOrder(preOrderId as string);
      return response.data;
    },
    enabled: false,
  });

  const { mutateAsync: preOrderMutate, isPending: isPreOrderMutatePending } =
    useMutation({
      mutationFn: async (preOrder: PreOrderPersonalPayload) => {
        const preOrderId = getPreOrderIdFromLocalStorage();
        const response = await updatePreOrder(
          preOrderId || undefined,
          preOrder
        );
        return response;
      },
    });

  useEffect(() => {
    const preOrderId = getPreOrderIdFromLocalStorage();
    if (preOrderId) {
      refetchPreOrder();
    }
  }, [refetchPreOrder]);

  useEffect(() => {
    if (preOrderData) {
      reset({
        name: preOrderData?.customer_name || "",
        email: preOrderData?.email || "",
        phone: preOrderData?.phone_no || "",
        house: preOrderData?.address?.street || "",
        postCode: preOrderData?.address?.postcode || "",
        city: preOrderData?.address?.city || "London",
        parkingOptions: preOrderData?.parking_options?.parking_type || "",
        congestionZone: preOrderData?.congestion_zone?.zone_type || "",
        inspectionDate: preOrderData?.inspection_date || "",
        inspectionTime: preOrderData?.inspection_time || "",
        orderNotes: preOrderData?.order_notes || "",
      });
    }
  }, [preOrderData, reset]);

  const onPersonalDetailsSubmit: SubmitHandler<PersonalFormInput> = async (
    data
  ) => {
    try {
      const selectedCongestionZone = CONGESTION_ZONE_OPTIONS.find(
        (option) => option.value === data.congestionZone
      );

      const selectedParkingOption = PARKING_OPTIONS.find(
        (option) => option.value === data.parkingOptions
      );

      const payload = {
        ...preOrderData,
        customer_name: data.name,
        email: data.email,
        phone_no: data.phone,
        address: {
          street: data.house,
          postcode: data.postCode,
          city: data.city,
        },
        parking_options: {
          parking_type: selectedParkingOption?.value as string,
          parking_cost: selectedParkingOption?.cost as number,
        },
        congestion_zone: {
          zone_type: selectedCongestionZone?.value as string,
          zone_cost: selectedCongestionZone?.cost as number,
        },
        inspection_date: data.inspectionDate,
        inspection_time: data.inspectionTime,
        order_notes: data.orderNotes,
        is_personal_details_complete: true,
      };

      const response = await preOrderMutate(payload);

      if (response?.success) {
        router.push(pathname + "?" + createQueryString("active_step", "3"));
        window.scrollTo(0, 300);
        enqueueSnackbar(response.message, "success");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, "error");
    }
  };

  if (isPreOrderDataLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          thickness={4}
          sx={{ "--CircularProgress-size": "100px" }}
        >
          Loading
        </CircularProgress>
      </Box>
    );
  }

  return (
    <>
      <Typography
        component="h3"
        level="h4"
        sx={{
          mb: 3,
        }}
      >
        Personal Details
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onPersonalDetailsSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name can't be empty",
              }}
              render={({ field }) => (
                <FormControl error={!!errors.name} size="lg">
                  <FormLabel>Name</FormLabel>
                  <Input {...field} fullWidth size="lg" variant="outlined" />
                  <HookFormError name="name" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid xs={12}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email can't be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              }}
              render={({ field }) => (
                <FormControl error={!!errors.email} size="lg">
                  <FormLabel>Email</FormLabel>
                  <Input {...field} fullWidth size="lg" variant="outlined" />
                  <HookFormError name="email" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={12}>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "You did not provide a phone number",
                validate: (value: string) => {
                  const valid = isValidPhoneNumber(value);

                  return valid || `Your provided phone number is not valid`;
                },
              }}
              render={({ field }) => (
                <FormControl error={!!errors.phone} size="lg">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    size="lg"
                    {...field}
                    slotProps={{
                      input: {
                        component: PhoneInputAdapter,
                      },
                    }}
                  />
                  <HookFormError name="phone" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        <Divider
          sx={{
            my: 5,
          }}
        />

        <Grid container spacing={3}>
          <Grid xs={12}>
            <Typography component="h3" level="h4">
              Address
            </Typography>
          </Grid>

          <Grid xs={12}>
            <Controller
              control={control}
              name="house"
              rules={{
                required: "House & Street can't be empty",
              }}
              render={({ field }) => (
                <FormControl error={!!errors.house} size="lg">
                  <FormLabel>House / Street</FormLabel>
                  <Input size="lg" {...field} fullWidth variant="outlined" />
                  <HookFormError name="house" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={6}>
            <Controller
              control={control}
              name="postCode"
              rules={{
                required: "Post code can't be empty",
                validate: (value) => {
                  return isValid(value) || "Not a valid British post code";
                },
              }}
              render={({ field: { value, onChange } }) => (
                <FormControl error={!!errors.postCode} size="lg">
                  <FormLabel>Post Code</FormLabel>
                  <Input
                    size="lg"
                    value={value}
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="postCode" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid xs={6}>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <FormControl error={!!errors.city} size="lg">
                  <FormLabel>City</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    disabled
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="city" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 5,
          }}
        />

        <Grid container spacing={3}>
          <Grid xs={12}>
            <Typography
              component="h3"
              level="h4"
              sx={{
                mb: 1.5,
              }}
            >
              Select Parking Options
            </Typography>
            <Controller
              control={control}
              name="parkingOptions"
              rules={{
                required: "Please select a parking option",
              }}
              render={({ field }) => (
                <FormControl error={!!errors.parkingOptions}>
                  <RadioGroup
                    size="lg"
                    sx={{
                      gap: 1.5,
                      display: "flex",
                      flexDirection: "row",
                    }}
                    {...field}
                  >
                    {PARKING_OPTIONS.map((option) => (
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
                                flexDirection: "column",
                              }}
                            >
                              <Typography>{option.name}</Typography>
                              <Typography
                                sx={{
                                  fontSize: 17,
                                  color: colors.green[400],
                                }}
                              >
                                + £{option.cost}
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
                    ))}
                  </RadioGroup>
                  <HookFormError name="parkingOptions" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={12}>
            <Typography
              component="h3"
              level="h4"
              sx={{
                mb: 1.5,
                mt: 3,
              }}
            >
              Is property in congestion zone?
            </Typography>
            <Controller
              control={control}
              name="congestionZone"
              rules={{
                required: "Please select area type",
              }}
              render={({ field }) => (
                <FormControl error={!!errors.congestionZone}>
                  <RadioGroup
                    size="lg"
                    sx={{
                      gap: 1.5,
                      display: "flex",
                      flexDirection: "row",
                    }}
                    {...field}
                  >
                    {CONGESTION_ZONE_OPTIONS.map((option) => (
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
                                flexDirection: "column",
                              }}
                            >
                              <Typography>{option.name}</Typography>
                              <Typography
                                sx={{
                                  fontSize: 17,
                                  color: colors.green[400],
                                }}
                              >
                                + £{option.cost}
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
                    ))}
                  </RadioGroup>
                  <HookFormError name="congestionZone" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Grid container spacing={3}>
          <Grid xs={6}>
            <Controller
              control={control}
              name="inspectionDate"
              rules={{
                required: "Inspection date can't be empty",
              }}
              render={({ field }) => (
                <FormControl error={!!errors.inspectionDate} size="lg">
                  <FormLabel>Select Inspection Date</FormLabel>

                  <Input
                    {...field}
                    type="date"
                    size="lg"
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="inspectionDate" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={6}>
            <Controller
              control={control}
              name="inspectionTime"
              rules={{
                required: "Inspection time can't be empty",
              }}
              render={({ field: { value, onChange } }) => (
                <FormControl error={!!errors.inspectionTime} size="lg">
                  <FormLabel>Select Inspection Time</FormLabel>
                  <Select
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    size="lg"
                    placeholder="Please select a slot"
                  >
                    <Option value="8 AM - 12 PM">08:00 AM - 12:00 PM</Option>
                    <Option value="12 PM - 4 PM">12:00 PM - 04:00 PM</Option>
                    <Option value="4 PM - 8 AM">04:00 AM - 08:00 PM</Option>
                  </Select>
                  <HookFormError name="inspectionTime" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={12}>
            <Controller
              control={control}
              rules={{
                maxLength: 250,
              }}
              name="orderNotes"
              render={({ field }) => (
                <FormControl
                  error={!!errors.orderNotes}
                  sx={{
                    mt: 2,
                  }}
                  size="lg"
                >
                  <FormLabel>Order Notes (Optional)</FormLabel>
                  <Textarea
                    {...field}
                    size="lg"
                    variant="outlined"
                    minRows={3}
                    slotProps={{
                      textarea: {
                        maxLength: 250,
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 1,
                    }}
                  >
                    <Typography
                      color={field.value.length > 250 ? "danger" : "neutral"}
                    >
                      {field.value.length}/{250}
                    </Typography>
                  </Box>
                  <HookFormError name="orderNotes" errors={errors} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

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
              {!isObjectEmpty(errors) &&
                "Please select all the necessary fields"}
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            sx={{
              mt: 5,
            }}
            loading={isPreOrderMutatePending}
            loadingPosition="end"
          >
            Next: Personal Details
          </Button>
        </Box>
      </Box>
    </>
  );
}
