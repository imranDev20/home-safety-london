"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  createQueryString,
  getPreOrderIdFromLocalStorage,
  isObjectEmpty,
  setPreOrderIdToLocalStorage,
  toSnakeCase,
} from "@/shared/functions";
import { ServiceFormInput } from "@/types/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  CircularProgress,
  Snackbar,
} from "@mui/joy";
import {
  CorporateFare,
  Home,
  PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import HookFormError from "@/app/_components/common/hook-form-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPreOrderById, updatePreOrder } from "@/services/pre-order.services";
import { useEffect, useState } from "react";
import { PreOrderServicesPayload } from "@/types/pre-order";
import { useSnackbar } from "@/app/_components/snackbar-provider";

type PropertyType = "residential" | "commercial";

const RESIDENTIAL_SERVICES = [
  {
    id: 1,
    title: "EICR - Electrical Certificate",
    name: "eicr",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "fuse box",
    extraUnitCost: 80,
  },
  {
    id: 2,
    title: "Gas Safety Certificate",
    name: "gas_cert",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "appliance",
    extraUnitCost: 10,
  },
  {
    id: 3,
    title: "Energy Performance Certificate",
    name: "epc",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 4,
    title: "PAT Testing",
    name: "pat",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 5,
    title: "Gas Safety Certificate + Boiler Service",
    name: "gas_boiler",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 6,
    title: "Fire Safety Certificate",
    name: "fire_safety",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 7,
    title: "Fire Risk Assessment",
    name: "fire_risk",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 8,
    title: "Emergency Lighting Certificate",
    name: "emergency_light",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
];

const COMMERCIAL_SERVICES = [
  {
    id: 1,
    title: "EICR - Electrical Certificate",
    name: "com_eicr",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 2,
    title: "PAT Testing",
    name: "com_pat",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 3,
    title: "Fire Safety Certificate",
    name: "com_fire_safety",
    priceData: [
      {
        bedrooms: "studio_flat",
        price: 79,
      },
      {
        bedrooms: "1",
        price: 99,
      },
      {
        bedrooms: "2",
        price: 99,
      },
      {
        bedrooms: "3",
        price: 119,
      },
      {
        bedrooms: "4",
        price: 119,
      },
      {
        bedrooms: "5",
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
];

export default function ServiceDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: preOrderData,
    isLoading: isPreOrderDataLoading,
    refetch: refetchPreOrder,
  } = useQuery({
    queryKey: ["pre-order"],
    queryFn: async () => {
      const preOrderId = getPreOrderIdFromLocalStorage();
      const response = await getPreOrderById(preOrderId as string);
      return response.data;
    },
    enabled: false,
  });

  useEffect(() => {
    const preOrderId = getPreOrderIdFromLocalStorage();
    if (preOrderId) {
      refetchPreOrder();
    }
  }, [refetchPreOrder]);

  const { mutateAsync: preOrderMutate, isPending: isPreOrderMutatePending } =
    useMutation({
      mutationFn: async (preOrder: PreOrderServicesPayload) => {
        const preOrderId = getPreOrderIdFromLocalStorage();
        const response = await updatePreOrder(
          preOrderId || undefined,
          preOrder
        );
        return response;
      },
    });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ServiceFormInput>({
    defaultValues: {
      propertyType:
        (searchParams.get("property_type") as PropertyType) || "residential",
      residentType: "",
      bedrooms: "",
      orderItems: [],
    },
  });

  const propertyType = watch("propertyType");

  useEffect(() => {
    if (preOrderData) {
      reset({
        propertyType: preOrderData.property_type,
        residentType: preOrderData.resident_type,
        bedrooms: preOrderData.bedrooms,
        orderItems: preOrderData.order_items.map((item: any) => item.name),
      });
    }
  }, [preOrderData, reset]);

  const ServicesBySelectedType =
    propertyType === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;

  const handleServiceDetailsSubmit: SubmitHandler<ServiceFormInput> = async (
    data
  ) => {
    try {
      if (data.orderItems.length === 0) {
        setError("orderItems", {
          type: "required",
          message: "Please select at least one service",
        });
        return;
      }

      const payload = {
        ...preOrderData,
        property_type: data.propertyType,
        ...(propertyType === "residential" && {
          resident_type: data.residentType,
          bedrooms: data.bedrooms,
        }),
        is_service_details_complete: true,
        order_items: ServicesBySelectedType.filter((el) =>
          data.orderItems.includes(el.name)
        ).map((item) => ({
          title: item.title,
          name: item.name,
          price: item.priceData.find((val) => val.bedrooms === data.bedrooms)
            ?.price as number,
          quantity: item.quantity,
          unit: item.unit,
        })),
      };

      const response = await preOrderMutate(payload);

      if (response?.status === "success") {
        router.push(pathname + "?" + createQueryString("active_step", "2"));
        window.scrollTo(0, 300);

        console.log(response);

        setPreOrderIdToLocalStorage(response.data._id);
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
    <Box
      component="form"
      onSubmit={handleSubmit(handleServiceDetailsSubmit)}
      noValidate
    >
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
          <FormControl error={!!errors.propertyType}>
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
            Select Resident Type
          </Typography>
          <Controller
            control={control}
            name="residentType"
            rules={{
              required: {
                value: true,
                message: "Resident type is required",
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.residentType}>
                <RadioGroup
                  size="lg"
                  sx={{
                    gap: 1.5,
                    display: "flex",
                    flexDirection: "row",
                  }}
                  {...field}
                >
                  {[
                    {
                      value: "flat",
                      name: "Flat",
                    },
                    {
                      value: "house",
                      name: "House",
                    },
                    {
                      value: "hmo",
                      name: "HMO",
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
                <HookFormError name="residentType" errors={errors} />
              </FormControl>
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
            rules={{
              required: {
                value: propertyType === "residential",
                message: "You must select number of bedrooms",
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.bedrooms}>
                <RadioGroup
                  size="lg"
                  sx={{
                    gap: 1.5,
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
                              value={toSnakeCase(option)}
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
                <HookFormError name="bedrooms" errors={errors} />
              </FormControl>
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
                  name="orderItems"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value?.includes(option.name)}
                      onChange={(e) => {
                        const items = watch("orderItems");
                        const tempItems = [...items];
                        if (e.target.checked) {
                          tempItems.push(option.name);
                          onChange(tempItems);
                        } else {
                          const newItems = tempItems.filter(
                            (item) => item !== option.name
                          );
                          onChange(newItems);
                        }
                      }}
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
        <FormControl error={!!errors.orderItems}>
          <FormHelperText
            sx={{
              fontSize: 16,
            }}
          >
            <HookFormError name="orderItems" errors={errors} />
          </FormHelperText>
        </FormControl>
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
          loading={isPreOrderMutatePending}
          loadingPosition="end"
        >
          Next: Personal Details
        </Button>
      </Box>
    </Box>
  );
}
