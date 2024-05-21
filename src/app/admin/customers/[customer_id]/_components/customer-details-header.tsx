"use client";
import { getUserDetails } from "@/services/user.services";
import {
  Call,
  DeleteForever,
  Home,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Message,
  MoreVertRounded,
} from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import {
  Breadcrumbs,
  useTheme,
  Link as JoyLink,
  Typography,
  Stack,
  IconButton,
  Button,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CustomerDetailsHeader = () => {
  const theme = useTheme();
  const { customer_id } = useParams();

  const { data: userDetails, isLoading: isUserDetailsLoading } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const response = await getUserDetails(customer_id as string);
      return response.data;
    },
  });

  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={
          <KeyboardArrowRight
            fontSize="inherit"
            sx={{
              fontSize: 20,
            }}
          />
        }
      >
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          <Home />
        </JoyLink>
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/customers"
          sx={{
            textDecoration: "none",
          }}
        >
          Customers
        </JoyLink>

        <Typography
          color="primary"
          sx={{
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          {userDetails?.name}
        </Typography>
      </Breadcrumbs>
      <Stack
        spacing={2}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        direction={{
          xs: "column",
          sm: "row",
        }}
        mt={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton variant="outlined" size="sm">
            <KeyboardArrowLeft />
          </IconButton>
          <Typography component="h1" level="h2">
            {userDetails?.name || "Loading..."}
          </Typography>
        </Stack>

        <Stack spacing={1} direction="row">
          <Button
            variant="outlined"
            size="sm"
            color="neutral"
            startDecorator={<Call />}
            component="a"
            href={`tel:${userDetails?.phone}`}
          >
            Call
          </Button>
          <Button
            variant="outlined"
            size="sm"
            color="neutral"
            component="a"
            startDecorator={<Message />}
            href={`mailto:${userDetails?.email}`}
          >
            Message
          </Button>

          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: { variant: "outlined", color: "neutral", size: "sm" },
              }}
            >
              <MoreVertRounded />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }} placement="bottom-end">
              <MenuItem>
                <ListItemDecorator>
                  <Edit />
                </ListItemDecorator>{" "}
                Edit
              </MenuItem>
              <MenuItem color="danger">
                <ListItemDecorator>
                  <DeleteForever />
                </ListItemDecorator>{" "}
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </>
  );
};

export default CustomerDetailsHeader;
