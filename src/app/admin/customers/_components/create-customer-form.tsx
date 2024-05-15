import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";

interface FormValues {
  customerName: string;
  email: string;
  phone: string;
  houseStreet: string;
  postcode: string;
  city: string;
}

const CreateCustomerForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogTitle
        level="h3"
        sx={{
          mb: 2,
        }}
      >
        Create a customer
      </DialogTitle>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel>Customer Name</FormLabel>
          <Controller
            name="customerName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter customer name"
                error={!!errors.customerName}
              />
            )}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter email address"
                error={!!errors.email}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone number" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>House/Street</FormLabel>
          <Controller
            name="houseStreet"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter house/street" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Postcode</FormLabel>
          <Controller
            name="postcode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter postcode" />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>City</FormLabel>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter city" />
            )}
          />
        </FormControl>

        <Button type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateCustomerForm;
