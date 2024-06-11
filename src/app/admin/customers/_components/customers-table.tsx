"use client";
import React, { useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user.services";
import DataTable from "./data-table";
import { customSlugify } from "@/shared/functions";
import { CircularProgress } from "@mui/joy";
import { GetCustomersResponse } from "@/types/response";
import { ICustomer } from "@/types/user";
import dayjs from "dayjs";
import TablePagination from "../../_components/table-pagination";
import { useQueryString } from "@/app/_components/hooks/use-query-string";

const columns = [
  {
    label: "CUSTOMER",
    key: "name",
    width: 180,
    render: (value: string, row: ICustomer) => {
      const initial = row?.name?.charAt(0);

      return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar size="sm">{initial}</Avatar>
          <div>
            <Typography>{row?.name}</Typography>
          </div>
        </Box>
      );
    },
  },
  { label: "EMAIL", key: "email", width: 150 },
  { label: "PHONE", key: "phone", width: 120 },
  {
    label: "ADDRESS",
    key: "address",
    width: 110,
    render: (value: any, row: ICustomer) => (
      <Typography>
        {row?.address?.street}, {row?.address?.postcode}
      </Typography>
    ),
  },
  {
    label: "JOINED",
    key: "createdAt",
    width: 90,
    render: (value: string, row: ICustomer) => {
      return (
        <Typography>{dayjs(row.createdAt).format("DD MMMM YYYY")}</Typography>
      );
    },
  },
];

export default function CustomersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort_by") || "";
  const page = searchParams.get("page") || "";

  const sortOrder = searchParams.get("sort_order") || "";
  const pathname = usePathname();
  const { createQueryString } = useQueryString();

  const {
    data: usersData,
    isPending: isGetUsersDataPending,
    isFetching: isGetUserDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<GetCustomersResponse>({
    queryKey: ["users", "customers"],
    queryFn: () =>
      getUsers<"customer">(searchTerm, "customer", sortBy, sortOrder, page),
    refetchOnMount: false,
  });

  useEffect(() => {
    const loadUsers = async () => {
      await refetchGetUsers();
    };
    loadUsers();
  }, [searchTerm, refetchGetUsers, sortBy, sortOrder, page]);

  // Table functions
  const handleRowClick = (row: ICustomer) => {
    router.push(`/admin/customers/${customSlugify(row._id.toString())}`);
  };

  const handleSelectionChange = (selected: ICustomer[]) => {
    console.log("Selection changed:", selected);
  };

  if (isGetUsersDataPending || isGetUserDataFetching) {
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

  if (!usersData) {
    return "No Users Found";
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
        {usersData?.data ? (
          <DataTable
            columns={columns}
            data={usersData?.data}
            onRowClick={handleRowClick}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          "No results found"
        )}
      </Sheet>

      {usersData.pagination && (
        <TablePagination
          currentPage={usersData.pagination?.currentPage}
          totalPages={usersData.pagination.totalPages}
          onPageChange={(newPage) =>
            router.push(
              `${pathname}?${createQueryString("page", newPage.toString())}`
            )
          }
        />
      )}
    </React.Fragment>
  );
}
