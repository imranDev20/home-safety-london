import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@mui/joy";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/user.services";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  skills: string;
  specialty: string;
  experience: number;
}

const CreateEngineerForm = ({
  setOpenCreateEngineerDrawer,
}: {
  setOpenCreateEngineerDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      specialty: "",
      experience: 0,
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createUserMutate,
    isPending: isCreateUserMutateLoading,
  } = useMutation({
    mutationFn: async (userData: any) => {
      const response = await createUser(userData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: "password",
        role: "engineer",
        specialty: data.specialty,
        skills: data.skills.split(",").map((skill) => skill.trim()),
        experience: data.experience,
      };
      const response = await createUserMutate(payload);

      if (response?.success) {
        reset();
        setOpenCreateEngineerDrawer(false);
        enqueueSnackbar(response.message, "success");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogTitle
        level="h3"
        sx={{
          mb: 3,
        }}
      >
        Create an Engineer
      </DialogTitle>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel>Engineer Name</FormLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter engineer name"
                error={!!errors.name}
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

        <FormControl required>
          <FormLabel>Phone</FormLabel>
          <Controller
            rules={{
              required: true,
            }}
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone number" />
            )}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Specialty</FormLabel>
          <Controller
            name="specialty"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter specialty"
                error={!!errors.specialty}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Skills (comma separated)</FormLabel>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter skills"
                error={!!errors.skills}
              />
            )}
          />
        </FormControl>

        <Button
          type="submit"
          sx={{ mt: 2 }}
          loading={isCreateUserMutateLoading}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateEngineerForm;
