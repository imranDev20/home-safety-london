import React, { Dispatch, SetStateAction, useState } from "react";
import { Assignment } from "./assigned-and-time-info";
import ItemsAssigneeSelect from "./items-assignee-select";
import { Autocomplete, Button, Grid, IconButton } from "@mui/joy";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import { Delete, Mail } from "@mui/icons-material";
import WriteEmail from "./write-email";
import SendEmailEngineer from "./send-email-engineer";
import { Types } from "mongoose";

export default function TaskAssignment({
  assignments,
  setAssignments,
  index,
}: {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
  index: number;
}) {
  const { orderDetails, isPending: isGetOrderDetailsPending } =
    useOrderDetails();

  const deleteAssignment = (index: number) => {
    const tempAssignments = [...assignments];
    tempAssignments.splice(index, 1);
    setAssignments(tempAssignments);
  };

  const setToStateEngineer = (
    modifiedAssignment: Assignment,
    index: number
  ) => {
    const tempAssignments = [...assignments];
    tempAssignments[index] = modifiedAssignment;
    setAssignments(tempAssignments);
  };

  if (isGetOrderDetailsPending) {
    return "loading...";
  }

  if (!orderDetails) {
    return "no order details found ...";
  }

  return (
    <>
      <Grid container spacing={2} key={assignments[index].id}>
        <Grid md={4}>
          <ItemsAssigneeSelect
            assignments={assignments}
            index={index}
            setToStateEngineer={setToStateEngineer}
          />
        </Grid>

        <Grid md={5}>
          <Autocomplete
            size="sm"
            multiple
            id="tags-default"
            value={assignments[index].tasks.map((taskId) =>
              orderDetails?.order_items.find((item) => item._id === taskId)
            )}
            onChange={(e, val) => {
              setToStateEngineer(
                { ...assignments[index], tasks: val.map((v) => v?._id) },
                index
              );
            }}
            placeholder="Leave empty to select all services"
            options={orderDetails?.order_items}
            getOptionLabel={(option) => option?.title as string}
            isOptionEqualToValue={(option, value) => option?._id === value?._id}
          />
        </Grid>

        <Grid md={2}>
          <SendEmailEngineer assignment={assignments[index]} />
        </Grid>

        <Grid md={1}>
          <IconButton
            disabled={assignments.length === 1}
            size="sm"
            color="danger"
            onClick={() => deleteAssignment(index)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
