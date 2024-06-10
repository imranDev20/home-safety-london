"use client";
import React, { useEffect, useState } from "react";
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
import { IOrder } from "@/types/orders";
import { Types } from "mongoose";
import ItemsAssigneeSelect from "./items-assignee-select";

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

  useEffect(() => {
    if (orderDetails) {
      const orderItems = orderDetails.order_items;
      const newAssignments: Assignment[] = orderItems.reduce((acc, curr) => {
        const { _id, assigned_engineers } = curr;
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
        return acc;
      }, [] as Assignment[]);

      setAssignments(newAssignments);
    }
  }, [orderDetails]);

  console.log(orderDetails);

  const addAssignment = () => {
    const tempAssignments = [...assignments];
    tempAssignments.push({
      ...assignment,
      id: assignments[assignments.length - 1].id + 1,
    });
    setAssignments(tempAssignments);
  };

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

  const handleAssignmentSave = () => {
    if (!orderDetails?.order_items || !orderDetails?.customer._id) {
      throw new Error("Order details is required to assign tasks to engineers");
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

  console.log(assignments);

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
            {assignments.map((assignment, index) => {
              return (
                <Grid container spacing={2} key={assignment.id}>
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
                        orderDetails?.order_items.find(
                          (item) => item._id === taskId
                        )
                      )}
                      onChange={(e, val) => {
                        setToStateEngineer(
                          { ...assignment, tasks: val.map((v) => v?._id) },
                          index
                        );
                      }}
                      placeholder="Leave empty to select all services"
                      options={orderDetails?.order_items}
                      getOptionLabel={(option) => option?.title as string}
                      isOptionEqualToValue={(option, value) =>
                        option?._id === value?._id
                      }
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
