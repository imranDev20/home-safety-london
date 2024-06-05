"use client";

import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import DataTable from "@/app/admin/customers/_components/data-table";
import { Close, Done, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

export default function OrderItems() {
  const { orderDetails } = useOrderDetails();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

  console.log(orderDetails);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 1,
        }}
      >
        <Typography level="title-lg">Order Notes</Typography>

        <Stack spacing={1} direction="row">
          {isEdit && (
            <>
              <IconButton
                size="sm"
                disabled={isUpdateOrderPending}
                onClick={() => setIsEdit((prev) => !prev)}
                color="danger"
              >
                <Close />
              </IconButton>
              <IconButton
                size="sm"
                loading={isUpdateOrderPending}
                color="success"
              >
                <Done />
              </IconButton>
            </>
          )}

          {!isEdit && (
            <IconButton size="sm" onClick={() => setIsEdit((prev) => !prev)}>
              <Edit
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <Card>
        <CardContent orientation="vertical">
          {orderDetails?.order_items.map((item, index) => (
            <Box key={item._id}>
              <Box>
                <Grid container>
                  <Grid xs={12}>
                    <Typography level="title-md">{item.name}</Typography>
                  </Grid>
                </Grid>

                {/* <Autocomplete
                  size="sm"
                  placeholder="Combo box"
                  options={top100Films}
                /> */}
                <Typography>{item.quantity}</Typography>
                <Typography>{item.unit}</Typography>
              </Box>

              {orderDetails.order_items.length - 1 !== index && (
                <Divider
                  sx={{
                    my: 2,
                  }}
                />
              )}
            </Box>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
];
