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
import { useEngineersData } from "@/app/_components/hooks/use-engineers";

export type CustomersResponse = {
  users: Partial<User>[];
  message: string;
  pagination: Pagination;
};

export default function EngineerCards() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    engineersData,
    isGetEngineersDataFetching,
    isGetEngineersDataLoading,
  } = useEngineersData();

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
          {engineersData?.map((engineer) => (
            <Grid xs={12} md={6} key={engineer._id}>
              <EngineerCard engineer={engineer} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
