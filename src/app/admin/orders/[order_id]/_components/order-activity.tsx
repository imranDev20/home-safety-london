"use client";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import { snakeCaseToNormalText } from "@/shared/functions";
import { Circle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import dayjs from "dayjs";

export default function OrderActivity() {
  const { orderDetails } = useOrderDetails();

  console.log(orderDetails);

  return (
    <Box mt={3}>
      <Typography
        level="title-lg"
        sx={{
          mb: 1,
        }}
      >
        Activity
      </Typography>
      <Card>
        <CardContent>
          <List sx={{ "--ListItemDecorator-size": "40px", gap: 2 }}>
            {orderDetails?.order_status.map((status, index) => (
              <ListItem key={status._id} sx={{ alignItems: "flex-start" }}>
                <ListItemDecorator
                  sx={{
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      height: "100%",
                      width: "1px",
                      bgcolor: "divider",
                      left: "calc(var(--ListItem-paddingLeft) + 12px)",
                      top: "50%",
                    },
                  }}
                >
                  <Avatar sx={{ "--Avatar-size": "24px" }}>
                    <Circle color={index === 0 ? "success" : "neutral"} />
                  </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="body-xs">
                    {dayjs(status.timestamp).format("DD MMMM YYYY, hh:mm A")}
                  </Typography>
                  <Typography
                    level="title-sm"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {snakeCaseToNormalText(status.status)}
                  </Typography>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
