import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Alert, Button } from "@mui/joy";
import { useRouter, usePathname } from "next/navigation";
import { createQueryString } from "@/shared/functions";
import { Order } from "@/types/misc";

export default function PaymentDetails({ order }: { order: Order }) {
  const [status, setStatus] = useState<string>();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();

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
        receipt_email: order.email,
      },
    });

    console.log(response);
    setLoading(false);

    if (response.paymentIntent) {
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
          createQueryString("redirect_status", response.paymentIntent.status)
      );
      setStatus(response.paymentIntent.status);
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
      setStatus(response.error.message);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: order.email,
              name: order.name,
              phone: order.phone,
              address: {
                country: "GB",
                city: "London",
                postal_code: order.postCode,
                line1: order.house,
              },
            },
          },
        }}
      />

      <Button variant="outlined" type="submit" loading={loading} sx={{ mt: 2 }}>
        Pay
      </Button>

      {status && (
        <Alert
          sx={{
            mt: 2,

            "& .MuiAlert-icon": {
              alignItems: "center",
            },
          }}
        >
          {status}
        </Alert>
      )}
    </form>
  );
}

// http://localhost:3000/quote?payment_intent=pi_3OBcCZJZT84KLAtm0JExs2nR&payment_intent_client_secret=pi_3OBcCZJZT84KLAtm0JExs2nR_secret_4aIBn0NJlR0XPAPb9LDmABNWW&redirect_status=failed
