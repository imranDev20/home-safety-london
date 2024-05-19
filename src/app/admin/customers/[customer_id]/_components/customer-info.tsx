"use client";
import { getUserDetails } from "@/services/user.services";
import { Box, Sheet, Stack, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const CustomerInfo = () => {
  const { customer_id } = useParams();

  const { data: userDetails, isLoading: isUserDetailsLoading } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const response = await getUserDetails(customer_id as string);
      return response.data;
    },
  });

  return (
    <>
      <Typography level="h4" mb={2}>
        Customer Information
      </Typography>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          p: 2,
        }}
      >
        <Stack spacing={1}>
          <Box>
            <Typography level="body-sm">User ID</Typography>
            <Typography level="title-md">{userDetails?._id}</Typography>
          </Box>

          <Box>
            <Typography level="body-sm">Name</Typography>
            <Typography level="title-md">{userDetails?.name}</Typography>
          </Box>

          <Box>
            <Typography level="body-sm">Email</Typography>
            <Typography level="title-md">{userDetails?.email}</Typography>
          </Box>

          <Box>
            <Typography level="body-sm">Phone</Typography>
            <Typography level="title-md">
              {userDetails?.phone || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography level="body-sm">Address</Typography>
            <Typography level="title-md">{userDetails?.name}</Typography>
          </Box>
        </Stack>
      </Sheet>
    </>
  );
};

export default CustomerInfo;
