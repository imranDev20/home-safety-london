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
  DialogContent,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  ModalClose,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
  selectClasses,
} from "@mui/joy";
import HookFormError from "@/app/_components/common/hook-form-error";
import { Close } from "@mui/icons-material";
import StarRating from "@/app/_components/common/star-rating";

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

type TestimonialInput = {
  name: string;
  subject: string;
  rating: number;
  description: string;
};

export default function TestimonialForm({ openModal, setOpenModal }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm<TestimonialInput>({
    defaultValues: {
      name: "",
      subject: "",
      rating: 5,
      description: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") setOpenModal(false);
        }}
      >
        <ModalDialog
          sx={{
            width: 500,
          }}
        >
          <ModalClose />
          <DialogTitle
            level="h2"
            sx={{
              mb: 2,
              justifyContent: "center",
            }}
          >
            Share Your Experience
          </DialogTitle>
          <DialogContent
            sx={{
              textAlign: "center",
              mb: 2,
            }}
          >
            We&lsquo;d love to hear about your experience with our service. Your
            feedback helps us improve and serve you better.
          </DialogContent>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                rules={{
                  required: "Name is required",
                }}
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...field}
                      variant="outlined"
                      placeholder="ie. John Doe"
                    />
                    <HookFormError name="name" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="subject"
                rules={{
                  required: "Subject is required",
                }}
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.subject}>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      {...field}
                      variant="outlined"
                      placeholder="ie. Had an EICR check"
                    />
                    <HookFormError name="subject" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="rating"
                rules={{
                  required: "Rating is required",
                }}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControl error={!!errors.rating}>
                    <FormLabel>Rating</FormLabel>
                    <StarRating value={value} onChange={onChange} />
                    <HookFormError name="rating" errors={errors} />
                  </FormControl>
                )}
              />

              <Controller
                name="description"
                rules={{
                  required: "Description is required",
                }}
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...field}
                      minRows={4}
                      variant="outlined"
                      placeholder="Your experience in details..."
                    />
                    <HookFormError name="description" errors={errors} />
                  </FormControl>
                )}
              />

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
