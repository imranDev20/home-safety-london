import {
  calculateTotal,
  createQueryString,
  getServiceItems,
} from "@/shared/functions";
import { Order } from "@/types/misc";
import { Box, Button, CircularProgress, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Confirmation({ order }: { order: Order }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  useEffect(() => {
    if (!order.isPersonalStepComplete) {
      router.push(pathname + "?" + createQueryString("active_step", "1"));
    }
  }, [order.isPersonalStepComplete, pathname, router]);

  const items = getServiceItems(order);

  if (!order.isServiceStepComplete && !order.isPersonalStepComplete) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: 300,
        }}
      >
        <CircularProgress size="lg" thickness={3} />
        <Typography
          sx={{
            mt: 3,
            fontWeight: 500,
            fontSize: 20,
          }}
        >
          Loading
        </Typography>
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
        Confirm Order
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.colorSchemes.light.palette.divider,
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderBottomColor: "rgba(0, 0, 0, 0.12)",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>Services</Typography>
          <Typography sx={{ fontWeight: 500 }}>Charges</Typography>
        </Box>

        {items.map((item, index) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: items.length - 1 !== index ? "1px solid" : "none",
              borderBottomColor: "rgba(0, 0, 0, 0.12)",
              px: 2,
              py: 2,
            }}
          >
            <Box>
              <Typography>{item.label}</Typography>
              <Typography
                sx={{
                  fontSize: 15,
                }}
                level="body-sm"
                textColor="neutral.500"
              >
                {item.quantity} x {item.type.toLowerCase()}
              </Typography>
            </Box>
            <Box>£{item.price}</Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.colorSchemes.light.palette.divider,
          borderRadius: 5,
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderBottomColor: "rgba(0, 0, 0, 0.12)",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>Additional</Typography>
          <Typography sx={{ fontWeight: 500 }}>Charges</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderBottomColor: "rgba(0, 0, 0, 0.12)",
            px: 2,
            py: 2,
          }}
        >
          <Box>
            <Typography>TFL Zone</Typography>
            <Typography
              sx={{
                fontSize: 15,
              }}
              level="body-sm"
              textColor="neutral.500"
            >
              {order.tflZone === "inside_tfl_1"
                ? "Inside TFL Zone 1"
                : order.tflZone === "outside_tfl_5"
                ? "Outside TFL Zone 5"
                : "None"}
            </Typography>
          </Box>
          <Box>
            £
            {order.tflZone === "inside_tfl_1"
              ? 30
              : order.tflZone === "outside_tfl_5"
              ? 10
              : 0}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 2,
          }}
        >
          <Box>
            <Typography>Scheduled Time</Typography>
            <Typography
              sx={{
                fontSize: 15,
              }}
              level="body-sm"
              textColor="neutral.500"
            >
              {order.time === "24"
                ? "Within 24 Hours"
                : order.time === "48"
                ? "Within 48 Hours"
                : dayjs(order.date).format("DD MMMM, YYYY")}
            </Typography>
          </Box>
          <Box>£{order.time === "24" ? 100 : order.time === "48" ? 40 : 0}</Box>
        </Box>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.colorSchemes.light.palette.divider,
          borderRadius: 5,
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 2,
            borderBottom: "1px solid",
            borderBottomColor: theme.colorSchemes.light.palette.divider,
          }}
        >
          <Box>
            <Typography>Subtotal</Typography>
            <Typography
              sx={{
                fontSize: 15,
              }}
              level="body-sm"
              textColor="neutral.500"
            >
              Services + Additional
            </Typography>
          </Box>
          <Box>
            £
            {calculateTotal([
              ...items.map((item) => parseInt(item.price as string)),
              order.tflZone === "inside_tfl_1"
                ? 30
                : order.tflZone === "outside_tfl_5"
                ? 10
                : 0,
              order.time === "24" ? 100 : order.time === "48" ? 40 : 0,
            ])}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 2,
          }}
        >
          <Box>
            <Typography>VAT</Typography>
            <Typography
              sx={{
                fontSize: 15,
              }}
              level="body-sm"
              textColor="neutral.500"
            >
              20% of Total
            </Typography>
          </Box>
          <Box>
            £
            {calculateTotal([
              ...items.map((item) => parseInt(item.price as string)),
              order.tflZone === "inside_tfl_1"
                ? 30
                : order.tflZone === "outside_tfl_5"
                ? 10
                : 0,
              order.time === "24" ? 100 : order.time === "48" ? 40 : 0,
            ]) * 0.2}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.colorSchemes.light.palette.divider,
          borderRadius: 5,
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 2,
          }}
        >
          <Box>
            <Typography>Total</Typography>
            <Typography
              sx={{
                fontSize: 15,
              }}
              level="body-sm"
              textColor="neutral.500"
            >
              Including VAT
            </Typography>
          </Box>
          <Box>
            £
            {calculateTotal([
              ...items.map((item) => parseInt(item.price as string)),
              order.tflZone === "inside_tfl_1"
                ? 30
                : order.tflZone === "outside_tfl_5"
                ? 10
                : 0,
              order.time === "24" ? 100 : order.time === "48" ? 40 : 0,
            ]) +
              calculateTotal([
                ...items.map((item) => parseInt(item.price as string)),
                order.tflZone === "inside_tfl_1"
                  ? 30
                  : order.tflZone === "outside_tfl_5"
                  ? 10
                  : 0,
                order.time === "24" ? 100 : order.time === "48" ? 40 : 0,
              ]) *
                0.2}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="solid"
          onClick={() => {
            router.push(pathname + "?" + createQueryString("active_step", "4"));
          }}
          sx={{
            mt: 2,
          }}
        >
          Next: Payment Details
        </Button>
      </Box>
    </>
  );
}
