"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter, useSearchParams } from "next/navigation";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user.services";
import dayjs from "dayjs";
import { Pagination } from "@/types/misc";
import { User } from "@/types/user";
import DataTable from "./data-table";
import { customSlugify } from "@/shared/functions";
import { CircularProgress } from "@mui/joy";

export type CustomersResponse = {
  users: Partial<User>[];
  message: string;
  pagination: Pagination;
};

const columns = [
  {
    label: "CUSTOMER",
    key: "name",
    width: 180,
    render: (value: string, row: User) => (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar size="sm" variant="outlined">
          {row.name?.charAt(0)}
        </Avatar>
        <Typography level="body-xs">{value}</Typography>
      </Box>
    ),
  },
  { label: "EMAIL", key: "email", width: 150 },
  { label: "PHONE", key: "phone", width: 120 },
  { label: "ADDRESS", key: "address", width: 110 },
  { label: "JOINED", key: "createdAt", width: 90 },
];

export default function CustomersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort_by") || "";
  const sortOrder = searchParams.get("sort_order") || "";

  const {
    data: usersData,
    isLoading: isGetUsersDataLoading,
    isFetching: isGetUserDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<CustomersResponse>({
    queryKey: ["users", "customers"],
    queryFn: async () => {
      const { data, message, pagination } = await getUsers(
        searchTerm,
        "customer",
        sortBy,
        sortOrder
      );

      const users = data?.map((user: any) => ({
        _id: user._id,
        createdAt: dayjs(user.createdAt).format("MMM DD, YYYY"),
        name: user.name,
        email: user.email,
        phone: user.phone,
        // address: user.
      }));

      return {
        users,
        message,
        pagination,
      };
    },
    refetchOnMount: false,
  });

  useEffect(() => {
    const loadUsers = async () => {
      await refetchGetUsers();
    };
    loadUsers();
  }, [searchTerm, refetchGetUsers, sortBy, sortOrder]);

  const handleRowClick = (row: User) => {
    router.push(`/admin/customers/${customSlugify(row._id)}`);
  };

  const handleSelectionChange = (selected: User[]) => {
    console.log("Selection changed:", selected);
  };

  if (isGetUsersDataLoading || isGetUserDataFetching) {
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
        {usersData?.users ? (
          <DataTable<User>
            columns={columns}
            data={usersData?.users as User[]}
            onRowClick={handleRowClick}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          "No results found"
        )}
      </Sheet>

      <Box
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
          startDecorator={<KeyboardArrowLeftIcon />}
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
