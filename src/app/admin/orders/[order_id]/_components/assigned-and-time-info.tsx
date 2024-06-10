"use client";
import React, { useState } from "react";
import Assignee from "../../_components/assignee";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/joy";
import { AddRounded, Check, Delete, Mail } from "@mui/icons-material";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import ScheduleInfo from "./schedule-info";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";

const assignment = {
  id: 1,
  engineer: "",
  tasks: [],
  isEmailSent: false,
};

export default function AssignedAndTimeInfo() {
  const addAssignment = () => {
    const tempAssignments = [...assignments];
    tempAssignments.push({
      ...assignment,
      id: assignments[assignments.length - 1].id + 1,
    });
    setAssignments(tempAssignments);
  };

  const { orderDetails } = useOrderDetails();
  const [assignments, setAssignments] = useState([assignment]);
  const { updateOrderMutate, isPending: isUpdateOrderDetailsPending } =
    useUpdateOrderDetails();

  const deleteAssignment = (index: number) => {
    console.log(index);
    const tempAssignments = [...assignments];
    tempAssignments.splice(index, 1);
    setAssignments(tempAssignments);
  };

  const setToStateEngineer = () => {
    const tempAssignments = [...assignments];
    tempAssignments.push;
  };

  if (!orderDetails) {
    return "Loading...";
  }

  return (
    <>
      <Grid container spacing={3} mt={1}>
        <Grid md={9}>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              level="title-lg"
              sx={{
                mb: 2,
              }}
            >
              Assignment Info
            </Typography>
            {assignments.map((assignment, index) => (
              <Grid container spacing={2} key={assignment.id}>
                <Grid md={4}>
                  <Assignee
                    isOrderItems
                    onChange={(newVal) => console.log(newVal)}
                  />
                </Grid>

                <Grid md={5}>
                  <Autocomplete
                    size="sm"
                    multiple
                    id="tags-default"
                    placeholder="Leave empty to select all services"
                    options={orderDetails?.order_items}
                    getOptionLabel={(option) => option.title as string}
                  />
                </Grid>

                <Grid md={2}>
                  <Button
                    variant="outlined"
                    size="sm"
                    color="neutral"
                    startDecorator={<Mail />}
                    fullWidth
                  >
                    Send Email
                  </Button>
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
            ))}

            <Grid container spacing={2} mt={2}>
              <Grid md={3}>
                <Button
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  fullWidth
                  startDecorator={<AddRounded />}
                  onClick={addAssignment}
                >
                  Add Another
                </Button>
              </Grid>
              <Grid md={2}>
                <Button
                  fullWidth
                  variant="solid"
                  size="sm"
                  loading={isUpdateOrderDetailsPending}
                  color="primary"
                  startDecorator={<Check />}
                  onClick={() => updateOrderMutate(orderDetails)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid md={3}>
          <ScheduleInfo />
        </Grid>
      </Grid>
    </>
  );
}
