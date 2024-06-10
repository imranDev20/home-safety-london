"use client";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import { snakeCaseToNormalText } from "@/shared/functions";
import { Circle, KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
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

  return (
    <Box>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Order Activity
      </Typography>

      <Card>
        <CardContent
          sx={{
            alignItems: "flex-start",
          }}
        >
          <List sx={{ "--ListItemDecorator-size": "40px", gap: 2 }}>
            {orderDetails?.order_status.slice(0, 3).map((status, index) => (
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
          <Button
            size="sm"
            variant="plain"
            endDecorator={<KeyboardArrowRightRounded fontSize="sm" />}
            sx={{ px: 1, mt: 1 }}
          >
            Expand
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}