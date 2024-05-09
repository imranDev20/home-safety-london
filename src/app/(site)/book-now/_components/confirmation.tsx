import { PreOrder } from "@/app/api/_models/PreOrder";
import { getPreOrderById } from "@/services/pre-order.services";
import {
  createQueryString,
  getPreOrderIdFromLocalStorage,
  snakeCaseToNormalText,
} from "@/shared/functions";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Table,
  Typography,
} from "@mui/joy";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Confirmation() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: preOrderData,
    isLoading: isPreOrderDataLoading,
    refetch: refetchPreOrder,
  } = useQuery<PreOrder>({
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
        Confirmation
      </Typography>
      <Typography
        component="h3"
        level="title-lg"
        sx={{
          mb: 1,
        }}
      >
        Selected Services
      </Typography>

      <Table variant="outlined" color="neutral">
        <thead>
          <tr>
            <th style={{ width: "55%" }}>Service Name</th>
            <th>Quantity</th>
            <th
              style={{
                textAlign: "right",
              }}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {preOrderData?.order_items.map((item) => (
            <tr key={item.name}>
              <td>{item.title}</td>
              <td>
                {item.quantity} x {item.unit}
              </td>
              <td
                style={{
                  textAlign: "right",
                }}
              >
                £{item.price}
              </td>
            </tr>
          ))}

          <tr>
            <td></td>
            <td></td>
            <td
              style={{
                textAlign: "right",
              }}
            >
              Total: £
            </td>
          </tr>
        </tbody>
      </Table>

      <Grid
        container
        spacing={3}
        sx={{
          mt: 3,
        }}
      >
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
            <Typography component="span" level="title-md">
              Name:{" "}
            </Typography>
            <Typography component="span" level="body-md">
              {preOrderData?.customer_name}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-md">
              Email:{" "}
            </Typography>
            <Typography component="span" level="body-md">
              {preOrderData?.email}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-md">
              Phone No:{" "}
            </Typography>
            <Typography component="span" level="body-md">
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
            <Typography component="span" level="title-md">
              House No / Street Name:{" "}
            </Typography>
            <Typography
              component="span"
              level="body-md"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {preOrderData?.address?.house_street}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-md">
              Post Code:{" "}
            </Typography>
            <Typography
              component="span"
              level="body-md"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {preOrderData?.address?.postcode}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-md">
              City:{" "}
            </Typography>
            <Typography component="span" level="body-md">
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
            <Typography component="span" level="title-md">
              Date of Inspection:{" "}
            </Typography>
            <Typography
              component="span"
              level="body-md"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {preOrderData?.inspection_date}
            </Typography>
          </Typography>

          <Typography component="p">
            <Typography component="span" level="title-md">
              Time of Day:{" "}
            </Typography>
            <Typography
              component="span"
              level="body-md"
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
            <Typography component="span" level="title-md">
              Congestion Zone:{" "}
            </Typography>
            <Typography
              component="span"
              level="body-md"
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
            <Typography component="span" level="title-md">
              Parking Options:{" "}
            </Typography>
            <Typography
              component="span"
              level="body-md"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {preOrderData?.parking_options?.parking_type}
            </Typography>
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="solid"
          sx={{
            mt: 2,
          }}
          onClick={() =>
            router.push(pathname + "?" + createQueryString("active_step", "4"))
          }
        >
          Next: Payment Details
        </Button>
      </Box>
    </>
  );
}
