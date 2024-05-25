import { FormEvent, useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Box, Button } from "@mui/joy";
import { useRouter, usePathname } from "next/navigation";
import {
  createQueryString,
  getPreOrderIdFromLocalStorage,
} from "@/shared/functions";
import { getPreOrderById } from "@/services/pre-order.services";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { PreOrderPersonalPayload } from "@/types/pre-order";

export default function PaymentDetails() {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url:
          window.location.origin +
          window.location.pathname +
          "?" +
          createQueryString("active_step", "5"),
        // receipt_email: order.email,
      },
    });

    setLoading(false);

    if (response.paymentIntent) {
      const status = response.paymentIntent.status;

      router.push(
        pathname +
          "?" +
          createQueryString("active_step", "5") +
          "&" +
          createQueryString("payment_intent", response.paymentIntent.id) +
          "&" +
          createQueryString(
            "payment_intent_client_secret",
            response.paymentIntent.client_secret as string
          ) +
          "&" +
          createQueryString("redirect_status", status)
      );

      enqueueSnackbar(status, status === "succeeded" ? "success" : "error");

      // setStatus(response.paymentIntent.status);
    }

    // use this code if we ever need to show error as outcome
    // if (response.error) {
    //   router.push(
    //     pathname +
    //       "?" +
    //       createQueryString("active_step", "4") +
    //       "&" +
    //       createQueryString(
    //         "payment_intent",
    //         response.error.payment_intent?.id as string
    //       ) +
    //       "&" +
    //       createQueryString(
    //         "payment_intent_client_secret",
    //         response.error.payment_intent?.client_secret as string
    //       ) +
    //       "&" +
    //       createQueryString("redirect_status", "failed")
    //   );
    // }

    if (response.error) {
      enqueueSnackbar(response.error.message as string, "error");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: preOrderData?.email,
              name: preOrderData?.customer_name,
              phone: preOrderData?.phone_no,
              address: {
                country: "GB",
                city: "London",
                postal_code: preOrderData?.address?.postcode,
                line1: preOrderData?.address?.house_street,
              },
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          type="submit"
          loading={loading}
          sx={{ mt: 4 }}
        >
          Pay
        </Button>
      </Box>
    </form>
  );
}

// http://localhost:3000/quote?payment_intent=pi_3OBcCZJZT84KLAtm0JExs2nR&payment_intent_client_secret=pi_3OBcCZJZT84KLAtm0JExs2nR_secret_4aIBn0NJlR0XPAPb9LDmABNWW&redirect_status=failed
