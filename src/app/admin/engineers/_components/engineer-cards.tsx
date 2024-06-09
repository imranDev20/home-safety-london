import React from "react";
import { Box, Grid, Stack } from "@mui/joy";
import EngineerCard from "./engineer-card";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useSearchParams } from "next/navigation";
import { useEngineersData } from "@/app/_components/hooks/use-engineers";

export default function EngineerCards() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    engineersData,
    isGetEngineersDataFetching,
    isGetEngineersDataPending,
  } = useEngineersData();

  console.log(engineersData);

  if (isGetEngineersDataFetching || isGetEngineersDataPending) {
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
          {engineersData?.data?.map((engineer) => (
            <Grid xs={12} md={6} key={engineer.email}>
              <EngineerCard engineer={engineer} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
