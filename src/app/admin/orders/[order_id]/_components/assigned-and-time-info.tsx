"use client";
import React, { useEffect, useState } from "react";
import Assignee from "../../_components/assignee";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import {
  AddRounded,
  Check,
  Delete,
  Mail,
  UnfoldMore,
} from "@mui/icons-material";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import ScheduleInfo from "./schedule-info";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import { IOrder } from "@/types/orders";
import { IUser } from "@/types/user";
import { Types } from "mongoose";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/services/orders.services";
import { useParams } from "next/navigation";
import { useEngineersData } from "@/app/_components/hooks/use-engineers";

type Assignment = {
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
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const { orderDetails } = useOrderDetails();
  const [assignments, setAssignments] = useState([assignment]);
  const { updateOrderMutate, isPending: isUpdateOrderDetailsPending } =
    useUpdateOrderDetails();

  const {
    data,
    isLoading: isGetEngineersLoading,
    refetch: refetchGetEngineers,
  } = useEngineersData();
  const engineersData = data?.data;

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
              console.log(assignments[index].engineer, engineersData);
              return (
                <Grid container spacing={2} key={assignment.id}>
                  <Grid md={4}>
                    <FormControl size="sm">
                      <Select
                        listboxOpen={listBoxOpen}
                        onClose={() => setListBoxOpen(false)}
                        onListboxOpenChange={async (e) => {
                          if (e) {
                            if (!engineersData) {
                              await refetchGetEngineers();
                            } else {
                              refetchGetEngineers();
                            }
                          }
                          setListBoxOpen(e);
                        }}
                        indicator={
                          isGetEngineersLoading ? (
                            <CircularProgress
                              size="sm"
                              thickness={2}
                              sx={{ "--CircularProgress-size": "20px" }}
                            />
                          ) : (
                            <UnfoldMore />
                          )
                        }
                        placeholder="Filter by assignee"
                        slotProps={{
                          button: {
                            id: "select-field-demo-button",
                          },
                        }}
                        value={assignment.engineer as Types.ObjectId}
                        onChange={(_, value) => {
                          setToStateEngineer(
                            {
                              ...assignment,
                              engineer: value as Types.ObjectId,
                            },
                            index
                          );
                        }}
                      >
                        {engineersData?.map((engineer) => (
                          <Option
                            value={engineer._id}
                            key={engineer._id.toString()}
                          >
                            {engineer.name}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
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
