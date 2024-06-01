import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { Avatar, CircularProgress, Link as JoyLink } from "@mui/joy";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useOrdersData } from "@/app/_components/hooks/use-orders";
import { hexToRgba, snakeCaseToNormalText } from "@/shared/functions";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import {
  AttachMoneyOutlined,
  BuildOutlined,
  CancelOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  DirectionsCarOutlined,
  DoneAllOutlined,
  HourglassBottomOutlined,
  HourglassEmptyOutlined,
  HourglassFullOutlined,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import DataTable from "../../customers/_components/data-table";
import { FIXED_HEIGHT } from "@/shared/constants";

interface IOrderStatus {
  status: string;
  timestamp: string;
  _id: string;
}

function getMostRecentStatus(statuses: IOrderStatus[]): string | null {
  if (statuses.length === 0) {
    return null;
  }

  const sortedStatuses = statuses.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return sortedStatuses[0].status;
}

const columns = [
  {
    label: "Invoice ID",
    key: "invoice_id",
    width: 90,
    render: (value: string, row: any) => (
      <Typography level="body-sm">{value}</Typography>
    ),
  },
  {
    label: "Customer",
    key: "customer_name",
    width: 130,
    render: (value: string, row: any) => {
      const initial = row.customer_name?.charAt(0);
      console.log(row);
      // console.log(initial);
      return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar size="sm">{initial}</Avatar>
          <div>
            <Typography level="body-xs">{row.customer_name}</Typography>
            <Typography level="body-xs">{row.email}</Typography>
          </div>
        </Box>
      );
    },
  },
  {
    label: "Status",
    key: "order_status",
    width: 110,
    render: (value: string, row: any) => {
      const status = getMostRecentStatus(row?.order_status);
      return (
        <Chip
          variant="soft"
          size="sm"
          startDecorator={
            {
              pending_payment: <HourglassEmptyOutlined />,
              payment_completed: <AttachMoneyOutlined />,
              awaiting_confirmation: <HourglassBottomOutlined />,
              order_confirmed: <CheckCircleOutlined />,
              engineer_en_route: <DirectionsCarOutlined />,
              work_in_progress: <BuildOutlined />,
              work_completed: <DoneAllOutlined />,
              completed: <CheckOutlined />,
              cancelled: <CancelOutlined />,
            }[status as string]
          }
          sx={{
            backgroundColor: {
              pending_payment: hexToRgba("#FFC107", 0.2),
              payment_completed: hexToRgba("#4CAF50", 0.2),
              awaiting_confirmation: hexToRgba("#FF9800", 0.2),
              order_confirmed: hexToRgba("#2196F3", 0.2),
              engineer_en_route: hexToRgba("#9C27B0", 0.2),
              work_in_progress: hexToRgba("#673AB7", 0.2),
              work_completed: hexToRgba("#009688", 0.2),
              completed: hexToRgba("#4CAF50", 0.2),
              cancelled: hexToRgba("#F44336", 0.2),
            }[status as string],
            textTransform: "capitalize",
          }}
        >
          {snakeCaseToNormalText(status as string)}
        </Chip>
      );
    },
  },
  {
    label: "Payment Method",
    key: "payment_method",
    width: 100,
    render: (value: string, row: any) => {
      return (
        <Typography
          level="body-sm"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {snakeCaseToNormalText(value)}
        </Typography>
      );
    },
  },
  {
    label: "Date",
    key: "createdAt",
    width: 90,
    render: (value: string, row: any) => (
      <Typography level="body-sm">
        {dayjs(value).format("DD MMMM, YYYY")}
      </Typography>
    ),
  },
  {
    label: "Invoice",
    key: "invoice_path",
    width: 60,
    render: (value: string, row: any) => (
      <JoyLink
        component="a"
        href={value}
        target="_blank"
        underline="hover"
        sx={{
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Download
      </JoyLink>
    ),
  },
];

export default function OrderTable() {
  const { ordersData, isGetOrdersDataFetching, isGetOrdersDataLoading } =
    useOrdersData();
  const router = useRouter();

  const handleRowClick = (order: any) => {
    router.push(`/admin/orders/${order._id}`);
  };

  if (isGetOrdersDataFetching || isGetOrdersDataLoading) {
    return (
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FIXED_HEIGHT}px)`,
          height: `calc(100vh - ${FIXED_HEIGHT}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          thickness={3}
          sx={{
            "--CircularProgress-size": "60px",
          }}
        />
      </Sheet>
    );
  }

  return (
    <React.Fragment>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FIXED_HEIGHT}px)`,
          height: `calc(100vh - ${FIXED_HEIGHT}px)`,
        }}
      >
        <DataTable
          data={ordersData}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Sheet>

      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeft />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
