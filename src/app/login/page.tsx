"use client";
import React from "react";
import {
  Alert,
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

import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../config/firebase";

export default function Login() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword, eUser, eLoading, Eerror] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const onSubmit = async (data: any) => {
    await signInWithEmailAndPassword(data.email, data.password);
    console.log("sign in successfully done!");
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
              <Typography level="title-md">HSL</Typography>

              <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
                Login
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ pt: 2 }}>
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
                      value: 6,
                      message: "Minimum length of 6 characters",
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
                <Box sx={{ display: "flex", justifyContent: "end", mb: 3 }}>
                  <Link href="/login">Forget Password?</Link>
                </Box>

                <Button
                  type="submit"
                  variant="solid"
                  fullWidth
                  sx={{ py: "10px", fontSize: 18 }}
                >
                  Login
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
                Have an account?<Link href="/signup">signup</Link>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
