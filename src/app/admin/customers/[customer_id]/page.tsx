import React from "react";
import CustomerDetailsHeader from "./_components/customer-details-header";
import { Box, Grid, Sheet, Stack, Typography } from "@mui/joy";
import CustomerInfo from "./_components/customer-info";
import CustomerOrders from "./_components/customer-orders";
import CustomerStats from "./_components/customer-stats";

const SingleCustomer = () => {
  return (
    <>
      <CustomerDetailsHeader />

      <CustomerStats />
      <Grid
        container
        spacing={3}
        sx={{
          mt: 5,
        }}
      >
        <Grid xs={12} md={4}>
          <CustomerInfo />
        </Grid>
        <Grid xs={12} md={8}>
          <CustomerOrders />
        </Grid>
      </Grid>
    </>
  );
};

export default SingleCustomer;
