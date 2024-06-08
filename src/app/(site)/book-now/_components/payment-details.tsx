import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Box, Button } from "@mui/joy";
import { useRouter, usePathname } from "next/navigation";
import { createPreOrder, getPreOrder } from "@/services/pre-order.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { useQueryString } from "@/app/_components/hooks/use-query-string";
import { IPreOrder, PaymentMethod } from "@/types/orders";
import { IUser } from "@/types/user";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";

export default function PaymentDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const { createQueryString } = useQueryString();
  const queryClient = useQueryClient();

  const { data, isLoading: isPreOrderDataLoading } = useQuery({
    queryKey: ["pre-order"],
    queryFn: () => getPreOrder(),
  });
  const preOrderData = data?.data;

  const { mutateAsync: preOrderMutate, isPending: isPreOrderMutatePending } =
    useMutation({
      mutationFn: async (preOrder: Partial<IPreOrder>) =>
        createPreOrder(preOrder),

      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["pre-order"] });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          error.response?.data.message || error?.message,
          "error"
        );
      },
    });

  console.log(preOrderData);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!stripe || !elements) {
        throw new Error("stripe or elements isn't found");
      }

      if (!preOrderData?.personal_info || !preOrderData?.service_info) {
        throw new Error("Step data not found");
      }

      setLoading(true);

      const payload: IPreOrder = {
        service_info: preOrderData?.service_info,
        personal_info: {
          ...preOrderData?.personal_info,
          customer: (preOrderData?.personal_info?.customer as IUser)._id,
        },
        payment_info: {
          payment_method: "credit_card" as PaymentMethod,
        },
        status: "payment",
      };
      await preOrderMutate(payload);

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
            createQueryString("active_step", "4") +
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
    } catch (error: any) {
      enqueueSnackbar(error.message as string, "error");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 5,
      }}
      onSubmit={handleSubmit}
    >
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: preOrderData?.personal_info?.customer?.email,
              name: preOrderData?.personal_info?.customer.name,
              phone: preOrderData?.personal_info?.customer.phone,
              address: {
                country: "GB",
                city: "London",
                postal_code:
                  preOrderData?.personal_info?.customer?.address?.postcode,
                line1: preOrderData?.personal_info?.customer?.address?.street,
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
          variant="solid"
          type="submit"
          disabled={isPreOrderDataLoading}
          loading={loading}
          sx={{ mt: 5 }}
          size="lg"
        >
          Proceed to Order
        </Button>
      </Box>
    </Box>
  );
}

// http://localhost:3000/quote?payment_intent=pi_3OBcCZJZT84KLAtm0JExs2nR&payment_intent_client_secret=pi_3OBcCZJZT84KLAtm0JExs2nR_secret_4aIBn0NJlR0XPAPb9LDmABNWW&redirect_status=failed
