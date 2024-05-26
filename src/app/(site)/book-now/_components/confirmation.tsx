import { getPreOrderById } from "@/services/pre-order.services";
import {
  getPreOrderIdFromLocalStorage,
  snakeCaseToNormalText,
  toSnakeCase,
} from "@/shared/functions";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/joy";
import { List, ListDivider, ListItem, Radio, RadioGroup } from "@mui/joy";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Payments from "./payments";
import useBreakpoints from "@/app/_components/hooks/use-breakpoints";

type PaymentMethods = "credit_card" | "bank_transfer" | "cash_to_engineer";

export default function Confirmation() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethods>("credit_card");

  const { isXs, isSm } = useBreakpoints();

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
          Loading
        </CircularProgress>
      </Box>
    );
  }

  return (
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
              {preOrderData?.customer_name}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-sm">
              Email:{" "}
            </Typography>
            <Typography component="span" level="body-sm">
              {preOrderData?.email}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-sm">
              Phone No:{" "}
            </Typography>
            <Typography component="span" level="body-sm">
              {preOrderData?.phone_no}
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
              {preOrderData?.address?.house_street}
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
              {preOrderData?.address?.postcode}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-sm">
              City:{" "}
            </Typography>
            <Typography component="span" level="body-sm">
              {preOrderData?.address?.city}
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
              {preOrderData?.inspection_date}
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
              {preOrderData?.inspection_time}
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
                  preOrderData?.congestion_zone?.zone_type as string
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
              {preOrderData?.parking_options?.parking_type}
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
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethods)}
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
                    />
                  </ListItem>
                </React.Fragment>
              )
            )}
          </List>
        </RadioGroup>
      </Box>

      {paymentMethod === "credit_card" && <Payments />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 5,
        }}
      >
        {(paymentMethod === "cash_to_engineer" ||
          paymentMethod == "bank_transfer") && (
          <Button size="lg">Proceed to Order</Button>
        )}
      </Box>
    </>
  );
}
