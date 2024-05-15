import React from "react";
import { Transition } from "react-transition-group";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
  selectClasses,
} from "@mui/joy";
import HookFormError from "@/app/_components/common/hook-form-error";
import { Close } from "@mui/icons-material";

const reviewServices = [
  {
    id: 1,
    name: "Energy Certificate (EPC)",
  },
  {
    id: 2,
    name: "EICR",
  },
  {
    id: 3,
    name: "Gas Certificate & Repair",
  },
  {
    id: 4,
    name: "Boiler Service & Repair",
  },

  {
    id: 5,
    name: "PAT Testing",
  },
  {
    id: 6,
    name: "Fire Risk Assessment",
  },
  {
    id: 7,
    name: "Fire Alarm Certificate",
  },
  {
    id: 8,
    name: "Fuse Box Installation",
  },
  {
    id: 9,
    name: "Electrical Repairs",
  },
  {
    id: 10,
    name: "Fire Alarm Installation",
  },
];

export default function TestimonialReview({ openModal, setOpenModal }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <React.Fragment>
      <Transition in={openModal} timeout={400}>
        {(state: string) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpenModal(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,

                pb: 4,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle
                sx={{ display: "flex", justifyContent: "center", pb: 3 }}
              >
                Say About Us!
              </DialogTitle>
              <Box sx={{ position: "absolute", mt: 0, right: 20 }}>
                <IconButton onClick={() => setOpenModal(false)}>
                  <Close />
                </IconButton>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  spacing={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid xs={12} sm={12} md={10}>
                    <Box>
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={12} md={6}>
                          <Controller
                            name="firstname"
                            rules={{
                              required: "please enter your name",
                            }}
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                error={!!errors.firstname}
                                sx={{
                                  mb: 1,
                                }}
                              >
                                <Input
                                  {...field}
                                  placeholder="Your Name"
                                  type="text"
                                  fullWidth
                                  variant="soft"
                                  size="lg"
                                />
                                <HookFormError
                                  name="firstname"
                                  errors={errors}
                                />
                              </FormControl>
                            )}
                          />
                        </Grid>

                        <Grid xs={12} sm={12} md={6}>
                          <Controller
                            name="email"
                            rules={{
                              required: "Please enter your email",
                              pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: "provide a valid email",
                              },
                            }}
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                error={!!errors.email}
                                sx={{
                                  mb: 1,
                                }}
                              >
                                <Input
                                  {...field}
                                  placeholder="Your Email Address"
                                  type="email"
                                  fullWidth
                                  variant="soft"
                                  size="lg"
                                />
                                <HookFormError name="email" errors={errors} />
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                          <Typography component="legend">
                            Rating Here
                          </Typography>
                          {/* <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          /> */}
                        </Grid>

                        <Grid xs={12} sm={12} md={12}>
                          <Controller
                            name="service"
                            rules={{
                              required: "Select your service name",
                            }}
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                error={!!errors.service}
                                sx={{
                                  mb: 1,
                                }}
                              >
                                <Select
                                  {...field}
                                  placeholder="Select your service"
                                  indicator={<KeyboardArrowDown />}
                                  sx={{
                                    [`& .${selectClasses.indicator}`]: {
                                      transition: "0.2s",
                                      [`&.${selectClasses.expanded}`]: {
                                        transform: "rotate(-180deg)",
                                      },
                                    },
                                  }}
                                  variant="soft"
                                  size="lg"
                                >
                                  {reviewServices.map((service) => (
                                    <Option
                                      value={service.name}
                                      key={service.id}
                                    >
                                      {service.name}
                                    </Option>
                                  ))}
                                </Select>
                                <HookFormError name="service" errors={errors} />
                              </FormControl>
                            )}
                          />
                        </Grid>

                        <Grid xs={12} sm={12} md={12}>
                          <Controller
                            name="message"
                            rules={{
                              required: "Review is required",
                            }}
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                error={!!errors.message}
                                sx={{ mb: 1 }}
                              >
                                <Textarea
                                  {...field}
                                  minRows={5}
                                  placeholder="Your Review here..."
                                  variant="soft"
                                  size="lg"
                                />
                                <HookFormError name="message" errors={errors} />
                              </FormControl>
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Box sx={{ pt: 2 }}>
                        <Button
                          type="submit"
                          variant="solid"
                          sx={{ width: "100%" }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}
