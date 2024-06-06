"use client";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import { snakeCaseToNormalText } from "@/shared/functions";
import {
  Circle,
  Close,
  Done,
  Edit,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import dayjs from "dayjs";
import { useState } from "react";

export default function OrderActivity() {
  const { orderDetails } = useOrderDetails();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 1,
        }}
      >
        <Typography level="title-lg">Customer Details</Typography>

        <Stack spacing={1} direction="row">
          {isEdit && (
            <>
              <IconButton size="sm" color="danger">
                <Close />
              </IconButton>
              <IconButton size="sm" color="success">
                <Done />
              </IconButton>
            </>
          )}

          {!isEdit && (
            <IconButton size="sm" onClick={() => setIsEdit((prev) => !prev)}>
              <Edit
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          )}
        </Stack>
      </Stack>

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
