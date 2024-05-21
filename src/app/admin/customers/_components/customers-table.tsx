"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useRouter, useSearchParams } from "next/navigation";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user.services";
import dayjs from "dayjs";
import { Pagination } from "@/types/misc";
import { User } from "@/types/user";

type CustomersResponse = {
  users: Partial<User>[];
  message: string;
  pagination: Pagination;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function CustomersTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const {
    data: usersData,
    isLoading: isGetUsersDataLoading,
    isFetching: isGetUserDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<CustomersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, message, pagination } = await getUsers(
        searchTerm as string
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

  // useEffect(() => {
  //   refetchGetUsers();
  // }, [searchTerm, refetchGetUsers]);

  if (isGetUsersDataLoading || isGetUserDataFetching) {
    return "loading...";
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
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: 40,
                  textAlign: "center",
                  padding: "12px 6px",
                }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 &&
                    selected.length !== usersData?.users.length
                  }
                  checked={selected.length === usersData?.users.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? (usersData?.users.map((row) => row._id) as string[])
                        : []
                    );
                  }}
                  color={
                    selected.length > 0 ||
                    selected.length === usersData?.users.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>

              <th style={{ width: 180, padding: "12px 6px" }}>CUSTOMER</th>
              <th style={{ width: 150, padding: "12px 6px" }}>EMAIL</th>
              <th style={{ width: 120, padding: "12px 6px" }}>PHONE</th>
              <th style={{ width: 110, padding: "12px 6px" }}>ADDRESS</th>
              <th style={{ width: 90, padding: "12px 6px" }}>JOINED</th>
              <th style={{ width: 50, padding: "12px 6px" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* {stableSort(usersData?.users, getComparator(order, "id")).map(
              (row) => (
                <tr
                  key={row._id}
                  onClick={() => router.push(`/admin/customers/${row._id}`)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td
                    style={{ textAlign: "center", width: 120 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row._id as string)}
                      color={
                        selected.includes(row._id as string)
                          ? "primary"
                          : undefined
                      }
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => {
                        event.stopPropagation();

                        setSelected((ids) =>
                          event.target.checked
                            ? ids.concat(row._id as string)
                            : ids.filter((itemId) => itemId !== row._id)
                        );
                      }}
                      slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                      sx={{ verticalAlign: "text-bottom" }}
                    />
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Avatar size="sm" variant="outlined">
                        {row.name?.charAt(0)}
                      </Avatar>
                      <Typography level="body-xs">{row.name}</Typography>
                    </Box>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.email}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.phone}</Typography>
                  </td>

                  <td>
                    <Typography level="body-xs">London WC1N 3AX</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.createdAt}</Typography>
                  </td>

                  <td
                    style={{ textAlign: "center", width: 120 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <RowMenu />
                  </td>
                </tr>
              )
            )} */}
          </tbody>
        </Table>
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
