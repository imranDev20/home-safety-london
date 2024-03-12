import { Order } from "@/types/misc";
import Outcome from "./outcome";
import PaymentDetails from "./payment-details";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createQueryString, getServiceItems } from "@/shared/functions";
import dayjs from "dayjs";

export default function Payments({
  activeStep,
  order,
}: {
  activeStep: number;
  order: Order;
}) {
  const [stripePromise, setStripePromise] = useState<any>();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!order.isPersonalStepComplete) {
      router.push(pathname + "?" + createQueryString("active_step", "1"));
    }
  }, [order.isPersonalStepComplete, pathname, router]);

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
          name: order.name,
          email: order.email,
          phone: order.phone,
          house: order.house,
          postCode: order.postCode,
          city: order.city,

          zone: {
            name: order.tflZone,
            price:
              order.tflZone === "inside_tfl_1"
                ? 30
                : order.tflZone === "outside_tfl_5"
                ? 10
                : 0,
          },

          time: {
            name: order.time || order.date,
            price: order.time === "24" ? 100 : order.time === "48" ? 40 : 0,
          },

          items: getServiceItems(order),
          ...(order.date ? { date: dayjs(order.date).format() } : null),
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
  }, [order]);

  return (
    <>
      {stripePromise && clientSecret && (
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
          {activeStep === 4 ? <PaymentDetails order={order} /> : null}
          {activeStep === 5 ? <Outcome /> : null}
        </Elements>
      )}
    </>
  );
}
