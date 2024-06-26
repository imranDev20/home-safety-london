import React from "react";
import { Box, Grid, Stack } from "@mui/joy";
import EngineerCard from "./engineer-card";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useSearchParams } from "next/navigation";
import { useEngineersData } from "@/app/_components/hooks/use-engineers";
import TablePagination from "../../_components/table-pagination";

export default function EngineerCards() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    data,
    isPending: isGetEngineersDataPending,
    isFetching: isGetEngineersDataFetching,
  } = useEngineersData();

  const engineersData = data?.data;

  console.log(engineersData);

  if (isGetEngineersDataFetching || isGetEngineersDataPending) {
    return "Loading...";
  }

  if (!engineersData) {
    return "No engineers found";
  }

  return (
    <>
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
              <Grid xs={12} md={6} key={engineer.email}>
                <EngineerCard engineer={engineer} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      {data.pagination && (
        <TablePagination
          currentPage={data?.pagination?.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={(val) => console.log(val)}
        />
      )}
    </>
  );
}
