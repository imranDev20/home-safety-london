"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Input,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import google from "../../images/google.jpg";
import Image from "next/image";
import auth from "../../../config/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [createUserWithEmailAndPassword, eUser, eLoading, eError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const onSubmit = async (data: any) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    console.log("sing up sucessfully done");
    reset();
  };

  return (
    <Container sx={{ py: 10 }}>
      <Grid container>
        <Grid xs={5} sx={{ mx: "auto" }}>
          <Card
            variant="soft"
            sx={{
              padding: 5,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography level="title-md" sx={{ my: "auto" }}>
                HSL
              </Typography>

              <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
                Sign Up
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ pt: 2 }}>
                <Input
                  {...register("name", {
                    required: "Name is Required",
                  })}
                  placeholder="Full Name"
                  name="name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="lg"
                  sx={{ mb: 2 }}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <Typography sx={{ color: "red" }}>{message}</Typography>
                  )}
                />
                <Input
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid email",
                    },
                  })}
                  placeholder="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="lg"
                  sx={{ mb: 2 }}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <Typography sx={{ color: "red" }}>{message}</Typography>
                  )}
                />
                <Input
                  {...register("password", {
                    required: "Password id Required",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "At least one letter, one digit & one special charectar",
                    },
                    minLength: {
                      value: 8,
                      message: "Minimum length of 8 characters",
                    },
                  })}
                  placeholder="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="lg"
                  sx={{ mb: 2 }}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <Typography sx={{ color: "red" }}>{message}</Typography>
                  )}
                />

                <Button
                  type="submit"
                  variant="solid"
                  fullWidth
                  sx={{ py: "10px", fontSize: 18, mt: 3 }}
                >
                  Sign Up
                </Button>
                <Divider sx={{ width: 200, mx: "auto", py: 2 }}>OR</Divider>
              </Box>
            </form>
            <Button
              type="submit"
              variant="solid"
              fullWidth
              sx={{ py: "10px", fontSize: 18 }}
              onClick={() => signInWithGoogle()}
            >
              <Image
                width={25}
                height={25}
                objectFit="cover"
                src={google}
                alt="googleLogo"
                style={{ marginRight: 5 }}
              />
              Continue with Google
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Typography>
                Have an account?<Link href="/login">login</Link>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
