"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/joy";
import { AddRounded, Check } from "@mui/icons-material";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import ScheduleInfo from "./schedule-info";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import { IOrder } from "@/types/orders";
import { Types } from "mongoose";
import TaskAssignment from "./task-assignment";
import { useSnackbar } from "@/app/_components/snackbar-provider";

export type Assignment = {
  id: number;
  engineer: Types.ObjectId | "";
  tasks: Types.ObjectId[];
  isEmailSent: boolean;
};

interface TaskWithEngineers {
  task: Types.ObjectId;
  engineers: Types.ObjectId[];
}

const assignment: Assignment = {
  id: 1,
  engineer: "",
  tasks: [],
  isEmailSent: false,
};

export default function AssignedAndTimeInfo() {
  const { orderDetails } = useOrderDetails();
  const [assignments, setAssignments] = useState([assignment]);
  const { updateOrderMutate, isPending: isUpdateOrderDetailsPending } =
    useUpdateOrderDetails();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (orderDetails) {
      const orderItems = orderDetails.order_items;

      const newAssignments: Assignment[] = orderItems.reduce((acc, curr) => {
        const { _id, assigned_engineers } = curr;

        // If assigned_engineers is an empty array, add a default assignment
        if (assigned_engineers.length === 0) {
          acc.push({
            engineer: "", // Set an empty string or a default value
            tasks: [_id],
            isEmailSent: false,
            id: Math.random(),
          });
        } else {
          assigned_engineers.forEach((engineer) => {
            const engineerObj = acc.find((item) => item.engineer === engineer);

            if (engineerObj) {
              engineerObj.tasks.push(_id);
            } else {
              acc.push({
                engineer,
                tasks: [_id],
                isEmailSent: true,
                id: Math.random(),
              });
            }
          });
        }

        return acc;
      }, [] as Assignment[]);

      setAssignments(newAssignments);
    }
  }, [orderDetails]);

  const addAssignment = () => {
    const tempAssignments = [...assignments];
    tempAssignments.push({
      ...assignment,
      id: Math.random(),
    });
    setAssignments(tempAssignments);
  };

  const handleAssignmentSave = () => {
    if (!orderDetails?.order_items || !orderDetails?.customer._id) {
      throw new Error("Order details is required to assign tasks to engineers");
    }

    // Check if any assignment object has empty engineer or tasks
    const hasEmptyAssignment = assignments.some(
      (assignment) => !assignment.engineer || assignment.tasks.length === 0
    );

    if (hasEmptyAssignment) {
      enqueueSnackbar(
        "One or more assignments have empty engineer or tasks.",
        "error"
      );

      return;
    }

    const tasksToEngineer: TaskWithEngineers[] = assignments.reduce(
      (acc, curr) => {
        const tasks = curr.tasks;
        tasks.forEach((task) => {
          const taskObj = acc.find((item) => item.task === task);
          if (taskObj) {
            taskObj.engineers.push(new Types.ObjectId(curr.engineer));
          } else {
            acc.push({ task, engineers: [new Types.ObjectId(curr.engineer)] });
          }
        });
        return acc;
      },
      [] as TaskWithEngineers[]
    );

    const payload: IOrder = {
      ...orderDetails,
      customer: orderDetails?.customer?._id,
      order_items: orderDetails?.order_items.map((orderItem) => ({
        ...orderItem,
        assigned_engineers: tasksToEngineer
          .find((taskToEngr) => taskToEngr.task === orderItem._id)
          ?.engineers.map(
            (engineer) => new Types.ObjectId(engineer)
          ) as Types.ObjectId[],
      })),
    };

    updateOrderMutate(payload);
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
            {assignments.map((_, index) => {
              return (
                <TaskAssignment
                  key={assignments[index].id}
                  setAssignments={setAssignments}
                  assignments={assignments}
                  index={index}
                />
              );
            })}

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
                  onClick={handleAssignmentSave}
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
