import Outcome from "./outcome";
import PaymentDetails from "./payment-details";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createQueryString,
  getPreOrderIdFromLocalStorage,
} from "@/shared/functions";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  List,
  ListDivider,
  ListItem,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/joy";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getPreOrderById } from "@/services/pre-order.services";
import { PreOrderPersonalPayload } from "@/types/pre-order";

export default function Payments() {
  const [stripePromise, setStripePromise] = useState<any>();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;

  const {
    data: preOrderData,
    isLoading: isPreOrderDataLoading,
    refetch: refetchPreOrder,
  } = useQuery<PreOrderPersonalPayload>({
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

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await axios.get("/api/config");
        setStripePromise(loadStripe(response.data.publishableKey));
      } catch (error) {
        console.log(error);
      }
    };

    fetchKey();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const orderPayload = {
          ...preOrderData,
        };

        const response = await axios.post(
          "/api/create-payment-intent",
          orderPayload
        );

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientSecret();
  }, [preOrderData]);

  return (
    <>
      <Box sx={{ minWidth: 240, mt: 4 }}>
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
          aria-labelledby="example-payment-channel-label"
          overlay
          name="example-payment-channel"
          defaultValue="Paypal"
        >
          <List
            component="div"
            variant="outlined"
            orientation={"vertical"}
            sx={{
              borderRadius: "sm",
              boxShadow: "sm",
            }}
          >
            {["Credit Card", "Bank Transfer", "Cash to Engineer"].map(
              (value, index) => (
                <React.Fragment key={value}>
                  {index !== 0 && <ListDivider />}
                  <ListItem>
                    <Radio id={value} value={value} label={value} />
                  </ListItem>
                </React.Fragment>
              )
            )}
          </List>
        </RadioGroup>
      </Box>
      {/* {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            loader: "always",

            appearance: {
              theme: "stripe",
              labels: "floating",
            },
          }}
        >
          {activeStep === 4 ? <PaymentDetails /> : null}
          {activeStep === 5 ? <Outcome /> : null}
        </Elements>
      )} */}
    </>
  );
}
