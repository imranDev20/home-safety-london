"use client";
import { Box, Grid } from "@mui/joy";
import CustomerDetailsHeader from "./_components/customer-details-header";
import CustomerStats from "./_components/customer-stats";
import CustomerInfo from "./_components/customer-info";
import CustomerOrders from "./_components/customer-orders";
import { getUserDetails } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FIXED_HEIGHT } from "@/shared/constants";
import RecentActivities from "./_components/recent-activities";
import { Types } from "mongoose";

const SingleCustomer = () => {
  const { customer_id } = useParams();

  const {
    data: userDetails,
    isFetching: isUserDetailsFetching,
    isPending: isUserDetailsPending,
  } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const response = await getUserDetails(
        new Types.ObjectId(customer_id as string)
      );
      return response.data;
    },
  });

  if (isUserDetailsFetching || isUserDetailsPending) {
    return "Loading...";
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: "auto",
        minHeight: `calc(100vh - 35px)`,
        height: `calc(100vh - 35px)`,
      }}
    >
      <CustomerDetailsHeader userDetails={userDetails} />
      <CustomerStats />
      <Grid
        container
        spacing={3}
        sx={{
          mt: 5,
        }}
      >
        <Grid xs={12} md={4}>
          <CustomerInfo userDetails={userDetails} />
          <RecentActivities />
        </Grid>
        <Grid xs={12} md={8}>
          <CustomerOrders />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleCustomer;
