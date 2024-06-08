import { createPreOrder, getPreOrder } from "@/services/pre-order.services";
import { snakeCaseToNormalText, toSnakeCase } from "@/shared/functions";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/joy";
import { List, ListDivider, ListItem, Radio, RadioGroup } from "@mui/joy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Payments from "./payments";
import useBreakpoints from "@/app/_components/hooks/use-breakpoints";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { createOrder } from "@/services/orders.services";
import { IPreOrder } from "@/types/orders";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import dayjs from "dayjs";
import { IUser } from "@/types/user";

type PaymentMethods = "credit_card" | "bank_transfer" | "cash_to_engineer";

export default function Confirmation() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethods>("credit_card");

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;
  const { isXs, isSm } = useBreakpoints();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading: isPreOrderDataLoading } = useQuery({
    queryKey: ["pre-order"],
    queryFn: () => getPreOrder(),
  });

  const preOrderData = data?.data;

  // pre order mutate for changing payment method
  const { mutateAsync: preOrderMutate, isPending: isPreOrderMutatePending } =
    useMutation({
      mutationFn: async (preOrder: Partial<IPreOrder>) => {
        const response = await createPreOrder(preOrder);
        return response;
      },
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries({ queryKey: ["pre-order"] });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          error.response?.data.message || error?.message,
          "error"
        );

        if (preOrderData?.payment_info) {
          setPaymentMethod(preOrderData?.payment_info?.payment_method);
        }
      },
    });

  // Place order mutate
  const { mutateAsync: orderMutate, isPending: isOrderMutateLoading } =
    useMutation({
      mutationFn: (preOrderid: string) => createOrder(preOrderid),
      onSuccess: (response) => {
        enqueueSnackbar(response?.message, "success");
        queryClient.invalidateQueries({
          queryKey: ["orders", "order-details"],
        });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          error.response?.data.message || error?.message,
          "error"
        );
      },
    });

  // setting payment method after refresh

  useEffect(() => {
    if (preOrderData?.payment_info) {
      setPaymentMethod(preOrderData.payment_info.payment_method);
    }
  }, [preOrderData]);

  console.log(preOrderData);

  const handlePreOrderPaymentMethod = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!preOrderData?.service_info || !preOrderData.personal_info) {
      console.log("Missing data from previous steps");
      return;
    }

    setPaymentMethod(event.target.value as PaymentMethods);
    const { customer } = preOrderData.personal_info;

    const payload: IPreOrder = {
      service_info: preOrderData?.service_info,
      personal_info: {
        ...preOrderData.personal_info,
        customer: (customer as IUser)?._id,
      },
      payment_info: {
        payment_method: event.target.value as PaymentMethods,
      },
      status: "payment",
    };
    preOrderMutate(payload);
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

  if (!preOrderData) {
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
          No pre order data
        </CircularProgress>
      </Box>
    );
  }

  return (
    <>
      {activeStep === 3 ? (
        <>
          <Grid container spacing={3}>
            <Grid xs={6}>
              <Typography
                component="h3"
                level="title-lg"
                sx={{
                  mb: 1,
                }}
              >
                Personal Details
              </Typography>
              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Name:{" "}
                </Typography>
                <Typography component="span" level="body-sm">
                  {preOrderData?.personal_info?.customer.name}
                </Typography>
              </Typography>

              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Email:{" "}
                </Typography>
                <Typography component="span" level="body-sm">
                  {preOrderData?.personal_info?.customer.email}
                </Typography>
              </Typography>

              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Phone No:{" "}
                </Typography>
                <Typography component="span" level="body-sm">
                  {preOrderData?.personal_info?.customer.phone}
                </Typography>
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography
                component="h3"
                level="title-lg"
                sx={{
                  mb: 1,
                }}
              >
                Address
              </Typography>
              <Typography component="p">
                <Typography component="span" level="title-sm">
                  House No / Street Name:{" "}
                </Typography>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {preOrderData?.personal_info?.customer?.address?.street}
                </Typography>
              </Typography>

              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Post Code:{" "}
                </Typography>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {preOrderData?.personal_info?.customer?.address?.postcode}
                </Typography>
              </Typography>

              <Typography component="p">
                <Typography component="span" level="title-sm">
                  City:{" "}
                </Typography>
                <Typography component="span" level="body-sm">
                  {preOrderData?.personal_info?.customer?.address?.city}
                </Typography>
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography
                component="h3"
                level="title-lg"
                sx={{
                  mb: 1,
                }}
              >
                Inspection Scheduled
              </Typography>
              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Date of Inspection:{" "}
                </Typography>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {dayjs(preOrderData?.personal_info?.inspection_date).format(
                    "DD MMMM YYYY"
                  )}
                </Typography>
              </Typography>

              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Time of Day:{" "}
                </Typography>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {preOrderData?.personal_info?.inspection_time ?? "N/A"}
                </Typography>
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography
                component="h3"
                level="title-lg"
                sx={{
                  mb: 1,
                }}
              >
                Additional Details
              </Typography>
              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Congestion Zone:{" "}
                </Typography>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {preOrderData &&
                    snakeCaseToNormalText(
                      preOrderData?.personal_info?.congestion_zone
                        ?.zone_type as string
                    )}
                </Typography>
              </Typography>

              <Typography component="p">
                <Typography component="span" level="title-sm">
                  Parking Options:{" "}
                </Typography>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {preOrderData?.personal_info?.parking_options?.parking_type}
                </Typography>
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ minWidth: 240, mt: 5 }}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography level="h4" textColor="text.secondary" fontWeight="xl">
                Choose a Payment Method
              </Typography>
            </Box>
            <RadioGroup
              overlay
              value={paymentMethod}
              onChange={handlePreOrderPaymentMethod}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <List
                component="div"
                variant="outlined"
                orientation={isXs && !isSm ? "vertical" : "horizontal"}
                sx={{
                  borderRadius: "sm",
                  boxShadow: "sm",
                  width: "100%",
                }}
              >
                {["Credit Card", "Bank Transfer", "Cash to Engineer"].map(
                  (value, index) => (
                    <React.Fragment key={value}>
                      {index !== 0 && <ListDivider />}
                      <ListItem
                        sx={{
                          py: 3,
                          flex: 1,
                        }}
                      >
                        <Radio
                          id={value}
                          value={toSnakeCase(value)}
                          label={value}
                          disabled={isPreOrderMutatePending}
                        />
                      </ListItem>
                    </React.Fragment>
                  )
                )}
              </List>
            </RadioGroup>
          </Box>
        </>
      ) : null}

      {paymentMethod === "credit_card" && <Payments />}

      {activeStep === 3 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 5,
          }}
        >
          {(paymentMethod === "bank_transfer" ||
            paymentMethod === "cash_to_engineer") && (
            <Button
              disabled={isPreOrderMutatePending}
              loading={isOrderMutateLoading}
              size="lg"
              onClick={() => orderMutate(preOrderData._id)}
            >
              Proceed to Order
            </Button>
          )}
        </Box>
      ) : null}
    </>
  );
}
