"use client";
import { Grid } from "@mui/joy";
import CustomerDetailsHeader from "./_components/customer-details-header";
import CustomerStats from "./_components/customer-stats";
import CustomerInfo from "./_components/customer-info";
import CustomerOrders from "./_components/customer-orders";
import { getUserDetails } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const SingleCustomer = () => {
  const { customer_id } = useParams();

  const {
    data: userDetails,
    isLoading: isUserDetailsLoading,
    isPending: isUserDetailsPending,
  } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const response = await getUserDetails(customer_id as string);
      return response.data;
    },
  });

  if (isUserDetailsLoading || isUserDetailsPending) {
    return "Loading...";
  }

  return (
    <>
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
        </Grid>
        <Grid xs={12} md={8}>
          <CustomerOrders />
        </Grid>
      </Grid>
    </>
  );
};

export default SingleCustomer;
