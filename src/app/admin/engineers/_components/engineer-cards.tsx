import React from "react";
import { Box, Grid, Stack } from "@mui/joy";
import EngineerCard from "./engineer-card";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { Pagination } from "@/types/misc";
import { getUsers } from "@/services/user.services";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

export type CustomersResponse = {
  users: Partial<User>[];
  message: string;
  pagination: Pagination;
};

export default function EngineerCards() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    data: engineersData,
    isLoading: isGetEngineersDataLoading,
    isFetching: isGetEngineersDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<CustomersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, message, pagination } = await getUsers(
        undefined,
        "engineer"
      );

      console.log(data);

      const users = data?.map((user: any) => ({
        _id: user._id,
        createdAt: dayjs(user.createdAt).format("MMM DD, YYYY"),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        completed_projects:
          user.orders_received.filter(
            (order: any) => order.status === "completed"
          )?.length ?? 0,
        ongoing_projects:
          user.orders_received.filter(
            (order: any) => order.status === "in_progress"
          )?.length ?? 0,
      }));

      return {
        users,
        message,
        pagination,
      };
    },
    refetchOnMount: false,
  });

  console.log(engineersData?.users);

  if (isGetEngineersDataFetching || isGetEngineersDataLoading) {
    return "Loading...";
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: {
          xs: "unset",
          md: "auto",
        },
        minHeight: {
          md: `calc(100vh - ${FIXED_HEIGHT}px)`,
          xs: "unset",
        },
        height: {
          md: `calc(100vh - ${FIXED_HEIGHT}px)`,
          xs: "unset",
        },
      }}
    >
      <Stack>
        <Grid container spacing={3}>
          {engineersData?.users.map((engineer) => (
            <Grid xs={12} md={6} key={engineer._id}>
              <EngineerCard engineer={engineer} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
